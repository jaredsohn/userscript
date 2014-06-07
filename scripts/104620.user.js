// ==UserScript==
// @name		   Minecraft skin preview
// @namespace	  http://www.minecraft.net/skin/skin.jsp
// @version		1.2.1
// @include		http://www.minecraft.net/skin/skin.jsp?user=*
// @require		https://developer.mozilla.org/samples/webgl/sample2/sylvester.js
// @require		https://developer.mozilla.org/samples/webgl/sample2/glUtils.js
// ==/UserScript==

function main()
{
	/**
	 * Provides requestAnimationFrame in a cross browser way.
	 */
	requestAnimFrame = (function() {
	  return window.requestAnimationFrame ||
			 window.webkitRequestAnimationFrame ||
			 window.mozRequestAnimationFrame ||
			 window.oRequestAnimationFrame ||
			 window.msRequestAnimationFrame ||
			 function(/* function FrameRequestCallback */ callback, /* DOMElement Element */ element) {
			   window.setTimeout(callback, 1000/60);
			 };
	})();

	function gup(name)
	{
		name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
		var regexS = "[\\?&]"+name+"=([^&#]*)";
		var regex = new RegExp( regexS );
		var results = regex.exec( window.location.href );
		if( results == null )
			return "";
		else
			return results[1];
	}

	function getCanvas()
	{
		var content = document.getElementById("content");
		var p = content.getElementsByTagName("p")[0];
		while (p.hasChildNodes())
		{
			p.removeChild(p.firstChild);	   
		}
		var canvas = document.createElement("canvas");
		canvas.width = 512;
		canvas.height = 512;
		canvas.addEventListener("mousedown", handleMouseDown, false);
		document.addEventListener("mouseup", handleMouseUp, false);
		document.addEventListener("mousemove", handleMouseMove, false);
		//canvas.addEventListener("mousewheel", handleMouseScroll, false);
		canvas.addEventListener("DOMMouseScroll", handleMouseScroll, false);
		p.appendChild(canvas);
		
		var hatImg = document.createElement("div");
		hatImg.style.width = "50px";
		hatImg.style.height = "50px";
		hatImg.style.backgroundPosition = "0 0";
		hatImg.style.backgroundImage = "url(data:;base64,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)";
		hatImg.addEventListener("click", function()
		{
			var v = playerModel.meshes["Hat"].visible;
			this.style.backgroundPosition = "0 "+(v ? "50px" : 0);
			playerModel.meshes["Hat"].visible = !v;
			if (typeof playerModel.meshes["Left_ear"] != "undefined")
				playerModel.meshes["Left_ear"].visible = !v;
			if (typeof playerModel.meshes["Right_ear"] != "undefined")
				playerModel.meshes["Right_ear"].visible = !v;
		} , false);
		p.appendChild(hatImg);
		
		return canvas;
	}

	function initWebGL(canvas)
	{
		var names = ["webgl", "experimental-webgl", "webkit-3d", "moz-webgl"];
		for (var i = 0; i < names.length; i++) {
			try {
				gl = canvas.getContext(names[i]);
			} catch(e) {}
			if (gl) {
				break;
			}
		}
		if (!gl)
		{
			alert("Could not initialise WebGL, sorry :-(");
		}
		gl.viewportWidth = canvas.width;
		gl.viewportHeight = canvas.height;
		if (!gl) {
			alert("Unable to initialize WebGL. Your browser may not support it.");
		}
	}
	function start() {
		var canvas = getCanvas();
		initWebGL(canvas);

		if (gl) {
			gl.clearColor(0.0, 0.0, 0.0, 0.0);
			gl.clearDepth(1.0);
			gl.enable(gl.DEPTH_TEST);
			gl.depthFunc(gl.LEQUAL);
			gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
		}
	}
	function handleTextureLoaded() {
		gl.bindTexture(gl.TEXTURE_2D, this.textureID);
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
		gl.generateMipmap(gl.TEXTURE_2D);
		gl.bindTexture(gl.TEXTURE_2D, null);
	}
	TextureLoader = {
		"loadedImages": {},
		"LoadTexture": function(filename, error_handler, success_handler, args)
		{
			if (typeof this.loadedImages[filename] != "undefined")
				return this.loadedImages[filename];
			
			var image = new Image();
			image.textureID = gl.createTexture();
			image.addEventListener("load", handleTextureLoaded, false);
			if (typeof error_handler == "function")
				image.addEventListener("error", function(){error_handler(args)}, false);
			if (typeof success_handler == "function")
				image.addEventListener("load", function(){success_handler(args)}, false);
			image.src = filename;

			this.loadedImages[filename] = image.textureID;

			return image.textureID;
		}
	}
	function Shader(name) {
		var fragmentShader = getShader(gl, name, "fragment");
		var vertexShader = getShader(gl, name, "vertex");

		this.shaderProgram = gl.createProgram();
		gl.attachShader(this.shaderProgram, vertexShader);
		gl.attachShader(this.shaderProgram, fragmentShader);
		gl.linkProgram(this.shaderProgram);

		if (!gl.getProgramParameter(this.shaderProgram, gl.LINK_STATUS)) {
			alert("Unable to initialize the shader program.");
		}

		gl.useProgram(this.shaderProgram);

		this.vertexPositionAttribute = gl.getAttribLocation(this.shaderProgram, "aVertexPosition");
		gl.enableVertexAttribArray(this.vertexPositionAttribute);
			
		this.textureCoordAttribute = gl.getAttribLocation(this.shaderProgram, "aTextureCoord");
		if (this.textureCoordAttribute != null && this.textureCoordAttribute >= 0)
			gl.enableVertexAttribArray(this.textureCoordAttribute);
			
		this.vertexNormalAttribute = gl.getAttribLocation(this.shaderProgram, "aVertexNormal");
		if (this.vertexNormalAttribute  != null && this.vertexNormalAttribute >= 0)
			gl.enableVertexAttribArray(this.vertexNormalAttribute);
		
		this.tex = 0;
		this.texture_ids = [];
		this.texture_names = [];
		this.setTexture = function(name, texture)
		{
			if (typeof texture == "string")
				texture = TextureLoader.LoadTexture(texture);
			
			var t = -1;
			for (var i = 0; i < this.texture_names.length; i++)
				if (this.texture_names[i] == name)
				{
					t = i;
					break;
				}
			if (t < 0)
				t = this.tex++;
			this.texture_names[t] = name;
			this.texture_ids[t] = texture;
			this.setValue1i(name, t);
		}
		this.setValue1i = function(name, i)
		{
			var location = gl.getUniformLocation(this.shaderProgram, name);
			if (location != null)
				gl.uniform1i(location, i);
		}
		this.use = function()
		{
			gl.useProgram(this.shaderProgram);
			for (var i = 0; i < this.texture_ids.length; i++)
			{
				if (this.texture_ids[i] == null)
					continue;
				gl.activeTexture(gl.TEXTURE0 + i);
				gl.bindTexture(gl.TEXTURE_2D, this.texture_ids[i]);
			}
		}
	}
	function getShader(gl, name, type)
	{
		var shader;
		if (type == "fragment")
			shader = gl.createShader(gl.FRAGMENT_SHADER);
		else if (type == "vertex")
			shader = gl.createShader(gl.VERTEX_SHADER);
		else
			return null;
			
		var theSource = shaders[name][type];
	  
		gl.shaderSource(shader, theSource);

		gl.compileShader(shader);

		if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
			alert("An error occurred compiling the shaders ("+name+", "+type+"): " + gl.getShaderInfoLog(shader));
			return null;
		}

		return shader;
	}

	shaders = {
		textured_shaded: {
			fragment:"\
	#ifdef GL_ES\n\
	  precision highp float;\n\
	#endif\n\
	varying highp vec2 vTextureCoord;\
	varying highp vec3 vLighting;\
	\
	uniform sampler2D uSampler;\
	\
	void main(void) {\
		vec4 texelColor = texture2D(uSampler, vec2(vTextureCoord.s, 1.0-vTextureCoord.t));\
		if (texelColor.a < 1.0) discard;\
		gl_FragColor = vec4(texelColor.rgb * vLighting, texelColor.a);\
	}",
			vertex:"\
	attribute highp vec3 aVertexNormal;\
	attribute highp vec3 aVertexPosition;\
	attribute highp vec2 aTextureCoord;\
	\
	uniform highp mat4 uNormalMatrix;\
	uniform highp mat4 uMVMatrix;\
	uniform highp mat4 uPMatrix;\
	\
	varying highp vec2 vTextureCoord;\
	varying highp vec3 vLighting;\
	\
	void main(void) {\
		gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);\
		vTextureCoord = aTextureCoord;\
		\
		highp vec3 ambientLight = vec3(0.2, 0.2, 0.2);\
		highp vec3 directionalLightColor = vec3(0.5, 0.5, 0.75);\
		highp vec3 directionalVector = vec3(0.85, 0.8, 0.75);\
		\
		highp vec4 transformedNormal = uNormalMatrix * vec4(aVertexNormal, 1.0);\
		\
		highp float directional = max(dot(transformedNormal.xyz, directionalVector), 0.0);\
		vLighting = ambientLight + (directionalLightColor * directional);\
	}"
		}
	}

	function DrawVBO()
	{	
		gl.bindBuffer(gl.ARRAY_BUFFER, this.verticesBuffer);
		var offset = 0;
		var stride = 0;
		for (i in this.vertexStruct)
			stride += this.vertexStruct[i][1]*4;
		for (i in this.vertexStruct)
		{
			var attrib = this.vertexStruct[i][0];
			var size = this.vertexStruct[i][1];
			gl.vertexAttribPointer(attrib, size, gl.FLOAT, false, stride, offset);
			offset += size*4;
		}
		
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.elementsBuffer);
		
		setMatrixUniforms(this.shader);
		
		for (tex in this.sub_meshes)
		{
			if (typeof this.shader != "undefined" && this.shader != null)
			{
				this.shader.setTexture("uSampler", this.tex[tex]);
				this.shader.use();
			}
			gl.drawElements(gl.TRIANGLES, this.sub_meshes[tex][1], gl.UNSIGNED_SHORT, this.sub_meshes[tex][0]);
		}
	}

	objFile={"Body":{"indices":[0,1,2,0,2,3,4,5,6,4,6,7,8,9,10,8,10,11,12,13,14,12,14,15,16,17,18,16,18,19,20,21,22,20,22,23],"sub_meshes":{"Char":[0,36]},"vertices":[0.5,3.0,-1.0,0.0,-1.0,0.0,0.5625,0.5,0.5,3.0,1.0,0.0,-1.0,0.0,0.4375,0.5,-0.5,3.0,1.0,0.0,-1.0,0.0,0.4375,0.375,-0.5,3.0,-1.0,0.0,-1.0,0.0,0.5625,0.375,0.5,6.0,-1.0,0.0,1.0,0.0,0.4375,0.375,-0.5,6.0,-1.0,0.0,1.0,0.0,0.4375,0.5,-0.5,6.0,1.0,0.0,1.0,0.0,0.3125,0.5,0.5,6.0,1.0,0.0,1.0,0.0,0.3125,0.375,0.5,3.0,-1.0,1.0,0.0,0.0,0.4375,0.0,0.5,6.0,-1.0,1.0,0.0,0.0,0.4375,0.375,0.5,6.0,1.0,1.0,0.0,0.0,0.3125,0.375,0.5,3.0,1.0,1.0,0.0,0.0,0.3125,0.0,0.5,3.0,1.0,-0.0,-0.0,1.0,0.3125,0.0,0.5,6.0,1.0,-0.0,-0.0,1.0,0.3125,0.375,-0.5,6.0,1.0,-0.0,-0.0,1.0,0.25,0.375,-0.5,3.0,1.0,-0.0,-0.0,1.0,0.25,0.0,-0.5,3.0,1.0,-1.0,-0.0,-0.0,0.625,-0.0,-0.5,6.0,1.0,-1.0,-0.0,-0.0,0.625,0.375,-0.5,6.0,-1.0,-1.0,-0.0,-0.0,0.5,0.375,-0.5,3.0,-1.0,-1.0,-0.0,-0.0,0.5,0.0,0.5,6.0,-1.0,0.0,0.0,-1.0,0.4375,0.375,0.5,3.0,-1.0,0.0,0.0,-1.0,0.4375,0.0,-0.5,3.0,-1.0,0.0,0.0,-1.0,0.5,0.0,-0.5,6.0,-1.0,0.0,0.0,-1.0,0.5,0.375]},"Right_leg":{"indices":[0,1,2,0,2,3,4,5,6,4,6,7,8,9,10,8,10,11,12,13,14,12,14,15,16,17,18,16,18,19,20,21,22,20,22,23],"sub_meshes":{"Char":[0,36]},"vertices":[0.5,0.0,0.0,0.0,-1.0,0.0,0.1875,0.5,0.5,0.0,1.0,0.0,-1.0,0.0,0.125,0.5,-0.5,0.0,1.0,0.0,-1.0,0.0,0.125,0.375,-0.5,0.0,-0.0,0.0,-1.0,0.0,0.1875,0.375,0.5,3.0,0.0,0.0,1.0,0.0,0.125,0.375,-0.5,3.0,-0.0,0.0,1.0,0.0,0.125,0.5,-0.5,3.0,1.0,0.0,1.0,0.0,0.0625,0.5,0.5,3.0,1.0,0.0,1.0,0.0,0.0625,0.375,0.5,0.0,0.0,1.0,0.0,0.0,0.125,0.0,0.5,3.0,0.0,1.0,0.0,0.0,0.125,0.375,0.5,3.0,1.0,1.0,0.0,0.0,0.0625,0.375,0.5,0.0,1.0,1.0,0.0,0.0,0.0625,0.0,0.5,0.0,1.0,-0.0,-0.0,1.0,0.0625,0.0,0.5,3.0,1.0,-0.0,-0.0,1.0,0.0625,0.375,-0.5,3.0,1.0,-0.0,-0.0,1.0,0.0,0.375,-0.5,0.0,1.0,-0.0,-0.0,1.0,-0.0,0.0,-0.5,0.0,1.0,-1.0,-0.0,-0.0,0.25,0.0,-0.5,3.0,1.0,-1.0,-0.0,-0.0,0.25,0.375,-0.5,3.0,-0.0,-1.0,-0.0,-0.0,0.1875,0.375,-0.5,0.0,-0.0,-1.0,-0.0,-0.0,0.1875,0.0,0.5,3.0,0.0,0.0,0.0,-1.0,0.125,0.375,0.5,0.0,0.0,0.0,0.0,-1.0,0.125,0.0,-0.5,0.0,-0.0,0.0,0.0,-1.0,0.1875,0.0,-0.5,3.0,-0.0,0.0,0.0,-1.0,0.1875,0.375]},"Right_arm":{"indices":[0,1,2,0,2,3,4,5,6,4,6,7,8,9,10,8,10,11,12,13,14,12,14,15,16,17,18,16,18,19,20,21,22,20,22,23],"sub_meshes":{"Char":[0,36]},"vertices":[0.5,3.0,1.0,0.0,-1.0,0.0,0.75,0.375,0.5,3.0,2.0,0.0,-1.0,0.0,0.8125,0.375,-0.5,3.0,2.0,0.0,-1.0,0.0,0.8125,0.5,-0.5,3.0,1.0,0.0,-1.0,0.0,0.75,0.5,0.5,6.0,1.0,0.0,1.0,0.0,0.75,0.375,-0.5,6.0,1.0,0.0,1.0,0.0,0.75,0.5,-0.5,6.0,2.0,0.0,1.0,0.0,0.6875,0.5,0.5,6.0,2.0,0.0,1.0,0.0,0.6875,0.375,0.5,3.0,1.0,1.0,0.0,0.0,0.75,0.0,0.5,6.0,1.0,1.0,0.0,0.0,0.75,0.375,0.5,6.0,2.0,1.0,0.0,0.0,0.6875,0.375,0.5,3.0,2.0,1.0,0.0,0.0,0.6875,0.0,0.5,3.0,2.0,-0.0,-0.0,1.0,0.6875,0.0,0.5,6.0,2.0,-0.0,-0.0,1.0,0.6875,0.375,-0.5,6.0,2.0,-0.0,-0.0,1.0,0.625,0.375,-0.5,3.0,2.0,-0.0,-0.0,1.0,0.625,0.0,-0.5,3.0,2.0,-1.0,-0.0,-0.0,0.875,0.0,-0.5,6.0,2.0,-1.0,-0.0,-0.0,0.875,0.375,-0.5,6.0,1.0,-1.0,-0.0,-0.0,0.8125,0.375,-0.5,3.0,1.0,-1.0,-0.0,-0.0,0.8125,0.0,0.5,6.0,1.0,0.0,0.0,-1.0,0.75,0.375,0.5,3.0,1.0,0.0,0.0,-1.0,0.75,0.0,-0.5,3.0,1.0,0.0,0.0,-1.0,0.8125,0.0,-0.5,6.0,1.0,0.0,0.0,-1.0,0.8125,0.375]},"Hat":{"indices":[0,1,2,0,2,3,4,5,6,4,6,7,8,9,10,8,10,11,12,13,14,12,14,15,16,17,18,16,18,19,20,21,22,20,22,23],"sub_meshes":{"Char":[0,36]},"vertices":[1.25,5.75,-1.25,0.0,-1.0,0.0,0.875,1.0,1.25,5.75,1.25,0.0,-1.0,0.0,0.75,1.0,-1.25,5.75,1.25,0.0,-1.0,0.0,0.75,0.75,-1.25,5.75,-1.25,0.0,-1.0,0.0,0.875,0.75,1.25,8.25,-1.25,0.0,1.0,0.0,0.75,0.75,-1.25,8.25,-1.25,0.0,1.0,0.0,0.75,1.0,-1.25,8.25,1.25,0.0,1.0,0.0,0.625,1.0,1.25,8.25,1.25,0.0,1.0,0.0,0.625,0.75,1.25,5.75,-1.25,1.0,0.0,0.0,0.75,0.5,1.25,8.25,-1.25,1.0,0.0,0.0,0.75,0.75,1.25,8.25,1.25,1.0,0.0,0.0,0.625,0.75,1.25,5.75,1.25,1.0,0.0,0.0,0.625,0.5,1.25,5.75,1.25,-0.0,-0.0,1.0,0.625,0.5,1.25,8.25,1.25,-0.0,-0.0,1.0,0.625,0.75,-1.25,8.25,1.25,-0.0,-0.0,1.0,0.5,0.75,-1.25,5.75,1.25,-0.0,-0.0,1.0,0.5,0.5,-1.25,5.75,1.25,-1.0,-0.0,-0.0,1.0,0.5,-1.25,8.25,1.25,-1.0,-0.0,-0.0,1.0,0.75,-1.25,8.25,-1.25,-1.0,-0.0,-0.0,0.875,0.75,-1.25,5.75,-1.25,-1.0,-0.0,-0.0,0.875,0.5,1.25,8.25,-1.25,0.0,0.0,-1.0,0.75,0.75,1.25,5.75,-1.25,0.0,0.0,-1.0,0.75,0.5,-1.25,5.75,-1.25,0.0,0.0,-1.0,0.875,0.5,-1.25,8.25,-1.25,0.0,0.0,-1.0,0.875,0.75]},"Left_leg":{"indices":[0,1,2,0,2,3,4,5,6,4,6,7,8,9,10,8,10,11,12,13,14,12,14,15,16,17,18,16,18,19,20,21,22,20,22,23],"sub_meshes":{"Char":[0,36]},"vertices":[0.5,0.0,-1.0,0.0,-1.0,0.0,0.1875,0.5,0.5,0.0,0.0,0.0,-1.0,0.0,0.125,0.5,-0.5,0.0,-0.0,0.0,-1.0,0.0,0.125,0.375,-0.5,0.0,-1.0,0.0,-1.0,0.0,0.1875,0.375,0.5,3.0,-1.0,0.0,1.0,0.0,0.0625,0.375,-0.5,3.0,-1.0,0.0,1.0,0.0,0.0625,0.5,-0.5,3.0,-0.0,0.0,1.0,0.0,0.125,0.5,0.5,3.0,0.0,0.0,1.0,0.0,0.125,0.375,0.5,0.0,-1.0,1.0,0.0,0.0,0.0625,0.0,0.5,3.0,-1.0,1.0,0.0,0.0,0.0625,0.375,0.5,3.0,0.0,1.0,0.0,0.0,0.125,0.375,0.5,0.0,0.0,1.0,0.0,0.0,0.125,0.0,0.5,0.0,0.0,-0.0,0.0,1.0,0.125,0.0,0.5,3.0,0.0,-0.0,0.0,1.0,0.125,0.375,-0.5,3.0,-0.0,-0.0,0.0,1.0,0.1875,0.375,-0.5,0.0,-0.0,-0.0,0.0,1.0,0.1875,-0.0,-0.5,0.0,-0.0,-1.0,-0.0,-0.0,0.1875,-0.0,-0.5,3.0,-0.0,-1.0,-0.0,-0.0,0.1875,0.375,-0.5,3.0,-1.0,-1.0,-0.0,-0.0,0.25,0.375,-0.5,0.0,-1.0,-1.0,-0.0,-0.0,0.25,-0.0,0.5,3.0,-1.0,0.0,0.0,-1.0,0.0625,0.375,0.5,0.0,-1.0,0.0,0.0,-1.0,0.0625,0.0,-0.5,0.0,-1.0,0.0,0.0,-1.0,-0.0,0.0,-0.5,3.0,-1.0,0.0,0.0,-1.0,-0.0,0.375]},"Head":{"indices":[0,1,2,0,2,3,4,5,6,4,6,7,8,9,10,8,10,11,12,13,14,12,14,15,16,17,18,16,18,19,20,21,22,20,22,23],"sub_meshes":{"Char":[0,36]},"vertices":[1.0,6.0,-1.0,0.0,-1.0,0.0,0.375,1.0,1.0,6.0,1.0,0.0,-1.0,0.0,0.25,1.0,-1.0,6.0,1.0,0.0,-1.0,0.0,0.25,0.75,-1.0,6.0,-1.0,0.0,-1.0,0.0,0.375,0.75,1.0,8.0,-1.0,0.0,1.0,0.0,0.25,0.75,-1.0,8.0,-1.0,0.0,1.0,0.0,0.25,1.0,-1.0,8.0,1.0,0.0,1.0,0.0,0.125,1.0,1.0,8.0,1.0,0.0,1.0,0.0,0.125,0.75,1.0,6.0,-1.0,1.0,0.0,0.0,0.25,0.5,1.0,8.0,-1.0,1.0,0.0,0.0,0.25,0.75,1.0,8.0,1.0,1.0,0.0,0.0,0.125,0.75,1.0,6.0,1.0,1.0,0.0,0.0,0.125,0.5,1.0,6.0,1.0,-0.0,-0.0,1.0,0.125,0.5,1.0,8.0,1.0,-0.0,-0.0,1.0,0.125,0.75,-1.0,8.0,1.0,-0.0,-0.0,1.0,0.0,0.75,-1.0,6.0,1.0,-0.0,-0.0,1.0,-0.0,0.5,-1.0,6.0,1.0,-1.0,-0.0,-0.0,0.5,0.5,-1.0,8.0,1.0,-1.0,-0.0,-0.0,0.5,0.75,-1.0,8.0,-1.0,-1.0,-0.0,-0.0,0.375,0.75,-1.0,6.0,-1.0,-1.0,-0.0,-0.0,0.375,0.5,1.0,8.0,-1.0,0.0,0.0,-1.0,0.25,0.75,1.0,6.0,-1.0,0.0,0.0,-1.0,0.25,0.5,-1.0,6.0,-1.0,0.0,0.0,-1.0,0.375,0.5,-1.0,8.0,-1.0,0.0,0.0,-1.0,0.375,0.75]},"Right_ear":{"indices":[0,1,2,0,2,3,4,5,6,4,6,7,8,9,10,8,10,11,12,13,14,12,14,15,16,17,18,16,18,19,20,21,22,20,22,23],"sub_meshes":{"Char":[0,36]},"vertices":[0.1667,7.584,0.5827,0.0,-1.0,0.0,0.5781,1.0,0.1667,7.584,2.5827,0.0,-1.0,0.0,0.4844,1.0,-0.1667,7.584,2.5827,0.0,-1.0,0.0,0.4844,0.9688,-0.1667,7.584,0.5827,0.0,-1.0,0.0,0.5781,0.9688,0.1667,9.584,0.5827,0.0,1.0,0.0,0.4844,0.9688,-0.1667,9.584,0.5827,0.0,1.0,0.0,0.4844,1.0,-0.1667,9.584,2.5827,0.0,1.0,0.0,0.3906,1.0,0.1667,9.584,2.5827,0.0,1.0,0.0,0.3906,0.9688,0.1667,7.584,0.5827,1.0,0.0,0.0,0.4844,0.7813,0.1667,9.584,0.5827,1.0,0.0,0.0,0.4844,0.9688,0.1667,9.584,2.5827,1.0,0.0,0.0,0.3906,0.9688,0.1667,7.584,2.5827,1.0,0.0,0.0,0.3906,0.7813,0.1667,7.584,2.5827,-0.0,-0.0,1.0,0.3906,0.7813,0.1667,9.584,2.5827,-0.0,-0.0,1.0,0.3906,0.9688,-0.1667,9.584,2.5827,-0.0,-0.0,1.0,0.375,0.9688,-0.1667,7.584,2.5827,-0.0,-0.0,1.0,0.375,0.7813,-0.1667,7.584,2.5827,-1.0,-0.0,-0.0,0.5938,0.7812,-0.1667,9.584,2.5827,-1.0,-0.0,-0.0,0.5938,0.9688,-0.1667,9.584,0.5827,-1.0,-0.0,-0.0,0.5,0.9688,-0.1667,7.584,0.5827,-1.0,-0.0,-0.0,0.5,0.7813,0.1667,9.584,0.5827,0.0,0.0,-1.0,0.4844,0.9688,0.1667,7.584,0.5827,0.0,0.0,-1.0,0.4844,0.7813,-0.1667,7.584,0.5827,0.0,0.0,-1.0,0.5,0.7813,-0.1667,9.584,0.5827,0.0,0.0,-1.0,0.5,0.9688]},"Cape":{"indices":[0,1,2,0,2,3,4,5,6,4,6,7,8,9,10,8,10,11,12,13,14,12,14,15,16,17,18,16,18,19,20,21,22,20,22,23],"sub_meshes":{"Cape":[0,36]},"vertices":[-0.5,2.0,-1.25,0.0,-1.0,0.0,0.3281,1.0,-0.5,2.0,1.25,0.0,-1.0,0.0,0.1719,1.0,-0.75,2.0,1.25,0.0,-1.0,0.0,0.1719,0.9688,-0.75,2.0,-1.25,0.0,-1.0,0.0,0.3281,0.9688,-0.5,6.0,-1.25,0.0,1.0,0.0,0.0156,1.0,-0.75,6.0,-1.25,0.0,1.0,0.0,0.0156,0.9688,-0.75,6.0,1.25,0.0,1.0,0.0,0.1719,0.9688,-0.5,6.0,1.25,0.0,1.0,0.0,0.1719,1.0,-0.5,2.0,-1.25,1.0,0.0,0.0,0.3437,0.4688,-0.5,6.0,-1.25,1.0,0.0,0.0,0.3437,0.9688,-0.5,6.0,1.25,1.0,0.0,0.0,0.1875,0.9688,-0.5,2.0,1.25,1.0,0.0,0.0,0.1875,0.4688,-0.5,2.0,1.25,-0.0,-0.0,1.0,0.1875,0.4688,-0.5,6.0,1.25,-0.0,-0.0,1.0,0.1875,0.9688,-0.75,6.0,1.25,-0.0,-0.0,1.0,0.1719,0.9688,-0.75,2.0,1.25,-0.0,-0.0,1.0,0.1719,0.4688,-0.75,2.0,1.25,-1.0,-0.0,-0.0,0.1719,0.4688,-0.75,6.0,1.25,-1.0,-0.0,-0.0,0.1719,0.9688,-0.75,6.0,-1.25,-1.0,-0.0,-0.0,0.0156,0.9688,-0.75,2.0,-1.25,-1.0,-0.0,-0.0,0.0156,0.4688,-0.5,6.0,-1.25,0.0,0.0,-1.0,0.0,0.9688,-0.5,2.0,-1.25,0.0,0.0,-1.0,-0.0,0.4688,-0.75,2.0,-1.25,0.0,0.0,-1.0,0.0156,0.4688,-0.75,6.0,-1.25,0.0,0.0,-1.0,0.0156,0.9688]},"_skeleton":{"objects":["Body"],"children":[{"objects":["Cape"],"children":[],"name":"Cape","offset":[-0.5,0.5,-0.0]},{"objects":["Left_ear","Hat","Head","Right_ear"],"children":[],"name":"Head","offset":[0.0,0.5,-0.0]},{"objects":["Right_leg"],"children":[],"name":"Right_leg","offset":[0.0,-2.5,0.5]},{"objects":["Left_leg"],"children":[],"name":"Left_leg","offset":[0.0,-2.5,-0.5]},{"objects":["Left_arm"],"children":[],"name":"Left_arm","offset":[0.0,0.5,-1.0]},{"objects":["Right_arm"],"children":[],"name":"Right_arm","offset":[0.0,0.5,1.0]}],"name":"Body","offset":[0.0,5.5,-0.0]},"Left_arm":{"indices":[0,1,2,0,2,3,4,5,6,4,6,7,8,9,10,8,10,11,12,13,14,12,14,15,16,17,18,16,18,19,20,21,22,20,22,23],"sub_meshes":{"Char":[0,36]},"vertices":[0.5,3.0,-2.0,0.0,-1.0,0.0,0.75,0.375,0.5,3.0,-1.0,0.0,-1.0,0.0,0.8125,0.375,-0.5,3.0,-1.0,0.0,-1.0,0.0,0.8125,0.5,-0.5,3.0,-2.0,0.0,-1.0,0.0,0.75,0.5,0.5,6.0,-2.0,0.0,1.0,0.0,0.6875,0.375,-0.5,6.0,-2.0,0.0,1.0,0.0,0.6875,0.5,-0.5,6.0,-1.0,0.0,1.0,0.0,0.75,0.5,0.5,6.0,-1.0,0.0,1.0,0.0,0.75,0.375,0.5,3.0,-2.0,1.0,0.0,0.0,0.6875,0.0,0.5,6.0,-2.0,1.0,0.0,0.0,0.6875,0.375,0.5,6.0,-1.0,1.0,0.0,0.0,0.75,0.375,0.5,3.0,-1.0,1.0,0.0,0.0,0.75,0.0,0.5,3.0,-1.0,-0.0,-0.0,1.0,0.75,0.0,0.5,6.0,-1.0,-0.0,-0.0,1.0,0.75,0.375,-0.5,6.0,-1.0,-0.0,-0.0,1.0,0.8125,0.375,-0.5,3.0,-1.0,-0.0,-0.0,1.0,0.8125,0.0,-0.5,3.0,-1.0,-1.0,-0.0,-0.0,0.8125,0.0,-0.5,6.0,-1.0,-1.0,-0.0,-0.0,0.8125,0.375,-0.5,6.0,-2.0,-1.0,-0.0,-0.0,0.875,0.375,-0.5,3.0,-2.0,-1.0,-0.0,-0.0,0.875,0.0,0.5,6.0,-2.0,0.0,0.0,-1.0,0.6875,0.375,0.5,3.0,-2.0,0.0,0.0,-1.0,0.6875,0.0,-0.5,3.0,-2.0,0.0,0.0,-1.0,0.625,0.0,-0.5,6.0,-2.0,0.0,0.0,-1.0,0.625,0.375]},"Left_ear":{"indices":[0,1,2,0,2,3,4,5,6,4,6,7,8,9,10,8,10,11,12,13,14,12,14,15,16,17,18,16,18,19,20,21,22,20,22,23],"sub_meshes":{"Char":[0,36]},"vertices":[0.1667,7.584,-2.583,0.0,-1.0,0.0,0.5781,1.0,0.1667,7.584,-0.583,0.0,-1.0,0.0,0.4844,1.0,-0.1667,7.584,-0.583,0.0,-1.0,0.0,0.4844,0.9688,-0.1667,7.584,-2.583,0.0,-1.0,0.0,0.5781,0.9688,0.1667,9.584,-2.583,0.0,1.0,0.0,0.4844,0.9688,-0.1667,9.584,-2.583,0.0,1.0,0.0,0.4844,1.0,-0.1667,9.584,-0.583,0.0,1.0,0.0,0.3906,1.0,0.1667,9.584,-0.583,0.0,1.0,0.0,0.3906,0.9688,0.1667,7.584,-2.583,1.0,0.0,0.0,0.4844,0.7813,0.1667,9.584,-2.583,1.0,0.0,0.0,0.4844,0.9688,0.1667,9.584,-0.583,1.0,0.0,0.0,0.3906,0.9688,0.1667,7.584,-0.583,1.0,0.0,0.0,0.3906,0.7813,0.1667,7.584,-0.583,-0.0,-0.0,1.0,0.3906,0.7813,0.1667,9.584,-0.583,-0.0,-0.0,1.0,0.3906,0.9688,-0.1667,9.584,-0.583,-0.0,-0.0,1.0,0.375,0.9688,-0.1667,7.584,-0.583,-0.0,-0.0,1.0,0.375,0.7813,-0.1667,7.584,-0.583,-1.0,-0.0,-0.0,0.5938,0.7812,-0.1667,9.584,-0.583,-1.0,-0.0,-0.0,0.5938,0.9688,-0.1667,9.584,-2.583,-1.0,-0.0,-0.0,0.5,0.9688,-0.1667,7.584,-2.583,-1.0,-0.0,-0.0,0.5,0.7813,0.1667,9.584,-2.583,0.0,0.0,-1.0,0.4844,0.9688,0.1667,7.584,-2.583,0.0,0.0,-1.0,0.4844,0.7813,-0.1667,7.584,-2.583,0.0,0.0,-1.0,0.5,0.7813,-0.1667,9.584,-2.583,0.0,0.0,-1.0,0.5,0.9688]}};
	
	function Mesh3D(mesh, shader, tex)
	{
		this.verticesBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, this.verticesBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(mesh.vertices), gl.STATIC_DRAW);
		
		this.vertexStruct = [
			[shader.vertexPositionAttribute, 3],
			[shader.vertexNormalAttribute, 3],
			[shader.textureCoordAttribute, 2]
		];
		
		this.elementsBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.elementsBuffer);
		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(mesh.indices), gl.STATIC_DRAW);
		this.sub_meshes = mesh.sub_meshes;
		
		this.shader = shader;
		this.tex = tex;
		
		this.Draw = DrawVBO;
		
		this.Delete = function(){
			gl.deleteBuffer(this.verticesBuffer);
			gl.deleteBuffer(this.elementsBuffer);
		}
		
		this.visible = true;
	}
	
	function MinecraftPlayerModel(obj, username)
	{
		this.RotationMatrix = Matrix.I(3);
		this.Position = $V([0,0,0]);
		this.shader = new Shader("textured_shaded");
		
		tex = {
		//	Char: "http://s3.amazonaws.com/MinecraftSkins/"+username+".png?r="+Math.random(),
			Char: "http://www.minecraft.net/skin/"+username+".png",
			Cape: "http://www.minecraft.net/cloak/get.jsp?user="+username
		}
		for (tex_name in tex)
		{
			if (tex_name != "Cape")
				tex[tex_name] = TextureLoader.LoadTexture(tex[tex_name], function(obj)
				{
					var tex_id = TextureLoader.LoadTexture("http://www.minecraft.net/img/char.png");
					for (var mesh_name in obj.meshes)
						obj.meshes[mesh_name].tex["Char"] = tex_id;
				}, null, this)
			else
				tex[tex_name] = TextureLoader.LoadTexture(tex[tex_name],
				function(obj)
				{
					obj.meshes["Cape"].Delete();
					delete obj.meshes["Cape"];
				},
				function(obj)
				{
					obj.meshes["Cape"].visible = true;
				}, this)
		}
		
		this.meshes = []
		var div = document.getElementById("visibility");
		for (obj_name in obj)
		{
			if (obj_name[0] == "_")
				continue;
			if ((obj_name == "Left_ear" || obj_name == "Right_ear") && username != "deadmau5")
				continue;
			this.meshes[obj_name] = new Mesh3D(obj[obj_name], this.shader, tex);
			if (obj_name == "Cape")
			{
				this.meshes[obj_name].visible = false;
				continue;
			}
		}
		this.skeleton = null;
		this.bones = {};
		this._initBone = function(bone)
		{
			bone.matrix = Matrix.I(4);
			this.bones[bone.name] = bone;
			for (var i=0; i<bone.children.length; i++)
			{
				bone.children[i].parent = bone;
				this._initBone(bone.children[i]);
			}
		}
		if (typeof obj._skeleton != "undefined")
		{
			this.skeleton = obj._skeleton;
			this.skeleton.parent = null;
			this._initBone(this.skeleton);
		}
		this.transformBone = function(bone_name, matrix)
		{
			if (this.skeleton == null || typeof this.bones[bone_name] == "undefined")
				return;
			var bone = this.bones[bone_name];
			var offset = Vector.Zero(3);
			while (bone != null)
			{
				offset = offset.add($V(bone.offset));
				bone = bone.parent;
			}
			var mt = Matrix.Translation(offset.multiply(-1)).ensure4x4();
			var mt2 = Matrix.Translation(offset).ensure4x4();
			var m = mt2.x(matrix.ensure4x4());
			m = m.x(mt);
			this.bones[bone_name].matrix = m;
		}
		this._move = function(bone_name, ang1, ang2)
		{
			ang1 = ang1 * Math.PI / 180.0;
			ang2 = ang2 * Math.PI / 180.0;
			
			var m1 = Matrix.Rotation(ang1, $V([1,0,0])).ensure4x4();
			var m2 = Matrix.Rotation(ang2, $V([0,0,1])).ensure4x4();
			var m = m1.x(m2);
			
			this.transformBone(bone_name, m);
		}
		this.MoveLeftArm = function(ang1, ang2)
		{
			this._move("Left_arm", ang1, ang2);
		}
		this.MoveRightArm = function(ang1, ang2)
		{
			this._move("Right_arm", -ang1, ang2);
		}
		this.MoveLeftLeg = function(ang1, ang2)
		{
			this._move("Left_leg", ang1, ang2);
		}
		this.MoveRightLeg = function(ang1, ang2)
		{
			this._move("Right_leg", -ang1, ang2);
		}
		this.MoveHead = function(ang1, ang2)
		{
			ang1 = ang1 * Math.PI / 180.0;
			ang2 = ang2 * Math.PI / 180.0;
			
			var m1 = Matrix.Rotation(ang1, $V([0,0,1])).ensure4x4();
			var m2 = Matrix.Rotation(ang2, $V([0,1,0])).ensure4x4();
			var m = m2.x(m1);
			
			this.transformBone("Head", m);
		}
		this.MoveCape = function(ang)
		{
			ang = ang * Math.PI / 180.0;
			
			var m = Matrix.Rotation(-ang, $V([0,0,1])).ensure4x4();
			
			this.transformBone("Cape", m);
		}
		var draw_ = null;
		this.Draw = function()
		{
			mvPushMatrix();

			mvTranslate(this.Position.elements);
			multMatrix(this.RotationMatrix);
			mvTranslate([0,-5,0]);
			if (this.skeleton == null)
			{
				for (mesh_name in this.meshes)
					if (this.meshes[mesh_name].visible)
						this.meshes[mesh_name].Draw();
			}
			else
			{
				this._drawBone(this.skeleton);
			}
			
			mvPopMatrix();
		}
		this._drawBone = function(bone)
		{
			mvPushMatrix();
			
			multMatrix(bone.matrix);
			for (var i=0; i<bone.objects.length; i++)
			{
				if (typeof this.meshes[bone.objects[i]] != "undefined")
					if (this.meshes[bone.objects[i]].visible)
						this.meshes[bone.objects[i]].Draw();
			}
			
			for (var i=0; i<bone.children.length; i++)
				this._drawBone(bone.children[i]);
			
			mvPopMatrix();
		}
	}

	var rotate = true;
	var animate = true;
	var mouseDown = false;
	var lastMouseX = null;
	var lastMouseY = null;
	var startMouseX = null;
	var startMouseY = null;
	function handleMouseDown(event)
	{
		if (event.button == 0)
		{
			mouseDown = true;
			lastMouseX = startMouseX = event.clientX;
			lastMouseY = startMouseY = event.clientY;
		}
	}
	function handleMouseUp(event)
	{
		if (event.button == 0)
		{
			mouseDown = false;
			if (startMouseX == event.clientX && startMouseY == event.clientY)
			{
				rotate = animate = !animate;
			}
		}
	}
	function handleMouseMove(event)
	{
		if (!mouseDown)
		{
			return;
		}
		
		rotate = false;
		
		var newX = event.clientX;
		var newY = event.clientY;

		var deltaX = newX - lastMouseX
		var deltaY = newY - lastMouseY;

		if (!event.shiftKey)
		{
			var newRotationMatrix = Matrix.Rotation(Math.PI*(deltaX / 5)/180, $V([0,1,0]));
			newRotationMatrix = newRotationMatrix.x(Matrix.Rotation(-Math.PI*(deltaY / 5)/180, $V([0,0,1])));
			
			playerModel.RotationMatrix = newRotationMatrix.x(playerModel.RotationMatrix);
		}
		else
		{
			playerModel.Position = playerModel.Position.add($V([0,-deltaY*distance/150,-deltaX*distance/150]));
			playerModel.Position.elements[1] = Math.max(-4, Math.min(playerModel.Position.elements[1], 4));
			playerModel.Position.elements[2] = Math.max(-6, Math.min(playerModel.Position.elements[2], 6));
		}
		lastMouseX = newX
		lastMouseY = newY;
	}
	var distance = 14;
	function handleMouseScroll(event)
	{
		distance += event.detail/3;
		distance = Math.max(3, Math.min(distance, 20));
		event.preventDefault();
	}

	var anim_t = 0.0;
	var lastTime = (new Date).getTime()/1000;
	function drawScene()
	{
		requestAnimFrame(drawScene);
			
		var time = (new Date).getTime()/1000;
		var timeDiff = time - lastTime;
		lastTime = time;
		
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

		perspectiveMatrix = makePerspective(45, gl.viewportWidth/gl.viewportHeight, 0.1, 100.0);
		
		loadIdentity();
		viewMatrix = makeLookAt(distance, 0, 0, 0, 0, 0, 0, 1, 0);
		multMatrix(viewMatrix);
		
		if (rotate)
		{
			playerModel.RotationMatrix = Matrix.Rotation(45*timeDiff*Math.PI/180, $V([0,1,0])).x(playerModel.RotationMatrix);
		}
		if (animate)
		{
			playerModel.MoveLeftArm(15, periodicFun(anim_t, 0, 2, -45, 45, "sin"))
			playerModel.MoveRightArm(15, -periodicFun(anim_t, 0, 2, -45, 45, "sin"))
			playerModel.MoveLeftLeg(0, periodicFun(anim_t, 0, 1.75, -30, 30, "sin"))
			playerModel.MoveRightLeg(0, -periodicFun(anim_t, 0, 1.75, -30, 30, "sin"))
			playerModel.MoveHead(periodicFun(anim_t, 0, 6, -15, 20, "sin"), periodicFun(anim_t, 0, 5, -45, 45, "sin"))
			playerModel.MoveCape(periodicFun(anim_t, 0, 1, 6, 12, "sin")+periodicFun(anim_t, 0, 1.3, -2, 2, "sin"))
			anim_t += timeDiff
		}
		playerModel.Draw();
	}
	
	function periodicFun(t, offset, period, min, max, type)
	{
		var range = max - min;
		switch(type)
		{
			case "sin":
				return 0.5*(Math.sin(2*(t+offset)*Math.PI/period)*range+max+min);
				break;
			case "sawtooth":
				return ((t + offset) % period)/period*range+min;
				break;
			case "triangle":
				return Math.abs(2*((t + offset) % period)/period)*range+min;
				break;
		}
	}

	function loadIdentity()
	{
		mvMatrix = Matrix.I(4);
	}
	function multMatrix(m)
	{
		m = m.dup();
		mvMatrix = mvMatrix.x(m.ensure4x4());
	}
	function mvTranslate(v)
	{
		multMatrix(Matrix.Translation($V([v[0], v[1], v[2]])).ensure4x4());
	}
	function mvRotate(angle, v)
	{
		var inRadians = angle * Math.PI / 180.0;
		var m = Matrix.Rotation(inRadians, $V([v[0], v[1], v[2]])).ensure4x4();
		multMatrix(m);
	}
	var mvMatrixStack = [];
	function mvPushMatrix(m)
	{
		if (m)
		{
			mvMatrixStack.push(m.dup());
			mvMatrix = m.dup();
		}
		else
		{
			mvMatrixStack.push(mvMatrix.dup());
		}
	}
	function mvPopMatrix()
	{
		if (!mvMatrixStack.length)
		{
			throw("Can't pop from an empty matrix stack.");
		}
	  
		mvMatrix = mvMatrixStack.pop();
		return mvMatrix;
	}
	function setMatrixUniforms(shader)
	{
		var pUniform = gl.getUniformLocation(shader.shaderProgram, "uPMatrix");
		gl.uniformMatrix4fv(pUniform, false, new Float32Array(perspectiveMatrix.flatten()));

		var mvUniform = gl.getUniformLocation(shader.shaderProgram, "uMVMatrix");
		gl.uniformMatrix4fv(mvUniform, false, new Float32Array(mvMatrix.flatten()));

		var nUniform = gl.getUniformLocation(shader.shaderProgram, "uNormalMatrix");
		if (nUniform != null)
		{
			var normalMatrix = mvMatrix.inverse();
			normalMatrix = normalMatrix.transpose();
			gl.uniformMatrix4fv(nUniform, false, new Float32Array(normalMatrix.flatten()));
		}
	}
	start();
	//delete objFile._skeleton;
	playerModel = new MinecraftPlayerModel(objFile, gup("user"));
	drawScene();
}

var loadedScripts = 0;
if (typeof Matrix == "undefined")
{
	function onLoad()
	{
		loadedScripts++;
		if (loadedScripts == 2)
		{
			var script = document.createElement("script");
			script.textContent = "(" + main.toString() + ")();";
			document.body.appendChild(script);
		}
	}
	var script1 = document.createElement("script");
	script1.setAttribute("src", "https://developer.mozilla.org/samples/webgl/sample2/sylvester.js");
	script1.addEventListener('load', onLoad, false);
	document.body.appendChild(script1);
	
	var script2 = document.createElement("script");
	script2.setAttribute("src", "https://developer.mozilla.org/samples/webgl/sample2/glUtils.js");
	script2.addEventListener('load', onLoad, false);
	document.body.appendChild(script2);
}
else
{
	main();
}