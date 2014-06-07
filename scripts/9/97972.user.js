// ==UserScript==
// @name            The-West Gardrop Lite
// @namespace       http://userscripts.org/scripts/show/94811
// @description     Üzerinizdeki kıyafetleri ya da set'leri daha hızlı erişim için kaydedebilirsiniz.
// @author          Dun [SOM - Scripts-O-Maniacs] - Originally by Puli / Muche - Translate fr Hack Crow
// @translator      JohnCooper
// @website         http://scripts-o-maniacs.leforum.eu
// @include         http://*.the-west.*/game.php*
// @include         http://userscripts.org/scripts/source/94811.meta.js
// @version         1.3.3.5
//
// @history         1.3.3.5 Ajout fonction de suppression totale (creer un set nommé RazTout , valider et cela supprime l'ensemble des sets)
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
var tenue_version = "1.3.3.5";
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


        var wardrobe_text={en:'Wardrobe', sk:'Šatník', cz:'Skříň', fr:'Tenue', ru:'Гардероб', tr:'Gardrop'};
        var new_name_text={en:'New name', sk:'Nový názov', cz:'Nový název', fr:'Nouveau nom', ru:'Новое название', tr:'Yeni Ekle'};
        var cancel_button_text={en:'Cancel', sk:'Zrušiť', cz:'Zrušit', fr:'Annuler', ru:'Отмена', tr:'İptal'};
        var delete_button_text={en:'Delete', sk:'Zmazať', cz:'Smazat', fr:'Supprimer', ru:'Удалить', tr:'Sil'};
        var save_button_text={en:'Save', sk:'Uložiť', cz:'Uložit', fr:'Sauvegarder', ru:'Сохранить', tr:'Kaydet'};
        var tw_button_text={en:'Selection TWPro', sk:'TWPro', cz:'TWPro', fr:'Sélection TWPro', ru:'Выбрать TWPro', tr:'TWPro ile seçili olanları giy.'};
        var save_message_text={en:'Wardrobe is saved', sk:'Šatník bol uložený', cz:'Skříň byla uložena', fr:'Tenue mise à jour', ru:'Комплект сохранён', tr:'Gardrop Kaydedildi'};
        var confirm_overwrite_text={
            en:'Do you realy want to overwrite wardrobe ',
            sk:'Naozaj chceš prepísať oblečenie s názvom ',
            cz:'Skutečně chceš přepsat oblečení pod názvem ',
            fr:'Voulez-vous vraiment modifier la tenue ',
            ru:'Вы действительно хотите перезаписать Гардероб',
            tr:'üzerine kaydetmek istediğinizden emin misiniz? '
        };
        var confirm_delete_text={
            en:'Do you realy want to delete wardrobe ',
            sk:'Naozaj chceš prepísať oblečenie s názvom ',
            cz:'Skutečně chceš přepsat oblečení pod názvem ',
            fr:'Voulez-vous vraiment modifier la tenue ',
            ru:'Вы действительно хотите перезаписать Гардероб',
            tr:'silmek istediğinizden emin misiniz? '
        };
        var save_choose_name_error_text={
            en:'You must pick "New name" or one existing wardrobe!',
            sk:'Najprv musíš vybrať položku "Nový názov" alebo už existujúcu položku!',
            cz:'Musíš nejdřív vybrat položku "Nový název" nebo už existující položku!',
            fr:'Vous devez choisir "Nouveau nom" ou une tenue existante !',
            ru:'Вы должны сделать новый комплект или открыть существующий"!',
            tr:'"Yeni Ekle" ya da mevcut bir Gardrop seçmelisiniz!'
        };
        var save_invalid_name_error_text={
            en:'Wardrobe name contains invalid characters!',
            sk:'Názov oblečenia obsahuje neplatné znaky!',
            cz:'Název oblečení obsahuje neplatné znaky!',
            fr:'Le nom de la tenue contient des caractères invalides !',
            ru:'Название комплекта содержит недопустимые символы',
            tr:'Gardrop ismi geçersiz karakterler içeriyor!'
        };
        var delete_choose_name_error_text={
            en:'You must pick existing wardrobe!',
            sk:'Najprv musíš vybrať položku!',
            cz:'Musíš nejdřív vybrat položku!',
            fr:'Vous devez choisir une tenue existante !',
             ru:'Вы должны выбрать набор!',
             tr:'Mevcut bir Gardrop seçmelisiniz!'
        };
        var changeOk_text={
            en:'Clothing change Ok',
            sk:'Ok',
            cz:'Ok',
            fr:'Changements de vétements effectués',
            ru:'Ок',
            tr:'Kıyafet Değiştirme Tamamlandı',
        };

        var  check_rarm_text={
            en:'Don\'t change right arm',
            sk:'Don\'t change right arm',
            cz:'Don\'t change right arm',
            fr:'Ne pas changer d\'arme main droite',
            ru:'Не менять Дуэльное оружие',
            tr:'Düello silahını değiştirme.'};


        var  check_animal_text={
            en:'Don\'t change animal',
            sk:'Don\'t change animal',
            cz:'Don\'t change animal',
            fr:'Ne pas changer de monture',
            ru:'Не менять Средство передвижения',
            tr:'Binek hayvanını değiştirme.'
        };

        var  check_changeonselect={
            en:'Configuration Mode',
            sk:'Configuration Mode',
            cz:'Configuration Mode',
            fr:'Mode configuration',
            ru:'Режим настройки',
            tr:'Düzenleme Modu'
        };
        var  error_confmodenotactivated={
            en:'Active Configuration Mode for create new set ? ',
            sk:'Active Configuration Mode for create new set ?',
            cz:'Active Configuration Mode for create new set ?',
            fr:'Voulez vous activer le Mode Configuration pour creer un nouveau set ?',
            ru:'Включить Режим настройки при создании нового комплекта?',
            tr:'Yeni set oluşturmak için Düzenleme Modu aktif edilsin mi?'
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
            YesImg:'data:image/png;base64,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',
            NoImg:'data:image/png;base64,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',
            DuelImg:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAhCAYAAAC803lsAAAACXBIWXMAAAsSAAALEgHS3X78AAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN/rXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz/SMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH/w/qQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA/g88wAAKCRFRHgg/P9eM4Ors7ONo62Dl8t6r8G/yJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt/qIl7gRoXgugdfeLZrIPQLUAoOnaV/Nw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl/AV/1s+X48/Pf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H/LcL//wd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93/+8//UegJQCAZkmScQAAXkQkLlTKsz/HCAAARKCBKrBBG/TBGCzABhzBBdzBC/xgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD/phCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q/pH5Z/YkGWcNMw09DpFGgsV/jvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY/R27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4/OBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L/1U/W36p/VHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N/T0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26/uNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE/C5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV/MN8C3yLfLT8Nvnl+F30N/I/9k/3r/0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt/87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi/RNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a/zYnKOZarnivN7cyzytuQN5zvn//tEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO/PLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3/T7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA/0HIw6217nU1R3SPVRSj9Yr60cOxx++/p3vdy0NNg1VjZzG4iNwRHnk6fcJ3/ceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX/i+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8/pPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb/1tWeOT3dvfN6b/fF9/XfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR/cGhYPP/pH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF/6i/suuFxYvfvjV69fO0ZjRoZfyl5O/bXyl/erA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o/2j5sfVT0Kf7kxmTk/8EA5jz/GMzLdsAAAAgY0hSTQAAeiUAAICDAAD5/wAAgOkAAHUwAADqYAAAOpgAABdvkl/FRgAADEVJREFUeNqMmHlwVdd9xz/3vvveu2/Tk56WJyFkgZDYMYtZjCGYGmwPNnGTqWtit7j1eJh2aqeeplvqqXFm4kzbSaZpm5bWJSmp49jFsU0cFzeBFLDMEoKEQAKJRRKSnpa37+8u792lfzyxtYnT38z945x7zznf3/f8zvf3O1fIZjPcNEEQsG0byenkzMlPKJd1PvPgQ/T19ng7FizouHjh/Jre3nOfy6bTKzVNbapUKh7AIQhCWRAE1bbthMfj6WtpbTt8eeDC6TmtbROdXYv0vvO9uL0Buk8cJx6PUiopmKaFIAgAZPNFJD7FnE4nsej0xng8uuuDQz/YE43OeHVdw7JsLMvEsuybn7ps23ZZlhkURbFzfHzsNz0eT6KYz387Hou+53S6eh0Ox6cthfC/GbEsC6/Px9kzp+cmE/Hdly/1/9noyHBtOp0iFothGGVqawK0NNVQG/Dh9QeoGAaFXJZ4KkM2r2PYDtwuF5ZpILvlREvrPX8lSK7vDfQPJGdmJn81I7Zt4/V6ScTjK2Zmpr5xse/8I9evX2N6KoLLYbNxTRvbNs2ltcFi+GIPPSMZJgcLAHS1w7r7vMzrWMJwTOTH3TeYmCri9VYac0MDf+v3+7fbWC+BMPypjNi2jc/nI5lIrPng0LvfPd/78xWpdIpkIs79q1rZ9dnFeO0o777/M46eSTKW1AFI5jQAGoIyTbKTllYXm9a0ce+yNtKKm+8eukquWAHAK7svj0/Fnsrk8oO2Zd/FiJDJpBFFEa/XRyIRX/nB+z9488Txny6PRCaRnDZf3P0QO9aU+errpznbn6O5pZGHt2xh7fIO3K7AXV6lEiN8fPw8o1OTAKxc42PJ3AD7P0wwOlFAEMDplAavDk88rqramCiKAOSLCkKxWEAplZiYGG+7fu3qgWM/PbLt8uUBXILJ119+Gsk6zt6vXyCXM1ix8gEef3Qji7s68EgqqZEkpXTsFhBfKEwpHeO/B0bpuRohXcyyqcvNxq2L+dHxBH1DKQBkt/PoWCS6C8jYQGQqhiQIIoAUGR/bPdB/YVsymcDtFPiblx8mOf0R+w5cJZcz2Pnk0+zcsoC6QC2pkQiJdAzz2vhdjOSptret6GBBc4BLkxqfXDxPnCt8dlMnRcXg+ngOVStvX9bV/rvXxqa+6ZhlRdA1nZmZyQ1vvnHgv/ov9tXFotN85Yur8ZZv8NrrAygZN888/ww77oNcXKAUG6M8YvzCI5gsKDQEvHf1HcvlOX52iOXrOth+/wJef/8SM4kCoiAWC0Vl5VQ0MZovlJDO/uykJ5VKPhmZmKibnp5m8+r5dDQWeHFvFcRLG1fQ1SYw9sNhjuXyhLNTAIRD7b8UzJ0Wzk4xv7OZvt4BAn43D29s4e2PVMqVin9+W/jPxyajLwIVqVIx5l8e6N9TqejU+F08uyPIvrcvMDNVZpO3SG1ykMT3BzldyLPlhVeZudTLsY+7ITdIjcNL3qwuXOPw4klniQVdt9p5U6GtfSHP7fgM/7TvH+j+uIeXnlvJ/LY6RibSZLLFpx0O8WvAhKTr2gPpdDqYTqXZuHgOSBUGhyLUWSa/0dUEQMJUkDSNUmGCJ/bs5ok9u3G46m95bZarQXiz72ZbyeRxWHmU1BX2f2snn3v8XbrPx1m1YhWRaBFVUQNb1q94GPiONDR4aWcmmyFfyHL/hrl8dKrKxmONt4+mNm3glyUOfPMfmed10rJkET5PD6WqPKDEsqQMEakydWtMjadMjSwyNmMiyW4ifVMs9ZucOjXF7oVLCdX6iJQUVL3yFPAdKZlMLLcti9qATGeLk4PviAzGCvxeVxloYiqRRJTBpQRZLPkZUyp0eqJoyQEcwHA0iWTXYQgZQrUhaus9qEYdACd7z/G9N6/QWXDiqmgsb4X9JwvoqkBTvYeZmERRUe8FkDRVDQuCQEPID1aa4WgGRbMJuf0kZvff0lyMOWzan9nN1ke2o6SOIfncWCWdptoQ6YxNZ3MDJy45uPxePwAVrYBzJMn6PLTNESiny7jcfhRNYyoyRCjYiSg6UBW9DkBSVdVrGBXCQZH4TOquiNemDVRc3NA0Op7fw+7f2UXqxgWSk6MA/KR3GDVWYO2GMKG6VroPXsCTzhKyNWTAD3hm5ynIIo2z896YLnNvWAIETNtyAkiGUREty0L2VoXFUtK3gOiWh6Ko4tmwmWee3s5w/wkKk4fxBhqqQN64hl7jZO2GMB9fnCYYi9IsVRe/OV4VVUTLg6Spt4WvZCJYIrOppqqoguio2DbOcqUqUk7LB2QppxXyoouh2hp+/dceZCQyzvWe7zNvYT2TyWl6zsZ47o9XM50o0XM2hnJlkgWSjCEbFACXUg12D6CKKoZswB3J3pytZYTZtiQKQsG27VA6ZyLJIXxhLwxVX8Z8Gl1rHqM13EBkaAjV7SOaVPn3vx9moUugbyxJ3lQI58p0mXW4RZXC7MSWWGUgARQN8Gu3QdTXhDDsKhBREAwAybbtGcs0Q6lMiYB/LuE5El5ZIKa5UDSNHRvXUczFyeTO4dFLjGT8hM0cIVumGIvSKlVjwS1CQTaQNAnB0PD6LXKIMAugxvJQlHN4ZYFFixopaNUdkCSpCCDKHu9pXdNI53SmUzoruxpoCMokNI2gpxaHmSedv0Z+PFkNYKN4y7MGf3UyxVKYkat1iWh5EMQ6SpoLSZPwAzJFHJ05yjmLhqBMfX090XiOSqWM1+e5ASDOn99xVNFUFEWnuyfDlk0b2bzYy4gjyHCgwvjMUQqlccLNHuSQl2Xzbic1Z9FAlqtgQkpVO/JllbyoUoTqowH+KivHKz5WL70HhygyHcuiqhqNoZqjAOKq1Wv7bduKSZKDM/3TODB5YOtShgsqRiaPRy+xoM7JvIX1NDd4CLlcs2cbBLGOZFEib3mxRBVJk5BrjVlmFBKaRkIuMT/kr8ZcXGbr5nXciGqYhoUgUF54T+B9AMk0zYn6UOOB6ZnJL6cLGodPXOHZz6/h4vUkfaem6Ds4Q499iZFKqJpNzRyNkgwSpI3ErFrMeg4YsoGEhCV6qavVaJzjpIjC4esVmhbdQ2NrmGM95ykbFeaG607/y1vdPX/9zyAODPSri5Yue8/pdOadkpPDxyJcv5riS799H4s6mziTKBBssVhzT5Llgo4fUKUShlHEJYo3WacoATJImjwLSKNxTlWbfpL0oIXm8dQT6zlyYoh4IklFV43lC8P7SyXVBBAdDgeCIPa6XPIrDslplw2b1/ZfplJx8eUXVtO+ajFHB2QsNUA4rNEoy3gMHxp+rLJ3lo9ZMLP1kq9eY+WSjlsgikKIZ39rJ0dPRRibiKFrOvPnzf3w7w4ceevmWFHXdQB7zty2t1qawz9GgExeZ+++cxiWl5ee66Cjs56jUR+jGvjaWwiHNWS/RlGCqFGNRdmv0eA3aJsj4QqK9EWv8sZgHVawkz/Ys5Nz/VMMXo2gahqBgDz6yIauvaZpYVpWVdj2vvIyoiji8fqIR6cXXLl84cNUKr3Esm1q/QJ/unsey+9dwHsf9XHonVHEYpa17SZ1NRUs9XapUB9sweUYJ6bq9EyKpCpNbH3sftYva+Y/z0wzMBRBUVQsq5L5ws4Hn/+T1/YfunmdsCwL4Suv/mWVGlFEURQmxkaX59LRg8lUbqllW8gukYfWNfL5R8Pky+10nx7m7JlutIjKxsYA/uYEAJm8k5G8iRaax4r71rF6cRPZfJEj3eNMTEXR9DJOScg9sW39H73yjTcO3ATxC4EUCgXisRni8VQHprIvmUw9KiDikBx4vS7WLXbz4OYlOF1+JidSTMYUxmczdltzK7V1jbSETZIZjZ6Lk4xG0hRLCtlMhqam0I3tD6z8i699662DllW90N0J5P9cwi3LwiE5R6+Nxr8QrnX/oWlZX9LL5aCm6xzr0fj5UB81fonGOpmgz01NwINlC0ynMlyLzJArVFA1k1KphKKoGKZhbFi95IMta+a/+vuvfPuy5HRgzcbFnfZL/wboejkbiRa/qpfLP1zWNffFfFF7Utf1unK5QjJlMjJm3/k3AHv22uoQRURRRIByczh0euXC+tf/9e1P/uNHR05z53b8v4EIgoCAYJfLlf7hicQLHtm1t7WpZqdpmrsUTViq6pUQ2C7btkXAFkVMp9NVCvp9w+1z5CO1wcCH//bOybNHTmhWbY2fX2X/MwBA9itd5z+tYwAAAABJRU5ErkJggg==',
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

            if(setName=='RazTout'){
                  razSet();
                  return;
            }



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
                if (!confirm('"' + setName + '" ' + confirm_overwrite_text[gLang] + '?')) {
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
            if (!confirm('"' + setName + '" ' + confirm_delete_text[gLang])) {
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
                nTable.setAttribute("style", "position: absolute; top:0px; margin-left: -5px; margin-top: 8px;");

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
                    nb.setAttribute("style","cursor: pointer; width:30px; height:30px; align:right;");
                    nb.setAttribute("src", Tenue_Icons.DuelImg);
                    nb.addEventListener("click", razSet, false);
                    nb.setAttribute("id", "betaico");

                    ns.appendChild(nb);

                    ajout_com_icone("betaico","RAZ List");

                }
                updateDropdown();
                setChangeOnSelect();

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
    ScriptUpdater.uncheck(94811, tenue_version);
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