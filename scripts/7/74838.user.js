// ==UserScript==
// @name           A better Bing logo and favicon
// @namespace      userscripts.org
// @description    Replaces the typographic travesty that is the Bing logo with a better-looking one.
// @author         Dave Cortright
// @namespace      kpao.org
// @version        2.0
// @date           2011-07-04
// @include        http://*.bing.com/*
// @include        http://bing.com/*
// @include        https://*.bing.com/*
// @include        https://bing.com/*
// ==/UserScript==
var logo = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAm0AAABYCAMAAACQ/TC7AAAAWlBMVEUAAAAAP9P/pAAAP9P/pAAAP9P/pAAAP9P/pAAAP9MAP9P/pAAAP9P/pAAAP9P/pAAAP9MAP9P/pAAAP9P/pAAAP9P/pAAAP9P/pAAAP9MAP9P/pAAAP9P/pAAhpjcHAAAAHHRSTlMAEBAgIDAwQEBQYGBwcICAj5+fr6+/v8/P3+/vZHyupgAAAy9JREFUeNrt3MF2mzAQQNFRCFUglECJQiHy//9mjcEeQLJdTo0XPe+uQkJm9Q4IgxEAAAAAAAAAAAAAAAAAAAAAAID9WT8o5LqX94+PNwEeVVspV/34Phx9vQiwd20v34eTTwH2ru3nYfIqwM61fR0mLN2we22f1Ian1fZ+GH1zmYDda5Pfh5OfAuxe28uv4chGbNizNvX6xpoND60NeHJtxtpU/pEOAq7VZvKm94OuzuSONC+PCiuhxSArQKS2sveqy0W5QSUXSdX5s8YGrS0HZQKsamtav+SMnI3bclaudkxkLu38UmME0Nqi+jRam2kjO6q892stCzgEtYUVhbVpbPHc8uggckOsttaVrr1UYsLanA/ojpIuBnWXDU6mCGorExkktR+5oLbcj7rSHhXnnio5Mf1U33pQI8DARtZX6ZRNvq5tyquQSeFHRgb1NCjR4dMgPgnBiQ1Od5pbt6ot1dgm+SzL5PogJ8CRDZfy2lW6rK0Yc5IZ5we1HFW6iAvGc6GAWQ6lKD0rVlqb9lTITKZ/bfUwN9NM/wNcajOylGpF+pMLF2FmtV+/HpRxnYBVbU7W/KCL1WbC/dyNQSzccLM2LStWm9yqraQ23KutkbWW2vBw5tYJsN1QWxofZKgNyp/EF/fufm33rhJyaoNqgjOghlVsqa3Vf5lx1AaVxz7dzf1JsqW2YhyUyFzhqQ3KTHepktgNpy21mcidq9xTG+ZKf9Lb4JlIu6E2HdSlsyMbtWGp9aN6zMQ6P6pkW22mWw7KnKc2rKS9n/TOuctGazbUthrUjYOoDbHcQn0iW2uTzM9RG/4ytzaVDbXpIGrDPcbFvpi3vTZJ1oNqakMg74IvHW+vLRxkuU+KGFu1+maG7bWprB4HtbXlrjz2xDMgoDb8V1I3yKkNT3sss6I2PEHiB23wa2rDDno/SKL3/CsBHv9YZhN9nomXBuKh9C0NYYK9AI/VhbnVnleWYxeZH1VmddO05wVueLjaj/rKGkmyYZNVG3ZiWr/EeRRPzq0WYA+m4ciG5yl6P9fxElTsyJSdtlZyNYqdpWXtnGtK3n8KAAAAAAAAAAAA4Gn+AOetwhqwHGrKAAAAAElFTkSuQmCC";
var logoInverse = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAm0AAABYCAMAAACQ/TC7AAAAXVBMVEUAAAD/pAD/////////pAD/////pAD/////pAD/////pAD/////pAD/////pAD/////pAD/////pAD/////pAD/////pAD/////pAD/////////pAD/////pAD///8HyJBAAAAAHXRSTlMAEBAgMDBAQFBQYGBwcICAj4+fn6+vv7/Pz9/v76/ILVAAAAMVSURBVHja7dzdcpswEEDhjYhCKSHUoa4Kkff9H7M2li2DZKfMgK/Od5WJ8V6dCVL4EQAAAAAAAAAAAAAAAAAAAAAAgCfQk1bue3n//flTgCfU9vp1OPr7IsDWtb18HUZ/BNi6tvdD8CrAxrV9HAKWbnhebW8CbFzbj0PANgGb1yafh9GHAJvXJr+OrX29C7BhbdEb+1GsWhvw5NqKsiwLWYE9DjIC3KnN1Hsd+X39bUxNe5IPyjQuDgIytbVeI99I5E52clV08VCX9GQmgwZ6Q1Lbvtepvpge4OSinR1o5ZadD3KFABea5222NtMnB9YSVT43CAj0cW6xthBbqpKLWlXJDf9XW79vu14DX6S17TURDxTrr4O620GcTJHU1p6rKNpLMkltlZ4NTVmYsnF61snIDHcGOQEmtQ02WerX89pCXs18mXauq032DTb0x84Uk9p6I0Fcng2z2ooYW1De/Mb4zCAfBgE3tVm5ZXVUTWur03S6+GkTFmn5QcC1tlaieFbsprW16aE2Bujip0mOOwGutRUyVYTGMrWVma/Hn4xMWfYJiML2c27QkwW1FXcGeT3yAsSY5tzS2srHgwBqw1M9PAEuqM3cqU2pDVc+u0uwy3cJPrtLqKgN0f7RPy6W1JYf5KgNUa0jm/uLZBfUFgb5+SBqww2fVmIvF5yW1GbCl8xkELXhVqMjHysqQyPVotqkTQZVXqkNE72edVZObKdnThbVlg7aq1IbpgqvweCcGzTwZmltdj6I2pCwPn+D96La0kHUhnxuudgW1BYHURu+Y5xOOSPLaguKZFBPbZirh+Tp5cW1pYOGmuukyKm6Ib5QYXFt+UFclcd9tixXG8Q9INgadxzhCaw72VEbNvX4AYSB2rC+/JOjRk96AdY06InN3tC0F2BNXewqabARYE1V7p0fOx3xDl6sbEhzq3XUCbCuSs9aCUynZ7zADau7xDU0VkRs61VZtWEjptcpzqN4cm49WwRswjid64gNW2l1wrNmw4aKzutVx24U2zLVzjntXVdzEgUAAAAAAAAAAADwLP8ALnrQHMllK3AAAAAASUVORK5CYII%3D";
var favicon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABMklEQVR42p2NsUoDQRRF54/mBwKpLCS9P7Af4CIigiBCQCSIqSRoYRHEyiYfYLBJQLQSRUHBSoKjq+tCzK5inu8ub5zXufHCgcud++4Yt2gbzBlDMzJk6sbFNmHon4yMW2IjiOArY9wyG0EEXxnzvGLJI4KvCAZW2Qhe6X5ExXWfppMMwCOTngYDa2yEvzQ+6aCnwMA6G0GruOFfDyJQeq/3o5j0jXnZsCToY8kCfuTz4VzlGGhaEsIv3UiyADKRyjGwyUb4Th8Jyo5jyQLIIHRCjoEtNkJ+2SPo6+mWknbN5/BlBqGjb0zSsuR525unaZ79/jS5OKSPQaf0EN7QCTcY2LakSbsLfkQLGd7QUWBgxzqGNK+7NRqftii/6lFx34dHFjqBkUnatsHcMTQjuJn7AQ0h6hekmvgCAAAAAElFTkSuQmCC";

