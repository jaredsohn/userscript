// ==UserScript==
// @name        Buggi Buggi
// @description Kokox
// @namespace   Buggi Cheese
// @include     http*://*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @grant       GM_addStyle
// @version     1.4
// ==/UserScript==
/*- The @grant directive is needed to work around a design change introduced
    in GM 1.0.   It restores the sandbox.
*/
//-- Note that :contains() is case-sensitive
var questionLabel   = $(
    "label.ss-q-title:contains('¿Qué forma de comunicación es una comunicación basada en texto en tiempo real utilizada entre dos o más personas que utilizan fundamentalmente texto para comunicarse?') ~ ul.ss-choices"
).first ().find ("input[type=radio][value='Mensajería instantánea']");
questionLabel.prop ('checked', true);

var questionLabel   = $(
    "label.ss-q-title:contains('Son redes privadas que utiliza una sola compañía, permiten a las empresas comunicarse y realizar transacciones entre los empleados mundiales y las sucursales') ~ ul.ss-choices"
).first ().find ("input[type=radio][value='intranet']");
questionLabel.prop ('checked', true);

var questionLabel   = $(
    "label.ss-q-title:contains('¿Qué equilibra la importancia del tráfico y sus características con el fin de administrar los datos?') ~ ul.ss-choices"
).first ().find ("input[type=radio][value='estratregia Qos']");
questionLabel.prop ('checked', true);

var questionLabel   = $(
    "label.ss-q-title:contains('¿Qué procesos se producen en el tráfico de red con el fin de que la calidad de las estrategias de servicios funcionen correctamente?') ~ ul.ss-choices"
).first ().find ("input[type=radio][value='se asignan prioridades a cada clasificación de los datos de la aplicación']");
questionLabel.prop ('checked', true);

var questionLabel   = $(
    "label.ss-q-title:contains('¿cuáles son dos componentes de la arquitectura de red?') ~ ul.ss-choices"
).first ().find ("input[type=radio][value='las personas que componen la red humana y las tecnologías que admiten las comunicaciones de red']");
questionLabel.prop ('checked', true);

var questionLabel   = $(
    "label.ss-q-title:contains('Las tecnologías de conmutación de circuitos y orientadas a la conexión') ~ ul.ss-choices"
).first ().find ("input[type=radio][value='no establecían circuitos alternativos en caso de una falla en la conexión y se establece un circuito dedicado']");
questionLabel.prop ('checked', true);

var questionLabel   = $(
    "label.ss-q-title:contains('la tecnología de comunicaciones de datos sin conexión por conmutación de paquetes') ~ ul.ss-choices"
).first ().find ("input[type=radio][value='utiliza eficazmente la infraestructura de red para transmitir datos']");
questionLabel.prop ('checked', true);

var questionLabel   = $(
    "label.ss-q-title:contains(' proporciona un nivel de entrega de datos constante e ininterrumpido para dar soporte a las expectativas de los usuarios. Hablamos de') ~ ul.ss-choices"
).first ().find ("input[type=radio][value='calidad de servicio']");
questionLabel.prop ('checked', true);

var questionLabel   = $(
    "label.ss-q-title:contains('Un pirata informático se conecta a un dispositivo de nuestra red. Hablamos de:') ~ ul.ss-choices"
).first ().find ("input[type=radio][value='seguridad en la infraestructura de la red']");
questionLabel.prop ('checked', true);

var questionLabel   = $(
    "label.ss-q-title:contains('son las reglas o acuerdos que rigen la conversación entre dispositivos de una red o rigen la forma en que se envían, dirigen, reciben e interpretan los mensajes') ~ ul.ss-choices"
).first ().find ("input[type=radio][value='protocolos']");
questionLabel.prop ('checked', true);

var questionLabel   = $(
    "label.ss-q-title:contains(' la eficiencia en las comunicaciones, con múltiples arquitecturas, sistemas, topologías, aplicaciones, lenguajes....se debe a') ~ ul.ss-choices"
).first ().find ("input[type=radio][value='las dos primeras son correctas']");
questionLabel.prop ('checked', true);

var questionLabel   = $(
    "label.ss-q-title:contains('el número de dispositivos que debe cruzar un mensaje a lo largo de la ruta a su destino final se considera un factor:') ~ ul.ss-choices"
).first ().find ("input[type=radio][value='externo']");
questionLabel.prop ('checked', true);

