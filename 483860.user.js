// ==UserScript==
// @name PrivéPlusPlus
// @namespace Forum
// @author Odul
// @date 03/12/2013
// @version 1.0
// @license WTF Public License; http://en.wikipedia.org/wiki/WTF_Public_License
// @include http://www.dreadcast.net/Forum/1-22-forum-prive*
// @compat Firefox, Chrome
// ==/UserScript==

function isOnOrOff(node) {      
    if(typeof localStorage!='undefined') {
        var cat = localStorage.getItem("cat"+node.id);
        if(cat==null || cat != "on") 
        {
           $('#'+node.id+' #smoins').css('display', 'block');
           $('#'+node.id+' #splus').css('display', 'none');
           
            return;
        }
    }
        
    $('#'+node.id+' a').toggle(); 
    $('#'+node.id+' #smoins').css('display', 'none');
    $('#'+node.id+' #splus').css('display', 'block');
}

function addClickEvent(node) {
   	node.children[0].onclick = function(){
   	    $('#'+node.id+' a').toggle(); 
   	    $('#'+node.id+' .symbol').toggle(); 
   	    
        if(typeof localStorage!='undefined') {
           var cat = localStorage.getItem("cat"+node.id);
           if(cat!=null && cat == "on") 
           {
               localStorage.setItem('cat'+node.id,'off');     
               return;
           }
       }
        
       localStorage.setItem('cat'+node.id,'on');     
   	};
}

function addClickEventAddTag(node) {
   	node.onclick = function(){
       var saisie = prompt("Saisissez un tag à associer à cet élément :", "Divers")
       
       if(saisie != null)
       {
          var nomOriginal = $('#divOriginalNom_'+node.id.substring(node.id.indexOf('_')+1)).text();
          if(typeof localStorage!='undefined') {
              localStorage.setItem('em'+nomOriginal.toLowerCase(),'['+saisie+']');     
          }
       }
       $('#'+node.id).parent().attr("href",""); //évite que le lien soit activé et recharge la page (ce qui va permettre de prendre en compte la modif)
   	};
}

function addClickEventSupprTag(node) {
   	node.onclick = function(){
       var nomOriginal = $('#divOriginalNom_'+node.id.substring(node.id.indexOf('_')+1)).text();
       localStorage.removeItem('em'+nomOriginal.toLowerCase());     

       $('#'+node.id).parent().attr("href",""); //évite que le lien soit activé et recharge la page (ce qui va permettre de prendre en compte la modif)
   	};
}

function addClickEventDisplayAll(node) {
   	node.onclick = function(){       
       
       var all = document.getElementById('liste_sujets');
       all.innerHTML = '';
       
       var allSave = all.innerHTML;
        
       for(var i = 1; i<1000; i++)
       {
           console.log(i);
          myRequest = new XMLHttpRequest();
          var url = "http://www.dreadcast.net/Forum/1-22-forum-prive?"+i;
          askPage(url);
    
          if (allSave == all.innerHTML)
              break;
           allSave = all.innerHTML;
           
       }
        
              createCategoriesAndSort(); 
   	};
}

var myRequest = new XMLHttpRequest();

function askPage(url) {
     myRequest.open("GET", url, false);
     myRequest.onreadystatechange = getPage;
     myRequest.setRequestHeader("Cache-Control", "no-cache");
     myRequest.send(null);
}

function getPage() {
    if(myRequest.readyState == 4) {
       if(myRequest.status == 200) {
          result = myRequest.responseText;
          
          if ($(result).find('#liste_sujets').length) {
              var content = $(result).find('#liste_sujets').xml().trim();
              if(content != "")
              {
                 $('#liste_sujets').html($('#liste_sujets').html() + $(result).find('#liste_sujets').xml()) ;
              }
          }
       } else {
          console.log( " An error has occurred: " + myRequest.statusText);
       }
    }
}

