// ==UserScript==
// @name           The-West Gardrop
// @namespace      http://www.the-west.org
// @include        http://*.the-west.*/game.php*
// @include        http://zz1w1.tw.innogames.net/game.php*
// @translator     JohnCooper
// @version        1.30
// ==/UserScript==

// Created by Puli and partly modified by Muche

"use strict";

var wardrobe_text={en:'Wardrobe', tr:'Gardrop', cz:'Skříň'};
var new_name_text={en:'New name', tr:'Yeni Ekle', cz:'Nový název'};
var cancel_button_text={en:'Cancel', tr:'İptal', cz:'Zrušit'};
var delete_button_text={en:'Delete', tr:'Sil', cz:'Smazat'};
var save_button_text={en:'Save', tr:'Kaydet', cz:'Uložit'};
var save_message_text={en:'Wardrobe is saved', tr:'Gardrop Kaydedildi', cz:'Skříň byla uložena'};
var confirm_delete_text={
	en:'Do you realy want to delete wardrobe ',
	tr:'silmek istediğinizden emin misiniz? ',
	cz:'Skutečně chceš vymazat oblečení pod názvem '
};
var confirm_overwrite_text={
	en:'Do you realy want to overwrite wardrobe ',
	tr:'üzerine kaydetmek istediğinizden emin misiniz? ',
	cz:'Skutečně chceš přepsat oblečení pod názvem '
};
var save_choose_name_error_text={
	en:'You must pick "New name" or one existing wardrobe!',
	tr:'"Yeni Ekle" ya da mevcut bir Gardrop seçmelisiniz!',
	cz:'Musíš nejdřív vybrat položku "Nový název" nebo už existující položku!'
};
var save_invalid_name_error_text={
	en:'Wardrobe name contains invalid characters!',
	tr:'Gardrop ismi geçersiz karakterler içeriyor!',
	cz:'Název oblečení obsahuje neplatné znaky!'
};
var delete_choose_name_error_text={
	en:'You must pick existing wardrobe!',
	tr:'Mevcut bir Gardrop seçmelisiniz!',
	cz:'Musíš nejdřív vybrat položku!'
};

var maxRetry=3;
var retryPeriod=300;
var gQueue = [];
var gQueueIndex = 0;
var gQueueTimer = 0;
var gQueueHPChange = [];

var gLocation = window.location.href;
var gArmorInputType = 'drop';
var gInputElement = null;

