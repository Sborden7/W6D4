const DomNodeCollection = require("./dom_node_collection.js");

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
