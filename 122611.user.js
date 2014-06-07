// ==UserScript==
// @version     1.7.1
// @author      Mikas60
// @name        LPuNKTKit PT-PT Language Pack
// @namespace   LPuNKTKit PT-PT Language Pack
// @description Traducao para PT-PT do Script LPuNKTKit
// @icon        http://s3.amazonaws.com/uso_ss/icon/117512/large.png?1325107247
// @include     http://*.ogame.com.pt/game/*
// @include     http://ogame.com.pt/
// @include     http://*.ogame.com.br/game/*
// @include     http://ogame.com.br/
// @require     http://sizzlemctwizzle.com/updater.php?id=122611&uso&show
// ==/UserScript==

var LANG_PT = {

MULTILANGUAGE :
          {txt_langPack:'PT Language Pack',
           url_langPack:'http://userscripts.org/scripts/show/122611'
          },

  SERVER : { // Textos gerados pelo servidor

            //Recursos
            txt_RES_metal: "Metal",
            txt_RES_cristal: "Cristal",
            txt_RES_deuterio: "Deutério",
            txt_RES_energia: "Energia",

            // Titulos das Mensagens
            txt_MISSION_colorDeploy:'Transferir frotas',
            txt_MISSION_colorReturn:'Regresso de uma frota',
            txt_MISSION_colorCircularMsg:'Mensagem Circular',
            txt_MISSION_colorHarvest:'Relatório da recolha do Campo de Destroços',
            txt_MISSION_colorEspionageReport:'Relatório de espionagem',
            txt_MISSION_colorEspionageAction:'Acção de espionagem',
            txt_MISSION_colorPM:'Mensagem Privada',
            txt_MISSION_colorArrive:'Chegada ao planeta',
            txt_MISSION_colorExpedition:'Expedition result',
            txt_MISSION_colorColonize:'Colonization report',
            txt_MISSION_colorForeign: 'Foreign Fleet delivering resources',

            //EmptySpace and others
            txt_SHIP_LG_sonda: "Sonda de Espionagem",
            txt_SHIP_LG_satelite: "Satélite Solar",
            txt_SHIP_LG_npc: "Cargueiro Pequeno",
            txt_SHIP_LG_ngc: "Cargueiro Grande",
            txt_SHIP_LG_reciclador: "Reciclador",
            txt_SHIP_LG_cl: "Caça Ligeiro",
            txt_SHIP_LG_cp: "Caça Pesado",
            txt_SHIP_LG_crucero: "Cruzador",
            txt_SHIP_LG_nb: "Nave de Batalha",
            txt_SHIP_LG_acorazado: "Interceptor",
            txt_SHIP_LG_bombardero: "Bombardeiro",
            txt_SHIP_LG_destructor: "Destruidor",
            txt_SHIP_LG_colonizador:"Nave de Colonização",
            txt_SHIP_LG_edlm: "Estrela da Morte",

            txt_DEFENSE_LG_lanza: "Lançador de Mísseis",
            txt_DEFENSE_LG_laserp: "Laser Ligeiro",
            txt_DEFENSE_LG_laserg: "Laser Pesado",
            txt_DEFENSE_LG_gauss: "Canhão de Gauss",
            txt_DEFENSE_LG_ionico: "Canhão de Iões",
            txt_DEFENSE_LG_plasma: "Canhão de Plasma",
            txt_DEFENSE_LG_mInterplanet: "Míssil Interplanetário",
            txt_DEFENSE_LG_mIntercep: "Míssil de Intercepção",
            txt_DEFENSE_LG_cupPeque:"Pequeno Escudo Planetário",
            txt_DEFENSE_LG_cupGrande:"Grande Escudo Planetário",

            // Relatório de combate

            // Datas
            txt_CR_DATE_enero:'Janeiro',
            txt_CR_DATE_febrero:'Fevereiro',
            txt_CR_DATE_marzo:'Março',
            txt_CR_DATE_abril:'Abril',
            txt_CR_DATE_mayo:'Maio',
            txt_CR_DATE_junio:'Junho',
            txt_CR_DATE_julio:'Julho',
            txt_CR_DATE_agosto:'Agosto',
            txt_CR_DATE_septiembre:'Setembro',
            txt_CR_DATE_octubre:'Outubro',
            txt_CR_DATE_noviembre:'Novembro',
            txt_CR_DATE_diciembre:'Dezembro',

            // Abreviações das naves
            txt_CR_SHIP_SH_PCarga:'Cg.Pequeno',
            txt_CR_SHIP_SH_GrCarga:'Cg.Grande',
            txt_CR_SHIP_SH_CLigero:'C.Ligeiro',
            txt_CR_SHIP_SH_CPesado:'C.Pesado',
            txt_CR_SHIP_SH_Crucero:'Cruzador',
            txt_CR_SHIP_SH_NB:'N.Batalha',
            txt_CR_SHIP_SH_Acoraz:'Interceptor',
            txt_CR_SHIP_SH_Bomb:'Bombardeiro',
            txt_CR_SHIP_SH_Destruc:'Destruidor',
            txt_CR_SHIP_SH_Edlm:'EDM',
            txt_CR_SHIP_SH_Colony:'N.Colonização',
            txt_CR_SHIP_SH_Recy:'Reciclador',
            txt_CR_SHIP_SH_Sonda:'Sondas',
            txt_CR_SHIP_SH_Satelite:'Sat.Solar',

            // Abreviações das defesas
            txt_CR_DEFENSE_SH_Lanza:'L.Mísseis',
            txt_CR_DEFENSE_SH_LPeque:'L.Ligeiros',
            txt_CR_DEFENSE_SH_LGrande:'L.Pesados',
            txt_CR_DEFENSE_SH_CGauss:'Gauss',
            txt_CR_DEFENSE_SH_CIonico:'C.Iões',
            txt_CR_DEFENSE_SH_CPlasma:'Plasmas',
            txt_CR_DEFENSE_SH_CupPeque:'P.Escudo',
            txt_CR_DEFENSE_SH_CupGrande:'G.Escudo',

            txt_CR_and:'e',
            txt_CR_Defender:'Defensor',
            txt_CR_Draw:'Empate',
            txt_CR_attacker:'Atacante',
            txt_CR_captured:'Ele roubou',
            txt_CR_theDefender:'Defensor',
            txt_CR_destroyed:'destruído!'
  },

  MISC : {
          txt_reciclar: "Reciclar",
          txt_expedicion:'Expedição',
          txt_colonizar:'Colonizar',
          txt_tranportar:'Transportar',
          txt_desplegar:'Transferir',
          txt_espiar:'Espionagem',
          txt_defender:'ACS-Defesa',
          txt_atacarSAC:'ACS-Ataque',
          txt_atacar:'Atacar',
          txt_destruir:'Destruir',
          txt_flota: "Naves",
          txt_defensa: "Defensa",
          txt_prod321: "Produção comparada com rácio de 3:2:1",
          txt_Infinito: "Infinito",
          txt_guardar: "Guardar",
          txt_tiempoTotal: "Tempo Total",
          txt_porDia: "Por Dia",
          txt_recursos: "Recursos",
          txt_produccion: "Produção",
          txt_produccionPlanetaria: "Produção estimada no planeta actual",
          txt_excedente: "Excesso",
          txt_general:'Vista Geral',
          txt_listaEventos:'Eventos',
          txt_recursosDetalle:'Opções de recursos',
          txt_instalaciones:'Instalações',
          txt_keySalto:'Portal de Salto Quântico',
          txt_investigaciones:'Pesquisas',
          txt_hangar:'Hangar',
          txt_galaxia:'Galáxia',
          txt_movFlota:'Movimento de Frota',
          txt_alianza:'Aliança',
          txt_sendCC:'Enviar Mensagem Circular',
          txt_amigos:'Amigos',
          txt_notas:'Notas',
          txt_clasificacion:'Classificação',
          txt_buscar:'Procurar',
          txt_mensajes:'Messagens',
          txt_priPlaneta:'Primeiro Planeta',
          txt_ultPlaneta:'Último Planeta/Lua',
          txt_antPlaneta:'Planet/Lua Anterior',
          txt_sigPlaneta:'Próximo Planet/Lua',
          txt_antItem:'Item anterior do menu esquerdo',
          txt_sigItem:'Próximo item do menu esquerdo',
          txt_altPlanetaLuna:'Muda entre o Planeta e a sua Lua',
          txt_antCelestial:'Corpo celestial anterior do mesmo tipo (Planeta ou Lua)',
          txt_sigCelestial:'Próximo corpo celestial do mesmo tipo (Planeta ou Lua)',
          txt_izquierda:'Esquerda',
          txt_derecha:'Direita',
          txt_antPag:'Página Anterior',
          txt_sigPag:'Próxima Página',
          txt_allNaves:'Todas as Naves',
          txt_borrarSel:'Limpar Selecção',
          txt_allMens:'Selecionar todas as mensagens visiveis',
          txt_borrarMens:'Apagar todas as mensagens seleccionadas',
          txt_priPag:'Primeira Página',
          txt_ultPag:'Última Página',
          txt_antMens:'Mensagem anterior',
          txt_sigMens:'Próxima mensagem',
          txt_delMens:'Apagar mensagem',
          txt_cerrarMens:'Fechar mensagem',
          txt_arriba:'Cima',
          txt_abajo:'Baixo',
          txt_avPag:'PgDown',
          txt_retPag:'PgUp',
          txt_inicio:'Home',
          txt_fin:'End',
          txt_mayusc:'Shift',
          txt_borrar:'Delete',
          txt_tecla:'Tecla',
          txt_accion:'Acção',
          txt_retroceso:'BackSpace',
          txt_velocidad:'Velocidade',
          txt_destPlaneta:'Planeta Alvo',
          txt_destLuna:'Lua Alvo',
          txt_destEscombros:'Campo de Destroços Alvo',
          txt_destExpedicion:'Coordenadas alvo para o 16',
          txt_volver:'Retroceder para a página anterior',
          txt_ogame:'Em todo o lado, excepto em casos expeciais',
          txt_keyClasif:'Na Classificação',
          txt_keySalto:'No Portal de Salto Quântico',
          txt_keyMailbox:'No Correio',
          txt_keyMessage:'Nas mensagens',
          txt_key1Flota:'Na primeira página de frota',
          txt_key2Flota:'Na segunda página de frota',
          txt_key3Flota:'Na terceira página de frota',
          txt_keyFlota:'Na página de movimento de frota',
          txt_recargar:'Recarregar',
          txt_allRecursos:'Selecionar todos os recursos',
          txt_recInversos:'Carregar recursos em ordem inversa',
          txt_maxMetal:'Metal Max/Min',
          txt_maxCristal:'Cristal Max/Min',
          txt_maxDuty:'Deutério Max/Min',
          txt_permanecer:'Permanencia até',
          txt_hora:'hora',
          txt_expInfo:'Expandir/Colapsar info da frota.',
          txt_errorKey:'O script não funciona correctamente nestes casos. A página ' +
				'correspondente é aberta, mas se o pop-up for fechado carregando '+
				'no botão [X], o script parece parar de funcionar correctamente.' +
				'A situação pode ser rectificada carregando algures na página.',
          txt_texto:'Texto',
          txt_color:'Cor',
          txt_espacioLibre:'Espaço Disponivel',
          txt_enviar:'Enviar',
          txt_cancelarViaje:'Cancelar a Missão?',
          txt_faltaEnergy:'Energia Necessaria',
          txt_efficiency:'Redução do tempo',
          txt_notAvailableCRFriki:'A linguagem Grega não está disponivel',
          txt_recurso: 'Recursos',
          txt_simular: 'Simular',
          txt_errorTrade: 'Dados dos Recursos, ou racios, não são válidos',
          txt_pranger: 'Bloqueados',
          txt_defecto: 'Pré-definido',
          txt_todo: 'Todos',
          txt_guardado: 'Guardar',
          txt_Warehouses: 'Enchimento dos Armazéns',
          txt_Dens: 'Enchimento dos Esconderijos Subterrâneos',
          txt_errorMsg: 'Cuidado, estes textos edentificão o tipo de mensagem',
          txt_links: 'Links',
          txt_show: 'Mostrar',
          txt_debris:'Destroços',
          txt_planet: 'Lista de planetas',
          txt_usarKeys: 'Teclas de Atalho',
          txt_habSection: '** Activa mais opções de configuração',
          txt_errorCR: 'Cuidado, estes textos identificam as frotas' +
          'e defesas no relatório original.',
          txt_emptyFields: 'Campos vazios'
  },

  OPTION : {
        txt_showFleetResources: "Mostrar Recursos da Frota",
        txt_minEscombros: "Tamanho Min. dos destroços",
        txt_disableUselessStuff: "Desactivar Coisas Inuteis",
        txt_showRange: "Mostrar o Alcance dos MIs e do Phalanx",
        txt_showResourcesPerFleet: "Mostrar Recursos em cada Frota",
        txt_usarGeneral:'Usar nas Páginas Normais',
        txt_usarFlota:'Usar nas Páginas de Frota',
        txt_usarMens:'Usar nas Páginas de Mensagens',
        txt_usarKeys:'Usar Teclas de Atalho',
        txt_fixActionButtons:'Fixar os Botões de Acção',
        txt_highlightPlayers:'Destacar Jogadores e Alianças',
        txt_colorFlightSlots:'Colorir os slots das Frotas',
        txt_prangerInHeader:'Bloqueados no Header',
        txt_replyCircularMsg:'Responder a Mensagens Circulares',
        txt_planetNameInMsg:'Mostrar o Nome do Planeta nas Mensagens',
        txt_useSmiles:'Smiles',
        txt_chkChat:'Mostrar o chat do Xat.com',
        txt_idChat:'Id do chat',
        txt_coloredMessages:'Colorir os Titulos das Mensagens',
        txt_showMessageButtonLeft:'Botão de Mensagens no menu esquerdo',
        txt_setFocusCorrectly:'Corrigir o Foco das Páginas',
        txt_fontColor:'Cor da Fonte',
        txt_showPlanetNavKeys:'Botões de Navegação dos Planetas',
        txt_showMissingSats:'Mostrar Satélites para ter Energia Positiva',
        txt_resourcesInfo:'Produção de Recursos Detalhada',
        txt_showEmptySpace:'Espaço Vazio para cada Frota',
        txt_fixForumLink:'Corrigir Link do Fórum',
        txt_quitarAdv:'Remover o Aviso de Colonização',
        txt_backTransparent:'Fundo Transparente na Página de Opções',
        txt_scriptCRName:'Conversor de RBs',
        txt_disableStar:'Remover Estrelas Sintilantes',
        txt_coordLinksFix:'Corrigir o Destaque dos Links de Coordenadas',
        txt_loadButtons:'Botões Adicionais para Carregar os Recursos',
        txt_optionsInUsername:'Opcções do Ogame no Nome de Usuario',
        txt_returnFleetQuestion:'Perguntar ao Clicar para Regressar a Frota',
        txt_satGraviton:'Satélites para a Gravitação',
        txt_satTerraformer:'Satélites para o Terraformador',
        txt_confirmTrader:'Aviso de Mercador',
        txt_showEfficiency:'Mostrar Redução do tempo',
        txt_smallPlanets:'Mostrar Planetas Pequenos',
        txt_usarCRFriki:'Usar a Lingaguem Grega',
        txt_showFleetContent: 'Mostrar Frota na Página de Envio de Frota',
        txt_showDestPlayerName: 'Mostrar o Nome do Jogardor do Destino',
        txt_useDirectSpy: 'Espiar Directamente da Página de Movimento de Frota',
        txt_useShortHeader: 'Header Pequena',
        txt_showTradeCalculator: 'Calculador de Trocas',
        txt_showLlenadoAlmacenes: 'Calcular o Enchimento dos Armazéns',
        txt_showProductionRatio: 'Mostrar Producção Ideal',
        txt_showDailyShipsDefenses: 'Mostrar Producção Diária de Frota/Defesas',
        txt_showTimeShipsDefenses: 'Calcular Tempo de Fabrico',
        txt_showUniNameInPillory: 'Nome do Universo nos Bloquados',
        txt_moonsToRight:'Luas para a Direita',
        txt_showDebris: 'Quantidade',
        txt_showDebrisIcon: 'Icon',
        txt_fixTooltips: 'Corrigir a largura dos Tooltips',
        txt_colorEnergyUsed: 'Energia usada',
        txt_colorResAlmacen: 'Armazém',
        txt_colorResDen: 'Esconderijo Subterrâneo',
        txt_EmptySlot: 'Espaços vazios',
        txt_showAutoExpoFleet: 'Selecção automática de expedições',
        txt_fullPlanet: 'Colorir planeta inteiro',
        txt_showNoEscape: 'Colorir combustível de escape',
        txt_colorEnough:'É suficiente',
        txt_colorNotEnough:'Não é suficiente'
        txt_setClockLinks: 'Mostrar o relógio na barra dos links'
  },
  CR : {
        txt_De:'de',
        txt_AttWin:'O Atacante ganhou a batalha!',
        txt_DefWin: 'O Defensor ganhou a batalha!',
        txt_Empate: 'A batalha acabou em empate!',
        txt_lost:'perdeu',
        txt_attackers:'Atacantes',
        txt_battleDay:'Batalha no dia',
        txt_loses:'Perdas',
        txt_units:'unidades',
        txt_defenders:'Defensores',
        txt_withoutDef:'Sem Defesas',
        txt_stolen:'Roubou',
        txt_attFleet:'Frota Atacante',
        txt_defFleet:'Frota Defensora',
        txt_totLoses:'Perdas Totais',
        txt_debris:'Destroços',
        txt_recys:'reciclador(es)',
        txt_profit:'Lucro',
        txt_attHarvest:'Atacantes com reciclagem',
        txt_attNoHarvest:'Atacantes sem reciclagem',
        txt_defHarvest:'Reciclagem do Defensor',
        txt_farming:'Ataque-Farmar',
        txt_attProfit:'Lucro do Atacante',
        txt_minimal:'Minimo Compactado',
        txt_foro:'Fórum',
        txt_auto:'Conversor Automático de Relatórios de Combate',
        txt_texts:'Textos dos Relatórios de Combate',
        txt_colors:'Cores dos Relatórios de Combate',
        txt_lossesXRes:'Perdas de cada Recurso',
        txt_lostUnits:'Unidades Perdidas',
        txt_titles:'Titulos',
        txt_lostShips:'Naves Perdidas',
        txt_moon:'Lua',
        txt_others:'Outros'
  },

  CR_FRIKI : {
        txt_RES_metal: ' ',
        txt_RES_cristal: ' ',
        txt_RES_deuterio: ' ',

        txt_SHIP_LG_sonda: ' ',
        txt_SHIP_LG_satelite: ' ',
        txt_SHIP_LG_npc: ' ',
        txt_SHIP_LG_ngc: ' ',
        txt_SHIP_LG_reciclador: ' ',
        txt_SHIP_LG_cl: ' ',
        txt_SHIP_LG_cp: ' ',
        txt_SHIP_LG_crucero: ' ',
        txt_SHIP_LG_nb: ' ',
        txt_SHIP_LG_acorazado: ' ',
        txt_SHIP_LG_bombardero: ' ',
        txt_SHIP_LG_destructor: ' ',
        txt_SHIP_LG_edlm: ' ',
        txt_SHIP_LG_colonizador: ' ',

        txt_DEFENSE_LG_lanza: ' ',
        txt_DEFENSE_LG_laserp: ' ',
        txt_DEFENSE_LG_laserg: ' ',
        txt_DEFENSE_LG_gauss: ' ',
        txt_DEFENSE_LG_ionico: ' ',
        txt_DEFENSE_LG_plasma: ' ',
        txt_DEFENSE_LG_cupPeque:' ',
        txt_DEFENSE_LG_cupGrande:' ',
        txt_DEFENSE_LG_mInterplanet: ' ',
        txt_DEFENSE_LG_mIntercep: ' ',

        txt_recys:' '
  }
};


