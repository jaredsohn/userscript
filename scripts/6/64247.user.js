// ==UserScript==

// @name DCD AlbumInfo
// @description    Provides quick access to operations with album for users at  http://dcdnet.ru.
// @namespace      http://dcdnet.ru/*
// @include        http://dcdnet.ru/*
// @include        http://www.dcdnet.ru/*

// ==/UserScript==
(function(){

function Preferences(){}
Preferences.DropDownAlbumOpersIcon = function(){return "&#x2193;"}
Preferences.DropDownAddToHaveIcon = function(){return "&#x2208;"}
Preferences.CloseIcon = function(){return "[x]"}
Preferences.MoveIcon = function(){return "[::]"}
Preferences.DropDownButtonsBackground = function(){return "transparent";}
Preferences.DropDownButtonsBackgroundHighlighted = function(){return "lightgray";}
Preferences.DropDownButtonsForeground = function(){return "black";}
Preferences.DropDownButtonsForegroundHighlighted = function(){return "black";}
Preferences.VisibleRequestUserCount = function(){return 4;}

Array.prototype.Each = function(callback)
{
	for(i = 0; i<this.length; i++)
	{
		callback(this[i]);
	}
}

String.Format = function(formatString)
{
	var result = new String(formatString);
	var pattern = /{\d+}/g;
	var matched = formatString.match(pattern); 

	for(ii = 0; ii<matched.length; ii++)
	{
		formatIndex = new Number(matched[ii].substring(1, matched[ii].length-1));
		if(arguments.length<formatIndex)
		{
			throw "Invalid Index "+formatIndex;
		}
		result = result.replace(matched[ii], arguments[formatIndex+1]);
	}
	return result;
}

function DomHelper()
{

}

DomHelper.XPath = function(query) 
{
    results = document.evaluate(query, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		
	converted = new Array(results.snapshotLength);
	for (var i = 0; i < results.snapshotLength; i++) 
	{
		converted[i] = results.snapshotItem(i);
	}		
	return converted;
}

DomHelper.CreateNode = function(nodeName, attributesHash)
{

	var newElement = document.createElement(nodeName);
	
	if(attributesHash!=null)
	{
		for(attrName in attributesHash)
		{
			DomHelper.AddAttribute(newElement, attrName, attributesHash[attrName]);
		}
	}
	return newElement;
}

DomHelper.CreateText = function(value)
{
	var newTextNode = document.createText(nodeName);
	return newTextNode;
}

DomHelper.AddAttribute = function(element, name, value)
{
	var attr = document.createAttribute(name); 
	attr.value = value;
	
	element.attributes.setNamedItem( attr );

}

DomHelper.Attr = function(element, name, value)
{
	var attr = element.attributes.getNamedItem(name); 
	if(value == null)
	{
		return (attr == null) ? null : attr.value;
	}
	else
	{
		if(attr == null)
		{
			DomHelper.AddAttribute(element, name, value);
		}
		else
		{
			attr.value = value;
		}
	}
}

DomHelper.RemAttr = function(element, name)
{
	element.attributes.removeNamedItem(name); 
}

DomHelper.FindPosX = function( e ) 
{
        var curleft = 0;

        if (e.offsetParent) {
            while (1) {
                curleft += e.offsetLeft;
                if (!e.offsetParent) {
                    break;
                }
                e = e.offsetParent;
            }
        } else if (e.x) {
            curleft += e.x;
        }

        return curleft;
}

DomHelper.GetWindowScroll = function( w ) 
{
        var s = {
            left: 0,
            top: 0
        };

        if (!w) w = window;
        var d = w.document;
        var de = d.documentElement;

        // most browsers
        if ( defined( w.pageXOffset ) ) {
            s.left = w.pageXOffset;
            s.top = w.pageYOffset;
        }

        // ie
        else if( de && defined( de.scrollLeft ) ) {
            s.left = de.scrollLeft;
            s.top = de.scrollTop;
        }

        // safari
        else if( defined( w.scrollX ) ) {
            s.left = w.scrollX;
            s.top = w.scrollY;
        }

        // opera
        else if( d.body && defined( d.body.scrollLeft ) ) {
            s.left = d.body.scrollLeft;
            s.top = d.body.scrollTop;
        }


        return s;
    }

function HtmlHelper()
{
	
}

HtmlHelper.Css = function(node, key, value)
{
	newCss = key+":"+value+";";
	node.style.cssText = node.style.cssText + newCss;
}

HtmlHelper.Html = function(node, value)
{
	node.innerHTML = value;
}

HtmlHelper.Click = function(node, callback)
{
	node.addEventListener('click', callback, false);
}
HtmlHelper.Change = function(node, callback)
{
	node.addEventListener('change', callback, false);
}

HtmlHelper.Load = function(node, callback)
{
	node.addEventListener('load', callback, false);
}
function onLoad()
{
	String.Format("padding-left:2px; padding-right:2px; cursor:pointer; color:{0};", Preferences.DropDownButtonsForeground());
	var linkArray = DomHelper.XPath("//a"); //DomHelper.Select("a"); 
	var injectedCounter = 0;
	for(i = 0; i<linkArray.length; i++)
	{
		var linkNode = linkArray[i]; 
		var href = linkNode.attributes.getNamedItem('href');
		if(href == null)
		{
			// Я в шоке, но своими глазами видел эту ситуацию
			continue;
		}
		
		var matchedHref = href.value.match(/\/albums\/\d+/);
		if(matchedHref!=null)
		{
			if(linkNode.innerHTML.match(/<img.*src/gi) == null)
			{
			
				newElement = DomHelper.CreateNode("span", 
					{
					 style: String.Format("padding-left:2px; padding-right:2px; cursor:pointer; color:{0};", Preferences.DropDownButtonsForeground()), 
					 albumLink: matchedHref[0], 
					 onmouseover: String.Format("this.style.background='{0}';this.style.color='{1}';", Preferences.DropDownButtonsBackgroundHighlighted(), Preferences.DropDownButtonsForegroundHighlighted()), 
					 onmouseout: String.Format("this.style.background='{0}';this.style.color='{1}';", Preferences.DropDownButtonsBackground(), Preferences.DropDownButtonsForeground())
					});
					 
				HtmlHelper.Html(newElement, Preferences.DropDownAddToHaveIcon());
				newElement = linkNode.parentNode.insertBefore(newElement, linkNode.nextSibling);
				
				HtmlHelper.Click(	newElement,  
									function(event) { 
										processMouseClick(event, this, 0);
									});	
				
				newElement = DomHelper.CreateNode("span", 
					{
 					 style: String.Format("padding-left:2px; padding-right:2px; cursor:pointer; color:{0};", Preferences.DropDownButtonsForeground()), 
					 albumLink: matchedHref[0], 
					 onmouseover: String.Format("this.style.background='{0}';this.style.color='{1}';", Preferences.DropDownButtonsBackgroundHighlighted(), Preferences.DropDownButtonsForegroundHighlighted()), 
					 onmouseout: String.Format("this.style.background='{0}';this.style.color='{1}';", Preferences.DropDownButtonsBackground(), Preferences.DropDownButtonsForeground())
					});
					 
				HtmlHelper.Html(newElement, Preferences.DropDownAlbumOpersIcon());
				newElement = linkNode.parentNode.insertBefore(newElement, linkNode.nextSibling);
				
				HtmlHelper.Click(	newElement,  
									function(event) { 
										processMouseClick(event, this, 1);
									});	
				injectedCounter++;
														
			}
		}		
	}

	logger.Log("Have "+injectedCounter+" injected albums!");
	
}

function processMouseClick(e, obj, bLeft)
{
//	e = e || window.event;
	logger.Log("Mouse click handler");


	// запоминаем на каком альбоме щелкнули 
	var clickLink = DomHelper.Attr(obj, "albumLink");//jQuery(obj).attr('albumLink'); 

	var needCalculatePosition = !FloatAlbumWnd.IsWindowExist(clickLink);
	
	// проверяем наличие окна. 	
	var WND = FloatAlbumWnd.FindOrCreateWnd(clickLink);	
	if(needCalculatePosition)
	{
		// отступ, чтобы окошко не мешало читать надпись
		var comfortPaddingX = 10;
		var comfortPaddingY = 5; 
	
		// получаем коодрлдинаты мыши и скролла 
		// и задаем местоположение нашего окошка с информацией по альбому
		var tryX =  defined(e.x) ? e.x : DomHelper.FindPosX(obj);
		if(tryX+WND.GetWidth() > /*jQuery(document.body).width()*/ document.body.offsetWidth /*может быть тут лучше подойдет window.width*/)
		{
			tryX -= WND.GetWidth()+2*comfortPaddingX;
		}
		WND.SetWindowPos(tryX, DomHelper.GetWindowScroll().top+e.clientY+comfortPaddingY);

	}	
		
	// а вот теперь приницип меняется. в независимости от того какая кнопка была клацнута 
	// нам нужно проверить наличие в кэше альбома 
	var ai = cache.GetAI(clickLink);
	
	var doc = (bLeft) ? new AlbumOpersDoc(ai) : new AddToHaveDoc(ai); 

	// устанавливаем html для окна
	WND.SetWndHtml(doc.GetHtml());
	// показываем окошко
	WND.BeautifulAppearance(1);			
	
	if(doc.IsJustCreated())
	{
		// отправка запроса
		doc.SetSendingRequestState();
		
		Ajax.Request(makeAbsoluteUrl(clickLink), 
					function(html){
						parseAndShowAlbumInfo(html, clickLink, doc, WND);
					}, 
					function (html){
						WND.SetWndHtml("Some troubles");
					}
		);
	}
	else
	{
		// вшиваем обработчики ежели они нужны
		doc.SetHandlers(WND);
	}
	
	
}

function parseAndShowAlbumInfo(albumHtml, albumLink, doc, albumWnd)
{
	// первым делом разбираем страницу и формируем инфу об альбоме 
	var ai = AlbumPageParser.ParseAlbumInfo(albumHtml, albumLink);
	
	// садим в кэш информацию по альбому.
	cache.SetAI(albumLink, ai);
	
	// doc был уже создан теперь нам нужно задать albumInfo для него 
	// а потом опять сформировать html
	// отразить в окне 
	// и прописать обработчики 
	doc.SetAI(ai); 
	albumWnd.SetWndHtml(doc.SetResponseReceivedState().GetHtml());
	doc.SetHandlers(albumWnd);
}

function Ajax(){}

Ajax.xhrOtherBrowsers = function(options) {
	var request = new XMLHttpRequest(), 
		validEvents = { onreadystatechange: null };

	// add event listeners
	for (var eventName in validEvents) 
	{
		var callbackFunction = options[eventName];
		if(callbackFunction)
		{
			request[eventName] = function(){
				callbackFunction.call(null, request);
			};
		}
	}

	request.open(options.method, options.url, true);
	for (var header in options.headers) 
	{
		request.setRequestHeader(header, options.headers[header]);
	}
    
	// send the data
	request.send(options.data);
	return request;
}

// simplified version
Ajax.Request = function(url, callback, callbackerror, postfields)
{
	var options = {
		'url':url+"?hash="+Math.random(),
		'method':( !postfields ? 'GET' : 'POST' ),
		'headers':{ 'User-Agent':'Mozilla/5.0 (Windows; U; Windows NT 5.1) Gecko/20080404' 
				  },
		'onreadystatechange':function(request)
		{
			if(request.readyState == 4 )
			{
				logger.Log("Response status: "+request.status);
				((request.status == 200)||(request.status == 302)) ? callback(request.responseText) : callbackerror(request.responseText);
			}
		}
    };
    if (postfields!=null)
    {
		var postdata = '';
		// alert('length '+postfields.length );
		for ( n in postfields )
		{
			postdata += '&' + n + '=' + encodeURIComponent(postfields[n]);
		}
		data = postdata.substr(1);
  
		options.headers["Content-type"] = "application/x-www-form-urlencoded";
		//a_vzhik: хехехе, вот тут была ошибка. postdata содержит в себе 
		//         лишний символ '&' в начале строки 
		//options.headers["Content-length"] = postdata.length;
		options.headers["Content-length"] = data.length;
		//options.data = postdata;
		options.data = data; 
		//alert('postdata: '+data);
    }

	logger.Log("Sending "+options.method+" request to: "+url);
	logger.Log("Params: "+options.data);
	
	try
	{
		// если это файрфокс, то 100% этот скрипт запускается из-под гризманки
		// следовательно эта функция будет  и выполнится. 
		// прочие браузеры ее не найдут и кинут исключение 
		GM_xmlhttpRequest(options);
	}
	catch(e)	
	{
		// которое мы обработаем - и выполним запрос ручками
		// верхний вызов (GM_xmlhttpRequest) я оставил, пушо этот в ФФ не работает 
		Ajax.xhrOtherBrowsers(options);
	}
}



function VirtualClassEmulator(parent, prop) {
  // Dynamically create class constructor.
  var clazz = function() {
    // Stupid JS need exactly one "operator new" calling for parent
    // constructor just after class definition.
    if (clazz.preparing) return delete(clazz.preparing);
    // Call custom constructor.
    if (clazz.constr) {
      this.constructor = clazz; // we need it!
      clazz.constr.apply(this, arguments);
    }
  }
  clazz.prototype = {}; // no prototype by default
  if (parent) {
    parent.preparing = true;
    clazz.prototype = new parent;
    clazz.prototype.constructor = parent;
    clazz.constr = parent; // BY DEFAULT - parent constructor
  }
  if (prop) {
    var cname = "constructor";
    for (var k in prop) {
      if (k != cname) clazz.prototype[k] = prop[k];
    }
    if (prop[cname] && prop[cname] != Object)
      clazz.constr = prop[cname];
  }
  return clazz;
}

function AlbumInfo()
{
	// список пользователей, которые закачали альбом  
    this.m_downloadUsers = null; 
	// список пользователей, у которых можно заказать альбом 
    this.m_requestUsers = null; 
	// признак того, что этот альбом уже был скачан 
	this.m_alreadyDownloaded = null;
	// теги альбома
	this.m_albumTags = null;
	// признак того, что альбом добавлен в корзину и заказ можно отменить 
	this.m_cancelRequest = null;		
	// одновременно и признак того что альбом есть в хеве, и значение битрейта с каким он есть.
	this.m_haveBitrate = null;
	
	// ссылка для удаления альбома из хэвлиста. в ней содержится и логин пользоввателя и какой то личный идентификатор. 
	// я не знаю как он формируется, но он сука есть на странице альбома.
	this.m_personalRemoveLink = null;
	
	this.m_personalEditAlbumLink = null;
	
	this.m_albumLink = null;
} 

// объект представляет собой одного пользователя, который имеет в хэве этот альбом или залил его. 
function UserComponent()
{
    var m_userImg = null; 
    var m_userName = null; 
    var m_userBitrate = null;
    var m_userDownloadBtn = null;
    var m_userBasketBtn = null;
    var m_userRequestBtn = null;
    
	// ссылки 
	var m_downloadLink = null;
	this.m_basketLink = null;
	this.m_requestLink = null;
	
	var m_requestsCount = null;
};

// метод получения HTML-представления 
// @return - HTML-код, отображающий отношение пользователя и альбома для отражения в списке. 
UserComponent.prototype.GetHtml = function()
{
	//var faceDiv = '<div class="emulateFace" style="float:left;">'+this.m_userImg+'</div>';
	var faceDiv = '<div class="emulateFace" style="float:left;"><img src="/style/user-blue.png" /></div>';
	var userDiv = '<div class="emulateUser" style="text-align:left;float:left;">'+this.m_userName+'<br/>'+this.m_userBitrate+' </div>';
	var basketEmulateLink = (this.m_basketLink == null) ? "" : "<div style='cursor:pointer; margin-right:5px; padding-top:5px;float:right;' class='emulateButton' title='Положить в корзину' postLink='"+this.m_basketLink+"' postParamNames='magic' postParamValues='maaaagic!'  ><img class='image' alt='В корзину' title='Отметить на скачивание' src='/style/basket.png'/></div>";//<img "+this.m_userBasketBtn +"></div>";
	var downloadEmulateLink = (this.m_downloadLink == null) ? "" : "<form action='"+this.m_downloadLink+"' method='post' class='download' style='cursor:pointer; margin-right:5px; padding-top:5px;float:right;'> <input type='image' class='image' src='/style/download.png' alt='Качать' title='Качать'><input type='hidden' name='start' value='1'></form>";
	var requestEmulateLink = (this.m_requestLink == null) ? "" : "<div style='cursor:pointer; margin-right:5px; padding-top:5px;float:right;' class='emulateButton' title='Попросить закачать' postLink='"+this.m_requestLink+"' postParamNames='magic' postParamValues='maaaagic!' ><img class='image' src='/style/basket-ask.gif' alt='Попросить закачать' /></div>";//<img "+this.m_userRequestBtn +"></div>";
	var requestsCount =  (this.m_requestsCount == null)? "" : "<div style='cursor:pointer; margin-right:5px; padding-top:5px;float:right;' class='emulateRequestCount'>"+this.m_requestsCount+"</div>"; 
	
	var userHTML = "<div style='height:30px;'>"+faceDiv+userDiv+requestsCount+basketEmulateLink+downloadEmulateLink+requestEmulateLink+"</div>";
	return userHTML;   	
}


// статический класс-разборщик страницы альбома.   
function AlbumPageParser()
{
}

// статический метод получения списка пользователей которые загрузили альбом 
// @html - HTML-код со страницы альбома. 
// @return - массив объектов UserComponent. null, если таких пользователей нет. 
AlbumPageParser.ParseDownloadedUsers = function(html)
{
	/*
	2009.12.17 - bison указал, что у модераторов есть некоторые дополнительные кнопочки возле скачивания и добавления в корзину. 
      <a href="/users/akotha_kotoyama/havelist/737432/delete_zip/" title="Пересоздать .ZIP"><img src="/style/zip.png" alt="Пересоздать .ZIP"></a>
  	  <form action="/headquarters/cleanup/albums/737432/force/" method="post" onsubmit="return confirm('Удалить сейчас?');" class="force inline">
      	<input name="redirect" value="/albums/37481/" type="hidden">fd
  		<input class="image" src="/style/remove.png" alt="Удалить принудительно" title="Удалить принудительно" type="image">
  	  </form>
  	  
  	  	<form action="/headquarters/cleanup/albums/737432/cancel/" method="post" class="cancel inline">
            <input name="redirect" value="/albums/37481/" type="hidden">

  		  <input class="image" src="/style/undelete.png" alt="Отменить" title="Отменить" type="image">
  		</form>
	
	RegExp для этой части. 
	<a.*><img src=".*><\/a>\s*<form.*action="\/headquarters\/cleanup\/albums/[0-9]+\/force\/" .*>\s*<input.*>\s*<input.*>\s*<\/form>\s*<form.*action="\/headquarters\/cleanup\/albums/[0-9]+\/cancel\/" .*>\s*<input.*>\s*<input.*>\s*<\/form>	
	*/


    // вытягиваю раздел с уже закачанными файлами 
    var downloadedNode = html.match(/<ul class="owners" style=".*">(\s*<li>\s*<p class="uploaded">\s*<img.*>\s*<p class="owner">\s*<span.*<\/span>\s*<p class="bitrate">[- 0-9]+\s*<div class="actions">(\s*<a.*><img.*><\/a>\s*<form.*action="\/headquarters\/cleanup\/albums\/[0-9]+\/force\/" .*>\s*<input.*>\s*<input.*>\s*<\/form>\s*<form.*action="\/headquarters\/cleanup\/albums\/[0-9]+\/cancel\/".*>\s*<input.*>\s*<input.*>\s*<\/form>)?\s*(<form .*>\s*(<input .*>\s*){2}<\/form>\s*(<!--\s*-->\s*)?)+(<a.*<\/a>\s*)?<\/div>\s*<small>.*<\/small>\s*)+<\/ul>/gi);
    if(downloadedNode!=null)
    {
		 // я нашел закачанные альбомы. 

		// проблема в том, что если этот вылущенный кусок тупо вставить в наш блок, то выйдет полное говно
		// пушо пойдут пиздою все стили. 
		// это я к тому, что дальше будем преобразовывать вылущенный кусок, чтобы довести 
		// его до удобоотразимого вида. 
		
		// теперь так... теоретически, юзеров, закавших альбом, может быть несколько 
		var downloadedUsers = downloadedNode[0].match(/<li>\s*<p class="uploaded">\s*<img.*>\s*<p class="owner">\s*<span.*<\/span>\s*<p class="bitrate">[- 0-9]+\s*<div class="actions">(\s*<a.*><img.*><\/a>\s*<form.*action="\/headquarters\/cleanup\/albums\/[0-9]+\/force\/" .*>\s*<input.*>\s*<input.*>\s*<\/form>\s*<form.*action="\/headquarters\/cleanup\/albums\/[0-9]+\/cancel\/".*>\s*<input.*>\s*<input.*>\s*<\/form>)?\s*(<form .*>\s*(<input .*>\s*){2}<\/form>\s*(<!--\s*-->\s*)?)+(<a.*<\/a>\s*)?<\/div>\s*<small>.*<\/small>/gi);
		if(downloadedUsers!=null)
		{
			var usersArray = new Array(downloadedUsers.length);
			for(var iUser=0; iUser<downloadedUsers.length; iUser++)
			{
				activeUser = downloadedUsers[iUser];
				var uc = new UserComponent();
				
				//UserComponentParser.ParseFaceImage(activeUser, uc); 
				UserComponentParser.ParseUserName(activeUser, uc); 
				UserComponentParser.ParseUserBitrate(activeUser, uc); 
				UserComponentParser.ParseDownloadButton(activeUser, uc); 
				UserComponentParser.ParseBasketButton(activeUser, uc); 
				UserComponentParser.ParseRequestsCount(activeUser, uc); 

				usersArray[iUser] = uc;				
			}
			return usersArray;
		}
    }
    return null;
    
}

// статический метод получения списка активных пользователей, у которых в хэве есть альбом 
// @html - HTML-код со страницы альбома. 
// @return - массив объектов UserComponent. null, если таких пользователей нет. 
AlbumPageParser.ParseActiveUsers = function(html)
{
	var requestsNode = html.match(/<h4>Активные пользователи<\/h4>\s*<ul class="owners" style=".*">(\s*<li>\s*<p class="uploaded">\s*<img.*>\s*<p class="owner">\s*<span.*<\/span>\s*<p class="bitrate">[0-9]+\s*<div class="actions">\s*(<!--\s*-->\s*)?(<form .*>\s*((<input.*>\s*){2}|(<input.*>\s*<img.*>\s*))<\/form>\s*)?(<a.*class="requests".*<\/a>\s*)?<\/div>)+/gi);

	if(requestsNode !=null)
	{
		// список активных юзеров будет именно в нулевом элементе 
		// теперь разберем всех юзеров по отдельности
		var activeUsers = requestsNode[0].match(/<li>\s*<p class="uploaded">\s*<img.*>\s*<p class="owner">\s*<span.*<\/span>\s*<p class="bitrate">[0-9]+\s*<div class="actions">\s*(<!--\s*-->\s*)?(<form .*>\s*(<input.*>\s*){2}<\/form>\s*)+(<a.*class="requests".*<\/a>\s*)?<\/div>/gi);
		if(activeUsers!=null)
		{
			usersArray = new Array	(activeUsers.length);
			for(var iUser=0; iUser<activeUsers.length; iUser++)
			{
				var activeUser = activeUsers[iUser];
				var uc = new UserComponent();

				UserComponentParser.ParseFaceImage(activeUser, uc); 
				UserComponentParser.ParseUserName(activeUser, uc); 
				UserComponentParser.ParseUserBitrate(activeUser, uc); 
				UserComponentParser.ParseRequestButton(activeUser, uc); 
				UserComponentParser.ParseRequestsCount(activeUser, uc); 				
				
				usersArray[iUser] = uc;		
			}

			return usersArray;
		}
	}
	return null;    
}

// статический метод, который определяет был ли этот альбом уже скачан. 
// @html - HTML-код со страницы альбома. 
// @return - HTML-код, который содержит текст о том, что альбом был скачан. null, если альбом не скачивался.
AlbumPageParser.ParseAlreadyDownloaded = function(html)
{
	var alreadyDownloaded = html.match( /<p class="count">\s*Вы уже скачали этот альбом\s+[\.0-9]*\s*<\/p>/i);
	if(alreadyDownloaded != null)
	{
		return alreadyDownloaded[0]; 
	}
	return null;
}

// статический метод, который считывает теги альбома, если они есть. 
// @html - HTML-код со страницы альбома. 
// @return - HTML-код, который содержит все теги альбома. null, если тегов нет. 
AlbumPageParser.ParseAlbumTags = function(html)
{
	var tagsDiv = html.match(/<div id="tag_widget">\s*<ul>\s*(<li class="output">\s*<input type="hidden" name="tags" value=".*">\s*<a href="\/tags\/.*\/" rel="tag">.*<\/a>\s*<img.*>\s*)+<\/ul>/gi);
	if(tagsDiv!=null)
	{
		var tags = tagsDiv[0];
		var tagNames = tags.match(/<a href="\/tags\/.*\/" rel="tag">.*<\/a>/gi); 
		return tagNames; 
	}
	return null;
}

// статический метод, который считывает форму удаления из корзины, если альбом в корзине пользователя. 
// @html - HTML-код со страницы альбома. 
// @return - HTML-код формы отказа. null, если альбом не в корзине
AlbumPageParser.ParseCancelRequest = function(html)
{
/*
   <form action="/album_files/777798/remove_from_basket/" method="post" id="in_basket" class="buttons">
    <p>Альбом добавлен в <a href="/users/a_vzhik/basket/">корзину</a><br>
        <span class="" style="white-space: nowrap;"><a href="/users/minukhin/" class="user_link ">minukhin</a><sup style="font-size: 10px;">1011</sup></span>
, 320 kbps</p>
    <input type="hidden" name="redirect" value="/albums/144378/">
    <input type="image" class="image" src="/style/cancel.png" alt="Отменить">
  </form>
*/  

	var regex = new RegExp('<form action="(\/album_files\/\\d*\/remove_from_basket\/)".*>\\s*<p>.*\\s*<span (\\s|\\S)+<\/p>\\s*<input.*>\\s*<input.*>\\s*<\/form>','i');
    var cancelRequestForm = regex.exec(html); 
    if(cancelRequestForm!=null)
    {
        cancelLink = makeActionLink(cancelRequestForm[1]); 
        var cancelImgLink = 'src="/style/cancel.png"';
        var newForm = cancelRequestForm[0].replace(/<input\s+type="image"\s+class="image"\s+src="\/style\/cancel.png"\s+alt="Отменить">/i,	"");
        return newForm.concat(  "<center>", 
                                "   <div    class='emulateButton'", 
                                "           title='Отменить'", 
                                "           id='emulateCancelBtn'",
                                "           style='cursor:pointer; margin-right:5px; margin-top:5px; float:none;'",
                                "           postLink='",cancelLink,"' ",
                                "           postParamNames='redirect' ",
                                "           postParamValues='",rootServer,"' >",
                                "           <img ",cancelImgLink ,">",
                                "   </div>",
                                "</center>");
    }
    else
    {
        return null;
    }
}

// статическая фунция разбора инофрмации альбома. 
// @html - HTML-код со страницы альбома. 
// @return - заполненный объект AlbumInfo.
AlbumPageParser.ParseAlbumInfo = function (html, link)
{
	var ai = new AlbumInfo(); 

	var startIndex = html.indexOf('<div id="user_block">');
	var userName= null;
	if(startIndex!=null)
	{
		// очень приблизительно возьмем 300 байт. Вообще я проверял, там инфы где то на 250 байт.
		var endIndex = startIndex+300;
		var findNameBlock = html.substring(startIndex, endIndex); 
        
        var regex = new RegExp('<div id="user_block">(\\S|\\s)+<a href="\/users\/(.*)\/" .*>', 'gi');
        var userBlock = regex.exec(findNameBlock);
		userName= (userBlock && userBlock[2]) ? userBlock[2] : "undefined";
	}
	
	// html страница содержит кучу левого кода. попробуем его вырезать 
	// нас не интересует код до слов <div id="download" class="supplementary"> 
	var startIndex = html.indexOf('<div id="download" class="supplementary">');
	var finishIndex = html.indexOf('<ul class="hidden suggest tag">');
	var result = html.substring(startIndex, finishIndex);//.replace(/>\s+</gi, "> <");
	
    var cancelRequest = AlbumPageParser.ParseCancelRequest(result);
    if(cancelRequest!=null)
    {
        ai.m_cancelRequest = cancelRequest;
    }	
	else
	{
		var alreadyDwnld = AlbumPageParser.ParseAlreadyDownloaded(result);
		if(alreadyDwnld!=null)
		{
			 ai.m_alreadyDownloaded = alreadyDwnld;
		}
		
		var usersArray = AlbumPageParser.ParseDownloadedUsers(result);
		if(usersArray!=null)
		{
			ai.m_downloadUsers = usersArray;
		}

		usersArray = AlbumPageParser.ParseActiveUsers(result);
		if(usersArray!=null)
		{
			ai.m_requestUsers = usersArray;
		}
		
	}
	tagsArray = AlbumPageParser.ParseAlbumTags(result);
	if(tagsArray!=null)
	{
		ai.m_albumTags = tagsArray;
	}	
	
	// пришел текст со страницы альбома 
	var startIndex = html.indexOf('<span class="user_itself">');
	if(startIndex!=null)
	{
		// очень приблизительно возьмем 500 байт. Вообще я проверял, там инфы где то на 300 байт.
		var endIndex = startIndex+500;
		var findBtr = html.substring(startIndex, endIndex); 

        var regex = new RegExp('<p class="bitrate">([-0-9]+)', 'gi'); 
        var btr = regex.exec(findBtr); 
        if(btr!=null) 
        {
            ai.m_haveBitrate = btr[1];
        }
	}
	
	
	startIndex = html.indexOf('<div id="control">');
	if(startIndex!=null)
	{
		// очень приблизительно возьмем 500 байт. Вообще я проверял, там инфы где то на 300 байт.
		var endIndex = startIndex+500;
		var findPersIDBlock = html.substring(startIndex, endIndex); 
        
        var regex = new RegExp('<a href="\/users\/.+\/havelist\/([0-9]+)\/">', "gi"); 
        persLinkBlock = regex.exec(findPersIDBlock); 
        if(persLinkBlock != null)
        {
            id = persLinkBlock[1]; 
            ai.m_personalRemoveLink = "/users/"+userName+"/havelist/"+id+"/delete/";
			ai.m_personalEditAlbumLink = "/users/"+userName+"/havelist/"+id;
        }
	}
	ai.m_albumLink = link;
	return ai;
}

// статический класс разбора данных для объекта UserComponent
function UserComponentParser()
{

}; 

// метод получения иконки пользователя. 
//@userHtml - HTML-код одного пользователя. 
//@userComponent - объект, в который будет записано прочитанное значение. 
UserComponentParser.ParseFaceImage = function(userHtml, userComponent)
{
	// 1) вытягиваем изображение морды дисиди (ну вот того чертика с наушниками)
	var faceImg = userHtml.match(/<img.*>/i);
	if(faceImg == null)
	{
		// какая то херня случилась 
		//jQuery(albumWndSelector).append("Вы знаете, у меня проблемы с разбором тега faceImg <br/>");	   	  
		alert("Вы знаете, у меня проблемы с разбором тега faceImg <br/>");
		
	}
	userComponent.m_userImg = faceImg[0]; 	
}

// метод получения иконки пользователя. 
//@userHtml - HTML-код одного пользователя. 
//@userComponent - объект, в который будет записано прочитанное значение. 
UserComponentParser.ParseUserName = function(userHtml, userComponent)
{
	var userName = userHtml.match(/<span class="" style="[^"]*"><a href="[^"]*" class="[^"]*">.*<\/a><sup style="[^"]*">([-0-9]+)?<\/sup><\/span>/i);
	/*
	if(userName == null)
	{
		// какая то херня случилась 
		//jQuery(albumWndSelector).append("Вы знаете, у меня проблемы с разбором тега "+userHtml+" <br/>");	   	  
		alert("Вы знаете, у меня проблемы с разбором тега "+userHtml);
	}
	*/
	userComponent.m_userName = (userName && userName[0]) ? userName[0] : "<font color='red'>undefined</font>"; 

}

// метод получения значения битрейта, в котором альбом есть у пользователя. 
//@userHtml - HTML-код одного пользователя. 
//@userComponent - объект, в который будет записано прочитанное значение. 
UserComponentParser.ParseUserBitrate = function(userHtml, userComponent)
{ 
    var regex = new RegExp('<p\\s+class="bitrate">([0-9]+([- 0-9]+)?)', 'gi'); 
    var userBitrate = regex.exec(userHtml); 
    if(userBitrate != null)
    {
        userComponent.m_userBitrate = userBitrate[1];
    }
}


// метод получения кнопки заказа альбома у пользователя. 
//@userHtml - HTML-код одного пользователя. 
//@userComponent - объект, в который будет записано прочитанное значение. 
UserComponentParser.ParseRequestButton = function(userHtml, userComponent)
{
    var regex = new RegExp('<form.*action="([\\w\\d\/]*)".*>\\s*<input type="hidden".*>\\s*<input type="image".*(src="\\S*\\.\\w*").*>\\s*<\/form>', 'i'); 
    var requestForm = regex.exec(userHtml); 
    if(requestForm != null)
    {
        //userComponent.m_userRequestBtn = requestForm[2];    
        userComponent.m_requestLink = makeActionLink(requestForm[1]);
    }
    else
    {
        alert('requestForm == null');
    }
}

// метод получения иконки кнопки закачки альбома, залитого пользователем. 
//@userHtml - HTML-код одного пользователя. 
//@userComponent - объект, в который будет записано прочитанное значение. 
UserComponentParser.ParseDownloadButton = function(userHtml, userComponent)
{
    /* В userHtml будет приблизительно следующее :
	<form action="/album_files/652197/add_to_basket/" method="post" class="download">
	  <input type="image" class="image" src="/style/download.png" alt="Качать" title="Качать">
	  <input type="hidden" name="start" value="1">
	</form>
    */

    var regex = new RegExp('<form.*action="(\/album_files\/[0-9]+\/add_to_basket\/)".*class="download".*>\\s*<input type="image".*(src="\/\\w*\/\\w*\\.\\w*").*>\\s*<input type="hidden".*>\\s*<\/form>', 'i'); 
	var downloadForm = regex.exec(userHtml); 
    if(downloadForm != null)
    {
        //userComponent.m_userDownloadBtn = downloadForm[2];
        userComponent.m_downloadLink = makeActionLink(downloadForm[1]);
    }
    else
    {
        alert("downloadForm == null");
    }
}

// метод получения кнопки добавления альбома в корзину, залитого пользователем. 
//@userHtml - HTML-код одного пользователя. 
//@userComponent - объект, в который будет записано прочитанное значение. 
UserComponentParser.ParseBasketButton = function(userHtml, userComponent)
{
	/* В userHtml будет приблизительно следующее :
	<form action="/album_files/652197/add_to_basket/" method="post" class="basket">
	<input type="hidden" name="magic" value="maaaagic!">
	<input type="image" class="image" src="/style/basket.png" alt="В корзину" title="Отметить на скачивание">
	</form>
	*/

    var regex = new RegExp('<form.*action="(\/album_files\/[0-9]+\/add_to_basket\/)".*class="basket".*>\\s*<input type="hidden".*>\\s*<input type="image".*(src="\\S*\\.\\w*").*>\\s*<\/form>', 'i'); 
	var basketForm = regex.exec(userHtml); 
    if(basketForm != null)
    {
        //userComponent.m_userBasketBtn = basketForm[2];
        userComponent.m_basketLink =  makeActionLink( basketForm[1] );
    }
    else
    {
        alert('basketForm == null');
    }        
}

// метод получения количества заказов альбома у пользователя. 
//@userHtml - HTML-код одного пользователя. 
//@userComponent - объект, в который будет записано прочитанное значение. 
UserComponentParser.ParseRequestsCount = function(userHtml, userComponent)
{
	var rc = userHtml.match(/<sup>\d+<\/sup>/i);
	if(rc != null)
	{
		userComponent.m_requestsCount = rc[0];
	}
	return null;
}

﻿// объект, который кешируется. 
function CacheObj()
{
	// информация по альбому.  
	this.m_albumInfo = null; 
};

// объект  "кеш"
function Cache()
{
	// массив кешируемых объектов.
	this.m_cacheObjArray = new Array();
};

Cache.prototype.GetAI = function(albumLink){
	co = this.Get(albumLink); 
	return (co == null) ? null : co.m_albumInfo;
}

Cache.prototype.Set =  function(albumLink, cacheObj){
	this.m_cacheObjArray[albumLink] = cacheObj;
}

Cache.prototype.Get = function(albumLink){
	return this.m_cacheObjArray[albumLink];
}

Cache.prototype.SetAI = function(albumLink, ai){
	var co = this.Get(albumLink); 
	if(co == null)
	{
		co = new CacheObj(); 
		this.Set(albumLink, co);
	}
	co.m_albumInfo = ai;

}// имя окошка, в котором будет отражаться инфа по альбому 
var albumWndName = "a_vzhik_FAI_"; 
// а это уже готовое имя селектора по которому, я буду искать это окошко 
var albumWndSelector = "#"+albumWndName;

// метод создания идентификатора окна 
// @link - ссылка на альбом вида "/albums/xxxxxx"
function makeWndID(link)
{
	return albumWndName + link.replace(/\//gi, "_")	;
}

// метод формирования данных для POST запроса. работает для html узлов в которые вшиты 
// атрибуты "postLink", "postParamNames", "postParamValues"
// @obj - jquery объект из которого будем получать значения
function getPostData(obj)
{
	var paramNamesString = DomHelper.Attr(obj, "postParamNames");//jQuery(obj).attr("postParamNames");
	var paramValuesString = DomHelper.Attr(obj, "postParamValues");//jQuery(obj).attr("postParamValues");

	if((paramNamesString == null) || (paramValuesString == null))
	{

		return null;
	}
	
	var paramNames = paramNamesString.split(",");
	var paramValues = paramValuesString.split(",");

	var postdata = new Object();
	
	for(var iPar = 0; iPar<paramNames.length; iPar++)
	{
		postdata[paramNames[iPar]] = paramValues[iPar];
	}
	var spostdata = '';
	for ( n in postdata )
	{
		 spostdata+= '&' + n + '=' + encodeURIComponent(postdata[n]);
	}			
	return postdata;
}

function makeActionLink(innerLink)
{
    return rootServer + innerLink;
}

function makeAbsoluteUrl(innerLink)
{
    return rootServer + innerLink;
}

function defined( x ) {
    return x === undefined ? false : true;
}var downloadingImageUrl = "http://i48.tinypic.com/rsejjr.jpg";


// Базовый "класс" документа.
BaseDoc = VirtualClassEmulator(null, {
	constructor: function(ai) {
		this.m_wnd = null;

		this.m_state = null; //||'yes'||'no'
		this.m_albumInfo = ai;
		this.m_objState = (ai == null)?'justCreated':'responseReceived';//'sendingRequest'||'responseReceived';
  
	},
	SetAI: function(ai) { 
		this.m_albumInfo = ai;
	},
	IsJustCreated: function(){
		return (this.GetDocState()=='justCreated');
	},
	
	IsSendingRequest: function(){
		return (this.GetDocState()=='sendingRequest');
	},
	IsResponseReceived: function(){
		return (this.GetDocState()=='responseReceived');
	},	
	GetDocState: function(){
		return this.m_objState ;
	},
	SetDocState: function(s){
		this.m_objState = s;
		return this;
	},
	SetSendingRequestState:  function(){
		this.SetDocState('sendingRequest');
		return this;
	},	
	SetResponseReceivedState:  function(){
		this.SetDocState('responseReceived');
		return this;
	}
	
});


AddToHaveDoc = VirtualClassEmulator(BaseDoc, {
	constructor: function(ai) {
		this.constructor.prototype.constructor.call(this,ai);
	},
	
	// не общая функция. 
	GetHtml: function(){
		var html = null; 

		if(this.IsJustCreated() || this.IsSendingRequest())
		{
			return "<center><img src='"+downloadingImageUrl+"' /></center>";
		}
		if(this.m_albumInfo == null) 
		{
			return ""; 
		}
		var head = "<div><center style='font-size:10pt;'><strong> Хэвлист </strong></center></div><br/>";
		if(this.m_albumInfo.m_haveBitrate  == null)
		{
			var processLink = rootServer+this.m_albumInfo.m_albumLink +"/addtohavelist/";
			var animate = (this.IsResponseReceived()==true)
						  ?
						  ("")
						  :
						  ("<span id='already_added_to_havelist' style='margin:5px;margin-left:10px;'>vbvbc"+
						   "<img src='"+downloadingImageUrl+"'/>"+
						   "</span>");
			html =  head+
					"<div style='height:50px;padding:10px; text-align:center;'  >"+
					"Битрейт: <select id='"+makeWndID(this.m_albumInfo.m_albumLink)+"_btrSelector' style='width:65px;'>"+
					"<option value='128' >128</option>"+
					"<option value='160' >160</option>"+
					"<option value='192' >192</option>"+
					"<option value='224' >224</option>"+
					"<option value='256' >256</option>"+
					"<option value='320' >320</option>"+
					"<option value='999' >999</option>"+
					"<option value='custom' >custom</option>"+
					"</select>"+
					"<input readonly='1' type='text' id='"+makeWndID(this.m_albumInfo.m_albumLink)+"_btrCustom' style='background:lightgray; margin-left:5px; width:30px;' /><br/><br/>"+
					"Коммент: <input type='text' id='"+makeWndID(this.m_albumInfo.m_albumLink)+"_comment' style='width:100px;' /><br/>"+
					"</div>"+
					"<img id='"+makeWndID(this.m_albumInfo.m_albumLink)+"_btrApply' style='cursor:pointer;' postLink='"+ processLink +"' src='http://dcdnet.ru/style/add-to-havelist.png' />"+
					"</div>";
			
		}
		else
		{
			html =  head+
					"<div style='text-align:justify; padding-left:10px;padding-right:10px;'>"+
					 "Альбом есть в Вашем хэвлисте с качеством <span style='font-weight:bold;'>"+this.m_albumInfo.m_haveBitrate+" kbps."+ "</span><br/><br/>"+
					 "<center><span class='a_vzhik_delete' postLink='"+this.m_albumInfo.m_personalRemoveLink+"' postParamNames='page' postParamValues='1' style='font-size:8pt;color:#597377;cursor:pointer;'><u>Удалить из хэвлиста</u></span></center>"+
					"</div><br/>";
		}
		return html;
	},
	// не общая функция. 
	SetHandlers: function(wnd){
		var doc = this;
		// добавить обработчики 
		
		if(this.m_albumInfo.m_haveBitrate==null)
		{
			var bitrateSelectorId = makeWndID(this.m_albumInfo.m_albumLink)+"_btrSelector";
			var bitrateCustomId = makeWndID(this.m_albumInfo.m_albumLink)+"_btrCustom";
			var commentId = makeWndID(this.m_albumInfo.m_albumLink)+"_comment";
			
			changeNodes = DomHelper.XPath("//*[@id='"+bitrateSelectorId+"']");
			
			changeNodes.Each(function(node){
				HtmlHelper.Change(node, function(){
					var list = document.getElementById(bitrateSelectorId);
					var input = document.getElementById(bitrateCustomId);
					if(list.options[list.selectedIndex].value == "custom")
					{
						DomHelper.RemAttr(input,  "readonly");
						HtmlHelper.Css(input, "background","white");
					}
					else
					{
						DomHelper.Attr(input, "readonly", "1");
						HtmlHelper.Css(input, "background","lightgray");
					}					
				});
			});		

			var bitrateApplyButton = makeWndID(this.m_albumInfo.m_albumLink)+"_btrApply";
			clickNodes = DomHelper.XPath("//*[@id='"+bitrateApplyButton+"']");
			
			clickNodes.Each(function(node){
				HtmlHelper.Click(node, function(){
					// получим значение битрейта альбома.
					var list = document.getElementById(bitrateSelectorId);
					var bitrate = list.options[list.selectedIndex].value;
					if(bitrate == "custom")
					{
						var input = document.getElementById(bitrateCustomId);
						bitrate = input.value;
					}
					
					// теперь можно добавлять в хэв. 
					var processLink = makeAbsoluteUrl(doc.m_albumInfo.m_albumLink +"/addtohavelist/");					
					var postData = new Object(); 
					postData["bitrate"] = bitrate;
					
					var delayedComment = document.getElementById(commentId).value;

					wnd.SetWndHtml(doc.SetSendingRequestState().GetHtml());
					
					Ajax.Request(processLink, 
						function(html){
							parseAndShowAlbumInfo(html, doc.m_albumInfo.m_albumLink, doc, wnd); 
							// если добавили успешно и разобрали данные альбома (он уже в хеве)
							// значит у нас есть ссылка редактирования альбома (то есть можно вставлять комментарий).

							if(delayedComment != null && delayedComment!='')
							{
								wnd.SetWndHtml(doc.SetSendingRequestState().GetHtml());
									
								var pd = new Object(); 
								pd["min_bitrate"] = bitrate;
								pd["user_comments"] = delayedComment;//"user comment"+new Date();
								pd["redirect"] = makeAbsoluteUrl(doc.m_albumInfo.m_albumLink);

								Ajax.Request(makeAbsoluteUrl(doc.m_albumInfo.m_personalEditAlbumLink)+"/", 
											function(h){
												parseAndShowAlbumInfo(html, doc.m_albumInfo.m_albumLink, doc, wnd); 
											}, 
											function(h){
												wnd.SetWndHtml("Oooooups :(");
												logger.Log("Failed");
											}, 
											pd);
							}
						}, 
						function(html){
							wnd.SetWndHtml("Oooooups :(");
						}, 
						postData);
				});
			});			

		}
		else
		{
			var clickNodes = DomHelper.XPath("//*[@id='"+wnd.m_wndID+"']//*[@class='a_vzhik_delete']");
		
			// для каждого отобранного узла (вообще то он должен быть один...)
			clickNodes.Each(function(node){ 
				// добавляем обработчик клика на нем.
				HtmlHelper.Click(node, function(){
					var obj = this;
					var link = DomHelper.Attr(obj, "postLink");
					var postdata = getPostData(obj);
					wnd.SetWndHtml(doc.SetSendingRequestState().GetHtml());
					
					Ajax.Request(   makeAbsoluteUrl(link), 
									function(html){
										Ajax.Request(makeAbsoluteUrl(doc.m_albumInfo.m_albumLink), 
													function(html){
														parseAndShowAlbumInfo(html, doc.m_albumInfo.m_albumLink, doc, wnd); 
													}, 
													function(html){
													});
									},  
									function(html){
										wnd.SetWndHtml("Oooooups :(")
									}, 
									postdata);
				});
			});
		}
	}	
});

AlbumOpersDoc = VirtualClassEmulator(BaseDoc, {
	constructor: function(ai) {
		this.constructor.prototype.constructor.call(this,ai);
	},

	// не общая функция. 
	GetHtml: function(){
		if(this.IsJustCreated() || this.IsSendingRequest())
		{
			return "<center><img src='"+downloadingImageUrl+"' /></center>";
		}	
		if(this.m_albumInfo == null) 
		{
			return ""; 
		}
		var html = "";
		if(this.m_albumInfo.m_cancelRequest!=null)
		{
			html += "<center style='font-size:10pt; padding-bottom:5px;'>"+this.m_albumInfo.m_cancelRequest+"</center>";
			if(this.m_albumInfo.m_albumTags != null)
			{
				html += "<div class='emulateAlbumTags' style='padding:5px; text-align:left;'>";
				html = this.AppendTags(this.m_albumInfo.m_albumTags, html);
				html += "</div>";
			}			
		}
		else
		{
			html += "<table cellpadding='0' cellspacing='0' style='width:100%'>";
			if(this.m_albumInfo.m_alreadyDownloaded!=null)
			{
				var dateDownload = this.m_albumInfo.m_alreadyDownloaded.match(/[0-9]{2}(\.[0-9]{2}){2}/gi)[0];
				//html += "<center style='font-size:10pt; padding-bottom:5px;'><span style='font-size:8pt; color:green;'>Скачан "+dateDownload+" </span></center></br></br>";
				html+= "<tr><td><center style='font-size:10pt; padding-bottom:5px;'><span style='font-size:8pt; color:green;'>Скачан "+dateDownload+" </span></center></td></tr>";
			}
			
			if(this.m_albumInfo.m_downloadUsers != null)
			{
				html += "<tr><td><center style='font-size:10pt; padding-bottom:5px;'><strong>HTTP скачивание </strong></center></td></tr>";
				html += "<tr><td><div style='height:40px; overflow:auto;'>";
				html = this.AppendUsers(this.m_albumInfo.m_downloadUsers, html);
				html += "</div>";
				html += "</td></tr>";
			}
		
			if(this.m_albumInfo.m_requestUsers!=null)
			{
				html += "<tr><td><center style='font-size:10pt; padding-bottom:5px;'><strong>Активные пользователи</strong></center></td></td>";
				var prefferedHeight = (this.m_albumInfo.m_requestUsers.length < Preferences.VisibleRequestUserCount()) ? "" : "height:"+Preferences.VisibleRequestUserCount()*40+"px;";
				html += "<tr><td><div style='"+prefferedHeight+" overflow:auto;'>";
				html = this.AppendUsers(this.m_albumInfo.m_requestUsers, html);
				html += "</div></td></tr>";
				
			}
			
			if(this.m_albumInfo.m_albumTags != null)
			{
				html += "<tr><td><div class='emulateAlbumTags' style='padding:5px; text-align:left;'>";
				html = this.AppendTags(this.m_albumInfo.m_albumTags, html);
				html += "</div></td></tr>";
			}
			html += "</table>";			
		}
		
		return html;
	
	},
	// не общая функция. 
	SetHandlers: function(wnd){
		var doc = this;
		// добавить обработчики 
		var clickNodes = DomHelper.XPath("//*[@id='"+wnd.m_wndID+"']//*[@class='emulateButton']");
		
		// для каждого отобранного узла
		clickNodes.Each(function(node){ 
			// добавляем обработчик клика на нем.
			HtmlHelper.Click(node, function(){
				var obj = this;
				var link = DomHelper.Attr(obj, "postLink");
				postdata = getPostData(obj);
				doc.SetSendingRequestState();
				
				wnd.SetWndHtml(doc.GetHtml());

				Ajax.Request(   link, 
								function(html){
									Ajax.Request(makeAbsoluteUrl(doc.m_albumInfo.m_albumLink), 
												function(html){
													parseAndShowAlbumInfo(html, doc.m_albumInfo.m_albumLink, doc, wnd); 
												}, 
												function(html){
												});
								},  
								function(html){
									wnd.SetWndHtml("Oooooups :(");
								}, 
								postdata);				
			});
		});
	},
	
	AppendUsers: function(usersArray, resultHtml){
		for(var iUser = 0; iUser<usersArray.length; iUser++)
		{
			resultHtml += usersArray[iUser].GetHtml();
			if(iUser!=usersArray.length-1)
			{
				resultHtml += "<HR align='center' color='#A4B4B6' size='1' noshade='true'/>";
			}
		}   
		return resultHtml; 	
	},
	AppendTags: function(tagsArray, resultHtml){
		for(var iTag = 0; iTag<tagsArray.length; iTag++)
		{
			resultHtml += "<i>"+tagsArray[iTag]+"</i>";
			if(iTag!=tagsArray.length-1)
			{
				resultHtml += "; ";
			}
		}   
		return resultHtml; 	
	}
});


function Dragger()
{
	this._capturedWnd = null;
	this._lastDragPoint = null;
}

Dragger.prototype.Capture=function(wnd, point)
{
	this._capturedWnd = wnd;
	this._lastDragPoint = point;
	logger.Log("Capture:"+this._lastDragPoint.x+";"+this._lastDragPoint.y);
	
	document.addEventListener('mousemove', Dragger.Drag, false);
	document.addEventListener('mouseup', function(e){dragger.Release();}, false);
};

Dragger.prototype.Release=function()
{
	logger.Log("Release:"+this._capturedWnd.m_albumLink);
	this._capturedWnd = null;
	document.removeEventListener('mousemove', Dragger.Drag, false);
};

Dragger.Drag = function(e)
{
	if(dragger._capturedWnd != null)
	{
		logger.Log("Drag: "+e.pageX+";"+e.pageY);	
		dx = e.pageX-dragger._lastDragPoint.x;
		dy = e.pageY-dragger._lastDragPoint.y;
		dragger._capturedWnd.ShiftWindow(dx, dy);
		dragger._lastDragPoint={x:e.pageX, y:e.pageY};//dx;
		e.preventDefault();
		return false; 
	}
};

function FloatAlbumWnd(link)
{
	// ссылка к которой привязано окно 
	this.m_albumLink = link;
	// формируем селектор по которому будем выбирать окно
	this.m_wndID = makeWndID(link); 
	this.m_stateWnd = 0;

	// внутренняя функция инициализации. вызывается один раз - когда впервые создается окно, соответствующее альбому.  
	function Init(link){
		// всунул в тело документа блок для отображения информации по альбому. 
		windowNode = document.createElement("div");
		DomHelper.AddAttribute(windowNode, "style", "display:none;");
		DomHelper.AddAttribute(windowNode, "id", makeWndID(link));
		
		document.body.appendChild(windowNode);

		HtmlHelper.Css( document.getElementById(this.m_wndID), 'position','absolute');
		HtmlHelper.Css( document.getElementById(this.m_wndID), 'width','220px');
		HtmlHelper.Css( document.getElementById(this.m_wndID), 'background','#E0EAEB');
		HtmlHelper.Css( document.getElementById(this.m_wndID), 'text-align','center');
		HtmlHelper.Css( document.getElementById(this.m_wndID), 'border','solid 2px #A4B4B6');	
		
		return; 
	}

	// проверяем создано ли уже окно?
	if(!FloatAlbumWnd.IsWindowExist(link))
	{
		// если окна нет - значит его нужно создать 
		Init.call(this, link); 	
	}
	else
	{
		// а иначе оно уже создано и спрятано (просто покажем)
		this.BeautifulAppearance(1);
	}
	return ;
	

}

// метод получения окна по ссылке на альбом.
// @link - ссылка на альбом вида "/albums/xxxxxx"
FloatAlbumWnd.IsWindowExist = function(link)
{	
	// есть два способа проверить, было ли уже создано окно? 
	// 1) если albumInfo есть в хранилище, значит есть и окно. 
	// 2) если есть div с таким ID;
	// более достоверным я считаю второй способ, хотя он менее быстродейственен 
	var selectResult = document.getElementById( makeWndID(link) );
	return (selectResult == null) ? false : true; 
};

FloatAlbumWnd.FindOrCreateWnd = function(link)
{
	return new FloatAlbumWnd(link);
};

FloatAlbumWnd.prototype.Clear = function()
{
	HtmlHelper.Html( document.getElementById(this.m_wndID), '');
};

FloatAlbumWnd.prototype.SetWndHtml = function(html)
{	
	// при установке хтмл текста в окне, нам всегда необходимо добавлять закрывающую кнопку. 
	var closeBtnId = makeWndID(this.m_albumLink)+"_closeBtn";
	var moveBtnId = makeWndID(this.m_albumLink)+"_moveBtn";
	
	HtmlHelper.Html( document.getElementById(this.m_wndID), 
					 String.Format("<div style='float:right;cursor:pointer' id='{0}'>{1}</div>"+
								   "<div style='float:right;cursor:pointer' id='{2}'>{3}</div>{4}", 
								   closeBtnId, 
								   Preferences.CloseIcon(), 
								   moveBtnId, 
								   Preferences.MoveIcon(), 
								   html));

    // объявляю локальную переменную для того, чтобы использовать механизм closures 
	var localWnd = this; 
	
	document.getElementById(closeBtnId).addEventListener('click', 
		function(event) { 
			// если тут написать this.BeautifulAppearance(0) будет ошибка поскольку контекст уже запорот. 
			// (this - уже будет равен объекту на котором кликнули.)
			// но у нас же есть локальная переменная... вот и воспользуемся ей.  
			localWnd.BeautifulAppearance(0);
		}, 
		false);	
	document.getElementById(moveBtnId).addEventListener('mousedown',
		function(e) { 
			dragger.Capture(localWnd, {x:e.pageX, y:e.pageY});
		}, 
		false
	);
};

FloatAlbumWnd.Drag = function(event)
{
	logger.Log("Move!"+this.m_albumLink);
}

FloatAlbumWnd.prototype.SetWindowPos = function (x, y)
{
	HtmlHelper.Css( document.getElementById(this.m_wndID), 'top', y + 'px');
	HtmlHelper.Css( document.getElementById(this.m_wndID), 'left', x  + 'px');
};

FloatAlbumWnd.prototype.GetWindowPos = function()
{
	var wndNode = DomHelper.XPath("//*[@id='"+this.m_wndID+"']");
	if(wndNode.length>1)
	{
		throw "Not unique wnd id "+this.m_wndID;
	}
	if(wndNode == null)
	{
		return {x:0, y:0};
	}
	return {x:new Number(wndNode[0].style.left.substr(0,wndNode[0].style.left.length-2)), 
			y:new Number(wndNode[0].style.top.substr(0,wndNode[0].style.top.length-2))};
};

FloatAlbumWnd.prototype.GetWidth = function()
{
	return 220;
};

FloatAlbumWnd.prototype.ShiftWindow = function(dx, dy)
{
	logger.Log("Shift:"+dx+";"+dy);
	var currentPos = this.GetWindowPos();
	this.SetWindowPos(currentPos.x+dx, currentPos.y+dy);
}

FloatAlbumWnd.prototype.BeautifulAppearance = function(bShow)
{
	if(bShow == 0)
	{
		HtmlHelper.Css( document.getElementById(this.m_wndID), "display", "none");
	}
	else
	{
		HtmlHelper.Css( document.getElementById(this.m_wndID), "display", "block");
	}
	
	this.m_stateWnd = bShow; 
	
};


// Базовый "класс" логгера.
LoggerBase = VirtualClassEmulator(null, {
	constructor: function() {
		this.Inject();
	},
	Inject: function() { 
	},
	Log: function(s){
	}
});

DebugLogger = VirtualClassEmulator(LoggerBase, {
	constructor: function() {
		this.constructor.prototype.constructor.call(this);
	},
	Inject: function() { 
		newElement = DomHelper.CreateNode("div", {"style": "width:80%; background:black; color:#00DD00; font-size:8pt; font-family:Courier New; height:200px;overflow:scroll;", "id":"loggerWindow"});
		document.body.appendChild(newElement);
		loggerWnd = document.getElementById("loggerWindow");	
	},
	Log: function(s){
		loggerWnd = document.getElementById("loggerWindow");
		if(loggerWnd == null)
		{
			throw "Didn't found logger window";
		}
		
		loggerWnd.innerHTML += s+"<br/>";	
	}	
});

ReleaseLogger = VirtualClassEmulator(LoggerBase, {
	constructor: function() {
		this.constructor.prototype.constructor.call(this);
	},
	Inject: function() { 
	},
	Log: function(s){
	}	
});

var logger = new ReleaseLogger();

var rootServer = "http://dcdnet.ru";

var cache = new Cache();
var dragger = new Dragger();

window.addEventListener('load', onLoad, false);
})();