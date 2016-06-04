function getvalue(theObject, predicate) {
  var result = null;
  if (theObject instanceof Array) {
    for (var i = 0; i < theObject.length; i++) {
      result = getvalue(theObject[i], predicate);
      if (result) { return result; }
    }
  } else {
    for (var prop in theObject) {
      if (predicate(prop, theObject[prop])) {
        return theObject[prop]
      }

      if (theObject[prop] instanceof Object || theObject[prop] instanceof Array)
        result = getvalue(theObject[prop], predicate);
    }
  }
  return result;
}


export default getvalue
