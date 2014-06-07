// ==UserScript==
// @name           Twitter BR
// @namespace      http://www.erichlotto.com/projects
// @description    Translates Twitter into brazilian portuguese
// @include        http://www.twitter.com/*
// @include        https://www.twitter.com/*
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// ==/UserScript==


// Twitter username
var metas = document.getElementsByTagName('meta'), twitterName;
for(var i=0,il=metas.length;i<il;i++)
  if(metas[i].name == 'session-user-screen_name') twitterName = metas[i].content;

var strings = {
// translations
  "Username or email" : "Nome de Usuário ou email",
  "Forgot?" : "Esqueceu?",
  "Remember me" : "Lembre-me",
  "Sign In" : "Efetuar Login",
  "Join Twitter!" : "Criar Conta",
  "So you want to use Twitter on the web…" : "Então você quer usar o twitter na web...",
 "Oh, snap! We couldn’t find you (or your device)." : "Oh! Não pudemos te encontrar (ou o seu dispositivo).",
 "Give us the phone number you’ve been using to Twitter below." : "Informe o número do telefone utilizado para o twitter abaixo.",
  "Phone number:" : "Número do telefone:",
  "Delete" : "Remover",
  "Sure you want to delete this tweet? There is NO undo!" : "Tem certeza que deseja apagar esse tweet? Não há volta!",
  "Top Tweets " : "Melhores Tweets",
  "See who’s here " : "Veja quem está aqui ",
"Discover what’s happening right now, anywhere in the world" : "Descubra o que está acontecendo neste exato momento, em qualquer lugar do mundo",
 "Search for a keyword or phrase…" : "Pesquise por uma palavra-chave ou frase...",
  "Have an account?" : "Possui uma conta?",
 "Sign in" : "Efetuar Login",
 "Forgot password?" : "Esqueceu a senha?",
 "Forgot username?" : "Esqueceu o usuário?",
 "Already using Twitter on your phone?" : "Ja está usando o Twitter pelo celular?",
"Twitter is a rich source of instant information. Stay updated. Keep others updated. It's a whole thing." : "Twitter é uma fonte rica de informações instantâneas. Mantenha-se atualizado. Manter os outros atualizados. É uma coisa toda.",
"Wrong Username/Email and password combination." : "Combinação de Nome de usuário/email e senha incorretos.",
 "Create Your Account" : "Crie sua conta",
 "Login" : "Entrar",
  "Home" : "Início",
  "Profile" : "Perfil",
  "Find People" : "Encontrar",
  "Thanks, your settings have been saved." : "Obrigado, suas configurações foram salvas.",
  "Settings" : "Configurações",
  "Help" : "Ajuda",
  "Sign out" : "Sair",
  "What’s happening?" : "O que está acontecendo?",
  "Latest:" : "Mais recente: ",
  "from" : "pelo ",
  "more" : "mais",
  "from web by" : "pela web por: ",
  "from web" : "pela web",
  "Tweet" : " twitar",
  "Saved Searches" : "Pesquisas Salvas",
  "Following" : "Seguindo",
  "Followers" : "Seguidores",
  "Listed" : "Listado",
  "Direct Messages" : "mensagens Diretas",
  "Favorites" : "Favoritos",
  "Retweets" : "Retweets",
  "Search" : "Pesquisa",
  "Lists" : "Listas",
  "Retweeted by" : "Retwitado por ",
  "Reply" : "Responder",
  "Retweet" : "Retweet",
  "New list" : "Nova lista",
  "View all" : "Ver todos",
  "Trending Topics" : "Tópicos de tendência",
  "Change" : "Mudar",
  "Promoted" : "Promovido",
  "RSS feed" : "Assinar RSS",
  "About Us" : "Sobre nós",
  "Contact" : "Contato",
  "Status" : "Status",
  "Goodies" : "Coisas Interessantes",
  "Business" : "Negócio",
  "Jobs" : "Trabalhos",
  "Terms" : "Termos",
  "Privacy" : "Privacidade",
  "View all..." : "Ver todos...",
  "Name" : "Nome",
  "Location" : "Localização",
  "Bio" : "Biografia",
  "Tweets" : "Tweets",
  "Actions" : "Ações",
  "message" : "mensagens",
  "block" : "bloquear",
  "report for spam" : "reportar como spam",
  "Mention" : "Menções",
  "Direct message" : "mensagem direta",
  "Follow" : "Seguir",
  "Unfollow" : "Deixar de seguir",
  "That\'s you!" : "Esse é você!",
  "Find accounts and follow them." : "Encontre contas e siga-as.",
  "Find on Twitter" : "Encontrar no Twitter",
  "Find on other networks" : "Encontrar em outras redes",
  "Suggested Users" : "Usuários sugeridos",
  "You can find people, organizations, or companies you know that already have a Twitter account." : "Você pode encontrar pessoas, organizações ou empresas que você sabe que possuem twitter.",
  "What account are you looking for?" : "Qual conta você está procurando?",
  "search" : "Pesquisa",
  "Search for a username, first or last name, business or brand" : "Pesquisar por um nome de usuário, nome, empresa ou marca",
  "We can check if folks on other services already have a Twitter account. " : "Nós podemos checar se amigos em outros serviços ja possuem conta no twitter.",
  "Choose a service" : "Escolha um serviço",
  "from the list on the left." :  "da lista na esquerda.",
  "Maybe you\'ve heard of these Twitter users? Select the people you\'d like to start following." : "Talvez você tenha ouvido falar nesses usuário do twitter? Selecione quem você quer começar a seguir.",
  "Select All" : "Selecionar todos",
  "Your Email" : "Seu Email",
  "Email Password" : "Senha de Email",
  "We don\'t store your login and your password is submitted securely.We store email addresses from this import to help you connect with other Twitter users. We won\'t email these addresses without your permission." : "Nós não armazenamos seu login e sua senha é enviada de forma segura. Nós armazenamos seu endereço de email dessa importação para ajuda-lo a se conectar com outros usuários do twitter.",
  "Email Security" : "Segurança do Email",
  "Learn more" : "Saiba mais",
  "Account" : "Conta",
  "Password" : "Senha",
  "Mobile" : "Dispositivo Portátil",
  "Notices" : "Noticias",
  "Picture" : "Imagem",
  "cancel" : "cancelar",
  "save changes" : "salvar alterações",
  "Change image" : "Trocar imagem",
  "Delete this image" : "Remover esta imagem",
  "Design" : "Modelo",
  "Select a theme" : "Escolha um tema",
  "Change background image" : "Mudar imagem de fundo",
  "Change design colors" : "Mudar cores do tema",
  "background" : "Plano de fundo",
  "text" : "texto",
  "links" : "links",
  "sidebar" : "barra lateral",
  "sidebar border" : "borda da barra lateral",
  "tile background" : "Repetir plano de fundo",
  "Don't use a background image" : "Não usar imagem de fundo",
  "Connections" : "Conexões",
  "You've allowed the following applications to access your account" : "Você liberou os seguintes aplicativos para acessarem sua conta:",
  "Revoke Access" : "Remover acesso",
  "Share photos on Twitter with Twitpic" : "Compartilhar fotos no twitter com o twitpic",
  "Developers" : "Desenvolvedores",
  "Continue" : "Continuar",
  "View all…" : "Ver tudo…",
  "Username" : "Nome de usuário",
  "Enter your real name, so people you know can recognize you." : "Digite seu nome real, para as pessoas poderem te identificar.",
  "Your public profile: http://twitter.com/": "Seu perfil público: http://twitter.com/",
  "No spaces, please." : "Sem espaços, por favor.",
  "Email" : "Email",
  "Let others find me by my email address" : "Deixe os outros me encontrarem pelo endereço de email.",
  "Note: email will not be publicly displayed" : "Nota: o endereço de email não será mostrado publicamente.",
  "Time Zone" : "Zona horária",
  "Tweet Location" : "Local do tweet",
  "Add a location to your tweets" : "Adicione uma localização aos seus tweets",
  "More Info URL" : "URL com mais informações",
  "Tweet Privacy" : "Privacidade do tweet",
  "One Line Bio" : "Biografia em uma linha",
  "Save" : "Salvar",
  "Deactivate my account." : "Desativar minha conta",
  "Have a homepage or a blog? Put the address here." : "Possui um site ou blog? Coloque o endereço aqui.",
  "(You can also add Twitter to your site here)" : "(você também pode adicionar o twitter ao seu site aqui.)",
  "About yourself in fewer than 160 chars." : "Sobre você em menos de 160 caracteres",
  "Where in the world are you?" : "Em que local no mundo você está?",
  "Enable geotagging" : "Habilitar geotagging",
  "What is Geotagging?" : "O que é o Geotagging?",
  "Allow third party applications to annotate your tweets with location information." : "Liberar alicações externas para anotar seus tweets com informações de local.",
  "Delete all historical location data from your tweets. The process can take up to 30 minutes." : "Remover todo o histórico de localização dos seus tweets. Esse processo pode levar até 30 minutos.",
  "What language would you like to Twitter in?" : "Em que idioma você gostaria de usar o twitter?",
  "Protect my tweets" : "Proteger meus updates",
  "Only let people whom I approve follow my tweets." : "Pedir confirmação antes de deixar alguém seguir meus tweets. ",
  "If this is checked, your future tweets will not be available publicly." : "Se isso for marcado, seus futuros updates não estarão disponíveis publicamente.",
  "Delete my account." : "Remover minha conta",
  "From here you can change your basic account info, fill in your profile data, and set whether you want to be private or public." : "Aqui você pode alterar suas informações básicas da conta, preencha seu perfil e defina se quer ele público ou não.",
  "Tips" : "Dicas",
  "Filling in your profile information will help people find you on Twitter. For example, you'll be more likely to turn up in a Twitter search if you've added your location or your real name." : "Preencher as informações do perfil vai ajudar as pessoas a encontrá-lo no Twitter. Por exemplo, você terá mais chances de ser encontrado  se tiver adicionado a sua localização ou seu nome real.",
  "Change your Twitter user name anytime without affecting your existing tweets, @replies, direct messages, or other data. After changing it, make sure to let your followers know so you'll continue receiving all of your messages with your new user name." : "Mude seu nome de usuário no Twitter a qualquer momento sem afetar seu tweets existentes, @replies, mensagens diretas, ou outros dados. Após de alterá-lo, certifique-se de que seus seguidores sabem que você vai continuar recebendo todas as mensagens com seu nome de usuário novo.",
  "Protect your account to keep your tweets private. Approve who can follow you and keep your tweets out of search results." : "Proteja sua conta para manter seus tweets privados. Aprove quem pode seguir você e mantenha seus tweets fora dos resultados de pesquisa.",
  "Current Password:" : "Senha atual:",
  "Forgot your password?" : "Esqueceu sua senha?",
  "New Password:" : "Nova senha:",
  "Verify New Password:" : "Confirmar nova senha:",
  "Be tricky! Your password should be at least 6 characters and not a dictionary word or common name. Change your password on occasion." : "Seja complicado! Sua senha deve ter pelo menos 6 caracteres, e não uma palavra do dicionário ou nome comum. Mude sua senha ocasionalmente.",
  "Note:" : "Nota:",
  " If you have trusted a third-party Twitter service or software with your password and you change it here, you'll need to re-authenticate to make that software work. (Never enter your password in a third-party service or software that looks suspicious.)" :  " Se você confiou em um serviço externo ou software com sua senha, e alterá-la aqui, você vai precisar re-autenticar para fazer esse software funcionar. (Nunca digite sua senha em um serviço de terceiros ou software que pareça suspeito.)",
  "Twitter is more fun when used through your mobile phone. Set yours up!It's easy! " : "O Twitter é mais divertido quando usado por um celular. Configure o seu, é facil!",
  "Use Twitter with Text Messaging!" : "Usar o Twitter por mensagens de texto!",
  "Send a message with the word " : "Envie uma mensagem com a palavra ",
  "Start" : "Início",
  "Choose your country" : "Escolha seu país",
  "Twitter commands" : "Comandos do Twitter",
  "Text Messaging on Twitter" : "mensagens de texto no Twitter",

  "ON" : "Ligado",
  "OFF" : "Desligado",
  "New Follower Emails:" : "Emails com novos seguidores: ",
  "Email when someone starts following me" : "Me envie um email quando alguém comçar a me seguir",
  "Direct Text Emails:" : "Emails com mensagens diretas: ",
  "Email when I receive a new direct message" : "Me envie um email quando receber uma mensagem Direta",
  "Email Newsletter:" : "Emails com atualizações: ",
  "I want the inside scoop—please send me email updates!" : "Quero ficar por dentro, por favor me envie emails com novidades!",
  " to one of Twitter's local short codes:   " : " para um dos pequenos códigos locais do Twitter:",
  "(note that some carriers do not yet support Twitter)" : "(observe que algumas operadoras ainda não suportam o Twitter.)",
  "Twitter does not charge for this service. It's just like sending and receiving text messages with your friends — your carrier's standard messaging rates apply. " : "O Twitter não cobra por este serviço. É como envio e recebimento de mensagens de texto com seus amigos - a tarifação normal de sua operadora é aplicada. ",
  "Learn about the Twitter's Text Messaging commands " : "Saiba mais sobre os comandos por mensagem de texto do Twitter.",
  "here" : "aqui"  
};


