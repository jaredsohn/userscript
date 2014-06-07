// ==UserScript==
// @name           LM Hack
// @description    Mind bekaphatjátok
// @include        http://w8.hithere.com/*
// @require        
// ==/UserScript==


/**
*	author				Saber
*	time				09-10-14
*	describe#
**/

/**
	VIEW
	this class is view of luck.	function is handle jsp Dom elements.
**/
var luckView = (function(){
	
	var _controller = new LuckController();
	
	
	//============= method line =================
	
	/**
	*	When close luck window call this method.
	*	view call controller , controller call model.
	**/
	var _destroyHandler = function () {
		_controller.destroyHandler();
		_controller = null;
	};
	
	/**
	*	updata ImageList in window.
	*	imageList is Array => image's url
	**/
	var _updataImageList = function ( imageList ) {
		var id_str = "#luck_td_";
		var img;
		var src;
		for ( var i = 0 ; i < 12; i++ ) {
			img = $( id_str + i ).find('img')[0];
			if ( img ) {
				img.src = "images/items/"+imageList[i].image;
				img.width = 48;
				img.height = 48;
				img.title = imageList[i].desc;
			}else{
				img = document.createElement("img");
				img.width = 48;
				img.height = 48;
				img.title = imageList[i].desc;
				img.src = "images/items/"+imageList[i].image;
				document.getElementById( "luck_td_"+i ).appendChild( img );
			} // end if;
		} // end loop
	};
	
	/**
	*	update expend . word and image ( gold or zs )
	*	num 
	*	type 1 ---> gold
	*	isenough -- 0 , 1 exchange boolean. When false add color red on #expend.
	**/
	var _updateExpend = function ( num , type , isenough , zpj_type , zpj_amount , zpj_name ) {
		//alert( "88888888" );
		var src = document.getElementById( "expend_img" ).src;

		if ( type == 1 ) {
			document.getElementById( "expend_img" ).src = 'images/ico_res_coin.gif';
		}else{
			document.getElementById( "expend_img" ).src = 'images/ico_zs.gif';	
		} // end if
		
		if ( !isenough ) {
			$("#expend").addClass( "t_red" );
		}else{
			$("#expend").addClass( "t_red" ); // =======================================>
		}
		$("#expend").text( num );
		
		// zpj =======2010-1-18
		if ( zpj_type != -1 ) {
			$("#zpj_li").show();
			//alert( "display===" + $("#select_space").css( "display" ) );
			//alert(document.getElementById( "select_space" ).id);
			document.getElementById( "zpj_img" ).src = "images/luck/"+zpj_type+".gif";
			$("#zpj_num").text( "(" + zpj_name + zpj_amount + ")" );
			//zpj is enough? =============
			//alert( "aaaaaa" );
			if ( zpj_amount <= 0 ) {
				document.getElementById( "baoshi_radio" ).disabled = false;
				document.getElementById( "zpj_radio" ).checked = true; // ========================== >
				$("#zpj_num").addClass( "t_red" );
				//alert( "bbbbbbbb" );
			}else{
				document.getElementById( "zpj_radio" ).checked = true;
				document.getElementById( "zpj_radio" ).disabled = false;
				$("#zpj_num").removeClass( "t_red" );
				//alert( "ccccccccccccc" );
			}
			//zpj is enough? =============
		}else{
			//$("#zpj_li").css( "visibility" , "hidden" )
			$("#zpj_li").show(); // ==================================================== >
			$("#baoshi_li").show();
			document.getElementById( "baoshi_radio" ).checked = true;
		}
		
	};
	
	/**
	*	update button. In this method , we check button condtion.
	*	1. check level == super. ( refresh is forever );
	**/
	var _updateButton = function ( imageDataObj ) {
		if ( imageDataObj.sys.canfresh ) { // 能刷新,所以是要出现两个按钮的情况.
			
			$( "#refresh_td" ).show();
			$( "#refresh_img" ).show();
			$( "#gamebtn_td" ).show();
			$( "#getitem_td" ).show(); // ======================================= >
			
			if ( imageDataObj.sys.canRun ) { // 能刷新,又能转
				if ( imageDataObj.canplay && imageDataObj.isenough ) {  // 能刷新,能转,TMD还能玩
					document.getElementById( "game_btn" ).src = "images/luck/lp_but_start.gif"; =========== >
				}else{ // 能刷新,能转,不能玩
					document.getElementById( "game_btn" ).src = "images/luck/start.jpg";
				} // end if
			}else{	// 能刷新,但是不能转
				document.getElementById( "game_btn" ).src = "images/luck/get_gift.gif";
			} // end if
		}else{ // 不能刷新的情况
			if ( imageDataObj.sys.canRun ) {  // 不能刷新,但是能转
				
				$( "#refresh_img" ).hide();
				if ( imageDataObj.canplay && imageDataObj.isenough ) {  // 不能刷新,能转,还能玩
					document.getElementById( "game_btn" ).src = "images/luck/lp_but_start.gif";
				}else{ // 不能刷新,能转,不能玩
					document.getElementById( "game_btn" ).src = "images/luck/lp_but_start.gif";
				} // end if
				
			}else{	// 不能刷新,也不能转,一个按钮的情况
				
				$( "#refresh_td" ).show();
				$( "#gamebtn_td" ).show();
				$( "#getitem_td" ).show();
			
			}
		} // end if*/

	};
	
	/**
	*	update totaltimes.
	**/
	var _updateTotal = function (  dataObj ) {
		var element = document.getElementById( "jishuqi" );
		//alert( dataObj.totaltimes );
		if ( dataObj.totaltimes == -1 ) {
			element.style.display = "inline";
		}else{
			$("#current_num").html(""+dataObj.todaytimes);
			$("#total_num").html(""+dataObj.totaltimes);
			element.style.display = "inline";	
		}
	};
	
	var _updateWheelInfo = function ( id ) {
		$("p.wheelinfo").each( function(i){
			$(this).hide();
		} );
		document.getElementById( "condition"+id).style.display = "inline";
	}
	
	var publicObj = {
		
		init : function () {
			_controller.init( this );
			_controller.addEventHandler();
		},
		
		/**
		*	system data insert
		*	arr
		*	id  => wheelId
		**/
		setDataArr : function ( arr , id ) {
			if ( _controller == null ){
				_controller = new LuckController();
			}
			_controller.setDataArr( arr , id );
		},
		
		/**
		*	jsp button call this method. get server return Html
		**/
		loadWindow : function () {
			$("#luck").load( "luckwheel.do" , null , function (){
				//$("#luck").css('z-index' , '10000').show();
				_controller.getData( "first" );
			});	
		},
		
		/**
		*	Close luck window . clear all data or prototype.
		**/
		close : function () {
			_destroyHandler();
			$("#luck").empty().hide();
			util.unblock();
		},
		
		/**
		*
		**/
		resetButton : function () {
			if ( document.getElementById( "refresh_btn" ) ){ document.getElementById( "refresh_btn" ).src = "images/luck/lp_but_ref.gif" }
			if ( document.getElementById( "game_btn" ) ){ document.getElementById( "game_btn" ).src = "images/luck/lp_but_start.gif" }
		},
		
		/**
		*	public
		*	refresh image , infomation , expend.
		**/
		updateWindow : function ( dataObj ) {
			_updataImageList( dataObj.wheels );
			_updateExpend( dataObj.fee , dataObj.feetype , dataObj.isenough , dataObj.ci , dataObj.cia , dataObj.cin );
			_updateButton( dataObj );
			_updateTotal( dataObj );
		},
		
		updateWheelInfo : function ( id ) {
			_updateWheelInfo( id );
		},
		
		updateTotal : function ( dataObj ) {
			_updateTotal( dataObj );
		}
		
	};
	
	return publicObj;
})();

