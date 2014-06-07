// ==UserScript==
// @name       Imhonet tweak
// @namespace  http://j-by.net/imhonet-tweak
// @version    0.2
// @description  Remove top block from page. Make content block wider.
// @match      *://*.imhonet.ru/*
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// @grant      none
// @copyright  2012+, Dylfin
// ==/UserScript==
console.log('Imhonet tweak script init');
setTimeout(function(){
    console.log('Imhonet tweak script launched');
    $('#wrapper .l-section:first').remove();
    $('#my-custom-style').remove();
    var $style = $('<style id="my-custom-style">').attr('type','text/css');
    $style.html([
        '#subnavigation { position: fixed; top: 100px; width: 100%; z-index: 10;}',
        '#top-navigation { position: fixed; width: 100%; z-index: 10;}',
        '.m-tiles-card-txt{ padding: 0; width: 100%;}',
        '.m-tile-poster-text{padding: 0;}',
        '.m-tile-poster-title{padding: 2px 4px; font-family: Palatino,sans-serif; font-size: 16px}',
        '.m-tiles-card-title{padding: 2px 4px; font-family: Palatino,sans-serif; font-size: 16px}',
        '.m-tiles-card-label{padding: 2px 4px; float: right}',
        '.m-tiles-card-counters{padding: 2px 4px}',
        '.m-tile-poster .icon-download, .m-tile-poster .icon-bookmark, .m-tile-poster .icon-play{height: 15px;width: 15px; line-height: 15px;}',
        '.m-tiles-poster-btn{height: 20px;line-height: 20px; padding: 0 0 3px;}',
        '.m-tiles-opinion .m-tiles-card-txt{ padding: 0}',
        '.m-subnavigation-item > a { border-bottom: 4px solid transparent; line-height: inherit;  padding: 3px 0 0;}',
        '.m-subnavigation-item {line-height: 20px; padding: 0;}',
        '.m-subnavigation{height: auto}',
        '.l-threequaters { width: 100%;}',
        '.m-elementprimary-data {float: right; position: absolute; right: 0; top: 0;}',
        'h1.m-elementprimary-title { padding: 0;}',
        '.m-elementprimary-subtitle { margin: 10px 0;}',
        '.m-elementprimary-subtitle.m-elementprimary-rating { margin: 10px 0;}',
        '.btn.use-way {line-height: 120%;}',
        '.btn.use-way i {font-size: 10px;height: 15px;line-height: 140%;margin: 2px 0; width: 15px;}',
        '.m-elementdescription { padding: 0;}',
        '.m-elementdescription-h2 {margin: 10px 0;}',
        '.section-button {padding: 10px 0;}',
        '.m-inlineimagelist {padding: 0;}',
        '.m-inlineimagelist-h2.theme-text-color.is-masked { margin: 0;}',
        '.m-photogallery.exdending-height { padding: 3px 0;}',
        '.m-inlineimagelist-h2.is-masked {margin: 0; font-size: 28px; cursor: pointer; padding: 8px 0;}',
        '.rating-title.is-masked {line-height: 100%; padding: 5px 0;}',
        '.rating.rating-element {  margin: 3px auto 8px 25%;}',
        '.m-comments-title { padding: 5px 0;}',
        '.m-comments-rating { right: 5px;}',
        '.m-comments-item-body-container { padding: 5px;}',
        '.m-comments-content {  margin: 10px 60px 0 0;}',
        '.m-videoplayer-h1.is-masked {  font-size: 28px;  line-height: 30px;  padding: 10px 80px; cursor: pointer;}',
        '.m-inlineimagelist-h2 {cursor: pointer; font-size: 28px; margin: 5px 0;}',
        '.m-advancedcontentfilter-bottom:before{border-top: none}'
    ].join(' '));
    $('#footer').append($style);
    
    var toggleItems = [
        {parent:'.m-inlineimagelist', trigger: '.m-inlineimagelist-h2', target: '.m-inlineimagelist-gallery'},
        {parent:'.m-videoplayer', trigger: '.m-videoplayer-h1', target: '#jp_container_1'},
        {parent:'', trigger: '', target: ''},
        {parent:'', trigger: '', target: ''},
        {parent:'', trigger: '', target: ''}
    ];
    for(var i=0;i<toggleItems.length;i++){
        (function(item){
            $(item.parent).each(function(idx, element){
                $(item.trigger, element).on('click', function(){
                    $(item.target, element).toggle();
                    $(element).next('.section-button').toggle();
                });
                $(item.target, element).hide();
                $(element).next('.section-button').hide();
            });   
        })(toggleItems[i]);
    }
}, 8000);