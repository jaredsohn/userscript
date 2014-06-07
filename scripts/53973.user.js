// ==UserScript==
// @name           Tradução portuguesa de eRepublik
// @version	   0.2 (10 de junho de 2009)
// @description    Tradução portuguesa de eRepublik
// @include        http://www.erepublik.com/*
// @author	   acoutinho, baseado no trabalho de Ancelo (http://userscripts.org/scripts/show/49790)
// @author	   acoutinho, based on the work of Ancelo (http://userscripts.org/scripts/show/49790)
// @autor          Wakko, baseado no trabalho do acoutinho (http://www.erepublik.com/en/article/erepublik-em-portugu-s-updated1-824658/1/20)
// ==/UserScript==

var strings = {
// menu
	"Home" : "Início",
	"Donate" : "Doar",
	"May" : "Maio",
	"June" : "Junho",
	"July" : "Julho",
//meses meus
	"January" : "Janeiro",
	"February" : "Fevereiro",
	"March" : "Março",
	"April" : "Abril",
	"August" : "Agosto",
	"Septembre" : "Setembro",
	"October" : "Outubro",
	"November" : "Novembro",
	"December" : "Dezembro",
//meses meus
	"Day" : "Dia ",
	"of the New World" : " do Novo Mundo",
	"Rank"   : "Rank",
	"Company" : "Empresa", 
	"Profile":"Perfil", 
	"Party" : "Partido", 
	"Newspaper" :"Jornal",
	"Army" : "Exército",
	"Country administration" : "Administração do país",
        "Organizations" : "Organizações",
	"Market" : "Mercado",
	"Monetary market" : "Mercado Monetário",
	"Job market" : "Mercado de Emprego",
        "Companies for sale" : "Empresas para venda",
        "Get gold &amp; extras" : "Obter Ouro e extras",
	"Rankings" : "Rankings",
	"Social stats" : "Estatátiscas Sociais",
	"Economic stats" : "Estatátiscas Econômicas",
	"Political stats" : "Estatátiscas Políticas",
	"Military stats" : "Estatátiscas Militares",
	"Tools" : "Ferramentas",
	"Forum" : "Fórum",
	"News" : "Noticias",
	"Invite friends" : "CONVIDAR AMIGOS",
	"eRepublik Shop" : "Loja eRepublik",
	"Career path" : "Carreira",
//Plato
	"Ok, thanks, next tip" : "Obrigado, próxima ajuda",
	"I have nothing more to say at the moment" : "Não tenho nada a dizer por agora",
//pagina inicial
	"Select" : "Selecione",
        "Latest events" : "Últimos eventos",
	"News" : "Noticias",
        "More events" : "Mais eventos",
        "More news" : "Mais notícias",
	"more news" : "mais noticias",
	"Marketplace" : "Mercado",
	"Wars" : "Guerras",
        "My Places" : "Meu Perfil",
        "Info" : "Info",
        "Community" : "Comunidade",
        "Day of the new world" : "Dia do Novo Mundo",
        "National" : "Nacionais",
        "International" : "Internacionais",
	"Latest Events" : "Últimos acontecimentos",
        "Shouts" : "O que outros dizem...",
        "Shout something" : "Diz algo...",
        "Shout" : "Diz!",
        "Official" : "Oficial",
        "Everyone" : "Todos",
        "Lates" : "Ãšltimas",
        "Search citizen" : "Perquisar...",
	"Shout" : "Diz!",
	"Latest" : "Últimas",
	"one minute ago" : "um minuto atrás",
	"for 10 shouts/day and more" : "10 comunicados/dia e mais",
	"No more shouts for today" : "Não pode dizer mais nada hoje",
	"Top Rated" : "Mais votadas",

// country page
	"On the Map" : "Mapa",
	"Total citizens" : "Total de cidadãos",
	"New citizens today" : "Novos cidadãos hoje",
	"Average citizen level" : "Nível médio nacional",
	"Online now": "Online agora",
	"Citizens" : "Cidadãos",
	"Who" : "Quem",
	"details" : "detalhes",
	"Society" : "Sociedade",
	"Economy" : "Economia",
	"Politics" : "Politica",
	"Military" : "Militar",
	"Administration" : "Administração",
	"President Impeachment" : "Impugnação Presidencial",

	
// countries
	"Countries" : "Países",

	"Argentina" : "Argentina",
	"Australia" : "Austrália",
	"Austria" : "Áustria",
	"Bosnia and Herzegovina" : "Bósnia-Herzegovina",
	"Brazil" : "Brasil",
	"Bulgaria" : "Bulgária",
	"China" : "China",
	"Croatia" : "Croácia",
	"Canada" : "Canadá",
	"Czech Republic" : "Republica Checa",
	"Denmark" : "Dinamarca",
	"Estonia" : "Estônia",
	"Finland" : "Finlandia",
	"France" : "França",
	"Germany" : "Alemanha",
	"Greece" : "Grécia",
	"Hungary" : "Hungria",
	"Indonesia" : "Indonésia",
	"Ireland" : "Irlanda",
	"Israel" : "Israel",
	"Italy" : "Itália",
	"Iran" : "Irã",
	"Japan" : "Japão",
	"Latvia" : "Letônia",
	"Lithuania" : "Lituânia",
	"Malaysia" : "Malásia",
	"Mexico" : "México",
	"Moldavia" : "Moldávia",
	"Netherlands" : "Holanda",
	"Norway" : "Noruega",
	"Pakistan" : "Paquistão",
	"Philippines" : "Filipinas",
	"Poland" : "Polônia",
	"Portugal" : "Portugal",
	"Romania" : "Romênia",
	"Serbia" : "Servia",
	"Singapore" : "Singapura",
	"South Africa" : "África do Sul",
	"South Korea" : "Coreia do Sul",
	"Slovakia" : "Eslováquia",
	"Slovenia" : "Eslovênia",
	"Switzerland" : "Suiça",
	"Spain" : "Espanha",
	"Sweden" : "Suécia",
	"Russia" : "Rússia",
	"Thailand" : "Tailândia",
	"United Kingdom" : "Reino Unido",
	"Ukraine" : "Ucrânia",
	"USA" : "Estados Unidos",
	"Turkey" : "Turquia",
	"World" : "Mundo",
// economy
	"GOLD" : "OURO",
	"Gold" : "Ouro",
	"Treasury" : "Tesouro",
	"All accounts" : "Todas as contas",
	"Country trading embargoes" : "Embargos",
	"Taxes" : "Impostos",
	"food" : "comida",
	"gift" : "presentes",
	"weapon" : "armas",
	"moving tickets" : "passagens",
	"grain" : "cereal",
	"diamonds" : "diamantes",
	"iron" : "ferro",
	"oil"  : "petróleo",
	"wood" : "madeira",
	"house" : "casa",
	"hospital" : "hospitais",
	"defense system" : "sistemas de defesa",
	"Defense system" : "Sistemas de Defesa",


	"Salary" : "Salário",
	"Minimum" : "Mínimo",
	"Average" : "Médio",

	"Gross domestic product (GDP)" : "Produto Interno Bruto (PIB)",
	"Monthly exports" : "Exportações Mensais",
	"Monthly imports" : "Importações Mensais",
	"Inflation" : "Inflação",
// company
	"Office" : "Escritório",
	"You have already worked today." : "Já trabalhou hoje.",
	"Come back tomorrow." : "Volta outra vez amanhã.",
	"Resign" : "Demitir",
	"Employees" : "Empregados",
	"Raw materials" : "Matéria prima",
	"Show all employees" : "Ver empregados",
	"Show all donations" : "Ver doações",
	"Go to marketplace" : "Ir para o Mercado",
	"Products" : "Produtos",
	"Jobs available in this company" : "Empregos disponíveis nesta empresa",
	"You do not have any active job offers" : "Não há ofertas de emprego nesta empresa",
	"The company offers no products in this market" : "Esta empresa não vende produtos neste mercado",
	"Amount" : "Quantidade",
	"Price" : "Preço",
	"Price with taxes" : "Preço com impostos",
	"Company Page" : "Página da empresa",
	"Today" : "Hoje",
	"Yesterday" : "Ontém",
	"All employees" : "Todos os empregados",
	"Skill" : "Habilidade",
	"Daily salary" : "Salário diário",
	"Last presence" : "Última presença",
	"Minimum country wage" : "Salário mínimo nacional",

	"Grain" : "Cereal",
	"Food" : "Comida",
	"Gift" : "Presentes",
	"Weapon" : "Armas",
	"Moving Tickets" : "Passagens",
	"Diamonds" : "Diamantes",
	"Iron" : "Ferro",
	"Oil"  : "Petróleo",
	"Wood" : "Lenha",
	"House" : "Casas",
	"Hospital" : "Hospital",
	"Defense System" : "Sistemas de defesa",

	"Find a job or own a company. Having a job will allow you to get a salary each day you go to work (don't worry, in eRepublik it is much more fun and 

faster to go to work than in real life).": "Procura um emprego ou possiu companhias. Ter um emprego permite a você ganhar o salário cada dia que vais 

