// ==UserScript==
// @name 	    Guess A Celebrity
// @description	    Бот для викторины "Угадай знаменитость" на kinopoisk.ru
// @author 	    ReklatsMasters
// @version	    2.0.2
// @homepageURL     http://userscripts.org/scripts/show/127341
// @updateURL       https://userscripts.org/scripts/source/127341.meta.js
// @include 	    http://st.kinopoisk.ru/*
// @exclude 	    http://st.kinopoisk.ru/images/*
// @include 	    http://www.kinopoisk.ru/facegame/
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// @icon	    http://st.kinopoisk.ru/images/favicon.ico
// ==/UserScript==

(function(){
    function doMain(){
        // load image from iframe
        if (location.hostname == "st.kinopoisk.ru"){
            var hash = window.location.hash.toString().substr(1).split("|");

            xhr = new XMLHttpRequest();
            xhr.open('GET', '/images/sm_actor/'+hash[0]+'.jpg', false);
            xhr.overrideMimeType('text/plain;charset=x-user-defined');
            xhr.onload = function() {
                if (xhr.readyState == 4){
                    var resp = xhr.responseText;
                    var data = 'data:';
                    data += xhr.getResponseHeader('Content-Type');
                    data += ';base64,';

                    var decodedResp = '';
                    for(var i = 0, L = resp.length; i < L; ++i) {
                        decodedResp += String.fromCharCode(resp.charCodeAt(i) & 255);
                    }

                    data += btoa(decodedResp);
                    
                    if (typeof window.chrome == 'undefined')
                        window.parent.postMessage(hash[1]+"|"+data, "http://www.kinopoisk.ru/");
                    else {
                        var scr = document.createElement("script");
                        scr.setAttribute('type','application/javascript');
                        scr.textContent = "window.parent.postMessage('"+hash[1]+
                            "|"+data+"', 'http://www.kinopoisk.ru/');";
                        document.body.appendChild(scr);
                    }
                }
            };
            xhr.send(null);
            return;
        }

        $("<canvas id='guess_transformed' width=25 height=40></canvas>")
            .appendTo($('img[name="guess_image"]').parent()).hide();
        $('img[name="guess_image"]')
            .bind("load", function(e){
                //for(var i = 0; i < 4; i++)
                    doLoader(0);

                var ctx = $("#guess_transformed")
                            .get(0)
                            .getContext("2d");
                    ctx.drawImage($('img[name="guess_image"]').get(0), 0, 0, 25, 40);
            })
            .css({"border":"1px solid black","margin":"10px 0 10px 0"});
        $("#answer_table").parent().css({"background":"#f60","padding-left":"130px","padding-bottom":"30px"});

        for (var i=0; i<4; ++i){
            $('<div><img class="cheet_image_view" width=50 height=80 \
                src="http://st.kinopoisk.ru/images/users/user-no-big.gif" /> \
                <canvas class="cheet_image" width=25 height=40 ></canvas></div>')
                .css({"margin-top":"8px"})
                .appendTo("#a_win\\["+i+"\\]");
            

            // результат сравнения
            $("<input type=hidden class='cheet_diff' value='0' />")
                .appendTo($('img[name="guess_image"]').parent());

            // при клике на каждую кнопку
            $("#a_win\\["+i+"\\]").bind("click", function(e) {
                var cheetd = $(".cheet_diff");
                for (var j=0; j<4; ++j) {
                    // херим предыдущее значение
                    cheetd.eq(j).val(0);
                    
                    //$('#timer_all').val(0);
                }
            })
        }
        
        $(".cheet_image").hide();
        
        // автоклик
        $(document).bind("cheetcompare", function(e){
            var max = 0;
            var cheetd = $(".cheet_diff");
            for(var i = 0; i < 4; i++) {
                max = (parseInt(cheetd.eq(max).val()) > parseInt(cheetd.eq(i).val())) ? max : i;
            }
                if (cheetd.eq(max).val() > 90)
                    $("#a_win\\["+max+"\\]").trigger("click");
                else
                    alert("Help!!!");
        });
    }

    function doMessage(e) {
        var data = e.data.split("|", 2);
        var img = new Image(data[1]);
        img.onload = function() {
            // draw
            var i = parseInt(data[0]);
            var ctx = $(".cheet_image").eq(i).get(0).getContext('2d');
            ctx.drawImage(img, 0, 0, 25, 40);
    
            if (i < 3)
                doLoader(i + 1);
            
            // compare
            var diff = doValuation(doDiff(ctx));
            var oldhtml = $("#win_text\\["+i+"\\]").html();
            $("#win_text\\["+i+"\\]").html(oldhtml+" ("+diff+"%)");
    
            $(".cheet_frame").eq(i).remove();	
            $(".cheet_diff").eq(i).val(diff);			
            $(".cheet_image_view").eq(i).attr("src", img.src);
            
            if (i == 3)
                $(document).trigger("cheetcompare");
        };
        img.src = data[1];
    }

    function doLoader(index) {
        $.getJSON(
            "/handler_search_people.php",
            {
                q: $("#win_text\\["+index+"\\]").html()
            },
            function(data){
                $("<iframe src='http://st.kinopoisk.ru/#"+
                    data[0].id+"|"+index+"' class='cheet_frame'></iframe>")
                .hide()
                .appendTo("body");
            }
        );
    }
    
    function doDiff(context) {
    
        var all_pixels = 25*40*4;
        var changed_pixels = 0;
    
        var first_data = context.getImageData(0, 0, 25, 40);
        var first_pixel_array = first_data.data;
    
        var second_ctx = $("#guess_transformed").get(0).getContext('2d');
        var second_data = second_ctx.getImageData(0, 0, 25, 40);
        var second_pixel_array = second_data.data;
    
        for(var i = 0; i < all_pixels; i+=4) {
    
            if (first_pixel_array[ i ] != second_pixel_array[ i ] ||	// R
                first_pixel_array[i+1] != second_pixel_array[i+1] ||	// G
                first_pixel_array[i+2] != second_pixel_array[i+2])		// B
                {
                    changed_pixels+=Math.sqrt(
                        Math.pow( first_pixel_array[ i ] - second_pixel_array[ i ] , 2) +
                        Math.pow( first_pixel_array[i+1] - second_pixel_array[i+1] , 2) +
                        Math.pow( first_pixel_array[i+2] - second_pixel_array[i+2] , 2)
                    ) / 255*Math.sqrt(3);
                }
        }
        return 100 - Math.round(changed_pixels / all_pixels * 100);
    }
    
    function doValuation(value) {
        return Math.round((value - 55) / 38 * 100);
    }
    
    window.addEventListener('DOMContentLoaded', doMain, false);
    window.addEventListener("message", doMessage, false);
})();
