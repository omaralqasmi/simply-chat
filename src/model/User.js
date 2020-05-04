var users = []

export default class User {
    constructor (id, name, image){
        this.id = id
        this.name = name
        this.image = image
    }
    save(){
        users.push(this)
    }
    static fetchAll(){
        return users
    }
    static removeAll(){
        users = []
    }
}
