// ==UserScript==
// @name TeamMultiWarez.co - LinkChecker
// @description	Vérificateur de liens.
// @author Reek | http://www.teammultiwarez.co
// @version 1.0
// @license GPL version 3
// @require http://www.teammultiwarez.co/linkchecker/tmw_config.js
// @include *teammultiwarez.co*
// @exclude http*://*jheberg.net/file-manager
// @exclude *.fr*
// ==/UserScript==
/*========================================================
	Panel Setting
========================================================*/

GM_config.init('Configuration Des Hébergeurs' /* Script title */,
/* Settings object */
{
    // This would be accessed using GM_config.get('Name')
	'opt_multiup': 
	{
		'section': ['Tous les hébergeurs sont actif par défaut , Vous pouvez les décochez selon vos envies.'],
		'type': 'checkbox',
		'label': 'Multiup',
		'default': true // store a boolean
	},
	'opt_jheberg':
	{
		'type': 'checkbox',
		'label': 'Jheberg',
		'default': true // store a boolean
	},
	'opt_go4up':
	{
		'type': 'checkbox',
		'label': 'Go4up',
		'default': true // store a boolean
	},
	'opt_1Fichier':
	{
		'type': 'checkbox',
		'label': '1Fichier',
		'default': true // store a boolean
	},
	'opt_180upload':
	{
		'type': 'checkbox',
		'label': '180upload',
		'default': true // store a boolean
	},
	'opt_1st-Files':
	{
		'type': 'checkbox',
		'label': '1st-Files',
		'default': true // store a boolean
	},
	'opt_2Shared':
	{
		'type': 'checkbox',
		'label': '2Shared',
		'default': true // store a boolean
	},
	'opt_4Shared':
	{
		'type': 'checkbox',
		'label': '4Shared',
		'default': true // store a boolean
	},
	'opt_AlbaFile':
	{
		'type': 'checkbox',
		'label': 'AlbaFile',
		'default': true // store a boolean
	},
	'opt_AsFile':
	{
		'type': 'checkbox',
		'label': 'AsFile',
		'default': true // store a boolean
	},
	'opt_Baidu':
	{
		'type': 'checkbox',
		'label': 'Baidu',
		'default': true // store a boolean
	},
	'opt_BayFiles':
	{
		'type': 'checkbox',
		'label': 'BayFiles',
		'default': true // store a boolean
	},
	'opt_BeastShare':
	{
		'type': 'checkbox',
		'label': 'BeastShare',
		'default': true // store a boolean
	},
	'opt_BillionUploads':
	{
		'type': 'checkbox',
		'label': 'BillionUploads',
		'default': true // store a boolean
	},
	'opt_BitShare':
	{
		'type': 'checkbox',
		'label': 'BitShare',
		'default': true // store a boolean
	},
	'opt_Box':
	{
		'type': 'checkbox',
		'label': 'Box',
		'default': true // store a boolean
	},
	'opt_CloudZer':
	{
		'type': 'checkbox',
		'label': 'CloudZer',
		'default': true // store a boolean
	},
	'opt_CramItIn':
	{
		'type': 'checkbox',
		'label': 'CramItIn',
		'default': true // store a boolean
	},
	'opt_Crocko':
	{
		'type': 'checkbox',
		'label': 'Crocko',
		'default': true // store a boolean
	},
	'opt_CyberLocker':
	{
		'type': 'checkbox',
		'label': 'CyberLocker',
		'default': true // store a boolean
	},
	'opt_DateiTo':
	{
		'type': 'checkbox',
		'label': 'DateiTo',
		'default': true // store a boolean
	},
	'opt_DepositFiles':
	{
		'type': 'checkbox',
		'label': 'DepositFiles',
		'default': true // store a boolean
	},
	'opt_DivShare':
	{
		'type': 'checkbox',
		'label': 'DivShare',
		'default': true // store a boolean
	},
	'opt_DataFileHost':
	{
		'type': 'checkbox',
		'label': 'DataFileHost',
		'default': true // store a boolean
	},
	'opt_E-nautia':
	{
		'type': 'checkbox',
		'label': 'E-nautia',
		'default': true // store a boolean
	},
	'opt_EasyBytez':
	{
		'type': 'checkbox',
		'label': 'EasyBytez',
		'default': true // store a boolean
	},
	'opt_EgoFiles':
	{
		'type': 'checkbox',
		'label': 'EgoFiles',
		'default': true // store a boolean
	},
	'opt_Enjoybox':
	{
		'type': 'checkbox',
		'label': 'Enjoybox',
		'default': true // store a boolean
	},
	'opt_Extabit':
	{
		'type': 'checkbox',
		'label': 'Extabit',
		'default': true // store a boolean
	},
	'opt_FiberUpload':
	{
		'type': 'checkbox',
		'label': 'FiberUpload',
		'default': true // store a boolean
	},
	'opt_FileBox':
	{
		'type': 'checkbox',
		'label': 'FileBox',
		'default': true // store a boolean
	},
	'opt_FileCloud':
	{
		'type': 'checkbox',
		'label': 'FileCloud',
		'default': true // store a boolean
	},
	'opt_FileFactory':
	{
		'type': 'checkbox',
		'label': 'FileFactory',
		'default': true // store a boolean
	},
	'opt_FileFlyer':
	{
		'type': 'checkbox',
		'label': 'FileFlyer',
		'default': true // store a boolean
	},
	'opt_FileGag':
	{
		'type': 'checkbox',
		'label': 'FileGag',
		'default': true // store a boolean
	},
	'opt_FileOver':
	{
		'type': 'checkbox',
		'label': 'FileOver',
		'default': true // store a boolean
	},
	'opt_FileParadox':
	{
		'type': 'checkbox',
		'label': 'FileParadox',
		'default': true // store a boolean
	},
	'opt_FilePlaneta':
	{
		'type': 'checkbox',
		'label': 'FilePlaneta',
		'default': true // store a boolean
	},
	'opt_FilePost':
	{
		'type': 'checkbox',
		'label': 'FilePost',
		'default': true // store a boolean
	},
	'opt_FileRio':
	{
		'type': 'checkbox',
		'label': 'FileRio',
		'default': true // store a boolean
	},
	'opt_Files2Upload':
	{
		'type': 'checkbox',
		'label': 'Files2Upload',
		'default': true // store a boolean
	},
	'opt_FileSector':
	{
		'type': 'checkbox',
		'label': 'FileSector',
		'default': true // store a boolean
	},
	'opt_FilesFlash':
	{
		'type': 'checkbox',
		'label': 'FilesFlash',
		'default': true // store a boolean
	},
	'opt_FilesIn':
	{
		'type': 'checkbox',
		'label': 'FilesIn',
		'default': true // store a boolean
	},
	'opt_FileSony':
	{
		'type': 'checkbox',
		'label': 'FileSony',
		'default': true // store a boolean
	},
	'opt_FileSwap':
	{
		'type': 'checkbox',
		'label': 'FileSwap',
		'default': true // store a boolean
	},
	'opt_FileVice':
	{
		'type': 'checkbox',
		'label': 'FileVice',
		'default': true // store a boolean
	},
	'opt_Free':
	{
		'type': 'checkbox',
		'label': 'Free',
		'default': true // store a boolean
	},
	'opt_FreakShare':
	{
		'type': 'checkbox',
		'label': 'FreakShare',
		'default': true // store a boolean
	},
	'opt_FreeStorage':
	{
		'type': 'checkbox',
		'label': 'FreeStorage',
		'default': true // store a boolean
	},
	'opt_GigaUp':
	{
		'type': 'checkbox',
		'label': 'GigaUp',
		'default': true // store a boolean
	},
	'opt_GigaSize':
	{
		'type': 'checkbox',
		'label': 'GigaSize',
		'default': true // store a boolean
	},
	'opt_GigaUpload':
	{
		'type': 'checkbox',
		'label': 'GigaUpload',
		'default': true // store a boolean
	},
	'opt_GuizmoDl':
	{
		'type': 'checkbox',
		'label': 'GuizmoDl',
		'default': true // store a boolean
	},
	'opt_GrooveSharing':
	{
		'type': 'checkbox',
		'label': 'GrooveSharing',
		'default': true // store a boolean
	},
	'opt_HenchFile':
	{
		'type': 'checkbox',
		'label': 'HenchFile',
		'default': true // store a boolean
	},
	'opt_HipFile':
	{
		'type': 'checkbox',
		'label': 'HipFile',
		'default': true // store a boolean
	},
	'opt_HotFile':
	{
		'type': 'checkbox',
		'label': 'HotFile',
		'default': true // store a boolean
	},
	'opt_HugeFiles':
	{
		'type': 'checkbox',
		'label': 'HugeFiles',
		'default': true // store a boolean
	},
	'opt_JumboFiles':
	{
		'type': 'checkbox',
		'label': 'JumboFiles',
		'default': true // store a boolean
	},
	'opt_Keep2Share':
	{
		'type': 'checkbox',
		'label': 'Keep2Share',
		'default': true // store a boolean
	},
	'opt_LetItBit':
	{
		'type': 'checkbox',
		'label': 'LetItBit',
		'default': true // store a boolean
	},
	'opt_LuckyShare':
	{
		'type': 'checkbox',
		'label': 'LuckyShare',
		'default': true // store a boolean
	},
	'opt_LumFile':
	{
		'type': 'checkbox',
		'label': 'LumFile',
		'default': true // store a boolean
	},
	'opt_LoadTo':
	{
		'type': 'checkbox',
		'label': 'LoadTo',
		'default': true // store a boolean
	},
	'opt_MediaFire':
	{
		'type': 'checkbox',
		'label': 'MediaFire',
		'default': true // store a boolean
	},
	'opt_Mega':
	{
		'type': 'checkbox',
		'label': 'Mega',
		'default': true // store a boolean
	},
	'opt_MegaLoad':
	{
		'type': 'checkbox',
		'label': 'MegaLoad',
		'default': true // store a boolean
	},
	'opt_MegaShares':
	{
		'type': 'checkbox',
		'label': 'MegaShares',
		'default': true // store a boolean
	},
	'opt_MixtureCloud':
	{
		'type': 'checkbox',
		'label': 'MixtureCloud',
		'default': true // store a boolean
	},
	'opt_MyUpload':
	{
		'type': 'checkbox',
		'label': 'MyUpload',
		'default': true // store a boolean
	},
	'opt_Narod':
	{
		'type': 'checkbox',
		'label': 'Narod',
		'default': true // store a boolean
	},
	'opt_NetLoad':
	{
		'type': 'checkbox',
		'label': 'NetLoad',
		'default': true // store a boolean
	},
	'opt_NovaFile':
	{
		'type': 'checkbox',
		'label': 'NovaFile',
		'default': true // store a boolean
	},
	'opt_OteUpload':
	{
		'type': 'checkbox',
		'label': 'OteUpload',
		'default': true // store a boolean
	},
	'opt_PartageFacile':
	{
		'type': 'checkbox',
		'label': 'PartageFacile',
		'default': true // store a boolean
	},
	'opt_PureVid':
	{
		'type': 'checkbox',
		'label': 'PureVid',
		'default': true // store a boolean
	},
	'opt_PutLocker':
	{
		'type': 'checkbox',
		'label': 'PutLocker',
		'default': true // store a boolean
	},
	'opt_QueenShare':
	{
		'type': 'checkbox',
		'label': 'QueenShare',
		'default': true // store a boolean
	},
	'opt_RapidFileShare':
	{
		'type': 'checkbox',
		'label': 'RapidFileShare',
		'default': true // store a boolean
	},
	'opt_RapidGator':
	{
		'type': 'checkbox',
		'label': 'RapidGator',
		'default': true // store a boolean
	},
	'opt_RapidShare':
	{
		'type': 'checkbox',
		'label': 'RapidShare',
		'default': true // store a boolean
	},
	'opt_RareFile':
	{
		'type': 'checkbox',
		'label': 'RareFile',
		'default': true // store a boolean
	},
	'opt_RGhost':
	{
		'type': 'checkbox',
		'label': 'RGhost',
		'default': true // store a boolean
	},
	'opt_RnBLoad':
	{
		'type': 'checkbox',
		'label': 'RnBLoad',
		'default': true // store a boolean
	},
	'opt_RusFolder':
	{
		'type': 'checkbox',
		'label': 'RusFolder',
		'default': true // store a boolean
	},
	'opt_RyuShare':
	{
		'type': 'checkbox',
		'label': 'RyuShare',
		'default': true // store a boolean
	},
	'opt_SendMyWay':
	{
		'type': 'checkbox',
		'label': 'SendMyWay',
		'default': true // store a boolean
	},
	'opt_SendSpace':
	{
		'type': 'checkbox',
		'label': 'SendSpace',
		'default': true // store a boolean
	},
	'opt_ShareBeast':
	{
		'type': 'checkbox',
		'label': 'ShareBeast',
		'default': true // store a boolean
	},
	'opt_ShareFiles':
	{
		'type': 'checkbox',
		'label': 'ShareFiles',
		'default': true // store a boolean
	},
	'opt_ShareOnline':
	{
		'type': 'checkbox',
		'label': 'ShareOnline',
		'default': true // store a boolean
	},
	'opt_ShareSend':
	{
		'type': 'checkbox',
		'label': 'ShareSend',
		'default': true // store a boolean
	},
	'opt_SkyDrive':
	{
		'type': 'checkbox',
		'label': 'SkyDrive',
		'default': true // store a boolean
	},
	'opt_SlingFile':
	{
		'type': 'checkbox',
		'label': 'SlingFile',
		'default': true // store a boolean
	},
	'opt_SockShare':
	{
		'type': 'checkbox',
		'label': 'SockShare',
		'default': true // store a boolean
	},
	'opt_SolidFiles':
	{
		'type': 'checkbox',
		'label': 'SolidFiles',
		'default': true // store a boolean
	},
	'opt_TeraFiles':
	{
		'type': 'checkbox',
		'label': 'TeraFiles',
		'default': true // store a boolean
	},
	'opt_Ti1ca':
	{
		'type': 'checkbox',
		'label': 'Ti1ca',
		'default': true // store a boolean
	},
	'opt_TurboBit':
	{
		'type': 'checkbox',
		'label': 'TurboBit',
		'default': true // store a boolean
	},
	'opt_TusFiles':
	{
		'type': 'checkbox',
		'label': 'TusFiles',
		'default': true // store a boolean
	},
	'opt_Ufox':
	{
		'type': 'checkbox',
		'label': 'Ufox',
		'default': true // store a boolean
	},
	'opt_Uload':
	{
		'type': 'checkbox',
		'label': 'Uload',
		'default': true // store a boolean
	},
	'opt_UltraMegaBit':
	{
		'type': 'checkbox',
		'label': 'UltraMegaBit',
		'default': true // store a boolean
	},
	'opt_UpaFile':
	{
		'type': 'checkbox',
		'label': 'UpaFile',
		'default': true // store a boolean
	},
	'opt_Uploading':
	{
		'type': 'checkbox',
		'label': 'Uploading',
		'default': true // store a boolean
	},
	'opt_Uploaded':
	{
		'type': 'checkbox',
		'label': 'Uploaded',
		'default': true // store a boolean
	},
	'opt_UploadLux':
	{
		'type': 'checkbox',
		'label': 'UploadLux',
		'default': true // store a boolean
	},
	'opt_UploadMB':
	{
		'type': 'checkbox',
		'label': 'UploadMB',
		'default': true // store a boolean
	},
	'opt_Uploadoz':
	{
		'type': 'checkbox',
		'label': 'Uploadoz',
		'default': true // store a boolean
	},
	'opt_Uploking':
	{
		'type': 'checkbox',
		'label': 'Uploking',
		'default': true // store a boolean
	},
	'opt_UpToBox':
	{
		'type': 'checkbox',
		'label': 'UpToBox',
		'default': true // store a boolean
	},
	'opt_Verzend':
	{
		'type': 'checkbox',
		'label': 'Verzend',
		'default': true // store a boolean
	},
	'opt_Vip-File':
	{
		'type': 'checkbox',
		'label': 'Vip-File',
		'default': true // store a boolean
	},
	'opt_xDdisk':
	{
		'type': 'checkbox',
		'label': 'xDdisk',
		'default': true // store a boolean
	},
	'opt_Ziddu':
	{
		'type': 'checkbox',
		'label': 'Ziddu',
		'default': true // store a boolean
	},
	'opt_YouTube':
	{
		'type': 'checkbox',
		'label': 'YouTube',
		'default': true // store a boolean
	},
	'opt_ZippyShare':
	{
		'type': 'checkbox',
		'label': 'ZippyShare',
		'default': true // store a boolean
	},
	'opt_zShare':
	{
		'type': 'checkbox',
		'label': 'zShare',
		'default': true // store a boolean
	},
	'opt_DirectMirror':
	{
		'type': 'checkbox',
		'label': 'DirectMirror',
		'default': true // store a boolean
	},
	'opt_EmbedUpload':
	{
		'type': 'checkbox',
		'label': 'EmbedUpload',
		'default': true // store a boolean
	},
	'opt_Exoshare':
	{
		'type': 'checkbox',
		'label': 'Exoshare',
		'default': true // store a boolean
	},
	'opt_MaxMirror':
	{
		'type': 'checkbox',
		'label': 'MaxMirror',
		'default': true // store a boolean
	},
	'opt_Mirorii':
	{
		'type': 'checkbox',
		'label': 'Mirorii',
		'default': true // store a boolean
	},
	'opt_MirrorCreator':
	{
		'type': 'checkbox',
		'label': 'MirrorCreator',
		'default': true // store a boolean
	},
	'opt_MirrorUpload':
	{
		'type': 'checkbox',
		'label': 'MirrorUpload',
		'default': true // store a boolean
	},
	'opt_MirrorStack':
	{
		'type': 'checkbox',
		'label': 'MirrorStack',
		'default': true // store a boolean
	},
	'opt_MultiUpload':
	{
		'type': 'checkbox',
		'label': 'MultiUpload',
		'default': true // store a boolean
	},
	'opt_UploadMirrors':
	{
		'type': 'checkbox',
		'label': 'UploadMirrors',
		'default': true // store a boolean
	},
	'opt_AnonymTo':
	{
		'type': 'checkbox',
		'label': 'AnonymTo',
		'default': true // store a boolean
	},
	'opt_LinkCrypt':
	{
		'type': 'checkbox',
		'label': 'LinkCrypt',
		'default': true // store a boolean
	},
	'opt_LinkSave':
	{
		'type': 'checkbox',
		'label': 'LinkSave',
		'default': true // store a boolean
	},
	'opt_nCrypt':
	{
		'type': 'checkbox',
		'label': 'nCrypt',
		'default': true // store a boolean
	},
	'opt_ReviveLink':
	{
		'type': 'checkbox',
		'label': 'ReviveLink',
		'default': true // store a boolean
	},
	'opt_SafeLinking':
	{
		'type': 'checkbox',
		'label': 'SafeLinking',
		'default': true // store a boolean
	},
	'opt_SafeYourLink':
	{
		'type': 'checkbox',
		'label': 'SafeYourLink',
		'default': true // store a boolean
	},
	'opt_redirect':
	{
		'type': 'checkbox',
		'label': 'Redirection vers la page des liens',
		'default': false // store a boolean
	}
});

  // Menu GM_config dans Greasemonkey
  var openGM_config = function(){ GM_config.open(); }		
  GM_registerMenuCommand("LinkChecker TMW (Configuration)", openGM_config);


