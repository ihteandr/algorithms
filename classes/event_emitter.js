
class EventEmitter {
    constructor() {
        this.listeners = {};
    }
    on(event, listener) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        this.listeners[event].push(listener);
    }
    off(event, listener) {
        if (listener && this.listeners[event]) {
            this.listeners[event] = this.listeners[event].filter((eListener) => {
                return eListener !== listener;
            });
        } else if (event) {
            this.listeners[event] = [];
        } else {
            this.listeners = [];
        }
    }
    emit(event, data = null) {
        if (this.listeners[event]) {
            this.listeners[event].forEach((listener) => {
                listener(data);
            });
        }
    }
}