trabalhar (não se preocupe, trabalhar no eRepublik é muito mais fácil do que na vida real) (Nota: não é recomendado que possuas empresas, usa organizações 

para isso).",
	"You do not have a job" : "Você está desempregado",
	"Find a job" : "Procurar emprego",

	"Own a company" : "Dono de empresa",
	"Having your own company may be a major source of wealth, but first you will need to make sure you have enough money to pay your future 

employees' salaries so that you don't go bankrupt." : "Ter empresas pode te dar muito rendimento, mas tem que fazer bem as contas, ter dinheiro para pagar 

salários, para não falir",
	"Create company" : "Criar uma companhia",
	"Buy from market" : "Compra no mercado",  //mercado de empresas
	"Finances" : "Finanças",
	"Upgrade quality level" : "Fazer upgrade",
	"Buy raw materials" : "Compra matéria-prima",
	"Donate raw materials" : "Doar matéria-prima",
	"Quality level" : "Nível de Qualidade",
	"Your accounts" : "Contas pessoais",
	"Company accounts" : "Contas da empresa",
	"Enter a price between 1 - 5000 Gold" : "Definir um preço entre 1 e 5000 Gold",
	"Remove offer" : "Remover oferta",
	"Sell company" : "Vender empresa",
	"Edit details" : "Editar detalhes",
	"Edit company details" : "Editar detalhes da companhia",
	"Company account" : "Conta da empresa",
	"Company name" : "Nome da empresa",
	"Company logo" : "Logotipo",
	"Disscusion area" : "Link externo",
	



