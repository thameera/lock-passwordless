// TODO: Hack to preload the default icon. We need to preload also custom icons
// and prevent showing the lock until they are loaded.
const img = document.createElement("img");
img.src = "//cdn.auth0.com/styleguide/4.6.1/lib/logos/img/badge.png";

class Atom {
  constructor(state) {
    this.state = state;
    this.watches = {};
  }

  reset(state) {
    return this._change(state);
  }

  swap(f, ...args) {
    return this._change(f(this.state, ...args));
  }

  deref() {
    return this.state;
  }

  addWatch(k, f) {
    // if (this.watches[key]) {
    //   console.warn(`adding a watch with an already registered key: ${k}`);
    // }
    this.watches[k] = f;
    return this;
  }

  removeWatch(k) {
    // if (!this.watches[key]) {
    //   console.warn(`removing a watch with an unknown key: ${k}`);
    // }
    delete this.watches[k];
    return this;
  }

  _change(newState) {
    const { state, watches } = this;
    this.state = newState;
    Object.keys(watches).forEach(k => watches[k](k, state, newState));
    return this.state;
  }
}

export default function atom(state) {
  return new Atom(state);
}
