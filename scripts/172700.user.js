// ==UserScript==
// @name        stiddari.de (Versão Portuguesa)
// @namespace   http://userscripts.org/users/513921
// @description Translates the game from German to Portuguese
// @include     http://test.de.stiddari.com*
// @include     http://ravengames.de*
// @include     http://www.ravengames.de*
// @version     1
// ==/UserScript==
//



(function() {

// HOME
if (location.pathname.search('index.php') != -1) {
document.body.innerHTML = document.body.innerHTML.replace(/\b(spielername)\b/g, 'Username');
document.body.innerHTML = document.body.innerHTML.replace(/\b(passwort)\b/g, 'Password');
document.body.innerHTML = document.body.innerHTML.replace(/\b(anmelden)\b/g, 'Registar');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Password vergessen)\b/g, 'Esqueceste a tua password?');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Willkommen bei)\b/g, 'Benvindo ao');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Was erwartet dich)\b/g, 'De que estás à espera');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Platz für)\b/g, 'Espaço para');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Einheiten)\b/g, 'Unidades de Ataque');
document.body.innerHTML = document.body.innerHTML.replace(/\b(defensive Jungs)\b/g, 'Unidades de Defesa');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Ausbildungen)\b/g, 'Pesquisas');
document.body.innerHTML = document.body.innerHTML.replace(/\b(server informationen)\b/g, 'Informações do Servidor');
document.body.innerHTML = document.body.innerHTML.replace(/\b(pranger)\b/g, 'Lista de Bans');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Grund)\b/g, 'Razão');
document.body.innerHTML = document.body.innerHTML.replace(/\b(gesperrt)\b/g, 'Banidos');
document.body.innerHTML = document.body.innerHTML.replace(/\b(bis)\b/g, 'Até');
document.body.innerHTML = document.body.innerHTML.replace(/\b(registrieren)\b/g, 'Registar');
document.body.innerHTML = document.body.innerHTML.replace(/\b(game features)\b/g, 'Características');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Wenn Du bereits einen Account bei einem der Spiele unter)\b/g, 'Se já tens uma conta num dos seguintes');
document.body.innerHTML = document.body.innerHTML.replace(/\b(hast oder hattest, dann brauchst Du dir keinen neuen erstellen)\b/g, 'então não precisas de criar uma nova');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Auch kannst Du dich mit deinem globalen Account)\b/g, 'Também podes fazer o login, com este mesmo registo de conta, ');
document.body.innerHTML = document.body.innerHTML.replace(/\b(im Forum)\b/g, 'no Fórum,');   
document.body.innerHTML = document.body.innerHTML.replace(/\b(Registar und brauchst dich dort nicht mehr Registar)\b/g, 'não sendo necessário fazer nenhum outro registo');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Dein Account ist global und in allen dieser Spiele zu erreichen)\b/g, 'A tua conta é global, e dá-te acesso instantâneo a todos estes jogos');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Globale Accountverwaltung)\b/g, 'Gestão Global de Contas');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Loginname)\b/g, 'Username');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Passwort)\b/g, 'Password');
document.body.innerHTML = document.body.innerHTML.replace(/\b(wiederholen)\b/g, 'Confirmar Password');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Hiermit akzeptiere ich die)\b/g, 'Eu aceito os termos e condições em');
document.body.innerHTML = document.body.innerHTML.replace(/\b(oder)\b/g, 'ou');
document.body.innerHTML = document.body.innerHTML.replace(/\b(senden)\b/g, 'enviar');
document.body.innerHTML = document.body.innerHTML.replace(/\b(registrierte spieler)\b/g, 'Jogadores registados');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Tage)\b/g, 'Dias');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Tag)\b/g, 'Dia');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Server Informationen)\b/g, 'Informações do Servidor');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Planeten)\b/g, 'Planetas');
document.body.innerHTML = document.body.innerHTML.replace(/\b(E-Mailadresse)\b/g, 'Email');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Hier kannst du dir ein neues Password für deinen Account zuschicken lassen)\b/g, 'Aqui podes enviar uma nova password para a tua conta');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Dieses gilt für die Spiel, Foren und für die Globale Spielerverwaltung)\b/g, 'Isto aplica-se aos jogos, fóruns e também para a Gestão Global de Contas');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Um die Passwörter in den Foren zu den Spielen zu ändern)\b/g, 'Para mudar a password para os jogos e fóruns');
document.body.innerHTML = document.body.innerHTML.replace(/\b(logg dich bitte mit deinem Password in die Globale Spielerverwaltung ein)\b/g, 'é favor fazer o login com a tua password na Gestão Global de Contas');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Wrong password)\b/g, 'Password Errada!');

document.body.innerHTML = document.body.innerHTML.replace(/\b(im Chat)\b/g, 'no Chat');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Spieler)\b/g, 'Jogadores');
document.body.innerHTML = document.body.innerHTML.replace(/\b(registriert)\b/g, 'Registados');
document.body.innerHTML = document.body.innerHTML.replace(/\b(einstellungen)\b/g, 'configurações');
document.body.innerHTML = document.body.innerHTML.replace(/\b(bewerbung)\b/g, 'formulário de candidatura');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Accountdaten)\b/g, 'Dados da Conta');
document.body.innerHTML = document.body.innerHTML.replace(/\b(UserID)\b/g, 'User ID');
document.body.innerHTML = document.body.innerHTML.replace(/\b(LoginName)\b/g, 'Username');
document.body.innerHTML = document.body.innerHTML.replace(/\b(E-Mail)\b/g, 'Email');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Premium Punkte)\b/g, 'Pontos Premium');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Password ändern)\b/g, 'Alterar Password');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Aktuelles)\b/g, 'Password Actual');
document.body.innerHTML = document.body.innerHTML.replace(/\b(neues)\b/g, 'Nova Password');
document.body.innerHTML = document.body.innerHTML.replace(/ändern/g, 'Alterar');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Das neue Password stimmt nicht mit der Wiederholung überein)\b/g, 'As passwords digitadas não coincidem');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Das aktuelle Password wurde falsch eingegeben)\b/g, 'A password atual foi digitada incorretamente');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Das Password wurde erfolgreich geändert)\b/g, 'A password foi alterada com sucesso');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Du hast dich erfolgreich ausgeloggt)\b/g, 'Foste desconectado com sucesso');
document.body.innerHTML = document.body.innerHTML.replace(/\b(weiter)\b/g, 'seguinte');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Es wurde dir ein Link zum bestätigen an deine eingetragene Email Adresse gesendet)\b/g, 'Foi-te enviado um email com um link de confirmação que te permite solicitar uma nova senha');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Hier kannst du dein neuen Password eingeben)\b/g, 'Aqui podes digitar a tua nova password');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Kein gültiger Auftrag zum ändern des Passwortes gefunden)\b/g, 'Dados preenchidos incorrectamente');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Nova Password Password)\b/g, 'Nova Password');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Password Confirmar Password)\b/g, 'Confirmar Password');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Es muss mindestens 6 Zeichen haben und ist sofort gültig)\b/g, 'A password deve ser composta por pelo menos 6 caracteres');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Das Password muss mindestens 6 Zeichen lang sein)\b/g, 'A Password deve ter pelo menos 6 caracteres');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Die Passwörter stimmen nicht überein)\b/g, 'As passwords digitadas não coincidem');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Spiel)\b/g, 'Jogo');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Wohnort)\b/g, 'Morada');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Land)\b/g, 'País');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Geburtsdatum)\b/g, 'Data de Nascimento');
document.body.innerHTML = document.body.innerHTML.replace(/\b(TT-MM-JJJJ)\b/g, 'DD-MM-AAAA');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Personalausweis)\b/g, 'Número de BI');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Spiele seit ca)\b/g, 'Outros jogos em que jogas');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Bewerbung)\b/g, 'Aplicação');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Absenden)\b/g, 'Submeter');
}


// Menu
document.body.innerHTML = document.body.innerHTML.replace(/Übersicht/g, 'Vista Geral');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Räume im Ausbau)\b/g, 'Habitações em construção');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Räume)\b/g, 'Habitações');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Trainingslager)\b/g, 'Campo de Treino');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Objektschutz)\b/g, 'Segurança');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Ausbildung)\b/g, 'Pesquisa');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Gebäude)\b/g, 'Edifícios');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Suche)\b/g, 'Procurar');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Zielliste)\b/g, 'Lista de Farms');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Kopfgeld)\b/g, 'Caçadores de Prémios');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Technik)\b/g, 'Tecnologias');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Allianzen)\b/g, 'Famílias');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Rohstoffe)\b/g, 'Recursos');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Einsätze)\b/g, 'Missões');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Stadtkarte)\b/g, 'Mapa');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Nachrichten)\b/g, 'Mensagens');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Highscore)\b/g, 'Classificações');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Freunde)\b/g, 'Amigos');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Statistiken)\b/g, 'Estatísticas');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Regeln)\b/g, 'Regras');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Einstellungen)\b/g, 'Opções');
document.body.innerHTML = document.body.innerHTML.replace(/Bilder Upload/g, 'Upload de Imagens');
document.body.innerHTML = document.body.innerHTML.replace(/\b(spenden)\b/g, 'Doar');
document.body.innerHTML = document.body.innerHTML.replace(/Schläger/g, 'Rufia');
document.body.innerHTML = document.body.innerHTML.replace(/Türsteher/g, 'Porteiro');
document.body.innerHTML = document.body.innerHTML.replace(/Messerstecher/g, 'Esfaqueador');
document.body.innerHTML = document.body.innerHTML.replace(/Revolverheld/g, 'Pistoleiro');
document.body.innerHTML = document.body.innerHTML.replace(/Besetzungstruppe/g, 'Tropa de Ocupação');
document.body.innerHTML = document.body.innerHTML.replace(/Spion/g, 'Espião');
document.body.innerHTML = document.body.innerHTML.replace(/Möbelpacker/g, 'Transportador');
document.body.innerHTML = document.body.innerHTML.replace(/CIA Agent/g, 'Agente da CIA');
document.body.innerHTML = document.body.innerHTML.replace(/FBI Agent/g, 'Agente do FBI');
document.body.innerHTML = document.body.innerHTML.replace(/Scharfschütze/g, 'Atirador de Elite');
document.body.innerHTML = document.body.innerHTML.replace(/Transporteur/g, 'Carregador');
document.body.innerHTML = document.body.innerHTML.replace(/Problemlöser/g, 'Perito Táctico');
document.body.innerHTML = document.body.innerHTML.replace(/Profikiller/g, 'Assassino');
document.body.innerHTML = document.body.innerHTML.replace(/Bombenleger/g, 'Perito em Demolições');
document.body.innerHTML = document.body.innerHTML.replace(/Söldner/g, 'Mercenário');
document.body.innerHTML = document.body.innerHTML.replace(/Attentäter/g, 'Batedor');
document.body.innerHTML = document.body.innerHTML.replace(/Schwarzgeldarbeiter/g, 'Trabalhador Clandestino');
document.body.innerHTML = document.body.innerHTML.replace(/Objektwache/g, 'Sentinela');
document.body.innerHTML = document.body.innerHTML.replace(/Bodyguard/g, 'Guarda-costas');
document.body.innerHTML = document.body.innerHTML.replace(/Guarde/g, 'Guarda');
document.body.innerHTML = document.body.innerHTML.replace(/Polizist/g, 'Polícia');

