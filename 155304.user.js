// ==UserScript==
// @name        Strims - Tweak
// @namespace   Strims - Tweak
// @include     *strims.pl*
// @grant       GM_getValue
// @grant       GM_setValue
// @version     1.1
// ==/UserScript==
if (typeof $ == 'undefined') {
    if (unsafeWindow.jQuery) {
        var $ = unsafeWindow.jQuery;
        //var localStorage = unsafeWindow.localStorage;
        main();
    } else {
        addJQuery(main);
    }
} else {
    main();
}
function addJQuery(callback) {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
}
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) {
        return;
    }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

function defaultValues()
{
    if(localStorage.tweak_left_column == undefined)
    {
        localStorage.tweak_left_column = "false";
    }
    if(localStorage.tweak_fixed_top == undefined)
    {
        localStorage.tweak_fixed_top = "false";
    }
    if(localStorage.tweak_fixed_footer == undefined)
    {
        localStorage.tweak_fixed_footer = "false";
    }
    if(localStorage.tweak_thumb_open == undefined)
    {
        localStorage.tweak_thumb_open = "false";
    }
    if(localStorage.tweak_youtube_thumb == undefined)
    {
        localStorage.tweak_youtube_thumb = "false";
    }
    if(localStorage.tweak_thumb_size ==undefined)
    {
        localStorage.tweak_thumb_size = '400';
    }
    if(localStorage.tweak_youtube_movie == undefined)
    {
        localStorage.tweak_youtube_movie = '560x315';
    }
    if(localStorage.tweak_youtube_quality == undefined)
    {
        localStorage.tweak_youtube_quality = 'SD';
    }
    
}

