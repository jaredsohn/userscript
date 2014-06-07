// ==UserScript==
        // @name           eightygoogle
        // @author         jakicmeister@gmail.com
        // @namespace      http://eightygoogle/
        // @description    Moves google logo "in eights"
        // @include        http://google.com
        // @include        http://google.com/
        // @include        https://google.com
        // @include        https://google.com/
        // @include        http://www.google.com
        // @include        http://www.google.com/
        // @include        https://www.google.com
        // @include        https://www.google.com/
        // ==/UserScript==
        
        R=0;
        x1=.1;
y1=.2;
x2=.25;
y2=1;
x3=1.6;
y3=1.5;
x4=400;
y4=100;
x5=580;
y5=400;
        DI=document.images;DIL=DI.length;
        function A(){
        	for(r=0;r<DIL;r++){
        		DIS=DI[r].style;
        		DIS.position='absolute';
        		DIS.left=Math.sin(R*x1+r*x2+x3)*x4+x5;
        		DIS.top=Math.cos(R*y1+r*y2+y3)*y4+y5
        	}
        	R++
        }
        setInterval(A,25);