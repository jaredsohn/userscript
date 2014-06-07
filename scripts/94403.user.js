// ==UserScript==
// @name            TW PRO Language pack Português
// ==/UserScript==

twpro_lp_custom = {
	info: ['Edukillyou', 'mailto:rodrigocabelocps@hotmail.com', 475481, '.br2.'],     /*['Your name', 'http://your_url OR mailto:your_email', char_id (the character_id can be seen in your browser status bar by pointing your name on the ranking pages), '.fr1.w1.en12.de3. (the subdomain(s) of the world(s) you play. Each subdomain must be always preceded AND followed by a dot)']. Email/url and char_id+worlds are optional. If you mention your email/url address, other players will be able to see it on worlds you don't play. If you mention your char_id & world subdomains, other players will be able to open your InGame profile on worlds you play. Just leave these parameters blank if you don't want to use them.*/
		AUTHOR: 'Autores',     /*Displayed in footer, below the game chat. Prepended the list of authors of TW Pro*/
		TRANSLATOR: 'Tradutor',     /*Displayed in footer. Prepended the translator of the current game locale*/
		TWPRO_DISABLED: 'script desabilitado',     /*TW Pro can be disabled in the script. If disabled, this text is displayed in the footer*/
		SORTBYNAME: 'Ordem por <b>nome</b>',     /*"Order activity list by name" button at the Inventory*/
		SORTBYXP: 'Ordem por <b>experiência</b>',     /*"Order activity list by experience" button at the Inventory*/
		SORTBYWAGES: 'Ordem por <b>salários</b>',     /*"Order activity list by wages" button at the Inventory*/
		SORTBYLUCK: 'Ordem por <b>sorte</b>',     /*"Order activity list by luck" button at the Inventory*/
		SORTBYCOMB: 'Ordem por <b>ranking</b>',     /*"Order activity list by job rank" button at the Inventory. The player can define the importance of experience, wages, luck and danger, which is called "Job rank"*/
		SORTBYDANGER: 'Ordem por <b>perigo</b>',     /*"Order activity list by danger" button at the Inventory*/
		SORTBYLABORP: 'Ordem por <b>pontos de trabalho</b>',     /*"Order activity list by labor points" button at the Inventory*/
		FILTERJOBS: "Esconder os trabalhos que não posso fazer",     /*This message is shown in a tooltip when hovering over a checkbox which is available in the "Hide activities and itemsets" window. This checkbox is used to toggle the setting for hiding activities which the player cannot do (labor points is negative)*/
		FILTERCLOTHING: 'Mostrar apenas os meus melhores itens para o trabalho selecionado',     /*This text is shown in a tooltip when hovering over a checkbox at the Inventory. If checked, the best items for the selected activity is shown with all other items hidden*/
		CHOOSEJOB: 'Escolha o Trabalho...',     /*If TW Pro has calculated the activity list, this text is shown when no activity is selected*/
		CALCJOB: 'Calculando Valor, aguarde...',     /*If TW Pro is calculating the activity list, this text will be shown in the activity list drop-down box*/
		INVENTSTATS: 'Estatísticas do Inventário',     /*The title of the tooltip, visible when hovering over the "Backpack" text at the Inventory*/
		SELLVALUE: 'Valor de Vendas',     /*Visible in the Inventory statistics tooltip. The money you get for selling all items*/
		OBJECTS: 'Itens',     /*Visible in the Inventory statistics tooltip. Objects are all items except for products*/
		PRODUCTS: 'Produtos',     /*Visible in the Inventory statistics tooltip. */
		TOTAL: 'Total',     /*Visible in the Inventory statistics tooltip. */
		QUANTITIES: 'Quantidades',     /*Visible in the Inventory statistics tooltip. */
		NONYIELDS: 'Sem rendimentos',     /*Visible in the Inventory statistics tooltip. */
		LABORP: 'PT',     /*Abbrevation of Labor points, please keep this as short as possible; it is used in the activity ;ost and other places*/
		CONSTRUCTION: 'Construção',     /*A special activity, constructing buildings in your town*/
		HPTOTAL: 'Total de pontos de saúde',     /*This text is used in an exported duel report. It indicates the sum of lost health points in a duel*/
		STARTCALC: 'Calcular dados...',     /*If TW Pro has not calculated the activity list yet, this text will be shown in the activity list drop-down box*/
		CONVERT: 'Converter',     /*A button in a duel report, used for exporting a duel to BBcodes*/
		MULTISEL: 'Vender vários itens...',     /*A button in a town trader, enabling players to sell multiple items at once*/
		SELL: 'Vender os selecionados',     /*The value of the button after clicking the "Sell multiple items..." button. Clicking this button sells all selected items*/
		CONFIRMSELL: 'Você realmente quer vender %1 da pilha de itens?',     /*Text of a confirmation dialogue, shown after clicking "Sell selection"*/
		SELLING: 'Vender...',     /*The value of the button "Sell selection" during a multi-sale*/
		SALEDONE: 'Os itens selecionados foram vendidos.',     /*This text is displayed after a multi-sale*/
		NONESELECTED: 'Você tem que selecionar pelo menos um item!',     /*This warning message is displayed when no items are selected when trying to sell multiple items*/
		JOBRANKSETTINGS: 'Definições do ranking de Trabalho',     /*This text is shown in a tooltip on hovering over the image for a job rank.  The player can define the importance of experience, wages, luck and danger, which is called "Job rank"*/
		SEARCHINVENTORY: 'Pesquisar no Inventário',     /*This text is displayed in the "Search inventory" text field by default. Keep it short*/
		NOSEARCHRESULT: 'Sua busca de %1 não retornou resultados.%2Mostrar todos Itens%3',     /*This message is displayed in the inventory (Inventory and Market) when the search query returned no items. %1 is the query, %2 marks the beginning of the "Display all items" link, %3 marks the end. Clicking "Display all items" removed the search filter (empties the "Search inventory" text field)*/
		DISABLEBESTFORJOB: 'Desativar itens escondidos que são inferiores para um trabalho selecionado.',     /*This text is displayed when the checkbox "Just display the best clothing available for the selected activity" is checked and the inventory search returned no results*/
		SEARCHHELP: 'Procurar no Inventário. Você pode usar curingas (* para zero ou mais caracteres, ? para um personagem)',     /*When hovering over the "?" button next to the "Search inventory" field, this help message is displayed in a tooltip*/
		DUELSHOOTINGATT: 'Duelista de Tiro (atacante)',     /*A special activity for duel clothing used by shooting duellers in the challenging role*/
		DUELSHOOTINGDEF: 'Duelista de Tiro (defensor)',     /*A special activity for duel clothing used by shooting duellers in the defending role*/
		DUELVIGOR: 'Duelista de Vigor',     /*A special activity for duel clothing used by resistance duellers*/
		FORTATTACK: 'Duelista de Forte (atacante)',     /*A special activity for attackers in fort battles*/
		FORTDEFEND: 'Duelista de Forte (defensor)',     /*A special activity for defenders in fort battles*/
		FORTMESSAGE: 'Mensagem aos participantes',     /*Displayed on Fortbattle page, to send a PM to all participants*/
		FORTMESSAGERCP: 'Número de receptores',     /*Information displayed when you click on "Message to participants"*/
		HIDEJOBS: 'Ocultar trabalhos e os conjuntos de itens',     /*This text is shown in the title bar of the TW Pro settings window, displayed after clicking "Config"*/
		CONFIRM: 'Confirmar',     /*The button for confirming/ saving changes in the "Hide activities and itemsets" window*/
		HIDEJOBDESC: 'Esconder os trabalhos aqui. Marcar todas as atividades que não deve ser calculado automaticamente, e clique em Confirmar.',     /*The description for the "Hide activities and itemsets" window*/
		SHOWN: 'Mostrar',     /*Displayed ahead the selection field for activities that are currently shown*/
		HIDDEN: 'Esconder',     /*Displayed ahead the selection field for activities that are currently hidden*/
		SETTINGSSAVED: 'As definições para TW Pro foram aplicadas!',     /*After clicking "Confirm" in the "Hide activities and itemsets" window, this message is displayed*/
		SETTINGSSAVEDSESSION: 'As definições para TW Pro foram aplicadas! (Somente para esta sessão)',     /*After clicking "Confirm" in the "Hide activities and itemsets" window while having the checkbox near Confirm checked (persistent settings), this message is displayed*/
		PERSISTSETTINGS: 'Salvar essas configurações para todas sessões.',     /*Displayed in a tooltip when hovering over a checkbox next to "Confirm" in the "Hide activities and itemsets" window. If this checkbox is checked, the changes will be saved for future sessions. Otherwise, after a reloading the page, changes are lost*/
		CANNOTWEAR: 'Você não pode usar esse conjunto, ou esse conjunto não influência sobre os cálculos do Trabalho.',     /*This text is displayed when hovering over an item set at the "Hide activities and itemsets" window for items sets you cannot wear (e.g. Dancer set cannot be used by male characters) or that have no influence on Activities (e.g.: Sleepyhead has only bonuses in "Fastest Lifepoints")*/
		SETSETTINGS: 'Desabilitar conjunto de itens para calcular mais rápido. Conjuntos com necessidades especiais, as exigências não atendidas são desativados por padrão.',     /*The description displayed ahead the settings for itemsets at the "Hide activities and itemsets" window*/
		CUSTOMNAME: 'Digite o nome desejado para um trabalho',     /*This message is displayed in a tooltip when hovering over the text field, used for setting the name for a custom activity*/
		CUSTOMCALCULATION: 'Digite um cálculo válido TW Pro aqui.',     /*This message is displayed in a tooltip when hovering over the text field, used for setting the TW Pro calculation (this calculation is used for determining the importance of skills for activities) for a custom activity. Applies to the "Hide activities and itemsets" window*/
		CUSTOMENABLED: 'Marque esta caixa para habilitar esse trabalho.',     /*This button is visible at the "Hide activities and itemsets" window. If this checkbox is checked, the activity is included in the activity list. Otherwise, the activity will be hidden*/
		NEW: 'Novo',     /*This text is displayed in a tooltip when hovering over the "+" button, used for creating a new custom activity*/
		SPEED: 'Velocidade',     /*A special activity, useful for travelling great distances and saving time*/
		REGENERATION: 'Regenerar pontos de saúde',     /*A special activity, useful when you are low on Health points and want to restore your health points faster*/
		SETSINFO: "Conjunto de itens",     /*Title of the "Itemsets information" window which displays the bonuses for each set*/
		WITHSETITEMS: 'Bônus com %1 dos itens',     /*Displayed in Setinfo window*/
		LABORPOINTS: 'Pontos de trabalho',     /*Labor points, displayed for sets. Example: +20 Labor points*/
		USEFULITEM: 'Esse número indica a quantidade de itens que são utilizados nos cálculos',     /*Displayed between parentheses after a set name in the TW Pro Config screen*/
		PERCREGENERATION: 'Regeneração com Conj. dorminhoco',     /*__ % Regeneration with Sleepyhead items*/
		LUCK: 'Sorte com Conj. dorminhoco',     /*__ % luck with Holiday set items*/
		PRAYING: 'Rezar com Conj. dorminhoco',     /*6 Sleepyhead items gives +1 Praying*/
};