// ==UserScript==
// @name         WestForts.com Import Link
// @version      2.0
// @description  A new link to launch the WestForts import script
// @author       WestForts Staff
// @website      http://www.westforts.com/
// @include	http://*.the-west.*/game.php*
// ==/UserScript==

if (location.href.indexOf(".the-west.") != -1 && location.href.indexOf("game.php") != -1) { 

  if (document.getElementById('westforts_js')) { return; }
  
	var westforts_js = document.createElement('script');

	westforts_js.setAttribute('type', 'text/javascript');
	westforts_js.setAttribute('id', 'westforts_js');

	westforts_js.innerHTML = "("+(function(){
	
    var westforts_icon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAuxJREFUeNqkk0tvG1UYQM+987A9nrEdP+rEIWmaNE0wbdVSsaBUrVRVVAIiVoVFaWGBlH/CijVSVrAEiQVClRIJCQkEEm1BitomTcijMa3z8Cvx28k4Hq5dhLdI3MXc2XznO/d7CM/z6J7Z2dmXP//xzM3Nie4tuoBu8O7eDmtr69y9M8M7Ny7jOA625cfnM9B8fvYLFe4/+A0pSvy50WTzr3oPIrvB0bAks7VJemqMU6MjmD6L4cEEiUSUoGUjjiX1VofMXhNT15ia8BGP6r3EelcjGjXRDcnDxVU++PA9Js5McFA8oPxCZXv0lOUny1QqDVwfnB9/hY6ncWbcplA6oAeINQ+4PhGjNh4jqTXJLP5Bdnuf+flfMEzJ6VPDFCtV3GYNx5pEai0sS9H4B1DdLTAZCrBbbfHDt/cIBEzCpkZIqadfu8zioyeUcnkuXkkjpMTQTQ7dTq+YPcB6vsGYJYj4DX7eLJCttolZOh0hWHq+oPTLiIDOrbE4Qkikgkjh9QGrRZeca5C2D3n/xiWWci2+X/i1l6nseKSSDh/fvspA2KJ93FHBqm4Bfx9wfeYSFwYtNh4/4+sfn3I2FeTTt6d5uJojPjLEJx+9hWZoNFquarxUFso2aPUAsvtJqIJUyxUO92sUCzl+WspQrrXQEIQjFo4dpNP2MBXE1iUJdfsRfYOA3iYSsjkO6tw8l2JhJc93v29jdDoMjTWJmzYD0kfNbREJBNVcuLQ90TcYTEVpHkkaeFx9fZRr6SEM6TGcjKgJrPLZ59/wxVcLJJ0QW+tZCrl9dAX516CsurCV2aVed0k0jjg9EGD7RJAd9eZitkCuWCEWtnmR/ZKpkzFuz7xJvVTqG6xuVBlR2c5emGZvr8pjNYF19xjpKqBf48q5k9w8P8rK5g5vXHwVvxr1+eXmS0B3IZ7lj9jOQWogTl6Z3X9eZiVfI6WGazLk49a711QrTzA96JCMRbm3WODBWrG3TOL/rvPfAgwA2+cl/CVOsykAAAAASUVORK5CYII=';
    var westforts_icon_bn = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAjRJREFUeNqkU8lqYlEULOcpGolDjEYMiJugIR+QTVy4kCSQhd/gL+kX+AluRNdBBHWRoHFAE6QVFY1znLrrgKa3TR+4XN6959SpU/WuYr/fgxGPx3/hHyKZTLq4KwjA4j+B9/d3xGIxhMNhmM1mGI1GaLVaWaPRCC8vL1gul2Bur9cTEDWLmdhsNhEIBODz+aDX6+FyuaRwt9thvV7j+/sbg8EAp6enOD8/x3w+l8Zq0jg5OYFKpUK5XMbz8zP8fr90ZKdKpYLX11dMp1Nst1vY7XYBvbi4EMYCoFAocH19LV10Oh3e3t6EYjabFeCrqysBXCwWMJlMkm8wGH4AeEla3NPptIzABHa6vb0VZt1uF6FQSIo5GsdiCAAvrVaroLM7gTgWBf74+MDX1xeUSiUuLy9lP6wjAOnOZjOZ7/7+Hp1OB5lMBhqNRlQ/OzvD09MTLBaL6EAWdOkIcHd3B4/Hg0ajgVwuJ50ikQiq1aqM9vj4KFqsVisp/htAeXBhMpmISP1+H6VSSVQnTd4dxiEjisxvtVr9w4DoRKTHB9Hy+bwA0C7qwyJ6zzEoLteRgcPhwGazERtvbm4QDAalmOfj8RiJRAKpVAo2mw3tdlt+qEMIA9L//PyUZHZzOp1wu91yzoLhcCjndMvr9SIajUruEYCqs4h0aVur1RLBSJPUKSodKhQKeHh4kH+EOskIfBCkxG5UnHbW63UBpX0EZke+DTpFoGKxiFqtJo9J8b/P+bcAAwD2STF0+3hwkQAAAABJRU5ErkJggg==';

  	var westforts_link = document.createElement('div');
  
  	westforts_link.setAttribute('id', 'westforts_link_div');
  	westforts_link.setAttribute('title', '<b>Start West Forts Import</b>');
    westforts_link.setAttribute('style', 'position:absolute;z-index:10;cursor:pointer;text-align:center;color:#fff;font-size:12px;padding: 0px 3px 1px 9px;right:0px;top:0px;background:url(\"/images/interface/minimap/minimapbg.png\") no-repeat scroll 0px -7px');
    westforts_link.innerHTML = '<img id="westforts_icon_img" src="'+westforts_icon_bn+'" /><div style="float:right;margin-left:5px;margin-top:1px;">West Forts</div>';

    westforts_link.onclick = function(){
  
      if (this.style.color != 'rgb(255, 255, 255)')
      {
          window.open('http://www.westforts.com', '_blank');
      }
      else
      {
          if (document.getElementById('westforts_script')) { return; }

         	var westforts_script = document.createElement('script');

          westforts_script.setAttribute('type', 'text/javascript');
          westforts_script.setAttribute('id', 'westforts_script');
          westforts_script.setAttribute('src', 'http://www.westforts.com/js/import_userscript.js?'+new Date().getTime());
          
          document.body.appendChild(westforts_script);

          this.style.color = '#01DF00';
          document.getElementById('westforts_icon_img').src = westforts_icon;
      }
  
    };

   	document.body.appendChild(westforts_link);

    
	}).toString()+")();";
	
	document.body.appendChild(westforts_js);
	
}