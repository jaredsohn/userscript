/* OGAME TRANSFERT

Creation (MM/JJ/AAAA): 12/10/2007
Gillou
http://www.vbc3.com/script/ogametransfert.user.js

Supported GreaseMonkey version : 0,8.200901209.4
Tested on FF3

Script under Creative Commons licence (http://creativecommons.org/licenses/by-nc-nd/2.0/fr/deed.en)

Supported Ogame domain :
- fr
- org : Thanks to Dhu for corrections
- it : Thanks to Fiox for the translation
- de : Thanks to Dhu for the translation
- com.es : Thanks to ETintos for the translation
- nl : Thanks to Frutelaken for the translation
- com.pt : Thanks to Spac3h for the translation
- dk : Thanks to Im Me for the translation
- sk: Thanks to Viktorc for the translation
*/




// ==UserScript==
// @name           OGame Transfert
// @version        V0.8 beta 019
// @date           2009-12-10
// @namespace      http://www.vbc3.com/script/ogametransfert.user.js
// @description    Management of tranfers, Empire view, Global resources view
// @include        http://uni*.ogame.*
// ==/UserScript==





/* PARAMETRES DE MISE A JOUR (A NE PAS MODIFIER!!!)
 -------------------------------------------------- */

var C_ScriptName = 'OgameTransfert';                                    // Nom du script
var C_ScriptVersion = '0.8 beta';                                       // Version du script pour les mises a jour majeures
var C_ScriptBuild = '019';                                              // Sous-version du script pour les mises a jour mineures
var C_ScriptDate = '12/10/2009';                                        // Date de la publication (MM/JJ/AAAA)





/* PLAN DU SCRIPT
   -------------------------------------------------

- PARAMETRES DE MISE A JOUR
- TODO (Elements a implementer)
- DESCRIPTION DES MISES A JOUR
- LISTE DES VARIABLES MEMORISEES VIA GREASEMONKEY

- COMPTEUR DU TEMPS EXECUTION DU SCRIPT
- DECLARATIONS GLOBALES
- TEXTE DES LANGUES
- RECUPERATION DES DONNEES PRINCIPALES D'OGAME

- CHARGEMENT DES IDENTIFIANTS ET COUTS DE CONSTRUCTION ET DES NOMS DES CONSTRUCTIONS
- CHARGEMENT DES INFORMATIONS MEMORISEES VIA GREASEMONKEY

- GESTION DES LIENS DU MENU

- FONCTIONS GENERALES
- FONCTIONS ET DECLARATIONS GENERALES DU SCRIPT

- DETECTION DE LA VERSION DU SCRIPT PRECEDEMMENT INSTALLE

(Recuperation des donnees et memorisation via GreaseMonkey)
- TOUTES LA PAGES : RECUPERATION DES RESSOURCES DE LA PLANETE ET DES NOMS DES PLANETES
- PAGE GENERALE
- PAGE DES PRE-REQUIS DE CONSTRUCTION
- PAGE RESSOURCES
- PAGE BATIMENT
- PAGE LABORATOIRE
- PAGE DEFENSE
- PAGE DEFENSE ET CHANTIER SPATIAL
- PAGE FLOTTE

- REALISATION DES ACTIONS

- PANNEAU DE CONFIGURATION (Page Options)

- MODIFICATION DU LIEN 'Liste des membres' pour tri par des membres
- CORRECTION LIEN OVERLIB PAGE GALAXIE (FR)

- MISE A JOUR AUTOMATIQUE

- AFFICHAGE DU TABLEAU DE RESSOURCES

- PAGE EMPIRE

- FONCTIONS NECESSAIRES AUX CALCULS DES TRANSFERTS
- PAGES FLOTTE (Affichage des formulaires pour les differentes pages : Flotte, Coordonnees & Vitesse, Ressources)

- CSS

- COMPATIBILITES AFFICHAGE (SKIN)
- INSERTION DU CODE CSS DE L'UTILISATEUR
- EXECUTION DU CODE JAVASCRIPT DE L'UTILISATEUR

- TEMPS D'EXECUTION ET LIEN DE MISE A JOUR





   TODO
   -------------------------------------------------

- Ajout : Transfert : Calcul des transferts en utilisant gt et pt ensemble
- Ajout : Empire : Prise en compte des temps de construction
- Ajout : Transfert : Gestion d'un transfert 'global' (memorisation des destinations precedentes)
- Ajout : Empire : Niveau energie pour les listes de pourcentages
- Correction : Empire : calcul du temps avant construction (si aucune production de deuterium affiche 'infini' ou aucun resultat)
- Correction : Transfert : erreur lorsque le tableau de ressources 'genere' n'est pas utilise
- Correction : Exportation : Texte trop long pour certains forums
- Correction : Tableau de ressources : pliage par rapport au id et a la position
- A verifier : Nombre de construction de vaisseaux et defenses limite a 999





   DESCRIPTION DES MISES A JOUR
   --------------------------------------------------

0.8 Beta 019 - 12/10/2009
- Ajout : Langue : Neerlandais (By Frutelaken)
- Ajout : Langue : Portuguaise (By Spac3h)
- Ajout : Langue : Danois (By Im Me)
- Ajout : Langue : Slovaque (By Viktorc)
- Correction : Page generale : L'analyse du type de planete etait incorrecte
- Correction : GreaseMonkey : GMsetValue et GM__setValue

0.8 Beta 018 - 01/10/2009
- Ajout : Langue : Allemand (By Dhu)
- Ajout : Langue : Espagnol (By ETintos)
- Correction : Langue : Anglais (By Dhu)

0.8 Beta 017 - 12/30/2008
- Ajout : Transfert : Bouton d'envoi du formulaire
- Ajout : Empire : Memorisation de l'etat cache ou affiche des blocs
- Ajout : Options : Empire : Gestion de l'ordre des blocs de menu empire
- Ajout : Options : Transfert : Correction du coefficient multiplificateur
- Correction : Page ressources : Correction du parsage (compatibilite foxgame)
- Correction : Empire : Temps de construction des satellites pour terraformeur et graviton

0.8 Beta 016 - 09/30/2008
- Ajout : Options : Transfert : Coefficient mulitplicateur de la vitesse des vaisseaux (test)
- Correction : Image : Images integrees au script (en base 64)... Plus besoin de serveur alternatif
- Correction : Langue : Bouton inversion de la selection
- Correction : Empire : Mise au premier plan du popup
- Correction : Transfert : Renvoi incorrect des coordonnees

0.8 Beta 015 - 06/19/2008
- Ajout : Transfert : Bouton d'inversion de selection des planete utilisee
- Correction : Page recherche : Detection recherche tout domaine
- Correction : Page defense : Detection defense domaine IT
- Correction : Empire : Affichage de l'image des planetes

0.8 Beta 014 - 05/07/2008
- Changement de serveur

0.8 Beta 013 - 05/04/2008
- Correction : Langue : Texte incorrect en italien
- Correction : Compte : Une erreur creer des comptes a chaque mise a jour
- Correction : Page recherche : Detection du niveau pour ogame.org
- Correction : Empire : Nombre de vaisseaux necessaire pour transferer les ressources

0.8 Beta 012 - 05/03/2008
- Correction : Tableaux des ressources : Ordre des planetes (bug lors de suppression et d'ajout de planetes)
- Correction : Tableaux des ressources : Ressources en surcapacite en mode temps reel
- Ajout : Empire : Calcul de l'energie consomme ou produite (mine et centrale)
- Ajout : Empire : Calcul du temps de construction
- Ajout : Empire : Nombre de vaisseaux necessaire pour transferer les ressources
- Correction : Empire & Transfert : Modification du transfert des ressources

0.8 Beta 011 - 04/23/2008
- Correction : Tableau de ressources : colonne total
- Correction : Transfert : Couleur panneau transfert sans tableau de ressources

0.8 Beta 010 - 04/23/2008
- Correction : Calcul temps reel des ressources : anti depassement de la capacite de stockage
- Correction : Construction batiment : ressources centrales de fusion
- Ajout : Options : Empire : Forcer l'affichage du tableau des ressources en mode empire

0.8 Beta 009 - 04/23/2008
- Ajout : Calcul temps reel des ressources : anti depassement de la capacite de stockage
- Correction : Empire : bug si tableau de ressources desactive et temps reel active

0.8 Beta 008 - 04/22/2008
- Ajout : Options : Systeme de gestion de l'ordre des planetes
- Correction : Page recherche : Identifiant de la planete de construction
- Correction : Page Batiment : Lors de la mise a jour automatique les demandes d'actualisation ne s'affiche pas (Detection fin de construction batiment modifiant la production)

0.8 Beta 007 - 04/22/2008
- Ajout : Empire : Export : Generation sous forme de tableau et suppression des caracteres speciaux 
- Correction : Page Batiment : Retour automatique a la batiment apres visite de la page ressources (Detection fin de construction batiment modifiant la production)

0.8 Beta 006 - 04/22/2008
- Correction : Langue italien
- Correction : Transfert : bug avec une certaine combinaison de parametres

0.8 Beta 005 - 04/21/2008
- Ajout : Support .org et langue anglais par defaut
- Correction : Langue, francais et italien
- Correction : Tableaux des ressources : calcul du total des ressources lorsque le calcul temps reel est desactive
- Correction : Tableaux des ressources : plus de retour a la ligne (mise a jour)
- Correction : Page Batiment : Detection fin de construction batiment modifiant la production
- Correction : Page defenses et chantier spatial : Detection vaisseaux et defenses en construction 
- Ajout : Transfert : Transfert vers lune ou planete 'autre destination'
- Ajout : Empire : Exportation en BBCode
- Correction : Empire : Reduction des colonnes du tableau de ressources et reduction du tableau
- Ajout : Option : Tableaux des ressources : Possibilite de cacher le nom de la planete

0.8 Beta 004 - 04/14/2008
- Correction : pre-requis de construction pour le labo de recherche errone

0.8 Beta 003 - 04/13/2008
- Ajout : Options : Parametres generaux : Option d'ajout des infos bulles
- Correction : Transfert : Utiliser les ressources de la planete selectionnee

0.8 Beta 002 - 04/13/2008
- Correction : Tableaux de ressources : Retour a la ligne des coordonnees
- Correction : Transfert : Affiche la date d'arrivee si on choisi le mode date pour le calcul
- Correction : Transfert : La date est affichee avec les abreviations dans le language actif

0.8 Beta 001 - 04/12/2008
- Correction : refonte totale de la gestion des constantes (C_*), tableaux (A_*) et variables sauvegardees
- Ajout : Changement de page comme un humain, plus de lien direct
- Ajout : Detection de la version et affichage des informations de la version lors de la premiere utilisation
- Ajout : Support multilingue (FR et IT)
- Ajout : Detection du domaine et affichage s'il n'est pas supporte
- Ajout : Tableaux de ressources : pliage de chaque colonne (avec memorisation du pliage)
- Ajout : Tableau des ressources : Changement des graduations de couleur en temps reel
- Ajout : Tableaux de ressources : Une fois qu'une mise a jour auto est lance elle peut peut etre stoppee (via le bouton d'actualisation qui est remplace par un bouton stop pendant la mise a jour)
- Correction : Page Ressources : Lecture des pourcentages incorrects
- Ajout : Page Batiment : Si un batiment modifiant la page ressources vient d'etre construit affichage d'un message de demande de mise a jour de la page ressources
- Correction : Mise a jour auto : Plus de saut direct d'une page d'un certain type (batiment, ressources,...) vers une autre page d'un autre type
- Correction : Mise a jour auto : Seule la page ayant le labo le plus eleve est parsee
- Ajout : Transfert : Choix de l'heure d'arrivee ou de la duree du trajet (menu transfert)
- Ajout : Transfert : Le panneau des options de transferts est maintenant pliable
- Ajout : Transfert : Sauvegarde des options de transferts
- Correction : Transfert : Une fois tous les tranferts termines, le transfert est supprime automatiquement
- Correction : Transfert : Effacement du transfert dans certains cas si on changeait de page en cours de transfert
- Ajout : Options : Toutes les options sont unique a chaque compte ogame
- Ajout : Options : Parametres generaux : Ajout option de suppression du lien marchand
- Ajout : Options : Parametres generaux : Ajout option de debuggage (active ou non l'affichage des messages d'erreurs)
- Ajout : Options : Tableaux de ressources : Ajout option d'affichage des colonnes total et antimatiere
- Ajout : Options : Empire : Ajout d'une option pour cacher par defaut le panneau ressources lorsque le menu empire est active
- Ajout : Options : Ajout de la section transfert
- Ajout : Options : Transfert : possibilite d'utiliser les ressources calculer en temps reel pour les transferts
- Ajout : Options : Transfert : Forcer la mise a jour en temps reel du tableau des ressources du panneau de transfert
- Ajout : Options : Transfert : Afficher le tableau de transfert si un transfert est en cours
- Correction : Options : Liens additionnels : Suppression de tous les liens
- Ajout : Empire : Toutes les sections sont pliables
- Ajout : Empire : Ressources : Ajout du facteur de production
- Ajout : Empire : Ajout section construction des vaisseaux et defenses en cours
- Ajout : Empire : Terraformeur et techno. graviton, ajout de l'affichage du cout de construction des satellites (en orange), le temps avant construction en tient compte
- Correction : l'image PHP de mise a jour s'affiche maintenant uniquement sur la vue generale et uniquement si aucune mise a jour auto n'est en cours

0.7 Beta 050 - 03/12/2008
- Ajout : image php affichant si la version est a jour ou non,
          (par defaut desactive, car via une image php on peut recuperer beaucoup de chose et je ne force personne a croire en ma bonne foi)
          (de plus si vous le desirez je peux vous transmettre la source php)

0.7 Beta 049 - 03/12/2008
- Ajout : ajout du temps avant la possibilite de construction
- Ajout : recalage automatique de l'affichage lors du clic sur section du panneau de configuration
- Correction : validation de la possibilite de construction en fonction des technologies de toutes les planetes

0.7 Beta 048 - 03/12/2008
- Ajout : option d'affichage uniquement du total des ressources
- Ajout : option d'affichage des coordonnees des planetes
- Ajout : possibilite d'ajouter du code javascript
- Ajout : menu option avec pliage pour chaque sous-section
- Ajout : temps entre chaque changement de graduation de couleur parametrable
- Correction : erreur avec verification ip active

0.7 Beta 047 - 03/11/2008
- Correction : un bug empechait l'ajout de lien

0.7 Beta 046 - 03/11/2008
- Correction : bug de chargement a la premiere utilisation

0.7 Beta 045 - 03/11/2008
- Ajout : production horaire dans le menu empire
- Ajout : cout total pour chaque type de defense et flotte en pointant le total
- Correction : generation des liens du menu avec la page galaxie

0.7 Beta 044 - 03/11/2008
- Ajout : lien arreter la construction dans le menu empire pour les batiments et technologies
- Correction : valeurs des pre-requis

0.7 Beta 043 - 03/11/2008
- Ajout : si un batiment est en cours sur la planete aucun autre ne peut etre lance

0.7 Beta 042 - 03/11/2008
- Ajout : retour automatique apres lancement de construction depuis la page empire
- Correction : la fonction de validation retournee une erreur pour certain type de batiment

0.7 Beta 041 - 03/11/2008
- Ajout : Batiment et technologie en construction dans le menu empire
- Ajout : Affiche dans l'empire les pré-requis de construction s'il ne sont pas acquis et empeche la construction
- Correction : enregistrement uniquement des options modifies (panneau de configuration)

0.7 Beta 040 - 03/09/2008
- Correction : optimisation de l'execution dela page generale
- Correction : MAJ auto generait une erreur lors d'une double mise a jour simultanee

0.7 Beta 039 - 03/09/2008
- Ajout : mise a jour automatique de toutes les pages memorisables
- Ajout : option d'affiche du lien de mise a jour automatique des pages memorisables
- Ajout : calcul en temps reel des ressources sur la planete
- Ajout : option activation du calcul en temps reel des ressources (avec choix du delai de mise a jour)
- Correction : affichage bouton pages flotte
- Correction : transfert deja effectue remise a zero incorrect

0.7 Beta 038 - 03/08/2008
- Correction : code genere valide W3C

0.7 Beta 037 - 03/08/2008
- Correction : la page empire si elle est demandee remplace maintenant n'importe quelle page (faille detection du script)
- Correction : la page recherche ete automatiquement remplacee par la page empire

0.7 Beta 036 - 03/07/2008
- Ajout : option delai variable pour l'actualisation automatique des pages

0.7 Beta 035 - 03/07/2008
- Correction : sauvegarde des donnees entrees via formulaire

0.7 Beta 034 - 03/06/2008
- Ajout : Actualisation automatique des pages

0.7 Beta 033 - 03/05/2008
- Correction : mise au premier plan du popup overDiv

0.7 Beta 032 - 03/05/2008
- Correction : mise a jour pages batiment, laboratoire et defense sans skin

0.7 Beta 031 - 03/05/2008
- Correction : la correction du bug enlever le classement de l'alliance pour NeoGame

0.7 Beta 030 - 03/05/2008
- Correction : Lancement d'un flotte en vol avec transfert en cours

0.7 Beta 029 - 03/05/2008
- Ajout : correction bug ogame sur la page galaxie, affichage description alliance 

0.7 Beta 028 - 03/04/2008
- Ajout : enregistrement des parametres via le bouton sauvegarde du menu option
- Correction : suppression du clignotement des ressources pour les lunes

0.7 Beta 027 - 03/04/2008
- Correction : Lien entete tableau de ressources
- Correction : bug laboratoire non construit

0.7 Beta 026 - 03/04/2008
- Ajout : parametrage de la position du bloc principal
- Ajout : parametrage code css pour toutes les pages
- Ajout : bouton de changement de planete manuel
- Correction : support verification d'ip

0.7 Beta 025 - 03/04/2008
- Ajout : support petit transporteur pour les transferts
- Ajout : verification de la flotte total disponible avant envoi
- Correction : suppression des liens officiers
- Correction : bug transfert ressources vers destination externe
- Correction : faille de detection du script





   LISTE DES VARIABLES MEMORISEES VIA GREASEMONKEY
   -------------------------------------------------- 

AccountNumber : A remplacer par l'id du compte
PlanetId : A remplacer par l'id de chaque planete du compte

Parametres generaux :
*******************

- OT_Account                                (Identifiant des comptes)
- OT_AccountNumber_Version                  (Version d'OT du compte)
- OT_AccountNumber_MainOption               (Options generales)
- OT_AccountNumber_ScreenOption             (Options d'affichage)
- OT_AccountNumber_CssCode                  (Code css de l'utilisateur)
- OT_AccountNumber_JSCode                   (Script js de l'utilisateur)
- OT_AccountNumber_ResourcesTableOption     (Options du tableau des ressources)
- OT_AccountNumber_PlanetOrder              (Options de tri des planetes)
- OT_AccountNumber_EmpireOption             (Options du menu empire)
- 0T_AccountNumber_TransferOption           (Options de transfert)
- OT_AccountNumber_LinkOption               (Creation de lien du menu ogame)
- OT_AccountNumber_TransferCalcOption       (Options de calcul des transferts)
- OT_AccountNumber_Refresh                  (Parametres de mise a jour automatique)    
- OT_OgameEmpire                            (Affiche le menu empire)
- OT_AccountNumber_EmpireBlock              (Parametre d'affichage des blocs du menu empire)
- OT_AccountNumber_Transfer                 (Variable de transfert)
- OT_AccountNumber_ConstructionName         (Memorisation du noms des constructions)
- OT_AccountNumber_Actions                  (Liste des actions a realiser)
- OT_AccountNumber_ShowHideColumn           (Memorisation de l'affichage des colonnes du tableau de ressources)

Memorisation de chaque planete :
******************************

- OT_AccountNumber_Research                 (Parametres du panneau de recherche)
- OT_AccountNumber_PlanetName               (Nom des planetes lie a leur ID)
- OT_PlanetId_Planet                        (Informations generales sur la planete)
- OT_PlanetId_Resources                     (Informations sur les ressources)
- OT_PlanetId_Production                    (Production horaire de chaque ressources)
- OT_PlanetId_Pourcent                      (Taux d'utilisation des batiments de production)
- OT_PlanetId_Buildings                     (Informations sur les batiments)
- OT_PlanetId_Defenses                      (Informations sur les defenses)
- OT_PlanetId_Fleets                        (Informations sur les vaisseaux)
- OT_PlanetId_FleetsDefensesUC              (Informations sur les vaisseaux et defenses en cours de construction)
- OT_PlanetId_Transfer                      (Informations sur les transferts)







   COMPTEUR DU TEMPS EXECUTION DU SCRIPT (NE PAS MODIFIER!!!)
   -------------------------------------------------- */

var Counter = new Date();
CounterStart = Counter.getTime();





/* DECLARATIONS GLOBALES
   -------------------------------------------------- */

// Prototypes : Informations sur une planete
function P_Planet() {
  this.Id = '';
  this.Name = '';
  this.Session = '';
  this.Type = '';
  this.Url = '';
  
  this.Galaxy = '';
  this.System = '';
  this.Planet = '';
  
  this.UsedSpace = 0;
  this.TotalSpace = 0;
  this.Diameter = 0;
  this.MinTemperature = 0;
  this.MaxTemperature = 0;
  this.ImageUrl = '';
  this.Update = '';
}

// Prototypes : Ressources
function P_Resources() {
  this.Metal = '';
  this.Crystal = '';
  this.Deuterium = '';
  this.FreeEnergy = '';
  this.TotalEnergy = '';
  this.MetalOver = false;
  this.CrystalOver = false;
  this.DeuteriumOver = false;
  this.EnergyOver = false;
  this.Update = '';
}

// Prototypes : Pourcentage d'utilisation des batiments (page ressources)
function P_Pourcent() {
  this.rate = '';
  this.Metal = '';
  this.Crystal = '';
  this.Deuterium = '';
  this.Solar = '';
  this.Fusion = '';
  this.Ship212 = '';
  this.Update = '';
}

// Prototypes : Production horaire (page ressources)
function P_Production() {
  this.Metal = 0;
  this.Crystal = 0;
  this.Deuterium = 0;
  this.MetalMax = 0;
  this.CrystalMax = 0;
  this.DeuteriumMax = 0;
  this.Update = '';
}

// Prototypes : Construction (batiment,recherche,flotte,defense)
function P_Construction(Id,Metal,Crystal,Deuterium,Energy,PlanetType,Group0,Element0,Level0,Group1,Element1,Level1,Group2,Element2,Level2,Group3,Element3,Level3) {
  this.Id = Id;
  this.Name = null;
  
  // Cout
  this.Metal = Metal;
  this.Crystal = Crystal;
  this.Deuterium = Deuterium;
  this.Energy = Energy;
  
  // Pre-requis de construction
  this.PlanetType = PlanetType;
  this.Group0 = Group0;
  this.Element0 = Element0;
  this.Level0 = Level0;
  this.Group1 = Group1;
  this.Element1 = Element1;
  this.Level1 = Level1;
  this.Group2 = Group2;
  this.Element2 = Element2;
  this.Level2 = Level2;
  this.Group3 = Group3;
  this.Element3 = Element3;
  this.Level3 = Level3;
}

// Prototypes : Description de la construction
function P_ConstructionDescription() {
  this.Level = '';
  this.UC = 0;
}

// Prototypes : Description de la recherche
function P_ResearchDescription() {
  this.Level = '';
  this.UC = 0;
  this.Update = '';
}

// Prototypes : Liste de construction des vaisseaux et defenses
function P_FleetsDefensesUC() {
  this.List = '';
  this.Update = 0;
}

// Prototypes : Transfert
function P_Transfer() {
  this.Checked = false;
  this.OriginePlanet = 0;
  this.OrigineSystem = 0;
  this.OrigineGalaxy = 0;
  this.Metal = 0;
  this.Crystal = 0;
  this.Deuterium = 0;
  this.Speed = 0;
  this.TransportShip = 0;
  this.Recycler = 0;
  this.State = 0;
}

// Prototypes : Ressources en temps reel
function P_RealTimeResources() {
  this.Metal = 0;
  this.Crystal = 0;
  this.Deuterium = 0;
}

// Prototypes : Ressources en temps reel
function P_PlanetName() {
  this.Name = '';
  this.Id = '';
}

// Prototypes : Overlib
function P_OverLib() {
  this.Text = '';
  this.Link = '';
}

// Prototypes : Definition des blocs du menu empire
function P_EmpireBlock(Order, Hide) {
  this.Order = Order;
  this.Hide = Hide;
}

// Type de planete;
var C_Planet = 0;
var C_Moon = 1;
var C_All = 2;



// Constantes des constructions
const C_Buildings = 0;
const C_Research = 1;
const C_Fleets = 2;
const C_Defenses = 3;

var i,j,k // Variables d'incrementation

// Separateur pour le parsage des donnees memorisees via GreaseMonkey
var Separator = new RegExp("[|]+", "g");
var KeySeparator = new RegExp("[=]+", "g");

// Mise en memoire des variables memorisees via GreaseMonkey
var Get = new String();

// Tableau des comptes
var A_Account = new Array();

// Tableau des informations memorisees via GreaseMonkey
var A_Planet = new Array();
var A_PlanetName = new Array();
var A_PlanetOrder = new Array();
var A_PlanetOrderIndex = new Array();
var PlanetOrderIndex = 0;
var A_Resources = new Array();
var A_Pourcent = new Array();
var A_Production = new Array();
var A_Buildings = new Array();
var A_BuildingsUpdate = new Array();
var A_Research = new Array();
var ResearchUpdate = '-'; // Variable de mise a jour des recherches
var A_Fleets = new Array();
var A_FleetsUpdate = new Array();
var A_Defenses = new Array();
var A_DefensesUpdate = new Array();
var A_FleetsDefensesUC = new Array();
var A_Transfer = new Array();

// Tableau des ressources en temps reel
var A_RealTimeResources = new Array();

// Tableau des actions a realiser
var A_Actions = new Array();
var NotRun = false; // Pas de report du lancement de l'action

// Tableau des parametres d'affichage des colonnes du tableau de ressources
var A_ShowHideColomn = new Array();

// Tableau pour le transfert des ressources
var A_TransferMetal = new Array();
var A_TransferCrystal = new Array();
var A_TransferDeuterium = new Array();

// Code pour input numerique afin d'empecher la saisi de texte
var NoStringInput = 'onkeypress="if((event.keyCode < 48 && event.keyCode != 39 && event.keyCode != 37 && event.keyCode != 46 && event.keyCode != 8) || event.keyCode > 57) event.returnValue = false; if((event.which < 48 && event.which != 46 && event.which != 8 && event.which != 37 && event.which != 39) || event.which > 57) return false;"'; 

// Variable d'activation de la description avancee des erreurs
var Debug = true; // Initialisation de la valeur, cette valeur est reparametree lors du chargement des parametres generaux
const DebugAdvanced = false;

// Serveur (clipboard, image php, update)
const C_Server = 'http://www.vbc3.com/script/';

// Constante contenant le code en base 64 des images (Prog de conversion : http://lggillou.vbc3.com/download.php?Programme=14)
const C_ImgNext = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAAQCAIAAAEMoeOjAAAABnRSTlMA/wAAAP+JwC+QAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAACXRFWHRDb21tZW50AACJKo0GAAABlUlEQVR4nGOwanT6z/AfiBjUS+UUG+X8zpgxQAXibzoUvvZkUCiVCDhqDRQIvWoOEgbqUClWArKa36eA+BDVCHMgyuC6GIBmAA0Fmg40D2gBA0Qb3BSQed577SGaIRLIXJD1eTc8g64YuZ40hpiLzAXprnodnPXQU7FYGKIbmQuSNqnQRzYcmcugEa0I5wARMpfBYbORSLIAnI/MZQg+bxZwzky+SATCR+YylN7xS7rh4HJZS7pGFMhH5jJUffDLeOIaf9rJ7gjIFchchraPsbmPPaOOQsMRmcuQfsot4XAA3C3IXAaHfmtkPyBzQd63mGkgmSeKrAI5NHDJgnS67jHyP20ZvN9RqoAfUycuWVCEZd51TbhhF3bN1PuCnv9JG9kKEbg0HllQCqx9GlT8wCfzrkf0NbuAS8aOZ7Vcjpup1IISCh5ZkGsbP0ZVvg7Kf+qWfM8q5oa9/z4b1RIZuGtxyYJ0lt73rXkXWv4yJuqYt3auApo/ccmCdBaejknZH6SRo4gZgHhkQTp5wvmwRglEJy5ZADfU09qGYTEfAAAAAElFTkSuQmCC';
const C_ImgPrevious = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAAQCAIAAAEMoeOjAAAABnRSTlMA/wAAAP+JwC+QAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAACXRFWHRDb21tZW50AACJKo0GAAABl0lEQVR4nGP4z/DfqtEJSDKo1Cqpl8oVP/ABsv+DBKKv2Tme1QLxoo55QxTVvAsF8aUK+CF8/9OWUNUQBBRlgCiD62IAmgE0FGg60DygBQwQbXBTEPpT9gdBTEXmgpXvs0m+Z1X5GiqNzAVJy1aIeF/QS7hhp1AqgcZFGC6ZJ4psOISLkOYJ50P2B5ALldPIUSw8HQOXgHBBctq5CuUvY0rv+0Ik4FwG1RKZmBv2+U/dGj9GASWQuQwux80CLhln3vWofRoElEPmgj160ibsmmnmXVeImXAu1C3B+x1d9xjB3QLhIvxgMdMA2Q9ALkrcQJBJhb5DvzVyUGCVRdGpUqyUcDig+X1K+ik3TJ1oslCdisXCUUedsh565j72rHod3PYxFlknVlkGxUY5uyP6fmfM4k87xd90yHjiWvjas+qDHzDVgPTglgXZKV0j6nrS2OWyVtAVo6QbDnk3PEvv+EFSBB5ZhD/li0QCjloHnDMLvWoefN4MrhOXLHrYiiQLeO+1d9hshDVskWWxxAooZUUr4ooVuCwAp/3T2vUu6jIAAAAASUVORK5CYII=';
const C_ImgPlay = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAAQCAIAAAE42CK/AAAABnRSTlMA/wAAAP+JwC+QAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAACXRFWHRDb21tZW50AACJKo0GAAABPElEQVR4nGP4z/AfiEDQ7og+mJHxxBVEB5wzg0okHA4A0RrRilDFwefN5ItEQKyqD37xp51ArPRTbgijHDYbiSQLQPhQodI7fkk3HFwua0nXiEKF2j7G5j72jDrqhKSx3xquCyRg1eiEzvfea4/gK5RKhF41DzhqjeDn3fAMumLketIYxFcvlSt87Rl/08HvjJlioxxIf9Xr4KyHnorFwlDzmt+nqBQrIcw3qdBHcThQyGKmgWSeKLJD0FW47jHyP20ZvN9RqoAfiwqgszLvuibcsAu7Zup9Qc//pI1shQiKCqBDa58GFT/wybzrEX3NLuCSseNZLZfjZiq1SghbGj9GVb4Oyn/qlnzPKuaGvf8+G9USGRR3lN73rXkXWv4yJuqYt3auAhaXFp6OSdkfpJGjiNMvPOF8WL0KRAC2SRnFpr5kKQAAAABJRU5ErkJggg==';
const C_ImgStop = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAAHnlligAAAABnRSTlMA/wAAAP+JwC+QAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAACXRFWHRDb21tZW50AACJKo0GAAABRklEQVR4nGWSvUpDQRCF9x18AVMLFkoaEQ2BgBdDlBQW/hCwi6AQgo2QIo2VrQ/ho4iNiIQrGNDCysaIffINZxiXG5jl7p49M3PO3E3zNK8NVxLr4rOwj52uyuJ2dmanw5fN3lvDr/iMZ8f3vwPnEaSn/ef187LRn7ZGX93EbvjRZmcFSNDu4e/Ocg4etwlqwjotdwmvfDSpA9GJKpFkF5yv3zuC6A1q7ekq6OanQwDRwITLTSVMY3SO5lReu1xNQruvG+qvslYquCHJL6Q1R1FlF8sowrbGzRQOZALUL8gSKhPyYXLlQ6Jz6b2nJl1ieoT7y9miSnywURbizLcSIPH3gnoy2Yl/EIrdNiunymx/uleh4trHwcp4Ld4UPN7G4LvIqRqTJ4TKSlXmAy9m9z8+jbZChZdTmSlhCUyKYEcsvxPhCjEXtRRx4iRN7Q8AAAAASUVORK5CYII=';
const C_ImgUp = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAJCAIAAAHDTwvzAAAABnRSTlMA/wAAAP+JwC+QAAAACXBIWXMAAAsSAAALEgHS3X78AAAACXRFWHRDb21tZW50AACJKo0GAAABLUlEQVR4nGP4z/BfsVGOwarRSb1UjgHIAyIGhVIJoACIF3DUOv6mg0qxElQKqgAIg64YZT30BDGBSiEaoHogyPWksd8ZM8ViYYQW7732oVfN8254Fr72rHod3Pw+xaRCH6FDpVYJ3RIgkq0QcTyr5b/PBkVCqoDf+4Je9DW75HtWUce8oRKSeaL+py0TbtgVP/CpfB1U8y40ZX8Q1IkQVwI9CWGjOxeOpGtEXY6b2R3RVy2RwZRF0SBfJOJ/0sblslbAJeP4004xN+yjjjpp5ypg0SCSLBC83zHgnFnYNdOkGw6Zdz0ynrjmP3XLfexZ/jIm4XCARo4iVINGtKLFTAOHzUaue4yCz5tl3nUtveNX+zSo6oNf48eoto+xpfd900+5FZ6Ocei35gnnAwAz1tn2SifjEgAAAABJRU5ErkJggg==';
const C_ImgDown = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAJCAIAAAHDTwvzAAAABnRSTlMA/wAAAP+JwC+QAAAACXBIWXMAAAsSAAALEgHS3X78AAAACXRFWHRDb21tZW50AACJKo0GAAABL0lEQVR4nGOwanRSL5Vj+M/wX6VWiQHIUyiVAPH+M4Bh1DHv6Gt2UgX8ICmILJAEySTfs/K+oAdVBkcgmLI/qOZdaOXroOIHPgk37PxPW0rmiSJU+e+zcTyrJVshAtUBMRjiDqDxEBtAlphU6De/T6l6HVz42jPvhmfoVXPvvfZQO1SKlbIeesbfdAi6YhRw1BphORApFgv7nTFzPWmM4iqoXKMcinN5wvkc+q0LT8ekn3Irve/b9jG28WNU1Qe/2qdBpXf8Mu+6Bp83c91j5LDZyGKmgUa0ItQkjRzFhMMB5S9jch975j91y3jimnnXI+mGQ9g104BzZsH7HUWSBdCtBiLtXIWoo04xN+zjTzsFXDJ2uazlf9JGvkgEPQTRkGqJjN0RfZfjZtI1opiyAH9n2abU/F0QAAAAAElFTkSuQmCC';
const C_ImgLeft = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAICAIAAAHJlJL6AAAABnRSTlMA/wAAAP+JwC+QAAAACXBIWXMAAAsSAAALEgHS3X78AAAACXRFWHRDb21tZW50AACJKo0GAAAAbUlEQVR4nGP4z/CfwarRiUGlVkmhVIIBxHU8qwWi/ffZqJfKgViyFSIgJUCWdq4Cg2qJTMwNewaX42YBl4zBCk/agCggUiwWjjrqBNKl2Chnd0Tf74xZ/GknqLnSNaKuJ41dLmtB+RAkXwQyGwA7gjOamDgP9wAAAABJRU5ErkJggg==';
const C_ImgRight = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAICAIAAAHJlJL6AAAABnRSTlMA/wAAAP+JwC+QAAAACXBIWXMAAAsSAAALEgHS3X78AAAACXRFWHRDb21tZW50AACJKo0GAAAAbElEQVR4nGOwanRi+A+ECqUSio1yYKbfGTMQ1/WkMYinXiqnWCwMYskXiYAol8ta0jWiDPGnneyO6DNEHXUCCQKN8T9pI1sBUgE1LuCSseNZLZfjZiq1SiBTYm7Y+++zUS2RgarXzlWAKAYiANa6M5quy1RnAAAAAElFTkSuQmCC';

// Retour a la ligne
const C_CRLF = String.fromCharCode(13)+String.fromCharCode(10);





/* TEXTE DES LANGUES
   -------------------------------------------------- */

// Detection de la langue
var Host = window.location.host;
var Language, OgameExtension = '';
var A_OgameExtension = Host.split('.');
var SupportedExtension = true;
j = 0;
for (i=0; i<A_OgameExtension.length;i++) {
  if (A_OgameExtension[i] == 'ogame') {
    j = i+1;
  }
  else if (j > 0) {
    OgameExtension += '.'+A_OgameExtension[i];
  }
}
if (OgameExtension == '.org') {
  Language = 0;
}
else if (OgameExtension == '.fr') {
  Language = 1;
}
else if (OgameExtension == '.it') {
  Language = 2;
}
else if (OgameExtension == '.nl') {
  Language = 3;
}
else if (OgameExtension == '.com.tr') {
  Language = 4;
}
else if (OgameExtension == '.de') {
  Language = 5;
}
else if (OgameExtension == '.com.es') {
  Language = 6;
}
else if (OgameExtension == '.com.pt') {
  Language = 7;
}
else if (OgameExtension == '.dk') {
  Language = 8;
}
else if (OgameExtension == '.sk') {
  Language = 9;
}
else {
  Language = 0;
  SupportedExtension = false;
}

// Modif proxy
if (Host == "") {
  Language = 1;
  SupportedExtension = true;
}

// Texte
// For accented character, use unicode or octal code to replace it, use this link (http://www.vbc3.com/script/unicode_octal_html_code.php)
var A_Language = new Array();
if (Language == 1) { // FR
  i = 0;
  A_Language[i] = 'Plan\350te'; i++;
  A_Language[i] = 'Lune'; i++;
  A_Language[i] = 'M\351tal'; var C_Metal=i; i++;
  A_Language[i] = 'Cristal'; var C_Crystal=i; i++;
  A_Language[i] = 'Deut\351rium'; var C_Deuterium=i; i++;
  A_Language[i] = 'Energie'; var C_Energy=i; i++;
  A_Language[i] = 'Antimati\350re'; var C_DarkMatter=i; i++;
  A_Language[i] = 'Empire'; var C_Empire=i; i++;
  A_Language[i] = 'Ressources'; var C_Resources=i; i++;
  A_Language[i] = 'Mise \340 jour'; var C_Update=i; i++;
  A_Language[i] = 'Oui'; var C_Yes=i; i++;
  A_Language[i] = 'Non'; var C_No=i; i++;
  A_Language[i] = 'Afficher'; var C_Show=i; i++;
  A_Language[i] = 'Cacher'; var C_Hide=i; i++;
  // Required text for analysis, include spaces, must be exact
  A_Language[i] = 'Diam\350tre'; var C_Diameter=i; i++; // Overview page
  A_Language[i] = 'Temp\351rature'; var C_Temperature=i; i++; // Overview page
  A_Language[i] = 'Total'; var C_Total=i; i++; // Name of total in resources page
  A_Language[i] = 'Production de mati\350res premi\350res'; var C_ResourcesTableHeader=i; i++; // Beginning of the first row from the resources table (resources page)
  A_Language[i] = 'N\351cessite'; var C_Require=i; i++; // First word of the right cell in tree technology table
  A_Language[i] = 'Facteur de production : '; var C_ProductionRate=i; i++; // Text before production rate number in resources page
  // ValidateBuilding
  A_Language[i] = 'Nombre de cases libres insuffisant'; var C_NotEnoughFreeField=i; i++;
  A_Language[i] = 'La base lunaire n\'a pas encore \351t\351 construite'; var C_LunarBaseNotBuilt=i; i++;
  A_Language[i] = 'Construction impossible sur une plan\350te'; var C_NotOnPlanet=i; i++;
  A_Language[i] = 'Construction impossible sur une lune'; var C_NotOnMoon=i; i++;
  // AddLink
  A_Language[i] = 'Mots cl\351s :\n\nCertaine partie de l\'adresse du lien peuvent \352tre remplac\351e par des mots cl\351s qui seront remplac\351s lors de la cr\351ation du lien.\n\n'+
  '[session] retourne l\'identifiant de la session ogame active\n'+
  '[host] retourne le domaine ogame de la session active\n\n'+
  '[Nom de la plan\350te] retourne l\'identifiant de la plan\350te d\351sign\351e de la session active\n\n'+
  'Ex: cr\351ation d\'un lien vers la vue g\351n\351rale de la plan\350te nomm\351e \253Colonie\273 :\n'+
  'http://[host]/game/index.php?page=overview&session=[session]&cp=[Colonie]\n\n'+
  'Deviendra (si vous \352tes sur l\'univers 10 fr) :\n'+
  'http://uni10.ogame.fr/game/index.php?page=overview&session=2943046dc47f&cp=34317957'; var C_KeyWordsInformations=i; i++;
  // SaveParameter
  A_Language[i] = 'La valeur de la transparence des cellules n\'est pas correct.\nElle doit \352tre comprise entre 1 et 100'; var C_TransparencyError=i; i++;
  A_Language[i] = 'Le num\351ro de ligne du menu empire saisi est incorrect.\nIl doit \352tre compris entre 1 et '; var C_EmpireRowError=i; i++;
  A_Language[i] = 'Le nom du lien vers le menu empire doit au moins contenir un caract\350re.'; var C_EmpireTxtError=i; i++;
  A_Language[i] = 'La taille des ic\364nes des plan\350tes du menu empire doit faire au moins 1 pixel.'; var C_EmpireSizeIconError=i; i++;
  A_Language[i] = 'Le lien n\260'; var C_LinkPositionError1=i; i++;
  A_Language[i] = ' ne sera pas sauvegard\351.\nV\351rifier le nom, le lien ou la position de votre lien.\nLa position du lien doit \352tre comprise entre 1 et '; var C_LinkPositionError2=i; i++;
  A_Language[i] = 'Les informations correctes ont \351t\351 sauvegard\351es.\nAfin que vous puissiez corriger, la page ne sera pas actualis\351e.'; var C_SaveParameterError=i; i++;
  // ShowHideTable
  A_Language[i] = 'Plier'; var C_RollUp=i; i++;
  A_Language[i] = 'D\351plier'; var C_Unfold=i; i++;
  // Options : General parameters
  A_Language[i] = 'Param\350tres g\351n\351raux'; var C_MainOption=i; i++;
  A_Language[i] = 'Afficher les nombres en kilo'; var C_ShowInKilo=i; i++;
  A_Language[i] = 'Afficher les secondes pour les mises \340 jour sup\351rieures \340 24h'; var C_ShowSecondForUpperUpdateTimeInDay=i; i++;
  A_Language[i] = 'Supprimer les liens \'officier\''; var C_DeleteOfficerLink=i; i++;
  A_Language[i] = 'Supprimer le lien \'marchand\''; var C_DeleteTraderLink=i; i++;
  A_Language[i] = 'Coordonn\351es'; var C_Coordinates=i; i++;
  A_Language[i] = 'Nom'; var C_Name=i; i++;
  A_Language[i] = 'Statut'; var C_Status=i; i++;
  A_Language[i] = 'Points'; var C_Points=i; i++;
  A_Language[i] = 'Adh\351sion'; var C_MemberShip=i; i++;
  A_Language[i] = 'En ligne'; var C_Online=i; i++;
  A_Language[i] = 'Mode par d\351faut du tri des membres de l\'alliance'; var C_SortMember=i; i++;
  A_Language[i] = 'Croissant'; var C_Increasing=i; i++;
  A_Language[i] = 'D\351croissant'; var C_Lessening=i; i++;
  A_Language[i] = 'Ordre par d\351faut du tri des membres de l\'alliance'; var C_SortOrder=i;i++;
  A_Language[i] = 'Ajouter les infos bulles de description aux liens'; var C_AddToolTip=i; i++;
  A_Language[i] = 'Afficher un message demandant la mise \340 jour de la page ressources si nouveau b\342timent la modifiant est construit'; var C_ShowRequestToUpdateResourcesPage=i; i++;
  A_Language[i] = 'Afficher un lien permettant de mise \340 jour automatique de toutes les pages'; var C_ShowAutoUpdate=i; i++;
  A_Language[i] = 'Utiliser un d\351lai variable pour le rafraichissement automatique des pages (entre 2 et 10s)'; var C_UseRandomUpdateTime=i; i++;
  A_Language[i] = 'Ajouter une image php de v\351rification de version \340 la barre en bas de page'; var C_AddImageVersion=i; i++;
  A_Language[i] = 'Activer l\'affichage des erreurs (D\351bogage)'; var C_Debug=i; i++;
  // Options : Display options
  A_Language[i] = 'Param\350tres d\'affichage'; var C_ScreenOption=i; i++;
  A_Language[i] = 'Afficher la liste d\351roulante de s\351lection des plan\350tes'; var C_ShowHeaderPlanetList=i; i++;
  A_Language[i] = 'Afficher le tableau des ressources par d\351faut'; var C_ShowHeaderResourcesList=i; i++;
  A_Language[i] = 'Ajouter le total au tableau des ressources par d\351faut'; var C_AddResourcesTotal=i; i++;
  A_Language[i] = 'Activer le changement de position du cadre de l\'ent\352te (liste d\351roulante de s\351lection des plan\350tes)'; var C_ChangeHeaderPosition=i; i++;
  A_Language[i] = 'Position du cadre contenant l\'ent\352te (en css)'; var C_HeaderPosition=i; i++;
  A_Language[i] = 'Afin de vous assurez que vous position soit bien pris en compte, vous pouvez ajouter \253!important\273 apr\350s votre position.'; var C_PositionInformations=i; i++;
  A_Language[i] = 'Activer le changement de position du cadre central'; var C_ChangeContentPosition=i; i++;
  A_Language[i] = 'Position du cadre central (en css)'; var C_ContentPosition=i; i++;
  A_Language[i] = 'Ajouter du code css sur l\'ensemble des pages'; var C_AddCssCode=i; i++;
  A_Language[i] = 'Supprimer le code css'; var C_RemoveCssCode=i; i++;
  A_Language[i] = 'Ajouter du code javascript sur l\'ensemble des pages'; var C_AddJSCode=i; i++;
  A_Language[i] = 'Supprimer le code javascript'; var C_RemoveJSCode=i; i++;
  A_Language[i] = 'Inscrivez ici votre code'; var C_WriteCode=i; i++;
  // Options : Resources table
  A_Language[i] = 'Tableau des ressources'; var C_ResourcesTableOption=i; i++;
  A_Language[i] = 'Afficher le tableau des ressources'; var C_ShowHeaderResourcesTable=i; i++;
  A_Language[i] = 'Afficher le nom de la plan\350te'; var C_ShowPlanetName=i; i++;
  A_Language[i] = 'Afficher les coordonn\351es'; var C_ShowCoordinates=i; i++;
  A_Language[i] = 'Afficher la colonne total'; var C_ShowTotal=i; i++;
  A_Language[i] = 'Afficher la colonne antimati\350re'; var C_ShowDarkMatter=i; i++;
  A_Language[i] = 'Afficher le temps depuis la derni\350re mise \340 jour'; var C_ShowTimeUpdate=i; i++;
  A_Language[i] = 'Afficher uniquement les ressources de la session active'; var C_ShowResourcesOnlyActiveSession=i; i++;
  A_Language[i] = 'Calculer les ressources en temps r\351el'; var C_RealTimeResources=i; i++;
  A_Language[i] = 'Intervalle en seconde entre chaque calcul'; var C_RealTimeResourcesDelay=i; i++;
  A_Language[i] = 'Style de l\'ent\352te de la plan\350te active (en css)'; var C_HeaderSelectedPlanetStyle=i; i++;
  A_Language[i] = 'Transparence des cellules contenant les ressources (1 \340 100)'; var C_Transparency=i; i++;
  A_Language[i] = 'Temps correspondant aux couleurs des graduations (en seconde) (couleur valide si le temps depuis la derni\350re mise \340 jour est inf\351rieure au temps saisi)'; var C_UpdateTimeColor=i; i++;
  A_Language[i] = 'Et rouge si le temps de la mise \340 jour est sup\351rieure.'; var C_UpdateTimeRed=i; i++;
  A_Language[i] = 'Activer le tri des plan\350tes'; var C_PlanetOrder=i; i++;
  A_Language[i] = 'Choisissez la plan\350te et utilisez les fl\350ches pour la d\351placer'; var C_PlanetOrderDescription=i; i++;
  // Options : Empire
  A_Language[i] = 'Afficher le menu empire'; var C_ShowEmpire=i; i++;
  A_Language[i] = 'Nom du lien dans le menu'; var C_EmpireLinkName=i; i++;
  A_Language[i] = 'Emplacement dans le menu o\371 sera inser\351 le lien vers le menu empire'; var C_EmpireMenuRow=i; i++;
  A_Language[i] = 'Taille en pixel des images repr\351sentant les plan\350tes'; var C_EmpireIconSize=i; i++;
  A_Language[i] = 'Cacher le tableau de ressources par d\351faut'; var C_HideDefaultResourcesTable=i; i++;
  A_Language[i] = 'Forcer l\'affichage du tableau des ressources g\351n\351r\351'; var C_ForceDisplayHeaderResourcesTableWithEmpire=i; i++;
  A_Language[i] = 'Choisissez le bloc et utilisez les fl\350ches pour le d\351placer'; var C_BlockOrderDescription=i; i++;
  // Options : Transfer
  A_Language[i] = 'Transfert'; var C_Transfer=i; i++;
  A_Language[i] = 'Utiliser les ressources en temps r\352el pour les calculs'; var C_UseRealTimeResources=i; i++;
  A_Language[i] = 'Forcer la mise \340 jour visuelle en temps r\351el du tableau des ressources (Utilisation importante du CPU)'; var C_ForceResourcesTransferTableUpdate=i; i++;
  A_Language[i] = 'Afficher le panneau de transfert si un transfert est en cours'; var C_ShowTransferTableIfActiveTransfer=i; i++;
  A_Language[i] = 'Coefficient multiplicateur de la vitesse des vaisseaux'; var C_TransferRatioSpeed=i; i++;
  // Options : Additional links
  A_Language[i] = 'Liens additionnels'; var C_LinkOption=i; i++;
  A_Language[i] = 'Nom du lien'; var C_LinkName=i; i++;
  A_Language[i] = 'Adresse du lien'; var C_LinkUrl=i; i++;
  A_Language[i] = 'Emplacement du lien dans le menu'; var C_LinkPosition=i; i++;
  A_Language[i] = 'Ouvrir dans une nouvelle fen\352tre le lien'; var C_LinkNewWindow=i; i++;
  A_Language[i] = 'Texte affich\351 au passage de la souris sur le lien (Affiche l\'adresse si vide)'; var C_LinkTitle=i; i++;
  A_Language[i] = 'Ajouter un lien'; var C_AddLink=i; i++;
  A_Language[i] = 'Lien n\260'; var C_LinkNumber=i; i++;
  A_Language[i] = 'Supprimer'; var C_Delete=i; i++;
  // Options
  A_Language[i] = 'Sauvegarder'; var C_Save=i; i++;
  A_Language[i] = 'Panneau de configuration'; var C_ControlPanel=i; i++;
  // Automatic update
  A_Language[i] = 'MAJ Start'; var C_StartUpdate=i; i++;
  A_Language[i] = 'MAJ Stop'; var C_StopUpdate=i; i++;
  A_Language[i] = 'Arr\352ter la mise \340 jour automatique'; var C_UpdateStopInformations=i; i++;
  A_Language[i] = 'Mise \340 jour automatique des pages m\351morisables'; var C_UpdateInformations=i; i++;
  // Resources table
  A_Language[i] = 'Plan\350te suivante'; var C_NextPlanet=i; i++;
  A_Language[i] = 'Plan\350te pr\351c\351dente'; var C_PreviousPlanet=i; i++;
  A_Language[i] = 'Actualiser la page actuelle de toutes les plan\350tes'; var C_UpdatePages=i; i++;
  // Empire
  A_Language[i] = 'Type'; var C_Type=i; i++;
  A_Language[i] = 'Nombre de cases'; var C_FieldNumber=i; i++;
  A_Language[i] = '\340'; var C_To=i; i++;
  A_Language[i] = 'Appliquer'; var C_Apply=i; i++;
  A_Language[i] = 'Image non m\351moris\351e'; var C_ImageNotSaved=i; i++;
  A_Language[i] = 'Informations g\351n\351rales'; var C_MainInformations=i; i++;
  A_Language[i] = 'Production horaire'; var C_HourProduction=i; i++;
  A_Language[i] = 'Production journali\350re'; var C_DayProduction=i; i++;
  A_Language[i] = 'B\342timents'; var C_BuildingsTxt=i; i++;
  A_Language[i] = 'D\351fense'; var C_DefensesTxt=i; i++;
  A_Language[i] = 'Recherche'; var C_ResearchTxt=i; i++;
  A_Language[i] = 'Flotte'; var C_FleetsTxt=i; i++;
  A_Language[i] = 'Liste'; var C_List=i; i++;
  A_Language[i] = 'Vaisseaux et d\351fenses en cours de construction'; var C_FleetsDefensesUC=i; i++;
  A_Language[i] = 'Allez \340 la page b\342timent'; var C_ToBuildings=i; i++;
  A_Language[i] = 'Allez au laboratoire'; var C_ToResearch=i; i++;
  A_Language[i] = 'Allez \340 la page d\351fense'; var C_ToDefenses=i; i++;
  A_Language[i] = 'Allez au chantier spatial'; var C_ToFleets=i; i++;
  A_Language[i] = 'Energie produite par satellite solaire'; var C_Ship212Production=i; i++;
  A_Language[i] = 'Nombre de satellites n\351cessaires'; var C_Ship212NecessaryNumber=i; i++;
  A_Language[i] = 'Construction possible'; var C_ConstructionAvailable=i; i++;
  A_Language[i] = 'Avec les ressources de la plan\350te'; var C_WithPlanetResources=i; i++;
  A_Language[i] = 'Avec les ressources de toutes les plan\350tes'; var C_WithAllPlanetsResources=i; i++;
  A_Language[i] = 'Une autre construction est d\351j\340 en cours sur cette plan\350te'; var C_OtherBuildingsInConstruction=i; i++;
  A_Language[i] = 'Une autre recheche est d\351j\340 en cours sur une de vos plan\350tes'; var C_OtherResearchInDevelopment=i; i++;
  A_Language[i] = 'Co\373t total de construction'; var C_TotalBuildingsCost=i; i++;
  A_Language[i] = 'Co\373t niveau'; var C_LevelCost1=i; i++;
  A_Language[i] = ''; var C_LevelCost2=i; i++;
  A_Language[i] = 'Arr\352ter la construction'; var C_StopBuildings=i; i++;
  A_Language[i] = 'Arr\352ter la recherche'; var C_StopResearch=i; i++;
  A_Language[i] = 'Lancer la construction'; var C_LaunchBuildings=i; i++;
  A_Language[i] = 'Lancer la recherche'; var C_LaunchResearch=i; i++;
  A_Language[i] = 'Construire les d\351fenses'; var C_BuildDefenses=i; i++;
  A_Language[i] = 'Construire les vaisseaux'; var C_BuildFleets=i; i++;
  A_Language[i] = 'Temps de construction'; var C_BuildingTime=i; i++;
  // Empire : Export
  A_Language[i] = 'Exporter'; var C_Export=i; i++;
  A_Language[i] = 'Options de g\351n\351ration'; var C_GeneratorOptions=i; i++;
  A_Language[i] = 'Centr\351'; var C_Center=i; i++;
  A_Language[i] = 'Texte en couleur'; var C_TextColored=i; i++;
  A_Language[i] = 'Pas de caract\350res sp\351ciaux'; var C_NoSpecialCharacter=i; i++;
  A_Language[i] = 'Tableau'; var C_LayoutInTable=i; i++;
  A_Language[i] = 'Centrer le texte du tableau'; var C_CenteredTextInTable=i; i++;
  A_Language[i] = 'Redimensionner le texte du tableau'; var C_ResizeTextInTable=i; i++;
  A_Language[i] = 'G\351n\351rer'; var C_Generate=i; i++;
  A_Language[i] = 'caract\350res'; var C_Characters=i; i++;
  // Transfer
  A_Language[i] = 'Transf\351rer les ressources'; var C_TransferResources=i; i++;
  A_Language[i] = 'Vous n\'avez saisi aucune ressource \340 envoyer.'; var C_NoResources=i; i++;
  A_Language[i] = 'Le transfert n\'est pas possible. Vous manquez de vaisseaux sur certaines plan\350tes.'; var C_NotEnoughShip1=i; i++;
  A_Language[i] = 'Si tous vos vaisseaux n\'ont pas \351t\351 pris en compte, revisitez les pages \253Flottes\273 \340 mettre \340 jour.'; var C_NotEnoughShip2=i; i++;
  A_Language[i] = 'Destination'; var C_Destination=i; i++;
  A_Language[i] = 'A Envoyer'; var C_ToTransfer=i; i++;
  A_Language[i] = 'Inverser la s\351lection'; var C_InvertSelection=i; i++;
  A_Language[i] = 'Envoy\351'; var C_Transfered=i; i++;
  A_Language[i] = 'Vitesse'; var C_Speed=i; i++;
  A_Language[i] = 'Recycleur n\351cessaire'; var C_NeededRecycler=i; i++;
  A_Language[i] = 'Etat de l\'envoi'; var C_TransferState=i; i++;
  A_Language[i] = 'GT'; var C_LargeCargoShip=i; i++; // Abbreviation of Large Cargo Ship
  A_Language[i] = 'PT'; var C_SmallCargoShip=i; i++; // Abbreviation of Small Cargo Ship
  A_Language[i] = 'Vous ne pouvez pas envoyer de ressources \340 partir de la plan\350te de destination.'; var C_NoTransferFromDestinationPlanet=i; i++;
  A_Language[i] = 'Vous n\'avez aucun recycleur.'; var C_NoRecycler=i; i++;
  A_Language[i] = 'Vous n\'avez pas assez de grands transporteurs.'; var C_NotEnoughLargeCargoShip=i; i++;
  A_Language[i] = 'Vous n\'avez pas assez de petits transporteurs.'; var C_NotEnoughSmallCargoShip=i; i++;
  A_Language[i] = 'Les ressources ont d\351j\340 \351t\351 envoy\351es'; var C_AlreadyTransfered=i; i++;
  A_Language[i] = 'La plan\350te n\'a pas \351t\351 s\351lectionn\351e lors du calcul.'; var C_PlanetNotSelected=i; i++;
  A_Language[i] = 'Aucune m\351morisation n\'a \351t\351 fa\356te.'; var C_NoTransfer=i; i++;
  A_Language[i] = 'Col. \340 utiliser'; var C_ColonyToBeUsed=i; i++;
  A_Language[i] = 'Autre destination'; var C_OtherDestination=i; i++;
  A_Language[i] = 'Entrez les ressources n\351cessaires pour le transfert'; var C_NeededResources=i; i++;
  A_Language[i] = 'Reste'; var C_Rest=i; i++;
  A_Language[i] = 'M\351tal \340 envoyer'; var C_MetalToBeSent=i; i++;
  A_Language[i] = 'Cristal \340 envoyer'; var C_CrystalToBeSent=i; i++;
  A_Language[i] = 'Deuterium \340 envoyer'; var C_DeuteriumToBeSent=i; i++;
  A_Language[i] = 'Dur\351e de vol'; var C_FlightTime=i; i++;
  A_Language[i] = 'Vitesse d\'envoi'; var C_SendingSpeed=i; i++;
  A_Language[i] = 'Carburant consomm\351'; var C_DeuteriumConsumption=i; i++;
  A_Language[i] = 'GT ou PT \340 envoyer'; var C_TransportShipNumber=i; i++;
  A_Language[i] = 'Options de calcul'; var C_TransferCalcOption=i; i++;
  A_Language[i] = 'Mode de calcul'; var C_CalcMode=i; i++;
  A_Language[i] = 'Utiliser les plan\350tes ayant le plus de ressources (Reste similaire sur chaque plan\350te apr\350s transfert)'; var C_SameRest=i; i++;
  A_Language[i] = 'Utiliser la m\352me quantit\351 de ressources sur chaque plan\350te'; var C_SameQuantity=i; i++;
  A_Language[i] = 'Utiliser les ressources de la plan\350te de destination en priorit\351'; var C_UseTotalResourcesDestinationPlanet=i; i++;
  A_Language[i] = 'Temps de vol le plus proche possible'; var C_SameTime=i; i++;
  A_Language[i] = 'Le plus rapide possible'; var C_Fastest=i; i++;
  A_Language[i] = 'Date d\'arriv\351e'; var C_ArrivalDate=i; i++;
  A_Language[i] = 'Ann\351e'; var C_Year=i; i++;
  A_Language[i] = 'Mois'; var C_Month=i; i++;
  A_Language[i] = 'Jour'; var C_Day=i; i++;
  A_Language[i] = 'Heure'; var C_Hour=i; i++;
  A_Language[i] = 'Minute'; var C_Minute=i; i++;
  A_Language[i] = 'Jour(s)'; var C_Days=i; i++;
  A_Language[i] = 'Heure(s)'; var C_Hours=i; i++;
  A_Language[i] = 'Minute(s)'; var C_Minutes=i; i++;
  A_Language[i] = 'j'; var C_DayAbbreviation=i; i++;
  A_Language[i] = 'h'; var C_HourAbbreviation=i; i++;
  A_Language[i] = 'm'; var C_MinuteAbbreviation=i; i++;
  A_Language[i] = 's'; var C_SecondAbbreviation=i; i++;
  A_Language[i] = 'Ajouter 1 recycleur si n\351cessaire pour affiner le temps de vol'; var C_AddRecycler=i; i++;
  A_Language[i] = 'Vaisseaux de transport'; var C_TransportShip=i; i++;
  A_Language[i] = 'M\351moriser le transfert'; var C_SaveTransfer=i; i++;
  A_Language[i] = 'Annuler le transfert'; var C_CancelTransfer=i; i++;
  A_Language[i] = 'Remplir les vaisseaux'; var C_FillShip=i; i++;
  A_Language[i] = 'Des plan\350tes non memoris\351es ont \351\351 trouv\351es, merci de les visiter au moins une fois.'; var C_UnsavedPlanets=i; i++;
  A_Language[i] = 'Remplir les coordonn\351es et la vitesse'; var C_FillCoordinatesAndSpeed=i; i++;
  A_Language[i] = 'Remplir les ressources'; var C_FillResources=i; i++;
  A_Language[i] = 'Continuer'; var C_Continue=i; i++;
  // Other
  A_Language[i] = 'La construction d\'un b\342timent modifiant les valeurs de la page ressources vient de se terminer,\n\nVoulez-vous mettre \340 jour la page ressources maintenant?'; var C_ResourcesBuildingsUC=i; i++;
  A_Language[i] = 'Temps d\'ex\351cution'; var C_RunTime=i; i++;
  // Welcome message
  A_Language[i] = 'Bienvenue dans la nouvelle version de \253'+C_ScriptName+'\273 (version: '+C_ScriptVersion+', build: '+C_ScriptBuild+')\n\nTraduction allemand : Dhu\nTraduction espagnol : ETintos\nTraduction italien : Fiox\nTraduction n\351erlandaise : Frutelaken\nTraduction portuguaise : Spac3h\nMerci \340 tous les b\352ta-testeurs.\n\n'+
  'Pour cette version, la plupart du code a \351t\351 r\351\351crit, il est donc conseill\351 de lancer une actualisation automatique des pages \340 la suite de ce message.\n\n'+
  'Juste apr\350s votre clic sur OK, le script chargera la page des technologies pour m\351moriser le nom de chaque construction.\n\n'+
  'Pour voir les modifications de cette version, allez \340 la section nomm\351e \253DESCRIPTION DES MISES A JOUR\273 dans le script'; var C_NewVersion=i; i++;
  A_Language[i] = 'Bienvenue dans la nouvelle version de \253'+C_ScriptName+'\273 (version: '+C_ScriptVersion+', build: '+C_ScriptBuild+')\n\nTraduction allemand : Dhu\nTraduction espagnol : ETintos\nTraduction italien : Fiox\nTraduction n\351erlandaise : Frutelaken\nTraduction portuguaise : Spac3h\nMerci \340 tous les b\352ta-testeurs.\n\n'+
  'Pour voir les modifications de cette version, allez \340 la section nomm\351e \253DESCRIPTION DES MISES A JOUR\273 dans le script'; var C_NewBuild=i; i++;
}
else if (Language == 2) { // IT
  // For accented character, use unicode or octal code to replace it, use this link (http://www.vbc3.com/script/unicode_octal_html_code.php)
  i = 0;
  A_Language[i] = 'Pianeta'; i++;
  A_Language[i] = 'Luna'; i++;
  A_Language[i] = 'Metallo'; var C_Metal=i; i++;
  A_Language[i] = 'Cristallo'; var C_Crystal=i; i++;
  A_Language[i] = 'Deuterio'; var C_Deuterium=i; i++;
  A_Language[i] = 'Energia'; var C_Energy=i; i++;
  A_Language[i] = 'Materia Oscura'; var C_DarkMatter=i; i++;
  A_Language[i] = 'Impero'; var C_Empire=i; i++;
  A_Language[i] = 'Risorse'; var C_Resources=i; i++;
  A_Language[i] = 'Update'; var C_Update=i; i++;
  A_Language[i] = 'Si'; var C_Yes=i; i++;
  A_Language[i] = 'No'; var C_No=i; i++;
  A_Language[i] = 'Visualizza'; var C_Show=i; i++;
  A_Language[i] = 'Nascondi'; var C_Hide=i; i++;
  // Required text for analysis, include spaces, must be exact
  A_Language[i] = 'Diametro'; var C_Diameter=i; i++; // Overview page
  A_Language[i] = 'Temperatura'; var C_Temperature=i; i++; // Overview page
  A_Language[i] = 'Somma'; var C_Total=i; i++; // Name of total in resources page
  A_Language[i] = 'Risorse su'; var C_ResourcesTableHeader=i; i++; // Beginning of the first row from the resources table (resources page) 
  A_Language[i] = 'Requisiti'; var C_Require=i; i++; // First word of the right cell in tree technology table 
  A_Language[i] = 'Fattore di produzione:'; var C_ProductionRate=i; i++; // Text before production rate number in resources page
  // ValidateBuilding
  A_Language[i] = 'Numero si spazi liberi insufficinte'; var C_NotEnoughFreeField=i; i++;
  A_Language[i] = 'L\' avamposto lunare non pu\362 esser costruito ancora'; var C_LunarBaseNotBuilt=i; i++;
  A_Language[i] = 'Costruzione impossibile sul pianeta'; var C_NotOnPlanet=i; i++;
  A_Language[i] = 'Costruzione impossibile sulla luna'; var C_NotOnMoon=i; i++;
  // AddLink
  A_Language[i] = 'Key words :\n\nAlcune parti dell\'indirizzo o dei link possono esser sostituiti da keywords.\n\n'+
  '[session] Restituisce l\' IDentificatore della sessione attiva di ogame\n'+
  '[host] Ogame Restituisce il campo della sessione attiva\n'+
  '[Nome Pianeta] Restituisce l\' identificatore del pianeta nella sessione corrente\n\n'+
  'Es: creazione di un link alla pagina \'overview\' del pianeta chiamato \253Colonia\273 :\n'+
  'http://[host]/game/index.php?page=overview&session=[session]&cp=[Colonia]\n\n'+
  'Diventa (se ad es. tu stai in uni 10 it) :\n'+
  'http://uni10.ogame.it/game/index.php?page=overview&session=2943046dc47f&cp=34317957'; var C_KeyWordsInformations=i; i++;
  // SaveParameter
  A_Language[i] = 'Il valore di trasparenza non e\' corretto.\nIl valore deve essere compreso fra 1 e 100'; var C_TransparencyError=i; i++;
  A_Language[i] = 'Il numero di linee del menu Impero non e\' corretto.\nIl valore deve essere compreso fra 1 e '; var C_EmpireRowError=i; i++;
  A_Language[i] = 'Il nome delle linee del menu Impero deve contenere almeno un carattere.'; var C_EmpireTxtError=i; i++;
  A_Language[i] = 'Le dimensioni delle icone dei pianeti del menu Impero devono essere di almeno 1 pixel.'; var C_EmpireSizeIconError=i; i++;
  A_Language[i] = 'Il link'; var C_LinkPositionError1=i; i++;
  A_Language[i] = ' non puo\' esser salvato\nVerificare il nome, il link o l\'indirizzo del vostro link.\nLa posizione del link deve essere compreso fra 1 e '; var C_LinkPositionError2=i; i++;
  A_Language[i] = 'Le informazioni verranno correttamente salvate\nAlla fine delle correzioni, la pagina non sara\'aggiornata.'; var C_SaveParameterError=i; i++;
  // ShowHideTable
  A_Language[i] = 'Ripiega'; var C_RollUp=i; i++;
  A_Language[i] = 'Espandi'; var C_Unfold=i; i++;
  // Options : General parameters
  A_Language[i] = 'Parametri generali'; var C_MainOption=i; i++;
  A_Language[i] = 'Visualizza i numeri in kilo'; var C_ShowInKilo=i; i++;
  A_Language[i] = 'Visualizza i secondi per l\'aggiornamento'; var C_ShowSecondForUpperUpdateTimeInDay=i; i++;
  A_Language[i] = 'Cancella Links \'ufficiali\''; var C_DeleteOfficerLink=i; i++;
  A_Language[i] = 'Cancella Links \'mercante\''; var C_DeleteTraderLink=i; i++;
  A_Language[i] = 'Coordinate'; var C_Coordinates=i; i++;
  A_Language[i] = 'Nome'; var C_Name=i; i++;
  A_Language[i] = 'Stato'; var C_Status=i; i++;
  A_Language[i] = 'Punti'; var C_Points=i; i++;
  A_Language[i] = 'Adesione'; var C_MemberShip=i; i++;
  A_Language[i] = 'Online'; var C_Online=i; i++;
  A_Language[i] = 'Ordine di default della lista membri dell\' alleanza'; var C_SortMember=i; i++;
  A_Language[i] = 'Crescente'; var C_Increasing=i; i++;
  A_Language[i] = 'Decrescente'; var C_Lessening=i; i++;
  A_Language[i] = 'Riordina i membri dell\'ally'; var C_SortOrder=i;i++;
  A_Language[i] = 'Aggiungi tooltip a tutti i link'; var C_AddToolTip=i; i++;
  A_Language[i] = 'Avverti, con un messaggio, la necessita\' di aggiornare le risorse dopo una costruzione'; var C_ShowRequestToUpdateResourcesPage=i; i++;
  A_Language[i] = 'Visualizza un link che permetta l\'aggiornamento automatico di tutte le pagine'; var C_ShowAutoUpdate=i; i++;
  A_Language[i] = 'Usa un tempo random per l\'autoaggiornamento automatico delle pagine (tra 2 e 10s)'; var C_UseRandomUpdateTime=i; i++;
  A_Language[i] = 'Aggiungi una immagine di controllo della versione, per gli aggiornamenti, nella barra alla fine della pagina'; var C_AddImageVersion=i; i++;
  A_Language[i] = 'Attiva la visualizzazione degli errori (Debugging)'; var C_Debug=i; i++;
  // Options : Display options
  A_Language[i] = 'Parametri di visualizzazione'; var C_ScreenOption=i; i++;
  A_Language[i] = 'Visualizza elenco a discesa dei pianeti'; var C_ShowHeaderPlanetList=i; i++;
  A_Language[i] = 'Visualizza la tabella delle risorse di default'; var C_ShowHeaderResourcesList=i; i++;
  A_Language[i] = 'Visualizza la tabella di default risorse'; var C_AddResourcesTotal=i; i++;
  A_Language[i] = 'Attiva la possibilita\' di cambiare la posizione dell\' header frame (Elenco a discesa dei pianeti)'; var C_ChangeHeaderPosition=i; i++;
  A_Language[i] = 'Posizione dell\' header (in css)'; var C_HeaderPosition=i; i++;
  A_Language[i] = 'Per esser sicuro della tua posizione, considera di poter aggiungere, per esempio, \253!importante\273 per avere un riferimento.'; var C_PositionInformations=i; i++;
  A_Language[i] = 'Attiva la possibilita\' di cambiare la posizione del main frame'; var C_ChangeContentPosition=i; i++;
  A_Language[i] = 'Posizione del main frame (in css)'; var C_ContentPosition=i; i++;
  A_Language[i] = 'Aggiunge codice CSS in tutte le pagine'; var C_AddCssCode=i; i++;
  A_Language[i] = 'Rimuoce CSS code'; var C_RemoveCssCode=i; i++;
  A_Language[i] = 'Aggiunge codice JavaScript in tutte le pagine'; var C_AddJSCode=i; i++;
  A_Language[i] = 'Rimuove JavaScript code'; var C_RemoveJSCode=i; i++;
  A_Language[i] = 'Inserisci il tuo codice'; var C_WriteCode=i; i++;
  // Options : Resources table
  A_Language[i] = 'Tabella risorse'; var C_ResourcesTableOption=i; i++;
  A_Language[i] = 'Visualizza la Tabella risorse'; var C_ShowHeaderResourcesTable=i; i++;
  A_Language[i] = 'Visualizza i nomi dei pianeti'; var C_ShowPlanetName=i; i++;
  A_Language[i] = 'Visualizza le coordinate'; var C_ShowCoordinates=i; i++;
  A_Language[i] = 'Visualizza il totale nella colonna'; var C_ShowTotal=i; i++;
  A_Language[i] = 'Visualizza la materia oscura nella colonna'; var C_ShowDarkMatter=i; i++;
  A_Language[i] = 'Visualizza il tempo trascorso dall\'ultimo aggiornamento'; var C_ShowTimeUpdate=i; i++;
  A_Language[i] = 'Visualizza solo le risorse della sessione attiva'; var C_ShowResourcesOnlyActiveSession=i; i++
  A_Language[i] = 'Calcola le risorse in tempo reale'; var C_RealTimeResources=i; i++;
  A_Language[i] = 'Intervallo in secondi tra ogni calcolo'; var C_RealTimeResourcesDelay=i; i++;
  A_Language[i] = 'Stile di visualizzazione del pianeta corrente, header (in css)'; var C_HeaderSelectedPlanetStyle=i; i++;
  A_Language[i] = 'Trasparenza delle celle contenenti le risorse (1 to 100)'; var C_Transparency=i; i++;
  A_Language[i] = 'Tempo trascorso, corrispondente alla gradazione di colore (in seconi) (Colore valido se il tempo, dal momento dell\'ultimo aggiornamento \350 inferiore al tempo di entrata)'; var C_UpdateTimeColor=i; i++;
  A_Language[i] = 'E rosso, se il tempo di aggiornamento \350 superiore.'; var C_UpdateTimeRed=i; i++;
  A_Language[i] = 'Attiva il riordine dei pianeti'; var C_PlanetOrder=i; i++;
  A_Language[i] = 'Seleziona un pianeta o usa le frecce per cambiarne la posizione'; var C_PlanetOrderDescription=i; i++;
  // Options : Empire
  A_Language[i] = 'Visualizza il menu Impero'; var C_ShowEmpire=i; i++;
  A_Language[i] = 'Nome del link nel menu'; var C_EmpireLinkName=i; i++;
  A_Language[i] = 'Posizione del link al menu Impero'; var C_EmpireMenuRow=i; i++;
  A_Language[i] = 'Dimensione in pixel delle immagini dei pianeti'; var C_EmpireIconSize=i; i++;
  A_Language[i] = 'Nascondi la tabella delle risorse di default'; var C_HideDefaultResourcesTable=i; i++;
  A_Language[i] = 'Forza la visualizzazione delle risorse generate nella tabella'; var C_ForceDisplayHeaderResourcesTableWithEmpire=i; i++;
  A_Language[i] = 'Seleziona un blocco o usa le frecce per cambiarne la posizione'; var C_BlockOrderDescription=i; i++;
  // Options : Transfer
  A_Language[i] = 'Trasferimento'; var C_Transfer=i; i++;
  A_Language[i] = 'Usa il calcolo delle risorse in tempo reale'; var C_UseRealTimeResources=i; i++;
  A_Language[i] = 'Forza la visualizzazione in real-time dell\'aggiornamento in tabella risorse (Important CPU usage)'; var C_ForceResourcesTransferTableUpdate=i; i++;
  A_Language[i] = 'Visualizza la tabella trasferimento se qualche trasferimento e\' attivo'; var C_ShowTransferTableIfActiveTransfer=i; i++;
  A_Language[i] = 'Speed ship ratio multiplier'; var C_TransferRatioSpeed=i; i++;
  // Options : Additional links
  A_Language[i] = 'Link addizionali'; var C_LinkOption=i; i++;
  A_Language[i] = 'Nome del link'; var C_LinkName=i; i++;
  A_Language[i] = 'Indirizzo del link'; var C_LinkUrl=i; i++;
  A_Language[i] = 'Posizione del link nel menu'; var C_LinkPosition=i; i++;
  A_Language[i] = 'Apri il link in una nuova finestra'; var C_LinkNewWindow=i; i++;
  A_Language[i] = 'Testo evidenziato al passaggio del mouse'; var C_LinkTitle=i; i++;
  A_Language[i] = 'Add link'; var C_AddLink=i; i++;
  A_Language[i] = 'Link n\260'; var C_LinkNumber=i; i++;
  A_Language[i] = 'Cancella'; var C_Delete=i; i++;
  // Options
  A_Language[i] = 'Salva'; var C_Save=i; i++;
  A_Language[i] = 'Control panel'; var C_ControlPanel=i; i++;
  // Automatic update
  A_Language[i] = 'Update Start'; var C_StartUpdate=i; i++;
  A_Language[i] = 'Update Stop'; var C_StopUpdate=i; i++;
  A_Language[i] = 'Arresta Update automatico'; var C_UpdateStopInformations=i; i++;
  A_Language[i] = 'Aggiornamento automatico delle pagine memorizzate'; var C_UpdateInformations=i; i++;
  // Resources table
  A_Language[i] = 'Prossimo pianeta'; var C_NextPlanet=i; i++;
  A_Language[i] = 'Pianeta precedente'; var C_PreviousPlanet=i; i++;
  A_Language[i] = 'Refresh della pagina corrente e di tutti i pianeti'; var C_UpdatePages=i; i++;
  // Empire
  A_Language[i] = 'Tipo'; var C_Type=i; i++;
  A_Language[i] = 'Numero di spazi'; var C_FieldNumber=i; i++;
  A_Language[i] = 'a'; var C_To=i; i++;
  A_Language[i] = 'Applica'; var C_Apply=i; i++;
  A_Language[i] = 'Immagine non memorizzata'; var C_ImageNotSaved=i; i++;
  A_Language[i] = 'Informazioni generali'; var C_MainInformations=i; i++;
  A_Language[i] = 'Produzione oraria'; var C_HourProduction=i; i++;
  A_Language[i] = 'Produzione quotidiana'; var C_DayProduction=i; i++;
  A_Language[i] = 'Costruzioni'; var C_BuildingsTxt=i; i++;
  A_Language[i] = 'Difesa'; var C_DefensesTxt=i; i++;
  A_Language[i] = 'Ricerca'; var C_ResearchTxt=i; i++;
  A_Language[i] = 'Flotte'; var C_FleetsTxt=i; i++;
  A_Language[i] = 'Lista'; var C_List=i; i++;
  A_Language[i] = 'Navi e difese in costruzione'; var C_FleetsDefensesUC=i; i++;
  A_Language[i] = 'Vai a costruzioni'; var C_ToBuildings=i; i++;
  A_Language[i] = 'Vai a ricerca'; var C_ToResearch=i; i++;
  A_Language[i] = 'Vai a difesa'; var C_ToDefenses=i; i++;
  A_Language[i] = 'Vai a cantiere spaziale'; var C_ToFleets=i; i++;
  A_Language[i] = 'Energia dai satelliti solari'; var C_Ship212Production=i; i++;
  A_Language[i] = 'Num. di satelliti necessari'; var C_Ship212NecessaryNumber=i; i++;
  A_Language[i] = 'Costruzione possibile'; var C_ConstructionAvailable=i; i++;
  A_Language[i] = 'Con le risorse del pianeta fra'; var C_WithPlanetResources=i; i++;
  A_Language[i] = 'Con le risorse di tutti i pianeti fra'; var C_WithAllPlanetsResources=i; i++;
  A_Language[i] = 'Un\'altra costruzione in corso sul pianeta'; var C_OtherBuildingsInConstruction=i; i++;
  A_Language[i] = 'Un\'altra ricerca in corso su uno dei pianeti'; var C_OtherResearchInDevelopment=i; i++;
  A_Language[i] = 'Risorse impiegate'; var C_TotalBuildingsCost=i; i++;
  A_Language[i] = 'Il livello'; var C_LevelCost1=i; i++;
  A_Language[i] = ' richiede'; var C_LevelCost2=i; i++;
  A_Language[i] = 'Arresta la costruzione'; var C_StopBuildings=i; i++;
  A_Language[i] = 'Arresta la ricerca'; var C_StopResearch=i; i++;
  A_Language[i] = 'Lancia la costruzione'; var C_LaunchBuildings=i; i++;
  A_Language[i] = 'Lancia la ricerca'; var C_LaunchResearch=i; i++;
  A_Language[i] = 'Costruire difese'; var C_BuildDefenses=i; i++;
  A_Language[i] = 'Costruzione Navi'; var C_BuildFleets=i; i++;
  A_Language[i] = 'Tempo di produzione'; var C_BuildingTime=i; i++;
  // Empire : Export
  A_Language[i] = 'Esporta'; var C_Export=i; i++;
  A_Language[i] = 'Generatore opzioni'; var C_GeneratorOptions=i; i++;
  A_Language[i] = 'Centrato'; var C_Center=i; i++;
  A_Language[i] = 'Text in color'; var C_TextColored=i; i++;
  A_Language[i] = 'Senza caratteri speciali'; var C_NoSpecialCharacter=i; i++;
  A_Language[i] = 'In tabella'; var C_LayoutInTable=i; i++;
  A_Language[i] = 'Centre the text of table'; var C_CenteredTextInTable=i; i++;
  A_Language[i] = 'Resize the text of table'; var C_ResizeTextInTable=i; i++;
  A_Language[i] = 'Genera'; var C_Generate=i; i++;
  A_Language[i] = 'caratteri'; var C_Characters=i; i++;
  // Transfer
  A_Language[i] = 'Trasferimento Risorse'; var C_TransferResources=i; i++;
  A_Language[i] = 'Non hai risorse da inviare.'; var C_NoResources=i; i++;
  A_Language[i] = 'Il trasferimento e\' impossibile. Non hai flotta sui pianeti.'; var C_NotEnoughShip1=i; i++;
  A_Language[i] = 'Dovresti rivisitare la pagina di tutti i pianeti per aggiornare il numero delle navi.'; var C_NotEnoughShip2=i; i++;
  A_Language[i] = 'Destinazione'; var C_Destination=i; i++;
  A_Language[i] = 'Da inviare'; var C_ToTransfer=i; i++;
  A_Language[i] = 'Inviato'; var C_Transfered=i; i++;
  A_Language[i] = 'Invertire la selezione'; var C_InvertSelection=i; i++;
  A_Language[i] = 'Velocit\340'; var C_Speed=i; i++;
  A_Language[i] = 'Riciclatrici ?'; var C_NeededRecycler=i; i++;
  A_Language[i] = 'Stato dell\'invio'; var C_TransferState=i; i++;
  A_Language[i] = 'CP'; var C_LargeCargoShip=i; i++; // Abbreviation of Large Cargo Ship
  A_Language[i] = 'CL'; var C_SmallCargoShip=i; i++; // Abbreviation of Small Cargo Ship
  A_Language[i] = 'Non puoi inviare risorse dal pianeta di destinazione.'; var C_NoTransferFromDestinationPlanet=i; i++;
  A_Language[i] = 'Non hai nessuna riciclatrice.'; var C_NoRecycler=i; i++;
  A_Language[i] = 'Non hai abbastanza cargo pesanti.'; var C_NotEnoughLargeCargoShip=i; i++;
  A_Language[i] = 'Non hai abbastanza cargo leggeri.'; var C_NotEnoughSmallCargoShip=i; i++;
  A_Language[i] = 'Le risorse son gia\' state inviate'; var C_AlreadyTransfered=i; i++;
  A_Language[i] = 'Il pianeta non e\' stato incluso nel calcolo.'; var C_PlanetNotSelected=i; i++;
  A_Language[i] = 'Nessuna memorizzazione dati.'; var C_NoTransfer=i; i++;
  A_Language[i] = 'Colonia selezionata'; var C_ColonyToBeUsed=i; i++;
  A_Language[i] = 'Altra destinazione'; var C_OtherDestination=i; i++;
  A_Language[i] = 'Introduci le risorse necessarie allo trasferimento'; var C_NeededResources=i; i++;
  A_Language[i] = 'Restano'; var C_Rest=i; i++;
  A_Language[i] = 'Metallo da inviare'; var C_MetalToBeSent=i; i++;
  A_Language[i] = 'Cristallo da inviare'; var C_CrystalToBeSent=i; i++;
  A_Language[i] = 'Deuterio da inviare'; var C_DeuteriumToBeSent=i; i++;
  A_Language[i] = 'Durata del volo'; var C_FlightTime=i; i++;
  A_Language[i] = 'Velocit\340 di invio'; var C_SendingSpeed=i; i++;
  A_Language[i] = 'Carburante consumato'; var C_DeuteriumConsumption=i; i++;
  A_Language[i] = 'Cl o Cp da inviare'; var C_TransportShipNumber=i; i++;
  A_Language[i] = 'Opzioni di calcolo'; var C_TransferCalcOption=i; i++;
  A_Language[i] = 'Modalita\' di calcolo'; var C_CalcMode=i; i++;
  A_Language[i] = 'Usa i pianeti che hanno pi\371 risorse'; var C_SameRest=i; i++;
  A_Language[i] = 'Usa la stessa quantit\340 di risorse per tutti i pianeti'; var C_SameQuantity=i; i++;
  A_Language[i] = 'Usa prima le risorse del pianeta di destinazione'; var C_UseTotalResourcesDestinationPlanet=i; i++;
  A_Language[i] = 'Tempo di volo il pi\371 breve possibile'; var C_SameTime=i; i++;
  A_Language[i] = 'Il pi\371 veloce possibile'; var C_Fastest=i; i++;
  A_Language[i] = 'Data di arrivo'; var C_ArrivalDate=i; i++;
  A_Language[i] = 'Anno'; var C_Year=i; i++;
  A_Language[i] = 'Mese'; var C_Month=i; i++;
  A_Language[i] = 'Giorno'; var C_Day=i; i++;
  A_Language[i] = 'Ora'; var C_Hour=i; i++;
  A_Language[i] = 'Minuto'; var C_Minute=i; i++;
  A_Language[i] = 'Giorno(i)'; var C_Days=i; i++;
  A_Language[i] = 'Ora(e)'; var C_Hours=i; i++;
  A_Language[i] = 'Minuto(i)'; var C_Minutes=i; i++;
  A_Language[i] = 'g'; var C_DayAbbreviation=i; i++;
  A_Language[i] = 'h'; var C_HourAbbreviation=i; i++;
  A_Language[i] = 'm'; var C_MinuteAbbreviation=i; i++;
  A_Language[i] = 's'; var C_SecondAbbreviation=i; i++;
  A_Language[i] = 'Aggiungi una riciclatrice s\350 necessario, per affinare il tempo di volo'; var C_AddRecycler=i; i++;
  A_Language[i] = 'Cargo'; var C_TransportShip=i; i++;
  A_Language[i] = 'Memorizza il trasferimento'; var C_SaveTransfer=i; i++;
  A_Language[i] = 'Annulla il trasferimento'; var C_CancelTransfer=i; i++;
  A_Language[i] = 'Riempi i cargo'; var C_FillShip=i; i++;
  A_Language[i] = 'Alcuni pianeti non son stati memorizzati.'; var C_UnsavedPlanets=i; i++;
  A_Language[i] = 'Riempire i campi con coordinate e velocit\340'; var C_FillCoordinatesAndSpeed=i; i++;
  A_Language[i] = 'Riempire con risorse'; var C_FillResources=i; i++;
  A_Language[i] = 'Procedi'; var C_Continue=i; i++;
  // Other
  A_Language[i] = 'La costruzione, modifica i valori delle risorse disponibili,\n\nVuoi aggiornare la pagina Risorse ora?'; var C_ResourcesBuildingsUC=i; i++;
  A_Language[i] = 'Tempo d\'esecuzione'; var C_RunTime=i; i++;
  // Welcome message
  A_Language[i] = 'Welcome to the new version of \253'+C_ScriptName+'\273 (version: '+C_ScriptVersion+', build: '+C_ScriptBuild+')\n\nDutch translation : by Frutelaken\nGerman translation : by Dhu\nItalian translation : by Fiox\nPortuguese translation : by Spac3h\nSpanish translation : By ETintos\nThanks to all beta tester.\n\n'+
  'For this version, most of the code were rewritten, it is thus advised to launch an automatic updating of pages from your account following this message.\n\n'+
  'Just after your click on OK, the script will load the tree technology page to get the name of each construction.\n\n'+
  'To see the changes about this version, go to the section named \253DESCRIPTION DES MISES A JOUR\273 in the script (Only in french).'; var C_NewVersion=i; i++;
  A_Language[i] = 'Welcome to the new version of \253'+C_ScriptName+'\273 (version: '+C_ScriptVersion+', build: '+C_ScriptBuild+')\n\nDutch translation : by Frutelaken\nGerman translation : by Dhu\nItalian translation : by Fiox\nPortuguese translation : by Spac3h\nSpanish translation : By ETintos\nThanks to all beta tester.\n\n'+
  'To see the changes about this version, go to the section named \253DESCRIPTION DES MISES A JOUR\273 in the script (Only in french).'; var C_NewBuild=i; i++;
}
else if (Language == 3) { // NL
  // For accented character, use unicode or octal code to replace it, use this link (http://www.vbc3.com/script/unicode_octal_html_code.php)
  i = 0;
  A_Language[i] = 'Planeet'; i++;
  A_Language[i] = 'Maan'; i++;
  A_Language[i] = 'Metaal'; var C_Metal=i; i++;
  A_Language[i] = 'Kristal'; var C_Crystal=i; i++;
  A_Language[i] = 'Deuterium'; var C_Deuterium=i; i++;
  A_Language[i] = 'Energie'; var C_Energy=i; i++;
  A_Language[i] = 'Donkere Materie'; var C_DarkMatter=i; i++;
  A_Language[i] = 'Empire'; var C_Empire=i; i++;
  A_Language[i] = 'Diameter'; var C_Diameter=i; i++;
  A_Language[i] = 'Temperatuur'; var C_Temperature=i; i++;
  A_Language[i] = 'Totaal'; var C_Total=i; i++;
  A_Language[i] = 'Grondstoffen'; var C_Resources=i; i++;
  A_Language[i] = 'Update'; var C_Update=i; i++;
  A_Language[i] = 'Ja'; var C_Yes=i; i++;
  A_Language[i] = 'Nee'; var C_No=i; i++;
  A_Language[i] = 'Toon'; var C_Show=i; i++;
  A_Language[i] = 'Verberg'; var C_Hide=i; i++;
  // Required text for analysis, include spaces, must be exact
  A_Language[i] = 'Grondstoffen op planeet'; var C_ResourcesTableHeader=i; i++; // Beginning of the first row from the resources table (resources page) 
  A_Language[i] = 'Benodigd'; var C_Require=i; i++; // First word of the right cell in tree technology table 
  A_Language[i] = 'Productie factor:'; var C_ProductionRate=i; i++; // Text before production rate number in resources page
  // ValidateBuilding
  A_Language[i] = 'Planeet volledig vol gebouwd '; var C_NotEnoughFreeField=i; i++;
  A_Language[i] = 'Er is geen maanbasis gebouwd'; var C_LunarBaseNotBuilt=i; i++;
  A_Language[i] = 'Niet mogelijk op planeet'; var C_NotOnPlanet=i; i++;
  A_Language[i] = 'Niet mogelijk op maan'; var C_NotOnMoon=i; i++;
  // AddLink
  A_Language[i] = 'Key words :\n\nSome part of the address can be replaced by keywords.\n\n'+
  '[session] To get the id of the current session\n'+
  '[host] To get the domain of the ogame universe\n'+
  '[Planet name] To get the id of one of your planets\n\n'+
  'Ex: Creation of a link to the \'overview\' page of the planet named \253Homeworld\273 :\n'+
  'http://[host]/game/index.php?page=overview&session=[session]&cp=[Homeworld]\n\n'+
  'Become (for universe 10) :\n'+
  'http://uni10.ogame.org/game/index.php?page=overview&session=2943046dc47f&cp=34317957'; var C_KeyWordsInformations=i; i++;
  // SaveParameter
  A_Language[i] = 'Fout in de waarde van doorzichtigheid. Deze moet tussen 1 en 100 liggen'; var C_TransparencyError=i; i++;
  A_Language[i] = 'De waarde van de Empire rij is niet correct. Deze moet tussen 1 en liggen '; var C_EmpireRowError=i; i++;
  A_Language[i] = 'De naam van de Empire link moet minstens 1 karakter bevatten'; var C_EmpireTxtError=i; i++;
  A_Language[i] = 'De grootte van de afbeelding moet hoger dan 1 pixel zijn.'; var C_EmpireSizeIconError=i; i++;
  A_Language[i] = 'De link'; var C_LinkPositionError1=i; i++;
  A_Language[i] = ' Opslaan mislukt, herbekijk de naam, links en rijnummers '; var C_LinkPositionError2=i; i++;
  A_Language[i] = 'De correcte gegevens zijn opgeslagen. De pagina zal niet verversen.'; var C_SaveParameterError=i; i++;
  // ShowHideTable
  A_Language[i] = 'Toon'; var C_RollUp=i; i++;
  A_Language[i] = 'Verberg'; var C_Unfold=i; i++;
  // Options : General parameters
  A_Language[i] = 'Algemene instellingen'; var C_MainOption=i; i++;
  A_Language[i] = 'Toon nummers in kilo'; var C_ShowInKilo=i; i++;
  A_Language[i] = 'Toon secondes in de update bovenaan per 24h'; var C_ShowSecondForUpperUpdateTimeInDay=i; i++;
  A_Language[i] = 'Verwijder het \'Officierscasino\''; var C_DeleteOfficerLink=i; i++;
  A_Language[i] = 'Verwijder de \'Handelaar\' link'; var C_DeleteTraderLink=i; i++;
  A_Language[i] = 'Positie'; var C_Coordinates=i; i++;
  A_Language[i] = 'Naam'; var C_Name=i; i++;
  A_Language[i] = 'Status'; var C_Status=i; i++;
  A_Language[i] = 'Punten'; var C_Points=i; i++;
  A_Language[i] = 'Lidmaatschap'; var C_MemberShip=i; i++;
  A_Language[i] = 'Online'; var C_Online=i; i++;
  A_Language[i] = 'Sorteer ledenlijst'; var C_SortMember=i; i++;
  A_Language[i] = 'Verhogen'; var C_Increasing=i; i++;
  A_Language[i] = 'Verlagen'; var C_Lessening=i; i++;
  A_Language[i] = 'Wijze van het sorteren van de ledenlijst'; var C_SortOrder=i;i++;
  A_Language[i] = 'Voeg de tooltip toe aan alle links'; var C_AddToolTip=i; i++;
  A_Language[i] = 'Toon bericht om te updaten bij het eindigen van een bouw'; var C_ShowRequestToUpdateResourcesPage=i; i++;
  A_Language[i] = 'Toon een link om alle pagina\'s te verversen.'; var C_ShowAutoUpdate=i; i++;
  A_Language[i] = 'Gebruik een willekeurige tijd tussen het updaten van pagina\'s (tussen 2 en 10s)'; var C_UseRandomUpdateTime=i; i++;
  A_Language[i] = 'Voeg een versiecheck php afbeelding toe aan de onderkant van de pagina'; var C_AddImageVersion=i; i++;
  A_Language[i] = 'Toon foutmeldingen (debugging)'; var C_Debug=i; i++;
  // Options : Display options
  A_Language[i] = 'Beeld opties'; var C_ScreenOption=i; i++;
  A_Language[i] = 'Toon de keuzelijst van uw planeten bovenaan'; var C_ShowHeaderPlanetList=i; i++;
  A_Language[i] = 'Toon de standaard grondstoffentabel'; var C_ShowHeaderResourcesList=i; i++;
  A_Language[i] = 'Voeg het totaal aantal grondstoffen toe in de grondstoffentabel'; var C_AddResourcesTotal=i; i++;
  A_Language[i] = 'Activeer de mogelijkheid om de header te veranderen van positie (keuzelijst van planeten)'; var C_ChangeHeaderPosition=i; i++;
  A_Language[i] = 'Positie van de header (in CSS)'; var C_HeaderPosition=i; i++;
  A_Language[i] = 'Om zeker te zijn dat uw instelling doorgaat, kan u \253!important\273 toevoegen achter de positie.'; var C_PositionInformations=i; i++;
  A_Language[i] = 'Activeer de mogelijkheid om de positie van de main frame te veranderen.'; var C_ChangeContentPosition=i; i++;
  A_Language[i] = 'Positie van de main frame (in CSS)'; var C_ContentPosition=i; i++;
  A_Language[i] = 'Voeg CSS code toe in alle pagina\'s'; var C_AddCssCode=i; i++;
  A_Language[i] = 'Verwijder CSS code'; var C_RemoveCssCode=i; i++;
  A_Language[i] = 'Voeg JavaScript code toe in alle pagina\'s'; var C_AddJSCode=i; i++;
  A_Language[i] = 'Verwijder JavaScript code'; var C_RemoveJSCode=i; i++;
  A_Language[i] = 'Schrijf uw code hier'; var C_WriteCode=i; i++;
  // Options : Resources table
  A_Language[i] = 'Grondstoffen Tabel'; var C_ResourcesTableOption=i; i++;
  A_Language[i] = 'Toon de Grondstoffen tabel'; var C_ShowHeaderResourcesTable=i; i++;
  A_Language[i] = 'Toon de planeetnaam'; var C_ShowPlanetName=i; i++;
  A_Language[i] = 'Toon de coÃ¶rdinaten van uw planeten'; var C_ShowCoordinates=i; i++;
  A_Language[i] = 'Voeg een totale grondstoffen kolom toe'; var C_ShowTotal=i; i++;
  A_Language[i] = 'Toon \'Donkere Materie\' kolom'; var C_ShowDarkMatter=i; i++;
  A_Language[i] = 'Toon de tijd van de laatste update'; var C_ShowTimeUpdate=i; i++;
  A_Language[i] = 'Toon enkel grondstoffen van de actieve sessie'; var C_ShowResourcesOnlyActiveSession=i; i++
  A_Language[i] = 'Bereken grondstoffen in real time'; var C_RealTimeResources=i; i++;
  A_Language[i] = 'Interval tussen elke berekening'; var C_RealTimeResourcesDelay=i; i++;
  A_Language[i] = 'Stijl van de header van de geselecteerde planeet (in css)'; var C_HeaderSelectedPlanetStyle=i; i++;
  A_Language[i] = 'Doorzichtigheid van grondstoffen cellen (1 tot 100)'; var C_Transparency=i; i++;
  A_Language[i] = 'Kleuren veranderen naargelang ouderdom van update (in seconden)'; var C_UpdateTimeColor=i; i++;
  A_Language[i] = 'Rood wanneer de tijd minder is.'; var C_UpdateTimeRed=i; i++;
  A_Language[i] = 'Activeer sorteren van planeten'; var C_PlanetOrder=i; i++;
  A_Language[i] = 'Kies een planeet en gebruik de pijlen om zijn positie te veranderen'; var C_PlanetOrderDescription=i; i++;
  // Options : Empire
  A_Language[i] = 'Toon de Empire link'; var C_ShowEmpire=i; i++;
  A_Language[i] = 'Naam van de Empire link'; var C_EmpireLinkName=i; i++;
  A_Language[i] = 'Rijnummer in het Ogame menu'; var C_EmpireMenuRow=i; i++;
  A_Language[i] = 'Grootte in pixels van de planeetafbeeldingen'; var C_EmpireIconSize=i; i++;
  A_Language[i] = 'Verberg de standaard Grondstoffen tabel'; var C_HideDefaultResourcesTable=i; i++;
  A_Language[i] = 'Toon de nieuwe Grondstoffentabel'; var C_ForceDisplayHeaderResourcesTableWithEmpire=i; i++;
  A_Language[i] = 'Kies een blok en gebruik de pijlen om zijn positie te veranderen'; var C_BlockOrderDescription=i; i++;
  // Options : Transfer
  A_Language[i] = 'Verplaatsingen'; var C_Transfer=i; i++;
  A_Language[i] = 'Gebruik real-time berekeningen'; var C_UseRealTimeResources=i; i++;
  A_Language[i] = 'Toon de grondstoffen in real time (Pas op voor CPU gebruik)'; var C_ForceResourcesTransferTableUpdate=i; i++;
  A_Language[i] = 'Toon de verplaatsingen link als een verplaatsing aan de gang is'; var C_ShowTransferTableIfActiveTransfer=i; i++;
  A_Language[i] = 'Schipsnelheids ratio vermenigvuldiger'; var C_TransferRatioSpeed=i; i++;
  // Options : Additional links
  A_Language[i] = 'Extra links'; var C_LinkOption=i; i++;
  A_Language[i] = 'Naam van de link'; var C_LinkName=i; i++;
  A_Language[i] = 'Url van de link'; var C_LinkUrl=i; i++;
  A_Language[i] = 'Rij nummer in menu'; var C_LinkPosition=i; i++;
  A_Language[i] = 'Open de link in een nieuw venster'; var C_LinkNewWindow=i; i++;
  A_Language[i] = 'Alternatieve text voor mouse-hovering'; var C_LinkTitle=i; i++;
  A_Language[i] = 'Voeg link toe'; var C_AddLink=i; i++;
  A_Language[i] = 'Link n\260'; var C_LinkNumber=i; i++;
  A_Language[i] = 'Verwijder'; var C_Delete=i; i++;
  // Options
  A_Language[i] = 'Bewaar'; var C_Save=i; i++;
  A_Language[i] = 'Controle paneel'; var C_ControlPanel=i; i++;
  // Automatic update
  A_Language[i] = 'Update Start'; var C_StartUpdate=i; i++;
  A_Language[i] = 'Update Stop'; var C_StopUpdate=i; i++;
  A_Language[i] = 'Stop automatische update'; var C_UpdateStopInformations=i; i++;
  A_Language[i] = 'Automatische updates van alle paginas'; var C_UpdateInformations=i; i++;
  // Resources table
  A_Language[i] = 'Volgende planeet'; var C_NextPlanet=i; i++;
  A_Language[i] = 'Vorige planeet'; var C_PreviousPlanet=i; i++;
  A_Language[i] = 'Herlaad deze pagina voor alle planeten'; var C_UpdatePages=i; i++;
  // Empire
  A_Language[i] = 'Type'; var C_Type=i; i++;
  A_Language[i] = 'Aantal velden'; var C_FieldNumber=i; i++;
  A_Language[i] = 'naar'; var C_To=i; i++;
  A_Language[i] = 'Aanpassen'; var C_Apply=i; i++;
  A_Language[i] = 'Afbeelding niet opgeslagen'; var C_ImageNotSaved=i; i++;
  A_Language[i] = 'Hoofdinformatie'; var C_MainInformations=i; i++;
  A_Language[i] = 'Productie per uur'; var C_HourProduction=i; i++;
  A_Language[i] = 'Productie per dag'; var C_DayProduction=i; i++;
  A_Language[i] = 'Gebouwen'; var C_BuildingsTxt=i; i++;
  A_Language[i] = 'Verdediging'; var C_DefensesTxt=i; i++;
  A_Language[i] = 'Onderzoek'; var C_ResearchTxt=i; i++;
  A_Language[i] = 'Vloot'; var C_FleetsTxt=i; i++;
  A_Language[i] = 'Lijst'; var C_List=i; i++;
  A_Language[i] = 'Schepen en verdediging in werf'; var C_FleetsDefensesUC=i; i++;
  A_Language[i] = 'Ga naar Gebouwen'; var C_ToBuildings=i; i++;
  A_Language[i] = 'Ga naar Onderzoek'; var C_ToResearch=i; i++;
  A_Language[i] = 'Ga naar Verdediging'; var C_ToDefenses=i; i++;
  A_Language[i] = 'Ga naar Werf'; var C_ToFleets=i; i++;
  A_Language[i] = 'Energie van zonne-energiesatellieten.'; var C_Ship212Production=i; i++;
  A_Language[i] = 'Aantal zonne-energiesatellieten'; var C_Ship212NecessaryNumber=i; i++;
  A_Language[i] = 'Constructie mogelijk'; var C_ConstructionAvailable=i; i++;
  A_Language[i] = 'Met grondstoffen van planeet'; var C_WithPlanetResources=i; i++;
  A_Language[i] = 'Met grondstoffen van alle planeten'; var C_WithAllPlanetsResources=i; i++;
  A_Language[i] = 'Er is reeds een constructie bezig'; var C_OtherBuildingsInConstruction=i; i++;
  A_Language[i] = 'Er is reeds een onderzoek bezig'; var C_OtherResearchInDevelopment=i; i++;
  A_Language[i] = 'Totale kost'; var C_TotalBuildingsCost=i; i++;
  A_Language[i] = 'Kost voor niveau'; var C_LevelCost1=i; i++;
  A_Language[i] = ' Verbruikt'; var C_LevelCost2=i; i++;
  A_Language[i] = 'Annuleer bouw'; var C_StopBuildings=i; i++;
  A_Language[i] = 'Annuleer onderzoek'; var C_StopResearch=i; i++;
  A_Language[i] = 'Start bouw'; var C_LaunchBuildings=i; i++;
  A_Language[i] = 'Start onderzoek'; var C_LaunchResearch=i; i++;
  A_Language[i] = 'Bouw verdediging'; var C_BuildDefenses=i; i++;
  A_Language[i] = 'Bouw ship'; var C_BuildFleets=i; i++;
  A_Language[i] = 'Productie tijd'; var C_BuildingTime=i; i++;
  // Empire : Export
  A_Language[i] = 'Export'; var C_Export=i; i++;
  A_Language[i] = 'Generator opties'; var C_GeneratorOptions=i; i++;
  A_Language[i] = 'Gecentreerd'; var C_Center=i; i++;
  A_Language[i] = 'Text in kleur'; var C_TextColored=i; i++;
  A_Language[i] = 'Geen speciale karakters'; var C_NoSpecialCharacter=i; i++;
  A_Language[i] = 'Tabel'; var C_LayoutInTable=i; i++;
  A_Language[i] = 'Centreer de text van de tabel'; var C_CenteredTextInTable=i; i++;
  A_Language[i] = 'Verander formaat van de text in de tabel'; var C_ResizeTextInTable=i; i++;
  A_Language[i] = 'Genereer'; var C_Generate=i; i++;
  A_Language[i] = 'karakters'; var C_Characters=i; i++;
  // Transfer
  A_Language[i] = 'Transporteer grondstoffen'; var C_TransferResources=i; i++;
  A_Language[i] = 'Er zijn geen grondstoffen om over te brengen.'; var C_NoResources=i; i++;
  A_Language[i] = 'Transport is onmogelijk. U hebt niet voldoende schepen.'; var C_NotEnoughShip1=i; i++;
  A_Language[i] = 'Gelieve de vlootpagina\'s te herbezoeken om uw vlootaantal te verversen.'; var C_NotEnoughShip2=i; i++;
  A_Language[i] = 'Bestemming'; var C_Destination=i; i++;
  A_Language[i] = 'Te versturen'; var C_ToTransfer=i; i++;
  A_Language[i] = 'Keer selectie om'; var C_InvertSelection=i; i++;
  A_Language[i] = 'Verstuurd'; var C_Transfered=i; i++;
  A_Language[i] = 'Snelheid'; var C_Speed=i; i++;
  A_Language[i] = 'Recycler ?'; var C_NeededRecycler=i; i++;
  A_Language[i] = 'Transfer status'; var C_TransferState=i; i++;
  A_Language[i] = 'GV'; var C_LargeCargoShip=i; i++; // Abbreviation of Large Cargo Ship
  A_Language[i] = 'KV'; var C_SmallCargoShip=i; i++; // Abbreviation of Small Cargo Ship
  A_Language[i] = 'Het transport is niet mogelijk van de bestemmings planeet.'; var C_NoTransferFromDestinationPlanet=i; i++;
  A_Language[i] = 'Niet genoeg recyclers.'; var C_NoRecycler=i; i++;
  A_Language[i] = 'Niet genoeg GV.'; var C_NotEnoughLargeCargoShip=i; i++;
  A_Language[i] = 'Niet genoeg KV.'; var C_NotEnoughSmallCargoShip=i; i++;
  A_Language[i] = 'Grondstoffen zijn reeds verzend van deze planeet.'; var C_AlreadyTransfered=i; i++;
  A_Language[i] = 'Deze planeet is niet gekozen voor het transport.'; var C_PlanetNotSelected=i; i++;
  A_Language[i] = 'Geen transport aan de gang.'; var C_NoTransfer=i; i++;
  A_Language[i] = 'Geselecteerde kolonie'; var C_ColonyToBeUsed=i; i++;
  A_Language[i] = 'Andere bestemming'; var C_OtherDestination=i; i++;
  A_Language[i] = 'Vul grondstoffen in om te transporteren'; var C_NeededResources=i; i++;
  A_Language[i] = 'Rest'; var C_Rest=i; i++;
  A_Language[i] = 'Te versturen metaal'; var C_MetalToBeSent=i; i++;
  A_Language[i] = 'Te versturen kristal'; var C_CrystalToBeSent=i; i++;
  A_Language[i] = 'Te versturen deuterium'; var C_DeuteriumToBeSent=i; i++;
  A_Language[i] = 'Vluchttijd'; var C_FlightTime=i; i++;
  A_Language[i] = 'Snelheid'; var C_SendingSpeed=i; i++;
  A_Language[i] = 'Brandstof verbruik'; var C_DeuteriumConsumption=i; i++;
  A_Language[i] = 'Aantal KV of GV'; var C_TransportShipNumber=i; i++;
  A_Language[i] = 'Berekeningsopties'; var C_TransferCalcOption=i; i++;
  A_Language[i] = 'Berekenings mode'; var C_CalcMode=i; i++;
  A_Language[i] = 'Transporteer grondstoffen van planeten met maximum aantal (zelde rest na transport)'; var C_SameRest=i; i++;
  A_Language[i] = 'Transporteer dezelfde hoeveelheid van elke planeet'; var C_SameQuantity=i; i++;
  A_Language[i] = 'Gebruik alle grondstoffen op bestemmingsplaneet'; var C_UseTotalResourcesDestinationPlanet=i; i++;
  A_Language[i] = 'VLuchttijd zo accuraat mogelijk'; var C_SameTime=i; i++;
  A_Language[i] = 'Snelste Mogelijk'; var C_Fastest=i; i++;
  A_Language[i] = 'Aankomsttijd'; var C_ArrivalDate=i; i++;
  A_Language[i] = 'Jaar'; var C_Year=i; i++;
  A_Language[i] = 'Maand'; var C_Month=i; i++;
  A_Language[i] = 'Dag'; var C_Day=i; i++;
  A_Language[i] = 'Uur'; var C_Hour=i; i++;
  A_Language[i] = 'Minuut'; var C_Minute=i; i++;
  A_Language[i] = 'Dag(en)'; var C_Days=i; i++;
  A_Language[i] = 'Uren'; var C_Hours=i; i++;
  A_Language[i] = 'Minu(h)t(en)'; var C_Minutes=i; i++;
  A_Language[i] = 'd'; var C_DayAbbreviation=i; i++;
  A_Language[i] = 'h'; var C_HourAbbreviation=i; i++;
  A_Language[i] = 'm'; var C_MinuteAbbreviation=i; i++;
  A_Language[i] = 's'; var C_SecondAbbreviation=i; i++;
  A_Language[i] = 'Voeg een recycler toe om vluchttijd aan te passen'; var C_AddRecycler=i; i++;
  A_Language[i] = 'Transport'; var C_TransportShip=i; i++;
  A_Language[i] = 'Opslaan transport'; var C_SaveTransfer=i; i++;
  A_Language[i] = 'Annuleer transport'; var C_CancelTransfer=i; i++;
  A_Language[i] = 'Vul de schepen'; var C_FillShip=i; i++;
  A_Language[i] = 'Onopgeslagen planeten zijn gevonden, u dient deze te herbezoeken.'; var C_UnsavedPlanets=i; i++;
  A_Language[i] = 'Geef positie en snelheid in'; var C_FillCoordinatesAndSpeed=i; i++;
  A_Language[i] = 'Vul grondstoffen'; var C_FillResources=i; i++;
  A_Language[i] = 'Ga verder'; var C_Continue=i; i++;
  // Other
  A_Language[i] = 'Uitvoer tijd'; var C_RunTime=i; i++;
  A_Language[i] = 'Er is een gebouw gevonden die de Productiefactor aanpast.\n\nWilt u de grondstoffen pagina bezoeken?'; var C_ResourcesBuildingsUC=i; i++;
  // Welcome message
  A_Language[i] = 'Welkom bij de nieuwe versie van \253'+C_ScriptName+'\273 (versie: '+C_ScriptVersion+', build: '+C_ScriptBuild+')\n\Duitse vertaling : door Dhu\nItaliaanse vertaling : door Fiox\nPortuguese translation : by Spac3h\nSpaanse vertaling : door Etintos\nNederlandse vertaling door: Frutelaken\nBedankt aan alle beta testers.\n\n'+
  'Bij deze versie is een groot deel van de code herschreven, we raden u daarom aan om de automatische updater te laten lopen\n\n'+
  'Wanneer u OK klikt, zal het script u naar de technologiepagina brengen..\n\n'+
  'Om de aanpassingen van dit script te zien, gaan naar de sectie genaamd: \253DESCRIPTION DES MISES A JOUR\273 in het script (Enkel in frans).'; var C_NewVersion=i; i++;
  A_Language[i] = 'Welkom bij de nieuwe versie van \253'+C_ScriptName+'\273 (versie: '+C_ScriptVersion+', build: '+C_ScriptBuild+')\n\nDuitse vertaling : door Dhu\nItaliaanse vertaling : door Fiox\nPortuguese translation : by Spac3h\nSpaanse vertaling : door Etintos\nNederlandse vertaling door: Frutelaken\nBedankt aan alle beta testers.\n\n'+
  'Om de aanpassingen van dit script te zien, gaan naar de sectie genaamd: \253DESCRIPTION DES MISES A JOUR\273 in het script (Enkel in frans).'; var C_NewBuild=i; i++;
}
else if (Language == 4) { // TR
  // For accented character, use unicode or octal code to replace it, use this link (http://www.vbc3.com/script/unicode_octal_html_code.php)
  i = 0;
  A_Language[i] = 'Planet'; i++;
  A_Language[i] = 'Moon'; i++;
  A_Language[i] = 'Metal'; var C_Metal=i; i++;
  A_Language[i] = 'Crystal'; var C_Crystal=i; i++;
  A_Language[i] = 'Deuterium'; var C_Deuterium=i; i++;
  A_Language[i] = 'Energy'; var C_Energy=i; i++;
  A_Language[i] = 'Dark Matter'; var C_DarkMatter=i; i++;
  A_Language[i] = 'Empire'; var C_Empire=i; i++;
  A_Language[i] = 'Resources'; var C_Resources=i; i++;
  A_Language[i] = 'Update'; var C_Update=i; i++;
  A_Language[i] = 'Yes'; var C_Yes=i; i++;
  A_Language[i] = 'No'; var C_No=i; i++;
  A_Language[i] = 'Show'; var C_Show=i; i++;
  A_Language[i] = 'Hide'; var C_Hide=i; i++;
  // Required text for analysis, include spaces, must be exact
  A_Language[i] = 'Diameter'; var C_Diameter=i; i++; // Overview page
  A_Language[i] = 'Temperature'; var C_Temperature=i; i++; // Overview page
  A_Language[i] = 'Total'; var C_Total=i; i++; // Name of total in resources page
  A_Language[i] = 'Gezegendeki Hammadde'; var C_ResourcesTableHeader=i; i++; // Beginning of the first row from the resources table (resources page) 
  A_Language[i] = 'Gereken'; var C_Require=i; i++; // First word of the right cell in tree technology table 
  A_Language[i] = '\334retim fakt\366r\374: '; var C_ProductionRate=i; i++; // Text before production rate number in resources page
  // ValidateBuilding
  A_Language[i] = 'Numbers of free field are insufficient'; var C_NotEnoughFreeField=i; i++;
  A_Language[i] = 'The lunar base aren\'t built'; var C_LunarBaseNotBuilt=i; i++;
  A_Language[i] = 'Not available on plant'; var C_NotOnPlanet=i; i++;
  A_Language[i] = 'Not available on moon'; var C_NotOnMoon=i; i++;
  // AddLink
  A_Language[i] = 'Key words :\n\nSome part can be replaced keywords.\n\n'+
  '[session] To get the id of the current session\n'+
  '[host] To get the domain of the ogame universe\n'+
  '[Planet name] To get the id of one of your planets\n\n'+
  'Ex: Creation of a link to the \'overview\' page of the planet named \253Homeworld\273 :\n'+
  'http://[host]/game/index.php?page=overview&session=[session]&cp=[Homeworld]\n\n'+
  'Become (for universe 10) :\n'+
  'http://uni10.ogame.org/game/index.php?page=overview&session=2943046dc47f&cp=34317957'; var C_KeyWordsInformations=i; i++;
  // SaveParameter
  A_Language[i] = 'There is an error in the value of transparency.\nThe value must be included between 1 and 100'; var C_TransparencyError=i; i++;
  A_Language[i] = 'The value of the empire row is not correct.\nThe value must be included between 1 and '; var C_EmpireRowError=i; i++;
  A_Language[i] = 'The name of the link towards the empire menu must contain at least one character'; var C_EmpireTxtError=i; i++;
  A_Language[i] = 'The icons size of planets in empire view must be upper to 1 pixel.'; var C_EmpireSizeIconError=i; i++;
  A_Language[i] = 'The link'; var C_LinkPositionError1=i; i++;
  A_Language[i] = ' can\'t be saved.\nVerify the name, link and row number.\nThe link row must be included between 1 and '; var C_LinkPositionError2=i; i++;
  A_Language[i] = 'Correct datas were been saved\nSo that you can correct, the page will not be refreshed.'; var C_SaveParameterError=i; i++;
  // ShowHideTable
  A_Language[i] = 'Roll up'; var C_RollUp=i; i++;
  A_Language[i] = 'Unfold'; var C_Unfold=i; i++;
  // Options : General parameters
  A_Language[i] = 'General parameters'; var C_MainOption=i; i++;
  A_Language[i] = 'Show numbers in kilo'; var C_ShowInKilo=i; i++;
  A_Language[i] = 'Show seconds for the upper update at 24h'; var C_ShowSecondForUpperUpdateTimeInDay=i; i++;
  A_Language[i] = 'Delete Links \'officers\''; var C_DeleteOfficerLink=i; i++;
  A_Language[i] = 'Delete Link \'merchant\''; var C_DeleteTraderLink=i; i++;
  A_Language[i] = 'Position'; var C_Coordinates=i; i++;
  A_Language[i] = 'Name'; var C_Name=i; i++;
  A_Language[i] = 'Status'; var C_Status=i; i++;
  A_Language[i] = 'Points'; var C_Points=i; i++;
  A_Language[i] = 'Membership'; var C_MemberShip=i; i++;
  A_Language[i] = 'Online'; var C_Online=i; i++;
  A_Language[i] = 'Sort member list'; var C_SortMember=i; i++;
  A_Language[i] = 'Ascending'; var C_Increasing=i; i++;
  A_Language[i] = 'Descending'; var C_Lessening=i; i++;
  A_Language[i] = 'Order of member list sorting'; var C_SortOrder=i;i++;
  A_Language[i] = 'Add tooltip to all link'; var C_AddToolTip=i; i++;
  A_Language[i] = 'Show a message asking to update the resources page if a new building modifying it was built'; var C_ShowRequestToUpdateResourcesPage=i; i++;
  A_Language[i] = 'Show a link to update all pages in automatic.'; var C_ShowAutoUpdate=i; i++;
  A_Language[i] = 'Use a random time to update pages in automatic (between 2 and 10s)'; var C_UseRandomUpdateTime=i; i++;
  A_Language[i] = 'Add a version check php image at the bottom of page'; var C_AddImageVersion=i; i++;
  A_Language[i] = 'Show the error messages (Debugging)'; var C_Debug=i; i++;
  // Options : Display options
  A_Language[i] = 'Display options'; var C_ScreenOption=i; i++;
  A_Language[i] = 'Show drop-down list of planets'; var C_ShowHeaderPlanetList=i; i++;
  A_Language[i] = 'Show the default resources table'; var C_ShowHeaderResourcesList=i; i++;
  A_Language[i] = 'Add the resources total to the default resources table'; var C_AddResourcesTotal=i; i++;
  A_Language[i] = 'Activate the possibility to change the header frame position (Drop-down list of planets)'; var C_ChangeHeaderPosition=i; i++;
  A_Language[i] = 'Position of the header frame (in css)'; var C_HeaderPosition=i; i++;
  A_Language[i] = 'To be sure that your position is taken in consideration, you can add \253!important\273 after the position.'; var C_PositionInformations=i; i++;
  A_Language[i] = 'Activate the possibility to change the position of the main frame.'; var C_ChangeContentPosition=i; i++;
  A_Language[i] = 'Position of the main frame (in css)'; var C_ContentPosition=i; i++;
  A_Language[i] = 'Add CSS code in all pages'; var C_AddCssCode=i; i++;
  A_Language[i] = 'Remove CSS code'; var C_RemoveCssCode=i; i++;
  A_Language[i] = 'Add JavaScript code in all pages'; var C_AddJSCode=i; i++;
  A_Language[i] = 'Remove JavaScript code'; var C_RemoveJSCode=i; i++;
  A_Language[i] = 'Write your code here'; var C_WriteCode=i; i++;
  // Options : Resources table
  A_Language[i] = 'Resources table'; var C_ResourcesTableOption=i; i++;
  A_Language[i] = 'Show the resources table'; var C_ShowHeaderResourcesTable=i; i++;
  A_Language[i] = 'Show planet name'; var C_ShowPlanetName=i; i++;
  A_Language[i] = 'Show the coordinates of planets'; var C_ShowCoordinates=i; i++;
  A_Language[i] = 'Add total resources column'; var C_ShowTotal=i; i++;
  A_Language[i] = 'Show dark matter column'; var C_ShowDarkMatter=i; i++;
  A_Language[i] = 'Show the time since the last update'; var C_ShowTimeUpdate=i; i++;
  A_Language[i] = 'Show only resources of active session'; var C_ShowResourcesOnlyActiveSession=i; i++
  A_Language[i] = 'Calculate resources in real time'; var C_RealTimeResources=i; i++;
  A_Language[i] = 'Interval of time between each calculation'; var C_RealTimeResourcesDelay=i; i++;
  A_Language[i] = 'Style of header of current planet (in css)'; var C_HeaderSelectedPlanetStyle=i; i++;
  A_Language[i] = 'Transparency of resources cells (1 to 100)'; var C_Transparency=i; i++;
  A_Language[i] = 'Time corresponding to the colors of graduations (in second) (the color used is the one whoise time since the last update is just inferior of filled time)'; var C_UpdateTimeColor=i; i++;
  A_Language[i] = 'And red, if update time is superior.'; var C_UpdateTimeRed=i; i++;
  A_Language[i] = 'Activate planets sort'; var C_PlanetOrder=i; i++;
  A_Language[i] = 'Choose one planet and use arrows to change its position'; var C_PlanetOrderDescription=i; i++;
  // Options : Empire
  A_Language[i] = 'Show empire link'; var C_ShowEmpire=i; i++;
  A_Language[i] = 'Name of empire link'; var C_EmpireLinkName=i; i++;
  A_Language[i] = 'Row number in ogame menu'; var C_EmpireMenuRow=i; i++;
  A_Language[i] = 'Size in pixel of planets thumbnails'; var C_EmpireIconSize=i; i++;
  A_Language[i] = 'Hide default resources table'; var C_HideDefaultResourcesTable=i; i++;
  A_Language[i] = 'Force the display of the generated resources table'; var C_ForceDisplayHeaderResourcesTableWithEmpire=i; i++;
  A_Language[i] = 'Choose one block and use arrows to change its position'; var C_BlockOrderDescription=i; i++;
  // Options : Transfer
  A_Language[i] = 'Transfer'; var C_Transfer=i; i++;
  A_Language[i] = 'Use result of real time resources calculation'; var C_UseRealTimeResources=i; i++;
  A_Language[i] = 'Force the display of the resources calculated real time (Important CPU usage)'; var C_ForceResourcesTransferTableUpdate=i; i++;
  A_Language[i] = 'Show transfer form if a transfer is in progress'; var C_ShowTransferTableIfActiveTransfer=i; i++;
  A_Language[i] = 'Speed ship ratio multiplier'; var C_TransferRatioSpeed=i; i++;
  // Options : Additional links
  A_Language[i] = 'Additional links'; var C_LinkOption=i; i++;
  A_Language[i] = 'Name of link'; var C_LinkName=i; i++;
  A_Language[i] = 'Url of link'; var C_LinkUrl=i; i++;
  A_Language[i] = 'Row number in menu'; var C_LinkPosition=i; i++;
  A_Language[i] = 'Open the link in a new window'; var C_LinkNewWindow=i; i++;
  A_Language[i] = 'Text shown the mouse is over the link'; var C_LinkTitle=i; i++;
  A_Language[i] = 'Add link'; var C_AddLink=i; i++;
  A_Language[i] = 'Link n\260'; var C_LinkNumber=i; i++;
  A_Language[i] = 'Delete'; var C_Delete=i; i++;
  // Options
  A_Language[i] = 'Save'; var C_Save=i; i++;
  A_Language[i] = 'Control panel'; var C_ControlPanel=i; i++;
  // Automatic update
  A_Language[i] = 'Update Start'; var C_StartUpdate=i; i++;
  A_Language[i] = 'Update Stop'; var C_StopUpdate=i; i++;
  A_Language[i] = 'Stop automatic update'; var C_UpdateStopInformations=i; i++;
  A_Language[i] = 'Update in automatic all pages'; var C_UpdateInformations=i; i++;
  // Resources table
  A_Language[i] = 'Next planet'; var C_NextPlanet=i; i++;
  A_Language[i] = 'Previous planet'; var C_PreviousPlanet=i; i++;
  A_Language[i] = 'Refresh the current page on all planets'; var C_UpdatePages=i; i++;
  // Empire
  A_Language[i] = 'Type'; var C_Type=i; i++;
  A_Language[i] = 'Number of field'; var C_FieldNumber=i; i++;
  A_Language[i] = 'to'; var C_To=i; i++;
  A_Language[i] = 'Apply'; var C_Apply=i; i++;
  A_Language[i] = 'Image not saved'; var C_ImageNotSaved=i; i++;
  A_Language[i] = 'Main informations'; var C_MainInformations=i; i++;
  A_Language[i] = 'Hourly production'; var C_HourProduction=i; i++;
  A_Language[i] = 'Daily Production'; var C_DayProduction=i; i++;
  A_Language[i] = 'Buildings'; var C_BuildingsTxt=i; i++;
  A_Language[i] = 'Defense'; var C_DefensesTxt=i; i++;
  A_Language[i] = 'Research'; var C_ResearchTxt=i; i++;
  A_Language[i] = 'Fleet'; var C_FleetsTxt=i; i++;
  A_Language[i] = 'List'; var C_List=i; i++;
  A_Language[i] = 'Ship and defenses under construction'; var C_FleetsDefensesUC=i; i++;
  A_Language[i] = 'Go to buildings'; var C_ToBuildings=i; i++;
  A_Language[i] = 'Go to research'; var C_ToResearch=i; i++;
  A_Language[i] = 'Go to defense'; var C_ToDefenses=i; i++;
  A_Language[i] = 'Go to shipyard'; var C_ToFleets=i; i++;
  A_Language[i] = 'Energy provide by solar satellites.'; var C_Ship212Production=i; i++;
  A_Language[i] = 'Num. of solar satellites needed'; var C_Ship212NecessaryNumber=i; i++;
  A_Language[i] = 'Construction available'; var C_ConstructionAvailable=i; i++;
  A_Language[i] = 'With resources from planet'; var C_WithPlanetResources=i; i++;
  A_Language[i] = 'With resources from all planets'; var C_WithAllPlanetsResources=i; i++;
  A_Language[i] = 'An other construction is in progress on this planet'; var C_OtherBuildingsInConstruction=i; i++;
  A_Language[i] = 'An other research is in development on planet'; var C_OtherResearchInDevelopment=i; i++;
  A_Language[i] = 'Total cost of buildings'; var C_TotalBuildingsCost=i; i++;
  A_Language[i] = 'Level cost'; var C_LevelCost1=i; i++;
  A_Language[i] = ' required'; var C_LevelCost2=i; i++;
  A_Language[i] = 'Cancel building'; var C_StopBuildings=i; i++;
  A_Language[i] = 'Cancel research'; var C_StopResearch=i; i++;
  A_Language[i] = 'Start building'; var C_LaunchBuildings=i; i++;
  A_Language[i] = 'Start research'; var C_LaunchResearch=i; i++;
  A_Language[i] = 'Build defense'; var C_BuildDefenses=i; i++;
  A_Language[i] = 'Build ship'; var C_BuildFleets=i; i++;
  A_Language[i] = 'Building time'; var C_BuildingTime=i; i++;
  // Empire : Export
  A_Language[i] = 'Export'; var C_Export=i; i++;
  A_Language[i] = 'Generator options'; var C_GeneratorOptions=i; i++;
  A_Language[i] = 'Centred'; var C_Center=i; i++;
  A_Language[i] = 'Text in color'; var C_TextColored=i; i++;
  A_Language[i] = 'No special character'; var C_NoSpecialCharacter=i; i++;
  A_Language[i] = 'Table'; var C_LayoutInTable=i; i++;
  A_Language[i] = 'Centre the text of table'; var C_CenteredTextInTable=i; i++;
  A_Language[i] = 'Resize the text of table'; var C_ResizeTextInTable=i; i++;
  A_Language[i] = 'Generate'; var C_Generate=i; i++;
  A_Language[i] = 'characters'; var C_Characters=i; i++;
  // Transfer
  A_Language[i] = 'Transfer resources'; var C_TransferResources=i; i++;
  A_Language[i] = 'There are any resources to be transfered.'; var C_NoResources=i; i++;
  A_Language[i] = 'Transfer is impossibile. You haven\'t enough ship on certain planets.'; var C_NotEnoughShip1=i; i++;
  A_Language[i] = 'You should revisit all fleet pages to update ship number.'; var C_NotEnoughShip2=i; i++;
  A_Language[i] = 'Destination'; var C_Destination=i; i++;
  A_Language[i] = 'To send'; var C_ToTransfer=i; i++;
  A_Language[i] = 'Invert selection'; var C_InvertSelection=i; i++;
  A_Language[i] = 'Sent'; var C_Transfered=i; i++;
  A_Language[i] = 'Speed'; var C_Speed=i; i++;
  A_Language[i] = 'Recycler ?'; var C_NeededRecycler=i; i++;
  A_Language[i] = 'Transfer status'; var C_TransferState=i; i++;
  A_Language[i] = 'LC'; var C_LargeCargoShip=i; i++; // Abbreviation of Large Cargo Ship
  A_Language[i] = 'SC'; var C_SmallCargoShip=i; i++; // Abbreviation of Small Cargo Ship
  A_Language[i] = 'The transfer isn\'t possible from destination planet.'; var C_NoTransferFromDestinationPlanet=i; i++;
  A_Language[i] = 'It lacks recyclers.'; var C_NoRecycler=i; i++;
  A_Language[i] = 'There isn\'t enough large cargos.'; var C_NotEnoughLargeCargoShip=i; i++;
  A_Language[i] = 'There isn\'t enough small cargos.'; var C_NotEnoughSmallCargoShip=i; i++;
  A_Language[i] = 'Resources had already sent from this planet.'; var C_AlreadyTransfered=i; i++;
  A_Language[i] = 'This planet hadn\'t been selected for the transfer.'; var C_PlanetNotSelected=i; i++;
  A_Language[i] = 'No transfer in progress.'; var C_NoTransfer=i; i++;
  A_Language[i] = 'Selected colony'; var C_ColonyToBeUsed=i; i++;
  A_Language[i] = 'Other destination'; var C_OtherDestination=i; i++;
  A_Language[i] = 'Fill resources to be transfered'; var C_NeededResources=i; i++;
  A_Language[i] = 'Rest'; var C_Rest=i; i++;
  A_Language[i] = 'Metal to be sent'; var C_MetalToBeSent=i; i++;
  A_Language[i] = 'Crystal to be sent'; var C_CrystalToBeSent=i; i++;
  A_Language[i] = 'Deuterium to be sent'; var C_DeuteriumToBeSent=i; i++;
  A_Language[i] = 'Flight time'; var C_FlightTime=i; i++;
  A_Language[i] = 'Speed'; var C_SendingSpeed=i; i++;
  A_Language[i] = 'Fuel consumption'; var C_DeuteriumConsumption=i; i++;
  A_Language[i] = 'SC or LC to be sent'; var C_TransportShipNumber=i; i++;
  A_Language[i] = 'Calculation options'; var C_TransferCalcOption=i; i++;
  A_Language[i] = 'Calculation mode'; var C_CalcMode=i; i++;
  A_Language[i] = 'Transfer resources from planets with maximum resources (Same rest after transfer)'; var C_SameRest=i; i++;
  A_Language[i] = 'Transfer the same quantity on each planet'; var C_SameQuantity=i; i++;
  A_Language[i] = 'Use all resources on destination planet'; var C_UseTotalResourcesDestinationPlanet=i; i++;
  A_Language[i] = 'Flight time the closest possible'; var C_SameTime=i; i++;
  A_Language[i] = 'Fastest possible'; var C_Fastest=i; i++;
  A_Language[i] = 'Arrival date'; var C_ArrivalDate=i; i++;
  A_Language[i] = 'Year'; var C_Year=i; i++;
  A_Language[i] = 'Month'; var C_Month=i; i++;
  A_Language[i] = 'Day'; var C_Day=i; i++;
  A_Language[i] = 'Hour'; var C_Hour=i; i++;
  A_Language[i] = 'Minute'; var C_Minute=i; i++;
  A_Language[i] = 'Day(s)'; var C_Days=i; i++;
  A_Language[i] = 'Hour(s)'; var C_Hours=i; i++;
  A_Language[i] = 'Minute(s)'; var C_Minutes=i; i++;
  A_Language[i] = 'd'; var C_DayAbbreviation=i; i++;
  A_Language[i] = 'h'; var C_HourAbbreviation=i; i++;
  A_Language[i] = 'm'; var C_MinuteAbbreviation=i; i++;
  A_Language[i] = 's'; var C_SecondAbbreviation=i; i++;
  A_Language[i] = 'Add a recycler if needed to adjust flight time'; var C_AddRecycler=i; i++;
  A_Language[i] = 'Cargo'; var C_TransportShip=i; i++;
  A_Language[i] = 'Save transfer'; var C_SaveTransfer=i; i++;
  A_Language[i] = 'Cancel transfer'; var C_CancelTransfer=i; i++;
  A_Language[i] = 'Fill cargos'; var C_FillShip=i; i++;
  A_Language[i] = 'Planets unsaved had been found. You should revisit them.'; var C_UnsavedPlanets=i; i++;
  A_Language[i] = 'Fill position and speed'; var C_FillCoordinatesAndSpeed=i; i++;
  A_Language[i] = 'Fill resources'; var C_FillResources=i; i++;
  A_Language[i] = 'Continue'; var C_Continue=i; i++;
  // Other
  A_Language[i] = 'Execution time'; var C_RunTime=i; i++;
  A_Language[i] = 'A buildings which modify production factor had been found.\n\nDo you want to update the resources page now?'; var C_ResourcesBuildingsUC=i; i++;
  // Welcome message
  A_Language[i] = 'Welcome to the new version of \253'+C_ScriptName+'\273 (version: '+C_ScriptVersion+', build: '+C_ScriptBuild+')\n\nDutch translation : by Frutelaken\nGerman translation : by Dhu\nItalian translation : by Fiox\nPortuguese translation : by Spac3h\nSpanish translation : By ETintos\nThanks to all beta tester.\n\n'+
  'For this version, most of the code were rewritten, it is thus advised to launch an automatic updating of pages from your account following this message.\n\n'+
  'Just after your click on OK, the script will load the tree technology page to get the name of each construction.\n\n'+
  'To see the changes about this version, go to the section named \253DESCRIPTION DES MISES A JOUR\273 in the script (Only in french).'; var C_NewVersion=i; i++;
  A_Language[i] = 'Welcome to the new version of \253'+C_ScriptName+'\273 (version: '+C_ScriptVersion+', build: '+C_ScriptBuild+')\n\nDutch translation : by Frutelaken\nGerman translation : by Dhu\nItalian translation : by Fiox\nPortuguese translation : by Spac3h\nSpanish translation : By ETintos\nThanks to all beta tester.\n\n'+
  'To see the changes about this version, go to the section named \253DESCRIPTION DES MISES A JOUR\273 in the script (Only in french).'; var C_NewBuild=i; i++;
}
else if (Language == 5) { // DE, added by DHU090101, please note that some german is probably not 100% correct in context
  // For accented character, use unicode or octal code to replace it, use this link (http://www.vbc3.com/script/unicode_octal_html_code.php)
  i = 0;
  A_Language[i] = 'Planet'; i++;
  A_Language[i] = 'Mond'; i++;
  A_Language[i] = 'Metall'; var C_Metal=i; i++;
  A_Language[i] = 'Kristall'; var C_Crystal=i; i++;
  A_Language[i] = 'Deuterium'; var C_Deuterium=i; i++;
  A_Language[i] = 'Energie'; var C_Energy=i; i++;
  A_Language[i] = 'Dunkle Materie'; var C_DarkMatter=i; i++;
  A_Language[i] = 'Imperium'; var C_Empire=i; i++;
  A_Language[i] = 'Rohstoff'; var C_Resources=i; i++;
  A_Language[i] = 'Update'; var C_Update=i; i++;
  A_Language[i] = 'Ja'; var C_Yes=i; i++;
  A_Language[i] = 'Nein'; var C_No=i; i++;
  A_Language[i] = 'Zeigen'; var C_Show=i; i++;
  A_Language[i] = 'Verstecken'; var C_Hide=i; i++;
  // Required text for analysis, include spaces, must be exact
  A_Language[i] = 'Durchmesser'; var C_Diameter=i; i++; // Overview page
  A_Language[i] = 'Temperatur'; var C_Temperature=i; i++; // Overview page
  A_Language[i] = 'Gesamt'; var C_Total=i; i++; // Name of total in resources page
  A_Language[i] = 'Rohstoffproduktion  auf'; var C_ResourcesTableHeader=i; i++; // Beginning of the first row from the resources table (resources page) 
  A_Language[i] = 'Ben\366tigt'; var C_Require=i; i++; // First word of the right cell in tree technology table 
  A_Language[i] = 'Produktionsfaktor: '; var C_ProductionRate=i; i++; // Text before production rate number in resources page
  // ValidateBuilding
  A_Language[i] = 'Anzahl freier Felder zu klein'; var C_NotEnoughFreeField=i; i++;
  A_Language[i] = 'Keine Mondbasis'; var C_LunarBaseNotBuilt=i; i++;
  A_Language[i] = 'Nicht vorhanden auf Planet'; var C_NotOnPlanet=i; i++;
  A_Language[i] = 'Nicht vorhanden auf Mond'; var C_NotOnMoon=i; i++;
  // AddLink
  A_Language[i] = 'Schl\374sselw\366rter:\n\n\n\n'+
  '[session] Die ID f\374r die aktuelle Session\n'+
  '[host] Die Domain des Ogame Universums\n'+
  '[Planet name] Die ID eines Planeten\n\n'+
  'Bsp: Erstellung eines Links zur Seite \'\334bersicht\' f\374r den Planeten \253Homeworld\273 :\n'+
  'http://[host]/game/index.php?page=overview&session=[session]&cp=[Homeworld]\n\n'+
  'Wird (f\374r Universum 10) :\n'+
  'http://uni10.ogame.org/game/index.php?page=overview&session=2943046dc47f&cp=34317957'; var C_KeyWordsInformations=i; i++;
  // SaveParameter
  A_Language[i] = 'Fehler im Transparenzwert.\nWertebereich: zwischen 1 und 100'; var C_TransparencyError=i; i++;
  A_Language[i] = 'Fehler f\374r Imperiums Zeile.\nWertebereich: zwischen 1 und '; var C_EmpireRowError=i; i++;
  A_Language[i] = 'Der Linkname f\374r die Imperiumszeile muss mindestens ein Zeichen enthalten'; var C_EmpireTxtError=i; i++;
  A_Language[i] = 'Die Bildgr\366sse f\374r Planeten muss gr\366sser als 1 Pixel sein.'; var C_EmpireSizeIconError=i; i++;
  A_Language[i] = 'Der Link'; var C_LinkPositionError1=i; i++;
  A_Language[i] = ' kann nicht gespeichert werden.\\334berpr\374fe Name, Link und Zeilennummer.\nDie Link Zeile muss sein zwischen 1 und '; var C_LinkPositionError2=i; i++; //this is not reaslly proper german (muss sein), but without knowing details I can't be precise
  A_Language[i] = 'Korrekte Daten wurden gespeichert.\nDamit korrigiert werden kann, wird die Seite nicht neu geladen.'; var C_SaveParameterError=i; i++;
  // ShowHideTable
  A_Language[i] = 'Verstecken'; var C_RollUp=i; i++;
  A_Language[i] = 'Zeigen'; var C_Unfold=i; i++;
  // Options : General parameters
  A_Language[i] = 'Generelle Parameter'; var C_MainOption=i; i++;
  A_Language[i] = 'Zeige Zahlen in kilo (1000 = 1k)'; var C_ShowInKilo=i; i++;
  A_Language[i] = 'Zeige Sekunden f\374r die Update Zeit'; var C_ShowSecondForUpperUpdateTimeInDay=i; i++; //DHU090101 not sure about this
  A_Language[i] = 'Verstecke \'Offizierskasino\' Link'; var C_DeleteOfficerLink=i; i++;
  A_Language[i] = 'Verstecke \'H\344ndler\' Link'; var C_DeleteTraderLink=i; i++;
  A_Language[i] = 'Position'; var C_Coordinates=i; i++;
  A_Language[i] = 'Name'; var C_Name=i; i++;
  A_Language[i] = 'Status'; var C_Status=i; i++;
  A_Language[i] = 'Punkte'; var C_Points=i; i++;
  A_Language[i] = 'Membership'; var C_MemberShip=i; i++;
  A_Language[i] = 'Online'; var C_Online=i; i++;
  A_Language[i] = 'Sortiere Spielerliste'; var C_SortMember=i; i++;
  A_Language[i] = 'Aufsteigend'; var C_Increasing=i; i++;
  A_Language[i] = 'Absteigend'; var C_Lessening=i; i++;
  A_Language[i] = 'Reihenfolge f\374r die Sortierung der Spielerliste'; var C_SortOrder=i;i++;
  A_Language[i] = 'F\374ge tooltip zu allen links hinzu'; var C_AddToolTip=i; i++;
  A_Language[i] = 'Zeige Meldung zur neuberechnung der Rohstoffseite wenn ein neues Geb\344ude erstellt wurde'; var C_ShowRequestToUpdateResourcesPage=i; i++;
  A_Language[i] = 'Zeige Link f\374r den automatischen Update aller Seiten.'; var C_ShowAutoUpdate=i; i++;
  A_Language[i] = 'Ben\374tze Zufallszeiten f\374r den automatischen Update (zwischen 2 und 10s)'; var C_UseRandomUpdateTime=i; i++;
  A_Language[i] = 'Version check php image am Ende der Seite'; var C_AddImageVersion=i; i++;
  A_Language[i] = 'Zeige Fehlermeldungen (Debugging)'; var C_Debug=i; i++;
  // Options : Display options
  A_Language[i] = 'Anzeigeoptionen'; var C_ScreenOption=i; i++;
  A_Language[i] = 'Zeige drop-down Liste der Planeten'; var C_ShowHeaderPlanetList=i; i++;
  A_Language[i] = 'Zeige Default Rohstofftabelle'; var C_ShowHeaderResourcesList=i; i++;
  A_Language[i] = 'F\374ge Rohstofftotal zur Default Rohstofftabelle'; var C_AddResourcesTotal=i; i++;
  A_Language[i] = 'Erm\366gliche die Verschiebung der Kopfzeile (Drop-down Liste der Planeten)'; var C_ChangeHeaderPosition=i; i++;
  A_Language[i] = 'Position der Kopfzeile (in css)'; var C_HeaderPosition=i; i++;
  A_Language[i] = 'Um sicher zu sein dass die Position ber\374cksichtigt wird, \253!important\273 nach der positionsangabe hinzuf\374gen.'; var C_PositionInformations=i; i++;
  A_Language[i] = 'Erm\366gliche die Verschiebung des main frame.'; var C_ChangeContentPosition=i; i++;
  A_Language[i] = 'Position des main frame (in css)'; var C_ContentPosition=i; i++;
  A_Language[i] = 'CSS code auf allen Seiten hinzuf\374gen'; var C_AddCssCode=i; i++;
  A_Language[i] = 'CSS code entfernen'; var C_RemoveCssCode=i; i++;
  A_Language[i] = 'JavaScript code auf allen Seiten hinzuf\374gen'; var C_AddJSCode=i; i++;
  A_Language[i] = 'Remove JavaScript code'; var C_RemoveJSCode=i; i++;
  A_Language[i] = 'Write your code here'; var C_WriteCode=i; i++;
  // Options : Resources table
  A_Language[i] = 'Rohstofftabelle'; var C_ResourcesTableOption=i; i++;
  A_Language[i] = 'Rohstofftabelle anzeigen'; var C_ShowHeaderResourcesTable=i; i++;
  A_Language[i] = 'Planetenname anzeigen'; var C_ShowPlanetName=i; i++;
  A_Language[i] = 'Zeige die Koordinaten der Planeten'; var C_ShowCoordinates=i; i++;
  A_Language[i] = 'Zeige Rohstofftotal'; var C_ShowTotal=i; i++;
  A_Language[i] = 'Zeige Dunkle Materie'; var C_ShowDarkMatter=i; i++;
  A_Language[i] = 'Zeige Zeit seit letztem Update'; var C_ShowTimeUpdate=i; i++;
  A_Language[i] = 'Zeige nur Rohstoffe der aktiven Sitzung'; var C_ShowResourcesOnlyActiveSession=i; i++
  A_Language[i] = 'Berechne Rohstoffe in Echtzeit'; var C_RealTimeResources=i; i++;
  A_Language[i] = 'Berechnungsintervall (s)'; var C_RealTimeResourcesDelay=i; i++;
  A_Language[i] = 'Style f\374r den header des aktiven Planeten (in css)'; var C_HeaderSelectedPlanetStyle=i; i++;
  A_Language[i] = 'Transparenz der Rohstoffelder (1 bis 100)'; var C_Transparency=i; i++;
  A_Language[i] = 'Farbe der Rohstoffelder abh\344ngig von der letzten Updatezeit (in Sekunden) (die Farbe wird ben\374tzt bis zum Verstreichen der angegebenen Sekunden)'; var C_UpdateTimeColor=i; i++;
  A_Language[i] = 'Rot, wenn die verstrichene Zeit gr\366sser ist als der letzte Wert.'; var C_UpdateTimeRed=i; i++;
  A_Language[i] = 'Aktiviere Sortierung der Planeten'; var C_PlanetOrder=i; i++;
  A_Language[i] = 'Selektiere einen Planeten und verschiebe die Position mit den Pfeilen'; var C_PlanetOrderDescription=i; i++;
  // Options : Empire
  A_Language[i] = 'Zeige Imperium Link'; var C_ShowEmpire=i; i++;
  A_Language[i] = 'Name des Imperium Links'; var C_EmpireLinkName=i; i++;
  A_Language[i] = 'Zeilennummer im Ogame Menu'; var C_EmpireMenuRow=i; i++;
  A_Language[i] = 'Pixelgr\366sse der Planetenbilder'; var C_EmpireIconSize=i; i++;
  A_Language[i] = 'Verstecke die Standard Rohstofftabelle'; var C_HideDefaultResourcesTable=i; i++;
  A_Language[i] = 'Erzwinge Anzeige der berechneten Resourcentabelle'; var C_ForceDisplayHeaderResourcesTableWithEmpire=i; i++;
  A_Language[i] = 'Selektiere einen Block und ben\374tze die Pfeile um ihn zu verschieben'; var C_BlockOrderDescription=i; i++;
  // Options : Transfer
  A_Language[i] = 'Transfer'; var C_Transfer=i; i++;
  A_Language[i] = 'Ben\374tze die Resultate der Echtzeitberechnung'; var C_UseRealTimeResources=i; i++;
  A_Language[i] = 'Anzeige der Resultate der Echtzeitberechnung. (Achtung CPU Belastung)'; var C_ForceResourcesTransferTableUpdate=i; i++;
  A_Language[i] = 'Zeige Transfer Formular wenn ein Transfer aktiv ist'; var C_ShowTransferTableIfActiveTransfer=i; i++;
  A_Language[i] = 'Speed ship ratio multiplier'; var C_TransferRatioSpeed=i; i++;
  // Options : Additional links
  A_Language[i] = 'Zus\344tzliche Links'; var C_LinkOption=i; i++;
  A_Language[i] = 'Linkname'; var C_LinkName=i; i++;
  A_Language[i] = 'URL'; var C_LinkUrl=i; i++;
  A_Language[i] = 'Zeile im Menu'; var C_LinkPosition=i; i++;
  A_Language[i] = 'Link in neuem Fenster \366ffnen'; var C_LinkNewWindow=i; i++;
  A_Language[i] = 'Textanzeige wenn die Maus dar\374ber steht'; var C_LinkTitle=i; i++; //DHU090101 questionable german
  A_Language[i] = 'Link hinzuf\374gen'; var C_AddLink=i; i++;
  A_Language[i] = 'Link n\260'; var C_LinkNumber=i; i++;
  A_Language[i] = 'L\366schen'; var C_Delete=i; i++;
  // Options
  A_Language[i] = 'Speichern'; var C_Save=i; i++;
  A_Language[i] = 'Control Panel'; var C_ControlPanel=i; i++;
  // Automatic update
  A_Language[i] = 'Update Start'; var C_StartUpdate=i; i++;
  A_Language[i] = 'Update Stop'; var C_StopUpdate=i; i++;
  A_Language[i] = 'Stop Automatischer Update'; var C_UpdateStopInformations=i; i++;
  A_Language[i] = 'Automatischer Update aller Seiten'; var C_UpdateInformations=i; i++;
  // Resources table
  A_Language[i] = 'N\344chster Planet'; var C_NextPlanet=i; i++;
  A_Language[i] = 'Vorheriger Planet'; var C_PreviousPlanet=i; i++;
  A_Language[i] = 'Erneuere die aktuelle Seite f\374r alle Planeten'; var C_UpdatePages=i; i++;
  // Empire
  A_Language[i] = 'Typ'; var C_Type=i; i++;
  A_Language[i] = 'Felder'; var C_FieldNumber=i; i++;
  A_Language[i] = 'bis'; var C_To=i; i++;
  A_Language[i] = 'Anwenden'; var C_Apply=i; i++;
  A_Language[i] = 'Image not saved'; var C_ImageNotSaved=i; i++;
  A_Language[i] = 'Hauptinformationen'; var C_MainInformations=i; i++;
  A_Language[i] = 'Produktion pro Stunde'; var C_HourProduction=i; i++;
  A_Language[i] = 'Produktion pro Tag'; var C_DayProduction=i; i++;
  A_Language[i] = 'Geb\344ude'; var C_BuildingsTxt=i; i++;
  A_Language[i] = 'Verteidigung'; var C_DefensesTxt=i; i++;
  A_Language[i] = 'Forschung'; var C_ResearchTxt=i; i++;
  A_Language[i] = 'Flotte'; var C_FleetsTxt=i; i++;
  A_Language[i] = 'Liste'; var C_List=i; i++;
  A_Language[i] = 'Schiffe und Verteidigungsanlagen unter Konstruktion'; var C_FleetsDefensesUC=i; i++;
  A_Language[i] = 'Gehe zu Geb\344ude'; var C_ToBuildings=i; i++;
  A_Language[i] = 'Gehe zu Forschung'; var C_ToResearch=i; i++;
  A_Language[i] = 'Gehe zu Verteidigung'; var C_ToDefenses=i; i++;
  A_Language[i] = 'Gehe zu Schiffswerft'; var C_ToFleets=i; i++;
  A_Language[i] = 'Energie von Solarsatelliten.'; var C_Ship212Production=i; i++;
  A_Language[i] = 'Anzahl Solarsatelliten ben\366tigt'; var C_Ship212NecessaryNumber=i; i++;
  A_Language[i] = 'Konstruktion m\366glich'; var C_ConstructionAvailable=i; i++;
  A_Language[i] = 'Mit Rohstoffen vom Planet'; var C_WithPlanetResources=i; i++;
  A_Language[i] = 'Mit Rohstoffen von allen Planeten'; var C_WithAllPlanetsResources=i; i++;
  A_Language[i] = 'Eine andere Konstruktion ist auf diesem Planeten im Gang'; var C_OtherBuildingsInConstruction=i; i++;
  A_Language[i] = 'Eine Forschung ist auf diesem Planeten im Gang'; var C_OtherResearchInDevelopment=i; i++;
  A_Language[i] = 'Total Geb\344udekosten'; var C_TotalBuildingsCost=i; i++;
  A_Language[i] = 'Level Kosten'; var C_LevelCost1=i; i++;
  A_Language[i] = ' ben\366tigt'; var C_LevelCost2=i; i++;
  A_Language[i] = 'Geb\344udebau abbrechen'; var C_StopBuildings=i; i++;
  A_Language[i] = 'Forschung abbrechen'; var C_StopResearch=i; i++;
  A_Language[i] = 'Geb\344udebau starten'; var C_LaunchBuildings=i; i++;
  A_Language[i] = 'Forschung Starten'; var C_LaunchResearch=i; i++;
  A_Language[i] = 'Verteidigung konstruieren'; var C_BuildDefenses=i; i++;
  A_Language[i] = 'Schiff konstruieren'; var C_BuildFleets=i; i++;
  A_Language[i] = 'Zeit f\374r die Konstruktion'; var C_BuildingTime=i; i++;
  // Empire : Export
  A_Language[i] = 'Exportieren'; var C_Export=i; i++;
  A_Language[i] = 'Generator Optionen'; var C_GeneratorOptions=i; i++;
  A_Language[i] = 'Zentriert'; var C_Center=i; i++;
  A_Language[i] = 'Text in Farbe'; var C_TextColored=i; i++;
  A_Language[i] = 'Keine Spezialzeichen'; var C_NoSpecialCharacter=i; i++;
  A_Language[i] = 'Tabelle'; var C_LayoutInTable=i; i++;
  A_Language[i] = 'Tabellentext zentriert'; var C_CenteredTextInTable=i; i++;
  A_Language[i] = 'Textgr\366sse der tabelle'; var C_ResizeTextInTable=i; i++;
  A_Language[i] = 'Ausf\374hren'; var C_Generate=i; i++;
  A_Language[i] = 'Zeichen'; var C_Characters=i; i++;
  // Transfer
  A_Language[i] = 'Rohstofftransfer'; var C_TransferResources=i; i++;
  A_Language[i] = 'There are any resources to be transfered.'; var C_NoResources=i; i++;
  A_Language[i] = 'Transfer ist nicht m\366glich. Nicht genug Raumschiffe.'; var C_NotEnoughShip1=i; i++;
  A_Language[i] = 'Anzahl Raumschiffe wird berechnet nach Besuch aller Flottenseiten.'; var C_NotEnoughShip2=i; i++;
  A_Language[i] = 'Ziel'; var C_Destination=i; i++;
  A_Language[i] = 'To send'; var C_ToTransfer=i; i++;
  A_Language[i] = 'Invertiere Selektion'; var C_InvertSelection=i; i++;
  A_Language[i] = 'Gesendet'; var C_Transfered=i; i++;
  A_Language[i] = 'Geschwindigkeit'; var C_Speed=i; i++;
  A_Language[i] = 'Recycler ?'; var C_NeededRecycler=i; i++;
  A_Language[i] = 'Transfer status'; var C_TransferState=i; i++;
  A_Language[i] = 'GT'; var C_LargeCargoShip=i; i++; // Abbreviation of Large Cargo Ship
  A_Language[i] = 'KT'; var C_SmallCargoShip=i; i++; // Abbreviation of Small Cargo Ship
  A_Language[i] = 'Kein Transfer m\366glich vom Zielplaneten.'; var C_NoTransferFromDestinationPlanet=i; i++;
  A_Language[i] = 'Nicht genug Recycler.'; var C_NoRecycler=i; i++;
  A_Language[i] = 'Nicht genug Grosse Transporter.'; var C_NotEnoughLargeCargoShip=i; i++;
  A_Language[i] = 'Nicht genug Kleine Transporter.'; var C_NotEnoughSmallCargoShip=i; i++;
  A_Language[i] = 'Rohstoffe wurden bereits von diesem Planeten gesendet.'; var C_AlreadyTransfered=i; i++;
  A_Language[i] = 'Dieser Planet wurde nicht f\374r den Transfer selektiert.'; var C_PlanetNotSelected=i; i++;
  A_Language[i] = 'Kein aktiver Transfer.'; var C_NoTransfer=i; i++;
  A_Language[i] = 'Selektiere Kolonien'; var C_ColonyToBeUsed=i; i++;
  A_Language[i] = 'Anderes Ziel'; var C_OtherDestination=i; i++;
  A_Language[i] = 'Rohstoffe zu transferieren'; var C_NeededResources=i; i++;
  A_Language[i] = 'Rest'; var C_Rest=i; i++;
  A_Language[i] = 'Sende Metall'; var C_MetalToBeSent=i; i++;
  A_Language[i] = 'Sende Kristall'; var C_CrystalToBeSent=i; i++;
  A_Language[i] = 'Sende Deuterium'; var C_DeuteriumToBeSent=i; i++;
  A_Language[i] = 'Flugzeit'; var C_FlightTime=i; i++;
  A_Language[i] = 'Geschwindigkeit'; var C_SendingSpeed=i; i++;
  A_Language[i] = 'Treibstoffverbrauch'; var C_DeuteriumConsumption=i; i++;
  A_Language[i] = 'Sende KT oder GT'; var C_TransportShipNumber=i; i++;
  A_Language[i] = 'Berechnungsoptionen'; var C_TransferCalcOption=i; i++;
  A_Language[i] = 'Berechnungsmodus'; var C_CalcMode=i; i++;
  A_Language[i] = 'Transfer Rohstoffe von Planeten mit vollen Rohstofflagern (Same rest after transfer)'; var C_SameRest=i; i++; //DHU090101 not sure if that's the correct transaltion
  A_Language[i] = 'Transfer die gleiche Menge von jedem Planeten'; var C_SameQuantity=i; i++;
  A_Language[i] = 'Ben\374tze alle Rohstoffe auf dem Zielplaneten'; var C_UseTotalResourcesDestinationPlanet=i; i++;
  A_Language[i] = 'Flugzeit m\366glichst die gleiche'; var C_SameTime=i; i++;
  A_Language[i] = 'Schnellste'; var C_Fastest=i; i++;
  A_Language[i] = 'Ankunftdatum und Zeit'; var C_ArrivalDate=i; i++;
  A_Language[i] = 'Jahr'; var C_Year=i; i++;
  A_Language[i] = 'Monat'; var C_Month=i; i++;
  A_Language[i] = 'Tag'; var C_Day=i; i++;
  A_Language[i] = 'Stunde'; var C_Hour=i; i++;
  A_Language[i] = 'Minute'; var C_Minute=i; i++;
  A_Language[i] = 'Tag(e)'; var C_Days=i; i++;
  A_Language[i] = 'Stunde(n)'; var C_Hours=i; i++;
  A_Language[i] = 'Minute(n)'; var C_Minutes=i; i++;
  A_Language[i] = 'd'; var C_DayAbbreviation=i; i++;
  A_Language[i] = 'h'; var C_HourAbbreviation=i; i++;
  A_Language[i] = 'm'; var C_MinuteAbbreviation=i; i++;
  A_Language[i] = 's'; var C_SecondAbbreviation=i; i++;
  A_Language[i] = 'Ben\374tze Recycler um die Flugzeit zu korrigieren'; var C_AddRecycler=i; i++;
  A_Language[i] = 'Fracht'; var C_TransportShip=i; i++;
  A_Language[i] = 'Transfer speichern'; var C_SaveTransfer=i; i++;
  A_Language[i] = 'Transfer abbrechen'; var C_CancelTransfer=i; i++;
  A_Language[i] = 'Lade Fracht'; var C_FillShip=i; i++;
  A_Language[i] = 'Planets unsaved had been found. You should revisit them.'; var C_UnsavedPlanets=i; i++;
  A_Language[i] = 'Position und Geschwindigkeit'; var C_FillCoordinatesAndSpeed=i; i++;
  A_Language[i] = 'Rohstoffe'; var C_FillResources=i; i++;
  A_Language[i] = 'Weiter'; var C_Continue=i; i++;
  // Other
  A_Language[i] = 'Ausf\374hrungszeit'; var C_RunTime=i; i++;
  A_Language[i] = 'Ein Geb\344ude welches den Produktionsfakto beeinflusst wurde gefunden.\n\nSoll die Rohstoffseite jetzt aktualisiert werden?'; var C_ResourcesBuildingsUC=i; i++;
  // Welcome message
  A_Language[i] = 'Willkommen zu der neuen Version von \253'+C_ScriptName+'\273 (Version: '+C_ScriptVersion+', build: '+C_ScriptBuild+')\n\nDutch translation : by Frutelaken\nGerman translation : by Dhu\nItalienische \334bersetzung: Fiox\nPortuguese translation : by Spac3h\nSpanish translation : by ETintos\nDanke an alle Beta Tester.\n\n'+
  'Der meiste Code dieser version wurde neu geschrieben. Es wird empfohlen einen automatischen Update (Update Start) durchzuf\374hren.\n\n'+
  'Nachdem OK geklickt wurde wird das Script den Technologiebaum laden.\n\n'+
  '\304nderungen in dieser Version k\366nnen in der Sektion \253DESCRIPTION DES MISES A JOUR\273 im Script nachgelesen werden (nur in Franz\366sisch).'; var C_NewVersion=i; i++;
  A_Language[i] = 'Willkommen zu der neuen Version von \253'+C_ScriptName+'\273 (Version: '+C_ScriptVersion+', build: '+C_ScriptBuild+')\n\nDutch translation : by Frutelaken\nGerman translation : by Dhu\nItalienische \334bersetzung: Fiox\nPortuguese translation : by Spac3h\nSpanish translation : by ETintos\nDanke an alle Beta Tester.\n\n'+
  '\304nderungen in dieser Version k\366nnen in der Sektion \253DESCRIPTION DES MISES A JOUR\273 im Script nachgelesen werden (nur in Franz\366sisch).'; var C_NewBuild=i; i++;
}
else if (Language == 6) { // ES
  // For accented character, use unicode or octal code to replace it, use this link (http://www.vbc3.com/script/unicode_octal_html_code.php)
  i = 0;
  A_Language[i] = 'Planeta'; i++;
  A_Language[i] = 'Luna'; i++;
  A_Language[i] = 'Metal'; var C_Metal=i; i++;
  A_Language[i] = 'Cristal'; var C_Crystal=i; i++;
  A_Language[i] = 'Deuterio'; var C_Deuterium=i; i++;
  A_Language[i] = 'Energia'; var C_Energy=i; i++;
  A_Language[i] = 'Materia Oscura'; var C_DarkMatter=i; i++;
  A_Language[i] = 'Empire'; var C_Empire=i; i++;
  A_Language[i] = 'Recursos'; var C_Resources=i; i++;
  A_Language[i] = 'Actualizar'; var C_Update=i; i++;
  A_Language[i] = 'Si'; var C_Yes=i; i++;
  A_Language[i] = 'No'; var C_No=i; i++;
  A_Language[i] = 'Mostrar'; var C_Show=i; i++;
  A_Language[i] = 'Ocultar'; var C_Hide=i; i++;
  // Required text for analysis, include spaces, must be exact
  A_Language[i] = 'Di\341metro'; var C_Diameter=i; i++; // Overview page
  A_Language[i] = 'Temperatura'; var C_Temperature=i; i++; // Overview page
  A_Language[i] = 'Suma'; var C_Total=i; i++; // Name of total in resources page
  A_Language[i] = 'Producci\363n de recursos en'; var C_ResourcesTableHeader=i; i++; // Beginning of the first row from the resources table (resources page) 
  A_Language[i] = 'Requisitos'; var C_Require=i; i++; // First word of the right cell in tree technology table 
  A_Language[i] = 'Factor de producci\363n:'; var C_ProductionRate=i; i++; // Text before production rate number in resources page
  // ValidateBuilding
  A_Language[i] = 'Insuficientes n\372mero de campos libres'; var C_NotEnoughFreeField=i; i++;
  A_Language[i] = 'La Base lunar no se esta construyendo'; var C_LunarBaseNotBuilt=i; i++;
  A_Language[i] = 'No disponible en planta'; var C_NotOnPlanet=i; i++;
  A_Language[i] = 'No disponible en la luna'; var C_NotOnMoon=i; i++;
  // AddLink
  A_Language[i] = 'Key words :\n\nSome part can be replaced keywords.\n\n'+
  '[session] To get the id of the current session\n'+
  '[host] To get the domain of the ogame universe\n'+
  '[Planet name] To get the id of one of your planets\n\n'+
  'Ex: Creation of a link to the \'overview\' page of the planet named \253Homeworld\273 :\n'+
  'http://[host]/game/index.php?page=overview&session=[session]&cp=[Homeworld]\n\n'+
  'Become (for universe 10) :\n'+
  'http://uni10.ogame.org/game/index.php?page=overview&session=2943046dc47f&cp=34317957'; var C_KeyWordsInformations=i; i++;
  // SaveParameter
  A_Language[i] = 'Hay un error en el valor de la transparencia.\nEl valor debe de ser entre 1 and 100'; var C_TransparencyError=i; i++;
  A_Language[i] = 'El valor de la fila no es correcta.\nEl valor debe de ser entre 1 y '; var C_EmpireRowError=i; i++;
  A_Language[i] = 'El nombre del enlace hacia el menu imperio debe contener al menos un caracter'; var C_EmpireTxtError=i; i++;
  A_Language[i] = 'El tama\361o de los iconos de la Vista Empire debe de ser superior a 1 pixel.'; var C_EmpireSizeIconError=i; i++;
  A_Language[i] = 'El enlace '; var C_LinkPositionError1=i; i++;
  A_Language[i] = 'No se puede guardar.\nVerique el nombre, enlace y el n\372mero de fila.\nEl vinculo de la fila debe de ser entre 1 y '; var C_LinkPositionError2=i; i++;
  A_Language[i] = 'Informaci\363n ha sido grabada. \nLa pagina no se actualizara.'; var C_SaveParameterError=i; i++;
  // ShowHideTable
  A_Language[i] = 'Ocultar Informaci\363n'; var C_RollUp=i; i++;
  A_Language[i] = 'Mostrar Informaci\363n'; var C_Unfold=i; i++;
  // Options : General parameters
  A_Language[i] = 'Parametros Generales'; var C_MainOption=i; i++;
  A_Language[i] = 'Mostrar los miles con k'; var C_ShowInKilo=i; i++;
  A_Language[i] = 'Show seconds for the upper update at 24h'; var C_ShowSecondForUpperUpdateTimeInDay=i; i++;
  A_Language[i] = 'Borrar enlace \'Casino de los Oficiales\''; var C_DeleteOfficerLink=i; i++;
  A_Language[i] = 'Borrar enlace \'Mercader\''; var C_DeleteTraderLink=i; i++;
  A_Language[i] = 'Posici\363n'; var C_Coordinates=i; i++;
  A_Language[i] = 'Nombre'; var C_Name=i; i++;
  A_Language[i] = 'Estatus'; var C_Status=i; i++;
  A_Language[i] = 'Puntos'; var C_Points=i; i++;
  A_Language[i] = 'Membership'; var C_MemberShip=i; i++;
  A_Language[i] = 'Enlinea'; var C_Online=i; i++;
  A_Language[i] = 'Ordenar lista de Miembros de la Alianza'; var C_SortMember=i; i++;
  A_Language[i] = 'Ascendente'; var C_Increasing=i; i++;
  A_Language[i] = 'Descendente'; var C_Lessening=i; i++;
  A_Language[i] = 'Orden de la lista de Miembros de la Alianza'; var C_SortOrder=i;i++;
  A_Language[i] = 'Agregar Ayuda a todos los enlaces'; var C_AddToolTip=i; i++;
  A_Language[i] = 'Mostrar un mensaje que le pide que actualice la pagina de recursos en caso de modificaci\363n de un nuevo edificio que fue construido'; var C_ShowRequestToUpdateResourcesPage=i; i++;
  A_Language[i] = 'Mostrar un enlace a todas las paginas de actualizaci\363n automatica.'; var C_ShowAutoUpdate=i; i++;
  A_Language[i] = 'Utilizar un tiempo al azar para actualizar las paginas de forma automatica (entre 2 y 10s)'; var C_UseRandomUpdateTime=i; i++;
  A_Language[i] = 'Mostrar cuadro en la parte inferior para actualizar el Ogame Transfer'; var C_AddImageVersion=i; i++;
  A_Language[i] = 'Mostrar los mensajes de error (depuraci\363n)'; var C_Debug=i; i++;
  // Options : Display options
  A_Language[i] = 'Opciones de Visualizaci\363n'; var C_ScreenOption=i; i++;
  A_Language[i] = 'Mostrar la lista desplegable de los planetas'; var C_ShowHeaderPlanetList=i; i++;
  A_Language[i] = 'Mostrar la tabla de los recursos por defecto'; var C_ShowHeaderResourcesList=i; i++;
  A_Language[i] = 'A\361ade el total de recursos a la tabla de los recursos por defecto'; var C_AddResourcesTotal=i; i++;
  A_Language[i] = 'Activar la posibilidad de cambiar la posici\363n del encabezado (la lista desplegable de los planetas)'; var C_ChangeHeaderPosition=i; i++;
  A_Language[i] = 'Posici\363n de la cabecera (en el css)'; var C_HeaderPosition=i; i++;
  A_Language[i] = 'To be sure that your position is taken in consideration, you can add \253!important\273 after the position.'; var C_PositionInformations=i; i++;
  A_Language[i] = 'Activar la posibilidad de cambiar la posici\363n del encabezado.'; var C_ChangeContentPosition=i; i++;
  A_Language[i] = 'Posici\363n de la cabecera (en css)'; var C_ContentPosition=i; i++;
  A_Language[i] = 'Agregar codigo CSS en todas las paginas'; var C_AddCssCode=i; i++;
  A_Language[i] = 'Borrar codigo CSS'; var C_RemoveCssCode=i; i++;
  A_Language[i] = 'Agregar codigo JavaScript en todas la paginas'; var C_AddJSCode=i; i++;
  A_Language[i] = 'Borrar codigo JavaScript code'; var C_RemoveJSCode=i; i++;
  A_Language[i] = 'Escribe tu codigo aqui'; var C_WriteCode=i; i++;
  // Options : Resources table
  A_Language[i] = 'Tabla de Recursos'; var C_ResourcesTableOption=i; i++;
  A_Language[i] = 'Mostrar los recursos de la tabla'; var C_ShowHeaderResourcesTable=i; i++;
  A_Language[i] = 'Mostrar el nombre del Planeta'; var C_ShowPlanetName=i; i++;
  A_Language[i] = 'Mostrar las cordenas del Planeta'; var C_ShowCoordinates=i; i++;
  A_Language[i] = 'A\361adir la columna total de los recursos'; var C_ShowTotal=i; i++;
  A_Language[i] = 'Mostrar columna de la materia oscura'; var C_ShowDarkMatter=i; i++;
  A_Language[i] = 'Mostrar el tiempo transcurrido desde la ultima actualizaci\363n'; var C_ShowTimeUpdate=i; i++;
  A_Language[i] = 'Mostrar unicamente los recursos de sesion activa'; var C_ShowResourcesOnlyActiveSession=i; i++
  A_Language[i] = 'Calcular los recursos en tiempo real'; var C_RealTimeResources=i; i++;
  A_Language[i] = 'Intervalo de tiempo entre cada calculo'; var C_RealTimeResourcesDelay=i; i++;
  A_Language[i] = 'Estilo del encabezado del actual planeta (en css)'; var C_HeaderSelectedPlanetStyle=i; i++;
  A_Language[i] = 'Transparencia de las celdas de los recursos (1 a 100)'; var C_Transparency=i; i++;
  A_Language[i] = 'Color correspondiente al tiempo transcurrido (en segundos) (el color se utilizara cuando sobrepase los segundos, si es inferior s\363lo llena el tiempo)'; var C_UpdateTimeColor=i; i++;
  A_Language[i] = 'Y rojo, si el tiempo de actualizaci\363n es superior.'; var C_UpdateTimeRed=i; i++;
  A_Language[i] = 'Ordenar Planetas'; var C_PlanetOrder=i; i++;
  A_Language[i] = 'Elige un planeta y utilizar las flechas para cambiar su posici\363n'; var C_PlanetOrderDescription=i; i++;
  // Options : Empire
  A_Language[i] = 'Mostrar el enlace Empire'; var C_ShowEmpire=i; i++;
  A_Language[i] = 'Nombre del enlace Empire'; var C_EmpireLinkName=i; i++;
  A_Language[i] = 'N\372mero de fila en el menu de ogame (Posici\363n)'; var C_EmpireMenuRow=i; i++;
  A_Language[i] = 'Tama\361o en pixeles de los planetas en miniatura'; var C_EmpireIconSize=i; i++;
  A_Language[i] = 'Ocultar la tabla de recursos por defecto'; var C_HideDefaultResourcesTable=i; i++;
  A_Language[i] = 'Fuerza la pantalla de la tabla de los recursos generados.'; var C_ForceDisplayHeaderResourcesTableWithEmpire=i; i++;
  A_Language[i] = 'Choose one block and use arrows to change its position'; var C_BlockOrderDescription=i; i++;
  // Options : Transfer
  A_Language[i] = 'Transportar'; var C_Transfer=i; i++;
  A_Language[i] = 'Utilizar Resultado de los recursos del calculo en tiempo real'; var C_UseRealTimeResources=i; i++;
  A_Language[i] = 'Fuerza de la pantalla de los recursos calculados en tiempo real (importante el uso de la CPU)'; var C_ForceResourcesTransferTableUpdate=i; i++;
  A_Language[i] = 'Mostrar un formulario si la transferencia est\341 en progreso'; var C_ShowTransferTableIfActiveTransfer=i; i++;
  A_Language[i] = 'Velocidad promedio de las naves'; var C_TransferRatioSpeed=i; i++;
  // Options : Additional links
  A_Language[i] = 'Enlace'; var C_LinkOption=i; i++;
  A_Language[i] = 'Nombre del enlace'; var C_LinkName=i; i++;
  A_Language[i] = 'Direcci\363n del enlace'; var C_LinkUrl=i; i++;
  A_Language[i] = 'El n\372mero de fila en el men\372'; var C_LinkPosition=i; i++;
  A_Language[i] = 'Abre el enlace en una nueva ventana'; var C_LinkNewWindow=i; i++;
  A_Language[i] = 'Texto a mostrar cuando se pase el mouse arriba del enlace'; var C_LinkTitle=i; i++;
  A_Language[i] = 'Agregar Enlace'; var C_AddLink=i; i++;
  A_Language[i] = 'Enlace n\260'; var C_LinkNumber=i; i++;
  A_Language[i] = 'Borrar'; var C_Delete=i; i++;
  // Options
  A_Language[i] = 'Guardar Cambios'; var C_Save=i; i++;
  A_Language[i] = 'Panel de Control'; var C_ControlPanel=i; i++;
  // Automatic update
  A_Language[i] = 'Empezar Actualizar'; var C_StartUpdate=i; i++;
  A_Language[i] = 'Detener Actualizar'; var C_StopUpdate=i; i++;
  A_Language[i] = 'Detener actualizar automaticamente'; var C_UpdateStopInformations=i; i++;
  A_Language[i] = 'Actualiza todas las paginas en Automatico'; var C_UpdateInformations=i; i++;
  // Resources table
  A_Language[i] = 'Siguiente planeta'; var C_NextPlanet=i; i++;
  A_Language[i] = 'Anterior planeta'; var C_PreviousPlanet=i; i++;
  A_Language[i] = 'Actualiza la pagina actual en todos los planetas'; var C_UpdatePages=i; i++;
  // Empire
  A_Language[i] = 'Tipo'; var C_Type=i; i++;
  A_Language[i] = 'N\372mero de Campos'; var C_FieldNumber=i; i++;
  A_Language[i] = '/'; var C_To=i; i++;
  A_Language[i] = 'Aplicar'; var C_Apply=i; i++;
  A_Language[i] = 'Imagen no grabada'; var C_ImageNotSaved=i; i++;
  A_Language[i] = 'Informaci\363n Principal'; var C_MainInformations=i; i++;
  A_Language[i] = 'Producci\363n por Hora'; var C_HourProduction=i; i++;
  A_Language[i] = 'Producci\363n por D\355a'; var C_DayProduction=i; i++;
  A_Language[i] = 'Edificios'; var C_BuildingsTxt=i; i++;
  A_Language[i] = 'Defensas'; var C_DefensesTxt=i; i++;
  A_Language[i] = 'Investigaci\363n'; var C_ResearchTxt=i; i++;
  A_Language[i] = 'Flota'; var C_FleetsTxt=i; i++;
  A_Language[i] = 'Lista'; var C_List=i; i++;
  A_Language[i] = 'Naves y defensas bajo construci\363n'; var C_FleetsDefensesUC=i; i++;
  A_Language[i] = 'Ir a Edificios'; var C_ToBuildings=i; i++;
  A_Language[i] = 'Ir a Investigaciones'; var C_ToResearch=i; i++;
  A_Language[i] = 'Ir a Defensas'; var C_ToDefenses=i; i++;
  A_Language[i] = 'Ir a Hangar'; var C_ToFleets=i; i++;
  A_Language[i] = 'Energia proporcionada por los satelites solares.'; var C_Ship212Production=i; i++;
  A_Language[i] = 'N\372mero de satelites solar necesarios'; var C_Ship212NecessaryNumber=i; i++;
  A_Language[i] = 'Construcci\363n disponible'; var C_ConstructionAvailable=i; i++;
  A_Language[i] = 'Con recursos del planeta'; var C_WithPlanetResources=i; i++;
  A_Language[i] = 'Con recursos de todos los planetas'; var C_WithAllPlanetsResources=i; i++;
  A_Language[i] = 'Hay otra construcci\363n en progreso en este planeta'; var C_OtherBuildingsInConstruction=i; i++;
  A_Language[i] = 'Hay Otra investigaci\363n en desarrollo en el planeta'; var C_OtherResearchInDevelopment=i; i++;
  A_Language[i] = 'Costo total de los edificios'; var C_TotalBuildingsCost=i; i++;
  A_Language[i] = 'Nivel de Costo'; var C_LevelCost1=i; i++;
  A_Language[i] = ' requiere'; var C_LevelCost2=i; i++;
  A_Language[i] = 'Cancelar edificio'; var C_StopBuildings=i; i++;
  A_Language[i] = 'Cancelar investigaci\363n'; var C_StopResearch=i; i++;
  A_Language[i] = 'Empezar Construcci\363n'; var C_LaunchBuildings=i; i++;
  A_Language[i] = 'Empezar Investigaci\363n'; var C_LaunchResearch=i; i++;
  A_Language[i] = 'Build defense'; var C_BuildDefenses=i; i++;
  A_Language[i] = 'Build ship'; var C_BuildFleets=i; i++;
  A_Language[i] = 'Tiempo para su Producci\363n'; var C_BuildingTime=i; i++;
  // Empire : Export
  A_Language[i] = 'Exportar'; var C_Export=i; i++;
  A_Language[i] = 'Generador de opciones'; var C_GeneratorOptions=i; i++;
  A_Language[i] = 'Centrado'; var C_Center=i; i++;
  A_Language[i] = 'Texto en color'; var C_TextColored=i; i++;
  A_Language[i] = 'No especial caracter'; var C_NoSpecialCharacter=i; i++;
  A_Language[i] = 'Tabla'; var C_LayoutInTable=i; i++;
  A_Language[i] = 'Centrar texto en la tabla'; var C_CenteredTextInTable=i; i++;
  A_Language[i] = 'Cambiar el tama\361o del texto en la tabla'; var C_ResizeTextInTable=i; i++;
  A_Language[i] = 'Generar'; var C_Generate=i; i++;
  A_Language[i] = 'Caracteres'; var C_Characters=i; i++;
  // Transfer
  A_Language[i] = 'Transportar Recursos'; var C_TransferResources=i; i++;
  A_Language[i] = 'Hay algunos recursos que pueden transportarse.'; var C_NoResources=i; i++;
  A_Language[i] = 'La Transferencia es impossibile. Usted no tiene suficiente de Naves en el planeta.'; var C_NotEnoughShip1=i; i++;
  A_Language[i] = 'Usted debe revisar todas las paginas para actualizar el n\372mero de flotas.'; var C_NotEnoughShip2=i; i++;
  A_Language[i] = 'Destino'; var C_Destination=i; i++;
  A_Language[i] = 'Para enviar'; var C_ToTransfer=i; i++;
  A_Language[i] = 'Invertir seleci\363n'; var C_InvertSelection=i; i++;
  A_Language[i] = 'Enviado'; var C_Transfered=i; i++;
  A_Language[i] = 'Velocidad'; var C_Speed=i; i++;
  A_Language[i] = 'Reciclador'; var C_NeededRecycler=i; i++;
  A_Language[i] = 'Estatus de transferencia'; var C_TransferState=i; i++;
  A_Language[i] = 'Nave Grande'; var C_LargeCargoShip=i; i++; // Abbreviation of Large Cargo Ship
  A_Language[i] = 'Nave Peque\361a'; var C_SmallCargoShip=i; i++; // Abbreviation of Small Cargo Ship
  A_Language[i] = 'No se puede transportar recursos hacia el planeta destino.'; var C_NoTransferFromDestinationPlanet=i; i++;
  A_Language[i] = 'No hay Recicladores.'; var C_NoRecycler=i; i++;
  A_Language[i] = 'No hay Nave Grande de carga.'; var C_NotEnoughLargeCargoShip=i; i++;
  A_Language[i] = 'No hay Nave Peque\361a de carga.'; var C_NotEnoughSmallCargoShip=i; i++;
  A_Language[i] = 'Resources had already sent from this planet.'; var C_AlreadyTransfered=i; i++;
  A_Language[i] = 'This planet hadn\'t been selected for the transfer.'; var C_PlanetNotSelected=i; i++;
  A_Language[i] = 'No transfer in progress.'; var C_NoTransfer=i; i++;
  A_Language[i] = 'Seleciona Colonia'; var C_ColonyToBeUsed=i; i++;
  A_Language[i] = 'Otro Destino'; var C_OtherDestination=i; i++;
  A_Language[i] = 'Llena los recursos a Transportar'; var C_NeededResources=i; i++;
  A_Language[i] = 'Restan'; var C_Rest=i; i++;
  A_Language[i] = 'Metal para enviar'; var C_MetalToBeSent=i; i++;
  A_Language[i] = 'Cristal para enviar'; var C_CrystalToBeSent=i; i++;
  A_Language[i] = 'Deuterio para enviar'; var C_DeuteriumToBeSent=i; i++;
  A_Language[i] = 'Tiempo de Vuelo'; var C_FlightTime=i; i++;
  A_Language[i] = 'Velocidad'; var C_SendingSpeed=i; i++;
  A_Language[i] = 'Consumo de combustible'; var C_DeuteriumConsumption=i; i++;
  A_Language[i] = 'Nave Grande o Peque\361a para ser enviada'; var C_TransportShipNumber=i; i++;
  A_Language[i] = 'Opciones de c\341lculo'; var C_TransferCalcOption=i; i++;
  A_Language[i] = 'Modo de c\341culo'; var C_CalcMode=i; i++;
  A_Language[i] = 'Transportar recursos de los planetas con el m\341ximo de recursos'; var C_SameRest=i; i++;
  A_Language[i] = 'Transportar la misma cantidad de cada planeta'; var C_SameQuantity=i; i++;
  A_Language[i] = 'Utilizar todos los recursos en el planeta de destino'; var C_UseTotalResourcesDestinationPlanet=i; i++;
  A_Language[i] = 'El tiempo de vuelo lo m\341s cercano posible'; var C_SameTime=i; i++;
  A_Language[i] = 'Lo m\341s rapido posible'; var C_Fastest=i; i++;
  A_Language[i] = 'Fecha de llegada'; var C_ArrivalDate=i; i++;
  A_Language[i] = 'A\361o'; var C_Year=i; i++;
  A_Language[i] = 'Mes'; var C_Month=i; i++;
  A_Language[i] = 'D\355a'; var C_Day=i; i++;
  A_Language[i] = 'Hora'; var C_Hour=i; i++;
  A_Language[i] = 'Minuto'; var C_Minute=i; i++;
  A_Language[i] = 'D\355a(s)'; var C_Days=i; i++;
  A_Language[i] = 'Hora(s)'; var C_Hours=i; i++;
  A_Language[i] = 'Minuto(s)'; var C_Minutes=i; i++;
  A_Language[i] = 'd'; var C_DayAbbreviation=i; i++;
  A_Language[i] = 'h'; var C_HourAbbreviation=i; i++;
  A_Language[i] = 'm'; var C_MinuteAbbreviation=i; i++;
  A_Language[i] = 's'; var C_SecondAbbreviation=i; i++;
  A_Language[i] = 'A\361adir un reciclador si es necesario para ajustar el tiempo de vuelo'; var C_AddRecycler=i; i++;
  A_Language[i] = 'Cargo'; var C_TransportShip=i; i++;
  A_Language[i] = 'Enviar'; var C_SaveTransfer=i; i++;
  A_Language[i] = 'Cancelar Env\355o'; var C_CancelTransfer=i; i++;
  A_Language[i] = 'Llena Naves de cargos'; var C_FillShip=i; i++;
  A_Language[i] = 'Planets unsaved had been found. You should revisit them.'; var C_UnsavedPlanets=i; i++;
  A_Language[i] = 'Llena posici\363n y velocidad'; var C_FillCoordinatesAndSpeed=i; i++;
  A_Language[i] = 'Llena recursos'; var C_FillResources=i; i++;
  A_Language[i] = 'Continue'; var C_Continue=i; i++;
  // Other
  A_Language[i] = 'Tiempo de Ejecuci\363n:'; var C_RunTime=i; i++;
  A_Language[i] = 'A buildings which modify production factor had been found.\n\nDo you want to update the resources page now?'; var C_ResourcesBuildingsUC=i; i++;
  // Welcome message
  A_Language[i] = 'Bienvenido a la nueva version de \253'+C_ScriptName+'\273 (version: '+C_ScriptVersion+', build: '+C_ScriptBuild+')\n\nDutch translation : by Frutelaken\nGerman translation : by Dhu\nItalian traducion : by Fiox\nPortuguese translation : by Spac3h\nSpanish translation : by ETintos\nThanks to all beta tester.\n\n'+
  'For this version, most of the code were rewritten, it is thus advised to launch an automatic updating of pages from your account following this message.\n\n'+
  'Just after your click on OK, the script will load the tree technology page to get the name of each construction.\n\n'+
  'To see the changes about this version, go to the section named \253DESCRIPTION DES MISES A JOUR\273 in the script (Only in french).'; var C_NewVersion=i; i++;
  A_Language[i] = 'Welcome to the new version of \253'+C_ScriptName+'\273 (version: '+C_ScriptVersion+', build: '+C_ScriptBuild+')\n\nDutch translation : by Frutelaken\nGerman translation : by Dhu\nItalian translation : by Fiox\nPortuguese translation : by Spac3h\nSpanish translation : by ETintos\nThanks to all beta tester.\n\n'+
  'To see the changes about this version, go to the section named \253DESCRIPTION DES MISES A JOUR\273 in the script (Only in french).'; var C_NewBuild=i; i++;
}
else if (Language == 7) { // PT
  // For accented character, use unicode or octal code to replace it, use this link (http://www.vbc3.com/script/unicode_octal_html_code.php)
  i = 0;
  A_Language[i] = 'Planeta'; i++;
  A_Language[i] = 'Lua'; i++;
  A_Language[i] = 'Metal'; var C_Metal=i; i++;
  A_Language[i] = 'Cristal'; var C_Crystal=i; i++;
  A_Language[i] = 'Deuterio'; var C_Deuterium=i; i++;
  A_Language[i] = 'Energia'; var C_Energy=i; i++;
  A_Language[i] = 'Materia Negra'; var C_DarkMatter=i; i++;
  A_Language[i] = 'Imperio'; var C_Empire=i; i++;
  A_Language[i] = 'Recursos'; var C_Resources=i; i++;
  A_Language[i] = 'Actualizar'; var C_Update=i; i++;
  A_Language[i] = 'Sim'; var C_Yes=i; i++;
  A_Language[i] = 'Nao'; var C_No=i; i++;
  A_Language[i] = 'Mostrar'; var C_Show=i; i++;
  A_Language[i] = 'Esconder'; var C_Hide=i; i++;
  // Required text for analysis, include spaces, must be exact
  A_Language[i] = 'Di\342metro'; var C_Diameter=i; i++; // Overview page
  A_Language[i] = 'Temperatura'; var C_Temperature=i; i++; // Overview page
  A_Language[i] = 'Produ\347\343o Total'; var C_Total=i; i++; // Name of total in resources page
  A_Language[i] = 'Recursos no planeta'; var C_ResourcesTableHeader=i; i++; // Beginning of the first row from the resources table (resources page) 
  A_Language[i] = 'Requisito(s):'; var C_Require=i; i++; // First word of the right cell in tree technology table 
  A_Language[i] = 'Factor de Produ\347\343o:'; var C_ProductionRate=i; i++; // Text before production rate number in resources page
  // ValidateBuilding
  A_Language[i] = 'O numero de campos livres e insuficiente'; var C_NotEnoughFreeField=i; i++;
  A_Language[i] = 'A base lunar ainda nao esta construida'; var C_LunarBaseNotBuilt=i; i++;
  A_Language[i] = 'Nao disponivel no planeta'; var C_NotOnPlanet=i; i++;
  A_Language[i] = 'Nao disponivel na lua'; var C_NotOnMoon=i; i++;
  // AddLink
  A_Language[i] = 'Key words :\n\nAlgumas partes do endereco podem ser substituidas por keywords.\n\n'+
  '[session] To get the id of the current session\n'+
  '[host] To get the domain of the ogame universe\n'+
  '[Planet name] To get the id of one of your planets\n\n'+
  'Ex: Creation of a link to the \'overview\' page of the planet named \253Homeworld\273 :\n'+
  'http://[host]/game/index.php?page=overview&session=[session]&cp=[Homeworld]\n\n'+
  'Become (for universe 10) :\n'+
  'http://uni10.ogame.org/game/index.php?page=overview&session=2943046dc47f&cp=34317957'; var C_KeyWordsInformations=i; i++;
  // SaveParameter
  A_Language[i] = 'Existe um erro no valor da transparencia.\nO valor deve ser entre 1 e 100'; var C_TransparencyError=i; i++;
  A_Language[i] = 'O valor da linha do imperio nao esta correcto.\nO valor deve ser entre 1 e '; var C_EmpireRowError=i; i++;
  A_Language[i] = 'O nome do link do menu imperio tem de conter pelo menos um caracter'; var C_EmpireTxtError=i; i++;
  A_Language[i] = 'O tamanho dos icons de planetas na vista de imperio teem de ser maiores de 1 pixel.'; var C_EmpireSizeIconError=i; i++;
  A_Language[i] = 'O link'; var C_LinkPositionError1=i; i++;
  A_Language[i] = ' nao pode ser guardado.\nVerifique o nome, link e numero de linha.\nO numero de linha tem de ser entre 1 e '; var C_LinkPositionError2=i; i++;
  A_Language[i] = 'Os dados foram guardados\nPodera editar os dados, a pagina nao vai sofrer refresh.'; var C_SaveParameterError=i; i++;
  // ShowHideTable
  A_Language[i] = 'Ocultar'; var C_RollUp=i; i++;
  A_Language[i] = 'Mostrar'; var C_Unfold=i; i++;
  // Options : General parameters
  A_Language[i] = 'Parametros gerais'; var C_MainOption=i; i++;
  A_Language[i] = 'Mostrar numeros em kilo'; var C_ShowInKilo=i; i++;
  A_Language[i] = 'Mostrar segundos para o update as 24h'; var C_ShowSecondForUpperUpdateTimeInDay=i; i++;
  A_Language[i] = 'Apagar Links \'Casino de Oficiais\''; var C_DeleteOfficerLink=i; i++;
  A_Language[i] = 'Apagar Link \'mercador\''; var C_DeleteTraderLink=i; i++;
  A_Language[i] = 'Posicao'; var C_Coordinates=i; i++;
  A_Language[i] = 'Nome'; var C_Name=i; i++;
  A_Language[i] = 'Status'; var C_Status=i; i++;
  A_Language[i] = 'Pontos'; var C_Points=i; i++;
  A_Language[i] = 'Membership'; var C_MemberShip=i; i++;
  A_Language[i] = 'Online'; var C_Online=i; i++;
  A_Language[i] = 'Ordenar lista de membros'; var C_SortMember=i; i++;
  A_Language[i] = 'Ascendente'; var C_Increasing=i; i++;
  A_Language[i] = 'Descendente'; var C_Lessening=i; i++;
  A_Language[i] = 'Ordem da lista de membros'; var C_SortOrder=i;i++;
  A_Language[i] = 'Adicionar dica a todos os links'; var C_AddToolTip=i; i++;
  A_Language[i] = 'Mostrar uma mensagem a perguntar para actualizar a pagina de recursos caso um novo edificio que a modifique tenha sido criado'; var C_ShowRequestToUpdateResourcesPage=i; i++;
  A_Language[i] = 'Mostrar Link para actualizar todas as paginas automaticamente.'; var C_ShowAutoUpdate=i; i++;
  A_Language[i] = 'Usar intervalo aliatorio para actualizar paginas automaticamente (entre 2 e 10s)'; var C_UseRandomUpdateTime=i; i++;
  A_Language[i] = 'Adicionar imagem de verificacao de versao no fundo da pagina'; var C_AddImageVersion=i; i++;
  A_Language[i] = 'Mostrar mensagens de erro (Debugging)'; var C_Debug=i; i++;
  // Options : Display options
  A_Language[i] = 'Mostrar opcoes'; var C_ScreenOption=i; i++;
  A_Language[i] = 'Mostrar lista drop-down dos planetas'; var C_ShowHeaderPlanetList=i; i++;
  A_Language[i] = 'Mostrar a tabela de recursos predefinida'; var C_ShowHeaderResourcesList=i; i++;
  A_Language[i] = 'Adicionar o total de recursos a tabela predefinida'; var C_AddResourcesTotal=i; i++;
  A_Language[i] = 'Activar a possibilidade de alterar a posicao do topo (Lista Drop-down de planetas)'; var C_ChangeHeaderPosition=i; i++;
  A_Language[i] = 'Posicao da frame de top (em css)'; var C_HeaderPosition=i; i++;
  A_Language[i] = 'Para assegurar que a posicao e tomada em consideracao, poderas adicionar \253!importante\273 depois da posicaoa.'; var C_PositionInformations=i; i++;
  A_Language[i] = 'Activar a possibilidade de alterar a posicao da main frame.'; var C_ChangeContentPosition=i; i++;
  A_Language[i] = 'Posicao da main frame (em css)'; var C_ContentPosition=i; i++;
  A_Language[i] = 'Adicionar codigo CSS em todas as paginas'; var C_AddCssCode=i; i++;
  A_Language[i] = 'Remover CSS code'; var C_RemoveCssCode=i; i++;
  A_Language[i] = 'Adicionar JavaScript code em todas as paginas'; var C_AddJSCode=i; i++;
  A_Language[i] = 'Remover JavaScript code'; var C_RemoveJSCode=i; i++;
  A_Language[i] = 'Escreve aqui o teu codigo'; var C_WriteCode=i; i++;
  // Options : Resources table
  A_Language[i] = 'Tabela de Recursos'; var C_ResourcesTableOption=i; i++;
  A_Language[i] = 'Mostrar a tabela de recursos'; var C_ShowHeaderResourcesTable=i; i++;
  A_Language[i] = 'Mostrar nome do planeta'; var C_ShowPlanetName=i; i++;
  A_Language[i] = 'Mostrar coordenadas dos planetas'; var C_ShowCoordinates=i; i++;
  A_Language[i] = 'Adicionar coluna de total de recursos'; var C_ShowTotal=i; i++;
  A_Language[i] = 'Mostar coluna de materia negra'; var C_ShowDarkMatter=i; i++;
  A_Language[i] = 'Mostrar tempo desde o ultimo update'; var C_ShowTimeUpdate=i; i++;
  A_Language[i] = 'Mostrar apenas recursos da secao activa'; var C_ShowResourcesOnlyActiveSession=i; i++
  A_Language[i] = 'Calcular recursos em tempo real'; var C_RealTimeResources=i; i++;
  A_Language[i] = 'Intervalo de tempo entre calculos'; var C_RealTimeResourcesDelay=i; i++;
  A_Language[i] = 'Estilo do header deste planeta (em css)'; var C_HeaderSelectedPlanetStyle=i; i++;
  A_Language[i] = 'Transparencia das celulas de recursos (1 a 100)'; var C_Transparency=i; i++;
  A_Language[i] = 'Tempo com correspondencia de cores'; var C_UpdateTimeColor=i; i++;
  A_Language[i] = 'E vermelho se o tempo de update for superio.'; var C_UpdateTimeRed=i; i++;
  A_Language[i] = 'Activar ordenacao de planetas'; var C_PlanetOrder=i; i++;
  A_Language[i] = 'Escolhe um planeta e usa as setas para alterar a posicao'; var C_PlanetOrderDescription=i; i++;
  // Options : Empire
  A_Language[i] = 'Mostrar link imperio'; var C_ShowEmpire=i; i++;
  A_Language[i] = 'Nome do link imperio'; var C_EmpireLinkName=i; i++;
  A_Language[i] = 'Numero de linha no menu ogame'; var C_EmpireMenuRow=i; i++;
  A_Language[i] = 'Tamanho em pixeis das thumbnails de planetas'; var C_EmpireIconSize=i; i++;
  A_Language[i] = 'Esconder a tabela de recursos predefinida'; var C_HideDefaultResourcesTable=i; i++;
  A_Language[i] = 'Forcar a apresentacao da tabela dos recursos gerados'; var C_ForceDisplayHeaderResourcesTableWithEmpire=i; i++;
  A_Language[i] = 'Escolhe um bloco e usa as setas para alterar a posicao'; var C_BlockOrderDescription=i; i++;
  // Options : Transfer
  A_Language[i] = 'Transferencia'; var C_Transfer=i; i++;
  A_Language[i] = 'Usar o resultado dos calculos em tempo real'; var C_UseRealTimeResources=i; i++;
  A_Language[i] = 'Forcar a apresentacao dos recursos calculados em tempo real (Importante CPU usage)'; var C_ForceResourcesTransferTableUpdate=i; i++;
  A_Language[i] = 'Mostrar form de transferencia se existir uma em curso'; var C_ShowTransferTableIfActiveTransfer=i; i++;
  A_Language[i] = 'Speed ship ratio multiplier'; var C_TransferRatioSpeed=i; i++;
  // Options : Additional links
  A_Language[i] = 'Links adicionais'; var C_LinkOption=i; i++;
  A_Language[i] = 'Nome do link'; var C_LinkName=i; i++;
  A_Language[i] = 'Url do link'; var C_LinkUrl=i; i++;
  A_Language[i] = 'Numero de linha no menu'; var C_LinkPosition=i; i++;
  A_Language[i] = 'Abrir link em nova janela'; var C_LinkNewWindow=i; i++;
  A_Language[i] = 'Texto a apresentar se mouse over no link acima'; var C_LinkTitle=i; i++;
  A_Language[i] = 'Adicionar link'; var C_AddLink=i; i++;
  A_Language[i] = 'Link n\260'; var C_LinkNumber=i; i++;
  A_Language[i] = 'Apagar'; var C_Delete=i; i++;
  // Options
  A_Language[i] = 'Guardar'; var C_Save=i; i++;
  A_Language[i] = 'Painel de Controlo'; var C_ControlPanel=i; i++;
  // Automatic update
  A_Language[i] = 'Iniciar Update'; var C_StartUpdate=i; i++;
  A_Language[i] = 'Parar Update'; var C_StopUpdate=i; i++;
  A_Language[i] = 'Parar update automatico'; var C_UpdateStopInformations=i; i++;
  A_Language[i] = 'Actualizar todas as paginas automaticamente'; var C_UpdateInformations=i; i++;
  // Resources table
  A_Language[i] = 'Proximo planeta'; var C_NextPlanet=i; i++;
  A_Language[i] = 'Planeta anterior'; var C_PreviousPlanet=i; i++;
  A_Language[i] = 'Actualizar esta pagina para todos os planetas'; var C_UpdatePages=i; i++;
  // Empire
  A_Language[i] = 'Tipo'; var C_Type=i; i++;
  A_Language[i] = 'Campos'; var C_FieldNumber=i; i++;
  A_Language[i] = 'ate'; var C_To=i; i++;
  A_Language[i] = 'Aplicar'; var C_Apply=i; i++;
  A_Language[i] = 'Imagem nao guardada'; var C_ImageNotSaved=i; i++;
  A_Language[i] = 'Informacoes principais'; var C_MainInformations=i; i++;
  A_Language[i] = 'Producao por hora'; var C_HourProduction=i; i++;
  A_Language[i] = 'Producao por dia'; var C_DayProduction=i; i++;
  A_Language[i] = 'Edificios'; var C_BuildingsTxt=i; i++;
  A_Language[i] = 'Defesa'; var C_DefensesTxt=i; i++;
  A_Language[i] = 'Pesquisas'; var C_ResearchTxt=i; i++;
  A_Language[i] = 'Frota'; var C_FleetsTxt=i; i++;
  A_Language[i] = 'Lista'; var C_List=i; i++;
  A_Language[i] = 'Naves de defesas em construcao'; var C_FleetsDefensesUC=i; i++;
  A_Language[i] = 'Ir para edificios'; var C_ToBuildings=i; i++;
  A_Language[i] = 'Ir para pesquisas'; var C_ToResearch=i; i++;
  A_Language[i] = 'Ir para defesa'; var C_ToDefenses=i; i++;
  A_Language[i] = 'Ir para hangar'; var C_ToFleets=i; i++;
  A_Language[i] = 'Energia fornecida por satelites solares.'; var C_Ship212Production=i; i++;
  A_Language[i] = 'Num. de satelites solares necessarios'; var C_Ship212NecessaryNumber=i; i++;
  A_Language[i] = 'Construcao disponivel'; var C_ConstructionAvailable=i; i++;
  A_Language[i] = 'Com recursos de planeta'; var C_WithPlanetResources=i; i++;
  A_Language[i] = 'Com recursos de todos os planetas'; var C_WithAllPlanetsResources=i; i++;
  A_Language[i] = 'Existe outra construcao em curso neste planeta'; var C_OtherBuildingsInConstruction=i; i++;
  A_Language[i] = 'Outra pesquisa esta em curso neste planeta'; var C_OtherResearchInDevelopment=i; i++;
  A_Language[i] = 'Custo total do edificios'; var C_TotalBuildingsCost=i; i++;
  A_Language[i] = 'Nivel de custo'; var C_LevelCost1=i; i++;
  A_Language[i] = ' necessario'; var C_LevelCost2=i; i++;
  A_Language[i] = 'Cancelar construcao'; var C_StopBuildings=i; i++;
  A_Language[i] = 'Cancelar pesquisa'; var C_StopResearch=i; i++;
  A_Language[i] = 'Iniciar construcao'; var C_LaunchBuildings=i; i++;
  A_Language[i] = 'Iniciar pesquisa'; var C_LaunchResearch=i; i++;
  A_Language[i] = 'Construir Defesa'; var C_BuildDefenses=i; i++;
  A_Language[i] = 'Construir nave'; var C_BuildFleets=i; i++;
  A_Language[i] = 'Tempo de construcao'; var C_BuildingTime=i; i++;
  // Empire : Export
  A_Language[i] = 'Exportar'; var C_Export=i; i++;
  A_Language[i] = 'Opcoes do Gerador'; var C_GeneratorOptions=i; i++;
  A_Language[i] = 'Centrado'; var C_Center=i; i++;
  A_Language[i] = 'Cor no texto'; var C_TextColored=i; i++;
  A_Language[i] = 'Sem caracteres especiais'; var C_NoSpecialCharacter=i; i++;
  A_Language[i] = 'Tabela'; var C_LayoutInTable=i; i++;
  A_Language[i] = 'Centrar texto da tabela'; var C_CenteredTextInTable=i; i++;
  A_Language[i] = 'Redimensionar texto da tabela'; var C_ResizeTextInTable=i; i++;
  A_Language[i] = 'Gerar'; var C_Generate=i; i++;
  A_Language[i] = 'caracteres'; var C_Characters=i; i++;
  // Transfer
  A_Language[i] = 'Transferir recursos'; var C_TransferResources=i; i++;
  A_Language[i] = 'Nao existem recursos para serem transferidos.'; var C_NoResources=i; i++;
  A_Language[i] = 'Impossivel transferir. Nao existem naves suficientes em certos planetas.'; var C_NotEnoughShip1=i; i++;
  A_Language[i] = 'Devera revisitar todas as paginas de frota para actualizar o numero de naves.'; var C_NotEnoughShip2=i; i++;
  A_Language[i] = 'Destino'; var C_Destination=i; i++;
  A_Language[i] = 'Para enviar'; var C_ToTransfer=i; i++;
  A_Language[i] = 'Inverter seleccao'; var C_InvertSelection=i; i++;
  A_Language[i] = 'Enviado'; var C_Transfered=i; i++;
  A_Language[i] = 'Velocidade'; var C_Speed=i; i++;
  A_Language[i] = 'Reciclador ?'; var C_NeededRecycler=i; i++;
  A_Language[i] = 'Estado da transferencia'; var C_TransferState=i; i++;
  A_Language[i] = 'CP'; var C_LargeCargoShip=i; i++; // Abbreviation of Large Cargo Ship
  A_Language[i] = 'CG'; var C_SmallCargoShip=i; i++; // Abbreviation of Small Cargo Ship
  A_Language[i] = 'Transferencia nao sao possiveis desde planetas de destino.'; var C_NoTransferFromDestinationPlanet=i; i++;
  A_Language[i] = 'Nao ha recicladores disponiveis.'; var C_NoRecycler=i; i++;
  A_Language[i] = 'Nao ha cargueiros grandes suficientes.'; var C_NotEnoughLargeCargoShip=i; i++;
  A_Language[i] = 'Nao ha cargueiros pequenos suficientes.'; var C_NotEnoughSmallCargoShip=i; i++;
  A_Language[i] = 'Ja foram enviados os recursos deste planeta.'; var C_AlreadyTransfered=i; i++;
  A_Language[i] = 'Este planeta nao foi selecionado para transferencia.'; var C_PlanetNotSelected=i; i++;
  A_Language[i] = 'Nao ha transferencias em progresso.'; var C_NoTransfer=i; i++;
  A_Language[i] = 'Selecionar colonia'; var C_ColonyToBeUsed=i; i++;
  A_Language[i] = 'Outro destino'; var C_OtherDestination=i; i++;
  A_Language[i] = 'Preencher recursos a serem transferidos'; var C_NeededResources=i; i++;
  A_Language[i] = 'Resto'; var C_Rest=i; i++;
  A_Language[i] = 'Metal a ser enviado'; var C_MetalToBeSent=i; i++;
  A_Language[i] = 'Cristal a ser enviado'; var C_CrystalToBeSent=i; i++;
  A_Language[i] = 'Deuterio a ser enviado'; var C_DeuteriumToBeSent=i; i++;
  A_Language[i] = 'Tempo de voo'; var C_FlightTime=i; i++;
  A_Language[i] = 'Velocidade'; var C_SendingSpeed=i; i++;
  A_Language[i] = 'Consumode combustivel'; var C_DeuteriumConsumption=i; i++;
  A_Language[i] = 'CP ou CG a ser enviado'; var C_TransportShipNumber=i; i++;
  A_Language[i] = 'Opcoes de calculo'; var C_TransferCalcOption=i; i++;
  A_Language[i] = 'Calculation mode'; var C_CalcMode=i; i++;
  A_Language[i] = 'Transferir recursos de planetas com maximo de recursos (O mesmo resto depois da transferencia)'; var C_SameRest=i; i++;
  A_Language[i] = 'Transferir a mesma quantidade de cada planeta'; var C_SameQuantity=i; i++;
  A_Language[i] = 'Usar todos os recursos do planeta de destino primeiro'; var C_UseTotalResourcesDestinationPlanet=i; i++;
  A_Language[i] = 'O percurso mais curto'; var C_SameTime=i; i++;
  A_Language[i] = 'O mais rapido possivel'; var C_Fastest=i; i++;
  A_Language[i] = 'Data de chegada'; var C_ArrivalDate=i; i++;
  A_Language[i] = 'Ano'; var C_Year=i; i++;
  A_Language[i] = 'Mes'; var C_Month=i; i++;
  A_Language[i] = 'Dia'; var C_Day=i; i++;
  A_Language[i] = 'Hora'; var C_Hour=i; i++;
  A_Language[i] = 'Minuto'; var C_Minute=i; i++;
  A_Language[i] = 'Dia(s)'; var C_Days=i; i++;
  A_Language[i] = 'Hora(s)'; var C_Hours=i; i++;
  A_Language[i] = 'Minuto(s)'; var C_Minutes=i; i++;
  A_Language[i] = 'd'; var C_DayAbbreviation=i; i++;
  A_Language[i] = 'h'; var C_HourAbbreviation=i; i++;
  A_Language[i] = 'm'; var C_MinuteAbbreviation=i; i++;
  A_Language[i] = 's'; var C_SecondAbbreviation=i; i++;
  A_Language[i] = 'se necessario adicionar reciclador para ajustar tempo de voo'; var C_AddRecycler=i; i++;
  A_Language[i] = 'Nave de Transporte'; var C_TransportShip=i; i++;
  A_Language[i] = 'Guardar transferencia'; var C_SaveTransfer=i; i++;
  A_Language[i] = 'Cancelar transferencia'; var C_CancelTransfer=i; i++;
  A_Language[i] = 'Encher Naves'; var C_FillShip=i; i++;
  A_Language[i] = 'foram encontrados planetas nao guardados. Deves revisitalos.'; var C_UnsavedPlanets=i; i++;
  A_Language[i] = 'Preenche posicao e velocidade'; var C_FillCoordinatesAndSpeed=i; i++;
  A_Language[i] = 'Preenche recursos'; var C_FillResources=i; i++;
  A_Language[i] = 'Continuar'; var C_Continue=i; i++;
  // Other
  A_Language[i] = 'Tempo de Execucao'; var C_RunTime=i; i++;
  A_Language[i] = 'Um edificio que altera o factor de producao foi encontrado.\n\nQueres actualizar a pagina de recursos agora?'; var C_ResourcesBuildingsUC=i; i++;
  // Welcome message
  A_Language[i] = 'Welcome to the new version of \253'+C_ScriptName+'\273 (version: '+C_ScriptVersion+', build: '+C_ScriptBuild+')\n\nGerman translation : by Dhu\nItalian traducion : by Fiox\nPortuguese translation : by Spac3h\nSpanish translation : by ETintos\nThanks to all beta tester.\n\n'+
  'For this version, most of the code was rewritten. It is thus recommended to launch an automatic update of pages for your account, following this message.\n\n'+
  'Just after your click on OK, the script will load the technology tree page to get the names of each construction.\n\n'+
  'To see the changes about this version, go to the section named \253DESCRIPTION DES MISES A JOUR\273 in the script (Only in french).'; var C_NewVersion=i; i++;
  A_Language[i] = 'Welcome to the new version of \253'+C_ScriptName+'\273 (version: '+C_ScriptVersion+', build: '+C_ScriptBuild+')\n\nGerman translation : by Dhu\nItalian traducion : by Fiox\nPortuguese translation : by Spac3h\nSpanish translation : by ETintos\nThanks to all beta tester.\n\n'+
  'To see the changes about this version, go to the section named \253DESCRIPTION DES MISES A JOUR\273 in the script (Only in french).'; var C_NewBuild=i; i++;
}
else if (Language == 8) { // DK
  // For accented character, use unicode or octal code to replace it, use this link (http://www.vbc3.com/script/unicode_octal_html_code.php)
  i = 0;
  A_Language[i] = 'Planet'; i++;
  A_Language[i] = 'M\345ne'; i++;
  A_Language[i] = 'Metal'; var C_Metal=i; i++;
  A_Language[i] = 'Krystal'; var C_Crystal=i; i++;
  A_Language[i] = 'Deuterium'; var C_Deuterium=i; i++;
  A_Language[i] = 'Energi'; var C_Energy=i; i++;
  A_Language[i] = 'M\370rk Meterie'; var C_DarkMatter=i; i++;
  A_Language[i] = 'Imperium'; var C_Empire=i; i++;
  A_Language[i] = 'Diameter'; var C_Diameter=i; i++;
  A_Language[i] = 'Temperatur'; var C_Temperature=i; i++;
  A_Language[i] = 'Total'; var C_Total=i; i++;
  A_Language[i] = 'R\345stoffer'; var C_Resources=i; i++;
  A_Language[i] = 'Opdater'; var C_Update=i; i++;
  A_Language[i] = 'Ja'; var C_Yes=i; i++;
  A_Language[i] = 'Nej'; var C_No=i; i++;
  A_Language[i] = 'Vis'; var C_Show=i; i++;
  A_Language[i] = 'Vis Ikke'; var C_Hide=i; i++;
  // Required text for analysis, include spaces, must be exact
  A_Language[i] = 'R\345stofproduktion p\345 planeten'; var C_ResourcesTableHeader=i; i++; // Beginning of the first row from the resources table (resources page)
  A_Language[i] = 'Har brug for'; var C_Require=i; i++; // First word of the right cell in tree technology table
  A_Language[i] = 'Produktionsfaktor: '; var C_ProductionRate=i; i++; // Text before production rate number in resources page
  // ValidateBuilding
  A_Language[i] = 'Ikke nok frie felder'; var C_NotEnoughFreeField=i; i++;
  A_Language[i] = 'm\345ne basen er ikke bygget'; var C_LunarBaseNotBuilt=i; i++;
  A_Language[i] = 'Planeten er fuldt udbygget'; var C_NotOnPlanet=i; i++;
  A_Language[i] = 'M\345nen er fuldt udbygget'; var C_NotOnMoon=i; i++;
  // AddLink
  A_Language[i] = 'Key words :\n\nSome part can be replaced keywords.\n\n'+
  '[session] To get the id of the current session\n'+
  '[host] To get the domain of the ogame universe\n'+
  '[Planet navn] To get the id of one of your planets\n\n'+
  'Ex: Creation of a link to the \'overview\' page of the planet named \253Homeworld\273 :\n'+
  'http://[host]/game/index.php?page=overview&session=[session]&cp=[Homeworld]\n\n'+
  'Become (for universe 10) :\n'+
  'http://uni10.ogame.org/game/index.php?page=overview&session=2943046dc47f&cp=34317957'; var C_KeyWordsInformations=i; i++;
  // SaveParameter
  A_Language[i] = 'There is an error in the value of transparency.\nThe value must be included between 1 and 100'; var C_TransparencyError=i; i++;
  A_Language[i] = 'The value of the empire row is not correct.\nThe value must be included between 1 and '; var C_EmpireRowError=i; i++;
  A_Language[i] = 'The name of the link towards the empire menu must contain at least one character'; var C_EmpireTxtError=i; i++;
  A_Language[i] = 'The icons size of planets in empire view must be upper to 1 pixel.'; var C_EmpireSizeIconError=i; i++;
  A_Language[i] = 'The link'; var C_LinkPositionError1=i; i++;
  A_Language[i] = ' can\'t be saved.\nVerify the name, link and row number.\nThe link row must be included between 1 and '; var C_LinkPositionError2=i; i++;
  A_Language[i] = 'Correct datas were been saved\nSo that you can correct, the page will not be refreshed.'; var C_SaveParameterError=i; i++;
  // ShowHideTable
  A_Language[i] = 'Rul Up'; var C_RollUp=i; i++;
  A_Language[i] = 'Rul Op'; var C_Unfold=i; i++;
  // Options : Hoved Indstillinger
  A_Language[i] = 'Hoved Indstillinger'; var C_MainOption=i; i++;
  A_Language[i] = 'Vis tal i tusinder'; var C_ShowInKilo=i; i++;
  A_Language[i] = ' Vis sekunder for den \370vre opdatering p\345 24t '; var C_ShowSecondForUpperUpdateTimeInDay=i; i++;
  A_Language[i] = 'Slet Link \'officere\''; var C_DeleteOfficerLink=i; i++;
  A_Language[i] = 'Slet Link \'Grossisten\''; var C_DeleteTraderLink=i; i++;
  A_Language[i] = 'Position'; var C_Coordinates=i; i++;
  A_Language[i] = 'Navn'; var C_Name=i; i++;
  A_Language[i] = 'Status'; var C_Status=i; i++;
  A_Language[i] = 'Point'; var C_Points=i; i++;
  A_Language[i] = 'Medlemskab'; var C_MemberShip=i; i++;
  A_Language[i] = 'Online'; var C_Online=i; i++;
  A_Language[i] = 'Sorter medlemsliste'; var C_SortMember=i; i++;
  A_Language[i] = 'Stigende'; var C_Increasing=i; i++;
  A_Language[i] = 'Fallende'; var C_Lessening=i; i++;
  A_Language[i] = 'Sorter medlemsliste'; var C_SortOrder=i;i++;
  A_Language[i] = 'Tilf\370j tooltip til alle links'; var C_AddToolTip=i; i++;
  A_Language[i] = 'Vis en besked der sp\370rger om at opdatere r\345stof siden hvis en ny bygning bliver bygget'; var C_ShowRequestToUpdateResourcesPage=i; i++;
  A_Language[i] = 'Vis et link til at opdatere alle sider automatisk.'; var C_ShowAutoUpdate=i; i++;
  A_Language[i] = ' Brug en tilf\346ldig tid til at opdatere alle sider automatisk (mellem 2 og 10s)'; var C_UseRandomUpdateTime=i; i++;
  A_Language[i] = 'Tilf\370j en version til at checke "php image" i bunden af siden'; var C_AddImageVersion=i; i++;
  A_Language[i] = 'vis en besked hvis der kommer en  fejlmelding '; var C_Debug=i; i++;
  // Options : Display indstillinger
  A_Language[i] = 'Display indstillinger'; var C_ScreenOption=i; i++;
  A_Language[i] = 'Vis "drop-down" liste af planeter'; var C_ShowHeaderPlanetList=i; i++;
  A_Language[i] = 'Vis den anden r\345stof tabel'; var C_ShowHeaderResourcesList=i; i++;
  A_Language[i] = 'Tilf\370j r\345stofferne til den anden r\345stof tabel'; var C_AddResourcesTotal=i; i++
  A_Language[i] = 'Aktivere muligheden for at \346ndre billedet i toppen position (Liste af planeter)'; var C_ChangeHeaderPosition=i; i++;
  A_Language[i] = 'Position af billedet i toppen (i CSS)'; var C_HeaderPosition=i; i++;
  A_Language[i] = 'For at v\346re sikker p\345 for at v\346re sikker p\345 at din position er taget i overvejelse, kan du tilf\370je \253!important\273 after the position.'; var C_PositionInformations=i; i++;
  A_Language[i] = 'Aktivér mulighed for at \346ndre placeringen af den vigtigste ramme.'; var C_ChangeContentPosition=i; i++;
  A_Language[i] = 'Position af den vigtigeste ramme (i CSS)'; var C_ContentPosition=i; i++;
  A_Language[i] = 'Tilf\370j CSS code til alle sider'; var C_AddCssCode=i; i++;
  A_Language[i] = 'Fjern CSS code'; var C_RemoveCssCode=i; i++;
  A_Language[i] = 'Tilf\370j JavaScript code til alle sider'; var C_AddJSCode=i; i++;
  A_Language[i] = 'Fjern JavaScript code'; var C_RemoveJSCode=i; i++;
  A_Language[i] = 'Skriv din code her'; var C_WriteCode=i; i++;
  // Options : R\345stof Tabel
  A_Language[i] = 'R\345stof Tabel'; var C_ResourcesTableOption=i; i++;
  A_Language[i] = 'Vis r\345stof tablen'; var C_ShowHeaderResourcesTable=i; i++;
  A_Language[i] = 'Vis planet navn'; var C_ShowPlanetName=i; i++;
  A_Language[i] = 'Vis planetens koordinater'; var C_ShowCoordinates=i; i++;
  A_Language[i] = 'Tilf\370j en samlet r\345stof kolonne'; var C_ShowTotal=i; i++;
  A_Language[i] = 'Vis m\370rk meterie kolonne'; var C_ShowDarkMatter=i; i++;
  A_Language[i] = 'Vis tiden siden sidste opdatering'; var C_ShowTimeUpdate=i; i++;
  A_Language[i] = 'Vis kun r\345stoffer af aktive session'; var C_ShowResourcesOnlyActiveSession=i; i++
  A_Language[i] = 'Udregn r\345stofferne i realtid'; var C_RealTimeResources=i; i++;
  A_Language[i] = 'Tid mellem v\346r udregning'; var C_RealTimeResourcesDelay=i; i++;
  A_Language[i] = 'Stil af overskriften p\345 nuv\346rende planet (i CSS)'; var C_HeaderSelectedPlanetStyle=i; i++;
  A_Language[i] = 'Gennemsigtighed af r\345stoffernes celler (1 til 100)'; var C_Transparency=i; i++;
  A_Language[i] = 'Tid der svarer til farverne p\345 dimissioner (i sekunder)'; var C_UpdateTimeColor=i; i++;
  A_Language[i] = 'Og r\370d, hvis opdaterings tiden er overlegen.'; var C_UpdateTimeRed=i; i++;
  A_Language[i] = 'Aktiver planet sortering'; var C_PlanetOrder=i; i++;
  A_Language[i] = 'V\346lg en planet og brug pilene til at \346ndre dens position'; var C_PlanetOrderDescription=i; i++;
  // Options : Imperium
  A_Language[i] = 'Vis imperiums link'; var C_ShowEmpire=i; i++;
  A_Language[i] = 'Navn p\345 imperiums linket'; var C_EmpireLinkName=i; i++;
  A_Language[i] = 'Nummer i tr\346k p\345 den venstre menu'; var C_EmpireMenuRow=i; i++;
  A_Language[i] = 'St\370rrelse i pixel af planeterne'; var C_EmpireIconSize=i; i++;
  A_Language[i] = 'Skjul den anden r\345stof tabel'; var C_HideDefaultResourcesTable=i; i++;
  A_Language[i] = 'Tving visningen af den genererede r\345stof tabel'; var C_ForceDisplayHeaderResourcesTableWithEmpire=i; i++;
  // Options : Transfer
  A_Language[i] = 'Transfer'; var C_Transfer=i; i++;
  A_Language[i] = 'Brug resultatet af r\345stof beregningen'; var C_UseRealTimeResources=i; i++;
  A_Language[i] = 'Tving displayet af r\345stofs udregnede realtid (Vigtig CPU brug)'; var C_ForceResourcesTransferTableUpdate=i; i++;
  A_Language[i] = ' Vis overdragelsesblanketten hvis en overf\370rsel er i gang '; var C_ShowTransferTableIfActiveTransfer=i; i++;
  A_Language[i] = 'Skibs fart'; var C_TransferRatioSpeed=i; i++;
  // Options : Tilf\370j links
  A_Language[i] = 'Tilf\370j links'; var C_LinkOption=i; i++;
  A_Language[i] = 'Nave p\345 link'; var C_LinkName=i; i++;
  A_Language[i] = 'Url af link'; var C_LinkUrl=i; i++;
  A_Language[i] = 'Nummer i menuen'; var C_LinkPosition=i; i++;
  A_Language[i] = '\345ben linket i et nyt vindue'; var C_LinkNewWindow=i; i++;
  A_Language[i] = 'Tekst der vises n\345r musen holdes over linket'; var C_LinkTitle=i; i++;
  A_Language[i] = 'Tilf\370j link'; var C_AddLink=i; i++;
  A_Language[i] = 'Link n\260'; var C_LinkNumber=i; i++;
  A_Language[i] = 'Slet'; var C_Delete=i; i++;
  // Options
  A_Language[i] = 'Gem'; var C_Save=i; i++;
  A_Language[i] = 'Kontrol panel'; var C_ControlPanel=i; i++;
  // Automatisk opdater
  A_Language[i] = 'Start opdatering'; var C_StartUpdate=i; i++;
  A_Language[i] = 'Stop opdatering'; var C_StopUpdate=i; i++;
  A_Language[i] = 'Stop automatisk opdatering'; var C_UpdateStopInformations=i; i++;
  A_Language[i] = 'Opdater automatisk  alle sider'; var C_UpdateInformations=i; i++;
  // Resources table
  A_Language[i] = 'N\346ste planet'; var C_NextPlanet=i; i++;
  A_Language[i] = 'Forrige planet'; var C_PreviousPlanet=i; i++;
  A_Language[i] = ' Opdater denne side p\345 alle planeter'; var C_UpdatePages=i; i++;
  // Empire
  A_Language[i] = 'Type'; var C_Type=i; i++;
  A_Language[i] = 'Felt numre'; var C_FieldNumber=i; i++;
  A_Language[i] = 'Til'; var C_To=i; i++;
  A_Language[i] = 'Overf\370r'; var C_Apply=i; i++;
  A_Language[i] = 'Billed ikke gemt'; var C_ImageNotSaved=i; i++;
  A_Language[i] = 'Hoved Information'; var C_MainInformations=i; i++;
  A_Language[i] = 'Time Produktion'; var C_HourProduction=i; i++;
  A_Language[i] = 'Dagilg Produktion'; var C_DayProduction=i; i++;
  A_Language[i] = 'Bygninger'; var C_BuildingsTxt=i; i++;
  A_Language[i] = 'Forsvar'; var C_DefensesTxt=i; i++;
  A_Language[i] = 'Forskning'; var C_ResearchTxt=i; i++;
  A_Language[i] = 'Fl\345de'; var C_FleetsTxt=i; i++;
  A_Language[i] = 'Liste'; var C_List=i; i++;
  A_Language[i] = ' Skibe og forsvar under konstruktion'; var C_FleetsDefensesUC=i; i++;
  A_Language[i] = 'G\345 til bygninger'; var C_ToBuildings=i; i++;
  A_Language[i] = 'G\345 til forskninger'; var C_ToResearch=i; i++;
  A_Language[i] = 'G\345 til forsvar'; var C_ToDefenses=i; i++;
  A_Language[i] = 'G\345 til skibsv\346rft'; var C_ToFleets=i; i++;
  A_Language[i] = ' Energi fra solar sattelitter.'; var C_Ship212Production=i; i++;
  A_Language[i] = 'Hvor mange solar sattelitter der skal bruges'; var C_Ship212NecessaryNumber=i; i++;
  A_Language[i] = 'Mulige konstruktioner'; var C_ConstructionAvailable=i; i++;
  A_Language[i] = 'Med r\345stoffer fra planeten'; var C_WithPlanetResources=i; i++;
  A_Language[i] = 'Med r\345stoffer fra alle planeter'; var C_WithAllPlanetsResources=i; i++;
  A_Language[i] = ' En anden konstruktion er i gang med at blive bygget p\345 denne planet'; var C_OtherBuildingsInConstruction=i; i++;
  A_Language[i] = 'En anden forskning er ved at blive forsket p\345 denne planet'; var C_OtherResearchInDevelopment=i; i++;
  A_Language[i] = ' Total pris af bygninger'; var C_TotalBuildingsCost=i; i++;
  A_Language[i] = 'Levels pris'; var C_LevelCost1=i; i++;
  A_Language[i] = ' P\345kr\346vet'; var C_LevelCost2=i; i++;
  A_Language[i] = 'Annuller bygning'; var C_StopBuildings=i; i++;
  A_Language[i] = 'Annuller forskning'; var C_StopResearch=i; i++;
  A_Language[i] = 'Start bygning'; var C_LaunchBuildings=i; i++;
  A_Language[i] = 'Start forskning'; var C_LaunchResearch=i; i++;
  A_Language[i] = 'Byg forsvar'; var C_BuildDefenses=i; i++;
  A_Language[i] = 'Byg skibe'; var C_BuildFleets=i; i++;
  A_Language[i] = 'Tid det tager at bygge denne bygning'; var C_BuildingTime=i; i++;
  // Empire : Exporter
  A_Language[i] = 'Exporter'; var C_Export=i; i++;
  A_Language[i] = 'Generator indstillinger'; var C_GeneratorOptions=i; i++;
  A_Language[i] = 'Center'; var C_Center=i; i++;
  A_Language[i] = 'Tekst i farver'; var C_TextColored=i; i++;
  A_Language[i] = 'Ingen s\346rlige tegn'; var C_NoSpecialCharacter=i; i++;
  A_Language[i] = 'Tabel'; var C_LayoutInTable=i; i++;
  A_Language[i] = 'Centre the text of table'; var C_CenteredTextInTable=i; i++;
  A_Language[i] = 'Resize the text of table'; var C_ResizeTextInTable=i; i++;
  A_Language[i] = 'Generate'; var C_Generate=i; i++;
  A_Language[i] = 'Tegn'; var C_Characters=i; i++;
  // Transfer
  A_Language[i] = 'Overf\370r r\345stoffer'; var C_TransferResources=i; i++;
  A_Language[i] = 'Der er ingen r\345stoffer at sende.'; var C_NoResources=i; i++;
  A_Language[i] = ' Overf\370rsel er umulig du har ikke nok skibe p\345 dine planeter.'; var C_NotEnoughShip1=i; i++;
  A_Language[i] = 'Du skal g\345 til alle fl\345de menuer for at opdater antalet af skibe skibe.'; var C_NotEnoughShip2=i; i++;
  A_Language[i] = 'Destination'; var C_Destination=i; i++;
  A_Language[i] = 'Send'; var C_ToTransfer=i; i++;
  A_Language[i] = 'Inverter valg'; var C_InvertSelection=i; i++;
  A_Language[i] = 'Sendt'; var C_Transfered=i; i++;
  A_Language[i] = 'Fart'; var C_Speed=i; i++;
  A_Language[i] = 'Recycler ?'; var C_NeededRecycler=i; i++;
  A_Language[i] = 'Overf\370rsels status'; var C_TransferState=i; i++;
  A_Language[i] = 'LT'; var C_LargeCargoShip=i; i++; // Abbreviation of Large Cargo Ship
  A_Language[i] = 'ST'; var C_SmallCargoShip=i; i++; // Abbreviation of Small Cargo Ship
  A_Language[i] = ' Overf\370selsen er ikke mulig fra planetens destination.'; var C_NoTransferFromDestinationPlanet=i; i++;
  A_Language[i] = 'Du mangler recyclere.'; var C_NoRecycler=i; i++;
  A_Language[i] = 'Der er ikke nok store transportere.'; var C_NotEnoughLargeCargoShip=i; i++;
  A_Language[i] = 'Der er ikke nok sm\345 transportere.'; var C_NotEnoughSmallCargoShip=i; i++;
  A_Language[i] = ' R\345stofferne er allerede sendt fra denne planet.'; var C_AlreadyTransfered=i; i++;
  A_Language[i] = ' Denne planet er ikke blevet valgt til overf\370rselsen.'; var C_PlanetNotSelected=i; i++;
  A_Language[i] = ' Der er ikke valgt nogen overf\370relser.'; var C_NoTransfer=i; i++;
  A_Language[i] = ' Valgt koloni'; var C_ColonyToBeUsed=i; i++;
  A_Language[i] = 'En anden destination'; var C_OtherDestination=i; i++;
  A_Language[i] = ' Fyld transporterne'; var C_NeededResources=i; i++;
  A_Language[i] = 'Rast'; var C_Rest=i; i++;
  A_Language[i] = 'Metal der skal sendes'; var C_MetalToBeSent=i; i++;
  A_Language[i] = 'Krystal der skal sendes'; var C_CrystalToBeSent=i; i++;
  A_Language[i] = 'Deuterium der skal sendes'; var C_DeuteriumToBeSent=i; i++;
  A_Language[i] = 'Flyve tid'; var C_FlightTime=i; i++;
  A_Language[i] = 'Fart'; var C_SendingSpeed=i; i++;
  A_Language[i] = 'Deuterium der skal bruges'; var C_DeuteriumConsumption=i; i++;
  A_Language[i] = 'ST eller LT der skal sendes'; var C_TransportShipNumber=i; i++;
  A_Language[i] = ' Udregnings indstillinger'; var C_TransferCalcOption=i; i++;
  A_Language[i] = 'Udregnings m\345de'; var C_CalcMode=i; i++;
  A_Language[i] = ' Overf\370r alle r\345stoffer fra planeterne'; var C_SameRest=i; i++;
  A_Language[i] = 'Overf\370r samme antal p\345 alle planeterne'; var C_SameQuantity=i; i++;
  A_Language[i] = ' Brug alle r\345stofferne fra planeten'; var C_UseTotalResourcesDestinationPlanet=i; i++;
  A_Language[i] = ' Flyve tid og det t\346tteste muligt'; var C_SameTime=i; i++;
  A_Language[i] = 'Hurtigs muligt'; var C_Fastest=i; i++;
  A_Language[i] = 'Ankomst'; var C_ArrivalDate=i; i++;
  A_Language[i] = '\345r'; var C_Year=i; i++;
  A_Language[i] = 'M\345ned'; var C_Month=i; i++;
  A_Language[i] = 'Dag'; var C_Day=i; i++;
  A_Language[i] = 'Time'; var C_Hour=i; i++;
  A_Language[i] = 'Minut'; var C_Minute=i; i++;
  A_Language[i] = 'Dag(e)'; var C_Days=i; i++;
  A_Language[i] = 'Time(r)'; var C_Hours=i; i++;
  A_Language[i] = 'Minut(ter)'; var C_Minutes=i; i++;
  A_Language[i] = 'd'; var C_DayAbbreviation=i; i++;
  A_Language[i] = 't'; var C_HourAbbreviation=i; i++;
  A_Language[i] = 'm'; var C_MinuteAbbreviation=i; i++;
  A_Language[i] = 's'; var C_SecondAbbreviation=i; i++;
  A_Language[i] = 'Tilf\370j en recycler hvis det er n\370dvendigt at justere flyve tiden'; var C_AddRecycler=i; i++;
  A_Language[i] = 'Transport'; var C_TransportShip=i; i++;
  A_Language[i] = 'Gem Overf\370rsel'; var C_SaveTransfer=i; i++;
  A_Language[i] = 'Cancel transfer'; var C_CancelTransfer=i; i++;
  A_Language[i] = 'Fyld Transportere'; var C_FillShip=i; i++;
  A_Language[i] = 'Planets unsaved had been found. You should revisit them.'; var C_UnsavedPlanets=i; i++;
  A_Language[i] = 'Fill position and speed'; var C_FillCoordinatesAndSpeed=i; i++;
  A_Language[i] = 'Fill resources'; var C_FillResources=i; i++;
  // Other
  A_Language[i] = 'Execution time'; var C_RunTime=i; i++;
  A_Language[i] = 'A buildings which modify production factor had been found.\n\nDo you want to update the resources page now?'; var C_ResourcesBuildingsUC=i; i++;
  // Welcome message
  A_Language[i] = 'Welcome to the new version of \253'+C_ScriptName+'\273 (version: '+C_ScriptVersion+', build: '+C_ScriptBuild+')\nItalian translation : by Fiox\nThanks to all beta tester.\n\n'+
  'For this version, most of the code were rewritten, it is thus advised to launch an automatic updating of pages from your account following this message.\n\n'+
  'Just after your click on OK, the script will load the tree technology page to get the name of each construction.\n\n'+
  'To see the changes about this version, go to the section named \253DESCRIPTION DES MISES A JOUR\273 in the script (Only in french).'; var C_NewVersion=i; i++;
  A_Language[i] = 'Welcome to the new version of \253'+C_ScriptName+'\273 (version: '+C_ScriptVersion+', build: '+C_ScriptBuild+')\nItalian translation : by Fiox\nThanks to all beta tester.\n\n'+
  'To see the changes about this version, go to the section named \253DESCRIPTION DES MISES A JOUR\273 in the script (Only in french).'; var C_NewBuild=i; i++;
}
else if (Language == 9) { // SK
  // For accented character, use octal or unicode code to replace it, use this link (http://www.vbc3.com/script/unicode_octal_html_code.php)
  i = 0;
  A_Language[i] = 'Plan\u00e9ta'; i++;
  A_Language[i] = 'Mesiac'; i++;
  A_Language[i] = 'Kovy'; var C_Metal=i; i++;
  A_Language[i] = 'Kry\u0161t\u00e1ly'; var C_Crystal=i; i++;
  A_Language[i] = 'Deut\u00e9rium'; var C_Deuterium=i; i++;
  A_Language[i] = 'Energia'; var C_Energy=i; i++;
  A_Language[i] = 'Temn\u00e1 hmota'; var C_DarkMatter=i; i++;
  A_Language[i] = 'Imp\u00e9rium'; var C_Empire=i; i++;
  A_Language[i] = 'Zdroje'; var C_Resources=i; i++;
  A_Language[i] = 'Aktualiz\u00e1cia'; var C_Update=i; i++;
  A_Language[i] = '\u00c1no'; var C_Yes=i; i++;
  A_Language[i] = 'Nie'; var C_No=i; i++;
  A_Language[i] = 'Zobrazi\u0165'; var C_Show=i; i++;
  A_Language[i] = 'Skry\u0165'; var C_Hide=i; i++;
  // Required text for analysis, include spaces, must be exact
  A_Language[i] = 'Priemer'; var C_Diameter=i; i++; // Overview page
  A_Language[i] = 'Teplota'; var C_Temperature=i; i++; // Overview page
  A_Language[i] = 'Hodinov\u00e1 produkcia'; var C_TotalHourlyProduction=i; i++; // Name of total in resources page
  A_Language[i] = 'Spolu'; var C_Total=i; i++; // Name of total resource column // viktorc090208
  A_Language[i] = 'Produkcia zdrojov na plan\u00e9te'; var C_ResourcesTableHeader=i; i++; // Beginning of the first row from the resources table (resources page) 
  A_Language[i] = 'Predpoklady'; var C_Require=i; i++; // First word of the right cell in tree technology table 
  A_Language[i] = 'Koeficient v\u00fdroby: '; var C_ProductionRate=i; i++; // Text before production rate number in resources page
  // ValidateBuilding
  A_Language[i] = 'Nie je dostatok vo\u013en\u00fdch pol\u00ed'; var C_NotEnoughFreeField=i; i++;
  A_Language[i] = 'Zatia\u013e nie je vybudovan\u00e1 mesa\u010dn\u00e1 z\u00e1klad\u0148a'; var C_LunarBaseNotBuilt=i; i++;
  A_Language[i] = 'Na plan\u00e9te nie je dostupn\u00e9'; var C_NotOnPlanet=i; i++;
  A_Language[i] = 'Na mesiaci nie je dostupn\u00e9'; var C_NotOnMoon=i; i++;
  // AddLink
  A_Language[i] = 'K\u013e\u00fa\u010dov\u00e9 slov\u00e1 :\n\nNiektor\u00e9 \u010dasti adresy m\u00f4\u017eu by\u0165 nahraden\u00e9 k\u013e\u00fa\u010dov\u00fdmi slovami.\n\n'+
  '[session] sa nahrad\u00ed identifik\u00e1torom aktu\u00e1lnej session\n'+
  '[host] sa nahrad\u00ed dom\u00e9nou vesm\u00edru ogame\n'+
  '[Planet name] sa nahrad\u00ed identifik\u00e1torom jednej z Va\u0161ich plan\u00e9t\n\n'+
  'Napr.: Vytvorenie odkazu na str\u00e1nku \'Preh\u013ead\' plan\u00e9ty \253Homeworld\273 :\n'+
  'http://[host]/game/index.php?page=overview&session=[session]&cp=[Homeworld]\n\n'+
  'Znamen\u00e1 (pre vesm\u00edr 10) :\n'+
  'http://uni10.ogame.org/game/index.php?page=overview&session=2943046dc47f&cp=34317957'; var C_KeyWordsInformations=i; i++;
  // SaveParameter
  A_Language[i] = 'Hodnota priesvitnosti je chybn\u00e1.\n\u00dadaj mus\u00ed by\u0165 medzi 1 a 100'; var C_TransparencyError=i; i++;
  A_Language[i] = 'Hodnota v riadku imp\u00e9rium je nespr\u00e1vna.\nHodnota mus\u00ed by\u0165 medzi 1 a '; var C_EmpireRowError=i; i++;
  A_Language[i] = 'N\u00e1zov odkazu imp\u00e9ria mus\u00ed obsahova\u0165 aspo\u0148 jeden znak'; var C_EmpireTxtError=i; i++;
  A_Language[i] = 'Ve\u013ekos\u0165 ikon plan\u00e9t v n\u00e1h\u013eade imp\u00e9ria mus\u00ed by\u0165 v\u00e4\u010d\u0161ia ako 1 pixel.'; var C_EmpireSizeIconError=i; i++;
  A_Language[i] = 'Odkaz'; var C_LinkPositionError1=i; i++;
  A_Language[i] = ' nem\u00f4\u017ee by\u0165 ulo\u017een\u00fd.\nSkontrolujte n\u00e1zov, odkaz a \u010d\u00edslo riadka.\nOdkaz riadka mus\u00ed by\u0165 medzi 1 a '; var C_LinkPositionError2=i; i++;
  A_Language[i] = '\u00dadaje boli ulo\u017een\u00e9\\nM\u00f4\u017eete ich upravova\u0165, str\u00e1nka nebude obnoven\u00e1.'; var C_SaveParameterError=i; i++;
  // ShowHideTable
  A_Language[i] = 'Zasun\u00fa\u0165'; var C_RollUp=i; i++;
  A_Language[i] = 'Vysun\u00fa\u0165'; var C_Unfold=i; i++;
  // Options : General parameters
  A_Language[i] = 'V\u0161eobecn\u00e9 nastavenia'; var C_MainOption=i; i++;
  A_Language[i] = 'Zobrazuj \u010d\u00edsla v kil\u00e1ch'; var C_ShowInKilo=i; i++;
  A_Language[i] = 'Zobrazova\u0165 sekundy pre aktualiz\u00e1cie nad 24h'; var C_ShowSecondForUpperUpdateTimeInDay=i; i++;
  A_Language[i] = 'Vymaza\u0165 odkaz \'\u0160pecialisti\''; var C_DeleteOfficerLink=i; i++;
  A_Language[i] = 'Delete Link \'Obchodník\''; var C_DeleteTraderLink=i; i++;
  A_Language[i] = 'Poz\u00edcia'; var C_Coordinates=i; i++;
  A_Language[i] = 'N\u00e1zov'; var C_Name=i; i++;
  A_Language[i] = 'Stav'; var C_Status=i; i++;
  A_Language[i] = 'Body'; var C_Points=i; i++;
  A_Language[i] = '\u010clenstvo'; var C_MemberShip=i; i++;
  A_Language[i] = 'Online'; var C_Online=i; i++;
  A_Language[i] = 'Triedi\u0165 zoznam \u010dlenov'; var C_SortMember=i; i++;
  A_Language[i] = 'Vzostupne'; var C_Increasing=i; i++;
  A_Language[i] = 'Zostupne'; var C_Lessening=i; i++;
  A_Language[i] = 'Poradie triedenia zoznamu \u010dlenov'; var C_SortOrder=i;i++;
  A_Language[i] = 'Doplni\u0165 tipy do v\u0161etk\u00fdch odkazov'; var C_AddToolTip=i; i++;
  A_Language[i] = 'Po\u017eiada\u0165 o na\u010d\u00edtanie str\u00e1nky zdrojov ak sa postav\u00ed nov\u00e1 produk\u010dn\u00e1 budova'; var C_ShowRequestToUpdateResourcesPage=i; i++;
  A_Language[i] = 'Zobrazi\u0165 odkaz na automatick\u00fa aktualiz\u00e1ciu v\u0161etk\u00fdch str\u00e1nok.'; var C_ShowAutoUpdate=i; i++;
  A_Language[i] = 'Pri automatickej aktualiz\u00e1cii pou\u017ei\u0165 n\u00e1hodn\u00fd interval medzi str\u00e1nkami (2 a\u017e 10s)'; var C_UseRandomUpdateTime=i; i++;
  A_Language[i] = 'Doplni\u0165 na koniec str\u00e1nok php obr\u00e1zok na kontrolu verzie.'; var C_AddImageVersion=i; i++;
  A_Language[i] = 'Zobrazova\u0165 chybov\u00e9 spr\u00e1vy (pre ladenie)'; var C_Debug=i; i++;
  // Options : Display options
  A_Language[i] = 'Nastavenie zobrazenia'; var C_ScreenOption=i; i++;
  A_Language[i] = 'Zobrazova\u0165 vyskakovac\u00ed zoznam plan\u00e9t'; var C_ShowHeaderPlanetList=i; i++;
  A_Language[i] = 'Zobrazova\u0165 \u0161tandardn\u00fa tabu\u013eku surov\u00edn'; var C_ShowHeaderResourcesList=i; i++;
  A_Language[i] = 'Doplni\u0165 do \u0161tandardnej tabu\u013eky zdrojov sum\u00e1r'; var C_AddResourcesTotal=i; i++;
  A_Language[i] = 'Aktivova\u0165 mo\u017enos\u0165 zmeny umiestnenia hlavi\u010dky (vyskakovac\u00ed zoznam plan\u00e9t)'; var C_ChangeHeaderPosition=i; i++;
  A_Language[i] = 'Umiestnenie hlavi\u010dky (v css)'; var C_HeaderPosition=i; i++;
  A_Language[i] = 'Aby bolo ist\u00e9, \u017ee sa Va\u0161e nastavenie umiestnenia hlavi\u010dky zoberie do \u00favahy, dopl\u0148te an koniec poz\u00edcie \253!important\273.'; var C_PositionInformations=i; i++;
  A_Language[i] = 'Aktivova\u0165 mo\u017enos\u0165 zmeny umiestnenia hlavn\u00e9ho r\u00e1mca.'; var C_ChangeContentPosition=i; i++;
  A_Language[i] = 'Umiestnenie hlavn\u00e9ho r\u00e1mca (v css)'; var C_ContentPosition=i; i++;
  A_Language[i] = 'Doplni\u0165 CSS k\u00f3d do v\u0161etk\u00fdch str\u00e1nok'; var C_AddCssCode=i; i++;
  A_Language[i] = 'Odstr\u00e1ni\u0165 CSS k\u00f3d'; var C_RemoveCssCode=i; i++;
  A_Language[i] = 'Doplni\u0165 JavaScript k\u00f3d do v\u0161etk\u00fdch str\u00e1nok'; var C_AddJSCode=i; i++;
  A_Language[i] = 'Odstr\u00e1ni\u0165 JavaScript k\u00f3d'; var C_RemoveJSCode=i; i++;
  A_Language[i] = 'Nap\u00ed\u0161te sem V\u00e1\u0161 k\u00f3d'; var C_WriteCode=i; i++;
  // Options : Resources table
  A_Language[i] = 'Tabu\u013eka zdrojov'; var C_ResourcesTableOption=i; i++;
  A_Language[i] = 'Zobrazova\u0165 tabu\u013eku zdrojov'; var C_ShowHeaderResourcesTable=i; i++;
  A_Language[i] = 'Zobrazova\u0165 n\u00e1zvy plan\u00e9t'; var C_ShowPlanetName=i; i++;
  A_Language[i] = 'Zobrazova\u0165 s\u00faradnice plan\u00e9t'; var C_ShowCoordinates=i; i++;
  A_Language[i] = 'Doplni\u0165 st\u013apec Spolu'; var C_ShowTotal=i; i++;
  A_Language[i] = 'Zobrazi\u0165 st\u013apec Temn\u00e1 hmota'; var C_ShowDarkMatter=i; i++;
  A_Language[i] = 'Zobrazi\u0165 \u010das od poslednej aktualiz\u00e1cie'; var C_ShowTimeUpdate=i; i++;
  A_Language[i] = 'Zobrazuj len zdroje z aktu\u00e1lneho prihl\u00e1senia'; var C_ShowResourcesOnlyActiveSession=i; i++
  A_Language[i] = 'Vypo\u010d\u00edtava\u0165 zdroje v re\u00e1lnom \u010dase'; var C_RealTimeResources=i; i++;
  A_Language[i] = 'Interval medzi prepo\u010dtom zdrojov'; var C_RealTimeResourcesDelay=i; i++;
  A_Language[i] = '\u0160t\u00fdl hlavi\u010dky aktu\u00e1lnej plan\u00e9ty (v css)'; var C_HeaderSelectedPlanetStyle=i; i++;
  A_Language[i] = 'Prieh\u013eadnos\u0165 buniek zdrojov (1 a\u017e 100)'; var C_Transparency=i; i++;
  A_Language[i] = 'Farby zodpovedaj\u00face dobe aktualiz\u00e1cie (v sekund\u00e1ch) (pou\u017eije sa farba, ktorej \u010das je najbli\u017e\u0161\u00ed v\u00e4\u010d\u0161\u00ed, ako doba aktualiz\u00e1cie)'; var C_UpdateTimeColor=i; i++;
  A_Language[i] = 'A \u010derven\u00e1, ak je \u010das aktualiz\u00e1cie e\u0161te v\u00e4\u010d\u0161\u00ed.'; var C_UpdateTimeRed=i; i++;
  A_Language[i] = 'Aktivova\u0165 triedenie plan\u00e9t'; var C_PlanetOrder=i; i++;
  A_Language[i] = 'Vyberte jednu plan\u00e9tu a pomocou \u0161\u00edpiek zme\u0148te jej polohu'; var C_PlanetOrderDescription=i; i++;
  // Options : Empire
  A_Language[i] = 'Zobrazi\u0165 odkaz Imp\u00e9rium'; var C_ShowEmpire=i; i++;
  A_Language[i] = 'N\u00e1zov odkazu imp\u00e9ria'; var C_EmpireLinkName=i; i++;
  A_Language[i] = '\u010c\u00edslo riadka v menu Ogame'; var C_EmpireMenuRow=i; i++;
  A_Language[i] = 'Ve\u013ekos\u0165 n\u00e1h\u013eadov plan\u00e9t v bodoch'; var C_EmpireIconSize=i; i++;
  A_Language[i] = 'Skry\u0165 \u0161tandardn\u00fa tabu\u013eku zdrojov'; var C_HideDefaultResourcesTable=i; i++;
  A_Language[i] = 'Vyn\u00fati\u0165 zobrazenie generovanej tabu\u013eky zdrojov'; var C_ForceDisplayHeaderResourcesTableWithEmpire=i; i++;
  A_Language[i] = 'Vyberte blok a pomocou \u0161\u00edpiek zme\u0148te jeho poz\u00edciu'; var C_BlockOrderDescription=i; i++;
  // Options : Transfer
  A_Language[i] = 'Preprava'; var C_Transfer=i; i++;
  A_Language[i] = 'Pou\u017ei\u0165 v\u00fdsledok v\u00fdpo\u010dtu zdrojov v re\u00e1lnom \u010dase'; var C_UseRealTimeResources=i; i++;
  A_Language[i] = 'Vyn\u00fati\u0165 zobrazenie vypo\u010d\u00edtan\u00fdch zdrojov v re\u00e1lnom \u010dase (v\u00fdznamn\u00e9 za\u0165a\u017eenie CPU)'; var C_ForceResourcesTransferTableUpdate=i; i++;
  A_Language[i] = 'Zobrazi\u0165 formul\u00e1t prepravy ak preprava prebieha'; var C_ShowTransferTableIfActiveTransfer=i; i++;
  A_Language[i] = 'N\u00e1sobi\u010d r\u00fdchlosti lod\u00ed'; var C_TransferRatioSpeed=i; i++;
  // Options : Additional links
  A_Language[i] = '\u010eal\u0161ie odkazy'; var C_LinkOption=i; i++;
  A_Language[i] = 'N\u00e1zov odkazu'; var C_LinkName=i; i++;
  A_Language[i] = 'URL odkazu'; var C_LinkUrl=i; i++;
  A_Language[i] = '\u010c\u00edslo riadka v menu'; var C_LinkPosition=i; i++;
  A_Language[i] = 'Otvori\u0165 odkaz v novom okne'; var C_LinkNewWindow=i; i++;
  A_Language[i] = 'Zobrazen\u00fd text pri pohybe my\u0161ou nad odkazom'; var C_LinkTitle=i; i++;
  A_Language[i] = 'Prida\u0165 odkaz'; var C_AddLink=i; i++;
  A_Language[i] = 'Odkaz n\260'; var C_LinkNumber=i; i++;
  A_Language[i] = 'Vymaza\u0165'; var C_Delete=i; i++;
  // Options
  A_Language[i] = 'Ulo\u017ei\u0165'; var C_Save=i; i++;
  A_Language[i] = 'Ovl\u00e1dac\u00ed panel'; var C_ControlPanel=i; i++;
  // Automatic update
  A_Language[i] = 'Štart aktualizácie'; var C_StartUpdate=i; i++;
  A_Language[i] = 'Stop aktualizácie'; var C_StopUpdate=i; i++;
  A_Language[i] = 'Zastaviť automatickú aktualizáciu'; var C_UpdateStopInformations=i; i++;
  A_Language[i] = 'Aktualizovať automaticky všetky planéty'; var C_UpdateInformations=i; i++;
  // Resources table
  A_Language[i] = 'Nasledujúca planéta'; var C_NextPlanet=i; i++;
  A_Language[i] = 'Predchádzajúca planéta'; var C_PreviousPlanet=i; i++;
  A_Language[i] = 'Aktualizovať aktuálnu stránku pre všetky planéty'; var C_UpdatePages=i; i++;
  // Empire
  A_Language[i] = 'Typ'; var C_Type=i; i++;
  A_Language[i] = 'Počet polí'; var C_FieldNumber=i; i++;
  A_Language[i] = 'do'; var C_To=i; i++;
  A_Language[i] = 'Nastaviť'; var C_Apply=i; i++;
  A_Language[i] = 'Obrázok nebol uložený'; var C_ImageNotSaved=i; i++;
  A_Language[i] = 'Hlavné informácie'; var C_MainInformations=i; i++;
  A_Language[i] = 'Hodinová produkcia'; var C_HourProduction=i; i++;
  A_Language[i] = 'Denná produkcia'; var C_DayProduction=i; i++;
  A_Language[i] = 'Budovy'; var C_BuildingsTxt=i; i++;
  A_Language[i] = 'Obrana'; var C_DefensesTxt=i; i++;
  A_Language[i] = 'Výskum'; var C_ResearchTxt=i; i++;
  A_Language[i] = 'Flotila'; var C_FleetsTxt=i; i++;
  A_Language[i] = 'Zoznam'; var C_List=i; i++;
  A_Language[i] = 'Lode a obrana vo výrobe'; var C_FleetsDefensesUC=i; i++;
  A_Language[i] = 'Choď na budovy'; var C_ToBuildings=i; i++;
  A_Language[i] = 'Choď na výskum'; var C_ToResearch=i; i++;
  A_Language[i] = 'Choď na obranu'; var C_ToDefenses=i; i++;
  A_Language[i] = 'Choď na stavbu lodí'; var C_ToFleets=i; i++;
  A_Language[i] = 'Energia poskytovaná solárnymi satelitmi.'; var C_Ship212Production=i; i++;
  A_Language[i] = 'Počet potrebných solárnych satelitov'; var C_Ship212NecessaryNumber=i; i++;
  A_Language[i] = 'Dostupná výroba'; var C_ConstructionAvailable=i; i++;
  A_Language[i] = 'So zdrojmi z planéty'; var C_WithPlanetResources=i; i++;
  A_Language[i] = 'So zdrojmi zo všetkých planét'; var C_WithAllPlanetsResources=i; i++;
  A_Language[i] = 'Na tejto planéte prebieha iná staba'; var C_OtherBuildingsInConstruction=i; i++;
  A_Language[i] = 'Na tejto planéte prebieha iný výskum'; var C_OtherResearchInDevelopment=i; i++;
  A_Language[i] = 'Celková cena budov'; var C_TotalBuildingsCost=i; i++;
  A_Language[i] = 'Cena za úroveň'; var C_LevelCost1=i; i++;
  A_Language[i] = ''; var C_LevelCost2=i; i++;
  A_Language[i] = 'Zrušiť stavbu'; var C_StopBuildings=i; i++;
  A_Language[i] = 'Zrušiť výskum'; var C_StopResearch=i; i++;
  A_Language[i] = 'Spustiť stavbu'; var C_LaunchBuildings=i; i++;
  A_Language[i] = 'Spustiť výskum'; var C_LaunchResearch=i; i++;
  A_Language[i] = 'Stavať obranu'; var C_BuildDefenses=i; i++;
  A_Language[i] = 'Stavať loď'; var C_BuildFleets=i; i++;
  A_Language[i] = 'Doba výstavby'; var C_BuildingTime=i; i++;
  // Empire : Export
  A_Language[i] = 'Export'; var C_Export=i; i++;
  A_Language[i] = 'Voľby generátora'; var C_GeneratorOptions=i; i++;
  A_Language[i] = 'Centrované'; var C_Center=i; i++;
  A_Language[i] = 'Farebný text'; var C_TextColored=i; i++;
  A_Language[i] = 'Bez špeciálnych znakov'; var C_NoSpecialCharacter=i; i++;
  A_Language[i] = 'V tabuľke'; var C_LayoutInTable=i; i++;
  A_Language[i] = 'Text v tabuľke centrovaný'; var C_CenteredTextInTable=i; i++;
  A_Language[i] = 'Zmeniť veľkosť textu v tabuľke'; var C_ResizeTextInTable=i; i++;
  A_Language[i] = 'Generovať'; var C_Generate=i; i++;
  A_Language[i] = 'znakov'; var C_Characters=i; i++;
  // Transfer
  A_Language[i] = 'Presun surovín'; var C_TransferResources=i; i++;
  A_Language[i] = 'Nie sú dostupné suroviny, ktoré by sa dali presunúť.'; var C_NoResources=i; i++;
  A_Language[i] = 'Presun nie je možný. Na danej planéte nemáte dosť lodí.'; var C_NotEnoughShip1=i; i++;
  A_Language[i] = 'Mali by ste si zobraziť všetky stránky letky, aby sa aktualizoval počet lodí.'; var C_NotEnoughShip2=i; i++;
  A_Language[i] = 'Cieľ'; var C_Destination=i; i++;
  A_Language[i] = 'Poslať'; var C_ToTransfer=i; i++;
  A_Language[i] = 'Obrátiť výber'; var C_InvertSelection=i; i++;
  A_Language[i] = 'Poslané'; var C_Transfered=i; i++;
  A_Language[i] = 'Rýchlosť'; var C_Speed=i; i++;
  A_Language[i] = 'Recyklátor ?'; var C_NeededRecycler=i; i++;
  A_Language[i] = 'Stav presunu'; var C_TransferState=i; i++;
  A_Language[i] = 'VT'; var C_LargeCargoShip=i; i++; // Abbreviation of Large Cargo Ship
  A_Language[i] = 'MT'; var C_SmallCargoShip=i; i++; // Abbreviation of Small Cargo Ship
  A_Language[i] = 'Presuny nie sú možné z cieľových planét.'; var C_NoTransferFromDestinationPlanet=i; i++;
  A_Language[i] = 'Žiadne recyklátory nie sú dostupné.'; var C_NoRecycler=i; i++;
  A_Language[i] = 'Nie je dostupné dostatočné množstvo veľkých transportérov.'; var C_NotEnoughLargeCargoShip=i; i++;
  A_Language[i] = 'Nie je dostupné dostatočné množstvo malých transportérov.'; var C_NotEnoughSmallCargoShip=i; i++;
  A_Language[i] = 'Suroviny už boli z tejto planéty poslané.'; var C_AlreadyTransfered=i; i++;
  A_Language[i] = 'Táto planéta nebola vybraná pre presun.'; var C_PlanetNotSelected=i; i++;
  A_Language[i] = 'Neprebiehajú žiadne presuny.'; var C_NoTransfer=i; i++;
  A_Language[i] = 'Vybraná kolónia'; var C_ColonyToBeUsed=i; i++;
  A_Language[i] = 'Iný cieľ'; var C_OtherDestination=i; i++;
  A_Language[i] = 'Zadajte suroviny, ktoré majú byť presunuté'; var C_NeededResources=i; i++;
  A_Language[i] = 'Zvyšok'; var C_Rest=i; i++;
  A_Language[i] = 'Kov na presun'; var C_MetalToBeSent=i; i++;
  A_Language[i] = 'Kryštály na presun'; var C_CrystalToBeSent=i; i++;
  A_Language[i] = 'Deutérium na presun'; var C_DeuteriumToBeSent=i; i++;
  A_Language[i] = 'Doba letu'; var C_FlightTime=i; i++;
  A_Language[i] = 'Rýchlosť'; var C_SendingSpeed=i; i++;
  A_Language[i] = 'Spotreba paliva'; var C_DeuteriumConsumption=i; i++;
  A_Language[i] = 'Počet MT, alebo VT na presun'; var C_TransportShipNumber=i; i++;
  A_Language[i] = 'Voľby výpočtu'; var C_TransferCalcOption=i; i++;
  A_Language[i] = 'Režim výpočtu'; var C_CalcMode=i; i++;
  A_Language[i] = 'Presun surovín z planét s najväčším množstvom surovín (Po presune zostane všade rovnako)'; var C_SameRest=i; i++;
  A_Language[i] = 'Presunúť rovnaké množstvo zo všetkých planét'; var C_SameQuantity=i; i++;
  A_Language[i] = 'Použiť najprv všetky zdroje na cieľovej planéte'; var C_UseTotalResourcesDestinationPlanet=i; i++;
  A_Language[i] = 'Doba letu čo možno najpodobnejšia'; var C_SameTime=i; i++;
  A_Language[i] = 'Najrýchlejšie ako sa dá'; var C_Fastest=i; i++;
  A_Language[i] = 'Čas príletu'; var C_ArrivalDate=i; i++;
  A_Language[i] = 'Rok'; var C_Year=i; i++;
  A_Language[i] = 'Mesiac'; var C_Month=i; i++;
  A_Language[i] = 'Deň'; var C_Day=i; i++;
  A_Language[i] = 'Hodina'; var C_Hour=i; i++;
  A_Language[i] = 'Minúta'; var C_Minute=i; i++;
  A_Language[i] = 'Deň(dni)'; var C_Days=i; i++;
  A_Language[i] = 'Hodina(y)'; var C_Hours=i; i++;
  A_Language[i] = 'Minúta(y)'; var C_Minutes=i; i++;
  A_Language[i] = 'd'; var C_DayAbbreviation=i; i++;
  A_Language[i] = 'h'; var C_HourAbbreviation=i; i++;
  A_Language[i] = 'm'; var C_MinuteAbbreviation=i; i++;
  A_Language[i] = 's'; var C_SecondAbbreviation=i; i++;
  A_Language[i] = 'ak treba, pridať recyklátory na spresnenie doby letu'; var C_AddRecycler=i; i++;
  A_Language[i] = 'Transportér'; var C_TransportShip=i; i++;
  A_Language[i] = 'Uložiť presun'; var C_SaveTransfer=i; i++;
  A_Language[i] = 'Zrušiť presun'; var C_CancelTransfer=i; i++;
  A_Language[i] = 'Zaplniť transportéry'; var C_FillShip=i; i++;
  A_Language[i] = 'neuložených planét. Mali by ste si ich zobraziť.'; var C_UnsavedPlanets=i; i++;
  A_Language[i] = 'Zadať súradnice a rýchlosť'; var C_FillCoordinatesAndSpeed=i; i++;
  A_Language[i] = 'Zadať suroviny'; var C_FillResources=i; i++;
  A_Language[i] = 'Pokračovať'; var C_Continue=i; i++;
  // Other
  A_Language[i] = 'Doba vykonania'; var C_RunTime=i; i++;
  A_Language[i] = 'Bola nájdená budova, ktorá ovplyvňuje koeficient výroby.\n\nChcete teraz aktualizovať stránku zdrojov?'; var C_ResourcesBuildingsUC=i; i++;
  // Welcome message
  A_Language[i] = 'Vitajte v novej verzii \253'+C_ScriptName+'\273 (verzia: '+C_ScriptVersion+', zostavenie: '+C_ScriptBuild+')\n\nNemecký preklad : Dhu\nTaliansky preklad : Fiox\nŠpanielsky preklad : ETintos\nSlovenský preklad : viktorc\nVďaka všetkým beta testerom.\n\n'+
  'Väčšina kódu v tejto verzii bola prepísaná. Z toho dôvodu sa odporúča spustenie automatickej aktualizácie stránok Vášho účtu, podľa tejto správy.\n\n'+
  'Hneď po tom, ako kliknete na OK, skript nahrá stránku technológií, aby získal názvy všetkých stavieb.\n\n'+
  'Informácie o zmenách v tejto verzii nájdete v sekcii \253DESCRIPTION DES MISES A JOUR\273 v skripte (len vo francúžštine).'; var C_NewVersion=i; i++;
  A_Language[i] = 'Vitajte v novej verzii \253'+C_ScriptName+'\273 (verzia: '+C_ScriptVersion+', zostavenie: '+C_ScriptBuild+')\n\nNemecký preklad : Dhu\nTaliansky preklad : Fiox\nŠpanielsky preklad : ETintos\nSlovenský preklad : viktorc\nVďaka všetkým beta testerom.\n\n'+
  'Informácie o zmenách v tejto verzii nájdete v sekcii \253DESCRIPTION DES MISES A JOUR\273 v skripte (len vo francúžštine).'; var C_NewBuild=i; i++;
}
else { // EN
  // For accented character, use unicode or octal code to replace it, use this link (http://www.vbc3.com/script/unicode_octal_html_code.php)
  i = 0;
  A_Language[i] = 'Planet'; i++;
  A_Language[i] = 'Moon'; i++;
  A_Language[i] = 'Metal'; var C_Metal=i; i++;
  A_Language[i] = 'Crystal'; var C_Crystal=i; i++;
  A_Language[i] = 'Deuterium'; var C_Deuterium=i; i++;
  A_Language[i] = 'Energy'; var C_Energy=i; i++;
  A_Language[i] = 'Dark Matter'; var C_DarkMatter=i; i++;
  A_Language[i] = 'Empire'; var C_Empire=i; i++;
  A_Language[i] = 'Resources'; var C_Resources=i; i++;
  A_Language[i] = 'Update'; var C_Update=i; i++;
  A_Language[i] = 'Yes'; var C_Yes=i; i++;
  A_Language[i] = 'No'; var C_No=i; i++;
  A_Language[i] = 'Show'; var C_Show=i; i++;
  A_Language[i] = 'Hide'; var C_Hide=i; i++;
  // Required text for analysis, include spaces, must be exact
  A_Language[i] = 'Diameter'; var C_Diameter=i; i++; // Overview page
  A_Language[i] = 'Temperature'; var C_Temperature=i; i++; // Overview page
  A_Language[i] = 'Total'; var C_Total=i; i++; // Name of total in resources page
  A_Language[i] = 'Resource production on'; var C_ResourcesTableHeader=i; i++; // Beginning of the first row from the resources table (resources page) 
  A_Language[i] = 'Requirements'; var C_Require=i; i++; // First word of the right cell in tree technology table 
  A_Language[i] = 'Production Factor: '; var C_ProductionRate=i; i++; // Text before production rate number in resources page
  // ValidateBuilding
  A_Language[i] = 'Numbers of free fields are insufficient'; var C_NotEnoughFreeField=i; i++;
  A_Language[i] = 'The lunar base is not built yet'; var C_LunarBaseNotBuilt=i; i++;
  A_Language[i] = 'Not available on planet'; var C_NotOnPlanet=i; i++;
  A_Language[i] = 'Not available on moon'; var C_NotOnMoon=i; i++;
  // AddLink
  A_Language[i] = 'Key words :\n\nSome part of the address can be replaced by keywords.\n\n'+
  '[session] To get the id of the current session\n'+
  '[host] To get the domain of the ogame universe\n'+
  '[Planet name] To get the id of one of your planets\n\n'+
  'Ex: Creation of a link to the \'overview\' page of the planet named \253Homeworld\273 :\n'+
  'http://[host]/game/index.php?page=overview&session=[session]&cp=[Homeworld]\n\n'+
  'Become (for universe 10) :\n'+
  'http://uni10.ogame.org/game/index.php?page=overview&session=2943046dc47f&cp=34317957'; var C_KeyWordsInformations=i; i++;
  // SaveParameter
  A_Language[i] = 'There is an error in the value of transparency.\nThe value must be included between 1 and 100'; var C_TransparencyError=i; i++;
  A_Language[i] = 'The value of the empire row is not correct.\nThe value must be between 1 and '; var C_EmpireRowError=i; i++;
  A_Language[i] = 'The name of the link of the empire menu must contain at least one character'; var C_EmpireTxtError=i; i++;
  A_Language[i] = 'The icons size of planets in empire view must be greater than 1 pixel.'; var C_EmpireSizeIconError=i; i++;
  A_Language[i] = 'The link'; var C_LinkPositionError1=i; i++;
  A_Language[i] = ' can\'t be saved.\nVerify the name, link and row number.\nThe link row must be between 1 and '; var C_LinkPositionError2=i; i++;
  A_Language[i] = 'Data has been saved\nYou can edit the data, the page will not be refreshed.'; var C_SaveParameterError=i; i++;
  // ShowHideTable
  A_Language[i] = 'Roll up'; var C_RollUp=i; i++;
  A_Language[i] = 'Unfold'; var C_Unfold=i; i++;
  // Options : General parameters
  A_Language[i] = 'General parameters'; var C_MainOption=i; i++;
  A_Language[i] = 'Show numbers in kilo'; var C_ShowInKilo=i; i++;
  A_Language[i] = 'Show seconds for the upper update at 24h'; var C_ShowSecondForUpperUpdateTimeInDay=i; i++;
  A_Language[i] = 'Delete Links \'officers\''; var C_DeleteOfficerLink=i; i++;
  A_Language[i] = 'Delete Link \'merchant\''; var C_DeleteTraderLink=i; i++;
  A_Language[i] = 'Position'; var C_Coordinates=i; i++;
  A_Language[i] = 'Name'; var C_Name=i; i++;
  A_Language[i] = 'Status'; var C_Status=i; i++;
  A_Language[i] = 'Points'; var C_Points=i; i++;
  A_Language[i] = 'Membership'; var C_MemberShip=i; i++;
  A_Language[i] = 'Online'; var C_Online=i; i++;
  A_Language[i] = 'Sort member list'; var C_SortMember=i; i++;
  A_Language[i] = 'Ascending'; var C_Increasing=i; i++;
  A_Language[i] = 'Descending'; var C_Lessening=i; i++;
  A_Language[i] = 'Order of member list sorting'; var C_SortOrder=i;i++;
  A_Language[i] = 'Add tooltip to all links'; var C_AddToolTip=i; i++;
  A_Language[i] = 'Show a message asking to update the resources page if a new building modifying it was built'; var C_ShowRequestToUpdateResourcesPage=i; i++;
  A_Language[i] = 'Show a link to update all pages automatically.'; var C_ShowAutoUpdate=i; i++;
  A_Language[i] = 'Use a random time interval to update pages automatically (between 2 and 10s)'; var C_UseRandomUpdateTime=i; i++;
  A_Language[i] = 'Add a version check php image at the bottom of page'; var C_AddImageVersion=i; i++;
  A_Language[i] = 'Show error messages (Debugging)'; var C_Debug=i; i++;
  // Options : Display options
  A_Language[i] = 'Display options'; var C_ScreenOption=i; i++;
  A_Language[i] = 'Show drop-down list of planets'; var C_ShowHeaderPlanetList=i; i++;
  A_Language[i] = 'Show the default resources table'; var C_ShowHeaderResourcesList=i; i++;
  A_Language[i] = 'Add the resources total to the default resources table'; var C_AddResourcesTotal=i; i++;
  A_Language[i] = 'Activate the possibility to change the header frame position (Drop-down list of planets)'; var C_ChangeHeaderPosition=i; i++;
  A_Language[i] = 'Position of the header frame (in css)'; var C_HeaderPosition=i; i++;
  A_Language[i] = 'To be sure that your position is taken into consideration, you can add \253!important\273 after the position.'; var C_PositionInformations=i; i++;
  A_Language[i] = 'Activate the possibility to change the position of the main frame.'; var C_ChangeContentPosition=i; i++;
  A_Language[i] = 'Position of the main frame (in css)'; var C_ContentPosition=i; i++;
  A_Language[i] = 'Add CSS code in all pages'; var C_AddCssCode=i; i++;
  A_Language[i] = 'Remove CSS code'; var C_RemoveCssCode=i; i++;
  A_Language[i] = 'Add JavaScript code in all pages'; var C_AddJSCode=i; i++;
  A_Language[i] = 'Remove JavaScript code'; var C_RemoveJSCode=i; i++;
  A_Language[i] = 'Write your code here'; var C_WriteCode=i; i++;
  // Options : Resources table
  A_Language[i] = 'Resources table'; var C_ResourcesTableOption=i; i++;
  A_Language[i] = 'Show the resources table'; var C_ShowHeaderResourcesTable=i; i++;
  A_Language[i] = 'Show planet name'; var C_ShowPlanetName=i; i++;
  A_Language[i] = 'Show the coordinates of planets'; var C_ShowCoordinates=i; i++;
  A_Language[i] = 'Add total resources column'; var C_ShowTotal=i; i++;
  A_Language[i] = 'Show dark matter column'; var C_ShowDarkMatter=i; i++;
  A_Language[i] = 'Show the time since the last update'; var C_ShowTimeUpdate=i; i++;
  A_Language[i] = 'Show only resources of active session'; var C_ShowResourcesOnlyActiveSession=i; i++
  A_Language[i] = 'Calculate resources in real time'; var C_RealTimeResources=i; i++;
  A_Language[i] = 'Interval of time between each calculation'; var C_RealTimeResourcesDelay=i; i++;
  A_Language[i] = 'Style of header of current planet (in css)'; var C_HeaderSelectedPlanetStyle=i; i++;
  A_Language[i] = 'Transparency of resources cells (1 to 100)'; var C_Transparency=i; i++;
  A_Language[i] = 'Time corresponding to the colors of graduations (in second) (the color used is the one whoise time since the last update is just inferior of filled time)'; var C_UpdateTimeColor=i; i++;
  A_Language[i] = 'And red, if update time is greater.'; var C_UpdateTimeRed=i; i++;
  A_Language[i] = 'Activate planet sorting'; var C_PlanetOrder=i; i++;
  A_Language[i] = 'Choose one planet and use arrows to change its position'; var C_PlanetOrderDescription=i; i++;
  // Options : Empire
  A_Language[i] = 'Show empire link'; var C_ShowEmpire=i; i++;
  A_Language[i] = 'Name of empire link'; var C_EmpireLinkName=i; i++;
  A_Language[i] = 'Row number in ogame menu'; var C_EmpireMenuRow=i; i++;
  A_Language[i] = 'Size in pixel of planet thumbnails'; var C_EmpireIconSize=i; i++;
  A_Language[i] = 'Hide default resources table'; var C_HideDefaultResourcesTable=i; i++;
  A_Language[i] = 'Force the display of the generated resources table'; var C_ForceDisplayHeaderResourcesTableWithEmpire=i; i++;
  A_Language[i] = 'Choose one block and use arrows to change its position'; var C_BlockOrderDescription=i; i++;
  // Options : Transfer
  A_Language[i] = 'Transfer'; var C_Transfer=i; i++;
  A_Language[i] = 'Use result of real time resources calculation'; var C_UseRealTimeResources=i; i++;
  A_Language[i] = 'Force the display of the resources calculated real time (Important CPU usage)'; var C_ForceResourcesTransferTableUpdate=i; i++;
  A_Language[i] = 'Show transfer form if a transfer is in progress'; var C_ShowTransferTableIfActiveTransfer=i; i++;
  A_Language[i] = 'Speed ship ratio multiplier'; var C_TransferRatioSpeed=i; i++;
  // Options : Additional links
  A_Language[i] = 'Additional links'; var C_LinkOption=i; i++;
  A_Language[i] = 'Name of link'; var C_LinkName=i; i++;
  A_Language[i] = 'Url of link'; var C_LinkUrl=i; i++;
  A_Language[i] = 'Row number in menu'; var C_LinkPosition=i; i++;
  A_Language[i] = 'Open the link in a new window'; var C_LinkNewWindow=i; i++;
  A_Language[i] = 'Text shown if the mouse is hovering above the link'; var C_LinkTitle=i; i++;
  A_Language[i] = 'Add link'; var C_AddLink=i; i++;
  A_Language[i] = 'Link n\260'; var C_LinkNumber=i; i++;
  A_Language[i] = 'Delete'; var C_Delete=i; i++;
  // Options
  A_Language[i] = 'Save'; var C_Save=i; i++;
  A_Language[i] = 'Control panel'; var C_ControlPanel=i; i++;
  // Automatic update
  A_Language[i] = 'Update Start'; var C_StartUpdate=i; i++;
  A_Language[i] = 'Update Stop'; var C_StopUpdate=i; i++;
  A_Language[i] = 'Stop automatic update'; var C_UpdateStopInformations=i; i++;
  A_Language[i] = 'Update all pages automatically'; var C_UpdateInformations=i; i++;
  // Resources table
  A_Language[i] = 'Next planet'; var C_NextPlanet=i; i++;
  A_Language[i] = 'Previous planet'; var C_PreviousPlanet=i; i++;
  A_Language[i] = 'Refresh the current page for all planets'; var C_UpdatePages=i; i++;
  // Empire
  A_Language[i] = 'Type'; var C_Type=i; i++;
  A_Language[i] = 'Number of field'; var C_FieldNumber=i; i++;
  A_Language[i] = 'to'; var C_To=i; i++;
  A_Language[i] = 'Apply'; var C_Apply=i; i++;
  A_Language[i] = 'Image not saved'; var C_ImageNotSaved=i; i++;
  A_Language[i] = 'Main informations'; var C_MainInformations=i; i++;
  A_Language[i] = 'Hourly production'; var C_HourProduction=i; i++;
  A_Language[i] = 'Daily Production'; var C_DayProduction=i; i++;
  A_Language[i] = 'Buildings'; var C_BuildingsTxt=i; i++;
  A_Language[i] = 'Defense'; var C_DefensesTxt=i; i++;
  A_Language[i] = 'Research'; var C_ResearchTxt=i; i++;
  A_Language[i] = 'Fleet'; var C_FleetsTxt=i; i++;
  A_Language[i] = 'List'; var C_List=i; i++;
  A_Language[i] = 'Ship and defenses under construction'; var C_FleetsDefensesUC=i; i++;
  A_Language[i] = 'Go to buildings'; var C_ToBuildings=i; i++;
  A_Language[i] = 'Go to research'; var C_ToResearch=i; i++;
  A_Language[i] = 'Go to defense'; var C_ToDefenses=i; i++;
  A_Language[i] = 'Go to shipyard'; var C_ToFleets=i; i++;
  A_Language[i] = 'Energy provide by solar satellites.'; var C_Ship212Production=i; i++;
  A_Language[i] = 'Num. of solar satellites needed'; var C_Ship212NecessaryNumber=i; i++;
  A_Language[i] = 'Construction available'; var C_ConstructionAvailable=i; i++;
  A_Language[i] = 'With resources from planet'; var C_WithPlanetResources=i; i++;
  A_Language[i] = 'With resources from all planets'; var C_WithAllPlanetsResources=i; i++;
  A_Language[i] = 'An other construction is in progress on this planet'; var C_OtherBuildingsInConstruction=i; i++;
  A_Language[i] = 'An other research is active on this planet'; var C_OtherResearchInDevelopment=i; i++;
  A_Language[i] = 'Total cost of buildings'; var C_TotalBuildingsCost=i; i++;
  A_Language[i] = 'Level cost'; var C_LevelCost1=i; i++;
  A_Language[i] = ' required'; var C_LevelCost2=i; i++;
  A_Language[i] = 'Cancel building'; var C_StopBuildings=i; i++;
  A_Language[i] = 'Cancel research'; var C_StopResearch=i; i++;
  A_Language[i] = 'Start building'; var C_LaunchBuildings=i; i++;
  A_Language[i] = 'Start research'; var C_LaunchResearch=i; i++;
  A_Language[i] = 'Build defense'; var C_BuildDefenses=i; i++;
  A_Language[i] = 'Build ship'; var C_BuildFleets=i; i++;
  A_Language[i] = 'Building time'; var C_BuildingTime=i; i++;
  // Empire : Export
  A_Language[i] = 'Export'; var C_Export=i; i++;
  A_Language[i] = 'Generator options'; var C_GeneratorOptions=i; i++;
  A_Language[i] = 'Centred'; var C_Center=i; i++;
  A_Language[i] = 'Text in color'; var C_TextColored=i; i++;
  A_Language[i] = 'No special character'; var C_NoSpecialCharacter=i; i++;
  A_Language[i] = 'Table'; var C_LayoutInTable=i; i++;
  A_Language[i] = 'Centre the text of table'; var C_CenteredTextInTable=i; i++;
  A_Language[i] = 'Resize the text of table'; var C_ResizeTextInTable=i; i++;
  A_Language[i] = 'Generate'; var C_Generate=i; i++;
  A_Language[i] = 'characters'; var C_Characters=i; i++;
  // Transfer
  A_Language[i] = 'Transfer resources'; var C_TransferResources=i; i++;
  A_Language[i] = 'There are no resources to be transfered.'; var C_NoResources=i; i++;
  A_Language[i] = 'Transfer is impossibile. You haven\'t enough ships on certain planets.'; var C_NotEnoughShip1=i; i++;
  A_Language[i] = 'You should revisit all fleet pages to update ship number.'; var C_NotEnoughShip2=i; i++;
  A_Language[i] = 'Destination'; var C_Destination=i; i++;
  A_Language[i] = 'To send'; var C_ToTransfer=i; i++;
  A_Language[i] = 'Invert selection'; var C_InvertSelection=i; i++;
  A_Language[i] = 'Sent'; var C_Transfered=i; i++;
  A_Language[i] = 'Speed'; var C_Speed=i; i++;
  A_Language[i] = 'Recycler ?'; var C_NeededRecycler=i; i++;
  A_Language[i] = 'Transfer status'; var C_TransferState=i; i++;
  A_Language[i] = 'LC'; var C_LargeCargoShip=i; i++; // Abbreviation of Large Cargo Ship
  A_Language[i] = 'SC'; var C_SmallCargoShip=i; i++; // Abbreviation of Small Cargo Ship
  A_Language[i] = 'Transfers are not possible from destination planets.'; var C_NoTransferFromDestinationPlanet=i; i++;
  A_Language[i] = 'No recyclers available.'; var C_NoRecycler=i; i++;
  A_Language[i] = 'There are not enough large cargos.'; var C_NotEnoughLargeCargoShip=i; i++;
  A_Language[i] = 'There are not enough small cargos.'; var C_NotEnoughSmallCargoShip=i; i++;
  A_Language[i] = 'Resources have already been sent from this planet.'; var C_AlreadyTransfered=i; i++;
  A_Language[i] = 'This planet has not been selected for the transfer.'; var C_PlanetNotSelected=i; i++;
  A_Language[i] = 'No transfer in progress.'; var C_NoTransfer=i; i++;
  A_Language[i] = 'Selected colony'; var C_ColonyToBeUsed=i; i++;
  A_Language[i] = 'Other destination'; var C_OtherDestination=i; i++;
  A_Language[i] = 'Fill resources to be transfered'; var C_NeededResources=i; i++;
  A_Language[i] = 'Rest'; var C_Rest=i; i++;
  A_Language[i] = 'Metal to be sent'; var C_MetalToBeSent=i; i++;
  A_Language[i] = 'Crystal to be sent'; var C_CrystalToBeSent=i; i++;
  A_Language[i] = 'Deuterium to be sent'; var C_DeuteriumToBeSent=i; i++;
  A_Language[i] = 'Flight time'; var C_FlightTime=i; i++;
  A_Language[i] = 'Speed'; var C_SendingSpeed=i; i++;
  A_Language[i] = 'Fuel consumption'; var C_DeuteriumConsumption=i; i++;
  A_Language[i] = 'SC or LC to be sent'; var C_TransportShipNumber=i; i++;
  A_Language[i] = 'Calculation options'; var C_TransferCalcOption=i; i++;
  A_Language[i] = 'Calculation mode'; var C_CalcMode=i; i++;
  A_Language[i] = 'Transfer resources from planets with maximum resources (Same rest after transfer)'; var C_SameRest=i; i++;
  A_Language[i] = 'Transfer the same quantity from each planet'; var C_SameQuantity=i; i++;
  A_Language[i] = 'Use all resources on destination planet first'; var C_UseTotalResourcesDestinationPlanet=i; i++;
  A_Language[i] = 'Flight time the closest possible'; var C_SameTime=i; i++;
  A_Language[i] = 'Fastest possible'; var C_Fastest=i; i++;
  A_Language[i] = 'Arrival date'; var C_ArrivalDate=i; i++;
  A_Language[i] = 'Year'; var C_Year=i; i++;
  A_Language[i] = 'Month'; var C_Month=i; i++;
  A_Language[i] = 'Day'; var C_Day=i; i++;
  A_Language[i] = 'Hour'; var C_Hour=i; i++;
  A_Language[i] = 'Minute'; var C_Minute=i; i++;
  A_Language[i] = 'Day(s)'; var C_Days=i; i++;
  A_Language[i] = 'Hour(s)'; var C_Hours=i; i++;
  A_Language[i] = 'Minute(s)'; var C_Minutes=i; i++;
  A_Language[i] = 'd'; var C_DayAbbreviation=i; i++;
  A_Language[i] = 'h'; var C_HourAbbreviation=i; i++;
  A_Language[i] = 'm'; var C_MinuteAbbreviation=i; i++;
  A_Language[i] = 's'; var C_SecondAbbreviation=i; i++;
  A_Language[i] = 'if needed, add a recycler to adjust flight time'; var C_AddRecycler=i; i++;
  A_Language[i] = 'Cargo'; var C_TransportShip=i; i++;
  A_Language[i] = 'Save transfer'; var C_SaveTransfer=i; i++;
  A_Language[i] = 'Cancel transfer'; var C_CancelTransfer=i; i++;
  A_Language[i] = 'Fill cargos'; var C_FillShip=i; i++;
  A_Language[i] = 'unsaved planets have been found. You should revisit them.'; var C_UnsavedPlanets=i; i++;
  A_Language[i] = 'Fill position and speed'; var C_FillCoordinatesAndSpeed=i; i++;
  A_Language[i] = 'Fill resources'; var C_FillResources=i; i++;
  A_Language[i] = 'Continue'; var C_Continue=i; i++;
  // Other
  A_Language[i] = 'Execution time'; var C_RunTime=i; i++;
  A_Language[i] = 'A building that modifies the production factor has been found.\n\nDo you want to update the resources page now?'; var C_ResourcesBuildingsUC=i; i++;
  // Welcome message
  A_Language[i] = 'Welcome to the new version of \253'+C_ScriptName+'\273 (version: '+C_ScriptVersion+', build: '+C_ScriptBuild+')\n\nDutch translation : by Frutelaken\nGerman translation : by Dhu\nItalian traducion : by Fiox\nPortuguese translation : by Spac3h\nSpanish translation : by ETintos\nThanks to all beta tester.\n\n'+
  'For this version, most of the code was rewritten. It is thus recommended to launch an automatic update of pages for your account, following this message.\n\n'+
  'Just after your click on OK, the script will load the technology tree page to get the names of each construction.\n\n'+
  'To see the changes about this version, go to the section named \253DESCRIPTION DES MISES A JOUR\273 in the script (Only in french).'; var C_NewVersion=i; i++;
  A_Language[i] = 'Welcome to the new version of \253'+C_ScriptName+'\273 (version: '+C_ScriptVersion+', build: '+C_ScriptBuild+')\n\nDutch translation : by Frutelaken\nGerman translation : by Dhu\nItalian traducion : by Fiox\nPortuguese translation : by Spac3h\nSpanish translation : by ETintos\nThanks to all beta tester.\n\n'+
  'To see the changes about this version, go to the section named \253DESCRIPTION DES MISES A JOUR\273 in the script (Only in french).'; var C_NewBuild=i; i++;
}





/* RECUPERATION DES DONNEES PRINCIPALES D'OGAME
   -------------------------------------------------- */

var Divs = document.getElementsByTagName('div');
for (i = 0; i < Divs.length; i++) {
	if (Divs[i].id == 'header_top') {
    var HeaderDiv = Divs[i];
  }
  else if (Divs[i].id == 'menu') {
    var MenuDiv = Divs[i];
  }
  else if (Divs[i].id == 'content') {
    var ContentDiv = Divs[i];
  }
}

// Recuperation de l'adresse du skin
var SkinUrl = '';
var OgameCss = document.getElementsByTagName('link');
if (OgameCss) {
  for (i = 0; i < OgameCss.length; i++) {
    if (OgameCss[i].href.match('css/') == null) {
      SkinUrl = OgameCss[i].href.substr(0, OgameCss[i].href.lastIndexOf('/', OgameCss[i].href.length-1)+1);
    }
  }
}

// Adresse de base de la page
var BaseUrl = document.URL.match(/([^\?]+)/);
BaseUrl = (BaseUrl?BaseUrl[1]:'');

// Page ogame en cours
var OgamePage = document.URL.match(/page=([^\&]+)/);
OgamePage = (OgamePage?OgamePage[1]:'');
var OgameMode = document.URL.match(/mode=([^\&]+)/);
OgameMode = (OgameMode?OgameMode[1]:'');

// Presence de l'entete
var OgameHeader = true;
if (document.URL.match(/no_header=([^\&]+)/)) {
  OgameHeader = ((document.URL.match(/no_header=([^\&]+)/)[1] == '1') ? false : true);
}

var PlanetSelect = 0, PlanetSelectedIndex, Session = '';
if ((OgameHeader == true) && (HeaderDiv)) {
  PlanetSelect = HeaderDiv.getElementsByTagName('select');
  PlanetSelect = PlanetSelect[0].options;
  Session = PlanetSelect[0].value.match(/session=([^\&]+)/)[1]; // Identifiant de la session

  // Recuperation du nom, de l'identifiant et du lien de chaque planete et de la planete active
  for (i = 0; i < PlanetSelect.length; i++) {
    A_Planet[i] = new P_Planet();
    var Temp = PlanetSelect[i].firstChild.nodeValue.match(/([a-zA-Z0-9 \.\-\_\(\)]+)				  \[([0-9]{1,2}):([0-9]{1,3}):([0-9]{1,2})\]/);
    A_Planet[i].Id = PlanetSelect[i].value.match(/cp=([0-9]+)/)[1];
    A_Planet[i].Name = Temp[1];
    A_Planet[i].Galaxy = Temp[2];
    A_Planet[i].System = Temp[3];
    A_Planet[i].Planet = Temp[4];
    A_Planet[i].Url = PlanetSelect[i].value;
    if (PlanetSelect[i].selected == true) {
      PlanetSelectedIndex = i;
      A_Planet[i].Session = Session;
    }
  }
}
else if (MenuDiv) { // Si la page n'a pas d'entete
  // Recuperation de l'adresse du lien  'Ressources'
  var SearchRow = 0;
  var Table = MenuDiv.getElementsByTagName('table')[0];
  for (i = 0; i < Table.rows.length; i++) {
    var Cell = Table.rows[i].cells[0];
    var Page = Cell.innerHTML.match(/page=([^\&]+)/);
    if (Page) {
      if (Page[1] == 'suche') {
        SearchRow = i;
        break;
      }
    }
  }
  if (Table.rows[SearchRow].cells[0].innerHTML.match(/\<a/g)) {
    var Href = Table.rows[SearchRow].cells[0].getElementsByTagName('a')[0].href;
    if (Href.match(/session=([a-zA-Z0-9]+)/)) {
      Session = Href.match(/session=([a-zA-Z0-9]+)/)[1];
    }
  }
}





/* CHARGEMENT DES IDENTIFIANTS ET COUTS DE CONSTRUCTION ET DES NOMS DES CONSTRUCTIONS
   -------------------------------------------------- */

// Declaration des identifiants des differentes constructions (batiment, defense, technologie, flotte)
var A_Construction = new Array();
// Batiment
A_Construction[C_Buildings] = new Array(18);
A_Construction[C_Buildings][0] = new P_Construction(1,0,0,0,0,C_Planet);
A_Construction[C_Buildings][1] = new P_Construction(2,0,0,0,0,C_Planet);
A_Construction[C_Buildings][2] = new P_Construction(3,0,0,0,0,C_Planet);
A_Construction[C_Buildings][3] = new P_Construction(4,0,0,0,0,C_Planet);
A_Construction[C_Buildings][4] = new P_Construction(12,0,0,0,0,C_Planet,C_Buildings,2,5,C_Research,5,3);
A_Construction[C_Buildings][5] = new P_Construction(14,400,120,200,0,C_All);
A_Construction[C_Buildings][6] = new P_Construction(15,1000000,500000,100000,0,C_Planet,C_Buildings,5,10,C_Research,1,10);
A_Construction[C_Buildings][7] = new P_Construction(21,400,200,100,0,C_All,C_Buildings,5,2);
A_Construction[C_Buildings][8] = new P_Construction(22,2000,0,0,0,C_All);
A_Construction[C_Buildings][9] = new P_Construction(23,2000,1000,0,0,C_All);
A_Construction[C_Buildings][10] = new P_Construction(24,2000,2000,0,0,C_All);
A_Construction[C_Buildings][11] = new P_Construction(31,200,400,200,0,C_Planet);
A_Construction[C_Buildings][12] = new P_Construction(33,0,50000,100000,1000,C_Planet,C_Buildings,6,1,C_Research,5,12);
A_Construction[C_Buildings][13] = new P_Construction(34,20000,40000,0,0,C_Planet);
A_Construction[C_Buildings][14] = new P_Construction(44,20000,20000,1000,0,C_Planet);
A_Construction[C_Buildings][15] = new P_Construction(41,20000,40000,20000,0,C_Moon);
A_Construction[C_Buildings][16] = new P_Construction(42,20000,40000,20000,0,C_Moon);
A_Construction[C_Buildings][17] = new P_Construction(43,2000000,4000000,2000000,0,C_Moon,C_Research,6,7);
// Technologie
A_Construction[C_Research] = new Array(16);
A_Construction[C_Research][0] = new P_Construction(106,200,1000,200,0,C_Planet,C_Buildings,11,3);
A_Construction[C_Research][1] = new P_Construction(108,0,400,600,0,C_Planet,C_Buildings,11,1);
A_Construction[C_Research][2] = new P_Construction(109,800,200,0,0,C_Planet,C_Buildings,11,4);
A_Construction[C_Research][3] = new P_Construction(110,200,600,0,0,C_Planet,C_Buildings,11,6,C_Research,5,3);
A_Construction[C_Research][4] = new P_Construction(111,1000,0,0,0,C_Planet,C_Buildings,11,2);
A_Construction[C_Research][5] = new P_Construction(113,0,800,400,0,C_Planet,C_Buildings,11,1);
A_Construction[C_Research][6] = new P_Construction(114,0,4000,2000,0,C_Planet,C_Buildings,11,7,C_Research,3,5,C_Research,5,5);
A_Construction[C_Research][7] = new P_Construction(115,400,0,600,0,C_Planet,C_Buildings,11,1,C_Research,5,1);
A_Construction[C_Research][8] = new P_Construction(117,2000,4000,600,0,C_Planet,C_Buildings,11,2,C_Research,5,1);
A_Construction[C_Research][9] = new P_Construction(118,10000,20000,6000,0,C_Planet,C_Buildings,11,7,C_Research,6,3);
A_Construction[C_Research][10] = new P_Construction(120,200,100,0,0,C_Planet,C_Buildings,11,1,C_Research,5,2);
A_Construction[C_Research][11] = new P_Construction(121,1000,300,100,0,C_Planet,C_Buildings,11,4,C_Research,10,5,C_Research,5,4);
A_Construction[C_Research][12] = new P_Construction(122,2000,4000,1000,0,C_Planet,C_Buildings,11,4,C_Research,10,10,C_Research,5,8,C_Research,11,5);
A_Construction[C_Research][13] = new P_Construction(123,240000,400000,160000,0,C_Planet,C_Buildings,11,10,C_Research,1,8,C_Research,6,8);
A_Construction[C_Research][14] = new P_Construction(124,4000,8000,4000,0,C_Planet,C_Buildings,11,3,C_Research,0,4,C_Research,8,3);
A_Construction[C_Research][15] = new P_Construction(199,0,0,0,300000,C_Planet,C_Buildings,11,12);
// Flotte
A_Construction[C_Fleets] = new Array(14);
A_Construction[C_Fleets][0] = new P_Construction(202,2000,2000,0,0,C_All,C_Buildings,7,2,C_Research,7,2);
A_Construction[C_Fleets][1] = new P_Construction(203,6000,6000,0,0,C_All,C_Buildings,7,4,C_Research,7,6);
A_Construction[C_Fleets][2] = new P_Construction(204,3000,1000,0,0,C_All,C_Buildings,7,1,C_Research,7,1);
A_Construction[C_Fleets][3] = new P_Construction(205,6000,4000,0,0,C_All,C_Buildings,7,3,C_Research,8,2,C_Research,4,2);
A_Construction[C_Fleets][4] = new P_Construction(206,20000,7000,2000,0,C_All,C_Buildings,7,5,C_Research,8,4,C_Research,11,2);
A_Construction[C_Fleets][5] = new P_Construction(207,45000,15000,0,0,C_All,C_Buildings,7,7,C_Research,9,4);
A_Construction[C_Fleets][6] = new P_Construction(208,10000,20000,10000,0,C_All,C_Buildings,7,4,C_Research,8,3);
A_Construction[C_Fleets][7] = new P_Construction(209,10000,6000,2000,0,C_All,C_Buildings,7,4,C_Research,7,6,C_Research,3,2);
A_Construction[C_Fleets][8] = new P_Construction(210,0,1000,0,0,C_All,C_Buildings,7,3,C_Research,7,3,C_Research,0,2);
A_Construction[C_Fleets][9] = new P_Construction(211,50000,25000,15000,0,C_All,C_Buildings,7,8,C_Research,8,6,C_Research,12,5);
A_Construction[C_Fleets][10] = new P_Construction(212,0,2000,500,0,C_All,C_Buildings,7,1);
A_Construction[C_Fleets][11] = new P_Construction(213,60000,50000,15000,0,C_All,C_Buildings,7,9,C_Research,9,6,C_Research,6,5);
A_Construction[C_Fleets][12] = new P_Construction(214,5000000,4000000,1000000,0,C_All,C_Buildings,7,12,C_Research,9,7,C_Research,6,6,C_Research,15,1);
A_Construction[C_Fleets][13] = new P_Construction(215,30000,40000,15000,0,C_All,C_Buildings,7,8,C_Research,9,5,C_Research,6,5,C_Research,10,12);
// Defense
A_Construction[C_Defenses] = new Array(10);
A_Construction[C_Defenses][0] = new P_Construction(401,2000,0,0,0,C_All,C_Buildings,7,1);
A_Construction[C_Defenses][1] = new P_Construction(402,1500,500,0,0,C_All,C_Buildings,7,2,C_Research,5,1,C_Research,10,3);
A_Construction[C_Defenses][2] = new P_Construction(403,6000,2000,0,0,C_All,C_Buildings,7,4,C_Research,5,3,C_Research,10,6);
A_Construction[C_Defenses][3] = new P_Construction(404,20000,15000,2000,0,C_All,C_Buildings,7,6,C_Research,5,6,C_Research,2,3,C_Research,3,1);
A_Construction[C_Defenses][4] = new P_Construction(405,2000,6000,0,0,C_All,C_Buildings,7,4,C_Research,11,4);
A_Construction[C_Defenses][5] = new P_Construction(406,50000,50000,30000,0,C_All,C_Buildings,7,8,C_Research,12,7);
A_Construction[C_Defenses][6] = new P_Construction(407,10000,10000,0,0,C_All,C_Buildings,7,1,C_Research,3,2);
A_Construction[C_Defenses][7] = new P_Construction(408,50000,50000,0,0,C_All,C_Buildings,7,6,C_Research,3,6);
A_Construction[C_Defenses][8] = new P_Construction(502,8000,0,2000,0,C_All,C_Buildings,7,1,C_Buildings,14,2);
A_Construction[C_Defenses][9] = new P_Construction(503,12500,2500,10000,0,C_All,C_Buildings,7,1,C_Buildings,14,4);





/* CHARGEMENT DES INFORMATIONS MEMORISEES VIA GREASEMONKEY
   -------------------------------------------------- */

try {

  // Recherche de l'identifiant du compte
  Get = GM_getValue('OT_Account', '');
  var Account = 0, AccountNb = 0;
  var AccountFound = false;
  var A_AccountTmp = new Array();
  if (Get.length > 0) {
    var A_AccountTmp = Get.split(Separator);
    var A_AccountTmp2 = new Array();
    for (i = 0; i < A_AccountTmp.length; i++) {
      A_AccountTmp2 = A_AccountTmp[i].split(/\;/g);
      if (parseInt(A_AccountTmp2[0]) > 0) {
        A_Account[AccountNb] = new Array(A_AccountTmp2.length);
        for (j = 0; j < A_AccountTmp2.length; j++) {
          A_Account[AccountNb][j] = A_AccountTmp2[j];
          if (AccountFound == false) {
            if (OgamePage != 'galaxy') {
              for (k = 0; k < PlanetSelect.length; k++) {
                if (A_Planet[k].Id == A_Account[AccountNb][j]) {
                  AccountFound = true;
                  Account = AccountNb;
                  break;
                }
              }
            }
          }
        }
        AccountNb++;
      }
    }
  }
  if (AccountFound == false) {
    if (A_Account.length > 0) {
      Account = A_Account.length;
    }
    A_Account[Account] = new Array(PlanetSelect.length);
    for (i = 0; i < PlanetSelect.length; i++) {
      A_Account[Account][i] = A_Planet[i].Id;
    }
  }
  SaveAccount();
  
  // Informations de la version
  Get = GM_getValue('OT_'+Account+'_Version', '');
  var ScriptVersion = GetValue(Get, 'Version', '');
  var ScriptBuild = GetValue(Get, 'Build', '');
  
  // Parametres generaux
  Get = GM_getValue('OT_'+Account+'_MainOption', '');
  var ShowInKilo = GetValue(Get, 'ShowInKilo', false);
  var ShowSecondForUpperUpdateTimeInDay = GetValue(Get, 'ShowSecondForUpperUpdateTimeInDay', false);
  var DeleteOfficerLink = GetValue(Get, 'DeleteOfficerLink', true);
  var DeleteTraderLink = GetValue(Get, 'DeleteTraderLink', true);
  var SortMember = GetValue(Get, 'SortMember', 3); // 0:Coordonnees, 1:Nom, 2:Statut, 3:Points, 4:Adhesion, 5:En ligne
  var SortOrder = GetValue(Get, 'SortOrder', 1); // 0:Croissant, 1:Decroissant
  var AddToolTip = GetValue(Get, 'AddToolTip', true);
  var ShowRequestToUpdateResourcesPage = GetValue(Get, 'ShowRequestToUpdateResourcesPage', false);
  var ShowAutoUpdate = GetValue(Get, 'ShowAutoUpdate', true);
  var UseRandomUpdateTime = GetValue(Get, 'UseRandomUpdateTime', true);
  var AddImageVersion = GetValue(Get, 'AddImageVersion', false);
  Debug = GetValue(Get, 'Debug', false);
  
  // Parametres d'affichage
  Get = GM_getValue('OT_'+Account+'_ScreenOption', '');
  var ShowHeaderPlanetList = GetValue(Get, 'ShowHeaderPlanetList', false); 
  var ShowHeaderResourcesList = GetValue(Get, 'ShowHeaderResourcesList', false); 
  var AddResourcesTotal = GetValue(Get, 'AddResourcesTotal', false); 
  var ChangeHeaderPosition = GetValue(Get, 'ChangeHeaderPosition', false); 
  var HeaderPosition = GetValue(Get, 'HeaderPosition', 'left: 15% !important; top: 120px !important;'); 
  var ChangeContentPosition = GetValue(Get, 'ChangeContentPosition', false); 
  var ContentPosition = GetValue(Get, 'ContentPosition', 'left: 100px !important;'); 
  var AddCssCode = GetValue(Get, 'AddCssCode', false); 
  var CssCode = GM_getValue('OT_'+Account+'_CssCode', '/* '+A_Language[C_WriteCode]+' */'); 
  var AddJSCode = GetValue(Get, 'AddJSCode', false); 
  var JSCode = GM_getValue('OT_'+Account+'_JSCode', '/* '+A_Language[C_WriteCode]+' */');
  
  // Tableau des ressources
  Get = GM_getValue('OT_'+Account+'_ResourcesTableOption', '');
  var ShowHeaderResourcesTable = GetValue(Get, 'ShowHeaderResourcesTable', true);
  var ShowPlanetName =  GetValue(Get, 'ShowPlanetName', true);
  var ShowCoordinates =  GetValue(Get, 'ShowCoordinates', false);
  var ShowTotal = GetValue(Get, 'ShowTotal', true);
  var ShowDarkMatter = GetValue(Get, 'ShowDarkMatter', true);
  var ShowTimeUpdate = GetValue(Get, 'ShowTimeUpdate', true);
  var ShowResourcesOnlyActiveSession = GetValue(Get, 'ShowResourcesOnlyActiveSession', false);
  var RealTimeResources = GetValue(Get, 'RealTimeResources', true);
  var RealTimeResourcesDelay = GetValue(Get, 'RealTimeResourcesDelay', 5);
  RealTimeResourcesDelay = ((RealTimeResourcesDelay < 1) ? 1 : RealTimeResourcesDelay);
  var HeaderSelectedPlanetStyle = GetValue(Get, 'HeaderSelectedPlanetStyle', 'background-color: #005500; background-image: none;');
  var Transparency = GetValue(Get, 'Transparency', 80);
  var A_UpdateTimeColor = new Array();
  for (i = 0; i < 10; i++) {
    A_UpdateTimeColor[i] = GetValue(Get, 'UpdateTimeColor'+i, Math.ceil((i+1)*54340+Math.pow(2580,(1+(1+i)/10))));
  }
  var PlanetOrder = GetValue(Get, 'PlanetOrder', false);
  Get = GM_getValue('OT_'+Account+'_PlanetOrder', '');
  if ((Get != '') && (parseInt(GetField(Get,0,Separator)) < 18)) {
    Get = '';
  }
  if (Get != '') {
    A_PlanetOrder = Get.split(Separator);
    var Found = false;
    for (j = 0; j < A_PlanetOrder.length; j++) {
      for (i = 0; i < PlanetSelect.length; i++) {
        if (A_PlanetOrder[j] == A_Planet[i].Id) {
          A_PlanetOrderIndex[PlanetOrderIndex] = i;
          PlanetOrderIndex++;
        }
      }
    }
    if (A_PlanetOrderIndex.length < PlanetSelect.length) {
      for (i = 0; i < PlanetSelect.length; i++) {
        Found = false;
        for (j = 0; j < A_PlanetOrder.length; j++) {
          if (A_PlanetOrder[j] == A_Planet[i].Id) {
            Found = true;
          }
        }
        if (Found == false) {
          A_PlanetOrderIndex[PlanetOrderIndex] = i;
          PlanetOrderIndex++;
          A_PlanetOrder[A_PlanetOrder.length] = A_Planet[i].Id;
        }
      }
    }
  }
  else {
    for (i = 0; i < PlanetSelect.length; i++) {
      A_PlanetOrderIndex[i] = i;
      A_PlanetOrder[i] = A_Planet[i].Id;
    }
  }
  // Reorganisation de l'ordre des planetes
  if (PlanetOrder == true) {
    var A_Permut = new Array();
    for (i = 0; i < PlanetSelect.length; i++) {
      A_Permut[i] = new P_Planet();
      A_Permut[i].Id = A_Planet[A_PlanetOrderIndex[i]].Id;
      A_Permut[i].Name = A_Planet[A_PlanetOrderIndex[i]].Name;
      A_Permut[i].Planet = A_Planet[A_PlanetOrderIndex[i]].Planet;
      A_Permut[i].System = A_Planet[A_PlanetOrderIndex[i]].System;
      A_Permut[i].Galaxy = A_Planet[A_PlanetOrderIndex[i]].Galaxy;
      A_Permut[i].Url = A_Planet[A_PlanetOrderIndex[i]].Url;
      A_Permut[i].Session = A_Planet[A_PlanetOrderIndex[i]].Session;
    }
    for (i = 0; i < PlanetSelect.length; i++) {
      A_Planet[i].Id = A_Permut[i].Id;
      A_Planet[i].Name = A_Permut[i].Name;
      A_Planet[i].Planet = A_Permut[i].Planet;
      A_Planet[i].System = A_Permut[i].System;
      A_Planet[i].Galaxy = A_Permut[i].Galaxy;
      A_Planet[i].Url = A_Permut[i].Url;
      A_Planet[i].Session = A_Permut[i].Session;
    }
    for (i = 0; i < PlanetSelect.length; i++) {
      if (PlanetSelectedIndex == A_PlanetOrderIndex[i]) {
        PlanetSelectedIndex = i;
        break;
      }
    }
  }
  else {
    for (i = 0; i < PlanetSelect.length; i++) {
      A_PlanetOrderIndex[i] = i;
      A_PlanetOrder[i] = A_Planet[i].Id;
    }
  }
  
  // Empire
  Get = GM_getValue('OT_'+Account+'_EmpireOption', '');
  var ShowEmpire = GetValue(Get, 'ShowEmpire', true);
  var EmpireMenuRow = GetValue(Get, 'EmpireMenuRow', 2);
  var EmpireLinkName = GetValue(Get, 'EmpireLinkName', A_Language[C_Empire]);
  var EmpireIconSize = GetValue(Get, 'EmpireIconSize', 88);
  var UseRealTimeResourcesEmpire = GetValue(Get, 'UseRealTimeResourcesEmpire', true);
  var HideDefaultResourcesTable = GetValue(Get, 'HideDefaultResourcesTable', true);
  var ForceDisplayHeaderResourcesTableWithEmpire = GetValue(Get, 'ForceDisplayHeaderResourcesTableWithEmpire', false);
  var A_Get = new Array();
  var A_GetName = new Array();
  var A_EmpireBlock = new Array(); 
  Get = GM_getValue('OT_'+Account+'_EmpireBlock', '0;false|1;false|2;false|3;false|4;false|5;false|6;false|7;false|8;false');
  A_Get = Get.split(Separator);
  if (A_Get.length > 0) {
    for (i=0; i<A_Get.length; i++) {
      A_GetName = A_Get[i].split(/\;/g);
      if (A_GetName.length == 2) {
        A_EmpireBlock[i] = new P_EmpireBlock(parseInt(A_GetName[0]), ((A_GetName[1]=='true')?true:false));
      }
    }
  }
  
  // Transfert
  Get = GM_getValue('OT_'+Account+'_TransferOption', '');
  var UseRealTimeResources = GetValue(Get, 'UseRealTimeResources', true);
  var ForceResourcesTransferTableUpdate = GetValue(Get, 'ForceResourcesTransferTableUpdate', false);
  var ShowTransferTableIfActiveTransfer = GetValue(Get, 'ShowTransferTableIfActiveTransfer', false);
  var TransferRatioSpeed = GetValue(Get, 'TransferRatioSpeed', 1);
  
  // Ajout de lien au menu
  Get = GM_getValue('OT_'+Account+'_LinkOption', '');
  var NbLink = GetValue(Get, 'NbLink', 0);
  var LinkNameArray = new Array();
  var LinkUrlArray = new Array();
  var LinkPositionArray = new Array();
  var LinkNewWindowArray = new Array();
  var LinkTitleArray = new Array();
  for (i = 0; i < NbLink; i++) {
    LinkNameArray[i] = GetValue(Get, 'LinkName'+i, '');
    LinkUrlArray[i] = GetValue(Get, 'LinkUrl'+i, '');
    LinkPositionArray[i] = GetValue(Get, 'LinkPosition'+i, 0);
    LinkNewWindowArray[i] = GetValue(Get, 'LinkNewWindow'+i, false);
    LinkTitleArray[i] = GetValue(Get, 'LinkTitle'+i, '');
    CreateLink(LinkUrlArray[i], LinkNameArray[i], LinkPositionArray[i], LinkNewWindowArray[i], LinkTitleArray[i]); 
  }
  
  // Options de transfert
  Get = GM_getValue('OT_'+Account+'_TransferCalcOption', '');
  var CalcMode = GetValue(Get, 'CalcMode', 0);
  var UseTotalResourcesDestinationPlanet = GetValue(Get, 'UseTotalResourcesDestinationPlanet', false);
  var SameTime = GetValue(Get, 'SameTime', true);
  var TimeToGo = GetValue(Get, 'TimeToGo', 0);
  var AddRecycler = GetValue(Get, 'AddRecycler', true);
  var ShipType = GetValue(Get, 'ShipType', 1);
  
  // Affichage de la page empire
  var OgameEmpire = GM_getValue('OT_OgameEmpire', false);
}
catch(err) {
  ShowError(err, 'Load account id and update parameter');
}

if ((OgameHeader == true) && (HeaderDiv)) {
  
  try {
    
    // Parametres de mise a jour automatique
    Get = GM_getValue('OT_'+Account+'_Refresh', '');
    var RefreshPlanetRest = GetValue(Get, 'RefreshPlanetRest', 0);
    var AutoUpdateRest = GetValue(Get, 'AutoUpdateRest', 0);
    
    // Transfert
    Get = GM_getValue('OT_'+Account+'_Transfer', '');
    var TransferShow = GetValue(Get, 'Show', false);
    var TransferMetal = GetValue(Get, 'Metal', 0);
    var TransferCrystal = GetValue(Get, 'Crystal', 0);
    var TransferDeuterium = GetValue(Get, 'Deuterium', 0);
    var TransferState = GetValue(Get, 'State', false);
    var TransferShipType = GetValue(Get, 'ShipType', C_LargeCargoShip);
    var TransferDestinationPlanet = GetValue(Get, 'DestinationPlanet', 0);
    var TransferDestinationSystem = GetValue(Get, 'DestinationSystem', 0);
    var TransferDestinationGalaxy = GetValue(Get, 'DestinationGalaxy', 0);
    var TransferDestinationType = GetValue(Get, 'DestinationType', A_Language[C_Planet]);
    
    // Variable de verification du transfert
    var TransferStateCheck = true;
    
    // Nom des constructions
    var A_Get = new Array();
    var A_GetName = new Array();
    Get = GM_getValue('OT_'+Account+'_ConstructionName', '');
    A_Get = Get.split(Separator);
    if (A_Get.length > 0) {
      for (i=0; i<A_Get.length; i++) {
        A_GetName = A_Get[i].split(/\;/g);
        if (A_GetName.length == 3) {
          A_Construction[A_GetName[0]][A_GetName[1]].Name = (A_GetName[2] == 'null' ? null : A_GetName[2]);
        }
      }
    }
    
    // Liste d'action
    Get = GM_getValue('OT_'+Account+'_Actions', '');
    if (Get.length > 0) {
      A_Get = String(Get).split(Separator);
      for (i=0; i<A_Get.length; i++) {
        A_Actions[i] = A_Get[i];
      }
    }
    
    // Etat d'affichage des colonnes du tableaux de ressources
    Get = GM_getValue('OT_'+Account+'_ShowHideColumn', '');
    if (Get.length > 0) {
      A_ShowHideColomn = Get.split(Separator);
    }
    else {
      for (i = 0; i < (PlanetSelect.length+2); i++) {
        A_ShowHideColomn[i] = '';
      }
    }
    
    // Recherche
    if (((OgamePage == 'buildings') && (OgameMode == 'Forschung')) || (OgameEmpire == true) || (OgamePage == 'flotten1')) {
      
      Get = GM_getValue('OT_'+Account+'_Research', '');
      for (j = 0; j < 16; j++) {
        A_Research[j] = new P_ResearchDescription();
        A_Research[j].Level = GetValue(Get, A_Construction[C_Research][j].Id, '-');
        A_Research[j].UC = GetValue(Get, A_Construction[C_Research][j].Id+'UC', '-');
        ResearchUpdate = GetValue(Get, 'Update', CounterStart);
      }
    }
    
    // Chargement des donnees sur les planetes dans les tableaux precedement crees
    for (i = 0; i < PlanetSelect.length; i++) {
      
      // Informations generales
      Get = GM_getValue('OT_'+A_Planet[i].Id+'_Planet', '');
      if (i != PlanetSelectedIndex) {
        A_Planet[i].Session = GetValue(Get, 'Session', '');
      }
      A_Planet[i].Type = GetValue(Get, 'Type', C_Planet);
      A_Planet[i].UsedSpace = GetValue(Get, 'UsedSpace', 0);
      A_Planet[i].TotalSpace = GetValue(Get, 'TotalSpace', 0);
      A_Planet[i].Diameter = GetValue(Get, 'Diameter', 0);
      A_Planet[i].MaxTemperature = GetValue(Get, 'MaxTemperature', 0);
      A_Planet[i].MinTemperature = GetValue(Get, 'MinTemperature', 0);
      A_Planet[i].Update = GetValue(Get, 'Update', CounterStart);
      A_Planet[i].ImageUrl = GetValue(Get, 'ImageUrl', '');
      A_Planet[i].Update = GetValue(Get, 'Update', CounterStart);
      
      // Ressources de la planete
      Get = GM_getValue('OT_'+A_Planet[i].Id+'_Resources', '');
      A_Resources[i] = new P_Resources();
      if ((A_Planet[i].Session == Session) || (ShowResourcesOnlyActiveSession == false)) {
        A_Resources[i].Metal = GetValue(Get, 'Metal', '-');
        A_Resources[i].Crystal = GetValue(Get, 'Crystal', '-');
        A_Resources[i].Deuterium = GetValue(Get, 'Deuterium', '-');
        A_Resources[i].FreeEnergy = GetValue(Get, 'FreeEnergy', '-');
        A_Resources[i].TotalEnergy = GetValue(Get, 'TotalEnergy', '-');
      }
      else {
        A_Resources[i].Metal = undefined;
        A_Resources[i].Crystal = undefined;
        A_Resources[i].Deuterium = undefined;
        A_Resources[i].FreeEnergy = undefined;
        A_Resources[i].TotalEnergy = undefined;
      }
      A_Resources[i].MetalOver = GetValue(Get, 'MetalOver', false);
      A_Resources[i].CrystalOver = GetValue(Get, 'CrystalOver', false);
      A_Resources[i].DeuteriumOver = GetValue(Get, 'DeuteriumOver', false);
      A_Resources[i].EnergyOver = GetValue(Get, 'EnergyOver', false);
      A_Resources[i].Update = ((i == PlanetSelectedIndex) ? CounterStart: GetValue(Get, 'Update', CounterStart));
      
      // Production horaire de metal, cristal et deuterium
      Get = GM_getValue('OT_'+A_Planet[i].Id+'_Production', '');
      A_Production[i] = new P_Production();
      A_Production[i].Metal = GetValue(Get, 'Metal', 0);
      A_Production[i].Crystal = GetValue(Get, 'Crystal', 0);
      A_Production[i].Deuterium = GetValue(Get, 'Deuterium', 0);
      A_Production[i].MetalMax = GetValue(Get, 'MetalMax', 0);
      A_Production[i].CrystalMax = GetValue(Get, 'CrystalMax', 0);
      A_Production[i].DeuteriumMax = GetValue(Get, 'DeuteriumMax', 0);
      A_Production[i].Update = GetValue(Get, 'Update', CounterStart);
      
      // Batiment
      if ((OgamePage == 'b_building') || (OgameEmpire == true) || (AutoUpdateRest > 0)) {
        Get = GM_getValue('OT_'+A_Planet[i].Id+'_Buildings', '');
        A_Buildings[i] = new Array(18);
        for (j = 0; j < 18; j++) {
          A_Buildings[i][j] = new P_ConstructionDescription();
          A_Buildings[i][j].Level = GetValue(Get, A_Construction[C_Buildings][j].Id, '-');
          A_Buildings[i][j].UC = GetValue(Get, A_Construction[C_Buildings][j].Id+'UC', '-');
        }
        A_BuildingsUpdate[i] = GetValue(Get, 'Update', '');
      }
      
      // Ressources
      if ((OgamePage == 'resources') || (OgameEmpire == true)) {
        // Taux d'utilisation (mine de metal, cristal, deuterium, centrale solaire, fusion, satellite) 
        Get = GM_getValue('OT_'+A_Planet[i].Id+'_Pourcent', '');
        A_Pourcent[i] = new P_Pourcent();
        A_Pourcent[i].Rate = GetValue(Get, 'Rate', '-');
        A_Pourcent[i].Metal = GetValue(Get, 'Metal', '-');
        A_Pourcent[i].Crystal = GetValue(Get, 'Crystal', '-');
        A_Pourcent[i].Deuterium = GetValue(Get, 'Deuterium', '-');
        A_Pourcent[i].Solar = GetValue(Get, 'Solar', '-');
        A_Pourcent[i].Fusion = GetValue(Get, 'Fusion', '-');
        A_Pourcent[i].Ship212 = GetValue(Get, 'Ship212', '-');
        A_Pourcent[i].Update = GetValue(Get, 'Update', CounterStart);
        
      }
      
      // Defense
      if (((OgamePage == 'buildings') && (OgameMode == 'Verteidigung')) || (OgameEmpire == true)) {
        
        // Defense
        Get = GM_getValue('OT_'+A_Planet[i].Id+'_Defenses', '');
        A_Defenses[i] = new Array(10);
        for (j = 0; j < 10; j++) {
          A_Defenses[i][j] = GetValue(Get, A_Construction[C_Defenses][j].Id, '-');
        }
        A_DefensesUpdate[i] = GetValue(Get, 'Update', '');
        
        // Defense et flotte en cours de construction
        Get = GM_getValue('OT_'+A_Planet[i].Id+'_FleetsDefensesUC', '');
        A_FleetsDefensesUC[i] = new P_FleetsDefensesUC();
        A_FleetsDefensesUC[i].List = GetValue(Get, 'List', '');
        A_FleetsDefensesUC[i].Update = GetValue(Get, 'Update', '');
      }
      
      // Chantier spatial
      if (((OgamePage == 'buildings') && (OgameMode == 'Flotte')) || (OgameEmpire == true)) {
        
        // Defense et flotte en cours de construction
        Get = GM_getValue('OT_'+A_Planet[i].Id+'_FleetsDefensesUC', '');
        A_FleetsDefensesUC[i] = new P_FleetsDefensesUC();
        A_FleetsDefensesUC[i].List = GetValue(Get, 'List', '');
        A_FleetsDefensesUC[i].Update = GetValue(Get, 'Update', '');
      }
      
      if ((OgamePage == 'flotten1') || (OgamePage == 'flotten2') || (OgamePage == 'flotten3') || (OgamePage == 'flottenversand') || (OgameEmpire == true)) {
        
        // Flotte
        Get = GM_getValue('OT_'+A_Planet[i].Id+'_Fleets', '');
        A_Fleets[i] = new Array(14);
        for (j = 0; j < 14; j++) {
          A_Fleets[i][j] = GetValue(Get, A_Construction[C_Fleets][j].Id, '-');
        }
        A_FleetsUpdate[i] = GetValue(Get, 'Update', '');
        
        if (OgameEmpire == false) {
          // Transfert
          Get = GM_getValue('OT_'+A_Planet[i].Id+'_Transfer', '');
          A_Transfer[i] = new P_Transfer();
          A_Transfer[i].Checked = GetValue(Get, 'Checked', false);
          A_Transfer[i].OriginePlanet = GetValue(Get, 'OriginePlanet', 0);
          A_Transfer[i].OrigineSystem = GetValue(Get, 'OrigineSystem', 0);
          A_Transfer[i].OrigineGalaxy = GetValue(Get, 'OrigineGalaxy', 0);
          A_Transfer[i].Metal = GetValue(Get, 'Metal', 0);
          A_Transfer[i].Crystal = GetValue(Get, 'Crystal', 0);
          A_Transfer[i].Deuterium = GetValue(Get, 'Deuterium', 0);
          A_Transfer[i].Speed = GetValue(Get, 'Speed', 0);
          A_Transfer[i].TransportShip = GetValue(Get, 'TransportShip', 0);
          A_Transfer[i].Recycler = GetValue(Get, 'Recycler', 0);
          A_Transfer[i].State = GetValue(Get, 'State', 0);
          if (A_Transfer[i].Checked == true) {
            if (A_Transfer[i].State > 0) {
              TransferStateCheck = false;
            }
          }
        }
      }
    }
    if ((TransferStateCheck == true) && (OgamePage == 'flotten1') && (OgameEmpire == false)) {
      TransferState = false;
      SaveTransfer();
    }
  }
  catch(err) {
    ShowError(err, 'Load informations');
  }
}
else if (OgamePage == 'galaxy') {
  Get = GM_getValue('OT_'+Account+'_PlanetName', '');
  var A_Get = new Array();
  A_Get = Get.split(Separator);
  for (i = 0; i < A_Get.length-1; i++) {
    A_PlanetName[i] = new P_PlanetName();
    A_PlanetName[i].Name = GetField(A_Get[i], 0, KeySeparator);
    A_PlanetName[i].Id = GetField(A_Get[i], 1, KeySeparator); 
  }
  var PlanetNameSession = GetValue(Get, 'Session', '');
}





/* GESTION DES LIENS DU MENU
   -------------------------------------------------- */

function GM__setValue(Name, Value) {
  window.setTimeout(function(){GM_setValue(Name, Value);}, 0);
  return true;
}
unsafeWindow.GM__setValue = GM__setValue;

try {
  // Recuperation de la position des liens 'recherche', 'Defenses', 'Officier' et 'Marchand'
  if (MenuDiv) {
    var Table = MenuDiv.getElementsByTagName('table')[0];
    var SearchRow;
    var n=0;
    for (i = 0; i < Table.rows.length; i++) {
      var Cell = Table.rows[i].cells[0];
      var Page = Cell.innerHTML.match(/page=([^\&]+)/);
      if (Page) {
        if (Page[1] == 'suche') {
          // Creation du lien empire
          if (ShowEmpire == true) {
            // Argument ajoute pour savoir si on veut voir le menu empire
            if ((PlanetSelectedIndex != undefined) && (OgamePage != 'resources')) {
              CreateLink('', EmpireLinkName, EmpireMenuRow, false, A_Language[C_Empire]+' ('+C_ScriptName+')', 'javascript:if(GM__setValue(\'OT_OgameEmpire\',true)==true){window.location.replace(\''+A_Planet[PlanetSelectedIndex].Url+'\')};');
            }
            else {
              CreateLink('', EmpireLinkName, EmpireMenuRow, false, A_Language[C_Empire]+' ('+C_ScriptName+')', 'javascript:if(GM__setValue(\'OT_OgameEmpire\',true)==true){window.location.replace(\''+Cell.getElementsByTagName('a')[0].href+'\')};');
            }
            SearchRow = i;
            i++;
          }
          n++;
        }
        else if (Page[1] == 'buildings') {
          var Mode = Cell.innerHTML.match(/mode=([^\"]+)/); //"
          if (Mode) {
            if (Mode[1] == 'Verteidigung') {
              // Creation du lien de mise a jour automatique
              if (ShowAutoUpdate == true) {
                if (AutoUpdateRest > 0) {
                  CreateLink('', A_Language[C_StopUpdate], (i+1), false, A_Language[C_UpdateStopInformations], 'javascript:StopUpdate();');
                }
                else {
                  CreateLink('', A_Language[C_StartUpdate], (i+1), false, A_Language[C_UpdateInformations]+' ('+C_ScriptName+')', 'javascript:AutoUpdate();');
                }
                i++;
              }
              n++;
            }
          }
        }
        else if (Page[1] == 'micropayment') {
          // Suppression des liens Officiers
          if (DeleteOfficerLink == true) { RemoveOfficer(i); i--; }
          n++;
        }
        else if (Page[1] == 'trader') {
          // Suppression des liens Officiers et Marchand
          if (DeleteTraderLink == true) { RemoveTrader(i); i--; }
          n++;
        }
        else if (Page[1] == 'resources') {
          var ResourcesLink = Cell.getElementsByTagName('a')[0].href;
          n++;
        }
      }
      if (n == 5) break;
    }
  }
}
catch(err) {
  ShowError(err, 'Create empire and auto update link and delete officer and trader link');
}

function CreateLink(Link, Text, Row, NewWindow, ToolTip, Javascript) { // Ajoute un lien dans le menu
  try {
    // Verification de mots cles
    if (Link.match(/\[host\]/g)) { // Domaine
      Link = Link.replace(/\[host\]/g, Host);
    }
    if (Link.match(/\[session\]/g)) { // Session
      Link = Link.replace(/\[session\]/g, Session);
    }
    if (Link.match(/\[([a-zA-Z0-9\-\_ ]+)\]/g)) { // ID Planete
      var PlanetName = Link.match(/\[([a-zA-Z0-9\-\_ ]+)\]/g);
      PlanetName = String(PlanetName).replace(/\[/g,'').replace(/\]/g,'');
      if (OgamePage == 'galaxy') {
        var NotFind = true;
        if (PlanetNameSession == Session) {
          for (k = 0; k < A_PlanetName.length; k++) {
            if (A_PlanetName[k].Name == PlanetName) {
              var NotFind = false;
              Link = Link.replace(/\[([a-zA-Z0-9\-\_ ]+)\]/g, A_PlanetName[k].Id);
              break;
            }
          }
        }
      }
      else {
        var NotFind = true;
        for (k = 0; k < PlanetSelect.length; k++) {
          if (A_Planet[k].Name == PlanetName){
            NotFind = false;
            Link = Link.replace(/\[([a-zA-Z0-9\-\_ ]+)\]/g, A_Planet[k].Id);
            break;
          }
        }
      }
      if (NotFind == true) {
        Link = Link.replace(/\[([a-zA-Z0-9\-\_ ]+)\]/g, '');
      }
    }
    if (MenuDiv) {
      var tbody = MenuDiv.getElementsByTagName('table')[0];
      var cell = document.createElement('td');
      var hyperlink = document.createElement('a');
      if (Link != '') hyperlink.setAttribute('href',Link);
      if (AddToolTip == true) {
        if ((ToolTip != undefined) && (ToolTip != '')) { hyperlink.setAttribute('title',ToolTip); }
        else { hyperlink.setAttribute('title',Link); }
      }
      if (NewWindow == true) hyperlink.setAttribute('target','_blank');
      if ((Javascript != undefined) && (Javascript != '')) {
        hyperlink.setAttribute('onclick',Javascript);
        hyperlink.setAttribute('style','cursor:pointer');
      }
      var hyperlinkText = document.createTextNode(Text);
      hyperlink.appendChild(hyperlinkText);
      var font = document.createElement('font');
      font.setAttribute('color','#ffffff');
      font.appendChild(hyperlink);
      var div = document.createElement('div');
      div.setAttribute('align','center');
      div.appendChild(font);
      cell.appendChild(div);
      if (Row) {
        tbody.insertRow(Row);
        tbody.rows[Row].appendChild(cell);
      }
    }
  }
  catch(err) {
    ShowError(err, 'CreateLink('+Link+', '+Text+', '+Row+', '+NewWindow+', '+ToolTip+', '+Javascript+')');
  }
}

function RemoveOfficer(OfficerRow) { // Enleve les liens officiers
  try {
    if((OgameHeader == true) && (HeaderDiv)) {
      var SelectTable = HeaderDiv.getElementsByTagName('select');
      if (SelectTable[4]) {
        SelectTable[4].deleteRow(0); // Icones officier
      }
    }
    if ((MenuDiv) && (OfficerRow > 0)) {
      MenuDiv.getElementsByTagName('table')[0].deleteRow(OfficerRow);
    }
    GM_addStyle('div#combox_container, table.header td[width="35"] { display:none; }');
  }
  catch(err) {
    ShowError(err, 'RemoveOfficer()');
  }
}

function RemoveTrader(TraderRow) { // Enleve le lien marchand
  try {
    if ((MenuDiv) && (TraderRow > 0)) {
      MenuDiv.getElementsByTagName('table')[0].deleteRow(TraderRow);
    }
  }
  catch(err) {
    ShowError(err, 'RemoveTrader()');
  }
}





/* FONCTIONS GENERALES
   -------------------------------------------------- */

function FormatNb(number) { // Ajoute des points tous les 3 chiffres pour une meilleure lecture
	try {
    var nNbr = String(number); 
  	var sRes = '';
  	if (nNbr.charAt(0) == '-') {
      var Sign = '-';
      var nNb = nNbr.substring(1, nNbr.length);
    }
    else {
      var Sign = '';
      var nNb = nNbr;
    }
  	if (ShowInKilo == false) { // Affiche le resultat en kilo
      for (var j, i = nNb.length - 1, j = 0; i >= 0; i--, j++)
    	sRes = nNb.charAt(i) + ((j > 0) && (j % 3 == 0)? '.': '') + sRes;
    	return Sign+sRes;
  	}
  	else {
      if (nNb.length > 3) {
        for (var j, i = nNb.length - 4, j = 0; i >= 0; i--, j++)
      	sRes = nNb.charAt(i) + ((j > 0) && (j % 3 == 0)? '.': '') + sRes;
    	  return Sign+sRes+'k';
    	}
    	else {
        return Sign+nNb;
      }
    }
  }
  catch(err) {
    ShowError(err, 'FormatNb()');
  }
}

function SortNumber(a,b) { // Pour specifier que le tri est numerique et pas alphabetique
  return a-b;
}

function RSet(string, length, character) { // Ajoute X caractere a gauche pour avoir la longueur voulu
  try {
    string = new String(string); // Pour etre que c'est bien un string
    if (string.length >= length) {
      return string;
    }
    else if (character.length == 1) {
      for (var i = 0; i < (length-string.length+1); i++) {
        string = character+string;
      }
      return string;
    }
  }
  catch(err) {
    ShowError(err, 'RSet()');
  }
}

function GetField(String, Index, SeparatorKey) {
  if (String.length > 0) {
    var A_Get = new Array();
    A_Get = String.split(SeparatorKey);
    if (A_Get.length > Index) {
      return A_Get[Index];
    }
  }
  return '';
}

function FormatTime(time, ReturnArrivalDate) { // Mis en forme une duree en millisecondes
  try {
    if ((ReturnArrivalDate == undefined) || (ReturnArrivalDate == false)) {
      var day = 0;
      var hour = 0;
      var min = 0;
      var sec = 0;
      
      day = Math.floor(time/86400000);
      hour = Math.floor((time-(day*86400000))/3600000);
      min = Math.floor((time-(day*86400000)-(hour*3600000))/60000);
      sec = Math.floor((time-(day*86400000)-(hour*3600000)-(min*60000))/1000);
      
      if (time >  86399999) { // >= 1 jour  
        if (ShowSecondForUpperUpdateTimeInDay == true) {
          return day+A_Language[C_DayAbbreviation]+','+hour+A_Language[C_HourAbbreviation]+':'+RSet(min, 2, '0')+A_Language[C_MinuteAbbreviation]+':'+RSet(sec, 2, '0')+A_Language[C_SecondAbbreviation];
        }
        else {
          return day+A_Language[C_DayAbbreviation]+','+hour+A_Language[C_HourAbbreviation]+':'+RSet(min, 2, '0')+A_Language[C_MinuteAbbreviation];
        }
      }
      else if (time > 3599999) { // >= 1 heure
        return hour+A_Language[C_HourAbbreviation]+':'+RSet(min, 2, '0')+A_Language[C_MinuteAbbreviation]+':'+RSet(sec, 2, '0')+A_Language[C_SecondAbbreviation];
      }
      else if (time > 59999) { // >= 1 minute
        return min+A_Language[C_MinuteAbbreviation]+':'+RSet(sec, 2, '0')+A_Language[C_SecondAbbreviation];
      }
      else if (time > 999) { // >= 1 seconde
        return sec+A_Language[C_SecondAbbreviation];
      }
      else if (time >= 0) { // < 1 seconde
        return '0'+A_Language[C_SecondAbbreviation];
      }
      else {
        return '';
      }
    }
    else {
      if (time > 0) {
        var date = new Date();
        date.setTime(date.getTime()+time);
        return String(date.getHours())+':'+RSet(String(date.getMinutes()),2,'0')+' '+String(date.getDate())+'/'+RSet(String(date.getMonth()+1),2,'0')+'/'+RSet(String(date.getYear()).substr(1,2),2,'0');
      }
      else if (time == 0) {
        return '0'+A_Language[C_SecondAbbreviation];
      }
      else {
        return '';
      }
    }
  }
  catch(err) {
    ShowError(err, 'FormatTime()');
  }
}

function CreateClipboard() {
  if(!window.clipboardData) {
		window.clipboardData = {
			setData : function(mode,content) {
				var clipboard = document.body;
				var flashclipboard = clipboard.flashclipboard;
				if(flashclipboard == null){
					flashclipboard = document.createElement("div");
					clipboard.flashclipboard = flashclipboard;
					clipboard.appendChild(flashclipboard);
				}
				flashclipboard.innerHTML = '<embed src="'+C_Server+'clipboard.swf" FlashVars="clipboard='+encodeURIComponent(content)+'" width="0" height="0" type="application/x-shockwave-flash"></embed>';
			}
		}
	}
}
unsafeWindow.CreateClipboard = CreateClipboard;

function SetClipboard(Text) {
  if (!document.getElementsByTagName('embed').length) {
    CreateClipboard();
  }
  if (window.clipboardData)
  window.clipboardData.setData('text',Text);
}
unsafeWindow.SetClipboard = SetClipboard;

function Trim(Text) {
  return Text.replace(/^\s+/g,'').replace(/\s+$/g,'');
}





/* FONCTIONS ET DECLARATIONS GENERALES DU SCRIPT
   ---------------------------------------------------*/

function ShowError(Err, Block) {
  if (Debug == true) {
    var Error = 'Script : \''+C_ScriptName+'\',Version : '+C_ScriptVersion+' '+C_ScriptBuild+'\n\n'; 
    Error += 'Block: ' + Block + '\n\n';
    Error += 'Name: ' + Err.name + '\n';
    Error += 'Description: ' + Err.message + '\n';
    Error += 'Line number: ' + Err.lineNumber + '\n\n';
    if (DebugAdvanced == true) {
      Error += 'File name:\n' + Err.fileName + '\n\n';
      Error += 'Constructor:\n' + Err.constructor + '\n\n';
      Error += 'Stack:\n' + (Err.stack||'') + '\n\n';
    }
    Error += 'Click OK to continue.\n';
    alert(Error);
  }
  return true;
}

function SaveAccount() {
  var Value = '';
  for (i = 0; i < A_Account.length; i++) {
    for (j = 0; j < A_Account[i].length; j++) {
      Value += A_Account[i][j]+';';
    }
    Value = Value.substr(0,Value.length-1)+'|';
  }
  GM_setValue('OT_Account', Value.substr(0,Value.length-1));
}

function ScriptShowHide(Id, TitleId, Title) {
  var DivId = document.getElementById(Id);
  var SpanTitleId = document.getElementById(TitleId);
  if (DivId.style.display == 'none') {
    DivId.style.display = '';
    SpanTitleId.innerHTML = Title+'&nbsp;&nbsp;&nbsp;<img src="'+C_ImgUp+'" alt="'+A_Language[C_RollUp]+'" '+((AddToolTip == true)?'title="'+A_Language[C_RollUp]+'"':'')+'>';
  }
  else {
    DivId.style.display = 'none';
    SpanTitleId.innerHTML = Title+'&nbsp;&nbsp;&nbsp;<img src="'+C_ImgDown+'" alt="'+A_Language[C_Unfold]+'" '+((AddToolTip == true)?'title="'+A_Language[C_Unfold]+'"':'')+'>';
  }
}
unsafeWindow.ScriptShowHide = ScriptShowHide;

function GMsetValue(Name, Value) {
  window.setTimeout(function(){GM_setValue(Name, Value);}, 0);
}
unsafeWindow.GMsetValue = GMsetValue;

function GMsetRefreshValue(RPR,AUR) {
  GMsetValue('OT_'+Account+'_Refresh', 'RefreshPlanetRest='+RPR+'|AutoUpdateRest='+AUR);
}
unsafeWindow.GMsetRefreshValue = GMsetRefreshValue;

function GetValue(GMValue, Key, DefaultValue) {
  try {
    var Value = '';
    if (GMValue.length > 0) {
      var A_GetGM = GMValue.split(Separator);
      if (A_GetGM.length > 0) {
        for (var k = 0; k < A_GetGM.length; k++) {
          var A_GetGMKey = A_GetGM[k].split(KeySeparator);
          if (A_GetGMKey[0] == Key) {
            Value = '';
            if (A_GetGMKey.length > 2) {
              for (var l = 1; l < A_GetGMKey.length; l++) {
                Value += A_GetGMKey[l]+'=';
              }
              Value = Value.substr(0, Value.length-1);
            }
            else {
              Value = A_GetGMKey[1];
            }
            if ((Value == 'true') || (Value == 'false')) {
              return eval(Value);
            }
            else if (Value) {
              return Value;
            }
          }
        }
      }
    }
    return DefaultValue;
  }
  catch(err) {
    ShowError(err, 'GetValue()');
  }
}

function PlanetTimeUpdate(PlanetIndex, TimeInMillisecond, Color) { // Renvoie la class en fonction du temps depuis la derniere mise a jour
  try {
    if (A_Planet[PlanetIndex].Session == Session) {
      var TimeUpdate = A_Resources[PlanetIndex].Update;
      var GTime = new Date();
      var CurrentTime = GTime.getTime();
      if (TimeInMillisecond == false) {
        if ((CurrentTime-TimeUpdate) < A_UpdateTimeColor[0]) {
          return ((Color)?'#00FF00':'Time0');
        }
        else if ((CurrentTime-TimeUpdate) < A_UpdateTimeColor[1]) {
          return ((Color)?'#33FF00':'Time1');
        }
        else if ((CurrentTime-TimeUpdate) < A_UpdateTimeColor[2]) {
          return ((Color)?'#66FF00':'Time2');
        }
        else if ((CurrentTime-TimeUpdate) < A_UpdateTimeColor[3]) {
          return ((Color)?'#99FF00':'Time3');
        }
        else if ((CurrentTime-TimeUpdate) < A_UpdateTimeColor[4]) {
          return ((Color)?'#CCFF00':'Time4');
        }
        else if ((CurrentTime-TimeUpdate) < A_UpdateTimeColor[5]) {
          return ((Color)?'#FFFF00':'Time5');
        }
        else if ((CurrentTime-TimeUpdate) < A_UpdateTimeColor[6]) {
          return ((Color)?'#FFCC00':'Time6');
        }
        else if ((CurrentTime-TimeUpdate) < A_UpdateTimeColor[7]) {
          return ((Color)?'#FF9900':'Time7');
        }
        else if ((CurrentTime-TimeUpdate) < A_UpdateTimeColor[8]) {
          return ((Color)?'#FF6600':'Time8');
        }
        else if ((CurrentTime-TimeUpdate) < A_UpdateTimeColor[9]) {
          return ((Color)?'#FF3300':'Time9');
        }
        else {
          return ((Color)?'#FF0000':'Time10');
        }
      }
      else {
        return CurrentTime-TimeUpdate;
      }
    }
    if (TimeInMillisecond == false) {
      return ((Color)?'#00FFFF':'TimeOut');
    }
    else {
      return -1;
    }
  }
  catch(err) {
    ShowError(err, 'PlanetTimeUpdate('+PlanetIndex+', '+TimeInMillisecond+', '+Color+')');
  }
}

function ResourcesOver(PlanetIndex, Resource) { // Renvoie la class en fonction de l'etat des reservoirs et de l'energie (ok, sur-capacite, manque)
  try {
    // Resource=0 -> Metal, Resource=1 -> Cristal, Resource=2 -> Deuterium, Resource=3 -> Energie
    if (A_Planet[PlanetIndex].Type == C_Planet) {
      if (Resource == 0) { // Metal
        if (A_Resources[PlanetIndex].MetalOver == true) {
          return 'Over';
        }
      }
      else if (Resource == 1) { // Cristal
        if (A_Resources[PlanetIndex].CrystalOver == true) {
          return 'Over';
        }
      }
      else if (Resource == 2) { // Deuterium
        if (A_Resources[PlanetIndex].DeuteriumOver == true) {
          return 'Over';
        }
      }
      else { // Energie
        if (A_Resources[PlanetIndex].EnergyOver == true) {
          return 'Over';
        }
      }
    }
    return '';
  }
  catch(err) {
    ShowError(err, 'ResourcesOver('+PlanetIndex+', '+Resource+')');
  }
}

function ValidateConstructionLevel(Group, Element, Level, PlanetIndex) {
  if (Group == C_Buildings) {
    if((A_Buildings[PlanetIndex][Element].Level=='-'?0:A_Buildings[PlanetIndex][Element].Level) < Level) {
      return false;
    }
  }
  else {
    if((A_Research[Element].Level=='-'?0:A_Research[Element].Level) < Level) {
      return false;
    }
  }
  return true;
}

function ValidateBuilding(Group, Element, PlanetIndex) {
  try {
    var ErrorBuilding = '';
    if ((Group == C_Buildings) && ((A_Planet[PlanetIndex].TotalSpace-A_Planet[PlanetIndex].UsedSpace) == 0)) {
      ErrorBuilding += A_Language[C_NotEnoughFreeField]+'<br>';
    }
    else {
      if ((A_Planet[PlanetIndex].Type == C_Moon) && (A_Buildings[PlanetIndex][14].Level == 0) && (Element != 14)) {
        ErrorBuilding += A_Language[C_LunarBaseNotBuilt]+'<br>';
      }
    }
    if ((A_Construction[Group][Element].PlanetType == A_Planet[PlanetIndex].Type) || (A_Construction[Group][Element].PlanetType == C_All)) {
      if (A_Construction[Group][Element].Group0 >= 0) {
        if (ValidateConstructionLevel(A_Construction[Group][Element].Group0,A_Construction[Group][Element].Element0,A_Construction[Group][Element].Level0, PlanetIndex) == false) {
          ErrorBuilding += A_Construction[A_Construction[Group][Element].Group0][A_Construction[Group][Element].Element0].Name+' '+A_Construction[Group][Element].Level0+'<br>';
        }
        if (A_Construction[Group][Element].Group1 >= 0) {
          if (ValidateConstructionLevel(A_Construction[Group][Element].Group1,A_Construction[Group][Element].Element1,A_Construction[Group][Element].Level1, PlanetIndex) == false) {
            ErrorBuilding += A_Construction[A_Construction[Group][Element].Group1][A_Construction[Group][Element].Element1].Name+' '+A_Construction[Group][Element].Level1+'<br>';
          }
          if (A_Construction[Group][Element].Group2 >= 0) {
            if (ValidateConstructionLevel(A_Construction[Group][Element].Group2,A_Construction[Group][Element].Element2,A_Construction[Group][Element].Level2, PlanetIndex) == false) {
              ErrorBuilding += A_Construction[A_Construction[Group][Element].Group2][A_Construction[Group][Element].Element2].Name+' '+A_Construction[Group][Element].Level2+'<br>';
            }
            if (A_Construction[Group][Element].Group3 >= 0) {
              if (ValidateConstructionLevel(A_Construction[Group][Element].Group3,A_Construction[Group][Element].Element3,A_Construction[Group][Element].Level3, PlanetIndex) == false) {
                ErrorBuilding += A_Construction[A_Construction[Group][Element].Group3][A_Construction[Group][Element].Element3].Name+' '+A_Construction[Group][Element].Level3+'<br>';
              }
            }
          }
        }
      }
    }
    else {
      if (A_Planet[PlanetIndex].Type == C_Planet) {
        ErrorBuilding += A_Language[C_NotOnPlanet]+'<br>';
      }
      else {
        ErrorBuilding += A_Language[C_NotOnMoon]+'<br>';
      }
    }
    return ErrorBuilding;
  }
  catch(err) {
    ShowError(err, 'ValidateBuilding('+Group+', '+Element+', '+PlanetIndex+')');
  }
}

function SaveTransfer(TransferShowTmp) {
  var Value = 'Show='+((TransferShowTmp != undefined)?eval(TransferShowTmp):TransferShow)+
  '|Metal='+TransferMetal+
  '|Crystal='+TransferCrystal+
  '|Deuterium='+TransferDeuterium+
  '|State='+TransferState+
  '|ShipType='+TransferShipType+
  '|DestinationPlanet='+TransferDestinationPlanet+
  '|DestinationSystem='+TransferDestinationSystem+
  '|DestinationGalaxy='+TransferDestinationGalaxy+
  '|DestinationType='+TransferDestinationType;
  GMsetValue('OT_'+Account+'_Transfer', Value);
}
unsafeWindow.SaveTransfer = SaveTransfer;

function SaveEmpireBlock() {
  try {
    var Value = '';
    for (i = 0; i < A_EmpireBlock.length; i++) {
      Value += A_EmpireBlock[i].Order+';'+A_EmpireBlock[i].Hide+'|';
    }
    GMsetValue('OT_'+Account+'_EmpireBlock', Value.substr(0,Value.length-1));
  }
  catch(err) {
    ShowError(err, 'SaveEmpireBlock()');
  }
}
unsafeWindow.SaveEmpireBlock = SaveEmpireBlock;

function AddAction(Action) {
  try {
    A_Actions[A_Actions.length] = Action.replace(/\|/g, '\'');
    Action = '';
    for (var k = 0; k < A_Actions.length; k++) {
      Action += A_Actions[k]+'|';
    }
    Action = Action.substr(0, Action.length-1);
    GMsetValue('OT_'+Account+'_Actions', Action);
  }
  catch(err) {
    ShowError(err, 'AddAction('+Action+')');
  }
}
unsafeWindow.AddAction = AddAction;





/* DETECTION DE LA VERSION DU SCRIPT PRECEDEMMENT INSTALLE
   -------------------------------------------------- */

if (((ScriptVersion != C_ScriptVersion) || (ScriptBuild != C_ScriptBuild)) && (Session) && (OgameHeader == true) && (HeaderDiv)) {
  try {
    // Affichage du non support du domaine ogame
    if (SupportedExtension == false) {
      alert(C_ScriptName+' doesn\'t support \253'+OgameExtension+'\273 ogame domain.\n'+
      'If you have some time to spend ;), you can translate this script.\n\n'+
      'Thanks in advance.\n\n'+
      'If you want some help, you can contact me through this page:\n'+
      'http://userscripts.org/scripts/show/23500\nOr:\n'+
      'http://lggillou.vbc3.com/poster.php\n\n'+
      'This ogame domain being unsupported, the english language will be used by default,\n'+
      'So errors will occur because some functions require a translation.');
    }
    // Sauvegarde de la version
    GM_setValue('OT_'+Account+'_Version', 'Version='+C_ScriptVersion+'|Build='+C_ScriptBuild);
    var Script; if (ScriptVersion) Script = ScriptVersion.match(/([\d\.]+)/)[1];
    if (Script != C_ScriptVersion.match(/([\d\.]+)/)[1]) {
      alert(A_Language[C_NewVersion]);
      window.setTimeout('window.location.replace(\'/game/index.php?page=techtree&session='+Session+'\')', 100);
    }
    else {
      alert(A_Language[C_NewBuild]);
      var Build = parseInt(ScriptBuild.match(/([0]{0,2})([\d]{1,3})/)[2]);
      if (Build < 9) {
        if (confirm('This update calculates the real-time resources by taking into account the capacity of storages and tanks.\nDo you want to update resources pages now so that this function is operational?') == true) {
          AddAction('RefreshPlanet()')
          window.setTimeout('window.location.replace(\'/game/index.php?page=resources&session='+Session+'\')', 100);
        }
      }
      else if (Build < 13) {
        alert('This build fix an account management bug.\n\nIt is possible that your settings will be reset if you have more than one ogame account.\n\nSorry for inconveniences.');
        window.setTimeout('window.location.replace(\'/game/index.php?page=techtree&session='+Session+'\')', 100);
      }
      else if (Build < 15) {
        alert('This build fix an incompatibility.\n\nTechnology page will be refresh after click on OK');
        window.setTimeout('window.location.replace(\'/game/index.php?page=techtree&session='+Session+'\')', 100);
      }
    }
  }
  catch(err) {
    ShowError(err, 'Check version');
  }
}




/* TOUTES LA PAGES : RECUPERATION DES RESSOURCES DE LA PLANETE ET DES NOMS DES PLANETES
   -------------------------------------------------- */

// Sauvegarde des donnees de la planete active
function SavePlanetResources(PlanetIndex) {
  var GTime = new Date();
  var Value = 'Session='+Session+
  '|Metal='+A_Resources[PlanetIndex].Metal+
  '|Crystal='+A_Resources[PlanetIndex].Crystal+
  '|Deuterium='+A_Resources[PlanetIndex].Deuterium+
  '|FreeEnergy='+A_Resources[PlanetIndex].FreeEnergy+
  '|TotalEnergy='+A_Resources[PlanetIndex].TotalEnergy+
  '|MetalOver='+A_Resources[PlanetIndex].MetalOver+
  '|CrystalOver='+A_Resources[PlanetIndex].CrystalOver+
  '|DeuteriumOver='+A_Resources[PlanetIndex].DeuteriumOver+
  '|EnergyOver='+A_Resources[PlanetIndex].EnergyOver+
  '|Update='+GTime.getTime();
  GM_setValue('OT_'+A_Planet[PlanetIndex].Id+'_Resources', Value);
  A_Resources[PlanetIndex].Update = GTime.getTime();
}

function SavePlanetName() {
  var Value = '';
  for (i = 0; i < (PlanetSelect.length); i++) {
    Value += A_Planet[i].Name+'='+A_Planet[i].Id+'|';
  }
  Value += 'Session='+Session;
  GM_setValue('OT_'+Account+'_PlanetName', Value);
}

if ((OgameHeader == true) && (HeaderDiv)) {
  try {
    // Recuperation des ressources et energie en stock
    var ResourcesTable = document.getElementById('resources');
    var ResourcesFont = ResourcesTable.getElementsByTagName('font');
    A_Resources[PlanetSelectedIndex].Metal = ResourcesFont[5].innerHTML.replace(/\./g,'');
    A_Resources[PlanetSelectedIndex].Crystal = ResourcesFont[6].innerHTML.replace(/\./g,'');
    A_Resources[PlanetSelectedIndex].Deuterium = ResourcesFont[7].innerHTML.replace(/\./g,'');
    var DarkMatter = ResourcesFont[8].innerHTML.replace(/\./g,'');
    var ResourcesTd = ResourcesTable.getElementsByTagName('td');
    var Energy = ResourcesTd[14].innerHTML.replace('<font >','').replace('<font>','').replace('<font color="'+ResourcesFont[9].color+'">','').replace('</font>','');
    A_Resources[PlanetSelectedIndex].FreeEnergy = Energy.substring(0, Energy.indexOf('/')).replace(/\./g,'');
    A_Resources[PlanetSelectedIndex].TotalEnergy = Energy.substring((Energy.indexOf('/')+1), (Energy.length)).replace(/\./g,'');
    
    // Verification ressources en surplus par rapport au reservoir et manque d'energie
    A_Resources[PlanetSelectedIndex].MetalOver = false;
    A_Resources[PlanetSelectedIndex].CrystalOver = false;
    A_Resources[PlanetSelectedIndex].DeuteriumOver = false;
    A_Resources[PlanetSelectedIndex].EnergyOver = false;
    if (ResourcesFont[5].color == '#ff0000') { A_Resources[PlanetSelectedIndex].MetalOver = true; }
    if (ResourcesFont[6].color == '#ff0000') { A_Resources[PlanetSelectedIndex].CrystalOver = true; }
    if (ResourcesFont[7].color == '#ff0000') { A_Resources[PlanetSelectedIndex].DeuteriumOver = true; }
    if (ResourcesFont[9].color == '#ff0000') { A_Resources[PlanetSelectedIndex].EnergyOver = true; }
    
    // Sauvegarde des donnees recuperees pour la planete en cours
    SavePlanetResources(PlanetSelectedIndex);
    SavePlanetName();
    SavePlanetInformations(PlanetSelectedIndex);
  }
  catch(err) {
    ShowError(err, 'Get metal, crystal, deuterium and energy resources value');
  }
}





/* PAGE GENERALE (Recuperation des donnees et memorisation via GreaseMonkey)
   -------------------------------------------------- */

function SavePlanetInformations(PlanetIndex) {
  var GTime = new Date();
  if (A_Planet[PlanetIndex].Type == C_Moon) {
    A_Planet[PlanetIndex].ImageUrl = SkinUrl+'planeten/mond.jpg';
  }
  var Value = 'Session='+A_Planet[PlanetIndex].Session+
  '|Type='+A_Planet[PlanetIndex].Type+
  '|UsedSpace='+A_Planet[PlanetIndex].UsedSpace+
  '|TotalSpace='+A_Planet[PlanetIndex].TotalSpace+
  '|Diameter='+A_Planet[PlanetIndex].Diameter+
  '|MaxTemperature='+A_Planet[PlanetIndex].MaxTemperature+
  '|MinTemperature='+A_Planet[PlanetIndex].MinTemperature+
  '|ImageUrl='+A_Planet[PlanetIndex].ImageUrl+
  '|Update='+((PlanetSelectedIndex==PlanetIndex)?GTime.getTime():A_Planet[PlanetIndex].Update);
  GM_setValue('OT_'+A_Planet[PlanetIndex].Id+'_Planet', Value);
  if (PlanetSelectedIndex==PlanetIndex) A_Planet[PlanetIndex].Update=GTime.getTime();
}

if (OgamePage == 'overview') {

  try {
    var link = '';
    var Space = '';
    var Temp = '';
    if (ContentDiv) {
      var Table = ContentDiv.getElementsByTagName('table');
      for (j = 0; j < Table.length;j++){
        for (var k = 0; k < Table[j].rows.length; k++) {
          var cell = Table[j].rows[k].cells[0].textContent;
          if ((cell.match(A_Language[C_Planet]+' ') || cell.match(A_Language[C_Moon]+' ')) && (Trim(cell) != A_Language[C_Moon])) {
            
            // Recuperation du type de colonie (planete ou lune)
            if (cell.match(A_Language[C_Planet]+' ')) {
              A_Planet[PlanetSelectedIndex].Type = C_Planet;
            }
            else {
              A_Planet[PlanetSelectedIndex].Type = C_Moon;
            }
            
            // Recuperation de l'adresse de l'image de planete en cours
            var Img = Table[j].getElementsByTagName('img')[0].src;
            if (Img.match('planeten') && A_Planet[PlanetSelectedIndex].Type == C_Planet) {
              A_Planet[PlanetSelectedIndex].ImageUrl = Img.replace(/planeten\//g, 'planeten/small/s_');
            }
            if (A_Planet[PlanetSelectedIndex].ImageUrl.match('mond')) {
              var Img = Table[j].getElementsByTagName('img')[1].src;
              if (Img.match('planeten') && A_Planet[PlanetSelectedIndex].Type == C_Planet) {
                A_Planet[PlanetSelectedIndex].ImageUrl = Img.replace(/planeten\//g, 'planeten/small/s_');
              }
              else {
                A_Planet[PlanetSelectedIndex].ImageUrl = '';
              }
            }
            
            // Recuperation de l'adresse des images des autres planetes
            var ImgTable = Table[j].getElementsByTagName('table')[0];
            for (var r = 0; r < ImgTable.rows.length; r++) {
              for (var c = 0; c < ImgTable.rows[r].cells.length; c++) {
                var cell = ImgTable.rows[r].cells[c];
                if (cell.getElementsByTagName('a')[0]) {                
                  link = cell.getElementsByTagName('a')[0].href;
                  link = link.match(/cp=([0-9]+)/);                  
                  if (link) {
                    for (i = 0; i < PlanetSelect.length; i++) {
                      if (A_Planet[i].Id == link[1]) {
                        Img = cell.getElementsByTagName('img')[0].src;
                        if (Img.match('planeten')) {
                          A_Planet[i].ImageUrl = Img;
                        }
                      }
                    }
                  }
                }
              }
            }
          }
          // Recuperation du nombre de cases (utilisees et total) et du diametre
          else if (cell.match(A_Language[C_Diameter])) {
            var cell = Table[j].rows[k].cells[1];
            Space = cell.textContent.match(/([0-9\.]+)([a-zA-Z \(]+)([0-9]+)([ \/]+)([0-9]+)/);
            if (Space) {
              A_Planet[PlanetSelectedIndex].Diameter = Space[1].replace('.', '');
              A_Planet[PlanetSelectedIndex].UsedSpace = Space[3];
              A_Planet[PlanetSelectedIndex].TotalSpace = Space[5];
            }
          }
          // Recuperation de la temperature (minimum et maximum)
          else if (cell.match(A_Language[C_Temperature])) {
            var cell = Table[j].rows[k].cells[1];
            Temp = cell.textContent.match(/([a-zA-Z\. ]+)([0-9\-]+)([a-zA-Z\260\340 ]+)([0-9\-]+)/);
            if (Temp) {
              A_Planet[PlanetSelectedIndex].MinTemperature = Temp[2];
              A_Planet[PlanetSelectedIndex].MaxTemperature = Temp[4];
            }
            break;
          }
        }
        break;
      }
      for (i = 0; i < PlanetSelect.length; i++) {
        SavePlanetInformations(i);
      }
    }
  }
  catch(err) {
    ShowError(err, 'Get informations from overview page');
  }
}





/* PAGE DES PRE-REQUIS DE CONSTRUCTION (Recuperation des donnees et memorisation via GreaseMonkey)
   -------------------------------------------------- */

function SaveConstructionName() {
  var Value = '';
  for (i = 0; i < A_Construction.length; i++) {
    for (j = 0; j < A_Construction[i].length; j++) {
      Value += i+';'+j+';'+A_Construction[i][j].Name+'|';
    }
  }
  GM_setValue('OT_'+Account+'_ConstructionName', Value.substr(0,Value.length-1));
}

if (OgamePage == 'techtree') {
  try {
    if (ContentDiv) {
      var Table = ContentDiv.getElementsByTagName('table');
      var Group = C_Buildings;
      var SpecialBuildings = 0;
      var i = 0;
      for (var n = 0; n < Table.length; n++) {
        var ResTable = Table[n];
        var RowContent = ResTable.rows[0].cells[1].textContent.replace(/\(/g,'').replace(/\)/g,'');
        if (RowContent.match(A_Language[C_Require].replace(/\(/g,'').replace(/\)/g,''))) {
          for (var r = 1; r < ResTable.rows.length; r++) {
            RowContent = ResTable.rows[r].cells[1].textContent.replace(/\(/g,'').replace(/\)/g,'');
            if (RowContent.match(A_Language[C_Require].replace(/\(/g,'').replace(/\)/g,''))) {
              if (Group == C_Buildings) { Group = C_Research; SpecialBuildings=i; i=0; }
              else if (Group == C_Research) { Group = C_Fleets; i=0; }
              else if (Group == C_Fleets) { Group = C_Defenses; i=0;}
              else { Group = C_Buildings; i=SpecialBuildings; }
            }
            else if (ResTable.rows[r].cells[0].getElementsByTagName('a').length > 0) {
              var gid = ResTable.rows[r].cells[0].getElementsByTagName('a')[0].href.match(/gid=([\d]{1,3})/)[1];
              var name = ResTable.rows[r].cells[0].textContent.replace(/\[i\]/g,'').replace(/\n/g,'').replace(/^\s+/g,'').replace(/\s+$/g,'');
              var NotFound = true;
              for (j = 0; j < A_Construction[Group].length; j++) {
                if (gid == A_Construction[Group][j].Id) {
                  A_Construction[Group][j].Name = name;
                  i++;
                  NotFound = false;
                  break;
                }
              }
              if (NotFound == true) {
                A_Construction[Group][i].Name = null;
              }
            }
          }
          break;
        }
      }
      SaveConstructionName();
    }
  }
  catch(err) {
    ShowError(err, 'Get construction name');
  }
}





/* PAGE RESSOURCES (Recuperation des donnees et memorisation via GreaseMonkey)
   -------------------------------------------------- */

function SavePlanetPourcent(PlanetIndex) {
  var GTime = new Date();
  var Value = 'Rate='+A_Pourcent[PlanetIndex].Rate+
  '|Metal='+A_Pourcent[PlanetIndex].Metal+
  '|Crystal='+A_Pourcent[PlanetIndex].Crystal+
  '|Deuterium='+A_Pourcent[PlanetIndex].Deuterium+
  '|Solar='+A_Pourcent[PlanetIndex].Solar+
  '|Fusion='+A_Pourcent[PlanetIndex].Fusion+
  '|Ship212='+A_Pourcent[PlanetIndex].Ship212+
  '|Update='+GTime.getTime();
  GM_setValue('OT_'+A_Planet[PlanetIndex].Id+'_Pourcent', Value);
}

function SavePlanetProduction(PlanetIndex) {
  var GTime = new Date();
  var Value = 'Metal='+A_Production[PlanetIndex].Metal+
  '|Crystal='+A_Production[PlanetIndex].Crystal+
  '|Deuterium='+A_Production[PlanetIndex].Deuterium+
  '|MetalMax='+A_Production[PlanetIndex].MetalMax+
  '|CrystalMax='+A_Production[PlanetIndex].CrystalMax+
  '|DeuteriumMax='+A_Production[PlanetIndex].DeuteriumMax+
  '|Update='+GTime.getTime();
  GM_setValue('OT_'+A_Planet[PlanetIndex].Id+'_Production', Value);
}

if (OgamePage == 'resources') {
  try {
    if (PlanetSelectedIndex) {
      // Reinitialisation des variables
      A_Pourcent[PlanetSelectedIndex].Metal = '-';
      A_Pourcent[PlanetSelectedIndex].Crystal = '-';
      A_Pourcent[PlanetSelectedIndex].Deuterium = '-';
      A_Pourcent[PlanetSelectedIndex].Solar = '-';
      A_Pourcent[PlanetSelectedIndex].Fusion = '-';
      A_Pourcent[PlanetSelectedIndex].Ship212 = '-';
      A_Production[PlanetSelectedIndex].Metal = 0;
      A_Production[PlanetSelectedIndex].Crystal = 0;
      A_Production[PlanetSelectedIndex].Deuterium = 0;
      A_Production[PlanetSelectedIndex].MetalMax = 0;
      A_Production[PlanetSelectedIndex].CrystalMax = 0;
      A_Production[PlanetSelectedIndex].DeuteriumMax = 0;
    }
    
    if (ContentDiv) {
      var NoRepeat;
      var ProductionRate = ContentDiv.innerHTML.match(A_Language[C_ProductionRate]+'([\\d\\.]+)');
      if (ProductionRate) {
        A_Pourcent[PlanetSelectedIndex].Rate = ProductionRate[1];
      }
      var Table = ContentDiv.getElementsByTagName('table');
      for (var n = 0; n < Table.length; n++) {
        var ResTable = ContentDiv.getElementsByTagName('table')[n];
        if (ResTable.rows[0].cells[0].textContent.match(A_Language[C_ResourcesTableHeader])) {
          for (var r = 0; r < ResTable.rows.length; r++) {
            if (ResTable.rows[r].cells.length > 0 && ResTable.rows[r].cells.length < 6) {
              if (ResTable.rows[r].cells[0].textContent == A_Language[C_Total]+':') {
                A_Production[PlanetSelectedIndex].Metal = ResTable.rows[r].cells[1].textContent.replace(/\./g, '');
                A_Production[PlanetSelectedIndex].Crystal = ResTable.rows[r].cells[2].textContent.replace(/\./g, '');
                A_Production[PlanetSelectedIndex].Deuterium = ResTable.rows[r].cells[3].textContent.replace(/\./g, '');
              }
            }
            else if (ResTable.rows[r].cells.length == 7 || ResTable.rows[r].cells.length == 6) {
              var cell = ResTable.rows[r].cells[0];
              var cel = 6;
              if (ResTable.rows[r].cells.length == 6) { cel = 5; } 
              if (ResTable.rows[r].cells[5].innerHTML.match('action')) {
                A_Production[PlanetSelectedIndex].MetalMax = ResTable.rows[r].cells[1].textContent.replace(/\./g, '').replace(/k/g, '');
                A_Production[PlanetSelectedIndex].CrystalMax = ResTable.rows[r].cells[2].textContent.replace(/\./g, '').replace(/k/g, '');
                A_Production[PlanetSelectedIndex].DeuteriumMax = ResTable.rows[r].cells[3].textContent.replace(/\./g, '').replace(/k/g, '');
              }
              else if (!cell.textContent.match(A_Construction[C_Fleets][10].Name)) {
                NoRepeat = -1
                for (j = 0; j < 5; j++) {
                  if (cell.textContent.match(A_Construction[C_Buildings][j].Name)) {
                    NoRepeat = j;
                  }
                }
                if (cell.textContent.match(A_Construction[C_Buildings][NoRepeat].Name)) {
                  var Options = ResTable.rows[r].cells[cel].getElementsByTagName('select')[0].options;
                  for (var i = 0; i < 11; i++) {
                    if (Options[i].selected == true) {
                      if (NoRepeat == 0) {
                        A_Pourcent[PlanetSelectedIndex].Metal = Options[i].value;
                        NoRepeat++;
                        break;
                      }
                      else if (NoRepeat == 1) {
                        A_Pourcent[PlanetSelectedIndex].Crystal = Options[i].value;
                        NoRepeat++;
                        break;
                      }
                      else if (NoRepeat == 2) {
                        A_Pourcent[PlanetSelectedIndex].Deuterium = Options[i].value;
                        NoRepeat++;
                        break;
                      }
                      else if (NoRepeat == 3) {
                        A_Pourcent[PlanetSelectedIndex].Solar = Options[i].value;
                        NoRepeat++;
                        break;
                      }
                      else if (NoRepeat == 4) {
                        A_Pourcent[PlanetSelectedIndex].Fusion = Options[i].value;
                        NoRepeat++;
                        break;
                      }
                    }
                  }
                }
              }
              else if (cell.textContent.match(A_Construction[C_Fleets][10].Name)) {
                var Options = ResTable.rows[r].cells[cel].getElementsByTagName('select')[0].options;
                for (var i = 0; i < 11; i++) {
                  if (Options[i].selected == true) {
                    A_Pourcent[PlanetSelectedIndex].Ship212 = Options[i].value;
                    NoRepeat++;
                    break;
                  }
                }
              }
            }
          }
        }
      }
      
      SavePlanetPourcent(PlanetSelectedIndex);
      SavePlanetProduction(PlanetSelectedIndex);
    }
  }
  catch(err) {
    ShowError(err, 'Get informations from resources page (Pourcent and production)');
  }
}





/* PAGE BATIMENT (Recuperation des donnees et memorisation via GreaseMonkey)
   -------------------------------------------------- */

function SavePlanetBuilding(PlanetIndex) {
  var UTime = new Date();
  var Value = '';
  for (j = 0; j < 18; j++) {
    Value += A_Construction[C_Buildings][j].Id+'='+A_Buildings[PlanetIndex][j].Level+'|'+
    A_Construction[C_Buildings][j].Id+'UC='+A_Buildings[PlanetIndex][j].UC+'|';
  }
  Value += 'Update='+UTime.getTime();
  GM_setValue('OT_'+A_Planet[PlanetIndex].Id+'_Buildings', Value);
}

if (OgamePage == 'b_building') {
  
  try {  
    var ResourcesBuildingsUC = false;
    for (i = 0; i < 18; i++) {
      if ((i < 5 ) && (A_Buildings[PlanetSelectedIndex][i].UC > 0)) {
        ResourcesBuildingsUCIndex = i;
        BuildingsUCLevel = A_Buildings[PlanetSelectedIndex][i].Level;
      }
      if (A_Planet[PlanetSelectedIndex].Type == C_Planet) {
        if (i > 14) {
          A_Buildings[PlanetSelectedIndex][i].Level = '-';
        }
        else {
          if (A_Buildings[PlanetSelectedIndex][i].Level == '') {
            A_Buildings[PlanetSelectedIndex][i].Level = 0;
          }
        }
      }
      else { // Lune
        if ((i == 5) || ((i >= 7) && (i <= 10)) || (i >= 15)) {
          if (A_Buildings[PlanetSelectedIndex][i].Level == '') {
            A_Buildings[PlanetSelectedIndex][i].Level = 0;
          }
        }
        else {
          A_Buildings[PlanetSelectedIndex][i].Level = '-';
        }
      }
      A_Buildings[PlanetSelectedIndex][i].UC = '-';
    }
      
    var Content = null;
    var Level = null;
    var Table = ContentDiv.getElementsByTagName('table')[0].getElementsByTagName('table')[0];
    
    for (var r = 0; r < Table.rows.length; r++) {
      if (Table.rows[r].cells.length > 1) {
        if (Table.rows[r].cells.length == 2) {
          var cell = Table.rows[r].cells[0];
          var build = Table.rows[r].cells[1].innerHTML.match(/modus=remove/);
        }
        else {
          var cell = Table.rows[r].cells[1];
          var build = Table.rows[r].cells[2].innerHTML.match(/modus=remove/);
        }
        Content = cell.innerHTML.match(/\>([^\<]+)\<\/a\> \(([a-zA-Z]+) ([0-9]{1,2})/);
        if (Content) {
          Level = Content[3];
        }
        else {
          Content = cell.innerHTML.match(/\>([^\<]+)\<\/a\>\</);
          if (Content) Level = 0;
        }
        if (Content) {
          for (i = 0; i < 18; i++) {
            if (Content[1] == A_Construction[C_Buildings][i].Name) {
              if (build) {
                A_Buildings[PlanetSelectedIndex][i].UC = (parseInt(Level)+1);
              }
              else if ((A_Buildings[PlanetSelectedIndex][i].Level != Level) && (i < 5)) {
                ResourcesBuildingsUC = true;
              }
              A_Buildings[PlanetSelectedIndex][i].Level = Level;
              break;
            }
          }
        }
      }
    }
    SavePlanetBuilding(PlanetSelectedIndex);
    if ((ResourcesBuildingsUC == true) && (ShowRequestToUpdateResourcesPage == true) && (RefreshPlanetRest == 0) && (AutoUpdateRest == 0)) {
      if (confirm(A_Language[C_ResourcesBuildingsUC]) == true) {
        AddAction('window.location.replace(|'+BaseUrl+'?page=b_building&session='+Session+'&planet='+A_Planet[PlanetSelectedIndex].Id+'|)');
        window.setTimeout('window.location.replace(\''+ResourcesLink+'&cp='+A_Planet[PlanetSelectedIndex].Id+'\')', 2000);
        NotRun = true;
      }
    }
  }
  catch(err) {
    ShowError(err, 'Get informations from buildings page');
  }
}





/* PAGE LABORATOIRE (Recuperation des donnees et memorisation via GreaseMonkey)
   -------------------------------------------------- */

function SaveTechnology() {
  var UTime = new Date();
  ResearchUpdate = UTime.getTime();
  var Value = '';
  for (j = 0; j < 16; j++) {
    Value += A_Construction[C_Research][j].Id+'='+A_Research[j].Level+'|'+
    A_Construction[C_Research][j].Id+'UC='+A_Research[j].UC+'|';
  }
  Value += 'Update='+ResearchUpdate;
  GM_setValue('OT_'+Account+'_Research', Value);
}

if ((OgamePage == 'buildings') && (OgameMode == 'Forschung')) {
  
  try {
    
    var Content = null;
    var Level = null;
    var Table = ContentDiv.getElementsByTagName('table')[0].getElementsByTagName('table')[0];
    if (Table) {
      if (Table.rows.length > 0) {
        if ((Table.rows[0].cells.length != 3) && (Table.rows[0].cells.length != 2)) {
          Table = ContentDiv.getElementsByTagName('table')[0].getElementsByTagName('table')[1];
        }
        if (Table) {
          for (var r = 0; r < Table.rows.length; r++) {
            if (Table.rows[r].cells.length > 1) {
              if (Table.rows[r].cells.length == 2) {
                var cell = Table.rows[r].cells[0];
                var build = Table.rows[r].cells[1].textContent.match(/unbau=([^\;]+)cp=([\d]+)/);
              }
              else {
                var cell = Table.rows[r].cells[1];
                var build = Table.rows[r].cells[2].textContent.match(/unbau=([^\;]+)cp=([\d]+)/);
              }
              Content = cell.textContent.match(/([^\(]+) \(([a-zA-Z]+) ([0-9]{0,2})/);
              if (Content == null) {
                Content = cell.innerHTML.match(/\>([^\<]+)\<\/a\>\</);
                if (Content) Level = 0;
              }
              else {
                Level = Content[3];
              }
              if (Content) {
                for (j = 0; j < 16; j++) {
                  if (Content[1] == A_Construction[C_Research][j].Name) {
                    A_Research[j].Level = Level;
                    if (build) {
                      A_Research[j].UC = build[2];
                    }
                    else {
                      A_Research[j].UC = '-';
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    SaveTechnology();
  }
  catch(err) {
    ShowError(err, 'Get informations from research page');
  }
}





/* PAGE DEFENSE (Recuperation des donnees et memorisation via GreaseMonkey)
   ------------------------------------------------- */

function SavePlanetDefenses(PlanetIndex) {
  var UTime = new Date();
  var Value = '';
  for (j = 0; j < 10; j++) {
    Value += A_Construction[C_Defenses][j].Id+'='+A_Defenses[PlanetIndex][j]+'|';
  }
  Value += 'Update='+UTime.getTime();
  GM_setValue('OT_'+A_Planet[PlanetIndex].Id+'_Defenses', Value);
}

if ((OgamePage == 'buildings') && (OgameMode == 'Verteidigung')) {
  
  try {
    for (j = 0; j < 10; j++) {
      A_Defenses[PlanetSelectedIndex][j] = 0;
    }
    
    var Content = null;
    var Table = ContentDiv.getElementsByTagName('table')[0].getElementsByTagName('table')[0];
    
    for (var r = 0; r < Table.rows.length; r++) {
      if (Table.rows[r].cells.length > 1) {
        if (Table.rows[r].cells.length == 2) {
          var cell = Table.rows[r].cells[0];
        }
        else {
          var cell = Table.rows[r].cells[1];
        }
        Content = null;
        if (cell.textContent.match(/([^\(]+) \( ([0-9\.]+) ([a-zA-Z])/)) {
          Content = cell.textContent.match(/([^\(]+) \( ([0-9\.]+) ([a-zA-Z])/)
        }
        else if (cell.textContent.match(/([^\(]+) \(([0-9\.]+) ([a-zA-Z])/)) {
          Content = cell.textContent.match(/([^\(]+) \(([0-9\.]+) ([a-zA-Z])/)
        }
        if (Content != null) {
          for (j = 0; j < 10; j++) {
            if (Content[1] == A_Construction[C_Defenses][j].Name) {
              A_Defenses[PlanetSelectedIndex][j] = Content[2].replace('.', '');
            }
          }
        }
      }
    }
    SavePlanetDefenses(PlanetSelectedIndex);
    
  }
  catch(err) {
    ShowError(err, 'Get informations from defense page');
  }
}





/* PAGE DEFENSE ET CHANTIER SPATIAL (Vaisseaux et defenses en construction) (Recuperation des donnees et memorisation via GreaseMonkey)
   ------------------------------------------------- */

function SavePlanetFleetsDefensesUC(PlanetIndex) {
  var UTime = new Date();
  var Value = 'List=', n = 0;
  A_FleetsDefensesUC[PlanetIndex].List = '';
  for (j = 0; j < A_Ship.length; j++) {
    if (A_Ship[j].length > 0) {
      if (n&1 == 1) {
        A_FleetsDefensesUC[PlanetIndex].List += A_Ship[j]+':'+A_ShipNumber[j]+'<br>';
      }
      else {
        A_FleetsDefensesUC[PlanetIndex].List += '<font color="#ff9900">'+A_Ship[j]+':'+A_ShipNumber[j]+'</font><br>';
      }
      n++;
    }
  }
  Value += A_FleetsDefensesUC[PlanetIndex].List+'|Update='+UTime.getTime();
  A_FleetsDefensesUC[PlanetIndex].Update = UTime.getTime();
  GM_setValue('OT_'+A_Planet[PlanetIndex].Id+'_FleetsDefensesUC', Value);
}

if ((OgamePage == 'buildings') && ((OgameMode == 'Verteidigung') || (OgameMode == 'Flotte'))) {
  try {
    var Script, Ship, ShipNumber;
    var A_Ship = new Array();
    var A_ShipNumber = new Array();
    if (document.getElementsByTagName('script').length > 0) {
      for (i = 0; i < document.getElementsByTagName('script').length; i++) {
        Script = document.getElementsByTagName('script')[i].innerHTML;
        if (Script.match('b = new Array')) {
          Script = Script.replace(/\",\"/g, '"').replace(/\"\"/g,'').match(/b = new Array\(([^\{]+)aa = /);
          Ship = String(Script[1]).match(/([^\)]+)/);
          ShipNumber = String(Script[1]).match(/\(([^\)]+)/);
          A_Ship = Ship[1].substr(1,Ship[1].length-1).split(/\"/);
          A_ShipNumber = ShipNumber[1].substr(1,ShipNumber[1].length-1).split(/\"/);
          break;
        }
      }
    }
    SavePlanetFleetsDefensesUC(PlanetSelectedIndex);
  }
  catch(err) {
    ShowError(err, 'Get defenses and ship under construction');
  }
}





/* PAGE FLOTTE (Recuperation des donnees et memorisation via GreaseMonkey)
   -------------------------------------------------- */

function SavePlanetFleets(PlanetIndex) {
  var UTime = new Date();
  var Value = '';
  for (j = 0; j < 14; j++) {
    Value += A_Construction[C_Fleets][j].Id+'='+A_Fleets[PlanetIndex][j]+'|';
  }
  Value += 'Update='+UTime.getTime();
  GM_setValue('OT_'+A_Planet[PlanetIndex].Id+'_Fleets', Value);
}

if (OgamePage == 'flotten1') {
  
  try {
    // Mise en memoire des vaisseaux de la planete en cours de visualisation
    for (j = 0; j < 14; j++) {
      if (document.getElementsByName('maxship'+A_Construction[C_Fleets][j].Id).length) {
        A_Fleets[PlanetSelectedIndex][j] = document.getElementsByName('maxship'+A_Construction[C_Fleets][j].Id)[0].value;
      }
      else {
        A_Fleets[PlanetSelectedIndex][j] = 0;
      }
    }  
    SavePlanetFleets(PlanetSelectedIndex);
  
  }
  catch(err) {
    ShowError(err, 'Get informations from fleet page');
  }
}






/* REALISATION DES ACTIONS
   ----------------------------------------------- */

if ((A_Actions.length > 0) && (NotRun == false)) {
  try {
    var Actions = '';
    if (A_Actions.length > 1) {
      for (i = 1; i < A_Actions.length; i++) {
        Actions += A_Actions[i]+'|';
      }
      Actions = Actions.substr(0, Actions.length-1);
    }
    GM_setValue('OT_'+Account+'_Actions', Actions);
    window.setTimeout(A_Actions[0], 1500);
  }
  catch(err) {
    ShowError(err, 'Run saved actions');
  }
}





/* PANNEAU DE CONFIGURATION (Page Options)
   ----------------------------------------------- */

unsafeWindow.LinkInfo = function() {
  alert(A_Language[C_KeyWordsInformations]);
} 

unsafeWindow.AddLink = function() {
  try {
    if (document.getElementById('AddLinkOption').getElementsByTagName('table')) {
      var ConfigTable = document.getElementById('AddLinkOption').getElementsByTagName('table')[0];
      var RowNumber = -1;
      for (j = 0; j < ConfigTable.rows.length; j++) {
        var Row = ConfigTable.rows[j];
        if (Row.cells[0].textContent == '') {
          if (Row.cells[0].getElementsByTagName('input')[0].name == 'AddLink') {
            RowNumber = j;
          }
        }
      }
      if (RowNumber >= 0) {
        NbLink = document.getElementsByName('NbLink')[0].value;
        document.getElementsByName('NbLink')[0].value = parseInt(NbLink)+1;
        var RowText = '<td class="c" colspan="2">'+A_Language[C_LinkNumber]+(parseInt(NbLink)+1)+'&nbsp;&nbsp;&nbsp;&nbsp;<input type="button" name="Delete'+NbLink+'" onclick="DeleteLink('+NbLink+');" value="'+A_Language[C_Delete]+'"></td>\n';
        ConfigTable.insertRow(RowNumber);
        ConfigTable.rows[RowNumber].innerHTML = RowText;
        RowText = '<th><input type="TEXT" name="LinkName'+NbLink+'" value=""></th><th>'+A_Language[C_LinkName]+'</th>\n';
        ConfigTable.insertRow(RowNumber+1);
        ConfigTable.rows[RowNumber+1].innerHTML = RowText;
        RowText = '<th><input type="TEXT" name="LinkUrl'+NbLink+'" value=""></th><th>'+A_Language[C_LinkUrl]+' <a style="cursor:pointer" onclick="LinkInfo()">?</a></th>\n';
        ConfigTable.insertRow(RowNumber+2);
        ConfigTable.rows[RowNumber+2].innerHTML = RowText;
        RowText = '<th><input type="TEXT" name="LinkPosition'+NbLink+'" value="" '+NoStringInput+' size="2"></th><th>'+A_Language[C_LinkPosition]+'</th>\n';
        ConfigTable.insertRow(RowNumber+3);
        ConfigTable.rows[RowNumber+3].innerHTML = RowText;
        RowText = '<th><input type="CHECKBOX" name="LinkNewWindow'+NbLink+'"></th><th>'+A_Language[C_LinkNewWindow]+'</th>\n';
        ConfigTable.insertRow(RowNumber+4);
        ConfigTable.rows[RowNumber+4].innerHTML = RowText;
        RowText = '<th><input type="TEXT" name="LinkTitle'+NbLink+'" value=""></th><th>'+A_Language[C_LinkTitle]+'</th>\n';
        ConfigTable.insertRow(RowNumber+5);
        ConfigTable.rows[RowNumber+5].innerHTML = RowText;
      }
    }
  }
  catch(err) {
    ShowError(err, 'AddLink(), options page');
  }
}

unsafeWindow.DeleteLink = function(LinkNumber) {
  try {
    if (document.getElementById('AddLinkOption').getElementsByTagName('table')) {
      var ConfigTable = document.getElementById('AddLinkOption').getElementsByTagName('table')[0];
      var RowNumber = -1;
      for (j = 0; j < ConfigTable.rows.length; j++) {
        var Row = ConfigTable.rows[j];
        if (Row.cells[0].textContent.match(A_Language[C_LinkNumber]+(parseInt(LinkNumber)+1))) {
          RowNumber = j;
        }
      }
      
      if (RowNumber >= 0) {
        NbLink = document.getElementsByName('NbLink')[0].value;
        document.getElementsByName('NbLink')[0].value = parseInt(NbLink)-1;
        ConfigTable.deleteRow(RowNumber+5);
        ConfigTable.deleteRow(RowNumber+4);
        ConfigTable.deleteRow(RowNumber+3);
        ConfigTable.deleteRow(RowNumber+2);
        ConfigTable.deleteRow(RowNumber+1);
        ConfigTable.deleteRow(RowNumber);
        for (j = (parseInt(LinkNumber)+1); j < NbLink; j++) {
          ConfigTable.rows[(RowNumber+(j-(parseInt(LinkNumber)+1))*6)].innerHTML = '<td class="c" colspan="2">'+A_Language[C_LinkNumber]+j+'&nbsp;&nbsp;&nbsp;&nbsp;<input type="button" name="Delete'+(j-1)+'" onclick="DeleteLink('+(j-1)+');" value="'+A_Language[C_Delete]+'"></td>\n';
          document.getElementsByName('LinkName'+j)[0].name = 'LinkName'+(j-1);
          document.getElementsByName('LinkUrl'+j)[0].name = 'LinkUrl'+(j-1);
          document.getElementsByName('LinkPosition'+j)[0].name = 'LinkPosition'+(j-1);
          document.getElementsByName('LinkNewWindow'+j)[0].name = 'LinkNewWindow'+(j-1);
          document.getElementsByName('LinkTitle'+j)[0].name = 'LinkTitle'+(j-1);
        }
      }
    }
  }
  catch(err) {
    ShowError(err, 'DeleteLink(), options page');
  }
}

function SaveChangedParameter(SaveName, DefaultValue, Value) {
  if (DefaultValue != Value) {
    GMsetValue(SaveName, Value);
  }
}
unsafeWindow.SaveChangedParameter = SaveChangedParameter;

function SaveParameter() {
  try {
    var Value = ''

    // Parametres generaux
    Value = 'ShowInKilo='+document.getElementsByName('ShowInKilo')[0].checked+'|';
    Value += 'ShowSecondForUpperUpdateTimeInDay='+document.getElementsByName('ShowSecondForUpperUpdateTimeInDay')[0].checked+'|';
    // Suppression des liens officier (Icones et lien)
    Value += 'DeleteOfficerLink='+document.getElementsByName('DeleteOfficerLink')[0].checked+'|';
    Value += 'DeleteTraderLink='+document.getElementsByName('DeleteTraderLink')[0].checked+'|';
    // Tri des membres de l'alliance
    for (j = 0; j < 6; j++) {
      if (document.getElementsByName('SortMember')[0].options[j].selected == true) {
        Value += 'SortMember='+j+'|';
      }
    }
    if (document.getElementsByName('SortOrder')[0].options[0].selected == true) {
      Value += 'SortMember=0|';
    }
    else {
      Value += 'SortMember=1|';
    }
    Value += 'AddToolTip='+document.getElementsByName('AddToolTip')[0].checked+'|';
    Value += 'ShowRequestToUpdateResourcesPage='+document.getElementsByName('ShowRequestToUpdateResourcesPage')[0].checked+'|';
    Value += 'ShowAutoUpdate='+document.getElementsByName('ShowAutoUpdate')[0].checked+'|';
    Value += 'UseRandomUpdateTime='+document.getElementsByName('UseRandomUpdateTime')[0].checked+'|';
    Value += 'AddImageVersion='+document.getElementsByName('AddImageVersion')[0].checked+'|';
    Value += 'Debug='+document.getElementsByName('Debug')[0].checked;
    GMsetValue('OT_'+Account+'_MainOption', Value);
    
    // Affichage
    Value = 'ShowHeaderPlanetList='+document.getElementsByName('ShowHeaderPlanetList')[0].checked+'|';
    Value += 'ShowHeaderResourcesList='+document.getElementsByName('ShowHeaderResourcesList')[0].checked+'|';
    Value += 'AddResourcesTotal='+document.getElementsByName('AddResourcesTotal')[0].checked+'|';
    Value += 'ChangeHeaderPosition='+document.getElementsByName('ChangeHeaderPosition')[0].checked+'|';
    Value += 'HeaderPosition='+document.getElementsByName('HeaderPosition')[0].value+'|';
    Value += 'ChangeContentPosition='+document.getElementsByName('ChangeContentPosition')[0].checked+'|';
    Value += 'ContentPosition='+document.getElementsByName('ContentPosition')[0].value+'|';
    Value += 'AddCssCode='+((document.getElementById('CssDiv').style.display == 'none') ? false : true)+'|';
    SaveChangedParameter('OT_'+Account+'_CssCode', CssCode, document.getElementsByName('CssCode')[0].value);
    Value += 'AddJSCode='+((document.getElementById('JSDiv').style.display == 'none') ? false : true);
    SaveChangedParameter('OT_'+Account+'_JSCode', JSCode, document.getElementsByName('JSCode')[0].value);
    GMsetValue('OT_'+Account+'_ScreenOption', Value);
    
    // Tableau des ressources
    Value = 'ShowHeaderResourcesTable='+document.getElementsByName('ShowHeaderResourcesTable')[0].checked+'|';
    Value += 'ShowPlanetName='+document.getElementsByName('ShowPlanetName')[0].checked+'|';
    Value += 'ShowCoordinates='+document.getElementsByName('ShowCoordinates')[0].checked+'|';
    Value += 'ShowTotal='+document.getElementsByName('ShowTotal')[0].checked+'|';
    Value += 'ShowDarkMatter='+document.getElementsByName('ShowDarkMatter')[0].checked+'|';
    Value += 'ShowTimeUpdate='+document.getElementsByName('ShowTimeUpdate')[0].checked+'|';
    Value += 'ShowResourcesOnlyActiveSession='+document.getElementsByName('ShowResourcesOnlyActiveSession')[0].checked+'|';
    Value += 'RealTimeResources='+document.getElementsByName('RealTimeResources')[0].checked+'|';
    Value += 'RealTimeResourcesDelay='+document.getElementsByName('RealTimeResourcesDelay')[0].value+'|';
    Value += 'HeaderSelectedPlanetStyle='+document.getElementsByName('HeaderSelectedPlanetStyle')[0].value+'|';
    var TransparencyTmp = document.getElementsByName('Transparency')[0].value;
    if (parseInt(TransparencyTmp) > 0) {
      Value += 'Transparency='+TransparencyTmp+'|';
    }
    else {
      Value += 'Transparency='+Transparency+'|';
      alert(A_Language[C_TransparencyError]);
    }
    for (var i = 0; i < 10; i++) {
      A_UpdateTimeColor[i] = 1000*document.getElementsByName('UpdateTimeColor'+i)[0].value;
      Value += 'UpdateTimeColor'+i+'='+A_UpdateTimeColor[i]+'|';
    }
    Value += 'PlanetOrder='+document.getElementById('PlanetOrder').checked;
    GMsetValue('OT_'+Account+'_ResourcesTableOption', Value);
    Value = '';
    for (var i = 0; i < PlanetSelect.length; i++) {
      Value += document.getElementsByName('PlanetOrder'+i)[0].value+'|';
    }
    GMsetValue('OT_'+Account+'_PlanetOrder', Value.substr(0,Value.length-1));
    
    // Empire
    Value = 'ShowEmpire='+document.getElementsByName('ShowEmpire')[0].checked+'|';
    var EmpireMenuRowTmp = document.getElementsByName('EmpireMenuRow')[0].value;
    if (parseInt(EmpireMenuRowTmp) > 0) {
      Value += 'EmpireMenuRow='+EmpireMenuRowTmp+'|';
    }
    else {
      Value += 'EmpireMenuRow='+EmpireMenuRow+'|';
      alert(A_Language[C_EmpireRowError]+MenuDiv.getElementsByTagName('table')[0].rows.length+'.');
    }
    var EmpireLinkNameTmp = document.getElementsByName('EmpireLinkName')[0].value;
    if (EmpireLinkNameTmp.length > 0) {
      Value += 'EmpireLinkName='+EmpireLinkNameTmp+'|';
    }
    else {
      Value += 'EmpireLinkName='+EmpireLinkName+'|';
      alert(A_Language[C_EmpireTxtError]);
    }
    var EmpireIconSizeTmp = document.getElementsByName('EmpireIconSize')[0].value;
    if (parseInt(EmpireIconSizeTmp) > 0) {
      Value += 'EmpireIconSize='+EmpireIconSizeTmp+'|';
    }
    else {
      Value += 'EmpireIconSize='+EmpireIconSize+'|';
      alert(A_Language[C_EmpireSizeIconError]);
    }
    Value += 'UseRealTimeResourcesEmpire='+document.getElementsByName('UseRealTimeResourcesEmpire')[0].checked+'|'+
    'HideDefaultResourcesTable='+document.getElementsByName('HideDefaultResourcesTable')[0].checked+'|'+
    'ForceDisplayHeaderResourcesTableWithEmpire='+document.getElementsByName('ForceDisplayHeaderResourcesTableWithEmpire')[0].checked;
    GMsetValue('OT_'+Account+'_EmpireOption', Value);
    for (i=0; i<A_EmpireBlock.length; i++) {
      for (j=0; j<A_EmpireBlock.length; j++) {
        if (document.getElementsByName('BlockOrder'+j)[0].value == i) {
          A_EmpireBlock[i].Order = j;
        }
      }
    }
    SaveEmpireBlock();
    
    // Transfert
    if (document.getElementsByName('TransferRatioSpeed')[0].value < 1) {
      document.getElementsByName('TransferRatioSpeed')[0].value = 1;
    }
    Value = 'UseRealTimeResources='+document.getElementsByName('UseRealTimeResources')[0].checked+'|'+
    'ForceResourcesTransferTableUpdate='+document.getElementsByName('ForceResourcesTransferTableUpdate')[0].checked+'|'+
    'ShowTransferTableIfActiveTransfer='+document.getElementsByName('ShowTransferTableIfActiveTransfer')[0].checked+'|'+
    'TransferRatioSpeed='+document.getElementsByName('TransferRatioSpeed')[0].value;
    GMsetValue('OT_'+Account+'_TransferOption', Value);
    
    // Liens additionnels
    Value = '';
    NbLinkTmp = document.getElementsByName('NbLink')[0].value;
    var ValidLink = 0;
    var LinkName = '';
    var LinkUrl = '';
    var LinkPosition = 0;
    for (var j = 0; j < NbLinkTmp; j++) {
      LinkName = document.getElementsByName('LinkName'+ValidLink)[0].value;
      LinkUrl = document.getElementsByName('LinkUrl'+ValidLink)[0].value;
      LinkPosition = document.getElementsByName('LinkPosition'+ValidLink)[0].value;
      if ((LinkName.length > 0) && (LinkUrl.length > 0) && (parseInt(LinkPosition) > 0)) {
        Value += 'LinkName'+ValidLink+'='+LinkName+'|';
        Value += 'LinkUrl'+ValidLink+'='+LinkUrl+'|';
        Value += 'LinkPosition'+ValidLink+'='+LinkPosition+'|';
        Value += 'LinkNewWindow'+ValidLink+'='+document.getElementsByName('LinkNewWindow'+ValidLink)[0].checked+'|';
        Value += 'LinkTitle'+ValidLink+'='+document.getElementsByName('LinkTitle'+ValidLink)[0].value+'|';
        ValidLink = parseInt(ValidLink)+1;
      }
      else {
        alert(A_Language[C_LinkPositionError1]+(j+1)+A_Language[C_LinkPositionError2]+MenuDiv.getElementsByTagName('table')[0].rows.length+'.');
      }
    }
    GMsetValue('OT_'+Account+'_LinkOption', Value+'NbLink='+ValidLink);
    
    // Actualisation de la page
    if ((NbLinkTmp == ValidLink) && (Transparency > 0) && (EmpireMenuRow > 0) && (EmpireLinkName.length > 0) && (EmpireIconSize > 0)) {
      window.setTimeout('window.location.replace(\''+BaseUrl+'?page=options&session='+Session+'\')', 500);
    }
    else {
      alert(A_Language[C_SaveParameterError]);
    }
  }
  catch(err) {
    ShowError(err, 'SaveParameter(), options page');
  }
}
unsafeWindow.SaveParameter = SaveParameter;

function HeaderOption(SubId, TitleId, Title) {
  try {
    return '<tr><td class="c" colspan="2" style="cursor:pointer" onclick="ScriptShowHide(\''+SubId+'\',\''+TitleId+'\',\''+Title.replace("'","\'+String.fromCharCode(39)+\'")+'\');window.location.replace(\'#'+TitleId+'\')"><span id="'+TitleId+'">'+Title+'&nbsp;&nbsp;&nbsp;<img src="'+C_ImgDown+'" alt="'+A_Language[C_Unfold]+'" '+((AddToolTip == true)?'title="'+A_Language[C_Unfold]+'"':'')+'></span></td></tr>\n'+
    '<tr><td colspan="2" style="padding:0" class="l"><div id="'+SubId+'" style="display:none"><table width="519px">\n';
  }
  catch(err) {
    ShowError(err, 'HeaderOption('+SubId+', '+TitleId+', '+Title+')');
  }
}

function CheckBoxOption(Name, State, Description, DisableId) {
  try {
    if (DisableId) {
      return '<tr><th><input type="CHECKBOX" name="'+Name+'" '+((State == true) ? 'checked="CHECKED"' : '')+' onclick="if (this.checked == true) { document.getElementsByName(\''+DisableId+'\')[0].disabled = false; } else { document.getElementsByName(\''+DisableId+'\')[0].disabled = true; };"></th><th>'+Description+'</th></tr>\n';
    }
    else {
      return '<tr><th><input type="CHECKBOX" name="'+Name+'" '+((State == true) ? 'checked="CHECKED"' : '')+'></th><th>'+Description+'</th></tr>\n';
    }
  }
  catch(err) {
    ShowError(err, 'CheckBoxOption('+Name+', '+State+', '+Description+', '+DisableId+')');
  }
}

function TextOption(Name, Value, Description, DisableCheckBox, Number, Size) {
  try {
    return '<tr><th><input type="TEXT" name="'+Name+'" value="'+Value+'" '+
    ((DisableCheckBox!=undefined) ? ((DisableCheckBox == true) ? '' : 'disabled="DISABLED"') : '')+' '+
    ((Number!=undefined) ? ((Number == true) ? NoStringInput : '') : '')+' '+
    ((Size!=undefined) ? 'size="'+Size+'"' : '')+'></th><th>'+Description+'</th></tr>\n';
  }
  catch(err) {
    ShowError(err, 'TextOption('+Name+', '+Value+', '+Description+', '+DisableCheckBox+', '+Number+', '+Size+')');
  }
}

function PermutPlanetOrder(Planet1, Planet2) {
  try {
    var Permut;
    var Planet1Value = document.getElementsByName('PlanetOrder'+Planet1)[0].value;
    var Planet2Value = document.getElementsByName('PlanetOrder'+Planet2)[0].value;
    document.getElementsByName('PlanetOrder'+Planet1)[0].value = Planet2Value;
    document.getElementsByName('PlanetOrder'+Planet2)[0].value = Planet1Value;
    Permut = document.getElementById('PlanetOrderLabel'+Planet1).textContent;
    document.getElementById('PlanetOrderLabel'+Planet1).textContent = document.getElementById('PlanetOrderLabel'+Planet2).textContent;
    document.getElementById('PlanetOrderLabel'+Planet2).textContent = Permut;
    document.getElementsByName('PlanetOrder')[Planet1].checked = false;
    document.getElementsByName('PlanetOrder')[Planet2].checked = true;
  }
  catch(err) {
    ShowError(err, 'PermutPlanetOrder('+Planet1+', '+Planet2+'), options page');
  }
}
unsafeWindow.PermutPlanetOrder = PermutPlanetOrder;

function ChangePlanetOrder(Direction) {
  try {
    var PlanetOrderSelected = 0, Permut;
    for (k = 0; k < PlanetSelect.length; k++) {
      if (document.getElementsByName('PlanetOrder')[k].checked == true) {
        PlanetOrderSelected = k;
      }
    }
    if (Direction == 1) {
      if (PlanetOrderSelected == PlanetSelect.length-1) {
        PermutPlanetOrder(PlanetOrderSelected,0);
      }
      else {
        PermutPlanetOrder(PlanetOrderSelected,(PlanetOrderSelected+1));
      }
    }
    else {
      if (PlanetOrderSelected == 0) {
        PermutPlanetOrder(PlanetOrderSelected,PlanetSelect.length-1);
      }
      else {
        PermutPlanetOrder(PlanetOrderSelected,(PlanetOrderSelected-1));
      }
    }
  }
  catch(err) {
    ShowError(err, 'ChangePlanetOrder('+Direction+'), options page');
  }
}
unsafeWindow.ChangePlanetOrder = ChangePlanetOrder;

function PermutBlockOrder(Block1, Block2) {
  try {
    var Permut;
    var Block1Value = document.getElementsByName('BlockOrder'+Block1)[0].value;
    var Block2Value = document.getElementsByName('BlockOrder'+Block2)[0].value;
    document.getElementsByName('BlockOrder'+Block1)[0].value = Block2Value;
    document.getElementsByName('BlockOrder'+Block2)[0].value = Block1Value;
    Permut = document.getElementById('BlockOrderLabel'+Block1).textContent;
    document.getElementById('BlockOrderLabel'+Block1).textContent = document.getElementById('BlockOrderLabel'+Block2).textContent;
    document.getElementById('BlockOrderLabel'+Block2).textContent = Permut;
    document.getElementsByName('BlockOrder')[Block1].checked = false;
    document.getElementsByName('BlockOrder')[Block2].checked = true;
  }
  catch(err) {
    ShowError(err, 'PermutBlockOrder('+Block1+', '+Block2+'), options page');
  }
}
unsafeWindow.PermutBlockOrder = PermutBlockOrder;

function ChangeBlockOrder(Direction) {
  try {
    var BlockOrderSelected = 0, Permut;
    for (k = 0; k < A_EmpireBlock.length; k++) {
      if (document.getElementsByName('BlockOrder')[k].checked == true) {
        BlockOrderSelected = k;
      }
    }
    if (Direction == 1) {
      if (BlockOrderSelected == A_EmpireBlock.length-1) {
        PermutBlockOrder(BlockOrderSelected,0);
      }
      else {
        PermutBlockOrder(BlockOrderSelected,(BlockOrderSelected+1));
      }
    }
    else {
      if (BlockOrderSelected == 0) {
        PermutBlockOrder(BlockOrderSelected,A_EmpireBlock.length-1);
      }
      else {
        PermutBlockOrder(BlockOrderSelected,(BlockOrderSelected-1));
      }
    }
  }
  catch(err) {
    ShowError(err, 'ChangeBlockOrder('+Direction+'), options page');
  }
}
unsafeWindow.ChangeBlockOrder = ChangeBlockOrder;

if (OgamePage == 'options') {
  
  try {
    // Creation du Div qui contiendra le panneau de configuration
    var ConfigContent = ContentDiv.getElementsByTagName('center')[0];
    var ConfigDiv = document.createElement('div');
    ConfigDiv.setAttribute('id','TransferResources');
    
    // Generation du panneau de configuration
    var ConfigPanel = '<table width="519px" id="ConfigPanel">'+
    // Parametres generales
    HeaderOption('MainOption', 'MainOptionTitle', A_Language[C_MainOption])+
    CheckBoxOption('ShowInKilo', ShowInKilo, A_Language[C_ShowInKilo])+
    CheckBoxOption('ShowSecondForUpperUpdateTimeInDay', ShowSecondForUpperUpdateTimeInDay, A_Language[C_ShowSecondForUpperUpdateTimeInDay])+
    CheckBoxOption('DeleteOfficerLink', DeleteOfficerLink, A_Language[C_DeleteOfficerLink])+
    CheckBoxOption('DeleteTraderLink', DeleteTraderLink, A_Language[C_DeleteTraderLink])+
    '<tr><th><select name="SortMember" style="text-align:left"><option value="00" '+((SortMember == 0) ? 'selected="SELECTED"' : '')+'>'+A_Language[C_Coordinates]+'</option>\n'+
    '<option value="1" '+((SortMember == 1) ? 'selected="SELECTED"' : '')+'>'+A_Language[C_Name]+'</option>\n'+
    '<option value="2" '+((SortMember == 2) ? 'selected="SELECTED"' : '')+'>'+A_Language[C_Status]+'</option>\n'+
    '<option value="3" '+((SortMember == 3) ? 'selected="SELECTED"' : '')+'>'+A_Language[C_Points]+'</option>\n'+
    '<option value="4" '+((SortMember == 4) ? 'selected="SELECTED"' : '')+'>'+A_Language[C_MemberShip]+'</option>\n'+
    '<option value="5" '+((SortMember == 5) ? 'selected="SELECTED"' : '')+'>'+A_Language[C_Online]+'</option></th><th>'+A_Language[C_SortMember]+'</th></tr>\n'+
    '<tr><th><select name="SortOrder" style="text-align:left"><option value="00" '+((SortMember == 0) ? 'selected="SELECTED"' : '')+'>'+A_Language[C_Increasing]+'</option>\n'+
    '<option value="1" '+((SortOrder == 1) ? 'selected="SELECTED"' : '')+'>'+A_Language[C_Lessening]+'</option></th><th>'+A_Language[C_SortOrder]+'</th></tr>\n'+
    CheckBoxOption('AddToolTip', AddToolTip, A_Language[C_AddToolTip])+
    CheckBoxOption('ShowRequestToUpdateResourcesPage', ShowRequestToUpdateResourcesPage, A_Language[C_ShowRequestToUpdateResourcesPage])+
    CheckBoxOption('ShowAutoUpdate', ShowAutoUpdate, A_Language[C_ShowAutoUpdate])+
    CheckBoxOption('UseRandomUpdateTime', UseRandomUpdateTime, A_Language[C_UseRandomUpdateTime])+
    CheckBoxOption('AddImageVersion', AddImageVersion, A_Language[C_AddImageVersion])+
    CheckBoxOption('Debug', Debug, A_Language[C_Debug])+
    '</table></div></td></tr>'+
    // Affichage
    HeaderOption('ScreenOption', 'ScreenOptionTitle', A_Language[C_ScreenOption])+
    CheckBoxOption('ShowHeaderPlanetList', ShowHeaderPlanetList, A_Language[C_ShowHeaderPlanetList])+
    CheckBoxOption('ShowHeaderResourcesList', ShowHeaderResourcesList, A_Language[C_ShowHeaderResourcesList])+
    CheckBoxOption('AddResourcesTotal', AddResourcesTotal, A_Language[C_AddResourcesTotal])+
    CheckBoxOption('ChangeHeaderPosition', ChangeHeaderPosition, A_Language[C_ChangeHeaderPosition], 'HeaderPosition')+
    TextOption('HeaderPosition', HeaderPosition, A_Language[C_HeaderPosition]+' <a style="cursor:pointer" onclick="alert(\''+A_Language[C_PositionInformations].replace("'","\'+String.fromCharCode(39)+\'")+'\')">?</a>', ChangeHeaderPosition)+
    CheckBoxOption('ChangeContentPosition', ChangeContentPosition, A_Language[C_ChangeContentPosition], 'ContentPosition')+
    TextOption('ContentPosition', ContentPosition, A_Language[C_ContentPosition]+' <a style="cursor:pointer" onclick="alert(\''+A_Language[C_PositionInformations].replace("'","\'+String.fromCharCode(39)+\'")+'\')">?</a>', ChangeContentPosition)+
    '<tr><th colspan="2"><a style="cursor:pointer" onclick="document.getElementById(\'CssDiv\').style.display=((document.getElementById(\'CssDiv\').style.display == \'none\') ? \'\' : \'none\');this.innerHTML=((document.getElementById(\'CssDiv\').style.display == \'none\') ? \''+A_Language[C_AddCssCode].replace("'","\'+String.fromCharCode(39)+\'")+'\' : \''+A_Language[C_RemoveCssCode].replace("'","\'+String.fromCharCode(39)+\'")+'\')">'+((AddCssCode == true) ? A_Language[C_RemoveCssCode] : A_Language[C_AddCssCode])+'</a><br><div id="CssDiv" '+((AddCssCode == true) ? '' : 'style="display:none"')+'><textarea name="CssCode" rows="10" cols="40">'+CssCode+'</textarea></div></th></tr>\n'+
    '<tr><th colspan="2"><a style="cursor:pointer" onclick="document.getElementById(\'JSDiv\').style.display=((document.getElementById(\'JSDiv\').style.display == \'none\') ? \'\' : \'none\');this.innerHTML=((document.getElementById(\'JSDiv\').style.display == \'none\') ? \''+A_Language[C_AddJSCode].replace("'","\'+String.fromCharCode(39)+\'")+'\' : \''+A_Language[C_RemoveJSCode].replace("'","\'+String.fromCharCode(39)+\'")+'\')">'+((AddJSCode == true) ? A_Language[C_RemoveJSCode] : A_Language[C_AddJSCode])+'</a><br><div id="JSDiv" '+((AddJSCode == true) ? '' : 'style="display:none"')+'><textarea name="JSCode" rows="10" cols="40">'+JSCode+'</textarea></div></th></tr>\n'+
    '</table></div></td></tr>'+
    // Tableau des ressources
    HeaderOption('ResourcesTableOption', 'ResourcesTableOptionTitle', A_Language[C_ResourcesTableOption])+
    CheckBoxOption('ShowHeaderResourcesTable', ShowHeaderResourcesTable, A_Language[C_ShowHeaderResourcesTable])+
    CheckBoxOption('ShowPlanetName', ShowPlanetName, A_Language[C_ShowPlanetName])+
    CheckBoxOption('ShowCoordinates', ShowCoordinates, A_Language[C_ShowCoordinates])+
    CheckBoxOption('ShowTotal', ShowTotal, A_Language[C_ShowTotal])+
    CheckBoxOption('ShowDarkMatter', ShowDarkMatter, A_Language[C_ShowDarkMatter])+
    CheckBoxOption('ShowTimeUpdate', ShowTimeUpdate, A_Language[C_ShowTimeUpdate])+
    CheckBoxOption('ShowResourcesOnlyActiveSession', ShowResourcesOnlyActiveSession, A_Language[C_ShowResourcesOnlyActiveSession])+
    CheckBoxOption('RealTimeResources', RealTimeResources, A_Language[C_RealTimeResources])+
    TextOption('RealTimeResourcesDelay', RealTimeResourcesDelay, A_Language[C_RealTimeResourcesDelay], true, 3)+
    TextOption('HeaderSelectedPlanetStyle', HeaderSelectedPlanetStyle, A_Language[C_HeaderSelectedPlanetStyle])+
    TextOption('Transparency', Transparency, A_Language[C_Transparency], true, 2)+
    '<tr><td class="l" colspan="2"><table width="519">'+
    '<tr><th colspan="2">'+A_Language[C_UpdateTimeColor]+'</th></tr>'+
    '<tr><th><input type="TEXT" style="background-color: #00FF00; color: #000000;" name="UpdateTimeColor0" value="'+Math.round(A_UpdateTimeColor[0]/1000)+'" '+NoStringInput+' size="8"></th>\n'+
    '<th><input type="TEXT" style="background-color: #33FF00; color: #000000;" name="UpdateTimeColor1" value="'+Math.round(A_UpdateTimeColor[1]/1000)+'" '+NoStringInput+' size="8"></th></tr>\n'+
    '<tr><th><input type="TEXT" style="background-color: #66FF00; color: #000000;" name="UpdateTimeColor2" value="'+Math.round(A_UpdateTimeColor[2]/1000)+'" '+NoStringInput+' size="8"></th>\n'+
    '<th><input type="TEXT" style="background-color: #99FF00; color: #000000;" name="UpdateTimeColor3" value="'+Math.round(A_UpdateTimeColor[3]/1000)+'" '+NoStringInput+' size="8"></th></tr>\n'+
    '<tr><th><input type="TEXT" style="background-color: #CCFF00; color: #000000;" name="UpdateTimeColor4" value="'+Math.round(A_UpdateTimeColor[4]/1000)+'" '+NoStringInput+' size="8"></th>\n'+
    '<th><input type="TEXT" style="background-color: #FFFF00; color: #000000;" name="UpdateTimeColor5" value="'+Math.round(A_UpdateTimeColor[5]/1000)+'" '+NoStringInput+' size="8"></th></tr>\n'+
    '<tr><th><input type="TEXT" style="background-color: #FFCC00; color: #000000;" name="UpdateTimeColor6" value="'+Math.round(A_UpdateTimeColor[6]/1000)+'" '+NoStringInput+' size="8"></th>\n'+
    '<th><input type="TEXT" style="background-color: #FF9900; color: #000000;" name="UpdateTimeColor7" value="'+Math.round(A_UpdateTimeColor[7]/1000)+'" '+NoStringInput+' size="8"></th></tr>\n'+
    '<tr><th><input type="TEXT" style="background-color: #FF6600; color: #000000;" name="UpdateTimeColor8" value="'+Math.round(A_UpdateTimeColor[8]/1000)+'" '+NoStringInput+' size="8"></th>\n'+
    '<th><input type="TEXT" style="background-color: #FF3300; color: #000000;" name="UpdateTimeColor9" value="'+Math.round(A_UpdateTimeColor[9]/1000)+'" '+NoStringInput+' size="8"></th></tr>\n'+
    '<tr><th colspan="2">'+A_Language[C_UpdateTimeRed]+'</th></tr></table></th></tr>'+  
    '<tr><td class="l" colspan="2"><table width="519">\n'+
    '<tr><th colspan="3"><input type="CHECKBOX" id="PlanetOrder" '+((PlanetOrder == true)?'checked="CHECKED"':'')+'><label for="PlanetOrder">'+A_Language[C_PlanetOrder]+'</label></th></tr>'+
    '<tr><th style="width:40% !important"><table width="100%">\n';
    for (i = 0; i < PlanetSelect.length; i++) {
      ConfigPanel += '<tr><th><input type="radio" name="PlanetOrder" id="PlanetOrderSelect'+i+'" '+(i==0?'checked="CHECKED"':'')+'>\n'+
      '<label for="PlanetOrderSelect'+i+'" id="PlanetOrderLabel'+i+'">'+A_Planet[i].Name+' ['+A_Planet[i].Galaxy+':'+A_Planet[i].System+':'+A_Planet[i].Planet+']</label>\n'+
      '<input type="hidden" name="PlanetOrder'+i+'" value="'+A_PlanetOrder[i]+'"></th></tr>\n';
    }
    ConfigPanel += '</table></th>\n'+
    '<th style="width:5% !important"><a style="cursor:pointer"><img src="'+C_ImgUp+'" alt="" onclick="ChangePlanetOrder(-1)"></a><br><br><a style="cursor:pointer"><img src="'+C_ImgDown+'" alt="" onclick="ChangePlanetOrder(1)"></a></th>\n'+
    '<th>'+A_Language[C_PlanetOrderDescription]+'</th></tr>\n'+
    '</table></td></tr></table></div></td></tr>\n'+
    // Empire
    HeaderOption('EmpireOption', 'EmpireOptionTitle', A_Language[C_Empire])+
    CheckBoxOption('ShowEmpire', ShowEmpire, A_Language[C_ShowEmpire])+
    TextOption('EmpireLinkName', EmpireLinkName, A_Language[C_EmpireLinkName])+
    TextOption('EmpireMenuRow', EmpireMenuRow, A_Language[C_EmpireMenuRow], true, 3)+
    TextOption('EmpireIconSize', EmpireIconSize, A_Language[C_EmpireIconSize], true, 3)+
    CheckBoxOption('UseRealTimeResourcesEmpire', UseRealTimeResourcesEmpire, A_Language[C_UseRealTimeResources])+
    CheckBoxOption('HideDefaultResourcesTable', HideDefaultResourcesTable, A_Language[C_HideDefaultResourcesTable])+
    CheckBoxOption('ForceDisplayHeaderResourcesTableWithEmpire', ForceDisplayHeaderResourcesTableWithEmpire, A_Language[C_ForceDisplayHeaderResourcesTableWithEmpire])+
    '<tr><td class="l" colspan="2"><table width="519">\n'+
    '<tr><th style="width:40% !important"><table width="100%">\n';
    var A_Block = new Array();
    A_Block[0] = A_Language[C_MainInformations];
    A_Block[1] = A_Language[C_Resources];
    A_Block[2] = A_Language[C_HourProduction];
    A_Block[3] = A_Language[C_DayProduction];
    A_Block[4] = A_Language[C_BuildingsTxt];
    A_Block[5] = A_Language[C_DefensesTxt];
    A_Block[6] = A_Language[C_ResearchTxt];
    A_Block[7] = A_Language[C_FleetsTxt];
    A_Block[8] = A_Language[C_FleetsDefensesUC];
    for (i = 0; i < A_EmpireBlock.length; i++) {
      for (j = 0; j < A_EmpireBlock.length; j++) {
        if (A_EmpireBlock[j].Order == i) {
          ConfigPanel += '<tr><th><input type="radio" name="BlockOrder" id="BlockOrderSelect'+i+'" '+(i==0?'checked="CHECKED"':'')+'>\n'+
          '<label for="BlockOrderSelect'+i+'" id="BlockOrderLabel'+i+'">'+A_Block[j]+'</label>\n'+
          '<input type="hidden" name="BlockOrder'+i+'" value="'+j+'"></th></tr>\n';
        }
      }
    }
    ConfigPanel += '</table></th>\n'+
    '<th style="width:5% !important"><a style="cursor:pointer"><img src="'+C_ImgUp+'" alt="" onclick="ChangeBlockOrder(-1)"></a><br><br><a style="cursor:pointer"><img src="'+C_ImgDown+'" alt="" onclick="ChangeBlockOrder(1)"></a></th>\n'+
    '<th>'+A_Language[C_BlockOrderDescription]+'</th></tr>\n'+
    '</table></td></tr></table></div></td></tr>'+
    // Transfert
    HeaderOption('TransferOption', 'TransferOptionTitle', A_Language[C_Transfer])+
    CheckBoxOption('UseRealTimeResources', UseRealTimeResources, A_Language[C_UseRealTimeResources])+
    CheckBoxOption('ForceResourcesTransferTableUpdate', ForceResourcesTransferTableUpdate, A_Language[C_ForceResourcesTransferTableUpdate])+
    CheckBoxOption('ShowTransferTableIfActiveTransfer', ShowTransferTableIfActiveTransfer, A_Language[C_ShowTransferTableIfActiveTransfer])+
    TextOption('TransferRatioSpeed', TransferRatioSpeed, A_Language[C_TransferRatioSpeed], true, 3)+
    '</table></div></td></tr>'+
    // Liens supplementaires
    HeaderOption('AddLinkOption', 'AddLinkOptionTitle', A_Language[C_LinkOption]);
    for (i = 0; i < NbLink; i++) {
      ConfigPanel += '<tr><td class="c" colspan="2">'+A_Language[C_LinkNumber]+(i+1)+'&nbsp;&nbsp;&nbsp;&nbsp;<input type="button" name="Delete'+i+'" onclick="DeleteLink('+i+');" value="'+A_Language[C_Delete]+'"></td></tr>\n'+
      TextOption('LinkName'+i, LinkNameArray[i], A_Language[C_LinkName])+
      TextOption('LinkUrl'+i, LinkUrlArray[i], A_Language[C_LinkUrl]+' <a style="cursor:pointer" onclick="LinkInfo()">?</a>')+
      TextOption('LinkPosition'+i, LinkPositionArray[i], A_Language[C_LinkPosition], true, 2)+
      CheckBoxOption('LinkNewWindow'+i, LinkNewWindowArray[i], A_Language[C_LinkNewWindow])+
      TextOption('LinkTitle'+i, LinkTitleArray[i], A_Language[C_LinkTitle]);
    }
    ConfigPanel += '<tr><th colspan="2"><input type="button" name="AddLink" value="'+A_Language[C_AddLink]+'" onclick="AddLink();"></th></tr></table></div></td></tr>\n'+
    '<tr><td class="c" colspan="2"><input type="button" value="'+A_Language[C_Save]+'" onclick="SaveParameter();"></td></tr></table><input type="hidden" name="NbLink" value="'+NbLink+'">\n';
    
    // Modification du bouton sauvegarde de la page option
    if(document.getElementsByTagName('input')) {
      var InputList = document.getElementsByTagName('input');
      for (i = 0; i < InputList.length; i++) {
        if (InputList[i].type == 'submit') {
          InputList[i].setAttribute('onclick', 'SaveParameter()');
        }
      }
    }
    
    // Creation de la barre d'entete du panneau et insertion du panneau de configuration genere precedemment
    var ConfigText = '<table width="519px"><tr><td class="c" onclick="ScriptShowHide(\'OgameTransfer\',\'OTTitle\',\''+A_Language[C_ControlPanel]+' - '+C_ScriptName+'\');window.location.replace(\'#OTTitle\')" style="cursor: pointer;"><span id="OTTitle">'+A_Language[C_ControlPanel]+' - '+C_ScriptName+'&nbsp;&nbsp;&nbsp;<img src="'+C_ImgDown+'" alt="'+A_Language[C_Unfold]+'" '+((AddToolTip == true)?'title="'+A_Language[C_Unfold]+'"':'')+'></span></td></tr></table>\n'+
    '<div id="OgameTransfer" style="display:none">'+ConfigPanel+'</div><br><br>';
    
    ConfigDiv.innerHTML = ConfigText;
    
    // Affichage du Div
    ConfigContent.appendChild(ConfigDiv);
  }
  catch(err) {
    ShowError(err, 'Control panel, options page');
  }
}





/* MODIFICATION LIEN 'Liste des membres' pour tri des membres
   ----------------------------------------------- */

if (OgamePage == 'allianzen') {
  try {
    if (!window.location.href.match(/a=([0-9]{1,2})/)) {
      var AllyLink = ContentDiv.getElementsByTagName('a');
      for (var i = 0; i < AllyLink.length; i++) {
        if (AllyLink[i].href.match(/a=([0-9]{1,2})/)) {
          var AllyA = AllyLink[i].href.match(/a=([0-9]{1,2})/)[1];
          if (AllyA == '4') {
            AllyLink[i].href = AllyLink[i].href+'&sort1='+SortMember+'&sort2='+SortOrder;
            break;
          }
        }
      }
    }
  }
  catch(err) {
    ShowError(err, 'Add alliance\'s members sorting');
  }
}





/* CORRECTION LIEN OVERLIB PAGE GALAXIE (FR)
   ----------------------------------------------- */

if ((OgamePage == 'galaxy') && (ContentDiv) && (Language == 1)) {
  try{
    if (ContentDiv.getElementsByTagName('th').length > 0) {
      for (var i = 0; i < ContentDiv.getElementsByTagName('th').length; i++) {
        var Cell = ContentDiv.getElementsByTagName('th')[i];
        if (Cell.getElementsByTagName('a').length > 0) {
          var Link = Cell.getElementsByTagName('a')[0];
          if (Link.style.cursor == 'pointer') {
            if (Cell.innerHTML.match(/alliance/g)) {
              var OverLibLink = Cell.innerHTML.match(/onmouseover=\"([^\"]+)\"([^\>]+)\>([^\0]+)/);
              var NewLink = document.createElement('a');
              NewLink.setAttribute('style','cursor:pointer');
              NewLink.setAttribute('onmouseover',OverLibLink[1].replace(/\'alliance/g, "\\\'alliance"));
              NewLink.setAttribute('onmouseout','return nd();');
              NewLink.innerHTML = OverLibLink[3].replace(/\<\/a\>/g,"")+'</a>';
              Cell.innerHTML = '';
              Cell.appendChild(NewLink);
            }
          }
        }
      }
    }
  }
  catch(err) {
    ShowError(err, 'Correct an error on ogame fr galaxy page');
  }
}





/* MISE A JOUR AUTOMATIQUE
   -------------------------------------------------- */
   
function AutoUpdate() {
  GMsetRefreshValue((PlanetSelect.length-1),5);
  window.setTimeout('window.location.replace(\''+BaseUrl+'?page=overview&session='+Session+'&cp='+A_Planet[PlanetSelectedIndex].Id+'\')', 100);
}
unsafeWindow.AutoUpdate = AutoUpdate;

function StopUpdate() {
  GMsetRefreshValue(0,0);
  window.setTimeout('window.location.replace(\''+BaseUrl+'?page=overview&session='+Session+'&cp='+A_Planet[PlanetSelectedIndex].Id+'\')', 100);
}
unsafeWindow.StopUpdate = StopUpdate;

try {
  if ((RefreshPlanetRest == 0) && (AutoUpdateRest > 0)) {
    GMsetRefreshValue((PlanetSelect.length-1),(AutoUpdateRest-1));
    RefreshPlanetRest = 0;
    if (AutoUpdateRest == 5) {
      window.setTimeout('window.location.replace(\''+BaseUrl+'?page=b_building&session='+Session+'&cp='+A_Planet[PlanetSelectedIndex].Id+'\')', ((UseRandomUpdateTime == true) ? Math.round(Math.random()*8000+2000) : 2000));
    }
    else if (AutoUpdateRest == 4) {
      window.setTimeout('window.location.replace(\''+BaseUrl+'?page=resources&session='+Session+'&cp='+A_Planet[PlanetSelectedIndex].Id+'\')', ((UseRandomUpdateTime == true) ? Math.round(Math.random()*8000+2000) : 2000));
    }
    else if (AutoUpdateRest == 3) {
      GMsetRefreshValue(0,(AutoUpdateRest-1));
      var LabMax = 0, PlanetLabMax = 0;
      for (i = 0; i < PlanetSelect.length; i++) {
        if (A_Buildings[i][11].Level > LabMax) {
          LabMax = A_Buildings[i][11].Level;
          PlanetLabMax = i;
        }
      }
      window.setTimeout('window.location.replace(\''+BaseUrl+'?page=buildings&mode=Forschung&session='+Session+'&cp='+A_Planet[PlanetLabMax].Id+'\')', ((UseRandomUpdateTime == true) ? Math.round(Math.random()*8000+2000) : 2000));
    }
    else if (AutoUpdateRest == 2) {
      window.setTimeout('window.location.replace(\''+BaseUrl+'?page=flotten1&session='+Session+'&cp='+A_Planet[PlanetSelectedIndex].Id+'\')', ((UseRandomUpdateTime == true) ? Math.round(Math.random()*8000+2000) : 2000));
    }
    else {
      window.setTimeout('window.location.replace(\''+BaseUrl+'?page=buildings&mode=Verteidigung&session='+Session+'&cp='+A_Planet[PlanetSelectedIndex].Id+'\')', ((UseRandomUpdateTime == true) ? Math.round(Math.random()*8000+2000) : 2000));
    }
  }
}
catch(err) {
  ShowError(err, 'Automatic update');
}



   
/* AFFICHAGE DU TABLEAU DE RESSOURCES
   ----------------------------------------------- */

function RefreshPlanet() {
  try {
    GMsetRefreshValue((PlanetSelect.length-1),AutoUpdateRest);
    if (PlanetSelectedIndex == (PlanetSelect.length-1)) {
      window.setTimeout('window.location.replace(\''+A_Planet[0].Url+'\')', ((UseRandomUpdateTime == true) ? Math.round(Math.random()*8000+2000) : 1000));
    }
    else {
      window.setTimeout('window.location.replace(\''+A_Planet[(PlanetSelectedIndex+1)].Url+'\')', ((UseRandomUpdateTime == true) ? Math.round(Math.random()*8000+2000) : 1000));
    }
  }
  catch(err) {
    ShowError(err, 'RefreshPlanet()');
  }
}
unsafeWindow.RefreshPlanet = RefreshPlanet;

function CalcRealTimeResources() {
  try {
    Counter = new Date();
    A_RealTimeResources = new Array(PlanetSelect.length+1);
    A_RealTimeResources[PlanetSelect.length] = new P_RealTimeResources();
    A_RealTimeResources[PlanetSelect.length].Metal = 0;
    A_RealTimeResources[PlanetSelect.length].Crystal = 0;
    A_RealTimeResources[PlanetSelect.length].Deuterium = 0;
    for (var k = 0; k < PlanetSelect.length; k++) {
      if ((A_Resources[k].Metal != undefined) && (A_Resources[k].Metal != '-')) {
        A_RealTimeResources[k] = new P_RealTimeResources();
        var Time = Math.round((Counter.getTime()-A_Resources[k].Update)/1000);
        A_RealTimeResources[k].Metal = Math.round(parseInt(A_Resources[k].Metal)+(Time*(A_Production[k].Metal/3600)));
        if (A_RealTimeResources[k].Metal > A_Production[k].MetalMax*1000) {
          if (parseInt(A_Resources[k].Metal) > A_Production[k].MetalMax*1000) {
            A_RealTimeResources[k].Metal = parseInt(A_Resources[k].Metal);
          }
          else {
            A_RealTimeResources[k].Metal = A_Production[k].MetalMax*1000;
          }
          if (A_Planet[k].Type == C_Planet) {
            document.getElementById('Metal'+k).style.textDecoration = 'blink';
          }
        }
        A_RealTimeResources[PlanetSelect.length].Metal = A_RealTimeResources[PlanetSelect.length].Metal+A_RealTimeResources[k].Metal;
        A_RealTimeResources[k].Crystal = Math.round(parseInt(A_Resources[k].Crystal)+(Time*(A_Production[k].Crystal/3600)));
        if (A_RealTimeResources[k].Crystal > A_Production[k].CrystalMax*1000) {
          if (parseInt(A_Resources[k].Crystal) > A_Production[k].CrystalMax*1000) {
            A_RealTimeResources[k].Crystal = parseInt(A_Resources[k].Crystal);
          }
          else {
            A_RealTimeResources[k].Crystal = A_Production[k].CrystalMax*1000;
          }
          if (A_Planet[k].Type == C_Planet) {
            document.getElementById('Crystal'+k).style.textDecoration = 'blink';
          }
        }
        A_RealTimeResources[PlanetSelect.length].Crystal = A_RealTimeResources[PlanetSelect.length].Crystal+A_RealTimeResources[k].Crystal;
        A_RealTimeResources[k].Deuterium = Math.round(parseInt(A_Resources[k].Deuterium)+(Time*(A_Production[k].Deuterium/3600)));
        if (A_RealTimeResources[k].Deuterium > A_Production[k].DeuteriumMax*1000) {
          if (parseInt(A_Resources[k].Deuterium) > A_Production[k].DeuteriumMax*1000) {
            A_RealTimeResources[k].Deuterium = parseInt(A_Resources[k].Deuterium);
          }
          else {
            A_RealTimeResources[k].Deuterium = A_Production[k].DeuteriumMax*1000;
          }
          if (A_Planet[k].Type == C_Planet) {
            document.getElementById('Deuterium'+k).style.textDecoration = 'blink';
          }
        }
        A_RealTimeResources[PlanetSelect.length].Deuterium = A_RealTimeResources[PlanetSelect.length].Deuterium+A_RealTimeResources[k].Deuterium
        if (document.getElementById('ResourcesDiv')) {
          var Table = document.getElementById('ResourcesDiv').getElementsByTagName('table')[0];
          if ((Table) && (RealTimeResources==true)) {
            document.getElementById('Metal'+k).innerHTML = FormatNb(A_RealTimeResources[k].Metal);
            document.getElementById('Crystal'+k).innerHTML = FormatNb(A_RealTimeResources[k].Crystal);
            document.getElementById('Deuterium'+k).innerHTML = FormatNb(A_RealTimeResources[k].Deuterium);
            var Color = PlanetTimeUpdate(k,false,true);
            Table.rows[1].cells[(k+1)].style.background = Color;
            Table.rows[2].cells[(k+1)].style.background = Color;
            Table.rows[3].cells[(k+1)].style.background = Color;
            Table.rows[4].cells[(k+1)].style.background = Color;
            if (ShowTimeUpdate == true) {
              document.getElementById('Update'+k).innerHTML = FormatTime(Time*1000);
              Table.rows[5].cells[(k+1)].style.background = Color;
            }
          }
        }
      }
    }
    if ((Table) && (ShowTotal==true) && (RealTimeResources == true)) {
      document.getElementById('MetalTotal').innerHTML = FormatNb(A_RealTimeResources[PlanetSelect.length].Metal);
      document.getElementById('CrystalTotal').innerHTML = FormatNb(A_RealTimeResources[PlanetSelect.length].Crystal);
      document.getElementById('DeuteriumTotal').innerHTML = FormatNb(A_RealTimeResources[PlanetSelect.length].Deuterium);
    }
    if (RealTimeResources == true) {
      window.setTimeout('CalcRealTimeResources()', RealTimeResourcesDelay*1000);
    }
  }
  catch(err) {
    ShowError(err, 'CalcRealTimeResources()');
  }
}
unsafeWindow.CalcRealTimeResources = CalcRealTimeResources;

if (RefreshPlanetRest > 0) {
  try {
    GMsetRefreshValue((RefreshPlanetRest-1),AutoUpdateRest);
    if (PlanetSelectedIndex == (PlanetSelect.length-1)) {
      window.setTimeout('window.location.replace(\''+A_Planet[0].Url+'\')', ((UseRandomUpdateTime == true) ? Math.round(Math.random()*8000+2000) : 1000));
    }
    else {
      window.setTimeout('window.location.replace(\''+A_Planet[(PlanetSelectedIndex+1)].Url+'\')', ((UseRandomUpdateTime == true) ? Math.round(Math.random()*8000+2000) : 1000));
    }
  }
  catch(err) {
    ShowError(err, 'Refresh overview page of all planets');
  }
}

function ShowHideColumn(Id) {
  try {
    if (Id < PlanetSelect.length) {
      if (document.getElementById('Planet'+Id).style.display == 'none') {
        var Display = '';
        document.getElementById('ImgShowHide'+Id).src = C_ImgLeft;
        if (AddToolTip == true) document.getElementById('ImgShowHide'+Id).title = A_Language[C_Hide]+' '+A_Planet[Id].Name;
      }
      else {
        var Display = 'none';
        document.getElementById('ImgShowHide'+Id).src = C_ImgRight;
        if (AddToolTip == true) document.getElementById('ImgShowHide'+Id).title = A_Language[C_Show]+' '+A_Planet[Id].Name;
      }
      document.getElementById('Planet'+Id).style.display = Display;
      document.getElementById('Metal'+Id).style.display = Display;
      document.getElementById('Crystal'+Id).style.display = Display;
      document.getElementById('Deuterium'+Id).style.display = Display;
      document.getElementById('Energy'+Id).style.display = Display;
      if (ShowTimeUpdate == true) {
        document.getElementById('Update'+Id).style.display = Display;
      }
    }
    // Colonne total
    else if ((Id == PlanetSelect.length)&& (document.getElementById('Total'))) {
      if (document.getElementById('Total').style.display == 'none') {
        var Display = '';
        document.getElementById('ImgShowHide'+Id).src = C_ImgLeft;
        if (AddToolTip == true) document.getElementById('ImgShowHide'+Id).title = A_Language[C_Hide]+' '+A_Language[C_Total];
      }
      else {
        var Display = 'none';
        document.getElementById('ImgShowHide'+Id).src = C_ImgRight;
        if (AddToolTip == true) document.getElementById('ImgShowHide'+Id).title = A_Language[C_Show]+' '+A_Language[C_Total];
      }
      document.getElementById('Total').style.display = Display;
      document.getElementById('MetalTotal').style.display = Display;
      document.getElementById('CrystalTotal').style.display = Display;
      document.getElementById('DeuteriumTotal').style.display = Display;
    }
    // Colonne antimatiere
    else if (document.getElementById('DarkMatterTitle')) {
      if (document.getElementById('DarkMatterTitle').style.display == 'none') {
        var Display = '';
        document.getElementById('ImgShowHide'+Id).src = C_ImgLeft;
        if (AddToolTip == true) document.getElementById('ImgShowHide'+Id).title = A_Language[C_Hide]+' '+A_Language[C_DarkMatter];
      }
      else {
        var Display = 'none';
        document.getElementById('ImgShowHide'+Id).src = C_ImgRight;
        if (AddToolTip == true) document.getElementById('ImgShowHide'+Id).title = A_Language[C_Show]+' '+A_Language[C_DarkMatter];
      }
      document.getElementById('DarkMatterTitle').style.display = Display;
      document.getElementById('DarkMatterValue').style.display = Display;
    }
    // Memorisation
    var Value = ''; 
    for (j = 0; j < PlanetSelect.length; j++) {
      Value += document.getElementById('Planet'+j).style.display+';|';
    }
    Value += ((document.getElementById('Total'))?document.getElementById('Total').style.display:'')+';|'+
    ((document.getElementById('DarkMatterTitle'))?document.getElementById('DarkMatterTitle').style.display+';':';');
    GMsetValue('OT_'+Account+'_ShowHideColumn', Value);
  }
  catch(err) {
    ShowError(err, 'ShowHideColumn('+Id+')');
  }
}
unsafeWindow.ShowHideColumn = ShowHideColumn;

// Affichage du tableau de ressources en entete
if (((ShowHeaderResourcesTable == true) || ((ForceDisplayHeaderResourcesTableWithEmpire == true) && (OgameEmpire == true))) && (OgamePage != 'galaxy') && (HeaderDiv)) {
  
  try {
    //Initialisation des variables
    var ResourcesDiv = document.createElement('div');
    ResourcesDiv.setAttribute('id','ResourcesDiv');
    var PlanetTd = '';
    var MetalTd = '';
    var CrystalTd = '';
    var DeuteriumTd = '';
    var EnergieTd = '';
    var TimeUpdateTd = '';
    var TimeUpdate = '';
    var MetalTotal = 0;
    var CrystalTotal = 0;
    var DeuteriumTotal = 0;
    var Coordinates = '';
    
    if (RealTimeResources == true) {
      window.setTimeout('CalcRealTimeResources()', 1000);
    }
    
    // Generation des donnees du tableau
    for (var i = 0; i < PlanetSelect.length; i++) {
      
      // Creation de l'entete du tableau d'apercu du stock et du tableau de resultat du calcul
      Coordinates = '['+A_Planet[i].Galaxy+':'+A_Planet[i].System+':'+A_Planet[i].Planet+']';
      
      if (i == PlanetSelectedIndex) {
        PlanetTd += '<th align="center" id="PlanetSelected"><div id="Planet'+i+'" style="display:'+A_ShowHideColomn[i]+'"><a style="cursor:pointer" onclick="GMsetRefreshValue('+OgameEmpire+','+RefreshPlanetRest+','+AutoUpdateRest+');SaveTransfer();window.location.replace(\''+A_Planet[i].Url+'\');" '+((AddToolTip == true)?'title="'+Coordinates+'"':'')+'>'+((ShowPlanetName == true)?A_Planet[i].Name:'')+(((ShowPlanetName == true) && (ShowCoordinates == true))?'<br>':'')+((ShowCoordinates == true)?Coordinates:'')+'</a></div></th>\n'+
        '<td class="c" style="width:7px! important;cursor:pointer" onclick="javascript:ShowHideColumn('+i+')"><img id="ImgShowHide'+i+'" src="'+((A_ShowHideColomn[i] == 'none;')?C_ImgRight:C_ImgLeft)+'" alt="'+((A_ShowHideColomn[i] == 'none;')?A_Language[C_Show]:A_Language[C_Hide])+' '+A_Planet[i].Name+'" '+((AddToolTip == true)?'title="'+((A_ShowHideColomn[i] == 'none;')?A_Language[C_Show]:A_Language[C_Hide])+' '+A_Planet[i].Name+'"':'')+'></td>\n';
      }
      else {
        PlanetTd += '<td class="c" align="center"><div id="Planet'+i+'" style="display:'+A_ShowHideColomn[i]+'"><a style="cursor:pointer" onclick="'+((OgameEmpire==true)?'GMsetValue(\'OT_OgameEmpire\','+OgameEmpire+');':'')+'SaveTransfer();window.location.replace(\''+A_Planet[i].Url+'\');" '+((AddToolTip == true)?'title="'+Coordinates+'"':'')+'>'+((ShowPlanetName == true)?A_Planet[i].Name:'')+(((ShowPlanetName == true) && (ShowCoordinates == true))?'<br>':'')+((ShowCoordinates == true)?Coordinates:'')+'</a></div></td>\n'+
        '<td class="c" style="width:7px! important;cursor:pointer" onclick="javascript:ShowHideColumn('+i+')"><img id="ImgShowHide'+i+'" src="'+((A_ShowHideColomn[i] == 'none;')?C_ImgRight:C_ImgLeft)+'" alt="'+((A_ShowHideColomn[i] == 'none;')?A_Language[C_Show]:A_Language[C_Hide])+' '+A_Planet[i].Name+'" '+((AddToolTip == true)?'title="'+((A_ShowHideColomn[i] == 'none;')?A_Language[C_Show]:A_Language[C_Hide])+' '+A_Planet[i].Name+'"':'')+'></td>\n';
      }
      
      // Generation des lignes de ressources et d'energie du tableau (si des donnees memorisees sont trouvees sinon on affiche rien)
      if (A_Resources[i].Metal) {
        TimeUpdate = PlanetTimeUpdate(i, false);
        MetalTotal = MetalTotal + ((A_Resources[i].Metal!='-')?parseInt(A_Resources[i].Metal):0);
        CrystalTotal = CrystalTotal + ((A_Resources[i].Crystal!='-')?parseInt(A_Resources[i].Crystal):0);
        DeuteriumTotal = DeuteriumTotal + ((A_Resources[i].Deuterium!='-')?parseInt(A_Resources[i].Deuterium):0);
        MetalTd += '<td colspan="2" style="width:5px !important" align="right" class="'+TimeUpdate+ResourcesOver(i, 0, A_Planet[i].Type)+'"><div id="Metal'+i+'" style="display:'+A_ShowHideColomn[i]+'">'+FormatNb(A_Resources[i].Metal)+'</div></td>\n';
        CrystalTd += '<td colspan="2" style="width:5px !important" align="right" class="'+TimeUpdate+ResourcesOver(i, 1, A_Planet[i].Type)+'"><div id="Crystal'+i+'" style="display:'+A_ShowHideColomn[i]+'">'+FormatNb(A_Resources[i].Crystal)+'</div></td>\n';
        DeuteriumTd += '<td colspan="2" style="width:5px !important" align="right" class="'+TimeUpdate+ResourcesOver(i, 2, A_Planet[i].Type)+'"><div id="Deuterium'+i+'" style="display:'+A_ShowHideColomn[i]+'">'+FormatNb(A_Resources[i].Deuterium)+'</div></td>\n';
        EnergieTd += '<td colspan="2" style="width:5px !important" align="right" class="'+TimeUpdate+ResourcesOver(i, 3, A_Planet[i].Type)+'"><div id="Energy'+i+'" style="display:'+A_ShowHideColomn[i]+'">\n';
        EnergieTd += (A_Resources[i].FreeEnergy != '') ? FormatNb(A_Resources[i].FreeEnergy)+'/'+FormatNb(A_Resources[i].TotalEnergy) : '';
        EnergieTd += '</div></td>\n';
        if (ShowTimeUpdate == true) {
          TimeUpdateTd += '<td colspan="2" style="width:5px !important" align="right" class="'+TimeUpdate+'"><div id="Update'+i+'" style="display:'+A_ShowHideColomn[i]+'">'+FormatTime(PlanetTimeUpdate(i, true))+'</div></td>\n';
        }
      }
      else {
        MetalTd += '<td align="right" class="Time10" colspan="2"><div id="Metal'+i+'" style="display:'+A_ShowHideColomn[i]+'"></div></td>\n';
        CrystalTd += '<td align="right" class="Time10" colspan="2"><div id="Crystal'+i+'" style="display:'+A_ShowHideColomn[i]+'"></div></td>\n';
        DeuteriumTd += '<td align="right" class="Time10" colspan="2"><div id="Deuterium'+i+'" style="display:'+A_ShowHideColomn[i]+'"></div></td>\n';
        EnergieTd += '<td align="right" class="Time10" colspan="2"><div id="Energy'+i+'" style="display:'+A_ShowHideColomn[i]+'"></div></td>\n';
        if (ShowTimeUpdate == true) {
          TimeUpdateTd += '<td align="right" class="Time10" colspan="2"><div id="Update'+i+'" style="display:'+A_ShowHideColomn[i]+'"></div></td>\n';
        }
      }
    }
    
    // Creation du tableau
    ResourcesDiv.innerHTML = '<table id="planetResources">\n'+
    // Bouton precedent, mise a jour, suivant 
    '<tr><td class="c"><div style="display:inline !important;"><input style="width:19px!important;height:16px!important;margin-right:1px;border:none!important;background:transparent !important" type="image" src="'+C_ImgPrevious+'" name="previous" '+((AddToolTip == true)?'title="'+A_Language[C_PreviousPlanet]+'"':'')+' onclick="window.location.replace(\''+A_Planet[((PlanetSelectedIndex == 0) ? (PlanetSelect.length-1) : (PlanetSelectedIndex-1))].Url+'\');">'+
    (((AutoUpdateRest == 0) && (RefreshPlanetRest > 0)) ? '<input type="image" src="'+C_ImgStop+'" style="width:16px!important;height:16px!important;margin-left:1px;margin-right:1px;border:none!important;background:transparent !important" name="refresh" '+((AddToolTip == true)?'title="'+A_Language[C_UpdateStopInformations]+'" onclick="StopUpdate();"':'')+'>' : '<input style="width:11px!important;height:16px!important;margin-left:1px;margin-right:1px;border:none!important;background:transparent !important" type="image" src="'+C_ImgPlay+'" name="refresh" '+((AddToolTip == true)?'title="'+A_Language[C_UpdatePages]+'"':'')+' onclick="RefreshPlanet();">')+
    '<input style="width:19px!important;height:16px!important;margin-left:1px;border:none!important;background:transparent !important" type="image" src="'+C_ImgNext+'" name="next" '+((AddToolTip == true)?'title="'+A_Language[C_NextPlanet]+'"':'')+' onclick="window.location.replace(\''+A_Planet[((PlanetSelectedIndex == (PlanetSelect.length-1)) ? 0 : (PlanetSelectedIndex+1))].Url+'\');"></div></td>\n'+
    // Liste des planetes
    PlanetTd+
    // Total
    ((ShowTotal == true) ? '<td class="c" style="font-weight:bold; text-decoration:none;" align="center"><div id="Total" style="display:'+A_ShowHideColomn[PlanetSelect.length]+'">'+A_Language[C_Total]+'</div></td>\n'+
    '<td class="c" style="width:7px! important;cursor:pointer" onclick="javascript:ShowHideColumn('+PlanetSelect.length+')"><img id="ImgShowHide'+PlanetSelect.length+'" src="'+((A_ShowHideColomn[PlanetSelect.length] == 'none;')?C_ImgRight:C_ImgLeft)+'" alt="'+((A_ShowHideColomn[PlanetSelect.length] == 'none;')?A_Language[C_Show]:A_Language[C_Hide])+' '+A_Language[C_Total]+'" '+((AddToolTip == true)?'title="'+((A_ShowHideColomn[PlanetSelect.length] == 'none;')?A_Language[C_Show]:A_Language[C_Hide])+' '+A_Language[C_Total]+'"':'')+'></td>\n' : '')+
    // Antimatiere
    ((ShowDarkMatter == true) ? '<td class="c" align="center" style="font-weight:bold; padding-left:3px; padding-right:3px;"><div id="DarkMatterTitle" style="display:'+A_ShowHideColomn[(PlanetSelect.length+1)]+'">'+A_Language[C_DarkMatter]+'</div></td>\n'+
    '<td class="c" style="width:7px! important;cursor:pointer" onclick="javascript:ShowHideColumn('+(PlanetSelect.length+1)+')"><img id="ImgShowHide'+(PlanetSelect.length+1)+'" src="'+((A_ShowHideColomn[(PlanetSelect.length+1)] == 'none;')?C_ImgRight:C_ImgLeft)+'" alt="'+((A_ShowHideColomn[(PlanetSelect.length+1)] == 'none;')?A_Language[C_Show]:A_Language[C_Hide])+' '+A_Language[C_DarkMatter]+'" '+((AddToolTip == true)?'title="'+((A_ShowHideColomn[(PlanetSelect.length+1)] == 'none;')?A_Language[C_Show]:A_Language[C_Hide])+' '+A_Language[C_DarkMatter]+'"':'')+'></td>\n' : '')+
    '</tr>'+
    // Ressources
    '<tr><th style="font-weight:bold">'+A_Language[C_Metal]+'</th>\n'+MetalTd+((ShowTotal == true) ? '<th style="font-weight:bold" colspan="2" style="width:5px !important"><div id="MetalTotal" style="display:'+A_ShowHideColomn[PlanetSelect.length]+'">'+FormatNb(MetalTotal)+'</div></th>' : '')+((ShowDarkMatter == true) ? '<th style="font-weight:bold" colspan="2" style="width:5px !important"><div id="DarkMatterValue" style="display:'+A_ShowHideColomn[(PlanetSelect.length+1)]+'">'+FormatNb(DarkMatter)+'</div></th>' : '')+'</tr>\n'+
    '<tr><th style="font-weight:bold">'+A_Language[C_Crystal]+'</th>\n'+CrystalTd+((ShowTotal == true) ? '<th style="font-weight:bold" colspan="2" style="width:5px !important"><div id="CrystalTotal" style="display:'+A_ShowHideColomn[PlanetSelect.length]+'">'+FormatNb(CrystalTotal)+'</div></th>' : '')+((ShowDarkMatter == true) ? '<td colspan="2"></td>' : '')+'</tr>\n'+
    '<tr><th style="font-weight:bold">'+A_Language[C_Deuterium]+'</th>\n'+DeuteriumTd+((ShowTotal == true) ? '<th style="font-weight:bold" colspan="2" style="width:5px !important"><div id="DeuteriumTotal" style="display:'+A_ShowHideColomn[PlanetSelect.length]+'">'+FormatNb(DeuteriumTotal)+'</div></th>' : '')+((ShowDarkMatter == true) ? '<td colspan="2"></td>' : '')+'</tr>\n'+
    '<tr><th style="font-weight:bold">'+A_Language[C_Energy]+'</th>\n'+EnergieTd+((ShowTotal == true) ? '<td colspan="2"></td>' : '')+((ShowDarkMatter == true) ? '<td colspan="2"></td>' : '')+'</tr>\n'+
    ((ShowTimeUpdate == true) ? '<tr><th style="font-weight:bold">'+String(A_Language[C_Update]).replace(/([ ])/g,'&nbsp;')+'</th>\n'+TimeUpdateTd+((ShowTotal == true) ? '<td colspan="2"></td>' : '')+((ShowDarkMatter == true) ? '<td colspan="2"></td>' : '')+'</tr>\n' : '')+
    '</table>';
    
    // Affichage du tableau
    document.getElementsByTagName('body')[0].appendChild(ResourcesDiv);
  }
  catch(err) {
    ShowError(err, 'Resources table');
  }
}
// Ajoute la ligne total au tableau de ressources par defaut
if (AddResourcesTotal == true) {
  try {
    var MetalTotal = 0;
    var CrystalTotal = 0;
    var DeuteriumTotal = 0;
    for (var i = 0; i < PlanetSelect.length; i++) {
      if (A_Resources[i].Metal) {
        MetalTotal = MetalTotal + parseInt(A_Resources[i].Metal);
        CrystalTotal = CrystalTotal + parseInt(A_Resources[i].Crystal);
        DeuteriumTotal = DeuteriumTotal + parseInt(A_Resources[i].Deuterium);
      }
    }
    if (HeaderDiv) {
      var TotalTr = document.createElement('tr');
      TotalTr.setAttribute('class','header');
      var MetalTotalTd = document.createElement('td');
      MetalTotalTd.setAttribute('class','header');
      MetalTotalTd.setAttribute('width','90');
      MetalTotalTd.setAttribute('align','center');
      MetalTotalTd.textContent = FormatNb(MetalTotal);
      TotalTr.appendChild(MetalTotalTd);
      var CrystalTotalTd = document.createElement('td');
      CrystalTotalTd.setAttribute('class','header');
      CrystalTotalTd.setAttribute('width','90');
      CrystalTotalTd.setAttribute('align','center');
      CrystalTotalTd.textContent = FormatNb(CrystalTotal);
      TotalTr.appendChild(CrystalTotalTd);
      var DeuteriumTotalTd = document.createElement('td');
      DeuteriumTotalTd.setAttribute('class','header');
      DeuteriumTotalTd.setAttribute('width','90');
      DeuteriumTotalTd.setAttribute('align','center');
      DeuteriumTotalTd.textContent = FormatNb(DeuteriumTotal);
      TotalTr.appendChild(DeuteriumTotalTd);
      var NullTd = document.createElement('td');
      NullTd.setAttribute('style','background:none');
      NullTd.setAttribute('colspan','2');
      TotalTr.appendChild(NullTd);
      document.getElementById('resources').appendChild(TotalTr);
    }
  }
  catch(err) {
    ShowError(err, 'Add total to default resources table');
  }
}





/* PAGE EMPIRE
   -------------------------------------------------- */

function InsertSelect(Name, Value) {
  try {
    if (Value != '-') {
      var SelectScript = '<select name="'+Name+'" size="1">';
      var CurrentValue = 100;
      for (v = 0; v < 11 ; v++) {
        if (CurrentValue == Value) {
          SelectScript += '<option value="'+CurrentValue+'" selected>'+CurrentValue+'&#37;</option>';
        }
        else {
          SelectScript += '<option value="'+CurrentValue+'">'+CurrentValue+'&#37;</option>';
        }
        CurrentValue = CurrentValue-10;
      }
      SelectScript += '</select>';
      return SelectScript;
    }
    else {
      return Value;
    }
  }
  catch(err) {
    ShowError(err, 'InsertSelect()');
  }
}

function CreateResourcesLink(PlanetId) {
  try {
    var Link = ResourcesLink+'&cp='+PlanetId;
    Link += ((document.getElementsByName('last1_'+PlanetId)[0]) ? '&last1='+document.getElementsByName('last1_'+PlanetId)[0].value : '');
    Link += ((document.getElementsByName('last2_'+PlanetId)[0]) ? '&last2='+document.getElementsByName('last2_'+PlanetId)[0].value : '');
    Link += ((document.getElementsByName('last3_'+PlanetId)[0]) ? '&last3='+document.getElementsByName('last3_'+PlanetId)[0].value : '');
    Link += ((document.getElementsByName('last4_'+PlanetId)[0]) ? '&last4='+document.getElementsByName('last4_'+PlanetId)[0].value : '');
    Link += ((document.getElementsByName('last12_'+PlanetId)[0]) ? '&last12='+document.getElementsByName('last12_'+PlanetId)[0].value : '');
    Link += ((document.getElementsByName('last212_'+PlanetId)[0]) ? '&last212='+document.getElementsByName('last212_'+PlanetId)[0].value : '');
    if (PlanetId != A_Planet[PlanetSelectedIndex].Id) {
      AddAction('window.location.replace(|'+Link+'|)');
      if (MenuDiv)
      AddAction('GMsetValue(|OT_OgameEmpire|,true);window.location.replace(|'+MenuDiv.getElementsByTagName('table')[0].rows[SearchRow].cells[0].getElementsByTagName('a')[0].href+'|)');
      window.location.replace(ResourcesLink+'&cp='+A_Planet[PlanetSelectedIndex].Id);
    }
    else {
      if (MenuDiv)
      AddAction('GMsetValue(|OT_OgameEmpire|,true);window.location.replace(|'+MenuDiv.getElementsByTagName('table')[0].rows[SearchRow].cells[0].getElementsByTagName('a')[0].href+'|)');
      window.location.replace(Link);
    }
  }
  catch(err) {
    ShowError(err, 'CreateResourcesLink('+PlanetId+')');
  }
}
unsafeWindow.CreateResourcesLink = CreateResourcesLink;

function CalcEnergy(Group,Element,PlanetIndex) {
  try {
    var EnergyNeeded = 0;
    var Building = (A_Buildings[PlanetIndex][Element].Level&&A_Buildings[PlanetIndex][Element].Level!='-'?parseInt(A_Buildings[PlanetIndex][Element].Level):0);
    var Energy = (A_Research[5].Level&&A_Research[5].Level!='-'?parseInt(A_Research[5].Level):0);
    if ((Group == C_Buildings) && ((Element >= 0) && (Element <= 4))) {
      if (Element == 0 || Element == 1) {
        EnergyNeeded = -Math.ceil(10*(Building+1)*Math.pow(1.1,(Building+1)) - 10*Building*Math.pow(1.1,Building));
      }
      else if (Element == 2) {
        EnergyNeeded = -Math.ceil(20*(Building+1)*Math.pow(1.1,(Building+1)) - 20*Building*Math.pow(1.1,Building));
      }
      else if (Element == 3) {
        EnergyNeeded = Math.ceil(20*(Building+1)*Math.pow(1.1,(Building+1)) - 20*Building*Math.pow(1.1,Building));
      }
      else if (Element == 4) {
        EnergyNeeded = Math.ceil(30*(Building+1)*Math.pow((1.05+Energy*0.01),(Building+1)) - 30*Building*Math.pow((1.05+Energy*0.01),Building));
      }
      return ((EnergyNeeded < 0)?'<br>'+A_Language[C_Energy]+': <font style=color:#ff0000>'+FormatNb(EnergyNeeded)+'</font>':'<br>'+A_Language[C_Energy]+': <font style=color:#00ff00>+'+FormatNb(EnergyNeeded)+'</font>')+'&nbsp;<font style=color:#ff9900>('+(parseInt(A_Resources[PlanetIndex].FreeEnergy)+EnergyNeeded>0?'+':'')+FormatNb(parseInt(A_Resources[PlanetIndex].FreeEnergy)+EnergyNeeded)+')</font>';
    }
    return '';
  }
  catch(err) {
    ShowError(err, 'CalcEnergy('+Group+','+Element+','+PlanetIndex+')');
  }
}

function CalcEvolution(Group,Element,LevelOrQuantity) {
  try {
    var MetalEvo = 0;
    var CrystalEvo = 0;
    var DeuteriumEvo = 0;
    var EnergyEvo = 0;
    // Batiment
    if (Group == C_Buildings) {
      if (Element == 0) {
        MetalEvo = Math.floor((60*(1-Math.pow(1.5,LevelOrQuantity))/(-0.5))-(60*(1-Math.pow(1.5,LevelOrQuantity-1))/(-0.5)));
        CrystalEvo = Math.floor((15*(1-Math.pow(1.5,LevelOrQuantity))/(-0.5))-(15*(1-Math.pow(1.5,LevelOrQuantity-1))/(-0.5)));
      }
      else if (Element == 1) {
        MetalEvo = Math.floor((48*(1-Math.pow(1.6,LevelOrQuantity))/(-0.6))-(48*(1-Math.pow(1.6,LevelOrQuantity-1))/(-0.6)));
        CrystalEvo = Math.floor((24*(1-Math.pow(1.6,LevelOrQuantity))/(-0.6))-(24*(1-Math.pow(1.6,LevelOrQuantity-1))/(-0.6)));
      }
      else if (Element == 2) {
        MetalEvo = Math.floor((225*(1-Math.pow(1.5,LevelOrQuantity))/(-0.5))-(225*(1-Math.pow(1.5,LevelOrQuantity-1))/(-0.5)));
        CrystalEvo = Math.floor((75*(1-Math.pow(1.5,LevelOrQuantity))/(-0.5))-(75*(1-Math.pow(1.5,LevelOrQuantity-1))/(-0.5)));
      }
      else if (Element == 3) {
        MetalEvo = Math.floor((75*(1-Math.pow(1.5,LevelOrQuantity))/(-0.5))-(75*(1-Math.pow(1.5,LevelOrQuantity-1))/(-0.5)));
        CrystalEvo = Math.floor((30*(1-Math.pow(1.5,LevelOrQuantity))/(-0.5))-(30*(1-Math.pow(1.5,LevelOrQuantity-1))/(-0.5)));
      }
      else if (Element == 4) {
        MetalEvo = Math.floor((900*(1-Math.pow(1.8,LevelOrQuantity))/(-0.8))-(900*(1-Math.pow(1.8,LevelOrQuantity-1))/(-0.8)));
        CrystalEvo = Math.floor((360*(1-Math.pow(1.8,LevelOrQuantity))/(-0.8))-(360*(1-Math.pow(1.8,LevelOrQuantity-1))/(-0.8)));
        DeuteriumEvo = Math.floor((180*(1-Math.pow(1.8,LevelOrQuantity))/(-0.8))-(180*(1-Math.pow(1.8,LevelOrQuantity-1))/(-0.8)));
      }
      else {
        MetalEvo = Math.floor((parseInt(A_Construction[Group][Element].Metal)*(-(1-Math.pow(2,LevelOrQuantity))))-(parseInt(A_Construction[Group][Element].Metal)*(-(1-Math.pow(2,LevelOrQuantity-1)))));
        CrystalEvo = Math.floor((parseInt(A_Construction[Group][Element].Crystal)*(-(1-Math.pow(2,LevelOrQuantity))))-(parseInt(A_Construction[Group][Element].Crystal)*(-(1-Math.pow(2,LevelOrQuantity-1)))));
        DeuteriumEvo = Math.floor((parseInt(A_Construction[Group][Element].Deuterium)*(-(1-Math.pow(2,LevelOrQuantity))))-(parseInt(A_Construction[Group][Element].Deuterium)*(-(1-Math.pow(2,LevelOrQuantity-1)))));
        EnergyEvo = Math.floor((parseInt(A_Construction[Group][Element].Energy)*(-(1-Math.pow(2,LevelOrQuantity))))-(parseInt(A_Construction[Group][Element].Energy)*(-(1-Math.pow(2,LevelOrQuantity-1)))));
      }
    }
    // Technologie
    else if (Group == C_Research) {
      if (Element == 15) {
        EnergyEvo = (parseInt(A_Construction[Group][Element].Energy)*Math.pow(3,LevelOrQuantity-1));
      }
      else {
        MetalEvo = parseInt(A_Construction[Group][Element].Metal)*Math.pow(2,LevelOrQuantity-1);
        CrystalEvo = parseInt(A_Construction[Group][Element].Crystal)*Math.pow(2,LevelOrQuantity-1);
        DeuteriumEvo = parseInt(A_Construction[Group][Element].Deuterium)*Math.pow(2,LevelOrQuantity-1);
        EnergyEvo = parseInt(A_Construction[Group][Element].Energy)*Math.pow(2,LevelOrQuantity-1);
      }
    }
    // Defense et Flotte
    else if ((Group == C_Defenses) || (Group == C_Fleets)) {
      MetalEvo = parseInt(A_Construction[Group][Element].Metal)*LevelOrQuantity;
      CrystalEvo = parseInt(A_Construction[Group][Element].Crystal)*LevelOrQuantity;
      DeuteriumEvo = parseInt(A_Construction[Group][Element].Deuterium)*LevelOrQuantity;
    }
    
    return MetalEvo+'|'+CrystalEvo+'|'+DeuteriumEvo+'|'+EnergyEvo;
  }
  catch(err) {
    ShowError(err, 'CalcEvolution('+Group+', '+Element+', '+LevelOrQuantity+')');
  }
}

function CalcBuildingTime(Group,Metal,Crystal,CrystalSat,PlanetIndex,Quantity) {
  try {
    var Time = 0;
    var RobotFactory = ((A_Buildings[PlanetIndex][5].Level)&&(A_Buildings[PlanetIndex][5].Level)!='-'?A_Buildings[PlanetIndex][5].Level:0);
    var NanitesFactory = ((A_Buildings[PlanetIndex][6].Level)&&(A_Buildings[PlanetIndex][6].Level)!='-'?A_Buildings[PlanetIndex][6].Level:0);
    var Shipyard = ((A_Buildings[PlanetIndex][7].Level)&&(A_Buildings[PlanetIndex][7].Level)!='-'?A_Buildings[PlanetIndex][7].Level:0);
    var Laboratory = ((A_Buildings[PlanetIndex][11].Level)&&(A_Buildings[PlanetIndex][11].Level)!='-'?A_Buildings[PlanetIndex][11].Level:0);
    var TimeSat = ((CrystalSat)/5000) * (2/(1+parseInt(Shipyard))) * Math.pow(0.5,parseInt(NanitesFactory));
    if (Group == C_Buildings) {
      
      Time = ((Metal+Crystal)/5000) * (2/(1+parseInt(RobotFactory))) * Math.pow(0.5,parseInt(NanitesFactory));
    }
    else if (Group == C_Research) {
      var NbLaboratory, LaboratoryCumul = 0;
      var A_Laboratory = new Array();
      for (j = 0; j < PlanetSelect.length; j++) {
        if (j != PlanetIndex) {
          A_Laboratory[LaboratoryCumul] = ((A_Buildings[j][11].Level)&&(A_Buildings[j][11].Level)!='-'?A_Buildings[j][11].Level:0);
          LaboratoryCumul++;
        }
      }
      LaboratoryCumul = 0;
      A_Laboratory.sort(SortNumber);
      for (j = 0; j < (A_Research[13].Level&&A_Research[13].Level!='-'?A_Research[13].Level:0); j++) {
        LaboratoryCumul = LaboratoryCumul+parseInt(A_Laboratory[A_Laboratory.length-1-j]);
      }
      Time = ((Metal+Crystal) / (1000*(1+parseInt(Laboratory)+LaboratoryCumul)));
    }
    else if (Quantity) {
      Time = ((Metal+Crystal)/5000) * (2/(1+parseInt(Shipyard))) * Math.pow(0.5,parseInt(NanitesFactory)) * Quantity;
    }
    return FormatTime(Time*3600000)+'|'+FormatTime(TimeSat*3600000);
  }
  catch(err) {
    ShowError(err, 'CalcBuildingTime('+Group+','+Metal+','+Crystal+','+CrystalSat+','+PlanetIndex+','+Quantity+')');
  }
}
unsafeWindow.CalcBuildingTime = CalcBuildingTime;

function CalcMissingResources(Metal,Crystal,Deuterium) {
  try {
    var Result = (Metal>0 ? A_Language[C_Metal]+':&nbsp;'+FormatNb(Metal)+'<br>' : '')+
    (Crystal>0 ? A_Language[C_Crystal]+':&nbsp;'+FormatNb(Crystal)+'<br>' : '')+
    (Deuterium>0 ? A_Language[C_Deuterium]+':&nbsp;'+FormatNb(Deuterium) : '');
    if (document.getElementById('MissingResourcesTr')) {
      if (Result.length > 0) {
        document.getElementById('MissingResourcesTr').style.display = '';
      }
      else {
        document.getElementById('MissingResourcesTr').style.display = 'none';
      }
    }
    return Result;
  }
  catch(err) {
    ShowError(err, 'CalcMissingResources('+Group+','+Metal+','+Crystal+','+Deuterium+','+Quantity+')');
  }
}
unsafeWindow.CalcMissingResources = CalcMissingResources;

function CalcTransportShip(Metal,Crystal,Deuterium) {
  try {
    Metal = (Metal>0?Metal:0);
    Crystal = (Crystal>0?Crystal:0);
    Deuterium = (Deuterium>0?Deuterium:0);
    if ((Metal+Crystal+Deuterium) > 0) {
      if (document.getElementById('TransportShipTr')) { document.getElementById('TransportShipTr').style.display = ''; }
      return A_Language[C_LargeCargoShip]+': '+FormatNb(Math.ceil((Metal+Crystal+Deuterium)/25000))+', '+
      A_Language[C_SmallCargoShip]+': '+FormatNb(Math.ceil((Metal+Crystal+Deuterium)/5000));
    }
    if (document.getElementById('TransportShipTr')) { document.getElementById('TransportShipTr').style.display = 'none'; }
    return '';
  }
  catch(err) {
    ShowError(err, 'CalcNeededTransportShip('+Group+','+Metal+','+Crystal+','+Deuterium+','+Quantity+')');
  }
}
unsafeWindow.CalcMissingResources = CalcMissingResources;

function RefreshCalc(Id,Group,Metal,Crystal,Deuterium,PlanetIndex) {
  try {
    Get = CalcBuildingTime(Group,Metal,Crystal,0,PlanetIndex,document.getElementsByName(Id)[0].value);
    A_Get = String(Get).split(Separator);
    document.getElementById('BuildingTime').textContent = A_Language[C_BuildingTime]+': '+A_Get[0];
    if (UseRealTimeResourcesEmpire == true && RealTimeResources == true && (ShowHeaderResourcesTable == true || ForceDisplayHeaderResourcesTableWithEmpire == true)) {
      if (A_RealTimeResources[PlanetIndex].Metal) {
        Metal = (Metal*document.getElementsByName(Id)[0].value)-A_RealTimeResources[PlanetIndex].Metal;
        Crystal = (Crystal*document.getElementsByName(Id)[0].value)-A_RealTimeResources[PlanetIndex].Crystal;
        Deuterium = (Deuterium*document.getElementsByName(Id)[0].value)-A_RealTimeResources[PlanetIndex].Deuterium;
        Metal = (Metal>0?Metal:0);
        Crystal = (Crystal>0?Crystal:0);
        Deuterium = (Deuterium>0?Deuterium:0);
        document.getElementById('MissingResources').innerHTML = CalcMissingResources(Metal,Crystal,Deuterium);
        document.getElementById('TransportShip').innerHTML = CalcTransportShip(Metal,Crystal,Deuterium);
      }
    }
    else {
      if (A_Resources[PlanetIndex].Metal) {
        Metal = (Metal*document.getElementsByName(Id)[0].value)-A_Resources[PlanetIndex].Metal;
        Crystal = (Crystal*document.getElementsByName(Id)[0].value)-A_Resources[PlanetIndex].Crystal;
        Deuterium = (Deuterium*document.getElementsByName(Id)[0].value)-A_Resources[PlanetIndex].Deuterium;
        Metal = (Metal>0?Metal:0);
        Crystal = (Crystal>0?Crystal:0);
        Deuterium = (Deuterium>0?Deuterium:0);
        document.getElementById('MissingResources').innerHTML = CalcMissingResources(Metal,Crystal,Deuterium);
        document.getElementById('TransportShip').innerHTML = CalcTransportShip(Metal,Crystal,Deuterium);
      }
    }
  }
  catch(err) {
    ShowError(err, 'RefreshCalc('+Id+','+Group+','+Metal+','+Crystal+','+PlanetIndex+')');
  }
}
unsafeWindow.RefreshCalc = RefreshCalc;

// Prechargement lien fonction AddOverLib
if ((OgamePage != 'galaxy') && (HeaderDiv)) {
  try {
    // Lien vers page et texte correspondant
    var A_OverLib = new Array();
    A_OverLib[C_Buildings] = new P_OverLib();
    A_OverLib[C_Buildings].Text = A_Language[C_ToBuildings];
    A_OverLib[C_Buildings].Link = 'page=b_building';
    A_OverLib[C_Defenses] = new P_OverLib();
    A_OverLib[C_Defenses].Text = A_Language[C_ToDefenses];
    A_OverLib[C_Defenses].Link = 'page=buildings&mode=Verteidigung';
    A_OverLib[C_Research] = new P_OverLib();
    A_OverLib[C_Research].Text = A_Language[C_ToResearch];
    A_OverLib[C_Research].Link = 'page=buildings&mode=Forschung';
    A_OverLib[C_Fleets] = new P_OverLib();
    A_OverLib[C_Fleets].Text = A_Language[C_ToFleets];
    A_OverLib[C_Fleets].Link = 'page=buildings&mode=Flotte';
    
    // Calcul du total des ressources
    var MetalTotal = 0;
    var CrystalTotal = 0;
    var DeuteriumTotal= 0;
    for (i = 0;i < PlanetSelect.length; i++) {
      if (A_Resources[i].Metal) {
        MetalTotal = MetalTotal + parseInt(A_Resources[i].Metal);
        CrystalTotal = CrystalTotal + parseInt(A_Resources[i].Crystal);
        DeuteriumTotal = DeuteriumTotal + parseInt(A_Resources[i].Deuterium);
      }
    }
  }
  catch(err) {
    ShowError(err, 'Init OverLib variables and calculate resources total');
  }
}

function AddOverLib(Value, Group, Element, PlanetIndex, UnderConstructionValue) {
  
  // Calcul du cout du prochain niveau (Batiment, technologie) ou du cout de construction (Flotte, defense)
  var Res = CalcEvolution(Group,Element,(((Group == C_Defenses) || (Group == C_Fleets)) ? 1 : (parseInt(((Value == '-') ? 0 : Value))+1)));
  if (Res) {
    var Res = Res.split(Separator);
    if (Res) {
      var MetalEvo = parseInt(Res[0]);
      var CrystalEvo = parseInt(Res[1]);
      var DeuteriumEvo = parseInt(Res[2]);
      var EnergyEvo = parseInt(Res[3]);
      
      if (PlanetIndex < PlanetSelect.length) {
        // Comparaison avec les ressources de toutes les planetes
        var VerifSup = true;
        var FontColor = ' color="#FF0000"';
        if (MetalTotal < MetalEvo) {
          VerifSup = false;
        }
        if (CrystalTotal < CrystalEvo) {
          VerifSup = false;
        }
        if (DeuteriumTotal < DeuteriumEvo) {
          VerifSup = false;
        }
        var Energy = A_Resources[i].TotalEnergy;
        if (Energy) {
          if (Energy < EnergyEvo) {
            VerifSup = false;
          }
        }
        if (VerifSup == true) {
          FontColor = ' color="#FF9900"';
        }
        
        // Comparaison avec les ressources de la planete
        if (Energy) {
          if (A_Resources[PlanetIndex].Metal < MetalEvo) {
            VerifSup = false;
          }
          if (A_Resources[PlanetIndex].Crystal < CrystalEvo) {
            VerifSup = false;
          }
          if (A_Resources[PlanetIndex].Deuterium < DeuteriumEvo) {
            VerifSup = false;
          }
          if (Energy < EnergyEvo) {
            VerifSup = false;
          }
          if (VerifSup == true) {
            FontColor = ' color="#00FF00"';
          }
        }
      }
      else {
        var FontColor = '';
      }
      
      if (UnderConstructionValue) {
        if (Group == C_Research) {
          if (A_Planet[PlanetIndex].Id == UnderConstructionValue) {
            UnderConstructionValue = parseInt(A_Research[Element].Level)+1;
          }
          else {
            UnderConstructionValue = undefined;
          }
        }
      }
      
      return '<a style="cursor:pointer" onclick="overlib(OverLibFunction(\''+Value+'\','+Group+','+Element+','+PlanetIndex+','+((UnderConstructionValue > 0) ? UnderConstructionValue : undefined)+'), STICKY, MOUSEOFF, 100, 750, CENTER, OFFSETX, -40, OFFSETY, -40);" onmouseover="overlib(OverLibFunction(\''+Value+'\','+Group+','+Element+','+PlanetIndex+','+((UnderConstructionValue > 0) ? UnderConstructionValue : undefined)+'), STICKY, MOUSEOFF, DELAY, 750, CENTER, OFFSETX, -40, OFFSETY, -40);" onmouseout="return nd();"><font'+FontColor+'>'+FormatNb(Value)+'</font>'+(((UnderConstructionValue != '-') && (UnderConstructionValue)) ? ' <font color="#FF00FF">('+FormatNb(UnderConstructionValue)+')</font>' : '')+'</a>';
    }
  }
}

function SetTransferValue(Metal, Crystal, Deuterium, PlanetIndex) {
  TransferShow = true;
  TransferMetal = Metal;
  TransferCrystal = Crystal;
  TransferDeuterium = Deuterium;
  if (PlanetIndex) {
    TransferDestinationPlanet = A_Planet[PlanetIndex].Planet;
    TransferDestinationSystem = A_Planet[PlanetIndex].System;
    TransferDestinationGalaxy = A_Planet[PlanetIndex].Galaxy;
    TransferDestinationType = A_Planet[PlanetIndex].Type;
  }
  SaveTransfer();
}
unsafeWindow.SetTransferValue = SetTransferValue;

// Optimisation afin d'eviter la perte de temps due a la concatenation des objets au chargement de la page
// et permet de charger uniquement l'objet voulu
function OverLibFunction(Value, Group, Element, PlanetIndex, UnderConstructionValue) {
  
  try {
    var Action;
    // Calcul du cout du prochain niveau (Batiment, technologie) ou du cout de construction (Flotte, defense)
    var Res = CalcEvolution(Group,Element,(((Group == C_Defenses) || (Group == C_Fleets)) ? 1 : (parseInt(((Value == '-') ? 0 : Value))+1)));
    
    Res = Res.split(Separator);
    var MetalEvo = parseInt(Res[0]);
    var CrystalEvo = parseInt(Res[1]);
    var DeuteriumEvo = parseInt(Res[2]);
    var EnergyEvo = parseInt(Res[3]);
    
    // Mise en forme du resultat
    var ResCalc = '';
    if (MetalEvo != 0) {
      ResCalc += A_Language[C_Metal]+': '+FormatNb((((Group == C_Defenses) || (Group == C_Fleets)) ? MetalEvo*parseInt(((Value == '-') ? 0 : Value)) : MetalEvo));
    }
    if (CrystalEvo != 0) {
      ResCalc += ((ResCalc.length > 0) ? '<br>' : '')+A_Language[C_Crystal]+': '+FormatNb((((Group == C_Defenses) || (Group == C_Fleets)) ? CrystalEvo*parseInt(((Value == '-') ? 0 : Value)) : CrystalEvo));
    }
    if (DeuteriumEvo != 0) {
      ResCalc += ((ResCalc.length > 0) ? '<br>' : '')+A_Language[C_Deuterium]+': '+FormatNb((((Group == C_Defenses) || (Group == C_Fleets)) ? DeuteriumEvo*parseInt(((Value == '-') ? 0 : Value)) : DeuteriumEvo));
    }
    if (EnergyEvo != 0) {
      ResCalc += ((ResCalc.length > 0) ? '<br>' : '')+A_Language[C_Energy]+': '+FormatNb(EnergyEvo);
    }
    
    if (PlanetIndex < PlanetSelect.length) {
      
      if (UseRealTimeResourcesEmpire == true && RealTimeResources == true && (ShowHeaderResourcesTable == true || ForceDisplayHeaderResourcesTableWithEmpire == true)) {
        var Metal = A_RealTimeResources[PlanetIndex].Metal;
        var Crystal = A_RealTimeResources[PlanetIndex].Crystal;
        var Deuterium = A_RealTimeResources[PlanetIndex].Deuterium;
        MetalTotal = A_RealTimeResources[PlanetSelect.length].Metal;
        CrystalTotal = A_RealTimeResources[PlanetSelect.length].Crystal;
        DeuteriumTotal = A_RealTimeResources[PlanetSelect.length].Deuterium;
      }
      else {
        var Metal = A_Resources[PlanetIndex].Metal;
        var Crystal = A_Resources[PlanetIndex].Crystal;
        var Deuterium = A_Resources[PlanetIndex].Deuterium;
      }
      var Energy = A_Resources[PlanetIndex].TotalEnergy;
    
      // Nombre de satellites pour graviton et terraformeur
      var CrystalSat = 0;
      var DeuteriumSat = 0;
      if (((Group == C_Research) && (Element == 15)) || ((Group == C_Buildings) && (Element == 12))) {
        var EnergyNeeded = EnergyEvo-Energy;
        if (EnergyNeeded > 0) {
          var EnergyPerSat = Math.floor((parseInt(A_Planet[PlanetIndex].MaxTemperature)/4)+20);
          CrystalSat = A_Construction[C_Fleets][10].Crystal*Math.ceil(EnergyNeeded/EnergyPerSat);
          DeuteriumSat = A_Construction[C_Fleets][10].Deuterium*Math.ceil(EnergyNeeded/EnergyPerSat);
          if (Group == C_Research) {
            ResCalc = A_Language[C_Crystal]+': <font color="#FF9900">'+FormatNb(CrystalSat)+'</font>'+
            '<br>'+A_Language[C_Deuterium]+': <font color="#FF9900">'+FormatNb(DeuteriumSat)+'</font>';
          }
          else {
            ResCalc = '<br>'+A_Language[C_Crystal]+': '+FormatNb(CrystalEvo)+' <font color="#FF9900">'+FormatNb(CrystalSat)+'</font>'+
            '<br>'+A_Language[C_Deuterium]+': '+FormatNb(DeuteriumEvo)+' <font color="#FF9900">'+FormatNb(DeuteriumSat)+'</font>';
          }
          ResCalc += '<br><br>'+A_Language[C_Ship212Production]+' : <font color="#FF9900">'+EnergyPerSat+'</font><br>'+A_Language[C_Ship212NecessaryNumber]+' : <font color="#FF9900">'+FormatNb(Math.ceil(EnergyNeeded/EnergyPerSat))+'</font>';
        }
      }
      
      // Comparaison avec les ressources de toutes les planetes
      var MetalBuildTotalNumber = -1;
      var CrystalBuildTotalNumber = -1;
      var DeuteriumBuildTotalNumber = -1;
      var VerifSup = true;
      var FontColor = ' color="#FF0000"';
      if (MetalTotal < MetalEvo) {
        VerifSup = false;
      }
      if (CrystalTotal < CrystalEvo+CrystalSat) {
        VerifSup = false;
      }
      if (DeuteriumTotal < DeuteriumEvo+DeuteriumSat) {
        VerifSup = false;
      }
      if (Energy) {
        if (Energy < EnergyEvo) {
          VerifSup = false;
        }
      }
      if (VerifSup == true) {
        FontColor = ' color="#FF9900"';
        if ((Group == C_Defenses) || (Group == C_Fleets)) {
          if (MetalEvo > 0) {
            MetalBuildTotalNumber = Math.floor(MetalTotal/MetalEvo);
          }
          if (CrystalEvo+CrystalSat > 0) {
            CrystalBuildTotalNumber = Math.floor(CrystalTotal/(CrystalEvo+CrystalSat));
          }
          if (DeuteriumEvo+DeuteriumSat > 0) {
            DeuteriumBuildTotalNumber = Math.floor(DeuteriumTotal/(DeuteriumEvo+DeuteriumSat));
          }
        }
      }
      
      // Calcul du nombre de construction possible avec les ressources de toutes les planetes
      if ((Group == C_Defenses) || (Group == C_Fleets)) {
        var A_BuildNumber = new Array();
        A_BuildNumber[0] = MetalBuildTotalNumber;
        A_BuildNumber[1] = CrystalBuildTotalNumber;
        A_BuildNumber[2] = DeuteriumBuildTotalNumber;
        A_BuildNumber.sort(SortNumber);
        var MaxBuildTotal = -1;
        for (j = 0; j < A_BuildNumber.length; j++) {
          if (MaxBuildTotal == -1) {
            if (A_BuildNumber[j] > -1) {
              MaxBuildTotal = A_BuildNumber[j];
            }
          }
        }
      }
      
      // Comparaison avec les ressources de la planete
      var MetalBuildPlanetNumber = -1;
      var CrystalBuildPlanetNumber = -1;
      var DeuteriumBuildPlanetNumber = -1;
      if (Metal) {
        if (Metal < MetalEvo) {
          VerifSup = false;
        }
        if (Crystal < CrystalEvo+CrystalSat) {
          VerifSup = false;
        }
        if (Deuterium < DeuteriumEvo+DeuteriumSat) {
          VerifSup = false;
        }
        if (Energy < EnergyEvo) {
          VerifSup = false;
        }
        if (VerifSup == true) {
          FontColor = ' color="#00FF00"';
          if ((Group == C_Defenses) || (Group == C_Fleets)) {
            if (MetalEvo > 0) {
              MetalBuildPlanetNumber = Math.floor(Metal/MetalEvo);
            }
            if (CrystalEvo > 0) {
              CrystalBuildPlanetNumber = Math.floor(Crystal/CrystalEvo);
            }
            if (DeuteriumEvo > 0) {
              DeuteriumBuildPlanetNumber = Math.floor(Deuterium/DeuteriumEvo);
            }
          }
        }
      }
      
      // Calcul du nombre de construction possible avec les ressources de la planete
      if ((Group == C_Defenses) || (Group == C_Fleets)) {
        var A_BuildNumber = new Array();
        A_BuildNumber[0] = MetalBuildPlanetNumber;
        A_BuildNumber[1] = CrystalBuildPlanetNumber;
        A_BuildNumber[2] = DeuteriumBuildPlanetNumber;
        A_BuildNumber.sort(SortNumber);
        var MaxBuildPlanet = -1;
        for (j = 0; j < A_BuildNumber.length; j++) {
          if (MaxBuildPlanet == -1) {
            if (A_BuildNumber[j] > -1) {
              MaxBuildPlanet = A_BuildNumber[j];
            }
          }
        }
      }
      
      // Recherche si un batiment est en cours de construction sur la planete
      if ((FontColor == ' color="#00FF00"') && (Group == C_Buildings)) {
        var UnderConstruction = false;
        for (j = 0; j < 18; j++) {
          if (A_Buildings[PlanetIndex][j].UC > 0) { UnderConstruction = true; }
        }
      }
      // Recherche si un developement est en cours de recherche sur toutes les planetes
      else if ((FontColor == ' color="#00FF00"') && (Group == C_Research)) {
        var UnderConstruction = false;
        for (j = 0; j < 16; j++) {
          if (A_Research[j].UC != '-') { UnderConstruction = true; }
        }
      }
      
      // Verification si la construction est possible
      var Launch = ValidateBuilding(Group, Element, PlanetIndex);
      
      // Calcul du temps avant la possibilite de construction
      var TimeBeforeBuilding = '';
      if (((FontColor == ' color="#FF9900"') || (FontColor == ' color="#FF0000"')) && (Launch.length == 0)) {
        if (A_Planet[PlanetIndex].Type == C_Planet) {
          var A_MaxTime = new Array();
          A_MaxTime[0] = Math.round((MetalEvo-Metal)/(A_Production[PlanetIndex].Metal/3600)*1000);
          A_MaxTime[1] = Math.round((CrystalEvo-Crystal)/(A_Production[PlanetIndex].Crystal/3600)*1000);
          A_MaxTime[2] = Math.round((DeuteriumEvo-Deuterium)/(A_Production[PlanetIndex].Deuterium/3600)*1000);
          A_MaxTime.sort(SortNumber);
          TimeBeforeBuilding += '<tr><td class="c" colspan="2">'+A_Language[C_ConstructionAvailable]+' :</td></tr>\n'+
          '<tr><th colspan="2">'+A_Language[C_WithPlanetResources]+' : '+FormatTime(A_MaxTime[2])+'</th></tr>';
        }
        else if (FontColor == ' color="#FF0000"') {
          TimeBeforeBuilding += '<tr><td class="c" colspan="2">'+A_Language[C_ConstructionAvailable]+' :</td></tr>\n';
        }
        if (FontColor == ' color="#FF0000"') {
          var A_MaxTime = new Array();
          A_MaxTime[0] = Math.round((MetalEvo-MetalTotal)/(MetalProductionTotal/3600)*1000);
          A_MaxTime[1] = Math.round((CrystalEvo-CrystalTotal)/(CrystalProductionTotal/3600)*1000);
          A_MaxTime[2] = Math.round((DeuteriumEvo-DeuteriumTotal)/(DeuteriumProductionTotal/3600)*1000);
          A_MaxTime.sort(SortNumber);
          TimeBeforeBuilding += '<tr><th colspan="2">'+A_Language[C_WithAllPlanetsResources]+' : '+FormatTime(A_MaxTime[2])+'</th></tr>';
        }
      }
      
      
      // Ajout du lien pour la realisation du batiment ou de la recherche
      if (Launch.length > 0) {
        Launch = '<br></th></tr><tr><td class="c" colspan="2">'+A_Language[C_Require]+'</td></tr>\n'+
        '<tr><th colspan="2"><font color="#FF0000">'+Launch+'</font></th></tr>';
      }
      else {
        if ((UnderConstruction == true) && (!UnderConstructionValue) && (Group == C_Buildings)) {
          Launch = '<br></th></tr><tr><td class="c" colspan="2">'+A_Language[C_BuildingsTxt]+'</td></tr>\n'+
          '<tr><th colspan="2"><font color="#FF0000">'+A_Language[C_OtherBuildingsInConstruction]+'</font></th></tr>';
        }
        else if ((UnderConstruction == true) && (!UnderConstructionValue) && (Group == C_Research)) {
          Launch = '<br></th></tr><tr><td class="c" colspan="2">'+A_Language[C_ResearchTxt]+'</td></tr>\n'+
          '<tr><th colspan="2"><font color="#FF0000">'+A_Language[C_OtherResearchInDevelopment]+'</font></th></tr>';
        }
        else if (UnderConstructionValue > 0) {
          if (Group == C_Buildings) {
            Action = '';
            if (PlanetIndex != PlanetSelectedIndex) {
              Action = 'AddAction(\'GMsetValue(|OT_OgameEmpire|,true);window.location.replace(|'+BaseUrl+'?'+A_OverLib[Group].Link+'&session='+Session+'&listid=1&modus=remove&planet='+A_Planet[PlanetIndex].Id+'&cp='+A_Planet[PlanetIndex].Id+'&techid='+A_Construction[Group][Element].Id+'|)\');'+
              'window.location.replace(\''+BaseUrl+'?'+A_OverLib[Group].Link+'&session='+Session+'&cp='+A_Planet[PlanetSelectedIndex].Id+'\');';
            }
            else {
              Action = 'GMsetValue(\'OT_OgameEmpire\',true);window.location.replace(\''+BaseUrl+'?'+A_OverLib[Group].Link+'&session='+Session+'&listid=1&modus=remove&planet='+A_Planet[PlanetIndex].Id+'&cp='+A_Planet[PlanetIndex].Id+'&techid='+A_Construction[Group][Element].Id+'\')';
            }
            Launch = '<br><br><a style="cursor:pointer" onclick="'+Action+'" >'+A_Language[C_StopBuildings]+'</a></th></tr>';
          }
          else if (Group == C_Research) {
            Action = '';
            if (PlanetIndex != PlanetSelectedIndex) {
              Action = 'AddAction(\'GMsetValue(|OT_OgameEmpire|,true);window.location.replace(|'+BaseUrl+'?'+A_OverLib[Group].Link+'&session='+Session+'&cp='+A_Planet[PlanetIndex].Id+'&unbau='+A_Construction[Group][Element].Id+'|)\');'+
              'window.location.replace(\''+BaseUrl+'?'+A_OverLib[Group].Link+'&session='+Session+'&cp='+A_Planet[PlanetSelectedIndex].Id+'\')';
            }
            else {
              Action = 'GMsetValue(\'OT_OgameEmpire\',true);window.location.replace(\''+BaseUrl+'?'+A_OverLib[Group].Link+'&session='+Session+'&cp='+A_Planet[PlanetIndex].Id+'&unbau='+A_Construction[Group][Element].Id+'\')';
            }
            Launch = '<br><br><a style="cursor:pointer" onclick="'+Action+'" >'+A_Language[C_StopResearch]+'</a></th></tr>';
          }
        }
        else {
          if (FontColor == ' color="#00FF00"') {
            // Batiment
            if (Group == C_Buildings) {
              Action = '';
              if (PlanetIndex != PlanetSelectedIndex) {
                Action = 'AddAction(\'GMsetValue(|OT_OgameEmpire|,true);window.location.replace(|'+BaseUrl+'?'+A_OverLib[Group].Link+'&session='+Session+'&modus=add&planet='+A_Planet[PlanetIndex].Id+'&cp='+A_Planet[PlanetIndex].Id+'&techid='+A_Construction[Group][Element].Id+'|)\');'+
                'window.location.replace(\''+BaseUrl+'?'+A_OverLib[Group].Link+'&session='+Session+'&cp='+A_Planet[PlanetSelectedIndex].Id+'\');';
              }
              else {
                Action = 'GMsetValue(\'OT_OgameEmpire\',true);window.location.replace(\''+BaseUrl+'?'+A_OverLib[Group].Link+'&session='+Session+'&modus=add&planet='+A_Planet[PlanetIndex].Id+'&cp='+A_Planet[PlanetIndex].Id+'&techid='+A_Construction[Group][Element].Id+'\')';
              }
              Launch = '<br><br><a style="cursor:pointer" onclick="'+Action+'" >'+A_Language[C_LaunchBuildings]+'</a></th></tr>';
            }
            // Technologie
            else if (Group == C_Research) {
              Action = '';
              if (PlanetIndex != PlanetSelectedIndex) {
                Action = 'AddAction(\'GMsetValue(|OT_OgameEmpire|,true);window.location.replace(|'+BaseUrl+'?'+A_OverLib[Group].Link+'&session='+Session+'&cp='+A_Planet[PlanetIndex].Id+'&bau='+A_Construction[Group][Element].Id+'|)\');'+
                'window.location.replace(\''+BaseUrl+'?'+A_OverLib[Group].Link+'&session='+Session+'&cp='+A_Planet[PlanetSelectedIndex].Id+'\')';
              }
              else {
                Action = 'GMsetValue(\'OT_OgameEmpire\',true);window.location.replace(\''+BaseUrl+'?'+A_OverLib[Group].Link+'&session='+Session+'&cp='+A_Planet[PlanetIndex].Id+'&bau='+A_Construction[Group][Element].Id+'\')';
              }
              Launch = '<br><br><a style="cursor:pointer" onclick="'+Action+'" >'+A_Language[C_LaunchResearch]+'</a></th></tr>';
            }
            // Defense
            else if (Group == C_Defenses) {
              Launch = '<br></th></tr><tr><td class="c" colspan="2">'+A_Language[C_WithPlanetResources]+'</td></tr>'+
              '<tr><th colspan="2"><input size="6" type="text" name="BuildNumberPlanet" '+NoStringInput+' value="0" onkeypress="RefreshCalc(\'BuildNumberPlanet\','+Group+','+MetalEvo+','+CrystalEvo+','+DeuteriumEvo+','+PlanetIndex+')" />&nbsp;'+
              '<a style="cursor:pointer" '+((AddToolTip == true)?'title="-1"':'')+' onclick="document.getElementsByName(\'BuildNumberPlanet\')[0].value=parseInt(document.getElementsByName(\'BuildNumberPlanet\')[0].value)-1;RefreshCalc(\'BuildNumberPlanet\','+Group+','+MetalEvo+','+CrystalEvo+','+DeuteriumEvo+','+PlanetIndex+')">\253</a>&nbsp;'+
              '<a style="cursor:pointer" '+((AddToolTip == true)?'title="0"':'')+' onclick="document.getElementsByName(\'BuildNumberPlanet\')[0].value=0;RefreshCalc(\'BuildNumberPlanet\','+Group+','+MetalEvo+','+CrystalEvo+','+DeuteriumEvo+','+PlanetIndex+')">@</a>&nbsp;'+
              '<a style="cursor:pointer" '+((AddToolTip == true)?'title="Max"':'')+' onclick="document.getElementsByName(\'BuildNumberPlanet\')[0].value='+MaxBuildPlanet+';RefreshCalc(\'BuildNumberPlanet\','+Group+','+MetalEvo+','+CrystalEvo+','+DeuteriumEvo+','+PlanetIndex+')">[max '+FormatNb(MaxBuildPlanet)+']</a>&nbsp;'+
              '<a style="cursor:pointer" '+((AddToolTip == true)?'title="+1"':'')+' onclick="document.getElementsByName(\'BuildNumberPlanet\')[0].value=parseInt(document.getElementsByName(\'BuildNumberPlanet\')[0].value)+1;RefreshCalc(\'BuildNumberPlanet\','+Group+','+MetalEvo+','+CrystalEvo+','+DeuteriumEvo+','+PlanetIndex+')">\273</a>&nbsp;'+
              '</th></tr>\n';
              Action = '';
              if (PlanetIndex != PlanetSelectedIndex) {
                Action = 'AddAction(\'GMsetValue(|OT_OgameEmpire|,true);window.location.replace(|'+BaseUrl+'?'+A_OverLib[Group].Link+'&session='+Session+'&cp='+A_Planet[PlanetIndex].Id+'&fmenge['+A_Construction[Group][Element].Id+']=\'+document.getElementsByName(\'BuildNumberPlanet\')[0].value+\'|)\');'+
                'window.location.replace(\''+BaseUrl+'?'+A_OverLib[Group].Link+'&session='+Session+'&cp='+A_Planet[PlanetSelectedIndex].Id+'\')';
              }
              else {
                Action = 'GMsetValue(\'OT_OgameEmpire\',true);window.location.replace(\''+BaseUrl+'?'+A_OverLib[Group].Link+'&session='+Session+'&cp='+A_Planet[PlanetIndex].Id+'&fmenge['+A_Construction[Group][Element].Id+']=\'+document.getElementsByName(\'BuildNumberPlanet\')[0].value)';
              }
              Launch += '<tr><th colspan="2"><a style="cursor:pointer" onclick="'+Action+'" >'+A_Language[C_BuildDefenses]+'</a>\n<br></th></tr>'+
              '<tr><td class="c" colspan="2">'+A_Language[C_WithAllPlanetsResources]+'</td></tr>'+
              '<tr><th colspan="2"><input size="6" type="text" name="BuildNumberTotal" '+NoStringInput+' value="0" onkeypress="RefreshCalc(\'BuildNumberTotal\','+Group+','+MetalEvo+','+CrystalEvo+','+DeuteriumEvo+','+PlanetIndex+')" />&nbsp;'+
              '<a style="cursor:pointer" '+((AddToolTip == true)?'title="-1"':'')+' onclick="document.getElementsByName(\'BuildNumberTotal\')[0].value=parseInt(document.getElementsByName(\'BuildNumberTotal\')[0].value)-1;RefreshCalc(\'BuildNumberTotal\','+Group+','+MetalEvo+','+CrystalEvo+','+DeuteriumEvo+','+PlanetIndex+')">\253</a>&nbsp;'+
              '<a style="cursor:pointer" '+((AddToolTip == true)?'title="0"':'')+' onclick="document.getElementsByName(\'BuildNumberTotal\')[0].value=0;RefreshCalc(\'BuildNumberTotal\','+Group+','+MetalEvo+','+CrystalEvo+','+DeuteriumEvo+','+PlanetIndex+')">@</a>&nbsp;'+
              '<a style="cursor:pointer" '+((AddToolTip == true)?'title="Max"':'')+' onclick="document.getElementsByName(\'BuildNumberTotal\')[0].value='+MaxBuildTotal+';RefreshCalc(\'BuildNumberTotal\','+Group+','+MetalEvo+','+CrystalEvo+','+DeuteriumEvo+','+PlanetIndex+')">[max '+FormatNb(MaxBuildTotal)+']</a>&nbsp;'+
              '<a style="cursor:pointer" '+((AddToolTip == true)?'title="+1"':'')+' onclick="document.getElementsByName(\'BuildNumberTotal\')[0].value=parseInt(document.getElementsByName(\'BuildNumberTotal\')[0].value)+1;RefreshCalc(\'BuildNumberTotal\','+Group+','+MetalEvo+','+CrystalEvo+','+DeuteriumEvo+','+PlanetIndex+')">\273</a>&nbsp;'+
              '</th></tr>\n';
              Action = 'SetTransferValue((document.getElementsByName(\'BuildNumberTotal\')[0].value*'+MetalEvo+'),(document.getElementsByName(\'BuildNumberTotal\')[0].value*'+CrystalEvo+'),(document.getElementsByName(\'BuildNumberTotal\')[0].value*'+DeuteriumEvo+'),'+PlanetIndex+');window.location.replace(\''+BaseUrl+'?page=flotten1&session='+Session+'&cp='+A_Planet[PlanetSelectedIndex].Id+'\');';
              Launch += '<tr><th colspan="2"><a style="cursor:pointer" onclick="'+Action+'" >'+A_Language[C_TransferResources]+'</a>\n</th></tr>';
            }
            // Chantier spatial
            else if (Group == C_Fleets) {
              Launch = '<br></th></tr><tr><td class="c" colspan="2">'+A_Language[C_WithPlanetResources]+'</td></tr>'+
              '<tr><th colspan="2"><input size="6" type="text" name="BuildNumberPlanet" '+NoStringInput+' value="0" onkeypress="RefreshCalc(\'BuildNumberPlanet\','+Group+','+MetalEvo+','+CrystalEvo+','+DeuteriumEvo+','+PlanetIndex+')" />&nbsp;'+
              '<a style="cursor:pointer" '+((AddToolTip == true)?'title="-1"':'')+' onclick="document.getElementsByName(\'BuildNumberPlanet\')[0].value=parseInt(document.getElementsByName(\'BuildNumberPlanet\')[0].value)-1;RefreshCalc(\'BuildNumberPlanet\','+Group+','+MetalEvo+','+CrystalEvo+','+DeuteriumEvo+','+PlanetIndex+')">\253</a>&nbsp;'+
              '<a style="cursor:pointer" '+((AddToolTip == true)?'title="0"':'')+' onclick="document.getElementsByName(\'BuildNumberPlanet\')[0].value=0;RefreshCalc(\'BuildNumberPlanet\','+Group+','+MetalEvo+','+CrystalEvo+','+DeuteriumEvo+','+PlanetIndex+')">@</a>&nbsp;'+
              '<a style="cursor:pointer" '+((AddToolTip == true)?'title="Max"':'')+' onclick="document.getElementsByName(\'BuildNumberPlanet\')[0].value='+MaxBuildPlanet+';RefreshCalc(\'BuildNumberPlanet\','+Group+','+MetalEvo+','+CrystalEvo+','+DeuteriumEvo+','+PlanetIndex+')">[max '+FormatNb(MaxBuildPlanet)+']</a>&nbsp;'+
              '<a style="cursor:pointer" '+((AddToolTip == true)?'title="+1"':'')+' onclick="document.getElementsByName(\'BuildNumberPlanet\')[0].value=parseInt(document.getElementsByName(\'BuildNumberPlanet\')[0].value)+1;RefreshCalc(\'BuildNumberPlanet\','+Group+','+MetalEvo+','+CrystalEvo+','+DeuteriumEvo+','+PlanetIndex+')">\273</a>&nbsp;'+
              '</th></tr>\n';
              Action = '';
              if (PlanetIndex != PlanetSelectedIndex) {
                Action = 'AddAction(\'GMsetValue(|OT_OgameEmpire|,true);window.location.replace(|'+BaseUrl+'?'+A_OverLib[Group].Link+'&session='+Session+'&cp='+A_Planet[PlanetIndex].Id+'&fmenge['+A_Construction[Group][Element].Id+']=\'+document.getElementsByName(\'BuildNumberPlanet\')[0].value+\'|)\');'+
                'window.location.replace(\''+BaseUrl+'?'+A_OverLib[Group].Link+'&session='+Session+'&cp='+A_Planet[PlanetSelectedIndex].Id+'\')';
              }
              else {
                Action = 'GMsetValue(\'OT_OgameEmpire\',true);window.location.replace(\''+BaseUrl+'?'+A_OverLib[Group].Link+'&session='+Session+'&cp='+A_Planet[PlanetIndex].Id+'&fmenge['+A_Construction[Group][Element].Id+']=\'+document.getElementsByName(\'BuildNumberPlanet\')[0].value)';
              }
              Launch += '<tr><th colspan="2"><a style="cursor:pointer" onclick="'+Action+'" >'+A_Language[C_BuildFleets]+'</a>\n<br></th></tr>'+
              '<tr><td class="c" colspan="2">'+A_Language[C_WithAllPlanetsResources]+'</td></tr>'+
              '<tr><th colspan="2"><input size="6" type="text" name="BuildNumberTotal" '+NoStringInput+' value="0" onkeypress="RefreshCalc(\'BuildNumberTotal\','+Group+','+MetalEvo+','+CrystalEvo+','+DeuteriumEvo+','+PlanetIndex+')" />&nbsp;'+
              '<a style="cursor:pointer" '+((AddToolTip == true)?'title="-1"':'')+' onclick="document.getElementsByName(\'BuildNumberTotal\')[0].value=parseInt(document.getElementsByName(\'BuildNumberTotal\')[0].value)-1;RefreshCalc(\'BuildNumberTotal\','+Group+','+MetalEvo+','+CrystalEvo+','+DeuteriumEvo+','+PlanetIndex+')">\253</a>&nbsp;'+
              '<a style="cursor:pointer" '+((AddToolTip == true)?'title="0"':'')+' onclick="document.getElementsByName(\'BuildNumberTotal\')[0].value=0;RefreshCalc(\'BuildNumberTotal\','+Group+','+MetalEvo+','+CrystalEvo+','+DeuteriumEvo+','+PlanetIndex+')">@</a>&nbsp;'+
              '<a style="cursor:pointer" '+((AddToolTip == true)?'title="Max"':'')+' onclick="document.getElementsByName(\'BuildNumberTotal\')[0].value='+MaxBuildTotal+';RefreshCalc(\'BuildNumberTotal\','+Group+','+MetalEvo+','+CrystalEvo+','+DeuteriumEvo+','+PlanetIndex+')">[max '+FormatNb(MaxBuildTotal)+']</a>&nbsp;'+
              '<a style="cursor:pointer" '+((AddToolTip == true)?'title="+1"':'')+' onclick="document.getElementsByName(\'BuildNumberTotal\')[0].value=parseInt(document.getElementsByName(\'BuildNumberTotal\')[0].value)+1;RefreshCalc(\'BuildNumberTotal\','+Group+','+MetalEvo+','+CrystalEvo+','+DeuteriumEvo+','+PlanetIndex+')">\273</a>&nbsp;'+
              '</th></tr>\n';
              Action = 'SetTransferValue((document.getElementsByName(\'BuildNumberTotal\')[0].value*'+MetalEvo+'),(document.getElementsByName(\'BuildNumberTotal\')[0].value*'+CrystalEvo+'),(document.getElementsByName(\'BuildNumberTotal\')[0].value*'+DeuteriumEvo+'),'+PlanetIndex+');window.location.replace(\''+BaseUrl+'?page=flotten1&session='+Session+'&cp='+A_Planet[PlanetSelectedIndex].Id+'\')';
              Launch += '<tr><th colspan="2"><a style="cursor:pointer" onclick="'+Action+'" >'+A_Language[C_TransferResources]+'</a>\n</th></tr>';
            }
          }
          // Ajout du lien vers la page flotte (preremplissage destination, ressources)
          else if (FontColor == ' color="#FF9900"') {
            if ((Group == C_Defenses) || (Group == C_Fleets)) {
              Launch = '<br></th></tr><tr><td class="c" colspan="2">'+A_Language[C_WithAllPlanetsResources]+'</td></tr>'+
              '<tr><th colspan="2"><input size="6" type="text" name="BuildNumberTotal" '+NoStringInput+' value="0" onkeypress="RefreshCalc(\'BuildNumberTotal\','+Group+','+MetalEvo+','+CrystalEvo+','+DeuteriumEvo+','+PlanetIndex+')" />&nbsp;'+
              '<a style="cursor:pointer" '+((AddToolTip == true)?'title="-1"':'')+' onclick="document.getElementsByName(\'BuildNumberTotal\')[0].value=parseInt(document.getElementsByName(\'BuildNumberTotal\')[0].value)-1;RefreshCalc(\'BuildNumberTotal\','+Group+','+MetalEvo+','+CrystalEvo+','+DeuteriumEvo+','+PlanetIndex+')">\253</a>&nbsp;'+
              '<a style="cursor:pointer" '+((AddToolTip == true)?'title="0"':'')+' onclick="document.getElementsByName(\'BuildNumberTotal\')[0].value=0;RefreshCalc(\'BuildNumberTotal\','+Group+','+MetalEvo+','+CrystalEvo+','+DeuteriumEvo+','+PlanetIndex+')">@</a>&nbsp;'+
              '<a style="cursor:pointer" '+((AddToolTip == true)?'title="Max"':'')+' onclick="document.getElementsByName(\'BuildNumberTotal\')[0].value='+MaxBuildTotal+';RefreshCalc(\'BuildNumberTotal\','+Group+','+MetalEvo+','+CrystalEvo+','+DeuteriumEvo+','+PlanetIndex+')">[max '+MaxBuildTotal+']</a>&nbsp;'+
              '<a style="cursor:pointer" '+((AddToolTip == true)?'title="+1"':'')+' onclick="document.getElementsByName(\'BuildNumberTotal\')[0].value=parseInt(document.getElementsByName(\'BuildNumberTotal\')[0].value)+1;RefreshCalc(\'BuildNumberTotal\','+Group+','+MetalEvo+','+CrystalEvo+','+DeuteriumEvo+','+PlanetIndex+')">\273</a>&nbsp;'+
              '</th></tr>\n';
              Action = 'SetTransferValue((document.getElementsByName(\'BuildNumberTotal\')[0].value*'+MetalEvo+'),(document.getElementsByName(\'BuildNumberTotal\')[0].value*'+CrystalEvo+'),(document.getElementsByName(\'BuildNumberTotal\')[0].value*'+DeuteriumEvo+'),'+PlanetIndex+');window.location.replace(\''+BaseUrl+'?page=flotten1&session='+Session+'&cp='+A_Planet[PlanetSelectedIndex].Id+'\')';
              Launch += '<tr><th colspan="2"><a style="cursor:pointer" onclick="'+Action+'" >'+A_Language[C_TransferResources]+'</a>\n</th></tr>';
            }
            else {
              Action = 'SetTransferValue('+MetalEvo+','+CrystalEvo+','+DeuteriumEvo+','+PlanetIndex+');window.location.replace(\''+BaseUrl+'?page=flotten1&session='+Session+'&cp='+A_Planet[PlanetSelectedIndex].Id+'\')';
              Launch = '<br><br><a style="cursor:pointer" onclick="'+Action+'" >'+A_Language[C_TransferResources]+'</a><br></th></tr>';
            }
          }
        }
      }
      
      // Envoi du texte
      OverLibAction = '<table width=240>'+
      '<tr><td class=c colspan=2>'+A_Construction[Group][Element].Name+' ('+A_Planet[PlanetIndex].Name+')</td></tr>'+
      '<tr><th width=80><img src='+SkinUrl+'gebaeude/'+A_Construction[Group][Element].Id+'.gif alt='+A_Construction[Group][Element].Name+' width=75 height=75/></th>'+
      '<th align=left><table width=200><tr><td class=c>'+(((Group == C_Defenses) || (Group == C_Fleets)) ? (A_Language[C_TotalBuildingsCost]+' :') : (A_Language[C_LevelCost1]+' '+(parseInt(((Value == '-') ? 0 : Value))+1)+A_Language[C_LevelCost2]+' :'))+'</td></tr>'+
      '<tr><th align=left>'+ResCalc+CalcEnergy(Group,Element,PlanetIndex)+'</th></tr>';
      Get = CalcBuildingTime(Group,MetalEvo,CrystalEvo,CrystalSat,PlanetIndex);
      A_Get = String(Get).split(Separator);
      var TimeSat = '';
      if (A_Get[1] != '0'+A_Language[C_SecondAbbreviation]) TimeSat = '&nbsp;<font color="#FF9900">'+A_Get[1]+'</font>';
      var MetalMissing = ((MetalEvo-Metal > 0)?(MetalEvo-Metal):0);
      var CrystalMissing = ((CrystalEvo-Crystal > 0)?(CrystalEvo-Crystal):0);
      var DeuteriumMissing = ((DeuteriumEvo-Deuterium > 0)?(DeuteriumEvo-Deuterium):0);
      OverLibAction += ((MetalMissing+CrystalMissing+DeuteriumMissing > 0 || Group == C_Defenses || Group == C_Fleets)?'<tr id=MissingResourcesTr '+((MetalMissing+CrystalMissing+DeuteriumMissing > 0)?'':'style=display:none')+'>'+
      '<th align=left id=MissingResources style=color:red>'+CalcMissingResources(MetalMissing,CrystalMissing,DeuteriumMissing)+'</th></tr>':'')+
      ((MetalMissing+CrystalMissing+DeuteriumMissing > 0 || Group == C_Defenses || Group == C_Fleets)?'<tr id=TransportShipTr '+((MetalMissing+CrystalMissing+DeuteriumMissing > 0)?'':'style=display:none')+'>'+
      '<th align=left id=TransportShip>'+CalcTransportShip(MetalMissing,CrystalMissing,DeuteriumMissing)+'</th></tr>':'')+
      '<tr><th align=left id=BuildingTime>'+A_Language[C_BuildingTime]+': '+A_Get[0]+TimeSat+'</th></tr></table><br>';
      Action = '';
      if (PlanetIndex != PlanetSelectedIndex) {
        Action = 'AddAction(\'window.location.replace(|'+BaseUrl+'?'+A_OverLib[Group].Link+'&session='+Session+'&cp='+A_Planet[PlanetIndex].Id+'|)\');'+
        'window.location.replace(\''+BaseUrl+'?'+A_OverLib[Group].Link+'&session='+Session+'&cp='+A_Planet[PlanetSelectedIndex].Id+'\')';
      }
      else {
        Action = 'window.location.replace(\''+BaseUrl+'?'+A_OverLib[Group].Link+'&session='+Session+'&cp='+A_Planet[PlanetIndex].Id+'\')';
      }
      OverLibAction += '<a style="cursor:pointer" onclick="'+Action+'">'+A_OverLib[Group].Text+'</a>'+
      Launch+((!UnderConstructionValue) ? TimeBeforeBuilding : '')+
      '</table>';
      
    }
    else {
      
      // Envoi du texte
      OverLibAction = '<table width=240>'+
      '<tr><td class=c colspan=2>'+A_Construction[Group][Element].Name+'</td></tr>'+
      '<tr><th width=80><img src='+SkinUrl+'gebaeude/'+A_Construction[Group][Element].Id+'.gif alt='+A_Construction[Group][Element].Name+' width=75 height=75/></th>'+
      '<th align=left><table width=200><tr><td class=c>'+(((Group == C_Defenses) || (Group == C_Fleets)) ? (A_Language[C_TotalBuildingsCost]+' :') : (A_Language[C_LevelCost1]+' '+(parseInt(((Value == '-') ? 0 : Value))+1)+' :'))+A_Language[C_LevelCost2]+'</td></tr>'+
      '<tr><th align=left>'+ResCalc+'</th></tr></table><br></table>';
      
    }
    
    return OverLibAction;
  }
  catch(err) {
    ShowError(err, 'OverLibFunction('+Value+', '+Group+', '+Element+', '+PlanetIndex+', '+UnderConstructionValue+')');
  }
}
unsafeWindow.OverLibFunction = OverLibFunction;

function EmpireBlockShowHide(Id, TitleId, Title, Number) {
  try {
    var A_Block = new Array();
    A_Block['PlanetInformations'] = 0;
    A_Block['Pourcent'] = 1;
    A_Block['HourProduction'] = 2;
    A_Block['DayProduction'] = 3;
    A_Block['Buildings'] = 4;
    A_Block['Defenses'] = 5;
    A_Block['Research'] = 6;
    A_Block['Fleets'] = 7;
    A_Block['FleetsDefensesUC'] = 8;
    var Display;
    if (document.getElementById(Id+'0')) {
      if (document.getElementById(Id+'0').style.display == 'none') {
        Display = '';
        document.getElementById(TitleId).innerHTML = Title+'&nbsp;&nbsp;&nbsp;<img src="'+C_ImgUp+'" alt="'+A_Language[C_RollUp]+'" '+((AddToolTip == true)?'title="'+A_Language[C_RollUp]+'"':'')+'>';
      }
      else {
        Display = 'none';
        document.getElementById(TitleId).innerHTML = Title+'&nbsp;&nbsp;&nbsp;<img src="'+C_ImgDown+'" alt="'+A_Language[C_Unfold]+'" '+((AddToolTip == true)?'title="'+A_Language[C_Unfold]+'"':'')+'>';
      }
      for (i = 0; i < Number; i++) {
        if (document.getElementById(Id+i)) {
          document.getElementById(Id+i).style.display = Display;
        }
      }
      A_EmpireBlock[A_Block[Id]].Hide = ((Display == 'none')?true:false);
      SaveEmpireBlock();
    }
  }
  catch(err) {
    ShowError(err, 'EmpireBlockShowHide('+Id+', '+TitleId+', '+Title+', '+Number+')');
  }
}
unsafeWindow.EmpireBlockShowHide = EmpireBlockShowHide;

function HeaderEmpire(Id, Title, Number, Hide) {
  try {
    if (Hide == true) {
      return '<tr><td class="c" align="center" colspan="'+(PlanetSelect.length+1)+'" style="cursor:pointer" onclick="EmpireBlockShowHide(\''+Id+'\',\''+Id+'Title\',\''+Title.replace("'","\'+String.fromCharCode(39)+\'")+'\','+Number+')"><span id="'+Id+'Title">'+Title+'&nbsp;&nbsp;&nbsp;<img src="'+C_ImgDown+'" alt="'+A_Language[C_Unfold]+'" '+((AddToolTip == true)?'title="'+A_Language[C_Unfold]+'"':'')+'></span></td><td style="background:none"></td></tr>\n';
    }
    else {
      return '<tr><td class="c" align="center" colspan="'+(PlanetSelect.length+1)+'" style="cursor:pointer" onclick="EmpireBlockShowHide(\''+Id+'\',\''+Id+'Title\',\''+Title.replace("'","\'+String.fromCharCode(39)+\'")+'\','+Number+')"><span id="'+Id+'Title">'+Title+'&nbsp;&nbsp;&nbsp;<img src="'+C_ImgUp+'" alt="'+A_Language[C_RollUp]+'" '+((AddToolTip == true)?'title="'+A_Language[C_RollUp]+'"':'')+'></span></td><td style="background:none"></td></tr>\n';
    }
  }
  catch(err) {
    ShowError(err, 'HeaderEmpire('+Id+', '+Title+', '+Number+', '+Hide+')');
  }
}

function CellHTML(Text, AlignLeft) {
  return '<th '+((AlignLeft == true) ? 'style="text-align:left"' : '')+'>'+Text+'</th>\n';
}

function RowBBCode(Text, LayoutInTable) {
  return (LayoutInTable==true?'[tr]':'')+Text+(LayoutInTable==true?'[/tr]':'');
}
unsafeWindow.RowBBCode = RowBBCode;

function CellBBCode(Text, Color, LayoutInTable, End, ColSpan) {
  var Center = document.getElementById('CenteredTextInTable').checked;
  var Resize = document.getElementById('ResizeTextInTable').checked;
  var Colored = document.getElementById('TextColored').checked;
  Text = ((Colored==true)?'[color='+Color+']'+Text+'[/color]':Text);
  if (LayoutInTable==true) {
    Text = ((Resize==true)?'[size=11]'+Text+'[/size]':Text);
    Text = ((Center==true)?'[center]'+Text+'[/center]':Text);
    return '[td'+(ColSpan?' colspan='+ColSpan+'':'')+']'+Text+'[/td]';
  }
  else {
    return Text+(End==true?'':'&#160;&#160;&#160;');
  }
}
unsafeWindow.CellBBCode = CellBBCode;

function ExportGenerator() {
  try {
    var Centred = document.getElementById('ExportCenter').checked;
    var LayoutInTable = document.getElementById('LayoutInTable').checked;
    var NoSpecialCharacter = document.getElementById('NoSpecialCharacter').checked;
    var A_ExportSection = new Array();
    for (i = 0; i < 8; i++) {
      A_ExportSection[i] = document.getElementById('ExportSection'+i).checked;
    }
    var Code, Color;
    // BBCode
    Code = (Centred==true?'[center]':'')+(LayoutInTable==true?'[table]':'');
    for (i = 0; i < 8; i++) {
      if (A_ExportSection[i] == true) {
        // Nom des planetes
        if (i == 0) {
          Code += (LayoutInTable==true?'[tr]':'')+CellBBCode(A_Language[C_Name],'#99ff00',LayoutInTable);
        }
        // Informations generales
        else if (i == 1) {
          A_PlanetTr[0] = CellBBCode(A_Language[C_Type],'#99ff00',LayoutInTable);
          A_PlanetTr[1] = CellBBCode(A_Language[C_Coordinates],'#99ff00',LayoutInTable);
          A_PlanetTr[2] = CellBBCode(A_Language[C_FieldNumber],'#99ff00',LayoutInTable);
          A_PlanetTr[3] = CellBBCode(A_Language[C_Diameter],'#99ff00',LayoutInTable);
          A_PlanetTr[4] = CellBBCode(A_Language[C_Temperature],'#99ff00',LayoutInTable);
        }
        // Production horaire
        else if (i == 2) {
          A_HourProductionTr[0] = CellBBCode(A_Construction[C_Buildings][0].Name,'#99ff00',LayoutInTable);
          A_HourProductionTr[1] = CellBBCode(A_Construction[C_Buildings][1].Name,'#99ff00',LayoutInTable);
          A_HourProductionTr[2] = CellBBCode(A_Construction[C_Buildings][2].Name,'#99ff00',LayoutInTable);
        }
        // Production journaliere
        else if (i == 3) {
          A_DayProductionTr[0] = CellBBCode(A_Construction[C_Buildings][0].Name,'#99ff00',LayoutInTable);
          A_DayProductionTr[1] = CellBBCode(A_Construction[C_Buildings][1].Name,'#99ff00',LayoutInTable);
          A_DayProductionTr[2] = CellBBCode(A_Construction[C_Buildings][2].Name,'#99ff00',LayoutInTable);
        }
        // Batiment
        else if (i == 4) {
          for (j = 0; j < 18; j++) {
            if (A_Construction[C_Buildings][j].Name) {
              A_BuildingsTr[j] = CellBBCode(A_Construction[C_Buildings][j].Name,'#99ff00',LayoutInTable);
            }
          }
        }
        // Technologie
        else if (i == 5) {
          for (j = 0; j < 16; j++) {
            A_ResearchTr[j] = CellBBCode(A_Construction[C_Research][j].Name,'#99ff00',LayoutInTable)+
            CellBBCode(A_Research[j].Level,'#0099ff',LayoutInTable);
            CellBBCode('','#99ff00',LayoutInTable,true,PlanetSelect.length);
          }
        }
        // Defenses
        else if (i == 6) {
          for (j = 0; j < 10; j++) {
            A_DefensesTr[j] = CellBBCode(A_Construction[C_Defenses][j].Name,'#99ff00',LayoutInTable);
          }
        }
        // Flotte
        else if (i == 7) {
          for (j = 0; j < 14; j++) {
            A_FleetsTr[j] = CellBBCode(A_Construction[C_Fleets][j].Name,'#99ff00',LayoutInTable);
          }
        }
        for (j = 0; j < PlanetSelect.length; j++) {
          Color = ((j&1 == 1)?'#ff9900':'#0099ff');
          if (i == 0) {
            Code += CellBBCode(A_Planet[j].Name,Color,LayoutInTable,((j+1==PlanetSelect.length)?true:false));
          }
          else if (i == 1) {
            A_PlanetTr[0] += CellBBCode(((A_Planet[j].Type == C_Planet)?A_Language[C_Planet]:A_Language[C_Moon]),Color,LayoutInTable,((j+1==PlanetSelect.length)?true:false));
            A_PlanetTr[1] += CellBBCode('['+A_Planet[j].Galaxy+':'+A_Planet[j].System+':'+A_Planet[j].Planet+']',Color,LayoutInTable,((j+1==PlanetSelect.length)?true:false));
            A_PlanetTr[2] += CellBBCode(A_Planet[j].UsedSpace+'/'+A_Planet[j].TotalSpace,Color,LayoutInTable,((j+1==PlanetSelect.length)?true:false));
            A_PlanetTr[3] += CellBBCode(FormatNb(A_Planet[j].Diameter)+' km',Color,LayoutInTable,((j+1==PlanetSelect.length)?true:false));
            A_PlanetTr[4] += CellBBCode(A_Planet[j].MinTemperature+'&#160;'+A_Language[C_To]+'&#160;'+A_Planet[j].MaxTemperature+'&#160;\260C',Color,LayoutInTable,((j+1==PlanetSelect.length)?true:false));
          }
          else if (i == 2) {
            A_HourProductionTr[0] += CellBBCode(FormatNb(A_Production[j].Metal),Color,LayoutInTable);
            A_HourProductionTr[1] += CellBBCode(FormatNb(A_Production[j].Crystal),Color,LayoutInTable);
            A_HourProductionTr[2] += CellBBCode(FormatNb(A_Production[j].Deuterium),Color,LayoutInTable);
          }
          else if (i == 3) {
            A_DayProductionTr[0] += CellBBCode(FormatNb(A_Production[j].Metal*24),Color,LayoutInTable);
            A_DayProductionTr[1] += CellBBCode(FormatNb(A_Production[j].Crystal*24),Color,LayoutInTable);
            A_DayProductionTr[2] += CellBBCode(FormatNb(A_Production[j].Deuterium*24),Color,LayoutInTable);
          }
          else if (i == 4) {
            for (k = 0; k < 18; k++) {
              if (A_Construction[C_Buildings][k].Name) {
                A_BuildingsTr[k] += CellBBCode(A_Buildings[j][k].Level,Color,LayoutInTable,((j+1==PlanetSelect.length)?true:false));
              }
            }
          }
          else if (i == 6) {
            for (k = 0; k < 10; k++) {
              A_DefensesTr[k] += CellBBCode(FormatNb(A_Defenses[j][k]),Color,LayoutInTable);
            }
          }
          else if (i == 7) {
            for (k = 0; k < 14; k++) {
              A_FleetsTr[k] += CellBBCode(FormatNb(A_Fleets[j][k]),Color,LayoutInTable);
            }
          }
        }
        if (i == 0) {
          Code += (LayoutInTable==true?'[td][/td][/tr]':'')+C_CRLF;
        }
        else if (i == 1) {
          Code += RowBBCode(CellBBCode('----------'+A_Language[C_MainInformations]+'----------','#99ff00',LayoutInTable,true,PlanetSelect.length+2),LayoutInTable)+C_CRLF+
          RowBBCode(A_PlanetTr[0],LayoutInTable)+C_CRLF+RowBBCode(A_PlanetTr[1],LayoutInTable)+C_CRLF+RowBBCode(A_PlanetTr[2],LayoutInTable)+
          C_CRLF+RowBBCode(A_PlanetTr[3],LayoutInTable)+C_CRLF+RowBBCode(A_PlanetTr[4],LayoutInTable)+C_CRLF;
        }
        else if (i == 2) {
          Code += RowBBCode(CellBBCode('----------'+A_Language[C_HourProduction]+'----------','#99ff00',LayoutInTable,true,PlanetSelect.length+2),LayoutInTable)+C_CRLF+
          RowBBCode(A_HourProductionTr[0]+CellBBCode(FormatNb(MetalProductionTotal),'#99ff00',LayoutInTable),LayoutInTable,true)+C_CRLF+
          RowBBCode(A_HourProductionTr[1]+CellBBCode(FormatNb(CrystalProductionTotal),'#99ff00',LayoutInTable),LayoutInTable,true)+C_CRLF+
          RowBBCode(A_HourProductionTr[2]+CellBBCode(FormatNb(DeuteriumProductionTotal),'#99ff00',LayoutInTable),LayoutInTable,true)+C_CRLF;
        }
        else if (i == 3) {
          Code += RowBBCode(CellBBCode('----------'+A_Language[C_DayProduction]+'----------','#99ff00',LayoutInTable,true,PlanetSelect.length+2),LayoutInTable)+C_CRLF+
          RowBBCode(A_DayProductionTr[0]+CellBBCode(FormatNb(MetalProductionTotal*24),'#99ff00',LayoutInTable),LayoutInTable,true)+C_CRLF+
          RowBBCode(A_DayProductionTr[1]+CellBBCode(FormatNb(CrystalProductionTotal*24),'#99ff00',LayoutInTable),LayoutInTable,true)+C_CRLF+
          RowBBCode(A_DayProductionTr[2]+CellBBCode(FormatNb(DeuteriumProductionTotal*24),'#99ff00',LayoutInTable),LayoutInTable,true)+C_CRLF;
        }
        else if (i == 4) {
          Code += RowBBCode(CellBBCode('----------'+A_Language[C_BuildingsTxt]+'----------','#99ff00',LayoutInTable,true,PlanetSelect.length+2),LayoutInTable,true)+C_CRLF;
          for (j = 0; j < 18; j++) {
            if (A_Construction[C_Buildings][j].Name) {
              Code += RowBBCode(A_BuildingsTr[j],LayoutInTable)+C_CRLF;
            }
          }
        }
        else if (i == 5) {
          Code += RowBBCode(CellBBCode('----------'+A_Language[C_ResearchTxt]+'&#160;('+ResearchTotal+'&#160;'+A_Language[C_Points]+')----------','#99ff00',LayoutInTable,true,PlanetSelect.length+2),LayoutInTable)+C_CRLF;
          for (j = 0; j < 16; j++) {
            Code += RowBBCode(A_ResearchTr[j],LayoutInTable)+C_CRLF;
          }  
        }
        else if (i == 6) {
          Code += RowBBCode(CellBBCode('----------'+A_Language[C_DefensesTxt]+'----------','#99ff00',LayoutInTable,true,PlanetSelect.length+2),LayoutInTable)+C_CRLF;
          for (j = 0; j < 10; j++) {
            Code += RowBBCode(A_DefensesTr[j]+CellBBCode(FormatNb(A_DefensesTotal[j]),'#99ff00',LayoutInTable),LayoutInTable,true)+C_CRLF;
          }
        }
        else if (i == 7) {
          Code += RowBBCode(CellBBCode('----------'+A_Language[C_FleetsTxt]+'&#160;('+FormatNb(FleetsTotal)+')----------','#99ff00',LayoutInTable,PlanetSelect.length+2),LayoutInTable)+C_CRLF;
          for (j = 0; j < 14; j++) {
            Code += RowBBCode(A_FleetsTr[j]+CellBBCode(FormatNb(A_FleetsTotal[j]),'#99ff00',LayoutInTable,true),LayoutInTable)+C_CRLF;
          }
        }
      }
    }
    Code += (LayoutInTable==true?'[/table]':'')+C_CRLF+'Generated by [url=http://userscripts.org/scripts/show/23500]'+C_ScriptName+'[/url]'+(Centred==true?'[/center]':'');
    if (NoSpecialCharacter == true) Code = Code.replace(/\&([a-zA-Z0-9\#]+)\;/g, ' ');
    document.getElementsByName('ExportArea')[0].value = Code;
    document.getElementById('CharacterNumber').innerHTML = ' ('+Code.length+' '+A_Language[C_Characters]+')';
    SetClipboard(Code);
  }
  catch(err) {
    ShowError(err, 'ExportGenerator()');
  }
}
unsafeWindow.ExportGenerator = ExportGenerator;

function Export() {
  try {
    var OverLibAction = '<table width=600>'+
      '<tr><td class=c colspan=2>'+A_Language[C_Export]+'</td></tr>'+
      '<tr><th colspan="2">'+A_Language[C_GeneratorOptions]+'</th></tr>'+
      '<tr><th colspan="2">'+
      '<input type="checkbox" id="ExportCenter" ckecked="CHECKED"><label for="ExportCenter">'+A_Language[C_Center]+'</label>'+
      '<input type="checkbox" id="TextColored" ckecked="CHECKED"><label for="TextColored">'+A_Language[C_TextColored]+'</label>'+
      '<input type="checkbox" id="NoSpecialCharacter" ckecked="CHECKED"><label for="NoSpecialCharacter">'+A_Language[C_NoSpecialCharacter]+'</label><br>'+
      '<input type="checkbox" id="LayoutInTable" ckecked="CHECKED"><label for="LayoutInTable">'+A_Language[C_LayoutInTable]+'</label>'+
      '<input type="checkbox" id="CenteredTextInTable" ckecked="CHECKED"><label for="CenteredTextInTable">'+A_Language[C_CenteredTextInTable]+'</label>'+
      '<input type="checkbox" id="ResizeTextInTable" ckecked="CHECKED"><label for="ResizeTextInTable">'+A_Language[C_ResizeTextInTable]+'</label>'+
      '</th></tr>'+
      '<tr><th colspan="2">'+
      '<input type="checkbox" id="ExportSection0"><label for="ExportSection0">'+A_Language[C_Name]+'</label>'+
      '<input type="checkbox" id="ExportSection1"><label for="ExportSection1">'+A_Language[C_MainInformations]+'</label>'+
      '<input type="checkbox" id="ExportSection2"><label for="ExportSection2">'+A_Language[C_HourProduction]+'</label><br>'+
      '<input type="checkbox" id="ExportSection3"><label for="ExportSection3">'+A_Language[C_DayProduction]+'</label>'+
      '<input type="checkbox" id="ExportSection4"><label for="ExportSection4">'+A_Language[C_BuildingsTxt]+'</label>'+
      '<input type="checkbox" id="ExportSection5"><label for="ExportSection5">'+A_Language[C_ResearchTxt]+'</label>'+
      '<input type="checkbox" id="ExportSection6"><label for="ExportSection6">'+A_Language[C_DefensesTxt]+'</label>'+
      '<input type="checkbox" id="ExportSection7"><label for="ExportSection7">'+A_Language[C_FleetsTxt]+'</label>'+
      '</th></tr>'+
      '<tr><th colspan="2"><input type="button" name="ExportGenerator" value="'+A_Language[C_Generate]+'" onclick="ExportGenerator()"><span id="CharacterNumber"></span></th></tr>'+
      '<tr><th colspan="2"><textarea name="ExportArea" rows="20" cols="200"></textarea></th></tr>'+
      '<tr><th colspan="2" id="cell"></th></tr>'+
      '</table>';
    return OverLibAction;
  }
  catch(err) {
    ShowError(err, 'Export()');
  }
}
unsafeWindow.Export = Export;





// Detection de la page recherche remplacement
if (OgameEmpire == true) {
  try {
    // Reinitialisation de la page
    GM_setValue('OT_OgameEmpire',false);
    OgameEmpire = false;
    
    // Ajout du lien vers la page empire au menu de selection des planetes
    for (i = 0; i < PlanetSelect.length; i++) {
      PlanetSelect[i].value = 'javascript:GMsetValue(\'OT_OgameEmpire\',true);window.location.replace(\''+A_Planet[i].Url+'\');';
    }
    
    // Generation du panneau empire
    var GTime = new Date();
    var CurrentTime = GTime.getTime();
    var Empire = '<table width="519" id="empire"><tr><td style="background:none"></td>';
    for (i = 0; i < PlanetSelect.length; i++) {
      //alert(A_Planet[i].Name+' : '+A_Planet[i].ImageUrl)
      Empire += '<th align="center"><img src="'+A_Planet[i].ImageUrl+'" '+((AddToolTip == true)?'title="'+A_Planet[i].Name+'"':'')+' alt="'+A_Language[C_ImageNotSaved]+'" width="'+EmpireIconSize+'" height="'+EmpireIconSize+'"/><br /><b>'+A_Planet[i].Name+'</b></th>';
    }
    Empire += '<td style="background:none"></td></tr>\n';
    var A_PlanetTr = new Array();
    var A_PourcentTr = new Array();
    var A_HourProductionTr = new Array();
    var A_DayProductionTr = new Array();
    var A_BuildingsTr = new Array();
    var A_ResearchTr = new Array();
    var A_FleetsTr = new Array();
    var A_DefensesTr = new Array();
    var A_FleetsDefensesUCTr = new Array();
    var A_FleetsTotal = new Array();
    var A_DefensesTotal = new Array();
    for (i = 0; i < PlanetSelect.length; i++) {
      if (i == 0) {
        // Infos generales
        A_PlanetTr[0] = '<tr id="PlanetInformations0"'+((A_EmpireBlock[0].Hide == true)?' style="display:none"':'')+'>'+CellHTML(A_Language[C_Type], true);
        A_PlanetTr[1] = '<tr id="PlanetInformations1"'+((A_EmpireBlock[0].Hide == true)?' style="display:none"':'')+'>'+CellHTML(A_Language[C_Coordinates], true);
        A_PlanetTr[2] = '<tr id="PlanetInformations2"'+((A_EmpireBlock[0].Hide == true)?' style="display:none"':'')+'>'+CellHTML(A_Language[C_FieldNumber], true);
        A_PlanetTr[3] = '<tr id="PlanetInformations3"'+((A_EmpireBlock[0].Hide == true)?' style="display:none"':'')+'>'+CellHTML(A_Language[C_Diameter], true);
        A_PlanetTr[4] = '<tr id="PlanetInformations4"'+((A_EmpireBlock[0].Hide == true)?' style="display:none"':'')+'>'+CellHTML(A_Language[C_Temperature], true);
        A_PlanetTr[5] = '<tr id="PlanetInformations5"'+((A_EmpireBlock[0].Hide == true)?' style="display:none"':'')+'>'+CellHTML(A_Language[C_Update], true);
        // Ressources
        A_PourcentTr[0] = '<tr id="Pourcent0"'+((A_EmpireBlock[1].Hide == true)?' style="display:none"':'')+'>'+CellHTML(A_Language[C_ProductionRate].replace(/\:/g,''), true);
        for (j = 0; j < 5; j++) {
          A_PourcentTr[j+1] = '<tr id="Pourcent'+(j+1)+'"'+((A_EmpireBlock[1].Hide == true)?' style="display:none"':'')+'>'+CellHTML(A_Construction[C_Buildings][j].Name, true);
        }
        A_PourcentTr[6] = '<tr id="Pourcent6"'+((A_EmpireBlock[1].Hide == true)?' style="display:none"':'')+'>'+CellHTML(A_Construction[C_Fleets][10].Name, true);
        A_PourcentTr[7] = '<tr id="Pourcent7"'+((A_EmpireBlock[1].Hide == true)?' style="display:none"':'')+'>'+CellHTML(A_Language[C_Update], true);
        A_PourcentTr[8] = '<tr id="Pourcent8"'+((A_EmpireBlock[1].Hide == true)?' style="display:none"':'')+'><td style="background:none;"></td>\n';
        // Production
        for (j = 0; j < 3; j++) {
          A_HourProductionTr[j] = '<tr id="HourProduction'+j+'"'+((A_EmpireBlock[2].Hide == true)?' style="display:none"':'')+'>'+CellHTML(A_Construction[C_Buildings][j].Name, true);
          A_DayProductionTr[j] = '<tr id="DayProduction'+j+'"'+((A_EmpireBlock[3].Hide == true)?' style="display:none"':'')+'>'+CellHTML(A_Construction[C_Buildings][j].Name, true);
        }
        var MetalProductionTotal = 0;
        var CrystalProductionTotal = 0;
        var DeuteriumProductionTotal = 0;
        // Batiment
        for (j = 0; j < 18; j++) {
          if (A_Construction[C_Buildings][j].Name) {
            A_BuildingsTr[j] = '<tr id="Buildings'+j+'"'+((A_EmpireBlock[4].Hide == true)?' style="display:none"':'')+'>'+CellHTML(A_Construction[C_Buildings][j].Name, true);
          }
        }
        A_BuildingsTr[18] = '<tr id="Buildings18"'+((A_EmpireBlock[4].Hide == true)?' style="display:none"':'')+'>'+CellHTML(A_Language[C_Update], true);
        // Flotte
        for (j = 0; j < 14; j++) {
          A_FleetsTr[j] = '<tr id="Fleets'+j+'"'+((A_EmpireBlock[7].Hide == true)?' style="display:none"':'')+'>'+CellHTML(A_Construction[C_Fleets][j].Name, true);
          A_FleetsTotal[j] = 0;
        }
        A_FleetsTr[14] = '<tr id="Fleets14"'+((A_EmpireBlock[7].Hide == true)?' style="display:none"':'')+'>'+CellHTML(A_Language[C_Update], true);
        // Technologie
        var ResearchTotal = 0;
        for (j = 0; j < 16; j++) {
          A_ResearchTr[j] = '<tr id="Research'+j+'"'+((A_EmpireBlock[6].Hide == true)?' style="display:none"':'')+'>'+CellHTML(A_Construction[C_Research][j].Name, true);
          ResearchTotal = ResearchTotal+((A_Research[j].Level != '-')?parseInt(A_Research[j].Level):0);
        }
        A_ResearchTr[16] = '<tr id="Research16"'+((A_EmpireBlock[6].Hide == true)?' style="display:none"':'')+'>'+CellHTML(A_Language[C_Update], true);
        // Defense
        for (j = 0; j < 10; j++) {
          A_DefensesTr[j] = '<tr id="Defenses'+j+'"'+((A_EmpireBlock[5].Hide == true)?' style="display:none"':'')+'>'+CellHTML(A_Construction[C_Defenses][j].Name, true);
          A_DefensesTotal[j] = 0;
        }
        A_DefensesTr[10] = '<tr id="Defenses10"'+((A_EmpireBlock[5].Hide == true)?' style="display:none"':'')+'>'+CellHTML(A_Language[C_Update], true);
        // Vaisseaux et defenses en construction
        A_FleetsDefensesUCTr[0] = '<tr id="FleetsDefensesUC0"'+((A_EmpireBlock[8].Hide == true)?' style="display:none"':'')+'>'+CellHTML(A_Language[C_List], true);
        A_FleetsDefensesUCTr[1] = '<tr id="FleetsDefensesUC1"'+((A_EmpireBlock[8].Hide == true)?' style="display:none"':'')+'>'+CellHTML(A_Language[C_Update], true);
      }
      // Infos generales
      A_PlanetTr[0] += CellHTML(((A_Planet[i].Type == C_Planet)?A_Language[C_Planet]:A_Language[C_Moon]));
      A_PlanetTr[1] += CellHTML('['+A_Planet[i].Galaxy+':'+A_Planet[i].System+':'+A_Planet[i].Planet+']');
      A_PlanetTr[2] += CellHTML(A_Planet[i].UsedSpace+'&nbsp;/&nbsp;'+A_Planet[i].TotalSpace+' <font color="#FF9900">('+(A_Planet[i].TotalSpace-A_Planet[i].UsedSpace)+')</font>');
      A_PlanetTr[3] += CellHTML(FormatNb(A_Planet[i].Diameter)+' km');
      A_PlanetTr[4] += CellHTML(A_Planet[i].MinTemperature+'&nbsp;'+A_Language[C_To]+'&nbsp;'+A_Planet[i].MaxTemperature+'&nbsp;&deg;C');
      A_PlanetTr[5] += CellHTML(((A_Planet[i].Update != '') ? FormatTime(CurrentTime-A_Planet[i].Update) : '-'));
      // Ressources
      A_PourcentTr[0] += CellHTML(A_Pourcent[i].Rate);
      A_PourcentTr[1] += CellHTML(InsertSelect('last1_'+A_Planet[i].Id, A_Pourcent[i].Metal));
      A_PourcentTr[2] += CellHTML(InsertSelect('last2_'+A_Planet[i].Id, A_Pourcent[i].Crystal));
      A_PourcentTr[3] += CellHTML(InsertSelect('last3_'+A_Planet[i].Id, A_Pourcent[i].Deuterium));
      A_PourcentTr[4] += CellHTML(InsertSelect('last4_'+A_Planet[i].Id, A_Pourcent[i].Solar));
      A_PourcentTr[5] += CellHTML(InsertSelect('last12_'+A_Planet[i].Id, A_Pourcent[i].Fusion));
      A_PourcentTr[6] += CellHTML(InsertSelect('last212_'+A_Planet[i].Id, A_Pourcent[i].Ship212));
      A_PourcentTr[7] += CellHTML(((A_Pourcent[i].Update != '') ? FormatTime(CurrentTime-A_Pourcent[i].Update) : '-'));
      A_PourcentTr[8] += CellHTML('<input type="button" value="'+A_Language[C_Apply]+'" onclick="CreateResourcesLink('+A_Planet[i].Id+');" />');
      // Production
      A_HourProductionTr[0] += CellHTML(FormatNb(A_Production[i].Metal));
      A_HourProductionTr[1] += CellHTML(FormatNb(A_Production[i].Crystal));
      A_HourProductionTr[2] += CellHTML(FormatNb(A_Production[i].Deuterium));
      A_DayProductionTr[0] += CellHTML(FormatNb(A_Production[i].Metal*24));
      A_DayProductionTr[1] += CellHTML(FormatNb(A_Production[i].Crystal*24));
      A_DayProductionTr[2] += CellHTML(FormatNb(A_Production[i].Deuterium*24));
      MetalProductionTotal = MetalProductionTotal + parseInt(A_Production[i].Metal);
      CrystalProductionTotal = CrystalProductionTotal + parseInt(A_Production[i].Crystal);
      DeuteriumProductionTotal = DeuteriumProductionTotal + parseInt(A_Production[i].Deuterium);
      // Batiment
      for (j = 0; j < 18; j++) {
        if (A_Construction[C_Buildings][j].Name) {
          A_BuildingsTr[j] += CellHTML(AddOverLib(A_Buildings[i][j].Level, C_Buildings, j, i, A_Buildings[i][j].UC));
        }
      }
      A_BuildingsTr[18] += CellHTML(((A_BuildingsUpdate[i] != '') ? FormatTime(CurrentTime-A_BuildingsUpdate[i]) : '-'));
      // Flotte
      for (j = 0; j < 14; j++) {
        A_FleetsTr[j] += CellHTML(AddOverLib(A_Fleets[i][j], C_Fleets, j, i));
        A_FleetsTotal[j] = A_FleetsTotal[j] + parseInt(((A_Fleets[i][j]=='-')?'0':A_Fleets[i][j]));
      }
      A_FleetsTr[14] += CellHTML(((A_FleetsUpdate[i] != '') ? FormatTime(CurrentTime-A_FleetsUpdate[i]) : '-'));
      // Technologie
      for (j = 0; j < 16; j++) {
        A_ResearchTr[j] += CellHTML(AddOverLib(A_Research[j].Level, C_Research, j, i, A_Research[j].UC));
      }
      A_ResearchTr[16] += CellHTML(((ResearchUpdate != '') ? FormatTime(CurrentTime-ResearchUpdate) : '-'));
      // Defense
      for (j = 0; j < 10; j++) {
        A_DefensesTr[j] += CellHTML(AddOverLib(A_Defenses[i][j], C_Defenses, j, i));
        A_DefensesTotal[j] = A_DefensesTotal[j] + parseInt(((A_Defenses[i][j]=='-')?'0':A_Defenses[i][j]));
      }
      A_DefensesTr[10] += CellHTML(((A_DefensesUpdate[i] != '') ? FormatTime(CurrentTime-A_DefensesUpdate[i]) : '-'));
      // Vaisseaux et defenses en construction
      A_FleetsDefensesUCTr[0] += CellHTML(A_FleetsDefensesUC[i].List,true);
      A_FleetsDefensesUCTr[1] += CellHTML(((A_FleetsDefensesUC[i].Update != '') ? FormatTime(CurrentTime-A_FleetsDefensesUC[i].Update) : '-'));
    }
    for (j = 0; j < A_EmpireBlock.length; j++) {
      //Infos generales
      if (A_EmpireBlock[0].Order == j) {
        Empire += HeaderEmpire('PlanetInformations',A_Language[C_MainInformations], 6, A_EmpireBlock[0].Hide);
        for (i = 0; i < 6; i++) {
          Empire += A_PlanetTr[i]+'<td style="background:none"></td></tr>\n';
        }
      }
      //Ressources
      if (A_EmpireBlock[1].Order == j) {
        Empire += HeaderEmpire('Pourcent',A_Language[C_Resources], 9, A_EmpireBlock[1].Hide);
        for (i = 0; i < 9; i++) {
          Empire += A_PourcentTr[i]+'<td style="background:none"></td></tr>\n';
        }
      }
      //Production
      if (A_EmpireBlock[2].Order == j) {
        Empire += HeaderEmpire('HourProduction',A_Language[C_HourProduction], 3, A_EmpireBlock[2].Hide)+
        A_HourProductionTr[0]+CellHTML(FormatNb(MetalProductionTotal), false, true)+'</tr>\n'+
        A_HourProductionTr[1]+CellHTML(FormatNb(CrystalProductionTotal), false, true)+'</tr>\n'+
        A_HourProductionTr[2]+CellHTML(FormatNb(DeuteriumProductionTotal), false, true)+'</tr>\n';
      }
      if (A_EmpireBlock[3].Order == j) {
        Empire += HeaderEmpire('DayProduction',A_Language[C_DayProduction], 3, A_EmpireBlock[3].Hide)+
        A_DayProductionTr[0]+CellHTML(FormatNb(MetalProductionTotal*24), false, true)+'</tr>\n'+
        A_DayProductionTr[1]+CellHTML(FormatNb(CrystalProductionTotal*24), false, true)+'</tr>\n'+
        A_DayProductionTr[2]+CellHTML(FormatNb(DeuteriumProductionTotal*24), false, true)+'</tr>\n';
      }
      //Batiment
      if (A_EmpireBlock[4].Order == j) {
        Empire += HeaderEmpire('Buildings',A_Language[C_BuildingsTxt], 19, A_EmpireBlock[4].Hide);
        for (i = 0; i < 18; i++) {
          if (A_Construction[C_Buildings][i].Name) {
            Empire += A_BuildingsTr[i]+'<td style="background:none"></td></tr>\n';
          }
        }
        Empire += A_BuildingsTr[18]+'<td style="background:none"></td></tr>\n';
      }
      // Defense
      if (A_EmpireBlock[5].Order == j) {
        Empire += HeaderEmpire('Defenses',A_Language[C_DefensesTxt], 11, A_EmpireBlock[5].Hide);
        for (i = 0; i < 10; i++) {
          Empire += A_DefensesTr[i]+'<th align="center">'+AddOverLib(A_DefensesTotal[i], C_Defenses, i, PlanetSelect.length)+'</th></tr>\n';
        }
        Empire += A_DefensesTr[10]+'<td style="background:none"></td></tr>\n';
      }
      // Technologie
      if (A_EmpireBlock[6].Order == j) {
        Empire += HeaderEmpire('Research',A_Language[C_ResearchTxt]+' ('+ResearchTotal+')', 17, A_EmpireBlock[6].Hide);
        for (i = 0; i < 17; i++) {
          Empire += A_ResearchTr[i]+'<td style="background:none"></td></tr>\n';
        }
      }
      // Flotte
      if (A_EmpireBlock[7].Order == j) {
        Empire += HeaderEmpire('Fleets',A_Language[C_FleetsTxt], 15, A_EmpireBlock[7].Hide);
        var FleetsTotal = 0
        for (i = 0; i < 14; i++) {
          Empire += A_FleetsTr[i]+'<th align="center">'+AddOverLib(A_FleetsTotal[i], C_Fleets, i, PlanetSelect.length)+'</th></tr>\n';
          FleetsTotal = FleetsTotal + parseInt(A_FleetsTotal[i]);
        }
        Empire += A_FleetsTr[14]+'<th align="center">('+FormatNb(FleetsTotal)+')</th></tr>\n';
      }
      // Vaisseaux et defenses en construction
      if (A_EmpireBlock[8].Order == j) {
        Empire += HeaderEmpire('FleetsDefensesUC',A_Language[C_FleetsDefensesUC], 2, A_EmpireBlock[8].Hide)+
        A_FleetsDefensesUCTr[0]+'<td style="background:none"></td></tr>\n'+
        A_FleetsDefensesUCTr[1]+'<td style="background:none"></td></tr>\n';
      }
    }
    Empire += '</table>';
    Empire += '<table><tr><td class="c" style="cursor:pointer" onclick="overlib(Export(), STICKY, MOUSEOFF, 100, 750, CENTER, OFFSETX, -200, OFFSETY, -300);" onmouseover="overlib(Export(), STICKY, MOUSEOFF, DELAY, 750, CENTER, OFFSETX, -200, OFFSETY, -300);" onmouseout="return nd();">'+A_Language[C_Export]+'</td></tr></table>';
    ContentDiv.innerHTML = '<center>'+Empire+'</center>';
    GM_addStyle('th { text-align: center; vertical-align: middle; }');
  }
  catch(err) {
    ShowError(err, 'Create empire page');
  }
}

 
   

   
/* FONCTIONS NECESSAIRES AUX CALCULS DES TRANSFERTS
   -------------------------------------------------- */

function RefreshTotal(Reset) {
  try {
    if (TransferState == false) {
      // Initialisation des variables
      var NbPlanetResources = 0, NbPlanetResourcesTemp = 0, PlanetType = '', DestinationIndex = -1;
      var A_PlanetUsed = new Array();
      
      var A_Metal = new Array();
      var A_Crystal = new Array();
      var A_Deuterium = new Array();
      
      var Mode = 0,  NbGT = 0, NbPT = 0, Permut = 0, TotalResources = 0;
      var MetalUsed = 0, CrystalUsed = 0, DeuteriumUsed = 0;
      var MetalRestMoy = 0, CrystalRestMoy = 0, DeuteriumRestMoy = 0;
      
      var A_ConsumptionGT = new Array();
      var A_ConsumptionPT = new Array();
      var A_ConsumptionRecycler = new Array();
      
      var A_FlightTime = new Array();
      var A_FlightRecyclerTime = new Array();
      var A_FlightPTTime = new Array();
      
      var A_AddRecycler = new Array();
      var A_Speed = new Array();
      
      // Chargement des donnees sur les planetes dans les tableaux precedement crees
      MetalTotal = 0;
      CrystalTotal = 0;
      DeuteriumTotal = 0;
      for (var i = 0; i < PlanetSelect.length; i++) {
        
        // Chargement des ressources
        if (A_Resources[i].Metal != undefined) {
          if ((RealTimeResources == true) && (UseRealTimeResources == true)) {
            A_Metal[i] = A_RealTimeResources[i].Metal;
            A_Crystal[i] = A_RealTimeResources[i].Crystal;
            A_Deuterium[i] = A_RealTimeResources[i].Deuterium;
            // Actualisation des ressources du tableau de transfert
            if (ForceResourcesTransferTableUpdate == true) {
              document.getElementById('MetalTransfer'+i).innerHTML = FormatNb(A_Metal[i]);
              document.getElementById('CrystalTransfer'+i).innerHTML = FormatNb(A_Crystal[i]);
              document.getElementById('DeuteriumTransfer'+i).innerHTML = FormatNb(A_Deuterium[i]);
            }
          }
          else {
            A_Metal[i] = A_Resources[i].Metal;
            A_Crystal[i] = A_Resources[i].Crystal;
            A_Deuterium[i] = A_Resources[i].Deuterium;
          }
          // Calcul du total des ressources
          if (document.getElementsByName('PlanetUsed'+i)[0].checked == true) {
            MetalTotal = (MetalTotal+parseInt(A_Metal[i]));
            CrystalTotal = (CrystalTotal+parseInt(A_Crystal[i]));
            DeuteriumTotal = (DeuteriumTotal+parseInt(A_Deuterium[i]));
            NbPlanetResources++;
          }
        }
        
        // Mise en memoire planete de destination
        if (document.getElementsByName('Destination')[i].checked == true) {
          TransferDestinationPlanet = A_Planet[i].Planet;
          TransferDestinationSystem = A_Planet[i].System;
          TransferDestinationGalaxy = A_Planet[i].Galaxy;
          PlanetType = A_Planet[i].Type;
          DestinationIndex = i;
          if ((document.getElementsByName('UseTotalResourcesDestinationPlanet')[0].checked == true) && (document.getElementsByName('PlanetUsed'+i)[0].checked == false)) {
            MetalTotal = (MetalTotal+parseInt(A_Metal[i]));
            CrystalTotal = (CrystalTotal+parseInt(A_Crystal[i]));
            DeuteriumTotal = (DeuteriumTotal+parseInt(A_Deuterium[i]));
            NbPlanetResources++;
          }
        }
      }
      
      // Verification Autre destination que les planetes du compte
      if (document.getElementsByName('Destination')[PlanetSelect.length].checked == true) {
        TransferDestinationPlanet = document.getElementsByName('DestinationPlanet')[0].value;
        TransferDestinationSystem = document.getElementsByName('DestinationSystem')[0].value;
        TransferDestinationGalaxy = document.getElementsByName('DestinationGalaxy')[0].value;
      }
      
      // Remise a zero notamment pour le changement de mode de calcul
      if (Reset == true) {
        for (var i = 0; i < PlanetSelect.length; i++) {
          document.getElementsByName('Metal'+i)[0].value = '0';
          document.getElementsByName('Crystal'+i)[0].value = '0';
          document.getElementsByName('Deuterium'+i)[0].value = '0';
        }
      }
      
      // Affichage du total des planetes cochees
      document.getElementsByName('MetalTotalInput')[0].value = FormatNb(MetalTotal);
      document.getElementsByName('CrystalTotalInput')[0].value = FormatNb(CrystalTotal);
      document.getElementsByName('DeuteriumTotalInput')[0].value = FormatNb(DeuteriumTotal);
      
      // Affichage des ressources restantes
      var MetalRest, CrystalRest, DeuteriumRest;
      
      var MetalNeeded = parseInt(document.getElementsByName('MetalNeededInput')[0].value);
      var CrystalNeeded = parseInt(document.getElementsByName('CrystalNeededInput')[0].value);
      var DeuteriumNeeded = parseInt(document.getElementsByName('DeuteriumNeededInput')[0].value);
      
      MetalRest = MetalTotal-MetalNeeded;
      document.getElementsByName('MetalRestInput')[0].value = FormatNb(MetalRest);
      if (String(MetalRest).charAt(0) == '-') { document.getElementsByName('MetalRestInput')[0].style.color = '#FF0000'; }
      else { document.getElementsByName('MetalRestInput')[0].style.color = document.getElementsByName('MetalTotalInput')[0].style.color; }
      
      CrystalRest = CrystalTotal-CrystalNeeded;
      document.getElementsByName('CrystalRestInput')[0].value = FormatNb(CrystalRest);
      if (String(CrystalRest).charAt(0) == '-') { document.getElementsByName('CrystalRestInput')[0].style.color = '#FF0000'; }
      else { document.getElementsByName('CrystalRestInput')[0].style.color = document.getElementsByName('CrystalTotalInput')[0].style.color; }
      
      DeuteriumRest = DeuteriumTotal-DeuteriumNeeded;
      document.getElementsByName('DeuteriumRestInput')[0].value = FormatNb(DeuteriumRest);
      if (String(DeuteriumRest).charAt(0) == '-') { document.getElementsByName('DeuteriumRestInput')[0].style.color = '#FF0000'; }
      else { document.getElementsByName('DeuteriumRestInput')[0].style.color = document.getElementsByName('DeuteriumTotalInput')[0].style.color; }
      
      // Mise en variable des ressources necessaire au projet
      if ((document.getElementsByName('UseTotalResourcesDestinationPlanet')[0].checked == true) && (DestinationIndex >= 0)) {
        MetalNeeded = MetalNeeded-A_Metal[DestinationIndex];
        CrystalNeeded = CrystalNeeded-A_Crystal[DestinationIndex];
        DeuteriumNeeded = DeuteriumNeeded-A_Deuterium[DestinationIndex];
        if (MetalNeeded < 0) { MetalNeeded = 0; }
        if (CrystalNeeded < 0) { CrystalNeeded = 0; }
        if (DeuteriumNeeded < 0) { DeuteriumNeeded = 0; }
        NbPlanetResources--;
      }
      
      // On lance le calcul uniquement si des planetes ont ete selectionnees
      if (NbPlanetResources > 0) {
      
        // Creation des tableaux necessaires aux calculs sur les planetes selectionnees
        var A_MetalSelected = new Array(NbPlanetResources);
        var A_CrystalSelected = new Array(NbPlanetResources);
        var A_DeuteriumSelected = new Array(NbPlanetResources);
        for (var i = 0; i < NbPlanetResources; i++) {
          A_MetalSelected[i] = new Array(2);
          A_CrystalSelected[i] = new Array(2);
          A_DeuteriumSelected[i] = new Array(2);
        }
        
        // Chargement des tableaux necessaires aux calculs sur les planetes selectionnees
        for (var i = 0; i < PlanetSelect.length; i++) {
          if (document.getElementsByName('PlanetUsed'+i)[0].checked == true) {
            if (((document.getElementsByName('UseTotalResourcesDestinationPlanet')[0].checked == true) && (DestinationIndex == i)) == false) {
              A_MetalSelected[NbPlanetResourcesTemp][0] = parseInt(A_Metal[i]);
              A_MetalSelected[NbPlanetResourcesTemp][1] = i;
              A_CrystalSelected[NbPlanetResourcesTemp][0] = parseInt(A_Crystal[i]);
              A_CrystalSelected[NbPlanetResourcesTemp][1] = i;
              A_DeuteriumSelected[NbPlanetResourcesTemp][0] = parseInt(A_Deuterium[i]);
              A_DeuteriumSelected[NbPlanetResourcesTemp][1] = i;
              NbPlanetResourcesTemp++;
            }
          }
          // Mise a zero des planetes non-utilisees
          else {
            document.getElementsByName('Metal'+i)[0].value = 0;
            document.getElementsByName('Crystal'+i)[0].value = 0;
            document.getElementsByName('Deuterium'+i)[0].value = 0;
          }
        }
        
        // Calcul par reste similaire ou calcul par utilisation des planetes ou il y a le plus de ressources
        if (document.getElementsByName('CalcMode')[0].checked == true) {
          
          // Tri bubble - ordre decroissant
          for (var i = 0; i < NbPlanetResources; i++) {
            for (var j = (i+1);j < NbPlanetResources; j++) {
              if (A_MetalSelected[i][0] < A_MetalSelected[j][0]) {
                Permut = A_MetalSelected[i][0]; A_MetalSelected[i][0] = A_MetalSelected[j][0]; A_MetalSelected[j][0] = Permut;
                Permut = A_MetalSelected[i][1]; A_MetalSelected[i][1] = A_MetalSelected[j][1]; A_MetalSelected[j][1] = Permut;
              }
              if (A_CrystalSelected[i][0] < A_CrystalSelected[j][0]) {
                Permut = A_CrystalSelected[i][0]; A_CrystalSelected[i][0] = A_CrystalSelected[j][0]; A_CrystalSelected[j][0] = Permut;
                Permut = A_CrystalSelected[i][1]; A_CrystalSelected[i][1] = A_CrystalSelected[j][1]; A_CrystalSelected[j][1] = Permut;
              }
              if (A_DeuteriumSelected[i][0] < A_DeuteriumSelected[j][0]) {
                Permut = A_DeuteriumSelected[i][0]; A_DeuteriumSelected[i][0] = A_DeuteriumSelected[j][0]; A_DeuteriumSelected[j][0] = Permut;
                Permut = A_DeuteriumSelected[i][1]; A_DeuteriumSelected[i][1] = A_DeuteriumSelected[j][1]; A_DeuteriumSelected[j][1] = Permut;
              }
            }
          }
          
          // Creation des tableaux contenant les calculs du reste
          var A_MetalRest = new Array(NbPlanetResources);
          var A_CrystalRest = new Array(NbPlanetResources);
          var A_DeuteriumRest = new Array(NbPlanetResources);
          for (var i = 0; i < NbPlanetResources; i++) {
            A_MetalRest[i] = new Array(NbPlanetResources);
            A_CrystalRest[i] = new Array(NbPlanetResources);
            A_DeuteriumRest[i] = new Array(NbPlanetResources);
            for (var j = 0; j < NbPlanetResources; j++) {
              A_MetalRest[i][j] = new Array(2);
              A_CrystalRest[i][j] = new Array(2);
              A_DeuteriumRest[i][j] = new Array(2);
            }
          }
          
          // METAL
          if ((MetalNeeded > 0) && (MetalRest >= 0)) {
            
            // Calcul du reste
            for (var i = 1; i < (NbPlanetResources+1); i++) {
              MetalRest = 0;
              for (var j = 0; j < i; j++) {
                if (i == NbPlanetResources) {
                  A_MetalRest[i-1][j][0] = A_MetalSelected[j][0];
                  A_MetalRest[i-1][j][1] = A_MetalSelected[j][1];
                  MetalRest = MetalRest + A_MetalSelected[j][0];
                }
                else {
                  A_MetalRest[i-1][j][0] = A_MetalSelected[j][0] - A_MetalSelected[i][0];
                  A_MetalRest[i-1][j][1] = A_MetalSelected[j][1];
                  MetalRest = MetalRest + A_MetalSelected[j][0] - A_MetalSelected[i][0];
                }
              }
              A_MetalRest[i-1][0][2] = MetalRest;
            }
            
            // Reinitialisation du tableau des planetes utilisees
            for (var i = 0; i < PlanetSelect.length; i++) {
              A_PlanetUsed[i] = false;
            }
            
            // Recherche du reste inferieur et superieur 
            for (var i = 0; i < NbPlanetResources; i++) {
              if (A_MetalRest[i][0][2] >= MetalNeeded) {
                MetalRestMoy = Math.ceil((MetalNeeded-A_MetalRest[i][0][2])/(i+1));
                for (var j = 0; j < NbPlanetResources; j++) {
                  if (A_MetalRest[i][j][1] != undefined) {
                    A_PlanetUsed[A_MetalRest[i][j][1]] = true;
                    A_TransferMetal[A_MetalRest[i][j][1]] = A_MetalRest[i][j][0]+MetalRestMoy;
                  }
                }
                break;
              }
            }
            
            // Mise a zero des planetes non-utilisees
            for (var i = 0; i < PlanetSelect.length; i++) {
              if (A_PlanetUsed[i] == false) {
                A_TransferMetal[i] = 0;
              }
            }
    
          }
          else {
            for (var i = 0; i < PlanetSelect.length; i++) {
              A_TransferMetal[i] = 0;
            }
          }
          
          // Cristal
          if ((CrystalNeeded > 0) && (CrystalRest >= 0)) {
            
            // Calcul du reste
            for (var i = 1; i < (NbPlanetResources+1); i++) {
              CrystalRest = 0;
              for (var j = 0; j < i; j++) {
                if (i == NbPlanetResources) {
                  A_CrystalRest[i-1][j][0] = A_CrystalSelected[j][0];
                  A_CrystalRest[i-1][j][1] = A_CrystalSelected[j][1];
                  CrystalRest = CrystalRest + A_CrystalSelected[j][0];
                }
                else {
                  A_CrystalRest[i-1][j][0] = A_CrystalSelected[j][0] - A_CrystalSelected[i][0];
                  A_CrystalRest[i-1][j][1] = A_CrystalSelected[j][1];
                  CrystalRest = CrystalRest + A_CrystalSelected[j][0] - A_CrystalSelected[i][0];
                }
              }
              A_CrystalRest[i-1][0][2] = CrystalRest;
            }
            
            // Reinitialisation du tableau des planetes utilisees
            for (var i = 0; i < PlanetSelect.length; i++) {
              A_PlanetUsed[i] = false;
            }
            
            // Recherche du reste inferieur et superieur 
            for (var i = 0; i < NbPlanetResources; i++) {
              if (A_CrystalRest[i][0][2] >= CrystalNeeded) {
                CrystalRestMoy = Math.ceil((CrystalNeeded-A_CrystalRest[i][0][2])/(i+1));
                for (var j = 0; j < NbPlanetResources; j++) {
                  if (A_CrystalRest[i][j][1] != undefined) {
                    A_PlanetUsed[A_CrystalRest[i][j][1]] = true;
                    A_TransferCrystal[A_CrystalRest[i][j][1]] = A_CrystalRest[i][j][0]+CrystalRestMoy;
                  }
                }
                break;
              }
            }
            
            // Mise a zero des planetes non-utilisees
            for (var i = 0; i < PlanetSelect.length; i++) {
              if (A_PlanetUsed[i] == false) {
                A_TransferCrystal[i] = 0;
              }
            }
    
          }
          else {
            for (var i = 0; i < PlanetSelect.length; i++) {
              A_TransferCrystal[i] = 0;
            }
          }
          
          // DEUTERIUM
          if ((DeuteriumNeeded > 0) && (DeuteriumRest >= 0)) {
            
            // Calcul du reste
            for (var i = 1; i < (NbPlanetResources+1); i++) {
              DeuteriumRest = 0;
              for (var j = 0; j < i; j++) {
                if (i == NbPlanetResources) {
                  A_DeuteriumRest[i-1][j][0] = A_DeuteriumSelected[j][0];
                  A_DeuteriumRest[i-1][j][1] = A_DeuteriumSelected[j][1];
                  DeuteriumRest = DeuteriumRest + A_DeuteriumSelected[j][0];
                }
                else {
                  A_DeuteriumRest[i-1][j][0] = A_DeuteriumSelected[j][0] - A_DeuteriumSelected[i][0];
                  A_DeuteriumRest[i-1][j][1] = A_DeuteriumSelected[j][1];
                  DeuteriumRest = DeuteriumRest + A_DeuteriumSelected[j][0] - A_DeuteriumSelected[i][0];
                }
              }
              A_DeuteriumRest[i-1][0][2] = DeuteriumRest;
            }
            
            // Reinitialisation du tableau des planetes utilisees
            for (var i = 0; i < PlanetSelect.length; i++) {
              A_PlanetUsed[i] = false;
            }
            
            // Recherche du reste inferieur et superieur 
            for (var i = 0; i < NbPlanetResources; i++) {
              if (A_DeuteriumRest[i][0][2] >= DeuteriumNeeded) {
                DeuteriumRestMoy = Math.ceil((DeuteriumNeeded-A_DeuteriumRest[i][0][2])/(i+1));
                for (var j = 0; j < NbPlanetResources; j++) {
                  if (A_DeuteriumRest[i][j][1] != undefined) {
                    A_PlanetUsed[A_DeuteriumRest[i][j][1]] = true;
                    A_TransferDeuterium[A_DeuteriumRest[i][j][1]] = A_DeuteriumRest[i][j][0]+DeuteriumRestMoy;
                  }
                }
                break;
              }
            }
            
            // Mise a zero des planetes non-utilisees
            for (var i = 0; i < PlanetSelect.length; i++) {
              if (A_PlanetUsed[i] == false) {
                A_TransferDeuterium[i] = 0;
              }
            }
    
          }
          else {
            for (var i = 0; i < PlanetSelect.length; i++) {
              A_TransferDeuterium[i] = 0;
            }
          }
          
        }
        else { // Calcul par nombre de gt similaire ou calcul par utilisation du maximum de planetes
          
          // Tri bubble - ordre croissant
          for (var i = 0; i < NbPlanetResources; i++) {
            for (var j = (i+1);j < NbPlanetResources; j++) {
              if (A_MetalSelected[i][0] > A_MetalSelected[j][0]) {
                Permut = A_MetalSelected[i][0]; A_MetalSelected[i][0] = A_MetalSelected[j][0]; A_MetalSelected[j][0] = Permut;
                Permut = A_MetalSelected[i][1]; A_MetalSelected[i][1] = A_MetalSelected[j][1]; A_MetalSelected[j][1] = Permut;
              }
              if (A_CrystalSelected[i][0] > A_CrystalSelected[j][0]) {
                Permut = A_CrystalSelected[i][0]; A_CrystalSelected[i][0] = A_CrystalSelected[j][0]; A_CrystalSelected[j][0] = Permut;
                Permut = A_CrystalSelected[i][1]; A_CrystalSelected[i][1] = A_CrystalSelected[j][1]; A_CrystalSelected[j][1] = Permut;
              }
              if (A_DeuteriumSelected[i][0] > A_DeuteriumSelected[j][0]) {
                Permut = A_DeuteriumSelected[i][0]; A_DeuteriumSelected[i][0] = A_DeuteriumSelected[j][0]; A_DeuteriumSelected[j][0] = Permut;
                Permut = A_DeuteriumSelected[i][1]; A_DeuteriumSelected[i][1] = A_DeuteriumSelected[j][1]; A_DeuteriumSelected[j][1] = Permut;
              }
            }
          }
          
          // METAL
          if ((MetalNeeded > 0) && (MetalRest >= 0)) {
            
            // Calcul des ressources et affichage
            TransferMetal = MetalNeeded;
            for (var i = 0; i < NbPlanetResources; i++) {
              if (A_MetalSelected[i][0] < (TransferMetal/(NbPlanetResources-i))) {
                A_TransferMetal[A_MetalSelected[i][1]] = A_MetalSelected[i][0];
                TransferMetal = TransferMetal-A_MetalSelected[i][0];
              }
              else{
                A_TransferMetal[A_MetalSelected[i][1]] = Math.ceil(TransferMetal/(NbPlanetResources-i));
                TransferMetal = TransferMetal-Math.ceil(TransferMetal/(NbPlanetResources-i))
              }
            }
          }
          else {
            // Mise a zero du tableau des planetes
            for (var i = 0; i < PlanetSelect.length; i++) {
              A_TransferMetal[i] = 0;
            }
          }
          
          // Cristal
          if ((CrystalNeeded > 0) && (CrystalRest >= 0)) {
            
            // Calcul des ressources et affichage
            TransferCrystal = CrystalNeeded;
            for (var i = 0; i < NbPlanetResources; i++) {
              if (A_CrystalSelected[i][0] < (TransferCrystal/(NbPlanetResources-i))) {
                A_TransferCrystal[A_CrystalSelected[i][1]] = A_CrystalSelected[i][0];
                TransferCrystal = TransferCrystal-A_CrystalSelected[i][0];
              }
              else{
                A_TransferCrystal[A_CrystalSelected[i][1]] = Math.ceil(TransferCrystal/(NbPlanetResources-i));
                TransferCrystal = TransferCrystal-Math.ceil(TransferCrystal/(NbPlanetResources-i))
              }
            }
          }
          else {
            // Mise a zero du tableau des planetes
            for (var i = 0; i < PlanetSelect.length; i++) {
              A_TransferCrystal[i] = 0;
            }
          }
          
          // DEUTERIUM
          if ((DeuteriumNeeded > 0) && (DeuteriumRest >= 0)) {
            
            // Calcul des ressources et affichage
            TransferDeuterium = DeuteriumNeeded;
            for (var i = 0; i < NbPlanetResources; i++) {
              if (A_DeuteriumSelected[i][0] < (TransferDeuterium/(NbPlanetResources-i))) {
                A_TransferDeuterium[A_DeuteriumSelected[i][1]] = A_DeuteriumSelected[i][0];
                TransferDeuterium = TransferDeuterium-A_DeuteriumSelected[i][0];
              }
              else{
                A_TransferDeuterium[A_DeuteriumSelected[i][1]] = Math.ceil(TransferDeuterium/(NbPlanetResources-i));
                TransferDeuterium = TransferDeuterium-Math.ceil(TransferDeuterium/(NbPlanetResources-i))
              }
            }
          }
          else {
            // Mise a zero du tableau des planetes
            for (var i = 0; i < PlanetSelect.length; i++) {
              A_TransferDeuterium[i] = 0;
            }
          }
          
        }
        
        // Mise en memoire du tableau des ressources a envoyer
        var A_ResourcesToSend = new Array();
        for (var i = 0; i < PlanetSelect.length; i++) {
          if (((document.getElementsByName('UseTotalResourcesDestinationPlanet')[0].checked == true) && (DestinationIndex == i)) == false) {
            document.getElementsByName('Metal'+i)[0].value = FormatNb(A_TransferMetal[i]);
            document.getElementsByName('Crystal'+i)[0].value = FormatNb(A_TransferCrystal[i]);
            document.getElementsByName('Deuterium'+i)[0].value = FormatNb(A_TransferDeuterium[i]);
            A_ResourcesToSend[i] = (A_TransferMetal[i]+A_TransferCrystal[i]+A_TransferDeuterium[i]);
          }
          else {
            document.getElementsByName('Metal'+i)[0].value = ((MetalNeeded > 0)?FormatNb(A_Metal[i]):FormatNb(document.getElementsByName('MetalNeededInput')[0].value));
            document.getElementsByName('Crystal'+i)[0].value = ((CrystalNeeded > 0)?FormatNb(A_Crystal[i]):FormatNb(document.getElementsByName('CrystalNeededInput')[0].value));
            document.getElementsByName('Deuterium'+i)[0].value = ((DeuteriumNeeded > 0)?FormatNb(A_Deuterium[i]):FormatNb(document.getElementsByName('DeuteriumNeededInput')[0].value));
          }
        }
        
        // Recuperation du niveau de la technologie reacteur a combustion
        var TechLevel = A_Research[7].Level;
        
        // Calcul de la vitesse des gts et recycleurs
        var SpeedGT = 7500+TechLevel*750;
        var SpeedRecycler = 2000+TechLevel*200;
        // Consommation des vaisseaux
        var ConsumptionGT = 50;
        var ConsumptionRecycler = 300;
        // Capacite
        var CapacityGT = 25000;
        var CapacityRecycler = 20000;
        var CapacityPT = 5000;
        
        // Recuperation du niveau de la technologie reacteur a impulsion et calcul de la vitesse des pts
        if (TechLevel >= 5) {
          TechLevel = A_Research[8].Level;
          var SpeedPT = 10000+TechLevel*2000;
          var ConsumptionPT = 20;
        }
        else {
          var SpeedPT = 5000+TechLevel*500;
          var ConsumptionPT = 10;
        }
        
        // Recuperation du choix de l'utlisateur
        var UseGT = document.getElementsByName('ShipType')[1].checked;
        TransferShipType = (UseGT == true) ? C_LargeCargoShip : C_SmallCargoShip;
        
        // Calcul du temps de vol a toutes les vitesses pour chaque planete (Source : http://uni6.ogame.fr/game/js/flotten.js)
        var MaxTime = 0;
        var speedfactor = TransferRatioSpeed;
        for (var i = 0; i < PlanetSelect.length; i++) {
          A_FlightRecyclerTime[i] = new Array(10);
          A_FlightTime[i] = new Array(10);
          A_FlightPTTime[i] = new Array(10);
          if (A_ResourcesToSend[i] > 0) {
            
            // Calcul de la distance
            var dist = 0;
            
          	if ((TransferDestinationGalaxy - A_Planet[i].Galaxy) != 0) {
          		dist = Math.abs(TransferDestinationGalaxy - A_Planet[i].Galaxy) * 20000;
          	} else if ((TransferDestinationSystem - A_Planet[i].System) != 0) {
          		dist = Math.abs(TransferDestinationSystem - A_Planet[i].System) * 95 + 2700;
          	} else if ((TransferDestinationPlanet - A_Planet[i].Planet) != 0) {
          		dist = Math.abs(TransferDestinationPlanet - A_Planet[i].Planet) * 5 + 1000;
          	} else {
          		dist = 5; // Distance planete - lune
          	}
          	
          	// Calcul du temps de vol
          	if ((dist > 5) || (A_Planet[i].Type != PlanetType)) {
              // Calcul du temps a toutes les vitesses
              for (var j = 0; j < 10; j++) {
                A_FlightRecyclerTime[i][j] = Math.round(((35000 / (j+1) * Math.sqrt(dist * 10 / SpeedRecycler) + 10) / speedfactor )) * 1000;
                A_FlightTime[i][j] = Math.round(((35000 / (j+1) * Math.sqrt(dist * 10 / SpeedGT) + 10) / speedfactor )) * 1000;
                A_FlightPTTime[i][j] = Math.round(((35000 / (j+1) * Math.sqrt(dist * 10 / SpeedPT) + 10) / speedfactor )) * 1000;
              }
              if (UseGT == true) {
                if (A_FlightTime[i][9] > MaxTime) { MaxTime = A_FlightTime[i][9]; }
              }
              else {
                if (A_FlightPTTime[i][9] > MaxTime) { MaxTime = A_FlightPTTime[i][9]; }
              }
            }
            else {
              for (var j = 0; j < 10; j++) {
                A_FlightRecyclerTime[i][j] = 0;
                A_FlightTime[i][j] = 0;
                A_FlightPTTime[i][j] = 0;
              }
            }
          }
          else {
            for (var j = 0; j < 10; j++) {
              A_FlightRecyclerTime[i][j] = 0;
              A_FlightTime[i][j] = 0;
              A_FlightPTTime[i][j] = 0;
            }
          }
        }
        
        // Calcul du temps de vol avec une heure d'arrivee
        if (document.getElementsByName('TimeToGo')[1].checked == true) {
          var CurrentDate = new Date();
          var ArrivalDate = new Date(document.getElementsByName('Year1')[0].value+'/'+document.getElementsByName('Month1')[0].value+'/'+document.getElementsByName('Day1')[0].value+' '+document.getElementsByName('Hour1')[0].value+ ':'+document.getElementsByName('Minute1')[0].value+':00');
          var Delay = ArrivalDate.getTime()-CurrentDate.getTime();
          if (MaxTime < Delay) {
            MaxTime = Delay;
          }
        }
        // Calcul du temps de vol avec une duree determinee
        else if (document.getElementsByName('TimeToGo')[2].checked == true) {
          var Delay = 1000*(parseInt(document.getElementsByName('Day2')[0].value)*86400+parseInt(document.getElementsByName('Hour2')[0].value)*3600+parseInt(document.getElementsByName('Minute2')[0].value)*60);
          if (MaxTime < Delay) {
            MaxTime = Delay;
          }
        }
        
        // Calcul du temps d'envoi reel, de la vitesse et de la necessite de l'ajout d'un recycleur 
        if (document.getElementsByName('SameTime')[0].checked == true) {
          var AddRecyclerInput = document.getElementsByName('AddRecycler')[0].checked;
          for (var i = 0; i < PlanetSelect.length; i++) {
            var DifTime = MaxTime;
            A_AddRecycler[i] = false;
            var FlightTimeRes = 0;
            A_Speed[i] = 0;
            if (A_ResourcesToSend[i] > 0) {
              for (var j = 0; j < 10; j++) {
                if (UseGT == true) {
                  if (Math.abs(MaxTime-A_FlightTime[i][j]) < DifTime) {
                    DifTime = Math.abs(MaxTime-A_FlightTime[i][j]);
                    A_Speed[i] = (j+1)*10;
                    A_AddRecycler[i] = false;
                    FlightTimeRes = A_FlightTime[i][j];
                  }
                }
                else {
                  if (Math.abs(MaxTime-A_FlightPTTime[i][j]) < DifTime) {
                    DifTime = Math.abs(MaxTime-A_FlightPTTime[i][j]);
                    A_Speed[i] = (j+1)*10;
                    A_AddRecycler[i] = false;
                    FlightTimeRes = A_FlightPTTime[i][j];
                  }
                }
                if (AddRecyclerInput == true) {
                  if (Math.abs(MaxTime-A_FlightRecyclerTime[i][j]) < DifTime) {
                    DifTime = Math.abs(MaxTime-A_FlightRecyclerTime[i][j]);
                    A_Speed[i] = (j+1)*10;
                    A_AddRecycler[i] = true;
                    FlightTimeRes = A_FlightRecyclerTime[i][j];
                  }
                }
              }
            }
            document.getElementsByName('Recycler'+i)[0].value = ((A_AddRecycler[i] == true) ? A_Language[C_Yes] : A_Language[C_No]);
            document.getElementsByName('Speed'+i)[0].value = A_Speed[i]+'%';
            document.getElementsByName('FlightTime'+i)[0].value = FormatTime(FlightTimeRes, document.getElementsByName('TimeToGo')[1].checked);
          }
        }
        else {
          for (var i = 0; i < PlanetSelect.length; i++) {
            A_Speed[i] = 100;
            A_AddRecycler[i] = false;
            document.getElementsByName('Recycler'+i)[0].value = A_Language[C_No];
            if (UseGT == true) {
              document.getElementsByName('FlightTime'+i)[0].value = FormatTime(A_FlightTime[i][9]);
              var FlightTimeRes = A_FlightTime[i][9];
            }
            else {
              document.getElementsByName('FlightTime'+i)[0].value = FormatTime(A_FlightPTTime[i][9]);
              var FlightTimeRes = A_FlightPTTime[i][9];
            }
            if (FlightTimeRes > 0) {
              document.getElementsByName('Speed'+i)[0].value = A_Speed[i]+'%';
            }
            else {
              document.getElementsByName('Speed'+i)[0].value = '0%';
            }
          }
        }
        
        // Calcul de la consommation des gts par planete (Source : http://uni6.ogame.fr/game/js/flotten.js)
        // legere modification de la formule puisque normalement on doit connaitre le nombre de vaisseau a envoyer
        // d'ou un leger ecart superieur dans le resultat renvoye
        var dur = 0;
        var spd = 0;
        
        for (var i = 0; i < PlanetSelect.length; i++) {
          // Calcul de la distance
          var dist = 0;
        	if ((TransferDestinationGalaxy - A_Planet[i].Galaxy) != 0) {
        		dist = Math.abs(TransferDestinationGalaxy - A_Planet[i].Galaxy) * 20000;
        	} else if ((TransferDestinationSystem - A_Planet[i].System) != 0) {
        		dist = Math.abs(TransferDestinationSystem - A_Planet[i].System) * 5 * 19 + 2700;
        	} else if ((TransferDestinationPlanet - A_Planet[i].Planet) != 0) {
        		dist = Math.abs(TransferDestinationPlanet - A_Planet[i].Planet) * 5 + 1000;
        	} else {
        		dist = 5; // Distance planete - lune
        	}
        	if ((dist > 5) || (A_Planet[i].Type != PlanetType)) {
          	// Calcul de la duree du vol
          	if (A_AddRecycler[i] == true) {
              dur = Math.round(((35000 / (A_Speed[i]/10) * Math.sqrt(dist * 10 / SpeedRecycler) + 10) / speedfactor ));
            }
            else {
              if (UseGT == true){
                dur = Math.round(((35000 / (A_Speed[i]/10) * Math.sqrt(dist * 10 / SpeedGT) + 10) / speedfactor ));
              }
              else {
                dur = Math.round(((35000 / (A_Speed[i]/10) * Math.sqrt(dist * 10 / SpeedPT) + 10) / speedfactor ));
              }
            }
            // Calcul de la consommation
            spd = 35000 / (dur * speedfactor - 10) * Math.sqrt(dist * 10 / SpeedGT);
            A_ConsumptionGT[i] = Math.round(ConsumptionGT * dist / 35000 * ((spd / 10) + 1) * ((spd / 10) + 1)) + 1;
            spd = 35000 / (dur * speedfactor - 10) * Math.sqrt(dist * 10 / SpeedPT);
            A_ConsumptionPT[i] = Math.round(ConsumptionPT * dist / 35000 * ((spd / 10) + 1) * ((spd / 10) + 1)) + 1;
            spd = 35000 / (dur * speedfactor - 10) * Math.sqrt(dist * 10 / SpeedRecycler);
            A_ConsumptionRecycler[i] = Math.round(ConsumptionRecycler * dist / 35000 * ((spd / 10) + 1) * ((spd / 10) + 1)) + 1;
          }
          else {
            A_ConsumptionGT[i] = 0;
            A_ConsumptionPT[i] = 0;
            A_ConsumptionRecycler[i] = 0;
          }
        }
        
        // Calcul du nombre de gt ou pt
        for (var i = 0; i < PlanetSelect.length; i++) {
          if (UseGT == true) {
            if (A_ConsumptionGT[i] > 0) {
              if (A_AddRecycler[i] == false) {
                NbGT = Math.ceil(A_ResourcesToSend[i]/(CapacityGT-A_ConsumptionGT[i]));
              }
              else {
                NbGT = Math.ceil((A_ResourcesToSend[i]-CapacityRecycler)/(CapacityGT-A_ConsumptionGT[i]));
              }
            }
            else {
              NbGT = 0;
            }
          }
          else {
            if (A_ConsumptionPT[i] > 0) {
              if (A_AddRecycler[i] == false) {
                NbPT = Math.ceil(A_ResourcesToSend[i]/(CapacityPT-A_ConsumptionPT[i]));
              }
              else {
                NbPT = Math.ceil((A_ResourcesToSend[i]-CapacityRecycler)/(CapacityPT-A_ConsumptionPT[i]));
              }
            }
            else {
              NbPT = 0;
            }
          }
          if (UseGT == true) {
            document.getElementsByName('Consumption'+i)[0].value = FormatNb((A_ConsumptionGT[i]*NbGT+((A_AddRecycler[i] == true) ? A_ConsumptionRecycler[i] : 0)));
          }
          else {
            document.getElementsByName('Consumption'+i)[0].value = FormatNb((A_ConsumptionPT[i]*NbPT+((A_AddRecycler[i] == true) ? A_ConsumptionRecycler[i] : 0)));
          }
          document.getElementsByName('TransportShip'+i)[0].value = FormatNb(((NbGT > 0) ? NbGT : NbPT));
        }
      }
      else{
        // Mise a zero generale 
        for (var i = 0; i < PlanetSelect.length; i++) {
          document.getElementsByName('Metal'+i)[0].value = '0';
          document.getElementsByName('Crystal'+i)[0].value = '0';
          document.getElementsByName('Deuterium'+i)[0].value = '0';
          document.getElementsByName('Consumption'+i)[0].value = '0';
          document.getElementsByName('FlightTime'+i)[0].value = '0s';
          document.getElementsByName('Speed'+i)[0].value = '0%';
          document.getElementsByName('TransportShip'+i)[0].value = '0';
          document.getElementsByName('Recycler'+i)[0].value = A_Language[C_No];
        }
      }
    }
  }
  catch(err) {
    ShowError(err, 'RefreshTotal('+Reset+')');
  }
}
unsafeWindow.RefreshTotal = RefreshTotal;

function SavePlanetTransfer(PlanetIndex) {
  try {
    var Value = 'Checked='+A_Transfer[PlanetIndex].Checked+'|'+
    'OriginePlanet='+A_Transfer[PlanetIndex].OriginePlanet+'|'+
    'OrigineSystem='+A_Transfer[PlanetIndex].OrigineSystem+'|'+
    'OrigineGalaxy='+A_Transfer[PlanetIndex].OrigineGalaxy+'|'+
    'Metal='+A_Transfer[PlanetIndex].Metal+'|'+
    'Crystal='+A_Transfer[PlanetIndex].Crystal+'|'+
    'Deuterium='+A_Transfer[PlanetIndex].Deuterium+'|'+
    'Speed='+A_Transfer[PlanetIndex].Speed+'|'+
    'TransportShip='+A_Transfer[PlanetIndex].TransportShip+'|'+
    'Recycler='+A_Transfer[PlanetIndex].Recycler+'|'+
    'State='+A_Transfer[PlanetIndex].State;
    GMsetValue('OT_'+A_Planet[PlanetIndex].Id+'_Transfer', Value);
  }
  catch(err) {
    ShowError(err, 'SavePlanetTransfer('+PlanetIndex+')');
  }
}
unsafeWindow.SavePlanetTransfer = SavePlanetTransfer
 
function TransferSave(){
  try {
    // Verification si des donnees ont ete saisies
    var MetalNeeded = ((document.getElementsByName('MetalNeededInput')[0].value == '') ? 0 : parseInt(document.getElementsByName('MetalNeededInput')[0].value));
    var CrystalNeeded = ((document.getElementsByName('CrystalNeededInput')[0].value == '') ? 0 : parseInt(document.getElementsByName('CrystalNeededInput')[0].value));
    var DeuteriumNeeded = ((document.getElementsByName('DeuteriumNeededInput')[0].value == '') ? 0 : parseInt(document.getElementsByName('DeuteriumNeededInput')[0].value));
    if ((MetalNeeded == 0) && (CrystalNeeded == 0) && (DeuteriumNeeded == 0)) {
      alert(A_Language[C_NoResources]);
      return;
    }
    
    var Metal = 0;
    var Crystal = 0;
    var Deuterium = 0;
    
    // Recuperation du choix de l'utlisateur
    var UseGT = document.getElementsByName('ShipType')[1].checked;
    TransferShipType = (UseGT == true) ? C_LargeCargoShip : C_SmallCargoShip;
    
    // Verification si envoi possible
    var Verif = true;
    var ShipInLack = '';
    for (var i = 0; i < PlanetSelect.length; i++) {
      if (((UseGT == true) ? A_Fleets[i][1] : A_Fleets[i][0]) < parseInt(document.getElementsByName('TransportShip'+i)[0].value.replace(/\./g,'').replace(/k/g,'000'))) {
        Verif = false;
        ShipInLack += A_Planet[i].Name+' : '+((UseGT == true) ? A_Construction[C_Fleets][1].Name : A_Construction[C_Fleets][0].Name)+' = '+FormatNb(((UseGT == true) ? A_Fleets[i][1] : A_Fleets[i][0]))+' / '+FormatNb(document.getElementsByName('TransportShip'+i)[0].value.replace(/\./g,'').replace(/k/g,'000'))+'\n';
      }
      if (A_Fleets[i][7] < ((document.getElementsByName('Recycler'+i)[0].value == A_Language[C_Yes]) ? 1 : 0)) {
        Verif = false;
        ShipInLack += A_Planet[i].Name+' : '+A_Construction[C_Fleets][7].Name+' = '+FormatNb(A_Fleets[i][7])+' / '+FormatNb(document.getElementsByName('Recycler'+i)[0].value)+'\n';
      }
    }
    if (Verif == false) {
      alert(A_Language[C_NotEnoughShip1]+'\n\n'+ShipInLack+'\n'+A_Language[C_NotEnoughShip2]);
      return;
    }
    
    // Sauvegarde
    for (var i = 0; i < PlanetSelect.length; i++) {
      // Destination
      if (document.getElementsByName('Destination')[i].checked == true) {
        TransferDestinationPlanet = A_Planet[i].Planet;
        TransferDestinationSystem = A_Planet[i].System;
        TransferDestinationGalaxy = A_Planet[i].Galaxy;
        TransferDestinationType = A_Planet[i].Type;
        A_Transfer[i].Checked = false;
        A_Transfer[i].OriginePlanet = A_Planet[i].Planet;
        A_Transfer[i].OrigineSystem = A_Planet[i].System;
        A_Transfer[i].OrigineGalaxy = A_Planet[i].Galaxy;
        A_Transfer[i].Metal = 0;
        A_Transfer[i].Crystal = 0;
        A_Transfer[i].Deuterium = 0;
        A_Transfer[i].Speed = 0;
        A_Transfer[i].TransportShip = 0;
        A_Transfer[i].Recycler = false;
        A_Transfer[i].State = 0;      
      }
      else {
        if (document.getElementsByName('PlanetUsed'+i)[0].checked == true) {
          Metal = A_TransferMetal[i];
          Crystal = A_TransferCrystal[i];
          Deuterium = A_TransferDeuterium[i];
          if (Metal+Crystal+Deuterium > 0) {
            A_Transfer[i].Checked = true;
            A_Transfer[i].State = 1;
          }
          else {
            A_Transfer[i].Checked = false;
            A_Transfer[i].State = 0;
          }
          A_Transfer[i].OriginePlanet = A_Planet[i].Planet;
          A_Transfer[i].OrigineSystem = A_Planet[i].System;
          A_Transfer[i].OrigineGalaxy = A_Planet[i].Galaxy;
          A_Transfer[i].Metal = Metal;
          A_Transfer[i].Crystal = Crystal;
          A_Transfer[i].Deuterium = Deuterium;
          A_Transfer[i].Speed = document.getElementsByName('Speed'+i)[0].value.replace(/\%/g,'');
          A_Transfer[i].TransportShip = document.getElementsByName('TransportShip'+i)[0].value.replace(/\./g,'');
          A_Transfer[i].Recycler = ((document.getElementsByName('Recycler'+i)[0].value == A_Language[C_Yes]) ? true : false);
        }
        else {
          A_Transfer[i].Checked = false;
          A_Transfer[i].State = 0;
        }
      }
      SavePlanetTransfer(i);
    }
    if (document.getElementsByName('Destination')[PlanetSelect.length].checked == true) {
      TransferDestinationPlanet = document.getElementsByName('DestinationPlanet')[0].value;
      TransferDestinationSystem = document.getElementsByName('DestinationSystem')[0].value;
      TransferDestinationGalaxy = document.getElementsByName('DestinationGalaxy')[0].value;
      TransferDestinationType = document.getElementsByName('DestinationType')[0].value;
    }
    TransferState = true;
    TransferShow = true;
    SaveTransfer();
    
    // Modification du style
    document.getElementById('OgameTransferCalc').style.display = 'none';
    document.getElementById('OgameTransferRes').style.display = '';
    document.getElementsByName('Save')[0].style.display = 'none';
    document.getElementsByName('Unsave')[0].style.display = '';
    document.getElementsByName('FillShip')[0].style.display = '';
    
    // Rechargement de la page (les modifications n'ont pas le temps d'etre pris en charge depuis la MAJ GreaseMonkey...)
    window.setTimeout('window.location.replace(window.location)', 200);
  }
  catch(err) {
    ShowError(err, 'TransferSave()');
  }
}
unsafeWindow.TransferSave = TransferSave;

function GenerateTransferTable(ReturnMode) {
  try {
    var SendTable = '<table>';
    SendTable += '<tr><td class="c" colspan="'+(PlanetSelect.length+1)+'">'+A_Language[C_Destination]+' : '+A_Language[TransferDestinationType]+' ['+TransferDestinationGalaxy+':'+TransferDestinationSystem+':'+TransferDestinationPlanet+']</td></tr>';
    var PlanetTr = '';
    var MetalTr = '';
    var CrystalTr = '';
    var DeuteriumTr = '';
    var SpeedTr = '';
    var TransportShipTr = '';
    var RecyclerTr = '';
    var StateTr = '';
    for (var j = 0; j < PlanetSelect.length; j++) {
      if (A_Transfer[j].Checked == true) {
        PlanetTr += '<td class="c"><a style="cursor:pointer" onclick="SaveTransfer(true);window.location.replace(\''+A_Planet[j].Url+'\');">'+A_Planet[j].Name+'</a></td>';
        MetalTr += '<th>'+FormatNb(A_Transfer[j].Metal)+'</th>';
        CrystalTr += '<th>'+FormatNb(A_Transfer[j].Crystal)+'</th>';
        DeuteriumTr += '<th>'+FormatNb(A_Transfer[j].Deuterium)+'</th>';
        SpeedTr += '<th>'+FormatNb(A_Transfer[j].Speed)+'%</th>';
        TransportShipTr += '<th>'+FormatNb(A_Transfer[j].TransportShip)+'</th>';
        RecyclerTr += '<th>'+((A_Transfer[j].Recycler == true) ? A_Language[C_Yes] : A_Language[C_No])+'</th>';
        if ((TransferDestinationPlanet == A_Transfer[j].OriginePlanet) && (TransferDestinationSystem == A_Transfer[j].OrigineSystem) && (TransferDestinationGalaxy == A_Transfer[j].OrigineGalaxy) && (TransferDestinationType == A_Planet[j].Type)) {
          StateTr += '<th><font color="orange">'+A_Language[C_Destination]+'</color></th>';
        }
        else {
          StateTr += '<th>'+((A_Transfer[j].State >= 1) ? '<font color="red">'+A_Language[C_ToTransfer]+'</font>' : '<font color="#00FF00">'+A_Language[C_Transfered]+'</color>')+'</th>';
        }
      }
      else {
        PlanetTr += '<td class="c"><a style="cursor:pointer" onclick="SaveTransfer(true);window.location.replace(\''+A_Planet[j].Url+'\');">'+A_Planet[j].Name+'</a></td>';
        MetalTr += '<th>-</th>';
        CrystalTr += '<th>-</th>';
        DeuteriumTr += '<th>-</th>';
        SpeedTr += '<th>-</th>';
        TransportShipTr += '<th>-</th>';
        RecyclerTr += '<th>-</th>';
        if ((TransferDestinationPlanet == A_Transfer[j].OriginePlanet) && (TransferDestinationSystem == A_Transfer[j].OrigineSystem) && (TransferDestinationGalaxy == A_Transfer[j].OrigineGalaxy) && (TransferDestinationType == A_Planet[j].Type)) {
          StateTr += '<th><font color="orange">'+A_Language[C_Destination]+'</color></th>';
        }
        else {
          StateTr += '<th>-</th>';
        }
      }
    }
    SendTable += '<tr><td style="background:none;"></td>'+PlanetTr+'</tr>'+
    '<tr><td class="c">'+A_Language[C_Metal]+'</td>'+MetalTr+'</tr>'+
    '<tr><td class="c">'+A_Language[C_Crystal]+'</td>'+CrystalTr+'</tr>'+
    '<tr><td class="c">'+A_Language[C_Deuterium]+'</td>'+DeuteriumTr+'</tr>'+
    '<tr><td class="c">'+A_Language[C_Speed]+'</td>'+SpeedTr+'</tr>'+
    '<tr><td class="c">'+A_Language[TransferShipType]+'</td>'+TransportShipTr+'</tr>'+
    '<tr><td class="c">'+A_Language[C_NeededRecycler]+'</td>'+RecyclerTr+'</tr>'+
    '<tr><td class="c">'+A_Language[C_TransferState]+'</td>'+StateTr+'</tr>';
    
    if (ReturnMode == false) {
      document.getElementById('OgameTransferRes').innerHTML = SendTable+'</table><br />';
    }
    else {
      return SendTable+'</table><br />';
    }
  }
  catch(err) {
    ShowError(err, 'GenerateTransferTable('+ReturnMode+')');
  }
}
unsafeWindow.GenerateTransferTable = GenerateTransferTable;

function TransferUnsave() {
  try {
    // Annulation de la memorisation
    TransferState = false;
    SaveTransfer();
    
    // Modification du style
    document.getElementById('OgameTransferCalc').style.display = '';
    document.getElementById('OgameTransferRes').style.display = 'none';
    document.getElementsByName('Save')[0].style.display = '';
    document.getElementsByName('Unsave')[0].style.display = 'none';
    document.getElementsByName('FillShip')[0].style.display = 'none';
  }
  catch(err) {
    ShowError(err, 'TransferUnsave()');
  }
}
unsafeWindow.TransferUnsave = TransferUnsave;

function SaveCalcParameter() {
  try {
    var Value = 'CalcMode='+(document.getElementsByName('CalcMode')[0].checked==true?0:1)+'|'+
    'UseTotalResourcesDestinationPlanet='+document.getElementsByName('UseTotalResourcesDestinationPlanet')[0].checked+'|'+
    'SameTime='+document.getElementsByName('SameTime')[0].checked+'|'+
    'TimeToGo='+(document.getElementsByName('TimeToGo')[0].checked==true?0:(document.getElementsByName('TimeToGo')[1].checked==true?1:2))+'|'+
    'AddRecycler='+document.getElementsByName('AddRecycler')[0].checked+'|'+
    'ShipType='+(document.getElementsByName('ShipType')[0].checked==true?0:1);
    GMsetValue('OT_'+Account+'_TransferCalcOption', Value);
  }
  catch(err) {
    ShowError(err, 'SaveCalcParameter()');
  }
}
unsafeWindow.SaveCalcParameter = SaveCalcParameter;

function FillShip() {
  try {
    var UseGT, NbGT = 0, NbPT = 0;
    // Recuperation du choix de l'utlisateur
    UseGT = ((TransferShipType == C_LargeCargoShip) ? true : false);
    if ((TransferDestinationPlanet == A_Planet[PlanetSelectedIndex].Planet) && (TransferDestinationSystem == A_Planet[PlanetSelectedIndex].System) && (TransferDestinationGalaxy == A_Planet[PlanetSelectedIndex].Galaxy) && (TransferDestinationType == A_Planet[PlanetSelectedIndex].Type)) {
      alert(A_Language[C_NoTransferFromDestinationPlanet]);
    }
    else {
      if (UseGT == true) {
        if (document.getElementsByName('maxship203')[0]) {
          NbGT = parseInt(document.getElementsByName('maxship203')[0].value);
        }
        else {
          NbGT = 0;
        }
      } // PT
      else {
        if (document.getElementsByName('maxship202')[0]) {
          var NbPT = parseInt(document.getElementsByName('maxship202')[0].value);
        }
        else {
          var NbPT = 0;
        }
      }
      if (document.getElementsByName('maxship209')[0]) {
        var NbRecycler = parseInt(document.getElementsByName('maxship209')[0].value);
      }
      else {
        var NbRecycler = 0;
      }
      if (A_Transfer[PlanetSelectedIndex].Checked == true) { 
        if (A_Transfer[PlanetSelectedIndex].State >= 1) {
          if (parseInt(A_Transfer[PlanetSelectedIndex].TransportShip) <= ((UseGT == true) ? NbGT : NbPT)) {
            if ((A_Transfer[PlanetSelectedIndex].Recycler == true) && (NbRecycler < 1)) {
              alert(A_Language[C_NoRecycler]);
              document.getElementsByName('ship20'+((UseGT == true) ? '3' : '2'))[0].value = parseInt(A_Transfer[PlanetSelectedIndex].TransportShip)+((UseGT == true) ? 1 : 4);
            }
            else {
              if (A_Transfer[PlanetSelectedIndex].Recycler == true) {
                document.getElementsByName('ship20'+((UseGT == true) ? '3' : '2'))[0].value = A_Transfer[PlanetSelectedIndex].TransportShip;
                document.getElementsByName('ship209')[0].value = 1;
              }
              else {
                document.getElementsByName('ship20'+((UseGT == true) ? '3' : '2'))[0].value = A_Transfer[PlanetSelectedIndex].TransportShip;
              }
            }
            A_Transfer[PlanetSelectedIndex].State = A_Transfer[PlanetSelectedIndex].State|2;
            SavePlanetTransfer(PlanetSelectedIndex);
          }
          else {
            if (UseGT == true) {
              alert(A_Language[C_NotEnoughLargeCargoShip]+' ('+NbGT+'/'+A_Transfer[PlanetSelectedIndex].TransportShip+')');
            }
            else {
              alert(A_Language[C_NotEnoughSmallCargoShip]+' ('+NbPT+'/'+A_Transfer[PlanetSelectedIndex].TransportShip+')');
            }
          }
        }
        else {
          alert(A_Language[C_AlreadyTransfered]);
        }
      }
      else {
        alert(A_Language[C_PlanetNotSelected]);
      }
    }
  }
  catch(err) {
    ShowError(err, 'FillShip()');
  }
}
unsafeWindow.FillShip = FillShip;

function FillCoordAndSpeed() {
  try {
    if (TransferState == true){
      if (A_Transfer[PlanetSelectedIndex].State >= 1) {
        document.getElementsByName('planet')[0].value = TransferDestinationPlanet;
        document.getElementsByName('system')[0].value = TransferDestinationSystem;
        document.getElementsByName('galaxy')[0].value = TransferDestinationGalaxy;
        document.getElementsByName('speed')[0].options[10-(A_Transfer[PlanetSelectedIndex].Speed/10)].selected = true;
        if (TransferDestinationType == C_Planet) {
          document.getElementsByName('planettype')[0].options[0].selected = true;
        }
        else {
          document.getElementsByName('planettype')[0].options[2].selected = true;
        }
      }
      A_Transfer[PlanetSelectedIndex].State = A_Transfer[PlanetSelectedIndex].State|4;
      SavePlanetTransfer(PlanetSelectedIndex);
    }
    else {
      alert(A_Language[C_NoTransfer])
    }
  }
  catch(err) {
    ShowError(err, 'FillCoordAndSpeed()');
  }
}
unsafeWindow.FillCoordAndSpeed = FillCoordAndSpeed;

function FillResources() {
  try {
    if (TransferState == true){
      if ((TransferDestinationPlanet == A_Planet[PlanetSelectedIndex].Planet) && (TransferDestinationSystem == A_Planet[PlanetSelectedIndex].System) && (TransferDestinationGalaxy == A_Planet[PlanetSelectedIndex].Galaxy) && (TransferDestinationType == A_Planet[PlanetSelectedIndex].Type)) {
        alert(A_Language[C_NoTransferFromDestinationPlanet]);
      }
      else {
        if (A_Transfer[PlanetSelectedIndex].State >= 1) { 
          document.getElementsByName('resource1')[0].value = A_Transfer[PlanetSelectedIndex].Metal;
          document.getElementsByName('resource2')[0].value = A_Transfer[PlanetSelectedIndex].Crystal;
          document.getElementsByName('resource3')[0].value = A_Transfer[PlanetSelectedIndex].Deuterium;
          var TransportType = document.getElementsByName('order');
          if (TransportType) {
            for (var j = 0; j < TransportType.length; j++) {
              if (TransportType[j].value == 3) {
                TransportType[j].checked = true;
              }
            }
          }
        }
        else {
          alert(A_Language[C_AlreadyTransfered]);
        }
      }
      A_Transfer[PlanetSelectedIndex].State = A_Transfer[PlanetSelectedIndex].State|8;
      SavePlanetTransfer(PlanetSelectedIndex);
    }
    else {
      alert(A_Language[C_NoTransfer])
    }
  }
  catch(err) {
    ShowError(err, 'FillResources()');
  }
}
unsafeWindow.FillResources = FillResources;

function InvertSelection() {
  for (i=0; i<PlanetSelect.length; i++) {
    if (document.getElementsByName('PlanetUsed'+i)[0].checked == true) {
      document.getElementsByName('PlanetUsed'+i)[0].checked = false;
    }
    else {
      document.getElementsByName('PlanetUsed'+i)[0].checked = true;
    }
  }
}
unsafeWindow.InvertSelection = InvertSelection;






/* PAGES FLOTTE (Affichage des formulaires pour les differentes pages : Flotte, Coordonnees & Vitesse, Ressources)
   ----------------------------*/

// Page flotte 1 - Selection des vaisseaux
if ((OgamePage == 'flotten1') && (!Empire)) {
  try {
    var TransferVerif = true;
    for (var i = 0; i < PlanetSelect.length; i++) {
      if (A_Transfer[i].State > 0) {
        TransferVerif = false;
      }
    }
    if (TransferVerif == true) {
      TransferState = false;
      SaveTransfer();
    }
    
    // Creation du Div qui contiendra le formulaire de calcul
    var ShipContent = document.getElementById('content');
    var ShipTable = ShipContent.getElementsByTagName('table')[0];
    var ShipDiv = document.createElement('div');
    ShipDiv.id = 'TransferResources';
    
    // Chargement des valeurs temps reel
    CalcRealTimeResources();
    
    // Initialisation des variables
    var PlanetTd = '';
    var MetalTd = '';
    var CrystalTd = '';
    var DeuteriumTd = '';
    var DestinationTd = '';
    var PlanetUsedTd = '';
    var MetalTotal = (((RealTimeResources==true)&&(UseRealTimeResources==true))?A_RealTimeResources[PlanetSelect.length].Metal:0);
    var CrystalTotal = (((RealTimeResources==true)&&(UseRealTimeResources==true))?A_RealTimeResources[PlanetSelect.length].Crystal:0);
    var DeuteriumTotal = (((RealTimeResources==true)&&(UseRealTimeResources==true))?A_RealTimeResources[PlanetSelect.length].Deuterium:0);
    var MetalToSendTd = '';
    var CrystalToSendTd = '';
    var DeuteriumToSendTd = '';
    var FlightTimeTd = '';
    var SpeedTd = '';
    var ConsumptionTd = '';
    var TransportShipToSendTd = '';
    var RecyclerNeededTd = '';
    var TimeUpdate = '';
    var PlanetUndefined = false;
    var NewTransfer = false;
    
    if (parseInt(TransferMetal)+parseInt(TransferCrystal)+parseInt(TransferDeuterium) > 0) {
        NewTransfer = true;
    }
    
    // Creation du formulaire
    for (var i = 0; i < PlanetSelect.length; i++) {
      
      // Creation de l'entete du tableau d'apercu du stock et du tableau de resultat du calcul
      if (i == PlanetSelectedIndex) {
        PlanetTd += '<th align="center" id="PlanetSelected"><a style="cursor:pointer" onclick="SaveTransfer(true);window.location.replace(\''+A_Planet[i].Url+'\');">'+A_Planet[i].Name+'</a></th>\n';
      }
      else {
        PlanetTd += '<td class="c" align="center"><a style="cursor:pointer" onclick="SaveTransfer(true);window.location.replace(\''+A_Planet[i].Url+'\');">'+A_Planet[i].Name+'</a></td>\n';
      }
      
      // Generation des variables contenant les donnees des differents tableaux
      if (A_Resources[i].Metal) {
        
        // Somme des ressources de chaque type
        if (UseRealTimeResources == false) {
          MetalTotal = MetalTotal+parseInt(A_Resources[i].Metal,10);
          CrystalTotal = CrystalTotal+parseInt(A_Resources[i].Crystal,10);
          DeuteriumTotal = DeuteriumTotal+parseInt(A_Resources[i].Deuterium,10);
        }
        
        // Generation du tableau de ressources en tenant compte du temps depuis la derniere mise a jour
        TimeUpdate = PlanetTimeUpdate(i, false);
        MetalTd += '<td align="right" id="MetalTransfer'+i+'" class="'+TimeUpdate+ResourcesOver(i, 0)+'">'+FormatNb(((RealTimeResources==true)&&(UseRealTimeResources==true))?A_RealTimeResources[i].Metal:A_Resources[i].Metal)+'</td>\n';
        CrystalTd += '<td align="right" id="CrystalTransfer'+i+'" class="'+TimeUpdate+ResourcesOver(i, 1)+'">'+FormatNb(((RealTimeResources==true)&&(UseRealTimeResources==true))?A_RealTimeResources[i].Crystal:A_Resources[i].Crystal)+'</td>\n';
        DeuteriumTd += '<td align="right" id="DeuteriumTransfer'+i+'" class="'+TimeUpdate+ResourcesOver(i, 2)+'">'+FormatNb(((RealTimeResources==true)&&(UseRealTimeResources==true))?A_RealTimeResources[i].Deuterium:A_Resources[i].Deuterium)+'</td>\n';
        
        // Generation des boutons 'radio' de choix de la destination
        if (((i == PlanetSelectedIndex) && (NewTransfer == false)) || ((TransferDestinationPlanet == A_Planet[i].Planet) && (TransferDestinationSystem == A_Planet[i].System) && (TransferDestinationGalaxy == A_Planet[i].Galaxy) && (TransferDestinationType == A_Planet[i].Type) && (NewTransfer == true))) {
          DestinationTd += '<th><input type="radio" name="Destination" checked="CHECKED" value="'+i+'" onclick="RefreshTotal(false)" /></th>\n';
        }
        else {
          DestinationTd += '<th><input type="radio" name="Destination" value="'+i+'" onclick="RefreshTotal(false)" /></th>\n';
        }
        
        // Generation des cases a cocher des colonies a utiliser pour le calcul
        PlanetUsedTd += '<th><input name="PlanetUsed'+i+'" checked="CHECKED" type="CHECKBOX" onclick="RefreshTotal(false)" /></th>\n';
        
        // Generation du tableau des cases qui contiendront le resultat du calcul
        MetalToSendTd += '<th><input type="text" readonly="readonly" name="Metal'+i+'" style="width: 70px; text-align: right;" value="0" /></th>\n';
        CrystalToSendTd += '<th><input type="text" readonly="readonly" name="Crystal'+i+'" style="width: 70px; text-align: right;" value="0" /></th>\n';
        DeuteriumToSendTd += '<th><input type="text" readonly="readonly" name="Deuterium'+i+'" style="width: 70px; text-align: right;" value="0" /></th>\n';
        FlightTimeTd += '<th><input type="text" readonly="readonly" name="FlightTime'+i+'" style="width: 70px; text-align: right;" value="0'+A_Language[C_SecondAbbreviation]+'" /></th>\n';
        SpeedTd += '<th><input type="text" readonly="readonly" name="Speed'+i+'" style="width: 70px; text-align: right;" value="0%" /></th>\n';
        ConsumptionTd += '<th><input type="text" readonly="readonly" name="Consumption'+i+'" style="width: 70px; text-align: right;" value="0" /></th>\n';
        TransportShipToSendTd += '<th><input type="text" readonly="readonly" name="TransportShip'+i+'" style="width: 70px; text-align: right;" value="0" /></th>\n';
        RecyclerNeededTd += '<th><input type="text" readonly="readonly" name="Recycler'+i+'" style="width: 70px; text-align: right;" value="'+A_Language[C_No]+'" /></th>\n';
      }
      else {
        
        // Planete non memorisee
        PlanetUndefined = true;
        
        // Affichage des cellules de ressources vides si aucune donnee memorisee
        MetalTd += '<td align="right" class="Time10"></td>\n';
        CrystalTd += '<td align="right" class="Time10"></td>\n';
        DeuteriumTd += '<td align="right" class="Time10"></td>\n';
      }
    }
    
    // (si on a clique sur un nom de planete d'un des deux tableaux du menu flotte alors le formulaire n'est pas cache)
    var OTStyle = (TransferShow == true || (ShowTransferTableIfActiveTransfer == true && TransferState == true)) ? '' : ' style="display: none;"';
    TransferShow = false;
    SaveTransfer();
    
    // Chargement du Div precedement cree par le formulaire (1ere ligne : barre cacher ou afficher le formulaire)
    var DivText = '<table width="519px"><tr><td class="c" onclick="ScriptShowHide(\'OgameTransfer\',\'OTTitle\',\''+C_ScriptName+'\');" style="cursor: pointer;"><span id="OTTitle">'+C_ScriptName+'&nbsp;&nbsp;&nbsp;'+((TransferShow == true) ? '<img src="'+C_ImgUp+'" alt="'+A_Language[C_RollUp]+'" '+((AddToolTip == true)?'title="'+A_Language[C_RollUp]+'"':'')+'>' : '<img src="'+C_ImgDown+'" alt="'+A_Language[C_Unfold]+'" '+((AddToolTip == true)?'title="'+A_Language[C_Unfold]+'"':'')+'>')+'</span></td></tr></table>\n'+
    
    // Div qui sera affiche ou cache
    '<div id="OgameTransfer"'+OTStyle+'><div id="OgameTransferCalc" '+((TransferState == true) ? 'style="display:none"' : '')+'>\n'+
    
    // Tableau 1 contenant les ressources de toutes les planetes et le total des ressources de chaque type
    '<table id="planetResources">\n'+
    '<tr><td></td>\n'+PlanetTd+'<td class="c" align="center">'+A_Language[C_Total]+'</th></tr>\n'+
    '<tr><th>'+A_Language[C_Metal]+'</th>\n'+MetalTd+'<th><input type="text"  readonly="readonly" name="MetalTotalInput" value="'+FormatNb(MetalTotal)+'" style="width: 80px; text-align: right;" /></th></tr>\n'+
    '<tr><th>'+A_Language[C_Crystal]+'</th>\n'+CrystalTd+'<th><input type="text"  readonly="readonly" name="CrystalTotalInput" value="'+FormatNb(CrystalTotal)+'" style="width: 80px; text-align: right;" /></th></tr>\n'+
    '<tr><th>'+A_Language[C_Deuterium]+'</th>\n'+DeuteriumTd+'<th><input type="text"  readonly="readonly" name="DeuteriumTotalInput" value="'+FormatNb(DeuteriumTotal)+'" style="width: 80px; text-align: right;" /></th></tr>\n'+
    '<tr><th>'+A_Language[C_Destination]+'</th>\n'+DestinationTd+'<td></td></tr>\n'+
    '<tr><th>'+A_Language[C_ColonyToBeUsed]+'</th>\n'+PlanetUsedTd+'<th><input type="button" name="InvertSelection" onclick="InvertSelection()" value="'+A_Language[C_InvertSelection]+'" /></th></tr>\n'+
    '</table><br />\n'+
    // Autre Destination
    '<table>\n'+
    '<tr><td class="c"><input type="radio" name="Destination" id="OtherDestination" value="'+PlanetSelect.length+'" onclick="RefreshTotal(false)" /><label for="OtherDestination">'+A_Language[C_OtherDestination]+'</label>&nbsp;</td></tr>\n'+
    '<tr><th><input size="2" maxLength="1" name="DestinationGalaxy" value="1" onkeyup="RefreshTotal(false)" /> : <input size="2" name="DestinationSystem" maxLength="3" value="1" onkeyup="RefreshTotal(false)" /> : <input size="2" name="DestinationPlanet" maxLength="2" value="1" onkeyup="RefreshTotal(false)" />&nbsp;&nbsp;&nbsp;'+
    '<select name="DestinationType" style="text-align:left"><option value="'+C_Planet+'">'+A_Language[C_Planet]+'</option><option value="'+C_Moon+'">'+A_Language[C_Moon]+'</option></select></th></tr>\n'+
    '</table><br />\n';
    
    // Verification si toutes les planetes ont ete memorisees
    if (PlanetUndefined == false) {
      
      // Tableau 2 de saisi des besoins en ressource
      DivText += '<table>\n'+
      '<tr><td colspan="2" class="c">'+A_Language[C_NeededResources]+' :</td><td class="c" align="center">'+A_Language[C_Rest]+'</td></tr>\n'+
      '<tr><th>'+A_Language[C_Metal]+' :&nbsp;</th><th><input type="text" name="MetalNeededInput" value="'+TransferMetal+'" style="width: 80px; text-align: right;" '+NoStringInput+' onkeyup="RefreshTotal(false)" /></th>\n'+
      ' <th><input type="text" readonly="readonly" name="MetalRestInput" value="'+FormatNb(MetalTotal)+'" style="width: 80px; text-align: right;" /></th></tr>\n'+
      '<tr><th>'+A_Language[C_Crystal]+' :&nbsp;</th><th><input type="text" name="CrystalNeededInput" value="'+TransferCrystal+'" style="width: 80px; text-align: right;" '+NoStringInput+' onkeyup="RefreshTotal(false)" /></th>\n'+
      ' <th><input type="text" readonly="readonly" name="CrystalRestInput" value="'+FormatNb(CrystalTotal)+'" style="width: 80px; text-align: right;" /></th></tr>\n'+
      '<tr><th>'+A_Language[C_Deuterium]+' :&nbsp;</th><th><input type="text" name="DeuteriumNeededInput" value="'+TransferDeuterium+'" style="width: 80px; text-align: right;" '+NoStringInput+' onkeyup="RefreshTotal(false)" /></th>\n'+
      ' <th><input type="text" readonly="readonly" name="DeuteriumRestInput" value="'+FormatNb(DeuteriumTotal)+'" style="width: 80px; text-align: right;" /></th></tr>\n'+
      '</table>\n<br />\n'+
      
      // Tableau 3 contenant le resultat des calculs
      '<table id="TransferResources">\n'+
      '<tr><td></td>\n'+PlanetTd+'</tr>\n'+
      '<tr><th>'+A_Language[C_MetalToBeSent]+'</th>\n'+MetalToSendTd+'</tr>\n'+
      '<tr><th>'+A_Language[C_CrystalToBeSent]+'</th>\n'+CrystalToSendTd+'</tr>\n'+
      '<tr><th>'+A_Language[C_DeuteriumToBeSent]+'</th>\n'+DeuteriumToSendTd+'</tr>\n'+
      '<tr><th>'+A_Language[C_FlightTime]+'</th>\n'+FlightTimeTd+'</tr>\n'+
      '<tr><th>'+A_Language[C_SendingSpeed]+'</th>\n'+SpeedTd+'</tr>\n'+
      '<tr><th>'+A_Language[C_DeuteriumConsumption]+'</th>\n'+ConsumptionTd+'</tr>\n'+
      '<tr><th>'+A_Language[C_TransportShipNumber]+'</th>\n'+TransportShipToSendTd+'</tr>\n'+
      '<tr><th>'+A_Language[C_NeededRecycler]+'</th>\n'+RecyclerNeededTd+'</tr>\n'+
      '</table><br />\n'+
      
      // Option de calcul
      '<table width="600px" cellpadding="0" cellspacing="0"><tr><td class="c" colspan="2" style="cursor:pointer" onclick="ScriptShowHide(\'TransferOption\',\'TransferOptionTitle\',\''+A_Language[C_TransferCalcOption].replace("'","\'+String.fromCharCode(39)+\'")+'\');window.location.replace(\'#TransferOptionTitle\')"><span id="TransferOptionTitle">'+A_Language[C_TransferCalcOption]+'&nbsp;&nbsp;&nbsp;<img src="'+C_ImgDown+'" alt="'+A_Language[C_Unfold]+'" '+((AddToolTip == true)?'title="'+A_Language[C_Unfold]+'"':'')+'></span></td></tr>\n'+
      
      // Mode de calcul
      '<tr id="TransferOption" style="display:none"><td><table width="100%" cellpadding="0" cellspacing="0">\n'+
      '<tr><td colspan="2" class="c">'+A_Language[C_CalcMode]+' :</td></tr>\n'+
      '<tr><th><input type="radio" name="CalcMode" '+(CalcMode==0?'checked="CHECKED"':'')+' value="0" onclick="SaveCalcParameter();RefreshTotal(true)" /></th>\n'+
      '<th>'+A_Language[C_SameRest]+'</th></tr>\n'+
      '<tr><th><input type="radio" name="CalcMode" '+(CalcMode==1?'checked="CHECKED"':'')+' value="1" onclick="SaveCalcParameter();RefreshTotal(true)" /></th>\n'+
      '<th>'+A_Language[C_SameQuantity]+'</th></tr>\n'+
      
      // Utilisation des ressources de la planete de destination en priorite
      '<tr><th><input type="CHECKBOX" name="UseTotalResourcesDestinationPlanet" onclick="SaveCalcParameter();RefreshTotal(false)" '+(UseTotalResourcesDestinationPlanet==true?'checked="CHECKED"':'')+' /></th>\n'+
      '<th>'+A_Language[C_UseTotalResourcesDestinationPlanet]+'</th></tr>\n'+
      
      // Integration calcul de la vitesse, temps de vol similaire (Ajout de recyleur)
      '<tr><th style="vertical-align:top"><input type="CHECKBOX" name="SameTime" '+(SameTime==true?'checked="CHECKED"':'')+' onclick="SaveCalcParameter();if (this.checked == true) { document.getElementsByName(\'AddRecycler\')[0].disabled = false; } else { document.getElementsByName(\'AddRecycler\')[0].disabled = true; };RefreshTotal(false)" /></th>\n'+
      '<th>'+A_Language[C_SameTime]+'<br>'+
      '<table width="100%"><tr><th style="text-align:left"><input type="radio" name="TimeToGo" id="TimeToGo0" value="0" onclick="SaveCalcParameter();RefreshTotal(false)" '+(TimeToGo==0?'checked="CHECKED"':'')+'><label for="TimeToGo0">'+A_Language[C_Fastest]+'</label></th></tr>\n'+
      '<tr><th style="text-align:left"><input type="radio" name="TimeToGo" id="TimeToGo1" value="1" onclick="SaveCalcParameter();RefreshTotal(false)"><label for="TimeToGo1" '+(TimeToGo==1?'checked="CHECKED"':'')+'>'+A_Language[C_ArrivalDate]+'</label><br>'+
      A_Language[C_Year]+'&nbsp;:&nbsp;<input type="text" name="Year1" maxLength="4" value="20'+String(Counter.getYear()).substr(1,2)+'" size="4" '+NoStringInput+' onkeyup="RefreshTotal(false)"> \n'+
      A_Language[C_Month]+'&nbsp;:&nbsp;<input type="text" name="Month1" maxLength="2" value="'+RSet((Counter.getMonth()+1),2,'0')+'" size="2" '+NoStringInput+' onkeyup="RefreshTotal(false)"> \n'+
      A_Language[C_Day]+'&nbsp;:&nbsp;<input type="text" name="Day1" maxLength="2" value="'+RSet((Counter.getDate()),2,'0')+'" size="2" '+NoStringInput+' onkeyup="RefreshTotal(false)"> \n'+
      A_Language[C_Hour]+'&nbsp;:&nbsp;<input type="text" name="Hour1" maxLength="2" value="'+RSet((Counter.getHours()),2,'0')+'" size="2" '+NoStringInput+' onkeyup="RefreshTotal(false)"> \n'+
      A_Language[C_Minute]+'&nbsp;:&nbsp;<input type="text" name="Minute1" maxLength="2" value="'+RSet((Counter.getMinutes()),2,'0')+'" size="2" '+NoStringInput+' onkeyup="RefreshTotal(false)">\n'+
      '</th></tr>'+
      '<tr><th style="text-align:left"><input type="radio" name="TimeToGo" id="TimeToGo2" value="2" onclick="SaveCalcParameter();RefreshTotal(false)" '+(TimeToGo==2?'checked="CHECKED"':'')+'><label for="TimeToGo2">'+A_Language[C_FlightTime]+'</label><br>'+
      A_Language[C_Days]+'&nbsp;:&nbsp;<input type="text" name="Day2" maxLength="3"value="0" size="2" '+NoStringInput+' onkeyup="RefreshTotal(false)"> \n'+
      A_Language[C_Hours]+'&nbsp;:&nbsp;<input type="text" name="Hour2" maxLength="2" value="0" size="2" '+NoStringInput+' onkeyup="RefreshTotal(false)"> \n'+
      A_Language[C_Minutes]+'&nbsp;:&nbsp;<input type="text" name="Minute2" maxLength="2" value="0" size="2" '+NoStringInput+' onkeyup="RefreshTotal(false)">\n'+
      '</th></tr></table></th></tr>\n'+
      '<tr><th><input type="CHECKBOX" name="AddRecycler" '+(AddRecycler==true?'checked="CHECKED"':'')+' '+(SameTime==true?'':'disabled="DISABLED"')+' onclick="SaveCalcParameter();RefreshTotal(false)" /></th>\n'+
      '<th>'+A_Language[C_AddRecycler]+'</th></tr>\n'+
      '</table></td>\n'+
      
      // Choix grand transporteur et petit transporteur
      '<td style="vertical-align:top;"><table width="100%"  cellpadding="0" cellspacing="0"><tr><td class="c" colspan="2">'+A_Language[C_TransportShip]+'&nbsp;:</th></tr>'+
      '<tr><th><input type="CHECKBOX" name="ShipType" '+(ShipType==0?'checked="CHECKED"':'')+' value="0" onclick="SaveCalcParameter();RefreshTotal(false)"></th><th>'+A_Construction[C_Fleets][0].Name+'</th></tr>'+
      '<tr><th><input type="CHECKBOX" name="ShipType" '+(ShipType==1?'checked="CHECKED"':'')+' value="0" onclick="SaveCalcParameter();RefreshTotal(false)"></th><th>'+A_Construction[C_Fleets][1].Name+'</th></tr>'+
      '<tr><th><input type="CHECKBOX" name="ShipType" '+(ShipType==1?'checked="CHECKED"':'')+' value="1" onclick="SaveCalcParameter();RefreshTotal(false)"></th><th>'+A_Construction[C_Fleets][7].Name+'</th></tr></table>'+
      '</td></tr></table></td></tr></table></div><br>\n'+
      
      // Div d'affichage des Transferts memorises
      '<div id="OgameTransferRes" '+((TransferState == false) ? 'style="display:none"' : '')+'">\n'+
      ((TransferState == true) ? GenerateTransferTable(true) : '')+'</div>';
      
      // Bouton de memorisation et d'auto-remplissage du formulaire de vaisseaux
      if (TransferState == false) {
        DivText += '<table><tr><td class="k" style="background:transparent !important; border:none !important; display:inline !important;"><input type="button" name="Save" value="'+A_Language[C_SaveTransfer]+'" onclick="TransferSave();GenerateTransferTable(false);" />\n'+
        '<input type="button" name="Unsave" value="'+A_Language[C_CancelTransfer]+'" onclick="TransferUnsave();" style="display: none" />\n'+
        '<input type="button" name="FillShip" value="'+A_Language[C_FillShip]+'" onclick="FillShip();" style="display: none" /></td></tr></table>\n';
      }
      else {
        DivText += '<table><tr><td class="k" style="background:transparent !important; border:none !important; display:inline !important;"><input type="button" name="Save" value="'+A_Language[C_SaveTransfer]+'" onclick="TransferSave();GenerateTransferTable(false);" style="display: none" />\n'+
        '&nbsp;<input type="button" name="Unsave" value="'+A_Language[C_CancelTransfer]+'" onclick="TransferUnsave();" />\n'+
        '&nbsp;<input type="button" id="FillShip" name="FillShip" value="'+A_Language[C_FillShip]+'" onclick="FillShip();" />\n';
        var FormList = document.getElementsByTagName('form');
        if (FormList.length > 0) {
          FormList[FormList.length-1].setAttribute('id', 'formShip');
          var InputList = FormList[FormList.length-1].getElementsByTagName('input');
          DivText += '&nbsp;<input type="button" name="FillShip" value="'+A_Language[C_Continue]+'" onclick="document.getElementById(\'formShip\').submit();" />\n';
        }
        DivText += '</td></tr></table>\n';
      }
      
    }
    else {
      
      // Affichage planetes non memorisees
      DivText += '<table><tr><th id="tdWarning">'+A_Language[C_UnsavedPlanets]+'</th></tr></table><br />\n';
      
    }
    
    ShipDiv.innerHTML = DivText+'</div>\n';
    
    // Affichage du Div
    ShipTable.parentNode.insertBefore(ShipDiv, ShipTable);
    ShipTable.parentNode.insertBefore(document.createElement('br'), ShipTable);
    
    if ((TransferMetal) || (TransferCrystal) || (TransferDeuterium)) {
      TransferMetal = 0;
      TransferCrystal = 0;
      TransferDeuterium = 0;
      SaveTransfer();
      RefreshTotal(true);
    }
  }
  catch(err) {
    ShowError(err, 'Creation of transfer table');
  }
}

// Page flotte 2 - Selection de la destination
else if (OgamePage == 'flotten2') {
  try {
    // Creation du Div qui contiendra le formulaire de calcul
    var ShipContent = document.getElementById('content');
    var ShipTable = ShipContent.getElementsByTagName('table')[0];
    var ShipDiv = document.createElement('div');
    ShipDiv.id = 'TransferResources';
    
    var FormList = document.getElementsByTagName('form');
    if (FormList.length > 0) {
      FormList[FormList.length-1].setAttribute('id', 'formShip');
    }
    
    var DivText = '<table width="600px"><tr><td class="c" onclick="ScriptShowHide(\'OgameTransfer\',\'OTTitle\',\''+C_ScriptName+'\')" style="cursor: pointer;"><span id="OTTitle">'+C_ScriptName+'&nbsp;&nbsp;&nbsp;'+((TransferState == true) ? '<img src="'+C_ImgUp+'" alt="'+A_Language[C_RollUp]+'" '+((AddToolTip == true)?'title="'+A_Language[C_RollUp]+'"':'')+'>' : '<img src="'+C_ImgDown+'" alt="'+A_Language[C_Unfold]+'" '+((AddToolTip == true)?'title="'+A_Language[C_Unfold]+'"':'')+'>')+'</span></td></tr></table>\n'+    
    // Div qui sera affiche ou cache
    '<div id="OgameTransfer" '+((TransferState == true) ? '' : 'style="display:none"')+'>\n'+
    '<table><tr><td class="k" style="background:transparent !important; border:none !important; display:inline !important;">'+
    '<input type="button" name="FillCoord" value="'+A_Language[C_FillCoordinatesAndSpeed]+'" onclick="FillCoordAndSpeed(); shortInfo();" />\n'+
    '&nbsp;<input type="button" name="FillCoord" value="'+A_Language[C_Continue]+'" onclick="document.getElementById(\'formShip\').submit();" />'+
    '</td></tr></table>\n'+
    '</div>\n';
    
    ShipDiv.innerHTML = DivText;
    
    // Affichage du Div
    ShipTable.parentNode.insertBefore(ShipDiv, ShipTable);
    ShipTable.parentNode.insertBefore(document.createElement('br'), ShipTable);
  }
  catch(err) {
    ShowError(err, 'Fill coordinates and speed');
  }
}


// Page flotte 3 - Saisi des ressources
else if (OgamePage == 'flotten3') {
  try {
    // Creation du Div qui contiendra le formulaire de calcul
    var ShipContent = document.getElementById('content');
    var ShipTable = ShipContent.getElementsByTagName('table')[0];
    var ShipDiv = document.createElement('div');
    ShipDiv.id = 'TransferResources';
    
    var FormList = document.getElementsByTagName('form');
    if (FormList.length > 0) {
      FormList[FormList.length-1].setAttribute('id', 'formShip');
    }
    
    var DivText = '<table width="600px"><tr><td class="c" onclick="ScriptShowHide(\'OgameTransfer\',\'OTTitle\',\''+C_ScriptName+'\')" style="cursor: pointer;"><span id="OTTitle">'+C_ScriptName+'&nbsp;&nbsp;&nbsp;'+((TransferState == true) ? '<img src="'+C_ImgUp+'" alt="'+A_Language[C_RollUp]+'" '+((AddToolTip == true)?'title="'+A_Language[C_RollUp]+'"':'')+'>' : '<img src="'+C_ImgDown+'" alt="'+A_Language[C_Unfold]+'" '+((AddToolTip == true)?'title="'+A_Language[C_Unfold]+'"':'')+'>')+'</span></td></tr></table>\n'+
    
    // Div qui sera affiche ou cache
    '<div id="OgameTransfer" '+((TransferState == true) ? '' : 'style="display:none"')+'>\n'+
    '<table><tr><td class="k" style="background:transparent !important; border:none !important; display:inline !important;">'+
    '<input type="button" name="FillResources" value="'+A_Language[C_FillResources]+'" onclick="FillResources(); calculateTransportCapacity();" />\n'+
    '&nbsp;<input type="button" name="FillResources" value="'+A_Language[C_Continue]+'" onclick="document.getElementById(\'formShip\').submit();" />'+
    '</td></tr></table>\n'+
    '</div>\n';
    
    ShipDiv.innerHTML = DivText;
    
    // Affichage du Div
    ShipTable.parentNode.insertBefore(ShipDiv, ShipTable);
    ShipTable.parentNode.insertBefore(document.createElement('br'), ShipTable);
  }
  catch(err) {
    ShowError(err, 'Fill resources');
  }
}

// Page flotte 4 - Envoi termine
else if (OgamePage == 'flottenversand') {
  try {
    if (TransferState == true) {
      var TransferVerif = true;
      A_Transfer[PlanetSelectedIndex].State = 0;
      SavePlanetTransfer(PlanetSelectedIndex);
      for (var i = 0; i < PlanetSelect.length; i++) {
        if (A_Transfer[i].State > 0) {
          TransferVerif = false;
        }
      }
      if (TransferVerif == true) {
        TransferState = false;
        SaveTransfer();
      }
    }
  }
  catch(err) {
    ShowError(err, 'Resources transfered');
  }
}





/* CSS 
   -------------------------------------------------- */

try {
  // Transparence
  if (Transparency < 100) {
    var CSSTransparency = 'opacity: 0.'+Transparency+'; filter: Alpha(Opacity='+Transparency+'); ';
  }
  else {
    var CSSTransparency = '';
  }
  
  var CSSStr = '';
  
  // Cacher le tableau de ressources par defaut
  if (ShowHeaderResourcesList == false) {
    CSSStr = '#resources { display: none; }\n';
  }
  // Cacher la liste deroulante des planetes
  if (ShowHeaderPlanetList == false) {
    CSSStr += 'div#header_top img[width="50"][height="50"] { display:none; }\n'+
    'div#header_top select { display:none }\n';
  }
  // Cacher le menu d'entete
  if (((ShowHeaderResourcesList == false) && (ShowHeaderPlanetList == false)) || ((HideDefaultResourcesTable == true) && (Empire))) {
    CSSStr += 'body div#header_top { display:none; }\n';
  }
  
  // Position de l'entete
  if (ChangeHeaderPosition == true) {
    CSSStr += 'body div#header_top { position: absolute; z-index: 10001; '+HeaderPosition+' }\n';
  }
  
  // Position du cadre central
  if (ChangeContentPosition == true) {
    CSSStr += 'body div#content { position: absolute; z-index: 5000; '+ContentPosition+' }\n';
  }
  
  // Tableau de ressources : Mise en couleur de l'entete et de la colonne de gauche du tableau de ressources
  CSSStr += '#planetResources td, #TransferResources td { background-color: transparent; }\n'+
  '#planetResources td, #TransferResources td { background-color: transparent; }\n'+
  '#tdWarning { color: #FF0000; text-decoration: bold; '+CSSTransparency+'}\n'+
  '#PlanetSelected { '+HeaderSelectedPlanetStyle+' }\n'+
  '#TransferResources input { '+CSSTransparency+' }\n'+
  'div#overDiv { z-index:10002 !important; }';
  
  // Tableau de ressources
  if (ShowHeaderResourcesTable == true || (ForceDisplayHeaderResourcesTableWithEmpire == true && document.getElementById('empire')) || (OgamePage == 'flotten1')) {
    CSSStr += '#ResourcesDiv {display:block; position:absolute; top:2px; }\n'+
    // Mise en couleur du tableau en fonction du temps depuis la derniere mise a jour
    '#planetResources td.Time0 { background-color: #00FF00; color: #000000; padding-left:3px; padding-right:3px; '+CSSTransparency+'}\n'+
    '#planetResources td.Time1 { background-color: #33FF00; color: #000000; padding-left:3px; padding-right:3px; '+CSSTransparency+'}\n'+
    '#planetResources td.Time2 { background-color: #66FF00; color: #000000; padding-left:3px; padding-right:3px; '+CSSTransparency+'}\n'+
    '#planetResources td.Time3 { background-color: #99FF00; color: #000000; padding-left:3px; padding-right:3px; '+CSSTransparency+'}\n'+
    '#planetResources td.Time4 { background-color: #CCFF00; color: #000000; padding-left:3px; padding-right:3px; '+CSSTransparency+'}\n'+
    '#planetResources td.Time5 { background-color: #FFFF00; color: #000000; padding-left:3px; padding-right:3px; '+CSSTransparency+'}\n'+
    '#planetResources td.Time6 { background-color: #FFCC00; color: #000000; padding-left:3px; padding-right:3px; '+CSSTransparency+'}\n'+
    '#planetResources td.Time7 { background-color: #FF9900; color: #000000; padding-left:3px; padding-right:3px; '+CSSTransparency+'}\n'+
    '#planetResources td.Time8 { background-color: #FF6600; color: #000000; padding-left:3px; padding-right:3px; '+CSSTransparency+'}\n'+
    '#planetResources td.Time9 { background-color: #FF3300; color: #000000; padding-left:3px; padding-right:3px; '+CSSTransparency+'}\n'+
    '#planetResources td.Time10 { background-color: #FF0000; color: #000000; padding-left:3px; padding-right:3px; '+CSSTransparency+'}\n'+
    '#planetResources td.TimeOut { background-color: #00FFFF; color: #000000; padding-left:3px; padding-right:3px; '+CSSTransparency+'}\n'+
    // Mise en couleur du tableau en fonction du temps depuis la derniere mise a jour et affichage reservoir en sur-capacite et manque d'energie
    '#planetResources td.Time0Over { background-color: #00FF00; color: #000000; text-decoration: blink; padding-left:3px; padding-right:3px; '+CSSTransparency+'}\n'+
    '#planetResources td.Time1Over { background-color: #33FF00; color: #000000; text-decoration: blink; padding-left:3px; padding-right:3px; '+CSSTransparency+'}\n'+
    '#planetResources td.Time2Over { background-color: #66FF00; color: #000000; text-decoration: blink; padding-left:3px; padding-right:3px; '+CSSTransparency+'}\n'+
    '#planetResources td.Time3Over { background-color: #99FF00; color: #000000; text-decoration: blink; padding-left:3px; padding-right:3px; '+CSSTransparency+'}\n'+
    '#planetResources td.Time4Over { background-color: #CCFF00; color: #000000; text-decoration: blink; padding-left:3px; padding-right:3px; '+CSSTransparency+'}\n'+
    '#planetResources td.Time5Over { background-color: #FFFF00; color: #000000; text-decoration: blink; padding-left:3px; padding-right:3px; '+CSSTransparency+'}\n'+
    '#planetResources td.Time6Over { background-color: #FFCC00; color: #000000; text-decoration: blink; padding-left:3px; padding-right:3px; '+CSSTransparency+'}\n'+
    '#planetResources td.Time7Over { background-color: #FF9900; color: #000000; text-decoration: blink; padding-left:3px; padding-right:3px; '+CSSTransparency+'}\n'+
    '#planetResources td.Time8Over { background-color: #FF6600; color: #000000; text-decoration: blink; padding-left:3px; padding-right:3px; '+CSSTransparency+'}\n'+
    '#planetResources td.Time9Over { background-color: #FF3300; color: #000000; text-decoration: blink; padding-left:3px; padding-right:3px; '+CSSTransparency+'}\n'+
    '#planetResources td.Time10Over { background-color: #FF0000; color: #000000; text-decoration: blink; padding-left:3px; padding-right:3px; '+CSSTransparency+'}\n'+
    '#planetResources td.TimeOutOver { background-color: #00FFFF; color: #000000; text-decoration: blink; padding-left:3px; padding-right:3px; '+CSSTransparency+'}\n';
  }
  GM_addStyle(CSSStr);
}
catch(err) {
  ShowError(err,'Css add');
}





/* COMPATIBILITES AFFICHAGE (SKIN)
   -------------------------------------------------- */

try {
  if (window.location.href.indexOf('&no_header=1')!=-1) { 
  	ContentDiv.style.top=0;
  	ContentDiv.style.height=window.innerHeight-2;
  }
  else {
    if ((ContentDiv) && (ResourcesDiv)) {
      var offSet = ResourcesDiv.offsetHeight;
      var left = MenuDiv.offsetWidth;
      ContentDiv.setAttribute('style','position: absolute; top:'+(offSet+2)+'px !important; height: '+(window.innerHeight-offSet-4)+'px !important; left: '+left+' !important');
      ResourcesDiv.style.left = left+20;
    }
  }
}
catch(err) {
  ShowError(err,'Screen compatibilities');
}





/* INSERTION DU CODE CSS DE L'UTILISATEUR
   ------------------------------------------------- */
   
// Ajout de CodeCSS
if (AddCssCode == true) {
  try {
    GM_addStyle(CssCode);
  }
  catch(err) {
    ShowError(err,'User css code');
  }
}





/* EXECUTION DU CODE JAVASCRIPT DE L'UTILISATEUR
   ------------------------------------------------- */
   
// Ajout de CodeJS
if (AddJSCode == true) {
  try {
    eval(JSCode);
  }
  catch(err) {
    ShowError(err,'User javascript code');
  }
}





/* TEMPS D'EXECUTION ET LIEN DE MISE A JOUR
   ------------------------------------------------- */

if (ContentDiv) {
  try {
    if (AddImageVersion == true) { // Pour eviter les temps de chargement trop long
      if ((RefreshPlanetRest > 0) || (AutoUpdateRest > 0) || (document.getElementById('empire')) || (OgamePage != 'overview')) AddImageVersion = false;
    }
    var ExecDiv = document.createElement('div');
    ExecDiv.setAttribute('width', '100%');
    ExecDiv.setAttribute('align','center');
    var Counter = new Date();
    ExecDiv.innerHTML = '<table><tr><td class="c" id="Update"><a name="bottom" href="'+C_Server+'UserScriptUpdate.php?Name='+C_ScriptName+'&Version='+C_ScriptVersion+'&Build='+C_ScriptBuild+'&Date='+C_ScriptDate+'" target="_blank" '+((AddToolTip == true)?'title="'+A_Language[C_Update]+' '+C_ScriptName+'"':'')+'>'+
    C_ScriptName+' '+C_ScriptVersion+', '+C_ScriptBuild+', '+A_Language[C_RunTime]+' : '+FormatNb(Counter.getTime()-CounterStart)+' ms</a></td>'+
    ((AddImageVersion == true) ? '<td class="c"><a href="'+C_Server+'UserScriptUpdate.php?Name='+C_ScriptName+'&Version='+C_ScriptVersion+'&Build='+C_ScriptBuild+'&Date='+C_ScriptDate+'" target="_blank" '+((AddToolTip == true)?'title="'+A_Language[C_Update]+' '+C_ScriptName+'"':'')+'><img src="'+C_Server+'ImageVersion.php?Name='+C_ScriptName+'&Version='+C_ScriptVersion+'&Build='+C_ScriptBuild+'" alt="'+A_Language[C_Update]+'"></a></td>' : '')+'</tr></table>';
    GM_addStyle('td#Update a{vertical-align:middle !important;}');
    if (document.getElementById('empire')) {
      var br = ''; // Pour voir le popup totalement
      for (i = 0; i < 15; i++) {
        br += '<br>\n';
      }
      ExecDiv.innerHTML += br;
    }
    ContentDiv.appendChild(ExecDiv);
  }
  catch(err) {
    ShowError(err,'Update bar');
  }
}
