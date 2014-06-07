// ==UserScript==
// @name        ejdllTest
// @namespace   ejdll
// @include     http://rule34.paheal.net/post/list*
// @version     1
// ==/UserScript==


//--declara variables
var conteo = 0
var listaTags = []			//lista de tags de las imagenes en la pagina

//--esconde la barra de la izquierda y ajusta lo sobrante
var nav = document.getElementsByTagName("nav")
nav[0].style.display="none"
var imgsList = document.getElementsByTagName("article")
imgsList[0].style.width="100%"
imgsList[0].style.position="relative"
imgsList[0].style.left="-276px"

//--estilos de documento
/*var documentBody = document.getElementsByTagName("body")
documentBody = documentBody[0]
documentBody.style.background="none"
documentBody.style.backgroundColor="#22183A"
document.getElementById("header").style.backgroundColor="transparent"*/

/////////////////////////////////////////////////
//
//		SECCION DE IMAGENES
//			Y
//		   MENU DE TAGS
//
/////////////////////////////////////////////////

//--obtiene listado de imagenes
var thumbs = document.getElementsByClassName("thumb")

//--iteración por cada imagen
for (i = 0; i<thumbs.length ;i+=1){
  //////////////////////
  //OBTENER VARIABLES
  //////////////////////
  var links = thumbs[i].getElementsByTagName("a")				//los links dentro de cada .thumb
  var toLink = links[1].href							//la direccion del segundo link ("image only")
  var linkImg = links[0].getElementsByTagName("img")[0]				//la imagen dentro del link dentro de .thumb
  var gallery = (thumbs[i].getElementsByTagName("img")[0].alt).split(" ")	//los tags de la imagen dentro del link en .thumb
  conteo = 0									//regresa el contador de tags a cero

  //////////////////////
  //CREACION DE OBJETOS
  //////////////////////
  //--crea los objetos que serán el menu contextual de tags
  var tagTbl = document.createElement("div")					//contenedor del menu flotante de tags
  var tagTblTit = document.createElement("a")					//titulo del menu flotante de tags
  var tagTblTag = document.createElement("div")					//div donde se colocaran los link de los tags

  //////////////////////
  //ASIGNACION DE ESTILOS
  //////////////////////
  //--ESTILOS DE .thumb Y SUS HIJOS
  //--estilos de cada div .thumb
  thumbs[i].style.verticalAlign="middle"
  thumbs[i].style.height="250px"
  thumbs[i].style.zIndex=10000-(i*20)
  thumbs[i].style.position="relative"
  //--estilos del tag img dentro del div thumb
  links[0].style.display="block"
  links[0].style.height="210px"
  links[0].style.width="210px"
  links[0].style.backgroundColor="#D2F5CB"
  //--estilos de la imagen dentro del link dentro de thumbs
  linkImg.style.display="block"
  linkImg.style.position="relative"
  linkImg.style.top = 96 - (linkImg.height/2) + "px"
  linkImg.style.left = 96 - (linkImg.width/2) + "px"
   
  //--ESTILOS DE MENU DE TAGS
  //--estilos de contenedor de menu flotante
  tagTbl.id = "tagTbl_" + i
  tagTbl.style.textAlign="left"
  tagTbl.style.width="67px"
  tagTbl.style.border="1px solid #000"
  tagTbl.style.backgroundColor="#F7E7BF"
  tagTbl.style.position="relative"
  tagTbl.style.top="-36px"
  //--estilos del titulo del menu de tags
  tagTblTit.id = "tagTblTit_" + i
  tagTblTit.style.width="57px"
  tagTblTit.style.cursor="pointer"
  tagTblTit.style.textAlign="center"
  tagTblTit.style.paddingLeft="5px"
  tagTblTit.style.paddingRight="5px"
  tagTblTit.style.display="block"
  tagTbl.appendChild(tagTblTit)
  //--estilos del div que contiene los links de los tags dentro del menu flotante de tags
  tagTblTag.style.backgroundColor="#CCBE9C"
  tagTblTag.style.textAlign="center"
  tagTblTag.style.overflow="hidden"
  tagTblTag.style.display="none"
  tagTbl.appendChild(tagTblTag)
  
  
  //--itera el listado de tags
  for (ii = 0; ii < gallery.length; ii+=1){
      if (gallery[ii] != "//"){							//revisa que en realidad sea una galería y no los marcadores de imagenes
      //--crea nodos para un link a la galería y un salto de línea
      var sp = document.createElement("a")
      var lb = document.createElement("br")
      
      if (gallery[ii] != document.title){					//revisa que el titulo de la pagina no sea igual al link que planea incluirse
        sp.innerHTML = gallery[ii]
        sp.href = "http://rule34.paheal.net/post/list/" + gallery[ii] + "/1"
        tagTblTag.appendChild(sp)
        tagTblTag.appendChild(lb)
        conteo += 1
        if (listaTags.indexOf(gallery[ii]) == -1){				//revisa si existe el tag actual en la lista general de tags
          listaTags.push(gallery[ii])
        }
      }
      
    }
    else{									//en case de ser ya el texto "//" se salta toda comprobación siguiente sobre la imagen
      ii = gallery.length +1
    }
    
  }//FIN DE ITERACION DE LISTADO DE TAGS
  
  //////////////////////
  //ACCIONES SIMPLES
  //////////////////////
  //--intercambiar link de imagen y de "image only", eliminar ese ultimo link
  links[0].href = toLink
  thumbs[i].removeChild(links[1])
  //--asigna el titulo del menu flotante de tags
  tagTblTit.innerHTML = " (" + conteo + ") [+]"
  //--agrega el menu flotante de tags al div .thumb
  thumbs[i].appendChild(tagTbl)
  //--asigna listener de click a cada menu flotante de tags
  var tagTblLst = document.getElementById("tagTbl_" + i)
  tagTblLst.addEventListener('click',toggleTagTbl,false);
  
}//FIN DE LA ITERACION POR CADA IMAGEN