var menuButtonImg='Qk22JQAAAAAAADYAAAAoAAAAfwAAABkAAAABABgAAAAAAIAlAAAAAAAAAAAAAAAAAAAAAAAAIyw+\nHyg6GCAuFRokFRokFRokFRokFRokFRokFRokFRokFRokFRokFRokFRokFRokFRokFRokFRokFRok\nFRokFRokFRokFRokGCAuHSM2HSM2GyI0GyI0GyI0HSM2HSM2HSM2HSM2HSM2HSM2GyI0HSM2HSM2\nHSM2GyI0HSM2HSM2GyI0GyI0GyI0HSM2HSM2HSM2HSM2HSM2HSM2GyI0GyI0HSM2HSM2GyI0GyI0\nGyI0HSM2HSM2HSM2HSM2HSM2HSM2GyI0GyI0HSM2HSM2HSM2GyI0GyI0GyI0HSM2HSM2HSM2GyI0\nHSM2HSM2HSM2HSM2HSM2HSM2HSM2HSM2HSM2HSM2HSM2HSM2HSM2HSM2GyI0HSM2HSM2HSM2HSM2\nHSM2HSM2HSM2HSM2GR4wGR4wFhwtFhwtGR4wGyAyGh8xGR4wGyAxGyAyGyEzGyAxGyAyGyEzHCEy\nGyAxGh8xGh8xHCE0HCE0Gh8xHCE0GyI0HSM2GyAyGyAyHCE0AAAAIyw+GCAuGCAuGyQ1FRwpFRok\nFRokFRokCg0TCg0TGCAuCg0TGCAuGyQ1FRokJjNKCg0THyk/FRwpHyg6FRwpIi1EIyw+JjNKFRok\nRmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0\nRmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0\nRmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0\nRmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0\nRmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0\nRmF0RmF0RmF0RmF0RmF0RmF0RmF0AAAAIyw+Ii1E3eLh3OHh29/g2t/e2d3erK+vHBgYGxYYExAR\nDwwNKSkpEQ4PFRETGRUWGxcXc3N03ODh3eHi3uLj3uLj3uLjIi1EFRokRmF0KjdJNkpbOk5fKjdJ\nRmF0MUFTIis9Iis9Iis9Iis9Iis9Iis9Iyw+Iis9Iyw+Iis9Iis9Iyw+Iyw+Iis9Iis9Iis9Iis9\nIis9Iyw+Iis9Iyw+Iis9Iis9Iis9Iyw+Iyw+Iis9Iis9Iis9Iis9Iis9Iyw+Iis9Iyw+Iis9ICo8\nIis9Iis9Iyw+Iyw+Iis9Iis9Iis9Iyw+Iyw+Iis9Iis9Iis9Iyw+Iis9ICo8Iis9Iis9Iis9Iyw+\nIis9ICo8Iis9Iis9Iyw+Iis9Iis9Iis9Iyw+Iis9ICo8Iis9Iis9GiAyGiAyGyAxGyAxGyAyGyAy\nGR4wGR4wGB0wFx0vGh8xGh8xGh8xGR4wGR4wGR4wGB0uGh8xGh8xGyAyMUFTRmF0KjdJOk5fNkpb\nKjdJRmF0AAAAIyw+Hyk/3uPi3uLi3OHh29/g2t/eiImIFhQVFRMUFRQVFRQVFRMUFhQVFRQVFBIU\nExETWltc3eHi3+Pk3+Pk3+Pk3+PkGyQ1FRokRmF0Ok5fGyAxHyY4NkpbMUFTHSM2Gh8xGh8xGh8x\nGyAxGiAyGiAyGyAxGyAxGyAyGR4wGB0wFx0vGh8xGh8xGh8xGR4wGR4wGR4wGB0uGh8xGyAzGyAz\nGR4wGB0wFx0vGh8xGh8xGh8xGR4wGR4wGR4wGB0uGh8xGyAzGyAzGyAxGyAxHCE0GyAxGh8xGyAy\nGh8yGR4wGR4wGh8xGh8xGh8xGiAyGiAyGiAzGiAyGh8xGiAyGiAyGiAyGiAzGiAyGh8xGiAyGh8x\nGh8xGh8xGiAyGiAyGiAzFx0vFx0vFx0vGh8xGh8xFx0vFhwtFhwtFx0vGB0wGR4wGh8xGR4wGh8x\nGh8xGh8xGh8xGiAzHCE0GyAzGyAzGyAzHCE0HSM2MUFTNkpbHyY4HCEyOk5fRmF0AAAAIyw+Cg0T\n3uPi3uPi3eLh3OHh2t7eIB8gFhQWFRMVGBYYGBYYGBUXGBYYFxQXFhMWFhQWFxca19vc3+Pk3+Pk\n3+Pk3+PkGCAuFRokRmF0Ok5fGB0uOk5fKjdJGyAxGyAxGR4wGR4wGyAxGyAxGh8xGh8xFx0vFhwt\nFhwtGR4wGh8xGR4wGh8xGh8xGh8xGh8xGiAzHCE0GyAzGyAzGyEzGyAxGR4wGh8xGR4wGh8xGh8x\nGh8xGh8xGiAzHCE0GyAzGyAzGyEzGyAxGyEzGyEzGh8xGR4wGyAxGyAyGyAxGyAxHCEyEhgqFBos\nFhwtFhwtFBosFhwtGiAyGiAyGh8xFhwtFBosFhwtGiAyGiAyGh8xEhgqFBosFhwtFhwtFBosFhwt\nGiAyGiAyGh8xGh8xGR4wFx0vFx0vFx0vGh8xGh8yGR4wFx0vGB0uFx0vGR4wGR4wGR4wGh8xGh8x\nGyAxGh8yGh8yFx0vGyAxGyAyKjdJOk5fGh8xOk5fRmF0AAAAIyw+Cg0T3+Pi3uPi3uPi3eHi3ODg\nNzc4FhQWFhQVGhgZGBYYFxUXGBUYFhQXFhQWFhQWHx8h3+Pk4OTk4OTk3+Pk3+PkJjNKFRokRmF0\nKjdJMUFTHyY4Ok5fGh8yGR4wGyAyGyEzGh8xGyAzGh8xGR4wFx0vFx0vFx0vGR4wFx0vGB0uFx0v\nGR4wGR4wGR4wGh8xGh8xGyAxGh8yGyAxGh8xGR4wGR4wGR4wGR4wGh8xGh8xGyAxGh8yGyAxGh8x\nGyAyGh8xGyAyHCE0Gh8xGh8xGh8xGh8xGh8xGyAxGyAyGh8xGh8yGB4yFhwtFhwtGh8xGB0wGh8y\nGB4yFhwtFhwtGh8xGB0wGyAxGyAyGh8xGh8yGB4yFhwtFhwtGh8xGB0wGh8yGh8yGR4wGh8xGh8x\nGiAyGiAyGh8xGh8xGiAyGyEzGiAzGh8xGR4wGiAyGyEzGiAzGiAyGR4wGh8xGiAyGiAyGR4wGR4w\nGyAyOk5fHyY4MUFTKjdJRmF0AAAAIyw+Cg0T3+Tj3+Tj3uPi3eLi3OHhUFFSFhQWFRMWGRgZGBcY\nFxYXFxYYFxUXFhQXFRQWNDQ23+Pk4OTk4OTk4OTk3+PkGCAuFRokRmF0RmF0Ok5fGh8xGR4wGh8x\nGyAzGyEzHCE0Fx0vGB0uGR4wGh8xGiAyGiAyGh8xGyEzGiAzGh8xGR4wGiAyGyEzGiAzGiAyGR4w\nFx0vFx0vGh8xGh8xGR4wGyAzGyAyGh8xGyAxGyAzGyAyGh8xGh8xGh8xHCEyGyAyGR4wGyAzGyAy\nGyAyHCEyGh8xGh8xGh8xGh8xGyAxGyAxGyAxGyAxGyAxGh8xGyAxGyAxGyAxGyAxGyAxGh8xGh8x\nGh8xGh8xGyAxGyAxGyAxGyAxGyAxGyEzGyEzGyEzGyAxGyAyGh8xGiAyGiA0Gh8xGR4wGh8xGh8x\nGR4wGh8xGiAyGiAyGh8xGh8xGh8xGh8xGh8xGiAyGiAyGh8xGh8xGyAzGh8xGR4wGR4wOk5fRmF0\nRmF0AAAAIyw+Cg0T3+Pj3+Tj3uPj3eLi3eHicHJzFhQWFRMVGhgZGBcYGBYYGBYYFxUYFhQWFRQW\nTU5Q3+Pk4OTk4OTk4OTk3+PkHyg6FRokRmF0KjdJHSM2GyEzGyEzGyAxGyEyGR4wGh8xFhwtGyAz\nGiAyGiAyGh8yGh8yGR4wGR4wGh8xGiAyGiAyGh8xGh8xGR4wGR4wGyAxFhwtFx0vGh8xGyAxHCE0\nGyAzGyAyGyAyHCEyGh8xGh8xGh8xGh8xGyAxGyAxGyAxGyAxGyAyGB0uFBosFhwtGR4wGyAxHCEy\nGyAyGyAzGyAxGyAzHCE0GyAyGh8xGh8xGR4wGyAzHCE0GyAyGh8xGh8xGR4wGyAyGyAzGyAxGyAz\nHCE0GyAyGh8xGh8xGR4wGh8xGyAyGyEzGyAyHCE0GyAxGB0uFhwtGyEzGiAyGR4wGh8yGh8xGR4w\nGR4wGiAyGyEzGiAyGiAyGh8xGyEzGiAyGyEyGyAxGyEzHCE0GyI0KjdJRmF0AAAAIyw+Cg0T3+Tj\n3+Tj3+Pj3uLi3eHikpSVFhQWFRMWIR8eGBcYGRcYGBYYHBocFRQXFRQWYGJj3+Pk4OTk4OXk4OTk\n3+PkHyg6GCAuRmF0HCE0Gh8xGh8xGh8xGR4wFhwtFx0vGyAyHCE0GyAzGiAyGiAyGiAyGiAzGiAy\nGiAyGR4wGh8yGh8xGR4wGh8xGyAxGyAxGh8xHCE0HCE0HCE0HCEyGyAxGyAyGB0uFBosFhwtGR4w\nGyAxHCEyGyAyGyAzGyAxGyAzHCE0GyAyGh8xGh8xGR4wGyAzHCE0GyAyGh8xGh8xGR4wGyAyGyAz\nGyAxGyAzHCE0GyAyGh8xGh8xGR4wGh8xGyAyGyEzGyAyGyAyHCEyGyAxGyAxFhwtFx0vGyAyHCE0\nFhwtGyAxGyAzGyEzGR4wHCEyGyAxGyAzFhwtFx0vGR4wGh8xGiAyGiAyGh8xFhwtFBosExkrEhgq\nExkrFBosExkrEhgqExkrFBosHCEyFx0vHis+RmF0AAAAIyw+Cg0T3+Tj3+Tj3+Tj3uPj3uLimp2d\nFRQWFRMWGRgZGRgZGhgZGRcYGBYYFhUXFBMWWFpa3uLj4OTk4OTk4OTk3+PkJjNKHyg6RmF0GyAx\nGR4wGh8xGyAxGyAxGyAxGyAzGyEzGiAyGyAyGyEzGyEzGyEzGiAyGSAyFx0vGR4wGh8xGiAyGiAy\nGh8xGh8xGR4wFx0vGR4wGR4wGyAxGyAyGyAyGyAyHCE0GyAzGyEzGh8xGyAzGyAyGyAyHCEyGh8x\nGh8xGh8xGh8xGyAxGyAxGyAxGyAxGyAxGh8xGyAxGyAxGyAxGyAxGyAxGh8xGh8xGh8xGh8xGyAx\nGyAxGyAxGyAxGyAxGyEzGyEzGyEzGyAxGyAyGh8xGh8xHCEyGyAyGR4wGR4wGh8xGyAyGyAyHCEy\nGyAxGyAxGyAzGh8xGyEzGiAzGyEzGyEzGiAyGh8yGh8yGB4yGB4yGB4yGiAyGB4yGB4yGB4yGiAy\nGyAzHCEyGh8yHis+RmF0AAAAIyw+FRok3+Tj3+Tk3+Tj2+DfcXNzQEJIFxUXFxUXGhgaGRgZGRcZ\nGBcYGBcYFxYYFhQXQUJFTlBQztLS4OTk4OTk3+PkPVRmIyw+RmF0GB0uGyAxGyAyGh8xGyAyGh8x\nGyAyGyAyGyAxFhwtGiA0GiAzGiAyGiAyGiAzGyEzGiAzGyEzGyEzGiAyGh8xGyAxHCE0HCE0GyAx\nGyAxGh8xGh8xFhwtFhwtGyAzFx0vGB0uGh8xGyAyGB0uFBosFhwtGR4wGyAxHCEyGyAyGyAzGyAx\nGyAzHCE0GyAyGh8xGh8xGR4wGyAzHCE0GyAyGh8xGh8xGR4wGyAyGyAzGyAxGyAzHCE0GyAyGh8x\nGh8xGR4wGh8xGyAyGyEzGyAxGyAxGyAxGyAxGyAxGyEzGyEzGyEzGyAxGyAyGh8xGyAyFhwtGiAy\nGiAyGiAyGyAyGyEzGyEyGiAyGiAyGyAzGyAzGyAyGiAyGyAzGyAzGyAyGh8xHCEyGyAxHis+RmF0\nAAAAIyw+PVRm3+Tj4OXk3uLhVFVVFhUXOTtAHBobGBYYGxkaGhkaGRcYGBcYGhgZGBcYGBcZKCgp\nFxUYMTEzw8fG3+Tk3+PkPVRmIyw+RmF0GyAzGR4wGh8xGh8xGyAyGyEzGyEzGyEzGh8xHCE0Fhwt\nFBosFx0vGh8yGyAzGiAyGiAyGiAyGh8xGR4wGR4wGyAxGyAyGyAyGh8xGR4wFx0vGR4wGiAyGyAz\nGR4wGB0uFhwtFhwtFx0vGR4wGh8xGh8xGR4wFx0vGR4wGiAyGyAzGyAzGyAyGyAyGB0uFBosFhwt\nGR4wGyAxHCEyGyAyGyAzGyAxGyAzHCE0GyAyGh8xGh8xGR4wGyAzHCE0GyAyGh8xGh8xGR4wGyAy\nGyAzGyAxGyAzHCE0GyAyGh8xGh8xGR4wGh8xGyAyGyEzGyEzGyAzGyAzGyEzHCE0GyAyGyAyGyEz\nGiA0HCE0HCE0GyAzGR4wGh8xHCE0GyAzGR4wGh8xHCEyFx0vHis+RmF0AAAAIyw+Qlpr4OXk4OXk\ncnR0FhQXFxYYGBcZHx4gGBYYIR8fGhkaGRcYGRcZGxobGBcZGRcZGhkbGBYZFhQYLS4wys3O3+Pk\nQlprIyw+RmF0HCE0ExkrFhwtGiAyGiA0Gh8xFx0vGh8xGyEyFhwtHSM2HCE0HCE0HCE0GyI0GyAz\nGyEzHCE0Gh8xGyAxGyAxGh8xGh8xFhwtGyAxHCE0HCE0GyEzHSM2HSM2GyAxGyAzHCE0GyI0GyEz\nGyAxGh8xGyAxHCE0HCE0GyEzHSM2HSM2HSM2HSM2HSM2GyI0HSM2HSM2HSM2HSM2GyI0GyI0HSM2\nHSM2HSM2HSM2GyI0GyI0GyAxGB0uHSM2HSM2GyI0GyI0GyAxGB0uGyI0HSM2HSM2HSM2HSM2GyI0\nGyI0GyAxGB0uFhwtGiAyGiA0Gh8xGyAzHCE0HSM2GyI0GyI0GyI0HSM2HCE0GyEzGyAyGyAxGyAx\nFhwtGyAyGyAxGyAxGyAyHCEyGyEzHis+RmF0AAAAIyw+Qlpr3+Xkx8vKGBcZFxQXFRQWl5ucUVJT\nGBcZGhgaGxkaGhgaGhgZGhkaGRcZFxYYk5aXQEFDFhUXFhUYZmhp3+PkQlprIyw+RmF0GR4wHCE0\nHCE0GyAyGh8xGh8xGyAxGyAyFhwtHCE0GyAzHSM2HSM2HCE0HCE0HCE0HSM2GyI0Gh8xGh8xGR4w\nFx0vGR4wGiAyGyAzGyAxGyAxGh8xGh8xFhwtFhwtGyAzFx0vGB0uGh8xGyAyGB0uFBosFhwtGR4w\nGyAxHCEyGyAyGyAzGyAxGyAzHCE0GyAyGh8xGh8xGR4wGyAzHCE0GyAyGh8xGh8xGR4wGyAyGyAz\nGyAxGyAzHCE0GyAyGh8xGh8xGR4wGh8xGyAyGyEzGyAxGyAxGyAxGyAxGyAxGyEzGyEzGyEzGyAx\nGyAyGh8xGyAyGh8xFhwtFhwtFhwtGR4wGyEzHCE0HCE0HCE0HCE0GyAyGyAzGh8xHCE0GyAyGyEy\nHCEyGyAzHis+RmF0AAAAIyw+Qlpr3+TjwcXEFBMVFBIUDw8RtLi5OTk7FxUXGhgaGxkaGRcZGhgZ\nGRgaGBcZFhUYjpCSPD1AEhETExMVWVtc3+PkQlprIyw+RmF0GyI0GyAxGyAyGyAyGh8xGR4wGR4w\nGR4wGyAyFhwtGh8xFBosEhgqFBosExkrGh8xFhwtFhwtGh8xGyAxHCE0HCE0GyEzHSM2HSM2Gh8x\nGR4wFx0vGR4wGiAyGyAzGR4wGB0uFhwtFhwtFx0vGR4wGh8xGh8xGR4wFx0vGR4wGiAyGyAzGyAz\nGyAyGyAyGB0uFBosFhwtGR4wGyAxHCEyGyAyGyAzGyAxGyAzHCE0GyAyGh8xGh8xGR4wGyAzHCE0\nGyAyGh8xGh8xGR4wGyAyGyAzGyAxGyAzHCE0GyAyGh8xGh8xGR4wGh8xGyAyGyEzGyEzGyEzGR4w\nGiAyGh8yGyAyHCE0GyEzGyAzHSM2HSM2HCEyGR4wFhwtHSM2HCEyGyEzHCEyHCE0His+RmF0AAAA\nIyw+Qlpr3+Tj3+TjQkNDExIUERASc3Z3ISEjFhQWGxkaGhgaGRcZGhgaGxobGBcZFhQXUVRWFBMW\nFBIVFxYYsLO03+PkPVRmIyw+RmF0GyEyFhwtFhwtFhwtGR4wGyEzHCE0HCE0HCE0GyI0Gh8xGh8y\nGh8yGyAzHCE0GR4wFx0vGB4yGh8yGyAyHCE0GyEzGyAzHSM2Gh8xGyAxHCE0HCE0GyEzHSM2HSM2\nGyAxGyAzHCE0GyI0GyEzGyAxGh8xGyAxHCE0HCE0GyEzHSM2HSM2HSM2HSM2HSM2GyI0HSM2HSM2\nHSM2HSM2GyI0GyI0HSM2HSM2HSM2HSM2GyI0GyI0GyAxGB0uHSM2HSM2GyI0GyI0GyAxGB0uGyI0\nHSM2HSM2HSM2HSM2GyI0GyI0GyAxGB0uFhwtGiAyGiA0Gh8xGyAyHCEyGyAxGyAxGyEzHCE0Gh8x\nFx0vFx0vGR4wGyI0GyAzGh8xGR4wGyI0HCE0HCEyGyEzHis+RmF0AAAAIyw+Qlpr3+Tj4OXkm56e\nFxYYFRMWFBMVExEUFhQWFxUWFhQVGRcYGhgZGhgaGBcYFhUXEBETEhASFRQXOjs83uLj3+PkPVRm\nIyw+RmF0GyEzFx0vGB4yGh8yGyAyHCE0GyEzGyAzHSM2GyEzGyAxGyAyGyEyGyAyGh8xGyAzGyEz\nGyEyGyAxGyEzHCE0Gh8xFx0vFx0vGh8xGh8xGR4wGyAzGyAyGh8xGyAxGyAzGyAyGh8xGh8xGh8x\nHCEyGyAyGR4wGyAzGyAyGyAyHCEyGh8xGh8xGh8xGh8xGyAxGyAxGyAxGyAxGyAxGh8xGyAxGyAx\nGyAxGyAxGyAxGh8xGh8xGh8xGh8xGyAxGyAxGyAxGyAxGyAxGyEzGyEzGyEzGyAxGyAyGh8xGiAy\nGiA0Gh8xGR4wGh8xGyAyGyEzGyEzGyEzGyAxGh8xGh8xGR4wGh8xFhwtFhwtFx0vGh8xHCE0GR4w\nFhwtGh8xHCE0HCE0HCEyGyEzHis+RmF0AAAAIyw+Qlpr3+Tj3+Tj2t/eKSgqFhQXEhETFRMVGRcZ\nGRcYGhgaGhgZGRcZGhgaGRgZFxYZExIVFRQWFxYYj5KS3+Pk3+PkQlprIyw+RmF0KjdJHSM2GyEz\nGyEzGyAxGyEyGh8xFx0vGR4wGyAxGyEzGyEzGh8xGR4wGyAxGyAxHCEyGyAzGh8xGR4wGh8xFhwt\nFhwtFx0vGh8xGyAxHCE0GyAzGyAyGyAyHCEyGh8xGh8xGh8xGh8xGyAxGyAxGyAxGyAxGyAyGB0u\nFBosFhwtGR4wGyAxHCEyGyAyGyAzGyAxGyAzHCE0GyAyGh8xGh8xGR4wGyAzHCE0GyAyGh8xGh8x\nGR4wGyAyGyAzGyAxGyAzHCE0GyAyGh8xGh8xGR4wGh8xGyAyGyEzGyAyHCE0GyAxGB0uFhwtGiAy\nGiA0Gh8xFx0vGh8xGyEzFhwtFx0vGyAyHCE0HCE0HCE0HCE0HCEyGh8xGh8xGyEyGyAxGyEzHCE0\nGyI0KjdJRmF0AAAAIyw+Qlpr3+Tj3+Tj4OTkf4GBFhQXFhMWFxUXGRgZGRcZHBkbHhwdHhwdGRgZ\nGRgZGRgZFxUYFhUXJiYn1dna3+Pk3+PkQlprIyw+RmF0RmF0Ok5fGh8xGR4wGh8xGyAzFhwtFhwt\nGh8xHCE0GyAyGh8xGyAyHCE0Gh8xGh8xGh8xGR4wFhwtFx0vGyAyHCE0HCE0HCE0HCE0HCEyGyAx\nGyAyGB0uFBosFhwtGR4wGyAxHCEyGyAyGyAzGyAxGyAzHCE0GyAyGh8xGh8xGR4wGyAzHCE0GyAy\nGh8xGh8xGR4wGyAyGyAzGyAxGyAzHCE0GyAyGh8xGh8xGR4wGh8xGyAyGyEzGyAyGyAyHCEyGyAx\nGyAxFhwtFx0vGyAyHCE0FhwtGyAxGyAzGyEzGR4wHCEyGyAxGyAzGyAyHCE0HCE0HCE0HCE0HCEy\nGyAxGyAzGyEzGh8xGR4wGR4wGyAxGyAyGh8xGyAxGyAzGh8xGR4wGR4wOk5fRmF0RmF0AAAAIyw+\nQlpr3+Tj3+Tj3+Tjw8fHGhkaGBYYGRcZGBcZHBobHhwdOzo6HxweHRscGRcZGRgZGRgZFxYZaWpr\n3+Pk3+Pk3+PkPVRmIyw+RmF0KjdJMUFTHyY4Ok5fGh8yGR4wGyAxGyAyGyAxGyAxHCE0HCEyGyAx\nGyAzGyAyHCE0HCE0HCEyGyAxGyAzGyEzGh8xGR4wGR4wGyAxGyAyGyAyGyAyHCE0GyAzGyEzGh8x\nGyAzGyAyGyAyHCEyGh8xGh8xGh8xGh8xGyAxGyAxGyAxGyAxGyAxGh8xGyAxGyAxGyAxGyAxGyAx\nGh8xGh8xGh8xGh8xGyAxGyAxGyAxGyAxGyAxGyEzGyEzGyEzGyAxGyAyGh8xGh8xHCEyGyAyGR4w\nGR4wGh8xGyAyGyAyHCEyGyAxGyAxGyAzGyEzGR4wGiAyGyAzGyAxGh8xGR4wFx0vGB0uGh8xGyAx\nGyAxGh8xGh8xGh8xGyAxGR4wGyAyOk5fHyY4MUFTKjdJRmF0AAAAIyw+Qlpr3+Tj3+Tj3+Tj3+Tj\nVFVVGhgaGhgaGxkaGhgaQD9A3N7dUVBRGBYYGhgZGxkaGhkaGxocvsLC3+Pk3+Pk3+PkPVRmIyw+\nRmF0Ok5fGB0uOk5fKjdJGyAxGyAxGyAxGh8xGyEzHCEyGyAxGyAxGyAxGyAzGyEzGyAzGyAxGh8x\nGR4wFx0vGB0uGh8xGyAxGyAxGh8xGh8xFhwtFhwtGyAzFx0vGB0uGh8xGyAyGB0uFBosFhwtGR4w\nGyAxHCEyGyAyGyAzGyAxGyAzHCE0GyAyGh8xGh8xGR4wGyAzHCE0GyAyGh8xGh8xGR4wGyAyGyAz\nGyAxGyAzHCE0GyAyGh8xGh8xGR4wGh8xGyAyGyEzGyAxGyAxGyAxGyAxGyAxGyEzGyEzGyEzGyAx\nGyAyGh8xGyAyGyAyHCEyGyAxGR4wGB0uFhwtFhwtFx0vGR4wGh8xGh8xGR4wFx0vGR4wGR4wGyAy\nGyAxGyAyKjdJOk5fGh8xOk5fRmF0AAAAIyw+PVRm3uPi3+Tj3+Tj3+Tjur29Pj09GxobGxobHhwd\nuLq54+blw8TEIiAhHBocHBocHBscYGFg3+Pk3+Pk3+Pk3+PkOE5cIyw+RmF0Ok5fGyAyHyY4Nkpb\nMUFTHSM2GyAxGyAyHCE0GyEzGh8xGyAyGh8xGyAyGyAyGR4wGB0uFhwtFhwtFx0vGR4wGh8xGh8x\nGR4wFx0vGR4wGiAyGyAzGR4wGB0uFhwtFhwtFx0vGR4wGh8xGh8xGR4wFx0vGR4wGiAyGyAzGyAz\nGyAyGyAyGB0uFBosFhwtGR4wGyAxHCEyGyAyGyAzGyAxGyAzHCE0GyAyGh8xGh8xGR4wGyAzHCE0\nGyAyGh8xGh8xGR4wGyAyGyAzGyAxGyAzHCE0GyAyGh8xGh8xGR4wGh8xGyAyGyEzGyEzGyEzGyAx\nGh8xGyAxGyAzHCE0GyI0GyEzGyAxGh8xGyAxHCE0HCE0GyEzGyEzHCEyHSM2MUFTNkpbHyY4HCEy\nOk5fRmF0AAAAIyw+OE5c3uPi3uPi3+Tj3+Tj3+Tj3uPiq66tQ0NDLy0u2NrY1NfX19nYTEtMJSQl\naGlptLe33+Pk3+Pk3+Pk3+Pk3+PkOE5cIyw+RmF0KjdJNkpbOk5fKjdJRmF0MUFTHSM2HSM2HSM2\nHyY4Gh8xGyAyGyEzGyEzGyEzGyAxGyAzHCE0GyI0GyEzGyAxGh8xGyAxHCE0HCE0GyEzHSM2HSM2\nGyAxGyAzHCE0GyI0GyEzGyAxGh8xGyAxHCE0HCE0GyEzHSM2HSM2HSM2HSM2HSM2GyI0HSM2HSM2\nHSM2HSM2GyI0GyI0HSM2HSM2HSM2HSM2GyI0GyI0GyAxGB0uHSM2HSM2GyI0GyI0GyAxGB0uGyI0\nHSM2HSM2HSM2HSM2GyI0GyI0GyAxGB0uFhwtGiAyGiA0Gh8xFx0vGh8xGyEzGyEyHCE0HCE0Gh8x\nGR4wGh8xGh8xGyAxGR4wGR4wGh8xGyEzGh8xMUFTRmF0KjdJOk5fNkpbKjdJRmF0AAAAIyw+OE5c\nOE5cOE5cQlprQlprQlprPVRmOUx0dDxFVkNMPVRmPVRmQlprQlprQlprQlprQlprQlprQlprPVRm\nOE5cOE5cOE5cIyw+RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0\nRmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0\nRmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0\nRmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0\nRmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0\nRmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0RmF0AAAAIyw+Iyw+Iyw+Iyw+Iyw+Iyw+Iyw+\nIyw+Iyw+Iyw+Iyw+Iyw+Iyw+Iyw+Iyw+Iyw+Iyw+Iyw+Iyw+Iyw+Iyw+Iyw+Iyw+Iyw+Iyw+Iyw+\nIyw+ICo8Iyw+Iis9Iy1AIis9ICo8Iyw+Iyw+Iyw+Iy1AIis9ICo8Iy1AIyw+Iis9Iyw+Iis9ICo8\nICo8Iis9Iyw+Iy1AJC0+JC0+Iy1AIyw+Iyw+Iis9Iyw+Iis9ICo8ICo8Iis9Iyw+Iy1AJC0+JC0+\nIy1AIyw+Iyw+Iis9Iis9Iyw+Iis9ICo8ICo8Iis9Iyw+Iyw+ICo8Iyw+Iis9Iy1AIis9ICo8Iyw+\nIyw+Iyw+Iy1AIis9ICo8Iyw+Iyw+Iyw+ICo8Iyw+Iis9Iy1AIis9ICo8Iyw+Iyw+Iyw+GyAyGyAy\nGh8xGR4wGR4wGR4wGyAxGyAyHCE0GyI0HSM2GyAyGyAyHCE0HCE0GyAxGyAxGyAyGR4wFBosEhgq\nHCE0GyI0HSM2GyAyGyAyHCE0AAAA';
var buttonImg='Qk1OFQAAAAAAADYAAAAoAAAARwAAABkAAAABABgAAAAAABgVAAAAAAAAAAAAAAAAAAAAAAAAHCE0\nHCE0GyAyGyAyHCI2HCI1HCE0ExgpFRorGR4wGyAyGyAxGyAxHCE0HCE0GyAyGyAyHCI2HCI1HCE0\nGyAyGyAxGR4wGR4vGR4vGh8xGyAyGyAyIyw9Iyw9Iyw+ICk7Iys9JC1AGR4wGyAyGyAxGyAxHCE0\nHCE0GyAyGyAyHCI2HCI1HCE0GyAyGyAxGR4wGR4vGR4vGh8xGyAyGyAyIyw9Iyw9Iyw+ICk7Iys9\nGh8xGyAyGyAyIyw9FRorExgpHCE0HCI1HCI2GyAyGyAyHCE0HCE0AAAAIys9VmZ0VmZ0VmZ0VmZ0\nVmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0\nVmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0\nVmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0\nVmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0Iys9AAAAIis8VmZ0JzZHOEpfPE9hKjVHR2BzMD9SHCEy\nGh8wGh8wGB0uGR4vGR4vGR4vGh8xGh8xGR8wFx0vGB0wGB4vGB4wGyAyGyAyGiAxGiAxGiAyGiAy\nIis9Iis9ISo8Iis9Iyw9Iys9Gh8wGh8wGB0uGR4vGR4vGR4vGh8xGh8xGR8wFx0vGB0wGB4vGB4w\nGyAyGyAyGiAxGiAxGiAyGiAyIis9Iis9ISo8Iis9Iyw9GiAxGiAyGiAyIis9HCEyMD9SR2BzKjVH\nPE9hOEpfJzZHVmZ0Iis8AAAAIy1AVmZ0OkxdHCEyHiU3NklaM0NWHiM2HCE0GyAzGyAzGyAzGyE0\nGiAzGh8xGh8xGh8xGR8xGB4wGR8xGB4wFx0wFx0vFRstFRstFx0vGR8xGR8xGiAyGR8xGiAyGiAz\nGiAyGiAyGyAzGyAzGyAzGyE0GiAzGh8xGh8xGh8xGR8xGB4wGR8xGB4wFx0wFx0vFRstFRstFx0v\nGR8xGR8xGiAyGR8xGiAyGiAzGiAyFx0vGR8xGR8xGiAyHCE0HiM2M0NWNklaHiU3HCEyOkxdVmZ0\nIy1AAAAAIyw+VmZ0OlBiGR4vOUxfLDhLGyAxGyAxGB0vGh8yGh8yGiAxGh8wGh8wGR4vGR4vGR4v\nGB0vFx0uFx0vGB4wGR8yGR8xFx0vFhwvFx0vGB4wGR8xGR8xGiAyGiAyFhwuFBosFRstGh8yGh8y\nGiAxGh8wGh8wGR4vGR4vGR4vGB0vFx0uFx0vGB4wGR8yGR8xFx0vFhwvFx0vGB4wGR8xGR8xGiAy\nGiAyFhwuFBosFx0vGB4wGR8xGR8xGB0vGyAxGyAxLDhLOUxfGR4vOlBiVmZ0Iyw+AAAAIys9VmZ0\nKjZJMEBRHyc5OExeGyAyGR4wGB4wGiAyGiAyGR8xGB4wGiAyGiAzGyEzGiAyGB4wGR8xGiAzGyEz\nGiAyGR8xGR8xGiAyGiAyGR8xGB4wFx0wGR8xFRstFhwuGB4xGR8yGiAyGiAyGR8xGB4wGiAyGiAz\nGyEzGiAyGB4wGR8xGiAzGyEzGiAyGR8xGR8xGiAyGiAyGR8xGB4wFx0wGR8xFRstFhwuGB4xGiAy\nGR8xGB4wFx0wGB4wGR4wGyAyOExeHyc5MEBRKjZJVmZ0Iys9AAAAIyw9VmZ0RmF0OExeGh8wGR4v\nGh8wGyAzGR8xGR8xGiAyGiAyGR8xGR8xGR8xGR8xGR8xGiAyGiAyGR8xGB4wGR8xGR8xGB4wGR8y\nGR8yGiAyGiAyGiAyGiAzGyEzGiAyGB4wGR8xGR8xGiAyGiAyGR8xGR8xGR8xGR8xGR8xGiAyGiAy\nGR8xGB4wGR8xGR8xGB4wGR8yGR8yGiAyGiAyGiAyGiAzGyEzGiAyGB4wGR8yGiAyGiAyGiAyGR8x\nGyAzGh8wGR4vGh8wOExeRmF0VmZ0Iyw9AAAAJC0+VmZ0LDlJGyM0GyE0HCEzGyAxGyEyGiAyGyEz\nGR8xGiAyGh8xGh8xGR8xGB4wGR8xGB4wFx0wFx0vFRstFRstFx0vGR8xGR8xGiAyGR8xGiAyGiAz\nGiAyGiAyGyAzGyAzGyAzGyE0GiAzGh8xGh8xGh8xGR8xGB4wGR8xGB4wFx0wFx0vFRstFRstFx0v\nGR8xGR8xGiAyGR8xGiAyGiAzGiAyGyAxGR4vGh8xGiAyGiAyGiAyGyE0GiAyGyEyGyAxHCEzGyE0\nGyM0LDlJVmZ0JC0+AAAAJC0+VmZ0His+GB0vHCEyFBosExkrEhgqExkrFBosExkrEhgqGR4vGR4v\nGB0vFx0uFx0vGB4wGR8yGR8xFx0vFhwvFx0vGB4wGR8xGR8xGiAyGiAyFhwuFBosFRstGh8yGh8y\nGiAxGh8wGh8wGR4vGR4vGR4vGB0vFx0uFx0vGB4wGR8yGR8xFx0vFhwvFx0vGB4wGR8xGR8xGiAy\nGiAyFhwuFBosGh8wHCE0GyAyGyEzGyEzGyEzGB0uExkrEhgqExkrFBosHCEyGB0vHis+VmZ0JC0+\nAAAAIys9VmZ0His+Gh8yHCEyGyAzGiAyGB4yGB8zGB8zGiAyGB4yGyEzGiAyGB4wGR8xGiAzGyEz\nGiAyGR8xGR8xGiAyGiAyGR8xGB4wFx0wGR8xFRstFhwuGB4xGR8yGiAyGiAyGR8xGB4wGiAyGiAz\nGyEzGiAyGB4wGR8xGiAzGyEzGiAyGR8xGR8xGiAyGiAyGR8xGB4wFx0wGR8xFRstFhwuGB4xGyAy\nGyAzGyAyGiAyGiAzGiA0GiAxGB8zGB4yGiAyGyAzHCEyGh8yHis+VmZ0Iys9AAAAISs9VmZ0His+\nGiAxHCEyGh8xGyAyGyAzGyAzGiAyGyAyGyAzGR8xGR8xGiAyGiAyGR8xGB4wGR8xGR8xGB4wGR8y\nGR8yGiAyGiAyGiAyGiAzGyEzGiAyGB4wGR8xGR8xGiAyGiAyGR8xGR8xGR8xGR8xGR8xGiAyGiAy\nGR8xGB4wGR8xGR8xGB4wGR8yGR8yGiAyGiAyGiAyGiAzGyEzGiAyGB4wFxwtGB0uFxwtFhwvFBos\nFhstFxwtGyAzGyAzGyAyGh8xHCEyGiAxHis+VmZ0ISs9AAAAIyw+VmZ0His+GB0vHCEyGh8wGR4w\nGyAzHCE0Gh8wGR4wGyAzGyEzGiAyGB4wGR8xGiAzGyEzGiAyGR8xGR8xGiAyGiAyGR8xGB4wFx0w\nGR8xFRstFhwuGB4xGR8yGiAyGiAyGR8xGB4wGiAyGiAzGyEzGiAyGB4wGR8xGiAzGyEzGiAyGR8x\nGR8xGiAyGiAyGR8xGB4wFx0wGR8xFRstFhwuGB4xGyAyGyAzHCEzHCE1HCE1HCI2GyAyHCE0GyAz\nGR4wGh8wHCEyGB0vHis+VmZ0Iyw+AAAAHyg5VmZ0His+HCEzHCEyGyAyGyAxGyAxGyAyFxwtGyAx\nGyAxGR8xGR8xGiAyGiAyGR8xGB4wGR8xGR8xGB4wGR8yGR8yGiAyGiAyGiAyGiAzGyEzGiAyGB4w\nGR8xGR8xGiAyGiAyGR8xGR8xGR8xGR8xGR8xGiAyGiAyGR8xGB4wGR8xGR8xGB4wGR8yGR8yGiAy\nGiAyGiAyGiAzGyEzGiAyGB4wGyAyGyAzGyAyHCI3HCI3GyAzGh8wGyAyGyAxGyAxGyAyHCEyHCEz\nHis+VmZ0Hyg5AAAAISo7VmZ0His+GyAzHCEyGyEyGyAyHCE0Gh8wGyAzGyAyHCE0HCE0GyE0HCE0\nGh8xGh8xGR8xGB4wGR8xGB4wFx0wFx0vFRstFRstFx0vGR8xGR8xGiAyGR8xGiAyGiAzGiAyGiAy\nGyAzGyAzGyAzGyE0GiAzGh8xGh8xGh8xGR8xGB4wGR8xGB4wFx0wFx0vFRstFRstFx0vGR8xGR8x\nGiAyGR8xGiAyGiAzGiAyExgqFRosGh8xGyAxGh8wHCE0GyAyGyEyHCEyGyAzHis+VmZ0ISo7AAAA\nJC1AVmZ0His+GyE0HCEyGyEzHCEyHCI3FxwtGR4wHCEyHCI3HCI2GyAzHCEzGR4vGR4vGB0vFx0u\nFx0vGB4wGR8yGR8xFx0vFhwvFx0vGB4wGR8xGR8xGiAyGiAyFhwuFBosFRstGh8yGh8yGiAxGh8w\nGh8wGR4vGR4vGR4vGB0vFx0uFx0vGB4wGR8yGR8xFx0vFhwvFx0vGB4wGR8xGR8xGiAyGiAyFhwu\nFBosGR8yGR8yGh8xGh8wFxwtHCI3HCEyGyEzHCEyGyE0His+VmZ0JC1AAAAAIy1AVmZ0His+HCEz\nHCEyHCE0HCI1GR4wGh8wGyAzHCI1GR4wGB0vGB0vGh8xGyEzGiAyGB4wGR8xGiAzGyEzGiAyGR8x\nGR8xGiAyGiAyGR8xGB4wFx0wGR8xFRstFhwuGB4xGR8yGiAyGiAyGR8xGB4wGiAyGiAzGyEzGiAy\nGB4wGR8xGiAzGyEzGiAyGR8xGR8xGiAyGiAyGR8xGB4wFx0wGR8xFRstFhwuGB4xGyEyGyAyGyAx\nGyAxGh8wGR4wHCI1HCE0HCEyHCEzHis+VmZ0Iy1AAAAAHyc5VmZ0His+HCEzHCEyHCE0HCE1GR8x\nFxwtGR4wHCE1GR8xGB0vFxwuFx0uGR8xGR8xGiAyGiAyGR8xGB4wGR8xGR8xGB4wGR8yGR8yGiAy\nGiAyGiAyGiAzGyEzGiAyGB4wGR8xGR8xGiAyGiAyGR8xGR8xGR8xGR8xGR8xGiAyGiAyGR8xGB4w\nGR8xGR8xGB4wGR8yGR8yGiAyGiAyGiAyGiAzGyEzGiAyGB4wGh8xHCEzGyEzGh8wFxwtGR8xHCE1\nHCE0HCEyHCEzHis+VmZ0Hyc5AAAAIys+VmZ0LDlJGyM0GyE0HCEzGyAxGyEyGh8wGh8wHCEyGyE0\nHCE0GyE0GR4wGR4vGR4vGB0vFx0uFx0vGB4wGR8yGR8xFx0vFhwvFx0vGB4wGR8xGR8xGiAyGiAy\nFhwuFBosFRstGh8yGh8yGiAxGh8wGh8wGR4vGR4vGR4vGB0vFx0uFx0vGB4wGR8yGR8xFx0vFhwv\nFx0vGB4wGR8xGR8xGiAyGiAyFhwuFBosGyAyGh8xGyAyGyAyGh8wGyEyGyAxHCEzGyE0GyM0LDlJ\nVmZ0Iys+AAAAIyw/VmZ0RmF0OExeGh8wGR4vGh8wGyAzGyAxGh8wGyAyGiAxGR4vGR4vGyAxGyEz\nGiAyGB4wGR8xGiAzGyEzGiAyGR8xGR8xGiAyGiAyGR8xGB4wFx0wGR8xFRstFhwuGB4xGR8yGiAy\nGiAyGR8xGB4wGiAyGiAzGyEzGiAyGB4wGR8xGiAzGyEzGiAyGR8xGR8xGiAyGiAyGR8xGB4wFx0w\nGR8xFRstFhwuGB4xGyAxHCEyGyE0FxwtGyAxGyAzGh8wGR4vGh8wOExeRmF0VmZ0Iyw/AAAAJC1A\nVmZ0KjZJMEBRHyc5OExeGyAyGR4wGyAxGh8xGh8xGh8xGyAxGyAxGh8wGR8xGR8xGiAyGiAyGR8x\nGB4wGR8xGR8xGB4wGR8yGR8yGiAyGiAyGiAyGiAzGyEzGiAyGB4wGR8xGR8xGiAyGiAyGR8xGR8x\nGR8xGR8xGR8xGiAyGiAyGR8xGB4wGR8xGR8xGB4wGR8yGR8yGiAyGiAyGiAyGiAzGyEzGiAyGB4w\nGyAxGyAxGyAxGR4vGyAxGR4wGyAyOExeHyc5MEBRKjZJVmZ0JC1AAAAAIy1AVmZ0OlBiGR4vOUxf\nLDhLGyAxGyAxGyAyGR4wGR4wGB0vGR4vGh8wGh8wGR4wFx0vFhstFxwtGB0uGR4vGyAxHCEyGyAy\nGyAyGh8xGyAyGh8wGyAxGyAxGyAxGyAxGyAxGh8wGR4wGR4wGB0vGR4vGh8wGh8wGR4wFx0vFhst\nFxwtGB0uGR4vGyAxHCEyGyAyGyAyGh8xGyAyGh8wGyAxGyAxGyAxGyAxGyAxGh8xGyAyGh8wGyAx\nGyAyGyAxGyAxLDhLOUxfGR4vOlBiVmZ0Iy1AAAAAHyc5VmZ0OkxdHCEyHiU3NklaM0NWHiM2HCEy\nHCEzHCEzHCE0HCE0GyAxGh8wGyAxGyEzHCI1HCE0GyAzGyAxGh8xGyAxHCEzHCEzGyEzGyAyGh8x\nGR4wGh8xGh8wGyAyHCE0GyAzHCEzHCEzHCE0HCE0GyAxGh8wGyAxGyEzHCI1HCE0GyAzGyAxGh8x\nGyAxHCEzHCEzGyEzGyAyGh8xGR4wGh8xGh8wGyAyHCE0GyEzGyAyGh8xGR4wHCEyHiM2M0NWNkla\nHiU3HCEyOkxdVmZ0Hyc5AAAAIys+VmZ0JzZHOEpfPE9hKjVHR2BzMD9SGyAxHCEzGh8xGR4vGR4v\nGyAxGh8wGh8wGR4vGh8xHCE0HCE0GyEyHCEzGh8wGB0vGR8xGyA0GiAyFhssFx0uGiAxGyIzGyIz\nHSM2HSQ2HCEzGh8xGR4vGR4vGyAxGh8wGh8wGR4vGh8xHCE0HCE0GyEyHCEzGh8wGB0vGR8xGyA0\nGiAyFhssFx0uGiAxGyIzGyIzHSM2GyA0GiAyFhssFx0uGyAxMD9SR2BzKjVHPE9hOEpfJzZHVmZ0\nIys+AAAAIyw/VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0\nVmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0\nVmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0\nVmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0VmZ0Iyw/AAAAHCE0HCE0\nGyAyGyAyHCI2HCI1HCE0ExgpFRorGR4wGyAyGyAxGyAxHCE0HCE0GyAyGyAyHCI2HCI1HCE0GyAy\nGyAxGR4wGR4vGR4vGh8xGyAyGyAyIyw9Iyw9Iyw+ICk7Iys9JC1AGR4wGyAyGyAxGyAxHCE0HCE0\nGyAyGyAyHCI2HCI1HCE0GyAyGyAxGR4wGR4vGR4vGh8xGyAyGyAyIyw9Iyw9Iyw+ICk7Iys9Gh8x\nGyAyGyAyIyw9FRorExgpHCE0HCI1HCI2GyAyGyAyHCE0HCE0AAAA';
//'

