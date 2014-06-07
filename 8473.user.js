??
// ==UserScript==
// @name	Baidu Mp3 Show Download Url
// @namespace	http://qxo.blogspot.com
// @description	show baidu mp3 download url,so you download it directly:-)
// @include	http://mp3.baidu.com/m?*
// ==/UserScript==

// 
// Modified from http://userscripts.org/scripts/show/3277
//
//

(function(){

	// release number
	document.DomL3XPathRelease = "0.0.3.0";
	
	// XPathException
	// An Error object will be thrown, this is just a handler to instantiate that object
	var XPathException = new _XPathExceptionHandler();
	function _XPathExceptionHandler()
	{
		this.INVALID_EXPRESSION_ERR = 51;
		this.TYPE_ERR = 52;
		this.NOT_IMPLEMENTED_ERR = -1;
		this.RUNTIME_ERR = -2;
		
		this.ThrowNotImplemented = function(message)
		{
			ThrowError(this.NOT_IMPLEMENTED_ERR, "This functionality is not implemented.", message);
		}
		
		this.ThrowInvalidExpression = function(message)
		{
			ThrowError(this.INVALID_EXPRESSION_ERR, "Invalid expression", message);
		}
		
		this.ThrowType = function(message)
		{
			ThrowError(this.TYPE_ERR, "Type error", message);
		}
		
		this.Throw = function(message)
		{
			ThrowError(this.RUNTIME_ERR, "Run-time error", message);
		}
		
		function ThrowError(code, description, message)
		{
			var error = new Error(code, "DOM-L3-XPath " + document.DomL3XPathRelease + ": " + description + (message ? ", \"" + message  + "\"": ""));
			error.code = code;
			error.name = "XPathException";
			throw error;
		}
	}
	
	// DOMException
	// An Error object will be thrown, this is just a handler to instantiate that object
	var DOMException = new _DOMExceptionHandler();
	function _DOMExceptionHandler()
	{
		this.ThrowInvalidState = function(message)
		{
			ThrowError(13, "The state of the object is no longer valid", message);
		}

		function ThrowError(code, description, message)
		{
			var error = new Error(code, "DOM : " + description + (message ? ", \"" + message  + "\"": ""));
			error.code = code;
			error.name = "DOMException";
			throw error;
		}
	}

	// XPathEvaluator 
	// implemented as document object methods
	
	// XPathExpression createExpression(String expression, XPathNSResolver resolver)
	document.createExpression = function
		(
		expression,		// String
		resolver		// XPathNSResolver
		)
	{
		// returns XPathExpression object
		return new XPathExpression(expression, resolver);
	}

	// XPathNSResolver createNSResolver(nodeResolver)
	document.createNSResolver = function
		(
		nodeResolver	// Node
		)
	{
		// returns XPathNSResolver
		return new XPathNSResolver(nodeResolver);
	}

	// XPathResult evaluate(String expresison, Node contextNode, XPathNSResolver resolver, Number type, XPathResult result)
	document.evaluate = function
		(
		expression,		// String
		contextNode,	// Node
		resolver,		// XPathNSResolver
		type,			// Number
		result			// XPathResult
		)
		// can raise XPathException, DOMException
	{
		// return XPathResult
		return document.createExpression(expression, resolver).evaluate(contextNode, type, result);
	}

	// XPathExpression
	function XPathExpression
	(
		expression, // String
		resolver // XPathNSResolver
	)
	{
		this.expressionString = expression;
		this.resolver = resolver;

		// XPathResult evaluate(Node contextNode, Number type, XPathResult result)
		this.evaluate = function
		(
			contextNode, // Node
			type, // Number
			result // XPathResult		
		)
			// raises XPathException, DOMException
		{
			// return XPathResult
			return (result && result.constructor == XPathResult ? result.initialize(this, contextNode, resolver, type) : new XPathResult(this, contextNode, resolver, type));
		}
		
		this.toString = function()
		{
			return "[XPathExpression]";
		}
	}

	// XPathNSResolver
	function XPathNSResolver(node)
	{
		this.node = node;
	
		// String lookupNamespaceURI(String prefix)
		this.lookupNamespaceURI = function
			(
			prefix			// String
			)
		{
			XPathException.ThrowNotImplemented();
			// return String
			return null;
		}

		this.toString = function()
		{
			return "[XPathNSResolver]";
		}
	}

	// XPathResult
	XPathResult.ANY_TYPE = 0;
	XPathResult.NUMBER_TYPE = 1;
	XPathResult.STRING_TYPE = 2;
	XPathResult.BOOLEAN_TYPE = 3;
	XPathResult.UNORDERED_NODE_ITERATOR_TYPE = 4;
	XPathResult.ORDERED_NODE_ITERATOR_TYPE = 5;
	XPathResult.UNORDERED_SNAPSHOT_TYPE = 6;
	XPathResult.ORDERED_SNAPSHOT_TYPE = 7;
	XPathResult.ANY_UNORDERED_NODE_TYPE = 8;
	XPathResult.FIRST_ORDERED_NODE_TYPE = 9;
	
	function XPathResult
			(
			expression,		// XPathExpression
			contextNode,	// Node
			resolver,		// XPathNSResolver
			type			// Number
			)
	{
		this.initialize = function(expression, contextNode, resolver, type)
		{
			this._domResult = null;
			this._expression = expression;
			this._contextNode = contextNode;
			this._resolver = resolver;
			if (type)
			{
				this.resultType = type;
				this._isIterator = (type == XPathResult.UNORDERED_NODE_ITERATOR_TYPE || 
					type == XPathResult.ORDERED_NODE_ITERATOR_TYPE || 
					type == XPathResult.ANY_TYPE);
				this._isSnapshot = (type == XPathResult.UNORDERED_SNAPSHOT_TYPE || type == XPathResult.ORDERED_SNAPSHOT_TYPE);
				this._isNodeSet = type > XPathResult.BOOLEAN_TYPE;
			}
			else
			{
				this.resultType = XPathResult.ANY_TYPE;
				this._isIterator = true;
				this._isSnapshot = false;
				this._isNodeSet = true;
			}
			return this;
		}
		
		this.initialize(expression, contextNode, resolver, type);
		
		this.getInvalidIteratorState = function()
		{
			return documentChangeDetected() || !this._isIterator;
		}
		
		this.getSnapshotLength = function()
			// raises XPathException
		{
			if (!this._isSnapshot)
			{
				XPathException.ThrowType("Snapshot is not an expected result type");
			}
			activateResult(this);
			// return Number
			return this._domResult.length;
		}
		
		// Node iterateNext()
		this.iterateNext = function()
			// raises XPathException, DOMException
		{
			if (!this._isIterator)
			{
				XPathException.ThrowType("Iterator is not an expected result type");
			}
			activateResult(this);
			if (documentChangeDetected())
			{
				DOMException.ThrowInvalidState("iterateNext");
			}
			// return Node
			return getNextNode(this);
		}
		
		// Node snapshotItem(Number index)
		this.snapshotItem = function(index)
			// raises XPathException
		{
			if (!this._isSnapshot)
			{
				XPathException.ThrowType("Snapshot is not an expected result type");
			}
			// return Node
			return getItemNode(this, index); 
		}
		
		this.toString = function()
		{
			return "[XPathResult]";
		}
		
		// returns string value of the result, if result type is STRING_TYPE
		// otherwise throws an XPathException
		this.getStringValue = function()
		{
			if (this.resultType != XPathResult.STRING_TYPE)
			{
				XPathException.ThrowType("The expression can not be converted to return String");
			}
			return getNodeText(this);
		}
		
		// returns number value of the result, if the result is NUMBER_TYPE
		// otherwise throws an XPathException
		this.getNumberValue = function()
		{
			if (this.resultType != XPathResult.NUMBER_TYPE)
			{
				XPathException.ThrowType("The expression can not be converted to return Number");
			}
			var number = parseInt(getNodeText(this));
			if (isNaN(number))
			{
				XPathException.ThrowType("The result can not be converted to Number");
			}
			return number;
		}
		
		// returns boolean value of the result, if the result is BOOLEAN_TYPE
		// otherwise throws an XPathException
		this.getBooleanValue = function()
		{
			if (this.resultType != XPathResult.BOOLEAN_TYPE)
			{
				XPathException.ThrowType("The expression can not be converted to return Boolean");
			}
			
			var	
				text = getNodeText(this);
				bool = (text ? text.toLowerCase() : null);
			if (bool == "false" || bool == "true")
			{
				return bool;
			}
			XPathException.ThrowType("The result can not be converted to Boolean");
		}
		
		// returns single node, if the result is ANY_UNORDERED_NODE_TYPE or FIRST_ORDERED_NODE_TYPE
		// otherwise throws an XPathException
		this.getSingleNodeValue = function()
		{
			if (this.resultType != XPathResult.ANY_UNORDERED_NODE_TYPE && 
				this.resultType != XPathResult.FIRST_ORDERED_NODE_TYPE)
			{
				XPathException.ThrowType("The expression can not be converted to return single Node value");
			}
			return getSingleNode(this);
		}
		
		function documentChangeDetected()
		{
			return document._XPathMsxmlDocumentHelper.documentChangeDetected();
		}
		
		function getNodeText(result)
		{
			activateResult(result);
			return result._textResult;
//			return ((node = getSingleNode(result)) ? (node.nodeType == 1 ? node.innerText : node.nodeValue) : null);
		}
		
		function findNode(result, current)
		{
			switch(current.nodeType)
			{
				case 1: // NODE_ELEMENT
					var id = current.attributes.getNamedItem("id");
					if (id)
					{
						return document.getElementById(id.value);
					}
					XPathException.Throw("unable to locate element in XML tree");
				case 2: // NODE_ATTRIBUTE
					var id = current.selectSingleNode("..").attributes.getNamedItem("id");
					if (id)
					{
						var node = document.getElementById(id.text);
						if (node)
						{
							return node.attributes.getNamedItem(current.nodeName);
						}
					}
					XPathException.Throw("unable to locate attribute in XML tree");
				case 3: // NODE_TEXT
					var id = current.selectSingleNode("..").attributes.getNamedItem("id");
					if (id)
					{
						var node = document.getElementById(id.value);
						if (node)
						{
							for(child in node.childNodes)
							{
								if (child.nodeType == 3 && child.nodeValue == current.nodeValue)
								{
									return child;
								}
							}
						}
					}
					XPathException.Throw("unable to locate text in XML tree");
			}
			XPathException.Throw("unknown node type");
		}
		
		function activateResult(result)
		{
			if (!result._domResult)
			{
				try
				{
					var expression = result._expression.expressionString;
					
					// adjust expression if contextNode is not a document
					if (result._contextNode != document && expression.indexOf("//") != 0)
					{

						expression = "//*[@id = '" + result._contextNode.id + "']" +
							(expression.indexOf("/") == 0 ? "" : "/") + expression;
					}
					
					if (result._isNodeSet)
					{
						result._domResult = document._XPathMsxmlDocumentHelper.getDom().selectNodes(expression);
					}
					else
					{
						result._domResult = true;
						result._textResult = document._XPathMsxmlDocumentHelper.getTextResult(expression);
					}
					
				}
				catch(error)
				{
					alert(error.description);
					XPathException.ThrowInvalidExpression(error.description);
				}
			}
		}

		function getSingleNode(result)
		{
			var node = getItemNode(result, 0);
			result._domResult = null;
			return node;
		}
		
		function getItemNode(result, index)
		{
			activateResult(result);
			var current = result._domResult.item(index);
			return (current ? findNode(result, current) : null);
		}
		
		function getNextNode(result)
		{
			var current = result._domResult.nextNode;
			if (current)
			{
				return findNode(result, current);
			}
			result._domResult = null;
			return null;
		}
	}
	
	document.reloadDom = function()
	{
		document._XPathMsxmlDocumentHelper.reset();
	}

	document._XPathMsxmlDocumentHelper = new _XPathMsxmlDocumentHelper();
	function _XPathMsxmlDocumentHelper()
	{
		this.getDom = function()
		{
			activateDom(this);
			return this.dom;
		}
		
		this.getXml = function()
		{
			activateDom(this);
			return this.dom.xml;
		}
		
		this.getTextResult = function(expression)
		{
			expression = expression.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "\"");
			var xslText = "<xsl:stylesheet version=\"1.0\" xmlns:xsl=\"http://www.w3.org/1999/XSL/Transform\">" +
				"<xsl:output method=\"text\"/><xsl:template match=\"*\"><xsl:value-of select=\"" + expression + "\"/>" +
				"</xsl:template></xsl:stylesheet>";
			var xsl = new ActiveXObject("Msxml2.DOMDocument");
			xsl.loadXML(xslText);
			try
			{
				var result = this.getDom().transformNode(xsl);
			}
			catch(error)
			{
				alert("Error: " + error.description);
			}
			return result;
		}
		
		this.reset = function()
		{
			this.dom = null;
		}
		
		function onPropertyChangeEventHandler()
		{
			document._propertyChangeDetected = true;
		}
		
		this.documentChangeDetected = function()
		{
			return (document.ignoreDocumentChanges ? false : this._currentElementCount != document.all.length || document._propertyChangeDetected);
		}
		
		function activateDom(helper)
		{
			if (!helper.dom)
			{
				var dom = new ActiveXObject("Msxml2.DOMDocument");
/** SELENIUM:PATCH TO ALLOW PROVIDE FULL XPATH SUPPORT */
				dom.setProperty("SelectionLanguage", "XPath");
/** END SELENIUM:PATCH */
				dom.async = false;
				dom.resolveExternals = false;
				loadDocument(dom, helper);
				helper.dom = dom;
				helper._currentElementCount = document.all.length;
				document._propertyChangeDetected = false;
			}
			else
			{
				if (helper.documentChangeDetected())
				{
					var dom = helper.dom;
					dom.load("");
					loadDocument(dom, helper);
					helper._currentElementCount = document.all.length;
					document._propertyChangeDetected = false;
				}
			}
		}
		
		function loadDocument(dom, helper)
		{
			return loadNode(dom, dom, document.body, helper);
		}
			

/** SELENIUM:PATCH for loadNode() - see SEL-68 */
		function loadNode(dom, domParentNode, node, helper)
		{
			// Bad node scenarios
			// 1. If the node contains a /, it's broken HTML
			// 2. If the node doesn't have a name (typically from broken HTML), the node can't be loaded
			// 3. Node types we can't deal with
			//
			// In all scenarios, we just skip the node. We won't be able to
			// query on these nodes, but they're broken anyway.
			if (node.nodeName.indexOf("/") > -1
			    || node.nodeName == ""
			    || node.nodeName == "#document"
			    || node.nodeName == "#document-fragment"
			    || node.nodeName == "#cdata-section"
			    || node.nodeName == "#xml-declaration"
			    || node.nodeName == "#whitespace"
			    || node.nodeName == "#significat-whitespace"
			   )
			{
				return;
			}
			
			// #comment is a <!-- comment -->, which must be created with createComment()
			if (node.nodeName == "#comment")
			{
				try
				{
					domParentNode.appendChild(dom.createComment(node.nodeValue));
				}
				catch (ex)
				{
					// it's just a comment, we don't care
				}
			}
			else if (node.nodeType == 3)
			{
				domParentNode.appendChild(dom.createTextNode(node.nodeValue));
			}
			else
			{
				var domNode = dom.createElement(node.nodeName.toLowerCase());
				if (!node.id)
				{
					node.id = node.uniqueID;
				}
				domParentNode.appendChild(domNode);
				loadAttributes(dom, domNode, node);
				var length = node.childNodes.length;
				for(var i = 0; i < length; i ++ )
				{
					loadNode(dom, domNode, node.childNodes[i], helper);
				}
				node.attachEvent("onpropertychange", onPropertyChangeEventHandler);
			}
		}
/** END SELENIUM:PATCH */

		function loadAttributes(dom, domParentNode, node)
		{
			for (var i = 0; i < node.attributes.length; i ++ )
			{
				var attribute = node.attributes[i];
				var attributeValue = attribute.nodeValue;
				if (attributeValue && attribute.specified)
				{
					var domAttribute = dom.createAttribute(attribute.nodeName);
					domAttribute.value = attributeValue;
					domParentNode.setAttributeNode(domAttribute);				
				}
			}
		}
	
	}


	var downloadimgsrc = "data:image/gif;base64,R0lGODlhFAAUAOYAAP///3jJrvTl4+r38sjp3se0q67i0V2Wd9Xz6gCZZv3+/k2YdgCUX2rDpgCSW3HGqgCZZ2vEpvr9/ACQWf7//v7+/gCWYe/49W7FqPf8+nLGqq3i0Z3YxGPAoVS7mOT07gSXY9Xz62C/oHfJrVG5l02Yde349KXWxI3Ru5XUv4TNtf3z9PT6+QCOVXvLsMayqQCTXt3x6/D59hygcJbVwACVYcrv5HiWfVuUddr17c68tPz+/WrDpQCTXfX8+k6Ydtzx6ur383KSd6/h0uzo5KTayBqicyCmeQCQWK/j0tDs4gCOVvv6+UyXdUyWc5nWwVe8mo/SvAKXYwCWYvX7+eDz7ZHTvWbCo9Hv5tHt5JTVv2rCpJLTvvzy8m3Fp2zEpsbo3VGaeDesgkO0j8fo3fH692WihcLm2gCVX3rKr8Szqdjv6FyWd2m2mPDk4kK0jjethACXZACYZBijdO/59Rykd6aWh1e7mRyebVi8nOr28tHHv9Tu5SSne4TIsAAAACH5BAAAAAAALAAAAAAUABQAAAfygACCg4SFhoIyA4qLjHomFYQZKh08DQ1eD5kYllsRTz6DSh4fCqUZF3QXVKUKZVong2RphBwzdXguhENmK4IEAYQoEzUtV4QGOAK+wINWDAkOEccHygC/hFzPDl/T1dcUginaGILgBtTLAEFQYkdyCXFzcG9AAOfewApRE2gQCRAWkASQYA+dNWYSSMBIwLDHGBaC7qUTtKYPA4BGsgySeJBQERBTpNDoNlHQDhFL8igglIRNNTAjCsW4U6XQBoN8NGBBwBNBCBs5evL0c8ONoApn2jhpsmDBjzBNo5YQYocIoS46XhTYyrWrmj1MDok1FAgAOw==";

	function addDownloadLink(url, aParent)
	{

		var xmlhttp = false;
		try {xmlhttp=PRO_xmlhttpRequest();}
		catch(e) {xmlhttp=false; alert("Error");}
		if(xmlhttp)
		{
			xmlhttp.open("GET",url,true);
			xmlhttp.send(null);
			xmlhttp.onreadystatechange = function() {
				if (xmlhttp.readyState == 4) {
					//<li class="li" style="margin-right:10px;"><a href="http://cai.csu.edu.cn/MusicResource/5000/Song3628.mp3"

					var text = xmlhttp.responseText;
					var startStr = '<li class="li" style="margin-right:10px;"><a href="';
					var startpos = text.indexOf(startStr);
					if(startpos != -1){
						startpos += startStr.length;
						var endpos = text.indexOf('"', startpos);
						var tUrl = text.substring(startpos, endpos);
						var dObj = document.createElement("A");
						dObj.href=tUrl;	 
						dObj.innerHTML='<img border=0 src="' + downloadimgsrc + '">';
						dObj.title="Direct Download";
						aParent.appendChild(dObj);			
					}
				}
			}
		}
	}


	//~?𜇟׾@?"k(?ᰉަd¥?kAO??Qy5pEx??ƕ?
	var vd= document.evaluate("//tr/td[2]/a[1]", document, null, XPathResult.ANY_TYPE,null); 

	//??GZ欚?tWd5ppt2|(?뒓S񾲲ޙO?尌W?nb?|arr,Z??^poUtxOjn$i8upo?m^ᩙ??xOޙO?G揓?Qy?~\?X`m簡|ig薝ឧᲝY?⒎t?\}
	var arr = new Array();
	var iter =vd.iterateNext();

	while(iter){	
		arr.push(iter);
		iter =vd.iterateNext();
	}
	for(var i=0 ; i < arr.length;i++){ //f?&1!v?m? ?ᰉަao?m^យ?m? ?m??䰅{^g8}
		iter= arr[i];	
		var url = iter.href;
		if(url.indexOf('http://www.baidu.com/search/mp3_help.html') != -1) continue;
		var aParent = iter.parentElement;
		addDownloadLink(url, aParent);
	}

})();