/*===================================================
	Icons
===================================================*/
  
  var icon = new Array();
  icon['Multiup'] = "http://i.imgur.com/WZJ0wbj.png";
  icon['Jheberg'] = "http://i.imgur.com/dTv2KIj.png";
  icon['Go4up'] = "http://i.imgur.com/ZYQgQSQ.png";
  icon['1Fichier'] = "";
  icon['180upload'] = "http://i.imgur.com/rAGxTNu.gif";
  icon['1st-Files'] = "http://i.imgur.com/rAGxTNu.gif";
  icon['2Shared'] = "http://i.imgur.com/rAGxTNu.gif";
  icon['4Shared'] = "http://i.imgur.com/rAGxTNu.gif";
  icon['AlbaFile'] = "http://i.imgur.com/rAGxTNu.gif";
  icon['AsFile'] = "http://i.imgur.com/rAGxTNu.gif";
  icon['Baidu'] = "http://i.imgur.com/rAGxTNu.gif";
  icon['BayFiles'] = "http://i.imgur.com/rAGxTNu.gif";
  icon['BeastShare'] = "http://i.imgur.com/rAGxTNu.gif";
  icon['BillionUploads'] = "http://i.imgur.com/rAGxTNu.gif";
  icon['BitShare'] = "http://i.imgur.com/rAGxTNu.gif";
  icon['Box'] = "http://i.imgur.com/rAGxTNu.gif";
  icon['CloudZer'] = "http://i.imgur.com/rAGxTNu.gif";
  icon['CramItIn'] = "http://i.imgur.com/rAGxTNu.gif";
  icon['Crocko'] = "http://i.imgur.com/rAGxTNu.gif";
  icon['CyberLocker'] = "http://i.imgur.com/rAGxTNu.gif";
  icon['DateiTo'] = "http://i.imgur.com/rAGxTNu.gif";
  icon['DepositFiles'] = "http://i.imgur.com/rAGxTNu.gif";
  icon['DivShare'] = "http://i.imgur.com/rAGxTNu.gif";
  icon['DataFileHost'] = "http://i.imgur.com/rAGxTNu.gif";
  icon['E-nautia'] = "http://i.imgur.com/rAGxTNu.gif";
  icon['EasyBytez'] = "http://i.imgur.com/rAGxTNu.gif";
  icon['EgoFiles'] = "http://i.imgur.com/rAGxTNu.gif";
  icon['Enjoybox'] = "http://i.imgur.com/rAGxTNu.gif";
  icon['Extabit'] = "http://i.imgur.com/rAGxTNu.gif";
  icon['FiberUpload'] = "http://i.imgur.com/rAGxTNu.gif";
  icon['FileBox'] = "http://i.imgur.com/rAGxTNu.gif";
  icon['FileCloud'] = "http://i.imgur.com/rAGxTNu.gif";
  icon['FileFactory'] = "http://i.imgur.com/rAGxTNu.gif";
  icon['FileFlyer'] = "http://i.imgur.com/rAGxTNu.gif";
  icon['FileGag'] = "http://i.imgur.com/rAGxTNu.gif";
  icon['FileOver'] = "http://i.imgur.com/rAGxTNu.gif";
  icon['FileParadox'] = "http://i.imgur.com/rAGxTNu.gif";
  icon['FilePlaneta'] = "http://i.imgur.com/rAGxTNu.gif";
  icon['FilePost'] = "http://i.imgur.com/rAGxTNu.gif";
  icon['FileRio'] = "http://i.imgur.com/rAGxTNu.gif";
  icon['Files2Upload'] = "http://i.imgur.com/rAGxTNu.gif";
  icon['FileSector'] = "http://i.imgur.com/rAGxTNu.gif";
  icon['FilesFlash'] = "http://i.imgur.com/rAGxTNu.gif";
  icon['FilesIn'] = "http://i.imgur.com/rAGxTNu.gif";
  icon['FileSony'] = "http://i.imgur.com/rAGxTNu.gif";
  icon['FileSwap'] = "http://i.imgur.com/rAGxTNu.gif";
  icon['FileVice'] = "http://i.imgur.com/rAGxTNu.gif";
  icon['Free'] = "http://i.imgur.com/rAGxTNu.gif";
  icon['FreakShare'] = "http://i.imgur.com/rAGxTNu.gif";
  icon['FreeStorage'] = "http://i.imgur.com/rAGxTNu.gif";
  icon['GigaUp'] = "http://i.imgur.com/rAGxTNu.gif";
  icon['GigaSize'] = "http://i.imgur.com/rAGxTNu.gif";
  icon['GigaUpload'] = "http://i.imgur.com/rAGxTNu.gif";
  icon['GuizmoDl'] = "http://i.imgur.com/rAGxTNu.gif";
  icon['GrooveSharing'] = "http://i.imgur.com/rAGxTNu.gif";
  icon['HenchFile'] = "http://i.imgur.com/rAGxTNu.gif";
  icon['HipFile'] = "http://i.imgur.com/rAGxTNu.gif";
  icon['HotFile'] = "http://i.imgur.com/rAGxTNu.gif";
  icon['HugeFiles'] = "http://i.imgur.com/rAGxTNu.gif";
  icon['JumboFiles'] = "http://i.imgur.com/rAGxTNu.gif";
  icon['Keep2Share'] = "http://i.imgur.com/rAGxTNu.gif";
  icon['LetItBit'] = "http://i.imgur.com/rAGxTNu.gif";
  icon['LuckyShare'] = "http://i.imgur.com/rAGxTNu.gif";
  icon['LumFile'] = "http://i.imgur.com/rAGxTNu.gif";
  icon['LoadTo'] = "http://i.imgur.com/rAGxTNu.gif";
  icon['MediaFire'] = "http://i.imgur.com/rAGxTNu.gif";
  icon['Mega'] = "http://i.imgur.com/rAGxTNu.gif";
  icon['MegaLoad'] = "http://i.imgur.com/rAGxTNu.gif";
  icon['MegaShares'] = "http://i.imgur.com/rAGxTNu.gif";
  icon['MixtureCloud'] = "http://i.imgur.com/rAGxTNu.gif";
  icon['MyUpload'] = "http://i.imgur.com/rAGxTNu.gif";
  icon['Narod'] = "http://i.imgur.com/rAGxTNu.gif";
  icon['NetLoad'] = "http://i.imgur.com/rAGxTNu.gif";
  icon['NovaFile'] = "http://i.imgur.com/rAGxTNu.gif";
  icon['OteUpload'] = "http://i.imgur.com/rAGxTNu.gif";
  icon['PartageFacile'] = "http://i.imgur.com/rAGxTNu.gif";
  icon['PureVid'] = "http://i.imgur.com/rAGxTNu.gif";
  icon['PutLocker'] = "http://i.imgur.com/rAGxTNu.gif";
  icon['QueenShare'] = "http://i.imgur.com/rAGxTNu.gif";
  icon['RapidFileShare'] = "http://i.imgur.com/rAGxTNu.gif";
  icon['RapidGator'] = "http://i.imgur.com/rAGxTNu.gif";
  icon['RapidShare'] = "http://i.imgur.com/rAGxTNu.gif";
  icon['RareFile'] = "http://i.imgur.com/rAGxTNu.gif";
  icon['RGhost'] = "http://i.imgur.com/rAGxTNu.gif";
  icon['RnBLoad'] = "http://i.imgur.com/rAGxTNu.gif";
  icon['RusFolder'] = "http://i.imgur.com/rAGxTNu.gif";
  icon['RyuShare'] = "http://i.imgur.com/rAGxTNu.gif";
  icon['SendMyWay'] = "http://i.imgur.com/rAGxTNu.gif";
  icon['SendSpace'] = "http://i.imgur.com/rAGxTNu.gif";
  icon['ShareBeast'] = "http://i.imgur.com/rAGxTNu.gif";
  icon['ShareFiles'] = "http://i.imgur.com/rAGxTNu.gif";
  icon['ShareOnline'] = "http://i.imgur.com/rAGxTNu.gif";
  icon['ShareSend'] = "http://i.imgur.com/rAGxTNu.gif";
  icon['SkyDrive'] = "http://i.imgur.com/rAGxTNu.gif";
  icon['SlingFile'] = "http://i.imgur.com/rAGxTNu.gif";
  icon['SockShare'] = "http://i.imgur.com/rAGxTNu.gif";
  icon['SolidFiles'] = "http://i.imgur.com/rAGxTNu.gif";
  icon['TeraFiles'] = "http://i.imgur.com/rAGxTNu.gif";
  icon['Ti1ca'] = "http://i.imgur.com/rAGxTNu.gif";
  icon['TurboBit'] = "http://i.imgur.com/rAGxTNu.gif";
  icon['TusFiles'] = "http://i.imgur.com/rAGxTNu.gif";
  icon['Ufox'] = "http://i.imgur.com/rAGxTNu.gif";
  icon['Uload'] = "http://i.imgur.com/rAGxTNu.gif";
  icon['UltraMegaBit'] = "http://i.imgur.com/rAGxTNu.gif";
  icon['UpaFile'] = "http://i.imgur.com/rAGxTNu.gif";
  icon['Uploading'] = "http://i.imgur.com/rAGxTNu.gif";
  icon['Uploaded'] = "http://i.imgur.com/rAGxTNu.gif";
  icon['UploadLux'] = "http://i.imgur.com/rAGxTNu.gif";
  icon['UploadMB'] = "http://i.imgur.com/rAGxTNu.gif";
  icon['Uploadoz'] = "http://i.imgur.com/rAGxTNu.gif";
  icon['Uploking'] = "http://i.imgur.com/rAGxTNu.gif";
  icon['UpToBox'] = "http://i.imgur.com/rAGxTNu.gif";
  icon['Verzend'] = "http://i.imgur.com/rAGxTNu.gif";
  icon['Vip-File'] = "http://i.imgur.com/rAGxTNu.gif";
  icon['xDdisk'] = "http://i.imgur.com/rAGxTNu.gif";
  icon['Ziddu'] = "http://i.imgur.com/rAGxTNu.gif";
  icon['YouTube'] = "http://i.imgur.com/rAGxTNu.gif";
  icon['ZippyShare'] = "http://i.imgur.com/rAGxTNu.gif";
  icon['zShare'] = "http://i.imgur.com/rAGxTNu.gif";
  icon['DirectMirror'] = "http://i.imgur.com/rAGxTNu.gif";
  icon['EmbedUpload'] = "http://i.imgur.com/rAGxTNu.gif";
  icon['Exoshare'] = "http://i.imgur.com/rAGxTNu.gif";
  icon['MaxMirror'] = "http://i.imgur.com/rAGxTNu.gif";
  icon['Mirorii'] = "http://i.imgur.com/rAGxTNu.gif";
  icon['MirrorCreator'] = "http://i.imgur.com/rAGxTNu.gif";
  icon['MirrorUpload'] = "http://i.imgur.com/rAGxTNu.gif";
  icon['MirrorStack'] = "http://i.imgur.com/rAGxTNu.gif";
  icon['MultiUpload'] = "http://i.imgur.com/rAGxTNu.gif";
  icon['UploadMirrors'] = "http://i.imgur.com/rAGxTNu.gif";
  icon['AnonymTo'] = "http://i.imgur.com/rAGxTNu.gif";
  icon['LinkCrypt'] = "http://i.imgur.com/rAGxTNu.gif";
  icon['LinkSave'] = "http://i.imgur.com/rAGxTNu.gif";
  icon['nCrypt'] = "http://i.imgur.com/rAGxTNu.gif";
  icon['ReviveLink'] = "http://i.imgur.com/rAGxTNu.gif";
  icon['SafeLinking'] = "http://i.imgur.com/rAGxTNu.gif";
  icon['SafeYourLink'] = "http://i.imgur.com/rAGxTNu.gif";
  icon['unavailable'] = "http://i.imgur.com/aJ7xBLM.png";  
  icon['alive'] = "http://i.imgur.com/BZeT6mV.png";
  icon['dead'] = "http://i.imgur.com/BXyiqJn.png";
  icon['checking'] = "http://i.imgur.com/h7GtOSi.gif";
  icon['uploading'] = "http://i.imgur.com/rAGxTNu.gif";