var gLang='en';
(function(){
	var pos = gLocation.indexOf("//");
	var lang = gLocation.substring(pos+2, pos+4);
	if (wardrobe_text[lang]) { gLang=lang; }
}());



function isNull(variable)
{
	return (typeof(variable) === "undefined" || variable === null) ? true : false;
}

function trim(str)
{
	return str.replace(/^\s+/, '').replace(/\s+$/, '');
}

function getServer(loc)
{
	loc = loc.substring(loc.indexOf('//')+2);
	loc = loc.substring(0, loc.indexOf('/'));
	return loc;
}

function insertAfter(newNode, referenceNode) { referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling); }

function hideElement(element) { element.style.display='none'; }

function showElement(element) { element.style.display='block'; }

function toggleElement(element) { if (element.style.display==='none') {showElement(element);} else {hideElement(element);} }

function isElementHidden(element)
{
	return element.style.display !== 'block';
}

function removeElement(el)
{
	el.parentNode.removeChild(el);
}

function getArmorSet(setName)
{
	return GM_getValue(getServer(gLocation)+'_'+unsafeWindow.Character.name+'_'+setName, '');
}

function setArmorSet(setName, value)
{
	GM_setValue(getServer(gLocation)+'_'+unsafeWindow.Character.name+'_'+setName, value);
}

