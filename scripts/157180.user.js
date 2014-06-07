// ==UserScript==

// @name         Lotus noir set list popin

// @namespace    http://devster.org/

// @description  Enlarge thumbs in set lists

// @version      0.0.1

// @include      http://www.lotusnoir.info/magic/editions/Insurrection/

// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js

// ==/UserScript==



var Lotus = function() {

    var base_url_hq = 'http://www.card-hunter.fr/cartes/magic_hq/';

    var width = 299;

    var height = 432;

    var marge = 10;



    function parseViewUrl(url) {

        return url.split('/').slice(-3, -1);

    }



    function getHqUrl(extension, number) {

        return base_url_hq+extension+'/'+number+'.jpg';

    }



    function getPos(clientX, clientY) {

        var

            marge = marge | 10 ,

            maxY = window.innerHeight ? window.innerHeight : $(window).height() ,

            maxX = window.innerWidth ? window.innerWidth : $(window).width();

        return {

            x : clientX + width + marge > maxX ? clientX - width - marge : clientX + marge,

            y : clientY + height + marge > maxY ? clientY - height - marge : clientY + marge

        }

    }



    return {

        getHqUrl: getHqUrl,

        parseViewUrl: parseViewUrl,

        getPos: getPos

    };

}();



$(document).ready(function(){


    var $wrap = $('<div style="background: url(&quot;http://www.card-hunter.fr/cartes/magic/fondnoir.png&quot;) no-repeat scroll 0px 0px transparent;" class="grand_fond bvisuel">');

        $wrap.hide().css({position: 'fixed', zIndex: 10000, });

    var $img = $('<img>');

        $wrap.append($img);

        $('body').append($wrap);



    $('.dbx-content .fond_carte_s').hover(function(e) {

        var view_url = $(this).find('a:first').attr('href');

        var codes = Lotus.parseViewUrl(view_url);

        var src = Lotus.getHqUrl(codes[0], codes[1]);

        $img.attr('src', src);



        var pos = Lotus.getPos(e.clientX, e.clientY);

        $wrap.css({top: pos.y+'px', left: pos.x+'px'});



        $wrap.show();

    }, function() {

        $wrap.hide();

    });

});