// market
	"Quality Level" : "Qualidade",
	"All levels" : "Todas as Qualidades",
	"Level 1" : "Qualidade 1",
	"Level 2" : "Qualidade 2",
	"Level 3" : "Qualidade 3",
	"Level 4" : "Qualidade 4",
	"Level 5" : "Qualidade 5",

	"Provider" : "Produtor",
	"Quality" : "Qualidade",
	"Stock" : "Stoque",
	"Buy" : "Comprar",
	"Market" : "Mercado",

	"Market offers" : "Ofertas no mercado",
	"Amount" : "Quantidade",
	"Price" : "Preço",
	"Next" : "Próximo",
	"Prev" : "Anterior",
	"No products in this market" : "Não tem produtos disponíveis",
	"Go to marketplace" : "Ir ao Mercado",
	"Jobs available in this company" : "Empregos disponíveis aqui",
	"You don't have any active job offers" : "Não tem nenhuma oferta de emprego",
	"You didn't specify the amount of products you wish to buy" : "Especifique quantos produtos irá comprar",
	"You cannot trade with this country as you are at war with it" :"Não pode vender nesse mercado porque está em guerra com ele",

// region
	"Citizens" : "Cidadãos",
	"Country - Society" : "País - Sociedade",
	"Heal" : "Curar",
	"Constructions": "Construções",
	"Population": "População",
	"Productivity" : "Produtividade",
	"Resistance War" : "Guerra de resistência",
	"Resistance War Active" : "Guerras de resistência ativas",
	"You can't start a resistance war in this region because it already belongs to its original owner country" : "Não pode começar uma Guerra de 