function removeArmorSet(setName)
{
	if (GM_deleteValue) {
		GM_deleteValue(getServer(gLocation)+'_'+unsafeWindow.Character.name+'_'+setName);
	} else {
		GM_setValue(getServer(gLocation)+'_'+unsafeWindow.Character.name+'_'+setName, '');
	}
}

function getListOfSets()
{
	return GM_getValue(getServer(gLocation)+'_'+unsafeWindow.Character.name+':listOfSets', '');
}

function setListOfSets(value)
{
	GM_setValue(getServer(gLocation)+'_'+unsafeWindow.Character.name+':listOfSets', value);
}

// check validity of set name - must not contain ';'
function isValidSetName(setName)
{
	return (setName.indexOf(';') < 0);
}

function isInList(list, value, delimiter)
{
	if (delimiter === undefined) {
		delimiter = ';';
	}
	var pos = list.indexOf(value);

	if (pos < 0) { return false; }
	// check if value is one whole item, not just part of a item
	if (pos > 0  &&  list[pos - 1] !== delimiter) {
		// non-delimiter before
		return false;
	}
	if (pos + value.length < list.length  &&  list[pos + value.length] !== delimiter) {
		// non-delimiter after
		return false;
	}

	return true;
}


// select given set name in inventory dropdown
function selectInvDropDown(setName)
{
	if (gArmorInputType !== 'drop' || isNull(gInputElement) || isNull(gInputElement.options)) {
		return false;
	}

	var options = gInputElement.options;
	var i;

	for (i in options) {
		if (options[i].value === setName) {
			options[i].selected = true;
			return true;
		}
	}

	return false;
}

