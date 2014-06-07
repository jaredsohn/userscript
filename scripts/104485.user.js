// ==UserScript==
// @name            The West - Buffalo Bill [SOM]
// @namespace       http://userscripts.org/scripts/show/104485
// @description     Script for The-West: Buffalo Bill [SOM - Scripts-O-Maniacs] [Multilingual] - 2.0.0.4
// @author          Dun [SOM - Scripts-O-Maniacs] - Originally by Puli / Muche
// @release         Zyphir Randrott
// @website         http://scripts-o-maniacs.leforum.eu
// @include         http://*.the-west.*/game.php*
// @include         http://userscripts.org/scripts/source/104485.meta.js*
// @include         http://userscripts.org/scripts/review/104485*
// @version         2.0.0.4
//
// @history         2.0.0.4|25/08/2011 Added Polish translations, thanks to Darius II.
// @history         2.0.0.3|17/08/2011 Added Brazilian/Portuguese translations, thanks to CWalter.
// @history         2.0.0.2|15/08/2011 Automatic updater updated.
// @history         2.0.0.2|15/08/2011 Translations structure rewrited.
// @history         2.0.0.1 Minor layout fix in right workbar
// @history         2.0.0.0 Buffalo Bill only version by Zyphir (Untill Dun comes back)
// @history         1.3.3.4 Russian translation  (thanks to Nikitos-barbos)
// @history         1.3.3.3 correction barre travaux premium cliquable
// @history         1.3.3.2 correction bouton menu pour ne pas passer sous la barre travaux premium
// @history         1.3.3.1 correction bug insertion commentaires, ajout fonction $
// @history         1.3.3   correction diverses, icones,hightlight menu correct, updater
// @history         1.3.2.9 correction menu
// @history         1.3.2.8 compatibilité Safari, modif chrome+safari
// @history         1.3.2.7 liste triée, nettoyage du code, correxion bug correspondance des deux selects
// @history         1.3.2.6 correction bug raffraichissement inventaire
// @history         1.3.2.5 correction bug HP, highlight menu, corrections diverses
// @history         1.3.2.4 correction bug ecrasement variable pos
// @history         1.3.2.3 Inversion case a coche Mode Configuration et diverses modifs (Bug Chrome)
// @history         1.3.2.2 Ajout d'un titre dans les selects pour pouvoir changer de tenue modifiée manuellement
// @history         1.3.2.2 Signalement des choix TWPro
// @history         1.3.2.1 Ajout case a cocher 'Changement sur selection'
// @history         1.3.2  Version finalisée Chrome + Firefox + Updater
// @history         1.3.1f Version de test pour l'update
// @history         1.3.1e Beta Ajout Maj Auto SOM
// @history         1.3.1e Compatibilité Chrome
// @history         1.3.1d passage SOM (SOM powa ^^ dixit TontonJohn ^^)
// @history         1.3.1c Selection possible des set TWPro, corrections mineures,
// @history         1.3.1c possibilité de ne pas changer d'arme et monture
// @history         1.3.1b Mise en place d'un bouton pour mettre les items selectionné par TWPro si il est présent
// @history         1.3.1b mise en place d'icones à la place des boutons
// @history         1.3.1b mise en parralele des selects menu et inventaire
// @history         1.3.1a Sauvegarde du dernier set utilisé
// @history         1.3.1a Mise en place d'un message lorsque l'habillement est complet
// @history         1.3.1a diverses modifications mineures
// @history         1.3.1a Dorenavant la tenue change des la selection dans le select de l'inventaire.
// @history         1.3.1  by Dun - pantalons et ceintures, compatible TW 1.30
// ==/UserScript==

var tenue_version = "2.0.0.4";