resistância porque a região pertence ao dono original",
	"Medium" : "Médio",
	"High": "Alto",
	"Neighbors" : "Vizinhos",
// marketplace
	"Please select an Industry to see the marketplace offers" : "Selecione uma indústria para ver as ofertas",
	"Skill Level" : "Nível de habilidade",
	"All skills" : "Todos os níveis",
	"All" : "Tudo",

	"Create new company" : "Criar nova empresa",

//mercado de emprego

	"Industry" : "Indústria",
	"Minimum skill" : "Habilidade mínima",
	"Daily salary" : "Salário (sem taxas)",
	"Apply" : "Aplicar",


//BUG___________________________________________________________________________________________________
//monetary market
//	"Rec exchange rate " : "Taxa recomendada ",
//	"Exchange rate" : "Taxa",
//	"Amount to buy" : "Quantia a comprar",
//	"Show my offers" : "Minhas ofertas",
//	"Post new offer" : "Nova oferta",
//BUG: o swap currencies do plus pode n aparecer. para resolver basta alterar as moedas uma vez à mão.
//o erro é mais grave. Ã s vezes não funciona o plus, outras este, e outras nenhum deles. decidi por não traduzir
//A tradução pode ser ativada apagando as duas barras (//) do inicio nas frases de tradução
//__________________________________________________________________________________________________________

// politics
	"Country Administration" : "Administração do País",
	"Accepted" : "Aceite",
	"Rejected" : "Rejeitado",
	"Pending" : "Em curso",
	"Congress" : "Congresso",
	"Issue Money" : "Emitir dinheiro",
	"Law proposals" : "Propostas de lei",
	"Minimum Wage" : "Salário Mínimo",
	"Mutual Protection Pact" : "Aliança",
	"Peace Proposal" : "Proposta de paz",
	"President" : "Presidente",
	"Yes" : "Sim",
	"No" : "Não",
	"Show all law proposals" : "Mostrar  todas as propostas",
	"The law voting process takes 24 hours." : "O processo de votação demora 24 horas.",
	"Only congress members and country presidents have the right to vote." : "Apenas os Congressistas e o Presidente podem votar.",
	"You are not a president or a congress member in this country." : "Não é Congressista nem Presidente deste país",
	"Citizen fee" : "Dinherio inicial",
// wars
	"no allies" : "sem aliados",
	"All wars" : "Todas as guerras",
	"All resistance wars" : "Todas as guerras de resistência",
	"All Alliances" : "Todas as alianças",
	"Alliances" : "Aliança",
	"Military force" : "Força Militar",
	"Average strength" : "Força média",
	"War > Battlefield" : "Guerra > Campo de batalha",
	"Basic damage" : "Dano básico",
	"Weapon quality" : "Qualidade da arma",
	"Wellness" : "Energia",
	"Rank" : "Rank",
	"Total damage" : "Dano total",
	
// army
	"You have trained today. You can train again tomorrow." : "Já treinou hoje. Pode treinar amanhã oura vez.",
	"Force" : "Força",
	"Military rank" : "Rank militar",
	"Military achievements" : "Conquistas militares",
	"Active wars list" : "Guerras ativas",
	"Sergeant" : "Sargento",
	"Corporal" : "Cabo",
	"Private" : "Soldado",
//todos os ranks
	"Corporal" : "Cabo",
	"Private" : "Soldado"
	"Lieutenant" : "Tenente",
	"Captain" : "Capitão",
	"Colonel" : "Coronel",
	"General" : "General"
	"Field Marshall" : "Marechal",
//fim de ranks
	"Show active wars" : "Mostrar guerras ativas",
	"Start a Resistance War" : "Iniciar uma guerra de resistência",
	"You do not have the necessary amount of Gold to start a resistance war." : "Não tem Gold suficiente para começar uma guerra de resistência",
	"You cannot join this fight because your country is not involved in the war" : "Não pode entrar na batalha porque o seu país não está envolvido na 