//--DEFINICION DE SECCIONES EN MENU SUPERIOR

//--Finder
//--finder elementos
var finder = document.createElement("div")			//div contenedor del finder
var finderTitle = document.createElement("a")			//titulo y objeto para aparecer/desaparecer menu
var finderBox = document.createElement("div")			//caja de busqueda en finder
var finderLabel = document.createElement("span")		//linea de texto
var finderForm = document.createElement("form")			//formulario de finder
var finderFormSearch = document.createElement("input")		//barra de busqueda
var finderFormSearchHidden = document.createElement("input")	//barra de busqueda escondida
var finderFormSimpleSearch = document.createElement("input")	//boton de busqueda sencilla
var finderLineBreak = document.createElement("br")		//salto de linea
var finderFormAvanzado = document.createElement("a")		//texto para desplegar caja de busqueda avanzada
var finderFormSimpleBox = document.createElement("div")		//caja de busqueda simple en finder
var finderFormAvanzadoBox = document.createElement("div")	//caja de busqueda avanzada en finder
var finderFormSelectTagsLabel = document.createElement("span")	//linea de texto antes de listado de tags
var finderFormSelectTags = document.createElement("select")	//cuadro select para los tags en la pagina


//--finder estilos
finder.style.position="fixed"
finder.style.top="0px"
finder.style.left="0px"
finder.style.backgroundColor="#F7E7BF"
finder.style.width="85px"
finder.style.height="20px"
finder.style.zIndex=500001

finderTitle.style.fontWeight="bold"
finderTitle.style.cursor="pointer"

finderBox.style.width="355px"
finderBox.style.height="auto"
finderBox.style.padding="5px 15px 10px 15px"
finderBox.style.backgroundColor="#CCBE9C"
finderBox.style.border="1px solid #000"
finderBox.style.textAlign="left"
finderBox.style.display="none"

finderForm.action="javascript:;"

finderFormSimpleBox.style.width="335px"
finderFormSimpleBox.style.marginTop="10px"
finderFormSimpleBox.style.padding="10px 10px"
finderFormSimpleBox.style.backgroundColor="#8D7C59"
finderFormSimpleBox.style.display="block"

finderFormSearch.style.width="155px"
finderFormSearch.style.marginLeft="5px"
finderFormSearch.id="finderSimpleInput"

finderFormSearchHidden.type="hidden"

finderFormSimpleSearch.type="button"
finderFormSimpleSearch.value="Simple search"
finderFormSimpleSearch.style.marginLeft="10px"

finderFormAvanzado.style.fontSize="12px"
finderFormAvanzado.style.cursor="pointer"
finderFormAvanzado.style.marginLeft="225px"

finderFormAvanzadoBox.style.width="335px"
finderFormAvanzadoBox.style.marginTop="10px"
finderFormAvanzadoBox.style.padding="10px 10px"
finderFormAvanzadoBox.style.backgroundColor="#8D7C59"
finderFormAvanzadoBox.style.display="none"

finderFormSelectTags.size="10"
finderFormSelectTags.multiple="multiple"
finderFormSelectTags.style.width="150px"


//--contenido de labels de finder
finderTitle.innerHTML="[+] FINDER"
finderLabel.innerHTML="Search:"
finderFormAvanzado.innerHTML="Advanced search [+]"
finderFormSelectTagsLabel.innerHTML= listaTags.length + " Tags in page:"
//--contenido de finderSelectTags
listaTags.sort()
for(i=0; i<listaTags.length; i+=1) {  //itera por cada elemento dentro de la lista de tags
  var tag = document.createElement("option")
  tag.innerHTML=listaTags[i]
  finderFormSelectTags.appendChild(tag)
}

