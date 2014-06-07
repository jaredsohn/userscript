// ==UserScript==
// @name           eRepublik Traduction Francaise
// @description    eRepublik Traduction Francaise par Smash15195
// @include        http://www.erepublik.com/*
// @include  	   modification de la page de travail 
// @include  	   ajout de quelques mots oubliés
// ==/UserScript==
// version                     1.10 28 Aug 2009

////////////////////////////////////////////////////////////////////////////////////////////////////////
//    Variables
////////////////////////////////////////////////////////////////////////////////////////////////////////

var strings = {
// menu
	"Home" : "Accueil",
	"Donate" : "Don",
	" Donate" : "Don",
	"May" : "Mai",
	"June" : "Juin",
	"July" : "Juillet",
	"Day" : "Jour ",
	"of the New World" : " du Nouveau Monde",
	"Rank"   : "Rang",
	"Company" : "Entreprise", 
	"Profile":"Profil", 
	"Party" : "Parti", 
	"Newspaper" :"Journal",
	"Army" : "Armée",
	"Country administration" : "Administration du Pays",
        "Organizations" : "Organisations",
		"Advertising Department" : "Régie Publicitaire",
	"Market" : "Marché",
	"Monetary market" : "Marché monétaire",
	"Monetary Market" : "Marché Monétaire",
	"Job market" : "Offres d'emploi",
        "Companies for sale" : "Entreprises à vendre",
        "Get Gold &amp; Extras" : "Obtenir Gold &amp; Extras",
	"Rankings" : "Classement",
	"Social stats" : "Stats sociale",
	"Economic stats" : "Stats economique",
	"Political stats" : "Stats politique",
	"Military stats" : "Stats militaire",
	"Tools" : "Outils",
	"Forum" : "Forum",
	"News" : "Les Infos",
	"Invite friends" : "Invitez un ami",
	"eRepublik Shop" : "Boutique eRepublik",
	"Career path" : "Carrière",
	"World Map" : "Carte Mondiale",
	"Ok, thanks, next tip" : "Ok, prochaine astuce",
	"I have nothing more to say at the moment" : "Je n'ai rien à dire pour le moment",
	"Select" : "Selection",
        "Latest events" : "Derniers événements",
		"News" : "Les Infos",
        "More events" : "+ d'évenements",
		"more events" : "+ d'évenements",
        "More news" : "+ de nouvelles",
		"more news" : "+ de nouvelles",
		"Top rated news" : "Mieux notées",
		"Lastest news" : "Dernières Infos",
	"Marketplace" : "Place des Marchés",
	"Wars" : "Guerres",
        "My Places" : "Mes données",
        "Info" : "Info",
        "Community" : "Communauté",
        "Day of the new world" : "Jour du Nouveau Monde",
        "National" : "National",
        "International" : "International",
		"Latest Events" : "Dernières Infos",
        "Shouts" : "Shouts",
        "Shout something:" : "Exprimez-vous:",
        "Shout" : "Expression",
        "Official" : "Officiel",
        "Everyone" : "Tout le monde",
        "Lates" : "Derniers",
        "Search citizen" : "Trouver un citoyen",
	"Shout" : "Shout",
	"Latest" : "Derniers",
	"one minute ago" : "il y a une minute",
	" for 10 shouts/day and more" : " pour 10 shouts/jour et plus",
	"No more shouts for today" : "Quota de shouts épuisé aujourd'hui ",
	"Top rated" : "Mieux Notés",

// country page
	"On the Map" : "Sur la carte",
	"Total citizens" : "Citoyens Totaux",
	"New citizens today" : "Nouveaux citoyens aujourd'hui",
	"Average citizen level" : "Rang moyen citoyen",
	"Citizenship requests": "Demande de Nationalité",
	"Online now": "Connectés",
	"Citizen fee": "Coût/citoyen",
	"View requests": "Voir demandes",
	"Citizens" : "Citoyens",
	"Who" : "Qui",
	"details" : "Détails",
	"Society" : "Societé",
	"Economy" : "Economie",
	"Politics" : "Politique",
	"Military" : "Militaire",
	"Administration" : "Administration",
	
	"Asturias" : "Principauté des Asturies",
	"Balearic Islands" : "Îles Baléares",
	"Basque Country" : "Pays Basque",
	"Brittany" : "Bretagne",
	"Burgundy" : "Bourgogne",
	"Catalonia" : "Catalogne",
	"Corsica" : "Corse",
	"Loire Valley" : "Vallée de la Loire",
	"Lower Normandy" : "Basse-Normandie",
	"North Calais" : "Pas-de-Calais",
	"Paris Isle of France" : "Paris Île-de-France",
	"Picardy" : "Picardie",
	"Rhone Alps" : "Rhône-Alpes",
	"Upper Normandy" : "Haute-Normandie",
	"Valencian Community" : "Communauté Valencienne",
	"Military" : "Militaire",
	"Military" : "Militaire",
	"Military" : "Militaire",
	"Military" : "Militaire",
	
// countries
	"Argentina" : "Argentine",
	"Australia" : "Australie",
	"Austria" : "Autriche",
	"Bosnia and Herzegovina" : "Bosznie-Herzegovine",
	"Brazil" : "Brasil",
	"Bulgaria" : "Bulgarie",
	"China" : "Chine",
	"Croatia" : "Croatie",
	"Canada" : "Canada",
	"Czech Republic" : "Repubblique Tchèque",
	"Denmark" : "Danemarque",
	"Estonia" : "Estonie",
	"Finland" : "Finlande",
	"France" : "France",
	"Germany" : "Allemange",
	"Greece" : "Grèce",
	"Hungary" : "Hongrie",
	"Indonesia" : "Indonésie",
	"Ireland" : "Irlande",
	"Israel" : "Israël",
	"Italy" : "Italie",
	"Iran" : "Iran",
	"Japan" : "Japon",
	"Latvia" : "Lettonie",
	"Lithuania" : "Lituanie",
	"Malaysia" : "Malaisie",
	"Mexico" : "Mexique",
	"Moldavia" : "Moldavie",
	"Netherlands" : "Pays-bas",
	"Norway" : "Norvège",
	"Pakistan" : "Pakistan",
	"Philippines" : "Phillippines",
	"Poland" : "Pologne",
	"Portugal" : "Portugal",
	"Romania" : "Roumanie",
	"Serbia" : "Serbie",
	"Singapore" : "Singapour",
	"South Africa" : "Afrique du Sud",
	"South Korea" : "Corée du Sud",
	"Slovakia" : "Slovaquie",
	"Slovenia" : "Slovénie",
	"Switzerland" : "Suisse",
	"Spain" : "Espagne",
	"Sweden" : "Suède",
	"Russia" : "Russie",
	"Thailand" : "Thailande",
	"United Kingdom" : "Royaume-Uni",
	"Ukraine" : "Ukraine",
	"USA" : "USA",
	"Turkey" : "Turquie",
	"World" : "Monde",
// economy
	"GOLD" : "Gold",
	"Gold" : "Gold",
	"Get Gold" : "Obtenir du Gold",
	"Treasury" : "Trésorie",
	"All accounts" : "Tout les comptes",
	"Country trading embargoes" : "Embargot(s)",
	"Taxes" : "Taxes",
	"Income Tax" : "Taxe importation",
	"Import Tax" : "Taxe exportation",
	"food" : "food",
	"gift" : "gift",
	"weapon" : "weapon",
	"moving tickets" : "moving tickets",
	"grain" : "grain",
	"diamonds" : "diamants",
	"iron" : "fer",
	"oil"  : "pétrole",
	"wood" : "bois",
	"house" : "maison",
	"hospital" : "hopital",
	"defense system" : "Systeme de défense",
	"Defense system" : "Systeme de défense",


	"Salary" : "Salaire",
	"Minimum" : "Minimum",
	"Average" : "Moyen",

	"Gross domestic product (GDP)" : "Produit Intérieur Brut (PIB)",
	"Monthly exports" : "Exportations mensuelle",
	"Monthly imports" : "Importations mensuelle",
	"Inflation" : "Inflation",
// company
	"Office" : "Poste de travail",
	"You have already worked today." : "Vous avez déja travaillé aujourd'hui.",
	"Come back tomorrow." : "Revenez demain.",
	"You are already an employee. To get this job please quit your current job." : "Vous êtes déjà employé. Pour obtenir ce poste veuillez quitter votre emploi actuel.",
	"Resign" : "Démiss",
	"Employees" : "Employés",
	"All employees" : "Tout les employés",
	"Raw materials" : "Matières premières",
	"Show all employees" : "Voir tous",
	"Show all donations" : "Voir dons",	
	"Go to marketplace" : "Allez sur la place des marchés",
	"Products" : "Produits",
	"Jobs available in this company" : "Emplois disponible dans cette entreprise",
	"You do not have any active job offers" : "Vous n'avez aucune offres d'emploi",
	"The company offers no products in this market" : "L'entreprise ne propose aucun produits sur ce marché",
	"Amount" : "Quantité",
	"Price" : "Prix",
	"Price with taxes" : "Prix TTC",
	"Company Page" : "Acceuil Entreprise",
	"Today" : "Aujourd'hui",
	"Yesterday" : "Hier",
	"All employees" : "Tous les employés",
	"Skill" : "Skill",
	"Daily salary" : "Salaire journalier",
	"Last presence" : "Dernier pointage",
	"Minimum country wage" : "Salaire mini du pays",

	"Grain" : "Grain",
	"Food" : "Food",
	"Gift" : "Gift",
	"Weapon" : "Weapon",
	"Moving Tickets" : "Moving Tickets",
	"Diamonds" : "Diamants",
	"Iron" : "Fer",
	"Oil"  : "Pétrole",
	"Wood" : "Bois",
	"House" : "Maison",
	"Hospital" : "Hopital",
	"Defense System" : "Systeme de défense",
// market
	"Quality Level" : "Niveau de Qualité",
	"All levels" : "Toutes qualitées",
	"Level 1" : "Qualité 1",
	"Level 2" : "Qualité  2",
	"Level 3" : "Qualité  3",
	"Level 4" : "Qualité  4",
	"Level 5" : "Qualité  5",

	"Provider" : "Produteur",
	"Quality" : "Qualité",
	"Stock" : "Stock",
	"Buy" : "Acheter",
	"Sell" : "Vendre",
	"Market" : "Marché",

	"Market offers" : "Offres sur le marché",
	"Show my offers" : "Voir mes offres",
	"Post new offer" : "Ajouter une offre",
	"Exchange rate" : "Taux de change",
	"Amount to buy" : "Quantité acheté",
	"Rec exchange rate" : "Taux recommandé",
	"Industry" : "industrie",
	"Minimum skill" : "Skill minimum",
	"Apply" : "Valider",
	"Amount" : "Quantité",
	"Price" : "Prix",
	"Next" : "Suivant",
	"Prev" : "Précédent",
	"Skip" : "Passer",
	"No products in this market" : "Aucun produits sur ce marché",
	"Go to marketplace" : "Allez sur la place des marchés",
	"Jobs available in this company" : "Emplois disponible dans cette entreprise",
	"Company for sale" : "Entreprises à vendre",
	"Create new campany" : "Créer une entreprise",
	"Company market" : "Marché des Entreprises",
	"The company cannot trade with this country due to a trade embargo." : "L'entreprise ne peut vendre sur ce marché à cause d'un embargo économique",
	"You don't have any active job offers" : "Vous n'avez aucune offres d'emploi",
	"You didn't specify the amount of products you wish to buy" : 
		"Vous n'avez pas spécifié la quantité de produits que vous désirez acheter",
	"You cannot trade with this country as you are at war with it" :
		"Vous ne pouvez pas faire affaire avec ce pays lorsque vous êtes en guerre contre celui-ci",

// region
	"Citizens" : "Citoyens",
	"Country - Society" : "Pays - Société",
        "Heal" : "Soigner",
	"Constructions": "Constructions",
	"Population": "Population",
	"Productivity" : "Productivité",
	"Resistance War" : "Guerre de Résistance",
	"Resistance War Active" : "Guerre de Résistance Active",
	"You cannot start a resistance war in this region because it already belongs to its original owner country." : "Vous ne pouvez pas commencer une guerre de résistance dans cette région parce qu'elle appartient déjà à son pays originel",
	"Medium" : "Medium",
	"High": "High",
	"Neighbors" : "Voisins",
// marketplace
	"Please select an Industry to see the marketplace offers" :
		"Veuillez selectionner une industrie pour en voir les offres",
	"Skill Level" : "Niveau de Skill",
	"Skill level" : "Niveau de Skill",
	"All skills" : "Tout Skills",
	"All" : "Tout",
// politics
	"Country Administration" : "Administration du Pays",
	"Accepted" : "Accepté",
	"ACCEPTED" : "ACCEPTÉ",
	"REJECTED" : "REJETÉ",
	"Rejected" : "Rejeté",
  "Pending" : "En Attente",
	"Congress" : "Congrès",
	"Issue Money" : "Émettre de la monnaie",
	"Law proposals" : "Proposition de Loi",
	"Minimum Wage" : "Salaire minimum",
	"Mutual Protection Pact" : "Pacte de Protection Mutuel",
	"Peace Proposal" : "Proposition de paix",
	"President" : "Président",
	"Yes" : "Oui",
	"No" : "Non",
	"Show all law proposals" : "Voir toutes les propositions",
	"The law voting process takes 24 hours." : "La procédure de vote prendra 24 heures.",
	"Only congress members and country presidents have the right to vote." : "Seuls les membres du Congrès et le Président ont le droit de voter.",
	"You are not a president or a congress member in this country." : "Vous n'êtes pas Président ou membre du Congrès de ce pays.",
	"Send message" : "Envoyer message",
	"Add as a friend" : "Ajouter en ami",
	"Offer a gift" : "Offrir un cadeau",
	// wars
	"no allies" : "aucun alliés",
	"All wars" : "Toutes les guerres",
	"Conquest wars" : "Guerre de conquête",
	"Resistance wars" : "Guerre de résistance",
	"Active wars" : "Guerres active",
	"Ended wars" : "Guerres terminées",
	"All resistance wars" : "Toutes les guerres de résistance",
	"All Alliances" : "Toutes les Alliances",
	"Alliances" : "Alliances",
	"Military force" : "Forces millitaire",
	"Average strength" : "Force moyenne",
	"has been secured by" : "a été sécurisé par",
	"War > Battlefield" : "Guerre > Champs de bataille",
	"Basic damage" : "Dégat de base",
	"Damage" : "Dégats",
	"Weapon quality" : "Qualité de l'arme",
	"Wellness" : "Wellness",
	"Rank" : "Grade",
	"Total damage" : "Total dégats",
	"Still active" : "en cours",
	"show finished battles" : "voir combats terminés",
	"started on" : "Commencé le",
	"Good fight" : "Félicitation",
	
// army
	"You have trained today. You can train again tomorrow." : "Vous vous êtes déja entrainé.Revenez demain.",
	"Force" : "Force",
	"Military rank" : "Grade militaire",
	"Military achievements" : "Succès militaire",
	"Active wars list" : "Liste des guerres active",
	"Sergeant" : "Sergent",
	"Corporal" : "Caporal",
	"Private" : "Soldat",
	"Show active wars" : "Voir les guerres active",
	"Start a Resistance War" : "Lancer la Résistance",
	"You do not have the necessary amount of Gold to start a resistance war." : "Vous n'avez pas le montant nécessaire pour lancer la résistance",
	"You cannot join this fight because your country is not involved in the war" : "Vous ne pouvez combattre parce que votre pays impliqué dans cette guerre",
	"There are no resistance wars in this country." : "Il n'y a pas de guerre de résistance dans ce pays.",
	"until the region can be occupied or secured" : "jusqu'à ce que la région soit occupé ou sécurisé",
	"Attackable on President's decision" : "Attaquable sur decision du Président",
	"Defense Points" : "Points de défense",
	"Go to Battlefield" : "Allez au champ de bataille",
	"see finished battles" : "Voir les combats terminés",
	"Wars list" : "Liste des Guerres",
	"War" : "Guerre",
	"Battle history" : "Historique bataille",
	"Fight" : "Combattre",
	"Hero" : "Hero",
	"Started by" : "Commencé par ",
	"started by" : "Initié par ",
	"Secure" : "Sécurisé ",
	"Conquer" : "Conquis ",
	"Fight for resistance" : "Se battre résistant",	
	"Fight for defenders" : "Se battre défenseur",
// party
	"Get more" : "Get more",
	"All donations" : "Tout les dons",
	"Debate Area" : "Espace débat",
	"Party page" : "Acceuil Parti",
	"Party members" : "Adhérents du Parti",
	"Your account" : "Vos Fonds",
	"Country presidency" : "Président du Pays",
	"Winner" : "Vainqueur",
	"Next election in " : "Prochaine éléction dans ",
	"Next elections in" : "Prochaine éléctions dans ",
	"No candidate proposed" : "Aucune candidature",
	"candidates" : "Être candidats",
	"Candidate" : "Être candidats",
	"days" : "jours",
	"GOLD" : "GOLD",
	"Show results" : "Voir résultats",
	"Show candidate list" : "Voir liste candidat",
	"Show candidates list" : "Voir liste candidats",
	"Show proposed members" : "Voir candidats au Congrès",
	"of congress" : "au Congrès",	
	"You are not a member of a party" : "Vous n'êtes pas membre d'un parti",
	"Join a party" : "Rejoindre un parti",
	"Create new" : "Fondez le votre",
	"congress members" : " membres du Congrès",
	"of Congress" : " du Congrès",
	"Show proposed members of congress" : "Voir les candidats au Congrès",
	"Run for congress" : "Courir pour le Congrès ",
	"Join" : "S'inscrire",
	"See all members" : "Voir tout les membres",
	"Donate Gold" : "Faire un don",
	"Members"  : "Membres",
	"Orientation" : "Sensibilité",
	"Show all members" : "Voir tout les membres",

	"Center" : "Centre",
	"Anarchist" : "Anarchiste",
	"Libertarian" : "Liberal",
	"Center-right" : "Centre droite",
	"Center-left" : "Centre gauche",
	"Far-left" : "Extrême-gauche",
	"Far-right" : "Extrême-droite",		
	"Accounts" : "Trésorie",
	"Elections" : "Elections",
	"Election results" : "Résultat scrutin",
	"Next elections" : "Prochaine éléctions ",

	"Country Presidency" : "Président du Pays",
	"Party presidency" : "Parti de la présidence",
	"Party President" : "Parti du Président",
	"See results" : "Voir résultat",
	"Expires tomorrow" : "Expire demain",

// articles
	"Report abuse" : "Signaler un abut",
	"report abuse" : "Signaler un abut",
	"today" : "aujourd'hui",
	"yesterday" : "Hier",
	"one hour ago" : "il y a 1 heure",
	"Unsubscribe" : "Désabonnement",
	"Subscribe" : "Abonnement",
	"Article RSS" : "Article RSS",
	"Your comment" : "Vos commentaires",
	"View all comments" : "Tout les commentaires",
	"Subscribe to comments" : "S'inscrire aux commentaires",
	"Unsubscribe to comments" : "Résilez aux commentaires",
	"Post a comment" : "Poster un commentaire",
// news
	"You do not have a newspaper" : "Vous n'avez pas de journal",
	"A newspaper is an efficient way to communicate your news to the eRepublik world. Read more on the eRepublik Wiki. Create your own newspaper." : "Un journal est la voie la plus éfficace pour faire connaitre vos nouvelles aux eRepublicains. Créer votre propre journal.",
//works
	"Total produstivity" : "Productivité Totale",
	"Basic productivity" : "Productivité de base",
	"Work Bonus" : "Bonus",
	"Manucfacturing skill" : "Skill de production",
	"Back to campany" : "Retour à l'entreprise",
	// profiles
	"Friends" : "Amis",
	"Fights" : "Combats",
	"fights" : "combats",
	"Location" : "Lieu",
	"Citizenship" : "Nationalité",
	"National Rank" : "Rang National",
	"Forfeit points" : "Points de ban",
	"Change" : "Modif",
	"all donations" : "Tout les dons",
	"edit profile" : "modifier mon compte",
	"ShareThis" : "ShareThis",
	"Shout something:" : "Exprimez-vous",
	"Assets" : "Actif",
	"Press director" : "Directeur de presse",
	"Inventory" : "Inventaire",
	"Get Gold" : "Get Gold",
	"Career" : "Carrière",
	"Bio" : "Bio",
	"Employee" : "Employé",
	"No political activity" : "pas d'activité politique",
	"Wellness" : "Wellness",
	"Level" : "Niveau",
	"Strength" : "Force",
	"Experience" : "Experience",
	"Skills:" : "Skills",
	"Land" : "Territoire",
	"Manufacturing" : "Fabrication",
	"Erepublik Age" : "Age eRepublik",
	"eRepublik Birthday" : "Anniversaire eRepublik",
	"Get Extra Storage" : "Obtenez des extra",
	"Party Member" : "Membre du parti",
	"No activity" : "Aucune activité",
	"Total damage:" : "Dégats Totaux:",
// succès et produits
	"Hard Worker" : "Fou de Travail",
	"Work for 30 days in a row" : "Travaillez 30 jours de suite",
	"Congress Member" : "Membre du Congrès",
	"Country President" : "Président du pays",
	"Win the Presidential elections" : "Remportez les éléctions présidentielle",
	"Media Mogul" : "Media Mogul",
	"Reach 1000 subscribers to your newspaper" : "Atteignez 1000 abonnés à votre journal",
	"Battle Hero" : "Hero de Guerre",
	"Reach the highest total damage in one battle" : "Atteignez le plus haut niveau de degat sur un combat",
	"Resistance Hero" : "Hero de la résistance",
	"Start a resistance war and liberate that region" : "Démarrez une guerre de résistance et libéré cette région",
	"Super Soldier" : "Super Soldat",
	"Advance 5 strength levels" : "Atteignez le niveau 5 de force",
	"Society Builder" : "Society Builder",
	"Invite 10 people to eRepublik and help them reach level 6" : "Invitez 10 personnes sur eRepublik et aidez les a atteindre le niveau 6",
	"Check your unlocked features" : "Verifiez vos fonctions débloqués",
	"Achievements" : "Succès",
	"Edit profile" : "modifier profil",
	"Edit Profile" : "Modifier profil",
	"Change residence" : "Changer de résidence",
	"Donations list" : "Liste des dons",
	
	"Your email here" : "Votre e-mail ici",
	"Your birthday" : "Votre anniversaire",
	"Citizen Avatar" : "Avatar",
	"Change password" : "Changer votre MDP",


	"Worked 30 days in a row" : "Travaillé 30 jours d'affilée",
	"Win the Congress elections": "Gagner les élections du Congrès",
// fight
	"Back to battlefield" : "Retour au champ de bataille",
	"Fight Again" : "Combattre encore",
	"Fight bonus" : "Bonus de combat",
// organizations
	"In order to log in as an organization you have to log out from your citizen account and log in again with your organization username and password." : "Afin de vous connecter en tant qu'organisation, vous devez vous déconnecter de votre compte de citoyen et de vous connecter à nouveau avec votre nom d'utilisateur et mot de passe organisation.",
	"If your citizen account represents an organization (SO) created in the eRepublik beta version, please send us a message using the Contact form (category: Others) so that we can officially change it to an organization. After 15th of December 2008 all SO's not transferred to Organizations will be considered fake accounts and will be banned. " : "Si votre compte citoyen représente une organisation (SO) créés dans la version bêta eRepublik, s'il vous plaît envoyez-nous un message via le formulaire de contact (catégorie: autres) afin que nous puissions officiellement le changer pour une organisation.Après le 15 de Décembre 2008, tous les SO non transférés seront considérés comme des comptes faux et seront interdits.",
	"My Organizations" : "Mon Organisation",
	"Logout" : "Déconnec",
	"Organizations created by you:" : "Organisations fondés par vous:",
	"You have not created any organization yet." : "Vous n'avez créer encore aucune organisation.",
// career-path
	"General manager" : "Directeur général",
	"Hard worker" : "Fou de travail",
// ranking
	"No." : "Numero",
	"Name" : "Nom",
	"Country" : "Pays",
	"Top Citizens" : "Top Citoyens",
	"Experience points" : "Points d'experience",
	"Hard worker" : "Fou de travail",
// messages
        "Inbox" : "Boîte de réception",
	"Sent" : "Envoyé",
	"Alerts" : "Alertes",
	"Subscriptions" : "Abonnements",
	"new article" : "Nouvel article",
	"Write article" : "Ecrire un article",
	"Edit newspaper details" : "Modifica i dettagli del giornale",
	"Edit" : "Modifier",
	"Delete" : "Effacer",
	"Read Message" : "Lire message",
	"Reply" : "Répondre",
	"From" : "De",
	"Back" : "Retour",
	"Picture" : "Image",
	"only JPG files allowed" : "Format JPG uniquement",
	"Publish" : "Publier",
// flash menu
	"My places > Army" : "Armée",
	"My places > Newspaper" : "Journal",
	"My places > Organizations" : "Organisation",

// menu	
	"Find out more" : "En savoir +",
	"logout" : "Déconnec",
	"New feature" : "Nouvelle Fonction",
	"Go to eRepublik" : "Retour sur eRepublik",
	"You have succesfully bought" : "Vous venez d'acheter",
	"product for" : "produit(s) pour",
	"This citizen does not have any donations sent or received." : "Vous n'avez reçu ou fait aucun dons",
// misc
	"Indispensable for surviving in the New World. Each day, automatic consume will increase citizen's wellness." : "Indispensable pour survivre dans le Nouveau Monde. Chaque jour, elle sera automatiquement consommée et augmentera votre wellness.",
	"Every fight will consume the highest quality weapon from the inventory, improving the citizen's damage." : "Chaque combat qui consomme l'arme de plus haute qualité de l'inventaire, augmente les dommages lors d'un combat.",
	"Elected by the party members on the 15th of each month" : "Elu par les membres du parti chaque 15 du mois",
	
};

