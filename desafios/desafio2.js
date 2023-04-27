const fs = require('fs')

class UserManager {
    constructor(path) {
        this.users = []
        this.path = path
        this.init(path)
    }
    init(path) {
        let file = fs.existsSync(path)
        if (!file){
        fs.promises.writeFile(path, '[]')
        .then(res=>(console.log('file created')))
        .catch(err=> console.log(err))
    } else {
        fs.promises.readFile(path, 'utf-8')
            .then(res=> this.users = JSON.parse(res))
            .catch(err=> console.log(err))
    }
}

    addUser({name, lastName, age, carts}) {
        let data = {name, lastName, age, carts}
        data.id = 1
        console.log(this.users)
        this.users.push(data)
        let dataJson = JSON.stringify(this.users, null, 2)
        fs.promises.writeFile(this.path, dataJson)
            .then(res=>console.log('user created'))
            .catch(err=>console.log(err))
    }

}

let manager = new UserManager('./data/users.json')
manager.addUser({name: 'Leonel', lastName: 'Orlando', age: '24', carts: []})
manager.addUser({name: 'Prueba', lastName: 'Usuario2', age: '20', carts: []})