function selectInvDropDownFromMenuDropDown()
{
	var dropDown = document.getElementById('armorset_combobox');
	if (isNull(dropDown)) { return false; }
	var option = dropDown.options[dropDown.selectedIndex];
	return selectInvDropDown(option.value);
}


function changeToTextBox(elem)
{
	gInputElement = document.createElement('input');
	gInputElement.style.width = '107px';
	insertAfter(gInputElement, elem);
	removeElement(elem);
	gInputElement.focus();
	gArmorInputType = 'text';
	var codb = document.getElementById('wardrobe_cancelOrDelete_button');
	if (codb) {
		codb.innerHTML = cancel_button_text[gLang];
	}
}

function invDropDownOnChange(event)
{
	if (this.selectedIndex === this.length - 1) {
		// last, i.e. 'New name' option selected
		changeToTextBox(gInputElement);
	}
}

function createDropInvDropDown()
{
	var list, count, nNewItem, name, pos;

	gInputElement = document.createElement('select');
	gInputElement.style.width = '137px';
	gInputElement.addEventListener('change', invDropDownOnChange, false);

	list = getListOfSets();
	count = 0;
	while (list.length > 0) {
		pos = list.indexOf(';');
		if (pos < 0) {
			name = list;
			list = '';
		} else {
			name = list.substring(0, pos);
			list = list.substring(pos + 1);
		}
		if (name === '') {
			// ignore empty set names for backward compatibility
			continue;
		}
		count++;
		nNewItem = document.createElement('option');
		nNewItem.innerHTML = name;
		gInputElement.appendChild(nNewItem);
	}

	if (count < 1) {
		// empty list - add one empty option
		nNewItem = document.createElement('option');
		nNewItem.innerHTML = '';
		gInputElement.appendChild(nNewItem);
	}

	// add 'New name' option
	nNewItem = document.createElement('option');
	nNewItem.innerHTML = '... ' + new_name_text[gLang] + ' ...';
	gInputElement.appendChild(nNewItem);

	var codb = document.getElementById('wardrobe_cancelOrDelete_button');
	if (codb) {
		codb.innerHTML = delete_button_text[gLang];
	}
}

