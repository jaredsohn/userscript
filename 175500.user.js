// ==UserScript==
// @name		Emeraude
// @namespace		Komalis
// @description		Arme de moderation Emeraude.
// @version		1.0
// @include		http://*.forumjv.com/0-*-0-1-0-1-0-0.htm
// ==/UserScript==

var Emerald = function()
{
	// Declaration des membres.
	this.topics;
	this.allCheckbox;
	this.checkedAllCheckbox;
	
	// Declaration des methodes.
	// Setter pour topics;
	this.setTopics = function()
	{
		this.topics = new Array();
		var trTopic = document.getElementById('liste_topics').getElementsByTagName('tr');
		var nbTopic = trTopic.length - 1;
		for(var i = 1, j = 0 ; i <= nbTopic ; i++, j++)
		{
			this.topics[j] = new Topic(i, trTopic[i]);
		}	
	}
	
	// Ajout du header du bouton lock.
	this.addHeaderBoutonLock = function()
	{
		var thBoutonLock = document.createElement('th');
		thBoutonLock.className = "col_moder";
		var tr = document.getElementById('liste_topics').getElementsByTagName('tr')[0];
		var trThirdChild = tr.getElementsByTagName('th')[3];
		tr.insertBefore(thBoutonLock, trThirdChild);
	}
	
	// Ajout du header de la checkbox.
	this.addHeaderCheckbox = function()
	{
		var $ = this;
		var thSelecColonne = document.createElement('th');
		thSelecColonne.id = "c0";
		thSelecColonne.name = "selec0";
		thSelecColonne.scope = "col";
		thSelecColonne.style.width = "20px";
		thSelecColonne.onclick = function(){$.checkAllCheckbox(true);}
		var tr = document.getElementById('liste_topics').getElementsByTagName('tr')[0];
		var trFirstChild = tr.getElementsByTagName('th')[0];
		tr.insertBefore(thSelecColonne, trFirstChild);
		this.allCheckbox = document.getElementById('c0');
	}
	
	// Ajout du la fonction pour tout cocher d'un coup.
	this.checkAllCheckbox = function(state)
	{
		var $ = this;
		this.checkedAllCheckbox = state;
		if(this.checkedAllCheckbox)
		{
			Emeraude.topics.forEach(function(element, index)
			{
				if(!element.checked)
				{
					$.allCheckbox.onclick = function(){$.checkAllCheckbox(false);};
					Emeraude.topics[index].trTopic.getElementsByTagName('input')[0].click();
					// document.getElementById('checkbox' + element.id).click();
				}
			});
		}
		else
		{
			Emeraude.topics.forEach(function(element, index)
			{
				if(element.checked)
				{
					$.allCheckbox.onclick = function(){$.checkAllCheckbox(true);};
					Emeraude.topics[index].trTopic.getElementsByTagName('input')[0].click();
					// document.getElementById('checkbox' + element.id).click();
				}
			});
		}
	}
	
	// Constructor.
	this.init = function()
	{
		if(document.getElementsByClassName('col_moder')[0])
		{
			this.setTopics();
			this.addHeaderCheckbox();
			this.addHeaderBoutonLock();
		}
	}
	
	this.init();
};