//--finder armado
finder.appendChild(finderTitle)
finder.appendChild(finderBox)

finderBox.appendChild(finderForm)

finderForm.appendChild(finderFormAvanzado)
finderForm.appendChild(finderLineBreak)

finderForm.appendChild(finderFormSimpleBox)

finderFormSimpleBox.appendChild(finderLabel)
finderFormSimpleBox.appendChild(finderFormSearch)
finderFormSimpleBox.appendChild(finderFormSearchHidden)
finderFormSimpleBox.appendChild(finderFormSimpleSearch)

//finderForm.appendChild(finderLineBreak.cloneNode())
finderForm.appendChild(finderFormAvanzadoBox)

finderFormAvanzadoBox.appendChild(finderFormSelectTagsLabel)
finderFormAvanzadoBox.appendChild(finderLineBreak.cloneNode())
finderFormAvanzadoBox.appendChild(finderFormSelectTags)

//--finder asigna funcion para toggle
finderTitle.addEventListener("click",toggleFinderBox,false)
finderFormSearch.addEventListener("keyup",finderFormSimpleInputDo,false)
finderFormAvanzado.addEventListener("click",toggleFinderAdvancedSearchBox,false)
finderFormSimpleSearch.addEventListener("click",finderFormSimpleSearchDo,false)
finderForm.addEventListener('submit',finderFormSearchDo,false);








//--navigator
//--navigator elementos
var navigator = document.createElement("div")
var paginPrev = document.createElement("a")		//previous
var paginIndx = document.createElement("a")		//index
var paginNext = document.createElement("a")		//next
var paginRand = document.createElement("a")		//random
var paginCont = document.createElement("span")		//contador
var paginContForm = document.createElement("form")	//form para cambiar página
var paginContInpt = document.createElement("input")	//input para cambiar de pagina

//--navigator estilos
navigator.style.position="fixed"
navigator.style.top="0px"
navigator.style.left="95px"
navigator.style.backgroundColor="#F7E7BF"
navigator.style.height="20px"
navigator.style.paddingLeft="10px"
navigator.style.paddingRight="10px"
navigator.style.zIndex=500000
paginPrev.innerHTML="Prev"
paginPrev.style.marginRight="10px"
paginIndx.innerHTML="Index"
paginIndx.style.marginRight="10px"
paginNext.innerHTML="Next"
paginNext.style.marginRight="10px"
paginRand.innerHTML="Random"
paginContForm.style.display="inline"
paginContForm.style.marginLeft="10px"
paginContForm.action="javascript:;"
paginContInpt.type="textbox"
paginContInpt.style.width="40px"
paginContInpt.style.height="15px"
paginContInpt.style.fontSize="11px"
paginContInpt.style.textAlign="center"
paginContInpt.style.border="1px solid #000"

//--navigator acciones y colleciones
var paginator = document.getElementById("paginator")
var pageLinks = (paginator.getElementsByTagName("div")[0]).getElementsByTagName("a")
paginContForm.addEventListener('submit',mandarPagina,false);


//--insersion de navigator
//--Previous
var firstOne = true
for (i=0;i<pageLinks.length;i+=1){
  if (pageLinks[i].innerHTML == "Prev"){
    firstOne = false
    paginPrev.href = pageLinks[i].href
    i = pageLinks.length+1
  }
}
if (firstOne != true){
  navigator.appendChild(paginPrev)
}

//--Index
navigator.appendChild(paginIndx)
paginIndx.href="http://rule34.paheal.net/post/list/"

//--Next
var lastOne = true
for (i=0;i<pageLinks.length;i+=1){
  if (pageLinks[i].innerHTML == "Next"){
    lastOne = false
    paginNext.href = pageLinks[i].href
    i = pageLinks.length+1
  }
}
if (lastOne != true){
  navigator.appendChild(paginNext)
}

//--Random
for (i=0;i<pageLinks.length;i+=1){
  if (pageLinks[i].innerHTML == "Random"){
    paginRand.href=pageLinks[i].href
    i = pageLinks.length+1
  }
}
navigator.appendChild(paginRand)

//--Contador
var paginContActual
var paginContUltima
if (firstOne == true){
  paginContActual = "1"
}
else{
  paginContActual = (document.URL).slice((document.URL).lastIndexOf("/")+1)
}
if (lastOne == true){
  if (firstOne == true){
    paginContUltima = "1"
  }
  else{
    paginContUltima = (document.URL).slice((document.URL).lastIndexOf("/")+1)
  }
}
else{
  for (i=0;i<pageLinks.length;i+=1){
    if (pageLinks[i].innerHTML == "Last"){
      paginContUltima = (pageLinks[i].href).slice((pageLinks[i].href).lastIndexOf("/")+1)
      i = pageLinks.length+1
    }
  }
}

