// 28/08/2016 @ 17:42
function JSPlus () { }

var _jspProto =
	Object.defineProperties( JSPlus.prototype, { _name: { value: '_jspProto' } } )

var jsp = _jspProto


/* ***** isString *** */

_jspProto.isString = function jsp$isString ( any )
{
	return ( ( typeof( any ) === 'string' ) || ( any instanceof String ) )
}


/* ***** isNumber *** */

_jspProto.isNumber = function jsp$isNumber ( any )
{
	return ( ( typeof( any ) === 'number' ) || ( any instanceof Number ) )
}


/* ***** _console ***
:
_console allows us to change the 'this' for methods such as 'error' and 'log' between console aind _jdProp.
@return console, but it can be changed to js, to use the jsp error, log, warn, etc methods
*/

_jspProto._console = function jsp$_console () { return console }


/* ***** _error$ *** */

/*
_error$ allows us to change the method used in messages from 'error', 'warn', 'info', 'log', etc.
@return normally returns 'error'
*/

_jspProto._error$ = 'error'


/* ***** message *** */

_jspProto.error =
	function jsp$error ( fnName$, err$, objct, prprty )
	{
		var msg = fnName$ + ': ' + err$ + '; prprty = ' + prprty + ', objct ='
		console[ this._error$ ]( msg, objct )
		this._break( msg, objct )
	}


/* ***** _break *** */
/*
Immediately stops the program. Upon resumption from debugger, unwinds the stack.
*/

_jspProto._break = function jsp$_break ( msg, objct )
{
	if ( this._error$ === 'error' )
	{
		debugger
		throw [ jsp$_break.name, msg, objct ]
	}
}


/* ***** _loadScript *** */



/*
Loads the script defined by src_strng, if it has not already been loaded.
:
· document.domain must === 'localhost'
· Taken  from the JavaScript Pocket Guide, p110. See also labs.js.com
repeat_: means write another script tag for the same file
*/

_jspProto._loadScript = function jsp$_loadScript ( src_strng, repeat_ )
{
	// if ( document.domain === 'localhost' ) {
	var scrpts = document.getElementsByTagName( 'script' )

	// TODO: add '/' after document.domain only if needed
	var fullSrc_strng = //'http://' + document.domain +
		src_strng

	if ( ( ! this._isScriptLoaded( scrpts, [ 'src' ], fullSrc_strng ) ) || repeat_ )
	{
		var elmnt = document.createElement( 'script' )
		elmnt.type = 'text/javascript'
		elmnt.src = fullSrc_strng
		elmnt.onload = this._scriptLoaded
		var head = document.head ||
			document.getElementsByTagName( 'head' )[ 0 ] // document.head not in MSIE 8.
		head.appendChild( elmnt )
	}
}


/* ***** _scriptLoaded *** */

_jspProto._scriptLoaded = function jsp$_scriptLoaded ( /* evnt */ )
{
}

/* ***** _isScriptLoaded *** */

_jspProto._isScriptLoaded = function jsp$_isScriptLoaded ( scrpts, prprtys, src_strng )
{
	var scrptsLngth = scrpts.length
	var prprtysLngth = prprtys.length
	for ( var scrptsIndx = 0; scrptsIndx < scrptsLngth; scrptsIndx ++ )
	{
		var scrpt = scrpts[ scrptsIndx ]
		var src
		for ( var prprytsIndx = 0; prprytsIndx < prprtysLngth; prprytsIndx ++ )
		{
			var prprty = prprtys[ prprytsIndx ]
			src = scrpt[ prprty ]
		}
		if ( src === src_strng )
		{ return true }
	}
	return false
}


/* ***** ensurePackage ***
:
Inserts an empty object into supr_pckg.name if therre is not one already there.
*/

_jspProto.ensure_pckg = function jsp$ensure_pckg ( supr_pckg, name )
{
	if ( ! supr_pckg[ name ] )
	{ supr_pckg[ name ] = {}; }
	return supr_pckg[ name ]
}


/* ***** _test_ary ***
:
Creates an array of ascending numbers from first_num to last_num
*/

_jspProto._test_ary = function jsp$_test_ary ( first_num, last_num )
{
	var ary = []
	for ( var num = first_num; num <= last_num; num ++ )
	{ ary.push( num ) }
	return ary
}
/* ***** isNaN ***
:
· Returns true if vlu_ is NaN
· Note that (NaN === NaN) is false !!!
· Also note that !NaN is true and NaN is false
*/

_jspProto.isNaN = function jsp$isNaN ( vlu_ )
{
	if ( Number.isNaN ) // use the builtin function if it exists
	{ return Number.isNaN( vlu_ ) }

	// else, if vlu_ is falsey, but it is none of the other falsey values, it must be NaN
	return ! vlu_ &&
		vlu_ !== null && vlu_ !== undefined && vlu_ !== false && vlu_ !== '' && vlu_ !== 0
}


/* ***** _isAValue ***
:
· Returns false if vlu_ is undefined, null, or NaN.
*/

_jspProto._isAValue = function jsp$_isAValue ( vlu_ )
{
	return ! this._isNotAValue( vlu_ )
}


/* ***** isAValue ***
:
· Returns false if vlu_ is undefined, null, or NaN.
· Programmers may choose to override this method by subclassing.
*/

_jspProto.isAValue = function jsp$isAValue ( vlu_ )
{
	return ! this.isNotAValue( vlu_ )
}


/* ***** _isNotAValue ***
:
· Returns true if vlu_ is undefined, null, or NaN.
*/

_jspProto._isNotAValue = function jsp$_isNotAValue ( vlu_ )
{
	return ( vlu_ === undefined ) || this.isNaN( vlu_ ) || ( vlu_ === null )
}


/* ***** isNotAValue ***
:
· Returns true if vlu_ is undefined, null, or NaN.
· Programmers may choose to override this method by subclassing.
*/

_jspProto.isNotAValue = function jsp$isNotAValue ( vlu_ )
{
	return this._isNotAValue( vlu_ )
}

_jspProto.isNotAValue.testFn = function isNotAValue$testFn ()
{ // All of these should return true.
	console.assert( jsp.isNotAValue( undefined ) )
	console.assert( jsp.isNotAValue( null ) )
	console.assert( jsp.isNotAValue( NaN ) )
	console.assert( jsp.isNotAValue( 0 ) === false )
	console.assert( jsp.isNotAValue( '' ) === false )
	console.assert( jsp.isNotAValue( [] ) === false )
}


/* ***** get_vlu ***
:
· Returns the value found in objct.prprty.
· Breaks & returns undefined if the property does not exist.
· Breaks & returns undefined if the returned value isNotAValue.
*/

_jspProto.get_vlu = function jsp$get_vlu ( objct, prprty )
{
	if ( this._isProperty_ok( objct, prprty, jsp$get_vlu ) )
	{
		var vlu = objct[ prprty ]
		if ( this._isValue_ok( vlu, { o: objct, p: prprty } ) )
		{ return vlu }
		else // bad value
		{ return null }
	}
	else // no property
	{ return undefined }
}


/* ***** get_vlu_ ***
:
· Returns the value found in objct.prprty.
· Breaks & returns undefined if the property does not exist.
· Does not break if vlu_ isNotAValue.
*/

_jspProto.get_vlu_ = function jsp$get_vlu_ ( objct, prprty )
{
	if ( this._isProperty_ok( objct, prprty, jsp$get_vlu_ ) )
	{ return objct[ prprty ] }
	else // no property
	{ return undefined }
}


/* ***** set_vlu ***
:
· Sets objct.prprty = vlu. Normally returns vlu.
· Breaks if prprty does not exist in objct. Returns undefined.
· Breaks if vlu isNotAValue. Returns null.
*/

_jspProto.set_vlu = function jsp$set_vlu ( objct, prprty, vlu )
{
	if ( this._isProperty_ok( objct, prprty, jsp$set_vlu ) )
	{
		if ( this._isValue_ok( vlu, { o: objct, p: prprty } ) )
		{
			objct[ prprty ] = vlu
			return vlu
		}
		else // bad value
		{ return null }
	}
	else // property does not exist
	{ return undefined }
}


/* ***** push_vlu ***
:
· Pushes vlu onto a stack found in objct.prprty
· Breaks if prprty does not exist in objct.
· Breaks if vlu is NotAValue.
*/