// Decleration des classes.
var Topic = function(idTopic, refTopic)
{
	// Declaration des membres.
	this.id;
	this.trTopic;
	this.titre;
	this.href;
	this.hrefIcon;
	this.hrefDelete;
	this.hrefLock;
	this.checked;
	
	// Declaration des methodes.
	// Setter pour id.
	this.setId = function(idTopic)
	{
		this.id = idTopic;
	};
	
	// Setter pout trTopic.
	this.setTrTopic = function(refTopic)
	{
		this.trTopic = refTopic;
	};
	
	// Setter pour titre.
	this.setTitre = function()
	{
		this.titre = this.trTopic.getElementsByTagName('td')[4].getElementsByTagName('a')[0].innerHTML;
	};
	
	// Setter pour href.
	this.setHref = function()
	{
		this.href = this.trTopic.getElementsByTagName('td')[4].getElementsByTagName('a')[0].href;
	};
	
	// Setter pour hrefIcon.
	this.setHrefIcon = function()
	{
		this.hrefIcon = this.trTopic.getElementsByTagName('td')[1].getElementsByTagName('img')[0].src;
	};
	
	// Setter pour hrefDelete.
	this.setHrefDelete = function()
	{
		this.hrefDelete = this.trTopic.getElementsByTagName('td')[2].getElementsByTagName('a')[0].href;
	};
	
	// Setter pour hrefLock.
	this.setHrefLock = function()
	{
		var $ = this;
		var request = jQuery.ajax(this.href);
		request.success(function(data)
		{
			var lockDocument = document.implementation.createHTMLDocument('Lock');
			lockDocument.documentElement.innerHTML = data;
			if($.hrefIcon != "http://image.jeuxvideo.com/pics/forums/topic_cadenas.gif" && $.hrefIcon != "http://image.jeuxvideo.com/pics/forums/topic_marque_off.gif")
			{
				$.hrefLock = lockDocument.getElementsByClassName('bloquer')[0].href;
				$.majHrefBoutonLock($.hrefLock);
			}
			else
			{
				$.hrefLock = lockDocument.getElementsByClassName('debloquer')[0].href;
				$.majHrefBoutonLock($.hrefLock);
			}
		});
	};
	
	// Ajout de la checkbox pour le topic.
	this.addCheckbox = function()
	{
		var $ = this;
		var tdSelecColonne = document.createElement('td');
		var inputSelecColonne = document.createElement('input');
		inputSelecColonne.type = "checkbox";
		inputSelecColonne.id = "checkbox" + this.id;
		inputSelecColonne.onclick = function(){$.setChecked(true);};
		var topicTR = this.trTopic;
		var topicTRFirstChild = this.trTopic.getElementsByTagName('td')[0];
		tdSelecColonne.appendChild(inputSelecColonne);
		topicTR.insertBefore(tdSelecColonne, topicTRFirstChild);
	}
	
	// Setter pour checked.
	this.setChecked = function(state)
	{
		var $ = this;
		this.checked = state;
		if(this.checked)
		{
			var checkbox = this.trTopic.getElementsByTagName('input')[0];
			checkbox.onclick = function(){$.setChecked(false)};
			checkbox.checked = true;
		}
		else
		{
			var checkbox = this.trTopic.getElementsByTagName('input')[0];
			checkbox.onclick = function(){$.setChecked(true)};
			checkbox.checked = false;
		}
	}
	
	// Ajout du bouton de lock pour le topic.
	this.addBoutonLock = function()
	{
		var tdBoutonLock = document.createElement('td');
		var aBoutonLock = document.createElement('a');
		aBoutonLock.id = "lock" + this.id;
		aBoutonLock.href = this.hrefLock;
		aBoutonLock.target = "popup";
		var imgBoutonLock = document.createElement('img');
		imgBoutonLock.src = "http://image.noelshack.com/fichiers/2012/26/1341119589-bt_forum_bann_48h.gif";
		imgBoutonLock.height = "12";
		imgBoutonLock.width = "11";
		var topicTR = this.trTopic;
		var topicTRThirdChild = this.trTopic.getElementsByTagName('td')[3];
		aBoutonLock.appendChild(imgBoutonLock);
		tdBoutonLock.appendChild(aBoutonLock);
		topicTR.insertBefore(tdBoutonLock, topicTRThirdChild);
	}
	
	// MAJ href bouton lock.
	this.majHrefBoutonLock = function()
	{
		document.getElementById('lock' + this.id).href = this.hrefLock;
	}
	
	// Constructor.
	this.init = function()
	{
		this.setId(idTopic);
		this.setTrTopic(refTopic);
		this.addCheckbox();
		this.addBoutonLock();
		this.setTitre();
		this.setHref();
		this.setHrefIcon();
		this.setHrefDelete();
		this.setHrefLock();
		this.setChecked(false);
	};
	
	this.init();
}

var Emeraude = new Emerald();