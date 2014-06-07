// ==UserScript==
// @name           usoCheckup - Brazilian Portuguese Translation Theme
// @description    Defines a custom Brazilian Portuguese language translation for usoCheckup.
// @version        0.0.5
// @license        GPL v3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @include        dummy
// ==/UserScript==

if (typeof usoCheckup != 'undefined') {
	switch (usoCheckup.strings('lang')) {
		case 'pt':
			if (navigator.language == 'pt-BR') {
				usoCheckup.strings({
					'updateAvailable': 'Uma atualização está disponível.',
					'updateUnavailable': 'Nenhuma atualização disponível.',
					'updateMismatched': 'ATENÇÃO: Os metadados não correspondem!',
					'updateUnlisted': 'ATENÇÃO: O script não está listado!',
					'queryWidget': 'Verificar se há uma atualização.',
					'toggleWidget': 'Ativar/desativar atualização automática.',
					'updaterOff': 'A atualização automática está desativada.',
					'updaterOn': 'A atualização automática está ativada.',
					'showConfirm': 'Mostrar a página inicial do script?',
					'installConfirm': 'Instalar o script?',
					'closeMessage': 'Fechar esta mensagem?',
					'closeAllMessages': 'Fechar todas as mensagens?'
				});
			}
			break;
	}
}