// Overview
if (location.pathname.search('overview.php') != -1) {
document.body.innerHTML = document.body.innerHTML.replace(/\b(Truppen)\b/g, 'Tropas');
document.body.innerHTML = document.body.innerHTML.replace(/\b(der Einheiten)\b/g, 'das Unidades');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Keine Einheiten)\b/g, 'Sem Unidades');
document.body.innerHTML = document.body.innerHTML.replace(/ändern/g, 'Modificar');
document.body.innerHTML = document.body.innerHTML.replace(/Truppe/g, 'Tropas');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Verteidigung)\b/g, 'Defesa');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Punkte)\b/g, 'Pontos');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Anzahl)\b/g, 'Número');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Kampfstärke)\b/g, 'Poder de Ataque');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Einheiten)\b/g, 'Tropas');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Gesamtübersicht)\b/g, 'Vista Global');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Details)\b/g, 'Detalhes');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Recursos Transportieren)\b/g, 'Transportar');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Tropas stationieren)\b/g, 'Estacionar');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Chefbüro)\b/g, 'Escritório do Chefe');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Ausbildungsraum)\b/g, 'Pesquisa');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Waffenkammer)\b/g, 'Fábrica de Armas');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Munitionskammer)\b/g, 'Fábrica de Munições');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Brauerei)\b/g, 'Destilaria');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Kneipe)\b/g, 'Bar');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Schmuggel)\b/g, 'Contrabando');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Waffenlager)\b/g, 'Armazém de Armas');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Munitionsdepot)\b/g, 'Armazém de Munições');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Alkohollager)\b/g, 'Armazém de Álcool');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Tresorraum)\b/g, 'Cofre');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Trainingslager)\b/g, 'Campo de Treino');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Selbstschussanlagen)\b/g, 'Torre de Defesa');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Versteckte Minen)\b/g, 'Minas');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Ehre)\b/g, 'Honra');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Chemische Pesquisa)\b/g, 'Treino Químico');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Psychisches Training)\b/g, 'Treino Psicológico');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Guerillaausbildung)\b/g, 'Guerrilha');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Bombenbau)\b/g, 'Explosivos');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Schusstraining)\b/g, 'Treino de Armas de Fogo');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Kurzwaffenkampf)\b/g, 'Treino de Armas de Curta Distância');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Nahkampf)\b/g, 'Combate Corpo a Corpo');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Gruppenschutz)\b/g, 'Protecção de Gangue');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Objektbewachung)\b/g, 'Patrulha de Segurança');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Informationsbeschaffung)\b/g, 'Espionagem');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Schmuggel)\b/g, 'Contrabando');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Basisverwaltung)\b/g, 'Base Administrativa');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Schutzgeldeintreibung)\b/g, 'Extorsão');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Auftragsplanung)\b/g, 'Estratégia');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Routenplanung)\b/g, 'Plano de Rotas');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Rückkehr)\b/g, 'de volta');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Camp gründen)\b/g, 'Ocupar');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Angreifen)\b/g, 'Atacar');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Tag)\b/g, 'Dia');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Tage)\b/g, 'Dias');

document.body.innerHTML = document.body.innerHTML.replace('inc/stiddari/img/U17K.jpg', 'http://www.themob.pt/img/U17K.gif');
document.body.innerHTML = document.body.innerHTML.replace('inc/stiddari/img/U10K.jpg', 'http://www.themob.pt/img/U10K.gif');
document.body.innerHTML = document.body.innerHTML.replace('inc/stiddari/img/U11K.jpg', 'http://www.themob.pt/img/U11K.gif');
document.body.innerHTML = document.body.innerHTML.replace('inc/stiddari/img/U12K.jpg', 'http://www.themob.pt/img/U12K.gif');
document.body.innerHTML = document.body.innerHTML.replace('inc/stiddari/img/U13K.jpg', 'http://www.themob.pt/img/U13K.gif');
document.body.innerHTML = document.body.innerHTML.replace('inc/stiddari/img/U14K.jpg', 'http://www.themob.pt/img/U14K.gif');
document.body.innerHTML = document.body.innerHTML.replace('inc/stiddari/img/U15K.jpg', 'http://www.themob.pt/img/U15K.gif');
document.body.innerHTML = document.body.innerHTML.replace('inc/stiddari/img/U16K.jpg', 'http://www.themob.pt/img/U16K.gif');
document.body.innerHTML = document.body.innerHTML.replace('inc/stiddari/img/U1K.jpg', 'http://www.themob.pt/img/U1K.gif');
document.body.innerHTML = document.body.innerHTML.replace('inc/stiddari/img/U2K.jpg', 'http://www.themob.pt/img/U2K.gif');
document.body.innerHTML = document.body.innerHTML.replace('inc/stiddari/img/U3K.jpg', 'http://www.themob.pt/img/U3K.gif');
document.body.innerHTML = document.body.innerHTML.replace('inc/stiddari/img/U4K.jpg', 'http://www.themob.pt/img/U4K.gif');
document.body.innerHTML = document.body.innerHTML.replace('inc/stiddari/img/U5K.jpg', 'http://www.themob.pt/img/U5K.gif');
document.body.innerHTML = document.body.innerHTML.replace('inc/stiddari/img/U6K.jpg', 'http://www.themob.pt/img/U6K.gif');
document.body.innerHTML = document.body.innerHTML.replace('inc/stiddari/img/U7K.jpg', 'http://www.themob.pt/img/U7K.gif');
document.body.innerHTML = document.body.innerHTML.replace('inc/stiddari/img/U8K.jpg', 'http://www.themob.pt/img/U8K.gif');
document.body.innerHTML = document.body.innerHTML.replace('inc/stiddari/img/U9K.jpg', 'http://www.themob.pt/img/U9K.gif');
document.body.innerHTML = document.body.innerHTML.replace('inc/stiddari/img/V1K.jpg', 'http://www.themob.pt/img/V1K.gif');
document.body.innerHTML = document.body.innerHTML.replace('inc/stiddari/img/V2K.jpg', 'http://www.themob.pt/img/V2K.gif');
document.body.innerHTML = document.body.innerHTML.replace('inc/stiddari/img/V3K.jpg', 'http://www.themob.pt/img/V3K.gif');
document.body.innerHTML = document.body.innerHTML.replace('inc/stiddari/img/V4K.jpg', 'http://www.themob.pt/img/V4K.gif');
document.body.innerHTML = document.body.innerHTML.replace('inc/stiddari/img/V5K.jpg', 'http://www.themob.pt/img/V5K.gif');
}

// General Overview
if (location.pathname.search('empire.php') != -1) {
document.body.innerHTML = document.body.innerHTML.replace(/\b(Chefbüro)\b/g, 'Escritório do Chefe');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Ausbildungsraum)\b/g, 'Pesquisa');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Waffenkammer)\b/g, 'Fábrica de Armas');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Munitionskammer)\b/g, 'Fábrica de Munições');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Brauerei)\b/g, 'Destilaria');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Kneipe)\b/g, 'Bar');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Schmuggel)\b/g, 'Contrabando');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Waffenlager)\b/g, 'Armazém de Armas');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Munitionsdepot)\b/g, 'Armazém de Munições');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Alkohollager)\b/g, 'Armazém de Álcool');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Tresorraum)\b/g, 'Cofre');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Trainingslager)\b/g, 'Campo de Treino');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Selbstschussanlagen)\b/g, 'Torre de Defesa');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Versteckte Minen)\b/g, 'Minas');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Raum)\b/g, 'Habitação');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Punkte)\b/g, 'Pontos');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Tag)\b/g, 'Dia');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Tage)\b/g, 'Dias');
}

// Details
if (location.pathname.search('kampftab.php') != -1) {
document.body.innerHTML = document.body.innerHTML.replace(/\b(Kampfstärke)\b/g, 'Poder de Ataque');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Ehre)\b/g, 'Honra');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Anzahl)\b/g, 'Número de');
}

// Unit Overview
if (location.pathname.search('unitview.php') != -1) {
document.body.innerHTML = document.body.innerHTML.replace(/\b(Recursos Transportieren)\b/g, 'Transportar');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Einheiten stationieren)\b/g, 'Estacionar');
document.body.innerHTML = document.body.innerHTML.replace(/\b(abbrechen)\b/g, 'Cancelar');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Truppen)\b/g, 'Tropas');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Startgebäude)\b/g, 'Origem');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Zielgebäude)\b/g, 'Destino');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Start)\b/g, 'Partida');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Ankunft)\b/g, 'Chegada');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Restdauer)\b/g, 'Tempo Restante');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Anzahl)\b/g, 'Número');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Auftrag)\b/g, 'Missão');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Einheiten)\b/g, 'Unidades');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Rückkehr)\b/g, 'de volta');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Camp gründen)\b/g, 'Ocupar');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Keine)\b/g, 'Nenhuma');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Angreifen)\b/g, 'Atacar');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Tag)\b/g, 'Dia');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Tage)\b/g, 'Dias');
}

// Habitações
if ((location.pathname.search('konst.php') != -1) || (location.pathname.search('stats.php') != -1)) {
document.body.innerHTML = document.body.innerHTML.replace(/\b(Chefbüro)\b/g, 'Escritório do Chefe');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Ausbildungsraum)\b/g, 'Pesquisa');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Waffenkammer)\b/g, 'Fábrica de Armas');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Munitionskammer)\b/g, 'Fábrica de Munições');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Brauerei)\b/g, 'Destilaria');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Kneipe)\b/g, 'Bar');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Schmuggel)\b/g, 'Contrabando');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Waffenlager)\b/g, 'Armazém de Armas');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Munitionsdepot)\b/g, 'Armazém de Munições');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Alkohollager)\b/g, 'Armazém de Álcool');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Tresorraum)\b/g, 'Cofre');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Trainingslager)\b/g, 'Campo de Treino');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Selbstschussanlagen)\b/g, 'Torre de Defesa');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Versteckte Minen)\b/g, 'Minas');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Ausbau)\b/g, 'Expansão');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Stufe)\b/g, 'Nível');
document.body.innerHTML = document.body.innerHTML.replace(/\b(abbrechen)\b/g, 'cancelar');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Raum)\b/g, 'Habitações');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Dauer)\b/g, 'Duração');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Tag)\b/g, 'Dia');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Tage)\b/g, 'Dias');

