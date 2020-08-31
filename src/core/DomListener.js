import {capitalize} from './utils';

export class DomListener {
    constructor($root, listeners = []) {
        if (!$root) {
            throw new Error(`No $root provided for DomListener!`);
        }
        this.$root = $root;
        this.listeners = listeners;
    }

    initDOMListeners() {
        this.listeners.forEach( listener => {
            // Добавляет 'on'
            const method = getMethodName(listener);
            // method = onInput; listener -> 'input'; this.$root -> Dom {$el: div.exel__formula}
            if (!this[method]) {
                throw new Error(`Method ${method} is not inplemented in ${this.name} Component`);
            }
            this[method] = this[method].bind(this);
            // Тоже самое, что и addEventListener
            this.$root.on(listener, this[method]);
        });
    }

    romoveDOMListeners() {
        this.listeners.forEach( listener => {
            const method = getMethodName(listener);
            this.$root.off(listener, this[method]);
        });
    }
}
// input -> onInput
function getMethodName(eventName) {
    return 'on' + capitalize(eventName);
}