_jspProto.push_vlu = function jsp$push_vlu ( objct, prprty, vlu )
{
	var stck = this.get_vlu( objct, prprty )
	if ( stck )
	{
		if ( this._isValue_ok( vlu, { o: objct, p: prprty } ) )
		{
			stck.push( vlu )
			return vlu
		}
		else
		{ return null }
	}
	else
	{ return stck }
}


/* ***** pop_vlu_ ***
:
· Pops and returns the the most recent item from a stack found in objct.prprty.
· Does not break if vlu_ isNotAValue.
:
· Breaks if prprty does not exist in objct. Returns undefined.
:
· break_: if present, breaks if the stack is empty
*/

_jspProto.pop_vlu_ =
	function jsp$pop_vlu_ ( objct, prprty, break_ )
	{
		var stck = this.get_vlu( objct, prprty )

		if ( ! stck )
		{ return stck }

		if ( ! this.isArray( stck ) )
		{ // TODO: error message
			return null
		}

		if ( stck.length >= 1 )
		{ return stck.pop() }

		// stack is too short
		if ( break_ )
		{
			this.error( 'jsp$pop_vlu_', 'Empty stack', objct, prprty )
		}

		return undefined
	}


/* ***** _stackNth_vlu_ ***
:
· Returns the nth item on a stack found in objct.prprty;
· Returns undefined if the stack is too short.
· Does not break if vlu_ isNotAValue.
:
· num_: is the number of the items on the stack, 1-based. Top item is #1. Default for num_ is 1.
· If the stack is too short, returns undefined.
· msg_objct_: breaks only if there is a value for msg_objct_.
*/

_jspProto._stackNth_vlu_ =
	function jsp$_stackNth_vlu_ ( stck, indx, msg_objct_ )
	{
		if ( ! this.isArray( stck ) )
		{ // TODO: error message
			return null
		}
		var len = stck.length
		indx = this.isNumber( indx ) ? indx : 1

		if ( ( len - indx ) >= 0 )
		{ // stack is big enough
			return stck[ len - indx ]
		}

		// stack is too short
		if ( msg_objct_ )
		{
			this.error( 'jsp$_stackNth_vlu_', 'Short stack; indx = ' + indx, msg_objct_.o, msg_objct_.p )
		}

		return undefined
	}


/* ***** _isValue_ok ***
:
· Breaks if vlu_ isNotAValue && there is msg_objct_
· msg_objct_: used for potential error message.
*/

_jspProto._isValue_ok =
	function jsp$_isValue_ok ( vlu_, msg_objct_ )
	{
		if ( this.isNotAValue( vlu_ ) )
		{
			if ( msg_objct_ )
			{
				this.error( 'jsp$_isValue_ok', 'Not a valid value: ' + vlu_, msg_objct_.o, msg_objct_.p )
			}

			return false
		}
		else
		{ return true }
	}


/* ***** _isProperty_ok ***
:
· Checks if a prprty exists in objct.
:
· Breaks if objct.prprty does not exist && break_ it truthy
· jd$_isProperty_ok overrides this method.
*/

_jspProto._isProperty_ok =
	function jsp$_isProperty_ok ( objct, prprty, break_ )
	{
		var ok = ( prprty in objct )

		if ( ! ok && break_ )
		{
			this.error( 'jsp$_isProperty_ok', 'Not a property', objct, prprty )
		}

		return ok
	}
/* ***** isArray *** */

_jspProto.isArray = Array.isArray || function jd$isArray ( vlu ) { return vlu instanceof Array }


/* ***** includes ***
:
Just an easy to read function to test if an array contains an item.
· Note: [].indexOf does not appear until MSIE 9
*/

_jspProto.includes = function jsp$includes ( ary, itm )
{
	return - 1 < ary.indexOf( itm )
}


/* ***** loopThru ***
:
Loops through the array, calling calledFnctn on each element, along with optional args.
:
· this.loopThru( fnctn, ths, ary, arg1, arg2, arg3 ... )
· the called function signature is: fnctn( ary[indx], indx, arg1, arg2, arg3, ... )
*/

_jspProto.loopThru = function jsp$loopThru ( calledFnctn, ths, ary )
{
	var args = Array.prototype.slice.call( arguments, 3 )
	for ( var lngth = ary.length, indx = 0; indx < lngth; indx ++ )
	{
		calledFnctn.apply( ths, [ ary[ indx ], indx ].concat( args ) )
	}
	return indx // not documented
}


/* ***** collect_ary ***
:
Collects in a new array the values resulting from calling calledFnctn on each item in ary.
@calledFnctn receives at least 2 arguments: the array item, and the indx, along with any extra arguments supplied to collect_ary.
· the called function signature is: fnctn( ary[indx], indx, arg1, arg2, arg3, ... )
· adds to the end of the array whatever calledFnct returns
*/

_jspProto.collect_ary = function jsp$collect_ary ( calledFnctn, ths, ary )
{
	var args = Array.prototype.slice.call( arguments, 3 )
	var ary2 = []

	for ( var lngth = ary.length, indx = 0; indx < lngth; indx ++ )
	{
		ary2.push( calledFnctn.apply( ths, [ ary[ indx ], indx ].concat( args ) ) )
	}
	return ary2
}

_jspProto.collect_ary.testFn = function testFn$testFn ()
{
	jd.arraysEqual( jd.collect_ary( Math.pow, Math, [ 0, 1, 2, 3 ] ), [ 1, 1, 4, 27 ] )
}


/* ***** _argsTo_ary ***
:
Returns args as an actual array
:
@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions_and_function_scope/arguments
*/

_jspProto._argsTo_ary = function jsp$_argsTo_ary ( args )
{
	return Array.prototype.slice.call( args )
}


/* ***** arraysEqual ***
:
arraysEqual( ary1, ary2 ). Arrays must have the same length, and ary[indx] === ary2[indx]
*/

_jspProto.arraysEqual = function jsp$arraysEqual ( ary1, ary2 )
{
	if ( ary1.length !== ary2.length )
	{ return false }
	// else
	for ( var len = ary1.length, indx = 0; indx < len; indx ++ )
	{
		if ( ary1[ indx ] !== ary2[ indx ] )
		{ return false }
	}
	return true
}

/* ***** check_ary ***
:
Returns ary if it is an OK array, or an object with a 'data' property.  Otherwise returns undefined.
:
· Breaks if ary is not an array, and it does not have a .data property, in which case it returns the .data.
· Breaks if ary.length is not at least min_len_.
ary: the array to check.
optns_: contains the following properties
p: just used in break messages.
o: just used in break messages.
min_len: default is 1.
@return the array, or undefined of ary is not valid.
*/

_jspProto.check_ary =
	function jsp$check_ary ( ary, optns_ )
	{
		var min_len = ( this._isAValue( optns_.min_len ) ) ? optns_.min_len : 1
		var prprty = optns_ ? optns_.p : undefined
		var msg_

		switch ( true )
		{
			case ( this.isArray( ary ) ):
			{
				// min_len of 0 is false
				if ( min_len && ( ary.length < min_len ) )
				{
					msg_ = 'There must be at least ' + min_len +
						' item(s) in the array for ' + prprty
					break
				}
				else
				{
					return ary
				}
			}
			// not an array. Check to see if it has a data property.
			case ( ( ( typeof ary === 'object' ) || ( ary instanceof Object ) ) && ( ary.data ) ):
			{ return this.check_ary( ary.data, optns_ ) }

			default:
			{ msg_ = 'The value for "' + prprty + '" is not an array. Value is: ' + ary }
		}

		if ( msg_ && prprty )
		{

			var objct_ = optns_.o
			var fn_name = jsp$check_ary.name || 'jsp$check_ary'
			msg_ = fn_name + ': ' + msg_
			if ( objct_ )
			{
				msg_ += ' in '
				console[ this._error$ ]( msg_, objct_ )
				this._break( msg_, objct_ )
			}
			else
			{
				if ( prprty )
				{
					console[ this._error$ ]( msg_ )
				}
			}
		}
		return ary
	}

