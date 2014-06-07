// ==UserScript==
// @name       Jimmy to Mao - with text
// @namespace  casiotone.org
// @version    0.1
// @description  combat liberalism
// @include    http://*.wikipedia.org/*
// @include    http://*.wikimedia.org/*
// @include    https://*.wikimedia.org/*
// @include	   https://wikimediafoundation.org/*
// @include	   https://*.wikimediafoundation.org/*
// @copyright  None whatsoever
// ==/UserScript==


// Inspired by RedNaylor: http://userscripts.org/scripts/show/119083
// Inspired by EdinUniInformatics: http://userscripts.org/scripts/show/119127
// Most of this code ripped from http://userscripts.org/scripts/show/118818, because we are lazy

//Use however you like for whatever you like.
(function() {
var strUA = navigator.userAgent.toLowerCase();
var flgOverRidden = false;

var rmsg = document.createElement('div');
rmsg.setAttribute('id', 'cn-bold-blue-text');
rmsg.appendChild(document.createTextNode('Please read:'));
rmsg.appendChild(document.createElement('br'));
rmsg.appendChild(document.createTextNode('A personal appeal from'));
rmsg.appendChild(document.createElement('br'));
rmsg.appendChild(document.createTextNode('your Chairman Mao'));

function loaded() {
	if(document.getElementById('cn-bold-blue-text') != null) {
		var omsg = document.getElementById('cn-bold-blue-text');
		var msgp = omsg.parentNode;
		msgp.replaceChild(rmsg, omsg);
   
		document.getElementById('cn-bold-blue-text').parentNode.parentNode.style.backgroundImage = "url(http://i.imgur.com/ZBahW.png)";
		document.getElementById('cn-bold-blue-text').parentNode.parentNode.style.backgroundSize = "155px";
	}
}

function combat() {
	var paras = [
		'We stand for active ideological struggle because it is the weapon for ensuring unity within the Party and the revolutionary organizations in the interest of our fight. Every Communist and revolutionary should take up this weapon.',
		'But liberalism rejects ideological struggle and stands for unprincipled peace, thus giving rise to a decadent, Philistine attitude and bringing about political degeneration in certain units and individuals in the Party and the revolutionary organizations.',
	
		'Liberalism manifests itself in various ways.',
	
		'To let things slide for the sake of peace and friendship when a person has clearly gone wrong, and refrain from principled argument because he is an old acquaintance, a fellow townsman, a schoolmate, a close friend, a loved one, an old colleague or old subordinate. Or to touch on the matter lightly instead of going into it thoroughly, so as to keep on good terms. The result is that both the organization and the individual are harmed. This is one type of liberalism.',
	
		'To indulge in irresponsible criticism in private instead of actively putting forward one\'s suggestions to the organization. To say nothing to people to their faces but to gossip behind their backs, or to say nothing at a meeting but to gossip afterwards. To show no regard at all for the principles of collective life but to follow one\'s own inclination. This is a second type.',
	
		'To let things drift if they do not affect one personally; to say as little as possible while knowing perfectly well what is wrong, to be worldly wise and play safe and seek only to avoid blame. This is a third type.',
	
		'Not to obey orders but to give pride of place to one\'s own opinions. To demand special consideration from the organization but to reject its discipline. This is a fourth type.',
	
		'To indulge in personal attacks, pick quarrels, vent personal spite or seek revenge instead of entering into an argument and struggling against incorrect views for the sake of unity or progress or getting the work done properly. This is a fifth type.',
	
		'To hear incorrect views without rebutting them and even to hear counter-revolutionary remarks without reporting them, but instead to take them calmly as if nothing had happened. This is a sixth type.',
	
		'To be among the masses and fail to conduct propaganda and agitation or speak at meetings or conduct investigations and inquiries among them, and instead to be indifferent to them and show no concern for their well-being, forgetting that one is a Communist and behaving as if one were an ordinary non-Communist. This is a seventh type.',
	
		'To see someone harming the interests of the masses and yet not feel indignant, or dissuade or stop him or reason with him, but to allow him to continue. This is an eighth type.',
	
		'To work half-heartedly without a definite plan or direction; to work perfunctorily and muddle along--"So long as one remains a monk, one goes on tolling the bell." This is a ninth type.',
	
		'To regard oneself as having rendered great service to the revolution, to pride oneself on being a veteran, to disdain minor assignments while being quite unequal to major tasks, to be slipshod in work and slack in study. This is a tenth type.',
	
		'To be aware of one\'s own mistakes and yet make no attempt to correct them, taking a liberal attitude towards oneself. This is an eleventh type.',
	
		'We could name more. But these eleven are the principal types.',
	
		'They are all manifestations of liberalism.',
	
		'Liberalism is extremely harmful in a revolutionary collective. It is a corrosive which eats away unity, undermines cohesion, causes apathy and creates dissension. It robs the revolutionary ranks of compact organization and strict discipline, prevents policies from being carried through and alienates the Party organizations from the masses which the Party leads. It is an extremely bad tendency.',
	
		'Liberalism stems from petty-bourgeois selfishness, it places personal interests first and the interests of the revolution second, and this gives rise to ideological, political and organizational liberalism.',
	
		'People who are liberals look upon the principles of Marxism as abstract dogma. They approve of Marxism, but are not prepared to practice it or to practice it in full; they are not prepared to replace their liberalism by Marxism. These people have their Marxism, but they have their liberalism as well--they talk Marxism but practice liberalism; they apply Marxism to others but liberalism to themselves. They keep both kinds of goods in stock and find a use for each. This is how the minds of certain people work.',
	
		'Liberalism is a manifestation of opportunism and conflicts fundamentally with Marxism. It is negative and objectively has the effect of helping the enemy; that is why the enemy welcomes its preservation in our midst. Such being its nature, there should be no place for it in the ranks of the revolution.',
	
		'We must use Marxism, which is positive in spirit, to overcome liberalism, which is negative. A Communist should have largeness of mind and he should be staunch and active, looking upon the interests of the revolution as his very life and subordinating his personal interests to those of the revolution; always and everywhere he should adhere to principle and wage a tireless struggle against all incorrect ideas and actions, so as to consolidate the collective life of the Party and strengthen the ties between the Party and the masses; he should be more concerned about the Party and the masses than about any private person, and more concerned about others than about himself. Only thus can he be considered a Communist.',
	
		'All loyal, honest, active and upright Communists must unite to oppose the liberal tendencies shown by certain people among us, and set them on the right path. This is one of the tasks on our ideological front.'
	];
	document.getElementById('appeal-body').innerHTML = '<p>' + paras.join('</p><p>') + '</p>';
	document.getElementById('From_Wikipedia_founder_Jimmy_Wales').innerText = "Combat Liberalism";
	document.getElementById('donate').innerHTML = '<iframe width="420" height="315" src="http://www.youtube.com/embed/LsOMEUamYkc?autoplay=1" frameborder="0" allowfullscreen></iframe>';
}


	document.addEventListener("DOMNodeInserted", loaded, false);
	combat()
})();