/*
The West BB-codes bar
Иконки зданий города
Best Items by Storan Лучшие_вещи - ver2
сохранение наборов (сом)
показывает опыт в салуне
показывает опыт в окошке дуэль

*/

// ==UserScript==
// @name           LeniWest v2.0
// @namespace      www.the-west.sk
// @namespace      www.the-west.ru
// @description    West: LenivetZ
// @description    Иконки зданий города, Лучшие_вещи - ver2
// @include        http://ru*.the-west.*
// @include        http://no*.the-west.no.*
// @include        http://*.beta.the-west.*
// @include        http://zz1w1.tw.innogames.net/game.php*
// @exclude        http://forum.the-west.*     
// ==/UserScript==


// для Mozilla
aWindow = (unsafeWindow) ? unsafeWindow : window;
// +++++


// для Opera
//aWindow = window;
// +++++

var $=aWindow.$;

//======================================= SOXRANENIE NABOROV =============================================================
// ==UserScript==
// @name            The West - Tenue [SOM]
// @namespace       http://userscripts.org/scripts/show/94811
// @description     Script for The-West: Tenue [SOM - Scripts-O-Maniacs] [Multilingual] - 1.3.n
// @author          Dun [SOM - Scripts-O-Maniacs] - Originally by Puli / Muche - Translate fr Hack Crow
// @website         http://scripts-o-maniacs.leforum.eu
// @include         http://*.the-west.*/game.php*
// @include         http://userscripts.org/scripts/source/94811.meta.js
// @version         1.3.3.4
//
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

// MAJ Auto
var tenue_version = "1.3.3.4";
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

        // FIN MAJ AUTO
        var Beta = false;
        var gLang='en'; // langue par défaut
        var intercept=true;
   
      
        var wardrobe_text={en:'Наборы', sk:'Šatník', cz:'Skříň', fr:'Tenue',ru:'Гардероб'};
        var new_name_text={en:'Новый набор', sk:'Nový názov', cz:'Nový název', fr:'Nouveau nom',ru:'Новое название'};
        var cancel_button_text={en:'Отменить', sk:'Zrušiť', cz:'Zrušit', fr:'Annuler',ru:'Отмена'};
        var delete_button_text={en:'Удалить', sk:'Zmazať', cz:'Smazat', fr:'Supprimer',ru:'Удалить'};
        var save_button_text={en:'Co[hfybnm', sk:'Uložiť', cz:'Uložit', fr:'Sauvegarder',ru:'Сохранить'};
        var tw_button_text={en:'Выбрать TWPro', sk:'TWPro', cz:'TWPro', fr:'Sélection TWPro',ru:'Выбрать TWPro'};
        var save_message_text={en:'Комплект сохранён', sk:'Šatník bol uložený', cz:'Skříň byla uložena', fr:'Tenue mise à jour',ru:'Комплект сохранён'};
        var confirm_overwrite_text={
            en:'Вы действительно хотите перезаписать Набор ',
            sk:'Naozaj chceš prepísať oblečenie s názvom ',
            cz:'Skutečně chceš přepsat oblečení pod názvem ',
            fr:'Voulez-vous vraiment modifier la tenue ',
            ru:'Вы действительно хотите перезаписать Гардероб'
        };
        var save_choose_name_error_text={
            en:'Вы должны сделать новый комплект или открыть существующий!',
            sk:'Najprv musíš vybrať položku "Nový názov" alebo už existujúcu položku!',
            cz:'Musíš nejdřív vybrat položku "Nový název" nebo už existující položku!',
            fr:'Vous devez choisir "Nouveau nom" ou une tenue existante !',
            ru:'Вы должны сделать новый комплект или открыть существующий"!'
        };
        var save_invalid_name_error_text={
            en:'Название комплекта содержит недопустимые символы!',
            sk:'Názov oblečenia obsahuje neplatné znaky!',
            cz:'Název oblečení obsahuje neplatné znaky!',
            fr:'Le nom de la tenue contient des caractères invalides !',
            ru:'Название комплекта содержит недопустимые символы'
        };
        var delete_choose_name_error_text={
            en:'YВы должны выбрать набор!',
            sk:'Najprv musíš vybrať položku!',
            cz:'Musíš nejdřív vybrat položku!',
            fr:'Vous devez choisir une tenue existante !',
             ru:'Вы должны выбрать набор!'
        };
        var changeOk_text={
            en:'Набор одет',
            sk:'Ok',
            cz:'Ok',
            fr:'Changements de vétements effectués',
            ru:'Ок'
        };

        var  check_rarm_text={
            en:'Не менять Дуэльное оружие',
            sk:'Don\'t change right arm',
            cz:'Don\'t change right arm',
            fr:'Ne pas changer d\'arme main droite',
            ru:'Не менять Дуэльное оружие'};  
  

        var  check_animal_text={
            en:'Не менять Средство передвижения',
            sk:'Don\'t change animal',
            cz:'Don\'t change animal',
            fr:'Ne pas changer de monture',
            ru:'Не менять Средство передвижения'
        };

        var  check_changeonselect={
            en:'Режим настройки',
            sk:'Configuration Mode',
            cz:'Configuration Mode',
            fr:'Mode configuration',
            ru:'Режим настройки'
        };
        var  error_confmodenotactivated={
            en:'Включить Режим настройки при создании нового комплекта?',
            sk:'Active Configuration Mode for create new set ?',
            cz:'Active Configuration Mode for create new set ?',
            fr:'Voulez vous activer le Mode Configuration pour creer un nouveau set ?',
            ru:'Включить Режим настройки при создании нового комплекта?'
        };

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
            YesImg:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAoCAYAAACSN4jeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN/rXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz/SMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH/w/qQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA/g88wAAKCRFRHgg/P9eM4Ors7ONo62Dl8t6r8G/yJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt/qIl7gRoXgugdfeLZrIPQLUAoOnaV/Nw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl/AV/1s+X48/Pf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H/LcL//wd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93/+8//UegJQCAZkmScQAAXkQkLlTKsz/HCAAARKCBKrBBG/TBGCzABhzBBdzBC/xgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD/phCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q/pH5Z/YkGWcNMw09DpFGgsV/jvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY/R27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4/OBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L/1U/W36p/VHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N/T0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26/uNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE/C5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV/MN8C3yLfLT8Nvnl+F30N/I/9k/3r/0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt/87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi/RNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a/zYnKOZarnivN7cyzytuQN5zvn//tEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO/PLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3/T7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA/0HIw6217nU1R3SPVRSj9Yr60cOxx++/p3vdy0NNg1VjZzG4iNwRHnk6fcJ3/ceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX/i+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8/pPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb/1tWeOT3dvfN6b/fF9/XfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR/cGhYPP/pH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF/6i/suuFxYvfvjV69fO0ZjRoZfyl5O/bXyl/erA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o/2j5sfVT0Kf7kxmTk/8EA5jz/GMzLdsAAAAgY0hSTQAAeiUAAICDAAD5/wAAgOkAAHUwAADqYAAAOpgAABdvkl/FRgAADZhJREFUeNqsmHmI3dd1xz/3/n5vmzfvzfLmvdEyWi1Zkhd5k0RwlMSK0xIHXIiJ7RZKQ52uIbitISYtpDRxHVpIWyhuE9I6dZoqGLmlUENI4pjUju3YkazV2pcZaUazarb3fm/73eX0j9+bkRTVSyAXhsePt5zPfO+533PuUSLC+y0RwXuPiOCcwzm3/J4XTzabxVmHAOIFvEMUBGGKudkZvKCmpqYFEVKpFF1dXXR358l1dZFJZwjDkCAIroupRIQX/uPvkgcF7ZYjjj3ttiEMAwpdmkcf+xK/yvXSj3/MQKlEqdRPobtAOpPhP7/7dTJBiA41egnsl1nOOX1g/1u3vvH6q4/NTE1/ol6vrWm321nvfQCgtXZKKaOUmu/Odx1YsWrNN5744p+/9MvE2PuvT31wsKhW63rllZ/89pFDB/5qYnJiMKrWlLVWeW9xznHtzyTb7tFaSxCEEgR6vlDs/afbt9/1j5//wuOzS597++ABdc/dO24A+PYzX/5gYD999ScPHnz7wDfHRi+tnJqcUJOTE0RRxNJ3RUBdm5MISilSqZBcroswDBHvJZ3OLpTKg385tHbtN7/y1aftu8X7+6efeG+wubnZ3h/94PvfuHD+3MPDw+eDy2OjNJtNjDFUKr2sW7eCVasGKPUX6M6FWGtYWKgzPT3L+OQcU9OLLCy2MLFFaUUYhoRhSjKZ3P5CT8/9D3xcopLq5sE/2ntd3Ccf/x3Cd4NaWJjv/e//2vfq8IVzt12+fFldHBnBe8P22zfLjp23qqHVAyAO7xzOG7y3eGfJ59MMrsizbdsqWu2YuSsRR4+PMjxyhVarTazaqlGv76rWqiN7X+i66/FHukcBDh9+Jrjzzi84gO7y5v9fsWp1sbj3u88dOnbk0MZLly7SbDRYu24le+7bwcaNqxHxCYw1eGdw3uFdAudcAmi9w1uHtZbYxCzMN/nZWyOMXJxazscgDKtaBztff+vQmaXYu3btVBvWbxT9i1CLiwvFfc/vfe3YkUMbT5w4zvTMDDt2bONzj32azZvWojSIOMQ7pJPk4l3yKonXiQhKBKWFMFRksykqlQK//mu3sP32daTTKQCsMUVn7Sv33HlbaSn+Rz/6MT1yceRGxfY9v/f5o0cOPXL40EE1PT3FJx/YLZ96YLfC+0QZ7/BuSRmDcxbnDSKJQt5bnLd47/HeQQdUEJx4WsZx8O0xjhy+RNyOcc6TyqRff3P/0d1LDAf271fXKfbaq//7G8MXzj00Ojaq6vU6e/bs5FOf3K3Ee4xzeC8JmE8US2zBgYC4RDEvkmyVSAKF4BW0sVxhkXPqEn3bFTdvXYHWGq0Vcbt977277nh0iePll18OlhWLarXcd577lyNHDh3cdO7cWbVyZUk+/8ePKK3AOtvZIo9fUso7EhVjnIsThZxLwLzHe5u8KqGu2lwOFjm7cI7TEyP0twt8uO9ujr11hYuj0xhj0Vo3Dhw+mV+CW1bsZ2/89KGJ8fEN4+PjKo5bct/HdiqFYJ1NVOokepLkDsTjxXbqKIC6Cu89gtBSjolsg5PBFAfnDnN09B1mh6vIaBobCVtvrtCdzxEEGu9d10c+dNdXbwA7/s7RLzfqUaAU3Lx5ndp00wqcNzgT45zBi7166iRRxHuHcwaQBFwEnMfhWchaRgpV3mmc4a3Lr3Ps4DncySzb/VZu6l4HVrF6qIcN6wdJp9MEQUir1f6Te+7clgUSH3vzjdfuqVar6+fm5pQxRu66Y7PSgcOaJJ+SGmlQndwRWYJKFHPWLHu+DWE23eYcE4zOXuD08BmuHG9Rcf1sK25msNhHb1+egf5uivkM27aWGb08T7Vao92KC8We/IeBl0OAY0cPPzo/P5eamZkmDIW1a0tYY/HOIUkzA95jveBJcmvJMpbAsZ5GxjGebzDTmub42CFOnRrBXNJsSK9ma99megpdVMoFBgaKZLMpdBiwakWRcqmHer2Jl5ZyTv5gGWxi4vKuVrOpAQYrfSoIFOIM3vtEBaApTcbNNLRabMiswSMdLxMQTz3tGeuuc756itOnTnLpzAxuIc1tuQ2s7x6i1F+gXC7Q399FpuNjzjlEC6WBIhOTczS0ph23713eynpUX4tKalm5UhARUbYDZpSnrR0TQZX95jhmbp50OkMpXyAVBjjvaXagzlZPceDEm4webTHQKLCjbzOre1dQLOYYrBQp9uQIQ40AznvECzoIKPWHpDMZtNbEbVdaBms0GwVrEpBCPqOsN2incWKp02YiqLPoFmk25pman+BEe4J7Vucp9EAt55nIRpxbPM3Pj/yc8dMtys0Cdw5sY3WxQl+pi3K5QD6fIQg0zgleHN4lNuW8kMsGaK0BhfMuvQzWbrW6lxI5ndaIM1gdIGJpSYPL7ctEtsF8bYaajZiL5qhGVWqDIYs5z4nZQxx55x0mTzRZI2Vu7l/PqkKF0kCewRU9ZLNLW5e06M4laiVdswKVRSmFUoqlhjPs9E/BktFa78RZq7ROSkjKaVzcYDoexTgLGSHqmWYy1U+s0ozNjnDk2FGunIpZr1dyS3ETpWKRSqVAf3+BXC6FCDjn8R0Y7wTvk1LlEWx8tQAplXR2IUCggzkjZlBEaNZbyjqDdiB4UkrTa7o4a1tkwxwu65nNzHK66wKLE4uMjkwwd9ZS8j3c1r+Fcl8PAwMFSqU8mUzYucBIAtZRTLzgRHA+gW0bWW40FdeAKaWq3vuKiKi5+bpYY1QqpRAB7aGieymkC0Qqom3bNFydMxNniOZjGheh3xbY3ruF3u48g5Ui/aVuUimNCFibdBy+A2fd0nNSV62BRkNAKQTQWsmy82utLzrnBBFmZyPfNjbpFJxLrmc6Q5/0obQmlUrTiNosXo6pD0OvK3JH7y0MFgcoDxTo6+sinQ4QoWM34P1VKC+Csw7rPNZ6Yis0W0l+I0I6nTLLYIViz8smjr0xhtm5iHYr9iK+U7MUmSAkJQHOO6Jajfqkoz4BRZ/njp6trCiWGKwUGRwsks6EHagkj7zzOOsx1mGdxRqHtR2oGFptxWK1SbPRwFqLsXbfMtjmLVtftM4aY43Uqk01OrYoxjoScSEgQ5kCbd+mbuvENZBYsa5rDZXuEuVykfJAkWwunZws8cnFuANgncM5j3MsK2etEFtoxbCwUKUWRbTasYiXbyyD7d5932mtg/MdL9Fnz00SNZOiLAgihrRO462lPiW4qubm7iHWdK2kp7eLcqVAPp9GK9VRSfA2AXB+KfE91lwDaxyx8bTayU3fWo9SaurI8bNvLINt2brV9vT2PRMGodeBZnqmysWROd+ySROolCelFFG1RWNcMaQH2NJ9E+XeHsoDBfK5DFqrqxBertnOpMFces908ss4wZmAqNqk3W5jnZMg0P9wQ9uz9ZbbvxeE4XQYhmKNC46fuOzr87G31qFEk5EMhWaBgs6wpXATfcU85XI3fb15AqXwwtX5hk1qLCJYm+RUAuxxTrBWaMfCYi1mfHyC+YUFjIkXnPP/dgPYF5/8Uq2nt+/xVCrtwjDF1NRi+Mb+8xJFRqzzZHSaHd3buX9oF0PlMgMDBQbK3YlXqatQiVEnCnnvcT7JK9eBc04wBuoNzdjYJI1GnWajJaD+9OSZ4ZnrhirXrgcfuH9fFNU+02o2lNLab9k8xM6da1U2p5RxllbNEltHoZilWMihYdmbrPFYY3E+UcoYi/GCjV3nGYyBqK64ODpFFNWp1SLqjeZLsTEPnB8ecwDDwxe44fp2984PPZbJZN4JUynxzuvT58Z4481hX6t6Sek0PX15yuUCxXyWQKtl//Fe8OIRwIt0/pbKj8L7EOsCao2Ai6PT1OsNalGdalQfabbjZajE995l2vP7v/fZTRfOnPphq9XaYK1VKFi9quJvu221Xremn0xWEwRCoFRy8pa3ymFtRy0rGOOwFoxRtOIUV+bqjF4ao9FoENUb1GrRrPN+6/nhsSvXxp+ZmXn32cVvPvLQyvGxSz+I263bvfdKa013oVuGhipq08YKKyp5UhmNIul0rfN4K8mJMyQ+ZYRmW7OwYBifmKK6WGV+YYF6vYF1blIFevdnP7Pr/F98bd91sRuNxnsPVT6+Z08QVWf/3dv4YaVUGASBEoSuri4GByuUyz30FNPksppQJ1sXG6HZ8rQanlYsLFYjZmev0Gq1qDeaLCxWJdD6JeDhJ/7wE9VMapLf/bPv/+IM7v3HUIOVSjDQX3w4nQ7+Bi9DQBCEAel0+ppTeH1nIJ3pZBiGKKVoNhOoOI5r6XT6cydOX3jhvWLue+5v333as7Smpqcd8PzQysEfFYv5T6dS4ZPemI3G2CCZVST/3LWA0pnbKpXcq6zzk4HWX69FzWemZsbM+8XUivcHW1pjE1NzwLPAszdvWn9roNVvBYH+CCLrRaRXRFKd+Z0Bmgo1o1A/bLTaz14cnTjll1qND7iUiPD8t7+GNZZGs81Ctcb8QpUNt9zLlekrNJpN/vqpp36lw+EoikilUgRBwHf++St05bOkU6nrVA8BwiBAK42gUChSqTRXLh1mx+6HiOMmL/7Pi4SpkFw2hw40/aV+Ri+Nct+e+7DWcerkSaWUVt47iaI6uVxWwjBUO3fuvC6Bm60mgQ7I5XIopfjet56+fkZ6zfq/AQAW4jqaIHHVcgAAAABJRU5ErkJggg==',
            NoImg:'data:image/png;base64,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',
            DuelImg:'data:image/png;base64,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',
            BillImg:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD8AAAA/CAMAAABggeDtAAAAB3RJTUUH2wIEFCsMJWY4lQAAAAlwSFlzAAALEgAACxIB0t1+/AAAAwBQTFRFVVVVXV1dNzMtYWFh6enpWVlZ+fn5aGNcHBwcubm5V1piioqKbW1tPTk0ZF5VIiIiJCQkdWpdQUFBz8/Py8vLT09O1tbWaWllQj42FhYWenRr4uLiExMTzc3NvLy8REREdnZ22traWVhV2NjYo6OjsrKy09PTU05DR0dGrKysMC0pSEhIJiYmQEBAOTg4g3ptjY2Nm5ubGhoawsLClpaWwMDAvr6+/Pz8Dw8P4ODgt7e3tLS0T1RXmZmZDAwM1NTU8vLyqKiopKSkyMjIhYWFxcXFn5+feXl33d3dMTAwDg4OS0pKX15Zenp60dHRMzMyYlpNUlJSr6+vSkZAKCgoR0M5hoaGUVFQGBgYkJCQZGRkOjo6NDQ07OzsNjY2fn5+c3Nz3t7eTExMLi4uPj4+ampqPDw8ZmZmS0c99PT0eHh4KioqODUxLCwskpKSUFBQgoKCnJycHhwZUUo4CwsKdHJroKCga2NUgXdpKSckgICAcW1l7+/vpqamaGhoKikmZ2ZgaWtvPUJDcGZbRUVCRElLJiQhfHx8FxUTIB8ddm1ecnJwTk5NNjk6MjU1BQUFLiwpIyIhWFZTGxoYU1BLNzUyLCsoKiooOzo4GRkZHR0dJSUlJSMfFxcXGhoZEhIRFRUVFBQUwbusHh4eHx8fICAgISEhy8W1mZSIurSmioR6fHlwop2RkYyBqaSWta+ign50PTw6MzIxsaudTklBdnBmQEA+YF9ih4aIfX58hYGCS0xNXWVuEhEPfHJj2NHAERERe4KIbnByDw4MQ0ZIgYiR5OTkTk5Gx8fHWVVJSkhKamJPSk9TcGZVNzc35ubmgXdiISIji5CHq6urNTU1cHBwNjY5i4FvFRUUQ0NDKSkpfH17R0M8UU9LS0tLVFJVHx8eNzY14+PjnqCap6ukFhUVFhYVVFBF19fXLzIyVVRQjIuIXVM9QkBCOz9BRUVFZ2NcfnVnhYN/Ly8vg5akKSsroZR2LS0tLy8us6+oPz8/VFFOe3FiSUdJfnVg////w0cSXwAAAQB0Uk5T////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AFP3ByUAAAqkSURBVHjapZcJWFpXFsdBpRKVPsQNFBeoCwLBijFDotJojAajVaNWXKI2bm3QLA6mIbZZ1MxAa0uWtlNA5j1WjYkxUHejkn2t3ZK2OB1nJrNlOgvTcWYyk84Mc+/TtDY1bb6v53v4+QG/c87933vuORDcy1uP8dTJ/tOhexL6+nsHjO6HGmGZ96aNv/5gbOzEiSH/Dv+OjrbWEO+h/oFH5qcHPhg7O3o2OyT3cgmdXjLIzvUGNtLaa3wUfvo3Fy9ePHtuoqpFiZ4XTU4qlUpVt0cJ++DIyEif8Tv5430X/342VSGSiwwaIWZgYnoNWXPsmKrbPuEzknvmg55v5XtOjo1evNEid+iFQrKWgaJMg+ETBvZbvVbV3W2/NnLG59zb38Ibx8dHR94X601aspBMJmNMgBsMGMYAj/DIEe5HN3x82P09D+PfHh3N/kjOsCAWMuC1ZAZmMDAAi+kxA0OqEVIP29tTU0uzjcvzp8ZGD7agZKvVaiZDE+oxzIBBJ4t+pDKJfWYi9cY543L8QPYoG2WYzWaLmSyE6ZOlepi4Xg8e+EcqNc+/8carFyZutB7/Jj+QfXouR2Mxa8kmE1kDHQilUujBwERR1IEymWAJZORfv7JdODTR9g3eOHb6qNhhkC4ExvQMBsOAOhyiHDFuOTki4AKsRk/Nbz90ofPEA3zP+NgBETCHA2VIMQf8d5GULzqAHzEBr9G9eqizvbP/63zv2WxyDo7hZM4i/BUvFt1PQKr4y6H29tJTS/mB0LHXxA4QAsehiR+0nEUHYBv2/7mz3RayhJ/uS/iMyRTdt6/zMIEcPAGgIeQZGo/fD9sp/V/xp6ZCTRqh4T4vht90LBUg5358eCIx7Ah90IN79Ut+OmHPpxiQneFYoO01maPP5PmV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%3D'
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

        ( function() {
            var dnPos = gLocation.indexOf("//");

            var lang = gLocation.substring(dnPos+2, dnPos+4);

            if (wardrobe_text[lang]) {
                gLang=lang;
            }

        }());
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
            localStorage.setItem(getServer(gLocation)+'_'+Character.name+'_'+setName, '');
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
                    ajout_com_icone("wardrobe_cancelOrDelete_button", cancel_button_text[gLang]);
                }
                hideElement($("changeonselect"));
            } else {
                //for Chrome & Safari Options can't be hidden
                if(confirm(error_confmodenotactivated[gLang])) {
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
                ajout_com_icone("wardrobe_cancelOrDelete_button", delete_button_text[gLang]);
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
            nNewItem.innerHTML = '... ' + new_name_text[gLang] + ' ...';
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
                new HumanMessage(changeOk_text[gLang], {type:'success'});
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
                new HumanMessage(changeOk_text[gLang], {type:'success'});
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
            dunButt.innerHTML= "<span style=\"width: 102px; color: rgb(255, 255, 255); display: block; z-index: 200; font-size: 13px; position: relative; top: 3px; text-align: center; left: 24px;\">"+wardrobe_text[gLang]+"</span>";
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
            if (setName === '') {
                if (gArmorInputType === 'drop') {
                    new HumanMessage(save_choose_name_error_text[gLang]);
                }
                gInputElement.focus();
                return;
            }
            if (!isValidSetName(setName)) {
                new HumanMessage(save_invalid_name_error_text[gLang]);
                gInputElement.focus();
                return;
            }

            var bIsInList = isInList(lstTenue, setName);
            if (bIsInList) {
                // confirm overwrite
                if (!confirm(confirm_overwrite_text[gLang] + '"' + setName + '" ?')) {
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
            new HumanMessage(save_message_text[gLang], {type:'success'});
            setLastSet(setName);
            changeToDropDown(gInputElement);
            updateDropdown();

        }

        function removeArmor() {
            if (gArmorInputType === 'text') {
                // cancel adding of new set
                changeToDropDown(gInputElement);
                ajout_com_icone("wardrobe_cancelOrDelete_button", delete_button_text[gLang]);
                return;
            }
            // remove existing set
            var setName = gInputElement.value;

            if (setName === '') {
                new HumanMessage(delete_choose_name_error_text[gLang]);
                gInputElement.focus();
                return;
            }
            // remove existing set
            if (!confirm(confirm_overwrite_text[gLang] + '"' + setName + '" ?')) {
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
                nTable.setAttribute("style", "position: absolute; top:0px; margin-left: -5px; margin-top: 2px;");

                nTable.setAttribute("id", "rapidoFringue");

                invTargetPos.appendChild(nTable);

                var nTR = document.createElement('tr');
                nTable.appendChild(nTR);

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
                ns.setAttribute("alt",  save_button_text[gLang]);

                nsZ.appendChild(ns);

                // image supprimer / annuler
                ns = document.createElement('img');
                ns.setAttribute("style", "cursor: pointer; width:33px; height:33px;");
                ns.setAttribute("id", "wardrobe_cancelOrDelete_button");
                ns.setAttribute("src", Tenue_Icons.NoImg);//"data:image/gif;base64," + buttonImg);
                ns.addEventListener("click", removeArmor, false);

                nsZ.appendChild(ns);

                nTD.appendChild(nsZ);

                ajout_com_icone("yesico", save_button_text[gLang]);
                ajout_com_icone("changeonselect",check_changeonselect[gLang]);
                ajout_com_icone("wardrobe_cancelOrDelete_button", delete_button_text[gLang]);

                setChangeOnSelect();
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

                    ajout_com_icone("twico", tw_button_text[gLang]);
                    ajout_com_icone("checkRArm", check_rarm_text[gLang]);
                    ajout_com_icone("checkAnimal",check_animal_text[gLang]);

                }

                if(Beta) {

                    //debug("Beta release");

                    ns = document.createElement('a');

                    //	ns.setAttribute("href", "javascript:");
                    nTD.appendChild(ns);

                    nb = document.createElement('img');
                    nb.setAttribute("style","cursor: pointer; width:30px; height:30px;align:right;");
                    nb.setAttribute("src", Tenue_Icons.DuelImg);
                    nb.addEventListener("click", function() {

                        lstTenue = getListOfSets();
                        //debug(lstTenue.length);
                        setListOfSets("");

                    }, false);
                    nb.setAttribute("id", "betaico");

                    ns.appendChild(nb);

                    ajout_com_icone("betaico","RAZ List");

                }
                updateDropdown();
                setChangeOnSelect();

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
        function init() {
            createDropdown();

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
            if (right_work_bar) {
                right_work_bar.style.top = (findPosY(right_work_bar)+26)+"px";
            }

        }

        init();

        //MAJ AUTO SOM
    })
    /***************************************************************
     * DOM Storage Wrapper Class
     *
     * Public members:
     *     ctor({"session"|"local"}[, <namespace>])
     *     setItem(<key>, <value>)
     *     getItem(<key>, <default value>)
     *     removeItem(<key>)
     *     keys()
     ***************************************************************/
    function Storage(type, namespace) {
        var object = this;

        if(typeof(type) != "string")
            type = "session";

        switch(type) {
            case "local": {
                object.storage = localStorage;
                }
                break;

            case "session": {
                object.storage = sessionStorage;
                }
                break;

            default: {
                object.storage = sessionStorage;
                }
                break;
        }

        if (!namespace || (typeof(namespace) != "string" && typeof(namespace) != "number"))
            namespace = "ScriptStorage";

        object.namespace = [namespace, "."].join("");

        object.setItem = function(key, value) {
            try {
                object.storage.setItem(escape([object.namespace, key].join("")), JSON.stringify(value));
            } catch(e) {
            }
        }
        object.getItem = function(key, defaultValue) {
            try {
                var value = object.storage.getItem(escape([object.namespace, key].join("")));
                if(value)
                    return eval(value);
                else
                    return defaultValue;
            } catch(e) {
                return defaultValue;
            }
        }
        object.removeItem = function(key) {
            try {
                object.storage.removeItem(escape([object.namespace, key].join("")));
            } catch(e) {
            }
        }
        object.keys = function() {
            var array = [];
            var indDun = 0;
            do {
                try {
                    var key = unescape(object.storage.key(indDun++));
                    if(key.indexOf(object.namespace) == 0 && object.storage.getItem(key))
                        array.push(key.slice(object.namespace.length));
                } catch(e) {
                    break;
                }
            } while(true);
            return array;
        }
    }

    /***************************************************************
     * ScriptUpdater Class
     *
     * Public members:
     *     ScriptUpdater.check(<script id>, <current script version>[, <callback function>])
     *     ScriptUpdater.forceCheck(<script id>, <current script version>[, <callback function>])
     *     ScriptUpdater.forceNotice(<script id>, <current script version>[, <callback function>])
     ***************************************************************/
    ScriptUpdater = {
        id: 94811,
        version: "1.03f",
        scriptId: null,
        scriptCurrentVersion: null,
        scriptCallbackFunction: null,
        scriptUseNotice: null,
        scriptForceNotice: null,
        scriptMetaTags: null,
        scriptStorage: null,
        icons: {
            install: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAALZSURBVBgZBcFLiFVlAADg7zzuPLzjzDjOMINMitIie5gF+UAkIZSgRQuXLZIWrY021dYIggJdJURElJsoqlWRYA9GshGFCNQeOjoTk6bjeOd5zzn/f07flzRNA459ObcHJ3cM9+1fq2prVa2qa+uh7mAZ9xCxiAV8iu9zgDqEvU9ODOx//dkxALBa1kNrZT202I2TZcVyEd28t+Lb66uHcTwHqEMYH+xJwNyDqJUk8oQsp7eV2tqbytJUK+OpyX5bhtojH07Pv58CxKoabOeEmuUy0al4UNDp0umysM5/KxG8eWbW/u1tj4+2xnKAWFUjG3tSqwWr3ShNEzmyjDQjk8gSaiRxyYUbiy7PduZzgFiW40P9mc56sFY00rSRpaQxkaVkGlmGJnNnqXDq7N9LOJYDhLLcNj7Y0uk2AjRkMZE2iGQaeZOqG2IrCmXY/s1rB+6nALEstk0M9VotG0lKliRSpEjw+YUjPjq3RxkKoSjEsoiQwvMnvusXQ09vK1VGUg1qjVrUqDWKUJoc3emVj3dbWeuEUJZLkEMoyrF2u0+aUEPD19OHNXVQ1kEZgy2bHrZzYq/l7qr766/m3VC0ub+SQyyLDXm7R56SpYlYJ0JdOvzYy2JTi3VUa8x35jwxecBKue7S7E+dXW+nI/nB42dGcWLPI1vdXmrcvBO1++iGUmxqtxb+UtVBqCtVrCwVy3Y/dNBKtZb+OjO1kMeyfA4vXLo6Y3E9t1I0qtjo6goxGB/cKtRRbGr/dmaNDEy4PHfe+etTd8vgSB6r6ukXD+3qf+ulfQDg6OnCJ7+8p6xL3VDaMfqofTuOuHhryrk/fl4tokPz7zRX8lhVM7fvdXx29qrhgX7Dg32G271OHv3dxg09entSvXnqmXcHJGm/6Ru/ad89dmrm9AdXIK9D+GLq4rXJqYvXtmEzNmMTNmGor6fV6utr6YxWfvjzR0P/vDGTh7GvAP4H2uh1wse2x/0AAAAASUVORK5CYII%3D",
            close: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAIhSURBVDjLlZPrThNRFIWJicmJz6BWiYbIkYDEG0JbBiitDQgm0PuFXqSAtKXtpE2hNuoPTXwSnwtExd6w0pl2OtPlrphKLSXhx07OZM769qy19wwAGLhM1ddC184+d18QMzoq3lfsD3LZ7Y3XbE5DL6Atzuyilc5Ciyd7IHVfgNcDYTQ2tvDr5crn6uLSvX+Av2Lk36FFpSVENDe3OxDZu8apO5rROJDLo30+Nlvj5RnTlVNAKs1aCVFr7b4BPn6Cls21AWgEQlz2+Dl1h7IdA+i97A/geP65WhbmrnZZ0GIJpr6OqZqYAd5/gJpKox4Mg7pD2YoC2b0/54rJQuJZdm6Izcgma4TW1WZ0h+y8BfbyJMwBmSxkjw+VObNanp5h/adwGhaTXF4NWbLj9gEONyCmUZmd10pGgf1/vwcgOT3tUQE0DdicwIod2EmSbwsKE1P8QoDkcHPJ5YESjgBJkYQpIEZ2KEB51Y6y3ojvY+P8XEDN7uKS0w0ltA7QGCWHCxSWWpwyaCeLy0BkA7UXyyg8fIzDoWHeBaDN4tQdSvAVdU1Aok+nsNTipIEVnkywo/FHatVkBoIhnFisOBoZxcGtQd4B0GYJNZsDSiAEadUBCkstPtN3Avs2Msa+Dt9XfxoFSNYF/Bh9gP0bOqHLAm2WUF1YQskwrVFYPWkf3h1iXwbvqGfFPSGW9Eah8HSS9fuZDnS32f71m8KFY7xs/QZyu6TH2+2+FAAAAABJRU5ErkJggg%3D%3D",
            uso: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAQCAYAAAAiYZ4HAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAh9JREFUeNp0krmLWnEQxyf7zLoajyIWXojIxkK0EiIGCRamCKQwEdIIgYQoQSR/wLY2goVVJGCa1BaL2liKBESFiOJFiMRb1xMVRbx+mfdA0RwDA4/3m+Mz3xmAf9hDNJ/P9zWXy935/f7A5eXlFfzPRCKROBgMfqvX62S5XBLabDbbh8M76zRYKpUqvF5vyGw2P+bz+cBisWCz2cB2u33wV2WFQvEoFArlW60WmUwmZLVakdFoRNxu9xd8Fp51UKlUWmS91ev11zweD5AZMAFmsxkgWhpDpsfKarVaE4lEqpVKhUynU4a73++TcrlMarUa6Xa7G7vd/u4QT93c3HzmcrlPSqUSiMVihrvX68F6vYZsNkvPcOFyuV5Uq9VuoVD4ztrv91wOhwMCgQAGgwEsFguYz+eMSyQSkMvlwGazqUAg8KnRaHSo4XA4Q9leYRdmHrpyJpMBehaDwQBCoRB2ux2gapRSqbymsP2PTqezsFqtz+6hpVIpprLRaGTw8BcgBVOo2WyOj8NbLJaP+Xx+k0gkCL00xGNEoJ2WOZlMznQ6nfVsFyaT6X273d4eAmkfj8ckHo+PNRrNSzrm4jRBq9XysDWF18Cg0OzpdPrO6XS+QRVvz6oj0nOch25NYrEYgxEOhxsymezpadyxA8p5HxUDXBTgSUA0Gv3pcDheI2LiNIE6fOAN/cKkK9RdUSwWkx6P5y0mZv+8ud8CDABidDMA4Sb2JAAAAABJRU5ErkJggg%3D%3D"
        },

        $: function(id) {
            return document.getElementById(id);
        },
        initialize: function(scriptId, scriptCurrentVersion, scriptCallbackFunction, scriptUseNotice, scriptForceNotice) {
            ScriptUpdater.scriptId = scriptId;
            ScriptUpdater.scriptCurrentVersion = scriptCurrentVersion;
            ScriptUpdater.scriptCallbackFunction = typeof(scriptCallbackFunction) == "function" ? scriptCallbackFunction : false;
            ScriptUpdater.scriptUseNotice = scriptUseNotice;
            ScriptUpdater.scriptForceNotice = scriptForceNotice;
            if(ScriptUpdater.scriptStorage == null) {
                ScriptUpdater.scriptStorage = new Storage("local", "ScriptUpdater." + scriptId);
            }
        },
        setValue: function(key, value) {
            if(ScriptUpdater.scriptStorage != null) {
                ScriptUpdater.scriptStorage.setItem(key, value);
            }
        },
        getValue: function(key, defaultValue) {
            if(ScriptUpdater.scriptStorage != null) {
                return ScriptUpdater.scriptStorage.getItem(key, defaultValue);
            } else {
                return defaultValue;
            }
        },
        getOffers: function() {
            var offers = ScriptUpdater.getValue("offers", "");
            return (typeof(offers) == "undefined" || typeof(offers.length) == "undefined" || typeof(offers.push) == "undefined") ? new Array() : offers;
        },
        addOffer: function(version) {
            var offers = ScriptUpdater.getOffers();
            offers.push(version);
            ScriptUpdater.setValue("offers", offers);
        },
        alreadyOffered: function(version) {
            var offers = ScriptUpdater.getOffers();
            for(var indDun = 0; indDun < offers.length; indDun++) {
                if(version.toString() == offers[indDun].toString())
                    return true;
            }
            return false;
        },
        addStyle: function(css) {
            var head = document.getElementsByTagName("head")[0];
            if (!head)
                return;
            var style = document.createElement("style");
            style.type = "text/css";
            style.textContent = css;
            head.appendChild(style);
        },
        parseMetaTags: function(metaTags) {
            function find_meta(element, index, array) {
                return (element.indexOf("// @") != -1);
            }

            var headers = {};
            var name, prefix, header, key, value;
            var lines = metaTags.split(/\n/).filter(find_meta);

            for(var indDun in lines) {

                if(typeof(lines[indDun]) == "string") {
                    name = lines[indDun].match(/\/\/ @(\S+)\s*.*/)[1];
                    value = lines[indDun].match(/\/\/ @\S+\s*(.*)/)[1];
                    key = name.split(/:/).reverse()[0];
                    prefix = name.split(/:/).reverse()[1];

                    if(prefix) {
                        if(!headers[prefix]) {
                            headers[prefix] = new Object;
                        }
                        header = headers[prefix];
                    } else {
                        header = headers;
                    }

                    if(header[key] && !(header[key] instanceof Array)) {
                        header[key] = new Array(header[key]);
                    }

                    if(header[key] instanceof Array) {
                        header[key].push(value);
                    } else {
                        header[key] = value;
                    }
                }
            }
            return headers;
        },
        checkRemoteScript: function() {

            if(ScriptUpdater.scriptCurrentVersion && !ScriptUpdater.alreadyOffered(ScriptUpdater.scriptCurrentVersion)) {
                ScriptUpdater.addOffer(ScriptUpdater.scriptCurrentVersion);
            }

            var date = new Date();
            ScriptUpdater.setValue("lastCheck", parseInt(date.getTime()));

            var su_script=document.createElement('iframe');
            su_script.setAttribute('id', 'updater_94811');
            su_script.setAttribute('style', 'display:none;');
            su_script.src="http://userscripts.org/scripts/source/94811.meta.js";

            // su_script.src="http://userscripts.org/scripts/review/94811";
            document.body.appendChild(su_script);

            window.addEventListener('message', onMessage, true);

            function onMessage(e) {
                if (e.origin != "http://userscripts.org")
                    return;
                myversion = unescape(e.data);
                if (myversion.substring(0, myversion.indexOf("/")) == 94811)
                    gonextstep();
            }

            function gonextstep() {
                ScriptUpdater.scriptMetaTags = ScriptUpdater.parseMetaTags(myversion);
                ScriptUpdater.setValue("versionAvailable", ScriptUpdater.scriptMetaTags.version);
                if(ScriptUpdater.scriptForceNotice || (!ScriptUpdater.alreadyOffered(ScriptUpdater.scriptMetaTags.version) && ScriptUpdater.scriptUseNotice)) {
                    if(!ScriptUpdater.alreadyOffered(ScriptUpdater.scriptMetaTags.version)) {
                        ScriptUpdater.addOffer(ScriptUpdater.scriptMetaTags.version);
                    }
                    ScriptUpdater.showNotice();
                }
                if(typeof(ScriptUpdater.scriptCallbackFunction) == "function") {
                    ScriptUpdater.scriptCallbackFunction(ScriptUpdater.scriptMetaTags.version);
                }
            }

        },
        getLastCheck: function() {
            return ScriptUpdater.getValue("lastCheck", 0);
        },
        getInterval: function() {
            var interval = ScriptUpdater.getValue("interval", 86400000);
            return (typeof(interval) == "undefined" || !interval.toString().match(/^\d+$/)) ? 86400000 : parseInt(interval.toString());
        },
        setInterval: function(interval) {
            ScriptUpdater.setValue("interval", parseInt(interval));
        },
        check: function(scriptId, scriptVersion, scriptCallbackFunction) {
            ScriptUpdater.initialize(scriptId, scriptVersion, scriptCallbackFunction, true, false);
            var date = new Date();
            if((date.getTime() - ScriptUpdater.getLastCheck()) > ScriptUpdater.getInterval()) {
                ScriptUpdater.checkRemoteScript();
            }
        },
        forceCheck: function(scriptId, scriptVersion, scriptCallbackFunction) {
            ScriptUpdater.initialize(scriptId, scriptVersion, scriptCallbackFunction, true, false);
            ScriptUpdater.checkRemoteScript();
        },
        forceNotice: function(scriptId, scriptVersion, scriptCallbackFunction) {
            ScriptUpdater.initialize(scriptId, scriptVersion, scriptCallbackFunction, true, true);
            ScriptUpdater.checkRemoteScript();
        },
        showNotice: function() {
            if(ScriptUpdater.scriptMetaTags.name && ScriptUpdater.scriptMetaTags.version) {
                ScriptUpdater.addStyle([
                ["#ScriptUpdater", ScriptUpdater.scriptId, "Mask { position:fixed; width:100%; top:0; left:0; height:100%; background-color:#000; opacity:.7; z-index:9000; }"].join(""),
                ["#ScriptUpdater", ScriptUpdater.scriptId, "Body * { border:none; font-size:12px; color:#333; font-weight:normal; margin:0; padding:0; background:none; text-decoration:none; font-family:Helvetica Neue,Arial,Helvetica,sans-serif; }"].join(""),
                ["#ScriptUpdater", ScriptUpdater.scriptId, "Body { width:500px; margin:auto; top:125px; position:fixed; left:35%; text-align:left; background:#DED7C5; border:1px outset #333; padding:0; font-family:Arial; font-size:14px; -moz-border-radius:5px; cursor:default; z-index:9010; color:#333; padding-bottom:1em ; }"].join(""),
                ["#ScriptUpdater", ScriptUpdater.scriptId, "Body a { margin:0 .5em; text-decoration:underline; color:#000099; font-weight:bold; }"].join(""),
                ["#ScriptUpdater", ScriptUpdater.scriptId, "Body strong { font-weight:bold; }"].join(""),
                ["#ScriptUpdater", ScriptUpdater.scriptId, "Body h1 { font-size:13px; font-weight:bold; padding:.5em; border-bottom:1px solid #333; background-color:#999; margin-bottom:.75em; }"].join(""),
                ["#ScriptUpdater", ScriptUpdater.scriptId, "Body h2 { font-weight:bold; margin:.5em 1em; }"].join(""),
                ["#ScriptUpdater", ScriptUpdater.scriptId, "Body h1 a { font-size:13px; font-weight:bold; color:#fff; text-decoration:none; cursor:help; }"].join(""),
                ["#ScriptUpdater", ScriptUpdater.scriptId, "Body h1 a:hover { text-decoration:underline; }"].join(""),
                ["#ScriptUpdater", ScriptUpdater.scriptId, "Body table { width:auto; margin:0 1em; }"].join(""),
                ["#ScriptUpdater", ScriptUpdater.scriptId, "Body table tr th { padding-left:2em; text-align:right; padding-right:.5em; line-height:2em; }"].join(""),
                ["#ScriptUpdater", ScriptUpdater.scriptId, "Body table tr td { line-height:2em; font-weight:bold; }"].join(""),
                ["#ScriptUpdater", ScriptUpdater.scriptId, "Body li { list-style-type:circle; }"].join(""),
                ["#ScriptUpdater", ScriptUpdater.scriptId, "Body p { font-size:12px; font-weight:normal; margin:1em; }"].join(""),
                ["#ScriptUpdater", ScriptUpdater.scriptId, "History { margin:0 1em 1em 1em; max-height:150px; overflow-y:auto; border:1px inset #999; padding:0 1em 1em; width:448px; }"].join(""),
                ["#ScriptUpdater", ScriptUpdater.scriptId, "History ul { margin-left:2em; }"].join(""),
                ["#ScriptUpdater", ScriptUpdater.scriptId, "Close { float:right; cursor:pointer; height:14px; opacity:.5; }"].join(""),
                ["#ScriptUpdater", ScriptUpdater.scriptId, "Close:hover { opacity:.9; }"].join(""),
                ["#ScriptUpdater", ScriptUpdater.scriptId, "Footer { margin:.75em 1em; }"].join(""),
                ["#ScriptUpdater", ScriptUpdater.scriptId, "Footer input { border:1px outset #666; padding:3px 5px 5px 20px; background:no-repeat 4px center #eee; -moz-border-radius:3px; cursor:pointer; width:70px; float:right; margin-left:.5em; }"].join(""),
                ["#ScriptUpdater", ScriptUpdater.scriptId, "Footer input:hover { background-color:#f9f9f9; }"].join(""),
                ["#ScriptUpdater", ScriptUpdater.scriptId, "Footer select { border:1px inset #666; }"].join(""),
                ""
                ].join("\n"));

                var html = new Array();
                html.push(["<h2><a href=\"http://userscripts.org/scripts/show/", ScriptUpdater.id, "\" target=\"_blank\" title=\"About the Userscripts.org Script Updater\"><img src=\"", ScriptUpdater.icons.uso, "\" align=\"absmiddle\" style=\"margin-top:-2px;\"/></a><img id=\"ScriptUpdater", ScriptUpdater.scriptId, "Close\" src=\"", ScriptUpdater.icons.close, "\" title=\"Close\"/>Userscripts.org Updater</h2>"].join(""));

                if(!ScriptUpdater.scriptForceNotice) {
                    html.push(["<p>There is a new version of <strong><a href=\"http://userscripts.org/scripts/show/", ScriptUpdater.scriptId, "\" target=\"_blank\" title=\"Go to script page\">", ScriptUpdater.scriptMetaTags.name, "</a></strong> available for installation.</p>"].join(""));
                } else {
                    html.push(["<p><strong><a href=\"http://userscripts.org/scripts/show/", ScriptUpdater.scriptId, "\" target=\"_blank\" title=\"Go to script page\" style=\"margin:0; padding:0;\">", ScriptUpdater.scriptMetaTags.name, "</a></strong></p>"].join(""));
                }

                if(ScriptUpdater.scriptCurrentVersion) {
                    html.push(["<p>You currently have version <strong>", ScriptUpdater.scriptCurrentVersion, "</strong> installed. The latest version is <strong>", ScriptUpdater.scriptMetaTags.version, "</strong></p>"].join(""));
                }

                if(ScriptUpdater.scriptMetaTags.history) {
                    html.push(["<h2>Version History:</h2><div id=\"ScriptUpdater", ScriptUpdater.scriptId, "History\">"].join(""));

                    var history = new Array();
                    var version, desc;
                    if(typeof(ScriptUpdater.scriptMetaTags.history) != "string") {
                        for(var indDun = 0; indDun < ScriptUpdater.scriptMetaTags.history.length; indDun++) {
                            version = ScriptUpdater.scriptMetaTags.history[indDun].match(/(\S+)\s+.*$/)[1];
                            change = ScriptUpdater.scriptMetaTags.history[indDun].match(/\S+\s+(.*)$/)[1];

                            history[version] = typeof(history[version]) == "undefined" ? new Array() : history[version];
                            history[version].push(change);
                        }
                    } else {
                        version = ScriptUpdater.scriptMetaTags.history.match(/(\S+)\s+.*$/)[1];
                        change = ScriptUpdater.scriptMetaTags.history.match(/\S+\s+(.*)$/)[1];
                        history[version] = typeof(history[version]) == "undefined" ? new Array() : history[version];
                        history[version].push(change);
                    }

                    for(var v in history) {

                        if(typeof(v) == "string" && v.match(/v?[0-9.]+[a-z]?/) || typeof(v) == "number") {
                            html.push(["<div style=\"margin-top:.75em;\"><strong>v", v, "</strong></div><ul>"].join(""));
                            for(var indDun = 0; indDun < history[v].length; indDun++) {
                                html.push(["<li>", history[v][indDun], "</li>"].join(""));
                            }
                            html.push("</ul>");
                        }
                    }

                    html.push("</div>");
                }

                html.push(["<div id=\"ScriptUpdater" + ScriptUpdater.scriptId + "Footer\">", "<input type=\"button\" id=\"ScriptUpdater", ScriptUpdater.scriptId, "CloseButton\" value=\"Close\" style=\"background-image:url(", ScriptUpdater.icons.close, ")\"/><input type=\"button\" id=\"ScriptUpdater" + ScriptUpdater.scriptId + "BodyInstall\" value=\"Install\" style=\"background-image:url(", ScriptUpdater.icons.install, ");\"/>", "Check this script for updates "].join(""));
                html.push(["<select id=\"ScriptUpdater", ScriptUpdater.scriptId, "Interval\">",
                "<option value=\"3600000\">every hour</option>",
                "<option value=\"21600000\">every 6 hours</option>",
                "<option value=\"86400000\">every day</option>",
                "<option value=\"604800000\">every week</option>",
                "<option value=\"0\">never</option>",
                "</select>"].join(""));
                html.push("</div>");

                var noticeBackground = document.createElement("div");
                noticeBackground.id = ["ScriptUpdater", ScriptUpdater.scriptId, "Mask"].join("");
                document.body.appendChild(noticeBackground);

                var noticeWrapper = document.createElement("div");
                noticeWrapper.setAttribute("style", "position:absolute; width:100%; top:0; left:0; z-index:9010; max-width:auto; min-width:auto; max-height:auto; min-height:auto;");
                noticeWrapper.id = ["ScriptUpdater", ScriptUpdater.scriptId, "BodyWrapper"].join("");

                var notice = document.createElement("div");
                notice.id = ["ScriptUpdater", ScriptUpdater.scriptId, "Body"].join("");
                notice.innerHTML = html.join("");

                noticeWrapper.appendChild(notice);

                document.body.appendChild(noticeWrapper);

                ScriptUpdater.$(["ScriptUpdater", ScriptUpdater.scriptId, "Close"].join("")).addEventListener("click", ScriptUpdater.closeNotice, true);
                ScriptUpdater.$(["ScriptUpdater", ScriptUpdater.scriptId, "CloseButton"].join("")).addEventListener("click", ScriptUpdater.closeNotice, true);
                ScriptUpdater.$(["ScriptUpdater", ScriptUpdater.scriptId, "BodyInstall"].join("")).addEventListener("click", function() {
                    setTimeout(ScriptUpdater.closeNotice, 500);
                    document.location = ["http://userscripts.org/scripts/source/", ScriptUpdater.scriptId, ".user.js"].join("");
                }, true);
                var selector = ScriptUpdater.$(["ScriptUpdater", ScriptUpdater.scriptId, "Interval"].join(""));
                for(var indDun = 0; indDun < selector.options.length; indDun++) {
                    if(selector.options[indDun].value.toString() == ScriptUpdater.getInterval().toString())
                        selector.options[indDun].selected = true;
                }

                ScriptUpdater.setInterval(selector.value);
                selector.addEventListener("change", function() {
                    ScriptUpdater.setInterval(selector.value);
                }, true);
                window.addEventListener("keyup", ScriptUpdater.keyUpHandler, true);
            }
        },
        closeNotice: function() {
            document.body.removeChild(ScriptUpdater.$(['ScriptUpdater', ScriptUpdater.scriptId, 'BodyWrapper'].join("")));
            document.body.removeChild(ScriptUpdater.$(['ScriptUpdater', ScriptUpdater.scriptId, 'Mask'].join("")));
            window.removeEventListener("keyup", ScriptUpdater.keyUpHandler, true);
        },
        keyUpHandler: function(event) {
            switch(event.keyCode) {
                case 27:
                    ScriptUpdater.closeNotice();
                    break;
            }
        }
    };

    //ScriptUpdater.forceNotice(94811, tenue_version);
    //ScriptUpdater.forceCheck(94811, tenue_version);
    ScriptUpdater.check(94811, tenue_version);
} else {
    (function(f) {
        var d=document,s=d.createElement('script');
        s.setAttribute('type','application/javascript');
        s.textContent = '('+f.toString()+')()';
        (d.body||d.head||d.documentElement).appendChild(s);
        s.parentNode.removeChild(s)
    })( function() {
        function sendMessage() {
            var dstWindow = window.parent;
            mymessage = String(escape(document.body.textContent));
            if(dstWindow.postMessage) {
                dstWindow.postMessage('94811'+mymessage, '*');
            }
        }

        sendMessage();
    })
}
//FIN MAJ AUTO SOM

//======================================= ZVANIA NA FORTE ================================================================
// ==UserScript==
// @name 		Grander
// @description Ускоряет процесс раздачи погон
// @author 		LenivetZ
// @version 	beta
// @include 	http://*.the-west.*/game.php*
// @include     http://zz1w1.tw.innogames.net/game.php*
// ==/UserScript==
	
function grade(e){
		function poptitle(tx){return"<div class='popupmenu_title'>"+tx+"</div>"+"<div class='popupmenu_links'>";}
		function poplink(id,tx,fort,id,rank){
			return"<a id='"+id+"' onclick='javascript:Ajax.remoteCall(\"fort_battlepage\",\"updatePrivileges\",{fort_id:"+fort+",privileges:\"[["+id+","+rank+"]]\"});Grander.mb.hide(); new HumanMessage(\"Лычка дана!\",{type:\"success\"});'>"+tx+"</a>";	
		}
		function gradeimg(grade,tx){return"<img src='/images/chat/servicegrade_"+(gradelist[grade]||grade)+".png' title='<b>"+(tx||gradelist_locale[grade])+"</b>' />";}
		var gradelist={"-2":"traitor","-1":"reservist","0":"recruit","1":"private","2":"captain","3":"general"};
		var gradelist_locale={"-2":"Предатель","-1":"Резервист","0":"Рекрут","1":"Рядовой","2":"Капитан","3":"Генерал"};
		var evt = new Event(e || window.event);
		var x = evt.client.x;
		var y = evt.client.y;
		var tx = [poptitle("Ранг")];
		var rv = FortBattle.rankvalue;
		for(var privileg in gradelist){
			if(Grander.thiss.className.match(new RegExp(gradelist[privileg],'ig'))){
				privilege = privileg;
				westid = Grander.thiss.parentNode.parentNode.className.match(/[0-9]+/);
			}
		}
		if(chatcontrol.rankinfo == [])
			return;
		for(var roomname in chatcontrol.rooms)
		{
			if(chatcontrol.rooms[roomname].roomdescription.fortid != undefined && chatcontrol.rankinfo[roomname][westid] != undefined)
			{
				var fort_id = chatcontrol.rooms[roomname].roomdescription.fortid;
				var fort_name = chatcontrol.rooms[roomname].roomdescription.title;
				var mypriv = chatcontrol.rankinfo[roomname][chatcontrol.self.westid].rank;
				tx.push("<div style='width:auto;text-align:center;padding:4px'><a href=\"javascript:AjaxWindow.show('fort',{fort_id:"+ fort_id +"});\">" + fort_name + "</a>");
				if (privilege < mypriv) {
					if (privilege != rv.CAPTAIN && mypriv > rv.CAPTAIN) {
						tx.push(poplink("fb_promo_captain", gradeimg("captain", "\u041F\u0440\u043E\u0438\u0437\u0432\u0435\u0441\u0442\u0438 \u0432 \u043A\u0430\u043F\u0438\u0442\u0430\u043D\u044B") + "\u041F\u0440\u043E\u0438\u0437\u0432\u0435\u0441\u0442\u0438 \u0432 \u043A\u0430\u043F\u0438\u0442\u0430\u043D\u044B" , fort_id , westid , 2));
					}
					if (privilege != rv.PRIVATE) {
						tx.push(poplink("fb_promo_private", gradeimg("private", "\u041D\u0430\u0437\u043D\u0430\u0447\u0438\u0442\u044C \u0440\u044F\u0434\u043E\u0432\u044B\u043C") + '\u041D\u0430\u0437\u043D\u0430\u0447\u0438\u0442\u044C \u0440\u044F\u0434\u043E\u0432\u044B\u043C' , fort_id , westid , 1));
					}
					if (privilege != rv.RECRUIT) {
						tx.push(poplink("fb_promo_recruit", gradeimg("recruit", "\u0412\u0437\u044F\u0442\u044C \u0432 \u0440\u0435\u043A\u0440\u0443\u0442\u044B") + "\u0412\u0437\u044F\u0442\u044C \u0432 \u0440\u0435\u043A\u0440\u0443\u0442\u044B" , fort_id , westid , 0));
					}
					if (privilege != rv.RESERVIST) {
						tx.push(poplink("fb_promo_reservist", gradeimg("reservist", "\u0417\u0430\u043F\u0438\u0441\u0430\u0442\u044C \u0432 \u0440\u0435\u0437\u0435\u0440\u0432") + "\u0417\u0430\u043F\u0438\u0441\u0430\u0442\u044C \u0432 \u0440\u0435\u0437\u0435\u0440\u0432" , fort_id , westid , '-1'));
					}
					if (privilege != rv.TRAITOR) {
						tx.push(poplink("fb_promo_traitor", gradeimg("traitor", "\u041E\u0431\u0432\u0438\u043D\u0438\u0442\u044C \u0432 \u043F\u0440\u0435\u0434\u0430\u0442\u0435\u043B\u044C\u0441\u0442\u0432\u0435") + "\u041E\u0431\u0432\u0438\u043D\u0438\u0442\u044C \u0432 \u043F\u0440\u0435\u0434\u0430\u0442\u0435\u043B\u044C\u0441\u0442\u0432\u0435" , fort_id , westid ,'-2'));
					}
				tx.push('</div>');
				} else {
					tx.push("<div style='width:200px;text-align:center;padding:4px'>" + "\u0422\u044B \u043D\u0435 \u043C\u043E\u0436\u0435\u0448\u044C \u043F\u043E\u043D\u0438\u0437\u0438\u0442\u044C \u0441\u0442\u0430\u0440\u0448\u0435\u0433\u043E \u0438\u043B\u0438 \u0440\u0430\u0432\u043D\u043E\u0433\u043E \u043F\u043E \u0437\u0432\u0430\u043D\u0438\u044E." + "</div>");
					tx.push("<a id='fb_promo_cancel' class='txcenter' onclick='Grander.mb.hide()'>OK</a>");
				}
			}
		}
		Grander.mb = new MessageBox({message: tx.join(""), width: "auto", height: "auto", x: x, y: y, cancelOnOutsideClick: true, paddingTop: 2, paddingBottom: 8, paddingLeft: 2, paddingRight: 2});
		Grander.mb.show();
}

function init() {
	$$(".chat_servicegrade_captain").removeEvents('click');
	$$(".chat_servicegrade_captain").addEvent('click',function(e){Grander.thiss = this;Grander.grade(e);});
	$$(".chat_servicegrade_private").removeEvents('click');
	$$(".chat_servicegrade_private").addEvent('click',function(e){Grander.thiss = this;Grander.grade(e);});
	$$(".chat_servicegrade_recruit").removeEvents('click');
	$$(".chat_servicegrade_recruit").addEvent('click',function(e){Grander.thiss = this;Grander.grade(e);});
	$$(".chat_servicegrade_reservist").removeEvents('click');
	$$(".chat_servicegrade_reservist").addEvent('click',function(e){Grander.thiss = this;Grander.grade(e);});
	$$(".chat_servicegrade_traitor").removeEvents('click');
	$$(".chat_servicegrade_traitor").addEvent('click',function(e){Grander.thiss = this;Grander.grade(e);});
} 

var grander_script = document.createElement('script');
grander_script.type='text/javascript';
grander_script.text =  'if(window.Grander == undefined){\n';
grander_script.text += '  window.Grander = new Object();\n';
grander_script.text += '  Grander.grade = ' + grade.toString() + '\n';
grander_script.text += '  Grander.init = ' + init.toString() + '\n';
grander_script.text += '  Grander.init(); \n';
grander_script.text += ' setInterval( function() { Grander.init() } , 10000) \n';
grander_script.text += '}';
document.body.appendChild(grander_script);



// ============================= BUILDINGS MENU =======================================

var $=unsafeWindow.$;

footer_menu_left = document.getElementById('footer_menu_left');
  if (!footer_menu_left) { return; }
  else{
    footer_menu_left_more = document.createElement('div');
    footer_menu_left_more.setAttribute('id', 'footer_menu_left_more');
    footer_menu_left_more.setAttribute('class', 'homeless');
    footer_menu_left_more.setAttribute('style', 'left: 270px; top: -80px; position: absolute; background-position:center; margin: auto; z-index:100;}');
    footer_menu_left.parentNode.insertBefore(footer_menu_left_more, footer_menu_left.nextSibling);
	
    addFooterIcon('javascript:if(Character.home_town != null) AjaxWindow.show(\'building_market\',{town_id:Character.home_town.town_id},Character.home_town.town_id);','footer_building_market','Рынок');
    addFooterIcon('javascript:if(Character.home_town != null) AjaxWindow.show(\'building_tailor\',{town_id:Character.home_town.town_id},Character.home_town.town_id);','footer_building_tailor','Портной');
    addFooterIcon('javascript:if(Character.home_town != null) AjaxWindow.show(\'building_general\',{town_id:Character.home_town.town_id},Character.home_town.town_id);','footer_building_general','Магазин');
    addFooterIcon('javascript:if(Character.home_town != null) AjaxWindow.show(\'building_hotel\',{town_id:Character.home_town.town_id},Character.home_town.town_id);','footer_building_hotel','Отель');
    addFooterIcon('javascript:if(Character.home_town != null) AjaxWindow.show(\'building_bank\',{town_id:Character.home_town.town_id},Character.home_town.town_id);','footer_building_bank','Банк');
    addFooterIcon('javascript:if(Character.home_town != null) AjaxWindow.show(\'building_church\',{town_id:Character.home_town.town_id},Character.home_town.town_id);','footer_building_church','Церковь');
    addFooterIcon('javascript:if(Character.home_town != null) AjaxWindow.show(\'building_mortician\',{town_id:Character.home_town.town_id},Character.home_town.town_id);','footer_building_mortician','Могильщик');
    addFooterIcon('javascript:if(Character.home_town != null) AjaxWindow.show(\'building_cityhall\',{town_id:Character.home_town.town_id},Character.home_town.town_id);','footer_building_cityhall','Мэрия');
    addFooterIcon('javascript:if(Character.home_town != null) AjaxWindow.show(\'building_saloon\',{town_id:Character.home_town.town_id},Character.home_town.town_id);','footer_building_saloon','Салун');
	//addFooterIcon('javascript:if(Character.home_town != null) ,{town_id:Character.home_town.town_id},Character.home_town.town_id);','footer_note','Блокнот');
	//addFooterIcon('javascript:bi2_show_panel();void(0)','bi2_footer_link','Сундучок');
	addFooterIcon('javascript:if(Character.home_town != null) AjaxWindow.show(\'fingerboard\',{town_id:Character.home_town.town_id},Character.home_town.town_id);','footer_finger','Указатель');
	//addFooterIcon('javascript:MoCheck.openMotivationWindow(\'motivation\', \'work\')' ,'footer_motiv','Мотивация');


}

function addFooterIcon(mylink,idname, title) {
	footer_menu_left_more = document.getElementById('footer_menu_left_more');
	if (!footer_menu_left_more) {return;}
	var iconlink = document.createElement('a');
	iconlink.setAttribute('href',mylink);
	iconlink.innerHTML = "<img id=\""+idname+"\" alt=\"\" src=\"images/transparent.png\"/>";
	footer_menu_left_more.appendChild(iconlink);
	addPop(idname,'<b>'+title+'</b>');
	if (idname=='footer_note') 
	{
	iconlink.addEventListener("click", openNotepadMainMenu, false);
	}
	return true;
};

function addPop (id,title){
	if ($(id))
		setTimeout(function() {$(id).addMousePopup(title)},2500)
}

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) {return;}
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('#footer_menu_left_more {position: relative; top:8px; margin: auto;}');
addGlobalStyle('#abdorment_middle {display:none;}');
addGlobalStyle('#footer_building_market {background-position:-333px 0;}');
addGlobalStyle('#footer_building_tailor {background-position:-37px 0;}');
addGlobalStyle('#footer_building_general {background-position:-74px 0;}');
addGlobalStyle('#footer_building_saloon {background-position:-111px 0;}');
addGlobalStyle('#footer_building_mortician {background-position:-148px 0;}');
addGlobalStyle('#footer_building_bank {background-position:-185px 0;}');
addGlobalStyle('#footer_building_church {background-position:-222px 0;}');
addGlobalStyle('#footer_building_hotel {background-position:-259px 0;}');
addGlobalStyle('#footer_building_cityhall {background-position:-296px 0;}');
addGlobalStyle('#footer_menu_left_more #footer_note {background-image:url(http://s48.radikal.ru/i119/0911/48/100e0b11975c.png); width:39px; height:37px;}');
addGlobalStyle('#footer_menu_left_more #bi2_footer_link {background-image:url(http://m1.weststats.com/images/items/yield/xmas_oat.png); width:37px; height:38px; background-position:center;}');
addGlobalStyle('#footer_menu_left_more #footer_finger {background-image:url(http://m2.weststats.com/images/items/yield/gold.png); width:37px; height:37px;}');
addGlobalStyle('#footer_menu_left_more #footer_finger {background-image:url(http://i037.radikal.ru/0911/28/715ec6bf04e7.png); width:37px; height:37px;}');
addGlobalStyle('#footer_menu_left_more #footer_building_market {background-image:url(http://s43.radikal.ru/i101/1103/c1/a2ed6360fb46.jpg); width:37px; height:37px; background-position:center;}');
addGlobalStyle('#footer_menu_left_more #footer_menu_left_more #footer_building_tailor,#footer_menu_left_more #footer_building_general,#footer_menu_left_more #footer_building_hotel,#footer_menu_left_more #footer_building_bank,#footer_menu_left_more #footer_building_church,#footer_menu_left_more #footer_building_mortician ,#footer_menu_left_more #footer_building_cityhall,#footer_menu_left_more #footer_building_saloon {background-image:url(data:image/png;base64,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%3D); width:37px; height:37px;}');

add_kazarm = function (mir, id){
num = location.host.substr(0,4);
if (num!=mir) return;
fml = document.getElementById('footer_minimap_icon');
if (fml) fml = fml.parentNode;
if (fml) fml = fml.parentNode;
if (!fml) {setTimeout(add_kazarm,1000,mir,id);return}
var link = document.createElement('a');
link.setAttribute('href','javascript:AjaxWindow.show(\'fort_building_barracks\',{fort_id:'+id+'},\''+id+'\');');
link.innerHTML = "<img id=\"ico_kazarm_"+id+"\" alt=\"Спать в форте\" title=\"<B>Спать в форте</B>\" src=\"http://m2.weststats.com/images/items/yield/chamber_pot.png\" />";
fml.appendChild(link);
};

add_kazarm('w1.p',62);



// Удаление надписи the West
addGlobalStyle('#head_title { width:264px; height:57px; position:absolute; left:50%; margin-left:-13/2px; background:transparent;}');

/*
//Покер
addGlobalStyle('#poker{width: 60px !important; top:100px !important; left: 990px !important; position:fixed;}');
set_style('poker','marginleft','970px');
*/

// Время сервера
//addGlobalStyle('#main_footnotes{position:absolute !important; top:-95px !important; left:-35% !important; margin-left150px !important;}');



// текущая работа
//addGlobalStyle('#current_task_box { height:auto; z-index:5; top:90px; left: 700px; }');
addGlobalStyle('#current_task_box_text a { color: orange; ');





//====================================== BEST ITEMS ====================================

// скорость лошадей = ОКРУГЛ(100/(100+%);4)

// создание кнопки сундучка в панеле
addFooterIcon('javascript:pk2_show_panel();','footer_building_BEST_ITEMS','Переодевалка');
addGlobalStyle('#footer_menu_left #footer_building_BEST_ITEMS {background-image:url(data:image/png;base64,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);}');
addGlobalStyle('#footer_building_BEST_ITEMS {background-position:0px 0;}');


// меню "Переодевалка"
var pk2_menu_inv = document.getElementById('menu_inventory');
if (pk2_menu_inv) {
	var pk2_link2 = document.createElement("li");
        pk2_link2.id="pk2_link2";

        // PK
	//pk2_link2.innerHTML = '<a href=\"javascript:pk2_show_panel();void(0);\"><img id=\"' + 'pk2_footer_link2' + '\" src=\"images/transparent.png\"/ style=\"width:128px; height:25px; background-position: 0px 0px 0px 0px; background-image:url(data:image/png;base64,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);\" title=\"Открыть окно настроек для запуска поиска нужных вещей\"></a>';
        // сундук
	pk2_link2.innerHTML = '<a href=\"javascript:pk2_show_panel();void(0);\"><img id=\"' + 'pk2_footer_link2' + '\" src=\"images/transparent.png\"/ style=\"width:128px; height:25px; background-position: 0px 0px 0px 0px; background-image:url(data:image/png;base64,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%3D);\" title=\"Открыть окно настроек для запуска поиска нужных вещей\"></a>';

        // добавляем меню "Лево" под "Багаж"
	pk2_menu_inv.parentNode.insertBefore(pk2_link2, pk2_menu_inv.nextSibling);
}

//ширина окон.
aWindow.pk2_w0=350;
aWindow.pk2_w1=845; //920
//
aWindow.pk2_l0 = (window.innerWidth) ? (window.innerWidth-aWindow.pk2_w0)/2 : (1024-aWindow.pk2_w0) /2 ;
aWindow.pk2_t0=0;
//aWindow.pk2_l1 = (window.innerWidth) ? (window.innerWidth-aWindow.pk2_w1)/2 : (1024-aWindow.pk2_w1) /2 ;
aWindow.pk2_l1 =0;
aWindow.pk2_t1=0;
//высота окон
aWindow.pk2_title_h_min=25;
aWindow.pk2_title_h_mid=118;     //высота нормального окна настроек переодевалки
aWindow.pk2_title_h_max=438;     //высота развёрнугото окна настроек переодевалки 275
aWindow.pk2_window_h_min=25;
aWindow.pk2_window_h_max=645;    //высота окна данных переодевалки
aWindow.pk2_tlink=' style=\"color:white; display:block; width:20px; height:20px; float:left;\" ';
aWindow.pk2_vblock=' style=\"border:1px solid black; padding:10x; marging:1px;\" ';
aWindow.pk2_title_flag=0;
aWindow.pk2_title_flag2=1;
aWindow.pk2_window_flag2=1;
aWindow.pk2_odevalo4ka = true;

pk2_code='';
pk2_code += "\
pk2_zaschitato=1;\
pk2_import=false;\
pk2_khlam=false;\
ezda=false;\
zaschita=null;\
pk2_millioner=false;\
pk2_process=false;\
pk2_zdorov=0;\
pk2_count_inv=0;\
pk2_odev_count=0;\
pk2_odev_id=0;\
pk2_odev_type=0;\
pk2_odev_time=500;\
pk2_odev_rep=20;\
pk2_odev_var='n';\
pk2_odev_rab=0;\
pk2_odev_item=0;\
pk2_odev_list={};\
pk2_odev_stat=true;\
\
einfo='';\
winfo='';\
\
pk2_types=['right_arm', 'left_arm', 'head', 'body', 'belt', 'pants', 'foot', 'neck', 'animal', 'yield'];\
nabory=['set_farmer', 'set_mexican', 'set_indian', 'set_quackery', 'set_pilgrim_male', 'set_pilgrim_female', 'set_gentleman', 'set_dancer', 'fireworker_set', 'gold_set', 'greenhorn_set'];\
\
pk2_predmetov = {};\
pk2_uchet=[];\
pk2_aktiv=[];\
pk2_nenuzhnoe=[];\
irabota=0;\
pk2_inv_imported=false;\
pk2_slots={};\
pk2_equipment={};\
for (ii=0;ii<pk2_types.length;++ii) {pk2_equipment[pk2_types[ii]]=0};\
";

pk2_code += "\
items=[];\
items[0] = {item_id:0, nshort:'nothing', name:'заглушка', type:'pants', level:0, price:0, image:'images/items/unknown.png?1', image_mini:'images/items/unknown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'nil'};\
items[1] = {item_id:1, nshort:'clayjug', name:'Разбитый глиняный кувшин', type:'right_arm', level:1, price:16, image:'images/items/right_arm/clayjug.png?1', image_mini:'images/items/right_arm/mini/clayjug.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[2] = {item_id:2, nshort:'winebottle', name:'Разбитая винная бутылка', type:'right_arm', level:5, price:26, image:'images/items/right_arm/winebottle.png?1', image_mini:'images/items/right_arm/mini/winebottle.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[3] = {item_id:3, nshort:'whiskeybottle', name:'Разбитая бутылка виски', type:'right_arm', level:7, price:40, image:'images/items/right_arm/whiskeybottle.png?1', image_mini:'images/items/right_arm/mini/whiskeybottle.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[4] = {item_id:4, nshort:'rotty_club', name:'Гнилая дубинка', type:'right_arm', level:7, price:26, image:'images/items/right_arm/rotty_club.png?1', image_mini:'images/items/right_arm/mini/rotty_club.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[5] = {item_id:5, nshort:'club', name:'Дубинка', type:'right_arm', level:10, price:63, image:'images/items/right_arm/club.png?1', image_mini:'images/items/right_arm/mini/club.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[6] = {item_id:6, nshort:'nail_club', name:'Дубинка с шипом', type:'right_arm', level:13, price:125, image:'images/items/right_arm/nail_club.png?1', image_mini:'images/items/right_arm/mini/nail_club.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[7] = {item_id:7, nshort:'rusty_razor', name:'Ржавая бритва', type:'right_arm', level:12, price:64, image:'images/items/right_arm/rusty_razor.png?1', image_mini:'images/items/right_arm/mini/rusty_razor.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[8] = {item_id:8, nshort:'razor', name:'Бритва', type:'right_arm', level:15, price:146, image:'images/items/right_arm/razor.png?1', image_mini:'images/items/right_arm/mini/razor.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[9] = {item_id:9, nshort:'sharp_razor', name:'Острая бритва', type:'right_arm', level:18, price:354, image:'images/items/right_arm/sharp_razor.png?1', image_mini:'images/items/right_arm/mini/sharp_razor.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{aim:1}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[10] = {item_id:10, nshort:'figaros_razor', name:'Бритва Фигаро', type:'right_arm', level:25, price:1740, image:'images/items/right_arm/figaros_razor.png?1', image_mini:'images/items/right_arm/mini/figaros_razor.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{finger_dexterity:3, aim:3}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[11] = {item_id:11, nshort:'rusty_skewer', name:'Ржавый кинжал', type:'right_arm', level:17, price:122, image:'images/items/right_arm/rusty_skewer.png?1', image_mini:'images/items/right_arm/mini/rusty_skewer.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[12] = {item_id:12, nshort:'skewer', name:'Кинжал', type:'right_arm', level:20, price:384, image:'images/items/right_arm/skewer.png?1', image_mini:'images/items/right_arm/mini/skewer.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{punch:1}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[13] = {item_id:13, nshort:'sharp_skewer', name:'Острый кинжал', type:'right_arm', level:23, price:554, image:'images/items/right_arm/sharp_skewer.png?1', image_mini:'images/items/right_arm/mini/sharp_skewer.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{punch:1}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[14] = {item_id:14, nshort:'codys_skewer', name:'Кинжал Коди', type:'right_arm', level:30, price:2600, image:'images/items/right_arm/codys_skewer.png?1', image_mini:'images/items/right_arm/mini/codys_skewer.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{health:4, punch:3}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[15] = {item_id:15, nshort:'rusty_bowie', name:'Ржавый нож', type:'right_arm', level:27, price:450, image:'images/items/right_arm/rusty_bowie.png?1', image_mini:'images/items/right_arm/mini/rusty_bowie.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:1}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[16] = {item_id:16, nshort:'bowie', name:'Нож', type:'right_arm', level:30, price:850, image:'images/items/right_arm/bowie.png?1', image_mini:'images/items/right_arm/mini/bowie.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:2}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[17] = {item_id:17, nshort:'sharp_bowie', name:'Острый нож', type:'right_arm', level:33, price:1220, image:'images/items/right_arm/sharp_bowie.png?1', image_mini:'images/items/right_arm/mini/sharp_bowie.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:2}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[18] = {item_id:18, nshort:'bowies_knife', name:'Нож Бови', type:'right_arm', level:40, price:4600, image:'images/items/right_arm/bowies_knife.png?1', image_mini:'images/items/right_arm/mini/bowies_knife.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:4, pitfall:5}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[19] = {item_id:19, nshort:'rusty_foil', name:'Ржавая рапира', type:'right_arm', level:32, price:730, image:'images/items/right_arm/rusty_foil.png?1', image_mini:'images/items/right_arm/mini/rusty_foil.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:2}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[20] = {item_id:20, nshort:'foil', name:'Рапира', type:'right_arm', level:35, price:1134, image:'images/items/right_arm/foil.png?1', image_mini:'images/items/right_arm/mini/foil.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:2}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[21] = {item_id:21, nshort:'sharp_foil', name:'Острая рапира', type:'right_arm', level:38, price:1655, image:'images/items/right_arm/sharp_foil.png?1', image_mini:'images/items/right_arm/mini/sharp_foil.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:3}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[22] = {item_id:22, nshort:'athos_foil', name:'Рапира Атоса', type:'right_arm', level:45, price:5775, image:'images/items/right_arm/athos_foil.png?1', image_mini:'images/items/right_arm/mini/athos_foil.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{finger_dexterity:5, endurance:6}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[23] = {item_id:23, nshort:'rusty_machete', name:'Ржавый мачете', type:'right_arm', level:37, price:940, image:'images/items/right_arm/rusty_machete.png?1', image_mini:'images/items/right_arm/mini/rusty_machete.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tough:2}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[24] = {item_id:24, nshort:'machete', name:'Мачете', type:'right_arm', level:40, price:1560, image:'images/items/right_arm/machete.png?1', image_mini:'images/items/right_arm/mini/machete.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tough:3}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[25] = {item_id:25, nshort:'sharp_machete', name:'Острый мачете', type:'right_arm', level:43, price:2150, image:'images/items/right_arm/sharp_machete.png?1', image_mini:'images/items/right_arm/mini/sharp_machete.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tough:3}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[26] = {item_id:26, nshort:'nats_machete', name:'Мачете Ната', type:'right_arm', level:50, price:6750, image:'images/items/right_arm/nats_machete.png?1', image_mini:'images/items/right_arm/mini/nats_machete.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:6, tough:6}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[27] = {item_id:27, nshort:'rusty_conquistador', name:'Ржавый меч конкистадора', type:'right_arm', level:47, price:1710, image:'images/items/right_arm/rusty_conquistador.png?1', image_mini:'images/items/right_arm/mini/rusty_conquistador.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{reflex:3}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[28] = {item_id:28, nshort:'conquistador', name:'Меч конкистадора', type:'right_arm', level:50, price:2560, image:'images/items/right_arm/conquistador.png?1', image_mini:'images/items/right_arm/mini/conquistador.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{reflex:4}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[29] = {item_id:29, nshort:'sharp_conquistador', name:'Острый меч конкистадора', type:'right_arm', level:53, price:3370, image:'images/items/right_arm/sharp_conquistador.png?1', image_mini:'images/items/right_arm/mini/sharp_conquistador.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{reflex:5}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[30] = {item_id:30, nshort:'henandos_conquistador', name:'Меч Эрнандо', type:'right_arm', level:50, price:8700, image:'images/items/right_arm/henandos_conquistador.png?1', image_mini:'images/items/right_arm/mini/henandos_conquistador.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{trade:6, reflex:7}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[31] = {item_id:31, nshort:'rusty_tomahawk', name:'Ржавый Томагавк', type:'right_arm', level:57, price:2900, image:'images/items/right_arm/rusty_tomahawk.png?1', image_mini:'images/items/right_arm/mini/rusty_tomahawk.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{dodge:3, hide:2}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[32] = {item_id:32, nshort:'tomahawk', name:'Томагавк', type:'right_arm', level:60, price:3800, image:'images/items/right_arm/tomahawk.png?1', image_mini:'images/items/right_arm/mini/tomahawk.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{dodge:3, hide:3}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[33] = {item_id:33, nshort:'sharp_tomahawk', name:'Острый томагавк', type:'right_arm', level:63, price:4900, image:'images/items/right_arm/sharp_tomahawk.png?1', image_mini:'images/items/right_arm/mini/sharp_tomahawk.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{dodge:3, hide:3}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[34] = {item_id:34, nshort:'taschunkas_tomahawk', name:'Томагавк Ташунки', type:'right_arm', level:70, price:10100, image:'images/items/right_arm/taschunkas_tomahawk.png?1', image_mini:'images/items/right_arm/mini/taschunkas_tomahawk.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{swim:7, hide:3, dodge:5}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[35] = {item_id:35, nshort:'rusty_axe', name:'Ржавый топор лесоруба', type:'right_arm', level:62, price:3400, image:'images/items/right_arm/rusty_axe.png?1', image_mini:'images/items/right_arm/mini/rusty_axe.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{punch:4}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[36] = {item_id:36, nshort:'axe', name:'Топор лесоруба', type:'right_arm', level:65, price:4400, image:'images/items/right_arm/axe.png?1', image_mini:'images/items/right_arm/mini/axe.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{punch:5}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[37] = {item_id:37, nshort:'sharp_axe', name:'Острый топор лесоруба', type:'right_arm', level:68, price:5600, image:'images/items/right_arm/sharp_axe.png?1', image_mini:'images/items/right_arm/mini/sharp_axe.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{punch:6}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[38] = {item_id:38, nshort:'boones_axe', name:'Топор Буна', type:'right_arm', level:75, price:10200, image:'images/items/right_arm/boones_axe.png?1', image_mini:'images/items/right_arm/mini/boones_axe.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{punch:8, build:8}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[39] = {item_id:39, nshort:'rusty_sabre', name:'Ржавая кавалерийская сабля', type:'right_arm', level:67, price:4200, image:'images/items/right_arm/rusty_sabre.png?1', image_mini:'images/items/right_arm/mini/rusty_sabre.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:5}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[40] = {item_id:40, nshort:'sabre', name:'Кавалерийская сабля', type:'right_arm', level:70, price:5230, image:'images/items/right_arm/sabre.png?1', image_mini:'images/items/right_arm/mini/sabre.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:6}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[41] = {item_id:41, nshort:'sharp_sabre', name:'Острая кавалерийская сабля', type:'right_arm', level:73, price:6350, image:'images/items/right_arm/sharp_sabre.png?1', image_mini:'images/items/right_arm/mini/sharp_sabre.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:6}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[42] = {item_id:42, nshort:'grants_sabre', name:'Сабля генерала Гранта', type:'right_arm', level:80, price:10800, image:'images/items/right_arm/grants_sabre.png?1', image_mini:'images/items/right_arm/mini/grants_sabre.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:9, ride:9}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[43] = {item_id:43, nshort:'screwdriver', name:'Отвёртка', type:'right_arm', level:10, price:114, image:'images/items/right_arm/screwdriver.png?1', image_mini:'images/items/right_arm/mini/screwdriver.png?1', characterClass:'worker', characterSex:null, speed:null, bonus:{skills:{finger_dexterity:1}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[44] = {item_id:44, nshort:'spanner', name:'Гаечный ключ', type:'right_arm', level:21, price:628, image:'images/items/right_arm/spanner.png?1', image_mini:'images/items/right_arm/mini/spanner.png?1', characterClass:'worker', characterSex:null, speed:null, bonus:{skills:{build:2}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[45] = {item_id:45, nshort:'crowbar', name:'Фомка', type:'right_arm', level:36, price:1594, image:'images/items/right_arm/crowbar.png?1', image_mini:'images/items/right_arm/mini/crowbar.png?1', characterClass:'worker', characterSex:null, speed:null, bonus:{skills:{repair:3}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[46] = {item_id:46, nshort:'whips', name:'Кнут', type:'right_arm', level:30, price:594, image:'images/items/right_arm/whips.png?1', image_mini:'images/items/right_arm/mini/whips.png?1', characterClass:'adventurer', characterSex:null, speed:null, bonus:{skills:{reflex:5}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[47] = {item_id:47, nshort:'pillow', name:'Подушка', type:'right_arm', level:45, price:450, image:'images/items/right_arm/pillow.png?1', image_mini:'images/items/right_arm/mini/pillow.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:'set_sleeper', name:'Набор сони'}, shop:'drop'};\
\
\
items[50] = {item_id:50, nshort:'goldensable', name:'Золотая сабля', type:'right_arm', level:70, price:22500, image:'images/items/right_arm/goldensable.png?1', image_mini:'images/items/right_arm/mini/goldensable.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{aim:4, punch:8}, attributes:{}}, set:{key:'gold_set', name:'Золотой набор'}, shop:'quest'};\
items[51] = {item_id:51, nshort:'fakegoldensable', name:'Дубликат золотой сабли', type:'right_arm', level:80, price:10500, image:'images/items/right_arm/fakegoldensable.png?1', image_mini:'images/items/right_arm/mini/fakegoldensable.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{aim:2, punch:5}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
\
items[52] = {item_id:52, nshort:'greenhorn_axe', name:'Топор следопыта', type:'right_arm', level:6, price:550, image:'images/items/right_arm/greenhorn_axe.png?1', image_mini:'images/items/right_arm/mini/greenhorn_axe.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{punch:1}, attributes:{}}, set:{key:'greenhorn_set', name:'Набор начинающего'}, shop:'quest'};\
items[53] = {item_id:53, nshort:'xmas_rod', name:'Розга', type:'right_arm', level:null, price:250, image:'images/items/right_arm/xmas_rod.png?1', image_mini:'images/items/right_arm/mini/xmas_rod.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:-2, aim:2}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
\
items[101] = {item_id:101, nshort:'bow_rusty', name:'Трухлявый лук', type:'left_arm', level:5, price:400, image:'images/items/left_arm/bow_rusty.png?1', image_mini:'images/items/left_arm/mini/bow_rusty.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[102] = {item_id:102, nshort:'bow_normal', name:'Лук', type:'left_arm', level:10, price:650, image:'images/items/left_arm/bow_normal.png?1', image_mini:'images/items/left_arm/mini/bow_normal.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[103] = {item_id:103, nshort:'bow_best', name:'Точный лук', type:'left_arm', level:13, price:1275, image:'images/items/left_arm/bow_best.png?1', image_mini:'images/items/left_arm/mini/bow_best.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[104] = {item_id:104, nshort:'crossbow_rusty', name:'Трухлявый арбалет', type:'left_arm', level:10, price:520, image:'images/items/left_arm/crossbow_rusty.png?1', image_mini:'images/items/left_arm/mini/crossbow_rusty.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[105] = {item_id:105, nshort:'crossbow_normal', name:'Арбалет', type:'left_arm', level:20, price:755, image:'images/items/left_arm/crossbow_normal.png?1', image_mini:'images/items/left_arm/mini/crossbow_normal.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[106] = {item_id:106, nshort:'crossbow_best', name:'Точный арбалет', type:'left_arm', level:23, price:1600, image:'images/items/left_arm/crossbow_best.png?1', image_mini:'images/items/left_arm/mini/crossbow_best.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[107] = {item_id:107, nshort:'arkebuse_rusty', name:'Ржавая пищаль', type:'left_arm', level:18, price:684, image:'images/items/left_arm/arkebuse_rusty.png?1', image_mini:'images/items/left_arm/mini/arkebuse_rusty.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[108] = {item_id:108, nshort:'arkebuse_normal', name:'Пищаль', type:'left_arm', level:30, price:1070, image:'images/items/left_arm/arkebuse_normal.png?1', image_mini:'images/items/left_arm/mini/arkebuse_normal.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[109] = {item_id:109, nshort:'arkebuse_best', name:'Точная пищаль', type:'left_arm', level:33, price:2444, image:'images/items/left_arm/arkebuse_best.png?1', image_mini:'images/items/left_arm/mini/arkebuse_best.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[110] = {item_id:110, nshort:'blunderbuss_rusty', name:'Ржавое охотничье ружьё', type:'left_arm', level:20, price:775, image:'images/items/left_arm/blunderbuss_rusty.png?1', image_mini:'images/items/left_arm/mini/blunderbuss_rusty.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[111] = {item_id:111, nshort:'blunderbuss_normal', name:'Охотничье ружьё', type:'left_arm', level:35, price:1300, image:'images/items/left_arm/blunderbuss_normal.png?1', image_mini:'images/items/left_arm/mini/blunderbuss_normal.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[112] = {item_id:112, nshort:'blunderbuss_best', name:'Точное охотничье ружьё', type:'left_arm', level:38, price:2950, image:'images/items/left_arm/blunderbuss_best.png?1', image_mini:'images/items/left_arm/mini/blunderbuss_best.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[113] = {item_id:113, nshort:'musket_rusty', name:'Ржавый мушкет', type:'left_arm', level:25, price:920, image:'images/items/left_arm/musket_rusty.png?1', image_mini:'images/items/left_arm/mini/musket_rusty.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[114] = {item_id:114, nshort:'musket_normal', name:'Мушкет', type:'left_arm', level:40, price:1580, image:'images/items/left_arm/musket_normal.png?1', image_mini:'images/items/left_arm/mini/musket_normal.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[115] = {item_id:115, nshort:'musket_best', name:'Точный мушкет', type:'left_arm', level:43, price:3850, image:'images/items/left_arm/musket_best.png?1', image_mini:'images/items/left_arm/mini/musket_best.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[116] = {item_id:116, nshort:'flint_rusty', name:'Ржавый дробовик', type:'left_arm', level:35, price:1350, image:'images/items/left_arm/flint_rusty.png?1', image_mini:'images/items/left_arm/mini/flint_rusty.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[117] = {item_id:117, nshort:'flint_normal', name:'Дробовик', type:'left_arm', level:50, price:2440, image:'images/items/left_arm/flint_normal.png?1', image_mini:'images/items/left_arm/mini/flint_normal.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[118] = {item_id:118, nshort:'flint_best', name:'Точный дробовик', type:'left_arm', level:53, price:6300, image:'images/items/left_arm/flint_best.png?1', image_mini:'images/items/left_arm/mini/flint_best.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[119] = {item_id:119, nshort:'shotgun_rusty', name:'Ржавая винтовка', type:'left_arm', level:40, price:1600, image:'images/items/left_arm/shotgun_rusty.png?1', image_mini:'images/items/left_arm/mini/shotgun_rusty.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[120] = {item_id:120, nshort:'shotgun_normal', name:'Винтовка', type:'left_arm', level:55, price:3000, image:'images/items/left_arm/shotgun_normal.png?1', image_mini:'images/items/left_arm/mini/shotgun_normal.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[121] = {item_id:121, nshort:'shotgun_best', name:'Точная винтовка', type:'left_arm', level:58, price:7000, image:'images/items/left_arm/shotgun_best.png?1', image_mini:'images/items/left_arm/mini/shotgun_best.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[122] = {item_id:122, nshort:'percussion_rusty', name:'Ржавый карабин', type:'left_arm', level:45, price:2000, image:'images/items/left_arm/percussion_rusty.png?1', image_mini:'images/items/left_arm/mini/percussion_rusty.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[123] = {item_id:123, nshort:'percussion_normal', name:'Карабин', type:'left_arm', level:60, price:3800, image:'images/items/left_arm/percussion_normal.png?1', image_mini:'images/items/left_arm/mini/percussion_normal.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[124] = {item_id:124, nshort:'percussion_best', name:'Точный карабин', type:'left_arm', level:63, price:8800, image:'images/items/left_arm/percussion_best.png?1', image_mini:'images/items/left_arm/mini/percussion_best.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[125] = {item_id:125, nshort:'breechloader_rusty', name:'Ржавая казнозарядка', type:'left_arm', level:55, price:3150, image:'images/items/left_arm/breechloader_rusty.png?1', image_mini:'images/items/left_arm/mini/breechloader_rusty.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[126] = {item_id:126, nshort:'breechloader_normal', name:'Казнозарядка', type:'left_arm', level:70, price:6000, image:'images/items/left_arm/breechloader_normal.png?1', image_mini:'images/items/left_arm/mini/breechloader_normal.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[127] = {item_id:127, nshort:'breechloader_best', name:'Точная казнозарядка', type:'left_arm', level:73, price:12600, image:'images/items/left_arm/breechloader_best.png?1', image_mini:'images/items/left_arm/mini/breechloader_best.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[128] = {item_id:128, nshort:'winchester_rusty', name:'Ржавый винчестер', type:'left_arm', level:60, price:3900, image:'images/items/left_arm/winchester_rusty.png?1', image_mini:'images/items/left_arm/mini/winchester_rusty.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[129] = {item_id:129, nshort:'winchester_normal', name:'Винчестер', type:'left_arm', level:75, price:7600, image:'images/items/left_arm/winchester_normal.png?1', image_mini:'images/items/left_arm/mini/winchester_normal.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[130] = {item_id:130, nshort:'winchester_best', name:'Точный винчестер', type:'left_arm', level:78, price:15400, image:'images/items/left_arm/winchester_best.png?1', image_mini:'images/items/left_arm/mini/winchester_best.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
\
items[132] = {item_id:132, nshort:'bear', name:'Медвежонок', type:'left_arm', level:45, price:2600, image:'images/items/left_arm/bear.png?1', image_mini:'images/items/left_arm/mini/bear.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:'set_sleeper', name:'Набор сони'}, shop:'drop'};\
items[133] = {item_id:133, nshort:'muzzleloader_bowie', name:'Дульнозарядное ружьё Бови', type:'left_arm', level:30, price:1480, image:'images/items/left_arm/muzzleloader_bowie.png?1', image_mini:'images/items/left_arm/mini/muzzleloader_bowie.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
\
items[136] = {item_id:136, nshort:'golden_rifle', name:'Золотое ружьё', type:'left_arm', level:75, price:65480, image:'images/items/left_arm/golden_rifle.png?1', image_mini:'images/items/left_arm/mini/golden_rifle.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{charisma:2, dexterity:2, flexibility:2, strength:2}}, set:{key:'gold_set', name:'Золотой набор'}, shop:'quest'};\
items[137] = {item_id:137, nshort:'deathsythe', name:'Коса Смерти', type:'left_arm', level:50, price:17400, image:'images/items/left_arm/deathsythe.png?1', image_mini:'images/items/left_arm/mini/deathsythe.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{charisma:1, dexterity:1, flexibility:1, strength:1}}, set:{key:'season_set', name:'Праздничный наряд'}, shop:'drop'};\
\
items[200] = {item_id:200, nshort:'band_red', name:'Красная бандана', type:'head', level:1, price:4, image:'images/items/head/band_red.png?1', image_mini:'images/items/head/mini/band_red.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{trade:1, tough:1}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[201] = {item_id:201, nshort:'band_green', name:'Зелёная бандана', type:'head', level:2, price:4, image:'images/items/head/band_green.png?1', image_mini:'images/items/head/mini/band_green.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{trade:1, dodge:1}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[202] = {item_id:202, nshort:'band_blue', name:'Синяя бандана', type:'head', level:2, price:4, image:'images/items/head/band_blue.png?1', image_mini:'images/items/head/mini/band_blue.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{trade:1, finger_dexterity:1}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[203] = {item_id:203, nshort:'band_yellow', name:'Жёлтая бандана', type:'head', level:2, price:4, image:'images/items/head/band_yellow.png?1', image_mini:'images/items/head/mini/band_yellow.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{trade:2}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[204] = {item_id:204, nshort:'band_brown', name:'Коричневая бандана', type:'head', level:3, price:18, image:'images/items/head/band_brown.png?1', image_mini:'images/items/head/mini/band_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{trade:1, health:2, swim:1}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[205] = {item_id:205, nshort:'band_black', name:'Чёрная бандана', type:'head', level:3, price:18, image:'images/items/head/band_black.png?1', image_mini:'images/items/head/mini/band_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{trade:2, repair:2}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[206] = {item_id:206, nshort:'slouch_cap_grey', name:'Серая кепка', type:'head', level:3, price:46, image:'images/items/head/slouch_cap_grey.png?1', image_mini:'images/items/head/mini/slouch_cap_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tough:5}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[207] = {item_id:207, nshort:'slouch_cap_brown', name:'Коричневая кепка', type:'head', level:5, price:112, image:'images/items/head/slouch_cap_brown.png?1', image_mini:'images/items/head/mini/slouch_cap_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tough:6, ride:3}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[208] = {item_id:208, nshort:'slouch_cap_black', name:'Чёрная кепка', type:'head', level:5, price:112, image:'images/items/head/slouch_cap_black.png?1', image_mini:'images/items/head/mini/slouch_cap_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tough:3, pitfall:3, leadership:3}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[209] = {item_id:209, nshort:'slouch_cap_fine', name:'Знатная кепка', type:'head', level:6, price:520, image:'images/items/head/slouch_cap_fine.png?1', image_mini:'images/items/head/mini/slouch_cap_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tough:6, aim:4, tactic:4, reflex:4}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[210] = {item_id:210, nshort:'cap_grey', name:'Серая шапка', type:'head', level:4, price:90, image:'images/items/head/cap_grey.png?1', image_mini:'images/items/head/mini/cap_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{swim:8}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[211] = {item_id:211, nshort:'cap_red', name:'Красная шапка', type:'head', level:5, price:175, image:'images/items/head/cap_red.png?1', image_mini:'images/items/head/mini/cap_red.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{swim:6, endurance:5}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[212] = {item_id:212, nshort:'cap_green', name:'Зелёная шапка', type:'head', level:5, price:175, image:'images/items/head/cap_green.png?1', image_mini:'images/items/head/mini/cap_green.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{swim:6}, attributes:{flexibility:1}}, set:{key:null, name:null}, shop:'shop'};\
items[213] = {item_id:213, nshort:'cap_blue', name:'Синяя шапка', type:'head', level:5, price:175, image:'images/items/head/cap_blue.png?1', image_mini:'images/items/head/mini/cap_blue.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{swim:6, pitfall:5}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[214] = {item_id:214, nshort:'cap_yellow', name:'Жёлтая шапка', type:'head', level:5, price:175, image:'images/items/head/cap_yellow.png?1', image_mini:'images/items/head/mini/cap_yellow.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{swim:6, appearance:5}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[215] = {item_id:215, nshort:'cap_brown', name:'Коричневая шапка', type:'head', level:6, price:300, image:'images/items/head/cap_brown.png?1', image_mini:'images/items/head/mini/cap_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{swim:10, tough:4}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[216] = {item_id:216, nshort:'cap_black', name:'Чёрная шапка', type:'head', level:6, price:300, image:'images/items/head/cap_black.png?1', image_mini:'images/items/head/mini/cap_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{swim:6, tactic:4, finger_dexterity:4}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[217] = {item_id:217, nshort:'cap_fine', name:'Знатная шапка', type:'head', level:8, price:1100, image:'images/items/head/cap_fine.png?1', image_mini:'images/items/head/mini/cap_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{swim:10, shot:5, animal:5, tough:5}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[218] = {item_id:218, nshort:'slouch_hat_grey', name:'Серая панама', type:'head', level:7, price:220, image:'images/items/head/slouch_hat_grey.png?1', image_mini:'images/items/head/mini/slouch_hat_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{pitfall:12}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[219] = {item_id:219, nshort:'slouch_hat_brown', name:'Коричневая панама', type:'head', level:9, price:520, image:'images/items/head/slouch_hat_brown.png?1', image_mini:'images/items/head/mini/slouch_hat_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{pitfall:9, punch:5, dodge:4}, attributes:{}}, set:{key:'set_farmer', name:'Набор фермера'}, shop:'shop'};\
items[220] = {item_id:220, nshort:'slouch_hat_black', name:'Чёрная панама', type:'head', level:9, price:520, image:'images/items/head/slouch_hat_black.png?1', image_mini:'images/items/head/mini/slouch_hat_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{pitfall:9, tactic:4}, attributes:{dexterity:1}}, set:{key:null, name:null}, shop:'shop'};\
items[221] = {item_id:221, nshort:'slouch_hat_fine', name:'Знатная панама', type:'head', level:12, price:1920, image:'images/items/head/slouch_hat_fine.png?1', image_mini:'images/items/head/mini/slouch_hat_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{pitfall:10, endurance:6, leadership:6, reflex:6}, attributes:{dexterity:1}}, set:{key:null, name:null}, shop:'shop'};\
items[222] = {item_id:222, nshort:'bowler_grey', name:'Серый котелок', type:'head', level:10, price:420, image:'images/items/head/bowler_grey.png?1', image_mini:'images/items/head/mini/bowler_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{trade:11}, attributes:{charisma:1}}, set:{key:null, name:null}, shop:'shop'};\
items[223] = {item_id:223, nshort:'bowler_brown', name:'Коричневый котелок', type:'head', level:12, price:808, image:'images/items/head/bowler_brown.png?1', image_mini:'images/items/head/mini/bowler_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{trade:11, build:6, reflex:5}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[224] = {item_id:224, nshort:'bowler_black', name:'Чёрный котелок', type:'head', level:12, price:808, image:'images/items/head/bowler_black.png?1', image_mini:'images/items/head/mini/bowler_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{trade:11, shot:6}, attributes:{charisma:1}}, set:{key:'set_quackery', name:'Знахарская утварь'}, shop:'shop'};\
items[225] = {item_id:225, nshort:'bowler_fine', name:'Знатный котелок', type:'head', level:15, price:1850, image:'images/items/head/bowler_fine.png?1', image_mini:'images/items/head/mini/bowler_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{trade:11, tough:6, repair:5, ride:5}, attributes:{charisma:1}}, set:{key:null, name:null}, shop:'shop'};\
items[226] = {item_id:226, nshort:'cloth_hat_grey', name:'Шляпа из серого фетра', type:'head', level:14, price:655, image:'images/items/head/cloth_hat_grey.png?1', image_mini:'images/items/head/mini/cloth_hat_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{health:10, aim:10}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[227] = {item_id:227, nshort:'cloth_hat_brown', name:'Шляпа из коричневого фетра', type:'head', level:20, price:1270, image:'images/items/head/cloth_hat_brown.png?1', image_mini:'images/items/head/mini/cloth_hat_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{health:13, aim:7, swim:7}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[228] = {item_id:228, nshort:'cloth_hat_black', name:'Шляпа из чёрного фетра', type:'head', level:20, price:1270, image:'images/items/head/cloth_hat_black.png?1', image_mini:'images/items/head/mini/cloth_hat_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{health:7, aim:13, appearance:7}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[229] = {item_id:229, nshort:'cloth_hat_fine', name:'Знатная фетровая шляпа', type:'head', level:22, price:3900, image:'images/items/head/cloth_hat_fine.png?1', image_mini:'images/items/head/mini/cloth_hat_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{health:9, aim:9, dodge:8, tactic:8}, attributes:{strength:1, dexterity:1}}, set:{key:null, name:null}, shop:'shop'};\
items[230] = {item_id:230, nshort:'cylinder_grey', name:'Серый цилиндр', type:'head', level:18, price:1270, image:'images/items/head/cylinder_grey.png?1', image_mini:'images/items/head/mini/cylinder_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:14, finger_dexterity:13}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[231] = {item_id:231, nshort:'cylinder_red', name:'Красный цилиндр', type:'head', level:24, price:1900, image:'images/items/head/cylinder_red.png?1', image_mini:'images/items/head/mini/cylinder_red.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{punch:8, leadership:10, finger_dexterity:9}, attributes:{strength:1}}, set:{key:null, name:null}, shop:'shop'};\
items[232] = {item_id:232, nshort:'cylinder_green', name:'Зелёный цилиндр', type:'head', level:24, price:1900, image:'images/items/head/cylinder_green.png?1', image_mini:'images/items/head/mini/cylinder_green.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{hide:8, leadership:10, finger_dexterity:9}, attributes:{flexibility:1}}, set:{key:null, name:null}, shop:'shop'};\
items[233] = {item_id:233, nshort:'cylinder_blue', name:'Синий цилиндр', type:'head', level:24, price:1900, image:'images/items/head/cylinder_blue.png?1', image_mini:'images/items/head/mini/cylinder_blue.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:10, finger_dexterity:12}, attributes:{dexterity:2}}, set:{key:null, name:null}, shop:'shop'};\
items[234] = {item_id:234, nshort:'cylinder_yellow', name:'Жёлтый цилиндр', type:'head', level:24, price:1900, image:'images/items/head/cylinder_yellow.png?1', image_mini:'images/items/head/mini/cylinder_yellow.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:13, finger_dexterity:9}, attributes:{charisma:2}}, set:{key:null, name:null}, shop:'shop'};\
items[235] = {item_id:235, nshort:'cylinder_brown', name:'Коричневый цилиндр', type:'head', level:25, price:2700, image:'images/items/head/cylinder_brown.png?1', image_mini:'images/items/head/mini/cylinder_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:10, finger_dexterity:9, ride:9, health:8}, attributes:{}}, set:{key:'set_gentleman', name:'Джентльменский набор'}, shop:'shop'};\
items[236] = {item_id:236, nshort:'cylinder_black', name:'Чёрный цилиндр', type:'head', level:25, price:2700, image:'images/items/head/cylinder_black.png?1', image_mini:'images/items/head/mini/cylinder_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:13, finger_dexterity:13}, attributes:{charisma:1, dexterity:1}}, set:{key:null, name:null}, shop:'shop'};\
items[237] = {item_id:237, nshort:'cylinder_fine', name:'Цилиндр Линкольна', type:'head', level:27, price:5400, image:'images/items/head/cylinder_fine.png?1', image_mini:'images/items/head/mini/cylinder_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:13, finger_dexterity:12, build:9, ride:8}, attributes:{charisma:1, dexterity:1}}, set:{key:null, name:null}, shop:'shop'};\
items[238] = {item_id:238, nshort:'leather_hat_grey', name:'Серая шляпа', type:'head', level:24, price:2000, image:'images/items/head/leather_hat_grey.png?1', image_mini:'images/items/head/mini/leather_hat_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{reflex:12, animal:11}, attributes:{flexibility:1, charisma:1}}, set:{key:null, name:null}, shop:'shop'};\
items[239] = {item_id:239, nshort:'leather_hat_brown', name:'Коричневая шляпа', type:'head', level:28, price:3500, image:'images/items/head/leather_hat_brown.png?1', image_mini:'images/items/head/mini/leather_hat_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{reflex:12, animal:11, punch:10}, attributes:{flexibility:2}}, set:{key:null, name:null}, shop:'shop'};\
items[240] = {item_id:240, nshort:'leather_hat_black', name:'Чёрная шляпа', type:'head', level:28, price:3500, image:'images/items/head/leather_hat_black.png?1', image_mini:'images/items/head/mini/leather_hat_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{reflex:12, animal:11, repair:10}, attributes:{charisma:2}}, set:{key:null, name:null}, shop:'shop'};\
items[241] = {item_id:241, nshort:'leather_hat_fine', name:'Знатная шляпа', type:'head', level:30, price:4100, image:'images/items/head/leather_hat_fine.png?1', image_mini:'images/items/head/mini/leather_hat_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{reflex:15, animal:14, tough:9, aim:8}, attributes:{flexibility:1, charisma:1}}, set:{key:null, name:null}, shop:'shop'};\
items[242] = {item_id:242, nshort:'stetson_grey', name:'Серый стетсон', type:'head', level:30, price:2555, image:'images/items/head/stetson_grey.png?1', image_mini:'images/items/head/mini/stetson_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{finger_dexterity:14, health:13}, attributes:{dexterity:1, strength:1}}, set:{key:null, name:null}, shop:'shop'};\
items[243] = {item_id:243, nshort:'stetson_brown', name:'Коричневый стетсон', type:'head', level:33, price:4500, image:'images/items/head/stetson_brown.png?1', image_mini:'images/items/head/mini/stetson_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{finger_dexterity:13, health:13, dodge:12}, attributes:{strength:2}}, set:{key:null, name:null}, shop:'shop'};\
items[244] = {item_id:244, nshort:'stetson_black', name:'Чёрный стетсон', type:'head', level:33, price:4500, image:'images/items/head/stetson_black.png?1', image_mini:'images/items/head/mini/stetson_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{finger_dexterity:13, health:13, leadership:12}, attributes:{dexterity:2}}, set:{key:null, name:null}, shop:'shop'};\
items[245] = {item_id:245, nshort:'stetson_fine', name:'Знатный стетсон', type:'head', level:36, price:7100, image:'images/items/head/stetson_fine.png?1', image_mini:'images/items/head/mini/stetson_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{finger_dexterity:16, health:16, trade:9, swim:8}, attributes:{strength:1, dexterity:1}}, set:{key:null, name:null}, shop:'shop'};\
items[246] = {item_id:246, nshort:'xmas_hat', name:'Рождественский колпак', type:'head', level:1, price:50, image:'images/items/head/xmas_hat.png?1', image_mini:'images/items/head/mini/xmas_hat.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[247] = {item_id:247, nshort:'southcap', name:'Фуражка', type:'head', level:20, price:800, image:'images/items/head/southcap.png?1', image_mini:'images/items/head/mini/southcap.png?1', characterClass:'soldier', characterSex:null, speed:null, bonus:{skills:{punch:11, pitfall:5}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[248] = {item_id:248, nshort:'adventurerhat', name:'Шляпа авантюриста', type:'head', level:22, price:2980, image:'images/items/head/adventurerhat.png?1', image_mini:'images/items/head/mini/adventurerhat.png?1', characterClass:'adventurer', characterSex:null, speed:null, bonus:{skills:{hide:6, ride:8, tough:10}, attributes:{dexterity:3}}, set:{key:null, name:null}, shop:'quest'};\
items[249] = {item_id:249, nshort:'fedora_black', name:'Чёрная фетровая шляпа', type:'head', level:22, price:1700, image:'images/items/head/fedora_black.png?1', image_mini:'images/items/head/mini/fedora_black.png?1', characterClass:'duelist', characterSex:null, speed:null, bonus:{skills:{shot:10, aim:6}, attributes:{charisma:3}}, set:{key:null, name:null}, shop:'quest'};\
items[250] = {item_id:250, nshort:'feather_hat_brown', name:'Коричневая шляпа с пером', type:'head', level:18, price:1460, image:'images/items/head/feather_hat_brown.png?1', image_mini:'images/items/head/mini/feather_hat_brown.png?1', characterClass:'worker', characterSex:null, speed:null, bonus:{skills:{dodge:5, reflex:4, endurance:3, tough:2}, attributes:{flexibility:3}}, set:{key:null, name:null}, shop:'quest'};\
\
\
items[253] = {item_id:253, nshort:'indian_hat', name:'Индейское оперение', type:'head', level:51, price:3200, image:'images/items/head/indian_hat.png?1', image_mini:'images/items/head/mini/indian_hat.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:12, appearance:11}, attributes:{charisma:2}}, set:{key:'set_indian', name:'Индейский набор'}, shop:'shop'};\
items[254] = {item_id:254, nshort:'mexican_sombrero', name:'Сомбреро', type:'head', level:30, price:1270, image:'images/items/head/mexican_sombrero.png?1', image_mini:'images/items/head/mini/mexican_sombrero.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tough:10, health:6, shot:6}, attributes:{}}, set:{key:'set_mexican', name:'Набор мексиканца'}, shop:'shop'};\
\
items[256] = {item_id:256, nshort:'pilger_cap', name:'Монашеский чепец', type:'head', level:37, price:1270, image:'images/items/head/pilger_cap.png?1', image_mini:'images/items/head/mini/pilger_cap.png?1', characterClass:null, characterSex:'female', speed:null, bonus:{skills:{endurance:10, leadership:6, repair:6}, attributes:{}}, set:{key:'set_pilgrim_female', name:'Монашеский скарб'}, shop:'shop'};\
items[257] = {item_id:257, nshort:'pilger_hat', name:'Шляпа пастора', type:'head', level:37, price:1270, image:'images/items/head/pilger_hat.png?1', image_mini:'images/items/head/mini/pilger_hat.png?1', characterClass:null, characterSex:'male', speed:null, bonus:{skills:{trade:6, repair:6, health:10}, attributes:{}}, set:{key:'set_pilgrim_male', name:'Скарб проповедника'}, shop:'shop'};\
items[258] = {item_id:258, nshort:'cylinder_xmas', name:'Шляпа снеговика', type:'head', level:30, price:2412, image:'images/items/head/cylinder_xmas.png?1', image_mini:'images/items/head/mini/cylinder_xmas.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{charisma:2, dexterity:2, flexibility:2, strength:2}}, set:{key:'season_set', name:'Праздничный наряд'}, shop:'quest'};\
items[259] = {item_id:259, nshort:'dancer_hat', name:'Перо', type:'head', level:42, price:2500, image:'images/items/head/dancer_hat.png?1', image_mini:'images/items/head/mini/dancer_hat.png?1', characterClass:null, characterSex:'female', speed:null, bonus:{skills:{pitfall:8, tactic:10, aim:9}, attributes:{flexibility:1}}, set:{key:'set_dancer', name:'Туалет танцовщицы'}, shop:'shop'};\
\
items[261] = {item_id:261, nshort:'sleep_cap', name:'Ночной колпак', type:'head', level:45, price:1200, image:'images/items/head/sleep_cap.png?1', image_mini:'images/items/head/mini/sleep_cap.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:'set_sleeper', name:'Набор сони'}, shop:'shop'};\
items[262] = {item_id:262, nshort:'greenhorn_hat', name:'Подобранная шляпа', type:'head', level:4, price:515, image:'images/items/head/greenhorn_hat.png?1', image_mini:'images/items/head/mini/greenhorn_hat.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{trade:3, tactic:3, pitfall:2}, attributes:{flexibility:1}}, set:{key:'greenhorn_set', name:'Набор начинающего'}, shop:'quest'};\
\
\
items[299] = {item_id:299, nshort:'band_grey', name:'Серая бандана', type:'head', level:1, price:2, image:'images/items/head/band_grey.png?1', image_mini:'images/items/head/mini/band_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{trade:1}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[300] = {item_id:300, nshort:'tatter_grey', name:'Серые лохмотья', type:'body', level:1, price:2, image:'images/items/body/tatter_grey.png?1', image_mini:'images/items/body/mini/tatter_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{pitfall:1}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[301] = {item_id:301, nshort:'tatter_red', name:'Красные лохмотья', type:'body', level:1, price:12, image:'images/items/body/tatter_red.png?1', image_mini:'images/items/body/mini/tatter_red.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{pitfall:1, build:2}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[302] = {item_id:302, nshort:'tatter_green', name:'Зелёные лохмотья', type:'body', level:1, price:12, image:'images/items/body/tatter_green.png?1', image_mini:'images/items/body/mini/tatter_green.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{pitfall:1, ride:2}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[303] = {item_id:303, nshort:'tatter_blue', name:'Синие лохмотья', type:'body', level:1, price:12, image:'images/items/body/tatter_blue.png?1', image_mini:'images/items/body/mini/tatter_blue.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{pitfall:3}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[304] = {item_id:304, nshort:'tatter_yellow', name:'Жёлтые лохмотья', type:'body', level:1, price:12, image:'images/items/body/tatter_yellow.png?1', image_mini:'images/items/body/mini/tatter_yellow.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{pitfall:1, leadership:2}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[305] = {item_id:305, nshort:'tatter_brown', name:'Коричневые лохмотья', type:'body', level:2, price:38, image:'images/items/body/tatter_brown.png?1', image_mini:'images/items/body/mini/tatter_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{pitfall:1, reflex:2, punch:2}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[306] = {item_id:306, nshort:'tatter_black', name:'Чёрные лохмотья', type:'body', level:2, price:38, image:'images/items/body/tatter_black.png?1', image_mini:'images/items/body/mini/tatter_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{pitfall:3, tactic:2}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[307] = {item_id:307, nshort:'poncho_grey', name:'Серое пончо', type:'body', level:3, price:38, image:'images/items/body/poncho_grey.png?1', image_mini:'images/items/body/mini/poncho_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{dodge:5}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[308] = {item_id:308, nshort:'poncho_red', name:'Красное пончо', type:'body', level:4, price:80, image:'images/items/body/poncho_red.png?1', image_mini:'images/items/body/mini/poncho_red.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{dodge:3, tough:4}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[309] = {item_id:309, nshort:'poncho_green', name:'Зелёное пончо', type:'body', level:4, price:80, image:'images/items/body/poncho_green.png?1', image_mini:'images/items/body/mini/poncho_green.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{dodge:7}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[310] = {item_id:310, nshort:'poncho_blue', name:'Синее пончо', type:'body', level:4, price:80, image:'images/items/body/poncho_blue.png?1', image_mini:'images/items/body/mini/poncho_blue.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{dodge:3, aim:4}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[311] = {item_id:311, nshort:'poncho_yellow', name:'Жёлтое пончо', type:'body', level:4, price:80, image:'images/items/body/poncho_yellow.png?1', image_mini:'images/items/body/mini/poncho_yellow.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{dodge:3, trade:4}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[312] = {item_id:312, nshort:'poncho_brown', name:'Коричневое пончо', type:'body', level:5, price:174, image:'images/items/body/poncho_brown.png?1', image_mini:'images/items/body/mini/poncho_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{dodge:6, endurance:4}, attributes:{}}, set:{key:'set_mexican', name:'Набор мексиканца'}, shop:'shop'};\
items[313] = {item_id:313, nshort:'poncho_black', name:'Чёрное пончо', type:'body', level:5, price:174, image:'images/items/body/poncho_black.png?1', image_mini:'images/items/body/mini/poncho_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{animal:4, shot:3, dodge:3}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[314] = {item_id:314, nshort:'poncho_fine', name:'Пончо Клинта', type:'body', level:6, price:800, image:'images/items/body/poncho_fine.png?1', image_mini:'images/items/body/mini/poncho_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{dodge:7, build:5, pitfall:4, appearance:4}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[315] = {item_id:315, nshort:'clothes_grey', name:'Серый костюм', type:'body', level:7, price:138, image:'images/items/body/clothes_grey.png?1', image_mini:'images/items/body/mini/clothes_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:9}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[316] = {item_id:316, nshort:'clothes_red', name:'Красный костюм', type:'body', level:8, price:260, image:'images/items/body/clothes_red.png?1', image_mini:'images/items/body/mini/clothes_red.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:6, health:6}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[317] = {item_id:317, nshort:'clothes_green', name:'Зелёный костюм', type:'body', level:14, price:260, image:'images/items/body/clothes_green.png?1', image_mini:'images/items/body/mini/clothes_green.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:6, hide:6}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[318] = {item_id:318, nshort:'clothes_blue', name:'Синий костюм', type:'body', level:8, price:260, image:'images/items/body/clothes_blue.png?1', image_mini:'images/items/body/mini/clothes_blue.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:6, finger_dexterity:6}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[319] = {item_id:319, nshort:'clothes_yellow', name:'Жёлтый костюм', type:'body', level:8, price:260, image:'images/items/body/clothes_yellow.png?1', image_mini:'images/items/body/mini/clothes_yellow.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:7}, attributes:{charisma:1}}, set:{key:null, name:null}, shop:'shop'};\
items[320] = {item_id:320, nshort:'clothes_brown', name:'Коричневый костюм', type:'body', level:8, price:425, image:'images/items/body/clothes_brown.png?1', image_mini:'images/items/body/mini/clothes_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:6, swim:5, build:4}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[321] = {item_id:321, nshort:'clothes_black', name:'Чёрный костюм', type:'body', level:8, price:425, image:'images/items/body/clothes_black.png?1', image_mini:'images/items/body/mini/clothes_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:10, repair:5}, attributes:{}}, set:{key:'set_farmer', name:'Набор фермера'}, shop:'shop'};\
items[322] = {item_id:322, nshort:'clothes_fine', name:'Воскресный костюм', type:'body', level:10, price:1650, image:'images/items/body/clothes_fine.png?1', image_mini:'images/items/body/mini/clothes_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:6, endurance:6, reflex:6, finger_dexterity:5}, attributes:{charisma:1}}, set:{key:null, name:null}, shop:'shop'};\
items[323] = {item_id:323, nshort:'shirt_grey', name:'Серая рубашка', type:'body', level:12, price:310, image:'images/items/body/shirt_grey.png?1', image_mini:'images/items/body/mini/shirt_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:13}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[324] = {item_id:324, nshort:'shirt_red', name:'Красная рубашка', type:'body', level:13, price:560, image:'images/items/body/shirt_red.png?1', image_mini:'images/items/body/mini/shirt_red.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:9, health:8}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[325] = {item_id:325, nshort:'shirt_green', name:'Зелёная рубашка', type:'body', level:13, price:560, image:'images/items/body/shirt_green.png?1', image_mini:'images/items/body/mini/shirt_green.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:9, ride:8}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[326] = {item_id:326, nshort:'shirt_blue', name:'Синяя рубашка', type:'body', level:13, price:560, image:'images/items/body/shirt_blue.png?1', image_mini:'images/items/body/mini/shirt_blue.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:9, aim:8}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[327] = {item_id:327, nshort:'shirt_yellow', name:'Жёлтая рубашка', type:'body', level:13, price:560, image:'images/items/body/shirt_yellow.png?1', image_mini:'images/items/body/mini/shirt_yellow.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:13}, attributes:{charisma:1}}, set:{key:null, name:null}, shop:'shop'};\
items[328] = {item_id:328, nshort:'shirt_brown', name:'Коричневая рубашка', type:'body', level:14, price:800, image:'images/items/body/shirt_brown.png?1', image_mini:'images/items/body/mini/shirt_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:9, reflex:6, endurance:5}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[329] = {item_id:329, nshort:'shirt_black', name:'Чёрная рубашка', type:'body', level:14, price:800, image:'images/items/body/shirt_black.png?1', image_mini:'images/items/body/mini/shirt_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:9, pitfall:6}, attributes:{charisma:1}}, set:{key:null, name:null}, shop:'shop'};\
items[330] = {item_id:330, nshort:'shirt_fine', name:'Знатная рубашка', type:'body', level:15, price:1305, image:'images/items/body/shirt_fine.png?1', image_mini:'images/items/body/mini/shirt_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:10, shot:7, ride:7, punch:6}, attributes:{charisma:1}}, set:{key:null, name:null}, shop:'shop'};\
items[331] = {item_id:331, nshort:'plaid_shirt_grey', name:'Серая клетчатая рубашка', type:'body', level:15, price:560, image:'images/items/body/plaid_shirt_grey.png?1', image_mini:'images/items/body/mini/plaid_shirt_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{punch:12}, attributes:{strength:1}}, set:{key:null, name:null}, shop:'shop'};\
items[332] = {item_id:332, nshort:'plaid_shirt_red', name:'Красная клетчатая рубашка', type:'body', level:16, price:800, image:'images/items/body/plaid_shirt_red.png?1', image_mini:'images/items/body/mini/plaid_shirt_red.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{punch:15}, attributes:{strength:1}}, set:{key:null, name:null}, shop:'shop'};\
items[333] = {item_id:333, nshort:'plaid_shirt_green', name:'Зелёная клетчатая рубашка', type:'body', level:16, price:800, image:'images/items/body/plaid_shirt_green.png?1', image_mini:'images/items/body/mini/plaid_shirt_green.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{punch:11, swim:9}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[334] = {item_id:334, nshort:'plaid_shirt_blue', name:'Синяя клетчатая рубашка', type:'body', level:16, price:800, image:'images/items/body/plaid_shirt_blue.png?1', image_mini:'images/items/body/mini/plaid_shirt_blue.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{punch:11, shot:9}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[335] = {item_id:335, nshort:'plaid_shirt_yellow', name:'Жёлтая клетчатая рубашка', type:'body', level:16, price:800, image:'images/items/body/plaid_shirt_yellow.png?1', image_mini:'images/items/body/mini/plaid_shirt_yellow.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{punch:11, tactic:9}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[336] = {item_id:336, nshort:'plaid_shirt_brown', name:'Коричневая клетчатая рубашка', type:'body', level:17, price:1200, image:'images/items/body/plaid_shirt_brown.png?1', image_mini:'images/items/body/mini/plaid_shirt_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{punch:12, ride:7}, attributes:{strength:1}}, set:{key:null, name:null}, shop:'shop'};\
items[337] = {item_id:337, nshort:'plaid_shirt_black', name:'Чёрная клетчатая рубашка', type:'body', level:17, price:1200, image:'images/items/body/plaid_shirt_black.png?1', image_mini:'images/items/body/mini/plaid_shirt_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{punch:11, tactic:7, repair:6}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[338] = {item_id:338, nshort:'plaid_shirt_fine', name:'Рубаха лесоруба', type:'body', level:19, price:3900, image:'images/items/body/plaid_shirt_fine.png?1', image_mini:'images/items/body/mini/plaid_shirt_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{punch:13, animal:8, hide:8, pitfall:7}, attributes:{strength:1}}, set:{key:null, name:null}, shop:'shop'};\
items[339] = {item_id:339, nshort:'vest_grey', name:'Серая жилетка', type:'body', level:16, price:900, image:'images/items/body/vest_grey.png?1', image_mini:'images/items/body/mini/vest_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{reflex:11, shot:10}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[340] = {item_id:340, nshort:'vest_brown', name:'Коричневая жилетка', type:'body', level:20, price:1800, image:'images/items/body/vest_brown.png?1', image_mini:'images/items/body/mini/vest_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{reflex:9, shot:7, health:8}, attributes:{flexibility:1}}, set:{key:'set_quackery', name:'Знахарская утварь'}, shop:'shop'};\
items[341] = {item_id:341, nshort:'vest_black', name:'Чёрная жилетка', type:'body', level:20, price:1800, image:'images/items/body/vest_black.png?1', image_mini:'images/items/body/mini/vest_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{reflex:7, shot:9, leadership:8}, attributes:{dexterity:1}}, set:{key:null, name:null}, shop:'shop'};\
items[342] = {item_id:342, nshort:'vest_fine', name:'Знатная жилетка', type:'body', level:20, price:5200, image:'images/items/body/vest_fine.png?1', image_mini:'images/items/body/mini/vest_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{reflex:10, shot:10, endurance:9, trade:8}, attributes:{dexterity:1, flexibility:1}}, set:{key:null, name:null}, shop:'shop'};\
items[343] = {item_id:343, nshort:'coat_grey', name:'Серая куртка', type:'body', level:20, price:1300, image:'images/items/body/coat_grey.png?1', image_mini:'images/items/body/mini/coat_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{build:13, pitfall:12}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[344] = {item_id:344, nshort:'coat_red', name:'Красная куртка', type:'body', level:20, price:2000, image:'images/items/body/coat_red.png?1', image_mini:'images/items/body/mini/coat_red.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{build:12, pitfall:8}, attributes:{strength:2}}, set:{key:null, name:null}, shop:'shop'};\
items[345] = {item_id:345, nshort:'coat_green', name:'Зелёная куртка', type:'body', level:20, price:2000, image:'images/items/body/coat_green.png?1', image_mini:'images/items/body/mini/coat_green.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{build:9, pitfall:8, hide:8}, attributes:{flexibility:1}}, set:{key:null, name:null}, shop:'shop'};\
items[346] = {item_id:346, nshort:'coat_blue', name:'Синяя куртка', type:'body', level:20, price:2000, image:'images/items/body/coat_blue.png?1', image_mini:'images/items/body/mini/coat_blue.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{build:9, pitfall:11}, attributes:{dexterity:2}}, set:{key:null, name:null}, shop:'shop'};\
items[347] = {item_id:347, nshort:'coat_yellow', name:'Жёлтая куртка', type:'body', level:20, price:2000, image:'images/items/body/coat_yellow.png?1', image_mini:'images/items/body/mini/coat_yellow.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{build:9, pitfall:8, leadership:8}, attributes:{charisma:1}}, set:{key:null, name:null}, shop:'shop'};\
items[348] = {item_id:348, nshort:'coat_brown', name:'Коричневая куртка', type:'body', level:21, price:2500, image:'images/items/body/coat_brown.png?1', image_mini:'images/items/body/mini/coat_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{build:12, pitfall:8, swim:9}, attributes:{strength:1}}, set:{key:null, name:null}, shop:'shop'};\
items[349] = {item_id:349, nshort:'coat_black', name:'Чёрная куртка', type:'body', level:21, price:2500, image:'images/items/body/coat_black.png?1', image_mini:'images/items/body/mini/coat_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{build:9, pitfall:11, animal:9}, attributes:{dexterity:1}}, set:{key:null, name:null}, shop:'shop'};\
items[350] = {item_id:350, nshort:'coat_fine', name:'Знатная куртка', type:'body', level:22, price:6300, image:'images/items/body/coat_fine.png?1', image_mini:'images/items/body/mini/coat_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{build:12, pitfall:11, appearance:9, dodge:9}, attributes:{strength:1, dexterity:1}}, set:{key:null, name:null}, shop:'shop'};\
items[351] = {item_id:351, nshort:'jacket_grey', name:'Серый пиджак', type:'body', level:20, price:1850, image:'images/items/body/jacket_grey.png?1', image_mini:'images/items/body/mini/jacket_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{trade:10, reflex:9}, attributes:{charisma:1, flexibility:1}}, set:{key:null, name:null}, shop:'shop'};\
items[352] = {item_id:352, nshort:'jacket_brown', name:'Коричневый пиджак', type:'body', level:25, price:3500, image:'images/items/body/jacket_brown.png?1', image_mini:'images/items/body/mini/jacket_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{trade:10, reflex:9, tough:10}, attributes:{flexibility:2}}, set:{key:null, name:null}, shop:'shop'};\
items[353] = {item_id:353, nshort:'jacket_black', name:'Чёрный пиджак', type:'body', level:25, price:3500, image:'images/items/body/jacket_black.png?1', image_mini:'images/items/body/mini/jacket_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{trade:10, reflex:9, aim:10}, attributes:{charisma:2}}, set:{key:null, name:null}, shop:'shop'};\
items[354] = {item_id:354, nshort:'jacket_fine', name:'Знатный пиджак', type:'body', level:27, price:7200, image:'images/items/body/jacket_fine.png?1', image_mini:'images/items/body/mini/jacket_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{trade:13, reflex:13, punch:9, aim:9}, attributes:{charisma:1, flexibility:1}}, set:{key:'set_gentleman', name:'Джентльменский набор'}, shop:'shop'};\
items[355] = {item_id:355, nshort:'leather_coat_grey', name:'Серая кожанка', type:'body', level:25, price:2700, image:'images/items/body/leather_coat_grey.png?1', image_mini:'images/items/body/mini/leather_coat_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tough:13, hide:12}, attributes:{strength:1, flexibility:1}}, set:{key:null, name:null}, shop:'shop'};\
items[356] = {item_id:356, nshort:'leather_coat_brown', name:'Коричневая кожанка', type:'body', level:28, price:5000, image:'images/items/body/leather_coat_brown.png?1', image_mini:'images/items/body/mini/leather_coat_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tough:13, hide:13}, attributes:{strength:2, flexibility:2}}, set:{key:null, name:null}, shop:'shop'};\
items[357] = {item_id:357, nshort:'leather_coat_black', name:'Чёрная кожанка', type:'body', level:28, price:5000, image:'images/items/body/leather_coat_black.png?1', image_mini:'images/items/body/mini/leather_coat_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:11, repair:12, hide:11, tough:12}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[358] = {item_id:358, nshort:'leather_coat_fine', name:'Знатная кожанка', type:'body', level:30, price:9000, image:'images/items/body/leather_coat_fine.png?1', image_mini:'images/items/body/mini/leather_coat_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tough:16, hide:15, finger_dexterity:9, appearance:10}, attributes:{strength:1, flexibility:1}}, set:{key:null, name:null}, shop:'shop'};\
items[359] = {item_id:359, nshort:'greatcoat_grey', name:'Серое пальто', type:'body', level:33, price:3500, image:'images/items/body/greatcoat_grey.png?1', image_mini:'images/items/body/mini/greatcoat_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:15, shot:14}, attributes:{charisma:1, dexterity:1}}, set:{key:null, name:null}, shop:'shop'};\
items[360] = {item_id:360, nshort:'greatcoat_brown', name:'Коричневое пальто', type:'body', level:40, price:6280, image:'images/items/body/greatcoat_brown.png?1', image_mini:'images/items/body/mini/greatcoat_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:13, shot:13, ride:13, health:12}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[361] = {item_id:361, nshort:'greatcoat_fine', name:'Знатное пальто', type:'body', level:45, price:9500, image:'images/items/body/greatcoat_fine.png?1', image_mini:'images/items/body/mini/greatcoat_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:17, shot:16, endurance:9, ride:9}, attributes:{charisma:1, dexterity:1}}, set:{key:null, name:null}, shop:'shop'};\
items[362] = {item_id:362, nshort:'uniform', name:'Форма', type:'body', level:20, price:800, image:'images/items/body/uniform.png?1', image_mini:'images/items/body/mini/uniform.png?1', characterClass:'soldier', characterSex:null, speed:null, bonus:{skills:{appearance:2, hide:4}, attributes:{charisma:2}}, set:{key:null, name:null}, shop:'quest'};\
items[363] = {item_id:363, nshort:'uniform_burned', name:'Палёная форма', type:'body', level:20, price:80, image:'images/items/body/uniform_burned.png?1', image_mini:'images/items/body/mini/uniform_burned.png?1', characterClass:'soldier', characterSex:null, speed:null, bonus:{skills:{appearance:-2, hide:4}, attributes:{charisma:2}}, set:{key:null, name:null}, shop:'drop'};\
items[364] = {item_id:364, nshort:'greatcoat_black', name:'Чёрное пальто', type:'body', level:40, price:6280, image:'images/items/body/greatcoat_black.png?1', image_mini:'images/items/body/mini/greatcoat_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:16, shot:15}, attributes:{charisma:2, dexterity:2}}, set:{key:null, name:null}, shop:'shop'};\
items[365] = {item_id:365, nshort:'adventurerjacket', name:'Жакет авантюриста', type:'body', level:40, price:1100, image:'images/items/body/adventurerjacket.png?1', image_mini:'images/items/body/mini/adventurerjacket.png?1', characterClass:'adventurer', characterSex:null, speed:null, bonus:{skills:{hide:4, ride:10, tough:9}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[366] = {item_id:366, nshort:'vest_leather_brown', name:'Коричневая кожаная жилетка', type:'body', level:14, price:800, image:'images/items/body/vest_leather_brown.png?1', image_mini:'images/items/body/mini/vest_leather_brown.png?1', characterClass:'duelist', characterSex:null, speed:null, bonus:{skills:{dodge:8, reflex:7, punch:5}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[367] = {item_id:367, nshort:'shirt_canvas', name:'Холщовая рубаха', type:'body', level:8, price:425, image:'images/items/body/shirt_canvas.png?1', image_mini:'images/items/body/mini/shirt_canvas.png?1', characterClass:'worker', characterSex:null, speed:null, bonus:{skills:{animal:3, dodge:2}, attributes:{strength:2}}, set:{key:null, name:null}, shop:'quest'};\
items[368] = {item_id:368, nshort:'dancer_dress', name:'Платье танцовщицы', type:'body', level:45, price:7500, image:'images/items/body/dancer_dress.png?1', image_mini:'images/items/body/mini/dancer_dress.png?1', characterClass:null, characterSex:'female', speed:null, bonus:{skills:{endurance:8, shot:8, finger_dexterity:11, animal:10}, attributes:{charisma:2}}, set:{key:'set_dancer', name:'Туалет танцовщицы'}, shop:'shop'};\
items[369] = {item_id:369, nshort:'indian_jacket', name:'Индейское платье', type:'body', level:55, price:7500, image:'images/items/body/indian_jacket.png?1', image_mini:'images/items/body/mini/indian_jacket.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{punch:8, hide:9, pitfall:8}, attributes:{dexterity:1, flexibility:2}}, set:{key:'set_indian', name:'Индейский набор'}, shop:'shop'};\
\
\
items[372] = {item_id:372, nshort:'pilger_dress', name:'Платье монашки', type:'body', level:38, price:2500, image:'images/items/body/pilger_dress.png?1', image_mini:'images/items/body/mini/pilger_dress.png?1', characterClass:null, characterSex:'female', speed:null, bonus:{skills:{dodge:10, build:8}, attributes:{strength:2}}, set:{key:'set_pilgrim_female', name:'Монашеский скарб'}, shop:'shop'};\
items[373] = {item_id:373, nshort:'pilger_jacket', name:'Рубаха пастора', type:'body', level:38, price:2500, image:'images/items/body/pilger_jacket.png?1', image_mini:'images/items/body/mini/pilger_jacket.png?1', characterClass:null, characterSex:'male', speed:null, bonus:{skills:{hide:10, build:8}, attributes:{dexterity:2}}, set:{key:'set_pilgrim_male', name:'Скарб проповедника'}, shop:'shop'};\
\
items[375] = {item_id:375, nshort:'night_shirt', name:'Ночная рубашка', type:'body', level:45, price:1500, image:'images/items/body/night_shirt.png?1', image_mini:'images/items/body/mini/night_shirt.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:'set_sleeper', name:'Набор сони'}, shop:'drop'};\
\
\
items[400] = {item_id:400, nshort:'ripped_shoes_grey', name:'Серые стоптанные башмаки', type:'foot', level:1, price:4, image:'images/items/foot/ripped_shoes_grey.png?1', image_mini:'images/items/foot/mini/ripped_shoes_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{repair:1}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[401] = {item_id:401, nshort:'ripped_shoes_brown', name:'Коричневые стоптанные башмаки', type:'foot', level:3, price:30, image:'images/items/foot/ripped_shoes_brown.png?1', image_mini:'images/items/foot/mini/ripped_shoes_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{swim:4, build:4}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[402] = {item_id:402, nshort:'ripped_shoes_black', name:'Чёрные стоптанные башмаки', type:'foot', level:3, price:30, image:'images/items/foot/ripped_shoes_black.png?1', image_mini:'images/items/foot/mini/ripped_shoes_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{repair:4, leadership:4}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[403] = {item_id:403, nshort:'light_grey', name:'Серые матерчатые ботинки', type:'foot', level:5, price:70, image:'images/items/foot/light_grey.png?1', image_mini:'images/items/foot/mini/light_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{endurance:5}, attributes:{strength:1}}, set:{key:null, name:null}, shop:'shop'};\
items[404] = {item_id:404, nshort:'light_brown', name:'Коричневые матерчатые ботинки', type:'foot', level:9, price:170, image:'images/items/foot/light_brown.png?1', image_mini:'images/items/foot/mini/light_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{endurance:3, hide:5}, attributes:{strength:1}}, set:{key:null, name:null}, shop:'shop'};\
items[405] = {item_id:405, nshort:'light_black', name:'Чёрные матерчатые ботинки', type:'foot', level:9, price:170, image:'images/items/foot/light_black.png?1', image_mini:'images/items/foot/mini/light_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{endurance:3, trade:5, shot:5}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[406] = {item_id:406, nshort:'light_fine', name:'Знатные матерчатые ботинки', type:'foot', level:11, price:1500, image:'images/items/foot/light_fine.png?1', image_mini:'images/items/foot/mini/light_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{endurance:4, appearance:6, reflex:6, pitfall:6}, attributes:{strength:1}}, set:{key:null, name:null}, shop:'shop'};\
items[407] = {item_id:407, nshort:'working_grey', name:'Серые рабочие ботинки', type:'foot', level:9, price:660, image:'images/items/foot/working_grey.png?1', image_mini:'images/items/foot/mini/working_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{pitfall:12}, attributes:{dexterity:1}}, set:{key:null, name:null}, shop:'shop'};\
items[408] = {item_id:408, nshort:'working_brown', name:'Коричневые рабочие ботинки', type:'foot', level:13, price:1200, image:'images/items/foot/working_brown.png?1', image_mini:'images/items/foot/mini/working_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{pitfall:8, endurance:7, ride:7}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[409] = {item_id:409, nshort:'working_black', name:'Чёрные рабочие ботинки', type:'foot', level:13, price:1200, image:'images/items/foot/working_black.png?1', image_mini:'images/items/foot/mini/working_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{pitfall:10, tactic:7}, attributes:{dexterity:1}}, set:{key:'set_farmer', name:'Набор фермера'}, shop:'shop'};\
items[410] = {item_id:410, nshort:'working_fine', name:'Знатные рабочие ботинки', type:'foot', level:15, price:4300, image:'images/items/foot/working_fine.png?1', image_mini:'images/items/foot/mini/working_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{pitfall:11, trade:8, dodge:8, punch:8}, attributes:{dexterity:1}}, set:{key:null, name:null}, shop:'shop'};\
items[411] = {item_id:411, nshort:'spur_grey', name:'Серые ботинки со шпорами', type:'foot', level:14, price:1400, image:'images/items/foot/spur_grey.png?1', image_mini:'images/items/foot/mini/spur_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{animal:7, shot:7}, attributes:{charisma:1, dexterity:1}}, set:{key:null, name:null}, shop:'shop'};\
items[412] = {item_id:412, nshort:'spur_brown', name:'Коричневые ботинки со шпорами', type:'foot', level:17, price:2450, image:'images/items/foot/spur_brown.png?1', image_mini:'images/items/foot/mini/spur_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{animal:7, shot:6, reflex:9, tough:9}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[413] = {item_id:413, nshort:'spur_black', name:'Чёрные ботинки со шпорами', type:'foot', level:17, price:2450, image:'images/items/foot/spur_black.png?1', image_mini:'images/items/foot/mini/spur_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{animal:10, shot:9}, attributes:{charisma:1, dexterity:1}}, set:{key:null, name:null}, shop:'shop'};\
items[414] = {item_id:414, nshort:'spur_fine', name:'Знатные ботинки со шпорами', type:'foot', level:20, price:6230, image:'images/items/foot/spur_fine.png?1', image_mini:'images/items/foot/mini/spur_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{animal:11, shot:10, health:8, swim:8}, attributes:{charisma:1, dexterity:1}}, set:{key:null, name:null}, shop:'shop'};\
items[415] = {item_id:415, nshort:'boots_grey', name:'Серые сапоги', type:'foot', level:16, price:3000, image:'images/items/foot/boots_grey.png?1', image_mini:'images/items/foot/mini/boots_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:12, shot:12}, attributes:{dexterity:1, charisma:1}}, set:{key:null, name:null}, shop:'shop'};\
items[416] = {item_id:416, nshort:'boots_brown', name:'Коричневые сапоги', type:'foot', level:20, price:5100, image:'images/items/foot/boots_brown.png?1', image_mini:'images/items/foot/mini/boots_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:10, shot:9, tough:12, dodge:12}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[417] = {item_id:417, nshort:'boots_black', name:'Чёрные сапоги', type:'foot', level:20, price:5100, image:'images/items/foot/boots_black.png?1', image_mini:'images/items/foot/mini/boots_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:12, shot:11}, attributes:{dexterity:2, charisma:2}}, set:{key:null, name:null}, shop:'shop'};\
items[418] = {item_id:418, nshort:'boots_fine', name:'Знатные сапоги', type:'foot', level:22, price:8870, image:'images/items/foot/boots_fine.png?1', image_mini:'images/items/foot/mini/boots_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:10, shot:9, endurance:8, hide:8}, attributes:{dexterity:2, charisma:2}}, set:{key:null, name:null}, shop:'shop'};\
items[419] = {item_id:419, nshort:'rider_grey', name:'Серые ковбойские сапоги', type:'foot', level:30, price:2600, image:'images/items/foot/rider_grey.png?1', image_mini:'images/items/foot/mini/rider_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{ride:15, punch:14}, attributes:{flexibility:1, strength:1}}, set:{key:null, name:null}, shop:'shop'};\
items[420] = {item_id:420, nshort:'rider_brown', name:'Коричневые ковбойские сапоги', type:'foot', level:33, price:6200, image:'images/items/foot/rider_brown.png?1', image_mini:'images/items/foot/mini/rider_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{ride:14, punch:13}, attributes:{flexibility:2, strength:2}}, set:{key:null, name:null}, shop:'shop'};\
items[421] = {item_id:421, nshort:'rider_black', name:'Чёрные ковбойские сапоги', type:'foot', level:33, price:6200, image:'images/items/foot/rider_black.png?1', image_mini:'images/items/foot/mini/rider_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{pitfall:13, animal:14}, attributes:{dexterity:2, charisma:2}}, set:{key:null, name:null}, shop:'shop'};\
items[422] = {item_id:422, nshort:'rider_fine', name:'Знатные ковбойские сапоги', type:'foot', level:35, price:9500, image:'images/items/foot/rider_fine.png?1', image_mini:'images/items/foot/mini/rider_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{ride:11, punch:10, appearance:8, aim:8}, attributes:{flexibility:2, strength:2}}, set:{key:null, name:null}, shop:'shop'};\
items[423] = {item_id:423, nshort:'soldier_boots', name:'Солдатские сапоги', type:'foot', level:30, price:5500, image:'images/items/foot/soldier_boots.png?1', image_mini:'images/items/foot/mini/soldier_boots.png?1', characterClass:'soldier', characterSex:null, speed:null, bonus:{skills:{tactic:9, ride:12, health:12, tough:10}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
\
items[425] = {item_id:425, nshort:'lace-up_shoes_brown', name:'Коричневые ботинки со шнурками', type:'foot', level:13, price:1290, image:'images/items/foot/lace-up_shoes_brown.png?1', image_mini:'images/items/foot/mini/lace-up_shoes_brown.png?1', characterClass:'duelist', characterSex:null, speed:null, bonus:{skills:{appearance:4, shot:4, aim:5}, attributes:{dexterity:2}}, set:{key:null, name:null}, shop:'quest'};\
items[426] = {item_id:426, nshort:'pilgrim_shoes_brown', name:'Коричневые ботинки проповедника', type:'foot', level:15, price:1530, image:'images/items/foot/pilgrim_shoes_brown.png?1', image_mini:'images/items/foot/mini/pilgrim_shoes_brown.png?1', characterClass:'worker', characterSex:null, speed:null, bonus:{skills:{repair:6, punch:6, build:4}, attributes:{strength:2}}, set:{key:null, name:null}, shop:'quest'};\
items[427] = {item_id:427, nshort:'gentleman_shoes', name:'Знатные башмаки', type:'foot', level:45, price:5600, image:'images/items/foot/gentleman_shoes.png?1', image_mini:'images/items/foot/mini/gentleman_shoes.png?1', characterClass:null, characterSex:'male', speed:null, bonus:{skills:{appearance:8, reflex:9}, attributes:{dexterity:2, strength:2}}, set:{key:'set_gentleman', name:'Джентльменский набор'}, shop:'shop'};\
items[428] = {item_id:428, nshort:'mexican_shoes', name:'Сандалии', type:'foot', level:28, price:2650, image:'images/items/foot/mexican_shoes.png?1', image_mini:'images/items/foot/mini/mexican_shoes.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{animal:7, aim:6, dodge:8, health:8}, attributes:{}}, set:{key:'set_mexican', name:'Набор мексиканца'}, shop:'shop'};\
items[429] = {item_id:429, nshort:'mokassins', name:'Мокасины', type:'foot', level:45, price:5600, image:'images/items/foot/mokassins.png?1', image_mini:'images/items/foot/mini/mokassins.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:9, endurance:9, hide:9}, attributes:{flexibility:2}}, set:{key:'set_indian', name:'Индейский набор'}, shop:'shop'};\
\
items[431] = {item_id:431, nshort:'pilger_boots', name:'Монашеские туфли', type:'foot', level:39, price:2600, image:'images/items/foot/pilger_boots.png?1', image_mini:'images/items/foot/mini/pilger_boots.png?1', characterClass:null, characterSex:'female', speed:null, bonus:{skills:{build:7, hide:6, finger_dexterity:8, shot:8}, attributes:{}}, set:{key:'set_pilgrim_female', name:'Монашеский скарб'}, shop:'shop'};\
items[432] = {item_id:432, nshort:'pilger_shoes', name:'Туфли монаха', type:'foot', level:39, price:2600, image:'images/items/foot/pilger_shoes.png?1', image_mini:'images/items/foot/mini/pilger_shoes.png?1', characterClass:null, characterSex:'male', speed:null, bonus:{skills:{build:7, tough:6, leadership:8, reflex:8}, attributes:{}}, set:{key:'set_pilgrim_male', name:'Скарб проповедника'}, shop:'shop'};\
items[433] = {item_id:433, nshort:'dancer_boots', name:'Сапожки на каблуках', type:'foot', level:41, price:4000, image:'images/items/foot/dancer_boots.png?1', image_mini:'images/items/foot/mini/dancer_boots.png?1', characterClass:null, characterSex:'female', speed:null, bonus:{skills:{repair:8, aim:9}, attributes:{charisma:1, dexterity:2}}, set:{key:'set_dancer', name:'Туалет танцовщицы'}, shop:'shop'};\
\
items[435] = {item_id:435, nshort:'quackery_shoes', name:'Знахарские башмаки', type:'foot', level:45, price:5600, image:'images/items/foot/quackery_shoes.png?1', image_mini:'images/items/foot/mini/quackery_shoes.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{trade:9, swim:9, ride:9}, attributes:{flexibility:2}}, set:{key:'set_quackery', name:'Знахарская утварь'}, shop:'shop'};\
items[436] = {item_id:436, nshort:'slippers', name:'Тапочки', type:'foot', level:45, price:2000, image:'images/items/foot/slippers.png?1', image_mini:'images/items/foot/mini/slippers.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:'set_sleeper', name:'Набор сони'}, shop:'drop'};\
items[437] = {item_id:437, nshort:'thanksgiving_boots', name:'Сапоги со Дня благодарения', type:'foot', level:30, price:4600, image:'images/items/foot/thanksgiving_boots.png?1', image_mini:'images/items/foot/mini/thanksgiving_boots.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{hide:6, tough:12}, attributes:{dexterity:2}}, set:{key:'season_set', name:'Праздничный наряд'}, shop:'quest'};\
items[438] = {item_id:438, nshort:'greenhorn_shoes', name:'Башмаки на новенького', type:'foot', level:6, price:460, image:'images/items/foot/greenhorn_shoes.png?1', image_mini:'images/items/foot/mini/greenhorn_shoes.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{finger_dexterity:3, reflex:6}, attributes:{dexterity:1}}, set:{key:'greenhorn_set', name:'Набор начинающего'}, shop:'quest'};\
\
\
items[500] = {item_id:500, nshort:'neckband_grey', name:'Серый шарф', type:'neck', level:null, price:10, image:'images/items/neck/neckband_grey.png?1', image_mini:'images/items/neck/neckband_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{swim:2}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[501] = {item_id:501, nshort:'neckband_red', name:'Красный шарф', type:'neck', level:null, price:14, image:'images/items/neck/neckband_red.png?1', image_mini:'images/items/neck/neckband_red.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{swim:2, build:1}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[502] = {item_id:502, nshort:'neckband_green', name:'Зелёный шарф', type:'neck', level:null, price:14, image:'images/items/neck/neckband_green.png?1', image_mini:'images/items/neck/neckband_green.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{swim:3}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[503] = {item_id:503, nshort:'neckband_blue', name:'Синий шарф', type:'neck', level:null, price:14, image:'images/items/neck/neckband_blue.png?1', image_mini:'images/items/neck/neckband_blue.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{swim:2, aim:1}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[504] = {item_id:504, nshort:'neckband_yellow', name:'Жёлтый шарф', type:'neck', level:null, price:14, image:'images/items/neck/neckband_yellow.png?1', image_mini:'images/items/neck/neckband_yellow.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{swim:2, appearance:1}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[505] = {item_id:505, nshort:'neckband_brown', name:'Коричневый шарф', type:'neck', level:null, price:20, image:'images/items/neck/neckband_brown.png?1', image_mini:'images/items/neck/neckband_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{swim:3, health:1}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[506] = {item_id:506, nshort:'neckband_black', name:'Чёрный шарф', type:'neck', level:null, price:20, image:'images/items/neck/neckband_black.png?1', image_mini:'images/items/neck/neckband_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{swim:2, tactic:1, shot:1}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[507] = {item_id:507, nshort:'indian_chain_grey', name:'Серое индейское ожерелье', type:'neck', level:null, price:35, image:'images/items/neck/indian_chain_grey.png?1', image_mini:'images/items/neck/indian_chain_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{animal:5}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[508] = {item_id:508, nshort:'indian_chain_red', name:'Красное индейское ожерелье', type:'neck', level:null, price:75, image:'images/items/neck/indian_chain_red.png?1', image_mini:'images/items/neck/indian_chain_red.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{animal:5, endurance:2}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[509] = {item_id:509, nshort:'indian_chain_green', name:'Зелёное индейское ожерелье', type:'neck', level:null, price:75, image:'images/items/neck/indian_chain_green.png?1', image_mini:'images/items/neck/indian_chain_green.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{animal:5, ride:2}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[510] = {item_id:510, nshort:'indian_chain_blue', name:'Синее индейское ожерелье', type:'neck', level:null, price:75, image:'images/items/neck/indian_chain_blue.png?1', image_mini:'images/items/neck/indian_chain_blue.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{animal:5, finger_dexterity:2}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[511] = {item_id:511, nshort:'indian_chain_yellow', name:'Жёлтое индейское ожерелье', type:'neck', level:null, price:75, image:'images/items/neck/indian_chain_yellow.png?1', image_mini:'images/items/neck/indian_chain_yellow.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{animal:7}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[512] = {item_id:512, nshort:'indian_chain_fine', name:'Золотое индейское ожерелье', type:'neck', level:null, price:660, image:'images/items/neck/indian_chain_fine.png?1', image_mini:'images/items/neck/indian_chain_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{animal:8, hide:4, punch:4, pitfall:3}, attributes:{}}, set:{key:'set_indian', name:'Индейский набор'}, shop:'shop'};\
items[513] = {item_id:513, nshort:'loop_grey', name:'Серая повязка', type:'neck', level:null, price:125, image:'images/items/neck/loop_grey.png?1', image_mini:'images/items/neck/loop_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{shot:9}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[514] = {item_id:514, nshort:'loop_red', name:'Красная повязка', type:'neck', level:null, price:240, image:'images/items/neck/loop_red.png?1', image_mini:'images/items/neck/loop_red.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{shot:8, health:4}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[515] = {item_id:515, nshort:'loop_green', name:'Зелёная повязка', type:'neck', level:null, price:240, image:'images/items/neck/loop_green.png?1', image_mini:'images/items/neck/loop_green.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{shot:8, swim:4}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[516] = {item_id:516, nshort:'loop_blue', name:'Синяя повязка', type:'neck', level:null, price:240, image:'images/items/neck/loop_blue.png?1', image_mini:'images/items/neck/loop_blue.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{shot:12}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[517] = {item_id:517, nshort:'loop_yellow', name:'Жёлтая повязка', type:'neck', level:null, price:240, image:'images/items/neck/loop_yellow.png?1', image_mini:'images/items/neck/loop_yellow.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{shot:8, trade:4}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[518] = {item_id:518, nshort:'loop_brown', name:'Коричневая повязка', type:'neck', level:null, price:385, image:'images/items/neck/loop_brown.png?1', image_mini:'images/items/neck/loop_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{shot:8, dodge:4, endurance:3}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[519] = {item_id:519, nshort:'loop_black', name:'Чёрная повязка', type:'neck', level:null, price:385, image:'images/items/neck/loop_black.png?1', image_mini:'images/items/neck/loop_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{shot:11, appearance:3}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[520] = {item_id:520, nshort:'fly_grey', name:'Серая бабочка', type:'neck', level:null, price:282, image:'images/items/neck/fly_grey.png?1', image_mini:'images/items/neck/fly_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{build:13}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[521] = {item_id:521, nshort:'fly_red', name:'Красная бабочка', type:'neck', level:null, price:446, image:'images/items/neck/fly_red.png?1', image_mini:'images/items/neck/fly_red.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{build:11}, attributes:{strength:1}}, set:{key:null, name:null}, shop:'shop'};\
items[522] = {item_id:522, nshort:'fly_green', name:'Зелёная бабочка', type:'neck', level:null, price:446, image:'images/items/neck/fly_green.png?1', image_mini:'images/items/neck/fly_green.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{build:11, ride:6}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[523] = {item_id:523, nshort:'fly_blue', name:'Синяя бабочка', type:'neck', level:null, price:446, image:'images/items/neck/fly_blue.png?1', image_mini:'images/items/neck/fly_blue.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{build:11, aim:6}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[524] = {item_id:524, nshort:'fly_yellow', name:'Жёлтая бабочка', type:'neck', level:null, price:446, image:'images/items/neck/fly_yellow.png?1', image_mini:'images/items/neck/fly_yellow.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{build:11, animal:6}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[525] = {item_id:525, nshort:'fly_brown', name:'Коричневая бабочка', type:'neck', level:null, price:650, image:'images/items/neck/fly_brown.png?1', image_mini:'images/items/neck/fly_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{build:10, hide:4}, attributes:{strength:1}}, set:{key:null, name:null}, shop:'shop'};\
items[526] = {item_id:526, nshort:'fly_black', name:'Чёрная бабочка', type:'neck', level:null, price:650, image:'images/items/neck/fly_black.png?1', image_mini:'images/items/neck/fly_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{build:11, trade:4, pitfall:4}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[527] = {item_id:527, nshort:'fly_fine', name:'Знатная бабочка', type:'neck', level:null, price:2200, image:'images/items/neck/fly_fine.png?1', image_mini:'images/items/neck/fly_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{build:11, repair:6, dodge:6, tactic:5}, attributes:{strength:1}}, set:{key:'set_quackery', name:'Знахарская утварь'}, shop:'shop'};\
items[528] = {item_id:528, nshort:'cross_bronze', name:'Железный крест', type:'neck', level:null, price:730, image:'images/items/neck/cross_bronze.png?1', image_mini:'images/items/neck/cross_bronze.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{strength:1, flexibility:1, dexterity:1, charisma:1}}, set:{key:'set_pilgrim_female', name:'Монашеский скарб'}, shop:'shop'};\
items[529] = {item_id:529, nshort:'cross_silver', name:'Серебряный крест', type:'neck', level:null, price:1200, image:'images/items/neck/cross_silver.png?1', image_mini:'images/items/neck/cross_silver.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{strength:1, flexibility:2, dexterity:1, charisma:1}}, set:{key:'set_pilgrim_male', name:'Скарб проповедника'}, shop:'shop'};\
items[530] = {item_id:530, nshort:'cross_gold', name:'Золотой крест', type:'neck', level:null, price:3400, image:'images/items/neck/cross_gold.png?1', image_mini:'images/items/neck/cross_gold.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{strength:2, flexibility:2, dexterity:2, charisma:2}}, set:{key:null, name:null}, shop:'shop'};\
items[531] = {item_id:531, nshort:'cravat_grey', name:'Серый галстук', type:'neck', level:null, price:820, image:'images/items/neck/cravat_grey.png?1', image_mini:'images/items/neck/cravat_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:11, health:10}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[532] = {item_id:532, nshort:'cravat_red', name:'Красный галстук', type:'neck', level:null, price:1205, image:'images/items/neck/cravat_red.png?1', image_mini:'images/items/neck/cravat_red.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:8, health:7}, attributes:{strength:2}}, set:{key:null, name:null}, shop:'shop'};\
items[533] = {item_id:533, nshort:'cravat_green', name:'Зелёный галстук', type:'neck', level:null, price:1205, image:'images/items/neck/cravat_green.png?1', image_mini:'images/items/neck/cravat_green.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:8, health:8, reflex:9}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[534] = {item_id:534, nshort:'cravat_blue', name:'Синий галстук', type:'neck', level:null, price:1205, image:'images/items/neck/cravat_blue.png?1', image_mini:'images/items/neck/cravat_blue.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:8, health:8, shot:9}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[535] = {item_id:535, nshort:'cravat_yellow', name:'Жёлтый галстук', type:'neck', level:null, price:1205, image:'images/items/neck/cravat_yellow.png?1', image_mini:'images/items/neck/cravat_yellow.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:7, health:8}, attributes:{charisma:2}}, set:{key:null, name:null}, shop:'shop'};\
items[536] = {item_id:536, nshort:'cravat_brown', name:'Коричневый галстук', type:'neck', level:null, price:1500, image:'images/items/neck/cravat_brown.png?1', image_mini:'images/items/neck/cravat_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:8, health:9, dodge:6}, attributes:{strength:1}}, set:{key:null, name:null}, shop:'shop'};\
items[537] = {item_id:537, nshort:'cravat_black', name:'Чёрный галстук', type:'neck', level:null, price:1500, image:'images/items/neck/cravat_black.png?1', image_mini:'images/items/neck/cravat_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:9, health:8, finger_dexterity:6}, attributes:{charisma:1}}, set:{key:'set_gentleman', name:'Джентльменский набор'}, shop:'shop'};\
items[538] = {item_id:538, nshort:'cravat_fine', name:'Знатный галстук', type:'neck', level:null, price:4400, image:'images/items/neck/cravat_fine.png?1', image_mini:'images/items/neck/cravat_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:10, health:10, swim:8, pitfall:7}, attributes:{strength:1, charisma:1}}, set:{key:null, name:null}, shop:'shop'};\
items[539] = {item_id:539, nshort:'bullet_metal', name:'Свинцовая пуля', type:'neck', level:null, price:1800, image:'images/items/neck/bullet_metal.png?1', image_mini:'images/items/neck/bullet_metal.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{strength:2, flexibility:2, dexterity:1, charisma:1}}, set:{key:null, name:null}, shop:'shop'};\
items[540] = {item_id:540, nshort:'bullet_silver', name:'Серебряная пуля', type:'neck', level:null, price:3350, image:'images/items/neck/bullet_silver.png?1', image_mini:'images/items/neck/bullet_silver.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{strength:2, flexibility:2, dexterity:2, charisma:2}}, set:{key:null, name:null}, shop:'shop'};\
items[541] = {item_id:541, nshort:'bullet_gold', name:'Золотая пуля', type:'neck', level:null, price:6750, image:'images/items/neck/bullet_gold.png?1', image_mini:'images/items/neck/bullet_gold.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{strength:3, flexibility:3, dexterity:3, charisma:2}}, set:{key:null, name:null}, shop:'shop'};\
items[542] = {item_id:542, nshort:'kerchief_grey', name:'Серый платок', type:'neck', level:null, price:2500, image:'images/items/neck/kerchief_grey.png?1', image_mini:'images/items/neck/kerchief_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{finger_dexterity:13, appearance:12}, attributes:{dexterity:1, charisma:1}}, set:{key:null, name:null}, shop:'shop'};\
items[543] = {item_id:543, nshort:'kerchief_red', name:'Красный платок', type:'neck', level:null, price:3400, image:'images/items/neck/kerchief_red.png?1', image_mini:'images/items/neck/kerchief_red.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{finger_dexterity:13, appearance:13, build:14}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[544] = {item_id:544, nshort:'kerchief_green', name:'Зелёный платок', type:'neck', level:null, price:3400, image:'images/items/neck/kerchief_green.png?1', image_mini:'images/items/neck/kerchief_green.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{finger_dexterity:13, appearance:13, ride:14}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[545] = {item_id:545, nshort:'kerchief_blue', name:'Синий платок', type:'neck', level:null, price:3400, image:'images/items/neck/kerchief_blue.png?1', image_mini:'images/items/neck/kerchief_blue.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{finger_dexterity:12, appearance:13}, attributes:{dexterity:3}}, set:{key:null, name:null}, shop:'shop'};\
items[546] = {item_id:546, nshort:'kerchief_yellow', name:'Жёлтый платок', type:'neck', level:null, price:3400, image:'images/items/neck/kerchief_yellow.png?1', image_mini:'images/items/neck/kerchief_yellow.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{finger_dexterity:13, appearance:12}, attributes:{charisma:3}}, set:{key:null, name:null}, shop:'shop'};\
items[547] = {item_id:547, nshort:'kerchief_brown', name:'Коричневый платок', type:'neck', level:null, price:4360, image:'images/items/neck/kerchief_brown.png?1', image_mini:'images/items/neck/kerchief_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{finger_dexterity:13, appearance:13, punch:10, hide:9}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[548] = {item_id:548, nshort:'kerchief_black', name:'Чёрный платок', type:'neck', level:null, price:4360, image:'images/items/neck/kerchief_black.png?1', image_mini:'images/items/neck/kerchief_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{finger_dexterity:13, appearance:12}, attributes:{dexterity:2, charisma:2}}, set:{key:null, name:null}, shop:'shop'};\
items[549] = {item_id:549, nshort:'bullchain_metal', name:'Железный бизон', type:'neck', level:null, price:2400, image:'images/items/neck/bullchain_metal.png?1', image_mini:'images/items/neck/bullchain_metal.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{strength:2, flexibility:2, dexterity:2, charisma:1}}, set:{key:null, name:null}, shop:'shop'};\
items[550] = {item_id:550, nshort:'bullchain_silver', name:'Серебряный бизон', type:'neck', level:null, price:4490, image:'images/items/neck/bullchain_silver.png?1', image_mini:'images/items/neck/bullchain_silver.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{strength:2, flexibility:2, dexterity:2, charisma:3}}, set:{key:null, name:null}, shop:'shop'};\
items[551] = {item_id:551, nshort:'bullchain_gold', name:'Золотой бизон', type:'neck', level:null, price:8300, image:'images/items/neck/bullchain_gold.png?1', image_mini:'images/items/neck/bullchain_gold.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{strength:3, flexibility:3, dexterity:3, charisma:3}}, set:{key:null, name:null}, shop:'shop'};\
items[552] = {item_id:552, nshort:'talisman', name:'Талисман', type:'neck', level:null, price:1000, image:'images/items/neck/talisman.png?1', image_mini:'images/items/neck/talisman.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'unk'};\
items[553] = {item_id:553, nshort:'stonechain', name:'Каменный медальон', type:'neck', level:null, price:1000, image:'images/items/neck/stonechain.png?1', image_mini:'images/items/neck/stonechain.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[554] = {item_id:554, nshort:'southcross', name:'Медаль за мужество', type:'neck', level:null, price:650, image:'images/items/neck/southcross.png?1', image_mini:'images/items/neck/southcross.png?1', characterClass:'soldier', characterSex:null, speed:null, bonus:{skills:{tactic:8, appearance:7, ride:4}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[555] = {item_id:555, nshort:'aztecchains', name:'Ожерелье ацтеков', type:'neck', level:null, price:1200, image:'images/items/neck/aztecchains.png?1', image_mini:'images/items/neck/aztecchains.png?1', characterClass:'adventurer', characterSex:null, speed:null, bonus:{skills:{hide:9, ride:10, tough:8}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[556] = {item_id:556, nshort:'arrowhead', name:'Наконечник стрелы', type:'neck', level:null, price:1150, image:'images/items/neck/arrowhead.png?1', image_mini:'images/items/neck/arrowhead.png?1', characterClass:'duelist', characterSex:null, speed:null, bonus:{skills:{shot:7, aim:7}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[557] = {item_id:557, nshort:'bone_necklace', name:'Костяное ожерелье', type:'neck', level:null, price:1700, image:'images/items/neck/bone_necklace.png?1', image_mini:'images/items/neck/bone_necklace.png?1', characterClass:'worker', characterSex:null, speed:null, bonus:{skills:{appearance:3}, attributes:{strength:5}}, set:{key:null, name:null}, shop:'quest'};\
\
\
items[561] = {item_id:561, nshort:'mexican_neck', name:'Мексиканский шарф', type:'neck', level:28, price:600, image:'images/items/neck/mexican_neck.png?1', image_mini:'images/items/neck/mexican_neck.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{punch:17}, attributes:{}}, set:{key:'set_mexican', name:'Набор мексиканца'}, shop:'shop'};\
\
\
items[566] = {item_id:566, nshort:'dancer_chain', name:'Жемчужное ожерелье', type:'neck', level:43, price:1800, image:'images/items/neck/dancer_chain.png?1', image_mini:'images/items/neck/dancer_chain.png?1', characterClass:null, characterSex:'female', speed:null, bonus:{skills:{trade:9, leadership:8, pitfall:6}, attributes:{charisma:1}}, set:{key:'set_dancer', name:'Туалет танцовщицы'}, shop:'drop'};\
items[567] = {item_id:567, nshort:'amulett', name:'Сердечный амулет', type:'neck', level:30, price:2412, image:'images/items/neck/amulett.png?1', image_mini:'images/items/neck/amulett.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:15, animal:15, trade:15, leadership:15}, attributes:{}}, set:{key:'season_set', name:'Праздничный наряд'}, shop:'quest'};\
items[568] = {item_id:568, nshort:'teethchain', name:'Талисман от вурдалака', type:'neck', level:40, price:2012, image:'images/items/neck/teethchain.png?1', image_mini:'images/items/neck/teethchain.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:4, leadership:8, hide:4}, attributes:{charisma:3}}, set:{key:null, name:null}, shop:'quest'};\
items[569] = {item_id:569, nshort:'greenhorn_neck', name:'Платок от пыли', type:'neck', level:1, price:350, image:'images/items/neck/greenhorn_neck.png?1', image_mini:'images/items/neck/greenhorn_neck.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{hide:1, endurance:2}, attributes:{}}, set:{key:'greenhorn_set', name:'Набор начинающего'}, shop:'quest'};\
items[570] = {item_id:570, nshort:'xmas_schal', name:'Тёплый шарф', type:'neck', level:1, price:2010, image:'images/items/neck/xmas_schal.png?1', image_mini:'images/items/neck/xmas_schal.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{charisma:1}}, set:{key:null, name:null}, shop:'drop'};\
\
\
items[600] = {item_id:600, nshort:'donkey', name:'Осёл', type:'animal', level:1, price:250, image:'images/items/animal/donkey.png?1', image_mini:'images/items/animal/mini/donkey.png?1', characterClass:null, characterSex:null, speed:0.8, bonus:{skills:{}, attributes:{}}, set:{key:'set_mexican', name:'Набор мексиканца'}, shop:'shop'};\
items[601] = {item_id:601, nshort:'pony', name:'Пони', type:'animal', level:1, price:500, image:'images/items/animal/pony.png?1', image_mini:'images/items/animal/mini/pony.png?1', characterClass:null, characterSex:null, speed:0.666, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[602] = {item_id:602, nshort:'mustang', name:'Мустанг', type:'animal', level:1, price:850, image:'images/items/animal/mustang.png?1', image_mini:'images/items/animal/mini/mustang.png?1', characterClass:null, characterSex:null, speed:0.571, bonus:{skills:{}, attributes:{}}, set:{key:'set_indian', name:'Индейский набор'}, shop:'shop'};\
items[603] = {item_id:603, nshort:'berber', name:'Рысак', type:'animal', level:1, price:1250, image:'images/items/animal/berber.png?1', image_mini:'images/items/animal/mini/berber.png?1', characterClass:null, characterSex:null, speed:0.5, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[604] = {item_id:604, nshort:'araber', name:'Арабский скакун', type:'animal', level:1, price:2000, image:'images/items/animal/araber.png?1', image_mini:'images/items/animal/mini/araber.png?1', characterClass:null, characterSex:null, speed:0.444, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[605] = {item_id:605, nshort:'quarter', name:'Кватерхорс', type:'animal', level:1, price:2800, image:'images/items/animal/quarter.png?1', image_mini:'images/items/animal/mini/quarter.png?1', characterClass:null, characterSex:null, speed:0.4, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[606] = {item_id:606, nshort:'charriot', name:'Тележка', type:'animal', level:1, price:1500, image:'images/items/animal/charriot.png?1', image_mini:'images/items/animal/mini/charriot.png?1', characterClass:null, characterSex:null, speed:0.909, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[607] = {item_id:607, nshort:'young_stallion', name:'Жеребёнок', type:'animal', level:1, price:250, image:'images/items/animal/young_stallion.png?1', image_mini:'images/items/animal/mini/young_stallion.png?1', characterClass:null, characterSex:null, speed:0.8, bonus:{skills:{}, attributes:{}}, set:{key:'greenhorn_set', name:'Набор начинающего'}, shop:'quest'};\
\
items[609] = {item_id:609, nshort:'xmas_slide', name:'Рождественские сани', type:'animal', level:1, price:550, image:'images/items/animal/xmas_slide.png?1', image_mini:'images/items/animal/mini/xmas_slide.png?1', characterClass:null, characterSex:null, speed:0.8, bonus:{skills:{}, attributes:{}}, set:{key:'season_set', name:'Праздничный наряд'}, shop:'quest'};\
\
\
items[700] = {item_id:700, nshort:'ham', name:'Свинина', type:'yield', level:null, price:10, image:'images/items/yield/ham.png?1', image_mini:'images/items/yield/ham.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[701] = {item_id:701, nshort:'cereals', name:'Зерно', type:'yield', level:null, price:3, image:'images/items/yield/cereals.png?1', image_mini:'images/items/yield/cereals.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[702] = {item_id:702, nshort:'tabacco', name:'Табак', type:'yield', level:null, price:5, image:'images/items/yield/tabacco.png?1', image_mini:'images/items/yield/tabacco.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[703] = {item_id:703, nshort:'sugar', name:'Сахар', type:'yield', level:null, price:8, image:'images/items/yield/sugar.png?1', image_mini:'images/items/yield/sugar.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[704] = {item_id:704, nshort:'cotton', name:'Хлопок', type:'yield', level:null, price:6, image:'images/items/yield/cotton.png?1', image_mini:'images/items/yield/cotton.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[705] = {item_id:705, nshort:'trout', name:'Форель', type:'yield', level:null, price:4, image:'images/items/yield/trout.png?1', image_mini:'images/items/yield/trout.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[706] = {item_id:706, nshort:'berrys', name:'Ягоды', type:'yield', level:null, price:4, image:'images/items/yield/berrys.png?1', image_mini:'images/items/yield/berrys.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[707] = {item_id:707, nshort:'shearings', name:'Шерсть', type:'yield', level:null, price:8, image:'images/items/yield/shearings.png?1', image_mini:'images/items/yield/shearings.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[708] = {item_id:708, nshort:'copper_pyrites', name:'Пирит', type:'yield', level:null, price:16, image:'images/items/yield/copper_pyrites.png?1', image_mini:'images/items/yield/copper_pyrites.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[709] = {item_id:709, nshort:'turkey', name:'Индейка', type:'yield', level:null, price:14, image:'images/items/yield/turkey.png?1', image_mini:'images/items/yield/turkey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[710] = {item_id:710, nshort:'beef', name:'Говяжий бифштекс', type:'yield', level:null, price:24, image:'images/items/yield/beef.png?1', image_mini:'images/items/yield/beef.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[711] = {item_id:711, nshort:'planks', name:'Дерево', type:'yield', level:null, price:16, image:'images/items/yield/planks.png?1', image_mini:'images/items/yield/planks.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[712] = {item_id:712, nshort:'leather', name:'Кожа', type:'yield', level:null, price:16, image:'images/items/yield/leather.png?1', image_mini:'images/items/yield/leather.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
\
items[714] = {item_id:714, nshort:'beaver', name:'Бобровый мех', type:'yield', level:null, price:36, image:'images/items/yield/beaver.png?1', image_mini:'images/items/yield/beaver.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[715] = {item_id:715, nshort:'fabric', name:'Рулон сукна', type:'yield', level:null, price:22, image:'images/items/yield/fabric.png?1', image_mini:'images/items/yield/fabric.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[716] = {item_id:716, nshort:'stone', name:'Камни', type:'yield', level:null, price:10, image:'images/items/yield/stone.png?1', image_mini:'images/items/yield/stone.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[717] = {item_id:717, nshort:'grund', name:'Лосось', type:'yield', level:null, price:14, image:'images/items/yield/grund.png?1', image_mini:'images/items/yield/grund.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[718] = {item_id:718, nshort:'coyote', name:'Зуб койота', type:'yield', level:null, price:42, image:'images/items/yield/coyote.png?1', image_mini:'images/items/yield/coyote.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[719] = {item_id:719, nshort:'cigar', name:'Сигары', type:'yield', level:null, price:24, image:'images/items/yield/cigar.png?1', image_mini:'images/items/yield/cigar.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[720] = {item_id:720, nshort:'gems', name:'Полудрагоценные камни', type:'yield', level:null, price:70, image:'images/items/yield/gems.png?1', image_mini:'images/items/yield/gems.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[721] = {item_id:721, nshort:'coal', name:'Уголь', type:'yield', level:null, price:20, image:'images/items/yield/coal.png?1', image_mini:'images/items/yield/coal.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[722] = {item_id:722, nshort:'meal', name:'Горячая закуска', type:'yield', level:null, price:14, image:'images/items/yield/meal.png?1', image_mini:'images/items/yield/meal.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[723] = {item_id:723, nshort:'ring', name:'Кольцо', type:'yield', level:null, price:160, image:'images/items/yield/ring.png?1', image_mini:'images/items/yield/ring.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:'set_pilgrim_female', name:'Монашеский скарб'}, shop:'drop'};\
items[724] = {item_id:724, nshort:'buffalo', name:'Шкура бизона', type:'yield', level:null, price:40, image:'images/items/yield/buffalo.png?1', image_mini:'images/items/yield/buffalo.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[725] = {item_id:725, nshort:'silver', name:'Серебро', type:'yield', level:null, price:200, image:'images/items/yield/silver.png?1', image_mini:'images/items/yield/silver.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[726] = {item_id:726, nshort:'indiangold', name:'Золото ацтеков', type:'yield', level:null, price:290, image:'images/items/yield/indiangold.png?1', image_mini:'images/items/yield/indiangold.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[727] = {item_id:727, nshort:'medal', name:'Медаль за отвагу', type:'yield', level:null, price:500, image:'images/items/yield/medal.png?1', image_mini:'images/items/yield/medal.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[728] = {item_id:728, nshort:'watch', name:'Карманные часы', type:'yield', level:null, price:210, image:'images/items/yield/watch.png?1', image_mini:'images/items/yield/watch.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[729] = {item_id:729, nshort:'stolen_goods', name:'Контрабандный товар', type:'yield', level:null, price:110, image:'images/items/yield/stolen_goods.png?1', image_mini:'images/items/yield/stolen_goods.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[730] = {item_id:730, nshort:'necklet', name:'Украшения', type:'yield', level:null, price:230, image:'images/items/yield/necklet.png?1', image_mini:'images/items/yield/necklet.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[731] = {item_id:731, nshort:'grizzly', name:'Трофей', type:'yield', level:null, price:150, image:'images/items/yield/grizzly.png?1', image_mini:'images/items/yield/grizzly.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
\
items[733] = {item_id:733, nshort:'packet', name:'Пакет', type:'yield', level:null, price:32, image:'images/items/yield/packet.png?1', image_mini:'images/items/yield/packet.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[734] = {item_id:734, nshort:'slicer', name:'Рубанок', type:'yield', level:null, price:44, image:'images/items/yield/slicer.png?1', image_mini:'images/items/yield/slicer.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
\
items[736] = {item_id:736, nshort:'spade', name:'Лопата', type:'yield', level:null, price:40, image:'images/items/yield/spade.png?1', image_mini:'images/items/yield/spade.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[737] = {item_id:737, nshort:'dynamite', name:'Динамит', type:'yield', level:null, price:80, image:'images/items/yield/dynamite.png?1', image_mini:'images/items/yield/dynamite.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
\
items[739] = {item_id:739, nshort:'fence', name:'Колючая проволока', type:'yield', level:null, price:36, image:'images/items/yield/fence.png?1', image_mini:'images/items/yield/fence.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[740] = {item_id:740, nshort:'horn', name:'Коровий рог', type:'yield', level:null, price:78, image:'images/items/yield/horn.png?1', image_mini:'images/items/yield/horn.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[741] = {item_id:741, nshort:'pitcher', name:'Кувшин', type:'yield', level:null, price:24, image:'images/items/yield/pitcher.png?1', image_mini:'images/items/yield/pitcher.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[742] = {item_id:742, nshort:'saw', name:'Пила', type:'yield', level:null, price:40, image:'images/items/yield/saw.png?1', image_mini:'images/items/yield/saw.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[743] = {item_id:743, nshort:'poster', name:'Плакат', type:'yield', level:null, price:4, image:'images/items/yield/poster.png?1', image_mini:'images/items/yield/poster.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[744] = {item_id:744, nshort:'newspaper', name:'Газета', type:'yield', level:null, price:6, image:'images/items/yield/newspaper.png?1', image_mini:'images/items/yield/newspaper.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[745] = {item_id:745, nshort:'flour', name:'Мука', type:'yield', level:null, price:5, image:'images/items/yield/flour.png?1', image_mini:'images/items/yield/flour.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[746] = {item_id:746, nshort:'beans', name:'Фасоль', type:'yield', level:null, price:6, image:'images/items/yield/beans.png?1', image_mini:'images/items/yield/beans.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[747] = {item_id:747, nshort:'hammer', name:'Молоток', type:'yield', level:null, price:22, image:'images/items/yield/hammer.png?1', image_mini:'images/items/yield/hammer.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[748] = {item_id:748, nshort:'corn', name:'Кукуруза', type:'yield', level:null, price:4, image:'images/items/yield/corn.png?1', image_mini:'images/items/yield/corn.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[749] = {item_id:749, nshort:'rope', name:'Лассо', type:'yield', level:null, price:32, image:'images/items/yield/rope.png?1', image_mini:'images/items/yield/rope.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[750] = {item_id:750, nshort:'nippers', name:'Наручники', type:'yield', level:null, price:58, image:'images/items/yield/nippers.png?1', image_mini:'images/items/yield/nippers.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[751] = {item_id:751, nshort:'pipe', name:'Трубка мира', type:'yield', level:null, price:72, image:'images/items/yield/pipe.png?1', image_mini:'images/items/yield/pipe.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[752] = {item_id:752, nshort:'oil', name:'Нефть', type:'yield', level:null, price:76, image:'images/items/yield/oil.png?1', image_mini:'images/items/yield/oil.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[753] = {item_id:753, nshort:'pick', name:'Кирка', type:'yield', level:null, price:44, image:'images/items/yield/pick.png?1', image_mini:'images/items/yield/pick.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[754] = {item_id:754, nshort:'horseshoe', name:'Подкова', type:'yield', level:null, price:30, image:'images/items/yield/horseshoe.png?1', image_mini:'images/items/yield/horseshoe.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[755] = {item_id:755, nshort:'flag', name:'Флажок', type:'yield', level:null, price:32, image:'images/items/yield/flag.png?1', image_mini:'images/items/yield/flag.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[756] = {item_id:756, nshort:'toolbox', name:'Ящик с инструментами', type:'yield', level:null, price:110, image:'images/items/yield/toolbox.png?1', image_mini:'images/items/yield/toolbox.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[757] = {item_id:757, nshort:'feather', name:'Перо ворона', type:'yield', level:null, price:8, image:'images/items/yield/feather.png?1', image_mini:'images/items/yield/feather.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[758] = {item_id:758, nshort:'flag_north', name:'Союзный флаг', type:'yield', level:null, price:86, image:'images/items/yield/flag_north.png?1', image_mini:'images/items/yield/flag_north.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[759] = {item_id:759, nshort:'ticket', name:'Железнодорожный билет', type:'yield', level:null, price:34, image:'images/items/yield/ticket.png?1', image_mini:'images/items/yield/ticket.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[760] = {item_id:760, nshort:'map', name:'Карта', type:'yield', level:null, price:32, image:'images/items/yield/map.png?1', image_mini:'images/items/yield/map.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[761] = {item_id:761, nshort:'sledgehammer', name:'Кувалда', type:'yield', level:null, price:52, image:'images/items/yield/sledgehammer.png?1', image_mini:'images/items/yield/sledgehammer.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[762] = {item_id:762, nshort:'flag_south', name:'Флаг конфедерации', type:'yield', level:null, price:86, image:'images/items/yield/flag_south.png?1', image_mini:'images/items/yield/flag_south.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[763] = {item_id:763, nshort:'wolf', name:'Браслет из зубов', type:'yield', level:null, price:44, image:'images/items/yield/wolf.png?1', image_mini:'images/items/yield/wolf.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[764] = {item_id:764, nshort:'shackle', name:'Кандалы', type:'yield', level:null, price:62, image:'images/items/yield/shackle.png?1', image_mini:'images/items/yield/shackle.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[765] = {item_id:765, nshort:'sickle', name:'Серп', type:'yield', level:null, price:44, image:'images/items/yield/sickle.png?1', image_mini:'images/items/yield/sickle.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[766] = {item_id:766, nshort:'water', name:'Стакан воды', type:'yield', level:null, price:6, image:'images/items/yield/water.png?1', image_mini:'images/items/yield/water.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[767] = {item_id:767, nshort:'string', name:'Катушка проволоки', type:'yield', level:null, price:34, image:'images/items/yield/string.png?1', image_mini:'images/items/yield/string.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[768] = {item_id:768, nshort:'hymnal', name:'Псалтырь', type:'yield', level:null, price:48, image:'images/items/yield/hymnal.png?1', image_mini:'images/items/yield/hymnal.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:'set_pilgrim_male', name:'Скарб проповедника'}, shop:'drop'};\
items[769] = {item_id:769, nshort:'empty_bottle', name:'Пустая бутылка', type:'yield', level:null, price:2, image:'images/items/yield/empty_bottle.png?1', image_mini:'images/items/yield/empty_bottle.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[770] = {item_id:770, nshort:'beer', name:'Пиво', type:'yield', level:null, price:0, image:'images/items/yield/beer.png?1', image_mini:'images/items/yield/beer.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[771] = {item_id:771, nshort:'trap', name:'Капкан на бобра', type:'yield', level:null, price:50, image:'images/items/yield/trap.png?1', image_mini:'images/items/yield/trap.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[772] = {item_id:772, nshort:'falcon', name:'Золотой сокол', type:'yield', level:null, price:0, image:'images/items/yield/falcon.png?1', image_mini:'images/items/yield/falcon.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[773] = {item_id:773, nshort:'paper1', name:'Обрывок (I часть)', type:'yield', level:null, price:1400, image:'images/items/yield/paper1.png?1', image_mini:'images/items/yield/paper1.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[774] = {item_id:774, nshort:'paper2', name:'Обрывок (II часть)', type:'yield', level:null, price:590, image:'images/items/yield/paper2.png?1', image_mini:'images/items/yield/paper2.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[775] = {item_id:775, nshort:'paper3', name:'Обрывок (III часть)', type:'yield', level:null, price:590, image:'images/items/yield/paper3.png?1', image_mini:'images/items/yield/paper3.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[776] = {item_id:776, nshort:'kates_ring', name:'Кольцо Кейт', type:'yield', level:null, price:1000, image:'images/items/yield/kates_ring.png?1', image_mini:'images/items/yield/kates_ring.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
\
items[778] = {item_id:778, nshort:'cooking_pot', name:'Кастрюля', type:'yield', level:null, price:22, image:'images/items/yield/cooking_pot.png?1', image_mini:'images/items/yield/cooking_pot.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[779] = {item_id:779, nshort:'post_horn', name:'Почтовый рожок', type:'yield', level:null, price:60, image:'images/items/yield/post_horn.png?1', image_mini:'images/items/yield/post_horn.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[780] = {item_id:780, nshort:'rounds', name:'Патроны', type:'yield', level:null, price:50, image:'images/items/yield/rounds.png?1', image_mini:'images/items/yield/rounds.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[781] = {item_id:781, nshort:'documents', name:'Документы', type:'yield', level:null, price:120, image:'images/items/yield/documents.png?1', image_mini:'images/items/yield/documents.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[782] = {item_id:782, nshort:'angle', name:'Удочка', type:'yield', level:null, price:42, image:'images/items/yield/angle.png?1', image_mini:'images/items/yield/angle.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[783] = {item_id:783, nshort:'gold_sculpture', name:'Золотая статуэтка', type:'yield', level:null, price:144, image:'images/items/yield/gold_sculpture.png?1', image_mini:'images/items/yield/gold_sculpture.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[784] = {item_id:784, nshort:'nails', name:'Гвозди', type:'yield', level:null, price:8, image:'images/items/yield/nails.png?1', image_mini:'images/items/yield/nails.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
\
items[786] = {item_id:786, nshort:'picture', name:'Картина', type:'yield', level:null, price:340, image:'images/items/yield/picture.png?1', image_mini:'images/items/yield/picture.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[787] = {item_id:787, nshort:'saddle', name:'Седло', type:'yield', level:null, price:80, image:'images/items/yield/saddle.png?1', image_mini:'images/items/yield/saddle.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[788] = {item_id:788, nshort:'bell', name:'Корабельный колокол', type:'yield', level:null, price:130, image:'images/items/yield/bell.png?1', image_mini:'images/items/yield/bell.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[789] = {item_id:789, nshort:'coin', name:'Монета', type:'yield', level:null, price:2, image:'images/items/yield/coin.png?1', image_mini:'images/items/yield/coin.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[790] = {item_id:790, nshort:'iron', name:'Железо', type:'yield', level:null, price:36, image:'images/items/yield/iron.png?1', image_mini:'images/items/yield/iron.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[791] = {item_id:791, nshort:'orange', name:'Апельсины', type:'yield', level:null, price:8, image:'images/items/yield/orange.png?1', image_mini:'images/items/yield/orange.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[792] = {item_id:792, nshort:'tequila', name:'Текила', type:'yield', level:null, price:24, image:'images/items/yield/tequila.png?1', image_mini:'images/items/yield/tequila.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:'set_mexican', name:'Набор мексиканца'}, shop:'drop'};\
items[793] = {item_id:793, nshort:'tomato', name:'Помидор', type:'yield', level:null, price:6, image:'images/items/yield/tomato.png?1', image_mini:'images/items/yield/tomato.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[794] = {item_id:794, nshort:'potion', name:'Эликсир', type:'yield', level:null, price:360, image:'images/items/yield/potion.png?1', image_mini:'images/items/yield/potion.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:'set_quackery', name:'Знахарская утварь'}, shop:'drop'};\
items[795] = {item_id:795, nshort:'peg', name:'Колышек', type:'yield', level:null, price:15, image:'images/items/yield/peg.png?1', image_mini:'images/items/yield/peg.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[796] = {item_id:796, nshort:'brush_shoe', name:'Обувная щётка', type:'yield', level:null, price:14, image:'images/items/yield/brush_shoe.png?1', image_mini:'images/items/yield/brush_shoe.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[797] = {item_id:797, nshort:'pitchfork', name:'Вилы', type:'yield', level:null, price:32, image:'images/items/yield/pitchfork.png?1', image_mini:'images/items/yield/pitchfork.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:'set_farmer', name:'Набор фермера'}, shop:'drop'};\
\
\
items[800] = {item_id:800, nshort:'stone_pebble', name:'Галька', type:'right_arm', level:2, price:15, image:'images/items/right_arm/stone_pebble.png?1', image_mini:'images/items/right_arm/mini/stone_pebble.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[801] = {item_id:801, nshort:'stone_flint', name:'Кремень', type:'right_arm', level:5, price:26, image:'images/items/right_arm/stone_flint.png?1', image_mini:'images/items/right_arm/mini/stone_flint.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[802] = {item_id:802, nshort:'stone_granite', name:'Гранит', type:'right_arm', level:8, price:46, image:'images/items/right_arm/stone_granite.png?1', image_mini:'images/items/right_arm/mini/stone_granite.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[803] = {item_id:803, nshort:'crutch_rusty', name:'Потрёпанная рогатка', type:'right_arm', level:7, price:26, image:'images/items/right_arm/crutch_rusty.png?1', image_mini:'images/items/right_arm/mini/crutch_rusty.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[804] = {item_id:804, nshort:'crutch', name:'Рогатка', type:'right_arm', level:10, price:63, image:'images/items/right_arm/crutch.png?1', image_mini:'images/items/right_arm/mini/crutch.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[805] = {item_id:805, nshort:'crutch_accurate', name:'Точная рогатка', type:'right_arm', level:13, price:148, image:'images/items/right_arm/crutch_accurate.png?1', image_mini:'images/items/right_arm/mini/crutch_accurate.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[806] = {item_id:806, nshort:'crutch_huckeberry', name:'Рогатка Гека Финна', type:'right_arm', level:20, price:1360, image:'images/items/right_arm/crutch_huckeberry.png?1', image_mini:'images/items/right_arm/mini/crutch_huckeberry.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{swim:3, ride:3}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[807] = {item_id:807, nshort:'leadshot_rusty', name:'Ржавый кремнёвый пистолет', type:'right_arm', level:17, price:124, image:'images/items/right_arm/leadshot_rusty.png?1', image_mini:'images/items/right_arm/mini/leadshot_rusty.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[808] = {item_id:808, nshort:'leadshot', name:'Кремнёвый пистолет', type:'right_arm', level:20, price:384, image:'images/items/right_arm/leadshot.png?1', image_mini:'images/items/right_arm/mini/leadshot.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tough:1}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[809] = {item_id:809, nshort:'leadshot_accurate', name:'Точный кремнёвый пистолет', type:'right_arm', level:23, price:550, image:'images/items/right_arm/leadshot_accurate.png?1', image_mini:'images/items/right_arm/mini/leadshot_accurate.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tough:1}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[810] = {item_id:810, nshort:'leadshot_granmonts', name:'Пистолет Гранмонта', type:'right_arm', level:30, price:2680, image:'images/items/right_arm/leadshot_granmonts.png?1', image_mini:'images/items/right_arm/mini/leadshot_granmonts.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{finger_dexterity:4, tough:3}, attributes:{}}, set:{key:null, name:null}, drop:'drop'};\
items[811] = {item_id:811, nshort:'muzzleloader_rusty', name:'Ржавое дульнозарядное ружьё', type:'right_arm', level:22, price:326, image:'images/items/right_arm/muzzleloader_rusty.png?1', image_mini:'images/items/right_arm/mini/muzzleloader_rusty.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{aim:1}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[812] = {item_id:812, nshort:'muzzleloader', name:'Дульнозарядное ружьё', type:'right_arm', level:25, price:545, image:'images/items/right_arm/muzzleloader.png?1', image_mini:'images/items/right_arm/mini/muzzleloader.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{aim:1}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[813] = {item_id:813, nshort:'muzzleloader_accurate', name:'Точное дульнозарядное ружьё', type:'right_arm', level:28, price:940, image:'images/items/right_arm/muzzleloader_accurate.png?1', image_mini:'images/items/right_arm/mini/muzzleloader_accurate.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{aim:2}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[814] = {item_id:814, nshort:'muzzleloader_drake', name:'Дульнозарядное ружьё Дрейка', type:'right_arm', level:35, price:3580, image:'images/items/right_arm/muzzleloader_drake.png?1', image_mini:'images/items/right_arm/mini/muzzleloader_drake.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{aim:4, swim:4}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[815] = {item_id:815, nshort:'deringer_rusty', name:'Ржавый дерринджер', type:'right_arm', level:32, price:730, image:'images/items/right_arm/deringer_rusty.png?1', image_mini:'images/items/right_arm/mini/deringer_rusty.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{reflex:2}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[816] = {item_id:816, nshort:'deringer', name:'Дерринджер', type:'right_arm', level:35, price:1280, image:'images/items/right_arm/deringer.png?1', image_mini:'images/items/right_arm/mini/deringer.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{reflex:2}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[817] = {item_id:817, nshort:'deringer_accurate', name:'Точный дерринджер', type:'right_arm', level:38, price:1655, image:'images/items/right_arm/deringer_accurate.png?1', image_mini:'images/items/right_arm/mini/deringer_accurate.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{reflex:3}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[818] = {item_id:818, nshort:'deringer_bellestar', name:'Дерринджер Белль Старр', type:'right_arm', level:45, price:5500, image:'images/items/right_arm/deringer_bellestar.png?1', image_mini:'images/items/right_arm/mini/deringer_bellestar.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{hide:4, reflex:5}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[819] = {item_id:819, nshort:'pepperbox_rusty', name:'Ржавый многоствольный револьвер', type:'right_arm', level:37, price:940, image:'images/items/right_arm/pepperbox_rusty.png?1', image_mini:'images/items/right_arm/mini/pepperbox_rusty.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{dodge:2}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[820] = {item_id:820, nshort:'pepperbox', name:'Многоствольный револьвер', type:'right_arm', level:40, price:1440, image:'images/items/right_arm/pepperbox.png?1', image_mini:'images/items/right_arm/mini/pepperbox.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{dodge:2}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[821] = {item_id:821, nshort:'pepperbox_accurate', name:'Точный многоствольный револьвер', type:'right_arm', level:43, price:2150, image:'images/items/right_arm/pepperbox_accurate.png?1', image_mini:'images/items/right_arm/mini/pepperbox_accurate.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{dodge:3}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[822] = {item_id:822, nshort:'pepperbox_allen', name:'Многоствольный револьвер Аллена', type:'right_arm', level:50, price:6850, image:'images/items/right_arm/pepperbox_allen.png?1', image_mini:'images/items/right_arm/mini/pepperbox_allen.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:6, aim:5}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[823] = {item_id:823, nshort:'smith_rusty', name:'Ржавый Смит-Вессон №1', type:'right_arm', level:47, price:1650, image:'images/items/right_arm/smith_rusty.png?1', image_mini:'images/items/right_arm/mini/smith_rusty.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{shot:3}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[824] = {item_id:824, nshort:'smith', name:'Смит-Вессон №1', type:'right_arm', level:50, price:2350, image:'images/items/right_arm/smith.png?1', image_mini:'images/items/right_arm/mini/smith.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{shot:3}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[825] = {item_id:825, nshort:'smith_accurate', name:'Точный Смит-Вессон №1', type:'right_arm', level:53, price:3180, image:'images/items/right_arm/smith_accurate.png?1', image_mini:'images/items/right_arm/mini/smith_accurate.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{shot:4}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
\
items[827] = {item_id:827, nshort:'remington_rusty', name:'Ржавый армейский револьвер', type:'right_arm', level:52, price:2150, image:'images/items/right_arm/remington_rusty.png?1', image_mini:'images/items/right_arm/mini/remington_rusty.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tough:3}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[828] = {item_id:828, nshort:'remington', name:'Армейский револьвер', type:'right_arm', level:55, price:2950, image:'images/items/right_arm/remington.png?1', image_mini:'images/items/right_arm/mini/remington.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tough:4}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[829] = {item_id:829, nshort:'remington_accurate', name:'Точный армейский револьвер', type:'right_arm', level:58, price:3940, image:'images/items/right_arm/remington_accurate.png?1', image_mini:'images/items/right_arm/mini/remington_accurate.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tough:5}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[830] = {item_id:830, nshort:'remington_ike', name:'Армейский револьвер Айка', type:'right_arm', level:65, price:9400, image:'images/items/right_arm/remington_ike.png?1', image_mini:'images/items/right_arm/mini/remington_ike.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{endurance:7, tough:7}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[831] = {item_id:831, nshort:'peacemaker_rusty', name:'Ржавый кольт Миротворец', type:'right_arm', level:62, price:3380, image:'images/items/right_arm/peacemaker_rusty.png?1', image_mini:'images/items/right_arm/mini/peacemaker_rusty.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:4}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[832] = {item_id:832, nshort:'peacemaker', name:'Кольт Миротворец', type:'right_arm', level:65, price:4570, image:'images/items/right_arm/peacemaker.png?1', image_mini:'images/items/right_arm/mini/peacemaker.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:5}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[833] = {item_id:833, nshort:'peacemaker_accurate', name:'Точный кольт Миротворец', type:'right_arm', level:68, price:5400, image:'images/items/right_arm/peacemaker_accurate.png?1', image_mini:'images/items/right_arm/mini/peacemaker_accurate.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:6}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[834] = {item_id:834, nshort:'peacemaker_billy', name:'Кольт Миротворец Билли', type:'right_arm', level:75, price:10300, image:'images/items/right_arm/peacemaker_billy.png?1', image_mini:'images/items/right_arm/mini/peacemaker_billy.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:7, health:8}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[835] = {item_id:835, nshort:'schofield_rusty', name:'Ржавый Скофилд', type:'right_arm', level:67, price:4250, image:'images/items/right_arm/schofield_rusty.png?1', image_mini:'images/items/right_arm/mini/schofield_rusty.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:5}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[836] = {item_id:836, nshort:'schofield', name:'Скофилд', type:'right_arm', level:70, price:5230, image:'images/items/right_arm/schofield.png?1', image_mini:'images/items/right_arm/mini/schofield.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:6}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[837] = {item_id:837, nshort:'schofield_accurate', name:'Точный Скофилд', type:'right_arm', level:73, price:6400, image:'images/items/right_arm/schofield_accurate.png?1', image_mini:'images/items/right_arm/mini/schofield_accurate.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:7}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[838] = {item_id:838, nshort:'schofield_jessejames', name:'Скофилд Джесси Джеймса', type:'right_arm', level:80, price:10600, image:'images/items/right_arm/schofield_jessejames.png?1', image_mini:'images/items/right_arm/mini/schofield_jessejames.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{trade:8, tactic:8}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[839] = {item_id:839, nshort:'buntline_rusty', name:'Ржавый Бантлайн', type:'right_arm', level:72, price:5375, image:'images/items/right_arm/buntline_rusty.png?1', image_mini:'images/items/right_arm/mini/buntline_rusty.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{reflex:7}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[840] = {item_id:840, nshort:'buntline', name:'Бантлайн', type:'right_arm', level:75, price:6250, image:'images/items/right_arm/buntline.png?1', image_mini:'images/items/right_arm/mini/buntline.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{reflex:7}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[841] = {item_id:841, nshort:'buntline_accurate', name:'Точный Бантлайн', type:'right_arm', level:78, price:7250, image:'images/items/right_arm/buntline_accurate.png?1', image_mini:'images/items/right_arm/mini/buntline_accurate.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{reflex:7}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[842] = {item_id:842, nshort:'buntline_wyattearp', name:'Бантлайн Уайатта Эрпа', type:'right_arm', level:85, price:11200, image:'images/items/right_arm/buntline_wyattearp.png?1', image_mini:'images/items/right_arm/mini/buntline_wyattearp.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:7, aim:4, reflex:4, health:4}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[843] = {item_id:843, nshort:'boomerang', name:'Бумеранг', type:'right_arm', level:8, price:126, image:'images/items/right_arm/boomerang.png?1', image_mini:'images/items/right_arm/mini/boomerang.png?1', characterClass:'duelist', characterSex:null, speed:null, bonus:{skills:{reflex:1}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[844] = {item_id:844, nshort:'throwing_knives', name:'Метательные ножи', type:'right_arm', level:33, price:1152, image:'images/items/right_arm/throwing_knives.png?1', image_mini:'images/items/right_arm/mini/throwing_knives.png?1', characterClass:'duelist', characterSex:null, speed:null, bonus:{skills:{hide:3}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[845] = {item_id:845, nshort:'sawed_off', name:'Обрез', type:'right_arm', level:51, price:2940, image:'images/items/right_arm/sawed_off.png?1', image_mini:'images/items/right_arm/mini/sawed_off.png?1', characterClass:'duelist', characterSex:null, speed:null, bonus:{skills:{appearance:3, shot:2}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[846] = {item_id:846, nshort:'trompet', name:'Труба', type:'right_arm', level:20, price:1200, image:'images/items/right_arm/trompet.png?1', image_mini:'images/items/right_arm/mini/trompet.png?1', characterClass:'soldier', characterSex:null, speed:null, bonus:{skills:{}, attributes:{charisma:6}}, set:{key:null, name:null}, shop:'quest'};\
\
items[854] = {item_id:854, nshort:'elixier', name:'Кислота', type:'right_arm', level:42, price:1500, image:'images/items/right_arm/elixier.png?1', image_mini:'images/items/right_arm/mini/elixier.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:2}, attributes:{}}, set:{key:'set_quackery', name:'Знахарская утварь'}, shop:'shop'};\
items[856] = {item_id:856, nshort:'smells_like_eggspirit', name:'Тухлые яйца', type:'right_arm', level:45, price:2500, image:'images/items/right_arm/smells_like_eggspirit.png?1', image_mini:'images/items/right_arm/mini/smells_like_eggspirit.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:'season_set', name:'Праздничный наряд'}, shop:'quest'};\
\
items[858] = {item_id:858, nshort:'golden_gun', name:'Золотой кольт', type:'right_arm', level:70, price:22500, image:'images/items/right_arm/golden_gun.png?1', image_mini:'images/items/right_arm/mini/golden_gun.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{shot:8, aim:4}, attributes:{}}, set:{key:'gold_set', name:'Золотой набор'}, shop:'quest'};\
items[859] = {item_id:859, nshort:'greenhorn_gun', name:'Детская праща', type:'right_arm', level:6, price:550, image:'images/items/right_arm/greenhorn_gun.png?1', image_mini:'images/items/right_arm/mini/greenhorn_gun.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{shot:1}, attributes:{}}, set:{key:'greenhorn_set', name:'Набор начинающего'}, shop:'quest'};\
\
items[1364] = {item_id:1364, nshort:'uniform_perfect', name:'Форма', type:'body', level:20, price:800, image:'images/items/body/uniform_perfect.png?1', image_mini:'images/items/body/mini/uniform_perfect.png?1', characterClass:'soldier', characterSex:null, speed:null, bonus:{skills:{appearance:3, hide:4}, attributes:{charisma:2}}, set:{key:null, name:null}, shop:'quest'};\
\
\
items[1701] = {item_id:1701, nshort:'arrow', name:'Стрелы', type:'yield', level:null, price:5, image:'images/items/yield/arrow.png?1', image_mini:'images/items/yield/arrow.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[1702] = {item_id:1702, nshort:'compass', name:'Компас', type:'yield', level:null, price:380, image:'images/items/yield/compass.png?1', image_mini:'images/items/yield/compass.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{ride:3}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[1703] = {item_id:1703, nshort:'lamp', name:'Лампа', type:'yield', level:null, price:80, image:'images/items/yield/lamp.png?1', image_mini:'images/items/yield/lamp.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
\
items[1706] = {item_id:1706, nshort:'letter', name:'Письмо', type:'yield', level:null, price:1, image:'images/items/yield/letter.png?1', image_mini:'images/items/yield/letter.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
\
items[1708] = {item_id:1708, nshort:'whiskey', name:'Виски', type:'yield', level:null, price:10, image:'images/items/yield/whiskey.png?1', image_mini:'images/items/yield/whiskey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[1709] = {item_id:1709, nshort:'gold', name:'Сокровища индейцев', type:'yield', level:null, price:26000, image:'images/items/yield/gold.png?1', image_mini:'images/items/yield/gold.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[1710] = {item_id:1710, nshort:'key1', name:'Первый ключ', type:'yield', level:null, price:42, image:'images/items/yield/key1.png?1', image_mini:'images/items/yield/key1.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[1711] = {item_id:1711, nshort:'key2', name:'Второй ключ', type:'yield', level:null, price:46, image:'images/items/yield/key2.png?1', image_mini:'images/items/yield/key2.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[1712] = {item_id:1712, nshort:'key3', name:'Третий ключ', type:'yield', level:null, price:7500, image:'images/items/yield/key3.png?1', image_mini:'images/items/yield/key3.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
\
items[1715] = {item_id:1715, nshort:'cane', name:'Трость', type:'yield', level:42, price:2800, image:'images/items/yield/cane.png?1', image_mini:'images/items/yield/cane.png?1', characterClass:null, characterSex:'male', speed:null, bonus:{skills:{}, attributes:{charisma:2}}, set:{key:'set_gentleman', name:'Джентльменский набор'}, shop:'quest'};\
items[1716] = {item_id:1716, nshort:'letter', name:'Личное письмо', type:'yield', level:null, price:2, image:'images/items/yield/letter.png?1', image_mini:'images/items/yield/letter.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[1717] = {item_id:1717, nshort:'chamber_pot', name:'Ночной горшок', type:'yield', level:null, price:750, image:'images/items/yield/chamber_pot.png?1', image_mini:'images/items/yield/chamber_pot.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:'set_sleeper', name:'Набор сони'}, shop:'drop'};\
\
items[1733] = {item_id:1733, nshort:'henrys_packet', name:'Посылка Генри', type:'yield', level:null, price:32, image:'images/items/yield/henrys_packet.png?1', image_mini:'images/items/yield/henrys_packet.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
\
items[1750] = {item_id:1750, nshort:'ponytail', name:'Коса',  type:'yield', level:null, price:66,  image:'images/items/yield/ponytail.png?1',  image_mini:'images/items/yield/ponytail.png?1', characterClass:null,  characterSex:null, speed:null, bonus:{skills:{}, attributes:{}},  set:{key:null, name:null}, shop:'quest'};\
items[1751] = {item_id:1751, nshort:'ruby', name:'Рубин', type:'yield', level:null, price:66, image:'images/items/yield/ruby.png?1', image_mini:'images/items/yield/ruby.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[1752] = {item_id:1752, nshort:'egg1', name:'Первое яйцо', type:'yield', level:null, price:4, image:'images/items/yield/egg1.png?1', image_mini:'images/items/yield/egg1.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[1753] = {item_id:1753, nshort:'egg2', name:'Второе яйцо', type:'yield', level:null, price:4, image:'images/items/yield/egg2.png?1', image_mini:'images/items/yield/egg2.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[1754] = {item_id:1754, nshort:'egg3', name:'Третье яйцо', type:'yield', level:null, price:4, image:'images/items/yield/egg3.png?1', image_mini:'images/items/yield/egg3.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[1755] = {item_id:1755, nshort:'bag', name:'Мешок с добычей', type:'yield', level:null, price:2000, image:'images/items/yield/bag.png?1', image_mini:'images/items/yield/bag.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[1756] = {item_id:1756, nshort:'mask', name:'Маска', type:'yield', level:null, price:200, image:'images/items/yield/mask.png?1', image_mini:'images/items/yield/mask.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[1757] = {item_id:1757, nshort:'dfprocket1', name:'Прототип', type:'yield', level:null, price:1, image:'images/items/yield/dfprocket1.png?1', image_mini:'images/items/yield/dfprocket1.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[1758] = {item_id:1758, nshort:'hgfrocket2', name:'Брак', type:'yield', level:null, price:1, image:'images/items/yield/hgfrocket2.png?1', image_mini:'images/items/yield/hgfrocket2.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[1759] = {item_id:1759, nshort:'dfgrocket1a', name:'Фейерверк', type:'yield', level:null, price:2700, image:'images/items/yield/dfgrocket1a.png?1', image_mini:'images/items/yield/dfgrocket1a.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{charisma:2, dexterity:2, flexibility:2, strength:2}}, set:{key:'season_set', name:'Праздничный наряд'}, shop:'drop'};\
items[1760] = {item_id:1760, nshort:'bucket', name:'Пустое ведро', type:'yield', level:null, price:20, image:'images/items/yield/bucket.png?1', image_mini:'images/items/yield/bucket.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[1761] = {item_id:1761, nshort:'bucket_full', name:'Полное ведро', type:'yield', level:null, price:21, image:'images/items/yield/bucket_full.png?1', image_mini:'images/items/yield/bucket_full.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[1762] = {item_id:1762, nshort:'bucket_fire', name:'Ведро', type:'yield', level:null, price:25, image:'images/items/yield/bucket_fire.png?1', image_mini:'images/items/yield/bucket_fire.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:'fireworker_set', name:'Набор пожарного'}, shop:'quest'};\
\
items[1766] = {item_id:1766, nshort:'mudball', name:'Ком грязи', type:'yield', level:null, price:1, image:'images/items/yield/mudball.png?1', image_mini:'images/items/yield/mudball.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[1767] = {item_id:1767, nshort:'muditem', name:'Нечто грязное', type:'yield', level:null, price:10, image:'images/items/yield/muditem.png?1', image_mini:'images/items/yield/muditem.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[1768] = {item_id:1768, nshort:'dustgun', name:'Пыльный револьвер', type:'yield', level:null, price:100, image:'images/items/yield/dustgun.png?1', image_mini:'images/items/yield/dustgun.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[1769] = {item_id:1769, nshort:'goldgun', name:'Золотой револьвер', type:'yield', level:null, price:100, image:'images/items/yield/goldgun.png?1', image_mini:'images/items/yield/goldgun.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[1770] = {item_id:1770, nshort:'bloodycloth', name:'Окровавленный лоскут', type:'yield', level:null, price:1, image:'images/items/yield/bloodycloth.png?1', image_mini:'images/items/yield/bloodycloth.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[1771] = {item_id:1771, nshort:'photo', name:'Старая фотография', type:'yield', level:null, price:1, image:'images/items/yield/photo.png?1', image_mini:'images/items/yield/photo.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[1772] = {item_id:1772, nshort:'umbrella', name:'Зонтик', type:'yield', level:42, price:2800, image:'images/items/yield/umbrella.png?1', image_mini:'images/items/yield/umbrella.png?1', characterClass:null, characterSex:'female', speed:null, bonus:{skills:{trade:8, finger_dexterity:6, endurance:10}, attributes:{strength:1}}, set:{key:'set_dancer', name:'Туалет танцовщицы'}, shop:'quest'};\
items[1773] = {item_id:1773, nshort:'testament', name:'Завещание', type:'yield', level:null, price:1, image:'images/items/yield/testament.png?1', image_mini:'images/items/yield/testament.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[1774] = {item_id:1774, nshort:'engagementring', name:'Кольцо', type:'yield', level:null, price:1, image:'images/items/yield/engagementring.png?1', image_mini:'images/items/yield/engagementring.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[1775] = {item_id:1775, nshort:'birthcertificate', name:'Свидетельство о рождении', type:'yield', level:null, price:1, image:'images/items/yield/birthcertificate.png?1', image_mini:'images/items/yield/birthcertificate.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[1776] = {item_id:1776, nshort:'darkplans', name:'Коварные планы', type:'yield', level:null, price:1, image:'images/items/yield/darkplans.png?1', image_mini:'images/items/yield/darkplans.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[1777] = {item_id:1777, nshort:'docreport', name:'Врачебное свидетельство', type:'yield', level:null, price:1, image:'images/items/yield/docreport.png?1', image_mini:'images/items/yield/docreport.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[1778] = {item_id:1778, nshort:'brandingiron', name:'Гнутое тавро', type:'yield', level:null, price:1, image:'images/items/yield/brandingiron.png?1', image_mini:'images/items/yield/brandingiron.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[1779] = {item_id:1779, nshort:'cardpiece1', name:'Первая часть карты', type:'yield', level:null, price:1, image:'images/items/yield/cardpiece1.png?1', image_mini:'images/items/yield/cardpiece1.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[1780] = {item_id:1780, nshort:'cardpiece2', name:'Вторая часть карты', type:'yield', level:null, price:1, image:'images/items/yield/cardpiece2.png?1', image_mini:'images/items/yield/cardpiece2.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[1781] = {item_id:1781, nshort:'cardpiece3', name:'Третья часть карты', type:'yield', level:null, price:1, image:'images/items/yield/cardpiece3.png?1', image_mini:'images/items/yield/cardpiece3.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[1782] = {item_id:1782, nshort:'cardpiece4', name:'Четвёртая часть карты', type:'yield', level:null, price:1, image:'images/items/yield/cardpiece4.png?1', image_mini:'images/items/yield/cardpiece4.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[1783] = {item_id:1783, nshort:'cardcomplete', name:'Полная карта', type:'yield', level:null, price:1, image:'images/items/yield/cardcomplete.png?1', image_mini:'images/items/yield/cardcomplete.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[1784] = {item_id:1784, nshort:'itemlist', name:'Список вещей', type:'yield', level:null, price:1, image:'images/items/yield/itemlist.png?1', image_mini:'images/items/yield/itemlist.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[1785] = {item_id:1785, nshort:'torch', name:'Факел', type:'yield', level:null, price:1, image:'images/items/yield/torch.png?1', image_mini:'images/items/yield/torch.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[1786] = {item_id:1786, nshort:'bagpack', name:'Рюкзак', type:'yield', level:null, price:1, image:'images/items/yield/bagpack.png?1', image_mini:'images/items/yield/bagpack.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[1787] = {item_id:1787, nshort:'ashes', name:'Пепел', type:'yield', level:null, price:1, image:'images/items/yield/ashes.png?1', image_mini:'images/items/yield/ashes.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[1788] = {item_id:1788, nshort:'gravel', name:'Гравий', type:'yield', level:null, price:10, image:'images/items/yield/gravel.png?1', image_mini:'images/items/yield/gravel.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[1789] = {item_id:1789, nshort:'brokenshovel', name:'Сломанная лопата', type:'yield', level:null, price:50, image:'images/items/yield/brokenshovel.png?1', image_mini:'images/items/yield/brokenshovel.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[1790] = {item_id:1790, nshort:'treeboat', name:'Выдолбленный ствол дерева', type:'yield', level:null, price:50, image:'images/items/yield/treeboat.png?1', image_mini:'images/items/yield/treeboat.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[1791] = {item_id:1791, nshort:'golddust', name:'Золотая пыль', type:'yield', level:null, price:100, image:'images/items/yield/golddust.png?1', image_mini:'images/items/yield/golddust.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[1792] = {item_id:1792, nshort:'goldnugget', name:'Золото', type:'yield', level:null, price:5000, image:'images/items/yield/goldnugget.png?1', image_mini:'images/items/yield/goldnugget.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[1793] = {item_id:1793, nshort:'bendmetall', name:'Гнутая, замызганная железяка', type:'yield', level:null, price:1, image:'images/items/yield/bendmetall.png?1', image_mini:'images/items/yield/bendmetall.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[1794] = {item_id:1794, nshort:'dirtymetall', name:'Грязная железяка', type:'yield', level:null, price:10, image:'images/items/yield/dirtymetall.png?1', image_mini:'images/items/yield/dirtymetall.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[1795] = {item_id:1795, nshort:'goldblade', name:'Отмытый золотой клинок', type:'yield', level:null, price:100, image:'images/items/yield/goldblade.png?1', image_mini:'images/items/yield/goldblade.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[1796] = {item_id:1796, nshort:'sharpgoldblade', name:'Острый клинок', type:'yield', level:null, price:100, image:'images/items/yield/sharpgoldblade.png?1', image_mini:'images/items/yield/sharpgoldblade.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[1797] = {item_id:1797, nshort:'sheriffpaper', name:'Рапорт шерифа', type:'yield', level:null, price:10, image:'images/items/yield/sheriffpaper.png?1', image_mini:'images/items/yield/sheriffpaper.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
\
items[1799] = {item_id:1799, nshort:'crystallball', name:'Хрустальный шар', type:'yield', level:null, price:10000, image:'images/items/yield/crystallball.png?1', image_mini:'images/items/yield/crystallball.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[1800] = {item_id:1800, nshort:'toadblood', name:'Кровь жабы', type:'yield', level:null, price:10, image:'images/items/yield/toadblood.png?1', image_mini:'images/items/yield/toadblood.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[1801] = {item_id:1801, nshort:'coyoteheart', name:'Сердце койота', type:'yield', level:null, price:10, image:'images/items/yield/coyoteheart.png?1', image_mini:'images/items/yield/coyoteheart.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[1802] = {item_id:1802, nshort:'phantomdrawing', name:'Портрет', type:'yield', level:null, price:10, image:'images/items/yield/phantomdrawing.png?1', image_mini:'images/items/yield/phantomdrawing.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[1803] = {item_id:1803, nshort:'candyorange', name:'Апельсин в сахаре', type:'yield', level:null, price:10, image:'images/items/yield/candyorange.png?1', image_mini:'images/items/yield/candyorange.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[1804] = {item_id:1804, nshort:'smellingfish', name:'Тухлая рыба', type:'yield', level:null, price:10, image:'images/items/yield/smellingfish.png?1', image_mini:'images/items/yield/smellingfish.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[1805] = {item_id:1805, nshort:'needleandthreat', name:'Иголка с ниткой', type:'yield', level:null, price:5, image:'images/items/yield/needleandthreat.png?1', image_mini:'images/items/yield/needleandthreat.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[1806] = {item_id:1806, nshort:'cottonbale', name:'Тюк хлопка', type:'yield', level:null, price:15, image:'images/items/yield/cottonbale.png?1', image_mini:'images/items/yield/cottonbale.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
\
items[1807] = {item_id:1807, nshort:'sock', name:'Носок', type:'yield', level:null, price:0, image:'images/items/yield/sock.png?1', image_mini:'images/items/yield/sock.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[1808] = {item_id:1808, nshort:'potatoe', name:'Картошка', type:'yield', level:null, price:5, image:'images/items/yield/potatoe.png?1', image_mini:'images/items/yield/potatoe.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[1809] = {item_id:1809, nshort:'hay', name:'Сено', type:'yield', level:null, price:5, image:'images/items/yield/hay.png?1', image_mini:'images/items/yield/hay.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[1810] = {item_id:1810, nshort:'pumpkin', name:'Тыква', type:'yield', level:null, price:25, image:'images/items/yield/pumpkin.png?1', image_mini:'images/items/yield/pumpkin.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[1811] = {item_id:1811, nshort:'blueberries', name:'Черника', type:'yield', level:null, price:15, image:'images/items/yield/blueberries.png?1', image_mini:'images/items/yield/blueberries.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[1812] = {item_id:1812, nshort:'pit', name:'Косточка', type:'yield', level:null, price:1, image:'images/items/yield/pit.png?1', image_mini:'images/items/yield/pit.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[1813] = {item_id:1813, nshort:'eagle_feather', name:'Перо орла', type:'yield', level:null, price:35, image:'images/items/yield/eagle_feather.png?1', image_mini:'images/items/yield/eagle_feather.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[1814] = {item_id:1814, nshort:'lotus', name:'Цветок лотоса', type:'yield', level:null, price:45, image:'images/items/yield/lotus.png?1', image_mini:'images/items/yield/lotus.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[1815] = {item_id:1815, nshort:'crabmeat', name:'Мясо краба', type:'yield', level:null, price:12, image:'images/items/yield/crabmeat.png?1', image_mini:'images/items/yield/crabmeat.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[1816] = {item_id:1816, nshort:'chalk', name:'Мел', type:'yield', level:null, price:2, image:'images/items/yield/chalk.png?1', image_mini:'images/items/yield/chalk.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[1817] = {item_id:1817, nshort:'sheriffstar', name:'Шерифская звезда', type:'yield', level:null, price:50, image:'images/items/yield/sheriffstar.png?1', image_mini:'images/items/yield/sheriffstar.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[1818] = {item_id:1818, nshort:'sulfurstone', name:'Серная порода', type:'yield', level:null, price:25, image:'images/items/yield/sulfurstone.png?1', image_mini:'images/items/yield/sulfurstone.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[1819] = {item_id:1819, nshort:'pokergame', name:'Колода для покера', type:'yield', level:null, price:150, image:'images/items/yield/pokergame.png?1', image_mini:'images/items/yield/pokergame.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[1820] = {item_id:1820, nshort:'snakehide', name:'Змеиная кожа', type:'yield', level:null, price:27, image:'images/items/yield/snakehide.png?1', image_mini:'images/items/yield/snakehide.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[1821] = {item_id:1821, nshort:'salpetersalt', name:'Селитра', type:'yield', level:null, price:13, image:'images/items/yield/salpetersalt.png?1', image_mini:'images/items/yield/salpetersalt.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[1822] = {item_id:1822, nshort:'cigaretts', name:'Сигареты', type:'yield', level:null, price:3, image:'images/items/yield/cigaretts.png?1', image_mini:'images/items/yield/cigaretts.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
\
items[1824] = {item_id:1824, nshort:'cougar_hide', name:'Шкура пумы', type:'yield', level:null, price:55, image:'images/items/yield/cougar_hide.png?1', image_mini:'images/items/yield/cougar_hide.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
\
items[1826] = {item_id:1826, nshort:'rum', name:'Ром', type:'yield', level:null, price:7, image:'images/items/yield/rum.png?1', image_mini:'images/items/yield/rum.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[1827] = {item_id:1827, nshort:'lead', name:'Свинец', type:'yield', level:null, price:27, image:'images/items/yield/lead.png?1', image_mini:'images/items/yield/lead.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[1828] = {item_id:1828, nshort:'uncut_ruby', name:'Рубин', type:'yield', level:null, price:75, image:'images/items/yield/uncut_ruby.png?1', image_mini:'images/items/yield/uncut_ruby.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[1829] = {item_id:1829, nshort:'uncut_emerald', name:'Изумруд', type:'yield', level:null, price:55, image:'images/items/yield/uncut_emerald.png?1', image_mini:'images/items/yield/uncut_emerald.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
\
items[1831] = {item_id:1831, nshort:'woodcross', name:'Деревянный крест', type:'yield', level:null, price:3, image:'images/items/yield/woodcross.png?1', image_mini:'images/items/yield/woodcross.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[1832] = {item_id:1832, nshort:'metall_chip', name:'Железная фишка', type:'yield', level:null, price:50, image:'images/items/yield/metall_chip.png?1', image_mini:'images/items/yield/metall_chip.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[1833] = {item_id:1833, nshort:'death_warrant', name:'Смертный приговор', type:'yield', level:null, price:5, image:'images/items/yield/death_warrant.png?1', image_mini:'images/items/yield/death_warrant.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[1834] = {item_id:1834, nshort:'peaceflower', name:'Цветок мира', type:'yield', level:null, price:1, image:'images/items/yield/peaceflower.png?1', image_mini:'images/items/yield/peaceflower.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[1835] = {item_id:1835, nshort:'rose', name:'Роза', type:'yield', level:null, price:10, image:'images/items/yield/rose.png?1', image_mini:'images/items/yield/rose.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
items[1836] = {item_id:1836, nshort:'marriage_certificate', name:'Свидетельство о браке', type:'yield', level:null, price:2, image:'images/items/yield/marriage_certificate.png?1', image_mini:'images/items/yield/marriage_certificate.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
\
\
items[10000] = {item_id:10000, nshort:'shredded_grey', name:'Серые рваные штаны', type:'pants', level:1, price:10, image:'images/items/pants/shredded_grey.png?1', image_mini:'images/items/pants/mini/shredded_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{ride:1}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[10001] = {item_id:10001, nshort:'shredded_yellow', name:'Жёлтые рваные штаны', type:'pants', level:1, price:35, image:'images/items/pants/shredded_yellow.png?1', image_mini:'images/items/pants/mini/shredded_yellow.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:1, leadership:1}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[10002] = {item_id:10002, nshort:'shredded_blue', name:'Синие рваные штаны', type:'pants', level:2, price:55, image:'images/items/pants/shredded_blue.png?1', image_mini:'images/items/pants/mini/shredded_blue.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{animal:2, ride:1}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[10003] = {item_id:10003, nshort:'shredded_green', name:'Зелёные рваные штаны', type:'pants', level:2, price:65, image:'images/items/pants/shredded_green.png?1', image_mini:'images/items/pants/mini/shredded_green.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{swim:1, punch:2, build:1}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[10004] = {item_id:10004, nshort:'shredded_brown', name:'Коричневые рваные штаны', type:'pants', level:3, price:95, image:'images/items/pants/shredded_brown.png?1', image_mini:'images/items/pants/mini/shredded_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:1, leadership:1}, attributes:{charisma:1}}, set:{key:null, name:null}, shop:'shop'};\
items[10005] = {item_id:10005, nshort:'shredded_black', name:'Чёрные рваные штаны', type:'pants', level:3, price:95, image:'images/items/pants/shredded_black.png?1', image_mini:'images/items/pants/mini/shredded_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{pitfall:1, endurance:1}, attributes:{strength:1}}, set:{key:null, name:null}, shop:'shop'};\
items[10006] = {item_id:10006, nshort:'shredded_p1', name:'Знатные рваные штаны', type:'pants', level:4, price:290, image:'images/items/pants/shredded_p1.png?1', image_mini:'images/items/pants/mini/shredded_p1.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{hide:1, reflex:1, ride:3}, attributes:{flexibility:1}}, set:{key:null, name:null}, shop:'shop'};\
items[10007] = {item_id:10007, nshort:'shredded_fine', name:'Рваные штаны Джима', type:'pants', level:6, price:420, image:'images/items/pants/shredded_fine.png?1', image_mini:'images/items/pants/mini/shredded_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{repair:3, finger_dexterity:3, endurance:3, build:6}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
\
items[10010] = {item_id:10010, nshort:'shorts_grey', name:'Серые шорты', type:'pants', level:7, price:232, image:'images/items/pants/shorts_grey.png?1', image_mini:'images/items/pants/mini/shorts_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:3, swim:3, ride:4}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[10011] = {item_id:10011, nshort:'shorts_yellow', name:'Жёлтые шорты', type:'pants', level:8, price:430, image:'images/items/pants/shorts_yellow.png?1', image_mini:'images/items/pants/mini/shorts_yellow.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:5, hide:7}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[10012] = {item_id:10012, nshort:'shorts_blue', name:'Синие шорты', type:'pants', level:8, price:430, image:'images/items/pants/shorts_blue.png?1', image_mini:'images/items/pants/mini/shorts_blue.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{animal:6, trade:2, ride:5}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[10013] = {item_id:10013, nshort:'shorts_green', name:'Зелёные шорты', type:'pants', level:8, price:430, image:'images/items/pants/shorts_green.png?1', image_mini:'images/items/pants/mini/shorts_green.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{repair:5, punch:4, build:5}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[10014] = {item_id:10014, nshort:'shorts_brown', name:'Коричневые шорты', type:'pants', level:9, price:470, image:'images/items/pants/shorts_brown.png?1', image_mini:'images/items/pants/mini/shorts_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{pitfall:5, shot:3, endurance:3}, attributes:{strength:1}}, set:{key:null, name:null}, shop:'shop'};\
items[10015] = {item_id:10015, nshort:'shorts_black', name:'Чёрные шорты', type:'pants', level:9, price:480, image:'images/items/pants/shorts_black.png?1', image_mini:'images/items/pants/mini/shorts_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{trade:4, leadership:6}, attributes:{charisma:1}}, set:{key:null, name:null}, shop:'shop'};\
items[10016] = {item_id:10016, nshort:'shorts_p1', name:'Знатные шорты', type:'pants', level:10, price:1280, image:'images/items/pants/shorts_p1.png?1', image_mini:'images/items/pants/mini/shorts_p1.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:6, finger_dexterity:8, reflex:5, tough:4}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[10017] = {item_id:10017, nshort:'shorts_fine', name:'Шорты Фрэнка Батлера', type:'pants', level:12, price:1460, image:'images/items/pants/shorts_fine.png?1', image_mini:'images/items/pants/mini/shorts_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{shot:8, aim:7, dodge:7, health:6}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
\
items[10020] = {item_id:10020, nshort:'puritan_grey', name:'Серые прямые штаны', type:'pants', level:12, price:360, image:'images/items/pants/puritan_grey.png?1', image_mini:'images/items/pants/mini/puritan_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{hide:2, ride:5, punch:4}, attributes:{strength:1}}, set:{key:null, name:null}, shop:'shop'};\
items[10021] = {item_id:10021, nshort:'puritan_yellow', name:'Жёлтые прямые штаны', type:'pants', level:13, price:600, image:'images/items/pants/puritan_yellow.png?1', image_mini:'images/items/pants/mini/puritan_yellow.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{hide:6, reflex:5}, attributes:{dexterity:1, flexibility:1}}, set:{key:null, name:null}, shop:'shop'};\
items[10022] = {item_id:10022, nshort:'puritan_blue', name:'Синие прямые штаны', type:'pants', level:13, price:640, image:'images/items/pants/puritan_blue.png?1', image_mini:'images/items/pants/mini/puritan_blue.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{pitfall:4, swim:10}, attributes:{strength:1}}, set:{key:null, name:null}, shop:'shop'};\
items[10023] = {item_id:10023, nshort:'puritan_green', name:'Зелёные прямые штаны', type:'pants', level:13, price:630, image:'images/items/pants/puritan_green.png?1', image_mini:'images/items/pants/mini/puritan_green.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:7, endurance:5, build:8}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[10024] = {item_id:10024, nshort:'puritan_brown', name:'Коричневые прямые штаны', type:'pants', level:14, price:650, image:'images/items/pants/puritan_brown.png?1', image_mini:'images/items/pants/mini/puritan_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:8, finger_dexterity:7, tough:6}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[10025] = {item_id:10025, nshort:'puritan_black', name:'Чёрные прямые штаны', type:'pants', level:14, price:670, image:'images/items/pants/puritan_black.png?1', image_mini:'images/items/pants/mini/puritan_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{animal:9, trade:5, shot:7}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[10026] = {item_id:10026, nshort:'puritan_p1', name:'Знатные прямые штаны', type:'pants', level:15, price:1680, image:'images/items/pants/puritan_p1.png?1', image_mini:'images/items/pants/mini/puritan_p1.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{pitfall:5, reflex:9}, attributes:{dexterity:1, strength:2}}, set:{key:null, name:null}, shop:'shop'};\
items[10027] = {item_id:10027, nshort:'puritan_fine', name:'Прямые штаны Гека Финна', type:'pants', level:16, price:1800, image:'images/items/pants/puritan_fine.png?1', image_mini:'images/items/pants/mini/puritan_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{repair:6, finger_dexterity:6, swim:8, build:12}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
\
items[10030] = {item_id:10030, nshort:'shortscheck_grey', name:'Серые бриджи', type:'pants', level:16, price:610, image:'images/items/pants/shortscheck_grey.png?1', image_mini:'images/items/pants/mini/shortscheck_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{endurance:10, punch:7}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[10031] = {item_id:10031, nshort:'shortscheck_yellow', name:'Жёлтые бриджи', type:'pants', level:17, price:1520, image:'images/items/pants/shortscheck_yellow.png?1', image_mini:'images/items/pants/mini/shortscheck_yellow.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{repair:10, pitfall:8}, attributes:{dexterity:1}}, set:{key:null, name:null}, shop:'shop'};\
items[10032] = {item_id:10032, nshort:'shortscheck_blue', name:'Синие бриджи', type:'pants', level:17, price:1560, image:'images/items/pants/shortscheck_blue.png?1', image_mini:'images/items/pants/mini/shortscheck_blue.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{charisma:2, dexterity:3, flexibility:1, strength:3}}, set:{key:null, name:null}, shop:'shop'};\
items[10033] = {item_id:10033, nshort:'shortscheck_green', name:'Зелёные бриджи', type:'pants', level:17, price:1520, image:'images/items/pants/shortscheck_green.png?1', image_mini:'images/items/pants/mini/shortscheck_green.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{hide:10, tough:8}, attributes:{charisma:1}}, set:{key:null, name:null}, shop:'shop'};\
items[10034] = {item_id:10034, nshort:'shortscheck_brown', name:'Коричневые бриджи', type:'pants', level:18, price:1620, image:'images/items/pants/shortscheck_brown.png?1', image_mini:'images/items/pants/mini/shortscheck_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{shot:10, aim:7, dodge:9}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[10035] = {item_id:10035, nshort:'shortscheck_black', name:'Чёрные бриджи', type:'pants', level:18, price:1660, image:'images/items/pants/shortscheck_black.png?1', image_mini:'images/items/pants/mini/shortscheck_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:9, trade:10, tactic:8}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[10036] = {item_id:10036, nshort:'shortscheck_p1', name:'Знатные бриджи', type:'pants', level:19, price:2880, image:'images/items/pants/shortscheck_p1.png?1', image_mini:'images/items/pants/mini/shortscheck_p1.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{repair:10, finger_dexterity:10, pitfall:9, shot:8}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[10037] = {item_id:10037, nshort:'shortscheck_fine', name:'Бриджи Вашингтона Ирвинга', type:'pants', level:20, price:3120, image:'images/items/pants/shortscheck_fine.png?1', image_mini:'images/items/pants/mini/shortscheck_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:8, swim:10, reflex:9, ride:12}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
\
items[10040] = {item_id:10040, nshort:'check_grey', name:'Серые клетчатые штаны', type:'pants', level:20, price:690, image:'images/items/pants/check_grey.png?1', image_mini:'images/items/pants/mini/check_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{hide:8, reflex:5, endurance:5}, attributes:{strength:1}}, set:{key:null, name:null}, shop:'shop'};\
items[10041] = {item_id:10041, nshort:'check_yellow', name:'Жёлтые клетчатые штаны', type:'pants', level:21, price:1720, image:'images/items/pants/check_yellow.png?1', image_mini:'images/items/pants/mini/check_yellow.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tough:7, punch:8}, attributes:{dexterity:2, strength:1}}, set:{key:null, name:null}, shop:'shop'};\
items[10042] = {item_id:10042, nshort:'check_blue', name:'Синие клетчатые штаны', type:'pants', level:21, price:1760, image:'images/items/pants/check_blue.png?1', image_mini:'images/items/pants/mini/check_blue.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{pitfall:8, swim:6, build:10}, attributes:{flexibility:1}}, set:{key:null, name:null}, shop:'shop'};\
items[10043] = {item_id:10043, nshort:'check_green', name:'Зелёные клетчатые штаны', type:'pants', level:21, price:1780, image:'images/items/pants/check_green.png?1', image_mini:'images/items/pants/mini/check_green.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:7, health:8, punch:6}, attributes:{strength:2}}, set:{key:null, name:null}, shop:'shop'};\
items[10044] = {item_id:10044, nshort:'check_brown', name:'Коричневые клетчатые штаны', type:'pants', level:22, price:1840, image:'images/items/pants/check_brown.png?1', image_mini:'images/items/pants/mini/check_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{shot:8, hide:6, ride:8}, attributes:{flexibility:2}}, set:{key:null, name:null}, shop:'shop'};\
items[10045] = {item_id:10045, nshort:'check_black', name:'Чёрные клетчатые штаны', type:'pants', level:22, price:1880, image:'images/items/pants/check_black.png?1', image_mini:'images/items/pants/mini/check_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{repair:10, finger_dexterity:10}, attributes:{flexibility:2}}, set:{key:null, name:null}, shop:'shop'};\
items[10046] = {item_id:10046, nshort:'check_p1', name:'Знатные клетчатые штаны', type:'pants', level:24, price:3540, image:'images/items/pants/check_p1.png?1', image_mini:'images/items/pants/mini/check_p1.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:12, animal:10, trade:12, tactic:12}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[10047] = {item_id:10047, nshort:'check_fine', name:'Клетчатые штаны Анни Окли', type:'pants', level:25, price:3630, image:'images/items/pants/check_fine.png?1', image_mini:'images/items/pants/mini/check_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{shot:12, aim:14, dodge:10, health:9}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
\
items[10050] = {item_id:10050, nshort:'fur_grey', name:'Серые меховые штаны', type:'pants', level:25, price:1230, image:'images/items/pants/fur_grey.png?1', image_mini:'images/items/pants/mini/fur_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{shot:7, hide:8, reflex:8}, attributes:{dexterity:1}}, set:{key:null, name:null}, shop:'shop'};\
items[10051] = {item_id:10051, nshort:'fur_yellow', name:'Жёлтые меховые штаны', type:'pants', level:26, price:3000, image:'images/items/pants/fur_yellow.png?1', image_mini:'images/items/pants/mini/fur_yellow.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{endurance:8, punch:8, build:9}, attributes:{strength:2}}, set:{key:null, name:null}, shop:'shop'};\
items[10052] = {item_id:10052, nshort:'fur_blue', name:'Синие меховые штаны', type:'pants', level:26, price:3060, image:'images/items/pants/fur_blue.png?1', image_mini:'images/items/pants/mini/fur_blue.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{animal:8, pitfall:14, hide:10}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[10053] = {item_id:10053, nshort:'fur_green', name:'Зелёные меховые штаны', type:'pants', level:26, price:3000, image:'images/items/pants/fur_green.png?1', image_mini:'images/items/pants/mini/fur_green.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:16}, attributes:{charisma:3}}, set:{key:null, name:null}, shop:'shop'};\
items[10054] = {item_id:10054, nshort:'fur_brown', name:'Коричневые меховые штаны', type:'pants', level:27, price:3090, image:'images/items/pants/fur_brown.png?1', image_mini:'images/items/pants/mini/fur_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:14, leadership:11, finger_dexterity:7}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[10055] = {item_id:10055, nshort:'fur_black', name:'Чёрные меховые штаны', type:'pants', level:27, price:3120, image:'images/items/pants/fur_black.png?1', image_mini:'images/items/pants/mini/fur_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{trade:17, endurance:12}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[10056] = {item_id:10056, nshort:'fur_p1', name:'Знатные меховые штаны', type:'pants', level:30, price:4725, image:'images/items/pants/fur_p1.png?1', image_mini:'images/items/pants/mini/fur_p1.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{repair:10, swim:15, ride:15, tough:10}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[10057] = {item_id:10057, nshort:'fur_fine', name:'Шайеннские меховые штаны', type:'pants', level:32, price:5075, image:'images/items/pants/fur_fine.png?1', image_mini:'images/items/pants/mini/fur_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{shot:19, dodge:15}, attributes:{charisma:2}}, set:{key:null, name:null}, shop:'drop'};\
\
items[10060] = {item_id:10060, nshort:'dungarees_grey', name:'Серый комбинезон', type:'pants', level:31, price:1395, image:'images/items/pants/dungarees_grey.png?1', image_mini:'images/items/pants/mini/dungarees_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{pitfall:15}, attributes:{dexterity:2, strength:1}}, set:{key:null, name:null}, shop:'shop'};\
items[10061] = {item_id:10061, nshort:'dungarees_yellow', name:'Жёлтый комбинезон', type:'pants', level:32, price:3360, image:'images/items/pants/dungarees_yellow.png?1', image_mini:'images/items/pants/mini/dungarees_yellow.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{repair:12, finger_dexterity:10, reflex:14}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[10062] = {item_id:10062, nshort:'dungarees_blue', name:'Синий комбинезон', type:'pants', level:32, price:3420, image:'images/items/pants/dungarees_blue.png?1', image_mini:'images/items/pants/mini/dungarees_blue.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{ride:15, punch:9, build:12}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[10063] = {item_id:10063, nshort:'dungarees_green', name:'Зелёный комбинезон', type:'pants', level:32, price:3420, image:'images/items/pants/dungarees_green.png?1', image_mini:'images/items/pants/mini/dungarees_green.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{swim:14, endurance:12, tough:11}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[10064] = {item_id:10064, nshort:'dungarees_brown', name:'Коричневый комбинезон', type:'pants', level:33, price:3510, image:'images/items/pants/dungarees_brown.png?1', image_mini:'images/items/pants/mini/dungarees_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{shot:15, hide:15}, attributes:{dexterity:1}}, set:{key:null, name:null}, shop:'shop'};\
items[10065] = {item_id:10065, nshort:'dungarees_black', name:'Чёрный комбинезон', type:'pants', level:33, price:3540, image:'images/items/pants/dungarees_black.png?1', image_mini:'images/items/pants/mini/dungarees_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{trade:14, tactic:10, leadership:14}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[10066] = {item_id:10066, nshort:'dungarees_p1', name:'Знатный комбинезон', type:'pants', level:35, price:5250, image:'images/items/pants/dungarees_p1.png?1', image_mini:'images/items/pants/mini/dungarees_p1.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:15, animal:15}, attributes:{charisma:3, dexterity:1}}, set:{key:null, name:null}, shop:'shop'};\
items[10067] = {item_id:10067, nshort:'dungarees_fine', name:'Комбинезон Боба-строителя', type:'pants', level:38, price:5775, image:'images/items/pants/dungarees_fine.png?1', image_mini:'images/items/pants/mini/dungarees_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{endurance:17, punch:17, build:17}, attributes:{strength:1}}, set:{key:null, name:null}, shop:'drop'};\
\
items[10070] = {item_id:10070, nshort:'fine_grey', name:'Серые холщовые штаны', type:'pants', level:37, price:1470, image:'images/items/pants/fine_grey.png?1', image_mini:'images/items/pants/mini/fine_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{trade:10, leadership:11}, attributes:{charisma:2}}, set:{key:null, name:null}, shop:'shop'};\
items[10071] = {item_id:10071, nshort:'fine_yellow', name:'Жёлтые холщовые штаны', type:'pants', level:38, price:3600, image:'images/items/pants/fine_yellow.png?1', image_mini:'images/items/pants/mini/fine_yellow.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{animal:19, pitfall:7, ride:10}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[10072] = {item_id:10072, nshort:'fine_blue', name:'Синие холщовые штаны', type:'pants', level:38, price:3570, image:'images/items/pants/fine_blue.png?1', image_mini:'images/items/pants/mini/fine_blue.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{repair:7, swim:15, hide:15}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[10073] = {item_id:10073, nshort:'fine_green', name:'Зелёные холщовые штаны', type:'pants', level:38, price:3570, image:'images/items/pants/fine_green.png?1', image_mini:'images/items/pants/mini/fine_green.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:17, tactic:17}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[10074] = {item_id:10074, nshort:'fine_brown', name:'Коричневые холщовые штаны', type:'pants', level:40, price:3630, image:'images/items/pants/fine_brown.png?1', image_mini:'images/items/pants/mini/fine_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{reflex:19}, attributes:{dexterity:3, flexibility:1}}, set:{key:null, name:null}, shop:'shop'};\
items[10075] = {item_id:10075, nshort:'fine_black', name:'Чёрные холщовые штаны', type:'pants', level:40, price:3450, image:'images/items/pants/fine_black.png?1', image_mini:'images/items/pants/mini/fine_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{dodge:9, health:8, endurance:15}, attributes:{strength:1}}, set:{key:null, name:null}, shop:'shop'};\
items[10076] = {item_id:10076, nshort:'fine_p1', name:'Знатные холщовые штаны', type:'pants', level:45, price:5775, image:'images/items/pants/fine_p1.png?1', image_mini:'images/items/pants/mini/fine_p1.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{finger_dexterity:12, shot:12, tough:15, punch:12}, attributes:{dexterity:1, strength:2}}, set:{key:null, name:null}, shop:'shop'};\
items[10077] = {item_id:10077, nshort:'fine_fine', name:'Холщовые штаны Бэта Мастерсона', type:'pants', level:48, price:6300, image:'images/items/pants/fine_fine.png?1', image_mini:'images/items/pants/mini/fine_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{pitfall:18, hide:18}, attributes:{dexterity:3, flexibility:2}}, set:{key:null, name:null}, shop:'drop'};\
\
items[10080] = {item_id:10080, nshort:'breeches_grey', name:'Серые брюки', type:'pants', level:41, price:2020, image:'images/items/pants/breeches_grey.png?1', image_mini:'images/items/pants/mini/breeches_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{finger_dexterity:7, pitfall:14}, attributes:{flexibility:2}}, set:{key:null, name:null}, shop:'shop'};\
items[10081] = {item_id:10081, nshort:'breeches_yellow', name:'Жёлтые брюки', type:'pants', level:42, price:5000, image:'images/items/pants/breeches_yellow.png?1', image_mini:'images/items/pants/mini/breeches_yellow.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:12, repair:17}, attributes:{charisma:1, dexterity:1}}, set:{key:null, name:null}, shop:'shop'};\
items[10082] = {item_id:10082, nshort:'breeches_blue', name:'Синие брюки', type:'pants', level:42, price:5040, image:'images/items/pants/breeches_blue.png?1', image_mini:'images/items/pants/mini/breeches_blue.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:9, trade:12, tactic:12}, attributes:{flexibility:2}}, set:{key:null, name:null}, shop:'shop'};\
items[10083] = {item_id:10083, nshort:'breeches_green', name:'Зелёные брюки', type:'pants', level:42, price:5040, image:'images/items/pants/breeches_green.png?1', image_mini:'images/items/pants/mini/breeches_green.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{endurance:11, tough:6, punch:12}, attributes:{charisma:1, strength:2}}, set:{key:null, name:null}, shop:'shop'};\
items[10084] = {item_id:10084, nshort:'breeches_brown', name:'Коричневые брюки', type:'pants', level:44, price:5240, image:'images/items/pants/breeches_brown.png?1', image_mini:'images/items/pants/mini/breeches_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{repair:14, finger_dexterity:6, shot:10}, attributes:{dexterity:2, flexibility:1}}, set:{key:null, name:null}, shop:'shop'};\
items[10085] = {item_id:10085, nshort:'breeches_black', name:'Чёрные брюки', type:'pants', level:44, price:5240, image:'images/items/pants/breeches_black.png?1', image_mini:'images/items/pants/mini/breeches_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{hide:14, reflex:14}, attributes:{dexterity:1, flexibility:2}}, set:{key:null, name:null}, shop:'shop'};\
items[10086] = {item_id:10086, nshort:'breeches_p1', name:'Знатные брюки', type:'pants', level:50, price:7965, image:'images/items/pants/breeches_p1.png?1', image_mini:'images/items/pants/mini/breeches_p1.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{animal:15, ride:15, build:15}, attributes:{charisma:2, strength:2}}, set:{key:null, name:null}, shop:'shop'};\
\
items[10090] = {item_id:10090, nshort:'indian_grey', name:'Серые индейские штаны', type:'pants', level:51, price:3330, image:'images/items/pants/indian_grey.png?1', image_mini:'images/items/pants/mini/indian_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tough:5, build:15}, attributes:{strength:3}}, set:{key:null, name:null}, shop:'shop'};\
items[10091] = {item_id:10091, nshort:'indian_yellow', name:'Жёлтые индейские штаны', type:'pants', level:52, price:7000, image:'images/items/pants/indian_yellow.png?1', image_mini:'images/items/pants/mini/indian_yellow.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{endurance:14, punch:14}, attributes:{dexterity:2, strength:2}}, set:{key:null, name:null}, shop:'shop'};\
items[10092] = {item_id:10092, nshort:'indian_blue', name:'Синие индейские штаны', type:'pants', level:52, price:7000, image:'images/items/pants/indian_blue.png?1', image_mini:'images/items/pants/mini/indian_blue.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{repair:12, finger_dexterity:14, pitfall:12}, attributes:{flexibility:2}}, set:{key:null, name:null}, shop:'shop'};\
items[10093] = {item_id:10093, nshort:'indian_green', name:'Зелёные индейские штаны', type:'pants', level:52, price:7000, image:'images/items/pants/indian_green.png?1', image_mini:'images/items/pants/mini/indian_green.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{swim:20, hide:12, reflex:12}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[10094] = {item_id:10094, nshort:'indian_brown', name:'Коричневые индейские штаны', type:'pants', level:55, price:7150, image:'images/items/pants/indian_brown.png?1', image_mini:'images/items/pants/mini/indian_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{shot:15, dodge:10, health:10}, attributes:{dexterity:2, flexibility:1}}, set:{key:null, name:null}, shop:'shop'};\
items[10095] = {item_id:10095, nshort:'indian_black', name:'Чёрные индейские штаны', type:'pants', level:55, price:7300, image:'images/items/pants/indian_black.png?1', image_mini:'images/items/pants/mini/indian_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{animal:10, tactic:14, ride:15}, attributes:{charisma:2}}, set:{key:null, name:null}, shop:'shop'};\
items[10096] = {item_id:10096, nshort:'indian_p1', name:'Знатные индейские штаны', type:'pants', level:60, price:11100, image:'images/items/pants/indian_p1.png?1', image_mini:'images/items/pants/mini/indian_p1.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:17, trade:15, leadership:17}, attributes:{charisma:3}}, set:{key:null, name:null}, shop:'shop'};\
\
items[10100] = {item_id:10100, nshort:'chapsrough_grey', name:'Серые чаппарахас', type:'pants', level:54, price:4095, image:'images/items/pants/chapsrough_grey.png?1', image_mini:'images/items/pants/mini/chapsrough_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tough:15, punch:15}, attributes:{strength:1}}, set:{key:null, name:null}, shop:'shop'};\
items[10101] = {item_id:10101, nshort:'chapsrough_yellow', name:'Жёлтые чаппарахас', type:'pants', level:56, price:8085, image:'images/items/pants/chapsrough_yellow.png?1', image_mini:'images/items/pants/mini/chapsrough_yellow.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{aim:15, health:18, punch:15}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[10102] = {item_id:10102, nshort:'chapsrough_blue', name:'Синие чаппарахас', type:'pants', level:56, price:8085, image:'images/items/pants/chapsrough_blue.png?1', image_mini:'images/items/pants/mini/chapsrough_blue.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{repair:17, endurance:14, build:17}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[10103] = {item_id:10103, nshort:'chapsrough_green', name:'Зелёные чаппарахас', type:'pants', level:56, price:8085, image:'images/items/pants/chapsrough_green.png?1', image_mini:'images/items/pants/mini/chapsrough_green.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{animal:15, pitfall:15}, attributes:{charisma:2, dexterity:2}}, set:{key:null, name:null}, shop:'shop'};\
items[10104] = {item_id:10104, nshort:'chapsrough_brown', name:'Коричневые чаппарахас', type:'pants', level:59, price:8470, image:'images/items/pants/chapsrough_brown.png?1', image_mini:'images/items/pants/mini/chapsrough_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{finger_dexterity:14, hide:14, ride:15}, attributes:{flexibility:2}}, set:{key:null, name:null}, shop:'shop'};\
items[10105] = {item_id:10105, nshort:'chapsrough_black', name:'Чёрные чаппарахас', type:'pants', level:59, price:8470, image:'images/items/pants/chapsrough_black.png?1', image_mini:'images/items/pants/mini/chapsrough_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:14, trade:14, shot:15}, attributes:{charisma:2}}, set:{key:null, name:null}, shop:'shop'};\
items[10106] = {item_id:10106, nshort:'chapsrough_p1', name:'Знатные чаппарахас', type:'pants', level:65, price:12610, image:'images/items/pants/chapsrough_p1.png?1', image_mini:'images/items/pants/mini/chapsrough_p1.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:17, leadership:17, swim:13, reflex:13}, attributes:{strength:3}}, set:{key:null, name:null}, shop:'shop'};\
\
items[10110] = {item_id:10110, nshort:'cavalry_grey', name:'Серые солдатские штаны', type:'pants', level:61, price:5160, image:'images/items/pants/cavalry_grey.png?1', image_mini:'images/items/pants/mini/cavalry_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{animal:15, swim:12, reflex:15}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[10111] = {item_id:10111, nshort:'cavalry_yellow', name:'Жёлтые солдатские штаны', type:'pants', level:63, price:9660, image:'images/items/pants/cavalry_yellow.png?1', image_mini:'images/items/pants/mini/cavalry_yellow.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{shot:19, ride:20}, attributes:{dexterity:2}}, set:{key:null, name:null}, shop:'shop'};\
items[10112] = {item_id:10112, nshort:'cavalry_blue', name:'Синие солдатские штаны', type:'pants', level:63, price:9600, image:'images/items/pants/cavalry_blue.png?1', image_mini:'images/items/pants/mini/cavalry_blue.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{pitfall:17, hide:18, endurance:18}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[10113] = {item_id:10113, nshort:'cavalry_green', name:'Зелёные солдатские штаны', type:'pants', level:63, price:9540, image:'images/items/pants/cavalry_green.png?1', image_mini:'images/items/pants/mini/cavalry_green.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{trade:15, leadership:15, finger_dexterity:15}, attributes:{charisma:2}}, set:{key:null, name:null}, shop:'shop'};\
items[10114] = {item_id:10114, nshort:'cavalry_brown', name:'Коричневые солдатские штаны', type:'pants', level:65, price:9720, image:'images/items/pants/cavalry_brown.png?1', image_mini:'images/items/pants/mini/cavalry_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tough:18, punch:18}, attributes:{strength:3}}, set:{key:null, name:null}, shop:'shop'};\
items[10115] = {item_id:10115, nshort:'cavalry_black', name:'Чёрные солдатские штаны', type:'pants', level:65, price:10020, image:'images/items/pants/cavalry_black.png?1', image_mini:'images/items/pants/mini/cavalry_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{repair:15, build:17}, attributes:{dexterity:2, strength:3}}, set:{key:null, name:null}, shop:'shop'};\
items[10116] = {item_id:10116, nshort:'cavalry_p1', name:'Знатные солдатские штаны', type:'pants', level:75, price:15120, image:'images/items/pants/cavalry_p1.png?1', image_mini:'images/items/pants/mini/cavalry_p1.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:15, aim:15, dodge:15}, attributes:{charisma:3, dexterity:3, flexibility:3}}, set:{key:null, name:null}, shop:'shop'};\
\
items[10120] = {item_id:10120, nshort:'jeans_grey', name:'Серые джинсы', type:'pants', level:71, price:7590, image:'images/items/pants/jeans_grey.png?1', image_mini:'images/items/pants/mini/jeans_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:15, shot:15}, attributes:{charisma:2, dexterity:1}}, set:{key:null, name:null}, shop:'shop'};\
items[10121] = {item_id:10121, nshort:'jeans_yellow', name:'Жёлтые джинсы', type:'pants', level:74, price:11180, image:'images/items/pants/jeans_yellow.png?1', image_mini:'images/items/pants/mini/jeans_yellow.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{swim:16, endurance:17, punch:16}, attributes:{strength:2}}, set:{key:null, name:null}, shop:'shop'};\
items[10122] = {item_id:10122, nshort:'jeans_blue', name:'Синие джинсы', type:'pants', level:74, price:11180, image:'images/items/pants/jeans_blue.png?1', image_mini:'images/items/pants/mini/jeans_blue.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{repair:16, tough:16, build:17}, attributes:{flexibility:2}}, set:{key:null, name:null}, shop:'shop'};\
items[10123] = {item_id:10123, nshort:'jeans_green', name:'Зелёные джинсы', type:'pants', level:74, price:11180, image:'images/items/pants/jeans_green.png?1', image_mini:'images/items/pants/mini/jeans_green.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{pitfall:16, ride:17, health:16}, attributes:{dexterity:2}}, set:{key:null, name:null}, shop:'shop'};\
items[10124] = {item_id:10124, nshort:'jeans_brown', name:'Коричневые джинсы', type:'pants', level:79, price:12350, image:'images/items/pants/jeans_brown.png?1', image_mini:'images/items/pants/mini/jeans_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:16, aim:17, dodge:16}, attributes:{charisma:2, dexterity:2}}, set:{key:null, name:null}, shop:'shop'};\
items[10125] = {item_id:10125, nshort:'jeans_black', name:'Чёрные джинсы', type:'pants', level:79, price:12350, image:'images/items/pants/jeans_black.png?1', image_mini:'images/items/pants/mini/jeans_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:17, leadership:16, finger_dexterity:16}, attributes:{flexibility:2, strength:2}}, set:{key:null, name:null}, shop:'shop'};\
items[10126] = {item_id:10126, nshort:'jeans_p1', name:'Знатные джинсы', type:'pants', level:90, price:18900, image:'images/items/pants/jeans_p1.png?1', image_mini:'images/items/pants/mini/jeans_p1.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:20, animal:18, trade:20, hide:20}, attributes:{charisma:3, flexibility:2}}, set:{key:null, name:null}, shop:'shop'};\
\
items[10130] = {item_id:10130, nshort:'leather_grey', name:'Серые кожаные штаны', type:'pants', level:76, price:8880, image:'images/items/pants/leather_grey.png?1', image_mini:'images/items/pants/mini/leather_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{aim:28}, attributes:{strength:3}}, set:{key:null, name:null}, shop:'shop'};\
items[10131] = {item_id:10131, nshort:'leather_yellow', name:'Жёлтые кожаные штаны', type:'pants', level:80, price:13650, image:'images/items/pants/leather_yellow.png?1', image_mini:'images/items/pants/mini/leather_yellow.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{health:18, tough:20}, attributes:{strength:4}}, set:{key:null, name:null}, shop:'shop'};\
items[10132] = {item_id:10132, nshort:'leather_blue', name:'Синие кожаные штаны', type:'pants', level:80, price:13650, image:'images/items/pants/leather_blue.png?1', image_mini:'images/items/pants/mini/leather_blue.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{finger_dexterity:18, swim:20}, attributes:{flexibility:4}}, set:{key:null, name:null}, shop:'shop'};\
items[10133] = {item_id:10133, nshort:'leather_green', name:'Зелёные кожаные штаны', type:'pants', level:80, price:13650, image:'images/items/pants/leather_green.png?1', image_mini:'images/items/pants/mini/leather_green.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{reflex:18, build:20}, attributes:{dexterity:4}}, set:{key:null, name:null}, shop:'shop'};\
items[10134] = {item_id:10134, nshort:'leather_brown', name:'Коричневые кожаные штаны', type:'pants', level:85, price:14625, image:'images/items/pants/leather_brown.png?1', image_mini:'images/items/pants/mini/leather_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{aim:17, dodge:17, punch:17}, attributes:{dexterity:2, strength:2}}, set:{key:null, name:null}, shop:'shop'};\
items[10135] = {item_id:10135, nshort:'leather_black', name:'Чёрные кожаные штаны', type:'pants', level:85, price:14625, image:'images/items/pants/leather_black.png?1', image_mini:'images/items/pants/mini/leather_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{pitfall:17, hide:17, endurance:17}, attributes:{dexterity:2, flexibility:2}}, set:{key:null, name:null}, shop:'shop'};\
items[10136] = {item_id:10136, nshort:'leather_p1', name:'Знатные кожаные штаны', type:'pants', level:95, price:20400, image:'images/items/pants/leather_p1.png?1', image_mini:'images/items/pants/mini/leather_p1.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{animal:20, tactic:20, repair:20}, attributes:{flexibility:4, strength:3}}, set:{key:null, name:null}, shop:'shop'};\
\
items[10140] = {item_id:10140, nshort:'chapsfine_grey', name:'Серые мягкие чаппарахас', type:'pants', level:84, price:11625, image:'images/items/pants/chapsfine_grey.png?1', image_mini:'images/items/pants/mini/chapsfine_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{finger_dexterity:17, reflex:17}, attributes:{charisma:3}}, set:{key:null, name:null}, shop:'shop'};\
items[10141] = {item_id:10141, nshort:'chapsfine_yellow', name:'Жёлтые мягкие чаппарахас', type:'pants', level:88, price:16660, image:'images/items/pants/chapsfine_yellow.png?1', image_mini:'images/items/pants/mini/chapsfine_yellow.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:20, swim:24, tough:20}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[10142] = {item_id:10142, nshort:'chapsfine_blue', name:'Синие мягкие чаппарахас', type:'pants', level:88, price:17000, image:'images/items/pants/chapsfine_blue.png?1', image_mini:'images/items/pants/mini/chapsfine_blue.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{aim:26, health:20}, attributes:{flexibility:3}}, set:{key:null, name:null}, shop:'shop'};\
items[10143] = {item_id:10143, nshort:'chapsfine_green', name:'Зелёные мягкие чаппарахас', type:'pants', level:88, price:17000, image:'images/items/pants/chapsfine_green.png?1', image_mini:'images/items/pants/mini/chapsfine_green.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{animal:19, trade:20}, attributes:{charisma:3, flexibility:3}}, set:{key:null, name:null}, shop:'shop'};\
items[10144] = {item_id:10144, nshort:'chapsfine_brown', name:'Коричневые мягкие чаппарахас', type:'pants', level:94, price:18105, image:'images/items/pants/chapsfine_brown.png?1', image_mini:'images/items/pants/mini/chapsfine_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:11, punch:20, build:20}, attributes:{charisma:1, flexibility:1, strength:3}}, set:{key:null, name:null}, shop:'shop'};\
items[10145] = {item_id:10145, nshort:'chapsfine_black', name:'Чёрные мягкие чаппарахас', type:'pants', level:94, price:18360, image:'images/items/pants/chapsfine_black.png?1', image_mini:'images/items/pants/mini/chapsfine_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{trade:15, finger_dexterity:20, swim:13, tough:20}, attributes:{charisma:2, flexibility:1}}, set:{key:null, name:null}, shop:'shop'};\
items[10146] = {item_id:10146, nshort:'chapsfine_p1', name:'Знатные мягкие чаппарахас', type:'pants', level:99, price:23130, image:'images/items/pants/chapsfine_p1.png?1', image_mini:'images/items/pants/mini/chapsfine_p1.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{aim:25, dodge:30, health:19}, attributes:{flexibility:2}}, set:{key:null, name:null}, shop:'shop'};\
\
items[10148] = {item_id:10148, nshort:'greenhorn_pants', name:'Рейтузы', type:'pants', level:1, price:259, image:'images/items/pants/greenhorn_pants.png?1', image_mini:'images/items/pants/mini/greenhorn_pants.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{swim:3, ride:3}, attributes:{}}, set:{key:'greenhorn_set', name:'Набор начинающего'}, shop:'quest'};\
\
\
items[11000] = {item_id:11000, nshort:'cotton_grey', name:'Серый шерстяной пояс', type:'belt', level:1, price:10, image:'images/items/belt/cotton_grey.png?1', image_mini:'images/items/belt/mini/cotton_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{endurance:1}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[11001] = {item_id:11001, nshort:'cotton_yellow', name:'Жёлтый шерстяной пояс', type:'belt', level:2, price:35, image:'images/items/belt/cotton_yellow.png?1', image_mini:'images/items/belt/mini/cotton_yellow.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{pitfall:1, swim:1}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[11002] = {item_id:11002, nshort:'cotton_blue', name:'Синий шерстяной пояс', type:'belt', level:3, price:45, image:'images/items/belt/cotton_blue.png?1', image_mini:'images/items/belt/mini/cotton_blue.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{reflex:1, ride:1, punch:1}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[11003] = {item_id:11003, nshort:'cotton_green', name:'Зелёный шерстяной пояс', type:'belt', level:3, price:45, image:'images/items/belt/cotton_green.png?1', image_mini:'images/items/belt/mini/cotton_green.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{repair:1, tough:1, build:1}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[11004] = {item_id:11004, nshort:'cotton_brown', name:'Коричневый шерстяной пояс', type:'belt', level:4, price:60, image:'images/items/belt/cotton_brown.png?1', image_mini:'images/items/belt/mini/cotton_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{flexibility:1}}, set:{key:null, name:null}, shop:'shop'};\
items[11005] = {item_id:11005, nshort:'cotton_black', name:'Чёрный шерстяной пояс', type:'belt', level:4, price:60, image:'images/items/belt/cotton_black.png?1', image_mini:'images/items/belt/mini/cotton_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{dexterity:1}}, set:{key:null, name:null}, shop:'shop'};\
items[11006] = {item_id:11006, nshort:'cotton_p1', name:'Знатный шерстяной пояс', type:'belt', level:5, price:250, image:'images/items/belt/cotton_p1.png?1', image_mini:'images/items/belt/mini/cotton_p1.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:1, aim:1, dodge:2}, attributes:{charisma:1}}, set:{key:null, name:null}, shop:'shop'};\
items[11007] = {item_id:11007, nshort:'cotton_fine', name:'Шерстяной пояс Джона Баттерфилда', type:'belt', level:8, price:390, image:'images/items/belt/cotton_fine.png?1', image_mini:'images/items/belt/mini/cotton_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{repair:2, build:3}, attributes:{charisma:1, strength:1}}, set:{key:null, name:null}, shop:'drop'};\
\
items[11010] = {item_id:11010, nshort:'check_grey_belt', name:'Серый в клеточку пояс', type:'belt', level:7, price:142, image:'images/items/belt/check_grey_belt.png?1', image_mini:'images/items/belt/mini/check_grey_belt.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{shot:1, health:1}, attributes:{dexterity:1}}, set:{key:null, name:null}, shop:'shop'};\
items[11011] = {item_id:11011, nshort:'check_yellow_belt', name:'Жёлтый в клеточку пояс', type:'belt', level:8, price:290, image:'images/items/belt/check_yellow_belt.png?1', image_mini:'images/items/belt/mini/check_yellow_belt.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{finger_dexterity:3, hide:1, reflex:1}, attributes:{charisma:1}}, set:{key:null, name:null}, shop:'shop'};\
items[11012] = {item_id:11012, nshort:'check_blue_belt', name:'Синий в клеточку пояс', type:'belt', level:9, price:310, image:'images/items/belt/check_blue_belt.png?1', image_mini:'images/items/belt/mini/check_blue_belt.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{animal:4, swim:3, ride:3}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[11013] = {item_id:11013, nshort:'check_green_belt', name:'Зелёный в клеточку пояс', type:'belt', level:10, price:370, image:'images/items/belt/check_green_belt.png?1', image_mini:'images/items/belt/mini/check_green_belt.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:3, trade:4}, attributes:{charisma:1}}, set:{key:null, name:null}, shop:'shop'};\
items[11014] = {item_id:11014, nshort:'check_brown_belt', name:'Коричневый в клеточку пояс', type:'belt', level:11, price:390, image:'images/items/belt/check_brown_belt.png?1', image_mini:'images/items/belt/mini/check_brown_belt.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:5, leadership:6}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[11015] = {item_id:11015, nshort:'check_black_belt', name:'Чёрный в клеточку пояс', type:'belt', level:11, price:390, image:'images/items/belt/check_black_belt.png?1', image_mini:'images/items/belt/mini/check_black_belt.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{pitfall:6, hide:5}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[11016] = {item_id:11016, nshort:'check_p1_belt', name:'Знатный пояс в клетку', type:'belt', level:12, price:1160, image:'images/items/belt/check_p1_belt.png?1', image_mini:'images/items/belt/mini/check_p1_belt.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{aim:6, punch:7}, attributes:{strength:1}}, set:{key:null, name:null}, shop:'shop'};\
items[11017] = {item_id:11017, nshort:'check_fine_belt', name:'Клетчатый пояс Неда Бантлайна', type:'belt', level:15, price:1280, image:'images/items/belt/check_fine_belt.png?1', image_mini:'images/items/belt/mini/check_fine_belt.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:3, shot:7, aim:6}, attributes:{dexterity:1}}, set:{key:null, name:null}, shop:'drop'};\
\
items[11020] = {item_id:11020, nshort:'fine_grey_belt', name:'Серый ремень', type:'belt', level:12, price:210, image:'images/items/belt/fine_grey_belt.png?1', image_mini:'images/items/belt/mini/fine_grey_belt.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tough:7}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[11021] = {item_id:11021, nshort:'fine_yellow_belt', name:'Жёлтый ремень', type:'belt', level:14, price:450, image:'images/items/belt/fine_yellow_belt.png?1', image_mini:'images/items/belt/mini/fine_yellow_belt.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{swim:3, health:5, endurance:6}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[11022] = {item_id:11022, nshort:'fine_blue_belt', name:'Синий ремень', type:'belt', level:14, price:440, image:'images/items/belt/fine_blue_belt.png?1', image_mini:'images/items/belt/mini/fine_blue_belt.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{dodge:5, reflex:4}, attributes:{dexterity:1}}, set:{key:null, name:null}, shop:'shop'};\
items[11023] = {item_id:11023, nshort:'fine_green_belt', name:'Зелёный ремень', type:'belt', level:15, price:480, image:'images/items/belt/fine_green_belt.png?1', image_mini:'images/items/belt/mini/fine_green_belt.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{trade:6, leadership:4}, attributes:{charisma:1}}, set:{key:null, name:null}, shop:'shop'};\
items[11024] = {item_id:11024, nshort:'fine_brown_belt', name:'Коричневый ремень', type:'belt', level:15, price:480, image:'images/items/belt/fine_brown_belt.png?1', image_mini:'images/items/belt/mini/fine_brown_belt.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{finger_dexterity:4, shot:6}, attributes:{strength:1}}, set:{key:null, name:null}, shop:'shop'};\
items[11025] = {item_id:11025, nshort:'fine_black_belt', name:'Чёрный ремень', type:'belt', level:17, price:540, image:'images/items/belt/fine_black_belt.png?1', image_mini:'images/items/belt/mini/fine_black_belt.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{animal:6, tactic:6, ride:6}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[11026] = {item_id:11026, nshort:'fine_p1_belt', name:'Знатный ремень', type:'belt', level:17, price:1300, image:'images/items/belt/fine_p1_belt.png?1', image_mini:'images/items/belt/mini/fine_p1_belt.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:6, leadership:7, punch:8}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[11027] = {item_id:11027, nshort:'fine_fine_belt', name:'Ремень Томаса Бентона', type:'belt', level:20, price:1620, image:'images/items/belt/fine_fine_belt.png?1', image_mini:'images/items/belt/mini/fine_fine_belt.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{repair:8, build:9}, attributes:{dexterity:1, strength:1}}, set:{key:null, name:null}, shop:'drop'};\
\
items[11030] = {item_id:11030, nshort:'buckle_grey', name:'Серый пояс с пряжкой', type:'belt', level:18, price:420, image:'images/items/belt/buckle_grey.png?1', image_mini:'images/items/belt/mini/buckle_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{dexterity:2, flexibility:2}}, set:{key:null, name:null}, shop:'shop'};\
items[11031] = {item_id:11031, nshort:'buckle_yellow', name:'Жёлтый пояс с пряжкой', type:'belt', level:20, price:1160, image:'images/items/belt/buckle_yellow.png?1', image_mini:'images/items/belt/mini/buckle_yellow.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{repair:7, endurance:6}, attributes:{strength:1}}, set:{key:null, name:null}, shop:'shop'};\
items[11032] = {item_id:11032, nshort:'buckle_blue', name:'Синий пояс с пряжкой', type:'belt', level:20, price:1140, image:'images/items/belt/buckle_blue.png?1', image_mini:'images/items/belt/mini/buckle_blue.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:9, tactic:7}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[11033] = {item_id:11033, nshort:'buckle_green', name:'Зелёный пояс с пряжкой', type:'belt', level:22, price:1340, image:'images/items/belt/buckle_green.png?1', image_mini:'images/items/belt/mini/buckle_green.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{shot:9, dodge:10}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[11034] = {item_id:11034, nshort:'buckle_brown', name:'Коричневый пояс с пряжкой', type:'belt', level:22, price:1340, image:'images/items/belt/buckle_brown.png?1', image_mini:'images/items/belt/mini/buckle_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{aim:9, punch:10}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[11035] = {item_id:11035, nshort:'buckle_black', name:'Чёрный пояс с пряжкой', type:'belt', level:24, price:1520, image:'images/items/belt/buckle_black.png?1', image_mini:'images/items/belt/mini/buckle_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{repair:4, finger_dexterity:10}, attributes:{flexibility:2}}, set:{key:null, name:null}, shop:'shop'};\
items[11036] = {item_id:11036, nshort:'buckle_p1', name:'Знатный пояс с пряжкой', type:'belt', level:25, price:2700, image:'images/items/belt/buckle_p1.png?1', image_mini:'images/items/belt/mini/buckle_p1.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{trade:10, tactic:10, reflex:10}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[11037] = {item_id:11037, nshort:'buckle_fine', name:'Пояс с пряжкой Чарльза Гуднайта', type:'belt', level:27, price:3000, image:'images/items/belt/buckle_fine.png?1', image_mini:'images/items/belt/mini/buckle_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{trade:10, leadership:10, tough:10, build:10}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
\
items[11040] = {item_id:11040, nshort:'bull_grey', name:'Серый пояс с бизоном', type:'belt', level:23, price:490, image:'images/items/belt/bull_grey.png?1', image_mini:'images/items/belt/mini/bull_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{hide:7, endurance:7}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[11041] = {item_id:11041, nshort:'bull_yellow', name:'Жёлтый пояс с бизоном', type:'belt', level:24, price:1360, image:'images/items/belt/bull_yellow.png?1', image_mini:'images/items/belt/mini/bull_yellow.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{pitfall:14}, attributes:{strength:1}}, set:{key:null, name:null}, shop:'shop'};\
items[11042] = {item_id:11042, nshort:'bull_blue', name:'Синий пояс с бизоном', type:'belt', level:24, price:1320, image:'images/items/belt/bull_blue.png?1', image_mini:'images/items/belt/mini/bull_blue.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{ride:2, build:15}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[11043] = {item_id:11043, nshort:'bull_green', name:'Зелёный пояс с бизоном', type:'belt', level:26, price:1400, image:'images/items/belt/bull_green.png?1', image_mini:'images/items/belt/mini/bull_green.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:7, animal:8, repair:8}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[11044] = {item_id:11044, nshort:'bull_brown', name:'Коричневый пояс с бизоном', type:'belt', level:27, price:1500, image:'images/items/belt/bull_brown.png?1', image_mini:'images/items/belt/mini/bull_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:7, health:7, tough:10}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[11045] = {item_id:11045, nshort:'bull_black', name:'Чёрный пояс с бизоном', type:'belt', level:27, price:1540, image:'images/items/belt/bull_black.png?1', image_mini:'images/items/belt/mini/bull_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:7, shot:8}, attributes:{flexibility:2}}, set:{key:null, name:null}, shop:'shop'};\
items[11046] = {item_id:11046, nshort:'bull_p1', name:'Знатный пояс с бизоном', type:'belt', level:28, price:2940, image:'images/items/belt/bull_p1.png?1', image_mini:'images/items/belt/mini/bull_p1.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:8, trade:8}, attributes:{charisma:2, dexterity:2}}, set:{key:null, name:null}, shop:'shop'};\
items[11047] = {item_id:11047, nshort:'bull_fine', name:'Пояс с бизоном Билла Хикока', type:'belt', level:30, price:3210, image:'images/items/belt/bull_fine.png?1', image_mini:'images/items/belt/mini/bull_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{animal:5, swim:10, hide:10, ride:10}, attributes:{strength:1}}, set:{key:null, name:null}, shop:'drop'};\
\
items[11050] = {item_id:11050, nshort:'studs_grey', name:'Серый клёпаный ремень', type:'belt', level:27, price:780, image:'images/items/belt/studs_grey.png?1', image_mini:'images/items/belt/mini/studs_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{reflex:4, health:10}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[11051] = {item_id:11051, nshort:'studs_yellow', name:'Жёлтый клёпаный ремень', type:'belt', level:28, price:2220, image:'images/items/belt/studs_yellow.png?1', image_mini:'images/items/belt/mini/studs_yellow.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{finger_dexterity:11, swim:10}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[11052] = {item_id:11052, nshort:'studs_blue', name:'Синий клёпаный ремень', type:'belt', level:28, price:2100, image:'images/items/belt/studs_blue.png?1', image_mini:'images/items/belt/mini/studs_blue.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{aim:7, dodge:7}, attributes:{dexterity:1, flexibility:1}}, set:{key:null, name:null}, shop:'shop'};\
items[11053] = {item_id:11053, nshort:'studs_green', name:'Зелёный клёпаный ремень', type:'belt', level:30, price:2280, image:'images/items/belt/studs_green.png?1', image_mini:'images/items/belt/mini/studs_green.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{endurance:19}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[11054] = {item_id:11054, nshort:'studs_brown', name:'Коричневый клёпаный ремень', type:'belt', level:30, price:2340, image:'images/items/belt/studs_brown.png?1', image_mini:'images/items/belt/mini/studs_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tough:10, punch:12}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[11055] = {item_id:11055, nshort:'studs_black', name:'Чёрный клёпаный ремень', type:'belt', level:31, price:2430, image:'images/items/belt/studs_black.png?1', image_mini:'images/items/belt/mini/studs_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{reflex:12, ride:11}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[11056] = {item_id:11056, nshort:'studs_p1', name:'Знатный клёпаный ремень', type:'belt', level:32, price:3640, image:'images/items/belt/studs_p1.png?1', image_mini:'images/items/belt/mini/studs_p1.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{animal:12, pitfall:12, hide:10}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[11057] = {item_id:11057, nshort:'studs_fine', name:'Клёпаный ремень Сэма Хьюстона', type:'belt', level:35, price:3990, image:'images/items/belt/studs_fine.png?1', image_mini:'images/items/belt/mini/studs_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{shot:11, aim:11, ride:12, punch:11}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
\
items[11060] = {item_id:11060, nshort:'horse_grey', name:'Серый пояс с лошадью', type:'belt', level:31, price:840, image:'images/items/belt/horse_grey.png?1', image_mini:'images/items/belt/mini/horse_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{dodge:8}, attributes:{dexterity:2}}, set:{key:null, name:null}, shop:'shop'};\
items[11061] = {item_id:11061, nshort:'horse_yellow', name:'Жёлтый пояс с лошадью', type:'belt', level:33, price:2430, image:'images/items/belt/horse_yellow.png?1', image_mini:'images/items/belt/mini/horse_yellow.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{charisma:2, dexterity:3, flexibility:2, strength:3}}, set:{key:null, name:null}, shop:'shop'};\
items[11062] = {item_id:11062, nshort:'horse_blue', name:'Синий пояс с лошадью', type:'belt', level:33, price:2370, image:'images/items/belt/horse_blue.png?1', image_mini:'images/items/belt/mini/horse_blue.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{swim:4}, attributes:{charisma:3, flexibility:3}}, set:{key:null, name:null}, shop:'shop'};\
items[11063] = {item_id:11063, nshort:'horse_green', name:'Зелёный пояс с лошадью', type:'belt', level:35, price:2520, image:'images/items/belt/horse_green.png?1', image_mini:'images/items/belt/mini/horse_green.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{finger_dexterity:9, health:8}, attributes:{charisma:2}}, set:{key:null, name:null}, shop:'shop'};\
items[11064] = {item_id:11064, nshort:'horse_brown', name:'Коричневый пояс с лошадью', type:'belt', level:35, price:2520, image:'images/items/belt/horse_brown.png?1', image_mini:'images/items/belt/mini/horse_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{pitfall:5, hide:6}, attributes:{flexibility:1, strength:3}}, set:{key:null, name:null}, shop:'shop'};\
items[11065] = {item_id:11065, nshort:'horse_black', name:'Чёрный пояс с лошадью', type:'belt', level:36, price:2640, image:'images/items/belt/horse_black.png?1', image_mini:'images/items/belt/mini/horse_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{repair:10, swim:9}, attributes:{flexibility:1, strength:1}}, set:{key:null, name:null}, shop:'shop'};\
items[11066] = {item_id:11066, nshort:'horse_p1', name:'Знатный пояс с лошадью', type:'belt', level:37, price:3395, image:'images/items/belt/horse_p1.png?1', image_mini:'images/items/belt/mini/horse_p1.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:5, leadership:6, tough:12}, attributes:{charisma:1, strength:1}}, set:{key:null, name:null}, shop:'shop'};\
items[11067] = {item_id:11067, nshort:'horse_fine', name:'Пояс Сета Буллока с лошадью', type:'belt', level:40, price:4130, image:'images/items/belt/horse_fine.png?1', image_mini:'images/items/belt/mini/horse_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{dodge:8, reflex:8, health:9}, attributes:{dexterity:2, strength:2}}, set:{key:null, name:null}, shop:'drop'};\
\
items[11070] = {item_id:11070, nshort:'eagle_grey', name:'Серый пояс с орлом', type:'belt', level:37, price:885, image:'images/items/belt/eagle_grey.png?1', image_mini:'images/items/belt/mini/eagle_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{animal:5, pitfall:7, build:7}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[11071] = {item_id:11071, nshort:'eagle_yellow', name:'Жёлтый пояс с орлом', type:'belt', level:38, price:2310, image:'images/items/belt/eagle_yellow.png?1', image_mini:'images/items/belt/mini/eagle_yellow.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{hide:11, endurance:11}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[11072] = {item_id:11072, nshort:'eagle_blue', name:'Синий пояс с орлом', type:'belt', level:38, price:2460, image:'images/items/belt/eagle_blue.png?1', image_mini:'images/items/belt/mini/eagle_blue.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:10, finger_dexterity:13}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[11073] = {item_id:11073, nshort:'eagle_green', name:'Зелёный пояс с орлом', type:'belt', level:42, price:2730, image:'images/items/belt/eagle_green.png?1', image_mini:'images/items/belt/mini/eagle_green.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:10, repair:10}, attributes:{charisma:1, flexibility:1}}, set:{key:null, name:null}, shop:'shop'};\
items[11074] = {item_id:11074, nshort:'eagle_brown', name:'Коричневый пояс с орлом', type:'belt', level:42, price:2730, image:'images/items/belt/eagle_brown.png?1', image_mini:'images/items/belt/mini/eagle_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{animal:10, swim:10}, attributes:{charisma:1, flexibility:1}}, set:{key:null, name:null}, shop:'shop'};\
items[11075] = {item_id:11075, nshort:'eagle_black', name:'Чёрный пояс с орлом', type:'belt', level:45, price:2940, image:'images/items/belt/eagle_black.png?1', image_mini:'images/items/belt/mini/eagle_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:13, trade:12, build:5}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[11076] = {item_id:11076, nshort:'eagle_p1', name:'Знатный пояс с орлом', type:'belt', level:45, price:4200, image:'images/items/belt/eagle_p1.png?1', image_mini:'images/items/belt/mini/eagle_p1.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{aim:10, dodge:10, reflex:10}, attributes:{charisma:1, dexterity:1, flexibility:1, strength:1}}, set:{key:null, name:null}, shop:'shop'};\
items[11077] = {item_id:11077, nshort:'eagle_fine', name:'Пояс Аля Сверенгена с орлом', type:'belt', level:48, price:4235, image:'images/items/belt/eagle_fine.png?1', image_mini:'images/items/belt/mini/eagle_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{pitfall:15, shot:8, ride:15}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\
\
items[11080] = {item_id:11080, nshort:'ammo_grey', name:'Серый патронташ', type:'belt', level:44, price:1300, image:'images/items/belt/ammo_grey.png?1', image_mini:'images/items/belt/mini/ammo_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{punch:11}, attributes:{dexterity:1, strength:1}}, set:{key:null, name:null}, shop:'shop'};\
items[11081] = {item_id:11081, nshort:'ammo_yellow', name:'Жёлтый патронташ', type:'belt', level:47, price:3600, image:'images/items/belt/ammo_yellow.png?1', image_mini:'images/items/belt/mini/ammo_yellow.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{repair:10, tough:10, build:10}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[11082] = {item_id:11082, nshort:'ammo_blue', name:'Синий патронташ', type:'belt', level:47, price:3600, image:'images/items/belt/ammo_blue.png?1', image_mini:'images/items/belt/mini/ammo_blue.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:10, finger_dexterity:10, endurance:10}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[11083] = {item_id:11083, nshort:'ammo_green', name:'Зелёный патронташ', type:'belt', level:48, price:3600, image:'images/items/belt/ammo_green.png?1', image_mini:'images/items/belt/mini/ammo_green.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{animal:10, trade:10, tactic:10}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[11084] = {item_id:11084, nshort:'ammo_brown', name:'Коричневый патронташ', type:'belt', level:49, price:4000, image:'images/items/belt/ammo_brown.png?1', image_mini:'images/items/belt/mini/ammo_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:10, shot:10, hide:10, reflex:10}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[11085] = {item_id:11085, nshort:'ammo_black', name:'Чёрный патронташ', type:'belt', level:49, price:4120, image:'images/items/belt/ammo_black.png?1', image_mini:'images/items/belt/mini/ammo_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{swim:10, health:10}, attributes:{dexterity:1, strength:2}}, set:{key:null, name:null}, shop:'shop'};\
items[11086] = {item_id:11086, nshort:'ammo_p1', name:'Знатный патронташ', type:'belt', level:52, price:5805, image:'images/items/belt/ammo_p1.png?1', image_mini:'images/items/belt/mini/ammo_p1.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{aim:15}, attributes:{charisma:3, dexterity:1, flexibility:3}}, set:{key:null, name:null}, shop:'shop'};\
items[11087] = {item_id:11087, nshort:'ammo_fine', name:'Патронташ Джейн-катастрофы', type:'belt', level:57, price:6750, image:'images/items/belt/ammo_fine.png?1', image_mini:'images/items/belt/mini/ammo_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{aim:10, health:10, punch:10}, attributes:{charisma:2, dexterity:2, flexibility:2, strength:2}}, set:{key:null, name:null}, shop:'drop'};\
\
items[11102] = {item_id:11102, nshort:'skull_grey', name:'Серый пояс с черепом', type:'belt', level:57, price:4875, image:'images/items/belt/skull_grey.png?1', image_mini:'images/items/belt/mini/skull_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{punch:5, build:15}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[11103] = {item_id:11103, nshort:'skull_yellow', name:'Жёлтый пояс с черепом', type:'belt', level:60, price:6825, image:'images/items/belt/skull_yellow.png?1', image_mini:'images/items/belt/mini/skull_yellow.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{repair:15, tough:15}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[11104] = {item_id:11104, nshort:'skull_blue', name:'Синий пояс с черепом', type:'belt', level:60, price:4200, image:'images/items/belt/skull_blue.png?1', image_mini:'images/items/belt/mini/skull_blue.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{pitfall:15, endurance:15}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[11105] = {item_id:11105, nshort:'skull_green', name:'Зелёный пояс с черепом', type:'belt', level:65, price:7020, image:'images/items/belt/skull_green.png?1', image_mini:'images/items/belt/mini/skull_green.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:15, finger_dexterity:15}, attributes:{flexibility:1}}, set:{key:null, name:null}, shop:'shop'};\
items[11106] = {item_id:11106, nshort:'skull_brown', name:'Коричневый пояс с черепом', type:'belt', level:65, price:7020, image:'images/items/belt/skull_brown.png?1', image_mini:'images/items/belt/mini/skull_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{animal:15, health:15}, attributes:{dexterity:1}}, set:{key:null, name:null}, shop:'shop'};\
items[11107] = {item_id:11107, nshort:'skull_black', name:'Чёрный пояс с черепом', type:'belt', level:70, price:7560, image:'images/items/belt/skull_black.png?1', image_mini:'images/items/belt/mini/skull_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:15, trade:15}, attributes:{charisma:1, strength:1}}, set:{key:null, name:null}, shop:'shop'};\
items[11108] = {item_id:11108, nshort:'skull_p1', name:'Знатный пояс с черепом', type:'belt', level:70, price:9900, image:'images/items/belt/skull_p1.png?1', image_mini:'images/items/belt/mini/skull_p1.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:15, shot:15, ride:15}, attributes:{charisma:1, dexterity:1, flexibility:1, strength:1}}, set:{key:null, name:null}, shop:'shop'};\
\
items[11110] = {item_id:11110, nshort:'pistols_grey', name:'Серый пояс с пистолетами', type:'belt', level:75, price:7350, image:'images/items/belt/pistols_grey.png?1', image_mini:'images/items/belt/mini/pistols_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{swim:15, reflex:15}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[11111] = {item_id:11111, nshort:'pistols_yellow', name:'Жёлтый пояс с пистолетами', type:'belt', level:85, price:9870, image:'images/items/belt/pistols_yellow.png?1', image_mini:'images/items/belt/mini/pistols_yellow.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{charisma:4, dexterity:5, flexibility:4, strength:5}}, set:{key:null, name:null}, shop:'shop'};\
items[11112] = {item_id:11112, nshort:'pistols_blue', name:'Синий пояс с пистолетами', type:'belt', level:90, price:7975, image:'images/items/belt/pistols_blue.png?1', image_mini:'images/items/belt/mini/pistols_blue.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{hide:15, dodge:25}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[11113] = {item_id:11113, nshort:'pistols_green', name:'Зелёный пояс с пистолетами', type:'belt', level:95, price:11115, image:'images/items/belt/pistols_green.png?1', image_mini:'images/items/belt/mini/pistols_green.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{charisma:6, dexterity:5, flexibility:6, strength:5}}, set:{key:null, name:null}, shop:'shop'};\
items[11114] = {item_id:11114, nshort:'pistols_brown', name:'Коричневый пояс с пистолетами', type:'belt', level:100, price:10725, image:'images/items/belt/pistols_brown.png?1', image_mini:'images/items/belt/mini/pistols_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{repair:15, finger_dexterity:15}, attributes:{charisma:2, dexterity:2, flexibility:2, strength:2}}, set:{key:null, name:null}, shop:'shop'};\
items[11115] = {item_id:11115, nshort:'pistols_black', name:'Чёрный пояс с пистолетами', type:'belt', level:105, price:11700, image:'images/items/belt/pistols_black.png?1', image_mini:'images/items/belt/mini/pistols_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:15, shot:15, reflex:15, punch:15}, attributes:{charisma:1, dexterity:1, flexibility:1, strength:1}}, set:{key:null, name:null}, shop:'shop'};\
items[11116] = {item_id:11116, nshort:'pistols_p1', name:'Знатный пояс с пистолетами', type:'belt', level:110, price:15600, image:'images/items/belt/pistols_p1.png?1', image_mini:'images/items/belt/mini/pistols_p1.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:15, leadership:15, endurance:15, build:15}, attributes:{charisma:3, dexterity:3, flexibility:3, strength:3}}, set:{key:null, name:null}, shop:'shop'};\
\
items[11118] = {item_id:11118, nshort:'greenhorn_belt', name:'Кожаный ремень', type:'belt', level:4, price:375, image:'images/items/belt/greenhorn_belt.png?1', image_mini:'images/items/belt/mini/greenhorn_belt.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:2, shot:3, build:3}, attributes:{}}, set:{key:'greenhorn_set', name:'Набор начинающего'}, shop:'quest'};\
\
\
items[12700] = {item_id:12700, nshort:'adventcal', name:'Рождественский календарь', type:'yield', level:null, price:10, image:'images/items/yield/adventcal.png?1', image_mini:'images/items/yield/adventcal.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[12701] = {item_id:12701, nshort:'xmas_licorice', name:'Лакрица', type:'yield', level:null, price:15, image:'images/items/yield/xmas_licorice.png?1', image_mini:'images/items/yield/xmas_licorice.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[12702] = {item_id:12702, nshort:'xmas_oat', name:'Овёс', type:'yield', level:null, price:32, image:'images/items/yield/xmas_oat.png?1', image_mini:'images/items/yield/xmas_oat.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[12703] = {item_id:12703, nshort:'xmas_cracker', name:'Хлопушка', type:'yield', level:null, price:27, image:'images/items/yield/xmas_cracker.png?1', image_mini:'images/items/yield/xmas_cracker.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[12704] = {item_id:12704, nshort:'xmas_lebkuchen', name:'Пряник', type:'yield', level:null, price:31, image:'images/items/yield/xmas_lebkuchen.png?1', image_mini:'images/items/yield/xmas_lebkuchen.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[12705] = {item_id:12705, nshort:'xmas_cookie', name:'Шоколадное печенье', type:'yield', level:null, price:29, image:'images/items/yield/xmas_cookie.png?1', image_mini:'images/items/yield/xmas_cookie.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[12706] = {item_id:12706, nshort:'xmas_potato', name:'Марципановая картошка', type:'yield', level:null, price:39, image:'images/items/yield/xmas_potato.png?1', image_mini:'images/items/yield/xmas_potato.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[12707] = {item_id:12707, nshort:'xmas_coal', name:'Уголёк', type:'yield', level:null, price:2, image:'images/items/yield/xmas_coal.png?1', image_mini:'images/items/yield/xmas_coal.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[12708] = {item_id:12708, nshort:'xmas_sphere', name:'Стеклянный шарик', type:'yield', level:null, price:35, image:'images/items/yield/xmas_sphere.png?1', image_mini:'images/items/yield/xmas_sphere.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[12709] = {item_id:12709, nshort:'xmas_present', name:'Подарок', type:'yield', level:null, price:39, image:'images/items/yield/xmas_present.png?1', image_mini:'images/items/yield/xmas_present.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[12710] = {item_id:12710, nshort:'xmas_present_mid', name:'Красивый подарок', type:'yield', level:null, price:39, image:'images/items/yield/xmas_present_mid.png?1', image_mini:'images/items/yield/xmas_present_mid.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
items[12711] = {item_id:12711, nshort:'xmas_present_high', name:'Особый подарок', type:'yield', level:null, price:39, image:'images/items/yield/xmas_present_high.png?1', image_mini:'images/items/yield/xmas_present_high.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
\
items[12713] = {item_id:12713, nshort:'xmas_bag', name:'Мешочек с шариками', type:'yield', level:null, price:330, image:'images/items/yield/xmas_bag.png?1', image_mini:'images/items/yield/xmas_bag.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{finger_dexterity:5}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\
\
items[16100] = {item_id:16100, nshort:'fb_aidkit', name:'Аптечка', type:'yield', level:null, price:590, image:'images/items/yield/fb_aidkit.png?1', image_mini:'images/items/yield/fb_aidkit.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
\
items[40000] = {item_id:40000, nshort:'greenhorn_poncho', name:'Шерстяное пончо', type:'body', level:1, price:125, image:'images/items/body/greenhorn_poncho.png?1', image_mini:'images/items/body/mini/greenhorn_poncho.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:3, tough:3}, attributes:{}}, set:{key:'greenhorn_set', name:'Набор начинающего'}, shop:'quest'};\
";

pk2_code += "\
raboty = [];\
raboty[1] = {rus_name:'Выпас свиней', name:'swine', malus:1, navyki:{tough:1,endurance:1,leadership:1,animal:2}, resultaty:{dengi:3, opyt:1, vezenie:0, boom:1, produkty:{700:20}}};\
raboty[2] = {rus_name:'Присмотр за полем', name:'scarecrow', malus:0, navyki:{build:1,shot:1,pitfall:1,tactic:1,animal:1}, resultaty:{dengi:1, opyt:3, vezenie:2, boom:20, produkty:{757:20}}};\
raboty[3] = {rus_name:'Расклейка плакатов', name:'wanted', malus:0, navyki:{endurance:1,ride:1,hide:1,finger_dexterity:1,pitfall:1}, resultaty:{dengi:2, opyt:3, vezenie:0, boom:10, produkty:{743:40}}};\
raboty[4] = {rus_name:'Сбор табака', name:'tabacco', malus:0, navyki:{tough:1,finger_dexterity:2,tactic:1,trade:1}, resultaty:{dengi:6, opyt:1, vezenie:2, boom:2, produkty:{702:100}}};\
raboty[5] = {rus_name:'Сбор хлопка', name:'cotton', malus:1, navyki:{tough:1,endurance:1,finger_dexterity:1,leadership:1,trade:1}, resultaty:{dengi:1, opyt:4, vezenie:0, boom:3, produkty:{704:50}}};\
raboty[6] = {rus_name:'Сбор сахарного тростника', name:'sugar', malus:3, navyki:{punch:1,tough:1,finger_dexterity:1,repair:1,trade:1}, resultaty:{dengi:5, opyt:2, vezenie:4, boom:1, produkty:{703:100}}};\
raboty[7] = {rus_name:'Рыбалка', name:'angle', malus:2, navyki:{hide:1,swim:3,repair:1}, resultaty:{dengi:1, opyt:0, vezenie:6, boom:2, produkty:{705:60, 782:3}}};\
raboty[8] = {rus_name:'Жатва', name:'cereal', malus:10, navyki:{punch:1,tough:1,endurance:1,ride:1,finger_dexterity:1}, resultaty:{dengi:2, opyt:6, vezenie:2, boom:4, produkty:{701:55}}};\
raboty[9] = {rus_name:'Сбор ягод', name:'berry', malus:15, navyki:{tough:2,hide:1,finger_dexterity:2}, resultaty:{dengi:2, opyt:6, vezenie:5, boom:6, produkty:{706:45}}};\
raboty[10] = {rus_name:'Выпас овец', name:'sheeps', malus:11, navyki:{tough:1,endurance:1,leadership:1,animal:2}, resultaty:{dengi:3, opyt:5, vezenie:0, boom:2, produkty:{707:25}}};\
raboty[11] = {rus_name:'Продажа прессы', name:'newspaper', malus:8, navyki:{ride:2,trade:2,appearance:1}, resultaty:{dengi:6, opyt:1, vezenie:2, boom:1, produkty:{744:60}}};\
raboty[12] = {rus_name:'Сенокос', name:'cut', malus:21, navyki:{punch:1,ride:1,finger_dexterity:1,animal:2}, resultaty:{dengi:5, opyt:7, vezenie:3, boom:3, produkty:{765:5}}};\
raboty[13] = {rus_name:'Помол зерна', name:'grinding', malus:24, navyki:{punch:1,tough:1,endurance:1,ride:1,finger_dexterity:1}, resultaty:{dengi:11, opyt:7, vezenie:0, boom:5, produkty:{745:40}}};\
raboty[14] = {rus_name:'Сбор кукурузы', name:'corn', malus:22, navyki:{finger_dexterity:1,tactic:1,trade:1,animal:1,appearance:1}, resultaty:{dengi:4, opyt:7, vezenie:8, boom:5, produkty:{748:25}}};\
raboty[15] = {rus_name:'Сбор фасоли', name:'beans', malus:22, navyki:{endurance:1,finger_dexterity:1,leadership:1,tactic:1,animal:1}, resultaty:{dengi:9, opyt:7, vezenie:4, boom:5, produkty:{746:40}}};\
raboty[16] = {rus_name:'Охрана форта', name:'fort_guard', malus:24, navyki:{reflex:1,shot:1,leadership:1,appearance:2}, resultaty:{dengi:3, opyt:9, vezenie:2, boom:7, produkty:{758:2}}};\
raboty[17] = {rus_name:'Дубление кожи', name:'tanning', malus:39, navyki:{tough:1,endurance:1,swim:1,finger_dexterity:1,trade:1}, resultaty:{dengi:12, opyt:15, vezenie:5, boom:18, produkty:{712:15}}};\
raboty[18] = {rus_name:'Поиск золота', name:'digging', malus:30, navyki:{tough:1,reflex:1,swim:1,trade:2}, resultaty:{dengi:11, opyt:3, vezenie:5, boom:7, produkty:{708:17, 1791:1}}};\
raboty[19] = {rus_name:'Захоронение', name:'grave', malus:75, navyki:{build:1,punch:1,tough:1,endurance:1,ride:1}, resultaty:{dengi:16, opyt:12, vezenie:22, boom:9, produkty:{736:8}}};\
raboty[20] = {rus_name:'Охота на индейку', name:'turkey', malus:42, navyki:{reflex:1,hide:2,shot:1,pitfall:1}, resultaty:{dengi:3, opyt:14, vezenie:7, boom:21, produkty:{709:13}}};\
raboty[21] = {rus_name:'Строительство железной дороги', name:'rail', malus:44, navyki:{build:2,endurance:1,repair:1,leadership:1}, resultaty:{dengi:10, opyt:18, vezenie:5, boom:10, produkty:{766:25}}};\
raboty[22] = {rus_name:'Выпас коров', name:'cow', malus:38, navyki:{ride:2,reflex:1,tactic:1,animal:1}, resultaty:{dengi:5, opyt:17, vezenie:0, boom:11, produkty:{710:15}}};\
raboty[23] = {rus_name:'Ремонт забора', name:'fence', malus:35, navyki:{finger_dexterity:1,repair:2,animal:2}, resultaty:{dengi:7, opyt:11, vezenie:5, boom:6, produkty:{747:11}}};\
raboty[24] = {rus_name:'Лесопилка', name:'saw', malus:63, navyki:{reflex:2,finger_dexterity:2,trade:1}, resultaty:{dengi:23, opyt:12, vezenie:6, boom:32, produkty:{742:10}}};\
raboty[25] = {rus_name:'Выработка камня', name:'stone', malus:52, navyki:{punch:3,endurance:1,reflex:1}, resultaty:{dengi:17, opyt:8, vezenie:9, boom:33, produkty:{716:22}}};\
raboty[26] = {rus_name:'Спрямление русла', name:'straighten', malus:84, navyki:{build:1,swim:3,tactic:1}, resultaty:{dengi:8, opyt:22, vezenie:15, boom:12, produkty:{795:5}}};\
raboty[27] = {rus_name:'Лесоповал', name:'wood', malus:47, navyki:{punch:2,endurance:1,reflex:1,appearance:1}, resultaty:{dengi:18, opyt:5, vezenie:2, boom:21, produkty:{711:25}}};\
raboty[28] = {rus_name:'Орошение', name:'irrigation', malus:44, navyki:{build:1,ride:1,repair:1,leadership:1,tactic:1}, resultaty:{dengi:7, opyt:13, vezenie:15, boom:6, produkty:{736:6}}};\
raboty[29] = {rus_name:'Клеймение скота', name:'brand', malus:49, navyki:{ride:1,reflex:1,pitfall:1,animal:2}, resultaty:{dengi:8, opyt:25, vezenie:0, boom:35, produkty:{740:13}}};\
raboty[30] = {rus_name:'Ограждение пастбища', name:'wire', malus:57, navyki:{build:1,finger_dexterity:2,pitfall:1,animal:1}, resultaty:{dengi:17, opyt:13, vezenie:6, boom:0, produkty:{739:10}}};\
raboty[31] = {rus_name:'Прорыв плотины', name:'dam', malus:53, navyki:{swim:2,tactic:2,animal:1}, resultaty:{dengi:4, opyt:18, vezenie:9, boom:41, produkty:{714:5}}};\
raboty[32] = {rus_name:'Добыча самоцветов', name:'gems', malus:74, navyki:{swim:2,finger_dexterity:1,trade:2}, resultaty:{dengi:25, opyt:7, vezenie:8, boom:4, produkty:{720:8}}};\
raboty[33] = {rus_name:'Разметка приисков', name:'claim', malus:56, navyki:{build:1,endurance:1,swim:1,trade:1,appearance:1}, resultaty:{dengi:31, opyt:4, vezenie:4, boom:29, produkty:{755:25}}};\
raboty[34] = {rus_name:'Ремонт повозок', name:'chuck_wagon', malus:133, navyki:{ride:1,repair:2,leadership:1,trade:1}, resultaty:{dengi:5, opyt:23, vezenie:42, boom:11, produkty:{722:15}}};\
raboty[35] = {rus_name:'Объезд лошадей', name:'break_in', malus:71, navyki:{ride:2,reflex:1,pitfall:1,animal:1}, resultaty:{dengi:13, opyt:32, vezenie:10, boom:52, produkty:{787:5}}};\
raboty[36] = {rus_name:'Торговля', name:'trade', malus:84, navyki:{pitfall:1,trade:2,appearance:2}, resultaty:{dengi:15, opyt:3, vezenie:25, boom:12, produkty:{715:13, 774:1}}};\
raboty[37] = {rus_name:'Прокладка телеграфной линии', name:'mast', malus:74, navyki:{build:2,punch:1,swim:1,repair:1}, resultaty:{dengi:21, opyt:25, vezenie:3, boom:14, produkty:{767:14}}};\
raboty[38] = {rus_name:'Рытьё колодца', name:'spring', malus:102, navyki:{build:1,endurance:1,swim:1,leadership:1,tactic:1}, resultaty:{dengi:9, opyt:33, vezenie:23, boom:19, produkty:{741:10}}};\
raboty[39] = {rus_name:'Охота на бобра', name:'beaver', malus:119, navyki:{hide:2,pitfall:3}, resultaty:{dengi:32, opyt:17, vezenie:6, boom:21, produkty:{714:17, 771:13}}};\
raboty[40] = {rus_name:'Добыча угля', name:'coal', malus:85, navyki:{punch:2,reflex:1,finger_dexterity:1,trade:1}, resultaty:{dengi:30, opyt:14, vezenie:0, boom:13, produkty:{721:37}}};\
raboty[41] = {rus_name:'Типография', name:'print', malus:82, navyki:{tough:1,endurance:1,finger_dexterity:1,repair:1,leadership:1}, resultaty:{dengi:30, opyt:20, vezenie:5, boom:7, produkty:{744:40}}};\
raboty[42] = {rus_name:'Рыбная ловля', name:'fishing', malus:90, navyki:{swim:2,pitfall:2,leadership:1}, resultaty:{dengi:6, opyt:23, vezenie:23, boom:38, produkty:{717:15, 705:5}}};\
raboty[43] = {rus_name:'Строительство вокзала', name:'trainstation', malus:112, navyki:{build:2,finger_dexterity:1,repair:1,leadership:1}, resultaty:{dengi:12, opyt:47, vezenie:7, boom:15, produkty:{759:7}}};\
raboty[44] = {rus_name:'Строительство ветряной мельницы', name:'windmeel', malus:163, navyki:{build:1,endurance:1,ride:1,leadership:1,tactic:1}, resultaty:{dengi:42, opyt:43, vezenie:6, boom:18, produkty:{756:5}}};\
raboty[45] = {rus_name:'Рекогносцировка', name:'explore', malus:111, navyki:{endurance:1,shot:1,ride:1,swim:1,leadership:1}, resultaty:{dengi:1, opyt:45, vezenie:22, boom:37, produkty:{760:15}}};\
raboty[46] = {rus_name:'Сплав леса', name:'float', malus:137, navyki:{reflex:1,swim:3,tactic:1}, resultaty:{dengi:23, opyt:45, vezenie:0, boom:52, produkty:{711:30}}};\
raboty[47] = {rus_name:'Строительство моста', name:'bridge', malus:107, navyki:{build:1,endurance:1,swim:2,repair:1}, resultaty:{dengi:17, opyt:33, vezenie:18, boom:53, produkty:{761:8}}};\
raboty[48] = {rus_name:'Отлов лошадей', name:'springe', malus:134, navyki:{endurance:1,ride:2,animal:2}, resultaty:{dengi:29, opyt:45, vezenie:0, boom:42, produkty:{749:22}}};\
raboty[49] = {rus_name:'Изготовление гробов', name:'coffin', malus:118, navyki:{build:1,reflex:1,repair:2,appearance:1}, resultaty:{dengi:42, opyt:8, vezenie:15, boom:20, produkty:{734:25}}};\
raboty[50] = {rus_name:'Доставка амуниции', name:'dynamite', malus:144, navyki:{ride:1,reflex:1,shot:1,finger_dexterity:1,appearance:1}, resultaty:{dengi:23, opyt:12, vezenie:64, boom:93, produkty:{737:5}}};\
raboty[51] = {rus_name:'Охота на койотов', name:'coyote', malus:140, navyki:{endurance:2,shot:1,pitfall:1,hide:1}, resultaty:{dengi:15, opyt:43, vezenie:26, boom:45, produkty:{718:6}}};\
raboty[52] = {rus_name:'Охота на бизона', name:'buffalo', malus:178, navyki:{ride:1,pitfall:1,leadership:1,tactic:1,animal:1}, resultaty:{dengi:24, opyt:62, vezenie:0, boom:72, produkty:{724:14}}};\
raboty[53] = {rus_name:'Строительство особняка', name:'fort', malus:224, navyki:{build:1,pitfall:1,repair:1,leadership:2}, resultaty:{dengi:33, opyt:71, vezenie:17, boom:35, produkty:{762:3}}};\
raboty[54] = {rus_name:'Торговля с индейцами', name:'indians', malus:223, navyki:{pitfall:1,trade:2,appearance:2}, resultaty:{dengi:11, opyt:14, vezenie:63, boom:34, produkty:{719:13}}};\
raboty[55] = {rus_name:'Вырубка леса', name:'clearing', malus:178, navyki:{punch:2,reflex:1,leadership:1,tactic:1}, resultaty:{dengi:62, opyt:8, vezenie:9, boom:16, produkty:{711:65}}};\
raboty[56] = {rus_name:'Добыча серебра', name:'silver', malus:193, navyki:{punch:1,tough:1,finger_dexterity:1,trade:2}, resultaty:{dengi:76, opyt:8, vezenie:0, boom:32, produkty:{725:17}}};\
raboty[57] = {rus_name:'Охрана дилижанса', name:'diligence_guard', malus:403, navyki:{ride:1,shot:1,repair:1,leadership:2}, resultaty:{dengi:34, opyt:77, vezenie:45, boom:43, produkty:{780:12}}};\
raboty[58] = {rus_name:'Охота на волков', name:'wolf', malus:207, navyki:{hide:2,pitfall:2,animal:1}, resultaty:{dengi:21, opyt:63, vezenie:15, boom:67, produkty:{763:11}}};\
raboty[59] = {rus_name:'Охрана каравана', name:'track', malus:212, navyki:{hide:2,leadership:2,tactic:1}, resultaty:{dengi:10, opyt:60, vezenie:30, boom:33, produkty:{778:12}}};\
raboty[60] = {rus_name:'Конокрадство', name:'ox', malus:237, navyki:{reflex:1,hide:1,pitfall:2,animal:1}, resultaty:{dengi:64, opyt:34, vezenie:18, boom:43, produkty:{787:13}}};\
raboty[61] = {rus_name:'Охрана тюрьмы', name:'guard', malus:221, navyki:{punch:1,reflex:1,shot:1,appearance:2}, resultaty:{dengi:25, opyt:35, vezenie:38, boom:4, produkty:{750:1}}};\
raboty[62] = {rus_name:'Миссионерство', name:'bible', malus:235, navyki:{tough:1,ride:1,trade:1,appearance:2}, resultaty:{dengi:5, opyt:61, vezenie:52, boom:77, produkty:{768:1}}};\
raboty[63] = {rus_name:'Пони-экспресс', name:'ponyexpress', malus:225, navyki:{endurance:1,ride:2,shot:1,animal:1}, resultaty:{dengi:15, opyt:45, vezenie:51, boom:44, produkty:{779:5}}};\
raboty[64] = {rus_name:'Торговля оружием с индейцами', name:'weapons', malus:257, navyki:{hide:1,shot:1,repair:1,trade:2}, resultaty:{dengi:15, opyt:35, vezenie:72, boom:82, produkty:{783:4}}};\
raboty[65] = {rus_name:'Мародёрство', name:'dead', malus:265, navyki:{tough:1,hide:1,finger_dexterity:2,repair:1}, resultaty:{dengi:14, opyt:14, vezenie:90, boom:34, produkty:{774:1,723:1}}};\
raboty[66] = {rus_name:'Охота на гризли', name:'grizzly', malus:280, navyki:{hide:1,shot:1,pitfall:2,animal:1}, resultaty:{dengi:25, opyt:78, vezenie:35, boom:71, produkty:{731:3}}};\
raboty[67] = {rus_name:'Добыча нефти', name:'oil', malus:294, navyki:{build:1,tough:1,endurance:1,leadership:1,trade:1}, resultaty:{dengi:83, opyt:25, vezenie:20, boom:7, produkty:{752:25}}};\
raboty[68] = {rus_name:'Поиски клада', name:'treasure_hunting', malus:293, navyki:{hide:2,repair:2,tactic:1}, resultaty:{dengi:20, opyt:20, vezenie:83, boom:24, produkty:{726:1}}};\
raboty[69] = {rus_name:'Служба в армии', name:'army', malus:298, navyki:{endurance:1,swim:1,shot:1,pitfall:1,appearance:1}, resultaty:{dengi:55, opyt:76, vezenie:17, boom:35, produkty:{727:2}}};\
raboty[70] = {rus_name:'Мелкое воровство', name:'steal', malus:371, navyki:{reflex:1,hide:1,shot:1,pitfall:1,finger_dexterity:1}, resultaty:{dengi:48, opyt:50, vezenie:74, boom:66, produkty:{728:4}}};\
raboty[71] = {rus_name:'Служба наёмником', name:'mercenary', malus:331, navyki:{tough:1,swim:1,shot:1,repair:1,appearance:1}, resultaty:{dengi:92, opyt:52, vezenie:23, boom:65, produkty:{1708:85}}};\
raboty[72] = {rus_name:'Преследование бандитов', name:'bandits', malus:384, navyki:{tough:1,endurance:1,hide:1,leadership:1,tactic:1}, resultaty:{dengi:28, opyt:75, vezenie:85, boom:83, produkty:{729:5}}};\
raboty[73] = {rus_name:'Налёт', name:'aggression', malus:421, navyki:{hide:2,pitfall:1,tactic:1,appearance:1}, resultaty:{dengi:78, opyt:27, vezenie:78, boom:86, produkty:{730:13,774:1}}};\
raboty[74] = {rus_name:'Нападение на дилижанс', name:'diligence_aggression', malus:475, navyki:{shot:1,pitfall:1,leadership:1,tactic:1,appearance:1}, resultaty:{dengi:43, opyt:73, vezenie:95, boom:67, produkty:{733:15}}};\
raboty[75] = {rus_name:'Охота за преступниками', name:'bounty', malus:425, navyki:{punch:1,endurance:1,shot:1,pitfall:1,appearance:1}, resultaty:{dengi:92, opyt:32, vezenie:79, boom:72, produkty:{1756:25}}};\
raboty[76] = {rus_name:'Перевозка заключённых', name:'captured', malus:437, navyki:{endurance:1,reflex:1,hide:1,tactic:2}, resultaty:{dengi:23, opyt:69, vezenie:85, boom:44, produkty:{764:4}}};\
raboty[77] = {rus_name:'Нападение на поезд', name:'train', malus:505, navyki:{endurance:1,hide:1,shot:1,pitfall:1,trade:1}, resultaty:{dengi:67, opyt:87, vezenie:92, boom:96, produkty:{1755:1}}};\
raboty[78] = {rus_name:'Кража со взломом', name:'burglary', malus:517, navyki:{endurance:1,hide:2,tactic:1,trade:1}, resultaty:{dengi:80, opyt:34, vezenie:81, boom:26, produkty:{786:12}}};\
raboty[79] = {rus_name:'Знахарство', name:'quackery', malus:315, navyki:{hide:1,shot:1,pitfall:1,trade:1,appearance:1}, resultaty:{dengi:65, opyt:50, vezenie:52, boom:67, produkty:{794:9}}};\
raboty[80] = {rus_name:'Парламентёрство', name:'peace', malus:366, navyki:{endurance:1,hide:1,shot:1,trade:1,appearance:1}, resultaty:{dengi:33, opyt:68, vezenie:76, boom:44, produkty:{751:8}}};\
raboty[82] = {rus_name:'Речные перевозки', name:'ship', malus:347, navyki:{punch:1,swim:2,leadership:2}, resultaty:{dengi:82, opyt:35, vezenie:15, boom:14, produkty:{788:12}}};\
raboty[83] = {rus_name:'Контрабанда', name:'smuggle', malus:410, navyki:{hide:1,swim:1,shot:1,trade:1,appearance:1}, resultaty:{dengi:62, opyt:45, vezenie:83, boom:56, produkty:{729:22}}};\
raboty[84] = {rus_name:'Строительство ранчо', name:'ranch', malus:220, navyki:{build:2,endurance:1,ride:1,animal:1}, resultaty:{dengi:28, opyt:61, vezenie:17, boom:24, produkty:{784:45}}};\
raboty[85] = {rus_name:'Добыча железа', name:'iron', malus:176, navyki:{build:1,punch:1,reflex:1,finger_dexterity:1,repair:1}, resultaty:{dengi:52, opyt:32, vezenie:15, boom:29, produkty:{790:38, 753:2}}};\
raboty[86] = {rus_name:'Сбор агавы', name:'agave', malus:152, navyki:{punch:1,tough:2,endurance:1,finger_dexterity:1}, resultaty:{dengi:25, opyt:42, vezenie:12, boom:27, produkty:{792:12}}};\
raboty[87] = {rus_name:'Сбор помидоров', name:'tomato', malus:42, navyki:{ride:1,finger_dexterity:1,leadership:1,tactic:1,trade:1}, resultaty:{dengi:13, opyt:12, vezenie:7, boom:11, produkty:{793:33}}};\
raboty[88] = {rus_name:'Набивка подков', name:'horseshoe', malus:92, navyki:{punch:1,ride:2,animal:2}, resultaty:{dengi:14, opyt:28, vezenie:9, boom:23, produkty:{754:22}}};\
raboty[90] = {rus_name:'Тушение пожара', name:'fire', malus:228, navyki:{build:1,tough:1,reflex:1,leadership:1,tactic:1}, resultaty:{dengi:15, opyt:41, vezenie:65, boom:45, produkty:{781:2}}};\
raboty[91] = {rus_name:'Сбор апельсинов', name:'orange', malus:66, navyki:{endurance:1,reflex:1,pitfall:1,repair:1,tactic:1}, resultaty:{dengi:14, opyt:25, vezenie:10, boom:21, produkty:{791:25}}};\
raboty[92] = {rus_name:'Чистка хлева', name:'muck_out', malus:7, navyki:{tough:1,ride:1,repair:1,animal:2}, resultaty:{dengi:4, opyt:5, vezenie:2, boom:6, produkty:{797:5}}};\
raboty[93] = {rus_name:'Чистка обуви', name:'shoes', malus:0, navyki:{hide:1,pitfall:1,finger_dexterity:1,trade:1,appearance:1}, resultaty:{dengi:3, opyt:2, vezenie:3, boom:2, produkty:{789:35}}};\
\
raboty[94] = {rus_name:'Штопка носков', name:'socks_darn', malus:0, navyki:{tough:2,endurance:1,finger_dexterity:2}, resultaty:{dengi:1, opyt:4, vezenie:0, boom:2, produkty:{1807:75}}};\
raboty[95] = {rus_name:'Уборка картошки', name:'potatoe', malus:112, navyki:{tough:2,endurance:2,finger_dexterity:1}, resultaty:{dengi:8, opyt:53, vezenie:5, boom:5, produkty:{1808:75}}};\
raboty[96] = {rus_name:'Кормление скота', name:'feed_animal', malus:146, navyki:{punch:1,tough:1,leadership:1,animal:2}, resultaty:{dengi:17, opyt:60, vezenie:10, boom:20, produkty:{1809:50}}};\
raboty[97] = {rus_name:'Сбор тыквы', name:'pumpkin', malus:174, navyki:{punch:2,tough:1,endurance:1,tactic:1}, resultaty:{dengi:45, opyt:45, vezenie:10, boom:10, produkty:{1810:60}}};\
raboty[98] = {rus_name:'Сбор черники', name:'blueberries', malus:199, navyki:{punch:1,tough:1,ride:2,finger_dexterity:1}, resultaty:{dengi:52, opyt:35, vezenie:35, boom:15, produkty:{1811:65}}};\
raboty[99] = {rus_name:'Озеленение', name:'plant_trees', malus:225, navyki:{build:2,ride:1,finger_dexterity:1,tactic:1}, resultaty:{dengi:34, opyt:25, vezenie:54, boom:25, produkty:{1812:30}}};\
raboty[100] = {rus_name:'Сбор орлиных перьев', name:'gather_feathers', malus:275, navyki:{finger_dexterity:1, repair:2,tactic:1,trade:1}, resultaty:{dengi:47, opyt:23, vezenie:60, boom:15, produkty:{1813:20}}};\
raboty[101] = {rus_name:'Сбор лотоса', name:'lotus_gathering', malus:350, navyki:{tough:1,swim:2,finger_dexterity:1,repair:1}, resultaty:{dengi:54, opyt:45, vezenie:35, boom:20, produkty:{1814:15}}};\
raboty[102] = {rus_name:'Ловля крабов', name:'crab_hunting', malus:375, navyki:{tough:1,reflex:1,swim:2,finger_dexterity:1}, resultaty:{dengi:67, opyt:56, vezenie:35, boom:12, produkty:{1815:10}}};\
raboty[103] = {rus_name:'Преподавание', name:'teaching', malus:400, navyki:{endurance:1,pitfall:1,leadership:1,appearance:2}, resultaty:{dengi:54, opyt:79, vezenie:5, boom:23, produkty:{1816:25}}};\
raboty[104] = {rus_name:'Служба шерифом', name:'sheriff_work', malus:410, navyki:{reflex:1,shot:2,leadership:1,appearance:1}, resultaty:{dengi:67, opyt:76, vezenie:56, boom:45, produkty:{1817:50}}};\
raboty[105] = {rus_name:'Добыча серы', name:'sulfur_gathering', malus:420, navyki:{punch:2,reflex:2,repair:1}, resultaty:{dengi:76, opyt:34, vezenie:78, boom:32, produkty:{1818:10}}};\
raboty[106] = {rus_name:'Сплав по бурному потоку', name:'wildwater', malus:425, navyki:{reflex:2,swim:2,tactic:1}, resultaty:{dengi:84, opyt:74, vezenie:30, boom:57, produkty:{0:25}}};\
raboty[107] = {rus_name:'Шулерство', name:'gambler', malus:430, navyki:{reflex:1,hide:1,shot:1,trade:1,appearance:1}, resultaty:{dengi:67, opyt:57, vezenie:69, boom:63, produkty:{1819:25}}};\
raboty[108] = {rus_name:'Отлов гремучих змей', name:'rattlesnake', malus:440, navyki:{reflex:2,hide:1,pitfall:1,animal:1}, resultaty:{dengi:72, opyt:46, vezenie:71, boom:73, produkty:{1820:15}}};\
raboty[109] = {rus_name:'Добыча селитры', name:'salpeter_gathering', malus:450, navyki:{tough:2,endurance:1,finger_dexterity:1,repair:1}, resultaty:{dengi:62, opyt:53, vezenie:58, boom:27, produkty:{1821:35}}};\
raboty[110] = {rus_name:'Перегонка лошадей', name:'horse_transport', malus:450, navyki:{ride:2,leadership:1,animal:2}, resultaty:{dengi:66, opyt:82, vezenie:69, boom:48, produkty:{1822:10}}};\
raboty[111] = {rus_name:'Организация родео', name:'rodeo', malus:499, navyki:{endurance:1,ride:2,pitfall:1,animal:1}, resultaty:{dengi:76, opyt:56, vezenie:69, boom:78, produkty:{}}};\
raboty[112] = {rus_name:'Коммивояжёрство', name:'travelling_salesman', malus:500, navyki:{tough:1,pitfall:1,trade:2,appearance:1}, resultaty:{dengi:59, opyt:46, vezenie:97, boom:67, produkty:{}}};\
raboty[113] = {rus_name:'Брачный аферист', name:'con_artist', malus:520, navyki:{endurance:1,pitfall:1,tactic:1,trade:1,appearance:1}, resultaty:{dengi:78, opyt:89, vezenie:35, boom:83, produkty:{1836:2}}};\
raboty[114] = {rus_name:'Охота на пуму', name:'cougar', malus:540, navyki:{shot:2,pitfall:1,tactic:1,animal:1}, resultaty:{dengi:46, opyt:89, vezenie:39, boom:93, produkty:{1824:20}}};\
raboty[115] = {rus_name:'Доставка спиртного', name:'alcohol', malus:600, navyki:{ride:1,hide:2,shot:1,leadership:1}, resultaty:{dengi:74, opyt:91, vezenie:34, boom:56, produkty:{1826:50}}};\
raboty[116] = {rus_name:'Добыча свинца', name:'lead_gathering', malus:620, navyki:{punch:1,finger_dexterity:1,repair:2,leadership:1}, resultaty:{dengi:89, opyt:72, vezenie:22, boom:72, produkty:{1827:30}}};\
raboty[117] = {rus_name:'Поиск редких самоцветов', name:'gem_gathering', malus:640, navyki:{punch:2,endurance:1,shot:1,repair:1}, resultaty:{dengi:91, opyt:78, vezenie:23, boom:77, produkty:{0:20}}};\
raboty[118] = {rus_name:'Сооружение миссии', name:'mission', malus:570, navyki:{build:2,punch:1,endurance:1,repair:1}, resultaty:{dengi:92, opyt:82, vezenie:54, boom:38, produkty:{1831:3}}};\
raboty[119] = {rus_name:'Строительство казино', name:'casino', malus:650, navyki:{build:3,repair:1,leadership:1}, resultaty:{dengi:78, opyt:92, vezenie:23, boom:45, produkty:{1832:10}}};\
raboty[120] = {rus_name:'Служба шерифом округа', name:'marshall', malus:700, navyki:{ride:1,shot:2,pitfall:1,appearance:1}, resultaty:{dengi:87, opyt:90, vezenie:60, boom:94, produkty:{1833:1}}};\
raboty[121] = {rus_name:'Борьба с бандитизмом', name:'shatter_gang', malus:725, navyki:{endurance:1,hide:2,pitfall:1,tactic:1}, resultaty:{dengi:84, opyt:70, vezenie:89, boom:99, produkty:{0:10}}};\
raboty[122] = {rus_name:'Ограбление банка', name:'bankrobbery', malus:740, navyki:{hide:2,pitfall:1,leadership:1,trade:1}, resultaty:{dengi:93, opyt:84, vezenie:30, boom:89, produkty:{}}};\
raboty[123] = {rus_name:'Освобождение рабов', name:'free_slaves', malus:750, navyki:{swim:1,shot:1,leadership:1,tactic:1,appearance:1}, resultaty:{dengi:84, opyt:93, vezenie:28, boom:92, produkty:{1834:5}}};\
raboty[124] = {rus_name:'Выступление в шоу Баффало Билла', name:'buffelo_bill', malus:800, navyki:{ride:1,shot:1,animal:1,appearance:2}, resultaty:{dengi:92, opyt:94, vezenie:65, boom:70, produkty:{1835:5}}};\
\
raboty[125] = {rus_name:'!СОН-жизнь', name:'health', malus:0, navyki:{health:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:0, produkty:{}}};\
\
raboty[131] = {rus_name:'!Строительство в городе/форте', name:'build', malus:0, navyki:{build:3,repair:1,leadership:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:0, produkty:{}}};\
\
raboty[133] = {rus_name:'_Форт. Атака', name:'attack', malus:0, navyki:{aim:.5,dodge:.5,endurance:1,leadership:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\
raboty[134] = {rus_name:'_Форт. Атака (меткость)', name:'attack', malus:0, navyki:{aim:1,dodge:.001,endurance:1,leadership:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\
raboty[135] = {rus_name:'_Форт. Атака (уворот)', name:'attack', malus:0, navyki:{aim:.001,dodge:1,endurance:1,leadership:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\
raboty[136] = {rus_name:'_Форт. Защита', name:'defend', malus:0, navyki:{aim:.5,dodge:.5,hide:1,leadership:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:50, produkty:{}}};\
raboty[137] = {rus_name:'_Форт. Защита (меткость)', name:'defend', malus:0, navyki:{aim:1,dodge:.001,hide:1,leadership:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:50, produkty:{}}};\
raboty[138] = {rus_name:'_Форт. Защита (уворот)', name:'defend', malus:0, navyki:{aim:.001,dodge:1,hide:1,leadership:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:50, produkty:{}}};\
\
raboty[140] = {rus_name:'!СОН-энергия', name:'energy', malus:-1, navyki:{}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:0, produkty:{}}};\
raboty[141] = {rus_name:'!Передвижение', name:'moving', malus:-1, navyki:{}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:0, produkty:{}}};\
\
raboty[151] = {rus_name:'vs Стрелок-стрелок атака', name:'sh_vs_sh_at', malus:0, navyki:{aim:1,dodge:1,shot:1,reflex:1,tough:0.5,appearance:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\
raboty[152] = {rus_name:'vs Ударник-стрелок атака', name:'me_vs_sh_at', malus:0, navyki:{aim:1,dodge:1,punch:1,reflex:1,tough:0.5,appearance:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\
raboty[153] = {rus_name:'vs Стрелок-стрелок защита', name:'sh_vs_sh_de', malus:0, navyki:{aim:1,dodge:1,shot:1,reflex:1,tough:0.5,tactic:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\
raboty[154] = {rus_name:'vs Ударник-стрелок защита', name:'me_vs_sh_de', malus:0, navyki:{aim:1,dodge:1,punch:1,reflex:1,tough:0.5,tactic:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\
raboty[155] = {rus_name:'vs Стрелок-ударник атака', name:'sh_vs_me_at', malus:0, navyki:{aim:1,dodge:1,shot:1,tough:1,reflex:0.5,appearance:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\
raboty[156] = {rus_name:'vs Ударник-ударник атака', name:'me_vs_me_at', malus:0, navyki:{aim:1,dodge:1,punch:1,tough:1,reflex:0.5,appearance:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\
raboty[157] = {rus_name:'vs Стрелок-ударник защита', name:'sh_vs_me_de', malus:0, navyki:{aim:1,dodge:1,shot:1,tough:1,reflex:0.5,tactic:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\
raboty[158] = {rus_name:'vs Ударник-ударник защита', name:'me_vs_me_de', malus:0, navyki:{aim:1,dodge:1,punch:1,tough:1,reflex:0.5,tactic:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\
raboty[159] = {rus_name:'vs Стрелок-все защита', name:'sh_vs_al_de', malus:0, navyki:{aim:1,dodge:1,shot:1,tough:0.75,reflex:0.75,tactic:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\
raboty[160] = {rus_name:'vs Ударник-все защита', name:'me_vs_al_de', malus:0, navyki:{aim:1,dodge:1,punch:1,tough:0.75,reflex:0.75,tactic:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\
raboty[161] = {rus_name:'vs2 Стрелок-стрелок атака', name:'sh_vs2_sh_at', malus:0, navyki:{aim:1,dodge:1,shot:1,reflex:1,tough:0.5,appearance:1,health:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\
raboty[162] = {rus_name:'vs2 Ударник-стрелок атака', name:'me_vs2_sh_at', malus:0, navyki:{aim:1,dodge:1,punch:1,reflex:1,tough:0.5,appearance:1,health:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\
raboty[163] = {rus_name:'vs2 Стрелок-стрелок защита', name:'sh_vs2_sh_de', malus:0, navyki:{aim:1,dodge:1,shot:1,reflex:1,tough:0.5,tactic:1,health:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\
raboty[164] = {rus_name:'vs2 Ударник-стрелок защита', name:'me_vs2_sh_de', malus:0, navyki:{aim:1,dodge:1,punch:1,reflex:1,tough:0.5,tactic:1,health:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\
raboty[165] = {rus_name:'vs2 Стрелок-ударник атака', name:'sh_vs2_me_at', malus:0, navyki:{aim:1,dodge:1,shot:1,tough:1,reflex:0.5,appearance:1,health:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\
raboty[166] = {rus_name:'vs2 Ударник-ударник атака', name:'me_vs2_me_at', malus:0, navyki:{aim:1,dodge:1,punch:1,tough:1,reflex:0.5,appearance:1,health:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\
raboty[167] = {rus_name:'vs2 Стрелок-ударник защита', name:'sh_vs2_me_de', malus:0, navyki:{aim:1,dodge:1,shot:1,tough:1,reflex:0.5,tactic:1,health:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\
raboty[168] = {rus_name:'vs2 Ударник-ударник защита', name:'me_vs2_me_de', malus:0, navyki:{aim:1,dodge:1,punch:1,tough:1,reflex:0.5,tactic:1,health:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\
raboty[169] = {rus_name:'vs2 Стрелок-все защита', name:'sh_vs2_al_de', malus:0, navyki:{aim:1,dodge:1,shot:1,tough:0.75,reflex:0.75,tactic:1,health:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\
raboty[170] = {rus_name:'vs2 Ударник-все защита', name:'me_vs2_al_de', malus:0, navyki:{aim:1,dodge:1,punch:1,tough:0.75,reflex:0.75,tactic:1,health:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\
";

pk2_code += "\
komplekty={};\
\
komplekty.set_farmer=[];\
komplekty.set_farmer[1] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.set_farmer[2] = {bonus:{attributes:{flexibility:1, strength:1}, skills:{}}, speed:null, raboty:[]};\
komplekty.set_farmer[2].raboty[8]=10;komplekty.set_farmer[2].raboty[12]=10;komplekty.set_farmer[2].raboty[13]=10;\
komplekty.set_farmer[3] = {bonus:{attributes:{flexibility:1, strength:1, dexterity:1, charisma:1}, skills:{}}, speed:null, raboty:[]};\
komplekty.set_farmer[3].raboty[8]=10;komplekty.set_farmer[3].raboty[12]=10;komplekty.set_farmer[3].raboty[13]=10;\
komplekty.set_farmer[3].raboty[88]=20;komplekty.set_farmer[3].raboty[30]=20;komplekty.set_farmer[3].raboty[22]=20;\
komplekty.set_farmer[4] = {bonus:{attributes:{flexibility:2, strength:2, dexterity:2, charisma:2}, skills:{}}, speed:null, raboty:[]};\
komplekty.set_farmer[4].raboty[8]=10;komplekty.set_farmer[4].raboty[12]=10;komplekty.set_farmer[4].raboty[13]=10;\
komplekty.set_farmer[4].raboty[88]=20;komplekty.set_farmer[4].raboty[30]=20;komplekty.set_farmer[4].raboty[22]=20;\
komplekty.set_farmer[4].raboty[48]=40;komplekty.set_farmer[4].raboty[84]=40;komplekty.set_farmer[4].raboty[44]=40;\
komplekty.set_farmer[5] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.set_farmer[6] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.set_farmer[7] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.set_farmer[8] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
\
komplekty.set_indian=[];\
komplekty.set_indian[1] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.set_indian[2] = {bonus:{attributes:{flexibility:2}, skills:{hide:8}}, speed:0.8696, raboty:[]};\
komplekty.set_indian[2].raboty[51]=30;\
komplekty.set_indian[3] = {bonus:{attributes:{flexibility:5}, skills:{hide:8, swim:8}}, speed:0.7692, raboty:[]};\
komplekty.set_indian[3].raboty[51]=30;komplekty.set_indian[3].raboty[52]=40;\
komplekty.set_indian[4] = {bonus:{attributes:{flexibility:8}, skills:{hide:8, swim:8, pitfall:8}}, speed:0.6944, raboty:[]};\
komplekty.set_indian[4].raboty[51]=30;komplekty.set_indian[4].raboty[52]=40;komplekty.set_indian[4].raboty[58]=50;\
komplekty.set_indian[5] = {bonus:{attributes:{flexibility:12}, skills:{hide:8, swim:8, pitfall:8, animal:8}}, speed:0.625, raboty:[]};\
komplekty.set_indian[5].raboty[51]=30;komplekty.set_indian[5].raboty[52]=40;komplekty.set_indian[5].raboty[58]=50;;komplekty.set_indian[5].raboty[66]=60;\
komplekty.set_indian[6] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.set_indian[7] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.set_indian[8] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
\
komplekty.set_mexican=[];\
komplekty.set_mexican[1] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.set_mexican[2] = {bonus:{attributes:{strength:1}, skills:{}}, speed:0.8929, raboty:[]};\
komplekty.set_mexican[3] = {bonus:{attributes:{strength:2}, skills:{}}, speed:0.8065, raboty:[]};\
komplekty.set_mexican[3].raboty[86]=60;\
komplekty.set_mexican[4] = {bonus:{attributes:{strength:4}, skills:{}}, speed:0.7353, raboty:[]};\
komplekty.set_mexican[4].raboty[86]=60;komplekty.set_mexican[4].raboty[67]=70;\
komplekty.set_mexican[5] = {bonus:{attributes:{strength:6}, skills:{}}, speed:0.6757, raboty:[]};\
komplekty.set_mexican[5].raboty[86]=60;komplekty.set_mexican[5].raboty[67]=70;komplekty.set_mexican[5].raboty[83]=80;\
komplekty.set_mexican[6] = {bonus:{attributes:{strength:9}, skills:{}}, speed:0.625, raboty:[]};\
komplekty.set_mexican[6].raboty[86]=60;komplekty.set_mexican[6].raboty[67]=70;komplekty.set_mexican[6].raboty[83]=80;komplekty.set_mexican[6].raboty[50]=90;\
komplekty.set_mexican[7] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.set_mexican[8] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
\
komplekty.set_quackery=[];\
komplekty.set_quackery[1] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.set_quackery[2] = {bonus:{attributes:{dexterity:1}, skills:{endurance:5, trade:5}}, speed:null, raboty:[]};\
komplekty.set_quackery[2].raboty[79]=30;\
komplekty.set_quackery[3] = {bonus:{attributes:{dexterity:2}, skills:{endurance:10, trade:10}}, speed:null, raboty:[]};\
komplekty.set_quackery[3].raboty[79]=60;\
komplekty.set_quackery[4] = {bonus:{attributes:{dexterity:4}, skills:{endurance:15, trade:15}}, speed:null, raboty:[]};\
komplekty.set_quackery[4].raboty[79]=90;\
komplekty.set_quackery[5] = {bonus:{attributes:{dexterity:6}, skills:{endurance:20, trade:20}}, speed:null, raboty:[]};\
komplekty.set_quackery[5].raboty[79]=120;\
komplekty.set_quackery[6] = {bonus:{attributes:{dexterity:9}, skills:{endurance:20, trade:20, reflex:18, tough:18, aim:18, shot:18}}, speed:null, raboty:[]};\
komplekty.set_quackery[6].raboty[79]=120;\
komplekty.set_quackery[7] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.set_quackery[8] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
\
komplekty.set_pilgrim_male=[];\
komplekty.set_pilgrim_male[1] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.set_pilgrim_male[2] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.set_pilgrim_male[2].raboty[131]=5;\
komplekty.set_pilgrim_male[3] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.set_pilgrim_male[3].raboty[131]=15;\
komplekty.set_pilgrim_male[4] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.set_pilgrim_male[4].raboty[131]=30;\
komplekty.set_pilgrim_male[5] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.set_pilgrim_male[5].raboty[131]=50;komplekty.set_pilgrim_male[5].raboty[62]=150;\
komplekty.set_pilgrim_male[6] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.set_pilgrim_male[7] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.set_pilgrim_male[8] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
\
komplekty.set_pilgrim_female=[];\
komplekty.set_pilgrim_female[1] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.set_pilgrim_female[2] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.set_pilgrim_female[2].raboty[131]=5;\
komplekty.set_pilgrim_female[3] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.set_pilgrim_female[3].raboty[131]=15;\
komplekty.set_pilgrim_female[4] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.set_pilgrim_female[4].raboty[131]=30;\
komplekty.set_pilgrim_female[5] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.set_pilgrim_female[5].raboty[131]=50;komplekty.set_pilgrim_female[5].raboty[62]=150;\
komplekty.set_pilgrim_female[6] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.set_pilgrim_female[7] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.set_pilgrim_female[8] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
\
komplekty.set_gentleman=[];\
komplekty.set_gentleman[1] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.set_gentleman[2] = {bonus:{attributes:{charisma:1}, skills:{appearance:8}}, speed:null, raboty:[]};\
for (i=1;i<125;++i) {komplekty.set_gentleman[2].raboty[i]=5};komplekty.set_gentleman[2].raboty[131]=5;\
komplekty.set_gentleman[3] = {bonus:{attributes:{charisma:3}, skills:{appearance:8, leadership:8}}, speed:null, raboty:[]};\
for (i=1;i<125;++i) {komplekty.set_gentleman[3].raboty[i]=15};komplekty.set_gentleman[3].raboty[131]=15;\
komplekty.set_gentleman[4] = {bonus:{attributes:{charisma:6}, skills:{appearance:8, leadership:8, trade:8}}, speed:null, raboty:[]};\
for (i=1;i<125;++i) {komplekty.set_gentleman[4].raboty[i]=30};komplekty.set_gentleman[4].raboty[131]=30;\
komplekty.set_gentleman[5] = {bonus:{attributes:{charisma:10}, skills:{appearance:16, leadership:8, trade:8}}, speed:null, raboty:[]};\
for (i=1;i<125;++i) {komplekty.set_gentleman[5].raboty[i]=50};komplekty.set_gentleman[5].raboty[131]=50;\
komplekty.set_gentleman[6] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.set_gentleman[7] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.set_gentleman[8] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
\
komplekty.set_dancer=[];\
komplekty.set_dancer[1] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.set_dancer[2] = {bonus:{attributes:{charisma:2}, skills:{appearance:10}}, speed:null, raboty:[]};\
for (i=1;i<125;++i) {komplekty.set_dancer[2].raboty[i]=5};komplekty.set_dancer[2].raboty[131]=5;\
komplekty.set_dancer[3] = {bonus:{attributes:{charisma:5}, skills:{appearance:10, animal:10}}, speed:null, raboty:[]};\
for (i=1;i<125;++i) {komplekty.set_dancer[3].raboty[i]=15};komplekty.set_dancer[3].raboty[131]=15;\
komplekty.set_dancer[4] = {bonus:{attributes:{charisma:9}, skills:{appearance:10, animal:10, finger_dexterity:12}}, speed:null, raboty:[]};\
for (i=1;i<125;++i) {komplekty.set_dancer[4].raboty[i]=30};komplekty.set_dancer[4].raboty[131]=30;\
komplekty.set_dancer[5] = {bonus:{attributes:{charisma:11},skills:{endurance :6, appearance:16, animal:10, finger_dexterity:12}}, speed:null, raboty:[]};\
for (i=1;i<125;++i) {komplekty.set_dancer[5].raboty[i]=50};komplekty.set_dancer[5].raboty[131]=50;\
komplekty.set_dancer[6] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.set_dancer[7] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.set_dancer[8] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
\
komplekty.fireworker_set=[];\
komplekty.fireworker_set[1] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.fireworker_set[1].raboty[90]=15;\
komplekty.fireworker_set[2] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.fireworker_set[3] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.fireworker_set[4] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.fireworker_set[5] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.fireworker_set[6] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.fireworker_set[7] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.fireworker_set[8] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
\
komplekty.gold_set=[];\
komplekty.gold_set[1] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.gold_set[2] = {bonus:{attributes:{}, skills:{health:8}}, speed:0.8333, raboty:[]};\
for (i=1;i<125;++i) {komplekty.gold_set[2].raboty[i]=25};komplekty.gold_set[2].raboty[131]=25;\
komplekty.gold_set[3] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.gold_set[4] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.gold_set[5] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.gold_set[6] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.gold_set[7] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.gold_set[8] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
\
komplekty.greenhorn_set=[];\
komplekty.greenhorn_set[1] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.greenhorn_set[2] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.greenhorn_set[2].raboty[6]=10;\
komplekty.greenhorn_set[3] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.greenhorn_set[3].raboty[6]=10;komplekty.greenhorn_set[3].raboty[27]=20;\
komplekty.greenhorn_set[4] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.greenhorn_set[4].raboty[6]=10;komplekty.greenhorn_set[4].raboty[27]=20;komplekty.greenhorn_set[4].raboty[17]=20;\
komplekty.greenhorn_set[5] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.greenhorn_set[5].raboty[6]=10;komplekty.greenhorn_set[5].raboty[27]=20;komplekty.greenhorn_set[5].raboty[17]=20;komplekty.greenhorn_set[5].raboty[20]=20;\
komplekty.greenhorn_set[6] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.greenhorn_set[6].raboty[6]=10;komplekty.greenhorn_set[6].raboty[27]=20;komplekty.greenhorn_set[6].raboty[17]=20;komplekty.greenhorn_set[6].raboty[20]=20;komplekty.greenhorn_set[6].raboty[22]=20;\
komplekty.greenhorn_set[7] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.greenhorn_set[7].raboty[6]=10;komplekty.greenhorn_set[7].raboty[27]=20;komplekty.greenhorn_set[7].raboty[17]=20;komplekty.greenhorn_set[7].raboty[20]=20;komplekty.greenhorn_set[7].raboty[22]=20;\
for (i=1;i<125;++i) {komplekty.greenhorn_set[7].raboty[i]=5};komplekty.greenhorn_set[7].raboty[130]=5;\
komplekty.greenhorn_set[8] = {bonus:{attributes:{strength:1, charisma:1}, skills:{}}, speed:0.8333, raboty:[]};\
komplekty.greenhorn_set[8].raboty[6]=10;komplekty.greenhorn_set[8].raboty[27]=20;komplekty.greenhorn_set[8].raboty[17]=20;komplekty.greenhorn_set[8].raboty[20]=20;komplekty.greenhorn_set[8].raboty[22]=20;\
for (i=1;i<125;++i) {komplekty.greenhorn_set[8].raboty[i]=15};komplekty.greenhorn_set[8].raboty[130]=15;\
";

// навыки характеристики
pk2_code += "\
pk2_vse_navyki=['build' ,'punch' ,'tough' ,'endurance' ,'health' ,'ride' ,'reflex' ,'dodge' ,'hide' ,'swim' ,'aim' ,'shot' ,'pitfall' ,'finger_dexterity' ,'repair' ,'leadership' ,'tactic' ,'trade' ,'animal' ,'appearance'];\
pk2_vse_kharakteristiki=['strength', 'flexibility', 'dexterity', 'charisma'];\
";

// ================== НАЧАЛО ФУКЦИЙ ==================

aWindow.assign_citem = function (tid, obj){
	aWindow.items[tid] = {item_id:tid, nshort:obj.short, name:obj.name, type:obj.type, level:obj.level, price:obj.price, image:obj.image, image_mini:obj.image_mini, characterClass:obj.characterClass, characterSex:obj.characterSex, speed:obj.speed, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};
    for (zz = aWindow.pk2_vse_navyki.length-1;zz >=0;--zz){
        ss = aWindow.pk2_vse_navyki[zz];
	    if (obj.bonus.skills[ss])
	        aWindow.items[tid].bonus.skills[ss]=obj.bonus.skills[ss];
	}
    for (zz = aWindow.pk2_vse_kharakteristiki.length-1;zz >=0;--zz){
        aa = aWindow.pk2_vse_kharakteristiki[zz];
        if (obj.bonus.attributes[aa])
	        aWindow.items[tid].bonus.attributes[aa]=obj.bonus.attributes[aa];
	}
	if (obj.set){
	    aWindow.items[tid].set.key = obj.set.key;
	    aWindow.items[tid].set.name = obj.set.name;
	}
}

aWindow.compare_citem = function (tid, item){
	soft = true;
	hard = true;
	if (aWindow.items[tid].item_id!=item.item_id) return;
	if (aWindow.items[tid].nshort!=item.short){hard=false;aWindow.items[tid].nshort=item.short};
	if (aWindow.items[tid].name!=item.name){soft=false;aWindow.items[tid].name=item.name};
	if (aWindow.items[tid].type!=item.type){hard=false;aWindow.items[tid].type=item.type}
	if (aWindow.items[tid].level!=item.level){hard=false;aWindow.items[tid].level=item.level}
	if (aWindow.items[tid].price!=item.price){hard=false;aWindow.items[tid].price=item.price}
	if (aWindow.items[tid].image!=item.image){hard=false;aWindow.items[tid].image=item.image}
	if (aWindow.items[tid].image_mini!=item.image_mini){hard=false;aWindow.items[tid].image_mini=item.image_mini}
	if (aWindow.items[tid].characterClass!=item.characterClass){hard=false;aWindow.items[tid].characterClass=item.characterClass}
	if (aWindow.items[tid].characterSex!=item.characterSex){hard=false;aWindow.items[tid].characterSex=item.characterSex}
	if (aWindow.items[tid].speed!=item.speed){hard=false;aWindow.items[tid].speed=item.speed}
    
    for (zz = aWindow.pk2_vse_navyki.length-1;zz >=0;--zz){
        num_index = aWindow.pk2_vse_navyki[zz];
        if (item.bonus.skills[num_index]&&aWindow.items[tid].bonus.skills[num_index]){
            if (item.bonus.skills[num_index]!=aWindow.items[tid].bonus.skills[num_index]){
                hard=false;
                break;
            }
        }
        else if (item.bonus.skills[num_index]||aWindow.items[tid].bonus.skills[num_index]){
            hard=false;
            break;
        }
    }    
    for (zz = aWindow.pk2_vse_kharakteristiki.length-1;zz >=0;--zz){
        num_index = aWindow.pk2_vse_kharakteristiki[zz];
        if (item.bonus.attributes[num_index]&&aWindow.items[tid].bonus.attributes[num_index]){
            if (item.bonus.attributes[num_index]!=aWindow.items[tid].bonus.attributes[num_index]){
                hard=false;
                break;
            }
        }
        else if (item.bonus.attributes[num_index]||aWindow.items[tid].bonus.attributes[num_index]){
            hard=false;
            break;
        }
    }    
    
	if (!item.set){
	    if (aWindow.items[tid].set.key){ hard=false;}
	}
	else{
	    if (item.set.key!=aWindow.items[tid].set.key){
	        hard=false;
	    }
	    if (item.set.name!=aWindow.items[tid].set.name){
	        soft=false;
	    }
	}
	res={h:hard,s:soft};
	return res;
}

aWindow.print_citem = function (tid){
	result='';
	result += 'items[' + aWindow.items[tid].item_id + '] = {item_id:' + aWindow.items[tid].item_id + ', nshort:\'' + aWindow.items[tid].nshort;
	result += '\', name:\'' + aWindow.items[tid].name + '\', type:\'' + aWindow.items[tid].type + '\', level:' + aWindow.items[tid].level;
	result += ', price:' + aWindow.items[tid].price + ', image:\'' + aWindow.items[tid].image + '\', image_mini:\'' + aWindow.items[tid].image_mini + '\', characterClass:';
	cc = aWindow.items[tid].characterClass ? '\'' + aWindow.items[tid].characterClass + '\'' : null;
	result += cc + ', characterSex:';
	cs = aWindow.items[tid].characterSex ? '\'' + aWindow.items[tid].characterSex + '\'' : null;
	result += cs + ', speed:' + aWindow.items[tid].speed;
	if (aWindow.items[tid].bonus) {
		result += ', bonus:{skills:';
		ww = false;
		for (zz = aWindow.pk2_vse_navyki.length-1; zz >=0; --zz ){
		    if (aWindow.items[tid].bonus.skills[aWindow.pk2_vse_navyki[zz]]) {
				if (ww) {
					result += ', '
				}
				else {
					ww = true;
					result += '{'
				}
				result += aWindow.pk2_vse_navyki[zz] + ':' + aWindow.items[tid].bonus.skills[aWindow.pk2_vse_navyki[zz]];
			}
		}
		if (ww){
   			result += '}, '
		}
		else {
			result += '{}, ';
		}
		result += 'attributes:';
		ww = false;
		for (zz = aWindow.pk2_vse_kharakteristiki.length-1; zz >=0; --zz ){
		    if (aWindow.items[tid].bonus.attributes[aWindow.pk2_vse_kharakteristiki[zz]]){
				if (ww) {
					result += ', '
				}
				else {
					ww = true;
					result += '{'
				}
				result += aWindow.pk2_vse_kharakteristiki[zz] + ':' + aWindow.items[tid].bonus.attributes[aWindow.pk2_vse_kharakteristiki[zz]];
			}
		}
		if (ww){
		    result += '}'
		}
		else {
			result += '{}';
		}
		result += '}, ';
	}
	else {
		result += '{skills:{}, attributes:{}}, '
	}
	if (aWindow.items[tid].set.key) {
		result += 'set:{key:\'' + aWindow.items[tid].set.key + '\', name:\'' + aWindow.items[tid].set.name + '\'}'
	}
	else {
		result += 'set:{key:null, name:null}'
	}
	result += ', shop:\''+aWindow.items[tid].shop+'\'};';
	return result;
}

pk2_code += "\
komp_rab = {};\
komp_zas = {};\
komp_skor = {};\
komp_fort = {};\
for (i=0;i < nabory.length;++i){\
	komp_rab[nabory[i]] = [];\
	komp_zas[nabory[i]] = [];\
	komp_skor[nabory[i]]= [];\
	komp_fort[nabory[i]]= [];\
};\
\
vyborka={};\
vyborka_z={};\
vyborka_r={};\
prosto_veschi=[];\
prosto_veschi_max=8;\
for (ii = pk2_types.length; ii >= 0; --ii) {\
	vyborka[pk2_types[ii]] = {};\
	vyborka[pk2_types[ii]].simple = {};\
	vyborka[pk2_types[ii]].simple.spisok = [];\
	vyborka_z[pk2_types[ii]] = {};\
	vyborka_z[pk2_types[ii]].simple = {};\
	vyborka_z[pk2_types[ii]].simple.spisok = [];\
	vyborka_r[pk2_types[ii]] = {};\
	vyborka_r[pk2_types[ii]].simple = {};\
	vyborka_r[pk2_types[ii]].simple.spisok = [];\
	prosto_veschi[pk2_types[ii]]={};\
};\
\
resultaty=[];\
resultaty_z=[];\
resultaty_r=[];\
zaschita=null;\
ezda = false;\
rabnavyki=[];\
rabnavyki_z=[];\
rabnavyki_r=[];\
\
pk2_htmlrab=[];\
pk2_sortrab=[];\
pk2_hiderab=[];\
pk2_bezto=0;\
\
pk2_predmetov = {};\
pk2_khochuka = [];\
pk2_uchet=[];\
pk2_aktiv=[];\
porabotaj=[];\
pk2_slots={};\
for (i=0;i<pk2_types.length;++i){\
	pk2_slots[pk2_types[i]]=true;\
};\
irabota=0;\
samoe_ono={};\
deneg_ushlo = 0;\
bablo = 0;\
\
i_slot_max=[];\
i_slot=[];\
\
ic_obj = [];\
ic_objr = [];\
ic_objr = [];\
ii_rekur=0;\
rekurs_delay = 100;\
rekurs_step = 0;\
rekurs_time = 25000;\
rekurs_up = true;\
pk2_to=0;\
pk2_zas=0;\
pk2_ride=0; \
pers={};\
pk2_speed=1.0;\
ezda=false;\
pk2_onesk_rabot = false;\
chislo_rabot = 0;\
chislo_rabot_to = 0;\
khoroshi = [];\
khoroshi_to = [];\
";



aWindow.pk2_iimport = function(){
	bagazh=aWindow.Bag.getInstance();
	odezhda=aWindow.Wear.wear;
	for(vv in bagazh.items){
	aWindow.pk2_inv_imported=true;
		cobj = bagazh.items[vv].obj;
		tid = cobj.item_id;
		if (!aWindow.pk2_uchet[tid]){
			aWindow.pk2_uchet[tid]=true;
			if (aWindow.items[tid]){
				var cres={h:null,s:null};
				cres=aWindow.compare_citem(tid, cobj);
				if (!cres.h)	{
					aWindow.einfo+='Часть данных о предмете неверна:\n';
					aWindow.assign_citem(tid, cobj);
					aWindow.einfo+=aWindow.print_citem(tid)+'\n';
				}
				else if(!cres.s){
					aWindow.winfo+='Неправильное название у предмета:\n';
					aWindow.assign_citem(tid, cobj);
					aWindow.winfo+=aWindow.print_citem(tid)+'\n';
				}
			}
			else{
				aWindow.items[tid] = {item_id:tid, nshort:'nothing', name:'Заглушка', type:'pants', level:0, price:0, image:'images/items/right_arm/clayjug.png', image_mini:'images/items/right_arm/mini/clayjug.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'nil'};
				aWindow.assign_citem(tid, cobj);
				aWindow.einfo+='Отсутствует описание предмета:\n';
				aWindow.einfo+=aWindow.print_citem(tid)+'\n';
			}
		}
	}
	for(vv in aWindow.Wear.wear){
		if (!aWindow.Wear.wear[vv])
			continue;
		cobj = aWindow.Wear.wear[vv].obj;
		tid = cobj.item_id;
		aWindow.pk2_equipment[vv]=tid;
		if (!aWindow.pk2_uchet[tid]){
			aWindow.pk2_uchet[tid]=true;
			if (aWindow.items[tid]){
				var cres={h:null,s:null};
				cres=aWindow.compare_citem(tid, cobj);
				if (!cres.h)	{
					aWindow.einfo+='Часть данных у предмента неверна:\n';
					aWindow.assign_citem(tid, cobj);
					aWindow.einfo+=aWindow.print_citem(tid)+'\n';
				}
				else if(!cres.s){
					aWindow.winfo+='Неправильное название у предмета:\n';
					aWindow.assign_citem(tid, cobj);
					aWindow.winfo+=aWindow.print_citem(tid)+'\n';
				}
			}
			else{
				aWindow.items[tid] = {item_id:tid, nshort:'nothing', name:'Заглушка', type:'pants', level:0, price:0, image:'images/items/right_arm/clayjug.png', image_mini:'images/items/right_arm/mini/clayjug.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'nil'};
				aWindow.assign_citem(tid, cobj);
				aWindow.einfo+='Отсутствует описание предмета:\n';
				aWindow.einfo+=aWindow.print_citem(tid)+'\n';
			}
		}
	}
}

aWindow.pk2_mimport = function(){
	magaz=aWindow.TraderInventory.getInstance('pk2',0);
	if (!magaz) return;
	for(vv in magaz.items){
		cobj = magaz.items[vv].obj;
		tid = cobj.item_id;
		if (!aWindow.pk2_khochuka[tid]){
		    if (!aWindow.pk2_uchet[tid]){
		        aWindow.pk2_khochuka[tid]=true;
		    }
	    	if (aWindow.items[tid]){
				var cres={h:null,s:null};
				cres=aWindow.compare_citem(tid, cobj);
				/*
				if (!cres.h)	{
					aWindow.einfo+='Часть данных о предмете неверна:\n';
					aWindow.assign_citem(tid, cobj);
					aWindow.einfo+=aWindow.print_citem(tid)+'\n';
				}
				
				else*/ if(!cres.s){
					aWindow.winfo+='Неправильное название у предмета:\n';
					aWindow.assign_citem(tid, cobj);
					aWindow.winfo+=aWindow.print_citem(tid)+'\n';
				}
			}
			else{
				aWindow.items[tid] = {item_id:tid, nshort:'nothing', name:'Заглушка', type:'pants', level:0, price:0, image:'images/items/right_arm/clayjug.png', image_mini:'images/items/right_arm/mini/clayjug.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'nil'};
				aWindow.assign_citem(tid, cobj);
				aWindow.einfo+='Отсутствует описание предмета:\n';
				aWindow.einfo+=aWindow.print_citem(tid)+'\n';
			}
		}
    }
}


aWindow.pk2_podschet = function  (vse_veschi, iz_magazinov, plus_level, pers){
	aWindow.pk2_aktiv=null;
	aWindow.pk2_aktiv=[];
	for (vv in aWindow.items){
		if (isNaN(vv)) continue;
		vesch=aWindow.items[vv];
		check=true;
		if (vesch.characterSex&&(vesch.characterSex!=pers.characterSex)) check=false;
		if (vesch.characterClass&&(vesch.characterClass!=pers.characterClass)) check=false;
		if (!aWindow.pk2_uchet[vesch.item_id]&&!aWindow.pk2_khochuka[vesch.item_id])
		{
			if (!vse_veschi){
				if (!iz_magazinov)
					check=false;
				else{
					if(vesch.shop!='shop')
						check=false;
				}
			}
			if ((vesch.shop=='shop')&&(vesch.price > aWindow.bablo)) check=false;
		}

	 if ((vesch.level != null)&&(vesch.level>(pers.level+plus_level))) check=false; // дополнение, возможно ошибка

		lit = pers.level+ plus_level+parseInt(pers.itemLevelRequirementDecrease[vesch.type],10)+pers.itemLevelRequirementDecrease.all;
		if (vesch.level > lit) check=false;
		if (aWindow.pk2_slots && aWindow.pk2_slots[vesch.type]&&!(aWindow.pk2_equipment[vesch.type]==vv)) check=false;
		if (check) aWindow.pk2_aktiv.push(vesch.item_id);
	}
}

aWindow.pk2_ocenka_khlama = function(){
    aWindow.pk2_nenuzhnoe=[];
    if (!aWindow.pk2_khlam)
        return;
    ispolz=[];
    for (irab=200; irab>0;irab--){
        if (aWindow.raboty[irab]){
            if (aWindow.resultaty[irab]){
                for (ee = 0; ee < aWindow.pk2_types.length; ++ee){
                    sid = aWindow.resultaty[irab].items[ee].tid;
                    ispolz[sid]=true;
                }
            }
            if (aWindow.resultaty_z[irab]){
                for (ee = 0; ee < aWindow.pk2_types.length; ++ee){
                    sid = aWindow.resultaty_z[irab].items[ee].tid;
                    ispolz[sid]=true;
                }
            }
            if (aWindow.resultaty_r[irab]){
                for (ee = 0; ee < aWindow.pk2_types.length; ++ee){
                    sid = aWindow.resultaty_r[irab].items[ee].tid;
                    ispolz[sid]=true;
                }
            }
        }
    }
//    
    for (tid in aWindow.pk2_uchet){
        if ((tid < 600)&&(tid >=200)&&(!ispolz[tid])){
            aWindow.pk2_nenuzhnoe[tid]=true;
        }
    }
// дополнение, надо проверять, что это
// =====
    for (tid in aWindow.pk2_uchet){
        if ((tid < 12700)&&(tid >=10000)&&(!ispolz[tid])){
            aWindow.pk2_nenuzhnoe[tid]=true;
        }
    }
// =====
}

aWindow.pk2_sortir = function (tip, minto){
    ind_arr = 0;
    aWindow.pk2_sortrab = [];
    for (irab in aWindow.pk2_htmlrab){
        if (aWindow.pk2_vse_raboty&&(aWindow.resultaty[irab].to <= -minto))
            continue;
        aWindow.pk2_sortrab[ind_arr] = {};
        aWindow.pk2_sortrab[ind_arr].index = irab;
        switch (tip){
        case 'd0':
            aWindow.pk2_sortrab[ind_arr].ves = -aWindow.raboty[irab].resultaty.dengi;
            break;
        case 'o0':
            aWindow.pk2_sortrab[ind_arr].ves = 0-aWindow.raboty[irab].resultaty.opyt;
            break;
        case 'v0':
            aWindow.pk2_sortrab[ind_arr].ves = 0-aWindow.raboty[irab].resultaty.vezenie;
            break;
        case 'boom':
            aWindow.pk2_sortrab[ind_arr].ves = 0-aWindow.raboty[irab].resultaty.boom;
            break;
        case 'name':
            aWindow.pk2_sortrab[ind_arr].ves= (irab > 130) ? 'я ' : '';
            aWindow.pk2_sortrab[ind_arr].ves += aWindow.raboty[irab].rus_name;
            break;
        case 'malus':
            aWindow.pk2_sortrab[ind_arr].ves = 0-aWindow.raboty[irab].malus;
            break;
        case 'to':
            aWindow.pk2_sortrab[ind_arr].ves = 0-aWindow.resultaty[irab].to;
            break;
        case 'do':
            aWindow.pk2_sortrab[ind_arr].ves = 0-aWindow.raboty[irab].resultaty.dengi - aWindow.raboty[irab].resultaty.opyt;
            break;
        case 'dv':
            aWindow.pk2_sortrab[ind_arr].ves = 0-aWindow.raboty[irab].resultaty.dengi - aWindow.raboty[irab].resultaty.vezenie;
            break;
        case 'ov':
            aWindow.pk2_sortrab[ind_arr].ves = 0-aWindow.raboty[irab].resultaty.vezenie - aWindow.raboty[irab].resultaty.opyt;
            break;
        case 'dov':
            aWindow.pk2_sortrab[ind_arr].ves = 0-aWindow.raboty[irab].resultaty.dengi - aWindow.raboty[irab].resultaty.opyt - aWindow.raboty[irab].resultaty.vezenie;
            break;
        default:
            aWindow.pk2_sortrab[ind_arr].ves = irab;
        }
        ++ind_arr;
    }
    aWindow.qsort(aWindow.pk2_sortrab,0,ind_arr);
    aWindow.pk2_reporter2();
}

//aWindow.pk2_setbezto = function(checked){
    //aWindow.pk2_bezto = !checked;
//}

aWindow.pk2_vesch_polezna = function(value){
    for (kh in aWindow.pk2_khochuka)
        aWindow.pk2_khochuka[kh] = false;
    if (value > 0)
        aWindow.pk2_khochuka[value] = true;
    aWindow.pk2_hideraboty(value);
}

aWindow.pk2_vreporter = function () {
    aWindow.pk2_show_window();
    vrvr = '<table>';
    for (count_rab in aWindow.porabotaj){
        if (!aWindow.prosto_veschi[count_rab])
            continue;
        vrvr += '<tr>';
        rabota = aWindow.raboty[count_rab];
        vrvr += '<td rowspan=\"2\">';
        vrvr += '<table><tbody><tr><th>'+rabota.rus_name+'</th></tr>';
        if ((count_rab > 150)&&(count_rab <= 170)){
            vrvr += '<tr><td><a href=\"javascript:pk2_show_shmot('+ count_rab +');\" >';
            vrvr += '<div style=\"width:63px; height:63px; background-image: url(\'/images/menu_buttons/duel.png\'); background-position: 80px 0;\"></div></a>';
        }
        else if ((count_rab > 132)&&(count_rab <= 150)){
            
        }
        else{
            vrvr += '<tr><td><a href=\"javascript:pk2_show_shmot2('+ count_rab +');\" >';
            vrvr += '<img style=\"float:left;\" src=\"';
            if (count_rab<=131){
                vrvr += 'images/jobs/';
            }
            vrvr +=rabota.name+'.png\" alt=\"'+rabota.rus_name+'\" title=\"'+rabota.rus_name+'\" /></a>';
        };

        rres = rabota.resultaty;
        for (ri in rres.produkty){
            vrvr+='<div style=\"display:inline; float:left; margin: 8px 1px;\"><div class=\"jy_bi\"><img style=\"-moz-user-select: none;\" ';
            vrvr+='title=\"'+aWindow.items[ri].name+'\" alt=\"'+aWindow.items[ri].name+'\" ';
            vrvr+='src=\"'+aWindow.items[ri].image_mini+'\" /></div><div class=\"jy_pk2\">'+rres.produkty[ri]+'%</div>';
            vrvr+='</div>';
        }
        vrvr += '</td></tr>';
        vrvr += '<tr><td>';
        vrvr += ' <a class=\"tt\" href=\"#\" style=\"color:black;\"><table><tr><td><img style=\"width:17px; height:17px;\" src=\"images/job/dollar.png\" /></td>';
        vrvr += '<td><div class="bar"><div class="bar_fill" style="width: '+Math.round(rres.dengi*3/2)+'px;"></div><div class="bar_perc">'+rres.dengi+'%</div></div>';
        vrvr += '<span>Заработок:'+rres.dengi+'</span></td></tr></table></a>';
        vrvr += ' <a class=\"tt\" href=\"#\" style=\"color:black;\"><table><tr><td><img style=\"width:17px; height:17px;\" src=\"images/job/experience.png\" /></td>';
        vrvr += '<td><div class="bar"><div class="bar_fill" style="width: '+Math.round(rres.opyt*3/2)+'px;"></div><div class="bar_perc">'+rres.opyt+'%</div></div>';
        vrvr += '<span>Опыт:'+rres.opyt+'</span></td></tr></table></a>';
        vrvr += ' <a class=\"tt\" href=\"#\" style=\"color:black;\"><table><tr><td><img style=\"width:17px; height:17px;\" src=\"images/job/luck.png\" /></td>';
        vrvr += '<td><div class="bar"><div class="bar_fill" style="width: '+Math.round(rres.vezenie*3/2)+'px;"></div><div class="bar_perc">'+rres.vezenie+'%</div></div>';
        vrvr += '<span>Удача:'+rres.vezenie+'</span></td></tr></table></a>';
        vrvr += ' <a class=\"tt\" href=\"#\" style=\"color:black;\"><table><tr><td><img style=\"width:17px; height:17px;\" src=\"images/job/danger.png\" /></td>';
        vrvr += '<td><div class="bar"><div class="bar_brown" style="width: '+Math.round(rres.boom*3/2)+'px;"></div><div class="bar_perc">'+rres.boom+'%</div></div>';
        vrvr += '<span>Опасность:'+rres.boom+'</span></td></tr></table></a>';
        vrvr += '</td></tr></tbody></table>';

        vrvr += '</td><td>';

        if (count_rab!=141){
            vrvr += '<span title=\"Очки от навыков\" class="calculation_visualisation img_plus" style=\"margin-left:0px;\">';
	    	vrvr += '<span class="skill_box_value" style="text-align:center;">';
		    vrvr += (aWindow.resultaty[count_rab].to+aWindow.raboty[count_rab].malus-aWindow.resultaty[count_rab].ton)+'</span></span>';
            vrvr += '<span title=\"Очки от комплектов\" class="calculation_visualisation img_plus" style=\"margin-left:0px;\">';
	    	vrvr += '<span class="skill_box_value green_text" style="text-align:center;">'+aWindow.resultaty[count_rab].ton+'</span></span>';
		    vrvr += '<span title=\"Сложность работы\" class="calculation_visualisation img_minus"  style=\"margin-left:0px;\">';
    		vrvr += '<span class="skill_box_value" style="text-align:center;">'+aWindow.raboty[count_rab].malus+'</span></span>';
	    	vrvr += '<span title=\"ТО\" class="calculation_visualisation img_equal" style="margin-right:10px; margin-left:0px;">';
		    vrvr += '<span class="skill_box_value" style="text-align:center; color:';
    		vrvr += (aWindow.resultaty[count_rab].to > 0) ? 'rgb(0,255,0)' : 'rgb(255,0,0)';
	    	vrvr += '">'+aWindow.resultaty[count_rab].to+'</span></span>';
	    }
        vrvr += '</td><td>';

        brbr = 0;
        vrvr += '<table><tbody><tr>';
        for (jj in aWindow.rabnavyki[count_rab]){
            for (aa = aWindow.rabnavyki[count_rab][jj].mul; aa > 0; --aa){
                if (++brbr==8) {vrvr+='</tr><tr>'; brbr=1};
                vrvr += '<td><a class=\"tt3\" href=\"#\" ><span>'+aWindow.pers.skill_titles[jj]+':'+aWindow.rabnavyki[count_rab][jj].znach+'</span>';
                vrvr += '<div class=\"skill_box\" style=\"padding: 35px 28px 6px 2px; margin-right: -2px; margin-top: -4px; background: transparent url(/images/skill/skills_'+aWindow.pk2_s2a[jj];
                vrvr += '.png) repeat scroll '+aWindow.pk2_s2px[jj]+'px 0px; color: rgb(255, 255, 255); ';
                vrvr += 'width: 25px; height: 14px; -moz-background-clip: border; -moz-background-origin: padding; ';
                vrvr += '-moz-background-inline-policy: continuous; float: left; font-weight: bold; text-align:center;" >';
                vrvr += aWindow.rabnavyki[count_rab][jj].znach+'</div>';
                vrvr += '</a></td>';
            }
        }
        vrvr += '</tr></tbody></table>';
        vrvr += '</td></tr><tr><td colspan=\"2\"><table>';
        
        for (ee = 0; ee < aWindow.pk2_types.length; ++ee){
            ctype = aWindow.pk2_types[ee];
            vrvr += '<tr><td>';
            for (vv = aWindow.prosto_veschi[count_rab][ctype].length-1; vv >= 0;  --vv){
                sid = aWindow.prosto_veschi[count_rab][ctype][vv].tid;
                vrvr+='<div style=\"display:inline; float:left;\">';
                vesch = aWindow.items[sid];
                vrvr+='<a class=\"tt2\" href=\"#\" ><span><b>'+vesch.name+':</b>&nbsp;'+aWindow.prosto_veschi[count_rab][ctype][vv].bon;
                if (vesch.set.key){
                    vrvr += '<br /><em>'+vesch.set.name+'</em>';
                }
                for (ind in vesch.bonus.attributes){
                    vrvr += aWindow.pk2_a_print(ind, vesch.bonus.attributes[ind]);
                }
                for (ind in vesch.bonus.skills){
                    vrvr += aWindow.pk2_s_print(ind, vesch.bonus.skills[ind]);
                }
                vrvr += '</span>'
                vrvr+='<div class=\"bag_item\" ><img src=\"'+vesch.image_mini+'\" />';
                vrvr+='<div class="bag_item_count"><p style="text-align:center;">'+aWindow.prosto_veschi[count_rab][ctype][vv].bon+'</p></div></div>'
                vrvr+='</a>'
                if (aWindow.prosto_veschi[count_rab][ctype][vv].price > 0){
                    vrvr+='<br />';
                    vrvr +='<span style=\"text-align:center;\">'+aWindow.prosto_veschi[count_rab][ctype][vv].price+'&nbsp;$</span>';
                }
                vrvr +='</div>';
            }
            vrvr += '</td></tr>'
        }
        vrvr += '</table></td></tr>';
        
    }
    vrvr += '</table>';
    document.getElementById('pk2_window_content').innerHTML=vrvr;
}

aWindow.pk2_reporter = function () {
//    new aWindow.HumanMessage('Начинаем вывод полученных данных', {type: 'success'});
    grgr='';
    aWindow.pk2_ocenka_khlama();
    count_rab=0;
    aWindow.pk2_show_window();
    aWindow.pk2_res2html();
    
    if (aWindow.pk2_khochuka.length > 0){
        aWindow.chislo_rabot = 0;
        aWindow.chislo_rabot_to = 0;
        aWindow.khoroshi = [];
        aWindow.khoroshi_to = [];
        for (kh in aWindow.pk2_khochuka){
            aWindow.khoroshi[kh] = 0;
            aWindow.khoroshi_to[kh] = 0;
            aWindow.pk2_khochuka[kh]=false;
        }
        aWindow.pk2_khochuka[kh]=true; // last item;
        for (rr in aWindow.porabotaj){
            if(aWindow.resultaty[rr]){
                ++aWindow.chislo_rabot;
                if (aWindow.resultaty[rr].to > 0) ++aWindow.chislo_rabot_to;
                for (ii = aWindow.pk2_types.length-1; ii >= 0; --ii){
                    for (kh in aWindow.pk2_khochuka){
                        if (aWindow.resultaty[rr].items[ii].tid == kh){
                            aWindow.khoroshi[kh] += 1;
                            if (aWindow.resultaty[rr].to > 0) aWindow.khoroshi_to[kh] += 1;
                        }
                    }
                }
            }
            if(aWindow.resultaty_z[rr]){
                ++aWindow.chislo_rabot;
                ++aWindow.chislo_rabot_to;
                for (ii = aWindow.pk2_types.length-1; ii >= 0; --ii){
                    for (kh in aWindow.pk2_khochuka){
                        if (aWindow.resultaty_z[rr].items[ii].tid == kh){
                            aWindow.khoroshi[kh] += 1;
                            aWindow.khoroshi_to[kh] += 1;
                        }
                    }
                }
            }
            if(aWindow.resultaty_r[rr]){
                ++aWindow.chislo_rabot;
                ++aWindow.chislo_rabot_to;
                for (ii = aWindow.pk2_types.length-1; ii >= 0; --ii){
                    for (kh in aWindow.pk2_khochuka){
                        if (aWindow.resultaty_r[rr].items[ii].tid == kh){
                            aWindow.khoroshi[kh] += 1;
                            aWindow.khoroshi_to[kh] += 1;
                        }
                    }
                }
            }
        }
    }
    aWindow.pk2_process=false;
    aWindow.pk2_sortir('name', aWindow.pk2_bezto);
}


pk2_code += "\
pk2_s2a =\
{build:'strength', punch:'strength', tough:'strength', endurance:'strength', health:'strength',\
ride:'flexibility', reflex:'flexibility', dodge:'flexibility', hide:'flexibility', swim:'flexibility',\
aim:'dexterity', shot:'dexterity', pitfall:'dexterity', finger_dexterity:'dexterity', repair:'dexterity',\
leadership:'charisma', tactic:'charisma', trade:'charisma', animal:'charisma', appearance:'charisma'};\
";

pk2_code += "\
pk2_s2px =\
{build:0, punch:220, tough:165, endurance:110, health:55,\
ride:0, reflex:220, dodge:165, hide:110, swim:55,\
aim:0, shot:220, pitfall:165, finger_dexterity:110, repair:55,\
leadership:0, tactic:220, trade:165, animal:110, appearance:55};\
";

pk2_code += "\
pk2_s2f_bonus2 = function (value){\
    if (isNaN(value)) return 0;\
    if (value < 1) return 0;\
    if (value < 3) return 1;\
    if (value < 10) return 2;\
    if (value < 23) return 3;\
    if (value < 43) return 4;\
    if (value < 71) return 5;\
    if (value < 108) return 6;\
    if (value < 155) return 7;\
    if (value < 211) return 8;\
    return 9;\
};\
";

pk2_code += "\
pk2_s2f_bonus = function (value){\
    if (isNaN(value)) return 0;\
    if (value < 1) return 0;\
    if (value < 3) return 1+(value-1)/2;\
    if (value < 10) return 2+(value-3)/7;\
    if (value < 23) return 3+(value-10)/13;\
    if (value < 43) return 4+(value-23)/20;\
    if (value < 71) return 5+(value-43)/28;\
    if (value < 108) return 6+(value-71)/37;\
    if (value < 155) return 7+(value-108)/47;\
    if (value < 211) return 8+(value-155)/56;\
    return 9;\
};\
";


aWindow.pk2_hideraboty = function(tid){
    aWindow.pk2_hiderab=[];
    vtype = aWindow.items[tid].type;
    kk = 0;
    for (; vtype != aWindow.pk2_types[kk]; ++kk) {};
    for (irab in aWindow.porabotaj){
        nea = true;
        if (aWindow.resultaty[irab]&&(aWindow.resultaty[irab].items[kk].tid==tid)){
            nea = false;
        }
        if (aWindow.resultaty_z[irab]&&(aWindow.resultaty_z[irab].items[kk].tid==tid)){
            nea = false;
        }
        if (aWindow.resultaty_r[irab]&&(aWindow.resultaty_r[irab].items[kk].tid==tid)){
            nea = false;
        }
        if (nea){
            aWindow.pk2_hiderab[irab]=true;
        }
    }
    aWindow.pk2_reporter2();
}


aWindow.pk2_s_print = function(nav, val){
    /*
    kha = aWindow.pk2_s2a[nav];
    result = '<div style=\"background-color:'
    if (kha == 'strength') {result += '#c33; '}
    else if (kha == 'flexibility') {result += '#7e7; '}
    else if (kha == 'dexterity') {result += '#78e; '}
    else if (kha == 'charisma') {result += '#ea3; '}
    else {result += 'white; '}
    result+='\" >'+aWindow.pers.skill_titles[nav]+':'+val+'</div>';
    */
    result='<div>'+aWindow.pers.skill_titles[nav]+':'+val+'</div>';
    return result;
}
aWindow.pk2_a_print = function(kha, val){
/*
    result = '<div style=\"font-weight:bold; background-color:'
    if (kha == 'strength') {result += '#f44; '}
    else if (kha == 'flexibility') {result += '#7e7; '}
    else if (kha == 'dexterity') {result += '#78e; '}
    else if (kha == 'charisma') {result += '#ea3; '}
    else {result += 'white; '}
*/
    result = '<div style=\"font-weight:bold;\" >'+aWindow.pers.attribute_titles[kha]+':'+val+'</div>';
    return result;
}

pk2_code += "\
qsort = function (ar, li, ri){\
	if ((li+1)>=ri) return;\
	var tmp;\
	if (ri-li<10){\
		for (ii=li;ii<ri-1;++ii)\
			for (jj=ii+1;jj<ri;++jj)\
				if(ar[ii].ves>ar[jj].ves){\
					tmp=ar[ii];\
					ar[ii]=ar[jj];\
					ar[jj]=tmp;\
				}\
	}\
	else{\
		mi=parseInt((li+ri)/2,10);\
		if (ar[li].ves>ar[ri-1].ves){\
			tmp=ar[li];\
			ar[li]=ar[ri-1];\
			ar[ri-1]=tmp;\
		}\
		if (ar[li].ves>ar[mi].ves){\
			tmp=ar[li];\
			ar[li]=ar[mi];\
			ar[mi]=tmp;\
		}\
		if (ar[mi].ves>ar[ri-1].ves){\
			tmp=ar[mi];\
			ar[mi]=ar[ri-1];\
			ar[ri-1]=tmp;\
		}\
		em=ar[mi].ves;\
		cl=li;\
		cr=ri-1;\
		while(cl<cr){\
			while((cl<ri)&&(ar[cl].ves<=em)) ++cl;\
			while((cr>li)&&(ar[cr].ves>=em)) --cr;\
			if (cl<cr){\
				tmp=ar[cl];\
				ar[cl]=ar[cr];\
				ar[cr]=tmp;\
			}\
		}\
		if (cr < ri -1)\
		    qsort(ar,li,cr+1);\
		qsort(ar,cl,ri);\
	}\
};\
";


pk2_code += "\
summa_ochkov = function (bonus, nuzhnye_navyki){\
	och=0;\
	for (num_index in nuzhnye_navyki){\
		if(bonus.skills[num_index]){\
			och+=bonus.skills[num_index]*nuzhnye_navyki[num_index];\
		}\
		if(bonus.attributes[pk2_s2a[num_index]]){\
			och+=bonus.attributes[pk2_s2a[num_index]]*nuzhnye_navyki[num_index];\
		}\
	}\
	return och;\
};\
";

pk2_code += "\
summa_ochkov2 = function (skills, nuzhnye_navyki){\
	och=0;\
	for (num_index in nuzhnye_navyki){\
		if(skills[num_index]){\
			och+=skills[num_index]*nuzhnye_navyki[num_index];\
		}\
	}\
	return och;\
};\
";

pk2_code += "\
summa_ochkov3 = function (bonus, ind_navyk){\
	och=0;\
	if(bonus.skills[ind_navyk]){\
		och+=bonus.skills[ind_navyk];\
	}\
	if(bonus.attributes[pk2_s2a[ind_navyk]]){\
		och+=bonus.attributes[pk2_s2a[ind_navyk]];\
	}\
	return och;\
};\
";


pk2_code += "\
pk2_vybvesch = function () {\
	for (irabota in porabotaj) {\
		if (porabotaj[irabota]==false)\
		    continue;\
		porabotaj[irabota]=false;\
		rabota=raboty[irabota];\
		if (!rabota)\
			{continue; }\
		if ((irabota>132)&&(irabota<150))\
		    continue;\
		prosto_veschi[irabota]={};\
		for (ii = pk2_types.length - 1; ii >= 0; --ii) {\
			prosto_veschi[irabota][pk2_types[ii]]=[];\
		}\
		for (i = pk2_aktiv.length-1; i >= 0; --i) {\
			rekurs_time-=50;\
			cid = pk2_aktiv[i];\
			vesch = items[cid];\
			ctype = vesch.type;\
			ochki = summa_ochkov(vesch.bonus, rabota.navyki);\
			tsena = (pk2_uchet[cid] || (vesch.shop != 'shop')) ? 0 : vesch.price;\
    		if (ochki > 0){\
				mv = -1;\
    			for (kk = 0; kk < prosto_veschi[irabota][ctype].length; ++kk) {\
    			    if ((prosto_veschi[irabota][ctype][kk].bon < ochki)||((prosto_veschi[irabota][ctype][kk].bon === ochki)&&(prosto_veschi[irabota][ctype][kk].price > tsena))){\
    			        mv = kk;\
    			    }\
    			    else{\
    			        break;\
    			    }\
    			}\
    			if (prosto_veschi[irabota][ctype].length < prosto_veschi_max){\
    			    for (kk = prosto_veschi[irabota][ctype].length-1; kk > mv; --kk){\
    			        prosto_veschi[irabota][ctype][kk+1]={bon:prosto_veschi[irabota][ctype][kk].bon, price:prosto_veschi[irabota][ctype][kk].price, tid:prosto_veschi[irabota][ctype][kk].tid}\
    			    }\
    			    prosto_veschi[irabota][ctype][mv+1]={bon:ochki, price:tsena, tid:cid};\
    			}\
    			else{\
    			    for (kk = 0; kk < mv; ++kk){\
    			        prosto_veschi[irabota][ctype][kk]={bon:prosto_veschi[irabota][ctype][kk+1].bon, price:prosto_veschi[irabota][ctype][kk+1].price, tid:prosto_veschi[irabota][ctype][kk+1].tid}\
    			    }\
    			    prosto_veschi[irabota][ctype][mv]={bon:ochki, price:tsena, tid:cid};\
    			}\
			}\
		}\
		resultaty[irabota] = {};\
		resultaty[irabota].to = summa_ochkov2(pers.skills, rabota.navyki)-raboty[irabota].malus;\
		resultaty[irabota].ton = 0;\
		raboty[irabota].resultaty.to = resultaty[irabota].to;\
        rabnavyki[irabota]={};\
        for (num_index in raboty[irabota].navyki){\
            temp_n = {};\
            temp_n[num_index]=1;\
            val=summa_ochkov2(pers.skills,temp_n);\
            rabnavyki[irabota][num_index]={};\
            rabnavyki[irabota][num_index].name=pers.skill_titles[num_index];\
            rabnavyki[irabota][num_index].znach = val;\
            rabnavyki[irabota][num_index].mul = raboty[irabota].navyki[num_index] ? raboty[irabota].navyki[num_index] : 0;\
        }\
    }\
	for (irabota in porabotaj) {\
		if (porabotaj[irabota] == false) \
			porabotaj[irabota] = true;\
	}\
	pk2_vreporter();\
};\
";




pk2_code += "\
pk2_vybzap_f = function () {\
	for (irabota in porabotaj) {\
		if ((irabota <= 132)||(irabota > 140))\
		    continue;\
		if (porabotaj[irabota]==false)\
		    continue;\
		porabotaj[irabota]=false;\
		rabota=raboty[irabota];\
		if (!rabota)\
			{continue; }\
		for (ii = pk2_types.length - 1; ii >= 0; --ii) {\
			for (jj = nabory.length - 1; jj >= 0; --jj) {\
				vyborka[pk2_types[ii]][nabory[jj]]=null;\
			}\
			for (jj=vyborka[pk2_types[ii]].simple.n-1;jj>=0;--jj)\
				vyborka[pk2_types[ii]].simple.spisok[jj]=null;\
			vyborka[pk2_types[ii]].simple.n = 1;\
			vyborka[pk2_types[ii]].simple.spisok[0] = {price:0, tid:0, navyki:{}, health:0};\
			for (oo in rabota.navyki){\
			    vyborka[pk2_types[ii]].simple.spisok[0].navyki[oo] = 0;\
			}\
		}\
		for (i = pk2_aktiv.length-1; i >= 0; --i) {\
			rekurs_time-=50;\
			cid = pk2_aktiv[i];\
			vesch = items[cid];\
			ctype = vesch.type;\
			ochki = 0;\
			cnavyki = {};\
			for (oo in rabota.navyki){\
			    cnavyki[oo] = summa_ochkov3(vesch.bonus, oo);\
			    ochki += cnavyki[oo];\
			}\
			chealth = summa_ochkov3(vesch.bonus, 'health');\
			ochki += chealth;\
			tsena = (pk2_uchet[cid]|| pk2_khochuka[cid] || (vesch.shop != 'shop')) ? 0 : vesch.price;\
			if (vesch.set.key) {\
				vyborka[ctype][vesch.set.key]={navyki:{}, price:tsena, tid:cid, health:chealth};\
    			for (oo in rabota.navyki){\
	    		    vyborka[ctype][vesch.set.key].navyki[oo] = cnavyki[oo];\
			    }\
			}\
    		if (ochki > 0){\
				hm = []; iz=true;\
    			for (kk = vyborka[ctype].simple.n-1; kk >= 0; --kk) {\
	    			im = 0;\
		    		ib = 0;\
			    	for (oo in rabota.navyki){\
    			    	if (vyborka[ctype].simple.spisok[kk].navyki[oo] < cnavyki[oo]) {ib++}\
	    			    else {if (vyborka[ctype].simple.spisok[kk].navyki[oo] > cnavyki[oo]) {im++}};\
			    	}\
			    	if (vyborka[ctype].simple.spisok[kk].health < chealth) {ib++}\
    			    else {if (vyborka[ctype].simple.spisok[kk].health > chealth) {im++}};\
    			    \
				    if (!pk2_millioner){\
				        if (vyborka[ctype].simple.spisok[kk].price > tsena) {ib++}\
				        else {if (vyborka[ctype].simple.spisok[kk].price < tsena) {im++}}\
				    }\
				    if (ib==0) {iz=false}\
				    else if (im==0){hm.push(kk)}\
			    }\
			    if (iz) {\
				    nn = vyborka[ctype].simple.n;\
					vyborka[ctype].simple.spisok[nn] = {};\
    				vyborka[ctype].simple.spisok[nn].health = chealth;\
	    			vyborka[ctype].simple.spisok[nn].price = tsena;\
		    		vyborka[ctype].simple.spisok[nn].tid = cid;\
		    		vyborka[ctype].simple.spisok[nn].navyki={};\
		    		for (oo in rabota.navyki){\
		    		    vyborka[ctype].simple.spisok[nn].navyki[oo] = cnavyki[oo];\
		    		}\
					vyborka[ctype].simple.n += 1;\
    				while (hm.length > 0){\
    				    zh = hm.pop();\
    				    vyborka[ctype].simple.spisok[zh].tid = -1;\
    				}\
			        for (ll = vyborka[ctype].simple.n-1;ll>=0; ){\
			            if (vyborka[ctype].simple.spisok[ll].tid== -1){\
    		    			for (kk = ll; kk < vyborka[ctype].simple.n - 1; ++kk) {\
	        	    			vyborka[ctype].simple.spisok[kk].health = vyborka[ctype].simple.spisok[kk+1].health;\
			            		vyborka[ctype].simple.spisok[kk].price = vyborka[ctype].simple.spisok[kk+1].price;\
				            	vyborka[ctype].simple.spisok[kk].tid = vyborka[ctype].simple.spisok[kk+1].tid;\
				            	vyborka[ctype].simple.spisok[kk].navyki={};\
            		    		for (oo in rabota.navyki){\
		                		    vyborka[ctype].simple.spisok[kk].navyki[oo] = vyborka[ctype].simple.spisok[kk+1].navyki[oo];\
		                		}\
	        			    }\
			        		kk = vyborka[ctype].simple.n - 1;\
        					vyborka[ctype].simple.spisok[kk].health = null;\
                			vyborka[ctype].simple.spisok[kk].price = null;\
	    		    	    vyborka[ctype].simple.spisok[kk].tid = null;\
           		    		for (oo in rabota.navyki){\
	                		    vyborka[ctype].simple.spisok[kk].navyki[oo] = null;\
	                		}\
	    		    	    vyborka[ctype].simple.spisok[kk].navyki = null;\
	        		    	vyborka[ctype].simple.spisok[kk] = null;\
			        	    vyborka[ctype].simple.n -= 1;\
			            }\
			            else{\
			                --ll;\
			            }\
			        }\
			    }\
		    }\
		}\
		for (ii = pk2_types.length - 1; ii >= 0; --ii) {\
			for (jj = nabory.length - 1; jj >= 0; --jj) {\
				if (vyborka[pk2_types[ii]][nabory[jj]]){\
					dvazhdy = -1;\
					sid = vyborka[pk2_types[ii]][nabory[jj]].tid;\
					for (kk = vyborka[pk2_types[ii]].simple.n - 1; kk >= 0; --kk)\
						if (vyborka[pk2_types[ii]].simple.spisok[kk].tid == sid)\
							dvazhdy = kk;\
					if (dvazhdy < 0) {\
						nn = vyborka[pk2_types[ii]].simple.n;\
						vyborka[pk2_types[ii]].simple.spisok[nn] = {};\
						vyborka[pk2_types[ii]].simple.spisok[nn].health = vyborka[pk2_types[ii]][nabory[jj]].health;\
						vyborka[pk2_types[ii]].simple.spisok[nn].price = vyborka[pk2_types[ii]][nabory[jj]].price;\
						vyborka[pk2_types[ii]].simple.spisok[nn].tid = vyborka[pk2_types[ii]][nabory[jj]].tid;\
						vyborka[pk2_types[ii]].simple.spisok[nn].nabor = nabory[jj];\
						vyborka[pk2_types[ii]].simple.spisok[nn].navyki = {};\
       		    		for (oo in rabota.navyki){\
                		    vyborka[pk2_types[ii]].simple.spisok[nn].navyki[oo] = vyborka[pk2_types[ii]][nabory[jj]].navyki[oo];\
                 		}\
						vyborka[pk2_types[ii]].simple.n += 1;\
					}\
					else {\
						vyborka[pk2_types[ii]].simple.spisok[dvazhdy].nabor = nabory[jj];\
					}\
				}\
			}\
		}\
        for (ii=pk2_types.length-1; ii>=0; --ii){\
            i_slot[ii]=0;\
            i_slot_max[ii] = vyborka[pk2_types[ii]].simple.n;\
        }\
		samoe_ono = {};\
		deneg_ushlo = 0;\
		for (ii = 0; ii < nabory.length; ++ii)\
			pk2_predmetov[nabory[ii]] = 0;\
		pk2_tonavyki = {};\
		for (oo in rabota.navyki){\
			pk2_tonavyki[oo] = pers.skills[oo];\
		}\
		pk2_tohealth = pers.skills.health;\
		samoe_ono.to = 0;\
		samoe_ono.price=-1;\
		samoe_ono.health = 0;\
		for (ii = nabory.length-1; ii >= 0; --ii) {\
			for (jj = 8; jj > 0; --jj) {\
				t_nab = komplekty[nabory[ii]][jj];\
				komp_fort[nabory[ii]][jj] = {};\
				komp_fort[nabory[ii]][jj].navyki={};\
				for (oo in rabota.navyki){\
				    komp_fort[nabory[ii]][jj].navyki[oo] = summa_ochkov3(t_nab.bonus, oo);\
				}\
				komp_fort[nabory[ii]][jj].health = summa_ochkov3(t_nab.bonus, 'health');\
			}\
		}\
		rekurs_time-=500;\
		ii_rekur=0;\
		window.setTimeout(pk2_rekurs_f, rekurs_delay/5);\
		return;\
    }\
	for (irabota in porabotaj) {\
		if (porabotaj[irabota] == false)\
			porabotaj[irabota] = true;\
	}\
    pk2_reporter();\
};\
";



pk2_code += "\
pk2_rekurs_f = function (){\
    if (rekurs_time>15000) rekurs_time=10000;\
    nn = pk2_types.length;\
    rabota=raboty[irabota];\
    for (ii = ii_rekur; ii >= 0; )\
    {\
        if (--rekurs_time <= 0){\
            ii_rekur = ii;\
            rekurs_time = 20000;\
            ++rekurs_step;\
           	new HumanMessage('Перебор вещей продолжается, шаг №'+rekurs_step, {type: 'success'});\
            window.setTimeout(pk2_rekurs_f, rekurs_delay);\
            return 1;\
        }\
        if (i_slot[ii] >= i_slot_max[ii]){\
            if (--ii >= 0){\
                deneg_ushlo -= ic_obj[ii].price;\
           		for (oo in rabota.navyki){\
    	            pk2_tonavyki[oo] -= ic_obj[ii].navyki[oo];\
		        }\
                pk2_tohealth -= ic_obj[ii].health;\
    	    	if (ic_obj[ii].nabor) {\
	    	    	pk2_predmetov[ic_obj[ii].nabor] -= 1;\
	    	    }\
	    	    i_slot[ii]+=1;\
            }\
    	    continue;\
        }\
        deb_v = vyborka[pk2_types[ii]].simple.spisok;\
        ic_obj[ii] = deb_v[i_slot[ii]];\
        deneg_ushlo += ic_obj[ii].price;\
        if (deneg_ushlo <= bablo)\
        {\
			if (ic_obj[ii].nabor) {\
    			pk2_predmetov[ic_obj[ii].nabor] += 1;\
	    	}\
 		    pk2_tohealth += ic_obj[ii].health;\
       		for (oo in rabota.navyki){\
	            pk2_tonavyki[oo] += ic_obj[ii].navyki[oo];\
	        }\
		    if (++ii == nn){\
    			ton = {};\
    			ton.navyki={};\
    			ton.health=0;\
    			for (oo in rabota.navyki){\
    			    ton.navyki[oo]=0;\
    			}\
	    		for (inabor = nabory.length - 1; inabor >= 0; --inabor) \
		    		if (pk2_predmetov[nabory[inabor]] > 0) {\
			    		ton.health += komp_fort[nabory[inabor]][pk2_predmetov[nabory[inabor]]].health;\
			    		for (oo in rabota.navyki){\
			    		    ton.navyki[oo] += komp_fort[nabory[inabor]][pk2_predmetov[nabory[inabor]]].navyki[oo];\
			    		}\
				    }\
    			\
    			pk2_tohealth += ton.health;\
    			for (oo in rabota.navyki){\
    			    pk2_tonavyki[oo] += ton.navyki[oo]\
    			}\
    			cto = 0;\
    			for (oo in rabota.navyki){\
    			    cto += pk2_s2f_bonus(pk2_tonavyki[oo])*rabota.navyki[oo];\
    			}\
			if (pk2_tohealth >= pk2_zdorov)\
	    		if ((samoe_ono.to < cto)||((samoe_ono.to == cto)&&(samoe_ono.health<pk2_tohealth))) {\
		    		samoe_ono.to = cto;\
				    samoe_ono.price=deneg_ushlo;\
				    samoe_ono.health = pk2_tohealth;\
				    for (jj = nn - 1; jj >= 0; --jj) {\
					    samoe_ono[pk2_types[jj]] = i_slot[jj];\
				    }\
    			}\
			\
    			pk2_tohealth -= ton.health;\
    			for (oo in rabota.navyki){\
    			    pk2_tonavyki[oo] -= ton.navyki[oo]\
    			}\
			    --ii;\
                deneg_ushlo -= ic_obj[ii].price;\
           		for (oo in rabota.navyki){\
    	            pk2_tonavyki[oo] -= ic_obj[ii].navyki[oo];\
		        }\
                pk2_tohealth -= ic_obj[ii].health;\
    	    	if (ic_obj[ii].nabor) {\
	    	    	pk2_predmetov[ic_obj[ii].nabor] -= 1;\
	    	    }\
	    	    i_slot[ii]+=1;\
                continue;\
		    }\
		    else{\
		        i_slot[ii]=0;\
		        continue;\
		    }\
        }\
        else{\
            deneg_ushlo -= ic_obj[ii].price;\
            i_slot[ii]+=1;\
            continue;\
        }\
    }\
\
		resultaty[irabota] = {};\
		samoe_ono.to=Math.round(samoe_ono.to*10)/10;\
		resultaty[irabota].to = samoe_ono.to;\
		resultaty[irabota].ton = 0;\
		resultaty[irabota].price = samoe_ono.price;\
		raboty[irabota].resultaty.to = samoe_ono.to;\
		resultaty[irabota].items = [];\
		for (i = 0; i < pk2_types.length; ++i) {\
		if (samoe_ono.price >= 0) {\
			vvv = vyborka[pk2_types[i]].simple.spisok[samoe_ono[pk2_types[i]]];\
		}else{vvv = 0};\
			resultaty[irabota].items[i] = {};\
			resultaty[irabota].items[i].tid = vvv.tid;\
			resultaty[irabota].items[i].bon = 0;\
			resultaty[irabota].items[i].price = vvv.price;\
		}\
            rabnavyki[irabota]={};\
		resultaty[irabota].to=0;\
		resultaty[irabota].ton=0;\
            for (num_index in raboty[irabota].navyki){\
                temp_n = {};\
                temp_n[num_index]=1;\
                val=summa_ochkov2(pers.skills,temp_n);\
                temp_u = {};\
                for (ee = pk2_types.length-1;ee>=0;--ee){\
                    sid = resultaty[irabota].items[ee].tid;\
                    if (sid > 0){\
                        val+=summa_ochkov(items[sid].bonus,temp_n);\
                        temp_k = items[sid].set.key;\
                        if (temp_k){\
                            if (temp_u[temp_k])\
                                temp_u[temp_k]+=1;\
                            else\
                                temp_u[temp_k]=1;\
                        }\
                    }\
                } \
                for (uu = nabory.length - 1; uu>=0; --uu){\
                    if (temp_u[nabory[uu]]>1){\
                        bn = komplekty[nabory[uu]][temp_u[nabory[uu]]].bonus;\
                        val+=summa_ochkov(bn,temp_n);\
                    }\
                }\
                rabnavyki[irabota][num_index]={};\
                rabnavyki[irabota][num_index].name=pers.skill_titles[num_index];\
                rabnavyki[irabota][num_index].znach = val;\
                rabnavyki[irabota][num_index].mul = raboty[irabota].navyki[num_index];\
		vvv = pk2_s2f_bonus(val);\
		if (num_index!='aim') {resultaty[irabota].ton+=vvv};\
		if (num_index!='dodge') {resultaty[irabota].to+=vvv};\
            }\
		resultaty[irabota].ton = Math.round(resultaty[irabota].ton*10)/10;\
		resultaty[irabota].to = Math.round(resultaty[irabota].to*10+resultaty[irabota].ton*10)/10;\
            temp_n = {};\
            temp_n.health=1;\
            val=summa_ochkov2(pers.skills,temp_n);\
            temp_u = {};\
            for (ee = pk2_types.length-1;ee>=0;--ee){\
                sid = resultaty[irabota].items[ee].tid;\
                if (sid > 0){\
                    val+=summa_ochkov(items[sid].bonus,temp_n);\
                    temp_k = items[sid].set.key;\
                    if (temp_k){\
                        if (temp_u[temp_k])\
                            temp_u[temp_k]+=1;\
                        else\
                            temp_u[temp_k]=1;\
                    }\
                }\
            } \
            for (uu = nabory.length - 1; uu>=0; --uu){\
                if (temp_u[nabory[uu]]>1){\
                    bn = komplekty[nabory[uu]][temp_u[nabory[uu]]].bonus;\
                    val+=summa_ochkov(bn,temp_n);\
                }\
            }\
            rabnavyki[irabota].health={};\
            rabnavyki[irabota].health.name=pers.skill_titles.health;\
            rabnavyki[irabota].health.znach = val;\
            rabnavyki[irabota].health.mul = 1;\
    pk2_vybzap_f();\
};\
";


pk2_code += "\
pk2_vybzap = function () {\
	for (irabota in porabotaj) {\
		if (porabotaj[irabota]==false)\
		    continue;\
		porabotaj[irabota]=false;\
		rabota=raboty[irabota];\
		if (!rabota)\
			{continue; }\
		if ((irabota>132)&&(irabota<150))\
		    continue;\
		for (ii = pk2_types.length - 1; ii >= 0; --ii) {\
			for (jj = nabory.length - 1; jj >= 0; --jj) {\
				vyborka[pk2_types[ii]][nabory[jj]]=null;\
			}\
			for (jj=vyborka[pk2_types[ii]].simple.n-1;jj>=0;--jj)\
				vyborka[pk2_types[ii]].simple.spisok[jj]=null;\
			vyborka[pk2_types[ii]].simple.n = 1;\
			vyborka[pk2_types[ii]].simple.spisok[0] = {bon:0, price:0, tid:0};\
		}\
		\
		for (i = pk2_aktiv.length-1; i >= 0; --i) {\
			rekurs_time-=50;\
			cid = pk2_aktiv[i];\
			vesch = items[cid];\
			ctype = vesch.type;\
			ochki = summa_ochkov(vesch.bonus, rabota.navyki);\
			tsena = (pk2_uchet[cid] || pk2_khochuka[cid] || (vesch.shop != 'shop')) ? 0 : vesch.price;\
			if (vesch.set.key) {\
				vyborka[ctype][vesch.set.key]={bon:ochki, price:tsena, tid:cid};\
			}\
    		if (ochki > 0){\
				hm = []; iz=true;\
    			for (kk = vyborka[ctype].simple.n-1; kk >= 0; --kk) {\
	    			im = 0;\
		    		ib = 0;\
			    	if (vyborka[ctype].simple.spisok[kk].bon < ochki) {ib++}\
				    else {if (vyborka[ctype].simple.spisok[kk].bon > ochki) {im++}}\
				    if (!pk2_millioner){\
				        if (vyborka[ctype].simple.spisok[kk].price > tsena) {ib++}\
				        else {if (vyborka[ctype].simple.spisok[kk].price < tsena) {im++}}\
				    }\
				    if ((im==0)&&(ib==0)){\
						v2=items[vyborka[ctype].simple.spisok[kk].tid];\
						def2=summa_ochkov(v2.bonus, all_def.navyki);\
						def1=summa_ochkov(vesch.bonus, all_def.navyki);\
						if (def1>def2) ++ib;\
				    }\
				    if (ib==0) {iz=false}\
				    else if (im==0){hm.push(kk)}\
			    }\
			    if (iz) {\
				    nn = vyborka[ctype].simple.n;\
					vyborka[ctype].simple.spisok[nn] = {};\
    				vyborka[ctype].simple.spisok[nn].bon = ochki;\
	    			vyborka[ctype].simple.spisok[nn].price = tsena;\
		    		vyborka[ctype].simple.spisok[nn].tid = cid;\
					vyborka[ctype].simple.n += 1;\
    				while (hm.length > 0){\
    				    zh = hm.pop();\
    				    vyborka[ctype].simple.spisok[zh].tid = -1;\
    				}\
			        for (ll = vyborka[ctype].simple.n-1;ll>=0; ){\
			            if (vyborka[ctype].simple.spisok[ll].tid== -1){\
    		    			for (kk = ll; kk < vyborka[ctype].simple.n - 1; ++kk) {\
	        	    			vyborka[ctype].simple.spisok[kk].bon = vyborka[ctype].simple.spisok[kk+1].bon;\
			            		vyborka[ctype].simple.spisok[kk].price = vyborka[ctype].simple.spisok[kk+1].price;\
				            	vyborka[ctype].simple.spisok[kk].tid = vyborka[ctype].simple.spisok[kk+1].tid;\
	        			    }\
			        		kk = vyborka[ctype].simple.n - 1;\
        					vyborka[ctype].simple.spisok[kk].bon = null;\
                			vyborka[ctype].simple.spisok[kk].price = null;\
	    		    	    vyborka[ctype].simple.spisok[kk].tid = null;\
	        		    	vyborka[ctype].simple.spisok[kk] = null;\
			        	    vyborka[ctype].simple.n -= 1;\
			            }\
			            else{\
			                --ll;\
			            }\
			        }\
			    }\
		    }\
		}\
		for (ii = pk2_types.length - 1; ii >= 0; --ii) {\
			for (jj = nabory.length - 1; jj >= 0; --jj) {\
				if (vyborka[pk2_types[ii]][nabory[jj]]) {\
					dvazhdy = -1;\
					sid = vyborka[pk2_types[ii]][nabory[jj]].tid;\
					for (kk = vyborka[pk2_types[ii]].simple.n - 1; kk >= 0; --kk)\
						if (vyborka[pk2_types[ii]].simple.spisok[kk].tid == sid)\
							dvazhdy = kk;\
					if (dvazhdy < 0) {\
						nn = vyborka[pk2_types[ii]].simple.n;\
						vyborka[pk2_types[ii]].simple.spisok[nn] = {};\
						vyborka[pk2_types[ii]].simple.spisok[nn].bon = vyborka[pk2_types[ii]][nabory[jj]].bon;\
						vyborka[pk2_types[ii]].simple.spisok[nn].price = vyborka[pk2_types[ii]][nabory[jj]].price;\
						vyborka[pk2_types[ii]].simple.spisok[nn].tid = vyborka[pk2_types[ii]][nabory[jj]].tid;\
						vyborka[pk2_types[ii]].simple.spisok[nn].nabor = nabory[jj];\
						vyborka[pk2_types[ii]].simple.n += 1;\
					}\
					else {\
						vyborka[pk2_types[ii]].simple.spisok[dvazhdy].nabor = nabory[jj];\
					}\
				}\
			}\
		}\
		samoe_ono = {};\
		deneg_ushlo = 0;\
		for (ii = 0; ii < nabory.length; ++ii) \
			pk2_predmetov[nabory[ii]] = 0;\
		psk = summa_ochkov2(pers.skills, rabota.navyki);\
		if (isNaN(psk)) psk=0;\
		pk2_to= psk - rabota.malus;\
		samoe_ono.to= pk2_to;\
		samoe_ono.ton=0;\
		samoe_ono.price=-1;\
		for (ii = nabory.length-1; ii >= 0; --ii) {\
			for (jj = 8; jj > 0; --jj) {\
				t_nab = komplekty[nabory[ii]][jj];\
				ton = summa_ochkov(t_nab.bonus, rabota.navyki);\
				if (t_nab.raboty[irabota]) \
					ton += t_nab.raboty[irabota];\
				komp_rab[nabory[ii]][jj] = ton;\
			}\
		}\
        for (ii=pk2_types.length-1; ii>=0; --ii){\
            i_slot[ii]=0;\
            i_slot_max[ii] = vyborka[pk2_types[ii]].simple.n;\
        }\
        rekurs_time-=500;\
        ii_rekur=0;\
		window.setTimeout(pk2_rekurs, rekurs_delay/5);\
		return;\
    }\
	for (irabota in porabotaj) {\
		if (porabotaj[irabota] == false) \
			porabotaj[irabota] = true;\
	}\
    pk2_vybzap_z();\
};\
";


pk2_code += "\
pk2_vybzap_z = function () {\
	for (irabota in porabotaj) {\
	    if (!zaschita)  continue;\
		if (porabotaj[irabota]==false)\
		    continue;\
		porabotaj[irabota]=false;\
		rabota=raboty[irabota];\
		if (!rabota)\
			{continue;}\
		if ((irabota>132)&&(irabota<150))\
		    continue;\
		if (!resultaty[irabota]){\
		    resultaty_z[irabota]=null;\
		    continue;\
		}\
		for (ii = pk2_types.length - 1; ii >= 0; --ii) {\
			for (jj = nabory.length - 1; jj >= 0; --jj) {\
				vyborka_z[pk2_types[ii]][nabory[jj]]=null;\
			}\
			for (jj=vyborka_z[pk2_types[ii]].simple.n-1;jj>=0;--jj)\
				vyborka_z[pk2_types[ii]].simple.spisok[jj]=null;\
			vyborka_z[pk2_types[ii]].simple.n = 1;\
			vyborka_z[pk2_types[ii]].simple.spisok[0] = {bon:0, zas:0, price:0, tid:0};\
		}\
		if (resultaty[irabota].to >= zaschita.to){\
		for (i = pk2_aktiv.length-1; i >= 0; --i) {\
			rekurs_time-=50;\
			cid = pk2_aktiv[i];\
			vesch = items[cid];\
			ctype = vesch.type;\
			ochki = summa_ochkov(vesch.bonus, rabota.navyki);\
			zas = summa_ochkov(vesch.bonus, zaschita.navyki);\
			tsena = (pk2_uchet[cid] || pk2_khochuka[cid] || (vesch.shop != 'shop')) ? 0 : vesch.price;\
			if (vesch.set.key) {\
				vyborka_z[ctype][vesch.set.key]={bon:ochki, zas:zas, price:tsena, tid:cid};\
			}\
    		if ((ochki > 0)||(zas > 0)){\
				hm = []; iz=true;\
    			for (kk = vyborka_z[ctype].simple.n-1; kk >= 0; --kk) {\
	    			im = 0;\
		    		ib = 0;\
			    	if (vyborka_z[ctype].simple.spisok[kk].bon < ochki) {ib++}\
				    else {if (vyborka_z[ctype].simple.spisok[kk].bon > ochki) {im++}}\
			    	if (vyborka_z[ctype].simple.spisok[kk].zas < zas) {ib++}\
				    else {if (vyborka_z[ctype].simple.spisok[kk].zas > zas) {im++}}\
				    if (!pk2_millioner){\
				        if (vyborka_z[ctype].simple.spisok[kk].price > tsena) {ib++}\
				        else {if (vyborka_z[ctype].simple.spisok[kk].price < tsena) {im++}}\
				    }\
				    if (ib==0) {iz=false}\
				    else if (im==0){hm.push(kk)}\
			    }\
			    if (iz) {\
				    nn = vyborka_z[ctype].simple.n;\
					vyborka_z[ctype].simple.spisok[nn] = {};\
    				vyborka_z[ctype].simple.spisok[nn].bon = ochki;\
	    			vyborka_z[ctype].simple.spisok[nn].price = tsena;\
		    		vyborka_z[ctype].simple.spisok[nn].tid = cid;\
		    		vyborka_z[ctype].simple.spisok[nn].zas = zas;\
					vyborka_z[ctype].simple.n += 1;\
    				while (hm.length > 0){\
    				    zh = hm.pop();\
    				    vyborka_z[ctype].simple.spisok[zh].tid = -1;\
    				}\
			        for (ll = vyborka_z[ctype].simple.n-1;ll>=0; ){\
			            if (vyborka_z[ctype].simple.spisok[ll].tid== -1){\
    		    			for (kk = ll; kk < vyborka_z[ctype].simple.n - 1; ++kk) {\
	        	    			vyborka_z[ctype].simple.spisok[kk].bon = vyborka_z[ctype].simple.spisok[kk+1].bon;\
			            		vyborka_z[ctype].simple.spisok[kk].price = vyborka_z[ctype].simple.spisok[kk+1].price;\
				            	vyborka_z[ctype].simple.spisok[kk].tid = vyborka_z[ctype].simple.spisok[kk+1].tid;\
				            	vyborka_z[ctype].simple.spisok[kk].zas = vyborka_z[ctype].simple.spisok[kk+1].zas;\
	        			    }\
			        		kk = vyborka_z[ctype].simple.n - 1;\
        					vyborka_z[ctype].simple.spisok[kk].bon = null;\
                			vyborka_z[ctype].simple.spisok[kk].price = null;\
	    		    	    vyborka_z[ctype].simple.spisok[kk].tid = null;\
	    		    	    vyborka_z[ctype].simple.spisok[kk].zas = null;\
	        		    	vyborka_z[ctype].simple.spisok[kk] = null;\
			        	    vyborka_z[ctype].simple.n -= 1;\
			            }\
			            else{\
			                --ll;\
			            }\
			        }\
			    }\
		    }\
		}}\
		for (ii = pk2_types.length - 1; ii >= 0; --ii) {\
			for (jj = nabory.length - 1; jj >= 0; --jj) {\
				if (vyborka_z[pk2_types[ii]][nabory[jj]]) {\
					dvazhdy = -1;\
					sid = vyborka_z[pk2_types[ii]][nabory[jj]].tid;\
					for (kk = vyborka_z[pk2_types[ii]].simple.n - 1; kk >= 0; --kk)\
						if (vyborka_z[pk2_types[ii]].simple.spisok[kk].tid == sid)\
							dvazhdy = kk;\
					if (dvazhdy < 0) {\
						nn = vyborka_z[pk2_types[ii]].simple.n;\
						vyborka_z[pk2_types[ii]].simple.spisok[nn] = {};\
						vyborka_z[pk2_types[ii]].simple.spisok[nn].bon = vyborka_z[pk2_types[ii]][nabory[jj]].bon;\
						vyborka_z[pk2_types[ii]].simple.spisok[nn].price = vyborka_z[pk2_types[ii]][nabory[jj]].price;\
						vyborka_z[pk2_types[ii]].simple.spisok[nn].tid = vyborka_z[pk2_types[ii]][nabory[jj]].tid;\
						vyborka_z[pk2_types[ii]].simple.spisok[nn].zas = vyborka_z[pk2_types[ii]][nabory[jj]].zas;\
						vyborka_z[pk2_types[ii]].simple.spisok[nn].nabor = nabory[jj];\
						vyborka_z[pk2_types[ii]].simple.n += 1;\
					}\
					else {\
						vyborka_z[pk2_types[ii]].simple.spisok[dvazhdy].nabor = nabory[jj];\
					}\
				}\
			}\
		}\
		samoe_ono = {};\
		deneg_ushlo = 0;\
		for (ii = 0; ii < nabory.length; ++ii) \
			pk2_predmetov[nabory[ii]] = 0;\
		pk2_to= summa_ochkov2(pers.skills, rabota.navyki) - rabota.malus - zaschita.to;\
		pk2_zas=0;\
		samoe_ono.to= pk2_to;\
		samoe_ono.price=-1;\
		samoe_ono.zas=pk2_zas;\
		for (ii = nabory.length-1; ii >= 0; --ii) {\
			for (jj = 8; jj > 0; --jj) {\
				t_nab = komplekty[nabory[ii]][jj];\
				ton = summa_ochkov(t_nab.bonus, rabota.navyki);\
				if (t_nab.raboty[irabota]) \
					ton += t_nab.raboty[irabota];\
				komp_rab[nabory[ii]][jj] = ton;\
				zan = summa_ochkov(t_nab.bonus, zaschita.navyki);\
				komp_zas[nabory[ii]][jj] = zan;\
			}\
		}\
        for (ii=pk2_types.length-1; ii>=0; --ii){\
            i_slot[ii]=0;\
            i_slot_max[ii] = vyborka_z[pk2_types[ii]].simple.n;\
        }\
        rekurs_time-=500;\
        ii_rekur=0;\
		window.setTimeout(pk2_rekurs_z, rekurs_delay/5);\
		return;\
    }\
	for (irabota in porabotaj) {\
		if (porabotaj[irabota] == false) \
			porabotaj[irabota] = true;\
	}\
    pk2_vybzap_r();\
};\
";

pk2_code += "\
pk2_vybzap_r = function () {\
	for (irabota in porabotaj) {\
		if (porabotaj[irabota]==false)\
		    continue;\
		porabotaj[irabota]=false;\
		if (((irabota>132)||(!ezda))&&(irabota!=141))\
		    continue;\
		rabota=raboty[irabota];\
		if (!rabota)\
			{continue;}\
		if ((irabota!=141)&&(!resultaty[irabota])){\
		    resultaty_r[irabota]=null;\
		    continue;\
		}\
		for (ii = pk2_types.length - 1; ii >= 0; --ii) {\
			for (jj = nabory.length - 1; jj >= 0; --jj) {\
				vyborka_r[pk2_types[ii]][nabory[jj]]=null;\
			}\
			for (jj=vyborka_r[pk2_types[ii]].simple.n-1;jj>=0;--jj)\
				vyborka_r[pk2_types[ii]].simple.spisok[jj]=null;\
			vyborka_r[pk2_types[ii]].simple.n = 1;\
			vyborka_r[pk2_types[ii]].simple.spisok[0] = {bon:0, ride:0, speed:1.0, price:0, tid:0};\
		}\
		if ((irabota==141)||(resultaty[irabota].to > 0)){\
		for (i = pk2_aktiv.length-1; i >= 0; --i) {\
			rekurs_time-=50;\
			cid = pk2_aktiv[i];\
			vesch = items[cid];\
			ctype = vesch.type;\
			ochki = summa_ochkov(vesch.bonus, rabota.navyki);\
			ride = summa_ochkov3(vesch.bonus, 'ride');\
			speed = (vesch.speed)?vesch.speed:1.0;\
			tsena = (pk2_uchet[cid] || pk2_khochuka[cid] || (vesch.shop != 'shop')) ? 0 : vesch.price;\
			if (vesch.set.key) {\
				vyborka_r[ctype][vesch.set.key]={bon:ochki, ride:ride, speed:speed, price:tsena, tid:cid};\
			}\
    		if ((ochki > 0)||(ride > 0)||(speed<1.0)){\
				hm = []; iz=true;\
    			for (kk = vyborka_r[ctype].simple.n-1; kk >= 0; --kk) {\
	    			im = 0;\
		    		ib = 0;\
			    	if (vyborka_r[ctype].simple.spisok[kk].bon < ochki) {ib++}\
				    else {if (vyborka_r[ctype].simple.spisok[kk].bon > ochki) {im++}}\
			    	if (vyborka_r[ctype].simple.spisok[kk].ride < ride) {ib++}\
				    else {if (vyborka_r[ctype].simple.spisok[kk].ride > ride) {im++}}\
			        if (vyborka_r[ctype].simple.spisok[kk].speed > speed) {ib++}\
			        else {if (vyborka_r[ctype].simple.spisok[kk].speed < speed) {im++}}\
				    if (!pk2_millioner){\
				        if (vyborka_r[ctype].simple.spisok[kk].price > tsena) {ib++}\
				        else {if (vyborka_r[ctype].simple.spisok[kk].price < tsena) {im++}}\
				    }\
				    if (ib==0) {iz=false}\
				    else if (im==0){hm.push(kk)}\
			    }\
			    if (iz) {\
				    nn = vyborka_r[ctype].simple.n;\
					vyborka_r[ctype].simple.spisok[nn] = {};\
    				vyborka_r[ctype].simple.spisok[nn].bon = ochki;\
	    			vyborka_r[ctype].simple.spisok[nn].price = tsena;\
		    		vyborka_r[ctype].simple.spisok[nn].tid = cid;\
		    		vyborka_r[ctype].simple.spisok[nn].ride = ride;\
		    		vyborka_r[ctype].simple.spisok[nn].speed = speed;\
					vyborka_r[ctype].simple.n += 1;\
    				while (hm.length > 0){\
    				    zh = hm.pop();\
    				    vyborka_r[ctype].simple.spisok[zh].tid = -1;\
    				}\
			        for (ll = vyborka_r[ctype].simple.n-1;ll>=0; ){\
			            if (vyborka_r[ctype].simple.spisok[ll].tid== -1){\
    		    			for (kk = ll; kk < vyborka_r[ctype].simple.n - 1; ++kk) {\
	        	    			vyborka_r[ctype].simple.spisok[kk].bon = vyborka_r[ctype].simple.spisok[kk+1].bon;\
			            		vyborka_r[ctype].simple.spisok[kk].price = vyborka_r[ctype].simple.spisok[kk+1].price;\
				            	vyborka_r[ctype].simple.spisok[kk].tid = vyborka_r[ctype].simple.spisok[kk+1].tid;\
				            	vyborka_r[ctype].simple.spisok[kk].ride = vyborka_r[ctype].simple.spisok[kk+1].ride;\
				            	vyborka_r[ctype].simple.spisok[kk].speed = vyborka_r[ctype].simple.spisok[kk+1].speed;\
	        			    }\
			        		kk = vyborka_r[ctype].simple.n - 1;\
        					vyborka_r[ctype].simple.spisok[kk].bon = null;\
                			vyborka_r[ctype].simple.spisok[kk].price = null;\
	    		    	    vyborka_r[ctype].simple.spisok[kk].tid = null;\
	    		    	    vyborka_r[ctype].simple.spisok[kk].ride = null;\
	    		    	    vyborka_r[ctype].simple.spisok[kk].speed = null;\
	        		    	vyborka_r[ctype].simple.spisok[kk] = null;\
			        	    vyborka_r[ctype].simple.n -= 1;\
			            }\
			            else{\
			                --ll;\
			            }\
			        }\
			    }\
		    }\
		}}\
		for (ii = pk2_types.length - 1; ii >= 0; --ii) {\
			for (jj = nabory.length - 1; jj >= 0; --jj) {\
				if (vyborka_r[pk2_types[ii]][nabory[jj]]) {\
					dvazhdy = -1;\
					sid = vyborka_r[pk2_types[ii]][nabory[jj]].tid;\
					for (kk = vyborka_r[pk2_types[ii]].simple.n - 1; kk >= 0; --kk)\
						if (vyborka_r[pk2_types[ii]].simple.spisok[kk].tid == sid)\
							dvazhdy = kk;\
					if (dvazhdy < 0) {\
						nn = vyborka_r[pk2_types[ii]].simple.n;\
						vyborka_r[pk2_types[ii]].simple.spisok[nn] = {};\
						vyborka_r[pk2_types[ii]].simple.spisok[nn].bon = vyborka_r[pk2_types[ii]][nabory[jj]].bon;\
						vyborka_r[pk2_types[ii]].simple.spisok[nn].price = vyborka_r[pk2_types[ii]][nabory[jj]].price;\
						vyborka_r[pk2_types[ii]].simple.spisok[nn].tid = vyborka_r[pk2_types[ii]][nabory[jj]].tid;\
						vyborka_r[pk2_types[ii]].simple.spisok[nn].ride = vyborka_r[pk2_types[ii]][nabory[jj]].ride;\
						vyborka_r[pk2_types[ii]].simple.spisok[nn].speed = vyborka_r[pk2_types[ii]][nabory[jj]].speed;\
						vyborka_r[pk2_types[ii]].simple.spisok[nn].nabor = nabory[jj];\
						vyborka_r[pk2_types[ii]].simple.n += 1;\
					}\
					else {\
						vyborka_r[pk2_types[ii]].simple.spisok[dvazhdy].nabor = nabory[jj];\
					}\
				}\
			}\
		}\
		samoe_ono = {};\
		deneg_ushlo = 0;\
		for (ii = 0; ii < nabory.length; ++ii) \
			pk2_predmetov[nabory[ii]] = 0;\
		pk2_to= summa_ochkov2(pers.skills, rabota.navyki) - rabota.malus;\
		pk2_ride=0;\
		pk2_speed=1.0;\
		samoe_ono.to= pk2_to;\
		samoe_ono.price=-1;\
		samoe_ono.ride=pk2_ride;\
		samoe_ono.speed=100.0;\
		for (ii = nabory.length-1; ii >= 0; --ii) {\
			for (jj = 8; jj > 0; --jj) {\
				t_nab = komplekty[nabory[ii]][jj];\
				ton = summa_ochkov(t_nab.bonus, rabota.navyki);\
				if (t_nab.raboty[irabota]) \
					ton += t_nab.raboty[irabota];\
				komp_rab[nabory[ii]][jj] = ton;\
				komp_skor[nabory[ii]][jj] = {};\
				komp_skor[nabory[ii]][jj].ride = summa_ochkov3(t_nab.bonus, 'ride');\
				komp_skor[nabory[ii]][jj].speed = t_nab.speed?t_nab.speed:1.0;\
				\
			}\
		}\
        for (ii=pk2_types.length-1; ii>=0; --ii){\
            i_slot[ii]=0;\
            i_slot_max[ii] = vyborka_r[pk2_types[ii]].simple.n;\
        }\
        rekurs_time-=500;\
        ii_rekur=0;\
		window.setTimeout(pk2_rekurs_r, rekurs_delay/5);\
		return;\
    }\
	for (irabota in porabotaj) {\
		if (porabotaj[irabota] == false) \
			porabotaj[irabota] = true;\
	}\
    pk2_vybzap_f();\
};\
";



pk2_code += "\
pk2_rekurs = function (){\
    nn = pk2_types.length;\
    for (ii = ii_rekur; ii >= 0; )\
    {\
        if (--rekurs_time <= 0){\
            ii_rekur = ii;\
            rekurs_time = 50000;\
            ++rekurs_step;\
           	new HumanMessage('Перебор вещей продолжается, шаг №'+rekurs_step, {type: 'success'});\
            window.setTimeout(pk2_rekurs, rekurs_delay);\
            return 1;\
        }\
        if (i_slot[ii] >= i_slot_max[ii]){\
            if (--ii >= 0){\
                deneg_ushlo -= ic_obj[ii].price;\
                pk2_to -= ic_obj[ii].bon;\
    	    	if (ic_obj[ii].nabor) {\
	    	    	pk2_predmetov[ic_obj[ii].nabor] -= 1;\
	    	    }\
	    	    i_slot[ii]+=1;\
            }\
    	    continue;\
        }\
        deb_v = vyborka[pk2_types[ii]].simple.spisok;\
        ic_obj[ii] = deb_v[i_slot[ii]];\
        deneg_ushlo += ic_obj[ii].price;\
        if (deneg_ushlo <= bablo)\
        {\
			if (ic_obj[ii].nabor) {\
    			pk2_predmetov[ic_obj[ii].nabor] += 1;\
	    	}\
		    pk2_to += ic_obj[ii].bon;\
		    if (++ii == nn){\
    			ton = 0;\
	    		for (inabor = nabory.length - 1; inabor >= 0; --inabor) \
		    		if (pk2_predmetov[nabory[inabor]] > 0) {\
			    		ton += komp_rab[nabory[inabor]][pk2_predmetov[nabory[inabor]]]\
				    }\
    			pk2_to += ton;\
	    		if (samoe_ono.to < pk2_to) {\
		    		samoe_ono.to = pk2_to;\
			    	samoe_ono.ton = ton;\
				    samoe_ono.price=deneg_ushlo;\
				    for (jj = nn - 1; jj >= 0; --jj) {\
					    samoe_ono[pk2_types[jj]] = i_slot[jj];\
				    }\
    			}\
			    pk2_to -= ton;\
			    --ii;\
                deneg_ushlo -= ic_obj[ii].price;\
                pk2_to -= ic_obj[ii].bon;\
    	    	if (ic_obj[ii].nabor) {\
	    	    	pk2_predmetov[ic_obj[ii].nabor] -= 1;\
	    	    }\
	    	    i_slot[ii]+=1;\
                continue;\
		    }\
		    else{\
		        i_slot[ii]=0;\
		        continue;\
		    }\
        }\
        else{\
            deneg_ushlo -= ic_obj[ii].price;\
            i_slot[ii]+=1;\
            continue;\
        }\
    }\
\
		resultaty[irabota] = {};\
		resultaty[irabota].to = samoe_ono.to;\
		resultaty[irabota].ton = samoe_ono.ton;\
		resultaty[irabota].price = samoe_ono.price;\
		raboty[irabota].resultaty.to = samoe_ono.to;\
		resultaty[irabota].items = [];\
	if (samoe_ono.price >= 0) {\
		for (i = 0; i < pk2_types.length; ++i) {\
			vvv = vyborka[pk2_types[i]].simple.spisok[samoe_ono[pk2_types[i]]];\
			resultaty[irabota].items[i] = {};\
			resultaty[irabota].items[i].tid = vvv.tid;\
			resultaty[irabota].items[i].bon = vvv.bon;\
			resultaty[irabota].items[i].price = vvv.price;\
		}\
	}\
	else{\
		for (i = 0; i < pk2_types.length; ++i) {\
			resultaty[irabota].items[i] = {};\
			resultaty[irabota].items[i].tid = 0;\
			resultaty[irabota].items[i].bon = 0;\
			resultaty[irabota].items[i].price = 0;\
		}\
	}\
            rabnavyki[irabota]={};\
            for (num_index in raboty[irabota].navyki){\
                temp_n = {};\
                temp_n[num_index]=1;\
                val=summa_ochkov2(pers.skills,temp_n);\
                temp_u = {};\
                for (ee = pk2_types.length-1;ee>=0;--ee){\
                    sid = resultaty[irabota].items[ee].tid;\
                    if (sid > 0){\
                        val+=summa_ochkov(items[sid].bonus,temp_n);\
                        temp_k = items[sid].set.key;\
                        if (temp_k){\
                            if (temp_u[temp_k])\
                                temp_u[temp_k]+=1;\
                            else\
                                temp_u[temp_k]=1;\
                        }\
                    }\
                } \
                for (uu = nabory.length - 1; uu>=0; --uu){\
                    if (temp_u[nabory[uu]]>1){\
                        bn = komplekty[nabory[uu]][temp_u[nabory[uu]]].bonus;\
                        val+=summa_ochkov(bn,temp_n);\
                    }\
                }\
                rabnavyki[irabota][num_index]={};\
                rabnavyki[irabota][num_index].name=pers.skill_titles[num_index];\
                rabnavyki[irabota][num_index].znach = val;\
                rabnavyki[irabota][num_index].mul = raboty[irabota].navyki[num_index];\
            }\
    pk2_vybzap();\
};\
";


pk2_code += "\
pk2_rekurs_z = function (){\
    nn = pk2_types.length;\
    for (ii = ii_rekur; ii >= 0; )\
    {\
        if (--rekurs_time <= 0){\
            ii_rekur = ii;\
            rekurs_time = 50000;\
            ++rekurs_step;\
           	new HumanMessage('Перебор вещей продолжается, шаг №'+rekurs_step, {type: 'success'});\
            window.setTimeout(pk2_rekurs_z, rekurs_delay);\
            return 1;\
        }\
        if (i_slot[ii] >= i_slot_max[ii]){\
            if (--ii >= 0){\
                deneg_ushlo -= ic_objr[ii].price;\
                pk2_to -= ic_objr[ii].bon;\
                pk2_zas -= ic_objr[ii].zas;\
    	    	if (ic_objr[ii].nabor) {\
	    	    	pk2_predmetov[ic_objr[ii].nabor] -= 1;\
	    	    }\
	    	    i_slot[ii]+=1;\
            }\
    	    continue;\
        }\
        deb_v = vyborka_z[pk2_types[ii]].simple.spisok;\
        ic_objr[ii] = deb_v[i_slot[ii]];\
        deneg_ushlo += ic_objr[ii].price;\
        if (deneg_ushlo <= bablo)\
        {\
			if (ic_objr[ii].nabor) {\
    			pk2_predmetov[ic_objr[ii].nabor] += 1;\
	    	}\
		    pk2_to += ic_objr[ii].bon;\
		    pk2_zas += ic_objr[ii].zas;\
		    if (++ii == nn){\
    			ton = 0;\
    			zan = 0;\
	    		for (inabor = nabory.length - 1; inabor >= 0; --inabor) \
		    		if (pk2_predmetov[nabory[inabor]] > 0) {\
			    		ton += komp_rab[nabory[inabor]][pk2_predmetov[nabory[inabor]]];\
			    		zan += komp_zas[nabory[inabor]][pk2_predmetov[nabory[inabor]]];\
				    }\
    			pk2_to += ton;\
    			pk2_zas += zan;\
	    		if ((samoe_ono.zas < pk2_zas)&&(pk2_to >= 0)) {\
		    		samoe_ono.to = pk2_to;\
			    	samoe_ono.ton = ton;\
                    samoe_ono.zas = pk2_zas;\
                    samoe_ono.zan = zan;\
				    samoe_ono.price=deneg_ushlo;\
				    for (jj = nn - 1; jj >= 0; --jj) {\
					    samoe_ono[pk2_types[jj]] = i_slot[jj];\
				    }\
    			}\
			    pk2_to -= ton;\
			    pk2_zas -= zan;\
			    --ii;\
                deneg_ushlo -= ic_objr[ii].price;\
                pk2_to -= ic_objr[ii].bon;\
                pk2_zas -= ic_objr[ii].zas;\
    	    	if (ic_objr[ii].nabor) {\
	    	    	pk2_predmetov[ic_objr[ii].nabor] -= 1;\
	    	    }\
	    	    i_slot[ii]+=1;\
                continue;\
		    }\
		    else{\
		        i_slot[ii]=0;\
		        continue;\
		    }\
        }\
        else{\
            deneg_ushlo -= ic_objr[ii].price;\
            i_slot[ii]+=1;\
            continue;\
        }\
    }\
\
	if (samoe_ono.price >= 0) {\
		resultaty_z[irabota] = {};\
		resultaty_z[irabota].to = samoe_ono.to+zaschita.to;\
		resultaty_z[irabota].ton = samoe_ono.ton;\
		resultaty_z[irabota].price = samoe_ono.price;\
		resultaty_z[irabota].zas = samoe_ono.zas;\
		resultaty_z[irabota].zan = samoe_ono.zan;\
		resultaty_z[irabota].items = [];\
		for (i = 0; i < pk2_types.length; ++i) {\
			vvv = vyborka_z[pk2_types[i]].simple.spisok[samoe_ono[pk2_types[i]]];\
			resultaty_z[irabota].items[i] = {};\
			resultaty_z[irabota].items[i].tid = vvv.tid;\
			resultaty_z[irabota].items[i].bon = vvv.bon;\
			resultaty_z[irabota].items[i].price = vvv.price;\
			resultaty_z[irabota].items[i].zas = vvv.zas;\
		}\
            rabnavyki_z[irabota]={};\
            for (num_index in zaschita.navyki){\
                temp_n = {};\
                temp_n[num_index]=1;\
                val=summa_ochkov2(pers.skills,temp_n);\
                temp_u = {};\
                for (ee = pk2_types.length-1;ee>=0;--ee){\
                    sid = resultaty_z[irabota].items[ee].tid;\
                    if (sid > 0){\
                        val+=summa_ochkov(items[sid].bonus,temp_n);\
                        temp_k = items[sid].set.key;\
                        if (temp_k){\
                            if (temp_u[temp_k])\
                                temp_u[temp_k]+=1;\
                            else\
                                temp_u[temp_k]=1;\
                        }\
                    }\
                } \
                for (uu = nabory.length - 1; uu>=0; --uu){\
                    if (temp_u[nabory[uu]]>1){\
                        bn = komplekty[nabory[uu]][temp_u[nabory[uu]]].bonus;\
                        val+=summa_ochkov(bn,temp_n);\
                    }\
                }\
                rabnavyki_z[irabota][num_index]={};\
                rabnavyki_z[irabota][num_index].name=pers.skill_titles[num_index];\
                rabnavyki_z[irabota][num_index].znach = val;\
                rabnavyki_z[irabota][num_index].mul = zaschita.navyki[num_index];\
            }\
	}\
	else{\
		resultaty_z[irabota] = null;\
	}\
    pk2_vybzap_z();\
};\
";

pk2_code += "\
pk2_rekurs_r = function (){\
    nn = pk2_types.length;\
    rr = 8;\
    for (ii = ii_rekur; ii >= 0; )\
    {\
        if (--rekurs_time <= 0){\
            ii_rekur = ii;\
            rekurs_time = 50000;\
            ++rekurs_step;\
           	new HumanMessage('Перебор вещей продолжается, шаг №'+rekurs_step, {type: 'success'});\
            window.setTimeout(pk2_rekurs_r, rekurs_delay);\
            return 1;\
        }\
        if (i_slot[ii] >= i_slot_max[ii]){\
            if (--ii >= 0){\
                deneg_ushlo -= ic_objr[ii].price;\
                pk2_to -= ic_objr[ii].bon;\
                pk2_ride -= ic_objr[ii].ride;\
    	    	if (ic_objr[ii].nabor) {\
	    	    	pk2_predmetov[ic_objr[ii].nabor] -= 1;\
	    	    }\
	    	    i_slot[ii]+=1;\
            }\
    	    continue;\
        }\
        deb_v = vyborka_r[pk2_types[ii]].simple.spisok;\
        ic_objr[ii] = deb_v[i_slot[ii]];\
        deneg_ushlo += ic_objr[ii].price;\
        if (deneg_ushlo <= bablo)\
        {\
			if (ic_objr[ii].nabor) {\
    			pk2_predmetov[ic_objr[ii].nabor] += 1;\
	    	}\
		    pk2_to += ic_objr[ii].bon;\
		    pk2_ride += ic_objr[ii].ride;\
		    if (++ii == nn){\
    			ton = 0;\
    			rin = 0;\
    			speen = 1.0;\
	    		for (inabor = nabory.length - 1; inabor >= 0; --inabor) \
		    		if (pk2_predmetov[nabory[inabor]] > 0) {\
			    		ton += komp_rab[nabory[inabor]][pk2_predmetov[nabory[inabor]]];\
			    		rin += komp_skor[nabory[inabor]][pk2_predmetov[nabory[inabor]]].ride;\
			    		speen *= komp_skor[nabory[inabor]][pk2_predmetov[nabory[inabor]]].speed;\
				    }\
    			pk2_to += ton;\
    			pk2_ride += rin;\
    			pk2_speed = 100;\
    			if (ic_objr[rr].speed < 1.0){\
    			    pk2_speed = 100.0 / ic_objr[rr].speed + pk2_ride;\
    			}\
    			pk2_speed /= speen;\
    			pk2_speed /= pers.default_speed;\
	    		if ((samoe_ono.speed < pk2_speed)&&(pk2_to > 0)) {\
		    		samoe_ono.to = pk2_to;\
			    	samoe_ono.ton = speen;\
                    samoe_ono.ride = pk2_ride;\
                    samoe_ono.speed = pk2_speed;\
				    samoe_ono.price=deneg_ushlo;\
				    for (jj = nn - 1; jj >= 0; --jj) {\
					    samoe_ono[pk2_types[jj]] = i_slot[jj];\
				    }\
    			}\
			    pk2_to -= ton;\
			    pk2_ride -= rin;\
			    --ii;\
                deneg_ushlo -= ic_objr[ii].price;\
                pk2_to -= ic_objr[ii].bon;\
                pk2_ride -= ic_objr[ii].ride;\
    	    	if (ic_objr[ii].nabor) {\
	    	    	pk2_predmetov[ic_objr[ii].nabor] -= 1;\
	    	    }\
	    	    i_slot[ii]+=1;\
                continue;\
		    }\
		    else{\
		        i_slot[ii]=0;\
		        continue;\
		    }\
        }\
        else{\
            deneg_ushlo -= ic_objr[ii].price;\
            i_slot[ii]+=1;\
            continue;\
        }\
    }\
\
	if (samoe_ono.price >= 0) {\
        if (irabota==141){\
    		resultaty[irabota] = {};\
	    	resultaty[irabota].to = Math.round(samoe_ono.speed);\
		    resultaty[irabota].ton = (1.0/samoe_ono.ton).toFixed(2);\
		    resultaty[irabota].price = samoe_ono.price;\
		    resultaty[irabota].items = [];\
    		for (i = 0; i < pk2_types.length; ++i) {\
	    		vvv = vyborka_r[pk2_types[i]].simple.spisok[samoe_ono[pk2_types[i]]];\
		    	resultaty[irabota].items[i] = {};\
			    resultaty[irabota].items[i].tid = vvv.tid;\
    			resultaty[irabota].items[i].bon = vvv.ride;\
	    		resultaty[irabota].items[i].price = vvv.price;\
		    }\
            rabnavyki[irabota]={};\
            rabnavyki[irabota].ride={};\
            rabnavyki[irabota].ride.name=pers.skill_titles.ride;\
            rabnavyki[irabota].ride.znach = samoe_ono.ride;\
            rabnavyki[irabota].ride.mul = 1.0;\
            resultaty_r[irabota] = null;\
            rabnavyki_r[irabota] = null;\
        }\
        else{\
		    resultaty_r[irabota] = {};\
		    resultaty_r[irabota].to = samoe_ono.to;\
		    resultaty_r[irabota].ton = samoe_ono.ton;\
		    resultaty_r[irabota].price = samoe_ono.price;\
		    resultaty_r[irabota].ride = samoe_ono.ride;\
		    resultaty_r[irabota].speed = samoe_ono.speed;\
		    resultaty_r[irabota].items = [];\
		    for (i = 0; i < pk2_types.length; ++i) {\
			    vvv = vyborka_r[pk2_types[i]].simple.spisok[samoe_ono[pk2_types[i]]];\
			    resultaty_r[irabota].items[i] = {};\
			    resultaty_r[irabota].items[i].tid = vvv.tid;\
			    resultaty_r[irabota].items[i].bon = vvv.bon;\
			    resultaty_r[irabota].items[i].price = vvv.price;\
			    resultaty_r[irabota].items[i].ride = vvv.ride;\
			    resultaty_r[irabota].items[i].speed = vvv.speed;\
		    }\
            rabnavyki_r[irabota]={};\
            rabnavyki_r[irabota].ride={};\
            rabnavyki_r[irabota].ride.name=pers.skill_titles.ride;\
            rabnavyki_r[irabota].ride.znach = samoe_ono.ride;\
            rabnavyki_r[irabota].ride.mul = 1.0;\
		}\
	}\
	else{\
		resultaty_r[irabota] = null;\
	}\
    pk2_vybzap_r();\
};\
";
	
pk2_code +="\
pk2_auto_odev = function(va, rab){\
	pk2_odev_type=0;\
	pk2_odev_var=va;\
	pk2_odev_count=0;\
	pk2_odev_rab=rab;\
	pk2_odev_stat=true;\
	zz = document.getElementById('current_task_box_text');\
	zz.innerHTML='Ты одеваешься';\
	pk2_odev_window();\
};\
\
pk2_odev_add = function(va, irab){\
	if (va==='n')\
		{rrab = resultaty[irab];index=raboty[irab].rus_name;}\
	else if (va==='z')\
		{rrab = resultaty_z[irab];index=raboty[irab].rus_name+'_(защита)'}\
	else if (va==='r')\
		{rrab = resultaty_r[irab];index=raboty[irab].rus_name+'_(передвижение)'}\
	if (!rrab||!rrab.items) return false;\
	for (ee = 0; ee < pk2_types.length; ++ee){\
		if (rrab.items[ee]&&rrab.items[ee].tid){\
			if (!pk2_odev_list[index]) pk2_odev_list[index]={};\
			pk2_odev_list[index][pk2_types[ee]] = rrab.items[ee].tid;\
		}\
	}\
	pk2_odev_save_list();\
	pk2_odev_spam_option();\
};\
\
pk2_odev_remove = function(va, irab){\
	if (va==='n')\
		{index=raboty[irab].rus_name;}\
	else if (va==='z')\
		{index=raboty[irab].rus_name+'_(защита)'}\
	else if (va==='r')\
		{index=raboty[irab].rus_name+'_(передвижение)'}\
	if (pk2_odev_list[index]){\
		delete pk2_odev_list[index];\
		alert(index+' удалено!')\
	}\
	pk2_odev_save_list();\
	pk2_odev_spam_option();\
};\
\
pk2_odev_save_list = function(){\
	tempo = 'pk2_odev_list={';\
	for (ii in pk2_odev_list){\
		tempo+='\"'+ii+'\":';\
		tids = pk2_odev_list[ii];\
		tmp = '{';\
		for (ee = 0; ee < pk2_types.length; ++ee){\
			if (tids[pk2_types[ee]]){\
				tmp+=pk2_types[ee]+':'+tids[pk2_types[ee]]+', ';\
			}\
		}\
		tmp += '}';\
		tmp = tmp.replace(', }','}');\
		tempo+=tmp+', ';\
	};\
	tempo+='}';\
	tempo = tempo.replace(', }','}');\
	pk2_setValue(pk2_pre+'odev_list',tempo);\
};\
\
pk2_odev_spam_option = function(){\
	equip_select = document.getElementById('pk2_spam_select');\
	if (!equip_select) return;\
	equip_select.innerHTML='<option value=\"0\">Сохранённые наборы</option>';\
	arra={};\
	jj=0;\
	for (ii in pk2_odev_list) {arra[jj++]={ves:ii};}\
	qsort(arra,0,jj);\
	for (i=0;i<jj;++i){\
		ii=arra[i].ves;\
		t_op = document.createElement('option');\
		t_op.textContent = ii;\
		t_op.setAttribute('value',ii);\
		equip_select.appendChild(t_op);\
	}\
};\
\
pk2_odev_spam_go = function(){\
	equip_select = document.getElementById('pk2_spam_select');\
	name = equip_select.options[equip_select.selectedIndex].value;\
	irab=777;\
	resultaty[irab]={};\
	resultaty[irab].items={};\
	for (ee=0;ee<pk2_types.length;++ee){\
		resultaty[irab].items[ee] = {};\
		if (pk2_odev_list[name][pk2_types[ee]]){\
			resultaty[irab].items[ee].tid = pk2_odev_list[name][pk2_types[ee]];\
		}\
	}\
	pk2_auto_odev('n',irab);\
};\
\
pk2_odev_spam_rewrite = function(){\
	equip_select = document.getElementById('pk2_spam_select');\
	name = equip_select.options[equip_select.selectedIndex].value;\
	spam_value = document.getElementById('pk2_spam_new');\
	name2 = spam_value.value;\
	if (pk2_odev_list[name]){\
		pk2_odev_list[name2]=pk2_odev_list[name];\
		delete pk2_odev_list[name];\
		pk2_odev_save_list();\
		pk2_odev_spam_option();\
	}\
};\
\
pk2_odev_spam_del = function(){\
	equip_select = document.getElementById('pk2_spam_select');\
	name = equip_select.options[equip_select.selectedIndex].value;\
	if (pk2_odev_list[name]){\
		delete pk2_odev_list[name];\
		alert(name+' удалено!');\
		pk2_odev_save_list();\
		pk2_odev_spam_option();\
	}\
};\
\
pk2_odev_spam_save = function(){\
	spam_value = document.getElementById('pk2_spam_new');\
	name = spam_value.value;\
	if (pk2_odev_list[name]){\
		gu_gu = confirm('Перезаписать набор '+name+' ?');\
		if (!gu_gu) return;\
	}\
	if (!Wear||!Wear.wear) return;\
	pk2_odev_list[name]={};\
	for (ee=0;ee<pk2_types.length;++ee){\
		if (Wear.wear[pk2_types[ee]]){\
			pk2_odev_list[name][pk2_types[ee]] = Wear.wear[pk2_types[ee]].obj.item_id;\
		}\
	}\
	pk2_odev_save_list();\
	pk2_odev_spam_option();\
};\
\
pk2_odev_spam = function(){\
	if (!pk2_odevalo4ka) return;\
	wear_div = document.getElementById('window_inventory_content');\
	if (!wear_div) {setTimeout(pk2_odev_spam,2000);return}\
 ww=wear_div.getElementById('char_head');\
 if (!ww) {setTimeout(pk2_odev_spam,2000);return}\
 if (document.getElementById('pk2_wear_spam')) {setTimeout(pk2_odev_spam,5000);return};\
        qwe=document.getElementById('window_inventory_title');\
	qwe.innerHTML=qwe.innerHTML.replace('Багаж','');\
 var wear_spam = document.createElement('div');\
 wear_spam.setAttribute('id', 'pk2_wear_spam');\
 wear_spam.setAttribute('style', 'position: absolute; top: 1px; left: 5px; padding: 3px; margin: 0px;font-size:75%;');\
 var wear_spam2 = document.createElement('div');\
 wear_spam2.setAttribute('id', 'pk2_wear_spam2');\
 wear_spam2.setAttribute('style', 'position: absolute; top: 1px; left: 140px; padding: 3px; margin: 0px;font-size:75%;');\
 wear_div.parentNode.insertBefore(wear_spam,wear_div);\
 wear_div.parentNode.insertBefore(wear_spam2,wear_div);\
	var store_set_link = document.createElement('a');\
	store_set_link.setAttribute('href', '#');\
	store_set_link.setAttribute('title', 'Сохранить текущую экипировку как набор');\
	store_set_link.setAttribute('onclick', 'pk2_odev_spam_save(); return false;');\
 store_set_link.setAttribute('style', 'color: white');\
	store_set_link.textContent = 'Сохр.';\
	wear_spam.appendChild(store_set_link);\
	var store_set_value = document.createElement('input');\
	store_set_value.setAttribute('id','pk2_spam_new');\
	store_set_value.setAttribute('type','text');\
	store_set_value.setAttribute('size','20');\
	store_set_value.setAttribute('value','Название нового набора...');\
	store_set_value.setAttribute('class','pk2_sel');\
	store_set_value.setAttribute('style','-moz-user-select: text; margin: 0px 3px;font-size:100%;');\
	wear_spam.appendChild(store_set_value);\
	var br_br = document.createElement('br');\
	var store_rewrite_link = document.createElement('a');\
	store_rewrite_link.setAttribute('href', '#');\
	store_rewrite_link.setAttribute('title', 'Заменить название выбраного набора');\
	store_rewrite_link.setAttribute('onclick', 'pk2_odev_spam_rewrite(); return false;');\
 store_rewrite_link.setAttribute('style', 'color: white; margin: 0px 3px');\
	store_rewrite_link.textContent = 'Переим.';\
	wear_spam2.appendChild(store_rewrite_link);\
	var delete_link = document.createElement('a');\
	delete_link.setAttribute('href', '#');\
	delete_link.setAttribute('title', 'Удалить выбранный набор');\
	delete_link.setAttribute('style', 'margin-right: 7px');\
	delete_link.setAttribute('onclick', 'confirm (\"Удалить набор?\")?pk2_odev_spam_del():void(0); return false;');\
 delete_link.setAttribute('style', 'color: white');\
	delete_link.textContent = 'Удал.';\
	wear_spam2.appendChild(delete_link);\
	var equip_select = document.createElement('select');\
	equip_select.setAttribute('id', 'pk2_spam_select');\
	equip_select.setAttribute('class','pk2_sel');\
	equip_select.setAttribute('style', 'width: 130px; max-width: 135px; margin: 0px 3px;font-size:100%;');\
	wear_spam2.appendChild(equip_select);\
	pk2_odev_spam_option();\
	var equip_link = document.createElement('a');\
	equip_link.setAttribute('href', '#');\
	equip_link.setAttribute('id', 'equip_link');\
	equip_link.setAttribute('onclick', 'pk2_odev_spam_go(); return false;');\
	equip_link.setAttribute('title', 'Запустить процесс переодевания');\
 equip_link.setAttribute('style', 'color: white');\
	equip_link.textContent = 'Надеть';\
	wear_spam2.appendChild(equip_link);\
	setTimeout(pk2_odev_spam,5000);\
};\
\
\
pk2_odev_window = function(){\
	if (!AjaxWindow.windows['inventory']){\
		if (pk2_odev_count++===0){\
			AjaxWindow.show('inventory');\
			setTimeout(pk2_odev_window, pk2_odev_time);\
			return;\
		}\
		else{\
			if(pk2_odev_count<pk2_odev_rep*5){\
				setTimeout(pk2_odev_window, pk2_odev_time);\
				return;\
			}\
		}\
	}\
	else{\
		if (!AjaxWindow.windows['inventory'].isReady){\
			if(pk2_odev_count++<pk2_odev_rep*5){\
				setTimeout(pk2_odev_window, pk2_odev_time);\
				return;\
			}\
		}\
	}\
	pk2_odev_count=0;\
	pk2_odevalka();\
};\
\
pk2_odev_zapusk = function(){\
	pk2_odev_type++;pk2_odev_count=0;\
	pk2_odevalka();\
\
};\
\
pk2_odev_control = function(typ, id){\
	zz = Wear.wear[pk2_types[pk2_odev_type]];\
	if (zz&&(zz.obj.item_id!=pk2_odev_item)){\
		if(pk2_odev_count++ <= pk2_odev_rep){\
			setTimeout(pk2_odev_control,pk2_odev_time);\
			return;\
		}\
		else{\
			pk2_odev_stat=false;\
		}\
	}\
	pk2_odev_zapusk();\
};\
\
pk2_odevalka = function(){\
	ee = pk2_odev_type;\
	irab=pk2_odev_rab;\
	if (ee >= pk2_types.length){\
		if (pk2_odev_stat) {document.getElementById('current_task_box_text').innerHTML='Ты оделся!'}\
		else {document.getElementById('current_task_box_text').innerHTML='Чёрт! Опять полураздет'}\
		return;\
	}\
	if (pk2_odev_var==='n')\
		sid = resultaty[irab].items[ee].tid;\
	else if (pk2_odev_var==='z')\
		sid = resultaty_z[irab].items[ee].tid;\
	else if (pk2_odev_var==='r')\
		sid = resultaty_r[irab].items[ee].tid;\
	if (sid){\
		if (Wear.wear[pk2_types[ee]]&&(Wear.wear[pk2_types[ee]].obj.item_id===sid)){\
			pk2_odev_zapusk();\
			return;\
		}\
		var inv = Bag.getInstance().items;\
		for (vv in inv){\
			if (inv[vv].obj.item_id===sid){\
				Bag.getInstance().carry(vv);\
				pk2_odev_item=sid;\
				pk2_odev_control();\
				return;\
			}\
		}\
		pk2_odev_zapusk();return;\
	}\
	else{\
		pk2_odev_zapusk();\
		return;\
	}\
\
};\
";


aWindow.pk2_setValue = function(key,value) {
//	window.setTimeout(GM_setValue, 1, key, value);
	window.setTimeout(function() {GM_setValue(key,value)}, 0);
};
// Work arounds to be able to use the GM_getValue functions in the normal code. Note that this function is 'asynchronous',
//  so any following code has to be called with a delay, to have AEG.equipItems set.
aWindow.pk2_getValue = function(key) {
	window.setTimeout(function() {	aWindow.pk2_abyrvalg = GM_getValue(key);}, 1 );
};


pk2_code +="\
pk2_worker = function(schet){\
	for (vv in Bag.getInstance().items){\
		pk2_worker2(schet);\
		return;\
	}\
	if (!pk2_count_inv) AjaxWindow.show('inventory');\
	if (++pk2_count_inv < 15){\
		if (schet) {setTimeout(pk2_worker4,1000)}else{setTimeout(pk2_worker3,1000)}} \
	else {pk2_count_inv=0;pk2_worker2(schet)}\
}\
;";

pk2_code +="\
pk2_worker3 = function(){\
	for (vv in Bag.getInstance().items){\
		pk2_worker2(false);\
		return;\
	}\
	if (!pk2_count_inv) AjaxWindow.show('inventory');\
	if (++pk2_count_inv < 15){\
		setTimeout(pk2_worker3,1000)} \
	else {pk2_count_inv=0;pk2_worker2(false)}\
}\
;";

pk2_code +="\
pk2_worker4 = function(){\
	for (vv in Bag.getInstance().items){\
		pk2_worker2(true);\
		return;\
	}\
	if (!pk2_count_inv) AjaxWindow.show('inventory');\
	if (++pk2_count_inv < 15){\
		setTimeout(pk2_worker4,1000)} \
	else {pk2_count_inv=0;pk2_worker2(true)}\
}\
;";

aWindow.pk2_worker2 = function(schet){
    aWindow.pk2_process=true;
    aWindow.resultaty=[];
    aWindow.resultaty_z=[];
    aWindow.resultaty_r=[];
    aWindow.zaschita=null;
    aWindow.ezda = false;
    aWindow.rabnavyki=[];
    aWindow.rabnavyki_z=[];
    aWindow.pk2_khochuka = [];
	aWindow.pers = aWindow.Character;

	vse_vse = document.getElementById('pk2_skol_rabot_v').checked;
	vse_rab = document.getElementById('pk2_skol_rabot_r').checked;
	nesk_rab = document.getElementById('pk2_skol_rabot_n').checked;
	skil_rab = document.getElementById('pk2_skol_rabot_s').checked;
	item_rab = document.getElementById('pk2_skol_rabot_i').checked;
	aWindow.pk2_vse_raboty = vse_vse||vse_rab;
	vyb_rab = document.getElementById('pk2_rabota');
	aWindow.porabotaj=null;
	aWindow.porabotaj=[];
	if (vse_vse){
		for (r in aWindow.raboty){
			if ((r>0)&&(r<=141))
				aWindow.porabotaj[r]=true;
		}
	}
	else if (vse_rab){
		for (r in aWindow.raboty){
			if ((r>0)&&(r<130))
				aWindow.porabotaj[r]=true;
		}
	     }
             else if (skil_rab){
		    ns = document.getElementById('pk2_rabota20');
                    var ss='';
                    for (s in ns.options){
			if (ns.options[s].selected)
				if (ns.options[s].value > 0)
					ss=ns.options[s].value-1;
                    }
		    ss = aWindow.pk2_vse_navyki[ss];
                    for (r in aWindow.raboty){
			if ((r>0)&&(r<130)){
				for (jj in aWindow.raboty[r].navyki)
					if (ss == jj)
						aWindow.porabotaj[r]=true;
			}
                    }
                  }
                  else if (item_rab){
                         is = document.getElementById('pk2_rabota99');
                         var ii=0;
                         for (i in is.options)
			if (is.options[i].selected)
				if (is.options[i].value > 0){
					ii=is.options[i].value;
				}
		for (r in aWindow.raboty){
			if ((r>0)&&(r<130)){
				for (jj in aWindow.raboty[r].resultaty.produkty)
					if (ii==jj)
						aWindow.porabotaj[r]=true;
			}
		}
	}
	else{
		for (r in vyb_rab.options){
			if (vyb_rab.options[r].selected){
				if (vyb_rab.options[r].value > 0) {
					aWindow.porabotaj[vyb_rab.options[r].value] = true;
				}
			}
		}
	}
	min_hp=parseInt(document.getElementById('pk2_fort_hp').value,10);
	aWindow.pk2_zdorov = (min_hp-100-(aWindow.pers.level-1)*aWindow.pers.lifePointPerHealthSkill)/(aWindow.pers.lifePointPerHealthSkill+aWindow.pers.lifePointPerHealthSkillBonus);
	test_vesch = document.getElementById('pk2_khochuka').checked;
	test_svoi_magaziny = document.getElementById('pk2_smo_mag').checked;
	if (test_vesch){
	    vyb_vesch = document.getElementById('pk2_dobavim_veschi');
	    for (v in vyb_vesch.options){
	        if (vyb_vesch.options[v].selected){
	            if (vyb_vesch.options[v].value > 0){
	                aWindow.pk2_khochuka[vyb_vesch.options[v].value] = true;
	            }
	        }
	    }
	}
	aWindow.pk2_khlam = document.getElementById('pk2_khlam').checked;
	iz_magazinov = document.getElementById('pk2_pokupka').checked;
	vse_veschi= document.getElementById('pk2_vse_vse').checked;
	aWindow.bablo = parseInt(document.getElementById('pk2_bablo').value,10);
	aWindow.pk2_millioner = document.getElementById('pk2_milion').checked;
	if (aWindow.pk2_millioner)
	    aWindow.bablo=1000000;
	plus_level = parseInt(document.getElementById('pk2_uroven').value,10);
	aWindow.ezda = document.getElementById('pk2_skorost').checked
	s_zaschitoj=document.getElementById('pk2_zaschita').checked;
	e_nov_rabota=document.getElementById('pk2_navyki').checked;
	nov_index=aWindow.raboty.length;
	if (e_nov_rabota){
		nr_malus = parseInt(document.getElementById('pk2_malus').value,10);
		nov_rabota={};
		nr_rabota_res=null;
		
		nvn_build=parseFloat(document.getElementById('pk2_build').value);
		nvn_punch=parseFloat(document.getElementById('pk2_punch').value);
		nvn_tough=parseFloat(document.getElementById('pk2_tough').value);
		nvn_endurance=parseFloat(document.getElementById('pk2_endurance').value);
		nvn_health=parseFloat(document.getElementById('pk2_health').value);
		nvn_ride=parseFloat(document.getElementById('pk2_ride').value);
		nvn_reflex=parseFloat(document.getElementById('pk2_reflex').value);
		nvn_dodge=parseFloat(document.getElementById('pk2_dodge').value);
		nvn_hide=parseFloat(document.getElementById('pk2_hide').value);
		nvn_swim=parseFloat(document.getElementById('pk2_swim').value);
		nvn_aim=parseFloat(document.getElementById('pk2_aim').value);
		nvn_shot=parseFloat(document.getElementById('pk2_shot').value);
		nvn_pitfall=parseFloat(document.getElementById('pk2_pitfall').value);
		nvn_finger_dexterity=parseFloat(document.getElementById('pk2_finger_dexterity').value);
		nvn_repair=parseFloat(document.getElementById('pk2_repair').value);
		nvn_leadership=parseFloat(document.getElementById('pk2_leadership').value);
		nvn_tactic=parseFloat(document.getElementById('pk2_tactic').value);
		nvn_trade=parseFloat(document.getElementById('pk2_trade').value);
		nvn_animal=parseFloat(document.getElementById('pk2_animali').value);
		nvn_appearance=parseFloat(document.getElementById('pk2_appearance').value);
		aWindow.raboty[nov_index] = {rus_name:'Конструктор', name:'constructor', malus:nr_malus, navyki:{build:nvn_build, punch:nvn_punch, tough:nvn_tough, endurance:nvn_endurance, health:nvn_health, ride:nvn_ride, reflex:nvn_reflex, dodge:nvn_dodge, hide:nvn_hide, swim:nvn_swim, aim:nvn_aim, shot:nvn_shot, pitfall:nvn_pitfall, finger_dexterity:nvn_finger_dexterity, repair:nvn_repair, leadership:nvn_leadership, tactic:nvn_tactic, trade:nvn_trade, animal:nvn_animal, appearance:nvn_appearance}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:0, producty:null}};
	}
	if (s_zaschitoj){
		aWindow.zaschita=null;
		aWindow.zaschita={};
		aWindow.zaschita.to = parseInt(document.getElementById('pk2_zaschitato').value,10);
		if (document.getElementById('pk2_zaschita_vm').checked){
			aWindow.zaschita.navyki={punch:1,tough:0.5,health:1,reflex:0.5,dodge:1,aim:1,tactic:1};
		}
		else if (document.getElementById('pk2_zaschita_vr').checked){
			aWindow.zaschita.navyki={shot:1,tough:0.5,health:1,reflex:0.5,dodge:1,aim:1,tactic:1};
		}
		else if (document.getElementById('pk2_zaschita_vd').checked){
			aWindow.zaschita.navyki={tough:0.5,health:1,reflex:0.5,dodge:1,tactic:1};
		}
		else if (document.getElementById('pk2_zaschita_vk').checked){
			aWindow.zaschita.navyki=aWindow.raboty[nov_index].navyki;
			e_nov_rabota=false;
		}
		else{
			aWindow.zaschita.navyki={dodge:1};
		}
	}
	else{
		aWindow.zaschita=null;
	}
	if (e_nov_rabota){
		if (vse_vse || vse_rab || nesk_rab) {
			aWindow.porabotaj[nov_index] = true;
		}
		else{
			aWindow.porabotaj=[];
			aWindow.porabotaj[nov_index] = true;
		}
	}

	sslot=document.getElementById('pk2_sloty').checked;
	if (sslot){
		aWindow.pk2_slots={};
		aWindow.pk2_slots.flag=true;
		aWindow.pk2_slots.head =document.getElementById('pk2_head').checked;
		aWindow.pk2_slots.body =document.getElementById('pk2_body').checked;
		aWindow.pk2_slots.belt =document.getElementById('pk2_belt').checked;
		aWindow.pk2_slots.pants =document.getElementById('pk2_pants').checked;
		aWindow.pk2_slots.foot =document.getElementById('pk2_foot').checked;
		aWindow.pk2_slots.neck =document.getElementById('pk2_neck').checked;
		aWindow.pk2_slots.right_arm =document.getElementById('pk2_right_arm').checked;
		aWindow.pk2_slots.left_arm =document.getElementById('pk2_left_arm').checked;
		aWindow.pk2_slots.yield =document.getElementById('pk2_yield').checked;
		aWindow.pk2_slots.animal =document.getElementById('pk2_animal').checked;
	}
	else{
		aWindow.pk2_slots=null;
	}
	//if (!aWindow.pk2_inv_imported){
	    aWindow.pk2_iimport();
	    if (!aWindow.pk2_inv_imported){
	        new aWindow.HumanMessage('Предварительно необходимо импортировать багаж. Откройте, и дождитесь загрузки.<br />После полной загрузки багажа, его можно свернуть или закрыть.');
	        aWindow.pk2_process=false;
	        return;
	    }
	//}
	if (test_vesch&&test_svoi_magaziny){
	    aWindow.pk2_mimport();
	}
	
	if (aWindow.pk2_inv_imported)
	{
        aWindow.pk2_podschet(vse_veschi, iz_magazinov, plus_level, aWindow.pers);
    }
       
    if (aWindow.einfo!=''){
        aWindow.pk2_show_window();
        aWindow.pk2_error_window(aWindow.einfo+'\n'+aWindow.winfo);
    }
    else if (aWindow.winfo!=''){
        aWindow.pk2_show_window();
        aWindow.pk2_error_window(aWindow.winfo);
    }
    
    aWindow.all_def={navyki:{}};
	if (aWindow.zaschita){
		for (z in aWindow.zaschita.navyki) aWindow.all_def.navyki[z]=aWindow.zaschita.navyki[z];
	}
	else	aWindow.all_def.navyki = {aim:2,dodge:2,tactic:2,tough:1,reflex:1,health:1};
	if (schet){
	    aWindow.rekurs_time = 50000;
	    aWindow.rekurs_step = 0;
        aWindow.pk2_vybzap();
    }
    else{
        aWindow.pk2_vybvesch();
    }
}

pk2_code+="\
my_name_is = function (){\
	if (Character&&Character.name){\
		pk2_pre = location.host.substr(0,4)+Character.name;\
		pk2_getValue(pk2_pre+'odev_list');\
		setTimeout(function() {if (pk2_abyrvalg.indexOf('aWindow.')==0) {pk2_abyrvalg=pk2_abyrvalg.slice(8)};eval(pk2_abyrvalg)},500);\
	}\
	else{\
		setTimeout(my_name_is,500);\
	}\
};\
";

/*
<option value=\"133\">	_Атака форта	</option>\
<option value=\"134\">	_Атака форта (меткость)	</option>\
<option value=\"135\">	_Атака форта (уворот)	</option>\
<option value=\"136\">	_Защита форта	</option>\
<option value=\"137\">	_Защита форта (меткость)	</option>\
<option value=\"138\">	_Защита форта (уворот)	</option>\
<option value=\"151\">	vs Стрелок-стрелок атака	</option>\
<option value=\"155\">	vs Стрелок-ударник атака	</option>\
<option value=\"153\">	vs Стрелок-стрелок защита	</option>\
<option value=\"157\">	vs Стрелок-ударник защита	</option>\
<option value=\"159\">	vs Стрелок-все защита	</option>\
<option value=\"161\">	vs2 Стрелок-стрелок атака	</option>\
<option value=\"165\">	vs2 Стрелок-ударник атака	</option>\
<option value=\"163\">	vs2 Стрелок-стрелок защита	</option>\
<option value=\"167\">	vs2 Стрелок-ударник защита	</option>\
<option value=\"169\">	vs2 Стрелок-все защита	</option>\
<option value=\"152\">	vs Ударник-стрелок атака	</option>\
<option value=\"156\">	vs Ударник-ударник атака	</option>\
<option value=\"154\">	vs Ударник-стрелок защита	</option>\
<option value=\"158\">	vs Ударник-ударник защита	</option>\
<option value=\"160\">	vs Ударник-все защита	</option>\
<option value=\"162\">	vs2 Ударник-стрелок атака	</option>\
<option value=\"166\">	vs2 Ударник-ударник атака	</option>\
<option value=\"164\">	vs2 Ударник-стрелок защита	</option>\
<option value=\"168\">	vs2 Ударник-ударник защита	</option>\
<option value=\"170\">	vs2 Ударник-все защита	</option>\
*/

aWindow.pk2_simselect='<select class=\"pk2_sel\" id=\"pk2_rabota\" size=\"1\" onchange=\"javascript:$(\'pk2_skol_rabot_o\').checked=true;\">';
aWindow.pk2_mulselect='<select title=\"Выбор нескольких работ &mdash; с нажатой клавишей Ctrl\" class=\"pk2_sel\" multiple=\"multiple\" id=\"pk2_rabota\" size=\"6\" onchange=\"javascript:$(\'pk2_skol_rabot_n\').checked=true;\">';
aWindow.pk2_conselect='\
<option value=\"0\">	Выберите работу:	</option>\
<option value=\"131\">	<) Строительство 	</option>\
<option value=\"141\">	<)Передвижение	</option>\
<option value=\"125\">	<) СОН-жизнь	</option>\
<option value=\"121\">	Борьба с бандитизмом	</option>\
<option value=\"113\">	Брачный аферист	</option>\
<option value=\"22\">	Выпас коров	</option>\
<option value=\"10\">	Выпас овец	</option>\
<option value=\"1\">	Выпас свиней	</option>\
<option value=\"25\">	Выработка камня	</option>\
<option value=\"55\">	Вырубка леса	</option>\
<option value=\"124\">	Выступление в шоу Баффало Билла	</option>\
<option value=\"85\">	Добыча железа	</option>\
<option value=\"67\">	Добыча нефти	</option>\
<option value=\"32\">	Добыча самоцветов	</option>\
<option value=\"116\">	Добыча свинца	</option>\
<option value=\"109\">	Добыча селитры	</option>\
<option value=\"56\">	Добыча серебра	</option>\
<option value=\"105\">	Добыча серы	</option>\
<option value=\"40\">	Добыча угля	</option>\
<option value=\"50\">	Доставка амуниции	</option>\
<option value=\"115\">	Доставка спиртного	</option>\
<option value=\"17\">	Дубление кожи	</option>\
<option value=\"8\">	Жатва	</option>\
<option value=\"19\">	Захоронение	</option>\
<option value=\"79\">	Знахарство	</option>\
<option value=\"49\">	Изготовление гробов	</option>\
<option value=\"29\">	Клеймение скота	</option>\
<option value=\"112\">	Коммивояжёрство	</option>\
<option value=\"60\">	Конокрадство	</option>\
<option value=\"83\">	Контрабанда	</option>\
<option value=\"96\">	Кормление скота	</option>\
<option value=\"78\">	Кража со взломом	</option>\
<option value=\"24\">	Лесопилка	</option>\
<option value=\"27\">	Лесоповал	</option>\
<option value=\"102\">	Ловля крабов	</option>\
<option value=\"65\">	Мародёрство	</option>\
<option value=\"70\">	Мелкое воровство	</option>\
<option value=\"62\">	Миссионерство	</option>\
<option value=\"88\">	Набивка подков	</option>\
<option value=\"73\">	Налёт	</option>\
<option value=\"74\">	Нападение на дилижанс	</option>\
<option value=\"77\">	Нападение на поезд	</option>\
<option value=\"35\">	Объезд лошадей	</option>\
<option value=\"122\">	Ограбление банка	</option>\
<option value=\"30\">	Ограждение пастбища	</option>\
<option value=\"99\">	Озеленение	</option>\
<option value=\"111\">	Организация родео	</option>\
<option value=\"28\">	Орошение	</option>\
<option value=\"123\">	Освобождение рабов	</option>\
<option value=\"108\">	Отлов гремучих змей	</option>\
<option value=\"48\">	Отлов лошадей	</option>\
<option value=\"75\">	Охота за преступниками	</option>\
<option value=\"52\">	Охота на бизона	</option>\
<option value=\"39\">	Охота на бобра	</option>\
<option value=\"58\">	Охота на волков	</option>\
<option value=\"66\">	Охота на гризли	</option>\
<option value=\"20\">	Охота на индейку	</option>\
<option value=\"51\">	Охота на койотов	</option>\
<option value=\"114\">	Охота на пуму	</option>\
<option value=\"57\">	Охрана дилижанса	</option>\
<option value=\"59\">	Охрана каравана	</option>\
<option value=\"61\">	Охрана тюрьмы	</option>\
<option value=\"16\">	Охрана форта	</option>\
<option value=\"80\">	Парламентёрство	</option>\
<option value=\"76\">	Перевозка заключённых	</option>\
<option value=\"110\">	Перегонка лошадей	</option>\
<option value=\"18\">	Поиск золота	</option>\
<option value=\"117\">	Поиск редких самоцветов	</option>\
<option value=\"68\">	Поиски клада	</option>\
<option value=\"13\">	Помол зерна	</option>\
<option value=\"63\">	Пони-экспресс	</option>\
<option value=\"103\">	Преподавание	</option>\
<option value=\"72\">	Преследование бандитов	</option>\
<option value=\"2\">	Присмотр за полем	</option>\
<option value=\"11\">	Продажа прессы	</option>\
<option value=\"37\">	Прокладка телеграфной линии	</option>\
<option value=\"31\">	Прорыв плотины	</option>\
<option value=\"33\">	Разметка приисков	</option>\
<option value=\"3\">	Расклейка плакатов	</option>\
<option value=\"45\">	Рекогносцировка	</option>\
<option value=\"23\">	Ремонт забора	</option>\
<option value=\"34\">	Ремонт повозок	</option>\
<option value=\"82\">	Речные перевозки	</option>\
<option value=\"7\">	Рыбалка	</option>\
<option value=\"42\">	Рыбная ловля	</option>\
<option value=\"38\">	Рытьё колодца	</option>\
<option value=\"86\">	Сбор агавы	</option>\
<option value=\"91\">	Сбор апельсинов	</option>\
<option value=\"14\">	Сбор кукурузы	</option>\
<option value=\"101\">	Сбор лотоса	</option>\
<option value=\"100\">	Сбор орлиных перьев	</option>\
<option value=\"87\">	Сбор помидоров	</option>\
<option value=\"6\">	Сбор сахарного тростника	</option>\
<option value=\"4\">	Сбор табака	</option>\
<option value=\"97\">	Сбор тыквы	</option>\
<option value=\"15\">	Сбор фасоли	</option>\
<option value=\"5\">	Сбор хлопка	</option>\
<option value=\"98\">	Сбор черники	</option>\
<option value=\"9\">	Сбор ягод	</option>\
<option value=\"12\">	Сенокос	</option>\
<option value=\"69\">	Служба в армии	</option>\
<option value=\"71\">	Служба наёмником	</option>\
<option value=\"104\">	Служба шерифом	</option>\
<option value=\"120\">	Служба шерифом округа	</option>\
<option value=\"118\">	Сооружение миссии	</option>\
<option value=\"46\">	Сплав леса	</option>\
<option value=\"106\">	Сплав по бурному потоку	</option>\
<option value=\"26\">	Спрямление русла	</option>\
<option value=\"44\">	Строительство ветряной мельницы	</option>\
<option value=\"43\">	Строительство вокзала	</option>\
<option value=\"21\">	Строительство железной дороги	</option>\
<option value=\"119\">	Строительство казино	</option>\
<option value=\"47\">	Строительство моста	</option>\
<option value=\"53\">	Строительство особняка	</option>\
<option value=\"84\">	Строительство ранчо	</option>\
<option value=\"41\">	Типография	</option>\
<option value=\"36\">	Торговля	</option>\
<option value=\"64\">	Торговля оружием с индейцами	</option>\
<option value=\"54\">	Торговля с индейцами	</option>\
<option value=\"90\">	Тушение пожара	</option>\
<option value=\"95\">	Уборка картошки	</option>\
<option value=\"93\">	Чистка обуви	</option>\
<option value=\"92\">	Чистка хлева	</option>\
<option value=\"94\">	Штопка носков	</option>\
<option value=\"107\">	Шулерство	</option>\
</select>\
';

aWindow.pk2_slot_selector = function(v_slot){
	document.getElementById('pk2_head').checked = (v_slot=='head');
	document.getElementById('pk2_body').checked = (v_slot=='body');
	document.getElementById('pk2_belt').checked = (v_slot=='belt');
	document.getElementById('pk2_pants').checked = (v_slot=='pants');
	document.getElementById('pk2_foot').checked = (v_slot=='foot');
	document.getElementById('pk2_neck').checked = (v_slot=='neck');
	document.getElementById('pk2_right_arm').checked = (v_slot=='right_arm');
	document.getElementById('pk2_left_arm').checked = (v_slot=='left_arm');
	document.getElementById('pk2_yield').checked = (v_slot=='yield');
	document.getElementById('pk2_animal').checked = (v_slot=='animal');
};

aWindow.pk2_ovselect = function(){
    vyb_vesch_options = document.getElementById('pk2_dobavim_veschi').options;
    for (v in vyb_vesch_options){
        vyb_vesch_options[v].selected = false;
    }
}

aWindow.pk2_show_shmot = function(irab){
    vv = null;
    if (aWindow.resultaty_r[irab]){
        vv = aWindow.resultaty_r[irab];
    }
    else if (aWindow.resultaty_z[irab]){
        vv = aWindow.resultaty_z[irab];
    }
    else if (aWindow.resultaty[irab]){
        vv = aWindow.resultaty[irab];
    }
    if (!vv) return;
    hti = '<table>';
    for (ii = 0; ii < vv.items.length; ++ii){
        sid = vv.items[ii].tid;
        if (sid){
            vesch = aWindow.items[sid];
            hti+='<tr><td><a class=\"tt2\" href=\"#\" ><span><strong>'+vesch.name+'</strong>';
            if (vesch.set.key){
                hti += '<br /><em>'+vesch.set.name+'</em>';
            }
            for (ind in vesch.bonus.attributes){
                hti += aWindow.pk2_a_print(ind, vesch.bonus.attributes[ind]);
            }
            for (ind in vesch.bonus.skills){
                hti += aWindow.pk2_s_print(ind, vesch.bonus.skills[ind]);
            }
            hti += '</span>';
            hti+='<div class=\"bag_item\" ><img src=\"'+ vesch.image_mini +'\" /></div>';
            hti+='</a></td></tr>';
        }
    }
    hti += '</table>';

    pk2_shmot_old = document.getElementById('pk2_shmot');
    pk2_shmot = null;
    html2='';
    
    if (!pk2_shmot){
		html2 += '<div id=\"pk2_shmo2\" style=\"width:' + 90 + 'px;\">\n';
        html2 += '<div style=\"background-color:#302010; text-align:center; font-weight:bold; color:red;\">';
		html2 += '<span>';
		html2 += '<a href=\"javascript:pk2_close_shmot();\"' + aWindow.pk2_tlink + ' title=\"Закрыть\">&nbsp;*&nbsp;</a>&nbsp;';
		html2 += '</span>';
		html2 += '<span id=\"pk2_shmot_cap\">Вещи</span>';
		html2 += '</div>'
		html2 += '<div id=\"pk2_shmot_content\">';

        html2 += hti;
        html2 += '</div>'        		
        
		html2 += '</div>';
		pk2_shmot = document.createElement('div');
		pk2_shmot.id = 'pk2_shmot';
		pk2_shmot.innerHTML = html2;
		pk2_shmot.setAttribute('style', 'position: absolute; right: ' + 20 + 'px; top: ' + 10 + 'px; z-index:251');
	}
	if (pk2_shmot_old)
	    document.body.replaceChild(pk2_shmot, pk2_shmot_old);
	else
	    document.body.appendChild(pk2_shmot);
	pk2_shmot.style.display = 'block';

}

aWindow.pk2_show_panel = function(){
	pk2_title = document.getElementById('pk2_title');
	html0 = '';
	
	if (!pk2_title) {
		html0 += '<div id=\"pk2_form0\" style=\"width:' + aWindow.pk2_w0 + 'px; text-align:left;\">\n';
		html0 += '<table class=\"shadow_table\" align=\"left\"><tbody>\n';
		html0 += '<tr>';
		html0 += '<td class=\"gran_vl\" />\n';
		html0 += '<td class=\"gran_v\" />\n';
		html0 += '<td class=\"gran_vp\" />\n';
		html0 += '</tr><tr>\n';
		html0 += '<td class=\"gran_l\" />\n';
		html0 += '<td style=\"background-color:#302010; text-align:center; font-weight:bold; color:white;\">';
		html0 += '<span>';
		html0 += '<a href=\"javascript:pk2_minimize_title();\"' + aWindow.pk2_tlink + ' title=\"Свернуть\">&nbsp;_&nbsp;</a>&nbsp;';
		html0 += '<a href=\"javascript:pk2_stretch_title();\"' + aWindow.pk2_tlink + ' title=\"Развернуть\">&nbsp;^&nbsp;</a>&nbsp;';
		html0 += '<a href=\"javascript:pk2_close_title();\"' + aWindow.pk2_tlink + ' title=\"Закрыть\">&nbsp;*&nbsp;</a>&nbsp;';
		html0 += '</span>';
		html0 += '<span id=\"pk2_title_cap\" style=\"font-size:11px;\">Поиск&nbsp;&laquo;лучших&raquo;&nbsp;вещей</span>';
		html0 += '<input type=\"button\" value=\"Поехали\" style=\"float:right; font-weight:bold\" onclick=\"javascript:pk2_worker(true)\"/>';
		html0 += '</td><td class=\"gran_p\" />\n'
		html0 += '</tr><tr id=\"pk2_title_content_row\">\n';
		html0 += '<td class=\"gran_l\" />\n';
		html0 += '<td id=\"pk2_title_content0\" class=\"shadow_content\" style=\"width:' + (aWindow.pk2_w0 - 12) + 'px;\" >';
		html0 += '<div id=\"pk2_title_content\" style=\"overflow: auto; height: ' + aWindow.pk2_title_h_mid + 'px;\">';
		
		html0 += '\
<form id=\"pk2_form\">\
	<div id=\"pk2_vselect\">';
		html0 += aWindow.pk2_simselect;
		html0 += aWindow.pk2_conselect;
		
		html0 += '</div>\
	<div' + aWindow.pk2_vblock + '>\
	<div style=\"float:right;\" >Жизнь&nbsp;(форт)&nbsp;&nbsp;<input id=\"pk2_fort_hp\" name=\"pk2_fort_hp\ type=\"text\" value=\"0\" size=\"4\">&nbsp;</div>\
	<input type= \"button\" title=\"Просто показывает не больше семи предметов каждого типа (из всех, с выбранными параметрами отсечки) с наибольшими ТО, без учёта комплектов.\" value=\"Вещи с ТО\" style=\"float:right; clear:right;\" onclick=\"javascript:pk2_worker(false)\"/>\
	<input id=\"pk2_skol_rabot_v\" name=\"pk2_skol_rabot\" type=\"radio\" value=\"v\" style=\"margin:auto 5px;\" />Всё\
	<input id=\"pk2_skol_rabot_r\" name=\"pk2_skol_rabot\" type=\"radio\" value=\"r\" style=\"margin:auto 5px;\" />Все&nbsp;работы<br />\
	<input id=\"pk2_skol_rabot_o\" name=\"pk2_skol_rabot\" type=\"radio\" value=\"o\" checked=\"checked\" style=\"margin:auto 5px;\" onchange=\"javascript:pk2_vselect(false);void(0)\" />Одна&nbsp;работа<br />\
	<input id=\"pk2_skol_rabot_n\" name=\"pk2_skol_rabot\" type=\"radio\" value=\"n\" style=\"margin:auto 5px;\" onchange=\"javascript:pk2_vselect(true);void(0)\" />Нескольно&nbsp;работ<br />\
	<input id=\"pk2_skol_rabot_s\" name=\"pk2_skol_rabot\" type=\"radio\" value=\"s\" style=\"margin:auto 5px;\" />Навык&nbsp;&nbsp;';

		html0 +='<select class=\"pk2_sel\" id=\"pk2_rabota20\" size=\"1\" onchange=\"javascript:$(\'pk2_skol_rabot_s\').checked=true;\">\
	<option value=\"0\">-</option>';
	for (ii=0;ii<aWindow.pk2_vse_navyki.length;++ii)
	{
		html0 += '<option value=\"'+(ii+1)+'\">	'+ aWindow.Character.skill_titles[aWindow.pk2_vse_navyki[ii]]+'</option>';
	};
		html0 += '\
	</select><br />\
	<input id=\"pk2_skol_rabot_i\" name=\"pk2_skol_rabot\" type=\"radio\" value=\"i\" style\"margin:auto 5px;\" />Дроп&nbsp;&nbsp;';

	
		html0 +='\
	<select class=\"pk2_sel\" id=\"pk2_rabota99\" size=\"1\" onchange=\"javascript:$(\'pk2_skol_rabot_i\').checked=true;\">\
	<option value=\"0\">-</option>';
	var tmp=[];
	for (ii=700;ii<1850;++ii){
		tmp[ii]={};
		tmp[ii].ves = aWindow.items[ii] ? aWindow.items[ii].name : '-';
		tmp[ii].id = ii;

if (tmp[ii].ves!='-')
if (aWindow.items[ii].type !='yield')
tmp[ii].ves = '-';
else if (aWindow.items[ii].shop != 'drop')
tmp[ii].ves = '-';
;
;
	}
	aWindow.qsort(tmp,700,1849);
	for (ii=700;ii<1850;++ii)
	{
		if (tmp[ii].ves !== '-')
			html0 += '<option value=\"'+tmp[ii].id+'\">	'+ tmp[ii].ves+'</option>';
	};

		html0 += '\
	</select><br />\
	\
	</div>\
	<!--<div style=\"text-align:left; font-weigth:normal; color:#b8a080; background-color:black; padding-left: 30px;\">Все&nbsp;работы</div>-->\
		<span title=\"После перебора всех работ, скрипт может обнаружить вещи, которые не использовались; и подсчитать продажную стоимость этих вещей (в данной версии ещё слабо реализовано). При нехватке наличности от них эти вещи можно безбоязненно сбыть.\"><input id=\"pk2_khlam\" type=\"checkbox\" style=\"margin:auto 24px auto 27px;\" />\
		Поиск неиспользуемых вещей<br /></span>\
	<!--<div style=\"text-align:left; font-weigth:normal; color:#b8a080; background-color:black; padding-left: 30px;\"><span id=\"pk2_sk_rabot\">Одна&nbsp;работа&nbsp;&nbsp;&nbsp;&nbsp;</span>\
	</div>-->\
		<span title=\"Дополнительно ищется набор предметов с максимальной скоростью движения и доступностю выбранной работы. Полезно для отправки к удалённым работам, с последующим сразу после этого переодеванием в нормальные рабочие вещи.\">\
		<input id=\"pk2_skorost\" type=\"checkbox\" style=\"margin:auto 21px auto 27px;\" />\
		Быстрейшее&nbsp;передвижение к&nbsp;работе?<br /></span>\
	<div' + aWindow.pk2_vblock + '>\
		<span id=\"sp_tst_st3456\" title=\"Хочеться поработать но не хватает немного ТО? Не беда, за деньги можно найти вещи, которые сделают доступными нужную работу.\">\
		<input id=\"pk2_pokupka\" type=\"checkbox\" style=\"margin:auto 21px auto 25px;\" onchange=\"javascript:if (checked) {$(\'pk2_ukr_bablo\').style.display=\'block\'}else{$(\'pk2_ukr_bablo\').style.display=\'none\'};void(0)\" />&nbsp;Докупаем вещи получше?<br /></span>\
		<div id=\"pk2_ukr_bablo\" style=\"display:none;\">\
		<span title=\"Средства, которые вы готовы заплатить за доступ к работам. Для самых богатых буратин есть пункт пониже.\">\
		<input id=\"pk2_bablo\" type=\"text\" value=\"0\" size=\"5\" onchange=\"javascript:value = parseInt(value,10);if((value<0)||isNaN(value))value=0;void(0)\" />\
		&nbsp;Имеется&nbsp;денег&nbsp;на&nbsp;закупки<br /></span>\
		<span title=\"Вы готовы тратить, и тратить любые суммы, на экипирование себя любимого. Скрипт вам поможет, причём этот флажок значительно ускорит поиск необходимой &laquo;лучшей&raquo; вещи.\">\
		<input id=\"pk2_milion\" type=\"checkbox\" style=\"margin:auto 21px auto 25px;\" />&nbsp;Денег&nbsp;без&nbsp;счёта <strong>:)</strong><br /></span>\
		</div>\
		<span title=\"Трость, гаечный ключ и ботинки со шнурками. Этих, или подобных вещей нету в вашем гардеробе, но представить как изменилась бы ваша жизнь если б они появились так хочется? &mdash; не беда, скрипт поможет. Вот правда вещи для другого класса и пола приодеть всё равно не получиться, но всё что подходит будет принято во внимание при расчётах.\">\
		<input id=\"pk2_vse_vse\" type=\"checkbox\" style=\"margin:auto 21px auto 25px;\" />&nbsp;Мечтаем&nbsp;о&nbsp;квестовых&nbsp;и&nbsp;дропе?<br /></span>\
		<div' + aWindow.pk2_vblock + '>\
		<span title=\"Здесь можно выбрать определённую вещь (вещи), и посмотреть, на скольких, и каких работах она будет использоваться.\">\
		<input id=\"pk2_khochuka\" type=\"checkbox\" style=\"margin:auto 23px auto 23px;\" onchange=\"javascript:if (checked) {$(\'pk2_ukr_khochuka\').style.display=\'block\'}else{$(\'pk2_ukr_khochuka\').style.display=\'none\';pk2_ovselect();};void(0)\" />Полезность отсутствующих вещей</span>\
		<div id=\"pk2_ukr_khochuka\" style=\"display:none;\">\
		<span title=\"При выборе этого пункта, в расчёт будут приняты все видимые вещи из ранее открывавшихся магазинов\">\
		<input id=\"pk2_smo_mag\" type=\"checkbox\" style=\"margin:auto 23px auto 23px;\" >Импортировать вещи из магазина(-ов).</span>\
		<select title=\"Выбор нескольких вещей &mdash; с нажатой клавишей Ctrl\" class=\"pk2_sel\" multiple=\"multiple\" id=\"pk2_dobavim_veschi\" size=\"5\">;';
		
    for (vv = 1; vv < 11200; ++vv){
        if ((vv >= 100)&&(vv < 200)) continue;
        if ((vv >= 700)&&(vv < 800)) continue;
        if ((vv >= 900)&&(vv < 10000)) continue;
        if ((vv >= 10200)&&(vv < 11000)) continue;
        if (vv == 1) {html0+='<optgroup title=\"Холодное оружие\" label=\"Холодное оружие\">'}
        if (vv == 200) {html0+='<optgroup title=\"Головные уборы\" label=\"Головные уборы\">'}
        if (vv == 300) {html0+='<optgroup title=\"Одежда\" label=\"Одежда\">'}
        if (vv == 400) {html0+='<optgroup title=\"Обувь\" label=\"Обувь\">'}
        if (vv == 500) {html0+='<optgroup title=\"Шейные повязки\" label=\"Шейные повязки\">'}
        if (vv == 600) {html0+='<optgroup title=\"Животные\" label=\"Животные\">'}
        if (vv == 800) {html0+='<optgroup title=\"Стрелковое оружие\" label=\"Стрелковое оружие\">'}
        if (vv == 10000) {html0+='<optgroup title=\"Штаны\" label=\"Штаны\">'}
        if (vv == 11000) {html0+='<optgroup title=\"Пояс\" label=\"Пояс\">'}
        if (aWindow.items[vv]){
            html0 +='<option value=\"'+vv+'\">	'+aWindow.items[vv].name+'	</option>';
        }
    }
    html0 += '</optgroup><optgroup title=\"Остатки комплектов\" label=\"Остатки комплектов\">';
    // добавим сетовых ручками
    html0 += '<option value=\"792\">	'+aWindow.items[792].name+'	</option>';
    html0 += '<option value=\"794\">	'+aWindow.items[794].name+'	</option>';
    html0 += '<option value=\"797\">	'+aWindow.items[797].name+'	</option>';
    html0 += '<option value=\"768\">	'+aWindow.items[768].name+'	</option>';
    html0 += '<option value=\"723\">	'+aWindow.items[723].name+'	</option>';
    html0 += '<option value=\"1715\">	'+aWindow.items[1715].name+'	</option>';
    html0 += '<option value=\"854\">	'+aWindow.items[854].name+'	</option>';		
    html0 += '</optgroup>';
html0 += '</select></div></div>\
		<span title=\"Не живёте сегодняшним днём, и задумываетесь о будущем? Тогда можно посмотреть, какие вещи будут необходимы и полезны уровней через 5. Увеличивает отсечку по уровню, на заданное число. Навыки и характеристики применяются текущими.\"><input id=\"pk2_uroven\" type=\"text\" value=\"0\" size=\"5\" onchange=\"javascript:value = parseInt(value,10);if(isNaN(value))value=0;void(0)\" />\
		&nbsp;&laquo;прибавка&raquo;&nbsp;уровня<br /></span>\
	<div' +
		aWindow.pk2_vblock +
		'>\
		<span title=\"При выборе этого флажка скрипт ищет вещи не с наибольшим ТО, а с ТО не меньшими заданного, но с максимальными боевыми навыками\"><input id=\"pk2_zaschita\" type=\"checkbox\" style=\"margin:auto 21px auto 23px;\" onchange=\"javascript:if (checked) {$(\'pk2_ukr_zaschita\').style.display=\'block\'}else{$(\'pk2_ukr_zaschita\').style.display=\'none\'};void(0)\" />&nbsp;Сопротивляемся&nbsp;нападающим?<br /></span>\
	<div id=\"pk2_ukr_zaschita\" style=\"display:none;\">\
		<span title=\"Боевые навыки: удар, меткость, увёртливость, тактика, здоровье (с весом в 0,5 рефлекс и стойкость)\"><input id=\"pk2_zaschita_vm\" name=\"pk2_zaschita_v\" type=\"radio\" value=\"m\" style\"margin:auto 5px;\" />&nbsp;Ударник&nbsp;</span>\
		<span title=\"Боевые навыки: стрельба, меткость, увёртливость, тактика, здоровье (с весом в 0,5 рефлекс и стойкость)\"><input id=\"pk2_zaschita_vr\" name=\"pk2_zaschita_v\" type=\"radio\" value=\"r\" style\"margin:auto 5px;\" />&nbsp;Стрелок&nbsp;</span>\
		<span title=\"Боевые навыки: увёртливость, тактика, здоровье (с весом в 0,5 рефлекс и стойкость)\"><input id=\"pk2_zaschita_vd\" name=\"pk2_zaschita_v\" type=\"radio\" checked=\"checked\" value=\"d\" style\"margin:auto 5px;\" />&nbsp;&laquo;Выжить&nbsp;бы&raquo;<br /></span>\
		<span title=\"Боевые навыки: беруться из конструктора (ниже) все навыки с заявленными весами\"><input id=\"pk2_zaschita_vk\" name=\"pk2_zaschita_v\" type=\"radio\" value=\"k\" style\"margin:auto 5px;\" />&nbsp;Используем&nbsp;навыки&nbsp;из&nbsp;конструктора<br /></span>\
		<span title=\"Для заданной работы(работ) ТО будет не меньше указанного. Все &laquo;излишки&raquo; скрипт попытается использовать на боевые навыки\"><input id=\"pk2_zaschitato\" type=\"text\" value=\"' +
		aWindow.pk2_zaschitato +
		'\" size=\"5\" onchange=\"javascript:value = parseInt(value,10);if((value<0)||isNaN(value))value=0;void(0)\" />&nbsp;Минимум&nbsp;ТО&nbsp;(рабочих)&nbsp;<br /></span>\
		</div></div>\
		\
	<div' +
		aWindow.pk2_vblock +
		'>\
		<span title=\"Здесь можно выбрать слоты (части тела) которые будут браться из экипировки, то есть скрипт не будет подбирать другие (неодетые) предметы, для отмеченных частей\"><input id=\"pk2_sloty\" value=\"pk2_sloty\" type=\"checkbox\" onchange=\"javascript:if (checked) {$(\'pk2_sloty_content\').style.display=\'block\'}else{$(\'pk2_sloty_content\').style.display=\'none\'};void(0)\" style=\"margin:auto 23px auto 23px;\" />Слоты из экипировки:<br /></span>\
		<div id=\"pk2_sloty_content\" style=\"display:none; \">\
	<div' +
		aWindow.pk2_vblock +
		'>\
		<input name=\"pk2_slot_selecter\" type=\"radio\" style=\"margin:auto auto auto 23px;\" onchange=\"javascript:pk2_slot_selector(\'head\');void(0);\"/>\
		<input id=\"pk2_head\" type=\"checkbox\" checked=\"1\" style=\"margin:auto 23px auto 21px;\" />Головной убор<br />\
		<input name=\"pk2_slot_selecter\" type=\"radio\" style=\"margin:auto auto auto 23px;\" onchange=\"javascript:pk2_slot_selector(\'neck\');void(0);\"/>\
		<input id=\"pk2_neck\" type=\"checkbox\" checked=\"1\" style=\"margin:auto 23px auto 21px;\" />Шейная повязка<br />\
		<input name=\"pk2_slot_selecter\" type=\"radio\" style=\"margin:auto auto auto 23px;\" onchange=\"javascript:pk2_slot_selector(\'body\');void(0);\"/>\
		<input id=\"pk2_body\" type=\"checkbox\" checked=\"1\" style=\"margin:auto 23px auto 21px;\" />Одежда<br />\
		<input name=\"pk2_slot_selecter\" type=\"radio\" style=\"margin:auto auto auto 23px;\" onchange=\"javascript:pk2_slot_selector(\'belt\');void(0);\"/>\
		<input id=\"pk2_belt\" type=\"checkbox\" checked=\"1\" style=\"margin:auto 23px auto 21px;\" />Пояс<br />\
		<input name=\"pk2_slot_selecter\" type=\"radio\" style=\"margin:auto auto auto 23px;\" onchange=\"javascript:pk2_slot_selector(\'pants\');void(0);\"/>\
		<input id=\"pk2_pants\" type=\"checkbox\" checked=\"1\" style=\"margin:auto 23px auto 21px;\" />Штаны<br />\
		<input name=\"pk2_slot_selecter\" type=\"radio\" style=\"margin:auto auto auto 23px;\" onchange=\"javascript:pk2_slot_selector(\'right_arm\');void(0);\"/>\
		<input id=\"pk2_right_arm\" type=\"checkbox\" checked=\"1\" style=\"margin:auto 23px auto 21px;\" />Дуэльное оружие<br />\
		<input name=\"pk2_slot_selecter\" type=\"radio\" style=\"margin:auto auto auto 23px;\" onchange=\"javascript:pk2_slot_selector(\'left_arm\');void(0);\"/>\
		<input id=\"pk2_left_arm\" type=\"checkbox\" checked=\"1\" style=\"margin:auto 23px auto 21px;\" />Фортовое оружие<br />\
		<input name=\"pk2_slot_selecter\" type=\"radio\" style=\"margin:auto auto auto 23px;\" onchange=\"javascript:pk2_slot_selector(\'foot\');void(0);\"/>\
		<input id=\"pk2_foot\" type=\"checkbox\" checked=\"1\" style=\"margin:auto 23px auto 21px;\" />Обувь<br />\
		<input name=\"pk2_slot_selecter\" type=\"radio\" style=\"margin:auto auto auto 23px;\" onchange=\"javascript:pk2_slot_selector(\'animal\');void(0);\"/>\
		<input id=\"pk2_animal\" type=\"checkbox\" checked=\"1\" style=\"margin:auto 23px auto 21px;\" />Верховое животное<br />\
		<input name=\"pk2_slot_selecter\" type=\"radio\" style=\"margin:auto auto auto 23px;\" onchange=\"javascript:pk2_slot_selector(\'yield\');void(0);\"/>\
		<input id=\"pk2_yield\" type=\"checkbox\" checked=\"1\" style=\"margin:auto 23px auto 21px;\" />Продукт<br />\
		</div></div></div>\
	<div' +
		aWindow.pk2_vblock +
		'>\
		<span title=\"Здесь можно составить произвольную &laquo;работу&raquo; задав сложность работы, и любые необходимые навыки с &laquo;силой&raquo; от 0 до 5 (можно применять дробные числа вида 1.375).\n Используя ограничение по слотам и выбранный навык с весом 1 можно подбирать вещи для квестов вида {меткость = 27 с бонусом, приходи в чёрных лохмотьях и серых ботинках}.\n Либо если задействована защита и соответствующий выбор конструктора - данные навыки рассматриваются как боевые и заменяют предустановки"><input id=\"pk2_navyki\" value=\"pk2_sloty\" type=\"checkbox\" onchange=\"javascript:if (checked) {$(\'pk2_navyki_content\').style.display=\'block\'}else{$(\'pk2_navyki_content\').style.display=\'none\'};void(0)\" style=\"margin:auto 21px auto 23px;\" />\
		Конструкция&nbsp;произвольных&nbsp;навыков<br /></span>\
		<div id=\"pk2_navyki_content\" style=\"display:none; \">\
	<div' +
		aWindow.pk2_vblock +
		'>\
		<input id=\"pk2_malus\" type=\"text\" value=\"0\" size=\"5\" onchange=\"javascript:value = parseInt(value,10);if((value< -32767)||(value>32767)||isNaN(value))value=0;void(0)\" />&nbsp;&laquo;Сложность работы&raquo;<br />\
	<div style=\"color:red; font-weight:bold;\">\
		<input id=\"pk2_build\" type=\"text\" value=\"0\" size=\"5\" onchange=\"javascript:value = parseFloat(value);if((value<0)||(value>5)||isNaN(value))value=0;void(0)\" />&nbsp;Строительство<br />\
		<input id=\"pk2_punch\" type=\"text\" value=\"0\" size=\"5\" onchange=\"javascript:value = parseFloat(value);if((value<0)||(value>5)||isNaN(value))value=0;void(0)\" />&nbsp;Удар<br />\
		<input id=\"pk2_tough\" type=\"text\" value=\"0\" size=\"5\" onchange=\"javascript:value = parseFloat(value);if((value<0)||(value>5)||isNaN(value))value=0;void(0)\" />&nbsp;Стойкость<br />\
		<input id=\"pk2_endurance\" type=\"text\" value=\"0\" size=\"5\" onchange=\"javascript:value = parseFloat(value);if((value<0)||(value>5)||isNaN(value))value=0;void(0)\" />&nbsp;Выносливость<br />\
		<input id=\"pk2_health\" type=\"text\" value=\"0\" size=\"5\" onchange=\"javascript:value = parseFloat(value);if((value<0)||(value>5)||isNaN(value))value=0;void(0)\" />&nbsp;Здоровье<br />\
	</div><div style=\"color:green; font-weight:bold;\">\
		<input id=\"pk2_ride\" type=\"text\" value=\"0\" size=\"5\" onchange=\"javascript:value = parseFloat(value);if((value<0)||(value>5)||isNaN(value))value=0;void(0)\" />&nbsp;Верховая езда<br />\
		<input id=\"pk2_reflex\" type=\"text\" value=\"0\" size=\"5\" onchange=\"javascript:value = parseFloat(value);if((value<0)||(value>5)||isNaN(value))value=0;void(0)\" />&nbsp;Реакция<br />\
		<input id=\"pk2_dodge\" type=\"text\" value=\"0\" size=\"5\" onchange=\"javascript:value = parseFloat(value);if((value<0)||(value>5)||isNaN(value))value=0;void(0)\" />&nbsp;Увёртливость<br />\
		<input id=\"pk2_hide\" type=\"text\" value=\"0\" size=\"5\" onchange=\"javascript:value = parseFloat(value);if((value<0)||(value>5)||isNaN(value))value=0;void(0)\" />&nbsp;Маскировка<br />\
		<input id=\"pk2_swim\" type=\"text\" value=\"0\" size=\"5\" onchange=\"javascript:value = parseFloat(value);if((value<0)||(value>5)||isNaN(value))value=0;void(0)\" />&nbsp;Плаванье<br />\
	</div><div style=\"color:blue; font-weight:bold;\">\
		<input id=\"pk2_aim\" type=\"text\" value=\"0\" size=\"5\" onchange=\"javascript:value = parseFloat(value);if((value<0)||(value>5)||isNaN(value))value=0;void(0)\" />&nbsp;Меткость<br />\
		<input id=\"pk2_shot\" type=\"text\" value=\"0\" size=\"5\" onchange=\"javascript:value = parseFloat(value);if((value<0)||(value>5)||isNaN(value))value=0;void(0)\" />&nbsp;Стрельба<br />\
		<input id=\"pk2_pitfall\" type=\"text\" value=\"0\" size=\"5\" onchange=\"javascript:value = parseFloat(value);if((value<0)||(value>5)||isNaN(value))value=0;void(0)\" />&nbsp;Установка ловушек<br />\
		<input id=\"pk2_finger_dexterity\" type=\"text\" value=\"0\" size=\"5\" onchange=\"javascript:value = parseFloat(value);if((value<0)||(value>5)||isNaN(value))value=0;void(0)\" />&nbsp;Проворство<br />\
		<input id=\"pk2_repair\" type=\"text\" value=\"0\" size=\"5\" onchange=\"javascript:value = parseFloat(value);if((value<0)||(value>5)||isNaN(value))value=0;void(0)\" />&nbsp;Ремонт<br />\
	</div><div style=\"color:#960; font-weight:bold;\">\
		<input id=\"pk2_leadership\" type=\"text\" value=\"0\" size=\"5\" onchange=\"javascript:value = parseFloat(value);if((value<0)||(value>5)||isNaN(value))value=0;void(0)\" />&nbsp;Руководство<br />\
		<input id=\"pk2_tactic\" type=\"text\" value=\"0\" size=\"5\" onchange=\"javascript:value = parseFloat(value);if((value<0)||(value>5)||isNaN(value))value=0;void(0)\" />&nbsp;Тактика<br />\
		<input id=\"pk2_trade\" type=\"text\" value=\"0\" size=\"5\" onchange=\"javascript:value = parseFloat(value);if((value<0)||(value>5)||isNaN(value))value=0;void(0)\" />&nbsp;Торговля<br />\
		<input id=\"pk2_animali\" type=\"text\" value=\"0\" size=\"5\" onchange=\"javascript:value = parseFloat(value);if((value<0)||(value>5)||isNaN(value))value=0;void(0)\" />&nbsp;Обращение&nbsp;с&nbsp;животными<br />\
		<input id=\"pk2_appearance\" type=\"text\" value=\"0\" size=\"5\" onchange=\"javascript:value = parseFloat(value);if((value<0)||(value>5)||isNaN(value))value=0;void(0)\" />&nbsp;Блеф<br />\
	</div>\
		</div></div></div>\
	</div>\
</form>';
		
		html0 += '</div>';
		html0 += '</td><td class=\"gran_p\" />\n'
		html0 += '</tr><tr>\n';
		html0 += '<td class=\"gran_nl\" />\n';
		html0 += '<td class=\"gran_n\" />\n';
		html0 += '<td class=\"gran_np\" />\n';
		html0 += '</tr></tbody>\n';
		html0 += '</table>\n';
		html0 += '</div>';
		
		pk2_title = document.createElement('div');
		pk2_title.id = 'pk2_title';
		pk2_title.innerHTML = html0;
		
		pk2_title.setAttribute('style', 'position: absolute; left: ' + aWindow.pk2_l0 + 'px; top: ' + aWindow.pk2_t0 + 'px; z-index:202');
		document.body.appendChild(pk2_title);
		}
	pk2_title.style.display = 'block';
		
}



var pk2_body, pk2_script, pk2_style, pk2_head; 
pk2_body = document.getElementsByTagName('body')[0];

pk2_script = document.createElement('script');
pk2_script.type = 'text/javascript';
pk2_script.innerHTML = pk2_code;
pk2_body.appendChild(pk2_script);

pk2_stext=''
pk2_stext+='.tt:hover{\n';
pk2_stext+='position:relative;\n';
pk2_stext+='z-index:23;\n';
pk2_stext+='}\n';
pk2_stext+='.tt span{\n';
pk2_stext+='display:none;\n';
pk2_stext+='}\n';
pk2_stext+='.tt:hover span{\n';
pk2_stext+='display:block;\n';
pk2_stext+='position:absolute;\n';
pk2_stext+='top:10px;\n';
pk2_stext+='left:15px;\n';
pk2_stext+='background:#b6ab92;\n';
pk2_stext+='border:2px solid #000;\n';
pk2_stext+='color:#000;\n';
pk2_stext+='opacity:0.8;\n';
pk2_stext+='z-index:20;\n';
pk2_stext+='padding:5px;\n';
pk2_stext+='font-size:12px;\n';
pk2_stext+='cursor:pointer;\n';
pk2_stext+='text-decoration:none;\n';
pk2_stext+='}\n';
pk2_stext+='.tt2:hover{\n';
pk2_stext+='position:relative;\n';
pk2_stext+='z-index:23;\n';
pk2_stext+='}\n';
pk2_stext+='.tt2 span{\n';
pk2_stext+='display:none;\n';
pk2_stext+='}\n';
pk2_stext+='.tt2:hover span{\n';
pk2_stext+='display:block;\n';
pk2_stext+='position:absolute;\n';
pk2_stext+='top:40px;\n';
pk2_stext+='left:-70px;\n';
pk2_stext+='background:#b6ab92;\n';
pk2_stext+='border:2px solid #000;\n';
pk2_stext+='color:#000;\n';
pk2_stext+='opacity:0.8;\n';
pk2_stext+='z-index:21;\n';
pk2_stext+='padding:5px;\n';
pk2_stext+='font-size:12px;\n';
pk2_stext+='cursor:pointer;\n';
pk2_stext+='text-decoration:none;\n';
pk2_stext+='font-weight:normal;\n';
pk2_stext+='}\n';
pk2_stext+='.tt3:hover{\n';
pk2_stext+='position:relative;\n';
pk2_stext+='z-index:23;\n';
pk2_stext+='}\n';
pk2_stext+='.tt3 span{\n';
pk2_stext+='display:none;\n';
pk2_stext+='}\n';
pk2_stext+='.tt3:hover span{\n';
pk2_stext+='display:block;\n';
pk2_stext+='position:absolute;\n';
pk2_stext+='top:40px;\n';
pk2_stext+='left:-100px;\n';
pk2_stext+='background:#b6ab92;\n';
pk2_stext+='border:2px solid #000;\n';
pk2_stext+='color:#000;\n';
pk2_stext+='opacity:0.8;\n';
pk2_stext+='z-index:21;\n';
pk2_stext+='padding:5px;\n';
pk2_stext+='font-size:12px;\n';
pk2_stext+='cursor:pointer;\n';
pk2_stext+='text-decoration:none;\n';
pk2_stext+='}\n';

pk2_stext +='\
.pk2_sel {\
    background-color: rgb(232, 218, 179);\
    font-size: 13px;\
}\
.pk2_sel optgroup {\
    background-color:#443;\
    color:white;\
}\
.pk2_sel optgroup option {\
    background-color: rgb(232, 218, 179);\
    color:black;\
}\n';

pk2_stext+='\
.jy_bi {\
	width:43px;\
	height:43px;\
	margin:0px;\
	padding:0px;\
	text-align: center;\
	font-size: 11px;\
	font-weight: bold;\
	font-style: normal;\
	background-image:url(../images/inventory/yield.png);\
	background-repeat: no-repeat;\
}';
pk2_stext+='\
.jy_bi img {\
	width:43px;\
	height:43px;\
}';
pk2_stext+='\
.jy_pk2 {\
	margin:0px;\
	padding:0px;\
	text-align: center;\
	font-size: 10px;\
	font-weight: bold;\
	text-align: center;\
	font-style: normal;\
}';

pk2_stext+='\
.gran_vl {\
    background: transparent url(images/border/edge_tl_small.png) no-repeat scroll 0% 0%; height: 6px; padding:0;\
}';
pk2_stext+='\
.gran_v {\
    background: transparent url(images/border/border_t.png) repeat-x scroll 0% 0%; padding:0;\
}';
pk2_stext+='\
.gran_vp {\
    background: transparent url(images/border/edge_tr_small.png) no-repeat scroll 0% 0%; padding:0; width: 6px; height: 6px;\
}';
pk2_stext+='\
.gran_l {\
    background: transparent url(images/border/border_l.png) repeat-y scroll 0% 0%; width: 6px; padding:0;\
}';
pk2_stext+='\
.gran_p {\
    background: transparent url(images/border/border_r.png) repeat-y scroll right center; padding:0; width: 6px;\
}';
pk2_stext+='\
.gran_nl {\
    background: transparent url(images/border/edge_bl.png) no-repeat scroll 0% 0%; height: 6px; width: 6px; padding:0;\
}';
pk2_stext+='\
.gran_n {\
    background: transparent url(images/border/border_b.png) repeat-x scroll 0% 0%; padding:0;\
}';
pk2_stext+='\
.gran_np {\
    background: transparent url(images/border/edge_br.png) no-repeat scroll 0% 0%; padding:0; height: 6px; width: 6px;\
}';



pk2_head = document.getElementsByTagName('head')[0];
pk2_style = document.createElement('style');
pk2_style.type = 'text/css';
if (pk2_style.styleSheet) {
     pk2_style.styleSheet.cssText = pk2_stext;
} else {
    if (pk2_style.innerText == '') {
	pk2_style.innerText = pk2_stext;
    } else {
	pk2_style.innerHTML = pk2_stext;
    }
}
pk2_head.appendChild(pk2_style);


//aWindow.pk2_getValue(aWindow.pk2_pre+'odev_list');
//aWindow.setTimeout(function() {eval(aWindow.pk2_abyrvalg)},500);
aWindow.my_name_is();



aWindow.pk2_odev_spam();


//prosto_veschi_max=7;\
/*    else if (aWindow.winfo!=''){
        aWindow.pk2_show_window();
        aWindow.pk2_error_window(aWindow.winfo);
    }
*/

// ================== ФУКЦИЙ ИСПРАВЛЕННЫЕ == НАЧАЛО ==================
// создание заголовка таблицы с сортировкой
aWindow.pk2_reporter2 = function(){
    grgr = '';
    aWindow.pk2_process=false;
    //new aWindow.HumanMessage('Начинаем вывод данных', {type: 'success'});
// начало заголовок и сортировка
    grsort = '<table><tbody>'; // (красный) bgcolor="#f15959"
      grsort += '<tr>';
        grsort += '<td><strong>Способ сортировки: </strong></td>';
        grsort += '<td width="1" bgcolor="#321"></td>';
        grsort += '<td><a href=\"javascript:pk2_sortir(\'name\', pk2_bezto);\">Название</a></td>';
        grsort += '<td width="1" bgcolor="#321"></td>';
        grsort += '<td><a href=\"javascript:pk2_sortir(\'malus\', pk2_bezto);\"><img src=\"images/task_points/minus.png\" width="20" height="20" title=\"Сложность работы\" /></a></td>';
        grsort += '<td width="1" bgcolor="#321"></td>';
        grsort += '<td><a href=\"javascript:pk2_sortir(\'to\', pk2_bezto);\"><img src=\"images/task_points/equal.png\" width="20" height="20" title=\"Количество ТО\" /></a></td>';
        grsort += '<td width="1" bgcolor="#321"></td>';
        grsort += '<td><a href=\"javascript:pk2_sortir(\'d0\', pk2_bezto);\"><img src=\"images/job/dollar.png\" width="20" height="20" title=\"Заработок\" /></a></td>';
        grsort += '<td width="1" bgcolor="#321"></td>';
        grsort += '<td><a href=\"javascript:pk2_sortir(\'o0\', pk2_bezto);\"><img src=\"images/job/experience.png\" width="20" height="20" title=\"Опыт\" /></a></td>';
        grsort += '<td width="1" bgcolor="#321"></td>';
        grsort += '<td><a href=\"javascript:pk2_sortir(\'v0\', pk2_bezto);\"><img src=\"images/job/luck.png\" width="20" height="20" title=\"Удача\" /></a></td>';
        grsort += '<td width="1" bgcolor="#321"></td>';
        grsort += '<td><a href=\"javascript:pk2_sortir(\'boom\', pk2_bezto);\"><img src=\"images/job/danger.png\" width="20" height="20" title=\"Опасность\" /></a></td>';
        grsort += '<td width="1" bgcolor="#321"></td>';
        grsort += '<td><span title=\"Действут при следующем выборе сортировки! Здесь указывается то недостающее (либо избыточное) количество ТО, при котором работы всё ещё будут показываться (так значение 15 включит в список отображаемых, все работы с ТО больше чем -15; значение -10 уберёт из списка все работы с ТО от 10 и ниже.)\"><input type=\"text\" size=\"4\" value=\"'+aWindow.pk2_bezto+'\" ';
        grsort += 'onchange=\"javascript:pk2_bezto=parseInt(value, 10);\">&laquo;Нехватка&raquo; ТО</span></td>';
        grsort += '<td width="1" bgcolor="#321"></td>';
      grsort += '</tr>';
    grsort += '</tbody></table>'; // (красный)
    grgr += grsort;
    // Конец заголовок и сортировка
    grgr +='<table><tbody>'; // XXXX записи под каждую работу (розовый) bgcolor="#e587df"
      // определённая вещь начало
      if (aWindow.pk2_khochuka.length > 0){
        grgr += '<tr><td colspan="2">';
        grgr += '<a href=\"javascript:pk2_hideraboty(0);\">Вернуть все работы</a><br />';
        if (aWindow.pk2_khochuka.length > 1){
            grgr += '<select title=\"Выберите вещь чтобы посмотреть в скольких (и каких) работах она используется\" class=\"pk2_sel" onchange=\"javascript:pk2_vesch_polezna(value);\">';
            grgr += '<option value=\"0\">Выберете необходимую вещь</option>'
            for (kh in aWindow.pk2_khochuka){
                grgr += '<option value=\"'+kh+'\">'+aWindow.items[kh].name+'</option>';
            }
            grgr += '</select>';
        }
        for (kh in aWindow.pk2_khochuka){
        if (aWindow.pk2_khochuka[kh]){
            grgr += '<table><tr><td>';
            grgr+='<div style=\"display:inline; float:left;\">';
            vesch = aWindow.items[kh];
            grgr+='<a class=\"tt2\" href=\"javascript:pk2_hideraboty('+kh+');\" ><span><b>'+vesch.name+':</b>';
            if (vesch.set.key){
                grgr += '<br /><em>'+vesch.set.name+'</em>';
            }
            for (ind in vesch.bonus.attributes){
                grgr += aWindow.pk2_a_print(ind, vesch.bonus.attributes[ind]);
            }
            for (ind in vesch.bonus.skills){
                grgr += aWindow.pk2_s_print(ind, vesch.bonus.skills[ind]);
            }
            grgr += '</span>'
            grgr+='<div class=\"bag_item\" ><img src=\"'+vesch.image_mini+'\" /></div>';
            grgr+='</a>'
            grgr +='</div>';
            rere = ((kh < 400) || (kh >= 500)) ? '&raquo; применяется ' : '&raquo; применяются ';
            grgr +='Всего доступных  работ:' + aWindow.chislo_rabot_to + '; &laquo;'+vesch.name+rere+ aWindow.khoroshi_to[kh] +' раз.<br />';
            grgr +='Всего работ:' + aWindow.chislo_rabot + '; &laquo;'+vesch.name+rere+ aWindow.khoroshi[kh] +' раз.';
            grgr += '</td></tr></table>';
        }}
        grgr += '<hr>';
        grgr += '</td></tr>';
      }
      // определённая вещь конец
      for (ii = 0; ii < aWindow.pk2_sortrab.length; ++ii){                 // вывод нескольких работ начало
          if (!aWindow.pk2_hiderab[aWindow.pk2_sortrab[ii].index]){
              grgr += aWindow.pk2_htmlrab[aWindow.pk2_sortrab[ii].index];
        grgr += '<tr><td colspan="2"><hr></td></tr>';
          }
      }                                                                    // вывод нескольких работ конец
    grgr += '</tbody></table>'; // (розовый)
    // лишние вещи начало
    if (aWindow.pk2_khlam){
      grgr+='<hr>';
        grgr+='<table bgcolor="#87bee5"><tbody><tr><th colspan="8" style=\"text-align:center;\">Предположим, что эти вещи можно смело продать в магазинах</th></tr>';
        grgr+='<tr>';
        babosy=0;
        tdcount=0;
        for (tid in aWindow.pk2_nenuzhnoe){
            grgr+='<td>';
            vesch = aWindow.items[tid];
            grgr+='<a class=\"tt2\" href=\"#\" ><span><b>'+vesch.name+'</b>';
            for (ind in vesch.bonus.attributes){
                grgr += aWindow.pk2_a_print(ind, vesch.bonus.attributes[ind]);
            }
            for (ind in vesch.bonus.skills){
                grgr += aWindow.pk2_s_print(ind, vesch.bonus.skills[ind]);
            }
            grgr += '</span>'
            grgr+='<div class=\"bag_item\" style="margin-right:0px; margin-left:0px; margin-top:0px; margin-bottom:0px;"><img src=\"'+vesch.image_mini+'\" /></div>';
            grgr+='</a></td>';
            if (++tdcount==8){
                grgr+='</tr><tr>';
                tdcount=0;
            }
            babosy += vesch.price;
        }
        grgr+='</tr><tr><th colspan=\"8\" style=\"text-align:center;\">';
        grgr +='Минимум денег с продажи: '+babosy / 2+'$';
        grgr+='</th></tr></tbody></table>';
    }
    // лишние вещи конец
    document.getElementById('pk2_window_content').innerHTML=grgr;
    aWindow.pk2_process=false;
}

// вывод списка работ
aWindow.pk2_res2html = function (){
    count_rab=0;
    aWindow.pk2_htmlrab=[];
    while (count_rab < 255){
        if (!(aWindow.porabotaj[count_rab]&&aWindow.resultaty[count_rab])){
            ++count_rab;
            continue;
        }
        // вторая строка после заголовка начало
        ihtm = '';
          rabota = aWindow.raboty[count_rab];
          ihtm+='<tr>';
          ihtm += '<tr><td colspan="3"><strong>'+rabota.rus_name+'</strong></td></tr>'; // название работы
          ihtm+='</tr><tr>';
          ihtm+='<td>'; // начало работы!!!!
            // работы описание начало
            ihtm += '<table width="172"><tbody>'; // картинка название работы и продукты начало (морской) bgcolor="#43a990"
              // картинка названия работы   
              ihtm += '<tr><td width="65">';
              if ((count_rab > 150)&&(count_rab <= 170)){
                  // "vs"
                  ihtm += '<a href=\"javascript:pk2_show_shmot('+ count_rab +');\">';
                  ihtm += '<div style=\"width:63px; height:63px; background-image: url(\'/images/menu_buttons/duel.png\'); background-position: 80px 0;\"></div></a>';
              }
              // всё кроме "vs"
              else if (count_rab == 141){
                       // "Передвижение"
                       ihtm += '<a href=\"javascript:pk2_show_shmot('+ count_rab +');\">';
                       ihtm += '<img src=\"images/fingerboard/fingerboard.png\" width="63" height="63"';
                       ihtm += ' alt=\"'+rabota.rus_name+'\" title=\"'+rabota.rus_name+'\" /></a>';
                   }
                   // "все работы" "Строительство" "СОН-жизнь" "форты"
                   else{
                       ihtm += '<a href=\"javascript:pk2_show_shmot('+ count_rab +');\">';
                       ihtm += '<img src=\"';
                       if (count_rab<=131){
                           // "все работы" "Строительство" "СОН-жизнь"
                           ihtm += 'images/jobs/';
                       }
                       // "форты"
                       else if (count_rab<141){
                           ihtm += 'images/fort/battle/button_';
                       }
                       ihtm +=rabota.name+'.png\" width="63" height="63" alt=\"'+rabota.rus_name+'\" title=\"'+rabota.rus_name+'\" /></a>';
                   };
              ihtm += '</td>';
              // продукты
              ihtm += '<td>';
              rres = rabota.resultaty;
              for (ri in rres.produkty){
                ihtm+='<div style=\"display:inline; float:left; margin: 1px 1px;\"><div class=\"jy_bi\"><img style=\"-moz-user-select: none;\" ';
                ihtm+='title=\"'+aWindow.items[ri].name+'\" alt=\"'+aWindow.items[ri].name+'\" ';
                ihtm+='src=\"'+aWindow.items[ri].image_mini+'\" /></div><div class=\"jy_pk2\">'+rres.produkty[ri]+'%</div>';
                ihtm+='</div>';
              }
              ihtm += '</td></tr>';
            ihtm += '</tbody></table>'; // название работы и продукты конец (морской)
            // работы описание конец
          ihtm += '<td>'; // характеристики и вещи начало
            ihtm += '<table><tbody>'; // характеристики и вещи начало (оранжевый) bgcolor="#e59d2b"
              ihtm += '<tr>'; // характеристики начало
                ihtm += '<td width="220">'; // ТО начало
                  // все работы, сон, строительство, война (кроме форта и передвижения)
                  if ((count_rab<=131)||(count_rab>141)){
                    ihtm += '<span title=\"Очки от навыков\" class="calculation_visualisation img_plus" style=\"margin-left:0px;\">';
                    ihtm += '<span class="skill_box_value" style="text-align:center;">';
                    ihtm += (aWindow.resultaty[count_rab].to+aWindow.raboty[count_rab].malus-aWindow.resultaty[count_rab].ton)+'</span></span>';
                    ihtm += '<span title=\"Очки от комплектов\" class="calculation_visualisation img_plus" style=\"margin-left:0px;\">';
                    ihtm += '<span class="skill_box_value green_text" style="text-align:center;">'+aWindow.resultaty[count_rab].ton+'</span></span>';
                    ihtm += '<span title=\"Сложность работы\" class="calculation_visualisation img_minus"  style=\"margin-left:0px;\">';
                    ihtm += '<span class="skill_box_value" style="text-align:center;">'+aWindow.raboty[count_rab].malus+'</span></span>';
                    ihtm += '<span title=\"ТО\" class="calculation_visualisation img_equal" style="margin-right:0px; margin-left:0px;">';
                    ihtm += '<span class="skill_box_value" style="text-align:center; color:';
                    ihtm += (aWindow.resultaty[count_rab].to > 0) ? 'rgb(0,255,0)' : 'rgb(255,0,0)';
                    ihtm += '">'+aWindow.resultaty[count_rab].to+'</span></span>';
                  }
                  // форт
                  else if (count_rab!=141){
                         ihtm += '<span title=\"Бонус попадания\" class="calculation_visualisation img_plus" style=\"margin-left:0px;\">';
                         ihtm += '<span class="skill_box_value red_text" style="text-align:center;">';
                         var vvv = aWindow.resultaty[count_rab].to-aWindow.resultaty[count_rab].ton;
                         vvv = Math.round(vvv*10)/10;
                         ihtm += vvv+'</span></span>';
                         ihtm += '<span title=\"Бонус уворота\" class="calculation_visualisation img_plus" style=\"margin-left:0px;\">';
                         ihtm += '<span class="skill_box_value green_text" style="text-align:center;">'+aWindow.resultaty[count_rab].ton+'</span></span>';
                         ihtm += '<span title=\"Сумма бонусов\" class="calculation_visualisation img_equal" style="margin-right:0px; margin-left:0px;">';
                         ihtm += '<span class="skill_box_value" style="text-align:center; color:rgb(255,255,255)';
                         ihtm += '">'+aWindow.resultaty[count_rab].to+'</span></span>';
                       }
                       // передвижения
                       else{
                         //ihtm += '<span title=\"Скорость от комплектов\" class="calculation_visualisation img_plus" style=\"margin-left:0px;\">';
                         //ihtm += '<span class="skill_box_value green_text" style="text-align:center;">х'+aWindow.resultaty[count_rab].ton+'</span></span>';
                         ihtm += '<span title=\"Скорость\" class="calculation_visualisation img_equal" style="margin-right:10px; margin-left:0px;">';
                         ihtm += '<span class="skill_box_value" style="text-align:center; ">'+Math.round(aWindow.resultaty[count_rab].to)+'%</span></span>';
                       }
                ihtm += '</td>'; // ТО конец
                ihtm += '<td>'; // НАВЫКИ начало
                  brbr = 0;
                  for (jj in aWindow.rabnavyki[count_rab]){
                    for (aa = aWindow.rabnavyki[count_rab][jj].mul; aa > 0; --aa){
                      //if (++brbr==8) {ihtm+='</tr><tr>'; brbr=1};
                      ihtm += '<a class=\"tt3\" href=\"#\" ><span>'+aWindow.pers.skill_titles[jj]+':'+aWindow.rabnavyki[count_rab][jj].znach+'</span>';
                      ihtm += '<div class=\"skill_box\" style=\"padding: 35px 28px 6px 2px; margin-right: 0px; margin-top: 0px; background: transparent url(/images/skill/skills_'+aWindow.pk2_s2a[jj];
                      ihtm += '.png) repeat scroll '+aWindow.pk2_s2px[jj]+'px 0px; color: rgb(255, 255, 255); ';
                      ihtm += 'width: 25px; height: 14px; -moz-background-clip: border; -moz-background-origin: padding; ';
                      ihtm += '-moz-background-inline-policy: continuous; float: left; font-weight: bold; text-align:center;" >';
                      ihtm += aWindow.rabnavyki[count_rab][jj].znach+'</div>';
                      ihtm += '</a>';
                    }
                  }
                ihtm += '</td>'; // НАВЫКИ конец
              ihtm += '</tr>'; // характеристики конец
            ihtm += '</tbody></table>'; // характеристики и вещи конец  (оранжевый)
          ihtm += '</td>'; // характеристики и вещи конец
//===================
              ihtm += '<tr>'; // характеристики работы начало
              ihtm += '<td colspan="2">';
                ihtm += '<table><tbody>'; //(голубой) bgcolor="#D3EDF6"
                  barWidth = 75; // ширина бара
                ihtm += '<tr>';
                      ihtm += '<td>'; // кнопки начало
                        ihtm += '<div style=\"display:inline; float:left;\"><table>'; // (жёлтый) bgcolor="#d3d45c"
                        ihtm += '<td><a href="javascript:pk2_auto_odev(\'n\','+count_rab+');void(0);" title="Одеть" >';
                        ihtm += '<img src="images/transparent.png" style="width :23px; height : 23px; background:url(../img.php?type=menu&dummy) -104px -51px" >';
                        ihtm += '</a></td>';
                        ihtm += '<td><a href="javascript:pk2_odev_add(\'n\','+count_rab+');void(0);" title="Сохранить" >';
                        ihtm += '<img src="images/transparent.png" style="width :23px; height : 23px; background:url(../img.php?type=menu&dummy) -104px -126px" >';
                        ihtm += '</a></td>';
                        ihtm += '<td><a href="javascript:pk2_odev_remove(\'n\','+count_rab+');void(0);" title="Удалить" >';
                        ihtm += '<img src="images/transparent.png" style="width :23px; height : 23px; background:url(../img.php?type=menu&dummy) -129px -101px" >';
                        ihtm += '</a></td>';
                        ihtm += '</table></div>';
                      ihtm += '</td>'; // кнопки конец
                  ihtm += '<td>';
                    ihtm += ' <a class=\"tt\" href=\"#\" style=\"color:black;\"><table><tr><td><img style=\"width:17px; height:17px;\" src=\"images/job/dollar.png\" /></td>';
                    ihtm += '<td><div class="bar" style="width:' + eval(barWidth+1) + 'px; border-right:1px solid black;"><div class="bar_fill" style="width: '+Math.round(rres.dengi*(barWidth/100))+'px;"></div><div class="bar_perc" style="width:'+barWidth+'px">'+rres.dengi+'%</div></div>';
                    ihtm += '<span>Заработок:'+rres.dengi+'</span></td></tr></table></a>';
                  ihtm += '</td>';
                  // Заработок
                  var pk2_Do = 0;
                  if ((count_rab<=124)&&(aWindow.resultaty[count_rab].to > 0)){
                    pk2_Do = (180*rres.dengi/100+10)*Math.pow(aWindow.resultaty[count_rab].to,0.2);
                    pk2_Do = Math.round(pk2_Do);
                  }
                  ihtm += '<td width="45">';
                    ihtm += '<b>'+pk2_Do + ' $</b>';
                  ihtm += '</td>';

                  ihtm += '<td>';
                    ihtm += ' <a class=\"tt\" href=\"#\" style=\"color:black;\"><table><tr><td><img style=\"width:17px; height:17px;\" src=\"images/job/experience.png\" /></td>';
                    ihtm += '<td><div class="bar" style="width:' + eval(barWidth+1) + 'px; border-right:1px solid black;"><div class="bar_fill" style="width: '+Math.round(rres.opyt*(barWidth/100))+'px;"></div><div class="bar_perc" style="width:'+barWidth+'px">'+rres.opyt+'%</div></div>';
                    ihtm += '<span>Опыт:'+rres.opyt+'</span></td></tr></table></a>';
                  ihtm += '</td>';
                  // Опыт
                  var pk2_XP = rres.opyt*120/60;
                  pk2_XP = Math.round(pk2_XP);
                  ihtm += '<td width="45">';
                    ihtm += '<b>'+pk2_XP + ' XP</b>';
                  ihtm += '</td>';

                  ihtm += '<td>';
                    ihtm += ' <a class=\"tt\" href=\"#\" style=\"color:black;\"><table><tr><td><img style=\"width:17px; height:17px;\" src=\"images/job/luck.png\" /></td>';
                    ihtm += '<td><div class="bar" style="width:' + eval(barWidth+1) + 'px; border-right:1px solid black;"><div class="bar_fill" style="width: '+Math.round(rres.vezenie*(barWidth/100))+'px;"></div><div class="bar_perc" style="width:'+barWidth+'px">'+rres.vezenie+'%</div></div>';
                    ihtm += '<span>Удача:'+rres.vezenie+'</span></td></tr></table></a>';
                  ihtm += '</td>';
                  // Удача
                  var pk2_Ud = 0;
                  if ((count_rab<=124)&&(aWindow.resultaty[count_rab].to > 0)){
                    pk2_Ud = (1350*rres.vezenie/100+75)*Math.pow(aWindow.resultaty[count_rab].to,0.2);
                    //pk2_Ud = Math.floor(pk2_Ud);
                  }
                  ihtm += '<td width="100">';
                    ihtm += '<b>'+Math.floor(pk2_Ud/3) + '-' + Math.floor(pk2_Ud) + ' ($)</b>';
                  ihtm += '</td>';

                  ihtm += '<td>';
                    ihtm += ' <a class=\"tt\" href=\"#\" style=\"color:black;\"><table><tr><td><img style=\"width:17px; height:17px;\" src=\"images/job/danger.png\" /></td>';
                    ihtm += '<td><div class="bar" style="width:' + eval(barWidth+1) + 'px; border-right:1px solid black;"><div class="bar_brown" style="width: '+Math.round(rres.boom*(barWidth/100))+'px;"></div><div class="bar_perc" style="width:'+barWidth+'px">'+rres.boom+'%</div></div>';
                    ihtm += '<span>Опасность:'+rres.boom+'</span></td></tr></table></a>';
                  ihtm += '</td>';
                  //Опасность
                  ihtm += '<td width="45">';
                    ihtm += '  ';
                  ihtm += '</td>';

                ihtm += '</tr>';
                ihtm += '</tbody></table>'; //(голубой)
              ihtm += '</td>';
              ihtm += '</tr>'; // характеристики работы конец
//===================
              ihtm += '<tr>'; // вещи начало
                ihtm += '<td colspan="2">';
                  ihtm += '<table><tbody>'; // кнопки и вещи начало (салатовый) bgcolor="#6ad45c"
                    ihtm += '<tr>';
                      ihtm += '<td>'; // вещи начало
                        for (ee = 0; ee < aWindow.pk2_types.length; ++ee){
                          sid = aWindow.resultaty[count_rab].items[ee].tid;
                          if (sid){
                            // подсказка вещи
                            ihtm+='<div style=\"display:inline; float:left;\">';
                            vesch = aWindow.items[sid];
                            ihtm+='<a class=\"tt2\" href=\"#\" ><span><b>'+vesch.name+':</b>&nbsp;'+aWindow.resultaty[count_rab].items[ee].bon;
                            if (vesch.set.key){
                              ihtm += '<br /><em>'+vesch.set.name+'</em>';
                            }
                            for (ind in vesch.bonus.attributes){
                              ihtm += aWindow.pk2_a_print(ind, vesch.bonus.attributes[ind]);
                            }
                            for (ind in vesch.bonus.skills){
                              ihtm += aWindow.pk2_s_print(ind, vesch.bonus.skills[ind]);
                            }
                            if (aWindow.resultaty[count_rab].items[ee].price > 0){
                              ihtm += aWindow.resultaty[count_rab].items[ee].price+'&nbsp;$';
                            }
                            ihtm += '</span>'
                            // вещь
                            if (aWindow.resultaty[count_rab].items[ee].price > 0){
                              ihtm+='<div class=\"bag_item\" ><img src=\"'+vesch.image_mini+'\" />';
                              ihtm+='<div class="bag_item_count"><p style="text-align:center; color:red;">'+aWindow.resultaty[count_rab].items[ee].bon+'</p></div></div>'
                              ihtm+='</a>'
                            }
                            else {
                              ihtm+='<div class=\"bag_item\" ><img src=\"'+vesch.image_mini+'\" />';
                              ihtm+='<div class="bag_item_count"><p style="text-align:center;">'+aWindow.resultaty[count_rab].items[ee].bon+'</p></div></div>'
                              ihtm+='</a>'
                            }
                            // цена вещи подписать под вещью
                            //if (aWindow.resultaty[count_rab].items[ee].price > 0){
                            //    ihtm+='<br />';
                            //    ihtm +='<span style=\"text-align:center; color:red\">'+aWindow.resultaty[count_rab].items[ee].price+'&nbsp;$</span>';
                            //}
                            ihtm +='</div>';
                          }
                        }
                      ihtm += '</td>'; // вещи конец
                    ihtm += '</tr>';
                  ihtm += '</tbody></table>'; // кнопки и вещи конец (салатовый)
                ihtm += '</td>';
              ihtm += '</tr>'; // вещи конец
//===================
          ihtm+='</td></tr>'; // конец работы!!!!

// закомментил, сам не знаю что это такое, но вроде пока всё работает (похоже как на недоделанный расчёт передвижения и фортов) НАЧАЛО
/*

        if (aWindow.resultaty_z[count_rab]){
            ihtm+= '<tr><td>';
            ihtm += '<span title=\"+навыки\" class="calculation_visualisation img_plus">';
	    	ihtm += '<span class="skill_box_value" style="text-align:center;">';
		    ihtm += aWindow.resultaty_z[count_rab].zas+'</span></span>';
    		ihtm += '<span title=\"ТО\" class="calculation_visualisation img_equal" style="margin-right:10px;">';
	    	ihtm += '<span class="skill_box_value" style="text-align:center; color:';
		    ihtm += (aWindow.resultaty_z[count_rab].to > 0) ? 'rgb(0,255,0)' : 'rgb(255,0,0)';
    		ihtm += '">'+aWindow.resultaty_z[count_rab].to+'</span></span>';
            ihtm += '</td><td>';
            brbr=0;
            ihtm += '<table><tbody><tr>';
            for (jj in aWindow.rabnavyki_z[count_rab]){
                for (aa = aWindow.rabnavyki_z[count_rab][jj].mul; aa > 0; --aa){
                    if (++brbr==8) {ihtm+='</tr><tr>'; brbr=1};
                    ihtm += '<td>';
                    ihtm += '<a class=\"tt3\" href=\"#\" ><span>'+aWindow.pers.skill_titles[jj]+':'+aWindow.rabnavyki_z[count_rab][jj].znach+'</span>';
                    ihtm += '<div class=\"skill_box\" style=\"padding: 35px 28px 6px 2px; margin-right: -2px; margin-top: -4px; background: transparent url(/images/skill/skills_'+aWindow.pk2_s2a[jj];
                    ihtm += '.png) repeat scroll '+aWindow.pk2_s2px[jj]+'px 0px; color: rgb(255, 255, 255); ';
                    ihtm += 'width: 25px; height: 14px; -moz-background-clip: border; -moz-background-origin: padding; ';
                    ihtm += '-moz-background-inline-policy: continuous; float: left; font-weight: bold; text-align:center;" >';
                    ihtm += aWindow.rabnavyki_z[count_rab][jj].znach+'</div>';
                    ihtm += '</a></td>';
                }
            }
            ihtm += '</tr></tbody></table>';
            ihtm += '</td></tr><tr><td colspan=\"2\">';

		ihtm += '<div style=\"display:inline; float:left;\"><table>';
		ihtm += '<tr><td><a href="javascript:pk2_auto_odev(\'z\','+count_rab+');void(0);" title="Одеваемся" >';
		ihtm += '<img src="images/transparent.png" style="width :21px; height : 21px; background:url(../img.php?type=menu&dummy) -105px -52px" >';
		ihtm += '</a></td></tr>';
		ihtm += '<tr><td><a href="javascript:pk2_odev_add(\'z\','+count_rab+');void(0);" title="Сохранить" >';
		ihtm += '<img src="images/transparent.png" style="width :21px; height : 21px; background:url(../img.php?type=menu&dummy) -105px -127px" >';
		ihtm += '</a></td></tr>';
		ihtm += '<tr><td><a href="javascript:pk2_odev_remove(\'z\','+count_rab+');void(0);" title="Удалить" >';
		ihtm += '<img src="images/transparent.png" style="width :21px; height : 21px; background:url(../img.php?type=menu&dummy) -130px -102px" >';
		ihtm += '</a></td></tr>';
		ihtm += '</table></div>';

            for (ee = 0; ee < aWindow.pk2_types.length; ++ee){
                sid = aWindow.resultaty_z[count_rab].items[ee].tid;
                if (sid){
                    ihtm+='<div style=\"display:inline; float:left;\">';
			vesch = aWindow.items[sid];
                    ihtm+='<a class=\"tt2\" href=\"#\" ><span><b>'+vesch.name+':</b>&nbsp;'+aWindow.resultaty_z[count_rab].items[ee].bon;
                    if (vesch.set.key){
                        ihtm += '<br /><em>'+vesch.set.name+'</em>';
                    }
                    for (ind in vesch.bonus.attributes){
                        ihtm += aWindow.pk2_a_print(ind, vesch.bonus.attributes[ind]);
                    }
                    for (ind in vesch.bonus.skills){
                        ihtm += aWindow.pk2_s_print(ind, vesch.bonus.skills[ind]);
                    }
                    ihtm += '</span>';
                    ihtm+='<div class=\"bag_item\" ><img src=\"'+vesch.image_mini+'\" />';
                    ihtm+='<div class="bag_item_count"><p style="text-align:center;">'+aWindow.resultaty_z[count_rab].items[ee].bon+'</p></div></div>';
                    ihtm+='</a>';
                    if (aWindow.resultaty_z[count_rab].items[ee].price > 0){
                        ihtm+='<br />';
                        ihtm +='<span style=\"text-align:center;\">'+aWindow.resultaty_z[count_rab].items[ee].price+'&nbsp;$</span>';
                    }
                    ihtm +='</div>';
                }
            }
            ihtm += '</td></tr>';
        }
        else{
            ihtm+='<tr><td colspan=\"2\" /></tr><tr><td colspan=\"2\" /></tr>';
        }
        
        if (aWindow.resultaty_r[count_rab]){
            ihtm+= '<tr><td>';
            ihtm += '<span title=\"+навыки\" class="calculation_visualisation img_plus">';
	    	ihtm += '<span class="skill_box_value" style="text-align:center;">';
		    ihtm += aWindow.resultaty_r[count_rab].speed+'%</span></span>';
    		ihtm += '<span title=\"ТО\" class="calculation_visualisation img_equal" style="margin-right:10px;">';
	    	ihtm += '<span class="skill_box_value" style="text-align:center; color:';
		    ihtm += (aWindow.resultaty_r[count_rab].to > 0) ? 'rgb(0,255,0)' : 'rgb(255,0,0)';
    		ihtm += '">'+aWindow.resultaty_r[count_rab].to+'</span></span>';
            ihtm += '</td><td>';
            brbr=0;
            ihtm += '<table><tbody><tr>';
            for (jj in aWindow.rabnavyki_r[count_rab]){
                for (aa = aWindow.rabnavyki_r[count_rab][jj].mul; aa > 0; --aa){
                    if (++brbr==8) {ihtm+='</tr><tr>'; brbr=1};
                    ihtm += '<td>';
                    ihtm += '<a class=\"tt3\" href=\"#\" ><span>'+aWindow.pers.skill_titles[jj]+':'+aWindow.rabnavyki_r[count_rab][jj].znach+'</span>';
                    ihtm += '<div class=\"skill_box\" style=\"padding: 35px 28px 6px 2px; margin-right: -2px; margin-top: -4px; background: transparent url(/images/skill/skills_'+aWindow.pk2_s2a[jj];
                    ihtm += '.png) repeat scroll '+aWindow.pk2_s2px[jj]+'px 0px; color: rgb(255, 255, 255); ';
                    ihtm += 'width: 25px; height: 14px; -moz-background-clip: border; -moz-background-origin: padding; ';
                    ihtm += '-moz-background-inline-policy: continuous; float: left; font-weight: bold; text-align:center;" >';
                    ihtm += aWindow.rabnavyki_r[count_rab][jj].znach+'</div>';
                    ihtm += '</a></td>';
                }
            }
            ihtm += '</tr></tbody></table>';
            ihtm += '</td></tr>';

     // кнопки тут были уже перенесли!!!!
                      ihtm += '<td width="25">'; // кнопки начало
                        ihtm += '<div style=\"display:inline; float:left;\"><table>';
                        ihtm += '<tr><td><a href="javascript:pk2_auto_odev(\'r\','+count_rab+');void(0);" title="Одеваемся" >';
                        ihtm += '<img src="images/transparent.png" style="width :25px; height : 25px; background:url(../img.php?type=menu&dummy) -103px -50px" >';
                        ihtm += '</a></td></tr>';
                        ihtm += '<tr><td><a href="javascript:pk2_odev_add(\'r\','+count_rab+');void(0);" title="Сохранить" >';
                        ihtm += '<img src="images/transparent.png" style="width :25px; height : 25px; background:url(../img.php?type=menu&dummy) -103px -125px" >';
                        ihtm += '</a></td></tr>';
                        ihtm += '<tr><td><a href="javascript:pk2_odev_remove(\'r\','+count_rab+');void(0);" title="Удалить" >';
                        ihtm += '<img src="images/transparent.png" style="width :25px; height : 25px; background:url(../img.php?type=menu&dummy) -128px -100px" >';
                        ihtm += '</a></td></tr>';
                        ihtm += '</table></div>'; // (жёлтый)
                      ihtm += '</td>'; // кнопки конец
     // кнопки тут были уже перенесли!!!!

            for (ee = 0; ee < aWindow.pk2_types.length; ++ee){
                sid = aWindow.resultaty_r[count_rab].items[ee].tid;
                if (sid){
                    ihtm+='<div style=\"display:inline; float:left;\">';
			vesch = aWindow.items[sid];
                    ihtm+='<a class=\"tt2\" href=\"#\" ><span><b>'+vesch.name+':</b>&nbsp;'+aWindow.resultaty_r[count_rab].items[ee].bon;
                    if (vesch.set.key){
                        ihtm += '<br /><em>'+vesch.set.name+'</em>';
                    }
                    for (ind in vesch.bonus.attributes){
                        ihtm += aWindow.pk2_a_print(ind, vesch.bonus.attributes[ind]);
                    }
                    for (ind in vesch.bonus.skills){
                        ihtm += aWindow.pk2_s_print(ind, vesch.bonus.skills[ind]);
                    }
                    ihtm += '</span>';
                    ihtm+='<div class=\"bag_item\" ><img src=\"'+vesch.image_mini+'\" />';
                    ihtm+='<div class="bag_item_count"><p style="text-align:center;">'+aWindow.resultaty_r[count_rab].items[ee].bon+'</p></div></div>';
                    ihtm+='</a>';
                    if (aWindow.resultaty_r[count_rab].items[ee].price > 0){
                        ihtm+='<br />';
                        ihtm +='<span style=\"text-align:center;\">'+aWindow.resultaty_r[count_rab].items[ee].price+'&nbsp;$</span>';
                    }
                    ihtm +='</div>';
                }
            }
            ihtm += '</td></tr>';
        }
        else{
            ihtm+='<tr><td colspan=\"2\" /></tr><tr><td colspan=\"2\" /></tr>';
        }
*/        
// закомментил, сам не знаю что это такое, но вроде пока всё работает (похоже как на недоделанный расчёт передвижения и фортов) КОНЕЦ

        aWindow.pk2_htmlrab[count_rab]=ihtm;
        ++count_rab;
    }
}

//=====
// свернуть "Окно настроек"
aWindow.pk2_minimize_title = function(){
	if (aWindow.pk2_title_flag2 == 1) {
    	aWindow.pk2_title_flag2 = 0;
		document.getElementById('pk2_title_content_row').style.display = 'none';
		document.getElementById('pk2_title_cap').style.display = 'none';
		document.getElementById('pk2_form0').style.width = '200px';
	}
	else {
		aWindow.pk2_title_flag2 = 1;
		document.getElementById('pk2_title_content_row').style.display = 'table-row';
		document.getElementById('pk2_title_cap').style.display = 'inline';
		document.getElementById('pk2_form0').style.width = aWindow.pk2_w0+'px';
	}
}

// Закрыть "Окно настроек"
aWindow.pk2_close_title = function(){
	document.getElementById('pk2_title').style.display='none';
}

//===
aWindow.pk2_stretch_title = function(){
    var nv;
    if (aWindow.pk2_title_flag == 1) {
        aWindow.pk2_title_flag = 0;
        nv = aWindow.pk2_title_h_mid + 'px';
    }
    else {
        aWindow.pk2_title_flag = 1
        nv = aWindow.pk2_title_h_max + 'px';
    }
    document.getElementById('pk2_title_content').style.height = nv;
}

//===
aWindow.pk2_close_shmot = function(){
    rm = document.getElementById('pk2_shmot');
    document.body.removeChild(rm);
}

//===
aWindow.pk2_vselect = function (chk){
	if (chk) {
		document.getElementById('pk2_vselect').innerHTML=aWindow.pk2_mulselect+aWindow.pk2_conselect;
		/*document.getElementById('pk2_sk_rabot').innerHTML='Несколько работ';*/
	}
	else{
		document.getElementById('pk2_vselect').innerHTML=aWindow.pk2_simselect+aWindow.pk2_conselect;
		/*document.getElementById('pk2_sk_rabot').innerHTML='Одна работа&nbsp;&nbsp;&nbsp;&nbsp;';*/
	}
}

// свернуть "Окно данных"
aWindow.pk2_minimize_window = function(){
	if (aWindow.pk2_window_flag2 == 1) {
		aWindow.pk2_window_flag2 = 0;
		document.getElementById('pk2_window_content_row').style.display = 'none';
		document.getElementById('pk2_window_cap').style.display = 'none'
		document.getElementById('pk2_win1').style.width = '100px';
	}
	else {
		aWindow.pk2_window_flag2 = 1;
		document.getElementById('pk2_win1').style.width = aWindow.pk2_w1+'px';
		document.getElementById('pk2_window_content_row').style.display = 'table-row';
		document.getElementById('pk2_window_cap').style.display = 'inline';
	}
}

// Закрыть "Окно данных"
aWindow.pk2_close_window = function(){
	document.getElementById('pk2_window').style.display='none';
}

// Окно "нехватки предмета в базе данных"
aWindow.pk2_error_window = function(err){
	document.getElementById('pk2_window_content').style.height = parseInt((aWindow.pk2_window_h_max*3)/5, 10) + 'px';
	pk2_err = document.getElementById('pk2_window_error');
	pk2_err.style.height = parseInt((aWindow.pk2_window_h_max*2)/7, 10) + 'px';
	pk2_err.style.display='block';
	htm = '<hr><div style=\"font-weight:bold; color:black; text-align:center;\" >Вещи, отсутствующие в базе скрипта.<br />'; 
	htm += '<textarea style=\"margin: 5px;\" readonly=\"readonly\" cols=\"90\" rows=\"7\">';
	htm += err;
	htm += '</textarea></div>';
	pk2_err.innerHTML = htm;
}

// функция создания "Окно данных"
aWindow.pk2_show_window = function(){
    pk2_window = document.getElementById('pk2_window');
    html1='';
    if (!pk2_window){
	html1 += '<div id=\"pk2_win1\" style=\"width:' + aWindow.pk2_w1 + 'px; text-align:left;\">\n';
	html1 += '<table class=\"shadow_table\" align=\"left\"><tbody>\n';
	html1 += '<tr>';
	html1 += '<td class=\"gran_vl\" />\n';
	html1 += '<td class=\"gran_v\" />\n';
	html1 += '<td class=\"gran_vp\" />\n';
	html1 += '</tr><tr>\n';
	html1 += '<td class=\"gran_l\" />\n';
	html1 += '<td style=\"background-color:#302010; text-align:center; font-weight:bold; color:white;\">';
	html1 += '<span>';
	html1 += '<a href=\"javascript:pk2_minimize_window();\"' + aWindow.pk2_tlink + ' title=\"Свернуть\">&nbsp;_&nbsp;</a>&nbsp;';
	html1 += '<a href=\"javascript:pk2_stretch_window();\"' + aWindow.pk2_tlink + ' title=\"-\">&nbsp;^&nbsp;</a>&nbsp;';
	html1 += '<a href=\"javascript:pk2_close_window();\"' + aWindow.pk2_tlink + ' title=\"Закрыть\">&nbsp;*&nbsp;</a>&nbsp;';
	html1 += '</span>';
		html1 += '<span id=\"pk2_window_cap\">Результаты</span>';
		html1 += '</td><td class=\"gran_p\" />\n'
		html1 += '</tr><tr id=\"pk2_window_content_row\">\n';
		html1 += '<td class=\"gran_l\" />\n';
		html1 += '<td id=\"pk2_window_content0\" class=\"shadow_content\" style=\"width:' + (aWindow.pk2_w1 - 12) + 'px;\" >';
		html1 += '<div id=\"pk2_window_content\" style=\"overflow: auto; height: ' + aWindow.pk2_window_h_max + 'px;\">';
		html1 += '</div><div id=\"pk2_window_error\" style=\"border: 2px; overflow: auto; display: none; \">';
		html1 += '</div></td><td class=\"gran_p\" />\n'
		html1 += '</tr><tr>\n';
		html1 += '<td class=\"gran_nl\" />\n';
		html1 += '<td class=\"gran_n\" />\n';
		html1 += '<td class=\"gran_np\" />\n';
		html1 += '</tr></tbody>\n';
		html1 += '</table>\n';
		html1 += '</div>';
		pk2_window = document.createElement('div');
		pk2_window.id = 'pk2_window';
		pk2_window.innerHTML = html1;
		pk2_window.setAttribute('style', 'position: absolute; left: ' + aWindow.pk2_l1 + 'px; top: ' + aWindow.pk2_t1 + 'px; z-index:250');
		document.body.appendChild(pk2_window);
	}
	pk2_window.style.display = 'block';
	if (aWindow.pk2_window_flag2 == 0){
	    aWindow.pk2_minimize_window();
	}
}

// ================== ФУКЦИЙ ИСПРАВЛЕННЫЕ == КОНЕЦ ==================


//====== Показывает дуэльный опыт в салуне====
document.getElementById( "windows" ).addEventListener( "DOMNodeInserted", nodeInserted, false );

function nodeInserted( event )
{
    if ( document.querySelector( 'div.saloon_duel_layer' ) ) 
	{
        var motivation = document.querySelector( "div.bar_perc" ).innerHTML;
        
        motivation =  ( 0 + motivation.substring(0, (motivation.length - 1) ) ) / 100;

        var duel_elements = document.querySelector( "table.saloon_duel_table" ).getElementsByTagName( "tr" );
        
        for( i = 1; i < duel_elements.length; i++ )
        {
            var exp = duel_elements[ i ].childNodes[5].innerHTML;
            
            if( exp.length <= 5 )
            {
                var xp = (0 + exp) * motivation;
                duel_elements[ i ].childNodes[5].innerHTML += " / " + xp.toFixed(0)  + " ";
            }
        }
    }
}

//=====показывает опыт во вкладке дуэль===


// MAJ Auto

var duel_version = "1.0.1";

var url = window.location.href;
if (url.indexOf(".the-west.") != -1) {
    
    var insertBeforeElement = document.getElementById('left_top');
    
    var newScriptElement = document.createElement('script');
    newScriptElement.setAttribute('type', 'text/javascript');
    var myScript = "var duel_version = '"+duel_version+"';";
    newScriptElement.innerHTML = myScript;
    insertBeforeElement.parentNode.insertBefore(newScriptElement, insertBeforeElement);

(function(f) {
    var d=document,s=d.createElement('script');
    s.setAttribute('type','application/javascript');
    s.textContent = '('+f.toString()+')()';
    (d.body||d.head||d.documentElement).appendChild(s);
    s.parentNode.removeChild(s)
})( function() {
    var level_duel = 0;
     
    var filler;
    function isNull(variable) {
        return (typeof(variable) === "undefined" || variable === null) ? true : false;
    }

    function refreshPage(element) {

        var detail ="", posBRfin="";
        var textNode = element.target;

        if(isNull(textNode)) {
            // Premiere page
            detail = element.innerHTML;

        } else {

            // Pages suivantes
            detail =textNode.innerHTML;
        }
        if(detail.indexOf('- Xp')>0){
              posBRfin = detail.indexOf('- Xp');
        }else{
              posBRfin = detail.lastIndexOf('<br>');
            
        }
        var motivation = $("duel_motivation_bar_num").innerHTML;
       
        motivation =  ( 0 + motivation.substring(0, (motivation.length - 1) ) ) / 100;
        
        var reg = new RegExp(":\\s*(\\d+)\\s*<")

        var result = reg.exec(detail);
     
         if(!isNull(result)) {
           
            var exp=result[1];

            var xpreel = ((7 * exp.trim()) - (5 * level_duel)) + 4;
            xpreel=xpreel.toFixed(0);

            var xp = xpreel * motivation;

            var cible;
            if(!isNull(textNode)) {
 
                textNode.innerHTML =  detail.substring(0, posBRfin) +   "<b> - Xp " + xpreel + " (" + xp.toFixed(0)  + "</b>)";

            } else {
               
                element.innerHTML = detail.substring(0, posBRfin) + "<b> - Xp "+ xpreel + " (" + xp.toFixed(0)  + ")</b></div>";

            }
            return true;
        }
        return false;

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

    function setXPForSaloon() {

        var divSaloon = $('tab_saloon');
        var motivation = getElementByClassName(divSaloon, 'bar_perc').innerHTML;

        motivation =  ( 0 + motivation.substring(0, (motivation.length - 1) ) ) / 100;
          
        var trJoueur = getElementByClassName(divSaloon, "saloon_duel_table").getElementsByTagName( "tr" );

        for( i = 1; i < trJoueur.length; i++ ) {
            var exp = trJoueur[ i ].childNodes[5].innerHTML;

            if( exp.length <= 5 ) {
                var xp = (0 + exp) * motivation;
                trJoueur[ i ].childNodes[5].innerHTML += " (" + xp.toFixed(0)  + ")";
            }
        }
    }

    

    function initLevelDuel() {

        level_duel = getLevelDuel();
        $('lvlduel').innerHTML="Ваш дуэльный разряд: " + level_duel ;
        
    }

    function parsePage() {
        var element = $('op_duel_list').getElementsByTagName( "tr" );
         
        for(var i = 0; i < element.length; i++ ) {

            refreshPage(element[ i ].childNodes[1]);
            element[ i ].childNodes[1].addEventListener ("DOMNodeInserted", refreshPage, false);
        }
    }

    function setXPForDuelPage() {

        var lvlDuel= document.createElement("span");
        var tblOp = $('op_duel_list');
        var trJoueur = tblOp.getElementsByTagName( "tr" );

        lvlDuel.innerHTML = "<br><span style='cursor: pointer;' id='lvlduel'>Ваш дуэльный разряд: " + level_duel +"</span>";
        parsePage();
        $('duel_op_picture').appendChild(lvlDuel);

        lvlDuel.addMousePopup(new MousePopup("<B>Обновить дуэльный разряд</B>"));
        lvlDuel.addEventListener('click', function() {
                     initLevelDuel();
                     parsePage();
        }, false);
        return true;
    }

    function findDuelLevel(data) {

        var carObject =  JSON.parse(data);
        var html='<div id="char_avatar"> <div class="char_frame" style=\'overflow:visible\'> <div class=\'char_background\'></div> <img src=\'/images/transparent.png\' class="reward_opener" /> <table class="char_reward_show_slots" cellspacing="0" cellpadding="0"> <tbody> <tr> <td class="char_reward_drop expose_0"></td><td class="char_reward_drop expose_1"></td><td class="char_reward_drop expose_2"></td><td class="char_reward_drop expose_3"></td> </tr> </tbody> </table> <div class="char_reward_box"><div class="char_reward_box_background"></div> <div class="switch_prev ie0height" onmouseout="this.removeClass(\'glow_left\')" onmouseover="this.addClass(\'glow_left\')"></div> <div class="switch_next ie0height" onmouseout="this.removeClass(\'glow_right\')" onmouseover="this.addClass(\'glow_right\')"></div> <table class="char_reward_slots" cellspacing="0" cellpadding="0"> <tbody> <tr> <td></td><td></td><td></td><td></td> </tr> <tr> <td></td><td></td><td></td><td></td> </tr> <tr> <td></td><td></td><td></td><td></td> </tr> <tr> <td></td><td></td><td></td><td></td> </tr> <tr> <td></td><td></td><td></td><td></td> </tr> </tbody> </table> </div> </div> <div id="char_avatar_img" style="display: inline-block;"> <img src="images/avatars/iroquois.jpg" alt="Avatar" class="char_avatar_picture" /> </div> </div> <div id="char_info"> <table> <tr> <th>Niveau</th> <td id="level">87</td> </tr> <tr> <th>Points d\'exp�rience</th> <td id="experience">314 / 7754</td> </tr> <tr> <th>Points de vie</th> <td id="health">2840 / 2840</td> </tr> <tr> <th>Repos</th> <td id="energy">30 / 100</td> </tr> <tr> <th>Vitesse</th> <td id="speed">6 mph (146%)</td> </tr> <tr> <th>Niveau de duel</th> <td>144</td> </tr> <tr> <th>Duels gagn�s</th> <td>359</td> </tr> <tr> <th>Duels perdus</th> <td>251</td> </tr> </table> </div> <div class="class_choose_icon_layer" id="character_window_choose_class_layer"> <a href="#" onclick="AjaxWindow.show(\'class_choose\');"><img id="character_choose_image" src="images/class_choose/characters_grey.png" alt="" /></a> </div> <br style="clear:both;" /> <br /> <h2>Classe de personnage: Soldat</h2> <br /> <div id="char_class_advantages"> <strong>Avantages:</strong><br /> <table cellspacing=\'0\' cellpadding=\'0\'> <tr><td style=\'vertical-align:middle;height:28px\'><img src="images/transparent.png" width="23" height="23" border="0" alt="" class="bonus_icon bonus_icon_health_raise" /></td><td style=\'vertical-align:middle;padding-left:4px\'>Pour chaque point d\'aptitude que tu attribues au points de vie, tu re�ois 10 points de vie en plus.</td></tr> <tr><td style=\'vertical-align:middle;height:28px\'><img src="images/transparent.png" width="23" height="23" border="0" alt="" class="bonus_icon bonus_icon_item_wear_level" /></td><td style=\'vertical-align:middle;padding-left:4px\'>Le niveau requis pour l\'usage d\'armes diminue de 6 niveaux. </td></tr> <tr><td style=\'vertical-align:middle;height:28px\'><img src="images/transparent.png" width="23" height="23" border="0" alt="" class="bonus_icon bonus_icon_duel_tactic" /></td><td style=\'vertical-align:middle;padding-left:4px\'>Pour un duel tu re�ois un bonus de 100% pour l\'aptitude "Tactique".</td></tr> <tr><td style=\'vertical-align:middle;height:28px\'><img src="images/transparent.png" width="23" height="23" border="0" alt="" class="bonus_icon bonus_icon_fb_lead" /></td><td style=\'vertical-align:middle;padding-left:4px\'>Au cours des batailles de forts, tu augmentes ton aptitude au commandement et celle de tes quatre voisins � hauteur de 50% de tes propres capacit�s de commandement.</td></tr> </table> </div> <img src="images/class_choose/symbol_soldier.png" id="char_class_symbol">';
      
        var tdChar = document.createElement("div");
        tdChar.innerHTML= carObject.page;
        tdChar=tdChar.getElementsByTagName("td");
 
        for(var ij = 0; ij < tdChar.length; ij++ ) {
            if(tdChar[ ij ].id == "speed") {
                level_duel = tdChar[ ij + 1 ];
                level_duel=level_duel.innerHTML.trim();
                  
                break;
            }
        }
         
        return level_duel;
    }

    function getLevelDuel() {

        filler=  new Ajax('game.php?window=character',   {
            async:'false',
            method:'post',
            data:{},
            onComplete: function(data) {

                level_duel =  findDuelLevel(data);
            }
        }).request();
        
        return level_duel;
    }

    // injection sur ouverture de la fenêtre de duel

    function initDuel() {

        AjaxWindow.setJSHTML_Saloon = AjaxWindow.setJSHTML;
        AjaxWindow.setJSHTML = function(div,content) {
            AjaxWindow.setJSHTML_Saloon(div,content);
            if(div && div.id && div.id.search(/saloon/) != -1) {

                setTimeout(setXPForSaloon, 100);

            }
        }
        AjaxWindow.setJSHTML_Duel = AjaxWindow.setJSHTML;
        AjaxWindow.setJSHTML = function(div,content) {
            AjaxWindow.setJSHTML_Duel(div,content);
            if(div && div.id && div.id.search(/duel/) != -1) {
            //   getLevelDuel();
              // attente pour la récupération du level duel 
                setTimeout(setXPForDuelPage, 1000);
            }
        }
        return true;
    }

    getLevelDuel();
    initDuel();

        //MAJ AUTO SOM
    })
    /***************************************************************
     * DOM Storage Wrapper Class
     *
     * Public members:
     *     ctor({"session"|"local"}[, <namespace>])
     *     setItem(<key>, <value>)
     *     getItem(<key>, <default value>)
     *     removeItem(<key>)
     *     keys()
     ***************************************************************/
    function Storage(type, namespace) {
        var object = this;

        if(typeof(type) != "string")
            type = "session";

        switch(type) {
            case "local": {
                object.storage = localStorage;
                }
                break;

            case "session": {
                object.storage = sessionStorage;
                }
                break;

            default: {
                object.storage = sessionStorage;
                }
                break;
        }

        if (!namespace || (typeof(namespace) != "string" && typeof(namespace) != "number"))
            namespace = "ScriptStorage";

        object.namespace = [namespace, "."].join("");

        object.setItem = function(key, value) {
            try {
                object.storage.setItem(escape([object.namespace, key].join("")), JSON.stringify(value));
            } catch(e) {
            }
        }
        object.getItem = function(key, defaultValue) {
            try {
                var value = object.storage.getItem(escape([object.namespace, key].join("")));
                if(value)
                    return eval(value);
                else
                    return defaultValue;
            } catch(e) {
                return defaultValue;
            }
        }
        object.removeItem = function(key) {
            try {
                object.storage.removeItem(escape([object.namespace, key].join("")));
            } catch(e) {
            }
        }
        object.keys = function() {
            var array = [];
            var indDun = 0;
            do {
                try {
                    var key = unescape(object.storage.key(indDun++));
                    if(key.indexOf(object.namespace) == 0 && object.storage.getItem(key))
                        array.push(key.slice(object.namespace.length));
                } catch(e) {
                    break;
                }
            } while(true);
            return array;
        }
    }

    /***************************************************************
     * ScriptUpdater Class
     *
     * Public members:
     *     ScriptUpdater.check(<script id>, <current script version>[, <callback function>])
     *     ScriptUpdater.forceCheck(<script id>, <current script version>[, <callback function>])
     *     ScriptUpdater.forceNotice(<script id>, <current script version>[, <callback function>])
     ***************************************************************/
    ScriptUpdater = {
        id: 96794,
        version: "1.03f",
        scriptId: null,
        scriptCurrentVersion: null,
        scriptCallbackFunction: null,
        scriptUseNotice: null,
        scriptForceNotice: null,
        scriptMetaTags: null,
        scriptStorage: null,
        icons: {
            install: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAALZSURBVBgZBcFLiFVlAADg7zzuPLzjzDjOMINMitIie5gF+UAkIZSgRQuXLZIWrY021dYIggJdJURElJsoqlWRYA9GshGFCNQeOjoTk6bjeOd5zzn/f07flzRNA459ObcHJ3cM9+1fq2prVa2qa+uh7mAZ9xCxiAV8iu9zgDqEvU9ODOx//dkxALBa1kNrZT202I2TZcVyEd28t+Lb66uHcTwHqEMYH+xJwNyDqJUk8oQsp7eV2tqbytJUK+OpyX5bhtojH07Pv58CxKoabOeEmuUy0al4UNDp0umysM5/KxG8eWbW/u1tj4+2xnKAWFUjG3tSqwWr3ShNEzmyjDQjk8gSaiRxyYUbiy7PduZzgFiW40P9mc56sFY00rSRpaQxkaVkGlmGJnNnqXDq7N9LOJYDhLLcNj7Y0uk2AjRkMZE2iGQaeZOqG2IrCmXY/s1rB+6nALEstk0M9VotG0lKliRSpEjw+YUjPjq3RxkKoSjEsoiQwvMnvusXQ09vK1VGUg1qjVrUqDWKUJoc3emVj3dbWeuEUJZLkEMoyrF2u0+aUEPD19OHNXVQ1kEZgy2bHrZzYq/l7qr766/m3VC0ub+SQyyLDXm7R56SpYlYJ0JdOvzYy2JTi3VUa8x35jwxecBKue7S7E+dXW+nI/nB42dGcWLPI1vdXmrcvBO1++iGUmxqtxb+UtVBqCtVrCwVy3Y/dNBKtZb+OjO1kMeyfA4vXLo6Y3E9t1I0qtjo6goxGB/cKtRRbGr/dmaNDEy4PHfe+etTd8vgSB6r6ukXD+3qf+ulfQDg6OnCJ7+8p6xL3VDaMfqofTuOuHhryrk/fl4tokPz7zRX8lhVM7fvdXx29qrhgX7Dg32G271OHv3dxg09entSvXnqmXcHJGm/6Ru/ad89dmrm9AdXIK9D+GLq4rXJqYvXtmEzNmMTNmGor6fV6utr6YxWfvjzR0P/vDGTh7GvAP4H2uh1wse2x/0AAAAASUVORK5CYII%3D",
            close: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAIhSURBVDjLlZPrThNRFIWJicmJz6BWiYbIkYDEG0JbBiitDQgm0PuFXqSAtKXtpE2hNuoPTXwSnwtExd6w0pl2OtPlrphKLSXhx07OZM769qy19wwAGLhM1ddC184+d18QMzoq3lfsD3LZ7Y3XbE5DL6Atzuyilc5Ciyd7IHVfgNcDYTQ2tvDr5crn6uLSvX+Av2Lk36FFpSVENDe3OxDZu8apO5rROJDLo30+Nlvj5RnTlVNAKs1aCVFr7b4BPn6Cls21AWgEQlz2+Dl1h7IdA+i97A/geP65WhbmrnZZ0GIJpr6OqZqYAd5/gJpKox4Mg7pD2YoC2b0/54rJQuJZdm6Izcgma4TW1WZ0h+y8BfbyJMwBmSxkjw+VObNanp5h/adwGhaTXF4NWbLj9gEONyCmUZmd10pGgf1/vwcgOT3tUQE0DdicwIod2EmSbwsKE1P8QoDkcHPJ5YESjgBJkYQpIEZ2KEB51Y6y3ojvY+P8XEDN7uKS0w0ltA7QGCWHCxSWWpwyaCeLy0BkA7UXyyg8fIzDoWHeBaDN4tQdSvAVdU1Aok+nsNTipIEVnkywo/FHatVkBoIhnFisOBoZxcGtQd4B0GYJNZsDSiAEadUBCkstPtN3Avs2Msa+Dt9XfxoFSNYF/Bh9gP0bOqHLAm2WUF1YQskwrVFYPWkf3h1iXwbvqGfFPSGW9Eah8HSS9fuZDnS32f71m8KFY7xs/QZyu6TH2+2+FAAAAABJRU5ErkJggg%3D%3D",
            uso: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAQCAYAAAAiYZ4HAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAh9JREFUeNp0krmLWnEQxyf7zLoajyIWXojIxkK0EiIGCRamCKQwEdIIgYQoQSR/wLY2goVVJGCa1BaL2liKBESFiOJFiMRb1xMVRbx+mfdA0RwDA4/3m+Mz3xmAf9hDNJ/P9zWXy935/f7A5eXlFfzPRCKROBgMfqvX62S5XBLabDbbh8M76zRYKpUqvF5vyGw2P+bz+cBisWCz2cB2u33wV2WFQvEoFArlW60WmUwmZLVakdFoRNxu9xd8Fp51UKlUWmS91ev11zweD5AZMAFmsxkgWhpDpsfKarVaE4lEqpVKhUynU4a73++TcrlMarUa6Xa7G7vd/u4QT93c3HzmcrlPSqUSiMVihrvX68F6vYZsNkvPcOFyuV5Uq9VuoVD4ztrv91wOhwMCgQAGgwEsFguYz+eMSyQSkMvlwGazqUAg8KnRaHSo4XA4Q9leYRdmHrpyJpMBehaDwQBCoRB2ux2gapRSqbymsP2PTqezsFqtz+6hpVIpprLRaGTw8BcgBVOo2WyOj8NbLJaP+Xx+k0gkCL00xGNEoJ2WOZlMznQ6nfVsFyaT6X273d4eAmkfj8ckHo+PNRrNSzrm4jRBq9XysDWF18Cg0OzpdPrO6XS+QRVvz6oj0nOch25NYrEYgxEOhxsymezpadyxA8p5HxUDXBTgSUA0Gv3pcDheI2LiNIE6fOAN/cKkK9RdUSwWkx6P5y0mZv+8ud8CDABidDMA4Sb2JAAAAABJRU5ErkJggg%3D%3D"
        },

        $: function(id) {
            return document.getElementById(id);
        },
        initialize: function(scriptId, scriptCurrentVersion, scriptCallbackFunction, scriptUseNotice, scriptForceNotice) {
            ScriptUpdater.scriptId = scriptId;
            ScriptUpdater.scriptCurrentVersion = scriptCurrentVersion;
            ScriptUpdater.scriptCallbackFunction = typeof(scriptCallbackFunction) == "function" ? scriptCallbackFunction : false;
            ScriptUpdater.scriptUseNotice = scriptUseNotice;
            ScriptUpdater.scriptForceNotice = scriptForceNotice;
            if(ScriptUpdater.scriptStorage == null) {
                ScriptUpdater.scriptStorage = new Storage("local", "ScriptUpdater." + scriptId);
            }
        },
        setValue: function(key, value) {
            if(ScriptUpdater.scriptStorage != null) {
                ScriptUpdater.scriptStorage.setItem(key, value);
            }
        },
        getValue: function(key, defaultValue) {
            if(ScriptUpdater.scriptStorage != null) {
                return ScriptUpdater.scriptStorage.getItem(key, defaultValue);
            } else {
                return defaultValue;
            }
        },
        getOffers: function() {
            var offers = ScriptUpdater.getValue("offers", "");
            return (typeof(offers) == "undefined" || typeof(offers.length) == "undefined" || typeof(offers.push) == "undefined") ? new Array() : offers;
        },
        addOffer: function(version) {
            var offers = ScriptUpdater.getOffers();
            offers.push(version);
            ScriptUpdater.setValue("offers", offers);
        },
        alreadyOffered: function(version) {
            var offers = ScriptUpdater.getOffers();
            for(var indDun = 0; indDun < offers.length; indDun++) {
                if(version.toString() == offers[indDun].toString())
                    return true;
            }
            return false;
        },
        addStyle: function(css) {
            var head = document.getElementsByTagName("head")[0];
            if (!head)
                return;
            var style = document.createElement("style");
            style.type = "text/css";
            style.textContent = css;
            head.appendChild(style);
        },
        parseMetaTags: function(metaTags) {
            function find_meta(element, index, array) {
                return (element.indexOf("// @") != -1);
            }

            var headers = {};
            var name, prefix, header, key, value;
            var lines = metaTags.split(/\n/).filter(find_meta);

            for(var indDun in lines) {

                if(typeof(lines[indDun]) == "string") {
                    name = lines[indDun].match(/\/\/ @(\S+)\s*.*/)[1];
                    value = lines[indDun].match(/\/\/ @\S+\s*(.*)/)[1];
                    key = name.split(/:/).reverse()[0];
                    prefix = name.split(/:/).reverse()[1];

                    if(prefix) {
                        if(!headers[prefix]) {
                            headers[prefix] = new Object;
                        }
                        header = headers[prefix];
                    } else {
                        header = headers;
                    }

                    if(header[key] && !(header[key] instanceof Array)) {
                        header[key] = new Array(header[key]);
                    }

                    if(header[key] instanceof Array) {
                        header[key].push(value);
                    } else {
                        header[key] = value;
                    }
                }
            }
            return headers;
        },
        checkRemoteScript: function() {

            if(ScriptUpdater.scriptCurrentVersion && !ScriptUpdater.alreadyOffered(ScriptUpdater.scriptCurrentVersion)) {
                ScriptUpdater.addOffer(ScriptUpdater.scriptCurrentVersion);
            }

            var date = new Date();
            ScriptUpdater.setValue("lastCheck", parseInt(date.getTime()));

            var su_script=document.createElement('iframe');
            su_script.setAttribute('id', 'updater_96794');
            su_script.setAttribute('style', 'display:none;');
            su_script.src="http://userscripts.org/scripts/source/96794.meta.js";

           // su_script.src="http://userscripts.org/scripts/review/96794";
            document.body.appendChild(su_script);

            window.addEventListener('message', onMessage, true);

            function onMessage(e) {
                if (e.origin != "http://userscripts.org")
                    return;
                myversion = unescape(e.data);
                if (myversion.substring(0, myversion.indexOf("/")) == 96794)
                    gonextstep();
            }

            function gonextstep() {
                ScriptUpdater.scriptMetaTags = ScriptUpdater.parseMetaTags(myversion);
                ScriptUpdater.setValue("versionAvailable", ScriptUpdater.scriptMetaTags.version);
                if(ScriptUpdater.scriptForceNotice || (!ScriptUpdater.alreadyOffered(ScriptUpdater.scriptMetaTags.version) && ScriptUpdater.scriptUseNotice)) {
                    if(!ScriptUpdater.alreadyOffered(ScriptUpdater.scriptMetaTags.version)) {
                        ScriptUpdater.addOffer(ScriptUpdater.scriptMetaTags.version);
                    }
                    ScriptUpdater.showNotice();
                }
                if(typeof(ScriptUpdater.scriptCallbackFunction) == "function") {
                    ScriptUpdater.scriptCallbackFunction(ScriptUpdater.scriptMetaTags.version);
                }
            }

        },
        getLastCheck: function() {
            return ScriptUpdater.getValue("lastCheck", 0);
        },
        getInterval: function() {
            var interval = ScriptUpdater.getValue("interval", 86400000);
            return (typeof(interval) == "undefined" || !interval.toString().match(/^\d+$/)) ? 86400000 : parseInt(interval.toString());
        },
        setInterval: function(interval) {
            ScriptUpdater.setValue("interval", parseInt(interval));
        },
        check: function(scriptId, scriptVersion, scriptCallbackFunction) {
            ScriptUpdater.initialize(scriptId, scriptVersion, scriptCallbackFunction, true, false);
            var date = new Date();
            if((date.getTime() - ScriptUpdater.getLastCheck()) > ScriptUpdater.getInterval()) {
                ScriptUpdater.checkRemoteScript();
            }
        },
        forceCheck: function(scriptId, scriptVersion, scriptCallbackFunction) {
            ScriptUpdater.initialize(scriptId, scriptVersion, scriptCallbackFunction, true, false);
            ScriptUpdater.checkRemoteScript();
        },
        forceNotice: function(scriptId, scriptVersion, scriptCallbackFunction) {
            ScriptUpdater.initialize(scriptId, scriptVersion, scriptCallbackFunction, true, true);
            ScriptUpdater.checkRemoteScript();
        },
        showNotice: function() {
            if(ScriptUpdater.scriptMetaTags.name && ScriptUpdater.scriptMetaTags.version) {
                ScriptUpdater.addStyle([
                ["#ScriptUpdater", ScriptUpdater.scriptId, "Mask { position:fixed; width:100%; top:0; left:0; height:100%; background-color:#000; opacity:.7; z-index:9000; }"].join(""),
                ["#ScriptUpdater", ScriptUpdater.scriptId, "Body * { border:none; font-size:12px; color:#333; font-weight:normal; margin:0; padding:0; background:none; text-decoration:none; font-family:Helvetica Neue,Arial,Helvetica,sans-serif; }"].join(""),
                ["#ScriptUpdater", ScriptUpdater.scriptId, "Body { width:500px; margin:auto; top:125px; position:fixed; left:35%; text-align:left; background:#DED7C5; border:1px outset #333; padding:0; font-family:Arial; font-size:14px; -moz-border-radius:5px; cursor:default; z-index:9010; color:#333; padding-bottom:1em ; }"].join(""),
                ["#ScriptUpdater", ScriptUpdater.scriptId, "Body a { margin:0 .5em; text-decoration:underline; color:#000099; font-weight:bold; }"].join(""),
                ["#ScriptUpdater", ScriptUpdater.scriptId, "Body strong { font-weight:bold; }"].join(""),
                ["#ScriptUpdater", ScriptUpdater.scriptId, "Body h1 { font-size:13px; font-weight:bold; padding:.5em; border-bottom:1px solid #333; background-color:#999; margin-bottom:.75em; }"].join(""),
                ["#ScriptUpdater", ScriptUpdater.scriptId, "Body h2 { font-weight:bold; margin:.5em 1em; }"].join(""),
                ["#ScriptUpdater", ScriptUpdater.scriptId, "Body h1 a { font-size:13px; font-weight:bold; color:#fff; text-decoration:none; cursor:help; }"].join(""),
                ["#ScriptUpdater", ScriptUpdater.scriptId, "Body h1 a:hover { text-decoration:underline; }"].join(""),
                ["#ScriptUpdater", ScriptUpdater.scriptId, "Body table { width:auto; margin:0 1em; }"].join(""),
                ["#ScriptUpdater", ScriptUpdater.scriptId, "Body table tr th { padding-left:2em; text-align:right; padding-right:.5em; line-height:2em; }"].join(""),
                ["#ScriptUpdater", ScriptUpdater.scriptId, "Body table tr td { line-height:2em; font-weight:bold; }"].join(""),
                ["#ScriptUpdater", ScriptUpdater.scriptId, "Body li { list-style-type:circle; }"].join(""),
                ["#ScriptUpdater", ScriptUpdater.scriptId, "Body p { font-size:12px; font-weight:normal; margin:1em; }"].join(""),
                ["#ScriptUpdater", ScriptUpdater.scriptId, "History { margin:0 1em 1em 1em; max-height:150px; overflow-y:auto; border:1px inset #999; padding:0 1em 1em; width:448px; }"].join(""),
                ["#ScriptUpdater", ScriptUpdater.scriptId, "History ul { margin-left:2em; }"].join(""),
                ["#ScriptUpdater", ScriptUpdater.scriptId, "Close { float:right; cursor:pointer; height:14px; opacity:.5; }"].join(""),
                ["#ScriptUpdater", ScriptUpdater.scriptId, "Close:hover { opacity:.9; }"].join(""),
                ["#ScriptUpdater", ScriptUpdater.scriptId, "Footer { margin:.75em 1em; }"].join(""),
                ["#ScriptUpdater", ScriptUpdater.scriptId, "Footer input { border:1px outset #666; padding:3px 5px 5px 20px; background:no-repeat 4px center #eee; -moz-border-radius:3px; cursor:pointer; width:70px; float:right; margin-left:.5em; }"].join(""),
                ["#ScriptUpdater", ScriptUpdater.scriptId, "Footer input:hover { background-color:#f9f9f9; }"].join(""),
                ["#ScriptUpdater", ScriptUpdater.scriptId, "Footer select { border:1px inset #666; }"].join(""),
                ""
                ].join("\n"));

                var html = new Array();
                html.push(["<h2><a href=\"http://userscripts.org/scripts/show/", ScriptUpdater.id, "\" target=\"_blank\" title=\"About the Userscripts.org Script Updater\"><img src=\"", ScriptUpdater.icons.uso, "\" align=\"absmiddle\" style=\"margin-top:-2px;\"/></a><img id=\"ScriptUpdater", ScriptUpdater.scriptId, "Close\" src=\"", ScriptUpdater.icons.close, "\" title=\"Close\"/>Userscripts.org Updater</h2>"].join(""));

                if(!ScriptUpdater.scriptForceNotice) {
                    html.push(["<p>There is a new version of <strong><a href=\"http://userscripts.org/scripts/show/", ScriptUpdater.scriptId, "\" target=\"_blank\" title=\"Go to script page\">", ScriptUpdater.scriptMetaTags.name, "</a></strong> available for installation.</p>"].join(""));
                } else {
                    html.push(["<p><strong><a href=\"http://userscripts.org/scripts/show/", ScriptUpdater.scriptId, "\" target=\"_blank\" title=\"Go to script page\" style=\"margin:0; padding:0;\">", ScriptUpdater.scriptMetaTags.name, "</a></strong></p>"].join(""));
                }

                if(ScriptUpdater.scriptCurrentVersion) {
                    html.push(["<p>You currently have version <strong>", ScriptUpdater.scriptCurrentVersion, "</strong> installed. The latest version is <strong>", ScriptUpdater.scriptMetaTags.version, "</strong></p>"].join(""));
                }

                if(ScriptUpdater.scriptMetaTags.history) {
                    html.push(["<h2>Version History:</h2><div id=\"ScriptUpdater", ScriptUpdater.scriptId, "History\">"].join(""));

                    var history = new Array();
                    var version, desc;
                    if(typeof(ScriptUpdater.scriptMetaTags.history) != "string") {
                        for(var indDun = 0; indDun < ScriptUpdater.scriptMetaTags.history.length; indDun++) {
                            version = ScriptUpdater.scriptMetaTags.history[indDun].match(/(\S+)\s+.*$/)[1];
                            change = ScriptUpdater.scriptMetaTags.history[indDun].match(/\S+\s+(.*)$/)[1];

                            history[version] = typeof(history[version]) == "undefined" ? new Array() : history[version];
                            history[version].push(change);
                        }
                    } else {
                        version = ScriptUpdater.scriptMetaTags.history.match(/(\S+)\s+.*$/)[1];
                        change = ScriptUpdater.scriptMetaTags.history.match(/\S+\s+(.*)$/)[1];
                        history[version] = typeof(history[version]) == "undefined" ? new Array() : history[version];
                        history[version].push(change);
                    }

                    for(var v in history) {

                        if(typeof(v) == "string" && v.match(/v?[0-9.]+[a-z]?/) || typeof(v) == "number") {
                            html.push(["<div style=\"margin-top:.75em;\"><strong>v", v, "</strong></div><ul>"].join(""));
                            for(var indDun = 0; indDun < history[v].length; indDun++) {
                                html.push(["<li>", history[v][indDun], "</li>"].join(""));
                            }
                            html.push("</ul>");
                        }
                    }

                    html.push("</div>");
                }

                html.push(["<div id=\"ScriptUpdater" + ScriptUpdater.scriptId + "Footer\">", "<input type=\"button\" id=\"ScriptUpdater", ScriptUpdater.scriptId, "CloseButton\" value=\"Close\" style=\"background-image:url(", ScriptUpdater.icons.close, ")\"/><input type=\"button\" id=\"ScriptUpdater" + ScriptUpdater.scriptId + "BodyInstall\" value=\"Install\" style=\"background-image:url(", ScriptUpdater.icons.install, ");\"/>", "Check this script for updates "].join(""));
                html.push(["<select id=\"ScriptUpdater", ScriptUpdater.scriptId, "Interval\">",
                "<option value=\"3600000\">every hour</option>",
                "<option value=\"21600000\">every 6 hours</option>",
                "<option value=\"86400000\">every day</option>",
                "<option value=\"604800000\">every week</option>",
                "<option value=\"0\">never</option>",
                "</select>"].join(""));
                html.push("</div>");

                var noticeBackground = document.createElement("div");
                noticeBackground.id = ["ScriptUpdater", ScriptUpdater.scriptId, "Mask"].join("");
                document.body.appendChild(noticeBackground);

                var noticeWrapper = document.createElement("div");
                noticeWrapper.setAttribute("style", "position:absolute; width:100%; top:0; left:0; z-index:9010; max-width:auto; min-width:auto; max-height:auto; min-height:auto;");
                noticeWrapper.id = ["ScriptUpdater", ScriptUpdater.scriptId, "BodyWrapper"].join("");

                var notice = document.createElement("div");
                notice.id = ["ScriptUpdater", ScriptUpdater.scriptId, "Body"].join("");
                notice.innerHTML = html.join("");

                noticeWrapper.appendChild(notice);

                document.body.appendChild(noticeWrapper);

                ScriptUpdater.$(["ScriptUpdater", ScriptUpdater.scriptId, "Close"].join("")).addEventListener("click", ScriptUpdater.closeNotice, true);
                ScriptUpdater.$(["ScriptUpdater", ScriptUpdater.scriptId, "CloseButton"].join("")).addEventListener("click", ScriptUpdater.closeNotice, true);
                ScriptUpdater.$(["ScriptUpdater", ScriptUpdater.scriptId, "BodyInstall"].join("")).addEventListener("click", function() {
                    setTimeout(ScriptUpdater.closeNotice, 500);
                    document.location = ["http://userscripts.org/scripts/source/", ScriptUpdater.scriptId, ".user.js"].join("");
                }, true);
                var selector = ScriptUpdater.$(["ScriptUpdater", ScriptUpdater.scriptId, "Interval"].join(""));
                for(var indDun = 0; indDun < selector.options.length; indDun++) {
                    if(selector.options[indDun].value.toString() == ScriptUpdater.getInterval().toString())
                        selector.options[indDun].selected = true;
                }

                ScriptUpdater.setInterval(selector.value);
                selector.addEventListener("change", function() {
                    ScriptUpdater.setInterval(selector.value);
                }, true);
                window.addEventListener("keyup", ScriptUpdater.keyUpHandler, true);
            }
        },
        closeNotice: function() {
            document.body.removeChild(ScriptUpdater.$(['ScriptUpdater', ScriptUpdater.scriptId, 'BodyWrapper'].join("")));
            document.body.removeChild(ScriptUpdater.$(['ScriptUpdater', ScriptUpdater.scriptId, 'Mask'].join("")));
            window.removeEventListener("keyup", ScriptUpdater.keyUpHandler, true);
        },
        keyUpHandler: function(event) {
            switch(event.keyCode) {
                case 27:
                    ScriptUpdater.closeNotice();
                    break;
            }
        }
    };

    //ScriptUpdater.forceNotice(96794, duel_version);
    //ScriptUpdater.forceCheck(96794, duel_version);
    ScriptUpdater.check(96794, duel_version);
} else {
    (function(f) {
        var d=document,s=d.createElement('script');
        s.setAttribute('type','application/javascript');
        s.textContent = '('+f.toString()+')()';
        (d.body||d.head||d.documentElement).appendChild(s);
        s.parentNode.removeChild(s)
    })( function() {
        function sendMessage() {
            var dstWindow = window.parent;
            mymessage = String(escape(document.body.textContent));
            if(dstWindow.postMessage) {
                dstWindow.postMessage('96794'+mymessage, '*');
            }
        }

        sendMessage();
    })
}
//FIN MAJ AUTO SOM



      