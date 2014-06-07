/*
Better Usenet (c) les-newsgroup 2014

Find more about Newsgroups here : http://www.les-newsgroup.fr

Find support for 'Better Usenet' on our forum : http://forum.les-newsgroup.fr


********* LICENSE*********

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.


********* METADATA *********
// ==UserScript==
// @name           Better Usenet
// @namespace      www.les-newsgroup.fr
// @description    Ajoute un tas d'ameliorations a Binnewz, Binsearch, NZBIndex and NZBClub. Telecharger plus facilement sur Usenet et les Newsgroups ...
// @match	*://*.binsearch.info/*
// @match	*://*.binnews.in/index.php*
// @match	*://*.binnews.in/_bin/liste.php*
// @match	*://*.binnews.in/_bin/lastrefs.php*
// @match	*://*.binnews.in/_bin/search.php*
// @match	*://*.binnews.in/_bin/search2.php*
// @match	*://*.nzbindex.com/index.php*
// @match	*://*.nzbindex.com/search/*
// @match	*://*.nzbclub.com/search*
// @exclude http*://*.binsearch.info/iframe.php
// @exclude http*://*.binsearch.info/similar.php*
// @exclude	http*://*.binnews.in/_bin/entete.php*
// @grant GM_setValue
// @grant GM_getValue
// @grant GM_registerMenuCommand 
// @grant GM_addStyle
// @grant GM_xmlhttpRequest
// @grant GM_log
// @require http://userscripts.org:8080/scripts/source/49700.user.js
// @version		1.932
// ==/UserScript==
*/

/* script 'Version Control' parameters */
var thisId=95746;		// your script userscript id
var thisVersion="1.932";		// the @version metadata value
var thisReleaseDate="20110203"; // release date of your script. Not mandatory, use this paramater
								// only if you want to be sharp on version control frequency.
/* script 'Version Control' parameters */

/*
*********CHANGELOG*********
//V1.932
//Correction - Général - Application d'une modification pour que Userscript.org soit à nouveau accessible (merci Clipper http://forum.les-newsgroup.fr/showthread.php?tid=13&pid=555#pid555)
//V1.931
//Correction - Binnews - COrrections de Better usenet afin de s'adapter aux modifications récentes de Binnews
//V1.93
//Ajout - Binnews - L'icone de récupération de la note d'une série ou d'un film s'affiche désormais sur les pages de recherches et celle des derniers référencements
//Ajout - Binnewz/NZBClub - Option pour que la partie supérieure de binnewz et nzbclub soit toujours affichée à l'écran (activé par défaut)
//Ajout - NZBClub - Icone 'Get NZB' ajouté dans la première colonne de gauche (beaucoup plus pratique comme ça)
//Modification - Binnews - Correction d'un bug visuel quand un résultat est isolé (en rouge clair) si il indique un password présent
//Modification - Better Usenet - quelques petites modifs cosmétiques et amélioration du code
//Modification - Better Usenet - les liens affichés dans le menu 'Better Usenet' ont changé (ajout du lien vers le site officiel)
//Modification - Binnewz - NZBClub, Yubse et NZBFriends gèrent mal les requetes de recherche dans lesquelles il y a '.part.nzb'. Désormais cette chaine de caractère est retirée lors de la gnération du lien sur Binnewz
//Modification - Binnewz - Dans le menu de configuration, les boutons 'save' et 'close' sont désormais toujour visibles, c'est plus pratique ainsi
//Modification - Binnewz/Binsearch/NZBIndex/NZBClub - Nouvelle option pour rendre fixe la barre de recherche (avec parfois le header complet) - Activé par défaut
//Modification - Binnewz - Correction visuelles du menu général de Binnewz (plus de barre blanche bizarre)
//Correction - NZBClub - Toutes les lignes de résultats n'étaient pas traitées ... c'est ok désormais !
//Correction - NZBClub - La coloration de la date ne se comportait pas comme attendu, c'est réglé
//V1.921
//Correction -- Bug avec le script qui permet de connaître quel navigateur est utilisé
//Correction - NZBClub -- Bug d'affichage de la barre 'Better Usenet'
//V1.92
//Modification -- Utilisation de la ressource 'GM_Config' via @require pour disposer de la dernière version tout le temps
//Modification -- Utilisation de @grant dans les METADATA sur les conseils de la doc Greasemonkey
//Modification - Binnewz -- Modification de la méthode d'affichage du bloc de liens vers les sites NZB : il n'y a desormais plus de perturbations visuelles en passant de ligne en ligne
//Modification - Binnewz -- Plus de récupération auto des notes.
//Modification - Binnewz -- Ajout d'un bouton 'Info' avec chaque bloc de liens NZB pour les films/animes/documentaires/séries. Cet icône déclenche la récupération manuelle de la note
//Modification - Binnewz -- Affichage d'un message sous le titre de l'éléménet si aucune notation n'a pu être trouvée (sûrement un problème de titre comportant des infos superflues)
//Modification - Binnewz -- Modification dans l'algo de recherche de notation de films/animes/docus
//Modification - Binnewz -- Remplacement de toutes les occurences de imdpapi.com par omdpapi.com
//Modification - Binnewz -- Suppression de la fonction 'addNextPageLinks' (suite à modification de la fonctionnalité 'page suivante/précédente' sur Binnewz)
//Modification - Binnewz -- Correction de bugs dans la récupération de la notation des séries
//Modification - Mysterbin -- Suppression de toute occurence de MysterBin car le site MysterBin a fermé
//Modification - Configuration -- NZBClub est séléctionné par défaut pour s'afficher sur Binnewz (aussi la mention '(pas conseillé)' à été retiré)
//Modification - NZBClub -- NZBClub est désormais modifié par Better Usenet comme Binsearch et NZBIndex
//Modification - Général -- Suppression de certaines options liées à des modifications de Binnewz, NZBIndex, Binsearch : ces modifications sont faites désormais par défaut
//Correction - Binsearch -- la dernière case du tableau de résultat était colorée même si l'age ne correspondait pas avec les infos provenant de Binnewz
//Suppression - Binnewz -- Yabsearch a été retiré (ne supporte plus les recherches externes)
//Modification - Binnewz -- Yubse est désormais affiché par défaut en lien NZB sur Binnewz
//Ajout - Binnewz -- Ajout de NZBFriends en lien NZB dans Binnews (désactivé par défaut car pas le plus efficace des indexeurs)
//V1.908
//CHROME-FIREFOX -- Correction - Binnewz : Résolution d'un problème d'affichage des liens NZB sur la page des derniers référencements
//CHROME-FIREFOX -- Correction - Binnewz : Résolution du problème de récupération de l'âge d'un référencement (pour le passer au site NZB afin de surligner la bonne ligne de résultat)
//CHROME-FIREFOX -- Correction - Binnewz : Amélioration de la partie 'Suppression publicité' sur Binnewz (fonctionne correctement sur Chrome aussi)  [la publicité sur binnewz est très intrusive depuis peu !]
//CHROME-FIREFOX -- Ajout - Binnewz : Ajout d'une nouvelle option (active par défaut) afin de créer près des liens NZB un lien pour remercier le posteur du référencement
//CHROME -- Correction - Binnewz : Bug sur la partie 'Recherche' et 'Derniers réf'
//CHROME -- Correction - Notation : Bug qui bloquait la récupération de la note d'un film ou d'une série
//CHROME -- Modification - General : Pas de vérification de mise à jour du script si le navigateur est Chrome
//V1.903
//Correction - Binnewz : correction suite à un changement sur le site binnewz
//Modification - General : Ajout d'un lien 'Changelog' à la barre d'options 'Better Usenet'
//V1.901
//Modification - Binnewz : Application d'une hauteur minimale aux lignes des résultats sur Binnewz pour un meilleur confort visuel au passage de la souris
//Modification - Compatibilité : Modification du code pour une prise en charge de Better Usenet dans Chrome
//Problème de compatibilité Chrome : La fonction de sélection utilisée sur Firefox pour sélectionner/désélectionner/inverser les résultats ne fonctionne pas sous Chrome.
//Modification - Options : j'ai retiré l'option de sélection des résultats par simple clic sur une ligne. Elle est intégrée par défaut pour tous les sites gérés
//Modification - Général : Suppression du message d'avertissement au premier lancement du script
//Modification - Général : modification des fonctions permettant de redimensionner les tableau de résultats des sites gérés
//Correction - MysterBin : Correction d'un bug qui bloquait la sélection en un clic des résultats de recherche de MysterBin
//V1.856
//Correction - Binnewz : Erreur qui plantait le script sur Binnewz
//V1.855
//Correction - Binnewz : L'age d'un post inférieur à 2 jours n'était pas recupéré correctement
//Correction - Binnewz : Les icones vers les moteurs NZB n'étaient pas placés correctement sur la page des derniers référencement
//Correction - Binnewz : Les urls vers Binsearch ont été nettoyé (paramètres en doublon)
//Modification - general : regroupement des options 'force ssl' en une unique option (activée par défaut) dans la catégories 'Options générales'
//Modification - general : regroupement des options 'delete add' en une unique option (activée par défaut) dans la catégories 'Options générales'
//V1.851
//Modification - Binnewz : Corrected several bugs with the new pages of Binnewz.in
//V1.850
//Correction - Binnewz : correction d'un bug apparu il y a quelques jours (la faute à 'imdbapi.com' qui a modifié son tableau JSON)
//V1.846
//Correction - Binnewz : corrected a bug when theres no ad displayed
//V1.845
//Correction - Binnewz : Correctly delete ad
//Modification - NZBIndex : Change URL of NZBIndex (now nzbindex.com)
//Modification - NZBIndex : Better Usenet now works with HTTPS version of NZBIndex, with or without subdomain, .nl or .com
//New Option - Binnewz : You can now search NZB files through Yubse 
//V1.842
//Correction - Binnewz : Bug with the nzb links added on binnewz
//V1.841
//Correction - Binnewz : Bug with the nzb links added on binnewz (for new users only)
//V1.84
//Modification - Binnewz : Changed the default place of NZB links: now it will be on the title column
//Modification - General : Now the auto update delay in days is 1 day. Up to you to change it but upgrades are fast and useful
//Modification - Binnewz : Little cosmetic changes with the display of second line for ratings (added margin-top & margin-left)
//Correction - Binnewz : Bug with the display of /5 or /10 with text ratings
//Correction - Binnewz : Bug with the auto update feature of Better Usenet in Binnewz
//Correction - Binnewz : Bug with NZB links on the last ref page
//V1.83
//New Option - Binnewz (Asked by community) : Now you can select where to display the NZB links : in the title column, in the file column or in the size column
//New Option - Binnewz (Asked by user solventAbuse) : Now, in Binnewz, for password protected or virus result, you can set if you want Better Usenet to display NZB Links or ratings
//Modification - Binnewz (Asked by user clainlaurent) : Now you can use Autopager plugin with Better Usenet & Binnewz 
//Modification - Binnewz : Modified the way binnewz results were processed (originally from Guile93)
//Modification - Binnewz : Now when there is '*' in the filename, it will not automatically be replaced. Because Binsearch can't use it, NZBIndex neither but it accepts space instead of *, and Mysterbin accepts it
//Modification - Binnewz : Added a verification for virus result (like for password protected results) : both are processed the same way
//V1.81
//Correction - Binnewz : There was a bug with the display of NZB Links in search page
//V1.8
//New Option - Debug : Created a Debug section in the config menu. 
//New Option - Debug : Added an option to display of debug messages (see debug() calls in source code, you can add your own)
//New Option - Debug : Added an option to show the execution time (in ms) of the script. It will be displayed at the right of the Better Usenet menu
//New Option - Binnewz / Binsearch / NZBIndex / MysterBin : If a result is password protected, the background of the row will be modified
//New Option - Binnewz - By Djeu : You can now select how to display ratings (text mode, graphical mode or both)
//New Option - Binnewz - By Djeu : This is a cosmetic option that lets you add '/10' or '/5' on the note (textmode)
//New Option - MysterBin : MysterBin offers a functionnality which can merge elements in group (not collection) and offers you to see the details of this group, and then you can download the NZB. With this new option, the script creates the group NZB link on the results page
//New Option - MysterBin : MysterBin can assemble elements together like collections. This new option let you select all the rows of these with only one click.
//Modification - Binnewz : Now the NZB links will be displayed inside the next cell ... for cosmetic purpose (ask for an option if you dont like it)
//Modification - Binnewz : Now you can hover a result row anywhere to display the nzb links (still at the same place)
//Modification - Binnewz : Now the links will be hidden if your move your mouse's cursor out of the result's row.
//Modification - Binnewz - By Djeu : Added a new function to format votes with thousand separator ... For cosmetic purpose
//Modification - Binnewz - By Djeu : Others little modifications in source code
//Modification - MysterBin : Changed the way that password protected elements are detected. Now each result containig 'password' in its details (not in the title) will be considered as a password protected element
//Modification : Now the Binnewz informations' block and the highlighting caption inserted on top of  Binsearch, NZBIndex and Mysterbin will only be displayed if the appropriate binnewz's option is checked
//Modification : Plus, now the highlighting caption inserted on top of these sites will only be displayed if there is a param 'sinceXdays' or 'fromGroups' in the url and that is not empty
//Correction - MysterBin : Now you can select each row one by one when there is multiples rows for one result (like in collections)
//Correction - MysterBin : a row was selected if the NZB image link was clicked. Row is no more selected from now.
//Correction - MysterBin : bug with the query input
//Correction - Ratings : Bug if using the Cook2 method to display ratings, and if ratings are displayed with 10 stars
//Correction - Binsearch / NZBIndex : Bug if number of results ending with 1 (11, 101, ...)
//Correction - Ratings : Problem with the link on ratings to imdb
//V1.7
//Now if the option 'display votes' in the rating section is unchecked, number of votes will still be displayed when hoovering the note
//Corrected a bug in Binnewz : the MysterBin's link is now displayed correctly when the associated option is checked
//Corrected a bug in Binnewz with the 'deleteAd' function
//V1.69
//Added compatibility with Firefox 4.*
//Added an option to delete the ad on Binnewz (default : false)
//Corrected a bug when the script autocheck the row if only one result (Binsearch, NZBIndex & MysterBin)
//Corrected a bug with the Cook2 feature
//Corrected several bugs with Binsearch when using Firefox 4.* (binsearch source code is different with FF 3.* & FF 4.*, or sometimes FF4.* may hang while theres no problem with FF3.*)
//Corrected a potential bug if 'binsearch_nzbbuttons' options was deactivated
//Corrected a bug with Binnewz when loading the index page
//Changed name of 'proceed_nzbindex_results', 'proceed_mysterbin_results' & 'make_nzb_buttons'  functions
//V1.65
//Added an option for the BetaSeries Ratings : Now you can choose if you want to fetch infos for the serie or for the episode - Default: Serie
//Added a one-time-displayed message box to warn user that other activated user scripts can interfere with Better Usenet
//Added an option for MysterBin : Delete the checkbox if result is password protected - Default: True
//Added an option for MysterBin : Delete the NZB image link if result is password protected - Default: True
//Added other indexer buttons on MysterBin if no results
//Added an option for Ratings : its a new way to calculate note depending of the number of votes. By Cook2 - Default: False
//Corrected a bug in Binnewz when the main frame is loaded alone (without top frame)
//Corrected a bug in Binnews (series' category) with the display of the title box of BetaSeries' ratings 
//Corrected a bug in NZBIndex modification when there is no result
//V1.6
//Added the GNU GPL License
//Added a new option to Binsearch, NZBIndex, & Mysterbin to select results by clicking a row (source code Johannes la Poutre : http://userscripts.org/scripts/review/3441)
//Changes functions called by buttons like 'Inverse', 'Select All' & 'Deselect All' so that they keep the new selection behavior (adapted a piece of code of Johannes la Poutre)
//Modified the hightlighting caption
//Added a new NZB search engine : MysterBin
// Comes with options you already know : delete_ad, scrolltoresults, force_ssl, resize_tabresults, integrateConfigurationMenu
//Added an 'Unselect All' button to NZBIndex buttons
//Cloned script-added inputs (Unselect All, Search on ..., View only collections) and added them on bottom of NZBIndex 
//Added an option for MysterBin to add other NZB Indexers buttons (NZBIndex & Binsearch)
//Added MysterBin to other NZB Indexers buttons (for Binsearch & NZBIndex)
//V1.6 End
//15-03-11 : Added ratings of series' episodes on Binnews (using Betaseries.com API)
//15-03-11 : Modified the configuration menu : You can activate the rating's fetching of IMDB & Betaseries separately. But they share the same options
//12-03-11 : Corrected a bug when updating the script to a new version with the 'Update' link on Binnewz (the script was loaded in the bottom frame instead of being installed) : added the '_parent' target to the link
//12-03-11 : Corrected a cosmetic bug in the InsertBinnewzSelection() function
//10-03-11 : Added reduced base64 img by Cook2
//10-03-11 : Corrected a bug with NZBindex and urls of others pages results
//07-03-11 : Changed the 'support forum' link in the 'Better Usenet' menubar
//07-03-11 : Added an option to NZBIndex to autoload the same search on Binsearch if no result
//07-03-11 : Changed the stars color of the IMDB rating. The more higher is the rating, the more red is the star. (works for 5 or 10 stars rating)
//07-03-11 : Some bug correction and I have moved the NZBIndex link (displayed in binnewz results, if checked) at first place.
//07-03-11 : with the help of Cook2 : done some cosmetic changes to IMDB rating feature
//07-03-11 : thanks to a proposition of Cook2 : added an option to display the IMDB rating with 5 or 10 stars (default : 5 stars)
//03-03-11 : Added an option to Binsearch to show only collections (you need the advanced search to be checked - this feature is not 100% complete for now)
//03-03-11 : Added an option to Binsearch to autoload NZBIndex search page if theres is no result and if there is no results with  'autoload other groups' feature (you need the 'autoload other groups' option to be checked)
//03-03-11 : Added an option for NZBIndex to increase the font size used for "Download" and "View collection" links (nzbindex default : 10 ; script default : 13)
//03-03-11 : Now if theres only one result on Binsearch or NZBIndex, checkbox is auto checked ... you just have to push the 'Create NZB' button
//03-03-11 : Now no modifications on Binsearch on other pages that normal results pages
//03-03-11 : Added the configuration menu to Binnewz website interface (on top right of the results)
//03-03-11 : Removed the configuration link within the Greasemonkey native menu ... now Better Usenet configuration links can only be accessed directly from Binnewz, Binsearch and NZBIndex
//03-03-11 : Added a new option to fetch IMDB ratings & votes and display it on every results in Binnewz from these categories : Movies, VO Movies, Animes, Documentaries. (Only on categorie results, not on search results)
//25-02-11 : Added an option for NZBIndex to add icons near the Size and Age colums to order the results (asc or desc)
//25-02-11 : Added an option for NZBIndex to display details about your search (filename, age and groups (if from binnewz)
//25-02-11 : Added a caption about highlighting colors of results
//25-02-11 : Added the missing 'resize' function to NZBIndex table results
//25-02-11 : Corrected a bug with the highlighting function of NZBindex results
//25-02-11 : Now links to others pages results at bottom of NZBINdex results page will be correct (url parameters added by the script were removed before that correction
//17-02-11 : Added a new option for Binnewz that let you accept a +- 1 day tolerance when determining if a result's age on Binsearch or NZBIndex is matching the Binnews' selection age
//17-02-11 : Added a new color option that applies to age cells highlighting when tolerance occurs. 
//17-02-11 : Resolved a problem with NZBIndex age cell highlighting (regexp)
//16-02-11 : Corrected a few bugs
//16-02-11 : Added a modification to NZBIndex to show the number of results hidden (if 'show only collections' is checked)
//15-02-11 : Added an option for NZBIndex to show collections of file only (you can also do this manually with a checkbox)
//15-02-11 : Corrected a few bugs
//14-02-11 : Added a test to correctly highlight an age's cell if it contains minutes and sinceXdays=0
//14-02-11 : Corrected a lot of bugs in the results hightlighting of binsearch & nzbindex (you'd better update !)
//11-02-11 : Bug correction when looking up for groups' of your selection in binnewz
//11-02-11 : Added the script version with the Better Usenet links
//11-02-11 : Added an option for Binsearch and NZBIndex to delete the yellow line inserted when there is old results (default : true)
//11-02-11 : Added a noresult button on NZBIndex if no result found
//11-02-11 : Modified some buttons' text
//11-02-11 : General : Added a _blank target to links in the updater window
//11-02-11 : General : Correted some misfunctions with the updater and other functions
//10-02-11 : Added a feature to NZBIndex to highlight age and/or group columns if they match with the binnewz selection
//10-02-11 : Added an option for NZBIndex to delete the download link if the result is 'password protected'
//10-02-11 : Added an option for NZBIndex to delete the checkbox selection if the result is 'password protected'
//10-02-11 : Added an option for NZBIndex to scroll to the results after loading the page (default : true)
//10-02-11 : Added an option for NZBIndex to resize the results table(default : true)
//10-02-11 : Added an option for NZBIndex to delete the ad banner (default : false)
//09-02-11 : General : Add a new website : nzbindex.nl
//09-02-11 : Added 'Better Usenet' menu on top of nzbindex
//09-02-11 : Added an option for NZBIndex to make the same search on Binsearch (default : true)
//09-02-11 : Bug - Binnewz : Corrected a bug in the search page
//09-02-11 : Added an option for Binsearch to delete the ad banner of page's results (default : false)
//09-02-11 : Added an option to manage the updater delay between automatic check of new update (in days  -  default : 3)
//09-02-11 : Added an option to manage the updater window autoclose timer (in seconds  -  default : 0 => no autoclose)
//09-02-11 : Updater : Changed the timer feature. Now the window update will not autoclose after X seconds
//09-02-11 : Updater : Correted a bug
//09-02-11 : Updater : Modified the display of the window 
//09-02-11 : Bug correction : Alert if no updates has been removed if automatic checking
//08-02-11 : Bug - Binsearch : A html page was loading after the normal one (a 'now loading' only html page). Now script escapes this page
//08-02-11 : Added a link to the configuration menu on top of Binsearch interface (section nammed 'Better Usenet')
//08-02-11 : Added a link to check for newupdate of 'Better Usenet' and changed the days frequency for the auto update feature (+1 day = 3days now)
//08-02-11 : Removed a feature that was here only for test purpose
//07-02-11 : Added an option for Binsearch & Binnewz that highlight group and age cells on Binsearch if they match with the group/age on Binnewz (need to use the nzb links dynamically create on Binnewz)
//07-02-11 : Changed the 'MAKE NZB LINKS' parts credits
//07-02-11 : Bug - Binsearch : Binsearch displays parts available in red sometimes when theres more parts available than needed. Now it is green.
//05-02-11 : Added an option for Binsearch that scroll to the search results on loading (default : true)
//04-02-11 : Modified the config CSS
//04-02-11 : Added an option for Binsearch that deletes a checkbox selection if there is a password (default : true)
//04-02-11 : Added an option for Binsearch that changes the color of NZB buttons create on every result (default : #EAD7D7)
//04-02-11 : Added an option for Binsearch that displays the number of missing parts (default : true)
//04-02-11 : If a new update is available, now you can close the alert window without having to wait till the countdown finishes or  having to click a link within the window
//04-02-11 : Binsearch : If there is no result, remove all buttons and only create 'Search on other/popular groups' and 'Search on other NZBIndexer site'
//04-02-11 : Added a 'Force SSL encryption with Binsearch'  [default : true]
//			If selected, Binsearch links on Binnewz will be 'https://' and every Binsearch page loaded with http:// will be automatically reloaded with 'https://'
//03-02-11 : Added GM_toolkit
//03-02-11 : Added localization support (fr, en - with a select option) [default : english]
//03-02-11 : Added Script Version Control 0.5  http://userscripts.org/scripts/show/35611
//			Now, Every 2 days, the script will verify itself if theres a newer version. If so, youll be able to see the new version, see its source code or install it.
//03-02-11 : Removed GM_config_extender (so removed fadeIn & FadeOut effect on configuration opening/closing)
*/




//http://userscripts.org/scripts/source/51832.user.js
//Integration de cette ressource dans le script (pour Chrome)

// =====================================[ String helpers ]===
// add prototype trim (taken from [uso:script:12107]
String.prototype.trim = function() { return this.replace(/^\s+|\s+$/, ''); };

// ======================================[ Array helpers ]===
/** Is the item part of the array?
 * @function in_array
 * @param mixed needle
 * @param array haystack
 * @return boolean
 */
function in_array(item,arr) {
  for(p=0;p<arr.length;p++) if (item == arr[p]) return true;
  return false;
}
/** Return all the keys of an array
 * @function array_keys
 * @param array arr
 * @return array keys
 */
function array_keys(arr) {
  var keys = new Array();
  for (key in arr) keys.push(key);
  return keys;
}
// ============================[ Common variables helper ]===
/** Is a given variable already defined?
 * Returns FALSE if any of the passed variables is not set,
 * TRUE if all passed variables are set. You can pass as many
 * arguments as you want, e.g. isset(o.var1,o.var2,o.var3)
 * REMEMBER: Checking isset(varname) when varname was not declared yields
 * an JS error "varname is not defined". Use window.varname instead.
 * @function isset
 * @param mixed varname
 * @return boolean
 */
function isset() {
  if (arguments.length===0) return false;
  for (var i=0;i<arguments.length;i++) {
    if (typeof(arguments[i])=='undefined'||arguments[i]===null) return false;
  }
  return true;
}
/** Escape RegExp special chars
 * @function escapeRegExp
 * @param string s
 * @return string escaped
 * @brief taken from Greasespot code snippets
 */
function escapeRegExp(s) {
  return s.replace(/([.*+?^${}()|[\]\/\\])/g, '\\$1');
}
/** Add style with !important rule to override page defaults
 * (adds "!important" to each rule)
 * @function addForcedStyle
 * @param string css
 * @brief taken from Greasespot code snippets
 */
function addForcedStyle(css) {
  GM_addStyle(css.replace(/;/g,' !important;'));
}
// ========================================[ DOM helpers ]===
/** Get elements by className
 * @function getElementsByClassName
 * @param string className
 * @param optional string tag restrict to specified tag
 * @param optional node restrict to childNodes of specified node
 * @return Array of nodes
 * @author Jonathan Snook, http://www.snook.ca/jonathan
 * @author Robert Nyman, http://www.robertnyman.com
 */
function getElementsByClassName(className, tag, elm){
  var testClass = new RegExp("(^|\\s)" + className + "(\\s|$)");
  var tag = tag || "*";
  var elm = elm || document;
  var elements = (tag == "*" && elm.all)? elm.all : elm.getElementsByTagName(tag);
  var returnElements = [];
  var current;
  var length = elements.length;
  for(var i=0; i<length; i++){
    current = elements[i];
    if(testClass.test(current.className)){
      returnElements.push(current);
    }
  }
  return returnElements;
}
/** Get elements whose id matches the given regexp
 * @function getElementsByIdRegExp
 * @param RegExp regex
 * @param optional string tag restrict to specified tag
 * @param optional node restrict to childNodes of specified node
 * @return Array nodes
 * @author Arthaey Angosii http://userscripts.org:8080/users/4440
 * @author Izzy http://userscripts.org:8080/users/izzysoft
 */
