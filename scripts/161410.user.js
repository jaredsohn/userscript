// ==UserScript==
// @name        InfoTerre - Export Geojson des annotations
// @namespace   http://infoterre.brgm.fr
// @description Sur le site InfoTerre du BRGM, l'export par défaut est avec une notation XML (gml a priori) pas très utilisable, nous vous proposons un export GeoJson plus pratique.
Pour cela, nous ajoutons un bouton puis manipulons les objets géographiques
// @include     http://infoterre.brgm.fr/*
// @grant       none
// @version     1
// ==/UserScript==

// Quand on a fini de charger la page, on ajoute un bouton
window.addEventListener("load", function(e) {
  addButton();
}, false);
 
function addButton(){
    //Bouton cible
    var target = document.getElementById('menu');
    //Création d'une div
    var zNode       = document.createElement ('div');
    //Remplissage de la div avec un input et son titre (on met un id pour prevoir l'ajout d'un listener)
    zNode.innerHTML = '<input id="greasemonkeyButton" type="button" value="Export en GeoJson" />';
    //Ajout du bouton à la cible
    target.appendChild(zNode);
    //Ajout d'un listener
    addButtonListener();
}
 
function addButtonListener(){
    var button = document.getElementById("greasemonkeyButton");
    button.addEventListener('click',doMonkey,true);
}
 
function doMonkey(){
	//do something
    // Recupère l'objet de l'application pour recuperer geometries et attributs
    var arrayFeatureVector = [];
    var listAnnotation = application.annotation.ListManager.annotationList;
    for (var i = 0; i < listAnnotation.length; i++) {
        // Recupère l'objet de l'application pour recuperer geometries et attributs
        var featureVector = new OpenLayers.Feature.Vector(OpenLayers.Geometry.fromWKT(listAnnotation[i].wkt), {title: listAnnotation[i].title} );
        arrayFeatureVector.push(featureVector);
    }


    if (arrayFeatureVector.length == 0) {
        alert("Aucune annotation à exporter");
        return;
    }
    
    var geoJSON = new OpenLayers.Format.GeoJSON();
    var geoJSONText = geoJSON.write(arrayFeatureVector);
    
    var cleanGeoJson = geoJSONText.replace(/\\/g, '').replace(/\"\[/g, '[').replace(/]\"/g, ']');
    
    console.log(cleanGeoJson);
    
    //Permet de copier la chaine dans le presse-papier
    //copy(cleanGeoJson);
    
    // Copier/coller dans un fichier
    //Après un coup d'ogr2ogr et c'est fini
    // Les unités sont dans la projection obtenable via
    console.log(application.map.olmap.getProjection());
}