var meta = <><![CDATA[
// ==UserScript==
// @name       Google++ Lite
// @namespace  http://www.5isharing.com/
// @version    1.7.3
// @description  Search more in Google
// @include    http://www.google.tld/search?*
// @include    http://www.google.tld/webhp?*
// @include    http://www.google.tld/#*
// @include    http://www.google.tld/ig?*
// @copyright  2009+, chrisyue
// @license    GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// ==/UserScript==
]]></>.toString();

var query;
if (query = /q=[^&]+/.exec(location)[0]) {
  if ('/search' == location.pathname) {
// then app runs:

// Dict
var dict = {
  'en': {
    'cn': 'zh',
    'tw': 'zh',
    'ru': 'ru',
    'fr': 'fr',
	  'pt': 'pt'
  },
  'Options': {
    'cn': '选项',
    'tw': '選項',
	  'pt': 'Opções'
  },
  'Help': {
    'cn': '帮助',
    'tw': '幫助',
    'fr': 'Aide',
	  'pt': 'Ajuda'
  },
  'Depends on': {
    'cn': '需要打开',
    'tw': '需要開啟',
    'fr': 'Dépend de ',
	  'pt': 'Depende de'
  },
  'Remove Sponsored Links': {
    'cn': '移除赞助商链接',
    'tw': '移除贊助商連結',
    'fr': 'Supprimer les liens sponsorisés',
	  'pt': 'Remover Links Patrocinados'
  },
  'Interface': {
    'cn': '界面',
    'tw': '介面'
  },
  'Show sidebar': {
    'cn': '显示侧栏',
    'tw': '顯示側欄',
    'fr': 'Afficher la barre latérale',
	  'pt': 'Exibir barra lateral'
  },
  'Colorful Search': {
    'cn': '炫彩背景色',
    'tw': '炫彩背景色',
    'fr': 'Recherche colorée',
	  'pt': 'Pesquisa colorida'
  },
  'Modules': {
    'cn': '模块',
    'tw': '模塊',
	  'pt': 'Módulos'
  },
  'Other Search Engines': {
    'cn': '其他搜索引擎连接',
    'tw': '其他搜尋器連結',
    'fr': 'Autres moteurs de recherches',
	  'pt': 'Outros Mecanismos de Busca'
  },
  '"Search related" to Top': {
    'cn': '复制"相关搜索"到顶部',
    'tw': '複製"相關搜尋"到頂部',
    'fr': '"Recherches associées" en haut',
	  'pt': '"Pesquisas relacionadas" no topo'
  },
  'Favicon': {
    'cn': '网站图标',
    'tw': '網頁圖標'
  },
  'Google Preview': {
    'cn': '网站缩略图',
    'tw': '網頁預覽'
  },
  'Style': {
    'cn': '样式',
    'tw': '樣式',
	  'pt': 'Estilo'
  },
  'Others': {
    'cn': '其他',
    'tw': '其他',
    'fr': 'Autres',
	  'pt': 'Outros'
  },
  'Autopagerize Compatible': {
    'cn': '兼容Autopagerize',
    'tw': '兼容Autopagerize',
	  'pt': 'Campatível com Autopagerize'
  },
  'About': {
    'cn': '关于',
    'tw': '關於',
    'fr': 'A propos',
	  'pt': 'Sobre'
  },
  'If you are not willing to refresh at once, click the shadow box around': {
    'cn': '如果您不想立即刷新页面，请点击周围阴影部分',
    'tw': '如果你不想立即重新載入，請點擊周圍陰影部分',
    'fr': 'Pour fermer cette fenêtre sans enregistrer les changement, cliquez autour de celle-ci.',
	  'pt': 'Se não pretende atualizar de uma vez, clique na sombra ao redor da caixa'
  },
  'Confirm &amp; Refresh': {
    'cn': '确定&amp;刷新',
    'tw': '確認&amp;重新載入',
    'fr': 'Confirmer &amp; Rafraîchir',
	  'pt': 'Confirmar &amp; Atualizar'
  },
  "Generates random light background colors for result lists.<br />\
The colors are grouped by domain(behaves like IE8 tab color). <br />\
Visit <a href=\"http://userscripts.org/scripts/show/52119\">Colorful Search</a>, \
another script of mine, for Google, Yahoo and Bing.": {
	
    'cn': "给搜索结果列表生成随机的淡背景色。<br />\
色彩按根域名分组，类似IE8标签色效果<br />\
此模块已经独立为一个单独的脚本，可用于Google, Yahoo, Bing<br />\
欢迎访问<a href=\"http://userscripts.org/scripts/show/52119\">Colorful Search</a>",
    'tw': "給搜尋結果列表生成隨機的淡背景色。<br />\
色彩俺跟域名分組，類似IE8標籤色效果<br />\
此模塊已經獨立為一個單獨的腳本，可用於Google, Yahoo, Bing<br />\
歡迎訪問<a href=\"http://userscripts.org/scripts/show/52119\">Colorful Search</a>",
    'fr': 'Génèrer des couleurs de fond au hasard pour la liste de résultats.<br />\
Les couleurs sont regroupées par domaine (se comporte comme onglet colorés de IE8).<br />\
Regarder <a href=\"http://userscripts.org/scripts/show/52119\">Colorful Search</a>, un autres de mes script pour Google, Yahoo et Bing.',
	  'pt': 'Gera cores de fundo claras para as listas de resultados.<br/>\
As cores são agrupadas por domínio (cores como as cores das abas do IE8).<br/>\
Visite <a href=\"http://userscripts.org/scripts/show/52119\">Colorful Search</a>, \
outro script meu para o Google, Yahoo e Bing.'
  },
  'The number in the text box specifies how many results to show': {
    'cn': '输入框的数字为需要显示的数量',
    'tw': '輸入框的數字為需要顯示的數量',
    'fr': 'Le nombre dans la zone de texte spécifie le nombre de résultats à montrer.',
	  'pt': 'O número na caixa de texto especifica quantos resultados mostrar'
  },
  'Show a list of definitions related to the keyword from Wikipedia.org': {
    'cn': '列出wikipedia.org上跟关键词相关的定义',
    'tw': '列出wikipedia.org上跟關鍵字相關的定義',
    'fr': 'Affiche une liste des définitions relatives à la  recherche depuis Wikipedia.org',
	  'pt': 'Exibe uma lista de definições da Wikipedia.org relacionadas à palavra-chave'
  },
  'Show Flickr result in sidebar': {
    'cn': '在侧栏显示Flickr相关搜索',
    'tw': '在側欄顯示Flickr相關搜索',
    'fr': 'Afficher les résultats Flickr dans la barre latérale',
	  'pt': 'Exibe resultados do Flickr na barra lateral'
  },
  'List other search engine links in sidebar.<br />\
If you want more search engines, check this <a href=\"http://userscripts.org/topics/38612\">post</a> out.<br />\
You can recover the default contents by clear the text box': {
    'cn': '在侧栏列出其他搜索引擎连接。<br />\
如果您想添加更多，请看<a href=\"http://userscripts.org/topics/38612\">这里</a><br />\
清空文本框可恢复默认内容',
    'tw': '在側欄列出其他搜尋器連結。<br />\
如果您想添加更多，請看<a href=\"http://userscripts.org/topics/38612\">這裡</a><br />\
清空文本框可恢復默認內容',
    'fr': 'Liste des liens des autres moteurs de recherche dans la barre latérale<br />\
Si vous voulez plus des moteurs de recherche, consultez ce <a href=\"http://userscripts.org/topics/38612\">post</a>.<br />\
Vous pouvez récupérer le contenu par défaut de cette boite.',
	  'pt': 'Lista links para outros mecanismos de busca na barra lateral.<br/>\
Se desejar mais mecanismos de busca, consulte este <a href=\"http://userscripts.org/topics/38612\">post</a>,<br/>\
Você pode recuperar o conteúdo padrão deixando a caixa de texto vazia'
  },
  'Clone "Search related" to top. Recommended for those who use Autopagerize\
 which makes you never see the "Search related"': {
    'cn': '复制"相关搜索"到顶部，建议使用Autopagerize的同学开启',
    'tw': '複製"相關搜尋"到頂部，建議使用Autopagerize的同學開啟',
    'fr': 'Afficher "Recherches associées" en haut.  Recommandé pour ceux qui utilisent Autopagerize.',
	  'pt': 'Clona "Pesquisas relacionadas" para o topo. Recomendado para aqueles que usam Autopagerize\
que faz com que você nunca veja o "Pesquisas relacionadas"'
  },
  'Show a page preview in result. Thanks to the service of googlepreview.com': {
    'cn': '显示网站缩略图。感谢googlepreview.com提供此服务',
    'tw': '顯示網頁縮略圖。感謝googlepreview.com提供此服務',
    'fr': 'Afficher un aperçu de la page dans le résultat. Merci au service de googlepreview.com',
	  'pt': 'Exibe uma previsualização da página no resultado. Graças ao serviço de googlepreview.com'
  },
  'Please put Autopagerize before Google++ to make it work': {
    'cn': '请把Autopagerize放在Google++的前面让此选项生效',
    'tw': '請把Autopagerize放於Google++的前面讓此選項生效',
    'fr': "S'il vous plaît laissez activé AutoPagerize",
	  'pt': 'Por favor, coloque Autopagerize antes do Google++ para fazê-lo funcionar'
  },
  'Script page': {
    'cn': '脚本发布页',
    'tw': '腳本發布頁',
    'fr': 'Page du script ',
	  'pt': 'Página do Script'
  },
  'Contact me': {
    'cn': '联系作者',
    'tw': '聯繫作者',
    'fr': 'Me contacter',
	  'pt': 'Contato'
  },
  'Archievement Unlocked: Install Google++': {
    'cn': '已获得成就：安装Google++',
    'tw': '達成成就：安裝Google++',
	  'pt': 'Archievement Unlocked: Install Google++'
  },
  'Auto version check': {
    'cn': '自动检测版本',
    'tw': '自動檢測版本',
    'fr': 'Vérifier automatiquement la version',
	  'pt': 'Verificar versão automaticamente'
  },
  'The interval of version checking, in days': {
    'cn': '相隔两次检查的间隔时间，单位天',
    'tw': '相隔兩次檢查的間隔時間，單位天',
    'fr': "Intervalle de vérification de nouvelle version (en jours)",
	  'pt': 'Intervalo de verificação de atualizações, em dias'
  },
  'Search ##KW## with ##ENGINE##': {
    'cn': '使用##ENGINE##搜索##KW##',
    'tw': '使用##ENGINE##搜尋##KW##',
    'fr': 'Chercher ##KW## avec ##ENGINE##',
	  'pt': 'Pesquisar ##KW## com ##ENGINE##'
  },
  'http://upload.wikimedia.org/wikipedia/en/b/bc/Wiki.png': {
    'cn': 'http://upload.wikimedia.org/wikipedia/zh/6/62/Wiki_zh-hans.png',
    'tw': 'http://upload.wikimedia.org/wikipedia/zh/b/bc/Wiki.png',
    'ru': 'http://upload.wikimedia.org/wikipedia/ru/b/bc/Wiki.png',
    'fr': 'http://upload.wikimedia.org/wikipedia/fr/b/bc/Wiki.png',
    'pt': 'http://upload.wikimedia.org/wikipedia/commons/6/61/Wikipedia-logo-pt.png'
  },
  'Next': {
    'cn': '下一页',
    'tw': '下一頁',
    'fr': 'Suivant',
	  'pt': 'Próximo'
  },
  'Prev': {
    'cn': '上一页',
    'tw': '上一頁',
    'fr': 'Précédant',
	  'pt': 'Anterior'
  },
  'loading...': {
    'cn': '载入中…',
    'tw': '載入中…',
    'fr': 'Chargement...',
	'pt': 'carregando...'
  },
  'Show help when click': {
    'cn': '点击查看帮助',
    'tw': '點擊查看幫助',
    'fr': "Afficher l'aide",
	  'pt': 'Clique para mostrar ajuda'
  },
  "No related definitions": {
    'cn': '无相关定义',
    'tw': '無相關定義',
    'fr': 'Aucune définition apparentée',
	  'pt': 'Nenhuma definição relacionada'
  },
  'No related pictures': {
    'cn': '无相关图片',
    'tw': '無相關圖片',
    'fr': 'Aucune image apparentée',
	  'pt': 'Nenhuma imagem relacionada'
  },
  'Just like Vim: j = prev, k = next, &lt;ENTER&gt; = open link, ? = to search box,\
&lt;ESC&gt; = leave search box': {
    'cn': '同vim：j上一条，k下一条，回车打开连接，?(shift-/)跳到搜索栏\
(如果只是/键与firefox默认快捷键有冲突)，Esc离开搜索栏',
    'tw': '同vim: j上一條，k下一條，&lt;ENTER&gt;打開連結，?跳到搜尋框，\
&lt;ESC&gt;離開搜尋框',
    'fr': 'j = précédant, k = suivant, &lt;ENTER&gt; = ouvrir, ? = rechercher, &lt;ESC&gt; = quitter la case de recherche',
	  'pt': 'Assim como Vim: j = anterior, k = próximo, &lt;ENTER&gt; = abrir link, ? = para a caixa de pesquisa,\
&lt;ESC&gt; = deixar caixa de pesquisa'
  },
  'Multi Columns': {
    'cn': '多列显示',
    'tw': '多列顯示',
    'fr': 'Multi colonnes',
	  'pt': 'Muilti-Colunas'
  },
  "If you've got a wider screen, you'd better to set 2 cols or more to get better layout": {
    'cn': '如果您使用较高分辨率显示器，设置2列以上显示会有更好看的布局效果',
    'tw': '如果您使用較高清晰度顯示器，設置2列以上顯示會有更好看的佈局效果',
    'fr': 'Si vous avez un écran plus large, vous feriez mieux de mettre 2 colonnes ou plus pour obtenir une meilleure mise en page',
	  'pt': 'Se você tiver uma tela mais larga, você pode definir 2 colunas ou mais para um layout melhor'
  },
  'Shortcut': {
    'cn': '快捷键',
    'tw': '快捷鍵',
    'fr': 'Raccourci',
	  'pt': 'Atalho'
  },
  "Style Customization": {
    'cn': '自定义样式',
    'tw': '自定義樣式',
    'fr': 'Style de personnalisation',
	  'pt': 'Personalização de Estilo'
  },
  "Fixed Search": {
    'cn': '固定搜索框',
    'tw': '固定搜尋框',
    'fr': 'Barre de recherche fixée',
	  'pt': 'Pesquisa Fixa'
  },
  "Make the search bar fixed at the top of the window.<br />\
Set this option on may cause the mouse wheel scrolling unsmoothly and slowly": {
    'cn': '使搜索输入框固定在顶部。<br />\
开启此选项可能会让滚动变得有点卡',
    'tw': '使搜尋輸入框固定在頂部。<br />\
開啟此選項可能會讓滾動不流暢',
    'fr': 'Fixer la barre de recherche en haut de la fenêtre.',
	  'pt': 'Torna a barra de pesquisa fixa no topo da janela<br/>\
Definir esta opção pode fazer com que a rolagem da roda do mouse fique sem suavidade e lenta'
  },
  "No Right Margin": {
    'cn': '消除右边距',
    'tw': '消除右邊框',
    'fr': 'Pas de marge à droite',
	  'pt': 'Sem Margem à Direita'
  },
  "Remove the right margin of the page": {
    'cn': '消除页面右边的空白',
    'tw': '消除頁面右邊的空白',
    'fr': 'Supprime la marge à droite de la page.',
	  'pt': 'Remove a margem direita da página'
  },
  "Fix Search Position": {
    'cn': '调整搜索框位置',
    'tw': '調整搜尋框位置',
    'fr': 'Fixer la position de la recherche',
	  'pt': 'Consertar Posição da Pesquisa'
  },
  'When "Fixed Search" is on, some users who use for example, Google Taiwan, Google France may have found that the search options below the search box is under the blue search status bar. If this problem bothers you, check this on': {
    'cn': '当开启固定搜索框时，有些使用比如说google台湾的用户会发现搜索选项被蓝色搜索状态栏挡住了。开启此选项可以解决这个问题',
    'tw': '當開啟固定搜索框時，有些使用比如說google台灣的用戶會發現搜尋選項被藍色搜尋狀態欄擋住了。開啟此選項可以解決這個問題',
    'fr': 'Quand "Barre de recherche fixée" est activé, certains utilisateurs qui utilisent par exemple Google Taiwan ou Google France peuvent avoir constaté que les options de recherche au-dessous de la boîte de recherche sont sous la barre de statut de recherche bleue. Si ce problème vous tracasse, activer cette option.',
	  'pt': 'Quando a "Pesquisa Fixa" está ativada, alguns usuários que usam por exemplo o Google Taiwan, Google France ou Google Brasil podem ter percebido que as opções de busca abaixo da caixa de pesquisa estão abaixo da barra de status de pesquisa azul. Se este problema te incomoda, marque esta caixa'
  },
  "Classic Logo": {
    'cn': '经典Logo',
    'tw': '經典Logo',
    'fr': 'Logo classique',
	  'pt': 'Logo Clássico'
  },
  "I know some one don't like the classic Google++ logo, but I like it.<br />\
So if you like it too, check this on": {
    'cn': '我知道有的朋友并不喜欢以前的Logo，但是我是很喜欢的。<br />\
如果您跟我一样喜欢，请开启此选项',
    'tw': '我知道有的朋友並不喜歡以前的Logo，但是我是很喜歡的。<br />\
如果您跟我一樣喜歡，請開啟此選項',
    'fr': "Je connais quelqu'un n'aime pas le logo Google++ classique, mais je l'aime bien.<br />\
Donc, si vous l'aimez aussi, activer le.",
	  'pt': 'Eu sei que alguem nao gosta do logo clássico do Google++, mas eu gosto.<br/>\
Então, se você gosta também, marque esta caixa'
  },
  'If you are familiar with css, you can write your own css here.<br />\
Click <a href="http://userscripts.org/topics/38189">here</a> to look for more styles.': {
    'cn': '如果您会css您可以在这里编辑自己的css样式。<br />\
将此文本框清空可以恢复默认的css样式。<br />\
点击<a href="http://userscripts.org/topics/38189">这里</a>可以获得更多的样式。',
    'tw': '如果您會css您可以在這裡編輯自己的css樣式。<br />\
將此文本框清空可以恢復默認的css樣式。<br />\
點擊<a href="http://userscripts.org/topics/38189">這裡</a>可以獲得更多的樣式。',
    'fr': 'Si vous êtes familiarisés avec le CSS, vous pouvez écrire votre propre code CSS ici.<br />\
Cliquez <a href="http://userscripts.org/topics/38189">ici</a> pour chercher plus de styles.',
	  'pt': 'Se você tem familiaridade com CSS, você pode escrever seu próprio CSS aqui.<br/>\
Clique <a href="http://userscript.org/topics/38189">aqui</a> para procurar por mais estilos.'
  },
  'Number results': {
    'cn': '结果添加号码',
    'tw': '結果添加號碼',
    'fr': 'Nombre de résultats',
	  'pt': 'Numerar resultados'
  }
};

// ==Functions==
function culture()
{
  var ret = 'en';
  switch (n('btnG')[0].value) {
    case '搜尋':
      ret = 'tw'; break;
    case 'Google 搜索':
      ret = 'cn'; break;
    case 'Поиск':
      ret = 'ru'; break;
    case 'Rechercher':
      ret = 'fr'; break;
    case 'Pesquisa Google':
      ret = 'pt'; break;
	  case 'Pesquisar':
      ret = 'pt'; break;
    default:
  }
  
  return ret;
}

function $(id)
{
  return document.getElementById(id);
}

function c(cls, parent)
{
  return (parent || document).getElementsByClassName(cls);
}

function t(tag, parent)
{
  return (parent || document).getElementsByTagName(tag);
}

function n(name)
{
  return document.getElementsByName(name);
}

function x(xpath, element, type, result)
{
  return document.evaluate(xpath, element || document, 
               null,  type || 7, result);
}

function create(type)
{
  return document.createElement(type);
}

function createText(text)
{
  return document.createTextNode(text);
}

function remove(elm)
{
  if (!elm) return;
  if (elm.snapshotItem) {
    for (var i = 0; i < elm.snapshotLength; i++) {
      remove(elm.snapshotItem(i));
    }
  } else if (elm[0]) {
    while (elm[0]) {
      remove(elm[0]);
    }
  } else {
    elm.parentNode.removeChild(elm);
  }
}

function append(elm, parent, first)
{
  if (elm.snapshotItem) {
    for (var i = 0; i < elm.snapshotLength; i++) {
      append(elm.snapshotItem(i), parent, first);
    }
  } else if (elm[0]) {
    for (var i = 0; i < elm.length; i++) {
      append(elm[i], parent, first);
    }
  } else {
    if (first && parent.firstChild) {
      parent.insertBefore(elm, parent.firstChild);
    } else {
      parent.appendChild(elm);
    }
  }
}

function clear(elm)
{
  while (elm.firstChild) remove(elm.firstChild);
}

function before(n, o)
{
  o.parentNode.insertBefore(n, o);
}

function after(n, o)
{
  o.nextSibling ? before(n, o.nextSibling) : append(n, o.parentNode);
}

function gm(name, value)
{
  var ret;
  if ((ret = GM_getValue(name)) || typeof ret == "boolean") {
    return ret;
  }
  return value;
}

function __(en)
{
  return dict[en] ? dict[en][culture()] || en : en;
}

function getTld(hostname)
{
  // a very easy way, not very accurate
  var hostParts = hostname.split(".");
  if (hostParts.length < 3) return hostname;
  // this info must be no mistake 'cause it is from wiki
  var gTLD = ["aero", "asia", "cat", "coop", "int", "com", "net", "org", "gov", "edu", 
        "biz", "info", "name", "jobs", "mil", "mobi", "museum", "pro", "tel", "travel"];
  var rootDomain = hostParts[hostParts.length - 2] + "."
           + hostParts[hostParts.length - 1];
  if (gTLD.hasGot(hostParts[hostParts.length - 2])) {
    rootDomain = hostParts[hostParts.length - 3] + "." 
           + rootDomain;
  }
  return rootDomain;
}

function parseHeaders(metadataBlock)
{
  var headers = {};
  var line, name, prefix, header, key, value;

  var lines = metadataBlock.split(/\n/).filter(/\/\/ @/);
  for (var i = 0; i < lines.length; i++) {
    line = lines[i];
    [, name, value] = line.match(/\/\/ @(\S+)\s*(.*)/);

    switch (name) {
      case "licence":
        name = "license";
        break;
    }

    [key, prefix] = name.split(/:/).reverse();

    if (prefix) {
      if (!headers[prefix]) 
        headers[prefix] = new Object;
      header = headers[prefix];
    } else
      header = headers;

    if (header[key] && !(header[key] instanceof Array))
      header[key] = new Array(header[key]);

    if (header[key] instanceof Array)
      header[key].push(value);
    else
      header[key] = value;
  }

  headers["licence"] = headers["license"];

  return headers;
}

Array.prototype.hasGot = function(value) {
  for (var i = 0; i < this.length; i++) {
    if (this[i] == value) return true;
  }
  return false;
}
// ==/Functions==


// What's in Google
var google = {

  keyword: function() {
    return n("q")[0].value;
  },
  
  divres: function() {
    return $("res");
  },

  colorless: function() {
    return x("//div[@id='res']/div/ol/li[starts-with(@class, 'g')][not(@colorized)]|//div[@class='e'][not(@colorized)]|//td[@class='g'][not(@colorized)]");
  },
  
  results: function() {
    return x("//li[starts-with(@class, 'g')]|//div[@class='e']");
  },
  
  body: function() {
    return document.body;
  },
  
  related: function() {
    return x("//li[starts-with(@class, 'g')][1]/ancestor::div[1]/following-sibling::div[@class='e'][1]").snapshotItem(0);
  },
  
  sponsors: function() {
    return $("mbEnd");
  },
  
  sponsors2: function() {
    return $("tads");
  },

  sponsors3: function() {
    return $("tadsb");
  },
  
  get: function(name, refresh) {
    var ret;
    var code = <><![CDATA[
    if (this._name == null || refresh) {
      this._name = this.name();
    }
    ret = this._name;
]]></>.toString();
    eval(code.replace(/name/g, name));
    return ret;
  },

  getTitles: function(not) {
    return x("//li[starts-with(@class, 'g')][not(@" 
         + not 
         + ")]/h3/a[not(img)][1]|//td[starts-with(@class, 'g')][not(@"
         + not
         + ")]/h3/a[not(img)][1]");
  }
};

var resource = {
  logo: '<span class="gpp-logo"><span class="gpp-logo-g">G</span><span class="gpp-logo-o">o</span><span class="gpp-logo-o2">o</span><span class="gpp-logo-g">g</span><span class="gpp-logo-l">l</span><span class="gpp-logo-e">e</span><span class="gpp-logo-plus">+</span><span class="gpp-logo-plus2">+</span></span>',
  loadImage: "data:image/gif;base64,R0lGODlhIgAiAPQAADk5OVJSUlpaWmtra3t7e4SEhIyMjJSUlJycnKWlpa2trbW1tb29vcbGxs7OztbW1t7e3ufn5%2B%2Fv7%2Ff39%2F%2F%2F%2FwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAgFAAAAIf8LTkVUU0NBUEUyLjADAQAAACwAAAAAIgAiAAAFhiAljmRJLYmprqx4AG1cBgb5yjjVCDacxxKBYnT7lQoI0mBA9BlHEOToIYC4nE9RNCUa1CjFLLTAdQQmYKyYshUJkodAVhFBQwkpB2OtSygYEVMFVnwjDSh0hSwSDX6EiioOj5CUJRIPEJiamJATERESn6CflaWmp6ipqqusra6vsLGys6ohACH5BAgFAAAALAAAAAAiACIAhCEhISkpKVpaWmNjY2tra3Nzc4SEhIyMjJSUlKWlpa2trbW1tb29vcbGxs7OztbW1t7e3ufn5%2B%2Fv7%2Ff39%2F%2F%2F%2FwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWTICWOZElJiqmuZkMqAiurUPHG4wNEM2ukIsWAJAj0SBPSwzASjiQA15HyUCRFEoPUKSIApqNF4kpBALkUwAIctoqWSW4BQGYv3BTDmhs4sEsKQAx%2BCjYJABBTDg91EwprKCQJBGwQixIjjg5%2FLBAPDhF1nCwRDw%2BJoz0SmKmtrq%2BwsbKztLW2t7i5uru8vb6%2FwL4hACH5BAgFAAAALAAAAAAiACIAhCEhISkpKTk5OUJCQkpKSlJSUlpaWmNjY3Nzc4SEhIyMjJSUlJycnK2trbW1tb29vcbGxs7OztbW1t7e3ufn5%2B%2Fv7%2Ff39%2F%2F%2F%2FwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWT4CWOZCk6ZqqaFAkha5xSjJuQiiHHTTRCt1FBsltNGj%2BYaKEriiQTUoXRugBHB%2BSoEpBFoiMHRPQSPQqVEQUg2H3VNWswobxMAIOiBTrqXR43FQU%2BdnhOFxZvFxFIEAsXDE0SAASHIntRFYRmPpMFliOJVSkAn6BOQaeqq6ytrq%2BwsbKztLW2t7i5uru8vb6%2FwIchACH5BAgFAAAALAAAAAAiACIAhCEhIUJCQlJSUlpaWnNzc4SEhIyMjJSUlJycnKWlpa2trbW1tb29vcbGxs7OztbW1t7e3ufn5%2B%2Fv7%2Ff39%2F%2F%2F%2FwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWVICWOZCk2Zqqu4qOwcDk55JOQShGvTzS6JMNrl3o8frdWwUc0TR6T1pCCMJAag2YL0kpKCtyTYEqUHClASm6kGBy0I4fPJiqcGQOyFnKEvBYFUW0IcCQTTCIONHiEJBIMhSUSAo0iDAEAABKRJEwSCpkBBJwmDgKZBIikJAUBOquwsbKztLW2t7i5uru8vb6%2FwMHCsCEAIfkECAUAAAAsAAAAACIAIgCEISEhKSkpQkJCWlpaY2Nja2tre3t7hISEjIyMlJSUnJycra2ttbW1vb29xsbGzs7O1tbW3t7e5%2Bfn7%2B%2Fv9%2Ff3%2F%2F%2F%2FAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABYlgJY5kKU5mqq7nw76vBJGRAt%2FV5I4Ng8OyEWUh%2Bb0mM5FjQaIcjKWgSFE8GRJQkk70YJ4O2OxISrXaxKNJpNKlVCSHM7oUcbzjpQdhPsKfHAMDT3wVDVwGgQluhCIQBAMFcowiDAlrk5g4CZucnIt8AgEAogClAAiZqaqrrK2ur7CxsrO0tbavIQAh%2BQQIBQAAACwAAAAAIgAiAIQhISEpKSlKSkpra2t7e3uEhISMjIyUlJScnJylpaWtra21tbW9vb3GxsbOzs7W1tbe3t7n5%2Bfv7%2B%2F39%2Ff%2F%2F%2F8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFjCAljmRpnmiqriwbPW1cOpJsS7AtQxA5KbqUYzL6LYInSI4iURyRpkeN6YSaIg6RJMGwmiTEZte3tHJJkAOh4BVlmY8CIVH2QhCFArBdYiQafIE6BwaFBgSIBGNehAYIj48Lb4KUIgkElSQKAAADPZkUCgEAAgagFAwCnAOnEQsARKeys7S1tre4uYEhACH5BAgFAAAALAAAAAAiACIAhCEhIUJCQkpKSlJSUlpaWmNjY2tra4yMjJSUlJycnK2trbW1tb29vcbGxs7OztbW1t7e3ufn5%2B%2Fv7%2Ff39%2F%2F%2F%2FwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWEICWOZGmeaKqubOu%2BcCzP6EOvk2Pf6PRAvN4vePIBiSVjMkIcjiILRYIoEU0gUsaRGGEkFI4JcvRg7MboVYOxbrjd1WDiQK%2FTGen8ArFNPwoDBVNoYhQPCQQDCExBCgANIzmJBkQEAA4lEINBlph5IgMAZ3mhfWkCAKZoAQCfrq%2BwsS8hACH5BAgFAAAALAAAAAAiACIAhCEhIUJCQkpKSlJSUlpaWnNzc4SEhIyMjJSUlJycnKWlpa2trbW1tb29vcbGxs7OztbW1t7e3ufn5%2B%2Fv7%2Ff39%2F%2F%2F%2FwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWCYCWOZGmeaKqubOu%2BcCzPdG3feK7T1D5SkcfDN4E8IhId0Jj0SZC%2BaCoCqVqrucVCse0qHNLdgxGuPAwFxoQoghgMCUhOMmiMIgjDYVEzgBMDfCMTDQY1AQMiCQR2OggAaxWLgjkAlAuBOgUAJIAIcwCNIgsEOgIBZZuRUqFlPWUsIQAh%2BQQIBQAAACwAAAAAIgAiAIQxMTFSUlJaWlpjY2Nzc3OEhISMjIyUlJScnJylpaWtra21tbW9vb3GxsbOzs7W1tbe3t7n5%2Bfv7%2B%2F39%2Ff%2F%2F%2F8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFgSAljmRpnmiqrmzrvnAsz3Rt33iu73zv%2F8DgSRIhGosTHOTBbDIjwhvEAYQkFI2kD6JIMCA5BwEqiiwU2BqDmiiARxKrLHCgHAQiRIFsA9QlAVQUenw0fiIFBCN6En11FA4BfAgEWjOHIgMIJHo1mHYCljefFIE6pAZ4OaQ8B28uIQAh%2BQQIBQAAACwAAAAAIgAiAIQhISEpKSlCQkJSUlJaWlpjY2Nra2tzc3N7e3uEhISMjIyUlJScnJylpaWtra21tbW9vb3GxsbW1tbe3t7n5%2Bfv7%2B%2F39%2Ff%2F%2F%2F8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFkOAljmRpnmiqrmzrvnAsz3Rt33iu73zv%2F8CgcEgcVShAS0QyqfwskigSR2k4RRaKJDJtRRqkyOQCcXSxkhfgcHEg2gpR%2BSqDAJAOw2WSmEKsMwIDInkiCg4jfxYxEwAPhAUiDwmLkg6VLgwBIw6RIglpIw9gamyQnAk1diSdIxYJYzMBnoQEJAsLOg62T4gvIQAh%2BQQIBQAAACwAAAAAIgAiAIQhISFaWlpjY2Nzc3N7e3uEhISMjIycnJylpaWtra21tbW9vb3GxsbOzs7W1tbe3t7n5%2Bfv7%2B%2F39%2Ff%2F%2F%2F8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFkeAkjmRpnmiqrmzrvnAsz3Rt33iu73zv%2F8CgcEgs2hpAAiCCkjQkM6Vi4kiQHJDJw8GEDQDWycAwSSwmjKm20W19DyJIAHmYPhLdbVv1Hi0CIgdnZQ4jD2wrXwgkAXATCGoNYSJ6KgCOIg0BUBOCIwhZhkgvAgWfkwyTMhEBg2WuEqA0miQIqgqjOAquPQy5LSEAIfkECAUAAAAsAAAAACIAIgCEISEhMTExOTk5SkpKWlpaY2Nja2trc3Nze3t7hISEjIyMnJycra2ttbW1vb29xsbGzs7O1tbW3t7e5%2Bfn7%2B%2Fv9%2Ff3%2F%2F%2F%2FAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABY%2BgJY5kaZ5oqq5s675wLM90bd94ru987%2F%2FAoHCIexgWPUQAIHjoJgYAoAARVXADaeMqigwit2ZJQkhYJNURhTuTDMyWRMPiAEvAs0m5m7gywBURbC8TAwgjC0gWDXgREzEUBAdqCXh%2FIhNpL5IkEHCLeBYRFDYJDCOXInc1EocjjJ2DMAqnqKFntzapPoIwIQAh%2BQQIBQAAACwAAAAAIgAiAIQ5OTlSUlJaWlpra2t7e3uEhISMjIyUlJScnJylpaWtra29vb3GxsbOzs7W1tbe3t7n5%2Bfv7%2B%2F39%2Ff%2F%2F%2F8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFguAkjmRpnmiqrmzrvnAsz3Rt33iu73zv%2F0DYAUAsEgO4xWHJZAaDEsSi9zAEBI7dYRAYNEQPnEEgIGRFiYLkJmhESOnsI6xLEOiK7%2BNtQxToDwkiDhB9fyMKDGCFNH50ExAKfA58M4cjCwojlDoSeZuMOBCCIw%2BhN4kknD%2BrPhGVLSEAIfkECAUAAAAsAAAAACIAIgCEISEhKSkpQkJCWlpaY2Nja2trc3Nze3t7hISEjIyMlJSUpaWlra2ttbW1vb29xsbG1tbW3t7e5%2Bfn7%2B%2Fv9%2Ff3%2F%2F%2F%2FAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABYRgJY5kaZ5oqq5s675wLM90bd94HgMOpZcEAAAB%2BZEMAYDAYRw9BkJmszI5LKY%2FCmPL5eIYA4K4QC4ksOhRhCH9NRIIRUQ3YSAQDIloflPciyMODDhyJYJ6FBM%2FDguKFRB6OQ0MjhMPOow%2Be3w3k5oVFBCONwyfFRKAUw%2BRTaFoq2mxNyEAIfkECAUAAAAsAAAAACIAIgCEISEhWlpaY2Njc3Nze3t7hISEjIyMnJycpaWlra2ttbW1vb29xsbGzs7O1tbW3t7e5%2Bfn7%2B%2Fv9%2Ff3%2F%2F%2F%2FAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABYLgJI5kaZ5oqq5s675wLJPAMLdIfbOHvqsK3w%2B1ABCGokakFBQgAwFBgxRkIBcF6AIiWiJFEoMgMHB8TQ1D4swmOQ4IBFyOWA8bi8RCwc8v2oApDwxmbQ0JCQpcXxIMdQ5eEkiICYsiD4U%2FSiWYXm2dgaCAmJKjkIETDpaorK2ur4AhACH5BAgFAAAALAAAAAAiACIAhCEhITExMTk5OVJSUlpaWmNjY2tra3Nzc3t7e4SEhIyMjJycnKWlpa2trbW1tb29vcbGxs7OztbW1t7e3ufn5%2B%2Fv7%2Ff39%2F%2F%2F%2FwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWM4CWOZGmeaKqurDCw8PkAVWyPgHGrRD06gF3qMKCMKgCEEHUgGEWFwBKFKIoggMj0VJ2IArqpwktKDCQXiGLLSCQivkuCYNmSGu4FOm03QdoJZH0mFQ5ag4gnEg4ODYyODQ%2BDFhKVlpaJmTAWFHGJFJaefRMSEROidqQRdZoXEqytsbKztLW2t7i5tCEAOw%3D%3D"
}

var modules = {

  config: {
    name: "config",
    
    groups: [
      { title: __("Interface"), color: "#ffd" },
      { title: __("Modules"),   color: "#dfd" },
      { title: __("Style"),   color: "#fdf" },
      { title: __("Others"),  color: "#ddf" },
      { title: __("About"),   color: "#dff" }
    ],
    
    btn: function() {
      if (!this._btn) {
        this._btn = create("a");
        with (this._btn) {
          id = "gpp-config-btn";
          innerHTML = resource.logo + ' ' + __('Options');
          href = "javascript:void(0)";
          addEventListener("click", function() {
            with (modules.config) {
              shadow().show();
              panel().show();
              about();
            }
          }, false);
        }
      }
      return this._btn;
    },
    
    about: function() {
      if (!this._about) {
        var helpBody = x(".//table[last()]/tbody[1]", this.options()).snapshotItem(0);
        var p = create("p"); this._about = p;
        with (p) {
          innerHTML = ('##LOGO## v##VERSION##'
            + '<br />'
            + '<a target="_blank"'
            + '  href="http://userscripts.org/scripts/show/59333">'
            + '  ##PAGE##(userscripts.org)'
            + '</a>'
            + '<br />'
            + '<a href="mailto:blizzchris@gmail.com">'
            + '  ##EMAIL##'
            + '</a>'
            + '<br />'
            + '##INTRO##'
            + '<br />'
            + 'Translator(s) of'
            + '<br />&nbsp;&nbsp;French: Sylvain'
            + '<br />&nbsp;&nbsp;Portuguese: Brazilian Guy').replace(/##VERSION##/, modules.version.local())
              .replace(/##LOGO##/, resource.logo)
              .replace(/##PAGE##/, __("Script page"))
              .replace(/##EMAIL##/, __("Contact me"))
              .replace(/##INTRO##/, __("Archievement Unlocked: Install Google++"));
          // in loving memory of Michael Jackson the King of Pop ...
          addEventListener("dblclick", function() { 
            alert("19588292009625"); 
          }, false);
        }
        var tr = create("tr"); append(tr, helpBody, true);
        var td = create("td"); append(td, tr);
        var td = create("td"); append(td, tr);
        append(p, td);
      }
    },
    
    panel: function() {
      if (!this._panel) {
        this._panel = create("div");

        this._panel.show = function() {
          if (this.style.display == "none") {
            this.style.display = "";
          } else {
            this.init();
          }
          this.adjustPos();
        }
        
        this._panel.hide = function() {
          this.style.display = "none";
        }
        
        this._panel.init = function() {
          with (this.style) {
            width = "470px";
            height = "470px";
            padding = "20px"; border = "1px solid #ccf"; background = "#fff";
            position = "fixed"; zIndex = 2000; MozBorderRadius = "10px";
          }
          append(this, google.get("body"));
          var form = create("form"); form.id = "gpp-config-form"; append(form, this);
          var css = <><![CDATA[
            #gpp-config-form > div {
              height: 400px; clear: both; padding: 10px;
            }
            #gpp-config-form ul {
              list-style: none; font-size: 9pt; margin: 0; padding: 0;
            }
            #gpp-config-form li {
              float: left;
            }
            #gpp-config-form li a { 
              text-decoration: none; color: #666; text-align: center; width: 78px; 
              display: block; padding:4px; -moz-border-radius: 4px 4px 0 0;
            }
            .gpp-config-tab-focus {
              color: #000 !important;
              text-shadow: 1px 1px 1px;
            }

            #gpp-config-form li a:hover,
            #gpp-config-form li a:focus,
            .gpp-config-tab-focus {
              font-weight: bold;
            }
            #gpp-config-form table {
              display: none;
            }
            .gpp-config-table-selected {
              display: table !important;
            }
            #gpp-config-form td {
              padding: 3px 0;
            }
            #gpp-config-form td > a {
              color: #0a0; margin: 0 3px;
            }
            #gpp-config-form td > a:hover {
              color: #0e0; cursor: help;
            }
            #gpp-config-form td textarea {
              display: block; font-size: 9pt; width:380px; height: 100px;
            }
            #gpp-config-form fieldset {
              margin: 5px;
            }
            #gpp-config-form legend {
              font-size: 9pt; color: #666;
            }
            #gpp-config-form fieldset p {
              margin: 0; font-size: 9pt; color: #333;
            }
            #gpp-config-form > button {
              float: right; margin: 10px;
            }
            #gpp-config-form > p {
              font-size:8pt; color: #666;
            }
            #gpp-config-form > div > table > tbody > tr > td > p {
              font-size:9pt; line-height: 200%;
            }
            #gpp-config-form > div > table > tbody > tr > td > p > a {
              margin: 0; c
            }
          ]]></>.toString();
          GM_addStyle(css);
          with (modules.config) {
            append(tabs(), form);
            append(options(), form);
            append(closeBtn(), form);
            append(tip(), form);
            closeBtn().focus();
          }
        }
        
        this._panel.adjustPos = function() {
          with (this.style) {
            top  = document.documentElement.clientHeight / 2 
               - modules.config.panel().clientHeight / 2 
               + "px";
            left = document.documentElement.clientWidth  / 2 
               - modules.config.panel().clientWidth  / 2 
               + "px";
          }
        }
      }
      return this._panel;
    },
    
    shadow: function() {
      if (!this._shadow) {
        this._shadow = create('div');
        this._shadow.addEventListener("click", function() {
          with (modules.config) {
            panel().hide();
            shadow().hide();
          }
        }, false);
        
        this._shadow.show = function() {
          with (this.style) {
            if (display == "none") {
              display = "";
            } else {
              this.init();
            }
          }
        }
        
        this._shadow.hide = function() {
          this.style.display = "none";
        }
        
        this._shadow.init = function() {
          append(this, google.get("body"));
          with (this.style) {
            width = screen.availWidth + "px"; height = screen.availHeight + "px";
            background = "#000"; opacity = 0.5; left = 0;
            position = "fixed"; zIndex = 1000; top = 0;
          }
        }
      }
      return this._shadow;
    },
    
    fieldset: function() {
      if (!this._fieldset) {
        this._fieldset = create("fieldset");
        var legend = create("legend");
        with (legend) {
          innerHTML = __("Help");
        }
        append(legend, this._fieldset)
        var para = create("p");
        append(para, this._fieldset);
      }
      return this._fieldset;
    },
    
    tip: function() {
      if (!this._tip) {
        this._tip = create("p");
        this._tip.innerHTML = __("If you are not willing to refresh at once, click the shadow box around");
      }
      return this._tip
    },
    
    tabs: function() {
      if (!this._tabs) {
        this._tabs = create("ul");
        var config = modules.config;
        var groups = config.groups;
        
        this._tabs.select = function(tab) {
          if (this._selected) {
            this._selected.className = null;
          }
          tab.className = "gpp-config-tab-focus";
          this._selected = tab;
        }
        
        for (var i = 0; i < groups.length; i++) {
          var group = groups[i];
          var li = create("li"); append(li, this._tabs);
          var a  = create("a"); append(a, li);
          with (a) {
            href = "javascript:void(0)";
            innerHTML = group.title;
            setAttribute("order", i);
            with (style) {
              backgroundColor = group.color;
            }
            // events
            addEventListener("click", function() {
              config.tabs().select(this);
              t("p", config.fieldset())[0].innerHTML = "";
              var options = config.options();
              var order = this.getAttribute("order");
              options.select(options.tables[order]);
              options.style.background = groups[order].color;
              config.closeBtn().focus();
            }, false);
          }
          if (i == 0) {
            config.tabs().select(a);
          }
        }
      }
      return this._tabs;
    },
    
    options: function() {
      if (!this._options) {
        this._options = create("div");
        var config = modules.config; var groups = config.groups;
        with (this._options.style) {
          background = groups[0].color;
        }
        for (var i = 0; i < groups.length; i++) {
          var table = create("table"); append(table, this._options);
          var tbody = create("tbody"); append(tbody, table);
        }
        for each(mod in modules) {
          var hasConfig = mod.enable || mod.value || mod.content;
          if (mod.config && hasConfig) {
            var tr = create("tr"); append(tr, t("tbody", this._options)[mod.cid]);
            if (mod.enable) {
              var td = create("td"); append(td, tr);
              append(config.createCheckbox(mod), td);
            }
            if (mod.name) {
              var td = create("td"); append(td, tr);
              append(config.createLabel(mod), td);
            }
            if (mod.value) {
              append(config.createTextbox(mod), tr.lastChild);
            }
            if (mod.help) {
              after(config.createHelpIcon(mod), mod.label);
            }
            if (mod.content) {
              var tr2 = create("tr"); 
              append(create("td"), tr2); append(create("td"), tr2);
              append(config.createTextarea(mod), tr2.lastChild);
              after(tr2, tr);
              tr2.lastChild.style.padding = 0;
            }
          }
        }
        append(config.fieldset(), this._options);
        
        this._options.select = function(table) {
          if (this._selected) {
            this._selected.className = null;
          }
          table.className = "gpp-config-table-selected";
          this._selected = table;
        }
        
        this._options.tables = t("table", this._options);
        
        this._options.select(this._options.tables[0]);
      }
      return this._options;
    },
    
    closeBtn: function() {
      if (!this._closeBtn) {
        var config = modules.config;
        this._closeBtn = create("button");
        with (this._closeBtn) {
          innerHTML = __("Confirm &amp; Refresh");
          type = "button";
          addEventListener("click", function() {
            location.reload();
          }, false);
        }
      }
      return this._closeBtn;
    },
    
    createCheckbox: function(mod) {
      mod.checkbox = create("input");
      with (mod.checkbox) {
        type = "checkbox";
        id = mod.config;
        checked = mod.enable();
        addEventListener("change", function() {
          GM_setValue(mod.config, this.checked);
        }, false);
      }
      if (mod.dependsOn) {
        mod.checkbox.disabled = !mod.dependsOn().checkbox.checked;
        mod.dependsOn().checkbox.addEventListener("change", function() {
          mod.checkbox.checked = mod.enable();
          mod.label.style.color = this.checked ? "#000" : "#999";
          mod.checkbox.disabled = !this.checked;
        }, false);
      }
      return mod.checkbox;
    },
    
    createLabel: function(mod) {
      mod.label = create("label");
      with (mod.label) {
        htmlFor = mod.config;
        innerHTML = mod.name;
      }
      if (mod.dependsOn) {
        mod.label.style.color = mod.dependsOn().checkbox.checked ? "#000" : "#999";
      }
      return mod.label;
    },
    
    createTextbox: function(mod) {
      mod.textbox = create("input");
      with (mod.textbox) {
        type = "text";
        value = mod.value();
        disabled = !mod.enable();
        addEventListener("blur", function() {
          GM_setValue(mod.config2, this.value);
        }, false);
        switch (mod.valueType) {
          case "string":
            style.width = "250px";
            break;
          case "number":
            style.width = "40px";
            break;
          default:
        }
      }      
      mod.checkbox.addEventListener("change", function() {
        mod.textbox.disabled = !this.checked;
      }, false);
      if (mod.dependsOn) mod.dependsOn().checkbox.addEventListener("change", function() {
        mod.textbox.disabled = !mod.enable() || mod.checkbox.disabled;
      }, false);
      return mod.textbox;
    },
    
    createTextarea: function(mod) {
      mod.textarea = create("textarea");
      with (mod.textarea) {
        innerHTML = mod.content();
        disabled = !mod.enable();
        mod.checkbox.addEventListener("change", function() {
          mod.textarea.disabled = !this.checked;
        }, false);
        addEventListener("blur", function() {
          GM_setValue(mod.config2, this.value);
        }, false);
      }
      return mod.textarea;
    },
    
    createHelpIcon: function(mod) {
      mod.helpIcon = create("a");
      with (mod.helpIcon) {
        href = "javascript:void(0)";
        innerHTML = "[?]"; title = __("Show help when click");
        addEventListener("click", function() {
          var content = mod.help;
          if (mod.dependsOn) {
            content += "<br />" + __("Depends on") +"&lt;" + mod.dependsOn().name + "&gt;";
          }
          t("p", modules.config.fieldset())[0].innerHTML = content;
        }, false);
      }
      return mod.helpIcon;
    },

    enable: function() { return true; },
    
    run: function() {
      var elm = $("gbar");
      append(this.btn(), elm);
    }
  },
  
  sideBar: {
    
    name: __("Show sidebar"),
    
    config: "gpp-sidebar",
    
    cid: 0,
    
    enable: function() {
      return gm(this.config, true);
    },
    
    run: function() {
      google.get('divres') 
        && (google.get('divres').style.marginRight = "334px");
      google.sideBar = function() {
        var div = create("div");
        with (div.style) {
          width = "302px";
          marginRight = "10px";
          background = "#F0F7F9";
          padding = "10px"; cssFloat = "right";
          border = "1px solid #6B90DA"; MozBorderRadius = "10px";
        }
        after(div, $("ssb"));
        return div;
      }
    }
  },
  
  spnsrCleaner: {
  
    name: __("Remove Sponsored Links"),
    
    config: "gpp-removeSponsors",
    
    cid: 3,
    
    enable: function() {
      return gm(this.config, true);
    },
    
    run: function() {
      remove(google.get("sponsors"));
      remove(google.get("sponsors2"));
      remove(google.get("sponsors3"));
    }
  },
  
  relatedTop: {
    
    name: __('"Search related" to Top'),
    
    config: "gpp-relatedKeywordCopy",
    
    cid: 3,
    
    help: __('Clone "Search related" to top. Recommended for those who use Autopagerize\
 which makes you never see the "Search related"'),
    
    enable: function() {
      return gm(this.config, true);
    },
    
    run: function() {
      if (google.get("related")) {
        var clone = google.get("related").cloneNode(true);
        append(clone, $("res"), true);
      }
    }
  },

  multiCols: {
    
    name: __("Multi Columns"),

    config: "gpp-multiCols",

    config2: "gpp-multiColsCnt",

    valueType: "number",

    cid: 0,

    autopagerize: true,

    help: __("If you've got a wider screen, \
you'd better to set 2 cols or more to get better layout"),

    enable: function() {
      return gm(this.config, true);
    },

    value: function() {
      return Math.max(parseInt(gm(this.config2)), 2) || 2;
    },

    run: function() {
      if (this.value() < 2) return;
      this.handleSuggest();
      this.handleResults();
      this.handleOthers();
    },

    handleSuggest: function() {
      var res = x("//ol/li/ol/li[@class='g']");
      // if no result
      if (res.snapshotLength == 0) return ;
      // else
      var ccnt = this.value();
      var div = create("div");
      with (div.style) {
        background = "#F0F7F9";
        border = "1px solid #6B90DA";
        MozBorderRadius = "10px";
        marginBottom = "10px";
      }
      var p = res.snapshotItem(0).parentNode.parentNode; // li
      append(div, p.parentNode.parentNode);
      var seeAlso = x(".//div[@class='med'][1]", p).snapshotItem(0);
      seeAlso.style.padding = "10px 0 0 10px";
      append(seeAlso, div);
      append(this.generateTable(res), div);
      remove(p);
    },

    handleResults: function() {
      var res = x("//div[@id='res']/div/ol/li[starts-with(@class, 'g')]");
      // if no result
      if (res.snapshotLength == 0) return;
      // else
      var div = create("div");
      with (div.style) {
        background = "#F0F7F9";
        border = "1px solid #6B90DA";
        MozBorderRadius = "10px";
      }
      var p = res.snapshotItem(0).parentNode; // ol
      append(div, p.parentNode);
      append(this.generateTable(res), div);
      remove(p);
    },

    generateTable: function(res) {
      var ccnt = this.value();
      var table = create("table");
      table.style.width = "100%";
      table.style.tableLayout = "fixed";
      table.cellSpacing = 10;
      var cnt = res.snapshotLength;
      var rcnt = Math.ceil(cnt / ccnt);
      for (var i = 0; i < rcnt; i++) {
        var tr = create("tr"); append(tr, table);
        for (var j = 0; j < ccnt; j++) {
          var li;
          if (li = res.snapshotItem(i * ccnt + j)) {
            td = create("td"); td.className = 'g';
            td.style.verticalAlign = "top";
            append(td, tr);
            while (li.firstChild) {
              append(li.firstChild, td);
            }
          } else {
            break;
          }
        }
      }

      return table;
    },

    handleOthers: function() {
      // no <nobr>
      var nobrs = x("//td//nobr");
      for (var i = 0, n = nobrs.snapshotLength; i < n; i++) {
        var span = create("span");
        span.innerHTML = nobrs.snapshotItem(i).innerHTML;
        var parent = nobrs.snapshotItem(i).parentNode;
        remove(nobrs.snapshotItem(i));
        append(span, parent);
      }
    }
  },
  
  colorful: {
    
    name: __("Colorful Search"),
    
    config: "gpp-colorfulBg",
    
    cid: 0,

    autopagerize: true,
    
    help: __("Generates random light background colors for result lists.<br />\
The colors are grouped by domain(behaves like ie8 tab color). <br />\
Visit <a href=\"http://userscripts.org/scripts/show/52119\">Colorful Search</a>, \
another script of mine, for Google, Yahoo and Bing."),

    colors: [],

    enable: function() {
      return gm(this.config, true);
    },
    
    run: function() {
      if (google.get("colorless", true).snapshotLength > 0) {
        var lies = google.get("colorless");
        for (var i = 0; i < lies.snapshotLength; i++) {
          var li = lies.snapshotItem(i); 
          li.setAttribute("colorized", "colorized");
          var link = t("a", li)[0]; if (!link) continue;
          var hostname = link.hostname;
          var tld = getTld(hostname);
          
          if (!this.colors[tld]) {
            this.colors[tld] = [];
            var r = parseInt(Math.random() * 48) + 220;
            var g = parseInt(Math.random() * 48) + 220;
            var b = parseInt(Math.random() * 48) + 220;
            this.colors[tld]['bg'] = 'rgb(' + r + ',' + g + ',' + b + ')';
            this.colors[tld]['bd'] = 'rgb(' + (r - 32) + ',' + (g - 32) 
                         + ',' + (b - 32) + ')';
          }
          with (li.style) {
            background = this.colors[tld]['bg'];
            border = "1px solid " + this.colors[tld]['bd'];
            MozBorderRadius = "10px"; padding = "10px";
          }
        }
      }
    }
  },

  fixedSearch: {

    name: __("Fixed Search"),

    cid: 2,

    config: "gpp-fixedSearch",

    help: __("Make the search bar fixed at the top of the window.<br />\
Set this option on may cause the mouse wheel scrolling unsmoothly and slowly"),

    enable: function() {
      return gm(this.config, false);
    },

    run: function() {
      GM_addStyle(<><![CDATA[
#gbar, #guser {
  position: fixed; 
  z-index: 10; 
  top: 0px; 
  height: 24px; 
  line-height: 22px; 
}
#gbar { left: 8px; width: 100%; background: white; } #guser { right: 8px; }
.gbh { position: fixed; z-index: 10; top: 24px; }
#sft { 
  position: fixed; 
  z-index: 9; 
  top: 6px; 
  background: white; 
  height: 70px; 
}
#ssb {
  position: fixed; 
  z-index: 10; 
  top: 80px; 
  left: 0; 
  width: 100%; 
  margin:0; 
  border-bottom: 2px solid #aaa;
}
body { margin-top: 122px }
.gac_m { position: fixed !important; }
]]></>.toString());
    }
  },

  fixSearchPosition: {
    
    name: __("Fix Search Position"),

    cid: 2,

    config: "gpp-fixSearchPosition",

    help: __('When "Fixed Search" is on, some users who use for example, Google Taiwan, Google France may have found that the search options below the search box is under the blue search status bar. If this problem bothers you, check this on'),

    dependsOn: function() { return modules.fixedSearch; },

    enable: function() {
      return this.dependsOn().enable() && gm(this.config, false);
    },

    run: function() {
      GM_addStyle(<><![CDATA[
#ssb { top: 94px }
body { margin-top: 134px }
]]></>.toString());
    }
  },

  noRightMargin: {
    
    name: __("No Right Margin"),

    cid: 2,

    config: __("gpp-noRightMargin"),

    help: __("Remove the right margin of the page"),

    enable: function() {
      return gm(this.config, true);
    },

    run: function() {
      GM_addStyle(<><![CDATA[
#cnt { max-width: 100% }
]]></>.toString());
    }
  },

  classicLogo: {

    name: __("Classic Logo"),

    cid: 2,

    config: "gpp-classicLogo",

    help: __("I know some one don't like the classic Google++ logo, but I like it.<br />\
So if you like it too, check this on"),

    enable: function() {
      return gm(this.config, false);
    },

    run: function() {
      GM_addStyle(<><![CDATA[
#gpp-config-btn { 
  background: black;
  padding: 3px 4px;
  -moz-border-radius: 4px;
  text-decoration: none;
  font-size: 9pt;
  color: #fff;
}
.gpp-logo {
  background: black;
  padding: 2px 3px;
  -moz-border-radius: 2px;
  text-shadow: 0px 0px 1px;
}
.gpp-logo-g { color: #33f }
.gpp-logo-o { color: #f00 }
.gpp-logo-o2{ color: #ee0 }
.gpp-logo-l { color: #1f0 }
.gpp-logo-e { color: #f00 }
.gpp-logo-plus { color: #ee0 }
.gpp-logo-plus2{ color: #1f0 }
]]></>.toString());
    }
  },

  fontSize: {
              
    name: __("Search Result Font Size"),

    cid: 2,

    config: "gpp-fontSize",

    config2: "gpp-fontSizeValue",

    valueType: 'number',

    enable: function() {
      return gm(this.config, true);
    },

    value: function() {
      return gm(this.config2, 10);
    },

    run: function() {
      GM_addStyle('td.g { font-size:' + this.value() + 'pt }'); 
    } 
  },

  customCss: {
  
    name: __("Style Customization"),
    
    cid: 2,
    
    config: "gpp-customCss",
    
    config2: "gpp-css",
    
    help: __('If you are familiar with css, you can write your own css here.<br />\
Click <a href="http://userscripts.org/topics/38189">here</a> to look for more styles.'),
    
    enable: function() {
      return gm(this.config, false);
    },
    
    content: function() {
      var def = <><![CDATA[
/* put your own css rules here */
]]></>.toString();
      return gm(this.config2, def);
    },
    
    run: function() {
      GM_addStyle(this.content());
    },
  },

  twitter: {
    
    name: "Twitter",
    
    config: "gpp-twitter",
    
    config2: "gpp-twitterMax",
    
    cid: 1,
    
    title: "Twitter",
    
    valueType: "number",
    
    help: __("The number in the text box specifies how many results to show"),
    
    enable: function() {
      return modules.sideBar.enable() && gm(this.config, false);
    },
    
    value: function() {
      return gm(this.config2, 6);
    },
    
    dependsOn: function() {
      return modules.sideBar;
    },
    
    run: function() {
      if (google.get("sideBar")) {
        var twitter = util.createSidePanel(this); 
        twitter.className += " gpp-twitter";
        var loadingImage = util.createLoadingImage();
        append(loadingImage, twitter);
        
        GM_xmlhttpRequest({
          method: 'GET',
          url: "http://search.twitter.com/search.json?q=" 
             + encodeURIComponent(google.get("keyword"))
             + "&rpp=" + this.value(),
          headers: {
            'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
            'Accept': 'text/html',
          },
          onload: function(data) {
            remove(loadingImage);
            data = eval("(" + data.responseText + ")");
            if (data.results.length == 0 ) {
              twitter.innerHTML += __('No results');
              return 0;
            }

            var colors = ['eff', 'fef', 'ffe'];
            var max = modules.twitter.value();
            var css = <><![CDATA[
.gpp-twitter p {
  margin: 0; padding: 10px; clear: both; min-height: 48px;
}
.gpp-twitter img {
  float: left; margin-right: 10px; border-color: #fff;
  width: 48px; height: 48px;
}
]]></>.toString();

            GM_addStyle(css);
            for (var i = 0; i < data.results.length && i < max; i++) {
              var p = create('p');
              with (p.style) {
                background = "#" + colors[i % 3];
              }
              append(p, twitter);
              p.innerHTML = data.results[i].text;
              
              var img = create("img");
              img.alt = 'avatar';
              img.src = data.results[i].profile_image_url;
              
              var a = create("a");
              a.href = "http://twitter.com/" + data.results[i].from_user;
              append(img, a);
              
              before(a, p.firstChild);
            }
          }
        });
      }
    }
  },

  wiki: {
    
    name: "Wikipedia",
    
    config: "gpp-wiki",
    
    cid: 1,
    
    title: "Wikipedia",
    
    help: __("Show a list of definitions related to the keyword from Wikipedia.org"),
    
    enable: function() {
      return modules.sideBar.enable() && gm(this.config, true);
    },
    
    dependsOn: function() {
      return modules.sideBar;
    },
    
    run: function() {
      if (google.get('sideBar')) {
        var wiki = util.createSidePanel(this); wiki.className += " gpp-wiki";
        var loadingImage = util.createLoadingImage();
        append(loadingImage, wiki);
        
        GM_xmlhttpRequest({
          method: 'GET',
          url: "http://" + __("en") + ".wikipedia.org/w/api.php?action=opensearch&search=" 
             + encodeURIComponent(google.get("keyword")),
          headers: {
            'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
            'Accept': 'text/html',
          },
          onload: function(response) {
            var r = eval("(" + response.responseText + ")")[1];
            var l;
            remove(loadingImage);
            if ((l = r.length) > 0) {
              var css = <><![CDATA[
.gpp-wiki {
  background: #fff url(##BG##) right bottom no-repeat;
}
.gpp-wiki ul {
  list-style-image: url(http://en.wikipedia.org/favicon.ico);
  margin: 10px 10px 40px 35px;
  padding: 0;
}
.gpp-wiki a {
  position: relative;
  top: -3px;
}
]]></>.toString().replace(/##BG##/, 
  __("http://upload.wikimedia.org/wikipedia/en/b/bc/Wiki.png"));

              GM_addStyle(css);
              var ul = create("ul");
              append(ul, wiki);
              for (var i = 0; i < l; i++) {
                var li = create("li");
                append(li, ul);
                var link = create("a");
                link.href = "http://" + __("en") + ".wikipedia.org/wiki/" + r[i];
                link.innerHTML = r[i];
                append(link, li);
              }
            } else {
              wiki.innerHTML += __("No related definitions");
            }
          }
        });
      }
    }
  },
  
  flickr: {
  
    name: "Flickr",
    
    config: "gpp-flickr",
    
    title: "Flickr",
    
    cid: 1,
    
    help: __("Show Flickr result in sidebar"),
    
    enable: function() {
      return modules.sideBar.enable() && gm(this.config, true);
    },
    
    run: function() {
      if (google.get("sideBar")) {
        var flickr = util.createSidePanel(this);
        this.showData(1);  // First run
      }
    },
    
    dependsOn: function() {
      return modules.sideBar;
    },
    
    showData: function(page) {
      var title = this.header;
      var flickr = this.body;
      var keyword = google.get("keyword");
      // clear paging container, 'cos i will recreate it later..
      if (title.firstChild.tagName == 'DIV') {
        remove(title.firstChild);
      }
      while (title.nextSibling) { // clear the result ..
        remove(title.nextSibling);
      }
      var loadingImage = util.createLoadingImage();
      append(loadingImage, flickr);
      
      // flickr api params
      // @link http://www.flickr.com/services/api/flickr.photos.search.html
      var param = [];
      param.push("method=flickr.photos.search");
      param.push("api_key=bfedfb888337696dd2a44fa89b6eab88");
      param.push("text=" + encodeURIComponent(keyword));
      param.push("sort=relevance");
      param.push("per_page=16");
      param.push("page=" + page);
      param.push("format=json");
      param.push("nojsoncallback=1");
      
      var api_url = "http://api.flickr.com/services/rest?" + param.join("&");

      var request = {
        method: 'GET',
        url: api_url,
        headers: {
          'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
          'Accept': 'text/html',
        },
        onload: function(response) {
          remove(loadingImage);
          var data = eval("(" + response.responseText + ")");
          if ( data.photos.total == 0 ) { // No any photo ...
            append(createText(__("No related pictures")), flickr);
            return;
          }
          
          if ( data.photos.pages > 1 ) { // If there are more than 1 pages ..
            var divPage = create("div");
            divPage.style.cssFloat = "right";
            before(divPage, title.firstChild);
            
            if ( 1 < page ) { // If current page is not first
              var prev = create("a");
              with (prev) {
                href = "javascript:void(0)"; title = __("Prev"); innerHTML = "&lt;";
                style.fontSize = "9pt";
                style.margin = "4px";
                addEventListener("click", function() {
                  modules.flickr.showData(page - 1);
                }, false);
              }
              append(prev, divPage);
            }
            var current = create("span");
            with (current) {
              innerHTML = page;
              style.fontSize = "9pt";
            }
            append(current, divPage);
            if ( data.photos.pages > page ) { // If current page is not last
              var next = create("a");
              with (next) {
                href = "javascript:void(0)"; title = __("Next"); innerHTML = "&gt;";
                style.fontSize = "9pt"; style.margin = "4px";
                addEventListener("click", function() {
                  modules.flickr.showData(page + 1);
                }, false);
              }
              append(next, divPage);
            }
          }
          
          var images = data.photos.photo;
          for (var i = 0; i < images.length; i++) {
            src = "http://farm" + images[i].farm
              + ".static.flickr.com/" + images[i].server
              + "/" + images[i].id + "_" + images[i].secret
              + "_s.jpg";
            url = "http://www.flickr.com/photos/" + images[i].owner
              + "/" + images[i].id;
            img = create("img");
            img.alt = __("loading...");
            img.src = src;

            with (img.style) {
              width = height = "75px"; borderWidth = 0; verticalAlign = "middle";
            }
            link = create("a");
            with (link) {
              href = url; target = "_blank";
            }
            append(img, link);
            append(link, flickr);
          }
        }
      };
      
      GM_xmlhttpRequest(request);
    }
  },
  
  altSearch: {
    
    name: __("Other Search Engines"),
    
    config: "gpp-altSearch", 
    
    cid: 1,

    config2: "gpp-searchesJson",
    
    help: __("List other search engine links in sidebar.<br />\
If you want more search engines, check this <a href=\"http://userscripts.org/topics/38612\">post</a> out.<br />\
You can recover the default contents by clear the text box"),
    
    content: function() {
      return gm(this.config2) || <><![CDATA[
        { name: "Yahoo", query: "http://search.yahoo.com/search?p=", show: 0, favicon: "http://search.yahoo.com/favicon.ico" },
        { name: "Bing", query: "http://www.bing.com/search?q=", show: 0, favicon: "http://www.bing.com/favicon.ico" }
      ]]></>.toString();
    },

    engines: function() {
      return eval("[" + this.content() + "]");
    },
    
    enable: function() {
      return modules.sideBar.enable() && gm(this.config, true);
    },
    
    dependsOn: function() {
      return modules.sideBar;
    },

    _getUl: function() {
      if (!this._ul) {
        var ul = create('ul');
        append(ul, google.get('sideBar'), true);
        with (ul.style) {
          padding = 0;
          margin  = "0 0 10px";
          listStyle = "none";
        }
        this._ul = ul;
      }

      return this._ul;
    },
    
    run: function() {
      if (google.get("sideBar")) {
        var keyword = google.get("keyword");
        
        var engines = this.engines();
        for (var i = 0; i < engines.length; i++) {
          var link = create("a");
          var ico  = create("img");
          var span = '<span style="color:red">' + keyword + '</span>';
          with (ico) {
            ico.alt = "fav";
            if (engines[i].favicon) {
              ico.src = engines[i].favicon;
            } else {
              ico.src = "http://" + engines[i].query.split('/')[2] + "/favicon.ico";
            }
            with (style) {
              marginRight = "8px"; 
              position    = "relative"; 
              top         = "3px";
              border      = 0;
            }
          }

          link.href   = engines[i].query + encodeURIComponent(keyword);
          link.target = "_blank";

          if (engines[i].show) {
            link.innerHTML = __("Search ##KW## with ##ENGINE##")
             .replace(/##KW##/, span)
             .replace(/##ENGINE##/, '<span style="font-weight: bold">' + engines[i].name + '</span>');

            var li = create("li"); 
            append(ico, li); 
            append(link, li);
            append(li, this._getUl());
          } else {
            append(ico, link);
            append(link, $("resultStats"));
          }
        }
      }
    }
  },
  
  favicon: {
  
    name: __("Favicon"),
    
    config: "gpp-favicon",
    
    cid: 0,

    autopagerize: true,
    
    enable: function() {
      return gm(this.config, true);
    },
    
    run: function() {
      var titles = google.getTitles('icon');
      if (titles.snapshotLength > 0) {
        if (!this.icoCss) {
          this.icoCss = <><![CDATA[
.gpp-favicon {
  width: 16px; height: 16px; background: url(chrome://global/skin/icons/folder-item.png);
  float: left; margin: 0 5px 0 0 !important;
}
]]></>.toString();
          GM_addStyle(this.icoCss);
        }
        for (var i = 0; i < titles.snapshotLength; i++) {
          var a = titles.snapshotItem(i); a.parentNode.parentNode.setAttribute("icon", "icon");
          var div = create("div"); div.className = "gpp-favicon";
          
          var ico = create("img");
          with (ico) {
            alt = ""; width = 16;
            src = "http://" + a.hostname + "/favicon.ico"; 
            style.background = a.parentNode.parentNode.style.backgroundColor;
          }
          append(ico, div);
          before(div, a);
        }
      }
    }
  },

  
  shortcut: {
  
    name: __("Shortcut"),
    
    config: "gpp-shortcut",
    
    cid: 3,
    
    enable: function() {
      return gm(this.config, true);
    },
    
    help: __('Just like Vim: j = prev, k = next, &lt;ENTER&gt; = open link, ? = to search box,\
&lt;ESC&gt; = leave search box'),
    
    run: function() {
      var id = -1;
      var s = this;
      var box = n("q")[0];
      
      GM_addStyle(<><![CDATA[
.gpp-hl { font-weight: bold; text-shadow: 0 0 5px; color: red !important; }
.gpp-hl:before { content: "»"; }
.gpp-hl:after { content: "«"; }
]]></>.toString());

      var f = false;
      box.addEventListener('focus', function() {
        f = true;
      }, false);
      
      box.addEventListener('blur', function() {
        f = false;
      }, false);

      document.addEventListener('keypress', function(e) {
        var kc = e.keyCode || e.which;
        switch (true) {
          case kc == 63:
            box.focus(); break;
          case f && kc == 27:
            if (id > -1) {
              s._a(id).focus();
              setTimeout(
                function() {
                window.scrollTo(0, s._getTop(modules.shortcut._a(id)) - document.documentElement.clientHeight / 2);
                }, 1
              );
            } else {
              s._hl(id = 0);
            }
            break;
          case !f && (kc == 74 || kc == 106):
            if (s._a(id + 1)) {
              if (s._a(id)) s._nohl(id);
              s._hl(++id);
            }
            break;
          case !f && (kc == 75 || kc == 107):
            if (s._a(id - 1)) {
              if (s._a(id)) s._nohl(id);
              s._hl(--id);
            } else if (id < 0) {
              s._hl(id = 0);
            }
            break;
          default:
        }
      }, false);
    },
    
    _hl: function(id) {
      var a = this._a(id);
      a.className += ' gpp-hl';
      a.focus();
      window.scrollTo(0, this._getTop(a) - document.documentElement.clientHeight / 2);
    },
    
    _nohl: function(id) {
      this._a(id).className = this._a(id).className.replace(' gpp-hl', '');
    },
    
    _a: function(id) {
      return id > -1 ? c('l')[id] : null;
    },
    
    _getTop: function(obj) {
      if (obj.offsetParent) {
        return obj.offsetTop + this._getTop(obj.offsetParent);
      } else {
        return 0;
      }
    }
  },
  
  resultNumber: {
    
    name: __('Number results'),

    config: 'gpp-resultNumber', cid: 3,

    index: 0,

    autopagerize: true,

    enable: function() {
      return gm(this.config, false);
    },

    run: function() {
      var start = 0;
      var query = location.search.match(/start=(\d+)/);
      query && (start = query[1]);
      start > 0 && (this.index = start);
      var ts = google.getTitles('number');
      for (var i = 0; i < ts.snapshotLength; i++) {
        var span = create('span');
        span.innerHTML = ++this.index + '. ';
        append(span, ts.snapshotItem(i), true);
        ts.snapshotItem(i).parentNode.parentNode
                  .setAttribute("number", "number");
      }
    }
  },
  
  autopagerize: {
  
    name: __("Autopagerize Compatible"),
    
    config: "gpp-autopagerize",
    
    help: __("Please put Autopagerize before Google++ to make it work"),
    
    cid: 3,
    
    enable: function() {
      return gm(this.config, true);
    },
    
    run: function() {
      this.improveUi();
      // copy from favicon with google3, nice job
      var scrollHeight = document.documentElement.scrollHeight;
      document.addEventListener("scroll", function() {
        if( scrollHeight != document.documentElement.scrollHeight ) {
          scrollHeight = document.documentElement.scrollHeight;
          for each(mod in modules) {
            mod.autopagerize && mod.enable() && mod.run();
          }
        }
      }, false);
    },
    
    improveUi: function() {
      css = <><![CDATA[
.autopagerize_page_info {
  padding: 10px; border: 1px solid #abc; text-align: center;
  background: #cde; -moz-border-radius: 10px;
}
.autopagerize_page_separator {
  display: none;
}
]]></>.toString();
      GM_addStyle(css);
    }
  },
  
  version: {
  
    name: __("Auto version check"),
    
    cid: 4,
    
    config: "gpp-version",
    
    config2: "gpp-checkInterval",
    
    valueType: "number",
    
    help: __("The interval of version checking, in days"),
    
    value: function() {
      return gm(this.config2, 2);
    },
    
    enable: function() {
      return gm(this.config, true);
    },
    
    run: function() {
      var now = Math.ceil(Date.now() / 1000);
      if (now - gm("gpp-verCheckAt", 0) > this.value() * 86400) {
        GM_xmlhttpRequest({
          method:"GET",
          url:"https://userscripts.org/scripts/source/59333.meta.js",
          headers:{
            "Accept":"text/javascript; charset=UTF-8"
          },
          overrideMimeType:"application/javascript; charset=UTF-8",
          onload:function(response) {
            var httpsMETA = parseHeaders(response.responseText);
            var remoteVersion = httpsMETA["version"] ? httpsMETA["version"] : "0.0.0";
            GM_setValue("gpp-remoteVersion", remoteVersion);
            GM_setValue("gpp-verCheckAt", now);
          }
        });
      }
      if (this.compare(this.local(), this.remote())) {
        this.showNotice(this.remote());
      }
    },
    
    local: function() {
      if (!this._local) {
        this._local = parseHeaders(meta)["version"];
      }
      return this._local;
    },
    
    remote: function() {
      if (!this._remote) {
        this._remote = gm("gpp-remoteVersion", "0.0.0");
      }
      return this._remote;
    },
    
    compare: function(o, n) {
      var o = o.split(/\./); var n = n.split(/\./);
      for (var i = 0; i < 3; i++) {
        if (n > o) return true;
      }
      return false;
    },
    
    showNotice: function(version) {
      var a = document.createElement("a");
      with (a) {
        innerHTML = __("Update to ") + resource.logo + 'v' + version;
        href = "http://userscripts.org/scripts/show/59333";
        target = "_blank";
        with (style) {
          display = "block"; background = "black"; color = "white";
          position = "fixed"; zIndex = "100"; bottom = "5px"; right = "5px";
          padding = "2px 4px"; textDecoration = "none";
        }
      }
      document.body.appendChild(a);
    }
  }
};

var util = {
  createSidePanel: function(module) {
    var titleText = module.title;
    var sideBar = google.get("sideBar");
    var div = create("div"); div.className = "gpp-sidePanel";
    module.body = div;
    var title = create("h3");
    module.header = title;
    append(createText(titleText), title);
    append(title, div);
    append(div, sideBar, true);
    if (!this.sidePanelCss) {
      this.sidePanelCss = <><![CDATA[
.gpp-sidePanel {
  width: 300px; background: #fff; margin-bottom: 10px; border: 1px solid #bbf;
}
.gpp-sidePanel > h3 {
  background: #ccf; margin: 0; padding: 5px; font-weight: bold;
  text-shadow: 1px 1px 1px;
}
]]></>.toString();
      GM_addStyle(this.sidePanelCss);
    }
    return div;
  },
  
  createLoadingImage: function() {
    var img = create("img");
    with (img) {
      alt = "loading"; src = resource.loadImage;
    }
    return img;
  }
}

var app = {
  run: function() {
    for each(mod in modules) {
      mod.enable() && mod.run();
    }
  }
};

app.run();


// else redirect
  } else {
    location.href = location.protocol 
      + '//'
      + location.host 
      + '/search?' + query;
  }
}