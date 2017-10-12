/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const DomNodeCollection = __webpack_require__(1);

function $l (arg) {

  if (arg instanceof HTMLElement) {
    let newArr = [arg];
    return new DomNodeCollection(newArr);
  } else if (arg instanceof Function) {
    document.addEventListener('DOMContentLoaded', arg, false);
  } else {
    return selector(arg);
  }
}

function selector(string) {
  const nodeList = document.querySelectorAll(string);
  const collection = Array.from(nodeList);
  return new DomNodeCollection(collection);
}

window.$l = $l;
$l( () => {
  // alert('the document is ready');
  window.$div = $l('.first-div');
});

$l.extend = function(...objects) {

  const baseObject = objects[0];

  objects.slice(1).forEach((obj) => {
    Object.keys(obj).forEach((key) => {
      baseObject[key] = obj[key];
    });
  });

  return baseObject;
};

$l.ajax = function(options) {
  // defaults {...}
  // 1. merge options with defaults

  // Provide defaults for success, error, url, method, data, and contentType
  const defaults = {
    success: function() { console.log("success!"); },
    error: function() { console.log("error!"); },
    url: "http://www.google.com",
    method: "GET",
    data: { hello: "world" },
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
  };

  options = $l.extends(defaults, options);

  //step 1 - create xhr object
  const xhr = new XMLHttpRequest();

  // step 2 - specify path and verb
  xhr.open(options.method, options.url);

  // step 3 - register a callback
  xhr.onload = options.success;
  // function () {
  //   console.log(options.status); // for status info
  //   console.log(options.responseType); //the type of data that was returned
  //   console.log(options.response); //the actual response. For json api calls, this will be a json string
  // };

  // step 4 - send off the request with optional data
  const optionalData = options.data;
  xhr.send(optionalData);
};



















//


/***/ }),
/* 1 */
/***/ (function(module, exports) {

class DomNodeCollection {
  constructor (elements) {
    this.elements = elements;
  }

  html(innerHTML) {
    if (innerHTML === undefined) {
      return this.elements[0].innerHTML;
    }

    this.elements.forEach((el) => {
      el.innerHTML = innerHTML;
    });
  }

  empty() {
    this.html("");
  }

  append(arg) {
    if (arg instanceof DomNodeCollection) {
      arg.elements.forEach((argEl) => {
        this.elements.forEach((thisEl) => {
          thisEl.innerHTML += argEl.outerHTML;
        });
      });
    } else if (typeof arg === "string") {
      console.log('String!');
      this.elements.forEach((el) => {
        console.log(el);
        el.innerHTML += arg;
      });
    } else if (arg instanceof HTMLElement) {
      this.elements.forEach((el) => {
        el.innerHTML += arg.outerHTML;
      });
    }
  }

  attr(attrName, value) {
    // gets attrName of first element
    if (value === undefined) {
      return this.elements[0].getAttributeNode(attrName).value;
    }

    //sets attr of all elements: setAttributeNode
    this.elements.forEach((el) => {
      let attribute = el.getAttributeNode(attrName);
      attribute.value = value;
      el.setAttributeNode(attribute);
    });
  }

  addClass(className) {
    let classString = this.attr("class") + " " + className;
    this.attr("class", classString);
  }

  removeClass(className) {
    let classString = this.attr("class");
    classString = classString.replace(className, "");
    this.attr("class", classString);
  }

  children() {
    let results = [];
    this.elements.forEach((el)=> {
      results.push(el.children);
    });

    return new DomNodeCollection(results);
  }

  parent() {
    const parents = [];
    this.elements.forEach((el) => {
      parents.push(el.parentNode);
    });

    return new DomNodeCollection(parents);
  }

  find(selector) {
    // Get the descendants of each element in the current set
    // of matched elements, filtered by a selector, jQuery object, or element.
    const results = [];
    this.elements.forEach((el) => {
      const nodesList = el.querySelectorAll(selector);
      nodesList.forEach((node) => {
        results.push(node);
      });
    });

    return new DomNodeCollection(results);
  }

  remove(selector) {
    // remove all matched elements: both empties and removes element
    // can use node.remove
    this.elements.forEach((el) => {
      const nodesList = el.querySelectorAll(selector);
      nodesList.forEach((node) => {
        el.remove(node);
      });
    });
  }

  on(type, callback) {
    this.elements.forEach((el) => {
      el.addEventListener(type, callback);
    });
  }

  off(type, callback) {
    this.elements.forEach((el) => {
      el.removeEventListener(type, callback);
    });
  }

}  // end class

module.exports = DomNodeCollection;


/***/ })
/******/ ]);