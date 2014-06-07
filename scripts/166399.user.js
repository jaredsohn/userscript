// ==UserScript==
// @name       wolfram alpha keyboard unlocked
// @namespace  http://userscripts.org/scripts/show/166399
// @version    2.0
// @description  unlock the mathematical keyboard in wolfram alpha
// @match      http://*.wolframalpha.com/*
// ==/UserScript==

var refreshIntervalId = setInterval(function() {
    
    if (document.getElementById("Dagger") != null) {

	var symbols = [["Integral","∫"],["Summation","∑"],["Partial","∂"],["Product","∏"],["For","∀"],["There","∃"],["Union","∪"],["Intersection","∩"],["Difference","∇"]
               ,["CapitalDelta","∆"],["Alpha","α"],["Beta","β"],["Gamma","γ"],["Delta","δ"],["Epsilon","ε"],["Zeta","ζ"],["Eta","η"]
               ,["Theta","θ"],["Kappa","κ"],["Lambda","λ"],["Mu","μ"],["Nu","ν"],["Xi","ξ"],["Rho","ρ"],["Sigma","σ"],["Tau","τ"],["Phi","φ"],["Chi","χ"],["Psi","ψ"]
               ,["Omega","ω"],["CapitalGamma","Γ"],["CapitalTheta","Θ"],["CapitalLambda","Λ"],["CapitalXi","Ξ"],["CapitalUpsilon","Υ"],["CapitalPhi","Φ"],["CapitalChi","Ψ"]
               ,["CapitalOmega","Ω"],["Ohm","℧"],["Angstrom","Å"],["HBar","ħ"],["Alef","ℵ"],["Equilibrium","⇌"],["Arrow","→"],["Earth","⊕"]
               ,["Sun","⊙"],["Male","♂"],["Female","♀"],["Dagger","†"]];

	var element = null;


	for (var i=0; i < symbols.length; i++)
		{
   	 	element = document.getElementById(symbols[i][0]);
   	        element.className = "key";
   	        element.setAttribute("data-key-value", symbols[i][1]);
  	        element.children[0].innerHTML = symbols[i][1];
		}

    	symbols = null;
   	clearInterval(refreshIntervalId);
    }
    
}, 1000);