function getElementsByIdRegExp(regex,tag,elm) {
  var matchingElements = [];
  if (!regex) return matchingElements;

  tag = tag || '*';
  elm = elm || document;
  var elements = (tag=='*' && elm.all)? elm.all : elm.getElementsByTagName(tag);
  for (var i = 0; i < elements.length; i++)
    if (elements[i].id.match(regex))
      matchingElements.push(elements[i]);
  return matchingElements;
}

/** Append an element to a given node
 * @function appendElement
 * @param string nodeID ID of parentNode
 * @param string tag nodeType
 * @param string id ID for the new node
 * @param string className
 * @param string textVal innerHTML
 * @param boolean retEl return the created element?
 */
function appendElement(node,tag,id,classnam,textVal,retEl) {
  if (!document.getElementById(node)) return;
  try {
    var el = document.createElement(tag);
  } catch(e) {
    return;
  }
  id ? el.id = id : null;
  classnam ? el.className = classnam : null;
  el.innerHTML = (textVal ? textVal : '');
  var retNode = document.getElementById(node).appendChild(el);
  if (retEl) return retNode;
}
/** Create new element
 * Example call: var styles = createElement('link', {rel: 'stylesheet', type: 'text/css', href: basedir + 'style.css'});
 * @function createElement
 * @param string type e.g. 'link', 'a', 'p'
 * @param object attributes
 * @return node
 * @brief taken from Greasespot code snippets
 */
function createElement(type, attributes){
 var node = document.createElement(type);
 for (var attr in attributes) if (attributes.hasOwnProperty(attr)){
  node.setAttribute(attr, attributes[attr]);
 }
 return node;
}
/** Insert a node after another
 * @function insertAfter
 * @param node newNode
 * @param node before
 * @brief taken from Greasespot code snippets
 */
function insertAfter(newNode, node) {
  return node.parentNode.insertBefore(newNode, node.nextSibling);
}
/** Remove an element by ID
 * @function removeElementById
 * @param mixed id string for ID or the node itself
 * @return boolean success
 */
function removeElementById(id) {
  if (!id) return;
  var node = (typeof(id)=='string') ? document.getElementById(id) : id;
  var res = node.parentNode.removeChild(node);
  if (res) return true;
  return false;
}
/** Remove an element by name
 * @function removeElementByName
 * @param string name name of the element to remove (or the node itself)
 * @return boolean success
 */
function removeElementByName(nam) {
  if (!nam) return;
  var node = (typeof(id)=='string') ? document.getElementByName(nam) : nam;
  var res = node.parentNode.removeChild(node);
  if (res) return true;
  return false;
}
/** Remove elements by className
 * @function removeElementsByClassName
 * @param string className
 * @param optional ancestor (default: document)
 * @return boolean success FALSE if one or more elements failed or none found
 */
function removeElementsByClassName(cname,node) {
  node = node || document;
  var elms = node.getElementsByClassName(cname);
  if (elms.length<1) return false;
  for (var i=0;i<elms.length;i++)
    if ( !removeElementById(elms[i]) ) return false;
  return true;
}
/** Remove elements by tag name
 * @function removeElementsByTagName
 * @param string tag name
 * @param optional node ancestor (default: document)
 * @return boolean success FALSE if one or more elements failed or none found
 */
function removeElementsByTagName(tag,node) {
  if (!tag) return false;
  var node = node || document;
  var elms = node.getElementsByTagName(tag);
  if (elms.length<1) return false;
  for (var i=0;i<elms.length;i++)
    if ( !removeElementById(elms[i]) ) return false;
  return true;
}
/** Get next sibling skipping possible whiteSpace(s) in between
 * @function nextSibling
 * @param node startSib
 * @return mixed nextSibling node when found, FALSE otherwise
 * @brief taken from Greasespot code snippets
 */
function nextSibling(startSib) {
  if (!(nextSib=startSib.nextSibling)) return false;
  while (nextSib.nodeType!=1) if (!(nextSib=nextSib.nextSibling)) return false;
  return nextSib;
}
// =======================================[ Translations ]===
/** Translation class
 * @class GM_trans
 */
GM_trans = {
  /** Set desired language
   * @method setLang
   * @param string lang 2-char language code
   */
  setLang: function(lng) {
    this.trans.useLang = lng;
  },
  /** Translations
   * @attribute object trans
   */
  trans: {
    useLang: 'en'
  },
  /** Translate a given string
   * @method lang
   * @param string term to translate
   * @param optional array replaces
   * @return string translated term
   */
  lang: function(term) {
    if (!term) return '';
    var res;
    if (this.trans[this.trans.useLang][term]) res = this.trans[this.trans.useLang][term];
    else if (this.trans['en'][term]) res = this.trans['en'][term];
    else return term;
    if (typeof(arguments[1])!="object") return res;
    for (var i=0;i<arguments[1].length;i++) {
      res = res.replace('%'+(i+1),arguments[1][i]);
    }
    return res;
  },
  /** Set translations for a given language
   * @method setTranslations
   * @param string lang 2-char language code
   * @param object trans translations { string term: string translation }
   */
  setTranslations: function(lang,trans) {
    if (typeof(this.trans[lang])!="object") { // new language?
      this.trans[lang] = trans;
      return;
    }
    for (attrname in trans) { this.trans[lang][attrname] = trans[attrname]; }
  }
}
// ========================[ GreaseMonkey specific stuff ]===
/** Generate a toggle menu entry in the user script menu
 * Useful for booleans, like toggling a feature on/off
 * @function makeMenuToggle
 * @param string key name of the variable to toggle
 * @param boolean defaultVal default value if variable did not exist
 * @param string toggleOn what to display for toggleOn
 * @param string toggleOf what to display for toggleOff
 * @param optional string prefix what to display in front of toggleOn/toggleOff
 * @brief taken from Greasespot code snippets
 */
function makeMenuToggle(key, defaultValue, toggleOn, toggleOff, prefix) {
  // Load current value into variable
  window[key] = getValue(key, defaultValue);
  // Add menu toggle
  GM_registerMenuCommand((prefix ? prefix+": " : "") + (window[key] ? toggleOff : toggleOn), function() {
    GM_setValue(key, !window[key]);
    location.reload();
  });
}

// ==============================[ Miscellaneous helpers ]===
/** Add Script element to the web page
 * @function GMT_addScript
 * @param string script
 * @return boolean success
 * @author JoeSimmons http://userscripts.org:8080/users/JoeSimmons
 * @author Izzy http://userscripts.org:8080/users/izzysoft
 */
function GMT_addScript(script) {
  if ( script && (h=document.getElementsByTagName('head')[0]) ) {
    var aS = document.createElement('script');
    aS.type = 'text/javascript';
    aS.innerHTML = script;
    var res = h.appendChild(aS);
    if (res) return true;
  }
  return false;
}
/** Debug logging
 * Sends the supplied arguments to GM_log only if a global variable DEBUG
 * exists and is set to TRUE or 1
 * @function debug
 * @param mixed msg what to log
 */
function debug(msg) {
  if (typeof(DEBUG)!='undefined' && DEBUG) GM_log(msg);
}




//http://userscripts.org/scripts/source/49700.user.js
//Integration de cette ressource dans le script (pour Chrome)

/* Instructions
GM_config is now cross-browser compatible.

To use it in a Greasemonkey-only user script you can just @match it.

To use it in a cross-browser user script you will need to manually
include the code at the beginning of your user script. In this case
it is also very important you change the "storage" value below to
something unique to prevent collisions between scripts. Also remeber
that in this case that stored settings will only be accessable on
the same domain they were saved.
*/

String.prototype.find = function(s) {
return (this.indexOf(s) != -1);
};

var GM_config = {
 storage: 'GM_config', // This needs to be changed to something unique for localStorage
 init: function() {
        // loop through GM_config.init() arguements
	for(var i=0,l=arguments.length,arg; i<l; ++i) {
		arg=arguments[i];
		switch(typeof arg) {
            case 'object': for(var j in arg) { // could be a callback functions or settings object
							switch(j) {
							case "open": GM_config.onOpen=arg[j]; delete arg[j]; break; // called when frame is gone
							case "close": GM_config.onClose=arg[j]; delete arg[j]; break; // called when settings have been saved
							case "save": GM_config.onSave=arg[j]; delete arg[j]; break; // store the settings objects
							default: var settings = arg;
							}
			} break;
            case 'function': GM_config.onOpen = arg; break; // passing a bare function is set to open
                        // could be custom CSS or the title string
			case 'string': if(arg.indexOf('{')!=-1&&arg.indexOf('}')!=-1) var css = arg;
				else GM_config.title = arg;
				break;
		}
	}
	if(!GM_config.title) GM_config.title = 'Settings - Anonymous Script'; // if title wasn't passed through init()
	var stored = GM_config.read(); // read the stored settings
	GM_config.passed_values = {};
	for (var i in settings) {
	GM_config.doSettingValue(settings, stored, i, null, false);
	if(settings[i].kids) for(var kid in settings[i].kids) GM_config.doSettingValue(settings, stored, kid, i, true);
	}
	GM_config.values = GM_config.passed_values;
	GM_config.settings = settings;
	if (css) GM_config.css.stylish = css;
 },
 open: function() {
 if(document.evaluate("//iframe[@id='GM_config']",document,null,9,null).singleNodeValue) return;
	// Create frame
	document.body.appendChild((GM_config.frame=GM_config.create('iframe',{id:'GM_config', style:'position:fixed; top:0; left:0; opacity:0; display:none; z-index:999; width:75%; height:75%; max-height:95%; max-width:95%; border:1px solid #000000; overflow:auto;'})));
        GM_config.frame.src = 'about:blank'; // In WebKit src cant be set until it is added to the page
	GM_config.frame.addEventListener('load', function(){
		var obj = GM_config, frameBody = this.contentDocument.getElementsByTagName('body')[0], create=obj.create, settings=obj.settings;
		obj.frame.contentDocument.getElementsByTagName('head')[0].appendChild(create('style',{type:'text/css',textContent:obj.css.basic+obj.css.stylish}));

		// Add header and title
		frameBody.appendChild(create('div', {id:'header',className:'config_header block center', innerHTML:obj.title}));

		// Append elements
		var anch = frameBody, secNo = 0; // anchor to append elements
		for (var i in settings) {
			var type, field = settings[i], value = obj.values[i];
			if (field.section) {
				anch = frameBody.appendChild(create('div', {className:'section_header_holder', id:'section_'+secNo, kids:new Array(
				  create('a', {className:'section_header center', href:"javascript:void(0);", id:'c_section_kids_'+secNo, textContent:field.section[0], onclick:function(){GM_config.toggle(this.id.substring(2));}}),
				  create('div', {id:'section_kids_'+secNo, className:'section_kids', style:obj.getValue('section_kids_'+secNo, "none")=="none"?"display: none;":""})
				  )}));
				if(field.section[1]) anch.appendChild(create('p', {className:'section_desc center',innerHTML:field.section[1]}));
				secNo++;
			}
			anch.childNodes[1].appendChild(GM_config.addToFrame(field, i, false));
		}

		// Add save and close buttons
		frameBody.appendChild(obj.create('div', {id:'buttons_holder', kids:new Array(
			obj.create('button',{id:'saveBtn',textContent:'Save',title:'Save options and close window',className:'saveclose_buttons',onclick:function(){GM_config.close(true)}}),
			obj.create('button',{id:'cancelBtn', textContent:'Cancel',title:'Close window',className:'saveclose_buttons',onclick:function(){GM_config.close(false)}}),
			obj.create('div', {className:'reset_holder block', kids:new Array(
				obj.create('a',{id:'resetLink',textContent:'Restore to default',href:'#',title:'Restore settings to default configuration',className:'reset',onclick:obj.reset})
		)}))}));

		obj.center(); // Show and center it
		window.addEventListener('resize', obj.center, false); // Center it on resize
		if (obj.onOpen) obj.onOpen(); // Call the open() callback function
		
		// Close frame on window close
		window.addEventListener('beforeunload', function(){GM_config.remove(this);}, false);
	}, false);
 },
 close: function(save) {
	if(save) {
		var type, fields = GM_config.settings, typewhite=/radio|text|hidden|checkbox/;
		for(f in fields) {
			var field = GM_config.frame.contentDocument.getElementById('field_'+f), kids=fields[f].kids;
			if(!field.className.find("separator")) {
				if(typewhite.test(field.type)) type=field.type;
					else type=field.tagName.toLowerCase();
				GM_config.doSave(f, field, type);
				if(kids) for(var kid in kids) {
					var field = GM_config.frame.contentDocument.getElementById('field_'+kid);
					if(typewhite.test(field.type)) type=field.type;
						else type=field.tagName.toLowerCase();
					GM_config.doSave(kid, field, type, f);
				}
			}
		}
                if(GM_config.onSave) GM_config.onSave(); // Call the save() callback function
                GM_config.save();
	}
	if(GM_config.frame) GM_config.remove(GM_config.frame);
	delete GM_config.frame;
        if(GM_config.onClose) GM_config.onClose(); //  Call the close() callback function
 },
 set: function(name,val) {
	GM_config.values[name] = val;
 },
 get: function(name) {
	return GM_config.values[name];
 },
 isGM: typeof GM_getValue != 'undefined' && typeof GM_getValue('a', 'b') != 'undefined',
 log: (this.isGM) ? GM_log : ((window.opera) ? opera.postError : console.log),
 getValue : function(name, def) { return (this.isGM?GM_getValue:(function(name,def){return localStorage.getItem(name)||def}))(name, def||""); },
 setValue : function(name, value) { return (this.isGM?GM_setValue:(function(name,value){return localStorage.setItem(name,value)}))(name, value||""); },
 save: function(store, obj) {
    try {
      var val = JSON.stringify(obj||GM_config.values);
      GM_config.setValue((store||GM_config.storage),val);
    } catch(e) {
      GM_config.log("GM_config failed to save settings!");
    }
 },
 read: function(store) {
    try {
      var val = GM_config.getValue((store||GM_config.storage), '{}'), rval = JSON.parse(val);
    } catch(e) {
      GM_config.log("GM_config failed to read saved settings!");
      rval = {};
    }
    return rval;
 },
 reset: function(e) {
	e.preventDefault();
	var type, obj = GM_config, fields = obj.settings;
	for(f in fields) {
		var field = obj.frame.contentDocument.getElementById('field_'+f), kids=fields[f].kids;
		if(field.type=='radio'||field.type=='text'||field.type=='checkbox') type=field.type;
		else type=field.tagName.toLowerCase();
		GM_config.doReset(field, type, null, f, null, false);
		if(kids) for(var kid in kids) {
			var field = GM_config.frame.contentDocument.getElementById('field_'+kid);
			if(field.type=='radio'||field.type=='text'||field.type=='checkbox') type=field.type;
		else type=field.tagName.toLowerCase();
			GM_config.doReset(field, type, f, kid, true);
			}
	}
 },
 addToFrame : function(field, i, k) {
	var elem, obj = GM_config, anch = GM_config.frame, value = obj.values[i], Options = field.options, label = field.label, create=GM_config.create, isKid = k!=null && k===true;
		switch(field.type) {
				case 'separator': elem = create("span", {textContent:label, id:'field_'+i, className:'field_label separator'});
					break;
				case 'textarea':
					elem = create(isKid ? "span" : "div", {title:field.title||'', kids:new Array(
						create('span', {textContent:label, className:'field_label'}),
						create('textarea', {id:'field_'+i,innerHTML:value, cols:(field.cols?field.cols:20), rows:(field.rows?field.rows:2)})
					), className: 'config_var'});
					break;
				case 'radio':
					var boxes = new Array();
					for (var j = 0,len = Options.length; j<len; j++) {
						boxes.push(create('span', {textContent:Options[j]}));
						boxes.push(create('input', {value:Options[j], type:'radio', name:i, checked:Options[j]==value?true:false}));
					}
					elem = create(isKid ? "span" : "div", {title:field.title||'', kids:new Array(
						create('span', {textContent:label, className:'field_label'}),
						create('span', {id:'field_'+i, kids:boxes})
					), className: 'config_var'});
					break;
				case 'select':
					var options = new Array();
					if(!Options.inArray) for(var j in Options) options.push(create('option',{textContent:Options[j],value:j,selected:(j==value)}));
						else options.push(create("option", {textContent:"Error - options needs to be an object type, not an array.",value:"error",selected:"selected"}));
					elem = create(isKid ? "span" : "div", {title:field.title||'', kids:new Array(
						create('span', {textContent:label, className:'field_label'}),
						create('select',{id:'field_'+i, kids:options})
					), className: 'config_var'});
					break;
				case 'checkbox':
					elem = create(isKid ? "span" : "div", {title:field.title||'', kids:new Array(
						create('label', {textContent:label, className:'field_label', "for":'field_'+i}),
						create('input', {id:'field_'+i, type:'checkbox', value:value, checked:value})
					), className: 'config_var'});
					break;
				case 'button':
				var tmp;
					elem = create(isKid ? "span" : "div", {kids:new Array(
						(tmp=create('input', {id:'field_'+i, type:'button', value:label, size:(field.size?field.size:25), title:field.title||''}))
					), className: 'config_var'});
					if(field.script) obj.addEvent(tmp, 'click', field.script);
					break;
				case 'hidden':
				elem = create(isKid ? "span" : "div", {title:field.title||'', kids:new Array(
						create('input', {id:'field_'+i, type:'hidden', value:value})
					), className: 'config_var'});
					break;
				default:
					elem = create(isKid ? "span" : "div", {title:field.title||'', kids:new Array(
						create('span', {textContent:label, className:'field_label'}),
						create('input', {id:'field_'+i, type:'text', value:value, size:(field.size?field.size:25)})
					), className: 'config_var'});
			}
	if(field.kids) {
	var kids=field.kids;
	for(var kid in kids) elem.appendChild(GM_config.addToFrame(kids[kid], kid, true));
	}
return elem;
},
 doSave : function(f, field, type, oldf) {
 var isNum=/^[\d\.]+$/, set = oldf ? GM_config.settings[oldf]["kids"] : GM_config.settings;
 switch(type) {
				case 'text':
					GM_config.values[f] = ((set[f].type=='text') ? field.value : ((isNum.test(field.value) && ",int,float".indexOf(","+set[f].type)!=-1) ? parseFloat(field.value) : false));
					if(set[f]===false) {
						alert('Invalid type for field: '+f+'\nPlease use type: '+set[f].type);
						return;
					}
					break;
				case 'hidden':
					GM_config.values[f] = field.value.toString();
					break;
				case 'textarea':
					GM_config.values[f] = field.value;
					break;
				case 'checkbox':
					GM_config.values[f] = field.checked;
					break;
				case 'select':
					GM_config.values[f] = field.options[field.selectedIndex].value;
					break;
				case 'span':
					var radios = field.getElementsByTagName('input');
					if(radios.length>0) for(var i=radios.length-1; i>=0; i--) {
						if(radios[i].checked) GM_config.values[f] = radios[i].value;
					}
					break;
			}
 },
 doSettingValue : function(settings, stored, i, oldi, k) {
		var set = k!=null && k==true && oldi!=null ? settings[oldi]["kids"][i] : settings[i];
			if(",save,open,close".indexOf(","+i) == -1) {
            // The code below translates to:
            // if a setting was passed to init but wasn't stored then 
            //      if a default value wasn't passed through init() then use null
            //      else use the default value passed through init()
            // 		else use the stored value
            try {
            var value = (stored[i]==null || typeof stored[i]=="undefined") ? ((set["default"]==null || typeof set["default"]=="undefined") ? null : (set["default"])) : stored[i];
			} catch(e) {
			var value = stored[i]=="undefined" ? (set["default"]=="undefined" ? null : set["default"]) : stored[i];
			}
            
            // If the value isn't stored and no default was passed through init()
            // try to predict a default value based on the type
            if (value === null) {
                switch(set["type"]) {
                    case 'radio': case 'select':
                        value = set.options[0]; break;
                    case 'checkbox':
                        value = false; break;
                    case 'int': case 'float':
                        value = 0; break;
                    default:
					value = (typeof stored[i]=="function") ? stored[i] : "";
                }
			}
			
			}
	GM_config.passed_values[i] = value;
 },
 doReset : function(field, type, oldf, f, k) {
 var isKid = k!=null && k==true, obj=GM_config,
	 set = isKid ? obj.settings[oldf]["kids"][f] : obj.settings[f];
 switch(type) {
			case 'text':
				field.value = set['default'] || '';
				break;
			case 'hidden':
				field.value = set['default'] || '';
				break;
			case 'textarea':
				field.value = set['default'] || '';
				break;
			case 'checkbox':
				field.checked = set['default'] || false;
				break;
			case 'select':
				if(set['default']) {
					for(var i=field.options.length-1; i>=0; i--)
					if(field.options[i].value==set['default']) field.selectedIndex=i;
				}
				else field.selectedIndex=0;
				break;
			case 'span':
				var radios = field.getElementsByTagName('input');
				if(radios.length>0) for(var i=radios.length-1; i>=0; i--) {
					if(radios[i].value==set['default']) radios[i].checked=true;
				}
				break;
		}
 },
 values: {},
 settings: {},
 css: {
 basic: 'body {background:#FFFFFF;}\n' +
 '.indent40 {margin-left:40%;}\n' +
 '* {font-family: arial, tahoma, sans-serif, myriad pro;}\n' +
 '.field_label {font-weight:bold; font-size:12px; margin-right:6px;}\n' +
 '.block {display:block;}\n' +
 '.saveclose_buttons {\n' +
 'margin:16px 10px 10px 10px;\n' +
 'padding:2px 12px 2px 12px;\n' +
 '}\n' +
 '.reset, #buttons_holder, .reset a {text-align:right; color:#000000;}\n' +
 '.config_header {font-size:20pt; margin:0;}\n' +
 '.config_desc, .section_desc, .reset {font-size:9pt;}\n' +
 '.center {text-align:center;}\n' +
 '.section_header_holder {margin-top:8px;}\n' +
 '.config_var {margin:0 0 4px 0; display:block;}\n' +
 '.section_header {font-size:13pt; background:#414141; color:#FFFFFF; border:1px solid #000000; margin:0;}\n' +
 '.section_desc {font-size:9pt; background:#EFEFEF; color:#575757; border:1px solid #CCCCCC; margin:0 0 6px 0;}\n' +
 'input[type="radio"] {margin-right:8px;}\n'+
 '#saveBtn {position:fixed; top:100px; right:175px;}\n'+
 '#cancelBtn {position:fixed; top:100px; right:75px;}\n'+
 '.reset_holder {position:fixed;top:150px;right:100px;}\n',
 stylish: ''},
 create: function(a,b) {
	var ret=window.document.createElement(a);
	if(b) for(var prop in b) {
		if(prop.indexOf('on')==0) ret.addEventListener(prop.substring(2),b[prop],false);
		else if(prop=="kids" && (prop=b[prop])) for(var i=0; i<prop.length; i++) ret.appendChild(prop[i]);
		else if(",style,accesskey,id,name,src,href,for".indexOf(","+prop.toLowerCase())!=-1) ret.setAttribute(prop, b[prop]);
		else ret[prop]=b[prop];
	}
	return ret;
 },
 center: function() {
	var node = GM_config.frame, style = node.style, beforeOpacity = style.opacity;
	if(style.display=='none') style.opacity='0';
	style.display = '';
	style.top = Math.floor((window.innerHeight/2)-(node.offsetHeight/2)) + 'px';
	style.left = Math.floor((window.innerWidth/2)-(node.offsetWidth/2)) + 'px';
	style.opacity = '1';
 },
 run: function() {
    var script=GM_config.getAttribute('script');
    if(script && typeof script=='string' && script!='') {
      func = new Function(script);
      window.setTimeout(func, 0);
    }
 },
 addEvent: function(el,ev,scr) { el.addEventListener(ev, function() { typeof scr == 'function' ? window.setTimeout(scr, 0) : eval(scr) }, false); },
 remove: function(el) { if(el && el.parentNode) el.parentNode.removeChild(el); },
 toggle : function(e) {
	var node=GM_config.frame.contentDocument.getElementById(e);
	node.style.display=(node.style.display!='none')?'none':'';
	GM_config.setValue(e, node.style.display);
 },
};



//Browser detection : credits http://www.quirksmode.org/js/detect.html
var BrowserDetect = {
	init: function () {
		this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
		this.version = this.searchVersion(navigator.userAgent)
			|| this.searchVersion(navigator.appVersion)
			|| "an unknown version";
		this.OS = this.searchString(this.dataOS) || "an unknown OS";
	},
	searchString: function (data) {
		for (var i=0;i<data.length;i++)	{
			var dataString = data[i].string;
			var dataProp = data[i].prop;
			this.versionSearchString = data[i].versionSearch || data[i].identity;
			if (dataString) {
				if (dataString.indexOf(data[i].subString) != -1)
					return data[i].identity;
			}
			else if (dataProp)
				return data[i].identity;
		}
	},
	searchVersion: function (dataString) {
		var index = dataString.indexOf(this.versionSearchString);
		if (index == -1) return;
		return parseFloat(dataString.substring(index+this.versionSearchString.length+1));
	},
	dataBrowser: [
		{
			string: navigator.userAgent,
			subString: "Chrome",
			identity: "Chrome"
		},
		{ 	string: navigator.userAgent,
			subString: "OmniWeb",
			versionSearch: "OmniWeb/",
			identity: "OmniWeb"
		},
		{
			string: navigator.vendor,
			subString: "Apple",
			identity: "Safari",
			versionSearch: "Version"
		},
		{
			prop: window.opera,
			identity: "Opera"
		},
		{
			string: navigator.vendor,
			subString: "iCab",
			identity: "iCab"
		},
		{
			string: navigator.vendor,
			subString: "KDE",
			identity: "Konqueror"
		},
		{
			string: navigator.userAgent,
			subString: "Firefox",
			identity: "Firefox"
		},
		{
			string: navigator.vendor,
			subString: "Camino",
			identity: "Camino"
		},
		{		// for newer Netscapes (6+)
			string: navigator.userAgent,
			subString: "Netscape",
			identity: "Netscape"
		},
		{
			string: navigator.userAgent,
			subString: "MSIE",
			identity: "Explorer",
			versionSearch: "MSIE"
		},
		{
			string: navigator.userAgent,
			subString: "Gecko",
			identity: "Mozilla",
			versionSearch: "rv"
		},
		{ 		// for older Netscapes (4-)
			string: navigator.userAgent,
			subString: "Mozilla",
			identity: "Netscape",
			versionSearch: "Mozilla"
		}
	],
	dataOS : [
		{
			string: navigator.platform,
			subString: "Win",
			identity: "Windows"
		},
		{
			string: navigator.platform,
			subString: "Mac",
			identity: "Mac"
		},
		{
			   string: navigator.userAgent,
			   subString: "iPhone",
			   identity: "iPhone/iPod"
	    },
		{
			string: navigator.platform,
			subString: "Linux",
			identity: "Linux"
		}
	]

};