function changeToDropDown(elem)
{
	createDropInvDropDown();
	insertAfter(gInputElement, elem);
	removeElement(elem);
	gArmorInputType = 'drop';
	gInputElement.focus();
}


function addToQueue(action, hpBonus)
{
	gQueue.push(action);
	gQueueHPChange.push(hpBonus);
}

function sortQueue()
{
  var sortElement =
    function(a,b) {
      return b.hp-a.hp;
    }

  var lQueue = [];
  var i;

  for (i in gQueueHPChange) {
    lQueue[i] = new Object();
    lQueue[i].item = gQueue[i];
    lQueue[i].hp   = gQueueHPChange[i];
  }

  lQueue = lQueue.sort(sortElement);

  // recreate gQueue in new order
  gQueue = [];
  gQueueHPChange = [];

  for (i in lQueue)
    addToQueue(lQueue[i].item, lQueue[i].hp);
}

function isUncarryAction(action)
{
	return ((action === 'head') ||
		(action === 'left_arm') ||
		(action === 'body') ||
		(action === 'right_arm') ||
		(action === 'yield') ||
		(action === 'foot') ||
		(action === 'neck') ||
		(action === 'pants') ||
		(action === 'belt') ||
		(action === 'animal')
	);
}

function executeQueue(retry)
{
	gQueueTimer = 0;

	if (isNull(retry)) { retry=0; }
	if (gQueue.length === 0) {
		// queue finished, select set name in inventory's dropdown
		selectInvDropDownFromMenuDropDown();
		return;
	}
	if (retry >= maxRetry) {
		// retries failed, skipping item
		gQueueIndex++;
		if(gQueueIndex >= gQueue.length) {
			gQueueIndex=0;
			gQueue = [];
			gQueueHPChange = [];
			return;
		}
	}
	if (gQueueIndex >= gQueue.length) {
		// index out of bounds
		gQueueIndex=0;
		gQueue = [];
		gQueueHPChange = [];
		return;
	}

	var ok = false, found, i;
	var items, itemWearing;

	if (isUncarryAction(gQueue[gQueueIndex])){
		ok = unsafeWindow.Wear.uncarry(gQueue[gQueueIndex]);

		found = true;
	} else {
		items = unsafeWindow.Bag.getInstance().items;
		found = false;
		for (i in items) {
			if (items[i].get_short() === gQueue[gQueueIndex]) {
				found = true;
				itemWearing = unsafeWindow.Wear.wear[items[i].get_type()];
				if (!isNull(itemWearing) && itemWearing.get_short() === gQueue[gQueueIndex]) {
					ok = true;
					break;
				}
				ok = unsafeWindow.Bag.getInstance().carry(i);
				break;
			}
		}
	}

	if (found && !ok) {
		// something bad happened, try again
		gQueueTimer = setTimeout(function () {executeQueue(retry+1);}, retryPeriod*(retry+1)*2);
		return;
	}

	// proceed to next item in queue
	gQueueIndex++;
	if (gQueueIndex >= gQueue.length) {
		// queue finished, select set name in inventory's dropdown
		gQueueIndex = 0;
		gQueue = [];
		gQueueHPChange = [];
		selectInvDropDownFromMenuDropDown();
		return;
	}

	gQueueTimer = setTimeout(function () {executeQueue();}, retryPeriod);
}