var questionLabel   = $(
    "label.ss-q-title:contains('la naturaleza del mensaje se considera un factor, para hacer que la comunicación sea exitosa:') ~ ul.ss-choices"
).first ().find ("input[type=radio][value='interno']");
questionLabel.prop ('checked', true);

var questionLabel   = $(
    "label.ss-q-title:contains('el estándar de networking o interconexión es un conjunto de protocolos denominado') ~ ul.ss-choices"
).first ().find ("input[type=radio][value='OSI']");
questionLabel.prop ('checked', true);

var questionLabel   = $(
    "label.ss-q-title:contains('la tecnología de red con cable más común en la actualidad se denomina') ~ ul.ss-choices"
).first ().find ("input[type=radio][value='Ethernet']");
questionLabel.prop ('checked', true);

var questionLabel   = $(
    "label.ss-q-title:contains('Señale un componente crítico en una red de cualquier tamaño') ~ ul.ss-choices"
).first ().find ("input[type=radio][value='router']");
questionLabel.prop ('checked', true);

var questionLabel   = $(
    "label.ss-q-title:contains('unen dos o más redes. Hablamos de:') ~ ul.ss-choices"
).first ().find ("input[type=radio][value='routers']");
questionLabel.prop ('checked', true);

var questionLabel   = $(
    "label.ss-q-title:contains(' son programas o software que dan soporte a la red humana, distribuidos en toda la red, y facilitan las herramientas de comunicación en línea:') ~ ul.ss-choices"
).first ().find ("input[type=radio][value='procesos']");
questionLabel.prop ('checked', true);

var questionLabel   = $(
    "label.ss-q-title:contains('se refiere a las principales comunicaciones troncales en Internet') ~ ul.ss-choices"
).first ().find ("input[type=radio][value='backbone']");
questionLabel.prop ('checked', true);

var questionLabel   = $(
    "label.ss-q-title:contains('cuando la demanda de recursos de red supera la capacidad disponible, hablamos de:') ~ ul.ss-choices"
).first ().find ("input[type=radio][value='congestión en la red']");
questionLabel.prop ('checked', true);

var questionLabel   = $(
    "label.ss-q-title:contains('cuando hablamos de redes convergentes nos referimos a:') ~ ul.ss-choices"
).first ().find ("input[type=radio][value='todas las anteriores son correctas']");
questionLabel.prop ('checked', true);

var questionLabel   = $(
    "label.ss-q-title:contains('las tecnologías que admiten la infraestructura, servicios y protocolos programados que pueden trasladar los mensajes en toda esa infraestructura se denomina') ~ ul.ss-choices"
).first ().find ("input[type=radio][value='arquitectura de red']");
questionLabel.prop ('checked', true);

var questionLabel   = $(
    "label.ss-q-title:contains('en la conmutación por paquetes el dispositivo destino conoce todas las fallas y rutas realizadas por dichos paquetes:') ~ ul.ss-choices"
).first ().find ("input[type=radio][value='falso']");
questionLabel.prop ('checked', true);

var questionLabel   = $(
    "label.ss-q-title:contains('consumir un producto conforme se va descargando (corriente continua de datos) se denomina:') ~ ul.ss-choices"
).first ().find ("input[type=radio][value='streaming']");
questionLabel.prop ('checked', true);

var questionLabel   = $(
    "label.ss-q-title:contains('La autenticación es un proceso asociado a la:') ~ ul.ss-choices"
).first ().find ("input[type=radio][value='confidencialidad de la información']");
questionLabel.prop ('checked', true);

var questionLabel   = $(
    "label.ss-q-title:contains('La división del stream de datos, del mensaje, en partes más pequeñas se denomina') ~ ul.ss-choices"
).first ().find ("input[type=radio][value='segmentación']");
questionLabel.prop ('checked', true);

var questionLabel   = $(
    "label.ss-q-title:contains('el proceso que se utiliza para intercalar (mezclar) las partes de conversaciones separadas en la red') ~ ul.ss-choices"
).first ().find ("input[type=radio][value='multiplexación']");
questionLabel.prop ('checked', true);

var questionLabel   = $(
    "label.ss-q-title:contains('¿Qué capa OSI está asociada con el direccionamiento IP?') ~ ul.ss-choices"
).first ().find ("input[type=radio][value='3']");
questionLabel.prop ('checked', true);

var questionLabel   = $(
    "label.ss-q-title:contains('software que proporciona información en respuesta a una solicitud') ~ ul.ss-choices"
).first ().find ("input[type=radio][value='servicio']");
questionLabel.prop ('checked', true);

