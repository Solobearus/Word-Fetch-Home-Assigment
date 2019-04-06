// var openDatabase = require('websql');

class WebSql{

    constructor(){
        this.db = openDatabase('mydb', '1.0', 'Test DB', 2 * 1024 * 1024);
        this.words = ['affiliate', 'marketing', 'influencer'];
        this.filter = ['Means like','Sounds like','Spelled like'];
    }
    
    deleteTables(){
        this.db.transaction((tx) =>  {   
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

    createTables(){
        this.db.transaction((tx) => {  
            this.words.forEach(
                (word) => {
                    tx.executeSql(`CREATE TABLE IF NOT EXISTS  ${word} (id INTEGER PRIMARY KEY, content, filter)`,
                        [], 
                        (t,result) => { console.log(`Table ${word} was successfully created : ${result}`); },
                        (t,err) => { console.log(`error : ${err}`); }
                    ); 
                }
            ); 
                    // console.log(`Table ${word} was successfully created.`);    
        });
    }

    populateTable(table, data, filter){

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

    countByFilter(table){
        let tableReport = [];
        
        this.db.transaction((tx) => {
            tx.executeSql(`SELECT COUNT(*) as amount, filter FROM ${table} GROUP BY filter;`,
                [], 
                (t,result) => {
                    for (let i = 0; i < result.rows.length; i++) {
                        tableReport.push(
                            {
                                amount: result.rows[i]['amount'],
                                filter: result.rows[i]['filter']
                            }
                        );
                    }
                },
                (t,err) => { console.log(err); } 
            );
        });

        return tableReport;
    }

    getTable(table){
        this.db.transaction((tx) =>  {   
            tx.executeSql(`SELECT * FROM ${table}`, [], (t,result) => { console.log(result); }); 
        });   
    }  
}

export default WebSql;