function getHPBonus(id, isBagItem)
{
  var item = null;

  if(!isBagItem)
    item = unsafeWindow.Wear.get(id);
  else
    var i;
		var items = unsafeWindow.Bag.getInstance().items;
		for (i in items) {
			if (items[i].get_short() === id) {
				item = items[i];
				break;
			}
		}

  if (isNull(item)) return 0;

  var str    = 0;
  var hp     = 0;
  var setStr = 0; // not implemented yet
  var setHP  = 0; // not implemented yet

  try {
    str = item.obj.bonus.attributes.strength;
    if (isNull(str)) str = 0;
  } catch(e) {}

  try {
    hp = item.obj.bonus.skills.health;
    if (isNull(hp)) hp = 0;
  } catch(e) {}

  return str+hp+setStr+setHP;
}

function setArmorHelper(name, wanted, element) {
	if (wanted) {
		if (isNull(element) || element.get_short() !== wanted) {
			addToQueue(wanted, getHPBonus(wanted, true)-getHPBonus(name, false));
		}
	} else {
		if (!isNull(element)) {
			addToQueue(name, 0-getHPBonus(name, false)); // TODO set items needs to affect this line more
		}
	}
}

function setArmor(armorSet) {
	var
    ANIMAL    = 0,
		BODY      = 1,
		FOOT      = 2,
		LEFT_ARM  = 3,
		HEAD      = 4,
		YIELD     = 5,
		RIGHT_ARM = 6,
		PANTS     = 7,
		BELT      = 8;
		NECK      = 9;

	if (document.getElementById('bag')) {
		unsafeWindow.AjaxWindow.maximize('inventory');
	} else {
		unsafeWindow.AjaxWindow.show('inventory');
		setTimeout(function(){addInventoryButtons();}, 100);
		setTimeout(function(){setArmor(armorSet);}, 1000);
		return;
	}

	// clean old queue
	window.clearInterval(gQueueTimer);
	gQueueIndex = 0;
	gQueue = [];
	gQueueHPChange = [];

	var setArray = [];
	setArray = armorSet.split(':');

	//remove wrong clothes and apply right clothes
	setArmorHelper('animal',    setArray[ANIMAL],    unsafeWindow.Wear.wear.animal);
	setArmorHelper('body',      setArray[BODY],      unsafeWindow.Wear.wear.body);
	setArmorHelper('foot',      setArray[FOOT],      unsafeWindow.Wear.wear.foot);
	setArmorHelper('left_arm',  setArray[LEFT_ARM],  unsafeWindow.Wear.wear.left_arm);
	setArmorHelper('head',      setArray[HEAD],      unsafeWindow.Wear.wear.head);
	setArmorHelper('yield',     setArray[YIELD],     unsafeWindow.Wear.wear.yield);
	setArmorHelper('right_arm', setArray[RIGHT_ARM], unsafeWindow.Wear.wear.right_arm);
	setArmorHelper('pants',     setArray[PANTS],     unsafeWindow.Wear.wear.pants);
	setArmorHelper('belt',		setArray[BELT],		 unsafeWindow.Wear.wear.belt);
	setArmorHelper('neck',      setArray[NECK],      unsafeWindow.Wear.wear.neck);

  sortQueue();
	executeQueue();
}

function setArmorOptionOnClick()
{
	var setName = this.value;
	var armorSet = getArmorSet(setName);
	setArmor(armorSet);
}

// fill options in element (menu_drop_down)
function createOptionsList(element)
{
	var list, name, nNewItem;

	// remove old options
	while (element.options.length > 0) {
		element.options[0] = null;
	}

	list = getListOfSets();
	while (list.length > 0)
	{
		pos = list.indexOf(';');
		if (pos < 0) {
			name = list;
			list = '';
		} else {
			name = list.substring(0, pos);
			list = list.substring(pos + 1);
		}
		if (name === '') {
			// ignore empty set names for backward compatibility
			continue;
		}

		nNewItem = document.createElement('option');
		nNewItem.innerHTML = name;
		nNewItem.addEventListener('click', setArmorOptionOnClick, false);

		element.appendChild(nNewItem);
	}
}

function updateDropdown()
{
	var dropDown = document.getElementById('armorset_combobox');
	createOptionsList(dropDown);
}

