const Sequelize = require('sequelize');
const moment = require('moment');

const timezone = 'Europe/Vilnius';
moment.tz.setDefault(timezone);

let sequelize = new Sequelize('volvo', 'root', 'sarah', {
    host: 'localhost',
    timezone: timezone,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    // http://docs.sequelizejs.com/manual/tutorial/querying.html#operators
    operatorsAliases: false
});

module.exports.connect = async function(){

 return sequelize.authenticate()
        .then(() => {
            console.log('Connection has been established successfully.');
        })
        .catch(err => {
            console.error('Unable to connect to the database:', err);
        });
};

let noTimeStamps = {timestamps: false};

module.exports.Location = sequelize.define('location', {
    latitude: Sequelize.DOUBLE,
    longitude: Sequelize.DOUBLE
}, noTimeStamps);

module.exports.Community = sequelize.define('community', {}, noTimeStamps);

this.Community.belongsTo(this.Location);

module.exports.User = sequelize.define('user', {
    username: Sequelize.STRING,
    password: Sequelize.STRING,
}, noTimeStamps);

this.User.belongsTo(this.Location);
this.User.belongsTo(this.Community);

module.exports.Vehicle = sequelize.define('vehicle', {
    brand: Sequelize.STRING,
    model: Sequelize.STRING,
    year: Sequelize.STRING,
    price: Sequelize.FLOAT,
}, noTimeStamps);

this.Vehicle.belongsTo(this.Community);

module.exports.Booking = sequelize.define('booking', {
    startDatetime: Sequelize.DATE,
    endDatetime: Sequelize.DATE,
}, noTimeStamps);

this.Vehicle.hasMany(this.Booking);


this.Booking.belongsTo(this.User);
this.Booking.belongsTo(this.Location, {as: "startLocation"});
this.Booking.belongsTo(this.Location, {as: "endLocation"});
this.Booking.belongsTo(this.Vehicle);

module.exports.refreshDB = async function(){

    await sequelize.query('SET FOREIGN_KEY_CHECKS = 0', { raw: true });
    await this.Location.sync({force: true});
    await this.Booking.sync({force: true});
    await this.User.sync({force: true});
    await this.Vehicle.sync({force: true});
    await this.Community.sync({force: true});
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 1', { raw: true });

    let list = [
        [47.379125, 8.538879],
        [47.380004, 8.536240],
        [47.381090, 8.535043],
        [47.380476, 8.53408],
        [47.381737, 8.533428],
        [47.381072, 8.532393]
    ];

    for(let i = 0; i < list.length; ++i){
        list[i] = await this.Location.create({
            latitude: list[i++][0],
            longitude:list[i++][1]
        });
    }

    let community = await this.Community.create({location: list[0]});

    for(let i = 0; i < 10; ++i){

        let user = await this.User.create({
            username: 'user' + i,
            password: 'password' + i,
            lastPosition: list[1],
            community: community
        });

        let vehicle = await this.Vehicle.create({
            brand: "Brand" + i,
            model: "Model" + i,
            year: "2006",
            community: community,
            price: Math.random()
        });

        let booking = await this.Booking.create({
            user: user,
            startDatetime: randDate(true),
            endDatetime: randDate(false),
            startLocation: list[2],
            endLocation: list[3],
            vehicle: vehicle
        });

    }


};

function randDate(before, min = 0, max = 5){
    let rd = Math.floor(Math.random() * (max - min)) + min;
    let unit = Math.random() > 0.5 ? "days" : "hours";
    return before ? moment().subtract(rd, unit).toDate() : moment().add(rd, unit).toDate();
}