_jspProto.check_ary.testFn = function check_ary$testFn ()
{
	console.assert( jsp.check_ary( [], 0, { min_len: 0, p: 'test1' } ) === undefined )
	console.assert( jsp.check_ary( [ 1 ], { min_len: 0, p: 'test2' } ) )
	console.assert( jsp.check_ary( 1, { min_len: 0, p: 'test3' } ) === undefined )
	console.assert( jsp.check_ary( [ 1 ], { min_len: 0, p: 'test4', o: 'test4Obj' } ) )
	console.assert( jsp.check_ary( [], { min_len: 0, p: 'test5', o: 'test5Obj' } ) )
	console.assert( jsp.check_ary( 3, { min_len: 0, p: 'test6', o: 'test6Obj' } ) === undefined )
}


/* ***** Array.reduce ***
:
A backup function in case the Array class does not have a reduce method.
@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
*/

if ( 'function' !== typeof Array.prototype.reduce )
{
	Array.prototype.reduce =
		function Array$reduce ( callback /*, initialValue*/ )
		{
			// 'use strict';
			if ( null === this || 'undefined' === typeof this )
			{
				throw new TypeError(
					'Array.prototype.reduce called on null or undefined' );
			}
			if ( 'function' !== typeof callback )
			{
				throw new TypeError( callback + ' is not a function' );
			}
			var t = Object( this ), len = t.length >>> 0, k = 0, value;
			if ( arguments.length >= 2 )
			{
				value = arguments[ 1 ];
			}
			else
			{
				while ( k < len && ! k in t )
				{
					k ++;
				}
				if ( k >= len )
				{
					throw new TypeError( 'Reduce of empty array with no initial value' );
				}
				value = t[ k ++ ];
			}
			for ( ; k < len; k ++ )
			{
				if ( k in t )
				{
					value = callback( value, t[ k ], k, t );
				}
			}
			return value;
		};
}

/* ***** _mergeInto_objct ***
:
Merges all the objects into a new object, in order of input arguments.
· The values of later objects override those of earlier ones.
· Shallow copies.
*/

_jspProto._mergeInto_objct = function jsp$_mergeInto_objct ()
{
	var objcts = arguments
	var new_objct = {}
	this.loopThru( this._mergeProperties, this, objcts, new_objct )
	return new_objct
}


/* ***** _mergeProperties *** */

_jspProto._mergeProperties =
	function jsp$_mergeProperties ( objct1, indx, objct2 )
	{
		for ( var prprty in objct1 )
		{ objct2[ prprty ] = objct1[ prprty ] }
	}


/* ***** copy_objct ***
:
Makes a shallow copy of objct, returning a new object.
@link https://developer.mozilla.org/en-US/docs/Web/API/Node.cloneNode
*/

_jspProto.copy_objct = function jsp$copy_objct ( objct )
{
	var objct2 = {}
	objct2.__proto__ = objct.__proto__
	for ( var prprty in objct )
	{
		objct2[ prprty ] = objct[ prprty ]
	}
	return objct2
}


/* ***** setSuperClass *** */

_jspProto.setSuperClass =
	function ta$setSuperClass ( classFn, superClassFn )
	{
		classFn.superclass = superClassFn
		// superclass used in getNextPrototype

		classFn.prototype = new superClassFn()
		classFn.prototype.constructor = classFn

		classFn.className = classFn.name
		classFn.displayName = classFn.name
	}


/* ***** setDefaultValues *** */

_jspProto.setDefaultValues =
	function ta$setDefaultValues ( classFn, dfltValus_objct_ )
	{
		if ( dfltValus_objct_ )
		{
			for ( var prprty in dfltValus_objct_ )
			{ classFn.prototype[ prprty ] = dfltValus_objct_[ prprty ] }
		}
	}


/* ***** define_cls ***
cls: is the name of the new class, or a function
*/

_jspProto.define_cls =
	function ta$define_cls ( cls, superClassFn, dfltValus_objct_ )
	{
		var classFn
		if ( typeof( cls ) === 'string' )
		{
			classFn = new Function()
			classFn.name = cls
		}
		else
		{
			( classFn = cls )
		}
		this.setSuperClass( classFn, superClassFn )
		this.setDefaultValues( classFn, dfltValus_objct_ )
		return classFn
	}


/* ***** JSONtoDOM *** */

function JSONtoDOM () { }

/*
 Here we are making JSONtoDOM a subclass of JSPlus so that JSONtoDOM
i nherits all of JSPlus's methods
*/

JSONtoDOM.prototype = new JSPlus()
JSONtoDOM.prototype.constructor = JSONtoDOM


/* ***** _jdProto ***
:
We will assign the methods to the JSONtoDOM prototype,
for which we add a variable, _jdProto.
*/

var _jdProto = // JSONtoDOM.prototype
	Object.defineProperties( JSONtoDOM.prototype, { _name: { value: '_jdProto' } } )


/* ***** jd ***
:
jd becomes a synonym for _jdProto
*/

var jd = _jdProto


/* ***** _declared_prprtys ***
:
An array of declared properties used in JSONtoDOM
*/

_jdProto._declared_prprtys = [
	'jdDefault',
	'jdRecords',
	'jdListeners',

	// The next few are set by JSONtoDOM
	'jdRecord',
	'jdRecordIndex',
	'jdNode',
	'jdSpec'
]


/* ***** defineProperty_prprtys ***
:
An array of properties used in Object.defineProperty
*/

_jdProto.defineProperty_prprtys =
	[ 'configurable', 'enumerable', 'value', 'writable', 'get', 'set' ]


/* ***** _isProperty_ok ***
:
Checks if prprty exists in objct.
:
· Breaks if objct.prprty does not exist && prprty is not in jd._declared_prprtys && break_.
· Overrides same method in jsp$_isProperty_ok.
*/

_jdProto._isProperty_ok =
	function jd$_isProperty_ok ( objct, prprty, break_ )
	{
		var ok = ( ( prprty in objct) || this.includes( this._declared_prprtys, prprty ) )
		if ( ! ok )
		{
			if ( break_ )
			{
				var fn_name = jd$_isProperty_ok.name || 'jd$_isProperty_ok'
				var msg = fn_name + ': No property [' + prprty + '] in '
				console[ this._error$ ]( msg, objct )
				this._break( msg, objct )
			}
		}
		return ok
	}


/* ***** addDeclaredProperties ***
:
Declare custom properties.
*/

_jdProto.addDeclaredProperties = function jd$addDeclaredProperties ( prprtys )
{
	if ( this.check_ary )
	{
		prprtys =
			this.check_ary( prprtys, { p: 'the argument for jd$addDeclaredProperties()', o: null } )
	}
	if ( prprtys )
	{
		Array.prototype.push.apply( this._declared_prprtys, prprtys )
	}
}

/* ***** _latest *** */

_jdProto.ensure_pckg( _jdProto, '_latest' )


/* ***** Placeholders ***
:
_stackFns is an array of the function objects that serve as stacks for the placeholders in the JDOL.
*/

_jdProto._stackFns = []


/* ***** _placeholderFns ***
:
_placeholderFns is an array of the function objects that serve as placeholder in the JDOL.
*/

_jdProto._placeholderFns = []

/* ***** _stackMethod_name *** */

_jdProto._stackMethod_name =
	function jd$_stackMethod_name ( name ) { return name + 'Stack' }


/* ***** definePlaceholder ***
:
Create the placeholders such as jd.record.
:
· "In Internet Explorer 8 Object.defineProperty only accepts DOM objects" but Object.defineProperty is present.
	Need to find an MSIE 8 test such as navigator.userAgent.
	In MSIE 8 this is "Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; WOW64; Trident/7.0;)"
*/

_jdProto.definePlaceholder = function jd$definePlaceholder ( name )
{
	var stckMthd_name = this._stackMethod_name( name )
	var _stckPrprty_name = '_' + stckMthd_name
	this._latest[ _stckPrprty_name ] = [] // create the _nameStack property
	if ( Object.defineProperty )
	{
		Object.defineProperty( this, name, this._placeholderDescriptor( this._itemGetter( name ) ) )
		Object.defineProperty( this, stckMthd_name, this._placeholderDescriptor( this._stackGetter( stckMthd_name ) ) )
	}
	else
	{
		this[ name ] = this._itemGetter( name ) // MSIE 8 version
		this[ stckMthd_name ] = this._stackGetter( stckMthd_name ) // MSIE 8 version
	}
}

/* ***** _placeholderDescriptor ***
:
Returns a default descriptor object containing vlu. _placeholderDescriptor( vlu )
:
· In MSIE 8 "Trying to use Object.defineProperty() on native objects throws an error"
· OK to use it on DOM object tho. MSDN.
*/

