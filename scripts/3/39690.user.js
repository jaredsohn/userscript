// ==UserScript==
// @name           jackelrod
// @description    Gives your browsing a nice "Mark Trail" experience
// @namespace      weedilywoo
// @include        *
// ==/UserScript==

var ev;
function mark(){
	var je=new Image();

	je.src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAiCAQAAACQTsNJAAAAAXNSR0IArs4c6QAAAAJiS0dEAP+Hj8y/AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH2QECFCsdYNWcYAAAAz1JREFUSMe11k9s1FUQwPFPNwuKrdIeVmqjpjHSoMSEGhWrB9xLbQimrQdAPRS9cOAgHsTeRC4gxtAL6cGYFRNsIFFoQqx/IgSVANakbSqUNB5KYmD1h6k1FNuYdTywbXah0gZw5jbvvW/mzcybeRUpc8v+qEbeFKpRq8bjFXPvrZgbsi3GTLnTQxYr+NtF0/5xj0e8WbEASF985pwmTRo0lNgTeSf1mtR2HegayHtxxGodZceVoU7rtkRvOSZVptnoicI8ej46ozFKT5Uh2mJkXsRVzcVTkYvrIDuiZcGIQhSiO1ZcC/k0WmLwuo0jN8RujvYogfwY7dFdsnwqOmMiBmNjbL4B5GK0xPszGI4L7SXBHtCmyrdeUuMyOGKvYRw0igTcq8OBYnLwpQ0ys4hhPOmIRaDKpN3OWq7WJUOm7XasuDOrzqYgxYeRkgX9EvRpkujW6y2w14QtmmUcNe5jj1pfhGRs8NNVT05YU/Qj5239JtTKWeN19Zr0m7BVJRL7TDhbVojZmev8blXRtBW7NBnAqxot0+CYQV1GMaBVl6dNl0AyGr0WaS6qL5oabDVoncSzKl32row21erUmTSmXcafpsoqvt4PpDRHfkHlNRGFKETPNbXTG9lIb4+zFiZVMBvUGVlmRPqSO0rSmzjtimyJZX6Zkm7UIykeGrXLNFYZs/Q/20G5jGuUfhB5GSQ+8KJ1SBz2MiZ95IyVOlRhUuUckDHV0lQa8RhyPnfBBe2OqXc/9rtgpe+1+sshx7VaL5EzZq3VRe/Pq5G6zwP6MSyxR6snDBiSxbBTNrpb1hVdqj2vV2LAkBrdcsXLfKeelB3RHPnoi97IRyHysbOYxM5YERujJ/KxM/qiEPnojJHojJEoRF/xfZ+I+khJ87MxB00446Q35HAXhi3VYdp6iXNW+cqgNQbVaZA4bC04YDHSdHjYIVu8oNZRvRjShTZj/kBGi8PGZTXqstEvPvGcdej3hd9muv1Q7LHctmKnGKeY3oRi+BJLVBm1D4s8oxmXvaPa9orZbv9NNEffvIWfj8H4dfaRdJe3x9vUqFNScnHLI+OqNzc3vG7LGP0/Bjpsild87Za+FjfzyfkXnRAGuCM/+2UAAAAASUVORK5CYII=';

	var d=document.createElement('div');

	d.appendChild(je);

	var b=document.getElementsByTagName('body')[0];

	b.appendChild(d);

	if(Math.random()<0.5){
		d.style.position='fixed';
	}else{
		d.style.position='absolute';
	}

	d.style.left=Math.floor(Math.random()*95)+'%';

	d.style.top=Math.floor(Math.random()*95)+'%';

	var behaviours=['none','drag','avoid','breed'];
	//var behaviour=behaviours[Math.floor(Math.random()*behaviours.length)];
	behaviour='drag';
	if(behaviour=='drag'){
		var moving=false;
	
		d.addEventListener('mousedown',
			function(event){
				event.preventDefault();
				moving=true;
				d.style.left=(event.clientX-10)+'px';
				d.style.top=(event.clientY-10)+'px';
				return false;
			},false);

		b.addEventListener('mousemove',
			function(event){
				if(moving){
					d.style.left=(event.clientX-10)+'px';
					d.style.top=(event.clientY-10)+'px';
					return false;
				}
			},false);

		b.addEventListener('mouseup',function(event){moving=false;},false);
		d.addEventListener('mouseup',function(event){moving=false;},false);
//		d.addEventListener('mouseout',function(event){moving=false;},false);

	}
	if(behaviour=='avoid'){
		d.addEventListener('mouseover',
			function(event){
				this.style.left=Math.floor(Math.random()*95)+'%';
				this.style.top=Math.floor(Math.random()*95)+'%';

			}
			,false);

	}
	if(behaviour=='breed'){
		d.addEventListener('mouseover',breed,false);

	}
	d.addEventListener('dblclick',
		function(event){
			this.parentNode.removeChild(this);
		}
	,false);
}

function breed(){
			this.style.left=Math.floor(Math.random()*95)+'%';
			this.style.top=Math.floor(Math.random()*95)+'%';
			var k=this.cloneNode(true);
			this.parentNode.appendChild(k);
			k.addEventListener('mouseover',breed,false);
			k.style.left=Math.floor(Math.random()*95)+'%';
			k.style.top=Math.floor(Math.random()*95)+'%';
}
setTimeout(mark,950);