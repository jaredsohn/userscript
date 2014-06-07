// Greasemonkey script
// ==UserScript==
// @name          Reformat Metamath
// @description   Simplifies, expands, or simply reformats axiom requirements.
// @include       http://metamath.org/*
// @include       http://*.metamath.org/*
// @include       http://*.metamath.org:*/*
// @author        Charles R Greathouse IV
// @version       0.40 (beta), 2010-01-29
// @license       Public domain
// ==/UserScript==
// I hereby release this program into the public domain.  I assume no responsibility and grant no warranty.


// Global variables
var curTitle = document.getElementsByTagName('title')[0].firstChild.nodeValue;
var curAxiom = curTitle.split(' ');
var curAxiom = curAxiom[0];
if (curAxiom.substring(0, 2) == 'ax' && curAxiom.substring(0, 3) != 'ax-')
	curAxiom = 'ax-' + curAxiom.substring(2);
var allTD = document.getElementsByTagName('td');
var allLinks = document.evaluate('//a[@href]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var baseAxioms = null;	// Access through getBaseAxioms(td)


///////////////////////////////////////////////////////////////////////////////////////////////
//               General page reformatting and styling
///////////////////////////////////////////////////////////////////////////////////////////////

function format() {
	var sty =
		'abbr {border-bottom: 1px dotted #777}\n' +
		'#axioms p {margin: 0}\n' +
		'#mm-option-box {float: right; padding: 1px; font-size: 70%; width: 250px; height: 140px; background-repeat: no-repeat; background-position: bottom right; margin: 1em}\n' +
		'#mm-option-box > div {border: 1px solid #225; height: 99%; margin: -5px 5px 20px -5px}\n' +
		'#mm-option-box hr {color: #048; margin: 0 1em}\n' +
		'#mm-option-button {float: right}\n' +
		'#mm-option-button:hover {cursor: pointer}\n' +
		'a:link {text-decoration: none}\n' +
		'a:visited {text-decoration: none}\n' +
		'a:hover {text-decoration: underline}\n' +
		'.missing {color: #888}\n' +
		'.missing a:link {color: inherit}\n' +
		'.missing a:visited {color: inherit}\n' +
	'';
	
	if (GM_addStyle) {	// Introduced in Greasemonkey 0.6.1
			GM_addStyle(sty);
			return;
	}
	
	var formatstring = document.createElement('style');
	formatstring.type = 'text/css';
	formatstring.innerHTML = sty;
	document.getElementsByTagName('head')[0].appendChild(formatstring);
}


function Unicodify() {
	if (/\/mpegif/.test(location.href))
		location.replace(location.href.replace('/mpegif/', '/mpeuni/'));
	if (/\/qlegif/.test(location.href))
		location.replace(location.href.replace('/qlegif/', '/qleuni/'));
	for (var i = 0; i < allLinks.snapshotLength; i++) {
		var link = allLinks.snapshotItem(i);
		if (/mpegif/.test(link.href))
			link.href = link.href.replace('/mpegif/', '/mpeuni/');
		if (/qlegif/.test(link.href))
			link.href = link.href.replace('/qlegif/', '/qleuni/');
	}
}
function Gifify() {
	if (/\/mpeuni/.test(location.href))
		location.replace(location.href.replace('/mpeuni/', '/mpegif/'));
	if (/\/qleuni/.test(location.href))
		location.replace(location.href.replace('/qleuni/', '/qlegif/'));
	for (var i = 0; i < allLinks.snapshotLength; i++) {
		var link = allLinks.snapshotItem(i);
		if (/\/mpegif/.test(link.href))
			link.href = link.href.replace('/mpeuni/', '/mpegif/');
		if (/\/qlegif/.test(link.href))
			link.href = link.href.replace('/qleuni/', '/qlegif/');
	}
}



///////////////////////////////////////////////////////////////////////////////////////////////
//               Adding new elements (options, etc.), changing existing ones
///////////////////////////////////////////////////////////////////////////////////////////////

function addOptionsButton(el) {
	var aa, img;
	img = document.createElement('img');
	img.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAOCAMAAACSNVWDAAACAVBMVEX////+/v79/f38/Pz7+/vq6urv7+9oaGjOzs59fX319fXm5uadnZ3l5eW4uLihoaHa2trz8/Nzc3ONjY1KSkqoqKjZ2dleXl7c3NxkZGT09PR8fHyPj482NjbExMSvr69HR0eampq/v7/5+fkrKyvJyclDQ0PIyMiKiorY2NhnZ2dpaWmRkZHx8fHj4+OYmJixsbFISEgKCgr29vbe3t5ZWVlFRUX39/eOjo49PT1QUFCSkpJ4eHitra01NTW6urp0dHR1dXWpqamTk5OgoKB2dnbHx8fX19dycnJlZWW8vLxNTU1hYWFmZmbKysqsrKx7e3t5eXmwsLDAwMBdXV2qqqqysrJjY2Pf399fX19xcXHy8vLd3d3r6+v////+/v79/f35+fnu7u6/v7/29vb6+vpxcXHs7OyoqKi4uLj7+/vn5+egoKDe3t7a2tp2dnaTk5OioqJfX1/8/PyMjIw+Pj7v7+/ExMRPT0/d3d1zc3N0dHRiYmITExOfn59sbGzo6Oirq6u9vb3IyMicnJzl5eVoaGhvb2++vr7Y2NhhYWF7e3s8PDzOzs5nZ2eFhYVVVVWysrL4+Pi1tbW2trZAQECRkZFXV1ccHBzj4+N5eXmxsbGhoaE2NjZ1dXW8vLxubm5mZmbX19dgYGB9fX1ZWVmmpqZERETq6uqPj4/19fVxm0vxAAAAXnRSTlP+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+w/RNSQAAAYZJREFUeF4tUAOvLWEMnH67x5c2nm3btj39Di9t49m2rV/5snveNGmmk0ybDqAiFEABiFdWIQKIJwtUoFBqSzxtSKXSukqPCdUnoHodFiDgqDXGBbAu8RTGERFjLcSxAoUlr11/too+GsNsfNdO+n6yF/5WAPVzf22YPysdjQVQOrsgt/kNAgVA1ZKlKUhFKyBAWcMyzlux/M6e0KI5xSsjefmrZ1aWrw8cKyr/E8wPvV0AB2i+HycXPkp+WFx9oaa27nbmfc/20pIZRWu+//i59vXHDu9isv8G2dP36Qt/D718xfZM580p9k3eamodbUpmxh6wBUg8fPykc2PH8xebNoe2bN129XPbtx07S3ZFdg+PdO3tGp9gHAb79t89cBDThw4fOVp4/MTJnIpTlaeLc8/kxdrO5py7dx4OROB8DQLdF8OXgKrLVwbS/l/BQjfhRstSMADVkgQHu1OkBUnabD6+7BEIxfQaIP7XNQJjjFXxcjaiVv7nrEqlipJUJehDmJWz4z8MMHqFUrLu1wAAAABJRU5ErkJggg==';
	img.setAttribute('id', 'mm-option-button');
	el.insertBefore(img, el.firstChild);
	img.addEventListener('click', showOptions, false);
}


function closeOptions() {
	var opt = document.getElementById('mm-option-box');
	if (!opt)
		return;
	opt.parentNode.removeChild(opt);
	document.getElementById('mm-option-button').style.display = '';
	document.getElementsByTagName('body')[0].style.backgroundColor = '#fff';
}

function showOptions(e) {
	var parent = document.getElementById('axioms');
	var opt = document.createElement('div');
	opt.setAttribute('id', 'mm-option-box');
	opt.style.cssText += '\nbackground-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAfQAAAFeBAMAAACBf/AxAAAAD1BMVEX///8AAAAAAAAAAAAAAABRO2rwAAAABXRSTlMAuSNLh/hLf1UAAAGNSURBVHhe7M8BDQAwCMCwW3iCEvyLQ8haB31Rf1a9Rb1BXV29QF1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV1dXV392p8DGgAAEIZht0CCAiT8FvCvCSGjDlpM1PrXl8oKlTVYB/j+PImmkFf1AAAAAElFTkSuQmCC)';
	opt.addEventListener('click', closeOptions, false);
	opt.innerHTML = '<div><form>\n' +
		'<span title="Do not reformat the axioms in any way; leave them in their original form."><input name="rf" type="radio" id="rfLeaveAlone"> Don\'t touch</span>\n' +
		'<span title="Group the axioms by type (propositional, predicate, etc.), but do not add or subtract axioms."><input name="rf" type="radio" id="rfSameAxioms"> Reformat only</span><br>\n' +
		'<span title="Remove redundant axioms (any axioms which can be proved from other axioms), prefering standard forms when possible."><input name="rf" type="radio" id="rfSimplify"> Simplify axioms</span>\n' +
		'<span title="Recursively add all axioms implied by the current axiom set."><input name="rf" type="radio" id="rfExpand"> Expand axioms</span>\n' +
		'<hr>\n' +
		'<span title="Browse the Unicode version only."><input name="symb" type="radio" id="symbUnicode"> Force Unicode</span>\n' +
		'<span title="Browse the gif version only."><input name="symb" type="radio" id="symbGif"> Force gif</span><br>\n' +
		'<span title="Move between gif and Unicode based on the links clicked."><input name="symb" type="radio" id="symbLeaveAlone"> Default</span>\n' +
		'</form></div>';
	//document.getElementsByTagName('body')[0].style.backgroundColor = '#eee';
	parent.insertBefore(opt, parent.firstChild);
	document.getElementById('mm-option-button').style.display = 'none';
	setOptionDoodads();
}
function setOptionDoodads() {
	document.getElementById('rfLeaveAlone').addEventListener('click', function () {GM_setValue('reformat', 'leaveAlone'); setupAxiomSection()}, false);
	document.getElementById('rfSameAxioms').addEventListener('click', function () {GM_setValue('reformat', 'sameAxioms'); setupAxiomSection()}, false);
	document.getElementById('rfSimplify').addEventListener('click', function () {GM_setValue('reformat', 'simplify'); setupAxiomSection()}, false);
	document.getElementById('rfExpand').addEventListener('click', function () {GM_setValue('reformat', 'expand'); setupAxiomSection()}, false);
	
	var rf = GM_getValue('reformat');
	if (rf == 'leaveAlone')
		document.getElementById('rfLeaveAlone').checked = 'checked';
	else if (rf == 'sameAxioms')
		document.getElementById('rfSameAxioms').checked = 'checked';
	else if (rf == 'simplify')
		document.getElementById('rfSimplify').checked = 'checked';
	else if (rf == 'expand')
		document.getElementById('rfExpand').checked = 'checked';
	
	document.getElementById('symbLeaveAlone').addEventListener('click', function () {GM_setValue('symbolMode', 'leaveAlone')}, false);
	document.getElementById('symbUnicode').addEventListener('click', function () {GM_setValue('symbolMode', 'Unicode')}, false);
	document.getElementById('symbGif').addEventListener('click', function () {GM_setValue('symbolMode', 'gif')}, false);
	
	var symb = GM_getValue('symbolMode');
	if (symb == 'leaveAlone')
		document.getElementById('symbLeaveAlone').checked = 'checked';
	else if (symb == 'Unicode')
		document.getElementById('symbUnicode').checked = 'checked';
	else if (symb == 'gif')
		document.getElementById('symbGif').checked = 'checked';
}

function setupAxiomSection() {
	td = grabAxiomSection();
	if (td === null)
		return;
	text = getBaseAxioms(td);
	
	if (GM_getValue('reformat') == 'leaveAlone') {
		td.innerHTML = text;
		addOptionsButton(td);
		return;
	}
	
	text = text.replace(/<[^>]*>/g, '');			// Remove tags
	text = text.replace(/\n/g, ' ');
	text = text.replace(/&nbsp;/g, ' ');
	text = text.replace(/ +/g, ' ');
	text = text.replace(/ \d\d?\d?\d?\d? ?/g, ' ');	// Remove identifier tags: 1 to 5 digits
	text = text.replace('This theorem was proved from axioms:', '');
	
	// All the heavy lifting goes on inside workOnAxioms
	td.innerHTML = '<p>' + workOnAxioms(text) + '</p><p><small>' + text + '</small></p>';
	addOptionsButton(td);
}



///////////////////////////////////////////////////////////////////////////////////////////////
//               Axioms - the real work
///////////////////////////////////////////////////////////////////////////////////////////////

function nameSystem(axiomList) {
	// Propositional calculus
	var tmp = intersectAxioms(axiomList, 'ax-1 ax-2 ax-3 ax-mp');
	axiomList = rm(axiomList, tmp);
	var text = addSystem(tmp, 'Propositional calculus', 'ax-1 ax-2 ax-3 ax-mp');
	
	// Predicate calculus
	tmp = intersectAxioms(axiomList, 'ax-5 ax-6 ax-7 ax-gen ax-8 ax-9 ax-10 ax-11 ax-12 ax-13 ax-14 ax-17');
	axiomList = rm(axiomList, tmp);
	text += addSystem(tmp, 'Predicate calculus', 'ax-5 ax-6 ax-7 ax-gen ax-8 ax-9 ax-10 ax-11 ax-12 ax-13 ax-14 ax-17');
	
	// 'Redundant' axioms -- sometimes not actually redundant...
	tmp = intersectAxioms(axiomList, 'ax-4 ax-5o ax-6o ax-9o ax-10o ax-11o ax-15 ax-16');
	axiomList = rm(axiomList, tmp);
	text += addSystem(tmp, "'Redundant' predicate calculus axioms", '');
	
	// Set theory
	if (has(axiomList, 'ax-groth')) {	// GT = ZFC + ax-groth
		tmp = intersectAxioms(axiomList, 'ax-ext ax-rep ax-un ax-pow ax-reg ax-inf ax-groth');
		axiomList = rm(axiomList, tmp);
		text += addSystem(tmp, '<abbr title="Tarski&ndash;Grothendieck set theory">TG</abbr>', 'ax-ext ax-rep ax-un ax-pow ax-reg ax-groth');
	} else if (has(axiomList, 'ax-rep') || has(axiomList, 'ax-reg')) {
		if (has(axiomList, 'ax-ac')) {	// ZFC = ZF + ax-ac
			tmp = intersectAxioms(axiomList, 'ax-ext ax-rep ax-un ax-pow ax-reg ax-inf ax-ac');
			axiomList = rm(axiomList, tmp);
			text += addSystem(tmp, '<abbr title="Zermelo&ndash;Fraenkel set theory with the Axiom of Choice">ZFC</abbr>', 'ax-ext ax-rep ax-un ax-pow ax-reg ax-inf ax-ac');
		} else {						// ZF = Z + ax-rep + ax-reg
			tmp = intersectAxioms(axiomList, 'ax-ext ax-rep ax-un ax-pow ax-reg ax-inf');
			axiomList = rm(axiomList, tmp);
			text += addSystem(tmp, '<abbr title="Zermelo&ndash;Fraenkel set theory">ZF</abbr>', 'ax-ext ax-rep ax-un ax-pow ax-reg ax-inf');
		}
	} else if (has(axiomList, 'ax-un') || has(axiomList, 'ax-pow') || has(axiomList, 'ax-inf')) {
		if (has(axiomList, 'ax-ac')) {	// ZC = Z + ax-ac
			tmp = intersectAxioms(axiomList, 'ax-ext ax-un ax-pow ax-inf ax-sep ax-pr ax-ac');
			axiomList = rm(axiomList, tmp);
			text += addSystem(tmp, '<abbr title="Zermelo set theory with the Axiom of Choice">ZC</abbr>', 'ax-ext ax-un ax-pow ax-inf ax-sep ax-pr ax-ac');
		} else {						// Z = GST + ax-un + ax-pow + ax-inf
			tmp = intersectAxioms(axiomList, 'ax-ext ax-un ax-pow ax-inf ax-sep ax-pr');
			axiomList = rm(axiomList, tmp);
			text += addSystem(tmp, '<abbr title="Zermelo set theory">Z</abbr>', 'ax-ext ax-un ax-pow ax-inf ax-sep ax-pr');
		}
	} else {							// GST = ax-ext + ax-sep + ax-pr (+ axiom of adjunction)
		// TODO: Also has Axiom of Adjunction:  E. x A. y ( y e. x <-> ( y e. A \/ y = b ) )
		tmp = intersectAxioms(axiomList, 'ax-ext ax-sep ax-pr');
		axiomList = rm(axiomList, tmp);
		text += addSystem(tmp, '<abbr title="General set theory">GST</abbr>', 'ax-ext ax-sep ax-pr');
	}
	
	// More so-called 'redundant' axioms
	tmp = intersectAxioms(axiomList, 'ax-sep ax-nul ax-pr ax-inf2');
	axiomList = rm(axiomList, tmp);
	text += addSystem(tmp, "'Redundant' set theory axioms", '');
	
	
	//                                    ========== Hilbert Space Explorer ==========

	// Vector space axioms -- does ax-hv0cl belong here?
	tmp = intersectAxioms(axiomList, 'ax-hilex ax-hfvadd ax-hvcom ax-hvass ax-hv0cl ax-hvaddid ax-hfvmul ax-hvmulid ax-hvmulass ax-hvdistr1 ax-hvdistr2 ax-hvmul0');
	axiomList = rm(axiomList, tmp);
	text += addSystem(tmp, "Vector space axioms", 'ax-hilex ax-hfvadd ax-hvcom ax-hvass ax-hv0cl ax-hvaddid ax-hfvmul ax-hvmulid ax-hvmulass ax-hvdistr1 ax-hvdistr2 ax-hvmul0');
	
	// Hilbert Space axioms
	tmp = intersectAxioms(axiomList, 'ax-hfi ax-his1 ax-his2 ax-his3 ax-his4 ax-hcompl');
	axiomList = rm(axiomList, tmp);
	text += addSystem(tmp, "Hilbert axioms", 'ax-hfi ax-his1 ax-his2 ax-his3 ax-his4 ax-hcompl');


	//                                    ========== Quantum Logic Explorer ==========
	
	// Ortholattice axioms
	tmp = intersectAxioms(axiomList, 'ax-a1 ax-a2 ax-a3 ax-a4 ax-a5 ax-r1 ax-r2 ax-r4 ax-r5');
	axiomList = rm(axiomList, tmp);
	text += addSystem(tmp, "Ortholattice axioms", 'ax-a1 ax-a2 ax-a3 ax-a4 ax-a5 ax-r1 ax-r2 ax-r4 ax-r5');

	// Orthomodular Law
	tmp = intersectAxioms(axiomList, 'ax-r3 ax-wom');
	axiomList = rm(axiomList, tmp);
	text += addSystem(tmp, "Orthomodular law", 'ax-r3');

	// Other quantum
	tmp = intersectAxioms(axiomList, 'ax-wdol ax-3oa ax-4oa');
	axiomList = rm(axiomList, tmp);
	text += addSystem(tmp, "Other quantum axioms", '');

	// Any remaining axioms
	text += addSystem(axiomList, 'Other', '');

	if (text === '')
		return ''
	text = text.substring(5);	// Trim '<br>\n'
	
	return postprocess(text);
}


function postprocess(text) {
	// addComment(text, axiom, title, before, after)
	text = addComment(text, 'ax-1', 'principle of simplification', '', '');
	text = addComment(text, 'ax-2', 'Frege\'s axiom', '', '');
	text = addComment(text, 'ax-3', 'principle of transposition', '', '');
	text = addComment(text, 'ax-mp', 'modus ponens', '', '');
	text = addComment(text, 'ax-5', 'Axiom of Quantified Implication', '', '');
	text = addComment(text, 'ax-6', 'Axiom of Quantified Negation', '', '');
	text = addComment(text, 'ax-7', 'Axiom of Quantifier Commutation', '', '');
	text = addComment(text, 'ax-gen', 'Rule of Generalization', '', '');
	text = addComment(text, 'ax-8', 'Axiom of [transitive] Equality', '', '');
	text = addComment(text, 'ax-9', 'Axiom of Existence', '', '');
	text = addComment(text, 'ax-10', 'Axiom of Quantifier Substitution', '', '');
	text = addComment(text, 'ax-11', 'Axiom of Variable Substitution', '', '');
	text = addComment(text, 'ax-12', 'Axiom of Quantifier Introduction', '', '');
	text = addComment(text, 'ax-13', 'Axiom of [external] Equality', '', '');
 	text = addComment(text, 'ax-14', 'Axiom of [internal] Equality', '', '');
	text = addComment(text, 'ax-17', 'Axiom of Variable Quantification', '', '');
	text = addComment(text, 'ax-ext', 'Axiom of Extensionality', '', '');
	text = addComment(text, 'ax-rep', 'Axiom of Replacement', '', '');
	text = addComment(text, 'ax-pow', 'Axiom of Power Sets', '', '');
	text = addComment(text, 'ax-un', 'Axiom of Union', '', '');
	text = addComment(text, 'ax-reg', 'Axiom of Regularity', '', '');
	text = addComment(text, 'ax-inf', 'Axiom of Infinity', '', '');
	text = addComment(text, 'ax-ac', 'Axiom of Choice', '', '');
	text = addComment(text, 'ax-groth', 'Grothendieck\'s Axiom', '', '');
	text = addComment(text, 'ax-r3', 'Orthomodular law', '', '');
	text = addComment(text, 'ax-wom', 'Weak orthomodular law', '', '');
	text = addComment(text, 'ax-wdol', 'Weakly distributive ortholattice axiom', '', '');
	text = addComment(text, 'ax-3oa', '3-variable consequence of the orthoarguesion law', '', '');
	text = addComment(text, 'ax-4oa', '4-variable consequence of the orthoarguesion law', '', '');
	text = addComment(text, 'ax-hilex', 'Existence of H', '', '');
	text = addComment(text, 'ax-hfvadd', 'Vector addition', '', '');
	text = addComment(text, 'ax-hvcom', 'Commutativity of vector addition', '', '');
	text = addComment(text, 'ax-hvass', 'Associativity of vector addition', '', '');
	text = addComment(text, 'ax-hv0cl', 'Zero vector', '', '');
	text = addComment(text, 'ax-hvaddid', 'Vector addition with 0', '', '');
	text = addComment(text, 'ax-hfvmul', 'Scalar multiplication', '', '');
	text = addComment(text, 'ax-hvmulid', 'Scalar multiplication by 1', '', '');
	text = addComment(text, 'ax-hvmulass', 'Associativity of scalar multiplication', '', '');
	text = addComment(text, 'ax-hvdistr1', 'Distributivity of scalar multiplication (I)', '', '');
	text = addComment(text, 'ax-hvdistr2', 'Distributivity of scalar multiplication (II)', '', '');
	text = addComment(text, 'ax-hvmul0', 'Scalar multiplication with 0', '', '');
	text = addComment(text, 'ax-hfi', 'Inner product', '', '');
	text = addComment(text, 'ax-his1', 'Conjugate law for inner product', '', '');
	text = addComment(text, 'ax-his2', 'Distributive law for inner product', '', '');
	text = addComment(text, 'ax-his3', 'Associative law for inner product', '', '');
	text = addComment(text, 'ax-his4', 'Identity law for inner product', '', '');
	text = addComment(text, 'ax-hcompl', 'Completeness of H', '', '');
	return text;
}


function unsimplifyAxioms(axiomList) {
	// Ordered list of predicate calculus axioms: later entries rely on previous entries. Change with care!
	for (var i = 0; i < 3; ++i) {
		axiomList = unsimp(axiomList, 'ax-9', 'ax-3 ax-mp ax-gen ax-6o ax-9o');
		axiomList = unsimp(axiomList, 'ax-4', 'ax-1 ax-2 ax-3 ax-mp ax-5 ax-gen ax-8 ax-9 ax-11 ax-17');
		axiomList = unsimp(axiomList, 'ax-5', 'ax-1 ax-2 ax-mp ax-gen ax-4 ax-5o');
		axiomList = unsimp(axiomList, 'ax-5o', 'ax-1 ax-2 ax-3 ax-mp ax-5 ax-6 ax-gen ax-4');
		axiomList = unsimp(axiomList, 'ax-6', 'ax-1 ax-2 ax-3 ax-mp ax-5 ax-gen ax-4 ax-5o ax-6o');
		axiomList = unsimp(axiomList, 'ax-6o', 'ax-1 ax-2 ax-3 ax-mp ax-4 ax-6');
		axiomList = unsimp(axiomList, 'ax-10o', 'ax-1 ax-2 ax-3 ax-mp ax-5 ax-6 ax-gen ax-8 ax-9 ax-10 ax-11 ax-12 ax-4');
		axiomList = unsimp(axiomList, 'ax-10', 'ax-1 ax-2 ax-3 ax-mp ax-5 ax-6 ax-gen ax-8 ax-9 ax-12 ax-4 ax-10o');
		axiomList = unsimp(axiomList, 'ax-11', 'ax-1 ax-2 ax-3 ax-mp ax-5 ax-7 ax-gen ax-10 ax-12 ax-4 ax-5o ax-10o ax-11o');
	}
	
	// Other predicate calculus axioms needed for simplification, unordered:
	axiomList = unsimp(axiomList, 'ax-9o', 'ax-1 ax-2 ax-3 ax-mp ax-5 ax-6 ax-gen ax-9 ax-4');
	axiomList = unsimp(axiomList, 'ax-11o', 'ax-1 ax-2 ax-3 ax-mp ax-5 ax-6 ax-7 ax-gen ax-8 ax-9 ax-10 ax-11 ax-12 ax-17');
	axiomList = unsimp(axiomList, 'ax-16', 'ax-1 ax-2 ax-3 ax-mp ax-5 ax-6 ax-7 ax-gen ax-8 ax-9 ax-11 ax-17');	// ax16ALT: needs ax-9 but not ax-10 or ax-12.
	axiomList = unsimp(axiomList, 'ax-16', 'ax-1 ax-2 ax-3 ax-mp ax-5 ax-6 ax-7 ax-gen ax-8 ax-9 ax-10 ax-11 ax-12 ax-17');
	//axiomList = unsimp(axiomList, 'ax-15', 'ax-1 ax-2 ax-3 ax-mp ax-5 ax-6 ax-7 ax-gen ax-8 ax-9 ax-10 ax-12 ax-13 ax-14 ax-17 ax-4 ax-10o');
	
	// Set theory axioms
	axiomList = unsimp(axiomList, 'ax-sep', 'ax-1 ax-2 ax-3 ax-mp ax-7 ax-gen ax-8 ax-9 ax-12 ax-13 ax-14 ax-17 ax-4 ax-5o ax-6o ax-9o ax-rep');
	axiomList = unsimp(axiomList, 'ax-nul', 'ax-1 ax-2 ax-3 ax-mp ax-gen ax-4 ax-5o ax-sep');
	axiomList = unsimp(axiomList, 'ax-nul', 'ax-1 ax-2 ax-3 ax-mp ax-gen ax-4 ax-5o ax-rep');
	axiomList = unsimp(axiomList, 'ax-inf', 'ax-1 ax-2 ax-3 ax-mp ax-5 ax-6 ax-7 ax-gen ax-8 ax-9 ax-10 ax-11 ax-12 ax-13 ax-14 ax-17 ax-ext ax-rep ax-un ax-pow ax-inf2');
	//axiomList = unsimp(axiomList, 'ax-inf2', 'ax-1 ax-2 ax-3 ax-mp ax-5 ax-6 ax-7 ax-gen ax-8 ax-9 ax-10 ax-11 ax-12 ax-13 ax-14 ax-17 ax-ext ax-rep ax-un ax-pow ax-reg ax-inf');
	//axiomList = unsimp(axiomList, 'ax-pr', 'ax-1 ax-2 ax-3 ax-mp ax-5 ax-6 ax-7 ax-gen ax-8 ax-9 ax-10 ax-11 ax-12 ax-13 ax-14 ax-17 ax-ext ax-rep ax-pow');
	
	return axiomList;
}

function simplifyAxioms(axiomList) {
	// Axioms that aren't used elsewhere and can be simplified at once
	axiomList = simp(axiomList, 'ax-inf2', 'ax-1 ax-2 ax-3 ax-mp ax-5 ax-6 ax-7 ax-gen ax-8 ax-9 ax-10 ax-11 ax-12 ax-13 ax-14 ax-17 ax-ext ax-rep ax-un ax-pow ax-inf');
	axiomList = simp(axiomList, 'ax-15', 'ax-1 ax-2 ax-3 ax-mp ax-7 ax-gen ax-8 ax-10 ax-12 ax-13 ax-14 ax-17 ax-4 ax-5o ax-6o ax-9o ax-10o');
	axiomList = simp(axiomList, 'ax-pr', 'ax-1 ax-2 ax-3 ax-mp ax-7 ax-gen ax-8 ax-10 ax-11 ax-12 ax-13 ax-14 ax-17 ax-4 ax-5o ax-6o ax-9o ax-10o ax-16 ax-11o ax-ext ax-rep ax-sep ax-nul ax-pow');
	
	// Hilbert Space axioms that might be best left in
	axiomList = simp(axiomList, 'ax-hv0cl', 'ax-1 ax-2 ax-3 ax-mp ax-5 ax-6 ax-7 ax-gen ax-8 ax-9 ax-10 ax-11 ax-12 ax-13 ax-14 ax-17 ax-ext ax-un ax-pow ax-sep ax-pr');
	axiomList = simp(axiomList, 'ax-hilex', 'ax-1 ax-2 ax-3 ax-mp ax-5 ax-6 ax-7 ax-gen ax-8 ax-9 ax-10 ax-11 ax-12 ax-13 ax-14 ax-17 ax-ext ax-un ax-pow ax-sep');
	axiomList = simp(axiomList, 'ax-hfvadd', 'ax-1 ax-2 ax-3 ax-mp ax-5 ax-6 ax-7 ax-gen ax-8 ax-9 ax-10 ax-11 ax-12 ax-13 ax-14 ax-17 ax-ext ax-rep ax-un ax-pow ax-inf');
	axiomList = simp(axiomList, 'ax-hvcom', 'ax-1 ax-2 ax-3 ax-mp ax-5 ax-6 ax-7 ax-gen ax-8 ax-9 ax-10 ax-11 ax-12 ax-13 ax-14 ax-17 ax-ext ax-rep ax-un ax-pow ax-inf');
	axiomList = simp(axiomList, 'ax-hvass', 'ax-1 ax-2 ax-3 ax-mp ax-5 ax-6 ax-7 ax-gen ax-8 ax-9 ax-10 ax-11 ax-12 ax-13 ax-14 ax-17 ax-ext ax-rep ax-un ax-pow ax-inf');
	axiomList = simp(axiomList, 'ax-hv0cl', 'ax-1 ax-2 ax-3 ax-mp ax-5 ax-6 ax-7 ax-gen ax-8 ax-9 ax-10 ax-11 ax-12 ax-13 ax-14 ax-17 ax-ext ax-un ax-pow ax-sep ax-pr');
	axiomList = simp(axiomList, 'ax-hvaddid', 'ax-1 ax-2 ax-3 ax-mp ax-5 ax-6 ax-7 ax-gen ax-8 ax-9 ax-10 ax-11 ax-12 ax-13 ax-14 ax-17 ax-ext ax-rep ax-un ax-pow ax-inf');
	axiomList = simp(axiomList, 'ax-hfvmul', 'ax-1 ax-2 ax-3 ax-mp ax-5 ax-6 ax-7 ax-gen ax-8 ax-9 ax-10 ax-11 ax-12 ax-13 ax-14 ax-17 ax-ext ax-rep ax-un ax-pow ax-inf');
	axiomList = simp(axiomList, 'ax-hvmulid', 'ax-1 ax-2 ax-3 ax-mp ax-5 ax-6 ax-7 ax-gen ax-8 ax-9 ax-10 ax-11 ax-12 ax-13 ax-14 ax-17 ax-ext ax-rep ax-un ax-pow ax-inf');
	axiomList = simp(axiomList, 'ax-hvmulass', 'ax-1 ax-2 ax-3 ax-mp ax-5 ax-6 ax-7 ax-gen ax-8 ax-9 ax-10 ax-11 ax-12 ax-13 ax-14 ax-17 ax-ext ax-rep ax-un ax-pow ax-inf');
	axiomList = simp(axiomList, 'ax-hvdistr1', 'ax-1 ax-2 ax-3 ax-mp ax-5 ax-6 ax-7 ax-gen ax-8 ax-9 ax-10 ax-11 ax-12 ax-13 ax-14 ax-17 ax-ext ax-rep ax-un ax-pow ax-inf');
	axiomList = simp(axiomList, 'ax-hvdistr2', 'ax-1 ax-2 ax-3 ax-mp ax-5 ax-6 ax-7 ax-gen ax-8 ax-9 ax-10 ax-11 ax-12 ax-13 ax-14 ax-17 ax-ext ax-rep ax-un ax-pow ax-inf');
	axiomList = simp(axiomList, 'ax-hvmul0', 'ax-1 ax-2 ax-3 ax-mp ax-5 ax-6 ax-7 ax-gen ax-8 ax-9 ax-10 ax-11 ax-12 ax-13 ax-14 ax-17 ax-ext ax-rep ax-un ax-pow ax-inf');
	axiomList = simp(axiomList, 'ax-hfi', 'ax-1 ax-2 ax-3 ax-mp ax-5 ax-6 ax-7 ax-gen ax-8 ax-9 ax-10 ax-11 ax-12 ax-13 ax-14 ax-17 ax-ext ax-rep ax-un ax-pow ax-inf');
	axiomList = simp(axiomList, 'ax-his1', 'ax-1 ax-2 ax-3 ax-mp ax-5 ax-6 ax-7 ax-gen ax-8 ax-9 ax-10 ax-11 ax-12 ax-13 ax-14 ax-17 ax-ext ax-rep ax-un ax-pow ax-inf');
	axiomList = simp(axiomList, 'ax-his2', 'ax-1 ax-2 ax-3 ax-mp ax-5 ax-6 ax-7 ax-gen ax-8 ax-9 ax-10 ax-11 ax-12 ax-13 ax-14 ax-17 ax-ext ax-rep ax-un ax-pow ax-inf');
	axiomList = simp(axiomList, 'ax-his3', 'ax-1 ax-2 ax-3 ax-mp ax-5 ax-6 ax-7 ax-gen ax-8 ax-9 ax-10 ax-11 ax-12 ax-13 ax-14 ax-17 ax-ext ax-rep ax-un ax-pow ax-reg ax-inf ax-ac');
	axiomList = simp(axiomList, 'ax-his4', 'ax-1 ax-2 ax-3 ax-mp ax-5 ax-6 ax-7 ax-gen ax-8 ax-9 ax-10 ax-11 ax-12 ax-13 ax-14 ax-17 ax-ext ax-rep ax-un ax-pow ax-inf');
	axiomList = simp(axiomList, 'ax-hcompl', 'ax-1 ax-2 ax-3 ax-mp ax-5 ax-6 ax-7 ax-gen ax-8 ax-9 ax-10 ax-11 ax-12 ax-13 ax-14 ax-17 ax-ext ax-rep ax-un ax-pow ax-inf');
	
	// note: This is NOT proven in metamath!  Purists should take out this line.  But it was proven here:
	// Alfred Tarski, "On well-ordered subsets of any set", Fundamenta Mathematicae 32 (1939), pp. 176-183. http://matwbn.icm.edu.pl/ksiazki/fm/fm32/fm32115.pdf
	// TODO: Check which axioms this uses, and whether this paper or the 1938 paper is the right source.
	axiomList = simp(axiomList, 'ax-ac', 'ax-1 ax-2 ax-3 ax-mp ax-5 ax-6 ax-7 ax-gen ax-8 ax-9 ax-10 ax-11 ax-12 ax-13 ax-14 ax-17 ax-ext ax-rep ax-un ax-pow ax-reg ax-groth');
  //axiomList = simp(axiomList, 'ax-ac', 'ax-1 ax-2 ax-3 ax-mp ax-5 ax-6 ax-7 ax-gen ax-8 ax-9 ax-10 ax-11 ax-12 ax-13 ax-14 ax-17 ax-ext        ax-un ax-pow ax-reg ax-groth');
	
	// note: This is NOT proven in metamath!  Purists should take out this line.  But it was proven here:
	// M. Pavicic and N. Megill, "Binary Orthologic with Modus Ponens Is either Orthomodular or Distributive," Helvetica Physica Acta 71 (1998), pp. 610-628. ftp://m3k.grad.hr/pavicic/quantum-logic/1998-helv-phys-acta.ps.gz
	// TODO: Check which axioms this uses.
	axiomList = simp(axiomList, 'ax-wom', 'ax-a1 ax-a2 ax-a3 ax-a4 ax-a5 ax-r1 ax-r2 ax-r4 ax-r5 ax-r3');
	
	// Axioms needed for the above block, but not elsewhere
	axiomList = simp(axiomList, 'ax-11o', 'ax-1 ax-2 ax-3 ax-mp ax-7 ax-gen ax-8 ax-9 ax-10 ax-11 ax-12 ax-17 ax-4 ax-5o ax-6o ax-9o ax-10o');
	axiomList = simp(axiomList, 'ax-10o', 'ax-1 ax-2 ax-3 ax-mp ax-gen ax-8 ax-10 ax-11 ax-12 ax-4 ax-5o ax-6o ax-9o');
	axiomList = simp(axiomList, 'ax-16', 'ax-1 ax-2 ax-3 ax-mp ax-5 ax-6 ax-7 ax-gen ax-8 ax-9 ax-10 ax-11 ax-12 ax-17');
	axiomList = simp(axiomList, 'ax-16', 'ax-1 ax-2 ax-3 ax-mp ax-7 ax-gen ax-8 ax-9 ax-11 ax-17 ax-4 ax-5o ax-6o ax-9o');	// ax16ALT: needs ax-9 but not ax-10, ax-10o, or ax-12.
	axiomList = simp(axiomList, 'ax-inf', 'ax-1 ax-2 ax-3 ax-mp ax-5 ax-6 ax-7 ax-gen ax-8 ax-9 ax-10 ax-11 ax-12 ax-13 ax-14 ax-17 ax-ext ax-rep ax-un ax-pow ax-reg ax-groth');	// grothinf + inf0
	axiomList = simp(axiomList, 'ax-nul', 'ax-1 ax-2 ax-3 ax-mp ax-gen ax-4 ax-5o ax-sep');
	axiomList = simp(axiomList, 'ax-nul', 'ax-1 ax-2 ax-3 ax-mp ax-gen ax-4 ax-5o ax-rep');
	
	// Order is important! Do not remove axioms until everything relying on them has been simplified.
	axiomList = simp(axiomList, 'ax-sep', 'ax-1 ax-2 ax-3 ax-mp ax-7 ax-gen ax-8 ax-9 ax-12 ax-13 ax-14 ax-17 ax-4 ax-rep');
	axiomList = simp(axiomList, 'ax-9o',  'ax-1 ax-2 ax-3 ax-mp ax-gen ax-9 ax-4 ax-5o ax-6o');
	axiomList = simp(axiomList, 'ax-5o', 'ax-1 ax-2 ax-3 ax-mp ax-5 ax-6 ax-gen ax-4');
	axiomList = simp(axiomList, 'ax-5', 'ax-1 ax-2 ax-mp ax-gen ax-4 ax-5o');
	axiomList = simp(axiomList, 'ax-6o', 'ax-1 ax-2 ax-3 ax-mp ax-4 ax-6');
	axiomList = simp(axiomList, 'ax-6', 'ax-1 ax-2 ax-3 ax-mp ax-5 ax-gen ax-4 ax-5o ax-6o');
	axiomList = simp(axiomList, 'ax-4', 'ax-1 ax-2 ax-3 ax-mp ax-5 ax-gen ax-8 ax-9 ax-11 ax-17');
	
	return axiomList;
}


// Note: axiom is a single axiom, not a list!
function has(axiomList, axiom) {
	return (' ' + axiomList + ' ').match(' ' + axiom + ' ');
}


function addSystem(axioms, systemName, allAxioms) {
	axioms = axioms.replace(/ +/, ' ');
	axioms = axioms.replace(/^ /, '');
	axioms = axioms.replace(/ $/, '');
	if (axioms === '')
		return '';
	
	// Complete system
	if (axioms == allAxioms || allAxioms === '')
		return '<br>\n<strong>' + systemName + ':</strong> ' + addLinks(axioms);
	
	// Fragment
	missing = rm(allAxioms, axioms);
	return '<br>\n<strong>' + systemName + '</strong> (fragment): ' + addLinks(axioms) + ' <i class="missing">(missing ' + addLinks(missing) + ')</i>';
}


function addLinks(text) {
	text = text.replace(/ +/g, ' ');
	text = text.replace(/^ /, '');
	text = text.replace(/ $/, '');
	
	if (text === '')
		return '';
	tx = text.split(' ');
	
	// Commas could be added here if desired; just add a comma before the space and change substring(1) to substring(2).
	ret = '';
	for (var i = 0; i < tx.length; i++)
		ret += ' <a href="' + tx[i] + '.html">' + tx[i] + '</a>';
	return ret.substring(1);
}


function addComment(text, axiom, title, before, after) {
	if (!text.match('>' + axiom + '</a>'))
		return text;
	if (title !== '')
		return text.replace('>' + axiom + '</a>', ' title="' + title + '">' + before + axiom + after + '</a>');
	else
		return text.replace('>' + axiom + '</a>', '>' + before + axiom + after + '</a>');
}


// Intersects two space-separated lists of axioms, keeping the order of the second.
function intersectAxioms(ax1, ax2) {
	ax1 = ' ' + ax1 + ' ';
	ax = ax2.split(' ');
	ret = '';
	for (var i = 0; i < ax.length; i++) {
		if(ax1.match(' ' + ax[i] + ' '))
			ret += ' ' + ax[i];
	}
	if (ret === '')
		return '';
	return ret.substring(1);	// Trim initial space
}

function rm(axioms, toRemove) {
	axioms = ' ' + axioms + ' ';
	ax = toRemove.split(' ');
	for (var i = 0; i < ax.length; i++)
		axioms = axioms.replace(' ' + ax[i] + ' ', ' ');
	return axioms;
}

// text = simp(text, 'c', 'i');		// Remove c if the implicant i is present.
function simp(axioms, consequence, implicant) {
	if (!axioms.match(' ' + consequence + ' '))
		return axioms;
	imp = implicant.split(' ');
	for (var i = 0; i < imp.length; i++) {
		if (!axioms.match(' ' + imp[i] + ' '))
			return axioms;
	}
	return axioms.replace(' ' + consequence + ' ', ' ');
}


// text = simp(text, 'c', 'i');		// Add c if the implicant i is present.
function unsimp(axioms, consequence, implicant) {
	// Don't add in the current axiom!  Theorem "ax16" should not have the assumption "ax-16" added.
	if (axioms.match(' ' + consequence + ' ') || consequence == curAxiom)
		return axioms;
	imp = implicant.split(' ');
	
	for (var i = 0; i < imp.length; i++) {
		if (!axioms.match(' ' + imp[i] + ' '))
			return axioms;
	}
	return axioms + consequence + ' ';
}



///////////////////////////////////////////////////////////////////////////////////////////////
//               Helper functions
///////////////////////////////////////////////////////////////////////////////////////////////

function grabAxiomSection() {
	var td = document.getElementById('axioms');
	if (td !== null)
		return td;
	for (var i = 0; i < allTD.length; i++)
		if (/This theorem was proved from axioms/.test(allTD[i].innerHTML)) {
			allTD[i].setAttribute('id', 'axioms');
			return allTD[i];
		}
	return null;
}


function getBaseAxioms(td) {
	if (baseAxioms === null)
		baseAxioms = td.innerHTML;
	return baseAxioms;
}


function workOnAxioms(text) {
	var axiomList = ' ' + text + ' ';
	var rf = GM_getValue('reformat');
	
	if (rf == 'simplify' || rf == 'expand')
		axiomList = unsimplifyAxioms(axiomList);
	
	if (rf == 'simplify')
		axiomList = simplifyAxioms(axiomList);
	return nameSystem(axiomList);
}


function init() {
	defaults();
	format();
	
	if (GM_getValue('symbolMode') == 'Unicode')
		Unicodify();
	else if (GM_getValue('symbolMode') == 'gif')
		Gifify();

	setupAxiomSection();
}


/**/
function defaults() {
	if (GM_getValue('symbolMode') === undefined)
		GM_setValue('symbolMode', 'leaveAlone');
	if (GM_getValue('reformat') === undefined)
		GM_setValue('reformat', 'simplify');
}

if (!GM_getValue) {function GM_getValue(key) {	// Introduced in Greasemonkey 0.3
	key += '=';
	var C = document.cookie;
	C = C.replace(/;\s+/g, ';');
	C = C.split(';');
	for (c in C)
		if (C[c].indexOf(key) == 0)
			return C[c].substring(key.length, C[c].length);
	return null;
}}

if (!GM_setValue) {function GM_setValue(key, value) {	// Introduced in Greasemonkey 0.3
	document.cookie = key + '=' + value + '; expires=Sat, 31 Dec 2050 23:59:59 UTC; path=/';
}}

init();