/*===================================================
	Function Check Links
===================================================*/

function check(oLink,link,host,referer,error) {
  // Checking
  var iHost = document.createElement('img');
      iHost.setAttribute('src', icon[host]);
      iHost.setAttribute('title', host);	  
	  iHost.setAttribute('style', 'margin-right:3px;');  
  var iStatus = document.createElement('img');
      iStatus.setAttribute('src', icon['checking']);
	  iStatus.setAttribute('style', 'margin-right:3px;');

      oLink.setAttribute('title', 'Checking...');		
      oLink.parentNode.insertBefore(iHost,oLink);
      oLink.parentNode.insertBefore(iStatus,oLink);
  
GM_xmlhttpRequest({
  method: "GET",
  url: link,
  headers: {
  "User-Agent": "Mozilla/5.0",
  "Accept": "text/xml",
  "Referer": referer
  },
  onload: function(response) {
  var res = response.responseText;
  var resStatus = response.status;  
  var iStatus = oLink.previousSibling;

  if (resStatus == 500 || resStatus == 503 || resStatus == 403) {
    // Unavailable
    iStatus.setAttribute('src', icon['unavailable']);   
    oLink.setAttribute('style', 'color:orange;');    
    oLink.setAttribute('title', host+': Vérification Impossible');
    //unsafeWindow.console.log('Unavailable -> '+res); // debug
  }
  else if(/(File currently uploading|Fichier en cours d'upload|Votre fichier est actuellement en attente d'upload|Votre fichier est en cours d'upload)/gi.test(res)) {
    // Uploading
    iStatus.setAttribute('src', icon['uploading']);   
    oLink.setAttribute('style', 'color:#0099ff;');    
    oLink.setAttribute('title', host+': Fichier en cours d\'upload');
  }
  else if(resStatus == 404 || error.test(res)) {
    // Dead
    iStatus.setAttribute('src', icon['dead']);   
    oLink.setAttribute('style', 'color:red; text-decoration:line-through;');    
    oLink.setAttribute('title', host+': Lien Mort');
    //unsafeWindow.console.log('Dead -> '+res); // debug
  }
  else if(resStatus == 200) {
    // Alive
    iStatus.setAttribute('src', icon['alive']);	
    oLink.setAttribute('style', 'color:green;');    
    oLink.setAttribute('title', host+': Lien Actif');
  }

  } // end onload
});
}  // end function


/*========================================================
	Run
========================================================*/
  
  // Redirect
  if(GM_config.get('opt_redirect')) {
    if(/multiup\.org\/[a-z]+\/download\//gi.test(window.location.href)) {
      var redirect = window.location.href.replace("/download/","/miror/")
      window.location.href=redirect;
    }
    else if(/jheberg\.net\/captcha\//gi.test(window.location.href)) {
      var redirect = window.location.href.replace("/captcha/","/download/")
      window.location.href=redirect;  
    }
  }

  // Catch Links
  var ankers = document.querySelectorAll("a[href*='multiup.org/fichiers/download/'],a[href*='multiup.org/download/'],a[href*='multiup.org/fr/download/'],a[href*='multiup.org/en/download/'],a[href*='jheberg.net/captcha/'],a[href*='jheberg.net/download/'],a[href*='go4up.com/dl/'],a[href*='go4up.com/link.php?id=']");

  // Parse Links
  for (var i=0; i<ankers.length; i++) {
    var oLink  = ankers[i];
	var link   = ankers[i].href;

	// Multiup
	if(/multiup\.org/.test(link)) {
	  // Make old links compatible
	  var hash = link.match(/[a-z0-9]{32}/i)[0];
      var link = link.replace(/\/?(fichiers|fr|en)?\/download\//i,"/fr/miror/");
      var link = link.replace(hash+"_",hash+"/");
	  
	  var host = "Multiup";
	  var referer = "http://www.multiup.org/";
	  var error = /(<div class="alert alert-error">|<span class="label label-important">)/gi;
	  
	  // Check Links
	  if(GM_config.get('opt_multiup')) {
        check(oLink,link,host,referer,error);
	  }
	}
	// Jheberg
	else if(/jheberg\.net/.test(link)) {	  
	  var host = "Jheberg";
	  var referer = "http://www.jheberg.net/";
	  var error = /Erreur 404/gi;
	  
	  // Check Links
	  if(GM_config.get('opt_jheberg')) {
        check(oLink,link,host,referer,error);
	  }
	}
	// go4up
	else if(/go4up\.com/.test(link)) {
	  var host = "Go4up";
	  var referer = "http://go4up.com/";
	  var error = /(The file you tryed to download does not exist or has been removed due to copyright infringement|This file is not present in our database, maybe it have been deleted by the owner or for dmca issue)/gi;
	  
	  // Check Links
	  if(GM_config.get('opt_go4up')) {
        check(oLink,link,host,referer,error);
	  }
	}
    //unsafeWindow.console.log(oLink);  // debug
    //unsafeWindow.console.log(link);  // debug	

  } // end for