_jdProto._placeholderDescriptor = function jd$_placeholderDescriptor ( vlu )
{
	return {
		value: vlu,
		enumerable: true,
		configurable: false,
		writable: false
	}
}

/* ***** _itemGetter ***
:
Creates a getter function for a placeholder using 'name'
*/

_jdProto._itemGetter = function jd$_itemGetter ( name )
{
	var stckMthd_name = this._stackMethod_name( name )
	var _stckPrprty_name = '_' + stckMthd_name
	var stck_ary = this._latest[ _stckPrprty_name ]
	var fnctn = function jd$getPlaceholder ()
	{
		return stck_ary[ stck_ary.length - 1 ]
	}
	this._placeholderFns.push( fnctn )
	var fn_name = 'jd$' + name
	fnctn.name = fn_name // doesn't work in Chrome
	fnctn.displayName = fn_name // works in Chrome
	return fnctn
}


/* ***** _stackGetter ***
:
Creates a getter function for a placeholder stack using 'stckMthd_name'
*/

_jdProto._stackGetter = function jd$_getter ( stckMthd_name )
{
	var _stckPrprty_name = '_' + stckMthd_name
	var stck_ary = this._latest[ _stckPrprty_name ]
	var fnctn = function jd$getStack () { return stck_ary }
	this._stackFns.push( fnctn )
	var fn_name = 'jd$' + stckMthd_name
	fnctn.name = fn_name // doesn't work in Chrome
	fnctn.displayName = fn_name // works in Chrome
	return fnctn
}

/* ***** definePlaceholder *** */

if ( ! jd.record )
{ // need to protect against double-loading
	_jdProto.definePlaceholder( 'record' )    // _latest._recordStack
	_jdProto.definePlaceholder( 'recordIndex' )      // _latest._recordIndexStack
	_jdProto.definePlaceholder( 'spec' )       // _latest._specStack
	_jdProto.definePlaceholder( 'defaultThis' )     // _latest._defaultThisStack
	_jdProto.definePlaceholder( 'node' )       // _latest._nodeStack
	_jdProto.definePlaceholder( 'owner' )       // _latest._ownerStack
	_jdProto.definePlaceholder( 'jdolObject' )       // _latest._jdolObjectStack // NEW
}

/* ***** jd$records, jd$recordIndexes *** */

_jdProto.records = function jd$records () { return this.recordStack().slice().reverse() }

_jdProto.recordIndexes = function jd$recordIndexes ()
{
	return this.recordIndexStack().slice().reverse()
}

/* ***** _placeholder_vlu_ ***
:
If fnctn is in the list of _placeholderFns, call the function and return the value.
If not, return undefined.
*/

_jdProto._placeholder_vlu_ =
	function jd$_placeholder_vlu_ ( fnctn )
	{
		var vlu_
		if ( this.includes( this._placeholderFns, fnctn ) )
		{
			vlu_ = fnctn.call( this )
		}

		return vlu_
	}

/* ***** fetch_vlu ***
:
Gets the value from objct.prprty and then submits it to jdol_vlu before returning the vlu.
Returns  this.jdol_vlu( this.get_vlu( objct, prprty ) )
:
· Breaks if objct.prprty does not exist.
· Breaks if the value returned by jdol_vlu() isNotAValue.
@return {value}
*/

_jdProto.fetch_vlu =
	function jd$fetch_vlu ( objct, prprty )
	{
		var vlu = this.get_vlu( objct, prprty, jd$fetch_vlu )

		if ( this.isAValue( vlu ) )
		{
			vlu = this.jdol_vlu( vlu )
			this._isValue_ok( vlu, { o: objct, p: prprty } )
		}

		return vlu
	}

/* ***** jdol_vlu ***
:
Returns the value of vlu.
:
· If vlu is a placeholder, returns the value for that placeholder.
· If vlu is a JDOL object, reads and evaluates the object, and returns the new value.
· jd$jdol_vlu is recursive.
*/

_jdProto.jdol_vlu = function jd$jdol_vlu ( vlu )
{
	var vlu2_, rtrn_vlu

	switch ( true )
	{
		case ( vlu instanceof Function ) :
		{
			vlu2_ = this._placeholder_vlu_( vlu )
			if ( this._isAValue( vlu2_ ) )
			{
				rtrn_vlu = vlu2_
				vlu2_ = undefined
			}
			break
		}

		case ( this.isArray( vlu ) ) :
			// TODO: Do we replace the values just if there is a JDOL, or copy the array?
		{ return this.collect_ary( this.jdol_vlu, this, vlu ) }

		case ( vlu instanceof Object ) :
		{
			vlu2_ = this._jdObject_vlu_( vlu )
			break

		}
	}

	if ( this.isAValue( vlu2_ ) )
	{ vlu2_ = this.jdol_vlu( vlu2_ ) }

	if ( this.isNotAValue( rtrn_vlu ) )
	{ rtrn_vlu = this.isNotAValue( vlu2_ ) ? vlu : vlu2_}

	return rtrn_vlu
}

/* ***** _object_vlu *** */

_jdProto._jdObject_vlu_ = function jd$_jdObject_vlu_ ( jd_objct )
{
	this._latest._jdolObjectStack.push( jd_objct )
	var vlu_

	switch ( true )
	{

		case ( ( 'jdPath' in jd_objct ) && this._isAValue( this.record() ) ) :
		{
			vlu_ = this._jdPathObject_vlu( jd_objct )
			break
		}
		case ( 'jdFn' in jd_objct ) :
		{
			vlu_ = this._jdFnObject_vlu( jd_objct )
			break
		}
		case ( 'jdLookup' in jd_objct ) :
		{
			vlu_ = this._jdLookupObject_vlu( jd_objct )
			break
		}
		case ( 'jdPlus' in jd_objct ) :
		{
			vlu_ = this._jdPlusObject_vlu( jd_objct )
			break
		}
		case ( 'jdConcat' in jd_objct ) :
		{
			vlu_ = this.jdConcatObject_vlu( jd_objct )
			break
		}
	}
	this._latest._jdolObjectStack.pop()
	return vlu_
}

/* ***** specsToNodes *** */
/*
Expand spcs into nodes, and append them on to prnt_nd.childNodes.

prnt_spc_: is optional
*/


_jdProto.specsToNodes = function jd$specsToNodes ( spcs, prnt_node, prnt_spc_ )
{
	spcs = this.check_ary( spcs, { p: 'the argument for jd$specsToNodes()', o: null } )
	if ( spcs )
	{ this.loopThru( this.specTo_node_, this, spcs, prnt_node, prnt_spc_ ) }
}


/* ***** specTo_node_ *** */


_jdProto.specTo_node_ =
	function jd$specTo_node_ ( spc, spc_indx, prnt_node, prnt_spc_ )
	{
		if ( ! ( spc instanceof Object  ) )
		{
			var fn_name = jd$specTo_node_.name || 'specTo_node_'
			var msg = fn_name + ': Spec is not an Object - '
			console[ this._error$ ]( msg, spc )
			this._break( msg, spc )
			return null
		}
		var new_node = this.specTo_node( spc, prnt_node, prnt_spc_ )

		if ( spc.jdRecords )
		{ this.newRecordsToNodes( spc, new_node ) }
		else
		{
			if ( spc.childNodes )
			{
				this.specsToNodes( this.fetch_vlu( spc, 'childNodes' ), new_node, spc )
			}
		}
		this._popGlobals() // global stacks set in jd$specTo_node
		return new_node
	}
/* Minimum length for jdRecords: array */

_jdProto.jdRecordsMinLen = 0

/* ***** recordsToNodes ***
:
From spc's templates and records, build its childSpecs, and add them as childNodes of node.

node: the future parent node for spc.childNodes
*/

_jdProto.newRecordsToNodes =
	function jd$newRecordsToNodes ( spc, node )
	{
		var rcrds = this.fetch_vlu( spc, 'jdRecords' )
		rcrds = this.check_ary( rcrds, { p: 'jdRecords', o: spc, min_len: this.jdRecordsMinLen } )
		var fn_name = jd$newRecordsToNodes.name || 'jd$recordsToNodes'
		var msg
		if ( rcrds )
		{
			if ( 'childNodes' in spc )
			{
				if ( spc.childNodes.length > 0 )
				{
					this.loopThru( this.newRecordToNodes, this, rcrds, spc, node )
				}
				else
				{
					msg = fn_name + ': jdRecords with empty childNodes array in '
					console[ this._error$ ]( msg, spc )
					this._break( msg, spc )
				}
			}
			else
			{
				msg = fn_name + ': jdRecords with no childNodes property in '
				console[ this._error$ ]( msg, spc )
				this._break( msg, spc )
			}
		}
	}


