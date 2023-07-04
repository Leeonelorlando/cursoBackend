import User from "./models/User.js"
import Product from "./models/Product.js"
import "dotenv/config.js"
import "../src/server.js"
import { faker } from "@faker-js/faker"

const createData = async (users,products) => {
    try {
        for (let i = 1; i <= products; i++) {
            const randomTitle = faker.music.songName()
            const randomCapacity = Math.ceil(Math.random() * 100000)
            const randomPrice = Math.ceil(Math.random() * 100)
            await Product.create({ title: randomTitle, capacity: randomCapacity, price: randomPrice })
        }
        for (let j = 1; j <= users; j++) {
            const randomName = faker.person.firstName()
            const randomAge =  Math.ceil(Math.random() * 100)
            await User.create({ name: randomName, age: randomAge })
        }
        console.log("data created!");
    } catch (error) {
        console.log(error);
    }
};
//createData(100,5000);