var questionLabel   = $(
    "label.ss-q-title:contains('¿Qué tipo de direccionamiento se encuentra en la capa 2 de OSI?') ~ ul.ss-choices"
).first ().find ("input[type=radio][value='MAC']");
questionLabel.prop ('checked', true);

var questionLabel   = $(
    "label.ss-q-title:contains('Cuando un servidor responde a una solicitud web, ¿qué ocurre a continuación en el proceso de encapsulación, después de que los datos de la página web se formatean y se separan en segmentos TCP?') ~ ul.ss-choices"
).first ().find ("input[type=radio][value='el servidor agrega la dirección IP de origen y destino a cada encabezado de segmento para entregar los paquetes al destino']");
questionLabel.prop ('checked', true);

var questionLabel   = $(
    "label.ss-q-title:contains('¿Qué termino describe un conjunto específico de reglas que determinan el formato de los mensajes y el proceso de encapsulación utilizado para enviar los datos?') ~ ul.ss-choices"
).first ().find ("input[type=radio][value='protocolo']");
questionLabel.prop ('checked', true);

var questionLabel   = $(
    "label.ss-q-title:contains('¿Cuáles son los dos protocolos de la capa 4 del modelo OSI?') ~ ul.ss-choices"
).first ().find ("input[type=radio][value='TCP Y UDP']");
questionLabel.prop ('checked', true);

var questionLabel   = $(
    "label.ss-q-title:contains('Al proceso específico de agregar información específicas de capas necesarias para transmitir datos se denomina:') ~ ul.ss-choices"
).first ().find ("input[type=radio][value='encapsulación']");
questionLabel.prop ('checked', true);

var questionLabel   = $(
    "label.ss-q-title:contains('el software que proporcionan la funcionalidad que direcciona y transmite mensajes a través de la red se denomina') ~ ul.ss-choices"
).first ().find ("input[type=radio][value='procesos']");
questionLabel.prop ('checked', true);

var questionLabel   = $(
    "label.ss-q-title:contains('se encarga de las políticas dentro de la red de comunicaciones. Son los') ~ ul.ss-choices"
).first ().find ("input[type=radio][value='IPS']");
questionLabel.prop ('checked', true);

var questionLabel   = $(
    "label.ss-q-title:contains('se encargan del movimiento de datos por la red. Son las') ~ ul.ss-choices"
).first ().find ("input[type=radio][value='capas inferiores de la suite TCP/IP']");
questionLabel.prop ('checked', true);

var questionLabel   = $(
    "label.ss-q-title:contains('Se enfocan en el contenido del mensaje que se va a enviar y en la interfaz del usuario. Son las') ~ ul.ss-choices"
).first ().find ("input[type=radio][value='capas superiores de la suite TCP/IP']");
questionLabel.prop ('checked', true);

var questionLabel   = $(
    "label.ss-q-title:contains('HTTP es un protocolo de la capa de:') ~ ul.ss-choices"
).first ().find ("input[type=radio][value='aplicación']");
questionLabel.prop ('checked', true);

var questionLabel   = $(
    "label.ss-q-title:contains('estandariza los formatos de datos entre sistemas. Hablamos de la capa de:') ~ ul.ss-choices"
).first ().find ("input[type=radio][value='presentación']");
questionLabel.prop ('checked', true);

var questionLabel   = $(
    "label.ss-q-title:contains('define procedimientos para acceder al medio. Hablamos de la capa de:') ~ ul.ss-choices"
).first ().find ("input[type=radio][value='enlace de datos']");
questionLabel.prop ('checked', true);

var questionLabel   = $(
    "label.ss-q-title:contains('la forma que adopta una sección de datos en cualquier capa es:') ~ ul.ss-choices"
).first ().find ("input[type=radio][value='PDU']");
questionLabel.prop ('checked', true);

var questionLabel   = $(
    "label.ss-q-title:contains('el proceso por el cual los datos de la aplicación bajan por la pila de protocolos , agregando éstos información para que finalmente sean transmitidos por los medios de la red se denomina:') ~ ul.ss-choices"
).first ().find ("input[type=radio][value='encapsulación']");
questionLabel.prop ('checked', true);

var questionLabel   = $(
    "label.ss-q-title:contains('A la capa de red, ¿qué tres conceptos están asociados?') ~ ul.ss-choices"
).first ().find ("input[type=radio][value='paquetes, direccionamiento lógico y direcciones IP']");
questionLabel.prop ('checked', true);

var questionLabel   = $(
    "label.ss-q-title:contains('Contiene información de verificación de errores') ~ ul.ss-choices"
).first ().find ("input[type=radio][value='tráiler PDU']");
questionLabel.prop ('checked', true);