BrowserDetect.init();

 //////-------------------------\\\\\\\
/////START OF BETTER USENET SCRIPT\\\\\\
///////-------------------------////////


/********** DEBUG **********/
var DEBUG=GM_config.read().debug_log; //evaluated  by every 'debug' function

//You want to know hwo long took the script ? Activate the option in config menu
var myDebugDate=new Date();
startExec=myDebugDate.getSeconds()*1000 + myDebugDate.getMilliseconds();
/********** SCRIPT VERSION CONTROL 0.5 *************/
/* Any help about this functions can be found at
http://sylvain.comte.online.fr/AirCarnet/?post/GreaseMonkey-Script-Update-Control
*/

//Added by les-newsgroup
if (GM_config.read()['updater_timer'])
	var GMSUCtime=parseInt(GM_config.read()['updater_timer']);   
else var GMSUCtime=0;
//GMSUCtime :
// Delay before alert disapears (seconds)
// set to 0 if you don't want it to disapear (might be a bit intrusive!)

//Added by les-newsgroup             
if (GM_config.read()['updater_delay'])
	var GMSUCfreq=parseInt(GM_config.read()['updater_delay']);   
else var GMSUCfreq=3;			 
//GMSUCfreq  ==>  Update control frequency (days)

/* colorpalettes */
	// feel free to create your own. color in this order : back, highlight, front, light.
	//var cpChrome=new colorPalette("#E1ECFE","#FD2","#4277CF","#FFF");	// but for Firefox ;-)
	//var cpUserscript=new colorPalette("#000","#F80","#FFF","#EEE");		// javascrgeek only
	//var cpFlickr=new colorPalette("#FFF","#FF0084","#0063DC","#FFF");	// pink my blue
	var cpNG=new colorPalette("#616060","#F80","#FFF","#EEE");		// Les-Newsgroup palette
// choose yours
var GMSUCPal=cpNG; 	// colorPalette you prefer

/* launching script version control  */
if(BrowserDetect.browser!='Chrome') GM_scriptVersionControl();

// define launch function
function GM_scriptVersionControl() {
		// test if script should be performed to control new release regarding frequency
		var GMSUCreleaseDate=new Date();
		GMSUCreleaseDate.setFullYear(eval(thisReleaseDate.substring(0,4)),eval(thisReleaseDate.substring(4,6))-1,eval(thisReleaseDate.substring(6,8)));
		var GMSUCtoday=new Date(); var GMSUCdif=Math.floor((GMSUCtoday-GMSUCreleaseDate)/1000/60/60/24);
		if (GMSUCdif%GMSUCfreq==0) {
			GMSUC_Control(0);
		}
}

// define control function
function GMSUC_Control(force) { //force parameter : Added by les-newsgroup
	var scriptId=thisId;var version=thisVersion;
	var scriptUrl="http://userscripts.org:8080/scripts/source/"+scriptId+".meta.js";
	// go to script home page to get official release number and compare it to current one
	GM_xmlhttpRequest({
		method: 'GET',
		url: scriptUrl,
		headers: {
			 'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3',
			 'Accept': 'text/html,application/xml,text/xml',
			 },
		onload: function(responseDetails) {
			var textResp=responseDetails.responseText;
			var offRel=/\/\/\s*@version\s*(.*)\s*\n/i.exec(textResp);
			if(offRel==null){ //Ce test est nécessaire car userscripts est quelque fois inaccessible
				if (force) alert("No Updates");
				return 0;
			}
			offRel=offRel[1];
			var scriptName=/\/\/\s*@name\s*(.*)\s*\n/i.exec(textResp)[1];
			if(offRel>version) {
				// Styling
				GM_addStyle("#GMSUC-alerte {position:fixed;z-index:1000;top:156px;left:50%;margin:20px 0 0 -128px;padding:6px;width:250px;-moz-border-radius:6px;background:"+GMSUCPal.back+";border:"+GMSUCPal.light+" 1px solid;color:"+GMSUCPal.front+";font-size:1em;text-align:center} #GMSUC-alerte a {font-weight:bold;font-size:1em} #GMSUC-alerte * {color:"+GMSUCPal.front+";} #GMSUC-alerte table {width:100%;margin:0.5em 0 0 0} #GMSUC-alerte td {width:33%;text-align:center;border:solid 1px "+GMSUCPal.front+"} #GMSUC-alerte td:hover{background:"+GMSUCPal.high+"} #GMSUC-alerte td:hover a {color:"+GMSUCPal.front+"} #GMSUC-timer {font:2em bold;margin:0.5em 0 0 0} #GMSUC-info {text-align:right;font:0.5em serif;margin:1em 0 0 0} #GMSUC-info a {font:0.75em serif}  #GMSUC-info a:hover {background:"+GMSUCPal.front+";color:"+GMSUCPal.back+"}");
				// Lang detection and apply
				var Langues="en, fr";
				var lang=navigator.language;
				var reg=new RegExp(lang,"g");
				if(!Langues.match(lang)) lang="en";
				/* traductions / translations */
					var Txt=new Array();
					for(i=1;i<8;i++) {Txt[i]=new Array();} 
					// français
					Txt[1]["fr"]="Vous utilisez la version";
					Txt[2]["fr"]="du script";
					Txt[3]["fr"]="La version officielle est différente";
					Txt[4]["fr"]="installer cette version";
					Txt[5]["fr"]="voir le code";
					Txt[6]["fr"]="propulsé par";
					Txt[7]["fr"]="Page de la version ";
					// english
					Txt[1]["en"]="You're using";
					Txt[2]["en"]="version of";
					Txt[3]["en"]="script. Official release version is different";
					Txt[4]["en"]="install this version";
					Txt[5]["en"]="view code";
					Txt[6]["en"]="powered by";
					Txt[7]["en"]="Page of version ";
				/* ------------------------------- */	
				//Added by Les-Newsgroup
				if (document.getElementById('GMSUC-alerte')==null) { //then we did not create yet this div
					var alerte=document.createElement('div');
					alerte.setAttribute('id','GMSUC-alerte');
					var GMSUCtextAlerte=Txt[1][lang]+" "+version+" "+Txt[2][lang]+" <i><b>"+scriptName+"</b></i>";
					GMSUCtextAlerte+=". "+Txt[3][lang]+" (<a href='http://userscripts.org:8080/scripts/show/"+scriptId+"'>"+offRel+"</a>)";
					GMSUCtextAlerte+="";
					GMSUCtextAlerte+="<table><tr><td><a href='http://userscripts.org:8080/scripts/show/"+scriptId+"' target='_blank'>"+Txt[7][lang]+offRel+"</a></td><td><a href='http://userscripts.org:8080/scripts/review/"+scriptId+"' target='_blank'>"+Txt[5][lang]+"</a></td><td><a  id='installUpdate' target='_parent' href='http://userscripts.org:8080/scripts/source/"+scriptId+".user.js'>"+Txt[4][lang]+"</a></td></tr><td colspan=3 style='padding:7px;'><a href='#' id='closeUpdater'>Fermer</a></td></tr></table>"
					if(GMSUCtime>0) GMSUCtextAlerte+="<div id='GMSUC-timer'>"+GMSUCtime+" s</div>";
					GMSUCtextAlerte+="<div id='GMSUC-info'>"+Txt[6][lang]+" <a href='http://sylvain.comte.online.fr/AirCarnet/?post/GreaseMonkey-Script-Update-Control'>GM Script Update Control</a></div>";
					document.body.appendChild(alerte);
					document.getElementById('GMSUC-alerte').innerHTML=GMSUCtextAlerte;
					document.getElementById('closeUpdater').addEventListener('click', function(){ document.getElementById('GMSUC-alerte').setAttribute('style','display:none');GMSUCtime=0;}, false );
					document.getElementById('closeUpdater').href = 'javascript:void(0);';		
					document.getElementById('installUpdate').addEventListener('click', function(){ document.getElementById('GMSUC-alerte').setAttribute('style','display:none');GMSUCtime=0;}, false );
				}else if(force) document.getElementById("GMSUC-alerte").setAttribute("style","display:visible;");
					
				if(GMSUCtime>0 && document.getElementById("GMSUC-timer")!=null) { 
					function disparition() {
						if(GMSUCtime>0) {
							document.getElementById("GMSUC-timer").innerHTML=GMSUCtime+" s";
							GMSUCtime+=-1;
							setTimeout(disparition,1000)
						}
						else {
							document.getElementById("GMSUC-alerte").setAttribute("style","display:none");
							document.getElementById("GMSUC-timer").innerHTML='';
						}
							
					}
					disparition();
				}
			}else if (force) alert("Aucune mise à jour");
		}
	});
}

/* Color palette creator */	
function colorPalette(b,h,f,l) {this.back=b;this.high=h;this.front=f;this.light=l;}	
	
/******* END OF SCRIPT VERSION CONTROL **********/


/******** BetaSeries **********/

function cleanup_serie(str) {
	/* Small function to cleanup a string, remove html tags, underscores, weird characters etc. */
	str = str.replace(/[_-]/g, ' ') // _ or - to space
		.replace(/[\(\)\."\[\]\{\}]/g, '')
		.replace(/&amp;/g, 'and') 
		.replace(/[:;\?,!-]/g, ' ')
		.replace(/ +/g, ' ') // double spaces
		.replace(/ *$/, '') // remove lonely spaces
		.replace(/^ */, '') // remove lonely spaces
		.replace(/<\/?[^>]+(>|$)/g, ""); // HTML TAGS
	
	debug(str);
	serie_details = str.match(/^(?:\s*)(.*) (?:s|saison|season) *([0-9]{1,2})(?:[\- ,;]*(?:e|ep|ep\.|episode|episodes) *([0-9]{1,3}))?/i);
	//serie_details[1]:title
	//serie_details[2]:season
	//serie_details[3]:episode

	 debug(serie_details[1]);
	
	return serie_details;
}


function betaseriesGetUrl(serie_details, element){

	if (serie_details == null) return 0;
	
	var serieTitle=serie_details[1];
	var serieUrl='';
	
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://api.betaseries.com/shows/search.json?key=7ecb330c435e&title='+serieTitle,
		headers: {
		'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
		'Accept': 'application/atom+xml,application/xml,text/xml',
		},
		onload: function(responseDetails) {
		// debug(responseDetails.responseText);
		
			var arrRes = eval('(' + responseDetails.responseText + ')');

			if (arrRes.root.code=="1" && typeof arrRes.root.shows[0] != 'undefined') { //no error while fetching serie and fetched at least 1 serie
					
				// debug(arrRes.root.shows[0].url);
				if(typeof arrRes.root.shows[1] == 'undefined') //only one serie fetched, so we assumed that we found the good one ... can't verify it
					serieUrl=arrRes.root.shows[0].url;
				else{//fetched more than 1 serie ... but there can be only one !!
					// var show;
					// var showCount=0;
					for(show in arrRes.root.shows){
						if(arrRes.root.shows[show].url == serieTitle.replace(' ', '') || arrRes.root.shows[show].title.toLowerCase() == serieTitle.replace(' ', '') || arrRes.root.shows[show].url == serieTitle.replace(' ', '-') || arrRes.root.shows[show].title.toLowerCase() == serieTitle.replace(' ', '-')) { //trying to find an exact match
							serieUrl=arrRes.root.shows[show].url;
							break;
						}					
					}
				}
				
				if(serieUrl != ''){
					serie_details.push(serieUrl);
					betaseriesGetInfos(serie_details, element);
				}else
					debug("betaseriesGetUrl() => Aucune correspondance  : '"+ serieTitle.replace(' ', '') + "'  ====>  " + responseDetails.responseText);
				
			}else{
				debug("betaseriesGetUrl() => Pas de résultats / Erreur  : '"+ serieTitle + "'  ====>  " + responseDetails.responseText);
				void(0);
				
				//essayer ici de voir si serieTitle.replace(' ', '') || serieTitle.replace(' ', '-') correspond à une série ! si oui hop on a l'URL (c'est le cas par exemple pour 'greys anatomy' ... avec le search, rien n'est retourné, alors que l'URL est 'greysanatomy'
			}
		}
	});
	
}


function betaseriesGetInfos(serie_details, element){ 

	var serieTitle=serie_details[1];
	var serieSeason=serie_details[2];
	var serieEpisode=serie_details[3];
	var serieUrl=serie_details[4];
	
	var infosType=GM_config.read()['rating_BS_infos'];
	
	if(infosType==1 || typeof serieSeason == 'undefined' || typeof serieEpisode == 'undefined') //We're fetching serie's Infos
		var url='http://api.betaseries.com/shows/display/' + serieUrl + '.json?key=7ecb330c435e';
	else
		var url='http://api.betaseries.com/shows/episodes/' + serieUrl + '.json?key=7ecb330c435e&season=' + serieSeason + '&episode=' + serieEpisode;
		
	debug('betaseriesGetInfos() => season:'+ serieSeason + ' - Episode:' + serieEpisode + '  - Série:' + serieUrl);

	GM_xmlhttpRequest({
		method: 'GET',
		url: url,
		headers: {
		'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
		'Accept': 'application/atom+xml,application/xml,text/xml',
		},
		onload: function(responseDetails) {
		// debug(responseDetails.responseText);
		
			var arrRes = eval('(' + responseDetails.responseText + ')');

			if (arrRes.root.code=="1") { //no error while fetching infos
				if(infosType==1 || typeof serieSeason == 'undefined' || typeof serieEpisode == 'undefined'){
					var objInfos=arrRes.root.show;
				}else{
					var objInfos=arrRes.root.seasons[0].episodes[0];
				}
				debug('betaseriesGetInfos() => title:' + objInfos.title + ' - Note:' + objInfos.note.mean + ' - Votes:' + objInfos.note.members + ' - Série:' + serieUrl);
				addratingLinkToElement(element, [objInfos.title, objInfos.note.mean, 'http://www.betaseries.com/episode/' + serieUrl + '/s' + serieSeason + 'e' + serieEpisode, objInfos.note.members.toString()], 2, 2);		
			}else {
				debug('betaseriesGetInfos() => Auncue info trouvée!');
				addratingLinkToElement(element, 1, 1, 1, true);
			}
		}
	});	
	
}

/********START OF SCRIPT Show IMDB Ratings http://userscripts.org/scripts/review/56362   --   Script by Vigazor  --  modified by les-newsgroup*********/
/* Whats been modified by les-newsgroup ?
starimage1 & starimage2

checkMovie()
- removed this function

handleDTentry()
-Split this function into two others (googleRequest & imdbRequest ... now googleRequest can call imdbRequest several times)
-Change the regular expression to match regular expression with a dot (7.3) AND or with a comma (7,3)
- modified the imdb url with the french one (.fr)
-modified the way imdburl is parsed, because with the use of .fr instead of .com, theres one character less, now using substring() with the position of the last '/' character

cleanup()
- replaced 'and' by 'et' (french for 'and')
- added some special test to match binnewz typical titles

addratingLinkToElement()
-Replaced this function with the one of : 'Nitin Hayaran' (http://userscripts.org/scripts/show/59570)
-made some modifications
-added a caption to the stars div
-other modifications
-added modifications by Cook2
*/
var starimage =''+
'iVBORw0KGgoAAAANSUhEUgAAAMgAAAAoCAMAAACMwkUuAAAAAXNSR0IArs4c6QAAAARnQU1BAACx'+
'jwv8YQUAAAAJcEhZcwAAEnQAABJ0Ad5mH3gAAABgUExURQAAAP7+/fv7/Pn5+vf39/789PPz8+3t'+
'7ebm5uDg4Pn12vDqz/XssuParPLnmtbKjbGcMrqnU8O0bcixN9fAP9zNdt/IPODg4OXOQ+jVV+nZ'+
'c+3ZSfLgVPXssvfnbf///6oVmaEAAAAQdFJOUwAECAsPExciLjlFW5GcvtnZ3S3RAAABKElEQVRY'+
'w+3ZzXKEIBAE4BlFEUVl1SysmOz7v2UG1/1JKtccmtq+WH63KaC1lCi/cC7W5GFUG5WFceN1DkbK'+
'e8MZGGvvf48HZqxUrXUyb+SqlMI0mcv41xiNaZIfampYSy32tBLYiMq7NgxtRM2BGtz4MR22pSfL'+
'sd2wjXRqsFKa4OXdBdGklpsiDdk8igzS5Nzch6o1tL3zzr+mysW+8jCyW8s5GMVtyMJsiFuVgdEq'+
'aKGt6lo7DOs5xMs6WNu1su0QjaqPeV6W5RxCjBdJtID2eU1rMrrEoiFhxwxqxL1zSXc++gzRJN1N'+
'l7AWhGxEp32llmUAN+VkvMQjtlXG7RGGttQBzo3tJPo8N4hWTG6SO+5Oc49scm5uXx2Z+xHaiP/4'+
'qYhoOeQbGAy9N11bgA4AAAAASUVORK5CYII=';


var starimage1=''+
'iVBORw0KGgoAAAANSUhEUgAAAGQAAAAoCAMAAAA/pq9xAAAAAXNSR0IArs4c6QAAAARnQU1BAACx'+
'jwv8YQUAAAAJcEhZcwAAEnQAABJ0Ad5mH3gAAADSUExURQAAAKYwOa1NWa9nM6+GM7GcMrdmb7d5'+
'UreSUrqnU7s0P8GObMGjbMO0bcZzN8aXN8ixN8s8SM9wdtCVmtE4QtZAStZ+QNakQNfAP9lSWdui'+
'dtu2ndu7dtvFndxudNzNdtzRnd2CO92qO95ES9/IPODg4OJOVOKIROKwROWXV+W6V+XGyeXOQ+do'+
'bOimdOjDdOjVV+mtsOnZc+qRSOq6SOrYzOrgzO3ZSe3ozO+cU+/DU/HN0PLgVPSsbvTObvTRtfTh'+
'tfXts/fi0vfnbffs0vn00yklNIoAAAABdFJOUwBA5thmAAACCklEQVRIx+2VbVeiQBiGMcHKd5Z4'+
'aV0NQ4SK1RSKCncVgv//l/aZmcM4CCEforOn4/3x+nBfPPPMHDjulP845lcws34G0PwKZtbKTDY1'+
'sQytjTG0RkZprez7SIqO8LNZ+jzNOtkpp9Sc94rsbwH7U8B+F7BkU43Fb3kWveZZMC+Q+JuwEvPe'+
'djnmvm5zzJiv8h/t+JsqLLa93CiR5eZGCWQjP8oaCpMKbAmS+IAtQBIdsAlIgswXh+F65viP6zBJ'+
'yli82y1vbe9+uYupJ9puF1PLvVtsI+oJVqvJlWxcT1ZB6rkZDjVNmzmO7z9C/OQD9mswUFX11rY9'+
'7x7iIc/Pfl9RlKllue4dxEWeH+22KIpXsmwY1xCDeHQBVUKjgwq5D9mYRxqw2EhC2KiJNGCxkIQw'+
'qYE0YJGRJB3vRRBQI64sY888jyxYk7KnZhNZsCZlD40GsmANsxXSqDnrI4xYVHvJMGJRrAXDiEWU'+
'J+zqL/HpaFp4hF3gE1NV9qmc4xNTFPapnOETE8XMUxHgs1GlfoTxMArSjDOTgAU0o8wkYAGNdCDB'+
'ndoRxuOAJivBHiUrwR6RYTq06VwPGsvZGAxjrguWPRuBYcR1wLJnEhgkrgUWRtITemQNw5dS1uW7'+
'ZDWDZ8o6zQ5ZTf+JslajRVbTfmB2TC+uXsou6GXeL+WcXub9Us7oZZa+1+/wH/4dffbd60agAAAA'+
'AElFTkSuQmCC';

var starimage2=''+
'iVBORw0KGgoAAAANSUhEUgAAAMgAAAAoCAMAAACMwkUuAAAAAXNSR0IArs4c6QAAAARnQU1BAACx'+
'jwv8YQUAAAAJcEhZcwAAEnQAABJ0Ad5mH3gAAAFxUExURQAAAKYwMKdDMKlZMapuMayEMq1NUK9b'+
'Tq+QM7FsT7GcMrJ9ULSQUbdmZ7eaUrhzZ7qCaLqnU7s0NLyRab1LNL6har9jNcF8NcGrbMOVNsO0'+
'bcajN8ixN8s8PMxVPc9uPs9xcNCHPtCVldE6ONGCcNGgl9NVONOiP9OrmNSUctWmc9W2mNZCQNZw'+
'OdawQNeLOdfAP9fCmthcQdi4dNlWUtnKnNp3QdqoOttuU9vDdtxvbtySQtzNdtzRnd2GVN24O95K'+
'RN6Db99kRN+fVN+tQ9/IPOCXcODg4OJWTuJ/ReKqceK3VeK9RORvT+SbRuXAcuXGV+XGxuXOQ+du'+
'aOeKUOepqOe3R+fMx+jMdOjTyOjVV+mFaemlUemvrenZc+nZyeq5rerHSOvgyuybauzAUu3Gr+3Z'+
'Se3lzO3ozO6za+7RsO/QU/DdsfHLbPHOzfLUzvLgVPLy8vPls/TZbvTcz/Xj0PXts/fnbffr0fjw'+
'0/n003k3aXEAAAABdFJOUwBA5thmAAADh0lEQVRYw+3X21cSQRzA8UVBETXN+w0ITLFABFI0CQVE'+
'EUVUMkTzAiZoSmAEBPz1/WbmMDvL8NA57oPr2d/j92k+zGUPgqCOOur850ReS4u8jgYx8lpaRPEt'+
'wo6Cm6QqujFV4Y1WxTcV8kJbROmt+YmMKL2po4466ihw/src/rRpv9q0n23ajzbte5v2tU1rPMnb'+
'6o98q93yrXLBt/IJ34oHfCvstoHknqqytsxjiWvJ2zzX4hcPXIueZLkWOkhzLbB7yf+oidyTnK0e'+
'y3BbUgsnuS2p+OLclpS9UW5Lip4QtyUFR4DfkitYTEPGlgJIvaUdAqTW0vYAUmlpOwApt7QgQIot'+
'bR0gBckvWq1ebSdy51fVRkOOVi+VUpuxzFGqVKeWWj5/uBpO7h/ma9RSeXjYW/LFt/YeKtRSzmZ3'+
'Fr3RjZ1smVqK6XRw3hNaC6aL1FK4vFyfdQSW1y8LTcuXmRmXy7WdSORy5zC5xjPb5+lpp9O5GYtl'+
'MkcwGWT5NDlps9lWw+Fkch8miSwfx8ctFsuSzxePb8HEkeXD2JjZbF70eqPRDZgosrwfGTGZTPMe'+
'Tyi0BhNClndDQ0ajcdbhCASWYQLffiOJ34CWA6tJoMUQ3XPaih5RQBJDENLcOkQBSRhBSLNrEQUk'+
'PgQhbaETUUDiRRDS5joQBSQeBCHNqkEUkDgQpLlN9wYDWg1ejhztTq9HEkxpthudDkkwpdmutVok'+
'wZRmO+vsRBJMabbTjg4kwZRmO9ZokARTmFtCVuNKXMnUiMQZSzGNSGzhQ6YRicW3xzQiMXt3mEYk'+
'Jk+QaURidKyz1/0tPiEuV1Wm9gafLqeT/ZT04dNls7Gfkl58uiwW9lPSg0+X2cx+Srrx6TKZ2E9J'+
'Fz5dRqPkU2KAnxUtxy9T08OWIMqKZEdAAhS3ZEdAAhS7ZEdAApQFyY6ABChzkh0BCVCsLRC8HpdM'+
'TY8HKFIIttikEGyxSCHYYpZCsMUkhWCLkWl+WIlfmILVyNNWQLEiTIBEbG5QuIVRkIjNDgq7MAwS'+
'sS2AYkEYBInY5kAxJwyARGxWUFiFfpAwkCnDFDnuM/eytAn9BLkq03e0jepGyVWZvKFtWDtMrsr4'+
'NW2DnYPkqoyd0TbQMUCuysgpbf2afnJVho6Z+0ofU78s7Q19iMVL0kcfYvGS9NKHWLwkPfQhFi9J'+
'N32IxUvSRR9iq/oX7CXOP0hn0ljJajC/AAAAAElFTkSuQmCC';

