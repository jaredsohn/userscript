// DeviantART - Random Love v0.2
// Made By Luke Stevenson {http://lucanos.deviantart.com}
// Distributed and Maintained via GMVC
// Last updated: 04 February 2007
//
//   This script adds two buttons to the deviantART Main Toolbar to allow
// for quick and easy access to the Random Deviant & Random Deviation
// functions.
//
// ==UserScript==
// @name              DeviantART - Random Love
// @namespace         http://gmvc.lucanos.com/
// @description       (v0.2) Adds Buttons to Toolbar for Random Deviant & Random Deviation.
// @include           http://*.deviantart.com*
// ==/UserScript==

var buttonBar = document.evaluate("//div[@id='top']/div[@id='top-middle']/div", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

var buttonDeviant   = "R0lGODlhEgAQAOYAAJmeno6Tk4mMjIaJiZuenmFoZ3J4d5WamaSpqH+MiT9GRFFYVldeXFxjYW10cnN6eIeOjJGYlqyzsauysKqxr0FHRU9VU1BWVHd9e4SKiIySkKOpp5qgnra8urW7ube6uba5uH2CgJ6joWNqZ3V8eXN6d2txbn2DgIySj6OpppSal7m/vLC2s73DwJabmI2Sj6Sppr3Cv7a7uL3Bvra6t7G1ssDFwbq/u7O4tLK3sxobGk9RT8XJxb3BvaquqpCTkFxeXNfb19LW0ri7uJ2gnXZ4dmlraTU2Ndzf3IOFg0JDQigoKA0NDQAAAP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAE4ALAAAAAASABAAAAe+gAmCToSChgmETocjgwk+RJBEPoiCBQkICxcCCUlNnk1MQIIDFwsICAwKLkWfrTswFQoMCJcWQp87QjqfRCYWtIINt55ESDu8Jw2NIDdHR0pDQUq8KB+IigkqNjg5M52eRTIYg4UPHRk8P59FNS0k14UGHhs8n0s9KSsl8IoOEypDPhl5oUGCA34JAkQQwcOIQyIhOEQIwE8RAQgxIvlgAQFAxUIHhjU5QuPAx0QJKDg0koTCyUSKKMh0CZNQIAA7";
var buttonDeviation = "R0lGODlhEgAQANUAAHV7dxobGk9RT8XJxaquqpCTkFxeXNLW0ri7uJ2gnXx+fHZ4dmlraTU2NYOFg0JDQuDj3eXn4enr5LS2rry9tK2toKGhlbCwpKCgltvb0tTUy///9v7+9fz89KWkldXUx9XUyLu5qpeUgry6ro+Ld4OAcoF7Y7Csm3lyWbu1oVFIL1VMM5yTetnQt9nQuPTr0vLq0vDo0tjRvSgoKA0NDQAAAP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAADYALAAAAAASABAAAAabQJtQqCAkjoPFcGlruT6OmrRGM4BkrdayVVlMv4ILirU9TAWHwDRBIg9bZmnCIli3t5RG44GAPOxuQi0iGhkYFVFSCxFjWygtHQMFUwsVHI1vj5FTMxMrG5iCjzEIUwwlKqCBTY8wAwywCQAqL6GsWSYeIRIpKCi1qy2PLBVHCQQij7bCvnE1DRS+tizULCOwDA4n1atM2AJMQkEAOw%3D%3D";


if ( buttonBar ) {
	buttonBar.innerHTML =	"<a title='Go to a Random Deviation' href='http://www.deviantart.com/random/deviation' style='padding-top:1px;padding-bottom:1px;background:transparent url(data:image/gif;base64,"+buttonDeviation+") no-repeat center left;'>Deviation</a>\n"+
							"<a title='Go to a Random Deviant' href='http://www.deviantart.com/random/deviant'  style='padding-top:1px;padding-bottom:1px;background:transparent url(data:image/gif;base64,"+buttonDeviant+") no-repeat center left;'>Deviant</a>\n"+
							buttonBar.innerHTML;
}