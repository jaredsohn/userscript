// ==UserScript==
// @name            Pack de lenguaje - Traduccion - Español
// @version         2.0.1.7
// @exclude         *
// ==/UserScript==

twpro_lp_custom = {
	info: ['KaZaC', 'mailto:kazac.en@gmail.com', 1069983, '.es1.'],     /*['Your name', 'http://your_url OR mailto:your_email', char_id (the character_id can be seen in your browser status bar by pointing your name on the ranking pages), '.fr1.w1.en12.de3. (the subdomain(s) of the world(s) you play. Each subdomain must be always preceded AND followed by a dot)']. Email/url and char_id+worlds are optional. If you mention your email/url address, other players will be able to see it on worlds you don't play. If you mention your char_id & world subdomains, other players will be able to open your InGame profile on worlds you play. Just leave these parameters blank if you don't want to use them.*/
		AUTHOR: 'Autores',     /*Displayed in footer, below the game chat. Prepended the list of authors of TW Pro*/
		TRANSLATOR: 'Traductor',     /*Displayed in footer. Prepended the translator of the current game locale*/
		TWPRO_DISABLED: 'Script deshabilitado: actualizacion del script necesaria debido a cambios en el codigo fuente de The-West',     /*The script can be disabled due to source code changes by The-West devs. If disabled, this text is displayed in the footer*/
		SORTBYNAME: 'Ordenar por <b>nombre</b>',     /*"Order activity list by name" button at the Inventory*/
		SORTBYXP: 'Ordenar por <b>experiencia</b>',     /*"Order activity list by experience" button at the Inventory*/
		SORTBYWAGES: 'Ordenar por <b>salario</b>',     /*"Order activity list by wages" button at the Inventory*/
		SORTBYLUCK: 'Ordenar por <b>suerte</b>',     /*"Order activity list by luck" button at the Inventory*/
		SORTBYCOMB: 'Ordenar por <b>rango de trabajo</b>',     /*"Order activity list by job rank" button at the Inventory. The player can define the importance of experience, wages, luck and danger, which is called "Job rank"*/
		SORTBYDANGER: 'Ordenar por <b>peligro</b>',     /*"Order activity list by danger" button at the Inventory*/
		SORTBYLABORP: 'Ordenar por <b>puntos de trabajo</b>',     /*"Order activity list by labor points" button at the Inventory*/
		FILTERJOBS: "Ocultar trabajos que no puedo hacer",     /*This message is shown in a tooltip when hovering over a checkbox which is available in the "Hide activities and itemsets" window. This checkbox is used to toggle the setting for hiding activities which the player cannot do (labor points is negative)*/
		FILTERCLOTHING: 'Mostrar solo la mejor ropa para la actividad seleccionada',     /*This text is shown in a tooltip when hovering over a checkbox at the Inventory. If checked, the best items for the selected activity is shown with all other items hidden*/
		CHOOSEJOB: 'Escoger actividad...',     /*If TW Pro has calculated the activity list, this text is shown when no activity is selected*/
		CALCJOB: 'Calculando valores, por favor espere...',     /*If TW Pro is calculating the activity list, this text will be shown in the activity list drop-down box*/
		INVENTSTATS: 'Estadisticas del inventario',     /*The title of the tooltip, visible when hovering over the "Backpack" text at the Inventory*/
		SELLVALUE: 'Valores de venta',     /*Visible in the Inventory statistics tooltip. The money you get for selling all items*/
		OBJECTS: 'Objetos',     /*Visible in the Inventory statistics tooltip. Objects are all items except for products*/
		PRODUCTS: 'Productos',     /*Visible in the Inventory statistics tooltip. */
		TOTAL: 'Total',     /*Visible in the Inventory statistics tooltip. */
		QUANTITIES: 'Cantidades',     /*Visible in the Inventory statistics tooltip. */
		LABORP: 'LP',     /*Abbrevation of Labor points, please keep this as short as possible; it is used in the activity ;ost and other places*/
		CONSTRUCTION: ' \u25B7 Construccion',     /*A special activity, constructing buildings in your town*/
		HPTOTAL: 'Puntos totales de salud',     /*This text is used in an exported duel report. It indicates the sum of lost health points in a duel*/
		STARTCALC: 'Calcular valores...',     /*If TW Pro has not calculated the activity list yet, this text will be shown in the activity list drop-down box*/
		CONVERT: 'Convertir',     /*A button in a duel report, used for exporting a duel to BBcodes*/
		MULTISEL: 'Vender multiples objetos...',     /*A button in a town trader, enabling players to sell multiple items at once*/
		SELL: 'Vender seleccion',     /*The value of the button after clicking the "Sell multiple items..." button. Clicking this button sells all selected items*/
		CONFIRMSELL: '¿Esta seguro de que quiere vender estos %1 objetos?',     /*Text of a confirmation dialogue, shown after clicking "Sell selection"*/
		SELLING: 'Vendiendo...',     /*The value of the button "Sell selection" during a multi-sale*/
		SALEDONE: 'Los objetos seleccionados han sido vendidos.',     /*This text is displayed after a multi-sale*/
		NONESELECTED: '¡Tienes que seleccionar al menos un objeto!',     /*This warning message is displayed when no items are selected when trying to sell multiple items*/
		JOBRANKSETTINGS: 'Configuracion del rango de trabajo',     /*This text is shown in a tooltip on hovering over the image for a job rank.  The player can define the importance of experience, wages, luck and danger, which is called "Job rank"*/
		SEARCHINVENTORY: 'Buscar',     /*This text is displayed in the "Search inventory" text field by default. Keep it short*/
		NOSEARCHRESULT: 'Tu busqueda de %1 no ha dado resultados.%2Mostrar todos los objetos%3',     /*This message is displayed in the inventory (Inventory and Market) when the search query returned no items. %1 is the query, %2 marks the beginning of the "Display all items" link, %3 marks the end. Clicking "Display all items" removed the search filter (empties the "Search inventory" text field)*/
		DISABLEBESTFORJOB: 'Mostrar los objetos que son inferiores para la actividad seleccionada.',     /*This text is displayed when the checkbox "Just display the best clothing available for the selected activity" is checked and the inventory search returned no results*/
		SEARCHHELP: 'Buscar en el inventario. Puedes usar comodines (* para cero o mas caracteres, ? para un caracter)',     /*When hovering over the "?" button next to the "Search inventory" field, this help message is displayed in a tooltip*/
		DUELSHOOTINGATT: ' \u25B7 Duelista a distancia (atacante)',     /*A special activity for duel clothing used by shooting duellers in the challenging role*/
		DUELSHOOTINGDEF: ' \u25B7 Duelista a distancia (defensor)',     /*A special activity for duel clothing used by shooting duellers in the defending role*/
		DUELVIGOR: ' \u25B7 Duelista contundente',     /*A special activity for duel clothing used by resistance duellers*/
		FORTATTACK: ' \u25B7 Batalla de fuerte (atacante)',     /*A special activity for attackers in fort battles*/
		FORTDEFEND: ' \u25B7 Batalla de fuerte (defensor)',     /*A special activity for defenders in fort battles*/
		FORTMESSAGE: 'Mensaje a participantes',     /*Displayed on Fortbattle page, to send a PM to all participants*/
		FORTMESSAGERCP: 'Numero de destinatarios',     /*Information displayed when you click on "Message to participants"*/
		HIDEJOBS: 'Configuracion de actividades y conjuntos',     /*This text is shown as a tab in the TW Pro settings window*/
		CONFIRM: 'Confirmar',     /*The button for confirming/ saving changes in the "Activities & Itemsets Management" tab*/
		HIDEJOBDESC: 'Los trabajos pueden ocultarse aqui. Marca todas las actividades que no se calcularan automaticamente, y haz clic en Confirmar.',     /*The description for the "Activities & Itemsets Management" tab*/
		SHOWN: 'Mostradas',     /*Displayed ahead the selection field for activities that are currently shown*/
		HIDDEN: 'Ocultas',     /*Displayed ahead the selection field for activities that are currently hidden*/
		SETTINGSSAVED: '¡La configuracion para TW Pro ha sido aplicada!',     /*After clicking "Confirm" in the "Activities & Itemsets Management" tab, this message is displayed*/
		SETTINGSSAVEDSESSION: '¡La configuracion para TW Pro ha sido aplicada! (solo para esta sesion)',     /*After clicking "Confirm" in the "Activities & Itemsets Management" tab while having the checkbox near Confirm checked (persistent settings), this message is displayed*/
		PERSISTSETTINGS: 'Guardar esta configuracion para cada sesion.',     /*Displayed in a tooltip when hovering over a checkbox next to "Confirm" in the "Activities & Itemsets Management" tab. If this checkbox is checked, the changes will be saved for future sessions. Otherwise, after a reloading the page, changes are lost*/
		CANNOTWEAR: 'No puedes usar este conjunto, o este set no afecta en los calculos de las actividades.',     /*This text is displayed when hovering over an item set at the "Activities & Itemsets Management" tab for items sets you cannot wear (e.g. Dancer set cannot be used by male characters) or that have no influence on Activities (e.g.: Sleepyhead has only bonuses in "Fastest Lifepoints")*/
		SETSETTINGS: 'Desabilita los conjuntos para calculos mas rapidos. Los conjuntos con requerimientos especiales o desconocidos son desabilitados por defecto.',     /*The description displayed ahead the settings for itemsets at the "Activities & Itemsets Management" tab*/
		CUSTOMNAME: 'Introduce el nombre deseado para la actividad.',     /*Visible in the "Activities & Itemsets Management" tab.This message is displayed in a tooltip when hovering over the text field, used for setting the name for a custom activity.*/
		CUSTOMCALCULATION: 'Selecciona la habilidad que quieras utilizar.',     /*This message is displayed in a tooltip when hovering over the text field, used for setting the TW Pro calculation (this calculation is used for determining the importance of skills for activities) for a custom activity. Applies to the "Activities & Itemsets Management" tab*/
		CUSTOMENABLED: 'Selecciona para includir esta actividad en la lista de trabajos',     /*This button is visible in the "Activities & Itemsets Management" tab. If this checkbox is checked, the activity is included in the activity list. Otherwise, the activity will be hidden*/
		NEW: 'Nuevo',     /*Visible in the "Activities & Itemsets Management" tab.This text is displayed in a tooltip when hovering over the "+" button, used for creating a new custom activity*/
		SPEED: ' \u25B7 Velocidad',     /*A special activity, useful for travelling great distances and saving time*/
		REGENERATION: ' \u25B7 Regeneracion de puntos de vida',     /*A special activity, useful when you are low on Health points and want to restore your health points faster*/
		SETSINFO: "Conjuntos",     /*Title of the "Itemsets information" window which displays the bonuses for each set*/
		WITHSETITEMS: 'Bonus con %1 objetos',     /*Displayed in Setinfo window*/
		LABORPOINTS: 'Puntos de trabajo',     /*Labor points, displayed for sets. Example: +20 Labor points*/
		USEFULITEM: 'Este numero indica la cantidad de objetos que son usados en los calculos',     /*Displayed between parentheses after a set name in the TW Pro Config screen*/
		PERCREGENERATION: 'Regeneracion de energia',     /*__ % Regeneration with Sleepyhead items*/
		LUCK: 'Suerte',     /*__ % luck with Holiday set items*/
		PRAYING: 'Oracion',     /*6 Sleepyhead items gives +1 Praying*/
		NOITEMSETS: "No tienes ningun objeto de este set",     /*Displayed in the vertical Set filters*/
		AVERAGEDAMAGE: "Daño medio",     /*Displayed on every weapons*/
		PREFERENCES: "Preferencias",     /*This text is shown as a tab in the TW Pro settings window*/
		DEFAULTSORTING: " \u25B7 Orden por defecto",     /*Visible in the "Preferences" tab.*/
		FBHEALTHPRIORITY: "Prioridad de los puntos de vida",     /*Visible in the "Preferences" tab.*/
		FBHEALTHPRIORITYZERO: "Ninguna",     /*Visible in the "Preferences" tab. Applies to the "Health points priority" menu.*/
		FBHEALTHPRIORITYLOW: "Baja",     /*Visible in the "Preferences" tab. Applies to the "Health points priority" menu.*/
		FBHEALTHPRIORITYMEDIUM: "Media",     /*Visible in the "Preferences" tab. Applies to the "Health points priority" menu.*/
		FBHEALTHPRIORITYHIGH: "Alta",     /*Visible in the "Preferences" tab. Applies to the "Health points priority" menu.*/
		FBHEALTHPRIORITYAUTO: "Auto",     /*Visible in the "Preferences" tab. Applies to the "Health points priority" menu.*/
		FBBATTLEUNIT: "Tipo de combate",     /*Visible in the "Preferences" tab.*/
		FBBATTLEUNITSKIRMISHER: "Tirador (esquivar) | Linea frontal",     /*Visible in the "Preferences" tab. Applies to the "Battle unit type" menu.*/
		FBBATTLEUNITLINEINFANTRYMAN: "Soldado de infanteria (polivalente) | Linea media",     /*Visible in the "Preferences" tab. Applies to the "Battle unit type" menu.*/
		FBBATTLEUNITMARKSMAN: "Tirador (punteria) | Linea trasera",     /*Visible in the "Preferences" tab. Applies to the "Battle unit type" menu.*/
		DMGMIN: "Min",     /*Abbreviation for Minimum. Reters to the minimum damage of a weapon. Visible on weapon popups.*/
		DMGMAX: "Max",     /*Abbreviation for Maximum. Reters to the maximum damage of a weapon. Visible on weapon popups.*/
		DMGAVG: "Avg",     /*Abbreviation for Average. Reters to the average damage of a weapon. Visible on weapon popups.*/
		CHATWHISPER: "* Susurrar *\n\nIntroduce el nombre de un jugador",     /*Visible when clicking the corresponding button in the Chat box.*/
		CHATCOLOR: "* Color personalizado (000-999) *\n\nIntroduce un codigo de color",     /*Visible when clicking the corresponding button in the Chat box.*/
		USEFULITEMS : "Resaltar todos los objetos que son utiles para mis actividades habilitadas",     /*Visible near the backpack. Displayed when calculations has been run and none activity is selected.*/
		USEFULITEMSPOPUP : " \u25B7 Caja | Resaltar con detalles",     /*Visible in the "Preferences" tab. Applies to the special box that highlights useful items.*/
};