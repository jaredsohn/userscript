// ==UserScript==
// @name        bahamut_common
// @namespace   http://mmis1000.byethost31.com/
// @description A common lib used to create some kinds of layout/menu on "gamer.com.tw", require jquery to work
// @include     *.gamer.com.tw/*
// @version     1.02.04
// @grant       none
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// ==/UserScript==
function mmis1000_BahaMenu ($) {
    var self = this;
    var settingImageUrl = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAABGCAYAAABG4C2wAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAadEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjExR/NCNwAAA3NJREFUaEPtmE1LVGEYhkMzZ45Rv2B+gGsRkQgisla1KEcajFDMj7ICF9GHtXLhRmnoHwS6mdA/ECJu3AgqLkVQ8A8IKih+nO73zPucXs/cjmfG0zwuuuHizHOfd577xTkf+Fzzff/KQE0tqKkFNbWgphbU1IKaWlBTiKMb7Q9amoa++aknL39bq6xYjkBNIY7S3e96zWYMKJuK7vliOQI1BaIGewwlG7EUrO2qzh4DsRyBmoIrBE2aQK//8w9T4nMWLBovQtbr/5JpfJRtdrz2YpdkNlPvNK4Yb/DrL9uH5gjUFFx5A6N5FhQH79WnO7YNzRGoKURkfhoaVo5UZ/8b+/1ALEegpuAKjc01QgMvwrYIxHIEagqu0JRdrH46OziEY5chnRueds85jNg2NEegptDQdr813f2+hzQPwE/w2maIbrJ1gtf38TnLEagpsIYRuuwmQpE1Z4hmuFBTSD1+Mc8aOtRuM1bmLipEmxrMNYLzt4rL8HhuvdfG1oFtYJ7O11mOQE3BFZpdnbsJD70MC7oIPH2/2xaBWI5ATcFV48NO910TG7zVf+Lr4cuS5QjUFFyxoAoI3+YsR6Cm4Oi22zz1rG/YraN4g6P5dO7t1N864RdlOjvQgcYFr/fDXWuZv9aIBFq27SmjOtQFdyNGLEegphBH7mZQPi2654vlCNQU4giP+Jyzmfqie75YjkBNLaipBTW1oKYW1NSCmlpQUwtqakFNLaipBTW1oKYW1NSCmlpQU4ijiYmJFqz1FxYW9Mdom5ubvVgbCKXuGA3rXNVmjIZ6EvgHBwfBGA0fs2DReBFlDw8PM7Ozs822Nkp2jIa6ap2enib738HR0VEeXlXa399PfowGr2ItLy8nP0ZDba6RqmRbBDLleVBTcIWaXaz+2traEA5dhvX19enALNXlx2jj4+OtW1tbPfhMtbKyUjJGs6eo9vb2qh+jgYtUMrmyfjlFM0KoKczNzc3jWE6124yVuYsKoETmGsH5cIw2NjbWZk9FtQ2SG6Ohvjp3Ex56GXgVC0/f5MdoMzMz7rsmtnA3Jj9GQ30ZJTtGQx1qaWlp2H6kOj4+zm9sbEzZMvkX5erqage8ws7OTjhGQz0CXJ0Zo6EunJyc1G6MhnWhUOqO0XZ3d3NYGwjl/zHaP4GaWlBTC2pqQU0tqKmDf+0PPVIPMQ7Ve2sAAAAASUVORK5CYII=';
    var settingImageUrlForMainPage = 'data:image/png;base64,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';
    var overlayCss = {
        'z-index' : '99',
        'position' : 'fixed',
        'top' : '35px',
        'bottom' : '0px',
        'left' : '0px',
        'right' : '0px',
        'background' : 'rgba(128,128,128,0.8)',
        'text-align' : 'center',
        'display' : 'none'
    };
    var menuCss = {
        'width' : '600px',
        'background' : '#ffffff',
        'position' : 'absolute',
        'top' : '50px',
        'bottom' : '50px',
        'left' : '50%',
        'margin-left' : '-305px',
        'padding' : '5px',
        'border' : '1px solid #aaaaaa', 
        'overflow' : 'auto'
    };
    var halfBarCss = {
        'float' : 'left',
        'width' : '292px',
        'height' : '30px',
        'border' : '1px solid #f7f7f7',
        'text-align' : 'left',
        'padding' : '3px',
        'vertical-align' : 'text-bottom',
        'line-height' : '30px'
    };
    var fullBarCss = {
        'float' : 'left',
        'width' : '592px',
        'height' : '30px',
        'border' : '1px solid #dddddd',
        'text-align' : 'center',
        'padding' : '3px',
        'vertical-align' : 'text-bottom',
        'line-height' : '30px',
        'background' : '#dddddd'
    };
    var LineCss = {
        'float' : 'left',
        'width' : '600px',
        'height' : '2px',
        'background' : '#eeeeee'
    };
    var checkboxCss = {
        'float' : 'right',
        'margin' : '0px auto',
        'height' : '30px',
    }
    this.menu = null;
    this.overlay = null;
    this.settingButton = null;
    this._init = function _init() {
        var overlay, menu, settingButton;
        if ($('#mmis1000_menu').length === 0) {
            overlay =  $('<div id="mmis1000_settingOverlay"></div>').css(overlayCss).appendTo('body');
            menu = $('<div id="mmis1000_menu"></div>').css(menuCss).appendTo(overlay);
            settingButton = $('<a href="javascript: void(0);" id="mmis1000_topBar_light_setting"></a>')/*.css('background-image', "url('" + settingImageUrl + "')")*/;
            if(!(/.+www\.gamer\.com\.tw(\/|\/index.+)?$/g).test(window.location.href)) {
                $('body').prepend('<style type="text/css"> #mmis1000_topBar_light_setting {background-image: url(' + settingImageUrl + ') !important; } </style>')
            } else {
                $('body').prepend('<style type="text/css"> #mmis1000_topBar_light_setting {background-image: url(' + settingImageUrlForMainPage + ') !important; } .topbnow,#mmis1000_topBar_light_setting:hover{background-position:bottom !important;} .bh-typeahead{width:325px !important;}</style>');
                overlay.css('top', '0px');
            }
            $('#topBar_light_0').before(settingButton);
            overlay.hide();
            settingButton.bind('click', function(){self.toggleMenu()});
            overlay.bind('click', function(event){if($(event.target).attr('id') === 'mmis1000_settingOverlay') {self.toggleMenu()}});
        }
        this.menu = $('#mmis1000_menu');
        this.overlay = $('#mmis1000_settingOverlay');
        this.settingButton = $('#mmis1000_topBar_light_setting');
    };
    this.toggleMenu = function toggleMenu() {
        self.overlay.fadeToggle();
        self.settingButton.toggleClass('topbnow');
    };
    this._addHalfBar = function _addHalfBar() {
        var halfBar;
        halfBar = $('<div></div>').css(halfBarCss).appendTo(this.menu);
        return halfBar;
    };
    this._addFullBar = function _addFullBar() {
        var fullBar;
        fullBar = $('<div></div>').css(fullBarCss).appendTo(this.menu);
        return fullBar;
    };
    this.addLine = function addLine() {
        var line;
        line = $('<div></div>').css(LineCss).appendTo(this.menu);
        return line;
    };
    this.addCheckbox = function addCheckbox(text) {
        text = text || '';
        var container, checkbox;
        container = this._addHalfBar().text(text);
        checkbox = $('<input type="checkbox"></input>').css(checkboxCss);
        checkbox.appendTo(container);
        return checkbox;
    };
    this.addFullTextBar = function addFullTextBar(text) {
        var fullTextBar;
        fullTextBar = this._addFullBar().text(text);
        return fullTextBar;
    };
    this.addHalfTextBar = function addHalfTextBar(text) {
        var halfTextBar;
        halfTextBar = this._addHalfBar().text(text);
        return halfTextBar;
    };
    
    this._init();
}