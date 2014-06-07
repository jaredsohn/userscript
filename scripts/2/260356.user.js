// ==UserScript==
// @name       Better Kicktipp 
// @namespace  http://www.kicktipp.de/
// @version    0.21
// @description  Live Scores and betting for all your leagues at the frontpage of www.kicktipp.de
// @match      http://*.kicktipp.de/
// @copyright  2012+, Manuel Hermenau
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// @require http://ajax.googleapis.com/ajax/libs/jqueryui/1.10.2/jquery-ui.min.js
// ==/UserScript==

var reloadInterval;
var currentIdx;
var content, ligen;

GM_addStyle("				\
    div.bk_liga_titel { 	\
    		margin: 5px		\
    }						\
							\
	div.bk_liga_titel a{	\
		color: black; 		\
    	font-size: 30px;	\
	}						\
	a#reloadBtn {			\
            float:right;    \
    }						\
			\
    span.badge {				\
        display:block;				\
        position:absolute;				\
        top:-0.3em;				\
        left:-0.4em;				\
                        \
        height: 13px;				\
        width: 13px;				\
        line-height: 13px;				\
                    \
        -moz-border-radius: 50%;				\
        border-radius: 50%;				\
                    \
        background-color: #d81a1a;				\
        color: white;				\
        text-align: center;				\
        font-size: 0.7em;				\
        font-family: Arial;				\
    }				\
");

function enableReload(){
 console.log("Enable reload");
 reloadInterval = window.setInterval(function(){
	fillContent(content, ligen);
	}, 60000);   
}

function disableReload(){
    console.log("Disable reload");
    clearInterval(reloadInterval);
}

function createBadge(form){
    console.log("Creating badge");
    var toFill = form.find(':text').filter(function(index){
         return ($(this).val() == "");   
    }).parent().size();
    var tippLink = form.parent().siblings().find("a.tippLink");
	tippLink.find("span.badge").remove();
    
    if(toFill>0){
        //Badge
        tippLink.append('<span class="badge">'+toFill+'</span>');
    }   
}

function fillContent(){
 content.children().remove(); //content   
  var i=0;
    urls=[];
 for(i;i<ligen.length;i++){
        var liga = ligen[i];
        console.log("Fetching "+liga);
        var url = liga+"/tippuebersicht";
        var ligaName = liga[1].toUpperCase()+liga.substr(2); //upercase first
        var container = $('<div/>', {class: "bk_liga", id:"bk_liga_"+ligaName}).appendTo(content); //container
     var titelDiv = $('<div class="bk_liga_titel"><a href="'+liga+'">'+ligaName+'</a></div>');//Titel
     if(i == 0){
        var reloadBtn = $('<a id="reloadBtn"><img src ="http://findicons.com/files/icons/1697/kombine_free_toolbar/32/reload.png" /></a>');
         reloadBtn.click(function(){
         fillContent();});
     	titelDiv.append(reloadBtn);   
     }
       // container.append('<div class="bk_liga_titel"><a href="'+liga+'">'+ligaName+'</a></div>'); 
     container.append(titelDiv);
        container = $('<div/>', {class:"bk_tabs", id:"bk_tabs_"+ligaName}).appendTo(container);
        $('<div/>', {
            class: 'bk_uebersicht',
            id: 'bk_uebersicht_'+ligaName+'-1'
        }).load(url+ " div.kicktipp-content table.kicktipp-table-fixed").appendTo(container); //Tabelle per AJAX holen
        
        container.prepend('<ul><li><a href="#bk_uebersicht_'+ligaName+'-1">Übersicht</a></li><li><a class="tippLink" href="#bk_abgabe_'+ligaName+'-2">Tippen</a></li></ul>');
        
        url=liga+"/tippabgabe";
        var abgabeDiv = $('<div/>', {
            class: 'bk_abgabe',
            id:'bk_abgabe_'+ligaName+'-2'
        });
        urls[abgabeDiv.attr('id')] = url;
        abgabeDiv.load(url+ " form#tippabgabeForm",{},function(){
            //wenn die form geladen ist, bereite sie 
            var form=$(this).find("form#tippabgabeForm");
            
            //add Success message next to the sumit button
             var button = form.find('input[type="submit"]');
            button.hide();
            var msg = $('<span id="'+form.context.id+'_status"><img src="http://www.iconsdb.com/icons/preview/green/check-mark-3-m.png"/> Tipps gespeichert</span>');
            button.parent().append(msg);
            msg.hide();
            var textFields = form.find('input[type="text"]');
            textFields.change(function(){msg.hide(); button.show();});
            textFields.focus(function(){disableReload();});
            textFields.focusout(function(){
                console.log("Focus out, buttons visible = "+$('input[type="submit"]:visible').length);
                if($('input[type="submit"]:visible').length == 0){
                	enableReload();   
                }
            });
            
            createBadge(form);
                       
            var myUrl = urls[form.context.id];
            form.attr("action", myUrl); 
            console.log(form);
            /* attach a submit handler to the form */
			form.submit(function(event) {
              var form=$(this);
              /* stop form from submitting normally */
              event.preventDefault();
             
                var data = {};
                form.find("input").each(function(){data[$(this).attr('name')] = $(this).val();});
                console.log(data);
              /* Send the data using post */
              var posting = $.post( form.attr('action'), data );
              
              /* Hide the Submit button, show success message */
              posting.done(function( data ) {
                  button.hide(); msg.show(); enableReload(); createBadge(form);
              });
             
});
        }).appendTo(container); //Tippabgabe per AJAX holen
        container.tabs({
            activate: function(event, ui) {
                var myIdx = $("div.bk_tabs").index($(this));
                var newIdx = $(this).tabs('option', 'active');
                console.log("Change idx["+myIdx+"]="+newIdx);
                
            	currentIdx[myIdx] = newIdx;
            },
            active : currentIdx[i]
        });
      console.log("idx["+i+"]="+currentIdx[i]);
        
    }
    //$(".bk_tabs").tabs();
    console.log(urls);   
}

// the guts of this userscript
function main() {
   
    console.log("Better Kicktipp...");
    content = $("div.kicktipp-content");
    
    var elements = content.children();
    var ligaList = $($(elements[1]).children()[0]); //container für meine ligen
    
    ligen = [];
    ligaList.find("a").each(function(index){ligen[index] = $(this).text().replace("www.kicktipp.de","");}); //urls der Ligen einsammeln
    
    console.log("ligen: "+ligen);
    currentIdx = new Array(ligen.length);
    var i=0;
    for(i;i<currentIdx.length;i++){
    	currentIdx[i] =0;   
    }
    
    fillContent();
    
    enableReload();
    
}

main();
