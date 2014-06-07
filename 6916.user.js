// ==UserScript==
// @name          Not Safe For Work (NSFW)
// @author        SpookyET
// @namespace     http://www.studioindustryllc.com
// @description   Censors elements of a page marked NSFW.
// @version       1.0.4
// @date          2007-01-01
// @include       *
// ==/UserScript==

(function(){
	var NSFW =
	{
		Config:
		{
			style:		
				'.nsfw-warning' +
				'{' +
					'color: red;' +
					'font-weight: bold;' +
					'font-size: 16px;' +
				'}' +
				
				'.nsfw-set' +
				'{' +
					'display: none;' +
				'}' +
						
				'object.nsfw' +
				'{' +
					'border: 1px solid red;' +
					'display: block;' + 
				'}',
						
			identifierRegex: /(^|\s)nsfw(\s|$)/i,
			storageIndexRegex: /(^|\s)nsfw-storage(\d+)$/,
			identifier: 'nsfw',
			censoredIdentifier: 'nsfw-set',	
			storageClassNamePrefix: 'nsfw-storage',
			warningClassName: 'nsfw-warning',
			warningMessage: ' [NSFW]',
			instructionMessage: 'Click to uncensor.',
		},
		
		censoredElements: new Array(),
		nsfwElement: null,
		relAttributeValue: null,
		classAttributeValue: null,
		
		/**
		 * Censors NSFW elements.
		 * 
		 * @param {String}	elementName	The tag name used to search for 
		 * 								NSFW (optional).
		 * @param {Element}	parent 		The node to query for NSFW
		 * 								elements (optional).
		 */
		censor: function(elementName, parent)
		{
			var elements = 
				(document || parent).getElementsByTagName('*' || elementName);

			this.addStyle();
			
			for (var index = 0; this.nsfwElement = elements[index]; index++)
			{
				this.relAttributeValue = this.nsfwElement.getAttribute('rel');
				this.classAttributeValue = this.nsfwElement.getAttribute('class');
				
				if (this.classAttributeValue &&
					NSFW.Config.identifierRegex.test(this.classAttributeValue))
				{
					if (this.isNSFWElementObject())
					{
						this.censorObject();
					}
					else
					{
						this.censorWithClassAttribute();
					}
				}
				
				if (this.nsfwElement.nodeName.toLowerCase() == 'a' &&
					this.relAttributeValue &&
					NSFW.Config.identifierRegex.test(this.relAttributeValue))
				{
					this.censorWithRelAttribute();
				}
			}
		},
		
		/**
		 * Censors an element that has the "class" attribute set to "nsfw".
		 */
		censorWithClassAttribute: function()
		{			
			var parentElement = this.nsfwElement.parentNode;
			var nsfwElementClone = this.nsfwElement.cloneNode(true);
			var storageIndex = this.censoredElements.push(nsfwElementClone) - 1;
			var censoredElement = document.createElement(this.nsfwElement.nodeName);

			for (var index = 0; index < this.nsfwElement.attributes.length; index++)
			{
				censoredElement.setAttribute(
					this.nsfwElement.attributes[index].name,
					this.nsfwElement.attributes[index].value);
			}
			
			censoredElement.appendChild(this.createNSFWWarningElement());
			censoredElement.addEventListener('click', this.uncensor, false);
			
			this.setStorageIndex(censoredElement, storageIndex);
			
			parentElement.replaceChild(censoredElement, this.nsfwElement);
		},

		/**
		 * Censors an element that has the "rel" attribute set to "nsfw".
		 */		
		censorWithRelAttribute: function()
		{			
			var parentElement = this.nsfwElement.parentNode;
			var nsfwElementClone = this.nsfwElement.cloneNode(true);
			var storageIndex = this.censoredElements.push(nsfwElementClone) - 1;
			var censoredElement = this.nsfwElement;
			
			censoredElement.appendChild(this.createNSFWWarningElement());
			censoredElement.addEventListener('click', this.uncensor, false);
			
			this.setStorageIndex(censoredElement, storageIndex);
		},
		
		/**
		 * Censors an element that has the class attribute set to "nsfw"
		 * and is an object, embed, or img.
		 */			
		censorObject: function()
		{
			var parentElement = this.nsfwElement.parentNode;
			var nsfwElementClone = this.nsfwElement.cloneNode(true);
			var storageIndex = this.censoredElements.push(nsfwElementClone) - 1;
			var censoredElement = document.createElement('object');
			var style = 
				"width: " + this.nsfwElement.width + 'px;'+
				"height: " + this.nsfwElement.height + 'px;';
			
			for (var index = 0; index < this.nsfwElement.attributes.length; index++)
			{
				if (this.nsfwElement.attributes[index].name == 'src' ||
					this.nsfwElement.attributes[index].name == 'data')
				{
					continue;
				}
				
				censoredElement.setAttribute(
					this.nsfwElement.attributes[index].name,
					this.nsfwElement.attributes[index].value);
			}
			
			censoredElement.setAttribute('style', style);
			censoredElement.setAttribute('title', NSFW.Config.instructionMessage);
			censoredElement.appendChild(this.createNSFWWarningElement());
			censoredElement.addEventListener('click', this.uncensor, true);
			
			this.setStorageIndex(censoredElement, storageIndex);
			
			parentElement.replaceChild(censoredElement, this.nsfwElement);
		},
		
		/**
		 * Uncensors an element.
		 * 
		 * @param {Event} eventArgs The event arguments.
		 */
		uncensor: function(eventArgs)
		{			
			var censoredElement = eventArgs.currentTarget;
			var storageIndex = NSFW.getStorageIndex(censoredElement);
			var parent = censoredElement.parentNode;
			
			eventArgs.preventDefault();
			parent.replaceChild(NSFW.censoredElements[storageIndex], censoredElement);
			censoredElement.removeEventListener('click', NSFW.censor, false);
		},
		
		/**
		 * Creates a NSFW warning element.
		 * 
		 * @return An element containing the NSFW warning.
		 */
		createNSFWWarningElement: function()
		{
			var nsfwWarningElement = document.createElement('span');
	
			nsfwWarningElement.setAttribute('class', NSFW.Config.warningClassName);
			nsfwWarningElement.setAttribute('title', NSFW.Config.instructionMessage);
			nsfwWarningElement.appendChild(
				document.createTextNode(NSFW.Config.warningMessage));
			
			return nsfwWarningElement;
		},
			
		/**
		* Checks if the NSFW element is an object.
		*
		* @return True if it is an object; otherwise, false.
		*/
		isNSFWElementObject: function()
		{
			var nodeName = this.nsfwElement.nodeName;
			
			if (nodeName == 'img' || nodeName == 'object' || nodeName == 'embed')
			{
				return true;
			}
		},
		
		/**
		 * Sets the storage index.
		 *
		 * @param {Element} censoredElement	The element to set the storage index on.
		 * @param {Number} index The index to set. 
		 */
		setStorageIndex: function(censoredElement, index)
		{
			if (censoredElement.hasAttribute('class'))
			{
				censoredElement.setAttribute(
					'class',
					censoredElement.getAttribute('class') + 
						' ' + NSFW.Config.storageClassNamePrefix + index);
			}
			else
			{
				censoredElement.setAttribute(
					'class', 
					NSFW.Config.storageClassNamePrefix + index);
			}	
		},

		/**
		 * Sets the storage index.
		 *
		 * @param {Element} censoredElement	The element from which to get
		 * 									the storage index.
		 */
		getStorageIndex: function(censoredElement)
		{
			var classAttributeValue = censoredElement.getAttribute('class');
			var match = NSFW.Config.storageIndexRegex.exec(classAttributeValue);
			return match[2];
		},
			
		/**
		 * Sets the "nsfw-set" flag on a uncensored element.
		 * 
		 * @param {Element} nsfwElement The NSFW element to set the flag.
		 */			
		setFlag: function(nsfwElement)
		{			
			if (this.relAttributeValue)
			{
				nsfwElement.setAttribute(
					'rel',
					this.relAttributeValue.replace(
						NSFW.Config.identifierRegex,
						NSFW.Config.censoredIdentifier));
			}
			
			if (this.classAttributeValue)
			{
				nsfwElement.setAttribute(
					'class',
					this.classAttributeValue.replace(
						NSFW.Config.identifierRegex,
						NSFW.Config.censoredIdentifier));
			}
		},
		
		/**
		 * Unsets the "nsfw-set" flag on a censored element.
		 * 
		 * @param {Element} nsfwElement The NSFW element for which to unset the
		 * 								flag.
		 */	
		unsetFlag: function(nsfwElement)
		{
			var relAttributeValue = nsfwElement.getAttribute('rel');
			var classAttributeValue = nsfwElement.getAttribute('class');
			
			if (relAttributeValue)
			{
				nsfwElement.setAttribute(
					'rel',
					relAttributeValue.replace(NSFW.Config.flag, NSFW.Config.identifier));
			}
			
			if (classAttributeValue)
			{
				nsfwElement.setAttribute(
					'class',
					classAttributeValue.replace(
						NSFW.Config.censoredIdentifier,
						NSFW.Config.identifier));
			}
		},
		
		/**
		 * Adds the NSFW CSS to the XHTML "head" element.
		 */
		addStyle: function()
		{
			var headElement;
			var styleElement;
	
			headElement = document.getElementsByTagName('head')[0];
			
			if (!headElement)
			{
				return;
			}
			
			styleElement = document.createElement('style');
			styleElement.setAttribute('type', 'text/css');
			styleElement.appendChild(document.createTextNode(NSFW.Config.style));
			
			headElement.appendChild(styleElement);
		}
	}

	NSFW.censor();
})();