guerra",
	"There are no resistance wars in this country." : "Não tem guerra de resistência neste país.",
	"until the region can be occupied or secured" : "até a região ser ocupada ou conquistada",
	"Attackable on President's decision" : "Região atacável a ordem do presidente",
	"Defense Points" : "Pontos de Defesa",
	"Go to Battlefield" : "Ir para o campo de batalha",
	"see finished battles" : "Ver batalhas acabadas",
	"Wars list" : "Lista de guerras",
	"War" : "Guerra",
	"Battle history" : "Histórico da batalha",
	"Fight" : "Luta!",
	"Hero" : "Herói",
	"Started by" : "Iniciada por ",
	"started by" : "iniciada por ",
	"Fight for resistance" : "Luta pela Resistência",
	"Fight for defenders" : "Luta pela defesa",
// party
	"Get more" : "Obtem mais",
	"Country presidency" : "Presidente do país",
	"Winner" : "Vencedor",
	"Next election in" : "Próximas eleições em",
	"Next elections in" : "Próximas eleições em",
	"No candidate proposed" : "Nenhum candidato proposto.",
	"candidates" : "candidatos",
	"Candidate" : "Candidato",
	"Supporting parties" : "Partidos apoiadores",
	"No. of votes" : "Número de votos",
	"% of votes" : "% de votos",
	"days" : "dias",
	"GOLD" : "Ouro",
	"Show results" : "Mostrar resultados",
	"Show candidate list" : "Mostra candidatos",
	"Show candidates list" : "Mostrar candidatos",
	"You are not a member of a party" : "Não é membro de um partido",

	"You can join a party from it's presentation page or you can create your own party if you cannot find the right one for you. Being a member of a party 

could give you the chance to become a Congress Member or even the President." : "Pode entra em um partido na sua página de apresentação ou criar um novo. 

Ser membro de um partido permitea você ser seu presidente, membro do Congresso ou mesmo Presidente do País (Nota: pensa bem antes de cria um partido).",


	"Join a party" : "Entrar em um partido",
	"Create new" : "Criar novo",
	"congress members" : "membros do Congresso",
	"of Congress" : "do Congresso",
	"Show proposed members of congress" : "Mostrar candidatos ao Congresso",
	"Show proposed members" : "Ver proposta dos membros",
	" of congress" : " para o Congresso",
	"congress member" : " congressista",
	"Run for congress" : "Candidatar ao Congresso",
	"Join" : "Associar-se",
	"See all members" : "Ver todos os membros",
	"Donate Gold" : "Doar Ouro",
	"Members"  : "Membros",
	"Orientation" : "Orientação",
	"Show all members" : "Mostrar todos membros",

	"Center" : "Centro",
	"Center-right, Libertarian" : "Centro-Direita, Liberal",
	"Far-right, Totalitarian" : "Estrema Direita, Totalitário",
	"Center-left, Anarchist" : "Centro-Esquerda, Anarquista",
	"Center-right, Authoritar" : "Centro-Direita, Autoritário",
	"Far-right, Totalitarian" : "Extrema Direita, Totalitário",

	"Anarchist" : "Anárquico",
	"Accounts" : "Finanças",
	"Elections" : "Eleições",
	"Election results" : "Resultados das eleições",
	"Next elections" : "Próximas eleições",

	"Country Presidency" : "Presidência do país",
	"Party presidency" : "Presidência do partido",
	"Party President" : "Presidente do partido",
	"See results" : "Ver resultados",
	"Expires tomorrow" : "Expira amanhã",

	"Join party" : "Entrar",

// articles
	"Report abuse" : "Reportar abuso",
	"today" : "hoje",
	"yesterday" : "ontém",
	"one hour ago" : "uma hora atrás",
	"Unsubscribe" : "Cancelar assinatura",
	"Subscribe" : "Assinar",
	"Article RSS" : "RSS dos artigos",
	"Your comment" : "Seu comentário",
	"View all comments" : "Ver todos os comentários",
	"Subscribe to comments" : "Inscrever-se aos comentários",
	"Unsubscribe to comments" : "Cancelar aos comentários",
	"Post a comment" : "Comentar",

