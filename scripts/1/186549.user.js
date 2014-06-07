// ==UserScript==
// @name        DA - Icon faver
// @author      Trien
// @namespace   *
// @description Add heart feature to people avatar
// @include     http://*.deviantart.com/*
// @include     http://*deviantart.com/*
// @version     1
// ==/UserScript==

//icon faver


// css //

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}
var heartedIcons = [];
var heartedIconsLog = {};
var nbFav = 0;
var maxFavByCookie = 48;
var cookie = readCookie('faveIcon0');
if(cookie == null){ cookie = {}; }
else{ cookie = $.parseJSON(cookie); }
heartedIcons[0] = cookie;
initCookie(heartedIcons[0]);
cookie = readCookie('faveIcon1');
if(cookie == null){ cookie = {}; }
else{ cookie = $.parseJSON(cookie); }
heartedIcons[1] = cookie;
initCookie(heartedIcons[1]);
cookie = readCookie('faveIcon2');
if(cookie == null){ cookie = {}; }
else{ cookie = $.parseJSON(cookie); }
heartedIcons[2] = cookie;
initCookie(heartedIcons[2]);
function initCookie(cookie){
    if(cookie != null){
        $.each(cookie,function(index, data){
            heartedIconsLog[data.alt] = data;
            nbFav++;
        });
    }
}

function saveIcon(){
    document.cookie = 'faveIcon0=; expires=Thu, 18 Dec 2000 12:00:00 GMT; path=/; domain=deviantart.com';
    document.cookie = 'faveIcon1=; expires=Thu, 18 Dec 2000 12:00:00 GMT; path=/; domain=deviantart.com';
    document.cookie = 'faveIcon2=; expires=Thu, 18 Dec 2000 12:00:00 GMT; path=/; domain=deviantart.com';
    if(nbFav < maxFavByCookie*1){
        document.cookie = 'faveIcon0='+JSON.stringify(heartedIcons[0])+'; expires=Thu, 18 Dec 3013 12:00:00 GMT; path=/; domain=deviantart.com';
    }else{
        if(nbFav <= maxFavByCookie*2){
            document.cookie = 'faveIcon1='+JSON.stringify(heartedIcons[1])+'; expires=Thu, 18 Dec 3013 12:00:00 GMT; path=/; domain=deviantart.com';
        }else{
            if(nbFav <= maxFavByCookie*3){
                document.cookie = 'faveIcon2='+JSON.stringify(heartedIcons[2])+'; expires=Thu, 18 Dec 3013 12:00:00 GMT; path=/; domain=deviantart.com';
            }
        }
    }
   
}

var baseAvatar = 'http://a.deviantart.net/avatars/';

function addHeart(e){
    var parentLink = e.parent();
    var status = (heartedIconsLog[e.attr('alt')] == undefined) ? 'nohearted' : 'hearted';
   // var altClean = e.attr('alt').substring(5,e.attr('alt').length-1);
    var heart = $('<img>')
    .attr({
        class: 'favheart '+status,
        'data-alt' : e.attr('alt'),
        'data-src' : e.attr('src').replace(baseAvatar,'')
    })
    .mouseover(function(){
        if(heartedIconsLog[$(this).data('alt')] == undefined){
            $(this).removeClass('nohearted').addClass('hearted');
        }
    })
    .mouseout(function(){
        if(heartedIconsLog[$(this).data('alt')] == undefined){
            $(this).addClass('nohearted').removeClass('hearted');
        }
    })
    .click(function(){
        if(heartedIconsLog[$(this).data('alt')] == undefined){
            faveIcon($(this));
        }else{
            unfaveIcon($(this));
        }
    });
    parentLink.after(heart);
}
function faveIcon(e){
    var iconData = {
        'alt':e.data('alt'),
        'src':e.data('src')
    };
    if(nbFav < maxFavByCookie*1){
        heartedIcons[0][e.data('alt')] = iconData;
    }else{
        if(nbFav <= maxFavByCookie*2){
            heartedIcons[1][e.data('alt')] = iconData;
        }else{
             if(nbFav <= maxFavByCookie*3){
                heartedIcons[2][e.data('alt')] = iconData;
            }
        }
    }
    heartedIconsLog[e.data('alt')] = iconData;
    nbFav++;
    saveIcon();
    displayIcon(iconData, true);
    $('.favheart[data-alt="'+e.data('alt')+'"]').removeClass('nohearted').addClass('hearted');
}
function unfaveIcon(e){
    if(nbFav < maxFavByCookie*1){
            heartedIcons[0][e.data('alt')] = undefined;
        }else{
            if(nbFav <= maxFavByCookie*2){
                heartedIcons[1][e.data('alt')] = undefined;
            }else{
                 if(nbFav <= maxFavByCookie*3){
                    heartedIcons[2][e.data('alt')] = undefined;
                }
            }
    }
    heartedIcons[0][e.data('alt')] = undefined;
    heartedIconsLog[e.data('alt')] = undefined;
    nbFav--;
    saveIcon();
    removeIcon(e.data('alt'));
    $('.favheart[data-alt="'+e.data('alt')+'"]').addClass('nohearted').removeClass('hearted');
}
function displayIcon(iconData, newIcon){
    var containerIcon = $('<a>')
    .click(function(e){
        text = $(this).find('img').attr('alt');
        $(this).parents('.cctextarea').find('.writer').append(text);
        $(this).parents('.cctextarea').find('#commentbody').keyup();
        e.preventDefault();
    });
    var icon = $('<img>')
    .attr({
        class: 'avatar',
        src: baseAvatar+iconData.src,
        //alt: ':icon'+iconData.alt+':',
        alt: iconData.alt
    })
    containerIcon.append(icon);
    $('.favedList').append(containerIcon);
    if(newIcon != undefined){ addHeart(icon); }
}
function removeIcon(iconAlt){
    $('.favedList img[alt="'+iconAlt+'"]').parent().remove();
    $('.favedList .favheart[data-alt="'+iconAlt+'"]').remove();
}


