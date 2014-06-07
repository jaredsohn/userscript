// ==UserScript==
// @name           The-West Garderobe
// @namespace      The-West Garderobe
// @include        http://*.the-west.*/game.php*
// @version        1.0.0
// ==/UserScript==

// Created by Puli and partly modified by Muche modified by hamachi-mp

"use strict";

var wardrobe_text={en:'Wardrobe', sk:'Šatník', cz:'Skříň', de:'Garderobe'};
var new_name_text={en:'New name', sk:'Nový názov', cz:'Nový název', de:'Neuer Name'};
var cancel_button_text={en:'Cancel', sk:'Zrušiť', cz:'Zrušit', de:'Abbrechen'};
var delete_button_text={en:'Delete', sk:'Zmazať', cz:'Smazat', de:'Löschen'};
var save_button_text={en:'Save', sk:'Uložiť', cz:'Uložit', de:'Speichern'};
var save_message_text={en:'Wardrobe is saved', sk:'Šatník bol uložený', cz:'Skříň byla uložena', de:'Garderobe wurde gespeichert'};
var confirm_overwrite_text={
	en:'Do you realy want to overwrite wardrobe ',
	sk:'Naozaj chceš prepísať oblečenie s názvom ',
	cz:'Skutečně chceš přepsat oblečení pod názvem ',
	de:'Wollen Sie wirklich diese Garderobe überschreiben '
};
var save_choose_name_error_text={
	en:'You must pick "New name" or one existing wardrobe!',
	sk:'Najprv musíš vybrať položku "Nový názov" alebo už existujúcu položku!',
	cz:'Musíš nejdřív vybrat položku "Nový název" nebo už existující položku!',
	de:'Du musst "Neuer Name" oder eine bestehende Garderobe wählen! '
};
var save_invalid_name_error_text={
	en:'Wardrobe name contains invalid characters!',
	sk:'Názov oblečenia obsahuje neplatné znaky!',
	cz:'Název oblečení obsahuje neplatné znaky!',
	de:'Garderobe enthält ungültige Zeichen! '
};
var delete_choose_name_error_text={
	en:'You must pick existing wardrobe!',
	sk:'Najprv musíš vybrať položku!',
	cz:'Musíš nejdřív vybrat položku!',
	de:'Du musst eine bestehende Garderobe auswählen!'
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
var buttonImg='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';
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
	gInputElement.style.width = '123px';
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
	gInputElement.style.width = '127px';
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
		NECK      = 7;

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
	newLI.innerHTML='<a href="#"><img src="data:image/gif;base64,'+menuButtonImg+'" style="z-index:100"/><span style="width: 102px; color: rgb(255, 255, 255); display: block; z-index: 200; font-size: 13px; position: relative; top: -20px; text-align: center; left: 24px;">'+wardrobe_text[gLang]+'</span></a>';
	rightmenu.appendChild(newLI);

	var newDropDown = document.createElement('select');
	newDropDown.setAttribute('id', 'armorset_combobox');
	newDropDown.style.width = '127px';
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
	if (!isNull(unsafeWindow.Wear.wear.neck))      { l_neck      = unsafeWindow.Wear.wear.neck.get_short(); }
	
	setArmorSet(setName, l_animal+':'+l_body+':'+l_foot+':'+l_left_arm+':'+l_head+':'+l_yield+':'+l_right_arm+':'+l_neck);
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
	if (!confirm(confirm_overwrite_text[gLang] + '"' + setName + '" ?')) {
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
	nTable.setAttribute("style", "position: absolute; margin-left: 10px; margin-top: -5px;");
	invTargetPos.appendChild(nTable);

	var nTR = document.createElement('tr');
	nTable.appendChild(nTR);

	var nTD = document.createElement('td');
	nTR.appendChild(nTD);
	var nLabel = document.createElement('span');
	nLabel.innerHTML = wardrobe_text[gLang] + ':';
	nLabel.setAttribute("style", "font-weight:bold");
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
	ns.setAttribute("style", "cursor:pointer; width: 90px; color: rgb(255, 255, 255); display: block; z-index: 200; font-size: 15px; position: relative; top: -22px; text-align: center; left: 0px; font-weight: bold;");
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
	ns.setAttribute("style", "cursor:pointer; width: 90px; color: rgb(255, 255, 255); display: block; z-index: 200; font-size: 15px; position: relative; top: -22px; text-align: center; left: 0px; font-weight: bold;");
	ns.setAttribute("id", "wardrobe_cancelOrDelete_button");
	ns.addEventListener("click", removeArmor, false);
//	ns.addEventListener("click",function(){removeArmor();},false);
	ns.innerHTML = delete_button_text[gLang];
	nTD.appendChild(ns);
}



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