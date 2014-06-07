// ==UserScript==
// @name           fotologDelComments
// @namespace      http://userscripts.org/scripts/show/3266
// @description    Delete muliple Fotolog.com comments at once
// @include        http://*.fotolog.com*
// ==/UserScript==
//

/*
Version: 0.1
	 
Author:
	Diogo Galvao (diogo86)
	http://fotolog.com/diogo86
	
Changelog:
18-Feb-2006 v0.1:

    * it's not *my*precious* but works :)
    * when the hidden iframe is loaded the script looks for the DIV's guestbook,
      then inserts a checkbox for each Delete link. the Delete Selected button
      uses the hidden iframe to make a request to the Delete Links for each selected
      comment.
    * for this to work we expect it's only necessary to make the request no waiting for
      its response; since it's made consecutively the Fotolog may reject some of the
      requests.
    * if you're lucky and the comments get deleted it may also be necessary to reload the
      page if not all of them dissapear.
      
    * ps: i really don't think it's useful at all - actually it was just made to prove it :)
    
*/

(function() {
    
    try {
	var ifgbook = document.getElementById("ifgbook");
	var gbook = document.getElementById("gbook");
	
	ifgbook.addEventListener('load', function(event) {
	    var paragrafos = gbook.getElementsByTagName("p");
	    var numBoxes = 0;
	    
	    for(i=0; i<paragrafos.length; i++){
		if( paragrafos[i].getAttribute("class") == "delete" && paragrafos[i].getElementsByTagName("input").length <= 0 ){
		    var novaCheckBox = document.createElement("input");
		    novaCheckBox.type = "checkbox";
		    novaCheckBox.value = paragrafos[i].firstChild.getAttribute("href");
		    
		    paragrafos[i].appendChild(novaCheckBox);
		    numBoxes++;
		}
	    }
	    
	    if( document.getElementById("botaoDel") == null && numBoxes > 0){
		var botaoDel = document.createElement("input");
		botaoDel.type = "button";
		botaoDel.value = "Delete selected";
		botaoDel.id = "botaoDel";
		botaoDel.addEventListener("click",function(event){
		    if( confirm("Tem certeza que deseja apagar os selecionados?") == false )
			return false;
		    
		    var delBoxes = gbook.getElementsByTagName("input");
		    for(i=0; i<delBoxes.length; i++){
			if( delBoxes[i].type == "checkbox" && delBoxes[i].checked ){
			    ifgbook.src = delBoxes[i].value;
			}
		    }
		},false);
		gbook.appendChild(botaoDel);
	}
	}, false);
	
    }catch(e){
	//alert("Erro: " + e);
    }
    
})();
