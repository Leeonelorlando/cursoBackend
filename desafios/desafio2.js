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

    readUsers() {
        return this.users
    }

    readUser(id) {
        let one = this.users.find(each=>each.id===id)
        return one
    }

    async updateUser(id, data) {
        try {
            let one = this.readUser(id)

            for (let prop in data) {
                one[prop] = data [prop]
            }

            let dataJson = JSON.stringify(this.users, null, 2)

            await fs.promises.writeFile(this.path, dataJson)
            console.log('updated user: ' + id)
            return 'updated user: ' + id
        } catch(error) {
            console.log(error)
            return 'error: updating user'
        }
    }

    async destroyUser(id) {
        try {
            this.users = this.users.filter(each=>each.id!==id)
            let dataJson = JSON.stringify(this.users, null, 2)
            await fs.promises.writeFile(this.path, dataJson)
            console.log('delete user: ' + id)
            return 'delete user: ' + id
        } catch(error) {
            console.log(error)
            return 'error: deleting user'
        }
    }

}

let manager = new UserManager('./data/users.json')
manager.addUser({name: 'Leonel', lastName: 'Orlando', age: '24', carts: []})
manager.addUser({name: 'Prueba', lastName: 'Usuario2', age: '20', carts: []})