trim = function (str) {
    return str!==null ? str.replace(/^\s*/, "").replace(/\s*$/, "") : null;
};

var regexps = {};
regexps["^(\\d*) allies(\\s*)$"] = "$1 alliés";
regexps["^Active wars in (.*)$"] = "Guerre active dans $1";
regexps["^Active resistance wars in (.*)$"] = "Résistance active dans $1";
regexps["(\\s*)Expires in (\\d*) days"] = "Expire dans $2 jours";
regexps["^(\\d*) comments$"] = "$1 commentaires";
regexps["^(\\d*) hours ago$"] = "il y a $1 heures ";
regexps["^(\\d*) minutes ago$"] = "il y a $1 minutes";
regexps["^(\\d*) days ago$"] = "il y a $1 jours";
regexps["^Regions \\((\\d*)\\)"] = "Régions ($1)";
regexps["^Friends \\((\\d*)\\)"] = "Amis ($1)";
regexps["^(\\d*) months"] = "$1 mois";
regexps["^Comments(.*)"] = "Commentaires $1";


matchRegexps = function(key) {
	if (key===null) {
		return undefined;
	}
//	GM_log("check '"+key+"'");
	for (var reg in regexps) {
		var rrrr = new RegExp(reg);
		var result = key.match(rrrr);
//		GM_log("match "+reg+" -> "+ rrrr+ " : "+result);
		if (key.match(rrrr)!==null) {
//			GM_log("match "+reg+" in "+key);
			return key.replace(rrrr,regexps[reg]);
		}
	}
	return undefined;
};

