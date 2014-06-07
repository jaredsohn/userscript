// ==UserScript==
// @name       Iltalehti BBPois
// @namespace  http://yelmu.net/bbpois
// @version    0.8
// @description Big Brother BB uutiset piiloon Iltalehti
// @match      http://www.iltalehti.fi/*
// @copyright  2012+, Ville Muurinen
// ==/UserScript==

var replacementImg = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHMAAAAfCAIAAABbF2WQAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAKiSURBVGhD7ZrblcIwDESpi4K2HqqhGYphycux5ZE0EvF+7DG/ZPS4kmU7cHvPzxgCtzFmp9X3JDuqCXqyr8f9Znx+nlooaeHzR/enu+vDQAHcH6+r0Gn5KS4asg6bJv8m5fFCm7DnHyRvS1p3VukXKDC4tmc9E6K3zoCzQg9J4xA3B2tCqFmyjPnryX7y3uMNks0LZRIhx7XYJFaqwHAd0bNrR63hhhLcGzEprPGE3Z5iiixpHy6mdhpwJRIzYYk2LSRjr12WPBLaY405zbC7YLMaRXbpWjaGtihZ4dZ5GbDVdmPJgzPu/5BdM0mCLV1LnPVoF2gLE+dZ2lbdfIvdrPBvm32NmljqOyk6uO/IqivE66CscA8X1Sw7RoJkvSFnXkP4nj3q0hXS2+OzwtIIPdvPV9oiObNVO24zbDRkRcxYi871TpA13CkrxF9btlAPvZDtglp8Yp3IFj9kLIZtyDVWiADh/Zkni+/2akNa7x7qG6FeS52sOti7NoJYYmSNU0hkGtAzW9Z2gNCeItBht5NYL2n0ZuRfMxhs0z0rkuDJ0sL1QWDX3tnalYnCOgIIL3MoUNnKt4iR0xM5jvq5UAv5kmx2zsKAULuetZ4h5lA3QK1KiYdpsvDsxGyiaSGY1G2D+GjNJzJk4cEdnWbf3W8Kas/iqXemer1QfWVZmgOwcZYDt1owqs2tPp6yPYunG09WkCeEhayxTYB6Hk8rN4wqf/9I3B+nfKuHRk6D2Nirck4LM/kReMAska3Ienb2HqXDvyJb2wyRZYTOFScKF+TPkjVfiqiTI01WJk6TZYU8WfuqKu9UZ0losmpuVoxxsoo1n2xQaG0jys+xfQxmebSQe5GzVTK326t+QZ525j85hvXA/I/MKLST7CQ7isAou7/zInCEBcMRJQAAAABJRU5ErkJggg==';

var bbLinks = document.evaluate("//a[contains(@href, 'bigbrother')]/parent::*", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i = 0; i < bbLinks.snapshotLength; i++) {
    var bb = bbLinks.snapshotItem(i);
    
    var repl = document.createElement('div');
    var bbpoisImg = document.createElement('img');
    bbpoisImg.src = replacementImg;
    repl.appendChild(bbpoisImg);
    bb.parentNode.replaceChild(repl, bb);
    
    // Uncomment to remove instead of replacing with img
    //bb.parentNode.removeChild(bb);
}