function main(){
    $(document).ready(function(){
	
        defaultValues();
		
        if(/ustawienia/igm.test(document.location.pathname))
        {		
            var submitButton = $('#user_options_page form.vertical .form_row:last');
            $('<h3>Strims - Tweak</h3>').insertBefore(submitButton);
			
            $('<div class="form_row small"><div class="form_input"><label><input type="checkbox" class="input_checkbox tweak_checkbox" id="tweak_left_column">Lewa kolumna zawsze widoczna</label></div></div>').insertBefore(submitButton);
            $('<div class="form_row small"><div class="form_input"><label><input type="checkbox" class="input_checkbox tweak_checkbox" id="tweak_fixed_top">Nieruchomy top strony</label></div></div>').insertBefore(submitButton);	
            $('<div class="form_row small"><div class="form_input"><label><input type="checkbox" class="input_checkbox tweak_checkbox" id="tweak_fixed_footer">Nieruchoma stopka strony</label></div></div>').insertBefore(submitButton);	
            $('<div class="form_row small"><div class="form_input"><label><input type="checkbox" class="input_checkbox tweak_checkbox" id="tweak_thumb_open">Automatycznie otwieraj zdjecia w tresci</label></div></div>').insertBefore(submitButton);
            $('<div class="form_row small"><div class="form_input"><label><input type="checkbox" class="input_checkbox tweak_checkbox" id="tweak_youtube_thumb">Pokazuj miniaturki filmu YouTube</label></div></div>').insertBefore(submitButton);
            
            $('<div class="form_row small"><div class="form_input"><label>Maksymalna szerokosc zdjecia w tresci </label>\n\
			<select class="input_select" id="tweak_thumb_size">\n\
					<option value="200">200px</option>\n\
					<option value="300">300px</option>\n\
					<option value="400">400px</option>\n\
					<option value="500">500px</option>\n\
					<option value="600">600px</option>\n\
					<option value="700">700px</option>\n\
				</select>\n\
			</div></div>').insertBefore(submitButton);
            $('<div class="form_row small"><div class="form_input"><label>Rozmiar filmu YouTube w tresci </label>\n\
				<select class="input_select" id="tweak_youtube_movie">\n\
					<option value="560x315">560 x 315</option>\n\
					<option value="640x360">640 x 360</option>\n\
					<option value="853x480">853 x 480</option>\n\
					<option value="1280x720">1280 x 720</option>\n\
				</select>\n\
			</div></div>').insertBefore(submitButton);
            $('<div class="form_row small"><div class="form_input"><label>Jakosc filmu YouTube w tresci </label>\n\
				<select class="input_select" id="tweak_youtube_quality">\n\
					<option value="SD">SD (standardowa)</option>\n\
					<option value="HD">HD (wysoka)</option>\n\
				</select>\n\
			</div></div>').insertBefore(submitButton);
			
            $('#tweak_left_column').attr('checked', localStorage.tweak_left_column == "true");
            $('#tweak_fixed_top').attr('checked', localStorage.tweak_fixed_top == "true");
            $('#tweak_fixed_footer').attr('checked', localStorage.tweak_fixed_footer == "true");
            $('#tweak_thumb_open').attr('checked', localStorage.tweak_thumb_open == "true");
            $('#tweak_youtube_thumb').attr('checked', localStorage.tweak_youtube_thumb == "true");
            $('#tweak_thumb_size').val(localStorage.tweak_thumb_size);
            $('#tweak_youtube_movie').val(localStorage.tweak_youtube_movie);
            $('#tweak_youtube_quality').val(localStorage.tweak_youtube_quality);
			
			
            $('#tweak_left_column').change(function(){
                localStorage.tweak_left_column = $(this).is(':checked');
            })
            $('#tweak_fixed_top').change(function(){
                localStorage.tweak_fixed_top = $(this).is(':checked');
            })
            $('#tweak_fixed_footer').change(function(){
                localStorage.tweak_fixed_footer = $(this).is(':checked');
            })
            $('#tweak_thumb_open').change(function(){
                localStorage.tweak_thumb_open = $(this).is(':checked');
            })
            $('#tweak_youtube_thumb').change(function(){
                localStorage.tweak_youtube_thumb = $(this).is(':checked');
            })
            $('#tweak_thumb_size').change(function(){
                localStorage.tweak_thumb_size = $(this).val()
            })
            $('#tweak_youtube_movie').change(function(){
                localStorage.tweak_youtube_movie = $(this).val()
            })
            $('#tweak_youtube_quality').change(function(){
                localStorage.tweak_youtube_quality = $(this).val()
            })
			
        }
		
			
		
        if(localStorage.tweak_left_column == 'true')
        {
            addGlobalStyle('body #left {display: block !important}');
            //            $('#left').attr('style', 'display: block !important');
            addGlobalStyle('#content  {padding-left: 185px;}');
			
        }else
        {
            if($('#left').is(':visible'))
            {
                var contentPaddingLeft =  '185px';
            }else {
                var contentPaddingLeft =  '0px';
            }
            $('#content').css({
                'padding-left': contentPaddingLeft
            });
            $('#top').css('padding-left', contentPaddingLeft);
		
        }
        
        if(localStorage.tweak_fixed_footer == 'true')
        {
            addGlobalStyle('#footer { background-color: #141414; bottom: 0; position: fixed; width: 100%;');
        }
	
        if(localStorage.tweak_left_column == 'true' && localStorage.tweak_fixed_top == 'false')
        {
            addGlobalStyle('#top { padding-left: 185px');
        }
        
        if(localStorage.tweak_fixed_top == 'true'){
		
            var top = $('#top .template_wrapper').height()+20;
            if($('#logo img').attr('src') == "http://strims.pl/media/images/night/others/logo_main.png")
            {
                addGlobalStyle('#content {margin-top: 70px !important}; ');
                addGlobalStyle('#left { top:  70px !important }');   
            }else{
                $('#logo img').load(function(){
                    var top = $('#top .template_wrapper').height()+20;
                    addGlobalStyle('#left { top:  '+top+'px !important } #content {margin-top: '+top+'px !important}; ');
                })
            }
            
            addGlobalStyle('#top .template_wrapper {max-width: 100% !important;}\n\
				#logo {min-width: 135px !important;}\n\
				#top_bar { position: fixed !important; top: 0 !important;} \n\
				#top {margin-top: 20px !important;  position: fixed !important; width: 100% !important; z-index: 9999 !important; top: 0 !important}');
        }
	
        $('#content').prepend($('#left'));
		
		
        var originalAddClassMethod = $.fn.addClass;
        var originalRemoveClassMethod = $.fn.removeClass;
        $.fn.addClass = function(){
            var result = originalAddClassMethod.apply( this, arguments );
            if(this.is('#left') && arguments[0] == "no_display" && localStorage.tweak_left_column == 'false')
            {
                $('#content').css('padding-left', '0px')
                $('#top').css('padding-left', '0px')
            }
            return result;
        }
	
        $.fn.removeClass = function(){
            var result = originalRemoveClassMethod.apply( this, arguments );
            if(this.is('#left') && arguments[0] == "no_display" && localStorage.tweak_left_column == 'false')
            {
                $('#content').css('padding-left', '185px')
                $('#top').css('padding-left', '185px')
            }
            return result;
        }
	
	
	
    })
}
$('.entry_text a[href$=".jpg"], .entry_text a[href$=".gif"], .entry_text a[href$=".png"], .content_comment_text a[href$=".jpg"], .content_comment_text a[href$=".png"], .content_comment_text a[href$=".gif"]').click(function(e){
    e.preventDefault();
    if(!$(this).next().is('img')){
        $('<img src="' + $(this).attr('href') + '" style="max-width: '+localStorage.tweak_thumb_size+'px; display: none;" />')
        .insertAfter($(this))
        .fadeIn("slow")
        .bind("click", function(e){
            con
            
            $(this).fadeOut("fast").remove();
        }).css('display', 'block');
    }
});

