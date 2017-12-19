// TodoStore definition.
// Flux stores house application logic and state that relate to a specific domain.
// The store responds to relevant events emitted by the flux dispatcher.
// The store emits change events to any listening views, so that they may react
// and redraw themselves.
'use strict';

import Riot from 'riot';

const arr = [
  {id : "testid2", text : "adsadsa  asdas ", author : "smith"},
  {id : "testid1", text : "other text ", author : "smith"}
];

export default function CommentsStore(dispatcher) {
  
  function list() {
    return Promise.resolve(arr);
  }

  function add(comment) {
    return Promise.resolve();
  }

  return {
    list,
    add
  }
}
