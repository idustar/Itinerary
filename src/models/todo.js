/**
 * Created by dustar on 2017/7/8.
 */

/**
 * Created by dustar on 2017/7/8.
 */

class Todo {
    constructor(title) {
        this.type = "Todo"
        this.title = title
        this.available = true
        this.createAt = new Date()
    }

    create() {

    }

    delete() {

    }

    //

    stop() {


    }

    output() {

    }
}

class TodosQueue {
    constructor() {
        this.items = []
    }

    count () {
        return this.items.length
    }

    switch () {

    }
}
