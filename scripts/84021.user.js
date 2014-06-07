// ==UserScript==
// @name        Almogàvers/Khan Wars user script
// @author      carlesmu
// @license     Public Domain
// @uso:script  84021
// @uso:version 0.1.3
// @version     0.1.3
// @description Khanwars user script based in the Utopia Kingdoms/Khan Wars Interface Tools user script.
// @include     http*://*utopiakingdoms.com*
// @include     http*://*khanwars.com*
// @include     http*://*guerrakhan.com*
// @include     http*://*lesseigneurs.fr*
// @include     http*://*khanwars.com.pt*
// @include     http*://*khanwars.es*
// @include     http*://*khanwars.cl*
// @include     http*://*deche.vn*
// @include     http*://*khanwars.ro*
// @include     http*://*khanwars.pl*
// @include     http*://*hansavaslari.com*
// @include     http*://*khanwars.it*
// @include     http*://*zarenkriege.de*
// @include     http*://*hanovete.com*
// @include     http*://*khanratnik.com*
// @include     http*://*draugas.lt*
// @include     http*://*khanwars.nl*
// @include     http*://*khanwars.no*
// @include     http*://*khanwars.se*
// @include     http*://*pravyteli.com*
// @include     http*://*khanwars.hu*
// @include     http*://*khanwars.ae*
// @include     http*://*khanwars.jp*
// @include     http*://*khanwars.ir*
// @include     http*://*lordwars.co.il*
// ==/UserScript==

// internationalisation

// the Words object is the UK version of the game text; it is used as the key
// to the translation dictionary -- therefore do not edit it
var Words = {
//// the following items must appear *exactly* as they do in-game; copy-paste
//// is the safest way to go
  // units
  "Pikeman": "Pikeman",
  "Swordsman": "Swordsman",
  "Axeman": "Axeman",
  "Maceman": "Maceman",
  "Ogre": "Ogre",
  "Berserker": "Berserker",
  "Golem": "Golem",
  "Rogue": "Rogue",
  "Quickwalker": "Quickwalker",
  "Light Cavalry": "Light Cavalry",
  "Heavy Cavalry": "Heavy Cavalry",
  "Warmage": "Warmage",
  "Arcanist": "Arcanist",
  "Fireslinger": "Fireslinger",
  "Stormcaller": "Stormcaller",
  "Shortbowman": "Shortbowman",
  "Longbowman": "Longbowman",
  "Crossbowman": "Crossbowman",
  "Cavalry Archer": "Cavalry Archer",
  "Nobleman": "Nobleman",
  "High Priest": "High Priest",
  "Airweaver": "Airweaver",
  "Elf Lord": "Elf Lord",
  "Warlord": "Warlord",
  "Grand Magus": "Grand Magus",
  "Unit 26": "Unit 26",
  "Unit 27": "Unit 27",
  // buildings
  "Gold Mine": "Gold Mine",
  "Iron Mine": "Iron Mine",
  "Lumber Mill": "Lumber Mill",
  "Farm": "Farm",
  "Homes": "Homes",
  "Barracks": "Barracks",
  "Stables": "Stables",
  "Guild": "Guild",
  "Market": "Market",
  "Training Grounds": "Training Grounds",
  "Hospital": "Hospital",
  "Wall": "Wall",
  "Order": "Order",
  "Guard Station": "Guard Station",
  "Store House": "Store House",
  // resources
  "Gold": "Gold",
  "Iron": "Iron",
  "Wood": "Wood",
  "Food": "Food",
  "People": "People", // the exact word found in the alert() code in pohod.php
  // hero skills
  "Warrior": "Warrior",
  "Cavalryman": "Cavalryman",
  "Defender": "Defender",
  "Archer": "Archer",
  "Scout": "Scout",
  "Merchant": "Merchant",
  "Mystic": "Mystic",
  // Clan Interface (viewsauz.php)
  "Clan information": "Clan information",
  "Clan politics": "Clan politics",
  "Clan members": "Clan members",

//// the rest of these are the way the script interfaces with the user
//// any meaningful translation will do

  // abbreviations for days of the week; can be blank strings if none desired
  "Mo": "Mo",
  "Tu": "Tu",
  "We": "We",
  "Th": "Th",
  "Fr": "Fr",
  "Sa": "Sa",
  "Su": "Su",
  // script interface--might include HTML markup
  "Convert Res": "Convert Res",
  "Send Res": "Send Res",
  "Overview": "Overview",
  "Clan Forum": "Clan Forum",
  "Clan Admin": "Clan Admin",
  "VIP Search": "VIP Search",
  "Release Troops": "Release Troops",
  "Server": "Server",
  "One-Way": "One-Way",
  "<i>Estimated</i> Server Arrival": "<i>Estimated</i> Server Arrival",
  "Total Res": "Total Res",
  "Max Merchant": "Max Merchant",
  "Extra": "Extra",
  "Warning: not enough troops to paste all.": "Warning: not enough troops to paste all.",
  "Default attack formation not found.": "Default attack formation not found.",
  "Quick Roads": "Quick Roads",
  "Copy Skills": "Copy Skills",
  "Saved": "Saved",
  "Options": "Options",
  "Minimum Heal": "Minimum Heal",
  "Minimum Scavenge": "Minimum Scavenge",
  "Steal Fraction": "Steal Fraction",
  "World Speed": "World Speed",
  "ClanID": "ClanID",
  "Server Offset, Minutes": "Server Offset, Minutes",
  "Maximum X": "Maximum X",
  "Maximum Y": "Maximum Y",
  "Default Attack Formation": "Default Attack Formation",
  "Delete ALL Data (Map Too)": "Delete ALL Data (Map Too)",
  "For world": "For world",
  "Really! (This could take a long time.)": "Really! (This could take a long time.)",
  "Paste Formation": "Paste Formation",
  // troop selection tools
  "All": "All",
  "None": "None",
  "Single Infantry": "Single Infantry",
  "Paste": "Paste",
  "Invert": "Invert",
  "Formation": "Formation",
  "Default": "Default",
  // shortcut for speed-modified marches: attack, spy, scavenge, transfer
  "A": "A",
  "S": "S",
  "$": "$",
  "T": "T",
  // additional march counters
  "Speed": "Speed",
  "Damage": "Damage",
  "Mystics": "Mystics",
  "Encumbrance": "Encumbrance",
  "Non-Mystics": "Non-Mystics",
  "Castles": "Castles",
  "Effective Speed": "Effective Speed",
  "Server Arrival": "Server Arrival",
  "Server Return": "Server Return",
  "Local Arrival": "Local Arrival",
  "Local Return": "Local Return",
  "Timing (no coins)": "Timing (no coins)",
  "Cancel": "Cancel",
  "Could not find that march type.": "Could not find that march type.",
  "Cannot transfer.": "Cannot transfer.",
  // abbreviations for light cavalry, cavalry archer
  "LC": "LC",
  "CA": "CA",
  // merchant management
  "Save": "Save",
  "Delete": "Delete",
  "Top Up": "Top Up",
  "Distribute Evenly": "Distribute Evenly",
  "Reset": "Reset",
  "Room Left": "Room Left",
  "Profit Ratio": "Profit Ratio",
  "Source": "Source",
  // battle reports
  "Non-Junk (Res)": "Non-Junk (Res)",
  "Total Attacker Loss (Res/Pop)": "Total Attacker Loss (Res/Pop)",
  "Total Defender Loss (Res/Pop)": "Total Defender Loss (Res/Pop)",
  "Estimated Total Scavenge": "Estimated Total Scavenge",
  "Survivor Capacity": "Survivor Capacity",
  "Copy Formation": "Copy Formation",
  "Copy Army": "Copy Army",
  "Total Pop": "Total Pop",
  // battle report show stats inline
  "Inf": "Inf", // damage vs. infantry
  "Cav": "Cav", // damage vs. cavalry
  "Arch": "Arch", // damage vs. archers
  "Myst": "Myst", // damage vs. mystics
  "Atk+": "Atk+", // unit attack upgrades
  "Def+": "Def+", // unit defense upgrades
  "Life": "Life", // unit life
  "Lost Resources": "Lost Resources",
  "Lost Pop": "Lost Pop",
  "Lost Life": "Lost Life",
  "Estimated Scavenge": "Estimated Scavenge",
  // sim
  "Min Unit": "Min Unit",
  "Paste Unit": "Paste Unit",
  "Add Unit": "Add Unit",
  "Max Upgrade": "Max Upgrade",
  "Paste Skill": "Paste Skill",
  "Max Skill": "Max Skill",
  // unit training
  "Total Resources to Train": "Total Resources to Train",
  "Total Time to Train": "Total Time to Train",
  "Total Cancel": "Total Cancel",
  // map interface
  "Fastest": "Fastest",
  "Slowest": "Slowest",
  "Player": "Player",
  "Level": "Level",
  "Castle": "Castle",
  "Capital": "Capital",
  "Clan": "Clan",
  "Last Activity (Days)": "Last Activity (Days)",
  "Last ms": "Last ms", // last known activity, JS time format
  "Data Grabbed (Days)": "Data Grabbed (Days)",
  "Grabbed ms": "Grabbed ms", // data grabbed, JS time format
  "Generate Map Report": "Generate Map Report",
  // spy reports
  "Message Age": "Message Age",
  "Copy": "Copy",
  "Delete Page": "Delete Page",
  "Scavenge": "Scavenge", // i.e., clean-up
  // Clan links
  "information": "information",
  "politics": "politics",
  "members": "members",
}

var Translation = [];
Translation["EN"] = {
//// the following items must appear *exactly* as they do in-game; copy-paste
//// is the safest way to go
  // units
  "Pikeman": "Pikeman",
  "Swordsman": "Swordsman",
  "Axeman": "Axeman",
  "Maceman": "Maceman",
  "Ogre": "Battle-Axeman",
  "Berserker": "Teutonic knight",
  "Golem": "Huskarle",
  "Rogue": "Mujahideen",
  "Quickwalker": "Quickwalker",
  "Light Cavalry": "Light cavalry",
  "Heavy Cavalry": "Heavy cavalry",
  "Warmage": "Ram",
  "Arcanist": "Ballistician",
  "Fireslinger": "Catapult",
  "Stormcaller": "Trebuchet",
  "Shortbowman": "Shortbow archer",
  "Longbowman": "Longbow archer",
  "Crossbowman": "Crossbow archer",
  "Cavalry Archer": "Archer cavalry",
  "Nobleman": "Nobleman",
  "High Priest": "Tangra priest",
  "Airweaver": "Monk",
  "Elf Lord": "Drummer",
  "Warlord": "Warlord",
  "Grand Magus": "Siege tower",
  "Unit 26": "Samurai",
  "Unit 27": "KhanGuard",
  // buildings
  "Gold Mine": "Gold mine",
  "Iron Mine": "Iron mine",
  "Lumber Mill": "Lumberjacks",
  "Farm": "Farms",
  "Homes": "Dwellings",
  "Barracks": "Barracks",
  "Stables": "Stables",
  "Guild": "Workshop",
  "Market": "Marketplace",
  "Training Grounds": "Blacksmith",
  "Hospital": "Infirmary",
  "Wall": "Wall",
  "Order": "Order",
  "Guard Station": "Shelter",
  "Store House": "Storages",
  // resources
  "Gold": "Gold",
  "Iron": "Iron",
  "Wood": "Wood",
  "Food": "Food",
  "People": "People", // the exact word found in the alert() code in pohod.php
  // hero skills
  "Warrior": "Warrior",
  "Cavalryman": "Cavalryman",
  "Defender": "Defender",
  "Archer": "Archer",
  "Scout": "Scout",
  "Merchant": "Finance",
  "Mystic": "Siege",
  // Clan Interface (viewsauz.php)
  "Clan information": "Clan information",
  "Clan politics": "Clan politics",
  "Clan members": "Clan members",

//// the rest of these are the way the script interfaces with the user
//// any meaningful translation will do

  // abbreviations for days of the week; can be blank strings if none desired
  "Mo": "Mo",
  "Tu": "Tu",
  "We": "We",
  "Th": "Th",
  "Fr": "Fr",
  "Sa": "Sa",
  "Su": "Su",
  // script interface--might include HTML markup
  "Convert Res": "Convert Res",
  "Send Res": "Send Res",
  "Overview": "Overview",
  "Clan Forum": "Clan Forum",
  "Clan Admin": "Clan Admin",
  "VIP Search": "VIP Search",
  "Release Troops": "Release Troops",
  "Server": "Server",
  "One-Way": "One-Way",
  "<i>Estimated</i> Server Arrival": "<i>Estimated</i> Server Arrival",
  "Total Res": "Total Res",
  "Max Merchant": "Max Merchant",
  "Extra": "Extra",
  "Warning: not enough troops to paste all.": "Warning: not enough troops to paste all.",
  "Default attack formation not found.": "Default attack formation not found.",
  "Quick Roads": "Quick Roads",
  "Copy Skills": "Copy Skills",
  "Saved": "Saved",
  "Options": "Options",
  "Minimum Heal": "Minimum Heal",
  "Minimum Scavenge": "Minimum Scavenge",
  "Steal Fraction": "Steal Fraction",
  "World Speed": "World Speed",
  "ClanID": "ClanID",
  "Server Offset, Minutes": "Server Offset, Minutes",
  "Maximum X": "Maximum X",
  "Maximum Y": "Maximum Y",
  "Default Attack Formation": "Default Attack Formation",
  "Delete ALL Data (Map Too)": "Delete ALL Data (Map Too)",
  "For world": "For world",
  "Really! (This could take a long time.)": "Really! (This could take a long time.)",
  "Paste Formation": "Paste Formation",
  // troop selection tools
  "All": "All",
  "None": "None",
  "Single Infantry": "Single Infantry",
  "Paste": "Paste",
  "Invert": "Invert",
  "Formation": "Formation",
  "Default": "Default",
  // shortcut for speed-modified marches: attack, spy, scavenge, transfer
  "A": "A",
  "S": "S",
  "$": "$",
  "T": "T",
  // additional march counters
  "Speed": "Speed",
  "Damage": "Damage",
  "Mystics": "Siege",
  "Encumbrance": "Encumbrance",
  "Non-Mystics": "Non-Siege",
  "Castles": "Castles",
  "Effective Speed": "Effective Speed",
  "Server Arrival": "Server Arrival",
  "Server Return": "Server Return",
  "Local Arrival": "Local Arrival",
  "Local Return": "Local Return",
  "Timing (no coins)": "Timing (no coins)",
  "Cancel": "Cancel",
  "Could not find that march type.": "Could not find that march type.",
  "Cannot transfer.": "Cannot transfer.",
  // abbreviations for light cavalry, cavalry archer
  "LC": "LC",
  "CA": "CA",
  // merchant management
  "Save": "Save",
  "Delete": "Delete",
  "Top Up": "Top Up",
  "Distribute Evenly": "Distribute Evenly",
  "Reset": "Reset",
  "Room Left": "Room Left",
  "Profit Ratio": "Profit Ratio",
  "Source": "Source",
  // battle reports
  "Non-Junk (Res)": "Non-Junk (Res)",
  "Total Attacker Loss (Res/Pop)": "Total Attacker Loss (Res/Pop)",
  "Total Defender Loss (Res/Pop)": "Total Defender Loss (Res/Pop)",
  "Estimated Total Scavenge": "Estimated Total Scavenge",
  "Survivor Capacity": "Survivor Capacity",
  "Copy Formation": "Copy Formation",
  "Copy Army": "Copy Army",
  "Total Pop": "Total Pop",
  // battle report show stats inline
  "Inf": "Inf", // damage vs. infantry
  "Cav": "Cav", // damage vs. cavalry
  "Arch": "Arch", // damage vs. archers
  "Myst": "Sg", // damage vs. mystics
  "Atk+": "Atk+", // unit attack upgrades
  "Def+": "Def+", // unit defense upgrades
  "Life": "Life", // unit life
  "Lost Resources": "Lost Resources",
  "Lost Pop": "Lost Pop",
  "Lost Life": "Lost Life",
  "Estimated Scavenge": "Estimated Scavenge",
  // sim
  "Min Unit": "Min Unit",
  "Paste Unit": "Paste Unit",
  "Add Unit": "Add Unit",
  "Max Upgrade": "Max Upgrade",
  "Paste Skill": "Paste Skill",
  "Max Skill": "Max Skill",
  // unit training
  "Total Resources to Train": "Total Resources to Train",
  "Total Time to Train": "Total Time to Train",
  "Total Cancel": "Total Cancel",
  // map interface
  "Fastest": "Fastest",
  "Slowest": "Slowest",
  "Player": "Player",
  "Level": "Level",
  "Castle": "Castle",
  "Capital": "Capital",
  "Clan": "Clan",
  "Last Activity (Days)": "Last Activity (Days)",
  "Last ms": "Last ms", // last known activity, JS time format
  "Data Grabbed (Days)": "Data Grabbed (Days)",
  "Grabbed ms": "Grabbed ms", // data grabbed, JS time format
  "Generate Map Report": "Generate Map Report",
  // spy reports
  "Message Age": "Message Age",
  "Copy": "Copy",
  "Delete Page": "Delete Page",
  "Scavenge": "Scavenge", // i.e., clean-up
  // Clan links
  "information": "information",
  "politics": "politics",
  "members": "members",
}

Translation["PT"] = {
//// the following items must appear *exactly* as they do in-game; copy-paste
//// is the safest way to go
  // units
  "Pikeman": "Lanceiro",
  "Swordsman": "Espadachim",
  "Axeman": "Guerreiro",
  "Maceman": "Gladiador",
  "Ogre": "Bárbaro",
  "Berserker": "Cavaleiro Teoutonic",
  "Golem": "Legionário",
  "Rogue": "Janissary",
  "Quickwalker": "Batedor",
  "Light Cavalry": "Cavalaria Leve",
  "Heavy Cavalry": "Cavalaria Pesada",
  "Warmage": "Aríete",
  "Arcanist": "Balísta",
  "Fireslinger": "Catapulta",
  "Stormcaller": "Trabuco",
  "Shortbowman": "Arqueiro de Arco Curto",
  "Longbowman": "Arqueiro de Arco Longo",
  "Crossbowman": "Arqueiro com Besta",
  "Cavalry Archer": "Cavalaria Arqueira",
  "Nobleman": "Nobre",
  "High Priest": "Padre",
  "Airweaver": "Monge",
  "Elf Lord": "Bateria",
  "Warlord": "Senhor da Guerra",
  "Grand Magus": "Torre de Artilharia",
  "Unit 26": "Samurai",
  "Unit 27": "KhanGuard",
  // buildings
  "Gold Mine": "Mina de Ouro",
  "Iron Mine": "Mina de Ferro",
  "Lumber Mill": "Serração",
  "Farm": "Fazendas",
  "Homes": "Habitações",
  "Barracks": "Quartel",
  "Stables": "Estábulos",
  "Guild": "Oficina",
  "Market": "Mercado",
  "Training Grounds": "Ferreiro",
  "Hospital": "Enfermaria",
  "Wall": "Muralha",
  "Order": "Academia",
  "Guard Station": "Esconderijo",
  "Store House": "Armazéns",
  // resources
  "Gold": "Ouro",
  "Iron": "Ferro",
  "Wood": "Madeira",
  "Food": "Comida",
  "People": "População", // the exact word found in the alert() code in pohod.php
  // hero skills
  "Warrior": "Soldado",
  "Cavalryman": "Cavaleiro",
  "Defender": "Defensor",
  "Archer": "Arqueiro",
  "Scout": "Batedor",
  "Merchant": "Finanças",
  "Mystic": "Artilharia",

//// the rest of these are the way the script interfaces with the user
//// any meaningful translation will do

  // abbreviations for days of the week; can be blank strings if none desired
  "Mo": "Segunda",
  "Tu": "Terça",
  "We": "Quarta",
  "Th": "Quinta",
  "Fr": "Sexta",
  "Sa": "Sábado",
  "Su": "Domingo",
  // script interface--might include HTML markup
  "Convert Res": "Mercado Interno",
  "Send Res": "Enviar Recursos",
  "Overview": "Informações Gerais",
  "Clan Forum": "Fórum do Clã",
  "Clan Admin": "Administração do Clã",
  "VIP Search": "Pesquisa Avançada",
  "Release Troops": "Libertar Tropas",
  "Server": "Servidor",
  "One-Way": "Um Sentido",
  "<i>Estimated</i> Server Arrival": "Estimativa Chegada Servidor",
  "Total Res": "Total de Recursos",
  "Max Merchant": "Máximo Transportável",
  "Extra": "Extra",
  "Warning: not enough troops to paste all.": "Aviso: tropas insuficientes para colar.",
  "Default attack formation not found.": "Formação de ataque Padrão não encontrada.",
  "Quick Roads": "Caminhos rápidos",
  "Copy Skills": "Copiar Habilidades",
  "Saved": "Mensagens Salvas",
  "Options": "Opções",
  "Minimum Heal": "Cura Mínima",
  "Minimum Scavenge": "Limpeza Mínima",
  "Steal Fraction": "Fracção a roubar",
  "World Speed": "Velocidade do Mundo",
  "ClanID": "ID do Clã",
  "Server Offset, Minutes": "Offset do Servidor, Minutos",
  "Maximum X": "Máximo X",
  "Maximum Y": "Máximo Y",
  "Default Attack Formation": "Formação de Ataque Padrão",
  "Delete ALL Data (Map Too)": "Apagar TODOS Dados (incl. Mapa)",
  "For world": "Do mundo",
  "Really! (This could take a long time.)": "De Certeza! (Isto pode levar bastante tempo.)",
  "Paste Formation": "Colar Formação",
  // troop selection tools
  "All": "Tudo",
  "None": "Nada",
  "Single Infantry": "Uma unidade de infantaria",
  "Paste": "Colar",
  "Invert": "Inverter",
  "Formation": "Formação",
  "Default": "Padrão",
  // shortcut for speed-modified marches: attack, spy, scavenge, transfer
  "A": "A",
  "S": "S",
  "$": "L",
  "T": "T",
  // additional march counters
  "Speed": "Velocidade",
  "Damage": "Danos",
  "Mystics": "Artilharia",
  "Encumbrance": "Carga",
  "Non-Mystics": "Não-Artilharia",
  "Castles": "Castelos",
  "Effective Speed": "Velocidade Efectiva",
  "Server Arrival": "Chegada Servidor",
  "Server Return": "Retorno Servidor",
  "Local Arrival": "Chegada Local",
  "Local Return": "Retorno Local",
  "Timing (no coins)": "Tempo (sem moedas)",
  "Cancel": "Cancelar",
  "Could not find that march type.": "Tipo de marcha não encontrada.",
  "Cannot transfer.": "Impossivel transferir.",
  // abbreviations for light cavalry, cavalry archer
  "LC": "CL",
  "CA": "CA",
  // merchant management
  "Save": "Guardar",
  "Delete": "Apagar",
  "Top Up": "Tudo",
  "Distribute Evenly": "Distribuir",
  "Reset": "Limpar",
  "Room Left": "Espaço Restante",
  "Profit Ratio": "Lucro",
  "Source": "Destino",
  // battle reports
  "Non-Junk (Res)": "Sem Limpeza (Rec)",
  "Total Attacker Loss (Res/Pop)": "Perdas Totais do Atacante (Rec/Pop)",
  "Total Defender Loss (Res/Pop)": "Perdas Totais do Defensor (Rec/Pop)",
  "Estimated Total Scavenge": "Total de Limpeza Estimado",
  "Survivor Capacity": "Capacidade de Sobrevivência",
  "Copy Formation": "Copiar Formação",
  "Copy Army": "Copiar Exercito",
  "Total Pop": "Total Pop",
  // battle report show stats inline
  "Inf": "Inf", // damage vs. infantry
  "Cav": "Cav", // damage vs. cavalry
  "Arch": "Arq", // damage vs. archers
  "Myst": "Art", // damage vs. mystics
  "Atk+": "Ata+", // unit attack upgrades
  "Def+": "Def+", // unit defense upgrades
  "Life": "Vida", // unit life
  "Lost Resources": "Recursos Perdidos",
  "Lost Pop": "População Perdida",
  "Lost Life": "Vida Perdida",
  "Estimated Scavenge": "Limpeza Estimada",
  // sim
  "Min Unit": "Minimo Unidade",
  "Paste Unit": "Colar Unidade",
  "Add Unit": "Adicionar Unidade",
  "Max Upgrade": "Maximo Melhorias",
  "Paste Skill": "Colar Habilidades",
  "Max Skill": "Maximo Habilidades",
  // unit training
  "Total Resources to Train": "Total Recursos para Treinar",
  "Total Time to Train": "Total Tempo para Treinar",
  "Total Cancel": "Total Cancelado",
  // map interface
  "Fastest": "Rápido",
  "Slowest": "Lento",
  "Player": "Jogador",
  "Level": "Nível",
  "Castle": "Castelo",
  "Capital": "Capital",
  "Clan": "Clã",
  "Last Activity (Days)": "Última Actividade (Dias)",
  "Last ms": "Último ms", // last known activity, JS time format
  "Data Grabbed (Days)": "Dados Capturados (Dias)",
  "Grabbed ms": "Captura ms", // data grabbed, JS time format
  "Generate Map Report": "Gerar Relatório do Mapa",
  // spy reports
  "Message Age": "Idade da Mensagem",
  "Copy": "Copiar",
  "Delete Page": "Apagar Página",
  "Scavenge": "Limpeza" // i.e., clean-up
};

Translation["BR"] = {
//// the following items must appear *exactly* as they do in-game; copy-paste
//// is the safest way to go
  // units
  "Pikeman": "Lanceiro",
  "Swordsman": "Espadachim",
  "Axeman": "Guerreiro",
  "Maceman": "Gladiador",
  "Ogre": "Bárbaro",
  "Berserker": "Cavaleiro Teutão",
  "Golem": "Huskarle",
  "Rogue": "Mujahideen",
  "Quickwalker": "Batedor",
  "Light Cavalry": "Cavalaria Leve",
  "Heavy Cavalry": "Cavalaria Pesada",
  "Warmage": "Aríete",
  "Arcanist": "Balista",
  "Fireslinger": "Catapulta",
  "Stormcaller": "Trabuco",
  "Shortbowman": "Arqueiro de Arco Curto",
  "Longbowman": "Arqueiro de Arco Longo",
  "Crossbowman": "Besteiro",
  "Cavalry Archer": "Cavalaria Arqueira",
  "Nobleman": "Nobre",
  "High Priest": "Padre Tangra",
  "Airweaver": "Monge",
  "Elf Lord": "Baterista",
  "Warlord": "Senhor da Guerra",
  "Grand Magus": "Torre de cerco",
  "Unit 26": "Samurai",
  "Unit 27": "KhanGuard",
  // buildings
  "Gold Mine": "Mina de Ouro",
  "Iron Mine": "Mina de Ferro",
  "Lumber Mill": "Serralharia",
  "Farm": "Fazenda",
  "Homes": "Moradias",
  "Barracks": "Quartel",
  "Stables": "Estábulos",
  "Guild": "Oficina",
  "Market": "Mercado",
  "Training Grounds": "Ferreiro",
  "Hospital": "Enfermaria",
  "Wall": "Muralha",
  "Order": "Academia",
  "Guard Station": "Abrigo",
  "Store House": "Armazém",
  // resources
  "Gold": "Ouro",
  "Iron": "Ferro",
  "Wood": "Madeira",
  "Food": "Comida",
  "People": "Pessoas", // the exact word found in the alert() code in pohod.php
  // hero skills
  "Warrior": "Soldado",
  "Cavalryman": "Cavaleiro",
  "Defender": "Defensor",
  "Archer": "Arqueiro",
  "Scout": "Batedor",
  "Merchant": "Finanças",
  "Mystic": "Cerco",

//// the rest of these are the way the script interfaces with the user
//// any meaningful translation will do

  // abbreviations for days of the week; can be blank strings if none desired
  "Mo": "Seg",
  "Tu": "Ter",
  "We": "Qua",
  "Th": "Qui",
  "Fr": "Sex",
  "Sa": "Sab",
  "Su": "Dom",
  // script interface--might include HTML markup
  "Convert Res": "Converter Recurso",
  "Send Res": "Enviar Recurso",
  "Overview": "Resumo",
  "Clan Forum": "Clan Forum",
  "Clan Admin": "Clan Admin",
  "VIP Search": "Busca VIP",
  "Release Troops": "Liberar Tropas",
  "Server": "Server",
  "One-Way": "Caminho único",
  "<i>Estimated</i> Server Arrival": "Estimado Server Chegada",
  "Total Res": "Total Recurso ",
  "Max Merchant": "Max Mercado",
  "Extra": "Extra",
  "Warning: not enough troops to paste all.": "Cuidado: não tem tropas suficientes para colar tudo.",
  "Default attack formation not found.": "Formação de ataque default não encontrada.",
  "Quick Roads": "Caminhos Rápidos",
  "Copy Skills": "Copiar Habilidades",
  "Saved": "Salvo",
  "Options": "Opções",
  "Minimum Heal": "Cura Mínima",
  "Minimum Scavenge": "Limpeza Mínima",
  "Steal Fraction": "Fração do Roubo",
  "World Speed": "Velocidade do mundo",
  "ClanID": "ClanID",
  "Server Offset, Minutes": "Server fora do jogo, Minutos",
  "Maximum X": "Maximo X",
  "Maximum Y": "Maximo Y",
  "Default Attack Formation": "Formação de ataque default",
  "Delete ALL Data (Map Too)": "Deletar  todos os dados (Mapa  Também)",
  "For world": "Para o mundo",
  "Really! (This could take a long time.)": "Sério! (Isto vai levar muito tempo.)",
  "Paste Formation": "Colar formação",
  // troop selection tools
  "All": "Todos",
  "None": "Nenhum",
  "Single Infantry": "Infantaria simples",
  "Paste": "Colar",
  "Invert": "Inverter",
  "Formation": "Formação",
  "Default": "Padrão",
  // shortcut for speed-modified marches: attack, spy, scavenge, transfer
  "A": "A",
  "S": "S",
  "$": "L",
  "T": "T",
  // additional march counters
  "Speed": "Velocidade",
  "Damage": "Dano",
  "Mystics": "Cerco",
  "Encumbrance": "Penumbra",
  "Non-Mystics": "Sem cerco",
  "Castles": "Castelo",
  "Effective Speed": "Velocidade Efetiva",
  "Server Arrival": "Server chegada",
  "Server Return": "Server Retorno",
  "Local Arrival": "Local Chegada",
  "Local Return": "Local Retorno",
  "Timing (no coins)": "Tempo (sem motivação)",
  "Cancel": "Cancelar",
  "Could not find that march type.": "Não foi possível encontrar este tipo de marcha.",
  "Cannot transfer.": "Impossível Trasferir.",
  // abbreviations for light cavalry, cavalry archer
  "LC": "CL",
  "CA": "CP",
  // merchant management
  "Save": "Salvar",
  "Delete": "Deletar",
  "Top Up": "Encher",
  "Distribute Evenly": "Distribuir Igualmente",
  "Reset": "Resetar",
  "Room Left": "Espaço sobrando",
  "Profit Ratio": "Lucro",
  "Source": "Fonte",
  // battle reports
  "Non-Junk (Res)": "Sem limpeza (Rec)",
  "Total Attacker Loss (Res/Pop)": "Perda total do ataque (Rec/Pop)",
  "Total Defender Loss (Res/Pop)": "Perda total da defesa (Rec/Pop)",
  "Estimated Total Scavenge": "Limpeza total estimada",
  "Survivor Capacity": "Capacidade de sobreviver",
  "Copy Formation": "Copiar Formação",
  "Copy Army": "Copiar Exército",
  "Total Pop": "Pop total",
  // battle report show stats inline
  "Inf": "Inf", // damage vs. infantry
  "Cav": "Cav", // damage vs. cavalry
  "Arch": "Arco", // damage vs. archers
  "Myst": "Myst", // damage vs. mystics
  "Atk+": "Atk+", // unit attack upgrades
  "Def+": "Def+", // unit defense upgrades
  "Life": "vida", // unit life
  "Lost Resources": "Recursos Perdidos",
  "Lost Pop": "Pop Perdida",
  "Lost Life": "Vida Perdida",
  "Estimated Scavenge": "Limpeza Estimada",
  // sim
  "Min Unit": "Unidade Mínima",
  "Paste Unit": "Colar unidade",
  "Add Unit": "Adicionar Unidade",
  "Max Upgrade": "Ferreiro Máximo",
  "Paste Skill": "Colar Habilidade",
  "Max Skill": " Habilidade  Máxima",
  // unit training
  "Total Resources to Train": "Total de recursos para treinar",
  "Total Time to Train": "Tempo total do treino",
  "Total Cancel": "Cancelar tudo",
  // map interface
  "Fastest": "Velocidade da Luz",
  "Slowest": "Caminhada",
  "Player": "Jogador",
  "Level": "Nível",
  "Castle": "Castelo",
  "Capital": "Capital",
  "Clan": "Clan",
  "Last Activity (Days)": "Última Atividade (Dias)",
  "Last ms": "Últimos ms", // last known activity, JS time format
  "Data Grabbed (Days)": "Dados coletados (dias)",
  "Grabbed ms": "Adicionado ms", // data grabbed, JS time format
  "Generate Map Report": "Gerar Relatório de Mapa",
  // spy reports
  "Message Age": "Tempo da Mensagem",
  "Copy": "Copiar",
  "Delete Page": "Deletar Página",
  "Scavenge": "Limpeza" // i.e., clean-up
};

Translation["FR"] = {
//// the following items must appear *exactly* as they do in-game; copy-paste
//// is the safest way to go
  // units
  "Pikeman": "Lancier",
  "Swordsman": "Infanterie lourde",
  "Axeman": "Sauvage",
  "Maceman": "Gardien",
  "Ogre": "Hallebardier",
  "Berserker": "Chevalier teutonique",
  "Golem": "Huskarle",
  "Rogue": "Janissaire",
  "Quickwalker": "Éclaireur",
  "Light Cavalry": "Cavalerie légère",
  "Heavy Cavalry": "Cavalerie lourde",
  "Warmage": "Bélier",
  "Arcanist": "Baliste",
  "Fireslinger": "Catapulte",
  "Stormcaller": "Trébuchet",
  "Shortbowman": "Archer Bandit",
  "Longbowman": "Archer Lourd",
  "Crossbowman": "Arbalétrier",
  "Cavalry Archer": "Archer Monté",
  "Nobleman": "Noble",
  "High Priest": "Prêtre Tangra",
  "Airweaver": "Prêtre",
  "Elf Lord": "Tambour",
  "Warlord": "Seigneur de la guerre",
  "Grand Magus": "Tour de siège",
  "Unit 26": "Samouraï",
  "Unit 27": "Les Seigneurs",
  // buildings
  "Gold Mine": "Mine d'or",
  "Iron Mine": "Mine de fer",
  "Lumber Mill": "Bûcherons",
  "Farm": "Fermes",
  "Homes": "Habitations",
  "Barracks": "Caserne",
  "Stables": "Écurie",
  "Guild": "Atelier",
  "Market": "Marché",
  "Training Grounds": "Forge",
  "Hospital": "Infirmerie",
  "Wall": "Mur",
  "Order": "Ordre",
  "Guard Station": "Cachette",
  "Store House": "Entrepôt",
  // resources
  "Gold": "Or",
  "Iron": "Fer",
  "Wood": "Bois",
  "Food": "Nourriture",
  "People": "Gens", // the exact word found in the alert() code in pohod.php
  // hero skills
  "Warrior": "Guerrier",
  "Cavalryman": "Soldat de cavalerie",
  "Defender": "Défenseur",
  "Archer": "Archer",
  "Scout": "Mobilité",
  "Merchant": "Finances",
  "Mystic": "Siège",

//// the rest of these are the way the script interfaces with the user
//// any meaningful translation will do

  // abbreviations for days of the week; can be blank strings if none desired
  "Mo": "lu",
  "Tu": "ma",
  "We": "me",
  "Th": "je",
  "Fr": "ve",
  "Sa": "sa",
  "Su": "di",
  // script interface--might include HTML markup
  "Convert Res": "Transformer Res",
  "Send Res": "Envoyer Res",
  "Overview": "Aperçu",
  "Clan Forum": "Forum du Clan",
  "Clan Admin": "Admin Clan",
  "VIP Search": "Recherche Avancée",
  "Release Troops": "Relaxer Soldats",
  "Server": "Serveur",
  "One-Way": "Sens Unique",
  "<i>Estimated</i> Server Arrival": "Arrivée Estimée, Serveur",
  "Total Res": "Ressources Totals",
  "Max Merchant": "Marchand Max",
  "Extra": "Extra",
  "Warning: not enough troops to paste all.": "Avis: soldats insuffisants pour coller.",
  "Default attack formation not found.": "Formation défaut non trouvé.",
  "Quick Roads": "Voiries Rapides",
  "Copy Skills": "Copier Habiletés",
  "Saved": "Sauvegardé",
  "Options": "Options",
  "Minimum Heal": "Patients Minimum",
  "Minimum Scavenge": "Nettoyage Minimum",
  "Steal Fraction": "Fraction Volée",
  "World Speed": "Vitesse du Monde",
  "ClanID": "ClanID",
  "Server Offset, Minutes": "Écart de Serveur, Minutes",
  "Maximum X": "X Maximum",
  "Maximum Y": "Y Maximum",
  "Default Attack Formation": "Formation Défaute",
  "Delete ALL Data (Map Too)": "Effacer toutes données (carte aussi)",
  "For world": "Pour monde",
  "Really! (This could take a long time.)": "Vraiment! (ça pourrait durer longtemps)",
  "Paste Formation": "Coller Formation",
  // troop selection tools
  "All": "Tout",
  "None": "Rien",
  "Single Infantry": "Infanterie Seul",
  "Paste": "Coller",
  "Invert": "Inverser",
  "Formation": "Formation",
  "Default": "Défaut",
  // shortcut for speed-modified marches: attack, spy, scavenge, transfer
  "A": "A",
  "S": "S",
  "$": "N",
  "T": "T",
  // additional march counters
  "Speed": "Vitesse",
  "Damage": "Dégâts",
  "Mystics": "Siège",
  "Encumbrance": "Cargaison",
  "Non-Mystics": "Non-Siège",
  "Castles": "Châteaux",
  "Effective Speed": "Vitesse Effective",
  "Server Arrival": "Arrivée Serveur",
  "Server Return": "Retour Server",
  "Local Arrival": "Arrivée Locale",
  "Local Return": "Retour Local",
  "Timing (no coins)": "Minutage (sans motivation)",
  "Cancel": "Annuler",
  "Could not find that march type.": "Ce type de marche n'existe pas.",
  "Cannot transfer.": "Impossible de transférer.",
  // abbreviations for light cavalry, cavalry archer
  "LC": "CL",
  "CA": "AM",
  // merchant management
  "Save": "Sauvegarder",
  "Delete": "Effacer",
  "Top Up": "Compléter",
  "Distribute Evenly": "Distribuer Également",
  "Reset": "Remettre",
  "Room Left": "Espace Restant",
  "Profit Ratio": "Proportion de Benefice",
  "Source": "Source",
  // battle reports
  "Non-Junk (Res)": "Soldats de Valeur (Res)",
  "Total Attacker Loss (Res/Pop)": "Perte, Totale Attaquant (Res/Pop)",
  "Total Defender Loss (Res/Pop)": "Perte Totale, Défenseur (Res/Pop)",
  "Estimated Total Scavenge": "Nettoyage Total Estimé",
  "Survivor Capacity": "Capacité des Rescapés",
  "Copy Formation": "Copier Formation",
  "Copy Army": "Copier Armée",
  "Total Pop": "Pop Total",
  // battle report show stats inline
  "Inf": "Inf", // damage vs. infantry
  "Cav": "Cav", // damage vs. cavalry
  "Arch": "Arch", // damage vs. archers
  "Myst": "Sg", // damage vs. mystics
  "Atk+": "Atq+", // unit attack upgrades
  "Def+": "Déf+", // unit defense upgrades
  "Life": "Vie", // unit life
  "Lost Resources": "Ressources Perdus",
  "Lost Pop": "Pop Perdu",
  "Lost Life": "Vie Perdue",
  "Estimated Scavenge": "Nettoyage Estimaté",
  // sim
  "Min Unit": "Min Soldats",
  "Paste Unit": "Coller Soldats",
  "Add Unit": "Ajouter Soldats",
  "Max Upgrade": "Max Forge",
  "Paste Skill": "Coller Habiletés",
  "Max Skill": "Max Habiletés",
  // unit training
  "Total Resources to Train": "Resources à Entraîner",
  "Total Time to Train": "Temps Total à Entraîner",
  "Total Cancel": "Annuler Total",
  // map interface
  "Fastest": "Le Plus Vite",
  "Slowest": "Le Plus Lent",
  "Player": "Joueur",
  "Level": "Niveau",
  "Castle": "Château",
  "Capital": "Capitale",
  "Clan": "Clan",
  "Last Activity (Days)": "Dernièrement en Ligne (Jours)",
  "Last ms": "Dernière ms", // last known activity, JS time format
  "Data Grabbed (Days)": "Données Rassemblées (Jours)",
  "Grabbed ms": "Rassemblées ms", // data grabbed, JS time format
  "Generate Map Report": "Rapport du Carte",
  // spy reports
  "Message Age": "Âge du Message",
  "Copy": "Copier",
  "Delete Page": "Effacer Page",
  "Scavenge": "Nettoyage" // i.e., clean-up
};

Translation["ES"] = {
//// the following items must appear *exactly* as they do in-game; copy-paste
//// is the safest way to go
  // units
  "Pikeman": "Piquero",
  "Swordsman": "Soldado Espada",
  "Axeman": "Soldado Hacha",
  "Maceman": "Soldado Maza",
  "Ogre": "Halberd",
  "Berserker": "Caballero Teutónico",
  "Golem": "Husar",
  "Rogue": "Muyahid",
  "Quickwalker": "Mensajero veloz",
  "Light Cavalry": "Caballería ligera",
  "Heavy Cavalry": "Caballería pesada",
  "Warmage": "Tarán",
  "Arcanist": "Balista",
  "Fireslinger": "Catapulta",
  "Stormcaller": "Fundíbulo",
  "Shortbowman": "Tirador arco pequeño",
  "Longbowman": "Tirador arco grande",
  "Crossbowman": "Ballestero",
  "Cavalry Archer": "Tirador jinete",
  "Nobleman": "Hidalgo",
  "High Priest": "Sacerdote de Tangra",
  "Airweaver": "Cura",
  "Elf Lord": "Tamborero",
  "Warlord": "Comandante",
  "Grand Magus": "Torre de asedio",
  "Unit 26": "Samurai",
  "Unit 27": "KhanGuard",
  // buildings
  "Gold Mine": "Mina de oro",
  "Iron Mine": "Mina de hierro",
  "Lumber Mill": "Leñadores",
  "Farm": "Haciendas",
  "Homes": "Viviendas",
  "Barracks": "Cuartel",
  "Stables": "Cuadra",
  "Guild": "Taller",
  "Market": "Mercado",
  "Training Grounds": "Herrería",
  "Hospital": "Hospital Militar",
  "Wall": "Muralla",
  "Order": "Orden",
  "Guard Station": "Refugio",
  "Store House": "Almacenes",
  // resources
  "Gold": "Oro",
  "Iron": "Hierro",
  "Wood": "Madera",
  "Food": "Comida",
  "People": "Gente", // the exact word found in the alert() code in pohod.php
  // hero skills
  "Warrior": "Guerrero",
  "Cavalryman": "Caballero",
  "Defender": "Defensor",
  "Archer": "Tirador",
  "Scout": "Explorador",
  "Merchant": "Finanzas",
  "Mystic": "Asedio",
  // Clan Interface (viewsauz.php)
  "Clan information": "Información Clan",
  "Clan politics": "Políticas Clan",
  "Clan members": "Miembros del clan",

//// the rest of these are the way the script interfaces with the user
//// any meaningful translation will do
  // abbreviations for days of the week; can be blank strings if none desired
  "Mo": "Lu",
  "Tu": "Ma",
  "We": "Mi",
  "Th": "Ju",
  "Fr": "Vi",
  "Sa": "Sa",
  "Su": "Do",
  // script interface—might include HTML markup
  "Convert Res": "Convertir Recursos",
  "Send Res": "Enviar Recursos",
  "Overview": "Info. General",
  "Clan Forum": "Foro del Clan",
  "Clan Admin": "Administrar Clan",
  "VIP Search": "Búsqueda VIP",
  "Release Troops": "Actualizar Ejercito",
  "Server": "Servidor",
  "One-Way": "Dirección Unica",
  "<i>Estimated</i> Server Arrival": "Llegada <i>estimada</i> (servidor)",
  "Total Res": "Recursos Totales",
  "Max Merchant": "Máximo Comerciable",
  "Extra": "Sobrante",
  "Warning: not enough troops to paste all.": "Advertencia: cantidad de tropas insuficientes.",
  "Default attack formation not found.": "Formacion de ataque predeterminada no encontrada.",
  "Quick Roads": "Caminos Rápidos",
  "Copy Skills": "Copiar Habilidades",
  "Saved": "Guardado",
  "Options": "Opciones",
  "Minimum Heal": "Curación Mínima",
  "Minimum Scavenge": "Limpieza Mínima",
  "Steal Fraction": "Fracción Robada",
  "World Speed": "Velocidad del Mundo",
  "ClanID": "ID del Clan",
  "Server Offset, Minutes": "Desincronización Servidor (min.)",
  "Maximum X": "X Máxima",
  "Maximum Y": "Y Máxima",
  "Default Attack Formation": "Formación de Ataque Predeterminada",
  "Delete ALL Data (Map Too)": "Borrar TODOS los Datos (también mapa)",
  "For world": "Para el Mundo",
  "Really! (This could take a long time.)": "En Serio! (puede tardar mucho)",
  "Paste Formation": "Pegar Formación",
  // troop selection tools
  "All": "Todo",
  "None": "Ninguno",
  "Single Infantry": "Solo 1 Infanteria",
  "Paste": "Pegar",
  "Invert": "Invertir",
  "Formation": "Formación",
  "Default": "Predeterminado",
  // shortcut for speed-modified marches: attack, spy, scavenge, transfer
  "A": "A",
  "S": "E",
  "$": "L",
  "T": "T",
  // additional march counters
  "Speed": "Velocidad",
  "Damage": "Daño",
  "Mystics": "Asedio",
  "Encumbrance": "Carga",
  "Non-Mystics": "Sin-Asedio",
  "Castles": "Castillos",
  "Effective Speed": "Velocidad Efectiva",
  "Server Arrival": "LLegada hs Servidor",
  "Server Return": "Vuelta hs Servidor",
  "Local Arrival": "LLegada hs Local",
  "Local Return": "Vuelta hs Local",
  "Timing (no coins)": "Tiempo (sin motivacion)",
  "Cancel": "Cancelar",
  "Could not find that march type.": "No se encuentra ese tipo de marcha.",
  "Cannot transfer.": "No se puede transferir.",
  // abbreviations for light cavalry, cavalry archer
  "LC": "CL",
  "CA": "TJ",
  // merchant management
  "Save": "Guardar",
  "Delete": "Borrar",
  "Top Up": "Todo",
  "Distribute Evenly": "Distrib. Equitativa",
  "Reset": "Reiniciar",
  "Room Left": "Espacio Sobrante",
  "Profit Ratio": "Ratio de Beneficio",
  "Source": "Fuente",
  // battle reports
  "Non-Junk (Res)": "Sin Limpieza (Rec)",
  "Total Attacker Loss (Res/Pop)": "Pérdida Total de Ataque (Rec/Pob)",
  "Total Defender Loss (Res/Pop)": "Pérdida Total de Defensa (Rec/Pob)",
  "Estimated Total Scavenge": "Limpieza Total Estimada",
  "Survivor Capacity": "Capacidad superviviente",
  "Copy Formation": "Copiar Formación",
  "Copy Army": "Copiar Ejercito",
  "Total Pop": "Pob. Total",
  // battle report show stats inline
  "Inf": "Inf", // damage vs. infantry
  "Cav": "Cab", // damage vs. cavalry
  "Arch": "Arq", // damage vs. archers
  "Myst": "Ase", // damage vs. mystics
  "Atk+": "Atq+", // unit attack upgrades
  "Def+": "Def+", // unit defense upgrades
  "Life": "Vida", // unit life
  "Lost Resources": "Recursos Perdidos",
  "Lost Pop": "Pob. Perdida",
  "Lost Life": "Vida Perdida",
  "Estimated Scavenge": "Limpieza Estimada",
  // sim
  "Min Unit": "Min Unid",
  "Paste Unit": "Pegar Unid",
  "Add Unit": "Agreg Unid",
  "Max Upgrade": "Mejora Max",
  "Paste Skill": "Pegar Habilidad",
  "Max Skill": "Habilidades Max",
  // unit training
  "Total Resources to Train": "Recursos Totales para Entrenar",
  "Total Time to Train": "Tiempo Total para Entrenar",
  "Total Cancel": "Cancelarlo Todo",
  // map interface
  "Fastest": "Rapidísimo",
  "Slowest": "Lentísimo",
  "Player": "Jugador",
  "Level": "Nivel",
  "Castle": "Castillo",
  "Capital": "Capital",
  "Clan": "Clan",
  "Last Activity (Days)": "Ultima Actividad (Dias)",
  "Last ms": "Ultimo Act ms", // last known activity, JS time format
  "Data Grabbed (Days)": "Datos Guardados (Dias)",
  "Grabbed ms": "Guardado ms", // data grabbed, JS time format
  "Generate Map Report": "Generar Reporte de Mapa",
  // spy reports
  "Message Age": "Antiguedad del mensaje",
  "Copy": "Copiar",
  "Delete Page": "Borrar Pagina",
  "Scavenge": "Limpieza", // i.e., clean-up
  // Clan links
  "information": "información",
  "politics": "política",
  "members": "miembros",

};

Translation["CL"] = {
//// the following items must appear *exactly* as they do in-game; copy-paste
//// is the safest way to go
  // units
  "Pikeman": "Piquero",
  "Swordsman": "Soldado Espada",
  "Axeman": "Soldado Hacha",
  "Maceman": "Soldado Maza",
  "Ogre": "Halberd",
  "Berserker": "Caballero Teutónico",
  "Golem": "Husar",
  "Rogue": "Muyahid",
  "Quickwalker": "Mensajero veloz",
  "Light Cavalry": "Caballería ligera",
  "Heavy Cavalry": "Caballería pesada",
  "Warmage": "Tarán",
  "Arcanist": "Balista",
  "Fireslinger": "Catapulta",
  "Stormcaller": "Fundíbulo",
  "Shortbowman": "Tirador arco pequeño",
  "Longbowman": "Tirador arco grande",
  "Crossbowman": "Ballestero",
  "Cavalry Archer": "Tirador jinete",
  "Nobleman": "Hidalgo",
  "High Priest": "Sacerdote de Tangra",
  "Airweaver": "Cura",
  "Elf Lord": "Tamborero",
  "Warlord": "Comandante",
  "Grand Magus": "Torre de asedio",
  "Unit 26": "Samurai",
  "Unit 27": "KhanGuard",
  // buildings
  "Gold Mine": "Mina de oro",
  "Iron Mine": "Mina de hierro",
  "Lumber Mill": "Leñadores",
  "Farm": "Haciendas",
  "Homes": "Viviendas",
  "Barracks": "Cuartel",
  "Stables": "Cuadra",
  "Guild": "Taller",
  "Market": "Mercado",
  "Training Grounds": "Herrería",
  "Hospital": "Hospital Militar",
  "Wall": "Muralla",
  "Order": "Orden",
  "Guard Station": "Refugio",
  "Store House": "Almácenes",
  // resources
  "Gold": "Oro",
  "Iron": "Hierro",
  "Wood": "Madera",
  "Food": "Comida",
  "People": "Gente", // the exact word found in the alert() code in pohod.php
  // hero skills
  "Warrior": "Guerrero",
  "Cavalryman": "Caballero",
  "Defender": "Defensor",
  "Archer": "Tirador",
  "Scout": "Explorador",
  "Merchant": "Finanzas",
  "Mystic": "Asedio",

//// the rest of these are the way the script interfaces with the user
//// any meaningful translation will do
  // abbreviations for days of the week; can be blank strings if none desired
  "Mo": "Lu",
  "Tu": "Ma",
  "We": "Mi",
  "Th": "Ju",
  "Fr": "Vi",
  "Sa": "Sa",
  "Su": "Do",
  // script interface—might include HTML markup
  "Convert Res": "Convertir Recursos",
  "Send Res": "Enviar Recursos",
  "Overview": "Info. General",
  "Clan Forum": "Foro del Clan",
  "Clan Admin": "Administrar el Clan",
  "VIP Search": "Busqueda VIP",
  "Release Troops": "Actualizar Ejercito",
  "Server": "Servidor",
  "One-Way": "Direccion Unica",
  "Estimated Server Arrival": "Estimado Llegada hs Servidor",
  "Total Res": "Recursos Totales",
  "Max Merchant": " Cantidad Max Mercado",
  "Extra": "Sobrante",
  "Warning: not enough troops to paste all.": "Cuidado: cantidad de tropas insuficientes.",
  "Default attack formation not found.": "Formacion de ataque predeterminada no encontrada.",
  "Quick Roads": "Caminos Rapidos",
  "Copy Skills": "Copiar Habilidades",
  "Saved": "Guardado",
  "Options": "Opciones",
  "Minimum Heal": "Curacion Minima",
  "Minimum Scavenge": "Limpieza Minima",
  "Steal Fraction": "Fraccion de Robo",
  "World Speed": "Velocidad Mundo",
  "ClanID": "ClanID",
  "Server Offset, Minutes": "Servidor fuera de juego, Minutos",
  "Maximum X": "Maximo X",
  "Maximum Y": "Maximo Y",
  "Default Attack Formation": "Formacion de Ataque Predeterminada",
  "Delete ALL Data (Map Too)": "Borrar Todos los Datos (Mapa Tambien)",
  "For world": "Para el Mundo",
  "Really! (This could take a long time.)": "En Serio! (Esto tomara mucho tiempo.)",
  "Paste Formation": "Pegar Formacion",
  // troop selection tools
  "All": "Todo",
  "None": "Ninguno",
  "Single Infantry": "Solo 1 Infanteria",
  "Paste": "Pegar",
  "Invert": "Invertir",
  "Formation": "Formacion",
  "Default": "Predeterminado",
  // shortcut for speed-modified marches: attack, spy, scavenge, transfer
  "A": "A",
  "S": "S",
  "$": "L",
  "T": "T",
  // additional march counters
  "Speed": "Velocidad",
  "Damage": "Daño",
  "Mystics": "Asedio",
  "Encumbrance": "Penumbra",
  "Non-Mystics": "Sin-Asedio",
  "Castles": "Castillos",
  "Effective Speed": "Velocidad Efectiva",
  "Server Arrival": "LLegada hs Servidor",
  "Server Return": "Vuelta hs Servidor",
  "Local Arrival": "LLegada hs Local",
  "Local Return": "Vuelta hs Local",
  "Timing (no coins)": "Tiempo (sin motivacion)",
  "Cancel": "Cancelar",
  "Could not find that march type.": "No se encuentra ese tipo de marcha.",
  "Cannot transfer.": "No se puede transferir.",
  // abbreviations for light cavalry, cavalry archer
  "LC": "CL",
  "CA": "TJ",
  // merchant management
  "Save": "Guardar",
  "Delete": "Borrar",
  "Top Up": "Todo",
  "Distribute Evenly": "Distrib. Equitativa",
  "Reset": "Reiniciar",
  "Room Left": "Espacio Sobrante",
  "Profit Ratio": "Lucro",
  "Source": "Fuente",
  // battle reports
  "Non-Junk (Res)": "Sin Limpieza (Rec)",
  "Total Attacker Loss (Res/Pop)": "Perdida Total de Ataque (Rec/Pob)",
  "Total Defender Loss (Res/Pop)": "Perdida Total de Defensa (Rec/Pob)",
  "Estimated Total Scavenge": "Limpieza Total Estimada",
  "Survivor Capacity": "Capacidad de Sobrevivir",
  "Copy Formation": "Copiar Formacion",
  "Copy Army": "Copiar Ejercito",
  "Total Pop": "Pob Total",
  // battle report show stats inline
  "Inf": "Inf", // damage vs. infantry
  "Cav": "Cab", // damage vs. cavalry
  "Arch": "Arq", // damage vs. archers
  "Myst": "Ase", // damage vs. mystics
  "Atk+": "Atq+", // unit attack upgrades
  "Def+": "Def+", // unit defense upgrades
  "Life": "Vida", // unit life
  "Lost Resources": "Recursos Perdidos",
  "Lost Pop": "Pobla. Perdida",
  "Lost Life": "Vida Perdida",
  "Estimated Scavenge": "Limpieza Estimada",
  // sim
  "Min Unit": "Min Unid",
  "Paste Unit": "Pegar Unid",
  "Add Unit": "Agreg Unid",
  "Max Upgrade": "Max Mejoras",
  "Paste Skill": "Pegar Habilidades.",
  "Max Skill": "Max Habilidades",
  // unit training
  "Total Resources to Train": "Recursos Totales para Entrenar",
  "Total Time to Train": "Tiempo Total para Entrenar",
  "Total Cancel": "Cancelar Todo",
  // map interface
  "Fastest": "Rapidisimo",
  "Slowest": "Lentisimo",
  "Player": "Jugador",
  "Level": "Nivel",
  "Castle": "Castillo",
  "Capital": "Capital",
  "Clan": "Clan",
  "Last Activity (Days)": "Ultima Actividad (Dias)",
  "Last ms": "Ultimo Act ms", // last known activity, JS time format
  "Data Grabbed (Days)": "Datos Guardados(Dias)",
  "Grabbed ms": "Dat Guard ms", // data grabbed, JS time format
  "Generate Map Report": "Generar Reporte de Mapa",
  // spy reports
  "Message Age": "Tiempo del Mensaje",
  "Copy": "Copiar",
  "Delete Page": "Borrar Pagina",
  "Scavenge": "Limpieza" // i.e., clean-up
};

Translation["VN"] = {
  "Pikeman": "Giáo binh",
  "Swordsman": "Kiếm sĩ",
  "Axeman": "Phủ quân",
  "Maceman": "Chùy quân",
  "Ogre": "Phủ bổ đầu",
  "Berserker": "Hiệp sĩ Teuton",
  "Golem": "Quân Huskarle",
  "Rogue": "Quân Janissary",
  "Quickwalker": "Thiên lý mã",
  "Light Cavalry": "Kỵ binh",
  "Heavy Cavalry": "Kỵ sĩ",
  "Warmage": "Thiết chiến xa",
  "Arcanist": "Tiễn xa",
  "Fireslinger": "Thạch xa",
  "Stormcaller": "Đẩu Thạch Cơ",
  "Shortbowman": "Cung thủ",
  "Longbowman": "Trường cung thủ",
  "Crossbowman": "Thập tự cung",
  "Cavalry Archer": "Xạ Kỵ Binh",
  "Nobleman": "Quý tộc",
  "High Priest": "Mục sư Tangra",
  "Airweaver": "Tu sĩ",
  "Elf Lord": "Cổ thủ quân",
  "Warlord": "Chiến kỵ quân",
  "Grand Magus": "Tháp chiến xa",
  "Unit 26": "Samurai",
  "Unit 27": "KhanGuard",
  "Gold Mine": "Mỏ Vàng",
  "Iron Mine": "Mỏ Sắt",
  "Lumber Mill": "Nhà Đốn Gỗ",
  "Farm": "Nông Trại",
  "Homes": "Nhà ở",
  "Barracks": "Trại lính",
  "Stables": "Trại ngựa",
  "Guild": "Xưởng Cơ giới",
  "Market": "Khu Chợ",
  "Training Grounds": "Lò rèn",
  "Hospital": "Bệnh xá",
  "Wall": "Tường thành",
  "Order": "Thánh điện",
  "Guard Station": "Hầm chứa",
  "Store House": "Kho hàng",
  "Warrior": "Chiến binh",
  "Cavalryman": "Kỵ Binh",
  "Defender": "Phòng thủ",
  "Archer": "Xạ tiễn",
  "Scout": "Hành quân",
  "Merchant": "Kinh tế",
  "Mystic": "Cơ giới",
  "Gold": "Vàng",
  "Iron": "Sắt",
  "Wood": "Gỗ",
  "Food": "Thịt",
  "People": "Quân số"
}

Translation["RO"] = {
  "Pikeman": "Purtător de lance",
  "Swordsman": "Purtător de spadă",
  "Axeman": "Luptător cu secure",
  "Maceman": "Luptător cu buzdugan",
  "Ogre": "Halebardist",
  "Berserker": "Cavaler teuton",
  "Golem": "Huscarl",
  "Rogue": "Ienicer",
  "Quickwalker": "Spion",
  "Light Cavalry": "Cavalerie uşoară",
  "Heavy Cavalry": "Cavalerie grea",
  "Warmage": "Berbeci",
  "Arcanist": "Balistă",
  "Fireslinger": "Catapultă",
  "Stormcaller": "Trebuchet",
  "Shortbowman": "Arcaş cu arc mic",
  "Longbowman": "Arcaş cu arc mare",
  "Crossbowman": "Arbaletist",
  "Cavalry Archer": "Călăreţ arcaş",
  "Nobleman": "Nobil",
  "High Priest": "Călugăr Războinic",
  "Airweaver": "Călugăr",
  "Elf Lord": "Toboşar",
  "Warlord": "Lord de război",
  "Grand Magus": "Turn de asediu",
  "Unit 26": "Samurai",
  "Unit 27": "Garda Khanului",
  "Gold Mine": "Mină de aur",
  "Iron Mine": "Mină de fier",
  "Lumber Mill": "Tăietori de lemne",
  "Farm": "Ferme",
  "Homes": "Locuinţe",
  "Barracks": "Unitate militară",
  "Stables": "Grajduri",
  "Guild": "Atelier",
  "Market": "Piaţă",
  "Training Grounds": "Fierărie",
  "Hospital": "Infirmerie",
  "Wall": "Perete",
  "Order": "Ordin",
  "Guard Station": "Ascunzătoare",
  "Store House": "Depozit",
  "Warrior": "Războinic",
  "Cavalryman": "Cavalerie",
  "Defender": "Apărător",
  "Archer": "Arcas",
  "Scout": "Explorator",
  "Merchant": "Finanţe",
  "Mystic": "Asediu",
  "Gold": "Aur",
  "Iron": "Fier",
  "Wood": "Lemne",
  "Food": "Hrană",
  "People": "Oameni"
}

Translation["PL"] = {
  "Pikeman": "Pikinier",
  "Swordsman": "Szermierz",
  "Axeman": "Topornik",
  "Maceman": "Pałkarz",
  "Ogre": "Opancerzony topornik",
  "Berserker": "Teutoński rycerz",
  "Golem": "Goplanin",
  "Rogue": "Janczar",
  "Quickwalker": "Szpieg",
  "Light Cavalry": "Lekka kawaleria",
  "Heavy Cavalry": "Ciężka kawaleria",
  "Warmage": "Taran",
  "Arcanist": "Balista",
  "Fireslinger": "Katapulta",
  "Stormcaller": "Maszyna oblężnicza",
  "Shortbowman": "Łucznik",
  "Longbowman": "Zawodowy łucznik",
  "Crossbowman": "Kusznik",
  "Cavalry Archer": "Konny łucznik",
  "Nobleman": "Szlachcic",
  "High Priest": "Kapłan Tangry",
  "Airweaver": "Mnich",
  "Elf Lord": "Dobosz",
  "Warlord": "Warlord",
  "Grand Magus": "Wieża oblężnicza",
  "Unit 26": "Samuraj",
  "Unit 27": "Straż Czyngis-Chana",
  "Gold Mine": "Kopalnia złota",
  "Iron Mine": "Kopalnia żelaza",
  "Lumber Mill": "Tartak",
  "Farm": "Farmy",
  "Homes": "Mieszkania",
  "Barracks": "Koszary",
  "Stables": "Stajnie",
  "Guild": "Warsztat",
  "Market": "Rynek",
  "Training Grounds": "Kuźnia",
  "Hospital": "Szpital",
  "Wall": "Mur",
  "Order": "Zakon",
  "Guard Station": "Kryjówka",
  "Store House": "Magazyny",
  "Warrior": "Wojownik",
  "Cavalryman": "Kawalerzysta",
  "Defender": "Obrońca",
  "Archer": "Strzelec",
  "Scout": "Szybkość",
  "Merchant": "Bankowość",
  "Mystic": "Maszyny",
  "Gold": "Złoto",
  "Iron": "Żelazo",
  "Wood": "Drewno",
  "Food": "Pożywienie",
  "People": "Ludzie"
}

Translation["TR"] = {
  "Pikeman": "Mızraklı piyade",
  "Swordsman": "Kılıçlı piyade",
  "Axeman": "Baltalı piyade",
  "Maceman": "Gürzlü piyade",
  "Ogre": "Savaş-Baltalı piyade",
  "Berserker": "Teoutonik şövalyesi",
  "Golem": "Özel ünite",
  "Rogue": "Yeniçeri",
  "Quickwalker": "Kolcu",
  "Light Cavalry": "Hafif süvari",
  "Heavy Cavalry": "Ağır süvari",
  "Warmage": "Koç boynuzu",
  "Arcanist": "Balistik ok",
  "Fireslinger": "Katapult(Büyük Mancınık)",
  "Stormcaller": "Büyük Sehpalı Yay",
  "Shortbowman": "Kısa menzilli okçu",
  "Longbowman": "Uzun menzilli okçu",
  "Crossbowman": "Tatar okçusu",
  "Cavalry Archer": "Okçu süvari",
  "Nobleman": "Soylu",
  "High Priest": "Tangra kahini",
  "Airweaver": "Keşiş",
  "Elf Lord": "Davulcu",
  "Warlord": "Kumandan",
  "Grand Magus": "Kuşatma kulesi",
  "Unit 26": "Samuray",
  "Unit 27": "Han Koruması",
  "Gold Mine": "Altın madeni",
  "Iron Mine": "Demir madeni",
  "Lumber Mill": "Oduncu Kampları",
  "Farm": "Çiftlikler",
  "Homes": "Evler",
  "Barracks": "Askeriye",
  "Stables": "At ahırları",
  "Guild": "Atölye",
  "Market": "Pazar yeri",
  "Training Grounds": "Demirci Atölyesi",
  "Hospital": "Hastahane",
  "Wall": "Sur",
  "Order": "Akademi",
  "Guard Station": "Sığınak",
  "Store House": "Depolar",
  "Warrior": "Savaşçı",
  "Cavalryman": "Süvari ",
  "Defender": "Savunma",
  "Archer": "Okçu",
  "Scout": "Kaşiflik",
  "Merchant": "Ekonomi",
  "Mystic": "Kuşatma",
  "Gold": "Altın",
  "Iron": "Demir",
  "Wood": "Odun",
  "Food": "Gıda",
  "People": "Kişi"
}

Translation["IT"] = {
  "Pikeman": "Picchiere",
  "Swordsman": "Spadaccino",
  "Axeman": "Soldato con ascia",
  "Maceman": "Soldato con mazza",
  "Ogre": "Asciere da Guerra",
  "Berserker": "Cavaliere teutonico",
  "Golem": "Huscarlo",
  "Rogue": "Mujahideen",
  "Quickwalker": "Esploratore",
  "Light Cavalry": "Cavaliere leggero",
  "Heavy Cavalry": "Cavaliere pesante",
  "Warmage": "Ariete",
  "Arcanist": "Ballista",
  "Fireslinger": "Catapulta",
  "Stormcaller": "Trabucco",
  "Shortbowman": "Arciere leggero",
  "Longbowman": "Arciere pesante",
  "Crossbowman": "Balestriere",
  "Cavalry Archer": "Arciere a cavallo",
  "Nobleman": "Nobiluomo",
  "High Priest": "Sacerdote Tangra",
  "Airweaver": "Prete",
  "Elf Lord": "Tamburino",
  "Warlord": "Signore della Guerra",
  "Grand Magus": "Torre d´assedio",
  "Unit 26": "Samurai",
  "Unit 27": "Guardia del Khan",
  "Gold Mine": "Miniera d´oro",
  "Iron Mine": "Miniera di ferro",
  "Lumber Mill": "Taglialegna",
  "Farm": "Fattorie",
  "Homes": "Abitazioni",
  "Barracks": "Caserma",
  "Stables": "Stalla",
  "Guild": "Officina",
  "Market": "Mercato",
  "Training Grounds": "Fabbro",
  "Hospital": "Infermeria",
  "Wall": "Mura",
  "Order": "Ordine",
  "Guard Station": "Rifugio",
  "Store House": "Magazzino",
  "Warrior": "Combattimento",
  "Cavalryman": "Cavaliere",
  "Defender": "Difesa",
  "Archer": "Precisione",
  "Scout": "Esplorazione",
  "Merchant": "Finanza",
  "Mystic": "Assedio",
  "Gold": "Oro",
  "Iron": "Ferro",
  "Wood": "Legno",
  "Food": "Cibo",
  "People": "Uomini"
}

Translation["DE"] = {
  "Pikeman": "Pikenier",
  "Swordsman": "Schwertkämpfer",
  "Axeman": "Axtkämpfer",
  "Maceman": "Keulenträger",
  "Ogre": "Hellebardist",
  "Berserker": "Kreuzritter",
  "Golem": "Huskarl",
  "Rogue": "Janitschar",
  "Quickwalker": "Späher",
  "Light Cavalry": "Leichte Kavallerie",
  "Heavy Cavalry": "Schwere Kavallerie",
  "Warmage": "Rammbock",
  "Arcanist": "Balliste",
  "Fireslinger": "Katapult",
  "Stormcaller": "Trebuchet",
  "Shortbowman": "Bogenschütze",
  "Longbowman": "Langbogenschütze",
  "Crossbowman": "Armbrustschütze",
  "Cavalry Archer": "Berittener Bogenschütze",
  "Nobleman": "Adliger",
  "High Priest": "Thangra-Priester",
  "Airweaver": "Mönch",
  "Elf Lord": "Trommler",
  "Warlord": "Kriegsfürst",
  "Grand Magus": "Belagerungsturm",
  "Unit 26": "Samurai",
  "Unit 27": "Wächter Dschingis Khans",
  "Gold Mine": "Goldgrube",
  "Iron Mine": "Eisenmine",
  "Lumber Mill": "Holzfällerhütte",
  "Farm": "Bauernhöfe",
  "Homes": "Häuser",
  "Barracks": "Kaserne",
  "Stables": "Pferdestall",
  "Guild": "Waffenschmiede",
  "Market": "Markt",
  "Training Grounds": "Schmiede",
  "Hospital": "Lazarett",
  "Wall": "Burgmauer",
  "Order": "Adelsorden",
  "Guard Station": "Versteck",
  "Store House": "Lagerhaus",
  "Warrior": "Krieger",
  "Cavalryman": "Kavallerist",
  "Defender": "Verteidiger",
  "Archer": "Schütze",
  "Scout": "Späher",
  "Merchant": "Finanzen",
  "Mystic": "Belagerung",
  "Gold": "Gold",
  "Iron": "Eisen",
  "Wood": "Holz",
  "Food": "Nahrung",
  "People": "Leute"
}

Translation["BG"] = {
  "Pikeman": "Пиконосец",
  "Swordsman": "Мечоносец",
  "Axeman": "Боец брадва",
  "Maceman": "Боец Боздуган",
  "Ogre": "Алебардист",
  "Berserker": "Тевтонски рицар",
  "Golem": "Хускарл",
  "Rogue": "Еничар",
  "Quickwalker": "Бързоход",
  "Light Cavalry": "Лека кавалерия",
  "Heavy Cavalry": "Тежка кавалерия",
  "Warmage": "Таран",
  "Arcanist": "Балиста",
  "Fireslinger": "Катапулт",
  "Stormcaller": "Трибучет",
  "Shortbowman": "Стрелец малък лък",
  "Longbowman": "Стрелец голям лък",
  "Crossbowman": "Арбалетист",
  "Cavalry Archer": "Стрелец конник",
  "Nobleman": "Благородник",
  "High Priest": "Жрец на Тангра",
  "Airweaver": "Свещенник",
  "Elf Lord": "Барабанист",
  "Warlord": "Карвед",
  "Grand Magus": "Обсадна кула",
  "Unit 26": "Самурай",
  "Unit 27": "Пазител на Хана",
  "Gold Mine": "Златна мина",
  "Iron Mine": "Желязна мина",
  "Lumber Mill": "Дървосекачи",
  "Farm": "Ферми",
  "Homes": "Жилища",
  "Barracks": "Казарма",
  "Stables": "Конюшня",
  "Guild": "Работилница",
  "Market": "Пазар",
  "Training Grounds": "Ковачница",
  "Hospital": "Лазарет",
  "Wall": "Стена",
  "Order": "Орден",
  "Guard Station": "Скривалище",
  "Store House": "Складове",
  "Warrior": "Войн",
  "Cavalryman": "Кавалерист",
  "Defender": "Защитник",
  "Archer": "Стрелец",
  "Scout": "Скаут",
  "Merchant": "Финанси",
  "Mystic": "Обсада",
  "Gold": "Злато",
  "Iron": "Желязо",
  "Wood": "Дърва",
  "Food": "Храна",
  "People": "Популация"
}

Translation["HR"] = {
  "Pikeman": "Pikeman",
  "Swordsman": "Swordsman",
  "Axeman": "Axeman",
  "Maceman": "Maceman",
  "Ogre": "Battle-Axemen",
  "Berserker": "Teoutonic knight",
  "Golem": "Huskarle",
  "Rogue": "Janjičar",
  "Quickwalker": "Quickwalkers",
  "Light Cavalry": "Light cavalry",
  "Heavy Cavalry": "Heavy cavalry",
  "Warmage": "Ram",
  "Arcanist": "Ballistician",
  "Fireslinger": "Catapult",
  "Stormcaller": "Trebuchet",
  "Shortbowman": "Shortbow archer",
  "Longbowman": "Longbow archer",
  "Crossbowman": "Crossbow archer",
  "Cavalry Archer": "Archer cavalry",
  "Nobleman": "Plemić",
  "High Priest": "Tangra svećenik",
  "Airweaver": "Svećenik",
  "Elf Lord": "Bubnjar",
  "Warlord": "Vojni Zapovjednik",
  "Grand Magus": "Opsadni Toranj",
  "Unit 26": "Samuraj",
  "Unit 27": "KhanGuard",
  "Gold Mine": "Rudnik zlata",
  "Iron Mine": "Rudnik željeza",
  "Lumber Mill": "Drvarnica",
  "Farm": "Farma",
  "Homes": "Nastambe",
  "Barracks": "Vojarna",
  "Stables": "Staja",
  "Guild": "Radionica",
  "Market": "Tržnica",
  "Training Grounds": "Kovačnica",
  "Hospital": "Ambulanta",
  "Wall": "Zid",
  "Order": "Crkva",
  "Guard Station": "Sklonište",
  "Store House": "Skladišta",
  "Gold": "Zlato",
  "Iron": "Željezo",
  "Wood": "Drvo",
  "Food": "Hrana",
  "People": "Ljudi",
  "Warrior": "Ratnik",
  "Cavalryman": "Calvaryman",
  "Defender": "Obranioc",
  "Archer": "Strijelac",
  "Scout": "Izviđač",
  "Merchant": "Financije",
  "Mystic": "Opsada"
}

Translation["LT"] = {
  "Pikeman": "Ietininkai",
  "Swordsman": "Kariai su kardais",
  "Axeman": "Kariai su kirviais",
  "Maceman": "Vėzdininkai",
  "Ogre": "Alebardininkai",
  "Berserker": "Kryžiuočių riteriai",
  "Golem": "Huskarlai",
  "Rogue": "Janičarai",
  "Quickwalker": "Šnipai",
  "Light Cavalry": "Lengvoji kavalerija",
  "Heavy Cavalry": "Sunkioji kavalerija",
  "Warmage": "Taranai",
  "Arcanist": "Balista",
  "Fireslinger": "Katapultos",
  "Stormcaller": "Trebušetai",
  "Shortbowman": "Šauliai su mažu lanku",
  "Longbowman": "Šauliai su dideliu lanku",
  "Crossbowman": "Arbaletininkai",
  "Cavalry Archer": "Raiti šauliai",
  "Nobleman": "Bajorai",
  "High Priest": "Tangra kunigas",
  "Airweaver": "Vienuoliai",
  "Elf Lord": "Būgnininkai",
  "Warlord": "Karvedžiai",
  "Grand Magus": "Apgulties bokštai",
  "Unit 26": "Samurajai",
  "Unit 27": "Sargybinis",
  "Gold Mine": "Aukso kasykla",
  "Iron Mine": "Geležies kasykla",
  "Lumber Mill": "Medkirčių namelis",
  "Farm": "Ferma",
  "Homes": "Namai",
  "Barracks": "Kareivinės",
  "Stables": "Arklidės",
  "Guild": "Dirbtuvės",
  "Market": "Turgus",
  "Training Grounds": "Kalvė",
  "Hospital": "Gydykla",
  "Wall": "Miesto siena",
  "Order": "Orderis",
  "Guard Station": "Slėptuvė",
  "Store House": "Sandėlis",
  "Warrior": "Karys",
  "Cavalryman": "Raitelis",
  "Defender": "Gynėjas",
  "Archer": "Šaulys",
  "Scout": "Žvalgas",
  "Merchant": "Ekonomistas",
  "Mystic": "Apgulties specialistas",
  "Gold": "Aukso",
  "Iron": "Geležies",
  "Wood": "Medienos",
  "Food": "Maisto",
  "People": "Žmonių"
}

Translation["NL"] = {
  "Pikeman": "Speerman",
  "Swordsman": "Zwaardman",
  "Axeman": "Bijlman",
  "Maceman": "Knotsman",
  "Ogre": "Gevechts-Bijlman",
  "Berserker": "Germaanse ridder",
  "Golem": "Huskarl",
  "Rogue": "Janitsaren",
  "Quickwalker": "Snelloper",
  "Light Cavalry": "Lichte cavalerie",
  "Heavy Cavalry": "Zware cavalerie",
  "Warmage": "Ram",
  "Arcanist": "Ballista",
  "Fireslinger": "Katapult",
  "Stormcaller": "Blijde",
  "Shortbowman": "Kortboog schutter",
  "Longbowman": "Langboog Sch.",
  "Crossbowman": "Kruisboogschutter",
  "Cavalry Archer": "Boogschutter te paard",
  "Nobleman": "Edelman",
  "High Priest": "Tangra priester",
  "Airweaver": "Heilige",
  "Elf Lord": "Drummer",
  "Warlord": "Krijgsheer",
  "Grand Magus": "Belegerings Toren",
  "Unit 26": "Samoerai",
  "Unit 27": "KhanBewaker",
  "Gold Mine": "Goudmijn",
  "Iron Mine": "IJzermijn",
  "Lumber Mill": "Houthakkers",
  "Farm": "Boerderijen",
  "Homes": "Huizen",
  "Barracks": "Barakken",
  "Stables": "Stal",
  "Guild": "Werkplaats",
  "Market": "Marktplaats",
  "Training Grounds": "Smederij",
  "Hospital": "Ziekenhuis",
  "Wall": "Muur",
  "Order": "Klooster",
  "Guard Station": "Schuilplaats",
  "Store House": "Opslagplaatsen",
  "Warrior": "Strijder",
  "Cavalryman": "Cavalerist",
  "Defender": "Verdediger",
  "Archer": "Boogschutter",
  "Scout": "Verkenner",
  "Merchant": "Financiën",
  "Mystic": "Belegering",
  "Gold": "Goud",
  "Iron": "IJzer",
  "Wood": "Hout",
  "Food": "Voedsel",
  "People": "Aantal"
}

Translation["NO"] = {
    "Pikeman": "Pikener",
  "Swordsman": "Sverdmann",
  "Axeman": "Øksemann",
  "Maceman": "Stridsklubbemann",
  "Ogre": "Stridsøksemann",
  "Berserker": "Korsfarer",
  "Golem": "Huskarl",
  "Rogue": "Mujahedin",
  "Quickwalker": "Speider",
  "Light Cavalry": "Lett kavaleri",
  "Heavy Cavalry": "Tungt kavaleri",
  "Warmage": "Rambukk",
  "Arcanist": "Ballista",
  "Fireslinger": "Katapult",
  "Stormcaller": "Blide",
  "Shortbowman": "Kortbueskytter",
  "Longbowman": "Langbueskytter",
  "Crossbowman": "Armbrøstskytter",
  "Cavalry Archer": "Ridende bueskyttere",
  "Nobleman": "Adelsmann",
  "High Priest": "Tangraprest",
  "Airweaver": "Munk",
  "Elf Lord": "Trommeslager",
  "Warlord": "Krigsherre",
  "Grand Magus": "Beleiringstårn",
  "Unit 26": "Samurai",
  "Unit 27": "Khanvakt",
  "Gold Mine": "Gullgruve",
  "Iron Mine": "Jerngruve",
  "Lumber Mill": "Vedbod",
  "Farm": "Gårdsbruk",
  "Homes": "Boliger",
  "Barracks": "Kaserne",
  "Stables": "Stall",
  "Guild": "Verksted",
  "Market": "Markedsplass",
  "Training Grounds": "Smie",
  "Hospital": "Sykehus",
  "Wall": "Bymur",
  "Order": "Orden",
  "Guard Station": "Gjemmested",
  "Store House": "Lager",
  "Warrior": "Kriger",
  "Cavalryman": "Kavalerist",
  "Defender": "Forsvarer",
  "Archer": "Bueskytter",
  "Scout": "Hurtighet",
  "Merchant": "Økonomi",
  "Mystic": "Beleiring",
  "Gold": "Gull",
  "Iron": "Jern",
  "Wood": "Tre",
  "Food": "Mat",
  "People": "Folk"
}

Translation["SE"] = {
  "Pikeman": "Falanx",
  "Swordsman": "Svärdsman",
  "Axeman": "Yxman",
  "Maceman": "Klubbkämpe",
  "Ogre": "KrigsYxman",
  "Berserker": "Korsriddare",
  "Golem": "Livgardet",
  "Rogue": "Mujahideen",
  "Quickwalker": "Spejare",
  "Light Cavalry": "Lätt kavalleri",
  "Heavy Cavalry": "Tungt Kavalleri",
  "Warmage": "Murbräcka",
  "Arcanist": "Armborstmaskin",
  "Fireslinger": "Katapult",
  "Stormcaller": "Träbock",
  "Shortbowman": "Bågskytt",
  "Longbowman": "Långbågskytt",
  "Crossbowman": "Armborstskytt",
  "Cavalry Archer": "Ridande bågskytt",
  "Nobleman": "Adelsman",
  "High Priest": "Tangrapräst",
  "Airweaver": "undefined",
  "Elf Lord": "Trummare",
  "Warlord": "Krigsherre",
  "Grand Magus": "Belägringstorn",
  "Unit 26": "Samuraj",
  "Unit 27": "KhanVakt",
  "Gold Mine": "Guldgruva",
  "Iron Mine": "Järngruva",
  "Lumber Mill": "Skogshygge",
  "Farm": "Jordbruk",
  "Homes": "Bostäder",
  "Barracks": "Kasern",
  "Stables": "Stall",
  "Guild": "Verkstad",
  "Market": "Marknad",
  "Training Grounds": "Smedja",
  "Hospital": "Sjukstuga",
  "Wall": "Stadsmur",
  "Order": "Orden",
  "Guard Station": "Gömställe",
  "Store House": "Magasin",
  "Warrior": "Krigare",
  "Cavalryman": "Kavalleriryttare",
  "Defender": "Försvarare",
  "Archer": "Bågskytt",
  "Scout": "Snabbhet",
  "Merchant": "Ekonomi",
  "Mystic": "Belägring",
  "Gold": "Guld",
  "Iron": "Järn",
  "Wood": "Trä",
  "Food": "Mat",
  "People": "Folk"
}

Translation["UA"] = {
  "Pikeman": "Списник",
  "Swordsman": " Мечник ",
  "Axeman": "Дружинник ",
  "Maceman": "Воїн з булавою",
  "Ogre": "Дружинник із сокирою ",
  "Berserker": "Тевтонський лицар",
  "Golem": "Хускарл ",
  "Rogue": "Яничар",
  "Quickwalker": "Розвідник",
  "Light Cavalry": "Легка кавалерія",
  "Heavy Cavalry": "Важка кавалерія ",
  "Warmage": "Таран",
  "Arcanist": "Баліста",
  "Fireslinger": "Катапульта",
  "Stormcaller": "Требушет ",
  "Shortbowman": "Лучник з коротким луком",
  "Longbowman": "Лучник з довгим луком",
  "Crossbowman": "Арбалетник",
  "Cavalry Archer": "Кінний лучник",
  "Nobleman": "Аристократ ",
  "High Priest": "Жрець Тангри",
  "Airweaver": "Чернець",
  "Elf Lord": "Барабанщик ",
  "Warlord": "Полководець",
  "Grand Magus": "Облогова Вежа",
  "Unit 26": "Самурай",
  "Unit 27": "KhanGuard",
  "Gold Mine": "Золота шахта",
  "Iron Mine": "Залізний рудник",
  "Lumber Mill": "Лісопилка",
  "Farm": "Ферма",
  "Homes": "Поселення ",
  "Barracks": "Казарма",
  "Stables": "Стайня ",
  "Guild": "Майстерня",
  "Market": "Ринок",
  "Training Grounds": "Кузня",
  "Hospital": "Лазарет ",
  "Wall": "Стіна",
  "Order": "Орден",
  "Guard Station": "Схованка ",
  "Store House": "Склади ",
  "Warrior": "Воїн ",
  "Cavalryman": "Кавалерист ",
  "Defender": "Захисник",
  "Archer": "Лучник",
  "Scout": "Скаут",
  "Merchant": "Фінанси",
  "Mystic": "Облога",
  "Gold": "Золото",
  "Iron": "Залізо",
  "Wood": "Дерево",
  "Food": "Провізія",
  "People": "Населення"
}

Translation["HU"] = {
  "Pikeman": "Lándzsás",
  "Swordsman": "Kardforgató",
  "Axeman": "Fejszés",
  "Maceman": "Buzogányos",
  "Ogre": "Alabárdos",
  "Berserker": "Teutonlovag",
  "Golem": "Huscarl",
  "Rogue": "Janicsár",
  "Quickwalker": "Gyorsfutó",
  "Light Cavalry": "Könnyű lovasság",
  "Heavy Cavalry": "Nehéz lovasság",
  "Warmage": "Faltörő kos ",
  "Arcanist": "Balliszta",
  "Fireslinger": "Katapult",
  "Stormcaller": "Trebuchet",
  "Shortbowman": "Könnyű íjász",
  "Longbowman": "Nehéz íjász",
  "Crossbowman": "Nyílpuskás íjász",
  "Cavalry Archer": "Lovasíjász",
  "Nobleman": "Nemes",
  "High Priest": "Tangra papja",
  "Airweaver": "Pap",
  "Elf Lord": "Dobos",
  "Warlord": "Hadvezér",
  "Grand Magus": "Ostrom Torony",
  "Unit 26": "Szamuráj",
  "Unit 27": "KhánŐrség",
  "Gold Mine": "Aranybánya",
  "Iron Mine": "Vasbánya",
  "Lumber Mill": "Fatelep",
  "Farm": "Farmok",
  "Homes": "Lakóházak",
  "Barracks": "Kaszárnya",
  "Stables": "Istálló",
  "Guild": "Műhely",
  "Market": "Piac",
  "Training Grounds": "Fegyverkovács",
  "Hospital": "Katonai kórház",
  "Wall": "Várfal",
  "Order": "Rendház",
  "Guard Station": "Rejtekhely",
  "Store House": "Raktárak",
  "Warrior": "Harcos",
  "Cavalryman": "Huszár",
  "Defender": "Védő",
  "Archer": "Íjász",
  "Scout": "Felderítő",
  "Merchant": "Penzügy",
  "Mystic": "Ostrom",
  "Gold": "arany",
  "Iron": "vas",
  "Wood": "Fa",
  "Food": "ennivaló",
  "People": "Ember/ek"
}

Translation["AE"] = {
  "Pikeman": "مقاتل الرمح",
  "Swordsman": "مقاتل السيف",
  "Axeman": "مقاتل الفأس",
  "Maceman": "مقاتل الصولجان",
  "Ogre": "مقاتل الفأس",
  "Berserker": "فرسان التيوتونيك",
  "Golem": "الفايكنج",
  "Rogue": "الإنكشارية",
  "Quickwalker": "جواسيس",
  "Light Cavalry": "الفرسان الخفيفة",
  "Heavy Cavalry": "الفرسان الثقيلة",
  "Warmage": "محطمة الابواب",
  "Arcanist": "مقلاع السهم العملاق",
  "Fireslinger": "المنجنيق",
  "Stormcaller": "مقلاع الحجارة",
  "Shortbowman": "رماة القوس القصير",
  "Longbowman": "رماة القوس الطويل",
  "Crossbowman": "رماة القوس المتقطع",
  "Cavalry Archer": "فرسان الاسهم",
  "Nobleman": "النبلاء",
  "High Priest": "الرجل الصالح",
  "Airweaver": "متعبد",
  "Elf Lord": "طبال",
  "Warlord": "امير الحرب",
  "Grand Magus": "ابراج الدفاع",
  "Unit 26": "الساموراي",
  "Unit 27": "حرس الملك",
  "Gold Mine": "منجم الذهب",
  "Iron Mine": "منجم الحديد",
  "Lumber Mill": "معمل النشارة",
  "Farm": "المزارع",
  "Homes": "المساكن",
  "Barracks": "الثكنات",
  "Stables": "الاسطبل",
  "Guild": "الورشة",
  "Market": "السوق",
  "Training Grounds": "الحداد",
  "Hospital": "المستشفى",
  "Wall": "الحائط",
  "Order": "قصر الحكم",
  "Guard Station": "المخبأ",
  "Store House": "المخازن",
  "Warrior": "القتال",
  "Cavalryman": "الفروسية",
  "Defender": "المدافع",
  "Archer": "الرماة",
  "Scout": "الخيول",
  "Merchant": "الموارد",
  "Mystic": "فك الحصار",
  "Gold": "الذهب",
  "Iron": "الحديد",
  "Wood": "الخشب",
  "Food": "الطعام",
  "People": "الافراد"
};

Translation["IL"] = {
  "Pikeman": "כִּידוֹנאי",
  "Swordsman": "סַיָּף",
  "Axeman": "גַּרְזֶנאי",
  "Maceman": "איש השרביט",
  "Ogre": "איש הגרזן",
  "Berserker": "אביר טֶוְטוֹנִי",
  "Golem": "סקסוני",
  "Rogue": "ג'נייס",
  "Quickwalker": "פרש ברק",
  "Light Cavalry": "חֵיל פָּרָשִׁים קל",
  "Heavy Cavalry": "חֵיל פָּרָשִׁים כבד",
  "Warmage": "אֵיל הבַּרְזֶל",
  "Arcanist": "בליסטיקן",
  "Fireslinger": "מקלעת כבדה",
  "Stormcaller": "טרמיניטור",
  "Shortbowman": "קַשָּׁת קָצָר טְוָח",
  "Longbowman": "קַשָּׁת אָרוךְ טְוָח",
  "Crossbowman": "קשת מוצלב",
  "Cavalry Archer": "פרש-קשת",
  "Nobleman": "איש אצולה",
  "High Priest": "כומר טנגרה",
  "Airweaver": "נזיר",
  "Elf Lord": "מתופף",
  "Warlord": "Warlord",
  "Grand Magus": "מגדל מצור",
  "Unit 26": "סמוראי",
  "Unit 27": "KhanGuard",
  "Gold Mine": "מכרה זהב",
  "Iron Mine": "מכרה ברזל",
  "Lumber Mill": "מכרה עץ",
  "Farm": "חוות",
  "Homes": "בתי מגורים",
  "Barracks": "בסיס צבאי",
  "Stables": "אֻרְוות",
  "Guild": "בֵּית מְלָאכָה",
  "Market": "שׁוּק",
  "Training Grounds": "בית הנפח",
  "Hospital": "בית חולים",
  "Wall": "חומה",
  "Order": "מיסדר",
  "Guard Station": "מסתור",
  "Store House": "בתי אִחְסוּן",
  "Warrior": "לוֹחֵם",
  "Cavalryman": "ה-פָּרָשִׁ",
  "Defender": "מֵגֵן",
  "Archer": "קַשָּׁת",
  "Scout": "סַיָּר",
  "Merchant": "כְּסָפִים",
  "Mystic": "מָצוֹר",
  "Gold": "זהב",
  "Iron": "ברזל",
  "Wood": "עצים",
  "Food": "אוכל",
  "People": "חיילים"
}

Translation["IR"] = {
  "Pikeman": "نیزه دار",
  "Swordsman": "شمشیرزن",
  "Axeman": "تبرزن",
  "Maceman": "گرز دار",
  "Ogre": "تبر زن جنگی",
  "Berserker": "شوالیه توتنی",
  "Golem": "گارد مخصوص",
  "Rogue": "سرباز پياده نظام",
  "Quickwalker": "جاسوسان",
  "Light Cavalry": "سواره نطام سبک",
  "Heavy Cavalry": "سواره نظام سنگین",
  "Warmage": "دژکوب",
  "Arcanist": "بالستیک",
  "Fireslinger": "منجنیق",
  "Stormcaller": "منجنيق قلعه کوش",
  "Shortbowman": "کمانداران با کمان های کوتاه",
  "Longbowman": "کماندار با کمان بلند",
  "Crossbowman": "کمان گیر با کمان صليبى",
  "Cavalry Archer": "کماندار سواره",
  "Nobleman": "نجیب زاده",
  "High Priest": "کشیش تانگارا",
  "Airweaver": "راهب",
  "Elf Lord": "کوس زن",
  "Warlord": "ارباب جنگ",
  "Grand Magus": "برج محاصره",
  "Unit 26": "سامورائی",
  "Unit 27": "گارد خان",
  "Gold Mine": "معدن طلا",
  "Iron Mine": "معدن آهن",
  "Lumber Mill": "چوب بری",
  "Farm": "مزرعه",
  "Homes": "خانه",
  "Barracks": "سربازخانه",
  "Stables": "اصطبل ها",
  "Guild": "کارگاه",
  "Market": "بازار",
  "Training Grounds": "آهنگری",
  "Hospital": "درمانگاه",
  "Wall": "دیوار",
  "Order": "قصر",
  "Guard Station": "پناهگاه",
  "Store House": "انبارها",
  "Warrior": "جنگجو",
  "Cavalryman": "جنجگوی سواره",
  "Defender": "مدافع",
  "Archer": "کماندار",
  "Scout": "پيشاهنگ",
  "Merchant": "سرمايه گذارى",
  "Mystic": "محاصره",
  "Gold": "طلا",
  "Iron": "آهن",
  "Wood": "چوب",
  "Food": "غذا",
  "People": "تعدادافراد"
}

Translation["JP"] = {
  "Pikeman": "槍兵",
  "Swordsman": "剣兵",
  "Axeman": "斧兵",
  "Maceman": "戦棍兵",
  "Ogre": "戦斧兵",
  "Berserker": "チュートンナイト",
  "Golem": "ハスカール",
  "Rogue": "ムジャヒディン",
  "Quickwalker": "斥候騎兵",
  "Light Cavalry": "軽騎兵隊",
  "Heavy Cavalry": "重騎兵隊",
  "Warmage": "大型衝車",
  "Arcanist": "小型衝車",
  "Fireslinger": "大型投石器",
  "Stormcaller": "小型投石器",
  "Shortbowman": "弓兵（ショートボウ）",
  "Longbowman": "弓兵（ロングボウ）",
  "Crossbowman": "弓兵（クロスボウ）",
  "Cavalry Archer": "弓騎兵",
  "Nobleman": "貴族",
  "High Priest": "テーングラー僧",
  "Airweaver": "聖職者",
  "Elf Lord": "ドラマー",
  "Warlord": "将軍",
  "Grand Magus": "包囲塔",
  "Unit 26": "侍",
  "Unit 27": "カンの護衛",
  "Gold Mine": "金鉱",
  "Iron Mine": "鉄鉱",
  "Lumber Mill": "伐採場",
  "Farm": "農場",
  "Homes": "住居",
  "Barracks": "兵舎",
  "Stables": "騎兵訓練所",
  "Guild": "作業場",
  "Market": "市場",
  "Training Grounds": "鍛冶屋",
  "Hospital": "診療所",
  "Wall": "城壁",
  "Order": "司令塔",
  "Guard Station": "隠し倉庫",
  "Store House": "倉庫",
  "Gold Mine": "金鉱",
  "Iron Mine": "鉄鉱",
  "Lumber Mill": "伐採場",
  "Farm": "農場",
  "Homes": "住居",
  "Barracks": "兵舎",
  "Stables": "騎兵訓練所",
  "Guild": "作業場",
  "Market": "市場",
  "Training Grounds": "鍛冶屋",
  "Hospital": "診療所",
  "Wall": "城壁",
  "Order": "司令塔",
  "Guard Station": "隠し倉庫",
  "Store House": "倉庫",
  "Gold": "黄金",
  "Iron": "鉄",
  "Wood": "木材",
  "Food": "食糧",
  "People": "軍人の数"
}

// select language
// if host/language not found, default Utopia Kingdoms values are used
var Lang = "";
var Protocol = window.location.protocol + "//";
var Host = Protocol + window.location.host;
var StrippedHost = /[^.]+?\.(.+)$/i.exec(window.location.hostname);
StrippedHost ? StrippedHost = StrippedHost[1] : StrippedHost = "";
switch (StrippedHost) {
  case "khanwars.com": Lang = "EN"; break;
  case "guerrakhan.com": Lang = "BR"; break;
  case "lesseigneurs.fr": Lang = "FR"; break;
  case "khanwars.com.pt": Lang = "PT"; break;
  case "khanwars.es": Lang = "ES"; break;
  case "khanwars.cl": Lang = "CL"; break;
  case "deche.vn": Lang = "VN"; break;
  case "khanwars.ro": Lang = "RO"; break;
  case "khanwars.pl": Lang = "PL"; break;
  case "hansavaslari.com": Lang = "TR"; break;
  case "khanwars.it": Lang = "IT"; break;
  case "zarenkriege.de": Lang = "DE"; break;
  case "hanovete.com": Lang = "BG"; break;
  case "khanratnik.com": Lang = "HR"; break;
  case "draugas.lt": Lang = "LT"; break;
  case "khanwars.nl": Lang = "NL"; break;
  case "khanwars.no": Lang = "NO"; break;
  case "khanwars.se": Lang = "SE"; break;
  case "pravyteli.com": Lang = "UA"; break;
  case "khanwars.hu": Lang = "HU"; break;
  case "khanwars.ae": Lang = "AE"; break;
  case "khanwars.jp": Lang = "JP"; break;
  case "khanwars.ir": Lang = "IR"; break;
  case "lordwars.co.il": Lang = "IL"; break;
}

// end internationalisation
/******************************************************************************/

// cross-domain XPath screwed up as of FF3.6
// this fix courtesy of http://angusdev.blogspot.com/2010/02/fixing-xpath-problem-in-firefox-36.html
var isFF36up = false;
if (navigator.userAgent) {
  var ffver = navigator.userAgent.match(/Firefox\/3\.(\d+)/);
  isFF36up = ffver && parseInt(ffver[1], 10) >= 6;
}
var nsResolver = {
  lookupNamespaceURI:function (prefix) {
    if (isFF36up && prefix == "ns") {
      return "http://www.w3.org/1999/xhtml";
    } else {
      return "";
    }
  }
};

// uncomment to check translation of specific language in error console
/*
for (var N in Words) {
  GM_log(Words[N] + "------------" + Translation["PT"][N])
}
*/

// global constants

var DefenderLevels = [0, 10, 15, 30];
var WarriorLevels = [0, 5, 15, 30];
var CavalryLevels = [0, 20, 30, 40];
var ArcherLevels = [0, 20, 40, 60];
var MysticLevels = [0, 10, 20, 30];
var ScoutLevels = [0, 30, 80, 150];
var MerchantLevels = [15, 12.5, 10, 6];

var Units = [];
Units["u1"] = {
  "name": Translate("Pikeman"), "pop": 1, "speed": 10, "carry": 25, "life": 50,
  "range": 1, "infantry": 10, "cavalry": 50, "archer": 10, "building": 10,
  "mystic": 10, "wallcrasher": 0,
  "gold": 30, "iron": 30, "wood": 50, "food": 15
};
Units["u2"] = {
  "name": Translate("Swordsman"), "pop": 1, "speed": 15, "carry": 15, "life": 50,
  "range": 1, "infantry": 30, "cavalry": 15, "archer": 30, "building": 10,
  "mystic": 30, "wallcrasher": 0,
  "gold": 30, "iron": 65, "wood": 30, "food": 15
};
Units["u3"] = {
  "name": Translate("Axeman"), "pop": 1, "speed": 10, "carry": 10, "life": 40,
  "range": 1, "infantry": 40, "cavalry": 5, "archer": 40, "building": 10,
  "mystic": 40, "wallcrasher": 0,
  "gold": 10, "iron": 45, "wood": 35, "food": 50
};
Units["u4"] = {
  "name": Translate("Maceman"), "pop": 1, "speed": 12, "carry": 20, "life": 40,
  "range": 1, "infantry": 35, "cavalry": 10, "archer": 35, "building": 10,
  "mystic": 35, "wallcrasher": 0,
  "gold": 45, "iron": 10, "wood": 30, "food": 50
};
Units["u5"] = {
  "name": Translate("Ogre"), "pop": 10, "speed": 12, "carry": 25, "life": 290,
  "range": 1, "infantry": 60, "cavalry": 110, "archer": 60, "building": 10,
  "mystic": 60, "wallcrasher": 0,
  "gold": 0, "iron": 300, "wood": 300, "food": 150
};
Units["u6"] = {
  "name": Translate("Berserker"), "pop": 10, "speed": 20, "carry": 15, "life": 400,
  "range": 1, "infantry": 140, "cavalry": 40, "archer": 140, "building": 10,
  "mystic": 140, "wallcrasher": 0,
  "gold": 150, "iron": 500, "wood": 100, "food": 200
};
Units["u7"] = {
  "name": Translate("Golem"), "pop": 10, "speed": 20, "carry": 15, "life": 300,
  "range": 1, "infantry": 120, "cavalry": 50, "archer": 120, "building": 10,
  "mystic": 120, "wallcrasher": 0,
  "gold": 150, "iron": 400, "wood": 150, "food": 150
};
Units["u8"] = {
  "name": Translate("Rogue"), "pop": 10, "speed": 10, "carry": 35, "life": 310,
  "range": 1, "infantry": 115, "cavalry": 90, "archer": 115, "building": 10,
  "mystic": 115, "wallcrasher": 0,
  "gold": 100, "iron": 150, "wood": 150, "food": 400
};
Units["u9"] = {
  "name": Translate("Quickwalker"), "pop": 2, "speed": 5, "carry": 1, "life": 100,
  "range": 1, "infantry": 5, "cavalry": 5, "archer": 5, "building": 0,
  "mystic": 5, "wallcrasher": 0,
  "gold": 10, "iron": 40, "wood": 45, "food": 50
};
Units["u10"] = {
  "name": Translate("Light Cavalry"), "pop": 4, "speed": 6, "carry": 90, "life": 200,
  "range": 1, "infantry": 100, "cavalry": 50, "archer": 100, "building": 0,
  "mystic": 100, "wallcrasher": 0,
  "gold": 120, "iron": 120, "wood": 50, "food": 250
};
Units["u11"] = {
  "name": Translate("Heavy Cavalry"), "pop": 6, "speed": 7, "carry": 55, "life": 500,
  "range": 1, "infantry": 250, "cavalry": 150, "archer": 250, "building": 0,
  "mystic": 250, "wallcrasher": 0,
  "gold": 300, "iron": 250, "wood": 100, "food": 100
};
Units["u12"] = {
  "name": Translate("Warmage"), "pop": 5, "speed": 25, "carry": 60, "life": 200,
  "range": 1, "infantry": 0, "cavalry": 0, "archer": 0, "building": 180,
  "mystic": 0, "wallcrasher": 1,
  "gold": 250, "iron": 500, "wood": 750, "food": 250
};
Units["u13"] = {
  "name": Translate("Arcanist"), "pop": 6, "speed": 25, "carry": 15, "life": 300,
  "range": 5, "infantry": 150, "cavalry": 150, "archer": 150,
  "building": 120, "mystic": 70, "wallcrasher": 1,
  "gold": 125, "iron": 250, "wood": 625, "food": 500
};
Units["u14"] = {
  "name": Translate("Fireslinger"), "pop": 8, "speed": 30, "carry": 15, "life": 400,
  "range": 5, "infantry": 25, "cavalry": 10, "archer": 25, "building": 110,
  "mystic": 25, "wallcrasher": 1,
  "gold": 863, "iron": 250, "wood": 500, "food": 250
};
Units["u15"] = {
  "name": Translate("Stormcaller"), "pop": 10, "speed": 30, "carry": 15, "life": 500,
  "range": 5, "infantry": 25, "cavalry": 10, "archer": 25, "building": 90,
  "mystic": 25, "wallcrasher": 1,
  "gold": 500, "iron": 750, "wood": 2000, "food": 250
};
Units["u16"] = {
  "name": Translate("Shortbowman"), "pop": 1, "speed": 12, "carry": 25, "life": 15,
  "range": 3, "infantry": 15, "cavalry": 5, "archer": 15, "building": 20,
  "mystic": 15, "wallcrasher": 0,
  "gold": 15, "iron": 10, "wood": 20, "food": 10
};
Units["u17"] = {
  "name": Translate("Longbowman"), "pop": 1, "speed": 12, "carry": 15, "life": 40,
  "range": 4, "infantry": 25, "cavalry": 35, "archer": 15, "building": 20,
  "mystic": 15, "wallcrasher": 1,
  "gold": 50, "iron": 10, "wood": 70, "food": 20
};
Units["u18"] = {
  "name": Translate("Crossbowman"), "pop": 1, "speed": 14, "carry": 20, "life": 40,
  "range": 4, "infantry": 40, "cavalry": 30, "archer": 40, "building": 20,
  "mystic": 40, "wallcrasher": 1,
  "gold": 50, "iron": 25, "wood": 40, "food": 20
};
Units["u19"] = {
  "name": Translate("Cavalry Archer"), "pop": 5, "speed": 6, "carry": 60, "life": 130,
  "range": 4, "infantry": 100, "cavalry": 40, "archer": 100, "building": 70,
  "mystic": 100, "wallcrasher": 1,
  "gold": 200, "iron": 300, "wood": 250, "food": 150
};
Units["u20"] = {
  "name": Translate("Nobleman"), "pop": 100, "speed": 30, "carry": 100, "life": 300,
  "range": 1, "infantry": 30, "cavalry": 100, "archer": 30, "building": 10,
  "mystic": 30, "wallcrasher": 0,
  "gold": 44000, "iron": 44000, "wood": 48400, "food": 65535
};
Units["u21"] = {
  "name": Translate("High Priest"), "pop": 10, "speed": 15, "carry": 5, "life": 75,
  "range": 1, "infantry": 30, "cavalry": 30, "archer": 30, "building": 10,
  "mystic": 30, "wallcrasher": 0,
  "gold": 600, "iron": 100, "wood": 100, "food": 20
};
Units["u22"] = {
  "name": Translate("Airweaver"), "pop": 10, "speed": 15, "carry": 5, "life": 65,
  "range": 1, "infantry": 30, "cavalry": 30, "archer": 30, "building": 10,
  "mystic": 30, "wallcrasher": 0,
  "gold": 500, "iron": 50, "wood": 100, "food": 150
};
Units["u23"] = {
  "name": Translate("Elf Lord"), "pop": 10, "speed": 15, "carry": 10, "life": 80,
  "range": 1, "infantry": 30, "cavalry": 30, "archer": 30, "building": 10,
  "mystic": 30, "wallcrasher": 0,
  "gold": 650, "iron": 50, "wood": 50, "food": 200
};
Units["u24"] = {
  "name": Translate("Warlord"), "pop": 10, "speed": 8, "carry": 70, "life": 600,
  "range": 1, "infantry": 150, "cavalry": 125, "archer": 250, "building": 0,
  "mystic": 250, "wallcrasher": 0,
  "gold": 150, "iron": 300, "wood": 150, "food": 150
};
Units["u25"] = {
  "name": Translate("Grand Magus"), "pop": 10, "speed": 20, "carry": 100, "life": 400,
  "range": 1, "infantry": 150, "cavalry": 100, "archer": 150, "building": 0,
  "mystic": 100, "wallcrasher": 0,
  "gold": 100, "iron": 300, "wood": 700, "food": 300
};
Units["u26"] = {
  "name": "Samurai", "pop": 10, "speed": 5, "carry": 30, "life": 700,
  "range": 1, "infantry": 100, "cavalry": 100, "archer": 180, "building": 0,
  "mystic": 200, "wallcrasher": 0,
  "gold": 150, "iron": 250, "wood": 50, "food": 100
};
Units["u27"] = {
  "name": "KhanGuard", "pop": 10, "speed": 15, "carry": 80, "life": 400,
  "range": 1, "infantry": 150, "cavalry": 100, "archer": 200, "building": 0,
  "mystic": 250, "wallcrasher": 0,
  "gold": 100, "iron": 250, "wood": 100, "food": 300
};

var InfantryList = {"u1": null, "u2": null, "u3": null, "u4": null};
var ArcherList  = {"u16": null, "u17": null, "u18": null, "u19": null};
var CavalryList = {"u9": null, "u10": null, "u11": null};
var MysticList  = {"u12": null, "u13": null, "u14": null, "u15": null};
var RaceSpecific = {
  "u5": null, "u6": null, "u7": null, "u8": null,
  "u21": null, "u22": null, "u23": null, "u24": null, "u25": null,
  "u26": null, "u27": null
};
var Unupgraded = eval(RaceSpecific.toSource());
Unupgraded["u9"] = null; Unupgraded["u20"] = null;
var JunkList = {"u1": null, "u2": null, "u3": null, "u4": null, "u16": null};

var GuardLevels = [0, 200, 280, 380, 500, 666, 910, 1220, 1660, 2222, 3000];
var StoreLevels = [
  500, 1000, 1235, 1516, 1890, 2293, 2816, 3462, 4259, 5239, 6445, 7925, 9750,
  11990, 14750, 18150, 22315, 28000, 33799, 41535, 51045, 62821, 77289, 95042,
  116900, 143788, 176869, 217539, 267590, 323113, 400000
];

var Buildings = [
  [],
  [
    Translate("Gold Mine"),
    [30, 65, 40, 45, "00:02:30"],
    [47, 103, 63, 71, "00:03:58"],
    [60, 130, 80, 90, "00:05:00"],
    [75, 163, 100, 113, "00:06:18"],
    [95, 206, 127, 142, "00:07:56"],
    [120, 260, 160, 180, "00:10:00"],
    [151, 327, 201, 226, "00:12:36"],
    [190, 412, 254, 285, "00:15:52"],
    [240, 520, 320, 360, "00:20:00"],
    [302, 655, 403, 453, "00:25:10"],
    [381, 826, 508, 571, "00:31:46"],
    [480, 1040, 640, 720, "00:40:01"],
    [605, 1311, 807, 907, "00:50:26"],
    [762, 1652, 1016, 1143, "01:03:33"],
    [960, 2081, 1281, 1441, "01:20:04"],
    [1210, 2623, 1614, 1816, "01:40:53"],
    [1525, 3305, 2034, 2288, "02:07:07"],
    [1922, 4164, 2562, 2883, "02:40:10"],
    [2421, 5247, 3229, 3632, "03:21:49"],
    [3051, 6611, 4068, 4577, "04:14:18"],
    [3845, 8330, 5126, 5767, "05:20:25"],
    [4844, 10497, 6459, 7267, "06:43:43"],
    [6104, 13226, 8139, 9156, "08:28:42"],
    [7691, 16665, 10255, 11537, "10:40:57"],
    [9691, 20997, 12921, 14537, "13:27:36"],
    [12211, 26457, 16281, 18316, "16:57:35"],
    [15386, 33336, 20514, 23079, "21:22:10"],
    [19386, 42003, 25848, 29079, "26:55:31"],
    [24426, 52924, 32569, 36640, "33:55:34"],
    [30777, 66685, 41037, 46166, "42:44:49"]
  ],
  [
    Translate("Iron Mine"),
    [60, 35, 55, 45, "00:02:35"],
    [95, 55, 87, 71, "00:04:06"],
    [120, 70, 110, 90, "00:05:10"],
    [151, 88, 138, 113, "00:06:30"],
    [190, 111, 174, 142, "00:08:12"],
    [240, 140, 220, 180, "00:10:20"],
    [302, 176, 277, 226, "00:13:01"],
    [381, 222, 349, 285, "00:16:24"],
    [480, 280, 440, 360, "00:20:40"],
    [605, 352, 554, 453, "00:26:03"],
    [762, 444, 698, 571, "00:32:49"],
    [960, 560, 880, 720, "00:41:21"],
    [1210, 706, 1109, 907, "00:52:07"],
    [1525, 889, 1398, 1143, "01:05:40"],
    [1921, 1121, 1761, 1441, "01:22:44"],
    [2421, 1412, 2219, 1816, "01:44:15"],
    [3051, 1779, 2796, 2288, "02:11:21"],
    [3844, 2242, 3523, 2883, "02:45:31"],
    [4843, 2825, 4440, 3632, "03:28:33"],
    [6103, 3560, 5594, 4577, "04:22:46"],
    [7690, 4485, 7049, 5767, "05:31:06"],
    [9689, 5652, 8882, 7267, "06:57:11"],
    [12208, 7121, 11191, 9156, "08:45:39"],
    [15383, 8973, 14101, 11537, "11:02:19"],
    [19382, 11306, 17767, 14537, "13:54:32"],
    [24422, 14246, 22387, 18316, "17:31:30"],
    [30772, 17950, 28207, 23079, "22:04:54"],
    [38772, 22617, 35541, 29079, "27:49:22"],
    [48853, 28497, 44782, 36640, "35:03:25"],
    [61555, 35907, 56425, 46166, "44:10:18"]
  ],
  [
    Translate("Lumber Mill"),
    [65, 55, 35, 40, "00:02:33"],
    [103, 87, 55, 63, "00:04:02"],
    [130, 110, 70, 80, "00:05:06"],
    [163, 138, 88, 100, "00:06:25"],
    [206, 174, 111, 127, "00:08:05"],
    [260, 220, 140, 160, "00:10:12"],
    [327, 277, 176, 201, "00:12:51"],
    [412, 349, 222, 254, "00:16:11"],
    [520, 440, 280, 320, "00:20:24"],
    [655, 554, 352, 403, "00:25:43"],
    [826, 698, 444, 508, "00:32:24"],
    [1040, 880, 560, 640, "00:40:49"],
    [1311, 1109, 706, 807, "00:51:26"],
    [1652, 1398, 889, 1016, "01:04:49"],
    [2081, 1761, 1121, 1281, "01:21:40"],
    [2623, 2219, 1412, 1614, "01:42:54"],
    [3305, 2796, 1779, 2034, "02:09:40"],
    [4164, 3523, 2242, 2562, "02:43:23"],
    [5247, 4440, 2825, 3229, "03:25:51"],
    [6611, 5594, 3560, 4068, "04:19:23"],
    [8330, 7049, 4485, 5126, "05:26:49"],
    [10497, 8882, 5652, 6459, "06:51:48"],
    [13226, 11191, 7121, 8139, "08:38:52"],
    [16665, 14101, 8973, 10255, "10:53:46"],
    [20997, 17767, 11306, 12921, "13:43:45"],
    [26457, 22387, 14246, 16281, "17:17:56"],
    [33336, 28207, 17950, 20514, "21:47:48"],
    [42003, 35541, 22617, 25848, "27:27:50"],
    [52924, 44782, 28497, 32569, "34:36:16"],
    [100000, 56425, 35907, 41037, "43:36:06"]
  ],
  [
    Translate("Farm"),
    [55, 50, 35, 70, "00:02:33"],
    [87, 79, 55, 111, "00:04:02"],
    [110, 100, 70, 140, "00:05:06"],
    [138, 126, 88, 176, "00:06:25"],
    [174, 158, 111, 222, "00:08:05"],
    [220, 200, 140, 280, "00:10:12"],
    [277, 252, 176, 352, "00:12:51"],
    [349, 317, 222, 444, "00:16:11"],
    [440, 400, 280, 560, "00:20:24"],
    [554, 504, 352, 705, "00:25:43"],
    [698, 635, 444, 889, "00:32:24"],
    [880, 800, 560, 1120, "00:40:49"],
    [1109, 1008, 706, 1412, "00:51:26"],
    [1398, 1271, 889, 1779, "01:04:49"],
    [1761, 1601, 1121, 2242, "01:21:40"],
    [2219, 2017, 1412, 2825, "01:42:54"],
    [2796, 2542, 1779, 3559, "02:09:40"],
    [3523, 3203, 2242, 4485, "02:43:23"],
    [4440, 4036, 2825, 5651, "03:25:51"],
    [5594, 5086, 3560, 7120, "04:19:23"],
    [7049, 6408, 4485, 8971, "05:26:49"],
    [8882, 8074, 5652, 11304, "06:51:48"],
    [11191, 10174, 7121, 14243, "08:38:52"],
    [14101, 12819, 8973, 17946, "10:53:46"],
    [17767, 16152, 11306, 22613, "13:43:45"],
    [22387, 20351, 14246, 28492, "17:17:56"],
    [28207, 25643, 17950, 35900, "21:47:48"],
    [35541, 32310, 22617, 45234, "27:27:50"],
    [44782, 40711, 28497, 56995, "34:36:16"],
    [56425, 51296, 35907, 71814, "43:36:06"]
  ],
  [
    Translate("Homes"),
    [35, 30, 45, 40, "00:02:00"],
    [55, 47, 71, 63, "00:03:10"],
    [70, 60, 90, 80, "00:04:00"],
    [88, 75, 113, 100, "00:05:02"],
    [111, 95, 142, 127, "00:06:21"],
    [140, 120, 180, 160, "00:08:00"],
    [176, 151, 226, 201, "00:10:05"],
    [222, 190, 285, 254, "00:12:42"],
    [280, 240, 360, 320, "00:16:00"],
    [352, 302, 453, 403, "00:20:10"],
    [444, 381, 571, 508, "00:25:24"],
    [560, 480, 720, 640, "00:32:01"],
    [706, 605, 907, 807, "00:40:21"],
    [889, 762, 1143, 1016, "00:50:50"],
    [1121, 960, 1441, 1281, "01:04:03"],
    [1412, 1210, 1816, 1614, "01:20:42"],
    [1779, 1525, 2288, 2034, "01:41:42"],
    [2242, 1922, 2883, 2562, "02:08:08"],
    [2825, 2421, 3632, 3229, "02:41:27"],
    [3560, 3051, 4577, 4068, "03:23:26"],
    [4485, 3845, 5767, 5126, "04:16:20"],
    [5652, 4844, 7267, 6459, "05:22:59"],
    [7121, 6104, 9156, 8139, "06:46:57"],
    [8973, 7691, 11537, 10255, "08:32:46"],
    [11306, 9691, 14537, 12921, "10:46:05"],
    [14246, 12211, 18316, 16281, "13:34:04"],
    [17950, 15386, 23079, 20514, "17:05:44"],
    [22617, 19386, 29079, 25848, "21:32:25"],
    [28497, 24426, 36640, 32569, "27:08:27"],
    [35907, 30777, 46166, 41037, "34:11:51"]
  ],
  [
    Translate("Barracks"),
    [170, 90, 200, 100, "00:05:00"],
    [269, 142, 317, 158, "00:07:56"],
    [340, 180, 400, 200, "00:10:00"],
    [428, 226, 504, 252, "00:12:36"],
    [539, 285, 635, 317, "00:15:52"],
    [680, 360, 800, 400, "00:20:00"],
    [857, 453, 1008, 504, "00:25:12"],
    [1079, 571, 1270, 635, "00:31:45"],
    [1360, 720, 1600, 800, "00:40:01"],
    [1714, 907, 2017, 1008, "00:50:25"],
    [2160, 1143, 2541, 1270, "01:03:32"],
    [2722, 1441, 3202, 1601, "01:20:03"],
    [3429, 1815, 4035, 2017, "01:40:52"],
    [4321, 2287, 5084, 2542, "02:07:06"],
    [5445, 2882, 6406, 3203, "02:40:09"],
    [6860, 3632, 8071, 4035, "03:21:47"],
    [8644, 4576, 10170, 5085, "04:14:15"],
    [10892, 5766, 12814, 6407, "05:20:21"],
    [13724, 7265, 16146, 8073, "06:43:39"],
    [17292, 9154, 20344, 10172, "08:28:36"],
    [21788, 11535, 25633, 12816, "10:40:50"],
    [27453, 14534, 32298, 16149, "13:27:27"],
    [34591, 18313, 40696, 20348, "16:57:24"],
    [43585, 23074, 51277, 25638, "21:21:55"],
    [54917, 29074, 64609, 32304, "26:55:13"]
  ],
  [
    Translate("Stables"),
    [300, 245, 255, 235, "00:10:00"],
    [476, 388, 404, 373, "00:15:52"],
    [600, 490, 510, 470, "00:20:00"],
    [756, 617, 642, 592, "00:25:12"],
    [952, 778, 809, 746, "00:31:45"],
    [1200, 980, 1020, 940, "00:40:00"],
    [1512, 1235, 1285, 1184, "00:50:25"],
    [1905, 1556, 1619, 1492, "01:03:31"],
    [2401, 1961, 2041, 1881, "01:20:02"],
    [3025, 2470, 2571, 2370, "01:40:51"],
    [3812, 3113, 3240, 2986, "02:07:04"],
    [4803, 3922, 4083, 3762, "02:40:07"],
    [6052, 4942, 5144, 4741, "03:21:45"],
    [7626, 6228, 6482, 5973, "04:14:12"],
    [9609, 7847, 8167, 7527, "05:20:18"],
    [12107, 9887, 10291, 9484, "06:43:34"],
    [15255, 12458, 12966, 11949, "08:28:30"],
    [19221, 15697, 16338, 15056, "10:40:43"],
    [24219, 19779, 20586, 18971, "13:27:18"],
    [30516, 24921, 25938, 23904, "16:57:12"]
  ],
  [
    Translate("Guild"),
    [155, 265, 305, 235, "00:15:00"],
    [246, 420, 484, 373, "00:23:48"],
    [310, 530, 610, 470, "00:30:00"],
    [390, 667, 768, 592, "00:37:48"],
    [492, 841, 968, 746, "00:47:38"],
    [620, 1060, 1220, 940, "01:00:01"],
    [781, 1336, 1537, 1184, "01:15:37"],
    [984, 1683, 1937, 1492, "01:35:17"],
    [1240, 2121, 2441, 1881, "02:00:04"],
    [1563, 2672, 3076, 2370, "02:31:17"],
    [1969, 3367, 3875, 2986, "03:10:37"],
    [2481, 4243, 4883, 3762, "04:00:10"],
    [3127, 5346, 6153, 4741, "05:02:37"],
    [3940, 6736, 7753, 5973, "06:21:18"],
    [4964, 8487, 9769, 7527, "08:00:27"]
  ],
  [
    Translate("Market"),
    [105, 95, 105, 95, "00:06:00"],
    [166, 150, 166, 150, "00:09:31"],
    [210, 190, 210, 190, "00:12:00"],
    [264, 239, 264, 239, "00:15:07"],
    [333, 301, 333, 301, "00:19:03"],
    [420, 380, 420, 380, "00:24:00"],
    [529, 478, 529, 478, "00:30:15"],
    [667, 603, 667, 603, "00:38:07"],
    [840, 760, 840, 760, "00:48:01"],
    [1058, 958, 1058, 958, "01:00:30"],
    [1334, 1207, 1334, 1207, "01:16:14"],
    [1681, 1521, 1681, 1521, "01:36:04"],
    [2118, 1916, 2118, 1916, "02:01:03"],
    [2669, 2414, 2669, 2414, "02:32:31"],
    [3363, 3042, 3363, 3042, "03:12:10"],
    [4237, 3834, 4237, 3834, "04:02:08"],
    [5339, 4830, 5339, 4830, "05:05:06"],
    [6727, 6086, 6727, 6086, "06:24:26"],
    [8476, 7669, 8476, 7669, "08:04:23"],
    [10680, 9663, 10680, 9663, "10:10:19"],
    [13457, 12176, 13457, 12176, "12:49:00"],
    [16956, 15341, 16956, 15341, "16:08:57"],
    [21365, 19330, 21365, 19330, "20:20:52"],
    [26920, 24356, 26920, 24356, "25:38:18"],
    [33919, 30689, 33919, 30689, "32:18:16"]
  ],
  [
    Translate("Training Grounds"),
    [230, 245, 225, 185, "00:20:00"],
    [365, 388, 357, 293, "00:31:45"],
    [460, 490, 450, 370, "00:40:00"],
    [579, 617, 567, 466, "00:50:24"],
    [730, 778, 714, 587, "01:03:30"],
    [920, 980, 900, 740, "01:20:01"],
    [1159, 1235, 1134, 932, "01:40:50"],
    [1461, 1556, 1429, 1175, "02:07:03"],
    [1841, 1961, 1801, 1480, "02:40:05"],
    [2319, 2470, 2269, 1865, "03:21:42"],
    [2922, 3113, 2859, 2350, "04:14:09"],
    [3682, 3922, 3602, 2962, "05:20:14"],
    [4640, 4942, 4539, 3732, "06:43:30"],
    [5846, 6228, 5719, 4702, "08:28:24"],
    [7366, 7847, 7206, 5925, "10:40:36"],
    [9282, 9887, 9080, 7466, "13:27:09"],
    [11695, 12458, 11441, 9407, "16:57:01"],
    [14736, 15697, 14416, 11853, "21:21:26"],
    [18568, 19779, 18164, 14935, "26:54:37"],
    [23395, 24921, 22887, 18818, "33:54:25"]
  ],
  [
    Translate("Hospital"),
    [305, 245, 225, 315, "00:25:00"],
    [484, 388, 357, 500, "00:39:41"],
    [610, 490, 450, 630, "00:50:00"],
    [768, 617, 567, 793, "01:03:00"],
    [968, 778, 714, 1000, "01:19:23"],
    [1220, 980, 900, 1260, "01:40:02"],
    [1537, 1235, 1134, 1588, "02:06:02"],
    [1937, 1556, 1429, 2001, "02:38:49"],
    [2441, 1961, 1801, 2521, "03:20:06"],
    [3076, 2470, 2269, 3176, "04:12:08"]
  ],
  [
    Translate("Wall"),
    [35, 50, 100, 20, "00:06:00"],
    [55, 79, 158, 31, "00:09:31"],
    [70, 100, 200, 40, "00:12:00"],
    [88, 126, 252, 50, "00:15:07"],
    [111, 158, 317, 63, "00:19:03"],
    [140, 200, 400, 80, "00:24:00"],
    [176, 252, 504, 100, "00:30:15"],
    [222, 317, 635, 127, "00:38:07"],
    [280, 400, 800, 160, "00:48:01"],
    [352, 504, 1008, 201, "01:00:30"],
    [1332, 1905, 3810, 762, "02:62:28"],
    [1680, 2400, 4803, 960, "03:12:04"],
    [2118, 3024, 6051, 1209, "04:02:06"],
    [2667, 3813, 7626, 1524, "05:05:02"],
    [3363, 4803, 9609, 1920, "06:24:20"],
    [7060, 10085, 20175, 4035, "12:06:24"],
    [8895, 12710, 25425, 5085, "15:15:18"],
    [11210, 16015, 32035, 6405, "19:13:18"],
    [14125, 20180, 40365, 8070, "24:13:09"],
    [17800, 25430, 50860, 10170, "30:30:57"]
  ],
  [
    Translate("Order"),
    [55000, 26400, 38500, 55000, "24:00:00"],
    [88000, 44000, 60500, 88000, "38:06:08"],
    [220000, 110000, 99000, 165000, "48:00:32"]
  ],
  [
    Translate("Guard Station"),
    [45, 55, 45, 35, "00:10:00"],
    [71, 87, 71, 55, "00:15:52"],
    [90, 110, 90, 70, "00:20:00"],
    [113, 138, 113, 88, "00:25:12"],
    [142, 174, 142, 111, "00:31:45"],
    [180, 220, 180, 140, "00:40:00"],
    [226, 277, 226, 176, "00:50:25"],
    [285, 349, 285, 222, "01:03:31"],
    [360, 440, 360, 280, "01:20:02"],
    [453, 554, 453, 352, "01:40:51"]
  ],
  [
    Translate("Store House"),
    [47, 62, 45, 52, "00:07:24"],
    [74, 98, 71, 39, "00:11:44"],
    [94, 124, 90, 50, "00:14:48"],
    [118, 156, 113, 63, "00:18:39"],
    [149, 196, 142, 79, "00:23:30"],
    [188, 248, 180, 100, "00:29:36"],
    [236, 312, 226, 126, "00:37:18"],
    [298, 393, 285, 158, "00:47:00"],
    [376, 496, 360, 200, "00:59:14"],
    [474, 625, 453, 252, "01:14:38"],
    [597, 787, 571, 317, "01:34:02"],
    [752, 992, 720, 400, "01:58:29"],
    [948, 1250, 907, 504, "02:29:17"],
    [1194, 1576, 1143, 635, "03:08:06"],
    [1505, 1985, 1441, 800, "03:57:01"],
    [1896, 2502, 1816, 1008, "04:58:38"],
    [2389, 3152, 2288, 1271, "06:16:17"],
    [3011, 3972, 2883, 1601, "07:54:08"],
    [3794, 5005, 3632, 2018, "09:57:24"],
    [4780, 6306, 4577, 2543, "12:32:44"],
    [6023, 7946, 5767, 3204, "15:48:26"],
    [7590, 10012, 7267, 4037, "19:55:02"],
    [9563, 12615, 9156, 5087, "25:05:45"],
    [12050, 15895, 11537, 6409, "31:37:15"],
    [15183, 20028, 14537, 8076, "39:50:32"],
    [19130, 25236, 18316, 10175, "50:12:04"],
    [24104, 31797, 23079, 12821, "63:15:12"],
    [30371, 40065, 29079, 16155, "79:41:58"],
    [38268, 50482, 36640, 20355, "100:25:17"],
    [48218, 63607, 46166, 25648, "126:31:51"]
  ]
];

var RoadBonus = 0.15;
var CancelUnit = 0.9;
var ResList = [["Gold", "g"], ["Iron", "j"], ["Wood", "d"], ["Food", "h"]];

/******************************************************************************/
// page/user constants

var UKMode = (Host.indexOf("utopiakingdoms.com") > -1);
var HomeName = /(.+) \((\d+):(\d+)\)/.exec(
  document.getElementById("changeCastle").
    getElementsByTagName("big")[0].innerHTML
);
var Home = HomeName.slice(2);
HomeName = HomeName[1];

// global resources
var GlobalGold = Number(document.getElementById("HaveGold").innerHTML);
var GlobalIron = Number(document.getElementById("HaveIron").innerHTML);
var GlobalWood = Number(document.getElementById("HaveWood").innerHTML);
var GlobalFood = Number(document.getElementById("HaveFood").innerHTML);
var GlobalTotal = GlobalGold + GlobalIron + GlobalWood + GlobalFood;

var World = /(\d+)\s*—/i.exec(document.title);
World ? World = World[1] : World = "0";
var UserName = document.getElementById("user").value;
var SavedHost = /[^.]+?\.(.+)$/i.exec(window.location.hostname);
SavedHost = (SavedHost ? SavedHost[1] : "") + "_" + World;
var SavePrefix = SavedHost + "_" + UserName;

var PlayerCastles =
  eval(GM_getValue(SavePrefix + "Castles")) ||
    [[].concat([null, HomeName], Home)];
var PlayerMerchants =
  eval(GM_getValue(SavePrefix + "Merchants")) || [];
var UnitNameToID = [];
var UnitMaxID = [];
for (var N in Units) {
  UnitNameToID[Units[N].name] = N; UnitMaxID.push(Number(N.slice(1)));
}
UnitMaxID.sort(CompNum).reverse();
UnitMaxID = UnitMaxID[0];

var BuildingMaxID = [];
for (var N = 1; N < Buildings.length; N++) {
  BuildingMaxID.push(N);
}
BuildingMaxID.sort(CompNum).reverse();
BuildingMaxID = BuildingMaxID[0];

var DefaultAttack = GM_getValue(SavePrefix + "DefaultAttack", "");
var ArcherLevel = Number(GM_getValue(SavePrefix + "Archer", 0));
var MysticLevel = Number(GM_getValue(SavePrefix + "Mystic", 0));
var ScoutLevel = Number(GM_getValue(SavePrefix + "Scout", 0));
var MerchantLevel = Number(GM_getValue(SavePrefix + "Merchant", 0));
var CavalryLevel = Number(GM_getValue(SavePrefix + "Cavalry", 0));
var WarriorLevel = Number(GM_getValue(SavePrefix + "Warrior", 0));
var DefenderLevel = Number(GM_getValue(SavePrefix + "Defender", 0));
var StealFrac = Number(GM_getValue(SavePrefix + "StealFrac", 0));
var HealThreshold = Number(GM_getValue(SavePrefix + "MinHeal", 1));
var ScavengeThreshold =
  Number(GM_getValue(SavePrefix + "MinScavenge", 1));
var TimeOffset =
  Number(GM_getValue(SavePrefix + "ServerOffset", 0));
var MaxX = Number(GM_getValue(SavePrefix + "MaxX", 200));
var MaxY = Number(GM_getValue(SavePrefix + "MaxY", 200));

// UnitUpgrades["id"] = [PctAttackPerLevel, PctDefPerLevel]
var UnitUpgrades = [];
for (var Unit in Units) {
  var Bonus = 0;
  if (! (Unit in Unupgraded)) {
    if (Unit in CavalryList) {
      Bonus = 10;
    } else if (Unit in MysticList) {
      Bonus = 30;
    } else if (Unit in InfantryList || Unit in ArcherList) {
      Bonus = 5;
    }
  }
  if (Bonus)
    UnitUpgrades[Unit] = [
      Number(GM_getValue(SavePrefix + Unit + "a", 0)), Bonus,
      Number(GM_getValue(SavePrefix + Unit + "d", 0)), 10
    ];
}

/******************************************************************************/
// helpers

// translation extraction
function Translate(Word) {
  if (Lang in Translation) {
    if (Word in Translation[Lang]) {
      return Translation[Lang][Word];
    } else {
      return Word;
    }
  } else {
    return Word;
  }
}

// add/remove class to a node
function AddClass(Node, Class) {
  var CurrClass = Node.getAttribute("class") || "";
  Node.setAttribute("class", CurrClass + (CurrClass ? " " : "") + Class);
}
function RemoveClass(Node, Class) {
  var CurrClass = Node.getAttribute("class") || "";
  CurrClass = CurrClass.replace(new RegExp("\\s*" + Class + "\\s*", "i"), " ");
  Node.setAttribute("class", CurrClass);
}

// for use with REs in extracting castle/player names for bare coords
function GetCastleName(arguments, ID) {
  var Coords = [arguments[1], arguments[2]];
  var FoundCastle = [[], []];
  for (var N = 0; N < PlayerCastles.length; N++) {
    if (
      PlayerCastles[N][2] == Coords[0] &&
      PlayerCastles[N][3] == Coords[1]
    ) {
      FoundCastle[0] = PlayerCastles[N][1]; break;
    }
  }
  if (! FoundCastle[0].length) {
    if (ID == undefined) {
      FoundCastle[1] = eval(GM_getValue(
        SavedHost + "_MapData_" + Coords[0] + "_" + Coords[1],
        "[]"
      ));
      if (FoundCastle[1][2]) {
        FoundCastle[1] = [FoundCastle[1][2], FoundCastle[1][4]];
      } else {
        FoundCastle[1] = [];
      }
      return FoundCastle;
    } else {
      window.setTimeout(
        function () {
          FoundCastle[1] = eval(GM_getValue(
            SavedHost + "_MapData_" + Coords[0] + "_" + Coords[1],
            "[]"
          ));
          if (FoundCastle[1][2]) {
            FoundCastle[1] = [FoundCastle[1][2], FoundCastle[1][4]];
          } else {
            FoundCastle[1] = [];
          }
          document.getElementById(ID).innerHTML=
              (FoundCastle[0].length
               ? " (" + FoundCastle[0] + ")"
               : (FoundCastle[1].length ? " (" + FoundCastle[1].join(", ") + ")" : ""));
        },
        0
      );
    }
  } else {
    if (ID == undefined) {
      return FoundCastle;
    } else {
      document.getElementById(ID).innerHTML=
          (FoundCastle[0].length
           ? " (" + FoundCastle[0] + ")"
           : (FoundCastle[1].length ? " (" + FoundCastle[1].join(", ") + ")" : ""));
    }
  }
}

// newline/<br>-separated unit parsing--copy directly to about:config
function ParseClipboardUnits(InText) {
  if (InText.indexOf("<br>") == -1) {
    var Units = InText.split("\n");
  } else {
    Units = InText.split("<br>");
  }
  var ArmyArray = new Array(UnitMaxID + 1);
  var PatSplit = /^\s*(.+?)\s*:\s*(\d+)\s*$/i;
  for (var N = 0; N < Units.length; N++) {
    var Match = PatSplit.exec(Units[N]);
    if (Match) {
      var ID = UnitNameToID[Match[1]];
      if (ID) ArmyArray[Number(ID.slice(1))] = Number(Match[2]);
    }
  }
  GM_setValue(SavePrefix + "_CopyArmy", uneval(ArmyArray));
}

// attach local time
function RefreshClock() {
  var Now = new Date();
  document.getElementById("GM_Clock").innerHTML =
    "" + Zero(String(Now.getHours()), 2) +
    ":" + Zero(String(Now.getMinutes()), 2) + ":" +
    Zero(String(Now.getSeconds()), 2) + " (";
  Now.setMinutes(Now.getMinutes() - TimeOffset);
  document.getElementById("GM_Clock").innerHTML +=
    Zero(String(Now.getHours()), 2) +
    ":" + Zero(String(Now.getMinutes()), 2) + ":" +
    Zero(String(Now.getSeconds()), 2) + ")";
}

var InitOffset = 0;
var Node = document.getElementById("serverTime");
if (Node) {
  var Now = new Date();
  var PageMatch = new RegExp(
    Host + "/pohod\\.php(?:\\?.*attackx=(\\d+)&attacky=(\\d+))?",
    "i"
  ).test(window.location);
  var Formation = document.getElementById("army_orders");
  if (PageMatch && ! Formation) {
    var Form = document.forms.namedItem("formClock").elements;
  }

  var LocalSeconds =
    Now.getHours() * 3600 + Now.getMinutes() * 60 + Now.getSeconds()
  var ServerTime = /<strong>(\d+):(\d+):(\d+)<\/strong>/i.exec(Node.innerHTML);
  // add full day to get rid of looping problems
  var ServerHours = Number(ServerTime[1]) + 24;
  var ServerSeconds = ServerHours * 3600 +
    Number(ServerTime[2]) * 60 + Number(ServerTime[3])
  InitOffset = -((ServerSeconds - LocalSeconds) % 86400) / 60;
  Node.innerHTML = "<strong id='GM_Clock'></strong>";
  Node.style.textAlign = "left";
  RefreshClock();
  window.setInterval(RefreshClock, 1000);
}

var PatDate = new RegExp(
  "(?:" + Translate("Mo") + "|" + Translate("Tu") + "|" + Translate("We") +
    "|" + Translate("Th") + "|" + Translate("Fr") + "|" + Translate("Sa") +
    "|" + Translate("Su") + ")?(\\d{4,4})-(\\d\\d)-(\\d\\d)(?:\\s*|@|<br />)" +
    "(\\d\\d):(\\d\\d):(\\d\\d)",
  "i"
);

// release troops from all training facilities
function ReleaseTroops() {
  function CheckDone() {
    Attempts += 1;
    var Sorted = eval(Done.toSource());
    Sorted.sort(CompNum);
    if (Sorted[0] == 1 || Attempts >= 20) {
      window.clearInterval(Interval);
    }
    window.location.reload();
  }

  function DoRequest(URL, Index) {
    GM_xmlhttpRequest({
      method: "GET",
      url: URL,
      onload: function (Response) {
        Done[Index] = 1;
      }
    });
  }

  var Done = [0, 0, 0, 0];
  for (var N = 1; N <= 4; N++) {
    DoRequest(Host + "/barracks.php?unit_type=" + String(N), N);
  }
  var Attempts = 0;
  var Interval = window.setInterval(CheckDone , 500);
}

var InsertionPoint = document.getElementById("content");
if (InsertionPoint) {
  var LinkNode = document.createElement("div");
  LinkNode.id = "GM_UsefulLinks";
  LinkNode.style.textAlign = "center";
  LinkNode.innerHTML =
    "<a href='market.php?action=4'>" + Translate("Convert Res") + "</a> | " +
    "<a href='market.php?action=2'>" + Translate("Send Res") + "</a> | " +
    "<a href='vip_status.php'>" + Translate("Overview") + "</a> | " +
    "<a href='forum.php'>" + Translate("Clan Forum") + "</a> | " +
    "<a href='editclan.php?id=" +
      GM_getValue(SavePrefix + "ClanID") + "'>" +
      Translate("Clan Admin") + "</a> | " +
    "<a href='vip_search.php'>" + Translate("VIP Search") + "</a> | " +
    "<a href='vip_poleta.php'>" + Translate("Scavenge") + "</a>";
  InsertionPoint.insertBefore(LinkNode, InsertionPoint.firstChild);
}

var InsertionPoint = document.getElementsByClassName("barracks")[0];
if (InsertionPoint) {
  var LinkNode = document.createElement("li");
  LinkNode.setAttribute("class", "marches");
  LinkNode.innerHTML =
    "<a href='javascript:void(0);' id='GM_ReleaseTroops'>" +
    Translate("Release Troops") + "</a>";
  InsertionPoint.parentNode.insertBefore(LinkNode, InsertionPoint);
  document.getElementById("GM_ReleaseTroops").
    addEventListener("click", ReleaseTroops, true);
}

// convert all dates
var DateNodes = document.evaluate(
  "//text()", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null
);
// if march info page, do not overwrite, but append parenthesised server
var MarchInfo = new RegExp(
  Host + "/info\\.php\\?what=pohod&posted_id=\\d+$", "i"
).test(window.location);
for (var N = 0; N < DateNodes.snapshotLength; N++) {
  var Match = PatDate.exec(DateNodes.snapshotItem(N).data);
  if (Match) {
    DateNodes.snapshotItem(N).data =
      DateNodes.snapshotItem(N).data.replace(
      PatDate,
      function () {
        return DateFormat(LocalTime(arguments[0], TimeOffset)) +
          (MarchInfo ? " (" + Translate("Server") + " " + Match[0] + ")" : "");
      }
    );
  }
}

// return index of first occurrence of Item in InArr or -1 if not present
function ArrMember(Item, InArr) {
  for (var N = 0; N < InArr.length; N++) {
    if (Item == InArr[N]) return N;
  }
  return -1;
}

// round to nearest arbitrary unit
function Round(In, Unit) {
  return Math.round(In / Unit) * Unit;
}

// floating-point errors screw up rounding; truncate to specified decimal places
function StripDecimals(InNum, Places) {
  var PatDec = new RegExp(
    "(\\-?\\d+)" + (Places > 0 ? "(\\.\\d{1," + String(Places) +
      "})?(?:\\d*)?" : ""),
    "i"
  );
  var Match = PatDec.exec(String(InNum));
  return Match ? Match[1] + (Places > 0 ? Match[2] || "" : "") : "0";
}

// compare function for sorting array numbers
function CompNum(a, b) {return a - b;}

// get a unique array of speeds by descending order
function CalcSpeeds(ScoutLevel) {
  var Speeds = [];
  for (Unit in Units) {
    var Current = Units[Unit]["speed"];
    var Effective = Math.round(Current / (1 + ScoutLevels[ScoutLevel] / 100))
    if (Speeds.length == 0) {
      Speeds.push([Effective, [Current]]);
    } else {
      var Found = false;
      for (var N = 0; N < Speeds.length; N++) {
        if (Speeds[N][0] == Effective) {
          for (var M = 0; M < Speeds[N][1].length; M++) {
            if (Speeds[N][1][M] == Current) {
              Found = true; break;
            }
          }
          if (! Found) {
            Speeds[N][1].push(Current);
            Speeds[N][1].sort(CompNum);
            Found = true;
          }
        } else {
          if (N == Speeds.length - 1 && ! Found) {
            Speeds.push([Effective, [Current]]); break;
          }
        }
      }
    }
  }
  Speeds.sort(function (a, b) {return CompNum(a[0], b[0])}).reverse();
  return Speeds;
}
Speeds = CalcSpeeds(ScoutLevel);

// pad string with leading zeroes
function Zero(InStr, Length) {
  if (InStr.length < Length) {
    var Pad = "";
    for (var N = 0; N < Length - InStr.length; N++) {Pad += "0";}
    return Pad + InStr;
  } else {
    return InStr;
  }
}

// sum of array components
function ArraySum(InArr) {
  var Sum = 0;
  for (var N = 0; N < InArr.length; N++) {
    Sum += Number(InArr[N]);
  }
  return Sum;
}

// component-wise sum of two arrays, to shortest array
function TwoArraySum(Arr1, Arr2) {
  var Max = Math.min(Arr1.length, Arr2.length);
  var OutArr = new Array(Max);
  for (var N = 0; N < Max; N++) {
    OutArr[N] = Arr1[N] + Arr2[N];
  }
  return OutArr;
}

// cartesian distance from home coords
function Dist(TargetCoords, BaseCoords, IgnoreRoadBonus) {
  if (! BaseCoords) BaseCoords = [Home[0], Home[1]];
  if (! IgnoreRoadBonus) IgnoreRoadBonus = false;
  var RoadMod =  1;
  if (! IgnoreRoadBonus) {
    var TargetFound = BaseFound = false;
    for (var N = 0; N < PlayerCastles.length; N++) {
      if (
        TargetCoords[0] == PlayerCastles[N][2] &&
        TargetCoords[1] == PlayerCastles[N][3]
      ) {
        TargetFound = true; break;
      }
    }
    for (var N = 0; N < PlayerCastles.length; N++) {
      if (
        BaseCoords[0] == PlayerCastles[N][2] &&
        BaseCoords[1] == PlayerCastles[N][3]
      ) {
        BaseFound = true; break;
      }
    }
    // handle road bonus
    var QuickNode = document.getElementById("GM_QuickRoads");
    var QuickRoads = false;
    if (
      BaseFound && TargetFound && QuickNode &&
      ! /TrapMapUpdate/i.test(arguments.callee.caller) &&
      ! /LookForoDv/i.test(arguments.callee.caller)
    ) {
      QuickNode.checked = true;
    }
    if (QuickNode && QuickNode.checked) QuickRoads = true;
    if ((BaseFound && TargetFound) || QuickRoads) RoadMod = 1 - RoadBonus;
  }
  return RoadMod * Math.max(
    Math.sqrt(
      Math.pow(Number(BaseCoords[0]) - Number(TargetCoords[0]), 2) +
        Math.pow(Number(BaseCoords[1]) - Number(TargetCoords[1]), 2)
    ),
    1
  );
}

// convert hh:mm:ss to seconds
function ToSeconds(InStr) {
  var Match = /(\d+):(\d+):(\d+)/i.exec(InStr);
  return Number(Match[1]) * 3600 + Number(Match[2]) * 60 + Number(Match[3]);
}

// convert number of seconds to hms format
function HMS(Seconds) {
  var Hours = Math.max(Math.floor(Seconds / 3600), 0);
  Seconds = Seconds - Hours * 3600;
  var Minutes = Math.max(Math.floor(Seconds / 60), 0);
  Seconds = Math.ceil(Math.max(Seconds - Minutes * 60, 0));
  return String(Hours) + ":" +
    Zero(String(Minutes), 2) + ":" + Zero(String(Seconds), 2);
}

// convert DATE object into DDyyyy-mm-dd@hh:mm:ss format
function DateFormat(NewDate, Break) {
  return [
    Translate("Su"), Translate("Mo"), Translate("Tu"), Translate("We"),
    Translate("Th"), Translate("Fr"), Translate("Sa")
  ][NewDate.getDay()] +
    String(NewDate.getFullYear()) + "-" +
    Zero(String(NewDate.getMonth() + 1), 2) +
    "-" + Zero(String(NewDate.getDate()), 2) + (Break ? "<br />" : "@") +
    Zero(String(NewDate.getHours()), 2) + ":" +
    Zero(String(NewDate.getMinutes()), 2) + ":" +
    Zero(String(NewDate.getSeconds()), 2)
  ;
}

// calculate one-way and finish time for marches
function MarchTime(
  Dist, Speed, Separator, SpeedLimiter, ShowServer, KhanGuard, DisplaySpeed
) {
  if (! Separator) Separator = " ";
  if (! SpeedLimiter) {
    var SpeedLimiter = [];
    for (var N = 0; N < 10; N++) {SpeedLimiter.push(N);}
  }
  if (! DisplaySpeed) DisplaySpeed = String(Speed);
  var DateVar = new Date();
  var NewDate = new Date();
  var OneWay = new Date();
  var OneWayServer = new Date();
  var TimeString = "";
  if (KhanGuard) {
    KhanGuard = document.evaluate(
      "//input[@name='units[27]']",
      document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null
    ).singleNodeValue;
    // KG only has a meaningful effect if marching with units as slow as it
    if (
      KhanGuard &&
      Speed >=
        Math.round(Units["u27"]["speed"] / (1 + ScoutLevels[ScoutLevel] / 100))
      ) {
      KhanGuard =
        1 - Math.max(Math.min(Number(KhanGuard.value) || 0, 60), 0) * 0.005;
    } else {
      KhanGuard = 1;
    }
  } else {
    KhanGuard = 1;
  }
  for (var N = 0; N < SpeedLimiter.length; N++) {
    var Seconds =
      KhanGuard * Math.ceil(60 * (1 + SpeedLimiter[N] / 10) * Speed * Dist);
    NewDate.setTime(DateVar.getTime() + 2000 * Seconds);
    OneWay.setTime(DateVar.getTime() + 1000 * Seconds);
    OneWayServer.setTime(OneWay.getTime());
    OneWayServer.setTime(OneWayServer.getTime() - 60000 * TimeOffset);
    TimeString += "<span class='hovertext' title='" +
      Translate("One-Way") + " (" + String(N) +
      "): " + DateFormat(OneWay) + "'>" + HMS(Seconds) + "," + Separator +
      DateFormat(NewDate) + "</span>" + Separator + "(" + DisplaySpeed +
      (KhanGuard < 1 ? "<b>*</b>" : "") + "-" + String(SpeedLimiter[N]) + ")" +
      (ShowServer
        ? "<br /><span style='font-weight: lighter;'>" +
          Translate("<i>Estimated</i> Server Arrival") + ": " +
          DateFormat(OneWayServer) + "</span>"
        : ""
      ) + "<br />";
  }
  return TimeString;
}

// convert server timestamp to local timestamp
function LocalTime(ServerTime, Offset) {
  if (! Offset) Offset = 0;
  var Match = PatDate.exec(ServerTime);
  var LocalTime = new Date(
    Number(Match[1]), Number(Match[2]) - 1, Number(Match[3]),
    Number(Match[4]), Number(Match[5]) + Offset, Number(Match[6])
  );
  return LocalTime;
}

// returns strings of castle distances for given target coords
function CalcCastleDists(Target, DoSpeed, ShowServer, KhanGuard) {
  var OutArray = [];
  var OutText = OutTabText = "";
  var Found = false;
  for (var M = 0; M < PlayerCastles.length; M++) {
    OutArray.push([
      PlayerCastles[M][1],
      Dist(Target, [PlayerCastles[M][2], PlayerCastles[M][3]]),
      PlayerCastles[M][2], PlayerCastles[M][3]
    ]);
    // handle camp, if current active settlement
    if (
      ! Found && Home[0] == PlayerCastles[M][2] && Home[1] == PlayerCastles[M][3]
    ) Found = true;
  }
  if (! Found) {
    OutArray.push([
      HomeName + " (" + Home[0] + ":" + Home[1] + ")",
      Dist(Target, Home), Home[0], Home[1]
    ]);
  }
  var Unsorted = [];
  for (var M = 0; M < OutArray.length; M++) {Unsorted.push(OutArray[M]);}
  OutArray.sort(function (a, b) {return CompNum(a[1], b[1]);});
  for (var M = 0; M < OutArray.length; M++) {
    var CurrentCastle = (Home[0] == OutArray[M][2] && Home[1] == OutArray[M][3]);
    OutText +=
      (CurrentCastle ? "<b><i>" : "") +
      OutArray[M][0] + ", " +
      (DoSpeed
        ? MarchTime(OutArray[M][1], DoSpeed, " ", [0], ShowServer, KhanGuard)
        : StripDecimals(Round(OutArray[M][1], 0.01), 2) + "<br />"
      ) + (CurrentCastle ? "</i></b>" : "");
    OutTabText += (OutTabText != "" ? "\t" : "") +
      StripDecimals(Unsorted[M][1], 2);
  }
  return [
    OutText, OutTabText,
    OutArray[0][0] + " " + StripDecimals(OutArray[0][1], 2)
  ];
}

// remove selected HREF search param from a search string
function CleanSearch(Search, Remove, Add) {
  var PatRemove = new RegExp("(\\?|&)" + Remove + "=[^&]+", "i");
  var NewSearch = Search.replace(PatRemove, "");
  if (NewSearch) NewSearch = "?" + NewSearch.slice(1);
  if (NewSearch != "?" && NewSearch != "" && Add) NewSearch += "&";
  NewSearch += (NewSearch == "" ? "?" : "") + Add;
  return NewSearch;
}

function MerchantCapacity() {
  var NewMessage = document.createElement("div");
  NewMessage.style.textAlign = "center"; NewMessage.style.color = "white";
  NewMessage.id = "GM_GlobalRes";
  NewMessage.innerHTML = Translate("Total Res") + ": " + String(GlobalTotal);
  for (var N = 0; N < PlayerMerchants.length; N++) {
    if (Home[0] == PlayerMerchants[N][0] && Home[1] == PlayerMerchants[N][1]) {
      var MerchantLimit = Number(PlayerMerchants[N][2]);
      var Extra = Math.max(0, GlobalTotal - MerchantLimit);
      NewMessage.innerHTML += "; " + Translate("Max Merchant") + ": " +
      String(MerchantLimit) + "; " + Translate("Extra") + ": " + String(Extra);
      break;
    }
  }
  var InsertionPoint = document.getElementById("GM_GlobalRes");
  if (! InsertionPoint) {
    InsertionPoint = document.getElementById("GM_UsefulLinks");
    InsertionPoint.parentNode.insertBefore(NewMessage, InsertionPoint);
  } else {
    InsertionPoint.innerHTML = NewMessage.innerHTML;
  }
}
MerchantCapacity();

var TrapCastleUpdateArray = [];
function TrapCastleUpdate(Event) {
  var Castles = document.getElementById("castlesList");
  var Nodes = document.evaluate(
    "descendant::big",
    Event.target, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null
  );
  var PatCastle = /(.+)\s*?\((\d+):(\d+)\)/i;
  var PatCastleID = /\?tpid=(\d+)/i;
  var MarchPage = /pohod\.php/.test(window.location);
  if (MarchPage) {
    var Forms = document.forms.namedItem("form1").elements;
    var X = Forms.namedItem("attackx").value;
    var Y = Forms.namedItem("attacky").value;
    var PatX = /attackx=\d+/i;
  }
  for (var N = 0; N < Nodes.snapshotLength; N++) {
    var Match = PatCastle.exec(Nodes.snapshotItem(N).innerHTML);
    if (Match) {
      var CastleID = PatCastleID.exec(Nodes.snapshotItem(N).parentNode.href)[1];
      Match.push(CastleID);
      TrapCastleUpdateArray.push(Match);
    }
    if (MarchPage) {
      var Link = document.evaluate(
        "descendant::a",
        Event.target, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null
      ).singleNodeValue;
      var LinkLocation = Link.href;
      if (! PatX.test(LinkLocation)) {
        var Pos = LinkLocation.indexOf("&location=") + 10;
        var Redir = unescape(LinkLocation.slice(Pos));
        var RedirSearchPos = Redir.indexOf("?");
        var RedirSearch;
        if (RedirSearchPos > -1) {
          RedirSearch = Redir.slice(RedirSearchPos);
          RedirSearch = CleanSearch(
            CleanSearch(RedirSearch, "attackx", ""),
            "attacky",
            "attackx=" + X + "&attacky=" + Y
          );
          RedirSearch =
            CleanSearch(CleanSearch(RedirSearch, "motivated", ""), "sent", "");
          Link.href = LinkLocation.slice(0, Pos) +
            escape(Redir.slice(0, RedirSearchPos) + RedirSearch);
        }
      }
    }
  }
  window.setTimeout(
    function (TrapCastleUpdateArray) {
      GM_setValue(
        SavePrefix + "Castles", uneval(TrapCastleUpdateArray)
      );
      PlayerCastles = eval(TrapCastleUpdateArray.toSource());
    },
    0,
    TrapCastleUpdateArray
  );
}

// listen for castle list check
document.getElementById("castlesList").
  addEventListener("DOMNodeInserted", TrapCastleUpdate, true);

// system clipboard access
unsafeWindow.GetClipboard = function () {
  this.netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
  var Clip = Components.classes["@mozilla.org/widget/clipboard;1"].
    getService(Components.interfaces.nsIClipboard);
  if (! Clip) return false;
  var Trans = Components.classes["@mozilla.org/widget/transferable;1"].
    createInstance(Components.interfaces.nsITransferable);
  if (! Trans) return false;
  Trans.addDataFlavor("text/unicode");
  Clip.getData(Trans, Clip.kGlobalClipboard);
  var Str = new Object();
  var StrLength = new Object();
  Trans.getTransferData("text/unicode", Str, StrLength);
  if (Str) {
    Str = Str.value.
      QueryInterface(Components.interfaces.nsISupportsString);
    return String(Str);
  } else {
    return "";
  }
}

// coordinate paster helper
function PasteCoords(Event) {
  if (
    ! Event.shiftKey && ! Event.altKey && Event.ctrlKey &&
    String.fromCharCode(Event.which).toLowerCase() == "v"
  ) {
    var PatCoords = /(\d+)[\s:,;](\d+)/i;
    var Coords = PatCoords.exec(unsafeWindow.GetClipboard());
    if (Coords) {
      if (new RegExp(Host + "/map\\.php", "I").test(window.location)) {
        document.getElementById("searchX").value = Coords[1];
        document.getElementById("searchY").value = Coords[2];
      } else if (
        new RegExp(Host + "/pohod\\.php", "i").test(window.location) &&
        document.getElementById("army_orders")
      ) {
        document.evaluate(
          "//input[@name='attackx']", document, null,
          XPathResult.FIRST_ORDERED_NODE_TYPE, null
        ).singleNodeValue.value = Coords[1];
        var Node = document.evaluate(
          "//input[@name='attacky']", document, null,
          XPathResult.FIRST_ORDERED_NODE_TYPE, null
        ).singleNodeValue;
        Node.focus();
        Node.value = Coords[2];
        Node.blur();
      }
    }
  }
}

// parse arbitrary page, use in callback
function GetDoc(URL, Callback) {
  var Rest = [];
  for (var N = 2; N < arguments.length; N++) {
    Rest.push(arguments[N]);
  }
  GM_xmlhttpRequest({
    method: "GET",
    url: URL,
    onload: function (responseDetails) {
      var Doc = document.implementation.createDocument("", "", null),
          HTML = document.createElement("html"),
          Head = document.createElement("head"),
          Body = document.createElement("body");
      Head.innerHTML = /<\s*head[^>]*>((?:.|\s)+?)<\s*\/head\s*>/mi.
        exec(responseDetails.responseText)[1];
      Body.innerHTML = /<\s*body[^>]*>((?:.|\s)+?)<\s*\/body\s*>/mi.
        exec(responseDetails.responseText)[1];
      Doc.appendChild(HTML);
      HTML.appendChild(Head);
      HTML.appendChild(Body);
      eval("Callback(Doc" + (Rest.length ? "," : "") + Rest.join(",") + ");");
    }
  });
}

// convert form name to unit ID ("uxx")
function FormToID(FormName) {
  var ID = /units\[(\d+)\]/i.exec(FormName);
  return (ID ? "u" + ID[1] : "");
}

/******************************************************************************/
// redir coords on success

var PageMatch = new RegExp(Host + "/pohod\\.php?.*sent=1", "i").
  test(window.location);
if (PageMatch && window.name) {
  var X = GM_getValue(window.name + "X");
  var Y = GM_getValue(window.name + "Y");
  var Form = document.forms.namedItem("form1");
  Form.elements.namedItem("attackx").value = X;
  Form.elements.namedItem("attacky").value = Y;
  Form.action = "pohod.php?attackx=" + X + "&attacky=" + Y;
  GM_deleteValue(window.name); GM_deleteValue(window.name + "Formation");
  GM_deleteValue(window.name + "FormationNum");
  GM_deleteValue(window.name + "X"); GM_deleteValue(window.name + "Y");
  window.name = "";
}

/******************************************************************************/
// march page 1
// display march cargo inline; link coords directly to reattack; display
// city name instead of coords; fix paging search params
// encumbrance/speed/etc on march page

function QuickGo(Event) {
  function SelectMarchType(Value) {
    var Found = false;
    for (let N = 0; N < MarchType.options.length; N++) {
      if (MarchType.options[N].value == Value) {
        Found = true;
        MarchType.selectedIndex = N;
      }
    }
    if (! Found) {
      alert(Translate("Could not find that march type."));
      return false;
    } else {
      return true;
    }
  }
  if (! window.name) {
    window.name = "QuickGo" + new Date().getTime();
  }
  var SubmitButton = document.evaluate(
    "//input[@type='submit']",
    document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null
  ).singleNodeValue;
  document.forms.namedItem("form1").
    removeEventListener("submit", RetainManualFormation, true);
  var MarchType = document.evaluate(
    "//form[@name='form1']/descendant::*[@id='type']",
    document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null
  ).singleNodeValue
  var PatNum = /^(.+)(\d+)$/i;
  var ID = PatNum.exec(Event.target.getAttribute("id").slice(3));
  GM_setValue(window.name, Number(ID[2]));
  var Formation = document.getElementById("GM_Formation");
  var FormationNum = Formation.options[Formation.selectedIndex].value;
  Formation = Formation.options[Formation.selectedIndex].innerHTML;
  var Form = document.forms.namedItem("form1").elements;
  GM_setValue(window.name + "Formation", Formation);
  GM_setValue(window.name + "FormationNum", FormationNum);
  GM_setValue(
    window.name + "X", Form.namedItem("attackx").value
  );
  GM_setValue(
    window.name + "Y", Form.namedItem("attacky").value
  );
  var Success;
  switch (ID[1]) {
    case "QAtt":
    case "Attack": Success = SelectMarchType("3"); break;
    case "QScav":
    case "Scavenge": Success = SelectMarchType("5"); break;
    case "QTransfer":
    case "Transfer": Success = SelectMarchType("8"); break;
    case "QSpy":
    case "Spy":
      var QWNode = document.forms.namedItem("form1").elements.
        namedItem(UKMode ? "u9": "units[9]");
      var Temp = Number(QWNode.value);
      SetAll(false); QWNode.value = String(Math.max(Temp, 1));
      Success = SelectMarchType("7");
      break;
    case "QSupport":
    case "Support": Success = SelectMarchType("2"); break;
  }
  if (Success) SubmitButton.click();
}

// update march info on change
function UpdateMarchNums(Event) {
  Target = [
    document.evaluate(
      "//input[@name='attackx']", document, null,
      XPathResult.FIRST_ORDERED_NODE_TYPE, null
    ).singleNodeValue.value,
    document.evaluate(
      "//input[@name='attacky']", document, null,
      XPathResult.FIRST_ORDERED_NODE_TYPE, null
    ).singleNodeValue.value
  ];
  var MapData = GM_getValue(
    SavedHost + "_MapData_" + String(Target[0]) + "_" + String(Target[1]),
    ""
  );
  var CastleName = "";
  MapData ? CastleName = eval(MapData)[4] || "" : CastleName = "";
  document.getElementById("GM_CastleLabel").innerHTML =
    " <a href='" + Host + "/map.php?setx=" +
        Target[0] + "&sety=" + Target[1] + "'>&rarr;</a> " + CastleName;

  var Pop = NonMysticPop = Encumbrance = Speed = Damage = Mystic =
    DamageBonus = Temp = 0;
  var Form = document.forms.namedItem("form1");
  Form.action = "pohod.php?attackx=" + Target[0] + "&attacky=" + Target[1];
  for (var N = 0; N < Form.elements.length; N++) {
    DamageBonus = 0;
    if (UKMode) {
      var UnitID = Form[N].name;
    } else {
      var UnitID = FormToID(Form[N].name);
    }
    if (UnitID in Units) {
      var Marched = Number(Form[N].value);
      if (UnitID in ArcherList) {
        DamageBonus += ArcherLevels[ArcherLevel];
      }
      if (UnitID in MysticList) {
        DamageBonus += MysticLevels[MysticLevel];
      }
      if (UnitID in UnitUpgrades) {
        DamageBonus +=
          UnitUpgrades[UnitID][0] * UnitUpgrades[UnitID][1];
      }
      Temp = Math.floor(
        Marched * (1 + DamageBonus / 100) *
        Units[UnitID]["building"] * Units[UnitID]["wallcrasher"]
      );
      Damage += Temp;
      if (UnitID in MysticList) Mystic += Temp;
      Encumbrance += Marched * Units[UnitID]["carry"];
      Pop += Marched * Units[UnitID]["pop"];
      NonMysticPop += Marched * Units[UnitID]["pop"] * ! (UnitID in MysticList);
      if (Marched > 0) {
        Speed = Math.max(
          Speed,
          Math.round(
            Units[UnitID]["speed"] / (1 + ScoutLevels[ScoutLevel] / 100)
          )
        );
      }
    }
  }
  var Node = document.getElementById("pop_span");
  Node.innerHTML = String(Pop);
  Node = document.getElementById("GM_Non-Mystics");
  Node.innerHTML = String(NonMysticPop);
  Node = document.getElementById("GM_Encumbrance");
  Node.innerHTML = String(Encumbrance);
  Node = document.getElementById("GM_Speed");
  if (Speed) {
    Node.innerHTML = MarchTime(Dist(Target), Speed, "&nbsp;", false, false, true);
  } else {
    Node.innerHTML = MarchTime(0, Speed, "&nbsp;", false, false, false);
  }
  Node = document.getElementById("GM_Damage");
  Node.innerHTML = String(Damage);
  Node = document.getElementById("GM_Mystics");
  Node.innerHTML = String(Mystic);
  Node = document.getElementById("GM_Castles");
  Node.innerHTML = CalcCastleDists(Target)[0];
}

function HandleTransfer(Event) {
  var Type = Event.target.id.slice(3);
  var SubmitButton = document.evaluate(
    "//input[@type='submit']",
    document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null
  ).singleNodeValue;
  switch (Type) {
    case ("CastleSelect"):
      var CanTransfer = document.evaluate(
        "//form[@name='form1']/descendant::*[@id='type']/option[@value='8']",
        document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null
      ).singleNodeValue;
      if (CanTransfer) CanTransfer.selected = true;
      var Match = /(\d+):(\d+)/i.exec(
        Event.target.options[Event.target.selectedIndex].value
      );
      var Node = document.evaluate(
        "//input[@name='attackx']", document, null,
        XPathResult.FIRST_ORDERED_NODE_TYPE, null
      ).singleNodeValue;
      Node.focus(); Node.value = Match[1]; Node.blur();
      Node = document.evaluate(
        "//input[@name='attacky']", document, null,
        XPathResult.FIRST_ORDERED_NODE_TYPE, null
      ).singleNodeValue;
      Node.focus(); Node.value = Match[2]; Node.blur();
      break;
  }
  document.getElementById("GM_CastleSelect").selectedIndex = 0;
}

function CreateCancelTimer(Event) {
  var CancelMarchIntervals = {};

  // update cancel timers for activated marches
  function UpdateCancelTime(ID, OneWay, Arrives) {
    Arrives = Arrives.getHours() * 3600 + Arrives.getMinutes() * 60 +
      Arrives.getSeconds();
    var Now = document.getElementById("theClock").innerHTML;
    if (Now) {
      Now = Now.split(":");
      Now = Number(Now[0]) * 3600 + Number(Now[1]) * 60 + Number(Now[2]);
      if (Arrives < Now) Arrives += 86400;
    } else {
      Now = NaN;
    }
    var DeltaTime = (Arrives - Now) % 86400;
    var CancelTime = Number((DeltaTime > 0) * (OneWay - DeltaTime));
    var TimeLeft = Number((DeltaTime > 0) * DeltaTime);
    if (DeltaTime > 0 && DeltaTime < 36000) {
      document.getElementById(ID).innerHTML = HMS(CancelTime) + "<br />" +
        HMS(TimeLeft);
    } else {
      document.getElementById(ID).innerHTML = "--<br />--";
      window.clearInterval(CancelMarchIntervals[ID]);
      delete CancelMarchIntervals[ID];
    }
  }

  var Node = document.evaluate(
    "ancestor::td[1]/preceding-sibling::td[1]/descendant::a",
    Event.target, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null
  ).singleNodeValue;
  var ID = /posted_id=(\d+)/i.exec(Node.href)[1];

  function UpdateCancelTimeCallback(Doc) {
    var NewNode = document.getElementById("GM_March" + ID);
    if (! NewNode) {
      var Nodes = Doc.evaluate(
            "//ns:div[@class='textformbox'][1]/ns:div[@class='row']" +
              "[position()=4 or position()=5]/ns:div[2]",
            Doc, nsResolver, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null
          ),
          Arrives = LocalTime(Nodes.snapshotItem(0).innerHTML),
          Returns = LocalTime(Nodes.snapshotItem(1).innerHTML);
      NewNode = document.createElement("div");
      NewNode.id = "GM_March" + ID; NewNode.innerHTML = "";
      NewNode.setAttribute("style", "font-size: 80%;");
      Event.target.parentNode.appendChild(NewNode);
      var OneWay = (Returns.getTime() - Arrives.getTime()) / 1000;
      UpdateCancelTime("GM_March" + ID, OneWay, Arrives);
      var IntervalID = window.setInterval(
        UpdateCancelTime, 1000, "GM_March" + ID, OneWay, Arrives
      );
      CancelMarchIntervals["GM_March" + ID] = IntervalID;
    }
  }
  GetDoc(Node.href, UpdateCancelTimeCallback);
}

var PageMatch = new RegExp(Host + "/pohod\\.php", "i").test(window.location);
var MarchesFilter = document.getElementsByClassName("marchesFilter").length;
if (PageMatch && MarchesFilter) {
  // clear any previous instructions
  if (window.name) {
    GM_deleteValue(window.name); GM_deleteValue(window.name + "Formation");
    GM_deleteValue(window.name + "FormationNum");
    GM_deleteValue(window.name + "X"); GM_deleteValue(window.name + "Y");
    window.name = "";
  }
  window.addEventListener("keypress", PasteCoords, true);
  var TimerColumn = document.evaluate(
    "//*[@class='box'][1]/table[1]/thead[1]/tr[1]/td[2]",
    document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null
  ).singleNodeValue;
  if (TimerColumn) TimerColumn.setAttribute("style", "width: 7em");
  var Timers = document.evaluate(
    "//div[starts-with(@id, 'bxx')]",
    document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null
  );
  for (var N = 0; N < Timers.snapshotLength; N++) {
    Timers.snapshotItem(N).setAttribute("style", "text-decoration: underline;");
    Timers.snapshotItem(N).parentNode.
      addEventListener("click", CreateCancelTimer, true);
  }
  var Match, StrClean, Cargo, CargoText;
  var PatCargo = new RegExp(
    "(?:(\\d+?)\\s*" + Translate("Gold") + "[\\s\\S]*?(\\d+?)\\s*" + Translate("Iron") +
      "[\\s\\S]*?(\\d+?)\\s*" + Translate("Wood") + "[\\s\\S]*?" +
      "(\\d+?)\\s*" + Translate("Food") + "[\\s\\S]*?)?(\\d+?)\\s*" + Translate("People"),
    "i"
  );
  var PatCoords = /(\d+):(\d+)/i;
  var SelNodes = document.evaluate(
    "//a[contains(@href, 'javascript:alert')]",
    document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null
  );
  var Search = CleanSearch(
    CleanSearch(window.location.search, "attackx", ""), "attacky", ""
  );
  Search = CleanSearch(CleanSearch(Search, "motivated", ""), "sent", "");
  var Form = document.forms.namedItem("form1").elements;
  var Target = Form.namedItem("attackx").value + ":" +
    Form.namedItem("attacky").value;
  for (var N = 0; N < SelNodes.snapshotLength; N++) {
    StrClean = SelNodes.snapshotItem(N).getAttribute("href");
    Match = PatCargo.exec(StrClean);
    if (Match) {
      Cargo = PatCargo.exec(Match[0]);
      CargoText = "";
      for (var M = (Cargo[1] != null ? 1 : Cargo.length - 1); M < Cargo.length; M++) {
        var Num = Number(Cargo[M]);
        if (Num < 1000) {
          CargoText += String(Num) + "/";
        } else {
          CargoText += String(Math.floor(Num / 1000)) + "k/";
        }
      }
      CargoText =
        "<small>" + CargoText.slice(0, CargoText.length - 1) + "</small>";
      var LinkNode = SelNodes.snapshotItem(N).
        parentNode.previousSibling.previousSibling;
      var Match = PatCoords.exec(LinkNode.innerHTML);
      if (Search == "?") Search = "";
      LinkNode.innerHTML =
        "<a href='" + Host + "/pohod.php?attackx=" +
        Match[1] + "&attacky=" + Match[2] +
        (Search ? "&" + Search.slice(1) : "") + "'>&clubs;</a>" +
        " <a href='" + Host + "/map.php?setx=" +
        Match[1] + "&sety=" + Match[2] + "'>&rarr;</a>" +
        LinkNode.innerHTML +
        (
          new RegExp(Target, "i").test(LinkNode.innerHTML)
            ? "*"
            : ""
        );
      SelNodes.snapshotItem(N).innerHTML = CargoText;
    }
  }

  // collect castle coordinate information
  var Castles = document.evaluate(
    "//select[@name='filter']/option", document, null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null
  );
  if (Castles.snapshotLength) {
    var PatCastle = /(.+)\s+?\((\d+):(\d+)\)/i;
    var CastleArray = [];
    for (var N = 0; N < Castles.snapshotLength; N++) {
      var Match = PatCastle.exec(Castles.snapshotItem(N).innerHTML);
      if (Match) {
        Match.push(Castles.snapshotItem(N).value);
        CastleArray.push(Match);
      }
    }
    GM_setValue(SavePrefix + "Castles", uneval(CastleArray));
    PlayerCastles = eval(CastleArray.toSource());
  }

  var TargetX = document.evaluate(
    "//input[@name='attackx']", document, null,
    XPathResult.FIRST_ORDERED_NODE_TYPE, null
  ).singleNodeValue.value;
  var TargetY = document.evaluate(
    "//input[@name='attacky']", document, null,
    XPathResult.FIRST_ORDERED_NODE_TYPE, null
  ).singleNodeValue.value;

  // fix paging links
  var Paging = document.evaluate(
    "//p[@class='paging']", document, null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null
  );
  var SearchOrig = window.location.search;
  var Search;
  if (Paging.snapshotLength) {
    var Links = document.evaluate(
      "descendant::a", Paging.snapshotItem(0), null,
      XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null
    );
    Search = CleanSearch(
      CleanSearch(
        CleanSearch(SearchOrig, "page", ""), "attackx", ""
      ),
      "attacky",
      "attackx=" + TargetX + "&attacky=" + TargetY
    );
    for (var N = 0; N < Links.snapshotLength; N++) {
      Links.snapshotItem(N).href += (Search ? "&" + Search.slice(1) : "");
    }
    Paging.snapshotItem(1).innerHTML = Paging.snapshotItem(0).innerHTML;
  }

  // fix sorting links
  var Sorting = document.evaluate(
    "//table/thead/tr/td/a[contains(@href, 'sort=')]", document, null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null
  );
  Search = CleanSearch(
    CleanSearch(
      CleanSearch(
        CleanSearch(CleanSearch(SearchOrig, "sort", ""), "sort_type", ""),
        "filter",
        ""
      ),
      "attackx",
      ""
    ),
    "attacky",
    "attackx=" + TargetX + "&attacky=" + TargetY
  );
  for (var N = 0; N < Sorting.snapshotLength; N++) {
    Sorting.snapshotItem(N).href += (Search ? "&" + Search.slice(1) : "");
  }

  // fix filter function to retain headers
  var Node = document.evaluate(
    "//select[@name='filter']/option", document, null,
    XPathResult.FIRST_ORDERED_NODE_TYPE, null
  ).singleNodeValue;
  Node.parentNode.addEventListener(
    "change",
    function (Event) {
      var SearchOrig = window.location.search;
      SearchOrig = CleanSearch(
        CleanSearch(
          CleanSearch(CleanSearch(SearchOrig, "filter", ""), "page", ""),
          "attackx",
          ""
        ),
        "attacky",
        "attackx=" + TargetX + "&attacky=" + TargetY
      );
      SearchOrig =
        CleanSearch(CleanSearch(SearchOrig, "sent", ""), "motivated", "");
      window.location.href = window.location.pathname +
        SearchOrig + (SearchOrig != "" ? "&" : "?") +
        "filter=" + Event.target.options[Event.target.selectedIndex].value;
    },
    true
  );

  // display town name instead of coords
  var Nodes = document.evaluate(
    "//img[contains(@src,'march_back.gif') or contains(@src,'march_forward.gif')]/ancestor::tr[1]",
    document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null
  );
  var PatCoords = /(\d+):(\d+)/i;
  for (var N = 0; N < Nodes.snapshotLength; N++) {
    var Node = Nodes.snapshotItem(N).childNodes[5];
    var Coords = PatCoords.exec(Node.innerHTML).slice(1);
    var TempName =
      eval(GM_getValue(SavedHost + "_MapData_" + Coords[0] + "_" + Coords[1], ""))
        ||
      "";
    if (TempName) TempName = TempName[4];
    if (TempName) {
      Node.innerHTML = Node.innerHTML.replace(
        new RegExp("\\s*" + Coords[0] + ":" + Coords[1] + "\\s*", "i"),
        "<span style='font-size: 80%' title='" + Coords[0] +
          ":" + Coords[1] + "'>" + TempName + "</span>"
      );
    }
    Node = Nodes.snapshotItem(N).childNodes[7];
    Coords = PatCoords.exec(Node.innerHTML).slice(1);
    TempName =
      eval(GM_getValue(SavedHost + "_MapData_" + Coords[0] + "_" + Coords[1], ""))
        ||
      "";
    if (TempName) TempName = TempName[4];
    if (TempName) {
      Node.innerHTML = Node.innerHTML.replace(
        new RegExp("\\s*" + Coords[0] + ":" + Coords[1] + "\\s*", "i"),
        "<span style='font-size: 80%' title='" + Coords[0] + ":" + Coords[1] +
          "'>" + TempName + "</span>"
      );
    }
  }
  var Form = document.forms.namedItem("form1");

  // find number of troops available in particular form
  function FindNum(Form) {
    return /<strong>(\d+)<\/strong>/i.exec(
      Form.parentNode.previousSibling.previousSibling.innerHTML
    )[1];
  }

  // update single unit
  function SetupMax(Event) {
    var Match = /GM_Unit_(.*?)_(\d+)/i.exec(Event.target.getAttribute("class"));
    var ID = Match[1]; var Value = Match[2];
    SetMaximum(ID, Value);
  }
  function SetMaximum(ID, Value) {
    var Form = document.forms.namedItem("form1");
    var Item = Form.elements.
      namedItem(UKMode ? ID : "units[" + ID.slice(1) + "]");
    Item.focus();
    Item.value = Value;
    Item.blur();
  }

  // update all units on/off
  function SetupSetAll(Event) {
    if (Event.target.id == "GM_All") {
      SetAll(true);
    } else {
      SetAll(false);
    }
  }
  function SetAll(On) {
    var Form = document.forms.namedItem("form1"), UnitID;
    for (var N = 0; N < Form.elements.length; N++) {
      UKMode ? UnitID = Form[N].name : UnitID = FormToID(Form[N].name);
      if (/^u\d+$/i.test(UnitID)) {
        if (On) {
          SetMaximum(UnitID, FindNum(Form[N]));
        } else {
          SetMaximum(UnitID, "0");
        }
      }
    }
  }

  // single infantry
  function SingleInfantry() {
    var Form = document.forms.namedItem("form1"), UnitID;
    for (var N = 0; N < Form.elements.length; N++) {
      UKMode ? UnitID = Form[N].name : UnitID = FormToID(Form[N].name);
      if (/^u(1|2|3|4)$/i.test(UnitID)) {
        var Available = Number(FindNum(Form[N]));
        SetMaximum(UnitID, Available ? "1" : "0");
      }
    }
  }

  // +/- 1
  function ChangeOne(Event) {
    var Delta;
    Event.target.innerHTML.slice(0, 1) == "+" ? Delta = 1 : Delta = -1;
    var ActualTarget = Event.target.parentNode.parentNode.previousSibling;
    ActualTarget.focus();
    ActualTarget.value = String(Number(ActualTarget.value) + Delta);
    ActualTarget.blur();
  }

  // paste copied army
  function PasteArmyMarch(Event) {
    var ArmyArray = eval(GM_getValue(SavePrefix + "_CopyArmy", ""));
    if (ArmyArray) {
      var Form = document.forms.namedItem("form1").elements;
      var NotEnough = false, UnitID, ArmyCount;
      for (var N = 1; N < ArmyArray.length; N++) {
        UKMode ? UnitID = "u" + String(N) : UnitID = "units[" + String(N) + "]";
        ArmyCount = ArmyArray[N] || 0;
        var TextBox = Form.namedItem(UnitID);
        if (TextBox) {
          var Available = Number(FindNum(TextBox));
          if (Available < ArmyCount) NotEnough = true;
          TextBox.value = String(Math.min(ArmyCount, Available));
        } else if (ArmyCount) {
          NotEnough = true;
        }
      }
      if (NotEnough)
        alert(Translate("Warning: not enough troops to paste all."));
    }
  }

  // invert army selection
  function PasteArmyInvert(Event) {
    var UnitID;
    for (var N = 0; N < Form.elements.length; N++) {
      UKMode ? UnitID = Form[N].name : UnitID = FormToID(Form[N].name);
      if (UnitID in Units) {
        var Available = Number(FindNum(Form[N]));
        var Used = Number(Form[N].value);
        if (Used > 0) Form[N].value = String(Available - Used);
      }
    }
  }

  // move some forms around
  var InsertionPoint, Node;
  var AllNone = document.evaluate(
    "//div[@class='formbox']/div[position()=1]",
    document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null
  ).singleNodeValue;
  AllNone.innerHTML = "<div class='right'>" +
    "<a href='javascript:void(0)' id='GM_All'>" + Translate("All") + "</a> / " +
    "<a href='javascript:void(0)' id='GM_None'>" + Translate("None") + "</a> / " +
    "<a href='javascript:void(0)' id='GM_Infantry'>" + Translate("Single Infantry") + "</a> / " +
    "<a href='javascript:void(0)' id='GM_Paste'>" + Translate("Paste") + "</a> / " +
    "<a href='javascript:void(0)' id='GM_Invert'>" + Translate("Invert") + "</a>";
  document.getElementById("GM_All").
    addEventListener("click", SetupSetAll, true)
  document.getElementById("GM_None").
    addEventListener("click", SetupSetAll, true)
  document.getElementById("GM_Infantry").
    addEventListener("click", SingleInfantry, true)
  document.getElementById("GM_Paste").
    addEventListener("click", PasteArmyMarch, true)
  document.getElementById("GM_Invert").
    addEventListener("click", PasteArmyInvert, true)

  var MarchType = document.evaluate(
    "//form[@name='form1']/descendant::*[@id='type']",
    document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null
  ).singleNodeValue.parentNode.parentNode;
  var Submit = MarchType.nextSibling.nextSibling;
  
  function RetainManualFormation(Event) {
    window.name = "QuickGo" + new Date().getTime();
    var Formation = document.getElementById("GM_Formation");
    var FormationNum = Formation.options[Formation.selectedIndex].value;
    Formation = Formation.options[Formation.selectedIndex].innerHTML;
    GM_setValue(window.name, -1);
    GM_setValue(window.name + "Formation", Formation);
    GM_setValue(window.name + "FormationNum", FormationNum);
    GM_setValue(window.name + "X", TargetX);
    GM_setValue(window.name + "Y", TargetY);
    Form.removeEventListener("submit", RetainManualFormation, true);
  }
  Form.addEventListener("submit", RetainManualFormation, true);

  [
    ["Attack", "3"], ["Spy", "7"], ["Transfer", "8"], ["Support", "2"],
    ["Scavenge", 5]
  ].forEach(
    function (Option) {
      var NewNode = document.createElement("input");
      var Exists = document.evaluate(
        "//form[@name='form1']/descendant::*[@id='type']/option[@value='" +
          Option[1] + "']",
        document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null 
      ).singleNodeValue;
      if (Exists) {
        NewNode.value = Exists.innerHTML
        NewNode.type = "button";
        NewNode.id = "GM_" + Option[0] + "0";
        NewNode.addEventListener("click", QuickGo, true);
        Submit.appendChild(document.createElement("br"));
        Submit.appendChild(NewNode);
      }
    }
  );
  
  var Table = document.getElementById("units_to_send");
  Table.parentNode.setAttribute("style", "margin: 0; padding: 0;");
  var NewTable = document.createElement("table");
  NewTable.setAttribute("width", "100%");
  NewTable.innerHTML = "<tr><td valign='top' id='GM_Tab1'></td>" +
    "<td valign='top' align='right' width='225px'>" +
    "<span id='GM_Tab2'></span></td></tr>";
  Table.parentNode.insertBefore(NewTable, Table);

  var Formations = GM_getValue(SavePrefix + "Formations", "");
  Formations ? Formations = eval(Formations) : Formations = [[Translate("Default"), "0"]];
  var FormationNode = document.createElement("div");
  var TempText = "";
  Formations.forEach(
    function (Option) {
      TempText += "<option value='" + Option[1] + "'>" +
        Option[0] + "</option>";
    }
  );
  FormationNode.innerHTML = Translate("Formation") +
    ":<br /><select id='GM_Formation'>" + TempText + "</select>";

  InsertionPoint = document.getElementById("GM_Tab1");
  InsertionPoint.appendChild(AllNone);
  InsertionPoint.appendChild(Table);
  InsertionPoint = document.getElementById("GM_Tab2");
  InsertionPoint.appendChild(MarchType);
  MarchType.parentNode.insertBefore(FormationNode, MarchType.nextSibling);

  var FormationNode = document.getElementById("GM_Formation");
  FormationNode.style.color = "red";
  FormationNode.style.textDecoration = "blink";
  var SelNodes = FormationNode.options;
  var Found = false;
  for (var N = 0; N < SelNodes.length; N++) {
    if (SelNodes[N].innerHTML == DefaultAttack) {
      SelNodes[N].selected = true; Found = true; break;
    }
  }
  if (! Found && DefaultAttack)
    alert(Translate("Default attack formation not found."));

  InsertionPoint.appendChild(Submit);
  var PopNode = document.getElementById("pop_span");
  PopNode.innerHTML = String(Pop);
  PopNode = PopNode.parentNode.parentNode;
  InsertionPoint.appendChild(PopNode);
  if (! UKMode) {
    CargoNode = document.getElementById("sum_cargo");
    CargoNode.parentNode.parentNode.parentNode.removeChild(CargoNode.parentNode.parentNode);
  }

  [
    "Speed", "Damage", "Mystics", "Encumbrance", "Non-Mystics", "Castles"
  ].forEach(
    function (Option) {
      var NewNode = document.createElement("div");
      NewNode.setAttribute("class", "row");
      NewNode.innerHTML = "<div class='left'><label" +
        (Option == "Speed" ? " id='GM_SpeedLabel'" : "") +
        ">" + Translate(Option) + ":</label></div>" +
        (Option == "Speed"
          ? "<table style='text-align: right'>" +
            "<tr><td style='margin: 0; padding: 0;'>"
          : "") +
        "<div " + (Option == "Speed" ? "style='font-size: 75%;'" : "") +
        "class=\"right\" id=\"GM_" + Option + "\"></div>" +
        (Option == "Speed"
          ? "</td><td style='margin: 0; padding: 0; font-size: 75%;' " +
            "id='GM_QuickControls'></td></tr></table>"
          : "");
      if (Option != "Castles") {
        PopNode.parentNode.insertBefore(NewNode, PopNode.parentNode.lastChild);
      } else {
        NewNode.innerHTML = "<div style='margin: 5px; padding: 5px'>" +
          NewNode.innerHTML + "</div>";
        NewTable.parentNode.appendChild(NewNode);
      }
    }
  );
  var QuickNode = document.createElement("div");
  QuickNode.setAttribute("class", "row");
  QuickNode.innerHTML = "<label>" + Translate("Quick Roads") +
    ": </label><input id='" +
    "GM_QuickRoads' type='checkbox' />";
  InsertionPoint = document.getElementById("GM_SpeedLabel");
  InsertionPoint.parentNode.
    insertBefore(QuickNode, InsertionPoint);
  document.getElementById("GM_QuickRoads").
    addEventListener("change", UpdateMarchNums, true);

  Node = document.evaluate(
    "//input[@name='attackx']", document, null,
    XPathResult.FIRST_ORDERED_NODE_TYPE, null
  ).singleNodeValue;
  Node.type = "text"; Node.size = 4;
  Node.addEventListener("blur", UpdateMarchNums, true);
  Node.addEventListener(
    "change",
    function () {document.getElementById("GM_QuickRoads").checked = false;},
    "true"
  );
  Form.action = "pohod.php?attackx=" + Node.value;
  Node = document.evaluate(
    "//input[@name='attacky']", document, null,
    XPathResult.FIRST_ORDERED_NODE_TYPE, null
  ).singleNodeValue;
  Node.type = "text"; Node.size = 4;
  Node.addEventListener("blur", UpdateMarchNums, true);
  Node.addEventListener(
    "change",
    function () {document.getElementById("GM_QuickRoads").checked = false;},
    "true"
  );
  Form.action += "&attacky=" + Node.value;
  var CastleSelection = document.createElement("select");
  CastleSelection.innerHTML += "<option value=''></option>";
  for (var N = 0; N < PlayerCastles.length; N++) {
    CastleSelection.innerHTML += "<option value='" + PlayerCastles[N][2] + ":" +
      PlayerCastles[N][3] + "'>" + PlayerCastles[N][0] + "</option>";
  }
  CastleSelection.id = "GM_CastleSelect";
  CastleSelection.addEventListener("change", HandleTransfer, true);
  Node.parentNode.insertBefore(CastleSelection, Node.nextSibling);
  var CastleLabel = document.createElement("span");
  CastleLabel.id = "GM_CastleLabel";
  CastleLabel.style.color = "white";
  Node.parentNode.insertBefore(CastleLabel, CastleSelection.nextSibling);
  UpdateMarchNums();
  window.setInterval(UpdateMarchNums, 1000);

  var SpeedBRs = document.evaluate(
    "descendant::br", document.getElementById("GM_Speed"), null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null
  );
  var PatFirst = /\(\d+-\d+\)$/i;
  for (var N = 0; N < SpeedBRs.snapshotLength; N++) {
    if (PatFirst.test(SpeedBRs.snapshotItem(N).previousSibling.textContent)) {
      [
        ["QAtt", "A"], ["QSpy", "S"], ["QScav", "$"], ["QTransfer", "T"]
      ].forEach(
        function (Option) {
          var Transfers = document.evaluate(
            "//form[@name='form1']/descendant::*[@id='type']/option[@value='8']",
            document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null 
          ).singleNodeValue;
          if (Option[1] != "T" || Transfers) {
            var Key = document.createElement("span");
            Key.innerHTML = "&nbsp;<a href='javascript:void(0);' id='GM_" +
              Option[0] + String(N) + ">" + Translate(Option[1]) + "</a>";
            Key.addEventListener("click", QuickGo, true);
            document.getElementById("GM_QuickControls").appendChild(Key);
          }
        }
      );
    }
    document.getElementById("GM_QuickControls").
      appendChild(document.createElement("br"));
  }
  var UnitID;
  for (var N = 0; N < Form.elements.length; N++) {
    UKMode ? UnitID = Form[N].name : UnitID = FormToID(Form[N].name);
    if (UnitID in Units) {
      // tweak handler to update encumbrance and speed as well as pop
      Form[N].addEventListener("blur", UpdateMarchNums, true);
      // additional % links
      var Num = FindNum(Form[N]);
      var NewLinks = document.createElement("span");
      NewLinks.innerHTML =
        " <span style='font-size: 75%'>" +
        "<a href='javascript:void(0);' class='GM_Unit_ChangeOne'>-1</a>" +
        " <a href='javascript:void(0);' class='GM_Unit_ChangeOne'>+1</a>" +
        " <a class='GM_Unit_" + UnitID + "_0' href='javascript:void(0);'" +
        ">0%</a>" +
        " <a class='GM_Unit_" + UnitID + "_" + String(Math.floor(Num / 3)) +
        "' href='javascript:void(0);'>33%</a>" +
        " <a class='GM_Unit_" + UnitID + "_" + String(Math.floor(Num / 2)) +
        "' href='javascript:void(0);'>50%</a>" +
        " <a class='GM_Unit_" + UnitID + "_" + String(Num) +
        "' href='javascript:void(0);'>100%</a>";
      var CurrSib = Form[N].nextSibling;
      // remove existing text nodes--too hard to find insertion point
      while (CurrSib != null) {
        Form[N].parentNode.removeChild(CurrSib);
        CurrSib = Form[N].nextSibling;
      }
      Form[N].parentNode.insertBefore(NewLinks, Form[N].nextSibling);
    }
  }

  var Nodes = document.evaluate(
    "//a[starts-with(@class, 'GM_Unit_')]",
    document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null
  );
  for (var N = 0; N < Nodes.snapshotLength; N++) {
    var Node = Nodes.snapshotItem(N);
    if (Node.getAttribute("class") == "GM_Unit_ChangeOne") {
      Node.addEventListener("click", ChangeOne, true);
    } else {
      Node.addEventListener("click", SetupMax, true);
    }
  }
}

/******************************************************************************/
// march page 2--default attack formation, moving oft-used controls to top

function InitMarchUpdate2(Event) {
  var AcumTime = 0;
  function CalcMarch2Time(Event) {
    OneWay = document.getElementById(UKMode ? "z" : "timeDirection").innerHTML;
    if (OneWay == "-") {OneWay = 0;} else {OneWay = ToSeconds(OneWay);}

    var NameNode = document.getElementById("GM_CastleName");
    var NewNode = document.getElementById("GM_Timing");
    var ServerArriveNode = document.getElementById("GM_ServerArrive");
    var ServerTime = document.getElementById("theClock").innerHTML;
    if (ServerTime == "") ServerTime = "00:00:00";
    var TargetDistance = Dist(
      [
        document.getElementById(UKMode ? "att_x" : "targetX").value,
        document.getElementById(UKMode ? "att_y" : "targetY").value
      ],
      [Home[0], Home[1]],
      true
    );  
    var BaseSpeed = OrigOneWay / 60 / TargetDistance / SpeedMod;
    var EffSpeed = StripDecimals(Round(OneWay / 60 / TargetDistance, 0.01), 2);
    var SpeedNode = document.getElementById("pohodCargo").
      parentNode.previousSibling.previousSibling.getElementsByTagName("div")[1];
    SpeedNode.innerHTML = SpeedNode.innerHTML.split(" ")[0] + " (" +
      Translate("Effective Speed") + " " + EffSpeed + ")";
    var LocalArrive = new Date();
    LocalArrive.setSeconds(LocalArrive.getSeconds() + OneWay);
    var LocalReturn = new Date();
    LocalReturn.setSeconds(LocalReturn.getSeconds() + 2 * OneWay);
    ServerArriveNode.innerHTML = Translate("Server Arrival") + ": " +
      HMS((ToSeconds(ServerTime) + OneWay) % 86400) + "<br />" +
      Translate("Server Return") + ": " +
      HMS((ToSeconds(ServerTime) + 2 * OneWay) % 86400) + "<br />" +
      Translate("Local Arrival") + ": " +
      DateFormat(LocalArrive) + "<br />" + Translate("Local Return") + ": " +
      DateFormat(LocalReturn);
    var Speed = SpeedNode.innerHTML.split(" ")[0];
    var Now = new Date();
    NewNode.innerHTML = "<div class='left'>" + Translate("Timing (no coins)") +
      ":</div><div class='right'>" +
      MarchTime(TargetDistance, BaseSpeed, null, null, true, false, Speed) + "</div>";
    GetCastleName(
      [
        0, document.getElementById(UKMode ? "att_x" : "targetX").value,
        document.getElementById(UKMode ? "att_y" : "targetY").value
      ],
      "GM_CastleName"
    );
    var Node = document.getElementById("addedMarchesResumLocalTime");
    if (Node) {
      var LocalAcumTime = new Date();
      LocalAcumTime.setSeconds(LocalAcumTime.getSeconds() + AcumTime);
      Node.innerHTML = DateFormat(LocalAcumTime);
    }
    Node = document.getElementById("addedMarchesResumServerTime");
    if (Node) {
      Node.innerHTML = HMS((ToSeconds(ServerTime) + AcumTime) % 86400);
    }

  }

  var OrigOneWay, SpeedFrac, SpeedMotivation, SpeedMod;
  var TempNode = document.getElementById("motiv" + (! UKMode ? "_speed" : ""));
  if (TempNode) TempNode.addEventListener("change", CalcMarch2Time, true);
  document.getElementById(UKMode ? "ppp" : "speed").
    addEventListener("change", CalcMarch2Time, true);

  if (Event) {
    OrigOneWay =
      document.getElementById(UKMode ? "z" : "timeDirection").innerHTML;
    if (OrigOneWay == "-") {
      OrigOneWay = 0;
    } else {
      OrigOneWay = ToSeconds(OrigOneWay);
    }
    SpeedFrac =
      document.getElementById(UKMode ? "ppp" : "speed").selectedIndex / 10;
    document.getElementById(UKMode ? "ppp" : "speed").
      addEventListener("change", CalcMarch2Time, true);
    SpeedMotivation = document.getElementById("motiv" + (! UKMode ? "_speed" : ""));
    if (SpeedMotivation)
      SpeedMotivation.addEventListener("change", CalcMarch2Time, true);
    SpeedMotivation
      ? SpeedMotivation =
          1 - Number(SpeedMotivation.options[SpeedMotivation.selectedIndex].value) /
            100
      : SpeedMotivation = 1;
  } else {
    OneWay = 0; SpeedFrac = 0; SpeedMotivation = 1; 
  }

  /* 
   * Add column with stimated time in the marches added. Also add a final full 
   * march time and arrival date.
   * 
   * Note: To get the full time we need to calculate the march time from the 
   * last place to the origin at the same speed.
   */
  var DeleteNode = document.getElementById("addedMarchesResum");
  if (DeleteNode) DeleteNode.parentNode.removeChild(DeleteNode);
  var AddedMarches = document.evaluate(
    "//tbody[@id='addedMarches']/tr",
    document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null
  );
  var Col, StimatedTime;
  AcumTime = 0;
  for (var N = 0; N < AddedMarches.snapshotLength; N++) {
    var March = AddedMarches.snapshotItem(N);
    Col = document.evaluate("descendant::td",
      March, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null
    );
    StimatedTime = ToSeconds(Col.snapshotItem(4).innerHTML);
    AcumTime += StimatedTime;
    if (N != 0) {
      Col.snapshotItem(4).innerHTML = HMS(StimatedTime) + " &nbsp; " + HMS(AcumTime);
    }
    if (N == AddedMarches.snapshotLength - 1) {
      var LastPlaceOrig = Col.snapshotItem(1).innerHTML.split(":");
      var LastPlaceTarget = Col.snapshotItem(2).innerHTML.split(":");
      var LastSpeed = Dist(LastPlaceTarget, LastPlaceOrig) / StimatedTime;
      AcumTime += Dist(Home, LastPlaceTarget) / LastSpeed;
      var InsertionPoint = document.getElementById("addedMarchesHolder");
      var NewNode = document.createElement("div");
      NewNode.setAttribute("id", "addedMarchesResum");
      NewNode.innerHTML = 
        '<br /><table cellspacing="1" width="100%" border="0"><thead><tr>' +
        '<td>' + Translate("Timing (no coins)") + '</td>' +
        '<td>' + Translate("Server Return") + '</td>' +
        '<td>' + Translate("Local Return") + '</td>' +
        '</tr></thead><tbody><tr>' +
        '<td id="addedMarchesResumTime" style="text-align:center;">' + HMS(AcumTime) + '</td>' +
        '<td id="addedMarchesResumServerTime" style="text-align:center;"></td>' +
        '<td id="addedMarchesResumLocalTime" style="text-align:center;"></td>' +
        '</tr></tbody></table>';
      InsertionPoint.appendChild(NewNode);
    }
  }

  SpeedMod = (1 + SpeedFrac) * SpeedMotivation;
  if (March2IntervalID) window.clearInterval(March2IntervalID);
  CalcMarch2Time();
  March2IntervalID = window.setInterval(CalcMarch2Time, 1000);
}

var PageMatch = new RegExp(Host + "/pohod\\.php", "i").test(window.location);
var MarchesFilter = document.getElementsByClassName("marchesFilter").length;
if (PageMatch && ! MarchesFilter) {
  var Options = document.getElementById("army_orders").options;
  var Formations = [];
  for (var N = 0; N < Options.length; N++) {
    Formations.push([Options[N].innerHTML, Options[N].value]);
  }
  GM_setValue(SavePrefix + "Formations", uneval(Formations));

  var DefaultSpeed = -1;
  var DefaultFormation = "", DefaultFormationNum = "0";
  if (window.name) {
    DefaultSpeed = GM_getValue(window.name, -1);
    DefaultFormation = GM_getValue(window.name + "Formation");
    DefaultFormationNum = GM_getValue(window.name + "FormationNum");
  }
  var SelNodes = document.evaluate(
    "//select[@id='army_orders']/option",
    document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null
  );
  var Found = false;
  for (var N = 0; N < SelNodes.snapshotLength; N++) {
    if (SelNodes.snapshotItem(N).innerHTML == DefaultFormation) {
      SelNodes.snapshotItem(N).selected = true; Found = true; break;
    }
  }
  var Options = document.getElementById(UKMode ? "ppp" : "speed").options;
  var ButtonNode = document.evaluate(
    "//div[@class='buttonrow']",
    document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null
  );
  ButtonNode = ButtonNode.snapshotItem(1);
  Formation.style.color = "red";
  Formation.style.textDecoration = "blink";
  var Node = document.getElementById(UKMode ? "z" : "timeDirection"),
      NewNode, NameNode, ServerArriveNode;

  var March2IntervalID;
  Node.addEventListener("DOMNodeInserted", InitMarchUpdate2, true);
  document.getElementById(UKMode ? "att_x" : "targetX").
    addEventListener("keypress", InitMarchUpdate2, true);
  document.getElementById(UKMode ? "att_y" : "targetY").
    addEventListener("keypress", InitMarchUpdate2, true);
  NewNode = document.createElement("div");
  NewNode.setAttribute("id", "GM_Timing");
  NewNode.setAttribute("class", "row");
  Node.parentNode.parentNode.parentNode.
    insertBefore(NewNode, Node.parentNode.parentNode.nextSibling);
  NameNode = document.createElement("span");
  NameNode.id = "GM_CastleName";
  Node = document.getElementById(UKMode ? "att_y" : "targetY").parentNode;
  Node.insertBefore(NameNode, Node.lastChild);
  ServerArriveNode = document.createElement("span");
  ServerArriveNode.id = "GM_ServerArrive";
  document.getElementById(UKMode ? "z" : "timeDirection").
    parentNode.appendChild(ServerArriveNode);
  var TempoNode = document.getElementById(UKMode ? "ppp" : "speed").
    parentNode.parentNode;
  var FormationNode =
    SelNodes.snapshotItem(0).parentNode.parentNode.parentNode;
  for (var N = 0; N < Options.length; N++) {
    Options[N].innerHTML = String(N) + " (" + String(100 - 10 * N) + "%)";
  }
  var InsertionPoint = document.getElementById(UKMode ? "ppp" : "speed").
    parentNode.parentNode.parentNode;
  InsertionPoint.insertBefore(FormationNode, InsertionPoint.firstChild);
  InsertionPoint.insertBefore(TempoNode, InsertionPoint.firstChild);
  InsertionPoint.insertBefore(ButtonNode, InsertionPoint.firstChild);
  if (DefaultSpeed != -1) {
    Options.selectedIndex = DefaultSpeed;
    if (! Found && window.name && DefaultFormationNum != "0") {
      alert(Translate("Default attack formation not found."));
    } else {
      ButtonNode.getElementsByTagName("input")[0].click();
    }
  }
}

/******************************************************************************/
// calculate times for march in progress; copy army to "clipboard"

function CalcCancelTime(Arrives, OneWay, ArrivesNode) {
  var Now = new Date();
  var CancelTime = Math.ceil(
    (Now.getTime() < Arrives.getTime()) *
    (OneWay - (Arrives.getTime() - Now.getTime())) / 1000
  );
  var Node = document.getElementById("GM_CancelNode");
  if (! Node) {
    ArrivesNode.nextSibling.innerHTML += "<br /><span id='GM_CancelNode></span>";
    Node = document.getElementById("GM_CancelNode");
  }
  Node.innerHTML = "(" + Translate("Cancel") + ": ";
  if (CancelTime) {
    Node.innerHTML += HMS(CancelTime) + ")";
  } else {
    Node.innerHTML += "-- )";
  }
}

var PageMatch = new RegExp(
  Host + "/info\\.php\\?what=pohod&posted_id=\\d+$", "i"
).test(window.location);
if (PageMatch) {
  var PatCoords = /(\d+):(\d+)/i;
  var Nodes = document.evaluate(
    "//div[@class='left']",
    document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null
  );
  var Node;
  var Now = new Date();
  for (var N = 0; N < Nodes.snapshotLength; N++) {
    Node = Nodes.snapshotItem(N);
    switch (N) {
      case (3):
        var Arrives = LocalTime(Node.nextSibling.innerHTML);
        var ArrivesNode = Node;
        break;
      case (4):
        var Returns = LocalTime(Node.nextSibling.innerHTML); break;
      case (5):
        var Gold = Number(Node.nextSibling.innerHTML); break;
      case (6):
        var Iron = Number(Node.nextSibling.innerHTML); break;
      case (7):
        var Wood = Number(Node.nextSibling.innerHTML); break;
      case (8):
        var Food = Number(Node.nextSibling.innerHTML); break;
      case (10):
        var Cargo = Number(Node.nextSibling.innerHTML);
        var CargoNode = Node;
        break;
      case (1):
        var From = PatCoords.exec(Node.nextSibling.innerHTML).slice(1);
        var Temp =
          eval(GM_getValue(SavedHost + "_MapData_" + From[0] + "_" + From[1], ""));
        Temp ? Temp = Temp[4] : Temp = "";
        Node.nextSibling.innerHTML += " " + Temp;
        break;
      case (2):
        var To = PatCoords.exec(Node.nextSibling.innerHTML).slice(1);
        var Temp =
          eval(GM_getValue(SavedHost + "_MapData_" + To[0] + "_" + To[1], ""));
        Temp ? Temp = Temp[4] : Temp = "";
        Node.nextSibling.innerHTML += " " + Temp;
        break;
    }
  }
  var Distance = Dist(From, To, true);
  var OneWay = Returns.getTime() - Arrives.getTime();
  var EffSpeed = OneWay / (60000) / Distance;
  CalcCancelTime(Arrives, OneWay, ArrivesNode);
  window.setInterval(CalcCancelTime, 1000, Arrives, OneWay, ArrivesNode);

  OneWay = HMS(OneWay / 1000);
  var NewNode = document.createElement("div");
  NewNode.innerHTML =
    "<div class='row'>" +
    "<div class='left'>&rarr;</div><div class='right'>" +
    StripDecimals(Distance, 2) + " (" + Translate("Effective Speed") + " " +
    StripDecimals(EffSpeed, 2) + ")</div></div>" +
    "<div class='row'><div class='left'>" + Translate("One-Way") +
    ":</div><div class='right'>" + OneWay + "</div></div>";
  ArrivesNode.parentNode.insertBefore(NewNode, ArrivesNode);
  var PercentFull = Round(100 * (Gold + Iron + Wood + Food) / Cargo, 1);
  CargoNode.nextSibling.innerHTML += " (" + String(PercentFull) + "%)";

  // copy army
  Node = document.evaluate(
    "descendant::div[@class='textformbox'][position()=last()]/div",
    document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null
  );
  var PatUnit = new RegExp(
    "<div class=\"left\">(.*?)(?:</p>)?</div>[\\s\\S]*?" +
      "<div class=\"right\">(\\d+)</div>",
    "i"
  );
  var ArmyArray = new Array(UnitMaxID + 1);
  for (var N = 0; N < Node.snapshotLength; N++) {
    var Match = PatUnit.exec(Node.snapshotItem(N).innerHTML);
    ArmyArray[Number(UnitNameToID[Match[1]].slice(1))] = Match[2];
  }
  var CopyButton = document.createElement("input");
  CopyButton.type = "button"; CopyButton.value = Translate("Copy");
  CopyButton.addEventListener(
    "click",
    function () {
      GM_setValue(SavePrefix + "_CopyArmy", uneval(ArmyArray));
    },
    true
  );
  var InsertionPoint = document.getElementsByTagName("h2");
  InsertionPoint = InsertionPoint[InsertionPoint.length - 1];
  InsertionPoint.parentNode.
    insertBefore(CopyButton, InsertionPoint.nextSibling);
}

/******************************************************************************/
// scavenge/data from spy report

// calculate stealable resources given amount
function CalcStoreGuard(Amt, Guard) {
  return Math.max(
    0, Amt - (1 - StealFrac) * GuardLevels[Number(Guard)]
  );
}

// calculate stealable resources given resources
function CalcScavengeGuard(Report, Pat, Guard) {
  var Amt = Pat.exec(Report.innerHTML);
  Amt ? Amt = Number(Amt[1]) : Amt = 0;
  return CalcStoreGuard(Amt, Guard);
}

// return first match group or 0
function BuildingLevel(Report, Pat) {
  var Match = Pat.exec(Report.innerHTML);
  if (Match) {
    return Match[1];
  } else {
    return "0";
  }
}

function CopySpyUnits(Event) {
  var PatUnits = new RegExp(
    "<b>" + Event.target.previousSibling.innerHTML +
      "</b><input[^>]+>([\\s\\S]*?)((?:<b>)|(?:<br>.+?:<br>)|$)",
    "i"
  );
  var Units = PatUnits.exec(Event.target.parentNode.innerHTML)[1];
  ParseClipboardUnits(Units);
}

// saved message management
function SaveMessage(Event) {
  var Node = document.evaluate(
    "ancestor::*[@class='box message']",
    Event.target, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null
  ).singleNodeValue;
  var SavedMessages =
    eval(GM_getValue(SavePrefix + "Messages", "[]"));
  var Found = false;
  for (var N = 0; N < SavedMessages.length; N++) {
    if (SavedMessages[N] == Node.getAttribute("GM_OrigHTML")) {
      Found = true; break;
    }
  }
  if (! Found) SavedMessages.push(Node.getAttribute("GM_OrigHTML"));
  GM_setValue(SavePrefix + "Messages", uneval(SavedMessages));
}

function DisplayMessages() {
  var DelNode = document.getElementById("deleteMessages");
  var DelText =
    GM_getValue(SavePrefix + "DelMsgNodes", "");
  if (! DelNode && DelText) {
    DelNode = document.createElement("div");
    document.getElementById("content").appendChild(DelNode);
    DelNode.innerHTML = DelText; DelNode.id = "deleteMessages";
  }
  var Nodes = document.evaluate(
    "//div[@class='infosmall']",
    document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null
  );
  for (var N = 0; N < Nodes.snapshotLength; N++) {
    Nodes.snapshotItem(N).parentNode.removeChild(Nodes.snapshotItem(N));
  }
  Nodes = document.getElementsByClassName("messageWrapper");
  while (Nodes.length) {
    Nodes[0].parentNode.removeChild(Nodes[0]);
  }
  Nodes = document.getElementsByClassName("paging");
  for (var N = 0; Nodes.length > 0; N++) {
    Nodes[0].parentNode.removeChild(Nodes[0]);
  }
  Nodes = document.getElementsByClassName("folders")[0].
    getElementsByTagName("li");
  for (var N = 0; N < Nodes.length; N++) {
    RemoveClass(Nodes[N], "active");
  }
  DelNode = document.getElementById("GM_DeletePage");
  if (DelNode) DelNode.parentNode.removeChild(DelNode);
  AddClass(document.getElementById("GM_SavedMessages"), "active");
  DelNode = document.evaluate(
    "//a[contains(@href,'delall=yes')]",
    document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null
  ).singleNodeValue;
  if (DelNode) {
    DelNode.id = "GM_Del-2";
    DelNode.href = "javascript:void(0);";
    DelNode.addEventListener("click", DeleteMessage, true);
  }
  DelNode = document.evaluate(
    "//a[contains(@href,'document.delMsgs.submit()')]",
    document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null
  ).singleNodeValue;
  if (DelNode) {
    DelNode.id = "GM_Del-1";
    DelNode.href = "javascript:void(0);";
    DelNode.setAttribute("onclick", "");
    DelNode.addEventListener("click", DeleteMessage, true);
  }
  var InsertionPoint = document.getElementById("GM_UsefulLinks");
  var SavedMessages =
    eval(GM_getValue(SavePrefix + "Messages", "[]"));
  
  for (var N = 0; N < SavedMessages.length; N++) {
    var NewNode = document.createElement("div");
    NewNode.setAttribute("class", "messageWrapper");
    NewNode.innerHTML = SavedMessages[N];
    InsertionPoint.parentNode.insertBefore(NewNode, InsertionPoint.nextSibling);
    FormatSpyReport(NewNode, true);
    DelNode = document.evaluate(
      "descendant::a[@id='delete']",
      NewNode, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null
    ).singleNodeValue;
    if (DelNode) {
      DelNode.href = "javascript:void(0);";
      DelNode.id = "GM_Del" + String(N);
      DelNode.addEventListener("click", DeleteMessage, true);
    }
  }
}

function DeleteMessage(Event) {
  var ID = Number(Event.target.id.slice(6));
  var SavedMessages =
    eval(GM_getValue(SavePrefix + "Messages", "[]"));
  if (ID >= 0) {
    SavedMessages.splice(ID, 1);
  } else if (ID == -1) {
    var Nodes = document.getElementsByClassName("messageWrapper");
    var NewMessages = [];
    for (var N = 0; N < Nodes.length; N++) {
      var Checked = document.evaluate(
        "descendant::input[@name='msg_delete[]']",
        Nodes[N], null, XPathResult.FIRST_ORDERED_NODE_TYPE, null
      ).singleNodeValue.checked;
      if (! Checked) NewMessages.push(SavedMessages[Nodes.length - 1 - N]);
    }
    SavedMessages = NewMessages;
    SavedMessages.reverse();
  } else if (ID == -2) {
    SavedMessages = [];
  }
  GM_setValue(SavePrefix + "Messages", uneval(SavedMessages));
  DisplayMessages();
}

function FormatSpyReport(Report, SavedLocal) {
  var OrigHTML = Report.innerHTML;
  var PatName = /<p>.+(?:<br>\s*)+([\s\S]+?[^\s]+)\s*(?:&nbsp;)/i;
  var Name = BuildingLevel(Report, PatName);
  var PatCoords = /\[(\d+):(\d+)\]/i;
  var PatCoordsG = /(?:<a[^>]*>)?\[(\d+):(\d+)\](?:<\/a>)?/ig;
  var PatGold = new RegExp(Translate("Gold") + ":" + " (\\d+)\\s*(<br>)?", "i");
  var PatIron = new RegExp(Translate("Iron") + ":" + " (\\d+)\\s*(<br>)?", "i");
  var PatWood = new RegExp(Translate("Wood") + ":" + " (\\d+)\\s*(<br>)?", "i");
  var PatFood = new RegExp(Translate("Food") + ":" + " (\\d+)\\s*(<br>)?", "i");
  var PatGoldProd = new RegExp(Translate("Gold Mine") + " - (\\d+)", "i");
  var PatIronProd = new RegExp(Translate("Iron Mine") + " - (\\d+)", "i");
  var PatWoodProd = new RegExp(Translate("Lumbermill") + " - (\\d+)", "i");
  var PatFoodProd = new RegExp(Translate("Farms") + " - (\\d+)", "i");
  var PatWall = new RegExp(Translate("Wall") + " - (\\d+)", "i");
  var PatHomes = new RegExp(Translate("Homes") + " - (\\d+)", "i");
  var PatOrder = new RegExp(Translate("Order") + " - (\\d+)", "i");
  var PatBarracks = new RegExp(Translate("Barracks") + " - (\\d+)", "i");
  var PatStables = new RegExp(Translate("Stables") + " - (\\d+)", "i");
  var PatGuild = new RegExp(Translate("Guild") + " - (\\d+)", "i");
  var PatGuard = new RegExp(Translate("Guard Station") + " - (\\d+)", "i");
  var PatStore = new RegExp(Translate("Store House") + " - (\\d+)", "i");
  var PatBuildings = /(<b>.+?<\/b>[\s\S]*?)<\/p>/i;
  var Now = new Date();
  var DateStamp = String(Now.getFullYear()) +
    Zero(String(Now.getMonth() + 1), 2) + Zero(String(Now.getDate()), 2);

  // relink coords to march page
  Report.innerHTML = Report.innerHTML.replace(
    PatCoordsG,
    function () {
      var Names = GetCastleName(arguments);
      var Start = "";
      if (Names[0].length) {
        Start = Names[0] + "--";
      } else if (Names[1].length) {
        if (! PatName.test(Report.innerHTML))
          Start = Names[1][1];
        Start += " (" + Names[1][0] + ") ";
      }
      return Start + arguments[0] + "&nbsp;(<a href='" +
        Host + "/pohod.php?attackx=" +
        arguments[1] + "&attacky=" + arguments[2] +"'>&clubs;</a>)";
    }
  );

  // highlight coords
  Report.innerHTML = Report.innerHTML.replace(
    PatCoordsG,
    function () {
      return "<span style='background-color: black'>" + arguments[0] +
        "</span>";
    }
  );

  var TimeNode = Report.getElementsByClassName("details")[0];
  var ReportTime = LocalTime(TimeNode.innerHTML);
  TimeNode.innerHTML = "<small>" + DateFormat(ReportTime, true) + "</small>";
  var Seconds = Math.ceil((Now.getTime() - ReportTime.getTime()) / 1000);
  var Colour = "";
  if (Seconds <= 14400) {
    Colour = "";
  } else if (Seconds <= 43200) {
    Colour = "lightgreen";
  } else if (Seconds <= 86400) {
    Colour = "orange";
  } else {
    Colour = "red";
  }
  Report = Report.getElementsByClassName("box message")[0];
  Report.setAttribute("GM_OrigHTML", OrigHTML);
  Report.innerHTML =
    (Colour ? "<span style='background-color: " + Colour + "'>": "<span>") +
    Translate("Message Age") + ": " + HMS(Seconds) + "</span><br />" + Report.innerHTML;
  // only spy reports have forward.php; only format as a spy report if this link is found
  var HasForward = document.evaluate(
    "descendant::a[starts-with(@href,'forward.php')]",
    Report, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null
  ).singleNodeValue;
  if (HasForward) {
    var Coords = [
      PatCoords.exec(Report.innerHTML)[1], PatCoords.exec(Report.innerHTML)[2]
    ];
    var GoldProd = BuildingLevel(Report, PatGoldProd);
    var IronProd = BuildingLevel(Report, PatIronProd);
    var WoodProd = BuildingLevel(Report, PatWoodProd);
    var FoodProd = BuildingLevel(Report, PatFoodProd);
    var MaxProd = [GoldProd, IronProd, WoodProd, FoodProd];
    MaxProd.sort(CompNum).reverse();
    MaxProd = MaxProd[0];
    var Wall = BuildingLevel(Report, PatWall);
    var Homes = BuildingLevel(Report, PatHomes);
    var Order = BuildingLevel(Report, PatOrder);
    var Barracks = BuildingLevel(Report, PatBarracks);
    var Stables = BuildingLevel(Report, PatStables);
    var Guild = BuildingLevel(Report, PatGuild);
    var MaxTrain = [Barracks, Stables, Guild];
    MaxTrain.sort(CompNum).reverse();
    MaxTrain = MaxTrain[0];
    var Guard = BuildingLevel(Report, PatGuard);
    var Store = BuildingLevel(Report, PatStore);
    var GoldAmt = CalcScavengeGuard(Report, PatGold, Guard);
    var IronAmt = CalcScavengeGuard(Report, PatIron, Guard);
    var WoodAmt = CalcScavengeGuard(Report, PatWood, Guard);
    var FoodAmt = CalcScavengeGuard(Report, PatFood, Guard);
    var Match = PatGold.exec(Report.innerHTML);
    if (Match && ! Match[2]) {
      Report.innerHTML = Report.innerHTML.replace(
        /(?:<br>)*(<b>)/ig, "<br /><br />$1"
      )
      Report.innerHTML = Report.innerHTML.replace(
        /(<\/b>)(?:<br>)*/ig, "$1<br />"
      )
      function BreakRes(Match) {return Match + "<br />";}
      Report.innerHTML = Report.innerHTML.replace(PatGold, BreakRes);
      Report.innerHTML = Report.innerHTML.replace(PatIron, BreakRes);
      Report.innerHTML = Report.innerHTML.replace(PatWood, BreakRes);
      Report.innerHTML = Report.innerHTML.replace(PatFood, BreakRes);
    }
    var Total = GoldAmt + IronAmt + WoodAmt + FoodAmt;
    var MaxTotal = 4 * CalcStoreGuard(StoreLevels[Number(Store)], Guard);
    var CastleDists = CalcCastleDists(Coords);

    Report.innerHTML = Report.innerHTML.replace(
      PatBuildings,
      "<table><tr id='GM_Buildings" + String(N) + "'><td><span id='GM_Ignore" +
      String(N) + "'>" + CastleDists[0] + "</span>" +
      "<br /><a href=\"" + Host + "/pohod.php?attackx=" +
      String(Coords[0]) + "&attacky=" + String(Coords[1]) + "\">&clubs;</a> " +
      "<a href=\"" + Host + "/map.php?setx=" +
      Coords[0] + "&sety=" + Coords[1] + "\">" + "&rarr;</a><br />" +
      "<input type='text' value='" +
      [
        "&apos;" + DateStamp,
        "&apos;" + Name, Coords[0], Coords[1],
        String(MaxProd), Wall, Guard,
        Store, String(Total), String(Total), String(Math.max(MaxTotal, Total)),
        String(Homes), String(Order), String(MaxTrain)
      ].join("\t") + "'><br />" +
      "<input type='text' value='" +
      [
        "&apos;" + DateStamp,
        "&apos;" + Name, Coords[0], Coords[1],
        String(MaxProd), Wall, Guard, Store, String(Total)
      ].join("\t") + "'><br />" +
      Translate("Total Res") + ": " + String(Total) + "/" + String(MaxTotal) +
      "<br /><br />" + "$1</td></tr></table>"
    );
    if (Match) {
      var NewNode = document.createElement("td");
      var SpeedText = "";
      for (var M = 0; M < Speeds.length; M++) {
        var Speed = Speeds[M];
        SpeedText += Translate("Speed") + " " +
          String(Speed[0]) + " (" + String(Speed[1].join(", ")) + ")<br />" +
          MarchTime(Dist(Coords), Speed[0], " ", [0, 9], false, false) + "<br />";
      }
      NewNode.innerHTML =
        "<small>" + SpeedText + "</small>";
      document.getElementById("GM_Buildings" + String(N)).appendChild(NewNode);
    }

    // add facility to copy units/supports if observed
    // units only shown if enough QWs survive, so the bolded items are
    // always in order
    [["Units", "4"], ["Supports", "5"]].forEach(
      function (Option) {
        var InsertionPoint = document.evaluate(
          "descendant::span[starts-with(@id,'GM_Ignore')]/following-sibling::b[" + Option[1] + "]",
          Report, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null
        ).singleNodeValue;
        if (InsertionPoint) {
          var CopyButton = document.createElement("input");
          CopyButton.type = "button"; CopyButton.value = Translate("Copy");
          CopyButton.id = Option;
          CopyButton.addEventListener("click", CopySpyUnits, true);
          InsertionPoint.parentNode.
            insertBefore(CopyButton, InsertionPoint.nextSibling);
        }
      }
    );
  }

  if (! SavedLocal) {
    var NewNode = document.createElement("span");
    NewNode.innerHTML = "<a href='javascript:void(0);'>Save</a>";
    NewNode.addEventListener("click", SaveMessage, true);
    var TempNode = Report.getElementsByTagName("p");
    TempNode = TempNode[TempNode.length - 1];
    TempNode.appendChild(NewNode);
  }
}

// calculate max possible scavenge based on guard station; march times
var PageMatch = new RegExp(
  Host + "/(?:news|writenote)\\.php(?:.*?(?:type=(\\d+)))?",
  "i"
).exec(window.location);
if (PageMatch) {
  var DelNode = document.getElementById("deleteMessages");
  if (DelNode) {
    GM_setValue(
      SavePrefix + "DelMsgNodes",
        DelNode.innerHTML
    );
  }
  var Paging = document.evaluate(
    "//p[@class='paging']", document, null,
    XPathResult.FIRST_ORDERED_NODE_TYPE, null
  ).singleNodeValue;
  if (Paging) {
    var NewNode = document.createElement("p");
    NewNode.innerHTML = Paging.innerHTML;
    NewNode.setAttribute("class", "paging"); NewNode.id = "GM_Paging";
    var Content = document.getElementById("content");
    Content.insertBefore(NewNode, Content.firstChild);
  }
  var InsertionPoint = document.getElementsByClassName("sent")[0];
  var NewNode = document.createElement("li");
  NewNode.id = "GM_SavedMessages"; NewNode.setAttribute("class", "sent");
  NewNode.innerHTML =
    "<a href='javascript:void(0);'>" + Translate("Saved") + "</a>";
  NewNode.addEventListener("click", DisplayMessages, true);
  InsertionPoint.parentNode.insertBefore(NewNode, InsertionPoint.nextSibling);

  var Reports = document.evaluate(
    "//div[@class='messageWrapper']", document, null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null
  );
  for (var N = 0; N < Reports.snapshotLength; N++) {
    var Curr = Reports.snapshotItem(N);
    var Node = document.evaluate(
      "preceding-sibling::h2[1]",
      Curr, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null
    ).singleNodeValue;
    if (Node) Curr.insertBefore(Node, Curr.firstChild);
    FormatSpyReport(Curr);
  }

  Node = document.getElementById("deleteMessages");
  if (Node) {
    var NewNode = document.createElement("a");
    NewNode.href = "javascript:void(0);"; NewNode.id = "GM_DeletePage";
    NewNode.innerHTML = Translate("Delete Page");
    NewNode.addEventListener(
      "click",
      function () {
        var Nodes = document.evaluate(
          "//span[@class='markMsg']/input[@type='checkbox']",
          document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null
        );
        for (var N = 0; N < Nodes.snapshotLength; N++) {
          Nodes.snapshotItem(N).checked = true;
        }
        document.evaluate(
          "//form[@name='delMsgs']",
          document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null
        ).singleNodeValue.submit();
      },
      true
    );
    Node.appendChild(NewNode);
  }

  switch(PageMatch[1]) {
    // autolink coords in personal messages
    case (UKMode ? "1" : "6"):
      var TextCoords = document.evaluate(
        "//div[@class='box message']/" +
          "descendant-or-self::*[contains(text(), ':')]",
        document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null
      );
      var PatBareCoord = /([.\s\(\[,;-])(\d+):(\d+)([.\s\)\],;-])/i;
      for (var N = 0; N < TextCoords.snapshotLength; N++) {
        var Curr = TextCoords.snapshotItem(N);
        var Match = PatBareCoord.exec(Curr.innerHTML);
        var LinkAncestor = document.evaluate(
          "ancestor-or-self::a",
          Curr, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null
        ).singleNodeValue;
        if (Match && ! LinkAncestor) {
          Curr.innerHTML = Curr.innerHTML.replace(
            PatBareCoord,
            "$1<span style='background-color: black'>" +
              "<a href='map.php?setx=$2&sety=$3'>$2:$3</a></span> " +
              "(<a href='pohod.php?attackx=$2&attacky=$3'>&clubs;</a>)$4"
          );
        }
      }
      break;
    // battle reports
    case ("2"):
      function CallBR(Doc, N) {
        var Match = Doc.evaluate(
          "//ns:span[@class='cleanupGold']/ancestor::ns:li",
          Doc, nsResolver, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null
        );
        var TotalScavenge = TotalStolen = 0, Current;
        for (let N = 0; N < Match.snapshotLength; N++) {
          Current = 0;
          for (let M = 0; M < 4; M++) {
            Current += Number(
              Match.snapshotItem(N).getElementsByTagName("span")[M].innerHTML
            );
          }
          if (
            Match.snapshotItem(N).getElementsByClassName("cleanupPopulation").length
          ) {
            TotalScavenge += Current;
          } else {
            TotalStolen += Current;
          }
        }
        var TotalCapacity = 0;
        var LastAttack = Doc.evaluate(
          "//ns:div[@class='armyOrder attacker']",
          Doc, nsResolver, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null
        );
        LastAttack = LastAttack.snapshotItem(LastAttack.snapshotLength - 1);
        var UnitsLeft = Doc.evaluate(
          "descendant::ns:a[contains(@id,'unitPicSmall')]",
          LastAttack, nsResolver, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null
        );
        var PatID = /unitPicSmall-(\d+)/i, PatAlive = /(\d+)\s*\//i;
        for (let N = 0; N < UnitsLeft.snapshotLength; N++) {
          TotalCapacity +=
            Units["u" + PatID.exec(UnitsLeft.snapshotItem(N).id)[1]]["carry"] *
              Number(PatAlive.exec(UnitsLeft.snapshotItem(N).innerHTML)[1]);
        }
        var AttackerText = Doc.getElementsByClassName("box round")[0].
          getElementsByTagName("h3")[0].innerHTML;
        var AttackingCastle = Doc.evaluate(
          "//ns:div[@id='" + AttackerText + "Info'][1]/descendant::ns:div[@class='details']/" +
            "descendant::ns:a[last()]",
          Doc, nsResolver, XPathResult.FIRST_ORDERED_NODE_TYPE, null
        ).singleNodeValue.innerHTML.split(":");
        AttackingCastle.unshift(AttackingCastle[0] + ":" + AttackingCastle[1]);
        var NewNode = document.createElement("span");
        NewNode.innerHTML = "<br />" +
          AttackerText + ": <span style='background-color: black'><a href=\"" + Host +
          "/map.php?setx=" +
          AttackingCastle[1] + "&sety=" + AttackingCastle[2] + "\">" +
          "[" + AttackingCastle[1] + ":" + AttackingCastle[2] + "]</a>" +
          "</span><span id='GM_PlaceCastleName" + String(N) + "'></span>" +
          "<br />" + Translate("Scavenge") + ": " +
          String(TotalScavenge) +
          "<br />" + Translate("Survivor Capacity") + ": " + String(TotalStolen) + "/" +
          String(TotalCapacity) + " (" +
          String(
            StripDecimals(Round(100 * TotalStolen / TotalCapacity, 0.01), 2)
          ) +
          "%)";
        var Node = document.getElementById("GM_Msg" + String(N));
        Node.parentNode.insertBefore(NewNode, Node.nextSibling);
        var Name =
          GetCastleName(AttackingCastle, "GM_PlaceCastleName" + String(N));
      }

      var BattleReports = document.evaluate(
        "//div[@class='box message']",
        document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null
      );
      for (var N = 0; N < BattleReports.snapshotLength; N++) {
        BattleReports.snapshotItem(N).innerHTML = BattleReports.snapshotItem(N).innerHTML.
          replace(/(<br>){2,}/ig, "<br />");
        var URL = document.evaluate(
          "descendant::a[1]",
          BattleReports.snapshotItem(N), null,
          XPathResult.FIRST_ORDERED_NODE_TYPE, null
        ).singleNodeValue;
        if (URL) {
          URL.id = "GM_Msg" + String(N);
          GetDoc(URL.href, CallBR, N);
        }
      }
      break;
  }
}

/******************************************************************************/
// scavenging fields

var PageMatch = new RegExp(Host + "/vip_poleta\\.php", "i").
  test(window.location);
if (PageMatch) {
  var PatCoords = /\[(\d+):(\d+)\]/i;
  var PatResources = new RegExp(
    "<strong>(\\d+)</strong> " + Translate("Gold") + "[\\s\\S]*" +
      "<strong>(\\d+)</strong> " + Translate("Iron") + "[\\s\\S]*" +
      "<strong>(\\d+)</strong> " + Translate("Wood") + "[\\s\\S]*" +
      "<strong>(\\d+)</strong> " + Translate("Food") + "[\\s\\S]*" +
      "<strong>(\\d+)</strong> " + Translate("People") + "[\\s\\S]*",
    "i"
  );
  var SelNodes = document.evaluate(
    "//tbody/tr", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null
  );
  for (var N = 0; N < SelNodes.snapshotLength; N++) {
    var Coords = PatCoords.exec(SelNodes.snapshotItem(N).innerHTML);
    Coords = [Coords[1], Coords[2]];
    var Speed =
      Math.round(Units["u10"]["speed"] / (1 + ScoutLevels[ScoutLevel] / 100));
    var MarchString = MarchTime(Dist(Coords), Speed, " ", [0], false, false);
    var Resources = PatResources.exec(SelNodes.snapshotItem(N).innerHTML);
    var Pop = Number(Resources[5]);
    Resources = Number(Resources[1]) + Number(Resources[2]) +
      Number(Resources[3]) + Number(Resources[4]);
    var Colour = "";
    if (Number(Pop) >= HealThreshold || Resources >= ScavengeThreshold) {
      Colour = "lightgreen";
    }
    var CarryString = (Colour ? "<font color='" + Colour + "'>" : "") +
      Translate("Total Res") + ": " + String(Resources) + "; " +
      String(Math.ceil(Resources / Units["u10"]["carry"])) + " " +
      Translate("LC") + "/" +
      String(Math.ceil(Resources / Units["u19"]["carry"])) + " " +
      Translate("CA") + (Colour ? "</font>" : "");
    var NewNode = document.createElement("td");
    NewNode.setAttribute("class", "special");
    NewNode.innerHTML = CarryString + "<br />" + MarchString;
    SelNodes.snapshotItem(N).appendChild(NewNode);
    SelNodes.snapshotItem(N).firstChild.nextSibling.innerHTML +=
      "<br />(<a href=\"" + Host + "/map.php?setx=" +
      Coords[0] + "&sety=" + Coords[1] + "\">" + "&rarr;</a>)"
    // Add town name
    var TempName =
      eval(GM_getValue(SavedHost + "_MapData_" + Coords[0] + "_" + Coords[1], ""))
        ||
      "";
    if (TempName) TempName = TempName[4];
    if (TempName) {
      var NewNode = document.createElement("span");
      NewNode.setAttribute("style", "font-size: 80%");
      NewNode.setAttribute("title", Coords[0] + ":" + Coords[1]);
      NewNode.innerHTML = TempName
      SelNodes.snapshotItem(N).firstChild.nextSibling.firstChild.innerHTML = 
            "<span style='font-size: 80%' title='" + Coords[0] +
            ":" + Coords[1] + "'>" + TempName + "</span>"
    }
  }
}

/******************************************************************************/
// merchant hiding

// handler for merchant hiding
function CalcTime(Event) {
  // calculate room left given data in put boxes
  function RoomLeft() {
    var Used = Number(GoldNode.value) + Number(IronNode.value) +
        Number(WoodNode.value) + Number(FoodNode.value);
    var Left = Limit - Used;
    document.getElementById("GM_Left").innerHTML = String(Left);
    document.getElementById("total").innerHTML = String(Used);
    return Left;
  }

  // top up a given resource
  function TopUp(Event) {
    var TargetText = Event.target.parentNode.parentNode.firstChild;
    var AvailableRes;
    switch (TargetText.id) {
      case ("sendg"): AvailableRes = GlobalGold - Number(GoldNode.value); break;
      case ("sendj"): AvailableRes = GlobalIron - Number(IronNode.value); break;
      case ("sendd"): AvailableRes = GlobalWood - Number(WoodNode.value); break;
      case ("sendh"): AvailableRes = GlobalFood - Number(FoodNode.value); break;
    }
    AvailableRes = Math.max(0, AvailableRes);
    var Total = Number(document.getElementById("total").innerHTML);
    var Room = Math.max(0, Limit - Total);
    TargetText.focus();
    TargetText.value =
      String(Number(TargetText.value) + Math.min(Room, AvailableRes));
    TargetText.blur();
    RoomLeft();
  }

  // use up merchant space recursively
  function DivideEvenly(Event) {
    var Left = Math.max(0, RoomLeft());
    var FreeNodes = (GoldAvailable > 0) + (IronAvailable > 0) +
      (WoodAvailable > 0) + (FoodAvailable > 0);
    while (Left > 0) {
      var GoldAvailable = GlobalGold - Number(GoldNode.value);
      var IronAvailable = GlobalIron - Number(IronNode.value);
      var WoodAvailable = GlobalWood - Number(WoodNode.value);
      var FoodAvailable = GlobalFood - Number(FoodNode.value);
      FreeNodes = (GoldAvailable > 0) + (IronAvailable > 0) +
        (WoodAvailable > 0) + (FoodAvailable > 0);
      if (FreeNodes == 0) break;
      var Even = Math.floor(Left / FreeNodes);
      ResList.forEach(
        function (Option) {
          var ResName = Option[0];
          if (eval(ResName + "Available > 0")) {
            eval(
              ResName + "Node.value = String(Number(" + ResName +
                "Node.value) + Math.min(Even, " + ResName + "Available));"
            );
          }
        }
      );
      Left = RoomLeft();
      if (Left < 4) {
        ResList.forEach(
          function (Option) {
            var ResName = Option[0];
            if (eval(ResName + "Available > 0 && Left")) {
              eval(
                ResName + "Node.value = String(Number(" + ResName +
                  "Node.value) + 1);"
              );
              Left = RoomLeft();
            }
          }
        );
      }
    }
  }

  // save/delete/load merchant targets
  function ManageMerchantTargets(Event) {
    var MerchantTargets =
      eval(GM_getValue(SavePrefix + "MerchantTargets", "[]"));
    if (! Event) {
      var NewNode = document.getElementById("GM_MerchantTargets");
      NewNode.innerHTML = "<option value='0:0'></option>";
      if (MerchantTargets.length) {
        MerchantTargets = eval(MerchantTargets);
        for (var N = 0; N < MerchantTargets.length; N++) {
          var Current = MerchantTargets[N];
          var CastleName = GetCastleName([null, Current[0], Current[1]]);
          if (CastleName[1].length) {
            CastleName = CastleName[1][1] + " (" + CastleName[1][0] + ")";
          } else {
            CastleName = "";
          }
          NewNode.innerHTML += "<option value='" + Current.join(":") + "'>" +
            CastleName + " (" + Current.join(":") + ")";
        }
      }
      NewNode.addEventListener("change", ManageMerchantTargets, true);
    } else {
      var Curr = [
        document.getElementById("sendx").value,
        document.getElementById("sendy").value
      ];
      if (Event.target.type == "select-one") {
        var Coords =
          Event.target.options[Event.target.selectedIndex].value.split(":");
        document.getElementById("sendx").value = Coords[0];
        document.getElementById("sendy").value = Coords[1];
        if (Coords[0] != "0" && Coords[1] != "0")
          document.getElementById("unload").checked = false;
      } else {
        var Found = false;
        for (var N = 0; N < MerchantTargets.length; N++) {
          Found = (
            Curr[0] == MerchantTargets[N][0] && Curr[1] == MerchantTargets[N][1]
          );
          if (Found) break;
        }
        if (! Found && Event.target.value == Translate("Save")) {
          MerchantTargets.push(Curr);
          GM_setValue(
            SavePrefix + "MerchantTargets",
            uneval(MerchantTargets)
          );
        }
        if (Found && Event.target.value == Translate("Delete")) {
          MerchantTargets.splice(N, 1);
          GM_setValue(
            SavePrefix + "MerchantTargets",
            uneval(MerchantTargets)
          );
        }
        ManageMerchantTargets();
      }
      CalcTime();
    }
  }

  var Limit = Number(document.evaluate(
    "//div[@class='textformbox']/div[2]/div[2]",
    document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null
  ).singleNodeValue.innerHTML);
  var Node, NewNode, TimeNode;
  TimeNode = document.getElementById("GM_TimeNode");
  var ToX = document.getElementById("sendx").value,
      ToY = document.getElementById("sendy").value,
      GoldNode, IronNode, WoodNode, FoodNode,
      SendGold, SendIron, SendWood, SendFood;
  ResList.forEach(
    function (Option) {
      var ResName = Option[0];
      eval(
        ResName + "Node = document.getElementById('send" +
          Option[1] + "');"
      );
      eval(
        "Send" + ResName + " = Number(" + ResName + "Node.value);"
      );
    }
  );
  var SendTotal = SendGold + SendIron + SendWood + SendFood;
  var Resources = GlobalGold + GlobalIron + GlobalWood + GlobalFood;
  var Extra = Math.max(0, Resources - Limit);

  if (! TimeNode) {
    // create new nodes
    Node = document.getElementById("unload");
    TimeNode = document.createElement("div");
    TimeNode.setAttribute("id", "GM_TimeNode");
    Node.parentNode.insertBefore(TimeNode, Node.nextSibling);
    ResList.forEach(
      function (Option) {
        var ResName = Option[0];
        var TopUpNode = document.createElement("span");
        TopUpNode.innerHTML = " <a href='javascript:void(0)'>" +
          Translate("Top Up") + "</a>";
        TopUpNode.addEventListener("click", TopUp, true);
        eval(
          ResName + "Node.parentNode.insertBefore(TopUpNode, " +
            ResName + "Node.nextSibling);"
        );
      }
    );

    Node = document.evaluate(
      "//form[@name='send']/div[@class='right'][6]",
      document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null
    ).singleNodeValue;
    NewNode = document.createElement("span");
    NewNode.innerHTML = "<br /><a href='javascript:void(0);'>" +
      Translate("Distribute Evenly") + "</a><br />";
    NewNode.addEventListener("click", DivideEvenly, true);
    Node.appendChild(NewNode);
    NewNode = document.createElement("div");
    NewNode.class = "left";
    NewNode.innerHTML = "<a href='javascript:void(0);'>" +
      Translate("Reset") + "</a>";
    NewNode.addEventListener(
      "click", function () {GoldNode.form.reset(); RoomLeft();}, true
    );
    Node.appendChild(NewNode);
    NewNode = document.createElement("div");
    NewNode.class = "left";
    NewNode.innerHTML = "<label>" + Translate("Room Left") +
      ":</label> <span id='GM_Left'></span>";
    Node = document.getElementById("total");
    Node.parentNode.insertBefore(NewNode, Node.nextSibling);
    NewNode = document.createElement("span");
    NewNode.id = "GM_CastleName";
    var InsertionPoint =
      (document.forms.namedItem("send").elements.namedItem("fastNav") ||
        document.getElementById("sendy")).parentNode;
    InsertionPoint.parentNode.insertBefore(NewNode, InsertionPoint.nextSibling);
    NewNode = document.createElement("input");
    NewNode.type = "button"; NewNode.value = "Save";
    NewNode.addEventListener("click", ManageMerchantTargets, true);
    InsertionPoint.parentNode.insertBefore(NewNode, InsertionPoint.nextSibling);
    NewNode = document.createElement("input");
    NewNode.type = "button"; NewNode.value = "Delete";
    NewNode.addEventListener("click", ManageMerchantTargets, true);
    InsertionPoint.parentNode.insertBefore(NewNode, InsertionPoint.nextSibling);
    InsertionPoint =
      document.forms.namedItem("send").elements.namedItem("fastNav") ||
        document.getElementById("sendy").parentNode;
    NewNode = document.createElement("select");
    NewNode.id = "GM_MerchantTargets";
    InsertionPoint.parentNode.insertBefore(NewNode, InsertionPoint.nextSibling);
    ManageMerchantTargets();
  }
  RoomLeft();
  var Name = GetCastleName([null, ToX, ToY]);
  NewNode = document.getElementById("GM_CastleName");
  NewNode.innerHTML = " " +
    (Name[0].length
       ? " (" + Name[0] + ")"
       : (Name[1].length ? " (" + Name[1].join(", ") + ")" : ""));
  TimeNode.innerHTML =
    MarchTime(
      Dist([ToX, ToY]), MerchantLevels[MerchantLevel], " ", [0], false, false
    ) +
    String(Resources) + "/" + String(Limit) + " (" + String(Extra) + " " +
    Translate("Extra") + ")";
}

var PageMatch = new RegExp(Host + "/market\\.php\\?action=2", "i").
  test(window.location);
if (PageMatch) {
  if (document.forms.namedItem("send").elements.namedItem("fastNav")) {
    var Head = document.getElementsByTagName("head")[0];
    var NewScript = document.createElement("script");
    // set coords from pulldown
    function setCoords(Obj) {
      var Match = /(\d+):(\d+)/i.exec(document.forms.namedItem("send").
        elements.namedItem("fastNav")[Obj.selectedIndex].value);
      document.getElementById("sendx").value = Match[1];
      document.getElementById("sendx").focus();
      document.getElementById("sendy").value = Match[2];
      document.getElementById("sendx").blur();
    }
    NewScript.innerHTML = setCoords.toString();
    Head.appendChild(NewScript);

    var Options =
      document.forms.namedItem("send").elements.namedItem("fastNav").options;
    var PatCoords = /(\d+):(\d+)/i;
    for (var N = 0; N < Options.length; N++) {
      var Match = PatCoords.exec(Options[N].value);
      for (var M = 0; M < PlayerCastles.length; M++) {
        if (PlayerCastles[M][2] == Match[1] && PlayerCastles[M][3] == Match[2]) {
          Options[N].innerHTML = PlayerCastles[M][0]; break;
        }
      }
    }
  }

  var ToX = document.getElementById("sendx").value;
  var ToY = document.getElementById("sendy").value;
  document.getElementById("sendx").
    addEventListener("blur", CalcTime, true);
  document.getElementById("sendy").
    addEventListener("blur", CalcTime, true);
  ResList.forEach(
    function (Option) {
      document.getElementById("send" + Option[1]).
        addEventListener("change", CalcTime, true);
    }
  );
  var OwnCastle = false;
  for (var N = 0; N < PlayerCastles.length; N++) {
    if (ToX == PlayerCastles[N][2] && ToY == PlayerCastles[N][3]) {
      OwnCastle = true; break;
    }
  }
  document.getElementById("unload").checked = ! OwnCastle;
  var QuickNode = document.createElement("div");
  QuickNode.innerHTML = "<div class='left'><label>" + Translate("Quick Roads") +
    ": </label></div>" +
    "<div class='right'><input id='GM_QuickRoads' type='checkbox' /></div>";
  InsertionPoint = document.getElementById("unload");
  InsertionPoint.parentNode.
    insertBefore(QuickNode, InsertionPoint.nextSibling);
  document.getElementById("GM_QuickRoads").
    addEventListener("change", CalcTime, true);
  CalcTime();
  window.setInterval(CalcTime, 1000);
}

/******************************************************************************/
// identify profitable trades

var PageMatch = new RegExp(Host + "/market\\.php\\?(.*?)action=1(.*?)", "i").
  exec(window.location);
if (PageMatch) {
  var Offers = document.evaluate(
    "//div[@class='box'][3]/descendant::tr",
    document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null
  );
  for (var N = 0; N < Offers.snapshotLength; N++) {
    if (N == 0) {
      var InsertionPoint = document.evaluate(
        "descendant::td[position()=last()-1]",
        Offers.snapshotItem(N), null, XPathResult.FIRST_ORDERED_NODE_TYPE,
        null
      ).singleNodeValue;
      var NewNode = document.createElement("td");
      NewNode.innerHTML = Translate("Profit Ratio");
      InsertionPoint.parentNode.
        insertBefore(NewNode, InsertionPoint.nextSibling);
    } else {
      var Resources = document.evaluate(
        "descendant::td[position()>last()-3]",
        Offers.snapshotItem(N), null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
        null
      );
      var PatNums = /(\d+)/ig;
      var Gives = Resources.snapshotItem(0).innerHTML;
      var GivesNum = 0;
      do {
        Match = PatNums.exec(Gives);
        if (Match) GivesNum += Number(Match[1]);
      } while (Match);
      var Receives = Resources.snapshotItem(1).innerHTML;
      var ReceivesNum = 0;
      do {
        Match = PatNums.exec(Receives);
        if (Match) ReceivesNum += Number(Match[1]);
      } while (Match);
      var ProfitRatio = StripDecimals(Round(GivesNum / ReceivesNum, 0.1), 1);
      var NewNode = document.createElement("td");
      NewNode.innerHTML = ProfitRatio + ", " + String(GivesNum - ReceivesNum);
      Offers.snapshotItem(N).
        insertBefore(NewNode, Resources.snapshotItem(1).nextSibling);
      Resources.snapshotItem(2).setAttribute("class", "special");
    }    
  }
}

/******************************************************************************/
// converter helper

function Converter(Event) {
  var Coefficient = document.evaluate(
    "//script[contains(text(), 'var factor = 0')]",
    document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null
  ).singleNodeValue.innerHTML;
  Coefficient = Number(/var\s*factor\s*=\s*([\d.]*)/i.exec(Coefficient)[1]);
  var Target = document.evaluate(
    "preceding-sibling::input", Event.target, null,
    XPathResult.FIRST_ORDERED_NODE_TYPE, null
  ).singleNodeValue;
  var Source = document.evaluate(
    "//form[@name='form_new']/descendant::input[@type='text']",
    document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null
  );
  for (var N = 0; N < Source.snapshotLength; N++) {
    if (Source.snapshotItem(N).value != "0") {
      var Want = Number(Source.snapshotItem(N).value);
      Source = Source.snapshotItem(N);
      break;
    }
  }
  Source.value = "0";
  Target.value = String(Math.ceil(Want / Coefficient));
  var Node = document.getElementById("z" + Source.id.slice(1))
  Node.checked = true; unsafeWindow.recalculateResources();
}

var PageMatch = new RegExp(Host + "/market\\.php\\?action=4", "i").
  exec(window.location);
if (PageMatch) {
  ResList.forEach(
    function (Option) {
      var ResName = Option[0];
      var SelNode = document.getElementById("p" + Option[1]);
      var NewNode = document.createElement("input");
      NewNode.type = "button";
      NewNode.value = Translate("Source");
      NewNode.addEventListener("click", Converter, true);
      SelNode.parentNode.insertBefore(NewNode, SelNode.nextSibling);
    }
  );
}

/******************************************************************************/
// battle report

// save skills from report
function CopySkills(Event) {
  GM_setValue(SavePrefix + "_CopySkills", Event.target.getAttribute("GM_Skills"));
}

// save army from report
function CopyArmy(Event) {
  GM_setValue(SavePrefix + "_CopyArmy", Event.target.getAttribute("GM_Army"));
}

// save observed battle formation to "clipboard"
function CopyFormation(Event) {
  var Nodes = document.evaluate(
    "following-sibling::div[starts-with(@class, 'armyOrder')][1]/" +
      "div[starts-with(@class, 'unit ')]",
    Event.target, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null
  );
  var CopyFormation = new Array(UnitMaxID + 1);
  var UnitPat = /unitPicSmall-(\d+)/i;
  var PositionPat = /x(\d)y(\d)/i;
  var ID, Position;
  for (var N = 0; N < Nodes.snapshotLength; N++) {
    ID = Number(UnitPat.exec(Nodes.snapshotItem(N).firstChild.id)[1]);
    Position = PositionPat.exec(Nodes.snapshotItem(N).getAttribute("class"));
    Position = Position[1] + "_" + Position[2];
    CopyFormation[ID] = Position;
  }
  GM_setValue(SavePrefix + "_CopyFormation", uneval(CopyFormation));
}

// parse hero info
function ParseSkills(Node) {
  var Cells = Node.getElementsByTagName("tbody")[0].getElementsByTagName("td");
  var Skills = [], Skills2 = [];
  for (var N = 0; N < Cells.length; N += 3) {
    Skills[Cells[N].innerHTML] = Number(Cells[N + 1].innerHTML);
    Skills2.push(Cells[N + 1].innerHTML);
  }
  if (window.location.href.indexOf("battleSimulator=1") > -1) {
    var Level = /<\/strong>.*?(\d+)/i.
      exec(Node.getElementsByClassName("details")[0].innerHTML);
  } else {
    var Level = /<\/strong>.+<br\s*\/?>.*?(\d+)/i.
      exec(Node.getElementsByClassName("details")[0].innerHTML);
  }
  Skills["Level"] = (Level ? Level[1] : "0");
  Skills2 = [0].concat(Skills2);
  var SaveButton = document.createElement("input");
  SaveButton.type = "button"; SaveButton.value = Translate("Copy Skills");
  SaveButton.addEventListener("click", CopySkills, true);
  SaveButton.setAttribute("GM_Skills", uneval(Skills2));
  var InsertionPoint = document.evaluate(
    "descendant::table[1]",
    Node, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null
  ).singleNodeValue;
  InsertionPoint.parentNode.insertBefore(SaveButton, InsertionPoint.nextSibling);
  return Skills;
}

// upgrade/loss calculations
function ParseUnits(Node, Skills, Phase1, End) {
  var AttackerText = document.getElementsByClassName("box round")[0].
    getElementsByTagName("h3")[0].innerHTML;
  var DefenderText = document.getElementsByClassName("box round")[0].
    getElementsByTagName("h3")[1].innerHTML;
  var SurvivorCarry = 0;
  var ResultNode = document.evaluate(
    "//div[@class='infosmall']",
    document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null
  );
  if (Phase1) {
    ResultNode = ResultNode.snapshotItem(0);
  } else {
    ResultNode = ResultNode.snapshotItem(ResultNode.snapshotLength - 1);
  }
  var AttackerWin = new RegExp(AttackerText, "i").test(ResultNode.innerHTML);
  var Attacker = (Node.getAttribute("class") == "armyOrder attacker");
  if (! End) {
    var SpecialNode = document.getElementsByClassName("specialUnitsBox")
      [Phase1 ? 0 : 1];
    var SpecialInfantry = SpecialCavalry = SpecialDefender = SpecialTemp = 0;
    if (SpecialNode) {
      SpecialNode = SpecialNode.getElementsByClassName("side-" + [Attacker ? "attacker" : "defender"])[0];
      if (SpecialNode) {
        SpecialTemp = Number(
          SpecialNode.getElementsByTagName("td")[2].
            getElementsByTagName("strong")[0].innerHTML.slice(0, -1)
        );
        switch (
          SpecialNode.getElementsByTagName("td")[4].
            getElementsByTagName("strong")[0].innerHTML
        ) {
          case (Translate("Warrior"))   : SpecialInfantry = SpecialTemp; break;
          case (Translate("Cavalryman")): SpecialCavalry = SpecialTemp; break;
          case (Translate("Defender"))  : SpecialDefender = SpecialTemp; break;
        }
      }
    }
  }
  var TotalPop = 0;
  var LostGold = LostIron = LostWood = LostFood = LostPop = LostTotal =
      TotalLife = LostGold2 = LostIron2 = LostWood2 = LostFood2 = LostPop2 =
      LostTotal2 = 0;
  var PatAliveDead = /(\d+) \/ (\d+)/i;
  var PatData = /body=\[\s*([\s\S]+?)\s*\]/i;
  var DataNode = document.createElement("div"), DataNodes;
  var Army = Node.getElementsByTagName("div");
  var ArmyArray = new Array(UnitMaxID + 1);
  for (N = 0; N < Army.length; N++) {
    var Stats = Army[N].getAttribute("title").
      replace(/&gt;/ig, ">").replace(/&lt;/ig, "<");
    var ID = "u" +
      /unitPicSmall-(\d+)/i.exec(Army[N].firstChild.getAttribute("id"))[1];
    var AliveDead = Army[N].firstChild.innerHTML;
    DataNode.innerHTML = PatData.exec(Stats)[1];
    var DataNodes = DataNode.getElementsByTagName("dd"),
        Fled = DataNodes[2].innerHTML,
        Archer = DataNodes[3].innerHTML,
        Building = DataNodes[4].innerHTML,
        Cavalry = DataNodes[5].innerHTML,
        Infantry = DataNodes[6].innerHTML,
        Wizard = DataNodes[7].innerHTML,
        Life = DataNodes[8].innerHTML;
    // reverse-engineer HP bonus from stats of single unit; skills
    var Match = PatAliveDead.exec(AliveDead);
    ArmyArray[Number(ID.slice(1))] = Number(Match[1]) + Number(Fled);
    if (End && Attacker) SurvivorCarry += Number(Match[1]) * Units[ID]["carry"];
    // defenders fleeing return to base, so their loss is irrelevant
    var Num;
    var IsNotJunk = ! (ID in JunkList);
    TotalPop += Units[ID]["pop"] *
      (Number(Match[1]) + Number(Match[2]) + Number(Fled));
    LostPop += Units[ID]["pop"] *
      (Number(Match[2]) + Number(Fled) * Attacker * ! AttackerWin);

    LostPop2 += Units[ID]["pop"] * IsNotJunk * 
      (Number(Match[2]) + Number(Fled) * Attacker * ! AttackerWin);
    TotalLife += Number(Life);
    ResList.forEach(
      function (Option) {
        var ResName = Option[0];
        Num = Units[ID][ResName.toLowerCase()] *
          (Number(Match[2]) + Number(Fled) * Attacker * ! AttackerWin)
          || 0;
        eval("Lost" + ResName + " += Num;");
        eval("Lost" + ResName + "2 += IsNotJunk * Num;");
      }
    );
    LostTotal = LostGold + LostIron + LostWood + LostFood;
    LostTotal2 = LostGold2 + LostIron2 + LostWood2 + LostFood2;

    // show unit upgrades
    if (! End) {
      var SingleLife = Number(Life) / Number(Match[1]);
      if (SingleLife) {
        SingleLife = SingleLife -
          ((DefenderLevels[Skills[Translate("Defender")]] + SpecialDefender) / 100) *
            Units[ID]["life"];
        if (
          ! UKMode && (ID in InfantryList || ID in RaceSpecific) &&
          (SpecialInfantry || Skills[Translate("Warrior")])
        ) {
          SingleLife = SingleLife -
            ((WarriorLevels[Skills[Translate("Warrior")]] + SpecialInfantry) / 100) *
              Units[ID]["life"]
        }
        var LevelBonus = 0;
        var AttackerLevel;
        var DefenderLevel = Number(Skills["Level"]);
        if (! Attacker && Skills[Translate("Defender")] != "0") {
          AttackerLevel = Number(
            document.getElementById("pageBody").getAttribute("GM_AttackerLevel")
          );
          LevelBonus = Math.max(0, (AttackerLevel - DefenderLevel) * 5);
        }
        SingleLife = SingleLife - (LevelBonus / 100) * Units[ID]["life"];
        var BonusDef = StripDecimals(
          100 * (SingleLife / Units[ID]["life"] - 1) /
            (UnitUpgrades[ID] ? UnitUpgrades[ID][3] : 1),
          2
        );
      } else {
        var BonusDef = "N/A";
      }
      var SingleAttack, BaseAttack;
      // reverse-engineer attack bonus from skills and stats
      var SingleAttack = (ID in MysticList ? Number(Building) : Number(Infantry)) /
        Number(Match[1]);
      if (SingleAttack) {
        SingleAttack = SingleAttack -
          (ID in InfantryList || ID in RaceSpecific) * (
            (WarriorLevels[Skills[Translate("Warrior")]] + SpecialInfantry) / 100
          ) * Units[ID]["infantry"] -
          (ID in ArcherList) * (ArcherLevels[Skills[Translate("Archer")]] / 100) *
            Units[ID]["infantry"] -
          (ID in CavalryList) *
            ((CavalryLevels[Skills[Translate("Cavalryman")]] + SpecialCavalry) / 100) *
            Units[ID]["infantry"] -
          (ID in MysticList) * (MysticLevels[Skills[Translate("Mystic")]] / 100) *
            Units[ID]["building"];
        var BonusAttack = StripDecimals(
          100 * (SingleAttack /
            (ID in MysticList ? Units[ID]["building"] : Units[ID]["infantry"])
          - 1) / (UnitUpgrades[ID] ? UnitUpgrades[ID][1] : 1),
          2
        );
      } else {
        var BonusAttack = "N/A";
      }
      var OutString = AliveDead + " / " + Fled +
        "<br />" + Translate("Inf") + ": " + Infantry + "<br />" +
        Translate("Cav") + ": " + Cavalry +
        "<br />" + Translate("Arch") + ": " + Archer + "<br />" +
        Translate("Myst") + ": " + Wizard +
        "<br />" + Translate("Life") + ": " + Life + "<br />" +
        Translate("Atk+") + ": " + String(BonusAttack) +
        "<br />" + Translate("Def+") + ": " + String(BonusDef) +
        (LevelBonus ? " (+" + String(LevelBonus) + "%)" : "");
      Army[N].innerHTML =
        "<a href='javascript:void(0);' id='unitPicSmall-" +
        ID.slice(1) + "'>" + "<font size='1'>" + OutString + "</font></a>";
    }
  }
  Node.setAttribute("GM_Life" + Attacker + Phase1 + End, String(TotalLife));

  // copy buttons
  if (! End) {
    var InsertionPoint = document.evaluate(
      "preceding-sibling::h3[1]",
      Node, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null
    ).singleNodeValue;
    ["Formation", "Army"].forEach(
      function (Option) {
        var CopyButton = document.createElement("input");
        CopyButton.type = "button";
        CopyButton.value = Translate("Copy " + Option);
        CopyButton.addEventListener("click", eval("Copy" + Option), true);
        Node.parentNode.
          insertBefore(CopyButton, InsertionPoint.nextSibling);
        CopyButton.parentNode.
          insertBefore(document.createElement("br"), CopyButton.nextSibling);
        if (Option == "Army")
          CopyButton.setAttribute("GM_Army", uneval(ArmyArray));
      }
    );
  }

  if (End) {
    var NewNode = document.createElement("div");
    NewNode.innerHTML = (Attacker ? AttackerText : DefenderText);
    NewNode.innerHTML +=
      "<br />" + Translate("Lost Resources") + ": " + String(LostGold) + "+" +
      String(LostIron) + "+" + String(LostWood) + "+" + String(LostFood) +
      " = " + String(LostTotal) +
      "<br />" + Translate("Non-Junk (Res)") + ": " + String(LostGold2) + "+" +
      String(LostIron2) + "+" + String(LostWood2) + "+" + String(LostFood2) +
      " = " + String(LostTotal2) + "<br />" + Translate("Total Pop") + ": " + TotalPop +
      "<br />" + Translate("Lost Pop") + ": " + String(LostPop) + " (" +
      (TotalPop
        ? StripDecimals(Round(100 * LostPop / TotalPop, 0.01), 2)
        : "0") +
      "%)" + "<br />" + Translate("Lost Life") + ": " +
      String(
        Number(document.evaluate(
          "//*[@GM_Life" + String(Attacker) + String(Phase1) + "false]",
          document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null
        ).
          singleNodeValue.getAttribute(
            "GM_Life" + String(Attacker) + String(Phase1) + "false"
          )
        ) - TotalLife
      );
    NewNode.id = "GM_Losses" + String(Attacker) + String(Phase1);
    NewNode.setAttribute(
      "GM_Losses",
      uneval([LostGold, LostIron, LostWood, LostFood, LostTotal, LostPop])
    );
    NewNode.setAttribute(
      "GM_NonJunkLosses",
      uneval([LostGold2, LostIron2, LostWood2, LostFood2, LostTotal2])
    );
    ResultNode.appendChild(NewNode);
    var ScavengeNode = document.createElement("div");
    ScavengeNode.id = "GM_Scavenge" + String(Attacker) + String(Phase1);
    var EstScavenge = String(Math.ceil(LostTotal * 0.15));
    ScavengeNode.innerHTML =
      Translate("Estimated Scavenge") + ": " + EstScavenge + "<br /><br />";
    ScavengeNode.setAttribute("GM_Scavenge", EstScavenge);
    ResultNode.appendChild(ScavengeNode);
  }
  if (Attacker && End) {
    var DataNode = document.getElementById("GM_DataNode");
    if (! DataNode) {
      DataNode = document.createElement("div");
      DataNode.id = "GM_DataNode";
      document.body.appendChild(DataNode);
    }
    DataNode.setAttribute("SurvivorCarry", String(SurvivorCarry));
  }
}

var PageMatch = new RegExp(
  Host + "/battle-report\\.php\\?id=.+(?:&world_id=.+)?", "i"
).test(window.location);
if (PageMatch) {
  var AttackerText = document.getElementsByClassName("box round")[0].
    getElementsByTagName("h3")[0].innerHTML;
  var DefenderText = document.getElementsByClassName("box round")[0].
    getElementsByTagName("h3")[1].innerHTML;

  // link coords to map, not profile
  var Coords = document.evaluate(
    "//a[starts-with(@href, 'preview.php')]", document, null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null
  );
  var PatCoords = /(\d+):(\d+)/i;
  for (var N = 0; N < Coords.snapshotLength; N++) {
    var Match = PatCoords.exec(Coords.snapshotItem(N).innerHTML);
    if (Match) {
      Coords.snapshotItem(N).href =
        "map.php?setx=" + Match[1] + "&sety=" + Match[2];
      var Name = GetCastleName(Match);
      Name[0].length ? Name = "--" + Name[0] : (Name[1].length ? Name = "--" + Name[1][1] : Name = "");
      Coords.snapshotItem(N).innerHTML += Name;
    }
  }
  var AttackerSkills = ParseSkills(document.getElementById(AttackerText + "Info"));
  document.getElementById("pageBody").
    setAttribute("GM_AttackerLevel", AttackerSkills["Level"]);
  var Multis = document.evaluate(
    "//*[@id='" + DefenderText + "Info']", document, null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null
  );
  var DefenderSkills = ParseSkills(Multis.snapshotItem(0));
  document.getElementById("pageBody").
    setAttribute("GM_DefenderLevel", DefenderSkills["Level"]);

  if (Multis.snapshotLength > 1) {
    var SupporterSkills = ParseSkills(Multis.snapshotItem(1))
    document.getElementById("pageBody").
      setAttribute("GM_SupporterLevel", SupporterSkills["Level"]);
  } else {
    var SupporterSkills = null;
  }

  // phase 1--attacker vs. defender
  var Attacker = document.evaluate(
    "//div[@class='infosmall'][1]/" +
      "preceding-sibling::div/div[@class='armyOrder attacker']",
    document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null
  );
  var Defender = document.evaluate(
    "//div[@class='infosmall'][1]/" +
      "preceding-sibling::div/div[@class='armyOrder defender']",
    document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null
  );
  ParseUnits(Attacker.snapshotItem(0), AttackerSkills, true, false);
  ParseUnits(Defender.snapshotItem(0), DefenderSkills, true, false);
  ParseUnits(
    Attacker.snapshotItem(Attacker.snapshotLength - 1), AttackerSkills,
    true, true
  );
  ParseUnits(
    Defender.snapshotItem(Defender.snapshotLength - 1), DefenderSkills,
    true, true
  );
  // attacker vs. supporter
  if (SupporterSkills) {
    var Attacker2 = document.evaluate(
      "//div[@class='infosmall'][1]/" +
        "following::div[@class='armyOrder attacker']",
      document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null
    );
    var Supporter = document.evaluate(
      "//div[@class='infosmall'][1]/" +
        "following::div[@class='armyOrder defender']",
      document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null
    );
    ParseUnits(Attacker2.snapshotItem(0), AttackerSkills, false, false);
    ParseUnits(Supporter.snapshotItem(0), SupporterSkills, false, false);
    ParseUnits(
      Attacker2.snapshotItem(Attacker2.snapshotLength - 1),
      AttackerSkills, false, true
    );
    ParseUnits(
      Supporter.snapshotItem(Supporter.snapshotLength - 1),
      SupporterSkills, false, true
    );
  }

  var ResultNode = document.evaluate(
    "//div[@class='infosmall'][last()]",
    document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null
  ).singleNodeValue;
  Attacker = Number(
    document.getElementById("GM_Scavengetruetrue").getAttribute("GM_Scavenge")
  );
  Defender = Number(
    document.getElementById("GM_Scavengefalsetrue").getAttribute("GM_Scavenge")
  );
  if (SupporterSkills) {
    Attacker += Number(
      document.getElementById("GM_Scavengetruefalse").
        getAttribute("GM_Scavenge")
    );
    Defender += Number(
      document.getElementById("GM_Scavengefalsefalse").
        getAttribute("GM_Scavenge")
    );
  }
  var AttackerLoss = eval(document.getElementById(
    "GM_Lossestruetrue"
  ).getAttribute("GM_Losses"));
  var AttackerNonJunk = eval(document.getElementById(
    "GM_Lossestruetrue"
  ).getAttribute("GM_NonJunkLosses"));
  var DefenderLoss = eval(document.getElementById(
    "GM_Lossesfalsetrue"
  ).getAttribute("GM_Losses"));
  var DefenderNonJunk = eval(document.getElementById(
    "GM_Lossesfalsetrue"
  ).getAttribute("GM_NonJunkLosses"));
  if (SupporterSkills) {
    var TempArr = eval(document.getElementById(
      "GM_Lossestruefalse"
    ).getAttribute("GM_Losses"));
    AttackerLoss = TwoArraySum(AttackerLoss, TempArr);
    var TempArr = eval(document.getElementById(
      "GM_Lossesfalsefalse"
    ).getAttribute("GM_Losses"));
    DefenderLoss = TwoArraySum(DefenderLoss, TempArr);
    var TempArr = eval(document.getElementById(
      "GM_Lossestruefalse"
    ).getAttribute("GM_NonJunkLosses"));
    AttackerNonJunk = TwoArraySum(AttackerNonJunk, TempArr);
    var TempArr = eval(document.getElementById(
      "GM_Lossesfalsefalse"
    ).getAttribute("GM_NonJunkLosses"));
    DefenderNonJunk = TwoArraySum(DefenderNonJunk, TempArr);
  }

  var Scavenge = Attacker + Defender;
  var NewNode = document.createElement("div");
  NewNode.innerHTML =
    (SupporterSkills
      ? Translate("Total Attacker Loss (Res/Pop)") + ": " +
          String(AttackerLoss[0]) + "+" + String(AttackerLoss[1]) + "+" +
          String(AttackerLoss[2]) + "+" + String(AttackerLoss[3]) + " = " +
          String(AttackerLoss[4]) + "; " + String(AttackerLoss[5]) + "<br />" +
          Translate("Non-Junk (Res)") + ": " +
          String(AttackerNonJunk[0]) + "+" + String(AttackerNonJunk[1]) + "+" +
          String(AttackerNonJunk[2]) + "+" + String(AttackerNonJunk[3]) + " = " +
          String(AttackerNonJunk[4]) + "<br />" +
          Translate("Total Defender Loss (Res/Pop)") + ": " +
          String(DefenderLoss[0]) + "+" + String(DefenderLoss[1]) + "+" +
          String(DefenderLoss[2]) + "+" + String(DefenderLoss[3]) + " = " +
          String(DefenderLoss[4]) + "; " + String(DefenderLoss[5]) + "<br />" +
          Translate("Non-Junk (Res)") + ": " +
          String(DefenderNonJunk[0]) + "+" + String(DefenderNonJunk[1]) + "+" +
          String(DefenderNonJunk[2]) + "+" + String(DefenderNonJunk[3]) + " = " +
          String(DefenderNonJunk[4]) + "<br />"
      : ""
    ) +
    Translate("Estimated Total Scavenge") + ": " + String(Attacker) + "+" +
    String(Defender) + " = " + String(Scavenge) + " (" +
    String(Math.ceil(Scavenge / Units["u10"]["carry"])) + " " +
    Translate("LC") + "/" +
    String(Math.ceil(Scavenge / Units["u19"]["carry"])) + " " +
    Translate("CA") + ")";
  ResultNode.appendChild(NewNode);
  var SurvivorCarry = Number(
    document.getElementById("GM_DataNode").getAttribute("SurvivorCarry")
  );
  var InsertionPoint = document.evaluate(
    "//ul[@class='battleResults']/descendant::span[@class='cleanupGold']/" +
      "ancestor::li",
    document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null
  );
  var TotalScavenge = Stolen = 0, Current;
  for (var N = 0; N < InsertionPoint.snapshotLength; N++) {
    var Scavenge = InsertionPoint.snapshotItem(N).
      getElementsByClassName("cleanupPopulation").length > 0;
    var Actual =
      Number(document.getElementsByClassName("cleanupGold")[N].innerHTML) +
      Number(document.getElementsByClassName("cleanupIron")[N].innerHTML) +
      Number(document.getElementsByClassName("cleanupWood")[N].innerHTML) +
      Number(document.getElementsByClassName("cleanupFood")[N].innerHTML);
    NewNode = document.createElement("li");
    if (Scavenge) {
      TotalScavenge += Actual;
    } else {
      Stolen = Actual;
    }
    if (N == InsertionPoint.length - 1 && Scavenge) Actual = TotalScavenge;
    NewNode.innerHTML = String(Actual) +
      " (" + String(Math.ceil(Actual / Units["u10"]["carry"])) + " " +
      Translate("LC") + "/" +
      String(Math.ceil(Actual / Units["u19"]["carry"])) + " " +
      Translate("CA") + ")";
    InsertionPoint.snapshotItem(N).parentNode.
      insertBefore(NewNode, InsertionPoint.snapshotItem(N).nextSibling);
  }
  if (Stolen) {
    var NewNode = document.createElement("li");
    var Capacity = Number(
      document.getElementById("GM_DataNode").getAttribute("SurvivorCarry")
    );
    NewNode.innerHTML = Translate("Survivor Capacity") + ": " +
      String(Stolen) + "/" + String(Capacity) + " (" +
      StripDecimals(Round(100 * Stolen / Capacity, 0.01), 2) + "%)";
    InsertionPoint.snapshotItem(N - 1).parentNode.appendChild(NewNode);
  }
}

/******************************************************************************/
// sim tools

function MinMax(Event) {
  var MaxType = Event.target.getAttribute("maxtype");
  var FirstChar = Event.target.parentNode.getAttribute("id");
  FirstChar = FirstChar.slice(FirstChar.length - 1);
  switch (FirstChar) {
    case "1": FirstChar = "a"; break;
    case "2": FirstChar = "d"; break;
    case "3": FirstChar = "s"; break;
  }
  var SecondChar;
  var SkillPaste = false;
  switch (Event.target.getAttribute("GM_Type")) {
    case "Min Unit"       :
    case "Paste Unit"     :
    case "Add Unit"       : SecondChar = ""; break;
/*    case "Paste Clipboard":
    case "Add Clipboard"  : SecondChar = ""; break;*/
    case "Max Upgrade"    : SecondChar = "(?:a|d)"; break;
    case "Paste Skill"    : SkillPaste = true; SecondChar = "s"; break;
    case "Max Skill"      : SecondChar = "s"; break;
  }
  var Pat = new RegExp("^" + FirstChar + SecondChar + "_(\\d+)$", "i");
  var IDs = document.evaluate(
    "//*[@id]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null
  );
  if (MaxType == "2" && Event.target.innerHTML == "Paste Clipboard") {
    ParseClipboardUnits(unsafeWindow.GetClipboard());
  }
  var ArmyArray = eval(GM_getValue(SavePrefix + "_CopyArmy", "")) || "";
  var SavedSkills = eval(GM_getValue(SavePrefix + "_CopySkills", "")) || "";
  var Matches = 0;
  for (var N = 0; N < IDs.snapshotLength; N++) {
    var ID = Pat.exec(IDs.snapshotItem(N).getAttribute("id"));
    if (ID) {
      Matches += 1;
      if (MaxType == "0") {
        IDs.snapshotItem(N).value = "0";
      } else if (MaxType == "1") {
        // max varies
        if (SecondChar == "s") { // skill
          if (! SkillPaste) {
            IDs.snapshotItem(N).value = "3";
          } else {
            IDs.snapshotItem(N).value = SavedSkills[Matches] || "0";
          }
        } else { // attack/defense
          ID = "u" + ID[1];
          if (! (ID in Unupgraded)) {
            if (ID in MysticList) IDs.snapshotItem(N).value = "5";
            if (
              ! (ID in Unupgraded) &&
              (ID in InfantryList || ID in CavalryList || ID in ArcherList)
            ) {
              IDs.snapshotItem(N).value = "10";
            }
          }
        }
      } else if (MaxType == "2") { // paste
        if (Event.target.getAttribute("GM_Type") == "Add Unit") {
          IDs.snapshotItem(N).value = String(
            Number(IDs.snapshotItem(N).value) +
            (Number(ArmyArray[Number(ID[1])]) || 0)
          );
        } else {
          IDs.snapshotItem(N).value = ArmyArray[Number(ID[1])] || "0";
        }
      }
    }
  }
  if (SkillPaste) {
    document.evaluate(
      "//input[@name='" + FirstChar + "level']",
      document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null
    ).singleNodeValue.value = SavedSkills[0] || "10";
  }
}
  
var PageMatch = new RegExp(Host + "/calculator\\.php", "i").
  test(window.location);
if (PageMatch) {
  var Header = document.evaluate(
    "//table/thead/tr",
    document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null
  ).singleNodeValue.getElementsByTagName("td");
  for (var N = 1; N < Header.length; N++) {
    [
      ["Unit", "0", "Min Unit"],
      ["Paste", "2", "Paste Unit"],
      ["Add", "2", "Add Unit"],
/*      ["PasteClip", "2", "Paste Clipboard"], ["AddClip", "2", "Add Clipboard"],*/
      ["Upgrade", "1", "Max Upgrade"],
      ["PasteSkill", "1", "Paste Skill"],
      ["Skill", "1", "Max Skill"]
    ].forEach(
      function (Option) {
        var NewNode = document.createElement("div");
        NewNode.setAttribute("id", "GM_" + Option[0] + String(N));
        NewNode.innerHTML =
          "<a href='javascript:void(0);' maxtype='" + Option[1] +
          "' GM_Type='" + Option[2] + "'>" + Translate(Option[2]) + "</a><br />";
        NewNode.addEventListener("click", MinMax, true);
        Header[N].appendChild(NewNode);
      }
    );
  }
}

/******************************************************************************/
// large map rejigging

function SaveMapData(MapData) {
  MapData = eval(MapData);
  for (var X = 0; X < 8; X++) {
    for (var Y = 0; Y < 8; Y++) {
      window.setTimeout(
        function (MapData, X, Y) {
          GM_setValue(
            SavedHost + "_MapData_" + MapData[X][Y][0] + "_" +
              MapData[X][Y][1],
            uneval(MapData[X][Y])
          );
        },
        0,
        MapData, X, Y
      );
    }
  }
}

function TrapMapUpdate(Event) {
  var PatLeft = /left: (\d+)px/i;
  var PatTop = /top: (\d+)px/i;
  var Now = new Date();
  var ID = Event.relatedNode.getAttribute("id");
  if (ID == "now_map" || ID == "new_map" || ID == "old_map") {
    function DisplayPlayerMessage2(Event) {
      // no idea why this is necessary...
      var TempNode = Event.target;
      while (! TempNode.hasAttribute("GM_X") && TempNode.parentNode) {
        TempNode = TempNode.parentNode;
      }
      unsafeWindow.displayPlayerMessage(
        0, "", TempNode.getAttribute("GM_X"), TempNode.getAttribute("GM_Y")
      );
    }
    if (! UKMode) {
      var BaseX = unsafeWindow._xMap, BaseY = unsafeWindow._yMap;
    } else {
      var BaseX = unsafeWindow.x, BaseY = unsafeWindow.y;
    }
    var CurrX, CurrY, NewNode;
    var FocusCoords = /\?setx=(\d+)&sety=(\d+)$/i.exec(window.location);
    FocusCoords ?
      FocusCoords = [FocusCoords[1], FocusCoords[2]] : FocusCoords = [0, 0];
    var Map = Event.relatedNode;
    var Nodes = document.evaluate(
      "descendant-or-self::div[@id='" + ID + "']/descendant::div[contains(@class,'mapBlock')]",
      Map, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null
    );
    var Present = [];
    for (var N = 0; N < Nodes.snapshotLength; N++) {
      if (Nodes.snapshotItem(N).hasAttribute("title")) {
        CurrX = Number(PatLeft.exec(Nodes.snapshotItem(N).getAttribute("style"))[1]) / 50;
        CurrY = Number(PatTop.exec(Nodes.snapshotItem(N).getAttribute("style"))[1]) / 50;
        Nodes.snapshotItem(N).setAttribute("GM_X", CurrX + BaseX);
        Nodes.snapshotItem(N).setAttribute("GM_Y", CurrY + BaseY);
        Present[[CurrX, CurrY].toSource()] = null;
      }
    }
    var InsertionPoint = Map.getElementsByClassName("wrapper")[0];
    if (! InsertionPoint) return 0;
    for (var X = 0; X < 8; X++) {
      for (var Y = 0; Y < 8; Y++) {
        if (! ([X, Y].toSource() in Present)) {
          NewNode = document.createElement("div");
          NewNode.setAttribute("class", "mapBlock");
          NewNode.setAttribute(
            "style",
            "left: " + String(X * 50) + "px; top: " + String(Y * 50) + "px;"
          );
          NewNode.setAttribute("GM_X", X + BaseX);
          NewNode.setAttribute("GM_Y", Y + BaseY);
          InsertionPoint.insertBefore(NewNode, InsertionPoint.lastChild);
        }
      }
    }
    var PatGold = /res_gold.gif.+?>\s*(\d+)\s*/i;
    var PatIron = /res_iron.gif.+?>\s*(\d+)\s*/i;
    var PatWood = /res_wood.gif.+?>\s*(\d+)\s*/i;
    var PatFood = /res_food.gif.+?>\s*(\d+)\s*/i;
    var PatPop = /res_pop.gif.+?>\s*(\d+)\s*/i;
    var PatCoords = /header=\[.+?\((\d+):(\d+)\)\]/i;
    var PatCastleCoords = /^\s*header=\[\s*.*?([^>]*?)\s*\((\d+):(\d+)\)/i;
    var PatCapital = new RegExp(
      "img" + (UKMode ? "_ut" : "") + "/revolution/icon_crown\\.gif", "i"
    );
    var PatPlayer = new RegExp(
      "img" + (UKMode ? "_ut" : "") + "/revolution/overview/player\\.gif' /> " +
        "(.+?)\\s*<",
      "i"
    );
    var PatLevel = /exp\.gif.+?>\s*\d+\s*\((\d+)\)\s*<br\/>/i;
    var PatClan = new RegExp(
      "img" + (UKMode ? "_ut" : "") + "/revolution/overview/clan\\.gif'\/> " +
        "(.+?)\s*<",
      "i"
    );
    var PatLogo = /<img src='clanLogos.+?\/>/i;
    var RelativeX, RelativeY;
    // if square has nodes, calculate relative/global coords
    // init empty grid
    var MapData = [], GlobalX1, GlobalY1;
    for (var X = 0; X < 8; X++) {
      MapData[X] = new Array(8);
      for (var Y = 0; Y < 8; Y++) {
        MapData[X][Y] = [String(BaseX + X), String(BaseY + Y)];
      }
    }
    if (Nodes.snapshotLength > 0) { // grid has cities
      for (var N = 0; N < Nodes.snapshotLength; N++) {
        var TempText = Nodes.snapshotItem(N).getAttribute("title");
        if (TempText) {
          var Player = PatPlayer.exec(TempText);
          TempText = TempText.replace(PatLogo, "");
          var Coords = PatCoords.exec(TempText);
          Coords = [Coords[1], Coords[2]];
          RelativeX =
            Number(Nodes.snapshotItem(N).getAttribute("GM_X")) - BaseX;
          RelativeY =
            Number(Nodes.snapshotItem(N).getAttribute("GM_Y")) - BaseY;
          var Gold = PatGold.exec(TempText)[1];
          var Iron = PatIron.exec(TempText)[1];
          var Wood = PatWood.exec(TempText)[1];
          var Food = PatFood.exec(TempText)[1];
          var Scavenge =
            Number(Gold) + Number(Iron) + Number(Wood) + Number(Food);
          var Pop = PatPop.exec(TempText);
          Pop ? Pop = Number(Pop[1]) : Pop = 0;
          if (PatDate.test(TempText)) {
            var LastActivityMS = LocalTime(TempText, TimeOffset);
            var LastActivity = DateFormat(LastActivityMS);
            TempText = TempText.replace(PatDate, LastActivity);
          } else {
            var LastActivityMS = null;
            var LastActivity = null;
          }
          var Colour = "white";
          if (Scavenge > 0 || Pop >= HealThreshold) {
            if (Pop >= HealThreshold || Scavenge >= ScavengeThreshold) {
              Colour = "lightgreen";
            } else {
              if (Scavenge > 0) Colour = "blue";
            }
            var Labelled = document.evaluate(
              "descendant::*[@GM_JunkAttr]",
              Nodes.snapshotItem(N), null, XPathResult.FIRST_ORDERED_NODE_TYPE,
              null
            ).singleNodeValue;
            if (! Labelled) {
              Nodes.snapshotItem(N).innerHTML +=
                "<span GM_JunkAttr='1' style='color: " + Colour + "; font-family: sans-serif;'><b>" +
                String(Math.ceil(Scavenge / Units["u10"]["carry"])) + " " + Translate("LC") + "<br />" +
                String(Math.ceil(Scavenge / Units["u19"]["carry"])) + " " + Translate("CA") +
                "</b></span>";
              TempText = TempText.replace(
                PatFood,
                function () {
                  return arguments[0] + " (" + Translate("Total Res") + ": " +
                    String(Scavenge) + ")";
                }
              );
            }
          }
          Nodes.snapshotItem(N).setAttribute("title", TempText);
          if (Player) {
            // screengrabbing: X, Y, Player, Level, Castle Name, Capital, Clan,
            // Last Activity, Now
            var Match = PatCastleCoords.exec(TempText).slice(1)
            MapData[RelativeX][RelativeY] = [
              Match[1], Match[2], Player[1],
              PatLevel.exec(TempText)[1], Match[0],
              Number((PatCapital.test(TempText))),
              (PatClan.exec(TempText) ? PatClan.exec(TempText)[1] : ""),
              LastActivity ? LastActivityMS.getTime() : null, Now.getTime()
            ];
          }
        }
      }
    }
    SaveMapData(MapData.toSource());
    // highlight target square
    Nodes = document.evaluate(
      "descendant::div[@class='wrapper']/div[@GM_X='" + FocusCoords[0] + "'][@GM_Y='" +
        FocusCoords[1] + "']",
      Map, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null
    ).singleNodeValue;
    if (Nodes) {
      Nodes.style.border = "solid"; Nodes.style.borderWidth = "2px";
      Nodes.style.bordercolor = "red";
    }
    // add clickability to "empty" squares, for sending camps/scavenge
    Nodes = document.evaluate(
      "//div[@id='" + ID + "']/div[@class='wrapper']/div[not(@onclick)]",
      document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null
    );
    for (var N = 0; N < Nodes.snapshotLength; N++) {
      Nodes.snapshotItem(N).setAttribute(
        "style",
        Nodes.snapshotItem(N).getAttribute("style") + "; cursor: pointer;"
      );
      Nodes.snapshotItem(N).
        addEventListener("click", DisplayPlayerMessage2, true);
    }
    Nodes = document.evaluate(
      "//div[@id='" + ID + "']/div[@class='wrapper']/div",
      document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null
    );
    for (var N = 0; N < Nodes.snapshotLength; N++) {
      Nodes.snapshotItem(N).addEventListener("mouseover", UpdateMapDists, false);
    }
  }
}

// decide if enter key was pressed
function HandleEnter(Event) {
  if (Event.which == 13) MapZoom();
}

// URL version of map zooming
function MapZoom() {
  window.location.href = Host + "/map.php?setx=" +
    document.getElementById("searchX").value + "&sety=" +
    document.getElementById("searchY").value;
}

function ReportMapData(Event) {
  var NewText = "<br /><br /><center><table border='1' cellpadding='1'" +
    "cellspacing='1' style='color: white'><tbody><tr>";
  var TempArr = [
    "X", "Y", Translate("Player"), Translate("Level"), Translate("Castle"),
    Translate("Capital"), Translate("Clan"),
    Translate("Last Activity (Days)"), Translate("Last ms"),
    Translate("Data Grabbed (Days)"), Translate("Grabbed ms")
  ];
  var Now = new Date().getTime();
  for (var N = 0; N < TempArr.length; N++) {
    NewText += "<th>" + TempArr[N] + "</th>";
  }
  NewText += "</tr>";
  var NewTab = document.getElementById("GM_MapReport");
  if (! NewTab) {
    NewTab = document.createElement("div");
    NewTab.id = "GM_MapReport";
    var InsertionPoint = document.getElementById("pageBody");
    InsertionPoint.parentNode.insertBefore(NewTab, InsertionPoint.nextSibling);
  }
  for (var GlobalX1 = 1; GlobalX1 <= MaxX; GlobalX1++) {
    for (var GlobalY1 = 1; GlobalY1 <= MaxY; GlobalY1++) {
      var CurrSquare = GM_getValue(
        SavedHost + "_MapData_" + String(GlobalX1) + "_" + String(GlobalY1), ""
      );
      if (CurrSquare != "") {
        CurrSquare = eval(CurrSquare);
        if (CurrSquare[2] != null) {
          NewText += "<tr>";
          for (var N = 0; N < CurrSquare.length; N++) {
            NewText += "<td>" +
              (N == 7 || N == 8
                ? (CurrSquare[N] == null
                    ? "?"
                    : StripDecimals(
                        Round((Now - CurrSquare[N]) / 86400000, 0.01), 2
                      )
                  ) + "</td><td>" +
                  (CurrSquare[N] == null ? "?" : String(CurrSquare[N])) +
                  "</td>"
                : CurrSquare[N]
              ) +
              "</td>";
          }
          NewText += "</tr>";
        }
      }
    }
  }
  NewText += "</tbody></table></center><br /><br />";
  NewTab.innerHTML = NewText;
}

function UpdateMapDists(Event) {
  var NewNode = document.getElementById("GM_CastleDists");
  if (! NewNode) {
    var InsertionPoint = document.getElementsByClassName("largeMapFrame")[0];
    NewNode = document.createElement("div");
    NewNode.id = "GM_CastleDists";
    NewNode.setAttribute("style", "text-align: center");
    InsertionPoint.parentNode.insertBefore(NewNode, InsertionPoint.nextSibling);
    var QuickNode = document.createElement("div");
    QuickNode.setAttribute("style", "text-align: center;");
    QuickNode.innerHTML =
      (! UKMode
         ? "<label>" + Translate("Unit 27") + ": </label><input " +
           "name='units[27]' type='text' size='5' value='0' id='units[27]' /> "
         : ""
      ) +
      "<label>" + Translate("Quick Roads") + ": </label><input id='" +
      "GM_QuickRoads' type='checkbox' />";
    InsertionPoint.parentNode.
      insertBefore(QuickNode, InsertionPoint.nextSibling);
    if (! UKMode)
      document.getElementById("units[27]").
        addEventListener("change", UpdateMapDists, true);
    document.getElementById("GM_QuickRoads").
      addEventListener("change", UpdateMapDists, true);
    var SpeedNode = document.createElement("div");
    SpeedNode.setAttribute("style", "text-align: center;");
    var Temp = " <label>" + Translate("Speed") +
      ": </label><select id='GM_SelectSpeed'>";
    for (var M = Speeds.length - 1; M >= 0; M--) {
      Temp += "<option>" + Speeds[M][0] + "</option>";
    }
    SpeedNode.innerHTML = Temp + "</select>";
    QuickNode.parentNode.insertBefore(SpeedNode, QuickNode.nextSibling);
    document.getElementById("GM_SelectSpeed").
      addEventListener("change", UpdateMapDists, true);
    NewNode.innerHTML = "";
  }
  var Target;
  if (! Event) {
    var Match = /setx=(\d+)&sety=(\d+)/i.exec(window.location);
    Match ? Target = [Match[1], Match[2]] : Target = null;
    if (! Target) {
      try {
        Target = eval(
          document.getElementById("GM_QuickRoads").getAttribute("GM_Target")
        );
      } catch(Error) {
        Target = null;
      }
    }
  } else if (
    Event.target && (
      Event.target.id == "GM_QuickRoads" || Event.target.id == "GM_SelectSpeed"
    )
  ) {
    Target = eval(
      document.getElementById("GM_QuickRoads").getAttribute("GM_Target")
    );
  } else {
    try {
      // no idea why this is necessary...
      var TempNode = Event.target;
      while (! TempNode.hasAttribute("GM_X") && TempNode.parentNode) {
        TempNode = TempNode.parentNode;
      }
      Target =
        [TempNode.getAttribute("GM_X"), TempNode.getAttribute("GM_Y")];
      document.getElementById("GM_QuickRoads").
        setAttribute("GM_Target", uneval(Target))
    } catch(Error) {
      Target = null;
    }
  }
  if (Target) {
    document.getElementById("GM_QuickRoads").
      setAttribute("GM_Target", uneval(Target));
    var Name = GetCastleName([null, Target[0], Target[1]]);
    var SelSpeed = document.getElementById("GM_SelectSpeed");
    SelSpeed = Number(SelSpeed.options[SelSpeed.selectedIndex].innerHTML);
    NewNode.innerHTML = "<center><table><tr><td>@" +
      Target[0] + ":" + Target[1] +
      (Name[0].length
         ? " (" + Name[0] + ")"
         : (Name[1].length ? " (" + Name[1].join(", ") + ")" : "")
      ) +
      "<br />" + CalcCastleDists(Target, SelSpeed, true, true)[0] +
      "</td></tr></table></center>";
  }
}

// update map tooltip for quick roads checkbox
function LookForoDv(Event) {
  var LastDiv = document.evaluate(
    "./div[last()]",
    document.body, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null
  );
  if (LastDiv) {
    LastDiv = LastDiv.singleNodeValue;
    if (LastDiv.getAttribute("style").indexOf("z-index: 100;") > -1) {
      LastDiv = LastDiv.getElementsByTagName("div");
      LastDiv = LastDiv[LastDiv.length - 2];
      if (LastDiv.innerHTML) {
        var TempNode = document.createElement("div");
        TempNode.innerHTML = LastDiv.innerHTML;
        var DelNode = document.evaluate(
          "descendant::span[@junkattr='1']",
          TempNode, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null
        ).singleNodeValue;
        if (DelNode) TempNode.removeChild(DelNode);
        var PatCoords = /.+?\((\d+):(\d+)\)\s*$/i;
        var Coords = PatCoords.exec(TempNode.innerHTML).slice(1);
        var Distance = Dist(Coords);
        window.removeEventListener("DOMNodeInserted", LookForoDv, true);
        LastDiv.innerHTML = "<span style='font-size: 80%' junkattr='1'>" +
          Translate("Merchant") + " " +
          MarchTime(Distance, MerchantLevels[MerchantLevel], "<br>", [0], false, false) +
          Translate("Fastest") + " " +
          MarchTime(Distance, Speeds[Speeds.length - 1][0], "<br>", [0], false, false) +
          Translate("Slowest") + " " + MarchTime(Distance, Speeds[0][0], "<br>", [0], false, false) +
          "</span>" + TempNode.innerHTML;
        window.addEventListener("DOMNodeInserted", LookForoDv, true);
      }
    }
  }
}

// filter out non-march options for pop-up, for non-city squares
function CustomMapMessage(Event) {
  var Show =
    (document.getElementById("playerMessageProfile").href.slice(-2) != "=0");
  var Message = document.getElementById("playerMessage");
  var Links = document.evaluate(
    "descendant::a" +
      "[not(@class='closeMessage') and not(@id='playerMessageMarch')]",
    Message, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null
  );
  for (let N = 0; N < Links.snapshotLength; N++) {
    Links.snapshotItem(N).
      setAttribute("style", "display: " + (Show ? "block" : "none") + ";");
  }
}

var PageMatch = new RegExp(Host + "/map\\.php", "i").test(window.location);
if (PageMatch) {
  document.getElementById("playerMessage").
    addEventListener("DOMAttrModified", CustomMapMessage, true);
  window.addEventListener("DOMNodeInserted", LookForoDv, true);
  window.addEventListener("keypress", PasteCoords, true);
  document.getElementsByClassName("gotoButton")[0].
    addEventListener("click", MapZoom, true);
  document.getElementById("searchX").form.
    addEventListener("keypress", HandleEnter, true);
  document.getElementById("searchY").form.
    addEventListener("keypress", HandleEnter, true);
  document.addEventListener("DOMNodeInserted", TrapMapUpdate, true);
  var InsertionPoint = document.getElementsByClassName("largeMapFrame")[0];
  var Button = document.createElement("center");
  Button.innerHTML = "<input type='button' value='" +
    Translate("Generate Map Report") + "' />";
  Button.addEventListener("click", ReportMapData, true);
  InsertionPoint.parentNode.insertBefore(Button, InsertionPoint.nextSibling);
  UpdateMapDists();
  window.setInterval(UpdateMapDists, 1000);
}

/******************************************************************************/
// barracks resource use

function UpdateResUse(Event) {
  if (! document.getElementById("GM_TrainRes")) {
    var NewNode = document.createElement("div");
    NewNode.style.color = "white";
    NewNode.innerHTML = Translate("Total Resources to Train") + ": <span id='GM_TrainRes'>" +
      "</span><br />" + Translate("Total Time to Train") + ": <span id='GM_TrainTime'></span>";
    var InsertionPoint = document.getElementById("submit").parentNode;
    InsertionPoint.parentNode.insertBefore(NewNode, InsertionPoint);
  }
  var UsedRes = UsedTime = 0;
  var UnitsList = document.getElementsByClassName("unitItem activeUnit");
  var ToTrain, TrainRes, TrainSpeed, TrainTime;
  var IndividualRes = [0, 0, 0, 0];
  for (var N = 0; N < UnitsList.length; N++) {
    ToTrain = document.evaluate(
      "descendant::input[@type='text']", UnitsList[N], null,
      XPathResult.FIRST_ORDERED_NODE_TYPE, null
    ).singleNodeValue;
    TrainSpeed = document.evaluate(
      "following-sibling::select", ToTrain, null,
      XPathResult.FIRST_ORDERED_NODE_TYPE, null
    ).singleNodeValue;
    if (TrainSpeed) {
      TrainSpeed = TrainSpeed.selectedIndex;
      switch (TrainSpeed) {
        case (0): TrainSpeed = 1; break;
        case (1): TrainSpeed = 3; break;
        case (2): TrainSpeed = 5; break;
      }
    } else {
      TrainSpeed = 1;
    }
    TrainTime =
      ToSeconds(UnitsList[N].getElementsByClassName("unitTime")[0].innerHTML) /
        (Math.ceil(TrainSpeed / 2));
    ToTrain = Number(ToTrain.value);
    var ResNodes = document.evaluate(
      "descendant::li[starts-with(@class, 'needed')]", UnitsList[N], null,
      XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null
    );
    TrainRes = 0;
    for (var M = 0; M < ResNodes.snapshotLength; M++) {
      var TempNum = ToTrain * TrainSpeed *
        Number(ResNodes.snapshotItem(M).innerHTML);
      IndividualRes[M] += TempNum;
      TrainRes += TempNum;
    }
    UsedRes += TrainRes;
    UsedTime += ToTrain * TrainTime;
  }
  document.getElementById("GM_TrainRes").innerHTML = String(UsedRes) + " (" +
    IndividualRes.join("/") + ")";
  document.getElementById("GM_TrainTime").innerHTML = HMS(Math.round(UsedTime));
}

var PageMatch = new RegExp(Host + "/barracks\\.php", "i").test(window.location);
if (PageMatch) {
  var Head = document.getElementsByTagName("head")[0];
  var NewScript = document.createElement("script");
  NewScript.innerHTML = UpdateResUse.toString();
  Head.appendChild(NewScript);

  var CancelGold = CancelIron = CancelWood = CancelFood = 0;
  function setMaximum(Form, Value) {
    document.forms.namedItem("build_army").elements.namedItem(Form).value =
      Value;
    UpdateResUse();
  }
  var NewScript = document.createElement("script");
  NewScript.innerHTML = setMaximum.toString();
  Head.appendChild(NewScript);
  var NewScript = document.createElement("script");
  NewScript.innerHTML = ToSeconds.toString();
  Head.appendChild(NewScript);
  var NewScript = document.createElement("script");
  NewScript.innerHTML = HMS.toString();
  Head.appendChild(NewScript);
  var NewScript = document.createElement("script");
  NewScript.innerHTML = Zero.toString();
  Head.appendChild(NewScript);

  var UnitTimes = new Array(), ID;
  var UnitsList = document.getElementsByClassName("unitItem activeUnit");
  for (var N = 0; N < UnitsList.length; N++) {
    var FormNode = document.evaluate(
      "descendant::input[@type='text']", UnitsList[N], null,
      XPathResult.FIRST_ORDERED_NODE_TYPE, null
    ).singleNodeValue;
    ID = "u" + /unit\[(\d+)\]/i.exec(FormNode.name)[1];
    FormNode.addEventListener("change", UpdateResUse, true);
    var Time = ToSeconds(document.evaluate(
      "descendant::span[@class='unitTime']", UnitsList[N], null,
      XPathResult.FIRST_ORDERED_NODE_TYPE, null
    ).singleNodeValue.innerHTML);
    UnitTimes[ID] = Time;
  }
  var PulldownList = document.evaluate(
    "//select[starts-with(@name,'speed')]", document, null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null
  );
  for (var N = 0; N < PulldownList.snapshotLength; N++) {
    PulldownList.snapshotItem(N).setAttribute(
      "onchange",
      PulldownList.snapshotItem(N).getAttribute("onchange") + "UpdateResUse();"
    );
  }
  var InProgress = document.evaluate(
    "//div[@class='queueArmy']", document, null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null
  );
  var PatID = new RegExp(
    "<img src=\".*?img" + (UKMode ? "_ut" : "") + "/units/thumbs/(\\d+)\\.jpg",
    "i"
  );
  var PatTimePerUnit = /<\/strong>[\s\n]*([\d:]*)\s*/i;
  var PatTraining = /<strong>(\d+) x /i;
  for (var N = 0; N < InProgress.snapshotLength; N++) {
    var ID = "u" + PatID.exec(InProgress.snapshotItem(N).innerHTML)[1];
    var Time = ToSeconds(
      PatTimePerUnit.exec(InProgress.snapshotItem(N).innerHTML)[1]
    )
    var Training =
      Number(PatTraining.exec(InProgress.snapshotItem(N).innerHTML)[1]);
    var TrainSpeed = [
      [Math.abs(Time - UnitTimes[ID]), 1],
      [Math.abs(2 * Time - UnitTimes[ID]), 3],
      [Math.abs(3 * Time - UnitTimes[ID]), 5]
    ];
    TrainSpeed.sort(function (a, b) {return CompNum(a[0], b[0]);});
    TrainSpeed = TrainSpeed[0][1];
    var CurrGold, CurrIron, CurrWood, CurrFood;
    ResList.forEach(
      function (Option) {
        eval(
          "Curr" + Option[0] + " = Math.floor(" +
            "Training * CancelUnit * Units[ID]['" +
            Option[0].toLowerCase() + "']);"
        );
        eval(
          "Cancel" + Option[0] + " += Curr" + Option[0] + ";"
        );
      }
    );
    var NewNode = document.createElement("div");
    NewNode.innerHTML = Translate("Cancel") + ": " + String(CurrGold) + "/" + String(CurrIron) +
      "/" + String(CurrWood) + "/" + String(CurrFood);
    NewNode.style.color = "white";
    InProgress.snapshotItem(N).appendChild(NewNode);
  }
  var InsertionPoint = document.getElementById("submit").parentNode;
  var NewNode = document.createElement("div");
  NewNode.style.color = "white";
  NewNode.innerHTML = Translate("Total Cancel") + ": " + String(CancelGold) + "/" +
    String(CancelIron) + "/" + String(CancelWood) + "/" + String(CancelFood);
  InsertionPoint.parentNode.insertBefore(NewNode, InsertionPoint);
  UpdateResUse();
}

/******************************************************************************/
// overview--capture merchants; check res needed for buildings

var PageMatch = new RegExp(Host + "/overview\\.php", "i").test(window.location);
if (PageMatch) {
  var CurrCastle = /<big>.+?\((\d+):(\d+)\)<\/big>/i.exec(
    document.getElementsByClassName("currentCastle")[0].innerHTML
  ).slice(1);
  var Limit = document.evaluate(
    "//div[@class='textformbox']/descendant::div[@class='right'][2]/" +
      "text()",
    document, null, XPathResult.STRING_TYPE, null
  ).stringValue;
  var Found = false;
  for (var N = 0; N < PlayerMerchants.length; N++) {
    if (
      PlayerMerchants[N][0] == CurrCastle[0] &&
      PlayerMerchants[N][1] == CurrCastle[1]
    ) {
      PlayerMerchants[N][2] = Limit; Found = true; break;
    }
  }
  if (! Found) {
    PlayerMerchants.push([CurrCastle[0], CurrCastle[1], Limit]);
  }
  GM_setValue(SavePrefix + "Merchants", uneval(PlayerMerchants));
  MerchantCapacity();

  // building notes
  var InsertionPoint = document.getElementById("overview");
  var ULNode = document.createElement("ul");
  ULNode.style.color = "white"; ULNode.style.marginLeft = "15px";
  InsertionPoint.insertBefore(ULNode, InsertionPoint.firstChild);
  var PatLevel = /.+?(\d+).*\]\s*body\[\]/i;
  for (var N = 1; N <= BuildingMaxID; N++) {
    var Level = 0;
    var Link = document.evaluate(
      "//a[contains(@id, 'b" + String(N) + "')]",
      document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null
    ).singleNodeValue;
    if (Link) Level = Number(PatLevel.exec(Link.getAttribute("title"))[1]);
    var LINode = document.createElement("li");
    LINode.innerHTML = Buildings[N][0] + ": ";
    if (Level == Buildings[N].length - 1) {
      LINode.innerHTML += "--";
    } else {
      var ResNeeded = Buildings[N][Level + 1].slice(0, 4);
      LINode.innerHTML += "#" + String(Level + 1) + "; " +
        String(ArraySum(ResNeeded)) + "; ";
      ResNeeded = [
        ResNeeded[0] - GlobalGold, ResNeeded[1] - GlobalIron,
        ResNeeded[2] - GlobalWood, ResNeeded[3] - GlobalFood
      ];
      var WorldSpeed =
        Number(GM_getValue(SavePrefix + "WorldSpeed", 1));
      for (var M = 0; M < ResNeeded.length; M++) {
        var Colour;
        if (ResNeeded[M] <= 0)
          Colour = "lightgreen";
        else
          Colour = "red";
        ResNeeded[M] = "<span style='color: " + Colour + "'>" +
          String(ResNeeded[M]) + "</span>";
      }
      var TotalNeeded = ArraySum(ResNeeded);
      ResNeeded = ResNeeded.join("/");
      var BuildTime = HMS(ToSeconds(Buildings[N][Level + 1][4]) / WorldSpeed);
      LINode.innerHTML += ResNeeded + "; " + BuildTime;
    }
    ULNode.appendChild(LINode);
  }
}

/******************************************************************************/
// formation helpers

function PasteFormation(Event) {
  var Formation = GM_getValue(SavePrefix + "_CopyFormation", "");
  if (Formation) {
    Formation = eval(Formation);
    var PatXY = /(\d)_(\d)/i;
    var PatOldXY = /x\dy\d/i;
    var Node, OldClass, OldID, OldPos, Exists, XY;
    if (! UKMode) {
      var Nodes = document.evaluate(
        "//*[starts-with(@id,'div_units_')]",
        document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null
      );
      for (var N = 0; N < Nodes.snapshotLength; N++) {
        Nodes.snapshotItem(N).setAttribute(
          "style",
          Nodes.snapshotItem(N).getAttribute("style").
            replace(/(top|left):\s*\d+(px)?/ig, "")
        );
      }
    }

    for (var N = 1; N < Formation.length; N++) {
      Position = Formation[N];
      if (Position) {
        // check for race-specific
        Node = document.getElementById("upos_" + String(N));
        var N2 = N;
        if (! Node) {
          for (var Special in RaceSpecific) {
            Node = document.evaluate(
              "//input[@id='upos_" + Special.slice(1) + "']",
              document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null
            ).singleNodeValue;
            if (Node) {
              N2 = Number(Node.id.slice(5));
              break;
            }
          }
        }

        // need to detect conflicts
        Exists = document.evaluate(
          "//input[starts-with(@name, 'unitsPos[')][@value='" + Position + "']",
          document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null
        ).singleNodeValue;
        if (Exists) {
          OldID = /upos_(\d+)/i.exec(Exists.id)[1];
          OldPos = document.getElementById("upos_" + String(N2)).value;
          document.getElementById("upos_" + OldID).value = OldPos;
          var TempNode = document.getElementById("div_units_" + OldID);
          OldClass = PatOldXY.exec(TempNode.getAttribute("class"))[0];
          RemoveClass(TempNode, OldClass);
          OldPos = PatXY.exec(OldPos);
          OldPos = "x" + OldPos[1] + "y" + OldPos[2];
          AddClass(TempNode, OldPos);
        }
        XY = PatXY.exec(Position);
        XY = "x" + XY[1] + "y" + XY[2];
        Node.value = Position;
        Node = document.getElementById("div_units_" + String(N2));
        OldClass = PatOldXY.exec(Node.getAttribute("class"))[0];
        RemoveClass(Node, OldClass);
        AddClass(Node, XY);
      }
    }
  }
}

var PageMatch = new RegExp(Host + "/army_order\\.php", "i").
  test(window.location);
if (PageMatch) {
  var DefaultText = "";
  if (! UKMode) {
    var DefaultText = document.evaluate(
      "//a[starts-with(@href,'army_order_save.php?delete=')]/ancestor::tbody/" +
        "descendant::b",
      document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null
    );
    var FormationIDs = [];
    for (N = 0; N < DefaultText.snapshotLength; N++) {
      FormationIDs.push(
        /(\d+)\s*$/i.exec(document.evaluate(
          "preceding-sibling::a", DefaultText.snapshotItem(N), null,
          XPathResult.FIRST_ORDERED_NODE_TYPE, null
        ).singleNodeValue.href)[1]
      );
    }
    if (DefaultText.snapshotLength)
      DefaultText = DefaultText.snapshotItem(0).innerHTML;
  }

  // save formations list
  var Options = document.getElementById("army_orders");
  if (Options) {
    Options = Options.options;
    var Formations = [], CurrVal;
    for (var N = 0; N < Options.length; N++) {
      CurrVal = Options[N].value;
      Formations.push([
        UKMode
          ? Options[N].innerHTML
          : (ArrMember(CurrVal, FormationIDs) > -1
              ? Options[N].innerHTML.replace(new RegExp("\\s*\\(" + DefaultText + "\\)$", "i"), "")
              : Options[N].innerHTML),
        CurrVal
      ]);
    }
    GM_setValue(SavePrefix + "Formations", uneval(Formations));
  }

  var EnemyBox = document.getElementById("enemybox");
  // enable pasting of copied formation
  if (EnemyBox) {
    EnemyBox.innerHTML += "<br /><br /><center>" +
      "<input type='button' value='" + Translate("Paste Formation") +
      "' id='GM_PasteFormation' /></center>";
    document.getElementById("GM_PasteFormation").
      addEventListener("click", PasteFormation, true);
  }
}

/******************************************************************************/
// add links to the clan interface (viewsauz)

var PageMatch = new RegExp(Host + "/viewsauz\\.php", "i").test(window.location);
if (PageMatch) {
  var Titles = document.evaluate(
    "//h2",
    document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null
  );

  var cl_info = 0;
  var cl_poli = 0;
  var cl_memb = 0;
  var cl_links_ini = "<div style='text-align:right;font-size:xx-small;position:relative;top:-2em'>";
  var cl_links_info = new Array(
    Translate("information"), 
    "<a href='#clan_information'/>"+Translate("information")+"</a>"
  );
  var cl_links_poli = new Array(
    Translate("politics"), 
    "<a href='#clan_politics'/>"+Translate("politics")+"</a>"
  );
  var cl_links_memb = new Array(
    Translate("members"), 
    "<a href='#clan_members'/>"+Translate("members")+"</a>"
  );
  var cl_links_end = "</div>";
  for (var i = 0; i < Titles.snapshotLength; i++) {
    var Title = Titles.snapshotItem(i)
    if (Title.getAttribute("id") == null) {
      if (Title.innerHTML == Translate("Clan information")) {
        Title.setAttribute("id", "clan_information");
        cl_info = 1
      } else if (Title.innerHTML == Translate("Clan politics")) {
        Title.setAttribute("id", "clan_politics")
        cl_poli = 1
      } else if (Title.innerHTML == Translate("Clan members")) {
        Title.setAttribute("id", "clan_members")
        cl_memb = 1
      }
    } 
  }
  for (var i = 0; i < Titles.snapshotLength; i++) {
    var Title = Titles.snapshotItem(i)
    if (Title.innerHTML == Translate("Clan information") || 
                Title.innerHTML == Translate("Clan politics") ||
                Title.innerHTML == Translate("Clan members")) {
        if (Title.innerHTML == Translate("Clan information")) {
          Title.innerHTML += cl_links_ini + 
            cl_links_info[0] + " | " + cl_links_poli[cl_poli] + " | " + 
            cl_links_memb[cl_memb] + cl_links_end
        } else if (Title.innerHTML == Translate("Clan politics")) {
          Title.innerHTML += cl_links_ini + 
            cl_links_info[cl_info] + " | " + cl_links_poli[0] + " | " + 
            cl_links_memb[cl_memb] + cl_links_end
        } else if (Title.innerHTML == Translate("Clan members")) {
          Title.innerHTML += cl_links_ini + 
            cl_links_info[cl_info] + " | " + cl_links_poli[cl_poli] + " | " + 
            cl_links_memb[0] + cl_links_end
        } else {
          Title.innerHTML += cl_links_ini + 
            cl_links_info[cl_info] + " | " + cl_links_poli[cl_poli] + " | " + 
            cl_links_memb[cl_memb] + cl_links_end
        } 
      }
    }
}

/******************************************************************************/
// automatically grab relevant hero skills on page visit

var PageMatch = new RegExp(Host + "/skills\\.php", "i").test(window.location);
if (PageMatch) {
  var Skills = document.evaluate(
    "//a[starts-with(@href, 'info.php')]",
    document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null
  );
  var RelevantSkills =
    {2: "Archer", 5: "Scout", 6: "Merchant", 8: "Mystic"};
  for (var N = 0; N < Skills.snapshotLength; N++) {
    if (N in RelevantSkills) {
      GM_setValue(
        SavePrefix + RelevantSkills[N],
        Skills.snapshotItem(N).previousSibling.previousSibling.innerHTML
      );
    }
  }
}

/******************************************************************************/
// automatically grab relevant upgrades on page visit

var PageMatch = new RegExp(Host + "/upgrades\\.php", "i").test(window.location);
if (PageMatch) {
  var InProgressInfo = document.evaluate(
    "//div[@class='queueBuilding ']/descendant::img",
    document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null
  );
  var InProgress = [];
  for (var N = 0; N < UnitMaxID + 1; N++) {
    InProgress.push(0);
  }
  for (var N = 0; N < InProgressInfo.snapshotLength; N++) {
    var ProgressID = Number(new RegExp(
      "img" + (UKMode ? "_ut" : "") + "/units/thumbs/(\\d+)\\.jpg",
      "i"
    ).exec(InProgressInfo.snapshotItem(N).getAttribute("src"))[1]);
    InProgress[ProgressID] += 1;
  }
  var DoneUpgrades = document.evaluate(
    "//div[@class='upgradeItem']",
    document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null
  );
  for (var N = 0; N < DoneUpgrades.snapshotLength; N++) {
    var DoneID = Number(
      /unitPic-(\d+)/i.exec(
        DoneUpgrades.snapshotItem(N).getElementsByClassName("unitPreview")[0].id
      )[1]
    );
    // in progress upgrades not labelled, so subtract all in progress levels
    // from observed attack level
    if (Units["u" + String(DoneID)]["wallcrasher"]) {
      var DoneLevel = String(Math.max(
        0,
        Number(
          DoneUpgrades.snapshotItem(N).
            getElementsByClassName("typeLevel")[0].innerHTML -
          InProgress[DoneID]
        )
      ));
      GM_setValue(
        SavePrefix + "u" + String(DoneID) + "a",
        String(DoneLevel)
      );
    }
  }
}

/******************************************************************************/
// user config

function ResetPrefs() {
  if (document.getElementById("GM_ResetCheck").checked) {
    var List = GM_listValues();
    var Pat = new RegExp(
      "^" + /[^.]+?\.(.+)$/i.exec(window.location.hostname)[1] + "_" +
        document.getElementById("GM_ResetWorld").value + "_",
      "i"
    );
    List.forEach(
      function (Option) {
        if (Pat.test(Option)) GM_deleteValue(Option);
      }
    );
  }
}

var ConfigNode = document.createElement("div");
ConfigNode.innerHTML = "<ul id='GM_Config' style='list-style: disc outside;" +
  " color: white; display: none; -moz-column-count: 3; margin-left: 100px;" +
  "'></ul>";
document.body.insertBefore(ConfigNode, document.body.firstChild);

var ConfigButton = document.createElement("input");
ConfigButton.type = "button";
ConfigButton.setAttribute("style", "float: left;");
ConfigButton.value = Translate("Options");
ConfigButton.addEventListener(
  "click",
  function () {
    var Node = document.getElementById("GM_Config");
    if (Node.style.display == "none") {
      Node.style.display = "block";
    } else {
      Node.style.display = "none";
    }
  },
  true
);
ConfigNode.insertBefore(ConfigButton, ConfigNode.firstChild);

var Configs = [
  ["Archer", Translate("Archer")], 
  ["Scout", Translate("Scout")],
  ["Merchant", Translate("Merchant")], 
  ["Mystic", Translate("Mystic")],
  ["MinHeal", Translate("Minimum Heal")],
  ["MinScavenge", Translate("Minimum Scavenge")],
  ["StealFrac", Translate("Steal Fraction")],
  ["WorldSpeed", Translate("World Speed"), "1"],
  ["ClanID", Translate("ClanID")],
  [
    "ServerOffset",
    Translate("Server Offset, Minutes") + " (" +
      StripDecimals(Round(InitOffset, 0.01), 2) + "/" +
      StripDecimals(Round(1440 + InitOffset, 0.01), 2) + ")",
    "0"
  ],
  ["MaxX", Translate("Maximum X"), "200"],
  ["MaxY", Translate("Maximum Y"), "200"],
  ["DefaultAttack", Translate("Default Attack Formation"), ""]
];
for (var N in Units) {
  if (Units[N]["wallcrasher"]) {
    Configs.push(
      [N + "a", Units[N]["name"] + " " + Translate("Atk+")]
    );
  }
}

var InsertionPoint = document.getElementById("GM_Config");
Configs.forEach(
  function(Config) {
    var Name = Config;
    var Label = Config;
    if (typeof(Name) != "string") {
      Name = Config[0]; Label = Config[1];
    }
    var Default = GM_getValue(SavePrefix + Name, "0");
    if (typeof(Config) != "string" && Config.length > 2 && Default == "0")
      Default = Config[2];
    var NewNode = document.createElement("li");
    NewNode.innerHTML = "<input type='text' value='" + Default +
      "' id='GM_Config" + Name + "' size='10' /> " + Label;
    InsertionPoint.appendChild(NewNode);
  }
);
var SaveButton = document.createElement("input");
SaveButton.type = "button";
SaveButton.value = Translate("Save");
SaveButton.addEventListener(
  "click",
  function () {
    Configs.forEach(
      function(Config) {
        var Name = Config;
        if (typeof(Name) != "string") {
          Name = Config[0];
        }
        GM_setValue(
          SavePrefix + Name,
          document.getElementById("GM_Config" + Name).value
        );
      }
    );
  },
  true
);
InsertionPoint.appendChild(document.createElement("br"));
InsertionPoint.appendChild(SaveButton);
InsertionPoint.appendChild(document.createElement("br"));
InsertionPoint.appendChild(document.createElement("br"));

var ClearStuff = document.createElement("div");
ClearStuff.innerHTML =
  "<input id='GM_Reset' type='button' value='" +
  Translate("Delete ALL Data (Map Too)") + "' />" +
  "<br />" + Translate("For world") + ": " +
  "<input id='GM_ResetWorld' type='text' size='10' value='0' />" +
  "<br />" + Translate("Really! (This could take a long time.)") + " " +
  "<input id='GM_ResetCheck' type='checkbox' value='false' />";
InsertionPoint.appendChild(ClearStuff);

document.getElementById("GM_Reset").addEventListener("click", ResetPrefs, true);

/******************************************************************************/
// logout: cleanup

function CleanOptions(Event) {
  Event.stopPropagation();
  Event.preventDefault();
  var List = GM_listValues();
  var Pat = /^QuickGo\d+((Formation)|X|Y|(FormationNum))?$/i;
  List.forEach(
    function (Item) {if (Pat.test(Item)) GM_deleteValue(Item);}
  );
  window.location.href = Host + "/logout.php";
}

var Logout = document.evaluate(
  "//a[contains(@href, 'logout.php')]",
  document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null
).singleNodeValue;
Logout.addEventListener("click", CleanOptions, true);

/******************************************************************************/

Node = document.getElementsByClassName("coinsTip");
if (Node) unsafeWindow.closeInfoTooltip();
Node = document.getElementById("advisorMessage");
if (Node) Node.parentNode.removeChild(Node);

