// ==UserScript==
// @name Pré-visualisador (Guia do Hardware)
// @author 0x51L3N7 (u=790511)
// @version 1.5.0
// @date 24/Mar/2012

// @include *hardware*/comunidade/*
// ==/UserScript==

function GDHTools() {
	//Variáveis privadas
	delay      = [ GM_getValue( 'in', 350 ), GM_getValue( 'out', 1750 ) ], //[ mostrar, esconder ] em milissegundos
	ajax       = new XMLHttpRequest,
	showTopics = document.createElement( 'div' ),
	style      = document.createElement( 'style' );
			
	/* Esconde o menu com os tópicos */
	hide = function () {
		//Caso a função já tenha sido executada, limpa o timeout antes de executar-lo novamente, para evitar bugs
		if ( typeof wait2 != 'undefined' ) {
			clearTimeout( wait2 );
		}
		
		wait2 = setTimeout( function() {
			showTopics.style.display = 'none';
		}, delay[1] ),
		
		showTopics.onmouseover = function() {
			clearTimeout( wait2 );
		},
		showTopics.onmouseout = function() {
			hide();
		};	
	}
	
	/* Atalhos do teclado */
	shortcuts = { 
		//Mudar delay: CTRL + Q
		changeDelay: {
			special: 'ctrlKey',
			which: 81,
			run: function( e ) {
				delay = confirm( '"OK" = Delay de aparecer\n"Cancelar" = Delay de desaparecer' ),
				value = prompt( 'Digite o delay que deseja (Em milissegundos)' );
						
				GM_setValue( ( type = { true: 'in', false: 'out' }, type[ delay ] ), value ),
				alert( 'A página será recarregada para que configuração seja aplicada.' ),
				location.reload();		
			}
		},
		
		//Restaurar delays: CTRL + F1
		resetDelays: {
			special: 'ctrlKey',
			which: 112,
			run: function() {
				if ( confirm( 'Deseja resetar os delays padrões?' ) == true ) {
					GM_deleteValue( 'in' ),
					GM_deleteValue( 'out' );
					
					alert( 'A página será recarregada para que configuração seja aplicada.' ),
					location.reload();
				}
			}
		},
		
		//Valores atuais: CTRL + F2	
		currentValues: {
			special: 'ctrlKey',
			which: 113,
			run: function() {
				alert( 'Valores atuais:\n\nMostrar = ' + GM_getValue( 'in', 350 ) + '\nEsconder = ' + GM_getValue( 'out', 1750 ) );
			}
		}
	
	}
}

/* Redireciona pro primeiro ou o último post da página, com base nas ações do usuário */
GDHTools.prototype.setPost = function() {
	// @pageNum pega o número de páginas do tópico
	// @hash Pega todos os posts da página 
	// @post pega primeiro ou o último post (padrão)
	// @topicReferer referência o tópico com base na URL (xxxx-yyyy...)
	var pageNum      = ( ( text = document.body.textContent, text.substr( text.lastIndexOf( 'Página' ), 15 ) ).substr( 12 ) - 1 ) >> 0,
		hash         = ( hashed = document.body.innerHTML.match( /<a name=(.+\d)/g ), hashed[ hashed.length-1 ] ).match( ( post = /name="(.+)">/, post ) )[1],
		topicReferer = /e\/([^\/]+)/.exec( location.href )[1];
	
	//Redireciona pro último post
	if ( GM_getValue( topicReferer ) == 'go' ) {
		if ( pageNum && location.href.indexOf( '.html' ) == -1 ) {
			location.href += ( pageNum ).toString() + '.html';
		} else {
			location.hash = hash;
			GM_deleteValue( topicReferer );
		}
	//Redireciona pro primeiro post. O else if é necessário pra evitar um redirecionamento após o usuário ter postado
	} else if ( !/#post.+/.exec( location.href ) ) {
		location.hash = hashed[0].match( post )[1];
	}
	
	//Termina o redirecionamento para o último post (Caso o tópico tenha mais de uma página)
	if ( location.href.indexOf( '.html' ) > -1 && GM_getValue( topicReferer ) == 'go' ) {
		location.hash = hash,
		GM_deleteValue( topicReferer );
	}		
}