// news
	"You do not have a newspaper" : "Não tem um jornal",
	"A newspaper is an efficient way to communicate your news to the eRepublik world. Read more on the eRepublik Wiki. Create your own newspaper." 

: "Um jornal é uma forma eficiente de comunicar com o Mundo do eRepublik. Leia mais na wiki. Crie o seu próprio jornal",
// profiles
	"Friends" : "Amigos",
	"Fights" : "Lutas",
	"National Rank" : "Ranking nacional",
	"Forfeit Points" : "Pontos de penalização",
	"Forfeit Points:" : "Pontos de penalização",
	"ShareThis" : "Partilhar isto",
	"Shout something:" : "Diz qualquer coisa...",
	"Assets" : "Bens",
	"Press director" : "Director de jornal",
	"Inventory" : "Inventário",
	"Get Gold" : "Comprar Gold",
	"Career" : "Carreira",
	"Bio" : "Bio",
	"Employee" : "Empregado",
	"No political activity" : "Sem atividades políticas",
	"Wellness" : "Energia",
	"Level" : "Nível",
	"Strength" : "Força",
	"Experience" : "Experiência",
	"Skills:" : "Habilidades",
	"Land" : "Maté Prima",
	"Manufacturing" : "Manufactura",
	"Erepublik Age" : "Idade",
	"Get Extra Storage" : "Compra mais espaço",
	"Party Member" : "Membro de partido",
	"No activity" : "Sem atividade",
	"Total damage:" : "Dano total:",
	"Hard Worker" : "Super Trabalhador",
	"Work for 30 days in a row" : "Trabalhar 30 dias seguidos",
	"Congress Member" : "Congressista",
	"Country President" : "Presidente do país",
	"Win the Presidential elections" : "Venceu as eleições presidenciais",
	"Media Mogul" : "Jornalista de carreira",
	"Reach 1000 subscribers to your newspaper" : "Atinge as 1000 assinaturas",
	"Battle Hero" : "Herói de Guerra",
	"Reach the highest total damage in one battle" : "Fez o maior dano total numa batalha",
	"Resistance Hero" : "Herói de Resistência",
	"Start a resistance war and liberate that region" : "Inicia uma guerra de resistência e liberta a região",
	"Super Soldier" : "Super Soldado",
	"Advanced 5 strength levels" : "Avançou 5 níveis de força",
	"Society Builder" : "Construtor da Sociedade",
	"Invite 10 people to eRepublik and help them reach level 6" : "Convida 10 pessoas e ajudou-as a atingir o nível 6",
	"Check your unlocked features" : "Verifica as funcionalidades desbloqueadas",
	"Achievements" : "Conquistas",
	"Edit profile" : "Editar Perfil",
	"Edit Profile" : "Editar Perfil",
	"Change residence" : "Mudar Residência",
	"Donations list" : "Lista de doações",
	
	"Your email here" : "Seu e-mail",
	"Your birthday" : "Sua data de nascimento",
	"Citizen Avatar" : "Seu avatar",
	"Change password" : "Mudar password",


	"Worked 30 days in a row" : "Trabalhou 30 dias seguidos",
	"Won the Congress elections": "Ganhou as eleições para o Congresso",

	"Please choose a country you want to live in." : "Escolhe o país para onde deseja mudar.",
	"Please choose the region you want to live in" : "Escolhe a região para onde deseja ir",
	


// fight
	"Back to battlefield" : "Voltar à batalha",
	"Fight Again" : "Lutar de novo!",
	"Fight bonus" : "Bônus de luta",
// organizations
	"In order to log in as an organization you have to log out from your citizen account and log in again with your organization username and password." 

: "Para efectuar login com a organização tem que sair da conta do ecidadão e usar a senha e nome da organização.",
	"My Organizations" : "As minhas Organizações",
	"Logout" : "Logout",
	"Organizations created by you:" : "Organizações criadas por você:",
	"You have not created any organization yet." : "Ainda não tem organizações.",
