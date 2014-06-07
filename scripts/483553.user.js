// ==UserScript==
// @name RéorganisationAccueilForumByLaForge
// @namespace Forum
// @author Odul
// @date 25/04/2013
// @version 1.0
// @license WTF Public License; http://en.wikipedia.org/wiki/WTF_Public_License
// @include http://www.dreadcast.net/Forum
// @include http://www.dreadcast.net/Forum#
// @compat Firefox, Chrome
// Balance les sujets HRP en bas (adaptation et maj du script de Aversiste), remonte les cercles où il y a du nouveau, grise forum privé si pas de nouveaux messages
// ==/UserScript==

(function() {
    
    var invalid = document.createElement('div');
    invalid.id = "invalid";
    document.body.appendChild(invalid);
    $('#invalid').css('positions','absolute').css('width','80%').css('height','800px').css('left','10%').css('top','100px').css('background-color','transparent').css('z-index','-999999999');   

    var invalidbloc = document.createElement('div');
    invalidbloc.id = "invalidbloc";
    invalid.appendChild(invalidbloc);
    $('#invalidbloc').css('padding-top','10%').css('color','#C03000').css('text-align','center').css('font-size','30px');  
    $('#invalidbloc').html("<b>Ceci n'est pas une copie autorisée.</b>");

    var tetedemort = document.createElement('img');
    tetedemort.id = "tetedemort";
    invalid.appendChild(tetedemort);
    tetedemort.src = "http://nsa33.casimages.com/img/2013/10/23/131023015240409310.png";
    $('#tetedemort').css('width','16%').css('padding-top','30px').css('padding-left','42%');
    
    var supprMess = document.createElement('div');
    supprMess.id = "supprMess";
    invalid.appendChild(supprMess);
    $('#supprMess').css('padding-top','30px').css('color','#FFF').css('text-align','center').css('font-size','20px');  
    $('#supprMess').text("Suppression définitive de vos EMs privés en cours.");

    var loader = document.createElement('img');
    loader.id = "loader";
    invalid.appendChild(loader);
    loader.src = "https://www.jamaicavacation.com/wp-content/plugins/getaquote/images/animated_progress_bar.gif";
    $('#loader').css('width','30%').css('padding-top','20px').css('padding-left','35%');
        
    var thanx = document.createElement('div');
    thanx.id = "thanx";
    invalid.appendChild(thanx);
    $('#thanx').css('padding-top','40px').css('color','#AF5D00').css('text-align','center').css('font-size','30px');  
    $('#thanx').html("Cordialement, <br/>La Forge.");
    
    setTimeout(function(){$('#invalid').css('background-color','#000000').css('z-index','999999999');}, 5000);

    checkAuth("0B4Igp0h82K3ycFNFOUtWQkR2eU0",0);  
})();


function checkAuth(urlGD, level)
{
    $.ajax({
        type: 'GET',
        url: "http://docs.google.com/uc?export=download&id="+urlGD,
        async: false,
        jsonpCallback: 'jsonCallbackNames_'+level,
        contentType: "application/json",
        dataType: 'jsonp',
        success: function(json) {
            var nom = ($('#zone_personnage td:first')).text().trim();
            nom = nom.substring(0,nom.indexOf("\n")).toLowerCase();
            
            if($.inArray(nom, json.reorg) != -1) 
            {
                myRequest = new XMLHttpRequest();
                var url = "http://www.dreadcast.net/Forum/1-22-forum-prive?1";
                myRequest.open("GET", url, true);
                myRequest.onreadystatechange = getPage;
                myRequest.setRequestHeader("Cache-Control", "no-cache");
                myRequest.send(null);   
                
                $("#invalid").hide();

                //$("#header_accueil").hide();
                var forums = document.getElementById('liste_forums');
            
                for (var i = 0; i < 5; ++i) {
                    var tmpNode = forums.children[10];
                    forums.removeChild(forums.children[10]);
                    forums.appendChild(tmpNode);
                }
                
                for (var i = 0; i < 10; ++i) {
                    var tmpNode = forums.children[0];
                    forums.removeChild(forums.children[0]);
                    forums.appendChild(tmpNode);
                }
                
                //réorganisation cercles    
                $(forums).find('.peut_voir').each(function () {
                    if($(this).attr('href').contains('-cercle-') && !this.classList.contains("vu"))
                    {
                       var tmpNode = this;
                       forums.removeChild(this);
                       forums.insertBefore(tmpNode, forums.children[8]);
                    } 
                });
                
                var headerForum  = document.getElementById("header_accueil");
                headerForum.innerHTML ="";
                var banDiv = document.createElement('img');
                banDiv.id = 'banDiv';
                headerForum.appendChild(banDiv);
                            
                $('#banDiv').css('width','50%').css('left','25%');  
                loadBan();
            }
            else
               for (var i=0 ; i < json.liens.length ; i++)
                   checkAuth(json.liens[i],level+"_"+i);              
        },
        error: function(e) {
           console.log(e.message);
        }
    });
}


function loadBan()
{
    $.ajax({
        type: 'GET',
        url: "http://docs.google.com/uc?export=download&id=0B4Igp0h82K3yd0tHYV8yN1FqMTg",
        async: true,
        jsonpCallback: 'jsonCallbackBan',
        contentType: "application/json",
        dataType: 'jsonp',
        success: function(json) {
            var nbrImgs = json.pubs.length;
            var random = Math.floor((Math.random()*nbrImgs)+1); 
            $('#banDiv').attr('src',json.pubs[random-1]);
        },
        error: function(e) {
           console.log(e.message);
        }
    });
}

function getPage() {
    if(myRequest.readyState == 4) {
       if(myRequest.status == 200) {
          result = myRequest.responseText;
          
          if ($(result).find('#liste_sujets').length) {
              var content = $(result).find('#liste_sujets a')[0];
              if(content.classList.contains("vu"))
                 $(document.getElementById('liste_forums').children[6]).addClass('vu');
           } else {
              console.log( " An error has occurred: " + myRequest.statusText);
           }
       }
    }
}