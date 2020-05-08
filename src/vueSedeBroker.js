'use strict';

const VueSedeBroker = {

    install(Vue, options) {
        const broker = new SedeBroker(options)

        Vue.mixin({
            beforeCreate() {
                this.$broker = {
                    _tickets : [],

                    subscribe(proto, message) {
                        const ticket = broker.subscribe(proto, message)
                        this._tickets.push(ticket)
                        return ticket
                    },

                    publish(message) {
                        broker.publish(message)
                    },

                    clear() {
                        for (ticket in this._tickets) {
                            ticket.unsubscribe();
                        }
                        this._tickets = []
                    }
                }
            },
            beforeDestroy() {
                this.$broker.clear()
                this.$broker = null
            }
        })
    }

}