// create right menu button & dropdown
function createDropdown()
{
	var rightmenu = document.getElementById('right_menu');

	var newLI = document.createElement('li');
	newLI.setAttribute('id', 'armorset_li');
	newLI.innerHTML= "<a href=\"#\"><div style=\"z-index:100; background-image:url(http://i649.photobucket.com/albums/uu217/JohnCooperED/gardrop2.png); background-repeat:no-repeat; background-position:left top; width:128px; height:25px;\" onMouseMove=\"this.style.backgroundPosition = 'left bottom'\" onMouseOut=\"this.style.backgroundPosition = 'left top'\"></div></a>";
	rightmenu.appendChild(newLI);

	var newDropDown = document.createElement('select');
	newDropDown.setAttribute('id', 'armorset_combobox');
	newDropDown.style.width = '127px';
	newDropDown.style.position = 'relative';
  // fix for update 1.27
  right_work_bar = document.getElementById('workbar_right');
  if (right_work_bar) {
  	newDropDown.style.top = '-22px';
  	newDropDown.style.left = '-128px';
  }
	hideElement(newDropDown);

	newLI.addEventListener('click', function(){
		toggleElement(newDropDown);
		if (!isElementHidden(newDropDown)) {
			newDropDown.focus();
		}
	}, false);
	createOptionsList(newDropDown);
	insertAfter(newDropDown, newLI);
}


function saveArmor()
{
	var list = getListOfSets();

	var setName = trim(gInputElement.value);
	if (setName === '') {
		if (gArmorInputType === 'drop') {
			new unsafeWindow.HumanMessage(save_choose_name_error_text[gLang]);
		}
		gInputElement.focus();
		return;
	}
	if (!isValidSetName(setName)) {
		new unsafeWindow.HumanMessage(save_invalid_name_error_text[gLang]);
		gInputElement.focus();
		return;
	}

	var bIsInList = isInList(list, setName);
	if (bIsInList) {
		// confirm overwrite
		if (!confirm(confirm_overwrite_text[gLang] + '"' + setName + '" ?')) {
			gInputElement.focus();
			return;
		}
	}

	var l_animal, l_body, l_foot, l_left_arm, l_head, l_yield, l_right_arm, l_neck;
	l_animal=l_body=l_foot=l_left_arm=l_head=l_yield=l_right_arm=l_neck = '';
	if (!isNull(unsafeWindow.Wear.wear.animal))    { l_animal    = unsafeWindow.Wear.wear.animal.get_short(); }
	if (!isNull(unsafeWindow.Wear.wear.body))      { l_body      = unsafeWindow.Wear.wear.body.get_short(); }
	if (!isNull(unsafeWindow.Wear.wear.foot))      { l_foot      = unsafeWindow.Wear.wear.foot.get_short(); }
	if (!isNull(unsafeWindow.Wear.wear.left_arm))  { l_left_arm  = unsafeWindow.Wear.wear.left_arm.get_short(); }
	if (!isNull(unsafeWindow.Wear.wear.head))      { l_head      = unsafeWindow.Wear.wear.head.get_short(); }
	if (!isNull(unsafeWindow.Wear.wear.yield))     { l_yield     = unsafeWindow.Wear.wear.yield.get_short(); }
	if (!isNull(unsafeWindow.Wear.wear.right_arm)) { l_right_arm = unsafeWindow.Wear.wear.right_arm.get_short(); }
	if (!isNull(unsafeWindow.Wear.wear.pants))     { l_pants     = unsafeWindow.Wear.wear.pants.get_short(); }
	if (!isNull(unsafeWindow.Wear.wear.belt))	   { l_belt		 = unsafeWindow.Wear.wear.belt.get_short(); }
	if (!isNull(unsafeWindow.Wear.wear.neck))      { l_neck      = unsafeWindow.Wear.wear.neck.get_short(); }

	setArmorSet(setName, l_animal+':'+l_body+':'+l_foot+':'+l_left_arm+':'+l_head+':'+l_yield+':'+l_right_arm+':'+l_pants+':'+l_belt+':'+l_neck);
	if (!bIsInList) {
		if (list === '') {
			list = setName;
		} else {
			list = list + ';' + setName;
		}
		setListOfSets(list);
	}
	new unsafeWindow.HumanMessage(save_message_text[gLang], {type:'success'});

	updateDropdown();
	changeToDropDown(gInputElement);
	selectInvDropDown(setName);
}

function removeArmor()
{
	if (gArmorInputType === 'text') {
		// cancel adding of new set
		changeToDropDown(gInputElement);
		return;
	}
	// remove existing set
	var setName = gInputElement.value;

	if (setName === '') {
		new unsafeWindow.HumanMessage(delete_choose_name_error_text[gLang]);
		gInputElement.focus();
		return;
	}
	// remove existing set
	if (!confirm('"' + setName + '" ' + confirm_delete_text[gLang])) {
		gInputElement.focus();
		return;
	}
	removeArmorSet(setName);
	var list = getListOfSets();
	list = list.split(';');
	var newList = '', i;
	for (i in list) {
		if (list[i] !== setName && list[i] !== '') {
			if (newList === '') {
				newList = list[i];
			} else {
				newList = newList + ';' + list[i];
			}
		}
	}
	setListOfSets(newList);

	updateDropdown();
	changeToDropDown(gInputElement);
}


function addInventoryButtons()
{
	var invTargetPos = null;

	// check if inventory window is fully loaded
	invTargetPos = document.getElementById('bag');
	if (!unsafeWindow.AjaxWindow.windows['inventory'].isReady || isNull(invTargetPos)) {
		setTimeout(function(){addInventoryButtons();}, 200);
		return;
	}

	invTargetPos = document.getElementById('window_inventory_content');
	var nTable = document.createElement('table');
	nTable.setAttribute("style", "position: absolute; margin-left: 320px; margin-top: 2px; background: url(data:image/png;base64,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); background-repeat:no-repeat;");
	invTargetPos.appendChild(nTable);

	var nTR = document.createElement('tr');
	nTable.appendChild(nTR);

	var nTD = document.createElement('td');
	nTR.appendChild(nTD);
	var nLabel = document.createElement('span');
	nLabel.innerHTML = wardrobe_text[gLang] + ':';
	nLabel.setAttribute("style", "font-weight:bold;");
	nTD.appendChild(nLabel);

	nTD = document.createElement('td');
	nTR.appendChild(nTD);
	createDropInvDropDown();
	nTD.appendChild(gInputElement);

	nTD = document.createElement('td');
	nTR.appendChild(nTD);
	var nb = document.createElement('img');
	nb.setAttribute("style", "cursor: pointer;");
	nb.setAttribute("src", "data:image/gif;base64," + buttonImg);
	nb.addEventListener("click", saveArmor, false);
	nTD.appendChild(nb);
	var ns = document.createElement('span');
	ns.setAttribute("style", "cursor:pointer; width: 71px; color: rgb(255, 255, 255); display: block; z-index: 200; font-size: 15px; position: relative; top: -22px; text-align: center; left: 0px; font-weight: bold;");
	ns.addEventListener("click", saveArmor, false);
	ns.innerHTML = save_button_text[gLang];
	nTD.appendChild(ns);

	nTD = document.createElement('td');
	nTR.appendChild(nTD);
	nb = document.createElement('img');
	nb.setAttribute("style", "cursor: pointer;");
	nb.setAttribute("src", "data:image/gif;base64," + buttonImg);
	nb.addEventListener("click", removeArmor, false);
	nTD.appendChild(nb);
	ns = document.createElement('span');
	ns.setAttribute("style", "cursor:pointer; width: 71px; color: rgb(255, 255, 255); display: block; z-index: 200; font-size: 15px; position: relative; top: -22px; text-align: center; left: 0px; font-weight: bold;");
	ns.setAttribute("id", "wardrobe_cancelOrDelete_button");
	ns.addEventListener("click", removeArmor, false);
//	ns.addEventListener("click",function(){removeArmor();},false);
	ns.innerHTML = delete_button_text[gLang];
	nTD.appendChild(ns);
}

function findPosY(obj)
{
  var curtop = 0;
  if(obj.offsetParent)
      while(1)
      {
        curtop += obj.offsetTop;
        if(!obj.offsetParent)
          break;
        obj = obj.offsetParent;
      }
  else if(obj.y)
      curtop += obj.y;
  return curtop;
}


function init() {
  createDropdown();

  //search for inventory button
  var pageElements = document.getElementsByTagName('A');
  var invButton;
  for (var i = 0; i < pageElements.length; i++) {
  	invButton = pageElements[i];
  	if (invButton.getAttribute('onclick') === "AjaxWindow.show('inventory');" && invButton.parentNode.id === 'menu_inventory') {
  		invButton.addEventListener("click", function(){setTimeout(addInventoryButtons, 100);}, false);
  	}
  }

  // fix "abdorment_right"
  document.getElementById('abdorment_right').style.zIndex = "5";

  // fix for update 1.27
  right_work_bar = document.getElementById('workbar_right');
  if (right_work_bar) {
    right_work_bar.style.top = (findPosY(right_work_bar)+26)+"px";
  }
}

// fix for GM loading too fast
unsafeWindow.addEventListener("load", function() {init()}, false);