function createCategoriesAndSort()
{
    var all = document.getElementById('liste_sujets');
	var allcopie = document.createElement('div');
	allcopie.id = "copie";
	all.parentNode.appendChild(allcopie);
	$("#copie").html($("#liste_sujets").html());

	all.innerHTML = '';

    var exp = /[a-zA-ZÀ-ÿ0-9 ]/;
	
//récupération des tags	
	var tags = new Array();
	var list = $('#'+allcopie.id+' a');
    
    for (var i = 0; i < list.length; ++i) { //renommage des sujets et ajout bouton tag
    	$('#a'+i).removeClass("type1");
    	list[i].id = 'a'+i;
        
        var t = document.createElement('div');
        t.id = 'tag_a'+i;
        list[i].appendChild(t);
	    
        $('#tag_a'+i).text("+");
        $('#tag_a'+i).css('position','absolute').css('left','0px').css('top','2px').css('border','1px solid').css('font-size','10px');
        
        addClickEventAddTag(t);
        
        var nom = $('#a'+i+' h3 .nom_sujet').text();
        
        var divOriginalNom = document.createElement('div');
        divOriginalNom.id = 'divOriginalNom_a'+i;
        list[i].appendChild(divOriginalNom);
        $('#divOriginalNom_a'+i).text(nom);
        $('#divOriginalNom_a'+i).css('display','none');
    }
    
	for (var i = 0; i < list.length; ++i) {
        var nom = $('#a'+i+' h3 .nom_sujet').text();

        if(typeof localStorage!='undefined') {
           var tag = localStorage.getItem("em"+nom.toLowerCase());
           if(tag!=null) {
               nom = tag +" "+nom;
               var t = document.createElement('div');
               t.id = 'tagSuppr_a'+i;
               list[i].appendChild(t);
                
               $('#tagSuppr_a'+i).text(" - ");
               $('#tagSuppr_a'+i).css('position','absolute').css('left','12px').css('top','2px').css('border','1px solid').css('font-size','10px');        
               addClickEventSupprTag(t);           
            }
        }
 
        if(nom.substring(0,1) == "["){
            var tag = nom.substring(1,nom.indexOf(']')).toLowerCase();
            tag = tag.substring(0,1).toUpperCase() + tag.substring(1).trim();
            if(tag.match(exp))
                tags.push(tag);
		}
        else
            tags.push("Divers");
    }
	//tags = tags.sort();
	var uniquesTags = [];
    $.each(tags, function(i, el){
        if($.inArray(el, uniquesTags) === -1) uniquesTags.push(el);
    });
	
	for(var i = 0; i < uniquesTags.length; ++i){//creation des divs
		var tag = document.createElement('div');
		tag.id = uniquesTags[i].replace(/[^a-zA-ZÀ-ÿ0-9]/g, '');

		all.appendChild(tag);
		$("#"+tag.id).html('<div class="link"> <div class="symbol" id="smoins" style="float: left; width: 10px; display: block;">-</div> <div class="symbol" id="splus" style="display:none;float:left;width:10px;">+ </div>'+uniquesTags[i]+"</div>").css("margin-bottom", '25px').css('color', 'rgb(17, 85, 136').css('font-weight','bold');
		addClickEvent(tag);
	}
	
	for (var i = 0; i < list.length; ++i) { //remplissage des divs
    	$('#a'+i).removeClass("type1");
    	
        //list[i].id = 'a'+i;
        var nom = $('#a'+i+' h3 .nom_sujet').text();
            
        if(typeof localStorage!='undefined') {
           var tag = localStorage.getItem("em"+nom.toLowerCase());
           if(tag!=null) 
               nom = tag +" "+nom;
        }
        
		if(nom.substring(0,1) == "[")
		{
            var tag = nom.substring(1,nom.indexOf(']')).toLowerCase();
		    tag = tag.substring(0,1).toUpperCase() + tag.substring(1).trim();
            if(tag.match(exp))
            {
                var nouveauNom = nom.substring(nom.indexOf(']')+1);
                if(nouveauNom.length == 0) nouveauNom = nom;

                while(!nouveauNom.substring(0,1).match(exp) && nouveauNom.substring(0,1) != "[" || nouveauNom.substring(0,1) == " ")
                    nouveauNom = nouveauNom.substring(1);

                $('#a'+i+' h3 .nom_sujet').text(nouveauNom);
                var o = $("#a" + i);
                document.getElementById(tag.replace(/[^a-zA-ZÀ-ÿ0-9]/g, '')).appendChild(o[0]);
     		}
   			else {
            	var o = $("#a" + i);
                document.getElementById('Divers').appendChild(o[0]);
            }
		}
        else {
            var o = $("#a" + i);
            document.getElementById('Divers').appendChild(o[0]);
        }
    }

    for(var i = 0; i < uniquesTags.length; ++i){//creation des divs

    var id = uniquesTags[i].replace(/[^a-zA-ZÀ-ÿ0-9]/g, '');
   	    var tag = $("#"+id)[0];
   	    isOnOrOff(tag);
	}
   	isOnOrOff(divers);
    $("#copie").remove();
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
            
            if($.inArray(nom, json.fp) != -1) 
            {
                var divDisplayAll = document.createElement('div');
                divDisplayAll.id = 'divDisplayAll';
                divDisplayAll.className = "link";
                    
               var headerForum = $('#main_content .forum_description')[0];
               headerForum.appendChild(divDisplayAll);
                $('#divDisplayAll').html("<h3>Afficher tous vos espaces matriciels sur une seule page.</h3> (Attention processus long)");
                $('#divDisplayAll').css('text-decoration','underline').css('text-align','right');        
                addClickEventDisplayAll(divDisplayAll);
                $("#invalid").hide();
 
                var banDiv = document.createElement('img');
                banDiv.id = 'banDiv';
                headerForum.appendChild(banDiv);
                            
                $('#banDiv').css('width','50%').css('left','25%');  
                loadBan();
                            
                createCategoriesAndSort();
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