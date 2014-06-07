// ==UserScript==
// @name           DMMobile
// @namespace      null
// @description    DMMobile
// @version        1.0.3
// @updateURL      https://userscripts.org/scripts/source/157015.meta.js
// @include        http://sp.dmm.co.jp/mono/*
// ==/UserScript==

/*jshint browser:true, jquery:true, undef:true, unused:false, multistr:true */
/*global _V_ */

function main() {
    var dmm = {};

    dmm.init = function() {
        // Remove original style
        $('[type="text/css"]').remove();
        // Add new stype
        var style = '<style>\
            .form-search-submit {margin-top: 5px !important}\
            #hd-search-service {margin-right: 5px}\
            .navbar-text a {font-size: 80%; padding-left: 2px}\
            .red {color: #CC0000}\
            .sample-gallery {margin-top: 20px}\
            .sample-gallery img{width: 104px; height: 78px; margin: 1px}\
            td:first-child {font-weight: bold}\
            td li {display: inline; padding-right: 3px}\
            .res {display: block; margin: 10px 0 -54px; width: 100%; text-align: center; opacity: 0}\
            .footer {background-color: #F5F5F5; border-top: 1px solid #E5E5E5; margin-top: 10px; padding: 10px 0; text-align: center;}\
            </style>';
        $('head').append(style);
        // Init page structure
        var $navbar = $('<div class="navbar"><div class="navbar-inner"><div class="container-fluid"></div></div></div>');
        var $section = $('<div class="container-fluid"><div class="row-fluid"></div></div>');
        var $footer = $('<footer class="footer"></footer>');
        $('body').prepend($navbar, $section, $footer);
        this._fillNav();
        this._fillFooter();
    };

    dmm._fillNav = function() {
        $('.hd-location').remove();
        var $brand = $('.hd-logo>a').addClass('brand');
        var $menu = $('<ul class="nav"><li class="active"><a href="/mono/index/index/shop/dvd">DVD</a></li></ul>');
        var $search = $('<form action="/search/request" method="GET" class="navbar-form input-append pull-right"></form>');
        var $searchOption = $('#hd-search-service').addClass('input-small');
        var $searchInput = $('.form-search-txt').addClass('input-medium');
        var $searchSubmit = $('<button type="submit" class="btn form-search-submit">Search</button>');
        var $hotSearch = $('<span class="navbar-text pull-right"><span class="label label-important">Hot!</span></span>').append($('.hd-search-keyword a'));
        $search.append($searchOption, $searchInput, $searchSubmit);
        $('.navbar-inner>div').append($brand, $menu, $search, $hotSearch);
    };

    dmm._fillFooter = function() {
        var $footer = $('#ft-copyright').appendTo($('footer'));
    };

    dmm.sample = function() {
        var $sample = $('<div id="sample" class="span9 well"></div>');
        this._showTitle($sample);
        this._showCover($sample);
        if ($('#work-sample')[0]) {
            this._showGal($sample);
        }
        return $sample;
    };

    dmm._showTitle = function($e) {
        var $title = $('<h4>')
            .append($('#work-wrap h1').html())
            .appendTo($e);
    };

    dmm._showCover = function($e) {
        var $image = $('.package>a>img')
            .attr('src', $('.package>a').attr('href'))
            .addClass('thumbnail')
            .removeAttr('width')
            .parent()
                .lb()
                .appendTo($e);
        $('.work-graybox1').remove();
    };

    dmm._showGal = function($e) {
        var link = $('#work-sample a').attr('href');
        var $gal = $('<div class="sample-gallery"></div>')
            .load(link + ' #lists', function(){
                $('#lists>li>a').each(function(){
                    var $this = $(this);
                    $this
                        .attr('href', $this.children().attr('src'))
                        .attr('ref', 'gallery1')
                        .appendTo($gal)
                        .children()
                            .removeAttr('width')
                            .addClass('img-polaroid');
                });
                $('#lists').remove();
                $('.sample-gallery a').lb();
            })
            .appendTo($e);
    };

    dmm.info = function() {
        var $info = $('<div id ="info" class="span3 well"></div>');
        this._showTable($info);
        this._showDesp($info);
        if ($('.play-btn')[0]) {
            this._showVideo($info);
        }
        return $info;
    };

    dmm._showTable = function($e) {
        var $table = $('<table id="info-table" class="table table-striped table-condensed"></table>').appendTo($e);
        var rows = ['Release', 'Duration', 'Actress', 'Director', 'Series', 'Maker', 'Label', 'Genre', 'Cid', 'Rating'];
        var i =0;
        function fillTable(c2){
            $('<tr>')
                .appendTo($table)
                .append($('<td>')
                    .text(rows[i]))
                .append($('<td>')
                    .html(c2));
            i++;
        }
        var date = $('#work-info>li:first').text().split(':')[1];
        fillTable(date);
        var duration = $('.pd-l6:first').prev().prev().text();
        fillTable(duration);
        // Actress, director, series, maker, label, genre
        var $info = $('.pd-l6').each(function() {
            fillTable($(this).html());
        });
        var cid = $('.pd-l6:last').next().next().text();
        fillTable(cid);
        var rating = $('#work-info>li:nth-child(5)').html().split('\uFF1A')[1];  // Full width colon
        fillTable(rating);
    };

    dmm._showDesp = function($e) {
        var $desp = $('.work-infobox:nth-child(2)>p').appendTo($e);
    };

    dmm._showVideo = function($e) {
        var $button = $('<a id="play-button" class="btn btn-primary btn-large" ref="#sample-video">Play Sample</a>')
            .attr('href', $('.play-btn').attr('href'))
            .lb({width: 720, height:404})
            .bind('click.sv', dmm.onPlayVideo);
        var $video = $('<video id="sample-video" class="video-js vjs-default-skin" controls></video>').hide();
        $e.append($button, $video);
    };

    dmm.onPlayVideo = function() {
        $('#sample-video-clone').show();
        var player = _V_("sample-video-clone", {techOrder: ['flash', 'html5']}, function(){
            this.addEvent('resize', dmm.onAddRes);
            this.size(720, 404);
            this.src($('#play-button').attr('href'));
        });
        $('#lb-backdrop').bind('click.sv', dmm.onClearVideo);
    };

    dmm.onClearVideo = function(){
        var player = _V_("sample-video-clone");
        player.removeEvent('resize', dmm.onAddRes);
        player.destroy();
        $('.res a').unbind('.sv');
        $(this).unbind('.sv');
    };

    dmm.onAddRes = function() {
        var srcLow = $('#play-button').attr('href');
        var $res = $('<div class="btn-group res"></div>')
            .hover(
                function() {
                    $(this).fadeTo(200, 1);
                },
                function() {
                    $(this).fadeTo(200, 0);
                }
            )
            .appendTo($('#lb-box'));
        var low = $('<a class="btn btn-large active">Low</a>').attr('href', srcLow);
        var mid = $('<a class="btn btn-large">Mid</a>').attr('href', srcLow.replace('_sm_', '_dm_'));
        var high = $('<a class="btn btn-large">High</a>').attr('href', srcLow.replace('_sm_', '_dmb_'));
        $res.append(low, mid, high);
        $('.res a').bind('click.sv', dmm.onSwitchRes);
    };

    dmm.onSwitchRes = function(e) {
        e.preventDefault();
        var $this = $(this);
        if ($this.hasClass('active')) {
            return;
        }
        $this.addClass('active');
        $this.siblings().removeClass('active');
        var player = _V_("sample-video-clone");
        player.src($this.attr('href'));
        player.play();
    };

    if (/\/detail\//.test(location.pathname)) {
      dmm.init();
      $('.row-fluid').append(dmm.sample(), dmm.info());
      // Clear page
      $('.footer').nextUntil($('#lb-container')).remove();
    } else {
      $('.hd-search').click(function(){
        $('#hd-search-area').toggle();
      })
      $('.hd-global').click(function(){
        $('#hd-gnav').toggle();
      })
    }

}