var questionLabel   = $(
    "label.ss-q-title:contains('La PDU que se transmite físicamente por los medios se denomina') ~ ul.ss-choices"
).first ().find ("input[type=radio][value='bits']");
questionLabel.prop ('checked', true);

var questionLabel   = $(
    "label.ss-q-title:contains('En el modelo OSI, representa la información a transferir entre los dos sistemas. Hablamos de la capa:') ~ ul.ss-choices"
).first ().find ("input[type=radio][value='presentación']");
questionLabel.prop ('checked', true);

var questionLabel   = $(
    "label.ss-q-title:contains('En el modelo OSI, permite la transmisión y recepción de unidades básicas de información (bits) sobre canales de transmisión, liberando a la capa superior de las funciones que imponga la naturaleza particular del medio de transmisión que se utilice. Hablamos de la capa:') ~ ul.ss-choices"
).first ().find ("input[type=radio][value='física']");
questionLabel.prop ('checked', true);

var questionLabel   = $(
    "label.ss-q-title:contains('La PDU de la capa de enlace de datos se denomina') ~ ul.ss-choices"
).first ().find ("input[type=radio][value='trama']");
questionLabel.prop ('checked', true);

var questionLabel   = $(
    "label.ss-q-title:contains('La PDU de la capa aplicación se denomina') ~ ul.ss-choices"
).first ().find ("input[type=radio][value='datos']");
questionLabel.prop ('checked', true);

var questionLabel   = $(
    "label.ss-q-title:contains('¿Qué protocolo de la capa de aplicación se utiliza comúnmente para la recepción de correo entre un cliente y un servidor?') ~ ul.ss-choices"
).first ().find ("input[type=radio][value='POP']");
questionLabel.prop ('checked', true);

var questionLabel   = $(
    "label.ss-q-title:contains('¿Qué dos tipos de software existen en la capa de aplicación?') ~ ul.ss-choices"
).first ().find ("input[type=radio][value='servicios y aplicaciones']");
questionLabel.prop ('checked', true);

var questionLabel   = $(
    "label.ss-q-title:contains('Los protocolos de la capa de aplicación se utilizan para:') ~ ul.ss-choices"
).first ().find ("input[type=radio][value='intercambiar los datos entre los programas que se ejecutan entre los host de origen y destino']");
questionLabel.prop ('checked', true);

var questionLabel   = $(
    "label.ss-q-title:contains('¿Cuáles son las ventajas de utilizar un modelo cliente-servidor?') ~ ul.ss-choices"
).first ().find ("input[type=radio][value='menor coste de aplicación y administración centralizada']");
questionLabel.prop ('checked', true);

var questionLabel   = $(
    "label.ss-q-title:contains('Cada programa ejecutable cargado en la memoria de un dispositivo se denomina') ~ ul.ss-choices"
).first ().find ("input[type=radio][value='proceso']");
questionLabel.prop ('checked', true);

var questionLabel   = $(
    "label.ss-q-title:contains('los programas que se comunican con la red y preparan los datos para la transferencia son los:') ~ ul.ss-choices"
).first ().find ("input[type=radio][value='servicios']");
questionLabel.prop ('checked', true);

var questionLabel   = $(
    "label.ss-q-title:contains('Telnet es un/a') ~ ul.ss-choices"
).first ().find ("input[type=radio][value='las dos anteriores son correctas']");
questionLabel.prop ('checked', true);

var questionLabel   = $(
    "label.ss-q-title:contains('¿Cuál es el servicio que traduce direcciones web en IP´s?') ~ ul.ss-choices"
).first ().find ("input[type=radio][value='DNS']");
questionLabel.prop ('checked', true);

var questionLabel   = $(
    "label.ss-q-title:contains('¿Qué 3 capas del modelo OSI integran la capa de aplicación del modelo TCP/IP?') ~ ul.ss-choices"
).first ().find ("input[type=radio][value='7,6,5']");
questionLabel.prop ('checked', true);

var questionLabel   = $(
    "label.ss-q-title:contains('La transferencia de archivos del cliente al servidor se denomina:') ~ ul.ss-choices"
).first ().find ("input[type=radio][value='upload']");
questionLabel.prop ('checked', true);

var questionLabel   = $(
    "label.ss-q-title:contains('¿Qué protocolos utilizan autenticación y encriptación entre los datos para asegurar los datos que se transportan entre el cliente y el servidor?') ~ ul.ss-choices"
).first ().find ("input[type=radio][value='HTTPS Y SSH']");
questionLabel.prop ('checked', true);

