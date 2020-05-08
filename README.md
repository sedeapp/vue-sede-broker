# Vue Sede Broker

Plugin wrapper to use [SedeBroker](https://github.com/sedeapp/sede-broker) with [Vue](https://github.com/vuejs/vue).

## 1. Register the plugin

```javascript
Vue.use(VueSedeBroker);
```

## 2. Specify your message

```javascript
class HelloMessage {
    constructor(name) {
        this._name = name
    }

    get name() {
        return this._name
    }
}
```

## 3. Publish

```html
<template>
    <div>
        <input type="text" v-model="name">
        <button @click="doPublish">Publish!</button>
    </div>
</template>

<script>
module.exports = {
    methods: {
        doPublish() {
            this.$broker.publish(new HelloMessage(this.name))
        }
    },
    data() {
        return {
            name: ''
        }
    }
}
</script>
```

## 4. Subscribe

```html
<template>
    <div>
        <p>Hello {{ name }}!</p>
    </div>
</template>

<script>
module.exports = {
    methods: {
        handleHelloMessage(message) {
            // catch your exceptions!
            // don't break the wheel
            try {
                this.name = message.name
            }
            catch (e) {
                // you can do better
                console.warn(e)
            }
        }        
    },
    data() {
        return {
            name: 'World'
        }
    },
    created() {
        // you don't need to unsubscribe, the plugin do this for you
        this.$broker.subscribe(HelloMessage, this.handleHelloMessage)
    }
}
</script>
```