function StoreLangPack(objLang, strLang)
{
    try {
          if (strLang.length <= 0) return false;

          function StoreLangText(objLang, strAtrib, strArg) {
              try {
                   for(attribut in objLang)
                   {
                       if (typeof objLang[attribut] != "object" )
                       {
                           localStorage ['LPuNKTKit_' + strUniverse + '_LANG_' +
                                        strArg + '_' +
                                        attribut + '.' + strAtrib] = objLang[attribut];
                       }
                       else
                       {
                           StoreLangText(objLang[attribut], attribut, strArg);
                       }
                   }
              } catch(e) {
              }
          }

          function getUniverse() {
              try {
                   if (document.location.href.indexOf ('/game/index.php?page=') < 0)
                       return;

                   var metas = document.getElementsByTagName('META');

                   if (! metas) return;

                   var i;
                   for (i = 0; i < metas.length; i++)
                        if (metas[i].getAttribute('NAME') == "ogame-universe")
                            break;

                   if (metas[i])
                       var strUniv = metas[i].getAttribute('CONTENT').replace(/\./g,'_').toUpperCase()

                   else {
                       var strUniv = document.location.href.split (/\//) [2];
                           strUniv = strUniv.replace(/\./g,'_').toUpperCase();
                   }

                   return strUniv;

              } catch(e) {
              }
          }

          var strUniverse = getUniverse();

          localStorage ['LPuNKTKit_' + strUniverse + '_LANG'] = strLang;

          StoreLangText(objLang, '', strLang);

          return true;

    } catch (e) {
    }
}

StoreLangPack(LANG_PT, 'PT');