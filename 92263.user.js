// ==UserScript==
// @name           The West_-_Ultime
// @namespace      http://userscripts.org/scripts/show/92263
// @description    Calcule les meilleurs vêtements pour les travaux, recherche les items utiles...
// @copyright      Hack.Crows/ryuuku
// @author         Hack.Crows
// @source author  Darius II
// @website        http://selim.oguz.free.fr/
// @include        http://*.the-west.*/game.php*
// @include        http://userscripts.org/scripts/source/92263.meta.js
// @require        http://userscripts.org/scripts/source/74144.user.js
// @exclude        http://forum.the-west.fr/*
// @exclude        http://wiki.the-west.fr/*
// @version        1.32.09
// 
// @history        1.32.09 Ajout de 1 item (<i>Remède pour l'estomac</i>) donnée par <b>Max Brown </b>
// @history        1.32.08 Ajout de 1 Instruction (<i>ouvrir une géode</i>) donnée par <b>Durga</b>
// @history        1.32.08 Ajout de 1 item (<i>Sangle en cuir</i>) donnée par <b>Khildram</b>
// @history        1.32.08 Ajout de 1 item (<i>Jambières de Billy the Kid</i>) donnée par <b>tontonbasile</b>
// @history        1.32.08 Ajout de 1 item (<i>Cassette en métal renforcé</i>) donnée par <b>Max Brown</b>
// @history        1.32.07 Ajout de 2 items (<i>Sauce à la tomate</i> et <i>Totem des serpents</i>) donnée par <b>jpm1</b>
// @history        1.32.06 Ajout de 1 item (<i>Ceinture d'aigle d'Al Swearengen</i>) donnée par <b>Méjé</b> Merci =D
// @history        1.32.05 Ajout de 4 items (<i>Enclume</i>, <i>Graphite</i>, <i>Jean de Pat F. Garrett</i> et <i>Ceinture tête de mort de Billy the Kid</i>) donnée par <b>=sSin=</b>. les 2 dernier objets sont de chouette items ^^
// @history        1.32.05 Ajout de 3 items (<i>Pâte</i>, <i>Steak mariné</i> et <i>Sac à nourriture</i>) donnée par <b>jpm1</b>
// @history        1.32.05 Ajout de 1 item (<i>Ceinture d'Adah Isaacs Menken</i>) donnée par <b>Max Brown</b>
// @history        1.32.05 Ajout de 1 Instruction (<i>fabriquer un pommeau de selle</i>) donnée par <b>Max Brown</b>
// @history        1.32.04 Bonne rentrée à tous !
// @history        1.32.04 Ajout de 2 items (<i>Jeton en métal</i> et <i>Arc</i>) donnée par <b>esberiven</b>
// @history        1.32.04 Ajout de 2 items (<i>Totem des pumas</i> et <i>Maische</i>) donnée par <b>jpm1</b>
// @history        1.32.03 Ajouts des travaux perdue (<i>Nourrir les animaux, Traquer des bandits, Tendre une embuscade, Surveiller une prison, Récolter de la canne à sucre, Faucher l’herbe, Récolter du maïs, Chasser des oiseaux du champ, Charpenter des cercueils.</i>)
// @history        1.32.02 Ajout de 1 Instruction (<i>fabriquer une pierre à polir</i>) donnée par <b>Max Brown</b>
// @history        1.32.02 Ajout de 5 items (<i>Soufre</i>, <i>Fusil</i>, <i>Idole</i>, <i>Fond de robe</i>, <i>Ceinture indienne</i> et <i>Totem des aigles</i>) donnée par <b>Max Brown</b>
// @history        1.32.02 Ajout de 1 item (<i>Purée de tomates</i>) donnée par <b>Kerberos Tyron</b>
// @history        1.32.02 Ajout de 2 items (<i>Couteau</i> et <i>Poêle</i>) donnée par <b>winston33</b>
// @history        1.32.02 Ajout de 2 items (<i>Cruche d'eau</i> et <i>Haricots cuisinés</i>) donnée par <b>javille</b>
// @history        1.32.02 Ajout de 2 items (<i>Ceinture à pistolets bleue</i> et <i>Ceinture à pistolets élégante</i>) donnée par <b>esberiven</b>
// @history        1.32.02 Ajout de 10 items (<i>Charbon de bois</i>, <i>Gourde</i>, <i>Planche à découper</i>, <i>Farine de maïs</i>, <i>Haricots avec du lard</i>, <i>Confiture</i>, <i>Résine</i>, <i>Granulés énergisants</i>, <i>Sac de voyage</i> et <i>Part de gâteau</i>) donnée par <b>jpm1</b>
// @history        1.32.01 /!\ Bonne vacances à tous /!\, moi je part au soleil voir pleins de nana :D LOL à+
// @history        1.32.01 Correction des items (<i>Jambières souples élégantes</i> et <i>Ceinture à pistolets marron</i>) donnée par <b>Max Brown</b>
// @history        1.32.01 Ajout de 2 Instructions (<i>produire de l'acide sulfurique</i> et <i>construire une roue de voiture à bâche</i>) donnée par <b>Max Brown</b>
// @history        1.32.01 Ajout de 1 produit (<i>Fusil</i>) donnée par <b>Max Brown</b>
// @history        1.32.01 Correction des items (<i>Poids</i> et <i>Ceinture à pistolets jaune</i>) donnée par <b>javille</b>
// @history        1.32.01 Ajout de 1 item (<i>Lubrifiant de graphite</i>) donnée par <b>javille</b>
// @history        1.32.00 Travaux renommés
// @history        1.30.45 Ajout de 3 produits (<i>Pyrite brute</i>, <i>Soleil de pyrite</i> et <i>Amulette</i>)
// @history        1.30.44 Correction de l'items (<i>fabriquer une idole</i>)
// @history        1.30.44 Modifications des prix des items (<i>Boîte d'amadou</i> et <i>Cigarette</i>)
// @history        1.30.44 Modifications des prix des items (<i>Ceinture tête de mort grise</i>, <i>Ceinture tête de mort marron</i>, <i>Ceinture tête de mort noire</i>, <i>Ceinture à pistolets verte</i> et <i>Ceinture à pistolets noire</i>) donnée par <b>Max Brown</b>
// @history        1.30.44 Ajout de 1 produit (<i>Poudre de graphite</i>) donnée par <b>javille</b>
// @history        1.30.44 Correction de l'item (<i>Pantalon en lin noir</i> devenue un item du Set du gentleman) donnée par <b>javille</b>
// @history        1.30.44 Modifications des prix des items (<i>Fer fondu</i>, <i>Baïonnette</i>, <i>Arme aiguisée</i>, <i>Ceinture tête de mort bleue</i>, <i>Ceinture tête de mort verte</i> et <i>Ceinture tête de mort élégante</i>) donnée par <b>javille</b>
// @history        1.30.43 Correction de l'item (<i>Maische</i>) donnée par <b>javille</b>
// @history        1.30.43 Correction de l'item (<i>Fleuret d'Athos</i>) donnée par <b>essix</b>
// @history        1.30.43 Correction des items (<i>Testament</i> et <i>Sombres projets</i>) donnée par <b>Bab83</b>
// @history        1.30.43 Ajout de l'item (<i>Éléphant</i>) donnée par <b>Max Brown</b>
// @history        1.30.42 Ajout de 1 Instruction (<i>préparer une solution alcaline</i>) donnée par <b>Max Brown</b>
// @history        1.30.41 Ajout de 1 produit (<i>Granulés énergisants</i>) donnée par <b>jpm1</b>
// @history        1.30.40 Ajout de 1 Instruction (<i>fabriquer une bosse à tuyau</i>) donnée par <b>MaStErGrAhAm</b>
// @history        1.30.39 Correction du script et de diverses choses.
// @history        1.30.39 Ajout de 1 produit (<i>Carte montrant les cachettes des animaux</i>) donnée par <b>esberiven</b>
// @history        1.30.38 Ajout de 1 pantalon (<i>Pantalon en lin de William Masterson</i>) donnée par <b>jpm1</b>
// @history        1.30.38 Ajout de 1 recette (<i>un poisson puant enroulé dans du papier journal</i>) donnée par <b>jpm1</b>
// @history        1.30.38 Ajout de 1 produit (<i>Confiture</i>) donnée par <b>javille</b>
// @history        1.30.37 Ajout de 1 produit (<i>L'élixir de l'ours</i> ^^) donnée par <b>MDR95</b>
// @history        1.30.36 Correction de l'item (<i>Buntline de Wyatt Earp</i>) donnée par <b>BijouCaillou</b>
// @history        1.30.36 Ajout de 2 produits (<i>Lion</i> et <i>Loup</i>) donnée par <b>BijouCaillou</b>
// @history        1.30.35 Ajout de 4 produits (<i>Haricots avec du lard</i>, <i>Poids</i>, <i>Acier</i> et <i>Enclume</i>) donnée par <b>zilane</b>
// @history        1.30.35 Ajout de 1 Instruction (<i>recycler du papier</i>) donnée par <b>Tollaf</b>
// @history        1.30.35 Ajout de 1 produit (<i>Boîte d'amadou</i>) donnée par <b>MaStErGrAhAm</b>
// @history        1.30.34 Ajout de 1 produit (<i>Baïonnette</i>) donnée par <b>Jake-Marston</b>
// @history        1.30.33 Ajout de 2 produits (<i>Une carte au trésor !</i> et <i>Ours brun</i>) donnée par <b>Max Brown</b>
// @history        1.30.33 Ajout de 1 Instruction (<i>mélange de tabac à chiquer</i>) donnée par <b>Max Brown</b>
// @history        1.30.32 Ajout de 1 Instruction (<i>préparer des granulés énergisants</i>) donnée par <b>MDR95</b>
// @history        1.30.31 Correction du produit (<i>Couteau</i>) donnée par <b>javille</b>
// @history        1.30.31 Ajout de 2 Instructions (<i>fabriquer un vêtement rafraîchissant</i> et <i>fabriquer un ornement</i>) donnée par <b>javille</b>
// @history        1.30.31 Ajout de 1 Recette (<i>préparer une sauce</i>) donnée par <b>Tollaf</b>
// @history        1.30.31 Ajout de 2 Instructions (<i>fabriquer un compas non aligné</i> et <i>fabriquer un fer de marquage</i>) donnée par <b>Tollaf</b>
// @history        1.30.30 Ajout de 1 produit (<i>Porte-monnaie</i>) donnée par <b>Max Brown</b>
// @history        1.30.30 Ajout de 1 Recette (<i>préparer de la viande hachée</i>) donnée par <b>esberiven</b>
// @history        1.30.30 Ajout de 1 produit (<i>Bêche collée</i>) donnée par <b>esberiven</b>
// @history        1.30.29 Ajout de 1 produit (<i>Émeraude brute</i>) donnée par <b>jpm1</b>
// @history        1.30.29 Correction du produit (<i>Soufre</i>) donnée par <b>Max Brown</b>
// @history        1.30.29 Ajout de 2 Instructions (<i>ornement décoratif en cuir</i> et <i>fondre une bille</i>) donnée par <b>Max Brown</b>
// @history        1.30.28 Fonctionnalité d <a href="http://forum.the-west.fr/showthread.php?t=16944" target="_blank">Enregistrement des tenue</a> retirée sur demande de <b><i>Naolia</b></i>, Community Manager The West France.
// @history        1.30.28 Ajout du produit <i>Cassette cloutée</i>
// @history        1.30.28 Ajout de 1 Instruction (<i>mélange de thé</i>) donnée par <b>esberiven</b>
// @history        1.30.28 Ajout 2 produits (<i>Puma</i> et <i>L'élixir du serpent</i>) donnée par <b>Max Brown</b>
// @history        1.30.27 Ajout d'un Pop-Up lors du passage de la souris sur l'icone ronde
// @history        1.30.27 Ajout de 3 Instructions (<i>préparer un fumoir</i>, <i>préparer différents distillats</i> et <i>préparer de la liqueur de fruit</i>) donnée par <b>esberiven</b>
// @history        1.30.26 Ajout de 3 produits (<i>Diamant brut</i>, <i>Serpent</i> et <i>Sac de voyage</i>) donnée par <b>Banuck</b>
// @history        1.30.26 Ajout de 1 Recette (<i>préparer un bouillon de poisson</i>) donnée par <b>esberiven</b>
// @history        1.30.26 Ajout de 1 Instruction (<i>dîner de gentleman</i>) donnée par <b>esberiven</b>
// @history        1.30.26 Erreur d'orthographe corrigée, merci <b>jpm1</b>
// @history        1.30.26 Ajout de 1 Recette (<i>préparer une dinde rôtie</i>) donnée par <b>jpm1</b>
// @history        1.30.26 Ajout de 1 Instruction (<i>fabriquer un moule de revolver</i>) donnée par <b>jpm1</b>
// @history        1.30.26 Ajout de 1 produit (<i>Loup avec un gros ventre</i>) donnée par <b>jpm1</b>
// @history        1.30.26 Ajout de 6 Instructions (<i>préparer de l'encre</i>, <i>préparer le rembourrage</i>, <i>préparer un remède pour l'estomac</i>, <i>fabriquer une baïonnette</i>, <i>fondre du plomb</i> et <i>fabriquer une enclume</i>) donnée par <b>MaStErGrAhAm</b>
// @history        1.30.25 Erreur d'orthographe corrigées, merci <b>jpm1</b>
// @history        1.30.25 Correction du produit (<i>Rubis brut</i>) donnée par <b>jpm1</b>
// @history        1.30.25 Ajout de 1 produit (<i>Aigle de mer</i>) donnée par <b>esberiven</b>
// @history        1.30.25 Ajout de 2 Instructions (<i>préparer de l'alcool illégal</i> et <i> fabriquer des étriers</i>) donnée par <b>esberiven</b>
// @history        1.30.24 Ajout de 2 Instructions (<i>fondre de l'acier</i> et <i>fabriquer une poignée d'épée</i>) donnée par <b>uniformedu67</b>
// @history        1.30.24 Ajout de 3 produits (<i>Lapin</i>, <i>L'élixir du puma</i> et <i>L'élixir de l'aigle</i>) donnée par <b>esberiven</b>
// @history        1.30.24 Ajout de 2 Instructions (<i>préparer de l'eau de rose</i> et <i>préparation de la pâte</i>) donnée par <b>jpm1</b>
// @history        1.30.24 Ajout de 4 produits (<i>Résine</i>, <i>Gourde</i>, <i>Poêle</i> et <i>Petit poney</i>) donnée par <b>jpm1</b>
// @history        1.30.24 Ajout de 2 Recettes (<i>préparer une soupe au poisson</i> et <i>préparer de la maische</i>) donnée par <b>MaStErGrAhAm</b>
// @history        1.30.24 Ajout de 2 produits (<i>Fer fondu</i> et <i>Souffre</i>) donnée par <b>MaStErGrAhAm</b>
// @history        1.30.24 Correction de 3 items (<i>Poignard de Cody</i>, <i>1. Œuf de Pâques</i> et <i>Fusil à percussion</i>) donnée par <b>MaStErGrAhAm</b>
// @history        1.30.24 Ajout de 10 Instructions, fiouuuu ^^ (<i>fabriquer une pile</i>, <i>coudre un sac de couchage</i>, <i>fabriquer une lame d'acier</i>, <i>retirer la couverture en cuir d'une selle</i>, <i>préparer une couverture de cuir</i>, <i>coudre une couverture de cheval</i>, <i>préparer un poids</i>, <i>fabriquer un morceau de diligence</i>, <i>préparer du pétrole</i> et <i>préparer une poupée vaudou</i> et <i>préparer de la liqueur aux herbes</i>) donnée par <b>MaStErGrAhAm</b>
// @history        1.30.23 Ajout de 1 Recette (<i>préparer une boulette de légumes</i>) donnée par <b>jpm1</b>
// @history        1.30.22 Ajout de 2 Instructions (<i>fabriquer des rivets</i>) et <i>préparer de la liqueur aux herbes</i> donnée par <b>jpm1</b>
// @history        1.30.22 Correction des Sets
// @history        1.30.21 Problème au niveau des jobs concernant les points de travail corrigés
// @history        1.30.21 Ajout de 1 Instruction (<i>fabriquer une figurine de plomb</i>) donnée par <b>baltazar le demon</b>
// @history        1.30.21 Ajout de 1 Recette (<i>cuire de la confiture</i>) donnée par <b>jpm1</b>
// @history        1.30.21 Ajout de 3 Instructions (<i>fabriquer une poignée</i>, <i>ferrer un cheval</i> et <i>fabriquer une bride</i>) donnée par <b>Max Brown</b>
// @history        1.30.21 Correction de 5 items (<i>Cartouchière noire</i>, <i>Chaussures à pointes marrons</i>, <i>Schofield de Jesse James</i>, <i>Fusil en or</i> et <i>Poivrière d'Allen</i>) donnée par <b>esberiven</b>
// @history        1.30.21 Ajout de 1 produit (<i>indigo</i>) donnée par <b>esberiven</b>; merci!
// @history        1.30.21 Ajout de 2 produits (<i>Chevreau</i> et <i>Part de gâteau</i>) donnée par <b>esberiven</b>
// @history        1.30.21 Ajout de 4 Recettes (<i>cuire des haricots avec du lard</i>, <i>faire mariner un steak</i>, <i>préparer un gâteau</i> et <i>préparer une morue séchée</i>) donnée par <b>jpm1</b>
// @history        1.30.21 Ajout de 4 produits (<i>Cruche d'eau</i>, <i>Couteau</i>, <i>Cigarette</i> et <i>Planche à découper</i>) donnée par <b>jpm1</b>
// @history        1.30.21 Ajout du job <b><i>Récolter de l'indigo</i></b> (Pas encore opérationnelle, beug et non complété)
// @history        1.30.20 Ajout de 2 Instructions (<i>fabriquer un éperon</i> et <i>fabriquer une sangle</i>) donnée par <b>jpm1</b>
// @history        1.30.20 Ajout de 1 Recette (<i>préparer de la liqueur</i>) donnée par <b>jpm1</b>
// @history        1.30.19 Formules des Set changés ('Fermier', 'Mexicain', 'Indien', 'Charlatan', 'Pèlerin', 'Pèlerine'
// @history        1.30.19 Ajout de 2 items (<i>Charbon de bois</i> et <i>Farine de maïs</i>) donnée par <b>jpm1</b>
// @history        1.30.19 Ajout de 2 items (<i>Arme aiguisée</i> et <i>Étoile de shérif</i>) donnée par <b>Tollaf</b>
// @history        1.30.19 Correction de 1 item (<i>Ceinture en laine noire</i>) donnée par <b>baltazar le demon</b>
// @history        1.30.19 Correction de 1 item (<i>Chemise en lin</i>) donnée par <b>Kala Hary</b>
// @history        1.30.19 Correction de 4 items (<i>Fronde de blanc-bec</i>, <i>Pantalon en fourrure marron</i>, <i>Pantalon de travail noir</i> et <i>Short de Franck Butler</i>) donnée par <b>Tollaf</b>
// @history        1.30.19 Correction de 4 items (<i>Pantalon indien marron</i>, <i>Ceinture à boucle noire</i>, <i>Fusil à grenaille</i> et <i>Balle en or</i>) donnée par <b>Serapion</b>
// @history        1.30.18 Correction de la sauvegarde
// @history        1.30.18 Ajout de 1 item (<i>Cartouchière de Calamity Jane</i>) donnée par <b>nathou44</b>
// @history        1.30.17 Correction de 1 item  (<i>Chemise en lin</i>) donnée par <b>Yannickm</b>
// @history        1.30.17 Correction de 1 item (<i>Arc précis</i>) donnée par <b>Gorni</b>
// @history        1.30.17 Correction de 2 items (<i>Chemise verte à carreaux</i> et <i>CChaussures à pointes noires</i>) donnée par <b>Tollaf</b>
// @history        1.30.16 Correction de 5 items (<i>Chemise grise à carreaux</i>, <i>Chemise jaune à carreaux</i>, <i>Balle en métal</i>, <i>Dent de coyote</i> et <i>Corne de vache</i> ) donnée par <b>Gorni</b>
// @history        1.30.15 Correction de 1 item (<i>Chaussures à pointes nobles</i>) donnée par <b>Tollaf</b>
// @history        1.30.14 Correction de 1 item (<i>Feuilles de tabac</i>) donnée par <b>Tollaf</b>
// @history        1.30.13 Correction de 4 items (<i>Épée d'Hernando</i>, <i>Fusil à percussion rouillé</i>, <i>Gibus de Lincoln</i> et <i>Piège à castor</i>) donnée par <b>Gohklayeh</b>
// @history        1.30.12 Erreur d'orthographe corrigées, merci <b>jpm1</b>
// @history        1.30.12 Correction de 2 items (<i>Chair de crabe</i> et <i>Collier de l'amour</i>)
// @history        1.30.11 Nouvelle fenêtre de MAJ et divers changement
// @history        1.30.11 Nouveautés  ajoutés: Salaire, Exp et plage de drops pour les jobs
// @history        1.30.10 Correction de 2 items
// @history        1.30.09 Bientôt une nouvelle version avec de nouveaux ajouts (Exp, $ et drop maxi.)
// @history        1.30.09 <i>Attaquer un train</i> corrigé
// @history        1.30.09 Nouveautés implantés
// @history        1.30.08 Erreur d'orthographe corrigées, merci <b>jpm1</b>
// @history        1.30.08 Ajout du produit <i>Fleur de paix</i>, merci <b>Max Brown</b> (allias <b>synopsys</b>)
// @history        1.30.07 Erreur d'orthographe corrigées, merci <b>jpm1</b>
// @history        1.30.07 Correction de la position dans l'inventaire
// @history        1.30.06 Travaux en gras enlevés: bug.
// @history        1.30.05 Divers correction de langages données par <b>jpm1</b>
// @history        1.30.04 Divers correction
// @history        1.30.03 Correction de la fenêtre MAJ
// @history        1.30.02 Correction de la fenêtre MAJ
// @history        1.30.02 Ajout des nom des travaux en gras
// @history        1.30.01 Divers correction
// @history        1.30z Ajout du <i>bouquet de fleur</i>
// @history        1.30y Divers correction (Kit -> Set)
// @history        1.30x Divers correction donnée par <b>jpm1</b>
// @history        1.30w Ajout de la <i>Ceinture à boucle de Charles Goodnight</i> donnée par <b>Dex-mex</b>
// @history        1.30v Mise en place d'une fenêtre MAJ
// @history        1.30u Merci à <b>Khetalord</b> pour le Produit de braquer une banque
// @history        1.30u Correction de diverses choses
// @history        1.30 Mise en place du Script
// ==/UserScript==

// Modifié par <i>Hack.Crows</i>, scripteur originale Darius II.
// Merci à <b>John Burtz</b> pour les infos sur les items secret et d'avoir testé le script en premier!
// Merci également <b>Arizona Dream</b> pour m'avoir fournie la plupart des nouveaux items du jeu lors de la version 1.30
// Merci les <b>Bultiniens</b> du monde fr4 ainsi qu'à <b>Pandore</b> pour les test.
// Merci à <b>jpm1</b> qui est le professeur de français en herbe.
// Ansi que toute <b>la Communauté Fr.</b> du jeu.


var TwuVers = "1.32.09";

try {
	ScriptUpdater.check(92263, TwuVers);
} catch(e) { };

var url = window.location.href;
if (url.indexOf(".the-west.") != -1) {

var szafa_enabled = false; // false-true

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) {return;}
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
} // style

function addFooterIcon(mylink,idname, title) {
	var head, style;
	footer_menu_left = document.getElementById('footer_minimap_icon');
	if (footer_menu_left) footer_menu_left = footer_menu_left.parentNode;
	if (footer_menu_left) footer_menu_left = footer_menu_left.parentNode;
	if (!footer_menu_left) {return false;}
	var iconlink = document.createElement('a');
	iconlink.setAttribute('href',mylink);
	iconlink.setAttribute('title','<b>Boîte à Outils</b>');
	iconlink.innerHTML = "<img id=\""+idname+"\" alt=\"\" src=\"images/transparent.png\"/>";
	footer_menu_left.appendChild(iconlink);
	addPop(idname,'<b>'+title+'</b>');
	return true;
};

function addPop (id,title){
	if ($(id))
		setTimeout(function() {$(id).addMousePopup(title)},2500)
}

aWindow = (unsafeWindow) ? unsafeWindow : window;
var $=aWindow.$;

Str = 'http://wiki.the-west.fr/wiki/Utilisateur:Hack.Crows';
przy_link = '&nbsp;<a href=\"'+Str+'\" target=\"_blank\">Hack.Crows</a>';

//======= Boîte à outils ===

// Création du bouton, la boîte à outils
addFooterIcon('javascript:pk2_show_panel();','footer_building_BEST_ITEMS','Boîte à outils');
addGlobalStyle('#footer_menu_left #footer_building_BEST_ITEMS {background-image:url(http://s3.noelshack.com/uploads/images/20589733820700_bote__outils_ronde.png);}');
addGlobalStyle('#footer_building_BEST_ITEMS {background-position:0px 0;}');
addGlobalStyle('#workbar_left {margin-top:25px;}');
addGlobalStyle('#workbar_right {margin-top:75px;}');


  var pk2_link2 = document.createElement("div");
  pk2_link2.id="pk2_link2";
  pk2_link2.innerHTML = '<a id=\"TWF_pk2_link2\" href=\"javascript:pk2_show_panel();void(0);\"></a>';
  addGlobalStyle('#pk2_link2 { background:url(http://s3.noelshack.com/uploads/images/12405898916037_bote__outils_rectangle.png); }');
  var menu_inventory = document.getElementById('menu_inventory');
  if (menu_inventory) {
    menu_inventory.parentNode.insertBefore(pk2_link2, menu_inventory.nextSibling);
  }
  if (szafa_enabled) {
	var pk2_link2_szafa = document.createElement("div");
	pk2_link2_szafa.id="pk2_link2_szafa";
	pk2_link2_szafa.innerHTML = '<a id=\"TWF_pk2_link2_szafa\" href=\"javascript:pk2_odev_spam_option();void(0);\"></a>';
	addGlobalStyle('#pk2_link2_szafa { background:url(http://s3.noelshack.com/uploads/images/12405898916037_bote__outils_rectangle.png); }');
	var menu_forts = document.getElementById('menu_forts');
	if (menu_forts) {
	   menu_forts.parentNode.insertBefore(pk2_link2_szafa, menu_forts.nextSibling);
	}
  }

// Interface
aWindow.pk2_w0=460;		// Largeur de la fenêtre
aWindow.pk2_w1=900;		// Longeur de la fenêtre

//
aWindow.pk2_l0 = (window.innerWidth) ? (window.innerWidth-aWindow.pk2_w0)/2 : (1024-aWindow.pk2_w0) /2 ;
aWindow.pk2_t0=7;
aWindow.pk2_l1 = (window.innerWidth) ? (window.innerWidth-aWindow.pk2_w1)/2 : (1024-aWindow.pk2_w1) /2 ;
aWindow.pk2_t1=50;

// hauteur des fenêtres
aWindow.pk2_title_h_min=25;							// Hauteur min. fenêtre
aWindow.pk2_title_h_mid=71;							// Hauteur min. fenêtre
aWindow.pk2_title_h_max=375;						// Hauteur max. fenêtre
aWindow.pk2_window_h_min=25;						// Hauteur max. fenêtre
aWindow.pk2_window_h_max= (window.innerHeight-220);	// Hauteur de la fenêtre des résultats
aWindow.pk2_tlink=' style=\"color:white; display:block; width:20px; height:20px; float:left;\" ';
aWindow.pk2_vblock=' style=\"border:1px solid black; padding:10x; marging:1px;\" ';
aWindow.pk2_title_flag=0;
aWindow.pk2_title_flag2=1;
aWindow.pk2_window_flag2=1;
aWindow.pk2_odevalo4ka = true;

pk2_code='';
pk2_code += "\
pk2_zaschitato=1;\
pk2_import=false;\
pk2_khlam=false;\
ezda=false;\
zaschita=null;\
pk2_millioner=false;\
pk2_process=false;\
pk2_zdorov=0;\
pk2_count_inv=0;\
pk2_odev_count=0;\
pk2_odev_id=0;\
pk2_odev_type=0;\
pk2_odev_time=500;\
pk2_odev_rep=20;\
pk2_odev_var='n';\
pk2_odev_rab=0;\
pk2_odev_item=0;\
pk2_odev_list={};\
pk2_odev_stat=true;\
\
einfo='';\
winfo='';\
\
pk2_types=['right_arm', 'left_arm', 'head', 'body', 'belt', 'pants', 'foot', 'neck', 'animal', 'yield'];\
nabory=['set_farmer', 'set_mexican', 'set_indian', 'set_quackery', 'set_pilgrim_male', 'set_pilgrim_female', 'set_gentleman', 'set_dancer', 'fireworker_set', 'gold_set', 'greenhorn_set'];\
\
pk2_predmetov = {};\
pk2_uchet=[];\
pk2_aktiv=[];\
pk2_nenuzhnoe=[];\
irabota=0;\
pk2_inv_imported=false;\
pk2_slots={};\
pk2_equipment={};\
for (ii=0;ii<pk2_types.length;++ii) {pk2_equipment[pk2_types[ii]]=0};\
";

// Listes de tous les items du jeu
pk2_code += "\
items=[];\
items[0] = {item_id:0, nshort:'unknown', name:'Produit au hasard', type:'yield', level:0, price:0, image:'images/items/unknown.png?1', image_mini:'images/items/unknown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'nil'};\
items[1] = {item_id:1, nshort:'clayjug', name:'Gargoulette brisée', type:'right_arm', level:1, price:16, image:'images/items/right_arm/clayjug.png?1', image_mini:'images/items/right_arm/mini/clayjug.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[2] = {item_id:2, nshort:'winebottle', name:'Bouteille de vin brisée', type:'right_arm', level:5, price:26, image:'images/items/right_arm/winebottle.png?1', image_mini:'images/items/right_arm/mini/winebottle.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[3] = {item_id:3, nshort:'whiskeybottle', name:'Bouteille de whisky brisée', type:'right_arm', level:7, price:40, image:'images/items/right_arm/whiskeybottle.png?1', image_mini:'images/items/right_arm/mini/whiskeybottle.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[4] = {item_id:4, nshort:'rotty_club', name:'Gourdin pourri', type:'right_arm', level:7, price:26, image:'images/items/right_arm/rotty_club.png?1', image_mini:'images/items/right_arm/mini/rotty_club.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[5] = {item_id:5, nshort:'club', name:'Gourdin', type:'right_arm', level:10, price:63, image:'images/items/right_arm/club.png?1', image_mini:'images/items/right_arm/mini/club.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[6] = {item_id:6, nshort:'nail_club', name:'Gourdin avec un clou', type:'right_arm', level:13, price:125, image:'images/items/right_arm/nail_club.png?1', image_mini:'images/items/right_arm/mini/nail_club.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[7] = {item_id:7, nshort:'rusty_razor', name:'Rasoir rouillé', type:'right_arm', level:12, price:64, image:'images/items/right_arm/rusty_razor.png?1', image_mini:'images/items/right_arm/mini/rusty_razor.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[8] = {item_id:8, nshort:'razor', name:'Rasoir', type:'right_arm', level:15, price:146, image:'images/items/right_arm/razor.png?1', image_mini:'images/items/right_arm/mini/razor.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[9] = {item_id:9, nshort:'sharp_razor', name:'Rasoir coupant', type:'right_arm', level:18, price:354, image:'images/items/right_arm/sharp_razor.png?1', image_mini:'images/items/right_arm/mini/sharp_razor.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{aim:1}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[10] = {item_id:10, nshort:'figaros_razor', name:'Rasoir du Figaro', type:'right_arm', level:25, price:1740, image:'images/items/right_arm/figaros_razor.png?1', image_mini:'images/items/right_arm/mini/figaros_razor.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{finger_dexterity:3, aim:3}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[11] = {item_id:11, nshort:'rusty_skewer', name:'Poignard rouillé', type:'right_arm', level:17, price:122, image:'images/items/right_arm/rusty_skewer.png?1', image_mini:'images/items/right_arm/mini/rusty_skewer.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[12] = {item_id:12, nshort:'skewer', name:'Poignard ', type:'right_arm', level:20, price:384, image:'images/items/right_arm/skewer.png?1', image_mini:'images/items/right_arm/mini/skewer.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{punch:1}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[13] = {item_id:13, nshort:'sharp_skewer', name:'Poignard coupant', type:'right_arm', level:23, price:554, image:'images/items/right_arm/sharp_skewer.png?1', image_mini:'images/items/right_arm/mini/sharp_skewer.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{punch:1}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[14] = {item_id:14, nshort:'codys_skewer', name:'Poignard de Cody', type:'right_arm', level:30, price:2600, image:'images/items/right_arm/codys_skewer.png?1', image_mini:'images/items/right_arm/mini/codys_skewer.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{health:4, punch:3}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[15] = {item_id:15, nshort:'rusty_bowie', name:'Couteau bowie rouillé', type:'right_arm', level:27, price:450, image:'images/items/right_arm/rusty_bowie.png?1', image_mini:'images/items/right_arm/mini/rusty_bowie.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:1}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[16] = {item_id:16, nshort:'bowie', name:'Couteau bowie ', type:'right_arm', level:30, price:850, image:'images/items/right_arm/bowie.png?1', image_mini:'images/items/right_arm/mini/bowie.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:2}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[17] = {item_id:17, nshort:'sharp_bowie', name:'Couteau bowie coupant', type:'right_arm', level:33, price:1220, image:'images/items/right_arm/sharp_bowie.png?1', image_mini:'images/items/right_arm/mini/sharp_bowie.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:2}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[18] = {item_id:18, nshort:'bowies_knife', name:'Couteau de Bowie', type:'right_arm', level:40, price:4600, image:'images/items/right_arm/bowies_knife.png?1', image_mini:'images/items/right_arm/mini/bowies_knife.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:4, pitfall:5}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[19] = {item_id:19, nshort:'rusty_foil', name:'Fleuret rouillé', type:'right_arm', level:32, price:730, image:'images/items/right_arm/rusty_foil.png?1', image_mini:'images/items/right_arm/mini/rusty_foil.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:2}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[20] = {item_id:20, nshort:'foil', name:'Fleuret ', type:'right_arm', level:35, price:1134, image:'images/items/right_arm/foil.png?1', image_mini:'images/items/right_arm/mini/foil.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:2}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[21] = {item_id:21, nshort:'sharp_foil', name:'Fleuret tranchant', type:'right_arm', level:38, price:1655, image:'images/items/right_arm/sharp_foil.png?1', image_mini:'images/items/right_arm/mini/sharp_foil.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:3}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[22] = {item_id:22, nshort:'athos_foil', name:'Fleuret d\\'Athos', type:'right_arm', level:45, price:5775, image:'images/items/right_arm/athos_foil.png?1', image_mini:'images/items/right_arm/mini/athos_foil.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{finger_dexterity:5, endurance:6}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[23] = {item_id:23, nshort:'rusty_machete', name:'Machette rouillée', type:'right_arm', level:37, price:940, image:'images/items/right_arm/rusty_machete.png?1', image_mini:'images/items/right_arm/mini/rusty_machete.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tough:2}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[24] = {item_id:24, nshort:'machete', name:'Machette ', type:'right_arm', level:40, price:1560, image:'images/items/right_arm/machete.png?1', image_mini:'images/items/right_arm/mini/machete.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tough:3}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[25] = {item_id:25, nshort:'sharp_machete', name:'Machette coupante', type:'right_arm', level:43, price:2150, image:'images/items/right_arm/sharp_machete.png?1', image_mini:'images/items/right_arm/mini/sharp_machete.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tough:3}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[26] = {item_id:26, nshort:'nats_machete', name:'Machette de Nat', type:'right_arm', level:50, price:6750, image:'images/items/right_arm/nats_machete.png?1', image_mini:'images/items/right_arm/mini/nats_machete.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:6, tough:6}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[27] = {item_id:27, nshort:'rusty_conquistador', name:'Épée de conquistador rouillée', type:'right_arm', level:47, price:1710, image:'images/items/right_arm/rusty_conquistador.png?1', image_mini:'images/items/right_arm/mini/rusty_conquistador.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{reflex:3}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[28] = {item_id:28, nshort:'conquistador', name:'Épée de conquistador ', type:'right_arm', level:50, price:2560, image:'images/items/right_arm/conquistador.png?1', image_mini:'images/items/right_arm/mini/conquistador.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{reflex:4}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[29] = {item_id:29, nshort:'sharp_conquistador', name:'Épée de conquistador coupante ', type:'right_arm', level:53, price:3370, image:'images/items/right_arm/sharp_conquistador.png?1', image_mini:'images/items/right_arm/mini/sharp_conquistador.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{reflex:5}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[30] = {item_id:30, nshort:'henandos_conquistador', name:'Épée d\\'Hernando', type:'right_arm', level:50, price:8700, image:'images/items/right_arm/henandos_conquistador.png?1', image_mini:'images/items/right_arm/mini/henandos_conquistador.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{trade:6, reflex:7}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[31] = {item_id:31, nshort:'rusty_tomahawk', name:'Tomahawk rouillé', type:'right_arm', level:57, price:2900, image:'images/items/right_arm/rusty_tomahawk.png?1', image_mini:'images/items/right_arm/mini/rusty_tomahawk.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{dodge:3, hide:2}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[32] = {item_id:32, nshort:'tomahawk', name:'Tomahawk ', type:'right_arm', level:60, price:3800, image:'images/items/right_arm/tomahawk.png?1', image_mini:'images/items/right_arm/mini/tomahawk.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{hide:3, dodge:3}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[33] = {item_id:33, nshort:'sharp_tomahawk', name:'Tomahawk coupant', type:'right_arm', level:63, price:4900, image:'images/items/right_arm/sharp_tomahawk.png?1', image_mini:'images/items/right_arm/mini/sharp_tomahawk.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{dodge:3, hide:3}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[34] = {item_id:34, nshort:'taschunkas_tomahawk', name:'La Tomahawk de Taschunka', type:'right_arm', level:70, price:10100, image:'images/items/right_arm/taschunkas_tomahawk.png?1', image_mini:'images/items/right_arm/mini/taschunkas_tomahawk.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{dodge:5, hide:3, swim:7}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[35] = {item_id:35, nshort:'rusty_axe', name:'Hache rouillée', type:'right_arm', level:62, price:3400, image:'images/items/right_arm/rusty_axe.png?1', image_mini:'images/items/right_arm/mini/rusty_axe.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{punch:4}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[36] = {item_id:36, nshort:'axe', name:'Hache ', type:'right_arm', level:65, price:4400, image:'images/items/right_arm/axe.png?1', image_mini:'images/items/right_arm/mini/axe.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{punch:5}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[37] = {item_id:37, nshort:'sharp_axe', name:'Hache coupante', type:'right_arm', level:68, price:5600, image:'images/items/right_arm/sharp_axe.png?1', image_mini:'images/items/right_arm/mini/sharp_axe.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{punch:6}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[38] = {item_id:38, nshort:'boones_axe', name:'La Hache à Boones', type:'right_arm', level:75, price:10200, image:'images/items/right_arm/boones_axe.png?1', image_mini:'images/items/right_arm/mini/boones_axe.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{punch:8, build:8}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[39] = {item_id:39, nshort:'rusty_sabre', name:'Sabre de cavalerie rouillé', type:'right_arm', level:67, price:4200, image:'images/items/right_arm/rusty_sabre.png?1', image_mini:'images/items/right_arm/mini/rusty_sabre.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:5}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[40] = {item_id:40, nshort:'sabre', name:'Sabre de cavalerie', type:'right_arm', level:70, price:5230, image:'images/items/right_arm/sabre.png?1', image_mini:'images/items/right_arm/mini/sabre.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:6}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[41] = {item_id:41, nshort:'sharp_sabre', name:'Sabre de cavalerie coupant', type:'right_arm', level:73, price:6350, image:'images/items/right_arm/sharp_sabre.png?1', image_mini:'images/items/right_arm/mini/sharp_sabre.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:6}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[42] = {item_id:42, nshort:'grants_sabre', name:'Sabre du général Grant', type:'right_arm', level:80, price:10800, image:'images/items/right_arm/grants_sabre.png?1', image_mini:'images/items/right_arm/mini/grants_sabre.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:9, ride:9}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[43] = {item_id:43, nshort:'screwdriver', name:'Tournevis', type:'right_arm', level:10, price:114, image:'images/items/right_arm/screwdriver.png?1', image_mini:'images/items/right_arm/mini/screwdriver.png?1', characterClass:'worker', characterSex:null, speed:null, bonus:{skills:{finger_dexterity:1}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\n\
items[44] = {item_id:44, nshort:'spanner', name:'Clé', type:'right_arm', level:21, price:628, image:'images/items/right_arm/spanner.png?1', image_mini:'images/items/right_arm/mini/spanner.png?1', characterClass:'worker', characterSex:null, speed:null, bonus:{skills:{build:2}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\n\
items[45] = {item_id:45, nshort:'crowbar', name:'Pied-de-biche ', type:'right_arm', level:36, price:1594, image:'images/items/right_arm/crowbar.png?1', image_mini:'images/items/right_arm/mini/crowbar.png?1', characterClass:'worker', characterSex:null, speed:null, bonus:{skills:{repair:3}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[46] = {item_id:46, nshort:'whips', name:'Fouet', type:'right_arm', level:30, price:594, image:'images/items/right_arm/whips.png?1', image_mini:'images/items/right_arm/mini/whips.png?1', characterClass:'adventurer', characterSex:null, speed:null, bonus:{skills:{reflex:5}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[47] = {item_id:47, nshort:'pillow', name:'Coussin', type:'right_arm', level:45, price:450, image:'images/items/right_arm/pillow.png?1', image_mini:'images/items/right_arm/mini/pillow.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:'set_sleeper', name:'Grincheux'}, shop:'shop'};\n\
items[48] = {item_id:48, nshort:'bowie_xmas', name:'Couteau à bûche de Noël', type:'right_arm', level:1, price:512, image:'images/items/right_arm/bowie_xmas.png?1', image_mini:'images/items/right_arm/mini/bowie_xmas.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:2}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[49] = {item_id:49, nshort:'brassknuckles', name:'Coup-de-poing', type:'right_arm', level:6, price:82, image:'images/items/right_arm/brassknuckles.png?1', image_mini:'images/items/right_arm/mini/brassknuckles.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:1, punch:2}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[50] = {item_id:50, nshort:'goldensable', name:'Sabre en or', type:'right_arm', level:70, price:22500, image:'images/items/right_arm/goldensable.png?1', image_mini:'images/items/right_arm/mini/goldensable.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{aim:4, punch:8}, attributes:{}}, set:{key:'gold_set', name:'Set en or'}, shop:'shop'};\
items[51] = {item_id:51, nshort:'fakegoldensable', name:'Imitation de sabre en or', type:'right_arm', level:80, price:10500, image:'images/items/right_arm/fakegoldensable.png?1', image_mini:'images/items/right_arm/mini/fakegoldensable.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{aim:2, punch:5}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[52] = {item_id:52, nshort:'greenhorn_axe', name:'Hache de scout', type:'right_arm', level:6, price:550, image:'images/items/right_arm/greenhorn_axe.png?1', image_mini:'images/items/right_arm/mini/greenhorn_axe.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{punch:1}, attributes:{}}, set:{key:'greenhorn_set', name:'Set du blanc-bec'}, shop:'shop'};\
items[53] = {item_id:53, nshort:'xmas_rod', name:'Baguette', type:'right_arm', level:null, price:250, image:'images/items/right_arm/xmas_rod.png?1', image_mini:'images/items/right_arm/mini/xmas_rod.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:-2, aim:2}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
\n\
items[55] = {item_id:55, nshort:'bouquet', name:'Bouquet de fleurs', type:'right_arm', level:1, price:22, image:'images/items/right_arm/bouquet.png?1', image_mini:'images/items/right_arm/mini/bouquet.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
\n\
\n\
items[101] = {item_id:101, nshort:'bow_rusty', name:'Arc pourri', type:'left_arm', level:5, price:400, image:'images/items/left_arm/bow_rusty.png?1', image_mini:'images/items/left_arm/mini/bow_rusty.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[102] = {item_id:102, nshort:'bow_normal', name:'Arc', type:'left_arm', level:10, price:650, image:'images/items/left_arm/bow_normal.png?1', image_mini:'images/items/left_arm/mini/bow_normal.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[103] = {item_id:103, nshort:'bow_best', name:'Arc précis', type:'left_arm', level:13, price:1275, image:'images/items/left_arm/bow_best.png?1', image_mini:'images/items/left_arm/mini/bow_best.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[104] = {item_id:104, nshort:'crossbow_rusty', name:'L\\'arbalète pourrie', type:'left_arm', level:10, price:520, image:'images/items/left_arm/crossbow_rusty.png?1', image_mini:'images/items/left_arm/mini/crossbow_rusty.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[105] = {item_id:105, nshort:'crossbow_normal', name:'Arbalète ', type:'left_arm', level:20, price:755, image:'images/items/left_arm/crossbow_normal.png?1', image_mini:'images/items/left_arm/mini/crossbow_normal.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[106] = {item_id:106, nshort:'crossbow_best', name:'L\\'arbalète précise', type:'left_arm', level:23, price:1600, image:'images/items/left_arm/crossbow_best.png?1', image_mini:'images/items/left_arm/mini/crossbow_best.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[107] = {item_id:107, nshort:'arkebuse_rusty', name:'Arquebuse rouillée', type:'left_arm', level:18, price:684, image:'images/items/left_arm/arkebuse_rusty.png?1', image_mini:'images/items/left_arm/mini/arkebuse_rusty.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[108] = {item_id:108, nshort:'arkebuse_normal', name:'Arquebuse', type:'left_arm', level:30, price:1070, image:'images/items/left_arm/arkebuse_normal.png?1', image_mini:'images/items/left_arm/mini/arkebuse_normal.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[109] = {item_id:109, nshort:'arkebuse_best', name:'Arquebuse précise', type:'left_arm', level:33, price:2444, image:'images/items/left_arm/arkebuse_best.png?1', image_mini:'images/items/left_arm/mini/arkebuse_best.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[110] = {item_id:110, nshort:'blunderbuss_rusty', name:'Carabine rouillée', type:'left_arm', level:20, price:775, image:'images/items/left_arm/blunderbuss_rusty.png?1', image_mini:'images/items/left_arm/mini/blunderbuss_rusty.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[111] = {item_id:111, nshort:'blunderbuss_normal', name:'Carabine', type:'left_arm', level:35, price:1300, image:'images/items/left_arm/blunderbuss_normal.png?1', image_mini:'images/items/left_arm/mini/blunderbuss_normal.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[112] = {item_id:112, nshort:'blunderbuss_best', name:'Carabine précise', type:'left_arm', level:38, price:2950, image:'images/items/left_arm/blunderbuss_best.png?1', image_mini:'images/items/left_arm/mini/blunderbuss_best.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[113] = {item_id:113, nshort:'musket_rusty', name:'Mousquet rouillé', type:'left_arm', level:25, price:920, image:'images/items/left_arm/musket_rusty.png?1', image_mini:'images/items/left_arm/mini/musket_rusty.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[114] = {item_id:114, nshort:'musket_normal', name:'Mousquet ', type:'left_arm', level:40, price:1580, image:'images/items/left_arm/musket_normal.png?1', image_mini:'images/items/left_arm/mini/musket_normal.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[115] = {item_id:115, nshort:'musket_best', name:'Mousquet précis', type:'left_arm', level:43, price:3850, image:'images/items/left_arm/musket_best.png?1', image_mini:'images/items/left_arm/mini/musket_best.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[116] = {item_id:116, nshort:'flint_rusty', name:'Fusil à grenaille rouillé', type:'left_arm', level:35, price:1350, image:'images/items/left_arm/flint_rusty.png?1', image_mini:'images/items/left_arm/mini/flint_rusty.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[117] = {item_id:117, nshort:'flint_normal', name:'Fusil à grenaille', type:'left_arm', level:50, price:2440, image:'images/items/left_arm/flint_normal.png?1', image_mini:'images/items/left_arm/mini/flint_normal.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[118] = {item_id:118, nshort:'flint_best', name:'Fusil à grenaille précis', type:'left_arm', level:53, price:6300, image:'images/items/left_arm/flint_best.png?1', image_mini:'images/items/left_arm/mini/flint_best.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[119] = {item_id:119, nshort:'shotgun_rusty', name:'Fusil de chasse rouillé', type:'left_arm', level:40, price:1600, image:'images/items/left_arm/shotgun_rusty.png?1', image_mini:'images/items/left_arm/mini/shotgun_rusty.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[120] = {item_id:120, nshort:'shotgun_normal', name:'Fusil de chasse', type:'left_arm', level:55, price:3000, image:'images/items/left_arm/shotgun_normal.png?1', image_mini:'images/items/left_arm/mini/shotgun_normal.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[121] = {item_id:121, nshort:'shotgun_best', name:'Fusil de chasse précis', type:'left_arm', level:58, price:7000, image:'images/items/left_arm/shotgun_best.png?1', image_mini:'images/items/left_arm/mini/shotgun_best.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[122] = {item_id:122, nshort:'percussion_rusty', name:'Fusil à percussion rouillé', type:'left_arm', level:45, price:2000, image:'images/items/left_arm/percussion_rusty.png?1', image_mini:'images/items/left_arm/mini/percussion_rusty.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[123] = {item_id:123, nshort:'percussion_normal', name:'Fusil à percussion', type:'left_arm', level:60, price:3800, image:'images/items/left_arm/percussion_normal.png?1', image_mini:'images/items/left_arm/mini/percussion_normal.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[124] = {item_id:124, nshort:'percussion_best', name:'Fusil à percussion précis', type:'left_arm', level:63, price:8800, image:'images/items/left_arm/percussion_best.png?1', image_mini:'images/items/left_arm/mini/percussion_best.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[125] = {item_id:125, nshort:'breechloader_rusty', name:'Culasse rouillée', type:'left_arm', level:55, price:3150, image:'images/items/left_arm/breechloader_rusty.png?1', image_mini:'images/items/left_arm/mini/breechloader_rusty.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[126] = {item_id:126, nshort:'breechloader_normal', name:'Culasse', type:'left_arm', level:70, price:6000, image:'images/items/left_arm/breechloader_normal.png?1', image_mini:'images/items/left_arm/mini/breechloader_normal.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[127] = {item_id:127, nshort:'breechloader_best', name:'Culasse précise', type:'left_arm', level:73, price:12600, image:'images/items/left_arm/breechloader_best.png?1', image_mini:'images/items/left_arm/mini/breechloader_best.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[128] = {item_id:128, nshort:'winchester_rusty', name:'Winchester rouillée', type:'left_arm', level:60, price:3900, image:'images/items/left_arm/winchester_rusty.png?1', image_mini:'images/items/left_arm/mini/winchester_rusty.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[129] = {item_id:129, nshort:'winchester_normal', name:'Winchester', type:'left_arm', level:75, price:7600, image:'images/items/left_arm/winchester_normal.png?1', image_mini:'images/items/left_arm/mini/winchester_normal.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[130] = {item_id:130, nshort:'winchester_best', name:'Winchester précise', type:'left_arm', level:78, price:15400, image:'images/items/left_arm/winchester_best.png?1', image_mini:'images/items/left_arm/mini/winchester_best.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[131] = {item_id:131, nshort:'gatling', name:'Gatling', type:'left_arm', level:85, price:30000, image:'images/items/left_arm/gatling.png?1', image_mini:'images/items/left_arm/mini/gatling.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[132] = {item_id:132, nshort:'bear', name:'Ours', type:'left_arm', level:45, price:2600, image:'images/items/left_arm/bear.png?1', image_mini:'images/items/left_arm/mini/bear.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:'set_sleeper', name:'Grincheux'}, shop:'shop'};\
items[133] = {item_id:133, nshort:'muzzleloader_bowie', name:'Fusil à baguette de Bowie', type:'left_arm', level:30, price:1480, image:'images/items/left_arm/muzzleloader_bowie.png?1', image_mini:'images/items/left_arm/mini/muzzleloader_bowie.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[134] = {item_id:134, nshort:'golden_rifle', name:'Imitation d\\'un fusil en or', type:'left_arm', level:75, price:11480, image:'images/items/left_arm/golden_rifle.png?1', image_mini:'images/items/left_arm/mini/golden_rifle.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[135] = {item_id:135, nshort:'elephantgun', name:'Fusil à éléphants', type:'left_arm', level:40, price:12480, image:'images/items/left_arm/elephantgun.png?1', image_mini:'images/items/left_arm/mini/elephantgun.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[136] = {item_id:136, nshort:'golden_rifle', name:'Fusil en or', type:'left_arm', level:75, price:65480, image:'images/items/left_arm/golden_rifle.png?1', image_mini:'images/items/left_arm/mini/golden_rifle.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{charisma:2, dexterity:2, flexibility:2, strength:2}}, set:{key:'gold_set', name:'Set en or'}, shop:'shop'};\
items[137] = {item_id:137, nshort:'deathsythe', name:'Faux de la Mort', type:'left_arm', level:50, price:17400, image:'images/items/left_arm/deathsythe.png?1', image_mini:'images/items/left_arm/mini/deathsythe.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{charisma:1, dexterity:1, flexibility:1, strength:1}}, set:{key:'season_set', name:'Set spécial pour les fêtes'}, shop:'shop'};\
\n\
\n\
items[200] = {item_id:200, nshort:'band_red', name:'Bandeau rouge', type:'head', level:1, price:4, image:'images/items/head/band_red.png?1', image_mini:'images/items/head/mini/band_red.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{trade:1, tough:1}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[201] = {item_id:201, nshort:'band_green', name:'Bandeau vert', type:'head', level:2, price:4, image:'images/items/head/band_green.png?1', image_mini:'images/items/head/mini/band_green.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{trade:1, dodge:1}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[202] = {item_id:202, nshort:'band_blue', name:'Bandeau bleu', type:'head', level:2, price:4, image:'images/items/head/band_blue.png?1', image_mini:'images/items/head/mini/band_blue.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{trade:1, finger_dexterity:1}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[203] = {item_id:203, nshort:'band_yellow', name:'Bandeau jaune', type:'head', level:2, price:4, image:'images/items/head/band_yellow.png?1', image_mini:'images/items/head/mini/band_yellow.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{trade:2}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[204] = {item_id:204, nshort:'band_brown', name:'Bandeau marron', type:'head', level:3, price:18, image:'images/items/head/band_brown.png?1', image_mini:'images/items/head/mini/band_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{trade:1, health:2, swim:1}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[205] = {item_id:205, nshort:'band_black', name:'Bandeau noir', type:'head', level:3, price:18, image:'images/items/head/band_black.png?1', image_mini:'images/items/head/mini/band_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{trade:2, repair:2}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[206] = {item_id:206, nshort:'slouch_cap_grey', name:'Casquette grise', type:'head', level:3, price:46, image:'images/items/head/slouch_cap_grey.png?1', image_mini:'images/items/head/mini/slouch_cap_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tough:5}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[207] = {item_id:207, nshort:'slouch_cap_brown', name:'Casquette marron', type:'head', level:5, price:112, image:'images/items/head/slouch_cap_brown.png?1', image_mini:'images/items/head/mini/slouch_cap_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tough:6, ride:3}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[208] = {item_id:208, nshort:'slouch_cap_black', name:'Casquette noire', type:'head', level:5, price:112, image:'images/items/head/slouch_cap_black.png?1', image_mini:'images/items/head/mini/slouch_cap_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tough:3, pitfall:3, leadership:3}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[209] = {item_id:209, nshort:'slouch_cap_fine', name:'Casquette noble', type:'head', level:6, price:520, image:'images/items/head/slouch_cap_fine.png?1', image_mini:'images/items/head/mini/slouch_cap_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tough:6, aim:4, tactic:4, reflex:4}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[210] = {item_id:210, nshort:'cap_grey', name:'Bonnet gris', type:'head', level:4, price:90, image:'images/items/head/cap_grey.png?1', image_mini:'images/items/head/mini/cap_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{swim:8}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[211] = {item_id:211, nshort:'cap_red', name:'Bonnet rouge', type:'head', level:5, price:175, image:'images/items/head/cap_red.png?1', image_mini:'images/items/head/mini/cap_red.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{swim:6, endurance:5}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[212] = {item_id:212, nshort:'cap_green', name:'Bonnet vert', type:'head', level:5, price:175, image:'images/items/head/cap_green.png?1', image_mini:'images/items/head/mini/cap_green.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{swim:6}, attributes:{flexibility:1}}, set:{key:null, name:null}, shop:'shop'};\n\
items[213] = {item_id:213, nshort:'cap_blue', name:'Bonnet bleu', type:'head', level:5, price:175, image:'images/items/head/cap_blue.png?1', image_mini:'images/items/head/mini/cap_blue.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{swim:6, pitfall:5}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[214] = {item_id:214, nshort:'cap_yellow', name:'Bonnet jaune', type:'head', level:5, price:175, image:'images/items/head/cap_yellow.png?1', image_mini:'images/items/head/mini/cap_yellow.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{swim:6, appearance:5}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[215] = {item_id:215, nshort:'cap_brown', name:'Bonnet marron', type:'head', level:6, price:300, image:'images/items/head/cap_brown.png?1', image_mini:'images/items/head/mini/cap_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{swim:10, tough:4}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[216] = {item_id:216, nshort:'cap_black', name:'Bonnet noir', type:'head', level:6, price:300, image:'images/items/head/cap_black.png?1', image_mini:'images/items/head/mini/cap_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{swim:6, tactic:4, finger_dexterity:4}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[217] = {item_id:217, nshort:'cap_fine', name:'Bonnet noble', type:'head', level:8, price:1100, image:'images/items/head/cap_fine.png?1', image_mini:'images/items/head/mini/cap_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{swim:10, shot:5, animal:5, tough:5}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[218] = {item_id:218, nshort:'slouch_hat_grey', name:'Chapeau à larges bords gris', type:'head', level:7, price:220, image:'images/items/head/slouch_hat_grey.png?1', image_mini:'images/items/head/mini/slouch_hat_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{pitfall:12}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[219] = {item_id:219, nshort:'slouch_hat_brown', name:'Chapeau à larges bords marron', type:'head', level:9, price:520, image:'images/items/head/slouch_hat_brown.png?1', image_mini:'images/items/head/mini/slouch_hat_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{pitfall:9, dodge:4, punch:5}, attributes:{}}, set:{key:'set_farmer', name:'Set de fermier'}, shop:'shop'};\n\
items[220] = {item_id:220, nshort:'slouch_hat_black', name:'Chapeau à larges bords noir', type:'head', level:9, price:520, image:'images/items/head/slouch_hat_black.png?1', image_mini:'images/items/head/mini/slouch_hat_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{pitfall:9, tactic:4}, attributes:{dexterity:1}}, set:{key:null, name:null}, shop:'shop'};\n\
items[221] = {item_id:221, nshort:'slouch_hat_fine', name:'Chapeau à larges bords noble', type:'head', level:12, price:1920, image:'images/items/head/slouch_hat_fine.png?1', image_mini:'images/items/head/mini/slouch_hat_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{pitfall:10, endurance:6, leadership:6, reflex:6}, attributes:{dexterity:1}}, set:{key:null, name:null}, shop:'shop'};\n\
items[222] = {item_id:222, nshort:'bowler_grey', name:'Chapeau melon gris', type:'head', level:10, price:420, image:'images/items/head/bowler_grey.png?1', image_mini:'images/items/head/mini/bowler_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{trade:11}, attributes:{charisma:1}}, set:{key:null, name:null}, shop:'shop'};\n\
items[223] = {item_id:223, nshort:'bowler_brown', name:'Chapeau melon marron', type:'head', level:12, price:808, image:'images/items/head/bowler_brown.png?1', image_mini:'images/items/head/mini/bowler_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{trade:11, build:6, reflex:5}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[224] = {item_id:224, nshort:'bowler_black', name:'Chapeau melon noir', type:'head', level:12, price:808, image:'images/items/head/bowler_black.png?1', image_mini:'images/items/head/mini/bowler_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{trade:11, shot:6}, attributes:{charisma:1}}, set:{key:'set_quackery', name:'Set de charlatan'}, shop:'shop'};\n\
items[225] = {item_id:225, nshort:'bowler_fine', name:'Chapeau melon noble', type:'head', level:15, price:1850, image:'images/items/head/bowler_fine.png?1', image_mini:'images/items/head/mini/bowler_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{trade:11, tough:6, repair:5, ride:5}, attributes:{charisma:1}}, set:{key:null, name:null}, shop:'shop'};\n\
items[226] = {item_id:226, nshort:'cloth_hat_grey', name:'Chapeau gris', type:'head', level:14, price:655, image:'images/items/head/cloth_hat_grey.png?1', image_mini:'images/items/head/mini/cloth_hat_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{health:10, aim:10}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[227] = {item_id:227, nshort:'cloth_hat_brown', name:'Chapeau marron', type:'head', level:20, price:1270, image:'images/items/head/cloth_hat_brown.png?1', image_mini:'images/items/head/mini/cloth_hat_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{health:13, aim:7, swim:7}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[228] = {item_id:228, nshort:'cloth_hat_black', name:'Chapeau noir', type:'head', level:20, price:1270, image:'images/items/head/cloth_hat_black.png?1', image_mini:'images/items/head/mini/cloth_hat_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:7, aim:13, health:7}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[229] = {item_id:229, nshort:'cloth_hat_fine', name:'Chapeau noble', type:'head', level:22, price:3900, image:'images/items/head/cloth_hat_fine.png?1', image_mini:'images/items/head/mini/cloth_hat_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{health:9, aim:9, dodge:8, tactic:8}, attributes:{strength:1, dexterity:1}}, set:{key:null, name:null}, shop:'shop'};\n\
items[230] = {item_id:230, nshort:'cylinder_grey', name:'Gibus gris', type:'head', level:18, price:1270, image:'images/items/head/cylinder_grey.png?1', image_mini:'images/items/head/mini/cylinder_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:14, finger_dexterity:13}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[231] = {item_id:231, nshort:'cylinder_red', name:'Gibus rouge', type:'head', level:24, price:1900, image:'images/items/head/cylinder_red.png?1', image_mini:'images/items/head/mini/cylinder_red.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{punch:8, leadership:10, finger_dexterity:9}, attributes:{strength:1}}, set:{key:null, name:null}, shop:'shop'};\n\
items[232] = {item_id:232, nshort:'cylinder_green', name:'Gibus vert', type:'head', level:24, price:1900, image:'images/items/head/cylinder_green.png?1', image_mini:'images/items/head/mini/cylinder_green.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{hide:8, leadership:10, finger_dexterity:9}, attributes:{flexibility:1}}, set:{key:null, name:null}, shop:'shop'};\n\
items[233] = {item_id:233, nshort:'cylinder_blue', name:'Gibus bleu', type:'head', level:24, price:1900, image:'images/items/head/cylinder_blue.png?1', image_mini:'images/items/head/mini/cylinder_blue.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:10, finger_dexterity:12}, attributes:{dexterity:2}}, set:{key:null, name:null}, shop:'shop'};\n\
items[234] = {item_id:234, nshort:'cylinder_yellow', name:'Gibus jaune', type:'head', level:24, price:1900, image:'images/items/head/cylinder_yellow.png?1', image_mini:'images/items/head/mini/cylinder_yellow.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:13, finger_dexterity:9}, attributes:{charisma:2}}, set:{key:null, name:null}, shop:'shop'};\n\
items[235] = {item_id:235, nshort:'cylinder_brown', name:'Gibus marron', type:'head', level:25, price:2700, image:'images/items/head/cylinder_brown.png?1', image_mini:'images/items/head/mini/cylinder_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:10, finger_dexterity:9, ride:9, health:8}, attributes:{}}, set:{key:'set_gentleman', name:'Set du gentleman'}, shop:'shop'};\n\
items[236] = {item_id:236, nshort:'cylinder_black', name:'Gibus noir', type:'head', level:25, price:2700, image:'images/items/head/cylinder_black.png?1', image_mini:'images/items/head/mini/cylinder_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:13, finger_dexterity:13}, attributes:{charisma:1, dexterity:1}}, set:{key:null, name:null}, shop:'shop'};\n\
items[237] = {item_id:237, nshort:'cylinder_fine', name:'Gibus de Lincoln', type:'head', level:27, price:5400, image:'images/items/head/cylinder_fine.png?1', image_mini:'images/items/head/mini/cylinder_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:13, finger_dexterity:12, ride:8, build:9}, attributes:{charisma:1, dexterity:1}}, set:{key:null, name:null}, shop:'shop'};\
items[238] = {item_id:238, nshort:'leather_hat_grey', name:'Chapeau gris en cuir ', type:'head', level:24, price:2000, image:'images/items/head/leather_hat_grey.png?1', image_mini:'images/items/head/mini/leather_hat_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{animal:11, reflex:12}, attributes:{charisma:1, flexibility:1}}, set:{key:null, name:null}, shop:'shop'};\
items[239] = {item_id:239, nshort:'leather_hat_brown', name:'Chapeau marron en cuir ', type:'head', level:28, price:3500, image:'images/items/head/leather_hat_brown.png?1', image_mini:'images/items/head/mini/leather_hat_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{animal:11, reflex:12, punch:10}, attributes:{flexibility:2}}, set:{key:null, name:null}, shop:'shop'};\
items[240] = {item_id:240, nshort:'leather_hat_black', name:'Chapeau noir en cuir ', type:'head', level:28, price:3500, image:'images/items/head/leather_hat_black.png?1', image_mini:'images/items/head/mini/leather_hat_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{reflex:12, animal:11, repair:10}, attributes:{charisma:2}}, set:{key:null, name:null}, shop:'shop'};\n\
items[241] = {item_id:241, nshort:'leather_hat_fine', name:'Chapeau noble en cuir ', type:'head', level:30, price:4100, image:'images/items/head/leather_hat_fine.png?1', image_mini:'images/items/head/mini/leather_hat_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{animal:14, aim:8, reflex:15, tough:9}, attributes:{charisma:1, flexibility:1}}, set:{key:null, name:null}, shop:'shop'};\
items[242] = {item_id:242, nshort:'stetson_grey', name:'Chapeau de cow-boy gris', type:'head', level:30, price:2555, image:'images/items/head/stetson_grey.png?1', image_mini:'images/items/head/mini/stetson_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{finger_dexterity:14, health:13}, attributes:{dexterity:1, strength:1}}, set:{key:null, name:null}, shop:'shop'};\n\
items[243] = {item_id:243, nshort:'stetson_brown', name:'Chapeau de cow-boy marron', type:'head', level:33, price:4500, image:'images/items/head/stetson_brown.png?1', image_mini:'images/items/head/mini/stetson_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{finger_dexterity:13, health:13, dodge:12}, attributes:{strength:2}}, set:{key:null, name:null}, shop:'shop'};\n\
items[244] = {item_id:244, nshort:'stetson_black', name:'Chapeau de cow-boy noir', type:'head', level:33, price:4500, image:'images/items/head/stetson_black.png?1', image_mini:'images/items/head/mini/stetson_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{finger_dexterity:13, health:13, leadership:12}, attributes:{dexterity:2}}, set:{key:null, name:null}, shop:'shop'};\n\
items[245] = {item_id:245, nshort:'stetson_fine', name:'Chapeau de cow-boy noble', type:'head', level:36, price:7100, image:'images/items/head/stetson_fine.png?1', image_mini:'images/items/head/mini/stetson_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{finger_dexterity:16, health:16, trade:9, swim:8}, attributes:{strength:1, dexterity:1}}, set:{key:null, name:null}, shop:'shop'};\n\
items[246] = {item_id:246, nshort:'xmas_hat', name:'Bonnet de Noël', type:'head', level:1, price:50, image:'images/items/head/xmas_hat.png?1', image_mini:'images/items/head/mini/xmas_hat.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\n\
items[247] = {item_id:247, nshort:'southcap', name:'Casquette d\\'armée', type:'head', level:20, price:800, image:'images/items/head/southcap.png?1', image_mini:'images/items/head/mini/southcap.png?1', characterClass:'soldier', characterSex:null, speed:null, bonus:{skills:{punch:11, pitfall:5}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\n\
items[248] = {item_id:248, nshort:'adventurerhat', name:'Chapeau d\\'aventurier', type:'head', level:22, price:2980, image:'images/items/head/adventurerhat.png?1', image_mini:'images/items/head/mini/adventurerhat.png?1', characterClass:'adventurer', characterSex:null, speed:null, bonus:{skills:{hide:6, ride:8, tough:10}, attributes:{dexterity:3}}, set:{key:null, name:null}, shop:'shop'};\
items[249] = {item_id:249, nshort:'fedora_black', name:'Chapeau de feutre noir', type:'head', level:22, price:1700, image:'images/items/head/fedora_black.png?1', image_mini:'images/items/head/mini/fedora_black.png?1', characterClass:'duelist', characterSex:null, speed:null, bonus:{skills:{shot:10, aim:6}, attributes:{charisma:3}}, set:{key:null, name:null}, shop:'quest'};\n\
items[250] = {item_id:250, nshort:'feather_hat_brown', name:'Chapeau marron avec une plume', type:'head', level:18, price:1460, image:'images/items/head/feather_hat_brown.png?1', image_mini:'images/items/head/mini/feather_hat_brown.png?1', characterClass:'worker', characterSex:null, speed:null, bonus:{skills:{dodge:5, reflex:4, endurance:3, tough:2}, attributes:{flexibility:3}}, set:{key:null, name:null}, shop:'shop'};\
\n\
\n\
items[253] = {item_id:253, nshort:'indian_hat', name:'Chapeau d\\'Indien marron avec plume', type:'head', level:51, price:3200, image:'images/items/head/indian_hat.png?1', image_mini:'images/items/head/mini/indian_hat.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:12, appearance:11}, attributes:{charisma:2}}, set:{key:'set_indian', name:'Set d\\'Indien'}, shop:'shop'};\n\
items[254] = {item_id:254, nshort:'mexican_sombrero', name:'Sombrero', type:'head', level:30, price:1270, image:'images/items/head/mexican_sombrero.png?1', image_mini:'images/items/head/mini/mexican_sombrero.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tough:10, health:6, shot:6}, attributes:{}}, set:{key:'set_mexican', name:'Set de Mexicain'}, shop:'shop'};\n\
\n\
items[256] = {item_id:256, nshort:'pilger_cap', name:'Casquette de pèlerine', type:'head', level:37, price:1270, image:'images/items/head/pilger_cap.png?1', image_mini:'images/items/head/mini/pilger_cap.png?1', characterClass:null, characterSex:'female', speed:null, bonus:{skills:{leadership:6, repair:6, endurance:10}, attributes:{}}, set:{key:'set_pilgrim_female', name:'Set de pèlerine'}, shop:'shop'};\items[257] = {item_id:257, nshort:'pilger_hat', name:'Chapeau de pèlerin', type:'head', level:37, price:1270, image:'images/items/head/pilger_hat.png?1', image_mini:'images/items/head/mini/pilger_hat.png?1', characterClass:null, characterSex:'male', speed:null, bonus:{skills:{trade:6, repair:6, health:10}, attributes:{}}, set:{key:'set_pilgrim_male', name:'Set de pèlerin'}, shop:'shop'};\
items[258] = {item_id:258, nshort:'cylinder_xmas', name:'Chapeau de bonhomme de neige', type:'head', level:30, price:2412, image:'images/items/head/cylinder_xmas.png?1', image_mini:'images/items/head/mini/cylinder_xmas.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{charisma:2, dexterity:2, flexibility:2, strength:2}}, set:{key:'season_set', name:'Set spécial pour les fêtes'}, shop:'shop'};\
items[259] = {item_id:259, nshort:'dancer_hat', name:'Plume', type:'head', level:42, price:2500, image:'images/items/head/dancer_hat.png?1', image_mini:'images/items/head/mini/dancer_hat.png?1', characterClass:null, characterSex:'female', speed:null, bonus:{skills:{pitfall:8, tactic:10, aim:9}, attributes:{flexibility:1}}, set:{key:'set_dancer', name:'Set de danseuse'}, shop:'shop'};\n\
\n\
items[261] = {item_id:261, nshort:'sleep_cap', name:'Bonnet de nuit', type:'head', level:45, price:1200, image:'images/items/head/sleep_cap.png?1', image_mini:'images/items/head/mini/sleep_cap.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:'set_sleeper', name:'Grincheux'}, shop:'shop'};\n\
items[262] = {item_id:262, nshort:'greenhorn_hat', name:'Chapeau trouvé', type:'head', level:4, price:515, image:'images/items/head/greenhorn_hat.png?1', image_mini:'images/items/head/mini/greenhorn_hat.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{trade:3, tactic:3, pitfall:2}, attributes:{flexibility:1}}, set:{key:'greenhorn_set', name:'Set du blanc-bec'}, shop:'shop'};\
\n\
\n\
items[299] = {item_id:299, nshort:'band_grey', name:'Bandeau gris', type:'head', level:1, price:2, image:'images/items/head/band_grey.png?1', image_mini:'images/items/head/mini/band_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{trade:1}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[300] = {item_id:300, nshort:'tatter_grey', name:'Chiffons gris', type:'body', level:1, price:2, image:'images/items/body/tatter_grey.png?1', image_mini:'images/items/body/mini/tatter_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{pitfall:1}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[301] = {item_id:301, nshort:'tatter_red', name:'Chiffons rouges', type:'body', level:1, price:12, image:'images/items/body/tatter_red.png?1', image_mini:'images/items/body/mini/tatter_red.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{pitfall:1, build:2}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[302] = {item_id:302, nshort:'tatter_green', name:'Chiffons verts', type:'body', level:1, price:12, image:'images/items/body/tatter_green.png?1', image_mini:'images/items/body/mini/tatter_green.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{pitfall:1, ride:2}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[303] = {item_id:303, nshort:'tatter_blue', name:'Chiffons bleus', type:'body', level:1, price:12, image:'images/items/body/tatter_blue.png?1', image_mini:'images/items/body/mini/tatter_blue.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{pitfall:3}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[304] = {item_id:304, nshort:'tatter_yellow', name:'Chiffons jaunes', type:'body', level:1, price:12, image:'images/items/body/tatter_yellow.png?1', image_mini:'images/items/body/mini/tatter_yellow.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{pitfall:1, leadership:2}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[305] = {item_id:305, nshort:'tatter_brown', name:'Chiffons marrons', type:'body', level:2, price:38, image:'images/items/body/tatter_brown.png?1', image_mini:'images/items/body/mini/tatter_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{pitfall:1, reflex:2, punch:2}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[306] = {item_id:306, nshort:'tatter_black', name:'Chiffons noirs', type:'body', level:2, price:38, image:'images/items/body/tatter_black.png?1', image_mini:'images/items/body/mini/tatter_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{pitfall:3, tactic:2}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[307] = {item_id:307, nshort:'poncho_grey', name:'Poncho gris', type:'body', level:3, price:38, image:'images/items/body/poncho_grey.png?1', image_mini:'images/items/body/mini/poncho_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{dodge:5}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[308] = {item_id:308, nshort:'poncho_red', name:'Poncho rouge', type:'body', level:4, price:80, image:'images/items/body/poncho_red.png?1', image_mini:'images/items/body/mini/poncho_red.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{dodge:3, tough:4}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[309] = {item_id:309, nshort:'poncho_green', name:'Poncho vert', type:'body', level:4, price:80, image:'images/items/body/poncho_green.png?1', image_mini:'images/items/body/mini/poncho_green.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{dodge:7}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[310] = {item_id:310, nshort:'poncho_blue', name:'Poncho bleu', type:'body', level:4, price:80, image:'images/items/body/poncho_blue.png?1', image_mini:'images/items/body/mini/poncho_blue.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{dodge:3, aim:4}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[311] = {item_id:311, nshort:'poncho_yellow', name:'Poncho jaune', type:'body', level:4, price:80, image:'images/items/body/poncho_yellow.png?1', image_mini:'images/items/body/mini/poncho_yellow.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{dodge:3, trade:4}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[312] = {item_id:312, nshort:'poncho_brown', name:'Poncho marron', type:'body', level:5, price:174, image:'images/items/body/poncho_brown.png?1', image_mini:'images/items/body/mini/poncho_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{dodge:6, endurance:4}, attributes:{}}, set:{key:'set_mexican', name:'Set de Mexicain'}, shop:'shop'};\n\
items[313] = {item_id:313, nshort:'poncho_black', name:'Poncho noir', type:'body', level:5, price:174, image:'images/items/body/poncho_black.png?1', image_mini:'images/items/body/mini/poncho_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{dodge:3, animal:4, shot:3}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[314] = {item_id:314, nshort:'poncho_fine', name:'Poncho de Clint', type:'body', level:6, price:800, image:'images/items/body/poncho_fine.png?1', image_mini:'images/items/body/mini/poncho_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:4, pitfall:4, dodge:7, build:5}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\items[315] = {item_id:315, nshort:'clothes_grey', name:'Vêtements gris', type:'body', level:7, price:138, image:'images/items/body/clothes_grey.png?1', image_mini:'images/items/body/mini/clothes_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:9}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[316] = {item_id:316, nshort:'clothes_red', name:'Vêtements rouges', type:'body', level:8, price:260, image:'images/items/body/clothes_red.png?1', image_mini:'images/items/body/mini/clothes_red.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:6, health:6}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[317] = {item_id:317, nshort:'clothes_green', name:'Vêtements verts', type:'body', level:14, price:260, image:'images/items/body/clothes_green.png?1', image_mini:'images/items/body/mini/clothes_green.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:6, hide:6}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[318] = {item_id:318, nshort:'clothes_blue', name:'Vêtements bleus', type:'body', level:8, price:260, image:'images/items/body/clothes_blue.png?1', image_mini:'images/items/body/mini/clothes_blue.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:6, finger_dexterity:6}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[319] = {item_id:319, nshort:'clothes_yellow', name:'Vêtements jaunes', type:'body', level:8, price:260, image:'images/items/body/clothes_yellow.png?1', image_mini:'images/items/body/mini/clothes_yellow.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:7}, attributes:{charisma:1}}, set:{key:null, name:null}, shop:'shop'};\n\
items[320] = {item_id:320, nshort:'clothes_brown', name:'Vêtements marrons', type:'body', level:8, price:425, image:'images/items/body/clothes_brown.png?1', image_mini:'images/items/body/mini/clothes_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:6, swim:5, build:4}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[321] = {item_id:321, nshort:'clothes_black', name:'Vêtements noirs', type:'body', level:8, price:425, image:'images/items/body/clothes_black.png?1', image_mini:'images/items/body/mini/clothes_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:10, repair:5}, attributes:{}}, set:{key:'set_farmer', name:'Set de fermier'}, shop:'shop'};\
items[322] = {item_id:322, nshort:'clothes_fine', name:'Costume du dimanche', type:'body', level:10, price:1650, image:'images/items/body/clothes_fine.png?1', image_mini:'images/items/body/mini/clothes_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:6, endurance:6, reflex:6, finger_dexterity:5}, attributes:{charisma:1}}, set:{key:null, name:null}, shop:'shop'};\n\
items[323] = {item_id:323, nshort:'shirt_grey', name:'Chemise grise', type:'body', level:12, price:310, image:'images/items/body/shirt_grey.png?1', image_mini:'images/items/body/mini/shirt_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:13}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[324] = {item_id:324, nshort:'shirt_red', name:'Chemise rouge', type:'body', level:13, price:560, image:'images/items/body/shirt_red.png?1', image_mini:'images/items/body/mini/shirt_red.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:9, health:8}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[325] = {item_id:325, nshort:'shirt_green', name:'Chemise verte', type:'body', level:13, price:560, image:'images/items/body/shirt_green.png?1', image_mini:'images/items/body/mini/shirt_green.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:9, ride:8}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[326] = {item_id:326, nshort:'shirt_blue', name:'Chemise bleue', type:'body', level:13, price:560, image:'images/items/body/shirt_blue.png?1', image_mini:'images/items/body/mini/shirt_blue.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:9, aim:8}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[327] = {item_id:327, nshort:'shirt_yellow', name:'Chemise jaune', type:'body', level:13, price:560, image:'images/items/body/shirt_yellow.png?1', image_mini:'images/items/body/mini/shirt_yellow.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:13}, attributes:{charisma:1}}, set:{key:null, name:null}, shop:'shop'};\n\
items[328] = {item_id:328, nshort:'shirt_brown', name:'Chemise marron', type:'body', level:14, price:800, image:'images/items/body/shirt_brown.png?1', image_mini:'images/items/body/mini/shirt_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:9, reflex:6, endurance:5}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[329] = {item_id:329, nshort:'shirt_black', name:'Chemise noire', type:'body', level:14, price:800, image:'images/items/body/shirt_black.png?1', image_mini:'images/items/body/mini/shirt_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:9, pitfall:6}, attributes:{charisma:1}}, set:{key:null, name:null}, shop:'shop'};\n\
items[330] = {item_id:330, nshort:'shirt_fine', name:'Chemise noble', type:'body', level:15, price:1305, image:'images/items/body/shirt_fine.png?1', image_mini:'images/items/body/mini/shirt_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:10, shot:7, ride:7, punch:6}, attributes:{charisma:1}}, set:{key:null, name:null}, shop:'shop'};\n\
items[331] = {item_id:331, nshort:'plaid_shirt_grey', name:'Chemise grise à carreaux ', type:'body', level:15, price:560, image:'images/items/body/plaid_shirt_grey.png?1', image_mini:'images/items/body/mini/plaid_shirt_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{punch:12}, attributes:{strength:1}}, set:{key:null, name:null}, shop:'shop'};\
items[332] = {item_id:332, nshort:'plaid_shirt_red', name:'Chemise rouge à carreaux ', type:'body', level:16, price:800, image:'images/items/body/plaid_shirt_red.png?1', image_mini:'images/items/body/mini/plaid_shirt_red.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{punch:15}, attributes:{strength:1}}, set:{key:null, name:null}, shop:'shop'};\
items[333] = {item_id:333, nshort:'plaid_shirt_green', name:'Chemise verte à carreaux ', type:'body', level:16, price:800, image:'images/items/body/plaid_shirt_green.png?1', image_mini:'images/items/body/mini/plaid_shirt_green.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{swim:9, punch:11}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[333] = {item_id:333, nshort:'plaid_shirt_green', name:'Chemise verte à carreaux ', type:'body', level:16, price:800, image:'images/items/body/plaid_shirt_green.png?1', image_mini:'images/items/body/mini/plaid_shirt_green.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{swim:9, punch:11}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[334] = {item_id:334, nshort:'plaid_shirt_blue', name:'Chemise bleue à carreaux ', type:'body', level:16, price:800, image:'images/items/body/plaid_shirt_blue.png?1', image_mini:'images/items/body/mini/plaid_shirt_blue.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{shot:9, punch:11}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[335] = {item_id:335, nshort:'plaid_shirt_yellow', name:'Chemise jaune à carreaux ', type:'body', level:16, price:800, image:'images/items/body/plaid_shirt_yellow.png?1', image_mini:'images/items/body/mini/plaid_shirt_yellow.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:9, punch:11}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[336] = {item_id:336, nshort:'plaid_shirt_brown', name:'Chemise marron à carreaux ', type:'body', level:17, price:1200, image:'images/items/body/plaid_shirt_brown.png?1', image_mini:'images/items/body/mini/plaid_shirt_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{ride:7, punch:12}, attributes:{strength:1}}, set:{key:null, name:null}, shop:'shop'};\
items[337] = {item_id:337, nshort:'plaid_shirt_black', name:'Chemise noire à carreaux ', type:'body', level:17, price:1200, image:'images/items/body/plaid_shirt_black.png?1', image_mini:'images/items/body/mini/plaid_shirt_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:7, repair:6, punch:11}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[338] = {item_id:338, nshort:'plaid_shirt_fine', name:'Chemise de bûcheron', type:'body', level:19, price:3900, image:'images/items/body/plaid_shirt_fine.png?1', image_mini:'images/items/body/mini/plaid_shirt_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{punch:13, animal:8, hide:8, pitfall:7}, attributes:{strength:1}}, set:{key:null, name:null}, shop:'shop'};\n\
items[339] = {item_id:339, nshort:'vest_grey', name:'Gilet gris', type:'body', level:16, price:900, image:'images/items/body/vest_grey.png?1', image_mini:'images/items/body/mini/vest_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{reflex:11, shot:10}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[340] = {item_id:340, nshort:'vest_brown', name:'Gilet marron', type:'body', level:20, price:1800, image:'images/items/body/vest_brown.png?1', image_mini:'images/items/body/mini/vest_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{reflex:9, shot:7, health:8}, attributes:{flexibility:1}}, set:{key:'set_quackery', name:'Set de charlatan'}, shop:'shop'};\n\
items[341] = {item_id:341, nshort:'vest_black', name:'Gilet noir', type:'body', level:20, price:1800, image:'images/items/body/vest_black.png?1', image_mini:'images/items/body/mini/vest_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{reflex:7, shot:9, leadership:8}, attributes:{dexterity:1}}, set:{key:null, name:null}, shop:'shop'};\n\
items[342] = {item_id:342, nshort:'vest_fine', name:'Gilet noble', type:'body', level:20, price:5200, image:'images/items/body/vest_fine.png?1', image_mini:'images/items/body/mini/vest_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{reflex:10, shot:10, endurance:9, trade:8}, attributes:{dexterity:1, flexibility:1}}, set:{key:null, name:null}, shop:'shop'};\n\
items[343] = {item_id:343, nshort:'coat_grey', name:'Blouson gris', type:'body', level:20, price:1300, image:'images/items/body/coat_grey.png?1', image_mini:'images/items/body/mini/coat_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{build:13, pitfall:12}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[344] = {item_id:344, nshort:'coat_red', name:'Blouson rouge', type:'body', level:20, price:2000, image:'images/items/body/coat_red.png?1', image_mini:'images/items/body/mini/coat_red.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{build:12, pitfall:8}, attributes:{strength:2}}, set:{key:null, name:null}, shop:'shop'};\n\
items[345] = {item_id:345, nshort:'coat_green', name:'Blouson vert', type:'body', level:20, price:2000, image:'images/items/body/coat_green.png?1', image_mini:'images/items/body/mini/coat_green.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{build:9, pitfall:8, hide:8}, attributes:{flexibility:1}}, set:{key:null, name:null}, shop:'shop'};\n\
items[346] = {item_id:346, nshort:'coat_blue', name:'Blouson bleu', type:'body', level:20, price:2000, image:'images/items/body/coat_blue.png?1', image_mini:'images/items/body/mini/coat_blue.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{build:9, pitfall:11}, attributes:{dexterity:2}}, set:{key:null, name:null}, shop:'shop'};\n\
items[347] = {item_id:347, nshort:'coat_yellow', name:'Blouson jaune', type:'body', level:20, price:2000, image:'images/items/body/coat_yellow.png?1', image_mini:'images/items/body/mini/coat_yellow.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{build:9, pitfall:8, leadership:8}, attributes:{charisma:1}}, set:{key:null, name:null}, shop:'shop'};\n\
items[348] = {item_id:348, nshort:'coat_brown', name:'Blouson marron', type:'body', level:21, price:2500, image:'images/items/body/coat_brown.png?1', image_mini:'images/items/body/mini/coat_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{build:12, pitfall:8, swim:9}, attributes:{strength:1}}, set:{key:null, name:null}, shop:'shop'};\n\
items[349] = {item_id:349, nshort:'coat_black', name:'Blouson noir', type:'body', level:21, price:2500, image:'images/items/body/coat_black.png?1', image_mini:'images/items/body/mini/coat_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{build:9, pitfall:11, animal:9}, attributes:{dexterity:1}}, set:{key:null, name:null}, shop:'shop'};\n\
items[350] = {item_id:350, nshort:'coat_fine', name:'Blouson noble', type:'body', level:22, price:6300, image:'images/items/body/coat_fine.png?1', image_mini:'images/items/body/mini/coat_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{build:12, pitfall:11, appearance:9, dodge:9}, attributes:{strength:1, dexterity:1}}, set:{key:null, name:null}, shop:'shop'};\n\
items[351] = {item_id:351, nshort:'jacket_grey', name:'Veste grise', type:'body', level:20, price:1850, image:'images/items/body/jacket_grey.png?1', image_mini:'images/items/body/mini/jacket_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{trade:10, reflex:9}, attributes:{charisma:1, flexibility:1}}, set:{key:null, name:null}, shop:'shop'};\n\
items[352] = {item_id:352, nshort:'jacket_brown', name:'Veste marron', type:'body', level:25, price:3500, image:'images/items/body/jacket_brown.png?1', image_mini:'images/items/body/mini/jacket_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{trade:10, reflex:9, tough:10}, attributes:{flexibility:2}}, set:{key:null, name:null}, shop:'shop'};\n\
items[353] = {item_id:353, nshort:'jacket_black', name:'Veste noire', type:'body', level:25, price:3500, image:'images/items/body/jacket_black.png?1', image_mini:'images/items/body/mini/jacket_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{trade:10, reflex:9, aim:10}, attributes:{charisma:2}}, set:{key:null, name:null}, shop:'shop'};\n\
items[354] = {item_id:354, nshort:'jacket_fine', name:'Veste noble', type:'body', level:27, price:7200, image:'images/items/body/jacket_fine.png?1', image_mini:'images/items/body/mini/jacket_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{trade:13, reflex:13, punch:9, aim:9}, attributes:{charisma:1, flexibility:1}}, set:{key:'set_gentleman', name:'Set du gentleman'}, shop:'shop'};\n\
items[355] = {item_id:355, nshort:'leather_coat_grey', name:'Veste grise en cuir ', type:'body', level:25, price:2700, image:'images/items/body/leather_coat_grey.png?1', image_mini:'images/items/body/mini/leather_coat_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tough:13, hide:12}, attributes:{strength:1, flexibility:1}}, set:{key:null, name:null}, shop:'shop'};\n\
items[356] = {item_id:356, nshort:'leather_coat_brown', name:'Veste marron en cuir ', type:'body', level:28, price:5000, image:'images/items/body/leather_coat_brown.png?1', image_mini:'images/items/body/mini/leather_coat_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tough:13, hide:13}, attributes:{strength:2, flexibility:2}}, set:{key:null, name:null}, shop:'shop'};\n\
items[357] = {item_id:357, nshort:'leather_coat_black', name:'Veste noire en cuir ', type:'body', level:28, price:5000, image:'images/items/body/leather_coat_black.png?1', image_mini:'images/items/body/mini/leather_coat_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tough:12, hide:11, repair:12, leadership:11}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[358] = {item_id:358, nshort:'leather_coat_fine', name:'Veste noble en cuir ', type:'body', level:30, price:9000, image:'images/items/body/leather_coat_fine.png?1', image_mini:'images/items/body/mini/leather_coat_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tough:16, hide:15, finger_dexterity:9, appearance:10}, attributes:{strength:1, flexibility:1}}, set:{key:null, name:null}, shop:'shop'};\n\
items[359] = {item_id:359, nshort:'greatcoat_grey', name:'Manteau gris', type:'body', level:33, price:3500, image:'images/items/body/greatcoat_grey.png?1', image_mini:'images/items/body/mini/greatcoat_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:15, shot:14}, attributes:{charisma:1, dexterity:1}}, set:{key:null, name:null}, shop:'shop'};\n\
items[360] = {item_id:360, nshort:'greatcoat_brown', name:'Manteau marron', type:'body', level:40, price:6280, image:'images/items/body/greatcoat_brown.png?1', image_mini:'images/items/body/mini/greatcoat_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:13, shot:13, ride:13, health:12}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[361] = {item_id:361, nshort:'greatcoat_fine', name:'Manteau noble', type:'body', level:45, price:9500, image:'images/items/body/greatcoat_fine.png?1', image_mini:'images/items/body/mini/greatcoat_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:17, shot:16, endurance:9, ride:9}, attributes:{charisma:1, dexterity:1}}, set:{key:null, name:null}, shop:'shop'};\n\
items[362] = {item_id:362, nshort:'uniform', name:'Uniforme', type:'body', level:20, price:800, image:'images/items/body/uniform.png?1', image_mini:'images/items/body/mini/uniform.png?1', characterClass:'soldier', characterSex:null, speed:null, bonus:{skills:{hide:4, appearance:2}, attributes:{charisma:2}}, set:{key:null, name:null}, shop:'quest'};\n\
items[363] = {item_id:363, nshort:'uniform_burned', name:'Uniforme brûlés', type:'body', level:20, price:80, image:'images/items/body/uniform_burned.png?1', image_mini:'images/items/body/mini/uniform_burned.png?1', characterClass:'soldier', characterSex:null, speed:null, bonus:{skills:{appearance:-2, hide:4}, attributes:{charisma:2}}, set:{key:null, name:null}, shop:'quest'};\n\
items[364] = {item_id:364, nshort:'greatcoat_black', name:'Manteau noir', type:'body', level:40, price:6280, image:'images/items/body/greatcoat_black.png?1', image_mini:'images/items/body/mini/greatcoat_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:16, shot:15}, attributes:{charisma:2, dexterity:2}}, set:{key:null, name:null}, shop:'shop'};\n\
items[365] = {item_id:365, nshort:'adventurerjacket', name:'Blouson d\\'aventurier', type:'body', level:40, price:1100, image:'images/items/body/adventurerjacket.png?1', image_mini:'images/items/body/mini/adventurerjacket.png?1', characterClass:'adventurer', characterSex:null, speed:null, bonus:{skills:{hide:4, ride:10, tough:9}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[366] = {item_id:366, nshort:'vest_leather_brown', name:'Gilet marron en cuir ', type:'body', level:14, price:800, image:'images/items/body/vest_leather_brown.png?1', image_mini:'images/items/body/mini/vest_leather_brown.png?1', characterClass:'duelist', characterSex:null, speed:null, bonus:{skills:{dodge:8, reflex:7, punch:5}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[367] = {item_id:367, nshort:'shirt_canvas', name:'Chemise en lin', type:'body', level:8, price:425, image:'images/items/body/shirt_canvas.png?1', image_mini:'images/items/body/mini/shirt_canvas.png?1', characterClass:'worker', characterSex:null, speed:null, bonus:{skills:{animal:3, dodge:2}, attributes:{strength:2}}, set:{key:null, name:null}, shop:'shop'};\
items[368] = {item_id:368, nshort:'dancer_dress', name:'Robe de la danseuse', type:'body', level:45, price:7500, image:'images/items/body/dancer_dress.png?1', image_mini:'images/items/body/mini/dancer_dress.png?1', characterClass:null, characterSex:'female', speed:null, bonus:{skills:{animal:10, finger_dexterity:11, shot:8, endurance:8}, attributes:{charisma:2}}, set:{key:'set_dancer', name:'Set de danseuse'}, shop:'shop'};\
items[369] = {item_id:369, nshort:'indian_jacket', name:'Vêtements d\\'Indien', type:'body', level:55, price:7500, image:'images/items/body/indian_jacket.png?1', image_mini:'images/items/body/mini/indian_jacket.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{punch:8, hide:9, pitfall:8}, attributes:{dexterity:1, flexibility:2}}, set:{key:'set_indian', name:'Set d\\'Indien'}, shop:'shop'};\n\
\n\
\n\
items[372] = {item_id:372, nshort:'pilger_dress', name:'Robe de pèlerine', type:'body', level:38, price:2500, image:'images/items/body/pilger_dress.png?1', image_mini:'images/items/body/mini/pilger_dress.png?1', characterClass:null, characterSex:'female', speed:null, bonus:{skills:{dodge:10, build:8}, attributes:{strength:2}}, set:{key:'set_pilgrim_female', name:'Set de pèlerine'}, shop:'shop'};\
items[373] = {item_id:373, nshort:'pilger_jacket', name:'Chemise de pèlerin', type:'body', level:38, price:2500, image:'images/items/body/pilger_jacket.png?1', image_mini:'images/items/body/mini/pilger_jacket.png?1', characterClass:null, characterSex:'male', speed:null, bonus:{skills:{hide:10, build:8}, attributes:{dexterity:2}}, set:{key:'set_pilgrim_male', name:'Set de pèlerin'}, shop:'shop'};\n\
\n\
items[375] = {item_id:375, nshort:'night_shirt', name:'Chemise de nuit', type:'body', level:45, price:1500, image:'images/items/body/night_shirt.png?1', image_mini:'images/items/body/mini/night_shirt.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:'set_sleeper', name:'Grincheux'}, shop:'shop'};\
\n\
\n\
items[400] = {item_id:400, nshort:'ripped_shoes_grey', name:'Chaussures grises et usées', type:'foot', level:1, price:4, image:'images/items/foot/ripped_shoes_grey.png?1', image_mini:'images/items/foot/mini/ripped_shoes_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{repair:1}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[401] = {item_id:401, nshort:'ripped_shoes_brown', name:'Chaussures marrons et usées', type:'foot', level:3, price:30, image:'images/items/foot/ripped_shoes_brown.png?1', image_mini:'images/items/foot/mini/ripped_shoes_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{swim:4, build:4}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[402] = {item_id:402, nshort:'ripped_shoes_black', name:'Chaussures noires et usées', type:'foot', level:3, price:30, image:'images/items/foot/ripped_shoes_black.png?1', image_mini:'images/items/foot/mini/ripped_shoes_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{repair:4, leadership:4}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[403] = {item_id:403, nshort:'light_grey', name:'Chaussures grises en coton', type:'foot', level:5, price:70, image:'images/items/foot/light_grey.png?1', image_mini:'images/items/foot/mini/light_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{endurance:5}, attributes:{strength:1}}, set:{key:null, name:null}, shop:'shop'};\
items[404] = {item_id:404, nshort:'light_brown', name:'Chaussures marrons en coton', type:'foot', level:9, price:170, image:'images/items/foot/light_brown.png?1', image_mini:'images/items/foot/mini/light_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{hide:5, endurance:3}, attributes:{strength:1}}, set:{key:null, name:null}, shop:'shop'};\
items[405] = {item_id:405, nshort:'light_black', name:'Chaussures noires en coton', type:'foot', level:9, price:170, image:'images/items/foot/light_black.png?1', image_mini:'images/items/foot/mini/light_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{trade:5, shot:5, endurance:3}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[406] = {item_id:406, nshort:'light_fine', name:'Chaussures nobles en coton', type:'foot', level:11, price:1500, image:'images/items/foot/light_fine.png?1', image_mini:'images/items/foot/mini/light_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:6, pitfall:6, reflex:6, endurance:4}, attributes:{strength:1}}, set:{key:null, name:null}, shop:'shop'};\
items[407] = {item_id:407, nshort:'working_grey', name:'Chaussures de travail grises', type:'foot', level:9, price:660, image:'images/items/foot/working_grey.png?1', image_mini:'images/items/foot/mini/working_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{pitfall:12}, attributes:{dexterity:1}}, set:{key:null, name:null}, shop:'shop'};\n\
items[408] = {item_id:408, nshort:'working_brown', name:'Chaussures de travail marrons', type:'foot', level:13, price:1200, image:'images/items/foot/working_brown.png?1', image_mini:'images/items/foot/mini/working_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{pitfall:8, endurance:7, ride:7}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[409] = {item_id:409, nshort:'working_black', name:'Chaussures de travail noires', type:'foot', level:13, price:1200, image:'images/items/foot/working_black.png?1', image_mini:'images/items/foot/mini/working_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:7, pitfall:10}, attributes:{dexterity:1}}, set:{key:'set_farmer', name:'Set de fermier'}, shop:'shop'};\
items[410] = {item_id:410, nshort:'working_fine', name:'Chaussures de travail nobles', type:'foot', level:15, price:4300, image:'images/items/foot/working_fine.png?1', image_mini:'images/items/foot/mini/working_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{pitfall:11, trade:8, dodge:8, punch:8}, attributes:{dexterity:1}}, set:{key:null, name:null}, shop:'shop'};\n\
items[411] = {item_id:411, nshort:'spur_grey', name:'Chaussures à pointes grises', type:'foot', level:14, price:1400, image:'images/items/foot/spur_grey.png?1', image_mini:'images/items/foot/mini/spur_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{animal:7, shot:7}, attributes:{charisma:1, dexterity:1}}, set:{key:null, name:null}, shop:'shop'};\
items[412] = {item_id:412, nshort:'spur_brown', name:'Chaussures à pointes marrons', type:'foot', level:17, price:2450, image:'images/items/foot/spur_brown.png?1', image_mini:'images/items/foot/mini/spur_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{animal:7, shot:6, reflex:9, tough:9}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[413] = {item_id:413, nshort:'spur_black', name:'Chaussures à pointes noires', type:'foot', level:17, price:2450, image:'images/items/foot/spur_black.png?1', image_mini:'images/items/foot/mini/spur_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{animal:10, shot:9}, attributes:{charisma:1, dexterity:1}}, set:{key:null, name:null}, shop:'shop'};\
items[414] = {item_id:414, nshort:'spur_fine', name:'Chaussures à pointes nobles', type:'foot', level:20, price:6230, image:'images/items/foot/spur_fine.png?1', image_mini:'images/items/foot/mini/spur_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{animal:11, shot:10, swim:8, health:8}, attributes:{charisma:1, dexterity:1}}, set:{key:null, name:null}, shop:'shop'};\
items[415] = {item_id:415, nshort:'boots_grey', name:'Bottes grises', type:'foot', level:16, price:3000, image:'images/items/foot/boots_grey.png?1', image_mini:'images/items/foot/mini/boots_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:12, shot:12}, attributes:{dexterity:1, charisma:1}}, set:{key:null, name:null}, shop:'shop'};\n\
items[416] = {item_id:416, nshort:'boots_brown', name:'Bottes marrons', type:'foot', level:20, price:5100, image:'images/items/foot/boots_brown.png?1', image_mini:'images/items/foot/mini/boots_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:10, shot:9, tough:12, dodge:12}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[417] = {item_id:417, nshort:'boots_black', name:'Bottes noires', type:'foot', level:20, price:5100, image:'images/items/foot/boots_black.png?1', image_mini:'images/items/foot/mini/boots_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:12, shot:11}, attributes:{dexterity:2, charisma:2}}, set:{key:null, name:null}, shop:'shop'};\n\
items[418] = {item_id:418, nshort:'boots_fine', name:'Bottes précieuses', type:'foot', level:22, price:8870, image:'images/items/foot/boots_fine.png?1', image_mini:'images/items/foot/mini/boots_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:10, shot:9, endurance:8, hide:8}, attributes:{dexterity:2, charisma:2}}, set:{key:null, name:null}, shop:'shop'};\n\
items[419] = {item_id:419, nshort:'rider_grey', name:'Bottes de cheval grises', type:'foot', level:30, price:2600, image:'images/items/foot/rider_grey.png?1', image_mini:'images/items/foot/mini/rider_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{ride:15, punch:14}, attributes:{flexibility:1, strength:1}}, set:{key:null, name:null}, shop:'shop'};\n\
items[420] = {item_id:420, nshort:'rider_brown', name:'Bottes de cheval marrons', type:'foot', level:33, price:6200, image:'images/items/foot/rider_brown.png?1', image_mini:'images/items/foot/mini/rider_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{ride:14, punch:13}, attributes:{flexibility:2, strength:2}}, set:{key:null, name:null}, shop:'shop'};\n\
items[421] = {item_id:421, nshort:'rider_black', name:'Bottes de cheval noires', type:'foot', level:33, price:6200, image:'images/items/foot/rider_black.png?1', image_mini:'images/items/foot/mini/rider_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{pitfall:13, animal:14}, attributes:{dexterity:2, charisma:2}}, set:{key:null, name:null}, shop:'shop'};\n\
items[422] = {item_id:422, nshort:'rider_fine', name:'Bottes de cheval nobles', type:'foot', level:35, price:9500, image:'images/items/foot/rider_fine.png?1', image_mini:'images/items/foot/mini/rider_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{ride:11, punch:10, appearance:8, aim:8}, attributes:{flexibility:2, strength:2}}, set:{key:null, name:null}, shop:'shop'};\n\
items[423] = {item_id:423, nshort:'soldier_boots', name:'Godillots', type:'foot', level:30, price:5500, image:'images/items/foot/soldier_boots.png?1', image_mini:'images/items/foot/mini/soldier_boots.png?1', characterClass:'soldier', characterSex:null, speed:null, bonus:{skills:{tactic:9, ride:12, health:12, tough:10}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\n\
\n\
items[425] = {item_id:425, nshort:'lace-up_shoes_brown', name:'Chaussures à lacets marrons', type:'foot', level:13, price:1290, image:'images/items/foot/lace-up_shoes_brown.png?1', image_mini:'images/items/foot/mini/lace-up_shoes_brown.png?1', characterClass:'duelist', characterSex:null, speed:null, bonus:{skills:{appearance:4, shot:4, aim:5}, attributes:{dexterity:2}}, set:{key:null, name:null}, shop:'quest'};\n\
items[426] = {item_id:426, nshort:'pilgrim_shoes_brown', name:'Chaussures de pèlerin marrons', type:'foot', level:15, price:1530, image:'images/items/foot/pilgrim_shoes_brown.png?1', image_mini:'images/items/foot/mini/pilgrim_shoes_brown.png?1', characterClass:'worker', characterSex:null, speed:null, bonus:{skills:{repair:6, punch:6, build:4}, attributes:{strength:2}}, set:{key:null, name:null}, shop:'quest'};\n\
items[427] = {item_id:427, nshort:'gentleman_shoes', name:'Chaussures nobles', type:'foot', level:45, price:5600, image:'images/items/foot/gentleman_shoes.png?1', image_mini:'images/items/foot/mini/gentleman_shoes.png?1', characterClass:null, characterSex:'male', speed:null, bonus:{skills:{appearance:8, reflex:9}, attributes:{dexterity:2, strength:2}}, set:{key:'set_gentleman', name:'Set du gentleman'}, shop:'shop'};\n\
items[428] = {item_id:428, nshort:'mexican_shoes', name:'Sandales', type:'foot', level:28, price:2650, image:'images/items/foot/mexican_shoes.png?1', image_mini:'images/items/foot/mini/mexican_shoes.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{animal:7, aim:6, dodge:8, health:8}, attributes:{}}, set:{key:'set_mexican', name:'Set de Mexicain'}, shop:'shop'};\n\
items[429] = {item_id:429, nshort:'mokassins', name:'Mocassins ', type:'foot', level:45, price:5600, image:'images/items/foot/mokassins.png?1', image_mini:'images/items/foot/mini/mokassins.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:9, endurance:9, hide:9}, attributes:{flexibility:2}}, set:{key:'set_indian', name:'Set d\\'Indien'}, shop:'shop'};\n\
\n\
items[431] = {item_id:431, nshort:'pilger_boots', name:'Chaussures de pèlerine', type:'foot', level:39, price:2600, image:'images/items/foot/pilger_boots.png?1', image_mini:'images/items/foot/mini/pilger_boots.png?1', characterClass:null, characterSex:'female', speed:null, bonus:{skills:{build:7, hide:6, finger_dexterity:8, shot:8}, attributes:{}}, set:{key:'set_pilgrim_female', name:'Set de pèlerine'}, shop:'shop'};\n\
items[432] = {item_id:432, nshort:'pilger_shoes', name:'Chaussures de pèlerin', type:'foot', level:39, price:2600, image:'images/items/foot/pilger_shoes.png?1', image_mini:'images/items/foot/mini/pilger_shoes.png?1', characterClass:null, characterSex:'male', speed:null, bonus:{skills:{build:7, tough:6, leadership:8, reflex:8}, attributes:{}}, set:{key:'set_pilgrim_male', name:'Set de pèlerin'}, shop:'shop'};\n\
items[433] = {item_id:433, nshort:'dancer_boots', name:'Talons hauts', type:'foot', level:41, price:4000, image:'images/items/foot/dancer_boots.png?1', image_mini:'images/items/foot/mini/dancer_boots.png?1', characterClass:null, characterSex:'female', speed:null, bonus:{skills:{repair:8, aim:9}, attributes:{charisma:1, dexterity:2}}, set:{key:'set_dancer', name:'Set de danseuse'}, shop:'shop'};\n\
\n\
items[435] = {item_id:435, nshort:'quackery_shoes', name:'Chaussures de charlatan', type:'foot', level:45, price:5600, image:'images/items/foot/quackery_shoes.png?1', image_mini:'images/items/foot/mini/quackery_shoes.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{trade:9, swim:9, ride:9}, attributes:{flexibility:2}}, set:{key:'set_quackery', name:'Set de charlatan'}, shop:'shop'};\n\
items[436] = {item_id:436, nshort:'slippers', name:'Pantoufles', type:'foot', level:45, price:2000, image:'images/items/foot/slippers.png?1', image_mini:'images/items/foot/mini/slippers.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:'set_sleeper', name:'Grincheux'}, shop:'shop'};\
items[437] = {item_id:437, nshort:'thanksgiving_boots', name:'Bottes de Thanksgiving', type:'foot', level:30, price:4600, image:'images/items/foot/thanksgiving_boots.png?1', image_mini:'images/items/foot/mini/thanksgiving_boots.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{hide:6, tough:12}, attributes:{dexterity:2}}, set:{key:'season_set', name:'Set spécial pour les fêtes'}, shop:'shop'};\
items[438] = {item_id:438, nshort:'greenhorn_shoes', name:'Chaussures de blanc-bec', type:'foot', level:6, price:460, image:'images/items/foot/greenhorn_shoes.png?1', image_mini:'images/items/foot/mini/greenhorn_shoes.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{finger_dexterity:3, reflex:6}, attributes:{dexterity:1}}, set:{key:'greenhorn_set', name:'Set du blanc-bec'}, shop:'shop'};\
\n\
\n\
items[500] = {item_id:500, nshort:'neckband_grey', name:'Foulard gris', type:'neck', level:null, price:10, image:'images/items/neck/neckband_grey.png?1', image_mini:'images/items/neck/neckband_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{swim:2}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[501] = {item_id:501, nshort:'neckband_red', name:'Foulard rouge', type:'neck', level:null, price:14, image:'images/items/neck/neckband_red.png?1', image_mini:'images/items/neck/neckband_red.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{swim:2, build:1}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[502] = {item_id:502, nshort:'neckband_green', name:'Foulard vert', type:'neck', level:null, price:14, image:'images/items/neck/neckband_green.png?1', image_mini:'images/items/neck/neckband_green.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{swim:3}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[503] = {item_id:503, nshort:'neckband_blue', name:'Foulard bleu', type:'neck', level:null, price:14, image:'images/items/neck/neckband_blue.png?1', image_mini:'images/items/neck/neckband_blue.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{swim:2, aim:1}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[504] = {item_id:504, nshort:'neckband_yellow', name:'Foulard jaune', type:'neck', level:null, price:14, image:'images/items/neck/neckband_yellow.png?1', image_mini:'images/items/neck/neckband_yellow.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{swim:2, appearance:1}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[505] = {item_id:505, nshort:'neckband_brown', name:'Foulard marron', type:'neck', level:null, price:20, image:'images/items/neck/neckband_brown.png?1', image_mini:'images/items/neck/neckband_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{swim:3, health:1}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[506] = {item_id:506, nshort:'neckband_black', name:'Foulard noir', type:'neck', level:null, price:20, image:'images/items/neck/neckband_black.png?1', image_mini:'images/items/neck/neckband_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{swim:2, tactic:1, shot:1}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[507] = {item_id:507, nshort:'indian_chain_grey', name:'Collier d\\'Indien gris', type:'neck', level:null, price:35, image:'images/items/neck/indian_chain_grey.png?1', image_mini:'images/items/neck/indian_chain_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{animal:5}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[508] = {item_id:508, nshort:'indian_chain_red', name:'Collier d\\'Indien rouge', type:'neck', level:null, price:75, image:'images/items/neck/indian_chain_red.png?1', image_mini:'images/items/neck/indian_chain_red.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{animal:5, endurance:2}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[509] = {item_id:509, nshort:'indian_chain_green', name:'Collier d\\'Indien vert', type:'neck', level:null, price:75, image:'images/items/neck/indian_chain_green.png?1', image_mini:'images/items/neck/indian_chain_green.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{animal:5, ride:2}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[510] = {item_id:510, nshort:'indian_chain_blue', name:'Collier d\\'Indien bleu', type:'neck', level:null, price:75, image:'images/items/neck/indian_chain_blue.png?1', image_mini:'images/items/neck/indian_chain_blue.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{animal:5, finger_dexterity:2}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[511] = {item_id:511, nshort:'indian_chain_yellow', name:'Collier d\\'Indien jaune', type:'neck', level:null, price:75, image:'images/items/neck/indian_chain_yellow.png?1', image_mini:'images/items/neck/indian_chain_yellow.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{animal:7}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[512] = {item_id:512, nshort:'indian_chain_fine', name:'Collier d\\'Indien en or', type:'neck', level:null, price:660, image:'images/items/neck/indian_chain_fine.png?1', image_mini:'images/items/neck/indian_chain_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{animal:8, hide:4, punch:4, pitfall:3}, attributes:{}}, set:{key:'set_indian', name:'Set d\\'Indien'}, shop:'shop'};\n\
items[513] = {item_id:513, nshort:'loop_grey', name:'Nœud gris', type:'neck', level:null, price:125, image:'images/items/neck/loop_grey.png?1', image_mini:'images/items/neck/loop_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{shot:9}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[514] = {item_id:514, nshort:'loop_red', name:'Nœud rouge', type:'neck', level:null, price:240, image:'images/items/neck/loop_red.png?1', image_mini:'images/items/neck/loop_red.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{shot:8, health:4}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[515] = {item_id:515, nshort:'loop_green', name:'Nœud vert', type:'neck', level:null, price:240, image:'images/items/neck/loop_green.png?1', image_mini:'images/items/neck/loop_green.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{shot:8, swim:4}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[516] = {item_id:516, nshort:'loop_blue', name:'Nœud bleu', type:'neck', level:null, price:240, image:'images/items/neck/loop_blue.png?1', image_mini:'images/items/neck/loop_blue.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{shot:12}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[517] = {item_id:517, nshort:'loop_yellow', name:'Nœud jaune', type:'neck', level:null, price:240, image:'images/items/neck/loop_yellow.png?1', image_mini:'images/items/neck/loop_yellow.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{shot:8, trade:4}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[518] = {item_id:518, nshort:'loop_brown', name:'Nœud marron', type:'neck', level:null, price:385, image:'images/items/neck/loop_brown.png?1', image_mini:'images/items/neck/loop_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{shot:8, dodge:4, endurance:3}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[519] = {item_id:519, nshort:'loop_black', name:'Nœud noir', type:'neck', level:null, price:385, image:'images/items/neck/loop_black.png?1', image_mini:'images/items/neck/loop_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{shot:11, appearance:3}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[520] = {item_id:520, nshort:'fly_grey', name:'Nœud papillon gris', type:'neck', level:null, price:282, image:'images/items/neck/fly_grey.png?1', image_mini:'images/items/neck/fly_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{build:13}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[521] = {item_id:521, nshort:'fly_red', name:'Nœud papillon rouge', type:'neck', level:null, price:446, image:'images/items/neck/fly_red.png?1', image_mini:'images/items/neck/fly_red.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{build:11}, attributes:{strength:1}}, set:{key:null, name:null}, shop:'shop'};\n\
items[522] = {item_id:522, nshort:'fly_green', name:'Nœud papillon vert', type:'neck', level:null, price:446, image:'images/items/neck/fly_green.png?1', image_mini:'images/items/neck/fly_green.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{build:11, ride:6}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[523] = {item_id:523, nshort:'fly_blue', name:'Nœud papillon bleu', type:'neck', level:null, price:446, image:'images/items/neck/fly_blue.png?1', image_mini:'images/items/neck/fly_blue.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{build:11, aim:6}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[524] = {item_id:524, nshort:'fly_yellow', name:'Nœud papillon jaune', type:'neck', level:null, price:446, image:'images/items/neck/fly_yellow.png?1', image_mini:'images/items/neck/fly_yellow.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{build:11, animal:6}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[525] = {item_id:525, nshort:'fly_brown', name:'Nœud papillon marron', type:'neck', level:null, price:650, image:'images/items/neck/fly_brown.png?1', image_mini:'images/items/neck/fly_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{build:10, hide:4}, attributes:{strength:1}}, set:{key:null, name:null}, shop:'shop'};\n\
items[526] = {item_id:526, nshort:'fly_black', name:'Nœud papillon noir', type:'neck', level:null, price:650, image:'images/items/neck/fly_black.png?1', image_mini:'images/items/neck/fly_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{build:11, trade:4, pitfall:4}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[527] = {item_id:527, nshort:'fly_fine', name:'Nœud papillon noble', type:'neck', level:null, price:2200, image:'images/items/neck/fly_fine.png?1', image_mini:'images/items/neck/fly_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{build:11, repair:6, dodge:6, tactic:5}, attributes:{strength:1}}, set:{key:'set_quackery', name:'Set de charlatan'}, shop:'shop'};\n\
items[528] = {item_id:528, nshort:'cross_bronze', name:'Croix en métal', type:'neck', level:null, price:730, image:'images/items/neck/cross_bronze.png?1', image_mini:'images/items/neck/cross_bronze.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{strength:1, flexibility:1, dexterity:1, charisma:1}}, set:{key:'set_pilgrim_female', name:'Set de pèlerine'}, shop:'shop'};\n\
items[529] = {item_id:529, nshort:'cross_silver', name:'Croix en argent', type:'neck', level:null, price:1200, image:'images/items/neck/cross_silver.png?1', image_mini:'images/items/neck/cross_silver.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{strength:1, flexibility:2, dexterity:1, charisma:1}}, set:{key:'set_pilgrim_male', name:'Set de pèlerin'}, shop:'shop'};\n\
items[530] = {item_id:530, nshort:'cross_gold', name:'Croix en or', type:'neck', level:null, price:3400, image:'images/items/neck/cross_gold.png?1', image_mini:'images/items/neck/cross_gold.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{strength:2, flexibility:2, dexterity:2, charisma:2}}, set:{key:null, name:null}, shop:'shop'};\n\
items[531] = {item_id:531, nshort:'cravat_grey', name:'Cravate grise', type:'neck', level:null, price:820, image:'images/items/neck/cravat_grey.png?1', image_mini:'images/items/neck/cravat_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:11, health:10}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[532] = {item_id:532, nshort:'cravat_red', name:'Cravate rouge', type:'neck', level:null, price:1205, image:'images/items/neck/cravat_red.png?1', image_mini:'images/items/neck/cravat_red.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:8, health:7}, attributes:{strength:2}}, set:{key:null, name:null}, shop:'shop'};\n\
items[533] = {item_id:533, nshort:'cravat_green', name:'Cravate verte', type:'neck', level:null, price:1205, image:'images/items/neck/cravat_green.png?1', image_mini:'images/items/neck/cravat_green.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:8, health:8, reflex:9}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[534] = {item_id:534, nshort:'cravat_blue', name:'Cravate bleue', type:'neck', level:null, price:1205, image:'images/items/neck/cravat_blue.png?1', image_mini:'images/items/neck/cravat_blue.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:8, health:8, shot:9}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[535] = {item_id:535, nshort:'cravat_yellow', name:'Cravate jaune', type:'neck', level:null, price:1205, image:'images/items/neck/cravat_yellow.png?1', image_mini:'images/items/neck/cravat_yellow.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:7, health:8}, attributes:{charisma:2}}, set:{key:null, name:null}, shop:'shop'};\n\
items[536] = {item_id:536, nshort:'cravat_brown', name:'Cravate marron', type:'neck', level:null, price:1500, image:'images/items/neck/cravat_brown.png?1', image_mini:'images/items/neck/cravat_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:8, health:9, dodge:6}, attributes:{strength:1}}, set:{key:null, name:null}, shop:'shop'};\n\
items[537] = {item_id:537, nshort:'cravat_black', name:'Cravate noire', type:'neck', level:null, price:1500, image:'images/items/neck/cravat_black.png?1', image_mini:'images/items/neck/cravat_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:9, health:8, finger_dexterity:6}, attributes:{charisma:1}}, set:{key:'set_gentleman', name:'Set du gentleman'}, shop:'shop'};\n\
items[538] = {item_id:538, nshort:'cravat_fine', name:'Cravate noble', type:'neck', level:null, price:4400, image:'images/items/neck/cravat_fine.png?1', image_mini:'images/items/neck/cravat_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:10, health:10, swim:8, pitfall:7}, attributes:{strength:1, charisma:1}}, set:{key:null, name:null}, shop:'shop'};\n\
items[539] = {item_id:539, nshort:'bullet_metal', name:'Balle en métal', type:'neck', level:null, price:1800, image:'images/items/neck/bullet_metal.png?1', image_mini:'images/items/neck/bullet_metal.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{charisma:1, dexterity:1, flexibility:2, strength:2}}, set:{key:null, name:null}, shop:'shop'};\
items[540] = {item_id:540, nshort:'bullet_silver', name:'Balle en argent', type:'neck', level:null, price:3350, image:'images/items/neck/bullet_silver.png?1', image_mini:'images/items/neck/bullet_silver.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{charisma:2, dexterity:2, flexibility:2, strength:2}}, set:{key:null, name:null}, shop:'shop'};\
items[541] = {item_id:541, nshort:'bullet_gold', name:'Balle en or', type:'neck', level:null, price:6750, image:'images/items/neck/bullet_gold.png?1', image_mini:'images/items/neck/bullet_gold.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{charisma:2, dexterity:3, flexibility:3, strength:3}}, set:{key:null, name:null}, shop:'shop'};\
items[542] = {item_id:542, nshort:'kerchief_grey', name:'Cache-nez gris', type:'neck', level:null, price:2500, image:'images/items/neck/kerchief_grey.png?1', image_mini:'images/items/neck/kerchief_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{finger_dexterity:13, appearance:12}, attributes:{dexterity:1, charisma:1}}, set:{key:null, name:null}, shop:'shop'};\n\
items[543] = {item_id:543, nshort:'kerchief_red', name:'Cache-nez rouge', type:'neck', level:null, price:3400, image:'images/items/neck/kerchief_red.png?1', image_mini:'images/items/neck/kerchief_red.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{finger_dexterity:13, appearance:13, build:14}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[544] = {item_id:544, nshort:'kerchief_green', name:'Cache-nez vert', type:'neck', level:null, price:3400, image:'images/items/neck/kerchief_green.png?1', image_mini:'images/items/neck/kerchief_green.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{finger_dexterity:13, appearance:13, ride:14}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[545] = {item_id:545, nshort:'kerchief_blue', name:'Cache-nez bleu', type:'neck', level:null, price:3400, image:'images/items/neck/kerchief_blue.png?1', image_mini:'images/items/neck/kerchief_blue.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{finger_dexterity:12, appearance:13}, attributes:{dexterity:3}}, set:{key:null, name:null}, shop:'shop'};\n\
items[546] = {item_id:546, nshort:'kerchief_yellow', name:'Cache-nez jaune', type:'neck', level:null, price:3400, image:'images/items/neck/kerchief_yellow.png?1', image_mini:'images/items/neck/kerchief_yellow.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:12, finger_dexterity:13}, attributes:{charisma:3}}, set:{key:null, name:null}, shop:'shop'};\
items[547] = {item_id:547, nshort:'kerchief_brown', name:'Cache-nez marron', type:'neck', level:null, price:4360, image:'images/items/neck/kerchief_brown.png?1', image_mini:'images/items/neck/kerchief_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{finger_dexterity:13, appearance:13, punch:10, hide:9}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[548] = {item_id:548, nshort:'kerchief_black', name:'Cache-nez noir', type:'neck', level:null, price:4360, image:'images/items/neck/kerchief_black.png?1', image_mini:'images/items/neck/kerchief_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{finger_dexterity:13, appearance:12}, attributes:{dexterity:2, charisma:2}}, set:{key:null, name:null}, shop:'shop'};\n\
items[549] = {item_id:549, nshort:'bullchain_metal', name:'Bison en métal', type:'neck', level:null, price:2400, image:'images/items/neck/bullchain_metal.png?1', image_mini:'images/items/neck/bullchain_metal.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{strength:2, flexibility:2, dexterity:2, charisma:1}}, set:{key:null, name:null}, shop:'shop'};\n\
items[550] = {item_id:550, nshort:'bullchain_silver', name:'Bison en argent', type:'neck', level:null, price:4490, image:'images/items/neck/bullchain_silver.png?1', image_mini:'images/items/neck/bullchain_silver.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{strength:2, flexibility:2, dexterity:2, charisma:3}}, set:{key:null, name:null}, shop:'shop'};\n\
items[551] = {item_id:551, nshort:'bullchain_gold', name:'Bison en or', type:'neck', level:null, price:8300, image:'images/items/neck/bullchain_gold.png?1', image_mini:'images/items/neck/bullchain_gold.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{strength:3, flexibility:3, dexterity:3, charisma:3}}, set:{key:null, name:null}, shop:'shop'};\n\
items[552] = {item_id:552, nshort:'talisman', name:'Talisman', type:'neck', level:null, price:1000, image:'images/items/neck/talisman.png?1', image_mini:'images/items/neck/talisman.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'unk'};\n\
items[553] = {item_id:553, nshort:'stonechain', name:'Stonechain', type:'neck', level:null, price:1000, image:'images/items/neck/stonechain.png?1', image_mini:'images/items/neck/stonechain.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[554] = {item_id:554, nshort:'southcross', name:'Médaille des braves', type:'neck', level:null, price:650, image:'images/items/neck/southcross.png?1', image_mini:'images/items/neck/southcross.png?1', characterClass:'soldier', characterSex:null, speed:null, bonus:{skills:{tactic:8, appearance:7, ride:4}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\n\
items[555] = {item_id:555, nshort:'aztecchains', name:'Collier aztèque', type:'neck', level:null, price:1200, image:'images/items/neck/aztecchains.png?1', image_mini:'images/items/neck/aztecchains.png?1', characterClass:'adventurer', characterSex:null, speed:null, bonus:{skills:{hide:9, ride:10, tough:8}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[556] = {item_id:556, nshort:'arrowhead', name:'Point de flèche', type:'neck', level:null, price:1150, image:'images/items/neck/arrowhead.png?1', image_mini:'images/items/neck/arrowhead.png?1', characterClass:'duelist', characterSex:null, speed:null, bonus:{skills:{shot:7, aim:7}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\n\
items[557] = {item_id:557, nshort:'bone_necklace', name:'Collier d\\'os', type:'neck', level:null, price:1700, image:'images/items/neck/bone_necklace.png?1', image_mini:'images/items/neck/bone_necklace.png?1', characterClass:'worker', characterSex:null, speed:null, bonus:{skills:{appearance:3}, attributes:{strength:5}}, set:{key:null, name:null}, shop:'quest'};\n\
\n\
\n\
items[561] = {item_id:561, nshort:'mexican_neck', name:'Foulard de Mexicain', type:'neck', level:28, price:600, image:'images/items/neck/mexican_neck.png?1', image_mini:'images/items/neck/mexican_neck.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{punch:17}, attributes:{}}, set:{key:'set_mexican', name:'Set de Mexicain'}, shop:'shop'};\n\
\n\
\n\
items[566] = {item_id:566, nshort:'dancer_chain', name:'Collier de perles', type:'neck', level:43, price:1800, image:'images/items/neck/dancer_chain.png?1', image_mini:'images/items/neck/dancer_chain.png?1', characterClass:null, characterSex:'female', speed:null, bonus:{skills:{trade:9, leadership:8, pitfall:6}, attributes:{charisma:1}}, set:{key:'set_dancer', name:'Set de danseuse'}, shop:'drop'};\n\
items[567] = {item_id:567, nshort:'amulett', name:'Collier de l\\'amour ', type:'neck', level:30, price:2412, image:'images/items/neck/amulett.png?1', image_mini:'images/items/neck/amulett.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:15, animal:15, trade:15, leadership:15}, attributes:{}}, set:{key:'season_set', name:'Set spécial pour les fêtes'}, shop:'shop'};\
items[568] = {item_id:568, nshort:'teethchain', name:'Talisman contre les esprits', type:'neck', level:40, price:2012, image:'images/items/neck/teethchain.png?1', image_mini:'images/items/neck/teethchain.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:4, leadership:8, hide:4}, attributes:{charisma:3}}, set:{key:null, name:null}, shop:'quest'};\n\
items[569] = {item_id:569, nshort:'greenhorn_neck', name:'Chiffon à poussière', type:'neck', level:1, price:350, image:'images/items/neck/greenhorn_neck.png?1', image_mini:'images/items/neck/greenhorn_neck.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{hide:1, endurance:2}, attributes:{}}, set:{key:'greenhorn_set', name:'Set du blanc-bec'}, shop:'shop'};\
items[570] = {item_id:570, nshort:'xmas_schal', name:'Écharpe d\\'hiver', type:'neck', level:1, price:2010, image:'images/items/neck/xmas_schal.png?1', image_mini:'images/items/neck/xmas_schal.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{charisma:1}}, set:{key:null, name:null}, shop:'quest'};\n\
\n\
\n\
items[600] = {item_id:600, nshort:'donkey', name:'Âne', type:'animal', level:1, price:250, image:'images/items/animal/donkey.png?1', image_mini:'images/items/animal/mini/donkey.png?1', characterClass:null, characterSex:null, speed:0.8, bonus:{skills:{}, attributes:{}}, set:{key:'set_mexican', name:'Set de Mexicain'}, shop:'shop'};\n\
items[601] = {item_id:601, nshort:'pony', name:'Poney', type:'animal', level:1, price:500, image:'images/items/animal/pony.png?1', image_mini:'images/items/animal/mini/pony.png?1', characterClass:null, characterSex:null, speed:0.666, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[602] = {item_id:602, nshort:'mustang', name:'Mustang', type:'animal', level:1, price:850, image:'images/items/animal/mustang.png?1', image_mini:'images/items/animal/mini/mustang.png?1', characterClass:null, characterSex:null, speed:0.571, bonus:{skills:{}, attributes:{}}, set:{key:'set_indian', name:'Set d\\'Indien'}, shop:'shop'};\n\
items[603] = {item_id:603, nshort:'berber', name:'Cheval berbère ', type:'animal', level:1, price:1250, image:'images/items/animal/berber.png?1', image_mini:'images/items/animal/mini/berber.png?1', characterClass:null, characterSex:null, speed:0.5, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[604] = {item_id:604, nshort:'araber', name:'Cheval arabe', type:'animal', level:1, price:2000, image:'images/items/animal/araber.png?1', image_mini:'images/items/animal/mini/araber.png?1', characterClass:null, characterSex:null, speed:0.444, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[605] = {item_id:605, nshort:'quarter', name:'Quarter Horse', type:'animal', level:1, price:2800, image:'images/items/animal/quarter.png?1', image_mini:'images/items/animal/mini/quarter.png?1', characterClass:null, characterSex:null, speed:0.4, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[606] = {item_id:606, nshort:'charriot', name:'Charrue à bœufs', type:'animal', level:1, price:1500, image:'images/items/animal/charriot.png?1', image_mini:'images/items/animal/mini/charriot.png?1', characterClass:null, characterSex:null, speed:0.909, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[607] = {item_id:607, nshort:'young_stallion', name:'Jeune étalon', type:'animal', level:1, price:250, image:'images/items/animal/young_stallion.png?1', image_mini:'images/items/animal/mini/young_stallion.png?1', characterClass:null, characterSex:null, speed:0.8, bonus:{skills:{}, attributes:{}}, set:{key:'greenhorn_set', name:'Set du blanc-bec'}, shop:'shop'};\
items[608] = {item_id:608, nshort:'xmas_rudolph', name:'Rodolphe', type:'animal', level:1, price:250, image:'images/items/animal/xmas_rudolph.png?1', image_mini:'images/items/animal/mini/xmas_rudolph.png?1', characterClass:null, characterSex:null, speed:0.8, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[609] = {item_id:609, nshort:'xmas_slide', name:'Luge de Noël', type:'animal', level:1, price:550, image:'images/items/animal/xmas_slide.png?1', image_mini:'images/items/animal/mini/xmas_slide.png?1', characterClass:null, characterSex:null, speed:0.8, bonus:{skills:{}, attributes:{}}, set:{key:'season_set', name:'Set spécial pour les fêtes'}, shop:'shop'};\
\n\
\n\
items[699] = {item_id:699, nshort:'rocketturtle', name:'Rocketin\\' turtle', type:'animal', level:1, price:123456, image:'images/items/animal/rocketturtle.png?1', image_mini:'images/items/animal/mini/rocketturtle.png?1', characterClass:null, characterSex:null, speed:0.005, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[700] = {item_id:700, nshort:'ham', name:'Jambon', type:'yield', level:null, price:10, image:'images/items/yield/ham.png?1', image_mini:'images/items/yield/ham.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[701] = {item_id:701, nshort:'cereals', name:'Blé', type:'yield', level:null, price:3, image:'images/items/yield/cereals.png?1', image_mini:'images/items/yield/cereals.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[702] = {item_id:702, nshort:'tabacco', name:'Feuilles de tabac', type:'yield', level:null, price:5, image:'images/items/yield/tabacco.png?1', image_mini:'images/items/yield/tabacco.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[703] = {item_id:703, nshort:'sugar', name:'Sucre', type:'yield', level:null, price:8, image:'images/items/yield/sugar.png?1', image_mini:'images/items/yield/sugar.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[704] = {item_id:704, nshort:'cotton', name:'Coton', type:'yield', level:null, price:6, image:'images/items/yield/cotton.png?1', image_mini:'images/items/yield/cotton.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[705] = {item_id:705, nshort:'trout', name:'Truite', type:'yield', level:null, price:4, image:'images/items/yield/trout.png?1', image_mini:'images/items/yield/trout.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[706] = {item_id:706, nshort:'berrys', name:'Baies', type:'yield', level:null, price:4, image:'images/items/yield/berrys.png?1', image_mini:'images/items/yield/berrys.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[707] = {item_id:707, nshort:'shearings', name:'Laine', type:'yield', level:null, price:8, image:'images/items/yield/shearings.png?1', image_mini:'images/items/yield/shearings.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[708] = {item_id:708, nshort:'copper_pyrites', name:'Pyrite', type:'yield', level:null, price:16, image:'images/items/yield/copper_pyrites.png?1', image_mini:'images/items/yield/copper_pyrites.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[709] = {item_id:709, nshort:'turkey', name:'Dindon', type:'yield', level:null, price:14, image:'images/items/yield/turkey.png?1', image_mini:'images/items/yield/turkey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[710] = {item_id:710, nshort:'beef', name:'Steak', type:'yield', level:null, price:24, image:'images/items/yield/beef.png?1', image_mini:'images/items/yield/beef.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[711] = {item_id:711, nshort:'planks', name:'Bois', type:'yield', level:null, price:16, image:'images/items/yield/planks.png?1', image_mini:'images/items/yield/planks.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[712] = {item_id:712, nshort:'leather', name:'Cuir', type:'yield', level:null, price:16, image:'images/items/yield/leather.png?1', image_mini:'images/items/yield/leather.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
\n\
items[714] = {item_id:714, nshort:'beaver', name:'Peau de castor', type:'yield', level:null, price:36, image:'images/items/yield/beaver.png?1', image_mini:'images/items/yield/beaver.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[715] = {item_id:715, nshort:'fabric', name:'Ballot d\\'étoffe', type:'yield', level:null, price:22, image:'images/items/yield/fabric.png?1', image_mini:'images/items/yield/fabric.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[716] = {item_id:716, nshort:'stone', name:'Pierres', type:'yield', level:null, price:10, image:'images/items/yield/stone.png?1', image_mini:'images/items/yield/stone.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[717] = {item_id:717, nshort:'grund', name:'Saumon', type:'yield', level:null, price:14, image:'images/items/yield/grund.png?1', image_mini:'images/items/yield/grund.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[718] = {item_id:718, nshort:'coyote', name:'Dent de coyote', type:'yield', level:null, price:42, image:'images/items/yield/coyote.png?1', image_mini:'images/items/yield/coyote.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[719] = {item_id:719, nshort:'cigar', name:'Cigares', type:'yield', level:null, price:24, image:'images/items/yield/cigar.png?1', image_mini:'images/items/yield/cigar.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[720] = {item_id:720, nshort:'gems', name:'Gemmes', type:'yield', level:null, price:70, image:'images/items/yield/gems.png?1', image_mini:'images/items/yield/gems.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[721] = {item_id:721, nshort:'coal', name:'Charbon', type:'yield', level:null, price:20, image:'images/items/yield/coal.png?1', image_mini:'images/items/yield/coal.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[722] = {item_id:722, nshort:'meal', name:'Repas chaud', type:'yield', level:null, price:14, image:'images/items/yield/meal.png?1', image_mini:'images/items/yield/meal.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[723] = {item_id:723, nshort:'ring', name:'Bague', type:'yield', level:null, price:160, image:'images/items/yield/ring.png?1', image_mini:'images/items/yield/ring.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:'set_pilgrim_female', name:'Set de pèlerine'}, shop:'drop'};\n\
items[724] = {item_id:724, nshort:'buffalo', name:'Peau de bison', type:'yield', level:null, price:40, image:'images/items/yield/buffalo.png?1', image_mini:'images/items/yield/buffalo.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[725] = {item_id:725, nshort:'silver', name:'Argent', type:'yield', level:null, price:200, image:'images/items/yield/silver.png?1', image_mini:'images/items/yield/silver.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[726] = {item_id:726, nshort:'indiangold', name:'L\\'or des Aztèques', type:'yield', level:null, price:290, image:'images/items/yield/indiangold.png?1', image_mini:'images/items/yield/indiangold.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[727] = {item_id:727, nshort:'medal', name:'Médaille d\\'honneur', type:'yield', level:null, price:500, image:'images/items/yield/medal.png?1', image_mini:'images/items/yield/medal.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[728] = {item_id:728, nshort:'watch', name:'Montre de poche', type:'yield', level:null, price:210, image:'images/items/yield/watch.png?1', image_mini:'images/items/yield/watch.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[729] = {item_id:729, nshort:'stolen_goods', name:'Marchandise de contrebande', type:'yield', level:null, price:110, image:'images/items/yield/stolen_goods.png?1', image_mini:'images/items/yield/stolen_goods.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[730] = {item_id:730, nshort:'necklet', name:'Bijoux de femme', type:'yield', level:null, price:230, image:'images/items/yield/necklet.png?1', image_mini:'images/items/yield/necklet.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[731] = {item_id:731, nshort:'grizzly', name:'Trophée', type:'yield', level:null, price:150, image:'images/items/yield/grizzly.png?1', image_mini:'images/items/yield/grizzly.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
\n\
\n\
items[733] = {item_id:733, nshort:'packet', name:'Colis', type:'yield', level:null, price:32, image:'images/items/yield/packet.png?1', image_mini:'images/items/yield/packet.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[734] = {item_id:734, nshort:'slicer', name:'Rabot', type:'yield', level:null, price:44, image:'images/items/yield/slicer.png?1', image_mini:'images/items/yield/slicer.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
\n\
items[736] = {item_id:736, nshort:'spade', name:'Bêche', type:'yield', level:null, price:40, image:'images/items/yield/spade.png?1', image_mini:'images/items/yield/spade.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[737] = {item_id:737, nshort:'dynamite', name:'Dynamite', type:'yield', level:null, price:80, image:'images/items/yield/dynamite.png?1', image_mini:'images/items/yield/dynamite.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
\n\
items[739] = {item_id:739, nshort:'fence', name:'Fil de fer barbelé', type:'yield', level:null, price:36, image:'images/items/yield/fence.png?1', image_mini:'images/items/yield/fence.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[740] = {item_id:740, nshort:'horn', name:'Corne de vache', type:'yield', level:null, price:78, image:'images/items/yield/horn.png?1', image_mini:'images/items/yield/horn.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[741] = {item_id:741, nshort:'pitcher', name:'Cruche', type:'yield', level:null, price:24, image:'images/items/yield/pitcher.png?1', image_mini:'images/items/yield/pitcher.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[742] = {item_id:742, nshort:'saw', name:'Scie', type:'yield', level:null, price:40, image:'images/items/yield/saw.png?1', image_mini:'images/items/yield/saw.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[743] = {item_id:743, nshort:'poster', name:'Affiche', type:'yield', level:null, price:4, image:'images/items/yield/poster.png?1', image_mini:'images/items/yield/poster.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[744] = {item_id:744, nshort:'newspaper', name:'Journal', type:'yield', level:null, price:6, image:'images/items/yield/newspaper.png?1', image_mini:'images/items/yield/newspaper.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[745] = {item_id:745, nshort:'flour', name:'Farine', type:'yield', level:null, price:5, image:'images/items/yield/flour.png?1', image_mini:'images/items/yield/flour.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[746] = {item_id:746, nshort:'beans', name:'Haricots', type:'yield', level:null, price:6, image:'images/items/yield/beans.png?1', image_mini:'images/items/yield/beans.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[747] = {item_id:747, nshort:'hammer', name:'Marteau', type:'yield', level:null, price:22, image:'images/items/yield/hammer.png?1', image_mini:'images/items/yield/hammer.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[748] = {item_id:748, nshort:'corn', name:'Maïs ', type:'yield', level:null, price:4, image:'images/items/yield/corn.png?1', image_mini:'images/items/yield/corn.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[749] = {item_id:749, nshort:'rope', name:'Lasso', type:'yield', level:null, price:32, image:'images/items/yield/rope.png?1', image_mini:'images/items/yield/rope.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[750] = {item_id:750, nshort:'nippers', name:'Menottes', type:'yield', level:null, price:58, image:'images/items/yield/nippers.png?1', image_mini:'images/items/yield/nippers.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[751] = {item_id:751, nshort:'pipe', name:'Calumet de la paix', type:'yield', level:null, price:72, image:'images/items/yield/pipe.png?1', image_mini:'images/items/yield/pipe.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[752] = {item_id:752, nshort:'oil', name:'Pétrole', type:'yield', level:null, price:76, image:'images/items/yield/oil.png?1', image_mini:'images/items/yield/oil.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[753] = {item_id:753, nshort:'pick', name:'Pic', type:'yield', level:null, price:44, image:'images/items/yield/pick.png?1', image_mini:'images/items/yield/pick.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[754] = {item_id:754, nshort:'horseshoe', name:'Fer à cheval', type:'yield', level:null, price:30, image:'images/items/yield/horseshoe.png?1', image_mini:'images/items/yield/horseshoe.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[755] = {item_id:755, nshort:'flag', name:'Fanion', type:'yield', level:null, price:32, image:'images/items/yield/flag.png?1', image_mini:'images/items/yield/flag.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[756] = {item_id:756, nshort:'toolbox', name:'Boîte à outils', type:'yield', level:null, price:110, image:'images/items/yield/toolbox.png?1', image_mini:'images/items/yield/toolbox.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[757] = {item_id:757, nshort:'feather', name:'Plume de corbeau', type:'yield', level:null, price:8, image:'images/items/yield/feather.png?1', image_mini:'images/items/yield/feather.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[758] = {item_id:758, nshort:'flag_north', name:'Le drapeau des états du nord', type:'yield', level:null, price:86, image:'images/items/yield/flag_north.png?1', image_mini:'images/items/yield/flag_north.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[759] = {item_id:759, nshort:'ticket', name:'Billet de train', type:'yield', level:null, price:34, image:'images/items/yield/ticket.png?1', image_mini:'images/items/yield/ticket.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[760] = {item_id:760, nshort:'map', name:'Carte', type:'yield', level:null, price:32, image:'images/items/yield/map.png?1', image_mini:'images/items/yield/map.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[761] = {item_id:761, nshort:'sledgehammer', name:'Marteau de forgeron', type:'yield', level:null, price:52, image:'images/items/yield/sledgehammer.png?1', image_mini:'images/items/yield/sledgehammer.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[762] = {item_id:762, nshort:'flag_south', name:'Le drapeau des états du sud', type:'yield', level:null, price:86, image:'images/items/yield/flag_south.png?1', image_mini:'images/items/yield/flag_south.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[763] = {item_id:763, nshort:'wolf', name:'Bracelet de dents', type:'yield', level:null, price:44, image:'images/items/yield/wolf.png?1', image_mini:'images/items/yield/wolf.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[764] = {item_id:764, nshort:'shackle', name:'Abot', type:'yield', level:null, price:62, image:'images/items/yield/shackle.png?1', image_mini:'images/items/yield/shackle.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[765] = {item_id:765, nshort:'sickle', name:'Faucille', type:'yield', level:null, price:44, image:'images/items/yield/sickle.png?1', image_mini:'images/items/yield/sickle.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[766] = {item_id:766, nshort:'water', name:'Verre d\\'eau', type:'yield', level:null, price:6, image:'images/items/yield/water.png?1', image_mini:'images/items/yield/water.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[767] = {item_id:767, nshort:'string', name:'Rouleau de fil de fer', type:'yield', level:null, price:34, image:'images/items/yield/string.png?1', image_mini:'images/items/yield/string.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[768] = {item_id:768, nshort:'hymnal', name:'Livre de cantiques', type:'yield', level:null, price:48, image:'images/items/yield/hymnal.png?1', image_mini:'images/items/yield/hymnal.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:'set_pilgrim_male', name:'Set de pèlerin'}, shop:'drop'};\n\
items[769] = {item_id:769, nshort:'empty_bottle', name:'Bouteille vide', type:'yield', level:null, price:2, image:'images/items/yield/empty_bottle.png?1', image_mini:'images/items/yield/empty_bottle.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[770] = {item_id:770, nshort:'beer', name:'Bière', type:'yield', level:null, price:0, image:'images/items/yield/beer.png?1', image_mini:'images/items/yield/beer.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\n\
items[771] = {item_id:771, nshort:'trap', name:'Piège à castor', type:'yield', level:null, price:50, image:'images/items/yield/trap.png?1', image_mini:'images/items/yield/trap.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[772] = {item_id:772, nshort:'falcon', name:'Faucon', type:'yield', level:null, price:0, image:'images/items/yield/falcon.png?1', image_mini:'images/items/yield/falcon.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\n\
items[773] = {item_id:773, nshort:'paper1', name:'Morceau d\\'un bout de papier (1ère partie)', type:'yield', level:null, price:1400, image:'images/items/yield/paper1.png?1', image_mini:'images/items/yield/paper1.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[774] = {item_id:774, nshort:'paper2', name:'Morceau d\\'un bout de papier (2ème partie)', type:'yield', level:null, price:590, image:'images/items/yield/paper2.png?1', image_mini:'images/items/yield/paper2.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[775] = {item_id:775, nshort:'paper3', name:'Morceau d\\'un bout de papier (3ème partie)', type:'yield', level:null, price:590, image:'images/items/yield/paper3.png?1', image_mini:'images/items/yield/paper3.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\n\
items[776] = {item_id:776, nshort:'kates_ring', name:'La bague de Kate', type:'yield', level:null, price:1000, image:'images/items/yield/kates_ring.png?1', image_mini:'images/items/yield/kates_ring.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\n\
\n\
items[778] = {item_id:778, nshort:'cooking_pot', name:'Casserole', type:'yield', level:null, price:22, image:'images/items/yield/cooking_pot.png?1', image_mini:'images/items/yield/cooking_pot.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[779] = {item_id:779, nshort:'post_horn', name:'Cor du postillon', type:'yield', level:null, price:60, image:'images/items/yield/post_horn.png?1', image_mini:'images/items/yield/post_horn.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[780] = {item_id:780, nshort:'rounds', name:'Cartouches', type:'yield', level:null, price:50, image:'images/items/yield/rounds.png?1', image_mini:'images/items/yield/rounds.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[781] = {item_id:781, nshort:'documents', name:'Documents', type:'yield', level:null, price:120, image:'images/items/yield/documents.png?1', image_mini:'images/items/yield/documents.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[782] = {item_id:782, nshort:'angle', name:'Canne à pêche', type:'yield', level:null, price:42, image:'images/items/yield/angle.png?1', image_mini:'images/items/yield/angle.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[783] = {item_id:783, nshort:'gold_sculpture', name:'Statuette en or', type:'yield', level:null, price:144, image:'images/items/yield/gold_sculpture.png?1', image_mini:'images/items/yield/gold_sculpture.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[784] = {item_id:784, nshort:'nails', name:'Clous', type:'yield', level:null, price:8, image:'images/items/yield/nails.png?1', image_mini:'images/items/yield/nails.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
\n\
items[786] = {item_id:786, nshort:'picture', name:'Tableau', type:'yield', level:null, price:340, image:'images/items/yield/picture.png?1', image_mini:'images/items/yield/picture.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[787] = {item_id:787, nshort:'saddle', name:'Selle', type:'yield', level:null, price:80, image:'images/items/yield/saddle.png?1', image_mini:'images/items/yield/saddle.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[788] = {item_id:788, nshort:'bell', name:'Cloche de bateau', type:'yield', level:null, price:130, image:'images/items/yield/bell.png?1', image_mini:'images/items/yield/bell.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[789] = {item_id:789, nshort:'coin', name:'Quarter', type:'yield', level:null, price:2, image:'images/items/yield/coin.png?1', image_mini:'images/items/yield/coin.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[790] = {item_id:790, nshort:'iron', name:'Barres de fer', type:'yield', level:null, price:36, image:'images/items/yield/iron.png?1', image_mini:'images/items/yield/iron.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[791] = {item_id:791, nshort:'orange', name:'Oranges', type:'yield', level:null, price:8, image:'images/items/yield/orange.png?1', image_mini:'images/items/yield/orange.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[792] = {item_id:792, nshort:'tequila', name:'Tequila', type:'yield', level:null, price:24, image:'images/items/yield/tequila.png?1', image_mini:'images/items/yield/tequila.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:'set_mexican', name:'Set de Mexicain'}, shop:'drop'};\n\
items[793] = {item_id:793, nshort:'tomato', name:'Tomate', type:'yield', level:null, price:6, image:'images/items/yield/tomato.png?1', image_mini:'images/items/yield/tomato.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[794] = {item_id:794, nshort:'potion', name:'Élixir', type:'yield', level:null, price:360, image:'images/items/yield/potion.png?1', image_mini:'images/items/yield/potion.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:'set_quackery', name:'Set de charlatan'}, shop:'drop'};\n\
items[795] = {item_id:795, nshort:'peg', name:'Cabillot ', type:'yield', level:null, price:15, image:'images/items/yield/peg.png?1', image_mini:'images/items/yield/peg.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[796] = {item_id:796, nshort:'brush_shoe', name:'Brosse à chaussures', type:'yield', level:null, price:14, image:'images/items/yield/brush_shoe.png?1', image_mini:'images/items/yield/brush_shoe.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[797] = {item_id:797, nshort:'pitchfork', name:'Fourche à fumier', type:'yield', level:null, price:32, image:'images/items/yield/pitchfork.png?1', image_mini:'images/items/yield/pitchfork.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:'set_farmer', name:'Set de fermier'}, shop:'shop'};\n\
\n\
items[800] = {item_id:800, nshort:'stone_pebble', name:'Caillou', type:'right_arm', level:2, price:15, image:'images/items/right_arm/stone_pebble.png?1', image_mini:'images/items/right_arm/mini/stone_pebble.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[801] = {item_id:801, nshort:'stone_flint', name:'Pierre à feu', type:'right_arm', level:5, price:26, image:'images/items/right_arm/stone_flint.png?1', image_mini:'images/items/right_arm/mini/stone_flint.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[802] = {item_id:802, nshort:'stone_granite', name:'Granit', type:'right_arm', level:8, price:46, image:'images/items/right_arm/stone_granite.png?1', image_mini:'images/items/right_arm/mini/stone_granite.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[803] = {item_id:803, nshort:'crutch_rusty', name:'Lance-pierre usé', type:'right_arm', level:7, price:26, image:'images/items/right_arm/crutch_rusty.png?1', image_mini:'images/items/right_arm/mini/crutch_rusty.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[804] = {item_id:804, nshort:'crutch', name:'Lance-pierre', type:'right_arm', level:10, price:63, image:'images/items/right_arm/crutch.png?1', image_mini:'images/items/right_arm/mini/crutch.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[805] = {item_id:805, nshort:'crutch_accurate', name:'Lance-pierre précis', type:'right_arm', level:13, price:148, image:'images/items/right_arm/crutch_accurate.png?1', image_mini:'images/items/right_arm/mini/crutch_accurate.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[806] = {item_id:806, nshort:'crutch_huckeberry', name:'Lance-pierre de Huckleberry', type:'right_arm', level:20, price:1360, image:'images/items/right_arm/crutch_huckeberry.png?1', image_mini:'images/items/right_arm/mini/crutch_huckeberry.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{swim:3, ride:3}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[807] = {item_id:807, nshort:'leadshot_rusty', name:'Revolver à plombs rouillé', type:'right_arm', level:17, price:124, image:'images/items/right_arm/leadshot_rusty.png?1', image_mini:'images/items/right_arm/mini/leadshot_rusty.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[808] = {item_id:808, nshort:'leadshot', name:'Revolver à plombs', type:'right_arm', level:20, price:384, image:'images/items/right_arm/leadshot.png?1', image_mini:'images/items/right_arm/mini/leadshot.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tough:1}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[809] = {item_id:809, nshort:'leadshot_accurate', name:'Revolver à plombs précis', type:'right_arm', level:23, price:550, image:'images/items/right_arm/leadshot_accurate.png?1', image_mini:'images/items/right_arm/mini/leadshot_accurate.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tough:1}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[810] = {item_id:810, nshort:'leadshot_granmonts', name:'Pistolet de Granmont', type:'right_arm', level:30, price:2680, image:'images/items/right_arm/leadshot_granmonts.png?1', image_mini:'images/items/right_arm/mini/leadshot_granmonts.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{finger_dexterity:4, tough:3}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[811] = {item_id:811, nshort:'muzzleloader_rusty', name:'Fusil à baguette rouillé', type:'right_arm', level:22, price:326, image:'images/items/right_arm/muzzleloader_rusty.png?1', image_mini:'images/items/right_arm/mini/muzzleloader_rusty.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{aim:1}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[812] = {item_id:812, nshort:'muzzleloader', name:'Fusil à baguette', type:'right_arm', level:25, price:545, image:'images/items/right_arm/muzzleloader.png?1', image_mini:'images/items/right_arm/mini/muzzleloader.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{aim:1}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[813] = {item_id:813, nshort:'muzzleloader_accurate', name:'Fusil à baguette précis', type:'right_arm', level:28, price:940, image:'images/items/right_arm/muzzleloader_accurate.png?1', image_mini:'images/items/right_arm/mini/muzzleloader_accurate.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{aim:2}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[814] = {item_id:814, nshort:'muzzleloader_drake', name:'Fusil à baguette de Drake', type:'right_arm', level:35, price:3580, image:'images/items/right_arm/muzzleloader_drake.png?1', image_mini:'images/items/right_arm/mini/muzzleloader_drake.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{aim:4, swim:4}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[815] = {item_id:815, nshort:'deringer_rusty', name:'Deringer rouillé', type:'right_arm', level:32, price:730,  image:'images/items/right_arm/deringer_rusty.png?1', image_mini:'images/items/right_arm/mini/deringer_rusty.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{reflex:2}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[816] = {item_id:816, nshort:'deringer', name:'Deringer', type:'right_arm', level:35, price:1280, image:'images/items/right_arm/deringer.png?1', image_mini:'images/items/right_arm/mini/deringer.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{reflex:2}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[817] = {item_id:817, nshort:'deringer_accurate', name:'Deringer précis', type:'right_arm', level:38, price:1655, image:'images/items/right_arm/deringer_accurate.png?1', image_mini:'images/items/right_arm/mini/deringer_accurate.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{reflex:3}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[818] = {item_id:818, nshort:'deringer_bellestar', name:'Deringer de Belle Starr', type:'right_arm', level:45, price:5500, image:'images/items/right_arm/deringer_bellestar.png?1', image_mini:'images/items/right_arm/mini/deringer_bellestar.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{hide:4, reflex:5}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[819] = {item_id:819, nshort:'pepperbox_rusty', name:'Colt Paterson rouillé', type:'right_arm', level:37, price:940, image:'images/items/right_arm/pepperbox_rusty.png?1', image_mini:'images/items/right_arm/mini/pepperbox_rusty.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{dodge:2}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[820] = {item_id:820, nshort:'pepperbox', name:'Colt Paterson', type:'right_arm', level:40, price:1440, image:'images/items/right_arm/pepperbox.png?1', image_mini:'images/items/right_arm/mini/pepperbox.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{dodge:2}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[821] = {item_id:821, nshort:'pepperbox_accurate', name:'Colt Paterson précis', type:'right_arm', level:43, price:2150, image:'images/items/right_arm/pepperbox_accurate.png?1', image_mini:'images/items/right_arm/mini/pepperbox_accurate.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{dodge:3}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[822] = {item_id:822, nshort:'pepperbox_allen', name:'Poivrière d\\'Allen', type:'right_arm', level:50, price:6850, image:'images/items/right_arm/pepperbox_allen.png?1', image_mini:'images/items/right_arm/mini/pepperbox_allen.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:6, aim:5}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[823] = {item_id:823, nshort:'smith_rusty', name:'Revolver rouillé No 1', type:'right_arm', level:47, price:1650, image:'images/items/right_arm/smith_rusty.png?1', image_mini:'images/items/right_arm/mini/smith_rusty.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{shot:3}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[824] = {item_id:824, nshort:'smith', name:'Revolver No 1', type:'right_arm', level:50, price:2350, image:'images/items/right_arm/smith.png?1', image_mini:'images/items/right_arm/mini/smith.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{shot:3}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[825] = {item_id:825, nshort:'smith_accurate', name:'Revolver précis No 1', type:'right_arm', level:53, price:3180, image:'images/items/right_arm/smith_accurate.png?1', image_mini:'images/items/right_arm/mini/smith_accurate.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{shot:4}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[826] = {item_id:826, nshort:'smith_younger', name:'Le revolver &aacute; Younger', type:'right_arm', level:60, price:8700, image:'images/items/right_arm/smith_younger.png?1', image_mini:'images/items/right_arm/mini/smith_younger.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{shot:6, pitfall:7}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[827] = {item_id:827, nshort:'remington_rusty', name:'Revolver d\\'armée rouillé', type:'right_arm', level:52, price:2150, image:'images/items/right_arm/remington_rusty.png?1', image_mini:'images/items/right_arm/mini/remington_rusty.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tough:3}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[828] = {item_id:828, nshort:'remington', name:'Revolver d\\'armée', type:'right_arm', level:55, price:2950, image:'images/items/right_arm/remington.png?1', image_mini:'images/items/right_arm/mini/remington.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tough:4}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[829] = {item_id:829, nshort:'remington_accurate', name:'Revolver d\\'armée précis', type:'right_arm', level:58, price:3940, image:'images/items/right_arm/remington_accurate.png?1', image_mini:'images/items/right_arm/mini/remington_accurate.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tough:5}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[830] = {item_id:830, nshort:'remington_ike', name:'Le revolver d\\'armée d\\'Ike', type:'right_arm', level:65, price:9400, image:'images/items/right_arm/remington_ike.png?1', image_mini:'images/items/right_arm/mini/remington_ike.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{endurance:7, tough:7}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[831] = {item_id:831, nshort:'peacemaker_rusty', name:'Colt Peacemaker rouillé', type:'right_arm', level:62, price:3380, image:'images/items/right_arm/peacemaker_rusty.png?1', image_mini:'images/items/right_arm/mini/peacemaker_rusty.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:4}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[832] = {item_id:832, nshort:'peacemaker', name:'Colt Peacemaker ', type:'right_arm', level:65, price:4570, image:'images/items/right_arm/peacemaker.png?1', image_mini:'images/items/right_arm/mini/peacemaker.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:5}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[833] = {item_id:833, nshort:'peacemaker_accurate', name:'Colt Peacemaker précis', type:'right_arm', level:68, price:5400, image:'images/items/right_arm/peacemaker_accurate.png?1', image_mini:'images/items/right_arm/mini/peacemaker_accurate.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:6}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[834] = {item_id:834, nshort:'peacemaker_billy', name:'Le Colt Peacemeaker à Billy', type:'right_arm', level:75, price:10300, image:'images/items/right_arm/peacemaker_billy.png?1', image_mini:'images/items/right_arm/mini/peacemaker_billy.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:7, health:8}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[835] = {item_id:835, nshort:'schofield_rusty', name:'Schofield rouillé', type:'right_arm', level:67, price:4250, image:'images/items/right_arm/schofield_rusty.png?1', image_mini:'images/items/right_arm/mini/schofield_rusty.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:5}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[836] = {item_id:836, nshort:'schofield', name:'Schofield', type:'right_arm', level:70, price:5230, image:'images/items/right_arm/schofield.png?1', image_mini:'images/items/right_arm/mini/schofield.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:6}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[837] = {item_id:837, nshort:'schofield_accurate', name:'Schofield précis', type:'right_arm', level:73, price:6400, image:'images/items/right_arm/schofield_accurate.png?1', image_mini:'images/items/right_arm/mini/schofield_accurate.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:7}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[838] = {item_id:838, nshort:'schofield_jessejames', name:'Schofield de Jesse James', type:'right_arm', level:80, price:10600, image:'images/items/right_arm/schofield_jessejames.png?1', image_mini:'images/items/right_arm/mini/schofield_jessejames.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{trade:8, tactic:8}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[839] = {item_id:839, nshort:'buntline_rusty', name:'Buntline rouillée', type:'right_arm', level:72, price:5375, image:'images/items/right_arm/buntline_rusty.png?1', image_mini:'images/items/right_arm/mini/buntline_rusty.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{reflex:7}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[840] = {item_id:840, nshort:'buntline', name:'Buntline', type:'right_arm', level:75, price:6250, image:'images/items/right_arm/buntline.png?1', image_mini:'images/items/right_arm/mini/buntline.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{reflex:7}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[841] = {item_id:841, nshort:'buntline_accurate', name:'Buntline précise', type:'right_arm', level:78, price:7250, image:'images/items/right_arm/buntline_accurate.png?1', image_mini:'images/items/right_arm/mini/buntline_accurate.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{reflex:7}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[842] = {item_id:842, nshort:'buntline_wyattearp', name:'Buntline de Wyatt Earp', type:'right_arm', level:85, price:11200, image:'images/items/right_arm/buntline_wyattearp.png?1', image_mini:'images/items/right_arm/mini/buntline_wyattearp.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:7, aim:4, reflex:4, health:4}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[843] = {item_id:843, nshort:'boomerang', name:'Boomerang', type:'right_arm', level:8, price:126, image:'images/items/right_arm/boomerang.png?1', image_mini:'images/items/right_arm/mini/boomerang.png?1', characterClass:'duelist', characterSex:null, speed:null, bonus:{skills:{reflex:1}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\n\
items[844] = {item_id:844, nshort:'throwing_knives', name:'Poignard', type:'right_arm', level:33, price:1152, image:'images/items/right_arm/throwing_knives.png?1', image_mini:'images/items/right_arm/mini/throwing_knives.png?1', characterClass:'duelist', characterSex:null, speed:null, bonus:{skills:{hide:3}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\n\
items[845] = {item_id:845, nshort:'sawed_off', name:'Fusil de chasse scié', type:'right_arm', level:51, price:2940, image:'images/items/right_arm/sawed_off.png?1', image_mini:'images/items/right_arm/mini/sawed_off.png?1', characterClass:'duelist', characterSex:null, speed:null, bonus:{skills:{appearance:3, shot:2}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\n\
items[846] = {item_id:846, nshort:'trompet', name:'Trompette', type:'right_arm', level:20, price:1200, image:'images/items/right_arm/trompet.png?1', image_mini:'images/items/right_arm/mini/trompet.png?1', characterClass:'soldier', characterSex:null, speed:null, bonus:{skills:{}, attributes:{charisma:6}}, set:{key:null, name:null}, shop:'quest'};\n\
items[847] = {item_id:847, nshort:'remington_1890', name:'Revolver d\\'armée', type:'right_arm', level:78, price:7200, image:'images/items/right_arm/remington_1890.png?1', image_mini:'images/items/right_arm/mini/remington_1890.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{aim:7}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
\n\
\n\
items[854] = {item_id:854, nshort:'elixier', name:'Acide décapant', type:'right_arm', level:42, price:1500, image:'images/items/right_arm/elixier.png?1', image_mini:'images/items/right_arm/mini/elixier.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:2}, attributes:{}}, set:{key:'set_quackery', name:'Set de charlatan'}, shop:'shop'};\
items[856] = {item_id:856, nshort:'smells_like_eggspirit', name:'Œufs pourris', type:'right_arm', level:45, price:2500, image:'images/items/right_arm/smells_like_eggspirit.png?1', image_mini:'images/items/right_arm/mini/smells_like_eggspirit.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:'season_set', name:'Set spécial pour les fêtes'}, shop:'shop'};\
items[857] = {item_id:857, nshort:'fakegolden_gun', name:'Imitation d\\'un colt en or', type:'right_arm', level:80, price:10500, image:'images/items/right_arm/fakegolden_gun.png?1', image_mini:'images/items/right_arm/mini/fakegolden_gun.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{shot:5, aim:2}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[858] = {item_id:858, nshort:'golden_gun', name:'Colt en or', type:'right_arm', level:70, price:22500, image:'images/items/right_arm/golden_gun.png?1', image_mini:'images/items/right_arm/mini/golden_gun.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{shot:8, aim:4}, attributes:{}}, set:{key:'gold_set', name:'Set en or'}, shop:'shop'};\
items[859] = {item_id:859, nshort:'greenhorn_gun', name:'Fronde de blanc-bec', type:'right_arm', level:6, price:550, image:'images/items/right_arm/greenhorn_gun.png?1', image_mini:'images/items/right_arm/mini/greenhorn_gun.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{shot:1}, attributes:{}}, set:{key:'greenhorn_set', name:'Set du blanc-bec'}, shop:'shop'};\
\n\
\n\
items[1364] = {item_id:1364, nshort:'uniform_perfect', name:'Uniforme', type:'body', level:20, price:800, image:'images/items/body/uniform_perfect.png?1', image_mini:'images/items/body/mini/uniform_perfect.png?1', characterClass:'soldier', characterSex:null, speed:null, bonus:{skills:{appearance:3, hide:4}, attributes:{charisma:2}}, set:{key:null, name:null}, shop:'shop'};\
\n\
\n\
items[1701] = {item_id:1701, nshort:'arrow', name:'Flèche', type:'yield', level:null, price:5, image:'images/items/yield/arrow.png?1', image_mini:'images/items/yield/arrow.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[1702] = {item_id:1702, nshort:'compass', name:'Compas', type:'yield', level:null, price:380, image:'images/items/yield/compass.png?1', image_mini:'images/items/yield/compass.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{ride:3}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\n\
items[1703] = {item_id:1703, nshort:'lamp', name:'Lampe', type:'yield', level:null, price:80, image:'images/items/yield/lamp.png?1', image_mini:'images/items/yield/lamp.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\n\
\n\
\n\
items[1706] = {item_id:1706, nshort:'letter', name:'Lettre', type:'yield', level:null, price:1, image:'images/items/yield/letter.png?1', image_mini:'images/items/yield/letter.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\n\
\n\
items[1708] = {item_id:1708, nshort:'whiskey', name:'Whisky', type:'yield', level:null, price:10, image:'images/items/yield/whiskey.png?1', image_mini:'images/items/yield/whiskey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[1709] = {item_id:1709, nshort:'gold', name:'Trésor d\\'Indiens ', type:'yield', level:null, price:26000, image:'images/items/yield/gold.png?1', image_mini:'images/items/yield/gold.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[1710] = {item_id:1710, nshort:'key1', name:'1ère clé', type:'yield', level:null, price:42, image:'images/items/yield/key1.png?1', image_mini:'images/items/yield/key1.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'}; \
items[1711] = {item_id:1711, nshort:'key2', name:'2ème clé', type:'yield', level:null, price:46, image:'images/items/yield/key2.png?1', image_mini:'images/items/yield/key2.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\n\
items[1712] = {item_id:1712, nshort:'key3', name:'3ème clé', type:'yield', level:null, price:7500, image:'images/items/yield/key3.png?1', image_mini:'images/items/yield/key3.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[1713] = {item_id:1713, nshort:'easteregg', name:'Œuf de Pâques', type:'yield', level:null, price:20, image:'images/items/yield/easteregg.png?1', image_mini:'images/items/yield/easteregg.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
\n\
\n\
items[1715] = {item_id:1715, nshort:'cane', name:'Canne', type:'yield', level:42, price:2800, image:'images/items/yield/cane.png?1', image_mini:'images/items/yield/cane.png?1', characterClass:null, characterSex:'male', speed:null, bonus:{skills:{}, attributes:{charisma:2}}, set:{key:'set_gentleman', name:'Set du gentleman'}, shop:'quest'};\n\
items[1716] = {item_id:1716, nshort:'letter', name:'Lettre personnelle', type:'yield', level:null, price:2, image:'images/items/yield/letter.png?1', image_mini:'images/items/yield/letter.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[1717] = {item_id:1717, nshort:'chamber_pot', name:'Pot de chambre', type:'yield', level:null, price:750, image:'images/items/yield/chamber_pot.png?1', image_mini:'images/items/yield/chamber_pot.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:'set_sleeper', name:'Grincheux'}, shop:'shop'};\
\n\
\n\
items[1733] = {item_id:1733, nshort:'henrys_packet', name:'Le paquet de Henry', type:'yield', level:null, price:32, image:'images/items/yield/henrys_packet.png?1', image_mini:'images/items/yield/henrys_packet.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\n\
\n\
\n\
items[1750] = {item_id:1750, nshort:'ponytail', name:'Tresse', type:'yield', level:null, price:66, image:'images/items/yield/ponytail.png?1', image_mini:'images/items/yield/ponytail.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[1751] = {item_id:1751, nshort:'ruby', name:'Rubis', type:'yield', level:null, price:66, image:'images/items/yield/ruby.png?1', image_mini:'images/items/yield/ruby.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\n\
items[1752] = {item_id:1752, nshort:'egg1', name:'1. Œuf de Pâques', type:'yield', level:null, price:4, image:'images/items/yield/egg1.png?1', image_mini:'images/items/yield/egg1.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[1753] = {item_id:1753, nshort:'egg2', name:'2. Œuf de Pâques', type:'yield', level:null, price:4, image:'images/items/yield/egg2.png?1', image_mini:'images/items/yield/egg2.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\n\
items[1754] = {item_id:1754, nshort:'egg3', name:'3. Œuf de Pâques', type:'yield', level:null, price:4, image:'images/items/yield/egg3.png?1', image_mini:'images/items/yield/egg3.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\n\
items[1755] = {item_id:1755, nshort:'bag', name:'Sac de butin', type:'yield', level:null, price:2000, image:'images/items/yield/bag.png?1', image_mini:'images/items/yield/bag.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[1756] = {item_id:1756, nshort:'mask', name:'Masque', type:'yield', level:null, price:200, image:'images/items/yield/mask.png?1', image_mini:'images/items/yield/mask.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[1757] = {item_id:1757, nshort:'dfprocket1', name:'Prototype', type:'yield', level:null, price:1, image:'images/items/yield/dfprocket1.png?1', image_mini:'images/items/yield/dfprocket1.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\n\
items[1758] = {item_id:1758, nshort:'hgfrocket2', name:'Fusée mouillée', type:'yield', level:null, price:1, image:'images/items/yield/hgfrocket2.png?1', image_mini:'images/items/yield/hgfrocket2.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\n\
items[1759] = {item_id:1759, nshort:'dfgrocket1a', name:'Fusée de feu d\\'artifice', type:'yield', level:null, price:2700, image:'images/items/yield/dfgrocket1a.png?1', image_mini:'images/items/yield/dfgrocket1a.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{charisma:2, dexterity:2, flexibility:2, strength:2}}, set:{key:'season_set', name:'Set spécial pour les fêtes'}, shop:'shop'};\
items[1760] = {item_id:1760, nshort:'bucket', name:'Seau d\\'eau vide', type:'yield', level:null, price:20, image:'images/items/yield/bucket.png?1', image_mini:'images/items/yield/bucket.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[1761] = {item_id:1761, nshort:'bucket_full', name:'Seau d\\'eau plein', type:'yield', level:null, price:21, image:'images/items/yield/bucket_full.png?1', image_mini:'images/items/yield/bucket_full.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\n\
items[1762] = {item_id:1762, nshort:'bucket_fire', name:'Seau d\\'eau', type:'yield', level:null, price:25, image:'images/items/yield/bucket_fire.png?1', image_mini:'images/items/yield/bucket_fire.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:'fireworker_set', name:'Set de pompier'}, shop:'shop'};\
\n\
items[1764] = {item_id:1764, nshort:'treasuremap', name:'Une carte au trésor !', type:'yield', level:null, price:5543, image:'images/items/yield/treasuremap.png?1', image_mini:'images/items/yield/treasuremap.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
\n\
items[1766] = {item_id:1766, nshort:'mudball', name:'Un drôle de morceau de terre', type:'yield', level:null, price:1, image:'images/items/yield/mudball.png?1', image_mini:'images/items/yield/mudball.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\n\
items[1767] = {item_id:1767, nshort:'muditem', name:'Un objet sale', type:'yield', level:null, price:10, image:'images/items/yield/muditem.png?1', image_mini:'images/items/yield/muditem.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[1768] = {item_id:1768, nshort:'dustgun', name:'Un revolver poussiéreux', type:'yield', level:null, price:100, image:'images/items/yield/dustgun.png?1', image_mini:'images/items/yield/dustgun.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[1769] = {item_id:1769, nshort:'goldgun', name:'Un revolver doré', type:'yield', level:null, price:100, image:'images/items/yield/goldgun.png?1', image_mini:'images/items/yield/goldgun.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[1770] = {item_id:1770, nshort:'bloodycloth', name:'Morceau de tissu ensanglanté', type:'yield', level:null, price:1, image:'images/items/yield/bloodycloth.png?1', image_mini:'images/items/yield/bloodycloth.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\n\
items[1771] = {item_id:1771, nshort:'photo', name:'Vieille photo', type:'yield', level:null, price:1, image:'images/items/yield/photo.png?1', image_mini:'images/items/yield/photo.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\n\
items[1772] = {item_id:1772, nshort:'umbrella', name:'Ombrelle de Kudram', type:'yield', level:42, price:2800, image:'images/items/yield/umbrella.png?1', image_mini:'images/items/yield/umbrella.png?1', characterClass:null, characterSex:'female', speed:null, bonus:{skills:{trade:8, finger_dexterity:6, endurance:10}, attributes:{strength:1}}, set:{key:'set_dancer', name:'Set de danseuse'}, shop:'shop'};\
items[1773] = {item_id:1773, nshort:'testament', name:'Testament', type:'yield', level:null, price:1, image:'images/items/yield/testament.png?1', image_mini:'images/items/yield/testament.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[1774] = {item_id:1774, nshort:'engagementring', name:'Bague de fiançailles', type:'yield', level:null, price:1, image:'images/items/yield/engagementring.png?1', image_mini:'images/items/yield/engagementring.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[1775] = {item_id:1775, nshort:'birthcertificate', name:'Acte de naissance', type:'yield', level:null, price:1, image:'images/items/yield/birthcertificate.png?1', image_mini:'images/items/yield/birthcertificate.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'}; \
items[1776] = {item_id:1776, nshort:'darkplans', name:'Sombres projets', type:'yield', level:null, price:1, image:'images/items/yield/darkplans.png?1', image_mini:'images/items/yield/darkplans.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[1777] = {item_id:1777, nshort:'docreport', name:'Certificat', type:'yield', level:null, price:1, image:'images/items/yield/docreport.png?1', image_mini:'images/items/yield/docreport.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\n\
items[1778] = {item_id:1778, nshort:'brandingiron', name:'Un fer à marquer tordu', type:'yield', level:null, price:1, image:'images/items/yield/brandingiron.png?1', image_mini:'images/items/yield/brandingiron.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\n\
items[1779] = {item_id:1779, nshort:'cardpiece1', name:'1er morceau de carte', type:'yield', level:null, price:1, image:'images/items/yield/cardpiece1.png?1', image_mini:'images/items/yield/cardpiece1.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\n\
items[1780] = {item_id:1780, nshort:'cardpiece2', name:'2ème morceau de carte', type:'yield', level:null, price:1, image:'images/items/yield/cardpiece2.png?1', image_mini:'images/items/yield/cardpiece2.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\n\
items[1781] = {item_id:1781, nshort:'cardpiece3', name:'3ème morceau de carte', type:'yield', level:null, price:1, image:'images/items/yield/cardpiece3.png?1', image_mini:'images/items/yield/cardpiece3.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\n\
items[1782] = {item_id:1782, nshort:'cardpiece4', name:'4ème morceau de carte', type:'yield', level:null, price:1, image:'images/items/yield/cardpiece4.png?1', image_mini:'images/items/yield/cardpiece4.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\n\
items[1783] = {item_id:1783, nshort:'cardcomplete', name:'La carte complète', type:'yield', level:null, price:1, image:'images/items/yield/cardcomplete.png?1', image_mini:'images/items/yield/cardcomplete.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[1784] = {item_id:1784, nshort:'itemlist', name:'Liste d\\'objets', type:'yield', level:null, price:1, image:'images/items/yield/itemlist.png?1', image_mini:'images/items/yield/itemlist.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\n\
items[1785] = {item_id:1785, nshort:'torch', name:'Torche', type:'yield', level:null, price:1, image:'images/items/yield/torch.png?1', image_mini:'images/items/yield/torch.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\n\
items[1786] = {item_id:1786, nshort:'bagpack', name:'Sac à dos', type:'yield', level:null, price:1, image:'images/items/yield/bagpack.png?1', image_mini:'images/items/yield/bagpack.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\n\
items[1787] = {item_id:1787, nshort:'ashes', name:'Cendres', type:'yield', level:null, price:1, image:'images/items/yield/ashes.png?1', image_mini:'images/items/yield/ashes.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[1788] = {item_id:1788, nshort:'gravel', name:'Cailloux', type:'yield', level:null, price:10, image:'images/items/yield/gravel.png?1', image_mini:'images/items/yield/gravel.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[1789] = {item_id:1789, nshort:'brokenshovel', name:'Bêche cassée', type:'yield', level:null, price:50, image:'images/items/yield/brokenshovel.png?1', image_mini:'images/items/yield/brokenshovel.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\n\
items[1790] = {item_id:1790, nshort:'treeboat', name:'Tronc creux', type:'yield', level:null, price:50, image:'images/items/yield/treeboat.png?1', image_mini:'images/items/yield/treeboat.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\n\
items[1791] = {item_id:1791, nshort:'golddust', name:'Poudre d\\'or', type:'yield', level:null, price:100, image:'images/items/yield/golddust.png?1', image_mini:'images/items/yield/golddust.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\n\
items[1792] = {item_id:1792, nshort:'goldnugget', name:'Pièce d\\'or', type:'yield', level:null, price:5000, image:'images/items/yield/goldnugget.png?1', image_mini:'images/items/yield/goldnugget.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[1793] = {item_id:1793, nshort:'bendmetall', name:'Morceau de métal sale et tordu', type:'yield', level:null, price:1, image:'images/items/yield/bendmetall.png?1', image_mini:'images/items/yield/bendmetall.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\n\
items[1794] = {item_id:1794, nshort:'dirtymetall', name:'Morceau de métal sale', type:'yield', level:null, price:10, image:'images/items/yield/dirtymetall.png?1', image_mini:'images/items/yield/dirtymetall.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\n\
items[1795] = {item_id:1795, nshort:'goldblade', name:'Lame en or nettoyé', type:'yield', level:null, price:100, image:'images/items/yield/goldblade.png?1', image_mini:'images/items/yield/goldblade.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\n\
items[1796] = {item_id:1796, nshort:'sharpgoldblade', name:'Lame en or affutée', type:'yield', level:null, price:100, image:'images/items/yield/sharpgoldblade.png?1', image_mini:'images/items/yield/sharpgoldblade.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\n\
items[1797] = {item_id:1797, nshort:'sheriffpaper', name:'Rapport du shérif', type:'yield', level:null, price:10, image:'images/items/yield/sheriffpaper.png?1', image_mini:'images/items/yield/sheriffpaper.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\n\
\n\
items[1799] = {item_id:1799, nshort:'crystallball', name:'Boule de cristal', type:'yield', level:null, price:10000, image:'images/items/yield/crystallball.png?1', image_mini:'images/items/yield/crystallball.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\n\
items[1800] = {item_id:1800, nshort:'toadblood', name:'Sang de crapaud', type:'yield', level:null, price:10, image:'images/items/yield/toadblood.png?1', image_mini:'images/items/yield/toadblood.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\n\
items[1801] = {item_id:1801, nshort:'coyoteheart', name:'Cœur de coyote', type:'yield', level:null, price:10, image:'images/items/yield/coyoteheart.png?1', image_mini:'images/items/yield/coyoteheart.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\n\
items[1802] = {item_id:1802, nshort:'phantomdrawing', name:'Portrait-robot', type:'yield', level:null, price:10, image:'images/items/yield/phantomdrawing.png?1', image_mini:'images/items/yield/phantomdrawing.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\n\
items[1803] = {item_id:1803, nshort:'candyorange', name:'Orange confite', type:'yield', level:null, price:10, image:'images/items/yield/candyorange.png?1', image_mini:'images/items/yield/candyorange.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\n\
items[1804] = {item_id:1804, nshort:'smellingfish', name:'Poisson pourri', type:'yield', level:null, price:10, image:'images/items/yield/smellingfish.png?1', image_mini:'images/items/yield/smellingfish.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\n\
items[1805] = {item_id:1805, nshort:'needleandthreat', name:'Du fil et des aiguilles', type:'yield', level:null, price:5, image:'images/items/yield/needleandthreat.png?1', image_mini:'images/items/yield/needleandthreat.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[1806] = {item_id:1806, nshort:'cottonbale', name:'Balle de coton', type:'yield', level:null, price:15, image:'images/items/yield/cottonbale.png?1', image_mini:'images/items/yield/cottonbale.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[1807] = {item_id:1807, nshort:'sock', name:'Chaussette', type:'yield', level:null, price:0, image:'images/items/yield/sock.png?1', image_mini:'images/items/yield/sock.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[1808] = {item_id:1808, nshort:'potatoe', name:'Pomme de terre', type:'yield', level:null, price:5, image:'images/items/yield/potatoe.png?1', image_mini:'images/items/yield/potatoe.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[1809] = {item_id:1809, nshort:'hay', name:'Foin', type:'yield', level:null, price:5, image:'images/items/yield/hay.png?1', image_mini:'images/items/yield/hay.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[1810] = {item_id:1810, nshort:'pumpkin', name:'Potiron', type:'yield', level:null, price:25, image:'images/items/yield/pumpkin.png?1', image_mini:'images/items/yield/pumpkin.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[1811] = {item_id:1811, nshort:'blueberries', name:'Myrtilles', type:'yield', level:null, price:15, image:'images/items/yield/blueberries.png?1', image_mini:'images/items/yield/blueberries.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[1812] = {item_id:1812, nshort:'pit', name:'Noyaux', type:'yield', level:null, price:1, image:'images/items/yield/pit.png?1', image_mini:'images/items/yield/pit.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[1813] = {item_id:1813, nshort:'eagle_feather', name:'Plume d\\'aigle', type:'yield', level:null, price:35, image:'images/items/yield/eagle_feather.png?1', image_mini:'images/items/yield/eagle_feather.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[1814] = {item_id:1814, nshort:'lotus', name:'Fleur de lotus', type:'yield', level:null, price:45, image:'images/items/yield/lotus.png?1', image_mini:'images/items/yield/lotus.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[1815] = {item_id:1815, nshort:'crabmeat', name:'Chair de crabe', type:'yield', level:null, price:12, image:'images/items/yield/crabmeat.png?1', image_mini:'images/items/yield/crabmeat.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[1816] = {item_id:1816, nshort:'chalk', name:'Craie', type:'yield', level:null, price:2, image:'images/items/yield/chalk.png?1', image_mini:'images/items/yield/chalk.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[1817] = {item_id:1817, nshort:'sheriffstar', name:'Étoile de shérif', type:'yield', level:null, price:50, image:'images/items/yield/sheriffstar.png?1', image_mini:'images/items/yield/sheriffstar.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[1818] = {item_id:1818, nshort:'sulfurstone', name:'Pierre de soufre', type:'yield', level:null, price:25, image:'images/items/yield/sulfurstone.png?1', image_mini:'images/items/yield/sulfurstone.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[1819] = {item_id:1819, nshort:'pokergame', name:'Partie de poker', type:'yield', level:null, price:150, image:'images/items/yield/pokergame.png?1', image_mini:'images/items/yield/pokergame.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[1820] = {item_id:1820, nshort:'snakehide', name:'Peau de serpent', type:'yield', level:null, price:27, image:'images/items/yield/snakehide.png?1', image_mini:'images/items/yield/snakehide.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[1821] = {item_id:1821, nshort:'salpetersalt', name:'Sel de salpêtre', type:'yield', level:null, price:13, image:'images/items/yield/salpetersalt.png?1', image_mini:'images/items/yield/salpetersalt.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[1822] = {item_id:1822, nshort:'cigaretts', name:'Cigarettes', type:'yield', level:null, price:3, image:'images/items/yield/cigaretts.png?1', image_mini:'images/items/yield/cigaretts.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[1823] = {item_id:1823, nshort:'rodeo_trophy', name:'Trophée de rodéo', type:'yield', level:null, price:3, image:'images/items/yield/rodeo_trophy.png?1', image_mini:'images/items/yield/rodeo_trophy.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[1824] = {item_id:1824, nshort:'cougar_hide', name:'Peau de puma', type:'yield', level:null, price:55, image:'images/items/yield/cougar_hide.png?1', image_mini:'images/items/yield/cougar_hide.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[1825] = {item_id:1825, nshort:'indigo', name:'Indigo', type:'yield', level:null, price:65, image:'images/items/yield/indigo.png?1', image_mini:'images/items/yield/indigo.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[1826] = {item_id:1826, nshort:'rum', name:'Rhum', type:'yield', level:null, price:7, image:'images/items/yield/rum.png?1', image_mini:'images/items/yield/rum.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[1827] = {item_id:1827, nshort:'lead', name:'Plomb', type:'yield', level:null, price:27, image:'images/items/yield/lead.png?1', image_mini:'images/items/yield/lead.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[1828] = {item_id:1828, nshort:'uncut_ruby', name:'Rubis brut', type:'yield', level:null, price:75, image:'images/items/yield/uncut_ruby.png?1', image_mini:'images/items/yield/uncut_ruby.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[1829] = {item_id:1829, nshort:'uncut_emerald', name:'Émeraude brute', type:'yield', level:null, price:55, image:'images/items/yield/uncut_emerald.png?1', image_mini:'images/items/yield/uncut_emerald.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[1830] = {item_id:1830, nshort:'uncut_diamond', name:'Diamant brut', type:'yield', level:null, price:100, image:'images/items/yield/uncut_diamond.png?1', image_mini:'images/items/yield/uncut_diamond.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[1831] = {item_id:1831, nshort:'woodcross', name:'Croix de bois', type:'yield', level:null, price:3, image:'images/items/yield/woodcross.png?1', image_mini:'images/items/yield/woodcross.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[1832] = {item_id:1832, nshort:'metall_chip', name:'Jeton en métal', type:'yield', level:null, price:50, image:'images/items/yield/metall_chip.png?1', image_mini:'images/items/yield/metall_chip.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[1833] = {item_id:1833, nshort:'death_warrant', name:'Arrêt de mort', type:'yield', level:null, price:5, image:'images/items/yield/death_warrant.png?1', image_mini:'images/items/yield/death_warrant.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[1834] = {item_id:1834, nshort:'peaceflower', name:'Fleur de paix', type:'yield', level:null, price:1, image:'images/items/yield/peaceflower.png?1', image_mini:'images/items/yield/peaceflower.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[1835] = {item_id:1835, nshort:'rose', name:'Rose', type:'yield', level:null, price:10, image:'images/items/yield/rose.png?1', image_mini:'images/items/yield/rose.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[1836] = {item_id:1836, nshort:'marriage_certificate', name:'Acte de mariage', type:'yield', level:null, price:2, image:'images/items/yield/marriage_certificate.png?1', image_mini:'images/items/yield/marriage_certificate.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'drop'};\n\
items[1837] = {item_id:1837, nshort:'printing_plate', name:'Clichés', type:'yield', level:null, price:150, image:'images/items/yield/printing_plate.png?1', image_mini:'images/items/yield/printing_plate.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[1838] = {item_id:1838, nshort:'wolf_geislein', name:'Loup avec un gros ventre', type:'yield', level:null, price:3, image:'images/items/yield/wolf_geislein.png?1', image_mini:'images/items/yield/wolf_geislein.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'}; \
items[1839] = {item_id:1839, nshort:'geislein', name:'Chevreau', type:'yield', level:null, price:75, image:'images/items/yield/geislein.png?1', image_mini:'images/items/yield/geislein.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[1840] = {item_id:1840, nshort:'bunny', name:'Lapin', type:'yield', level:null, price:75, image:'images/items/yield/bunny.png?1', image_mini:'images/items/yield/bunny.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[1841] = {item_id:1841, nshort:'elefant', name:'Éléphant', type:'yield', level:null, price:75, image:'images/items/yield/elefant.png?1', image_mini:'images/items/yield/elefant.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[1842] = {item_id:1842, nshort:'lion', name:'Lion', type:'yield', level:null, price:75, image:'images/items/yield/lion.png?1', image_mini:'images/items/yield/lion.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[1843] = {item_id:1843, nshort:'brownbear', name:'Ours brun', type:'yield', level:null, price:50, image:'images/items/yield/brownbear.png?1', image_mini:'images/items/yield/brownbear.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[1844] = {item_id:1844, nshort:'wolf2', name:'Loup', type:'yield', level:null, price:25, image:'images/items/yield/wolf2.png?1', image_mini:'images/items/yield/wolf2.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[1845] = {item_id:1845, nshort:'snake', name:'Serpent', type:'yield', level:null, price:10, image:'images/items/yield/snake.png?1', image_mini:'images/items/yield/snake.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[1846] = {item_id:1846, nshort:'dwarfpony', name:'Petit poney', type:'yield', level:null, price:35, image:'images/items/yield/dwarfpony.png?1', image_mini:'images/items/yield/dwarfpony.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[1847] = {item_id:1847, nshort:'eagle', name:'Aigle de mer', type:'yield', level:null, price:350, image:'images/items/yield/eagle.png?1', image_mini:'images/items/yield/eagle.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[1848] = {item_id:1848, nshort:'cougar', name:'Puma', type:'yield', level:null, price:250, image:'images/items/yield/cougar.png?1', image_mini:'images/items/yield/cougar.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[1849] = {item_id:1849, nshort:'sheriff_helper', name:'Étoile de shérif', type:'yield', level:null, price:1, image:'images/items/yield/sheriff_helper.png?1', image_mini:'images/items/yield/sheriff_helper.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[1850] = {item_id:1850, nshort:'animal_card', name:'Carte montrant les cachettes des animaux', type:'yield', level:null, price:1, image:'images/items/yield/animal_card.png?1', image_mini:'images/items/yield/animal_card.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[1851] = {item_id:1851, nshort:'elixir_bear', name:'L\\'élixir de l\\'ours', type:'yield', level:null, price:1, image:'images/items/yield/elixir_bear.png?1', image_mini:'images/items/yield/elixir_bear.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[1852] = {item_id:1852, nshort:'elixir_cougar', name:'L\\'élixir du puma', type:'yield', level:null, price:1, image:'images/items/yield/elixir_cougar.png?1', image_mini:'images/items/yield/elixir_cougar.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[1853] = {item_id:1853, nshort:'elixir_eagle', name:'L\\'élixir de l\\'aigle', type:'yield', level:null, price:1, image:'images/items/yield/elixir_eagle.png?1', image_mini:'images/items/yield/elixir_eagle.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[1854] = {item_id:1854, nshort:'elixir_snake', name:'L\\'élixir du serpent', type:'yield', level:null, price:1, image:'images/items/yield/elixir_snake.png?1', image_mini:'images/items/yield/elixir_snake.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[1855] = {item_id:1855, nshort:'charcoal', name:'Charbon de bois', type:'yield', level:null, price:31, image:'images/items/yield/charcoal.png?1', image_mini:'images/items/yield/charcoal.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[1856] = {item_id:1856, nshort:'waterjar', name:'Cruche d\\'eau', type:'yield', level:null, price:30, image:'images/items/yield/waterjar.png?1', image_mini:'images/items/yield/waterjar.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[1857] = {item_id:1857, nshort:'fieldbottle', name:'Gourde', type:'yield', level:null, price:130, image:'images/items/yield/fieldbottle.png?1', image_mini:'images/items/yield/fieldbottle.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[1858] = {item_id:1858, nshort:'workingknife', name:'Couteau', type:'yield', level:null, price:120, image:'images/items/yield/workingknife.png?1', image_mini:'images/items/yield/workingknife.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[1859] = {item_id:1859, nshort:'cookingpan', name:'Poêle', type:'yield', level:null, price:74, image:'images/items/yield/cookingpan.png?1', image_mini:'images/items/yield/cookingpan.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[1860] = {item_id:1860, nshort:'cuttingwood', name:'Planche à découper', type:'yield', level:null, price:56, image:'images/items/yield/cuttingwood.png?1', image_mini:'images/items/yield/cuttingwood.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[1861] = {item_id:1861, nshort:'flint', name:'Boîte d\\'amadou', type:'yield', level:null, price:32, image:'images/items/yield/flint.png?1', image_mini:'images/items/yield/flint.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[1862] = {item_id:1862, nshort:'cornflour', name:'Farine de maïs', type:'yield', level:null, price:20, image:'images/items/yield/cornflour.png?1', image_mini:'images/items/yield/cornflour.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[1863] = {item_id:1863, nshort:'beansandbacon', name:'Haricots avec du lard', type:'yield', level:null, price:133, image:'images/items/yield/beansandbacon.png?1', image_mini:'images/items/yield/beansandbacon.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[1864] = {item_id:1864, nshort:'marmelade', name:'Confiture', type:'yield', level:null, price:130, image:'images/items/yield/marmelade.png?1', image_mini:'images/items/yield/marmelade.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[1865] = {item_id:1865, nshort:'mash', name:'Maische', type:'yield', level:null, price:90, image:'images/items/yield/mash.png?1', image_mini:'images/items/yield/mash.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[1866] = {item_id:1866, nshort:'dough', name:'Pâte', type:'yield', level:null, price:41, image:'images/items/yield/dough.png?1', image_mini:'images/items/yield/dough.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[1867] = {item_id:1867, nshort:'seasonedsteak', name:'Steak mariné', type:'yield', level:null, price:115, image:'images/items/yield/seasonedsteak.png?1', image_mini:'images/items/yield/seasonedsteak.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
\n\
\n\
items[1880] = {item_id:1880, nshort:'gum', name:'Résine', type:'yield', level:null, price:64, image:'images/items/yield/gum.png?1', image_mini:'images/items/yield/gum.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[1881] = {item_id:1881, nshort:'sulfur', name:'Soufre', type:'yield', level:null, price:47, image:'images/items/yield/sulfur.png?1', image_mini:'images/items/yield/sulfur.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[1883] = {item_id:1883, nshort:'stomach', name:'Remède pour l\\'estomac', type:'yield', level:null, price:48, image:'images/items/yield/stomach.png?1', image_mini:'images/items/yield/stomach.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[1887] = {item_id:1887, nshort:'fetish', name:'Idole', type:'yield', level:null, price:288, image:'images/items/yield/fetish.png?1', image_mini:'images/items/yield/fetish.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[1899] = {item_id:1899, nshort:'hotiron', name:'Fer fondu', type:'yield', level:null, price:72, image:'images/items/yield/hotiron.png?1', image_mini:'images/items/yield/hotiron.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[1900] = {item_id:1900, nshort:'bajonett', name:'Baïonnette', type:'yield', level:null, price:154, image:'images/items/yield/bajonett.png?1', image_mini:'images/items/yield/bajonett.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[1901] = {item_id:1901, nshort:'weightstone', name:'Poids', type:'yield', level:null, price:108, image:'images/items/yield/weightstone.png?1', image_mini:'images/items/yield/weightstone.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[1902] = {item_id:1902, nshort:'steel', name:'Acier', type:'yield', level:null, price:100, image:'images/items/yield/steel.png?1', image_mini:'images/items/yield/steel.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[1904] = {item_id:1904, nshort:'forge', name:'Enclume', type:'yield', level:null, price:246, image:'images/items/yield/forge.png?1', image_mini:'images/items/yield/forge.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
\n\
items[1917] = {item_id:1917, nshort:'leatherband', name:'Sangle en cuir', type:'yield', level:null, price:60, image:'images/items/yield/leatherband.png?1', image_mini:'images/items/yield/leatherband.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[1919] = {item_id:1919, nshort:'powerfood', name:'Granulés énergisants', type:'yield', level:null, price:32, image:'images/items/yield/powerfood.png?1', image_mini:'images/items/yield/powerfood.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[1935] = {item_id:1935, nshort:'fixed_spade', name:'Bêche collée', type:'yield', level:null, price:15, image:'images/items/yield/fixed_spade.png?1', image_mini:'images/items/yield/fixed_spade.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[1936] = {item_id:1936, nshort:'money_bag', name:'Porte-monnaie', type:'yield', level:null, price:25, image:'images/items/yield/money_bag.png?1', image_mini:'images/items/yield/money_bag.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[1937] = {item_id:1937, nshort:'travelbag', name:'Sac de voyage', type:'yield', level:null, price:22, image:'images/items/yield/travelbag.png?1', image_mini:'images/items/yield/travelbag.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[1938] = {item_id:1938, nshort:'sharpweapon', name:'Arme aiguisée', type:'yield', level:null, price:16, image:'images/items/yield/sharpweapon.png?1', image_mini:'images/items/yield/sharpweapon.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[1939] = {item_id:1939, nshort:'filtercigaretts', name:'Cigarette', type:'yield', level:null, price:29, image:'images/items/yield/filtercigaretts.png?1', image_mini:'images/items/yield/filtercigaretts.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[1940] = {item_id:1940, nshort:'cake_piece', name:'Part de gâteau', type:'yield', level:null, price:17, image:'images/items/yield/cake_piece.png?1', image_mini:'images/items/yield/cake_piece.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[1941] = {item_id:1941, nshort:'tomato_mash', name:'Purée de tomates', type:'yield', level:null, price:6, image:'images/items/yield/tomato_mash.png?1', image_mini:'images/items/yield/tomato_mash.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[1942] = {item_id:1942, nshort:'tomato_sauce', name:'Sauce à la tomate', type:'yield', level:null, price:15, image:'images/items/yield/tomato_sauce.png?1', image_mini:'images/items/yield/tomato_sauce.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[1943] = {item_id:1943, nshort:'baked_beans', name:'Haricots cuisinés', type:'yield', level:null, price:50, image:'images/items/yield/baked_beans.png?1', image_mini:'images/items/yield/baked_beans.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[1944] = {item_id:1944, nshort:'raw_pyrit', name:'Pyrite brute', type:'yield', level:null, price:16, image:'images/items/yield/raw_pyrit.png?1', image_mini:'images/items/yield/raw_pyrit.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[1945] = {item_id:1945, nshort:'pyritsun', name:'Soleil de pyrite', type:'yield', level:null, price:20, image:'images/items/yield/pyritsun.png?1', image_mini:'images/items/yield/pyritsun.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[1946] = {item_id:1946, nshort:'pyrit_amulett', name:'Amulette', type:'yield', level:null, price:50, image:'images/items/yield/pyrit_amulett.png?1', image_mini:'images/items/yield/pyrit_amulett.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[1947] = {item_id:1947, nshort:'graphit', name:'Graphite', type:'yield', level:null, price:20, image:'images/items/yield/graphit.png?1', image_mini:'images/items/yield/graphit.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[1948] = {item_id:1948, nshort:'graphitpulver', name:'Poudre de graphite', type:'yield', level:null, price:25, image:'images/items/yield/graphitpulver.png?1', image_mini:'images/items/yield/graphitpulver.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[1949] = {item_id:1949, nshort:'graphit_glue', name:'Lubrifiant de graphite', type:'yield', level:null, price:50, image:'images/items/yield/graphit_glue.png?1', image_mini:'images/items/yield/graphit_glue.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[1952] = {item_id:1952, nshort:'foodsac', name:'Sac à nourriture', type:'yield', level:null, price:50, image:'images/items/yield/foodsac.png?1', image_mini:'images/items/yield/foodsac.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[1953] = {item_id:1953, nshort:'simple_bow', name:'Arc', type:'yield', level:null, price:50, image:'images/items/yield/simple_bow.png?1', image_mini:'images/items/yield/simple_bow.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[1954] = {item_id:1954, nshort:'simple_rifle', name:'Fusil', type:'yield', level:null, price:50, image:'images/items/yield/simple_rifle.png?1', image_mini:'images/items/yield/simple_rifle.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[1956] = {item_id:1956, nshort:'totem_snake', name:'Totem des serpents', type:'yield', level:1, price:10, image:'images/items/yield/totem_snake.png?1', image_mini:'images/items/yield/totem_snake.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[1957] = {item_id:1957, nshort:'totem_cougart', name:'Totem des pumas', type:'yield', level:1, price:10, image:'images/items/yield/totem_cougart.png?1', image_mini:'images/items/yield/totem_cougart.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[1958] = {item_id:1958, nshort:'totem_eagle', name:'Totem des aigles', type:'yield', level:1, price:10, image:'images/items/yield/totem_eagle.png?1', image_mini:'images/items/yield/totem_eagle.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
\n\
\n\
items[10000] = {item_id:10000, nshort:'shredded_grey', name:'Pantalon gris déchiré', type:'pants', level:1, price:10, image:'images/items/pants/shredded_grey.png?1', image_mini:'images/items/pants/mini/shredded_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{ride:1}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[10001] = {item_id:10001, nshort:'shredded_yellow', name:'Pantalon jaune déchiré', type:'pants', level:1, price:35, image:'images/items/pants/shredded_yellow.png?1', image_mini:'images/items/pants/mini/shredded_yellow.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:1, leadership:1}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[10002] = {item_id:10002, nshort:'shredded_blue', name:'Pantalon bleu déchiré', type:'pants', level:2, price:55, image:'images/items/pants/shredded_blue.png?1', image_mini:'images/items/pants/mini/shredded_blue.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{animal:2, ride:1}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[10003] = {item_id:10003, nshort:'shredded_green', name:'Pantalon vert déchiré', type:'pants', level:2, price:65, image:'images/items/pants/shredded_green.png?1', image_mini:'images/items/pants/mini/shredded_green.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{swim:1, punch:2, build:1}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[10004] = {item_id:10004, nshort:'shredded_brown', name:'Pantalon marron déchiré', type:'pants', level:3, price:95, image:'images/items/pants/shredded_brown.png?1', image_mini:'images/items/pants/mini/shredded_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:1, leadership:1}, attributes:{charisma:1}}, set:{key:null, name:null}, shop:'shop'};\
items[10005] = {item_id:10005, nshort:'shredded_black', name:'Pantalon noir déchiré', type:'pants', level:3, price:95, image:'images/items/pants/shredded_black.png?1', image_mini:'images/items/pants/mini/shredded_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{pitfall:1, endurance:1}, attributes:{strength:1}}, set:{key:null, name:null}, shop:'shop'};\
items[10006] = {item_id:10006, nshort:'shredded_p1', name:'Pantalon élégant déchiré', type:'pants', level:4, price:290, image:'images/items/pants/shredded_p1.png?1', image_mini:'images/items/pants/mini/shredded_p1.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{hide:1, reflex:1, ride:3}, attributes:{flexibility:1}}, set:{key:null, name:null}, shop:'shop'};\
items[10007] = {item_id:10007, nshort:'shredded_fine', name:'Pantalon déchiré de Jim', type:'pants', level:6, price:420, image:'images/items/pants/shredded_fine.png?1', image_mini:'images/items/pants/mini/shredded_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{repair:3, finger_dexterity:3, endurance:3, build:6}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
\n\
items[10010] = {item_id:10010, nshort:'shorts_grey', name:'Short gris', type:'pants', level:7, price:232, image:'images/items/pants/shorts_grey.png?1', image_mini:'images/items/pants/mini/shorts_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:3, swim:3, ride:4}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[10011] = {item_id:10011, nshort:'shorts_yellow', name:'Short jaune', type:'pants', level:8, price:430, image:'images/items/pants/shorts_yellow.png?1', image_mini:'images/items/pants/mini/shorts_yellow.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:5, hide:7}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[10012] = {item_id:10012, nshort:'shorts_blue', name:'Short bleu', type:'pants', level:8, price:430, image:'images/items/pants/shorts_blue.png?1', image_mini:'images/items/pants/mini/shorts_blue.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{animal:6, trade:2, ride:5}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[10013] = {item_id:10013, nshort:'shorts_green', name:'Short vert', type:'pants', level:8, price:430, image:'images/items/pants/shorts_green.png?1', image_mini:'images/items/pants/mini/shorts_green.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{repair:5, punch:4, build:5}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[10014] = {item_id:10014, nshort:'shorts_brown', name:'Short marron', type:'pants', level:9, price:470, image:'images/items/pants/shorts_brown.png?1', image_mini:'images/items/pants/mini/shorts_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{pitfall:5, shot:3, endurance:3}, attributes:{strength:1}}, set:{key:null, name:null}, shop:'shop'};\
items[10015] = {item_id:10015, nshort:'shorts_black', name:'Short noir', type:'pants', level:9, price:480, image:'images/items/pants/shorts_black.png?1', image_mini:'images/items/pants/mini/shorts_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{trade:4, leadership:6}, attributes:{charisma:1}}, set:{key:null, name:null}, shop:'shop'};\
items[10016] = {item_id:10016, nshort:'shorts_p1', name:'Short élégant', type:'pants', level:10, price:1280, image:'images/items/pants/shorts_p1.png?1', image_mini:'images/items/pants/mini/shorts_p1.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:6, finger_dexterity:8, reflex:5, tough:4}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[10017] = {item_id:10017, nshort:'shorts_fine', name:'Short de Franck Butler', type:'pants', level:12, price:1460, image:'images/items/pants/shorts_fine.png?1', image_mini:'images/items/pants/mini/shorts_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{shot:8, aim:7, dodge:7, health:6}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
\n\
\n\
items[10020] = {item_id:10020, nshort:'puritan_grey', name:'Pantalon simple gris', type:'pants', level:12, price:360, image:'images/items/pants/puritan_grey.png?1', image_mini:'images/items/pants/mini/puritan_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{hide:2, ride:5, punch:4}, attributes:{strength:1}}, set:{key:null, name:null}, shop:'shop'};\n\
items[10021] = {item_id:10021, nshort:'puritan_yellow', name:'Pantalon simple jaune', type:'pants', level:13, price:600, image:'images/items/pants/puritan_yellow.png?1', image_mini:'images/items/pants/mini/puritan_yellow.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{hide:6, reflex:5}, attributes:{dexterity:1, flexibility:1}}, set:{key:null, name:null}, shop:'shop'};\
items[10022] = {item_id:10022, nshort:'puritan_blue', name:'Pantalon simple bleu', type:'pants', level:13, price:640, image:'images/items/pants/puritan_blue.png?1', image_mini:'images/items/pants/mini/puritan_blue.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{pitfall:4, swim:10}, attributes:{strength:1}}, set:{key:null, name:null}, shop:'shop'};\
items[10023] = {item_id:10023, nshort:'puritan_green', name:'Pantalon simple vert', type:'pants', level:13, price:630, image:'images/items/pants/puritan_green.png?1', image_mini:'images/items/pants/mini/puritan_green.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:7, endurance:5, build:8}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[10024] = {item_id:10024, nshort:'puritan_brown', name:'Pantalon simple marron', type:'pants', level:14, price:650, image:'images/items/pants/puritan_brown.png?1', image_mini:'images/items/pants/mini/puritan_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:8, finger_dexterity:7, tough:6}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[10025] = {item_id:10025, nshort:'puritan_black', name:'Pantalon simple noir', type:'pants', level:14, price:670, image:'images/items/pants/puritan_black.png?1', image_mini:'images/items/pants/mini/puritan_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{animal:9, trade:5, shot:7}, attributes:{}}, set:{key:'set_farmer', name:'Set de fermier'}, shop:'shop'};\
items[10026] = {item_id:10026, nshort:'puritan_p1', name:'Pantalon simple élégant', type:'pants', level:15, price:1680, image:'images/items/pants/puritan_p1.png?1', image_mini:'images/items/pants/mini/puritan_p1.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{pitfall:5, reflex:9}, attributes:{dexterity:1, strength:2}}, set:{key:null, name:null}, shop:'shop'};\
items[10027] = {item_id:10027, nshort:'puritan_fine', name:'Pantalon simple de Huckleberry', type:'pants', level:16, price:1800, image:'images/items/pants/puritan_fine.png?1', image_mini:'images/items/pants/mini/puritan_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{repair:6, finger_dexterity:6, swim:8, build:12}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
\n\
\n\
items[10030] = {item_id:10030, nshort:'shortscheck_grey', name:'Pantalon de golf gris', type:'pants', level:16, price:610, image:'images/items/pants/shortscheck_grey.png?1', image_mini:'images/items/pants/mini/shortscheck_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{endurance:10, punch:7}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[10031] = {item_id:10031, nshort:'shortscheck_yellow', name:'Pantalon de golf jaune', type:'pants', level:17, price:1520, image:'images/items/pants/shortscheck_yellow.png?1', image_mini:'images/items/pants/mini/shortscheck_yellow.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{repair:10, pitfall:8}, attributes:{dexterity:1}}, set:{key:null, name:null}, shop:'shop'};\n\
items[10032] = {item_id:10032, nshort:'shortscheck_blue', name:'Pantalon de golf bleu', type:'pants', level:17, price:1560, image:'images/items/pants/shortscheck_blue.png?1', image_mini:'images/items/pants/mini/shortscheck_blue.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{charisma:2, dexterity:3, flexibility:1, strength:3}}, set:{key:null, name:null}, shop:'shop'};\
items[10033] = {item_id:10033, nshort:'shortscheck_green', name:'Pantalon de golf vert', type:'pants', level:17, price:1520, image:'images/items/pants/shortscheck_green.png?1', image_mini:'images/items/pants/mini/shortscheck_green.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{hide:10, tough:8}, attributes:{charisma:1}}, set:{key:null, name:null}, shop:'shop'};\
items[10034] = {item_id:10034, nshort:'shortscheck_brown', name:'Pantalon de golf marron ', type:'pants', level:18, price:1620, image:'images/items/pants/shortscheck_brown.png?1', image_mini:'images/items/pants/mini/shortscheck_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{shot:10, aim:7, dodge:9}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[10035] = {item_id:10035, nshort:'shortscheck_black', name:'Pantalon de golf noir', type:'pants', level:18, price:1660, image:'images/items/pants/shortscheck_black.png?1', image_mini:'images/items/pants/mini/shortscheck_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:9, trade:10, tactic:8}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[10036] = {item_id:10036, nshort:'shortscheck_p1', name:'Pantalon de golf élégant', type:'pants', level:19, price:2880, image:'images/items/pants/shortscheck_p1.png?1', image_mini:'images/items/pants/mini/shortscheck_p1.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{repair:10, finger_dexterity:10, pitfall:9, shot:8}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[10037] = {item_id:10037, nshort:'shortscheck_fine', name:'Pantalon de golf de Washington Irving', type:'pants', level:20, price:3120, image:'images/items/pants/shortscheck_fine.png?1', image_mini:'images/items/pants/mini/shortscheck_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:8, swim:10, reflex:9, ride:12}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
\n\
\n\
items[10040] = {item_id:10040, nshort:'check_grey', name:'Pantalon à carreaux gris', type:'pants', level:20, price:690, image:'images/items/pants/check_grey.png?1', image_mini:'images/items/pants/mini/check_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{hide:8, reflex:5, endurance:5}, attributes:{strength:1}}, set:{key:null, name:null}, shop:'shop'};\n\
items[10041] = {item_id:10041, nshort:'check_yellow', name:'Pantalon à carreaux jaune', type:'pants', level:21, price:1720, image:'images/items/pants/check_yellow.png?1', image_mini:'images/items/pants/mini/check_yellow.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tough:7, punch:8}, attributes:{dexterity:2, strength:1}}, set:{key:null, name:null}, shop:'shop'};\n\
items[10042] = {item_id:10042, nshort:'check_blue', name:'Pantalon à carreaux bleu', type:'pants', level:21, price:1760, image:'images/items/pants/check_blue.png?1', image_mini:'images/items/pants/mini/check_blue.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{pitfall:8, swim:6, build:10}, attributes:{flexibility:1}}, set:{key:null, name:null}, shop:'shop'};\n\
items[10043] = {item_id:10043, nshort:'check_green', name:'Pantalon à carreaux vert', type:'pants', level:21, price:1780, image:'images/items/pants/check_green.png?1', image_mini:'images/items/pants/mini/check_green.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:7, health:8, punch:6}, attributes:{strength:2}}, set:{key:null, name:null}, shop:'shop'};\
items[10044] = {item_id:10044, nshort:'check_brown', name:'Pantalon à carreaux marron', type:'pants', level:22, price:1840, image:'images/items/pants/check_brown.png?1', image_mini:'images/items/pants/mini/check_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{shot:8, hide:6, ride:8}, attributes:{flexibility:2}}, set:{key:null, name:null}, shop:'shop'};\
items[10045] = {item_id:10045, nshort:'check_black', name:'Pantalon à carreaux noir', type:'pants', level:22, price:1880, image:'images/items/pants/check_black.png?1', image_mini:'images/items/pants/mini/check_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{repair:10, finger_dexterity:10}, attributes:{flexibility:2}}, set:{key:null, name:null}, shop:'shop'};\
items[10046] = {item_id:10046, nshort:'check_p1', name:'Pantalon à carreaux élégant', type:'pants', level:24, price:3540, image:'images/items/pants/check_p1.png?1', image_mini:'images/items/pants/mini/check_p1.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:12, animal:10, trade:12, tactic:12}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[10047] = {item_id:10047, nshort:'check_fine', name:'Pantalon à carreaux d\\'Annie Oakley', type:'pants', level:25, price:3630, image:'images/items/pants/check_fine.png?1', image_mini:'images/items/pants/mini/check_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{shot:12, aim:14, dodge:10, health:9}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
\n\
\n\
items[10050] = {item_id:10050, nshort:'fur_grey', name:'Pantalon en fourrure gris', type:'pants', level:25, price:1230, image:'images/items/pants/fur_grey.png?1', image_mini:'images/items/pants/mini/fur_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{shot:7, hide:8, reflex:8}, attributes:{dexterity:1}}, set:{key:null, name:null}, shop:'shop'};\
items[10051] = {item_id:10051, nshort:'fur_yellow', name:'Pantalon en fourrure jaune', type:'pants', level:26, price:3000, image:'images/items/pants/fur_yellow.png?1', image_mini:'images/items/pants/mini/fur_yellow.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{endurance:8, punch:8, build:9}, attributes:{strength:2}}, set:{key:null, name:null}, shop:'shop'};\
items[10052] = {item_id:10052, nshort:'fur_blue', name:'Pantalon en fourrure bleu', type:'pants', level:26, price:3060, image:'images/items/pants/fur_blue.png?1', image_mini:'images/items/pants/mini/fur_blue.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{animal:8, pitfall:14, hide:10}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[10053] = {item_id:10053, nshort:'fur_green', name:'Pantalon en fourrure vert', type:'pants', level:26, price:3000, image:'images/items/pants/fur_green.png?1', image_mini:'images/items/pants/mini/fur_green.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:16}, attributes:{charisma:3}}, set:{key:null, name:null}, shop:'shop'};\n\
items[10054] = {item_id:10054, nshort:'fur_brown', name:'Pantalon en fourrure marron', type:'pants', level:27, price:3090, image:'images/items/pants/fur_brown.png?1', image_mini:'images/items/pants/mini/fur_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:14, leadership:11, finger_dexterity:7}, attributes:{}}, set:{key:'set_mexican', name:'Set de Mexicain'}, shop:'shop'};\
items[10055] = {item_id:10055, nshort:'fur_black', name:'Pantalon en fourrure noir', type:'pants', level:27, price:3120, image:'images/items/pants/fur_black.png?1', image_mini:'images/items/pants/mini/fur_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{trade:17, endurance:12}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[10056] = {item_id:10056, nshort:'fur_p1', name:'Pantalon en fourrure élégant', type:'pants', level:30, price:4725, image:'images/items/pants/fur_p1.png?1', image_mini:'images/items/pants/mini/fur_p1.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{repair:10, swim:15, ride:15, tough:10}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[10057] = {item_id:10057, nshort:'fur_fine', name:'Pantalon en fourrure de Cheyenne', type:'pants', level:32, price:5075, image:'images/items/pants/fur_fine.png?1', image_mini:'images/items/pants/mini/fur_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{shot:19, dodge:15}, attributes:{charisma:2}}, set:{key:null, name:null}, shop:'shop'};\n\
\n\
items[10060] = {item_id:10060, nshort:'dungarees_grey', name:'Salopette grise', type:'pants', level:31, price:1395, image:'images/items/pants/dungarees_grey.png?1', image_mini:'images/items/pants/mini/dungarees_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{pitfall:15}, attributes:{dexterity:2, strength:1}}, set:{key:null, name:null}, shop:'shop'};\
items[10061] = {item_id:10061, nshort:'dungarees_yellow', name:'Salopette jaune', type:'pants', level:32, price:3360, image:'images/items/pants/dungarees_yellow.png?1', image_mini:'images/items/pants/mini/dungarees_yellow.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{repair:12, finger_dexterity:10, reflex:14}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[10062] = {item_id:10062, nshort:'dungarees_blue', name:'Salopette bleue', type:'pants', level:32, price:3420, image:'images/items/pants/dungarees_blue.png?1', image_mini:'images/items/pants/mini/dungarees_blue.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{ride:15, punch:9, build:12}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[10063] = {item_id:10063, nshort:'dungarees_green', name:'Salopette verte', type:'pants', level:32, price:3420, image:'images/items/pants/dungarees_green.png?1', image_mini:'images/items/pants/mini/dungarees_green.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{swim:14, endurance:12, tough:11}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[10064] = {item_id:10064, nshort:'dungarees_brown', name:'Salopette marron', type:'pants', level:33, price:3510, image:'images/items/pants/dungarees_brown.png?1', image_mini:'images/items/pants/mini/dungarees_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{shot:15, hide:15}, attributes:{dexterity:1}}, set:{key:null, name:null}, shop:'shop'};\
items[10065] = {item_id:10065, nshort:'dungarees_black', name:'Salopette noire', type:'pants', level:33, price:3540, image:'images/items/pants/dungarees_black.png?1', image_mini:'images/items/pants/mini/dungarees_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{trade:14, tactic:10, leadership:14}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[10066] = {item_id:10066, nshort:'dungarees_p1', name:'Salopette élégante', type:'pants', level:35, price:5250, image:'images/items/pants/dungarees_p1.png?1', image_mini:'images/items/pants/mini/dungarees_p1.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:15, animal:15}, attributes:{charisma:3, dexterity:1}}, set:{key:null, name:null}, shop:'shop'};\
items[10067] = {item_id:10067, nshort:'dungarees_fine', name:'Salopette de Bob le Bricoleur', type:'pants', level:38, price:5775, image:'images/items/pants/dungarees_fine.png?1', image_mini:'images/items/pants/mini/dungarees_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{endurance:17, punch:17, build:17}, attributes:{strength:1}}, set:{key:null, name:null}, shop:'shop'};\
\n\
\n\
items[10070] = {item_id:10070, nshort:'fine_grey', name:'Pantalon en lin gris', type:'pants', level:37, price:1470, image:'images/items/pants/fine_grey.png?1', image_mini:'images/items/pants/mini/fine_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{trade:10, leadership:11}, attributes:{charisma:2}}, set:{key:null, name:null}, shop:'shop'};\
items[10071] = {item_id:10071, nshort:'fine_yellow', name:'Pantalon en lin jaune', type:'pants', level:38, price:3600, image:'images/items/pants/fine_yellow.png?1', image_mini:'images/items/pants/mini/fine_yellow.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{animal:19, pitfall:7, ride:10}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[10072] = {item_id:10072, nshort:'fine_blue', name:'Pantalon en lin bleu', type:'pants', level:38, price:3570, image:'images/items/pants/fine_blue.png?1', image_mini:'images/items/pants/mini/fine_blue.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{repair:7, swim:15, hide:15}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[10073] = {item_id:10073, nshort:'fine_green', name:'Pantalon en lin vert', type:'pants', level:38, price:3570, image:'images/items/pants/fine_green.png?1', image_mini:'images/items/pants/mini/fine_green.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:17, tactic:17}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[10074] = {item_id:10074, nshort:'fine_brown', name:'Pantalon en lin marron', type:'pants', level:40, price:3630, image:'images/items/pants/fine_brown.png?1', image_mini:'images/items/pants/mini/fine_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{reflex:19}, attributes:{dexterity:3, flexibility:1}}, set:{key:null, name:null}, shop:'shop'};\
items[10075] = {item_id:10075, nshort:'fine_black', name:'Pantalon en lin noir', type:'pants', level:40, price:3450, image:'images/items/pants/fine_black.png?1', image_mini:'images/items/pants/mini/fine_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{dodge:9, health:8, endurance:15}, attributes:{strength:1}}, set:{key:null, name:null}, shop:'shop'};\
items[10075] = {item_id:10075, nshort:'fine_black', name:'Pantalon en lin noir', type:'pants', level:40, price:3450, image:'images/items/pants/fine_black.png?1', image_mini:'images/items/pants/mini/fine_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{dodge:9, health:8, endurance:15}, attributes:{strength:1}}, set:{key:'set_gentleman', name:'Set du gentleman'}, shop:'shop'};\
items[10076] = {item_id:10076, nshort:'fine_p1', name:'Pantalon en lin élégant', type:'pants', level:45, price:5775, image:'images/items/pants/fine_p1.png?1', image_mini:'images/items/pants/mini/fine_p1.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{finger_dexterity:12, shot:12, tough:15, punch:12}, attributes:{dexterity:1, strength:2}}, set:{key:null, name:null}, shop:'shop'};\
items[10077] = {item_id:10077, nshort:'fine_fine', name:'Pantalon en lin de William Masterson', type:'pants', level:48, price:6300, image:'images/items/pants/fine_fine.png?1', image_mini:'images/items/pants/mini/fine_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{pitfall:18, hide:18}, attributes:{dexterity:3, flexibility:2}}, set:{key:null, name:null}, shop:'shop'};\
\n\
\n\
items[10080] = {item_id:10080, nshort:'breeches_grey', name:'Pantalon de travail gris', type:'pants', level:41, price:2020, image:'images/items/pants/breeches_grey.png?1', image_mini:'images/items/pants/mini/breeches_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{finger_dexterity:7, pitfall:14}, attributes:{flexibility:2}}, set:{key:null, name:null}, shop:'shop'};\
items[10081] = {item_id:10081, nshort:'breeches_yellow', name:'Pantalon de travail jaune', type:'pants', level:42, price:5000, image:'images/items/pants/breeches_yellow.png?1', image_mini:'images/items/pants/mini/breeches_yellow.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:12, repair:17}, attributes:{charisma:1, dexterity:1}}, set:{key:null, name:null}, shop:'shop'};\
items[10082] = {item_id:10082, nshort:'breeches_blue', name:'Pantalon de travail bleu', type:'pants', level:42, price:5040, image:'images/items/pants/breeches_blue.png?1', image_mini:'images/items/pants/mini/breeches_blue.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:9, trade:12, tactic:12}, attributes:{flexibility:2}}, set:{key:null, name:null}, shop:'shop'};\
items[10083] = {item_id:10083, nshort:'breeches_green', name:'Pantalon de travail vert', type:'pants', level:42, price:5040, image:'images/items/pants/breeches_green.png?1', image_mini:'images/items/pants/mini/breeches_green.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{endurance:11, tough:6, punch:12}, attributes:{charisma:1, strength:2}}, set:{key:null, name:null}, shop:'shop'};\
items[10084] = {item_id:10084, nshort:'breeches_brown', name:'Pantalon de travail marron', type:'pants', level:44, price:5240, image:'images/items/pants/breeches_brown.png?1', image_mini:'images/items/pants/mini/breeches_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{repair:14, finger_dexterity:6, shot:10}, attributes:{dexterity:2, flexibility:1}}, set:{key:null, name:null}, shop:'shop'};\
items[10085] = {item_id:10085, nshort:'breeches_black', name:'Pantalon de travail noir', type:'pants', level:44, price:5240, image:'images/items/pants/breeches_black.png?1', image_mini:'images/items/pants/mini/breeches_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{hide:14, reflex:14}, attributes:{dexterity:1, flexibility:2}}, set:{key:'set_quackery', name:'Set de charlatan'}, shop:'shop'};\
items[10086] = {item_id:10086, nshort:'breeches_p1', name:'Pantalon de travail élégant', type:'pants', level:50, price:7965, image:'images/items/pants/breeches_p1.png?1', image_mini:'images/items/pants/mini/breeches_p1.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{animal:15, ride:15, build:15}, attributes:{charisma:2, strength:2}}, set:{key:null, name:null}, shop:'shop'};\
\n\
\n\
items[10090] = {item_id:10090, nshort:'indian_grey', name:'Pantalon indien gris', type:'pants', level:51, price:3330, image:'images/items/pants/indian_grey.png?1', image_mini:'images/items/pants/mini/indian_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tough:5, build:15}, attributes:{strength:3}}, set:{key:null, name:null}, shop:'shop'};\
items[10091] = {item_id:10091, nshort:'indian_yellow', name:'Pantalon indien jaune', type:'pants', level:52, price:7000, image:'images/items/pants/indian_yellow.png?1', image_mini:'images/items/pants/mini/indian_yellow.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{endurance:14, punch:14}, attributes:{dexterity:2, strength:2}}, set:{key:null, name:null}, shop:'shop'};\
items[10092] = {item_id:10092, nshort:'indian_blue', name:'Pantalon indien bleu', type:'pants', level:52, price:7000, image:'images/items/pants/indian_blue.png?1', image_mini:'images/items/pants/mini/indian_blue.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{repair:12, finger_dexterity:14, pitfall:12}, attributes:{flexibility:2}}, set:{key:null, name:null}, shop:'shop'};\
items[10093] = {item_id:10093, nshort:'indian_green', name:'Pantalon indien vert', type:'pants', level:52, price:7000, image:'images/items/pants/indian_green.png?1', image_mini:'images/items/pants/mini/indian_green.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{swim:20, hide:12, reflex:12}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[10094] = {item_id:10094, nshort:'indian_brown', name:'Pantalon indien marron', type:'pants', level:55, price:7150, image:'images/items/pants/indian_brown.png?1', image_mini:'images/items/pants/mini/indian_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{shot:15, dodge:10, health:10}, attributes:{dexterity:2, flexibility:1}}, set:{key:'set_indian', name:'Set d\\'Indien'}, shop:'shop'};\
items[10095] = {item_id:10095, nshort:'indian_black', name:'Pantalon indien noir', type:'pants', level:55, price:7300, image:'images/items/pants/indian_black.png?1', image_mini:'images/items/pants/mini/indian_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{animal:10, tactic:14, ride:15}, attributes:{charisma:2}}, set:{key:null, name:null}, shop:'shop'};\
items[10096] = {item_id:10096, nshort:'indian_p1', name:'Pantalon indien élégant', type:'pants', level:60, price:11100, image:'images/items/pants/indian_p1.png?1', image_mini:'images/items/pants/mini/indian_p1.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:17, trade:15, leadership:17}, attributes:{charisma:3}}, set:{key:null, name:null}, shop:'shop'};\
items[10097] = {item_id:10097, nshort:'indian_fine', name:'Pantalon de Sacajawea', type:'pants', level:70, price:13320, image:'images/items/pants/indian_fine.png?1', image_mini:'images/items/pants/mini/indian_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{animal:18, pitfall:18, hide:18, ride:18}, attributes:{dexterity:2, flexibility:2}}, set:{key:null, name:null}, shop:'shop'};\
\n\
items[10100] = {item_id:10100, nshort:'chapsrough_grey', name:'Jambières grises', type:'pants', level:54, price:4095, image:'images/items/pants/chapsrough_grey.png?1', image_mini:'images/items/pants/mini/chapsrough_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tough:15, punch:15}, attributes:{strength:1}}, set:{key:null, name:null}, shop:'shop'};\
items[10101] = {item_id:10101, nshort:'chapsrough_yellow', name:'Jambières jaunes', type:'pants', level:56, price:8085, image:'images/items/pants/chapsrough_yellow.png?1', image_mini:'images/items/pants/mini/chapsrough_yellow.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{aim:15, health:18, punch:15}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[10102] = {item_id:10102, nshort:'chapsrough_blue', name:'Jambières bleues', type:'pants', level:56, price:8085, image:'images/items/pants/chapsrough_blue.png?1', image_mini:'images/items/pants/mini/chapsrough_blue.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{repair:17, endurance:14, build:17}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[10103] = {item_id:10103, nshort:'chapsrough_green', name:'Jambières vertes', type:'pants', level:56, price:8085, image:'images/items/pants/chapsrough_green.png?1', image_mini:'images/items/pants/mini/chapsrough_green.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{animal:15, pitfall:15}, attributes:{charisma:2, dexterity:2}}, set:{key:null, name:null}, shop:'shop'};\
items[10104] = {item_id:10104, nshort:'chapsrough_brown', name:'Jambières marron', type:'pants', level:59, price:8470, image:'images/items/pants/chapsrough_brown.png?1', image_mini:'images/items/pants/mini/chapsrough_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{finger_dexterity:14, hide:14, ride:15}, attributes:{flexibility:2}}, set:{key:null, name:null}, shop:'shop'};\
items[10105] = {item_id:10105, nshort:'chapsrough_black', name:'Jambières noires', type:'pants', level:59, price:8470, image:'images/items/pants/chapsrough_black.png?1', image_mini:'images/items/pants/mini/chapsrough_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:14, trade:14, shot:15}, attributes:{charisma:2}}, set:{key:null, name:null}, shop:'shop'};\
items[10106] = {item_id:10106, nshort:'chapsrough_p1', name:'Jambières élégantes', type:'pants', level:65, price:12610, image:'images/items/pants/chapsrough_p1.png?1', image_mini:'images/items/pants/mini/chapsrough_p1.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:17, leadership:17, swim:13, reflex:13}, attributes:{strength:3}}, set:{key:null, name:null}, shop:'shop'};\
items[10107] = {item_id:10107, nshort:'chapsrough_fine', name:'Jambières de Billy the Kid', type:'pants', level:66, price:13195, image:'images/items/pants/chapsrough_fine.png?1', image_mini:'images/items/pants/mini/chapsrough_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{dodge:20, health:20}, attributes:{charisma:3, dexterity:3}}, set:{key:null, name:null}, shop:'shop'};\
\n\
\n\
items[10110] = {item_id:10110, nshort:'cavalry_grey', name:'Pantalon de soldat gris', type:'pants', level:61, price:5160, image:'images/items/pants/cavalry_grey.png?1', image_mini:'images/items/pants/mini/cavalry_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{animal:15, swim:12, reflex:15}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[10111] = {item_id:10111, nshort:'cavalry_yellow', name:'Pantalon de soldat jaune', type:'pants', level:63, price:9660, image:'images/items/pants/cavalry_yellow.png?1', image_mini:'images/items/pants/mini/cavalry_yellow.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{shot:19, ride:20}, attributes:{dexterity:2}}, set:{key:null, name:null}, shop:'shop'};\
items[10112] = {item_id:10112, nshort:'cavalry_blue', name:'Pantalon de soldat bleu', type:'pants', level:63, price:9600, image:'images/items/pants/cavalry_blue.png?1', image_mini:'images/items/pants/mini/cavalry_blue.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{pitfall:17, hide:18, endurance:18}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[10113] = {item_id:10113, nshort:'cavalry_green', name:'Pantalon de soldat vert', type:'pants', level:63, price:9540, image:'images/items/pants/cavalry_green.png?1', image_mini:'images/items/pants/mini/cavalry_green.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{trade:15, leadership:15, finger_dexterity:15}, attributes:{charisma:2}}, set:{key:null, name:null}, shop:'shop'};\
items[10114] = {item_id:10114, nshort:'cavalry_brown', name:'Pantalon de soldat marron', type:'pants', level:65, price:9720, image:'images/items/pants/cavalry_brown.png?1', image_mini:'images/items/pants/mini/cavalry_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tough:18, punch:18}, attributes:{strength:3}}, set:{key:null, name:null}, shop:'shop'};\
items[10115] = {item_id:10115, nshort:'cavalry_black', name:'Pantalon de soldat noir', type:'pants', level:65, price:10020, image:'images/items/pants/cavalry_black.png?1', image_mini:'images/items/pants/mini/cavalry_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{repair:15, build:17}, attributes:{dexterity:2, strength:3}}, set:{key:null, name:null}, shop:'shop'};\
items[10116] = {item_id:10116, nshort:'cavalry_p1', name:'Pantalon de soldat élégant', type:'pants', level:75, price:15120, image:'images/items/pants/cavalry_p1.png?1', image_mini:'images/items/pants/mini/cavalry_p1.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:15, aim:15, dodge:15}, attributes:{charisma:3, dexterity:3, flexibility:3}}, set:{key:null, name:null}, shop:'shop'};\
\n\
\n\
items[10120] = {item_id:10120, nshort:'jeans_grey', name:'Jean gris', type:'pants', level:71, price:7590, image:'images/items/pants/jeans_grey.png?1', image_mini:'images/items/pants/mini/jeans_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:15, shot:15}, attributes:{charisma:2, dexterity:1}}, set:{key:null, name:null}, shop:'shop'};\
items[10121] = {item_id:10121, nshort:'jeans_yellow', name:'Jean jaune', type:'pants', level:74, price:11180, image:'images/items/pants/jeans_yellow.png?1', image_mini:'images/items/pants/mini/jeans_yellow.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{swim:16, endurance:17, punch:16}, attributes:{strength:2}}, set:{key:null, name:null}, shop:'shop'};\
items[10122] = {item_id:10122, nshort:'jeans_blue', name:'Jean bleu', type:'pants', level:74, price:11180, image:'images/items/pants/jeans_blue.png?1', image_mini:'images/items/pants/mini/jeans_blue.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{repair:16, tough:16, build:17}, attributes:{flexibility:2}}, set:{key:null, name:null}, shop:'shop'};\
items[10123] = {item_id:10123, nshort:'jeans_green', name:'Jean vert', type:'pants', level:74, price:11180, image:'images/items/pants/jeans_green.png?1', image_mini:'images/items/pants/mini/jeans_green.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{pitfall:16, ride:17, health:16}, attributes:{dexterity:2}}, set:{key:null, name:null}, shop:'shop'};\
items[10124] = {item_id:10124, nshort:'jeans_brown', name:'Jean marron', type:'pants', level:79, price:12350, image:'images/items/pants/jeans_brown.png?1', image_mini:'images/items/pants/mini/jeans_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:16, aim:17, dodge:16}, attributes:{charisma:2, dexterity:2}}, set:{key:null, name:null}, shop:'shop'};\
items[10125] = {item_id:10125, nshort:'jeans_black', name:'Jean noir', type:'pants', level:79, price:12350, image:'images/items/pants/jeans_black.png?1', image_mini:'images/items/pants/mini/jeans_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:17, leadership:16, finger_dexterity:16}, attributes:{flexibility:2, strength:2}}, set:{key:null, name:null}, shop:'shop'};\
items[10126] = {item_id:10126, nshort:'jeans_p1', name:'Jean élégant', type:'pants', level:90, price:18900, image:'images/items/pants/jeans_p1.png?1', image_mini:'images/items/pants/mini/jeans_p1.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:20, animal:18, trade:20, hide:20}, attributes:{charisma:3, flexibility:2}}, set:{key:null, name:null}, shop:'shop'};\
items[10127] = {item_id:10127, nshort:'jeans_fine', name:'Jean de Pat F. Garrett', type:'pants', level:99, price:20700, image:'images/items/pants/jeans_fine.png?1', image_mini:'images/items/pants/mini/jeans_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{repair:22, shot:20, dodge:24, ride:20}, attributes:{dexterity:3, flexibility:2}}, set:{key:null, name:null}, shop:'shop'};\
\n\
\n\
items[10130] = {item_id:10130, nshort:'leather_grey', name:'Pantalon en cuir gris', type:'pants', level:76, price:8880, image:'images/items/pants/leather_grey.png?1', image_mini:'images/items/pants/mini/leather_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{aim:28}, attributes:{strength:3}}, set:{key:null, name:null}, shop:'shop'};\
items[10131] = {item_id:10131, nshort:'leather_yellow', name:'Pantalon en cuir jaune', type:'pants', level:80, price:13650, image:'images/items/pants/leather_yellow.png?1', image_mini:'images/items/pants/mini/leather_yellow.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{health:18, tough:20}, attributes:{strength:4}}, set:{key:null, name:null}, shop:'shop'};\
items[10132] = {item_id:10132, nshort:'leather_blue', name:'Pantalon en cuir bleu', type:'pants', level:80, price:13650, image:'images/items/pants/leather_blue.png?1', image_mini:'images/items/pants/mini/leather_blue.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{finger_dexterity:18, swim:20}, attributes:{flexibility:4}}, set:{key:null, name:null}, shop:'shop'};\
items[10133] = {item_id:10133, nshort:'leather_green', name:'Pantalon en cuir vert', type:'pants', level:80, price:13650, image:'images/items/pants/leather_green.png?1', image_mini:'images/items/pants/mini/leather_green.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{reflex:18, build:20}, attributes:{dexterity:4}}, set:{key:null, name:null}, shop:'shop'};\
items[10134] = {item_id:10134, nshort:'leather_brown', name:'Pantalon en cuir marron', type:'pants', level:85, price:14625, image:'images/items/pants/leather_brown.png?1', image_mini:'images/items/pants/mini/leather_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{aim:17, dodge:17, punch:17}, attributes:{dexterity:2, strength:2}}, set:{key:null, name:null}, shop:'shop'};\
items[10135] = {item_id:10135, nshort:'leather_black', name:'Pantalon en cuir noir', type:'pants', level:85, price:14625, image:'images/items/pants/leather_black.png?1', image_mini:'images/items/pants/mini/leather_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{pitfall:17, hide:17, endurance:17}, attributes:{dexterity:2, flexibility:2}}, set:{key:null, name:null}, shop:'shop'};\
items[10136] = {item_id:10136, nshort:'leather_p1', name:'Pantalon en cuir élégant', type:'pants', level:95, price:20400, image:'images/items/pants/leather_p1.png?1', image_mini:'images/items/pants/mini/leather_p1.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{animal:20, tactic:20, repair:20}, attributes:{flexibility:4, strength:3}}, set:{key:null, name:null}, shop:'shop'};\
\n\
\n\
items[10140] = {item_id:10140, nshort:'chapsfine_grey', name:'Jambières souples grises', type:'pants', level:84, price:11625, image:'images/items/pants/chapsfine_grey.png?1', image_mini:'images/items/pants/mini/chapsfine_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{finger_dexterity:17, reflex:17}, attributes:{charisma:3}}, set:{key:null, name:null}, shop:'shop'};\
items[10141] = {item_id:10141, nshort:'chapsfine_yellow', name:'Jambières souples jaunes', type:'pants', level:88, price:16660, image:'images/items/pants/chapsfine_yellow.png?1', image_mini:'images/items/pants/mini/chapsfine_yellow.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:20, swim:24, tough:20}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[10142] = {item_id:10142, nshort:'chapsfine_blue', name:'Jambières souples bleues', type:'pants', level:88, price:17000, image:'images/items/pants/chapsfine_blue.png?1', image_mini:'images/items/pants/mini/chapsfine_blue.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{aim:26, health:20}, attributes:{flexibility:3}}, set:{key:null, name:null}, shop:'shop'};\
items[10143] = {item_id:10143, nshort:'chapsfine_green', name:'Jambières souples vertes', type:'pants', level:88, price:17000, image:'images/items/pants/chapsfine_green.png?1', image_mini:'images/items/pants/mini/chapsfine_green.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{animal:19, trade:20}, attributes:{charisma:3, flexibility:3}}, set:{key:null, name:null}, shop:'shop'};\
items[10144] = {item_id:10144, nshort:'chapsfine_brown', name:'Jambières souples marron', type:'pants', level:94, price:18105, image:'images/items/pants/chapsfine_brown.png?1', image_mini:'images/items/pants/mini/chapsfine_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:11, punch:20, build:20}, attributes:{charisma:1, flexibility:1, strength:3}}, set:{key:null, name:null}, shop:'shop'};\
items[10145] = {item_id:10145, nshort:'chapsfine_black', name:'Jambières souples noires', type:'pants', level:94, price:18360, image:'images/items/pants/chapsfine_black.png?1', image_mini:'images/items/pants/mini/chapsfine_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{trade:15, finger_dexterity:20, swim:13, tough:20}, attributes:{charisma:2, flexibility:1}}, set:{key:null, name:null}, shop:'shop'};\
items[10146] = {item_id:10146, nshort:'chapsfine_p1', name:'Jambières souples élégantes', type:'pants', level:99, price:23310, image:'images/items/pants/chapsfine_p1.png?1', image_mini:'images/items/pants/mini/chapsfine_p1.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:25, aim:20, dodge:20, ride:20}, attributes:{charisma:1, dexterity:2, flexibility:1}}, set:{key:null, name:null}, shop:'shop'};\
\n\
items[10148] = {item_id:10148, nshort:'greenhorn_pants', name:'Pantalon en laine', type:'pants', level:1, price:259, image:'images/items/pants/greenhorn_pants.png?1', image_mini:'images/items/pants/mini/greenhorn_pants.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{swim:3, ride:3}, attributes:{}}, set:{key:'greenhorn_set', name:'Set du blanc-bec'}, shop:'shop'};\
items[10149] = {item_id:10149, nshort:'undergarn', name:'Fond de robe', type:'pants', level:40, price:3450, image:'images/items/pants/undergarn.png?1', image_mini:'images/items/pants/mini/undergarn.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{aim:9, hide:15, health:8}, attributes:{charisma:1}}, set:{key:'set_dancer', name:'Set de danseuse'}, shop:'shop'};\
\n\
\n\
items[11000] = {item_id:11000, nshort:'cotton_grey', name:'Ceinture en laine grise', type:'belt', level:1, price:10, image:'images/items/belt/cotton_grey.png?1', image_mini:'images/items/belt/mini/cotton_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{endurance:1}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[11001] = {item_id:11001, nshort:'cotton_yellow', name:'Ceinture en laine jaune', type:'belt', level:2, price:35, image:'images/items/belt/cotton_yellow.png?1', image_mini:'images/items/belt/mini/cotton_yellow.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{pitfall:1, swim:1}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[11002] = {item_id:11002, nshort:'cotton_blue', name:'Ceinture en laine bleue', type:'belt', level:3, price:45, image:'images/items/belt/cotton_blue.png?1', image_mini:'images/items/belt/mini/cotton_blue.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{reflex:1, ride:1, punch:1}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[11003] = {item_id:11003, nshort:'cotton_green', name:'Ceinture en laine verte', type:'belt', level:3, price:45, image:'images/items/belt/cotton_green.png?1', image_mini:'images/items/belt/mini/cotton_green.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{repair:1, tough:1, build:1}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[11004] = {item_id:11004, nshort:'cotton_brown', name:'Ceinture en laine marron', type:'belt', level:4, price:60, image:'images/items/belt/cotton_brown.png?1', image_mini:'images/items/belt/mini/cotton_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{flexibility:1}}, set:{key:null, name:null}, shop:'shop'};\
items[11005] = {item_id:11005, nshort:'cotton_black', name:'Ceinture en laine noire', type:'belt', level:4, price:60, image:'images/items/belt/cotton_black.png?1', image_mini:'images/items/belt/mini/cotton_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{dexterity:1}}, set:{key:'set_farmer', name:'Set de fermier'}, shop:'shop'};\
items[11006] = {item_id:11006, nshort:'cotton_p1', name:'Ceinture en laine élégante', type:'belt', level:5, price:250, image:'images/items/belt/cotton_p1.png?1', image_mini:'images/items/belt/mini/cotton_p1.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:1, aim:1, dodge:2}, attributes:{charisma:1}}, set:{key:null, name:null}, shop:'shop'};\
items[11007] = {item_id:11007, nshort:'cotton_fine', name:'Ceinture en laine de John Butterfield', type:'belt', level:8, price:390, image:'images/items/belt/cotton_fine.png?1', image_mini:'images/items/belt/mini/cotton_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{repair:2, build:3}, attributes:{charisma:1, strength:1}}, set:{key:null, name:null}, shop:'shop'};\
\n\
\n\
items[11010] = {item_id:11010, nshort:'check_grey_belt', name:'Ceinture à carreaux grise', type:'belt', level:7, price:142, image:'images/items/belt/check_grey_belt.png?1', image_mini:'images/items/belt/mini/check_grey_belt.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{shot:1, health:1}, attributes:{dexterity:1}}, set:{key:null, name:null}, shop:'shop'};\
items[11011] = {item_id:11011, nshort:'check_yellow_belt', name:'Ceinture à carreaux jaune', type:'belt', level:8, price:290, image:'images/items/belt/check_yellow_belt.png?1', image_mini:'images/items/belt/mini/check_yellow_belt.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{finger_dexterity:3, hide:1, reflex:1}, attributes:{charisma:1}}, set:{key:null, name:null}, shop:'shop'};\
items[11012] = {item_id:11012, nshort:'check_blue_belt', name:'Ceinture à carreaux bleue', type:'belt', level:9, price:310, image:'images/items/belt/check_blue_belt.png?1', image_mini:'images/items/belt/mini/check_blue_belt.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{animal:4, swim:3, ride:3}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[11013] = {item_id:11013, nshort:'check_green_belt', name:'Ceinture à carreaux verte', type:'belt', level:10, price:370, image:'images/items/belt/check_green_belt.png?1', image_mini:'images/items/belt/mini/check_green_belt.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:3, trade:4}, attributes:{charisma:1}}, set:{key:null, name:null}, shop:'shop'};\
items[11014] = {item_id:11014, nshort:'check_brown_belt', name:'Ceinture à carreaux marron', type:'belt', level:11, price:390, image:'images/items/belt/check_brown_belt.png?1', image_mini:'images/items/belt/mini/check_brown_belt.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:5, leadership:6}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[11015] = {item_id:11015, nshort:'check_black_belt', name:'Ceinture à carreaux noire', type:'belt', level:11, price:390, image:'images/items/belt/check_black_belt.png?1', image_mini:'images/items/belt/mini/check_black_belt.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{pitfall:6, hide:5}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[11016] = {item_id:11016, nshort:'check_p1_belt', name:'Ceinture à carreaux élégante', type:'belt', level:12, price:1160, image:'images/items/belt/check_p1_belt.png?1', image_mini:'images/items/belt/mini/check_p1_belt.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{aim:6, punch:7}, attributes:{strength:1}}, set:{key:null, name:null}, shop:'shop'};\
items[11017] = {item_id:11017, nshort:'check_fine_belt', name:'Ceinture à carreaux de Ned Buntline', type:'belt', level:15, price:1280, image:'images/items/belt/check_fine_belt.png?1', image_mini:'images/items/belt/mini/check_fine_belt.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:3, shot:7, aim:6}, attributes:{dexterity:1}}, set:{key:null, name:null}, shop:'shop'};\n\
\n\
items[11020] = {item_id:11020, nshort:'fine_grey_belt', name:'Belle ceinture grise', type:'belt', level:12, price:210, image:'images/items/belt/fine_grey_belt.png?1', image_mini:'images/items/belt/mini/fine_grey_belt.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tough:7}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[11021] = {item_id:11021, nshort:'fine_yellow_belt', name:'Belle ceinture jaune', type:'belt', level:14, price:450, image:'images/items/belt/fine_yellow_belt.png?1', image_mini:'images/items/belt/mini/fine_yellow_belt.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{swim:3, health:5, endurance:6}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[11022] = {item_id:11022, nshort:'fine_blue_belt', name:'Belle ceinture bleue', type:'belt', level:14, price:440, image:'images/items/belt/fine_blue_belt.png?1', image_mini:'images/items/belt/mini/fine_blue_belt.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{dodge:5, reflex:4}, attributes:{dexterity:1}}, set:{key:null, name:null}, shop:'shop'};\
items[11023] = {item_id:11023, nshort:'fine_green_belt', name:'Belle ceinture verte', type:'belt', level:15, price:480, image:'images/items/belt/fine_green_belt.png?1', image_mini:'images/items/belt/mini/fine_green_belt.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{trade:6, leadership:4}, attributes:{charisma:1}}, set:{key:null, name:null}, shop:'shop'};\
items[11024] = {item_id:11024, nshort:'fine_brown_belt', name:'Belle ceinture marron', type:'belt', level:15, price:480, image:'images/items/belt/fine_brown_belt.png?1', image_mini:'images/items/belt/mini/fine_brown_belt.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{finger_dexterity:4, shot:6}, attributes:{strength:1}}, set:{key:null, name:null}, shop:'shop'};\
items[11025] = {item_id:11025, nshort:'fine_black_belt', name:'Belle ceinture noire', type:'belt', level:17, price:540, image:'images/items/belt/fine_black_belt.png?1', image_mini:'images/items/belt/mini/fine_black_belt.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{animal:6, tactic:6, ride:6}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[11026] = {item_id:11026, nshort:'fine_p1_belt', name:'Belle ceinture élégante', type:'belt', level:17, price:1300, image:'images/items/belt/fine_p1_belt.png?1', image_mini:'images/items/belt/mini/fine_p1_belt.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:6, leadership:7, punch:8}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[11027] = {item_id:11027, nshort:'fine_fine_belt', name:'Belle ceinture de Thomas Hart Benton', type:'belt', level:20, price:1620, image:'images/items/belt/fine_fine_belt.png?1', image_mini:'images/items/belt/mini/fine_fine_belt.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{repair:8, build:9}, attributes:{dexterity:1, strength:1}}, set:{key:null, name:null}, shop:'shop'};\
\n\
\n\
items[11030] = {item_id:11030, nshort:'buckle_grey', name:'Ceinture à boucle grise', type:'belt', level:18, price:420, image:'images/items/belt/buckle_grey.png?1', image_mini:'images/items/belt/mini/buckle_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{dexterity:2, flexibility:2}}, set:{key:null, name:null}, shop:'shop'};\
items[11031] = {item_id:11031, nshort:'buckle_yellow', name:'Ceinture à boucle jaune', type:'belt', level:20, price:1160, image:'images/items/belt/buckle_yellow.png?1', image_mini:'images/items/belt/mini/buckle_yellow.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{repair:7, endurance:6}, attributes:{strength:1}}, set:{key:null, name:null}, shop:'shop'};\
items[11032] = {item_id:11032, nshort:'buckle_blue', name:'Ceinture à boucle bleue', type:'belt', level:20, price:1140, image:'images/items/belt/buckle_blue.png?1', image_mini:'images/items/belt/mini/buckle_blue.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:9, tactic:7}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[11033] = {item_id:11033, nshort:'buckle_green', name:'Ceinture à boucle verte', type:'belt', level:22, price:1340, image:'images/items/belt/buckle_green.png?1', image_mini:'images/items/belt/mini/buckle_green.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{shot:9, dodge:10}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[11034] = {item_id:11034, nshort:'buckle_brown', name:'Ceinture à boucle marron', type:'belt', level:22, price:1340, image:'images/items/belt/buckle_brown.png?1', image_mini:'images/items/belt/mini/buckle_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{aim:9, punch:10}, attributes:{}}, set:{key:'set_pilgrim_male', name:'Set de pèlerin'}, shop:'shop'};\
items[11035] = {item_id:11035, nshort:'buckle_black', name:'Ceinture à boucle noire', type:'belt', level:24, price:1520, image:'images/items/belt/buckle_black.png?1', image_mini:'images/items/belt/mini/buckle_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{repair:4, finger_dexterity:10}, attributes:{flexibility:2}}, set:{key:'set_pilgrim_female', name:'Set de pèlerine'}, shop:'shop'};\
items[11036] = {item_id:11036, nshort:'buckle_p1', name:'Ceinture à boucle élégante', type:'belt', level:25, price:2700, image:'images/items/belt/buckle_p1.png?1', image_mini:'images/items/belt/mini/buckle_p1.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{trade:10, tactic:10, reflex:10}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[11037] = {item_id:11037, nshort:'buckle_fine', name:'Ceinture à boucle de Charles Goodnight', type:'belt', level:27, price:3000, image:'images/items/belt/buckle_fine.png?1', image_mini:'images/items/belt/mini/buckle_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{trade:10, leadership:10, tough:10, build:10}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
\n\
\n\
items[11040] = {item_id:11040, nshort:'bull_grey', name:'Ceinture en peau de bison grise', type:'belt', level:23, price:490, image:'images/items/belt/bull_grey.png?1', image_mini:'images/items/belt/mini/bull_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{hide:7, endurance:7}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[11041] = {item_id:11041, nshort:'bull_yellow', name:'Ceinture en peau de bison jaune', type:'belt', level:24, price:1360, image:'images/items/belt/bull_yellow.png?1', image_mini:'images/items/belt/mini/bull_yellow.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{pitfall:14}, attributes:{strength:1}}, set:{key:null, name:null}, shop:'shop'};\
items[11042] = {item_id:11042, nshort:'bull_blue', name:'Ceinture en peau de bison bleue', type:'belt', level:24, price:1320, image:'images/items/belt/bull_blue.png?1', image_mini:'images/items/belt/mini/bull_blue.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{ride:2, build:15}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[11043] = {item_id:11043, nshort:'bull_green', name:'Ceinture en peau de bison verte', type:'belt', level:26, price:1400, image:'images/items/belt/bull_green.png?1', image_mini:'images/items/belt/mini/bull_green.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:7, animal:8, repair:8}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[11044] = {item_id:11044, nshort:'bull_brown', name:'Ceinture en peau de bison marron', type:'belt', level:27, price:1500, image:'images/items/belt/bull_brown.png?1', image_mini:'images/items/belt/mini/bull_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:7, health:7, tough:10}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[11045] = {item_id:11045, nshort:'bull_black', name:'Ceinture en peau de bison noire', type:'belt', level:27, price:1540, image:'images/items/belt/bull_black.png?1', image_mini:'images/items/belt/mini/bull_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:7, shot:8}, attributes:{flexibility:2}}, set:{key:null, name:null}, shop:'shop'};\
items[11046] = {item_id:11046, nshort:'bull_p1', name:'Ceinture en peau de bison élégante', type:'belt', level:28, price:2940, image:'images/items/belt/bull_p1.png?1', image_mini:'images/items/belt/mini/bull_p1.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:8, trade:8}, attributes:{charisma:2, dexterity:2}}, set:{key:null, name:null}, shop:'shop'};\
items[11047] = {item_id:11047, nshort:'bull_fine', name:'Ceinture en peau de bison de Billy Hickok', type:'belt', level:30, price:3210, image:'images/items/belt/bull_fine.png?1', image_mini:'images/items/belt/mini/bull_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{animal:5, swim:10, hide:10, ride:10}, attributes:{strength:1}}, set:{key:null, name:null}, shop:'shop'};\
\n\
\n\
items[11050] = {item_id:11050, nshort:'studs_grey', name:'Ceinture à clous grise', type:'belt', level:27, price:780, image:'images/items/belt/studs_grey.png?1', image_mini:'images/items/belt/mini/studs_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{reflex:4, health:10}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[11051] = {item_id:11051, nshort:'studs_yellow', name:'Ceinture à clous jaune', type:'belt', level:28, price:2220, image:'images/items/belt/studs_yellow.png?1', image_mini:'images/items/belt/mini/studs_yellow.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{finger_dexterity:11, swim:10}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[11052] = {item_id:11052, nshort:'studs_blue', name:'Ceinture à clous bleue', type:'belt', level:28, price:2100, image:'images/items/belt/studs_blue.png?1', image_mini:'images/items/belt/mini/studs_blue.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{aim:7, dodge:7}, attributes:{dexterity:1, flexibility:1}}, set:{key:null, name:null}, shop:'shop'};\
items[11053] = {item_id:11053, nshort:'studs_green', name:'Ceinture à clous verte', type:'belt', level:30, price:2280, image:'images/items/belt/studs_green.png?1', image_mini:'images/items/belt/mini/studs_green.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{endurance:19}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[11054] = {item_id:11054, nshort:'studs_brown', name:'Ceinture à clous marron', type:'belt', level:30, price:2340, image:'images/items/belt/studs_brown.png?1', image_mini:'images/items/belt/mini/studs_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tough:10, punch:12}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[11055] = {item_id:11055, nshort:'studs_black', name:'Ceinture à clous noire', type:'belt', level:31, price:2430, image:'images/items/belt/studs_black.png?1', image_mini:'images/items/belt/mini/studs_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{reflex:12, ride:11}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[11056] = {item_id:11056, nshort:'studs_p1', name:'Ceinture à clous élégante', type:'belt', level:32, price:3640, image:'images/items/belt/studs_p1.png?1', image_mini:'images/items/belt/mini/studs_p1.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{animal:12, pitfall:12, hide:10}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[11057] = {item_id:11057, nshort:'studs_fine', name:'Ceinture à clous de Sam Houston', type:'belt', level:35, price:3990, image:'images/items/belt/studs_fine.png?1', image_mini:'images/items/belt/mini/studs_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{shot:11, aim:11, ride:12, punch:11}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
\n\
\n\
items[11060] = {item_id:11060, nshort:'horse_grey', name:'Ceinture de cheval grise', type:'belt', level:31, price:840, image:'images/items/belt/horse_grey.png?1', image_mini:'images/items/belt/mini/horse_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{dodge:8}, attributes:{dexterity:2}}, set:{key:null, name:null}, shop:'shop'};\
items[11061] = {item_id:11061, nshort:'horse_yellow', name:'Ceinture de cheval jaune', type:'belt', level:33, price:2430, image:'images/items/belt/horse_yellow.png?1', image_mini:'images/items/belt/mini/horse_yellow.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{charisma:2, dexterity:3, flexibility:2, strength:3}}, set:{key:null, name:null}, shop:'shop'};\
items[11062] = {item_id:11062, nshort:'horse_blue', name:'Ceinture de cheval bleue', type:'belt', level:33, price:2370, image:'images/items/belt/horse_blue.png?1', image_mini:'images/items/belt/mini/horse_blue.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{swim:4}, attributes:{charisma:3, flexibility:3}}, set:{key:null, name:null}, shop:'shop'};\
items[11063] = {item_id:11063, nshort:'horse_green', name:'Ceinture de cheval verte', type:'belt', level:35, price:2520, image:'images/items/belt/horse_green.png?1', image_mini:'images/items/belt/mini/horse_green.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{finger_dexterity:9, health:8}, attributes:{charisma:2}}, set:{key:null, name:null}, shop:'shop'};\
items[11064] = {item_id:11064, nshort:'horse_brown', name:'Ceinture de cheval marron', type:'belt', level:35, price:2520, image:'images/items/belt/horse_brown.png?1', image_mini:'images/items/belt/mini/horse_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{pitfall:5, hide:6}, attributes:{flexibility:1, strength:3}}, set:{key:null, name:null}, shop:'shop'};\
items[11065] = {item_id:11065, nshort:'horse_black', name:'Ceinture de cheval noire', type:'belt', level:36, price:2640, image:'images/items/belt/horse_black.png?1', image_mini:'images/items/belt/mini/horse_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{repair:10, swim:9}, attributes:{flexibility:1, strength:1}}, set:{key:null, name:null}, shop:'shop'};\
items[11066] = {item_id:11066, nshort:'horse_p1', name:'Ceinture de cheval élégante', type:'belt', level:37, price:3395, image:'images/items/belt/horse_p1.png?1', image_mini:'images/items/belt/mini/horse_p1.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:5, leadership:6, tough:12}, attributes:{charisma:1, strength:1}}, set:{key:null, name:null}, shop:'shop'};\
items[11067] = {item_id:11067, nshort:'horse_fine', name:'Ceinture de cheval de Seth Bullock', type:'belt', level:40, price:4130, image:'images/items/belt/horse_fine.png?1', image_mini:'images/items/belt/mini/horse_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{dodge:8, reflex:8, health:9}, attributes:{dexterity:2, strength:2}}, set:{key:null, name:null}, shop:'shop'};\
\n\
items[11070] = {item_id:11070, nshort:'eagle_grey', name:'Ceinture d\\'aigle grise', type:'belt', level:37, price:885, image:'images/items/belt/eagle_grey.png?1', image_mini:'images/items/belt/mini/eagle_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{animal:5, pitfall:7, build:7}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[11071] = {item_id:11071, nshort:'eagle_yellow', name:'Ceinture d\\'aigle jaune', type:'belt', level:38, price:2310, image:'images/items/belt/eagle_yellow.png?1', image_mini:'images/items/belt/mini/eagle_yellow.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{hide:11, endurance:11}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[11072] = {item_id:11072, nshort:'eagle_blue', name:'Ceinture d\\'aigle bleue', type:'belt', level:38, price:2460, image:'images/items/belt/eagle_blue.png?1', image_mini:'images/items/belt/mini/eagle_blue.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:10, finger_dexterity:13}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[11073] = {item_id:11073, nshort:'eagle_green', name:'Ceinture d\\'aigle verte', type:'belt', level:42, price:2730, image:'images/items/belt/eagle_green.png?1', image_mini:'images/items/belt/mini/eagle_green.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:10, repair:10}, attributes:{charisma:1, flexibility:1}}, set:{key:null, name:null}, shop:'shop'};\
items[11074] = {item_id:11074, nshort:'eagle_brown', name:'Ceinture d\\'aigle marron', type:'belt', level:42, price:2730, image:'images/items/belt/eagle_brown.png?1', image_mini:'images/items/belt/mini/eagle_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{animal:10, swim:10}, attributes:{charisma:1, flexibility:1}}, set:{key:null, name:null}, shop:'shop'};\
items[11075] = {item_id:11075, nshort:'eagle_black', name:'Ceinture d\\'aigle noire', type:'belt', level:45, price:2940, image:'images/items/belt/eagle_black.png?1', image_mini:'images/items/belt/mini/eagle_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:13, trade:12, build:5}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[11076] = {item_id:11076, nshort:'eagle_p1', name:'Ceinture d\\'aigle élégante', type:'belt', level:45, price:4200, image:'images/items/belt/eagle_p1.png?1', image_mini:'images/items/belt/mini/eagle_p1.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{aim:10, dodge:10, reflex:10}, attributes:{charisma:1, dexterity:1, flexibility:1, strength:1}}, set:{key:null, name:null}, shop:'shop'};\
items[11077] = {item_id:11077, nshort:'eagle_fine', name:'Ceinture d\\'aigle d\\'Al Swearengen', type:'belt', level:48, price:4235, image:'images/items/belt/eagle_fine.png?1', image_mini:'images/items/belt/mini/eagle_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{pitfall:15, shot:8, ride:15}, attributes:{}}, set:{key:'set_gentleman', name:'Set du gentleman'}, shop:'shop'};\
\n\
\n\
items[11080] = {item_id:11080, nshort:'ammo_grey', name:'Cartouchière grise', type:'belt', level:44, price:1300, image:'images/items/belt/ammo_grey.png?1', image_mini:'images/items/belt/mini/ammo_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{punch:11}, attributes:{dexterity:1, strength:1}}, set:{key:null, name:null}, shop:'shop'};\
items[11081] = {item_id:11081, nshort:'ammo_yellow', name:'Cartouchière jaune', type:'belt', level:47, price:3600, image:'images/items/belt/ammo_yellow.png?1', image_mini:'images/items/belt/mini/ammo_yellow.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{repair:10, tough:10, build:10}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[11082] = {item_id:11082, nshort:'ammo_blue', name:'Cartouchière bleue', type:'belt', level:47, price:3600, image:'images/items/belt/ammo_blue.png?1', image_mini:'images/items/belt/mini/ammo_blue.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:10, finger_dexterity:10, endurance:10}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[11083] = {item_id:11083, nshort:'ammo_green', name:'Cartouchière verte', type:'belt', level:48, price:3600, image:'images/items/belt/ammo_green.png?1', image_mini:'images/items/belt/mini/ammo_green.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{animal:10, trade:10, tactic:10}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[11084] = {item_id:11084, nshort:'ammo_brown', name:'Cartouchière marron', type:'belt', level:49, price:4000, image:'images/items/belt/ammo_brown.png?1', image_mini:'images/items/belt/mini/ammo_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:10, shot:10, hide:10, reflex:10}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[11085] = {item_id:11085, nshort:'ammo_black', name:'Cartouchière noire', type:'belt', level:49, price:4120, image:'images/items/belt/ammo_black.png?1', image_mini:'images/items/belt/mini/ammo_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{swim:10, health:10}, attributes:{dexterity:1, strength:2}}, set:{key:'set_quackery', name:'Set de charlatan'}, shop:'shop'};\
items[11086] = {item_id:11086, nshort:'ammo_p1', name:'Cartouchière élégante', type:'belt', level:52, price:5805, image:'images/items/belt/ammo_p1.png?1', image_mini:'images/items/belt/mini/ammo_p1.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{aim:15}, attributes:{charisma:3, dexterity:1, flexibility:3}}, set:{key:null, name:null}, shop:'shop'};\
items[11087] = {item_id:11087, nshort:'ammo_fine', name:'Cartouchière de Calamity Jane', type:'belt', level:57, price:6750, image:'images/items/belt/ammo_fine.png?1', image_mini:'images/items/belt/mini/ammo_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{aim:10, health:10, punch:10}, attributes:{charisma:2, dexterity:2, flexibility:2, strength:2}}, set:{key:null, name:null}, shop:'shop'};\
\n\
items[11102] = {item_id:11102, nshort:'skull_grey', name:'Ceinture tête de mort grise', type:'belt', level:57, price:4500, image:'images/items/belt/skull_grey.png?1', image_mini:'images/items/belt/mini/skull_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{punch:5, build:15}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[11103] = {item_id:11103, nshort:'skull_yellow', name:'Ceinture tête de mort jaune', type:'belt', level:60, price:6825, image:'images/items/belt/skull_yellow.png?1', image_mini:'images/items/belt/mini/skull_yellow.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{repair:15, tough:15}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[11104] = {item_id:11104, nshort:'skull_blue', name:'Ceinture tête de mort bleue', type:'belt', level:60, price:6825, image:'images/items/belt/skull_blue.png?1', image_mini:'images/items/belt/mini/skull_blue.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{pitfall:15, endurance:15}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[11105] = {item_id:11105, nshort:'skull_green', name:'Ceinture tête de mort verte', type:'belt', level:65, price:7605, image:'images/items/belt/skull_green.png?1', image_mini:'images/items/belt/mini/skull_green.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:15, finger_dexterity:15}, attributes:{flexibility:1}}, set:{key:null, name:null}, shop:'shop'};\
items[11106] = {item_id:11106, nshort:'skull_brown', name:'Ceinture tête de mort marron', type:'belt', level:65, price:7605, image:'images/items/belt/skull_brown.png?1', image_mini:'images/items/belt/mini/skull_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{animal:15, health:15}, attributes:{dexterity:1}}, set:{key:null, name:null}, shop:'shop'};\
items[11107] = {item_id:11107, nshort:'skull_black', name:'Ceinture tête de mort noire', type:'belt', level:70, price:8190, image:'images/items/belt/skull_black.png?1', image_mini:'images/items/belt/mini/skull_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:15, trade:15}, attributes:{charisma:1, strength:1}}, set:{key:null, name:null}, shop:'shop'};\
items[11108] = {item_id:11108, nshort:'skull_p1', name:'Ceinture tête de mort élégante', type:'belt', level:70, price:11550, image:'images/items/belt/skull_p1.png?1', image_mini:'images/items/belt/mini/skull_p1.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:15, shot:15, ride:15}, attributes:{charisma:1, dexterity:1, flexibility:1, strength:1}}, set:{key:null, name:null}, shop:'shop'};\
items[11109] = {item_id:11109, nshort:'skull_fine', name:'Ceinture tête de mort de Billy the Kid', type:'belt', level:80, price:12600, image:'images/items/belt/skull_fine.png?1', image_mini:'images/items/belt/mini/skull_fine.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{charisma:6, dexterity:6, flexibility:6, strength:6}}, set:{key:null, name:null}, shop:'shop'};\
items[11110] = {item_id:11110, nshort:'pistols_grey', name:'Ceinture à pistolets grise', type:'belt', level:75, price:7350, image:'images/items/belt/pistols_grey.png?1', image_mini:'images/items/belt/mini/pistols_grey.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{swim:15, reflex:15}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[11111] = {item_id:11111, nshort:'pistols_yellow', name:'Ceinture à pistolets jaune', type:'belt', level:85, price:10575, image:'images/items/belt/pistols_yellow.png?1', image_mini:'images/items/belt/mini/pistols_yellow.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{charisma:4, dexterity:5, flexibility:4, strength:5}}, set:{key:null, name:null}, shop:'shop'};\
items[11112] = {item_id:11112, nshort:'pistols_blue', name:'Ceinture à pistolets bleue', type:'belt', level:90, price:10875, image:'images/items/belt/pistols_blue.png?1', image_mini:'images/items/belt/mini/pistols_blue.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{hide:15, dodge:25}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[11113] = {item_id:11113, nshort:'pistols_green', name:'Ceinture à pistolets verte', type:'belt', level:95, price:12825, image:'images/items/belt/pistols_green.png?1', image_mini:'images/items/belt/mini/pistols_green.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{charisma:6, dexterity:5, flexibility:6, strength:5}}, set:{key:null, name:null}, shop:'shop'};\
items[11114] = {item_id:11114, nshort:'pistols_brown', name:'Ceinture à pistolets marron', type:'belt', level:100, price:12375, image:'images/items/belt/pistols_brown.png?1', image_mini:'images/items/belt/mini/pistols_brown.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{repair:15, finger_dexterity:15}, attributes:{charisma:2, dexterity:2, flexibility:2, strength:2}}, set:{key:null, name:null}, shop:'shop'};\
items[11115] = {item_id:11115, nshort:'pistols_black', name:'Ceinture à pistolets noire', type:'belt', level:105, price:13500, image:'images/items/belt/pistols_black.png?1', image_mini:'images/items/belt/mini/pistols_black.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:15, shot:15, reflex:15, punch:15}, attributes:{charisma:1, dexterity:1, flexibility:1, strength:1}}, set:{key:null, name:null}, shop:'shop'};\
items[11116] = {item_id:11116, nshort:'pistols_p1', name:'Ceinture à pistolets élégante', type:'belt', level:110, price:19200, image:'images/items/belt/pistols_p1.png?1', image_mini:'images/items/belt/mini/pistols_p1.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{tactic:15, leadership:15, endurance:15, build:15}, attributes:{charisma:3, dexterity:3, flexibility:3, strength:3}}, set:{key:null, name:null}, shop:'shop'};\
\n\
items[11118] = {item_id:11118, nshort:'greenhorn_belt', name:'Ceinture en cuir ', type:'belt', level:4, price:375, image:'images/items/belt/greenhorn_belt.png?1', image_mini:'images/items/belt/mini/greenhorn_belt.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{leadership:2, shot:3, build:3}, attributes:{}}, set:{key:'greenhorn_set', name:'Set du blanc-bec'}, shop:'shop'};\
\n\
\n\
items[11137] = {item_id:11137, nshort:'flag_indian', name:'Ceinture indienne', type:'belt', level:55, price:3000, image:'images/items/belt/flag_indian.png?1', image_mini:'images/items/belt/mini/flag_indian.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{charisma:2, dexterity:2, flexibility:2, strength:2}}, set:{key:'set_indian', name:'Set d\\'Indien'}, shop:'shop'};\
items[11138] = {item_id:11138, nshort:'adah_belt', name:'Ceinture d\\'Adah Isaacs Menken', type:'belt', level:48, price:4235, image:'images/items/belt/adah_belt.png?1', image_mini:'images/items/belt/mini/adah_belt.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{animal:15, trade:15, swim:8}, attributes:{}}, set:{key:'set_dancer', name:'Set de danseuse'}, shop:'shop'};\
\n\
\n\
items[12700] = {item_id:12700, nshort:'adventcal', name:'Calendrier de l\\'Avent', type:'yield', level:null, price:10, image:'images/items/yield/adventcal.png?1', image_mini:'images/items/yield/adventcal.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\n\
items[12701] = {item_id:12701, nshort:'xmas_licorice', name:'Réglisse', type:'yield', level:null, price:15, image:'images/items/yield/xmas_licorice.png?1', image_mini:'images/items/yield/xmas_licorice.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\n\
items[12702] = {item_id:12702, nshort:'xmas_oat', name:'Avoine', type:'yield', level:null, price:32, image:'images/items/yield/xmas_oat.png?1', image_mini:'images/items/yield/xmas_oat.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\n\
items[12703] = {item_id:12703, nshort:'xmas_cracker', name:'Biscuit de Noël', type:'yield', level:null, price:27, image:'images/items/yield/xmas_cracker.png?1', image_mini:'images/items/yield/xmas_cracker.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\n\
items[12704] = {item_id:12704, nshort:'xmas_lebkuchen', name:'Pain au gingembre', type:'yield', level:null, price:31, image:'images/items/yield/xmas_lebkuchen.png?1', image_mini:'images/items/yield/xmas_lebkuchen.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\n\
items[12705] = {item_id:12705, nshort:'xmas_cookie', name:'Cookie au chocolat', type:'yield', level:null, price:29, image:'images/items/yield/xmas_cookie.png?1', image_mini:'images/items/yield/xmas_cookie.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\n\
items[12706] = {item_id:12706, nshort:'xmas_potato', name:'Pâte d\\'amande', type:'yield', level:null, price:39, image:'images/items/yield/xmas_potato.png?1', image_mini:'images/items/yield/xmas_potato.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\n\
items[12707] = {item_id:12707, nshort:'xmas_coal', name:'Un bout de charbon', type:'yield', level:null, price:2, image:'images/items/yield/xmas_coal.png?1', image_mini:'images/items/yield/xmas_coal.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\n\
items[12708] = {item_id:12708, nshort:'xmas_sphere', name:'Bille en verre', type:'yield', level:null, price:35, image:'images/items/yield/xmas_sphere.png?1', image_mini:'images/items/yield/xmas_sphere.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\n\
items[12709] = {item_id:12709, nshort:'xmas_present', name:'Un cadeau', type:'yield', level:null, price:39, image:'images/items/yield/xmas_present.png?1', image_mini:'images/items/yield/xmas_present.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[12710] = {item_id:12710, nshort:'xmas_present_mid', name:'Un joli cadeau', type:'yield', level:null, price:39, image:'images/items/yield/xmas_present_mid.png?1', image_mini:'images/items/yield/xmas_present_mid.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[12711] = {item_id:12711, nshort:'xmas_present_high', name:'Un cadeau exclusif', type:'yield', level:null, price:39, image:'images/items/yield/xmas_present_high.png?1', image_mini:'images/items/yield/xmas_present_high.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
\n\
items[12713] = {item_id:12713, nshort:'xmas_bag', name:'Sac de billes', type:'yield', level:null, price:330, image:'images/items/yield/xmas_bag.png?1', image_mini:'images/items/yield/xmas_bag.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{finger_dexterity:5}, attributes:{}}, set:{key:null, name:null}, shop:'quest'};\n\
\n\
\n\
items[16100] = {item_id:16100, nshort:'fb_aidkit', name:'Sacoche de médecin', type:'yield', level:null, price:590, image:'images/items/yield/fb_aidkit.png?1', image_mini:'images/items/yield/fb_aidkit.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
\n\
\n\
items[17000] = {item_id:17000, nshort:'fb_chest_wooden', name:'Cassette en bois', type:'yield', level:null, price:1204, image:'images/items/yield/fb_chest_wooden.png?1', image_mini:'images/items/yield/fb_chest_wooden.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\n\
items[17001] = {item_id:17001, nshort:'fb_chest_iron', name:'Cassette cloutée', type:'yield', level:null, price:6584, image:'images/items/yield/fb_chest_iron.png?1', image_mini:'images/items/yield/fb_chest_iron.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[17002] = {item_id:17002, nshort:'fb_chest_steel', name:'Cassette en métal renforcé', type:'yield', level:null, price:11490, image:'images/items/yield/fb_chest_steel.png?1', image_mini:'images/items/yield/fb_chest_steel.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
\n\
\n\
items[20003] = {item_id:20003, nshort:'beansandbacon_recipe', name:'Recette : cuire des haricots avec du lard', type:'recipe', level:1, price:500, image:'images/items/recipe/recipe_cook.png?1', image_mini:'images/items/recipe/recipe_cook.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[20004] = {item_id:20004, nshort:'marmelade_recipe', name:'Recette : cuire de la confiture', type:'recipe', level:1, price:500, image:'images/items/recipe/recipe_cook.png?1', image_mini:'images/items/recipe/recipe_cook.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[20005] = {item_id:20005, nshort:'mash_recipe', name:'Recette : préparer de la maische', type:'recipe', level:1, price:500, image:'images/items/recipe/recipe_cook.png?1', image_mini:'images/items/recipe/recipe_cook.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[20006] = {item_id:20006, nshort:'dough_recipe', name:'Instructions : préparation de la pâte', type:'recipe', level:1, price:500, image:'images/items/recipe/recipe_cook.png?1', image_mini:'images/items/recipe/recipe_cook.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[20007] = {item_id:20007, nshort:'steakseasoning_recipe', name:'Recette : faire mariner un steak', type:'recipe', level:1, price:500, image:'images/items/recipe/recipe_cook.png?1', image_mini:'images/items/recipe/recipe_cook.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[20008] = {item_id:20008, nshort:'licor_recipe', name:'Recette : préparer de la liqueur', type:'recipe', level:1, price:750, image:'images/items/recipe/recipe_cook.png?1', image_mini:'images/items/recipe/recipe_cook.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[20009] = {item_id:20009, nshort:'cake_recipe', name:'Recette : préparer un gâteau', type:'recipe', level:1, price:750, image:'images/items/recipe/recipe_cook.png?1', image_mini:'images/items/recipe/recipe_cook.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[20010] = {item_id:20010, nshort:'fishfond_recipe', name:'Recette : préparer un bouillon de poisson', type:'recipe', level:1, price:1750, image:'images/items/recipe/recipe_cook.png?1', image_mini:'images/items/recipe/recipe_cook.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[20011] = {item_id:20011, nshort:'turkey_recipe', name:'Recette : préparer une dinde rôtie ', type:'recipe', level:1, price:2250, image:'images/items/recipe/recipe_cook.png?1', image_mini:'images/items/recipe/recipe_cook.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[20012] = {item_id:20012, nshort:'fishsoup_recipe', name:'Recette : préparer une soupe au poisson', type:'recipe', level:1, price:2250, image:'images/items/recipe/recipe_cook.png?1', image_mini:'images/items/recipe/recipe_cook.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[20013] = {item_id:20013, nshort:'veggiepun_recipe', name:'Recette : préparer une boulette de légumes', type:'recipe', level:1, price:2250, image:'images/items/recipe/recipe_cook.png?1', image_mini:'images/items/recipe/recipe_cook.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[20014] = {item_id:20014, nshort:'meatloaf_recipe', name:'Recette : préparer de la viande hachée', type:'recipe', level:1, price:2500, image:'images/items/recipe/recipe_cook.png?1', image_mini:'images/items/recipe/recipe_cook.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[20015] = {item_id:20015, nshort:'fishonastick_recipe', name:'Recette : préparer une morue séchée', type:'recipe', level:1, price:2500, image:'images/items/recipe/recipe_cook.png?1', image_mini:'images/items/recipe/recipe_cook.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[20016] = {item_id:20016, nshort:'parfumsmoke_recipe', name:'Instructions : préparer un fumoir', type:'recipe', level:1, price:2500, image:'images/items/recipe/recipe_cook.png?1', image_mini:'images/items/recipe/recipe_cook.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[20017] = {item_id:20017, nshort:'sauce_recipe', name:'Recette : préparer une sauce', type:'recipe', level:1, price:2500, image:'images/items/recipe/recipe_cook.png?1', image_mini:'images/items/recipe/recipe_cook.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[20018] = {item_id:20018, nshort:'paperfish_recipe', name:'Recette : un poisson puant enroulé dans du papier journal', type:'recipe', level:1, price:3500, image:'images/items/recipe/recipe_cook.png?1', image_mini:'images/items/recipe/recipe_cook.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[20019] = {item_id:20019, nshort:'gentlemen_recipe', name:'Instructions : dîner de gentleman', type:'recipe', level:1, price:3500, image:'images/items/recipe/recipe_cook.png?1', image_mini:'images/items/recipe/recipe_cook.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
\n\
\n\
items[20023] = {item_id:20023, nshort:'pipecleaner_recipe', name:'Instructions : fabriquer une brosse à tuyau', type:'recipe', level:1, price:500, image:'images/items/recipe/recipe_quack.png?1', image_mini:'images/items/recipe/recipe_quack.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[20024] = {item_id:20024, nshort:'stomach_recipe', name:'Instructions : préparer un remède pour l\\'estomac', type:'recipe', level:1, price:500, image:'images/items/recipe/recipe_quack.png?1', image_mini:'images/items/recipe/recipe_quack.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[20025] = {item_id:20025, nshort:'sulfuracid_recipe', name:'Instructions : produire de l\\'acide sulfurique', type:'recipe', level:1, price:500, image:'images/items/recipe/recipe_quack.png?1', image_mini:'images/items/recipe/recipe_quack.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[20026] = {item_id:20026, nshort:'ink_recipe', name:'Instructions : préparer de l\\'encre', type:'recipe', level:1, price:500, image:'images/items/recipe/recipe_quack.png?1', image_mini:'images/items/recipe/recipe_quack.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[20027] = {item_id:20027, nshort:'petroleum_recipe', name:'Instructions : préparer du pétrole', type:'recipe', level:1, price:500, image:'images/items/recipe/recipe_quack.png?1', image_mini:'images/items/recipe/recipe_quack.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[20028] = {item_id:20028, nshort:'fetish_recipe', name:'Instructions : fabriquer une idole', type:'recipe', level:1, price:750, image:'images/items/recipe/recipe_quack.png?1', image_mini:'images/items/recipe/recipe_quack.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[20029] = {item_id:20029, nshort:'destillate_recipe', name:'Instructions : préparer différents distillats', type:'recipe', level:1, price:750, image:'images/items/recipe/recipe_quack.png?1', image_mini:'images/items/recipe/recipe_quack.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[20030] = {item_id:20030, nshort:'firewater_recipe', name:'Instructions : préparer de l\\'alcool illégal', type:'recipe', level:1, price:1750, image:'images/items/recipe/recipe_quack.png?1', image_mini:'images/items/recipe/recipe_quack.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[20031] = {item_id:20031, nshort:'tea_recipe', name:'Instructions : mélange de thé', type:'recipe', level:1, price:2250, image:'images/items/recipe/recipe_quack.png?1', image_mini:'images/items/recipe/recipe_quack.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[20032] = {item_id:20032, nshort:'chewtabaco_recipe', name:'Instructions : mélange de tabac à chiquer', type:'recipe', level:1, price:2250, image:'images/items/recipe/recipe_quack.png?1', image_mini:'images/items/recipe/recipe_quack.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[20033] = {item_id:20033, nshort:'fruitlicor_recipe', name:'Instructions : préparer de la liqueur de fruit', type:'recipe', level:1, price:2250, image:'images/items/recipe/recipe_quack.png?1', image_mini:'images/items/recipe/recipe_quack.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[20034] = {item_id:20034, nshort:'battery_recipe', name:'Instructions : fabriquer une pile', type:'recipe', level:1, price:2500, image:'images/items/recipe/recipe_quack.png?1', image_mini:'images/items/recipe/recipe_quack.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[20035] = {item_id:20035, nshort:'lye_recipe', name:'Instructions : préparer une solution alcaline', type:'recipe', level:1, price:2500, image:'images/items/recipe/recipe_quack.png?1', image_mini:'images/items/recipe/recipe_quack.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[20036] = {item_id:20036, nshort:'herbbrew_recipe', name:'Instructions : préparer de la liqueur aux herbes', type:'recipe', level:1, price:2500, image:'images/items/recipe/recipe_quack.png?1', image_mini:'images/items/recipe/recipe_quack.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[20037] = {item_id:20037, nshort:'paper_recipe', name:'Instructions : recycler du papier', type:'recipe', level:1, price:2500, image:'images/items/recipe/recipe_quack.png?1', image_mini:'images/items/recipe/recipe_quack.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[20039] = {item_id:20039, nshort:'rosewater_recipe', name:'Instructions : préparer de l\\'eau de rose', type:'recipe', level:1, price:3500, image:'images/items/recipe/recipe_quack.png?1', image_mini:'images/items/recipe/recipe_quack.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
\n\
items[20043] = {item_id:20043, nshort:'bajonett_recipe', name:'Instructions : fabriquer une baïonnette', type:'recipe', level:1, price:500, image:'images/items/recipe/recipe_smith.png?1', image_mini:'images/items/recipe/recipe_smith.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[20044] = {item_id:20044, nshort:'weightstone_recipe', name:'Instructions : préparer un poids', type:'recipe', level:1, price:500, image:'images/items/recipe/recipe_smith.png?1', image_mini:'images/items/recipe/recipe_smith.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[20045] = {item_id:20045, nshort:'steel_recipe', name:'Instructions : fondre de l\\'acier', type:'recipe', level:1, price:500, image:'images/items/recipe/recipe_smith.png?1', image_mini:'images/items/recipe/recipe_smith.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[20046] = {item_id:20046, nshort:'liquid_lead_recipe', name:'Instructions : fondre du plomb', type:'recipe', level:1, price:500, image:'images/items/recipe/recipe_smith.png?1', image_mini:'images/items/recipe/recipe_smith.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[20047] = {item_id:20047, nshort:'forge_recipe', name:'Instructions : fabriquer une enclume', type:'recipe', level:1, price:500, image:'images/items/recipe/recipe_smith.png?1', image_mini:'images/items/recipe/recipe_smith.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[20048] = {item_id:20048, nshort:'leadfigure_recipe', name:'Instructions : fabriquer une figurine de plomb', type:'recipe', level:1, price:750, image:'images/items/recipe/recipe_smith.png?1', image_mini:'images/items/recipe/recipe_smith.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[20049] = {item_id:20049, nshort:'marble_recipe', name:'Instructions : fondre une bille', type:'recipe', level:1, price:750, image:'images/items/recipe/recipe_smith.png?1', image_mini:'images/items/recipe/recipe_smith.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[20050] = {item_id:20050, nshort:'rivets_recipe', name:'Instructions : fabriquer des rivets', type:'recipe', level:1, price:1750, image:'images/items/recipe/recipe_smith.png?1', image_mini:'images/items/recipe/recipe_smith.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[20051] = {item_id:20051, nshort:'gripprotection_recipe', name:'Instructions : fabriquer une poignée d\\'épée', type:'recipe', level:1, price:2250, image:'images/items/recipe/recipe_smith.png?1', image_mini:'images/items/recipe/recipe_smith.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[20052] = {item_id:20052, nshort:'coolingpackage_recipe', name:'Instructions : fabriquer un vêtement rafraîchissant', type:'recipe', level:1, price:2250, image:'images/items/recipe/recipe_smith.png?1', image_mini:'images/items/recipe/recipe_smith.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[20053] = {item_id:20053, nshort:'weaponchain_recipe', name:'Instructions : fabriquer une sangle', type:'recipe', level:1, price:2250, image:'images/items/recipe/recipe_smith.png?1', image_mini:'images/items/recipe/recipe_smith.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[20054] = {item_id:20054, nshort:'handle_recipe', name:'Instructions : fabriquer une poignée', type:'recipe', level:1, price:2500, image:'images/items/recipe/recipe_smith.png?1', image_mini:'images/items/recipe/recipe_smith.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[20055] = {item_id:20055, nshort:'revolverform_recipe', name:'Instructions : fabriquer un moule de revolver', type:'recipe', level:1, price:2500, image:'images/items/recipe/recipe_smith.png?1', image_mini:'images/items/recipe/recipe_smith.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[20056] = {item_id:20056, nshort:'steelblade_recipe', name:'Instructions : fabriquer une lame d\\'acier', type:'recipe', level:1, price:2500, image:'images/items/recipe/recipe_smith.png?1', image_mini:'images/items/recipe/recipe_smith.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[20057] = {item_id:20057, nshort:'customize_recipe', name:'Instructions : fabriquer un ornement', type:'recipe', level:1, price:2500, image:'images/items/recipe/recipe_smith.png?1', image_mini:'images/items/recipe/recipe_smith.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[20058] = {item_id:20058, nshort:'druse_recipe', name:'Instructions : ouvrir une géode', type:'recipe', level:1, price:3500, image:'images/items/recipe/recipe_smith.png?1', image_mini:'images/items/recipe/recipe_smith.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[20059] = {item_id:20059, nshort:'polishstone_recipe', name:'Instructions : fabriquer une pierre à polir', type:'recipe', level:1, price:3500, image:'images/items/recipe/recipe_smith.png?1', image_mini:'images/items/recipe/recipe_smith.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[20063] = {item_id:20063, nshort:'horseshoe_recipe', name:'Instructions : ferrer un cheval', type:'recipe', level:1, price:500, image:'images/items/recipe/recipe_sattle.png?1', image_mini:'images/items/recipe/recipe_sattle.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[20064] = {item_id:20064, nshort:'energyfood_recipe', name:'Instructions : préparer des granulés énergisants', type:'recipe', level:1, price:500, image:'images/items/recipe/recipe_sattle.png?1', image_mini:'images/items/recipe/recipe_sattle.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[20065] = {item_id:20065, nshort:'naked_saddle_recipe', name:'Instructions : retirer la couverture en cuir d\\'une selle', type:'recipe', level:1, price:500, image:'images/items/recipe/recipe_sattle.png?1', image_mini:'images/items/recipe/recipe_sattle.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[20066] = {item_id:20066, nshort:'fillmaterial_recipe', name:'Instructions : préparer le rembourrage', type:'recipe', level:1, price:500, image:'images/items/recipe/recipe_sattle.png?1', image_mini:'images/items/recipe/recipe_sattle.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[20067] = {item_id:20067, nshort:'leatherskin_recipe', name:'Instructions : préparer une couverture de cuir', type:'recipe', level:1, price:500, image:'images/items/recipe/recipe_sattle.png?1', image_mini:'images/items/recipe/recipe_sattle.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[20068] = {item_id:20068, nshort:'brandingiron_recipe', name:'Instructions : fabriquer un fer de marquage', type:'recipe', level:1, price:750, image:'images/items/recipe/recipe_sattle.png?1', image_mini:'images/items/recipe/recipe_sattle.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[20069] = {item_id:20069, nshort:'notworking_compass_recipe', name:'Instructions : fabriquer un compas non aligné', type:'recipe', level:1, price:750, image:'images/items/recipe/recipe_sattle.png?1', image_mini:'images/items/recipe/recipe_sattle.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[20070] = {item_id:20070, nshort:'ironstep_recipe', name:'Instructions : fabriquer des étriers', type:'recipe', level:1, price:1750, image:'images/items/recipe/recipe_sattle.png?1', image_mini:'images/items/recipe/recipe_sattle.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[20071] = {item_id:20071, nshort:'spores_recipe', name:'Instructions : fabriquer un éperon', type:'recipe', level:1, price:2250, image:'images/items/recipe/recipe_sattle.png?1', image_mini:'images/items/recipe/recipe_sattle.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[20072] = {item_id:20072, nshort:'harnish_recipe', name:'Instructions : fabriquer une bride', type:'recipe', level:1, price:2250, image:'images/items/recipe/recipe_sattle.png?1', image_mini:'images/items/recipe/recipe_sattle.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[20073] = {item_id:20073, nshort:'fieldcamp_recipe', name:'Instructions : coudre un sac de couchage', type:'recipe', level:1, price:2250, image:'images/items/recipe/recipe_sattle.png?1', image_mini:'images/items/recipe/recipe_sattle.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[20074] = {item_id:20074, nshort:'horse_cloth_recipe', name:'Instructions : coudre une couverture de cheval', type:'recipe', level:1, price:2500, image:'images/items/recipe/recipe_sattle.png?1', image_mini:'images/items/recipe/recipe_sattle.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[20075] = {item_id:20075, nshort:'custom_leather_recipe', name:'Instructions : ornement décoratif en cuir', type:'recipe', level:1, price:2500, image:'images/items/recipe/recipe_sattle.png?1', image_mini:'images/items/recipe/recipe_sattle.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[20076] = {item_id:20076, nshort:'charriotpiece_recipe', name:'Instructions : fabriquer un morceau de diligence', type:'recipe', level:1, price:2500, image:'images/items/recipe/recipe_sattle.png?1', image_mini:'images/items/recipe/recipe_sattle.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[20077] = {item_id:20077, nshort:'wagonwheel_recipe', name:'Instructions : construire une roue de voiture à bâche', type:'recipe', level:1, price:2500, image:'images/items/recipe/recipe_sattle.png?1', image_mini:'images/items/recipe/recipe_sattle.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[20079] = {item_id:20079, nshort:'gemsaddle_recipe', name:'Instructions : fabriquer un pommeau de selle', type:'recipe', level:1, price:3500, image:'images/items/recipe/recipe_sattle.png?1', image_mini:'images/items/recipe/recipe_sattle.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
\n\
\n\
items[40000] = {item_id:40000, nshort:'greenhorn_poncho', name:'Poncho en laine', type:'body', level:1, price:125, image:'images/items/body/greenhorn_poncho.png?1', image_mini:'images/items/body/mini/greenhorn_poncho.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{appearance:3, tough:3}, attributes:{}}, set:{key:'greenhorn_set', name:'Set du blanc-bec'}, shop:'shop'};\
\n\
\n\
items[185200] = {item_id:185200, nshort:'easter_11_egg1', name:'Œuf de Pâques', type:'yield', level:null, price:15, image:'images/items/yield/easter_11_egg1.png?1', image_mini:'images/items/yield/easter_11_egg1.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[185201] = {item_id:185201, nshort:'easter_11_egg2', name:'Œuf de Pâques', type:'yield', level:null, price:32, image:'images/items/yield/easter_11_egg2.png?1', image_mini:'images/items/yield/easter_11_egg2.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[185202] = {item_id:185202, nshort:'easter_11_egg3', name:'Œuf de Pâques', type:'yield', level:null, price:27, image:'images/items/yield/easter_11_egg3.png?1', image_mini:'images/items/yield/easter_11_egg3.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[185203] = {item_id:185203, nshort:'easter_11_egg4', name:'Œuf de Pâques', type:'yield', level:null, price:31, image:'images/items/yield/easter_11_egg4.png?1', image_mini:'images/items/yield/easter_11_egg4.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[185204] = {item_id:185204, nshort:'easter_11_egg5', name:'Œuf de Pâques', type:'yield', level:null, price:29, image:'images/items/yield/easter_11_egg5.png?1', image_mini:'images/items/yield/easter_11_egg5.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
items[185205] = {item_id:185205, nshort:'easter_11_egg6', name:'Œuf de Pâques', type:'yield', level:null, price:39, image:'images/items/yield/easter_11_egg6.png?1', image_mini:'images/items/yield/easter_11_egg6.png?1', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};\
\n\
";


// Listes des travaux
pk2_code += "\
raboty = [];\
raboty[1] = {rus_name:'Garder des cochons', name:'swine', malus:2, navyki:{tough:1,endurance:1,leadership:1,animal:2}, resultaty:{dengi:3, opyt:1, vezenie:0, boom:1, produkty:{700:20}}};\n\
raboty[2] = {rus_name:'Faire fuir les oiseaux du champ', name:'scarecrow', malus:1, navyki:{build:1,shot:1,pitfall:1,tactic:1,animal:1}, resultaty:{dengi:1, opyt:3, vezenie:2, boom:20, produkty:{757:20}}};\n\
raboty[3] = {rus_name:'Poser des affiches', name:'wanted', malus:1, navyki:{endurance:1,ride:1,hide:1,finger_dexterity:1,pitfall:1}, resultaty:{dengi:2, opyt:3, vezenie:0, boom:10, produkty:{743:40}}};\n\
raboty[4] = {rus_name:'Cueillir du tabac', name:'tabacco', malus:1, navyki:{tough:1,finger_dexterity:2,tactic:1,trade:1}, resultaty:{dengi:6, opyt:1, vezenie:2, boom:2, produkty:{702:100}}};\n\
raboty[5] = {rus_name:'Cueillir du coton', name:'cotton', malus:2, navyki:{tough:1,endurance:1,finger_dexterity:1,leadership:1,trade:1}, resultaty:{dengi:1, opyt:4, vezenie:0, boom:3, produkty:{704:50}}};\n\
raboty[6] = {rus_name:'Récolter de la canne à sucre', name:'sugar', malus:4, navyki:{punch:1,tough:1,finger_dexterity:1,repair:1,trade:1}, resultaty:{dengi:5, opyt:2, vezenie:4, boom:1, produkty:{703:100}}};\n\
raboty[7] = {rus_name:'Pêcher à la ligne', name:'angle', malus:3, navyki:{hide:1,swim:3,repair:1}, resultaty:{dengi:1, opyt:0, vezenie:6, boom:2, produkty:{705:60, 782:3}}};\n\
raboty[8] = {rus_name:'Récolter du blé', name:'cereal', malus:11, navyki:{punch:1,tough:1,endurance:1,ride:1,finger_dexterity:1}, resultaty:{dengi:2, opyt:6, vezenie:2, boom:4, produkty:{701:55}}};\n\
raboty[9] = {rus_name:'Cueillir des baies', name:'berry', malus:16, navyki:{tough:2,hide:1,finger_dexterity:2}, resultaty:{dengi:2, opyt:6, vezenie:5, boom:6, produkty:{706:45}}};\n\
raboty[10] = {rus_name:'Garder des moutons', name:'sheeps', malus:12, navyki:{tough:1,endurance:1,leadership:1,animal:2}, resultaty:{dengi:3, opyt:5, vezenie:0, boom:2, produkty:{707:25}}};\n\
raboty[11] = {rus_name:'Vendre des journaux', name:'newspaper', malus:9, navyki:{ride:2,trade:2,appearance:1}, resultaty:{dengi:6, opyt:1, vezenie:2, boom:1, produkty:{744:60}}};\n\
raboty[12] = {rus_name:'Faucher l\\’herbe', name:'cut', malus:22, navyki:{punch:1,ride:1,finger_dexterity:1,animal:2}, resultaty:{dengi:5, opyt:7, vezenie:3, boom:3, produkty:{765:5}}};\n\
raboty[13] = {rus_name:'Moudre du blé', name:'grinding', malus:25, navyki:{punch:1,tough:1,endurance:1,ride:1,finger_dexterity:1}, resultaty:{dengi:11, opyt:7, vezenie:0, boom:5, produkty:{745:40}}};\n\
raboty[14] = {rus_name:'Récolter du maïs', name:'corn', malus:23, navyki:{finger_dexterity:1,tactic:1,trade:1,animal:1,appearance:1}, resultaty:{dengi:4, opyt:7, vezenie:8, boom:5, produkty:{748:25}}};\n\
raboty[15] = {rus_name:'Cueillir des haricots', name:'beans', malus:23, navyki:{endurance:1,finger_dexterity:1,leadership:1,tactic:1,animal:1}, resultaty:{dengi:9, opyt:7, vezenie:4, boom:5, produkty:{746:40}}};\n\
raboty[16] = {rus_name:'Garder le fort', name:'fort_guard', malus:25, navyki:{reflex:1,shot:1,leadership:1,appearance:2}, resultaty:{dengi:3, opyt:9, vezenie:2, boom:7, produkty:{758:2}}};\n\
raboty[17] = {rus_name:'Corroyer', name:'tanning', malus:40, navyki:{tough:1,endurance:1,swim:1,finger_dexterity:1,trade:1}, resultaty:{dengi:12, opyt:15, vezenie:5, boom:18, produkty:{712:15}}};\n\
raboty[18] = {rus_name:'Orpailler', name:'digging', malus:31, navyki:{tough:1,reflex:1,swim:1,trade:2}, resultaty:{dengi:11, opyt:3, vezenie:5, boom:7, produkty:{708:17}}};\n\
raboty[19] = {rus_name:'Creuser des tombes', name:'grave', malus:76, navyki:{build:1,punch:1,tough:1,endurance:1,ride:1}, resultaty:{dengi:16, opyt:12, vezenie:22, boom:9, produkty:{736:8}}};\n\
raboty[20] = {rus_name:'Chasser des dindons', name:'turkey', malus:43, navyki:{reflex:1,hide:2,shot:1,pitfall:1}, resultaty:{dengi:3, opyt:14, vezenie:7, boom:21, produkty:{709:13}}};\n\
raboty[21] = {rus_name:'Poser des rails', name:'rail', malus:45, navyki:{build:2,endurance:1,repair:1,leadership:1}, resultaty:{dengi:10, opyt:18, vezenie:5, boom:10, produkty:{766:25}}};\n\
raboty[22] = {rus_name:'Herbager le bétail', name:'cow', malus:39, navyki:{ride:2,reflex:1,tactic:1,animal:1}, resultaty:{dengi:5, opyt:17, vezenie:0, boom:11, produkty:{710:15}}};\n\
raboty[23] = {rus_name:'Réparer des clôtures', name:'fence', malus:36, navyki:{finger_dexterity:1,repair:2,animal:2}, resultaty:{dengi:7, opyt:11, vezenie:5, boom:6, produkty:{747:11}}};\n\
raboty[24] = {rus_name:'Scier du bois', name:'saw', malus:64, navyki:{reflex:2,finger_dexterity:2,trade:1}, resultaty:{dengi:23, opyt:12, vezenie:6, boom:32, produkty:{742:10}}};\n\
raboty[25] = {rus_name:'Extraire des pierres', name:'stone', malus:53, navyki:{punch:3,endurance:1,reflex:1}, resultaty:{dengi:17, opyt:8, vezenie:9, boom:33, produkty:{716:22}}};\n\
raboty[26] = {rus_name:'Rectifier une rivière', name:'straighten', malus:85, navyki:{build:1,swim:3,tactic:1}, resultaty:{dengi:8, opyt:22, vezenie:15, boom:12, produkty:{795:5}}};\n\
raboty[27] = {rus_name:'Abattre des arbres', name:'wood', malus:48, navyki:{punch:2,endurance:1,reflex:1,appearance:1}, resultaty:{dengi:18, opyt:5, vezenie:2, boom:21, produkty:{711:25}}};\n\
raboty[28] = {rus_name:'Construire une ligne d\\'arrosage', name:'irrigation', malus:45, navyki:{build:1,ride:1,repair:1,leadership:1,tactic:1}, resultaty:{dengi:7, opyt:13, vezenie:15, boom:6, produkty:{736:6}}};\n\
raboty[29] = {rus_name:'Marquer des bovins', name:'brand', malus:50, navyki:{ride:1,reflex:1,pitfall:1,animal:2}, resultaty:{dengi:8, opyt:25, vezenie:0, boom:35, produkty:{740:13}}};\n\
raboty[30] = {rus_name:'Installer une haie de barbelés', name:'wire', malus:58, navyki:{build:1,finger_dexterity:2,pitfall:1,animal:1}, resultaty:{dengi:17, opyt:13, vezenie:6, boom:0, produkty:{739:10}}};\n\
raboty[31] = {rus_name:'Détruire le barrage', name:'dam', malus:54, navyki:{swim:2,tactic:2,animal:1}, resultaty:{dengi:4, opyt:18, vezenie:9, boom:41, produkty:{714:5}}};\n\
raboty[32] = {rus_name:'Recherche de gemmes', name:'gems', malus:75, navyki:{swim:2,finger_dexterity:1,trade:2}, resultaty:{dengi:25, opyt:7, vezenie:8, boom:4, produkty:{720:8}}};\n\
raboty[33] = {rus_name:'Jalonner le territoire', name:'claim', malus:57, navyki:{build:1,endurance:1,swim:1,trade:1,appearance:1}, resultaty:{dengi:31, opyt:4, vezenie:4, boom:29, produkty:{755:25}}};\n\
raboty[34] = {rus_name:'Réparer une voiture à bâche', name:'chuck_wagon', malus:134, navyki:{ride:1,repair:2,leadership:1,trade:1}, resultaty:{dengi:5, opyt:23, vezenie:42, boom:11, produkty:{722:15}}};\n\
raboty[35] = {rus_name:'Dresser des chevaux', name:'break_in', malus:72, navyki:{ride:2,reflex:1,pitfall:1,animal:1}, resultaty:{dengi:13, opyt:32, vezenie:10, boom:52, produkty:{787:5}}};\n\
raboty[36] = {rus_name:'Marchander', name:'trade', malus:85, navyki:{pitfall:1,trade:2,appearance:2}, resultaty:{dengi:15, opyt:3, vezenie:25, boom:12, produkty:{715:13, 774:1}}};\n\
raboty[37] = {rus_name:'Monter des poteaux télégraphiques', name:'mast', malus:75, navyki:{build:2,punch:1,swim:1,repair:1}, resultaty:{dengi:21, opyt:25, vezenie:3, boom:14, produkty:{767:14}}};\n\
raboty[38] = {rus_name:'Creuser un puits', name:'spring', malus:103, navyki:{build:1,endurance:1,swim:1,leadership:1,tactic:1}, resultaty:{dengi:9, opyt:33, vezenie:23, boom:19, produkty:{741:10}}};\n\
raboty[39] = {rus_name:'Chasser des castors', name:'beaver', malus:120, navyki:{hide:2,pitfall:3}, resultaty:{dengi:32, opyt:17, vezenie:6, boom:21, produkty:{714:17, 771:13}}};\n\
raboty[40] = {rus_name:'Extraire du charbon', name:'coal', malus:86, navyki:{punch:2,reflex:1,finger_dexterity:1,trade:1}, resultaty:{dengi:30, opyt:14, vezenie:0, boom:13, produkty:{721:37}}};\n\
raboty[41] = {rus_name:'Imprimer des journaux', name:'print', malus:83, navyki:{tough:1,endurance:1,finger_dexterity:1,repair:1,leadership:1}, resultaty:{dengi:30, opyt:20, vezenie:5, boom:7, produkty:{744:40}}};\n\
raboty[42] = {rus_name:'Pêcher', name:'fishing', malus:91, navyki:{swim:2,pitfall:2,leadership:1}, resultaty:{dengi:6, opyt:23, vezenie:23, boom:38, produkty:{717:15, 705:5}}};\n\
raboty[43] = {rus_name:'Construire une station', name:'trainstation', malus:113, navyki:{build:2,finger_dexterity:1,repair:1,leadership:1}, resultaty:{dengi:12, opyt:47, vezenie:7, boom:15, produkty:{759:7}}};\n\
raboty[44] = {rus_name:'Construire des éoliennes', name:'windmeel', malus:164, navyki:{build:1,endurance:1,ride:1,leadership:1,tactic:1}, resultaty:{dengi:42, opyt:43, vezenie:6, boom:18, produkty:{756:5}}};\n\
raboty[45] = {rus_name:'Explorer', name:'explore', malus:112, navyki:{endurance:1,shot:1,ride:1,swim:1,leadership:1}, resultaty:{dengi:1, opyt:45, vezenie:22, boom:37, produkty:{760:15}}};\n\
raboty[46] = {rus_name:'Flotter du bois', name:'float', malus:138, navyki:{reflex:1,swim:3,tactic:1}, resultaty:{dengi:23, opyt:45, vezenie:0, boom:52, produkty:{711:30}}};\n\
raboty[47] = {rus_name:'Construire un pont', name:'bridge', malus:108, navyki:{build:1,endurance:1,swim:2,repair:1}, resultaty:{dengi:17, opyt:33, vezenie:18, boom:53, produkty:{761:8}}};\n\
raboty[48] = {rus_name:'Attraper des chevaux', name:'springe', malus:135, navyki:{endurance:1,ride:2,animal:2}, resultaty:{dengi:29, opyt:45, vezenie:0, boom:42, produkty:{749:22}}};\n\
raboty[49] = {rus_name:'Fabriquer des cercueils', name:'coffin', malus:119, navyki:{build:1,reflex:1,repair:2,appearance:1}, resultaty:{dengi:42, opyt:8, vezenie:15, boom:20, produkty:{734:25}}};\n\
raboty[50] = {rus_name:'Transporter des munitions', name:'dynamite', malus:145, navyki:{ride:1,reflex:1,shot:1,finger_dexterity:1,appearance:1}, resultaty:{dengi:23, opyt:12, vezenie:64, boom:93, produkty:{737:5}}};\n\
raboty[51] = {rus_name:'Chasser des coyotes', name:'coyote', malus:141, navyki:{endurance:2,shot:1,pitfall:1,hide:1}, resultaty:{dengi:15, opyt:43, vezenie:26, boom:45, produkty:{718:6}}};\n\
raboty[52] = {rus_name:'Chasser des bisons', name:'buffalo', malus:179, navyki:{ride:1,pitfall:1,leadership:1,tactic:1,animal:1}, resultaty:{dengi:24, opyt:62, vezenie:0, boom:72, produkty:{724:14}}};\n\
raboty[53] = {rus_name:'Construire un manoir', name:'fort', malus:225, navyki:{build:1,pitfall:1,repair:1,leadership:2}, resultaty:{dengi:33, opyt:71, vezenie:17, boom:35, produkty:{762:3}}};\n\
raboty[54] = {rus_name:'Marchander avec des Indiens', name:'indians', malus:224, navyki:{pitfall:1,trade:2,appearance:2}, resultaty:{dengi:11, opyt:14, vezenie:63, boom:34, produkty:{719:13}}};\n\
raboty[55] = {rus_name:'Défricher la forêt', name:'clearing', malus:179, navyki:{punch:2,reflex:1,leadership:1,tactic:1}, resultaty:{dengi:62, opyt:8, vezenie:9, boom:16, produkty:{711:65}}};\n\
raboty[56] = {rus_name:'Extraire de l\\'argent', name:'silver', malus:194, navyki:{punch:1,tough:1,finger_dexterity:1,trade:2}, resultaty:{dengi:76, opyt:8, vezenie:0, boom:32, produkty:{725:17}}};\n\
raboty[57] = {rus_name:'Escorter une diligence', name:'diligence_guard', malus:404, navyki:{ride:1,shot:1,repair:1,leadership:2}, resultaty:{dengi:34, opyt:77, vezenie:45, boom:43, produkty:{780:12}}};\n\
raboty[58] = {rus_name:'Chasser des loups', name:'wolf', malus:208, navyki:{hide:2,pitfall:2,animal:1}, resultaty:{dengi:21, opyt:63, vezenie:15, boom:67, produkty:{763:11}}};\n\
raboty[59] = {rus_name:'Protéger le convoi des colons', name:'track', malus:213, navyki:{hide:2,leadership:2,tactic:1}, resultaty:{dengi:10, opyt:60, vezenie:30, boom:33, produkty:{778:12}}};\n\
raboty[60] = {rus_name:'Voler des chevaux', name:'ox', malus:238, navyki:{reflex:1,hide:1,pitfall:2,animal:1}, resultaty:{dengi:64, opyt:34, vezenie:18, boom:43, produkty:{787:13}}};\n\
raboty[61] = {rus_name:'Surveiller une prison', name:'guard', malus:222, navyki:{punch:1,reflex:1,shot:1,appearance:2}, resultaty:{dengi:25, opyt:35, vezenie:38, boom:4, produkty:{750:1}}};\n\
raboty[62] = {rus_name:'Évangéliser', name:'bible', malus:236, navyki:{tough:1,ride:1,trade:1,appearance:2}, resultaty:{dengi:5, opyt:61, vezenie:52, boom:77, produkty:{768:9}}};\n\
raboty[63] = {rus_name:'Poney-Express', name:'ponyexpress', malus:226, navyki:{endurance:1,ride:2,shot:1,animal:1}, resultaty:{dengi:15, opyt:48, vezenie:51, boom:44, produkty:{779:5}}};\n\
raboty[64] = {rus_name:'Vendre des fusils aux Indiens', name:'weapons', malus:258, navyki:{hide:1,shot:1,repair:1,trade:2}, resultaty:{dengi:15, opyt:35, vezenie:72, boom:82, produkty:{783:4}}};\n\
raboty[65] = {rus_name:'Piller des cadavres', name:'dead', malus:266, navyki:{tough:1,hide:1,finger_dexterity:2,repair:1}, resultaty:{dengi:14, opyt:14, vezenie:90, boom:34, produkty:{774:1,723:1}}};\n\
raboty[66] = {rus_name:'Chasser des grizzlys', name:'grizzly', malus:281, navyki:{hide:1,shot:1,pitfall:2,animal:1}, resultaty:{dengi:25, opyt:78, vezenie:35, boom:71, produkty:{731:3}}};\n\
raboty[67] = {rus_name:'Extraire du pétrole', name:'oil', malus:295, navyki:{build:1,tough:1,endurance:1,leadership:1,trade:1}, resultaty:{dengi:83, opyt:25, vezenie:20, boom:7, produkty:{752:25}}};\n\
raboty[68] = {rus_name:'Chasse au trésor', name:'treasure_hunting', malus:294, navyki:{hide:2,repair:2,tactic:1}, resultaty:{dengi:20, opyt:20, vezenie:83, boom:24, produkty:{726:1}}};\n\
raboty[69] = {rus_name:'Servir dans l’\\armée', name:'army', malus:299, navyki:{endurance:1,swim:1,shot:1,pitfall:1,appearance:1}, resultaty:{dengi:55, opyt:76, vezenie:17, boom:35, produkty:{727:2}}};\n\
raboty[70] = {rus_name:'Détrousser les passants', name:'steal', malus:372, navyki:{reflex:1,hide:1,shot:1,pitfall:1,finger_dexterity:1}, resultaty:{dengi:48, opyt:50, vezenie:74, boom:66, produkty:{728:4}}};\n\
raboty[71] = {rus_name:'Travailler comme mercenaire', name:'mercenary', malus:332, navyki:{tough:1,swim:1,shot:1,repair:1,appearance:1}, resultaty:{dengi:92, opyt:52, vezenie:23, boom:65, produkty:{1708:85}}};\n\
raboty[72] = {rus_name:'Traquer des bandits', name:'bandits', malus:385, navyki:{tough:1,endurance:1,hide:1,leadership:1,tactic:1}, resultaty:{dengi:28, opyt:75, vezenie:85, boom:83, produkty:{729:5}}};\n\
raboty[73] = {rus_name:'Tendre une embuscade', name:'aggression', malus:422, navyki:{hide:2,pitfall:1,tactic:1,appearance:1}, resultaty:{dengi:78, opyt:27, vezenie:78, boom:86, produkty:{730:13,774:1}}};\n\
raboty[74] = {rus_name:'Attaquer une diligence', name:'diligence_aggression', malus:476, navyki:{shot:1,pitfall:1,leadership:1,tactic:1,appearance:1}, resultaty:{dengi:43, opyt:73, vezenie:95, boom:67, produkty:{733:15}}};\n\
raboty[75] = {rus_name:'Chasseur de primes', name:'bounty', malus:426, navyki:{punch:1,endurance:1,shot:1,pitfall:1,appearance:1}, resultaty:{dengi:92, opyt:32, vezenie:79, boom:72, produkty:{1756:25}}};\n\
raboty[76] = {rus_name:'Transférer des prisonniers', name:'captured', malus:438, navyki:{endurance:1,reflex:1,hide:1,tactic:2}, resultaty:{dengi:23, opyt:69, vezenie:85, boom:44, produkty:{764:4}}};\n\
raboty[77] = {rus_name:'Attaquer un train', name:'train', malus:507, navyki:{endurance:1,hide:1,shot:1,pitfall:1,trade:1}, resultaty:{dengi:67, opyt:87, vezenie:92, boom:96, produkty:{1755:1}}};\
raboty[78] = {rus_name:'Cambrioler', name:'burglary', malus:518, navyki:{endurance:1,hide:2,tactic:1,trade:1}, resultaty:{dengi:80, opyt:34, vezenie:81, boom:26, produkty:{786:12}}};\n\
raboty[79] = {rus_name:'Travailler comme charlatan', name:'quackery', malus:316, navyki:{hide:1,shot:1,pitfall:1,trade:1,appearance:1}, resultaty:{dengi:65, opyt:50, vezenie:52, boom:67, produkty:{794:9}}};\n\
raboty[80] = {rus_name:'Négocier la paix', name:'peace', malus:367, navyki:{endurance:1,hide:1,shot:1,trade:1,appearance:1}, resultaty:{dengi:33, opyt:68, vezenie:76, boom:44, produkty:{751:8}}};\n\
raboty[82] = {rus_name:'Diriger un bateau à aubes', name:'ship', malus:348, navyki:{punch:1,swim:2,leadership:2}, resultaty:{dengi:82, opyt:35, vezenie:15, boom:14, produkty:{788:12}}};\n\
raboty[83] = {rus_name:'Faire de la contrebande', name:'smuggle', malus:411, navyki:{hide:1,swim:1,shot:1,trade:1,appearance:1}, resultaty:{dengi:62, opyt:45, vezenie:83, boom:56, produkty:{729:22}}};\n\
raboty[84] = {rus_name:'Construire un ranch', name:'ranch', malus:221, navyki:{build:2,endurance:1,ride:1,animal:1}, resultaty:{dengi:28, opyt:61, vezenie:17, boom:24, produkty:{784:45}}};\n\
raboty[85] = {rus_name:'Extraire du fer', name:'iron', malus:177, navyki:{build:1,punch:1,reflex:1,finger_dexterity:1,repair:1}, resultaty:{dengi:52, opyt:32, vezenie:15, boom:29, produkty:{790:38, 753:2}}};\n\
raboty[86] = {rus_name:'Cueillir des agaves', name:'agave', malus:153, navyki:{punch:1,tough:2,endurance:1,finger_dexterity:1}, resultaty:{dengi:25, opyt:42, vezenie:12, boom:27, produkty:{792:12}}};\n\
raboty[87] = {rus_name:'Cueillir des tomates', name:'tomato', malus:43, navyki:{ride:1,finger_dexterity:1,leadership:1,tactic:1,trade:1}, resultaty:{dengi:13, opyt:12, vezenie:7, boom:11, produkty:{793:33}}};\n\
raboty[88] = {rus_name:'Ferrer des chevaux', name:'horseshoe', malus:93, navyki:{punch:1,ride:2,animal:2}, resultaty:{dengi:14, opyt:28, vezenie:9, boom:23, produkty:{754:22}}};\n\
raboty[90] = {rus_name:'Éteindre le feu', name:'fire', malus:229, navyki:{build:1,tough:1,reflex:1,leadership:1,tactic:1}, resultaty:{dengi:15, opyt:41, vezenie:65, boom:45, produkty:{781:2}}};\n\
raboty[91] = {rus_name:'Cueillir des oranges', name:'orange', malus:67, navyki:{endurance:1,reflex:1,pitfall:1,repair:1,tactic:1}, resultaty:{dengi:14, opyt:25, vezenie:10, boom:21, produkty:{791:25}}};\n\
raboty[92] = {rus_name:'Nettoyer une étable', name:'muck_out', malus:8, navyki:{tough:1,ride:1,repair:1,animal:2}, resultaty:{dengi:4, opyt:5, vezenie:2, boom:6, produkty:{797:5}}};\n\
raboty[93] = {rus_name:'Nettoyer des chaussures', name:'shoes', malus:1, navyki:{hide:1,pitfall:1,finger_dexterity:1,trade:1,appearance:1}, resultaty:{dengi:3, opyt:2, vezenie:3, boom:2, produkty:{789:35}}};\n\
raboty[94] = {rus_name:'Repriser des chaussettes', name:'socks_darn', malus:1, navyki:{tough:2,endurance:1,finger_dexterity:2}, resultaty:{dengi:1, opyt:4, vezenie:0, boom:2, produkty:{1807:100}}};\n\
raboty[95] = {rus_name:'Récolter des pommes de terre', name:'potatoe', malus:113, navyki:{tough:2,endurance:2,finger_dexterity:1}, resultaty:{dengi:8, opyt:53, vezenie:5, boom:5, produkty:{1808:75}}};\n\
raboty[96] = {rus_name:'Nourrir les animaux', name:'feed_animal', malus:147, navyki:{punch:1,tough:1,leadership:1,animal:2}, resultaty:{dengi:17, opyt:60, vezenie:10, boom:20, produkty:{1809:50}}};\n\
raboty[97] = {rus_name:'Récolter des potirons', name:'pumpkin', malus:175, navyki:{punch:2,tough:1,endurance:1,tactic:1}, resultaty:{dengi:45, opyt:45, vezenie:10, boom:10, produkty:{1810:60}}};\n\
raboty[98] = {rus_name:'Cueillir des myrtilles', name:'blueberries', malus:200, navyki:{punch:1,tough:1,ride:2,finger_dexterity:1}, resultaty:{dengi:52, opyt:35, vezenie:35, boom:15, produkty:{1811:65}}};\n\
raboty[99] = {rus_name:'Planter des arbres', name:'plant_trees', malus:226, navyki:{build:2,ride:1,finger_dexterity:1,tactic:1}, resultaty:{dengi:34, opyt:25, vezenie:54, boom:25, produkty:{1812:30}}};\n\
raboty[100] = {rus_name:'Ramasser des plumes d\\'aigle', name:'gather_feathers', malus:276, navyki:{finger_dexterity:1, repair:2,tactic:1,trade:1}, resultaty:{dengi:47, opyt:23, vezenie:60, boom:15, produkty:{1813:20}}};\n\
raboty[101] = {rus_name:'Ramasser des fleurs de lotus', name:'lotus_gathering', malus:351, navyki:{tough:1,swim:2,finger_dexterity:1,repair:1}, resultaty:{dengi:54, opyt:45, vezenie:35, boom:20, produkty:{1814:15}}};\n\
raboty[102] = {rus_name:'Attraper des crabes', name:'crab_hunting', malus:376, navyki:{tough:1,reflex:1,swim:2,finger_dexterity:1}, resultaty:{dengi:67, opyt:56, vezenie:35, boom:12, produkty:{1815:10}}};\n\
raboty[103] = {rus_name:'Faire la classe', name:'teaching', malus:401, navyki:{endurance:1,pitfall:1,leadership:1,appearance:2}, resultaty:{dengi:54, opyt:79, vezenie:5, boom:23, produkty:{1816:25}}};\n\
raboty[104] = {rus_name:'Travailler comme shérif', name:'sheriff_work', malus:411, navyki:{reflex:1,shot:2,leadership:1,appearance:1}, resultaty:{dengi:67, opyt:76, vezenie:56, boom:45, produkty:{1817:50}}};\n\
raboty[105] = {rus_name:'Extraire du soufre', name:'sulfur_gathering', malus:421, navyki:{punch:2,reflex:2,repair:1}, resultaty:{dengi:76, opyt:34, vezenie:78, boom:32, produkty:{1818:10}}};\n\
raboty[106] = {rus_name:'Transport en eau vive', name:'wildwater', malus:426, navyki:{reflex:2,swim:2,tactic:1}, resultaty:{dengi:84, opyt:74, vezenie:30, boom:57, produkty:{0:25}}};\n\
raboty[107] = {rus_name:'Traverser le pays en tant que joueur', name:'gambler', malus:431, navyki:{reflex:1,hide:1,shot:1,trade:1,appearance:1}, resultaty:{dengi:67, opyt:57, vezenie:69, boom:63, produkty:{1819:25}}};\n\
raboty[108] = {rus_name:'Chasser des serpents à sonnette', name:'rattlesnake', malus:441, navyki:{reflex:2,hide:1,pitfall:1,animal:1}, resultaty:{dengi:72, opyt:46, vezenie:71, boom:73, produkty:{1820:15}}};\n\
raboty[109] = {rus_name:'Extraire du salpêtre', name:'salpeter_gathering', malus:451, navyki:{tough:2,endurance:1,finger_dexterity:1,repair:1}, resultaty:{dengi:62, opyt:53, vezenie:58, boom:27, produkty:{1821:35}}};\n\
raboty[110] = {rus_name:'Mener les chevaux', name:'horse_transport', malus:451, navyki:{ride:2,leadership:1,animal:2}, resultaty:{dengi:66, opyt:82, vezenie:69, boom:48, produkty:{1822:10}}};\n\
raboty[111] = {rus_name:'Organiser un rodéo', name:'rodeo', malus:500, navyki:{endurance:1,ride:2,pitfall:1,animal:1}, resultaty:{dengi:76, opyt:56, vezenie:69, boom:78, produkty:{1823:5}}};\n\
raboty[112] = {rus_name:'Travailler comme marchand ambulant', name:'travelling_salesman', malus:501, navyki:{tough:1,pitfall:1,trade:2,appearance:1}, resultaty:{dengi:59, opyt:46, vezenie:97, boom:67, produkty:{}}};\n\
raboty[113] = {rus_name:'Escroc au mariage', name:'con_artist', malus:521, navyki:{endurance:1,pitfall:1,tactic:1,trade:1,appearance:1}, resultaty:{dengi:78, opyt:89, vezenie:35, boom:83, produkty:{1836:2}}};\n\
raboty[114] = {rus_name:'Chasser des pumas', name:'cougar', malus:541, navyki:{shot:2,pitfall:1,tactic:1,animal:1}, resultaty:{dengi:46, opyt:89, vezenie:39, boom:93, produkty:{1824:20}}};\n\
raboty[115] = {rus_name:'Transporter de l\\'alcool', name:'alcohol', malus:601, navyki:{ride:1,hide:2,shot:1,leadership:1}, resultaty:{dengi:74, opyt:91, vezenie:34, boom:56, produkty:{1826:50}}};\n\
raboty[116] = {rus_name:'Extraire du plomb', name:'lead_gathering', malus:621, navyki:{punch:1,finger_dexterity:1,repair:2,leadership:1}, resultaty:{dengi:89, opyt:72, vezenie:22, boom:72, produkty:{1827:30}}};\n\
raboty[117] = {rus_name:'Rechercher des gemmes rares', name:'gem_gathering', malus:641, navyki:{punch:2,endurance:1,shot:1,repair:1}, resultaty:{dengi:91, opyt:78, vezenie:23, boom:77, produkty:{0:20}}};\n\
raboty[118] = {rus_name:'Construire une mission', name:'mission', malus:571, navyki:{build:2,punch:1,endurance:1,repair:1}, resultaty:{dengi:92, opyt:82, vezenie:54, boom:38, produkty:{1831:3}}};\n\
raboty[119] = {rus_name:'Construire un casino', name:'casino', malus:651, navyki:{build:3,repair:1,leadership:1}, resultaty:{dengi:78, opyt:92, vezenie:23, boom:45, produkty:{1832:10}}};\n\
raboty[120] = {rus_name:'Travailler comme maréchal', name:'marshall', malus:701, navyki:{ride:1,shot:2,pitfall:1,appearance:1}, resultaty:{dengi:87, opyt:90, vezenie:60, boom:94, produkty:{1833:1}}};\n\
raboty[121] = {rus_name:'Démanteler une bande', name:'shatter_gang', malus:726, navyki:{endurance:1,hide:2,pitfall:1,tactic:1}, resultaty:{dengi:84, opyt:70, vezenie:89, boom:99, produkty:{0:10}}};\n\
raboty[122] = {rus_name:'Braquer une banque', name:'bankrobbery', malus:741, navyki:{hide:2,pitfall:1,leadership:1,trade:1}, resultaty:{dengi:93, opyt:84, vezenie:30, boom:89, produkty:{1837:1}}};\n\
raboty[123] = {rus_name:'Libérer des esclaves', name:'free_slaves', malus:751, navyki:{swim:1,shot:1,leadership:1,tactic:1,appearance:1}, resultaty:{dengi:84, opyt:93, vezenie:28, boom:92, produkty:{1834:5}}};\n\
raboty[124] = {rus_name:'Faire son show chez Buffalo Bill', name:'buffelo_bill', malus:801, navyki:{ride:1,shot:1,animal:1,appearance:2}, resultaty:{dengi:92, opyt:94, vezenie:65, boom:70, produkty:{1835:5}}};\n\
raboty[126] = {rus_name:'Récolter de l\\'indigo', name:'indigo_gathering', malus:591, navyki:{reflex:1,finger_dexterity:2,tactic:1,trade:1}, resultaty:{dengi:10, opyt:73, vezenie:56, boom:68, produkty:{1825:6}}};\n\
\
raboty[125] = {rus_name:'Régénération', name:'health', malus:0, navyki:{health:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:0, produkty:{}}};\
\
raboty[131] = {rus_name:'Agrandissement de la ville/Fort', name:'build', malus:0, navyki:{build:3,repair:1,leadership:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:0, produkty:{}}};\
\
raboty[201] = {rus_name:'Attaquer le Fort', name:'attack', malus:0, navyki:{aim:.5,dodge:.5,endurance:1,leadership:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\
raboty[202] = {rus_name:'Attaquer le Fort (Viser)', name:'attack', malus:0, navyki:{aim:1,dodge:.001,endurance:1,leadership:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\
raboty[203] = {rus_name:'Attaquer le Fort (Esquiver)', name:'attack', malus:0, navyki:{aim:.001,dodge:1,endurance:1,leadership:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\
raboty[204] = {rus_name:'Défendre le Fort', name:'defend', malus:0, navyki:{aim:.5,dodge:.5,hide:1,leadership:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:50, produkty:{}}};\
raboty[205] = {rus_name:'Défendre le Fort (Viser)', name:'defend', malus:0, navyki:{aim:1,dodge:.001,hide:1,leadership:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:50, produkty:{}}};\
raboty[206] = {rus_name:'Défendre le Fort (Esquiver)', name:'defend', malus:0, navyki:{aim:.001,dodge:1,hide:1,leadership:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:50, produkty:{}}};\
\
raboty[140] = {rus_name:'\u25B7 \u25B7 \u25B7 \u25B7 \u25B7 ', name:'energy', malus:-1, navyki:{}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:0, produkty:{}}};\
raboty[141] = {rus_name:'Déplacement', name:'moving', malus:-1, navyki:{}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:0, produkty:{}}};\
\n\
raboty[151] = {rus_name:'Arme à feu (Attaquant) 1', name:'sh_vs_sh_at', malus:0, navyki:{aim:.75,dodge:.25,shot:1,reflex:.75,tough:.25,appearance:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\n\
raboty[152] = {rus_name:'Arme à feu (Attaquant) 2', name:'sh_vs_me_at', malus:0, navyki:{aim:.75,dodge:.25,shot:1,reflex:.25,tough:.75,appearance:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\n\
raboty[153] = {rus_name:'Arme à feu Build Défensif Mixte 1', name:'sh_vs_al_de', malus:0, navyki:{aim:.5,dodge:1,shot:.5,reflex:.75,tough:.25,tactic:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\n\
raboty[154] = {rus_name:'Arme à feu Build Défensif Mixte 2', name:'sh_vs_sh_de', malus:0, navyki:{aim:.75,dodge:.25,shot:.5,reflex:1,tough:.5,tactic:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\n\
raboty[155] = {rus_name:'Arme à feu Build Défensif Mixte 3', name:'sh_vs_me_de', malus:0, navyki:{aim:.75,dodge:.25,shot:.5,reflex:.5,tough:1,tactic:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\n\
raboty[156] = {rus_name:'Arme à feu + Vie (Attaquant) 1', name:'sh_vs2_sh_at', malus:0, navyki:{aim:.75,dodge:.25,shot:1,reflex:.75,tough:.25,appearance:1,health:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\n\
raboty[157] = {rus_name:'Arme à feu + Vie (Attaquant) 2', name:'sh_vs2_me_at', malus:0, navyki:{aim:.75,dodge:.25,shot:1,reflex:.25,tough:.75,appearance:1,health:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\n\
raboty[158] = {rus_name:'Arme à feu + Vie (Défenseur) 1', name:'sh_vs2_al_de', malus:0, navyki:{aim:.75,dodge:.25,shot:1,reflex:.75,tough:.25,tactic:1,health:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\n\
raboty[159] = {rus_name:'Arme à feu + Vie (Défenseur) 2', name:'sh_vs2_sh_de', malus:0, navyki:{aim:.75,dodge:.25,shot:1,reflex:.25,tough:.75,tactic:1,health:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\n\
raboty[160] = {rus_name:'Arme à feu Build Défensif Mixte + Vie', name:'sh_vs2_me_de', malus:0, navyki:{aim:.25,dodge:1,shot:.25,reflex:1,tough:1,tactic:1,health:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\n\
raboty[161] = {rus_name:'Arme de contact (Attaquant) 1', name:'me_vs_sh_at', malus:0, navyki:{aim:0.75,dodge:0.5,punch:1,tough:.5,reflex:1,appearance:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\n\
raboty[162] = {rus_name:'Arme de contact (Attaquant) 2', name:'me_vs_me_at', malus:0, navyki:{aim:0.75,dodge:0.5,punch:1,tough:1,reflex:.5,appearance:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\n\
raboty[163] = {rus_name:'Arme de contact Build Défense (Défenseur) 1', name:'me_vs_al_de', malus:0, navyki:{aim:0.75,dodge:0.5,punch:1,tough:1,reflex:1,tactic:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\n\
raboty[164] = {rus_name:'Arme de contact Build Défense (Défenseur) 2', name:'me_vs_sh_de', malus:0, navyki:{aim:0.75,dodge:0.5,punch:1,tough:.5,reflex:1,tactic:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\n\
raboty[165] = {rus_name:'Arme de contact Build Défense (Défenseur) 3', name:'me_vs_me_de', malus:0, navyki:{aim:0.75,dodge:0.5,punch:1,tough:1,reflex:.5,tactic:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\n\
raboty[166] = {rus_name:'Arme de contact + Vie (Attaquant) 1', name:'me_vs2_sh_at', malus:0, navyki:{aim:0.75,dodge:0.5,punch:1,tough:.5,reflex:1,appearance:1,health:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\n\
raboty[167] = {rus_name:'Arme de contact + Vie (Attaquant) 2', name:'me_vs2_me_at', malus:0, navyki:{aim:0.75,dodge:0.5,punch:1,tough:1,reflex:.5,appearance:1,health:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\n\
raboty[168] = {rus_name:'Arme de contact Build Défense + Vie (Défenseur) 1', name:'me_vs2_al_de', malus:0, navyki:{aim:0.75,dodge:0.5,punch:1,tough:1,reflex:1,tactic:1,health:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\n\
raboty[169] = {rus_name:'Arme de contact Build Défense + Vie (Défenseur) 2', name:'me_vs2_sh_de', malus:0, navyki:{aim:0.75,dodge:0.5,punch:1,tough:.5,reflex:1,tactic:1,health:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\n\
raboty[170] = {rus_name:'Arme de contact Build Défense + Vie (Défenseur) 3', name:'me_vs2_me_de', malus:0, navyki:{aim:0.75,dodge:0.5,punch:1,tough:1,reflex:.5,tactic:1,health:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};\n\
\n\
";

// Formules des Set
/***************************************************************************************
	Erreur sur la vitesse de +/- 5 à 10% pour les set: Mexicain, Indien et Charlatant 
	A corriger une fois le calcule theorique terminé! 
	/!\ Valeur aprochés pour le speed des 3 set /!\ 
****************************************************************************************/
pk2_code += "\
komplekty={};\
\
komplekty.set_farmer=[];\
komplekty.set_farmer[1] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.set_farmer[2] = {bonus:{attributes:{flexibility:1, strength:1}, skills:{}}, speed:null, raboty:[]};\
komplekty.set_farmer[2].raboty[8]=10;komplekty.set_farmer[2].raboty[12]=10;komplekty.set_farmer[2].raboty[13]=10;\
komplekty.set_farmer[3] = {bonus:{attributes:{flexibility:1, strength:1, dexterity:1, charisma:1}, skills:{}}, speed:null, raboty:[]};\
komplekty.set_farmer[3].raboty[8]=10;komplekty.set_farmer[3].raboty[12]=10;komplekty.set_farmer[3].raboty[13]=10;\
komplekty.set_farmer[3].raboty[88]=20;komplekty.set_farmer[3].raboty[30]=20;komplekty.set_farmer[3].raboty[22]=20;\
komplekty.set_farmer[4] = {bonus:{attributes:{flexibility:2, strength:2, dexterity:2, charisma:2}, skills:{}}, speed:null, raboty:[]};\
komplekty.set_farmer[4].raboty[8]=10;komplekty.set_farmer[4].raboty[12]=10;komplekty.set_farmer[4].raboty[13]=10;\
komplekty.set_farmer[4].raboty[88]=20;komplekty.set_farmer[4].raboty[30]=20;komplekty.set_farmer[4].raboty[22]=20;\
komplekty.set_farmer[4].raboty[48]=40;komplekty.set_farmer[4].raboty[84]=40;komplekty.set_farmer[4].raboty[44]=40;\
komplekty.set_farmer[5] = {bonus:{attributes:{flexibility:2, strength:2, dexterity:2, charisma:2}, skills:{}}, speed:null, raboty:[]};\
komplekty.set_farmer[5].raboty[8]=10;komplekty.set_farmer[5].raboty[12]=10;komplekty.set_farmer[5].raboty[13]=10;\
komplekty.set_farmer[5].raboty[88]=20;komplekty.set_farmer[5].raboty[30]=20;komplekty.set_farmer[5].raboty[22]=20;\
komplekty.set_farmer[5].raboty[48]=40;komplekty.set_farmer[5].raboty[84]=40;komplekty.set_farmer[5].raboty[44]=40;\
komplekty.set_farmer[5].raboty[95]=40;\
komplekty.set_farmer[6] = {bonus:{attributes:{flexibility:2, strength:2, dexterity:2, charisma:2}, skills:{}}, speed:null, raboty:[]};\
komplekty.set_farmer[6].raboty[8]=10;komplekty.set_farmer[6].raboty[12]=10;komplekty.set_farmer[6].raboty[13]=10;\
komplekty.set_farmer[6].raboty[88]=20;komplekty.set_farmer[6].raboty[30]=20;komplekty.set_farmer[6].raboty[22]=20;\
komplekty.set_farmer[6].raboty[48]=40;komplekty.set_farmer[6].raboty[84]=40;komplekty.set_farmer[6].raboty[44]=40;\
komplekty.set_farmer[6].raboty[95]=40;komplekty.set_farmer[6].raboty[96]=40;\
komplekty.set_farmer[7] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.set_farmer[8] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
\
komplekty.set_indian=[];\
komplekty.set_indian[1] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.set_indian[2] = {bonus:{attributes:{flexibility:2}, skills:{hide:8}}, speed:0.8696, raboty:[]};\
komplekty.set_indian[2].raboty[51]=30;\
komplekty.set_indian[3] = {bonus:{attributes:{flexibility:5}, skills:{hide:8, swim:8}}, speed:0.7692, raboty:[]};\
komplekty.set_indian[3].raboty[51]=30;komplekty.set_indian[3].raboty[52]=40;\
komplekty.set_indian[4] = {bonus:{attributes:{flexibility:8}, skills:{hide:8, swim:8, pitfall:8}}, speed:0.6944, raboty:[]};\
komplekty.set_indian[4].raboty[51]=30;komplekty.set_indian[4].raboty[52]=40;komplekty.set_indian[4].raboty[58]=50;\
komplekty.set_indian[5] = {bonus:{attributes:{flexibility:12}, skills:{hide:8, swim:8, pitfall:8, animal:8}}, speed:0.625, raboty:[]};\
komplekty.set_indian[5].raboty[51]=30;komplekty.set_indian[5].raboty[52]=40;komplekty.set_indian[5].raboty[58]=50;\
komplekty.set_indian[5].raboty[66]=60;\
komplekty.set_indian[6] = {bonus:{attributes:{flexibility:16}, skills:{hide:8, swim:8, pitfall:8, animal:8, shot:8}}, speed:0.571, raboty:[]};\
komplekty.set_indian[6].raboty[51]=30;komplekty.set_indian[6].raboty[52]=40;komplekty.set_indian[6].raboty[58]=50;\
komplekty.set_indian[6].raboty[66]=60;komplekty.set_indian[6].raboty[114]=70;\
komplekty.set_indian[7] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.set_indian[8] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
\
komplekty.set_mexican=[];\
komplekty.set_mexican[1] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.set_mexican[2] = {bonus:{attributes:{strength:1}, skills:{}}, speed:0.8929, raboty:[]};\
komplekty.set_mexican[3] = {bonus:{attributes:{strength:2}, skills:{}}, speed:0.8065, raboty:[]};\
komplekty.set_mexican[3].raboty[86]=60;\
komplekty.set_mexican[4] = {bonus:{attributes:{strength:4}, skills:{}}, speed:0.7353, raboty:[]};\
komplekty.set_mexican[4].raboty[86]=60;komplekty.set_mexican[4].raboty[67]=70;\
komplekty.set_mexican[5] = {bonus:{attributes:{strength:6}, skills:{}}, speed:0.6757, raboty:[]};\
komplekty.set_mexican[5].raboty[86]=60;komplekty.set_mexican[5].raboty[67]=70;komplekty.set_mexican[5].raboty[83]=80;\
komplekty.set_mexican[6] = {bonus:{attributes:{strength:9}, skills:{}}, speed:0.625, raboty:[]};\
komplekty.set_mexican[6].raboty[86]=60;komplekty.set_mexican[6].raboty[67]=70;komplekty.set_mexican[6].raboty[83]=80;\
komplekty.set_mexican[6].raboty[50]=90;\
komplekty.set_mexican[7] = {bonus:{attributes:{strength:12}, skills:{}}, speed:0.525, raboty:[]};\
komplekty.set_mexican[7].raboty[86]=60;komplekty.set_mexican[7].raboty[67]=70;komplekty.set_mexican[7].raboty[83]=80;\
komplekty.set_mexican[7].raboty[50]=90;komplekty.set_mexican[7].raboty[115]=100;\
komplekty.set_mexican[8] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
\
komplekty.set_quackery=[];\
komplekty.set_quackery[1] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.set_quackery[2] = {bonus:{attributes:{dexterity:1}, skills:{endurance:5, trade:5}}, speed:null, raboty:[]};\
komplekty.set_quackery[2].raboty[79]=30;\
komplekty.set_quackery[3] = {bonus:{attributes:{dexterity:2}, skills:{endurance:10, trade:10}}, speed:null, raboty:[]};\
komplekty.set_quackery[3].raboty[79]=60;\
komplekty.set_quackery[4] = {bonus:{attributes:{dexterity:4}, skills:{endurance:15, trade:15}}, speed:null, raboty:[]};\
komplekty.set_quackery[4].raboty[79]=90;\
komplekty.set_quackery[5] = {bonus:{attributes:{dexterity:6}, skills:{endurance:20, trade:20}}, speed:null, raboty:[]};\
komplekty.set_quackery[5].raboty[79]=120;\
komplekty.set_quackery[6] = {bonus:{attributes:{dexterity:9}, skills:{endurance:20, trade:20, reflex:18, tough:18, aim:18, shot:18}}, speed:null, raboty:[]};\
komplekty.set_quackery[6].raboty[79]=120;\
komplekty.set_quackery[7] = {bonus:{attributes:{dexterity:12}, skills:{endurance:20, trade:20, reflex:18, dodging:18, tough:18, aim:18, shot:18, leadership:18, appearance:18}}, speed:null, raboty:[]};\
komplekty.set_quackery[7].raboty[79]=120;komplekty.set_quackery[7].raboty[113]=50;\
komplekty.set_quackery[8] = {bonus:{attributes:{dexterity:12}, skills:{endurance:20, trade:20, reflex:18, dodging:18, tough:18, aim:18, shot:18, leadership:18, appearance:18}}, speed:0.6, raboty:[]};\
komplekty.set_quackery[8].raboty[79]=120;komplekty.set_quackery[8].raboty[113]=50;komplekty.set_quackery[8].raboty[113]=100;\
\
komplekty.set_pilgrim_male=[];\
komplekty.set_pilgrim_male[1] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.set_pilgrim_male[2] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.set_pilgrim_male[2].raboty[131]=5;\
komplekty.set_pilgrim_male[3] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.set_pilgrim_male[3].raboty[131]=15;\
komplekty.set_pilgrim_male[4] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.set_pilgrim_male[4].raboty[131]=30;\
komplekty.set_pilgrim_male[5] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.set_pilgrim_male[5].raboty[131]=50;komplekty.set_pilgrim_male[5].raboty[62]=150;\
komplekty.set_pilgrim_male[6] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.set_pilgrim_male[6] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.set_pilgrim_male[6].raboty[131]=50;komplekty.set_pilgrim_male[6].raboty[62]=150;\
komplekty.set_pilgrim_male[6].raboty[118]=175;\
komplekty.set_pilgrim_male[7] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.set_pilgrim_male[8] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
\
komplekty.set_pilgrim_female=[];\
komplekty.set_pilgrim_female[1] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.set_pilgrim_female[2] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.set_pilgrim_female[2].raboty[131]=5;\
komplekty.set_pilgrim_female[3] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.set_pilgrim_female[3].raboty[131]=15;\
komplekty.set_pilgrim_female[4] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.set_pilgrim_female[4].raboty[131]=30;\
komplekty.set_pilgrim_female[5] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.set_pilgrim_female[5].raboty[131]=50;komplekty.set_pilgrim_female[5].raboty[62]=150;\
komplekty.set_pilgrim_female[6] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.set_pilgrim_female[6] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.set_pilgrim_female[6].raboty[131]=50;komplekty.set_pilgrim_female[6].raboty[62]=150;\
komplekty.set_pilgrim_female[6].raboty[118]=175;\
komplekty.set_pilgrim_female[7] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.set_pilgrim_female[8] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
\
komplekty.set_gentleman=[];\
komplekty.set_gentleman[1] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.set_gentleman[2] = {bonus:{attributes:{charisma:1}, skills:{appearance:8}}, speed:null, raboty:[]};\
for (i=1;i<126;++i) {komplekty.set_gentleman[2].raboty[i]=5};komplekty.set_gentleman[2].raboty[131]=5;\
komplekty.set_gentleman[3] = {bonus:{attributes:{charisma:3}, skills:{appearance:8, leadership:8}}, speed:null, raboty:[]};\
for (i=1;i<126;++i) {komplekty.set_gentleman[3].raboty[i]=15};komplekty.set_gentleman[3].raboty[131]=15;\
komplekty.set_gentleman[4] = {bonus:{attributes:{charisma:6}, skills:{appearance:8, leadership:8, trade:8}}, speed:null, raboty:[]};\
for (i=1;i<126;++i) {komplekty.set_gentleman[4].raboty[i]=30};komplekty.set_gentleman[4].raboty[131]=30;\
komplekty.set_gentleman[5] = {bonus:{attributes:{charisma:10}, skills:{appearance:16, leadership:8, trade:8}}, speed:null, raboty:[]};\
for (i=1;i<126;++i) {komplekty.set_gentleman[5].raboty[i]=50};komplekty.set_gentleman[5].raboty[131]=50;\
komplekty.set_gentleman[6] = {bonus:{attributes:{charisma:15}, skills:{appearance:25, leadership:8, trade:8}}, speed:null, raboty:[]};\
for (i=1;i<126;++i) {komplekty.set_gentleman[6].raboty[i]=75};komplekty.set_gentleman[6].raboty[131]=75;\
komplekty.set_gentleman[7] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.set_gentleman[8] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
\
komplekty.set_dancer=[];\
komplekty.set_dancer[1] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.set_dancer[2] = {bonus:{attributes:{charisma:2}, skills:{appearance:10}}, speed:null, raboty:[]};\
for (i=1;i<126;++i) {komplekty.set_dancer[2].raboty[i]=5};komplekty.set_dancer[2].raboty[131]=5;\
komplekty.set_dancer[3] = {bonus:{attributes:{charisma:5}, skills:{appearance:10, animal:10}}, speed:null, raboty:[]};\
for (i=1;i<126;++i) {komplekty.set_dancer[3].raboty[i]=15};komplekty.set_dancer[3].raboty[131]=15;\
komplekty.set_dancer[4] = {bonus:{attributes:{charisma:9}, skills:{appearance:10, animal:10, finger_dexterity:12}}, speed:null, raboty:[]};\
for (i=1;i<126;++i) {komplekty.set_dancer[4].raboty[i]=30};komplekty.set_dancer[4].raboty[131]=30;\
komplekty.set_dancer[5] = {bonus:{attributes:{charisma:11},skills:{endurance :6, appearance:16, animal:10, finger_dexterity:12}}, speed:null, raboty:[]};\
for (i=1;i<126;++i) {komplekty.set_dancer[5].raboty[i]=50};komplekty.set_dancer[5].raboty[131]=50;\
komplekty.set_dancer[6] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.set_dancer[7] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.set_dancer[8] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
\
komplekty.fireworker_set=[];\
komplekty.fireworker_set[1] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.fireworker_set[1].raboty[90]=15;\
komplekty.fireworker_set[2] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.fireworker_set[3] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.fireworker_set[4] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.fireworker_set[5] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.fireworker_set[6] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.fireworker_set[7] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.fireworker_set[8] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
\
komplekty.gold_set=[];\
komplekty.gold_set[1] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.gold_set[2] = {bonus:{attributes:{}, skills:{health:8}}, speed:0.8333, raboty:[]};\
for (i=1;i<126;++i) {komplekty.gold_set[2].raboty[i]=25};komplekty.gold_set[2].raboty[131]=25;\
komplekty.gold_set[3] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.gold_set[4] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.gold_set[5] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.gold_set[6] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.gold_set[7] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.gold_set[8] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
\
komplekty.greenhorn_set=[];\
komplekty.greenhorn_set[1] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.greenhorn_set[2] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.greenhorn_set[2].raboty[6]=10;\
komplekty.greenhorn_set[3] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.greenhorn_set[3].raboty[6]=10;komplekty.greenhorn_set[3].raboty[27]=20;\
komplekty.greenhorn_set[4] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.greenhorn_set[4].raboty[6]=10;komplekty.greenhorn_set[4].raboty[27]=20;komplekty.greenhorn_set[4].raboty[17]=20;\
komplekty.greenhorn_set[5] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.greenhorn_set[5].raboty[6]=10;komplekty.greenhorn_set[5].raboty[27]=20;komplekty.greenhorn_set[5].raboty[17]=20;komplekty.greenhorn_set[5].raboty[20]=20;\
komplekty.greenhorn_set[6] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.greenhorn_set[6].raboty[6]=10;komplekty.greenhorn_set[6].raboty[27]=20;komplekty.greenhorn_set[6].raboty[17]=20;komplekty.greenhorn_set[6].raboty[20]=20;komplekty.greenhorn_set[6].raboty[22]=20;\
komplekty.greenhorn_set[7] = {bonus:{attributes:{}, skills:{}}, speed:null, raboty:[]};\
komplekty.greenhorn_set[7].raboty[6]=10;komplekty.greenhorn_set[7].raboty[27]=20;komplekty.greenhorn_set[7].raboty[17]=20;komplekty.greenhorn_set[7].raboty[20]=20;komplekty.greenhorn_set[7].raboty[22]=20;\
for (i=1;i<126;++i) {komplekty.greenhorn_set[7].raboty[i]=5};komplekty.greenhorn_set[7].raboty[130]=5;\
komplekty.greenhorn_set[8] = {bonus:{attributes:{strength:1, charisma:1}, skills:{}}, speed:0.8333, raboty:[]};\
komplekty.greenhorn_set[8].raboty[6]=10;komplekty.greenhorn_set[8].raboty[27]=20;komplekty.greenhorn_set[8].raboty[17]=20;komplekty.greenhorn_set[8].raboty[20]=20;komplekty.greenhorn_set[8].raboty[22]=20;\
for (i=1;i<126;++i) {komplekty.greenhorn_set[8].raboty[i]=15};komplekty.greenhorn_set[8].raboty[130]=15;\
";

// Attribut/Aptitude 
pk2_code += "\
pk2_vse_navyki=['build' ,'punch' ,'tough' ,'endurance' ,'health' ,'ride' ,'reflex' ,'dodge' ,'hide' ,'swim' ,'aim' ,'shot' ,'pitfall' ,'finger_dexterity' ,'repair' ,'leadership' ,'tactic' ,'trade' ,'animal' ,'appearance'];\
pk2_vse_kharakteristiki=['strength', 'flexibility', 'dexterity', 'charisma'];\
";

// ================== funkcje ==================

aWindow.assign_citem = function (tid, obj){
	aWindow.items[tid] = {item_id:tid, nshort:obj.short, name:obj.name, type:obj.type, level:obj.level, price:obj.price, image:obj.image, image_mini:obj.image_mini, characterClass:obj.characterClass, characterSex:obj.characterSex, speed:obj.speed, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'shop'};
    for (zz = aWindow.pk2_vse_navyki.length-1;zz >=0;--zz){
        ss = aWindow.pk2_vse_navyki[zz];
	    if (obj.bonus.skills[ss])
	        aWindow.items[tid].bonus.skills[ss]=obj.bonus.skills[ss];
	}
    for (zz = aWindow.pk2_vse_kharakteristiki.length-1;zz >=0;--zz){
        aa = aWindow.pk2_vse_kharakteristiki[zz];
        if (obj.bonus.attributes[aa])
	        aWindow.items[tid].bonus.attributes[aa]=obj.bonus.attributes[aa];
	}
	if (obj.set){
	    aWindow.items[tid].set.key = obj.set.key;
	    aWindow.items[tid].set.name = obj.set.name;
	}
}

aWindow.compare_citem = function (tid, item){
	soft = true;
	hard = true;
	if (aWindow.items[tid].item_id!=item.item_id) return;
	if (aWindow.items[tid].nshort!=item.short){hard=false;aWindow.items[tid].nshort=item.short};
	if (aWindow.items[tid].name!=item.name){soft=false;aWindow.items[tid].name=item.name};
	if (aWindow.items[tid].type!=item.type){hard=false;aWindow.items[tid].type=item.type}
	if (aWindow.items[tid].level!=item.level){hard=false;aWindow.items[tid].level=item.level}
	if (aWindow.items[tid].price!=item.price){hard=false;aWindow.items[tid].price=item.price}
	if (aWindow.items[tid].image!=item.image){hard=false;aWindow.items[tid].image=item.image}
	if (aWindow.items[tid].image_mini!=item.image_mini){hard=false;aWindow.items[tid].image_mini=item.image_mini}
	if (aWindow.items[tid].characterClass!=item.characterClass){hard=false;aWindow.items[tid].characterClass=item.characterClass}
	if (aWindow.items[tid].characterSex!=item.characterSex){hard=false;aWindow.items[tid].characterSex=item.characterSex}
	if (aWindow.items[tid].speed!=item.speed){hard=false;aWindow.items[tid].speed=item.speed}
    
    for (zz = aWindow.pk2_vse_navyki.length-1;zz >=0;--zz){
        num_index = aWindow.pk2_vse_navyki[zz];
        if (item.bonus.skills[num_index]&&aWindow.items[tid].bonus.skills[num_index]){
            if (item.bonus.skills[num_index]!=aWindow.items[tid].bonus.skills[num_index]){
                hard=false;
                break;
            }
        }
        else if (item.bonus.skills[num_index]||aWindow.items[tid].bonus.skills[num_index]){
            hard=false;
            break;
        }
    }    
    for (zz = aWindow.pk2_vse_kharakteristiki.length-1;zz >=0;--zz){
        num_index = aWindow.pk2_vse_kharakteristiki[zz];
        if (item.bonus.attributes[num_index]&&aWindow.items[tid].bonus.attributes[num_index]){
            if (item.bonus.attributes[num_index]!=aWindow.items[tid].bonus.attributes[num_index]){
                hard=false;
                break;
            }
        }
        else if (item.bonus.attributes[num_index]||aWindow.items[tid].bonus.attributes[num_index]){
            hard=false;
            break;
        }
    }    
    
	if (!item.set){
	    if (aWindow.items[tid].set.key){ hard=false;}
	}
	else{
	    if (item.set.key!=aWindow.items[tid].set.key){
	        hard=false;
	    }
	    if (item.set.name!=aWindow.items[tid].set.name){
	        soft=false;
	    }
	}
	res={h:hard,s:soft};
	return res;
}

aWindow.print_citem = function (tid){
	result='';
	result += 'items[' + aWindow.items[tid].item_id + '] = {item_id:' + aWindow.items[tid].item_id + ', nshort:\'' + aWindow.items[tid].nshort;
	result += '\', name:\'' + aWindow.items[tid].name + '\', type:\'' + aWindow.items[tid].type + '\', level:' + aWindow.items[tid].level;
	result += ', price:' + aWindow.items[tid].price + ', image:\'' + aWindow.items[tid].image + '\', image_mini:\'' + aWindow.items[tid].image_mini + '\', characterClass:';
	cc = aWindow.items[tid].characterClass ? '\'' + aWindow.items[tid].characterClass + '\'' : null;
	result += cc + ', characterSex:';
	cs = aWindow.items[tid].characterSex ? '\'' + aWindow.items[tid].characterSex + '\'' : null;
	result += cs + ', speed:' + aWindow.items[tid].speed;
	if (aWindow.items[tid].bonus) {
		result += ', bonus:{skills:';
		ww = false;
		for (zz = aWindow.pk2_vse_navyki.length-1; zz >=0; --zz ){
		    if (aWindow.items[tid].bonus.skills[aWindow.pk2_vse_navyki[zz]]) {
				if (ww) {
					result += ', '
				}
				else {
					ww = true;
					result += '{'
				}
				result += aWindow.pk2_vse_navyki[zz] + ':' + aWindow.items[tid].bonus.skills[aWindow.pk2_vse_navyki[zz]];
			}
		}
		if (ww){
   			result += '}, '
		}
		else {
			result += '{}, ';
		}
		result += 'attributes:';
		ww = false;
		for (zz = aWindow.pk2_vse_kharakteristiki.length-1; zz >=0; --zz ){
		    if (aWindow.items[tid].bonus.attributes[aWindow.pk2_vse_kharakteristiki[zz]]){
				if (ww) {
					result += ', '
				}
				else {
					ww = true;
					result += '{'
				}
				result += aWindow.pk2_vse_kharakteristiki[zz] + ':' + aWindow.items[tid].bonus.attributes[aWindow.pk2_vse_kharakteristiki[zz]];
			}
		}
		if (ww){
		    result += '}'
		}
		else {
			result += '{}';
		}
		result += '}, ';
	}
	else {
		result += '{skills:{}, attributes:{}}, '
	}
	if (aWindow.items[tid].set.key) {
		result += 'set:{key:\'' + aWindow.items[tid].set.key + '\', name:\'' + aWindow.items[tid].set.name + '\'}'
	}
	else {
		result += 'set:{key:null, name:null}'
	}
	result += ', shop:\''+aWindow.items[tid].shop+'\'};';
	return result;
}

pk2_code += "\
komp_rab = {};\
komp_zas = {};\
komp_skor = {};\
komp_fort = {};\
for (i=0;i < nabory.length;++i){\
	komp_rab[nabory[i]] = [];\
	komp_zas[nabory[i]] = [];\
	komp_skor[nabory[i]]= [];\
	komp_fort[nabory[i]]= [];\
};\
\
vyborka={};\
vyborka_z={};\
vyborka_r={};\
prosto_veschi=[];\
prosto_veschi_max=8;\
for (ii = pk2_types.length; ii >= 0; --ii) {\
	vyborka[pk2_types[ii]] = {};\
	vyborka[pk2_types[ii]].simple = {};\
	vyborka[pk2_types[ii]].simple.spisok = [];\
	vyborka_z[pk2_types[ii]] = {};\
	vyborka_z[pk2_types[ii]].simple = {};\
	vyborka_z[pk2_types[ii]].simple.spisok = [];\
	vyborka_r[pk2_types[ii]] = {};\
	vyborka_r[pk2_types[ii]].simple = {};\
	vyborka_r[pk2_types[ii]].simple.spisok = [];\
	prosto_veschi[pk2_types[ii]]={};\
};\
\
resultaty=[];\
resultaty_z=[];\
resultaty_r=[];\
zaschita=null;\
ezda = false;\
rabnavyki=[];\
rabnavyki_z=[];\
rabnavyki_r=[];\
\
pk2_htmlrab=[];\
pk2_sortrab=[];\
pk2_hiderab=[];\
pk2_bezto=0;\
\
pk2_predmetov = {};\
pk2_khochuka = [];\
pk2_uchet=[];\
pk2_aktiv=[];\
porabotaj=[];\
pk2_slots={};\
for (i=0;i<pk2_types.length;++i){\
	pk2_slots[pk2_types[i]]=true;\
};\
irabota=0;\
samoe_ono={};\
deneg_ushlo = 0;\
bablo = 0;\
\
i_slot_max=[];\
i_slot=[];\
\
ic_obj = [];\
ic_objr = [];\
ic_objr = [];\
ii_rekur=0;\
rekurs_delay = 100;\
rekurs_step = 0;\
rekurs_time = 25000;\
rekurs_up = true;\
pk2_to=0;\
pk2_zas=0;\
pk2_ride=0; \
pers={};\
pk2_speed=1.0;\
ezda=false;\
pk2_onesk_rabot = false;\
chislo_rabot = 0;\
chislo_rabot_to = 0;\
khoroshi = [];\
khoroshi_to = [];\
";



aWindow.pk2_iimport = function(){
	bagazh=aWindow.Bag.getInstance();
	odezhda=aWindow.Wear.wear;
	for(vv in bagazh.items){
	aWindow.pk2_inv_imported=true;
		cobj = bagazh.items[vv].obj;
		tid = cobj.item_id;
		if (!aWindow.pk2_uchet[tid]){
			aWindow.pk2_uchet[tid]=true;
			if (aWindow.items[tid]){
				var cres={h:null,s:null};
				cres=aWindow.compare_citem(tid, cobj);
				if (!cres.h)	{
					aWindow.einfo+='Les informations ne sont pas à jour! Version du script: '+TwuVers+'\n';
					aWindow.assign_citem(tid, cobj);
					aWindow.einfo+=aWindow.print_citem(tid)+'\n';
				}
				else if(!cres.s){
					aWindow.winfo+='Items à mettre à jour. Version du script: '+TwuVers+'\n';
					aWindow.assign_citem(tid, cobj);
					aWindow.winfo+=aWindow.print_citem(tid)+'\n';
				}
			}
			else{
				aWindow.items[tid] = {item_id:tid, nshort:'nothing', name:'vide', type:'pants', level:0, price:0, image:'images/items/right_arm/clayjug.png', image_mini:'images/items/right_arm/mini/clayjug.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'nil'};
				aWindow.assign_citem(tid, cobj);
				aWindow.einfo+='Items à mettre à jour. Version du script: '+TwuVers+'\n';
				aWindow.einfo+=aWindow.print_citem(tid)+'\n';
			}
		}
	}
	for(vv in aWindow.Wear.wear){
		if (!aWindow.Wear.wear[vv])
			continue;
		cobj = aWindow.Wear.wear[vv].obj;
		tid = cobj.item_id;
		aWindow.pk2_equipment[vv]=tid;
		if (!aWindow.pk2_uchet[tid]){
			aWindow.pk2_uchet[tid]=true;
			if (aWindow.items[tid]){
				var cres={h:null,s:null};
				cres=aWindow.compare_citem(tid, cobj);
				if (!cres.h)	{
					aWindow.einfo+='Les informations ne sont pas à jour! Version du script: '+TwuVers+'\n';
					aWindow.assign_citem(tid, cobj);
					aWindow.einfo+=aWindow.print_citem(tid)+'\n';
				}
				else if(!cres.s){
					aWindow.winfo+='Items à mettre à jour. Version du script: '+TwuVers+'\n';
					aWindow.assign_citem(tid, cobj);
					aWindow.winfo+=aWindow.print_citem(tid)+'\n';
				}
			}
			else{
				aWindow.items[tid] = {item_id:tid, nshort:'nothing', name:'vide', type:'pants', level:0, price:0, image:'images/items/right_arm/clayjug.png', image_mini:'images/items/right_arm/mini/clayjug.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'nil'};
				aWindow.assign_citem(tid, cobj);
				aWindow.einfo+='Items à mettre à jour. Version du script: '+TwuVers+'\n';
				aWindow.einfo+=aWindow.print_citem(tid)+'\n';
			}
		}
	}
}

aWindow.pk2_mimport = function(){
	magaz=aWindow.TraderInventory.getInstance('pk2',0);
	if (!magaz) return;
	for(vv in magaz.items){
		cobj = magaz.items[vv].obj;
		tid = cobj.item_id;
		if (!aWindow.pk2_khochuka[tid]){
		    if (!aWindow.pk2_uchet[tid]){
		        aWindow.pk2_khochuka[tid]=true;
		    }
	    	if (aWindow.items[tid]){
				var cres={h:null,s:null};
				cres=aWindow.compare_citem(tid, cobj);
				/*
				if (!cres.h)	{
					aWindow.einfo+='Une partie des données dans le script est faux:\n';
					aWindow.assign_citem(tid, cobj);
					aWindow.einfo+=aWindow.print_citem(tid)+'\n';
				}
				
				else*/ if(!cres.s){
					aWindow.winfo+='Les informations ne sont pas à jour! Version du script: '+TwuVers+'\n';
					aWindow.assign_citem(tid, cobj);
					aWindow.winfo+=aWindow.print_citem(tid)+'\n';
				}
			}
			else{
				aWindow.items[tid] = {item_id:tid, nshort:'nothing', name:'vide', type:'pants', level:0, price:0, image:'images/items/right_arm/clayjug.png', image_mini:'images/items/right_arm/mini/clayjug.png', characterClass:null, characterSex:null, speed:null, bonus:{skills:{}, attributes:{}}, set:{key:null, name:null}, shop:'nil'};
				aWindow.assign_citem(tid, cobj);
				aWindow.einfo+='Items à mettre à jour. Version du script: '+TwuVers+'\n';
				aWindow.einfo+=aWindow.print_citem(tid)+'\n';
			}
		}
    }
}


aWindow.pk2_podschet = function  (vse_veschi, iz_magazinov, plus_level, pers){
	aWindow.pk2_aktiv=null;
	aWindow.pk2_aktiv=[];
	for (vv in aWindow.items){
		if (isNaN(vv)) continue;
		vesch=aWindow.items[vv];
		check=true;
		if (vesch.characterSex&&(vesch.characterSex!=pers.characterSex)) check=false;
		if (vesch.characterClass&&(vesch.characterClass!=pers.characterClass)) check=false;
		if (!aWindow.pk2_uchet[vesch.item_id]&&!aWindow.pk2_khochuka[vesch.item_id])
		{
			if (!vse_veschi){
				if (!iz_magazinov)
					check=false;
				else{
					if(vesch.shop!='shop')
						check=false;
				}
			}
			if ((vesch.shop=='shop')&&(vesch.price > aWindow.bablo)) check=false;
		}

	 if ((vesch.level != null)&&(vesch.level>(pers.level+plus_level))) check=false; // Erreur lors du comptage du lvl

		lit = pers.level+ plus_level+parseInt(pers.itemLevelRequirementDecrease[vesch.type],10)+pers.itemLevelRequirementDecrease.all;
		if (vesch.level > lit) check=false;
		if (aWindow.pk2_slots && aWindow.pk2_slots[vesch.type]&&!(aWindow.pk2_equipment[vesch.type]==vv)) check=false;
		if (check) aWindow.pk2_aktiv.push(vesch.item_id);
	}
}

aWindow.pk2_ocenka_khlama = function(){
    aWindow.pk2_nenuzhnoe=[];
    if (!aWindow.pk2_khlam)
        return;
    ispolz=[];
    for (irab=200; irab>0;irab--){
        if (aWindow.raboty[irab]){
            if (aWindow.resultaty[irab]){
                for (ee = 0; ee < aWindow.pk2_types.length; ++ee){
                    sid = aWindow.resultaty[irab].items[ee].tid;
                    ispolz[sid]=true;
                }
            }
            if (aWindow.resultaty_z[irab]){
                for (ee = 0; ee < aWindow.pk2_types.length; ++ee){
                    sid = aWindow.resultaty_z[irab].items[ee].tid;
                    ispolz[sid]=true;
                }
            }
            if (aWindow.resultaty_r[irab]){
                for (ee = 0; ee < aWindow.pk2_types.length; ++ee){
                    sid = aWindow.resultaty_r[irab].items[ee].tid;
                    ispolz[sid]=true;
                }
            }
        }
    }
//    
    for (tid in aWindow.pk2_uchet){
        if ((tid < 600)&&(tid >=200)&&(!ispolz[tid])){
            aWindow.pk2_nenuzhnoe[tid]=true;
        }
    }
// vérifier si l'identifiant est inférieure à
// ===
    for (tid in aWindow.pk2_uchet){
        if ((tid < 12700)&&(tid >=10000)&&(!ispolz[tid])){
            aWindow.pk2_nenuzhnoe[tid]=true;
        }
    }
// ===
}

aWindow.pk2_sortir = function (tip, minto){
    ind_arr = 0;
    aWindow.pk2_sortrab = [];
    for (irab in aWindow.pk2_htmlrab){
        if (aWindow.pk2_vse_raboty&&(aWindow.resultaty[irab].to <= -minto))
            continue;
        aWindow.pk2_sortrab[ind_arr] = {};
        aWindow.pk2_sortrab[ind_arr].index = irab;
        switch (tip){
        case 'd0': // Salaire
            aWindow.pk2_sortrab[ind_arr].ves = -aWindow.raboty[irab].resultaty.dengi;
            break;
        case 'o0': // Expérience
            aWindow.pk2_sortrab[ind_arr].ves = 0-aWindow.raboty[irab].resultaty.opyt;
            break;
        case 'v0': // Chance
            aWindow.pk2_sortrab[ind_arr].ves = 0-aWindow.raboty[irab].resultaty.vezenie;
            break;
        case 'boom': // Danger
            aWindow.pk2_sortrab[ind_arr].ves = 0-aWindow.raboty[irab].resultaty.boom;
            break;
        case 'name': // nom
            aWindow.pk2_sortrab[ind_arr].ves= (irab > 130) ? 'je ' : '';
            aWindow.pk2_sortrab[ind_arr].ves += aWindow.raboty[irab].rus_name;
            break;
        case 'malus': // Difficulté
            aWindow.pk2_sortrab[ind_arr].ves = 0-aWindow.raboty[irab].malus;
            break;
        case 'to': // PT
            aWindow.pk2_sortrab[ind_arr].ves = 0-aWindow.resultaty[irab].to;
            break;
        case 'do': // Salaire + Expérience
            aWindow.pk2_sortrab[ind_arr].ves = 0-aWindow.raboty[irab].resultaty.dengi - aWindow.raboty[irab].resultaty.opyt;
            break;
        case 'dt':
		dt = aWindow.resultaty[irab].to;
		if (dt){
			tmp = (1-.5/dt) * (1+dt/256);
			aWindow.pk2_sortrab[ind_arr].ves = 0 - aWindow.raboty[irab].resultaty.dengi*tmp;
		}
		else
			aWindow.pk2_sortrab[ind_arr].ves = 0;
		for (cid in aWindow.raboty[irab].resultaty.produkty){
			pr = aWindow.raboty[irab].resultaty.produkty[cid];
			aWindow.pk2_sortrab[ind_arr].ves -= aWindow.items[cid].price * pr * 0.005;
		}
            break;
        case 'dv': // Salaire + Chance
            aWindow.pk2_sortrab[ind_arr].ves = 0-aWindow.raboty[irab].resultaty.dengi - aWindow.raboty[irab].resultaty.vezenie;
            break;
        case 'ov': // Chance + Expérience
            aWindow.pk2_sortrab[ind_arr].ves = 0-aWindow.raboty[irab].resultaty.vezenie - aWindow.raboty[irab].resultaty.opyt;
            break;
        case 'dov': // Salaire + Chance + Expérience
            aWindow.pk2_sortrab[ind_arr].ves = 0-aWindow.raboty[irab].resultaty.dengi - aWindow.raboty[irab].resultaty.opyt - aWindow.raboty[irab].resultaty.vezenie;
            break;
        default:
            aWindow.pk2_sortrab[ind_arr].ves = irab;
        }
        ++ind_arr;
    }
    aWindow.qsort(aWindow.pk2_sortrab,0,ind_arr);
    aWindow.pk2_reporter2();
}

//aWindow.pk2_setbezto = function(checked){
//aWindow.pk2_bezto = !checked;
//}

aWindow.pk2_vesch_polezna = function(value){
    for (kh in aWindow.pk2_khochuka)
        aWindow.pk2_khochuka[kh] = false;
    if (value > 0)
        aWindow.pk2_khochuka[value] = true;
    aWindow.pk2_hideraboty(value);
}

aWindow.pk2_vreporter = function () {
    aWindow.pk2_show_window();
    vrvr = '<table>';
    for (count_rab in aWindow.porabotaj){
        if (!aWindow.prosto_veschi[count_rab])
            continue;
        vrvr += '<tr>';
        rabota = aWindow.raboty[count_rab];
        vrvr += '<td rowspan=\"2\">';
        vrvr += '<table><tbody><tr><th>'+rabota.rus_name+'</th></tr>';
        if ((count_rab > 150)&&(count_rab <= 170)){
            vrvr += '<tr><td><a href=\"javascript:pk2_show_shmot('+ count_rab +');\" >';
            vrvr += '<div style=\"width:63px; height:63px; background-image: url(\'/images/menu_buttons/duel.png\'); background-position: 80px 0;\"></div></a>';
        }
        else if ((count_rab > 132)&&(count_rab <= 150)){
            
        }
        else{
            vrvr += '<tr><td><a href=\"javascript:pk2_show_shmot2('+ count_rab +');\" >';
            vrvr += '<img style=\"float:left;\" src=\"';
            if (count_rab<=131){
                vrvr += 'images/jobs/';
            }
            vrvr +=rabota.name+'.png\" alt=\"'+rabota.rus_name+'\" title=\"'+rabota.rus_name+'\" /></a>';
        };

        rres = rabota.resultaty;
        for (ri in rres.produkty){
            vrvr+='<div style=\"display:inline; float:left; margin: 8px 1px;\"><div class=\"jy_bi\"><img style=\"-moz-user-select: none;\" ';
            vrvr+='title=\"'+aWindow.items[ri].name+'\" alt=\"'+aWindow.items[ri].name+'\" ';
            vrvr+='src=\"'+aWindow.items[ri].image_mini+'\" /></div><div class=\"jy_pk2\">'+rres.produkty[ri]+'%</div>';
            vrvr+='</div>';
        }
        vrvr += '</td></tr>';
        vrvr += '<tr><td>';
        vrvr += ' <a class=\"tt\" href=\"#\" style=\"color:black;\"><table><tr><td><img style=\"width:17px; height:17px;\" src=\"images/job/dollar.png\" /></td>';
        vrvr += '<td><div class="bar"><div class="bar_fill" style="width: '+Math.round(rres.dengi*3/2)+'px;"></div><div class="bar_perc">'+rres.dengi+'%</div></div>';
        vrvr += '<span>Salaire:'+rres.dengi+'</span></td></tr></table></a>';
        vrvr += ' <a class=\"tt\" href=\"#\" style=\"color:black;\"><table><tr><td><img style=\"width:17px; height:17px;\" src=\"images/job/experience.png\" /></td>';
        vrvr += '<td><div class="bar"><div class="bar_fill" style="width: '+Math.round(rres.opyt*3/2)+'px;"></div><div class="bar_perc">'+rres.opyt+'%</div></div>';
        vrvr += '<span>Chance:'+rres.opyt+'</span></td></tr></table></a>';
        vrvr += ' <a class=\"tt\" href=\"#\" style=\"color:black;\"><table><tr><td><img style=\"width:17px; height:17px;\" src=\"images/job/luck.png\" /></td>';
        vrvr += '<td><div class="bar"><div class="bar_fill" style="width: '+Math.round(rres.vezenie*3/2)+'px;"></div><div class="bar_perc">'+rres.vezenie+'%</div></div>';
        vrvr += '<span>Expérience:'+rres.vezenie+'</span></td></tr></table></a>';
        vrvr += ' <a class=\"tt\" href=\"#\" style=\"color:black;\"><table><tr><td><img style=\"width:17px; height:17px;\" src=\"images/job/danger.png\" /></td>';
        vrvr += '<td><div class="bar"><div class="bar_brown" style="width: '+Math.round(rres.boom*3/2)+'px;"></div><div class="bar_perc">'+rres.boom+'%</div></div>';
        vrvr += '<span>Danger:'+rres.boom+'</span></td></tr></table></a>';
        vrvr += '</td></tr></tbody></table>';

        vrvr += '</td><td>';

        if (count_rab!=141){
            vrvr += '<span title=\"Somme totale des aptitudes sans les bonus\" class="calculation_visualisation img_plus" style=\"margin-left:0px;\">';
	    	vrvr += '<span class="skill_box_value" style="text-align:center;">';
		    vrvr += (aWindow.resultaty[count_rab].to+aWindow.raboty[count_rab].malus-aWindow.resultaty[count_rab].ton)+'</span></span>';
            vrvr += '<span title=\"Bonus\" class="calculation_visualisation img_plus" style=\"margin-left:0px;\">';
	    	vrvr += '<span class="skill_box_value green_text" style="text-align:center;">'+aWindow.resultaty[count_rab].ton+'</span></span>';
		    vrvr += '<span title=\"Difficulté\" class="calculation_visualisation img_minus"  style=\"margin-left:0px;\">';
    		vrvr += '<span class="skill_box_value" style="text-align:center;">'+aWindow.raboty[count_rab].malus+'</span></span>';
	    	vrvr += '<span title=\"Points de travail\" class="calculation_visualisation img_equal" style="margin-right:10px; margin-left:0px;">';
		    vrvr += '<span class="skill_box_value" style="text-align:center; color:';
    		vrvr += (aWindow.resultaty[count_rab].to > 0) ? 'rgb(0,255,0)' : 'rgb(255,0,0)';
	    	vrvr += '">'+aWindow.resultaty[count_rab].to+'</span></span>';
	    }
        vrvr += '</td><td>';

        brbr = 0;
        vrvr += '<table><tbody><tr>';
        for (jj in aWindow.rabnavyki[count_rab]){
            for (aa = aWindow.rabnavyki[count_rab][jj].mul; aa > 0; --aa){
                if (++brbr==8) {vrvr+='</tr><tr>'; brbr=1};
                vrvr += '<td><a class=\"tt3\" href=\"#\" ><span>'+aWindow.pers.skill_titles[jj]+':'+aWindow.rabnavyki[count_rab][jj].znach+'</span>';
                vrvr += '<div class=\"skill_box\" style=\"padding: 35px 28px 6px 2px; margin-right: -2px; margin-top: -4px; background: transparent url(/images/skill/skills_'+aWindow.pk2_s2a[jj];
                vrvr += '.png) repeat scroll '+aWindow.pk2_s2px[jj]+'px 0px; color: rgb(255, 255, 255); ';
                vrvr += 'width: 25px; height: 14px; -moz-background-clip: border; -moz-background-origin: padding; ';
                vrvr += '-moz-background-inline-policy: continuous; float: left; font-weight: bold; text-align:center;" >';
                vrvr += aWindow.rabnavyki[count_rab][jj].znach+'</div>';
                vrvr += '</a></td>';
            }
        }
        vrvr += '</tr></tbody></table>';
        vrvr += '</td></tr><tr><td colspan=\"2\"><table>';
        
        for (ee = 0; ee < aWindow.pk2_types.length; ++ee){
            ctype = aWindow.pk2_types[ee];
            vrvr += '<tr><td>';
            for (vv = aWindow.prosto_veschi[count_rab][ctype].length-1; vv >= 0;  --vv){
                sid = aWindow.prosto_veschi[count_rab][ctype][vv].tid;
                vrvr+='<div style=\"display:inline; float:left;\">';
                vesch = aWindow.items[sid];
                vrvr+='<a class=\"tt2\" href=\"#\" ><span><b>'+vesch.name+':</b>&nbsp;'+aWindow.prosto_veschi[count_rab][ctype][vv].bon;
                if (vesch.set.key){
                    vrvr += '<br /><em>'+vesch.set.name+'</em>';
                }
                for (ind in vesch.bonus.attributes){
                    vrvr += aWindow.pk2_a_print(ind, vesch.bonus.attributes[ind]);
                }
                for (ind in vesch.bonus.skills){
                    vrvr += aWindow.pk2_s_print(ind, vesch.bonus.skills[ind]);
                }
                vrvr += '</span>'
                vrvr+='<div class=\"bag_item\" ><img src=\"'+vesch.image_mini+'\" />';
                vrvr+='<div class="bag_item_count"><p style="text-align:center;">'+aWindow.prosto_veschi[count_rab][ctype][vv].bon+'</p></div></div>'
                vrvr+='</a>'
                if (aWindow.prosto_veschi[count_rab][ctype][vv].price > 0){
                    vrvr+='<br />';
                    vrvr +='<span style=\"text-align:center;\">'+aWindow.prosto_veschi[count_rab][ctype][vv].price+'&nbsp;$</span>';
                }
                vrvr +='</div>';
            }
            vrvr += '</td></tr>'
        }
        vrvr += '</table></td></tr>';
        
    }
    vrvr += '</table>';
    document.getElementById('pk2_window_content').innerHTML=vrvr;
}

aWindow.pk2_reporter = function () {
//    new aWindow.HumanMessage('Sortie des données ...', {type: 'success'});
    grgr='';
    aWindow.pk2_ocenka_khlama();
    count_rab=0;
    aWindow.pk2_show_window();
    aWindow.pk2_res2html();
    
    if (aWindow.pk2_khochuka.length > 0){
        aWindow.chislo_rabot = 0;
        aWindow.chislo_rabot_to = 0;
        aWindow.khoroshi = [];
        aWindow.khoroshi_to = [];
        for (kh in aWindow.pk2_khochuka){
            aWindow.khoroshi[kh] = 0;
            aWindow.khoroshi_to[kh] = 0;
            aWindow.pk2_khochuka[kh]=false;
        }
        aWindow.pk2_khochuka[kh]=true; // last item;
        for (rr in aWindow.porabotaj){
            if(aWindow.resultaty[rr]){
                ++aWindow.chislo_rabot;
                if (aWindow.resultaty[rr].to > 0) ++aWindow.chislo_rabot_to;
                for (ii = aWindow.pk2_types.length-1; ii >= 0; --ii){
                    for (kh in aWindow.pk2_khochuka){
                        if (aWindow.resultaty[rr].items[ii].tid == kh){
                            aWindow.khoroshi[kh] += 1;
                            if (aWindow.resultaty[rr].to > 0) aWindow.khoroshi_to[kh] += 1;
                        }
                    }
                }
            }
            if(aWindow.resultaty_z[rr]){
                ++aWindow.chislo_rabot;
                ++aWindow.chislo_rabot_to;
                for (ii = aWindow.pk2_types.length-1; ii >= 0; --ii){
                    for (kh in aWindow.pk2_khochuka){
                        if (aWindow.resultaty_z[rr].items[ii].tid == kh){
                            aWindow.khoroshi[kh] += 1;
                            aWindow.khoroshi_to[kh] += 1;
                        }
                    }
                }
            }
            if(aWindow.resultaty_r[rr]){
                ++aWindow.chislo_rabot;
                ++aWindow.chislo_rabot_to;
                for (ii = aWindow.pk2_types.length-1; ii >= 0; --ii){
                    for (kh in aWindow.pk2_khochuka){
                        if (aWindow.resultaty_r[rr].items[ii].tid == kh){
                            aWindow.khoroshi[kh] += 1;
                            aWindow.khoroshi_to[kh] += 1;
                        }
                    }
                }
            }
        }
    }
    aWindow.pk2_process=false;
    aWindow.pk2_sortir('name', aWindow.pk2_bezto);
}


pk2_code += "\
pk2_s2a =\
{build:'strength', punch:'strength', tough:'strength', endurance:'strength', health:'strength',\
ride:'flexibility', reflex:'flexibility', dodge:'flexibility', hide:'flexibility', swim:'flexibility',\
aim:'dexterity', shot:'dexterity', pitfall:'dexterity', finger_dexterity:'dexterity', repair:'dexterity',\
leadership:'charisma', tactic:'charisma', trade:'charisma', animal:'charisma', appearance:'charisma'};\
";

pk2_code += "\
pk2_s2px =\
{build:0, punch:220, tough:165, endurance:110, health:55,\
ride:0, reflex:220, dodge:165, hide:110, swim:55,\
aim:0, shot:220, pitfall:165, finger_dexterity:110, repair:55,\
leadership:0, tactic:220, trade:165, animal:110, appearance:55};\
";

pk2_code += "\
pk2_s2f_bonus2 = function (value){\
    if (isNaN(value)) return 0;\
    if (value < 1) return 0;\
    if (value < 3) return 1;\
    if (value < 10) return 2;\
    if (value < 23) return 3;\
    if (value < 43) return 4;\
    if (value < 71) return 5;\
    if (value < 108) return 6;\
    if (value < 155) return 7;\
    if (value < 211) return 8;\
    return 9;\
};\
";

pk2_code += "\
pk2_s2f_bonus = function (value){\
    if (isNaN(value)) return 0;\
    if (value < 1) return 0;\
    if (value < 3) return 1+(value-1)/2;\
    if (value < 10) return 2+(value-3)/7;\
    if (value < 23) return 3+(value-10)/13;\
    if (value < 43) return 4+(value-23)/20;\
    if (value < 71) return 5+(value-43)/28;\
    if (value < 108) return 6+(value-71)/37;\
    if (value < 155) return 7+(value-108)/47;\
    if (value < 211) return 8+(value-155)/56;\
    return 9;\
};\
";


aWindow.pk2_hideraboty = function(tid){
    aWindow.pk2_hiderab=[];
    vtype = aWindow.items[tid].type;
    kk = 0;
    for (; vtype != aWindow.pk2_types[kk]; ++kk) {};
    for (irab in aWindow.porabotaj){
        nea = true;
        if (aWindow.resultaty[irab]&&(aWindow.resultaty[irab].items[kk].tid==tid)){
            nea = false;
        }
        if (aWindow.resultaty_z[irab]&&(aWindow.resultaty_z[irab].items[kk].tid==tid)){
            nea = false;
        }
        if (aWindow.resultaty_r[irab]&&(aWindow.resultaty_r[irab].items[kk].tid==tid)){
            nea = false;
        }
        if (nea){
            aWindow.pk2_hiderab[irab]=true;
        }
    }
    aWindow.pk2_reporter2();
}


aWindow.pk2_s_print = function(nav, val){
    /*
    kha = aWindow.pk2_s2a[nav];
    result = '<div style=\"background-color:'
    if (kha == 'strength') {result += '#c33; '}
    else if (kha == 'flexibility') {result += '#7e7; '}
    else if (kha == 'dexterity') {result += '#78e; '}
    else if (kha == 'charisma') {result += '#ea3; '}
    else {result += 'white; '}
    result+='\" >'+aWindow.pers.skill_titles[nav]+':'+val+'</div>';
    */
    result='<div>'+aWindow.pers.skill_titles[nav]+':'+val+'</div>';
    return result;
}
aWindow.pk2_a_print = function(kha, val){
/*
    result = '<div style=\"font-weight:bold; background-color:'
    if (kha == 'strength') {result += '#f44; '}
    else if (kha == 'flexibility') {result += '#7e7; '}
    else if (kha == 'dexterity') {result += '#78e; '}
    else if (kha == 'charisma') {result += '#ea3; '}
    else {result += 'white; '}
*/
    result = '<div style=\"font-weight:bold;\" >'+aWindow.pers.attribute_titles[kha]+':'+val+'</div>';
    return result;
}

pk2_code += "\
qsort = function (ar, li, ri){\
	if ((li+1)>=ri) return;\
	var tmp;\
	if (ri-li<10){\
		for (ii=li;ii<ri-1;++ii)\
			for (jj=ii+1;jj<ri;++jj)\
				if(ar[ii].ves>ar[jj].ves){\
					tmp=ar[ii];\
					ar[ii]=ar[jj];\
					ar[jj]=tmp;\
				}\
	}\
	else{\
		mi=parseInt((li+ri)/2,10);\
		if (ar[li].ves>ar[ri-1].ves){\
			tmp=ar[li];\
			ar[li]=ar[ri-1];\
			ar[ri-1]=tmp;\
		}\
		if (ar[li].ves>ar[mi].ves){\
			tmp=ar[li];\
			ar[li]=ar[mi];\
			ar[mi]=tmp;\
		}\
		if (ar[mi].ves>ar[ri-1].ves){\
			tmp=ar[mi];\
			ar[mi]=ar[ri-1];\
			ar[ri-1]=tmp;\
		}\
		em=ar[mi].ves;\
		cl=li;\
		cr=ri-1;\
		while(cl<cr){\
			while((cl<ri)&&(ar[cl].ves<=em)) ++cl;\
			while((cr>li)&&(ar[cr].ves>=em)) --cr;\
			if (cl<cr){\
				tmp=ar[cl];\
				ar[cl]=ar[cr];\
				ar[cr]=tmp;\
			}\
		}\
		if (cr < ri -1)\
		    qsort(ar,li,cr+1);\
		qsort(ar,cl,ri);\
	}\
};\
";


pk2_code += "\
summa_ochkov = function (bonus, nuzhnye_navyki){\
	och=0;\
	for (num_index in nuzhnye_navyki){\
		if(bonus.skills[num_index]){\
			och+=bonus.skills[num_index]*nuzhnye_navyki[num_index];\
		}\
		if(bonus.attributes[pk2_s2a[num_index]]){\
			och+=bonus.attributes[pk2_s2a[num_index]]*nuzhnye_navyki[num_index];\
		}\
	}\
	return och;\
};\
";

pk2_code += "\
summa_ochkov2 = function (skills, nuzhnye_navyki){\
	och=0;\
	for (num_index in nuzhnye_navyki){\
		if(skills[num_index]){\
			och+=skills[num_index]*nuzhnye_navyki[num_index];\
		}\
	}\
	return och;\
};\
";

pk2_code += "\
summa_ochkov3 = function (bonus, ind_navyk){\
	och=0;\
	if(bonus.skills[ind_navyk]){\
		och+=bonus.skills[ind_navyk];\
	}\
	if(bonus.attributes[pk2_s2a[ind_navyk]]){\
		och+=bonus.attributes[pk2_s2a[ind_navyk]];\
	}\
	return och;\
};\
";


pk2_code += "\
pk2_vybvesch = function () {\
	for (irabota in porabotaj) {\
		if (porabotaj[irabota]==false)\
		    continue;\
		porabotaj[irabota]=false;\
		rabota=raboty[irabota];\
		if (!rabota)\
			{continue; }\
		if ((irabota>132)&&(irabota<150))\
		    continue;\
		prosto_veschi[irabota]={};\
		for (ii = pk2_types.length - 1; ii >= 0; --ii) {\
			prosto_veschi[irabota][pk2_types[ii]]=[];\
		}\
		for (i = pk2_aktiv.length-1; i >= 0; --i) {\
			rekurs_time-=50;\
			cid = pk2_aktiv[i];\
			vesch = items[cid];\
			ctype = vesch.type;\
			ochki = summa_ochkov(vesch.bonus, rabota.navyki);\
			tsena = (pk2_uchet[cid] || (vesch.shop != 'shop')) ? 0 : vesch.price;\
    		if (ochki > 0){\
				mv = -1;\
    			for (kk = 0; kk < prosto_veschi[irabota][ctype].length; ++kk) {\
    			    if ((prosto_veschi[irabota][ctype][kk].bon < ochki)||((prosto_veschi[irabota][ctype][kk].bon === ochki)&&(prosto_veschi[irabota][ctype][kk].price > tsena))){\
    			        mv = kk;\
    			    }\
    			    else{\
    			        break;\
    			    }\
    			}\
    			if (prosto_veschi[irabota][ctype].length < prosto_veschi_max){\
    			    for (kk = prosto_veschi[irabota][ctype].length-1; kk > mv; --kk){\
    			        prosto_veschi[irabota][ctype][kk+1]={bon:prosto_veschi[irabota][ctype][kk].bon, price:prosto_veschi[irabota][ctype][kk].price, tid:prosto_veschi[irabota][ctype][kk].tid}\
    			    }\
    			    prosto_veschi[irabota][ctype][mv+1]={bon:ochki, price:tsena, tid:cid};\
    			}\
    			else{\
    			    for (kk = 0; kk < mv; ++kk){\
    			        prosto_veschi[irabota][ctype][kk]={bon:prosto_veschi[irabota][ctype][kk+1].bon, price:prosto_veschi[irabota][ctype][kk+1].price, tid:prosto_veschi[irabota][ctype][kk+1].tid}\
    			    }\
    			    prosto_veschi[irabota][ctype][mv]={bon:ochki, price:tsena, tid:cid};\
    			}\
			}\
		}\
		resultaty[irabota] = {};\
		resultaty[irabota].to = summa_ochkov2(pers.skills, rabota.navyki)-raboty[irabota].malus;\
		resultaty[irabota].ton = 0;\
		raboty[irabota].resultaty.to = resultaty[irabota].to;\
        rabnavyki[irabota]={};\
        for (num_index in raboty[irabota].navyki){\
            temp_n = {};\
            temp_n[num_index]=1;\
            val=summa_ochkov2(pers.skills,temp_n);\
            rabnavyki[irabota][num_index]={};\
            rabnavyki[irabota][num_index].name=pers.skill_titles[num_index];\
            rabnavyki[irabota][num_index].znach = val;\
            rabnavyki[irabota][num_index].mul = raboty[irabota].navyki[num_index] ? raboty[irabota].navyki[num_index] : 0;\
        }\
    }\
	for (irabota in porabotaj) {\
		if (porabotaj[irabota] == false) \
			porabotaj[irabota] = true;\
	}\
	pk2_vreporter();\
};\
";




pk2_code += "\
pk2_vybzap_f = function () {\
	for (irabota in porabotaj) {\
		if ((irabota <= 132)||(irabota > 140))\
		    continue;\
		if (porabotaj[irabota]==false)\
		    continue;\
		porabotaj[irabota]=false;\
		rabota=raboty[irabota];\
		if (!rabota)\
			{continue; }\
		for (ii = pk2_types.length - 1; ii >= 0; --ii) {\
			for (jj = nabory.length - 1; jj >= 0; --jj) {\
				vyborka[pk2_types[ii]][nabory[jj]]=null;\
			}\
			for (jj=vyborka[pk2_types[ii]].simple.n-1;jj>=0;--jj)\
				vyborka[pk2_types[ii]].simple.spisok[jj]=null;\
			vyborka[pk2_types[ii]].simple.n = 1;\
			vyborka[pk2_types[ii]].simple.spisok[0] = {price:0, tid:0, navyki:{}, health:0};\
			for (oo in rabota.navyki){\
			    vyborka[pk2_types[ii]].simple.spisok[0].navyki[oo] = 0;\
			}\
		}\
		for (i = pk2_aktiv.length-1; i >= 0; --i) {\
			rekurs_time-=50;\
			cid = pk2_aktiv[i];\
			vesch = items[cid];\
			ctype = vesch.type;\
			ochki = 0;\
			cnavyki = {};\
			for (oo in rabota.navyki){\
			    cnavyki[oo] = summa_ochkov3(vesch.bonus, oo);\
			    ochki += cnavyki[oo];\
			}\
			chealth = summa_ochkov3(vesch.bonus, 'health');\
			ochki += chealth;\
			tsena = (pk2_uchet[cid]|| pk2_khochuka[cid] || (vesch.shop != 'shop')) ? 0 : vesch.price;\
			if (vesch.set.key) {\
				vyborka[ctype][vesch.set.key]={navyki:{}, price:tsena, tid:cid, health:chealth};\
    			for (oo in rabota.navyki){\
	    		    vyborka[ctype][vesch.set.key].navyki[oo] = cnavyki[oo];\
			    }\
			}\
    		if (ochki > 0){\
				hm = []; iz=true;\
    			for (kk = vyborka[ctype].simple.n-1; kk >= 0; --kk) {\
	    			im = 0;\
		    		ib = 0;\
			    	for (oo in rabota.navyki){\
    			    	if (vyborka[ctype].simple.spisok[kk].navyki[oo] < cnavyki[oo]) {ib++}\
	    			    else {if (vyborka[ctype].simple.spisok[kk].navyki[oo] > cnavyki[oo]) {im++}};\
			    	}\
			    	if (vyborka[ctype].simple.spisok[kk].health < chealth) {ib++}\
    			    else {if (vyborka[ctype].simple.spisok[kk].health > chealth) {im++}};\
    			    \
				    if (!pk2_millioner){\
				        if (vyborka[ctype].simple.spisok[kk].price > tsena) {ib++}\
				        else {if (vyborka[ctype].simple.spisok[kk].price < tsena) {im++}}\
				    }\
				    if (ib==0) {iz=false}\
				    else if (im==0){hm.push(kk)}\
			    }\
			    if (iz) {\
				    nn = vyborka[ctype].simple.n;\
					vyborka[ctype].simple.spisok[nn] = {};\
    				vyborka[ctype].simple.spisok[nn].health = chealth;\
	    			vyborka[ctype].simple.spisok[nn].price = tsena;\
		    		vyborka[ctype].simple.spisok[nn].tid = cid;\
		    		vyborka[ctype].simple.spisok[nn].navyki={};\
		    		for (oo in rabota.navyki){\
		    		    vyborka[ctype].simple.spisok[nn].navyki[oo] = cnavyki[oo];\
		    		}\
					vyborka[ctype].simple.n += 1;\
    				while (hm.length > 0){\
    				    zh = hm.pop();\
    				    vyborka[ctype].simple.spisok[zh].tid = -1;\
    				}\
			        for (ll = vyborka[ctype].simple.n-1;ll>=0; ){\
			            if (vyborka[ctype].simple.spisok[ll].tid== -1){\
    		    			for (kk = ll; kk < vyborka[ctype].simple.n - 1; ++kk) {\
	        	    			vyborka[ctype].simple.spisok[kk].health = vyborka[ctype].simple.spisok[kk+1].health;\
			            		vyborka[ctype].simple.spisok[kk].price = vyborka[ctype].simple.spisok[kk+1].price;\
				            	vyborka[ctype].simple.spisok[kk].tid = vyborka[ctype].simple.spisok[kk+1].tid;\
				            	vyborka[ctype].simple.spisok[kk].navyki={};\
            		    		for (oo in rabota.navyki){\
		                		    vyborka[ctype].simple.spisok[kk].navyki[oo] = vyborka[ctype].simple.spisok[kk+1].navyki[oo];\
		                		}\
	        			    }\
			        		kk = vyborka[ctype].simple.n - 1;\
        					vyborka[ctype].simple.spisok[kk].health = null;\
                			vyborka[ctype].simple.spisok[kk].price = null;\
	    		    	    vyborka[ctype].simple.spisok[kk].tid = null;\
           		    		for (oo in rabota.navyki){\
	                		    vyborka[ctype].simple.spisok[kk].navyki[oo] = null;\
	                		}\
	    		    	    vyborka[ctype].simple.spisok[kk].navyki = null;\
	        		    	vyborka[ctype].simple.spisok[kk] = null;\
			        	    vyborka[ctype].simple.n -= 1;\
			            }\
			            else{\
			                --ll;\
			            }\
			        }\
			    }\
		    }\
		}\
		for (ii = pk2_types.length - 1; ii >= 0; --ii) {\
			for (jj = nabory.length - 1; jj >= 0; --jj) {\
				if (vyborka[pk2_types[ii]][nabory[jj]]){\
					dvazhdy = -1;\
					sid = vyborka[pk2_types[ii]][nabory[jj]].tid;\
					for (kk = vyborka[pk2_types[ii]].simple.n - 1; kk >= 0; --kk)\
						if (vyborka[pk2_types[ii]].simple.spisok[kk].tid == sid)\
							dvazhdy = kk;\
					if (dvazhdy < 0) {\
						nn = vyborka[pk2_types[ii]].simple.n;\
						vyborka[pk2_types[ii]].simple.spisok[nn] = {};\
						vyborka[pk2_types[ii]].simple.spisok[nn].health = vyborka[pk2_types[ii]][nabory[jj]].health;\
						vyborka[pk2_types[ii]].simple.spisok[nn].price = vyborka[pk2_types[ii]][nabory[jj]].price;\
						vyborka[pk2_types[ii]].simple.spisok[nn].tid = vyborka[pk2_types[ii]][nabory[jj]].tid;\
						vyborka[pk2_types[ii]].simple.spisok[nn].nabor = nabory[jj];\
						vyborka[pk2_types[ii]].simple.spisok[nn].navyki = {};\
       		    		for (oo in rabota.navyki){\
                		    vyborka[pk2_types[ii]].simple.spisok[nn].navyki[oo] = vyborka[pk2_types[ii]][nabory[jj]].navyki[oo];\
                 		}\
						vyborka[pk2_types[ii]].simple.n += 1;\
					}\
					else {\
						vyborka[pk2_types[ii]].simple.spisok[dvazhdy].nabor = nabory[jj];\
					}\
				}\
			}\
		}\
        for (ii=pk2_types.length-1; ii>=0; --ii){\
            i_slot[ii]=0;\
            i_slot_max[ii] = vyborka[pk2_types[ii]].simple.n;\
        }\
		samoe_ono = {};\
		deneg_ushlo = 0;\
		for (ii = 0; ii < nabory.length; ++ii)\
			pk2_predmetov[nabory[ii]] = 0;\
		pk2_tonavyki = {};\
		for (oo in rabota.navyki){\
			pk2_tonavyki[oo] = pers.skills[oo];\
		}\
		pk2_tohealth = pers.skills.health;\
		samoe_ono.to = 0;\
		samoe_ono.price=-1;\
		samoe_ono.health = 0;\
		for (ii = nabory.length-1; ii >= 0; --ii) {\
			for (jj = 8; jj > 0; --jj) {\
				t_nab = komplekty[nabory[ii]][jj];\
				komp_fort[nabory[ii]][jj] = {};\
				komp_fort[nabory[ii]][jj].navyki={};\
				for (oo in rabota.navyki){\
				    komp_fort[nabory[ii]][jj].navyki[oo] = summa_ochkov3(t_nab.bonus, oo);\
				}\
				komp_fort[nabory[ii]][jj].health = summa_ochkov3(t_nab.bonus, 'health');\
			}\
		}\
		rekurs_time-=500;\
		ii_rekur=0;\
		window.setTimeout(pk2_rekurs_f, rekurs_delay/5);\
		return;\
    }\
	for (irabota in porabotaj) {\
		if (porabotaj[irabota] == false)\
			porabotaj[irabota] = true;\
	}\
    pk2_reporter();\
};\
";



pk2_code += "\
pk2_rekurs_f = function (){\
    if (rekurs_time>15000) rekurs_time=10000;\
    nn = pk2_types.length;\
    rabota=raboty[irabota];\
    for (ii = ii_rekur; ii >= 0; )\
    {\
        if (--rekurs_time <= 0){\
            ii_rekur = ii;\
            rekurs_time = 20000;\
            ++rekurs_step;\
           	new HumanMessage('Élément(s) en cours d\\'analyse(s): '+rekurs_step, {type: 'success'});\
            window.setTimeout(pk2_rekurs_f, rekurs_delay);\
            return 1;\
        }\
        if (i_slot[ii] >= i_slot_max[ii]){\
            if (--ii >= 0){\
                deneg_ushlo -= ic_obj[ii].price;\
           		for (oo in rabota.navyki){\
    	            pk2_tonavyki[oo] -= ic_obj[ii].navyki[oo];\
		        }\
                pk2_tohealth -= ic_obj[ii].health;\
    	    	if (ic_obj[ii].nabor) {\
	    	    	pk2_predmetov[ic_obj[ii].nabor] -= 1;\
	    	    }\
	    	    i_slot[ii]+=1;\
            }\
    	    continue;\
        }\
        deb_v = vyborka[pk2_types[ii]].simple.spisok;\
        ic_obj[ii] = deb_v[i_slot[ii]];\
        deneg_ushlo += ic_obj[ii].price;\
        if (deneg_ushlo <= bablo)\
        {\
			if (ic_obj[ii].nabor) {\
    			pk2_predmetov[ic_obj[ii].nabor] += 1;\
	    	}\
 		    pk2_tohealth += ic_obj[ii].health;\
       		for (oo in rabota.navyki){\
	            pk2_tonavyki[oo] += ic_obj[ii].navyki[oo];\
	        }\
		    if (++ii == nn){\
    			ton = {};\
    			ton.navyki={};\
    			ton.health=0;\
    			for (oo in rabota.navyki){\
    			    ton.navyki[oo]=0;\
    			}\
	    		for (inabor = nabory.length - 1; inabor >= 0; --inabor) \
		    		if (pk2_predmetov[nabory[inabor]] > 0) {\
			    		ton.health += komp_fort[nabory[inabor]][pk2_predmetov[nabory[inabor]]].health;\
			    		for (oo in rabota.navyki){\
			    		    ton.navyki[oo] += komp_fort[nabory[inabor]][pk2_predmetov[nabory[inabor]]].navyki[oo];\
			    		}\
				    }\
    			\
    			pk2_tohealth += ton.health;\
    			for (oo in rabota.navyki){\
    			    pk2_tonavyki[oo] += ton.navyki[oo]\
    			}\
    			cto = 0;\
    			for (oo in rabota.navyki){\
    			    cto += pk2_s2f_bonus(pk2_tonavyki[oo])*rabota.navyki[oo];\
    			}\
			if (pk2_tohealth >= pk2_zdorov)\
	    		if ((samoe_ono.to < cto)||((samoe_ono.to == cto)&&(samoe_ono.health<pk2_tohealth))) {\
		    		samoe_ono.to = cto;\
				    samoe_ono.price=deneg_ushlo;\
				    samoe_ono.health = pk2_tohealth;\
				    for (jj = nn - 1; jj >= 0; --jj) {\
					    samoe_ono[pk2_types[jj]] = i_slot[jj];\
				    }\
    			}\
			\
    			pk2_tohealth -= ton.health;\
    			for (oo in rabota.navyki){\
    			    pk2_tonavyki[oo] -= ton.navyki[oo]\
    			}\
			    --ii;\
                deneg_ushlo -= ic_obj[ii].price;\
           		for (oo in rabota.navyki){\
    	            pk2_tonavyki[oo] -= ic_obj[ii].navyki[oo];\
		        }\
                pk2_tohealth -= ic_obj[ii].health;\
    	    	if (ic_obj[ii].nabor) {\
	    	    	pk2_predmetov[ic_obj[ii].nabor] -= 1;\
	    	    }\
	    	    i_slot[ii]+=1;\
                continue;\
		    }\
		    else{\
		        i_slot[ii]=0;\
		        continue;\
		    }\
        }\
        else{\
            deneg_ushlo -= ic_obj[ii].price;\
            i_slot[ii]+=1;\
            continue;\
        }\
    }\
\
		resultaty[irabota] = {};\
		samoe_ono.to=Math.round(samoe_ono.to*10)/10;\
		resultaty[irabota].to = samoe_ono.to;\
		resultaty[irabota].ton = 0;\
		resultaty[irabota].price = samoe_ono.price;\
		raboty[irabota].resultaty.to = samoe_ono.to;\
		resultaty[irabota].items = [];\
		for (i = 0; i < pk2_types.length; ++i) {\
		if (samoe_ono.price >= 0) {\
			vvv = vyborka[pk2_types[i]].simple.spisok[samoe_ono[pk2_types[i]]];\
		}else{vvv = 0};\
			resultaty[irabota].items[i] = {};\
			resultaty[irabota].items[i].tid = vvv.tid;\
			resultaty[irabota].items[i].bon = 0;\
			resultaty[irabota].items[i].price = vvv.price;\
		}\
            rabnavyki[irabota]={};\
		resultaty[irabota].to=0;\
		resultaty[irabota].ton=0;\
            for (num_index in raboty[irabota].navyki){\
                temp_n = {};\
                temp_n[num_index]=1;\
                val=summa_ochkov2(pers.skills,temp_n);\
                temp_u = {};\
                for (ee = pk2_types.length-1;ee>=0;--ee){\
                    sid = resultaty[irabota].items[ee].tid;\
                    if (sid > 0){\
                        val+=summa_ochkov(items[sid].bonus,temp_n);\
                        temp_k = items[sid].set.key;\
                        if (temp_k){\
                            if (temp_u[temp_k])\
                                temp_u[temp_k]+=1;\
                            else\
                                temp_u[temp_k]=1;\
                        }\
                    }\
                } \
                for (uu = nabory.length - 1; uu>=0; --uu){\
                    if (temp_u[nabory[uu]]>1){\
                        bn = komplekty[nabory[uu]][temp_u[nabory[uu]]].bonus;\
                        val+=summa_ochkov(bn,temp_n);\
                    }\
                }\
                rabnavyki[irabota][num_index]={};\
                rabnavyki[irabota][num_index].name=pers.skill_titles[num_index];\
                rabnavyki[irabota][num_index].znach = val;\
                rabnavyki[irabota][num_index].mul = raboty[irabota].navyki[num_index];\
		vvv = pk2_s2f_bonus(val);\
		if (num_index!='aim') {resultaty[irabota].ton+=vvv};\
		if (num_index!='dodge') {resultaty[irabota].to+=vvv};\
            }\
		resultaty[irabota].ton = Math.round(resultaty[irabota].ton*10)/10;\
		resultaty[irabota].to = Math.round(resultaty[irabota].to*10+resultaty[irabota].ton*10)/10;\
            temp_n = {};\
            temp_n.health=1;\
            val=summa_ochkov2(pers.skills,temp_n);\
            temp_u = {};\
            for (ee = pk2_types.length-1;ee>=0;--ee){\
                sid = resultaty[irabota].items[ee].tid;\
                if (sid > 0){\
                    val+=summa_ochkov(items[sid].bonus,temp_n);\
                    temp_k = items[sid].set.key;\
                    if (temp_k){\
                        if (temp_u[temp_k])\
                            temp_u[temp_k]+=1;\
                        else\
                            temp_u[temp_k]=1;\
                    }\
                }\
            } \
            for (uu = nabory.length - 1; uu>=0; --uu){\
                if (temp_u[nabory[uu]]>1){\
                    bn = komplekty[nabory[uu]][temp_u[nabory[uu]]].bonus;\
                    val+=summa_ochkov(bn,temp_n);\
                }\
            }\
            rabnavyki[irabota].health={};\
            rabnavyki[irabota].health.name=pers.skill_titles.health;\
            rabnavyki[irabota].health.znach = val;\
            rabnavyki[irabota].health.mul = 1;\
    pk2_vybzap_f();\
};\
";


pk2_code += "\
pk2_vybzap = function () {\
	for (irabota in porabotaj) {\
		if (porabotaj[irabota]==false)\
		    continue;\
		porabotaj[irabota]=false;\
		rabota=raboty[irabota];\
		if (!rabota)\
			{continue; }\
		if ((irabota>132)&&(irabota<150))\
		    continue;\
		for (ii = pk2_types.length - 1; ii >= 0; --ii) {\
			for (jj = nabory.length - 1; jj >= 0; --jj) {\
				vyborka[pk2_types[ii]][nabory[jj]]=null;\
			}\
			for (jj=vyborka[pk2_types[ii]].simple.n-1;jj>=0;--jj)\
				vyborka[pk2_types[ii]].simple.spisok[jj]=null;\
			vyborka[pk2_types[ii]].simple.n = 1;\
			vyborka[pk2_types[ii]].simple.spisok[0] = {bon:0, price:0, tid:0};\
		}\
		\
		for (i = pk2_aktiv.length-1; i >= 0; --i) {\
			rekurs_time-=50;\
			cid = pk2_aktiv[i];\
			vesch = items[cid];\
			ctype = vesch.type;\
			ochki = summa_ochkov(vesch.bonus, rabota.navyki);\
			tsena = (pk2_uchet[cid] || pk2_khochuka[cid] || (vesch.shop != 'shop')) ? 0 : vesch.price;\
			if (vesch.set.key) {\
				vyborka[ctype][vesch.set.key]={bon:ochki, price:tsena, tid:cid};\
			}\
    		if (ochki > 0){\
				hm = []; iz=true;\
    			for (kk = vyborka[ctype].simple.n-1; kk >= 0; --kk) {\
	    			im = 0;\
		    		ib = 0;\
			    	if (vyborka[ctype].simple.spisok[kk].bon < ochki) {ib++}\
				    else {if (vyborka[ctype].simple.spisok[kk].bon > ochki) {im++}}\
				    if (!pk2_millioner){\
				        if (vyborka[ctype].simple.spisok[kk].price > tsena) {ib++}\
				        else {if (vyborka[ctype].simple.spisok[kk].price < tsena) {im++}}\
				    }\
				    if ((im==0)&&(ib==0)){\
						v2=items[vyborka[ctype].simple.spisok[kk].tid];\
						def2=summa_ochkov(v2.bonus, all_def.navyki);\
						def1=summa_ochkov(vesch.bonus, all_def.navyki);\
						if (def1>def2) ++ib;\
				    }\
				    if (ib==0) {iz=false}\
				    else if (im==0){hm.push(kk)}\
			    }\
			    if (iz) {\
				    nn = vyborka[ctype].simple.n;\
					vyborka[ctype].simple.spisok[nn] = {};\
    				vyborka[ctype].simple.spisok[nn].bon = ochki;\
	    			vyborka[ctype].simple.spisok[nn].price = tsena;\
		    		vyborka[ctype].simple.spisok[nn].tid = cid;\
					vyborka[ctype].simple.n += 1;\
    				while (hm.length > 0){\
    				    zh = hm.pop();\
    				    vyborka[ctype].simple.spisok[zh].tid = -1;\
    				}\
			        for (ll = vyborka[ctype].simple.n-1;ll>=0; ){\
			            if (vyborka[ctype].simple.spisok[ll].tid== -1){\
    		    			for (kk = ll; kk < vyborka[ctype].simple.n - 1; ++kk) {\
	        	    			vyborka[ctype].simple.spisok[kk].bon = vyborka[ctype].simple.spisok[kk+1].bon;\
			            		vyborka[ctype].simple.spisok[kk].price = vyborka[ctype].simple.spisok[kk+1].price;\
				            	vyborka[ctype].simple.spisok[kk].tid = vyborka[ctype].simple.spisok[kk+1].tid;\
	        			    }\
			        		kk = vyborka[ctype].simple.n - 1;\
        					vyborka[ctype].simple.spisok[kk].bon = null;\
                			vyborka[ctype].simple.spisok[kk].price = null;\
	    		    	    vyborka[ctype].simple.spisok[kk].tid = null;\
	        		    	vyborka[ctype].simple.spisok[kk] = null;\
			        	    vyborka[ctype].simple.n -= 1;\
			            }\
			            else{\
			                --ll;\
			            }\
			        }\
			    }\
		    }\
		}\
		for (ii = pk2_types.length - 1; ii >= 0; --ii) {\
			for (jj = nabory.length - 1; jj >= 0; --jj) {\
				if (vyborka[pk2_types[ii]][nabory[jj]]) {\
					dvazhdy = -1;\
					sid = vyborka[pk2_types[ii]][nabory[jj]].tid;\
					for (kk = vyborka[pk2_types[ii]].simple.n - 1; kk >= 0; --kk)\
						if (vyborka[pk2_types[ii]].simple.spisok[kk].tid == sid)\
							dvazhdy = kk;\
					if (dvazhdy < 0) {\
						nn = vyborka[pk2_types[ii]].simple.n;\
						vyborka[pk2_types[ii]].simple.spisok[nn] = {};\
						vyborka[pk2_types[ii]].simple.spisok[nn].bon = vyborka[pk2_types[ii]][nabory[jj]].bon;\
						vyborka[pk2_types[ii]].simple.spisok[nn].price = vyborka[pk2_types[ii]][nabory[jj]].price;\
						vyborka[pk2_types[ii]].simple.spisok[nn].tid = vyborka[pk2_types[ii]][nabory[jj]].tid;\
						vyborka[pk2_types[ii]].simple.spisok[nn].nabor = nabory[jj];\
						vyborka[pk2_types[ii]].simple.n += 1;\
					}\
					else {\
						vyborka[pk2_types[ii]].simple.spisok[dvazhdy].nabor = nabory[jj];\
					}\
				}\
			}\
		}\
		samoe_ono = {};\
		deneg_ushlo = 0;\
		for (ii = 0; ii < nabory.length; ++ii) \
			pk2_predmetov[nabory[ii]] = 0;\
		psk = summa_ochkov2(pers.skills, rabota.navyki);\
		if (isNaN(psk)) psk=0;\
		pk2_to= psk - rabota.malus;\
		samoe_ono.to= pk2_to;\
		samoe_ono.ton=0;\
		samoe_ono.price=-1;\
		for (ii = nabory.length-1; ii >= 0; --ii) {\
			for (jj = 8; jj > 0; --jj) {\
				t_nab = komplekty[nabory[ii]][jj];\
				ton = summa_ochkov(t_nab.bonus, rabota.navyki);\
				if (t_nab.raboty[irabota]) \
					ton += t_nab.raboty[irabota];\
				komp_rab[nabory[ii]][jj] = ton;\
			}\
		}\
        for (ii=pk2_types.length-1; ii>=0; --ii){\
            i_slot[ii]=0;\
            i_slot_max[ii] = vyborka[pk2_types[ii]].simple.n;\
        }\
        rekurs_time-=500;\
        ii_rekur=0;\
		window.setTimeout(pk2_rekurs, rekurs_delay/5);\
		return;\
    }\
	for (irabota in porabotaj) {\
		if (porabotaj[irabota] == false) \
			porabotaj[irabota] = true;\
	}\
    pk2_vybzap_z();\
};\
";


pk2_code += "\
pk2_vybzap_z = function () {\
	for (irabota in porabotaj) {\
	    if (!zaschita)  continue;\
		if (porabotaj[irabota]==false)\
		    continue;\
		porabotaj[irabota]=false;\
		rabota=raboty[irabota];\
		if (!rabota)\
			{continue;}\
		if ((irabota>132)&&(irabota<150))\
		    continue;\
		if (!resultaty[irabota]){\
		    resultaty_z[irabota]=null;\
		    continue;\
		}\
		for (ii = pk2_types.length - 1; ii >= 0; --ii) {\
			for (jj = nabory.length - 1; jj >= 0; --jj) {\
				vyborka_z[pk2_types[ii]][nabory[jj]]=null;\
			}\
			for (jj=vyborka_z[pk2_types[ii]].simple.n-1;jj>=0;--jj)\
				vyborka_z[pk2_types[ii]].simple.spisok[jj]=null;\
			vyborka_z[pk2_types[ii]].simple.n = 1;\
			vyborka_z[pk2_types[ii]].simple.spisok[0] = {bon:0, zas:0, price:0, tid:0};\
		}\
		if (resultaty[irabota].to >= zaschita.to){\
		for (i = pk2_aktiv.length-1; i >= 0; --i) {\
			rekurs_time-=50;\
			cid = pk2_aktiv[i];\
			vesch = items[cid];\
			ctype = vesch.type;\
			ochki = summa_ochkov(vesch.bonus, rabota.navyki);\
			zas = summa_ochkov(vesch.bonus, zaschita.navyki);\
			tsena = (pk2_uchet[cid] || pk2_khochuka[cid] || (vesch.shop != 'shop')) ? 0 : vesch.price;\
			if (vesch.set.key) {\
				vyborka_z[ctype][vesch.set.key]={bon:ochki, zas:zas, price:tsena, tid:cid};\
			}\
    		if ((ochki > 0)||(zas > 0)){\
				hm = []; iz=true;\
    			for (kk = vyborka_z[ctype].simple.n-1; kk >= 0; --kk) {\
	    			im = 0;\
		    		ib = 0;\
			    	if (vyborka_z[ctype].simple.spisok[kk].bon < ochki) {ib++}\
				    else {if (vyborka_z[ctype].simple.spisok[kk].bon > ochki) {im++}}\
			    	if (vyborka_z[ctype].simple.spisok[kk].zas < zas) {ib++}\
				    else {if (vyborka_z[ctype].simple.spisok[kk].zas > zas) {im++}}\
				    if (!pk2_millioner){\
				        if (vyborka_z[ctype].simple.spisok[kk].price > tsena) {ib++}\
				        else {if (vyborka_z[ctype].simple.spisok[kk].price < tsena) {im++}}\
				    }\
				    if (ib==0) {iz=false}\
				    else if (im==0){hm.push(kk)}\
			    }\
			    if (iz) {\
				    nn = vyborka_z[ctype].simple.n;\
					vyborka_z[ctype].simple.spisok[nn] = {};\
    				vyborka_z[ctype].simple.spisok[nn].bon = ochki;\
	    			vyborka_z[ctype].simple.spisok[nn].price = tsena;\
		    		vyborka_z[ctype].simple.spisok[nn].tid = cid;\
		    		vyborka_z[ctype].simple.spisok[nn].zas = zas;\
					vyborka_z[ctype].simple.n += 1;\
    				while (hm.length > 0){\
    				    zh = hm.pop();\
    				    vyborka_z[ctype].simple.spisok[zh].tid = -1;\
    				}\
			        for (ll = vyborka_z[ctype].simple.n-1;ll>=0; ){\
			            if (vyborka_z[ctype].simple.spisok[ll].tid== -1){\
    		    			for (kk = ll; kk < vyborka_z[ctype].simple.n - 1; ++kk) {\
	        	    			vyborka_z[ctype].simple.spisok[kk].bon = vyborka_z[ctype].simple.spisok[kk+1].bon;\
			            		vyborka_z[ctype].simple.spisok[kk].price = vyborka_z[ctype].simple.spisok[kk+1].price;\
				            	vyborka_z[ctype].simple.spisok[kk].tid = vyborka_z[ctype].simple.spisok[kk+1].tid;\
				            	vyborka_z[ctype].simple.spisok[kk].zas = vyborka_z[ctype].simple.spisok[kk+1].zas;\
	        			    }\
			        		kk = vyborka_z[ctype].simple.n - 1;\
        					vyborka_z[ctype].simple.spisok[kk].bon = null;\
                			vyborka_z[ctype].simple.spisok[kk].price = null;\
	    		    	    vyborka_z[ctype].simple.spisok[kk].tid = null;\
	    		    	    vyborka_z[ctype].simple.spisok[kk].zas = null;\
	        		    	vyborka_z[ctype].simple.spisok[kk] = null;\
			        	    vyborka_z[ctype].simple.n -= 1;\
			            }\
			            else{\
			                --ll;\
			            }\
			        }\
			    }\
		    }\
		}}\
		for (ii = pk2_types.length - 1; ii >= 0; --ii) {\
			for (jj = nabory.length - 1; jj >= 0; --jj) {\
				if (vyborka_z[pk2_types[ii]][nabory[jj]]) {\
					dvazhdy = -1;\
					sid = vyborka_z[pk2_types[ii]][nabory[jj]].tid;\
					for (kk = vyborka_z[pk2_types[ii]].simple.n - 1; kk >= 0; --kk)\
						if (vyborka_z[pk2_types[ii]].simple.spisok[kk].tid == sid)\
							dvazhdy = kk;\
					if (dvazhdy < 0) {\
						nn = vyborka_z[pk2_types[ii]].simple.n;\
						vyborka_z[pk2_types[ii]].simple.spisok[nn] = {};\
						vyborka_z[pk2_types[ii]].simple.spisok[nn].bon = vyborka_z[pk2_types[ii]][nabory[jj]].bon;\
						vyborka_z[pk2_types[ii]].simple.spisok[nn].price = vyborka_z[pk2_types[ii]][nabory[jj]].price;\
						vyborka_z[pk2_types[ii]].simple.spisok[nn].tid = vyborka_z[pk2_types[ii]][nabory[jj]].tid;\
						vyborka_z[pk2_types[ii]].simple.spisok[nn].zas = vyborka_z[pk2_types[ii]][nabory[jj]].zas;\
						vyborka_z[pk2_types[ii]].simple.spisok[nn].nabor = nabory[jj];\
						vyborka_z[pk2_types[ii]].simple.n += 1;\
					}\
					else {\
						vyborka_z[pk2_types[ii]].simple.spisok[dvazhdy].nabor = nabory[jj];\
					}\
				}\
			}\
		}\
		samoe_ono = {};\
		deneg_ushlo = 0;\
		for (ii = 0; ii < nabory.length; ++ii) \
			pk2_predmetov[nabory[ii]] = 0;\
		pk2_to= summa_ochkov2(pers.skills, rabota.navyki) - rabota.malus - zaschita.to;\
		pk2_zas=0;\
		samoe_ono.to= pk2_to;\
		samoe_ono.price=-1;\
		samoe_ono.zas=pk2_zas;\
		for (ii = nabory.length-1; ii >= 0; --ii) {\
			for (jj = 8; jj > 0; --jj) {\
				t_nab = komplekty[nabory[ii]][jj];\
				ton = summa_ochkov(t_nab.bonus, rabota.navyki);\
				if (t_nab.raboty[irabota]) \
					ton += t_nab.raboty[irabota];\
				komp_rab[nabory[ii]][jj] = ton;\
				zan = summa_ochkov(t_nab.bonus, zaschita.navyki);\
				komp_zas[nabory[ii]][jj] = zan;\
			}\
		}\
        for (ii=pk2_types.length-1; ii>=0; --ii){\
            i_slot[ii]=0;\
            i_slot_max[ii] = vyborka_z[pk2_types[ii]].simple.n;\
        }\
        rekurs_time-=500;\
        ii_rekur=0;\
		window.setTimeout(pk2_rekurs_z, rekurs_delay/5);\
		return;\
    }\
	for (irabota in porabotaj) {\
		if (porabotaj[irabota] == false) \
			porabotaj[irabota] = true;\
	}\
    pk2_vybzap_r();\
};\
";

pk2_code += "\
pk2_vybzap_r = function () {\
	for (irabota in porabotaj) {\
		if (porabotaj[irabota]==false)\
		    continue;\
		porabotaj[irabota]=false;\
		if (((irabota>132)||(!ezda))&&(irabota!=141))\
		    continue;\
		rabota=raboty[irabota];\
		if (!rabota)\
			{continue;}\
		if ((irabota!=141)&&(!resultaty[irabota])){\
		    resultaty_r[irabota]=null;\
		    continue;\
		}\
		for (ii = pk2_types.length - 1; ii >= 0; --ii) {\
			for (jj = nabory.length - 1; jj >= 0; --jj) {\
				vyborka_r[pk2_types[ii]][nabory[jj]]=null;\
			}\
			for (jj=vyborka_r[pk2_types[ii]].simple.n-1;jj>=0;--jj)\
				vyborka_r[pk2_types[ii]].simple.spisok[jj]=null;\
			vyborka_r[pk2_types[ii]].simple.n = 1;\
			vyborka_r[pk2_types[ii]].simple.spisok[0] = {bon:0, ride:0, speed:1.0, price:0, tid:0};\
		}\
		if ((irabota==141)||(resultaty[irabota].to > 0)){\
		for (i = pk2_aktiv.length-1; i >= 0; --i) {\
			rekurs_time-=50;\
			cid = pk2_aktiv[i];\
			vesch = items[cid];\
			ctype = vesch.type;\
			ochki = summa_ochkov(vesch.bonus, rabota.navyki);\
			ride = summa_ochkov3(vesch.bonus, 'ride');\
			speed = (vesch.speed)?vesch.speed:1.0;\
			tsena = (pk2_uchet[cid] || pk2_khochuka[cid] || (vesch.shop != 'shop')) ? 0 : vesch.price;\
			if (vesch.set.key) {\
				vyborka_r[ctype][vesch.set.key]={bon:ochki, ride:ride, speed:speed, price:tsena, tid:cid};\
			}\
    		if ((ochki > 0)||(ride > 0)||(speed<1.0)){\
				hm = []; iz=true;\
    			for (kk = vyborka_r[ctype].simple.n-1; kk >= 0; --kk) {\
	    			im = 0;\
		    		ib = 0;\
			    	if (vyborka_r[ctype].simple.spisok[kk].bon < ochki) {ib++}\
				    else {if (vyborka_r[ctype].simple.spisok[kk].bon > ochki) {im++}}\
			    	if (vyborka_r[ctype].simple.spisok[kk].ride < ride) {ib++}\
				    else {if (vyborka_r[ctype].simple.spisok[kk].ride > ride) {im++}}\
			        if (vyborka_r[ctype].simple.spisok[kk].speed > speed) {ib++}\
			        else {if (vyborka_r[ctype].simple.spisok[kk].speed < speed) {im++}}\
				    if (!pk2_millioner){\
				        if (vyborka_r[ctype].simple.spisok[kk].price > tsena) {ib++}\
				        else {if (vyborka_r[ctype].simple.spisok[kk].price < tsena) {im++}}\
				    }\
				    if (ib==0) {iz=false}\
				    else if (im==0){hm.push(kk)}\
			    }\
			    if (iz) {\
				    nn = vyborka_r[ctype].simple.n;\
					vyborka_r[ctype].simple.spisok[nn] = {};\
    				vyborka_r[ctype].simple.spisok[nn].bon = ochki;\
	    			vyborka_r[ctype].simple.spisok[nn].price = tsena;\
		    		vyborka_r[ctype].simple.spisok[nn].tid = cid;\
		    		vyborka_r[ctype].simple.spisok[nn].ride = ride;\
		    		vyborka_r[ctype].simple.spisok[nn].speed = speed;\
					vyborka_r[ctype].simple.n += 1;\
    				while (hm.length > 0){\
    				    zh = hm.pop();\
    				    vyborka_r[ctype].simple.spisok[zh].tid = -1;\
    				}\
			        for (ll = vyborka_r[ctype].simple.n-1;ll>=0; ){\
			            if (vyborka_r[ctype].simple.spisok[ll].tid== -1){\
    		    			for (kk = ll; kk < vyborka_r[ctype].simple.n - 1; ++kk) {\
	        	    			vyborka_r[ctype].simple.spisok[kk].bon = vyborka_r[ctype].simple.spisok[kk+1].bon;\
			            		vyborka_r[ctype].simple.spisok[kk].price = vyborka_r[ctype].simple.spisok[kk+1].price;\
				            	vyborka_r[ctype].simple.spisok[kk].tid = vyborka_r[ctype].simple.spisok[kk+1].tid;\
				            	vyborka_r[ctype].simple.spisok[kk].ride = vyborka_r[ctype].simple.spisok[kk+1].ride;\
				            	vyborka_r[ctype].simple.spisok[kk].speed = vyborka_r[ctype].simple.spisok[kk+1].speed;\
	        			    }\
			        		kk = vyborka_r[ctype].simple.n - 1;\
        					vyborka_r[ctype].simple.spisok[kk].bon = null;\
                			vyborka_r[ctype].simple.spisok[kk].price = null;\
	    		    	    vyborka_r[ctype].simple.spisok[kk].tid = null;\
	    		    	    vyborka_r[ctype].simple.spisok[kk].ride = null;\
	    		    	    vyborka_r[ctype].simple.spisok[kk].speed = null;\
	        		    	vyborka_r[ctype].simple.spisok[kk] = null;\
			        	    vyborka_r[ctype].simple.n -= 1;\
			            }\
			            else{\
			                --ll;\
			            }\
			        }\
			    }\
		    }\
		}}\
		for (ii = pk2_types.length - 1; ii >= 0; --ii) {\
			for (jj = nabory.length - 1; jj >= 0; --jj) {\
				if (vyborka_r[pk2_types[ii]][nabory[jj]]) {\
					dvazhdy = -1;\
					sid = vyborka_r[pk2_types[ii]][nabory[jj]].tid;\
					for (kk = vyborka_r[pk2_types[ii]].simple.n - 1; kk >= 0; --kk)\
						if (vyborka_r[pk2_types[ii]].simple.spisok[kk].tid == sid)\
							dvazhdy = kk;\
					if (dvazhdy < 0) {\
						nn = vyborka_r[pk2_types[ii]].simple.n;\
						vyborka_r[pk2_types[ii]].simple.spisok[nn] = {};\
						vyborka_r[pk2_types[ii]].simple.spisok[nn].bon = vyborka_r[pk2_types[ii]][nabory[jj]].bon;\
						vyborka_r[pk2_types[ii]].simple.spisok[nn].price = vyborka_r[pk2_types[ii]][nabory[jj]].price;\
						vyborka_r[pk2_types[ii]].simple.spisok[nn].tid = vyborka_r[pk2_types[ii]][nabory[jj]].tid;\
						vyborka_r[pk2_types[ii]].simple.spisok[nn].ride = vyborka_r[pk2_types[ii]][nabory[jj]].ride;\
						vyborka_r[pk2_types[ii]].simple.spisok[nn].speed = vyborka_r[pk2_types[ii]][nabory[jj]].speed;\
						vyborka_r[pk2_types[ii]].simple.spisok[nn].nabor = nabory[jj];\
						vyborka_r[pk2_types[ii]].simple.n += 1;\
					}\
					else {\
						vyborka_r[pk2_types[ii]].simple.spisok[dvazhdy].nabor = nabory[jj];\
					}\
				}\
			}\
		}\
		samoe_ono = {};\
		deneg_ushlo = 0;\
		for (ii = 0; ii < nabory.length; ++ii) \
			pk2_predmetov[nabory[ii]] = 0;\
		pk2_to= summa_ochkov2(pers.skills, rabota.navyki) - rabota.malus;\
		pk2_ride=0;\
		pk2_speed=1.0;\
		samoe_ono.to= pk2_to;\
		samoe_ono.price=-1;\
		samoe_ono.ride=pk2_ride;\
		samoe_ono.speed=100.0;\
		for (ii = nabory.length-1; ii >= 0; --ii) {\
			for (jj = 8; jj > 0; --jj) {\
				t_nab = komplekty[nabory[ii]][jj];\
				ton = summa_ochkov(t_nab.bonus, rabota.navyki);\
				if (t_nab.raboty[irabota]) \
					ton += t_nab.raboty[irabota];\
				komp_rab[nabory[ii]][jj] = ton;\
				komp_skor[nabory[ii]][jj] = {};\
				komp_skor[nabory[ii]][jj].ride = summa_ochkov3(t_nab.bonus, 'ride');\
				komp_skor[nabory[ii]][jj].speed = t_nab.speed?t_nab.speed:1.0;\
				\
			}\
		}\
        for (ii=pk2_types.length-1; ii>=0; --ii){\
            i_slot[ii]=0;\
            i_slot_max[ii] = vyborka_r[pk2_types[ii]].simple.n;\
        }\
        rekurs_time-=500;\
        ii_rekur=0;\
		window.setTimeout(pk2_rekurs_r, rekurs_delay/5);\
		return;\
    }\
	for (irabota in porabotaj) {\
		if (porabotaj[irabota] == false) \
			porabotaj[irabota] = true;\
	}\
    pk2_vybzap_f();\
};\
";



pk2_code += "\
pk2_rekurs = function (){\
    nn = pk2_types.length;\
    for (ii = ii_rekur; ii >= 0; )\
    {\
        if (--rekurs_time <= 0){\
            ii_rekur = ii;\
            rekurs_time = 50000;\
            ++rekurs_step;\
           	new HumanMessage('Élément(s) en cours d\\'analyse(s): '+rekurs_step, {type: 'success'});\
            window.setTimeout(pk2_rekurs, rekurs_delay);\
            return 1;\
        }\
        if (i_slot[ii] >= i_slot_max[ii]){\
            if (--ii >= 0){\
                deneg_ushlo -= ic_obj[ii].price;\
                pk2_to -= ic_obj[ii].bon;\
    	    	if (ic_obj[ii].nabor) {\
	    	    	pk2_predmetov[ic_obj[ii].nabor] -= 1;\
	    	    }\
	    	    i_slot[ii]+=1;\
            }\
    	    continue;\
        }\
        deb_v = vyborka[pk2_types[ii]].simple.spisok;\
        ic_obj[ii] = deb_v[i_slot[ii]];\
        deneg_ushlo += ic_obj[ii].price;\
        if (deneg_ushlo <= bablo)\
        {\
			if (ic_obj[ii].nabor) {\
    			pk2_predmetov[ic_obj[ii].nabor] += 1;\
	    	}\
		    pk2_to += ic_obj[ii].bon;\
		    if (++ii == nn){\
    			ton = 0;\
	    		for (inabor = nabory.length - 1; inabor >= 0; --inabor) \
		    		if (pk2_predmetov[nabory[inabor]] > 0) {\
			    		ton += komp_rab[nabory[inabor]][pk2_predmetov[nabory[inabor]]]\
				    }\
    			pk2_to += ton;\
	    		if (samoe_ono.to < pk2_to) {\
		    		samoe_ono.to = pk2_to;\
			    	samoe_ono.ton = ton;\
				    samoe_ono.price=deneg_ushlo;\
				    for (jj = nn - 1; jj >= 0; --jj) {\
					    samoe_ono[pk2_types[jj]] = i_slot[jj];\
				    }\
    			}\
			    pk2_to -= ton;\
			    --ii;\
                deneg_ushlo -= ic_obj[ii].price;\
                pk2_to -= ic_obj[ii].bon;\
    	    	if (ic_obj[ii].nabor) {\
	    	    	pk2_predmetov[ic_obj[ii].nabor] -= 1;\
	    	    }\
	    	    i_slot[ii]+=1;\
                continue;\
		    }\
		    else{\
		        i_slot[ii]=0;\
		        continue;\
		    }\
        }\
        else{\
            deneg_ushlo -= ic_obj[ii].price;\
            i_slot[ii]+=1;\
            continue;\
        }\
    }\
\
		resultaty[irabota] = {};\
		resultaty[irabota].to = samoe_ono.to;\
		resultaty[irabota].ton = samoe_ono.ton;\
		resultaty[irabota].price = samoe_ono.price;\
		raboty[irabota].resultaty.to = samoe_ono.to;\
		resultaty[irabota].items = [];\
	if (samoe_ono.price >= 0) {\
		for (i = 0; i < pk2_types.length; ++i) {\
			vvv = vyborka[pk2_types[i]].simple.spisok[samoe_ono[pk2_types[i]]];\
			resultaty[irabota].items[i] = {};\
			resultaty[irabota].items[i].tid = vvv.tid;\
			resultaty[irabota].items[i].bon = vvv.bon;\
			resultaty[irabota].items[i].price = vvv.price;\
		}\
	}\
	else{\
		for (i = 0; i < pk2_types.length; ++i) {\
			resultaty[irabota].items[i] = {};\
			resultaty[irabota].items[i].tid = 0;\
			resultaty[irabota].items[i].bon = 0;\
			resultaty[irabota].items[i].price = 0;\
		}\
	}\
            rabnavyki[irabota]={};\
            for (num_index in raboty[irabota].navyki){\
                temp_n = {};\
                temp_n[num_index]=1;\
                val=summa_ochkov2(pers.skills,temp_n);\
                temp_u = {};\
                for (ee = pk2_types.length-1;ee>=0;--ee){\
                    sid = resultaty[irabota].items[ee].tid;\
                    if (sid > 0){\
                        val+=summa_ochkov(items[sid].bonus,temp_n);\
                        temp_k = items[sid].set.key;\
                        if (temp_k){\
                            if (temp_u[temp_k])\
                                temp_u[temp_k]+=1;\
                            else\
                                temp_u[temp_k]=1;\
                        }\
                    }\
                } \
                for (uu = nabory.length - 1; uu>=0; --uu){\
                    if (temp_u[nabory[uu]]>1){\
                        bn = komplekty[nabory[uu]][temp_u[nabory[uu]]].bonus;\
                        val+=summa_ochkov(bn,temp_n);\
                    }\
                }\
                rabnavyki[irabota][num_index]={};\
                rabnavyki[irabota][num_index].name=pers.skill_titles[num_index];\
                rabnavyki[irabota][num_index].znach = val;\
                rabnavyki[irabota][num_index].mul = raboty[irabota].navyki[num_index];\
            }\
    pk2_vybzap();\
};\
";


pk2_code += "\
pk2_rekurs_z = function (){\
    nn = pk2_types.length;\
    for (ii = ii_rekur; ii >= 0; )\
    {\
        if (--rekurs_time <= 0){\
            ii_rekur = ii;\
            rekurs_time = 50000;\
            ++rekurs_step;\
           	new HumanMessage('Élément(s) en cours d\\'analyse(s): '+rekurs_step, {type: 'success'});\
            window.setTimeout(pk2_rekurs_z, rekurs_delay);\
            return 1;\
        }\
        if (i_slot[ii] >= i_slot_max[ii]){\
            if (--ii >= 0){\
                deneg_ushlo -= ic_objr[ii].price;\
                pk2_to -= ic_objr[ii].bon;\
                pk2_zas -= ic_objr[ii].zas;\
    	    	if (ic_objr[ii].nabor) {\
	    	    	pk2_predmetov[ic_objr[ii].nabor] -= 1;\
	    	    }\
	    	    i_slot[ii]+=1;\
            }\
    	    continue;\
        }\
        deb_v = vyborka_z[pk2_types[ii]].simple.spisok;\
        ic_objr[ii] = deb_v[i_slot[ii]];\
        deneg_ushlo += ic_objr[ii].price;\
        if (deneg_ushlo <= bablo)\
        {\
			if (ic_objr[ii].nabor) {\
    			pk2_predmetov[ic_objr[ii].nabor] += 1;\
	    	}\
		    pk2_to += ic_objr[ii].bon;\
		    pk2_zas += ic_objr[ii].zas;\
		    if (++ii == nn){\
    			ton = 0;\
    			zan = 0;\
	    		for (inabor = nabory.length - 1; inabor >= 0; --inabor) \
		    		if (pk2_predmetov[nabory[inabor]] > 0) {\
			    		ton += komp_rab[nabory[inabor]][pk2_predmetov[nabory[inabor]]];\
			    		zan += komp_zas[nabory[inabor]][pk2_predmetov[nabory[inabor]]];\
				    }\
    			pk2_to += ton;\
    			pk2_zas += zan;\
	    		if ((samoe_ono.zas < pk2_zas)&&(pk2_to >= 0)) {\
		    		samoe_ono.to = pk2_to;\
			    	samoe_ono.ton = ton;\
                    samoe_ono.zas = pk2_zas;\
                    samoe_ono.zan = zan;\
				    samoe_ono.price=deneg_ushlo;\
				    for (jj = nn - 1; jj >= 0; --jj) {\
					    samoe_ono[pk2_types[jj]] = i_slot[jj];\
				    }\
    			}\
			    pk2_to -= ton;\
			    pk2_zas -= zan;\
			    --ii;\
                deneg_ushlo -= ic_objr[ii].price;\
                pk2_to -= ic_objr[ii].bon;\
                pk2_zas -= ic_objr[ii].zas;\
    	    	if (ic_objr[ii].nabor) {\
	    	    	pk2_predmetov[ic_objr[ii].nabor] -= 1;\
	    	    }\
	    	    i_slot[ii]+=1;\
                continue;\
		    }\
		    else{\
		        i_slot[ii]=0;\
		        continue;\
		    }\
        }\
        else{\
            deneg_ushlo -= ic_objr[ii].price;\
            i_slot[ii]+=1;\
            continue;\
        }\
    }\
\
	if (samoe_ono.price >= 0) {\
		resultaty_z[irabota] = {};\
		resultaty_z[irabota].to = samoe_ono.to+zaschita.to;\
		resultaty_z[irabota].ton = samoe_ono.ton;\
		resultaty_z[irabota].price = samoe_ono.price;\
		resultaty_z[irabota].zas = samoe_ono.zas;\
		resultaty_z[irabota].zan = samoe_ono.zan;\
		resultaty_z[irabota].items = [];\
		for (i = 0; i < pk2_types.length; ++i) {\
			vvv = vyborka_z[pk2_types[i]].simple.spisok[samoe_ono[pk2_types[i]]];\
			resultaty_z[irabota].items[i] = {};\
			resultaty_z[irabota].items[i].tid = vvv.tid;\
			resultaty_z[irabota].items[i].bon = vvv.bon;\
			resultaty_z[irabota].items[i].price = vvv.price;\
			resultaty_z[irabota].items[i].zas = vvv.zas;\
		}\
            rabnavyki_z[irabota]={};\
            for (num_index in zaschita.navyki){\
                temp_n = {};\
                temp_n[num_index]=1;\
                val=summa_ochkov2(pers.skills,temp_n);\
                temp_u = {};\
                for (ee = pk2_types.length-1;ee>=0;--ee){\
                    sid = resultaty_z[irabota].items[ee].tid;\
                    if (sid > 0){\
                        val+=summa_ochkov(items[sid].bonus,temp_n);\
                        temp_k = items[sid].set.key;\
                        if (temp_k){\
                            if (temp_u[temp_k])\
                                temp_u[temp_k]+=1;\
                            else\
                                temp_u[temp_k]=1;\
                        }\
                    }\
                } \
                for (uu = nabory.length - 1; uu>=0; --uu){\
                    if (temp_u[nabory[uu]]>1){\
                        bn = komplekty[nabory[uu]][temp_u[nabory[uu]]].bonus;\
                        val+=summa_ochkov(bn,temp_n);\
                    }\
                }\
                rabnavyki_z[irabota][num_index]={};\
                rabnavyki_z[irabota][num_index].name=pers.skill_titles[num_index];\
                rabnavyki_z[irabota][num_index].znach = val;\
                rabnavyki_z[irabota][num_index].mul = zaschita.navyki[num_index];\
            }\
	}\
	else{\
		resultaty_z[irabota] = null;\
	}\
    pk2_vybzap_z();\
};\
";

pk2_code += "\
pk2_rekurs_r = function (){\
    nn = pk2_types.length;\
    rr = 8;\
    for (ii = ii_rekur; ii >= 0; )\
    {\
        if (--rekurs_time <= 0){\
            ii_rekur = ii;\
            rekurs_time = 50000;\
            ++rekurs_step;\
           	new HumanMessage('Élément(s) en cours d\\'analyse(s): '+rekurs_step, {type: 'success'});\
            window.setTimeout(pk2_rekurs_r, rekurs_delay);\
            return 1;\
        }\
        if (i_slot[ii] >= i_slot_max[ii]){\
            if (--ii >= 0){\
                deneg_ushlo -= ic_objr[ii].price;\
                pk2_to -= ic_objr[ii].bon;\
                pk2_ride -= ic_objr[ii].ride;\
    	    	if (ic_objr[ii].nabor) {\
	    	    	pk2_predmetov[ic_objr[ii].nabor] -= 1;\
	    	    }\
	    	    i_slot[ii]+=1;\
            }\
    	    continue;\
        }\
        deb_v = vyborka_r[pk2_types[ii]].simple.spisok;\
        ic_objr[ii] = deb_v[i_slot[ii]];\
        deneg_ushlo += ic_objr[ii].price;\
        if (deneg_ushlo <= bablo)\
        {\
			if (ic_objr[ii].nabor) {\
    			pk2_predmetov[ic_objr[ii].nabor] += 1;\
	    	}\
		    pk2_to += ic_objr[ii].bon;\
		    pk2_ride += ic_objr[ii].ride;\
		    if (++ii == nn){\
    			ton = 0;\
    			rin = 0;\
    			speen = 1.0;\
	    		for (inabor = nabory.length - 1; inabor >= 0; --inabor) \
		    		if (pk2_predmetov[nabory[inabor]] > 0) {\
			    		ton += komp_rab[nabory[inabor]][pk2_predmetov[nabory[inabor]]];\
			    		rin += komp_skor[nabory[inabor]][pk2_predmetov[nabory[inabor]]].ride;\
			    		speen *= komp_skor[nabory[inabor]][pk2_predmetov[nabory[inabor]]].speed;\
				    }\
    			pk2_to += ton;\
    			pk2_ride += rin;\
    			pk2_speed = 100;\
    			if (ic_objr[rr].speed < 1.0){\
    			    pk2_speed = 100.0 / ic_objr[rr].speed + pk2_ride;\
    			}\
    			pk2_speed /= speen;\
    			pk2_speed /= pers.default_speed;\
	    		if ((samoe_ono.speed < pk2_speed)&&(pk2_to > 0)) {\
		    		samoe_ono.to = pk2_to;\
			    	samoe_ono.ton = speen;\
                    samoe_ono.ride = pk2_ride;\
                    samoe_ono.speed = pk2_speed;\
				    samoe_ono.price=deneg_ushlo;\
				    for (jj = nn - 1; jj >= 0; --jj) {\
					    samoe_ono[pk2_types[jj]] = i_slot[jj];\
				    }\
    			}\
			    pk2_to -= ton;\
			    pk2_ride -= rin;\
			    --ii;\
                deneg_ushlo -= ic_objr[ii].price;\
                pk2_to -= ic_objr[ii].bon;\
                pk2_ride -= ic_objr[ii].ride;\
    	    	if (ic_objr[ii].nabor) {\
	    	    	pk2_predmetov[ic_objr[ii].nabor] -= 1;\
	    	    }\
	    	    i_slot[ii]+=1;\
                continue;\
		    }\
		    else{\
		        i_slot[ii]=0;\
		        continue;\
		    }\
        }\
        else{\
            deneg_ushlo -= ic_objr[ii].price;\
            i_slot[ii]+=1;\
            continue;\
        }\
    }\
\
	if (samoe_ono.price >= 0) {\
        if (irabota==141){\
    		resultaty[irabota] = {};\
	    	resultaty[irabota].to = Math.round(samoe_ono.speed);\
		    resultaty[irabota].ton = (1.0/samoe_ono.ton).toFixed(2);\
		    resultaty[irabota].price = samoe_ono.price;\
		    resultaty[irabota].items = [];\
    		for (i = 0; i < pk2_types.length; ++i) {\
	    		vvv = vyborka_r[pk2_types[i]].simple.spisok[samoe_ono[pk2_types[i]]];\
		    	resultaty[irabota].items[i] = {};\
			    resultaty[irabota].items[i].tid = vvv.tid;\
    			resultaty[irabota].items[i].bon = vvv.ride;\
	    		resultaty[irabota].items[i].price = vvv.price;\
		    }\
            rabnavyki[irabota]={};\
            rabnavyki[irabota].ride={};\
            rabnavyki[irabota].ride.name=pers.skill_titles.ride;\
            rabnavyki[irabota].ride.znach = samoe_ono.ride;\
            rabnavyki[irabota].ride.mul = 1.0;\
            resultaty_r[irabota] = null;\
            rabnavyki_r[irabota] = null;\
        }\
        else{\
		    resultaty_r[irabota] = {};\
		    resultaty_r[irabota].to = samoe_ono.to;\
		    resultaty_r[irabota].ton = samoe_ono.ton;\
		    resultaty_r[irabota].price = samoe_ono.price;\
		    resultaty_r[irabota].ride = samoe_ono.ride;\
		    resultaty_r[irabota].speed = samoe_ono.speed;\
		    resultaty_r[irabota].items = [];\
		    for (i = 0; i < pk2_types.length; ++i) {\
			    vvv = vyborka_r[pk2_types[i]].simple.spisok[samoe_ono[pk2_types[i]]];\
			    resultaty_r[irabota].items[i] = {};\
			    resultaty_r[irabota].items[i].tid = vvv.tid;\
			    resultaty_r[irabota].items[i].bon = vvv.bon;\
			    resultaty_r[irabota].items[i].price = vvv.price;\
			    resultaty_r[irabota].items[i].ride = vvv.ride;\
			    resultaty_r[irabota].items[i].speed = vvv.speed;\
		    }\
            rabnavyki_r[irabota]={};\
            rabnavyki_r[irabota].ride={};\
            rabnavyki_r[irabota].ride.name=pers.skill_titles.ride;\
            rabnavyki_r[irabota].ride.znach = samoe_ono.ride;\
            rabnavyki_r[irabota].ride.mul = 1.0;\
		}\
	}\
	else{\
		resultaty_r[irabota] = null;\
	}\
    pk2_vybzap_r();\
};\
";
	
pk2_code +="\
pk2_auto_odev = function(va, rab){\
	pk2_odev_type=0;\
	pk2_odev_var=va;\
	pk2_odev_count=0;\
	pk2_odev_rab=rab;\
	pk2_odev_stat=true;\
	zz = document.getElementById('current_task_box_text');\
	zz.innerHTML='En cours d\\'habillement...';\
	pk2_odev_window();\
};\
\
pk2_odev_add = function(va, irab){\
	if (va==='n')\
		{rrab = resultaty[irab];index=raboty[irab].rus_name;\
		alert(''+index+' à été ajouté à la liste des tenues!');}\
	else if (va==='z')\
		{rrab = resultaty_z[irab];index=raboty[irab].rus_name+'_(obrona)';\
		alert(''+index+'_(obrona) à été ajouté à la liste des tenues!');}\
	else if (va==='r')\
		{rrab = resultaty_r[irab];index=raboty[irab].rus_name+'_(ruch)';\
		alert(''+index+'_(ruch) à été ajouté à la liste des tenues!');}\
	if (!rrab||!rrab.items) return false;\
	for (ee = 0; ee < pk2_types.length; ++ee){\
		if (rrab.items[ee]&&rrab.items[ee].tid){\
			if (!pk2_odev_list[index]) pk2_odev_list[index]={};\
			pk2_odev_list[index][pk2_types[ee]] = rrab.items[ee].tid;\
		}\
	}\
	pk2_odev_save_list();\
	pk2_odev_spam_option();\
};\
\
pk2_odev_remove = function(va, irab){\
	if (va==='n')\
		{index=raboty[irab].rus_name;}\
	else if (va==='z')\
		{index=raboty[irab].rus_name+'_(obrona)'}\
	else if (va==='r')\
		{index=raboty[irab].rus_name+'_(ruch)'}\
	if (pk2_odev_list[index]){\
		delete pk2_odev_list[index];\
		alert(''+index+' à été supprimer de la liste!')\
	}\
	pk2_odev_save_list();\
	pk2_odev_spam_option();\
};\
\
pk2_odev_save_list = function(){\
	tempo = 'pk2_odev_list={';\
	for (ii in pk2_odev_list){\
		tempo+='\"'+ii+'\":';\
		tids = pk2_odev_list[ii];\
		tmp = '{';\
		for (ee = 0; ee < pk2_types.length; ++ee){\
			if (tids[pk2_types[ee]]){\
				tmp+=pk2_types[ee]+':'+tids[pk2_types[ee]]+', ';\
			}\
		}\
		tmp += '}';\
		tmp = tmp.replace(', }','}');\
		tempo+=tmp+', ';\
	};\
	tempo+='}';\
	tempo = tempo.replace(', }','}');\
	pk2_setValue(pk2_pre+'odev_list',tempo);\
};\
\
pk2_odev_spam_option = function(){\
	equip_select = document.getElementById('pk2_spam_select');\
	if (!equip_select) return;\
	equip_select.innerHTML='<option value=\"0\">Liste des tenues!</option>';\
	arra={};\
	jj=0;\
	for (ii in pk2_odev_list) {arra[jj++]={ves:ii};}\
	qsort(arra,0,jj);\
	for (i=0;i<jj;++i){\
		ii=arra[i].ves;\
		t_op = document.createElement('option');\
		t_op.textContent = ii;\
		t_op.setAttribute('value',ii);\
		equip_select.appendChild(t_op);\
	}\
};\
\
pk2_odev_spam_go = function(){\
	equip_select = document.getElementById('pk2_spam_select');\
	name = equip_select.options[equip_select.selectedIndex].value;\
	irab=777;\
	resultaty[irab]={};\
	resultaty[irab].items={};\
	for (ee=0;ee<pk2_types.length;++ee){\
		resultaty[irab].items[ee] = {};\
		if (pk2_odev_list[name][pk2_types[ee]]){\
			resultaty[irab].items[ee].tid = pk2_odev_list[name][pk2_types[ee]];\
		}\
	}\
	pk2_auto_odev('n',irab);\
};\
\
pk2_odev_spam_rewrite = function(){\
	equip_select = document.getElementById('pk2_spam_select');\
	name = equip_select.options[equip_select.selectedIndex].value;\
	spam_value = document.getElementById('pk2_spam_new');\
	name2 = spam_value.value;\
	if (pk2_odev_list[name]){\
		pk2_odev_list[name2]=pk2_odev_list[name];\
		delete pk2_odev_list[name];\
		pk2_odev_save_list();\
		pk2_odev_spam_option();\
	}\
};\
\
pk2_odev_spam_del = function(){\
	equip_select = document.getElementById('pk2_spam_select');\
	name = equip_select.options[equip_select.selectedIndex].value;\
	if (pk2_odev_list[name]){\
		delete pk2_odev_list[name];\
		alert(''+name+' à été supprimer de la liste!');\
		pk2_odev_save_list();\
		pk2_odev_spam_option();\
	}\
};\
\
pk2_odev_spam_save = function(){\
	spam_value = document.getElementById('pk2_spam_new');\
	name = spam_value.value;\
	if (pk2_odev_list[name]){\
		gu_gu = confirm('La tenue '+name+' à été enregistré.');\
		if (!gu_gu) return;\
	}\
	if (!Wear||!Wear.wear) return;\
	pk2_odev_list[name]={};\
	for (ee=0;ee<pk2_types.length;++ee){\
		if (Wear.wear[pk2_types[ee]]){\
			pk2_odev_list[name][pk2_types[ee]] = Wear.wear[pk2_types[ee]].obj.item_id;\
		}\
	}\
	pk2_odev_save_list();\
	pk2_odev_spam_option();\
};\
\
pk2_odev_spam = function(){\
	if (!pk2_odevalo4ka) return;\
	wear_div = document.getElementById('window_inventory_content');\
	if (!wear_div) {setTimeout(pk2_odev_spam,2000);return}\
 ww=wear_div.getElementById('char_head');\
 if (!ww) {setTimeout(pk2_odev_spam,2000);return}\
 if (document.getElementById('pk2_wear_spam')) {setTimeout(pk2_odev_spam,5000);return};\
        qwe=document.getElementById('window_inventory_title');\
	qwe.innerHTML=qwe.innerHTML.replace('Consigne','');\
 var wear_spam = document.createElement('div');\
 wear_spam.setAttribute('id', 'pk2_wear_spam');\
 wear_spam.setAttribute('style', 'position: absolute; top: 3px; left: 7px; padding: 3px; margin: 0px;font-size:75%;');\
 var wear_spam2 = document.createElement('div');\
 wear_spam2.setAttribute('id', 'pk2_wear_spam2');\
 wear_spam2.setAttribute('style', 'position: absolute; top: 3px; left: 150px; padding: 3px; margin: 0px;font-size:75%;');\
 wear_div.parentNode.insertBefore(wear_spam,wear_div);\
 wear_div.parentNode.insertBefore(wear_spam2,wear_div);\
wear_spam.appendChild(store_set_link);\
wear_spam.appendChild(store_set_value);\
wear_spam2.appendChild(store_rewrite_link);\
wear_spam2.appendChild(delete_link);\
wear_spam2.appendChild(equip_select);\
wear_spam2.appendChild(equip_link);\
	setTimeout(pk2_odev_spam,5000);\
};\
\
\
pk2_odev_window = function(){\
	if (!AjaxWindow.windows['inventory']){\
		if (pk2_odev_count++===0){\
			AjaxWindow.show('inventory');\
			setTimeout(pk2_odev_window, pk2_odev_time);\
			return;\
		}\
		else{\
			if(pk2_odev_count<pk2_odev_rep*5){\
				setTimeout(pk2_odev_window, pk2_odev_time);\
				return;\
			}\
		}\
	}\
	else{\
		if (!AjaxWindow.windows['inventory'].isReady){\
			if(pk2_odev_count++<pk2_odev_rep*5){\
				setTimeout(pk2_odev_window, pk2_odev_time);\
				return;\
			}\
		}\
	}\
	pk2_odev_count=0;\
	pk2_odevalka();\
};\
\
pk2_odev_zapusk = function(){\
	pk2_odev_type++;pk2_odev_count=0;\
	pk2_odevalka();\
\
};\
\
pk2_odev_control = function(typ, id){\
	zz = Wear.wear[pk2_types[pk2_odev_type]];\
	if (zz&&(zz.obj.item_id!=pk2_odev_item)){\
		if(pk2_odev_count++ <= pk2_odev_rep){\
			setTimeout(pk2_odev_control,pk2_odev_time);\
			return;\
		}\
		else{\
			pk2_odev_stat=false;\
		}\
	}\
	pk2_odev_zapusk();\
};\
\
pk2_odevalka = function(){\
	ee = pk2_odev_type;\
	irab=pk2_odev_rab;\
	if (ee >= pk2_types.length){\
		if (pk2_odev_stat) {document.getElementById('current_task_box_text').innerHTML='Vous êtes habillé!'}\
		else {document.getElementById('current_task_box_text').innerHTML='Damned!<br> Encore une fois, à moitié nue :D'}\
		return;\
	}\
	if (pk2_odev_var==='n')\
		sid = resultaty[irab].items[ee].tid;\
	else if (pk2_odev_var==='z')\
		sid = resultaty_z[irab].items[ee].tid;\
	else if (pk2_odev_var==='r')\
		sid = resultaty_r[irab].items[ee].tid;\
	if (sid){\
		if (Wear.wear[pk2_types[ee]]&&(Wear.wear[pk2_types[ee]].obj.item_id===sid)){\
			pk2_odev_zapusk();\
			return;\
		}\
		var inv = Bag.getInstance().items;\
		for (vv in inv){\
			if (inv[vv].obj.item_id===sid){\
				Bag.getInstance().carry(vv);\
				pk2_odev_item=sid;\
				pk2_odev_control();\
				return;\
			}\
		}\
		pk2_odev_zapusk();return;\
	}\
	else{\
		pk2_odev_zapusk();\
		return;\
	}\
\
};\
";


aWindow.pk2_setValue = function(key,value) {
//	window.setTimeout(GM_setValue, 1, key, value);
	window.setTimeout(function() {GM_setValue(key,value)}, 0);
};
aWindow.pk2_getValue = function(key) {
	window.setTimeout(function() {	aWindow.pk2_abyrvalg = GM_getValue(key);}, 1 );
};


pk2_code +="\
pk2_worker = function(schet){\
	for (vv in Bag.getInstance().items){\
		pk2_worker2(schet);\
		return;\
	}\
	if (!pk2_count_inv) AjaxWindow.show('inventory');\
	if (++pk2_count_inv < 15){\
		if (schet) {setTimeout(pk2_worker4,1000)}else{setTimeout(pk2_worker3,1000)}} \
	else {pk2_count_inv=0;pk2_worker2(schet)}\
}\
;";

pk2_code +="\
pk2_worker3 = function(){\
	for (vv in Bag.getInstance().items){\
		pk2_worker2(false);\
		return;\
	}\
	if (!pk2_count_inv) AjaxWindow.show('inventory');\
	if (++pk2_count_inv < 15){\
		setTimeout(pk2_worker3,1000)} \
	else {pk2_count_inv=0;pk2_worker2(false)}\
}\
;";

pk2_code +="\
pk2_worker4 = function(){\
	for (vv in Bag.getInstance().items){\
		pk2_worker2(true);\
		return;\
	}\
	if (!pk2_count_inv) AjaxWindow.show('inventory');\
	if (++pk2_count_inv < 15){\
		setTimeout(pk2_worker4,1000)} \
	else {pk2_count_inv=0;pk2_worker2(true)}\
}\
;";

aWindow.pk2_worker2 = function(schet){
    aWindow.pk2_process=true;
    aWindow.resultaty=[];
    aWindow.resultaty_z=[];
    aWindow.resultaty_r=[];
    aWindow.zaschita=null;
    aWindow.ezda = false;
    aWindow.rabnavyki=[];
    aWindow.rabnavyki_z=[];
    aWindow.pk2_khochuka = [];
	aWindow.pers = aWindow.Character;

	vse_vse = document.getElementById('pk2_skol_rabot_v').checked;
	vse_rab = document.getElementById('pk2_skol_rabot_r').checked;
	nesk_rab = document.getElementById('pk2_skol_rabot_n').checked;
	skil_rab = document.getElementById('pk2_skol_rabot_s').checked;
	item_rab = document.getElementById('pk2_skol_rabot_i').checked;
	aWindow.pk2_vse_raboty = vse_vse||vse_rab;
	vyb_rab = document.getElementById('pk2_rabota');
	aWindow.porabotaj=null;
	aWindow.porabotaj=[];
	if (vse_vse){
		for (r in aWindow.raboty){
			if ((r>0)&&(r<=141))
				aWindow.porabotaj[r]=true;
		}
	}
	else if (vse_rab){
		for (r in aWindow.raboty){
			if ((r>0)&&(r<126))
				aWindow.porabotaj[r]=true;
		}
	     }
             else if (skil_rab){
		    ns = document.getElementById('pk2_rabota20');
                    var ss='';
                    for (s in ns.options){
			if (ns.options[s].selected)
				if (ns.options[s].value > 0)
					ss=ns.options[s].value-1;
                    }
		    ss = aWindow.pk2_vse_navyki[ss];
                    for (r in aWindow.raboty){
			if ((r>0)&&(r<126)){
				for (jj in aWindow.raboty[r].navyki)
					if (ss == jj)
						aWindow.porabotaj[r]=true;
			}
                    }
                  }
                  else if (item_rab){
                         is = document.getElementById('pk2_rabota99');
                         var ii=0;
                         for (i in is.options)
			if (is.options[i].selected)
				if (is.options[i].value > 0){
					ii=is.options[i].value;
				}
		for (r in aWindow.raboty){
			if ((r>0)&&(r<130)){
				for (jj in aWindow.raboty[r].resultaty.produkty)
					if (ii==jj)
						aWindow.porabotaj[r]=true;
			}
		}
	}
	else{
		for (r in vyb_rab.options){
			if (vyb_rab.options[r].selected){
				if (vyb_rab.options[r].value > 0) {
					aWindow.porabotaj[vyb_rab.options[r].value] = true;
				}
			}
		}
	}
	min_hp=parseInt(document.getElementById('pk2_fort_hp').value,10);
	aWindow.pk2_zdorov = (min_hp-100-(aWindow.pers.level-1)*aWindow.pers.lifePointPerHealthSkill)/(aWindow.pers.lifePointPerHealthSkill+aWindow.pers.lifePointPerHealthSkillBonus);
	test_vesch = document.getElementById('pk2_khochuka').checked;
	test_svoi_magaziny = document.getElementById('pk2_smo_mag').checked;
	if (test_vesch){
	    vyb_vesch = document.getElementById('pk2_dobavim_veschi');
	    for (v in vyb_vesch.options){
	        if (vyb_vesch.options[v].selected){
	            if (vyb_vesch.options[v].value > 0){
	                aWindow.pk2_khochuka[vyb_vesch.options[v].value] = true;
	            }
	        }
	    }
	}
	aWindow.pk2_khlam = document.getElementById('pk2_khlam').checked;
	iz_magazinov = document.getElementById('pk2_pokupka').checked;
	vse_veschi= document.getElementById('pk2_vse_vse').checked;
	aWindow.bablo = parseInt(document.getElementById('pk2_bablo').value,10);
	aWindow.pk2_millioner = document.getElementById('pk2_milion').checked;
	if (aWindow.pk2_millioner)
	    aWindow.bablo=1000000;
	plus_level = parseInt(document.getElementById('pk2_uroven').value,10);
	aWindow.ezda = document.getElementById('pk2_skorost').checked
	s_zaschitoj=document.getElementById('pk2_zaschita').checked;
	e_nov_rabota=document.getElementById('pk2_navyki').checked;
	nov_index=aWindow.raboty.length;
	if (e_nov_rabota){
		nr_malus = parseInt(document.getElementById('pk2_malus').value,10);
		nov_rabota={};
		nr_rabota_res=null;
		
		nvn_build=parseFloat(document.getElementById('pk2_build').value);
		nvn_punch=parseFloat(document.getElementById('pk2_punch').value);
		nvn_tough=parseFloat(document.getElementById('pk2_tough').value);
		nvn_endurance=parseFloat(document.getElementById('pk2_endurance').value);
		nvn_health=parseFloat(document.getElementById('pk2_health').value);
		nvn_ride=parseFloat(document.getElementById('pk2_ride').value);
		nvn_reflex=parseFloat(document.getElementById('pk2_reflex').value);
		nvn_dodge=parseFloat(document.getElementById('pk2_dodge').value);
		nvn_hide=parseFloat(document.getElementById('pk2_hide').value);
		nvn_swim=parseFloat(document.getElementById('pk2_swim').value);
		nvn_aim=parseFloat(document.getElementById('pk2_aim').value);
		nvn_shot=parseFloat(document.getElementById('pk2_shot').value);
		nvn_pitfall=parseFloat(document.getElementById('pk2_pitfall').value);
		nvn_finger_dexterity=parseFloat(document.getElementById('pk2_finger_dexterity').value);
		nvn_repair=parseFloat(document.getElementById('pk2_repair').value);
		nvn_leadership=parseFloat(document.getElementById('pk2_leadership').value);
		nvn_tactic=parseFloat(document.getElementById('pk2_tactic').value);
		nvn_trade=parseFloat(document.getElementById('pk2_trade').value);
		nvn_animal=parseFloat(document.getElementById('pk2_animali').value);
		nvn_appearance=parseFloat(document.getElementById('pk2_appearance').value);
		aWindow.raboty[nov_index] = {rus_name:'Konfigurator', name:'constructor', malus:nr_malus, navyki:{build:nvn_build, punch:nvn_punch, tough:nvn_tough, endurance:nvn_endurance, health:nvn_health, ride:nvn_ride, reflex:nvn_reflex, dodge:nvn_dodge, hide:nvn_hide, swim:nvn_swim, aim:nvn_aim, shot:nvn_shot, pitfall:nvn_pitfall, finger_dexterity:nvn_finger_dexterity, repair:nvn_repair, leadership:nvn_leadership, tactic:nvn_tactic, trade:nvn_trade, animal:nvn_animal, appearance:nvn_appearance}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:0, producty:null}};
	}
	if (s_zaschitoj){
		aWindow.zaschita=null;
		aWindow.zaschita={};
		aWindow.zaschita.to = parseInt(document.getElementById('pk2_zaschitato').value,10);
		if (document.getElementById('pk2_zaschita_vm').checked){
			aWindow.zaschita.navyki={punch:1,tough:0.5,health:1,reflex:0.5,dodge:1,aim:1,tactic:1};
		}
		else if (document.getElementById('pk2_zaschita_vr').checked){
			aWindow.zaschita.navyki={shot:1,tough:0.5,health:1,reflex:0.5,dodge:1,aim:1,tactic:1};
		}
		else if (document.getElementById('pk2_zaschita_vd').checked){
			aWindow.zaschita.navyki={tough:0.5,health:1,reflex:0.5,dodge:1,tactic:1};
		}
		else if (document.getElementById('pk2_zaschita_vk').checked){
			aWindow.zaschita.navyki=aWindow.raboty[nov_index].navyki;
			e_nov_rabota=false;
		}
		else{
			aWindow.zaschita.navyki={dodge:1};
		}
	}
	else{
		aWindow.zaschita=null;
	}
	if (e_nov_rabota){
		if (vse_vse || vse_rab || nesk_rab) {
			aWindow.porabotaj[nov_index] = true;
		}
		else{
			aWindow.porabotaj=[];
			aWindow.porabotaj[nov_index] = true;
		}
	}

	sslot=document.getElementById('pk2_sloty').checked;
	if (sslot){
		aWindow.pk2_slots={};
		aWindow.pk2_slots.flag=true;
		aWindow.pk2_slots.head =document.getElementById('pk2_head').checked;
		aWindow.pk2_slots.body =document.getElementById('pk2_body').checked;
		aWindow.pk2_slots.belt =document.getElementById('pk2_belt').checked;
		aWindow.pk2_slots.pants =document.getElementById('pk2_pants').checked;
		aWindow.pk2_slots.foot =document.getElementById('pk2_foot').checked;
		aWindow.pk2_slots.neck =document.getElementById('pk2_neck').checked;
		aWindow.pk2_slots.right_arm =document.getElementById('pk2_right_arm').checked;
		aWindow.pk2_slots.left_arm =document.getElementById('pk2_left_arm').checked;
		aWindow.pk2_slots.yield =document.getElementById('pk2_yield').checked;
		aWindow.pk2_slots.animal =document.getElementById('pk2_animal').checked;
	}
	else{
		aWindow.pk2_slots=null;
	}
	//if (!aWindow.pk2_inv_imported){
	    aWindow.pk2_iimport();
	    if (!aWindow.pk2_inv_imported){
	        new aWindow.HumanMessage('Vous devez d\'abord ouvrir votre inventaire, puis patienter.<br>Après vous pouvez réduire ou fermer.');
	        aWindow.pk2_process=false;
	        return;
	    }
	//}
	if (test_vesch&&test_svoi_magaziny){
	    aWindow.pk2_mimport();
	}
	
	if (aWindow.pk2_inv_imported)
	{
        aWindow.pk2_podschet(vse_veschi, iz_magazinov, plus_level, aWindow.pers);
    }
       
    if (aWindow.einfo!=''){
        aWindow.pk2_show_window();
        aWindow.pk2_error_window(aWindow.einfo+'\n'+aWindow.winfo);
    }
    else if (aWindow.winfo!=''){
        aWindow.pk2_show_window();
        aWindow.pk2_error_window(aWindow.winfo);
    }
    
    aWindow.all_def={navyki:{}};
	if (aWindow.zaschita){
		for (z in aWindow.zaschita.navyki) aWindow.all_def.navyki[z]=aWindow.zaschita.navyki[z];
	}
	else	aWindow.all_def.navyki = {aim:2,dodge:2,tactic:2,tough:1,reflex:1,health:1};
	if (schet){
	    aWindow.rekurs_time = 50000;
	    aWindow.rekurs_step = 0;
        aWindow.pk2_vybzap();
    }
    else{
        aWindow.pk2_vybvesch();
    }
}

pk2_code+="\
my_name_is = function (){\
	if (Character&&Character.name){\
		pk2_pre = location.host.substr(0,4)+Character.name;\
		pk2_getValue(pk2_pre+'odev_list');\
		setTimeout(function() {if (pk2_abyrvalg.indexOf('aWindow.')==0) {pk2_abyrvalg=pk2_abyrvalg.slice(8)};eval(pk2_abyrvalg)},500);\
	}\
	else{\
		setTimeout(my_name_is,500);\
	}\
};\
";


aWindow.pk2_simselect='<select class=\"pk2_sel\" style=\"width:99%\" id=\"pk2_rabota\" size=\"1\" onchange=\"javascript:$(\'pk2_skol_rabot_o\').checked=true;\">';
aWindow.pk2_mulselect='<select title=\"Sélectionné plusieurs jobs en maintenant la touche Ctrl\" class=\"pk2_sel\" style=\"width:99%\" multiple=\"multiple\" id=\"pk2_rabota\" size=\"15\" onchange=\"javascript:$(\'pk2_skol_rabot_n\').checked=true;\">';
aWindow.pk2_conselect='\
<option value=\"0\">== Choisir travail ==</option>\n\
<option value=\"27\">Abattre des arbres</option>\n\
<option value=\"77\">Attaquer un train</option>\n\
<option value=\"74\">Attaquer une diligence</option>\n\
<option value=\"48\">Attraper des chevaux</option>\n\
<option value=\"102\">Attraper des crabes</option>\n\
<option value=\"122\">Braquer une banque</option>\n\
<option value=\"78\">Cambrioler</option>\n\
<option value=\"49\">Charpenter des cercueils</option>\n\
<option value=\"68\">Chasse au trésor</option>\n\
<option value=\"52\">Chasser des bisons</option>\n\
<option value=\"39\">Chasser des castors</option>\n\
<option value=\"51\">Chasser des coyotes</option>\n\
<option value=\"20\">Chasser des dindons</option>\n\
<option value=\"66\">Chasser des grizzlys</option>\n\
<option value=\"58\">Chasser des loups</option>\n\
<option value=\"2\">Chasser des oiseaux du champ</option>\n\
<option value=\"114\">Chasser des pumas</option>\n\
<option value=\"108\">Chasser des serpents à sonnette</option>\n\
<option value=\"75\">Chasseur de primes</option>\n\
<option value=\"44\">Construire des éoliennes</option>\n\
<option value=\"119\">Construire un casino</option>\n\
<option value=\"53\">Construire un manoir</option>\n\
<option value=\"47\">Construire un pont</option>\n\
<option value=\"84\">Construire un ranch</option>\n\
<option value=\"43\">Construire une station</option>\n\
<option value=\"28\">Construire une ligne d\'arrosage</option>\n\
<option value=\"118\">Construire une mission</option>\n\
<option value=\"17\">Corroyer</option>\n\
<option value=\"19\">Creuser des tombes</option>\n\
<option value=\"38\">Creuser un puits</option>\n\
<option value=\"86\">Cueillir des agaves</option>\n\
<option value=\"9\">Cueillir des baies</option>\n\
<option value=\"15\">Cueillir des haricots</option>\n\
<option value=\"98\">Cueillir des myrtilles</option>\n\
<option value=\"91\">Cueillir des oranges</option>\n\
<option value=\"87\">Cueillir des tomates</option>\n\
<option value=\"5\">Cueillir du coton</option>\n\
<option value=\"4\">Cueillir du tabac</option>\n\
<option value=\"55\">Défricher la forêt</option>\n\
<option value=\"121\">Démanteler une bande</option>\n\
<option value=\"70\">Détrousser les passants</option>\n\
<option value=\"31\">Détruire le barrage</option>\n\
<option value=\"82\">Diriger un bateau à aubes</option>\n\
<option value=\"35\">Dresser des chevaux</option>\n\
<option value=\"57\">Escorter une diligence</option>\n\
<option value=\"113\">Escroc au mariage</option>\n\
<option value=\"45\">Explorer</option>\n\
<option value=\"40\">Extraire du charbon</option>\n\
<option value=\"56\">Extraire de l’argent</option>\n\
<option value=\"25\">Extraire des pierres</option>\n\
<option value=\"85\">Extraire du fer</option>\n\
<option value=\"67\">Extraire du pétrole</option>\n\
<option value=\"116\">Extraire du plomb</option>\n\
<option value=\"109\">Extraire du salpêtre</option>\n\
<option value=\"105\">Extraire du soufre</option>\n\
<option value=\"90\">Éteindre le feu</option>\n\
<option value=\"62\">Évangéliser</option>\n\
<option value=\"83\">Faire de la contrebande</option>\n\
<option value=\"12\">Faucher l’herbe</option>\n\
<option value=\"88\">Ferrer des chevaux</option>\n\
<option value=\"46\">Flotter du bois</option>\n\
<option value=\"103\">Faire la classe</option>\n\
<option value=\"124\">Faire son show chez Buffalo Bill</option>\n\
<option value=\"1\">Garder des cochons</option>\n\
<option value=\"10\">Garder des moutons</option>\n\
<option value=\"16\">Garder le fort</option>\n\
<option value=\"22\">Herbager le bétail</option>\n\
<option value=\"41\">Imprimer des journaux</option>\n\
<option value=\"30\">Installer une haie de barbelés</option>\n\
<option value=\"33\">Jalonner le territoire</option>\n\
<option value=\"123\">Libérer des esclaves</option>\n\
<option value=\"36\">Marchander</option>\n\
<option value=\"54\">Marchander avec des Indiens</option>\n\
<option value=\"29\">Marquer des bovins</option>\n\
<option value=\"110\">Mener les chevaux</option>\n\
<option value=\"37\">Monter des poteaux télégraphiques</option>\n\
<option value=\"13\">Moudre du blé</option>\n\
<option value=\"93\">Nettoyer des chaussures</option>\n\
<option value=\"92\">Nettoyer une étable</option>\n\
<option value=\"80\">Négocier la paix</option>\n\
<option value=\"96\">Nourrir les animaux</option>\n\
<option value=\"111\">Organiser un rodéo</option>\n\
<option value=\"18\">Orpailler</option>\n\
<option value=\"42\">Pêcher</option>\n\
<option value=\"7\">Pêcher à la ligne</option>\n\
<option value=\"63\">Poney-Express</option>\n\
<option value=\"99\">Planter des arbres</option>\n\
<option value=\"3\">Poser des affiches</option>\n\
<option value=\"21\">Poser des rails</option>\n\
<option value=\"65\">Piller des cadavres</option>\n\
<option value=\"59\">Protéger le convoi des colons</option>\n\
<option value=\"100\">Ramasser des plumes d\'aigle</option>\n\
<option value=\"101\">Ramasser des fleurs de lotus</option>\n\
<option value=\"32\">Recherche de gemmes</option>\n\
<option value=\"117\">Rechercher des gemmes rares</option>\n\
<option value=\"26\">Rectifier une rivière</option>\n\
<option value=\"94\">Repriser des chaussettes</option>\n\
<option value=\"126\">Récolter de l’indigo</option>\n\
<option value=\"6\">Récolter de la canne à sucre</option>\n\
<option value=\"95\">Récolter des pommes de terre</option>\n\
<option value=\"97\">Récolter des potirons</option>\n\
<option value=\"8\">Récolter du blé</option>\n\
<option value=\"14\">Récolter du maïs</option>\n\
<option value=\"23\">Réparer des clôtures</option>\n\
<option value=\"34\">Réparer une voiture à bâche</option>\n\
<option value=\"24\">Scier du bois</option>\n\
<option value=\"69\">Servir dans l’armée</option>\n\
<option value=\"61\">Surveiller une prison</option>\n\
<option value=\"73\">Tendre une embuscade</option>\n\
<option value=\"76\">Transférer des prisonniers</option>\n\
<option value=\"106\">Transport en eau vive</option>\n\
<option value=\"115\">Transporter de l’alcool</option>\n\
<option value=\"50\">Transporter des munitions</option>\n\
<option value=\"72\">Traquer des bandits</option>\n\
<option value=\"79\">Travailler comme charlatan</option>\n\
<option value=\"112\">Travailler comme marchand ambulant</option>\n\
<option value=\"71\">Travailler comme mercenaire</option>\n\
<option value=\"104\">Travailler comme shérif</option>\n\
<option value=\"120\">Travailler comme maréchal</option>\n\
<option value=\"107\">Traverser le pays en tant que joueur</option>\n\
<option value=\"64\">Vendre des fusils aux Indiens</option>\n\
<option value=\"11\">Vendre des journaux</option>\n\
<option value=\"60\">Voler des chevaux</option>\n\
<option>===== * Vie * ===== * Agrandissement * ===== * Déplacement * =====</option>\n\
<option value=\"125\" style=\"background-color:Cyan\">Régénération</option>\n\
<option value=\"131\" style=\"background-color:#FFEC8B\">Agrandissement de la Ville/Fort</option>\n\
<option value=\"141\" style=\"background-color:#54FF9F\">Déplacement</option>\n\
<option>======================== * Fort * ========================</option>\n\
<option value=\"201\" style=\"background-color:red\">Attaquer le Fort</option>\n\
<option value=\"202\" style=\"background-color:red\">Attaquer le Fort (Viser)</option>\n\
<option value=\"203\" style=\"background-color:red\">Attaquer le Fort (Esquiver)</option>\n\
<option value=\"204\" style=\"background-color:green;color:white\">Défendre le Fort</option>\n\
<option value=\"205\" style=\"background-color:green;color:white\">Défendre le Fort (Viser)</option>\n\
<option value=\"206\" style=\"background-color:green;color:white\">Défendre le Fort (Esquiver)</option>\n\
<option>======================== * Duel * ========================</option>\n\
<option value=\"151\" style=\"background-color:brown;color:white\">Arme à feu (Attaquant) 1</option>\n\
<option value=\"152\" style=\"background-color:brown;color:white\">Arme à feu (Attaquant) 2</option>\n\
<option value=\"156\" style=\"background-color:brown;color:white\">Arme à feu + Vie (Attaquant) 1</option>\n\
<option value=\"157\" style=\"background-color:brown;color:white\">Arme à feu + Vie (Attaquant) 2</option>\n\
<option value=\"158\" style=\"background-color:brown;color:white\">Arme à feu + Vie (Défenseur) 1</option>\n\
<option value=\"159\" style=\"background-color:brown;color:white\">Arme à feu + Vie (Défenseur) 2</option>\n\
<option value=\"153\" style=\"background-color:brown;color:white\">Arme à feu Build Défensif Mixte 1</option>\n\
<option value=\"154\" style=\"background-color:brown;color:white\">Arme à feu Build Défensif Mixte 2</option>\n\
<option value=\"155\" style=\"background-color:brown;color:white\">Arme à feu Build Défensif Mixte 3</option>\n\
<option value=\"160\" style=\"background-color:brown;color:white\">Arme à feu Build Défensif Mixte + Vie</option>\n\
<option value=\"161\" style=\"background-color:DarkViolet;color:white\">Arme de contact (Attaquant) 1</option>\n\
<option value=\"162\" style=\"background-color:DarkViolet;color:white\">Arme de contact (Attaquant) 2</option>\n\
<option value=\"166\" style=\"background-color:DarkViolet;color:white\">Arme de contact + Vie (Attaquant) 1</option>\n\
<option value=\"167\" style=\"background-color:DarkViolet;color:white\">Arme de contact + Vie (Attaquant) 2</option>\n\
<option value=\"163\" style=\"background-color:DarkViolet;color:white\">Arme de contact Build Défense (Défenseur) 1</option>\n\
<option value=\"164\" style=\"background-color:DarkViolet;color:white\">Arme de contact Build Défense (Défenseur) 2</option>\n\
<option value=\"165\" style=\"background-color:DarkViolet;color:white\">Arme de contact Build Défense (Défenseur) 3</option>\n\
<option value=\"168\" style=\"background-color:DarkViolet;color:white\">Arme de contact Build Défense + Vie (Défenseur) 1</option>\n\
<option value=\"169\" style=\"background-color:DarkViolet;color:white\">Arme de contact Build Défense + Vie (Défenseur) 2</option>\n\
<option value=\"170\" style=\"background-color:DarkViolet;color:white\">Arme de contact Build Défense + Vie (Défenseur) 3</option>\n\
<option>===================== * Hack.Crows * =====================</option>\n\
</select>\
';

aWindow.pk2_slot_selector = function(v_slot){
	document.getElementById('pk2_head').checked = (v_slot=='head');
	document.getElementById('pk2_body').checked = (v_slot=='body');
	document.getElementById('pk2_belt').checked = (v_slot=='belt');
	document.getElementById('pk2_pants').checked = (v_slot=='pants');
	document.getElementById('pk2_foot').checked = (v_slot=='foot');
	document.getElementById('pk2_neck').checked = (v_slot=='neck');
	document.getElementById('pk2_right_arm').checked = (v_slot=='right_arm');
	document.getElementById('pk2_left_arm').checked = (v_slot=='left_arm');
	document.getElementById('pk2_yield').checked = (v_slot=='yield');
	document.getElementById('pk2_animal').checked = (v_slot=='animal');
};

aWindow.pk2_ovselect = function(){
    vyb_vesch_options = document.getElementById('pk2_dobavim_veschi').options;
    for (v in vyb_vesch_options){
        vyb_vesch_options[v].selected = false;
    }
}

aWindow.pk2_show_shmot = function(irab){
    vv = null;
    if (aWindow.resultaty_r[irab]){
        vv = aWindow.resultaty_r[irab];
    }
    else if (aWindow.resultaty_z[irab]){
        vv = aWindow.resultaty_z[irab];
    }
    else if (aWindow.resultaty[irab]){
        vv = aWindow.resultaty[irab];
    }
    if (!vv) return;
    hti = '<table style=\"\">';
    for (ii = 0; ii < vv.items.length; ++ii){
        sid = vv.items[ii].tid;
        if (sid){
            vesch = aWindow.items[sid];
            hti+='<tr><td><a class=\"tt2\" href=\"#\" ><span><strong>'+vesch.name+'</strong>';
            if (vesch.set.key){
                hti += '<br /><em>'+vesch.set.name+'</em>';
            }
            for (ind in vesch.bonus.attributes){
                hti += aWindow.pk2_a_print(ind, vesch.bonus.attributes[ind]);
            }
            for (ind in vesch.bonus.skills){
                hti += aWindow.pk2_s_print(ind, vesch.bonus.skills[ind]);
            }
            hti += '</span>';
            hti+='<div class=\"bag_item\" ><img src=\"'+ vesch.image_mini +'\" /></div>';
            hti+='</a></td></tr>';
        }
    }
    hti += '</table>';

    pk2_shmot_old = document.getElementById('pk2_shmot');
    pk2_shmot = null;
    html2='';
    
    if (!pk2_shmot){
		html2 += '<div id=\"pk2_shmo2\" style=\"width:' + 116 + 'px;\">\n';
        html2 += '<div style=\"background-image:url(http://s3.noelshack.com/uploads/images/7069841695125_fermer_img.png); text-align:center; font-weight:bold; color:white;\">';
		html2 += '<span>';
		html2 += '<a href=\"javascript:pk2_close_shmot();\"' + aWindow.pk2_tlink + ' title=\"Fermer\">&nbsp;<b>x</b>&nbsp;</a>&nbsp;';
		html2 += '</span>';
		html2 += '<span id=\"pk2_shmot_cap\">Présentation</span>';
		html2 += '</div>'
		html2 += '<div id=\"bi2_shmot_content\" style=\"background-image:url(http://s3.noelshack.com/uploads/images/12464299525392_prsentation_img.png);\">';

        html2 += hti;
        html2 += '</div>'        		
        
		html2 += '</div>';
		pk2_shmot = document.createElement('div');
		pk2_shmot.id = 'pk2_shmot';
		pk2_shmot.innerHTML = html2;
		pk2_shmot.setAttribute('style', 'position: absolute; right: ' + 20 + 'px; top: ' + 10 + 'px; z-index:251');
	}
	if (pk2_shmot_old)
	    document.body.replaceChild(pk2_shmot, pk2_shmot_old);
	else
	    document.body.appendChild(pk2_shmot);
	pk2_shmot.style.display = 'block';

}

aWindow.pk2_show_panel = function(){
	pk2_title = document.getElementById('pk2_title');
	html0 = '';
	
	if (!pk2_title) {
		html0 += '<div id=\"pk2_form0\" style=\"width:' + aWindow.pk2_w0 + 'px; text-align:left;\">\n';
		html0 += '<table class=\"shadow_table\" align=\"left\"><tbody>\n';
		html0 += '<tr>';
		html0 += '<td class=\"gran_vl\" />\n';
		html0 += '<td class=\"gran_v\" />\n';
		html0 += '<td class=\"gran_vp\" />\n';
		html0 += '</tr><tr>\n';
		html0 += '<td class=\"gran_l\" />\n';
		html0 += '<td style=\"background-color:#302010; text-align:center; font-weight:bold; color:white;\">';
		html0 += '<span>';
		html0 += '<a href=\"javascript:pk2_minimize_title();\"' + aWindow.pk2_tlink + ' title=\"Réduire/Restaurer la fenêtre\">&nbsp;<b>-</b>&nbsp;</a>&nbsp;';
		html0 += '<a href=\"javascript:pk2_stretch_title();\"' + aWindow.pk2_tlink + ' title=\"Réduire/Restaurer les options\">&nbsp;<b>+</b>&nbsp;</a>&nbsp;';
		html0 += '<a href=\"javascript:pk2_close_title();\"' + aWindow.pk2_tlink + ' title=\"Fermer\">&nbsp;<b>x</b>&nbsp;</a>&nbsp;';
		html0 += '</span>';
		html0 += '<span id=\"pk2_title_cap\" style=\"font-size:11px;\">Recherche les meilleurs items</span>';
		html0 += '<input type=\"button\" value=\"Valider\" style=\"float:right; font-weight:bold\" onclick=\"javascript:pk2_worker(true)\"/>';
		html0 += '</td><td class=\"gran_p\" />\n'
		html0 += '</tr><tr id=\"pk2_title_content_row\">\n';
		html0 += '<td class=\"gran_l\" />\n';
		html0 += '<td id=\"pk2_title_content0\" class=\"shadow_content\" style=\"width:' + (aWindow.pk2_w0 - 12) + 'px;\" >';
		html0 += '<div id=\"pk2_title_content\" style=\"overflow: auto; height: ' + aWindow.pk2_title_h_mid + 'px;\">';
		
		html0 += '\
<form id=\"pk2_form\">\
	<div id=\"pk2_vselect\">';
		html0 += aWindow.pk2_simselect;
		html0 += aWindow.pk2_conselect;
		
		html0 += '</div>\
	<div' + aWindow.pk2_vblock + '>\
	<input id=\"pk2_skol_rabot_o\" name=\"pk2_skol_rabot\" type=\"radio\" value=\"o\" checked=\"checked\" style=\"margin:auto 5px;\" onchange=\"javascript:pk2_vselect(false);void(0)\" />Un travail\
	<input id=\"pk2_skol_rabot_n\" name=\"pk2_skol_rabot\" type=\"radio\" value=\"n\" style=\"margin:auto 5px;\" onchange=\"javascript:pk2_vselect(true);void(0)\" />Travaux choisis\
	<input id=\"pk2_skol_rabot_r\" name=\"pk2_skol_rabot\" type=\"radio\" value=\"r\" style=\"margin:auto 5px;\" />Tous les travaux\
	<input type= \"button\" title=\" 7 éléments par groupe.\" value=\"items avec PT\" style=\"float:right; clear:right;\" onclick=\"javascript:pk2_worker(false)\"/>\
	<input id=\"pk2_skol_rabot_v\" name=\"pk2_skol_rabot\" type=\"radio\" value=\"v\" style=\"visibility:hidden; margin:auto 5px;\" /><!--Tout-->\
	<div style=\"float:left;\" >&nbsp;Point (Fort)&nbsp;&nbsp;<input id=\"pk2_fort_hp\" name=\"pk2_fort_hp\ type=\"text\" value=\"0\" size=\"2\">&nbsp;</div><br>\
	<div style=\"float:right;\" ><font size=\"1px\">Auteur:<b>'+przy_link+'</b> | v.<a href=\"http://userscripts.org/scripts/show/92263\" target=\"_blank\" style=\"color:492b19\">'+TwuVers+'</a></font>&nbsp;</div><br>\
	<input id=\"pk2_skol_rabot_s\" name=\"pk2_skol_rabot\" type=\"radio\" value=\"s\" style=\"margin:auto 5px;\" />Aptitudes&nbsp;';
		html0 +='<select class=\"pk2_sel\" id=\"pk2_rabota20\" size=\"1\" onchange=\"javascript:$(\'pk2_skol_rabot_s\').checked=true;\">\
	<option value=\"0\">== Choisissez une aptitude ==</option>';
	for (ii=0;ii<aWindow.pk2_vse_navyki.length;++ii)
	{
		html0 += '<option value=\"'+(ii+1)+'\">	'+ aWindow.Character.skill_titles[aWindow.pk2_vse_navyki[ii]]+'</option>';
	};
		html0 += '\
	</select><br />\
	<input id=\"pk2_skol_rabot_i\" name=\"pk2_skol_rabot\" type=\"radio\" value=\"i\" style\"margin:auto 5px;\" />Produit&nbsp;';
		html0 +='\
	<select class=\"pk2_sel\" id=\"pk2_rabota99\" size=\"1\" onchange=\"javascript:$(\'pk2_skol_rabot_i\').checked=true;\">\
	<option value=\"0\">== Choisissez un produit ==</option>';
	var tmp=[];
	for (ii=700;ii<1850;++ii){
		tmp[ii]={};
		tmp[ii].ves = aWindow.items[ii] ? aWindow.items[ii].name : '-';
		tmp[ii].id = ii;

if (tmp[ii].ves!='-')
if (aWindow.items[ii].type !='yield')
tmp[ii].ves = '-';
else if (aWindow.items[ii].shop != 'drop')
tmp[ii].ves = '-';
;
;
	}
	aWindow.qsort(tmp,700,1849);
	for (ii=700;ii<1850;++ii)
	{
		if (tmp[ii].ves !== '-')
			html0 += '<option value=\"'+tmp[ii].id+'\">	'+ tmp[ii].ves+'</option>';
	};

		html0 += '\
	</select><br />\
	\n\
	</div>\
	<div' + aWindow.pk2_vblock + '>\
		<span title=\"Après avoir sélectionné le(s) job(s),<br> le script va détecter les items qui sont «inutiles» et calculer le prix de vente.\"><input id=\"pk2_khlam\" type=\"checkbox\" style=\"margin:auto 21px auto 27px;\" />\
		Voir les équipements inutiles pour le(s) job(s) sélectionnés<br /></span>\
	</div>\
	<div' + aWindow.pk2_vblock + '>\
		<span title=\"Le script va ajouter de la vitesse pour le(s) job(s) dans la disponibilité des items présents dans votre inventaire.<br /> Utile pour les longues distances.\">\
		<input id=\"pk2_skorost\" type=\"checkbox\" style=\"margin:auto 21px auto 27px;\" />\
		Envisager d\'ajouter de la vitesse pour le(s) job(s) ?<br /></span>\
	</div>\
	<div' + aWindow.pk2_vblock + '>\
		<span id=\"sp_tst_st3456\" title=\"Vous souhaitez faire ce(s) job(s), mais il vous manque quelques PT ?<br> Le script vous aidera à choisir les bons items en fonction de votre porte-monnaie :D.\">\
		<input id=\"pk2_pokupka\" type=\"checkbox\" style=\"margin:auto 21px auto 27px;\" onchange=\"javascript:if (checked) {$(\'pk2_ukr_bablo\').style.display=\'block\'}else{$(\'pk2_ukr_bablo\').style.display=\'none\'};void(0)\" />\
		Voulez-vous acheter de l\'équipement ?<br /></span>\
		<div id=\"pk2_ukr_bablo\" style=\"display:none;\">\
		<span title=\"Indiquez combien d\'argent vous êtes prêt à mettre pour avoir de bons items.\">\
		<input id=\"pk2_bablo\" type=\"text\" value=\"0\" size=\"5\" onchange=\"javascript:value = parseInt(value,10);if((value<0)||isNaN(value))value=0;void(0)\" />\
		Destiner la somme d\'argent pour les meilleurs items<br /></span>\
		<span title=\"Vous êtes prêt à dépenser une grosse somme pour acheter votre article préféré ?<br /> Le script va rechercher les «meilleurs» items.\">\
		<input id=\"pk2_milion\" type=\"checkbox\" style=\"margin:auto 21px auto 27px;\" />L\'argent n\'a pas d\'importance :D<br /></span>\
		</div>\
	</div>\
	<div' + aWindow.pk2_vblock + '>\
		<span title=\"Recherches les items qui sont le mieux pour le(s) job(s). <br />Le script recherche la «meilleure» tenue.\">\
		<input id=\"pk2_vse_vse\" type=\"checkbox\" style=\"margin:auto 21px auto 27px;\" />Calcule les meilleurs vêtements pour le(s) job(s)?</span>\
	</div>\
		<div' + aWindow.pk2_vblock + '>\
		<span title=\"Vous pouvez sélectionner les items et voir combien de fois ils seront utilisés.\">\
		<input id=\"pk2_khochuka\" type=\"checkbox\" style=\"margin:auto 23px auto 27px;\" onchange=\"javascript:if (checked) {$(\'pk2_ukr_khochuka\').style.display=\'block\'}else{$(\'pk2_ukr_khochuka\').style.display=\'none\';pk2_ovselect();};void(0)\" />Utilité des items</span>\
		<div id=\"pk2_ukr_khochuka\" style=\"display:none;\">\
		<span title=\"Après avoir sélectionné cette option<br /> Vous devez ouvrir l\'Armurier, le Tailleur et l\'Épicerie\">\
		<input id=\"pk2_smo_mag\" type=\"checkbox\" style=\"margin:auto 23px auto 27px;\" >Importer les éléments à partir du/des magasin(s).</span>\
		<select title=\"Sélectionné plusieurs items en maintenant la touche Ctrl\" class=\"pk2_sel\" multiple=\"multiple\" id=\"pk2_dobavim_veschi\" size=\"10\">;';
		
    for (vv = 1; vv < 11200; ++vv){
        if ((vv >= 100)&&(vv < 200)) continue;
        if ((vv >= 700)&&(vv < 800)) continue;
        if ((vv >= 900)&&(vv < 10000)) continue;
        if ((vv >= 10200)&&(vv < 11000)) continue;
        if (vv == 1) {html0+='<optgroup title=\"Arme de contact\" label=\"Arme de contact\">'}
        if (vv == 200) {html0+='<optgroup title=\"Couvre-chef\" label=\"Couvre-chef\">'}
        if (vv == 300) {html0+='<optgroup title=\"Habillement\" label=\"Habillement\">'}
        if (vv == 400) {html0+='<optgroup title=\"Chaussure\" label=\"Chaussure\">'}
        if (vv == 500) {html0+='<optgroup title=\"Colliers\" label=\"Colliers\">'}
        if (vv == 600) {html0+='<optgroup title=\"Monture\" label=\"Monture\">'}
        if (vv == 800) {html0+='<optgroup title=\"Arme de duel\" label=\"Arme de duel\">'}
        if (vv == 10000) {html0+='<optgroup title=\"Pantalon\" label=\"Pantalon\">'}
        if (vv == 11000) {html0+='<optgroup title=\"Ceinture\" label=\"Ceinture\">'}
        if (aWindow.items[vv]){
            html0 +='<option value=\"'+vv+'\">	'+aWindow.items[vv].name+'	</option>';
        }
    }
    html0 += '</optgroup><optgroup title=\"Autres objets (Set)\" label=\"Autres objets (Set)\">';
    html0 += '<option value=\"723\">	'+aWindow.items[723].name+'	 </option>';
    html0 += '<option value=\"768\">	'+aWindow.items[768].name+'	 </option>';
    html0 += '<option value=\"792\">	'+aWindow.items[792].name+'	 </option>';
    html0 += '<option value=\"794\">	'+aWindow.items[794].name+'	 </option>';
    html0 += '<option value=\"797\">	'+aWindow.items[797].name+'	 </option>';
    html0 += '<option value=\"1715\">	'+aWindow.items[1715].name+' </option>';
    html0 += '<option value=\"1762\">	'+aWindow.items[1762].name+' </option>';
    html0 += '<option value=\"1772\">	'+aWindow.items[1772].name+' </option>';	
    html0 += '</optgroup>';
html0 += '</select></div></div>\
		<div' + aWindow.pk2_vblock + '>\
		<span title=\"La sélection de cette option et la saisissez des numéros de 1 à 5, signifie que vous pouvez consulter les articles prochainement.<br> Cela permet de supposer que les articles à votre niveau actuel.\"><input id=\"pk2_uroven\" type=\"text\" value=\"0\" size=\"1\" onchange=\"javascript:value = parseInt(value,10);if(isNaN(value))value=0;void(0)\" style=\"height:13px; margin:auto 3px auto 16px; vertical-align: middle; text-align: center;\" />\
		Niveau(x) plus élevé(s)</span>\
	</div>\
	<div' + aWindow.pk2_vblock + '>\
		<span title=\"Interagit avec les choix de <b>Types d\'équipements</b> et <b>Détermination des aptitudes</b>.\"><input id=\"pk2_zaschita\" type=\"checkbox\" style=\"margin:auto 21px auto 27px;\" onchange=\"javascript:if (checked) {$(\'pk2_ukr_zaschita\').style.display=\'block\'}else{$(\'pk2_ukr_zaschita\').style.display=\'none\'};void(0)\" />\
		 Le défenseur contre l\'agresseur</span>\
	<div id=\"pk2_ukr_zaschita\" style=\"display:none;\">\
		<span title=\"Aptitudes prises en compte:<br>Puissance, Viser, Éviter, Tactiques, Vie, 1/2 (réflexes et résistance)\"><input id=\"pk2_zaschita_vm\" name=\"pk2_zaschita_v\" type=\"radio\" value=\"m\" style\"margin:auto 5px;\" />Contact</span>\
		<span title=\"Aptitudes prises en compte:<br>Tirer, Viser, Éviter, Tactiques, Vie, 1/2 (réflexes et résistance)\"><input id=\"pk2_zaschita_vr\" name=\"pk2_zaschita_v\" type=\"radio\" value=\"r\" style\"margin:auto 5px;\" />Gunner</span>\
		<span title=\"Aptitudes prises en compte:<br>Éviter, Tactiques, Vie, 1/2 (réflexes et résistance)\"><input id=\"pk2_zaschita_vd\" name=\"pk2_zaschita_v\" type=\"radio\" checked=\"checked\" value=\"d\" style\"margin:auto 5px;\" />Défensif<br /></span>\
		<span title=\"Aptitudes prises en compte:<br>Sélectionnez (Détermination des aptitudes), tous les choix ci-dessous seront inclus\"><input id=\"pk2_zaschita_vk\" name=\"pk2_zaschita_v\" type=\"radio\" value=\"k\" style\"margin:auto 5px;\" />Aptitudes choisies<br /></span>\
		<span title=\"Pour les travaux sélectionnés, les PT (Points Travail) seront alloués à la valeur minimum.<br> L\'ensemble du «surplus» sera affectés à n\'importe quel défi.\"><input id=\"pk2_zaschitato\" type=\"text\" value=\"' +
		aWindow.pk2_zaschitato +
		'\" size=\"5\" onchange=\"javascript:value = parseInt(value,10);if((value<0)||isNaN(value))value=0;void(0)\" />Minimum de PT (Points Travail)<br /></span>\
		</div></div>\
		\
	<div' + aWindow.pk2_vblock +'>\
		<span title=\"Sélectionner les différentes parties du corps qui doivent être gardées.\"><input id=\"pk2_sloty\" value=\"pk2_sloty\" type=\"checkbox\" onchange=\"javascript:if (checked) {$(\'pk2_sloty_content\').style.display=\'block\'}else{$(\'pk2_sloty_content\').style.display=\'none\'};void(0)\" style=\"margin:auto 21px auto 27px;\" />\
		Types d\'équipements<br /></span>\
		<div id=\"pk2_sloty_content\" style=\"display:none; \">\
	<div' + aWindow.pk2_vblock +'>\
		<input name=\"pk2_slot_selecter\" type=\"radio\" style=\"margin:auto auto auto 23px;\" onchange=\"javascript:pk2_slot_selector(\'head\');void(0);\"/>\
		<input id=\"pk2_head\" type=\"checkbox\" checked=\"1\" style=\"margin:auto 23px auto 21px;\" title=\"Couvre-chef\" />Couvre-chef<br />\
		<input name=\"pk2_slot_selecter\" type=\"radio\" style=\"margin:auto auto auto 23px;\" onchange=\"javascript:pk2_slot_selector(\'neck\');void(0);\"/>\
		<input id=\"pk2_neck\" type=\"checkbox\" checked=\"1\" style=\"margin:auto 23px auto 21px;\" title=\"Colliers\" />Colliers<br />\
		<input name=\"pk2_slot_selecter\" type=\"radio\" style=\"margin:auto auto auto 23px;\" onchange=\"javascript:pk2_slot_selector(\'body\');void(0);\"/>\
		<input id=\"pk2_body\" type=\"checkbox\" checked=\"1\" style=\"margin:auto 23px auto 21px;\" title=\"Habillement\" />Habillement<br />\
		<input name=\"pk2_slot_selecter\" type=\"radio\" style=\"margin:auto auto auto 23px;\" onchange=\"javascript:pk2_slot_selector(\'belt\');void(0);\"/>\
		<input id=\"pk2_belt\" type=\"checkbox\" checked=\"1\" style=\"margin:auto 23px auto 21px;\" title=\"Ceinture\" />Ceinture<br />\
		<input name=\"pk2_slot_selecter\" type=\"radio\" style=\"margin:auto auto auto 23px;\" onchange=\"javascript:pk2_slot_selector(\'pants\');void(0);\"/>\
		<input id=\"pk2_pants\" type=\"checkbox\" checked=\"1\" style=\"margin:auto 23px auto 21px;\" title=\"Pantalon\" />Pantalon<br />\
		<input name=\"pk2_slot_selecter\" type=\"radio\" style=\"margin:auto auto auto 23px;\" onchange=\"javascript:pk2_slot_selector(\'right_arm\');void(0);\"/>\
		<input id=\"pk2_right_arm\" type=\"checkbox\" checked=\"1\" style=\"margin:auto 23px auto 21px;\" title=\"Armes de Duel\" />Armes de Duel<br />\
		<input name=\"pk2_slot_selecter\" type=\"radio\" style=\"margin:auto auto auto 23px;\" onchange=\"javascript:pk2_slot_selector(\'left_arm\');void(0);\"/>\
		<input id=\"pk2_left_arm\" type=\"checkbox\" checked=\"1\" style=\"margin:auto 23px auto 21px;\" title=\"Fusil\" />Fusil<br />\
		<input name=\"pk2_slot_selecter\" type=\"radio\" style=\"margin:auto auto auto 23px;\" onchange=\"javascript:pk2_slot_selector(\'foot\');void(0);\"/>\
		<input id=\"pk2_foot\" type=\"checkbox\" checked=\"1\" style=\"margin:auto 23px auto 21px;\" title=\"Chaussures\" />Chaussures<br />\
		<input name=\"pk2_slot_selecter\" type=\"radio\" style=\"margin:auto auto auto 23px;\" onchange=\"javascript:pk2_slot_selector(\'animal\');void(0);\"/>\
		<input id=\"pk2_animal\" type=\"checkbox\" checked=\"1\" style=\"margin:auto 23px auto 21px;\" title=\"Monture\" />Monture<br />\
		<input name=\"pk2_slot_selecter\" type=\"radio\" style=\"margin:auto auto auto 23px;\" onchange=\"javascript:pk2_slot_selector(\'yield\');void(0);\"/>\
		<input id=\"pk2_yield\" type=\"checkbox\" checked=\"1\" style=\"margin:auto 23px auto 21px;\" title=\"Produit\" />Produit<br />\
		</div></div></div>\
	<div' +	aWindow.pk2_vblock +'>\
		<span title=\"Ici, vous pouvez faire un arbitraire du job.<br> Réglage de la complexité du travail et de toutes les compétences nécessaires de 0 à 5<br> (vous pouvez utiliser des nombres fractionnaires de la forme 1,375).<br />\n\
		Utilisation de la restriction sur la fente et les compétences sélectionnées avec un poids de 1<br>\n\
		Ou si la protection est activée et le choix approprié de la conception <br>ces compétences sont considérées comme des militaires et remplacé par un pré-réglage"><input id=\"pk2_navyki\" value=\"pk2_sloty\" type=\"checkbox\" onchange=\"javascript:if (checked) {$(\'pk2_navyki_content\').style.display=\'block\'}else{$(\'pk2_navyki_content\').style.display=\'none\'};void(0)\" style=\"margin:auto 21px auto 27px;\" />\
		Détermination des aptitudes<br /></span>\
		<div id=\"pk2_navyki_content\" style=\"display:none; \">\
	<div' +
		aWindow.pk2_vblock +
		'>\
		<input id=\"pk2_malus\" type=\"text\" value=\"0\" size=\"5\" onchange=\"javascript:value = parseInt(value,10);if((value< -32767)||(value>32767)||isNaN(value))value=0;void(0)\" />&nbsp;«La difficulté»<br />\
	<div style=\"color:red; font-weight:bold;\">\
		<input id=\"pk2_build\" type=\"text\" value=\"0\" size=\"5\" onchange=\"javascript:value = parseFloat(value);if((value<0)||(value>5)||isNaN(value))value=0;void(0)\" />&nbsp;Construire<br />\
		<input id=\"pk2_punch\" type=\"text\" value=\"0\" size=\"5\" onchange=\"javascript:value = parseFloat(value);if((value<0)||(value>5)||isNaN(value))value=0;void(0)\" />&nbsp;Puissance<br />\
		<input id=\"pk2_tough\" type=\"text\" value=\"0\" size=\"5\" onchange=\"javascript:value = parseFloat(value);if((value<0)||(value>5)||isNaN(value))value=0;void(0)\" />&nbsp;Ténacité<br />\
		<input id=\"pk2_endurance\" type=\"text\" value=\"0\" size=\"5\" onchange=\"javascript:value = parseFloat(value);if((value<0)||(value>5)||isNaN(value))value=0;void(0)\" />&nbsp;Persévérance<br />\
		<input id=\"pk2_health\" type=\"text\" value=\"0\" size=\"5\" onchange=\"javascript:value = parseFloat(value);if((value<0)||(value>5)||isNaN(value))value=0;void(0)\" />&nbsp;Points de vie<br />\
	</div><div style=\"color:green; font-weight:bold;\">\
		<input id=\"pk2_ride\" type=\"text\" value=\"0\" size=\"5\" onchange=\"javascript:value = parseFloat(value);if((value<0)||(value>5)||isNaN(value))value=0;void(0)\" />&nbsp;Monter à cheval<br />\n\
		<input id=\"pk2_reflex\" type=\"text\" value=\"0\" size=\"5\" onchange=\"javascript:value = parseFloat(value);if((value<0)||(value>5)||isNaN(value))value=0;void(0)\" />&nbsp;Réflexe<br />\n\
		<input id=\"pk2_dodge\" type=\"text\" value=\"0\" size=\"5\" onchange=\"javascript:value = parseFloat(value);if((value<0)||(value>5)||isNaN(value))value=0;void(0)\" />&nbsp;Éviter<br />\n\
		<input id=\"pk2_hide\" type=\"text\" value=\"0\" size=\"5\" onchange=\"javascript:value = parseFloat(value);if((value<0)||(value>5)||isNaN(value))value=0;void(0)\" />&nbsp;Se cacher<br />\n\
		<input id=\"pk2_swim\" type=\"text\" value=\"0\" size=\"5\" onchange=\"javascript:value = parseFloat(value);if((value<0)||(value>5)||isNaN(value))value=0;void(0)\" />&nbsp;Nager<br />\
	</div><div style=\"color:blue; font-weight:bold;\">\
		<input id=\"pk2_aim\" type=\"text\" value=\"0\" size=\"5\" onchange=\"javascript:value = parseFloat(value);if((value<0)||(value>5)||isNaN(value))value=0;void(0)\" />&nbsp;Viser<br />\n\
		<input id=\"pk2_shot\" type=\"text\" value=\"0\" size=\"5\" onchange=\"javascript:value = parseFloat(value);if((value<0)||(value>5)||isNaN(value))value=0;void(0)\" />&nbsp;Tirer<br />\n\
		<input id=\"pk2_pitfall\" type=\"text\" value=\"0\" size=\"5\" onchange=\"javascript:value = parseFloat(value);if((value<0)||(value>5)||isNaN(value))value=0;void(0)\" />&nbsp;Pièger<br />\n\
		<input id=\"pk2_finger_dexterity\" type=\"text\" value=\"0\" size=\"5\" onchange=\"javascript:value = parseFloat(value);if((value<0)||(value>5)||isNaN(value))value=0;void(0)\" />&nbsp;Dextérité<br />\n\
		<input id=\"pk2_repair\" type=\"text\" value=\"0\" size=\"5\" onchange=\"javascript:value = parseFloat(value);if((value<0)||(value>5)||isNaN(value))value=0;void(0)\" />&nbsp;Réparer<br />\n\
	</div><div style=\"color:#960; font-weight:bold;\">\
		<input id=\"pk2_leadership\" type=\"text\" value=\"0\" size=\"5\" onchange=\"javascript:value = parseFloat(value);if((value<0)||(value>5)||isNaN(value))value=0;void(0)\" />&nbsp;Diriger<br />\n\
		<input id=\"pk2_tactic\" type=\"text\" value=\"0\" size=\"5\" onchange=\"javascript:value = parseFloat(value);if((value<0)||(value>5)||isNaN(value))value=0;void(0)\" />&nbsp;Tactique<br />\n\
		<input id=\"pk2_trade\" type=\"text\" value=\"0\" size=\"5\" onchange=\"javascript:value = parseFloat(value);if((value<0)||(value>5)||isNaN(value))value=0;void(0)\" />&nbsp;Marchander<br />\n\
		<input id=\"pk2_animali\" type=\"text\" value=\"0\" size=\"5\" onchange=\"javascript:value = parseFloat(value);if((value<0)||(value>5)||isNaN(value))value=0;void(0)\" />&nbsp;Manier les animaux<br />\n\
		<input id=\"pk2_appearance\" type=\"text\" value=\"0\" size=\"5\" onchange=\"javascript:value = parseFloat(value);if((value<0)||(value>5)||isNaN(value))value=0;void(0)\" />&nbsp;Prestance<br />\n\
	</div>\
		</div></div></div>\
	</div>\
</form>';
		
		html0 += '</div>';
		html0 += '</td><td class=\"gran_p\" />\n'
		html0 += '</tr><tr>\n';
		html0 += '<td class=\"gran_nl\" />\n';
		html0 += '<td class=\"gran_n\" />\n';
		html0 += '<td class=\"gran_np\" />\n';
		html0 += '</tr></tbody>\n';
		html0 += '</table>\n';
		html0 += '</div>';
		
		pk2_title = document.createElement('div');
		pk2_title.id = 'pk2_title';
		pk2_title.innerHTML = html0;
		
		pk2_title.setAttribute('style', 'position: absolute; left: ' + aWindow.pk2_l0 + 'px; top: ' + aWindow.pk2_t0 + 'px; z-index:202');
		document.body.appendChild(pk2_title);
		}
	pk2_title.style.display = 'block';
		
}



var pk2_body, pk2_script, pk2_style, pk2_head; 
pk2_body = document.getElementsByTagName('body')[0];

pk2_script = document.createElement('script');
pk2_script.type = 'text/javascript';
pk2_script.innerHTML = pk2_code;
pk2_body.appendChild(pk2_script);

pk2_stext=''
pk2_stext+='.tt:hover{\n';
pk2_stext+='position:relative;\n';
pk2_stext+='z-index:23;\n';
pk2_stext+='}\n';
pk2_stext+='.tt span{\n';
pk2_stext+='display:none;\n';
pk2_stext+='}\n';
pk2_stext+='.tt:hover span{\n';
pk2_stext+='display:block;\n';
pk2_stext+='position:absolute;\n';
pk2_stext+='top:10px;\n';
pk2_stext+='left:15px;\n';
pk2_stext+='background:#b6ab92;\n';
pk2_stext+='border:2px solid #000;\n';
pk2_stext+='color:#000;\n';
pk2_stext+='opacity:0.8;\n';
pk2_stext+='z-index:20;\n';
pk2_stext+='padding:5px;\n';
pk2_stext+='font-size:12px;\n';
pk2_stext+='cursor:pointer;\n';
pk2_stext+='text-decoration:none;\n';
pk2_stext+='}\n';
pk2_stext+='.tt2:hover{\n';
pk2_stext+='position:relative;\n';
pk2_stext+='z-index:23;\n';
pk2_stext+='}\n';
pk2_stext+='.tt2 span{\n';
pk2_stext+='display:none;\n';
pk2_stext+='}\n';
pk2_stext+='.tt2:hover span{\n';
pk2_stext+='display:block;\n';
pk2_stext+='position:absolute;\n';
pk2_stext+='top:40px;\n';
pk2_stext+='left:-70px;\n';
pk2_stext+='background:#b6ab92;\n';
pk2_stext+='border:2px solid #000;\n';
pk2_stext+='color:#000;\n';
pk2_stext+='opacity:0.8;\n';
pk2_stext+='z-index:21;\n';
pk2_stext+='padding:5px;\n';
pk2_stext+='font-size:12px;\n';
pk2_stext+='cursor:pointer;\n';
pk2_stext+='text-decoration:none;\n';
pk2_stext+='font-weight:normal;\n';
pk2_stext+='}\n';
pk2_stext+='.tt3:hover{\n';
pk2_stext+='position:relative;\n';
pk2_stext+='z-index:23;\n';
pk2_stext+='}\n';
pk2_stext+='.tt3 span{\n';
pk2_stext+='display:none;\n';
pk2_stext+='}\n';
pk2_stext+='.tt3:hover span{\n';
pk2_stext+='display:block;\n';
pk2_stext+='position:absolute;\n';
pk2_stext+='top:40px;\n';
pk2_stext+='left:-100px;\n';
pk2_stext+='background:#b6ab92;\n';
pk2_stext+='border:2px solid #000;\n';
pk2_stext+='color:#000;\n';
pk2_stext+='opacity:0.8;\n';
pk2_stext+='z-index:21;\n';
pk2_stext+='padding:5px;\n';
pk2_stext+='font-size:12px;\n';
pk2_stext+='cursor:pointer;\n';
pk2_stext+='text-decoration:none;\n';
pk2_stext+='}\n';

pk2_stext +='\
.pk2_sel {\
    background-color: rgb(232, 218, 179);\
    font-size: 13px;\
}\
.pk2_sel optgroup {\
    background-color:#443;\
    color:white;\
}\
.pk2_sel optgroup option {\
    background-color: rgb(232, 218, 179);\
    color:black;\
}\n';

pk2_stext+='\
.jy_bi {\
	width:43px;\
	height:43px;\
	margin:0px;\
	padding:0px;\
	text-align: center;\
	font-size: 11px;\
	font-weight: bold;\
	font-style: normal;\
	background-image:url(../images/inventory/yield.png);\
	background-repeat: no-repeat;\
}';
pk2_stext+='\
.jy_bi img {\
	width:43px;\
	height:43px;\
}';
pk2_stext+='\
.jy_pk2 {\
	margin:0px;\
	padding:0px;\
	text-align: center;\
	font-size: 10px;\
	font-weight: bold;\
	text-align: center;\
	font-style: normal;\
}';

pk2_stext+='\
.gran_vl {\
    background: transparent url(images/border/edge_tl_small.png) no-repeat scroll 0% 0%; height: 6px; padding:0;\
}';
pk2_stext+='\
.gran_v {\
    background: transparent url(images/border/border_t.png) repeat-x scroll 0% 0%; padding:0;\
}';
pk2_stext+='\
.gran_vp {\
    background: transparent url(images/border/edge_tr_small.png) no-repeat scroll 0% 0%; padding:0; width: 6px; height: 6px;\
}';
pk2_stext+='\
.gran_l {\
    background: transparent url(images/border/border_l.png) repeat-y scroll 0% 0%; width: 6px; padding:0;\
}';
pk2_stext+='\
.gran_p {\
    background: transparent url(images/border/border_r.png) repeat-y scroll right center; padding:0; width: 6px;\
}';
pk2_stext+='\
.gran_nl {\
    background: transparent url(images/border/edge_bl.png) no-repeat scroll 0% 0%; height: 6px; width: 6px; padding:0;\
}';
pk2_stext+='\
.gran_n {\
    background: transparent url(images/border/border_b.png) repeat-x scroll 0% 0%; padding:0;\
}';
pk2_stext+='\
.gran_np {\
    background: transparent url(images/border/edge_br.png) no-repeat scroll 0% 0%; padding:0; height: 6px; width: 6px;\
}';



pk2_head = document.getElementsByTagName('head')[0];
pk2_style = document.createElement('style');
pk2_style.type = 'text/css';
if (pk2_style.styleSheet) {
     pk2_style.styleSheet.cssText = pk2_stext;
} else {
    if (pk2_style.innerText == '') {
	pk2_style.innerText = pk2_stext;
    } else {
	pk2_style.innerHTML = pk2_stext;
    }
}
pk2_head.appendChild(pk2_style);


//aWindow.pk2_getValue(aWindow.pk2_pre+'odev_list');
//aWindow.setTimeout(function() {eval(aWindow.pk2_abyrvalg)},500);
aWindow.my_name_is();



aWindow.pk2_odev_spam();


//prosto_veschi_max=7;\
/*    else if (aWindow.winfo!=''){
        aWindow.pk2_show_window();
        aWindow.pk2_error_window(aWindow.winfo);
    }
*/

// === TABLE DES RÉSULTATS ===
aWindow.pk2_reporter2 = function(){
    grgr = '';
    aWindow.pk2_process=false;
    new aWindow.HumanMessage('Généreration de la liste des résultats, merci de patienter...', {type: 'success'});
// Trie du jobs
    grsort = '<table style="position:absolute; top:28px; z-index:10; background-color:#D3C5AD; width:' + (aWindow.pk2_w1 - 52) + 'px; border-bottom:2px solid; height:25px;" cellpadding="0" cellspacing="0"><tbody>'; // (czerwony) bgcolor="#f15959"
		grsort += '<tr>';
		grsort += '<td style=\"vertical-align:middle; padding:5px; text-align:center; \"><strong>Trier par: </strong></td>';
		grsort += '<td style=\"width:2px; background-color:#321; padding: auto 3px;\" />';
		grsort += '<td style=\"vertical-align:middle; padding:5px; text-align:center;\"><a href=\"javascript:pk2_sortir(\'name\', pk2_bezto);\"><img style=\"width:15px; height:15px;\" src=\"http://s3.noelshack.com/uploads/images/20606286555261_imagestask_pointsabc.png\" title=\"Nom\" /></a></td>';
		grsort += '<td style=\"width:2px; background-color:#321; padding: auto 3px;\" />';
		grsort += '<td style=\"vertical-align:middle; padding2; text-align:center;\"><a href=\"javascript:pk2_sortir(\'malus\', pk2_bezto);\"><img src=\"images/task_points/minus.png\" width="20" height="20" title=\"Difficulté\" /></a></td>';
		grsort += '<td style=\"width:2px; background-color:#321; padding: auto 3px;\" />';
		grsort += '<td style=\"vertical-align:middle; padding:2px; text-align:center;\"><a href=\"javascript:pk2_sortir(\'to\', pk2_bezto);\"><img src=\"images/task_points/equal.png\" width="20" height="20" title=\"Points de travail\" /></a></td>';
		grsort += '<td style=\"width:2px; background-color:#321; padding: auto 3px;\" />';
		grsort += '<td style=\"vertical-align:middle; padding:2px; text-align:center;\"><a href=\"javascript:pk2_sortir(\'d0\', pk2_bezto);\"><img src=\"images/job/dollar.png\" width="20" height="20" title=\"Salaire\" /></a></td>';
		grsort += '<td style=\"width:2px; background-color:#321; padding: auto 3px;\" />';
		grsort += '<td style=\"vertical-align:middle; padding:2px; text-align:center;\"><a href=\"javascript:pk2_sortir(\'o0\', pk2_bezto);\"><img src=\"images/job/experience.png\" width="20" height="20" title=\"Expérience\" /></a></td>';
		grsort += '<td style=\"width:2px; background-color:#321; padding: auto 3px;\" />';
        grsort += '<td style=\"vertical-align:middle; padding:2px; text-align:center;\"><a href=\"javascript:pk2_sortir(\'v0\', pk2_bezto);\"><img src=\"images/job/luck.png\" width="20" height="20" title=\"Chance\" /></a></td>';
		grsort += '<td style=\"width:2px; background-color:#321; padding: auto 3px;\" />';
        grsort += '<td style=\"vertical-align:middle; padding:2px; text-align:center;\"><a href=\"javascript:pk2_sortir(\'boom\', pk2_bezto);\"><img src=\"images/job/danger.png\" width="20" height="20" title=\"Danger\" /></a></td>';
		grsort += '<td style=\"width:2px; background-color:#321; padding: auto 3px;\" />';
		grsort += '<td style=\"vertical-align:middle; padding:2px; text-align:center;\"><a title=\"Salaire premium\" href=\"javascript:pk2_sortir(\'dt\', pk2_bezto);\"><img style=\"width:20px; height:20px;\" src=\"images/job/dollar_bonus.png\" /></a></td>';
		grsort += '<td style=\"width:2px; background-color:#321; padding: auto 3px;\" />';
		grsort += '<td style=\"vertical-align:middle; padding:2px; text-align:center;\"><a title=\"Salaire et Expérience\" href=\"javascript:pk2_sortir(\'do\', pk2_bezto);\"><img style=\"width:20px; height:20px;\" src=\"images/job/dollar.png\" /><img style=\"width:20px; height:20px; margin-left:-5px;\" src=\"images/job/experience.png\" /></a></td>';
		grsort += '<td style=\"width:2px; background-color:#321; padding: auto 3px;\" />';
		grsort += '<td style=\"vertical-align:middle; padding:2px; text-align:center;\"><a title=\"Salaire et Chance\" href=\"javascript:pk2_sortir(\'dv\', pk2_bezto);\"><img style=\"width:20px; height:20px;\" src=\"images/job/dollar.png\" /><img style=\"width:20px; height:20px; margin-left:-5px;\" src=\"images/job/luck.png\" /></a></td>';
		grsort += '<td style=\"width:2px; background-color:#321; padding: auto 3px;\" />';
		grsort += '<td style=\"vertical-align:middle; padding:2px; text-align:center;\"><a title=\"Expérience et Chance\" href=\"javascript:pk2_sortir(\'ov\', pk2_bezto);\"><img style=\"width:20px; height:20px;\" src=\"images/job/luck.png\" /><img style=\"width:20px; height:20px; margin-left:-5px;\" src=\"images/job/experience.png\" /></a></td>';
		grsort += '<td style=\"width:2px; background-color:#321; padding: auto 3px;\" />';
		grsort += '<td style=\"vertical-align:middle; padding:2px; text-align:center;\"><a title=\"Salaire, Expérience et Chance\" href=\"javascript:pk2_sortir(\'dov\', pk2_bezto);\"><img style=\"width:20px; height:20px;\" src=\"images/job/dollar.png\" /><img style=\"width:20px; height:20px; margin-left:-5px;\" src=\"images/job/luck.png\" /><img style=\"width:20px; height:20px; margin-left:-5px;\" src=\"images/job/experience.png\" /></a></td>';
		grsort += '<td style=\"width:2px; background-color:#321; padding: auto 3px;\" />';
        grsort += '<td style=\"vertical-align:middle; padding:0px; text-align:center; \"><span title=\"Après avoir entré le numéro, puis cliquez sur l\'une des images pour tirer, les travaux seront ajoutés/retiré pour un nombre donné de PT.<br> Cela signifie que si vous entrez un nombre positif le travail sera crédité avec les Points de Travail.<br> Inversement, si vous entrez un nombre négatif, les travaux retirés seront ceux qui ont le moins que le PT entré.\"><input type=\"text\" size=\"4\" value=\"'+aWindow.pk2_bezto+'\" ';
        grsort += 'onchange=\"javascript:pk2_bezto=parseInt(value, 10);\">«Points de Travail» PT</span></td>';
      grsort += '</tr>';
    grsort += '</tbody></table>';
    grgr += grsort;

    grgr +='<table style=\"width:100%\" cellpadding=\"0\" cellspacing=\"0\"><tbody>';
      // liste des utilité et équipements
      if (aWindow.pk2_khochuka.length > 0){
        grgr += '<tr><td colspan="2">';
        grgr += '<a href=\"javascript:pk2_hideraboty(0);\">Voir le travail</a><br />';
        if (aWindow.pk2_khochuka.length > 1){
            grgr += '<select title=\"Choisissez un item pour voir combien de fois il est utilisé\" class=\"pk2_sel" onchange=\"javascript:pk2_vesch_polezna(value);\">';
            grgr += '<option value=\"0\">Sélectionnez un élément dans la liste</option>'
            for (kh in aWindow.pk2_khochuka){
                grgr += '<option value=\"'+kh+'\">'+aWindow.items[kh].name+'</option>';
            }
            grgr += '</select>';
        }
        for (kh in aWindow.pk2_khochuka){
        if (aWindow.pk2_khochuka[kh]){
            grgr += '<table cellpadding=\"2\" cellspacing=\"2\"><tr><td>';
            grgr+='<div style=\"display:inline; float:left;\">';
            vesch = aWindow.items[kh];
            grgr+='<a class=\"tt2\" href=\"javascript:pk2_hideraboty('+kh+');\" ><span><b>'+vesch.name+':</b>';
            if (vesch.set.key){
                grgr += '<br /><em>'+vesch.set.name+'</em>';
            }
            for (ind in vesch.bonus.attributes){
                grgr += aWindow.pk2_a_print(ind, vesch.bonus.attributes[ind]);
            }
            for (ind in vesch.bonus.skills){
                grgr += aWindow.pk2_s_print(ind, vesch.bonus.skills[ind]);
            }
            grgr += '</span>'
            grgr+='<div class=\"bag_item\" ><img src=\"'+vesch.image_mini+'\" /></div>';
            grgr+='</a>'
            grgr +='</div>';
            rere = ((kh < 400) || (kh >= 500)) ? '</b>» Utilisé ' : '</b>» Certaines ';
            grgr +='Travaux disponibles: ' + aWindow.chislo_rabot_to + ' | «<b>'+vesch.name+rere+ aWindow.khoroshi_to[kh] +' fois.<br>';
            grgr +='Tous les travaux: ' + aWindow.chislo_rabot + ' | «<b>'+vesch.name+rere+ aWindow.khoroshi[kh] +' fois.';
            grgr += '</td></tr></table>';
        }}
        grgr += '<hr>';
        grgr += '</td></tr>';
      }

      for (ii = 0; ii < aWindow.pk2_sortrab.length; ++ii){
          if (!aWindow.pk2_hiderab[aWindow.pk2_sortrab[ii].index]){
              grgr += aWindow.pk2_htmlrab[aWindow.pk2_sortrab[ii].index];
        grgr += '<tr><td colspan="2"><hr></td></tr>';
          }
      }
    grgr += '</tbody></table>';
    // Cadre pour la couleur marron des équipements inutiles #baad95
    if (aWindow.pk2_khlam){
      grgr+='<hr>';
        grgr+='<table bgcolor="#baad95" style="width:100%"><tbody><tr><th colspan="8" style=\"text-align:center;\">Ces éléments ne sont pas nécessaires, pour le(s) job(s) sélectionné(s).<br>Vous pouvez les vendre si vous avez besoin d\'argent. <font color="red"><em>Nous vous conseillons de les gardez.</em></font></th></tr>';
        grgr+='<tr>';
        babosy=0;
        tdcount=0;
        for (tid in aWindow.pk2_nenuzhnoe){
            grgr+='<td>';
            vesch = aWindow.items[tid];
            grgr+='<a class=\"tt2\" href=\"#\" ><span><b>'+vesch.name+'</b>';
            for (ind in vesch.bonus.attributes){
                grgr += aWindow.pk2_a_print(ind, vesch.bonus.attributes[ind]);
            }
            for (ind in vesch.bonus.skills){
                grgr += aWindow.pk2_s_print(ind, vesch.bonus.skills[ind]);
            }
            grgr += '</span>'
            grgr+='<div class=\"bag_item\" style="margin-right:0px; margin-left:0px; margin-top:0px; margin-bottom:0px;"><img src=\"'+vesch.image_mini+'\" /></div>';
            grgr+='</a></td>';
            if (++tdcount==8){
                grgr+='</tr><tr>';
                tdcount=0;
            }
            babosy += vesch.price;
        }
        grgr+='</tr><tr><th colspan=\"8\" style=\"text-align:center;\">';
        grgr +='La valeur de vente est de: '+babosy / 2+' $';
        grgr+='</th></tr></tbody></table>';
    }

    document.getElementById('pk2_window_content').innerHTML=grgr;
    aWindow.pk2_process=false;
}

// Affiche la liste des travaux
aWindow.pk2_res2html = function (){
    count_rab=0;
    aWindow.pk2_htmlrab=[];
    while (count_rab < 255){
        if (!(aWindow.porabotaj[count_rab]&&aWindow.resultaty[count_rab])){
            ++count_rab;
            continue;
        }
        // deuxième ligne après le titre de haut
        ihtm = '';
          rabota = aWindow.raboty[count_rab];
          ihtm+='<tr>';
          ihtm += '<tr><td colspan="3"><strong>'+rabota.rus_name+'</strong></td></tr>'; // nom du job
          ihtm+='</tr><tr>';
          ihtm+='<td>';
            
            ihtm += '<table width="172"><tbody>';
			// nom des travaux et des produits
              ihtm += '<tr><td width="65">';
              if ((count_rab > 150)&&(count_rab <= 170)){
                  // "vs"
                  ihtm += '<a href=\"javascript:pk2_show_shmot('+ count_rab +');\">';
                  ihtm += '<div style=\"width:63px; height:63px; background-image: url(\'/images/menu_buttons/duel.png\'); background-position: 80px 0;\"></div></a>';
              }
              
              else if (count_rab == 141){  // Image pour le Déplacement
                       ihtm += '<a href=\"javascript:pk2_show_shmot('+ count_rab +');\">';
                       ihtm += '<img src=\"images/fingerboard/fingerboard.png\" width="63" height="63"';
                       ihtm += ' alt=\"'+rabota.rus_name+'\" title=\"'+rabota.rus_name+'\" /></a>';
                   }
                else{
                       ihtm += '<a href=\"javascript:pk2_show_shmot('+ count_rab +');\">';
                       ihtm += '<img src=\"';
                       if (count_rab<=131){ // Images pour tous les Travaux et par defaut
                           ihtm += 'images/jobs/';
                       }
                    else if (count_rab>200){ // Images pour les Batailles de forts
                           ihtm += 'images/fort/battle/button_';
                       }
                       ihtm +=rabota.name+'.png\" width="63" height="63" alt=\"'+rabota.rus_name+'\" title=\"'+rabota.rus_name+'\" /></a>';
                   };
              ihtm += '</td>';
              // Produits
              ihtm += '<td>';
              rres = rabota.resultaty;
              for (ri in rres.produkty){
                ihtm+='<div style=\"display:inline; float:left; margin: 1px 1px;\"><div class=\"jy_bi\"><img style=\"-moz-user-select: none;\" ';
                ihtm+='title=\"'+aWindow.items[ri].name+'\" alt=\"'+aWindow.items[ri].name+'\" ';
                ihtm+='src=\"'+aWindow.items[ri].image_mini+'\" /></div><div class=\"jy_pk2\">'+rres.produkty[ri]+'%</div>';
                ihtm+='</div>';
              }
              ihtm += '</td></tr>';
            ihtm += '</tbody></table>'; // titre des produits de travail
          ihtm += '<td>';
            ihtm += '<table><tbody>';
              ihtm += '<tr>';
                ihtm += '<td width="220">';
                  // Tous les travaux, la régénération, la construction, et les duel (à l'exception des BDF, et le mouvement)
                  if ((count_rab<=131)||(count_rab>141)){
                    ihtm += '<span title=\"Somme totale des aptitudes sans les bonus\" class="calculation_visualisation img_plus" style=\"margin-left:0px;\">';
                    ihtm += '<span class="skill_box_value" style="text-align:center;">';
                    ihtm += (aWindow.resultaty[count_rab].to+aWindow.raboty[count_rab].malus-aWindow.resultaty[count_rab].ton)+'</span></span>';
                    ihtm += '<span title=\"Bonus\" class="calculation_visualisation img_plus" style=\"margin-left:0px;\">';
                    ihtm += '<span class="skill_box_value green_text" style="text-align:center;">'+aWindow.resultaty[count_rab].ton+'</span></span>';
                    ihtm += '<span title=\"Difficulté\" class="calculation_visualisation img_minus"  style=\"margin-left:0px;\">';
                    ihtm += '<span class="skill_box_value" style="text-align:center;">'+aWindow.raboty[count_rab].malus+'</span></span>';
                    ihtm += '<span title=\"Points de travail\" class="calculation_visualisation img_equal" style="margin-right:0px; margin-left:0px;">';
                    ihtm += '<span class="skill_box_value" style="text-align:center; color:';
                    ihtm += (aWindow.resultaty[count_rab].to > 0) ? 'rgb(0,255,0)' : 'rgb(255,0,0)';
                    ihtm += '">'+aWindow.resultaty[count_rab].to+'</span></span>';
                  }
                  // bataille de Fort
                  else if (count_rab!=141){
                         ihtm += '<span title=\"Bonus de tir class="calculation_visualisation img_plus" style=\"margin-left:0px;\">';
                         ihtm += '<span class="skill_box_value red_text" style="text-align:center;">';
                         var vvv = aWindow.resultaty[count_rab].to-aWindow.resultaty[count_rab].ton;
                         vvv = Math.round(vvv*10)/10;
                         ihtm += vvv+'</span></span>';
                         ihtm += '<span title=\"Bonus d\'esquive\" class="calculation_visualisation img_plus" style=\"margin-left:0px;\">';
                         ihtm += '<span class="skill_box_value green_text" style="text-align:center;">'+aWindow.resultaty[count_rab].ton+'</span></span>';
                         ihtm += '<span title=\"Somme des bonus\" class="calculation_visualisation img_equal" style="margin-right:0px; margin-left:0px;">';
                         ihtm += '<span class="skill_box_value" style="text-align:center; color:rgb(255,255,255)';
                         ihtm += '">'+aWindow.resultaty[count_rab].to+'</span></span>';
                       }
                       // Vitesse
                       else{
                         //ihtm += '<span title=\"Bonus de vitesse\" class="calculation_visualisation img_plus" style=\"margin-left:0px;\">';
                         //ihtm += '<span class="skill_box_value green_text" style="text-align:center;">х'+aWindow.resultaty[count_rab].ton+'</span></span>';
                         ihtm += '<span title=\"Vitesse\" class="calculation_visualisation img_equal" style="margin-right:10px; margin-left:0px;">';
                         ihtm += '<span class="skill_box_value" style="text-align:center; ">'+Math.round(aWindow.resultaty[count_rab].to)+'%</span></span>';
                       }
                ihtm += '</td>';
                ihtm += '<td>'; // attributs et aptitudes
                  brbr = 0;
                  for (jj in aWindow.rabnavyki[count_rab]){
                    for (aa = aWindow.rabnavyki[count_rab][jj].mul; aa > 0; --aa){
                      //if (++brbr==8) {ihtm+='</tr><tr>'; brbr=1};
                      ihtm += '<a class=\"tt3\" href=\"#\" ><span>'+aWindow.pers.skill_titles[jj]+':'+aWindow.rabnavyki[count_rab][jj].znach+'</span>';
                      ihtm += '<div class=\"skill_box\" style=\"padding: 35px 28px 6px 2px; margin-right: 0px; margin-top: 0px; background: transparent url(/images/skill/skills_'+aWindow.pk2_s2a[jj];
                      ihtm += '.png) repeat scroll '+aWindow.pk2_s2px[jj]+'px 0px; color: rgb(255, 255, 255); ';
                      ihtm += 'width: 25px; height: 14px; -moz-background-clip: border; -moz-background-origin: padding; ';
                      ihtm += '-moz-background-inline-policy: continuous; float: left; font-weight: bold; text-align:center;" >';
                      ihtm += aWindow.rabnavyki[count_rab][jj].znach+'</div>';
                      ihtm += '</a>';
                    }
                  }
                ihtm += '</td>';
              ihtm += '</tr>';
            ihtm += '</tbody></table>';
          ihtm += '</td>';

              ihtm += '<tr>';
              ihtm += '<td colspan="2">';
                ihtm += '<table><tbody>'; 
                  barWidth = 75; // Largeur de la barre
                ihtm += '<tr>';
                      ihtm += '<td>'; // Bouton des menus
                        ihtm += '<div style=\"display:inline; float:left;\"><table>';
                        ihtm += '<td><a href="javascript:pk2_auto_odev(\'n\','+count_rab+');void(0);" title="Mettre cet équipement" >';
                        ihtm += '<img src="images/tutorial/icons/inventory_active.png" style="width :37px; height: 37px;" >';
                        // ihtm += '<img src="images/transparent.png" style="width :23px; height : 23px; background:url(../img.php?type=menu&dummy) -104px -51px" >';
                        ihtm += '</a></td>';
// Fonctionnalité d'enregistrement des tenue retirée sur demande de Naolia, Community Manager The West France.
                        // ihtm += '<td><a href="javascript:pk2_odev_add(\'n\','+count_rab+');void(0);" title="Ajouter à la liste" >';
                        // ihtm += '<img src="images/transparent.png" style="width :23px; height : 23px; background:url(../img.php?type=menu&dummy) -104px -126px" >';
                        // ihtm += '</a></td>';
                        // ihtm += '<td><a href="javascript:pk2_odev_remove(\'n\','+count_rab+');void(0);" title="Retirer de la liste" >';
                        // ihtm += '<img src="images/transparent.png" style="width :23px; height : 23px; background:url(../img.php?type=menu&dummy) -129px -101px" >';
                        // ihtm += '</a></td>';						
                        ihtm += '</table></div>';
                      ihtm += '</td>';
                  ihtm += '<td>';
                    ihtm += ' <a class=\"tt\" href=\"#\" style=\"color:black;\"><table><tr><td><img style=\"width:17px; height:17px;\" src=\"images/job/dollar.png\" /></td>';
                    ihtm += '<td><div class="bar" style="width:' + eval(barWidth+1) + 'px; border-right:1px solid black;"><div class="bar_fill" style="width: '+Math.round(rres.dengi*(barWidth/100))+'px;"></div><div class="bar_perc" style="width:'+barWidth+'px">'+rres.dengi+'%</div></div>';
                    ihtm += '<span>Salaire:'+rres.dengi+'</span></td></tr></table></a>';
                  ihtm += '</td>';
                  // Salaire
                  var pk2_Do = 0;
                  if ((count_rab<=124)&&(aWindow.resultaty[count_rab].to > 0)){
                    pk2_Do = (180*rres.dengi/100+10)*Math.pow(aWindow.resultaty[count_rab].to,0.2);
                    pk2_Do = Math.round(pk2_Do);
                  }
                  ihtm += '<td width="45">';
                    ihtm += '<b>'+pk2_Do + ' $</b>';
                  ihtm += '</td>';

                  ihtm += '<td>';
                    ihtm += ' <a class=\"tt\" href=\"#\" style=\"color:black;\"><table><tr><td><img style=\"width:17px; height:17px;\" src=\"images/job/experience.png\" /></td>';
                    ihtm += '<td><div class="bar" style="width:' + eval(barWidth+1) + 'px; border-right:1px solid black;"><div class="bar_fill" style="width: '+Math.round(rres.opyt*(barWidth/100))+'px;"></div><div class="bar_perc" style="width:'+barWidth+'px">'+rres.opyt+'%</div></div>';
                    ihtm += '<span>Expérience:'+rres.opyt+'</span></td></tr></table></a>';
                  ihtm += '</td>';
                  // Expérience
                  var pk2_XP = rres.opyt*120/60;
                  pk2_XP = Math.round(pk2_XP);
                  ihtm += '<td width="45">';
                    ihtm += '<b>'+pk2_XP + ' XP</b>';
                  ihtm += '</td>';

                  ihtm += '<td>';
                    ihtm += ' <a class=\"tt\" href=\"#\" style=\"color:black;\"><table><tr><td><img style=\"width:17px; height:17px;\" src=\"images/job/luck.png\" /></td>';
                    ihtm += '<td><div class="bar" style="width:' + eval(barWidth+1) + 'px; border-right:1px solid black;"><div class="bar_fill" style="width: '+Math.round(rres.vezenie*(barWidth/100))+'px;"></div><div class="bar_perc" style="width:'+barWidth+'px">'+rres.vezenie+'%</div></div>';
                    ihtm += '<span>Chance:'+rres.vezenie+'</span></td></tr></table></a>';
                  ihtm += '</td>';
                  // Chance
                  var pk2_Ud = 0;
                  if ((count_rab<=124)&&(aWindow.resultaty[count_rab].to > 0)){
                    pk2_Ud = (1350*rres.vezenie/100+75)*Math.pow(aWindow.resultaty[count_rab].to,0.2);
                    //pk2_Ud = Math.floor(pk2_Ud);
                  }
                  ihtm += '<td width="100">';
                    ihtm += '<b>'+Math.floor(pk2_Ud/3) + '-' + Math.floor(pk2_Ud) + ' ($)</b>';
                  ihtm += '</td>';

                  ihtm += '<td>';
                    ihtm += ' <a class=\"tt\" href=\"#\" style=\"color:black;\"><table><tr><td><img style=\"width:17px; height:17px;\" src=\"images/job/danger.png\" /></td>';
                    ihtm += '<td><div class="bar" style="width:' + eval(barWidth+1) + 'px; border-right:1px solid black;"><div class="bar_brown" style="width: '+Math.round(rres.boom*(barWidth/100))+'px;"></div><div class="bar_perc" style="width:'+barWidth+'px">'+rres.boom+'%</div></div>';
                    ihtm += '<span>Danger:'+rres.boom+'</span></td></tr></table></a>';
                  ihtm += '</td>';
                  // Danger
                  ihtm += '<td width="45">';
                    ihtm += '  ';
                  ihtm += '</td>';

                ihtm += '</tr>';
                ihtm += '</tbody></table>'; // couleur bleu
              ihtm += '</td>';
              ihtm += '</tr>';

              ihtm += '<tr>'; 
                ihtm += '<td colspan="2">';
                  ihtm += '<table><tbody>'; // bouton vert clair
				  ihtm += '<tr>';
                      ihtm += '<td>';
					  sumprice = 0;
                        for (ee = 0; ee < aWindow.pk2_types.length; ++ee){
                          sid = aWindow.resultaty[count_rab].items[ee].tid;
                          if (sid){
                            // подсказка вещи
                            ihtm+='<div style=\"display:inline; float:left;\">';
                            vesch = aWindow.items[sid];
                            ihtm+='<a class=\"tt2\" href=\"#\" ><span><b>'+vesch.name+':</b>&nbsp;'+aWindow.resultaty[count_rab].items[ee].bon;
                            if (vesch.set.key){
                              ihtm += '<br /><em>'+vesch.set.name+'</em>';
                            }
                            for (ind in vesch.bonus.attributes){
                              ihtm += aWindow.pk2_a_print(ind, vesch.bonus.attributes[ind]);
                            }
                            for (ind in vesch.bonus.skills){
                              ihtm += aWindow.pk2_s_print(ind, vesch.bonus.skills[ind]);
                            }
                            if (aWindow.resultaty[count_rab].items[ee].price > 0){
                              ihtm += aWindow.resultaty[count_rab].items[ee].price+'&nbsp;$';
                            }
                            ihtm += '</span>'
                            // вещь
                            if (aWindow.resultaty[count_rab].items[ee].price > 0){
							  
                              ihtm+='<div class=\"bag_item\" ><img src=\"'+vesch.image_mini+'\" />';
                              ihtm+='<div class="bag_item_count"><p style="text-align:center; color:red;">'+aWindow.resultaty[count_rab].items[ee].bon+'</p></div><p style="text-align: center; border: 1px solid black; background-color: gray; margin: 0pt 5px; color: blue;">'+aWindow.resultaty[count_rab].items[ee].price+'&nbsp;$</p></div>'
							  price = aWindow.resultaty[count_rab].items[ee].price;
							  sumprice = sumprice + price;
                              ihtm+='</a>'
                            }
                            else {
                              ihtm+='<div class=\"bag_item\" ><img src=\"'+vesch.image_mini+'\" />';
                              ihtm+='<div class="bag_item_count"><p style="text-align:center;">'+aWindow.resultaty[count_rab].items[ee].bon+'</p></div></div>'
                              ihtm+='</a>'
                            }
                            // prix des objets
                            //if (aWindow.resultaty[count_rab].items[ee].price > 0){
                            //    ihtm+='<br />';
                            //    ihtm +='<span style=\"text-align:center; color:red\">'+aWindow.resultaty[count_rab].items[ee].price+'&nbsp;$</span>';
                            //}
                            ihtm +='</div>';
                            //ihtm +='';
                          }
                        }
					  if (sumprice>0){
					    ihtm += '<div style="font-weight: bold; font-size: large; float: right;">'+sumprice+'&nbsp;$</div>';
						}
					  ihtm += '</td>';
                    ihtm += '</tr>';
                  ihtm += '</tbody></table>'; // boutons de fin (vert clair)
                ihtm += '</td>';
              ihtm += '</tr>';
			  
          ihtm+='</td></tr>'; 

/*

        if (aWindow.resultaty_z[count_rab]){
            ihtm+= '<tr><td>';
            ihtm += '<span title=\"+bonus\" class="calculation_visualisation img_plus">';
	    	ihtm += '<span class="skill_box_value" style="text-align:center;">';
		    ihtm += aWindow.resultaty_z[count_rab].zas+'</span></span>';
    		ihtm += '<span title=\"PT\" class="calculation_visualisation img_equal" style="margin-right:10px;">';
	    	ihtm += '<span class="skill_box_value" style="text-align:center; color:';
		    ihtm += (aWindow.resultaty_z[count_rab].to > 0) ? 'rgb(0,255,0)' : 'rgb(255,0,0)';
    		ihtm += '">'+aWindow.resultaty_z[count_rab].to+'</span></span>';
            ihtm += '</td><td>';
            brbr=0;
            ihtm += '<table><tbody><tr>';
            for (jj in aWindow.rabnavyki_z[count_rab]){
                for (aa = aWindow.rabnavyki_z[count_rab][jj].mul; aa > 0; --aa){
                    if (++brbr==8) {ihtm+='</tr><tr>'; brbr=1};
                    ihtm += '<td>';
                    ihtm += '<a class=\"tt3\" href=\"#\" ><span>'+aWindow.pers.skill_titles[jj]+':'+aWindow.rabnavyki_z[count_rab][jj].znach+'</span>';
                    ihtm += '<div class=\"skill_box\" style=\"padding: 35px 28px 6px 2px; margin-right: -2px; margin-top: -4px; background: transparent url(/images/skill/skills_'+aWindow.pk2_s2a[jj];
                    ihtm += '.png) repeat scroll '+aWindow.pk2_s2px[jj]+'px 0px; color: rgb(255, 255, 255); ';
                    ihtm += 'width: 25px; height: 14px; -moz-background-clip: border; -moz-background-origin: padding; ';
                    ihtm += '-moz-background-inline-policy: continuous; float: left; font-weight: bold; text-align:center;" >';
                    ihtm += aWindow.rabnavyki_z[count_rab][jj].znach+'</div>';
                    ihtm += '</a></td>';
                }
            }
            ihtm += '</tr></tbody></table>';
            ihtm += '</td></tr><tr><td colspan=\"2\">';

		ihtm += '<div style=\"display:inline; float:left;\"><table>';
		ihtm += '<tr><td><a href="javascript:pk2_auto_odev(\'z\','+count_rab+');void(0);" title="Mettre cet équipement" >';
		ihtm += '<img src="images/transparent.png" style="width :21px; height : 21px; background:url(../img.php?type=menu&dummy) -105px -52px" >';
		ihtm += '</a></td></tr>';
		ihtm += '<tr><td><a href="javascript:pk2_odev_add(\'z\','+count_rab+');void(0);" title="Ajouter à la liste" >';
		ihtm += '<img src="images/transparent.png" style="width :21px; height : 21px; background:url(../img.php?type=menu&dummy) -105px -127px" >';
		ihtm += '</a></td></tr>';
		ihtm += '<tr><td><a href="javascript:pk2_odev_remove(\'z\','+count_rab+');void(0);" title="Retirer de la liste" >';
		ihtm += '<img src="images/transparent.png" style="width :21px; height : 21px; background:url(../img.php?type=menu&dummy) -130px -102px" >';
		ihtm += '</a></td></tr>';
		ihtm += '</table></div>';

            for (ee = 0; ee < aWindow.pk2_types.length; ++ee){
                sid = aWindow.resultaty_z[count_rab].items[ee].tid;
                if (sid){
                    ihtm+='<div style=\"display:inline; float:left;\">';
			vesch = aWindow.items[sid];
                    ihtm+='<a class=\"tt2\" href=\"#\" ><span><b>'+vesch.name+':</b>&nbsp;'+aWindow.resultaty_z[count_rab].items[ee].bon;
                    if (vesch.set.key){
                        ihtm += '<br /><em>'+vesch.set.name+'</em>';
                    }
                    for (ind in vesch.bonus.attributes){
                        ihtm += aWindow.pk2_a_print(ind, vesch.bonus.attributes[ind]);
                    }
                    for (ind in vesch.bonus.skills){
                        ihtm += aWindow.pk2_s_print(ind, vesch.bonus.skills[ind]);
                    }
                    ihtm += '</span>';
                    ihtm+='<div class=\"bag_item\" ><img src=\"'+vesch.image_mini+'\" />';
                    ihtm+='<div class="bag_item_count"><p style="text-align:center;">'+aWindow.resultaty_z[count_rab].items[ee].bon+'</p></div></div>';
                    ihtm+='</a>';
                    if (aWindow.resultaty_z[count_rab].items[ee].price > 0){
                        ihtm+='<br />';
                        ihtm +='<span style=\"text-align:center;\">'+aWindow.resultaty_z[count_rab].items[ee].price+'&nbsp;$</span>';
                    }
                    ihtm +='</div>';
                }
            }
            ihtm += '</td></tr>';
        }
        else{
            ihtm+='<tr><td colspan=\"2\" /></tr><tr><td colspan=\"2\" /></tr>';
        }
        
        if (aWindow.resultaty_r[count_rab]){
            ihtm+= '<tr><td>';
            ihtm += '<span title=\"+bonus\" class="calculation_visualisation img_plus">';
	    	ihtm += '<span class="skill_box_value" style="text-align:center;">';
		    ihtm += aWindow.resultaty_r[count_rab].speed+'%</span></span>';
    		ihtm += '<span title=\"PT\" class="calculation_visualisation img_equal" style="margin-right:10px;">';
	    	ihtm += '<span class="skill_box_value" style="text-align:center; color:';
		    ihtm += (aWindow.resultaty_r[count_rab].to > 0) ? 'rgb(0,255,0)' : 'rgb(255,0,0)';
    		ihtm += '">'+aWindow.resultaty_r[count_rab].to+'</span></span>';
            ihtm += '</td><td>';
            brbr=0;
            ihtm += '<table><tbody><tr>';
            for (jj in aWindow.rabnavyki_r[count_rab]){
                for (aa = aWindow.rabnavyki_r[count_rab][jj].mul; aa > 0; --aa){
                    if (++brbr==8) {ihtm+='</tr><tr>'; brbr=1};
                    ihtm += '<td>';
                    ihtm += '<a class=\"tt3\" href=\"#\" ><span>'+aWindow.pers.skill_titles[jj]+':'+aWindow.rabnavyki_r[count_rab][jj].znach+'</span>';
                    ihtm += '<div class=\"skill_box\" style=\"padding: 35px 28px 6px 2px; margin-right: -2px; margin-top: -4px; background: transparent url(/images/skill/skills_'+aWindow.pk2_s2a[jj];
                    ihtm += '.png) repeat scroll '+aWindow.pk2_s2px[jj]+'px 0px; color: rgb(255, 255, 255); ';
                    ihtm += 'width: 25px; height: 14px; -moz-background-clip: border; -moz-background-origin: padding; ';
                    ihtm += '-moz-background-inline-policy: continuous; float: left; font-weight: bold; text-align:center;" >';
                    ihtm += aWindow.rabnavyki_r[count_rab][jj].znach+'</div>';
                    ihtm += '</a></td>';
                }
            }
            ihtm += '</tr></tbody></table>';
            ihtm += '</td></tr>';

     // Cliquez ici, s'il ont déjà été déplacé! "
                      ihtm += '<td width="25">';
                        ihtm += '<div style=\"display:inline; float:left;\"><table>';
                        ihtm += '<tr><td><a href="javascript:pk2_auto_odev(\'r\','+count_rab+');void(0);" title="Mettre cet équipement" >';
                        ihtm += '<img src="images/transparent.png" style="width :25px; height : 25px; background:url(../img.php?type=menu&dummy) -103px -50px" >';
                        ihtm += '</a></td></tr>';
                        ihtm += '<tr><td><a href="javascript:pk2_odev_add(\'r\','+count_rab+');void(0);" title="Ajouter à la liste" >';
                        ihtm += '<img src="images/transparent.png" style="width :25px; height : 25px; background:url(../img.php?type=menu&dummy) -103px -125px" >';
                        ihtm += '</a></td></tr>';
                        ihtm += '<tr><td><a href="javascript:pk2_odev_remove(\'r\','+count_rab+');void(0);" title="Retirer de la liste" >';
                        ihtm += '<img src="images/transparent.png" style="width :25px; height : 25px; background:url(../img.php?type=menu&dummy) -128px -100px" >';
                        ihtm += '</a></td></tr>';
                        ihtm += '</table></div>';
                      ihtm += '</td>'; 
	 
            for (ee = 0; ee < aWindow.pk2_types.length; ++ee){
                sid = aWindow.resultaty_r[count_rab].items[ee].tid;
                if (sid){
                    ihtm+='<div style=\"display:inline; float:left;\">';
			vesch = aWindow.items[sid];
                    ihtm+='<a class=\"tt2\" href=\"#\" ><span><b>'+vesch.name+':</b>&nbsp;'+aWindow.resultaty_r[count_rab].items[ee].bon;
                    if (vesch.set.key){
                        ihtm += '<br /><em>'+vesch.set.name+'</em>';
                    }
                    for (ind in vesch.bonus.attributes){
                        ihtm += aWindow.pk2_a_print(ind, vesch.bonus.attributes[ind]);
                    }
                    for (ind in vesch.bonus.skills){
                        ihtm += aWindow.pk2_s_print(ind, vesch.bonus.skills[ind]);
                    }
                    ihtm += '</span>';
                    ihtm+='<div class=\"bag_item\" ><img src=\"'+vesch.image_mini+'\" />';
                    ihtm+='<div class="bag_item_count"><p style="text-align:center;">'+aWindow.resultaty_r[count_rab].items[ee].bon+'</p></div></div>';
                    ihtm+='</a>';
                    if (aWindow.resultaty_r[count_rab].items[ee].price > 0){
                        ihtm+='<br />';
                        ihtm +='<span style=\"text-align:center;\">'+aWindow.resultaty_r[count_rab].items[ee].price+'&nbsp;$</span>';
                    }
                    ihtm +='</div>';
                }
            }
            ihtm += '</td></tr>';
        }
        else{
            ihtm+='<tr><td colspan=\"2\" /></tr><tr><td colspan=\"2\" /></tr>';
        }
*/        

        aWindow.pk2_htmlrab[count_rab]=ihtm;
        ++count_rab;
    }
}

// Fermer la "Fenêtre Paramètres"
aWindow.pk2_minimize_title = function(){
	if (aWindow.pk2_title_flag2 == 1) {
    	aWindow.pk2_title_flag2 = 0;
		document.getElementById('pk2_title_content_row').style.display = 'none';
		document.getElementById('pk2_title_cap').style.display = 'none';
		document.getElementById('pk2_form0').style.width = '200px';
	}
	else {
		aWindow.pk2_title_flag2 = 1;
		document.getElementById('pk2_title_content_row').style.display = 'table-row';
		document.getElementById('pk2_title_cap').style.display = 'inline';
		document.getElementById('pk2_form0').style.width = aWindow.pk2_w0+'px';
	}
}

// Fermer la "Fenêtre Paramètres"
aWindow.pk2_close_title = function(){
	document.getElementById('pk2_title').style.display='none';
}

aWindow.pk2_stretch_title = function(){
    var nv;
    if (aWindow.pk2_title_flag == 1) {
        aWindow.pk2_title_flag = 0;
        nv = aWindow.pk2_title_h_mid + 'px';
    }
    else {
        aWindow.pk2_title_flag = 1
        nv = aWindow.pk2_title_h_max + 'px';
    }
    document.getElementById('pk2_title_content').style.height = nv;
}

aWindow.pk2_close_shmot = function(){
    rm = document.getElementById('pk2_shmot');
    document.body.removeChild(rm);
}

aWindow.pk2_vselect = function (chk){
	if (chk) {
		document.getElementById('pk2_vselect').innerHTML=aWindow.pk2_mulselect+aWindow.pk2_conselect;
		/*document.getElementById('pk2_sk_rabot').innerHTML='Plusieurs documents';*/
	}
	else{
		document.getElementById('pk2_vselect').innerHTML=aWindow.pk2_simselect+aWindow.pk2_conselect;
		/*document.getElementById('pk2_sk_rabot').innerHTML='un travaux';*/
	}
}

// Fenêtre de données
aWindow.pk2_minimize_window = function(){
	if (aWindow.pk2_window_flag2 == 1) {
		aWindow.pk2_window_flag2 = 0;
		document.getElementById('pk2_window_content_row').style.display = 'none';
		document.getElementById('pk2_window_cap').style.display = 'none'
		document.getElementById('pk2_win1').style.width = '100px';
	}
	else {
		aWindow.pk2_window_flag2 = 1;
		document.getElementById('pk2_win1').style.width = aWindow.pk2_w1+'px';
		document.getElementById('pk2_window_content_row').style.display = 'table-row';
		document.getElementById('pk2_window_cap').style.display = 'inline';
	}
}

// Fenêtre de données
aWindow.pk2_close_window = function(){
	document.getElementById('pk2_window').style.display='none';
}

// Sous réserve de lags dans le script
aWindow.pk2_error_window = function(err){
	document.getElementById('pk2_window_content').style.height = parseInt((aWindow.pk2_window_h_max*3)/4, 10) + 'px';
	pk2_err = document.getElementById('pk2_window_error');
	pk2_err.style.height = parseInt((aWindow.pk2_window_h_max*2)/4, 10) + 'px';
	pk2_err.style.display='block';
	htm = '<hr><div style=\"font-weight:bold; color:black; text-align:center;\" >Ces données doivent être envoyées à '+przy_link+'<br />'; 
	htm += '<textarea style=\"margin: 5px;\" readonly=\"readonly\" cols=\"90\" rows=\"7\">';
	htm += err;
	htm += '</textarea></div>';
	pk2_err.innerHTML = htm;
}

// Fenêtre de données
aWindow.pk2_show_window = function(){
    pk2_window = document.getElementById('pk2_window');
    html1='';
    if (!pk2_window){
	html1 += '<div id=\"pk2_win1\" style=\"width:' + aWindow.pk2_w1 + 'px; text-align:left;\">\n';
	html1 += '<table class=\"shadow_table\" align=\"left\"><tbody>\n';
	html1 += '<tr>';
	html1 += '<td class=\"gran_vl\" />\n';
	html1 += '<td class=\"gran_v\" />\n';
	html1 += '<td class=\"gran_vp\" />\n';
	html1 += '</tr><tr>\n';
	html1 += '<td class=\"gran_l\" />\n';
	html1 += '<td style=\"background-color:#302010; text-align:center; font-weight:bold; color:white;\">';
	html1 += '<span>';
	html1 += '<a href=\"javascript:pk2_minimize_window();\"' + aWindow.pk2_tlink + ' title=\"Réduire/Restaurer la fenêtre\">&nbsp;<b>-</b>&nbsp;</a>&nbsp;';
	html1 += '&nbsp;&nbsp;&nbsp;&nbsp;';
	html1 += '<a href=\"javascript:pk2_close_window();\"' + aWindow.pk2_tlink + ' title=\"Fermer\">&nbsp;<b>x</b>&nbsp;</a>&nbsp;';
	html1 += '</span>';
		html1 += '<span id=\"pk2_window_cap\">Résultats de la recherche</span>';
		html1 += '</td><td class=\"gran_p\" />\n'
		html1 += '</tr><tr id=\"pk2_window_content_row\">\n';
		html1 += '<td class=\"gran_l\" />\n';
		html1 += '<td id=\"pk2_window_content0\" class=\"shadow_content\" style=\"width:' + (aWindow.pk2_w1 - 12) + 'px;\" >';
		html1 += '<div id=\"pk2_window_content\" style=\"overflow: auto; height: ' + aWindow.pk2_window_h_max + 'px; width' + (aWindow.pk2_w1 - 40) + 'px; margin-top:27px; margin-left:20px; margin-right:20px;\">';
		html1 += '</div><div id=\"pk2_window_error\" style=\"border: 2px; overflow: auto; display: none; \">';
		html1 += '</div></td><td class=\"gran_p\" />\n';
		html1 += '</tr><tr>\n';
		html1 += '<td class=\"gran_l\" />\n';
		html1 += '<td class=\"gran_p\" />\n';
		html1 += '</tr><tr>\n';
		html1 += '<td class=\"gran_nl\" />\n';
		html1 += '<td class=\"gran_n\" />\n';
		html1 += '<td class=\"gran_np\" />\n';
		html1 += '</tr></tbody>\n';
		html1 += '</table>\n';
		html1 += '</div>';
		pk2_window = document.createElement('div');
		pk2_window.id = 'pk2_window';
		pk2_window.innerHTML = html1;
		pk2_window.setAttribute('style', 'position: absolute; left: ' + aWindow.pk2_l1 + 'px; top: ' + aWindow.pk2_t1 + 'px; z-index:250');
		document.body.appendChild(pk2_window);
	}
	pk2_window.style.display = 'block';
	if (aWindow.pk2_window_flag2 == 0){
	    aWindow.pk2_minimize_window();
	}
}
}