GM_addStyle(".hp_sw_logo, .sw_logo, .brandlogo {background:url('')}");

// kill the current favicon
var w = document.head.getElementsByTagName('link');
for (var i = 0; i < w.length; i++) {
	if (w[i].rel == 'shortcut icon' || w[i].rel == 'icon') {
		document.head.removeChild(w[i]);
	}
}

// add the new favicon
var x = document.createElement('link');
x.setAttribute('type', 'image/x-icon');
x.setAttribute('rel', 'shortcut icon');
x.setAttribute('href', favicon);
document.head.appendChild(x);

// change logo on bing.com home page
var logoInverseElement = document.createElement('img');
logoInverseElement.setAttribute('src', logoInverse);
logoInverseElement.setAttribute('style', 'position:relative;top:-40px;left:-29px;');
var hp_sw_logo = document.getElementsByClassName('hp_sw_logo')[0];
if (hp_sw_logo) {sw_logo.appendChild(logoInverseElement);}

// change logo on bing.com search results page
if (document.getElementsByClassName('sw_logoT')[0]) {document.getElementsByClassName('sw_logo')[0].removeChild(document.getElementsByClassName('sw_logoT')[0]); }
var logoElement = document.createElement('img');
logoElement.setAttribute('src', logo);
logoElement.setAttribute('style', 'position:relative;top:-28px;left:-42px;');
var sw_logo = document.getElementsByClassName('sw_logo')[0];
if (sw_logo) {sw_logo.appendChild(logoElement);}

function getElementsByClassName(classname, node) { if (!node) { node = document.getElementsByTagName('body')[0]; } var a = [], re = new RegExp('\\b' + classname + '\\b'); els = node.getElementsByTagName('*'); for (var i = 0, j = els.length; i < j; i++) { if ( re.test(els[i].className) ) { a.push(els[i]); } } return a; }