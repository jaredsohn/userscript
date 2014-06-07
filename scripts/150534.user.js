// ==UserScript==
// @name        Tweaking Tweakers 7
// @namespace   tweakers.net
// @description Make tweakers.net usable again
// @include     http://tweakers.net/*
// @include     http://gathering.tweakers.net/*
// @include     https://secure.tweakers.net/*
// @version     0.1
// @grant       GM_addStyle
// ==/UserScript==

var load,execute,loadAndExecute;load=function(a,b,c){var d;d=document.createElement("script"),d.setAttribute("src",a),b!=null&&d.addEventListener("load",b),c!=null&&d.addEventListener("error",c),document.body.appendChild(d);return d},execute=function(a){var b,c;typeof a=="function"?b="("+a+")();":b=a,c=document.createElement("script"),c.textContent=b,document.body.appendChild(c);return c},loadAndExecute=function(a,b){return load(a,function(){return execute(b)})};
//Laad jQuery (werkt ook in Google Chrome)
loadAndExecute("//ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js", function() {

    //Instellingen 
    var myReactInGebruiker = true; 
    var verbergFPBalk = false; 
    var verbergFPTabs = false; 
    var verbergNotificatieCount = false; 
    var fixForumBreedte = true; 
    var achtergrondKleur = '#fbfbfb'; //Default vanuit Tweakers: #fff
    var fixeerHeaderMetScrollableZoekbalk = true;
    var fixeerTracker = false;
    var topicSearch = true;


    if(typeof(jQuery) != 'undifined') 
    { 
        var innerDiv = $('#userbar').find('div'); 
        var innerUL = $(innerDiv).find('ul'); 
        var contentArea = $('#contentArea'); 
        var layout = $('#layout');
        var top = $('#top');
            
        layout.css('background-color', achtergrondKleur); 

        contentArea.css('background-color', '#FFF'); 
        contentArea.css('padding-left', '10px'); 
        contentArea.css('padding-right', '10px'); 

        if(myReactInGebruiker) 
        {                         
            //MyReact aan account toevoegen 
            $('<li><a href="http://gathering.tweakers.net/forum/myreact">MyReact</a></li>').prependTo('#userbar div ul'); 
        } 
             
        if(verbergFPBalk) 
        { 
            //Verberg balk op FP             
            $('.fpaItem').hide(); 
        }             
             
        if(verbergNotificatieCount) 
        { 
            //New notificaties count verbergen 
            $('#newNotificationsCount').hide(); 
        } 
             
        if(verbergFPTabs) 
        { 
            $('#fp_tabs_container').hide(); 
            contentArea.css('padding-top', '10px'); 
        }
        
        if(fixForumBreedte) 
        { 
            $('#messages, .topic_actions').css('width', 'auto');             
        }
    
        if(fixeerHeaderMetScrollableZoekbalk)
        {
	        //Eerst de DOM manipuleren
	    		//Verwijder huidige searchbar uit #top en plaats deze terug in #layout om te zorgen dat deze scrollable wordt.
        	$('#search').remove();
			$('<div id="searchbox"><div id="searchbar"><div id="search"><a href="http://www.true.nl/page/tweakers" rel="external nofollow" id="true"><img src="http://tweakimg.net/g/if/v3/framework/truelogo.png" width=48 height=25 alt="True logo" title="Hosting & colocation door True"></a><form action="http://tweakers.net/zoeken" id="mainSearch" class="keywordSearch"><input type="text" name="keyword" class="text" value="" placeholder="Zoek in de site" onfocus="this.select()"><input type="submit" class="submit" value="Zoeken"></form></div></div></div>').insertAfter('#top');
			var script   = document.createElement("script");
			script.type  = "text/javascript";
			script.text  = "MainSearchSuggest('sitewide');";
			$('#mainSearch').append(script);
				
			//Geef de oude searchbar border-bottom terug als er gescrolld wordt om te zorgen dat er een duidelijk onderscheidt blijft tussen de header en content 
			$(window).scroll(function () {
			      $("#top div#searchbar").css("border-bottom-color", "#C3C6C6");
			      $("#top div#searchbar").css("border-bottom-width", "1px");
			      $("#top div#searchbar").css("border-bottom-style", "solid");
			});
				
			//Nog even wat CSS injecteren
	           	//Orginele DOM elementen aanpassen
	        top.css('position', 'fixed'); 
	        top.css('z-index', '100'); 
	        top.css('width', '100%'); 
	        top.css('top', '0'); 
	        top.css('border-bottom-width', '0'); 
	        contentArea.css('position', 'relative'); 
	        	//Nieuwe DOM elementen CSS meegeven
	        $('#top div#searchbar').css('height', '25px'); 
	        $('#top div#searchbar').css('border-bottom-width', '0'); 
	        $('#searchbox').css('background-color', '#EDEEEE'); 
	        $('#searchbox').css('padding-top', '35px'); 
	        $("#searchbox").css("border-bottom-color", "#C3C6C6");
			$("#searchbox").css("border-bottom-width", "1px");
			$("#searchbox").css("border-bottom-style", "solid");
        }
    
        if(fixeerTracker)
        {
            var trackerWidth = contentArea.find('.trackerPopup').css('width');
            var trackerBackground = contentArea.find('.trackerPopup').css('background-color');
            var trackerShadow = contentArea.find('.trackerPopup').css('box-shadow');
            
            contentArea.find('.trackerPopup').css('background-color', 'transparent');
            contentArea.find('.trackerPopup').css('box-shadow', '0 0 0');
            contentArea.find('.trackerPopup').css('-webkit-box-shadow', '0 0 0');
            contentArea.find('.trackerPopup').wrapInner('<div class="trackerWrapper">');
            contentArea.find('.trackerPopup div.trackerWrapper').css('position', 'fixed');
            contentArea.find('.trackerPopup div.trackerWrapper').css('width', trackerWidth);
            contentArea.find('.trackerPopup div.trackerWrapper').css('background-color', trackerBackground);
            contentArea.find('.trackerPopup div.trackerWrapper').css('box-shadow', trackerShadow);
            contentArea.find('.trackerPopup div.trackerWrapper').css('-webkit-box-shadow', trackerShadow);
        } else {
            //Als de tracker niet scrollable is moet deze onder de header verdwijnen.
            contentArea.find('.trackerPopup').css('z-index', '99');
        }
        
        if(topicSearch)
        {
            var currentUrl = window.location.hostname;
            var currentLocation = window.location.href.substr(0,50);
            var GOTUrl = 'http://gathering.tweakers.net/forum/list_messages/';
            
            var sidebar = $('div#sidebar'); 
            var topicId = $('input[name="data[topicid]"]'); 
            var searchUrl = 'http://gathering.tweakers.net/forum/list_messages/'+topicId.val();
            
            $('<form action="' + searchUrl + '" id="topicSearch" class="keywordSearch topicSearch"><input type="text" id="keyword" name="data[filter_keywords]" class="text" placeholder="Zoeken in dit topic" onfocus="this.select()"><input type="submit" class="submit" value="Zoeken"></form>').appendTo('#search');
            $('#search form.topicSearch').css('display', 'none');
            
            if(GOTUrl == currentLocation)
            {
                $('#search').prepend('<a href="#" class="searchSwitch topicSearch">&raquo; Zoeken in dit topic</a>');
                $('#search').prepend('<a href="#" class="searchSwitch defaultSearch">&raquo; Standaard zoeken</a>');
                $('#search a.searchSwitch').css('position', 'absolute');
                $('#search a.searchSwitch').css('margin-top', '8px');
                $('#search a.defaultSearch').css('display', 'none');
                
                $('#search a.searchSwitch').click(function(event) {
                    event.preventDefault();
                    
                   	$('#search form').toggle();
                   	$('#search a.searchSwitch').toggle();
                });
            }


        }
    }
});