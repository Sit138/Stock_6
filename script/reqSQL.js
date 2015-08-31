
var request = {
    selectData: "SELECT*FROM Groups",
    selectDataSort: "SELECT*FROM Groups ORDER BY ?",
    selectDataForGr: "SELECT*FROM Groups WHERE number LIKE",
    createTabGroup: "CREATE TABLE IF NOT EXISTS Groups(number, yearIn, yearOut)",//create table Group
    insertGroup: "INSERT INTO Groups (number, yearIn, yearOut) values(?, ?, ?)",
    createTabStudent: "CREATE TABLE IF NOT EXISTS Students(ID INTEGER PRIMARY KEY ASC, surname, name, secondname, num, yI, yO)",
    insertStudent: "INSERT INTO Students (surname, name, secondname, num, yI, yO) values(?, ?, ?, ?, ?, ?)",
    selectStudentFromGroup: "SELECT*FROM Groups WHERE number LIKE\'?\'",
    selectFromStudForGroup: "SELECT * FROM Students WHERE num LIKE \'group\' AND yI <= year AND yO >= year ORDER BY surname",
    selectFromStudentBySurname: "SELECT*FROM Students WHERE surname=\'?\'",
    selectFromStudentByID: "SELECT*FROM Students WHERE ID=\'?\'",
    deleteTab: "DROP TABLE Students",
    deleteDataFromTab: "DELETE FROM Students WHERE ID LIKE\'?\'",
    deleteDataFromTabNam: "DELETE FROM Groups WHERE number LIKE\'?\'",
    selectBetweenYears: "SELECT * FROM Groups WHERE yearIn <= ? AND yearOut >= ? ORDER BY number"
};