/* ***** newRecordToNodes ***
:
Expand spcs into nodes for rcrd, according to the specs in the childNodes: property of prnt_spc.

prnt_node: the future parent node for spc.childNodes
prnt_spc: the spec with the 'jdRecords' property
*/

_jdProto.newRecordToNodes =
	function jd$newRecordToNodes ( rcrd, rcrd_indx, prnt_spc, prnt_node )
	{
		this._latest._recordStack.push( rcrd )
		this._latest._recordIndexStack.push( rcrd_indx )

		this.recordToNodes( rcrd, rcrd_indx, prnt_spc, prnt_node )

		if ( this._latest._recordStack.length === 0 )
		{
			// this is an error in JSONtoDOM
			var fn_name = jd$newRecordToNodes.name || 'jd$recordToNodes'
			console.warn( fn_name + ': Popping off too many records', this._latest._recordStack )
		}

		this._latest._recordIndexStack.pop()
		this._latest._recordStack.pop()
	}


/* ***** recordToNodes *** */
/*
Expand spcs into nodes for rcrd, according to the specs in the childNodes of prnt_spc.

prnt_node: the future parent node for spc.childNodes
prnt_spc: the spec with the 'jdRecords' property
*/


_jdProto.recordToNodes =
	function jd$recordToNodes ( rcrd, rcrd_indx, prnt_spc, prnt_node )
	{
		if ( 'childNodes' in prnt_spc )
		{
			var chld_spcs = this.fetch_vlu( prnt_spc, 'childNodes' )
			chld_spcs = this.check_ary( chld_spcs, { p: 'childNodes', o: prnt_spc } )
			this.loopThru( this.recordTo_node, this, chld_spcs, prnt_node, rcrd, rcrd_indx, prnt_spc )
		}
	}


/* ***** recordTo_node *** */


_jdProto.recordTo_node =
	function jd$recordTo_node ( tmplt, tmplt_indx, prnt_node, rcrd, rcrd_indx, prnt_spc )
	{
		var spc = tmplt

		// Best to used jd.record() and jd.recordIndex()
		// Because a template is shared, spc.jdRecord winds up being the last record set.
		// But the current record gets copied over to current node, so it is correct.
		this.set_vlu( spc, 'jdRecord', rcrd )
		this.set_vlu( spc, 'jdRecordIndex', rcrd_indx )

		var new_node = this.specTo_node( spc, prnt_node, prnt_spc )

		if ( 'jdRecords' in spc )
		{ this.newRecordsToNodes( spc, new_node ) }
		else
		{ this.recordToNodes( rcrd, rcrd_indx, spc, new_node ) }

		this._popGlobals() // global stacks set in jd$specTo_node
		return new_node
	}


/* ***** create_node *** */


_jdProto.create_node = function jd$create_node ( spc )
{
	var name
	switch ( true )
	{
		case ( 'nodeName' in spc ) :
		{
			name = this.fetch_vlu( spc, 'nodeName' )
			break
		}
		case ( 'tagName' in spc ) :
		{
			name = this.fetch_vlu( spc, 'tagName' ) // 'tagName' not in #comment, #text
			break
		}
	}
	if ( ! name )
	{
		var fn_name = jd$create_node.name || 'jd$create_node'
		var msg = fn_name + ': No nodeName for:'
		console[ this._error$ ]( msg, spc )
		this._break( msg, spc )
		name = 'div'
	}

	var data = ''

	switch ( name )
	{

		// https://developer.mozilla.org/en-US/docs/Web/API/document.createTextNode
		// Text nodes have a textContent property, but not innerHTML
		case '#text' :
			if ( 'textContent' in spc )
			{ data = this.fetch_vlu( spc, 'textContent' ) }
			else
			{
				if ( 'data' in spc )
				{ data = this.fetch_vlu( spc, 'data' ) }
			}
			return document.createTextNode( data )

		// https://developer.mozilla.org/en-US/docs/Web/API/document.createComment
		// Comments have a textContent property, but not innerHTML
		case '#comment' :
			if ( 'textContent' in spc )
			{ data = this.fetch_vlu( spc, 'textContent' ) }
			// else { data = this.fetch_vlu( spc, 'data' ) }
			else
			{
				if ( 'data' in spc )
				{ data = this.fetch_vlu( spc, 'data' ) }
			}
			return document.createComment( data )

		case '#document-fragment' :
			return document.createDocumentFragment()

		default :
			return document.createElement( name )
	}
}

/* ***** specTo_node ***
:
Creates and initializes (populates) a new node according to spc.
:
· spc.parentNode = prnt_spc_
· create a new node for the spec,
· append to parent node's children
· spc.jdNode = new_node
· new_node.jdSpec = spc
· copy the properties
:
Some people would liken this to a render method
*/

_jdProto.specTo_node =
	function jd$specTo_node ( spc, prnt_node, prnt_spc_ )
	{

		// These get popped by jd$_popGlobals() in
		//      jd$recordTo_node and jd$specTo_node_
		//      the 2 functions that call specTo_node
		this._latest._defaultThisStack.push( spc )
		this._latest._specStack.push( spc )
		if ( prnt_spc_ )
		{
			spc.parentNode = prnt_spc_
		}
		var new_node = this.create_node( spc )
		this._latest._nodeStack.push( new_node )
		prnt_node.appendChild( new_node )
		// https://developer.mozilla.org/en-US/docs/Web/API/Node.appendChild

		this.set_vlu( spc, 'jdNode', new_node )
		this.set_vlu( new_node, 'jdSpec', spc )
		this.setNodeProperties( new_node )
		this.initNode( new_node ) // NEW
		return new_node
	}

/* ***** _popGlobals ***
:
Pop global stacks initially set in jd$specTo_node
*/

_jdProto._popGlobals = function jd$_popGlobals ()
{
	if ( this._latest._specStack.length === 0 )
	{
		console.warn( jd$_popGlobals, 'Popping _specs off too much', this._latest._specStack )
	}
	this._latest._nodeStack.pop()
	this._latest._specStack.pop()
	this._latest._defaultThisStack.pop()
}

/* ***** setNodeProperties ***
:
Copy the values in the properties from node.jdSpec to node.
*/

_jdProto.setNodeProperties = function jd$setNodeProperties ( node )
{
	var spc = node.jdSpec
	for ( var prprty in spc )
	{ this.setNodeProperty( spc, prprty, node ) }
}

/* ***** setNodeProperty ***
:
Copy the value in the prprty from spc to node.
:
· Nreaks if prprty does not exist in node, and is not listed in jd._declared_prprtys
*/

_jdProto.setNodeProperty = function jd$setNodeProperty ( spc, prprty, node )
{
	switch ( prprty )
	{

		case 'jdRecords' :
			break

		case 'jdNode' :
			break

		case 'jdListeners' :
			this.addListeners( spc, node )
			// addListeners puts a exact copy of 'jdListeners' in the node
			break

		case 'jdDefault' :
			this.setDefaults( spc )
			break

		case 'attributes' :
			this.setAttributes( spc, node )
			break

		case 'style' :
			this.setStyles( spc, node )
			break

		case 'childNodes' :
			break

		case 'children' :
			break

		case 'constructor' :
			break

		default:
			// TODO: if jd.doNotCopyArray.includes( prperty ) { break } // constructor
			var vlu = this.fetch_vlu( spc, prprty )
			if ( ( vlu instanceof Object ) && ( 'enumerable' in vlu ) )
			{ this.setDescriptor( node, prprty, vlu ) }
			else
			{ this.set_vlu( node, prprty, vlu ) }
	}
}

/* ***** initNode *** */
_jdProto.initNode = function jd$initNode ( node )
{
	this.addAsObservee( node ) // NEW
}

/* ***** uninitNode *** */
_jdProto.uninitNode = function jd$uninitNode ( node )
{
	this.removeAsObservee( node ) // NEW
}