document.body.innerHTML = document.body.innerHTML.replace('inc/stiddari/img/B10K.jpg', 'http://www.themob.pt/img/B10K.gif');
document.body.innerHTML = document.body.innerHTML.replace('inc/stiddari/img/B11K.jpg', 'http://www.themob.pt/img/B11K.gif');
document.body.innerHTML = document.body.innerHTML.replace('inc/stiddari/img/B12K.jpg', 'http://www.themob.pt/img/B12K.gif');
document.body.innerHTML = document.body.innerHTML.replace('inc/stiddari/img/B13K.jpg', 'http://www.themob.pt/img/B13K.gif');
document.body.innerHTML = document.body.innerHTML.replace('inc/stiddari/img/B14K.jpg', 'http://www.themob.pt/img/B14K.gif');
document.body.innerHTML = document.body.innerHTML.replace('inc/stiddari/img/B15K.jpg', 'http://www.themob.pt/img/B15K.gif');
document.body.innerHTML = document.body.innerHTML.replace('inc/stiddari/img/B1K.jpg', 'http://www.themob.pt/img/B1K.gif');
document.body.innerHTML = document.body.innerHTML.replace('inc/stiddari/img/B2K.jpg', 'http://www.themob.pt/img/B2K.gif');
document.body.innerHTML = document.body.innerHTML.replace('inc/stiddari/img/B3K.jpg', 'http://www.themob.pt/img/B3K.gif');
document.body.innerHTML = document.body.innerHTML.replace('inc/stiddari/img/B4K.jpg', 'http://www.themob.pt/img/B4K.gif');
document.body.innerHTML = document.body.innerHTML.replace('inc/stiddari/img/B5K.jpg', 'http://www.themob.pt/img/B5K.gif');
document.body.innerHTML = document.body.innerHTML.replace('inc/stiddari/img/B6K.jpg', 'http://www.themob.pt/img/B6K.gif');
document.body.innerHTML = document.body.innerHTML.replace('inc/stiddari/img/B7K.jpg', 'http://www.themob.pt/img/B7K.gif');
document.body.innerHTML = document.body.innerHTML.replace('inc/stiddari/img/B8K.jpg', 'http://www.themob.pt/img/B8K.gif');
document.body.innerHTML = document.body.innerHTML.replace('inc/stiddari/img/B9K.jpg', 'http://www.themob.pt/img/B9K.gif');
}

// Campo de Treino
if ((location.pathname.search('off.php') != -1) || (location.pathname.search('stats.php') != -1)) {
document.body.innerHTML = document.body.innerHTML.replace(/\b(Schläger)\b/g, 'Rufia');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Türsteher)\b/g, 'Porteiro');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Messerstecher)\b/g, 'Esfaqueador');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Revolverheld)\b/g, 'Pistoleiro');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Besetzungstruppe)\b/g, 'Tropa de Ocupação');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Spion)\b/g, 'Espião');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Möbelpacker)\b/g, 'Transportador');
document.body.innerHTML = document.body.innerHTML.replace(/\b(CIA Agent)\b/g, 'Agente da CIA');
document.body.innerHTML = document.body.innerHTML.replace(/\b(FBI Agent)\b/g, 'Agente do FBI');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Trasporteur)\b/g, 'Carregador');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Problemlöser)\b/g, 'Perito Táctico');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Scharfschütze)\b/g, 'Atirador de Elite');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Profikiller)\b/g, 'Assassino');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Bombenleger)\b/g, 'Perito em Demolições');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Söldner)\b/g, 'Mercenário');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Attentäter)\b/g, 'Batedor');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Produktion)\b/g, 'Produção');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Bauschleife)\b/g, 'Lista de Espera');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Keine Einheiten)\b/g, 'Sem ordens de momento');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Dauer)\b/g, 'Duração');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Los)\b/g, 'Ir');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Tag)\b/g, 'Dia');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Tage)\b/g, 'Dias');


document.body.innerHTML = document.body.innerHTML.replace('inc/stiddari/img/U17K.jpg', 'http://www.themob.pt/img/U17K.gif');
document.body.innerHTML = document.body.innerHTML.replace('inc/stiddari/img/U10K.jpg', 'http://www.themob.pt/img/U10K.gif');
document.body.innerHTML = document.body.innerHTML.replace('inc/stiddari/img/U11K.jpg', 'http://www.themob.pt/img/U11K.gif');
document.body.innerHTML = document.body.innerHTML.replace('inc/stiddari/img/U12K.jpg', 'http://www.themob.pt/img/U12K.gif');
document.body.innerHTML = document.body.innerHTML.replace('inc/stiddari/img/U13K.jpg', 'http://www.themob.pt/img/U13K.gif');
document.body.innerHTML = document.body.innerHTML.replace('inc/stiddari/img/U14K.jpg', 'http://www.themob.pt/img/U14K.gif');
document.body.innerHTML = document.body.innerHTML.replace('inc/stiddari/img/U15K.jpg', 'http://www.themob.pt/img/U15K.gif');
document.body.innerHTML = document.body.innerHTML.replace('inc/stiddari/img/U16K.jpg', 'http://www.themob.pt/img/U16K.gif');
document.body.innerHTML = document.body.innerHTML.replace('inc/stiddari/img/U1K.jpg', 'http://www.themob.pt/img/U1K.gif');
document.body.innerHTML = document.body.innerHTML.replace('inc/stiddari/img/U2K.jpg', 'http://www.themob.pt/img/U2K.gif');
document.body.innerHTML = document.body.innerHTML.replace('inc/stiddari/img/U3K.jpg', 'http://www.themob.pt/img/U3K.gif');
document.body.innerHTML = document.body.innerHTML.replace('inc/stiddari/img/U4K.jpg', 'http://www.themob.pt/img/U4K.gif');
document.body.innerHTML = document.body.innerHTML.replace('inc/stiddari/img/U5K.jpg', 'http://www.themob.pt/img/U5K.gif');
document.body.innerHTML = document.body.innerHTML.replace('inc/stiddari/img/U6K.jpg', 'http://www.themob.pt/img/U6K.gif');
document.body.innerHTML = document.body.innerHTML.replace('inc/stiddari/img/U7K.jpg', 'http://www.themob.pt/img/U7K.gif');
document.body.innerHTML = document.body.innerHTML.replace('inc/stiddari/img/U8K.jpg', 'http://www.themob.pt/img/U8K.gif');
document.body.innerHTML = document.body.innerHTML.replace('inc/stiddari/img/U9K.jpg', 'http://www.themob.pt/img/U9K.gif');
document.body.innerHTML = document.body.innerHTML.replace('inc/stiddari/img/V1K.jpg', 'http://www.themob.pt/img/V1K.gif');
document.body.innerHTML = document.body.innerHTML.replace('inc/stiddari/img/V2K.jpg', 'http://www.themob.pt/img/V2K.gif');
document.body.innerHTML = document.body.innerHTML.replace('inc/stiddari/img/V3K.jpg', 'http://www.themob.pt/img/V3K.gif');
document.body.innerHTML = document.body.innerHTML.replace('inc/stiddari/img/V4K.jpg', 'http://www.themob.pt/img/V4K.gif');
document.body.innerHTML = document.body.innerHTML.replace('inc/stiddari/img/V5K.jpg', 'http://www.themob.pt/img/V5K.gif');
}

// Segurança
if (location.pathname.search('deff.php') != -1) {
document.body.innerHTML = document.body.innerHTML.replace(/\b(Schwarzgeldarbeiter)\b/g, 'Trabalhador Clandestino');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Objektwache)\b/g, 'Sentinela');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Bodyguard)\b/g, 'Guarda-costas');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Guarde)\b/g, 'Guarda');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Polizist)\b/g, 'Polícia');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Verteidigung)\b/g, 'Defesa');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Bauschleife)\b/g, 'Lista de Espera');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Keine Einheiten)\b/g, 'Sem ordens de momento');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Dauer)\b/g, 'Duração');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Los)\b/g, 'Ir');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Tag)\b/g, 'Dia');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Tage)\b/g, 'Dias');

document.body.innerHTML = document.body.innerHTML.replace('inc/stiddari/img/U17K.jpg', 'http://www.themob.pt/img/U17K.gif');
document.body.innerHTML = document.body.innerHTML.replace('inc/stiddari/img/U10K.jpg', 'http://www.themob.pt/img/U10K.gif');
document.body.innerHTML = document.body.innerHTML.replace('inc/stiddari/img/U11K.jpg', 'http://www.themob.pt/img/U11K.gif');
document.body.innerHTML = document.body.innerHTML.replace('inc/stiddari/img/U12K.jpg', 'http://www.themob.pt/img/U12K.gif');
document.body.innerHTML = document.body.innerHTML.replace('inc/stiddari/img/U13K.jpg', 'http://www.themob.pt/img/U13K.gif');
document.body.innerHTML = document.body.innerHTML.replace('inc/stiddari/img/U14K.jpg', 'http://www.themob.pt/img/U14K.gif');
document.body.innerHTML = document.body.innerHTML.replace('inc/stiddari/img/U15K.jpg', 'http://www.themob.pt/img/U15K.gif');
document.body.innerHTML = document.body.innerHTML.replace('inc/stiddari/img/U16K.jpg', 'http://www.themob.pt/img/U16K.gif');
document.body.innerHTML = document.body.innerHTML.replace('inc/stiddari/img/U1G.jpg', 'http://www.themob.pt/img/U1K.gif');
document.body.innerHTML = document.body.innerHTML.replace('inc/stiddari/img/U2K.jpg', 'http://www.themob.pt/img/U2K.gif');
document.body.innerHTML = document.body.innerHTML.replace('inc/stiddari/img/U3K.jpg', 'http://www.themob.pt/img/U3K.gif');
document.body.innerHTML = document.body.innerHTML.replace('inc/stiddari/img/U4K.jpg', 'http://www.themob.pt/img/U4K.gif');
document.body.innerHTML = document.body.innerHTML.replace('inc/stiddari/img/U5K.jpg', 'http://www.themob.pt/img/U5K.gif');
document.body.innerHTML = document.body.innerHTML.replace('inc/stiddari/img/U6K.jpg', 'http://www.themob.pt/img/U6K.gif');
document.body.innerHTML = document.body.innerHTML.replace('inc/stiddari/img/U7K.jpg', 'http://www.themob.pt/img/U7K.gif');
document.body.innerHTML = document.body.innerHTML.replace('inc/stiddari/img/U8K.jpg', 'http://www.themob.pt/img/U8K.gif');
document.body.innerHTML = document.body.innerHTML.replace('inc/stiddari/img/U9K.jpg', 'http://www.themob.pt/img/U9K.gif');
document.body.innerHTML = document.body.innerHTML.replace('inc/stiddari/img/V1K.jpg', 'http://www.themob.pt/img/V1K.gif');
document.body.innerHTML = document.body.innerHTML.replace('inc/stiddari/img/V2K.jpg', 'http://www.themob.pt/img/V2K.gif');
document.body.innerHTML = document.body.innerHTML.replace('inc/stiddari/img/V3K.jpg', 'http://www.themob.pt/img/V3K.gif');
document.body.innerHTML = document.body.innerHTML.replace('inc/stiddari/img/V4K.jpg', 'http://www.themob.pt/img/V4K.gif');
document.body.innerHTML = document.body.innerHTML.replace('inc/stiddari/img/V5K.jpg', 'http://www.themob.pt/img/V5K.gif');
}

