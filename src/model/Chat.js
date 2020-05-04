var chats = []

export default class Chat {
    constructor (id, senderid, text, date){
        this.id = id
        this.senderid = senderid
        this.text = text
        this.date = date
    }
    save(){
        chats.push(this)
    }
    static fetchAll(){
        return chats
    }
    static removeAll(){
        chats = []
    }
}