if(localStorage.tweak_thumb_open == 'true')
{
    $('.entry_text a[href$=".jpg"], .entry_text a[href$=".gif"], .entry_text a[href$=".png"], .content_comment_text a[href$=".jpg"], .content_comment_text a[href$=".png"], .content_comment_text a[href$=".gif"]').click();
}
if(localStorage.tweak_youtube_thumb == 'true')
{
    $('.entry_text a[href*="youtu"], .content_comment_text a[href*="youtu"]').each(function(i,e){
        var url = $(this).attr('href');
        if(/youtu.be/.test(url))
        {
            var id = $(this).attr('href').substr(-11);
        }
        else if(/youtube.com\/w/.test(url))
        {
            var id = /v=(\S{11})/img.exec(url)[1];
        }
        if(id != undefined)
        {
            var img = 'http://img.youtube.com/vi/'+id+'/0.jpg';
            var content = $(this).html();
            $(this).html(content+'<img src="'+img+'" class="tweak_youtube" youtubeId="'+id+'" style="max-width: 400px; display: block; cursor: pointer;" />');
        }
    })
}
$('.tweak_youtube').live('click', function(e){
    //e.preventDefault();
    //$(this).prev().click();
    })
$('.entry_text a[href*="youtu"], .content_comment_text a[href*="youtu"]').click(function(e){
    e.preventDefault();
    
    if(!$(this).next().is('iframe'))
    {
        if($(this).find('.tweak_youtube'))
        {
            $(this).find('.tweak_youtube').css('display', 'none');
        }
        var url = $(this).attr('href');
        if(/youtu.be/.test(url))
        {
            var adres = $(this).attr('href').replace('youtu.be/','youtube.com/embed/');
            var id = $(this).attr('href').substr(-11);
        }
        else if(/youtube.com\/w/.test(url))
        {
            var id = /v=(\S{11})/img.exec(url)[1];
            var adres = 'http://www.youtube.com/embed/'+id;
        }
		
        if(localStorage.tweak_youtube_quality == 'HD')
        {
            adres += "?vq=hd720";
        }
	
        $('<iframe width="'+localStorage.tweak_youtube_movie.split('x')[0]+'" style="display: block;" height="'+localStorage.tweak_youtube_movie.split('x')[1]+'" src="'+adres+'" frameborder="0" allowfullscreen  style="display: none;"></iframe><span style="display: block; margin-bottom: 10px;" youtubeId="'+id+'" class="strimsTweakClose">zamknij</span>')
        .insertAfter($(this))
        .fadeIn('slow');
    }
})
$('body').on('click', '.strimsTweakClose', function(){
    $(this).prev().remove();
    if(localStorage.tweak_youtube_thumb == 'true')
    {    
        $(this).prev().find('.tweak_youtube').css('display', 'block');
    }
    $(this).remove();
})