var url = window.location.href;
if (url.indexOf(".the-west.") != -1) {

    var insertBeforeElement = document.getElementById('left_top');

    var newScriptElement = document.createElement('script');
    newScriptElement.setAttribute('type', 'text/javascript');
    var myScript = "var tenue_version = '"+tenue_version+"';";
    newScriptElement.innerHTML = myScript;
    insertBeforeElement.parentNode.insertBefore(newScriptElement, insertBeforeElement);

    (function(f) {
        var d=document,s=d.createElement('script');
        s.setAttribute('type','application/javascript');
        s.textContent = '('+f.toString()+')()';
        (d.body||d.head||d.documentElement).appendChild(s);
        s.parentNode.removeChild(s)
    })( function() {

		/////////////////////////////////////////////////////////
		// DÉCLARATION DES CONSTANTES
		/////////////////////////////////////////////////////////
		//MISE À JOUR
		var VERSION_SCRIPT 		= tenue_version ;
		var NUMERO_SCRIPT		= "104485" ;
		var NB_HISTORY			= 5 ;
		var MENU_maj			= "ZYPH_" + NUMERO_SCRIPT + "_MAJ" ;
		var DELTA_maj 			= 24 * 3600 ; // 24 h en s

		var billonly = true;
        var Beta = false;
        var intercept=true;
   
		var wr_lang = {
			WARDROBE_TEXT: 'Wardrobe',
			NEW_NAME_TEXT: 'New name',
			CANCEL_BUTTON_TEXT: 'Cancel',
			DELETE_BUTTON_TEXT: 'Delete',
			SAVE_BUTTON_TEXT: 'Save',
			TW_BUTTON_TEXT: 'Put on the TW Pro Selection...',
			SAVE_MESSAGE_TEXT: 'Outfit saved',
			CONFIRM_OVERWRITE_TEXT: 'Do you really want to overwrite this outfit',
			SAVE_CHOOSE_NAME_ERROR_TEXT: 'You must pick "New name" or choose an existing outfit!',
			SAVE_INVALID_NAME_ERROR_TEXT: 'Outfit name contains invalid characters!',
			DELETE_CHOOSE_NAME_ERROR_TEXT: 'You must pick an existing outfit!',
			CHANGEOK_TEXT: 'Clothing change complete',
			CHECK_RARM_TEXT: 'Don\'t change right hand weapon',
			CHECK_ANIMAL_TEXT: 'Don\'t change riding animal',
			CHECK_CHANGEONSELECT: 'Configuration Mode',
			ERROR_CONFMODENOTACTIVATED: 'Do you want to activate the Configuration Mode to create a new outfit?',
		};
		var wr_langs = {};
		wr_langs.fr = {
			WARDROBE_TEXT: 'Tenues',
			NEW_NAME_TEXT: 'Nouveau nom',
			CANCEL_BUTTON_TEXT: 'Annuler',
			DELETE_BUTTON_TEXT: 'Supprimer',
			SAVE_BUTTON_TEXT: 'Sauvegarder',
			TW_BUTTON_TEXT: 'Enfiler la Sélection TW Pro...',
			SAVE_MESSAGE_TEXT: 'Tenue sauvegardée',
			CONFIRM_OVERWRITE_TEXT: 'Voulez-vous vraiment modifier la tenue',
			SAVE_CHOOSE_NAME_ERROR_TEXT: 'Vous devez sélectionner "Nouveau nom" ou choisir une tenue existante !',
			SAVE_INVALID_NAME_ERROR_TEXT: 'Le nom de la tenue contient des caractères invalides !',
			DELETE_CHOOSE_NAME_ERROR_TEXT: 'Vous devez choisir une tenue existante !',
			CHANGEOK_TEXT: 'Changement de vêtements effectué',
			CHECK_RARM_TEXT: 'Ne pas changer d\'arme main droite',
			CHECK_ANIMAL_TEXT: 'Ne pas changer de monture',
			CHECK_CHANGEONSELECT: 'Mode Configuration',
			ERROR_CONFMODENOTACTIVATED: 'Voulez-vous activer le Mode Configuration pour créer une nouvelle tenue ?',
		};
		wr_langs.ru = { // Nikitos-barbos
			WARDROBE_TEXT: 'Гардероб',
			NEW_NAME_TEXT: 'Новое название',
			CANCEL_BUTTON_TEXT: 'Отмена',
			DELETE_BUTTON_TEXT: 'Удалить',
			SAVE_BUTTON_TEXT: 'Сохранить',
			TW_BUTTON_TEXT: 'Выбрать TW Pro...',
			SAVE_MESSAGE_TEXT: 'Комплект сохранён',
			CONFIRM_OVERWRITE_TEXT: 'Вы действительно хотите перезаписать Гардероб',
			SAVE_CHOOSE_NAME_ERROR_TEXT: 'Вы должны сделать новый комплект или открыть существующий"!',
			SAVE_INVALID_NAME_ERROR_TEXT: 'Название комплекта содержит недопустимые символы',
			DELETE_CHOOSE_NAME_ERROR_TEXT: 'Вы должны выбрать набор!',
			CHANGEOK_TEXT: 'Ок',
			CHECK_RARM_TEXT: 'Не менять Дуэльное оружие',
			CHECK_ANIMAL_TEXT: 'Не менять Средство передвижения',
			CHECK_CHANGEONSELECT: 'Режим настройки',
			ERROR_CONFMODENOTACTIVATED: 'Включить Режим настройки при создании нового комплекта?',
		};
		wr_langs.br = { // CWalter
			WARDROBE_TEXT: 'Mochila',
			NEW_NAME_TEXT: 'Novo nome',
			CANCEL_BUTTON_TEXT: 'Cancelar',
			DELETE_BUTTON_TEXT: 'Excluir',
			SAVE_BUTTON_TEXT: 'Salvar',
			TW_BUTTON_TEXT: 'Coloque a seleção do TW Pro...',
			SAVE_MESSAGE_TEXT: 'Vestuário salvo',
			CONFIRM_OVERWRITE_TEXT: 'Você realmente deseja substituir este vestuário',
			SAVE_CHOOSE_NAME_ERROR_TEXT: 'Você deve escolher "Novo nome" ou um vestuário existente!',
			SAVE_INVALID_NAME_ERROR_TEXT: 'Nome do vestuário contém caracteres inválidos!',
			DELETE_CHOOSE_NAME_ERROR_TEXT: 'Você deve escolher um vestuário existente!',
			CHANGEOK_TEXT: 'Vestuário Alterado! OK!',
			CHECK_RARM_TEXT: 'Não mudar a arma da mão direita!',
			CHECK_ANIMAL_TEXT: 'Não mudar o animal!',
			CHECK_CHANGEONSELECT: 'Modo de configuração',
			ERROR_CONFMODENOTACTIVATED: 'Você deseja ativar o modo de configuração para criar um novo vestuário?',
		};
		wr_langs.pt =  wr_langs.br;
		wr_langs.pl = { // Darius II
			WARDROBE_TEXT: 'Szafa',    
			NEW_NAME_TEXT: 'Nowa nazwa',    
			CANCEL_BUTTON_TEXT: 'Anuluj',    
			DELETE_BUTTON_TEXT: 'Usuń',    
			SAVE_BUTTON_TEXT: 'Zapisz',    
			TW_BUTTON_TEXT: 'Wybór z TWPro...',    
			SAVE_MESSAGE_TEXT: 'Szafa zapisana',    
			CONFIRM_OVERWRITE_TEXT: 'Czy na pewno chcesz nadpisać szafę',    
			SAVE_CHOOSE_NAME_ERROR_TEXT: 'Musisz wpisać "Nową nazwę" lub wybrać istniejącą nazwę!',    
			SAVE_INVALID_NAME_ERROR_TEXT: 'Nazwa zawiera niedozwolone znaki!',    
			DELETE_CHOOSE_NAME_ERROR_TEXT: 'Wybierz nazwę z szafy!',    
			CHANGEOK_TEXT: 'Zostałeś przebrany',    
			CHECK_RARM_TEXT: 'Nie zmieniaj broni',    
			CHECK_ANIMAL_TEXT: 'Nie zmieniaj "zwierzęcia"',    
			CHECK_CHANGEONSELECT: 'Tryb konfiguracji',    
			ERROR_CONFMODENOTACTIVATED: 'Tryb konfiguracji aktywny, utworzyć nowy zestaw ?',    
		};  

		var wr_langname = location.host.match(/(\D+)\d+\./);
		if(wr_langname && wr_langs[wr_langname[1]]) wr_lang = wr_langs[wr_langname[1]];
		//wr_lang = wr_langs['pl'];
     

        var maxRetry=3;
        var retryPeriod=300;
        var gQueue = [];
        var gQueueIndex = 0;
        var gQueueTimer = 0;
        var gQueueHPChange = [];

        var gLocation = window.location.href;
        var gArmorInputType = 'drop';
        var gInputElement = null;
        var startOnInv= false;
        var menuButtonImg='data:image/png;base64,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';
        Tenue_Icons = {
            YesImg:'data:image/png;base64,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',
            NoImg:'data:image/png;base64,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',
            DuelImg:'data:image/png;base64,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',
            BillImg:'data:image/png;base64,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'
        }//'

        var
        ANIMAL    = 0,
        BODY      = 1,
        FOOT      = 2,
        LEFT_ARM  = 3,
        HEAD      = 4,
        YIELD     = 5,
        RIGHT_ARM = 6,
        NECK      = 7;
        PANTS     = 8,
        BELT      = 9;

        function debug(text) {
            if(Beta) {
                alert(text);
            }

        }

        function isNull(variable) {
            return (typeof(variable) === "undefined" || variable === null) ? true : false;
        }

        function shouldWear(wearItem) {

            if(isNull(wearItem)) {
                return false;
            }
            return true;

        }

        function trim(str) {
            return str.replace(/^\s+/, '').replace(/\s+$/, '');
        }

        function getServer(loc) {
            loc = loc.substring(loc.indexOf('//')+2);
            loc = loc.substring(0, loc.indexOf('/'));
            return loc;
        }

        function insertAfter(newNode, referenceNode) {
            referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
        }

        function hideElement(element) {
            element.style.display='none';
        }

        function showElement(element) {
            element.style.display='block';
        }

        function isElementHidden(element) {
            return element.style.display !== 'block';
        }

        function removeElement(el) {
            el.parentNode.removeChild(el);
        }

        function getArmorSet(setName) {
            return localStorage.getItem(getServer(gLocation)+'_'+Character.name+'_'+setName);
        }

        function setArmorSet(setName, value) {
            localStorage.setItem(getServer(gLocation)+'_'+Character.name+'_'+setName, value);
        }

        function removeArmorSet(setName) {
           // localStorage.setItem(getServer(gLocation)+'_'+Character.name+'_'+setName, '');
         
            localStorage.removeItem(escape(getServer(gLocation)+'_'+Character.name+'_'+setName));
        }

        function getListOfSets() {
            var lst =  localStorage.getItem(getServer(gLocation)+'_'+Character.name+':listOfSets');
            if(isNull(lst)) {
                lst="";
            }
            return lst;
        }

        function setListOfSets(value) {
            localStorage.setItem(getServer(gLocation)+'_'+Character.name+':listOfSets', value);
        }

        function setLastSet(setName) {
            localStorage.setItem(getServer(gLocation)+'_'+Character.name+':last', setName);
        }

        function getLastSet() {

            var last=localStorage.getItem(getServer(gLocation)+'_'+Character.name+':last');
            return  last;
        }

        function setCheckedArm() {
            //      var checkbox = $("checkRArm");
            // var check = checkbox.checked;
            localStorage.setItem("changeRArm", isChecked('checkRArm'));
        }

        function setCheckedAnimal() {
            //     var checkbox = $("checkAnimal");
            //   var check = checkbox.checked;
            localStorage.setItem("changeAnimal", isChecked('checkAnimal'));
        }

        function toggleElement(element) {
            if (element.style.display==='none') {
                showElement(element);
                alignSelected(getLastSet());
            } else {
                hideElement(element);
            }
        }

        // check validity of set name - must not contain ';'
        function isValidSetName(setName) {
            return (setName.indexOf(';') < 0);
        }

        function isInList(lstDun, value, delimiter) {
            if (delimiter === undefined) {
                delimiter = ';';
            }
            var dnPos = lstDun.indexOf(value);

            if (dnPos < 0) {
                return false;
            }
            // check if value is one whole item, not just part of a item
            if (dnPos > 0  &&  lstDun[dnPos - 1] !== delimiter) {
                // non-delimiter before
                return false;
            }
            if (dnPos + value.length < lstDun.length  &&  lstDun[dnPos + value.length] !== delimiter) {
                // non-delimiter after
                return false;
            }

            return true;
        }

        // fait correspondre les deux select
        function alignSelected(setName) {

            var pre=" \u25C8 " ;
            var  current;

            if (isNull(setName)) {
                return false;
            }
            //debug("alignSelected" + setName);
            if( setName != "" && setName.indexOf(pre)<0) {
                var checkbox = $("changeonselect");
                if(!isNull(gInputElement)) {
                    if(!isNull(checkbox) && checkbox.checked) {
                        gInputElement.options[$('armorset_combobox').selectedIndex].selected=true;
                    } else {
                        current =  $('optcurInv');
                        if(current) {

                            current.innerHTML =   pre + setName;
                            current.setAttribute("style","font-weight:bold;font-style:italic;");
                            current.selected = true;

                        }
                    }
                }
                current =  $('optcur');

                if(current) {
                    //debug(current.value +" " + setName);
                    current.innerHTML =  pre + setName;
                    current.setAttribute("style","font-weight:bold;font-style:italic;");
                    current.selected = true;

                }

                return true;
            }

        }

        function isChecked(checkBox) {
            var checkbox = $(checkBox);
            if(isNull(checkbox)) {
                return false;
            }

            var checked = checkbox.checked;
            return checked;
        }

        function changeToTextBox(elem) {

            if(isChecked("changeonselect")) { //Mode configuration
                gInputElement = document.createElement('input');
                gInputElement.style.width = '123px';
                insertAfter(gInputElement, elem);
                removeElement(elem);
                gInputElement.focus();
                gArmorInputType = 'text';
                var codb = $('wardrobe_cancelOrDelete_button');
                if (codb) {
                    ajout_com_icone("wardrobe_cancelOrDelete_button", WR.lang.CANCEL_BUTTON_TEXT);
                }
                hideElement($("changeonselect"));
            } else {
                //for Chrome & Safari Options can't be hidden
                if(confirm(WR.lang.ERROR_CONFMODENOTACTIVATED)) {
                    $("changeonselect").checked = true;
                    setChangeOnSelect();
                    changeToTextBox(elem);
                } else {
                    alignSelected(getLastSet());
                }

            }
        }

        function invDropDownOnChange(event) {

            if (this.selectedIndex == this.length - 1) {
                // last, indDun.e. 'New name' option selected
                changeToTextBox(gInputElement);
            } else {

                // si la case du mode configuratio est decochée

                if(!isChecked("changeonselect")) {
                    setArmorOptionOnClickInv(this.options[this.selectedIndex].value);
                }
                ajout_com_icone("wardrobe_cancelOrDelete_button", WR.lang.DELETE_BUTTON_TEXT);
            }

        }

        function createDropInvDropDown() {
            var lstTenue, count, nNewItem, name, dnPos;
            // Select de l'inventaire
            gInputElement = document.createElement('select');
            gInputElement.setAttribute("style","background-color:rgb(207, 195, 166);width:127px;");
            //	gInputElement.setAttribute("id","selSetInv");
            gInputElement.addEventListener('change', invDropDownOnChange, false);

            //dernier set utilisé

            if(gInputElement.selectedIndex != -1 ) {
                selected = ( gInputElement.options[gInputElement.selectedIndex].value);
                //debug(selected);
            } else {
                selected =getLastSet();

            }

            // Remplissage de la liste des sets
            lstTenue = getListOfSets();
            lstTenue=lstTenue.split(";");
            lstTenue.sort();

            nNewItem = document.createElement('option');
            nNewItem.setAttribute('id','optcurInv');
            nNewItem.innerHTML = '';
            gInputElement.appendChild(nNewItem);

            for(var indDun=0; indDun<lstTenue.length;indDun++) {
                name = lstTenue[indDun];

                if (name === '') {
                    // ignore empty set names for backward compatibility
                    continue;
                }

                nNewItem = document.createElement('option');
                nNewItem.innerHTML = name;
                gInputElement.appendChild(nNewItem);
            }

            // add 'New name' option
            nNewItem = document.createElement('option');
            nNewItem.innerHTML = '... ' + WR.lang.NEW_NAME_TEXT + ' ...';
            nNewItem.setAttribute('id','inputSet');
            gInputElement.appendChild(nNewItem);

        }

        function changeToDropDown(elem) {
            //debug("changeToDropDown");
            createDropInvDropDown();
            insertAfter(gInputElement, elem);
            removeElement(elem);
            gArmorInputType = 'drop';
            setChangeOnSelect();
            showElement($("changeonselect"));
            gInputElement.focus();
        }

        function addToQueue(action, hpBonus) {
            gQueue.push(action);
            gQueueHPChange.push(hpBonus);
        }

        function sortQueue() {

            var sortElement = function(a,b) {
                return b.hp-a.hp;
            }
            var lQueue = [];

            for(var indDun=0; indDun<gQueueHPChange.length;indDun++) {

                //Bug chrome Dun -  for (indDun in gQueueHPChange) {
                lQueue[indDun] = new Object();
                lQueue[indDun].item = gQueue[indDun];
                lQueue[indDun].hp   = gQueueHPChange[indDun];
            }

            lQueue = lQueue.sort(sortElement);

            // recreate gQueue in new order
            gQueue = [];
            gQueueHPChange = [];

            //var str="";
            for(var indDun=0; indDun<lQueue.length;indDun++) {
                addToQueue(lQueue[indDun].item, lQueue[indDun].hp);
                //    str+=  lQueue[indDun].item +" " + lQueue[indDun].hp +"\n";
            }
            // alert("Sort : \n" + str);

        }

        function isUncarryAction(action) {
            return ((action === 'head') ||
                (action === 'left_arm') ||
                (action === 'body') ||
                (action === 'right_arm') ||
                (action === 'yield') ||
                (action === 'foot') ||
                (action === 'neck') ||
                (action === 'animal')||
                (action === 'pants') ||
                (action === 'belt')
            );
        }

        function executeQueue(retry) {
            debug("Entree executeQueue");
            intercept=false;
            gQueueTimer = 0;

            if (isNull(retry)) {
                retry=0;
            }
            if (gQueue.length === 0) {

                alignSelected(getLastSet());
                new HumanMessage(WR.lang.CHANGEOK_TEXT, {type:'success'});
                intercept=true;
                return;
            }

            if (retry >= maxRetry) {
                // retries failed, skipping item
                gQueueIndex++;
                if(gQueueIndex >= gQueue.length) {
                    gQueueIndex=0;
                    gQueue = [];
                    gQueueHPChange = [];
                    intercept=true;
                    return;
                }
            }

            if (gQueueIndex >= gQueue.length) {
                // index out of bounds
                gQueueIndex=0;
                gQueue = [];
                gQueueHPChange = [];
                intercept=true;
                return;
            }

            var ok = false, found;
            var items, itemWearing;

            if (isUncarryAction(gQueue[gQueueIndex])) {
                ok = Wear.uncarry(gQueue[gQueueIndex]);
                //déja porté

                found = true;
            } else {

                items = Bag.getInstance().items;

                found = false;

                for (var indDun in items) {

                    if (items[indDun].get_short() === gQueue[gQueueIndex]) {
                        found = true;

                        itemWearing = Wear.wear[indDun];

                        if (!isNull(itemWearing) && itemWearing.get_short() === gQueue[gQueueIndex]) {
                            //déja porté

                            ok = true;
                            break;
                        }

                        ok = Bag.getInstance().carry(indDun);

                        break;
                    }
                }
            }

            if (found && !ok) {
                // something bad happened, try again - Dun bug si on ferme l'inventaire, crash sur le wear

                gQueueTimer = setTimeout( function () {
                    executeQueue(retry+1);
                }, retryPeriod*(retry+1)*2);
                intercept=true;
                return;
            }

            // proceed to next item in queue
            gQueueIndex++;
            if (gQueueIndex >= gQueue.length) {
                // queue finished, select set name in inventory's dropdown
                gQueueIndex = 0;
                gQueue = [];
                gQueueHPChange = [];

                alignSelected(getLastSet());
                new HumanMessage(WR.lang.CHANGEOK_TEXT, {type:'success'});
                intercept=true;
                return;
            }

            gQueueTimer = setTimeout( function () {
                executeQueue();
            }, retryPeriod);
            ;
        }

        function getHPBonus(id, isBagItem) {
            var item = null;

            if(!isBagItem) {
                item = Wear.get(id);

            } else {
                var items = Bag.getInstance().items;

                for (var indDun in items) {

                    if (items[indDun].get_short() === id) {
                        item = items[indDun];

                        break;
                    }
                }
            }
            if (isNull(item)) {
                return 0;
            }

            var str    = 0;
            var hp     = 0;
            var setStr = 0; // not implemented yet
            var setHP  = 0; // not implemented yet

            try {
                str = item.obj.bonus.attributes.strength;
                if (isNull(str))
                    str = 0;
            } catch(e) {
            }

            try {
                hp = item.obj.bonus.skills.health;
                if (isNull(hp))
                    hp = 0;
            } catch(e) {
            }

            return str+hp+setStr+setHP;
        }

        function setArmorHelper(name, wanted, element) {

            if (wanted) {
                if (isNull(element) || element.get_short() !== wanted) {
                    addToQueue(wanted, getHPBonus(wanted, true)-getHPBonus(name, false));
                } else {
                    //vetements déja en cours
                }
            } else {
                if (!isNull(element)) {
                    addToQueue(name, 0-getHPBonus(name, false)); // TODO set items needs to affect this line more
                }
            }
        }

        function checkChangeable() {
            var setArm=new Array();
            //initialisation avec les items portés pour pas supprimer un item déja porté

            wearBag= Wear.wear;
            if(shouldWear(wearBag.animal)) {
                setArm[ANIMAL]=wearBag.animal.obj;//['short'];
            }
            if(shouldWear(wearBag.body))
                setArm[BODY]=wearBag.body.obj;//['short'];
            if(shouldWear(wearBag.foot))
                setArm[FOOT]=wearBag.foot.obj;//['short'];
            if(shouldWear(wearBag.head)) {
                setArm[HEAD]=wearBag.head.obj;//['short'];

            }
            if(shouldWear(wearBag.left_arm))
                setArm[LEFT_ARM]=wearBag.left_arm.obj;//['short'];
            if(shouldWear(wearBag.yield))
                setArm[YIELD]=wearBag.yield.obj;//['short'];
            if(shouldWear(wearBag.right_arm))
                setArm[RIGHT_ARM]=wearBag.right_arm.obj;//['short'];
            if(shouldWear(wearBag.neck))
                setArm[NECK]=wearBag.neck.obj;//['short'];
            if(shouldWear(wearBag.pants))
                setArm[PANTS]=wearBag.pants.obj;//['short'];
            if(shouldWear(wearBag.belt))
                setArm[BELT]=wearBag.belt.obj;//['short'];

            return setArm;
        }

        // Function de changement a partir des sets twpro
        function wearSelected() {

            var    visible = false;

            var maxHP = new Array();

            var bag_items = Bag.getInstance().items;

            var wearBag = Wear.wear;

            var setArm = checkChangeable();

            // initialisation des items déja portés avec leur hp
            for (var index=0; index < setArm.length; index++) {
                var indeW = setArm[index];
                if(isNull(indW)) {
                    continue; // emplacement vide
                }
                var indW = indeW.short;
                if(isNull(indW)) {
                    // Pas logique mais au cas ou ^^
                } else {

                    var inner = indeW.twpro_html.className;
                    if(!isNull(inner)) {
                        var  visible = inner.contains("wear_"+indeW.type+"_highlight");

                        if(visible) {
                            var hp = getHPBonus(indeW.type, false);
                            maxHP[indeW.type]= hp;
                        }
                    }
                }

                setArm[index]=indW;
            }

            var setSelected = (twpro_toggle_set!=0);

            var changeAnimal = !isChecked("checkAnimal");
            var changeRArm = !isChecked("checkRArm");

            var twproValue = "Set TWPro";

            for (var indW in bag_items) {
                var bag_obj =bag_items[indW].obj;
                var inner= bag_obj.twpro_html['innerHTML'];
                var style= bag_obj.twpro_html['style'];

                //Si le filtre set TWPro est actif
                if(setSelected) {
                    visible =(style.display=='') ;
                    //var twProSet=document.getElementById('twpro_jobList');
                    twproValue=  TWPro.set_names[twpro_toggle_set];
                } else {

                    var twProSet=$('twpro_jobList');
                    twproValue=twProSet.options[twProSet.selectedIndex].text;
                    visible = (inner.indexOf("highlight")>0);

                }

                if(visible) {
                    //calcul du plus pv en cas de doublons
                    var hp = getHPBonus(bag_obj['short'], true);

                    if(isNull(maxHP[bag_obj['type']]) || maxHP[bag_obj['type']] <= hp ) {

                        maxHP[bag_obj['type']] = hp;

                        switch (bag_obj['type']) {
                            case "animal":
                                if(changeAnimal) {

                                    setArm[ANIMAL]=bag_obj['short'];
                                }
                                break;
                            case "body":
                                setArm[BODY]=bag_obj['short'];
                                break;
                            case "foot":
                                setArm[FOOT]=bag_obj['short'];
                                break;
                            case "head":
                                setArm[HEAD]=bag_obj['short'];
                                break;
                            case "left_arm":
                                setArm[LEFT_ARM]=bag_obj['short'];
                                break;
                            case "yield":
                                setArm[YIELD]=bag_obj['short'];
                                break;
                            case "right_arm":
                                if(changeRArm) {
                                    setArm[RIGHT_ARM]=bag_obj['short'];
                                }
                                break;
                            case "neck":
                                setArm[NECK]=bag_obj['short'];
                                break;
                            case "pants":
                                setArm[PANTS]=bag_obj['short'];
                                break;
                            case "belt":
                                setArm[BELT]=bag_obj['short'];
                                break;
                            default:
                                break;
                        }
                    }
                }

            }
            //création de la chaine de set
            var setTWPro=setArm.join(":");
            //debug("set TWPro = " + setTWPro);
            setArmor(setTWPro);

            //debug("TWPro Value " + twproValue);
            alignSelected("TWPro : " + twproValue);
            setLastSet('');
        }

        function setArmor(armorSet) {

            if ($('bag')) {
                AjaxWindow.maximize('inventory');

            } else {
                AjaxWindow.show('inventory');
                setTimeout( function() {
                    addInventoryButtons();
                }, 100);
                setTimeout( function() {
                    setArmor(armorSet);
                }, 1000);
                return;
            }

            // clean old queue
            window.clearInterval(gQueueTimer);
            gQueueIndex = 0;
            gQueue = [];
            gQueueHPChange = [];

            var setArray = [];
            setArray = armorSet.split(':');

            //remove wrong clothes and apply right clothes
            setArmorHelper('animal',    setArray[ANIMAL],    Wear.wear.animal);
            setArmorHelper('body',      setArray[BODY],      Wear.wear.body);
            setArmorHelper('foot',      setArray[FOOT],      Wear.wear.foot);
            setArmorHelper('left_arm',  setArray[LEFT_ARM],  Wear.wear.left_arm);
            setArmorHelper('head',      setArray[HEAD],      Wear.wear.head);
            setArmorHelper('yield',     setArray[YIELD],     Wear.wear.yield);
            setArmorHelper('right_arm', setArray[RIGHT_ARM], Wear.wear.right_arm);
            setArmorHelper('neck',      setArray[NECK],      Wear.wear.neck);
            setArmorHelper('pants',     setArray[PANTS],     Wear.wear.pants);
            setArmorHelper('belt',      setArray[BELT],      Wear.wear.belt);
            ///
            sortQueue();
            executeQueue();

        }

        function setArmorOptionOnClick(event) {

            var element = event.target;

            startOnInv=false;
            var setName =  (element.options[element.selectedIndex].value);//this.value;
            //debug("setArmorOptionOnClick "  + setName);
            setLastSet(setName);
            var armorSet = getArmorSet(setName);
            setArmor(armorSet);

        }

        function setArmorOptionOnClickInv(setName) {
            startOnInv=true;
            //	var setName =  (element.options[element.selectedIndex].value);//this.value;
            var armorSet = getArmorSet(setName);
            setLastSet(setName);
            //debug("setArmorOptionOnClickInv "  + setName);
            setArmor(armorSet);

        }

        // fill options in selects
        function createOptionsList(element) {

            var lstTenue, name, nNewItem, selected, dnPos;
            selected = getLastSet();

            // remove old options, save the selected
            while (element.options.length > 0) {
                element.options[0] = null;
            }

            lstTenue = getListOfSets();
            lstTenue=lstTenue.split(";");
            lstTenue.sort();

            nNewItem = document.createElement('option');
            nNewItem.setAttribute('id','optcur');
            nNewItem.selected=true;
            nNewItem.setAttribute("style","font-weight:bold;font-style:italic;");
            element.appendChild(nNewItem);

            for(var indDun=0; indDun<lstTenue.length;indDun++) {
                name = lstTenue[indDun];

                if (name === '') {
                    // ignore empty set names for backward compatibility
                    continue;
                }

                nNewItem = document.createElement('option');
                nNewItem.innerHTML = name;
                element.appendChild(nNewItem);
            }

        }

        function updateDropdown() {
            var dropDown = $('armorset_combobox');

            createOptionsList(dropDown);

            showElement($("changeonselect"));
        }

        function findPosY(obj) {
            var curtop = 0;
            if(obj.offsetParent)
                while(1) {
                    curtop += obj.offsetTop;
                    if(!obj.offsetParent)
                        break;
                    obj = obj.offsetParent;
                }
            else if(obj.y)
                curtop += obj.y;
            return curtop;
        }

        // create right menu button & dropdown
        function createDropdown() {

            var rightmenu = $('right_menu').getFirst();

            var newLI = document.createElement('div');
            newLI.setAttribute('id', 'armorset_li');
            var dunButt = document.createElement('a');
            newLI.setAttribute('style',"background-image:url("+menuButtonImg+"); background-repeat:no-repeat; background-position:left top; width:128px; height:25px;");
            newLI.setAttribute('onMouseMove',"this.style.backgroundPosition = 'left bottom'");
            newLI.setAttribute('onMouseOut',"this.style.backgroundPosition = 'left top'");
            dunButt.innerHTML= "<span style=\"width: 102px; color: rgb(255, 255, 255); display: block; z-index: 200; font-size: 13px; position: relative; top: 3px; text-align: center; left: 24px;\">"+WR.lang.WARDROBE_TEXT+"</span>";
            // Décalage barre travaux droite dans la pile z-index
            // Obligatoire car d'autres scripts s'incruste juste apres le bouton fort sans se poser de question et selon l'ordre de chargement ca met les menu en dessous
           $('workbar_right').style.zIndex = '5';

            newLI.appendChild(dunButt);
            //newLI.injectAfter($('menu_forts'));
            rightmenu.appendChild(newLI);

            var newDropDown = document.createElement('select');

            newDropDown.addEventListener('change', setArmorOptionOnClick, false);
            newDropDown.setAttribute('id', 'armorset_combobox');
            newDropDown.setAttribute('class', '');
            newDropDown.style.width = '127px';
            newDropDown.style.position = 'relative';
            // fix for update 1.27
            right_work_bar = $('workbar_right');
            if (right_work_bar) {
                newDropDown.style.top = '-22px';
                newDropDown.style.left = '-128px';
            }
            hideElement(newDropDown);

            dunButt.addEventListener('click', function() {

                createOptionsList(newDropDown);
                toggleElement(newDropDown);

                if (!isElementHidden(newDropDown)) {
                    newDropDown.focus();
                }

            }, false);
            newLI.appendChild(newDropDown);
        }

        function saveArmor() {
            var lstTenue = getListOfSets();

            var setName = trim(gInputElement.value);
            
            if(setName=='RazTout'){
                  razSet();
                  return;
            }
            
            
            
            if (setName === '') {
                if (gArmorInputType === 'drop') {
                    new HumanMessage(WR.lang.SAVE_CHOOSE_NAME_ERROR_TEXT);
                }
                gInputElement.focus();
                return;
            }
            if (!isValidSetName(setName)) {
                new HumanMessage(WR.lang.SAVE_INVALID_NAME_ERROR_TEXT);
                gInputElement.focus();
                return;
            }

            var bIsInList = isInList(lstTenue, setName);
            if (bIsInList) {
                // confirm overwrite
                if (!confirm(WR.lang.CONFIRM_OVERWRITE_TEXT + ' "' + setName + '" ?')) {
                    gInputElement.focus();
                    return;
                }
            }

            var l_animal, l_body, l_foot, l_left_arm, l_head, l_yield, l_right_arm, l_neck,l_pant, l_belt;
            l_animal=l_body=l_foot=l_left_arm=l_head=l_yield=l_right_arm=l_neck=l_pant=l_belt = '';
            if (!isNull(Wear.wear.animal)) {
                l_animal    = Wear.wear.animal.get_short();
            }
            if (!isNull(Wear.wear.body)) {
                l_body      = Wear.wear.body.get_short();
            }
            if (!isNull(Wear.wear.foot)) {
                l_foot      = Wear.wear.foot.get_short();
            }
            if (!isNull(Wear.wear.left_arm)) {
                l_left_arm  = Wear.wear.left_arm.get_short();
            }
            if (!isNull(Wear.wear.head)) {
                l_head      = Wear.wear.head.get_short();
            }
            if (!isNull(Wear.wear.yield)) {
                l_yield     = Wear.wear.yield.get_short();
            }
            if (!isNull(Wear.wear.right_arm)) {
                l_right_arm = Wear.wear.right_arm.get_short();
            }
            if (!isNull(Wear.wear.neck)) {
                l_neck      = Wear.wear.neck.get_short();
            }
            if (!isNull(Wear.wear.pants)) {
                l_pant = Wear.wear.pants.get_short();
            }
            if (!isNull(Wear.wear.belt)) {
                l_belt      = Wear.wear.belt.get_short();
            }

            setArmorSet(setName, l_animal+':'+l_body+':'+l_foot+':'+l_left_arm+':'+l_head+':'+l_yield+':'+l_right_arm+':'+l_neck+':'+l_pant+':'+l_belt);
            if (!bIsInList) {
                if (lstTenue === '') {
                    lstTenue = setName;
                } else {
                    lstTenue = lstTenue + ';' + setName;
                }
                setListOfSets(lstTenue);
            }
            new HumanMessage(WR.lang.SAVE_MESSAGE_TEXT, {type:'success'});
            setLastSet(setName);
            changeToDropDown(gInputElement);
            updateDropdown();

        }

        function removeArmor() {
            if (gArmorInputType === 'text') {
                // cancel adding of new set
                changeToDropDown(gInputElement);
                ajout_com_icone("wardrobe_cancelOrDelete_button", WR.lang.DELETE_BUTTON_TEXT);
                return;
            }
            // remove existing set
            var setName = gInputElement.value;

            if (setName === '') {
                new HumanMessage(WR.lang.DELETE_CHOOSE_NAME_ERROR_TEXT);
                gInputElement.focus();
                return;
            }
            // remove existing set
            if (!confirm(WR.lang.CONFIRM_OVERWRITE_TEXT + ' "' + setName + '" ?')) {
                gInputElement.focus();
                return;
            }
            removeArmorSet(setName);
            var listOS = getListOfSets();

            listOS = listOS.split(';');
            var newListOS = '';

            for(var ind=0; ind < listOS.length;ind++) {

                if (listOS[ind] != setName && listOS[ind] != '') {
                    if (newListOS == '') {
                        newListOS = listOS[ind];
                    } else {
                        newListOS += ';' + listOS[ind];
                    }

                }
            }
            if(newListOS=="") {
                setLastSet("");
                alignSelected("");
            }
            setListOfSets(newListOS);
            setLastSet("");
            updateDropdown();
            changeToDropDown(gInputElement);
        }

        //Affiche le commentaire au format "The West"
        function ajout_com_icone(nom_icone, commentaire) {

            $(nom_icone).addMousePopup(new MousePopup("<B>" + commentaire + "</B>"));

        }

        function setChangeOnSelect() {

            var zoneMode=$('zoneMode');
            var optInv=$('optcurInv');
            var input = $('inputSet');
            //debug("setChangeOnSelect" + input.value);
            var check = isChecked("changeonselect");
            if(check) {
                showElement(input);
                showElement(zoneMode);
                hideElement(optInv);
                optInv.innerHTML =getLastSet();
            } else {
                hideElement(zoneMode);
                hideElement(input);
                showElement(optInv);
                alignSelected(getLastSet());

            }
            //alignSelected(getLastSet());
            localStorage.setItem("changeonselect", check);

        }

        function addInventoryButtons() {

            if(!isNull($('rapidoFringue'))) {
                //Déja présent, pas la peine de le recreer

            } else {

                var invTargetPos = null;

                // check if inventory window is fully loaded

                if (!AjaxWindow.windows['inventory'].isReady || isNull($('bag'))) {
                    setTimeout( function() {
                        addInventoryButtons();
                    }, 200);
                    return;
                }

                invTargetPos = $('window_inventory_content');

                var nTable = document.createElement('table');
				if(billonly == false){
				  nTable.setAttribute("style", "position: absolute; top:0px; margin-left: -5px; margin-top: 2px;");
				}
				else{
				  nTable.setAttribute("style", "position: absolute; top:0px; margin-left: 220px; margin-top: 7px;");
				}

                nTable.setAttribute("id", "rapidoFringue");

                invTargetPos.appendChild(nTable);

                var nTR = document.createElement('tr');
                nTable.appendChild(nTR);
				
				if(billonly == false){

				  var nTD = document.createElement('td');
				  nTR.appendChild(nTD);
  
				  // select
				  createDropInvDropDown();
  
				  nTD.appendChild(gInputElement);
				  nTR.appendChild(nTD);
  
				  nTD = document.createElement('td');
				  nTR.appendChild(nTD);
				  // Check box de selection rapide / modification
				  ns = document.createElement('input');
  
				  ns.setAttribute("style","cursor: pointer;");
				  ns.setAttribute("type","checkbox")
				  ns.setAttribute("id","changeonselect");
				  ns.addEventListener("click",setChangeOnSelect, false);
  
				  var isCheck=(localStorage.getItem("changeonselect"));
				  if(isCheck=='true' || isNull(isCheck)) {
					  ns.setAttribute("checked",isCheck);
				  }
  
				  nTD.appendChild(ns);
				  nTD = document.createElement('td');
				  nTR.appendChild(nTD);
  
				  // Zone de modification caché / visible
				  var nsZ = document.createElement('div');
				  nsZ.setAttribute("id", "zoneMode");
  
				  // image modifier / ajouter
				  ns = document.createElement('img');
				  ns.setAttribute("style", "cursor: pointer; width:33px; height:33px;");
				  ns.setAttribute("id", "yesico");
				  ns.setAttribute("src", Tenue_Icons.YesImg);//"data:image/gif;base64," + buttonImg);
				  ns.addEventListener("click", saveArmor, false);
				  ns.setAttribute("alt",  WR.lang.SAVE_BUTTON_TEXT);
  
				  nsZ.appendChild(ns);
  
				  // image supprimer / annuler
				  ns = document.createElement('img');
				  ns.setAttribute("style", "cursor: pointer; width:33px; height:33px;");
				  ns.setAttribute("id", "wardrobe_cancelOrDelete_button");
				  ns.setAttribute("src", Tenue_Icons.NoImg);//"data:image/gif;base64," + buttonImg);
				  ns.addEventListener("click", removeArmor, false);
  
				  nsZ.appendChild(ns);
  
				  nTD.appendChild(nsZ);
  
				  ajout_com_icone("yesico", WR.lang.SAVE_BUTTON_TEXT);
				  ajout_com_icone("changeonselect",WR.lang.CHECK_CHANGEONSELECT);
				  ajout_com_icone("wardrobe_cancelOrDelete_button", WR.lang.DELETE_BUTTON_TEXT);
  
				  setChangeOnSelect();
				
				} // end billonly
				
                // Ajout des options pour mettre directement le vetements selectionnés dans TWPro (si TWPro est dispo)
                if(!isNull(TWPro)) {

                    nTD = document.createElement('td');
                    nTR.appendChild(nTD);
                    nTD.setAttribute("width","80px");
                    nTD.setAttribute("align","right");
                    nTD.setAttribute("style", "position: absolute; align:rigth;");

                    // Bouton de changement de set à partir de TWPro
                    ns = document.createElement('img');
                    ns.setAttribute("style","cursor: pointer; align:right;width:33px; height:33px;");
                    ns.setAttribute("src", Tenue_Icons.BillImg);
                    ns.addEventListener("click",wearSelected, false);
                    ns.setAttribute("id", "twico");
                    nTD.appendChild(ns);

                    // Check box de non changement d'arme
                    ns = document.createElement('input');
                    ns.setAttribute("style","cursor: pointer;");
                    ns.setAttribute("type","checkbox")
                    ns.setAttribute("id","checkRArm");

                    var isCheck=(localStorage.getItem("changeRArm")=='true');
                    if(isCheck)
                        ns.setAttribute("checked",isCheck);

                    ns.addEventListener("click",setCheckedArm, false);
                    nTD.appendChild(ns);

                    // Check box de non changement d'animal
                    ns = document.createElement('input');
                    ns.setAttribute("style","cursor: pointer;");
                    ns.setAttribute("type","checkbox");
                    ns.setAttribute("id","checkAnimal");
                    var isCheck=(localStorage.getItem("changeAnimal")=='true');
                    if(isCheck)
                        ns.setAttribute("checked",isCheck);
                    ns.addEventListener("click",setCheckedAnimal, false);
                    //ns.appendChild(nb);

                    nTD.appendChild(ns);

                    ajout_com_icone("twico", WR.lang.TW_BUTTON_TEXT);
                    ajout_com_icone("checkRArm", WR.lang.CHECK_RARM_TEXT);
                    ajout_com_icone("checkAnimal",WR.lang.CHECK_ANIMAL_TEXT);

                }

                if(Beta) {

                    //debug("Beta release");

                    ns = document.createElement('a');

                    //	ns.setAttribute("href", "javascript:");
                    nTD.appendChild(ns);

                    nb = document.createElement('img');
                    nb.setAttribute("style","cursor: pointer; width:30px; height:30px;align:right;");
                    nb.setAttribute("src", Tenue_Icons.DuelImg);
                    nb.addEventListener("click", razSet, false);
                    nb.setAttribute("id", "betaico");

                    ns.appendChild(nb);

                    ajout_com_icone("betaico","RAZ List");

                }
				if(billonly == false){
				  updateDropdown();
				  setChangeOnSelect();
				}

            }

        }

        function razSet(){
                    if(confirm("Vous allez supprimer toute les tenues sur ce monde ?")){
                         var  lstTenue = getListOfSets();
                            lstTenue=lstTenue.split(";");

                            for(var indDun=0; indDun<lstTenue.length;indDun++) {
                                          name = lstTenue[indDun];
                                          
                                          removeArmorSet(name);
                            }
                             setListOfSets("");
                             setLastSet("");
                            localStorage.setItem("changeonselect", '');
                            alignSelected("");
            
                            updateDropdown();
                            changeToDropDown(gInputElement);
                      }
                        
        }
        /**
         * Recherche un element avec une classe spécifié dans un element parent
         *
         */
        function getElementByClassName( element, id ) {

            var result = null;
            if ( element.getAttribute('class') == id )
                return element;

            for ( var indR = 0; indR < element.childNodes.length; indR++ ) {

                if ( element.childNodes[indR].nodeType == 1 ) {
                    result = getElementByClassName( element.childNodes[indR], id );
                    if ( result != null ) {
                        break;
                    }

                }
            }

            return result;
        }

        // Initialisation
        function wr_init() {
            if(billonly==false) createDropdown();

            // injection sur ouverture de l'inventaire
            AjaxWindow.setJSHTML_Tenue = AjaxWindow.setJSHTML;
            AjaxWindow.setJSHTML = function(div,content) {
                AjaxWindow.setJSHTML_Tenue(div,content);
                if(div && div.id && div.id.search(/inventory/) != -1)
                    //setTimeout(
                    addInventoryButtons();
                //, 0);
            }
            $('abdorment_right').style.zIndex = "5";

            // fix for update 1.27
            right_work_bar = $('workbar_right');
            if (right_work_bar && billonly==false) {
                right_work_bar.style.top = (findPosY(right_work_bar)+26)+"px";
            }

        }

        //wr_init();
		if(typeof window.WR == 'undefined'){
		  try{
			window.WR = new Object();
			WR.lang = wr_lang;
			window.addEvent('domready', wr_init);
		  }catch(e){alert(e)}
		}


///////////* SOM Manager by Zyphir */////////////


 ///////////* end SOM Manager */////////////

 
 	function maj_a_verifier()
	{
		//
		// Gestion de la màj toute les 24 h
		//

		var heure_dernier_maj = 0 ;
		//Lit le contenu de la variable
		var donnee = localStorage.getItem(MENU_maj) ;
		if (donnee != null)
		{
			heure_dernier_maj = donnee ;
		}

		//Récupération de l'heure actuelle (en s depuis 1970)
		var heure_actuelle = new Date().getTime() / 1000 ;
				
		//Calcul le delta entre la dernière vérif et maintenant
		var delta = heure_actuelle - heure_dernier_maj ;
		if (delta < DELTA_maj) 
		{
			return false ; //Pas de màj à vérifier
//			return true ; //Force la màj
		}
		else
		{
			return true ;
		}
	}

	//Fonction de traitement du retour du source de l'iframe
	function trait_ret_iframe(contenu_iframe)
	{
	  if (contenu_iframe.origin != "http://userscripts.org") return; //Sort si le retour n'est pas le contenu d'un script
	  var version_recuperee = unescape(contenu_iframe.data);
	  try{
		if (version_recuperee.match(/^\d+/) == NUMERO_SCRIPT) //vérifie si le message commence par le bon numéro de script 
		{
			var script_version = version_recuperee.match(/\/\/ @version+\s*(.*)/)[1]; //Récupération du contenu après @version
			if (script_version != VERSION_SCRIPT) //Ne fais rien si la version est identique
			{
				var script_nom = version_recuperee.match(/\/\/ @name+\s*(.*)/)[1]; //Récupération du contenu après @name
				var script_auteur = version_recuperee.match(/\/\/ @release+\s*(.*)/)[1]; //Récupération du contenu après @release 
				//
				//Travaille sur les variables @history
				//
				var tab_history = version_recuperee.match(/\/\/ @history+\s*(.*)/g); //Récupération du tableau des lignes

				//Initialisation des variables
				var version_history_precedente	= "" ;
				var nb_version_history_trouvee	= 0 ;
				var contenu_fenetre_history		= "<DIV STYLE='text-align:center;font-weight:bold'>"+script_nom+"<span style='font-size:9px'> "+VERSION_SCRIPT+"</span><span style='font-size:11px'>";
				contenu_fenetre_history	+= eval(TheWestApi.displayOutdated.toString().match(/(currentVersionMsg *= *)([^;]+)/)[2].replace("this.version", "\"<span style='color:rgb(34,34,136)'>"+script_version+"</span></span>\""));
				contenu_fenetre_history	+= "</DIV><DIV ID='script_history' STYLE='border:1px #DABF83 inset;overflow:auto;height: 250px;margin-top:3px;'><TABLE>";

				function make_script_history(his){
				  //Boucle qui parcourt les @history
				  for (var i=his; i<tab_history.length ; i++)
				  {
					  ligne	= tab_history[i].match(/\/\/ @history+\s*(.*)/)[1];
					  version_history_avec_espace	= ligne.match(/^[a-zA-Z0-9\.\-\|\/]*\s/)[0] ; //contient les n° de version
					  version_history_full = version_history_avec_espace.replace(/(^\s*)|(\s*$)/g,""); //suppression des espaces
					  version_history = version_history_full.split("|")[0];
					  version_history_date = version_history_full.split("|")[1] || "";
  
					  //Sort si le nb maximum d'historique est atteint
					  if (nb_version_history_trouvee >= NB_HISTORY && version_history != version_history_precedente) return i ;
					  if (i==(tab_history.length-1) && $("script_history_next")) $("script_history_next").style.display="none";
  
					  //Teste si la version a changé
					  if (version_history != version_history_precedente)
					  {
					  if (i>0) contenu_fenetre_history += "</UL></TD></TR>";
						  contenu_fenetre_history += "<TR><TD width='500px' style='border: solid 1px #666666;background: url(../images/profile/settings_profile_input_bg.png);font-size:12px;vertical-align:top;'><B>" + version_history + "</B> <span style='float:right;font-size:10px;font-style:italic'>"+version_history_date+"</span><BR><UL style='margin-bottom:4px;'>" ;
						  nb_version_history_trouvee++ ;
						  version_history_precedente = version_history ;
					  }
					  version_history_full=version_history_full.replace("|","\\|");
					  var reg = new RegExp(version_history_full + "+\s*(.*)");
					  texte_history = ligne.match(reg)[1];
					  contenu_fenetre_history += "<LI>" + texte_history + "</LI>" ;
					  
					  if (i==tab_history.length-1) contenu_fenetre_history += "</UL></TD></TR>";
				  }
				}
				var script_history_next = make_script_history(0)||0;
			  
				function make_script_history_next(){
					contenu_fenetre_history='';
					nb_version_history_trouvee = 0;
					script_history_next=make_script_history(script_history_next);
					$("script_history").firstChild.firstChild.innerHTML += contenu_fenetre_history;
				}
				window.make_script_history_next = make_script_history_next;

				contenu_fenetre_history += "</TABLE>";
				
				if(script_history_next>0 && script_history_next<tab_history.length)contenu_fenetre_history += "<div id='script_history_next' style='text-align:center;font-size:10px;margin-top:-3px'><a href='javascript:window.make_script_history_next();'>[+"+NB_HISTORY+"]</a></div>";

				contenu_fenetre_history += "</DIV>";
				
				contenu_fenetre_history	+= "<DIV style='float:left;font-size:10px;margin-top:2px;margin-left:4px'>"+eval(TheWestApi.displayOutdated.toString().match(/api.website *\?.+(?=['"]['"]\)*,'*\)* *"*\)*<\/div)/)[0].replace(" | ", "").replace(/api.website/g, "\"http://userscripts.org/scripts/show/"+NUMERO_SCRIPT+"\\\"\"+\"\\\" target='_blank'\"")+"\"\"")+"</DIV>";
				contenu_fenetre_history	+= "<DIV style='float:right;font-size:10px;margin-top:2px;margin-right:4px'>"+eval(TheWestApi.displayOutdated.toString().match(/api.author *\?.+(?=['"]['"]\)*,\(* *api.website *\?)/)[0].replace(" | ", "").replace(/api.author/g, "\""+script_auteur+"\"")+"\"\"")+"</DIV>";
				contenu_fenetre_history	+= "<BR><DIV STYLE='margin-bottom:-10px;text-align:center;font-weight:bold'>Install ?</DIV>";

				showMessage(contenu_fenetre_history, "Script Updater by [<a href='http://scripts-o-maniacs.leforum.eu' target='_blank'>SOM</a>]", 400, undefined, [["ok", function () {try{(typeof(safari) != "undefined" && safari)?window.open("http://userscripts.org/scripts/show/" + NUMERO_SCRIPT):location.href = "http://userscripts.org/scripts/source/" + NUMERO_SCRIPT + ".user.js";}catch(e){}}], ["cancel"]]);			
			}
			//Stocke l'heure de la dernière vérif
			var heure_actuelle = new Date().getTime() / 1000 ;
			localStorage.setItem(MENU_maj,heure_actuelle) ;
		}
	  }catch(e){
				//Réessaye 2h plus tard en cas d'erreur (timeout uso)
				var heure_actuelle = ((new Date().getTime() / 1000)-79200) ;
				localStorage.setItem(MENU_maj,heure_actuelle) ;
				}
	}

	if (maj_a_verifier())
	{
		//Test safari
		var navigateur = navigator.userAgent.toLowerCase();
		//Initialisation de la variable
		var scr_script = "http://userscripts.org/scripts/source/" + NUMERO_SCRIPT + ".meta.js";

		//Vu que pour chrome, il y a "safari", je teste avant la présence de chrome
		var chrome = navigateur.indexOf("chrome") + 1 ;
		if (!chrome)
		{
			safari = navigateur.indexOf("safari") + 1 ;
			if (safari)
			{
				var scr_script = "http://userscripts.org/scripts/review/" + NUMERO_SCRIPT;
			}
		}

		//
		//IFRAME
		//

		//Écriture dans une iframe le contenu de la source de l'en-tête du script
		var source_script=document.createElement('iframe');

		source_script.setAttribute('id', 'maj_' + NUMERO_SCRIPT);
		source_script.setAttribute('style', 'display:none;');
		//source_script.setAttribute('style', 'display:inline; position:absolute; width:500px; height:600px;');
		source_script.src = scr_script ;

		document.body.appendChild(source_script);
		// Fin de la génération de l'iframe

		// fix for iframe bad content loading
		var f=document.getElementsByTagName("iframe");
		for(var i=0;i<f.length;i++){
			if(f[i].src.substring(0,31)=="http://www.jeux-alternatifs.com") continue;
			if(f[i].src.substr(f[i].src.length-1)=="#") f[i].src=f[i].src.substr(0,f[i].src.length-1);
			else f[i].src=f[i].src+"#";
		} 

		//Ajout d'un évènement pour récupérer le contenu de l'iframe
		window.addEventListener('message', trait_ret_iframe, true);
	}

	})

} // end if (url.indexOf(".the-west.") != -1)
else	//Cas du script exécuté dans l'iframe pour la mise à jour
{
	//Création d'une fonction globale pour tout le script
	(function(f){var d=document,s=d.createElement('script');s.setAttribute('type','application/javascript');s.textContent = '('+f.toString()+')()';(d.body||d.head||d.documentElement).appendChild(s);s.parentNode.removeChild(s)})(function(){

	/////////////////////////////////////////////////////////
	// DÉCLARATION DES CONSTANTES
	/////////////////////////////////////////////////////////
	var NUMERO_SCRIPT	= "104485" ;

	//Envoi des informations à la fenêtre principale
	function envoi_info(){
		var destination = window.parent;
		message = String(escape(document.body.textContent));

		//Indiquer le n° du script pour identifier la communication
		if(destination.postMessage) {
			destination.postMessage(NUMERO_SCRIPT + message, '*');
		}
	}
	envoi_info();
	})
}