/************************************************ VIEW END *****************************************************************/



/**
	CONTROLLER
	this class is controller of luck. Function is addEvent of jsp Dom element
**/
function LuckController () {
	
	var _view;
	var _model = new LuckModel( );
	var _isAnimation; // Maybe category is true or false;
	var _condition = "finished";	// luck's condition. Maybe value is finished , move , stopping.
	var _command;
	var _wheelId;

	//=============== method line =================
	
	/**
	*	delete prototype GC.
	**/
	var _destroyHandler = function () {
		_model.destroyHandler();
		_command.destroyHandler();
		_removeEventHandler();
		_command = null;
		_view = null;
		_model = null;
	};
	
	var _addEventHandler = function () {
		$("#close").click( function(){ _view.close();return false;});
		$("#exit").click( function() { _view.close();return false;});
		if ( document.getElementById("refresh") ) { $("#refresh").click( function(){ _refreshBtnClickHandler();return false;}); }
		if ( document.getElementById("get_item") ) { $("#get_item").click( function(){ _getItemBtnClickHandler();return true;}); }
		if ( document.getElementById("game_btn") ) { $("#game_btn").click( function(){ _gameBtnClickHandler();return true; }); }
		
		//var length = document.getElementById( "lp_tbut" ).rows[0].cells.length;
		var data = _model.getDataObjArr();
		var length = data.length;
		for ( var n in data ) {
			$("#"+n).click(function(){
				_changePart( this.id );
			});
		}
	};
	
	/** need with GC. remove all Dom Element Event **/
	var _removeEventHandler = function () {
		$("#close").unbind();
		$("#eixt").unbind();
		if ( document.getElementById("refresh") ) { $("#refresh").unbind(); }
		if ( document.getElementById("get_item") ) { $("#get_item").unbind(); }
		if ( document.getElementById("game_btn") ) { $("#game_btn").unbind(); }
		//============
		var data = _model.getDataObjArr();
		var length = data.length;
		for ( var n in data ) {
			$("#"+n).unbind();
		}
	};
	
	/**
	*	enter this method , wheel can run.
	**/
	var _gameBtnClickHandler = function () {
		if ( _condition == "finished" || _condition == "move" ) {
			var canplay = _model.getDataById( _wheelId ).canplay;
			var enough = _model.getDataById( _wheelId ).isenough;
			var zpj = document.getElementById("zpj_radio").checked;
			//if (  ( canplay && enough ) || zpj ) {
			if ( canplay ){
				if ( enough || zpj ) {
					switch( _condition ) {
						case "finished" :
							_command.execute( {type:"start"} );
							break;
						case "move" :
							publicObj.getData( "stop" );
							_command.execute( {type:"stop"} );
							break;
						default :
							alert( _condition );
					}// end switch
				} //end if
			} // end if
		} // _condition end if
	};
	
	/**
	* this method don't run.
	**/
	var _getItemBtnClickHandler = function () {
		
		_command.execute();
		
	};
	
	/**
	*	
	**/
	var _refreshBtnClickHandler = function () {
		if ( _condition == "finished" ) {
			var dataObj = _model.getDataById( _wheelId );
			var info = top.getValue("luck_refresh_info1")+" "+dataObj.resetcost+top.getValue("luck_refresh_info2");
			util.windowAlert( info , function ( ok ) {
				if ( ok ) publicObj.getData( "refresh" );
			} ).setMode( true );
		}
	};
	
	/**
	*	change part or change level.
	*	id type is String;
	*		# ZP1... etc.
	**/
	var _changePart = function ( id ) {
		if ( _condition == "finished" ) {
			//var dataObj = _model.getDataById( id );
			//_isAnimation = dataObj.sys.canRun;
			_wheelId = id;
			
			//_commandFactory();
			//_view.updateWindow( dataObj );
			_view.updateWheelInfo( id );
			//_view.updateTotal( dataObj );
			
			_model.getData( "switch" , _wheelId );
			util.block();
			
		}
	};
	
	/**
	*	command factory.
	*	static method , maybe...
	**/
	var _commandFactory = function () {
		if ( _command != null ) _command.destroyHandler();
		//alert( "_isAnimation :" + _isAnimation );
		if ( _isAnimation ) {
			_command = new RunGameCommand( publicObj );
		}else{
			_command = new NotRunGameCommand( publicObj );
		}// end if
	};
	
	
	
	var publicObj = {
		
		init : function ( view ) {
			_view = view;
			_model.init( this );
			_commandFactory();
		},
		
		/**
		*	add Dom Event
		**/
		addEventHandler : function () {
			_addEventHandler();
		},
		
		/**
		*	Interface
		*	When close luck window delete prototype, View call private method _destroyhandler;
		**/
		destroyHandler : function () {
			_destroyHandler();
		},
		
		/**
		*	
		**/
		finishHandler : function () {	
			var imageDataObj = _model.getDataById( _wheelId );
			_view.resetButton();
			_view.updateWindow( imageDataObj );
			if(document.getElementById( "refresh_img" )) document.getElementById( "refresh_img" ).src = "images/luck/lp_but_ref.gif";
		},
		
		setDataArr : function ( arr , id ) {
			_model.setDataArr( arr );
			_wheelId = id;
			_isAnimation = arr[ _wheelId ].canRun;
		},
		
		/**
		*	set _condition value.
		*	Maybe Command call this method
		*	_condition control button in luck 
		**/
		setCondition : function ( state ) {
			_condition = state;	
		},
		
		/**
		*	get Model.
		**/
		getModel : function () {
			return _model;
		},
		
		/**
		*	data type .... {op :first , refresh , stop , act:}.
		**/
		getData : function ( dataType ) {
			_model.getData( dataType , _wheelId );
		},
		
		/**
		*	alert getData method.
		*	Maybe op value is refresh , stop , first.
		**/
		onDataHandler : function ( json , imageDataObj ) {
			switch( json.op ) {
				case "stop" :
					_command.commandOver( json );
					break;
				case "first" :
					$("#luck").css('z-index' , '1000').show();
					break;
				case "refresh" :
					break;
				case "switch" :
					_isAnimation = imageDataObj.sys.canRun;
					_commandFactory();
					break;
				default:
					alert( json.op );
			}
			if ( json.op != "stop" ) {
				_view.updateWindow( imageDataObj );
			}
			util.unblock();
		},
		
		onDataErrHandler : function () {
			_command.clearCommand();
			this.setCondition( "finished" );
			util.unblock();
		}
		
	};
	
	return publicObj;
}