// Trainings
if (location.pathname.search('forsch.php') != -1) {
document.body.innerHTML = document.body.innerHTML.replace(/\b(Ehre)\b/g, 'Honra');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Chemische Pesquisa)\b/g, 'Treino Químico');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Psychisches Training)\b/g, 'Treino Psicológico');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Guerillaausbildung)\b/g, 'Guerrilha');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Bombenbau)\b/g, 'Explosivos');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Schusstraining)\b/g, 'Treino de Armas de Fogo');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Kurzwaffenkampf)\b/g, 'Treino de Armas de Curta Distância');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Nahkampf)\b/g, 'Combate Corpo a Corpo');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Gruppenschutz)\b/g, 'Protecção de Gangue');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Objektbewachung)\b/g, 'Patrulha de Segurança');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Informationsbeschaffung)\b/g, 'Espionagem');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Schmuggel)\b/g, 'Contrabando');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Basisverwaltung)\b/g, 'Base Administrativa');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Schutzgeldeintreibung)\b/g, 'Extorsão');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Auftragsplanung)\b/g, 'Estratégia');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Routenplanung)\b/g, 'Plano de Rotas');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Ausbau)\b/g, 'Expansão');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Stufe)\b/g, 'Nível');
document.body.innerHTML = document.body.innerHTML.replace(/\b(abbrechen)\b/g, 'cancelar');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Dauer)\b/g, 'Duração');
document.body.innerHTML = document.body.innerHTML.replace(/Ausbildungsraum/g, 'Pesquisa');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Tag)\b/g, 'Dia');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Tage)\b/g, 'Dias');
}

// Technologies
if (location.pathname.search('techtree.php') != -1) {
document.body.innerHTML = document.body.innerHTML.replace(/\b(Verteidigung)\b/g, 'Defesa');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Produktion)\b/g, 'Produção');
document.body.innerHTML = document.body.innerHTML.replace(/Chefbüro/g, 'Escritório do Chefe');
document.body.innerHTML = document.body.innerHTML.replace(/Ausbildungsraum/g, 'Pesquisa');
document.body.innerHTML = document.body.innerHTML.replace(/Waffenkammer/g, 'Fábrica de Armas');
document.body.innerHTML = document.body.innerHTML.replace(/Munitionskammer/g, 'Fábrica de Munições');
document.body.innerHTML = document.body.innerHTML.replace(/Brauerei/g, 'Destilaria');
document.body.innerHTML = document.body.innerHTML.replace(/Kneipe/g, 'Bar');
document.body.innerHTML = document.body.innerHTML.replace(/Schmuggel/g, 'Contrabando');
document.body.innerHTML = document.body.innerHTML.replace(/Waffenlager/g, 'Armazém de Armas');
document.body.innerHTML = document.body.innerHTML.replace(/Munitionsdepot/g, 'Armazém de Munições');
document.body.innerHTML = document.body.innerHTML.replace(/Alkohollager/g, 'Armazém de Álcool');
document.body.innerHTML = document.body.innerHTML.replace(/Tresorraum/g, 'Cofre');
document.body.innerHTML = document.body.innerHTML.replace(/Trainingslager/g, 'Campo de Treino');
document.body.innerHTML = document.body.innerHTML.replace(/Selbstschussanlagen/g, 'Torre de Defesa');
document.body.innerHTML = document.body.innerHTML.replace(/Versteckte Minen/g, 'Minas');
document.body.innerHTML = document.body.innerHTML.replace(/Ehre/g, 'Honra');
document.body.innerHTML = document.body.innerHTML.replace(/Chemische Pesquisa/g, 'Treino Químico');
document.body.innerHTML = document.body.innerHTML.replace(/Psychisches Training/g, 'Treino Psicológico');
document.body.innerHTML = document.body.innerHTML.replace(/Guerillaausbildung/g, 'Guerrilha');
document.body.innerHTML = document.body.innerHTML.replace(/Bombenbau/g, 'Explosivos');
document.body.innerHTML = document.body.innerHTML.replace(/Schusstraining/g, 'Treino de Armas de Fogo');
document.body.innerHTML = document.body.innerHTML.replace(/Kurzwaffenkampf/g, 'Treino de Armas de Curta Distância');
document.body.innerHTML = document.body.innerHTML.replace(/Nahkampf/g, 'Combate Corpo a Corpo');
document.body.innerHTML = document.body.innerHTML.replace(/Gruppenschutz/g, 'Protecção de Gangue');
document.body.innerHTML = document.body.innerHTML.replace(/Objektbewachung/g, 'Patrulha de Segurança');
document.body.innerHTML = document.body.innerHTML.replace(/Informationsbeschaffung/g, 'Espionagem');
document.body.innerHTML = document.body.innerHTML.replace(/Schmuggel/g, 'Contrabando');
document.body.innerHTML = document.body.innerHTML.replace(/Basisverwaltung/g, 'Base Administrativa');
document.body.innerHTML = document.body.innerHTML.replace(/Schutzgeldeintreibung/g, 'Extorsão');
document.body.innerHTML = document.body.innerHTML.replace(/Auftragsplanung/g, 'Estratégia');
document.body.innerHTML = document.body.innerHTML.replace(/Routenplanung/g, 'Plano de Rotas');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Raum)\b/g, 'Habitações');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Stufe)\b/g, 'Nível');   
}

// Edifícios
if (location.pathname.search('camps.php') != -1) {
document.body.innerHTML = document.body.innerHTML.replace(/\b(Gebäude)\b/g, 'Edifícios');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Raum)\b/g, 'Habitações');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Punkte)\b/g, 'Pontos');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Restdauer)\b/g, 'Tempo restante');
document.body.innerHTML = document.body.innerHTML.replace(/\b(auflösen)\b/g, 'Apagar');
document.body.innerHTML = document.body.innerHTML.replace(/Änderungen/g, 'Guardar'); 
document.body.innerHTML = document.body.innerHTML.replace(/\b(speichern)\b/g, 'alterações');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Name)\b/g, 'Nome');
document.body.innerHTML = document.body.innerHTML.replace(/Chefbüro/g, 'Escritório do Chefe');
document.body.innerHTML = document.body.innerHTML.replace(/Ausbildungsraum/g, 'Pesquisa');
document.body.innerHTML = document.body.innerHTML.replace(/Waffenkammer/g, 'Fábrica de Armas');
document.body.innerHTML = document.body.innerHTML.replace(/Munitionskammer/g, 'Fábrica de Munições');
document.body.innerHTML = document.body.innerHTML.replace(/Brauerei/g, 'Destilaria');
document.body.innerHTML = document.body.innerHTML.replace(/Kneipe/g, 'Bar');
document.body.innerHTML = document.body.innerHTML.replace(/Schmuggel/g, 'Contrabando');
document.body.innerHTML = document.body.innerHTML.replace(/Waffenlager/g, 'Armazém de Armas');
document.body.innerHTML = document.body.innerHTML.replace(/Munitionsdepot/g, 'Armazém de Munições');
document.body.innerHTML = document.body.innerHTML.replace(/Alkohollager/g, 'Armazém de Álcool');
document.body.innerHTML = document.body.innerHTML.replace(/Tresorraum/g, 'Cofre');
document.body.innerHTML = document.body.innerHTML.replace(/Trainingslager/g, 'Campo de Treino');
document.body.innerHTML = document.body.innerHTML.replace(/Selbstschussanlagen/g, 'Torre de Defesa');
document.body.innerHTML = document.body.innerHTML.replace(/Versteckte Minen/g, 'Minas');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Tag)\b/g, 'Dia');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Tage)\b/g, 'Dias');
}

// Search
if (location.pathname.search('suche.php') != -1) {
document.body.innerHTML = document.body.innerHTML.replace(/\b(Suche)\b/g, 'Procurar');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Gebäude)\b/g, 'Edifício');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Spieler)\b/g, 'Jogador');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Allianz)\b/g, 'Família');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Punkte)\b/g, 'Pontos');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Suchen)\b/g, 'Procurar');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Name)\b/g, 'Nome');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Text)\b/g, 'Texto');
document.body.innerHTML = document.body.innerHTML.replace(/\b(kein Treffer)\b/g, 'Nenhuma correspondência encontrada!');
}

