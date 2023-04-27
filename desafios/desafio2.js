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

async addUser({name, lastName, age, carts}) {
    try {
        let data = {name, lastName, age, carts}
        if (this.users.length>0) {
            let nextId = this.users[this.users.length-1].id+1
            data.id = nextId
        } else {
            data.id = 1
        }
        this.users.push(data)
        let dataJson = JSON.stringify(this.users, null, 2)
        await fs.promises.writeFile(this.path,dataJson)
        console.log('id´s created user: '+ data.id)
        return 'id´s user: '+ data.id
    } catch(error) {
        console.log(error)
        return 'error: creating user'
    }
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

async function manager() {
    let manager = new UserManager('./data/users.json')
    await manager.addUser({name: 'Leonel', lastName: 'Orlando', age: '24', carts: []})
    await manager.addUser({name: 'Prueba', lastName: 'Usuario2', age: '20', carts: []})
    await manager.addUser({name: 'Carlos', lastName: 'Alcaraz', age: '25', carts: []})
    await manager.addUser({name: 'Esteban', lastName: 'Rinaudo', age: '33', carts: []})
    await manager.updateUser(1, {name: 'Leonel'})
    await manager.updateUser(2, {name: 'Prueba', carts: ['celular']})
    await manager.updateUser(3, {age: 30})
    await manager.destroyUser(1)
    await manager.destroyUser(4)
}
manager()