// ==UserScript==
// @name         ubuntu-it Forum - [Risolto] automatizzato
// @description  Aggiunge un pulsante "Applica [Risolto]" alle proprie disussioni
// @include      http://forum.ubuntu-it.org/viewtopic.php?*
// @require      https://raw.github.com/jeresig/jquery.hotkeys/master/jquery.hotkeys.js
// @grant        none
// @version      0.99
// ==/UserScript==

if( (typeof unsafeWindow) != 'undefined' ){
    var $ = unsafeWindow.jQuery;
    var console = unsafeWindow.console || {log:function(){}};
}

var jQuery = $;

var realConsole = console;
console = {
    log: function(msg){
        realConsole.log(msg);
        jQuery('#zoff-risolto-log').append('<div>'+msg+'</div>');
    }
};

var ajaxCache = {};

function syncAjax( url, data ){
    data = data || {};
    idStr = url+JSON.stringify(data);
    if( ajaxCache[idStr] ){
        return ajaxCache[idStr];
    }
    jQuery.ajax({
        async: false,
        url: url,
        data: data,
        dataType: 'html',
        success: function(result){
            ajaxCache[idStr] = result;
        }
    });
    return ajaxCache[idStr];
}

function getPost(topicId, firstOrLast, page){
    firstOrLast = !!firstOrLast;
    var result = syncAjax( 'viewtopic.php', {t:topicId, start: firstOrLast?0:(page-1)*20} );
    if( firstOrLast )
        return jQuery('.post:first',result);
    else
        return jQuery('.post:last',result);
}

function getTopicPages(){
    return parseInt($('.pagination:first strong:nth-child(2)').text());
}

function getCurrentPage(){
    return parseInt( jQuery('.pagination:first span strong').text() || '1');
}

function getPostOrder(){
    if( jQuery('.post').length>1 ){
        var first_id = jQuery('.post:first').attr('id').substr(1);
        var last_id = jQuery('.post:last').attr('id').substr(1);
        return parseInt(last_id)>parseInt(first_id);
    }
    return getTopicPages()===1 || getCurrentPage()===1;
}

function getEditForm(post){
    var editUrl = post.find('.edit-icon a').attr('href');
    var result = syncAjax( editUrl, {});
    return jQuery('#postform',result);
}

function createWaitLayer(){
    var wait = jQuery('<div><h1 style="text-align: center">Applico il tag [Risolto]...<br>Attendi 2 secondi per la fine delle operazioni</h1></div>');
    wait.css({
        'position': 'fixed',
        'top': '0px',
        'bottom': '0px',
        'left': '0px',
        'right': '0px',
        'color': 'white',
        'opacity': 0.8,
        'background-color': 'black'
    });
    return wait;
}

function getCurrentUser(){
    var user = jQuery('a[title^=Esci]').attr('title');
    if( user)
        return user.match(/\[ (.*) \]/)[1];
    return false;
}

function getCurrentTopicId(){
    var loc = jQuery('#page-body h2:first a').attr('href');
    var split = loc.split('t=');
    if(split.length<2){
        throw "Impossibile trovare l'ID della discussione";
    }
    return split[1].split('&')[0];
}

function isAdminOrMod(username){
    if( typeof localStorage.adminOrMod === 'undefined' ) {
        var result = syncAjax('memberlist.php',{ mode:'group', g:20 });
        
        localStorage.adminOrMod = jQuery('.username-coloured:contains("'+username+'")',result).length;
    }
    return parseInt(localStorage.adminOrMod)===1;
}

function isOwner(user, topicId){
    var npages = getTopicPages();
    var currPage = getCurrentPage();
    var postOrderAsc = getPostOrder();
    if( postOrderAsc ){
        if( currPage===1 ){
            var topic_post = jQuery('.post:first');
        }else{
            var topic_post = getPost(topicId,postOrderAsc,npages);
        }
    }else{
        if( currPage===npages ){
            var topic_post = jQuery('.post:last');
        }else{
            var topic_post = getPost(topicId,postOrderAsc,npages);
        }
    }
	return !!topic_post.find('.postprofile').text().icontains(user);
}

function canEdit(user, topicId){
	if( !user ){
		return false;
	}
	return isAdminOrMod( user ) || isOwner(user, topicId);
}

function isAlreadySolved(){
	return jQuery('#page-body h2:first').text().icontains('[risolto]');
}

function isClosed(){
    return jQuery('.locked-icon').length!==0;
}


String.prototype.icontains = function (s){
    s = s || '';
    return this.toLowerCase().indexOf(s.toLowerCase())!==-1;
}


jQuery(function(){
    
    var log = jQuery('<div id="zoff-risolto-log" style="display:none"></div>');
    log.css({
        opacity: 1,
        color: 'black',
        backgroundColor: 'white'
    });
    var logContainer = jQuery('<div></div>');
    logContainer.css({
            position: 'fixed',
            top: 0,
            left: 0,
            paddingLeft: 3,
            paddingRight: 3,
            color: 'white',
            backgroundColor: '#cccccc',
            cursor: 'pointer',
        })
        .click(function(){
            jQuery('#zoff-risolto-log').toggle();
        })
        .append(log);
    jQuery(document.body).append(logContainer);
    
    var topicId = getCurrentTopicId();
    var alreadySolved = isAlreadySolved();
    var user = getCurrentUser();
    var adminOrMod = isAdminOrMod( user );
    var owner = isOwner(user, topicId);
    var closed = isClosed();

    console.log('version: ' + GM_info.script.version);
    console.log('topic: ' + topicId);
    console.log('user: ' + user);
    console.log('owner: ' + owner);
    console.log('adminOrMod: ' + adminOrMod );
    console.log('topic already solved: ' + alreadySolved);
    console.log('current page: ' + getCurrentPage() +'/' +getTopicPages());
    console.log('post order ASC: ' + getPostOrder());
    console.log('closed: ' + closed);
    
    var condition = !isNaN(topicId) && (!alreadySolved) && (user!==false) && ( adminOrMod || (owner && (!closed)) );
    console.log('condition: ' +  condition + ' type: ' + (typeof condition));

    if( condition===true ){
        console.log('preparing the button...');
        var button = jQuery('<input type="button" title="Aggiungi automaticamente il flag [Risolto] al titolo della discussione" class="button2" value="Aggiungi [Risolto]">');

        button.click(function(){

            var wait = createWaitLayer();
            jQuery(document.body).append(wait);

            var topic_post = getPost(topicId,getPostOrder(),getTopicPages());
            var editForm = getEditForm(topic_post);
            var subject = jQuery('#subject',editForm);
            subject.val('[Risolto] '+subject.val());

            if(jQuery('#postform').length > 0){
                jQuery('#postform').replaceWith(editForm);
            }else{
                jQuery('#smiley-box',editForm).remove();
                jQuery('#colour_palette',editForm).remove();
                jQuery(document.body).append(editForm);
            }

            setTimeout(function(){
                jQuery('input[name=post]',editForm).click();
            }, 2000);
        });

        jQuery('#topic-search fieldset').append(button);
        
        console.log('button added!' );
    }else{
        console.log('button not needed!');
    }
    jQuery(document).bind('keydown', 'ctrl+shift+l', function() {
            jQuery('#zoff-risolto-log').toggle();
    });
});
