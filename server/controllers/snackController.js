const db = require('../models/DatabaseModel');
const snackController = {};

//==================================================

snackController.addSnack = (req, res, next) => {
    console.log("========== snackController addSnack ==========");
    
    const rating = 0;
    const { snack_name, brand_name, origin, type, flavor_profile, img } = req.body;

    // [req.body[0], req.body[1], req.body[2], req.body[3], req.body[4], req.body[6]]
    // snack_id, snack_name, brand_name, origin, type, flavor_profile, rating, img
    let q = {
        text: `INSERT INTO Snackslist VALUES (DEFAULT, $1, $2, $3, $4, $5, $6, $7)`,
        values: [ snack_name, brand_name, origin, type, flavor_profile, rating, img]
    }

    db.query(q)
    .then(() => {
        console.log("========== database updated with new snack ==========");
        return next()
    })
    .catch(err => {
        console.log("========== snackController.addSnack error ==========")
        return next({
            log: `err: addSnacks of snackController ${err}`,
            message: "Error adding snack"
        });
    })

}

//==================================================

snackController.delSnack = (req, res, next) => {
    console.log("========== delSnack snackController ==========")
    
    let q = {
        text: `DELETE FROM Snackslist WHERE snack_id = $1`,
        values: [req.body[0]]
    }
    db.query(q)
    .then(() => {
        console.log("========== Snack Deleted ==========")
        //res.locals.message = "Task Complete";
        return next();
    })
    .catch(err => {
        return next({
            log: `err: delSnacks of snackController ${err}`,
            message: "Error deleting snack"
        });
    });
}

//==================================================

snackController.getSnacks = (req, res, next) => {
    let q = {
        text: `SELECT * FROM Snackslist`
    }

    db.query(q.text)
    .then(data => {
        console.log("========== getSnacks query complete ==========");
        console.log("data.rows: ")
        console.log(data.rows);
        res.locals.snacks = data.rows;
        return next();
    })
    .catch(err => {
        return next({
            log: `err: getSnacks of SnackController ${err}`,
            message: "Error retrieving snacks"
        });
    });
}

snackController.snackSearch = (req, res, next) => {
    
    let param = req.body[0].toUpperCase()
    
    let q = {
        text: `SELECT * FROM Snackslist WHERE UPPER(snack_name) $1`,
        values: [param]
    }

    db.query(q)
    .then(data => {
        console.log("========== snackSearch query complete ==========");
        console.log("data.rows: ")
        console.log(data.rows);
        res.locals.snacks = data.rows;
        return next();
    })
    .catch(err => {
        return next({
            log: `err: snackSearch of SnackController ${err}`,
            message: "Error retrieving snacks"
        });
    });
}

//==================================================

//invokes whenever a new comment with a rating is uploaded to a specific snack
snackController.updateRating = async (req, res, next) => {
    //req.body should contain snack_id
    console.log("========== hitting update rating ==========, ")
    let new_avg;
    let q = {
        text: `SELECT * FROM Comments WHERE snack_id = ${req.body.snack_id}`,
        values: []
    }
 
    await db.query(q.text)
    .then(data => {
        console.log("========== get specific Comment query complete ==========");
        
        let sum = 0;
        data.rows.forEach(e => {
            sum += e.rating
        })
        console.log('sum from update', sum)
        new_avg = sum / data.rows.length;
    })

    let q2 = {
        text: `UPDATE Snackslist SET rating = $1 WHERE snack_id = $2`,
        values: [new_avg, req.body.snack_id]
    };
    db.query(q2)
    .then(data => {
        console.log("========== updated rating of snack ==========");
        return next()
    })
    .catch(err => {
        return next({
            log: `err: getSnacks of SnackController ${err}`,
            message: "Error retrieving snacks"
        });
    });
}

//==================================================

module.exports = snackController;

//shift alt/cmd f
// const queryString =`INSERT INTO sessions(ssid, uuid) VALUES ($1, $2)`, queryArgs = [SSID, username];

// dbCookie.query(queryString, queryArgs)