var favedList = $('<fieldset>')
.attr({
    class: 'favedList'
}).append($('<legend>').text('Favourite Deviantart icons'));
var favesIcoBtn = $('<div>')
.attr('class', 'smbutton smbutton-big favesIcoBtn')
.html('<span><img src="http://findicons.com/static/images/favorite.png"/> Icones</span>')
.click(function(){
    var previewBtn = $(this).parent().find('.preview');
    if(previewBtn.text() == 'Edit'){
       previewBtn.click(); 
    }
    $(this).parents('.ccomment-form').find('.favedList').toggle();
});
$('.cctextarea').append(favedList);
$('.scripted .preview').click(function(){
    $(this).parents('.ccomment-form').find('.favedList').hide();
});
$('.ccomment-form .scripted').prepend(favesIcoBtn);
$.each(heartedIconsLog, function(index, iconData){
     displayIcon(iconData);
});
$('.avatar').each(function(){
    addHeart($(this));
});

var styleHeart = $('<style>').html(
    '.favedList{'+
        'background: #fff;'+
        'min-width : 400px;'+
        'max-height : 370px;'+
        'padding: 10px 15px;'+
        'bottom: 0;'+
        'border: 1px solid #A5AFA5;'+
        'border-radius: 6px;'+
        'z-index: 1000;'+
        'transition : all 0.2s ease-out;'+
        'overglow:auto;'+
        'display : none;'+
        'text-align : left;'+
        'position: absolute;'+
        'margin: 0  0 -1px -4px ;'+
        
    ' }'+
    '.favedList legend{'+
        'background: #fff;'+
        'border: 1px solid #A5AFA5;'+
        'border-radius: 6px;'+
        'font-weight:bold;'+
        'padding:5px 10px;'+
        
    ' }'+
    '.favedList .avatar{'+
        'padding:2px;'+
        'left:auto;'+
        'position:relative;'+
        'cursor:pointer;'+
        
    ' }'+
    '.favesIcoBtn{'+
        'float:left;'+
        'margin:8px 0 0 0;'+
        'cursor:pointer;'+
        'border-radius: 5px;'+
    ' }'+
    '.favheart{'+
        'position : absolute;'+
        'height : 12px;'+
        'width : 12px;'+
        'margin: 1px 0px 0px -13px;'+
        'background-repeat: no-repeat;'+
        'background-size: contain;'+
        'z-index: 1000;'+
        'opacity : 0.6;'+
        'transition : all 0.2s ease-out;'+
        
    ' }'+
    '.favheart:hover{'+
        'opacity : 1;'+
        'width: 15px;'+
        'margin-left: -16px;'+ 
        'height: 15px;'+
   //     'margin-top: -3px;'+       
    ' }'+
    '.nohearted{'+
        'background-image : url(http://findicons.com/static/images/no_fav.png);'+
    ' }'+
    '.hearted{'+
        'background-image : url(http://findicons.com/static/images/favorite.png);'+
    ' }');
$('body').append(styleHeart);