var questionLabel   = $(
    "label.ss-q-title:contains('¿Cuál es el dominio de primer nivel en http://www.educacion.navarra.es./formacion/index.html') ~ ul.ss-choices"
).first ().find ("input[type=radio][value='.es']");
questionLabel.prop ('checked', true);

var questionLabel   = $(
    "label.ss-q-title:contains('Queremos acceder a www.rtve.es y no podemos. Al escribir la dirección del servidor web en el explorador, la página se activa exitosamente. ¿Qué protocolo de la capa de aplicación es responsable de la falla?') ~ ul.ss-choices"
).first ().find ("input[type=radio][value='DNS']");
questionLabel.prop ('checked', true);

var questionLabel   = $(
    "label.ss-q-title:contains('¿Qué dos capas del modelo OSI corresponden a la capa de acceso de red del modelo TCP/IP?') ~ ul.ss-choices"
).first ().find ("input[type=radio][value='1 y 2']");
questionLabel.prop ('checked', true);

var questionLabel   = $(
    "label.ss-q-title:contains('¿Cuáles son dos propiedades en las solicitudes realizadas en redes peer to peer?') ~ ul.ss-choices"
).first ().find ("input[type=radio][value='es difícil implementar políticas de acceso y seguridad y un host puede ser a la vez cliente y servidor']");
questionLabel.prop ('checked', true);

var questionLabel   = $(
    "label.ss-q-title:contains('Elija la respuesta correcta') ~ ul.ss-choices"
).first ().find ("input[type=radio][value='Telnet proporciona una conexión virtual para el acceso remoto y HTTP transfiere datos desde un servidor web a un cliente']");
questionLabel.prop ('checked', true);

var questionLabel   = $(
    "label.ss-q-title:contains('¿Qué protocolo es usualmente utilizado para asignar dinámicamente una dirección IP a los dispositivos de un hogar conectado a Internet a través de un ISP?') ~ ul.ss-choices"
).first ().find ("input[type=radio][value='DHCTP']");
questionLabel.prop ('checked', true);

var questionLabel   = $(
    "label.ss-q-title:contains('En una sesión web, ¿qué puerto utiliza el servidor web para la conexión y transferencia de datos?') ~ ul.ss-choices"
).first ().find ("input[type=radio][value='80']");
questionLabel.prop ('checked', true);

var questionLabel   = $(
    "label.ss-q-title:contains('La aplicación FTP, utiliza en la capa de transporte dos puertos') ~ ul.ss-choices"
).first ().find ("input[type=radio][value='verdadero']");
questionLabel.prop ('checked', true);

var questionLabel   = $(
    "label.ss-q-title:contains('¿Qué protocolo de la capa de aplicación describe los servicios que se usan para compartir archivos en redes de Microsoft?') ~ ul.ss-choices"
).first ().find ("input[type=radio][value='SMB']");
questionLabel.prop ('checked', true);

var questionLabel   = $(
    "label.ss-q-title:contains('POP utiliza el puerto') ~ ul.ss-choices"
).first ().find ("input[type=radio][value='TCP en puerto 110']");
questionLabel.prop ('checked', true);

var questionLabel   = $(
    "label.ss-q-title:contains('¿Cuáles son dos características de los clientes en las redes de datos?') ~ ul.ss-choices"
).first ().find ("input[type=radio][value='puede cargar datos a los servidores e inician solicitudes de información']");
questionLabel.prop ('checked', true);

var questionLabel   = $(
    "label.ss-q-title:contains('DHCP está asociado con') ~ ul.ss-choices"
).first ().find ("input[type=radio][value='UDP puertos 67 y 68']");
questionLabel.prop ('checked', true);

var questionLabel   = $(
    "label.ss-q-title:contains('el comando nslookup') ~ ul.ss-choices"
).first ().find ("input[type=radio][value='permite que el usuario consulte de forma manual los servidores de nombres para resolver un nombre de un host dado']");
questionLabel.prop ('checked', true);

var questionLabel   = $(
    "label.ss-q-title:contains('las aplicaciones punto a punto pueden utilizarse en') ~ ul.ss-choices"
).first ().find ("input[type=radio][value='las dos anteriores son correctas']");
questionLabel.prop ('checked', true);

var questionLabel   = $(
    "label.ss-q-title:contains('Señala dos propósitos de la capa de transporte') ~ ul.ss-choices"
).first ().find ("input[type=radio][value='segmentación e identificación']");
questionLabel.prop ('checked', true);

