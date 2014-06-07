// ==UserScript==
// @name           Avatar Alliance Patch
// @description    Avatar Alliance Patch - enable fun and good times for friends, family and alliance members.
// @namespace      Ava
// @include        http://prodgame*.lordofultima.com/*/index.aspx*

// @run-at			document-end
// @version        1.0.0.2
// ==/UserScript==
//
function patchWrapper() {

	var updateManagerDts={
		'ALLIANCE': 8405,
		"WORLD": 1453,
		"PLAYER": 1321,
		"MAT": 1322,
		"QUEST": 5122,
		"COMO": 5121,
		"REPORT": 5121,
		"TIME": 512,
		"RESO": 3527,
		"VIS": 3527,
		"ALL_AT": 3311,
		"CHAT": 1
	};
	var __slipTime=0;
	var __elapsedTime=0;
	var __refTime=0;
	var __lastTime=0;
	var __scheduleTimeOffset=0;
			
	function avaPatchApply() {

		var _wup=webfrontend.net.UpdateManager.getInstance();

		webfrontend.data.ReportHeaderDataModel.prototype._loadRowData=function ( b,c ) {
			var _this=this;
			0>_this.getFolder()?_this._onRowDataLoaded( null ):( null==_this.getPlayerName()&&_this.setPlayerName( webfrontend.data.Player.getInstance().getName() ),
			webfrontend.net.CommandManager.getInstance().sendCommand( "ReportGetHeader",{
				sPlayerName: _this.getPlayerName(),
				city: _this.getCity(),
				start: b,
				end: c,
				sort: _this.getSortColumnIndex()-1,
				ascending: _this.isSortAscending(),
				mask: _this.getMask()
			},_this,function ( b,c ) { _this._onLoadRowDataCompleted( b,c&&c.length!=0?c:null ); } ) );
		}
		function hijackSendCommand() {

			
				function replaceOrderPart0(dat,_this, counter) {
					var city = webfrontend.data.City.getInstance();
					var unitOrders=city.getUnitOrders();
					if ( unitOrders ) {
						var m=dat.targetCity.match( /(\d{1,3}:\d{1,3})/ );
						var xy=m[0].split( ':' );
						var x=parseInt( xy[0] );
						var y=parseInt( xy[1] );
						var targetCityId=Math.floor( x )|( Math.floor( y )<<16 )
						// go in reverse in hopes that we can find the correct on to cancel.
						for ( var i=unitOrders.length;--i>=0 ; ) {
							var u=unitOrders[i];
							if ( u.city==targetCityId&&
								u.units[0].count==dat.units[0].c&&
								u.units[0].type==Number( dat.units[0].t )&&
								u.isDelayed ) {
								var ss=webfrontend.data.ServerTime.getInstance();
								var badTime=Number( ss.getStepTime( dat.timeReferenceType==2?u.start:u.end ) );
								var err=dat.referenceTimeUTCMillis-badTime;
								var now=new Date();
								var errOffset=dat.referenceTimeUTCMillis-ss.getStepTime( ss.getServerStep() );
								err-=Math.round( errOffset*__slipTime/__elapsedTime );
								console.log( "slip: "+errOffset/1000/60/60+" "+errOffset*__slipTime/__elapsedTime/1000/60 );
								if ( err<-36e5 ) {
									var w=webfrontend.net.CommandManager.getInstance();
									__scheduleTimeOffset=err;

									w.sendCommand( "CancelUnitOrder",{
										cityid: city.getId(),
										id: u.id,
										isDelayed: u.isDelayed
									},null,null );

									dat.referenceTimeUTCMillis+=err;
									var h=new qx.io.remote.Request( w.getCommandService()+"/Service.svc/ajaxEndpoint/OrderUnits","POST","application/json" );
									h.setProhibitCaching( !1 );
									h.setRequestHeader( "Content-Type","application/json" );
									h.setData( qx.lang.Json.stringify( dat ) );
									h.setTimeout( 10000 );
									var b2={
										obj: _this.obj,
										func: _this.func,
										context: _this.g,
										command: _this.b,
										isReplace: true
									};
									h.addListener( "completed",w.onCommandDone,b2 );
									h.addListener( "failed",w.onCommandFail,b2 );
									h.addListener( "timeout",w.onCommandTimeout,b2 );
									h.addListener( "aborted",w.onCommandAborted,b2 );
									h.send();
									webfrontend.net.UpdateManager.getInstance().pollNow( "CITY" );
									return;
								}
							}
						}
					}
					if ( counter > 5 )
						return;

					// retry until it shows up.
					setTimeout( replaceOrderPart0, 1000, dat, _this, counter+1 );
				}

				webfrontend.net.CommandManager.prototype.onCommandDone = function ( b ) {

					if ( /OrderUnits/i.test( this.command ) && !this.isReplace && __slipTime > 0.125 * __elapsedTime ) {
						var dat = qx.lang.Json.parse( b._target.$$user_data );
						var sendTime = dat.referenceTimeUTCMillis;
						if ( sendTime > 0  && (dat.timeReferenceType == 3)||(dat.timeReferenceType==2)) {
							//delay until the order shows up
							webfrontend.net.UpdateManager.getInstance().pollNow( "CITY" );
							setTimeout( replaceOrderPart0,1000, dat,this,0 );
						}
					}


					b = b.getContent();
					null != b && b.hasOwnProperty( "@u" ) ? ( webfrontend.net.UpdateManager.getInstance().dispatchUpdateData( b["@u"] ),
					null != this.func && this.func.call( this.obj, !0, b.r, this.context ) ) : null != this.func && this.func.call( this.obj, !0, b, this.context );

				}
			
		}
		function removeTime() {
			if ( webfrontend.data.ServerTime.getInstance().refTime>0 ) {
				console.warn( "removeConsumer" );
				webfrontend.net.UpdateManager.getInstance().removeConsumer( "TIME" );
				webfrontend.data.ServerTime.prototype.dispatchResults=function ( b ) {
					var curT=( new Date() ).getTime();
					var dRef=b.Ref-__refTime;
					var dt=curT-__lastTime;
					if ( __refTime ) {
						__slipTime+=dRef;
						__elapsedTime+=dt;
					}
					else {
					}
					this.refTime=b.Ref;
					__lastTime=curT;
					__refTime=b.Ref;
		//			console.error( "New server Time. Slip Rate: "+__slipTime*100/__elapsedTime+" Ref: "+b.Ref/1E3+"<-"+" thisSlip: "+dRef/dt+" total: "+__slipTime/1E3+" diff: "+this.diff+" server step "+this.getServerStep() );
		//			console.dir( b );
					//		this.refTime=b.Ref;
					this.stepTime=b.Step;
					this.diff=b.Diff;
					this.serverOffset=36E5*b.o;
				}
				webfrontend.net.UpdateManager.getInstance().addConsumer( "TIME",webfrontend.data.ServerTime.getInstance() );

				hijackSendCommand();


				webfrontend.data.ServerTime.prototype.getRequestDetails=function ( b ) {
					return (( new Date ).getTime() ).toString();
				}
			} else
				setTimeout( removeTime,1000 );
		}
		removeTime();
		function onStartUpdate() {
			var a=this.getUpdateService(),
				c=this.getInstanceGuid();

			var curT=( new Date ).getTime();
			if ( this.waitForResponse ) {
				if ( curT<this.requestSendTime+8000 ) {
					return;
				}
				else {
					// fall through
				}
			}

			var dt=curT-this.userActivityTime;;
			var d=this.getMaxPollSkip( dt );
			if ( this.pollSkip<d ) {
				this.pollSkip++;
				return;
			}

			this.requestSendTime=curT;
			this.waitForResponse=1;
			this.pollSkip=0;
			d=new qx.util.StringBuilder( 2048 );
			!0==this.userActivity&&( this.userActivity=!1,d.add( "UA:\f" ) );
			d.add( "TM:",this.lastPoolNetTime.toString(),",",this.lastProcessingTime.toString(),",",this.lastProcessingDetails,"\f" );
			for ( var e in this.requester ) {
				var f=this.requester[e];
				if ( curT>( f.nextUpdateTime||0 ) ) {
					f.nextUpdateTime=curT+( f.updateDt||0 );
					d.add( e,":",f.func.call( f.obj,this.requestCounter ),"\f" );
				}
			}
			e=new qx.util.StringBuilder( 2048 );
			e.add( '{"session":"',c,'","requestid":"',this.requestCounter,'","requests":',JSON.stringify( d.get() ),"}" );
			this.requestCounter++;
			a=new qx.io.remote.Request( a+"/Service.svc/ajaxEndpoint/Poll","POST","application/json" );
			a.setProhibitCaching( !1 );
			a.setRequestHeader( "Content-Type","application/json" );
			a.setData( e.get() );
			a.setTimeout( 1E4 );
			a.addListener( "completed",this.completeRequest,this );
			a.addListener( "failed",this.failRequest,this );
			a.addListener( "timeout",this.timeoutRequest,this );
			a.send();
		}
		console.debug( "Replaced Update" );

		webfrontend.net.UpdateManager.prototype.onStartUpdate=onStartUpdate.bind( _wup )
		webfrontend.net.UpdateManager.prototype.pollNow=function ( a ) {
			if ( a ) {
				var f=this.requester[a];
				f.nextUpdateTime=0;
			}
			this.pollSkip=1024;
			onStartUpdate.call( this );
		};

		function setUpdates() {
			for ( var a in updateManagerDts ) {
				if ( _wup.requester[a] )
					_wup.requester[a].updateDt=updateManagerDts[a];
			}
		}
		var getPollSkip=function ( idleTime ) {
			if ( idleTime<500 ) return 0; // if it is this low we may be over taxed
			if ( idleTime<1000 ) return 0;
			if ( idleTime<2000 ) return 0;
			if ( idleTime<15000 ) return 1;
			if ( idleTime<30000 ) return 2;// if more than 10 seconds, reduce bandwidth.  Hope that this does not hurt chat 
			if ( idleTime<60000 ) return 3;// if more than 10 seconds, reduce bandwidth.  Hope that this does not hurt chat 

			return 4;
		};
		var oldTimer=_wup.timer;
		_wup.timer=new qx.event.Timer( 979 );
		oldTimer.stop();
		webfrontend.net.UpdateManager.prototype.getMaxPollSkip=getPollSkip;
		_wup.timer.addListener( "interval",onStartUpdate.bind( _wup ),_wup );
		oldTimer.dispose();
		_wup.timer.start();
		setUpdates();
		setTimeout( setUpdates,20*1000 );
		setTimeout( setUpdates,120*1000 );
	}


	( function loadWhenReady() {
		if ( typeof qx!='undefined'&&
			typeof webfrontend!='undefined'&&
			 typeof webfrontend.net!='undefined'&&
			 typeof webfrontend.net.UpdateManager!='undefined'&&
			 typeof webfrontend.net.CommandManager!='undefined'&&
			typeof webfrontend.data!='undefined'&&
			typeof webfrontend.data.ReportHeaderDataModel!='undefined'
		   ) {
			avaPatchApply();
			return;
		}
		setTimeout( loadWhenReady,1000 );
	} )();
}

( function () {

	console.warn( 'Injecting fun fun fun script' );

	var pre=document.createElement( "script" );
	pre.innerHTML="("+patchWrapper.toString()+")();";
	pre.type="text/javascript";
	( document.getElementsByTagName( 'HEAD' )[0]||document.getElementsByTagName( 'BODY' )[0] ).appendChild( pre );

} )();