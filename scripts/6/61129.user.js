// ==UserScript==
// @name          Modding Interface Schema
// @description   Modding Interface Schema
// @copyright      2009, Cristobal Arellano (http://www.onekin.org/)
// @contributor          Oscar Diaz         (http://www.onekin.org/)
// @contributor          Jon Iturrioz       (http://www.onekin.org/)
// ==/UserScript==
<!DOCTYPE rdf:RDF [
 <!ENTITY owl  "http://www.w3.org/2002/07/owl#">
 <!ENTITY rdf  "http://www.w3.org/1999/02/22-rdf-syntax-ns#">
 <!ENTITY rdfs "http://www.w3.org/2000/01/rdf-schema#"> 
 <!ENTITY xsd  "http://www.w3.org/2001/XMLSchema#">   
 <!ENTITY mod  "http://www.onekin.org/modding#"> 
]>
<rdf:RDF
  xmlns:base="http://www.onekin.org/modding#" xmlns:mod="&mod;"
  xmlns:owl="&owl;" xmlns:rdf="&rdf;" xmlns:rdfs="&rdfs;">
	<owl:Class rdf:ID="Event">
		<rdfs:subClassOf rdf:resource="&owl;Class"/>
	</owl:Class>
	<rdf:Property rdf:ID="payloadType">
		<rdfs:domain rdf:resource="#Event"/> 
	</rdf:Property>		
	<!--REQUIRED INTERFACE-->
	<owl:Class rdf:ID="PublishingEvent">
		<rdfs:subClassOf rdf:resource="#Event"/>
	</owl:Class>
	<owl:ObjectProperty rdf:ID="payloadTypePub">
		<rdfs:subPropertyOf rdf:resource="#payloadType"/>
		<rdfs:domain rdf:resource="#PublishingEvent"/>
		<rdfs:range rdf:resource="&owl;Class"/> 
	</owl:ObjectProperty>	
	<owl:ObjectProperty rdf:ID="uiEventType">
		<rdfs:domain rdf:resource="#PublishingEvent"/>
		<rdfs:range rdf:resource="&mod;Event"/> 
	</owl:ObjectProperty>
	<owl:DatatypeProperty rdf:ID="cancelable">
		<rdfs:domain rdf:resource="#PublishingEvent"/>
		<rdfs:range rdf:resource="&xsd;boolean"/>
	</owl:DatatypeProperty>	
	<!--PROVIDED INTERFACE-->		
	<owl:Class rdf:ID="ProcessingEvent">
		<rdfs:subClassOf rdf:resource="#Event"/>
	</owl:Class>
	<owl:ObjectProperty rdf:ID="payloadTypePro">
		<rdfs:subPropertyOf rdf:resource="#payloadType"/>	
		<rdfs:domain rdf:resource="#ProcessingEvent"/>
		<rdfs:range rdf:resource="&mod;Constraint"/> 
	</owl:ObjectProperty>	
	<owl:ObjectProperty rdf:ID="operationType">
		<rdfs:domain rdf:resource="#ProcessingEvent"/>
		<rdfs:range rdf:resource="&mod;Operation"/> 
	</owl:ObjectProperty>
	<owl:ObjectProperty rdf:ID="targetConcept">
		<rdfs:domain rdf:resource="#ProcessingEvent"/>
		<rdfs:range rdf:resource="&owl;Class"/> 
	</owl:ObjectProperty>
</rdf:RDF>