// career-path
	"General manager" : "Diretor de empresa",
	"Hard worker" : "Super trabalhador",
// ranking
	"No." : "Posição",
	"Hard worker" : "Super trabalhador",
// messages
        "Inbox" : "Caixa de entrada",
	"Sent" : "Enviadas",
	"Alerts" : "Alertas!",
	"Subscriptions" : "Assinaturas",
	"new article" : "novo artigo",
	"Write article" : "Novo artigo",
	"Edit newspaper details" : "Modificar detalhes do jornal",
	"Edit" : "Editar",
	"Delete" : "Apagar",
	"Read Message" : "Ler mensagem",
	"Reply" : "Responder",
	"From" : "De",
	"Back" : "Voltar",
	"Picture" : "Imagem",
	"only JPG files allowed" : "Apenas imagens JPG",
	"Publish" : "Publicar",
	"1-80 characters max" : "1 a 80 caracteres",
	"Title" : "Título",
	"Article" : "Artigo",
// flash menu
	"My places > Army" : "Exercito",
	"My places > Newspaper" : "Jornal",
	"My places > Organizations" : "Organizações",

// menu	
	"Find out more" : "Descobre mais",
	"logout" : "Sair",


//alertas
	



//meus
	"Top rated" : "Top mais",
	"News" : "Notícias",
	"Home" : "Início",
	"Current location" : "Localização atual",
	"New location:" : "Nova localização",
	"You do not own a moving ticket. You can buy moving tickets from the marketplace." : "Não tem um bilhete de avião. Podes comprar um no 

mercado.",
	"Name" : "Nome",
	"Country" : "País",
	" ago"	: "atrás",
//	"This country can trade with any other country in eRepublik." : "Este pais pode efetuar trocas comerciais com qualquer outro pais no eRepublik",
	"Income Tax" :"IRC",
	"Import Tax" : "Imposto de Import",
	"VAT" : "IVA",
	"Unemployed" : "Desempregado",
	"eRepublik Birthday" : "Data de eNascimento",
	"Skills" : "Habilidades",
	"All donations" : "Todas as doações",
	"Email must be valid for registration, so do not cheat" : "O endereço de e-mail será verificado",

	"Companies" : "Empresas",
	"Newspapers" : "Jornais",
	"Parties" : "Partidos",

	"You will receive 5 Gold for each citizen invited by you that reaches level 6." : "Receberá 5 Ouro quando os cidadãos que convidou chegarem ao nível 

5.",
	"Your name:" : "O seu nome:",
	"Your friend's email:" : "Os emails dos seus amigos:",
	"Use commas to separate multiple email addresses" : "Usa vírgulas para separar os endereços de email",
	"Add from adress Book" : "Da lista de contactos",

	"Latest news" : "Últimas notícias",

	"Top rated news" : "Mais votadas",
	" Top rated news" : "Mais votadas",



	

};

trim = function (str) {
    return str!==null ? str.replace(/^\s*/, "").replace(/\s*$/, "") : null;
};

var regexps = {};
regexps["^(\\d*) allies(\\s*)$"] = "$1 aliados\\i";
regexps["^Active wars in (.*)$"] = "Guerras activas em $1";
regexps["^Active resistance wars in (.*)$"] = "Guerras de resistência em $1";
regexps["^Tax change:(.*)$"] = "Mudar impostos para $1";

regexps["(\\s*)Expires in (\\d*) days"] = "Acaba em $2 dias";
regexps["^(\\d*) comments$"] = "$1 comentários";
regexps["^(\\d*) hours ago$"] = "$1 horas atrás";
regexps["^(\\d*) minutes ago$"] = "$1 minutos atrás";
regexps["^(\\d*) days ago$"] = "$1 dias atrás";
regexps["^Regions \\((\\d*)\\)"] = "Regiões ($1)";
regexps["^Friends \\((\\d*)\\)"] = "Amigos ($1)";
regexps["^(\\d*) months"] = "$1 meses";
regexps["^Comments(.*)"] = "Comentários $1";


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