var questionLabel   = $(
    "label.ss-q-title:contains('El término división de datos se asocia a:') ~ ul.ss-choices"
).first ().find ("input[type=radio][value='segmentación']");
questionLabel.prop ('checked', true);

var questionLabel   = $(
    "label.ss-q-title:contains('En el dispositivo origen, la capa de aplicación la numeramos con el 7. La capa de transporte tendrá el número') ~ ul.ss-choices"
).first ().find ("input[type=radio][value='4']");
questionLabel.prop ('checked', true);

var questionLabel   = $(
    "label.ss-q-title:contains('en las imágenes gráficas sobre redes, un paralepípedo con flechas en ambos sentidos identifica un:') ~ ul.ss-choices"
).first ().find ("input[type=radio][value='switch']");
questionLabel.prop ('checked', true);

var questionLabel   = $(
    "label.ss-q-title:contains('¿Qué es una PDU?') ~ ul.ss-choices"
).first ().find ("input[type=radio][value='la encapsulación específica de una capa']");
questionLabel.prop ('checked', true);

var questionLabel   = $(
    "label.ss-q-title:contains('¿Cuál de las siguientes opciones es la PDU de Capa 4 del Modelo OSI?') ~ ul.ss-choices"
).first ().find ("input[type=radio][value='segmento']");
questionLabel.prop ('checked', true);

var questionLabel   = $(
    "label.ss-q-title:contains('Seleccione la repuesta verdadera') ~ ul.ss-choices"
).first ().find ("input[type=radio][value='tcp reenvía datos perdidos y udp requiere menor carga']");
questionLabel.prop ('checked', true);

var questionLabel   = $(
    "label.ss-q-title:contains('La capa de transporte en el modelo OSI ¿entre que dos capas se encuentra?') ~ ul.ss-choices"
).first ().find ("input[type=radio][value='entre la 3 y la 5']");
questionLabel.prop ('checked', true);

var questionLabel   = $(
    "label.ss-q-title:contains('La capa de transporte en el modelo TCP/IP, entre dos capas se encuentra?') ~ ul.ss-choices"
).first ().find ("input[type=radio][value='entre la 2 y la 4']");
questionLabel.prop ('checked', true);

var questionLabel   = $(
    "label.ss-q-title:contains('Señale la respuesta verdadera') ~ ul.ss-choices"
).first ().find ("input[type=radio][value='la capa de transporte está orientada a la conexión y es confiable']");
questionLabel.prop ('checked', true);

var questionLabel   = $(
    "label.ss-q-title:contains('Señale la respuesta verdadera') ~ ul.ss-choices"
).first ().find ("input[type=radio][value='la capa de transporte entrega en el mismo orden y establece control de flujo']");
questionLabel.prop ('checked', true);

var questionLabel   = $(
    "label.ss-q-title:contains('asegurar que cada sección de datos que envía el origen llegue al destino significa:') ~ ul.ss-choices"
).first ().find ("input[type=radio][value='confiabilidad']");
questionLabel.prop ('checked', true);

var questionLabel   = $(
    "label.ss-q-title:contains('Indica el primer byte enviado en ese segmento. Hablamos de:') ~ ul.ss-choices"
).first ().find ("input[type=radio][value='en número de secuencia']");
questionLabel.prop ('checked', true);

var questionLabel   = $(
    "label.ss-q-title:contains('Señale dos aplicaciones que utilizan UDP') ~ ul.ss-choices"
).first ().find ("input[type=radio][value='DNS y VOIP']");
questionLabel.prop ('checked', true);

var questionLabel   = $(
    "label.ss-q-title:contains('Señale dos aplicaciones que utilizan TCP') ~ ul.ss-choices"
).first ().find ("input[type=radio][value='en blanco']");
questionLabel.prop ('checked', true);

var questionLabel   = $(
    "label.ss-q-title:contains('Elija la respuesta correcta') ~ ul.ss-choices"
).first ().find ("input[type=radio][value='un socket es una dirección IP más un puerto']");
questionLabel.prop ('checked', true);

var questionLabel   = $(
    "label.ss-q-title:contains('La pregunta ¿te han llegado los datos? se asocia a:') ~ ul.ss-choices"
).first ().find ("input[type=radio][value='la entrega confiable']");
questionLabel.prop ('checked', true);

var questionLabel   = $(
    "label.ss-q-title:contains('Un servidor de base de datos utilizará para gestionar sus consultas') ~ ul.ss-choices"
).first ().find ("input[type=radio][value='TCP']");
questionLabel.prop ('checked', true);