// Unitinfo
if (location.pathname.search('info.php') != -1) {
document.body.innerHTML = document.body.innerHTML.replace(/\b(Einheiten)\b/g, 'Unidade');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Name)\b/g, 'Nome');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Angriffswert)\b/g, 'Pontuação de Ataque');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Verteidigungswert)\b/g, 'Valor de Defesa');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Basis)\b/g, 'Base');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Aktuell)\b/g, 'Actual');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Beschreibung)\b/g, 'Descrição');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Punkte)\b/g, 'Pontos');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Voraussetzung)\b/g, 'Pré-requisitos');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Angriffsbonus)\b/g, 'Bonus de Ataque');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Verteidigungsbonus)\b/g, 'Bonus de Defesa');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Verbrauch)\b/g, 'Salário');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Geschwindigkeit)\b/g, 'Velocidade');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Ladekapazität)\b/g, 'Capacidade de Carga');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Stufe)\b/g, 'Nível');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Ehre)\b/g, 'Honra');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Chemische Pesquisa)\b/g, 'Treino Químico');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Psychisches Training)\b/g, 'Treino Psicológico');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Guerillaausbildung)\b/g, 'Guerrilha');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Bombenbau)\b/g, 'Explosivos');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Schusstraining)\b/g, 'Treino de Armas de Fogo');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Kurzwaffenkampf)\b/g, 'Treino de Armas de Curta Distância');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Nahkampf)\b/g, 'Combate Corpo a Corpo');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Gruppenschutz)\b/g, 'Protecção de Gangue');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Objektbewachung)\b/g, 'Patrulha de Segurança');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Informationsbeschaffung)\b/g, 'Espionagem');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Schmuggel)\b/g, 'Contrabando');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Basisverwaltung)\b/g, 'Base Administrativa');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Schutzgeldeintreibung)\b/g, 'Extorsão');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Auftragsplanung)\b/g, 'Estratégia');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Routenplanung)\b/g, 'Plano de Rotas');

document.body.innerHTML = document.body.innerHTML.replace('inc/stiddari/img/U1G.jpg', 'http://www.themob.pt/img/U1K.gif');
document.body.innerHTML = document.body.innerHTML.replace('inc/stiddari/img/U17G.jpg', 'http://www.themob.pt/img/U17K.gif');
document.body.innerHTML = document.body.innerHTML.replace('inc/stiddari/img/U14G.jpg', 'http://www.themob.pt/img/U14K.gif');
document.body.innerHTML = document.body.innerHTML.replace('inc/stiddari/img/U16G.jpg', 'http://www.themob.pt/img/U16K.gif');
document.body.innerHTML = document.body.innerHTML.replace('inc/stiddari/img/U2G.jpg', 'http://www.themob.pt/img/U2K.gif');
document.body.innerHTML = document.body.innerHTML.replace('inc/stiddari/img/U3G.jpg', 'http://www.themob.pt/img/U3K.gif');
document.body.innerHTML = document.body.innerHTML.replace('inc/stiddari/img/U4G.jpg', 'http://www.themob.pt/img/U4K.gif');
document.body.innerHTML = document.body.innerHTML.replace('inc/stiddari/img/U5G.jpg', 'http://www.themob.pt/img/U5K.gif');
document.body.innerHTML = document.body.innerHTML.replace('inc/stiddari/img/U6G.jpg', 'http://www.themob.pt/img/U6K.gif');
document.body.innerHTML = document.body.innerHTML.replace('inc/stiddari/img/U7G.jpg', 'http://www.themob.pt/img/U7K.gif');
document.body.innerHTML = document.body.innerHTML.replace('inc/stiddari/img/U8G.jpg', 'http://www.themob.pt/img/U8K.gif');
document.body.innerHTML = document.body.innerHTML.replace('inc/stiddari/img/U9G.jpg', 'http://www.themob.pt/img/U9K.gif');
document.body.innerHTML = document.body.innerHTML.replace('inc/stiddari/img/U10G.jpg', 'http://www.themob.pt/img/U10K.gif');
document.body.innerHTML = document.body.innerHTML.replace('inc/stiddari/img/U11G.jpg', 'http://www.themob.pt/img/U11K.gif');
document.body.innerHTML = document.body.innerHTML.replace('inc/stiddari/img/U12G.jpg', 'http://www.themob.pt/img/U12K.gif');
document.body.innerHTML = document.body.innerHTML.replace('inc/stiddari/img/U13G.jpg', 'http://www.themob.pt/img/U13K.gif');
document.body.innerHTML = document.body.innerHTML.replace('inc/stiddari/img/U15G.jpg', 'http://www.themob.pt/img/U15K.gif');
document.body.innerHTML = document.body.innerHTML.replace('inc/stiddari/img/V1G.jpg', 'http://www.themob.pt/img/V1K.gif');
document.body.innerHTML = document.body.innerHTML.replace('inc/stiddari/img/V2G.jpg', 'http://www.themob.pt/img/V2K.gif');
document.body.innerHTML = document.body.innerHTML.replace('inc/stiddari/img/V3G.jpg', 'http://www.themob.pt/img/V3K.gif');
document.body.innerHTML = document.body.innerHTML.replace('inc/stiddari/img/V4G.jpg', 'http://www.themob.pt/img/V4K.gif');
document.body.innerHTML = document.body.innerHTML.replace('inc/stiddari/img/V5G.jpg', 'http://www.themob.pt/img/V5K.gif');
}

// Map
if (location.pathname.search('map.php') != -1) {
document.body.innerHTML = document.body.innerHTML.replace(/\b(Stadt)\b/g, 'Cidade');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Stadtteil)\b/g, 'Bairro');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Infos)\b/g, 'Informações');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Gebäude)\b/g, 'Edifícios');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Spieler)\b/g, 'Jogador');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Punkte)\b/g, 'Pontos');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Allianz)\b/g, 'Família');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Aktualisieren)\b/g, 'Actualizar');
}

// Statistiche
if (location.pathname.search('stats.php') != -1) {
document.body.innerHTML = document.body.innerHTML.replace(/\b(in einem Camp)\b/g, 'num Edifício');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Höchste)\b/g, 'Maior');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Raum)\b/g, 'Habitações');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Ausbildung)\b/g, 'Pesquisas');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Die meisten Einheiten)\b/g, 'Maior quantidade de Unidades');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Anzahl)\b/g, 'Número');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Ehre)\b/g, 'Honra');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Chemische Pesquisa)\b/g, 'Treino Químico');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Psychisches Training)\b/g, 'Treino Psicológico');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Guerillaausbildung)\b/g, 'Guerrilha');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Bombenbau)\b/g, 'Explosivos');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Schusstraining)\b/g, 'Treino de Armas de Fogo');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Kurzwaffenkampf)\b/g, 'Treino de Armas de Curta Distância');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Nahkampf)\b/g, 'Combate Corpo a Corpo');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Gruppenschutz)\b/g, 'Protecção de Gangue');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Objektbewachung)\b/g, 'Patrulha de Segurança');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Informationsbeschaffung)\b/g, 'Espionagem');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Schmuggel)\b/g, 'Contrabando');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Basisverwaltung)\b/g, 'Base Administrativa');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Schutzgeldeintreibung)\b/g, 'Extorsão');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Auftragsplanung)\b/g, 'Estratégia');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Routenplanung)\b/g, 'Plano de Rotas');
}

// Target List - Lista farm
if (location.pathname.search('targetlist.php') != -1) {
document.body.innerHTML = document.body.innerHTML.replace(/\b(Los)\b/g, 'Ir');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Gebäude)\b/g, 'Edifício');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Zielname)\b/g, 'Nome do Alvo');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Spieler)\b/g, 'Jogador');
document.body.innerHTML = document.body.innerHTML.replace(/\b(löschen)\b/g, 'Apagar');
}

// Bounty
if (location.pathname.search('bounty*') != -1) {
document.body.innerHTML = document.body.innerHTML.replace(/\b(Caçadores de Prémios vergeben)\b/g, 'Oferecer Recompensa');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Top 50 Kopfgelder)\b/g, 'Recompensas - Top 50');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Rohstoff)\b/g, 'Recursos');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Pott)\b/g, 'Prémio');
document.body.innerHTML = document.body.innerHTML.replace(/\b(auszahlen)\b/g, 'Pagamento');
document.body.innerHTML = document.body.innerHTML.replace(/\b(erarbeitetes Caçadores de Prémios)\b/g, 'Recompensa ganha');
document.body.innerHTML = document.body.innerHTML.replace(/\b(zahl mich aus)\b/g, 'Cobrar a minha recompensa');
document.body.innerHTML = document.body.innerHTML.replace(/suchen/g, 'Procurar');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Caçadores de Prémios für)\b/g, 'Recompensa oferecida por');
document.body.innerHTML = document.body.innerHTML.replace(/\b(aktuell)\b/g, 'actual');
document.body.innerHTML = document.body.innerHTML.replace(/\b(hinzugeben)\b/g, 'adicionar');
document.body.innerHTML = document.body.innerHTML.replace(/\b(maximal)\b/g, 'máximo');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Einheitenpunkte)\b/g, 'Pontos de Unidades');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Caçadores de Prémios aussetzen)\b/g, 'Adicionar Recompensa');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Topf ausbezahlen)\b/g, 'Cobrar Recompensa');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Name)\b/g, 'Nome');
}

// Família
if (location.pathname.search('ally.php') != -1) {
document.body.innerHTML = document.body.innerHTML.replace(/\b(Name)\b/g, 'Nome');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Diplomatie)\b/g, 'Diplomacia');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Mitglied)\b/g, 'Membro');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Mitglieder)\b/g, 'Membros');
document.body.innerHTML = document.body.innerHTML.replace(/\b(senden)\b/g, 'Enviar');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Nachricht schreiben)\b/g, 'Nova Mensagem');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Allianz verlassen)\b/g, 'Abandonar a Família');
document.body.innerHTML = document.body.innerHTML.replace(/\b(wirklich verlassen)\b/g, ': abandonar definitivamente');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Allianz)\b/g, 'Família');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Allianzbeschreibung)\b/g, 'Descrição da Família');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Keine Beschreibung)\b/g, 'Nenhuma descrição');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Es liegen keine Bewerbungen vor)\b/g, 'Não existem novas aplicações');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Allianzeinstellungen)\b/g, 'Configurações da Família');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Membros verwalten)\b/g, 'Gerir Membros');
document.body.innerHTML = document.body.innerHTML.replace(/\b(von)\b/g, 'de');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Nachricht)\b/g, 'Mensagem');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Família auflösen)\b/g, 'Dissolver Família');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Keine Homepage)\b/g, 'Nenhuma Homepage');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Família wirklich dissolution)\b/g, 'Tens a certeza que queres dissolver a Família');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Família gründen)\b/g, 'Fundar nova Família');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Família suchen)\b/g, 'Procurar Família existente');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Bewerbung)\b/g, 'Aplicação');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Bewerbungstext)\b/g, 'Texto da Aplicação');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Aplicação zurück ziehen)\b/g, 'Cancelar Aplicação');
document.body.innerHTML = document.body.innerHTML.replace(/\b(zurück gezogen)\b/g, 'cancelado');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Es liegen Bewerbungen vor)\b/g, 'Novas aplicações');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Spieler)\b/g, 'Jogador');
document.body.innerHTML = document.body.innerHTML.replace(/\b(annehmen)\b/g, 'Aceitar');
document.body.innerHTML = document.body.innerHTML.replace(/\b(ablehnen)\b/g, 'Recusar');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Bündnis)\b/g, 'Aliança');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Schutzbündnis)\b/g, 'Aliança Defensiva');
document.body.innerHTML = document.body.innerHTML.replace(/Nicht/g, 'Pacto de ');
document.body.innerHTML = document.body.innerHTML.replace(/angriffs/g, 'Não-');
document.body.innerHTML = document.body.innerHTML.replace(/packt/g, 'Agressão');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Geheimbund)\b/g, 'Sociedade Secreta');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Krieg)\b/g, 'Guerra');
document.body.innerHTML = document.body.innerHTML.replace(/\b(wirklich auflösen)\b/g, '- confirmar dissolução');
}

