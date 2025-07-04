const {Sequelize, DataTypes} = require('sequelize')
const dbHandler = new Sequelize('data','root','',{dialect: 'mysql', host: '127.1.1.1'})

exports.zoo = dbHandler.define('allatkert',{
    'id':{  //azonosító
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    'user':{  //felhasználó
        type: DataTypes.STRING,
        allowNull: false
    },
    'animal':{  //állat
        type: DataTypes.STRING,
        allowNull: false
    },
    'species':{  //faj
        type: DataTypes.STRING,
        allowNull: false,
        //defaultValue: "link"
    },
    'animalType':{  //állattípus
        type: DataTypes.STRING,
        allowNull: true
    },
    'enclosure':{  //kifutó; bekerített, elkerített terület
        type: DataTypes.STRING,
        allowNull:true
    },
    'medicalRecord':{  //orvosi feljegyzés
        type: DataTypes.STRING,
        allowNull: false
    }
})

exports.user = dbHandler.define('felhasznalok',{
    'id':{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    'userName':{
        type: DataTypes.STRING,
        allowNull: false
    },
    'userEmail':{
        type: DataTypes.STRING,
        allowNull: false
    },
    'userPassword':{
        type: DataTypes.STRING,
        allowNull: false
    },
    'role':{
        type: DataTypes.STRING,
        allowNull: false
    }
})

exports.animal = dbHandler.define('allatok',{
    'id':{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    'animalName':{
        type: DataTypes.STRING,
        allowNull: false
    },
    'speciesId':{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    'typeId':{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    'dateOfBirth':{
        type: DataTypes.DATETIME,
        allowNull: false
    },
    'weight':{
        type: DataTypes.STRING,
        allowNull: false
    },
    'enclosure':{
        type: DataTypes.STRING,
        allowNull: false
    },
    'imageURL':{
        type: DataTypes.STRING,
        allowNull: false
        //defaultValue: "link"
    },
    'isActive':{
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
})

exports.species = dbHandler.define('faj',{
    'id':{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    'speciesName':{
        type: DataTypes.STRING,
        allowNull: false
    }
})

exports.animalType = dbHandler.define('allattipus',{
    'id':{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    'animalTypeName':{
        type: DataTypes.STRING,
        allowNull: false
    }
})

exports.enclosure = dbHandler.define('kifutok',{
    'id':{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    'enclosureName':{
        type: DataTypes.STRING,
        allowNull: false
    },
    'enclosureDescription':{  //kifutók leírása
        type: DataTypes.STRING,
        allowNull: false
    }
})

exports.medicalRecord = dbHandler.define('orvosifeljegyzesek',{
    'id':{  //azonosító
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    'date':{  //dátum
        type: DataTypes.DATETIME,
        allowNull: false
    },
    'medicalDescription':{  //orvosi leírás
        type: DataTypes.STRING,
        allowNull: false
    },
    'animalId':{  //állat azonosító
        type: DataTypes.INTEGER,
        allowNull: false
    },
    'vetId':{  //állatorvos azonosító
        type: DataTypes.INTEGER,
        allowNull: false
    },
    'modifiable':{  //módosítható
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    'cannotBeDeleted':{  //nem törölhető
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
})