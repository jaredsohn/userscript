// ==UserScript==
// @name           Craque da Galera 2010 - Fase 1
// @namespace      -
// @include        *globoesporte.globo.com/futebol/brasileirao-serie-a/craque-da-galera/index.html*
// ==/UserScript==

(function()
{
	// Atributos Estáticos
	const $ = unsafeWindow.$
	
	function CraqueGalera()
	{
		// Objeto
		var craqueGalera = this;
		
		// Costantes
		const CONCA = 95;
		const NODE_LISTA_PARTICIPANTES = document.getElementById("widget-votacao");
		const NODE_LIGHTBOX = document.getElementById("votacao-aberta");
		
		// Atributos
		var conca, status;
	
		// Construtor
		function __Constructor()
		{
			// Validando dados
				// Procurando Lista
				var nodeLista = NODE_LISTA_PARTICIPANTES
				if(!nodeLista){ this.error("Pagina sofreu alteracoes!"); }
				
				// Localizando Conca
				conca = $("li[rel=" +CONCA+ "]", nodeLista)[0];
				if(!conca){ this.error("Conca nao localizado!"); }
		}
		
		this.votar = function()
		{
			this.validarPagina();
			this.selecionar(conca);
			this.implementarStatus();
			this.configurarCampo();
			
			$("#widget-votacao, #slide-thumbnail").remove();
			unsafeWindow._showRecaptchaError = function()
			{
				status.erros.aumentar();
				status.atencao(true)
				unsafeWindow._clearRecaptcha();
			}
			
			unsafeWindow._votoComputado = function()
			{
				status.atencao(false);
				status.votos.aumentar();	
			}
		}
		
		this.selecionar = function(participante)
		{
			var e = document.createEvent("MouseEvents");
			e.initMouseEvent('click', true, true,window, 1, 1, 1, 1, 1, false, false, false, false, 0, participante);
			return participante.dispatchEvent(e);
		}
		
		this.getQuery = function(arr)
		{
			var query = "";
			for(var i=0; i<arr.length; i++)
			{
				query += String.fromCharCode( arr[i] );
			}
			return query
		}
		
		this.configurarCampo = function()
		{
			var campo = $("#recaptcha_response_field")[0]
			$(campo).keypress(function(e)
			{
				temporizador.iniciar(true)
       			temporizador.parar(true)
				
				if(e.keyCode==13) // Enter
				{ $("#form-votacao .votar a").click(); }
				
				if(e.keyCode==9) // Tab
				{ unsafeWindow._clearRecaptcha(); }
			})
			campo.focus();
			
			var v = $(html).closest("li")[0].getAttribute( this.getQuery([114,101,108]) )
			$(this.getQuery([35,105,116,101,109,95,105,100])).attr("value", v);
		}
		
		this.implementarStatus = function()
		{
			var html = ''+
			'<div class="status" style="clear:both; font:11px Arial; margin-bottom:10px">'+
				'<p class="atencao" style="color:red; display:none">Erro!</p>'+
				'<p class="votos"></p>'+
				'<p class="erros"></p>'+
				'<p class="tempo"></p>'+
			'</div>';
			
			var acoes = $("#form-votacao .caracteres").append(html);
			
			status = {
				'atencao':function(bool){
					var display = bool? "block": "none";
					$("#form-votacao .caracteres .status .atencao").css("display", display);
				},
				'votos':{
					numero:0,
					aumentar:function(){ status.votos.numero++; status.votos.registrar(); },
					registrar:function()
					{
						$("#form-votacao .caracteres .status .votos").html(status.votos.numero + " voto(s)");
					}
				},
				'erros':{
					numero:0,
					aumentar:function(){ status.erros.numero++; status.erros.registrar(); },
					registrar:function()
					{
						$("#form-votacao .caracteres .status .erros").html(status.erros.numero + " erro(s)");
					}
				},
				'tempo':function(valor){ $("#form-votacao .caracteres .status .tempo").html(valor) }
					
			}
			
			status.votos.registrar();
		}
		
		this.error = function(mensagem)
		{
			alert("Ocorreu um erro durante o processo de votação:\nErro: " +mensagem);
			throw new Error(mensagem);
		}
		
		this.validarPagina = function()
		{
			// Verificando Biblioteca jQuery
			if(!$){ this.error("Biblioteca nao disponivel"); }
			
			// Verificando Estrutura HTML
			var nodeLista = NODE_LISTA_PARTICIPANTES;
			var sintaxe = [108, 105, 32, 104, 51];
			var tagList = [99, 111, 110, 99, 97];
			
			html = $(this.getQuery(sintaxe), nodeLista).filter(function(index)
			{
				return this.innerHTML.toLowerCase().indexOf( craqueGalera.getQuery(tagList) )!=-1;
			})
			
			if(html.length!=1){ this.error("Estrutura HTML alterada!"); }
		}
		
		// Métodos Privados
		temporizador =
		{
			'time':null,
			'pararTime':null,
			'tempo':{'segundos':0, 'minutos':0, 'horas':0},
			'mensagem':"",
			'iniciar':function(habilitado, loop)
			{
				if(!habilitado)
				{
				   clearTimeout(temporizador.time)
				   return temporizador.time = null
				}
				else if(temporizador.time && !loop) return
			
				var tempo = temporizador.tempo;
				tempo.segundos++
				if(tempo.segundos>=60) tempo.segundos = 0, tempo.minutos++
				if(tempo.minutos>=60) tempo.minutos = 0, tempo.horas++
			
				var mensagem = ""
				if(tempo.horas>0) mensagem+= tempo.horas + ' hora(s) '
				if(tempo.minutos>0) mensagem+= tempo.minutos + ' minuto(s) '
				if(tempo.segundos>0) mensagem+= tempo.segundos + ' segundo(s)'
				status.tempo( temporizador.mensagem = mensagem );
			
				if(habilitado) temporizador.time = setTimeout(function()
				{ temporizador.iniciar(true, true) }, 1000)
			},
			'parar':function(habilitado)
			{
				if(temporizador.pararTime) clearTimeout(temporizador.pararTime)
				if(habilitado) temporizador.pararTime = setTimeout(function()
				{ temporizador.iniciar(false) }, 2000)
			}
		}
		
		__Constructor.apply(this, arguments);
	}
	
	$(function()
	{
		new CraqueGalera().votar();
		window.CraqueGalera = null;
	})
	
})()