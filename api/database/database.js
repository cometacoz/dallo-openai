// THIS IS JUST A MOCK DATABASE
class Database {
    constructor() {
        this.data = {
            1: { name: 'Alice' },
            2: { name: 'Bob' }
        };
    }

    getUser(id) {
        return this.data[id];
    }
}

export default Database;