translate = function(key) {
	if (strings[key]!==undefined) {
	    return strings[key];
	} else {
	    var key2 = trim(key);
	    if (strings[key2]!==undefined) {
		return strings[key2];
	    }
	}
	return undefined;
};

translateWithRegexp = function(key) {
	if (strings[key]!==undefined) {
	    return strings[key];
	} else {
	    var key2 = trim(key);
	    if (strings[key2]!==undefined) {
		return strings[key2];
	    }
	}
	return matchRegexps(key);
};


var allTrans = {
    "span":"" , "a":"", "h2":"","th":"", "td":"", "p":"", "strong":"", "div":""
//  "a":"" 
};


militaryPage = function() {
  var _nodes = document.getElementsByTagName("p");
  var _node;
  for (var _key in _nodes) {
    if (_nodes[_key]!==null) {
      _node = _nodes[_key];
      if (_node.childNodes.length==2 && _node.childNodes[1].tagName=="A") {
        var tr = matchRegexps(_node.childNodes[0].nodeValue);
        if (tr!==undefined) {
          _node.childNodes[0].nodeValue = tr;
        }
      }
    }
  }
};

fixFlash = function() {
  var tags = document.getElementsByTagName("embed");
  for (var key in tags) {
    var node = tags[key];
    if (node.src.indexOf("delicious.swf")!=-1) {
      var flashVars = node.attributes.getNamedItem("flashvars").nodeValue;
      var txtValue = flashVars.replace(/txt=(.*)&&(.*)/,"$1");
      var trValue = translateWithRegexp(txtValue);
      if (trValue!==undefined) {
        /* sajnos nem mukodik ...
        var newVal = flashVars.replace(/txt=(.*)&&(.*)/,"txt="+trValue+"&&$2");
        alert("flashvars = "+flashVars + " -> "+txtValue + " -> "+trValue+ " : "+newVal);
        node.attributes.getNamedItem("flashvars").nodeValue = newVal;*/
        node.parentNode.innerHTML = "<span class='x' style='letter-spacing:0px'>"+trValue+"</span>";
      }
    }
  }
}


translateWholePage = function(e) {
  if (document.location.toString().indexOf("/country/military")!=-1) {
    militaryPage();
  }

  var node = undefined;
  for (var tagName in allTrans) {
    var tags = document.getElementsByTagName(tagName);
    for (var key in tags) {
      node = tags[key];
      if (node.childNodes.length==1) {
        var translation = translateWithRegexp(node.innerHTML);
//		GM_log("node : "+node.innerHTML + " -> "+translation);
        if (translation!==undefined) {
          node.innerHTML = translation;
        }
      } else {
        if (node.childNodes.length<=3) {
          for (var i=0;i<node.childNodes.length;i++) {
            if (node.childNodes[i].nodeName=="#text") {
//GM_log("node "+i+" : "+node.nodeName+" value: "+node.childNodes[i].nodeValue);
              translation = translateWithRegexp(node.childNodes[i].nodeValue);
              if (translation!==undefined) {
                node.childNodes[i].nodeValue = translation;
              }
            }
          }
        }
      }
    }
  }
}



window.addEventListener("load", function(e) { 
  translateWholePage(e); 
  fixFlash();
  setTimeout(500, translateWholePage)
}, false);