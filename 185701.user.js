// ==UserScript==
// @name        Customize Smileys
// @author      kemege (chaoskmg@gmail.com)
// @namespace   kemege
// @description Re-order and customize favorite smileys in FDUPT!
// @include     http://pt.vm.fudan.edu.cn/*
// @version     0.3
// @grant       none
// ==/UserScript==
String.prototype.hashCode = function () {
    var hash = 0;
    if (this.length == 0) return hash;
    for (i = 0; i < this.length; i++) {
        char = this.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
        // Convert to 32bit integer
    }
    return hash;
}

function saveFavoriteSmileys() {
    favs = {};
    $('#smileys').children().each(function() {
        favs[$(this).attr('id')] = {
            src: $(this).attr('src'),
            alt: $(this).attr('alt'),
            title: $(this).attr('title'),
        };
    });
    window.localStorage.setItem('sm_fav_col', JSON.stringify(favs));
}
function openCustomizeDialog() {
    var page = '<label>Favorite Smileys: (Drag items to reorder)</label>\
    <div id="smileys" class="sortable" style="border: 1px dotted black;padding: 5px">__smileys__</div><br/>\
    <label>Add a custom image: (Input image URL here)</label><div><input type="text" id="custom" class="custom_smiley" />\
    <button id="add">Add</button></div>\
    <label>Add a custom text: (Input text here)</label><div><input type="text" id="customtext" class="custom_smiley" />\
    <button id="addtext">Add</button></div>\
    <label for="txt_import">Import: (Paste data string here)</label><div><input type="text" id="txt_import" class="custom_smiley" />\
    <button id="import">Import</button></div>\
    <label for="txt_export">Export: (Copy the following string and import it on other browsers)</label><div><input type="text" id="txt_export" class="custom_smiley" />\
    <style> .ui-sortable-placeholder { border: 1px dotted black; visibility: visible !important; height: 50px !important; width: 50px !important; }</style>';
    var smileys = '';
    if ((window.localStorage) && (window.localStorage.getItem('sm_fav_col'))) {
        favs = JSON.parse(window.localStorage.getItem('sm_fav_col'));
        for (var fav in favs) {
            smileys += '<img src="' + favs[fav]['src'] + '" alt="' + favs[fav]['alt'] + '" title="' + favs[fav]['title'] + '" id="'+fav+'"/>';
        }
    }
    page = page.replace(/__smileys__/g, smileys);
    $('#customize_smileys') .html(page);
    $('#customize_smileys') .dialog({
        width: 600,
        height: 400,
        close: function () {
            $(this) .html('');
        }
    });
    $('.sortable') .sortable({
        placeholder: 'ui-sortable-placeholder',
        update: function() {
            saveFavoriteSmileys();
        },
        start: function(e, ui){
            ui.placeholder.height(ui.item.height());
        }
    });
    $('.sortable') .disableSelection();
    $('#addtext') .button() .click(function () {
        text = $('#customtext') .val();
        if (text) {
            smiley = '<img src="111" alt="' + text + '" title="' + text + '" id="'+text.hashCode()+'"/>';
            $('#smileys').append(smiley);
            saveFavoriteSmileys()
            $('#customtext') .val('');
        }
    });
    $('#add') .button() .click(function () {
        img = $('#custom') .val();
        if (img) {
            smiley = '<img src="' + img + '" alt="[img]' + img + '[/img]" title="[img]' + img + '[/img]" id="'+img.hashCode()+'"/>';
            $('#smileys').append(smiley);
            saveFavoriteSmileys()
            $('#custom') .val('');
        }
    });
    $('#txt_export').click(function() {
       $(this).select();
    }).val(window.localStorage.getItem('sm_fav_col'));
    $('#import') .button() .click(function () {
        data = $('#txt_import') .val();
        try {
           result = JSON.parse(data);
        }
        catch(e) {
           alert('Corrupted data string!');
        }
        if (result) {
            window.localStorage.setItem('sm_fav_col', data);
            alert('Import Success!');
        }
    });
    $('.custom_smiley').css('width', 450);
}
$('#sp_object_sb_config_2') .append(' | <a href="#" class="open_customize_dialog">Customize Smileys</a>');
$('#sp_object_sb_config_2') .after('<div id="customize_smileys" style="display:none;" title="Customize Smileys"></div>');
$('.open_customize_dialog') .click(function () {
    openCustomizeDialog();
    return false;
});

