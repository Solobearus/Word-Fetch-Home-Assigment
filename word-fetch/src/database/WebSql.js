// var openDatabase = require('websql');

class WebSql {

    constructor() {
        this.db = openDatabase('mydb', '1.0', 'Test DB', 2 * 1024 * 1024);
        this.words = ['affiliate', 'marketing', 'influencer'];
        this.filter = ['Means like', 'Sounds like', 'Spelled like'];
    }

    deleteTables() {
        this.db.transaction((tx) => {
            this.words.forEach(
                (word) => {
                    tx.executeSql(`DROP TABLE ${word}`,
                        [],
                        (result) => { console.log(result); },
                        (err) => { console.log(err); }
                    )
                }
            )
        });
    }

    createTables() {
        this.db.transaction((tx) => {
            this.words.forEach(
                (word) => {
                    tx.executeSql(`CREATE TABLE IF NOT EXISTS  ${word} (id INTEGER PRIMARY KEY, content, filter)`,
                        [],
                        (t, result) => { console.log(`Table ${word} was successfully created : ${result}`); },
                        (t, err) => { console.log(`error : ${err}`); }
                    );
                }
            );
            // console.log(`Table ${word} was successfully created.`);    
        });
    }

    populateTable(table, data, filter) {

        this.db.transaction((tx) => {
            console.log(data.length)
            for (let i = 0; i < data.length; i++) {
                tx.executeSql(`INSERT INTO ${table} (content, filter) VALUES ( '${data[i].word}' , '${filter}' )`,
                    [],
                    // (t,result) => { console.log(result); },
                    // (t,err) => { console.log(err) } 
                );
            }
        });
    }

    countByFilter(table) {
        // let tableReport = [];

        return this.query(`SELECT COUNT(*) as amount, filter FROM ${table} GROUP BY filter;`)
        //TODO: erase
            // .then((out) => {
            //     for (let i = 0; i < out.rows.length; i++) {
            //         tableReport.push(
            //             {
            //                 amount: out.rows[i]['amount'],
            //                 filter: out.rows[i]['filter']
            //             }
            //         );
            //     }

            //     return tableReport;
            // })
            // .catch((err) => {
            //     console.log(err);
            //     return false;
            // })

        // this.db.transaction((tx) => {
        //     tx.executeSql(`SELECT COUNT(*) as amount, filter FROM ${table} GROUP BY filter;`,
        //         [],
        //         (t, result) => {
        //             for (let i = 0; i < result.rows.length; i++) {
        //                 tableReport.push(
        //                     {
        //                         amount: result.rows[i]['amount'],
        //                         filter: result.rows[i]['filter']
        //                     }
        //                 );
        //             }
        //         },
        //         (t, err) => { console.log(err); }
        //     );
        // });
    }

    getTable(table) {
        this.db.transaction((tx) => {
            tx.executeSql(`SELECT * FROM ${table}`, [], (t, result) => { console.log(result); });
        });
    }


    query(sql, params){
        let db = this.db;
        //We transform the normal transaction of db to return a promise now.
        return new Promise((resolve, reject) => {

            //check if there is db to begin with
            if (!db) return reject('no database.');

            //the transaction function but now it returns 
            db.transaction(function (tx) {

                //execute sql  
                tx.executeSql(sql, params || [], (tx, res) => {
                    let rows = [];

                    //TODO: check if this is actually needed.
                    for (let i = res.rows.length; i; i--) {
                        rows.unshift(res.rows.item(i - 1));
                    }
                    var out = { rows: rows, rowsAffected: res.rowsAffected };

                    // don't worry about no insertId
                    try { out.insertId = res.insertId; } catch (e) { }
                    resolve(out);
                   
                }, function (tx, err) {
                    reject(err.message);
                });
            });
        });
    }
}

export default WebSql;