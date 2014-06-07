// ==UserScript==
// @name          Scripting Interface for Books
// @include       *
// @copyright      2009, Cristobal Arellano (http://www.onekin.org/)
// @contributor          Oscar Diaz         (http://www.onekin.org/)
// @contributor          Jon Iturrioz       (http://www.onekin.org/)
// ==/UserScript==
var bookInterface={
  "ScriptingConcepts":[{
    "conceptId":"Book",
    "attributes":[{"attributeId":"title","type":"string"},
                  {"attributeId":"author","type":"array"},
                  {"attributeId":"isbn","type":"string",
                   "pattern":"/[0-9]{10}/"},
                  {"attributeId":"price","type":"number"}]
   }],
   "PublishingEvents":[{"id":"loadBook",
                        "payloadType":"Book",                      
                        "uiEventType":"load",
                        "cancelable":false}],
   "ProcessingEvents":[{"id":"appendChildBook",                                     
                        "payloadType":"HTMLDivElement",
                        "operationType":"appendChild",
                        "targetConcept":"Book"}]      	 
}