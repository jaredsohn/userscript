// ==UserScript==
// @name           Image suivante Ebay motor
// @namespace      *.automobile.fr
// @description    Passe les annonces ebay automobile de section image en section image 
// ==/UserScript==


(function () {

  // Set an attribute from all occurences of elements to a specified value.
    // The previous value of this attribute is discarded.
    // (All occurences of this elements are processed.)
    //
    // Example: Set with to 80 columns on all texteareas:
    //          setAttributeOfElement('cols',80,"//textarea")
    function setAttributeOfElement(attributeName,attributeValue,ElementXpath)
    {
        var alltags = document.evaluate(ElementXpath,document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
        for (i=0; i<alltags.snapshotLength; i++)
        {
           alltags.snapshotItem(i).setAttribute(attributeName, attributeValue);
	    }
    }    
      

    // Replace an attribute from all occurences of elements to a specified regular expression.
    // The previous value of this attribute is modified.
    // (All occurences of this elements are processed.)
    //
    // Example: replace with 4* previous 8* value columns on all texteareas:
    //          setAttributeOfElement('cols',"//textarea","8(.)","4%1")
    function replaceAttributeOfElement(attributeName,ElementXpath,regexp,repregexp)
    {
      
        var alltags = document.evaluate(ElementXpath,document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
        for (i=0; i<alltags.snapshotLength; i++)
        {
	      var thiselem = alltags.snapshotItem(i).getAttribute(attributeName);
          thiselem=thiselem.replace(regexp,repregexp);
          alltags.snapshotItem(i).setAttribute(attributeName, thiselem);
	    }
    }    

    // Replace an element from all occurences of elements to a specified regular expression.
    // The previous value of this element is modified.
    // (All occurences of this elements are processed.)
    //
    // Example: replace with abc previous cde text on all texteareas:
    //          setAttributeOfElement('cols',"//textarea","cde","abc")
    function replaceElement(ElementXpath,regexp,repregexp)
    {
      
        var alltags = document.evaluate(ElementXpath,document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
        for (i=0; i<alltags.snapshotLength; i++)
        {
	      var thiselem = alltags.snapshotItem(i).innerHTML;
		  //alert(thiselem);
          thiselem=thiselem.replace(regexp,repregexp);
		  // alert(thiselem);
          alltags.snapshotItem(i).innerHTML=thiselem;
	    }
    }   
 
     // Show element from all occurences of elements to a specified regular expression.
    // The previous value of this element is not modified.
    // (All occurences of this elements are processed.)
    //
    function showElement(ElementXpath,regexp,repregexp)
    {
     
      var alltags = document.evaluate(ElementXpath,document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
      for (i=0; i<alltags.snapshotLength; i++)
      {
	    var thiselem = alltags.snapshotItem(i).innerHTML;
		alert(thiselem);
	  }
    }    


 

  
 //permet de se balader de page photo en page photo
 replaceAttributeOfElement('href',"//div[@class='nextPage']/a",'&customerIdsAsString','&tabNumber=2&customerIdsAsString');
 //Ancienne version
 replaceAttributeOfElement('src',"//div[@class='col-thumbnails thumbnails']/div/a/img",'14\.JPG','27.JPG');
 //remplace l'affichage de la miniature par l'affichage complet
 replaceAttributeOfElement('src',"//div[@class='col-thumbnails thumbnails']/ul/li//a/img",'14\.JPG','19.JPG');
 //met les images les unes en dessous des autres
 replaceAttributeOfElement('class',"//div[@class='col-thumbnails thumbnails']",'col-thumbnails thumbnails','colsimple');
 // vire le menu Revendeur qui apparait au dessus du lien véhicule suivant par erreur
 replaceAttributeOfElement('href',"//li[@class='menu-top-dealers']/a",'.*','');
 replaceElement("//div[@class='sub' and contains(.,'Inscription')]",/.*/g,'');
 //remplace l'affichage de la miniature par l'affichage complet en mode recherche
 replaceAttributeOfElement('src',"//span[@class='image-wrap']/img",'23\.JPG','19.JPG');
 replaceAttributeOfElement('src',"//span[@class='image-wrap']/img",'14\.JPG','19.JPG');
 replaceAttributeOfElement('class',"//span[@class='image-wrap']",'image-wrap','jdjkl');
 
 //showElement("//li[@class='menu-top-dealers']following::div[@class='sub']");

})();