/* ***** addAsObservee ***
:
If node has a jdRecord, calls the addAsObservee( node ) method for the record.
*/
_jdProto.addAsObservee = function jd$addAsObservee ( node )
{
	if ( 'jdRecord' in node )
	{
		var rcrd = node.jdRecord
		if ( this._isAValue( rcrd ) )
		{
			if ( ( typeof(rcrd ) === 'object' ) && ( 'jdAddObservee' in rcrd ) )
			{
				// TODO this should have an error message if jdAddObservee is not a fn
				rcrd.jdAddObservee( node )
			}
		}
	}
}

/* ***** removeAsObservee ***
:
If node has a jdRecord, calls the jdRemoveObservee( node ) method for the record.
*/
_jdProto.removeAsObservee = function jd$removeAsObservee ( node )
{
	if ( 'jdRecord' in node )
	{
		var rcrd = node.jdRecord
		if ( this._isAValue( rcrd ) )
		{
			if ( (typeof( rcrd ) === 'object' ) && 'jdRemoveObservee' in rcrd )
			{
				if ( 'jdRemoveObservee' in rcrd )
				{
					// TODO this should have an error message if jdRemoveObservee is not a fn
					rcrd.jdRemoveObservee( node )
				}
			}
		}
	}
}

/* ***** removeDescendantNodes ***
:
Remove descendant nodes and listeners from node.
*/

_jdProto.removeDescendantNodes =
	function jd$removeDescendantNodes ( node )
	{
		while ( node.firstChild )
		{
			this._undoNode( node.firstChild )
			node.removeChild( node.firstChild )
		}
	}

/* ***** _undoNode *** */

/*
Remove descendant nodes and listeners from node.
*/
_jdProto._undoNode =
	function jd$_undoNode ( node )
	{
		this.removeDescendantNodes( node )
		this.removeListeners( node )
		this.uninitNode( node )
	}
/* ***** setStyles *****
:
Populates the style object of a node
:
· The DOM inserts a style object into the style property of every new element
· setStyles let you use an object with a jdFn: property
· set_vlu does not, at this point, allow you to set *new* properties in the style object that the DOM creates
· If there is a need for this, please let me know
*/

_jdProto.setStyles = function jd$setStyles ( spc, node )
{
	var style_spc = this.fetch_vlu( spc, 'style' )

	var nodeStyle_objct = node.style // this is the pre-existing style object
	for ( var prprty in style_spc )
	{
		var vlu = this.fetch_vlu( style_spc, prprty )
		this.set_vlu( nodeStyle_objct, prprty, vlu )
	}
}

/* ***** setDescriptor *** */

/*
prprty: { enumerable: <vlu>, ... }
:
· https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty
· http://kangax.github.io/compat-table/es5/
· [2] In some versions of WebKit Object.defineProperty does not work with DOM objects.
*/
_jdProto.setDescriptor = function jd$setDescriptor ( node, prprty, dscrptr )
{
	// Note that default values for defineProperty are false
	if ( this.includes( this.defineProperty_prprtys, prprty ) )
	{
		Object.defineProperty( node, prprty, dscrptr )
	}
	else
	{
		var fn_name = jd$setDescriptor.name || 'jd$setDescriptor'
		var msg = fn_name + ': The proprety name ' + prprty + ' is not valid for defineValue in '
		console[ this._error$ ]( msg, dscrptr )
		this._break( msg, dscrptr )
	}
}

/* ***** setAttributes ***
:
Calls node.setAttribute() for  each of the properties in the attributes: object.
:
· atrbt_name must be an attribute name, not a property name
· Values should, in theory, be strings, but the DOM ensures everything is a string
· Custom attributes do not show up as a property on the DOM object (in Chrome)
· If the atrbt_name corresponds to a DOM property, Chrome places the value also in the property.
*/

_jdProto.setAttributes = function jd$setAttributes ( spc, node )
{
	var atrbts_objct = this.fetch_vlu( spc, 'attributes' )

	if ( atrbts_objct )
	{
		for ( var atrbt_name in atrbts_objct )
		{
			var vlu = this.fetch_vlu( atrbts_objct, atrbt_name )
			// TODO - check that atrbt_name is preexisting in node.attributes or declared in this.extra_attrs
			// or node.jd_extra_attrs or preexist in the DOM node (eg 'onclick')
			node.setAttribute( atrbt_name, vlu )
		}
	}
}

/* ***** addListeners *** */

_jdProto.addListeners = function jd$addListeners ( spc, node )
{
	var lstnr_objcts = this.fetch_vlu( spc, 'jdListeners' )
	lstnr_objcts = this.check_ary( lstnr_objcts, { p: 'jdListeners', o: spc } )
	if ( lstnr_objcts )
	{
		this.set_vlu( node, 'jdListeners', [] )
		this.loopThru( this.addListener, this, lstnr_objcts, node )
	}
}

/* ***** addListener *** */

_jdProto.addListener =
	function jd$addListener ( lstnr_objct, indx, node )
	{
		var type = this.fetch_vlu( lstnr_objct, 'type' ) // click, keydown, etc
		var onType = 'on' + type
		var fnctn = this.fetch_vlu( lstnr_objct, 'listener' )
		var useCptr = false
		if ( onType in node )
		{
			if ( node.addEventListener )
			{
				if ( 'useCapture' in lstnr_objct )
				{
					useCptr = this.fetch_vlu( lstnr_objct, 'useCapture' )
				}
				node.addEventListener( type, fnctn, useCptr )
			}
			else
			{ // MSIE
				if ( node.attachEvent )
				{
					{ node.attachEvent( onType, fnctn ) }
				}
				else // for really old browsers
				{ node[ onType ] = fnctn }
			}
			// Need to record the values exactly as they were
			//      when added as listeners
			node.jdListeners.push( { type: type, listener: fnctn, useCapture: useCptr } )
		}
		else
		{
			var fn_name = jd$addListener.name || 'jd$addListener'
			var msg = fn_name + ': No "' + onType + '" method in '
			console[ this._error$ ]( msg, node )
			this._break( msg, node )
		}
	}

/* ***** removeListeners *** */

_jdProto.removeListeners = function jd$removeListeners ( node )
{
	if ( node.hasOwnProperty( 'jdListeners' ) )
	{
		var lstnr_objcts = this.fetch_vlu( node, 'jdListeners' )
		lstnr_objcts = this.check_ary( lstnr_objcts, { p: 'jdListeners', o: node } )
		if ( lstnr_objcts )
		{ this.loopThru( this.removeListener, this, lstnr_objcts, node ) }
	}
}

/* ***** removeListener *** */


_jdProto.removeListener =
	function jd$removeListener ( lstnr_objct, indx, node )
	{
		var ignore = indx
		var type = this.fetch_vlu( lstnr_objct, 'type' ) // click, keydown, etc
		var onType = 'on' + type
		var fnctn = this.fetch_vlu( lstnr_objct, 'listener' )
		if ( node.removeEventListener )
		{
			var useCptr = false
			if ( 'useCapture' in lstnr_objct )
			{
				useCptr = this.fetch_vlu( lstnr_objct, 'useCapture' )
			}
			node.removeEventListener( type, fnctn, useCptr )
		}
		else
		{ // MSIE
			if ( node.detachEvent )
			{ node.detachEvent( onType, fnctn ) }
		}
	}
/* ***** setDefaults ***
:
Sets the defaults on the child specs, not the nodes
*/

_jdProto.setDefaults = function jd$setDefaults ( spc )
{
	var dflt_objct = this.fetch_vlu( spc, 'jdDefault' )
	var chld_spcs = this.fetch_vlu( spc, 'childNodes' )
	if ( chld_spcs )
	{ this.loopThru( this._setChildSpecDefaults, this, chld_spcs, dflt_objct ) }
}

/* ***** _setChildSpecDefaults *** */


/* ***** _setChildSpecDefaults *** */
/*
For each of the properties in dflt_objct, copy the value to the childNodes if the child spec
does not have a valid value in that property.
:
· The property does not need to exist in the child spec.
· If dflt_objct.jdGenerations >=1, decrement it, and if chld_spc.jdDfault _isNotAValue, copy the dflt_objct to chld_spc.jdDfault
· If dflt_objct.jdGenerations is <1, stop.
· Breaks if jdGenerations is not a number
*/