// Família Foundation
if (location.pathname.search('ally_new.php') != -1) {
document.body.innerHTML = document.body.innerHTML.replace(/\b(Allianz gründen)\b/g, 'Fundação de Família');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Allianz-Tag)\b/g, 'Tag da Família');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Allianz-Name)\b/g, 'Nome da Família');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Zeichen)\b/g, 'caracteres');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Gründen)\b/g, 'Criar');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Die Allianz wurde erfolgreich gegründet)\b/g, 'A tua Família foi criada com sucesso');
}

// Família Members
if (location.pathname.search('ally_member.php') != -1) {
document.body.innerHTML = document.body.innerHTML.replace(/\b(Mitglieder)\b/g, 'Membros');
document.body.innerHTML = document.body.innerHTML.replace(/\b(rauswerfen)\b/g, 'Expulsar');
}

// Família settings
if (location.pathname.search('ally_config.php') != -1) {
document.body.innerHTML = document.body.innerHTML.replace(/\b(Allianzeinstellungen)\b/g, 'Configurações da Família');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Allianzbild)\b/g, 'Logo da Família');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Allianzbeschreibung)\b/g, 'Descrição da Família');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Aktualisieren)\b/g, 'Actualizar');
}

// Família Diplomacy
if (location.pathname.search('ally_diplo.php') != -1) {
document.body.innerHTML = document.body.innerHTML.replace(/\b(Allianz)\b/g, 'Família');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Diplomatie)\b/g, 'Diplomacia');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Bestätigung)\b/g, 'Confirmação');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Bündnis)\b/g, 'Aliança');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Schutzbündnis)\b/g, 'Aliança Defensiva');
document.body.innerHTML = document.body.innerHTML.replace(/Nicht/g, 'Pacto de ');
document.body.innerHTML = document.body.innerHTML.replace(/angriffs/g, 'Não-');
document.body.innerHTML = document.body.innerHTML.replace(/packt/g, 'Agressão');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Geheimbund)\b/g, 'Sociedade Secreta');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Krieg)\b/g, 'Guerra');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Begründung)\b/g, 'Razão');
document.body.innerHTML = document.body.innerHTML.replace(/\b(senden)\b/g, 'Enviar');
document.body.innerHTML = document.body.innerHTML.replace(/\b(unbestätigt)\b/g, 'não confirmado');
document.body.innerHTML = document.body.innerHTML.replace(/\b(bestätigt)\b/g, 'confirmado');
document.body.innerHTML = document.body.innerHTML.replace(/\b(kündigen)\b/g, 'cancelar');
document.body.innerHTML = document.body.innerHTML.replace(/\b(kapitulieren)\b/g, 'rendição')
}

// Família View
if (location.pathname.search('ally_view.php') != -1) {
document.body.innerHTML = document.body.innerHTML.replace(/\b(Name)\b/g, 'Nome');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Allianz)\b/g, 'Família');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Diplomatie)\b/g, 'Diplomacia');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Bestätigung)\b/g, 'Confirmação');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Bündnis)\b/g, 'Aliança');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Schutzbündnis)\b/g, 'Aliança Defensiva');
document.body.innerHTML = document.body.innerHTML.replace(/Nicht/g, 'Pacto de ');
document.body.innerHTML = document.body.innerHTML.replace(/angriffs/g, 'Não-');
document.body.innerHTML = document.body.innerHTML.replace(/packt/g, 'Agressão');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Geheimbund)\b/g, 'Sociedade Secreta');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Krieg)\b/g, 'Guerra');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Begründung)\b/g, 'Razão');
document.body.innerHTML = document.body.innerHTML.replace(/\b(senden)\b/g, 'Enviar');
document.body.innerHTML = document.body.innerHTML.replace(/\b(unbestätigt)\b/g, 'não confirmado');
document.body.innerHTML = document.body.innerHTML.replace(/\b(bestätigt)\b/g, 'confirmado');
document.body.innerHTML = document.body.innerHTML.replace(/\b(kündigen)\b/g, 'cancelar');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Mitglieder)\b/g, 'Membros');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Allianzbeschreibung)\b/g, 'Descrição da Família');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Keine Homepage)\b/g, 'Nenhuma Homepage');
document.body.innerHTML = document.body.innerHTML.replace(/\b(bewerben)\b/g, 'Aplicar');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Mitglied)\b/g, 'Membro');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Keine Beschreibung)\b/g, 'Nenhuma descrição');
}

// Logout
if (location.pathname.search('logout.php') != -1) {
document.body.innerHTML = document.body.innerHTML.replace(/Zur Startseite wechseln/g, 'Ir para a página inicial');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Sie sind jetzt erfolgreich augeloggt)\b/g, 'Foste desconectado com sucesso');
}

// Ally join
if (location.pathname.search('ally_join.php') != -1) {
document.body.innerHTML = document.body.innerHTML.replace(/\b(Bewerbung)\b/g, 'Aplicação');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Bewerbungstext)\b/g, 'Texto da Aplicação');
document.body.innerHTML = document.body.innerHTML.replace(/\b(bewerben)\b/g, 'Aplicar');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Du hast dich Erfolgreich bei der Allianz beworben)\b/g, 'A tua aplicação foi enviada com sucesso');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Jetzt müssen sie nur noch zustimmen)\b/g, 'Agora só tens que esperar que seja aceite');
}

// Recursos
if (location.pathname.search('res.php') != -1) {
document.body.innerHTML = document.body.innerHTML.replace(/\b(Grundeinkommen)\b/g, 'Salário Base');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Lagerkapazität)\b/g, 'Capacidade de Armazenamento');
document.body.innerHTML = document.body.innerHTML.replace(/\b(davon sicher untergebracht)\b/g, 'Armazenados de forma segura');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Waffenkammer)\b/g, 'Fábrica de Armas');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Munitionskammer)\b/g, 'Fábrica de Munições');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Brauerei)\b/g, 'Destilaria');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Kneipe)\b/g, 'Bar');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Schmuggel)\b/g, 'Contrabando');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Stunde)\b/g, 'Hora');
}

// Missões
if (location.pathname.search('unit.php') != -1) {
document.body.innerHTML = document.body.innerHTML.replace(/\b(Geschwindigkeit)\b/g, 'Velocidade');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Neuen Einsatz planen)\b/g, 'Planear nova missão');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Zielcamp)\b/g, 'Edifício Alvo');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Auftrag)\b/g, 'Missão');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Angreifen)\b/g, 'Ataque');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Einheiten stationieren)\b/g, 'Estação');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Recursos Transportieren)\b/g, 'Transporte');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Edifícios besetzen)\b/g, 'Ocupação');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Nur bei Transport und Stationieren)\b/g, 'Somente para Transporte e Estação');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Aktualisieren)\b/g, 'Actualizar');
document.body.innerHTML = document.body.innerHTML.replace(/\b(senden)\b/g, 'Enviar');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Entfernung)\b/g, 'Distância');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Einsatzkosten)\b/g, 'Salário');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Ladekapazität)\b/g, 'Capacidade de carga');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Einsatzzeit)\b/g, 'Duração da Missão');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Ankunft)\b/g, 'Chegada');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Einsatzdaten)\b/g, 'Resumo da Missão');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Keine Einheiten)\b/g, 'Nenhuma Unidade');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Einheiten)\b/g, 'Unidades');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Anzahl)\b/g, 'Número');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Gebäude)\b/g, 'Edifício');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Angriffswert)\b/g, 'Pontuação de Ataque');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Verteidigungswert)\b/g, 'Valor de Defesa');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Spieler)\b/g, 'Jogador');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Deine Unidades machen sich auf den Weg)\b/g, 'As tuas unidades estão a caminho');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Der Zielspieler befindet sich zur Zeit im Urlaub)\b/g, 'O teu Alvo encontra-se de Férias');
}

// Mensagens
if (location.pathname.search('msg.php') != -1) {
document.body.innerHTML = document.body.innerHTML.replace(/\b(Bauabschluss)\b/g, 'Construções concluídas');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Spielernachrichten)\b/g, 'Mensagens de Jogadores');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Kampfberichte)\b/g, 'Relatórios de Batalha');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Nachricht schreiben)\b/g, 'Escrever Mensagem');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Einsatzberichte)\b/g, 'Relatórios de Usuário');
}

