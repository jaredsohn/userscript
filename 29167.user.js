// ==UserScript==
// @name           japanize kane kosugi diary
// @namespace      http://d.hatena.ne.jp/youpy/
// @include        http://www.kanekosugi.com/diary/*
// ==/UserScript==

// Licence: MIT

// thanks to Sumibi
// http://www.sumibi.org/
// http://www.sumibi.org/sumibi/sumibi_api_testing.html

(function() {
  var queries = $x('//td[@class="DiaryTxt"]');

  queries.forEach(function(q) {
    japanize(q);
  });

  function japanize(element) {
    var query = Array.map(element.childNodes, function(n) {
      return n.nodeType == 3 ? n.nodeValue : ''
    })
      .join(' ')
      .toLowerCase()
      .replace(/\s+/g, ' ')
      .replace(/ ([!\.\);,])([a-z])/g, '$1 $2')

    var request =
    <SOAP-ENV:Envelope
      xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/"
      xmlns:typens="urn:SumibiConvert"
      xmlns:xsd="http://www.w3.org/2001/XMLSchema"
      xmlns:soap="http://schemas.xmlsoap.org/wsdl/soap/"
      xmlns:soapenc="http://schemas.xmlsoap.org/soap/encoding/"
      xmlns:wsdl="http://schemas.xmlsoap.org/wsdl/"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    >
      <SOAP-ENV:Body>
        <mns:doSumibiConvert xmlns:mns="urn:SumibiConvert"
          SOAP-ENV:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">
          <query xsi:type="xsd:string">{query}</query>
          <sumi xsi:type="xsd:string">sumi_current</sumi>
          <history xsi:type="xsd:string"></history>
          <dummy xsi:type="xsd:string"></dummy>
        </mns:doSumibiConvert>
      </SOAP-ENV:Body>
    </SOAP-ENV:Envelope>
    ;

    GM_xmlhttpRequest({
      method : 'post',
      url : 'http://sumibi.org/cgi-bin/sumibi/testing/sumibi.cgi',
      data: request.toString(),
      headers: {
	  'Content-Type': 'text/xml'
      },
      onload : function(res) {
	var result = '';
	var nextIndex = 0;
	var responseText = res.responseText;
	var e4x = new XML(responseText.replace('<?xml version="1.0" encoding="UTF-8"?>', ''));
	var items =  e4x..*::resultElements[0]..*::*;
	for (var i in items) {
	  if(items[i].name() &&
	     items[i].name().toString() == 'urn:SumibiConvert::no' &&
	     items[i].toString() == nextIndex) {
	       nextIndex ++;
	       result += items[i - 1] + ' ';
	     }
	};

	var p = document.createElement('p');
	p.innerHTML = result;
	element.appendChild(p);
      }
    });
  }

  function $x(exp, context) {
    if (!context) context = document;
      var resolver = function (prefix) {
	var o = document.createNSResolver(context)(prefix);
	return o ? o : (document.contentType == "text/html") ? "" : "http://www.w3.org/1999/xhtml";
      }
    var exp = context.createExpression(exp, resolver);

    var result = exp.evaluate(context, XPathResult.ANY_TYPE, null);
    switch (result.resultType) {
      case XPathResult.STRING_TYPE : return result.stringValue;
      case XPathResult.NUMBER_TYPE : return result.numberValue;
      case XPathResult.BOOLEAN_TYPE: return result.booleanValue;
      case XPathResult.UNORDERED_NODE_ITERATOR_TYPE: {
	result = exp.evaluate(context, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	var ret = [];
	for (var i = 0, len = result.snapshotLength; i < len ; i++) {
          ret.push(result.snapshotItem(i));
	}
	return len != 0 ? ret : null;
      }
    }
    return null;
  }
})();