var questionLabel   = $(
    "label.ss-q-title:contains('seleccione la respuesta verdadera') ~ ul.ss-choices"
).first ().find ("input[type=radio][value='los procesos del servidor tienen números de puerto estáticos y los clientes número de puertos dinámicos']");
questionLabel.prop ('checked', true);

var questionLabel   = $(
    "label.ss-q-title:contains('El puerto de origen es') ~ ul.ss-choices"
).first ().find ("input[type=radio][value='mayor que 1023']");
questionLabel.prop ('checked', true);

var questionLabel   = $(
    "label.ss-q-title:contains('aplicaciones como HTTP, POP3, SMTP, TELNET, FTP utilizan') ~ ul.ss-choices"
).first ().find ("input[type=radio][value='puertos bien conocidos']");
questionLabel.prop ('checked', true);

var questionLabel   = $(
    "label.ss-q-title:contains('ACK es propio de') ~ ul.ss-choices"
).first ().find ("input[type=radio][value='TCP']");
questionLabel.prop ('checked', true);

var questionLabel   = $(
    "label.ss-q-title:contains('la base de la confiabilidad dentro de una sesión TCP es:') ~ ul.ss-choices"
).first ().find ("input[type=radio][value='el número de secuencia']");
questionLabel.prop ('checked', true);

var questionLabel   = $(
    "label.ss-q-title:contains('el identificador de puerto:') ~ ul.ss-choices"
).first ().find ("input[type=radio][value='las dos anteriores son correctas']");
questionLabel.prop ('checked', true);

var questionLabel   = $(
    "label.ss-q-title:contains('especifica la cantidad de datos que un origen puede transmitir antes de que se deba recibir un') ~ ul.ss-choices"
).first ().find ("input[type=radio][value='tamaño de la ventana']");
questionLabel.prop ('checked', true);

var questionLabel   = $(
    "label.ss-q-title:contains('La capa de red del modelo OSI') ~ ul.ss-choices"
).first ().find ("input[type=radio][value='Enruta los paquetes de acuerdo a una dirección de red única']");
questionLabel.prop ('checked', true);

var questionLabel   = $(
    "label.ss-q-title:contains('¿Cuáles de los siguientes protocolos proporciona servicios de capa de red sin conexión?') ~ ul.ss-choices"
).first ().find ("input[type=radio][value='IP']");
questionLabel.prop ('checked', true);

var questionLabel   = $(
    "label.ss-q-title:contains('La capa de red, utiliza cuatro procesos básicos: enrutamiento, encapsulación, desencapsulación y......') ~ ul.ss-choices"
).first ().find ("input[type=radio][value='direccionamiento']");
questionLabel.prop ('checked', true);

var questionLabel   = $(
    "label.ss-q-title:contains('¿Qué parte de una dirección de cada de red utiliza el router durante la determinación de ruta?') ~ ul.ss-choices"
).first ().find ("input[type=radio][value='la dirección de red']");
questionLabel.prop ('checked', true);

var questionLabel   = $(
    "label.ss-q-title:contains('¿Qué dispositivo de capa de red puede separar una red en diferentes dominios de broadcast?') ~ ul.ss-choices"
).first ().find ("input[type=radio][value='el router']");
questionLabel.prop ('checked', true);

var questionLabel   = $(
    "label.ss-q-title:contains('Seleccionar las rutas y dirigir los paquetes hacia su destino se conoce como') ~ ul.ss-choices"
).first ().find ("input[type=radio][value='enrutamiento']");
questionLabel.prop ('checked', true);

var questionLabel   = $(
    "label.ss-q-title:contains('Señale dos características de IPv4') ~ ul.ss-choices"
).first ().find ("input[type=radio][value='sin conexión e independiente de los medios']");
questionLabel.prop ('checked', true);

var questionLabel2   = $(
    "label.ss-q-title:contains('Señale dos características de IPv4') ~ ul.ss-choices"
).first ().find ("input[type=radio][value='sin conexión y mejor esfuerzo']");
questionLabel2.prop ('checked', true);

var questionLabel   = $(
    "label.ss-q-title:contains('En el host destino:') ~ ul.ss-choices"
).first ().find ("input[type=radio][value='los paquetes pueden que lleguen al host destino fuera de secuencia']");
questionLabel.prop ('checked', true);