// Mensagens box
if (location.pathname.search('msg_read.php') != -1) {
document.body.innerHTML = document.body.innerHTML.replace(/Chefbüro/g, 'Escritório do Chefe');
document.body.innerHTML = document.body.innerHTML.replace(/Ausbildungsraum/g, 'Pesquisa');
document.body.innerHTML = document.body.innerHTML.replace(/Waffenkammer/g, 'Fábrica de Armas');
document.body.innerHTML = document.body.innerHTML.replace(/Munitionskammer/g, 'Fábrica de Munições');
document.body.innerHTML = document.body.innerHTML.replace(/Brauerei/g, 'Destilaria');
document.body.innerHTML = document.body.innerHTML.replace(/Kneipe/g, 'Bar');
document.body.innerHTML = document.body.innerHTML.replace(/Schmuggel/g, 'Contrabando');
document.body.innerHTML = document.body.innerHTML.replace(/Waffenlager/g, 'Armazém de Armas');
document.body.innerHTML = document.body.innerHTML.replace(/Munitionsdepot/g, 'Armazém de Munições');
document.body.innerHTML = document.body.innerHTML.replace(/Alkohollager/g, 'Armazém de Álcool');
document.body.innerHTML = document.body.innerHTML.replace(/Tresorraum/g, 'Cofre');
document.body.innerHTML = document.body.innerHTML.replace(/Trainingslager/g, 'Campo de Treino');
document.body.innerHTML = document.body.innerHTML.replace(/Selbstschussanlagen/g, 'Torre de Defesa');
document.body.innerHTML = document.body.innerHTML.replace(/Versteckte Minen/g, 'Minas');
document.body.innerHTML = document.body.innerHTML.replace(/Ehre/g, 'Honra');
document.body.innerHTML = document.body.innerHTML.replace(/Chemische Pesquisa/g, 'Treino Químico');
document.body.innerHTML = document.body.innerHTML.replace(/Psychisches Training/g, 'Treino Psicológico');
document.body.innerHTML = document.body.innerHTML.replace(/Guerillaausbildung/g, 'Guerrilha');
document.body.innerHTML = document.body.innerHTML.replace(/Bombenbau/g, 'Explosivos');
document.body.innerHTML = document.body.innerHTML.replace(/Schusstraining/g, 'Treino de Armas de Fogo');
document.body.innerHTML = document.body.innerHTML.replace(/Kurzwaffenkampf/g, 'Treino de Armas de Curta Distância');
document.body.innerHTML = document.body.innerHTML.replace(/Nahkampf/g, 'Combate Corpo a Corpo');
document.body.innerHTML = document.body.innerHTML.replace(/Gruppenschutz/g, 'Protecção de Gangue');
document.body.innerHTML = document.body.innerHTML.replace(/Objektbewachung/g, 'Patrulha de Segurança');
document.body.innerHTML = document.body.innerHTML.replace(/Informationsbeschaffung/g, 'Espionagem');
document.body.innerHTML = document.body.innerHTML.replace(/Schmuggel/g, 'Contrabando');
document.body.innerHTML = document.body.innerHTML.replace(/Basisverwaltung/g, 'Base Administrativa');
document.body.innerHTML = document.body.innerHTML.replace(/Schutzgeldeintreibung/g, 'Extorsão');
document.body.innerHTML = document.body.innerHTML.replace(/Auftragsplanung/g, 'Estratégia');
document.body.innerHTML = document.body.innerHTML.replace(/Routenplanung/g, 'Plano de Rotas');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Chefbüro)\b/g, 'Escritório do Chefe');
document.body.innerHTML = document.body.innerHTML.replace(/Ausbildungsraum/g, 'Pesquisa');
document.body.innerHTML = document.body.innerHTML.replace(/Waffenkammer/g, 'Fábrica de Armas');
document.body.innerHTML = document.body.innerHTML.replace(/Munitionskammer/g, 'Fábrica de Munições');
document.body.innerHTML = document.body.innerHTML.replace(/Brauerei/g, 'Destilaria');
document.body.innerHTML = document.body.innerHTML.replace(/Kneipe/g, 'Bar');
document.body.innerHTML = document.body.innerHTML.replace(/Schmuggel/g, 'Contrabando');
document.body.innerHTML = document.body.innerHTML.replace(/Waffenlager/g, 'Armazém de Armas');
document.body.innerHTML = document.body.innerHTML.replace(/Munitionsdepot/g, 'Armazém de Munições');
document.body.innerHTML = document.body.innerHTML.replace(/Alkohollager/g, 'Armazém de Álcool');
document.body.innerHTML = document.body.innerHTML.replace(/Tresorraum/g, 'Cofre');
document.body.innerHTML = document.body.innerHTML.replace(/Trainingslager/g, 'Campo de Treino');
document.body.innerHTML = document.body.innerHTML.replace(/Selbstschussanlagen/g, 'Torre de Defesa');
document.body.innerHTML = document.body.innerHTML.replace(/Versteckte Minen/g, 'Minas');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Ausbau in)\b/g, 'no edifício');
document.body.innerHTML = document.body.innerHTML.replace(/\b(erfolgreich)\b/g, 'construído'); 
document.body.innerHTML = document.body.innerHTML.replace(/\b(abgeschlossen)\b/g, 'com sucesso');  
document.body.innerHTML = document.body.innerHTML.replace(/\b(construído ausgebildet)\b/g, 'treinadas');
document.body.innerHTML = document.body.innerHTML.replace(/\b(in)\b/g, 'no Edifício');
document.body.innerHTML = document.body.innerHTML.replace(/\b(mal)\b/g, 'unidades de');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Betreff)\b/g, 'Assunto');
document.body.innerHTML = document.body.innerHTML.replace(/\b(von)\b/g, 'De');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Datum)\b/g, 'Data');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Markierte)\b/g, 'Apagar');
document.body.innerHTML = document.body.innerHTML.replace(/\b(löschen)\b/g, 'Seleccionadas');
document.body.innerHTML = document.body.innerHTML.replace(/\b(kein)\b/g, 'Sem');
document.body.innerHTML = document.body.innerHTML.replace(/\b(construído erforscht)\b/g, '- pesquisa concluída com sucesso');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Kampfbericht)\b/g, 'Relatório de Batalha');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Kampfrunde)\b/g, 'Ronda de Batalha');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Einheiten)\b/g, 'Tropas');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Anzahl)\b/g, 'Quantidade');
document.body.innerHTML = document.body.innerHTML.replace(/\b(vernichtet)\b/g, 'Destruído');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Angriffswert)\b/g, 'Pontuação de Ataque');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Verteidigungswert)\b/g, 'Valor de Defesa');
document.body.innerHTML = document.body.innerHTML.replace(/\b(erbeutete Recursos)\b/g, 'Recursos Roubados');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Siegchance)\b/g, 'Chance de Vencer');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Espiãoagechance)\b/g, 'Probabilidade de Espionagem');
document.body.innerHTML = document.body.innerHTML.replace(/\b(im Forum speichern)\b/g, '(salvar no fórum)');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Neu)\b/g, 'Nova');
document.body.innerHTML = document.body.innerHTML.replace(/\b(AW)\b/g, 'Citar');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Details)\b/g, 'Detalhes');
}

// Mensagens Writing
if (location.pathname.search('msg_write.php') != -1) {
document.body.innerHTML = document.body.innerHTML.replace(/\b(Ursprüngliche Nachricht)\b/g, 'Mensagem Original');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Von)\b/g, 'De');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Gesendet)\b/g, 'Recebida em');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Los)\b/g, 'Enviar');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Datum)\b/g, 'Data');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Betreff)\b/g, 'Assunto');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Empfänger)\b/g, 'Para');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Nachricht)\b/g, 'Mensagem');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Mensagem schreiben)\b/g, 'Editor de Mensagens');
document.body.innerHTML = document.body.innerHTML.replace(/\b(erfolgreich)\b/g, 'enviada com');
document.body.innerHTML = document.body.innerHTML.replace(/eingetragen/g, 'sucesso');
}

// Highscore
if (location.pathname.search('score.php') != -1) {
document.body.innerHTML = document.body.innerHTML.replace(/\b(Punkte)\b/g, 'Pontos');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Ausbildung)\b/g, 'Pesquisa');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Gebäude)\b/g, 'Edifícios');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Einheiten)\b/g, 'Unidades');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Allianzen)\b/g, 'Família');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Titel)\b/g, 'Título');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Spieler 7 Tage inaktiv)\b/g, 'Jogador inactivo por 7 dias');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Spieler 14 Tage inaktiv)\b/g, 'Jogador inactivo por 14 dias');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Spieler im Urlaub)\b/g, 'Jogador em Modo Férias');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Spieler gesperrt)\b/g, 'Jogador banido');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Spieler)\b/g, 'Jogadores');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Anzahl)\b/g, 'Número');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Allianz)\b/g, 'Família');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Mitglieder)\b/g, 'Membros');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Durchschnitt)\b/g, 'Média');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Name)\b/g, 'Nome');
}

// Friends
if (location.pathname.search('buddy.php') != -1) {
document.body.innerHTML = document.body.innerHTML.replace(/\b(Spieler hinzufügen)\b/g, 'Adicionar Jogador');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Anfragen von Spielern)\b/g, 'Pedidos de Amizade de outros Jogadores');
document.body.innerHTML = document.body.innerHTML.replace(/\b(löschen)\b/g, 'Apagar');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Als Online werden alle Amigos angezeigt)\b/g, 'São exibidos os amigos on-line');
document.body.innerHTML = document.body.innerHTML.replace(/\b(welche in den letzten 15 Minuten)\b/g, 'que tenham realizado pelo menos uma ação ');
document.body.innerHTML = document.body.innerHTML.replace(/\b(mindestens eine Aktion durchgeführt hatten)\b/g, 'nos últimos 15 minutos');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Du hast noch keine bestätigten Amigos)\b/g, 'Não tens nenhum Amigo confirmado, de momento');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Als Freund einladen)\b/g, 'Adicionar como Amigo');
document.body.innerHTML = document.body.innerHTML.replace(/\b(unbestätigt)\b/g, 'não confirmado');
document.body.innerHTML = document.body.innerHTML.replace(/\b(bestätigen)\b/g, 'aceitar');
document.body.innerHTML = document.body.innerHTML.replace(/\b(ablehnen)\b/g, 'recusar');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Name)\b/g, 'Nome');
}

// Chat
if (location.pathname.search('chat.php') != -1) {
document.body.innerHTML = document.body.innerHTML.replace(/\b(Flüstern)\b/g, 'Sussurrar');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Nachricht)\b/g, 'Mensagem');
document.body.innerHTML = document.body.innerHTML.replace(/Sagen/g, 'Enviar');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Unsichtbare)\b/g, 'Invisível');
document.body.innerHTML = document.body.innerHTML.replace(/\b(online Anzeige)\b/g, 'Anúncio Online');
document.body.innerHTML = document.body.innerHTML.replace(/\b(in den Chat schreiben)\b/g, '(escrever no início da mensagem)');
}

