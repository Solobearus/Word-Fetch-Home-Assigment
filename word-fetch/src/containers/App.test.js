function countByFilter(table){
    this.db.transaction((tx) => {  
        tx.executeSql(`SELECT filter, COUNT(*) 
        FROM ${table} 
        GROUP BY filter;`,
        [], 
        (t,result) => { console.log(`Table ${table} has  : ${result}`); },
        (t,err) => { console.log(`error : ${err}`); } );
    });
}