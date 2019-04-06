//after some headache with web sql I realized its not even supported for node.... so I couldnt make any test for it


// import WebSql from './WebSql';

// const webSql = new WebSql();
// const words = ['affiliate', 'marketing', 'influencer'];

// test('createTables should initialize tables in the database', () => {
//     webSql.createTables();

//     console.log("TEST1");
//     words.forEach((word) => {
//         webSql.db.transaction((tx) => {

//             console.log("TEST2");
//             tx.executeSql(`SELECT * FROM ${word}`, [], (tx, result) => { console.log("result ! " + result) });
//         });
//     });
// });