// OPTIONS (Settings)
if (location.pathname.search('config.php') != -1) {
document.body.innerHTML = document.body.innerHTML.replace(/\b(Du kannst erst wieder in)\b/g, 'Deves esperar');
document.body.innerHTML = document.body.innerHTML.replace(/\b(deinen Namen ändern)\b/g, 'até poderes mudar o teu Nickname novamente');
document.body.innerHTML = document.body.innerHTML.replace(/\b(senden)\b/g, 'Guardar');
document.body.innerHTML = document.body.innerHTML.replace(/\b(weitere)\b/g, ' ');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Allgemeine)\b/g, 'Geral -');
document.body.innerHTML = document.body.innerHTML.replace(/allgemeine/g, 'Geral');
document.body.innerHTML = document.body.innerHTML.replace(/Chat Opções/g, 'Chat - Opções');
document.body.innerHTML = document.body.innerHTML.replace(/\b(IP-Sharing melden)\b/g, 'Reportar IP-sharing');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Spielername)\b/g, 'Nickname');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Accountsicherheit)\b/g, ': Segurança da Conta');
document.body.innerHTML = document.body.innerHTML.replace(/\b(IP-Bindung)\b/g, 'Bloquear IP');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Cookie-Bindung)\b/g, 'Bloquear Cookies');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Autologout)\b/g, 'Logout automático');
document.body.innerHTML = document.body.innerHTML.replace(/\b(aus)\b/g, 'Off');
document.body.innerHTML = document.body.innerHTML.replace(/\b(an)\b/g, 'On');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Nachricht)\b/g, 'Mensagem');
document.body.innerHTML = document.body.innerHTML.replace(/\b(bei Angriff)\b/g, 'de Ataques');
document.body.innerHTML = document.body.innerHTML.replace(/\b(bei Stationieren)\b/g, 'de Estações');
document.body.innerHTML = document.body.innerHTML.replace(/\b(bei Transport)\b/g, 'de Transportes');
document.body.innerHTML = document.body.innerHTML.replace(/\b(bei Campgründung)\b/g, 'de Ocupações');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Sichtbar in Useronlineliste)\b/g, 'Visível na lista de Users-Online');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Sortierung der Camps)\b/g, 'Ordem dos Edifícios');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Sortiermethode)\b/g, 'Ordenar por');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Gründung)\b/g, 'Ocupação');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Koordinaten)\b/g, 'Coordenadas');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Name)\b/g, 'Nome');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Aufsteigend)\b/g, 'Ordem Crescente');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Absteigend)\b/g, 'Ordem Decrescente');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Urlaubsmodus)\b/g, 'Modo de Férias');
document.body.innerHTML = document.body.innerHTML.replace(/\b(aktivieren)\b/g, '- Activar');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Empfohlen)\b/g, 'Recomendado');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Alle Opções auf)\b/g, 'Escolher a opção');
document.body.innerHTML = document.body.innerHTML.replace(/\b(lassen)\b/g, 'para todos');
document.body.innerHTML = document.body.innerHTML.replace(/\b(In der Zeit in dem du im Urlaub bist kannst du nicht angegriffen werden und es können auch keine anderen Missões zu dir gestartet werden)\b/g, 'Durante o tempo que estás em férias, não podes ser atacado e também não pode ser iniciada qualquer missão por ti');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Du produzierst in dieser Zeit keine Recursos und die Bauarbeiten On Einheiten, Gebäuden und Forschungen werden ebenfalls eingestellt)\b/g, 'Durante esse tempo, a tua conta não produz quaisquer recursos e a expansão de construções, evolução de pesquisas e construção de Tropas não é possível');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Den Modo de Férias kannst du erst)\b/g, 'Só poderás voltar a activar o Modo de Férias NOVAMENTE');
document.body.innerHTML = document.body.innerHTML.replace(/\b(nach dem - Activar wieder beenden)\b/g, 'depois de terminado');
document.body.innerHTML = document.body.innerHTML.replace(/\b(wirklich)\b/g, '');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Tag)\b/g, 'Dia');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Tage)\b/g, 'Dias');
}

// OPTIONS (IP-Sharing)
if (location.pathname.search('config_sharing.php') != -1) {
document.body.innerHTML = document.body.innerHTML.replace(/\b(weitere)\b/g, ' ');
document.body.innerHTML = document.body.innerHTML.replace(/allgemeine/g, 'Geral');
document.body.innerHTML = document.body.innerHTML.replace(/\b(IP-Sharing melden)\b/g, 'Reportar IP-sharing');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Neues Sharing hinzufügen)\b/g, 'Adicionar novo IP-Sharing');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Aktuelle Sharings)\b/g, 'Ip-Sharings actuais');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Ende)\b/g, 'Até ao dia');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Begründung)\b/g, 'Razão');
document.body.innerHTML = document.body.innerHTML.replace(/\b(senden)\b/g, 'enviar');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Von)\b/g, 'De');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Mit)\b/g, 'Para');
document.body.innerHTML = document.body.innerHTML.replace(/\b(erfolgreich gemeldet)\b/g, 'Reportado com sucesso');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Januar)\b/g, 'Janeiro');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Februar)\b/g, 'Fevereiro');
document.body.innerHTML = document.body.innerHTML.replace(/\b(März)\b/g, 'Março');
document.body.innerHTML = document.body.innerHTML.replace(/\b(April)\b/g, 'Abril');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Mai)\b/g, 'Maio');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Juni)\b/g, 'Junho');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Juli)\b/g, 'Julho');
document.body.innerHTML = document.body.innerHTML.replace(/\b(August)\b/g, 'Agosto');
document.body.innerHTML = document.body.innerHTML.replace(/\b(September)\b/g, 'Setembro');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Oktober)\b/g, 'Outubro');
document.body.innerHTML = document.body.innerHTML.replace(/\b(November)\b/g, 'Novembro');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Dezember)\b/g, 'Dezembro');
}

// Immages
if (location.pathname.search('img.php') != -1) {
document.body.innerHTML = document.body.innerHTML.replace(/\b(Image Upload)\b/g, 'Upload de Imagens');
document.body.innerHTML = document.body.innerHTML.replace(/\b(von)\b/g, 'de');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Bildern)\b/g, 'Imagens');
document.body.innerHTML = document.body.innerHTML.replace(/\b(hochladen)\b/g, 'Carregar');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Hochgeladene Bilder)\b/g, 'Imagens Carregadas');
document.body.innerHTML = document.body.innerHTML.replace(/\b(löschen)\b/g, 'apagar');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Das Bild was du Carregar)\b/g, 'As imagens a enviar');
document.body.innerHTML = document.body.innerHTML.replace(/\b(möchtest darf Maximal)\b/g, 'não deverão exceder');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Pixel)\b/g, 'Pixels');
document.body.innerHTML = document.body.innerHTML.replace(/\b(groß sein)\b/g, '(dimensões máximas)');
document.body.innerHTML = document.body.innerHTML.replace(/\b(ein Maximale Dateigröße)\b/g, 'e tamanho máximo do ficheiro');
document.body.innerHTML = document.body.innerHTML.replace(/\b(haben und im Format)\b/g, '(formatos permittidos:');
document.body.innerHTML = document.body.innerHTML.replace(/\b(oder)\b/g, 'ou');
document.body.innerHTML = document.body.innerHTML.replace(/\b( vorliegen)\b/g, ')');
}

// Giocatore - info click su player
if (location.pathname.search('player.php') != -1) {
document.body.innerHTML = document.body.innerHTML.replace(/\b(Gebäude)\b/g, 'Edifícios');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Spieler)\b/g, 'Jogador');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Punkte)\b/g, 'Pontos');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Camps)\b/g, 'de Edifícios');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Forschung)\b/g, 'de Pesquisa');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Einheiten)\b/g, 'de Unidades');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Caçadores de Prémios aussetzen)\b/g, 'Recompensa oferecida (mostrar)');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Nachricht schreiben)\b/g, 'Enviar Mensagem');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Name)\b/g, 'Nome');
}

// Menu other resources
document.body.innerHTML = document.body.innerHTML.replace(/\b(Serverzeit)\b/g, 'Hora (Server)');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Waffen)\b/g, 'Armas');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Munition)\b/g, 'Munições');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Alkohol)\b/g, 'Álcool');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Dollar)\b/g, 'Dólares');

// Others and Eventual
document.body.innerHTML = document.body.innerHTML.replace(/Fehler!/g, 'Erro!');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Seitenaufbau in)\b/g, 'Página carregada em');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Sekunden)\b/g, 'Segundos');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Du hast hier kein)\b/g, 'Tu ainda não possuís:');
document.body.innerHTML = document.body.innerHTML.replace(/Erfolgreich/g, 'Feito');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Deine Unita machen sich auf den Weg)\b/g, 'As tuas unidades estão a caminho');
document.body.innerHTML = document.body.innerHTML.replace(/\b(registrieren)\b/g, 'Registar');
document.body.innerHTML = document.body.innerHTML.replace(/\b(passwort vergessen)\b/g, 'Esqueceste a tua password?');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Globale Accountverwaltung)\b/g, 'Global Account Management');
document.body.innerHTML = document.body.innerHTML.replace(/\b(registrierte spieler)\b/g, 'Jogadores registados');
document.body.innerHTML = document.body.innerHTML.replace(/\b(spielername)\b/g, 'Username');
document.body.innerHTML = document.body.innerHTML.replace(/\b(passwort)\b/g, 'Password');
document.body.innerHTML = document.body.innerHTML.replace(/\b(anmelden)\b/g, 'Registar');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Password vergessen)\b/g, 'Esqueceste a tua password?');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Willkommen bei)\b/g, 'Benvindo ao');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Was erwartet dich)\b/g, 'De que estás à espera');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Platz für)\b/g, 'Espaço para');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Einheiten)\b/g, 'Unidades de Ataque');
document.body.innerHTML = document.body.innerHTML.replace(/\b(defensive Jungs)\b/g, 'Unidades de Defesa');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Ausbildungen)\b/g, 'Pesquisas');
document.body.innerHTML = document.body.innerHTML.replace(/\b(server informationen)\b/g, 'Informações do Servidor');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Server Informationen)\b/g, 'Informações do Servidor');
document.body.innerHTML = document.body.innerHTML.replace(/\b(pranger)\b/g, 'Lista de Bans');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Grund)\b/g, 'Razão');
document.body.innerHTML = document.body.innerHTML.replace(/\b(gesperrt)\b/g, 'Banidos');
document.body.innerHTML = document.body.innerHTML.replace(/\b(bis)\b/g, 'Até');
document.body.innerHTML = document.body.innerHTML.replace(/\b(registrieren)\b/g, 'Registar');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Spieler)\b/g, 'Jogadores');
document.body.innerHTML = document.body.innerHTML.replace(/\b(registriert)\b/g, 'Registados');
document.body.innerHTML = document.body.innerHTML.replace(/\b(game features)\b/g, 'Características');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Urlaubsmodus)\b/g, 'Modo de Férias');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Du befindest dich zur Zeit noch im Urlaub)\b/g, 'Continuas de Férias de momento');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Urlaub war schön, will aber zurück)\b/g, 'Foi porreiro estar de férias, mas quero voltar ao Jogo');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Du musst noch)\b/g, 'Ainda precisas de esperar');
document.body.innerHTML = document.body.innerHTML.replace(/\b(warten Até du den Urlaub beenden kannst)\b/g, 'até que possas terminar as tuas Férias');

})();
