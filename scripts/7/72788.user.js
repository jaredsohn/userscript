// ==UserScript==
// @name           The-West ArmorSet
// @namespace      http://www.puli.sk
// @include        http://*.the-west.*/game.php*
// @include        http://zz1w1.tw.innogames.net/game.php*
// @version        1.1.1
// ==/UserScript==

// Created by Puli and partly modified by Muche and hunadmfkr

"use strict";

var wardrobe_text={en:'Wardrobe', sk:'Šatník', cz:'Skříň',hu:'Ruhatár'};
var new_name_text={en:'New name', sk:'Nový názov', cz:'Nový název',hu:'Új név'};
var cancel_button_text={en:'Cancel', sk:'Zrušiť', cz:'Zrušit',hu:'Mégse'};
var delete_button_text={en:'Delete', sk:'Zmazať', cz:'Smazat',hu:'Törlés'};
var save_button_text={en:'Save', sk:'Uložiť', cz:'Uložit',hu:'Mentés'};
var save_message_text={en:'Wardrobe is saved', sk:'Šatník bol uložený', cz:'Skříň byla uložena',hu:'Ruhatár elmentve'};
var confirm_overwrite_text={
	en:'Do you realy want to overwrite wardrobe ',
	sk:'Naozaj chceš prepísať oblečenie s názvom ',
	cz:'Skutečně chceš přepsat oblečení pod názvem ',
	hu:'Valóban felül kívánod írni az öltözetet '
};
var save_choose_name_error_text={
	en:'You must pick "New name" or one existing wardrobe!',
	sk:'Najprv musíš vybrať položku "Nový názov" alebo už existujúcu položku!',
	cz:'Musíš nejdřív vybrat položku "Nový název" nebo už existující položku!',
	hu:'Válaszd az "Új nevet" vagy egy létező öltözetet!'
};
var save_invalid_name_error_text={
	en:'Wardrobe name contains invalid characters!',
	sk:'Názov oblečenia obsahuje neplatné znaky!',
	cz:'Název oblečení obsahuje neplatné znaky!',
	hu:'Az öltözet neve érvénytelen karaktert tartalmaz'
};
var delete_choose_name_error_text={
	en:'You must pick existing wardrobe!',
	sk:'Najprv musíš vybrať položku!',
	cz:'Musíš nejdřív vybrat položku!',
	hu:'Válassz egy öltözetet!'
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