if (paginContActual != paginContUltima || firstOne == false){
  paginContInpt.value=paginContActual
  paginContForm.appendChild(paginContInpt)
  navigator.appendChild(paginContForm)
  paginCont.innerHTML = " / " + paginContUltima
  navigator.appendChild(paginCont)
}
else{
  navigator.removeChild(paginRand)
  paginIndx.style.marginRight="0px"
}




//--Agrega los nodos del menú a la página
imgsList[0].appendChild(finder)
imgsList[0].appendChild(navigator)


/////////////////////////////////////////////////
//
//		SECCION DE FUNCIONES
//
/////////////////////////////////////////////////

//--funcion de aparicion/desaparicion del menu flotante de tags
function toggleTagTbl(){
  var tagPool = this.getElementsByTagName("div")
  tagPool = tagPool[0]
  
  if (tagPool.style.display == "none"){
    tagPool.style.display = "block"
    this.style.width="210px"
  }
  else{
    tagPool.style.display = "none"
    this.style.width="67px"
  }
}

//--funcion de aparicion/desaparicion del menu superior de finder
function toggleFinderBox(){
  var finderBoxDiv = (this.parentNode).getElementsByTagName("div")
  finderBoxDiv = finderBoxDiv[0]
  
  if (finderBoxDiv.style.display == "none"){
    finderBoxDiv.style.display = "block"
    document.getElementById("finderSimpleInput").focus()
  }
  else{
    finderBoxDiv.style.display = "none"
  }
}

//--funcion de aparicion/desaparicion del de busqueeda avanzada en el finder
function toggleFinderAdvancedSearchBox(){
  var avanzadoDiv = (this.parentNode).getElementsByTagName("div")
  
  /*
  avanzadoDiv[0] //simple search
  avanzadoDiv[1] //advanced search
  */
  
  if (avanzadoDiv[1].style.display == "none"){
    this.innerHTML="Advanced search [-]"
    avanzadoDiv[1].style.display = "block"
    avanzadoDiv[0].style.display = "none"
  }
  else{
    this.innerHTML="Advanced search [+]"
    avanzadoDiv[1].style.display = "none"
    avanzadoDiv[0].style.display = "block"
    document.getElementById("finderSimpleInput").focus()
  }
}

//--funcion para revisar escrto en busqueda simple en finder y ajustar el input segun los tags
function finderFormSimpleInputDo(){
  var escondido = this.nextSibling
  var actualSinSeleccion = (this.value).slice(0,this.selectionStart)
    
  if (escondido.value.length < actualSinSeleccion.length){
    if (this.value != ""){
      var buscarPor = "^" + (this.value)
      var expression = new RegExp(buscarPor,"i")
      for (i=0; i<listaTags.length; i+=1){
        if (expression.test(listaTags[i]) == true){
          var inputPos = this.value.length
          escondido.value = this.value
          this.value = listaTags[i]
//          selectPartOfInput(this,inputPos,this.value.length)

          this.selectionStart = inputPos
          this.selectionEnd = this.value.length
          
          i = listaTags.length+1
        }
      }
    }
  }
  else if (escondido.value.length == this.value.length){
    
  }
  else{
    escondido.value = this.value
  }
}

//--funcion para busqueda de galeria en finder simple search
function finderFormSimpleSearchDo(){
  var input = document.getElementById("finderSimpleInput")
  if (input.value.length > 0){
    document.location.href = "http://rule34.paheal.net/post/list/" + input.value + "/1"
  }
}

//--funcion para hacer la busqueda en finder con submit de HTML
function finderFormSearchDo(){

  if (document.getElementById("finderSimpleInput").parentNode.style.display == "block"){
    finderFormSimpleSearchDo()
  }
  else{
    
  }
}

//--funcion para cambio de pagina al mandar formulario en menu superior
function mandarPagina(){
  if (parseInt(paginContInpt.value) != "Nan" && parseInt(paginContInpt.value) > 0 && parseInt(paginContInpt.value) <= parseInt(paginContUltima)){
    document.location.href = paginContInpt.value
  }
}

//--seleccionar solo una parte del texto dentro de un input
function selectPartOfInput(el, startPos, endPos) {
  if (typeof el.selectionStart != "undefined") {
    // W3C compliant browsers -> Selection object
    el.selectionStart = startPos;
    el.selectionEnd = endPos;
  }
}



//--BORRA PUBLICIDAD Y ANUNCIOS, tambien borra paginator
mainSctn = document.getElementsByTagName("section")
for (i=0;i<mainSctn.length;i+=1){
  if (mainSctn[i].id != "image-list"){
    if (mainSctn[i].id != "Loginhead"){
      mainSctn[i].style.display="none"
    }
  }
}