GDHTools.prototype.setRequest = function() {
	//Varre todos as tags a da página atrás dos links das salas
	for ( i = 0, j = document.getElementsByTagName( 'a' ); ++i < j.length; ) {
		if ( /(v-f|getnew)/.exec( j[i].href ) && !/v-f.(1|2|3|4|5|6|7|8|11|12|62)$/.exec( j[i].href ) ) {			
			j[i].onmouseover = function( e ) {
				that = this; //Referência ao objeto j[i] (tag "<a>" atual)
				
				wait = setTimeout( function() {																
					ajax.open( 'GET', that.href, true ),
					ajax.send();
					
					x = e.pageX+15,
					y = e.pageY;
				}, delay[0] );
			}
			
			j[i].onmouseout = function() {
				clearTimeout( wait );
			}
		}
	}
}

/* Interface */
GDHTools.prototype.GUI = function() {
	//Mensagens destinadas aos usuários finais
	this.messages = {
		noTopics: 'Não há tópicos com novas postagens.',
		badStatus: 'Ocorreu algum erro.',
		loading: 'Carregando...'
	}

	showTopics.id = 'showTopics',
	
	//CSS
	style.innerHTML = '\
	#showTopics { box-shadow:0px 0px 10px black; display:none; position:absolute; width:auto; height:auto; background:#F0F0F0; font-family:Tahoma; padding:5px; border-radius:5px; display:block; }\
	#showTopics span { display:block; padding:3px; }\
	#showTopics a:hover { text-decoration:none; color:#069; }\
	.last { font-size:9px; }\
	.last:hover { color:green !important; }';	
	
	//Incorpora os elementos a página
	document.getElementsByTagName( 'head' )[0].appendChild( style ),
	document.getElementsByTagName( 'body' )[0].appendChild( showTopics );
	
	showTopics = document.getElementById( 'showTopics' );
	showTopics.style.display = 'none',
	showTopics.innerHTML     = this.messages.loading,
	showTopics.style.left    = x + 'px',
	showTopics.style.top     = y + 'px';		
}

GDHTools.prototype.showResponse = function() {
	this.GUI();
	
	if ( ajax.readyState == 4 && ajax.status == 200 ) {
		showTopics.textContent = '',
		response = ajax.responseText.match( /<a.+bold.+>/g );
		
		if ( !response ) {
			showTopics.textContent = this.messages.noTopics;
		} else { //Adiciona os tópicos
			for ( i = -1; ++i < response.length; ) {
				showTopics.innerHTML += '<span><a class="last" href="' 
				+ /href="(.+)" i/.exec( response[i] )[1] 
				+ '">(Último)</a> '
				+ response[i].replace( 'bold', 'none' ) 
				+ '</span>'; 
			}
		}				
	} else if ( ajax.status == 404 ) {
		showTopics.textContent = this.messages.badStatus;
	}		
	
	//Adiciona aos elementos com a classe "last" um evento que torna possível a ida ao último post
	//com base no metódo "setPost"
	for ( i = 0, j = document.getElementsByClassName( 'last' ); i < j.length; ) {
		j[i++].onmousedown = function( e ) { 
			if ( e.button == 0 || e.button == 1 ) {								
				GM_setValue( /e\/([^\/]+)/.exec( this.href )[1], 'go' );
			}		
		}
	}
	
	showTopics.style.display = 'block';
	
	hide();
}	

/* Inicializa o script */
GDHTools.prototype.run = function() {
	//Torna possível o acesso ao metódo "showResponse" dentro do evento onreadystatechange
	public = this;

	if ( location.href != 'http://www.hardware.com.br/comunidade/' ) {
		this.setPost();
	} else { 
		this.setRequest();
	}
	
	ajax.onreadystatechange = function() {
		public.showResponse();
	}

	onkeydown = function( e ) {
		for ( i in j = shortcuts ) {
			if ( e[ j[i].special ] && e.keyCode == j[i].which ) {
				return j[i].run();
			}
		}
	}		
}


//Executa o script
new GDHTools().run();