function lb() {
    // Simple lightbox
    // Usage: $().lb([options])
    (function($){

        var methods = {
            init: function(options) {
                options = options || {};
                methods._init();
                return this.each(function() {
                    $(this)
                        .bind('click.lb', {op:options}, methods._show);
                });
            },

            destroy: function() {
                $('#lb-container').remove();
                return this.each(function(){
                    $(this).unbind('.lb');
                });
            },

            _show: function(e) {
                e.preventDefault();
                $('#lb-box').empty();
                var $this = $(this),
                    type = $this.children()[0] ? 'IMG': 'DIV',
                    ref = $this.attr('ref');

                if (type === 'IMG') {
                    if (ref) {
                        methods._$gal = $('a[ref="' + ref + '"]');
                        methods._cur = methods._$gal.index($this);
                        methods._showGal(this.href);
                    } else {
                        methods._showImg(this.href);
                    }
                } else {
                    if (ref) {
                        methods._showDiv(ref, e.data.op);
                    }
                }
                $('#lb-backdrop').bind('click.lb', methods._clear);
                $('#lb-container').fadeIn();
            },

            _init: function() {
                if ($('#lb-container')[0]) {
                    return;
                }
                var $LB = $('<div>')
                    .attr('id', 'lb-container')
                    .appendTo($('body'))
                    .hide();

                var $LBBackdrop = $('<div>')
                    .attr('id', 'lb-backdrop')
                    .css({
                        'background-color': '#000',
                        'position': 'fixed',
                        'top': 0,
                        'bottom': 0,
                        'left': 0,
                        'right': 0,
                        'opacity': 0.8,
                        'z-index': 99
                    })
                    .appendTo($LB);

                var $LBBox = $('<div>')
                    .attr('id', 'lb-box')
                    .css({
                        'position': 'absolute',
                        'z-index': 100,
                        'border': 'solid 5px #FFF'
                    })
                    .appendTo($LB);
            },

            _showImg: function(url) {
                var $LBBox = $('#lb-box');
                $('<img>')
                    .attr('src', url)
                    .load(function() {
                        methods._center($LBBox, this.width, this.height);
                    })
                    .appendTo($LBBox);
            },

            _showGal: function(url) {
                methods._showImg(url);
                methods._addNav(-1);
                methods._addNav(1);
            },

            _showDiv: function(ref, op) {
                var $LBBox = $('#lb-box');
                var $div = $(ref);
                var width = op.width || $div.width(),
                    height = op.height || $div.height();
                $div.clone()
                    .attr('id', $div.attr('id') + '-clone')
                    .width(width)
                    .height(height)
                    .appendTo($LBBox);

                methods._center($LBBox, width, height);
            },

            _clear: function() {
                $('#lb-backdrop').unbind('.lb');
                $('#lb-container').fadeOut(400, function() {
                    $('#lb-box').children()
                        .unbind('.lb')
                        .remove();
                });

            },

            _addNav: function(type) {
                var lor = type === 1 ? 'right' : 'left';

                var $LBNav = $('<a>')
                    .attr('id', 'lb-' + lor)
                    .css({
                        'position': 'absolute',
                        'top': 0,
                        'width': '25%',
                        'height': '100%',
                        'background-color': '#000',
                        'opacity': 0,
                        'z-index': 101
                    })
                    .css(lor, 0)
                    .hover(
                        function () {
                            $(this).css('opacity', 0.3);
                        },
                        function () {
                            $(this).css('opacity', 0);
                        }
                    )
                    .bind('click.lb', {tp: type}, function(e) {
                        e.preventDefault();
                        var next = methods._cur + e.data.tp,
                            len = methods._$gal.length - 1;
                        if (next < 0 || next > len) {
                            methods._clear();
                            return;
                        }

                        $('#lb-box :first-child')[0].src = methods._$gal[next].href;
                        methods._cur = next;
                    })
                    .appendTo($('#lb-box'));
            },

            _center : function($el, width, height) {
                $el.css({
                    'left': function() {
                        return window.pageXOffset + (window.innerWidth - width) / 2;
                    },
                    'top': function() {
                        return window.pageYOffset + (window.innerHeight - height) / 2;
                    }
                });
            },

            _$gal: {},  // Gallery
            _cur: 0  // Index of current photo.
        };

        $.fn.lb = function(method) {

            if (methods[method]) {
                return methods[method].apply( this, Array.prototype.slice.call(arguments, 1));
            } else if (typeof method === 'object' || !method) {
                return methods.init.apply(this, arguments);
            } else {
                $.error('Method ' +  method + ' does not exist on jQuery.lb');
            }

        };

    })(jQuery);
}

function addJQuery(func) {
    var script = document.createElement('script');
    script.appendChild(document.createTextNode('(' + func + ')();'));
    document.body.appendChild(script);
}

var head = document.getElementsByTagName('head')[0];
var bscss = document.createElement('link');
bscss.href = '//netdna.bootstrapcdn.com/twitter-bootstrap/2.2.2/css/bootstrap.no-icons.min.css';
bscss.rel = 'stylesheet';
head.appendChild(bscss);
if (document.getElementsByClassName('play-btn')[0]) {
    var vjs = document.createElement('script');
    vjs.src = 'http://vjs.zencdn.net/c/video.js';
    var vcss = document.createElement('link');
    vcss.href = 'http://vjs.zencdn.net/c/video-js.css';
    vcss.rel = 'stylesheet';
    head.appendChild(vjs);
    head.appendChild(vcss);
}

addJQuery(lb);
addJQuery(main);