_jdProto._setChildSpecDefaults =
	function jd$_setChildSpecDefaults ( chld_spc, indx, dflt_objct )
	{
		for ( var prprty in dflt_objct )
		{
			if ( prprty === 'jdGenerations' )
			{
				var dpth = this.fetch_vlu( dflt_objct, 'jdGenerations' )
				if ( ! this.isNumber( dpth ) )
				{
					var fn_name = jd$_setChildSpecDefaults.name || 'jd$_setChildSpecDefaults'
					var msg = fn_name + ': not a valid jdGenerations: value for jdDefault:' + dpth + ', objct ='
					console[ this._error$ ]( msg, chld_spc )
					this._break( msg + chld_spc )
					return
				}
				if ( dpth < 1 )
				{ return }
				// else
				dpth -= 1
				var chld_dflt = chld_spc.jdDefault
				if ( this._isNotAValue( chld_dflt ) )
				{
					chld_spc.jdDefault = this.copy_objct( dflt_objct )
					chld_spc.jdDefault.jdGenerations = dpth
				}
			}
			else
			{
				// if there isNotAValue in the target property, copy it from the jdDefault
				if (// this._checkValue_ok( dflt_objct[ prprty ], chld_spc, prprty, jd$_setChildSpecDefaults ) ))
					this._isValue_ok( dflt_objct[ prprty ], { o: chld_spc, p: prprty } ) )
				{
					chld_spc[ prprty ] = dflt_objct[ prprty ]
				}
			}
		}
	}


/* ***** _jdFnObject_vlu ***
:
Calls the function contained in the jdFn property.
:
{ jdFn: <fn/string>, jdThis: <value>, jdArgs: <array> }
:
· Breaks if there is no jdFn: property.
· Breaks if jdFn js not a function, or the name of a method in 'this'.
· jdThis:, if present, becomes the value of 'this' for the function.
· The default for 'this' is defaultThis() which normally is the current step object in a jdPath, or the current spec.
· jdArgs:, if present, becomes the arguments passed to the function.
· Breaks if args is not an array. It may be an empty array.
· The default for args_ is [ jd.record() ], if there is a jd.record().
:
jdFn_objct: an object that has a jdFn: property
@see _jdFnCall_vlu _jdFnCall_vlu for more detauils.
*/

_jdProto._jdFnObject_vlu =
	function jd$_jdFnObject_vlu ( jdFn_objct )
	{

		var fnctn = this.fetch_vlu( jdFn_objct, 'jdFn' ) // function or string

		var ths_
		if ( 'jdThis' in jdFn_objct )
		{
			ths_ = this.fetch_vlu( jdFn_objct, 'jdThis' )
		}

		var args
		if ( 'jdArgs' in jdFn_objct )
		{
			args = this.fetch_vlu( jdFn_objct, 'jdArgs' )
			args = this.check_ary( args, { p: 'jdArgs', o: jdFn_objct } )
		}

		var vlu = this._jdFnCall_vlu( fnctn, ths_, args )

		return vlu
	}

/* ***** _jdFnCall_vlu ***
:
Calls fnctn using values for ths_ and args_.
:
If ( fnctn is a string ) { fnctn = ths_[ fnctn/string ] }
returns fnctn.apply( [ ths_ || this.defaultThis(), args_ ] )
:
· Breaks if fnctn js not a function, or the name of a method in 'this'.

fnctn$: the function called.
If fnctn is a string, _jdFnObject_vlu retrieves the function in the property ths_[ fnctn/string ]

ths_: if present, is 'this' for the fnctn.
The default ths_ is defaultThis() which normally is the current step object in a jdPath,
or the current spec.

args_: if present, are the arguments for fnctn.apply( ths_, args_ ).
Should be an array. May be an empty array. The default for args_ is [ jd.record() ], if there is a jd.record().

@return fnctn.apply( [ ths_ || this.defaultThis(), args_ )
*/

_jdProto._jdFnCall_vlu =
	function jd$_jdFnCall_vlu ( fnctn$, ths_, args_ )
	{
		var vlu_

		if ( this._isNotAValue( ths_ ) )
		{ ths_ = this.defaultThis() }

		if ( this.isString( fnctn$ ) )
		{ fnctn$ = ths_[ fnctn$ ] }

		if ( fnctn$ instanceof Function )
		{
			if ( args_ )
			{ vlu_ = fnctn$.apply( ths_, args_ ) }
			else
			{ vlu_ = fnctn$.call( ths_ ) }
		}
		else
		{
			var fn_name = jd$_jdFnCall_vlu.name || 'jd$_jdFnCall_vlu'
			var msg = fn_name + ': Invalid jdFn: ' + fnctn$ + ', ths= '
			console[ this._error$ ]( msg, ths_ )
			this._break( msg, ths_ )
		}
		return vlu_
	}
/* ***** _jdPathObject_vlu ***
:
Returns the value of a jdPath object
:
{ jdPath: [ properties... ], jdStart: <value> }
:
· jdPath: is an array of property names and jdObjects.
· Breaks if jdPath: is not an array. It may be an empty array.
· jdStart:, if present is the starting step object.

@see _jdPath_vlu _jdPath_vlu for more detauils.
*/

_jdProto._jdPathObject_vlu = function jd$_jdPathObject_vlu ( jdPth_objct )
{
	// TODO: push on a jd.pathObject placeholder
	var prprtys = this.get_vlu( jdPth_objct, 'jdPath' )
	prprtys = this.check_ary( prprtys, { p: 'jdPath', o: jdPth_objct } )

	var start_vlu_
	if ( 'jdStart' in jdPth_objct )
	{ start_vlu_ = this.fetch_vlu( jdPth_objct, 'jdStart' ) }

	return this._jdPath_vlu( prprtys, start_vlu_ )
}

/* ***** _jdPath_vlu *** */
/*
The default start object, is the current `jd.record()`, if any. Otherwise it is the current `jd.spec()`.
:
prprtys: is an array of property names and jdObjects.
start_vlu_: if present is the starting step object.
*/

_jdProto._jdPath_vlu = function jd$_jdPath_vlu ( prprtys, start_vlu_ )
{
	var vlu
	if ( prprtys )
	{

		var step_vlu = this._isAValue( start_vlu_ ) ? start_vlu_ : this.record()
		if ( this._isNotAValue( step_vlu ) )
		{ step_vlu = this.spec() }
		var prprty

		for ( var lngth = prprtys.length, indx = 0; indx < lngth; indx ++ )
		{
			// Note that step_vlu is fed back in to the next call to fetch_vlu_
			prprty = this.get_vlu( prprtys, indx )
			step_vlu = this._step_vlu( step_vlu, prprty )
		}
		vlu = step_vlu
	}
	return vlu
}

/* ***** _step_vlu *** */


_jdProto._step_vlu = function jd$_step_vlu ( step_vlu, prprty )
{
	this._latest._defaultThisStack.push( step_vlu )
	// step_vlu becomes 'this' for the fnctn call in jd$_jdFnObject_vlu

	var jdl_vlu = this.jdol_vlu( prprty )

	if ( prprty !== jdl_vlu )
	{
		step_vlu = jdl_vlu
	}
	else
	{
		// prprty = vlu
		step_vlu = this.fetch_vlu( step_vlu, prprty )
	}
	this._latest._defaultThisStack.pop()
	return step_vlu
}


/* ***** plus_vlu *** */

_jdProto.plus_vlu = function jd$plus_vlu ( vlu1, vlu2 )
{
	return vlu1 + vlu2
}

/* ***** _jdPlusObject_vlu *** */


_jdProto._jdPlusObject_vlu = function jd$_jdPlusObject_vlu ( jdPlus_objct )
{

	// Fetch and check the value of jdPlus:, an array
	var ary = this.fetch_vlu( jdPlus_objct, 'jdPlus' )
	ary = this.check_ary( ary, { p: 'jdPlus', o: jdPlus_objct } )

	var fnctn_ = this.plus_vlu
	var vlu = ary.reduce( fnctn_ )

	return vlu
}

_jdProto._jdPlusObject_vlu.testFn = function _jdPlusObject_vlu$testFn ()
{
	console.assert( jd._jdPlusObject_vlu( { jdPlus: [ 1, 2, 3 ] } ) === 6 )
	console.assert( jd._jdPlusObject_vlu( { jdPlus: [ 'A', 'B', 'C' ] } ) === 'ABC' )
}

/* ***** concat_vlu *** */