/*************************************************  CONTROLLER END ******************************************************/


/**
	MODEL
	this class is model of luck , function is load and catch server data ( catch image data );
**/

function LuckModel ( ) {
	
	var _controller;
	
	var _currentLevel;
	var _dataObjArr;
	
	
	/**
	*	delete prototype GC.
	**/
	var _destroyHandler = function () {
		_controller = null;
	};
	
	/**
	*	get server data;
	*	1.When init jsp. data argument is null.
	*	2.When get item.
	*	3.When refresh.
	*	Maybe data argument of type is Object . Format is { act : 2 , op : "stop" };
	*											# act's meaning is level. ( _currentLevel );
	*											# op's meaning is type. Maybe value are stop or refresh or first;
	**/
	var _getData = function ( type , id , cit ) {
		
		var url = "luckwheel.do?op="+type+"&act="+id;
		if ( document.getElementById("zpj_radio").checked ){
			url = "luckwheel.do?op="+type+"&act="+id+"&cit=1";
		}else{
			url = "luckwheel.do?op="+type+"&act="+id+"&cit=0";
		}
		util.AjaxPostJsonF( url , null , 
			function ( json ){ 
				// success method
				var act = json.act;
				var sys;
				//var wheels = json[act];
				for ( var n in _dataObjArr ) {
					if ( json.op == "first" ){
						sys = _dataObjArr[ n ];  // jsp bottom js insert value;
					}else{
						sys = _dataObjArr[ n ].sys;
					} // end if;
					
					var obj = json[ n ];
					obj.sys = sys;
					_dataObjArr[ n ] = null;
					_dataObjArr[ n ] = obj;
				}
				
				var system = {
					canplay : json[act].canplay,
					bonus : json.bonus,
					pos : json.pos,
					//message : json.message,
					op : json.op
				};
				_controller.onDataHandler( system , _dataObjArr[ json.act ] );
				top.update();
				
			},
			function ( json ){
				//  error method
				util.windowAlert( json.message ).setMode( true );
				_controller.onDataErrHandler()
			}
		); //  end util.AjaxPostJsonF;
		
		
	};
	
	var _catchImage = function () {
		
	};
	
	var publicObj = {
		
		init : function ( c ) {
			_controller = c;
		},
		
		/**
		*	Interface
		*	When close luck window delete prototype, Controller call private method _destroyhandler;
		**/
		destroyHandler : function () {
			_destroyHandler();
		},
		
		/**
		*	Interface
		*	Public get server data method. 
		*	data's type is Object. Detail => _getData() private method.
		**/
		getData : function ( data , id ) {
			_getData( data , id );
		},
		
		/**
		*	id type is String. value is wheelID
		**/
		getDataById : function ( id ) {
			return _dataObjArr[ id ];
		},
		
		setDataArr : function ( arr ) {
			_dataObjArr = arr;
		},
		
		getDataObjArr : function () {
			return _dataObjArr;
		}
		
		
	};
	
	return publicObj;
}

