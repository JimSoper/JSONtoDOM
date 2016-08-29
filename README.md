
<code><font size=6><b>{<font color=dodgerblue>JSON</font>}<font color=SeaGreen>to</font><<font color=red>DOM</font>></b></font></code><br/>

<font size=4>`{JavaScript Object} => <DOM Node>`</font>

----------

By Jim Soper (JimSoper@gmail.com)<br/>
August 29, 2016

# Table of Contents

* [Introduction](#Introduction)
	* [Simple Example](#SimpleExample)
	* [Purpose](#Purpose)
* [The Basics](#Basics)
	* [nodeName: & tagName:](#nodeName)
	* [childNodes: \[...\]](#childNodes)
	* [innerHTML: & textContent:](#innerHTML)
	* [#comment & #text](#comments)
	* [jdRecords: \[...\] & jd.record](#jdRecords)
* **[Getting Started](#GettingStarted)**
	* [index.html, JSONtoDOM.js](#index.html)
	* [The Startup Function & jd.specsToNodes()](#StartupFunction)
	* [removeDescendantNodes()](#removeDescendantNodes)
	* [addDeclaredProperties( \[...\] )](#addDeclaredProperties)
* [Internals](#Internals)
	* [Error Checking, get_vlu() & setValue()](#get_vlu)
	* [fetch_vlu( object, property)](#fetch_vlu)
* [Calling Functions](#jdFnObjects)
	* [{ jdFn: <fn> }](#jdFn)
	* [{ jdFn: "methodName" }](#methodName)
		* [{ ..., jdArgs: \[...\] }](#jdArgs)
		* [{ ..., jdThis: {...} }](#jdThis)
* [More JDOL](#MoreJDOL)
	* [{ jdPath: \[ "...", ... \] } ](#jdPath)
		* [{ ..., jdStart: {...} }](#jdPath_jdStart)
	* [{ jdLookup: "..." }](#jdLookup)
		* [{ ..., jdStart: {...} }](#jdLookup_jdStart)
		* [{ ..., jdArgs: \[...\], jdThis: {...} }](#jdLookup_jdThis)
	* [{ jdPlus: \[...\] }](#jdPlus)
	* [{ jdConcat: \[...\] }](#jdConcat)
* [Using JavaScript](#JavaScript)
	* [jd.record(), jd.spec(), jd.defaultThis()](#PlaceholderMethods)
	* [Dynamic Scoping](#DynamicScoping)
	* [jd.definePlaceholder()] (#definePlaceholder)
	* [jdNode:, jdSpec:, jdRecord:](#SpecAndNodeProperties)
	* [Private Methods and Properties](#PrivateMethodsAndProperties)
	* [The Translation Process](#TranslationProcess)
	* [The jd & jsp Objects](#JdAndJspObjects)
	* [Object.defineProperty() & { enumerable: <bool>}](#defineProperty)
	* [Calling Functions: a Review](#CallingFunctionsAReview)
* [A Few More Properties](#MoreProperties)
	* [jdDefault: {...}](#jdDefault)
	* **[style: {...}](#style)**
	* [attributes: {...}](#attributes)
	* [Events](#Events)
		* [on*event* : <fn>](#onFunction)
		* [jdListeners: \[...\]](#jdListeners)
* [Custom Elements](#CustomElements)
* [Compatability](#Compatability)
* [Speed](#Speed)
* [Examples](#Examples)

<hr id="Introduction"/>
# Introduction

JSONtoDOM is a JavaScript class that converts JavaScript objects into DOM objects. With it, you write specifications for DOM objects using JavaScript objects and arrays. Each property in the spec object becomes a property in the equivalent DOM node.

Note: **Installation instructions are below: [Getting Started](#GettingStarted)**


<a id="SimpleExample"></a>
## Simple Example

Here is an example. In JSONtoDOM, this JavaScript object

	{	nodeName: "div",
		id: "myID",
		name: "myName",
		innerHTML: "Welcome to JSONtoDOM!"
	}

in the browser becomes the DOM/HTML equivalent of

	`<div id = "myID" name = "myName">Welcome to JSONtoDOM!</div>`


<a id="Purpose"></a>
## Purpose

The purpose here is

* to **simplify**. We are reducing syntax complexities to just JavaScript, and functionality to just the DOM API. Very little HTML. As much or as little of the hyper-complex CSS as you want. There are a few JSONtoDOM keywords to learn, plus the DOM that you already know. Simple is powerful.

* to allow us to **spot errors** such as invalid values and infuriating little typos in property names, before they go online.

* to work with **object** that you can **programatically generate**, introspect and manipulate. These are JavaScript objects, including DOM objects. This is powerful.

* to allow you to use Object.defineProperty() to make your node properties **read-only**, or to assign **getter** or **setter** functions to them.

* to allow you to use powerful **OO techniques** in a poor OO environment. Specs for nodes and styles can become classes and subclasses, which you can develop into a hierarchy of reusable objects. You can't normally subclass DOM elements or CSS styles. But when specifying DOM elements and CSS styles using JSONtoDOM JavaScript objects, you can, and you should.

Note that you *may use CSS, HTML, event listeners, and other libraries*. But JSONtoDOM will let you achieve much with one consistent, well tested, well documented API: the DOM.

What JSONtoDOM is not, is an extensive library of components, models, data bindings, and controllers. For that I can recommend Sencha ExtJS. as it too is based on JavaScript objects. JSONtoDOM is a micro-library with a largely direct translator from JavaScript Objects to DOM nodes.

<hr id="Basics">
#The Basics

You build most of your specs using JavaScript objects and a 3 key DOM properties: `nodeName:, innerHTML: and childNodes:`


<a id="nodeName"></a>
## nodeName: & tagName:

The `nodeName:` property designates the class of the DOM element you want. This can be a "div", "tbody". or any other DOM element class. Note that you may use `{ tagName: "div" }` almost as readily as `{ nodeName: "div" }`. They both work. I prefer the property `nodeName:`


<a id="childNodes"></a>
## childNodes:

The property `childNodes:` specifies an array of children for the current node/object. For example, the following JavaScript object:

	{	nodeName: "ul",
		childNodes: [
			{ nodeName: "li", innerHTML: "First item" },
			{ nodeName: "li". innerHTML: "Second Item" }
		]
	}

becomes (conceptually) this:

	<ul>
		<li>First Item</ul>
		<li>Second Item</ul>
	</ul>

which you see as this in your browser:

	o First item
	o Second item

We say "conceptually", because you are **not** writing HTML code. You are writing specs with JavaScript objects that translate directly into DOM nodes. **JSONtoDOM"s API is the DOM itself**.


<a id="innerHTML"></a>
## innerHTML: & textContent:

You can specify the content of an element using either `innerHTML:` or `textContent:`. Both work.
However, if you include HTML tags in the content string, the results will differ:

	{ nodeName: "div", innerHTML: "<i>Content</i>" }

appears as *Content*  - in *italics*,  while

	{ nodeName: "div", textContent: "<i>Content</i>" }

appears exactly as written: `<i>Content</i>`

When child nodes are added to a node, the values inside of its `innerHTML:` and `textContent:` properties *in the DOM node itself* change, adding the HTML code or text from the new childNodes.
This is standard DOM behavior. The spec objects, however, usually do not change.


<a id="comments"></a>
## #comment & #text

Comments and text nodes are not elements, so they do not have a `tagName`. property.  Specify them using `nodeName:`, the keyword `#comment` or `#text`, and the property `data:` or `textContent:`.

	{ nodeName: "#comment", data: "This is a comment." }
	{ nodeName: "#comment", textContent: "This is a comment." }
	{ nodeName: "#text", data: "This is a text node." }
	{ nodeName: "#text", textContent: "This is a text node." }


<a id="jdRecords"></a>
## jdRecords: [...] & jd.record

Writing specs for a simple page in JSONtoDOM is straightforward.
Almost all your spec properties correspond to a DOM property.
But how do we generate a table or list of elements to display the records in an array of data of unknowm size?
For that, we introduced the property `jdRecords:`.
If it is present in the spec object, it must return an array of "records".
For each record, JSONtoDOM will use the specs in `childNodes:` as a template to create new child nodes.

For example, if we have 3 `jdRecords;` using the template in `childNodes:`

	{ nodeName: "ul",
		jdRecords: [ 1, 2, 3 ],
		childNodes: [ { nodeName: "li", innerHTML: jd.record } ]
	}

we conceptually get a `<ul> `with three `<li>'s` as childNodes:

	<ul>
		<li>1</li>
		<li>2</li>
		<li>3</li>
	</ul>

which we see as

	o 1
	o 2
	o 3

As a value for `innerHTML:`, `jd.record` serves as a *placeholder* for each of the `jdRecords:`.
When JSONtoDOM is reading the specs, if it sees `jd.record`, it substitutes the current record.

Please note that `jd.record` is a placeholder, and not a JavaScript variable. Trying to write

	{ nodeName: "li", innerHTML: jd.record * 2 }

will break because jd.record itself is not a number. More on that later.


<hr id="GettingStarted">
# Getting Started

The files are located in [http://WebKitWorks.us/JSONtoDOM/JSONtoDOM.zip](http://WebKitWorks.us/JSONtoDOM/JSONtoDOM.zip).
Unzip the file, and locate `JSONtoDOMPlus.js`.
Copy it to whatever directory you wish. The entire library is contained in `JDtoDOMPlus.js`.
There is also a `JSONtoDOMPlus-min.js` version,
minified using [http://jscompress.com/](http://jscompress.com/).
The examples in the `examples/` folder expect JSONtoDOMPlus.js to be in their parent directory `../`.


<a id="index.html"></a>
## index.html, JSONtoDOMPlus.js

To get started, you typically write the following steps in an `index.html` file:

1. Load `JSONtoDOMPlus.js`, which contains both the `JSPlus` and `JSONtoDOM` classes.
* Load the JavaScript file for your app. Let's call it `TheApp.js`.

		<!DOCTYPE html>
		<html>
		<head>
			<title>The App</title>
			<meta charset = "utf-8">
			<script src = "JSONtoDOMPlus.js"></script>
			<script src = "TheApp.js"></script>
		</head>
		</html>

In `TheApp.js`, we could then have specifications such as this:

	TheApp.specs = [
		{	nodeName: "body",
			childNodes: [ { nodeName: "div", innerHTML: "THE APP" } ]
		}
	]

<a id="StartupFunction"></a>
## Startup Function & jd.specsToNodes( specs, parentNode )

We need a way to trigger the building of the DOM tree from the specs. A simple way to do this is to assign a startup function to `window.onload` in `TheApp.js`:

	window.onload = function () { ... };

Within a normal JSONtoDOM startup function, there are the following steps:

1. Declare new properties for your specs, if any, using [`addDeclaredProperties( [...] )`](#addDeclaredProperties).
* Create a document fragment node.
* Have `jd.specsToNodes( specs, parentNode, ... )` generate the new nodes based on `TheApp.specs`,
These nodes become descendant nodes of the fragment node.
* Append the fragment as a child of the parent node. `parentNode.appendChild()`
knows to ignore the fragment, and to append the fragment's `childNodes:`
to the `childNodes:` of the parent node.
Here, the parent node is `<body>`, but it could be any other node in your document.

		TheApp.specs = [ { nodeName: "div", innerHTML: "THE APP" } ]

		window.onload = function ( )
		{	jd.addDeclaredProperties( [ /* your custom properties */ ] );
			var fragment = document.createDocumentFragment();
			jd.specsToNodes( TheApp.specs, fragment ); // add descendant nodes to fragment
			document.body.appendChild( fragment );
		}

You do not have to use a document fragment. You can add the nodes directly to the parent node, but using a document fragment may avoid page recalculations until everything is in place.

<a id="removeDescendantNodes"></a>
## removeDescendantNodes( node )

Changing the content of your page is similar to getting it started. The difference is that you normally want to detach the previous node tree before adding a new one.

	TheApp.update = function ( parentNode )
	{	jd.removeDescendantNodes( parentNode ); // remove previous descendants
		var fragment = document.createDocumentFragment();
		jd.specsToNodes( TheApp.specifications, fragment );
		parentNode.appendChild( fragment );
	}

`jd.removeDescendantNodes( node )` removes the `childNodes:` for `node` and for all its descendant nodes, bottom up, so it completely breaks up the descendant node tree. It also automatically removes any related event listeners declared in the `jdListeners:` property of your previous specs (see below).

An alternative to `jd.removeDescendantNodes( parentNode )` is to use `parentNode.innerHTML = "`.  It's simpler and it's faster because it does less work.


<a id="addDeclaredProperties"></a>
## addDeclaredProperties( [...] )

As part of it's error checking, JSONtoDOM issues an error if a property in your specs is not

* an existing property in the target DOM node
* or a JSONtoDOM property, such as `jdRecords;`,
* or declared using `jd.addDeclaredProperties( [...] )`.

The last function takes an array of the property name strings that you are declaring. It must be called before starting the translation process with `jd.specsToNodes()`.

Example: `jd.addDeclaredProperties( [ "theProperty1", "theProperty2" ] )`

* You do not need to declare properties in records, since they do not become properties in DOM nodes.

* These declarations are global. They apply to all specs.


<hr id="Internals"/>
# Internals

Your submit your specs to the JSONtoDOM translator using `jd.specsToNodes( specs, parentNode )`. We showed how to do that in the section on [Getting Started](#GettingStarted). Along the way, JSONtoDOM reads the specs, looking for certain key properties, and JDOL objects. JDOL is the **J**Sto**D**OM **O**bject **L**anguage. JDOL objects have key properties in them, which signal special behavior. Before we get into that, there are a few methods that you need to be aware of because they handle the extensive error checking.


<a id="get_vlu"/></a>
## Error Checking, get_vlu( object, property ) & setValue( object, property, value )

The JSONtoDOM class is a sublcass of a utility class called JSPlus. It has a method `jsp.get_vlu( object, property )` which returns the value of the property. It conducts extensive error checking of your specs during the translation process. `jsp.get_vlu()` issues an error message

* if the `object.property` does not exist, or
* if the value returned for a property is `undefined`, `null` or `NaN`
* if the value of `jdRecords:`, or `childNodes:` is an empty array, `[]`.

For JSONtoDOM, `jsp.isNotAValue()` defines what is an unacceptable value: `undefined`, `null` or `NaN`.  `null` may become acceptable in the future, if there is a need. But in the meantime, you can overwrite `jsp.isNotAValue()` by writing a method of the same name in a subclass of `JSONtoDOM`, and accessing it with `this.isNotAValue( value )`.

`jsp.set_vlu( object, property, value )` also checks that the property exists, and issues an error if the value `isNotAValue()`. You will probably use it less often, but JSONtoDOM relies on it to spot undeclared property names that do not exist in the target DOM object, an error.

<a id="fetch_vlu"/></a>
## fetch_vlu( object, property )

Since JSONtoDOM is a subclass of JSPlus, so you can call the `jsp.get_vlu()` method from an instance of JSONtoDOM. JSONtoDOM itself has a method called `jd.fetch_vlu( object, property )` which goes beyond `jsp.get_vlu()`. It can call functions in specially marked JDOL objects such as  `{ jdFn: <fn> }`. It can also walk through a path to access values that are inside of objects that are inside of records `{ jdPath: <path> }`. These objects are part of JDOL. The *syntax* of JDOL is exactly that of JavaScript. We are not parsing strings, we are reading JavaScript objects. We've added to the JavaScript *semantics*, by giving a special meaning to placeholders and JDOL objects. For now, understand that JSONtoDOM uses `jd.fetch_vlu()` often, and that makes JDOL work. At the same time, it checks extensively for errors in your specs.

The function `jd.fetch_vlu()` calls, `jdol_vlu()`, which is recursive. That means that you can nest JDOL objects, especially `{ jdFn: <fn> }` (see below) inside of other JDOL objects, and if a JDOL object returns another JDOL object, the latter will be translated in turn.

Experimental: arrays are also checked for JDOL objects; simple objects, other than JDOL objects are not.


<hr id="jdFnObjects"/>
# Calling Functions

<a id="jdFn"></a>
## { jdFn: `<fn>` }

`{ jdFn: <fn> }` gives you a functional hook to your specs and data. If a specification property value is an object with the property `jdFn:`, then `jd.fetch_vlu()` tells `jd.jdol_vlu()` to call the function in the `jdFn:` property and return the value on back through `fetch_vlu().` `{ jdFn: <fn> }` looks like this:

	{	nodeName: "div",
		aProperty: { jdFn: { function () { return 123; } } } // returns 123 for aProperty
	}

123 becomes the value of `aProperty:` in the node.


<a id="methodName"></a>
## { jdFn: "methodName" }

If the value of `jdFn:` is a *string* that is the name of a method in the owner spec, JDOL will call that method.

	{	nodeName: "div",
		aMethod: function () { return 123; }, // returns 123
		aProperty: { jdFn: "aMethod" } // call this.aMethod()
	}

When calling a `jdFn:` function, the owner spec (normally) becomes the value for `this` in the target function.

The call is equivalent to this: `{divSpec}.aMethod()`

Note that you must declare the new properties `aProperty` and  `aMethod` first:

	jd.addDeclaredProperties( [ "aProperty", "aMethod" ] )


## JSONtoDOM Treats JS Functions As Property Values

Be aware that JDOL does *not* call function objects that are simple values in properties. It returns those functions as values, most likely to be placed inside a DOM node as a method.  If you don't use the `{ jdFn: <fn> }` object, the following

	{	...
		innerHTML: function ( ... ) { ... } // not a jdFn: object
	}

just shows you in the browser

	{ ...
		innerHTML: <function {native code}>`
	}

In order to call a function, it must follow `jdFn:`

	{ ...
		innerHTML: { jdFn: function ( ... ) { ... } }
	)

This will call the function when generating nodes.

A function call(), not a function object, will execute when the spec is evaluated by JavaScript. This call to `String()` in a JSONtoDOM object:

	{	nodeName: "div",
		innerHTML: String( 456 ) }
	}

becomes the following DOM node:

	{	nodeName: "div",
		innerHTML: "456"
	}

which shows `456` in your browser.

<a id="jdArgs"></a>
## { jdArgs: [...], jdFn: `<fn>` }

You may add a `jdArgs:` property to your `jdFn:` object so that it looks something like this: `{ jdFn: <fn>/"methodName", jdArgs: [ arg0, arg1, ... ] }`. `jdArgs:` designates a ( non-empty ) array of arguments to be supplied to the function.

In this case, if we add a `multiply:` method to our spec, and supply `[ 2, 4 ]` as the arguments

	{ 	nodeName: "div",
		multiply: function ( num1, num2 ) { return num1 * num2 },
		innerHTML: { jdFn: "multiply", jdArgs: [ 2, 4 ] }
	}

the output becomes `( 2 * 4 )`, ie: `8`

If we rewrite the `multiply:` method to `square:`, add `jdRecords:` to the specs, and supply `[ jd.record ]` for `jdArgs:`:

	{  	nodeName: "ul",
		jdRecords: [ 1, 2, 3 ],
		childNodes: [
			{ 	nodeName: "li",
				square: function ( num ) { return num * num },
				innerHTML: { jdFn: "square", jdArgs: [ jd.record ] }
			}
		]
	}

the output becomes `( jd.record * jd.record )` in three iterations, once for each of the 3 `jdRecords:`.

	o 1
	o 3
	o 9

<a id="jdThis"></a>
## {  jdFn: `<fn>`, jdThis: {...} }

We also said that by default, JSONtoDOM usually supplies the current spec ( `jd.spec` ) as the value for `this` in the called function. You can override it by adding a `jdThis:` property to your `jdFn:` object so that it looks something like this: `{ jdFn: <fn>/"methodName", jdThis: ... }`. For example,

	{ 	nodeName: "div",
		innerHTML: { jdFn: "italics", jdThis: "JSONtoDOM" }
	}

shows *JSONtoDOM* in a browser. `italics` is the name of a method in String.prototype, so the call is `"JSONtoDOM".italics()`, which returns `<i>JSONtoDOM</i>` before it is passed to `innerHTML:`.


<hr id="MoreJDOL"/>
# More JDOL Objects

<a id="jdPath"></a>
## { jdPath: [ "property", ...] }

In the course of accessing data to present in your page, you can use `jdFn:` to call a function to get the information. There is a second way, called `jdPath:`. A simple path such as `{ jdPath: [ "name" ] }` means get the `name` of the start object. For example, if the start object is `{ name: "Santa Claus" }`, we get "Santa Claus" back.


The *default start object*, is the current `jd.record`, if any. Otherwise it is the current `jd.spec`.

We can extend the path, which must be a non-empty array, to say - get the `location` of the start object, then get the `location's` `name` : `{ jdPath: [ "location", "name" ] }`. So if we have the following example:

	{	nodeName: "div",
		jdRecords: [ { location: { name: "North Pole" } } ],
		innerHTML: { jdPath: [ "location", "name" ] }
	}

we would see "North Pole" in the `<div>`.

Normally, JDOL starts with the default start object, fetches the value of the first property of that start object, in this case, the `location`, which is `{ name: "North Pole" }`.  We call that value the *step object*, like the steps on a stairway. We then fetch the value of the current step object's corresponding property listed in the path array, in this case, `name`. That is `"North Pole"`. `jdPath:` continues on stepping through the path array, until it gets to the end, at which point, it returns the most recent value.

<a id="jdPath_jdStart"></a>
### { jdPath: [...], jdStart: {...} }

If you wish to change the start object from the default start object to something else, add `jdStart:` to the `jdPath:` object.

	{	nodeName: "div",
		innerHTML: { jdPath: [ "nodeName" ], jdStart: jd.spec }
	}

will show the `nodeName` of the current spec, `div`, in the browser.

The JDOL idiom for `object["property"]` is `{ jdStart: object, jdPath: ["property"] }`. Yes, this is verbose, but you should not need to use it very often.
The JDOL idiom for `document.getElementById( "theId" )` is `{ jdFn: document.getElementById, jdArgs: [ "theId" ] }`

### { jdPath: [ "...", { jdFn: `<fn>` }, "..." ] }

We can call a function from within a path by inserting a `jdFn:` object into it. For example,

	{ 	nodeName: "div",
		innerHTML: { jdPath: [ "nodeName", { jdFn: String.prototype.bold } ], jdStart: jd.spec }
	}

This has a `jdStart:` object, the `jd.spec`, whose `nodeName` is the string `"div"`, which becomes the new step object. The second item in the `jdPath:` array is a `jdFn:` object, with `bold()` as its function, so we see **div** in the browser, but this time in **bold**. The function call is `String.prototype.bold( "div" )`.

Since `bold()` is a method for all strings, and a `nodeName` is a string (`"div"`), we could also use the name of the method, `"bold"` like this:

	{ 	nodeName: "div",
		innerHTML: { jdPath: [ "nodeName", { jdFn: "bold" } ], jdStart: jd.spec }
	}

In this case, the function call is `"div".bold()`, which results in **div**, in bold.

<a id="jdLookup"></a>
## { jdLookup: "property" }

Similar to `jdPath:` is `jdLookup:`. By default, it looks up the `parentNode` tree of the spec, until you find a spec object that "owns" a version of the target property you designate in the `jdLookup:` property. It then returns the value of that property. This works very much like chaining through prototypes, using the `__proto__` property of an object, except that here the default parent property is `parentNode:`.

For example. if we have specs that look like this:

	{	nodeName: "div",
		divProp: "Have a great day!", // target property
		childNodes: [
			{  	nodeName: "ol",
				childNodes: [
					{	nodeName: "li",
						innerHTML: { jdLookup: "divProp" }
					}
				]
			}
		]
	}

`jdLookup:` will find the first `divProp:` in the starting spec object, or its ancestors ( the `<div>` ), that it can, and return its value, `"Have a great day!"`, to `<li>.innerHTML:`.

<a id="jdLookup_jdStart"></a>
### { jdLookup: "..." , jdStart: {...} }
You may change the start object by specifying `jdStart:`, such as to the current spec `jd.spec`:

	`{ jdLookup: "aProp", jdStart: jd.spec }`

<a id="jdLookup_jdParentProperty"></a>
### { jdLookup: "..." , jdParentProperty: {...} }

The `jdParentProperty:` property designates the property to use to find the next parent object. The default is `"parentNode"`. If you wanted to find the value of a `location` property for a record through the objects that are containing it, you could do it this way:

	`{ jdLookup: "location", jdParentProperty: "container" }`

<a id="jdLookup_jdThis"></a>
### { jdLookup: "...", jdArgs: [...], jdThis: {...}, jd.owner }

*If* you supply `jdThis:`, JDOL understands that you are asking for a method/function call using the value in the target property designated in `jdLookUp:`. A `jdThis:` value of`jd.owner` means call the method/function found using for "this" the spec/object that "owns" the target property. The arguments for the call will be supplied with `jdArgs:`, if any

In the following example, the top `<div>` owns `getNodeName:`, so the method call will be `<div>.getNodeName()`.

	{	nodeName: "div",
		showOwner: function ( prefix ) { return prefix + this.nodeName },
		childNodes: [
			{  	nodeName: "ol",
				childNodes: [
					{  	nodeName: "li",
						innerHTML: { jdLookup: "showOwner", jdThis: jd.owner, jdArgs: [ "This is  the owner: " ] }
					}
				]
			}
		]
	}

What gets called is `<div>.getNodeName( "This is the owner: " )`, which returns `"This is the owner: " + "div"`. `{ jdLookup: "showOwner", jdThis: jd.spec }` becomes a method call to `{li}.showOwner( "This is the owner: " )`, which returns `"This is  the owner: " + "li"`.

<a id="jdPlus"></a>
## { jdPlus: [...] }

`jdPlus` pluses all the items in an array, using the `+` operator. `{ jdPlus: [ "A", "B", "C" ] }` returns "ABC". `{ jdPlus: [ 1, 2, 3 ] }` returns 6. This is useful in concatenating strings to feed to `innerHTML:`.

<a id="jdConcat"></a>
## { jdConcat: [...] }

`jdConcat` concatenates all the items in an array. `{ jdConcat: [ [1], [2], [3] ] }` returns `[ 1, 2, 3 ]`. It also works with anything else that has a `concat()` method, such as strings. `{ jdConcat: [ "A", "B", "C" ] }` returns "ABC" ( but `jdPlus:` would be faster).

Note that most JDOL keywords that expect an array ( [...] ), issue an error if the array is empty. The exception is `jdArgs:` in `jdLookup:` `{ jdLookup: "theMethod", jdArgs: [] }`, where it may signal that the value of `theMethod:` is to be called, not just fetched. If you need to turn this checking for an empty array off, override `jsp.check_ary()` in a subclass, and let me know, as I could change the API for that function.


<hr id="JavaScript"/>

# Using JavaScript

Almost everything you can do from a JDOL object, you can do from JavaScript.

<a id="Placeholder Methods"></a>
## jd.record(), jd.recordIndex(), jd.spec(), jd.defaultThis(), jdNode()

Each of placeholders is a property in an object called `jd`. The properties each contain a function. You can call the function from within JavaScript to get the same value that the placeholder gets in the JSONtoDOM world.

* `jd.record()` gets the current record.
* `jd.RecordIndex()` gets the index of the current record in the `jdRecords:` array.
* `jd.spec()` gets the current spec.
* `jd.node()` gets the current node.
* `jd.defaultThis()` gets you the current default value for `this` when you don't supply a `jdThis:` argument. `jd.defaultThis()` is usually the current spec, unless you are stepping through a `jdPath:`. In that case, it is the step object, which is initially is the value for `jdStart:`, or the current record, or the current spec object, and afterwards the object returned by the latest property in the path. See [`{ jdPath: [...] }`](#jdPath) for details.

<a id="DynamicScoping"></a>
## Dynamic Scoping

The current values for the placeholders ( `jd.xxx` ), and their parallel functions ( `jd.xxx()` ) are dynamic. `jd.spec` gets you the current spec. `jd.record` gets you the current record, if any. `jd.defaultThis` gets you the current default value for `this`, if any. If there is no current value, the placeholder  ( `jd.xxx` ) returns their relevant function, and the function call  ( `jd.xxx()` ) returns `undefined`.

<a id="definePlaceholder"></a>
## jd.definePlaceholder()
You can use `jd.definePlaceholder()` to define your own placeholders. See the code for details, or ask me how.

<a id="SpecAndNodeProperties"></a>
## jdNode:, jdSpec:, jdRecord:

The following spec and node properties are available from JavaScript. Some are mentioned below in [The Translation Process](#TranslationProcess).

* `<node>.jdRecord:` The current record at the time the template spec is interpreted and values copied to the node.
* `<node>.jdRecordIndex:` The current record index at the time the template spec is interpreted and and values copied to the node. The index is 0-based.
* `<node>.nodeParent:` This is the parent DOM node.
* `{spec}.nodeParent:` This is the parent spec object.
* `{spec}.jdNode:`  The latest node. If the spec is used as a template for `jdRecords:`, this will change for each new record.
* `<node>.jdSpec:`  The original spec object for the node, untouched. If the spec is used as a template for `jdRecords:`, it is shared among each of the nodes created for a record. Not copying the specs should save space and time. We may change that if there is a need.

<a id="PrivateMethodsAndProperties"></a>
## Private Methods and Properties

JSONtoDOM work in progress. I am listing some of the private methods in this doc for information purposes. The API may change, especially for properties with an initial underscore: `_private`.

<a id="TranslationProcess"></a>
## The Translation Process

This is what happens when you build a node tree from JSONtoDOM specs:

1. First, JavaScript will read your specs, evaluating the objects and the values of their properties.
* If the spec is inside a function, the values will be evaluated when the function is called. This is standard JavaScript.

		function ( text ) { return { nodeName: "li", innerHTML: text } }

* this.specsToNodes( specs, parentNode, parentSpec ) calls this.specToNode() for each of the specs.
* this.specToNode(spec, index, parentNode, parentSpec ) then  (TODO: needs updating)

	1. calls specTo_node( spec, parentNode, parentSpec ). In a kind of shorthand, this is what it does:

		1. make the current spec available to the `jd.spec` placeholder
		* newNode = document.createElement( spec.nodeName )
		* parentNode.childNodes = newNode // parentNode.appendChild( newNode )
		* spec.jdNode = newNode
		* newNode.jdSpec = spec
		* call this.setNodeProperties( node )
			* for each property in spec, call setNodeProperty( spec, property, node ), which:
				1. fetches the value of spec.property using fetch_vlu( spec, property ).
					* this is when placeholders and JDOL objects are interpreted.
				* copies the computed values of the property in `spec` to the `node`

	*  If the spec has a `jdRecords:` property, `specToNode()` then calls
		* recordsToNode( spec, new_node ) which
			* iterates over each of the records in `jdRecords:`, and turns each of its `childNodes` into a template/spec for each of the records
			* makes the current record available to the `jd.record` placeholder
	*  otherwise, if there are no `jdRecords:`, for each of the `spec.childNodes:` go back to step 3, specsToNodes()

* Note that JSONtoDOM creates and processes each of the nodes before proceeding to their own `childNodes:`. Top down.
* With a few exceptions, JSONtoDOM converts spec properties to nodes in the order in which they are written. If node.property_A depends on information in node.property_B being present, property_B must come before property_A in the specs.


<a id="JdAndJspObjects"></a>
## The jd And jsp Objects

Note that in the documentation, we reference properties and methods of the JSPlus and JSONtoDOM classes as belonging to the `jsp` or `jd` object. These are actually synonyms for the `.prototype` of there respective class. JSONtoDOM is a subclass of JSPlus, a utility class that implements `jsp.get_vlu()`, `jsp.check_ary()`, and `jsp.isNotAValue()`.  If you properly subclass JSONtoDOM, with, for example, an App class, and then create a new app object, that will work. All your methods should then refer to `this`, not `jd` or `jsp`, to properly work through the JavaScript prototype chain. Make changes by subclassing JSONtoDOM, and creating an instance of your subclass.


<a id="UtilityFunctions"></a>
## Utility Functions

Note that this page: [http://kangax.github.io/compat-table/non-standard/](#http://kangax.github.io/compat-table/non-standard/), lists some `String` methods that may come in handy for minor HTML markup: String.bold(), String.blink(), String.big(), String.link(href), String.anchor(), String.small(), String.strike(), String.italics(), String.quote().


<a id="defineProperty"></a>
## Object.defineProperty() & { enumerable: `<bool>` }

JavaScript has an `Object.defineProperty()` method that can set a property's `writable:` attribute to `false` (read-only), and set getter and setter functions for the property. You can also set  the `value:`,`enumerable:` and `configurable:` attributes of the node's property. In JSONtoDOM, if `fetch_vlu()` returns from a property <u>**any**</u> object containing the property **`enumerable:`**, JSONtoDOM assumes that that object is a property descriptor. `jd.setDescriptor()` will then call `Object.defineProperty( node, property, descriptor )` to define the property using the descriptor.

Defining getter and setter functions for the `jdRecords:` property may be especially useful, as they will automatically trigger when needed. TODO: Jim, review this.

The value of a descriptor, must conform exactly to the
[rules for a descriptor object.](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty).
Note that default values for `Object.defineProperty()` are *false*, ie: your property will not be enumerable, nor configurable unless you specify otherwise.

Here's an abbreviated example:

	{ 	nodeName: "div",
		jdRecords: {
			enumerable: true, // may be false, but must be present
			configurable: true,
			get: function () { ... }, // becomes the getter function for jdRecords:
			set: function (value) { ... } // becomes the setter function for jdRecords:
		}
	}

`Object.defineProperty()` works on many, but not all browsers. Check out the [ECMAScript 5 compatibility table](http://kangax.github.io/compat-table/es5/) for more information. They have two footnotes that say:

1. In Internet Explorer 8 `Object.defineProperty()` only accepts DOM objects, and
2. In some (older) versions of WebKit `Object.defineProperty()` does not work with DOM objects.

<a id="CallingFunctionsAReview"></a>
## Calling Functions: a Review

In review, `jd.fetch_vlu()` will only call/trigger a function if

* the function is the value of a `jdFn:` property: `{ jdFn: <fn> }`, or
* the `jdFn:` value is the name of a valid method in an object: `{ jdFn: "string" }`, or
* a string is the name of a method in a JDOL object such as for `jdPath:` or `jdLookup:`, or
* the function is a getter for a JavaScript property.


<hr id=MoreProperties/>
# A Few More Properties

<a id="jdDefault"></a>
## jdDefault: {...}

JSONtoDOM copies the properties and values in the default object of a spec object's `jdDefault:` property, down to the `childNodes:` of that spec object. So

	{	nodeName: "ul",
		jdDefault: { innerHTML: "Child Node" },
		childNodes [ { nodeName: "li" } ]
	}

becomes

	{	nodeName: "ul",
		jdDefault: { innerHTML: "Child Node" },
		childNodes [ {
			nodeName: "li",
			innerHTML: "Child Node" // added property
			}
		]
	}

before `jd.specsToNodes()` starts to read the child specs. This will help you to share property settings among the specs in `childNodes:`. Be aware, this *permanently* changes the child specs.

<a id="style"></a>
## style: {...}

JSONtoDOM does not prevent you from using separate CSS style sheets. You may do that as much as you wish. But remember that the DOM property name for the HTML `class` attribute is `className:`.

You may use the DOM `style:` property to define style objects for a particular node.

	{ nodeName: "div",
		style: {
			border: "2px",
			padding: "5px",
			minWidth: "14em"
		}
	}

Note: Style object properties should be properly named in JavaScript format. Convert names-with-hyphens into namesWithCamelCase.

If you create a style object, you can share it throughout your code. It's like a style sheet, but better, because it's a real JavaScript object.

	var styleObject = {
			border: "2px",
			padding: "5px",
			minWidth: "14em"
		}

Your spec would then look like this:

	{ 	nodeName: "div",
		style: styleObject
	}

Because they are objects, you can actually create *real* classes and subclasses of style objects that inherit from their parents. OO for styles.


<a id="attributes"></a>
## attributes: {...}

You can set attributes of a node using the DOM's `attributes:` property. JSONtoDOM calls `node.setAttribute( "attribute-name", value )` for each of the properties listed in the `attributes:` object.

	{	nodeName: "div",
		attributes: { "custom-attribute": "yes" }
	}

The name of the attribute, in the example above, `"custom-attribute"` must be an attribute name, not a property name. Use hyphens as appropriate. The rules for attribute names in `node.setAttribute()` apply. Built-in attributes have a corresponding property for the node. An `onclick` attribute has an equivalent `onclick` property in the node. You will probably want to just set the built-in properties directly as properties. But custom attributes do not appear as properties, so you then want to use `attributes:`. This comes into play with [`data-*` attributes](http://ejohn.org/blog/html-5-data-attributes/) (which are assigned to the [`dataset:`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement.dataset) property of a node). Theoretically, you could define the custom attributes of AngularJS ( `ng-*` ), and `data-role` here.


<a id="Events"></a>
## Events

There are 2 ways to set up event handlers in JSONtoDOM.


<a id="onFunction"></a>
## on*event*: `<fn>`

The direct way is to simply assign a function to an on*event* property, such as `onclick:` or `onfocus:`.

	{	nodeName: "div",
		onclick: function ( event ) { alert( "clicked" ) }
	}

If you mistype the event name `onclick` as `onClick`, it names a non-existing property in the node, which triggers an error when `jsp.setValue()` tries to copy the function to the node. It also ensures that the intended node gets the intended handler for the intended event.  :)

<a id="jdListeners"></a>
## jdListeners: [...]

The more modern way is to add event listeners using `jdListeners:`, which calls `node.addEventListener()`. It looks like this:

	{	nodeName: "div",
		jdListeners: [ { type: "click", listener: function ( event ) { alert( "Clicked" ) }, useCapture: false } ]
	}

* The `useCapture:` property is optional. It defaults to `false`.
* `jd.AddListener()` calls `node.AddEventListener()` or the older MSIE function `node.attachEvent()` if `node.AddEventListener()` is not present.
* `jdListeners: [...]` may not be an empty array.
* If you use `jd.removeDescendantNodes()` when removing a node from the DOM tree, it uses any specs in `jdListeners:` for calling `node.removeEventListener()` or, in old MSIE, `node.detachEvent()`. This is for the node and each of its descendants. It avoids memory leaks from no longer used listeners.


<a id="CustomElements"></a>
## Custom Elements

You can define your own custom elements as JavaScript objects. The following is a partial example ...

	{	tagName: "tab", // Note the new name
		style: {
			display: "table-cell",
			padding: "4px",
			position: "relative",
			top: "2px",
			borderStyle: "solid",
			borderWidth: "thin",
			borderTopLeftRadius: "8px",
			borderTopRightRadius: "8px",
			borderColor: dmnn.borderColor
		}
	}


# Obsolete HTML

JSONtoDOM does not create processing instructions, CDATA sections, entity references, or documents.


<hr id="Compatability"/>
# Compatability

Using `<!DOCTYPE html>`, JSONtoDOM runs fine on:

* Webkit (Chrome, Safari, Opera 20+)
* Firefox
* Opera 12, the pre-webkit version
* MSIE 9 or later.

<!--
MSIE 8 is dysfunctional. `Object.defineProperty()` only works on nodes in MSIE 8, which needs a work around. Note that `textContent:` does not appear in MSIE 8. Since both Google Chrome and Firefox work on the many Windows XP machines still in use, there is no need to use the obsolete MSIE 8.
-->

Of course the specs that *you* write need to be compatible with your target browsers.

* JSONtoDOM works with HTML 4.
* JSONtoDOM works with `"use strict"`.


<hr id="Speed"/>
# Speed

Building a web page by creating DOM nodes has a reputation for being slower than assembling strings of HTML. It doesn't make sense, and it's not true. In 2010, I tested building a 3 column, 400 row table by assembling HTML strings vs. creating DOM nodes. In WebKit-based browsers, building DOM nodes was much faster, at least 10x. Since then, someone knowledgeable about JavaScript, told me that assembling strings in MSIE was faster, but not for other browsers. That was several years ago.

As a stress test, JSONtoDOM builds 10 tables with 10 columns and 10 rows each, plus headers, about 1500 elements, in under a second.


<hr id="Examples"/>
# Examples

There are a few examples in the Examples folder.

LatinTable
: was the first test case we built. The main test was seeing if the colSpan and rowSpan properties would work. They do.

Baseball
: is probably the most interesting one to look at. If you double click on one of the outside rows, the tree collapses and expands. We set up a `jdListeners:` to handle the double clicks, and the functions `Baseball$restore` and `Baseball$collapse` to handle expansion and collapse of the tree. Also, we use function calls, such as `RecordItem()` to take care of building most of the branches.

jdTests
: is a semi-random series of quick tests to confirm that most of the functionality documented here works.

Dominion
: This is a DOM browser, to look at DOM objects in the Dominion app itself. Of special interest is that this swaps in a new table every time you click on a row property. See especially `dmnn.tableBody.newRecord()` and which calls ` dmnn.tableBody.nodesFromRecords( rcrd, tbl_node )` to see if there are any new records/rows to show, and `dmnn.tableBody.refresh(), which calls `dmnn.removeDescendantNodes( prnt_node )` and `specsToNodes( [ spc ], prnt_node )`.