var questionLabel   = $(
    "label.ss-q-title:contains('una característica implícita en IPv4 es') ~ ul.ss-choices"
).first ().find ("input[type=radio][value='menor sobrecarga, menos demora']");
questionLabel.prop ('checked', true);

var questionLabel   = $(
    "label.ss-q-title:contains('IP tiene capacidad para recuperar paquetes no entregados:') ~ ul.ss-choices"
).first ().find ("input[type=radio][value='falso']");
questionLabel.prop ('checked', true);

var questionLabel   = $(
    "label.ss-q-title:contains('MTU significa') ~ ul.ss-choices"
).first ().find ("input[type=radio][value='tamaño máximo de la PDU que cada medio puede transportar']");
questionLabel.prop ('checked', true);

var questionLabel   = $(
    "label.ss-q-title:contains('los routers tienen en cuenta en el enrutamiento') ~ ul.ss-choices"
).first ().find ("input[type=radio][value='el contenido del encabezado del paquete IP']");
questionLabel.prop ('checked', true);

var questionLabel   = $(
    "label.ss-q-title:contains('señale la respuesta correcta') ~ ul.ss-choices"
).first ().find ("input[type=radio][value='a capa de red comunica equipos y la capa de transporte comunica aplicaciones']");
questionLabel.prop ('checked', true);

var questionLabel   = $(
    "label.ss-q-title:contains('¿Qué campo del encabezado del paquete IPv4 identifica el orden en el cual ubicar el fragmento en el paquete en la reconstrucción?') ~ ul.ss-choices"
).first ().find ("input[type=radio][value='desplazamiento de fragmentos']");
questionLabel.prop ('checked', true);

var questionLabel   = $(
    "label.ss-q-title:contains('TTL...') ~ ul.ss-choices"
).first ().find ("input[type=radio][value='disminuye en uno en cada salto']");
questionLabel.prop ('checked', true);

var questionLabel   = $(
    "label.ss-q-title:contains('¿Qué campo del encabezado del paquete IP se utiliza para el control de errores?') ~ ul.ss-choices"
).first ().find ("input[type=radio][value='Checksum']");
questionLabel.prop ('checked', true);

var questionLabel   = $(
    "label.ss-q-title:contains('Indique entre otros los factores clave que se deben tener en cuenta al agrupar host en una red común') ~ ul.ss-choices"
).first ().find ("input[type=radio][value='Propósito y propiedad']");
questionLabel.prop ('checked', true);

var questionLabel   = $(
    "label.ss-q-title:contains('¿Qué información se agrega durante la encapsulación en la capa 3 del modelo OSI?') ~ ul.ss-choices"
).first ().find ("input[type=radio][value='Dirección IP de origen y destino']");
questionLabel.prop ('checked', true);

var questionLabel   = $(
    "label.ss-q-title:contains('¿Qué campo del paquete IP evita los bucles sin fin?') ~ ul.ss-choices"
).first ().find ("input[type=radio][value='TTL']");
questionLabel.prop ('checked', true);

var questionLabel   = $(
    "label.ss-q-title:contains('¿Qué porción de la dirección de la capa de red utiliza un router para reenviar paquetes?') ~ ul.ss-choices"
).first ().find ("input[type=radio][value='Porción de red']");
questionLabel.prop ('checked', true);

var questionLabel   = $(
    "label.ss-q-title:contains('Señale un componente de una entrada de la tabla de enrutamiento') ~ ul.ss-choices"
).first ().find ("input[type=radio][value='la dirección del siguiente salto']");
questionLabel.prop ('checked', true);

var questionLabel   = $(
    "label.ss-q-title:contains('Señale la respuesta correcta') ~ ul.ss-choices"
).first ().find ("input[type=radio][value='un broadcast es un mensaje desde un host hacia todos los otros hosts en la red. Así a una red concreta se la conoce como dominio de broadcast']");
questionLabel.prop ('checked', true);

var questionLabel   = $(
    "label.ss-q-title:contains('Señale que tres problemas comunes presenta una red de gran tamaño') ~ ul.ss-choices"
).first ().find ("input[type=radio][value='Degradada el rendimiento, problemas de seguridad e identificación del host']");
questionLabel.prop ('checked', true);

var questionLabel   = $(
    "label.ss-q-title:contains('Si la Gateway por defecto está mal configurada en el host, ¿cuál es el impacto en las comunicaciones?') ~ ul.ss-choices"
).first ().find ("input[type=radio][value='el host puede comunicarse con otros hosts en la red local pero no se puede comunicar con hosts de redes remotas']");
questionLabel.prop ('checked', true);