/******************************* MODEL END *********************************/



/******************************* COMMAND   *********************************/

/**
*	this class is when language is Chinses call of command
*	class funtion rotation border...SB.
**/
function RunGameCommand ( c ) {
	
	var _controller = c;
	var _animationTimer = null;
	var _currentId = 0;
	var _targetId = null; // get value for server
	var _idStr = "#luck_td_";
	var _animationCondition = "finished";  //see controller _condition;
	var _outSemicircle = false;
	var _dataObj;
	
	// ================= method split line  ======================
	
	var _destroyHandler = function () {
		_clearCommand();
		_controller = null;
	};
	
	var _clearCommand = function () {
		clearTimeout( _animationTimer );
		_currentId = 0;
		_dataObj = null;
		_targetId = null;
		_outSemicircle = false;
		_animationCondition = "finished";
		_animationTimer = null;
	};
	
	var _rotationHandler = function () {
		var currentNode = $( _idStr + _currentId ); //current note
		var nextNode;
		var step; // distance
		
		_currentId++;
		_currentId = _currentId > 11 ? 0 : _currentId;
		nextNode = $( _idStr + _currentId );
		currentNode.removeClass( 'active' ).addClass( 'un' ); // animation 1
		nextNode.removeClass( 'un' ).addClass( 'active' ); // animation 2
		if ( _animationCondition == "stopping" && _targetId != null ) {   // _targetId != null => get server data complete.
			if ( _currentId < _targetId ) {
				step = _targetId - _currentId;
			}else{
				step = 12 - _currentId + _targetId;
			} // end if
			
			if ( step > 6 ) { // out semicircle
				_outSemicircle = true;
			}else{ // in semicircle
				_outSemicircle = false;
			} // end if
			
			// =========================
			if ( _currentId == _targetId ) {
				//alert( "_currentId :" + _currentId + "  _targetId : " + _targetId );
				clearTimeout( _animationTimer );
				util.windowAlert( _dataObj.bonus , function ( ok ) {
					nextNode.removeClass( 'active' ).addClass( 'un' );
					$( "#luck_td_0" ).removeClass( 'un' ).addClass( 'active' );
					_targetId = null;
					_dataObj = null;
					_currentId = 0;
					_controller.setCondition( "finished" );
					_controller.finishHandler();
				}).setMode( true ).clearNO();
				return;
			}
			
		} // end if
		
		_animationTimer = window.setTimeout( _rotationHandler , 50 );
	};
	
	var publicObj = {
		
		/**
		*	Interface
		*	execute two type command . start rotation and stop to finish.
		*	eventObj => maybe have prototype { type , value1 , value2....... } . type 1 start( start rotation ); 2 stop ( get item );
		**/
		execute : function ( eventObj ) {
			
			switch( eventObj.type ) {
				case "start" :
					if(document.getElementById( "game_btn" )) document.getElementById( "game_btn" ).src = "images/luck/lp_but_stop.gif";
					if(document.getElementById( "refresh_img" )) document.getElementById( "refresh_img" ).src = "images/luck/shuaxin.jpg";
					_animationCondition = "move";
					_controller.setCondition( "move" );
					_rotationHandler();
					break;
				case "stop" :
					util.block( true );
					_animationCondition = "stopping";
					_controller.setCondition( "stopping" );
					if(document.getElementById( "game_btn" )) document.getElementById( "game_btn" ).src = "images/luck/stop.jpg";
					break;
				default :
					alert( eventObj.type );
			}
			
		},
		
		/**
		*	getData -> model.getData -> onDataHandler -> commandOver
		**/
		commandOver : function ( dataObj ) {
			//alert( dataObj.pos );
			_targetId = dataObj.pos;
			_dataObj = dataObj;
		},
		
		/**
		*	call _destroyHandler method
		**/
		destroyHandler : function () {
			_destroyHandler();
		},
		
		/****/
		clearCommand : function () {
			_clearCommand();
		}
		
	};
	
	return publicObj;
}

// =====================================================

function NotRunGameCommand ( c ) {
	
	var _controller = c;
	
	// ================= method split line  ======================
	
	var _destoryHandler = function () {
		_controller = null;
	};
	
	var _clearCommand = function () {
	
	};
	
	var publicObj = {
		
		/**
		*	Interface
		*	Chinese version , haven't animation.
		*	getData -> model.getData -> onDataHandler -> commandOver
		**/
		execute : function ( eventObj ) {
			_controller.getData( "stop" );
		},
		
		/**
		*	Interface
		**/
		commandOver : function ( dataObj ) {
			//util.block( true );
			util.windowAlert( dataObj.bonus , function ( ok ) {
				_controller.finishHandler();
			}).setMode( true ).clearNO();
			return;
		},
		
		/**
		*	call _destroyHandler method
		**/
		destroyHandler : function () {
		},
		
		clearCommand : function () {
			_clearCommand();
		}
		
	};
	
	return publicObj;
}