strings[twitterName+"’s settings"] = "configurações de " + twitterName;
strings["RSS feed of "+twitterName+"'s tweets"] = "Feed RSS dos tweets de" + twitterName;

trim = function (str) {
  return str!==null ? str.replace(/^\s*/, "").replace(/\s*$/, "") : null;
};

var regexps = {};
regexps["^about (\\d*) hour ago"] = "cerca de $1 hora atrás";
regexps["^about (\\d*) hours ago"] = "cerca de $1 horas atrás";
regexps["^(\\d*) minutes ago$"] = "$1 minutos atrás";
regexps["^(\\d*) days ago$"] = "$1 dia atrás";
regexps["^(\\d*) months ago$"] = "$1 meses atrás";
regexps["and (\\d*) others$"] = "e $1 outros";

matchRegexps = function(key) {
	if (key===null) {
		return undefined;
	}
	for (var reg in regexps) {
		var rrrr = new RegExp(reg);
		var result = key.match(rrrr);
		if (key.match(rrrr)!==null) {
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
    "span":"" , "a":"", "h2":"","th":"", "td":"", "p":"", "strong":"", "div":"", "label":"", "h1":"", "title":"", "button":"", "li":"", "small":"", "h3":"", "buttons":"", "geo":"", "layer":""
};

translateWholePage = function(e) {
  var node = undefined;
  for (var tagName in allTrans) {
    var tags = document.getElementsByTagName(tagName);
    for (var key in tags) {
      node = tags[key];
      if(node.childNodes != undefined) {
        if (node.childNodes.length==1) {
          var translation = translateWithRegexp(node.innerHTML);
          if (translation!=undefined) {
            node.innerHTML = translation;
          }
        } else {
          if (node.childNodes.length<=3) {
            for (var i=0;i<node.childNodes.length;i++) {
              if (node.childNodes[i].nodeName=="#text") {
                translation = translateWithRegexp(node.childNodes[i].nodeValue);
                if (translation!=undefined) {
                  node.childNodes[i].nodeValue = translation;
                }
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
  setTimeout(400, translateWholePage)
}, false);

