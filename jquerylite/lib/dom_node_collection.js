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