function cleanup(str) {
	/* Small function to cleanup a string, remove html tags, underscores, weird characters etc. */
	str = str.replace(/ \(?(\+|sur)?(\s*a(lt)?.*\.?b.*\.[a-z0-9\.\-_@]+)\s*\)?/ig, '')
		.replace(/(autres? post|\*.*\*)/i, '')
		.replace(/\"/g, '') // "
		//.replace(/\'/g, '') // '  //do not replace '
		.replace(/\./g, ' ') // . --> space
		.replace(/_/g, ' ') // underscore to space
		.replace(/\(/g, ' ')//(
		.replace(/\)/g, ' ')//)
		.replace(/ +/g, ' ') // double spaces
		.replace(/ $/, '') // remove last lonely space
		.replace(/&amp;/g, 'et') 
		.replace(/<\/?[^>]+(>|$)/g, ""); // HTML TAGS
	return str;
}

//This function adds thousand separator to the number paramter
function formatVotes(nvotes){

	if(isNaN(nvotes)) return;
	
	var sRegExp=/([0-9]+)([0-9]{3})/i;
	while(sRegExp.test(nvotes)) {
		nvotes = nvotes.replace(sRegExp, '$1 $2');
	}
	return nvotes;
}

//this function let me do another google request with the other language (selected from option)  IMDB if nothing has been found with the FR url.
//the 'stop' param is used to stop redundancy
function googleRequest(searchTitle, element, othertry){
	//debug("googleRequest() => " + searchTitle + ' - ' + othertry);
	
	GM_xmlhttpRequest({
			method: 'GET',
			url: String('http://ajax.googleapis.com/ajax/services/search/web?v=1.0&q=["' + (othertry=='year'?searchTitle.replace(/\s*[0-9]{4}$/, ''):searchTitle) + '"]+site:imdb.' + (othertry=='lang'?'fr':'com') + '/title'),
			headers: {
			'User-agent': 'Mozilla/4.0',
			'Accept': 'application/atom+xml,application/xml,text/xml',
			},
			onload: function(responseDetails) {
				//debug('googleRequest() => ' + responseDetails.responseText);
				var gR = eval('(' + responseDetails.responseText + ')');
				//debug('googleRequest() => ' + "GR.url:" + gR.responseData.results[0].url + ":" + searchTitle );
				if (gR.responseData!=null){
					if (typeof gR.responseData.results[0]=='undefined'){
						switch (othertry){	//if error occurs, we do another try
						
							case 'lang': //that was the first othertry ... we go next to the  second other try ... trying the same search but without the Year
								if (searchTitle.match(/[0-9]{4}$/) != null) {
									debug("googleRequest() => Searching without the Year : "+searchTitle);
									googleRequest(searchTitle, element, 'year');
									break;
								}else
									othertry='year';
								
							case 'year': //that was the second othertry ... we go next to the  third other try ... trying with omdbAPI (Title + Year)
								debug("googleRequest() => Searching via omdbapi + title + year : "+searchTitle);
								yearMatch=searchTitle.match(/[0-9]{4}$/);
								imdbRequest('', element, yearMatch==null?'':yearMatch[0], 1, searchTitle.replace(/\+?\(?.?[0-9]{4}$\)?/g, '')); //first imdb try : Using the private API (omdbapi.com)
								break;
								
							default: //no othertry param : we do the first othertry
								debug("googleRequest() => Searching with IMDB Other language : "+searchTitle);
								googleRequest(searchTitle, element, 'lang');
								break;			
						}

					}else {
						if (gR.responseData.results && gR.responseData.results.length > 0) {
							debug("googleRequest() => Found a corresponding imdb URL : "+searchTitle);
							yearMatch=searchTitle.match(/[0-9]{4}$/);
							imdbRequest(gR.responseData.results[0].url.replace('.com', '.fr'), element, yearMatch==null?'':yearMatch[0], 1, searchTitle.replace(/\+?\(?.?[0-9]{4}$\)?/g, '')); //first imdb try : Using the private API (omdbapi.com)
							
						} else 
							debug("googleRequest() => google failed: "+searchTitle);
					}
				}else{
					debug("googleRequest() => blocage google: "+searchTitle);
					yearMatch=searchTitle.match(/[0-9]{4}$/);
					imdbRequest('', element, yearMatch==null?'':yearMatch[0], 1, searchTitle.replace(/\+?\(?.?[0-9]{4}\)?/g, '')); //Google block us , we can use omdbAPI instead	
				}
			}
	});

}


//This function can search for a movie via two ways : using the site www.omdbapi.com or using the imdb website
//First try is done with omdbapi (the fastest), second try with imdb website
function imdbRequest(imdbUrl, element, year, useAPI, movieTitle){
	
	if (useAPI) {
		if (imdbUrl!='' && (imdbMovieId=imdbUrl.match(/title\/tt([0-9]+)\//))) 
			requestUrl="http://www.omdbapi.com/?i=tt"+imdbMovieId[1];
		else
			requestUrl="http://www.omdbapi.com/?t="+movieTitle;
			
		if(year!='') requestUrl+="&y="+year;
	}else{
		requestUrl=imdbUrl.substring(0, imdbUrl.lastIndexOf('/')+1)+"combined";
	}

	debug('imdbRequest() => ' + movieTitle + " -- " + imdbUrl + ' -- year = ' + year + ' -- use api = ' + useAPI + ' -- requestUrl = ' + requestUrl);

	
	GM_xmlhttpRequest({
		method: 'GET',
		url: requestUrl,
		headers: {
		'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
		'Accept': 'application/atom+xml,application/xml,text/xml',
		},
		onload: function(responseDetails) {
			if(useAPI){
				var arrRes = eval('(' + responseDetails.responseText + ')');
				//debug('imdbRequest() => ' + arrRes.Response);
				if (arrRes.Response=="True") { //no error while fetching movie
					debug('imdbRequest() => ' + movieTitle+" - Y:" + year + " -- IMDB API OK  - Fetched title : '" +arrRes.Title + "' -- " + requestUrl);		
					if(imdbUrl=='') 
						imdbUrl='http://www.imdb.' + (GM_config.read().language_option == 'fr' ? 'fr' : 'com') + '/title/' + arrRes.imdbID + '/combined';
					else
						imdbUrl=imdbUrl.substring(0, imdbUrl.lastIndexOf('/')+1)+"combined";
					addratingLinkToElement(element, [arrRes.Title + " (" + arrRes.Year + ")", arrRes.imdbRating, imdbUrl, arrRes.imdbVotes.indexOf(',') != -1 ?arrRes.imdbVotes.replace(",",""):arrRes.imdbVotes], 1, 1);	
				}else if(imdbUrl!=''){ //cant go further if could not find more about this item before (in googleRequest func)
					debug('imdbRequest() => ' + movieTitle + " -- Erreur IMDB API, essai IMDB Website" );
					imdbRequest(imdbUrl, element, year, false, movieTitle);
					return 0;
				}else {
					addratingLinkToElement(element, 1, 1, 1, true);
				}
			}else{
				debug('imdbRequest() => ' + movieTitle + " -- Recuperation via IMDB Website -- " + requestUrl);
				var res = responseDetails.responseText;  
				//debug('imdbRequest() => ' + "source:"+res);
				var votesMatch = res.match(/<a href="ratings" class="tn15more">(.*) votes/); // <a href="ratings" class="tn15more">6,072 votes</a>
				var ratingMatch = res.match(/<div class="starbar-meta">\s*<b>(\d[,\.]\d)\/10<\/b>/); //<div class="starbar-meta"><b>8.3/10</b> 
				var imdbTitle = res.match(/<title>(.*)<\/title>/)
				if (imdbTitle != null) 
					imdbTitle=imdbTitle[1];
				else
					imdbTitle='';

				var rating = 0.0;
				var votes = "0";
				//debug('imdbRequest() => ' + "ratingMatch de "+searchTitle+" : "+ratingMatch);
			
				if (ratingMatch) {
					rating = parseInt(ratingMatch[1]);
					votes = votesMatch[1];
					//debug('imdbRequest() => ' + "rating de "+searchTitle+" : "+rating);
				} else {
					debug('imdbRequest() => ' + "could not get rating: "+searchTitle);
				}
			
				addratingLinkToElement(element, [imdbTitle, rating, responseDetails.finalUrl, votes], 1, 1);
			}
		}
	});


}



//element: DOM Object
//ratingLink : rating informations [title, note, url of info page, votes]
//mediaType : 1 => Imdb
//                    2 => BetaSeries
//Modifier : 1 => original note is 10based
//                 2 => original note is 5based
function addratingLinkToElement(element, ratingLink, mediaType, modifier, ratingError){ //modifier is a new param : it is used with a value of 2 when the note is 5based ... so that we can calculate a 10based note

	ratingError=ratingError||false; //set default

	//if theres no error within the presume imdb url (means we do find 'imdb' or 'betaseries' inside it), we set 2 variables to let us insert the imdb link later
	if (typeof ratingLink[2] != 'undefined' && (ratingLink[2].indexOf('imdb') != -1 || ratingLink[2].indexOf('betaseries') != -1)) {
		ratingOpenLink="<a target='_blank' href='" + ratingLink[2] + "'>";
		ratingCloseLink="</a>"
	}else{ 
		ratingOpenLink=""; 
		ratingCloseLink=""
	}

	if (ratingLink && ratingLink != -1) {

		ratingElement = "<!-- Container -->";
		if (GM_config.read().rating_twolines) {
			ratingElement += "<div style='height:20px; margin-left:10px; margin-top:3px; '>"; // For two lines
		}else {
			ratingElement += "<div style='float:left;'>"; // For everything on one line  AND IMDB stars
		}
	
		ratingElement+=ratingOpenLink;
			
		ratingElement += "<!-- Starbar --><div ";
		if (ratingLink[1] != 'N/A' && typeof ratingLink[1] != 'undefined' && ratingLink[1]>=0 )
			ratingElement+="title='" + (mediaType==2 && GM_trans.lang('rating_serie')==2?GM_trans.lang('episode_title') + ' : ':'') + ratingLink[0].replace(/['"]/g, ' ')  + "  - " + GM_trans.lang('note') + ": " + ratingLink[1] * modifier + " / 10" + " " + GM_trans.lang('with') + " " + formatVotes(ratingLink[3]) + " " + GM_trans.lang('votes') + "' ";
		
		ratingElement+="style='height:20px; float:left;'>";
		

		noresult=false;
		if (ratingError){
			ratingElement += GM_trans.lang('ratingerror');
		}else if( ratingLink[1] == 'N/A' || typeof ratingLink[1] == 'undefined' || ratingLink[1]<=0 ) {
			ratingElement += GM_trans.lang('norating');
			noresult=true;
		}else {
			if (GM_config.read().rating_starmode != 1) { // starmode 2 & 3 = Stars only & Rating + stars 

				//New rating display mode by Cook2
                if(GM_config.read().rating_displayMode_byCook2){

                    starrating = ratingLink[1] * modifier;
                    if ( mediaType == 1)
                        starrating = (starrating * starrating)/81*6-1; // en fonction du carré de la note en enlevant les extrèmes
                    else
                        starrating = (starrating * starrating)/100*6-1; // en fonction du carré de la note en enlevant les extrèmes

					starrating = starrating * GM_config.read().rating_shownotation; //cette option égale 1 si on veut une note sur 5 étoiles, ou 2 si note sur 10 étoiles
					
                    if (starrating <= 0) starrating = 0;
                    if (starrating >= 5  * GM_config.read().rating_shownotation) starrating = 5  * GM_config.read().rating_shownotation;
                
                
                    if (ratingLink[3] != 'N/A' && ratingLink[3] > 0) {
                        if ( mediaType == 1)
                            starvote = Math.sqrt(ratingLink[3])/10;
                        else
                            starvote = Math.sqrt(ratingLink[3]);
                    } else {
                        starvote = 0;
                    }

                    if (starvote <= 1) starvote = 1;
                    if (starvote >= 20) starvote = 20;
                    starpos = starvote - 40;
                    startop = 20 - starvote;
                					
                    imdbrating='';
                    if (GM_config.read().rating_showgreystars) imdbrating  = "<div style='position:relative;width: " + GM_config.read().rating_shownotation * 100 + "px;height: 20px;background: url(data:image/png;base64," + starimage + ") no-repeat 0px 0px;'>";
                    imdbrating += "<div style='position:relative;width: " + 20 * starrating + "px;height: 20px;background: url(data:image/png;base64," + starimage + ") no-repeat 0px -20px'>";
                    imdbrating += "<div style='position:relative;width: " + 20 * starrating + "px;height: " + starvote + "px;top: " + startop + "px;background: url(data:image/png;base64," + eval('starimage'+GM_config.read().rating_shownotation) + ") no-repeat 0px " + starpos + "px;'>";
                    imdbrating += "</div></div>";
                    if (GM_config.read().rating_showgreystars) imdbrating += "</div>";
                    ratingElement += imdbrating;
                //End
                }else{
					imdbrating='';
					if (GM_config.read().rating_showgreystars) imdbrating  = "<div style='width: " + GM_config.read().rating_shownotation * 100 + "px;height: 20px;background: url(data:image/png;base64," + starimage2 + ") no-repeat 0px 0px;'>";
					imdbrating += "<div style='width: " + GM_config.read().rating_shownotation * 10 * ratingLink[1] * modifier + "px;height: 20px;background: url(data:image/png;base64," + eval('starimage'+GM_config.read().rating_shownotation) + ") no-repeat 0px -20px;'>";
					imdbrating += "</div>";
					if (GM_config.read().rating_showgreystars) imdbrating += "</div>";
					ratingElement += imdbrating;
				}
			}
		}

		if(GM_config.read().rating_starmode != 2 && !noresult) { //rating_starmode = 1 & 3 : Rating & Rating + Stars
			ratingElement += "</div><!-- End Starbar -->";

			ratingElement += ratingCloseLink;
			
			ratingElement += ratingOpenLink + "<b>";

			ratingElement += "&nbsp;" + ratingLink[1] * modifier;
			
			//Adding /10 (or /5) on rating display
			if(GM_config.read().rating_displayMode)
				ratingElement += " / " + 5 * Math.abs(modifier-3);

			
			ratingElement += "</b>" + ratingCloseLink;
			

		}
		else // normal behavior		
		{
			ratingElement+=ratingCloseLink;
			ratingElement += "</div><!-- End Starbar -->";
		}
					
		if (GM_config.read().rating_showvotes && ratingLink[3] != 'N/A' && typeof ratingLink[3] != 'undefined') {
			ratingElement += "&nbsp; (" + formatVotes(ratingLink[3]) + " " + GM_trans.lang('votes') + ") ";
		}

		ratingElement += "</div>&nbsp;";
		newText= element.parentNode.innerHTML + ratingElement;
		element.parentNode.innerHTML = newText;
	}
}


//----------------------------------------------
//----------------------------------------------
//---------------LOCALIZATION-----------
//----------------------------------------------
//----------------------------------------------

GM_trans.setTranslations('en',{
  //Localization of configuration
  'ConfigTitle': '\'Better Usenet\' Settings',
  'script_options':'General settings',
  'updater_timer':'Seconds to wait before autoclosing the updater window (0=no autoclose timer)',
  'updater_delay':'Days between new update checking',
  'noupdate':'No \'Better Usenet\' update',
  'language_option':'Display language (\'Save\' to apply)',
  'language_section':'Language',
  'option_fixedheader':'Make the header (menu + search) fixed',
  'option_deletead':'Delete the ad banner', 
  'option_forcessl':'Force SSL protocol',
  'option_scrolltoresults':'Go to search results after loading page', 
  'option_resize':'Change the results table width (%)', 
  'option_othernzbindexerbuttons':'Add a button to do the same search on other NZB Indexers',
  'option_nocheckboxifpassword':'Delete the selection checkbox if the result is password protected',
  'option_highlightifpassword':'Highlight a result if it is password protected',
  'display_nzbclub':'Display a link to NZBClub',
  'display_binsearch1':'Display a link to Binsearch (popular groups)',
  'display_binsearch2':'Display a link to Binsearch (other groups) (not recommended)',
  'display_nzbindex':'Display a link to NZBIndex',
  'display_yabsearch':'Display a link to YABSearch',
  'display_yubse':'Display a link to Yubse',
  'display_nzbfriends':'Display a link to NZBFriends',
  'display_thxlink':'Display a link to thanks the poster of each release',
  'display_infolink':'Display a link to retrieve votes for an element',
  'thxlink_title':'Thank you !',
  'infolink_title':'Find its ratings',
  'binnewz_selectedresultcolor':'Color to highlight the \'Age\' and \'Group\' cells if matching',
  'binnewz_highlighttolerance':'Accept a +-1 day tolerance when trying to determine if \'Age\' cell match Binnewz selection',
  'binnewz_toleranceresultcolor':'Color to highlight the \'Age\' if matching with tolerance',
  'binnewz_displaysearchinformations':'Display details of your Binnewz selection on Binsearch and NZBIndex',
  'binnewz_nzblinks_place':'Display NZB links in the following column',  
  'nzblinks_place_title':'Title ("Titre" in french)',
  'nzblinks_place_file':'File ("Fichier " in french)',
  'nzblinks_place_size':'Size ("Taille" in french)',
  'binnewz_highlightifpassword':'Highlight a result if it is password protected or a virus',
  'binnewz_donothingifpassword':'Do not display NZB links and do not fetch rating for a result that is password protected or virus',
  'binsearch_nzbbuttons':'Add a NZB button for each result',
  'binsearch_nzbbuttoncolor':'NZB button\'s color',
  'binsearch_nonzbbuttonifpassword':'Do not add a NZB button if Binsearch says the result is password protected',
  'binsearch_missingpartsdetails_option':'If there is missing parts, display precisly how many are missing',
  'binsearch_selectbuttons':'Add new selection buttons (Select all  / Cancel selection) [Firefox only]',
  'binsearch_noresultbutton':'If there is no result from the selected groups (popular/other), add a button to do the same search on the other groups (other/popular)',
  'binsearch_autoloadothersearch':'If there is no result from the selected groups (popular/other), automaticaly do the same search on the other groups (other/popular)',
  'binsearch_autoloadnzbindex':'If there is really no result on Binsearch, automaticaly do the same search on NZBIndex',  
  'binsearch_delete_oldcontentline':'Delete the yellow line inserted by Binsearch when it displays old results',
  'binsearch_advancedsearch':'Activate Binsearch\'s advanced search form',
  'binsearch_showcollections':'Only show collections (you need to activate the advanced search)',
  'nzbindex_nonzbbuttonifpassword':'Remove the \'download\' link if NZBIndex says the result is password protected',
  'nzbindex_delete_oldcontentline':'Delete the yellow line inserted by NZBIndex when it displays old results',
  'nzbindex_onlycollections':'Only display \'collection\' type results (you can still deactivate it with the checkbox on top of results)',
  'nzbindex_orderbuttons':'Add icons to order results by size or age',
  'nzbindex_resultLinks_fontSize':'Font size for the "Download" and "View Collection" links (nzbindex default : 10 pixel)',
  'nzbindex_autoloadbinsearch':'If no result on NZBIndex, do the same search on Binsearch automatically',
  'rating':'Rating',
  'rating_imdb':'Fetch rating + votes from IMDB database and display it on every appropriate results on Binnewz (movies, animes, documentaries)',
  'rating_betaseries':'Fetch rating + votes from BetaSeries database and display it on every appropriate results on Binnewz (series only)',
  'rating_BS_infos':'Fetching infos from BetaSeries for : ',
  'rating_starmode':'Display mode for ratings',
  'rating_shownotation':'The rating will be displayed with :',
  'rating_displayMode_byCook2':'Use a different graphic display mode for ratings : Enhancement of best ratings and display of the stars depending on number of votes',
  'rating_showgreystars':'When displaying rating with stars, display greystars for rating less than the maximum note',
  'rating_showvotes':'Also display votes (however votes will still be displayed when hoovering the note)',
  'rating_twolines':'Display rating form IMDB on another line',
  'rating_displayMode':'In textmode, display rating + max rating (4/10 or 2/5)',
  'debug_log':'Afficher les messages de logs (cf la "Console d\'erreurs > Messages")',
  'debug_time':'Afficher le temps d\'exécution du script (dans la barre de configuration)',
  'script_link_openingconfiguration':'Settings',
  'script_link_lookingforupdate':'Check for update',
  'script_link_forum':'Support Forum',
  'script_link_siteofficiel':'Official website',
  'script_link_whatsnew':'Changelog',
  //Localization of user interface
  'binsearch_missingpartsdetails':'Missing',
  'binnewz_alert_nooptions':'It is not possible to open the \'Better Usenet\' Configuration when you are on Binnewz.in (because there are html frames). You can only load the options from Binsearch.info website',
  'make_link_title':'Search for a NZB on',
  'binsearch_selectall_button':'Select all',
  'binsearch_unselectall_button':'Cancel selection',
  'noresult_button':'No result',
  'binsearch_button_populargroups':'Search on popular groups of Binsearch',
  'binsearch_button_othergroups':'Search on other groups of Binsearch',
  'othernzbindexer_button':'Search on',
  'binsearch_autoload_suceeded':'The script \'Better Usenet\' has loaded the other/popular groups results',
  'nzbindex_str_onlycollections':'Show only collections',
  'nzbindex_openoptions':'See options',
  'nzbindex_hiddenresults':' hidden results (no collections)',
  'binnewz_searchinformations_title':'You\'re searching for :',
  'filename':'Filename :',
  'age':'Age',
  'groups':'Groups :',
  'or':'or',
  'days':'days',
  'caption_title':'Highligting caption :',
  'caption_selectedresult':'Age/Group match',
  'caption_toleranceresult':'Age +-1 day',
  'rating_serie':'the serie',
  'rating_episode':'the episode',
  'with':'with',
  'note':'Rating',
  'votes':'Votes',
  'stars':'stars',
  'episode_title':'Title of this episode',
  'add_to_selection':'Clic to add to selection',
  'remove_from_selection':'Clic to remove from selection',
  'AlertFirstLaunch':'"Better Usenet" Warning :\n\n Remember to deactivate others userscripts which have the same functionalities than Better Usenet. \n\n To check your activated user scripts, go to "Tools - Greasemonkey - Manage User Scripts"',
  'starmode':'Graphical mode',
  'textmode':'Text mode', 
  'protected_row':'This result is password protected',
  'debug':'Debug',
  'norating':'No rating found',
  'ratingerror':'Error while fetching rating',
  });


GM_trans.setTranslations('fr',{
  //Traduction de la partie 'Configuration'
  'ConfigTitle':'Configuration de \'Better Usenet\'',
  'script_options':'Options générales',
  'updater_timer':'Nombre de secondes avant la fermeture automatique de la fenêtre d\'information de mise à jour (0=pas de timer)',
  'updater_delay':'Nombre de jours entre les vérifications automatiques de présence d\'une mise à jour',
  'noupdate':'Pas de mise à jour de \'Better Usenet\'',
  'language_option':'Langue d\'affichage (bouton \'Save\' pour appliquer)',
  'language_section':'Langue',
  'option_fixedheader':'Rendre fixe l\'entête des sites gérés',
  'option_deletead':'Supprimer la bannière de publicité',
  'option_forcessl':'Forcer l\'utilisation du protocole SSL',
  'option_scrolltoresults':'Aller directement aux résultats de recherche au chargement de la page',
  'option_resize':'Modifier la taille du tableau des résultats (en %)',
  'option_othernzbindexerbuttons':'Ajouter un bouton pour faire la même recherche sur les autres sites de NZB',
  'option_nocheckboxifpassword':'Supprimer la case à cocher si le contenu associé à la ligne est marqué comme protégé par un mot de passe',
  'option_highlightifpassword':'Change la couleur d\'une ligne si le contenu associé est marqué comme protégé par un mot de passe',
  'display_nzbclub':'Affiche un lien vers NZBClub',
  'display_binsearch1':'Affiche un lien vers Binsearch (groupes populaires)',
  'display_binsearch2':'Affiche un lien vers Binsearch (autres groupes) (pas conseillé)',
  'display_nzbindex':'Affiche un lien vers NZBIndex',
  'display_yubse':'Affiche un lien vers Yubse',
  'display_nzbfriends':'Affiche un lien vers NZBFriends',
  'display_yabsearch':'Affiche un lien vers YABSearch (pas conseillé)',
  'display_thxlink':'Afficher un lien pour chaque référencement afin de remercier le posteur',
  'display_infolink':'Afficher un lien pour récupérer la notation d\'un élément',
  'thxlink_title':'Merci au référenceur!',
  'infolink_title':'Trouver la notation',
  'binnewz_selectedresultcolor':'Couleur du surlignage de la case \'Age\' ou \'Group\' si correspondance',
  'binnewz_highlighttolerance':'Accorder une tolérance de +- 1 jour pour le surlignage de la case \'Age\'',
  'binnewz_toleranceresultcolor':'Couleur du surlignage de la case \'Age\' si il y a eu tolerance à +- 1 jour',
  'binnewz_displaysearchinformations':'Affiche sur NZBIndex et Binsearch les détails de la sélection faite sur Binnewz',
  'binnewz_nzblinks_place':'Affiche les liens NZB dans la colonne suivante',
  'nzblinks_place_title':'Titre',
  'nzblinks_place_file':'Fichier',
  'nzblinks_place_size':'Taille',
  'binnewz_highlightifpassword':'Change la couleur d\'une ligne si le contenu associé est marqué comme un virus ou protégé par un mot de passe',
  'binnewz_donothingifpassword':'Ne pas afficher les liens NZB ni la notation si un mot de passe ou un virus est annoncé par Binnewz',
  'binsearch_nzbbuttons':'Ajouter un bouton NZB pour chaque résultat',
  'binsearch_nzbbuttoncolor':'Couleur du bouton NZB',
  'binsearch_nonzbbuttonifpassword':'Ne pas créer de bouton NZB si le contenu associé à la ligne est marqué comme protégé par un mot de passe',
  'binsearch_missingpartsdetails_option':'Si il y a des parts manquantes, affiche le nombre précis', 
  'binsearch_selectbuttons':'Ajouter des boutons supplémentaires de sélection (Tout sélectionner / Annuler la sélection) [Firefox uniquement]',
  'binsearch_noresultbutton':'Si il n\'y a aucun résultat pour les groupes sélectionnés (populaires/autres), ajoute un bouton pour faire la même recherche dans les autres groupes (autres/populaires)',
  'binsearch_autoloadothersearch':'Si il n\'y a aucun résultat pour les groupes sélectionnés (populaires/autres), faire automatiquement la même recherche dans les autres groupes (autres/populaires)',
  'binsearch_autoloadnzbindex':'Si il n\'y a vraiment aucun résultat sur Binsearch, faire automatiquement la même recherche sur NZBIndex',
  'binsearch_delete_oldcontentline':'Supprime la ligne insérée par Binsearch dans les vieux résultats',
  'binsearch_advancedsearch':'Active la recherche avancée de Binsearch',
  'binsearch_showcollections':'Affiche uniquement les collections de fichiers (nécessite d\'activer la recherche avancée)',
  'nzbindex_nonzbbuttonifpassword':'Supprimer le lien \'Download\' si le contenu associé à la ligne est marqué comme protégé par un mot de passe',
  'nzbindex_delete_oldcontentline':'Supprime la ligne insérée par NZBIndex dans les vieux résultats',
  'nzbindex_onlycollections':'N\'afficher que des collections de fichiers dans les résultats (vous pourrez toujours désactiver ça via la case à cocher au dessus des résultats)',
  'nzbindex_orderbuttons':'Ajouter des icônes pour trier les résultats selon la taille ou l\'âge',
  'nzbindex_resultLinks_fontSize':'Taille de la police utilisée pour les liens "Download" et "View Collection" (nzbindex défaut : 10 pixel)',
  'nzbindex_autoloadbinsearch':'Si aucun résultat sur NZBIndex, fait automatiquement la même recherche sur Binsearch',
  'rating':'Notation',
  'rating_imdb':'Récupère la note et les votes du site IMDB and les affiche pour chaque résultat approprié de Binnewz (films, animes, documentaires)',
  'rating_betaseries':'Récupère la note et les votes du site BetaSeries and les affiche pour chaque résultat approprié de Binnewz (séries uniquement)',
  'rating_BS_infos':'Les infos récupérées sur BetaSeries seront pour : ',
  'rating_starmode':'Mode d\'affichage des notes',
  'rating_shownotation':'La notation sera affichée sur :',
  'rating_displayMode_byCook2':'Utiliser un rendu graphique de la note différent : mise en valeur des meilleurs notes et coloration des étoiles en fonction des votes',
  'rating_showgreystars':'Quand la note est affichée en mode graphique, affiche des étoiles grises quand la note est inférieure à la note maximale',
  'rating_showvotes':'Affiche les votes en plus de la note (le nombre de votes sera cependant toujours visible au survol de la souris)',
  'rating_twolines':'Affiche la notation d\'IMDB sur une ligne supplémentaire',
  'rating_displayMode':'En mode texte, afficher la note + la note maximale (4/10 or 2/5)',
  'debug_log':'Afficher les messages de logs (cf la "Console d\'erreurs > Messages")',
  'debug_time':'Afficher le temps d\'exécution du script (dans la barre de configuration)',
  //Traduction de l'interface (boutons, messages utilisateurs, etc)
  'script_link_openingconfiguration':'Configuration',
  'script_link_lookingforupdate':'Maj ? ',
  'script_link_forum':'Forum de discussion',
  'script_link_siteofficiel':'Site web officiel',
  'script_link_whatsnew':'Changelog',
  'binsearch_missingpartsdetails':'Manque',
  'binnewz_alert_nooptions':'Impossible d\'afficher les options via Binnews (à cause des frames html). Vous ne pouvez ouvrir les options qu\'à partir du site \'binsearch.info\'',
  'make_link_title':'Chercher le NZB sur',
  'binsearch_selectall_button':'Tout sélectionner',
  'binsearch_unselectall_button':'Annuler la sélection',
  'noresult_button':'Aucun résultat',
  'binsearch_button_populargroups':'Chercher sur les groupes populaires de Binsearch',
  'binsearch_button_othergroups':'Chercher sur les autres groupes de Binsearch',
  'othernzbindexer_button':'Rechercher sur',
  'binsearch_autoload_suceeded':'Le script \'Better Usenet\' a chargé automatiquement les résultats sur les autres groupes.',
  'nzbindex_str_onlycollections':'N\'afficher que les collections',
  'nzbindex_openoptions':'Voir les options',
  'nzbindex_hiddenresults':' résultats masqués (pas des collections)',
  'binnewz_searchinformations_title':'Vous recherchez',
  'filename':'Nom de fichier',
  'age':'Age',
  'groups':'Groupes',
  'or':'ou',
  'days':'jours',
  'caption_title':'Légende de la coloration',
  'caption_selectedresult':'Age/Groupe correspond',
  'caption_toleranceresult':'Age +-1 jour',
  'rating_serie':'la série',
  'rating_episode':'l\'épisode',
  'with':'avec',
  'note':'Note',
  'votes':'Votes',
  'stars':'étoiles',
  'episode_title':'Titre de cet épisode',
  'add_to_selection':'Cliquez pour ajouter à la sélection',
  'remove_from_selection':'Cliquez pour retirer de la sélection',
  'AlertFirstLaunch':'Avertissement "Better Usenet" :\n\n Pensez à désactiver les autres scripts qui pourraient avoir les mêmes fonctions que Better Usenet. \n\n Pour vérifier vos scripts actifs dans Greasemonkey, allez dans "Outils - GreaseMonkey - Manage User Scrips"',
  'starmode':'Mode graphique',
  'textmode':'Mode Texte',
  'protected_row':'Ce résultat est protégé par un mot de passe',
  'debug':'Debug',
  'norating':'Aucune notation disponible',
  'ratingerror':'Récupération de la note impossible',
});


//Setting Language (if language not set yet, use EN)
if (GM_config.read()['language_option'])
	GM_trans.setLang(GM_config.read()['language_option']);
else
	GM_trans.setLang('en');


//----------------------------------------------
//----------------------------------------------
//-------------------CONFIG-----------------
//----------------------------------------------
//----------------------------------------------
/* Remove the 40% wasted space to the left */
var configStyle = ".field_label {padding-left:15px;}";
configStyle=configStyle.toString();

function initConfig() {
	GM_config.init(GM_trans.lang('ConfigTitle'),
	{
		'language_option':
		{
			section : [GM_trans.lang('language_section')],
			label: GM_trans.lang('language_option'),
			type:'select',
			options:{'fr':'Français','en':'English'},
			default:'fr'
		},
		'updater_delay':
		{
			section : [GM_trans.lang('script_options')],
			label: GM_trans.lang('updater_delay'),
			type:'text',
			default:'3'
		},
		'updater_timer':
		{
			label: GM_trans.lang('updater_timer'),
			type:'text',
			default:'0'
		},
		'searchnzb_forcessl': 
		{
			label: GM_trans.lang('option_forcessl'),
			type: 'checkbox',
			default: true
		},
		'deletead': 
		{
			label: GM_trans.lang('option_deletead'),
			type: 'checkbox', 
			default: true
		},
		'option_fixedheader': 
		{
			label: GM_trans.lang('option_fixedheader'),
			type: 'checkbox',
			default: true
		},
		'display_nzbclub':
		{
			section : ['BinnewZ'],
			label: GM_trans.lang('display_nzbclub'),
			type: 'checkbox', 
			default: true
		},
		'display_binsearch1': 
		{
			label: GM_trans.lang('display_binsearch1'), 
			type: 'checkbox',
			default: true 
		},
		'display_binsearch2': 
		{
			label: GM_trans.lang('display_binsearch2'),
			type: 'checkbox',
			default: false
		},
		'display_nzbindex': 
		{
			label: GM_trans.lang('display_nzbindex'),
			type: 'checkbox',
			default: true
		},
		'display_yabsearch':
		{
			label: GM_trans.lang('display_yabsearch'),
			type: 'checkbox', 
			default: false
		},
		'display_yubse':
		{
			label: GM_trans.lang('display_yubse'),
			type: 'checkbox', 
			default: true
		},
		'display_nzbfriends':
		{
			label: GM_trans.lang('display_nzbfriends'),
			type: 'checkbox', 
			default: false
		},
		'display_thxlink':
		{
			label: GM_trans.lang('display_thxlink'),
			type: 'checkbox', 
			default: true
		},
		'binnewz_nzblinks_place':
		{
			label: GM_trans.lang('binnewz_nzblinks_place'),
			type:'select',
			options:{1:GM_trans.lang('nzblinks_place_title'),2:GM_trans.lang('nzblinks_place_file'),3:GM_trans.lang('nzblinks_place_size')},
			default:1
		},
		// 1 : Place NZB links in the size cell
		// 2 : Place NZB links in the file cell
		// 3 : Place NZB links in the title cell
		'binnewz_resize': 
		{
			label: GM_trans.lang('option_resize'),
			type: 'text',
			default: '100'
		},
		'binnewz_highlighttolerance': 
		{
			label: GM_trans.lang('binnewz_highlighttolerance'),
			type: 'checkbox',
			default: true
		},
		'binnewz_selectedresultcolor': 
		{
			label: GM_trans.lang('binnewz_selectedresultcolor'),
			type: 'text',
			default: '#95E07E'
		},
		'binnewz_toleranceresultcolor': 
		{
			label: GM_trans.lang('binnewz_toleranceresultcolor'),
			type: 'text',
			default: '#C7E2BF' //(lesser green)
		},
		'binnewz_displaysearchinformations': 
		{
			label: GM_trans.lang('binnewz_displaysearchinformations'),
			type: 'checkbox',
			default: true
		},
		'binnewz_highlightifpassword': 
		{
			label: GM_trans.lang('binnewz_highlightifpassword'),
			type: 'checkbox',
			default: true
		},
		'binnewz_donothingifpassword': 
		{
			label: GM_trans.lang('binnewz_donothingifpassword'),
			type: 'checkbox',
			default: true
		},
	    'binsearch_nzbbuttons': 
		{
			'section': ['Binsearch'],
	        label: GM_trans.lang('binsearch_nzbbuttons'),
	        type: 'checkbox',
	        default: true
	    },
	    'binsearch_nzbbuttoncolor': 
		{
	        label: GM_trans.lang('binsearch_nzbbuttoncolor'),
	        type: 'text',
	        default: '#EAD7D7'
	    },
		'binsearch_nonzbbuttonifpassword': 
		{
	        label: GM_trans.lang('binsearch_nonzbbuttonifpassword'),
	        type: 'checkbox',
	        default: true
	    },
		'binsearch_nocheckboxifpassword': 
		{
	        label: GM_trans.lang('option_nocheckboxifpassword'),
	        type: 'checkbox',
	        default: true
	    },
		'binsearch_highlightifpassword': 
		{
			label: GM_trans.lang('option_highlightifpassword'),
			type: 'checkbox',
			default: true
		},
		'binsearch_missingpartsdetails':
		{
	        label: GM_trans.lang('binsearch_missingpartsdetails_option'),
	        type: 'checkbox',
	        default: true
	    },
		'binsearch_selectbuttons': 
		{
	        label: GM_trans.lang('binsearch_selectbuttons'),
	        type: 'checkbox',
	        default: true
	    },
		'binsearch_noresultbutton': 
		{
	        label: GM_trans.lang('binsearch_noresultbutton'),
	        type: 'checkbox',
	        default: true
	    },
		'binsearch_autoloadothersearch': 
		{
	        label: GM_trans.lang('binsearch_autoloadothersearch'),
	        type: 'checkbox',
	        default: true
	    },
		'binsearch_resize': 
		{
			label: GM_trans.lang('option_resize'),
			type: 'text',
			default: '100'
		},
		'binsearch_scrolltoresults': 
		{
			label: GM_trans.lang('option_scrolltoresults'),
			type: 'checkbox',
			default: true
		},
		'binsearch_delete_oldcontentline': 
		{
			label: GM_trans.lang('binsearch_delete_oldcontentline'),
			type: 'checkbox',
			default: true
		},
		'binsearch_advancedsearch': 
		{
			label: GM_trans.lang('binsearch_advancedsearch'),
			type: 'checkbox',
			default: false
		},
		'binsearch_showcollections': 
		{
			label: GM_trans.lang('binsearch_showcollections'),
			type: 'checkbox',
			default: false
		},
		'binsearch_autoloadnzbindex': 
		{
			label: GM_trans.lang('binsearch_autoloadnzbindex'),
			type: 'checkbox',
			default: true
		},
		'nzbindex_nonzbbuttonifpassword': 
		{
			'section': ['NZBIndex'],
	        label: GM_trans.lang('nzbindex_nonzbbuttonifpassword'),
	        type: 'checkbox',
	        default: true
	    },
		'nzbindex_nocheckboxifpassword': 
		{
	        label: GM_trans.lang('option_nocheckboxifpassword'),
	        type: 'checkbox',
	        default: true
	    },
		'nzbindex_highlightifpassword': 
		{
			label: GM_trans.lang('option_highlightifpassword'),
			type: 'checkbox',
			default: true
		},
		'nzbindex_scrolltoresults': 
		{
			label: GM_trans.lang('option_scrolltoresults'),
			type: 'checkbox',
			default: true
		},
		'nzbindex_delete_oldcontentline': 
		{
			label: GM_trans.lang('nzbindex_delete_oldcontentline'),
			type: 'checkbox',
			default: true
		},
		'nzbindex_onlycollections': 
		{
			label: GM_trans.lang('nzbindex_onlycollections'),
			type: 'checkbox',
			default: false
		},
		'nzbindex_orderbuttons': 
		{
			label: GM_trans.lang('nzbindex_orderbuttons'),
			type: 'checkbox',
			default: true
		},
		'nzbindex_resize': 
		{
			label: GM_trans.lang('option_resize'),
			type: 'text',
			default: '100'
		},
		'nzbindex_resultLinks_fontSize': 
		{
			label: GM_trans.lang('nzbindex_resultLinks_fontSize'),
			type: 'text',
			default: '13'
		},
		'nzbindex_autoloadbinsearch':
		{
			label: GM_trans.lang('nzbindex_autoloadbinsearch'),
			type: 'checkbox',
			default: true
		},
		'rating_imdb': 
		{
			'section': [GM_trans.lang('rating')],
			label: GM_trans.lang('rating_imdb'),
			type: 'checkbox',
			default: true
		},
		'rating_betaseries': 
		{
			label: GM_trans.lang('rating_betaseries'),
			type: 'checkbox',
			default: true
		},
		'rating_BS_infos':
		{
			label: GM_trans.lang('rating_BS_infos'),
			type:'select',
			options:{1:GM_trans.lang('rating_serie'),2:GM_trans.lang('rating_episode')},
			default:1
		},
		// 1 : Rating only
		// 2 : Star only
		// 3 : Rating + Star
		'rating_starmode': 
		{
			label: GM_trans.lang('rating_starmode'),
			type:'select',
			options:{1:GM_trans.lang('textmode'),2:GM_trans.lang('starmode'),3:GM_trans.lang('textmode') + ' & ' + GM_trans.lang('starmode')},
			default:2
		},		
		'rating_displayMode_byCook2': 
		{
			label: GM_trans.lang('rating_displayMode_byCook2'),
			type: 'checkbox',
			default: false
		},	
		'rating_shownotation':
		{
			label: GM_trans.lang('rating_shownotation'),
			type:'select',
			options:{1:'5 ' + GM_trans.lang('stars'),2:'10 ' + GM_trans.lang('stars')},
			default:1
		},
		'rating_displayMode':
		{
			label: GM_trans.lang('rating_displayMode'),
			type: 'checkbox',
			default: false
		},
		'rating_showgreystars': 
		{
			label: GM_trans.lang('rating_showgreystars'),
			type: 'checkbox',
			default: true
		},
		'rating_showvotes': 
		{
			label: GM_trans.lang('rating_showvotes'),
			type: 'checkbox',
			default: true
		},
		'rating_twolines': 
		{
			label: GM_trans.lang('rating_twolines'),
			type: 'checkbox',
			default: true
		},
		'debug_log': 
		{
			'section': [GM_trans.lang('debug')],
			label: GM_trans.lang('debug_log'),
			type: 'checkbox',
			default: false
		},
		'debug_time': 
		{
			label: GM_trans.lang('debug_time'),
			type: 'checkbox',
			default: false
		}
	},
	configStyle, //My CSS modifications (see upper)
	  {
	    open: function() {},
	    save: function() { 
				location.reload(); 
		},
		close: function() {
		//GM_config.fadeIn();
		}
	  }
	);

	//GM_registerMenuCommand(GM_trans.lang('ConfigTitle'),GM_config.open);
}






//---------------------------------------------
//---------------------CSS-------------------
//---------------------------------------------

//----------------------------------------------
//----------------------------------------------
//--------------------MAIN------------------
//----------------------------------------------
//----------------------------------------------

var website=null;
var protocol='http://';
if (document.location.hostname.indexOf('binnews.in')!=-1) {
	website='binnewz';
	if (GM_config.read().searchnzb_forcessl)
		protocol='https://';
}
else {
	if (GM_config.read().searchnzb_forcessl){
		protocol='https://';
		if(document.location.protocol=='http:') //If acceeding nzb search engines without SSL while user wants SSL
			document.location.href=document.location.href.replace('http:', 'https:'); //we reload the page with ssl
	}
	if (document.location.hostname.indexOf('binsearch.info')!=-1) {
		//Theres a feature within Binsearch thats displays a 'Now loading' message ... script must not load in that case
		if (document.getElementsByTagName('h1')[0]==null) return;
		website='binsearch';
	}	
	else if (document.location.hostname.indexOf('nzbindex.com')!=-1) website='nzbindex';
	else if (document.location.hostname.indexOf('nzbclub.com')!=-1) website='nzbclub';
}

initConfig();
GM_config.save();


//URL Parameters associative array
UrlParams=extractUrlParams();
var query=UrlParams["q"];
if(typeof query=='undefined') query='';
//Variables for the Hightlight Option
var sinceXdays=UrlParams["sinceXdays"];
if(typeof sinceXdays=='undefined') sinceXdays='';
var fromGroups=UrlParams["fromGroups"];
if(typeof fromGroups=='undefined') fromGroups='';
var showcol=UrlParams["showcol"];
var myorder=UrlParams["myorder"];
if(typeof myorder=='undefined') //if NZBIndex is accessed directly with an order param
	if(typeof UrlParams["sort"]!='undefined') myorder=UrlParams["sort"];
	else myorder='';
var pingpong=UrlParams["pong"];
if(typeof pingpong=='undefined') pingpong='';
if(document.styleSheets.length!=0)
	var sty = document.styleSheets[document.styleSheets.length - 1];
else
	var sty = null;

if (website=='binsearch') { //Binsearch modifications
	
	var searchform=document.getElementsByName('r')[0];
	var tabresults=document.getElementById('r2');
	var top_div=tabresults;
	var searchServers=UrlParams["server"];
	var autoload=UrlParams["autoload"];
	var coldetails=UrlParams["b"];
	
	binsearch_configurationIntegration();
	if (GM_config.read().deletead) Binsearch_DeleteAd();
	
	if(GM_config.read().option_fixedheader) binsearch_fixedHeader(); //A appeler après binsearch_configurationIntegration();
	
	if (typeof searchform != 'undefined'&& typeof coldetails == 'undefined' && query != '') {//no 'r' searchform, no 'q' param, or presence of 'b' param : not a results page, just the basic or advanced query form
		if (tabresults!=null) { //if there is results in Binsearch
	
			resize_binsearch(GM_config.read().binsearch_resize);
			
			if(sinceXdays!=null || fromGroups!=null) {
				//Theres a bug with Firefox 4.* and 3.* : Binsearch results source code is not the same 
				if(searchform.parentNode.tagName=="TD") //first case : firefox 4 
					insertInformations(document.getElementsByClassName('mt')[0].children[0].children[1].children[1], searchform);
				else if(searchform.parentNode.tagName=="FORM") //2nd case : Firefox 3
					insertInformations(document.getElementsByTagName("FORM")[0], searchform);
			}
			
			//selectTheResult : to know if theres only one result
			selectTheResult=searchform.getElementsByTagName('table')[searchform.getElementsByTagName('table').length-1].getElementsByTagName('td')[0].textContent.search(/ 1 /)!=-1;
			if (GM_config.read().binsearch_selectbuttons && BrowserDetect.browser!='Chrome') make_select_buttons();
			if (GM_config.read().binsearch_scrolltoresults)  top_div.scrollIntoView();
			
			
			if(BrowserDetect.browser!='Chrome'){
				//This part to prepare the 'clickRow' functionnality
				var inputsCol=tabresults.parentNode.parentNode.children;
				for(i=0;i<inputsCol.length;i++){ //We change the javascript function called by some binsearch buttons
					if(inputsCol[i].tagName=="INPUT" && inputsCol[i].value=="Inverse"){	
						inputsCol[i].setAttribute('onclick', 'clickTheseRows(document.getElementById("r2"));');		
					}
				}
			}//End part	
			// add hover effect to all rows
			sty.insertRule("form p table#r2 tr:hover { background-color: #ffb ! important; }", 0);
			// add hover effect to all selected rows
			sty.insertRule("form p table#r2 tr.selected:hover { background-color: #fd7 ! important; }", 0);
			
			binsearch_process_results(); //processing results
			
		}else{ //if there is no results
			if (GM_config.read().binsearch_autoloadothersearch) {
				if(binsearch_autoload_othergroups()) //if returns true, it means that an other groups search has already been done.
					if(GM_config.read().binsearch_autoloadnzbindex && pingpong!=1){ //if this option is checked, auto search on NZBIndex (only if not already search on NZBIndex)
						document.location.href=nzbindex_makeurl(document.getElementById('originalQuery').value, "&pong=1");
					}
			}		
			binsearch_delete_input(searchform); //delete all buttons ... more logical
			if (GM_config.read().binsearch_noresultbutton) make_noresult_button();
		}

		binsearch_make_othernzbindexer_button();

	}

}else if (website=='binnewz') { //Binnewz modification	

	binnewz_configurationIntegration();
	if(GM_config.read().option_fixedheader) Binnewz_fixedHeader(); //exécuté le plus tôt possible 	
	
	var tabresults=document.getElementById('table_results');
	if (tabresults==null)
		tabresults=document.getElementById('tabliste');
	
		
	// var tabresults_count=1;
	//tabresults.setAttribute('id','tabliste_' + tabresults_count);

	//We need to know which column is for title or file or ... (this changes regarding the results' category)
	var THCol=tabresults.getElementsByClassName('column_heading marker');
	for(i=0;i<THCol.length;i++){
		if(THCol[i].firstElementChild!=null){
	
			if(THCol[i].firstElementChild.textContent=="Titre"){
				var titleIndex=i+1;
				continue;
			}
			else if(THCol[i].firstElementChild.textContent=="Newsgroup"){
				var groupsIndex=i+1;
				continue;
			}
			else if(THCol[i].firstElementChild.textContent=="Fichier"){
				var fileIndex=i+1;
				continue;
			}
			else if(THCol[i].firstElementChild.textContent=="Taille"){
				var sizeIndex=i+1;	
				continue;
			}
			else if(THCol[i].firstElementChild.innerHTML.indexOf('Merci')!=-1){
				var thanksIndex=i+1;
				continue;
			}
		}
	}
	
	
	if(titleIndex!=null){ //On est sur une page normale de liste de référencements
		var resultsType=1;
		var cat_id=UrlParams["cat_id"];
		if (typeof cat_id=='undefined')
			cat_id=document.getElementById('fp_cat_id').value;
		var binnewz_goodCat=['6','23','39','27','48','49','100','101','102','103','104','105','11'];
		var binnewz_tvCat=['7', '26', '44'];
	}else{
		if(document.getElementById('DivRes')!=null) {	
			//page de recherche : méthode temporaire (resultsType=2)
			resultsType=2;
			var titleIndex=2; 
			var groupsIndex=4;
			var fileIndex=5;
			var sizeIndex=6;
			var thanksIndex=9;
		}else{ //page des derniers référencements (resultsType=3)
			resultsType=3;
			var catIndex=2;
			var titleIndex=4; 
			var groupsIndex=6;
			var fileIndex=7;
			var sizeIndex=8;
			var thanksIndex=11;
		}
	}
	
	
	if (GM_config.read().deletead) binnewz_DeleteAd();
	
	if (tabresults!=null){

		display_nzb_links(); //NZB Links on results
		resize_binnewz(tabresults, GM_config.read().binnewz_resize); //Binnewz search results Width Modification 
	
	}

	
}else if (website=='nzbindex') { //NZBIndex modification	

	var nzbindex_buttons=document.getElementsByClassName('line');
	var nzbindex_results=document.getElementById('results');
	var top_div=nzbindex_results;
	var THead=nzbindex_results.getElementsByTagName('thead')[0];
	
	nzbindex_configurationIntegration();
	
	//If results or not we do this
	nzbindex_make_othernzbindexer_button();
	if (GM_config.read().deletead) Nzbindex_DeleteAd();
	
	
	if(GM_config.read().option_fixedheader) nzbindex_fixedHeader();
	
		
	if (nzbindex_buttons.length>0){ //Only if there are results
		if(BrowserDetect.browser!='Chrome') nzbindex_add_buttons();
		if(sinceXdays!=null || fromGroups!=null) insertInformations(nzbindex_results, nzbindex_results.firstElementChild);
		resize_nzbindex(GM_config.read().nzbindex_resize);	
		selectTheResult=THead.firstElementChild.children[1].firstElementChild.childNodes[1].textContent.search(/of 1 /)!=-1; //If true : one result only 	
		if (GM_config.read().nzbindex_scrolltoresults) 
			top_div.scrollIntoView();
		nzbindex_onlycollections();
		if (GM_config.read().nzbindex_orderbuttons) 
			nzbindex_orderbuttons();
		nzbindex_otherresultspages_correction();
		
		//This part to prepare the 'clickRow' functionnality
		if(BrowserDetect.browser!='Chrome'){
			for(j=0;j<nzbindex_buttons.length;j++){ //We change the javascript function called by some nzbindex buttons
				var inputsCol=nzbindex_buttons[j].firstElementChild.getElementsByTagName('INPUT');
				for(i=0;i<inputsCol.length;i++){
					switch(inputsCol[i].value){
						case "Select all":
							inputsCol[i].setAttribute('onclick', 'clickTheseRows(document.getElementById("results").getElementsByTagName("TBODY")[0], 1);');
							eval("index_selectbutton_" + j + "=" + i);
							break;
						case "Inverse":
							inputsCol[i].setAttribute('onclick', 'clickTheseRows(document.getElementById("results").getElementsByTagName("TBODY")[0]);');		
							break;
					}
				}
			}
		}
		// add hover effect to all rows
		sty.insertRule("div#results form table tbody tr:hover { background-color: #ffb ! important; }", 0);
		// add hover effect to all selected rows
		sty.insertRule("div#results form table tbody tr.selected:hover { background-color: #fd7 ! important; }", 0);
		//End part
		
		nzbindex_process_results(); //processing results
		
	}else{
		if(GM_config.read().nzbindex_autoloadbinsearch && pingpong!=1) //if this option is checked, auto search on Binsearch (only if not already search on Binsearch)
			document.location.href=binsearch_makeurl(document.getElementsByName('q')[0].value, "&pong=1");
	}
	
}else if (website=='nzbclub') { //NZBClub modification	

	nzbclub_content=document.getElementById('RAD_SPLITTER_PANE_CONTENT_ctl00_ContentPlaceHolder2_MainPane');
	nzbclub_query=document.getElementById('ctl00_ContentPlaceHolder2_ui_searchterm').value;
	if(typeof document.getElementsByClassName('rgMasterTable')[0].getElementsByTagName('TBODY')[0].getElementsByClassName('rgNoRecords') != 'undefined') //theres is at least one result, query is in the input text 'q'
		nzbclub_results=document.querySelectorAll('.rgRow, .rgAltRow');
		
	nzbclub_configurationIntegration();
	
	if (GM_config.read().deletead) nzbclub_DeleteAd();
	nzbclub_add_othernzbindexer_button();
	
	if(nzbclub_results!=null){ //there are results on nzbclub

		if(sinceXdays != '' || fromGroups != '')  insertInformations(nzbclub_content, document.getElementById('ctl00_ContentPlaceHolder2_RadGrid1'));
	
		selectTheResult=document.getElementsByClassName('rgWrap rgInfoPart')[0].textContent.search(/of 1 /)!=-1;
		
		nzbclub_process_results(); //processing results
		
	}
	
	if(GM_config.read().option_fixedheader) nzbclub_fixedHeader();
}

//debug time - this is the end of the main script
if(GM_config.read().debug_time) insertExecTime(document.getElementById('BU_conf'));


document.addEventListener("AutoPagerAfterInsert", function (e){
	if(website=="binnewz" && tabresults!=null){
		display_nzb_links(); 
		resize_binnewz(e.target, GM_config.read().binnewz_resize);
	}else if(website=="binsearch")
		binsearch_process_results();
}, true);



//----------------------------------------
//---------FONCTIONS COMMUNES-------------
//----------------------------------------

function createConfigurationMenu(){

	var mymenu=document.createElement('DIV');
	mymenu.id="BU_conf";
	mymenu.innerHTML="<font color='red'><strong>Better Usenet</strong></font> (v" + thisVersion + ")  :  ";

	//Configuration Link
	var tmp_link=document.createElement('a');
	tmp_link.addEventListener('click', function(){ GM_config.open();}, false );
	tmp_link.href = 'javascript:void(0);';
	tmp_link.innerHTML = GM_trans.lang('script_link_openingconfiguration');
	mymenu.appendChild(tmp_link);
	//	
	if(BrowserDetect.browser!='Chrome'){
		mymenu.appendChild(document.createTextNode('  -  '));
		//Check update Link
		var tmp_link=document.createElement('a');
		tmp_link.addEventListener('click', function(){ GMSUC_Control(1);}, false );
		tmp_link.href = 'javascript:void(0);';
		tmp_link.innerHTML = GM_trans.lang('script_link_lookingforupdate');
		mymenu.appendChild(tmp_link);
		//
	}
	mymenu.appendChild(document.createTextNode('  -  '));

	//Whats new ? Link
	var tmp_link=document.createElement('a');
	tmp_link.href = 'http://forum.les-newsgroup.fr/Msg-Historique-des-versions-de-Better-Usenet?utm_source=betterusenet&utm_medium=menu';
	tmp_link.target= '_blank';
	tmp_link.innerHTML = GM_trans.lang('script_link_whatsnew');
	mymenu.appendChild(tmp_link);
	
	mymenu.appendChild(document.createTextNode('  -  '));	
	
	//Site officiel Link
	var tmp_link=document.createElement('a');
	tmp_link.href = 'http://www.les-newsgroup.fr/?utm_source=betterusenet&utm_medium=menu';
	tmp_link.target= '_blank';
	tmp_link.innerHTML = GM_trans.lang('script_link_siteofficiel');
	mymenu.appendChild(tmp_link);
	//
	
	
	//Forum Link
	//var tmp_link=document.createElement('a');
	//tmp_link.href = 'http://forum.les-newsgroup.fr/Msg-Un-nouveau-script-pour-am%C3%A9liorer-Binnews-et-Binsearch-Better-Usenet';
	//tmp_link.href = 'http://forum.les-newsgroup.fr/Forum-Le-script-Better-Usenet-pour-Binnewz-NZBIndex-et-Binsearch';
	//tmp_link.target= '_blank';
	//tmp_link.innerHTML = GM_trans.lang('script_link_forum');
	//mymenu.appendChild(tmp_link);
	//
	//mymenu.appendChild(document.createTextNode('  -  '));
	
	return mymenu;
}


function createButton(buttonLabel, queryUrl){

	var resultButton=document.createElement('input');
	resultButton.value=GM_trans.lang('othernzbindexer_button') + ' ' + buttonLabel;
	resultButton.type='button';
	resultButton.name=name;
	resultButton.setAttribute('style', 'color:green; ');
	resultButton.setAttribute('onclick', 'document.location.href="' + queryUrl + '";');
	
	return resultButton;

}

function insertInformations(parentNode, afterNode) {

		//DIV integration
		top_div=document.createElement('div');
		top_div.id="top_div";
		//top_div.set('style',);
		mydiv1=document.createElement('div');
		mydiv1.setAttribute('style', 'float:right; margin:5px; text-align:right;');
		//mydiv1.innerHTML='<u>test</u>';
		if (sinceXdays != '' || fromGroups!='')
			insertSelectedResultsLegend(mydiv1);

		mydiv3=document.createElement('div');
		mydiv3.setAttribute('style', 'float:left;margin:5px; text-align:left;height:auto');
		//mydiv3.innerHTML='<i>test</i>';	
		insertBinnewzSelection(mydiv3);

		before_div=document.createElement('div');
		before_div.setAttribute('style', 'display:block;clear:both;');
		top_div.appendChild(mydiv1);
		top_div.appendChild(mydiv3);
		after_div=document.createElement('div');
		after_div.setAttribute('style', 'display:block;clear:both;');
		
		parentNode.insertBefore(before_div, afterNode);
		parentNode.insertBefore(top_div, afterNode);
		parentNode.insertBefore(after_div, afterNode);
	
}

function insertSelectedResultsLegend(div){

	tmpdiv=document.createElement('div');
	tmpdiv.setAttribute('style', 'float:right;text-align:left;');	
	div.appendChild(tmpdiv);
	
	div.firstElementChild.innerHTML='<b>'+GM_trans.lang('caption_title') + ' :</b><br />';
	
	tmpspan=document.createElement('span');
	tmpspan.setAttribute('style', 'display:inline-block;width:30px; height:20px; margin-bottom:3px; background-color:'+GM_config.read().binnewz_selectedresultcolor+';');
	tmpspan.innerHTML='&nbsp;'
	div.firstElementChild.appendChild(tmpspan);
	div.firstElementChild.appendChild(document.createTextNode(' : '+GM_trans.lang('caption_selectedresult')));
	
	div.firstElementChild.innerHTML+='<br>';
	
	tmpspan=document.createElement('span');
	tmpspan.setAttribute('style', 'display:inline-block;width:30px; height:20px;background-color:'+GM_config.read().binnewz_toleranceresultcolor+';');
	tmpspan.innerHTML='&nbsp;'
	div.firstElementChild.appendChild(tmpspan);
	div.firstElementChild.appendChild(document.createTextNode(' : '+GM_trans.lang('caption_toleranceresult')));

}

function insertBinnewzSelection(div) {
	
	var qInput=document.getElementsByName('q');
	if (website!='nzbclub')
		qInput=qInput[0].value;
	else //NZBClub Case
		qInput=nzbclub_query;
	
	div.innerHTML='<b>'+GM_trans.lang('binnewz_searchinformations_title') + ' :</b><br />';
	div.innerHTML+=GM_trans.lang('filename') + ' : <font color="red"><strong>' + qInput + '</strong></font><br />';
	div.innerHTML+=GM_trans.lang('age') + ' : ';
	if (sinceXdays != '') div.innerHTML+='<font color="red"><strong>' + sinceXdays + ' ' + GM_trans.lang('days')+'</strong></font>';
	div.innerHTML+='<br />';
	div.innerHTML+=GM_trans.lang('groups') + ' : <font color="red"><strong>' + fromGroups.replace(/^\|/, '').replace(/\|$/, '').split('|').join(' '+GM_trans.lang('or').toUpperCase()+' ') + '</strong></font><br />';

}




//-------------------------------------------
//-------------------------------------------
//--------------NZBClub---------------
//-------------------------------------------
function nzbclub_configurationIntegration(){


	var mymenu=createConfigurationMenu();
	
	//setAttribute('style' ... remplace t il le style  ou just append to it ?
	mymenu.setAttribute('style', 'position:absolute;background-color:#fff;font-size:1.3em;color:#000;');
	
	before_div=document.createElement('div');
	before_div.setAttribute('style', 'clear:both;');
		
	// document.getElementById('ctl00_ui_mainmenu').children[0].setAttribute('style', 'clear:none;');
	document.getElementById('ctl00_ui_mainmenu').insertBefore(mymenu, document.getElementById('ctl00_ui_mainmenu_ClientState'));
	document.getElementById('ctl00_ui_mainmenu').setAttribute('style',document.getElementById('ctl00_ui_mainmenu').getAttribute('style') + ';z-index:0');
	document.getElementById('ctl00_ContentPlaceHolder2_RadGrid1').insertBefore(before_div, document.getElementsByClassName('rgMasterTable')[0]);
}

function nzbclub_DeleteAd() {

	var iframeAds = document.evaluate( '//iframe' ,document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
	for(i=0;i<=iframeAds.snapshotLength-1;i++) {
		tmp_element=iframeAds.snapshotItem(i);
		tmp_element.parentNode.removeChild(tmp_element);
	}	
	document.getElementsByClassName('contentpad')[0].parentNode.removeChild(document.getElementsByClassName('contentpad')[0]);
	
	var linkAds = document.evaluate( '//a[contains(@href,"providerid=")]' ,document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
	for(i=0;i<=linkAds.snapshotLength-1;i++) {
		tmp_element=linkAds.snapshotItem(i);
		tmp_element.parentNode.removeChild(tmp_element);
	}
	
}


function nzbclub_add_othernzbindexer_button(){

	var nzbindexButton=createButton('NZBIndex', nzbindex_makeurl(nzbclub_query));
	var binsearchButton=createButton('Binsearch', binsearch_makeurl(nzbclub_query));
	
	var buttonsCol = document.evaluate( '//a[@title="Last Page"]' ,document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
	//Add buttons at top of results
	insertAfter(nzbindexButton, buttonsCol.snapshotItem(0));
	insertAfter(document.createTextNode(' '), buttonsCol.snapshotItem(0));
	insertAfter(binsearchButton, buttonsCol.snapshotItem(0));
	insertAfter(document.createTextNode(' '), buttonsCol.snapshotItem(0));
	//Add buttons at bottom of results
	insertAfter(nzbindexButton.cloneNode(0), buttonsCol.snapshotItem(1));
	insertAfter(document.createTextNode(' '), buttonsCol.snapshotItem(1));
	insertAfter(binsearchButton.cloneNode(0), buttonsCol.snapshotItem(1));
	insertAfter(document.createTextNode(' '), buttonsCol.snapshotItem(1));

}

function nzbclub_makeurl(search, otherparams){

	var host='www.nzbclub.com/search.aspx';
	var params='?sp=1&q='+escape(search);
	params+='&sinceXdays=' + sinceXdays + '&fromGroups=' + fromGroups;
	if(typeof otherparams!='undefined') params=params+otherparams

	return protocol+host+params
}


function nzbclub_process_results(){

	if (fromGroups!=''){ //We do this only one time to save some millisec
		fromGroups=fromGroups.replace(/\./g,'')
		var tmp_groups=fromGroups.split('|');
	}
	var TRCollection=nzbclub_results; //TBODY
	for(i=0;i<TRCollection.length;i++){
		var TDCollection=TRCollection[i].getElementsByTagName('TD');
		var resultInfos=TDCollection[2]; //Td
		var ageInfos=TDCollection[4]; //Td
		
		var linkCloned=TDCollection[5].children[0].children[0].cloneNode(true);
		TDCollection[0].appendChild(linkCloned);
		TDCollection[0].children[1].innerHTML=TDCollection[0].children[1].innerHTML.replace(' Get NZB','');
		TDCollection[0].children[0].setAttribute('style', 'margin-bottom:15px;');
		TDCollection[0].getElementsByTagName('IMG')[0].setAttribute('title', 'Get NZB');
		
		if (sinceXdays != ''){
		
			//OPTION : if age corresponds then when hightlight the Age cell
			var thisresultAge=ageInfos.firstElementChild.innerHTML;
			if (test_sinceXdays(thisresultAge, sinceXdays)) {
				ageInfos.setAttribute('style',"background-color:" + GM_config.read().binnewz_selectedresultcolor + ";");
				tmp_indic=true;
			}
			else { //Here we do a little magic ... see sometimes binnewz displays days like '1day' but nzbindexers could have indexed the file 2days ago. Its  often a matter of 1 or 2 days 
				   //so if the option is checked, we do the same test with +-1 day
				if(GM_config.read().binnewz_highlighttolerance){ 
					var tolerance_check=false;
					if(sinceXdays>0) 
						if (test_sinceXdays(thisresultAge, parseInt(sinceXdays)-1)) tolerance_check=true;  //test with -1 day (only if sinceXdays != 0day)
					
					if (!tolerance_check && test_sinceXdays(thisresultAge, parseInt(sinceXdays)+1)) tolerance_check=true; //test with +1 day
							
					if (tolerance_check==true) {
						ageInfos.setAttribute('style',"background-color:" + GM_config.read().binnewz_toleranceresultcolor + ";");
						tmp_indic=true;
					}
				}  
			}
		}
			
		//Now checking if group corresponds, if so we highlight the groups Cell
		if (typeof tmp_groups != 'undefined'){//check only if groups have been passed within the url  (see 'tmp_groups' declaration at start of function)
		
			var thisresultGroup=resultInfos.getElementsByTagName("A")[1].innerHTML;
	
			if(thisresultGroup!=null)			
				thisresultGroup=thisresultGroup.replace(/\./g, '');
			
			for(j=0;j<tmp_groups.length;j++){
				if (tmp_groups[j]!='' && tmp_groups[j]==thisresultGroup){
					resultInfos.getElementsByTagName("A")[1].setAttribute('style',"background-color:" + GM_config.read().binnewz_selectedresultcolor + ";");	
					break;
				}
			}			
		}

	}
}

function nzbclub_fixedHeader(){

	var new_element=document.createElement('DIV');
	new_element.setAttribute('style', 'position:fixed;top:26px;');
		document.getElementById('RAD_SPLITTER_PANE_TR_ctl00_TopPane').parentNode.insertBefore(new_element, document.getElementById('RAD_SPLITTER_PANE_TR_ctl00_TopPane').nextSibling);
	document.getElementById('RAD_SPLITTER_PANE_CONTENT_ctl00_ContentPlaceHolder2_MainPane').children[0].setAttribute('style', 'position:fixed;left:50%;margin-left:-200px;top:26px;background-color:rgba(0,0,0,0.5);');



}

//-------------------------------------------
//-------------------------------------------
//--------------NZBIndex-----------------
//-------------------------------------------
function nzbindex_configurationIntegration(){

	var nzbindexMenu=document.getElementById('menu');
	nzbindexMenu.firstElementChild.setAttribute('style', 'margin:10px;');
	
	var mymenu=createConfigurationMenu();
	mymenu.setAttribute('style', 'position:relative;left:-50px;font-size: 14px;');
	
	nzbindexMenu.insertBefore(mymenu, nzbindexMenu.firstElementChild.nextElementSibling);
}

function nzbindex_make_othernzbindexer_button() {
	
	var binsearchButton=createButton('Binsearch', binsearch_makeurl(document.getElementsByName('q')[0].value));
	var nzbclubButton=createButton('NZBClub', nzbclub_makeurl(document.getElementsByName('q')[0].value));
	
	if (nzbindex_buttons.length>0){
		//Adding Binsearch button
		nzbindex_buttons[0].firstElementChild.appendChild(document.createTextNode(' '));
		nzbindex_buttons[0].firstElementChild.appendChild(binsearchButton);
		nzbindex_buttons[1].firstElementChild.appendChild(document.createTextNode(' '));
		nzbindex_buttons[1].firstElementChild.appendChild(binsearchButton.cloneNode(0));
		
		//Adding nzbclub button
		nzbindex_buttons[0].firstElementChild.appendChild(document.createTextNode(' '));
		nzbindex_buttons[0].firstElementChild.appendChild(nzbclubButton);
		nzbindex_buttons[1].firstElementChild.appendChild(document.createTextNode(' '));
		nzbindex_buttons[1].firstElementChild.appendChild(nzbclubButton.cloneNode(0));
	}else{
		binsearchButton.setAttribute('style', 'color:red; padding:15px; font-size:17px; font-weight:bold;');
		binsearchButton.value=GM_trans.lang('noresult_button') + ' - ' + binsearchButton.value;
		nzbindex_results.getElementsByTagName('h2')[0].parentNode.replaceChild(binsearchButton, nzbindex_results.getElementsByTagName('h2')[0]);
		
		nzbclubButton.setAttribute('style', 'color:red; padding:15px; font-size:17px; font-weight:bold;');
		insertAfter(nzbclubButton, binsearchButton);
		insertAfter(document.createTextNode(' '), binsearchButton);
	}
			
}


function nzbindex_otherresultspages_correction() {

	var TFoot_links=nzbindex_results.getElementsByTagName('tfoot')[0].getElementsByTagName('a');
	for(i=0;i<TFoot_links.length;i++) {
	
		if(document.location.href.indexOf('p=') != - 1)
			TFoot_links[i].href=document.location.href.replace(/p=[0-9+]/, TFoot_links[i].href.match(/p=[0-9+]/)[0]);
		else
			TFoot_links[i].href=document.location.href + '&' + TFoot_links[i].href.match(/p=[0-9+]/)[0];
	}
}

function nzbindex_onlycollections(){
	
	var new_url=document.location.href;
	var ischecked=false;

	if (GM_config.read().nzbindex_onlycollections) ischecked=true;
	if (typeof showcol !='undefined')
		if (showcol=="1") ischecked=true;
		else if (showcol=="0")ischecked=false;	
	
	if (new_url.indexOf('showcol')!=-1){
		new_url=new_url.replace(/showcol=[0-9]/i,'showcol='+String(ischecked==true?0:1));
	}else {
		new_url=new_url+'&showcol='+String(ischecked==true?0:1);
	}

	nzbindex_showcollections=ischecked;
		
	var checkbox=document.createElement('input');
	checkbox.type='checkbox';
	checkbox.name='onlycollections';
	checkbox.checked=ischecked;
	checkbox.setAttribute('onchange',"document.location.href='"+new_url+"';");

	nzbindex_buttons[0].firstElementChild.appendChild(document.createTextNode(' '));
	nzbindex_buttons[0].firstElementChild.appendChild(checkbox);
	nzbindex_buttons[0].firstElementChild.appendChild(document.createTextNode(GM_trans.lang('nzbindex_str_onlycollections')));

	nzbindex_buttons[1].firstElementChild.appendChild(document.createTextNode(' '));
	nzbindex_buttons[1].firstElementChild.appendChild(checkbox.cloneNode(0));
	nzbindex_buttons[1].firstElementChild.appendChild(document.createTextNode(GM_trans.lang('nzbindex_str_onlycollections')));
		
	//display a link to options
	/*
	var tmp_link=document.createElement('a');
	tmp_link.addEventListener('click', function(){ GM_config.open(); }, false );
	tmp_link.href = 'javascript:void(0);';
	tmp_link.innerHTML = '('+GM_trans.lang('nzbindex_openoptions')+')';
	nzbindex_buttons[0].firstElementChild.appendChild(document.createTextNode(' '));
	nzbindex_buttons[0].firstElementChild.appendChild(tmp_link);
	*/
	
}

function Nzbindex_DeleteAd() {

	if (document.getElementById('main').children[2].firstElementChild.tagName=='CENTER') document.getElementById('main').removeChild(document.getElementById('main').children[2]);
	
}

function resize_nzbindex(tabwidth){

	nzbindex_results.setAttribute('style', 'width:' + tabwidth + '% !important');
	nzbindex_results.parentNode.setAttribute('style', 'margin-left:' + (100-tabwidth)/2 + '% !important;');	
	// nzbindex_results.parentNode.setAttribute('align', 'center');

}

//Note: there a mistake in the nzbindex order 'sort=agedesc' param ... 'agedesc' orders Asc (newest first while it whould order the 'bigger' first (the older)
//So I have inversed the buttonorder icon for Age ordering
function nzbindex_orderbuttons(){

	var ordersizebutton=document.createElement('img');
	ordersizebutton.setAttribute('style', 'cursor:pointer;');
	var orderagebutton=document.createElement('img');
	orderagebutton.setAttribute('style', 'cursor:pointer;');
	var newsizeorder='';
	var newageorder='';

	var srcimg_desc="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTM5jWRgMAAAAVdEVYdENyZWF0aW9uIFRpbWUAMi8xNy8wOCCcqlgAAAQRdEVYdFhNTDpjb20uYWRvYmUueG1wADw/eHBhY2tldCBiZWdpbj0iICAgIiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+Cjx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDQuMS1jMDM0IDQ2LjI3Mjk3NiwgU2F0IEphbiAyNyAyMDA3IDIyOjExOjQxICAgICAgICAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp4YXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iPgogICAgICAgICA8eGFwOkNyZWF0b3JUb29sPkFkb2JlIEZpcmV3b3JrcyBDUzM8L3hhcDpDcmVhdG9yVG9vbD4KICAgICAgICAgPHhhcDpDcmVhdGVEYXRlPjIwMDgtMDItMTdUMDI6MzY6NDVaPC94YXA6Q3JlYXRlRGF0ZT4KICAgICAgICAgPHhhcDpNb2RpZnlEYXRlPjIwMDgtMDMtMjRUMTk6MDA6NDJaPC94YXA6TW9kaWZ5RGF0ZT4KICAgICAgPC9yZGY6RGVzY3JpcHRpb24+CiAgICAgIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiCiAgICAgICAgICAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyI+CiAgICAgICAgIDxkYzpmb3JtYXQ+aW1hZ2UvcG5nPC9kYzpmb3JtYXQ+CiAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgogICA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDUdUmQAAACYSURBVDiNY/z//z8DJYCJIt3DwwAWZA5j3NTNDAwMPgT0bPm/KNsXqwEMDAw+DEGh+LWvW41iAaoBi3MYGRgY/jMEhkD4f/5AVUGVrV/D8H9RNiOKq5HTASMjVC52yn8GdzcGhq9fIXxubgaGnbsYGBbnMKKnG+wGwAzR14GwL16BuY6BeANghiC8hqEZwwBywMAnpIE3AADrkDbHF5Y+SAAAAABJRU5ErkJggg==";
	var srcimg_asc="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTM5jWRgMAAAAVdEVYdENyZWF0aW9uIFRpbWUAMi8xNy8wOCCcqlgAAAQRdEVYdFhNTDpjb20uYWRvYmUueG1wADw/eHBhY2tldCBiZWdpbj0iICAgIiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+Cjx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDQuMS1jMDM0IDQ2LjI3Mjk3NiwgU2F0IEphbiAyNyAyMDA3IDIyOjExOjQxICAgICAgICAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp4YXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iPgogICAgICAgICA8eGFwOkNyZWF0b3JUb29sPkFkb2JlIEZpcmV3b3JrcyBDUzM8L3hhcDpDcmVhdG9yVG9vbD4KICAgICAgICAgPHhhcDpDcmVhdGVEYXRlPjIwMDgtMDItMTdUMDI6MzY6NDVaPC94YXA6Q3JlYXRlRGF0ZT4KICAgICAgICAgPHhhcDpNb2RpZnlEYXRlPjIwMDgtMDMtMjRUMTk6MDA6NDJaPC94YXA6TW9kaWZ5RGF0ZT4KICAgICAgPC9yZGY6RGVzY3JpcHRpb24+CiAgICAgIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiCiAgICAgICAgICAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyI+CiAgICAgICAgIDxkYzpmb3JtYXQ+aW1hZ2UvcG5nPC9kYzpmb3JtYXQ+CiAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgogICA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDUdUmQAAACrSURBVDiN3ZIxDoJAEEXfCBXR09hYEmpsTCzxAu5x1gvIEeQQNJwGQ0fGYiMsrDZSkDjN5v/Z+Xk7WVFVltRm0fR/BMS+EJFpt7Buw6URgE8LjwPHHz6d30opjYhIECK+MRAUVsmP0PdORxFUDyiNzANCgsIqWQpdC13nvCSBLAWsApN3TgkuN+WwH7vt05277ejVDXq/DiFzgoq6yQOq+Z1vBL/U+h9p/YAXo6I3eRuo1KYAAAAASUVORK5CYII=";

	//default order button
	//ordersizebutton.src=srcimg_desc;
	newsizeorder='sizedesc';

	//orderagebutton.src=srcimg_desc;
	newageorder='agedesc';

	switch(myorder){
	
		case 'sizedesc':
			ordersizebutton.src=srcimg_asc;
			newsizeorder='size';
			break;
			
		case 'size':
			ordersizebutton.src=srcimg_desc;
			newsizeorder='sizedesc';
			break;
			
		case 'agedesc':
			orderagebutton.src=srcimg_desc;
			newageorder='age';
			break;
			
		case 'age':
			orderagebutton.src=srcimg_asc;
			newageorder='agedesc';
			break;
			
		default:
			ordersizebutton.src=srcimg_desc;
			orderagebutton.src=srcimg_asc;
			break;
	}
	
	//Size order button
	//ordersizebutton.src already set
	ordersizebutton.setAttribute('onClick', 'document.location.href=document.location.href.replace(/sort=[a-z]+/i, "sort='+newsizeorder+'")');
	if (ordersizebutton.src=='') ordersizebutton.src=srcimg_desc; //if no 'myorder' param, the img src had not been defined
	
	//Age order button
	//orderagebutton.src already set
	orderagebutton.setAttribute('onClick', 'document.location.href=document.location.href.replace(/sort=[a-z]+/i, "sort='+newageorder+'")');
	if (orderagebutton.src=='') orderagebutton.src=srcimg_asc; //if no 'myorder' param, the img src had not been defined
	
	var ordercolumns=THead.getElementsByTagName('h2');
	ordercolumns[0].setAttribute('style', 'font-size:15px;');
	ordercolumns[0].appendChild(ordersizebutton);
	ordercolumns[2].appendChild(orderagebutton);
	
	
}


function nzbindex_process_results(){
	
	if (fromGroups!=''){ //We do this only one time to save some millisec
		fromGroups=fromGroups.replace(/\./g,'')
		var tmp_groups=fromGroups.split('|');
	}
	var TRCollection=nzbindex_results.getElementsByTagName('tbody')[0].getElementsByTagName('tr');
	var TRDeleted=0;
	for(i=0;i<TRCollection.length;i++){
		
		if (TRCollection[i].firstElementChild.className.indexOf('firstcolumn')!=-1) { //This is a result line (firstcolum is a class for the checkbox cells)
			
			var resultLine=TRCollection[i].children; //A TD collection
			var links=resultLine[1].getElementsByClassName('info')[0].lastElementChild;
			
			if (nzbindex_showcollections) //OPTION : Checkbox to show only collections results
				if(links.innerHTML.indexOf('collection')==-1) {//this is not a collection
					TRCollection[i].parentNode.removeChild(TRCollection[i]);
					i--;
					TRDeleted++;
					continue;				
				}

			//Prepare this row for the easy-select functionnalities
			rowClickable(TRCollection[i])				
			
			if (links.innerHTML.indexOf('Password')!=-1) {//OPTION : delete checkbox if password 
				setProtectedRow(TRCollection[i]); //change the way this row is displayed
				if (GM_config.read().nzbindex_nocheckboxifpassword)
					removeElementsByTagName('input',resultLine[0]);	
					
				if (GM_config.read().nzbindex_nonzbbuttonifpassword) {
					links.replaceChild(links.firstElementChild.firstChild, links.firstElementChild);				
				}	
			}else if(selectTheResult) //if only one result and no password, we check it
				setRow(TRCollection[i], true);
			
			//for(var j=0;j<links.getElementsByTagName('a')
			links.setAttribute('style','font-size:' + GM_config.read().nzbindex_resultLinks_fontSize + 'px;');
			
			if (sinceXdays != ''){ 
				//OPTION : if age corresponds (special : on nzbindex, age < 1 day is in hour, on Binnewz age < 1 day is 0day) then when hightlight the Age cell

				if (test_sinceXdays(resultLine[4].innerHTML, sinceXdays)) 
					resultLine[4].setAttribute('bgcolor', GM_config.read().binnewz_selectedresultcolor);
				else { //Here we do a little magic ... see sometimes binnewz displays days like '1day' but binsearch could have indexed the file 2days ago. Its  often a matter of 1or 2 days 
					   //so if the option is checked, we do the same test with +-1 day
					if(GM_config.read().binnewz_highlighttolerance){ 
						var tolerance_check=false;
						if(sinceXdays>0) 
							if (test_sinceXdays(resultLine[4].innerHTML, parseInt(sinceXdays)-1)) tolerance_check=true;  //test with -1 day (only if sinceXdays != 0day)
						
						if (!tolerance_check && test_sinceXdays(resultLine[4].innerHTML, parseInt(sinceXdays)+1)) tolerance_check=true; //test with +1 day
								
						if (tolerance_check==true) resultLine[4].setAttribute('bgcolor', GM_config.read().binnewz_toleranceresultcolor);		
					}
					   
				}

				
				//Now checking if group corresponds, if so we highlight the groups Cell
				if (typeof tmp_groups != 'undefined'){//check only if groups have been passed within the url  (see 'tmp_groups' declaration at start of function)
					var tmp_indic=false;
					var tmp_compare=resultLine[3].getElementsByTagName('a');					
					for(j=0;j<tmp_groups.length;j++){
						if (tmp_groups[j]!=''){
							for(k=0;k<tmp_compare.length;k++){
								if(tmp_compare[k].textContent.replace(/[\.\s]/g,'')==tmp_groups[j].replace(/\./g,'')){
									resultLine[3].setAttribute('bgcolor', GM_config.read().binnewz_selectedresultcolor);
									tmp_indic=true;
									break;
								}
							}
							if (tmp_indic) break;	
						}
					}
				}
			}			
				
		}else if (TRCollection[i].firstElementChild.className=='oldresults' && GM_config.read().nzbindex_delete_oldcontentline) {	
			TRCollection[i].parentNode.removeChild(TRCollection[i]);
			i--;
			continue;
		}
		

	}
	
	if (TRDeleted!=0){ //So <tr> have been deleted
	
		var resultsHidden=document.createElement('p');
		resultsHidden.innerHTML="<font color='red'>" + TRDeleted + GM_trans.lang('nzbindex_hiddenresults') + "<font>";
		THead.firstElementChild.children[1].appendChild(resultsHidden);	
		
	}

}

function nzbindex_makeurl(search, otherparams){

	var host='www.nzbindex.com/search/';
	var params='?results=250&sort=age_desc&q='+escape(search);
	if (GM_config.read().nzbindex_onlycollections) params+='&showcol=1';
	params+='&sinceXdays=' + sinceXdays + '&fromGroups=' + fromGroups;
	if(pingpong!='') {
	params+='&pong='+pingpong;
	// alert(params);
	}
	if(typeof otherparams!='undefined') params=params+otherparams

	return 'http://'+host+params
}


function nzbindex_add_buttons() {

	//Unselect Button
	var selectButton=document.createElement('input');
	selectButton.name='cancelButton';
	selectButton.type='button';
	selectButton.value="Unselect All";
	if(BrowserDetect.browser!='Chrome') selectButton.setAttribute('onclick','clickTheseRows(document.getElementById("results"), 0);')

	var buttonsCol = document.evaluate( '//input[@value="Select all"]' ,document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );

	//insert top line button
	insertAfter(selectButton, buttonsCol.snapshotItem(0));
	insertAfter(document.createTextNode(' '), buttonsCol.snapshotItem(0));

	//insert bottom line button
	insertAfter(selectButton.cloneNode(0), buttonsCol.snapshotItem(1));
	insertAfter(document.createTextNode(' '), buttonsCol.snapshotItem(1));
}



function nzbindex_fixedHeader() {
	//NZBIndex nécessite l'injection d'une fonction pour devenir fixed au scroll	

    var scriptCode = new Array();   // this is where we are going to build our new script
    
    // here's the build of the new script, one line at a time
    scriptCode.push('var fixmeTop = $("#searchform").offset().top;');
    scriptCode.push('$(window).scroll(function() {');
    scriptCode.push('var currentScroll = $(window).scrollTop();');
    scriptCode.push('if (currentScroll >= fixmeTop) {$("#searchform").css({ position: "fixed", top: "10px",left: "50%", marginLeft: "-380px"});');
    scriptCode.push(' } else {$("#searchform").css({ position: "static", marginLeft: "0px"});}});');
    
    // now, we put the script in a new script element in the DOM
    var scriptNZBIndexFixedHeader = document.createElement('script');    // create the script element
    scriptNZBIndexFixedHeader.innerHTML = scriptCode.join('\n');         // add the script code to it
    scriptCode.length = 0;                            // recover the memory we used to build the script


	document.getElementsByTagName('head')[0].appendChild(scriptNZBIndexFixedHeader);
	
}


//-------------------------------------------
//-------------------------------------------
//-----------BINSEARCH-----------------
//-------------------------------------------
function binsearch_configurationIntegration() {

	var binsearchMenu=document.getElementsByTagName('h1')[0].parentNode.nextElementSibling;
	var mymenu=createConfigurationMenu();
	mymenu.setAttribute('style', 'margin-top:10px;font-size: 14px;');
	binsearchMenu.appendChild(mymenu);
}


//-----------MAKE NZB BUTTONS------
function binsearch_process_results() {

	//Original source from this script : binsearch.info download button  http://userscripts.org/scripts/show/72182
	//Modified by les-newsgroup.fr
	if (fromGroups!=''){ //We do this only one time to save some millisec
		fromGroups=fromGroups.replace(/\./g,'');
		var tmp_groups=fromGroups.split('|');
	}
				
	var rows = tabresults.getElementsByTagName('tr');
	for (var i = 1; i < rows.length; i++) {
		if(rows[i].getAttribute('done')=="1") continue;
		
		var cells = rows[i].getElementsByTagName('td');
		var checkboxCell = cells[1];
		var subjectCell = cells[2];
		var protect=false;
	
		if (GM_config.read().binsearch_delete_oldcontentline) {//OPTION : Delete the 'old results' yellow line
			if (rows[i].getAttribute('bgcolor')=='#ffffbb') { 
				rows[i].parentNode.removeChild(rows[i]);
				i--;
				continue;
			}
		}

		var inputs = checkboxCell.getElementsByTagName('input');
		if (inputs.length <= 0)
			continue;

		//Prepare this row for the easy-select functionnalities
		rowClickable(rows[i]);
		
		var protect=false;
		var tdspans=subjectCell.getElementsByTagName('span');
		if (tdspans.length>1) {
			var fonttag=tdspans[1].getElementsByTagName('font');
			if (fonttag.length>0) {
			
				//Password for the result ?
				if (fonttag[0].innerHTML.indexOf('password')!=-1) { //Yes : password
					setProtectedRow(rows[i]); //change the way this row is displayed
					if (GM_config.read().binsearch_nocheckboxifpassword) //delete the checkbox ?
						if (checkboxCell.getElementsByTagName('input')[0].type=='checkbox')
							checkboxCell.removeChild(checkboxCell.getElementsByTagName('input')[0]);
					if (GM_config.read().binsearch_nonzbbuttonifpassword) //OPTION : Block the NZB button creation if passworded
						protect=true;
						// continue; //Go to the next result : do not create NZB button and do not do anything else for this result		
				}
				
				//OPTION : Displays details of missing parts
				if (GM_config.read().binsearch_missingpartsdetails) 
					if (fonttag[0].innerHTML.indexOf('/')!=-1) {
						var tmp=fonttag[0].innerHTML.split('/');
						if (parseInt(tmp[1] - tmp[0]) > 0)
							fonttag[0].innerHTML=fonttag[0].innerHTML + '  [' + GM_trans.lang('binsearch_missingpartsdetails') + ' ' + parseInt(tmp[1] - tmp[0]) + ']';
						else{ //if theres is more parts available than it should be, we remove the 'parts available' red color
							//fonttag[0].innerHTML='';
							//fonttag[0].parentNode.innerHTML=fonttag[0].parentNode.innerHTML.replace(', parts available:', '');
							fonttag[0].color='green';
						}
					}
			}
		}
		
		//OPTION : Highlight the age if it is the same age than the binnewz' selection
		if (sinceXdays != ''){ 


			resultAge=cells[5].innerHTML;
			
			if(i==rows.length-1) {//alors on doit faire une manip' sur l dernière cellule car binsearch y à intégrer un commentaire HTML
				resultAge=resultAge.slice(0, resultAge.indexOf('<!--'));
			}
			
			if (test_sinceXdays(resultAge, sinceXdays)) 
				cells[5].setAttribute('bgcolor', GM_config.read().binnewz_selectedresultcolor);
			else { //Here we do a little magic ... see sometimes binnewz displays days like '1day' but binsearch had  indexed the file 2days ago. Its  often a matter of time 
				   //so if the option is checked, we do the same test with +-1 day
				if(GM_config.read().binnewz_highlighttolerance){ 
					var tolerance_check=false;
					if(sinceXdays>0) 
						if (test_sinceXdays(resultAge, parseInt(sinceXdays)-1)) tolerance_check=true;  //test with -1 day (only if sinceXdays != 0day)
					
					if (!tolerance_check && test_sinceXdays(resultAge, parseInt(sinceXdays)+1)) tolerance_check=true; //test with +1 day
							
					if (tolerance_check==true) cells[5].setAttribute('bgcolor', GM_config.read().binnewz_toleranceresultcolor);			
				}
				   
			}
			
			//Now checking if group corresponds
			if (typeof tmp_groups != 'undefined'){ //check only if groups have been passed within the url (see 'tmp_groups' declaration at start of function)
				var tmp_indic=false;
				var tmp_compare=cells[4].getElementsByTagName('a');
				for(j=0;j<tmp_groups.length;j++){
					if(tmp_groups[j]!=''){
						for(k=0;k<tmp_compare.length;k++){
							if(tmp_compare[k].textContent.replace(/[\.\s]/g,'')==tmp_groups[j]){
								cells[4].setAttribute('bgcolor', GM_config.read().binnewz_selectedresultcolor);
								tmp_indic=true;
								break;
							}
						}
						if (tmp_indic) break;
						
					}
				}
			}
		}
			
		//we make a NZB button if option is checked and if there is no password for this result
		if (GM_config.read().binsearch_nzbbuttons && !protect){
			var id = inputs[0].name;
			//var id = "81119238"; //bad id 
			//var id = "81124031"; //bad id
			//var id = "54884922"; //good id
			var filename = subjectCell.getElementsByTagName('span')[0].innerHTML;
			
			var re = /"(.*)"/;
			var matches = re.exec(filename);
			if (matches)
				filename = matches[1];
			filename = escape(filename);
			
			var form = document.createElement('FORM');
			form.method = 'POST';
			form.action = '/fcgi/nzb.fcgi?q=' + filename;
			
			var id_el = document.createElement('input');
			id_el.name = id;
			//id_el.value = 'on';
			id_el.type = 'hidden';
			form.appendChild(id_el);

			var action_el = document.createElement('input');
			action_el.name = 'action';
			action_el.value = 'nzb';
			action_el.type = 'hidden';
			form.appendChild(action_el);
			
			var submit_el = document.createElement('input');
			submit_el.type = 'submit';
			submit_el.setAttribute('style', 'background-color:' + GM_config.read().binsearch_nzbbuttoncolor + ';');
			submit_el.setAttribute('class', 'b');
			submit_el.style.setProperty('cursor', 'pointer', 'important');
			submit_el.value = 'NZB';
			form.appendChild(submit_el);
			
			checkboxCell.appendChild(form);
		}
		
		if(selectTheResult && !protect){ //if only one result and no password, we check it
			setRow(rows[i], true);
		}
		
		rows[i].setAttribute('done', 1);
		
	}

}


function test_sinceXdays(days_site, days_search){

	switch(website){ //a global variable (see MAIN)
	
		case 'binsearch':
			
			return (days_site==String(days_search) + 'd' || (days_search==0 && (days_site.indexOf('h')!=-1) || (days_site.indexOf('m')!=-1)))
		
		case 'nzbindex':

			//return (days_site.indexOf(String(days_search) + '.')!=-1 || (days_search==0 && days_site.indexOf('hour')!=-1))
			return (days_site.match('[^0-9]' + String(days_search) + '\.[0-9+] day')!=null || (days_search==0 && days_site.indexOf('hour')!=-1))
			
		case 'nzbclub':
			return (days_site.match('^' + String(days_search) + ' d')!=null || (days_search==0 && (days_site.indexOf('h')!=-1 || days_site.indexOf('m')!=-1)))
	}


}


//not functionnal now ... need to work on it and maybe merge 2 functions
function binsearch_onlycollections(){
	
		//Wont do it for now ... Binsearch already have an 'showcollectionsonly' parameter. 
		//If checked in option, links from binnewz to Binsearch will be written with this param and it will work.
		//We would need a function like this one for every time someone who use binsearch, and use this script, and have checked the 'showonlycollections' 
		//will access Binsearch directly... in this case, the url nill not contain the good param and Binsearch will not show only collections.
		//And this function could dynamically delete 'nocollection' rows
		
}



function make_select_buttons() {

	var index=binsearch_find_formchild();

	//Select Button
	var selectButton=document.createElement('input');
	selectButton.name='selectButton';
	selectButton.type='button';
	selectButton.value=GM_trans.lang('binsearch_selectall_button');
	selectButton.setAttribute('onclick','clickTheseRows(this.form.getElementsByTagName("input"), 1);')
	selectButton.setAttribute('class', 'b');

	searchform.insertBefore(document.createTextNode(' '), searchform.childNodes[index]);
	searchform.insertBefore(selectButton, searchform.childNodes[index+1]);

	//unselect button
	selectButton=document.createElement('input');
	selectButton.name='unselectButton';
	selectButton.type='button';
	selectButton.value=GM_trans.lang('binsearch_unselectall_button');
	selectButton.setAttribute('onclick','clickTheseRows(this.form.getElementsByTagName("input"), 0);')
	selectButton.setAttribute('class', 'b');

	searchform.insertBefore(document.createTextNode(' '), searchform.childNodes[binsearch_find_formchild()]);
	searchform.insertBefore(selectButton, searchform.childNodes[binsearch_find_formchild()]);

}

//This function finds the first child with a 'P' tag and return its index. Its means to be used with a 'insertBefore' function 
function binsearch_find_formchild() {
	i=0;
	for(i; i < searchform.childNodes.length; i++) 
		if (searchform.childNodes[i].nodeName=="P") break;

	return i;

}

function make_noresult_button() {

		var pnode=document.createElement('p');
		var button_groups=document.createElement('input');
		button_groups.type='button';			
		button_groups.setAttribute('class', 'b');
		button_groups.setAttribute('style', 'color:red; padding:15px; font-size:17px;');
		if (typeof searchServers == 'undefined' || searchServers=='' || searchServers=='1') { //most popular groups
			button_groups.value=GM_trans.lang('noresult_button') + ' - ' + GM_trans.lang('binsearch_button_othergroups');
			button_groups.name="othergroups";
			button_groups.setAttribute('onclick', 'document.location.href=document.location.href.replace("server=1","") + "&server=2";');
		}else if(searchServers=='2'){ //other groups	
			button_groups.value=GM_trans.lang('noresult_button') + ' - ' + GM_trans.lang('binsearch_button_populargroups');
			button_groups.name="populargroups";
			button_groups.setAttribute('onclick', 'document.location.href=document.location.href.replace("server=2", "server=1");');
		}
		pnode.appendChild(button_groups);
		
		searchform.replaceChild(pnode, searchform.childNodes[binsearch_find_formchild()]);

}

function binsearch_make_othernzbindexer_button() {
		
	var nzbindexButton=createButton('NZBIndex', nzbindex_makeurl(document.getElementById('originalQuery').value));
	nzbindexButton.setAttribute('class', 'b');
	searchform.insertBefore(document.createTextNode(' '), searchform.childNodes[binsearch_find_formchild()]);
	searchform.insertBefore(nzbindexButton, searchform.childNodes[binsearch_find_formchild()]);

	var nzbclubButton=createButton('NZBClub', nzbclub_makeurl(document.getElementById('originalQuery').value));
	nzbclubButton.setAttribute('class', 'b');
	searchform.insertBefore(document.createTextNode(' '), searchform.childNodes[binsearch_find_formchild()]);
	searchform.insertBefore(nzbclubButton, searchform.childNodes[binsearch_find_formchild()]);
	
}

function binsearch_autoload_othergroups() {

	if (query != '')
		if(autoload != '1') { //only if there is a query and if not already rewritten the pageurl
			if (searchServers==2) { //server=2 : Then we are on the othergroups results page
				document.location.href=document.location.href.replace("&server=2","") + "&server=1&autoload=1";
			}else {
				if (searchServers=='' || searchServers=='1'){
					document.location.href=document.location.href.replace(/server=1?/, "server=2") + "&autoload=1";
				}else {
					document.location.href=document.location.href + "&server=2" + "&autoload=1"; //no 'server' param means popular groups
				}
			}
		}else return true;
	else return false;
	
	return false; //if we reach this command, then a rewritting of the location is happening now, returning 0 to not autoload nzbindex
}



function binsearch_delete_input(parent) {
removeElementsByTagName('INPUT', parent);
	// for(i=0; i < parent.children.length;i++) 
		// if (parent.children[i].nodeName=='INPUT' && parent.children[i].value!=GM_trans.lang('othernzbindexer_button') + ' ' + 'NZBIndex') 
			// parent.removeChild(parent.childNodes[i]);
		// else if(parent.childNodes[i].nodeName=='P') 
			// binsearch_delete_input(parent.childNodes[i]);

}
		
function resize_binsearch(tabwidth){

	tabresults.setAttribute('style', 'width:' + tabwidth + '% !important; margin-left:'+(100-tabwidth)/2+ '%');

}

//Delete the add by removing all iframes
//Credit : Userscript nammed 'SABnzbd binsearch'
function Binsearch_DeleteAd() {
	var iframes = document.evaluate('//iframe', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var j = 0; j < iframes.snapshotLength; j++) {
		var iframe_obj = iframes.snapshotItem(j);
		iframe_obj.parentNode.removeChild(iframe_obj);
	}
}


function binsearch_makeurl(search, otherparams){

	var host='www.binsearch.info/';
	var params='?q='+escape(search)+'&max=250';
	if (GM_config.read().binsearch_advancedsearch) {
		params=params+'&adv_sort=date';
		if (GM_config.read().binsearch_showcollections) params=params+'&adv_col=on';
	}
	// params+='&sinceXdays=' + sinceXdays + '&fromGroups=' + fromGroups;
	if(typeof otherparams!='undefined') params=params+otherparams

	return protocol+host+params
}


function binsearch_fixedHeader() {

	document.getElementsByClassName('mt')[0].getElementsByTagName('TR')[0].setAttribute('style',"position:fixed;display:table;margin-left:-1px;margin-right:-1px; width:100%;");
	document.getElementsByTagName('h2')[0].setAttribute('style',"padding-top:100px;");
	
	document.getElementsByName('q')[0].id="originalQuery";
	
	var formElement=document.createElement('FORM');
	formElement.method='action';
	var inputElement=document.createElement('INPUT');
	inputElement.setAttribute('class',"b");
	inputElement.setAttribute('type',"text");
	inputElement.name="q";
	inputElement.id="cloneQuery";
	inputElement.setAttribute('size',"50");
	formElement.appendChild(inputElement);
	
	inputElement=document.createElement('INPUT');
	inputElement.setAttribute('class',"b");
	inputElement.setAttribute('type', 'submit');
	inputElement.setAttribute('value', 'search');

	formElement.setAttribute('style',"margin-top:8px;margin-left:100px;");
	formElement.appendChild(inputElement);
	
	document.getElementById('BU_conf').parentNode.appendChild(formElement);
	
	document.getElementById('originalQuery').value=document.getElementById('originalQuery').value;
	

}






//-------------------------------------------------
//-------------------------------------------------
//-------------------BINNEWZ-----------------
//-------------------------------------------------
//-------------------------------------------------
function resize_binnewz(resultsNode, tabwidth){

	resultsNode.setAttribute('style', 'width:'+tabwidth+'% !important; margin:1 !important; margin-left:'+(100-tabwidth)/2+ '%')

}

function binnewz_DeleteAd() {

	var mark = document.getElementsByName("haut");
	if (mark != null && typeof mark[0] != 'undefined') {
		if(mark[0].nextElementSibling.tagName=="DIV" && mark[0].nextElementSibling.className=="") 
			mark[0].parentNode.removeChild(mark[0].nextElementSibling);
	}


	//Autre tests au cas où
		var frame = document.getElementById("headerContainer");
	if (frame!=null) frame.outerHTML = "";

		frame = document.getElementsByName("banner");
	if (frame!=null && typeof frame[0]!='undefined') frame[0].outerHTML = "";
	
		divAd = document.getElementById("zzadcontent");
	if (divAd!=null && typeof divAd!='undefined') divAd.parentNode.removeChild(divAd);

		divAd = document.getElementById("zzadfooter");
	if (divAd!=null && typeof divAd!='undefined') divAd.parentNode.removeChild(divAd);	
}


function binnewz_changeOtherPagesLinks() {

var temp_var=document.getElementById('fp_country');
temp_var.id='country';

var temp_var=document.getElementById('fp_cat_id');
temp_var.id='cat_id';

var temp_var=document.getElementById('fp_page');
temp_var.id='page';

}

function binnewz_configurationIntegration(){

	var binnewzMenu=document.getElementById('menu_search');
	if (binnewzMenu==null) {
	if (typeof binnewzMenu=='undefined') 
		binnewzMenu=document.getElementById('DivError'); //for Search page
		// binnewzMenu=typeof window.parent.frames[1] != 'undefined' ? window.parent.frames[1].document.getElementById('DivError') : document.getElementById('DivError'); //for Search page
	if (binnewzMenu==null) 
		binnewzMenu=document.getElementById('filtre'); //for Search page
		// binnewzMenu=typeof window.parent.frames[1] != 'undefined' ? window.parent.frames[1].document.getElementById('filtre') : document.getElementById('filtre'); //for Search page
	}
    if (binnewzMenu!=null){ //afin d'éviter que le script plante si Binnews modifie son site
        //sinon il faudrait surement afficher quelque chose du genre "prevenez l'auteur du script"

        var myfirstmenu=document.createElement('div');
        myfirstmenu.setAttribute('style', 'position:fixed;top: 112px;left: 750px;height: 28px;overflow: hidden;vertical-align: top;background-color: #215589;z-index: 100;');


        var mymenu=createConfigurationMenu();
        mymenu.setAttribute('style', 'position:relative;margin-left:20px;background-color: #EBF8A4;font-size: 14px;vertical-align:top;');

        myfirstmenu.appendChild(mymenu);
        binnewzMenu.parentNode.insertBefore(myfirstmenu, binnewzMenu.nextSibling);
    }
}



//-----------------------------------------------
//---------------MAKE NZB LINKS----------
//---------------by Guile93 - Gatsu-----------
//------------modified by les-newsgroup----
//-----------------------------------------------
var olddiv; //from the display_nzb_links function
function display_nzb_links(){
	var binnewz_strpostdays='&sinceXdays='
	var binnewz_postdays='';
	var binnewz_strpostgroups='&fromGroups='
	var binnewz_postgroups=''

	if(document.getElementsByClassName('bigred').length<5) //on est sur une page de rÃ©sultats par catÃ©groies ou une recherche (les pages lÃ  n'ont qu'un appel e la calsse 'bigred' normalement ... c'est bancal mais binnews est mal foutu donc ...)
		if(document.getElementsByClassName("ligneclaire").length>0)
			var search_array = document.evaluate( '//tr[@class[.="ligneclaire" or .="lignefoncee" ] and not(@done)]' ,document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
		else
			var search_array = document.evaluate( '//tr[@class[.="even" or .="odd" ] and not(@done)]' ,document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
	else {//on est sur la pages des derniers rÃ©fÃ©rencements
		var lfTRs=document.getElementsByClassName('lf');
		for(i=0;i<lfTRs.length;i++)
			lfTRs[i].previousElementSibling.className='le';
			
		var search_array = document.evaluate( '//tr[@class[.="lf" or .="le" ] and not(@done)]' ,document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
	}
	
	for (var n=0; n < search_array.snapshotLength; ++n){
		var TR=search_array.snapshotItem(n);
		TR.style.height="31px";
		var TDs=TR.children;
		
		var titleTD=TDs[titleIndex]; 
		var groupsTD=TDs[groupsIndex];
		var fileTD=TDs[fileIndex];
		var sizeTD=TDs[sizeIndex];
		
		if(titleTD.innerHTML.indexOf('cadenas.png')!=-1 || titleTD.innerHTML.indexOf('virus.gif')!=-1){ //password protected or virus result
			if(GM_config.read().binnewz_highlightifpassword){
				setProtectedRow(titleTD.parentNode);
				titleTD.style.backgroundColor = "#FDD5D7";
				titleTD.onmouseover=function(){  this.style.background="#FDD5D7";}
			}
			if(GM_config.read().binnewz_donothingifpassword)
				continue;		
		}
		
		var Acol=titleTD.getElementsByTagName('a');
		if (Acol.length>0) //testing if there is binnews link or not, if so, we do nothing and step to the next result line
			if(Acol[0].href.indexOf("http://www.binnews.in") != -1){
				continue;
			}

		var req=fileTD.innerHTML.replace(/ /g, "+");
		// req=req.split("*").join(" ");   
		var req_amp=req.replace("&amp;","&");
		var method1=req_amp;
		var method2=encodeURI(req_amp);
		var method3=encodeURI(req).replace("&amp;","%26");

		//Retrieving post's age
		if(resultsType==3) //pour les derniers refs sur binnewz, on place arbitrairement sinceXDays à 0 jours
			var tmp=0;
		else
			var tmp=binnewz_getdays(TR.previousElementSibling.firstChild);
		if (typeof tmp!='undefined')
			if (tmp!=-1) binnewz_postdays=tmp;
			else binnewz_postdays='';
		//else we use the post days retrieved before
		//Retrieving post's group(s)
		binnewz_postgroups='';
		var tmp_links=groupsTD.getElementsByTagName('a');
		for(i=0; i<tmp_links.length; i++)
			if (tmp_links[i].childElementCount==0) //If not, theres something else than a group name in this link (like the 'not free' img)
				binnewz_postgroups=binnewz_postgroups + tmp_links[i].innerHTML.replace('.','') + '|';
		binnewz_postgroups=binnewz_postgroups.substring(0, binnewz_postgroups.length-1);
			
		//end
		//By les-newsgroup.fr : Added a test of checked options  before every 'make_link()'
		//By les-newsgroup.fr : Added protocol variable (http/https)
		//By les-newsgroup.fr : Added the 'sinceXdays' & 'fromGroups' param 
		//By les-newsgroup.fr : Added a float attribute to the links div (optionnable)
		//By les-newsgroup.fr : Modifications in the show/hide functions
		var div = document.createElement("div");
		div.setAttribute('style', 'float:right;');
		if (GM_config.read().display_nzbclub) make_link(div,nzbclub_makeurl(method2.replace('.part.nzb',''),"&rpp=200&rs=1&sa=1" + binnewz_strpostdays + binnewz_postdays + binnewz_strpostgroups + binnewz_postgroups),"NZBClub","data:image/x-png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAWCAYAAADTlvzyAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA+lJREFUeNqsVc9vG0UU/vaXvdSJ4/iHaEISUey2UAGNoa7iW6CAkIpKDz0gQBx6QIoQqsQxEtf+ASBUiUMvlIIQBxRASIS2EarUCA4g0pIgJW1K2roiztqxY8fr9WaZN/ZsN2vH6aFP2p03b2be9+a9b2Ykx3EgJJ1Oy5FIZKher+/ZYoJdRJIkiPXUUl/YScjF3Nzcimmam41Gg9tUr4NKpaJls9mx/v7+QQZqiYXdAIVj+qgvy7JopVKp5MzPz09Vq9UVd413h/F4/PHp6ekrAweefQaPQIorSw7bwPvFYvECw6mRTfZOYEaZbd3GIxIGJFmW1cfUgLCpvjm0XV670xev4XBUxZnXMzh/5Q8sGTUkozqu5mrbFkxkhnDu9ztuP9UjYfLEmLeudssv2nbolbzaj5mCjsV7q7hfNpEzgeFoL3c4EGyOF6QeFKsm14V9thbhAQpAv7QB6rru6rai4ezMott/9XCKR2/Um44mj0Q6BkuBkSiKQqBSV0BiWFRrOnxOKfDob5QfTDs7NYu7ShQnE5vI7B927YsbDpZrChTbwvqmyW2aplWZP2dXQMNqBjWeSiDeKKCshXmfUkUpS8HA6ZfS29adfzuLL985Cs2xcOnWOrexo2X4j5a609kSMjmewkdX17jOCaM+hkVEceKbBW4b04vsH3H7UPfg2EhQLO/113FHwA8Pqnhh3wBi4RA+ThMzQ02qV81t8/clksisrnv6fUgNJprpk+W+XQHpphAEEeKtVScRAH4JBoOuv4dK6deXruHp4QGMHniS6+OjB7E3FsX9NQPXl+7glaPP45ff/kI8EsbCSs5d99axLG83Njagqmp3QCHHP/8VksVSeTeA43/fxE/1QeDPf7izGdZ+dSPPAT+dvY2RgIXb0UPYWv0XjqZj6vq3uHjmFAfzp7QjS899d5nrP3zwGt59oo7soace6ioLN0o8yFhQdlNq23Z3QPGMCCmUN5Evltqc24rLRAyGH1wWeqOCW3aPOBbwv3JtgJT3iZMvQ9JDeOOzn/FjqQ/5coWPXVgo481PvudByIkRrjt79yOTGuLjJTWMmhpih990n62u55DyTVHxdL73Yos0MU4aMB0xurJ6OXmyayVGlDjivXVey3xZjLMLY/RIxzPdBsgmSKzQsp9tfp2E2MoD2WFc1JDctr6OO5QMw1CHiv+BvWN8x5QW0qn41FKNBRHociYmsjuTt+K1b92jyOVy1Fe2bcpLWzYplEwmJwKBQJYB2U5TeCDez5cVR3zed4+yRQEuLy9/wYK8zNZV2gBb0dGue7xp8KRFbn2S78HeaulOhwedGGQyHE7X/wUYAMQwvzKmQ3f/AAAAAElFTkSuQmCC");
		if (GM_config.read().display_nzbindex) make_link(div,protocol+"www.nzbindex.com/search/?results=250&sort=age_desc" + binnewz_strpostdays + binnewz_postdays + binnewz_strpostgroups + binnewz_postgroups + "&q="+method3.split("*").join(" "),"NZBindex","data:image/x-png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAWCAYAAAGkkcxkAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAABMlJREFUeNpi+P//P4OgoKAsCDOAAEiAwWze/3v37gMZDBxggfcfv/z//v07WAAggBi5ubmF2NjYuMHKp06duuvajTv/GXRm/Wfi5+dnUFeWZXh/NIoBIIAYQfr6+vp2eXh4uIINBQJGRkYGbW1tThYQR0BAgEE7/CgDAzszw+sd/gyiDmshikCqra2ti2RlZZ0YkMDKlStDAAIILCkkJCSLLAEy9u3bt4/Bxh45cuQRSBFIEAR4eHjAaphA5NK9bxiCG64xaEcdY5i55SWDhCgfWBFYkp2dg6E6ThPIY2RgY2djYOPkRzjo69fv/1lYGBm+//zLwMLMxMDDzQmWA9uZnJy4lQEVMK1YsYIBIIAYYR6fMmXKIU9PT1sGPADkUAkJCXagnl9MMMG/f//+2HP2DUN+7xUGTjZGhq/ffzPk910FiTNsPf6SIb/nCgMbC8IPcI2cnJwMT98CFZ19xyAdsJ/h/N2fDFuPvGLg5uZhePDyD8PWw6+AEc8Ht50FxuDg4GBg/cXGwPDxJ8P/G0kMEm5rQKmCgZeXl4GZhZWB4c9foDWcCHeD/AjCQA/v+vPnz398+D8kQDhAFEAAPqpdJWIgit68x6yPL5D8gx/hB2yVQvIXSmprOxt7G7WzkIVlt1UIW0oaK3crQSWanZCAm3hmyAwjKxkIcznh3DPcc2Ys5ZLO3sDinBdN05TmUXfyPF/ixyAxTdNbbLFJtJBlQjd9fJUVsxYT1maqYn+X0dnlC90/flLg+3R+/UoXdys66PHpotAN/kx1FDI5/oendzo5PqTZ4gMkD3gg8SjCdB1nW1GoyE6hQ9F4TiFzpYIPm8QSJNu2t4mWx6RvV6dH1CG0q7dKEploCFwQ/1VET5jcUon7vpyOiUDetECDQOIWrpKpSH3IQ2GueCnWvJKvRfHNuy98dV1LvFxXXZIkNyowrunT3ojp2vMM3O3TbSgq4k8cxxPs7VAAsix7VvWvAKVVTUsbYRB+kt133+xiSOIXxJqLCZQee/MWVMSDBoIEvJlD6Un7J3rw4KE9Fe89pE2P9aTgR7RUD/6EqKCCoifRBtnNhzNvNjHZ1BDIuwy7O/vsDPPxzDT56E4NXzKZzMTj8Xfcm+jjCCF8hULhsFgs7rX60D04M5VKfUyn07OlUqkff2pY0Mj7RQ6P6PXpNYeqxDrl0DINSFHPYblSozlWdbNAzRnQ1L1araFEeo6AsYaLt52qskE16MiS36tg4HDEwsbva8RmdhBb2Edi6Q/Ob2wMhU08lf14u/wXsbldTK6cEF5gdNDCev6yjidZy11ghGy0tVk3h4YhEZAUvEm9a+moUDjzn47x+fuZMmTxN9ozzB7aXRCteBJTCmWjZ4eCyKC7rQm7gtXMBEbeDODbj1O8/3CgUsx/+uiShGXRNL1BmDptDdnGwK4O4XPB3F3EwsR4CLdbi1iYjuHu6hH3/xxVTK4jR8hzo4l3+4D6tPcI+YQGJKLDJqJDJhFUki0/Nr9MI/91CmNBQ+lHIwHlsKYZCAddPEmInr3E7dgZjdGRy+W2eXw4jk17wlHCz7b9Ig192XGaOi+eTzab/dnYMf8dNS5/ZD1S0RPftC7fqLYdRryTRm1W3gMcPPo7bIyKjYdai5NneQAnEnLrIpsAAAAASUVORK5CYII=");
		if (GM_config.read().display_binsearch1) make_link(div,binsearch_makeurl(method1, "&server=1" + binnewz_strpostdays + binnewz_postdays + binnewz_strpostgroups + binnewz_postgroups),"Binsearch","data:image/x-png;base64,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");
		if (GM_config.read().display_binsearch2) make_link(div,binsearch_makeurl(method1, "&server=2" + binnewz_strpostdays + binnewz_postdays + binnewz_strpostgroups + binnewz_postgroups),"Binsearch \"other groups\"","data:image/x-png;base64,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");
		if (GM_config.read().display_yubse) make_link(div,"http://www.yubse.com/?q="+method1.replace('.part.nzb',''),"Yubse","data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjNERDk0NkI4MjE3QzExRTFCQ0Q0OEJERDhCNUY1MDQxIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjNERDk0NkI5MjE3QzExRTFCQ0Q0OEJERDhCNUY1MDQxIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6M0REOTQ2QjYyMTdDMTFFMUJDRDQ4QkREOEI1RjUwNDEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6M0REOTQ2QjcyMTdDMTFFMUJDRDQ4QkREOEI1RjUwNDEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7KVEtSAAADAFBMVEULQ0cJQUYQMjT///9wjowIXmfS0dAFNzwNgYwHT1YHTlUllaEGQEUOi5c5y9g3xNEMcnwNfIYLZ3BcjIqJyM4LZG3i4OAnnqk4xdL29fQQY2sMdH4NdoAjSEwMdX8MZm8Mb3gWi5YTcnuDtLilqai+urkJY2wpm6YvU1b//v4qYmfGx8fd2dlnr7bPy8tAipFzgYAWWV/k4uIwUVEIbHZ4goHn5uUDNDhIW1sfk54IZW8OfogLbHYGODwKSlEJV156iIbz8fETlKE4fYTr6enU09IiZWh2vcQ2kJU6lJ2xsbCQ3OIJYWpGWFgQVVkyY2QIiZYKdH4nkprLx8dkxs8QQUYiV1mnpaQKW2MHTFM+V1fR0dAJfIYRbHUvtsMjcHgHVl4eOzxpfnw/pa4NdH0OdH4koq4OiZXDv7/OysqcoqAIQEVBhowdc3tFbXEHNzsnmaX19PQfkZwKi5jS0NBtu8P8/Pz9/Pz49/f28/MDOT4SjJgIS1IHS1EMfIYHbHYMR00KSE43W1t60dnGwcG8t7eCpqmPqatYqrIia28GMDRIZGQ1wM0wuMQycHJSYmEgipRFgoJJg4lUfXw9kJdMqrAfeoK0t7ausa8tR0cvTk6wsK81TE0RXGRbkZDV1dQdXF/p5uYxaG2qrawLc315i4kJgo9RjY0OhI+4uro4maE6nqjt7OwqgYUZSEv5+fmhpaSXnJuVmZY3ZmsNXWUdiJAjnKdDen9QkJDS0tELeoQDLC8Ne4UbbXUManPRzs0nd3tigYRhh4UNWF8YODkcPz83x9RufHs8oqwSeoQWfYeTvcEOdH0gZ24goa4zVVYNiZVeiYgxvcoRSE00vsvPysqeo6Ksv8F4hYNjcnETiZQOMTMZdH0vuMVBbnJLm50MbXfh3t4kmaVWh4yqp6fw8PDx7u5xlpoLXmYLjZoQc3wcjJcnSEpuusLHx8YssLyop6YMgo349vcJVFwOhpIOhZASYmoOZm+EkI4OipYTjZgGQ0oHSVAMc30Nb3k6qrQgnWKkAAAABHRSTlP///8AQCqp9AAAAUtJREFUeNpiYMYCGKC0Y/TK6dpmKIJrNvomMt0+MsfUFSG4s5+pK9+Wnd1890yVcqjgfAvZzYtCGRizs+fyHN2gCRZ8dlPj4GnvnAa733f4vlXNegcWXPwmr/26cvMUzi1XxGv+MByXBApW3Fx373nbY/0Qz2093+0/RzaVAAXFoi5rbZ/kvHfa/2Ov1URfJITNAAqyGTcano3PVUqNe79E4IEQ64IskOD52sNSsa9S0vhv1e2RUbByuwYUfNjNFSH/T1pR4tzHrxyCciZ9XkDBSgM/1n1/rXvvpvP+/MKx68xkPZCTZvv72AT+uuQU8LL4woqYtT+egQRdbnTWn5xQZKn+qKB62dZDGRBv7k86cEq3w12k9C13kHA4LEAyHSZ6rFp9InnqfZYnhfCgM/qw9OLyHfNYNgWXIQfywquqrS06n1BDHgUABBgAA6yBzwYBQOsAAAAASUVORK5CYII=");
		div.innerHTML+="&nbsp;";
		if (GM_config.read().display_nzbfriends) make_link(div,"http://www.nzbfriends.com/?q="+method1.replace('.part.nzb',''),"NZBFriends","data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAVVJREFUOI3FkbFKw1AUhr+WSKUBIbYIWilCBkeRCA6OVhddBLsmmz5CfYT0Fbo1YyL4AMZOilMGVyElFAqlKJ1aKoXGIba3t606if92/nv4zn/ugf9Witgq4YQG1mMV//SK9kDD1D2csCx1mnqAExoztUeq3lRwQgM3somtgOvnMu1BCVMPcCN7btiN5N21KsTWQXpqzNIBClkfVWkuZC5kfXKZgNFYwwnLAvDULUmNtdcTDvMeALlMMPWPNnyON71JKQDdoZwA4KWXQPc0X/LfhtoiYDTWJEhsabx/JPXljkjgRjaNToVcJsDUawIwgUzU6ouViqpIoCpNVtK9L7iRlh5mdRsl03OZgFS9N/XPtmtcFKsAOOEMYCsbSIDv9p+TAOyvC0CrL/bPr/aILflCSz8RkhsDFFUR2Y1szh/upbrRqSwH7K7Ja/wkVWli6t7vjX+tT2Ssd9q5c7BYAAAAAElFTkSuQmCC");
		
		div.innerHTML+="&nbsp;&nbsp;&nbsp;&nbsp;";
		
		if (resultsType==1) {
			if (GM_config.read().display_thxlink) make_thxlink(div, TDs[thanksIndex].firstChild.href);
			if (GM_config.read().rating_imdb){ //if option is activated	
				if(in_array(cat_id,binnewz_goodCat))
					make_infoLink(div, titleTD, 'movie')
				else if(in_array(cat_id,binnewz_tvCat))
					make_infoLink(div, titleTD, 'tv')
			}
		}else {
			if (GM_config.read().display_thxlink)  //sur les pages de recherche et de derniers ref le lien pour commenter et le lien pour remercier sont ensembles
				if(typeof TDs[thanksIndex].children[1] != 'undefined')
					make_thxlink(div, TDs[thanksIndex].children[1].href);
					
			if (GM_config.read().rating_imdb){
				if(resultsType==2){ //page de recherche
					catTitle=TR.parentNode.parentNode.previousElementSibling.textContent;
				}else if(resultsType==3){ //page des derniers refs
					catTitle=TDs[catIndex].textContent;
				}

				if(catTitle.indexOf('Série')!=-1)
				  make_infoLink(div, titleTD, 'tv');
				else if(catTitle.indexOf('Films')!=-1 || catTitle.indexOf('Anime')!=-1)
				  make_infoLink(div, titleTD, 'movie');	

			}			
		}

		
		
		div.style.visibility="hidden";
		div.className='linksDiv';
		
		NZBLinksTD=titleTD;
		switch(GM_config.read().binnewz_nzblinks_place) {
			case "1":
				NZBLinksTD=titleTD;
				break;
			case "2":
				NZBLinksTD=fileTD;
				break;
			case "3":
				NZBLinksTD=sizeTD;
				break;
		}
		NZBLinksTD.setAttribute('style',"vertical-align:text-top; padding-top:5px; padding-right:2px;");		
		NZBLinksTD.parentNode.addEventListener( "mouseover", make_visible, false );
		NZBLinksTD.parentNode.addEventListener( "mouseout", make_invisible, false );
		NZBLinksTD.appendChild(div);
		
		TR.setAttribute('done', 1); //we set a 'done' attribute to avoid re executing this script func with autopager plugins
	}
}

function make_link(elem,cible,title,img){
	var newLink = document.createElement("a");
	newLink.href=cible;
	newLink.target="_blank";
	var new_img = document.createElement("img");
	new_img.src=img;
	new_img.title=GM_trans.lang('make_link_title') + ' ' + title;
	new_img.alt=GM_trans.lang('make_link_title') + ' ' + title;
	newLink.appendChild(new_img);
	elem.appendChild(newLink);
}

function make_visible(event){

	var targetTR=event.target;

	while(targetTR.nodeName!='TR')
		targetTR=targetTR.parentNode;
	
	var div=targetTR.getElementsByClassName('linksDiv')[0];

	if(div){
		olddiv=div;
		div.style.visibility="";
	}
}

function make_invisible(event){
	if((event.relatedTarget==null || (event.relatedTarget!=olddiv && event.relatedTarget.parentNode.parentNode!=olddiv)) && olddiv != undefined ){
		olddiv.style.visibility="hidden";
	}
}

function make_thxlink(div, ThxUrl) {

	var ThxLink = document.createElement("a");
	
	  (function(ThxUrl) {  //cette fonction permet d'ajouter un eventListener avec la bonne URL à chaque image 'merci' rajoutée
		ThxLink.addEventListener('click', function() {
		  merci(ThxUrl);
		}, false);
	  })(ThxUrl);

	ThxLink.href='javascript:void(0);';
	var ThxImg = document.createElement("img");
	ThxImg.src='http://www.binnews.in/_images/merci.gif';
	ThxImg.title=GM_trans.lang('thxlink_title');
	ThxLink.appendChild(ThxImg);
	div.appendChild(ThxLink);

}


function make_infoLink(div, titleTD,type) {

	var Acol=titleTD.getElementsByTagName('a');
	if (Acol.length>0){ //testing if there is a link or not
			var elementTitle=Acol[0].innerHTML.toLowerCase();
			var element=titleTD.firstElementChild;
	}else{
		var elementTitle=titleTD.textContent.toLowerCase();
		var element=titleTD.firstChild;
	}		

	var infoLink = document.createElement("a");		
	infoLink.href='javascript:void(0);';
	var infoImg = document.createElement("img");
	infoImg.src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAADvUlEQVR4Xt1VbWscZRQ9szOz3dmdbLLJJm6ycXGi0tXGGihlDdhUFNSkRZAWKeKHIJQVP4iCaWl+gIUFzRdLlCAqaFXUD0KInxRfoCgIVgtpg22iJrpss0m67mR3dt7We9nZMCxhoeabZ/Ywl7n3OWfufeZh8b+GMDA2FR86nsuOnLowf/T0u0vHXr64Of7Sxc2Hn39n6eAzb85zbuDoVJxrsRvaJERt4vzpu1KJM/cMxrVONQRBaJQ6jgvTcWBaDm79Y2CtsLWSLxRzKwvn5jiNFgTQgtj+8fCBEzNzRw7fP5sZTmndnQrqABKdAsbuU/DIgQgGYxIYbJzW7tCG92uz6affmIulJ8JtOwh29AfvffzVt48cSk9G1X2wbBd1uvh37HCcxPrAWFwu4NPv89RNHY5LNZTXKzUsXl99b+Wr17NmOW/u1oHYP5rNHkxrk2FFhlGzebEnUkc4EkFPTw8TEYpdeubWG7RsB/uCElLJxCRrsBY8SM1OuodPJAcHk2fjXQoM0/Y1Vwdp4KelIqIdUe4IPy6us2mDTsPEprgjHER3vO+s/sDJLzaufLbKi5sqUurRc6+MZg7lYlGFF+xsamNCbEJ0AYff2m2QOvRMXCYoRJlGdX3p6pk/vz4/A8BudhBSO7snlJDMc/c2pw5G9skEZFlmQpIa5YZhIPf5slcB7hAukwyDskRiXRMAZol600CJhMNDXGg7rn/ncWHhbwh05V4c3THQdR2l8lUYpoVazYFpO7CaXXB3kIZY028gK4oS46Q3HiIQoLtLM67WTIRCIaiqiiau/V5kMdT9h0nwYkGKsaZ/k0Wap2BTi7yCxY2ahVu6ga2yge2qBdu24QcLBwICdgHvFydEvwEqlUrJtrvUimFho1SlU1pFjVoX+CLHtgeo1cAxS62fqaOXS2urBTW5SeI8Tx6PGAjgv8AxK2t88xtY5eIflxy5KyOAhQXsBbXS2iXW9J/kaunGtwuwjaKwN224VrXIWqzpNzCqxd9ubOevfII9gjVYizX9Bg5x4+bPH35gbK58Ax8+ms7gy9wTO2eAwTE/45wfvJY1WIs1Wz8GkdgrBsMP9j/0wnSoZ2gMtwFjY/m7/A9vvUYb/AuAdb+BHzKxj5juHTn1nJocOS4G1Xj7L0Yv6n9dnl+//DG/+TXiTaKFNmCTBDETjPZPktH7qcemf6V/uMLdT81sMznmZ5zjGq711shoh5ZxRYmat3iceJL4LNOLx72c5tWKuE0I3jlRib3EAeKdTC/u9XJSu4P9L+NiwHW8zQYnAAAAAElFTkSuQmCC';
	infoLink.appendChild(infoImg);
	infoImg.title=GM_trans.lang('infolink_title');
	infoLink.display="none";
	
	if(type=='movie') { //Movie rating
		
		elementTitle=cleanup(elementTitle);
			
		  (function(element) {
			infoLink.addEventListener('click', function() {
			  googleRequest(elementTitle.replace(/ /g, "+"), element);
			}, false);
		  })(element);		

		infoLink.display="";
		
	}else if(type=='tv') {
		
		  (function(element) {
			infoLink.addEventListener('click', function() {
			  betaseriesGetUrl(cleanup_serie(elementTitle), element);
			}, false);
		  })(element);		
		
		infoLink.display="";
	}

	div.appendChild(infoLink);

}

//Added by Les-Newsgroup.fr
function binnewz_getdays(node){

	if (node.className=="data datepost" || node.className=="datepost data" || node.className=='datepost' || node.className=='data'){
		var txtDate=node.getElementsByTagName("span")[0].innerHTML;
		if (txtDate.indexOf('jours')!=-1) //Binnewz affiche soit 'jour' ou 'jours'
			var txt=txtDate.slice(12, -6).trim();
		else var txt=txtDate.slice(12, -5).trim();
		if ((parseInt(txt) % 1)==0) return txt;
		else return -1;
			
	}else return 0;
	
}


//Global functions
//Original source : http://forum.alsacreations.com/topic-5-31802-1-Recuperer-un-parametre-durl-en-javascript.html
function extractUrlParams(){	

	var t = location.search.substring(1).split('&');
	var f = [];
	for (var i=0; i<t.length; i++){
		var x = t[ i ].split('=');
		f[x[0]]=x[1];
	}
	return f;
}


//Start of the clickRow part
//Original Script : Binsearch easyclick (c) - by Johannes la Poutre ( http://userscripts.org/scripts/show/3441 )
//Original source : http://userscripts.org/scripts/review/3441
//Modified by les-Newsgroup to use it with Binsearch, NZBIndex + added localization + removed the shiftKey selection functionnality
setRow = function(row, check) {
	row.setAttribute("title", check ? GM_trans.lang('remove_from_selection') : GM_trans.lang('add_to_selection'));
	row.style.color = ((check) ? "#c00" : ""); // empty string reverts color rather than losing the stripes
	row.style.backgroundColor = ((check) ? "#bcd" : "");
	row.className = (check) ? row.className + ' selected' : row.className.replace(' selected', '');
	if(typeof row.getElementsByTagName("input")[0]!='undefined') row.getElementsByTagName("input")[0].checked = check;
}

//This is a copy of the previous function. But this one can be called during the execution of this script
//We need it to automatically check some rows 
function setRow(row, check) {
	row.setAttribute("title", check ? GM_trans.lang('remove_from_selection') : GM_trans.lang('add_to_selection'));
	row.style.color = ((check) ? "#c00" : ""); // empty string reverts color rather than losing the stripes
	row.style.backgroundColor = ((check) ? "#bcd" : "");
	row.className = (check) ? row.className + ' selected' : row.className.replace(' selected', '');
	if(typeof row.getElementsByTagName("input")[0]!='undefined') row.getElementsByTagName("input")[0].checked = check;
}

function setProtectedRow(row) {
	row.setAttribute("title", GM_trans.lang('protected_row'));
	// row.style.backgroundColor = "#FDD5D7";
}

function rowClickable(r, protect) {

	r.addEventListener("click", function(evt) {
		if (evt.target.tagName == "A" || evt.target.parentNode.tagName == "A") { return false; } // ignore clicks on anchors
		var inp = this.getElementsByTagName("input");
		if (inp.length == 0) { return; } else { inp = inp[0]; }
		if (evt.target != inp){
			if ((evt.target.tagName == "LABEL" || evt.target.parentNode.tagName == "LABEL") && website=='nzbindex') //need this because NZBIndex already check the line if click on the result's label.
				return;
			inp.checked = !inp.checked; //in any other cases
		}
		setRow(this, inp.checked);

		evt.stopPropagation();
	}, true);
	r.setAttribute("style", "cursor:pointer");
	r.setAttribute("title", GM_trans.lang('add_to_selection'));
	// remove silly hover effect
	r.removeAttribute("onmouseover");
	r.removeAttribute("onmouseout");
}

//Adding this function to the window so that we can use it with script-created buttons
unsafeWindow.clickTheseRows = function ($f, mode) {
	if(typeof $f[0]=='undefined') //so this is not a container but a parentNode
		$f=$f.getElementsByTagName('input');

		for ($i=0; $i < $f.length; $i++){
			if ($f[$i].type == "checkbox"){
				if(mode==0 && $f[$i].checked==false)
					continue; //mode:0 => cancel selection  : checked=false so no need to click
				else if(mode==1 && $f[$i].checked==true)
					continue; //mode:1 => select all : checked=true so no need to click
				var evt = document.createEvent("MouseEvents");
				evt.initMouseEvent("click", true, true, window,0, 0, 0, 0, 0, false, false, false, false, 0, null);
				$f[$i].dispatchEvent(evt);
			}
		}
}
//End of the ClikRow part

function insertExecTime(mymenu) {
	if(typeof myDebugDate != 'undefined'){
		myDebugDate=new Date();
		var timeExec=myDebugDate.getSeconds() * 1000 + myDebugDate.getMilliseconds() - startExec;
		mymenu.appendChild(document.createTextNode(' (' + timeExec + 'ms)'));
	}
}



//Thank You function for Binnewz
//url=http://www.binnews.in/_bin/thanks.php?i=?????&...
function merci(ThxUrl) { 
debug(ThxUrl);
	GM_xmlhttpRequest({
		method: 'GET',
		url: ThxUrl,
		headers: {
			 'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3',
			 'Accept': 'text/html,application/xml,text/xml',
			 }
		// onload: function(responseDetails) {

		// }
	});
}


function Binnewz_fixedHeader() {

	document.getElementById('home').setAttribute('style', 'position:fixed');
	document.getElementById('menu_search').setAttribute('style', 'position:fixed; width:100%;');
	//document.getElementById('menu_subcat').setAttribute('style', 'position:fixed; width:100%; left:560px;');
	document.getElementById('form_subcat').setAttribute('style', 'display:inline-block;');
	document.getElementById('menu_lien').setAttribute('style', 'z-index:99');

}