_jdProto.concat_vlu = function jd$concat_vlu ( vlu1, vlu2 )
{
	return vlu1.concat( vlu2 )
}

/* ***** jdConcatObject_vlu *** */


_jdProto.jdConcatObject_vlu = function jd$jdConcatObject_vlu ( jdObject_objct )
{

	// Fetch and check the value of jdConcat:, an array
	var ary = this.fetch_vlu( jdObject_objct, 'jdConcat' )
	ary = this.check_ary( ary, { p: 'jdConcat', o: jdObject_objct } )
	ary = this.collect_ary( this.jdol_vlu, this, ary )

	var fnctn_ = this.concat_vlu
	var vlu = ary.reduce( fnctn_ )

	return vlu
}

_jdProto.jdConcatObject_vlu.testFn = function jdConcatObject_vlu$testFn ()
{
	console.assert( jd.arraysEqual(
		jd.jdConcatObject_vlu( {
			jdConcat: [
				[ 'A' ],
				[ 'B' ],
				[ 'C' ]
			]
		} ),
		[ 'A', 'B', 'C' ] ) )
	console.assert( jd.arraysEqual(
		jd.jdConcatObject_vlu( {
			jdConcat: [
				[ 1 ],
				[ 2 ],
				[ 3 ]
			]
		} ),
		[ 1, 2, 3 ] ) )
	console.assert( jd.jdConcatObject_vlu( { jdConcat: [ 'A', 'B', 'C' ] } ) === 'ABC' )
}


/* ***** lookup_vlus ***
:
· If prprty is an own property in objct, returns [ vlu, owningObject ]
· Breaks if vlu isNotAValue
· If prprty is not an own property in objct, looks for prprty in the prnt_objct = objct.prnt_prprty_
· Breaks if prnt_prprty_ is not an own property in objct and prnt_prprty_ !== '__proto__'
· Breaks if prnt_objct isNotAValue

prnt_prprty_: default is 'parentNode'
@return { array } [ vlu, owningObject ] or undefined
*/

_jdProto.lookup_vlus = function jd$lookup_vlus ( objct, prprty, prnt_prprty_ )
{
	prnt_prprty_ = prnt_prprty_ || 'parentNode'
	var vlu, ary

	if ( objct.hasOwnProperty( prprty ) )
	{
		vlu = this.get_vlu( objct, prprty )
		if ( this.isAValue( vlu ) )
		{ ary = [ vlu, objct ] }
	}
	else
	{ // look in the parent
		if ( objct.hasOwnProperty( prnt_prprty_ ) ||
			prnt_prprty_ === '__proto__' )
		{
			var prnt_objct = this.get_vlu( objct, prnt_prprty_ )
			if ( this._isAValue( prnt_objct ) )
			{
				ary = this.lookup_vlus( prnt_objct, prprty, prnt_prprty_ )
			}
		}
		else
		{
			var fn_name = jd$lookup_vlus.name || 'jd$lookup_vlus'
			var msg = fn_name + ': There is no own property called ' + prnt_prprty_ + ' in '
			console[ this._error$ ]( msg, objct )
			this._break( msg, objct )
		}
	}
	return ary
}

_jdProto.lookup_vlus.testFn = function lookup_vlus$testFn ()
{
	console.assert( jd.arraysEqual( jd.lookup_vlus( jd, 'ensure_pckg', '__proto__' ), [ jsp.ensure_pckg, jsp ] ) )
	console.assert(
		jd.arraysEqual(
			jd.lookup_vlus( jd, 'hasOwnProperty', '__proto__' ),
			[ Object.hasOwnProperty, Object.prototype ] ) )
	console.assert( jd.lookup_vlus( jd, 'hasOwnProperty', 'badPrntPrprty' ) === undefined ) // breaks
	console.assert( jd.lookup_vlus( jd, 'notaname' ) === undefined ) // breaks, no own prop called 'parentNode'
	console.assert( jd.lookup_vlus( jd, 'notaname', '__proto__' ) === null )
	// breaks @ _isValue_ok, Object,__proto__ = null
}


/* ***** _jdLookupObject_vlu ***
:
jdLookup: is the name of the property in which we are looking for a value.
jdStart: is the start object for looking up the tree. Default is this.spec()
jdParentProperty: designates the property to use to find the owner object. Default is 'parentNode'.
jdThis: sets the 'this' for the funcall of a method named or the call of the function.
jdOwner: jd.owner means call the method/function using the owner spec as 'this'.
jdArgs: if present, are the arguments for the function/method call.
*/

_jdProto._jdLookupObject_vlu = function jd$_jdLookupObject_vlu ( jdLookup_objct )
{

	var prprty = this.fetch_vlu( jdLookup_objct, 'jdLookup' )

	var prnt_rprty
	if ( 'jdParentProperty' in jdLookup_objct )
	{ prnt_rprty = this.fetch_vlu( jdLookup_objct, 'jdParentProperty' ) }
	if ( this._isNotAValue( prnt_rprty ) )
	{ prnt_rprty = 'parentNode' }

	var strt_objct_ = this.spec()
	if ( 'jdStart' in jdLookup_objct )
	{
		strt_objct_ = this.fetch_vlu( jdLookup_objct, 'jdStart' )
	}

	var vlu
	var ary = this.lookup_vlus( strt_objct_, prprty, prnt_rprty )

	var ths_
	if ( 'jdThis' in jdLookup_objct )
	{
		ths_ = this.fetch_vlu( jdLookup_objct, 'jdThis' )
	}

	var args_
	if ( 'jdArgs' in jdLookup_objct )
	{
		args_ = this.fetch_vlu( jdLookup_objct, 'jdArgs' )
		args_ = this.check_ary( args_, { p: 'jdArgs', o: jdLookup_objct } )
	}

	if ( this._isAValue( ths_ ) )
	{ // || args_
		// ths_ = this._isAValue( ths_ ) ? ths_ : ary[ 1 ] // ary[1] is the owner object
		if ( ths_ === jd.owner )
		{ ths_ = ary[ 1 ] } // ary[1] is the owner object
		var fnctn$ = ary[ 0 ] // May also be the name of a method property
		vlu = this._jdFnCall_vlu( fnctn$, ths_, args_ )
	}
	else
	{ vlu = ary[ 0 ] }

	return vlu
}

/* ***** areEqual ***
:
@return ( vlu1 === vlu2 )
*/

_jdProto.areEqual = function jd$areEqual ( vlu1, vlu2 )
{
	return ( vlu1 === vlu2 )
}

/* ***** lookup_objct ***
:
Return the first parent object whose prprty value matches trgt_vlu, according to fn_.
:
Ex: jd.lookup_objct( spec, 'nodeName', 'TABLE' ) // find the containing table
:
· If prprty is not in objct, looks for prprty in the prnt_objct = objct.prnt_prprty_
· Breaks if prnt_prprty_ is not an own property in objct and prnt_prprty_ !== '__proto__'
· Breaks if prnt_objct isNotAValue

prnt_prprty_: default is 'parentNode'
fn_: default is js.areEqual, which is ( vlu1 === vlu2 )
@return { array } ancstr_objct or null
*/

_jdProto.lookup_objct =
	function _jd$Lookup_objct ( objct, prprty, trgt_vlu, prnt_prprty_, fn_ )
	{

		fn_ = fn_ || jd.areEqual
		if ( prprty in objct )
		{
			var vlu = this.get_vlu( objct, prprty )
			if ( fn_.call( this, trgt_vlu, vlu ) )
			{
				return objct
			}
		}

		// look in the parent
		var ancstr_objct
		prnt_prprty_ = prnt_prprty_ || 'parentNode'
		// Firefox 31 does not consider 'parentNode' to be an own property in a node
		if ( ( prnt_prprty_ in objct ) || prnt_prprty_ === '__proto__' )
		{
			var prnt_objct = this.get_vlu( objct, prnt_prprty_ )
			if ( this._isAValue( prnt_objct ) )
			{
				ancstr_objct = this.lookup_objct( prnt_objct, prprty, trgt_vlu, prnt_prprty_, fn_ )
			}
		}
		else
		{
			var fn_name = _jd$Lookup_objct.name || '_jdLookup_objct'
			var msg = fn_name + ': There is no property called ' + prnt_prprty_ + ' in '
			console[ this._error$ ]( msg, objct )
			this._break( msg, objct )
		}
		return ancstr_objct
	}
