// ==UserScript==
// @name           pokaz plec
// @description    Pokazuje płeć oglądanego profilu
// @namespace      http://www.fotka.pl/profil/suchar
// @include        http://www.fotka.pl/profil/*
// @version        1.3
// @copyright      2014, suchar
// @author         suchar
// ==/UserScript==

var $ = unsafeWindow.$;

	var l = $("#profile-actions h1");
	if (l != null){		
		var p = document.createElement("IMG");
        if (unsafeWindow.profile_gender == "k") {
           p.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAACxIAAAsSAdLdfvwAAAAadEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjEwMPRyoQAAAV9JREFUOE+Nkr1KA0EUhQMJpMx77BZubSMWPoBoKWLKGfCvio1PImkN0djZKZLOQqzSJbJb25kqa/wZv7t7dzEwu3rgY9i55557J6ThnCsRxaFtJKGN4BJe4UvPAURSF5U9vwPi0NBsunFgUljAPQ19zjv9Tgnpis8fENh1DO8wxRxlo1QEsZWZSl18/oDQ3mL4FLP2rYjaGnyIryLAzJnyrH6vksA8sd28IsAumTBWr1fUH2DpDaAwkS0I6qh/Rby9Q+0NJt4Amg/BETRizbb2ZaKpzf01p+MZx94ADE0YwjfM4Jzf5CA/s2/uzYiQpjcgn2RaGI8wzpi0AJmYwksS2BNqLfFVBhTivQSZvWzl0J7ypKyx0J8BIrbZolkC9vWqVG0A03ahBxfgYAhnBPXUUh/A6pjNFe8ec7KBeYQbGKilPqAQP9pmtkFot/Wq1L8CaN7I/xdmR69K5T2u8QMzKsN9pw4upAAAAABJRU5ErkJggg==";
           p.title = "Kobieta"; 
        } else {
           p.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAQCAYAAAAmlE46AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAACxIAAAsSAdLdfvwAAAAadEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjEwMPRyoQAAAXlJREFUOE+Fks0rRGEUxt93BilTZCEL3QWlLDTl3jF28k+wsZiFhbKwkFJWtnYWxEaSKWVpY8diNO69RSllR2RBPppS5Pt35p7cbpPx1K9mnuec835d858841vXBk2eDbo9G45DXqP6onAWruALvmFdo/qicAoutEmaDzwTWI3/Fltso/gU7uAYLmXrGsfC7KC4F7rytpyicAk+oADTUCSLGzH6YAce4AUq4MM7FAetn9bSWKySI7wFadiGeViFJ5BzTWppLJZtJjgHzhAM5az/e3A8B87gEXrUjuTacAxTpk6olRDDPLI3WFQrEsYyVFwTdKqVEIMbyeVWj7LmRF2EsQn3vE1GrYTypmzJS9LsmjCldrVxAV6hX62E2Gor2Q3sqhUJIwty5Ruu8RvUrooVZLUZkDsoqB2JifLIa/AJ8gTOsNkXv53fcyC7KXGUFm2JRVGGcAtk8jNcg3wA8v8QHC2tVc74aW5whKIV2AO5tNEBE9Z+l8aYH1WetfXD3CbCAAAAAElFTkSuQmCC";
           p.title = "Mężczyzna";
        }
		p.style.position = "relative";
		p.style.top = "3px";
		p.style.marginLeft = "4px";
		l.append(p);
	}